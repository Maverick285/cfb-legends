

<!-- FILE: 00_START_HERE_BUILD_GOVERNANCE.md -->

# CFB-FM Build Governance Pack — Start Here

## Purpose

This pack exists to keep the AI from building a shallow fake version of the game.

The project is large enough that the normal AI failure mode is predictable:

```text
It will build screens that look right,
but the underlying systems will be shallow, disconnected, untested, or unsaved.
```

This pack defines how to prevent that.

Use these documents as the **acceptance authority** for every coding packet.

## What This Pack Does

It gives you:

1. a depth gate for every feature
2. a packet acceptance standard
3. system implementation templates
4. AI reviewer prompts
5. QA protocols
6. long-run sim validation requirements
7. anti-placeholder rules
8. release gates
9. codebase audit prompts
10. exact definitions of what “real” means for each system

## Correct Build Mentality

You are not trying to get screenshots quickly.

You are trying to build a simulation that survives:

- save/load
- 20-year sims
- AI-school behavior
- roster edge cases
- NIL edge cases
- recruiting imbalance
- player development drift
- UI density expectations
- statistical validation
- replay/debug review

A pretty screen with fake data is not progress.

## The Core Rule

```text
A feature is real only when it has:
data model,
simulation logic,
persistence,
UI,
events/inbox hooks,
tests,
debug/export tooling,
and validation.
```

If it lacks these, it is either scaffolding or a placeholder.

That is allowed only when the packet explicitly says so.

## How To Use

For every AI coding packet:

1. Give the AI the packet.
2. Give it `01_DEPTH_GATE_AND_ACCEPTANCE_PROTOCOL.md`.
3. Give it the relevant feature rubric from `06_FEATURE_DEPTH_RUBRICS.md`.
4. After coding, run the reviewer prompt from `04_REVIEWER_AND_QA_PROTOCOL.md`.
5. Score the packet using `02_PACKET_COMPLETION_STANDARD.md`.
6. Do not move on until blockers are fixed.

## Recommended Workflow

```text
Builder AI writes code.
Reviewer AI audits code.
QA AI reviews sim outputs.
You accept/reject based on depth gates.
```

The builder should never be the sole judge of its own work.

## Most Important Files

Start with these:

- `01_DEPTH_GATE_AND_ACCEPTANCE_PROTOCOL.md`
- `02_PACKET_COMPLETION_STANDARD.md`
- `03_SYSTEM_IMPLEMENTATION_SPEC_TEMPLATE.md`
- `04_REVIEWER_AND_QA_PROTOCOL.md`
- `06_FEATURE_DEPTH_RUBRICS.md`

## What “Done” Means

For this project, “done” does not mean:

```text
The screen appears.
```

It means:

```text
The system works, persists, affects other systems, passes tests, and produces believable long-run behavior.
```


<!-- FILE: 01_DEPTH_GATE_AND_ACCEPTANCE_PROTOCOL.md -->

# Depth Gate and Acceptance Protocol

## Purpose

This document defines the standard every implemented feature must meet before it is accepted.

The goal is to prevent shallow AI-generated code.

## The Eight-Layer Depth Gate

A feature is not real until it satisfies all applicable layers.

## Layer 1 — Domain Model

The system must have explicit typed data structures.

Required:

- entity types
- IDs
- relationships
- validation rules
- public vs hidden data separation
- serialization shape

Bad:

```text
const recruits = [...]
```

Good:

```text
Prospect entity with true attributes, scouted ranges, preferences, recruitment state, hidden traits, and lifecycle stage.
```

Acceptance questions:

- What data owns this feature?
- Where is the data stored?
- What are the valid states?
- What states are impossible?
- Which fields are hidden from the user?

## Layer 2 — Simulation Logic

The feature must affect the simulation.

Required:

- deterministic logic
- seeded randomness
- formulas or decision rules
- state transitions
- failure states
- effects on related systems

Bad:

```text
Click button, show toast.
```

Good:

```text
Changing practice intensity alters readiness, fatigue, morale, development, injury risk, and team vibe.
```

Acceptance questions:

- What changes when the user acts?
- What happens if the user ignores it?
- What other systems are affected?
- Can it create good and bad outcomes?
- Is the logic deterministic under a seed?

## Layer 3 — Persistence

The feature must survive save/load.

Required:

- save serialization
- load deserialization
- migration consideration
- round-trip test
- save version impact

Bad:

```text
State exists only in React component memory.
```

Good:

```text
Practice plan is stored in GameWorld, saved, loaded, and applied during weekly simulation.
```

Acceptance questions:

- Does it save?
- Does it reload exactly?
- Does it need migration?
- Is the loaded state valid?
- Is there a test proving it?

## Layer 4 — UI

The feature must be accessible and usable.

Required:

- real state
- no mock data unless packet explicitly allows it
- table density where appropriate
- clickable entities
- stable test IDs
- clear action feedback
- navigation back to related entities

Bad:

```text
A pretty card with sample values.
```

Good:

```text
A sortable/filterable table connected to real world state, with row click-through and saved views.
```

Acceptance questions:

- Is every meaningful entity clickable?
- Is the UI connected to real data?
- Are there filters/sorting where FM-like density requires them?
- Does the user understand consequences?
- Are there `data-testid` hooks?

## Layer 5 — Events and Inbox Hooks

Major systems must generate events.

Required:

- event triggers
- event priority
- blocking rules if applicable
- event actions
- consequences
- expiry/follow-up behavior

Bad:

```text
The user must manually check every screen for changes.
```

Good:

```text
A player with rising transfer risk generates an inbox event with meeting options.
```

Acceptance questions:

- When should the user be alerted?
- Can the event block Continue?
- What actions are available?
- What consequences follow?
- Does the event log record it?

## Layer 6 — Tests

The feature must have tests.

Required:

- unit tests for formulas
- integration tests for state changes
- save/load tests for stateful features
- edge case tests
- invariant checks if applicable

Bad:

```text
Manually clicked it once.
```

Good:

```text
Tests prove extreme practice raises readiness and fatigue, save/load preserves plan, and Continue applies effects.
```

Acceptance questions:

- What tests were added?
- What edge cases are covered?
- What impossible states are prevented?
- Do tests fail if the feature is disconnected?
- Is there a regression test for likely bugs?

## Layer 7 — Debug / Export Tooling

Complex systems must be inspectable.

Required:

- debug view or export
- logs
- reason codes
- calculation breakdowns
- validation reports

Bad:

```text
Interest changed but nobody knows why.
```

Good:

```text
Recruiting interest includes reason codes: NIL fit +12, distance -8, playing time +20.
```

Acceptance questions:

- Can we explain the output?
- Can we export it?
- Can AI QC inspect it?
- Does it include reason codes?
- Can we reproduce weird cases?

## Layer 8 — Long-Run Validation

Core sim systems must survive multi-season runs.

Required:

- 1-season sim check
- 5-season sim check
- 20-season sim check for mature systems
- statistical realism report
- anomaly detection

Bad:

```text
Works for one user-clicked case.
```

