# CFB-FM AI Execution Plan — Token-Based Build Order

## Purpose

This document converts the full CFB-FM scope into an AI-buildable execution plan.

It is not organized by calendar time.

It is organized by **token-budgeted work packets** because the game is being built by AI. The goal is to prevent the AI from drowning in the giant scope, losing context, hallucinating architecture, or building shallow placeholder features.

Each work packet is designed to fit inside a controlled AI context window.

The AI should receive:
1. the global guiding-light file,
2. the relevant system scope,
3. the current project status,
4. the current codebase summary,
5. this packet’s instructions,
6. the acceptance checklist.

The AI should return:
1. code changes,
2. schema changes,
3. tests,
4. notes,
5. updated project status,
6. next-packet handoff.

---

# Core Rule

Do not ask the AI to “build the game.”

Ask the AI to complete one token-bounded packet.

A packet is done only when:
- it compiles,
- it runs,
- it saves/loads if stateful,
- it has tests,
- it updates docs,
- it has a handoff note for the next packet.

---

# Token Budget Philosophy

## Packet Sizes

Use three packet sizes.

### Small Packet — 4k to 8k input tokens

Use for:
- one bug
- one schema addition
- one screen component
- one test file
- one refactor
- one event template group
- one parser/utility

Expected output:
- one or two files changed
- focused diff
- no architecture drift

### Medium Packet — 12k to 24k input tokens

Use for:
- one self-contained feature
- one entity model
- one screen with basic actions
- one simulation subsystem
- one test harness
- one report generator

Expected output:
- several files changed
- working vertical slice
- acceptance checklist completed

### Large Packet — 32k to 64k input tokens

Use for:
- one major system pass
- schema + logic + UI + tests
- data migration
- headless simulation workflow
- cross-system integration

Expected output:
- multiple modules changed
- complete system milestone
- detailed handoff

## Avoid Mega-Packets

Do not feed the AI 150k tokens of scope and say “go.”

That causes:
- shallow implementation
- forgotten constraints
- inconsistent naming
- UI-only fake state
- no tests
- accidental rewrites
- architectural drift

Use staged packets.

---

# Required AI Context Stack

Every coding session should include these documents or summaries.

## Always Include

1. `01_GUIDING_LIGHT.md`
2. `PROJECT_STATUS.md`
3. `DECISION_LOG.md`
4. current repo file tree
5. latest failing tests, if any
6. current packet instructions

## Include Only When Relevant

- Recruiting blowout spec
- Player development blowout spec
- Inbox/event blowout spec
- Staff blowout spec
- Game simulation blowout spec
- Finance/NIL/sandbox blowout spec
- World simulation blowout spec
- Analytics blowout spec
- Legacy/history blowout spec

## Never Include Everything Unless Summarized

For a normal AI coding packet, include a summary of unrelated systems, not the entire scope.

The AI should know the global shape, but only deep context for the current target.

---

# Standard Packet Template

Use this exact structure for each AI work packet.

```markdown
# AI Work Packet: [Name]

## Packet Size
Small / Medium / Large

## Token Budget
Input: [target tokens]
Output: [target tokens]

## Current Goal
[one clear outcome]

## Context to Include
- [files/specs/summaries]

## Files Likely Touched
- [file paths]

## Required Deliverables
1. [deliverable]
2. [deliverable]
3. [deliverable]

## Hard Constraints
- no UI-only state
- deterministic behavior where applicable
- save/load support where applicable
- tests required
- do not hardcode rules that belong in config

## Implementation Steps
1. [step]
2. [step]
3. [step]

## Acceptance Criteria
- [ ] compiles
- [ ] tests pass
- [ ] feature works headlessly if applicable
- [ ] UI has stable data-testid hooks if applicable
- [ ] save/load updated if applicable
- [ ] docs updated

## Handoff Required
At the end, update:
- PROJECT_STATUS.md
- DECISION_LOG.md if architecture changed
- NEXT_PACKET.md
```

---

# Master Build Order

The build order below is intentionally not “fastest visible demo first.”

It is ordered to prevent architectural collapse.

The game must be built as:

