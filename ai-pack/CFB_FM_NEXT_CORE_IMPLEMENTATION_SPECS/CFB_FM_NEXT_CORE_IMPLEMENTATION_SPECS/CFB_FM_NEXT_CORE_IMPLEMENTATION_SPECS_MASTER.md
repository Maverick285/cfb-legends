

<!-- FILE: 00_START_HERE_NEXT_CORE_IMPLEMENTATION_SPECS.md -->

# CFB-FM Next Core Implementation Specs — Start Here

## Purpose

This pack scopes the next systems that must be built **after the Stats Engine**.

The Stats Engine answers:

```text
Given a structured play result, who earns what stats?
```

This pack answers the next questions:

```text
How does the game decide what structured play result happens?
How do attributes translate to outcomes?
How do recruits choose schools?
How do players develop?
How do AI schools manage programs?
How do NIL, boosters, and the portal change behavior?
How do draft results validate player development?
How does real data calibrate everything?
How does the Program Desk organize daily decisions?
How do trait labels and scouting language become reliable?
How do records, awards, and media narratives turn stats into history?
```

## Documents Included

- `28_PLAY_GENERATOR_AND_GAME_SIM_ENGINE_SPEC.md`
- `29_ATTRIBUTE_TO_OUTCOME_AND_PLAYER_MATCHUP_SPEC.md`
- `30_RECRUITING_ENGINE_IMPLEMENTATION_SPEC.md`
- `31_PLAYER_DEVELOPMENT_PRACTICE_AND_TEAM_VIBE_ENGINE_SPEC.md`
- `32_AI_SCHOOL_PROGRAM_MANAGER_SPEC.md`
- `33_NIL_BOOSTER_AND_ROSTER_ECONOMICS_IMPLEMENTATION_SPEC.md`
- `34_TRANSFER_PORTAL_AND_RETENTION_ENGINE_SPEC.md`
- `35_DRAFT_AND_NFL_PIPELINE_CALIBRATION_SPEC.md`
- `36_REAL_DATA_INGESTION_AND_CALIBRATION_PIPELINE_SPEC.md`
- `37_PROGRAM_DESK_AND_CONTINUE_GATE_IMPLEMENTATION_SPEC.md`
- `38_ATTRIBUTE_TRAIT_CLUSTER_AND_SCOUTING_LANGUAGE_SPEC.md`
- `39_AWARDS_RECORDS_HISTORY_AND_MEDIA_NARRATIVE_SPEC.md`
- `40_NEXT_CORE_BUILD_PACKETS_AND_PROMPTS.md`
- `CFB_FM_NEXT_CORE_IMPLEMENTATION_SPECS_MASTER.md`

## Build Order

Use this order if the codebase is ready for implementation:

```text
1. 28 Play Generator
2. 29 Attribute-to-Outcome Model
3. 31 Development / Practice / Team Vibe
4. 30 Recruiting Engine
5. 32 AI School Program Manager
6. 33 NIL / Booster / Roster Economics
7. 34 Transfer Portal / Retention
8. 35 Draft / NFL Pipeline
9. 36 Real Data Calibration Pipeline
10. 37 Program Desk / Continue Gate
11. 38 Trait Clusters / Scouting Language
12. 39 Awards / Records / History / Media
```

## Design Priority

The core risk is not missing features.

The core risk is building beautiful screens around fake or shallow numbers.

These specs are designed to force the AI to build:

- structured inputs
- deterministic logic
- formulas with reason codes
- tests
- validation
- save/load support
- Data Lab outputs
- cross-system consequences

## Non-Negotiable Rule

Every system must eventually pass the depth gate:

```text
data model
simulation logic
persistence
UI/workflow hook
events/inbox hooks
tests
debug/export tooling
long-run validation
```

## Immediate Next Packet

If the Stats Engine pack has been accepted, the next coding target is:

```text
PLAYGEN-1 — Game State, Clock, Field, Drive, and Situation Model
```

That starts the Play Generator and Game Simulation Engine.


<!-- FILE: 28_PLAY_GENERATOR_AND_GAME_SIM_ENGINE_SPEC.md -->

# 28 — Play Generator and Game Simulation Engine Spec

## North Star

The Play Generator decides **what happens on the field**.

The Stats Engine credits what happened.

The Play Generator must produce structured `PlayEvent` objects that the Stats Engine can process. It should not invent box scores after the final score. Every box score must emerge from plays, drives, and stat deltas.

The first version does not need colorful play prose. It needs believable, structured football outcomes.

## Core Flow

```text
Game State
→ situation classifier
→ offensive play selection
→ defensive response selection
→ personnel/matchup context
→ outcome resolver
→ structured PlayEvent
→ Stat Engine
→ updated game state
→ repeat until game over
```

## Scope

This system covers:

- game clock
- field position
- drives
- down and distance
- scoring state
- play-call selection
- offensive concepts
- defensive responses
- run/pass/special teams decisions
- outcome distributions
- turnovers
- penalties
- injuries hook
- fatigue hook
- weather hook
- tempo hook
- garbage-time behavior
- overtime shell
- structured play events
- game-level simulation loop

It does **not** own:

- stat crediting
- award logic
- draft logic
- long-term player development
- recruiting
- NIL

Those systems consume its outputs.

## Simulation Levels

### Level 1 — Structured Drive Engine

Minimum playable standard.

The engine generates drives as sequences of structured plays, but play outcomes may use coarse distributions.

Outputs:

- PlayEvents
- Drives
- Box score through Stats Engine
- Scoring summary
- Plain text play list

### Level 2 — Situation-Aware Play Engine

Adds down/distance, field position, score, clock, and team tendencies.

Outputs become more realistic by situation.

### Level 3 — Matchup-Aware Play Engine

Uses player-level attributes and role matchups.

Examples:

- QB vs coverage
- OL vs pass rush
- RB + OL vs box/front
- WR vs CB
- Kicker vs distance/weather

### Level 4 — Tactical Playbook Engine

Uses actual concepts, installation quality, practice time, staff philosophy, tempo, and defensive responses.

### Level 5 — Full Play Designer Integration

Custom plays and concepts feed into the resolver.

This can wait.

## Game State Model

```ts
type GameState = {
  gameId: string;
  period: number;
  clock: GameClock;
  possessionTeamId: string;
  defenseTeamId: string;
  homeTeamId: string;
  awayTeamId: string;
  score: Record<TeamId, number>;
  down: 1 | 2 | 3 | 4;
  distance: number;
  yardsToGoal: number;
  driveId: string;
  playNumber: number;
  drivePlayNumber: number;
  timeouts: Record<TeamId, number>;
  gameContext: GameContext;
  teamRuntimeState: Record<TeamId, TeamRuntimeState>;
};
```

## Game Context

```ts
type GameContext = {
  season: number;
  week: string;
  neutralSite: boolean;
  rivalry: boolean;
  postseason: boolean;
  weather: WeatherContext;
  stadium: StadiumContext;
  rulesetId: string;
  overtimeRules?: OvertimeRules;
};
```

## Team Runtime State

```ts
type TeamRuntimeState = {
  fatigue: number;
  teamVibe: number;
  morale: number;
  injuriesInGame: string[];
  tempoMode: TempoMode;
  gamePlan: GamePlan;
  garbageTimeMode: boolean;
  currentPersonnelPackage?: string;
};
```

## Clock Model

The clock model must support:

- normal play runoff
- incomplete pass stoppage
- out of bounds
- first down rules by ruleset if configured
- timeout
- penalty clock effects
- kneel-down
- spike
- end of period
- halftime
- overtime

Early implementation can approximate, but it must be structured and testable.

### Clock Consumption Inputs

```text
play type
tempo mode
result
down/distance
score margin
period
time remaining
offense strategy
defense strategy
clock stoppage event
```

### Clock Consumption Defaults

These belong in config:

```json
{
  "clock": {
    "rushSeconds": [28, 42],
    "completePassInBoundsSeconds": [18, 38],
    "completePassOutOfBoundsSeconds": [6, 18],
    "incompletePassSeconds": [4, 8],
    "sackSeconds": [20, 40],
    "puntSeconds": [8, 14],
    "fieldGoalSeconds": [4, 8]
  }
}
```

## Field Position Model

Use `yardsToGoal`.

```text
99 = own 1
50 = midfield
1 = opponent 1
0 = touchdown
```

All play outcomes update `yardsToGoal`.

A gain reduces yardsToGoal.

Example:

```text
yardsToGoal 63, gain 11 → yardsToGoal 52
```

## Drive Start Logic

Drive starts after:

- kickoff
- punt
- turnover
- turnover on downs
- made field goal
- touchdown + kickoff
- safety + free kick
- period transition if possession continues by rule
- overtime possession

Drive object records:

- start field position
- start clock
- starting team
- play IDs
- result
- points
- yards
- red-zone trip

## Situation Classifier

The play generator must classify every snap.

```ts
type Situation = {
  downDistanceBucket:
    | "standard"
    | "short_yardage"
    | "third_short"
    | "third_medium"
    | "third_long"
    | "fourth_short"
    | "fourth_long";
  fieldZone:
    | "backed_up"
    | "own_side"
    | "midfield"
    | "plus_territory"
    | "red_zone"
    | "goal_line";
  clockState:
    | "normal"
    | "two_minute"
    | "end_half"
    | "four_minute"
    | "desperation";
  scoreState:
    | "leading_big"
    | "leading_small"
    | "tied"
    | "trailing_small"
    | "trailing_big";
  gamePhase:
    | "early"
    | "middle"
    | "late"
    | "overtime";
};
```

This drives play selection and clock behavior.

## Offensive Play Selection

The offensive play selector chooses a `PlayCallContext`.

```ts
type PlayCallContext = {
  playFamily:
    | "inside_run"
    | "outside_run"
    | "option"
    | "qb_run"
    | "quick_pass"
    | "intermediate_pass"
    | "deep_pass"
    | "screen"
    | "play_action"
    | "trick_play"
    | "punt"
    | "field_goal"
    | "kneel"
    | "spike";
  conceptId?: string;
  personnelGroup?: string;
  formationFamily?: string;
  aggressiveness: number;
  tempoMode: TempoMode;
  targetRole?: string;
  reasonCodes: ReasonCode[];
};
```

Inputs:

- game plan
- offensive scheme
- coordinator personality
- down/distance
- field position
- clock
- score
- personnel health
- practice install quality
- opponent defense
- weather
- staff autonomy
- user settings if controlling game plan

## Defensive Response Selection

The defense selects a response.

```ts
type DefensiveResponse = {
  front: "light_box" | "balanced" | "loaded_box" | "goal_line" | "prevent";
  coverage: "man" | "zone" | "quarters" | "press" | "match" | "prevent";
  pressure: "none" | "simulated" | "standard" | "blitz" | "heavy_blitz";
  runFitAggression: number;
  explosivePrevention: number;
  reasonCodes: ReasonCode[];
};
```

Inputs:

- defensive scheme
- coordinator tendencies
- game plan
- situation
- opponent tendencies
- scouting
- player fatigue
- score/clock

## Outcome Resolver

The resolver turns play call + defensive response + matchup context into a PlayEvent.

It should produce:

- success/failure
- yards gained
- first down
- pressure
- sack
- completion/incompletion
- turnover
- fumble
- penalty
- score
- player participants
- reason codes

## Core Outcome Families

### Run Play Resolver

Inputs:

- OL run blocking
- RB vision
- RB burst
- RB power/elusiveness
- defensive front strength
- LB run fits
- box count
- scheme fit
- field zone
- fatigue
- weather
- play concept

Outputs:

- yards gained
- stuff
- first down
- explosive run
- TFL
- fumble
- tacklers
- scorer if TD

### Pass Play Resolver

Inputs:

- pass protection
- pass rush
- QB processing
- QB accuracy
- WR separation
- coverage quality
- route concept
- pressure
- weather/wind
- depth of target
- field zone
- fatigue
- morale/pressure

Outputs:

- complete/incomplete
- air yards
- YAC
- sack
- interception
- TD
- target/receiver
- defender
- pressure defender

### Special Teams Resolver

Inputs:

- kicker/punter attributes
- distance
- weather
- pressure
- special teams coaching
- returner skill
- coverage quality

Outputs:

- made/missed FG
- punt distance
- return yards
- touchback
- block
- special teams TD
- penalties

## Yards Gained Model

Do not use flat random ranges.

Use distribution buckets.

Example run output buckets:

```text
loss
stuffed
short gain
successful gain
chunk
explosive
breakaway
```

Example pass output buckets:

```text
sack
incomplete
short complete
successful complete
chunk
explosive
interception
```

Each bucket has a probability based on matchup scores and situation.

Then yards are sampled from that bucket.

## Success Rate Definition

Use internal success marker.

Default:

```text
1st down: gain >= 50% of needed yards
2nd down: gain >= 70% of needed yards
3rd/4th down: gain >= 100% of needed yards
```

This is internal analytics, not official stat.

## Turnover Model

Turnovers should be rare enough to feel real.

Separate:

- interception chance
- fumble chance
- fumble lost chance
- turnover on downs
- blocked kick turnover

Inputs:

