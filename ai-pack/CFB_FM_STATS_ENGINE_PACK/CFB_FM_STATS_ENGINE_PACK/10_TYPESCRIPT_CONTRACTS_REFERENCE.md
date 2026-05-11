# TypeScript Contracts Reference

## Purpose

This is a reference for the coding AI.

It is not required to copy every type exactly, but the implementation should preserve these concepts.

## StatDefinition

```ts
export type StatClassification = "official_style" | "internal" | "derived";

export type StatOwner =
  | "team"
  | "player"
  | "drive"
  | "game"
  | "season"
  | "career";

export type StatAggregation =
  | "sum"
  | "average"
  | "percentage"
  | "max"
  | "derived";

export type StatDisplayFormat =
  | "integer"
  | "decimal_1"
  | "percentage"
  | "time"
  | "yards"
  | "points";

export type StatDefinition = {
  id: string;
  displayName: string;
  owner: StatOwner;
  category: string;
  classification: StatClassification;
  sourceEvents: string[];
  aggregation: StatAggregation;
  displayFormat: StatDisplayFormat;
  description: string;
  validationNotes?: string[];
};
```

## PlayEvent

```ts
export type PlayEvent = {
  id: string;
  gameId: string;
  driveId: string;
  playNumber: number;
  drivePlayNumber: number;

  period: number;
  clockBefore: GameClock;
  clockAfter: GameClock;

  possessionTeamId: string;
  defenseTeamId: string;
  homeTeamId: string;
  awayTeamId: string;

  downBefore: 1 | 2 | 3 | 4;
  distanceBefore: number;
  yardsToGoalBefore: number;

  playType: PlayType;
  chargedPlayType: ChargedPlayType;

  yardsGained: number;
  airYards?: number;
  yardsAfterCatch?: number;
  yardsAfterContact?: number;

  firstDown: boolean;
  firstDownType?: "rushing" | "passing" | "penalty";

  scoring: ScoringResult | null;
  turnover: TurnoverResult | null;
  penalty: PenaltyResult | null;

  players: PlayParticipants;

  possessionChange: boolean;

  downAfter?: 1 | 2 | 3 | 4;
  distanceAfter?: number;
  yardsToGoalAfter?: number;

  statEligibility: StatEligibility;
  reasonCodes: ReasonCode[];
};
```

## StatDelta

```ts
export type StatDelta = {
  playId: string;
  ownerType: "team" | "player" | "drive";
  ownerId: string;
  statId: string;
  amount: number;
  classification: "official_style" | "internal" | "derived_support";
  reason: string;
};
```

## ReconciliationResult

```ts
export type ReconciliationResult = {
  id: string;
  severity: "pass" | "warning" | "error";
  check: string;
  expected?: number;
  actual?: number;
  message: string;
  relatedPlayIds?: string[];
};
```

## Narrative Separation

Text renderer receives PlayEvent:

```ts
export interface PlayTextRenderer {
  render(play: PlayEvent, context: GameRenderContext): string;
}
```

It does not return stats.

## Stat Accumulator Interface

```ts
export interface StatAccumulator {
  creditPlay(play: PlayEvent): StatDelta[];
  applyDeltas(gameBook: GameBook, deltas: StatDelta[]): GameBook;
  finalize(gameBook: GameBook): FinalizedGameStats;
}
```

## Reconciler Interface

```ts
export interface BoxScoreReconciler {
  reconcile(gameBook: GameBook): ReconciliationResult[];
}
```

## Calibration Target

```ts
export type CalibrationBand = {
  low: number;
  high: number;
  label: string;
};

export type StatCalibrationTarget = {
  statId: string;
  scope: "team_game" | "team_season" | "player_game" | "player_season";
  segment: string;
  bands: Record<string, CalibrationBand>;
  source: string;
  generatedAt: string;
};
```

## Anomaly

```ts
export type StatsAnomaly = {
  severity: "low" | "medium" | "high" | "critical";
  system: "stats";
  message: string;
  evidence: Record<string, unknown>;
  likelyCause?: string;
  suggestedTest?: string;
};
```
