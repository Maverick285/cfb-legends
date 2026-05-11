# Packets 11–30 — From Shell to Playable Alpha

These packets move from foundation to the first playable version.

---

# Packet 4.2 — Event Schema and Inbox v1

## Goal

Create the event-driven game loop.

## Deliverables

- Event type
- Inbox state
- event priorities
- blocking flag
- expiration
- archive/dismiss/defer
- tests

## Acceptance

- events are data-driven
- blocking events prevent Continue
- inbox displays real events

---

# Packet 4.3 — Event Actions and Event Log

## Goal

Make inbox actions affect game state.

## Deliverables

- action handler
- consequences
- event log entries
- before/after state references
- tests

## Acceptance

- event actions change state
- event actions are logged
- follow-up events can be created

---

# Packet 5.1 — Dense Table Framework

## Goal

Build reusable FM-style tables.

## Deliverables

- sorting
- filtering
- show/hide columns
- saved views
- row click
- compare selection
- data-testid hooks

## Acceptance

- Roster, Recruiting, Staff can reuse it
- no one-off shallow card grids

---

# Packet 6.1 — Roster Table v1

## Goal

Display players as dense sortable data.

## Deliverables

- roster route
- table columns
- filters
- row click to profile shell
- saved views

## Required Columns

- name
- position
- class
- height
- weight
- current role
- morale
- eligibility
- transfer risk
- key attributes
- NIL expectation
- development trend

## Acceptance

- every player row is clickable
- table supports filtering
- no UI-only roster state

---

# Packet 6.2 — Player Profile v1

## Goal

Make player profiles rich and clickable.

## Tabs

- Overview
- Attributes
- Development
- Eligibility
- Morale
- NIL
- Reports
- History

## Acceptance

- visible vs hidden traits respected
- profile uses real entity
- links back to school/position/staff

---

# Packet 7.1 — Prospect Generator v1

## Goal

Generate realistic recruiting classes.

## Deliverables

- national talent counts
- star distribution
- multi-year pools
- sophomore/junior/senior lifecycle
- state/region density
- tests

## Calibration Target

Use configurable defaults:

```text
five-stars: about 32
four-stars: about 300
three-stars: about 1500
```

Use tiers so not every background player needs full detail.

## Acceptance

- generated class distribution matches config
- players develop or stagnate before signing
- hidden attributes exist

---

# Packet 7.2 — Prospect Evolution Tick

## Goal

Prospects change over high school years.

## Deliverables

- yearly progression
- development/stagnation/regression
- high school transfer rare event
- ranking movement
- tests

## Acceptance

- sophomores are not final products
- late bloomers exist
- busts exist
- scouting confidence can lag reality

---

# Packet 7.3 — Recruiting Board v1

## Goal

Build FM-style recruiting board.

## Deliverables

- dense table
- add/remove targets
- priority
- interest
- staff owner
- scouted confidence
- filters
- saved views

## Acceptance

- board feels like a transfer shortlist
- every recruit is clickable
- rows show uncertainty

---

# Packet 7.4 — Recruiting Interest Engine v1

## Goal

Make recruit decisions causal.

## Inputs

- money preference
- pro development preference
- location preference
- playing time
- winning
- academics
- coach relationship
- family influence
- brand exposure
- scheme fit
- NIL market
- school structural power

## Acceptance

- recruit interest changes for explainable reasons
- schools with advantages are not permanently magical
- different recruits value different things

---

# Packet 7.5 — Scouting and Trait Clusters v1

## Goal

Create human-readable scouting labels.

## Deliverables

- trait cluster schema
- derivation engine
- confidence
- evidence
- staff bias

## Example Labels

- Late Developer
- Gym Rat
- Studious
- Gamer
- Bad Hips
- Money-Motivated
- Development-Focused
- Portal Risk

## Acceptance

- labels derive from structured data
- LLM not required
- labels are clickable later

---

# Packet 8.1 — Practice Strategy v1

## Goal

Create practice as an active coaching system.

## Deliverables

- weekly practice time units
- NCAA/ruleset time cap
- practice categories
- intensity
- fatigue/readiness/morale effects
- tests

## Categories

- fundamentals
- strength
- film
- position technique
- scheme install
- opponent prep
- special teams
- recovery
- leadership/culture

## Acceptance