- QB decision-making
- pressure
- pass depth
- coverage
- ball security
- weather
- fatigue
- aggressiveness
- defender ball skills
- game pressure

Do not make turnovers purely random.

## Penalty Model

Penalty chance inputs:

- discipline
- fatigue
- crowd noise
- rivalry pressure
- player composure
- staff discipline
- play type
- tempo
- mismatch stress

Penalty types:

- false start
- holding
- pass interference
- facemask/personal foul
- delay of game
- illegal formation
- offsides
- roughing
- unsportsmanlike, rare

Tone: realistic, not arcade chaos.

## Injury Hook

The play generator should not own injury management, but it should emit injury risk events.

Inputs:

- fatigue
- intensity
- player durability
- play type
- contact level
- weather
- prior injury
- position

Output:

```ts
injuryCandidate?: {
  playerId: string;
  severityRoll: number;
  context: string;
}
```

The injury system decides final injury.

## Fatigue Hook

Each play changes fatigue.

Inputs:

- tempo
- play type
- player participation
- drive length
- weather
- substitutions
- practice fatigue

Outputs:

- player fatigue delta
- team fatigue delta

Fatigue feeds future outcomes.

## Weather Effects

Weather affects:

- pass accuracy
- deep passing
- kicking
- ball security
- fatigue
- injury risk
- pace
- attendance/home-field indirectly

The effect should be subtle unless severe.

## Home Field Effects

Home field affects:

- false start chance
- communication errors
- pressure in big moments
- momentum/team vibe
- recruit visit atmosphere
- upset probability slightly

Do not make home field a magic score boost.

## Tempo Effects

Tempo changes:

- plays per game
- clock usage
- defensive fatigue
- offensive mistakes
- install demands
- injury/fatigue
- garbage-time stat volume

Faster is not always better.

## Garbage Time

Garbage time should change play selection and personnel usage.

Official stats still count.

Internal analytics mark:

```text
garbageTime = true
```

Inputs:

- score margin
- period
- time left
- team philosophy
- coach aggressiveness
- roster depth
- player development goals

## Overtime

Early shell:

- overtime possessions
- no normal clock
- special field position
- score termination rules
- stats count

Make ruleset-driven.

## Plain Text Renderer

The text renderer should produce simple sentences from PlayEvents.

Examples:

```text
1st & 10 — Completed pass for 11 yards.
3rd & 7 — Sack for a loss of 8.
2nd & 4 — Run up the middle for 5 and a first down.
```

No color commentary required now.

## Reason Codes

Every play should include reason codes.

Examples:

```text
run_success_ol_advantage
pass_incomplete_pressure
sack_edge_mismatch
deep_completion_coverage_bust
false_start_home_crowd
fumble_weather_fatigue
```

Reason codes are essential for debugging and Data Lab.

## Data Lab Outputs

The play generator must export:

- run/pass rate by down
- success rate
- yards/play
- sack rate
- pressure rate
- turnover rate
- penalty rate
- explosive rate
- plays per game
- drive results
- red-zone efficiency
- garbage-time split
- scheme split
- tempo split

## Tests

Required tests:

- clock advances correctly
- field position updates correctly
- first down resets down/distance
- failed third down creates fourth down
- failed fourth down creates turnover on downs
- TD updates score
- kickoff starts new drive
- sack creates structured PlayEvent with correct charged type
- penalty can nullify play
- same seed produces same game
- game creates only valid PlayEvents
- generated box score reconciles

## Acceptance Criteria

The Play Generator is acceptable when:

- it produces structured PlayEvents
- the Stats Engine creates the box score from those events
- same seed reproduces same game
- game state transitions are valid
- scores come from scoring plays
- run/pass/penalty/turnover outputs are plausible
- Data Lab can validate outputs
- plain text play-by-play matches structured facts
- no fake box score generation remains


<!-- FILE: 29_ATTRIBUTE_TO_OUTCOME_AND_PLAYER_MATCHUP_SPEC.md -->

# 29 — Attribute-to-Outcome and Player Matchup Spec

## North Star

Attributes are only valuable if they affect football outcomes in understandable ways.

This spec defines how player, staff, team, scheme, morale, fatigue, and environmental inputs translate into structured play outcomes.

The goal is not perfect physics. The goal is believable football logic that creates multiple viable paths to winning.

## Core Principle

```text
Attributes should shape probabilities, not guarantee outcomes.
```

A great QB can throw a bad pass.
A bad CB can make a play.
A dominant OL can still lose a rep.
But over time, the better traits should show up in the data.

## Required Output

The matchup system should produce:

- matchup scores
- probability modifiers
- reason codes
- player involvement weights
- outcome inputs for the Play Generator
- postgame explainability

## Attribute Groups

## Physical

- speed
- acceleration
- strength
- explosiveness
- stamina
- durability
- jumping
- flexibility
- frame

## Movement

- agility
- change of direction
- balance
- hip fluidity
- bend
- footwork
- lateral quickness

## Technical

Position-specific skills.

Examples:

- QB short accuracy
- QB deep accuracy
- RB vision
- WR route running
- OL pass block
- DL pass rush
- LB run fits
- CB man coverage
- K kick accuracy

## Football IQ

- processing
- awareness
- play recognition
- anticipation
- assignment discipline
- communication
- film study
- situational awareness

## Mental

- composure
- pressure handling
- consistency
- confidence
- competitiveness
- aggression
- discipline
- leadership
- resilience

## Hidden / Personality

- work ethic
- coachability
- money preference
- loyalty
- transfer openness
- big-game nerve
- practice effort
- academic discipline

Hidden traits affect long-term systems and some performance volatility.

## Rating Scale

User-facing ratings use 1–20.

Internal calculations may convert to 0–100.

Example conversion:

```text
internal = (rating - 1) / 19 * 100
```

Use nonlinear transformations where elite differences matter.

Example:

```text
eliteMultiplier = sigmoid((rating - 12) / 3)
```

## Matchup Score Pattern

Every matchup should use the same pattern:

```text
matchupScore =
  relevant_offense_traits
+ role_fit
+ scheme_fit
+ staff/gameplan_bonus
+ practice_readiness
+ morale/team_vibe
- fatigue
- injury_penalty
- weather_penalty
- opponent_relevant_traits
- pressure/context_penalty
+ random_variance
```

Outputs:

```text
advantage: -100 to +100
confidence: 0 to 1
reasonCodes
```

## Passing Outcome Model

### Step 1 — Pass Protection vs Pass Rush

Offense inputs:

- OL pass blocking
- RB/TE pass protection
- QB pocket presence
- play-action/screen protection modifier
- playbook install quality
- communication
- fatigue

Defense inputs:

- DL/edge pass rush
- blitz pressure
- disguise
- front/coverage synergy
- crowd noise
- defensive fatigue

Outputs:

- clean pocket probability
- pressure probability
- sack pressure probability
- time to throw bucket

Reason codes:

```text
pass_protection_advantage
edge_rush_mismatch
blitz_pickup_failure
qb_avoided_pressure
fatigue_created_pressure
```

### Step 2 — Separation vs Coverage

Receiver inputs:

- route running
- release
- speed
- agility
- hands
- play concept
- scheme fit
- target role

Defender inputs:

- man coverage
- zone coverage
- press
- recovery speed
- hip fluidity
- play recognition
- safety help

Outputs:

- separation score
- target openness
- contested catch chance
- coverage bust chance

Reason codes:

```text
wr_route_advantage
cb_press_win
safety_help_limited_window
coverage_bust
bad_hips_exposed
```

### Step 3 — QB Decision and Accuracy

QB inputs:

- processing
- decision-making
- accuracy by depth
- timing
- touch
- composure
- pressure handling
- confidence
- playbook familiarity

Context:

- pressure
- pass depth
- weather
- down/distance
- score pressure
- receiver separation

Outputs:

- target choice
- completion probability
- interception probability
- throwaway probability
- sack escape probability
- scramble chance

Reason codes:

```text
qb_processing_found_open_receiver
pressure_forced_miss
deep_accuracy_edge
bad_decision_into_coverage
```

### Step 4 — Catch and YAC

Receiver inputs:

- hands
- concentration
- contested catch
- YAC
- balance
- speed
- contact balance

Defender inputs:

- tackling
- pursuit
- coverage positioning
- physicality

Outputs:

- catch success
- drop chance
- YAC yards
- tackle result
- fumble chance

## Rushing Outcome Model

### Step 1 — Box and Front Context

Inputs:

- box count
- offensive personnel
- defensive front
- run concept
- field zone
- down/distance

Outputs:

- front advantage
- expected lane quality
- stacked box flag

### Step 2 — OL vs Front

Offense:

- run blocking
- zone/gap fit
- OL strength
- OL footwork
- communication
- continuity
- TE blocking

Defense:

- DL run defense
- gap discipline
- LB run fits
- block shedding
- front structure

Outputs:

- lane quality
- stuff probability
- TFL probability
- second-level access

Reason codes:

```text
ol_created_lane
dl_gap_win
lb_run_fit_stopped_play
zone_scheme_fit
```

### Step 3 — RB Reads and Finish

RB inputs:

- vision
- burst
- patience
- contact balance
- power
- elusiveness
- ball security
- stamina

Defense:

- tackling
- pursuit
- speed
- aggression
- missed tackle tendency

Outputs:

- yards bucket
- missed tackle
- yards after contact
- explosive run
- fumble chance

Reason codes:

```text
rb_vision_found_cutback
rb_power_after_contact
poor_vision_missed_lane
tackling_failure_explosive
```

## Sack Model

Sack chance comes from pressure and QB response.

Inputs:

- pressure severity
- QB pocket presence
- QB mobility
- QB processing
- play concept depth
- defender pass rush
- OL pass block
- fatigue
- weather

Outputs:

- sack
- throwaway
- scramble
- pressured throw
- completion under pressure

## Interception Model

Inputs:

- QB decision-making
- QB accuracy
- pressure
- pass depth
- receiver separation
- defender ball skills
- coverage disguise
- weather
- score desperation
- morale/pressure

Interceptions should be rare and context-driven.

## Fumble Model

Inputs:

- ball security
- contact severity
- defender strip ability
- fatigue
- weather
- hit type
- player confidence
- game pressure

Separate:

```text
fumble chance
fumble lost chance
```

Do not make every fumble a turnover.

## Penalty Model

Inputs:

- discipline
- fatigue
- crowd noise
- tempo stress
- mismatch stress
- aggression
- staff discipline
- rivalry emotion

Penalty types should be weighted by context.

Examples:

- false start: crowd/noise/communication
- holding: pass rush mismatch
- pass interference: coverage mismatch
- delay of game: tempo/play clock management
- personal foul: aggression/emotion

## Special Teams Matchups

## Kicking

Inputs:

- kick accuracy
- kick power
- distance
- weather
- pressure
- snap/hold quality
- kicker confidence
- crowd pressure

Outputs:

- make/miss
- miss direction internal
- block chance
- long FG record

## Punting

Inputs:

- punt power
- punt accuracy
- hang time
- weather
- pressure
- field position

Outputs:

- punt distance
- net distance
- inside 20
- touchback
- returnable

## Returns

Inputs:

- returner speed
- returner vision
- returner ball security
- coverage speed
- lane discipline
- special teams coaching
- fatigue

Outputs:

- return yards
- explosive return
- fumble
- TD

## Fatigue Effects

Fatigue should affect:

- speed
- explosiveness
- strength
- mental errors
- injury risk
- penalty risk
- tackling
- pass protection
- pass rush
- QB accuracy under pressure

Use position-specific fatigue sensitivity.

## Morale and Team Vibe Effects

Morale/team vibe should not be magic.

Use it for:

- clutch performance
- consistency
- response after negative plays
- transfer/off-field systems
- confidence-based player variance

Avoid:

```text
team vibe +10 yards
```

Better:

```text
high team vibe lowers mistake volatility and improves late-game composure slightly.
```

## Scheme Fit Effects

Scheme fit modifies:

- install quality
- assignment error rate
- play success volatility
- player confidence
- recruit interest
- long-term development

A player with poor scheme fit should not become useless, but the system should expose inefficiencies.

## Bad Hips Example

Trait:

```text
Bad Hips
```

Derived from:

- low hip fluidity
- low change of direction
- low lateral quickness

Effects by position:

- CB: worse press recovery, man coverage vs quick routes
- Safety: worse change-of-direction in space
- LB: worse coverage transitions
- WR: worse sharp routes
- RB: worse lateral cuts
- OL/DL: less impact, but may affect edge bend/footwork depending role

Reason codes:

```text
bad_hips_lost_separation
bad_hips_poor_recovery
bad_hips_limited_cutback
```

## Linear Athlete Example

High straight-line speed but poor agility.

Effects:

- good deep threat
- good kickoff return ceiling
- poor short-area separation
- poor change-of-direction defense
- scheme-specific value

## Player Selection / Involvement

The play generator must select participants plausibly.

Inputs:

- depth chart
- personnel package
- target distribution
- fatigue
- game plan
- hot hand
- injuries
- formation
- position role

Example:

