

<!-- FILE: 00_START_HERE.md -->

# CFB-FM Build Superpack — Start Here

## Purpose

This pack is the practical handoff from “giant vision” to “AI can actually build it.”

The project target is a private, desktop-first, Football Manager-style college football management simulator with:

- dense clickable UI
- persistent world state
- deterministic simulation
- real-school/private mode support
- fictional/custom mode support
- multi-year recruiting
- NIL-era roster economics
- hidden traits and scouting uncertainty
- play-by-play first, no visual sim at launch
- LLM-assisted storytelling
- AI-generated portraits and graphics
- sandbox tools for tuning the sim
- long-term dynasty and career modes

The game is not a lightweight dashboard. It is a living college football universe.

## How To Use This Pack

Do not give the coder AI every document at once.

Use the packet system.

Each AI coding session should receive:

1. `01_MASTER_BUILD_PROMPT.md`
2. `02_ENGINE_ARCHITECTURE_SPEC.md`
3. `03_AI_CODING_PROTOCOL.md`
4. `04_REPO_STRUCTURE.md`
5. the specific packet from `05_FIRST_10_PACKETS.md` or `06_PACKETS_11_30.md`
6. current project file tree
7. current `PROJECT_STATUS.md`
8. current test output

## Hard Build Rule

A feature is not real until it has:

- data model
- simulation logic
- UI hook or screen
- persistence
- tests
- event/log integration where relevant
- acceptance criteria met

No UI-only fake state.

## Recommended First Move

Start with:

```text
Packet 0.1 — Repository Skeleton
```

Then go in order.

Do not jump to recruiting UI before persistence, deterministic RNG, world state, and Continue loop exist.


<!-- FILE: 01_MASTER_BUILD_PROMPT.md -->

# Master Build Prompt

Use this at the beginning of every AI coding session.

```text
You are building a private desktop college football management simulation inspired by the depth, density, and clickable workflow of Football Manager.

This is not a graphics-first game. It is a deterministic, persistent, menu-heavy simulation platform.

The core fantasy:
The user runs a college football program over many years, managing recruiting, player development, staff, NIL-era roster economics, practice, culture, booster money, facilities, tactics, game planning, play-by-play results, conferences, history, and dynasty/career progression.

Design target:
- FM-like clickable UI
- dense sortable/filterable tables
- persistent sidebar
- Inbox/Continue loop
- staff reports
- scouting uncertainty
- hidden traits
- long-term development
- custom conferences/schools
- sandbox and Data Lab
- play-by-play first, no visual sim required at launch

Architecture target:
- Tauri + React + TypeScript desktop app
- SQLite save/world database
- JSON rules/config
- deterministic simulation core
- AI service layer for LLM text and generated graphics
- AI never controls truth; AI only writes flavor or produces assets

Non-negotiables:
- no UI-only game state
- deterministic seeds
- save/load compatibility
- event/action log
- headless simulation ability
- tests for every meaningful system
- dense UI, not dashboard cards
- every meaningful entity should be clickable
- configurable rules, not hardcoded NCAA assumptions
- simulation works without LLM/image services

When implementing a packet:
1. Read the packet goal.
2. Keep changes focused.
3. Do not rewrite unrelated architecture.
4. Add or update schemas.
5. Add simulation logic.
6. Add UI only when requested.
7. Add tests.
8. Update PROJECT_STATUS.md.
9. Update NEXT_PACKET.md.
10. Explain any tradeoffs.
```


<!-- FILE: 02_ENGINE_ARCHITECTURE_SPEC.md -->

# Engine and Architecture Spec

## Engine Decision

Use:

```text
Tauri + React + TypeScript + SQLite
```

This is the correct architecture because the game is menu-heavy, table-heavy, data-heavy, and simulation-first.

Do not start with Unity, Unreal, or Godot.

Those engines are useful for visual games. This project needs a desktop application shell, a real database, dense UI, and deterministic simulation.

## Layer Diagram

```text
React UI
  ↓
Client State Store
  ↓
Application Services
  ↓
Simulation Core
  ↓
Persistence Layer
  ↓
SQLite + JSON Configs
  ↓
Optional Local AI Services
```

## Recommended Tech

### Desktop

```text
Tauri 2
```

### Frontend

```text
React
TypeScript
Tailwind or equivalent
TanStack Table
Zustand or Redux Toolkit
React Router
```

### Data

```text
SQLite
Drizzle ORM or direct SQL wrapper
JSON rules/config files
```

### Testing

```text
Vitest
Playwright
Headless sim runner
Scenario test runner
```

### AI Services

```text
Narrative service: local OpenAI-compatible LLM endpoint
Asset service: ComfyUI wrapper or equivalent image generation backend
```

## Folder Structure

```text
/src
  /app
  /ui
  /routes
  /components
  /tables
  /profiles
  /sim
  /domain
  /events
  /data
  /services
  /services/narrative
  /services/assets
  /testing
  /utils

/config
  /rulesets
  /balance
  /schemas

/assets
  /generated
  /portraits
  /logos
  /uniforms
  /stadiums

/docs
/tests
/scripts
/sim_runs
/qa_reports
```

## Simulation Truth Rule

The simulation core owns all truth.

The LLM may write:

- scouting prose
- media blurbs
- staff voice
- play-by-play wording
- press questions
- town immersion text

The LLM may not decide:

- ratings
- injuries
- commits
- transfers
- NIL approval
- money
- game outcomes
- discipline events
- eligibility

## AI Service Rule

The game should run completely without AI services.

If AI is unavailable:

- use deterministic templates
- use silhouette portraits
- queue asset jobs
- never block Continue
- never corrupt saves

