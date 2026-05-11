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