```text
WR1 target share higher, but not every pass.
RB rotation depends on role, fatigue, and game state.
DL rotation increases with tempo/fatigue.
```

## Reason Code Examples

Every major outcome should include reason codes.

```text
qb_accuracy_short_advantage
wr_route_separation_win
cb_man_coverage_win
ol_pass_block_failure
edge_bend_sack
rb_vision_success
lb_run_fit_stop
weather_deep_pass_penalty
crowd_false_start
fatigue_missed_tackle
```

## Tests

Unit tests:

- QB accuracy affects completion probability
- pass rush affects sack probability
- WR separation affects target success
- bad hips affects CB recovery
- RB vision affects run success
- ball security affects fumble chance
- fatigue affects penalties and injury risk
- scheme fit changes assignment error
- same seed same matchup output

Integration tests:

- high pass rush defense creates more pressure over many plays
- air raid team creates more passing volume
- option team creates rushing-heavy stats
- tempo team creates more plays and fatigue
- elite QB/WR combo produces better passing efficiency over samples

## Acceptance Criteria

The attribute-to-outcome system is acceptable when:

- attributes affect play outcomes with reason codes
- no single attribute dominates all outcomes
- hidden traits affect consistency/variance appropriately
- scheme fit matters
- fatigue matters
- morale/team vibe matters subtly
- player-specific weaknesses appear in reports and outcomes
- long-run stats reflect roster strengths
- Data Lab can explain why outputs happen


<!-- FILE: 30_RECRUITING_ENGINE_IMPLEMENTATION_SPEC.md -->

# 30 — Recruiting Engine Implementation Spec

## North Star

Recruiting is the college-football equivalent of FM's transfer market, youth intake, scouting, squad planning, and long-term talent pipeline.

The user should feel like they are projecting imperfect teenagers into future college players.

Recruiting should reward:

- player fit
- development vision
- geographic strategy
- staff evaluation
- scheme identity
- relationships
- NIL realism
- roster planning
- risk management

It should not be a simple points race.

## Core Loop

```text
Generate multi-year prospect pool
→ discover / identify
→ scout
→ interpret uncertainty
→ compare to roster and scheme
→ assign staff
→ contact / offer / visit / pitch
→ handle competitor pressure
→ manage NIL and promises
→ commit / decommit / flip
→ sign
→ convert to player
→ develop
→ validate evaluation years later
```

## Prospect Lifecycle

Prospects should exist across multiple years.

```text
Freshman: background pool / mostly hidden
Sophomore: early ID, low confidence
Junior: active recruiting begins
Senior: full recruiting, visits, commitments, signing
```

## Prospect Tiers

Not every high school player needs full simulation.

```text
Tier 1: national blue-chip prospects
Tier 2: FBS recruitable prospects
Tier 3: regional/depth prospects
Tier 4: generated if discovered
Tier 5: statistical background pool
```

Full detail is required for Tiers 1–3.

## Class Distribution

Configurable defaults:

```text
five-stars: about 32
four-stars: about 300
three-stars: about 1500
two-stars/unranked: large background pool
```

These should be generated from calibration data when available.

## Prospect Entity Requirements

```ts
type Prospect = {
  id: ProspectId;
  classYear: number;
  gradeLevel: "FR" | "SO" | "JR" | "SR";
  identity: ProspectIdentity;
  highSchool: HighSchoolProfile;
  position: Position;
  secondaryPositions: Position[];
  archetype: string;
  physical: PhysicalProfile;
  trueAttributes: PlayerAttributes;
  publicRating: PublicRating;
  scoutedRatings: ScoutedRatings;
  hiddenTraits: HiddenPlayerTraits;
  preferences: RecruitPreferenceWeights;
  developmentProfile: ProspectDevelopmentProfile;
  recruitmentStateBySchool: Record<SchoolId, RecruitmentState>;
  traitClusters: TraitClusterInstance[];
};
```

## Prospect Evolution

Every offseason and sometimes in-season:

```text
prospectGrowth =
  baselineAgeGrowth
+ physicalMaturation
+ highSchoolCoaching
+ workEthic
+ coachability
+ sportFocus
+ randomVariance
- injuryEffect
- stagnationRisk
```

Outcomes:

- late bloomer
- early bloomer
- stagnation
- regression
- position change
- high school transfer
- ranking rise/fall
- public overrating
- public underrating

## Public Rating vs True Ability

Public stars/rankings are not truth.

Public ratings are influenced by:

- camp exposure
- region
- school reputation
- measurables
- production
- recruiting buzz
- media visibility
- offers
- staff discovery
- scouting services bias

True ability is hidden.

Scouted ranges are school-specific.

## Scouting Confidence

Scouting confidence improves through:

- film review
- live evaluation
- camp invite
- staff visit
- official visit
- relationship depth
- regional familiarity
- position coach expertise
- data quality

Confidence decreases or remains noisy if:

- young prospect
- limited film
- position projection
- injury
- raw athlete
- poor staff evaluator
- unfamiliar region
- high variance trait profile

## Scouting Output

Scouting should produce:

- attribute ranges
- trait labels
- risk labels
- staff opinion
- scheme fit
- development projection
- NIL expectation estimate
- preference estimate
- recommendation

Reports can be wrong.

## Recruitment State

```ts
type RecruitmentState = {
  schoolId: SchoolId;
  interest: number;
  relationship: number;
  offerStatus: "none" | "watching" | "offered" | "withdrawn";
  priority: "none" | "low" | "medium" | "high" | "must_get";
  staffOwnerId?: StaffId;
  lastContactWeek?: GameWeek;
  contactFatigue: number;
  visitStatus: VisitStatus;
  pitchHistory: Pitch[];
  promises: Promise[];
  nilExpectationKnown: boolean;
  nilExpectationEstimate?: Range;
  commitmentStatus: "none" | "soft_verbal" | "verbal" | "signed";
  flipRisk: number;
  schoolRankInTopList?: number;
  reasonCodes: ReasonCode[];
};
```

## Recruit Preferences

Every recruit has weighted preferences.

```ts
type RecruitPreferenceWeights = {
  money: number;
  proDevelopment: number;
  location: number;
  playingTime: number;
  winning: number;
  academics: number;
  relationshipWithCoach: number;
  familyInfluence: number;
  brandExposure: number;
  schemeFit: number;
  conferencePrestige: number;
  campusCulture: number;
  earlyEnrollment: number;
};
```

These are hidden or partially scouted.

## Interest Formula

Recruit interest should be calculated with reason codes.

```text
interest =
  locationFit * locationPreference
+ playingTimeOpportunity * playingTimePreference
+ NILAlignment * moneyPreference
+ developmentReputation * proDevelopmentPreference
+ coachRelationship * relationshipPreference
+ schemeFit * schemeFitPreference
+ winningPrestige * winningPreference
+ academicFit * academicsPreference
+ brandExposure * brandExposurePreference
+ familyApproval * familyInfluence
+ campus/townFit * campusCulturePreference
+ visitExperience
+ staffMomentum
- depthChartBlockers
- brokenPromiseReputation
- distancePenalty
- coachingInstability
- competitorMomentum
- overContactFatigue
```

Each term must be normalized and exported as reason codes.

## Location Fit

Factors:

- distance from home
- same state
- neighboring state
- region familiarity
- family influence
- town/campus match
- weather preference
- urban/small-town preference

## Playing Time Opportunity

Inputs:

- current depth chart
- projected depth chart
- class balance
- player archetype
- roster attrition
- promises
- scheme usage
- staff honesty reputation

A recruit who values playing time should care more about this than prestige.

## NIL Alignment

Inputs:

- recruit NIL expectation
- school NIL market
- booster willingness
- direct benefits if relevant
- clearinghouse risk
- position market
- brand exposure
- locker room jealousy risk

Money should matter differently for each recruit.

## Development Reputation

Inputs:

- school draft output by position
- player development history
- position coach reputation
- facilities
- scheme usage
- comparable players
- staff stability

This is crucial for your design.

A recruit who values pro development should choose a lower NIL deal sometimes.

## Relationship

Relationship is built through:

- staff contact
- visits
- honesty
- relevant pitch
- family communication
- high school coach relationship
- prior pipeline
- promises kept/broken historically

Over-contact can backfire.

## Offers

Offer types:

- scholarship
- preferred walk-on
- roster spot with NIL support
- delayed offer
- conditional offer
- greyshirt/blueshirt if ruleset supports

Scholarship is no longer the only value signal.

## Visits

Visit types:

- unofficial visit
- official visit
- junior day
- camp
- spring game
- rivalry game
- night game
- playoff push visit

Visit components:

- staff meetings
- player host
- family meeting
- facility tour
- academic tour
- game atmosphere
- NIL meeting
- town/campus exposure
- scheme meeting

Visit outcome affects:

- interest
- relationship
- family approval
- NIL expectation
- commitment chance
- flip risk
- competitor comparison

## Pitches

Pitch types:

- early playing time
- development/NFL pipeline
- NIL/brand
- location/home
- academics
- scheme fit
- winning/playoff path
- culture/team vibe
- family comfort
- position role

A pitch works better when:

- it matches recruit preferences
- the school can actually deliver
- staff member is credible
- scouting has correctly identified preference

Bad pitches can reduce trust.

## Promises

Promise types:

- no redshirt
- chance to start
- position guarantee
- usage/role
- NIL support
- development plan
- academic support
- family access
- coach stability
- jersey number, optional flavor

Broken promises affect:

- morale
- transfer risk
- future recruiting reputation
- staff credibility
- local pipeline

## Commitments

Commitment types:

- top group
- soft verbal
- verbal
- signed
- early enrollee

Commit decision inputs:

- final interest score
- timing
- school momentum
- competitor pressure
- family influence
- loyalty
- ambition
- NIL alignment
- visit outcome
- coaching stability

## Decommit / Flip Risk

Inputs:

- loyalty
- ambition
- competitor interest
- NIL shortfall
- coaching change
- poor season
- playing-time change
- broken contact cadence
- bad visit
- family pressure
- rival momentum

Commitments are not final until signed.

## AI School Recruiting

AI schools must recruit actively.

AI school process:

```text
evaluate roster needs
identify priority positions
build board
assign staff
offer prospects
schedule visits
make pitches
react to competitor pressure
manage NIL
fill class
fallback to contingencies
```

AI archetypes:

- blue-chip chaser
- regional pipeline builder
- development-focused
- portal-heavy
- NIL aggressor
- scheme-specific
- academic-filtered
- risk-tolerant
- conservative evaluator

AI mistakes should happen:

- chase too many elites
- miss QB need
- over-recruit one position
- ignore scheme fit
- underestimate local sleeper
- lose commit after staff change

## Recruiting Board UI Requirements

Tabs:

- Overview
- Search
- Board
- Needs
- Visits
- Offers
- Staff Assignments
- Commitments
- Competitors
- Promises
- Analytics
- Late Risers
- Risk Report

Columns:

- name
- position
- class
- grade
- state
- stars
- public rank
- your eval
- scouted confidence
- interest
- relationship
- top schools
- NIL expectation
- playing-time fit
- development fit
- scheme fit
- staff owner
- last contact
- next action
- risk labels

## Recruiting Events

- scout report complete
- recruit rises/falls
- rival offer
- rival visit
- recruit asks for promise
- NIL expectation changes
- family concern
- visit result
- commitment
- decommit
- flip risk alert
- signing day decision
- staff recommends withdrawal
- late sleeper found

## Tests

Required:

- class distribution matches config
- sophomore evolves into senior
- late bloomer exists
- scouting confidence narrows range
- interest changes with NIL preference
- interest changes with playing-time preference
- location preference affects school ranking
- visit affects interest
- AI school fills class needs
- recruit cannot sign with two schools
- signed recruit becomes player with hidden traits intact
- broken promise affects future recruiting

## Long-Run Validation

Track:

- five-star distribution
- four-star distribution
- signing class sizes
- blue-chip concentration
- local recruiting patterns
- AI school recruiting quality
- late bloomer rate
- bust rate
- position balance
- NIL impact
- development-reputation impact

## Acceptance Criteria

Recruiting is acceptable when:

- prospects exist before senior year
- prospect development is dynamic
- scouting uncertainty is real
- interest has reason codes
- schools compete
- NIL matters but does not dominate
- development-focused recruits exist
- AI schools recruit plausibly
- commits/decommits/flips happen
- signing class affects future roster
- long-run distributions match targets


<!-- FILE: 31_PLAYER_DEVELOPMENT_PRACTICE_AND_TEAM_VIBE_ENGINE_SPEC.md -->

# 31 — Player Development, Practice, and Team Vibe Engine Spec

## North Star

This game should be about development.

Recruiting matters because you choose players.
Practice matters because you shape them.
Culture matters because people respond differently.
Fit matters because the same player can succeed or fail in different environments.

The system must avoid the common sports-sim failure:

```text
everyone gets better every offseason
```

Realistic development includes:

- late bloomers
- early bloomers
- stagnation
- regression
- injury derailment
- position-change breakouts
- confidence swings
- hidden work ethic
- scheme fit
- staff impact
- facilities impact
- playing time impact

## Core Loop

