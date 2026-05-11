# 08_SYSTEM_ARCHITECTURE

> Use this file as an instruction set for the AI working on the project.

**Read after:** 07_MENU_UX_AND_SCREEN_SPECS.md
**Primary outputs required:**
- A concrete architecture for a desktop-first, menus-first management sim
- Package boundaries between UI, app services, simulation core, persistence, and content
- A save/load, migration, and testability strategy that works before advanced visuals exist
**Stop when:**
- The AI can explain where each kind of logic belongs
- The simulation core can run headless without the desktop shell
- Save data, rules data, and UI state are clearly separated

## Architecture thesis

The codebase should be built like a serious business application wrapped around a deterministic sports simulation core.

That means:
- clean boundaries
- boring persistence
- explicit state transitions
- source-controlled content data
- strong testability
- zero reliance on the UI for core behavior

## Recommended high-level shape

Use a **TypeScript-first monorepo** or equivalent modular structure with these top-level responsibilities:

- desktop application shell
- application services layer
- simulation core
- content/rules packages
- persistence layer
- tests and tooling

The exact framework can vary, but the boundaries should not.

## Core architectural principles

### 1. Headless-first simulation
The sim core must run:
- in tests
- in CLI/dev tools
- in background sim runs
- without rendering the UI

### 2. UI is a client of app services
The UI should ask for:
- views
- commands
- status
- search results
- comparisons

It should not reimplement rules.

### 3. Content and rules are loadable data
World content, rulesets, and tuning values should live in data files validated on load.

### 4. Persistence is normalized and versioned
Use a stable save format with schema versioning and migrations.

### 5. Major state changes are explicit
Prefer explicit commands and domain events over ad hoc mutable spaghetti.

## Recommended module boundaries

## Module A: Desktop shell
Responsibilities:
- app startup
- windowing
- navigation shell
- loading saves
- settings
- wiring UI to app services

Does **not** own:
- rules
- simulation calculations
- canonical save state

## Module B: UI layer
Responsibilities:
- render screens
- collect user input
- display tables, filters, charts, alerts
- manage local presentation state

Does **not** own:
- domain truth
- simulation advancement
- long-term data integrity

## Module C: Application services
Responsibilities:
- expose commands to UI
- orchestrate workflows
- load/save careers
- construct read models / view models
- validate user actions before dispatching to sim/domain

Examples:
- `advanceTime()`
- `setDepthChartRole()`
- `assignRecruitPriority()`
- `allocateBenefitTier()`
- `hireStaffCandidate()`

## Module D: Simulation core
Responsibilities:
- world advancement
- event generation
- ranking and bracket resolution
- recruiting / portal / morale / injuries / development calculations
- enforcement of ruleset logic
- deterministic seeded outcomes

This is the real heart of the game.

## Module E: Rules/content loader
Responsibilities:
- load rulesets
- validate content packs
- expose registries for names, schools, conferences, facilities, archetypes, schedules
- protect the app from malformed content

## Module F: Persistence
Responsibilities:
- save/load
- migrations
- snapshots
- normalized storage
- immutable history/event records

## Recommended repository layout

```text
/apps
  /desktop
/packages
  /app-services
  /sim-core
  /domain-model
  /rules-engine
  /content-loader
  /persistence
  /shared-types
  /ui-models
/data
  /rulesets
  /content-packs
  /generated-world
/tests
  /unit
  /integration
  /simulation
  /ui
/docs
  /adr
  /specs
  /reports
/tools
  /worldgen
  /validation
  /balance
```

Keep it boring. Boring is good.

## Domain ownership map

### UI owns:
- temporary sort state
- which columns are visible
- pane expansion state
- tab selection
- compare tray presentation state

### App services own:
- command routing
- view-model assembly
- workflow orchestration
- permission / availability checks

### Sim core owns:
- canonical world state transitions
- tick advancement
- probabilistic but seeded outcomes
- rules enforcement
- historical consequences

### Persistence owns:
- durable storage
- schema migrations
- snapshotting
- integrity checks

### Data packages own:
- rules
- content definitions
- world generation inputs

## State model

Use three state categories:

### 1. Canonical career state
The durable truth:
- season
- schools
- rosters
- staff
- schedules
- history
- ruleset assignment
- budgets
- objectives

### 2. Derived read models
Computed views for screens:
- roster table rows
- recruiting board view
- bracket view
- staff responsibility matrix
- history cards

These should be recomputable.

### 3. Ephemeral UI state
Presentation-only:
- selected filters
- scroll position
- expanded side panels
- compare tray order

Never persist ephemeral UI state as if it were career truth.

## Time advancement model

The game needs an explicit time engine.

### Recommended approach
Model time as:
- season phase
- week index
- day index
- pending event queue