## Save/Load Rule

All stateful objects must be serializable and versioned.

Every schema change must include:

- migration note
- tests
- save/load round trip
- version bump if necessary

## Headless Rule

Every major system must be runnable without the UI.

Required commands eventually:

```bash
npm run sim -- --seasons 1 --seed 123
npm run sim -- --seasons 20 --seed 123
npm run test:scenario
npm run test:invariants
```


<!-- FILE: 03_AI_CODING_PROTOCOL.md -->

# AI Coding Protocol

## Why This Exists

AI will happily build shiny screens while hiding state in React components. That will kill this project.

This protocol forces the AI to build real systems.

## Every Packet Must Include

1. implementation summary
2. files changed
3. data model changes
4. simulation logic changes
5. persistence changes
6. UI changes, if applicable
7. tests added
8. acceptance checklist
9. known limitations
10. next packet recommendation

## AI Must Not

- hardcode rules that belong in config
- hide game state in UI components
- generate random results without seeded RNG
- use LLM output as game truth
- skip tests
- create placeholder-only UI
- rewrite unrelated architecture
- create facts that cannot be saved
- break headless simulation
- silently ignore invalid data

## Standard Work Packet Prompt

```text
Implement the following CFB-FM work packet.

Read:
- master build prompt
- engine architecture spec
- current PROJECT_STATUS.md
- current file tree
- current packet

Rules:
- Keep scope limited to this packet.
- Add tests.
- Update docs.
- Do not create UI-only game state.
- Use deterministic seeded random where randomness is needed.
- Persist state if the feature is stateful.
- Do not let AI/LLM decide simulation facts.
- Do not hardcode rules that belong in config.
- If a requirement cannot be completed, state exactly what remains.

Return:
1. summary
2. files changed
3. tests added
4. acceptance checklist
5. next packet handoff
```

## QA Prompt After Every Packet

```text
Review the implementation against the packet acceptance criteria.

Find:
- missing requirements
- placeholder logic
- UI-only state
- unseeded randomness
- missing persistence
- missing tests
- broken architecture
- save/load risk
- shallow FM-like UI issues

Return:
- pass/fail
- blockers
- fixes
- regression tests to add
```

## Required Project Memory Files

The repo must maintain:

```text
PROJECT_STATUS.md
DECISION_LOG.md
NEXT_PACKET.md
ARCHITECTURE.md
AI_CODING_RULES.md
```

## PROJECT_STATUS.md Template

```markdown
# Project Status

## Current Stage

## Completed Packets

## Working Systems

## Partial Systems

## Broken / Missing

## Current Test Status

## Current Save Version

## Current Ruleset Version

## Next Recommended Packet
```

## DECISION_LOG.md Template

```markdown
# Decision Log

## YYYY-MM-DD — Decision Name

### Decision

### Reason

### Alternatives Considered

### Consequences

### Revisit When
```

## NEXT_PACKET.md Template

```markdown
# Next Packet

## Packet

## Why This Next

## Files To Read

## Files Likely Touched

## Acceptance Criteria
```


<!-- FILE: 04_REPO_STRUCTURE.md -->

# Repository Structure Spec

## Top-Level Tree

```text
cfb-fm/
  package.json
  README.md
  PROJECT_STATUS.md
  DECISION_LOG.md
  NEXT_PACKET.md
  ARCHITECTURE.md
  AI_CODING_RULES.md

  src/
    app/
    ui/
    routes/
    components/
    tables/
    profiles/
    domain/
    sim/
    events/
    data/
    services/
    testing/
    utils/

  config/
    rulesets/
    balance/
    schemas/

  assets/
    generated/
    portraits/
    logos/
    uniforms/
    stadiums/

  tests/
    unit/
    integration/
    scenarios/
    invariants/
    ui/

  scripts/
    run_headless_sim.ts
    validate_world.ts
    export_qc_report.ts

  sim_runs/
  qa_reports/
  docs/
```

## Domain Layer

```text
src/domain/
  ids.ts
  rng.ts
  world.ts
  school.ts
  conference.ts
  season.ts
  player.ts
  prospect.ts
  staff.ts
  finance.ts
  facility.ts
  nil.ts
  game.ts
  event.ts
  save.ts
```

## Simulation Layer

```text
src/sim/
  engine.ts
  calendar.ts
  worldGenerator.ts
  teamRatings.ts
  gameSim/
    level1ResultEngine.ts
    boxScore.ts
    playByPlayTypes.ts
  recruiting/
    prospectGenerator.ts
    interestEngine.ts
    scouting.ts
  development/
    developmentTick.ts
    practice.ts
  roster/
    eligibility.ts
    depthChart.ts
    transferRisk.ts
  finance/
    budgetEngine.ts
    nilClearinghouse.ts
  staff/
    staffReports.ts
    responsibilities.ts
```

## Events Layer

```text
src/events/
  eventRegistry.ts
  eventTypes.ts
  eventActions.ts
  inbox.ts
  continueGate.ts
  templates/
```

## Data Layer

```text
src/data/
  db.ts
  migrations/
  saveLoad.ts
  repositories/
  serializers/
```

## UI Layer

```text
src/routes/
  InboxRoute.tsx
  ProgramHomeRoute.tsx
  RosterRoute.tsx
  RecruitingRoute.tsx
  StaffRoute.tsx
  ScheduleRoute.tsx
  FinanceRoute.tsx
  PracticeRoute.tsx
  DataLabRoute.tsx
  SettingsRoute.tsx

src/tables/
  DataTable.tsx
  columnRegistry.ts
  savedViews.ts

src/profiles/
  PlayerProfile.tsx
  ProspectProfile.tsx
  StaffProfile.tsx
  SchoolProfile.tsx
```

