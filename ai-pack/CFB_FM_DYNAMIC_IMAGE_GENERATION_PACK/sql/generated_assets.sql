CREATE TABLE generated_assets (
  id TEXT PRIMARY KEY,
  asset_type TEXT NOT NULL,
  source_event_id TEXT,
  source_news_id TEXT,
  source_game_id TEXT,
  file_path TEXT,
  thumbnail_path TEXT,
  prompt TEXT NOT NULL,
  negative_prompt TEXT,
  seed INTEGER NOT NULL,
  provider TEXT NOT NULL,
  status TEXT NOT NULL,
  locked INTEGER NOT NULL DEFAULT 0,
  metadata_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE generated_asset_entities (
  asset_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  label TEXT,
  PRIMARY KEY (asset_id, entity_type, entity_id)
);

CREATE INDEX idx_generated_assets_news
ON generated_assets(source_news_id);

CREATE INDEX idx_generated_assets_event
ON generated_assets(source_event_id);