- practice affects development
- practice affects game readiness
- practice affects fatigue and morale

---

# Packet 8.2 — Team Vibe and Pep Talk v1

## Goal

Create team culture signal.

## Deliverables

- team vibe metric
- components
- pep talk action
- player reaction model
- tests

## Components

- morale
- leadership
- coach trust
- winning momentum
- conflict
- fatigue
- broken promises

## Acceptance

- pep talks can help or hurt
- player personality affects reaction
- team vibe affects transfer risk/readiness

---

# Packet 9.1 — Level 1 Game Sim and Box Score

## Goal

Simulate games without visuals.

## Deliverables

- team rating aggregation
- score generation
- box score
- basic player stats
- home field
- randomness
- tests

## Acceptance

- same seed same result
- better teams usually win
- upsets possible
- stats plausible

---

# Packet 9.2 — Play-by-Play Event Schema

## Goal

Prepare text play-by-play.

## Deliverables

- play event type
- down/distance
- clock
- field position
- play type
- result
- involved players
- deterministic generation

## Acceptance

- games can output structured play events
- text can be generated by template or LLM later

---

# Packet 10.1 — NIL and Roster Economics v1

## Goal

Move beyond scholarship-centric roster logic.

## Deliverables

- roster spot
- scholarship status
- NIL expectation
- direct benefit allocation
- walk-on with NIL support
- tests

## Acceptance

- scholarship is not the only roster currency
- NIL affects recruiting/retention
- walk-ons can have NIL value

---

# Packet 10.2 — NIL Clearinghouse v1

## Goal

Prevent crazy deal realism breaks.

## Deliverables

- market value estimate
- deal review status
- risk score
- approval/delay/flag/deny
- tests

## Inputs

- player profile
- position
- school market
- donor risk
- comparable deals
- timing
- amount

## Acceptance

- absurd deals are flagged
- flagged does not always mean punished
- clearinghouse creates friction

---

# Packet 11.1 — Local Narrative Service Interface

## Goal

Add LLM-ready architecture without dependency.

## Deliverables

- NarrativeService interface
- MockNarrativeService
- payload builder
- fallback templates
- tests

## Acceptance

- game works with no LLM
- generated text is grounded
- LLM cannot invent facts

---

# Packet 11.2 — Asset Service Interface

## Goal

Prepare portrait/image generation pipeline.

## Deliverables

- AssetService interface
- MockAssetService
- asset metadata
- queue placeholder
- lock/regenerate flags

## Acceptance

- game can store asset references
- no direct dependency on ComfyUI yet
- missing assets show fallback

---

# Packet 12.1 — Headless Season Runner

## Goal

Enable sim testing.

## Deliverables

- CLI/headless runner
- one-season sim
- export summary
- invariant checks

## Acceptance

- can run without UI
- outputs JSON/CSV summary
- detects impossible states

---

# Packet 12.2 — Data Lab Shell

## Goal

Expose sandbox/testing tools.

## Deliverables

- Data Lab route
- run sim button
- seed input
- season count
- export summary
- basic charts/table

## Acceptance

- user can test sim from UI
- sandbox supports tuning

---

# Packet 13.1 — Custom School Creator v1

## Goal

Let user create a school.

## Deliverables

- school creator form
- city/state
- mascot
- colors
- conference
- structural power sliders
- stadium/facility shell
- save/load

## Acceptance

- created school enters world
- uses same systems as generated schools

---

# Packet 13.2 — Custom Conference Creator v1

## Goal

Let user create conferences.

## Deliverables

- create conference
- add/remove schools
- divisions/pods placeholder
- revenue/prestige settings
- scheduling settings

## Acceptance

- custom conference affects schedule and prestige

---

# Packet 14.1 — LLM Scouting Report v1

## Goal

Generate natural language scouting from grounded facts.

## Deliverables

- local/openAI-compatible provider shell
- prompt template
- forbidden claims validator
- fallback
- cache

## Acceptance

- reports use structured payload only
- no hallucinated facts are accepted
- app works offline

---

# Packet 15.1 — Portrait Generation Hook v1

## Goal

Connect asset service to generated portraits.

## Deliverables

- portrait prompt builder
- generated asset metadata
- queue job
- regenerate/lock UI
- fallback image

## Acceptance

- faces are saved assets
- portraits do not block gameplay