Good:

```text
After 20 seasons, recruiting class distributions, draft outputs, elite player counts, transfer rates, and NIL deal ranges are plausible.
```

Acceptance questions:

- What happens after 5 years?
- What happens after 20?
- Does talent inflate?
- Do schools become permanently dominant for bad reasons?
- Do unrealistic strategies dominate?

---

# Depth Score

Score every completed packet.

## 0 — Fake

- mock data only
- no real model
- no tests
- no persistence

## 1 — Cosmetic

- UI exists
- little or no logic
- disconnected from sim

## 2 — Basic

- model exists
- simple UI exists
- limited logic
- weak tests

## 3 — Functional

- data + logic + UI + persistence
- tests exist
- basic integration works

## 4 — Integrated

- interacts with other systems
- event hooks exist
- debug/reason codes exist
- edge cases tested

## 5 — Validated

- long-run sim checked
- statistical outputs plausible
- exploits considered
- system balanced enough for current stage

## Acceptance Rule

For scaffolding packets:

```text
minimum score: 2
```

For core systems:

```text
minimum score: 4
```

For mature beta systems:

```text
minimum score: 5
```

## Core Systems That Must Eventually Reach 5

- recruiting
- player development
- practice
- team vibe/morale
- NIL/clearinghouse
- transfer portal
- AI school roster management
- play-by-play simulation
- draft
- finances/facilities
- staff responsibilities
- save/load
- Data Lab
- headless sim runner

---

# The Consequence Test

No feature is accepted unless it proves consequences.

Ask:

```text
If the user changes this, what changes elsewhere?
```

Examples:

## Recruiting

Changing a recruit's money preference must affect NIL-driven interest.

## Practice

Changing intensity must affect development, fatigue, readiness, morale, and injury risk.

## NIL

Changing deal amount must affect clearinghouse review, player morale, recruit interest, and financial pressure.

## Staff

Changing staff evaluator must affect scouting confidence and report quality.

## Team Vibe

Changing leadership/morale must affect transfer risk and close-game performance.

If nothing downstream changes, the feature is shallow.

---

# Anti-Shallow Acceptance Rule

Reject any packet that says:

```text
placeholder
mock
static
randomly
basic for now
TODO later
```

unless the packet explicitly requested scaffolding.

If accepted as scaffolding, record it in `PROJECT_STATUS.md` as:

```text
Scaffolding only — not a real system yet.
```


<!-- FILE: 02_PACKET_COMPLETION_STANDARD.md -->

# Packet Completion Standard

## Purpose

This document defines what every AI work packet must deliver.

It prevents AI from claiming a packet is done when it only built partial or cosmetic output.

---

# Required Packet Output

Every completed packet must end with this report.

```markdown
# Packet Completion Report

## Packet Name

## Summary

## Files Changed

## Domain Model Changes

## Simulation Logic Changes

## Persistence Changes

## UI Changes

## Event / Inbox Hooks

## Tests Added

## Debug / Export Additions

## Save/Load Impact

## Determinism Impact

## Known Limitations

## Acceptance Criteria Checklist

## Depth Score

## Next Packet Recommendation
```

If the AI does not provide this, the packet is incomplete.

---

# Required Proof

## 1. Proof of Real State

The AI must identify where the system state lives.

Example:

```text
PracticePlan lives at GameWorld.practicePlans[schoolId][weekId].
```

Bad:

```text
Practice state is managed locally in the component.
```

## 2. Proof of Determinism

If randomness is involved, the AI must show:

```text
Uses seeded RNG from src/domain/rng.ts.
No Math.random.
```

## 3. Proof of Persistence

If stateful, the AI must show:

```text
Save/load round-trip test added.
```

## 4. Proof of Consequence

The AI must list downstream effects.

Example:

```text
Practice intensity affects fatigue, readiness, morale, and development tick.
```

## 5. Proof of Testing

The AI must list tests by file.

Example:

```text
tests/unit/practice.test.ts
tests/integration/practiceContinue.test.ts
```

## 6. Proof of UI Connection

If UI was added:

```text
The screen reads from GameWorld state and dispatches domain actions.
```

## 7. Proof of Events

If the feature should alert the user:

```text
Events added: practice_fatigue_warning, low_team_vibe_alert.
```

---

# Packet Review Checklist

Before accepting a packet, answer yes/no.

## Architecture

- [ ] Did it avoid unrelated rewrites?
- [ ] Did it follow the repo structure?
- [ ] Did it avoid UI-only state?
- [ ] Did it avoid hardcoded rules?
- [ ] Did it preserve headless simulation?

## Data

- [ ] Are types explicit?
- [ ] Are invalid states prevented?
- [ ] Are hidden fields separated?
- [ ] Are IDs stable?
- [ ] Are relationships clear?

## Simulation

- [ ] Is logic deterministic?
- [ ] Are consequences real?
- [ ] Are formulas explainable?
- [ ] Are reason codes available?
- [ ] Are edge cases handled?

## Persistence

- [ ] Does it save?
- [ ] Does it load?
- [ ] Is there a round-trip test?
- [ ] Is migration considered?
- [ ] Does loading validate state?

## UI

- [ ] Is it connected to real state?
- [ ] Are important things clickable?
- [ ] Is it dense enough for FM-style use?
- [ ] Are there data-testid hooks?
- [ ] Does it avoid fake dashboards?

## Events

- [ ] Does the Inbox surface important changes?
- [ ] Can events block Continue if needed?
- [ ] Do event actions change state?
- [ ] Are events logged?
- [ ] Are duplicates/spam controlled?

## Tests

- [ ] Unit tests exist?
- [ ] Integration tests exist if needed?
- [ ] Edge cases covered?
- [ ] Invariant tests updated?
- [ ] Tests would fail if system were fake?

## Validation

- [ ] Does it export/debug reasons?
- [ ] Does it support headless sim?
- [ ] Has any long-run behavior been checked if applicable?
- [ ] Are statistical targets defined?
- [ ] Are exploit risks listed?

---

# Acceptance Outcomes

## Accept

All required criteria met.

## Accept as Scaffolding

Allowed only if the packet was explicitly foundational.

Must record:

```text
This is scaffolding, not a real gameplay system.
```

## Reject and Fix

Use when:

- tests missing
- state is UI-only
- feature is cosmetic
- consequences missing
- persistence missing
- randomness unseeded
- architecture drift occurred

## Defer

Use when the packet uncovered a larger dependency.

Must create a new packet.

---

# Packet Status Labels

Use these labels in `PROJECT_STATUS.md`.

```text
Not Started
Scaffolded
Functional
Integrated
Validated
Blocked
Rejected
Needs Refactor
```

## Meaning

### Scaffolded

Structure exists, but gameplay depth does not.

### Functional

Basic logic works.

### Integrated

Connected to other systems and events.

### Validated

Long-run/statistical validation passed.

---

# Examples

## Bad Completion Report

```text
Built recruiting screen with sample prospects.
```

Reject.

## Good Completion Report

