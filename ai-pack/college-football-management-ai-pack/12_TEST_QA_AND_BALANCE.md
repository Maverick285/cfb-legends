# 12_TEST_QA_AND_BALANCE

> Use this file as an instruction set for the AI working on the project.

**Read after:** 11_IMPLEMENTATION_ROADMAP.md
**Primary outputs required:**
- A full quality strategy covering rules correctness, UI integrity, save safety, long-term simulation health, and game balance
- Concrete test suites and soak-test expectations
- A balance and observability approach that makes iteration safe
**Stop when:**
- The AI can name the tests that prove a milestone is real
- The project can catch impossible states before players do
- Multi-season simulation health can be measured instead of guessed

## Quality thesis

A management sim can look functional while being fundamentally broken.

Typical failure patterns:
- rules work on the obvious case but fail on the edge case
- save/load corrupts long-running careers
- UI shows stale or contradictory state
- long-term sim drift creates absurd worlds
- one strategy dominates because balance was not measured
- inbox/news quality collapses into spam
- history pages contradict the actual season outcomes

This file exists to prevent that.

## Testing commandments

### 1. Test the simulation as a simulation
Do not stop at component tests. Run seasons and careers.

### 2. Test the rules where they are volatile
College-football rules move. Versioned rulesets need ruleset-specific tests.

### 3. Test from the player’s point of view
It is not enough for a command to succeed. The right screens must update correctly.

### 4. Test save safety continuously
Every milestone that changes schema or domain behavior should consider save migration risk immediately.

### 5. Test for nonsense, not just crashes
Absurd but technically valid output still breaks trust.

## Quality stack

### Unit tests
Use for:
- pure calculations
- ruleset validations
- eligibility logic
- recruiting weight calculations
- ranking formulas
- financial allocation checks
- migration functions

### Integration tests
Use for:
- command to event to persistence chains
- app services to simulation core
- content loader plus schema validator
- screen read models fed by real saves

### Scenario tests
Use for:
- realistic end-to-end flows
- milestone definitions of done
- dangerous edge cases

### Soak / simulation tests
Use for:
- 1-season
- 5-season
- 20-season
- deterministic replays by seed

### UI smoke tests
Use for:
- primary navigation
- deep-link flows from inbox
- table sorting/filtering
- no-blank-screen assertions
- save/load reopen flows

### Content validation tests
Use for:
- pack compatibility
- missing references
- illegal enum values
- malformed schedules
- invalid geographic or conference mappings

## Determinism requirements

A deterministic simulation core should allow:
- same seed + same inputs = same result
- reproducible bug reports
- replayable weekly scenarios
- stable soak baselines

Track at least:
- career seed
- ruleset version
- content pack versions
- game build/schema version
- command history or snapshot boundaries

## Minimum automated suites

### Suite A: Schema and content validation
Run on every build.

Checks:
- all JSON/YAML content validates against schemas
- all foreign keys resolve
- all enums are legal
- pack compatibility is declared
- no duplicate IDs
- schedule templates are internally valid

### Suite B: Rules correctness
Run on every build.

Checks:
- portal window legality
- coach-change exception handling
- redshirt threshold logic
- eligibility clock progression
- academic risk gating
- roster-limit compliance
- postseason format legality

### Suite C: Save/load and migrations
Run on every build.

Checks:
- new save writes and reloads cleanly
- golden save files from earlier schema versions migrate
- key world-state hashes survive reload
- history tables survive migration

### Suite D: Full-year simulation
Run routinely and before releases.

Checks:
- career can complete a full season
- standings and rankings update
- postseason resolves
- offseason processes run
- Year 2 loads correctly

### Suite E: UI shell integrity
Run routinely.

Checks:
- all primary screens open
- no dead-end navigation
- inbox links resolve
- sorting/filtering works
- warnings and blockers surface correctly

## Scenario library

### New career bootstrap

- Create a new fictional career from a fixed seed
- Verify every school has valid conference context
- Verify rosters, staff, objectives, and facilities exist
- Save, reload, and compare key hashes

### Redshirt edge case

- Mark a player as a redshirt candidate
- Simulate up to the game-participation threshold
- Confirm redshirt remains preserved
- Cross the threshold and confirm status changes cleanly

### Portal legality

- Attempt portal actions inside and outside legal windows
- Test coach-change exception behavior
- Verify blocked actions produce the right alerts
- Confirm resolved transfers update roster state and history

### Benefit allocation pressure

- Allocate near the maximum budget/benefit pool
- Attempt over-allocation and expect rejection
- Check retention/recruiting effects from the chosen allocations
- Verify finance screens and summaries match source-of-truth values

### Season to postseason

- Simulate a full season from preseason start
- Verify standings and rankings update each week
- Verify conference title resolution
- Verify CFP field, seeding, and bracket progression

### Year rollover

- Complete a season and roll into offseason
- Process graduations, exits, signings, and new arrivals
- Generate next prospect class
- Start Year 2 with coherent history and legal roster state

### Hot-seat and objectives

- Force poor results and recruiting misses
- Verify AD/fan/donor pressure reacts
- Confirm job-security warnings appear
- Check that confidence can recover when performance improves

### Long-term soak

- Run 5-season and 20-season headless simulations
- Track distribution of titles, rankings, roster churn, and budgets
- Verify no fatal errors or impossible states emerge
- Compare distributions against expected sanity bands


## Screen smoke-test checklist

Every primary screen should pass these basics:

### Universal checks
- opens without throwing
- loads source-of-truth data
- empty state is intentional, not broken
- filters and sorts do not desync rows
- linked entity navigation works
- save/load preserves visible state appropriately

### Program Desk
- blocking items appear first
- resolved items clear or archive correctly
- linked entity deep-links work
- Continue state reflects actual blockers

### Roster
- eligibility badges are accurate
- injuries and morale indicators match source data
- filtering by position/class/status works
- player links open the correct profile

### Recruiting Board
- prospect rows reflect latest interest state
- actions update board state correctly
- class needs summaries remain accurate
- commits disappear from open-board workflows appropriately

### Transfer Portal
- legal/illegal actions are indicated correctly
- portal entries appear only in the right windows or exceptions
- destination and fit indicators update properly

### Rankings / CFP
- standings and ranking snapshots match simulation outputs
- bracket visual state matches bracket data
- historical snapshots do not overwrite current data

## “No impossible states” checklist

The game must actively prevent or flag these:

- a player on two rosters at once
- a recruit committed to two schools
- a completed game with no result payload
- a bracket slot with no valid team
- a player both redshirt-preserved and over the participation threshold
- a school with no active head coach when the mode requires one
- portal actions outside the ruleset without an exception
- financial over-allocation without rejection or warning
- history entries referencing deleted non-archived entities

## Balance instrumentation plan

Balance cannot be managed by vibes. Track telemetry from automated sims.

### Roster metrics
- average roster size by season and phase
- position-group shortages
- redshirt usage rates
- class balance and age distribution
- transfer in/out volume

### Recruiting metrics
- average class quality by prestige tier
- geographic concentration
- offer-to-commit conversion rates
- visit effectiveness
- late-cycle flip rates

### Portal metrics
- portal entry rates by class and morale state
- destination quality uplift/downshift
- retention success rate
- roster-repair reliance by school tier

### Competitive metrics
- upset rates
- home-field advantage impact
- ranking volatility
- playoff field distribution
- conference-title concentration
- margin-of-victory distribution if modeled

### Program-health metrics
- fan confidence distribution
- donor confidence distribution
- AD hot-seat triggers
- facility upgrade frequency
- budget stress rate

## Sanity bands

Do not hardcode these forever, but create expected ranges and investigate outliers.

Examples of sanity-band thinking:
- if almost no one ever transfers, the portal system is dead
- if everyone transfers constantly, roster continuity is dead
- if top-tier schools sign every elite prospect every year with no exceptions, the world is too static
- if rankings completely ignore strength of schedule, the postseason feels fake
- if donor sentiment barely moves, facilities and finance become cosmetic

## Narrative QA

Generated text must be checked for:
- contradictory statements
- stale references to old rankings or teams
- inbox spam duplication
- absurd tone
- repeated sentence templates too frequently
- wrong pronouns or role labels if used
- headlines that misstate actual outcomes

Use snapshot tests or sample-generation audits for:
- inbox summaries
- recruiting updates
- playoff/ranking recaps
- injury and staff news
- AD/fan/donor reaction text

## Golden-save strategy

Keep a curated set of saves that represent risky states:
- preseason new career
- midseason with redshirt edge cases
- active portal window with multiple pending transfers
- postseason selection week
- Year 2 rollover
- long-running multi-year career

On every meaningful schema change:
- migrate the golden saves
- compare expected invariants
- inspect history and rankings
- confirm no orphaned references

## Manual QA scripts

Even with automation, run human-readable manual scripts.

### Script 1: First-hour experience
- start a career
- complete setup
- inspect core screens
- make first recruiting moves
- advance through first game week
- confirm no confusion or dead ends

### Script 2: Offseason pressure
- finish season
- lose players to portal
- allocate benefits
- fill holes
- verify player-facing explanations feel fair

### Script 3: Long-view confidence
- jump across multiple years
- inspect history, trophies, and program trends
- verify the world still feels coherent

## Performance and stability checks

Track:
- time to create new career
- time to advance a week
- time to save/load
- memory use during long sim runs
- screen open/render time for large tables

Performance matters because menus-first games rely on fast interaction loops.

## Bug severity framework

### Critical
- crashes
- corrupted saves
- impossible states reaching normal play
- blocked full-season progression

### High
- major rules errors
- broken rankings or postseason
- severe UI desync with source data
- reproducible transfer/recruiting contradictions

### Medium
- explanation mismatches
- notable balance distortions
- notification spam
- stale caches fixed by reload

### Low
- cosmetic issues
- minor wording issues
- formatting inconsistencies
- non-blocking chart oddities

## Release gates for alpha

Before calling the menus-first build an alpha, require:
- passing core rules suites
- passing full-year sim suite
- passing Year 2 rollover suite
- golden-save migrations working
- no unresolved critical bugs
- no known impossible states in normal play
- major screens complete and navigable

## Debug and observability requirements

Build tools for:
- dumping event logs by entity and week
- replaying a career from seed
- inspecting ranking reasoning
- comparing two saves for divergence
- validating roster legality
- graphing key telemetry from soak runs

## Deliverables required from the AI after reading this file

1. Automated test plans for each subsystem
2. Scenario tests tied to milestone definitions of done
3. Golden saves and migration tests
4. Balance telemetry dashboards or scripts
5. Manual QA scripts for critical flows
6. A release-gate checklist

## Completion checklist

The AI is done with this file when it can answer:
- How will the project catch impossible states?
- How will save migrations be trusted?
- How will long-term sim health be measured?
- How will balance be tuned using evidence instead of hunches?
- What must pass before the build is shown to outside testers?
