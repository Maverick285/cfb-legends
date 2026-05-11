# Accumulator, Reconciliation, and Storage

## Purpose

This document defines how PlayEvents become box scores, season stats, career stats, and records.

## Pipeline

```text
PlayEvent
→ validate PlayEvent
→ produce StatDeltas
→ apply deltas to GameBook
→ update DriveSummary
→ reconcile BoxScore
→ persist GameStats
→ update SeasonStats
→ update CareerStats
→ update Records/Leaderboards
```

## StatAccumulator

```ts
type StatAccumulator = {
  applyPlay(gameBook: GameBook, play: PlayEvent): GameBook;
  applyDeltas(gameBook: GameBook, deltas: StatDelta[]): GameBook;
  finalizeGame(gameBook: GameBook): FinalizedGameStats;
};
```

## GameBook

```ts
type GameBook = {
  gameId: string;
  teams: [string, string];
  plays: Record<string, PlayEvent>;
  drives: Record<string, Drive>;
  teamStats: Record<string, TeamGameStats>;
  playerStats: Record<string, PlayerGameStats>;
  scoringSummary: ScoringSummaryEntry[];
  validation: ReconciliationResult[];
};
```

## TeamGameStats

Store raw counts first.

```ts
type TeamGameStats = {
  teamId: string;

  points: number;

  totalYards: number;
  totalPlays: number;

  passing: {
    attempts: number;
    completions: number;
    yards: number;
    touchdowns: number;
    interceptions: number;
    sacksAllowed: number;
    sackYardsAllowed: number;
  };

  rushing: {
    attempts: number;
    yards: number;
    touchdowns: number;
  };

  firstDowns: {
    total: number;
    rushing: number;
    passing: number;
    penalty: number;
  };

  downs: {
    thirdAttempts: number;
    thirdConversions: number;
    fourthAttempts: number;
    fourthConversions: number;
  };

  redZone: {
    trips: number;
    scores: number;
    touchdowns: number;
    fieldGoals: number;
  };

  turnovers: {
    total: number;
    interceptionsThrown: number;
    fumblesLost: number;
  };

  defense: {
    yardsAllowed: number;
    passingYardsAllowed: number;
    rushingYardsAllowed: number;
    sacks: number;
    interceptions: number;
    fumblesForced: number;
    fumblesRecovered: number;
    defensiveTouchdowns: number;
  };

  penalties: {
    accepted: number;
    yards: number;
  };

  specialTeams: {
    punts: number;
    puntYards: number;
    fieldGoalAttempts: number;
    fieldGoalsMade: number;
    extraPointAttempts: number;
    extraPointsMade: number;
    kickoffReturns: number;
    kickoffReturnYards: number;
    puntReturns: number;
    puntReturnYards: number;
  };

  clock: {
    timeOfPossessionSeconds: number;
  };

  internal: {
    successRateNumerator: number;
    successRateDenominator: number;
    explosivePlays: number;
    garbageTimePlays: number;
    pressures: number;
    havocPlays: number;
  };
};
```

## PlayerGameStats

Use optional groups so not every player has every stat.

```ts
type PlayerGameStats = {
  playerId: string;
  teamId: string;

  passing?: {
    attempts: number;
    completions: number;
    yards: number;
    touchdowns: number;
    interceptions: number;
    sacksTaken: number;
    sackYardsLost: number;
  };

  rushing?: {
    attempts: number;
    yards: number;
    touchdowns: number;
  };

  receiving?: {
    targetsInternal: number;
    receptions: number;
    yards: number;
    touchdowns: number;
    dropsInternal: number;
  };

  defense?: {
    soloTackles: number;
    assistedTackles: number;
    tacklesForLoss: number;
    sacks: number;
    sackYards: number;
    interceptions: number;
    interceptionReturnYards: number;
    passesDefended: number;
    forcedFumbles: number;
    fumbleRecoveries: number;
  };

  specialTeams?: {
    fieldGoalAttempts: number;
    fieldGoalsMade: number;
    extraPointAttempts: number;
    extraPointsMade: number;
    punts: number;
    puntYards: number;
    kickoffReturns: number;
    kickoffReturnYards: number;
    puntReturns: number;
    puntReturnYards: number;
  };

  ballSecurity?: {
    fumbles: number;
    fumblesLost: number;
  };

  internal?: Record<string, number>;
};
```