```text
Built Prospect entity, deterministic generator, scouted ranges, recruiting board table using real state, save/load test, interest formula tests, and event hook for scout report completion.
Depth Score: 3.5.
Known limitation: AI schools not yet recruiting.
```

Accept as functional if packet scope matches.


<!-- FILE: 03_SYSTEM_IMPLEMENTATION_SPEC_TEMPLATE.md -->

# System Implementation Spec Template

## Purpose

Use this template before implementing any major system.

The feature scope docs describe what the system should feel like.
This document forces the AI to specify how it will actually work.

---

# Template

```markdown
# System Implementation Spec: [System Name]

## 1. System Purpose

What problem does this system solve?

## 2. Player Fantasy

What should the user feel when using this system?

## 3. Core Loop

Input → decision → simulation → consequence → feedback.

## 4. Domain Entities

List entities, fields, IDs, relationships, and validation rules.

## 5. Hidden vs Visible Data

What is true internally?
What is shown publicly?
What is shown through scouting/staff opinion?

## 6. State Ownership

Where does the state live in GameWorld?

## 7. Config / Ruleset Dependencies

What belongs in JSON config instead of code?

## 8. Simulation Logic

Formulas, state transitions, and reason codes.

## 9. Randomness

What is random?
What seed namespace is used?
What is the expected distribution?

## 10. User Actions

List actions, requirements, costs, and consequences.

## 11. AI School Actions

How do non-user schools interact with this system?

## 12. Events and Inbox Hooks

What events are generated?
Which are blocking?
What actions do events provide?

## 13. UI Requirements

Screens, tabs, tables, filters, clickable links, test IDs.

## 14. Persistence

Save shape, migrations, round-trip requirements.

## 15. Tests

Unit, integration, scenario, invariant, statistical.

## 16. Debug / Data Lab

What exports or reason codes exist?

## 17. Long-Run Validation

What metrics should be checked after 5/20 seasons?

## 18. Exploit Risks

How might the user cheese this system?

## 19. Acceptance Criteria

Concrete checklist.

## 20. Future Expansion

What is intentionally deferred?
```

---

# Example: Recruiting Implementation Spec Skeleton

## 1. System Purpose

Recruiting models the acquisition of future players through multi-year evaluation, relationship building, NIL-era economics, school fit, visits, promises, and signing decisions.

## 2. Player Fantasy

The user should feel like they are projecting teenagers into future college players, not shopping for known ratings.

## 3. Core Loop

```text
Discover prospect
→ scout/evaluate
→ compare fit
→ allocate staff/resources
→ build relationship
→ manage NIL/playing-time expectations
→ handle competitor pressure
→ secure commitment
→ sign
→ develop
```

## 4. Domain Entities

- Prospect
- RecruitmentState
- ScoutingReport
- Visit
- Offer
- Promise
- RecruitingBoard
- StaffAssignment
- RecruitingClass

## 5. Hidden vs Visible

True attributes are hidden.
Public ratings are imperfect.
Scouted ranges narrow over time.
Staff reports can be biased.

## 6. State Ownership

```text
GameWorld.prospects
GameWorld.recruitingBoards[schoolId]
GameWorld.staffAssignments
GameWorld.events
```

## 7. Config Dependencies

- national recruit counts
- star distribution
- recruiting calendar
- visit limits
- NIL rules
- scouting speed
- decommit volatility

## 8. Simulation Logic

Must include:

- prospect evolution
- interest engine
- scouting confidence
- visit outcomes
- commitment probability
- decommit risk
- AI school recruiting

## 9. Randomness

Use seed namespaces:

```text
recruit_generation
prospect_evolution
recruit_interest
visit_outcome
commit_decision
```

## 10. User Actions

- add to board
- assign scout
- contact
- offer
- schedule visit
- make pitch
- promise
- withdraw
- delegate

## 11. AI School Actions

AI schools must:

- identify needs
- build boards
- offer recruits
- schedule visits
- react to competitor pressure
- fill classes

## 12. Events

- scout report complete
- rival push
- visit result
- decommit risk
- NIL expectation changed
- signing deadline

## 13. UI

Tabs:

- Overview
- Search
- Board
- Visits
- Offers
- Staff Assignments
- Competitors
- Promises
- Analytics

## 14. Persistence

Recruitment state must save/load.

## 15. Tests

- distribution tests
- interest formula tests
- save/load tests
- event tests
- AI recruiting tests

## 16. Debug

Recruit interest must have reason codes.

## 17. Long-Run Validation

- class star distributions
- blue-chip concentration
- AI school behavior
- late bloomer rates
- bust rates

## 18. Exploit Risks

- user always wins recruits by spamming contact
- NIL money dominates everything
- local schools too weak/strong
- high scouting accuracy too early

## 19. Acceptance Criteria

Recruiting is not accepted until signing a class changes future roster and long-run distributions remain plausible.


<!-- FILE: 04_REVIEWER_AND_QA_PROTOCOL.md -->

# Reviewer and QA Protocol

## Purpose

The builder AI should not be trusted to judge its own work.

Use a separate reviewer prompt after every packet.

---

# Reviewer AI Prompt

```text
You are the code reviewer and depth auditor for a private CFB-FM management sim.

Your job is to determine whether the implementation is real or shallow.

Review the packet implementation against:
- packet requirements
- depth gate
- architecture rules
- save/load requirements
- deterministic simulation requirements
- FM-like UI density
- testing requirements

Look for:
1. UI-only state
2. mock data that should be real
3. unseeded randomness
4. missing persistence
5. missing tests
6. missing event hooks
7. shallow formulas
8. no consequences
9. hardcoded rules
10. architecture drift
11. missing reason codes
12. missing long-run validation
13. fake FM-style depth

Return:

# Review Result

## Pass / Fail / Conditional Pass

## Depth Score

## Blocking Issues

## Non-Blocking Issues

## Evidence From Code

## Missing Tests

## Missing Persistence

## Missing Consequences

## Architecture Concerns

## Recommended Fix Packet

## Final Acceptance Recommendation
```

---

# QA AI Prompt For Simulation Output

```text
You are the QA and realism reviewer for a college football management simulation.

Review this exported sim output.

Find:
- impossible states
- unrealistic player development
- unrealistic recruiting distribution
- unrealistic NIL deals
- unrealistic draft outputs
- unrealistic school dominance
- unrealistic transfer volume
- unrealistic scoring
- boring or repetitive event loops
- systems that appear disconnected

For each issue, provide:
1. severity
2. evidence
3. likely cause
4. suggested fix
5. regression test
6. whether it blocks acceptance
```

---

# UI Reviewer Prompt

```text
You are reviewing whether this UI feels like Football Manager-level density.

Check:
- Are there dense tables instead of shallow cards?
- Are rows clickable?
- Are entities linkable?
- Are there filters?
- Are there saved views?
- Are staff recommendations visible?
- Are consequences visible?
- Can a power user spend 20 minutes here making meaningful decisions?
- Does this screen expose real state, not mock data?
- Are data-testid hooks present?

Return:
- FM-density score from 0 to 5
- missing interaction depth
- missing click paths
- missing table features
- recommended UI improvements
```

