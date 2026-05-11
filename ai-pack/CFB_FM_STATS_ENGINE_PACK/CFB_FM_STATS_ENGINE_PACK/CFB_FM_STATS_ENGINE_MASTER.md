

<!-- FILE: 00_START_HERE_STATS_ENGINE.md -->

# CFB-FM Stats Engine Pack — Start Here

## Purpose

This pack defines the stats engine for the CFB-FM project.

The immediate goal is **not** colorful play-by-play prose.

The immediate goal is:

```text
A structured play-event engine that credits stats correctly,
builds believable box scores,
stores season/career stats,
and validates outputs against real college football distributions.
```

Color commentary, broadcast flavor, and LLM-written play descriptions can come later.

## Core Rule

```text
Structured PlayEvent = truth.
Generated text = presentation.
```

Never parse play-by-play text to create stats.

Correct flow:

```text
Game situation
→ play generator creates structured PlayEvent
→ stat engine converts PlayEvent into StatDeltas
→ accumulator builds box score
→ reconciler validates totals
→ season/career stat store updates
→ text renderer writes play-by-play sentence
```

Wrong flow:

```text
Text sentence
→ parse sentence
→ guess stats
```

## Why This Matters

Stats drive:

- awards
- draft stock
- NIL value
- morale
- recruiting pitches
- player development reputation
- staff reputation
- scheme identity
- media stories
- history
- records
- coach evaluation

If the stats are fake, everything downstream becomes fake.

## What This Pack Contains

- `01_STATS_ENGINE_NORTH_STAR.md`
- `02_STAT_TAXONOMY_AND_DEFINITIONS.md`
- `03_PLAY_EVENT_SCHEMA.md`
- `04_STAT_CREDIT_RULES.md`
- `05_ACCUMULATOR_RECONCILIATION_AND_STORAGE.md`
- `06_CALIBRATION_TARGETS_AND_DATA_PIPELINE.md`
- `07_TESTING_AND_INVARIANTS.md`
- `08_AI_BUILD_PACKETS_STATS_ENGINE.md`
- `09_READY_TO_PASTE_STATS_PROMPTS.md`
- `10_TYPESCRIPT_CONTRACTS_REFERENCE.md`
- `CFB_FM_STATS_ENGINE_MASTER.md`

## Sources To Treat As Authoritative

Use the NCAA Football Statisticians' Manual as the stat-credit authority.

Use CollegeFootballData / cfbfastR as the real play-by-play calibration source.

Use NCAA/ESPN stat pages only as broad public sanity checks.

## Immediate Build Priority

Build in this order:

1. Stat taxonomy
2. PlayEvent schema
3. StatDelta schema
4. StatAccumulator
5. Box score reconciler
6. Season/career stat store
7. Real-data calibration pipeline
8. Data Lab validation
9. Play generator integration
10. Text play-by-play renderer

Do not jump straight to pretty play text.


<!-- FILE: 01_STATS_ENGINE_NORTH_STAR.md -->

# Stats Engine North Star

## Goal

The stats engine must mirror real college football stat behavior closely enough that:

- game box scores look real
- player stat lines look real
- team season averages look real
- league-wide stat distributions look real
- awards/draft/NIL/recruiting effects have credible inputs
- multi-year sims do not inflate or collapse stats

The engine should be official-style, not arcade-style.

## What The Stats Engine Is

The stats engine is a deterministic rules system that takes structured play events and produces:

- team stat deltas
- player stat deltas
- drive summaries
- game box scores
- season stats
- career stats
- school records
- conference/national leaders
- advanced/internal metrics

## What The Stats Engine Is Not

The stats engine does not decide:

- which play is called
- whether the pass is complete
- whether a defender wins a matchup
- whether the QB throws a pick
- whether weather affects accuracy

Those are game-simulation responsibilities.

The stats engine only answers:

```text
Given this structured play result, who earns which stats?
```

## Required Design Separation

```text
Play Generator:
  Decides what happened.

Stats Engine:
  Credits what happened.

Text Renderer:
  Describes what happened.

Data Lab:
  Checks whether the season looks realistic.
```

## Correct Inputs

The play generator must eventually use these inputs to create realistic plays.

### Game Context

- game id
- season
- week
- teams
- venue
- home/away/neutral
- weather
- rivalry status
- postseason status

### Game State

- quarter/period
- clock
- down
- distance
- yards to goal
- field position
- score
- timeouts
- possession
- drive state
- play number
- overtime state

### Team Context

- offensive scheme
- defensive scheme
- tempo
- game plan
- playbook install quality
- practice readiness
- team vibe
- fatigue
- morale
- home-field pressure
- staff quality
- coordinator tendencies

### Personnel Context

- player attributes
- depth chart roles
- fatigue
- injuries
- substitution package
- position fit
- play-specific assignment
- experience
- chemistry
- pressure handling

### Tactical Context

- personnel group
- formation family
- play concept
- defensive front
- coverage family
- blitz/pressure
- box count
- tempo mode
- clock strategy
- score pressure

### Outcome Context

- play type
- result
- yards gained
- air yards
- yards after catch
- yards after contact
- pressure
- sack
- fumble
- interception
- penalty
- return
- scoring result
- first down
- possession change

The stats engine receives the outcome context, not all hidden sim calculations.

## Correct Outputs

### Per Play

- StatDeltas
- updated down/distance/clock
- updated score
- updated possession
- drive event
- play validation result

### Per Drive

- plays
- yards
- result
- starting field position
- ending field position
- time elapsed
- points
- turnovers
- red-zone trip
- scoring opportunity

### Per Game

- team box score
- player box score
- drive chart
- play log
- scoring summary
- advanced metrics
- validation status

### Per Season

- team season stats
- player season stats
- conference leaders
- national leaders
- awards inputs
- draft inputs
- records

## Official vs Internal Stats

The game should store both.

### Official-Style Stats

These are used for box scores, records, awards, public leaderboards.

Examples:

- passing yards
- rushing yards
- receiving yards
- tackles
- sacks
- interceptions
- points
- first downs

### Internal Stats

These are used for game logic, scouting, development, draft, and analytics.

Examples:

- pressure rate
- route grade
- coverage grade
- run stop grade
- assignment busts
- explosive-play allowed
- yards after contact
- success rate
- EPA-like value
- pass protection grade

