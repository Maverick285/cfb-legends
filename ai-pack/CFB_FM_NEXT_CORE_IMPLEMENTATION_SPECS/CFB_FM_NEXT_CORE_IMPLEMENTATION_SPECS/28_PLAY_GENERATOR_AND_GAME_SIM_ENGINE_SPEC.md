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