```text
Evaluate player
→ assign role/depth
→ set practice plan
→ set individual development plan
→ manage workload and morale
→ play games / earn reps
→ weekly/monthly development tick
→ report changes
→ reassess role, retention, recruiting need
```

## Development Inputs

## Player Inputs

- current attributes
- potential
- development curve
- age/class
- work ethic
- coachability
- practice effort
- consistency
- confidence
- ambition
- injury history
- durability
- academic stress
- morale
- role satisfaction
- scheme fit
- position fit

## Environment Inputs

- position coach quality
- staff development rating
- strength coach
- facilities
- practice allocation
- individual development plan
- playing time
- game performance
- team vibe
- leadership
- depth chart competition
- injuries/fatigue

## Development Profile

```ts
type DevelopmentProfile = {
  currentAbilityByRole: Record<RoleId, number>;
  potentialAbilityByRole: Record<RoleId, HiddenNumber>;
  developmentCurve:
    | "early_bloomer"
    | "late_bloomer"
    | "steady"
    | "boom_bust"
    | "high_floor"
    | "raw_tools"
    | "physically_maxed"
    | "injury_limited";
  physicalMaturity: number;
  technicalGrowthRate: number;
  mentalGrowthRate: number;
  volatility: number;
  regressionRisk: number;
  breakoutChance: number;
  stagnationRisk: number;
  lastDevelopmentTick: GameDate;
  developmentHistory: DevelopmentLogEntry[];
};
```

## Weekly Development Tick

During season, development should be smaller and tied to practice/reps.

```text
weeklyGain =
  baseAgeCurve
+ practiceCategoryEffect
+ individualPlanEffect
+ staffDevelopmentEffect
+ facilityEffect
+ repsEffect
+ workEthicModifier
+ coachabilityModifier
+ moraleModifier
+ teamVibeModifier
- fatiguePenalty
- injuryPenalty
- academicStressPenalty
- roleConfusionPenalty
+ variance
```

## Offseason Development Tick

Offseason can be larger for physical development and role learning.

```text
offseasonGain =
  physicalMaturation
+ strengthProgram
+ technicalTraining
+ filmStudy
+ staffEffect
+ facilityEffect
+ hiddenTraitEffect
+ positionChangeEffect
- injuryRecoveryPenalty
- transferAdjustmentPenalty
+ variance
```

## Regression

Regression must exist.

Causes:

- injury
- fatigue overload
- low morale
- poor fit
- lack of reps
- bad coaching
- academic stress
- confidence collapse
- aging out for older players
- position change failure
- low work ethic
- low coachability

## Attribute-Specific Development

Not all attributes develop the same way.

### Physical

Most influenced by:

- age
- physical maturity
- strength program
- nutrition/facilities
- injury
- frame
- genetics/hidden potential

### Technical

Most influenced by:

- position coaching
- practice category
- reps
- individual plan
- coachability
- scheme fit

### Football IQ

Most influenced by:

- film study
- playing time
- staff teaching
- academic/study habits
- experience
- playbook complexity

### Mental

Most influenced by:

- game experience
- leadership
- adversity
- morale
- coach relationship
- team vibe
- big games

## Practice System

## Practice Time Units

Practice is constrained by ruleset.

```ts
type PracticeWeek = {
  schoolId: SchoolId;
  weekId: string;
  totalTimeUnits: number;
  allocations: PracticeAllocation[];
  intensity: PracticeIntensity;
  staffOwnerId?: StaffId;
  delegated: boolean;
};
```

Categories:

- fundamentals
- strength and conditioning
- film study
- position technique
- scheme install
- opponent prep
- special teams
- recovery
- academic support
- leadership/culture

## Intensity

```text
Light
Normal
Intense
Extreme
```

Effects:

```text
Light:
  lower injury/fatigue
  lower readiness/development
  morale protection

Normal:
  balanced

Intense:
  better readiness/development
  higher fatigue/injury risk
  morale strain

Extreme:
  possible short-term boost
  major fatigue/injury/morale risk
  only some personalities tolerate it
```

## Practice Outputs

Each week:

- readiness
- fatigue
- injury risk
- morale impact
- development impact
- game plan familiarity
- position group confidence
- team vibe movement

## Individual Development Plans

Examples:

- add weight
- improve route running
- improve pass protection
- improve deep accuracy
- improve ball security
- learn new position
- improve playbook understanding
- rehab focus
- leadership growth
- conditioning

IDP success depends on:

- player traits
- staff
- practice time
- facility
- morale
- focus fit
- injury/fatigue

## Position Changes

Position change inputs:

- body type
- athletic traits
- football IQ
- willingness
- role opportunity
- staff recommendation
- practice allocation
- player morale

Outcomes:

- successful conversion
- partial conversion
- stalled conversion
- morale issue
- transfer risk increase
- hidden potential unlock

## Team Vibe

Team Vibe is a team-level cultural/chemistry metric.

Components:

- average morale
- leadership strength
- coach trust
- position-room cohesion
- winning momentum
- fatigue/burnout
- conflict
- broken promises
- staff stability
- role clarity

```ts
type TeamVibe = {
  score: number;
  components: {
    morale: number;
    leadership: number;
    coachTrust: number;
    roleClarity: number;
    momentum: number;
    fatigue: number;
    conflict: number;
    brokenPromises: number;
  };
  labels: string[];
  history: TeamVibeLogEntry[];
};
```

## Team Vibe Effects

High vibe:

- better response to adversity
- fewer transfers
- better practice buy-in
- slight clutch performance stability
- recruits notice culture

Low vibe:

- transfer risk
- conflict events
- practice resistance
- blown assignments under pressure
- poor response to losses
- staff concern events

Do not make vibe a direct ratings boost. It should reduce volatility and affect behavior.

## Pep Talks and Meetings

Types:

- pre-game
- halftime
- post-game
- weekly team meeting
- crisis meeting
- position group meeting
- player 1-on-1

Tone:

- calm
- assertive
- aggressive
- passionate
- supportive
- disappointed
- demanding
- confident
- inspirational

Player reaction depends on:

- personality
- confidence
- pressure handling
- coach relationship
- recent performance
- role satisfaction
- team vibe
- leadership

Output:

- morale delta
- team vibe delta
- short-term composure/readiness effect
- trust delta
- conflict risk

Pep talks can backfire.

## Development Reports

Staff should report:

- breakout practice
- stagnation concern
- role confusion
- position-change suggestion
- workload issue
- fatigue issue
- hidden development clue
- coachability issue
- leadership growth
- confidence problem

Reports may be wrong or biased.

## Events

- player developing faster than expected
- player stagnating
- player unhappy with workload
- practice fatigue warning
- team vibe slipping
- leader calls team meeting
- pep talk backfires
- position coach recommends IDP change
- injury recovery ahead/behind schedule
- freshman struggling with playbook

## Tests

Required:

- work ethic affects development
- coachability affects technical growth
- staff quality affects growth
- facilities affect physical/recovery growth
- intense practice increases fatigue
- extreme practice can reduce morale
- recovery reduces injury risk
- team vibe affects transfer risk
- pep talk can help/hurt based on personality
- player can regress
- late bloomer can emerge
- save/load preserves development history

## Long-Run Validation

Track:

- average growth by class
- elite player scarcity
- breakout rates
- stagnation rates
- regression rates
- injury derailment
- development by school
- staff impact
- facility impact
- practice strategy impact
- position-change success

## Acceptance Criteria

This system is acceptable when:

- development is not automatic
- hidden traits matter
- practice choices matter
- staff/facilities matter
- morale/team vibe matter
- players can regress
- player identities emerge
- development drives recruiting/draft reputation
- long-run talent levels remain plausible


<!-- FILE: 32_AI_SCHOOL_PROGRAM_MANAGER_SPEC.md -->

# 32 — AI School Program Manager Spec

## North Star

The game world only works if AI-controlled schools are real participants.

Every AI school must manage:

- roster
- recruiting
- staff
- NIL
- transfers
- practice identity
- scheme
- finances
- depth chart
- player development
- postseason goals
- program direction

The AI does not need to be perfect. It needs to be plausible, varied, and capable of both success and mistakes.

## Core Loop

Every AI school runs a seasonal management cycle:

```text
evaluate program state
→ set goals
→ evaluate roster needs
→ recruit
→ use portal
→ manage retention
→ hire/fire staff
→ set depth chart
→ set practice identity
→ simulate games
→ react to results
→ adjust strategy
```

## AI Program Profile

```ts
type AIProgramProfile = {
  schoolId: SchoolId;
  archetypes: AIProgramArchetype[];
  riskTolerance: number;
  NILAggression: number;
  portalAggression: number;
  loyaltyToStaff: number;
  patience: number;
  developmentFocus: number;
  recruitingAmbition: number;
  schemeRigidity: number;
  localRecruitingBias: number;
  academicStrictness: number;
  boosterPressureSensitivity: number;
};
```

## AI Archetypes

- blue-chip chaser
- regional pipeline builder
- development factory
- portal mercenary
- NIL aggressor
- scheme-first underdog
- defensive grinder
- tempo chaos program
- academic filter
- booster-chaos program
- patient builder
- impatient blue blood
- conservative roster manager
- high-risk recruiter

AI schools can combine archetypes.

Example:

```text
Blue blood with NIL aggressor + impatient booster profile.
```

## Program Evaluation

AI evaluates:

- record
- recent success
- roster talent
- roster balance
- recruiting class
- transfer risk
- staff quality
- finances/NIL
- fan/booster confidence
- conference position
- schedule difficulty
- draft output
- development output

Output:

- short-term priority
- long-term priority
- pressure level
- risk posture

## Roster Management

AI must evaluate:

- current depth chart
- next-year depth
- eligibility losses
- likely transfers
- position needs
- playing-time promises
- NIL allocation
- portal needs
- recruiting needs

AI mistakes allowed:

- overstack a position
- miss a QB cycle
- ignore special teams
- trust bad evaluation
- chase stars over fit
- mismanage promises

But mistakes should come from profile and constraints.

## Recruiting AI

AI process:

```text
build needs map
score prospects
create board
assign staff
offer
schedule visits
make pitches
adjust to competitor pressure
fallback when losing
sign class
```

AI prospect score:

```text
fitScore =
  rosterNeed
+ talentEvaluation
+ schemeFit
+ locationFit
+ interest
+ NILAffordability
+ developmentFit
+ staffPipeline
- risk
- opportunityCost
```

AI board should contain tiers:

- must-get
- high priority
- solid fit
- fallback
- watchlist

## Portal AI

AI uses portal when:

- roster hole
- poor recruiting class
- coach change
- win-now pressure
- NIL available
- starter injured/transferred
- scheme change

Portal AI should weigh:

- immediate ability
- eligibility
- NIL cost
- fit
- locker room impact
- player risk
- opportunity cost

## Retention AI

AI must try to keep important players.

Retention decisions:

- promise role
- increase NIL/direct benefit
- staff meeting
- development plan
- accept transfer
- encourage transfer
- replace via portal

AI should not retain everyone.

## Staff AI

AI handles:

- hiring
- firing
- extensions
- poaching
- role changes
- scheme changes

Inputs:

- performance
- staff reputation
- budget
- scheme fit
- recruiting success
- development output
- booster/fan pressure

AI can make bad hires.

## NIL AI

AI allocates NIL by strategy.

Profiles:

- star-heavy
- broad distribution
- recruit-focused
- retention-focused
- QB/skill focused
- trenches focused
- conservative compliance
- aggressive booster

AI must use clearinghouse and budget constraints.

## Depth Chart AI

Inputs:

- current ability
- staff opinion
- scheme fit
- player role promises
- development priority
- fatigue/injury
- morale
- experience

AI may choose:

- best player now
- develop younger player
- honor promise
- preserve redshirt
- rotate

## Practice AI

AI sets practice based on:

- coach philosophy
- team fatigue
- upcoming opponent
- development needs
- team vibe
- injuries
- scheme install

Profiles:

- intense disciplinarian
- player-friendly
- fundamentals-heavy
- analytics prep
- development-focused
- gameplan-heavy

## Game Plan AI

AI chooses:

- tempo
- run/pass tendency
- aggression
- defensive focus
- special teams aggression
- clock strategy

Inputs:

- scheme
- opponent weakness
- own roster
- injuries
- weather
- game stakes
- coach risk tolerance

## Program Trajectory

AI schools can rise or fall.

Rise causes:

- great staff
- strong recruiting
- NIL growth
- facilities
- development
- draft output
- conference opportunity

Fall causes:

- bad hires
- staff turnover
- poor development
- booster chaos
- weak NIL
- recruiting misses
- transfer losses
- facility stagnation

No school is permanently dominant by label.

## AI Decision Reason Codes

Every AI major decision should export reason codes.

Examples:

```text
need_qb_next_cycle
nil_budget_insufficient
local_pipeline_priority
coach_hot_seat_win_now
depth_chart_blocks_recruit
development_reputation_high
```

## Data Lab AI Reports

For each AI school, export:

- recruiting strategy
- portal strategy
- NIL allocation
- roster needs
- staff decisions
- mistakes/risks
- program trajectory

## Events

AI decisions should create world news:

- rival signs top recruit
- coach fired
- staff poached
- star transfers
- NIL push
- conference power rising
- dynasty forming
- program collapse

## Tests

Required:

- AI builds needs map
- AI recruits by position need
- AI fills class
- AI uses portal for holes
- AI retains star differently than backup
- AI depth chart is legal
- AI respects budget/NIL constraints
- AI can make profile-driven choices
- AI school state saves/loads
- 20-year sim does not collapse AI rosters

## Acceptance Criteria

AI School Manager is acceptable when:

- AI schools recruit
- AI schools manage roster
- AI schools use portal
- AI schools use NIL
- AI schools hire/fire staff
- AI schools set depth charts
- AI schools develop identities
- AI mistakes are plausible
- no school is permanently great by label
- long-run world produces believable rises/falls


<!-- FILE: 33_NIL_BOOSTER_AND_ROSTER_ECONOMICS_IMPLEMENTATION_SPEC.md -->

# 33 — NIL, Booster, and Roster Economics Implementation Spec

## North Star

Modern college football roster building is not controlled primarily by scholarships.

The game must model a broader economy:

```text
roster spot
scholarship status
NIL value
direct benefit allocation
playing time
development attention
coach trust
location fit
draft exposure
booster power
clearinghouse friction
```

Money should matter. It should not be the only way to win.

## Core Loop

```text
evaluate player/recruit expectations
→ estimate market value
→ allocate NIL/direct benefits/resources
→ clearinghouse review
→ player/recruit reaction
→ locker room/booster/compliance consequences
→ recruiting/retention outcome
```

## Roster Currencies

## Roster Spot

A player must occupy a roster slot unless ruleset says otherwise.

## Scholarship

Still matters, but less than older models.

Effects:

- security
- prestige
- family perception
- institutional support
- sometimes financial relief

## NIL

Third-party/collective-style market value.

Effects:

- recruiting
- retention
- morale
- jealousy
- booster pressure
- clearinghouse review

## Direct Benefits

School-administered benefit pool if ruleset enables.

Effects:

- retention
- morale
- roster strategy
- compliance reporting

## Playing Time

A scarce currency.

Effects:

- recruiting
- transfer risk
- development
- promises

## Development Attention

Coaching and practice resources are limited.

Effects:

- player growth
- morale
- staff workload

## NIL Market Value Model

Market value estimate:

```text
marketValue =
  playerTalentValue
+ positionPremium
+ productionValue
+ brandExposure
+ schoolMarketStrength
+ localBusinessInterest
+ socialProfile
+ draftBuzz
+ scarcity
+ rivalry/heroMoments
- riskDiscount
```

## Position Premium

Configurable.

Typical high value:

- QB
- elite WR
- elite edge
- elite OT
- star RB in certain contexts

But school identity can change premiums.

Example:

```text
Option team may value QB/RB differently.
Defensive school may value DL/LB more.
```

## Player Money Preference

Every player has hidden preference weights.

```ts
type PlayerPreferenceWeights = {
  money: number;
  proDevelopment: number;
  location: number;
  playingTime: number;
  winning: number;
  academics: number;
  relationshipWithCoach: number;
  brandExposure: number;
  familyInfluence: number;
};
```

Money preference affects reaction to NIL but should not erase all other values.

## NIL Deal Object

```ts
type NILDeal = {
  id: string;
  entityId: PlayerId | ProspectId;
  schoolId: SchoolId;
  amount: number;
  termWeeks: number;
  dealType:
    | "collective"
    | "local_business"
    | "appearance"
    | "social_media"
    | "autograph"
    | "camp"
    | "charity"
    | "donor_backed";
  sponsorType: string;
  proposedBy: "user" | "ai_school" | "booster" | "system";
  status:
    | "proposed"
    | "approved"
    | "approved_with_scrutiny"
    | "delayed"
    | "flagged"
    | "denied"
    | "expired";
  review: NILDealReview;
  lockerRoomImpact: number;
  boosterImpact: number;
  complianceRisk: number;
};
```

## Clearinghouse Review

The clearinghouse checks whether a deal is plausible.

Inputs:

- market value estimate
- proposed amount
- multiplier
- player profile
- position
- school NIL market
- donor risk
- deal type
- timing
- comparable deals
- repeated pattern
- recruit/player status

Statuses:

- Approved
- Approved with scrutiny
- Delayed review
- Flagged
- Denied

Denial should be rare. Flagging/delay should be more common.

## Clearinghouse Risk Formula

```text
risk =
  amountMultiplierRisk
+ lowProfileHighAmountRisk
+ timingRisk
+ donorRisk
+ repeatedPatternRisk
+ dealTypeRisk
+ marketMismatchRisk
- playerBrandJustification
- schoolMarketJustification
```

Reason codes required.

## Booster System

Booster segments:

- mega boosters
- former players
- local business donors
- general alumni
- corporate partners
- NIL-focused donors
- facility-focused donors

Each segment has:

- wealth
- enthusiasm
- patience
- influence
- risk tolerance
- meddling tendency
- compliance risk
- favorite priorities

## Booster Actions

User can:

- host event
- ask for NIL push
- ask for facility money
- meet private donor
- launch campaign
- soothe angry boosters
- reject meddling request

Outcomes:

- money gained
- confidence changed
- influence increased
- compliance risk
- political pressure

## Booster Meddling

Examples:

- wants staff fired
- wants recruit prioritized
- wants NIL money for certain position
- wants public statement
- threatens to pull support
- offers restricted donation

This should be occasional, not constant.

## Locker Room Economics

High NIL differences can create:

- jealousy
- morale issues
- leadership challenges
- transfer risk
- demands from other players
- team vibe changes

But high team vibe and leadership can buffer this.

## Direct Benefits

Ruleset-driven.

Fields:

- pool amount
- allocation method
- player allocations
- position allocations
- compliance flags
- morale impact
- retention impact

Strategies:

- star-heavy
- broad distribution
- retention-focused
- recruit-focused
- position-focused
- leadership reward

## Walk-On NIL

A player can be:

```text
walk-on with NIL deal
```

This must be supported.

Scholarship status does not determine economic value.

## Budget Constraints

Budgets:

- football operating budget
- NIL ecosystem strength
- collective available funds
- direct benefit pool
- facility campaign funds
- staff salary pool

Do not blend them into one magic money number.

## User Actions

- propose NIL deal
- negotiate NIL expectation
- allocate direct benefit
- raise booster money
- launch campaign
- ask collective for support
- decline bidding war
- spread funds broadly
- prioritize retention
- prioritize recruit
- request clearinghouse review
- self-report concern, optional

## AI School NIL Actions

AI schools should:

- estimate market value
- decide aggression
- allocate funds
- trigger clearinghouse review
- react to flags
- create bidding pressure
- sometimes overpay

## Events

- deal approved
- deal delayed
- deal flagged
- deal denied
- booster offers restricted money
- locker room jealousy
- player asks for more
- recruit NIL expectation rises
- collective funds running low
- donor anger
- compliance warning

## Tests

Required:

- walk-on can receive NIL
- high-profile QB large deal approved/scrutinized
- low-profile player absurd deal flagged
- timing risk increases score
- donor risk matters
- NIL affects recruit interest based on money preference
- NIL affects retention
- broad distribution lowers jealousy
- star-heavy distribution can create jealousy
- direct benefits separate from NIL
- save/load preserves deals

## Long-Run Validation

Track:

- deal sizes by position
- flag rate
- denial rate
- NIL impact on recruiting
- NIL impact on retention
- school NIL concentration
- money-only strategy win rate
- locker room jealousy events
- walk-on NIL cases
- booster influence

## Acceptance Criteria

This system is acceptable when:

- scholarship is not the main roster economy
- NIL matters but does not dominate
- development/location/playing time still matter
- absurd deals are flagged
- walk-on NIL is supported
- boosters help and cause problems
- locker room economics exist
- long-run NIL market remains plausible


<!-- FILE: 34_TRANSFER_PORTAL_AND_RETENTION_ENGINE_SPEC.md -->

# 34 — Transfer Portal and Retention Engine Spec

## North Star

The transfer portal should feel like modern roster free agency, but with college-football constraints:

- role
- NIL
- development
- relationships
- homesickness
- coaching changes
- eligibility
- timing
- academic fit
- roster opportunity

The user should be able to fight to keep players, but not always succeed.

## Core Loop

```text
monitor roster satisfaction
→ identify transfer risks
→ trigger meetings/events
→ player decides whether to enter portal
→ schools evaluate portal players
→ offers/visits/role promises
→ commitment/enrollment
→ roster/depth impact
```

## Transfer Risk Formula

```text
transferRisk =
  playingTimeDissatisfaction
+ roleMismatch
+ NILShortfall
+ brokenPromises
+ lowCoachRelationship
+ homesickness
+ academicIssue
+ schemeChange
+ positionCrowding
+ highAmbition
+ externalInterest
+ coachingChange
- loyalty
- teamSuccess
- developmentSatisfaction
- strongRelationships
- leadershipConnection
```

Every term needs reason codes.

## Player Transfer Profile

```ts
type TransferProfile = {
  transferRisk: number;
  riskBand: "low" | "watch" | "concern" | "high" | "imminent";
  mainReasons: ReasonCode[];
  likelyDestinations: SchoolId[];
  portalStatus:
    | "not_considering"
    | "considering"
    | "meeting_requested"
    | "entered_portal"
    | "committed_transfer"
    | "withdrawn";
  portalEntryWeek?: GameWeek;
  retentionMeetings: RetentionMeeting[];
};
```

## Portal Windows

Ruleset-driven.

Support:

- main portal window
- spring window if enabled
- coaching-change exception
- graduate transfer exception
- custom sandbox rules

Do not hardcode current rules.

## Entering Portal

Triggers:

- high transfer risk
- coach fired/leaves
- coordinator leaves
- role promise broken
- NIL unmet
- depth chart blocked
- scheme change
- academic/campus fit issue
- family/location pressure
- disciplinary/culture issue, toned down

Not all high-risk players enter. Loyalty and relationships matter.

## Retention Meetings

User actions:

- promise role
- promise competition
- increase NIL
- offer direct benefit
- explain development path
- suggest position change
- involve position coach
- involve family
- be honest
- encourage transfer
- delay

Outcomes:

- stays
- stays temporarily
- enters portal
- morale changes
- promise created
- trust changes
- teammates notice
- staff opinion changes

## Portal Player Entity

Portal players can be existing players or generated transfers.

Fields:

- current school
- prior school
- eligibility
- position
- ratings/scouted ranges
- stats
- reason for transfer
- NIL expectation
- role expectation
- academic transfer risk
- immediate eligibility status
- preferred destinations
- interest by school

## Portal Search

Filters:

- position
- class/eligibility
- ability
- potential
- NIL expectation
- role expectation
- interest
- academic risk
- scheme fit
- prior production
- injury history
- hometown
- portal reason
- immediate eligibility

## Portal Recruiting

Actions:

- contact
- offer role
- offer NIL
- offer direct benefit
- schedule visit
- pitch development
- pitch winning
- pitch location
- promise starting job
- withdraw interest

Portal recruiting is faster and more role/NIL-driven than HS recruiting.

## AI Portal Behavior

AI schools use portal to:

- fill urgent holes
- replace transfers
- chase win-now upgrades
- support new coach scheme
- recover from recruiting misses

AI can overuse portal and hurt culture/development.

## Tampering / Compliance Risk

For private sim, include abstract risk.

Risk sources:

- contacting before portal
- booster pressure
- repeated patterns
- staff integrity
- aggressive NIL timing

Events:

- rumor
- warning
- internal review
- reputation hit

Keep toned down.

## Portal Effects On Team

Portal losses affect:

- depth chart
- team vibe
- morale
- recruiting needs
- staff reputation
- fan confidence
- NIL pressure

Portal additions affect:

- depth chart
- promises
- player morale
- chemistry
- development path
- team vibe

## Events

- player considering portal
- player requests meeting
- player enters portal
- portal target interested
- portal window closing
- former recruit enters portal
- star player poached
- position room worried
- staff recommends retention plan
- NIL demand from player
- transfer commits

## Tests

Required:

- playing time increases risk
- NIL shortfall increases risk for money-focused player
- strong relationship reduces risk
- coach change increases risk
- retention meeting can reduce risk
- promise creates future obligation
- player can enter only valid window unless exception
- portal player can join new school
- AI uses portal for roster hole
- save/load preserves portal status

## Long-Run Validation

Track:

- portal volume
- transfer reasons
- star transfers
- position distribution
- NIL-driven transfers
- playing-time transfers
- coach-change transfers
- retention success
- AI portal usage
- portal-heavy program outcomes

## Acceptance Criteria

Portal system is acceptable when:

- players leave for understandable reasons
- user can sometimes talk players out of leaving
- user cannot retain everyone
- NIL/role/development/location all matter
- AI schools use portal plausibly
- portal changes roster strategy
- long-run volume is plausible


<!-- FILE: 35_DRAFT_AND_NFL_PIPELINE_CALIBRATION_SPEC.md -->

# 35 — Draft and NFL Pipeline Calibration Spec

## North Star