Internal stats can be approximate early.

Official-style stats must be consistent.

## Stat Engine Depth Score Target

This system must eventually reach Depth Score 5.

### Score 1

Scores and fake box scores.

### Score 2

Basic team/player stats.

### Score 3

Structured plays feed stat deltas and box scores.

### Score 4

Penalty/turnover/special teams edge cases, season stats, records, validation.

### Score 5

Real-data calibrated distributions, long-run validation, awards/draft/NIL integration.

## Non-Negotiables

- No text parsing to earn stats.
- No unseeded randomness in stat crediting.
- Team totals must reconcile.
- Player totals must reconcile where applicable.
- Score must match scoring plays.
- Season stats must equal game stat sums.
- Career stats must equal season stat sums.
- Stat engine must run headlessly.
- Stat rules must be testable play by play.
- Edge cases must be handled explicitly or flagged as unsupported.


<!-- FILE: 02_STAT_TAXONOMY_AND_DEFINITIONS.md -->

# Stat Taxonomy and Definitions

## Purpose

This file defines the stat registry the game needs before a real stat engine can exist.

Every stat should have:

- id
- display name
- owner type
- official/internal classification
- source play types
- aggregation rule
- display format
- validation notes

## Owner Types

```text
Team
Player
Drive
Game
Season
Career
SchoolRecord
ConferenceRecord
NationalRecord
```

## Official-Style Team Stats

### Scoring

```text
points
touchdowns
offensive_touchdowns
defensive_touchdowns
special_teams_touchdowns
passing_touchdowns
rushing_touchdowns
receiving_touchdowns
field_goals_made
extra_points_made
two_point_conversions
safeties
points_per_game
points_per_drive
```

### Total Offense

```text
total_yards
total_plays
yards_per_play
passing_yards
rushing_yards
passing_attempts
pass_completions
rushing_attempts
turnovers
first_downs
```

Important college-football rule target:

```text
Sacks should be treated according to college-stat rules.
The implementation should follow the NCAA Football Statisticians' Manual.
In college football, sack yardage is generally charged against rushing rather than passing.
```

### Passing

```text
team_pass_attempts
team_pass_completions
team_completion_percentage
team_passing_yards
team_passing_touchdowns
team_interceptions_thrown
team_sacks_allowed
team_sack_yards_allowed
team_yards_per_pass_attempt
team_adjusted_passing_efficiency_internal
```

### Rushing

```text
team_rush_attempts
team_rushing_yards
team_rushing_touchdowns
team_yards_per_rush
team_tackles_for_loss_allowed
team_rushing_first_downs
```

### Receiving

Receiving is usually player-owned, but team summaries may include:

```text
team_receptions
team_receiving_yards
team_receiving_touchdowns
team_drops_internal
team_yards_after_catch_internal
```

### Downs

```text
first_downs_total
first_downs_rushing
first_downs_passing
first_downs_penalty
third_down_attempts
third_down_conversions
third_down_percentage
fourth_down_attempts
fourth_down_conversions
fourth_down_percentage
```

### Red Zone

```text
red_zone_trips
red_zone_scores
red_zone_touchdowns
red_zone_field_goals
red_zone_empty_trips
red_zone_td_percentage
red_zone_scoring_percentage
```

### Drives

```text
drives
drive_plays
drive_yards
average_starting_field_position
average_drive_yards
average_drive_plays
average_drive_time
points_per_drive
turnovers_per_drive
```

### Penalties

```text
penalties
penalty_yards
accepted_penalties
declined_penalties
offsetting_penalties
pre_snap_penalties_internal
post_play_penalties_internal
```

### Defense

```text
points_allowed
yards_allowed
plays_allowed
yards_per_play_allowed
passing_yards_allowed
rushing_yards_allowed
first_downs_allowed
third_down_conversions_allowed
turnovers_forced
sacks
tackles_for_loss
interceptions
fumbles_forced
fumbles_recovered
defensive_touchdowns
red_zone_trips_allowed
red_zone_scores_allowed
```

### Special Teams

```text
kickoff_returns
kickoff_return_yards
kickoff_return_touchdowns
punt_returns
punt_return_yards
punt_return_touchdowns
punts
punt_yards
net_punt_yards
field_goal_attempts
field_goals_made
extra_point_attempts
extra_points_made
blocked_kicks
touchbacks
```

### Clock

```text
time_of_possession_seconds
average_time_per_drive
plays_per_game
seconds_per_play_internal
garbage_time_plays_internal
```

## Official-Style Player Stats

## Quarterback / Passer

```text
pass_attempts
pass_completions
completion_percentage
passing_yards
passing_touchdowns
interceptions_thrown
sacks_taken
sack_yards_lost
passing_first_downs
yards_per_attempt
yards_per_completion
fumbles
fumbles_lost
rushing_attempts
rushing_yards
rushing_touchdowns
```

Internal:

```text
air_yards
yards_after_catch_generated
turnover_worthy_throws
big_time_throws
pressure_dropbacks
pressured_completions
scramble_yards
designed_run_yards
coverage_read_grade
```

## Running Back / Rusher

```text
rushing_attempts
rushing_yards
rushing_touchdowns
yards_per_carry
rushing_first_downs
receptions
receiving_yards
receiving_touchdowns
fumbles
fumbles_lost
```

Internal:

```text
yards_after_contact
broken_tackles
stuffed_runs
explosive_runs
pass_protection_snaps
pass_protection_failures
```

## Receiver / Tight End

```text
targets_internal
receptions
receiving_yards
receiving_touchdowns
yards_per_reception
receiving_first_downs
fumbles
fumbles_lost
```

Internal:

```text
drops
yards_after_catch
contested_catches
explosive_receptions
route_grade
separation_score
```

## Offensive Line

Mostly internal, because official box scores rarely credit OL.

```text
snaps_internal
sacks_allowed_internal
pressures_allowed_internal
run_block_grade_internal
pass_block_grade_internal
penalties
missed_assignments_internal
```

## Defensive Players

```text
total_tackles
solo_tackles
assisted_tackles
tackles_for_loss
sacks
sack_yards
interceptions
interception_return_yards
interception_return_touchdowns
passes_defended
forced_fumbles
fumble_recoveries
fumble_return_yards
fumble_return_touchdowns
defensive_touchdowns
blocked_kicks
```