1. deterministic simulation platform,
2. persistent world model,
3. event-driven decision loop,
4. dense FM-like UI,
5. sandbox/data lab,
6. deep expansion systems.

---

# Stage 0 — Repository and AI Operating System

## Goal

Create the project foundation so every later AI packet has guardrails.

## Why This Comes First

If the AI starts building features before structure, it will scatter state across components and create an untestable mess.

## Packets

### Packet 0.1 — Repo Skeleton

Size: Medium  
Input: 8k–16k  
Output: 8k–16k

Deliver:
- monorepo or single-app structure
- `/src`
- `/src/sim`
- `/src/data`
- `/src/ui`
- `/src/events`
- `/src/testing`
- `/config`
- `/docs`
- `/scripts`
- `/tests`
- package setup
- lint/test scripts
- README

Acceptance:
- app starts
- tests run
- no game logic yet
- folder purposes documented

### Packet 0.2 — Project Memory Files

Size: Small

Deliver:
- `PROJECT_STATUS.md`
- `DECISION_LOG.md`
- `NEXT_PACKET.md`
- `ARCHITECTURE.md`
- `AI_CODING_RULES.md`

Acceptance:
- every file explains how future AI sessions continue work
- future AI is told not to rewrite architecture casually

### Packet 0.3 — Deterministic Random Utility

Size: Small

Deliver:
- seeded RNG utility
- helper functions
- test coverage

Acceptance:
- same seed produces same results
- random calls can be namespaced by subsystem

### Packet 0.4 — Game Constants and Config Loader

Size: Medium

Deliver:
- config loader
- ruleset loader
- validation for JSON configs
- sample `rulesets/current_fictional.json`

Acceptance:
- no hardcoded global rules
- invalid config fails loudly

---

# Stage 1 — Core Domain Model

## Goal

Build the entities before building screens.

## Why

FM-like depth comes from rich domain state, not pretty cards.

## Packets

### Packet 1.1 — School, Conference, Season Entities

Size: Medium

Deliver:
- TypeScript types/interfaces or equivalent
- school schema
- conference schema
- season schema
- sample data generator
- tests

Acceptance:
- can create fictional conference universe
- schools belong to conferences
- season has calendar shell

### Packet 1.2 — Player Entity v1

Size: Large

Deliver:
- player identity
- position
- class/eligibility
- 1–20 attributes
- hidden traits
- morale shell
- academic shell
- development fields
- serialization
- tests

Acceptance:
- player can be generated deterministically
- player can be saved/loaded
- hidden traits are not exposed by default

### Packet 1.3 — Staff Entity v1

Size: Medium

Deliver:
- staff identity
- role
- attributes
- contract
- personality
- responsibilities shell
- serialization
- tests

Acceptance:
- staff affect no systems yet, but schema is ready

### Packet 1.4 — Prospect Entity v1

Size: Large

Deliver:
- recruit identity
- class year
- hometown/region
- position/archetype
- true ratings
- scouted ranges
- preferences
- hidden traits
- recruitment state by school
- tests

Acceptance:
- uncertainty exists
- true values separate from scouted values

### Packet 1.5 — Finance and Facilities Entities v1

Size: Medium

Deliver:
- budget buckets
- NIL ecosystem
- direct benefits pool
- booster segment shell
- facility ratings
- tests

Acceptance:
- finances are separated into buckets
- facilities have effects but no deep logic yet

---

# Stage 2 — Persistence and Save System

## Goal

Make every system saveable early.

## Packets

### Packet 2.1 — World State Container

Size: Medium

Deliver:
- root `GameWorld`
- schools
- conferences
- players
- staff
- prospects
- finances
- current date/week
- version field

Acceptance:
- all core entities live in one serializable state

### Packet 2.2 — Save/Load JSON

Size: Medium

Deliver:
- save world to JSON
- load world from JSON
- validate version
- tests

Acceptance:
- save/load round trip keeps exact world state

### Packet 2.3 — Migration Framework

Size: Medium

Deliver:
- save version migrations
- migration registry
- tests with old sample save

Acceptance:
- future schema changes do not break saves silently

### Packet 2.4 — Event Log Skeleton