The draft is both gameplay and calibration.

It should answer:

```text
Is the sim producing realistic elite talent?
Are development factories real?
Are school pipelines emerging causally?
Are player stats and attributes believable?
```

Draft output should feed back into:

- recruiting
- player NIL value
- staff reputation
- school prestige
- coach job offers
- program identity

## Draft Candidate Inputs

```text
current ability
potential projection
position value
size/measurable thresholds
athletic traits
technical traits
football IQ
production
competition level
scheme translation
injury history
age/class
character/personality risk
combine/pro day abstraction
school NFL pipeline
staff reputation
media visibility
```

## Draft Declaration Model

Players may declare if:

- draft stock high
- age/class eligible
- NIL not enough to retain
- ambition high
- injury risk concern
- family/money pressure
- team success
- coach advice
- projected round

Players may stay if:

- low draft grade
- high NIL
- loyalty
- unfinished goals
- development focus
- injury recovery
- strong coach relationship

## Draft Grade

```text
draftGrade =
  abilityGrade
+ traitsGrade
+ productionGrade
+ positionValue
+ sizeThreshold
+ competitionAdjustment
+ injuryAdjustment
+ ageAdjustment
+ schoolPipelineAdjustment
+ combineAdjustment
+ characterAdjustment
+ visibilityAdjustment
```

Reason codes required.

## Position Value

Different positions have different draft behavior.

High-value:

- QB
- OT
- edge
- CB
- WR

Contextual:

- RB production matters but positional value may cap
- LB/S/TE vary by traits
- K/P rare

Configurable.

## Production vs Traits

Draft should not be only stats.

Examples:

- elite production with poor size/traits may go later
- elite traits with modest production may still be drafted
- scheme-specific production may be discounted
- injuries can lower stock
- G5 stars can be drafted if traits/production strong

## School NFL Pipeline

Pipeline should matter subtly.

Inputs:

- recent draft picks by position
- staff development reputation
- scheme translation
- media exposure
- conference strength

Important:

```text
Pipeline helps visibility and trust.
It must not override player quality.
```

## Combine / Pro Day Abstraction

No need to simulate full combine early.

Use hidden event:

```text
combineResult =
  expectedAthleticism
+ preparation
+ variance
- injury
```

Can create:

- riser
- faller
- confirmed grade
- medical flag

## Draft Output

At minimum:

- rounds
- picks
- teams abstracted or generic pro slots
- undrafted free agent status
- draft grade
- reason codes

You do not need real NFL teams unless private mode wants them later.

## Draft Feedback Loops

Draft success affects:

- recruiting development pitch
- school NFL pipeline
- staff reputation
- position coach reputation
- NIL value for current players
- coach job market
- program identity labels

Example:

```text
Three QBs drafted in five years
→ QB Factory label
→ QB recruits value school more
→ OC/QB coach reputation rises
```

## Validation Metrics

Track:

- total draft picks per year
- first-round picks
- position distribution
- picks by school
- picks by conference
- picks by star background
- five-star hit rate
- four-star hit rate
- three-star breakout rate
- walk-on picks
- G5 picks
- school concentration
- draft pipeline mobility

## Red Flags

- same schools dominate forever without causal reason
- no G5 players drafted
- too many first-rounders
- too few draftable players
- stats dominate traits
- traits dominate production
- school prestige dominates everything
- NIL always prevents declarations
- players never stay
- players always stay

## Events

- player receives draft grade
- player considering declaration
- staff recommends stay/go
- player declares
- player returns
- draft result
- school produces first-rounder
- position coach reputation rises
- recruiting pitch unlocked
- draft drought warning

## Tests

Required:

- elite player gets high grade
- production improves grade
- injury lowers grade
- position value affects round
- G5 elite can be drafted
- school pipeline helps but does not dominate
- high NIL can influence return decision
- ambitious player more likely to declare
- draft result updates school pipeline
- long-run draft distribution plausible

## Acceptance Criteria

Draft system is acceptable when:

- it validates player development
- it feeds recruiting/staff/school reputation
- output distribution is plausible
- different school types can produce picks
- player decisions are explainable
- draft does not become a pure OVR list


<!-- FILE: 36_REAL_DATA_INGESTION_AND_CALIBRATION_PIPELINE_SPEC.md -->

# 36 — Real Data Ingestion and Calibration Pipeline Spec

## North Star

The game should use real college football data to calibrate fictional/private simulations.

Real data should inform:

- talent distribution
- play outcomes
- stats
- school power inputs
- recruiting geography
- draft pipelines
- name generation
- town immersion
- scheme tendencies
- attendance/fan intensity proxies

The goal is not to perfectly reproduce reality. The goal is to keep the sim from drifting into nonsense.

## Data Modes

```text
fictional_mode
real_school_private_mode
custom_mode
hybrid_mode
```

The pipeline should support all four.

## Data Folders

```text
data_raw/
  cfbd/
  kaggle/
  wikipedia/
  ncaa_public/
  reddit_town_flavor/
  manual_reference/

data_processed/
  teams/
  rosters/
  plays/
  stats/
  recruiting/
  draft/
  school_power/
  names/
  towns/
  calibration/

game_data/
  calibration/
  synthetic/
  real_private/
  configs/
```

## Source Registry

Every data source must be registered.

```ts
type DataSourceRecord = {
  id: string;
  name: string;
  url?: string;
  type: "api" | "csv" | "scrape" | "manual" | "crowdsource";
  licenseNotes: string;
  rawRedistributionAllowed: boolean | "unknown";
  devOnly: boolean;
  shippedUse: "none" | "aggregate_only" | "private_mode" | "allowed";
  fields: string[];
  refreshCadence: string;
  riskNotes: string[];
};
```

## Core Sources

## CFBD / CollegeFootballData

Use for:

- games
- plays
- drives
- team stats
- player usage where available
- rosters
- recruiting
- rankings
- team/conference data

## Kaggle

Use as fallback/bulk historical data.

## Wikipedia

Use for:

- school metadata
- conference history
- stadiums
- rivalries
- awards
- town references, limited

## NCAA / ESPN Public Stats

Use for public sanity checks.

## Reddit / Crowdsource

Use for town flavor only after filtering.

Do not use unfiltered Reddit text directly in game.

## Name Generation

Use real rosters only to build aggregate distributions:

- first names
- last names
- state/region names
- position/body distributions
- hometown distributions

Do not ship raw identifiable player rows unless private mode and user chooses.

## School Power Inputs

Build school starting values from proxies:

- enrollment/alumni estimate
- historical football revenue if available
- stadium size
- attendance
- draft picks
- historical win rate
- conference membership
- recruiting geography
- local talent density
- recent success
- facilities estimate
- media exposure
- fan intensity proxy

Output:

```ts
type SchoolPowerInput = {
  alumniBase: number;
  donorWealth: number;
  fanIntensity: number;
  localTalentAccess: number;
  regionalTalentDensity: number;
  facilities: number;
  nflPipeline: number;
  mediaExposure: number;
  academicPrestige: number;
  campusAppeal: number;
  locationAppeal: number;
  tradition: number;
  recentSuccess: number;
  staffBudget: number;
  nilMarketStrength: number;
  confidence: number;
  sources: string[];
};
```

## Play Outcome Calibration

From play-by-play data build:

- run/pass by down/distance
- yards gained distributions
- sack rates
- interception rates
- fumble rates
- penalty rates
- explosive rates
- red-zone results
- third/fourth down conversion
- play types by scheme/team archetype
- tempo/plays per game
- garbage-time tendencies

## Stat Calibration

Build bands for:

- team PPG
- total yards/game
- pass yards/game
- rush yards/game
- yards/play
- turnovers/game
- sacks
- penalties
- red-zone TD rate
- individual leaderboards
- positional stat distributions

## Recruiting Calibration

Build:

- star distribution
- state distribution
- position distribution
- blue-chip concentration
- school signing patterns
- regional pipeline tendencies
- recruit height/weight by position

## Draft Calibration

Build:

- draft picks by school
- draft picks by conference
- picks by position
- first-round distribution
- star rating background
- P4/G5 distribution
- development factory indicators

## Town Immersion Pipeline

Raw collection:

- landmarks
- food spots
- game day traditions
- rivalry terms
- memes
- weather/local culture
- campus identity

Filtering:

- remove offensive content
- remove one-off jokes
- remove outdated references
- remove personally identifying comments
- compress to high-signal tags

Output:

```ts
type TownFlavorProfile = {
  schoolId: string;
  city: string;
  cultureTags: string[];
  landmarks: FlavorItem[];
  foodCulture: FlavorItem[];
  gameDayIdentity: FlavorItem[];
  rivalryFlavor: FlavorItem[];
  localMemes: FlavorItem[];
  weatherNotes: FlavorItem[];
  confidence: number;
};
```

## ETL Scripts

Required:

```text
01_pull_cfbd_games.py
02_pull_cfbd_plays.py
03_pull_cfbd_rosters.py
04_pull_cfbd_recruiting.py
05_normalize_play_types.py
06_build_stat_targets.py
07_build_recruiting_targets.py
08_build_school_power_inputs.py
09_build_name_models.py
10_build_draft_targets.py
11_scrape_wikipedia_school_metadata.py
12_collect_town_flavor_candidates.py
13_filter_town_flavor.py
14_export_game_calibration_json.py
```

## Data Validation

Each processed dataset should validate:

- missing fields
- duplicate IDs
- impossible values
- year coverage
- source confidence
- outliers
- schema match

## Outputs

```text
game_data/calibration/stat_targets_current_era.json
game_data/calibration/play_outcome_targets.json
game_data/calibration/recruiting_targets.json
game_data/calibration/draft_targets.json
game_data/calibration/school_power_inputs.json
game_data/synthetic/name_model.json
game_data/real_private/schools.json
game_data/real_private/town_flavor.json
```

## Data Lab Integration

Data Lab compares sim output to calibration targets.

Reports:

- stat realism
- recruiting realism
- draft realism
- school power drift
- NIL market realism
- transfer realism
- play outcome realism

## Tests

Required:

- source registry validation
- raw-to-processed schema validation
- name model output valid
- stat target JSON valid
- school power input ranges valid
- play outcome distributions sum correctly
- calibration report can load all outputs

## Acceptance Criteria

Data pipeline is acceptable when:

- real data becomes aggregate calibration
- fictional mode can use targets
- private real-school mode can use school data
- raw source risks are tracked
- outputs are schema-validated
- Data Lab consumes calibration JSON
- sim can be compared against real distributions


<!-- FILE: 37_PROGRAM_DESK_AND_CONTINUE_GATE_IMPLEMENTATION_SPEC.md -->

# 37 — Program Desk and Continue Gate Implementation Spec

## North Star

The user should not manage the game through a passive email inbox.

The user should manage the program from a command center.

The Program Desk answers:

```text
What needs my attention?
What blocks advancing?
What changed?
What does my staff recommend?
What deadlines are coming?
What should I investigate?
```

The Continue Gate answers:

```text
Can time advance?
If not, what exactly must be fixed?
Can I quick-fix or delegate it?
```

## Core Concepts

```text
ProgramItem = any actionable, informational, or blocking item
Program Desk = daily hub
Continue Gate = advancement preflight resolver
Workspace = deep screen where work happens
```

## ProgramItem Types

```text
task
blocking_issue
alert
report
news
deadline
recommendation
watch_item
digest
```

## ProgramItem Schema

```ts
type ProgramItem = {
  id: string;
  type: ProgramItemType;
  category: ProgramCategory;
  severity: "critical" | "high" | "normal" | "low" | "flavor";
  status:
    | "new"
    | "unread"
    | "read"
    | "needs_decision"
    | "delegated"
    | "resolved"
    | "expired"
    | "archived";
  blocking: boolean;
  softBlock: boolean;
  createdAt: GameDate;
  dueAt?: GameDate;
  expiresAt?: GameDate;
  source: ProgramItemSource;
  affectedEntities: EntityRef[];
  summary: string;
  detail: string;
  actions: ProgramItemAction[];
  recommendedActionId?: string;
  delegationAllowed: boolean;
  autoResolveAllowed: boolean;
  consequencePreview: ConsequencePreview[];
  reasonCodes: ReasonCode[];
  duplicateKey?: string;
  groupKey?: string;
};
```

## Categories

- roster
- recruiting
- portal
- practice
- game_week
- staff
- finance
- nil
- compliance
- academics
- media
- world
- data_lab

## Program Desk Layout

Main sections:

1. Must Fix To Continue
2. Today's Decisions
3. Staff Briefing
4. Calendar / Deadlines
5. Watchlist
6. News / World
7. Delegated Items

## Program Desk Tabs

- Overview
- Tasks
- Reports
- Calendar
- News
- Watchlist
- Delegated
- Archive

## Must Fix To Continue

Hard blockers.

Examples:

- invalid depth chart
- no eligible QB
- game plan missing if required
- signing day unresolved
- NIL deal review requiring decision
- compliance issue
- roster invalid by ruleset
- save migration issue

## Soft Blockers

Can advance but create consequence.

Examples:

- practice plan not customized
- top recruit contact overdue
- player meeting delayed
- fatigue warning
- staff report unread
- booster request expiring