---

# Architecture Reviewer Prompt

```text
You are reviewing architecture for a Tauri + React + TypeScript + SQLite simulation game.

Check:
- Does simulation logic live outside UI?
- Is state serializable?
- Is randomness seeded?
- Are rules config-driven?
- Are AI services optional?
- Is LLM output prevented from becoming truth?
- Are modules placed correctly?
- Does the feature support headless simulation?
- Are dependencies reasonable?

Return:
- architecture pass/fail
- risky files
- misplaced logic
- refactor recommendations
```

---

# Acceptance Meeting Checklist

Before moving to the next packet, answer:

- [ ] Did the builder produce a completion report?
- [ ] Did reviewer AI pass it?
- [ ] Did tests pass?
- [ ] Did save/load pass if applicable?
- [ ] Did deterministic checks pass?
- [ ] Did UI use real state?
- [ ] Did any placeholder remain?
- [ ] Were limitations recorded?
- [ ] Was `PROJECT_STATUS.md` updated?
- [ ] Was `NEXT_PACKET.md` updated?

If any answer is no, do not advance.


<!-- FILE: 05_LONG_RUN_SIM_VALIDATION_PROTOCOL.md -->

# Long-Run Simulation Validation Protocol

## Purpose

A sports management game can look correct for one week and become nonsense after ten seasons.

This document defines how to validate the simulation over time.

---

# Required Sim Runs

## Early Development

```text
1-season run
```

Purpose:

- check crashes
- check obvious impossible states
- check save/load
- check schedules
- check basic stats

## Functional Systems

```text
5-season run
```

Purpose:

- check player progression
- check recruiting cycles
- check roster churn
- check staff/finance drift
- check initial balance

## Mature Systems

```text
20-season run
```

Purpose:

- check dynasties
- check collapses
- check talent distribution
- check draft outputs
- check NIL inflation
- check school dominance
- check historical persistence

## Sandbox Stress

```text
100-season run
```

Purpose:

- identify deep model drift
- check performance
- check save size
- check long-term absurdities

---

# Required Exports

Each sim run should export:

```text
summary.json
schools.csv
players.csv
prospects.csv
recruiting_classes.csv
games.csv
standings.csv
draft.csv
nil_deals.csv
transfers.csv
injuries.csv
staff.csv
events.csv
anomalies.json
validation_report.md
```

---

# Validation Categories

## Recruiting

Track:

- five-star count
- four-star count
- three-star count
- recruit distribution by state
- recruit distribution by position
- signing class size
- blue-chip concentration
- late bloomer rate
- bust rate
- AI recruiting class quality
- user/AI class imbalance

Red flags:

- too many elite prospects
- one region dominates unrealistically forever
- AI schools ignore positions
- NIL always wins
- local geography irrelevant
- development reputation irrelevant
- five-stars never bust
- three-stars never become elite

## Player Development

Track:

- average attribute growth by class
- elite player count
- 16+ rating player count
- 18+ rating player count
- development by school
- development by staff quality
- development by facilities
- work-ethic effect
- injury regression
- walk-on breakout rate

Red flags:

- talent inflation
- every player improves
- nobody regresses
- hidden traits do not matter
- facilities/staff do not matter
- elite players become too common
- development factories do not emerge

## NIL and Roster Economics

Track:

- NIL deal size distribution
- average deal by position
- clearinghouse flag rate
- approval/denial rates
- walk-on NIL cases
- NIL impact on recruiting
- NIL impact on retention
- locker room jealousy events
- booster involvement

Red flags:

- every good recruit gets absurd money
- no deals are flagged
- too many deals are denied
- walk-ons never matter
- money is the only winning strategy
- NIL has no retention effect

## Transfers

Track:

- portal entries by year
- portal entries by position
- star player transfers
- retention success
- playing-time-driven transfers
- NIL-driven transfers
- coaching-change transfers
- homesickness/location transfers

Red flags:

- everyone transfers
- nobody transfers
- playing time irrelevant
- hidden preferences irrelevant
- user can talk everyone out of transferring
- AI schools cannot retain players

## Games

Track:

- points per game
- yards per play
- turnovers
- upset rate
- blowout rate
- close game rate
- home-field impact
- tempo impact
- scheme diversity
- injury impact
- strength vs wins correlation

Red flags:

- scores too high/low
- elite teams never lose
- underdogs win too often
- scheme does not matter
- tempo always superior
- home field irrelevant
- play-by-play does not match box score

## Draft

Track:

- picks by school
- picks by conference
- first-rounders
- position distribution
- G5 picks
- late bloomer picks
- five-star hit rate
- three-star breakout rate
- school NFL pipeline effect

Red flags:

- same schools dominate forever without causal reasons
- G5 never produces draft picks
- production irrelevant
- traits irrelevant
- school reputation dominates too much
- draft count too high/low

## Schools and Dynasties

Track:

- win distribution
- playoff appearances
- conference titles
- school prestige movement
- donor growth/decline
- facility growth
- recruiting geography effects
- dynasties
- collapses

Red flags:

- SEC/current powers are permanently great by label
- structural school power never changes
- facilities do not matter
- donor base does not matter
- local talent geography does not matter
- no new powers emerge

---

# Validation Report Template

```markdown
# Validation Report

## Run Info

Seed:
Seasons:
Ruleset:
Balance preset:

## Pass / Fail Summary

## Major Anomalies

## Recruiting Distribution

## Player Development

## NIL / Clearinghouse

## Transfers

## Games

## Draft

## School Power / Dynasties

## Impossible States

## Exploit Risks

## Recommended Balance Changes

## Regression Tests To Add
```

---

# Acceptance Gates

## 1-Season Gate

Must pass before playable alpha.

## 5-Season Gate

Must pass before calling any core system functional.

## 20-Season Gate

Must pass before beta.

## 100-Season Gate

Optional but valuable for sandbox/balance maturity.

---

# The Truth Serum Rule

If a feature cannot be evaluated in a headless run, it is probably not really part of the simulation.

Exceptions:

- pure UI preferences
- purely cosmetic assets
- manual creator tools

Everything else should affect exported long-run data.


<!-- FILE: 06_FEATURE_DEPTH_RUBRICS.md -->

# Feature Depth Rubrics

## Purpose

This document defines what “deep enough” means for each major system.

Use these rubrics to judge AI-coded work.

---

# Recruiting Rubric

## Score 0

Static recruit list or mock data.

## Score 1

Recruiting table exists, but recruits do not evolve or make real decisions.

## Score 2

Prospect entity exists with basic interest and offers.

## Score 3

Multi-year prospects, scouted ranges, interest formula, offers, and save/load work.

## Score 4

Recruiting connects to staff, NIL, school fit, visits, promises, AI schools, and events.

## Score 5

20-year sim validates class distributions, late bloomers, busts, AI school recruiting, blue-chip concentration, and signing outcomes.

## Required Proof