Size: Medium

Deliver:
- append-only event/action log
- actor/action/target/before/after fields
- replay placeholder
- tests

Acceptance:
- every user/sim action can later be audited

---

# Stage 3 — Headless Simulation Foundation

## Goal

Create a non-UI sim loop before dense screens.

## Packets

### Packet 3.1 — Calendar and Continue Loop

Size: Large

Deliver:
- season calendar
- week advancement
- phase detection
- blocking checks placeholder
- tests

Acceptance:
- headless world can advance week by week
- deterministic with seed

### Packet 3.2 — Basic Team Rating Aggregation

Size: Medium

Deliver:
- depth chart placeholder
- aggregate team offense/defense/special teams
- player attributes influence ratings
- tests

Acceptance:
- changing players changes team rating

### Packet 3.3 — Level 1 Game Result Engine

Size: Large

Deliver:
- final score simulation
- simple box score
- home-field effect
- randomness
- injuries placeholder
- tests

Acceptance:
- same seed same result
- better teams usually win but not always
- scores fall in plausible ranges

### Packet 3.4 — Schedule Generator v1

Size: Medium

Deliver:
- generate regular-season schedule
- conference games
- non-conference placeholders
- rivalry placeholders
- tests

Acceptance:
- no team plays itself
- no duplicate impossible games
- home/away plausible

### Packet 3.5 — Season Runner v1

Size: Large

Deliver:
- run full regular season
- standings
- simple postseason placeholder
- summary export

Acceptance:
- 134-team fictional world can run one season headlessly

---

# Stage 4 — Inbox/Event Engine v1

## Goal

Make the Inbox the game loop before polishing feature screens.

## Packets

### Packet 4.1 — Event Schema and Registry

Size: Medium

Deliver:
- event types
- event registry
- event validation
- event priorities
- expiration
- tests

Acceptance:
- events are data-driven
- invalid events fail validation

### Packet 4.2 — Inbox State and Blocking Events

Size: Large

Deliver:
- inbox store
- must-respond events
- continue blocked by critical events
- dismiss/archive/defer
- tests

Acceptance:
- Continue cannot bypass blocking event

### Packet 4.3 — Event Action Handler

Size: Large

Deliver:
- event action buttons map to state changes
- action consequences
- follow-up events
- event log integration
- tests

Acceptance:
- selecting an action changes world state and records log

### Packet 4.4 — First 30 Event Templates

Size: Medium

Deliver categories:
- recruiting
- roster
- game week
- finance
- staff
- compliance

Acceptance:
- events have subjects, bodies, actions, consequences
- no AI-generated ungrounded facts

### Packet 4.5 — Inbox UI v1

Size: Large

Deliver:
- inbox list
- filters
- detail pane
- action buttons
- priority labels
- blocking indicators
- data-testid hooks

Acceptance:
- user can handle inbox events from UI
- UI uses real state

---

# Stage 5 — FM-Like Shell and Navigation

## Goal

Build the dense app shell.

## Packets

### Packet 5.1 — App Shell

Size: Medium

Deliver:
- persistent sidebar
- top bar
- Continue button
- current date/week
- global status area

Acceptance:
- all major sections exist as routes
- Continue calls real sim loop

### Packet 5.2 — Table Framework

Size: Large

Deliver:
- reusable data table
- sorting
- filtering
- column show/hide
- saved views
- row actions
- compare selection

Acceptance:
- future screens use table framework
- not one-off card grids

### Packet 5.3 — Entity Profile Framework

Size: Medium

Deliver:
- profile layout
- tabs
- header summary
- side info rail
- action bar

Acceptance:
- player/staff/prospect profiles can reuse it

### Packet 5.4 — Global Search v1

Size: Medium

Deliver:
- search players/staff/schools/prospects
- quick navigation
- tests

Acceptance:
- search works from any screen

---

# Stage 6 — Roster and Player Management v1

## Goal

Make players feel like FM-style entities.

## Packets

### Packet 6.1 — Roster Table

Size: Large

Deliver:
- roster screen
- dense sortable table
- position/class filters
- morale/eligibility/attributes columns
- saved views