## Box Score Reconciliation

Every finalized game must run reconciliation.

## Required Checks

### Score Checks

```text
team points == sum(scoring plays by team)
```

### Total Offense

```text
team total yards == team passing yards + team rushing yards
```

### Passing

```text
team pass attempts == sum player pass attempts
team completions == sum player completions
team passing yards == sum player passing yards
team passing TD == sum player passing TD
team INT thrown == sum player INT thrown
```

### Rushing

```text
team rush attempts == sum player rush attempts + team rush attempts
team rushing yards == sum player rushing yards + team rushing yards
team rushing TD == sum player rushing TD
```

### Receiving

```text
team completions == sum receptions
team passing yards == sum receiving yards
team passing TD == sum receiving TD
```

Exception:
Stat manual special cases must be explicitly represented.

### Turnovers

```text
offense turnovers == interceptions thrown + fumbles lost
defense turnovers forced == interceptions + fumble recoveries
```

### First Downs

```text
first_downs_total == rushing + passing + penalty
```

### Plays

```text
totalPlays == rushing attempts + passing attempts
```

Need manual-confirmed handling for sacks/spikes/kneels. Use configured official-style rule.

### Drives

```text
drive yards == sum eligible play yards within drive
drive points == scoring result points within drive
```

### Special Teams

Special teams yards must not leak into total offense.

### Penalties

Penalty yards must not leak into total offense.

## Reconciliation Result

```ts
type ReconciliationResult = {
  id: string;
  severity: "pass" | "warning" | "error";
  check: string;
  expected?: number;
  actual?: number;
  message: string;
  relatedPlayIds?: string[];
};
```

If any `error` exists, the game should not finalize without debug override.

## Season Stats

Season stats are sums of finalized game stats.

```ts
type PlayerSeasonStats = {
  playerId: string;
  season: number;
  gamesPlayed: number;
  gamesStarted: number;
  gameStats: string[];
  totals: PlayerGameStats;
};
```

```ts
type TeamSeasonStats = {
  teamId: string;
  season: number;
  gamesPlayed: number;
  gameStats: string[];
  totals: TeamGameStats;
};
```

## Career Stats

Career stats are sums of season stats.

Need support transfer history:

```ts
type PlayerCareerStats = {
  playerId: string;
  seasons: Record<number, PlayerSeasonStats>;
  bySchool: Record<string, PlayerGameStats>;
  careerTotals: PlayerGameStats;
};
```

## Records

Records should be derived after finalized stats.

Record scopes:

```text
school_game
school_season
school_career
conference_game
conference_season
conference_career
national_game
national_season
national_career
```

Record examples:

- passing yards game
- passing yards season
- rushing yards game
- receiving yards game
- sacks season
- interceptions season
- points game
- team total yards game
- team points game

## Storage Strategy

Early:

```text
JSON save snapshot is acceptable.
```

Mature:

```text
SQLite tables for games, plays, game_stats, season_stats, career_stats, records.
```

## Suggested SQLite Tables

```text
games
drives
plays
stat_deltas
team_game_stats
player_game_stats
team_season_stats
player_season_stats
player_career_stats
records
```

## Persistence Rule

Do not store only aggregate stats.

Store enough play/stat delta data to audit and replay.

Minimum:

- PlayEvent log
- StatDeltas
- finalized box score
- season aggregate

## Accumulator Acceptance Criteria

The accumulator is acceptable when:

- stat deltas are deterministic
- every play can be audited
- every box score reconciles
- season stats equal game sums
- career stats equal season sums
- special teams/penalties/returns are separated correctly
- records update from finalized stats
- save/load preserves all stats