## Services Layer

```text
src/services/narrative/
  NarrativeService.ts
  MockNarrativeService.ts
  LocalLLMService.ts
  ReportPayloadBuilder.ts
  PromptTemplates.ts
  NarrativeValidator.ts

src/services/assets/
  AssetService.ts
  MockAssetService.ts
  LocalImageService.ts
  AssetQueue.ts
  PortraitPromptBuilder.ts
```

## Testing Layer

```text
src/testing/
  factories/
  fixtures/
  invariantChecks.ts
  scenarioRunner.ts
  simRunner.ts
  qcExport.ts
```

## Configs

```text
config/rulesets/current_fictional.json
config/rulesets/modern_nil_private.json
config/balance/default.json
config/balance/chaos.json
config/schemas/ruleset.schema.json
```

## Hard Rule

If the AI creates a file outside this structure, it must explain why.


<!-- FILE: 05_FIRST_10_PACKETS.md -->

# First 10 AI Build Packets

These packets take the game from zero to a real clickable shell with deterministic foundation.

Do them in order.

---

# Packet 0.1 — Repository Skeleton

## Size

Medium

## Goal

Create the app skeleton and project memory files.

## Deliverables

- Tauri + React + TypeScript project
- package scripts
- folder tree
- README
- PROJECT_STATUS.md
- DECISION_LOG.md
- NEXT_PACKET.md
- ARCHITECTURE.md
- AI_CODING_RULES.md
- basic test setup

## Implementation Notes

No game features yet.

Do not add fake roster screens. Build the foundation.

## Acceptance

- app starts
- tests run
- folder tree exists
- project memory files exist
- README explains architecture

---

# Packet 0.2 — Deterministic RNG and ID Utilities

## Goal

Create seeded random and ID generation utilities.

## Deliverables

- seeded RNG
- deterministic helpers
- ID factory
- tests

## Required APIs

```ts
createRng(seed: string | number): Rng
rng.nextFloat(): number
rng.nextInt(min: number, max: number): number
rng.pick<T>(items: T[]): T
rng.weightedPick<T>(items: Weighted<T>[]): T
createId(prefix: string, parts: string[]): string
```

## Acceptance

- same seed gives same sequence
- different namespaces avoid accidental correlation
- IDs are stable in generated worlds

---

# Packet 0.3 — Config and Ruleset Loader

## Goal

Load game rules from JSON.

## Deliverables

- ruleset schema
- config loader
- validation
- sample ruleset

## Include Fields

- roster limits
- scholarship rules, but not dominant
- NIL rules
- direct benefit rules
- transfer windows
- redshirt rules
- practice time units
- playoff format
- recruiting calendar

## Acceptance

- invalid config fails loudly
- tests cover required fields
- sim code can consume ruleset

---

# Packet 1.1 — Core Domain Types

## Goal

Define domain types.

## Deliverables

- School
- Conference
- Season
- GameWorld
- IDs
- base serialization types
- tests

## Acceptance

- GameWorld can hold schools/conferences/season
- no UI dependency
- serializable

---

# Packet 1.2 — School and Conference Generator

## Goal

Generate a fictional world.

## Deliverables

- generate schools
- generate conferences
- assign schools
- structural school power fields

## School Structural Power Fields

- alumni base
- donor wealth
- fan intensity
- local talent access
- regional talent density
- facilities
- NFL pipeline
- conference prestige
- media exposure
- academic prestige
- campus appeal
- location appeal
- tradition
- recent success
- staff budget
- NIL market strength

## Acceptance

- deterministic with seed
- no school permanently dominant by label
- power emerges from modeled causes

---

# Packet 1.3 — Player Entity v1

## Goal

Create granular player model.

## Deliverables

- player identity
- position
- height/weight
- class/eligibility
- visible attributes
- hidden attributes
- preference weights
- morale shell
- NIL shell
- development shell
- tests

## Attribute Groups

- physical
- movement
- technical
- football IQ
- mental
- personality
- durability
- academic/life
- market/brand
- hidden preferences

## Acceptance

- hidden traits are not exposed by default
- player is serializable
- tests verify ranges

---

# Packet 1.4 — Prospect Entity v1

## Goal

Create multi-year recruit model.

## Deliverables

- prospect identity
- class year
- current grade level
- sophomore/junior/senior lifecycle
- true ratings
- scouted ranges
- hidden preferences
- high school
- state/region
- development curve
- recruitment state by school
- tests

## Acceptance

- sophomores can exist with low scouting confidence
- ratings can evolve over time
- true values separate from scouted values

---

# Packet 1.5 — Staff Entity v1

## Goal

Create staff model.

## Deliverables

- staff identity
- role
- attributes
- personality
- contract
- recruiting regions
- scheme preferences
- evaluation bias
- tests

## Acceptance

- staff can be attached to school
- staff can evaluate recruits imperfectly
- serializable

---

# Packet 2.1 — Save/Load v1

## Goal

Make the world saveable early.

## Deliverables

- save world to JSON or SQLite snapshot
- load world
- validate version
- round-trip tests

## Acceptance

- generated world survives save/load
- exact state is preserved
- save version exists

---

# Packet 3.1 — Calendar and Continue Loop v1

## Goal

Create the time engine.

## Deliverables

- season phases
- weekly advancement
- Continue function
- blocking check hook
- event hook placeholder
- tests

## Season Phases

- offseason
- spring
- summer recruiting
- preseason
- regular season
- championship week
- postseason
- transfer window
- signing period