Acceptance:
- roster is not a dashboard card list
- table supports serious comparison

### Packet 6.2 — Player Profile v1

Size: Large

Deliver tabs:
- overview
- attributes
- development
- eligibility
- morale
- reports
- history

Acceptance:
- hidden traits remain hidden unless debug
- profile shows staff opinion, not perfect truth

### Packet 6.3 — Depth Chart v1

Size: Large

Deliver:
- position groups
- starters/backups
- warnings
- drag/drop or action-based assignment
- save/load
- tests

Acceptance:
- depth chart affects team ratings

### Packet 6.4 — Eligibility and Redshirt Logic

Size: Large

Deliver:
- games played
- redshirt status
- eligibility years
- redshirt warnings
- tests

Acceptance:
- impossible redshirt states blocked

### Packet 6.5 — Morale and Transfer Risk v1

Size: Large

Deliver:
- morale factors
- transfer risk calculation
- player meeting event triggers
- tests

Acceptance:
- low playing time can create transfer risk
- promises affect morale/transfer risk

---

# Stage 7 — Recruiting v1

## Goal

Build the core replacement for FM’s transfer market.

## Packets

### Packet 7.1 — Prospect Generator

Size: Large

Deliver:
- class generation
- regional distributions
- archetypes
- true ratings
- public ratings
- scouted ranges
- tests

Acceptance:
- generated class is deterministic and varied

### Packet 7.2 — Recruiting Board UI

Size: Large

Deliver:
- dense table
- filters
- saved views
- add/remove targets
- priority
- staff owner
- interest columns

Acceptance:
- board feels like FM shortlist/search, not a card page

### Packet 7.3 — Recruiting Interest Engine

Size: Large

Deliver:
- interest formula
- school fit
- player preferences
- competitor pressure
- tests

Acceptance:
- changing school prestige/depth/NIL changes interest

### Packet 7.4 — Offer and Contact Actions

Size: Medium

Deliver:
- offer scholarship
- contact recruit
- send staff
- update relationship/interest
- event log

Acceptance:
- actions have costs/cooldowns/consequences

### Packet 7.5 — Scouting Assignment v1

Size: Large

Deliver:
- assign staff
- improve confidence over time
- staff evaluation affects accuracy
- scout report events

Acceptance:
- reports can be wrong
- confidence ranges narrow with scouting

### Packet 7.6 — Commitment and Signing v1

Size: Large

Deliver:
- verbal commit
- signing date
- decommit risk
- signing class
- convert prospect to player
- tests

Acceptance:
- signed recruit carries hidden traits into player entity

---

# Stage 8 — Staff and Responsibilities v1

## Goal

Make staff functional, not cosmetic.

## Packets

### Packet 8.1 — Staff Screen

Size: Medium

Deliver:
- staff overview table
- attributes
- contracts
- workload shell

Acceptance:
- sortable/filterable staff table

### Packet 8.2 — Responsibility Delegation

Size: Large

Deliver:
- responsibility matrix
- assignment modes
- staff ownership
- default settings
- tests

Acceptance:
- at least recruiting/scouting/practice/inbox handling can be delegated

### Packet 8.3 — Staff Reports Engine

Size: Large

Deliver:
- report generation
- accuracy model
- disagreement model
- inbox integration
- tests

Acceptance:
- two staff can disagree about same player/recruit

### Packet 8.4 — Staff Hiring v1

Size: Large

Deliver:
- candidate pool
- search/filter
- offer contract
- hire/fire
- salary budget hook
- tests

Acceptance:
- staff hiring changes program capabilities

### Packet 8.5 — Staff Poaching and Carousel Shell

Size: Medium

Deliver:
- rival interest
- staff leaving risk
- offseason movement
- events

Acceptance:
- good staff can leave

---

# Stage 9 — Practice and Development v1

## Goal

Connect player growth to coaching, reps, personality, and facilities.

## Packets

### Packet 9.1 — Development Tick

Size: Large

Deliver:
- monthly/weekly development
- potential gap
- work rate
- coachability
- staff effect
- facility effect
- random variance
- tests

Acceptance:
- players improve differently
- players can stagnate/regress

