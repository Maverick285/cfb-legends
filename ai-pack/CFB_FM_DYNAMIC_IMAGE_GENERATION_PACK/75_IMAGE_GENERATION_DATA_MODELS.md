# 75 — Image Generation Data Models

## Purpose

This document defines the TypeScript data models for dynamic generated images.

## GeneratedAsset

```ts
export type GeneratedAssetType =
  | "player_portrait"
  | "coach_portrait"
  | "news_image"
  | "scrapbook_image"
  | "game_moment_image"
  | "stadium_image"
  | "uniform_preview"
  | "recruit_commitment_image"
  | "draft_night_image";

export type GeneratedAssetStatus =
  | "queued"
  | "generating"
  | "ready"
  | "failed"
  | "fallback";

export type GeneratedAsset = {
  id: string;
  assetType: GeneratedAssetType;
  entityRefs: EntityRef[];
  sourceEventId?: string;
  sourceNewsId?: string;
  sourceGameId?: string;

  filePath?: string;
  thumbnailPath?: string;

  prompt: string;
  negativePrompt?: string;
  seed: number;
  provider: "comfyui" | "local_sd" | "cloud" | "mock";

  status: GeneratedAssetStatus;
  locked: boolean;

  createdAt: string;
  updatedAt: string;

  metadata: Record<string, unknown>;
};
```

## EntityRef

```ts
export type EntityRef = {
  type:
    | "player"
    | "team"
    | "school"
    | "game"
    | "stadium"
    | "news"
    | "scrapbook"
    | "coach"
    | "prospect";
  id: string;
  label?: string;
};
```

## PlayerVisualIdentity

```ts
export type PlayerVisualIdentity = {
  playerId: string;
  visualSeed: number;
  portraitAssetId?: string;

  descriptors: {
    ageBand: string;
    build: string;
    skinToneDescriptor?: string;
    hair?: string;
    facialHair?: string;
    faceShape?: string;
    expressionDefault?: string;
  };

  locked: boolean;
};
```

## TeamVisualIdentity

```ts
export type TeamVisualIdentity = {
  teamId: string;
  schoolId: string;
  primaryColor: string;
  secondaryColor: string;
  helmetDescription: string;
  homeUniformDescription: string;
  awayUniformDescription: string;
  alternateUniformDescriptions: string[];
  logoAssetId?: string;
  allowRealLogoPrivateModeOnly: boolean;
};
```

## VenueVisualIdentity

```ts
export type VenueVisualIdentity = {
  stadiumId: string;
  name: string;
  city: string;
  state: string;
  stadiumType:
    | "college_bowl"
    | "campus_stadium"
    | "dome"
    | "neutral_site"
    | "small_college";
  capacityBand: string;
  turfDescription: string;
  architectureDescription: string;
  crowdDescription: string;
};
```

## NewsImageContext

```ts
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
```

## ImagePromptPayload

```ts
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
```

## Image Style Preset

```ts
export type ImageStylePreset = {
  id: string;
  label: string;
  promptSuffix: string;
  negativePromptAdditions: string[];
  width: number;
  height: number;
  autoGenerateMinTier: 0 | 1 | 2 | 3 | 4;
};
```

## Data Ownership

```text
Player visual identity:
  player entity or asset repository

Team visual identity:
  school/team identity system

Venue visual identity:
  stadium/facilities system

Generated asset:
  generated_assets table / asset repository

News image context:
  built from event/news/game state at generation time
```

## Acceptance Criteria

The model layer is acceptable when:

- every generated image has source event/news references
- every generated image stores prompt/seed/provider/status
- player/team/venue visual identities exist
- news context has allowed/forbidden facts
- image prompts can be rebuilt/audited