Internal:

```text
pressures
qb_hits
run_stops
missed_tackles
coverage_targets
coverage_completions_allowed
coverage_yards_allowed
havoc_plays
```

## Specialists

### Kicker

```text
field_goal_attempts
field_goals_made
field_goal_percentage
long_field_goal
extra_point_attempts
extra_points_made
extra_point_percentage
kickoffs
touchbacks
```

Internal:

```text
expected_fg_value
pressure_kicks
weather_adjusted_kicks
```

### Punter

```text
punts
punt_yards
average_punt
long_punt
inside_20
touchbacks
blocked_punts
```

Internal:

```text
net_punt_value
directional_success
hang_time_estimate
```

### Returner

```text
kickoff_returns
kickoff_return_yards
kickoff_return_touchdowns
punt_returns
punt_return_yards
punt_return_touchdowns
fumbles
fumbles_lost
```

## Advanced/Internal Team Metrics

These are not required for official box score, but are important for Data Hub.

```text
success_rate
explosive_play_rate
havoc_rate
points_per_scoring_opportunity
finishing_drives
field_position_value
turnover_margin
pressure_rate
stuff_rate
red_zone_efficiency
garbage_time_adjusted_efficiency
tempo_adjusted_efficiency
```

## Stat Definition Object

```ts
type StatDefinition = {
  id: string;
  displayName: string;
  owner: "team" | "player" | "drive" | "game" | "season" | "career";
  category: string;
  classification: "official_style" | "internal" | "derived";
  sourceEvents: string[];
  aggregation: "sum" | "average" | "percentage" | "max" | "derived";
  displayFormat: "integer" | "decimal_1" | "percentage" | "time" | "yards" | "points";
  description: string;
  validationNotes?: string[];
};
```

## Derived Stat Examples

```text
completion_percentage = completions / attempts
yards_per_attempt = passing_yards / pass_attempts
yards_per_play = total_yards / total_plays
third_down_percentage = third_down_conversions / third_down_attempts
points_per_drive = points / drives
```

Derived stats should never be separately stored as truth unless needed for performance.

Store raw counting stats first.

## Display Principle

The UI should distinguish:

```text
Official-style stat
Internal analytic stat
Derived stat
```

This avoids confusing the player when internal grades do not match public stat categories.


<!-- FILE: 03_PLAY_EVENT_SCHEMA.md -->

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


<!-- FILE: 04_STAT_CREDIT_RULES.md -->

# Stat Credit Rules

## Purpose

This document defines how structured PlayEvents should be converted into StatDeltas.

The NCAA Football Statisticians' Manual should be the final authority for official-style rules. This document gives the implementation structure and default behavior.

## Core Output: StatDelta

```ts
type StatDelta = {
  playId: string;
  ownerType: "team" | "player" | "drive";
  ownerId: string;
  statId: string;
  amount: number;
  classification: "official_style" | "internal" | "derived_support";
  reason: string;
};
```

## General Rules

1. Only structured PlayEvents create official stats.
2. Text descriptions never create stats.
3. Penalty enforcement determines whether the play counts.
4. Return yards are separate from offensive yards.
5. Penalty yards are separate from offensive yards.
6. Defensive/special teams TDs count as points but not offensive yards.
7. Team totals must reconcile after every game.
8. Sacks must follow college-stat treatment.

---

# Passing Plays

## Completed Pass

Input:

```text
chargedPlayType = passing_attempt_complete
yardsGained = Y
passerId exists
receiverId exists
```

Credit:

Passer:
- +1 pass_attempt
- +1 pass_completion
- +Y passing_yards
- +1 passing_touchdown if scoring offensive TD

Receiver:
- +1 reception
- +Y receiving_yards
- +1 receiving_touchdown if scoring offensive TD

Offense Team:
- +1 pass_attempt
- +1 pass_completion
- +Y passing_yards
- +Y total_yards
- +1 total_play
- +1 first_down_passing if firstDownType = passing

Defense Team:
- yards_allowed +Y
- passing_yards_allowed +Y

Internal:
- air_yards
- yards_after_catch
- target
- coverage target

## Incomplete Pass

Credit:

Passer:
- +1 pass_attempt

Intended Receiver:
- +1 target_internal

Offense Team:
- +1 pass_attempt
- +1 total_play

Defense:
- +1 pass_attempt_allowed
- +1 pass_defended if participant exists and event marks pass defended

No passing yards.

## Interception

Credit:

Passer:
- +1 pass_attempt
- +1 interception_thrown

Defense:
- interceptor +1 interception
- team +1 interception
- team +1 turnover_forced

If return:
- interceptor +return_yards
- defense team +interception_return_yards
- defensive TD if returned for score

Offense:
- +1 turnover

Team passing yards:
- normally 0 unless completed then fumbled/intercepted edge case is represented differently.

## Spike

Implementation note:

Use manual-confirmed rule.

Default configurable behavior:

```text
spike counts as pass attempt, incomplete, no target
```

But this must be tied to NCAA manual confirmation.

## Intentional Grounding

Treat as penalty/sack-style according to manual and ruleset.

Do not approximate silently.

Represent explicitly as penalty with loss/down effects.

---

# Rushing Plays

## Designed Rush

Input:

```text
chargedPlayType = rushing_attempt
rusherId exists
yardsGained = Y
```

Credit:

Rusher:
- +1 rushing_attempt
- +Y rushing_yards
- +1 rushing_touchdown if offensive TD

Offense Team:
- +1 rushing_attempt
- +Y rushing_yards
- +Y total_yards
- +1 total_play
- +1 first_down_rushing if firstDownType = rushing

Defense:
- rushing_yards_allowed +Y

Internal:
- yards_after_contact
- broken tackles
- run stuff if applicable

## Scramble

Credit as rushing attempt by QB.

Also mark internal:

```text
scramble_yards
```

## Sack

College-style default:

```text
Sack is charged as a rushing attempt and negative rushing yards to the passer/team.
```

Credit:

Passer/QB:
- +1 rushing_attempt
- negative rushing_yards
- +1 sack_taken
- sack_yards_lost

Offense Team:
- +1 rushing_attempt
- negative rushing_yards
- negative total_yards
- +1 total_play
- +1 sack_allowed
- sack_yards_allowed