### Packet 9.2 — Practice Plan UI

Size: Large

Deliver:
- weekly plan
- focus areas
- fatigue/readiness/injury risk preview
- staff recommendations

Acceptance:
- practice choices influence game readiness and development

### Packet 9.3 — Individual Development Plans

Size: Medium

Deliver:
- assign focus per player
- progress tracking
- staff recommendation

Acceptance:
- player IDP affects targeted attributes over time

### Packet 9.4 — Position Change System

Size: Medium

Deliver:
- recommend position changes
- success probability
- morale effect
- training period

Acceptance:
- position changes are possible but risky

---

# Stage 10 — Finance, NIL, Facilities v1

## Goal

Make resources affect decisions without becoming pure pay-to-win.

## Packets

### Packet 10.1 — Budget Engine

Size: Large

Deliver:
- revenues
- expenses
- budget buckets
- annual reset
- tests

Acceptance:
- overcommitting creates consequences

### Packet 10.2 — NIL Ecosystem v1

Size: Large

Deliver:
- NIL strength
- player NIL expectation
- recruit NIL expectation
- allocation/market pressure
- events

Acceptance:
- NIL affects recruiting and retention

### Packet 10.3 — Direct Benefits v1

Size: Medium

Deliver:
- ruleset-configurable pool
- allocation by player/group
- morale/retention effects
- tests

Acceptance:
- direct benefits separate from NIL

### Packet 10.4 — Booster Segments v1

Size: Medium

Deliver:
- donor groups
- confidence
- meddling events
- restricted gifts

Acceptance:
- boosters can help and create problems

### Packet 10.5 — Facilities v1

Size: Large

Deliver:
- facility ratings
- upgrade projects
- costs/duration
- effects on recruiting/development

Acceptance:
- facility investment has long-term effect

---

# Stage 11 — Game Simulation v2

## Goal

Make outcomes explainable and tied to systems.

## Packets

### Packet 11.1 — Scheme System

Size: Large

Deliver:
- offensive schemes
- defensive schemes
- scheme fit
- staff preferences
- player fit

Acceptance:
- scheme changes team strengths

### Packet 11.2 — Game Plan UI

Size: Large

Deliver:
- offensive plan
- defensive plan
- special teams
- matchup report
- staff recs

Acceptance:
- game plan affects sim inputs

### Packet 11.3 — Practice to Game Readiness

Size: Medium

Deliver:
- readiness/fatigue effects
- opponent prep effects
- tests

Acceptance:
- practice week affects next game

### Packet 11.4 — Drive Engine v1

Size: Large

Deliver:
- drive simulation
- field position
- drive results
- scoring summaries
- tests

Acceptance:
- game produces drive chart

### Packet 11.5 — Postgame Report

Size: Medium

Deliver:
- what worked
- what failed
- key players
- injuries
- recruit/morale effects

Acceptance:
- user can understand why result happened

---

# Stage 12 — Transfer Portal and Retention

## Goal

Make modern CFB roster management chaotic and strategic.

## Packets

### Packet 12.1 — Portal Window and Entry Logic

Size: Large

Deliver:
- portal calendar
- player entry risk
- portal states
- tests

Acceptance:
- players enter portal based on context

### Packet 12.2 — Portal Search UI

Size: Large

Deliver:
- dense table
- filters
- interest
- fit
- eligibility
- NIL expectations

Acceptance:
- portal feels like transfer market

### Packet 12.3 — Portal Recruiting Actions

Size: Medium

Deliver:
- contact
- offer role
- offer NIL/direct benefit
- visit
- commit

Acceptance:
- portal recruits can join roster

### Packet 12.4 — Retention Meetings

Size: Medium

Deliver:
- player meetings
- promises
- transfer prevention actions
- inbox integration

Acceptance:
- user can fight to keep players

---

# Stage 13 — Rankings, Postseason, Awards

## Goal

Make seasons culminate correctly.

## Packets

### Packet 13.1 — Poll/Ranking Engine

Size: Large

Deliver:
- ranking formula
- poll inertia
- SOS
- quality wins
- tests

Acceptance:
- rankings are plausible

