# Structured Play Event Schema

## Purpose

The PlayEvent is the foundation of the entire stats engine.

Every play must be represented as structured data before it becomes text.

## Required PlayEvent Fields

```ts
type PlayEvent = {
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
  yardLineBefore: FieldPosition;

  playCall?: PlayCallContext;
  playType: PlayType;
  chargedPlayType: ChargedPlayType;

  result: PlayResult;

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
  yardLineAfter?: FieldPosition;

  statEligibility: StatEligibility;

  reasonCodes: ReasonCode[];
};
```

## GameClock

```ts
type GameClock = {
  minutes: number;
  seconds: number;
};
```

## FieldPosition

Use yards to goal internally because it avoids midfield ambiguity.

```ts
type FieldPosition = {
  yardsToGoal: number; // 1 to 99, with 100 at own goal if needed
  display: string;     // "OU 43", "TEX 12"
};
```

## PlayType

This describes what happened broadly.

```ts
type PlayType =
  | "rush"
  | "pass"
  | "sack"
  | "scramble"
  | "kneel_down"
  | "spike"
  | "punt"
  | "field_goal"
  | "extra_point"
  | "two_point"
  | "kickoff"
  | "kickoff_return"
  | "punt_return"
  | "interception_return"
  | "fumble_return"
  | "penalty_only"
  | "timeout"
  | "end_period";
```

## ChargedPlayType

This tells the stat engine how the play should be credited.

Example: A called pass that becomes a sack may have:

```text
playType = "sack"
chargedPlayType = "rush_loss_sack_college"
```

```ts
type ChargedPlayType =
  | "rushing_attempt"
  | "passing_attempt_complete"
  | "passing_attempt_incomplete"
  | "passing_attempt_interception"
  | "sack_college_rushing_loss"
  | "scramble_rush"
  | "kneel_down_rush"
  | "spike_pass_attempt"
  | "punt"
  | "field_goal_attempt"
  | "extra_point_attempt"
  | "two_point_attempt"
  | "kickoff"
  | "return"
  | "penalty_no_play"
  | "penalty_live_ball"
  | "no_stat";
```

## PlayResult

```ts
type PlayResult = {
  outcome:
    | "gain"
    | "loss"
    | "no_gain"
    | "complete"
    | "incomplete"
    | "touchdown"
    | "turnover"
    | "penalty"
    | "score"
    | "change_of_possession";
  descriptionKey: string;
};
```

## ScoringResult

```ts
type ScoringResult = {
  type:
    | "offensive_td"
    | "defensive_td"
    | "special_teams_td"
    | "field_goal"
    | "extra_point"
    | "two_point"
    | "safety";
  points: number;
  scoringTeamId: string;
  primaryPlayerId?: string;
  assistingPlayerId?: string;
};
```

## TurnoverResult

```ts
type TurnoverResult = {
  type: "interception" | "fumble_lost" | "turnover_on_downs" | "blocked_kick_recovered";
  creditedToPlayerId?: string;
  recoveredByPlayerId?: string;
  forcedByPlayerId?: string;
  returnYards?: number;
  returnedForTouchdown?: boolean;
};
```

## PenaltyResult

Penalties must be explicit.

```ts
type PenaltyResult = {
  exists: boolean;
  accepted: boolean;
  declined: boolean;
  offsetting: boolean;
  enforcement:
    | "no_play"
    | "live_ball"
    | "dead_ball"
    | "post_play"
    | "spot_foul"
    | "previous_spot"
    | "succeeding_spot";
  penalizedTeamId: string;
  penalizedPlayerId?: string;
  penaltyType: string;
  yards: number;
  automaticFirstDown: boolean;
  lossOfDown: boolean;
  negatesPlayStats: boolean;
};
```

## PlayParticipants

```ts
type PlayParticipants = {
  passerId?: string;
  rusherId?: string;
  receiverId?: string;
  intendedReceiverId?: string;
  tacklerIds?: string[];
  primaryTacklerId?: string;
  assistedTacklerIds?: string[];
  sackerIds?: string[];
  interceptorId?: string;
  forcedFumblePlayerId?: string;
  fumbleRecovererId?: string;
  returnerId?: string;
  kickerId?: string;
  punterId?: string;
  holderId?: string;
  longSnapperId?: string;
  primaryDefenderId?: string;
  coverageDefenderId?: string;
  pressureDefenderId?: string;
  blockerChargedId?: string;
};
```

## StatEligibility

This tells the accumulator whether stats count.

```ts
type StatEligibility = {
  countsForOfficialStats: boolean;
  countsForTeamOffense: boolean;
  countsForPlayerOffense: boolean;
  countsForDefense: boolean;
  countsForSpecialTeams: boolean;
  nullifiedByPenalty: boolean;
  garbageTime: boolean;
  internalOnly: boolean;
};
```

## Reason Codes

Reason codes are crucial for debugging.

```ts
type ReasonCode = {
  code: string;
  label: string;
  value?: number;
  detail?: string;
};
```

Examples:

```text
play_success_from_qb_processing
rush_stuffed_by_defensive_front
completion_boost_from_scheme_fit
penalty_nullified_play
sack_charged_as_college_rushing_loss
```

## Drive Object

```ts
type Drive = {
  id: string;
  gameId: string;
  offenseTeamId: string;
  defenseTeamId: string;
  startPeriod: number;
  endPeriod?: number;
  startClock: GameClock;
  endClock?: GameClock;
  startYardsToGoal: number;
  endYardsToGoal?: number;
  plays: string[];
  result:
    | "touchdown"
    | "field_goal"
    | "punt"
    | "turnover"
    | "turnover_on_downs"
    | "safety"
    | "end_half"
    | "end_game";
  points: number;
  yards: number;
  timeElapsedSeconds: number;
  redZoneTrip: boolean;
};
```

## Why This Schema Matters

If the PlayEvent is complete, all of these become easier:

- stat crediting
- box score reconciliation
- play-by-play text
- Data Lab validation
- replay debugging
- LLM commentary
- awards
- draft projection
- historical records

If the PlayEvent is vague, every downstream system becomes guesswork.