Defense:
- sacker +1 sack
- sacker +sack_yards
- team +1 sack
- team +sack_yards
- likely +1 tackle_for_loss depending rule implementation
- pressure defender internal credit if different

Important:
- no pass attempt
- no passing yards

## Kneel Down

Default:

```text
credit as QB rushing attempt with negative yards
```

But mark:

```text
kneel_down_internal = true
```

So analytics can exclude kneel-downs from efficiency if desired.

## Bad Snap / Team Rush

If no individual should be credited, use team rushing entry.

Use official manual for exact classification.

Represent with:

```text
ownerType = team
statId = team_rush_attempt
```

and optional player impact if identified.

---

# Receiving

Receiving stats usually come from completed passes.

Receiver earns:

- reception
- receiving yards
- receiving TD
- receiving first down
- fumble if fumbles after catch

Targets and drops are internal unless the design chooses to show them.

## Yards After Catch

Internal:

```text
receiver +YAC
team +YAC
```

Should not double-count official receiving yards.

---

# Fumbles

## Fumble On Rush

Rusher receives:

- rushing attempt
- rushing yards to point credited by play event
- fumble
- fumble_lost if turnover

Defense receives:

- forced fumble if forcedByPlayerId
- fumble recovery if recoveredByPlayerId
- fumble return yards if return
- defensive TD if returned for score

Team:
- offense turnover if lost
- defense turnover forced

## Fumble After Reception

Receiver receives:

- reception
- receiving yards credited by event
- fumble
- fumble_lost if turnover

Passer still receives:

- pass attempt
- completion
- passing yards credited by event

## Fumble Return

Return yards are not offensive yards.

Credit:

- fumble_recoverer return yards
- defensive/special teams team return yards
- TD if scored

## Fumble Not Lost

Credit fumble to player.
No turnover.

---

# Penalties

Penalty logic is one of the most important areas.

## Penalty Types By Enforcement

```text
No Play
Live Ball
Dead Ball
Post Play
Offsetting
Declined
```

## No-Play Penalty

If penalty negates play:

```text
statEligibility.nullifiedByPenalty = true
```

Credit:

- penalty
- penalty yards

Do not credit normal play stats.

Examples:
- false start
- offensive holding before completed play if enforcement negates play depending event
- illegal formation

## Live-Ball Penalty

Play may count, and penalty yards apply after.

Credit both:

- play stats
- penalty stats

depending enforcement.

Example:
- defensive pass interference may create penalty first down but not passing yards.

## Declined Penalty

Credit play stats.
No penalty yards unless manual says track declined count internally.

## Offsetting Penalties

Usually no play or replay down depending rule.
Credit offsetting count internally.
Do not credit play stats if nullified.

## Penalty First Downs

If penalty creates first down:

Team:
- +1 first_down_penalty

Do not credit rushing/passing first down.

## Penalty Yards

Penalty yards are not offensive yards.

---

# First Downs

First down types:

```text
rushing
passing
penalty
```

A play can create only one credited first down event for normal purposes.

Credit:

Team:
- +1 first_down_total
- +1 first_down_rushing/pass/penalty

Player:
- rushing_first_down or receiving_first_down or passing_first_down support stat, optional/internal

---

# Touchdowns and Points

## Offensive Rushing TD

Rusher:
- rushing TD

Team:
- offensive TD
- rushing TD
- points +6

## Offensive Passing TD

Passer:
- passing TD

Receiver:
- receiving TD

Team:
- offensive TD
- passing TD
- receiving TD support
- points +6

## Defensive TD

Defense:
- defensive TD
- points +6
- return yards by type

Offense:
- turnover if applicable

No offensive yards.

## Special Teams TD

Returner:
- return TD
- return yards

Team:
- special teams TD
- points +6

No offensive yards.

## Safety

Credit:
- scoring team +2
- opponent may receive team negative field event
- defensive player credit depends on play details

---

# Field Goals

## Made Field Goal

Kicker:
- +1 field_goal_attempt
- +1 field_goal_made
- update long if applicable

Team:
- +1 field_goal_attempt
- +1 field_goal_made
- +3 points

## Missed Field Goal

Kicker:
- +1 field_goal_attempt

Team:
- +1 field_goal_attempt

If returnable missed FG:
- represent as return play in same or linked PlayEvent.

## Blocked Field Goal

Kicker:
- attempt

Defense:
- blocked kick credit

If returned:
- return yards and TD if applicable

---

# Extra Points and Two-Point Attempts

## Extra Point Made

Kicker:
- XP attempt
- XP made

Team:
- XP attempt
- XP made
- +1 point

## Extra Point Missed

Kicker:
- XP attempt

Team:
- XP attempt

## Two-Point Conversion

If successful:
- team +2
- player stats according to rush/pass event if rules require
- two_point_conversion stat

Use manual-confirmed stat handling.

---

# Punts

## Punt

Punter:
- +1 punt
- +punt_yards

Team:
- +1 punt
- +punt_yards

If fair catch/no return:
- no return yards

If return:
- returner punt return + return yards

If downed/inside 20:
- punter/team inside_20 if applicable

If blocked:
- blocked punt event
- defense blocked kick
- return/fumble logic if possession changes

Punt yards and punt return yards are not offensive yards.

---

# Kickoffs

Kicker/team:
- kickoff
- touchback if applicable

Returner:
- kickoff return
- kickoff return yards
- kickoff return TD if scored

Kickoff return yards are not offensive yards.

---

# Tackles

Tackle credit should be included when participants exist.

## Solo Tackle

Primary tackler:
- +1 solo tackle
- +1 total tackle

## Assisted Tackle

Each assisted tackler:
- +1 assisted tackle
- +0.5 or +1 total tackle depending chosen display convention

Implementation decision:
Use separate solo/assisted counts and derive total according to selected display convention.

## Sack Tackle

Sacker:
- sack
- sack yards
- tackle/TFL handling according to manual implementation.

## Tackle For Loss

If rushing play or sack loses yards:
- defender credited TFL if participant exists and rules qualify

---

# Red Zone

A drive becomes a red-zone trip when offense reaches opponent 20 or closer.

Track:

- red_zone_trip
- red_zone_score
- red_zone_touchdown
- red_zone_field_goal
- red_zone_empty

Do not double-count multiple plays within one drive.

---

# Explosive Plays