## Acceptance

- world advances deterministically
- Continue can be blocked later
- phase changes are testable

---

# Packet 4.1 — App Shell + Sidebar + Continue Button

## Goal

Create the first real clickable shell.

## Deliverables

- persistent sidebar
- top bar
- current week/date
- Continue button
- placeholder routes
- no fake data cards
- real world state connection

## Sidebar Sections

- Inbox
- Program
- Roster
- Recruiting
- Staff
- Practice
- Schedule
- Finance
- Data Lab
- Settings

## Acceptance

- Continue advances real calendar
- routes exist
- shell is stable
- UI uses real state


<!-- FILE: 06_PACKETS_11_30.md -->

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


<!-- FILE: 07_READY_TO_PASTE_PROMPTS.md -->

# Ready-To-Paste AI Prompts

## Prompt: Packet 0.1 Repository Skeleton

```text
You are implementing Packet 0.1 for the CFB-FM project.

Goal:
Create the repository skeleton for a Tauri + React + TypeScript + SQLite desktop app.

Read these rules:
- This is a menu-heavy simulation app, not a graphics-first game.
- No game features yet.
- No fake roster/recruiting dashboards yet.
- Build structure, scripts, docs, and test foundation.
- Maintain project memory files.

Deliver:
1. Tauri + React + TypeScript starter project
2. folder structure:
   src/app
   src/ui
   src/routes
   src/components
   src/tables
   src/profiles
   src/domain
   src/sim
   src/events
   src/data
   src/services
   src/testing
   src/utils
   config/rulesets
   config/balance
   assets/generated
   tests
   scripts
   docs
3. PROJECT_STATUS.md
4. DECISION_LOG.md
5. NEXT_PACKET.md
6. ARCHITECTURE.md
7. AI_CODING_RULES.md
8. README.md
9. Vitest setup
10. basic smoke test

Acceptance:
- app starts
- tests run
- no game logic yet
- project memory files explain how future AI sessions continue
```

## Prompt: Packet 0.2 RNG and IDs

```text
Implement Packet 0.2 — Deterministic RNG and ID Utilities.

Goal:
Create deterministic random utilities and stable ID generation.

Deliver:
- src/domain/rng.ts
- src/domain/ids.ts
- tests/unit/rng.test.ts
- tests/unit/ids.test.ts

Requirements:
- same seed produces same sequence
- namespaced RNG supported
- weighted pick supported
- integer and float helpers
- deterministic ID creation by prefix + parts
- no Math.random in sim code

Acceptance:
- tests pass
- utilities documented
- PROJECT_STATUS.md updated
- NEXT_PACKET.md points to config/ruleset loader
```

## Prompt: Packet 0.3 Config Ruleset Loader

```text
Implement Packet 0.3 — Config and Ruleset Loader.

Goal:
Create JSON ruleset loading and validation.

Deliver:
- config/rulesets/current_fictional.json
- config/schemas/ruleset.schema.json or TypeScript validator
- src/data/configLoader.ts
- src/domain/ruleset.ts
- tests/unit/configLoader.test.ts

Ruleset must include:
- roster limits
- scholarship rules
- NIL rules
- direct benefit rules
- transfer windows
- redshirt rules
- weekly practice time units
- recruiting calendar
- playoff format
- signing periods

Acceptance:
- valid config loads
- invalid config fails loudly
- no hardcoded rules
- tests pass
```

## Prompt: Packet 1.3 Player Entity v1

```text
Implement Packet 1.3 — Player Entity v1.

Goal:
Create a granular player entity suitable for long-term development simulation.

Deliver:
- src/domain/player.ts
- player factory for tests
- serialization helpers
- tests/unit/player.test.ts

Player must include:
- identity
- schoolId
- position
- secondary positions
- height/weight
- class/eligibility
- visible attributes
- hidden attributes
- preference weights
- NIL profile
- morale profile
- development profile
- academic/life profile
- durability profile
- market/brand profile

Attribute groups:
- physical
- movement
- technical
- football IQ
- mental
- personality
- durability
- academic/life
- market/brand
- hidden preferences

Hard rules:
- hidden traits cannot be exposed by default public view
- all values must validate ranges
- player must serialize/deserialize
- deterministic test factory must use seeded RNG

Acceptance:
- tests pass
- hidden/public views tested
- PROJECT_STATUS.md updated
```

## Prompt: Packet 7.5 Trait Clusters v1

```text
Implement Packet 7.5 — Scouting and Trait Clusters v1.

Goal:
Convert structured player/prospect data into human-readable scouting labels.

Deliver:
- src/domain/traitCluster.ts
- src/sim/scouting/traitDerivation.ts
- tests/unit/traitDerivation.test.ts

Trait cluster object:
- id
- label
- category
- visibility
- confidence
- evidence
- source
- positive/negative/neutral
- gameplayEffects

Categories:
- development curve
- work/preparation
- competitive/mental
- physical body/movement
- football IQ
- personality/retention
- role/scheme
- risk

Required example labels:
- Late Developer
- Gym Rat
- Studious
- Gamer
- Bad Hips
- Money-Motivated
- Development-Focused
- Portal Risk

Hard rules:
- labels are derived from data, not invented
- every label needs evidence
- confidence must reflect scouting certainty
- staff bias should be supported even if basic

Acceptance:
- tests show labels appear/disappear based on attributes
- labels include confidence and evidence
- no LLM required
```

## Prompt: Packet 10.2 NIL Clearinghouse v1

