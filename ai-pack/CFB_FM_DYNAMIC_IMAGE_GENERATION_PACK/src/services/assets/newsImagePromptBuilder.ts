import crypto from "crypto";
import type { EntityRef } from "../../domain/assets/generatedAsset";
import type { PlayerVisualIdentity, TeamVisualIdentity, VenueVisualIdentity } from "../../domain/assets/visualIdentity";
import type { ImagePromptPayload, NewsImageContext, NewsImageEventType, WeatherVisualContext } from "../../domain/assets/newsImage";

export function buildNewsImagePrompt(input: {
  context: NewsImageContext;
  player?: {
    id: string;
    displayName: string;
    jerseyNumber?: string;
    position: string;
    visualIdentity?: PlayerVisualIdentity;
  };
  team: {
    id: string;
    displayName: string;
    visual: TeamVisualIdentity;
  };
  opponent?: {
    id: string;
    displayName: string;
    visual: TeamVisualIdentity;
  };
  venue?: VenueVisualIdentity;
}): ImagePromptPayload {
  const { context, player, team, opponent, venue } = input;

  const playerPhrase = player
    ? `fictional ${player.position} ${player.displayName}${player.jerseyNumber ? `, jersey number ${player.jerseyNumber}` : ""}`
    : `fictional college football player from ${team.displayName}`;

  const uniformPhrase = context.uniform
    ? `${context.uniform.helmet}, ${context.uniform.jersey}, ${context.uniform.pants}`
    : team.visual.homeUniformDescription;

  const venuePhrase = venue
    ? `${venue.name} in ${venue.city}, ${venue.state}, ${venue.architectureDescription}`
    : "a packed college football stadium";

  const weatherPhrase = context.weather ? describeWeather(context.weather) : "clear football weather";
  const eventPhrase = describeEventType(context.eventType, context.scoreContext);

  const prompt = [
    "Cinematic sports media image from a fictional college football management game.",
    `${playerPhrase} during ${eventPhrase}.`,
    `Team uniform: ${uniformPhrase}.`,
    opponent ? `Opponent colors visible in the background: ${opponent.visual.primaryColor} and ${opponent.visual.secondaryColor}.` : "",
    `Location: ${venuePhrase}.`,
    `Weather and atmosphere: ${weatherPhrase}.`,
    context.period && context.clock ? `Game context: period ${context.period}, clock ${context.clock}.` : "",
    "Style: professional college football photography, realistic action shot, editorial sports magazine quality, dramatic but believable.",
    "No real logos, no real trademarks, no readable brand text, no real person likeness."
  ].filter(Boolean).join(" ");

  const negativePrompt = [
    "real logo",
    "real trademark",
    "readable text",
    "watermark",
    "extra fingers",
    "deformed hands",
    "distorted face",
    "wrong sport",
    "soccer",
    "basketball",
    "baseball",
    "cartoon",
    "anime",
    "low quality",
    "blurry",
    "AI artifacts"
  ].join(", ");

  const seed = stableSeed([
    context.eventId,
    context.newsId,
    player?.id ?? "no_player",
    team.id,
    venue?.stadiumId ?? "no_venue",
    context.eventType
  ]);

  const entityRefs: EntityRef[] = [
    { type: "team", id: team.id, label: team.displayName },
    ...(player ? [{ type: "player" as const, id: player.id, label: player.displayName }] : []),
    ...(context.gameId ? [{ type: "game" as const, id: context.gameId }] : []),
    ...(venue ? [{ type: "stadium" as const, id: venue.stadiumId, label: venue.name }] : [])
  ];

  return {
    jobId: `image_job_${context.newsId}`,
    assetType: context.importanceTier >= 4 ? "scrapbook_image" : "news_image",
    prompt,
    negativePrompt,
    seed,
    width: 1280,
    height: 720,
    sourceEventId: context.eventId,
    sourceNewsId: context.newsId,
    entityRefs,
    referenceImagePath: player?.visualIdentity?.portraitAssetId
      ? `/assets/generated/portraits/${player.visualIdentity.portraitAssetId}.png`
      : undefined,
    metadata: {
      headline: context.headline,
      eventType: context.eventType,
      importanceTier: context.importanceTier,
      weather: context.weather,
      uniform: context.uniform
    }
  };
}

function describeWeather(weather: WeatherVisualContext): string {
  switch (weather.condition) {
    case "light_rain":
      return "light rain, wet turf, stadium lights reflecting off the field";
    case "heavy_rain":
      return "heavy rain, soaked uniforms, slick turf, dramatic stadium lighting";
    case "snow":
      return "snow falling, cold breath visible, winter football atmosphere";
    case "windy":
      return "windy conditions, flags moving, unsettled sky";
    case "night":
      return "night game under bright stadium lights";
    case "hot":
      return "hot afternoon, bright sun, heat haze near the field";
    case "cold":
      return "cold football weather, bundled crowd, crisp air";
    case "cloudy":
      return "cloudy sky, muted light, fall football atmosphere";
    default:
      return "clear football weather, packed crowd";
  }
}

function describeEventType(type: NewsImageEventType, scoreContext?: string): string {
  const extra = scoreContext ? `, ${scoreContext}` : "";

  switch (type) {
    case "game_winning_touchdown":
      return `a late game-winning touchdown${extra}`;
    case "record_breaking_performance":
      return `a record-breaking performance${extra}`;
    case "rivalry_win":
      return `a major rivalry win${extra}`;
    case "top_recruit_commitment":
      return "a signing-day commitment scene";
    case "draft_selection":
      return "a draft-night celebration";
    case "award_win":
      return "a major college football award moment";
    default:
      return `an important college football moment${extra}`;
  }
}

export function stableSeed(parts: string[]): number {
  const hash = crypto.createHash("sha256").update(parts.join("|")).digest("hex");
  return parseInt(hash.slice(0, 8), 16);
}