Internal definition configurable.

Default:

```text
pass explosive: 20+ yards
rush explosive: 10+ or 15+ yards depending config
```

Store:

- explosive_play
- explosive_pass
- explosive_rush
- explosive_allowed

---

# Garbage Time

Garbage time should not remove official stats.

It should mark internal analytics:

```text
garbageTime = true
```

Official totals still count.

Analytics can exclude or split.

---

# Overtime

Overtime stats generally count in college football.

But Data Lab should allow separate overtime split.

Represent:

```text
period > 4
overtimeSequence
```

---

# Unsupported or Complex Cases

These should be explicit, not silently wrong.

- multiple laterals
- double fumbles
- penalties after change of possession
- blocked kick with multiple possession changes
- weird overtime special cases
- team safety
- statistical corrections after game

If unsupported early, create:

```text
unsupportedComplexPlay = true
```

and ensure test fixtures cover the later implementation.

---

# Stat Credit Acceptance Criteria

The stat credit rules are acceptable when:

- completed pass credits passer/receiver/team correctly
- incomplete pass credits attempt only
- interception credits passer/defense/return correctly
- rush credits rusher/team correctly
- sack uses college-style stat treatment
- fumble after rush/reception is credited correctly
- penalties can nullify or preserve play stats
- first downs are categorized correctly
- points match scoring plays
- special teams stats stay separate from offense
- box score reconciles after every game


<!-- FILE: 05_ACCUMULATOR_RECONCILIATION_AND_STORAGE.md -->

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


<!-- FILE: 06_CALIBRATION_TARGETS_AND_DATA_PIPELINE.md -->

# Calibration Targets and Data Pipeline

## Purpose

The stats engine must not just be internally consistent.

It must produce outputs that look like real college football.

The right approach is:

```text
Use real data to build target distributions.
Use Data Lab to compare simulated outputs to those distributions.
Tune play generator parameters until outputs are plausible.
```

## Primary Data Sources

## CollegeFootballData / cfbfastR

Use for:

- play-by-play data
- play types
- player play stats
- team stats
- box scores
- drive data
- EPA/WPA-style optional analytics

Why:

- structured
- filterable by year/week/team/offense/defense/play type
- usable for calibration scripts

## NCAA Football Statisticians' Manual

Use for:

- official-style stat credit rules
- edge cases
- penalties
- sacks
- fumbles
- special teams
- team stats

## NCAA / ESPN Public Stat Pages

Use for broad sanity checks:

- top offense
- median-ish offense
- bottom offense
- scoring offense
- rushing/passing extremes
- defense
- special teams

Do not rely only on public leader pages for deep calibration.

## Data Pipeline

```text
data_raw/
  cfbd/
    plays/
    games/
    teams/
    boxscores/
  manual_reference/
  public_stats/

data_processed/
  play_type_distributions/
  down_distance_outcomes/
  team_stat_bands/
  player_stat_bands/
  scheme_archetypes/
  calibration_targets/

game_data/
  stat_calibration_current_era.json
  stat_calibration_scheme_archetypes.json
```

## Scripts

```text
scripts/stats/
  01_pull_cfbd_plays.py
  02_normalize_play_types.py
  03_build_down_distance_distributions.py
  04_build_team_stat_bands.py
  05_build_player_stat_bands.py
  06_build_scheme_archetype_targets.py
  07_compare_sim_to_targets.py
  08_export_stats_validation_report.py
```

## Required Calibration Dimensions

## By Team Quality

```text
elite
top_10
top_25
above_average
average
below_average
bottom_25
```

## By Scheme

```text
air_raid
spread_rpo
power_spread
option
triple_option
pro_style
tempo_spread
defensive_grind
```

## By Tempo

```text
slow
balanced
fast
extreme
```

## By Game State

```text
neutral
garbage_time
trailing_big
leading_big
two_minute
red_zone
third_down
fourth_down
overtime
```

## By Level

```text
P4_vs_P4
P4_vs_G5
G5_vs_G5
FCS_or_low_level_if_included
```

## Team Calibration Targets

Targets should be distribution bands, not single numbers.

Example structure:

```json
{
  "current_era_fbs": {
    "team_game": {
      "points": {
        "average_band": [20, 35],
        "top_offense_season_ppg": [38, 48],
        "bottom_offense_season_ppg": [10, 22]
      },
      "total_yards": {
        "average_game_band": [320, 460],
        "top_offense_season_ypg": [460, 530],
        "bottom_offense_season_ypg": [230, 340]
      }
    }
  }
}
```

Do not hardcode these permanently.

Generate them from data when possible.

## Public Sanity Examples

Recent public leader pages are useful sanity checks.

Example top-end current-era outputs:

```text
Top total offenses can exceed 500 yards/game.
Top scoring offenses can sit around the low-to-mid 40s points/game.
Top passing offenses can exceed 300 passing yards/game.
Top rushing offenses can exceed 280 rushing yards/game.
```

These are top-end bands, not normal-team averages.

## Player Calibration Targets

## QB

Track season distribution:

```text
passing yards
passing TDs
interceptions
completion percentage
yards/attempt
sacks taken
rushing contribution
```

Bands:

```text
elite passer
top 10 passer
average starter
low-volume starter
backup/noise
```

## RB

Track:

```text
rush attempts
rushing yards
yards/carry
rushing TDs
receiving usage
fumbles
```

## WR/TE

Track:

```text
targets
receptions
receiving yards
receiving TDs
yards/reception
YAC internal
drops internal
```

## Defense

Track:

```text
tackles
sacks
TFL
interceptions
passes defended
forced fumbles
```

## Special Teams

Track:

```text
FG attempts
FG percentage
punt average
return yards
touchbacks
```

## Play-Level Calibration

The play generator should eventually match:

- run/pass rate by down/distance
- yards gained distribution
- sack rate
- interception rate
- fumble rate
- penalty rate
- explosive play rate
- third-down conversion rate
- red-zone TD rate
- punt frequency
- field goal attempt frequency

## Situation-Based Examples

### 3rd and Long

Should have:

- higher pass rate
- lower conversion rate
- higher sack/pressure risk
- higher incompletion rate

### Goal Line

Should have:

- higher run rate
- shorter yardage outcomes
- higher TD probability
- lower explosive probability

### Blowout Late

Should have:

- more backups
- more rushing by leading team
- less aggressive passing
- garbage-time stat flag

## Scheme Calibration

## Air Raid

Expected tendencies:

- high pass attempts
- high passing yards
- lower rushing share
- more WR targets
- more QB volume

## Option / Triple Option

Expected tendencies:

- high rushing attempts
- lower passing attempts
- high rushing yards
- unique QB/RB rushing split
- lower play-by-play passing volume

## Tempo Spread

Expected tendencies:

- more plays
- more possessions
- more fatigue
- higher variance
- more total yards possible
- defense may allow more plays

## Power Run

Expected tendencies:

- more rushing
- slower tempo
- fewer total plays
- lower variance
- strong time of possession

## Data Lab Validation Report

After each sim batch, generate:

```text
Stats Validation Report
```

Sections:

- scoring distribution
- total yard distribution
- pass/rush split
- player leaderboards
- scheme output comparison
- tempo output comparison
- red-zone rates
- third-down rates
- sack/interception/fumble rates
- penalty rates
- explosive rates
- anomalies
- suggested tuning

## Anomaly Examples

```json
{
  "severity": "high",
  "system": "stats",
  "message": "Sim produced 37 QBs with 5,000+ passing yards in one season.",
  "likelyCause": "Pass volume too high or season stat accumulation double-counting.",
  "suggestedTest": "season_passing_yards_distribution"
}
```

```json
{
  "severity": "critical",
  "system": "stats",
  "message": "Team total yards do not equal passing + rushing yards.",
  "likelyCause": "Return yards or penalty yards leaking into total offense.",
  "suggestedTest": "box_score_total_yards_reconciliation"
}
```

## Acceptance Criteria

Calibration is acceptable when:

- simulated team averages sit within real-data bands
- top offenses look elite but not impossible
- bad offenses remain bad
- schemes create different stat shapes
- tempo changes volume without becoming always superior
- player leaderboards look plausible
- stat totals reconcile
- no long-run inflation occurs


<!-- FILE: 07_TESTING_AND_INVARIANTS.md -->

# Stats Testing and Invariants

## Purpose

The stats engine needs more tests than most systems.

Every stat-credit rule should be testable with a tiny PlayEvent fixture.

## Test Categories

```text
unit tests
edge case tests
integration tests
reconciliation tests
season aggregation tests
long-run validation tests
```

## Unit Test Fixture Pattern

Each test should define:

```text
given PlayEvent
when applyPlay
then expected StatDeltas
then expected box score changes
```

Example:

```ts
test("completed pass credits passer receiver and team", () => {
  const play = makeCompletedPass({ yards: 11 });
  const deltas = creditPlay(play);
  expectDelta(deltas, passerId, "pass_attempts", 1);
  expectDelta(deltas, passerId, "pass_completions", 1);
  expectDelta(deltas, passerId, "passing_yards", 11);
  expectDelta(deltas, receiverId, "receptions", 1);
  expectDelta(deltas, receiverId, "receiving_yards", 11);
  expectDelta(deltas, offenseId, "team_passing_yards", 11);
  expectDelta(deltas, offenseId, "total_yards", 11);
});
```

## Required Unit Tests

## Passing

- completed pass
- completed pass TD
- incomplete pass
- interception
- pick-six
- spike
- pass nullified by penalty
- completed pass with post-play penalty
- completed pass then fumble
- sack on called pass

## Rushing

- normal rush
- rushing TD
- negative rush
- tackle for loss
- sack as college rushing loss
- QB scramble
- kneel down
- rush then fumble
- rush nullified by penalty

## Receiving

- reception
- receiving TD
- YAC internal
- drop internal
- target internal
- reception then fumble

## Defense

- solo tackle
- assisted tackle
- sack
- TFL
- interception
- pass defended
- forced fumble
- fumble recovery
- defensive TD

## Penalties

- false start no play
- defensive pass interference
- holding that nullifies play
- declined penalty
- offsetting penalties
- dead-ball penalty after play
- automatic first down
- loss of down

## Special Teams

- made field goal
- missed field goal
- blocked field goal
- extra point made
- extra point missed
- two-point conversion
- punt
- punt return
- blocked punt
- kickoff
- kickoff return TD
- touchback

## Game / Drive

- red-zone trip counted once
- drive result touchdown
- drive result field goal
- turnover drive
- end-half drive
- time of possession
- third-down conversion
- fourth-down conversion

## Reconciliation Invariants

These should run after every game.

```text
score equals scoring plays
total offense equals passing + rushing
team pass attempts equals player pass attempts
team completions equals player completions
team passing yards equals player passing yards
team rushing yards equals player rushing yards + team rushing yards
team passing TD equals player passing TD
team rushing TD equals player rushing TD
team turnovers equals INT thrown + fumbles lost
first downs total equals rushing + passing + penalty
special teams yards do not count as total offense
penalty yards do not count as total offense
return yards do not count as total offense
season totals equal sum of game totals
career totals equal sum of season totals
```

## Impossible States

Flag as errors:

- negative pass attempts
- completions > attempts
- receiving yards not equal passing yards, except explicit special cases
- points without scoring play
- scoring play without points
- player credited for stat but not on either team
- possession team and defense team same
- down outside 1-4
- yardsToGoal outside valid range
- penalty yards credited as total offense
- return yards credited as passing/rushing yards
- same play has both made FG and offensive TD
- turnover without possession change, unless fumble recovered by offense
- two teams both credited with same points
- duplicate play IDs

## Scenario Tests

Create full mini-games or drives.

### Scenario: Normal TD Drive

- rush 4
- completed pass 11
- incomplete
- rush 8
- passing TD 22

Expected:
- score 7 after XP
- drive yards 45
- pass/rush stats reconcile

### Scenario: Sack and Punt

- sack -8
- incomplete
- short completion
- punt

Expected:
- sack charged correctly
- negative rushing yards
- no pass attempt on sack
- punt stats separate

### Scenario: Penalty Nullifies TD

- completed pass TD
- offensive holding no-play/nullified

Expected:
- no passing/receiving TD
- no score
- penalty yards
- replay/enforced down state

### Scenario: Interception Return TD

Expected:
- QB attempt and INT
- defender INT and return TD
- defense points
- no offensive yards

### Scenario: Kickoff Return TD

