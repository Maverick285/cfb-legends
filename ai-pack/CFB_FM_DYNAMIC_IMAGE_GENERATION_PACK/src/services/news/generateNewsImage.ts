import type { GeneratedAsset } from "../../domain/assets/generatedAsset";
import type { AssetGenerationService } from "../assets/AssetGenerationService";
import { buildNewsImagePrompt } from "../assets/newsImagePromptBuilder";
import { validateImagePrompt } from "../assets/imagePromptValidator";
import { buildNewsImageContextFromNews } from "./buildNewsImageContext";

// Placeholder domain types. Replace with actual types.
type NewsItem = any;
type GameWorld = any;

export interface GeneratedAssetRepository {
  save(asset: GeneratedAsset): Promise<void>;
  findByPromptHash(hash: string): Promise<GeneratedAsset | null>;
  createFallbackAsset(input: {
    sourceNewsId: string;
    sourceEventId: string;
    reason: string;
  }): Promise<GeneratedAsset>;
}

export async function queueGeneratedImageForNews(input: {
  news: NewsItem;
  world: GameWorld;
  assetService: AssetGenerationService;
  assetRepository: GeneratedAssetRepository;
}): Promise<GeneratedAsset | null> {
  const { news, world, assetService, assetRepository } = input;

  if (!news.sourceEventId) return null;

  const context = buildNewsImageContextFromNews(news, world);

  if (context.importanceTier < 2) return null;

  const player = context.primaryPlayerId
    ? getPlayerForImage(context.primaryPlayerId, world)
    : undefined;

  const team = getTeamForImage(context.primaryTeamId, world);
  const opponent = context.opponentTeamId
    ? getTeamForImage(context.opponentTeamId, world)
    : undefined;

  const venue = context.venueId
    ? getVenueForImage(context.venueId, world)
    : undefined;

  const payload = buildNewsImagePrompt({
    context,
    player,
    team,
    opponent,
    venue
  });

  const validation = validateImagePrompt({
    prompt: payload.prompt,
    context
  });

  if (!validation.passed) {
    return assetRepository.createFallbackAsset({
      sourceNewsId: news.id,
      sourceEventId: context.eventId,
      reason: validation.errors.join("; ")
    });
  }

  const queuedAsset = await assetService.queueImage(payload);
  await assetRepository.save(queuedAsset);

  return queuedAsset;
}

function getPlayerForImage(playerId: string, world: GameWorld) {
  const player = world.players[playerId];

  return {
    id: player.id,
    displayName: player.displayName,
    jerseyNumber: player.jerseyNumber,
    position: player.position,
    visualIdentity: player.visualIdentity
  };
}

function getTeamForImage(teamId: string, world: GameWorld) {
  const team = world.teams[teamId];

  return {
    id: team.id,
    displayName: team.displayName,
    visual: team.visual
  };
}

function getVenueForImage(venueId: string, world: GameWorld) {
  return world.venues[venueId];
}
