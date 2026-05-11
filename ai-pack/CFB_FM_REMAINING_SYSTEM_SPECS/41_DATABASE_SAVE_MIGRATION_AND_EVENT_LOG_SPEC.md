# 41 — Database, Save, Migration, and Event Log Spec

## North Star

The game must be persistent, auditable, replayable, and migration-safe.

A long-running dynasty sim cannot rely on fragile JSON blobs or UI-local state forever.

The early build may use JSON snapshots, but the mature build should use SQLite with explicit schemas, versioning, migrations, and event/action logs.

## Core Principles

```text
No UI-only game state.
Every stateful system must save.
Every important action must log.
Every save must include a version.
Every migration must be explicit.
Every weird state should be replayable.
```

## Persistence Architecture

Recommended mature storage:

```text
SQLite database for world state and history.
JSON config files for rulesets/balance.
Local asset folders for generated images/audio.
```

Use JSON snapshots only as early scaffolding or export/import.

## Storage Layers

```text
Config Layer:
  rulesets, balance presets, calibration targets

World State Layer:
  current career/save state

History Layer:
  seasons, games, records, awards, drafts

Event Log Layer:
  actions, sim events, audit trail

Asset Metadata Layer:
  generated portraits, logos, uniforms, stadiums, audio
```

## Save File Structure

A save should include:

```ts
type SaveMetadata = {
  saveId: string;
  saveVersion: number;
  rulesetId: string;
  balancePresetId: string;
  createdAt: string;
  updatedAt: string;
  currentSeason: number;
  currentWeek: string;
  userCoachId?: string;
  userSchoolId?: string;
  seed: string;
};
```

## SQLite Tables

Recommended tables:

```text
save_metadata
world_state
schools
conferences
conference_memberships
schedules
games
drives
plays
stat_deltas
team_game_stats
player_game_stats
team_season_stats
player_season_stats
players
prospects
staff
recruiting_states
recruiting_boards
practice_plans
team_vibe
nil_deals
booster_segments
facilities
program_items
event_log
action_log
records
awards
draft_results
media_narratives
assets
bookmarks
user_settings
```

## Early vs Mature Save Strategy

## Early

JSON snapshot:

```text
GameWorld serialized to disk.
```

Acceptable for first prototype.

## Mature

SQLite:

```text
Entities stored in normalized tables.
Large history stored as rows.
Event log stored append-only.
```

## GameWorld State Ownership

Every stateful system must declare where it lives.

Examples:

```text
Roster:
  players table + schoolId

Recruiting:
  prospects table + recruiting_states + recruiting_boards

Practice:
  practice_plans + team_vibe

Program Desk:
  program_items

Stats:
  plays + stat_deltas + game_stats + season_stats

Assets:
  assets table + file paths
```

## Event Log

The event log records things that happen in the world.

```ts
type GameEventLogEntry = {
  id: string;
  timestamp: GameDate;
  eventType: string;
  category: string;
  sourceSystem: string;
  affectedEntities: EntityRef[];
  payload: Record<string, unknown>;
  reasonCodes: ReasonCode[];
};
```

Examples:

- recruit committed
- player entered portal
- staff hired
- NIL deal flagged
- game completed
- record broken
- injury occurred
- practice plan applied

## Action Log

The action log records decisions.

```ts
type ActionLogEntry = {
  id: string;
  timestamp: GameDate;
  actorType: "user" | "ai_school" | "system" | "staff_delegate";
  actorId: string;
  actionType: string;
  targetEntities: EntityRef[];
  before?: StatePatchSummary;
  after?: StatePatchSummary;
  reasonCodes: ReasonCode[];
  packetId?: string;
};
```

Examples:

- user offered recruit
- AI school changed depth chart
- staff delegated practice plan
- user approved NIL deal
- Continue advanced week

## Replay

Replay goal:

```text
Given seed + initial state + action log, reproduce the same resulting state.
```

Early replay can be partial.

Mature replay should support:

- replay from save point
- replay season
- replay game
- replay week
- compare state hashes

## State Hashing

After major transitions, compute hash:

```text
before Continue
after Continue
after game sim
after save/load
after migration
```

Use for determinism tests.

## Migrations

Every save schema version change requires a migration.

```ts
type Migration = {
  fromVersion: number;
  toVersion: number;
  description: string;
  migrate(save: unknown): unknown;
};
```

Migration tests:

- load old save
- migrate
- validate
- save/load round trip

## Validation

Every loaded save must validate:

- entity references exist
- no duplicate IDs
- no invalid dates
- no impossible roster states
- no invalid conference memberships
- no invalid program items
- no orphaned assets
- no invalid stat links
- no missing ruleset

## Asset Metadata

```ts
type AssetRecord = {
  id: string;
  entityId?: string;
  assetType: "portrait" | "logo" | "uniform" | "stadium" | "audio" | "news";
  filePath: string;
  provider: string;
  seed?: string;
  promptHash?: string;
  locked: boolean;
  createdAt: string;
};
```

Assets are files. The database stores references.

## Save/Load Tests

Required tests:

- empty world round trip
- generated world round trip
- player hidden traits preserved
- recruiting board preserved
- schedule preserved
- game stats preserved
- ProgramItems preserved
- action log preserved
- custom school preserved
- generated asset reference preserved
- migration test

## Database Access Pattern

Do not let UI components query arbitrary tables directly.

Use repositories/services:

```text
SchoolRepository
PlayerRepository
RecruitingRepository
StatsRepository
ProgramDeskRepository
SaveRepository
```

UI calls application services, not raw database operations.

## Acceptance Criteria

This system is acceptable when:

- all core entities save/load
- migrations exist
- action log exists
- event log exists
- state validation exists
- replay scaffolding exists
- no UI-only state persists
- generated assets are referenced safely
- save/load round-trip tests pass