Expected:
- special teams TD
- return yards
- no offensive yards

## Long-Run Tests

After 1 season:

- no reconciliation errors
- top stat lines plausible
- no duplicated games
- season totals equal game sums

After 5 seasons:

- leaderboards plausible
- records update
- no stat inflation
- scheme shapes visible

After 20 seasons:

- draft/awards input plausible
- school identities emerge
- no statistical collapse

## Test Acceptance

Stats engine packet cannot pass without:

- unit tests for all implemented play types
- reconciliation tests
- save/load tests for game stats
- season aggregation tests
- at least one scenario test


<!-- FILE: 08_AI_BUILD_PACKETS_STATS_ENGINE.md -->

# AI Build Packets — Stats Engine

## Purpose

These packets tell the coding AI exactly how to build the stats engine without creating fake box scores.

Use these in order.

---

# STAT-1 — Stat Taxonomy Registry

## Size

Medium

## Goal

Define all stat IDs and metadata.

## Deliverables

- `src/domain/stats/statDefinitions.ts`
- `src/domain/stats/statTypes.ts`
- `tests/unit/statDefinitions.test.ts`

## Requirements

Each stat has:

- id
- display name
- owner type
- category
- official/internal/derived classification
- aggregation type
- display format
- source event types
- description

## Acceptance

- registry validates unique IDs
- derived stats are marked derived
- official-style vs internal stats are distinct
- no UI code

---

# STAT-2 — PlayEvent and GameBook Schema

## Size

Large

## Goal

Create the structured event model.

## Deliverables

- `src/domain/stats/playEvent.ts`
- `src/domain/stats/gameBook.ts`
- `src/domain/stats/drive.ts`
- validation helpers
- tests

## Requirements

PlayEvent includes:

- game id
- drive id
- period
- clock
- down/distance
- yards to goal
- possession/defense teams
- play type
- charged play type
- result
- yards
- participants
- scoring
- turnover
- penalty
- stat eligibility
- reason codes

## Acceptance

- invalid down rejected
- invalid team relationship rejected
- play event serializes/deserializes
- tests cover basic validation

---

# STAT-3 — StatDelta and Basic Accumulator

## Size

Large

## Goal

Convert simple PlayEvents into stat deltas and box score counts.

## Implement First

- completed pass
- incomplete pass
- interception
- rush
- rushing TD
- passing TD
- sack
- kneel down

## Deliverables

- `src/sim/stats/statDelta.ts`
- `src/sim/stats/statAccumulator.ts`
- `src/sim/stats/creditRules/passCredit.ts`
- `src/sim/stats/creditRules/rushCredit.ts`
- tests

## Acceptance

- completed pass credits passer/receiver/team
- sack is college-style rushing loss
- no text parsing
- same PlayEvent always same deltas

---

# STAT-4 — Turnovers, Fumbles, and Defense

## Size

Large

## Goal

Add defensive and turnover credit.

## Implement

- interception return
- pick-six
- fumble on rush
- fumble after catch
- forced fumble
- fumble recovery
- fumble return TD
- tackles
- sacks/TFL

## Acceptance

- turnovers reconcile
- defensive TD does not count as offensive yards
- fumble recovery return yards separate
- tests cover edge cases

---

# STAT-5 — Penalties

## Size

Large

## Goal

Implement penalty stat credit and nullification.

## Implement

- no-play penalty
- live-ball penalty
- dead-ball penalty
- declined penalty
- offsetting penalty
- automatic first down
- loss of down

## Acceptance

- penalty yards do not become offense
- nullified plays do not credit normal stats
- live-ball plays can count plus penalty
- first down by penalty credited correctly

---

# STAT-6 — Special Teams

## Size

Large

## Goal

Add kicks, punts, and returns.

## Implement

- field goal made/missed
- blocked field goal
- extra point
- two-point attempt
- punt
- punt return
- blocked punt
- kickoff
- kickoff return
- touchback

## Acceptance

- special teams yards separate from offense
- scoring reconciles
- tests cover returns and blocked kicks

---

# STAT-7 — Reconciler

## Size

Large

## Goal

Validate every game box score.

## Deliverables

- `src/sim/stats/reconciler.ts`
- invariant checks
- tests

## Required Checks

- score equals scoring plays
- total yards equals pass + rush
- team/player passing totals match
- team/player rushing totals match
- first downs reconcile
- turnovers reconcile
- no return/penalty yards in total offense

## Acceptance

- bad box score fails
- good box score passes
- errors include useful messages

---

# STAT-8 — Season and Career Stat Store

## Size

Medium

## Goal

Aggregate finalized game stats.

## Deliverables

- `src/domain/stats/seasonStats.ts`
- `src/domain/stats/careerStats.ts`
- aggregation functions
- save/load tests

## Acceptance

- season totals equal game sums
- career totals equal season sums
- transfers can be tracked by school

---

# STAT-9 — Records and Leaderboards

## Size

Medium

## Goal

Create stat leaderboards and records.

## Deliverables

- national leaders
- conference leaders
- school leaders
- game/season/career records

## Acceptance

- leaders update after finalized games
- records persist
- ties handled

---

# STAT-10 — Calibration Data Pipeline

## Size

Large

## Goal

Build scripts for real-data calibration.

## Deliverables

- scripts to ingest CFBD/cfbfastR play data
- normalize play types
- build target distributions
- export calibration JSON

## Acceptance

- can produce target JSON
- target JSON has bands, not single values
- supports scheme/tempo/situation segmentation when data exists

---

# STAT-11 — Data Lab Stats Validation

## Size

Large

## Goal

Compare simulated outputs against target distributions.

## Deliverables

- stats validation report
- anomaly detection
- charts/tables if UI exists
- JSON export

## Acceptance

- flags unrealistic stats
- flags reconciliation failures
- flags player leaderboard anomalies

---

# STAT-12 — Play Generator Integration

## Size

Large

## Goal

Wire current game sim to structured PlayEvents.

## Requirements

- no fake box score generation after result
- plays generate stats
- box score comes from accumulated plays
- current drive/result engine can be adapted but cannot bypass stats

## Acceptance

- simulated game creates PlayEvents
- PlayEvents create box score
- text renderer uses PlayEvents
- no box score invention

---

# STAT-13 — Text Play-by-Play Template Renderer

## Size

