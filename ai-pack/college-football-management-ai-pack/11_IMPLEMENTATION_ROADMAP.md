# 11_IMPLEMENTATION_ROADMAP

> Use this file as an instruction set for the AI working on the project.

**Read after:** 10_SIMULATION_SYSTEMS.md
**Primary outputs required:**
- A milestone-by-milestone build sequence for the entire project
- Clear entry/exit criteria so the AI does not thrash or skip ahead
- A practical definition of done for the menus-first alpha
**Stop when:**
- The AI can say what should be built next and what absolutely should not be built yet
- Every milestone has test gates and an exit condition
- The project can reach a full Year 2 rollover before any advanced match presentation work begins

## Roadmap thesis

This project should be built in a sequence that always produces a more complete management sim, not a prettier but hollow shell.

The core discipline is:

> **Every milestone must make the yearly loop more real.**

Do not chase “cool” systems that do not strengthen:
- decision quality
- information flow
- save integrity
- season continuity
- long-term consequence

## Build-order commandments

### 1. Never outrun the data model
Do not build UI that depends on facts the data model cannot represent cleanly.

### 2. Never outrun the rules engine
Do not build interactions that assume legal states the ruleset layer cannot validate.

### 3. Never outrun persistence
Do not land major systems without save/load and migration implications considered.

### 4. Never outrun tests
Every milestone must add tests appropriate to what it changes.

### 5. Never outrun the core fantasy
If a feature does not improve the feeling of running a program, it can wait.

## What counts as progress

Good progress:
- a full screen wired to real data
- a subsystem with deterministic tests
- a migration that keeps old saves alive
- a new weekly decision loop that makes Continue feel meaningful
- a validation rule that blocks impossible states
- a better explanation for why something happened

Bad progress:
- placeholder art with no underlying mechanics
- screen mockups with no data source
- giant refactors without milestone payoff
- a shallow play engine while recruiting and roster logic are still broken
- untracked content sprawl

## Milestone sequence

## M0 — Foundation and repo bootstrap

### Objective
Create the repository, toolchain, content loader skeleton, save format shell, and the desktop/app/sim package boundaries.

### Deliverables
- monorepo or modular repo structure
- linting, formatting, test runner, CI basics
- desktop shell booting into placeholder navigation
- rules/content loader with schema validation
- save header structure and migration registry shell

### Required test gates
- project boots cleanly
- schemas validate example content packs
- headless sim package can be imported without UI
- empty save can be created and loaded

### Anti-goals
- no feature work on recruiting, portal, or game sim yet
- no hardcoded real-world data

### Exit condition
The project has clean package boundaries and can load a blank fictional career scaffold.

## M1 — Career bootstrap, time model, and Program Desk

### Objective
Make it possible to create a new fictional career, choose a school, and advance time through a working inbox-driven shell.

### Deliverables
- new career flow
- fictional world generation v1
- calendar/phase engine
- Program Desk / inbox screen
- blocking item system
- basic autosave

### Required test gates
- Continue respects blockers
- new career generation is deterministic from seed
- phase transitions are valid
- inbox items can deep-link into screens

### Anti-goals
- no deep recruiting math yet
- no advanced analytics polish

### Exit condition
A user can start a career, land on Program Home, review inbox items, and advance through preseason without dead ends.

## M2 — Roster, staff, eligibility, and depth planning

### Objective
Make roster management real enough that the player can run a program before recruiting depth exists.

### Deliverables
- Roster screen
- Player Profile
- Depth Chart Planner
- Staff & Responsibilities
- eligibility records
- redshirt tracking
- academic risk placeholders
- hire/fire staff flow

### Required test gates
- eligibility warnings fire correctly
- redshirt preservation works across game counts
- depth chart validation catches illegal or empty states
- staff delegation updates recommendation quality

### Anti-goals
- no portal market yet
- no flashy charting work

### Exit condition
The player can inspect the roster, set roles, manage staff, and survive a season structurally even with placeholder results.