### Packet 13.2 — Conference Championship Logic

Size: Medium

Deliver:
- standings
- tie breakers
- title games

Acceptance:
- conference champs resolve correctly

### Packet 13.3 — CFP/Bowl Engine

Size: Large

Deliver:
- configurable playoff
- bowl selection
- bracket
- results

Acceptance:
- postseason works by ruleset

### Packet 13.4 — Awards Engine

Size: Medium

Deliver:
- player awards
- coach awards
- all-conference
- all-american

Acceptance:
- awards track stats and narratives

---

# Stage 14 — Analytics and Data Hub

## Goal

Give the user FM-like depth and tools to diagnose the universe.

## Packets

### Packet 14.1 — Data Hub Shell

Size: Medium

Deliver:
- tabs
- shared chart/table components
- filters

Acceptance:
- analytics sections exist

### Packet 14.2 — Team Performance Metrics

Size: Medium

Deliver:
- success rate-like metrics
- explosiveness
- efficiency
- pace
- trend charts

Acceptance:
- metrics generated from games

### Packet 14.3 — Recruiting Analytics

Size: Medium

Deliver:
- hit rate
- class balance
- scout accuracy
- cost per commit

Acceptance:
- user can evaluate recruiting strategy

### Packet 14.4 — Development Analytics

Size: Medium

Deliver:
- player growth trends
- staff impact
- facility impact
- position group growth

Acceptance:
- user can see if program develops talent

### Packet 14.5 — Financial Analytics

Size: Medium

Deliver:
- budget efficiency
- NIL ROI
- facility ROI
- donor trends

Acceptance:
- finance decisions can be reviewed

---

# Stage 15 — World Simulation and Legacy

## Goal

Make the universe evolve over decades.

## Packets

### Packet 15.1 — Historical Records

Size: Large

Deliver:
- team records
- player records
- coach records
- season archives

Acceptance:
- history persists

### Packet 15.2 — Coach Careers and Trees

Size: Medium

Deliver:
- coach records
- staff promotions
- coaching tree links

Acceptance:
- assistants become part of history

### Packet 15.3 — Dynasty and Collapse Detection

Size: Medium

Deliver:
- dynasty score
- collapse indicators
- media/news hooks

Acceptance:
- game recognizes rising/falling programs

### Packet 15.4 — Conference Realignment v1

Size: Large

Deliver:
- realignment triggers
- invitations
- conference changes
- schedule/postseason effects

Acceptance:
- world can change structure

### Packet 15.5 — Legacy Score and Hall of Fame

Size: Medium

Deliver:
- coach legacy
- program legacy
- player hall/history

Acceptance:
- long careers feel meaningful

---

# Stage 16 — Sandbox and Data Lab

## Goal

Give the player/dev tools to tune and explore.

## Packets

### Packet 16.1 — Advanced Setup Screen

Size: Large

Deliver:
- world rules
- sim knobs
- recruiting knobs
- finance knobs
- presets

Acceptance:
- settings create different worlds

### Packet 16.2 — Commissioner Editor

Size: Large

Deliver:
- edit players
- edit schools
- edit staff
- edit recruits
- edit finances

Acceptance:
- edits save and log

### Packet 16.3 — Batch Sim Runner UI

Size: Large

Deliver:
- run 1/5/20/100 seasons
- progress
- export

Acceptance:
- user can test sim from UI

### Packet 16.4 — Balance Dashboard

Size: Large

Deliver:
- scoring distributions
- recruiting distributions
- injuries
- transfers
- rankings
- finances
- outlier flags

Acceptance:
- user can tune realism

### Packet 16.5 — Preset System

Size: Medium

Deliver:
- save/load sandbox presets
- compare presets
- export/import

Acceptance:
- custom rulesets reusable

---

# Stage 17 — UI Density Pass

## Goal

Make it feel like FM, not a web dashboard.

## Packets

### Packet 17.1 — Nested Tabs Everywhere

Size: Large

Deliver:
- all major sections have sub-tabs
- no shallow single-page sections

Acceptance:
- every primary area has workspace depth

### Packet 17.2 — Saved Views Everywhere

Size: Medium