- prospects start as sophomores/juniors
- players can develop/stagnate/regress
- scouted ratings differ from truth
- interest has reason codes
- AI schools compete
- signing affects future roster
- NIL is not the only factor

---

# Player Development Rubric

## Score 0

Players have an overall rating only.

## Score 1

Players have attributes but no meaningful progression.

## Score 2

Players improve over time using simple progression.

## Score 3

Development uses hidden traits, potential, staff, practice, playing time, and facilities.

## Score 4

Development supports regression, injuries, position changes, morale, role fit, and staff reports.

## Score 5

Long-run sim validates elite player scarcity, breakout rates, bust rates, draft outputs, and development factories.

## Required Proof

- work ethic matters
- coachability matters
- practice matters
- staff matters
- facilities matter
- injuries can derail careers
- not every player improves
- hidden traits are not perfectly known

---

# Practice Rubric

## Score 0

Practice is cosmetic.

## Score 1

Practice has a slider but weak effects.

## Score 2

Practice allocation affects one stat.

## Score 3

Practice time units, intensity, categories, fatigue, readiness, and morale work.

## Score 4

Practice affects development, injuries, team vibe, game prep, position groups, and events.

## Score 5

Long-run validation proves practice strategies create different but balanced program identities.

## Required Proof

- NCAA/ruleset time cap exists
- intensity has tradeoffs
- players react differently
- staff can recommend/delegate
- extreme practice can backfire
- recovery matters

---

# Team Vibe / Morale Rubric

## Score 0

Single morale number with no effects.

## Score 1

Morale shown but barely affects gameplay.

## Score 2

Morale affects transfer risk.

## Score 3

Team vibe combines morale, leadership, trust, fatigue, wins, and conflict.

## Score 4

Team vibe affects practice, transfers, close games, events, and recruiting perception.

## Score 5

Long-run sim shows culture programs, toxic collapses, and leadership effects without arcade behavior.

## Required Proof

- pep talks can help or hurt
- player personality affects reaction
- leaders matter
- broken promises matter
- team vibe creates events
- vibe does not become a magic win button

---

# NIL / Roster Economics Rubric

## Score 0

Scholarships only.

## Score 1

NIL number exists but does little.

## Score 2

NIL affects recruit interest.

## Score 3

NIL, direct benefits, scholarship status, roster spot, and playing time are separate.

## Score 4

Clearinghouse, booster pressure, locker room jealousy, retention, and walk-on NIL cases exist.

## Score 5

Long-run validation proves NIL market ranges, flag rates, retention effects, and non-money paths to winning are plausible.

## Required Proof

- walk-on can have NIL value
- scholarship status is not economic value
- huge deals can be flagged
- money preference varies by player
- development-focused players exist
- NIL can create problems

---

# Staff Rubric

## Score 0

Staff are names only.

## Score 1

Staff have ratings but no effects.

## Score 2

Staff affect one system.

## Score 3

Staff affect recruiting, development, and scouting reports.

## Score 4

Staff have responsibilities, workload, bias, disagreements, contracts, and poaching.

## Score 5

Long-run sim validates coaching trees, staff movement, staff-driven program identities, and staff quality effects.

## Required Proof

- staff can be wrong
- staff can disagree
- staff can be delegated to
- staff workload matters
- position coaches matter
- staff leaving affects recruiting/development

---

# Game Simulation / Play-By-Play Rubric

## Score 0

Random scores.

## Score 1

Team rating creates score.

## Score 2

Box score and basic player stats exist.

## Score 3

Roster quality, scheme, home field, morale, injuries, and practice affect results.

## Score 4

Structured play-by-play, drives, game plans, tempo, matchups, and postgame reports exist.

## Score 5

Long-run validation proves scoring, upset rates, stat leaders, tempo effects, and scheme diversity are plausible.

## Required Proof

- same seed gives same game
- play-by-play matches box score
- better teams usually win
- upsets happen
- tempo has tradeoffs
- scheme fit matters
- practice readiness matters

---

# Draft Rubric

## Score 0

No draft.

## Score 1

Top-rated players randomly drafted.

## Score 2

Ability and production affect draft.

## Score 3

Position value, traits, size, injuries, production, and school visibility affect draft.

## Score 4

Draft feeds school NFL pipeline, recruiting reputation, player decisions, and staff reputation.

## Score 5

Long-run output resembles real-world draft distributions by school type, conference, position, and star background.

## Required Proof

- school pipeline matters but does not dominate
- G5 players can be drafted
- production matters
- traits matter
- development factories emerge
- draft validates talent model

---

# Custom School / Conference Rubric

## Score 0

Cosmetic names only.

## Score 1

Custom school appears but has no real effects.

## Score 2

Custom school joins world and schedule.

## Score 3

Custom school has structural power, facilities, NIL, town, recruiting geography, and conference membership.

## Score 4

Custom conferences affect revenue, scheduling, prestige, playoff access, rivalries, and recruiting.

## Score 5

Long-run sim shows custom schools/conferences behave plausibly and can rise/fall causally.

## Required Proof

- custom objects use same systems
- no special fake path
- custom conference schedules work
- custom school can recruit/play/develop/save/load

---

# LLM / Narrative Rubric

## Score 0

LLM invents game facts.

## Score 1

LLM writes flavor but no guardrails.

## Score 2

LLM receives structured payloads.

## Score 3

Fallbacks, forbidden-claim validation, and caching exist.

## Score 4

Reports are grounded, varied, staff-personality-aware, and connected to events.

## Score 5

Narrative layer enhances immersion across scouting, media, play-by-play, meetings, and town flavor without corrupting simulation.

## Required Proof

- game works without LLM
- LLM cannot decide facts
- bad output is rejected
- fallback templates exist
- reports cite structured evidence

---

# UI Density Rubric

## Score 0

Static mockups.

## Score 1

Basic pages and cards.

## Score 2

Tables exist.

## Score 3

Tables have sorting/filtering, clickable rows, and real state.

## Score 4

Saved views, comparisons, nested tabs, staff recommendation rails, and drill-down links exist.

## Score 5

Power user can spend 20 minutes on a screen making meaningful decisions.

## Required Proof

- every entity clickable
- no shallow card-only screens
- filters and saved views
- table customization
- breadcrumbs/back navigation
- hover cards or detail panels


<!-- FILE: 07_AI_ROLE_PROMPTS_AND_HANDOFFS.md -->

# AI Role Prompts and Handoffs

## Purpose

Use different AI roles instead of one AI doing everything.

---

# Builder AI

## Role

Implements one packet.

## Prompt

```text
You are Builder AI for the CFB-FM project.

Implement only the assigned packet.

Rules:
- Do not rewrite unrelated architecture.
- Do not use UI-only state.
- Do not use unseeded randomness.
- Do not hardcode config-driven rules.
- Add tests.
- Update project memory files.
- Provide a packet completion report.

If the packet asks for scaffolding, label it scaffolding.
If the packet asks for a real system, do not give placeholder logic.
```

---

# Reviewer AI

## Role

Finds shallow implementation and missing depth.

## Prompt