```text
Implement Packet 10.2 — NIL Clearinghouse v1.

Goal:
Create a mock NIL deal review system to prevent unrealistic NIL deals from breaking sim balance.

Deliver:
- src/domain/nil.ts
- src/sim/finance/nilClearinghouse.ts
- tests/unit/nilClearinghouse.test.ts

Inputs:
- player/recruit profile
- proposed amount
- position
- school market strength
- donor risk
- timing
- comparable market value
- player brand value
- recruit/player status

Outputs:
- marketValueEstimate
- proposedDealAmount
- multiplier
- riskScore
- reviewStatus:
  Approved
  ApprovedWithScrutiny
  DelayedReview
  Flagged
  Denied
- reasons

Hard rules:
- high NIL can be allowed if justified
- absurd NIL should be flagged
- denial is rare and configurable
- flagged deals create friction, not automatic punishment

Acceptance:
- normal deal approved
- slightly high deal approved with scrutiny
- absurd low-profile deal flagged/denied
- tests pass
```

## Prompt: LLM Narrative Service

```text
Implement Local Narrative Service architecture.

Goal:
Prepare LLM integration for scouting/media/play-by-play without making AI required.

Deliver:
- src/services/narrative/NarrativeService.ts
- src/services/narrative/MockNarrativeService.ts
- src/services/narrative/LocalLLMService.ts
- src/services/narrative/ReportPayloadBuilder.ts
- src/services/narrative/NarrativeValidator.ts
- tests

Hard rules:
- simulation facts come from structured payload only
- LLM cannot invent injuries, commitments, stats, money, or violations
- if LLM unavailable, deterministic fallback templates are used
- service interface must be provider-agnostic
- all generated text should be cacheable

Acceptance:
- mock service works
- fallback works
- local service can be configured but not required
- forbidden-claim validation exists
```


<!-- FILE: 08_DATA_MODELS_V1.md -->

# Data Models v1

This document defines the first-pass data model targets.

These are intentionally broad. The AI should implement only the fields required by the active packet, but future fields should be anticipated.

---

# GameWorld

```ts
type GameWorld = {
  id: string;
  saveVersion: number;
  rulesetId: string;
  seed: string;
  currentSeason: number;
  currentWeek: string;
  phase: SeasonPhase;
  userSchoolId?: string;

  schools: Record<SchoolId, School>;
  conferences: Record<ConferenceId, Conference>;
  players: Record<PlayerId, Player>;
  prospects: Record<ProspectId, Prospect>;
  staff: Record<StaffId, Staff>;
  events: Record<EventId, GameEvent>;
  inbox: InboxState;
  finances: Record<SchoolId, FinanceProfile>;
  facilities: Record<SchoolId, FacilityProfile>;
  actionLog: ActionLogEntry[];
};
```

# School

```ts
type School = {
  id: SchoolId;
  name: string;
  shortName: string;
  mascot: string;
  city: string;
  state: string;
  conferenceId: ConferenceId;
  colors: SchoolColors;

  structuralPower: {
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
  };

  identity: {
    tacticalIdentityLabels: string[];
    cultureLabels: string[];
    townProfileId?: string;
  };
};
```

# Conference

```ts
type Conference = {
  id: ConferenceId;
  name: string;
  teams: SchoolId[];
  divisions?: Record<string, SchoolId[]>;
  pods?: Record<string, SchoolId[]>;
  protectedRivalries: Array<[SchoolId, SchoolId]>;
  conferenceGames: number;
  championshipFormat: "none" | "top_two" | "divisions" | "pods";
  revenueShareModel: "equal" | "performance" | "tiered";
  mediaDealStrength: number;
  prestige: number;
  playoffAccess: "auto_possible" | "at_large_only" | "none";
};
```

# Player

```ts
type Player = {
  id: PlayerId;
  firstName: string;
  lastName: string;
  schoolId: SchoolId;
  hometown: string;
  state: string;
  position: Position;
  secondaryPositions: Position[];
  heightInches: number;
  weightPounds: number;
  handedness?: "left" | "right";
  classYear: PlayerClass;
  eligibility: EligibilityProfile;

  attributes: PlayerAttributes;
  hidden: HiddenPlayerTraits;
  preferences: PlayerPreferenceWeights;
  morale: MoraleProfile;
  development: DevelopmentProfile;
  nil: PlayerNilProfile;
  academic: AcademicProfile;
  health: HealthProfile;
  market: MarketProfile;

  traitClusters: TraitClusterInstance[];
};
```

# Player Preference Weights

```ts
type PlayerPreferenceWeights = {
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
};
```

# Prospect

```ts
type Prospect = {
  id: ProspectId;
  firstName: string;
  lastName: string;
  classYear: number;
  gradeLevel: "FR" | "SO" | "JR" | "SR";
  hometown: string;
  state: string;
  region: string;
  highSchool: string;
  position: Position;
  secondaryPositions: Position[];
  heightInches: number;
  weightPounds: number;

  trueAttributes: PlayerAttributes;
  publicRating: PublicProspectRating;
  scoutedRatings: ScoutedRatings;
  hidden: HiddenPlayerTraits;
  preferences: PlayerPreferenceWeights;
  development: ProspectDevelopmentProfile;
  recruitment: Record<SchoolId, RecruitmentState>;

  traitClusters: TraitClusterInstance[];
};
```

# RecruitmentState

```ts
type RecruitmentState = {
  interest: number;
  relationship: number;
  offerStatus: "none" | "watching" | "offered" | "withdrawn";
  priority: "none" | "low" | "medium" | "high" | "must_get";
  staffOwnerId?: StaffId;
  visitStatus?: VisitStatus;
  nilExpectationKnown: boolean;
  nilExpectation?: number;
  playingTimeConcern: number;
  locationFit: number;
  schemeFit: number;
  lastContactWeek?: string;
  commitmentStatus: "none" | "verbal" | "soft_verbal" | "signed";
  flipRisk: number;
};
```