## M3 — Recruiting board, prospects, scouting, and commitments

### Objective
Build the high-school recruiting game loop and make it one of the main reasons to hit Continue.

### Deliverables
- prospect generation
- Recruiting Board
- Prospect Profile
- scouting confidence model
- offer/contact/visit actions
- commitment resolution
- class summary views

### Required test gates
- prospect pools generate correctly by class and region
- school actions change interest
- commitments resolve without contradictory states
- class needs and board summaries stay in sync

### Anti-goals
- no real-world recruiting databases
- no over-modeled social media noise

### Exit condition
A player can manage a full recruiting board through a season and land signed additions in the next roster cycle.

## M4 — Retention, transfer portal, and benefit allocation

### Objective
Add modern roster churn and the financial decisions that make college football distinct right now.

### Deliverables
- transfer risk model
- Transfer Portal screen
- retention conversations
- benefit allocation model
- budget buckets
- donor/fan confidence integration
- roster-limit compliance tools

### Required test gates
- portal windows obey ruleset
- coach-change exceptions are handled
- benefit allocation cannot exceed legal/configured pools
- roster compliance warnings appear before lock deadlines

### Anti-goals
- no marketplace bloat or fake sponsorship minigames
- no direct clone of other games' portal UI

### Exit condition
The user can survive offseason churn, pursue portal fixes, and make meaningful keep-or-let-go decisions.

## M5 — Season competition shell, standings, rankings, and CFP

### Objective
Make the yearly loop complete by simulating actual competition outcomes and postseason stakes.

### Deliverables
- schedule generation or schedule loading
- game result engine v1
- box scores
- Schedule/Results/Opponent Intel screen
- conference standings
- rankings updates
- CFP bracket flow
- history archival v1

### Required test gates
- full season can simulate headlessly
- standings update correctly
- rankings react to results
- postseason bracket is legal for active ruleset
- Year 2 rollover works

### Anti-goals
- no play-by-play engine yet
- no 3D or even 2D field rendering

### Exit condition
A user can play from preseason to postseason, review results, and roll into the next year with coherent history.

## M6 — Finance, facilities, AD pressure, morale, and history depth

### Objective
Deepen the management fantasy beyond roster assembly into full program stewardship.

### Deliverables
- Finances/NIL/Benefits screen
- Facilities/AD/Board screen
- Program Home health cards
- fan/donor/AD pressure models
- morale/promise tracking
- History/Trophy Room
- basic analytics views

### Required test gates
- objective pressure changes are traceable
- facility requests affect long-term program state
- history pages remain consistent over multiple years
- morale reacts to promises and usage changes

### Anti-goals
- no massive content expansion before systems are stable

### Exit condition
The game now feels like running a whole institution, not just filling a depth chart.

## M7 — Balancing, content expansion, and UX refinement

### Objective
Turn the skeleton into a durable alpha through better numbers, clarity, and edge-case handling.

### Deliverables
- balance config pass
- UI table/filter refinement
- notification tuning
- analytics improvements
- multi-season soak results
- fictional content breadth pass
- performance optimizations

### Required test gates
- 1-season, 5-season, and 20-season soak tests pass
- major menus have no dead ends
- notification spam is under control
- save migrations work on golden files

### Anti-goals
- no new giant systems unless they fix a core weakness

### Exit condition
The menus-first alpha is stable, readable, and worth external playtesting.

## M8 — Drive simulation and advanced presentation

### Objective
Only after the management game works, deepen the on-field representation and richer analytics.

### Deliverables
- drive-by-drive simulation
- richer opponent tendencies
- advanced data hub
- optional play-by-play text
- presentation polish

### Required test gates
- drive summaries remain consistent with box scores
- performance stays acceptable
- tactical changes have clear impact

### Anti-goals
- do not let this displace management features already promised

### Exit condition
The game gains richer football flavor without losing the menus-first core.


## Suggested work cycle inside each milestone

