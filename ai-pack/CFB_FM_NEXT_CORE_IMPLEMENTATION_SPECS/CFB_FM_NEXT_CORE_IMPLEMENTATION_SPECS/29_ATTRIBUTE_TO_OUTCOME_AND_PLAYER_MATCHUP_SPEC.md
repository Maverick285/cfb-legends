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