# Staff

```ts
type Staff = {
  id: StaffId;
  firstName: string;
  lastName: string;
  schoolId?: SchoolId;
  role: StaffRole;
  age: number;
  contract: StaffContract;
  attributes: StaffAttributes;
  personality: StaffPersonality;
  preferences: StaffPreferences;
  relationships: StaffRelationships;
  biases: StaffEvaluationBias;
  workload: StaffWorkload;
};
```

# NIL Deal Review

```ts
type NilDealReview = {
  id: string;
  entityId: PlayerId | ProspectId;
  schoolId: SchoolId;
  proposedAmount: number;
  marketValueEstimate: number;
  multiplier: number;
  riskScore: number;
  status:
    | "Approved"
    | "ApprovedWithScrutiny"
    | "DelayedReview"
    | "Flagged"
    | "Denied";
  reasons: string[];
};
```

# Event

```ts
type GameEvent = {
  id: EventId;
  type: string;
  category: EventCategory;
  priority: "critical" | "high" | "normal" | "low" | "flavor";
  blocking: boolean;
  createdAt: string;
  expiresAt?: string;
  subject: string;
  body: string;
  actors: Record<string, string>;
  actions: EventAction[];
  resolved: boolean;
  archived: boolean;
};
```


<!-- FILE: 09_SCOPE_NOTES_COMPILER.md -->

# Scope Notes Compiler

This document captures the user's expanding design ideas in organized form.

It should be treated as active design input.

---

# Recruiting Timeline

Recruiting starts before senior year.

Prospect lifecycle:

```text
Freshman: background/hidden pool
Sophomore: early identification, very low confidence
Junior: active recruiting begins
Senior: commitment/signing pressure
```

Prospects can:

- develop
- stagnate
- regress
- transfer high schools
- change positions
- rise in rankings
- fall in rankings
- be overrated
- be underrated

Recruiting must feel like projecting future players, not shopping for final ratings.

---

# Development Is The Core Game

The game is about:

```text
choosing the right players
developing them
fitting them to your play style
building a program identity
```

Multiple paths to win must exist:

- blue-chip talent machine
- development factory
- scheme edge
- defensive identity
- high-tempo chaos
- portal mercenary model
- walk-on/local pipeline model
- NIL superpower
- culture program
- NFL factory

No single strategy should dominate every 20-year sim.

---

# Realistic Talent Distribution

The number of high-overall players across the league must match reality.

Recruiting class defaults should approximate:

```text
~32 five-stars
~300 four-stars
~1500 three-stars
large background pool of two-stars/unranked
```

Not all background players need full simulation.

Use detail tiers:

```text
Tier 1: nationally relevant prospects
Tier 2: FBS recruitable prospects
Tier 3: regional/depth prospects
Tier 4: generated if discovered
Tier 5: statistical background pool
```

Validation reports must track:

- number of elite players
- number of 16+ rating players
- number of 18+ rating players
- draftable player counts
- blue-chip concentration
- walk-on breakout rate
- 3-star breakout rate
- 5-star bust rate

---

# NIL-Era Roster Economics

Scholarships are not the main limiter anymore.

Separate roster currencies:

- roster spot
- scholarship status
- NIL value
- direct benefit allocation
- playing time
- development attention
- trust/promises
- academic fit
- draft exposure

A walk-on can make NIL money.

Scholarship status does not equal economic value.

---

# NIL Clearinghouse

The game needs a mock clearinghouse for deals that are too high or suspicious.

Statuses:

- Approved
- Approved with scrutiny
- Delayed review
- Flagged
- Denied

Inputs:

- player market value
- proposed amount
- position
- school market size
- donor base
- local business strength
- social/media value
- comparable deals
- booster risk
- timing
- repeated patterns

The clearinghouse should create friction, not always punishment.

---

# School Power Must Be Causal

SEC-type schools or current powers should not be great forever because of labels.

They should start with advantages because of modeled causes:

- alumni base
- donor base
- facilities
- recruiting geography
- NFL pipeline
- conference prestige
- media exposure
- fan intensity
- staff budget
- NIL market
- tradition
- recent success

If these erode, they fall.

If another school builds these, it rises.

---

# Draft As Calibration Tool

The draft should reflect real-life style output.

It is not just flavor. It validates the sim.

Track:

- draft picks by school
- draft picks by conference
- first-rounders
- position distribution
- P4 vs G5
- late bloomers
- busts
- NFL pipeline concentration

Draft logic should consider:

- ability
- athletic traits
- production
- competition level
- position value
- size thresholds
- injuries
- age/class
- school NFL reputation
- visibility

---

# Practice Strategy

Practice must matter.

Use weekly time units from ruleset.

Practice categories:

- fundamentals
- strength and conditioning
- film study
- position technique
- scheme install
- opponent prep
- special teams
- recovery
- academics
- leadership/culture

Intensity:

```text
Light
Normal
Intense
Extreme
```

Effects:

- development
- injury risk
- fatigue
- morale
- readiness
- team vibe

Users can fully control, semi-control, or delegate.

---

# Team Vibe

Team Vibe is an overall team culture/chemistry state.

Components:

- average morale
- leadership
- coach trust
- winning momentum
- conflict
- fatigue
- broken promises
- locker room chemistry

Effects:

- clutch performance
- transfer risk
- practice quality
- development
- negative event frequency
- recruit perception

---

# Pep Talks and Meetings

FM-like pep talks should exist.

Types:

- pre-game
- halftime
- post-game
- weekly team meeting
- crisis meeting
- position group meeting
- 1-on-1 player meeting

Tones:

- calm
- assertive
- aggressive
- passionate
- supportive
- disappointed
- demanding
- confident
- inspirational

Player reactions depend on:

- personality
- coach relationship
- confidence
- pressure handling
- recent performance
- role satisfaction

Pep talks can help or hurt.

---

# College Town Immersion

Every college town should feel distinct.

Town profile fields:

- landmarks
- food culture
- game day identity
- rivalry flavor
- local memes
- weather profile
- town size
- campus appeal
- nightlife
- fan intensity
- local pride

Immersion should affect:

- recruiting visits
- player homesickness
- player location fit
- morale
- fan pressure
- commentary
- media flavor

Use curated/crowdsourced/scraped data, but compress it to high-signal content.

Avoid massive lore dumps.

---

# Trait Cluster Labels

Scouting should describe players with labels derived from attributes.

Example:

```text
late-developing / gym rat / studious / gamer / bad hips
```

Labels must be derived from structured data.

Categories:

- development curve
- work/preparation
- competitive/mental
- body/movement
- football IQ
- personality/retention
- role/scheme
- risk

LLMs can convert labels into prose, but cannot invent labels or facts.

---

# Customization

User wants:

- custom conferences
- custom school creator
- create player
- create coach
- dynasty mode
- career mode
- stadium builder
- uniform designer
- play designer
- offensive tempo strategies
- AI-generated graphics
- 8-bit style fight songs eventually

Creator tools must use the same systems as normal game objects.

No creator output should be cosmetic-only unless explicitly marked cosmetic.

---

# UI Clickability

FM feel comes from clickability.

Hard rules:

- every player name clickable
- every recruit clickable
- every school clickable
- every staff member clickable
- every trait label clickable
- every town/city clickable if meaningful
- every report source clickable
- every stat drillable if possible
- breadcrumbs/back navigation
- hover cards
- comparison panels

Example chain:

```text
Recruit -> Trait Label -> Similar Player -> Old Recruiting Class -> Staff Evaluator -> Region -> High School -> Other Prospects
```

This is the feel to capture.

---

# Play-by-Play First

No visual sim first.

Start with structured play-by-play.

The sim engine creates facts:

- down
- distance
- clock
- field position
- play type
- result
- yards
- players involved
- pressure
- coverage
- concept
- turnover
- penalty

Text is generated by templates or LLM.

Real play-by-play data can be used to calibrate tendencies and language patterns.

---

# LLM Immersion

Use LLM for:

- scouting reports
- staff voice
- media questions
- commentary phrasing
- town flavor
- recruit dialogue
- player meetings

Do not use LLM for:

- ratings
- outcomes
- injuries
- commitments
- NIL approvals
- money
- discipline facts

LLM is flavor. Simulation is truth.


<!-- FILE: 10_LLM_AND_ASSET_PIPELINE_SPEC.md -->

# LLM and Asset Pipeline Spec

## Purpose

This file defines how storytelling and generated graphics integrate into the game.

## Core Principle

```text
Simulation = truth
LLM = language
Image model = assets
```

The game must remain fully playable if both AI services are offline.

---

# Narrative Service

## Interface

```ts
export interface NarrativeService {
  generateScoutingReport(payload: ScoutingReportPayload): Promise<NarrativeResult>;
  generatePlayerDevelopmentReport(payload: DevelopmentReportPayload): Promise<NarrativeResult>;
  generateMediaBlurb(payload: MediaBlurbPayload): Promise<NarrativeResult>;
  generatePlayByPlayLine(payload: PlayByPlayPayload): Promise<NarrativeResult>;
  generateMeetingDialogue(payload: MeetingPayload): Promise<NarrativeResult>;
}
```

## Implementations

```text
MockNarrativeService
TemplateNarrativeService
LocalLLMService
CachedNarrativeService
```

## Local LLM Endpoint

Use an OpenAI-compatible local endpoint.

Example expected config:

```json
{
  "provider": "local_openai_compatible",
  "baseUrl": "http://localhost:8080/v1",
  "model": "local-model",
  "enabled": false
}
```

## Grounded Payload

Every LLM call must include only structured facts.

Example:

```json
{
  "reportType": "scouting",
  "entityId": "prospect_001",
  "facts": {
    "name": "Darius McClain",
    "position": "QB",
    "visibleTraitLabels": ["Late Developer", "Gym Rat", "Bad Hips"],
    "scoutConfidence": 0.58
  },
  "forbiddenClaims": [
    "injury",
    "commitment",
    "NIL amount",
    "academic violation"
  ],
  "tone": "blunt_staff_report"
}
```

## Validation

The narrative validator should check:

- forbidden keywords/claims
- unsupported injury mention
- unsupported commitment mention
- unsupported money mention
- unsupported violation mention

If validation fails:

- discard LLM output
- use fallback template
- log issue

## Caching

Cache generated text by:

- payload hash
- model
- prompt version
- entity id
- season/week

This prevents repeated AI calls.

---

# Asset Service

## Interface

```ts
export interface AssetService {
  generatePortrait(payload: PortraitPayload): Promise<AssetResult>;
  generateLogo(payload: LogoPayload): Promise<AssetResult>;
  generateUniformPreview(payload: UniformPayload): Promise<AssetResult>;
  generateStadiumConcept(payload: StadiumPayload): Promise<AssetResult>;
}
```

## Implementations

```text
MockAssetService
LocalImageService
QueuedAssetService
```

## Asset Metadata