Soft blockers should show:

```text
Advance anyway with consequence
```

when allowed.

## Continue Gate

When user clicks Continue:

```text
run preflight checks
→ collect hard blockers
→ collect soft blockers
→ if no hard blockers and user accepts soft blockers, advance
→ if blockers exist, open Continue Gate panel
```

## Preflight Check Registry

```ts
type ContinuePreflightCheck = {
  id: string;
  category: ProgramCategory;
  run(world: GameWorld): ContinueCheckResult[];
};
```

Examples:

- checkDepthChartLegal
- checkEligiblePlayers
- checkPracticePlan
- checkGamePlan
- checkSigningDeadline
- checkRosterLimits
- checkComplianceReview
- checkUnresolvedRequiredMeetings
- checkPortalDeadline

## ContinueCheckResult

```ts
type ContinueCheckResult = {
  id: string;
  severity: "critical" | "high" | "normal" | "low";
  blocking: boolean;
  softBlock: boolean;
  summary: string;
  reasonCodes: ReasonCode[];
  affectedEntities: EntityRef[];
  quickFixes: ProgramItemAction[];
};
```

## Quick Fix Actions

Every blocker should attempt to provide:

- use staff recommendation
- auto-fill legal minimum
- delegate to responsible staff
- open relevant screen
- delay if allowed
- accept consequence if soft block

Example:

```text
Invalid Depth Chart
Quick Fix: Use OC Recommended Depth Chart
Open: Depth Chart
Delegate: Offensive Coordinator
```

## Delegation Policies

The user can configure:

- staff may auto-fix minor depth chart issues
- staff may auto-generate practice plan
- staff may not approve NIL deals above threshold
- user must approve recruit promises
- user must approve compliance issues
- staff may handle low-priority recruiting contacts

## Staff Briefing

Staff Briefing groups reports.

Examples:

- GM roster risk report
- Recruiting coordinator board update
- OC game prep note
- Strength coach fatigue report
- Academic advisor warning
- NIL liaison deal update

The briefing should reduce spam.

## Duplicate / Grouping Logic

Use groupKey and duplicateKey.

Examples:

Instead of five messages:

```text
WR unhappy
WR unhappy
WR unhappy
WR unhappy
WR unhappy
```

Group into:

```text
WR room morale slipping
```

## Watchlist

User can watch:

- recruits
- players
- staff
- NIL deals
- portal targets
- injuries
- rivals
- conference races
- records

Watchlist items generate higher visibility.

## Program Desk UI Requirements

- left nav section
- summary counts
- severity filters
- due date filters
- category filters
- right inspector
- quick action buttons
- consequence preview
- staff recommendation
- links to affected entities
- archive/delegate/resolve
- keyboard support

## Tests

Required:

- hard blocker prevents Continue
- soft blocker can be accepted
- quick fix resolves blocker
- delegate changes status
- duplicate items group
- expired item changes status
- ProgramItem saves/loads
- event action logs result
- user policy auto-resolves allowed item
- user policy does not auto-resolve forbidden item

## Acceptance Criteria

This system is acceptable when:

- Program Desk replaces passive inbox
- Continue Gate blocks invalid advancement
- quick fixes work
- delegation works
- staff briefing reduces spam
- daily tasks are triaged
- user can resolve blockers without hunting
- power users can navigate directly to workspaces


<!-- FILE: 38_ATTRIBUTE_TRAIT_CLUSTER_AND_SCOUTING_LANGUAGE_SPEC.md -->

# 38 — Attribute, Trait Cluster, and Scouting Language Spec

## North Star

The game should describe players like football people do.

Not just:

```text
Speed 16
Work Ethic 17
Hip Fluidity 6
```

But:

```text
Late-developing gym rat with strong study habits and real competitive fire, but stiff hips limit his change of direction.
```

The underlying truth is structured data.
The scouting language is derived from that data.
LLMs may rewrite grounded reports, but they cannot invent facts.

## Attribute Registry

Every attribute needs:

- id
- display name
- group
- valid range
- position relevance
- development category
- hidden/visible status
- scouting difficulty
- outcome effects
- trait cluster links

## Attribute Object

```ts
type AttributeDefinition = {
  id: string;
  displayName: string;
  group:
    | "physical"
    | "movement"
    | "technical"
    | "football_iq"
    | "mental"
    | "personality"
    | "durability"
    | "academic_life"
    | "market_brand";
  visibleByDefault: boolean;
  hidden: boolean;
  min: number;
  max: number;
  positionRelevance: Record<Position, number>;
  developmentCategory: string;
  scoutingDifficulty: number;
  outcomeEffects: string[];
};
```

## Required Attribute Groups

## Physical

- speed
- acceleration
- strength
- explosiveness
- stamina
- jumping
- frame
- flexibility
- durability

## Movement

- agility
- change of direction
- balance
- hip fluidity
- bend
- footwork
- lateral quickness

## Football IQ

- processing
- awareness
- anticipation
- play recognition
- assignment discipline
- communication
- situational awareness
- film study

## Mental

- composure
- pressure handling
- competitiveness
- consistency
- confidence
- aggression
- discipline
- resilience
- leadership
- teamwork

## Personality / Hidden

- work ethic
- coachability
- loyalty
- ambition
- ego
- money sensitivity
- transfer openness
- family influence
- social stability
- academic discipline
- practice effort
- big-game nerve

## Market / Brand

- brand appeal
- media comfort
- social profile
- local marketability
- NIL ambition

## Trait Cluster Categories

- development curve
- work/preparation
- competitive/mental
- body/movement
- football IQ
- personality/retention
- role/scheme
- risk

## Trait Cluster Object

```ts
type TraitClusterDefinition = {
  id: string;
  label: string;
  category: string;
  visibility: "public" | "scouted" | "staff_opinion" | "hidden" | "debug";
  positive: boolean | "mixed";
  derivationRules: TraitRule[];
  evidenceTemplates: string[];
  gameplayEffects: string[];
  positionApplicability: Record<Position, number>;
};
```

## Trait Rule

```ts
type TraitRule = {
  attributeId: string;
  operator: ">=" | "<=" | "between";
  value: number | [number, number];
  weight: number;
};
```

## Required Trait Labels

## Development

- Early Bloomer
- Late Developer
- Late Bloomer
- Raw Tools Prospect
- Physically Maxed
- Boom/Bust
- High Floor
- High Ceiling
- Multi-Year Project
- Ready-Made Contributor

## Work/Preparation

- Gym Rat
- Film Junkie
- Studious
- Practice Player
- Self-Starter
- Needs Pushing
- Coasts on Talent
- Inconsistent Worker

## Competitive/Mental

- Gamer
- Big-Game Player
- Quiet Competitor
- Alpha
- Steady Hand
- Confidence Player
- Volatile Competitor
- Clutch
- Shrinks Under Pressure

## Body/Movement

- Long Frame
- Compact Build
- Twitchy
- Linear Athlete
- Fluid Mover
- Stiff-Hipped
- Bad Hips
- Heavy Feet
- Natural Bender
- Frame to Add Weight
- Maxed-Out Frame

## Football IQ

- Quick Processor
- Slow Processor
- Assignment Sound
- Instinctive
- Freelancer
- Overthinker
- Playbook Sponge
- Mental Bust Risk

## Personality/Retention

- Money-Motivated
- Development-Focused
- Homebody
- Location-Sensitive
- Playing-Time Driven
- Relationship Recruit
- Brand Builder
- NFL-Or-Bust
- Loyal Program Guy
- Portal Risk
- High Maintenance
- Low Drama

## Role/Scheme

- Air Raid Fit
- RPO Fit
- Power Run Fit
- Zone Run Fit
- Option Fit
- Nickel Defender
- Box Safety
- Space Backer
- Edge Projection
- Slot Weapon
- Special Teams Floor

## Risk

- Academic Risk
- Injury Risk
- Transfer Risk
- Bust Risk
- High Variance
- Low Certainty Evaluation
- Scheme Risk
- Position Projection Risk
- Medical Red Flag

## Example Derivation: Bad Hips

```text
hipFluidity <= 6
changeOfDirection <= 8
lateralQuickness <= 8
position applicability:
  CB high
  S high
  LB medium
  WR medium
  RB medium
  OL low
  DL low/medium
```

Effects:

- worse recovery in man coverage
- worse route cuts
- worse lateral pursuit
- worse space tackling

## Example Derivation: Gym Rat

```text
workEthic >= 16
practiceEffort >= 15
discipline >= 11
strength/conditioning growth history positive
```

Effects:

- responds better to strength practice
- lower practice-effort event risk
- better offseason physical development

## Example Derivation: Money-Motivated

```text
money preference >= 0.75
NIL sensitivity high
brand exposure preference medium/high
```

Effects:

- NIL matters more in recruiting
- transfer risk rises if NIL shortfall
- may respond to booster/NIL pitch

## Scouting Confidence

Trait labels should have confidence.

```ts
type TraitClusterInstance = {
  traitId: string;
  confidence: number;
  visibility: string;
  evidence: string[];
  staffSourceId?: StaffId;
  lastUpdated: GameDate;
};
```

Confidence depends on:

- scouting depth
- staff evaluation skill
- staff bias
- time observed
- position familiarity
- report quality
- prospect/player consistency

## Staff Bias

Staff may disagree.

Example:

```text
WR Coach: “Raw but explosive.”
Recruiting Director: “High variance.”
Strength Coach: “Frame can add weight.”
```

This should be supported.

## Scouting Report Payload

LLM payloads must be grounded.

```ts
type ScoutingReportPayload = {
  entityId: string;
  reportType: string;
  visibleFacts: Record<string, unknown>;
  traitLabels: TraitClusterInstance[];
  scoutedRanges: ScoutedRatings;
  staffOpinions: StaffOpinion[];
  forbiddenClaims: string[];
  tone: string;
};
```

## Fallback Report Templates

No LLM required.

Template sections:

- Summary
- What We Like
- What Worries Us
- Scheme Fit
- Development Plan
- Risk
- Recommendation

## LLM Rules

LLM may:

- vary wording
- write staff voice
- summarize evidence
- add immersion tone

LLM may not:

- invent injuries
- invent NIL amounts
- invent commitments
- invent violations
- invent ratings
- invent hidden traits not in payload

## Clickability

Trait labels must be clickable.

Clicking shows:

- definition
- evidence
- confidence
- staff source
- similar past players
- gameplay implications
- recommended actions

## Tests

Required:

- Bad Hips derives from correct attributes
- Gym Rat derives from work traits
- Money-Motivated derives from preferences
- confidence changes with scouting depth
- staff bias changes label confidence/opinion
- hidden labels not shown publicly
- LLM payload contains forbidden claims
- fallback report works offline
- trait label effects appear in matchup/recruiting/dev systems

## Acceptance Criteria

This system is acceptable when:

- attributes are defined centrally
- labels derive from data
- labels include evidence/confidence
- scouting reports are grounded
- staff can disagree
- labels affect gameplay
- labels are clickable
- LLM cannot invent facts


<!-- FILE: 39_AWARDS_RECORDS_HISTORY_AND_MEDIA_NARRATIVE_SPEC.md -->

# 39 — Awards, Records, History, and Media Narrative Spec

## North Star

Stats become meaningful when the world remembers them.

This system turns game results and player careers into:

- awards
- records
- rivalries
- school history
- dynasty narratives
- media stories
- recruiting reputation
- draft reputation
- coach legacy

The game should feel like it has memory.

## Core Loop

```text
game stats
→ weekly leaders
→ media narratives
→ awards watch
→ season awards
→ records
→ draft/recruiting reputation
→ school/coach/player legacy
```

## Award Types

## Weekly

- National Player of the Week
- Conference Player of the Week
- Freshman of the Week
- Defensive Player of the Week
- Special Teams Player of the Week

## Season

- National Player of the Year
- QB/RB/WR/TE/OL awards
- Defensive awards
- Freshman awards
- Coach of the Year
- Coordinator awards
- Conference awards
- All-Conference
- All-American

## Award Inputs

- stats
- opponent quality
- team success
- conference strength
- position value
- narrative momentum
- media exposure
- big games
- rivalry games
- postseason performance
- previous reputation

Do not use stats alone.

## Award Watch Lists

During season:

- preseason watch
- midseason watch
- late-season finalists
- winner

Watch list affects:

- NIL value
- media attention
- recruit interest
- player morale
- draft stock

## Records

Record scopes:

- school game
- school season
- school career
- conference game
- conference season
- conference career
- national game
- national season
- national career

Record types:

- passing yards
- passing TDs
- rushing yards
- rushing TDs
- receiving yards
- receptions
- sacks
- interceptions
- tackles
- points
- team total yards
- team points
- wins
- streaks
- draft picks

## Record Object

```ts
type RecordEntry = {
  id: string;
  scope: RecordScope;
  statId: string;
  value: number;
  holderType: "player" | "team" | "coach";
  holderId: string;
  schoolId?: string;
  conferenceId?: string;
  season: number;
  gameId?: string;
  opponentId?: string;
  date: GameDate;
  contextTags: string[];
};
```