### Advance flow
1. User hits Continue
2. App service asks sim core for next advance
3. Sim core processes scheduled events until:
   - a blocking item occurs
   - the next day ends
   - the next week boundary is reached
   - the configured advance mode completes
4. Domain events are emitted
5. Read models refresh
6. UI shows the resulting state

## Event model

Use domain events for major changes.

Examples:
- `RecruitCommitted`
- `PlayerEnteredPortal`
- `PlayerWithdrewPortalInterest`
- `PlayerRedshirtStatusChanged`
- `CoachHired`
- `InjuryOccurred`
- `BenefitAllocationChanged`
- `RankingSnapshotPublished`
- `CFPBracketSet`
- `FacilityUpgradeApproved`

Benefits of domain events:
- debugging
- history pages
- news generation
- test assertions
- analytics

## Save / load strategy

### Recommended persistence approach
Use:
- normalized relational storage for durable state
- immutable event/history log
- schema version on every save
- deterministic rehydration path

### Save design rules
- every save has a schema version
- every save references a ruleset version
- every save stores worldgen seed(s)
- every save stores canonical state, not only a diff
- every save can run integrity checks on load

### Migrations
Every schema change needs:
- migration step
- test case
- rollback or fallback plan where feasible
- decision-log entry if it changes domain semantics

## Rules integration strategy

Never sprinkle rule checks randomly.

Preferred pattern:
- `rulesEngine.getEligibilityStatus(player, seasonState)`
- `rulesEngine.canEnterPortal(player, context)`
- `rulesEngine.computePostseasonField(worldState)`

This centralizes volatility.

## Read-model strategy

The UI should consume dedicated read models, not raw domain state everywhere.

Examples:
- `RosterTableView`
- `PlayerProfileView`
- `RecruitBoardView`
- `StaffResponsibilitiesView`
- `BracketView`
- `ProgramHomeSummaryView`

These views are cheap to recompute and easy to test.

## Search and indexing

Global search matters in a management sim.

Recommended search index inputs:
- player names
- prospect names
- staff names
- schools
- conferences
- records
- trophies
- headlines
- current alerts

Search indexes should be rebuildable from canonical state.

## World generation support

The architecture must support:
- initial fictional world generation
- deterministic seeded generation
- future content-pack overrides
- generated prospects each cycle
- historical persistence of generated entities

Keep generated content separate from authored base content.

## Narrative / text generation strategy

Narrative should use templates plus structured data first.

### Early approach
- template-driven news
- structured headline variants
- staff memos assembled from event context
- recruit/player quotes from rule-bound fragments

### Why
This avoids:
- hallucinated contradictions
- tone drift
- impossible claims
- brittle reliance on freeform generation

You can add more flexible AI assistance later, but do not let it own core game truth.

## Error handling strategy

### For player-facing issues
Show:
- what failed
- what the impact is
- what the player can do next
- whether the save is safe

### For developer-facing issues
Log:
- command attempted
- state snapshot reference
- ruleset reference
- stack trace / diagnostic context
- reproducibility seed

## Performance principles

Even a dense sim should feel fast.

### Priorities
- snappy table interactions
- quick load/save
- fast continue for small/medium worlds
- long-run sim stability
- no heavy recalculation on every trivial UI click

### Strategies
- cache derived read models where justified
- invalidate intentionally
- use indexes for high-frequency queries
- separate expensive background calculations from UI interactions

## Testing hooks

Architecture must make the following easy:
- create a world from a seed
- load a specific season phase
- run N days/weeks/years
- assert event emissions
- assert no impossible states
- compare expected vs actual bracket logic
- validate save migration

If a system is hard to test, the boundary is probably wrong.

## Recommended ADR topics early

Create Architecture Decision Records for:
- repo/package layout
- save format and migration policy
- rules-engine API shape
- event model
- world generation approach
- read-model strategy
- narrative generation strategy
- test architecture

## Security / integrity stance

This is not primarily a networked product early, but still guard integrity:
- validate all loaded content data
- reject malformed rulesets
- check save integrity on load
- never trust external content packs blindly

## Anti-patterns to avoid

- UI components directly mutating canonical state
- hardcoded volatile rules in multiple places
- using history text as authoritative state
- giant “god services” that do everything
- screen-specific logic duplicating sim logic
- save files tightly coupled to one UI view shape
- freeform AI text driving canonical simulation outcomes

## Immediate deliverable after reading this file

Produce:
1. the package/module boundary map
2. the canonical advance-time flow
3. the save/load and migration policy
4. at least 5 ADR stubs for early architectural decisions

Then continue to `09_DATA_MODEL_AND_CONTENT_PIPELINE.md`.