```ts
type GeneratedAsset = {
  id: string;
  entityId: string;
  assetType: "portrait" | "logo" | "uniform" | "stadium" | "news";
  filePath: string;
  seed: string;
  provider: string;
  promptVersion: string;
  locked: boolean;
  createdAt: string;
};
```

## Storage

```text
assets/generated/portraits
assets/generated/logos
assets/generated/uniforms
assets/generated/stadiums
```

SQLite stores metadata.

## Portrait Flow

```text
Player generated
  ↓
Portrait job queued
  ↓
Asset service builds prompt
  ↓
ComfyUI/local generator creates image
  ↓
File saved
  ↓
metadata saved
  ↓
UI displays portrait
```

## User Controls

- regenerate
- lock
- replace manually
- hide portrait
- batch-generate
- queue only stars/starters

## Performance

AI generation must be async.

Never block:

- Continue
- save/load
- sim loop
- UI render
- game result generation

## Fallbacks

If service offline:

- show silhouette
- show initials
- queue job
- warn user quietly


<!-- FILE: 11_QA_HEADLESS_AND_AI_QC.md -->

# QA, Headless Simulation, and AI QC

## Purpose

The game is too complex to test manually.

Testing must be built into the architecture.

## QA Stack

1. unit tests
2. integration tests
3. invariant tests
4. scenario tests
5. statistical validation
6. headless sim runner
7. replay/event log
8. AI QC reports

---

# Invariants

These must never happen:

- duplicate player IDs
- player on two rosters
- negative eligibility
- impossible redshirt state
- team plays itself
- duplicate game in same week
- recruit signs with two schools
- NIL deal approved with missing entity
- team over hard roster cap if ruleset forbids
- player has invalid position
- event action references missing actor
- Continue passes blocking event
- save/load changes state

---

# Scenario Tests

Create scenario fixtures:

```text
qb_injury_depth_chart
top_recruit_rival_push
nil_deal_flagged
player_transfer_risk
redshirt_limit_warning
staff_poached
practice_extreme_fatigue
custom_conference_schedule
pep_talk_backfires
late_bloomer_rises
```

Each scenario defines:

- setup
- actions
- expected outcomes

---

# Statistical Validation

After multi-season sims, validate:

## Recruiting

- five-star count
- four-star count
- three-star count
- blue-chip concentration
- late-bloomer rate
- bust rate

## Player Development

- elite player counts
- average attribute growth
- regression rate
- walk-on breakout rate
- development by school

## Games

- points per game
- yards per game
- upset frequency
- undefeated teams
- blowout frequency
- close game frequency

## Draft

- picks by school
- picks by conference
- first-round count
- position distribution
- G5 representation

## Finance/NIL

- NIL deal sizes
- flagged deal rate
- donor influence
- budget health

## Transfers

- portal volume
- star transfers
- retention success
- position imbalance

---

# Headless Runner

Eventually support:

```bash
npm run sim -- --seed 123 --seasons 1
npm run sim -- --seed 123 --seasons 20
npm run sim -- --seed 123 --scenario nil_deal_flagged
```

Output:

```text
sim_runs/
  seed_123/
    summary.json
    teams.csv
    players.csv
    recruiting.csv
    games.csv
    draft.csv
    nil.csv
    anomalies.json
    qc_report.md
```

---

# AI QC Prompt

Use this after exporting a sim run.

```text
You are QA director for a college football management simulation.

Review the exported sim run.

Find:
- impossible states
- unrealistic outputs
- boring loops
- bad incentives
- AI school mistakes
- statistical outliers
- repeated events
- missing consequences
- places where the game feels fake

For each issue:
1. severity
2. evidence
3. likely system
4. proposed fix
5. regression test
```

---

# Replay System

Every action should be logged:

```json
{
  "tick": "2031-WEEK-07",
  "actor": "school_ou",
  "action": "offer_scholarship",
  "target": "prospect_123",
  "before": {},
  "after": {}
}
```

Goal:

```text
No ghost bugs.
```

If a weird state happens, replay the log.

---

# QA Acceptance

The QA system is acceptable when:

- one-season headless sim works
- invariant suite runs
- at least 10 scenarios exist
- statistical report exports
- AI QC package exports
- save/load round-trip test exists
- replay log exists


<!-- FILE: 12_FINAL_ALPHA_DEFINITION.md -->

# Final Alpha and Beta Definitions

## True Playable Alpha

The game reaches playable alpha when the user can:

- start a career
- generate or select a school
- advance time with Continue
- read Inbox events
- view roster
- view player profiles
- view prospects
- build recruiting board
- offer/contact recruits
- run basic scouting
- set practice strategy
- simulate games with box score and play-by-play
- complete a season
- sign a recruiting class
- save/load
- run a headless one-season sim
- pass core invariants

## True FM-Like Beta

The game reaches FM-like beta when:

- every major screen is dense and table-driven
- every meaningful entity is clickable
- recruiting begins before senior year
- prospects develop/stagnate/regress
- hidden traits and preferences matter
- scouting uncertainty matters
- NIL-era economics matter
- clearinghouse review exists
- practice strategy matters
- team vibe matters
- pep talks can help/hurt
- staff reports and disagreements exist
- custom schools and conferences work
- player development drives program identity
- draft output validates talent model
- AI schools behave plausibly
- sandbox/Data Lab can tune realism
- play-by-play is believable
- LLM reports are grounded and optional
- portraits/assets are optional and non-blocking
- 20-year sim is stable
- history persists
- dynasties rise and fall for causal reasons

## The One More Continue Test

The game is succeeding when the user says:

```text
I'll just hit Continue one more time.
```

And then loses three hours.
