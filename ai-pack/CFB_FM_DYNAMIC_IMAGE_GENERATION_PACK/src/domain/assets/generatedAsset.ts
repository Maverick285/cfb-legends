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
  provider: "comfyui" | "local_sd" | "cloud" | "mock" | "manual";

  status: GeneratedAssetStatus;
  locked: boolean;

  createdAt: string;
  updatedAt: string;

  metadata: Record<string, unknown>;
};