Deliver:
- saved table views for roster/recruiting/portal/staff/finance

Acceptance:
- power user can customize screens

### Packet 17.3 — Comparison Tools

Size: Medium

Deliver:
- compare players
- compare recruits
- compare staff
- compare programs

Acceptance:
- comparisons are easy and dense

### Packet 17.4 — Staff Recommendation Rails

Size: Medium

Deliver:
- side panels with staff recs on key screens

Acceptance:
- staff voice appears throughout UI

### Packet 17.5 — Keyboard/Power User Flow

Size: Medium

Deliver:
- shortcuts
- quick search
- continue flow
- table navigation

Acceptance:
- game is fast to operate

---

# Stage 18 — QA Harness and AI QC

## Goal

Prevent impossible states and shallow AI-coded bugs.

## Packets

### Packet 18.1 — Invariant Test Suite

Size: Large

Deliver:
- no impossible rosters
- no duplicate players
- valid schedules
- valid eligibility
- valid finances
- valid postseason

Acceptance:
- invariant suite runs after every sim

### Packet 18.2 — Scenario Harness

Size: Large

Deliver:
- curated scenarios
- expected outcomes
- runner

Acceptance:
- edge cases are repeatable

### Packet 18.3 — Statistical Validation

Size: Large

Deliver:
- target ranges
- sim outputs
- pass/fail realism checks

Acceptance:
- sim flags unrealistic distributions

### Packet 18.4 — AI QC Export

Size: Medium

Deliver:
- markdown/json package for AI review
- summary reports
- anomalies

Acceptance:
- AI can review season output efficiently

### Packet 18.5 — Replay System

Size: Large

Deliver:
- event log replay
- bug reproduction
- state diffs

Acceptance:
- bugs are not ghost stories

---

# Stage 19 — Content Expansion

## Goal

Add enough content variety to avoid repetition.

## Packets

### Packet 19.1 — Event Template Expansion to 200+

Size: Large

Deliver:
- recruiting
- roster
- staff
- finance
- game week
- postseason
- world

Acceptance:
- inbox avoids repetitive sameness

### Packet 19.2 — News Template Expansion

Size: Medium

Deliver:
- national
- conference
- rivalry
- awards
- scandal
- recruiting

Acceptance:
- world feels alive

### Packet 19.3 — Name/School/High School Generators

Size: Medium

Deliver:
- synthetic names
- fictional high schools
- regions
- mascots

Acceptance:
- generated world feels plausible

### Packet 19.4 — Player Personality Flavor

Size: Medium

Deliver:
- personality descriptions
- meeting tones
- report phrasing

Acceptance:
- players feel different

---

# Stage 20 — Final Integration and Hardening

## Goal

Turn systems into a coherent playable game.

## Packets

### Packet 20.1 — Full Career Smoke Test

Size: Large

Deliver:
- new career to 5 seasons
- user interactions
- save/load
- no crashes

Acceptance:
- playable career loop exists

### Packet 20.2 — 20-Year Headless Stability

Size: Large

Deliver:
- 20-year sim
- invariant pass
- statistical report

Acceptance:
- no impossible states

### Packet 20.3 — Performance Pass

Size: Medium

Deliver:
- profile slow systems
- optimize sim
- optimize UI tables

Acceptance:
- large universe remains usable

### Packet 20.4 — UX Friction Pass

Size: Medium

Deliver:
- reduce clicks
- improve navigation
- improve warning clarity
- improve Continue flow

Acceptance:
- game feels fast and usable

### Packet 20.5 — Beta Lock

Size: Medium

Deliver:
- known issues list
- feature freeze
- balance presets
- docs

Acceptance:
- stable personal beta

---

# Prompt Library

## Master AI Architect Prompt

```text
You are the AI architect for a private college-football management simulation inspired by Football Manager’s depth.

Your job is not to make a shallow prototype. Your job is to build a deterministic, persistent, menu-dense, data-rich simulation platform.

Always preserve:
- save/load compatibility
- deterministic seeds
- headless simulation ability
- event log
- tests
- dense UI
- configurable rules
- separation between UI and sim

For this packet, only implement the requested scope. Do not rewrite unrelated architecture. If you must change architecture, explain why and update DECISION_LOG.md.
```