## History Entities

Track:

- player career history
- coach career history
- school season history
- rivalry history
- conference history
- playoff history
- draft history
- award history
- record history

## School History

Each school stores:

- season records
- conference titles
- playoff appearances
- bowl results
- national titles
- rivalry records
- draft picks
- award winners
- coach tenures
- recruiting class rankings
- facility milestones
- NIL era milestones

## Coach Legacy

Coach legacy includes:

- record
- titles
- rivalry record
- player development
- draft picks
- recruiting success
- staff tree
- program turnarounds
- scandals/compliance, if any
- job movement
- reputation labels

## Dynasty Detection

A dynasty is detected from:

- multi-year win rate
- titles
- playoff appearances
- recruiting dominance
- draft output
- staff tree
- conference dominance
- national perception

Dynasty should be causal, not label-based.

## Collapse Detection

Collapse from:

- win decline
- recruiting decline
- transfer losses
- staff losses
- NIL weakness
- booster conflict
- facility stagnation
- coach instability
- team vibe issues

Media should notice collapses.

## Media Narrative System

Narratives are structured, then optionally written by LLM.

Narrative types:

- breakout player
- hot seat
- dynasty rising
- dynasty fading
- recruiting coup
- transfer drama
- NIL controversy
- rivalry hype
- upset aftermath
- playoff race
- award watch
- draft buzz
- coach carousel
- school turnaround

## Narrative Object

```ts
type MediaNarrative = {
  id: string;
  type: string;
  subject: EntityRef;
  season: number;
  week: string;
  intensity: number;
  evidence: ReasonCode[];
  generatedHeadline?: string;
  generatedBody?: string;
  expiresAt?: GameDate;
  affects: NarrativeEffects;
};
```

## Narrative Effects

Narratives may affect:

- morale
- NIL value
- recruiting perception
- fan sentiment
- booster confidence
- staff pressure
- player draft buzz

Effects should be subtle and reason-coded.

## LLM Narrative Rules

LLM can write:

- headline
- article summary
- press blurb
- rivalry framing
- award-watch text

LLM cannot invent:

- stats
- quotes
- injuries
- arrests
- violations
- commitments
- NIL amounts

Payload must include all facts.

## Media Frequency

Avoid spam.

Use:

- weekly digest
- major story alerts
- watchlist boosts
- rivalry/postseason packages
- milestone alerts

Do not generate a story for every stat line.

## Awards UI

Tabs:

- Watch Lists
- Weekly Awards
- Conference Awards
- National Awards
- All-Americans
- History

## Records UI

Tabs:

- School Records
- Conference Records
- National Records
- Player Career
- Team Season
- Rivalry Records

## History UI

Tabs:

- Program Timeline
- Seasons
- Coaches
- Players
- Draft
- Awards
- Rivalries
- Facilities
- Recruiting Classes

## Events

- player added to award watch
- record broken
- coach hot seat
- rivalry streak extended
- dynasty narrative begins
- dynasty fading
- draft buzz rising
- school produces first first-rounder in years
- player wins national award

## Tests

Required:

- award watch ranking uses stats and team success
- record updates after game
- record does not update on worse value
- school history stores season result
- coach history updates job record
- dynasty detection triggers
- collapse detection triggers
- LLM payload is grounded
- narrative spam suppression works
- save/load preserves history

## Long-Run Validation

Track:

- award distribution by position
- award distribution by team strength
- records frequency
- dynasty count
- collapse count
- media story count
- draft/narrative correlation
- recruiting impact of awards/draft

## Acceptance Criteria

This system is acceptable when:

- stats feed awards
- awards feed NIL/draft/recruiting
- records persist
- school history persists
- coaches have careers
- dynasties are detected causally
- narratives are grounded
- media adds immersion without spam


<!-- FILE: 40_NEXT_CORE_BUILD_PACKETS_AND_PROMPTS.md -->

# 40 — Next Core Build Packets and Ready Prompts

## Purpose

This file turns specs 28–39 into implementation packets.

Use these after the Stats Engine pack is accepted.

---

# PLAYGEN Packets

## PLAYGEN-1 — Game State, Clock, Field, Drive Model

Deliver:

- GameState
- GameClock
- FieldPosition/yardsToGoal
- Drive
- game state transition helpers
- tests

Acceptance:

- valid down/distance
- clock transitions
- field position transitions
- drive start/end
- scoring updates

## PLAYGEN-2 — Situation Classifier

Deliver:

- down/distance bucket
- field zone
- clock state
- score state
- game phase
- tests

Acceptance:

- situations classify correctly
- reason codes exist

## PLAYGEN-3 — Offensive Play Selector

Deliver:

- play family selection
- game plan input
- scheme tendency input
- down/distance logic
- clock/score logic
- tests

Acceptance:

- 3rd and long produces more passes
- goal line produces appropriate calls
- trailing late changes aggressiveness

## PLAYGEN-4 — Defensive Response Selector

Deliver:

- front/coverage/pressure response
- defensive scheme input
- situation logic
- tests

Acceptance:

- loaded box vs short yardage
- prevent late
- blitz profile varies by coach/scheme

## PLAYGEN-5 — Basic Outcome Resolver

Deliver:

- run outcome
- pass outcome
- sack
- turnover
- penalty hook
- structured PlayEvent output
- tests

Acceptance:

- valid PlayEvents
- seed deterministic
- no box score invention

## PLAYGEN-6 — Stats Engine Integration

Deliver:

- PlayEvents feed accumulator
- box score from stats
- game simulation loop
- reconciliation
- tests

Acceptance:

- simulated game creates plays
- final score equals scoring plays
- box score reconciles

---

# MATCHUP Packets

## MATCHUP-1 — Attribute Registry

Deliver:

- attribute definitions
- groups
- position relevance
- tests

## MATCHUP-2 — Matchup Score Utilities

Deliver:

- normalize ratings
- weighted matchup
- fatigue/morale/weather modifiers
- reason codes
- tests

## MATCHUP-3 — Passing Matchups

Deliver:

- pass protection vs rush
- separation vs coverage
- QB decision/accuracy
- catch/YAC
- tests

## MATCHUP-4 — Rushing Matchups

Deliver:

- OL/front
- RB vision/finish
- tackling
- yards bucket
- tests

## MATCHUP-5 — Special Teams Matchups

Deliver:

- kicking
- punting
- returns
- weather/pressure
- tests

---

# DEVELOPMENT Packets

## DEV-1 — Development Profile and Tick

Deliver:

- development profile
- weekly tick
- offseason tick
- tests

## DEV-2 — Practice Time Unit System

Deliver:

- practice plan
- ruleset cap
- category allocation
- intensity
- tests

## DEV-3 — Team Vibe

Deliver:

- team vibe object
- component calculation
- effects
- tests

## DEV-4 — Pep Talks and Meetings

Deliver:

- meeting object
- tone/reaction model
- morale/vibe effects
- tests

## DEV-5 — Position Change System

Deliver:

- position change recommendation
- training progress
- success/failure
- tests

---

# RECRUITING Packets

## REC-1 — Prospect Lifecycle Generator

Deliver:

- FR/SO/JR/SR pools
- tiered detail
- star distributions
- tests

## REC-2 — Prospect Evolution

Deliver:

- high school development
- rankings movement
- late bloomer/stagnation/regression
- tests

## REC-3 — Scouting Confidence

Deliver:

- scouted ranges
- staff evaluation
- confidence changes
- tests

## REC-4 — Interest Engine

Deliver:

- preference-weighted interest
- reason codes
- tests

## REC-5 — Visits, Pitches, Promises

Deliver:

- visit outcomes
- pitch fit
- promises
- tests

## REC-6 — Commit, Decommit, Sign

Deliver:

- commitment states
- flip risk
- signing
- prospect-to-player conversion
- tests

## REC-7 — AI Recruiting

Deliver:

- AI needs map
- AI board
- AI offers/visits
- AI signing class
- tests

---

# AI School Packets

## AISCHOOL-1 — AI Program Profile

## AISCHOOL-2 — Roster Needs AI

## AISCHOOL-3 — AI Depth Chart

## AISCHOOL-4 — AI Portal Use

## AISCHOOL-5 — AI Staff Decisions

## AISCHOOL-6 — AI Program Trajectory / Identity

---

# NIL Packets

## NIL-1 — NIL Market Value

## NIL-2 — NIL Deal Object

## NIL-3 — Clearinghouse Review

## NIL-4 — Booster Segments

## NIL-5 — Locker Room Economics

## NIL-6 — Direct Benefits

---

# Portal Packets

## PORTAL-1 — Transfer Risk

## PORTAL-2 — Portal Window

## PORTAL-3 — Retention Meetings

## PORTAL-4 — Portal Search/Recruiting

## PORTAL-5 — AI Portal Behavior

---

# Draft Packets

## DRAFT-1 — Draft Candidate Model

## DRAFT-2 — Draft Grade

## DRAFT-3 — Declaration Logic

## DRAFT-4 — Draft Results

## DRAFT-5 — Pipeline Feedback

## DRAFT-6 — Draft Validation

---

# Data Pipeline Packets

## DATA-1 — Source Registry

## DATA-2 — CFBD Games/Plays Pull

## DATA-3 — Stat Target Builder

## DATA-4 — Recruiting Target Builder

## DATA-5 — School Power Input Builder

## DATA-6 — Name Model Builder

## DATA-7 — Town Flavor Pipeline

## DATA-8 — Data Lab Target Loader

---

# Program Desk Packets

## DESK-1 — ProgramItem Model

## DESK-2 — Continue Preflight Registry

## DESK-3 — Continue Gate UI

## DESK-4 — Program Desk Overview

## DESK-5 — Staff Briefing Grouping

## DESK-6 — Delegation Policies

---

# Trait/Scouting Packets

## TRAIT-1 — Attribute Registry

## TRAIT-2 — Trait Cluster Definitions

## TRAIT-3 — Trait Derivation Engine

## TRAIT-4 — Scouting Report Payloads

## TRAIT-5 — Fallback Report Templates

## TRAIT-6 — LLM Provider Integration

---

# Awards/History Packets

## HIST-1 — Record Engine

## HIST-2 — Award Watch Engine

## HIST-3 — Season Awards

## HIST-4 — Coach/School History

## HIST-5 — Dynasty/Collapse Detection

## HIST-6 — Media Narrative Payloads

---

# Ready Prompt: PLAYGEN-1

```text
Implement PLAYGEN-1 — Game State, Clock, Field, and Drive Model.

Goal:
Create the foundational game state objects and transitions for structured play generation.

Deliver:
- GameState type
- GameClock type
- FieldPosition/yardsToGoal helpers
- Drive type
- startDrive/endDrive helpers
- advanceClock helper
- updateDownDistance helper
- tests

Hard rules:
- no stats credited here
- no text play-by-play here
- no UI code
- deterministic-friendly
- invalid down/distance rejected
- possession and defense cannot be same team

Acceptance:
- clock transitions tested
- field position transitions tested
- first down resets down/distance
- failed third down creates fourth down
- failed fourth down can create turnover on downs
- TD updates score through structured scoring state
```

# Ready Prompt: MATCHUP-2

```text
Implement MATCHUP-2 — Matchup Score Utilities.

Goal:
Create reusable utilities for turning 1-20 attributes into probability modifiers with reason codes.

Deliver:
- rating normalization
- weighted matchup score
- fatigue modifier
- morale/team vibe modifier
- weather modifier shell
- reason code builder
- tests

Hard rules:
- no outcome decisions yet
- no UI code
- no Math.random
- every utility returns reason codes

Acceptance:
- higher rating improves matchup score
- fatigue lowers score
- strong advantage creates positive reason code
- same inputs produce same outputs
```

# Ready Prompt: REC-4

```text
Implement REC-4 — Recruiting Interest Engine.

Goal:
Calculate recruit interest in each school using weighted preferences and school/recruit context.

Inputs:
- recruit preferences
- school structural power
- NIL alignment
- playing time opportunity
- development reputation
- coach relationship
- location fit
- scheme fit
- academics
- winning
- brand exposure
- family influence
- competitor pressure

Deliver:
- interest formula
- reason codes
- normalized score
- tests

Hard rules:
- NIL cannot be the only factor
- different recruits value different things
- reason codes required
- no UI code

Acceptance:
- money-focused recruit responds more to NIL
- development-focused recruit responds more to draft/development reputation
- location-focused recruit responds more to distance/home
- crowded depth chart lowers playing-time-focused recruit interest
```

# Ready Prompt: NIL-3

```text
Implement NIL-3 — NIL Clearinghouse Review.

Goal:
Review proposed NIL deals for realism and risk.

Deliver:
- market value estimate input
- risk score
- review status
- reason codes
- tests

Statuses:
- Approved
- ApprovedWithScrutiny
- DelayedReview
- Flagged
- Denied

Hard rules:
- high NIL can be approved if justified
- absurd low-profile deal should be flagged or denied
- denial should be configurable/rare
- reason codes required

Acceptance:
- normal deal approved
- high but plausible star QB deal scrutinized
- absurd low-profile deal flagged
- timing/donor risk increases risk score
```
