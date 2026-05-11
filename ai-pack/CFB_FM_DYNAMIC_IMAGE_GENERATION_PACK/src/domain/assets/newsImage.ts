import type { EntityRef } from "./generatedAsset";

export type NewsImageEventType =
  | "game_winning_touchdown"
  | "record_breaking_performance"
  | "rivalry_win"
  | "injury_return"
  | "top_recruit_commitment"
  | "signing_day"
  | "coach_hired"
  | "coach_fired"
  | "draft_selection"
  | "award_win"
  | "stadium_project"
  | "transfer_commitment";

export type WeatherVisualContext = {
  condition:
    | "clear"
    | "cloudy"
    | "light_rain"
    | "heavy_rain"
    | "snow"
    | "windy"
    | "hot"
    | "cold"
    | "night";
  temperatureF?: number;
  windMph?: number;
};

export type UniformVisualContext = {
  helmet: string;
  jersey: string;
  pants: string;
  accentColors: string[];
  number?: string;
};

export type NewsImageContext = {
  eventId: string;
  newsId: string;
  eventType: NewsImageEventType;
  importanceTier: 0 | 1 | 2 | 3 | 4;

  headline: string;
  summary: string;

  primaryPlayerId?: string;
  primaryTeamId: string;
  opponentTeamId?: string;
  gameId?: string;
  venueId?: string;

  period?: number;
  clock?: string;
  scoreContext?: string;

  weather?: WeatherVisualContext;
  uniform?: UniformVisualContext;

  allowedFacts: string[];
  forbiddenClaims: string[];
};

export type ImagePromptPayload = {
  jobId: string;
  assetType: "news_image" | "scrapbook_image" | "game_moment_image";
  prompt: string;
  negativePrompt: string;
  seed: number;
  width: number;
  height: number;

  sourceEventId: string;
  sourceNewsId?: string;

  entityRefs: EntityRef[];

  referenceImagePath?: string;

  metadata: Record<string, unknown>;
};