## Coding Packet Prompt

```text
Implement this work packet.

Context:
[include relevant docs]

Current project status:
[paste PROJECT_STATUS.md]

Current file tree:
[paste tree]

Task:
[paste packet]

Rules:
- no placeholder-only UI
- no UI-only state
- no hardcoded rules if config belongs elsewhere
- tests required
- save/load updates required when schema changes
- update PROJECT_STATUS.md and NEXT_PACKET.md
- keep changes focused
```

## QA Packet Prompt

```text
Review the current implementation against the packet acceptance criteria.

Find:
- missing requirements
- impossible states
- shallow placeholders
- architecture drift
- missing tests
- save/load issues
- UI-only fake state
- non-determinism

Return:
1. pass/fail
2. blocking issues
3. recommended fixes
4. tests to add
5. next packet recommendation
```

## AI QC Season Review Prompt

```text
You are QA director for a CFB management sim.

Review this exported season/run package.

Find:
- impossible states
- unrealistic outcomes
- boring loops
- repeated events
- broken incentives
- bad AI decisions
- statistical outliers
- missing consequences

For each issue, provide:
- severity
- evidence
- likely system
- proposed fix
- regression test
```

---

# Token-Based Context Strategy

## For Small Packets

Include:
- guiding-light summary
- current packet
- relevant file snippets
- test output

Do not include huge system specs unless necessary.

## For Medium Packets

Include:
- guiding-light summary
- relevant system spec excerpt
- current packet
- current file tree
- relevant existing code
- status files

## For Large Packets

Include:
- guiding-light file
- relevant blowout spec
- current packet
- architecture doc
- status files
- file tree
- existing code summaries
- failing tests
- schema docs

## For Huge Refactors

Do not do in one pass.

Break into:
1. analysis packet
2. proposed plan packet
3. implementation packet
4. test/fix packet
5. cleanup packet

---

# NEXT_PACKET.md Template

```markdown
# Next Packet

## Recommended Packet
[packet name]

## Why This Next
[reason]

## Current State
[what works]

## Known Issues
[bugs/limitations]

## Files to Read
- [paths]

## Files Likely Touched
- [paths]

## Acceptance Criteria
- [ ] ...
```

---

# PROJECT_STATUS.md Template

```markdown
# Project Status

## Current Build Stage
[stage]

## Completed Packets
- [packet]

## Working Systems
- [system]

## Partially Working Systems
- [system]

## Broken / Missing
- [issue]

## Current Test Status
[summary]

## Current Save Version
[number]

## Current Ruleset Version
[number]

## Next Recommended Packet
[packet]
```

---

# DECISION_LOG.md Template

```markdown
# Decision Log

## [Date] — [Decision]

### Decision
[what changed]

### Reason
[why]

### Alternatives Considered
[alternatives]

### Consequences
[impact]

### Revisit When
[condition]
```

---

# Definition of True Playable Alpha

The game reaches playable alpha when:

- user can start a career
- universe generates
- schools/conferences exist
- players/staff/prospects exist
- roster table works
- inbox works
- continue loop works
- recruiting board works
- basic recruiting actions work
- games simulate
- season completes
- save/load works
- basic staff reports exist
- basic player development exists
- postseason resolves
- no impossible states in 5-season sim

---

# Definition of True FM-Like Beta

The game reaches FM-like beta when:

- every major screen is dense and table-driven
- nested tabs exist across systems
- recruiting has uncertainty, visits, promises, commits, flips
- players have hidden traits and development curves
- staff matter and can disagree
- inbox drives decisions every week
- finances/NIL influence recruiting and retention
- transfer portal works
- game results are explainable
- analytics/data hub exists
- sandbox/data lab exists
- 20-year sim is stable
- history/legacy persists
- AI schools behave plausibly
- player can lose hours to “one more Continue”

---

# Final Build Principle

Build vertical truth before horizontal decoration.

A feature is real only when it has:
- data,
- logic,
- UI,
- persistence,
- tests,
- events,
- consequences.

Anything less is a mockup.