```text
You are Reviewer AI for the CFB-FM project.

Audit the implementation brutally.

Look for:
- fake data
- UI-only state
- missing tests
- missing save/load
- unseeded randomness
- hardcoded rules
- missing consequences
- missing event hooks
- shallow FM-like UI
- disconnected systems
- missing long-run validation

Give a pass/fail result and required fixes.
```

---

# QA AI

## Role

Reviews sim outputs and realism.

## Prompt

```text
You are QA AI for the CFB-FM project.

Review exported sim data.

You care about realism, impossible states, bad incentives, and long-run drift.

Find:
- unrealistic recruiting
- unrealistic development
- unrealistic NIL
- unrealistic draft
- unrealistic transfers
- unrealistic scores
- permanent dominance without causal reasons
- boring loops
- repeated events
- exploit strategies

Return fixes and regression tests.
```

---

# Architect AI

## Role

Reviews architecture before major changes.

## Prompt

```text
You are Architect AI for the CFB-FM project.

Review the proposed change before implementation.

Check:
- Does it preserve deterministic simulation?
- Does it preserve save/load?
- Does it keep UI separate from sim?
- Does it maintain optional AI services?
- Does it require migration?
- Does it fit the repo structure?
- Does it create future technical debt?

Return:
- approve/reject
- required constraints
- files likely touched
- migration plan
```

---

# Balance AI

## Role

Reviews statistical outputs.

## Prompt

```text
You are Balance AI for the CFB-FM project.

Review multi-season validation reports.

Focus on:
- talent distribution
- team dominance
- development rates
- recruiting class quality
- draft outputs
- scoring
- NIL markets
- transfer volume
- school rise/fall

Suggest parameter changes, not feature bloat.
```

---

# Handoff Template

Every AI session must end with:

```markdown
# Handoff

## What Was Completed

## What Was Not Completed

## Tests Passing

## Known Risks

## Files Most Relevant Next

## Recommended Next Packet

## Warnings For Next AI
```

---

# Context Packing Rule

Do not give every document to every AI.

## Builder Packet Context

Include:

- master build prompt
- engine architecture
- AI coding protocol
- current packet
- relevant rubric
- current project status
- file tree
- relevant code files

## Reviewer Context

Include:

- packet
- diff/files changed
- depth gate
- rubric
- tests
- project status

## QA Context

Include:

- validation output
- relevant system spec
- target ranges
- anomaly report

---

# Bad AI Behavior To Watch For

- inventing features not asked for
- ignoring tests
- making UI pretty but fake
- using local state
- skipping persistence
- claiming “done” without proof
- adding random mock data
- putting sim formulas in components
- letting LLM decide game facts
- hardcoding modern rules
- hiding errors instead of failing loudly


<!-- FILE: 08_PROJECT_MEMORY_AND_DOC_CONTROL.md -->

# Project Memory and Documentation Control

## Purpose

Large AI-built projects fail when context gets lost.

This document defines the project memory system.

---

# Required Memory Files

## PROJECT_STATUS.md

Tracks what exists.

Must include:

- current stage
- completed packets
- working systems
- scaffolded systems
- broken systems
- current test status
- save version
- ruleset version
- next packet

## DECISION_LOG.md

Tracks architectural decisions.

Use when:

- changing architecture
- changing data model
- changing save format
- adding/removing a major dependency
- changing simulation philosophy
- changing AI integration

## NEXT_PACKET.md

Tells the next AI exactly what to do.

Must include:

- recommended packet
- why it is next
- files to read
- files likely touched
- acceptance criteria
- known risks

## ARCHITECTURE.md

Explains system structure.

Must include:

- layers
- state ownership
- sim/UI separation
- persistence
- AI service boundaries
- testing strategy

## AI_CODING_RULES.md

Short rule list for every AI session.

---

# Documentation Update Rule

Every packet must update at least one of:

- PROJECT_STATUS.md
- NEXT_PACKET.md

If architecture changed, update:

- DECISION_LOG.md
- ARCHITECTURE.md

If coding rules changed, update:

- AI_CODING_RULES.md

---

# Decision Log Format

```markdown
## YYYY-MM-DD — [Decision]

### Decision

### Reason

### Alternatives Considered

### Consequences

### Revisit When
```

---

# Status Format

```markdown
# Project Status

## Current Stage

## Completed Packets

## Functional Systems

## Integrated Systems

## Validated Systems

## Scaffolded Only

## Broken / Missing

## Current Test Status

## Current Save Version

## Current Ruleset Version

## Next Recommended Packet
```

---

# System Status Definitions

## Not Started

No real work.

## Scaffolded

Files/types/routes exist, but gameplay depth does not.

## Functional

Basic system works.

## Integrated

Connected to related systems, events, and persistence.

## Validated

Long-run/statistical validation passed.

## Needs Refactor

Works but violates architecture or depth standards.

## Blocked

Cannot proceed without another dependency.

---

# Document Hygiene Rules

- Do not let docs become vague.
- Record limitations explicitly.
- Record placeholders explicitly.
- Record debt immediately.
- Do not delete old decisions silently.
- Do not let AI rewrite core docs without reason.
- Version major scope documents.

---

# Scope Control

New ideas are allowed.

But every new idea must be classified:

```text
Core Alpha
Beta
Expansion
Sandbox
Cosmetic
Research Needed
```

Do not let expansion ideas invade alpha unless they support core simulation.

---

# New Idea Intake Template

```markdown
# Idea Intake

## Idea

## Why It Matters

## Affected Systems

## Alpha/Beta/Expansion

## Data Needed

## Risks

## Minimum Implementation

## Full Implementation

## Acceptance Criteria
```


<!-- FILE: 09_BUG_REGRESSION_AND_REPLAY_PLAYBOOK.md -->

# Bug, Regression, and Replay Playbook

## Purpose

A simulation game creates weird bugs.

This document defines how to capture, reproduce, and prevent them.

---

# Bug Report Template

```markdown
# Bug Report

## Summary

## Severity

## Seed

## Save File

## Week/Season

## Ruleset

## Steps To Reproduce

## Expected Behavior

## Actual Behavior

## Relevant Event Log Entries

## Screenshots / Output

## Suspected System

## Regression Test Needed
```

---

# Severity

## Critical

- save corrupts
- game cannot continue
- impossible state breaks sim
- crash

## High

- major system wrong
- unrealistic exploit
- roster/eligibility broken
- recruiting/signing broken

## Medium

- bad calculation
- UI misleading
- event wrong
- balance issue

## Low

- copy issue
- minor UI issue
- rare flavor problem

---

# Replay Requirement

Every user/sim action should eventually log:

```json
{
  "tick": "2031-WEEK-07",
  "actor": "school_ou",
  "action": "offer_scholarship",
  "target": "prospect_123",
  "before": {},
  "after": {},
  "reasonCodes": []
}
```

Goal:

```text
Every weird state can be reproduced.
```

---

# Regression Test Rule

Every fixed bug must add a test unless impossible.

If no test is added, explain why in the bug report.

---

# Common Bug Classes