For each milestone, the AI should execute this order:

1. restate the milestone objective in plain language
2. identify which numbered docs govern the milestone
3. define the smallest end-to-end vertical slice within the milestone
4. implement domain model changes first
5. implement commands/events and tests
6. wire read models and UI screens
7. run milestone test gates
8. update project status and decision log
9. only then begin the next slice

## Strong sequencing dependencies

### Must exist before M1
- repo/tooling
- content loader
- save header shape

### Must exist before M2
- new career flow
- world generation
- time model
- inbox navigation shell

### Must exist before M3
- roster model
- player/prospect distinction
- staff ratings and responsibilities
- regional content inputs

### Must exist before M4
- recruiting commitments
- roster-limit awareness
- finance buckets
- morale/pressure hooks

### Must exist before M5
- legal rosters
- schedule model
- team strength model
- history tables

### Must exist before M6
- stable season archive
- donor/fan/AD entities
- objective framework

### Must exist before M7
- full-year loop
- golden saves
- soak-test harness
- screen-complete alpha shell

## Phase gates that must not be violated

### Gate A: Menus-first integrity gate
Before any advanced game engine work:
- all core screens exist
- Continue flow is stable
- inbox priorities make sense
- full-year simulation works
- save/load survives year rollover

### Gate B: Year 2 gate
Before calling the product a real alpha:
- the game must survive into Year 2
- recruiting classes must graduate into roster reality
- history pages must show prior season truth
- staffing and finance consequences must persist

### Gate C: Balance gate
Before external testing:
- no obviously broken dominant strategy
- no impossible roster states in soak tests
- recruiting, portal, and rankings produce believable distributions
- notification spam is under control

## Recommended vertical slices inside milestones

### Slice pattern example
A good slice is:
- one user problem
- one data path
- one set of screens
- one simulation consequence
- one test bundle

Example:
“Set a player to likely redshirt, simulate four games, and verify the UI still shows the player as preserving redshirt eligibility until the threshold is crossed.”

That is better than:
“Implement all roster logic.”

## What the AI should produce after each milestone

At minimum:
- updated code or specification artifacts
- passing tests for the milestone scope
- updated `90_PROJECT_STATUS_TEMPLATE.md`
- new entries in `91_DECISION_LOG_TEMPLATE.md`
- a short note on what changed in user-facing terms
- a next-milestone recommendation

## Cut list guidance when scope explodes

If scope pressure appears, cut in this order:

1. cosmetic polish
2. advanced analytics depth
3. media flavor richness
4. tactical game-engine depth
5. secondary long-tail systems

Do **not** cut:
- save integrity
- ruleset accuracy
- roster legality
- recruiting loop
- portal loop
- season continuity
- rankings/postseason integrity

## Definition of done for the menus-first alpha

The menus-first alpha is done when the user can:

- choose a fictional school and start a career
- review an inbox-driven preseason setup
- inspect roster, staff, eligibility, and depth-chart state
- recruit a full prospect class
- manage transfer exits and portal additions
- allocate benefits/budget priorities
- simulate a full season
- view standings, rankings, and CFP outcomes
- archive history and trophies
- roll into Year 2 without broken saves or impossible states

## What should happen after the alpha, not before

Only after the alpha is stable should the roadmap move aggressively into:
- drive-by-drive simulation
- deeper tactical tuning
- advanced analytics lab
- richer media ecosystems
- optional 2D/3D presentation experiments
- expanded content packs

## Deliverables required from the AI after reading this file

1. A milestone tracker tied to the actual repository
2. Slice-level tasks for the current milestone
3. Test gates for each milestone
4. Clear “not now” notes to prevent scope bleed
5. An updated definition of done when project reality changes

## Completion checklist

The AI is done with this file when it can answer:
- What should be built next?
- What must be postponed?
- What proves the current milestone is complete?
- What does “alpha” mean in concrete terms?
- How does the roadmap protect the project from dying in mid-build?