Medium

## Goal

Render plain, non-color play text from structured plays.

## Important

No colorful commentary yet.

## Deliverables

- template renderer
- play summary lines
- deterministic fallback text

## Acceptance

- text matches structured facts
- no stats created by text
- can be replaced by LLM later

---

# STAT-14 — Save/Load and Replay Audit

## Size

Medium

## Goal

Ensure stats can be audited and replayed.

## Deliverables

- persist PlayEvents
- persist StatDeltas
- persist finalized box score
- replay test

## Acceptance

- replayed game regenerates same box score
- save/load preserves stats


<!-- FILE: 09_READY_TO_PASTE_STATS_PROMPTS.md -->

# Ready-To-Paste AI Prompts — Stats Engine

## STAT-1 Prompt

```text
Implement STAT-1 — Stat Taxonomy Registry for the CFB-FM project.

Goal:
Define the stat registry used by the stats engine.

Context:
The game is a Tauri + React + TypeScript + SQLite college football management sim. Structured PlayEvents are the truth. Text play-by-play is presentation only.

Deliver:
- src/domain/stats/statDefinitions.ts
- src/domain/stats/statTypes.ts
- tests/unit/statDefinitions.test.ts

Every stat definition must include:
- id
- displayName
- owner type
- category
- classification: official_style | internal | derived
- source event types
- aggregation type
- display format
- description

Include team, player, defense, special teams, advanced/internal, and derived stat definitions.

Hard rules:
- no UI code
- no mock gameplay data
- unique stat IDs
- official-style stats separated from internal stats
- derived stats do not become raw truth

Acceptance:
- test validates unique IDs
- test validates required fields
- test validates no duplicate display-critical IDs
- PROJECT_STATUS.md updated
- NEXT_PACKET.md points to STAT-2
```

## STAT-2 Prompt

```text
Implement STAT-2 — PlayEvent and GameBook Schema.

Goal:
Create the structured play event model that will feed the stats engine.

Deliver:
- src/domain/stats/playEvent.ts
- src/domain/stats/gameBook.ts
- src/domain/stats/drive.ts
- validation helpers
- tests/unit/playEvent.test.ts
- tests/unit/gameBook.test.ts

PlayEvent must include:
- gameId
- driveId
- playNumber
- period
- clockBefore/clockAfter
- possessionTeamId
- defenseTeamId
- down/distance
- yardsToGoal
- playType
- chargedPlayType
- yardsGained
- firstDown
- scoring result
- turnover result
- penalty result
- participants
- statEligibility
- reasonCodes

Hard rules:
- no text parsing
- invalid down rejected
- possession and defense cannot be same
- invalid yardsToGoal rejected
- serializable
- deterministic-friendly

Acceptance:
- tests pass
- invalid events fail
- valid sample events serialize/deserialize
- PROJECT_STATUS.md updated
```

## STAT-3 Prompt

```text
Implement STAT-3 — StatDelta and Basic Accumulator.

Goal:
Convert basic PlayEvents into StatDeltas and Team/Player GameStats.

Implement:
- completed pass
- incomplete pass
- interception
- rush
- rushing touchdown
- passing touchdown
- sack as college-style rushing loss
- kneel down as rush with internal kneel flag

Deliver:
- src/sim/stats/statDelta.ts
- src/sim/stats/statAccumulator.ts
- src/sim/stats/creditRules/passCredit.ts
- src/sim/stats/creditRules/rushCredit.ts
- tests/unit/statAccumulator.basic.test.ts

Hard rules:
- no Math.random
- no text parsing
- no UI code
- sack should not count as pass attempt
- sack should create negative rushing yards under college-style rules
- completed pass credits passer, receiver, team passing, team total yards

Acceptance:
- completed pass test passes
- incomplete pass test passes
- rushing test passes
- sack test passes
- passing TD test passes
- rushing TD test passes
```

## STAT-5 Prompt

```text
Implement STAT-5 — Penalty Credit and Nullification.

Goal:
Make penalties explicit and prevent penalty yards or nullified play yards from corrupting offensive stats.

Implement:
- no-play penalty
- live-ball penalty
- dead-ball penalty
- declined penalty
- offsetting penalty
- automatic first down
- loss of down

Deliver:
- src/sim/stats/creditRules/penaltyCredit.ts
- tests/unit/penaltyCredit.test.ts

Hard rules:
- penalty yards are never total offense
- nullified play stats do not count
- live-ball penalty may preserve play stats
- declined penalties preserve play stats but do not add accepted penalty yards
- first down by penalty must be separate from rushing/passing first down

Acceptance:
- false start test
- defensive pass interference test
- holding nullifies TD test
- declined penalty test
- offsetting penalties test
```

## STAT-7 Prompt

```text
Implement STAT-7 — Box Score Reconciler.

Goal:
Validate that every finalized game has internally consistent stats.

Deliver:
- src/sim/stats/reconciler.ts
- tests/unit/reconciler.test.ts

Required checks:
- score equals scoring plays
- total yards equals passing + rushing
- team passing attempts equal player passing attempts
- team completions equal player completions
- team passing yards equal player passing yards
- team rushing yards equals player rushing yards plus explicit team rushing
- first downs total equals rushing + passing + penalty
- turnovers equal interceptions thrown + fumbles lost
- return yards not counted as total offense
- penalty yards not counted as total offense
- special teams yards not counted as total offense

Acceptance:
- valid game passes
- invalid total yards fails
- invalid score fails
- invalid first downs fails
- error messages identify likely cause
```

## STAT-12 Prompt

```text
Implement STAT-12 — Play Generator Integration.

Goal:
Wire the existing game simulator so box scores are produced from structured PlayEvents, not invented after the score.

Rules:
- Keep current sim if needed, but it must output structured PlayEvents.
- StatAccumulator must create the box score.
- Play-by-play text must read PlayEvent data.
- No text parsing.
- No fake stat totals.

Deliver:
- integration between game sim and PlayEvent model
- box score generated from StatAccumulator
- tests/integration/gameStatsIntegration.test.ts

Acceptance:
- simulated game produces PlayEvents
- PlayEvents produce box score
- box score reconciles
- scoring plays equal final score
- save/load preserves game stats
```


<!-- FILE: 10_TYPESCRIPT_CONTRACTS_REFERENCE.md -->

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