## Save/Load Bugs

Symptoms:

- state disappears
- hidden traits exposed
- events duplicate
- dates reset
- custom school loses data

Required tests:

- round-trip save/load
- migration load
- hidden/public view test

## Determinism Bugs

Symptoms:

- same seed produces different result
- replay diverges
- AI school behavior changes randomly

Required tests:

- same-seed equality
- different-seed difference
- no Math.random scan

## Roster Bugs

Symptoms:

- duplicate player
- player on two teams
- invalid eligibility
- impossible redshirt
- no positions

Required tests:

- invariant check
- scenario test

## Recruiting Bugs

Symptoms:

- recruit signs twice
- interest unexplained
- all recruits pick money
- AI schools ignore needs

Required tests:

- signing invariant
- interest reason code test
- AI board-building test

## NIL Bugs

Symptoms:

- absurd deals approved
- all deals denied
- walk-ons impossible
- NIL does not affect behavior

Required tests:

- clearinghouse thresholds
- walk-on NIL
- retention effect

## Development Bugs

Symptoms:

- everyone improves
- nobody improves
- elite talent inflates
- hidden traits irrelevant

Required tests:

- growth distribution
- regression case
- hidden trait impact

---

# Anomaly Report

Headless sim should output anomalies:

```json
{
  "severity": "high",
  "system": "recruiting",
  "message": "One school signed 19 five-star recruits.",
  "season": 2034,
  "schoolId": "school_x",
  "suggestedTest": "recruiting_class_concentration_limit"
}
```

---

# Fix Packet Template

```markdown
# Fix Packet

## Bug

## Root Cause

## Files To Change

## Required Fix

## Regression Test

## Acceptance Criteria
```


<!-- FILE: 10_CODEBASE_AUDIT_PROMPTS.md -->

# Codebase Audit Prompts

## Purpose

Use these prompts periodically to catch project drift.

---

# Full Codebase Architecture Audit

```text
Audit this CFB-FM codebase for architecture drift.

Check:
- simulation logic in UI components
- UI-only state
- unseeded randomness
- hardcoded rules
- missing save/load coverage
- missing tests
- missing event logs
- broken folder structure
- optional AI services becoming required
- LLM output used as truth
- mock data still present
- shallow placeholder systems

Return:
1. critical issues
2. high priority issues
3. medium issues
4. recommended refactor packets
5. files to inspect first
```

---

# Save/Load Audit

```text
Audit save/load safety.

Check:
- every stateful entity is serialized
- hidden traits stay hidden in public views
- version field exists
- migrations exist
- round-trip tests exist
- custom schools/conferences save
- events save
- action log saves
- generated asset references save

Return:
- pass/fail
- missing state
- migration risks
- tests to add
```

---

# Determinism Audit

```text
Audit deterministic simulation.

Check:
- no Math.random in sim
- seeded RNG used consistently
- seed namespaces used
- same seed reproduces same results
- event order deterministic
- AI services cannot alter sim state
- replay can reproduce state

Return:
- files with risk
- fixes
- tests
```

---

# FM UI Density Audit

```text
Audit whether the UI is becoming too dashboard-like.

Check:
- card-heavy screens
- missing sortable tables
- missing filters
- missing saved views
- missing clickable links
- missing nested tabs
- missing comparison tools
- missing staff recommendations
- screens with low decision density

Return:
- FM-density score by screen
- required improvements
- screens to refactor first
```

---

# System Consequence Audit

```text
Audit whether systems actually affect each other.

For each system:
- recruiting
- development
- practice
- team vibe
- NIL
- staff
- game sim
- draft
- finance
- town immersion

Check:
- upstream inputs
- downstream consequences
- events generated
- debug reason codes
- tests proving consequences

Return:
- disconnected systems
- shallow systems
- required integration packets
```

---

# Mock Data Audit

```text
Find all mock/static/sample data still used in gameplay.

Classify:
- acceptable fixture
- test-only fixture
- unacceptable gameplay mock
- placeholder requiring replacement

Return file paths and replacement plan.
```

---

# Balance Drift Audit

```text
Review validation reports for balance drift.

Check:
- talent inflation
- school dominance
- NIL inflation
- transfer volume
- scoring drift
- draft concentration
- development imbalance
- recruiting class imbalance

Return:
- likely parameter causes
- suggested tuning
- tests to add
```


<!-- FILE: 11_MINIMUM_REAL_SYSTEM_DEFINITIONS.md -->

# Minimum Real System Definitions

## Purpose

This document defines the minimum standard for each system to be considered “real.”

Use this when the AI claims a system is done.

---

# Real Recruiting System

Minimum:

- multi-year prospects
- true vs scouted ratings
- hidden preferences
- school interest formula
- staff scouting
- offers
- recruiting board
- AI school competition
- signing
- save/load
- events
- tests

Not real:

- static prospect table
- single interest number with no reasons
- no AI schools
- no scouting uncertainty
- no signing effect

---

# Real Player Development System

Minimum:

- granular attributes
- hidden traits
- potential
- development curve
- practice effects
- staff effects
- playing time effects
- injuries/regression
- save/load
- tests

Not real:

- OVR increases yearly
- all players improve
- potential perfectly known
- no hidden traits

---

# Real Practice System

Minimum:

- ruleset time cap
- weekly allocation
- intensity
- categories
- effects on readiness/fatigue/morale/development
- staff recommendations
- events
- tests

Not real:

- cosmetic practice slider
- no tradeoffs
- no player-level effects

---

# Real Team Vibe System

Minimum:

- morale inputs
- leadership inputs
- coach trust
- fatigue
- conflict
- broken promises
- performance effects
- transfer effects
- pep talks
- tests

Not real:

- one morale number displayed with no consequences

---

# Real NIL System

Minimum:

- NIL expectations
- school NIL market
- donor/booster influence
- player money preference
- walk-on NIL support
- direct benefits separate from NIL
- clearinghouse review
- effects on recruiting/retention
- tests

Not real:

- NIL as a single budget number
- scholarships as only roster economy

---

# Real NIL Clearinghouse

Minimum:

- market value estimate
- proposed deal amount
- risk score
- review status
- reason codes
- configurable thresholds
- events/friction
- tests

Not real:

- arbitrary approve/deny
- no reason codes
- no market model

---

# Real Staff System

Minimum:

- staff attributes
- personalities
- responsibilities
- scouting bias
- reports
- delegation
- contracts
- workload
- effects on recruiting/development/practice
- tests

Not real:

- staff names and ratings only

---

# Real Play-By-Play System

Minimum:

- structured play events
- down/distance
- clock
- field position
- play type
- result
- involved players
- box score consistency
- template text fallback
- tests

Not real:

- random text disconnected from stats

---

# Real Draft System

Minimum:

- player ability
- production
- position value
- traits
- size thresholds
- injuries
- competition level
- school pipeline
- draft results
- recruiting reputation feedback
- validation report

Not real:

- top OVR players drafted in order

---

# Real Custom School

Minimum:

- school entity
- location
- conference
- structural power
- facilities
- NIL market
- recruiting geography
- colors/identity
- schedule participation
- save/load
- tests

Not real:

- renamed existing school only

---

# Real Custom Conference

Minimum:

- conference entity
- teams
- schedule rules
- prestige
- media/revenue
- championship rules
- playoff access
- save/load
- tests

Not real:

- visual grouping only

---

# Real Town Immersion

Minimum:

- town profile
- culture tags
- location fit
- recruiting visit effects
- morale/homesickness effects
- event/media flavor
- curated content
- no giant lore dump

Not real:

- static wiki page

---

# Real LLM Integration

Minimum:

- service interface
- grounded payloads
- forbidden claim validation
- fallback templates
- caching
- optional/offline mode
- tests

Not real:

- direct model calls from UI
- LLM inventing game facts

---

# Real Asset Generation

Minimum:

- asset service interface
- async queue
- generated asset metadata
- local storage
- fallback images
- regenerate/lock
- save/load references

Not real:

- images generated manually with no pipeline


<!-- FILE: 12_STOPLIGHT_RELEASE_GATES.md -->

# Stoplight Release Gates

## Purpose

This document defines when the project can move between development phases.

---

# Gate Colors

## Red

Do not proceed.

Examples:

- save/load broken
- deterministic sim broken
- core tests failing
- major UI-only state
- recruiting signs duplicate players
- Continue bypasses blocking events
- LLM controls sim facts

## Yellow

Proceed only if recorded.

Examples:

- scaffolded UI exists
- limited placeholder
- partial tests
- feature not integrated yet
- balance not validated
- known bug with workaround

## Green

Proceed.

Examples:

- tests pass
- persistence works
- consequences proven
- event hooks exist
- validation acceptable for current stage

---

# Alpha Gate

Before playable alpha:

- [ ] app starts
- [ ] save/load works
- [ ] deterministic RNG works
- [ ] world generation works
- [ ] calendar/Continue works
- [ ] basic inbox works
- [ ] roster table works
- [ ] player profiles work
- [ ] prospect generation works
- [ ] recruiting board works
- [ ] basic practice works
- [ ] basic game sim works
- [ ] structured play-by-play exists
- [ ] basic NIL exists
- [ ] one-season headless sim works
- [ ] core invariants pass

Red blockers:

- no save/load
- no deterministic sim
- UI-only core state
- no tests

---

# Beta Gate

Before FM-like beta:

- [ ] recruiting reaches depth score 5
- [ ] development reaches depth score 5
- [ ] practice reaches depth score 5
- [ ] NIL/clearinghouse reaches depth score 5
- [ ] staff reaches depth score 4+
- [ ] play-by-play reaches depth score 4+
- [ ] draft reaches depth score 4+
- [ ] AI schools behave plausibly
- [ ] 20-year sim passes validation
- [ ] UI density pass complete
- [ ] Data Lab works
- [ ] custom schools/conferences work
- [ ] LLM/asset services optional
- [ ] history persists

Red blockers:

- 20-year sim nonsense
- AI schools broken
- recruiting imbalance
- talent inflation
- unexplainable results
- no long-run validation

---

# Personal Release Gate

Before calling a build “good enough to play seriously”:

- [ ] can play 5 seasons without crash
- [ ] recruiting feels meaningful
- [ ] development creates surprises
- [ ] NIL creates tradeoffs
- [ ] practice matters
- [ ] losses make sense
- [ ] wins feel earned
- [ ] players have identities
- [ ] schools rise/fall causally
- [ ] no dominant exploit discovered
- [ ] you want to hit Continue again

---

# Expansion Gate

Do not add expansion features until core loops work.

Expansion features include:

- stadium builder
- uniform designer
- full play designer
- career mode
- conference commissioner mode
- full town immersion packs
- AI fight songs
- 2D visualizer

Allowed earlier only if they support core testing or creator foundations.

---

# Feature Freeze Rule

When approaching alpha or beta, stop adding ideas.

Switch to:

- bug fixing
- integration
- balance
- UI friction
- long-run validation
- content repetition reduction

A deep smaller game beats a giant shallow one.


<!-- FILE: 13_MASTER_DEPTH_GUIDE.md -->

# CFB-FM Master Depth Guide

## The Real Standard

This project is not finished when it has:

- screens
- buttons
- menus
- sample data
- nice reports

It is finished when the systems underneath produce believable college football over time.

## The Guiding Question

For every feature, ask:

```text
Does this create meaningful consequences over multiple seasons?
```

If no, it is not core simulation.

## The “One More Continue” Chain

The target game loop:

```text
Inbox event
→ meaningful decision
→ hidden/system consequence
→ time advances
→ world reacts
→ new information appears
→ user investigates
→ user decides again
```

Everything should feed this.

## The Key Interconnected Loops

### Recruiting Loop

```text
discover
→ scout
→ evaluate fit
→ allocate resources
→ compete
→ sign
→ develop
→ validate evaluation
```

### Development Loop

```text
choose player
→ assign plan
→ practice
→ game reps
→ morale/health
→ growth/regression
→ role changes
```

### NIL Loop

```text
player/recruit expectation
→ market estimate
→ offer/deal
→ clearinghouse/friction
→ morale/recruiting effect
→ locker room/booster consequence
```

### Practice Loop

```text
time allocation
→ intensity
→ readiness
→ fatigue
→ development
→ injury risk
→ team vibe
→ game outcome
```

### Dynasty Loop

```text
staff/recruiting/development
→ wins
→ prestige/NIL/draft
→ better opportunities
→ higher expectations
→ pressure/collapse risk
```

## What Makes It FM-Like

Not soccer.

Not licenses.

Not exact screens.

FM-like means:

- dense information
- uncertainty
- staff opinions
- hidden traits
- sortable tables
- click-through everywhere
- small decisions
- consequences over time
- readable reports
- delegation
- one more Continue

## What Makes It CFB

- recruiting starts early
- player projection matters
- development matters
- NIL-era economics matter
- boosters matter
- location matters
- town/campus fit matters
- transfer portal matters
- practice/culture matter
- draft pipeline matters
- conferences matter
- rivalries matter
- school resources are causal

## The Anti-Magic Rule

No school should be good forever because of a label.

Dominance must come from:

- donor base
- alumni base
- facilities
- recruiting geography
- development
- staff
- NIL market
- NFL pipeline
- fan intensity
- conference opportunity
- media exposure
- recent success

If those change, the school changes.

## The Anti-Arcade Rule

Off-field events should feel real but not sensational.

Allowed:

- missed class
- minor citation
- social media issue
- team meeting issue
- academic warning
- attitude conflict

Avoid:

- extreme crimes
- edgy drama
- cartoon scandals
- constant chaos

## The AI Rule

AI services make the world feel human.

They do not decide truth.

```text
Sim creates facts.
LLM writes language.
Image model creates assets.
Database stores truth.
```

## Final Acceptance Mantra

```text
No fake systems.
No shallow screens.
No hidden UI state.
No unseeded randomness.
No untested consequences.
No moving on without proof.
```
