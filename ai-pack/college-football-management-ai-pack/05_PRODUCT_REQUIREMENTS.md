# 05_PRODUCT_REQUIREMENTS

> Use this file as an instruction set for the AI working on the project.

**Read after:** 04_RESEARCH_PROGRAM.md
**Primary outputs required:**
- A full product requirements document for the menus-first management game
- A scope-prioritized system map for prototype, alpha, beta, and 1.0
- A clear definition of the first playable yearly loop
**Stop when:**
- The AI can explain the product’s target player, loops, scope, and release ladder without ambiguity
- The first playable version is small enough to build yet large enough to prove the concept
- Every major feature has a release priority and an owner loop

## Product summary

The product is a **college-football program management sim** focused on the modern realities of running a program:
- roster construction
- high-school recruiting
- transfer retention and acquisition
- staffing and delegation
- player development
- academic / eligibility pressure
- finance and benefit pressure
- conference / ranking / postseason stakes
- long-term institutional identity

The first deliverable is a **deep management game with placeholder on-field resolution**, not a stadium product.

## Target player profiles

### Player type A: the management-sim veteran
This player likes:
- dense tables
- filters
- multi-season planning
- “continue” loops
- hard tradeoffs
- believable world state

They do not need animation to stay engaged. They need consequence and clarity.

### Player type B: the college-football dynasty addict
This player likes:
- roster rebuilding
- recruiting battles
- transfer drama
- program prestige
- rivalry stakes
- postseason movement
- “what if I rebuild a fallen program?” fantasy

They may tolerate more abstraction if the sport flavor feels real.

### Player type C: the spreadsheet / strategy power user
This player likes:
- sortable data
- compare tools
- long-term optimization
- clear systems and levers
- analytics that actually change decisions

## Platform and product stance

### Initial platform
Desktop first.

### Control model
Mouse and keyboard first. Dense information views are a priority.

### Initial mode focus
Single-player career first.

### Commercial posture
Build the fictional product first. Licensing, console adaptation, and visual match expansion are later strategic layers.

## Scope definition

### Core scope
The first serious version must allow the player to:
- select or create a coach identity
- choose a program
- inspect the roster
- plan the depth chart
- run recruiting
- handle portal activity
- manage staff
- allocate development and resource priorities
- track eligibility and redshirts
- simulate a full season
- view standings, rankings, and postseason structure
- enter the next offseason with coherent state

### Deliberately delayed scope
- advanced visual match engine
- console-first UX simplification
- online multiplayer dynasty
- historical real-world eras
- deep legal-contract wording systems
- broadcast presentation layers
- full licensed universe

## Core loops

## 1. Yearly loop

### Offseason start
- assess inherited roster
- assess graduations / departures / portal exits
- hire or adjust staff
- set strategic goals
- allocate major resources

### Acquisition cycle
- recruit high-school talent
- monitor and act on portal movement
- manage retention pressure
- build class shape and future depth

### Preparation cycle
- assign roles
- set depth chart
- choose redshirt plans
- set development priorities
- resolve academic and health concerns

### Season cycle
- play weekly management loop
- monitor standings and rankings
- respond to injuries, morale, and pressure
- adapt objectives and acquisition priorities

### Postseason cycle
- conference-title stakes
- rankings / selection tension
- CFP or bowl progression
- awards and history updates

### Return to offseason
- player departures
- staff movement
- budget shifts
- facility asks
- prestige changes
- historical archive updates

## 2. Weekly loop

A typical week should feel like:

1. open Program Desk
2. clear blocking items
3. review injuries / academics / morale / roster concerns
4. review recruiting and portal opportunities
5. adjust development / practice emphasis
6. review opponent and schedule context
7. simulate game
8. handle consequences
9. update long-term plans
10. continue

## 3. Moment-to-moment decision loop

At the smallest level the game should repeatedly do this:

- show a meaningful update
- provide context
- let the player compare options
- let the player act or delegate
- advance time
- show consequences

If a feature does not serve this loop, it should probably not exist yet.

## Product pillars translated into requirements

### Requirement set A: information density
- all major tables sortable
- multi-filter support
- saved views
- compare flows
- minimal click depth for common tasks
- bulk actions where safe

### Requirement set B: future planning
- current and future depth views
- recruiting board linked to roster needs
- contract/eligibility expirations visible
- multi-year consequences surfaced

### Requirement set C: management pressure
- donor/AD/fan pressure signals
- staff competence matters
- recruiting and portal tension matters
- academic/eligibility consequences matter
- resource limits matter

### Requirement set D: narrative memory
- permanent history log
- awards and records
- rivalry tracking
- coaching history
- season recaps

## Release prioritization

## Prototype (prove the thesis)

### World scale
Use a reduced fictional world.

Recommended starting scale:
- 32 to 48 schools
- 4 to 6 conferences
- reduced but structurally correct roster sizes if needed
- enough prospects and transfers to stress the systems
- simple postseason structure that still tests ranking and bracket logic

### Must include
- new career flow
- roster table
- player profiles
- depth chart planner
- recruiting board
- transfer portal shell
- staff screen
- eligibility tracking
- schedule/results
- standings/rankings
- history log
- save/load

### May use placeholders
- simplified text-based game results
- placeholder logos
- simple budget visuals
- lightweight headline generation

## Alpha (prove the product)

### World scale
Increase toward full-FBS-like scale or a strong near-equivalent fictional scale.

### Must include
- deeper recruiting interactions
- retention risk model
- benefit allocation model
- donor / AD / fan confidence systems
- conference-title and CFP logic
- better history / trophy room
- stronger inbox / notification behavior
- headless multi-season sim stability

## Beta (prove the long career)

### Must include
- balancing across multi-year saves
- stronger analytics
- improved staff AI
- better narrative variety
- richer offseason behavior
- robust migration/save compatibility
- clearer differentiation between program archetypes

## 1.0 (prove the category ambition)

### Must include
- deep and stable full-career experience
- strong competitive differentiators from benchmarks
- mature UI shell and analytics
- long-term historical continuity
- optional richer match presentation path
- credible extensibility for licensed or community content later

## Priority ladder by system

### P0: absolutely required for first playable management loop
- time/calendar
- event/notification system
- roster and player profiles
- depth planning
- recruiting board
- portal board
- staff and delegation
- schedule/results
- standings/rankings/postseason
- save/load
- history base layer

### P1: required for alpha quality
- benefits / NIL environment
- donor and AD pressure
- facility upgrades
- morale/culture
- deeper analytics
- offseason class-shape planning
- richer news generation

### P2: beta / 1.0 improvements
- advanced scouting uncertainty
- deeper coach career paths
- 2D visualization
- mod tooling
- online leagues
- historical scenarios

## Non-goals for early development

Early development is **not** trying to:
- perfectly simulate every NCAA bylaw edge case
- build a 1:1 financial/legal simulator
- match benchmark products feature-for-feature
- fully model every play call on the field
- build a AAA presentation layer
- chase licensing before the fictional product is fun

## User experience requirements

### UX rule 1
The player must understand what changed after each advance.

### UX rule 2
The player must be able to answer “what should I do next?” in under 10 seconds most of the time.

### UX rule 3
The player must be able to answer “why is this happening?” from the relevant screen without opening six unrelated panels.

### UX rule 4
The player must be able to compare options quickly.

### UX rule 5
The player must be able to delegate low-value busywork without losing strategic control.

## Accessibility and readability requirements

- keyboard navigation for major tables and tabs
- readable dense layouts
- strong information hierarchy without giant dead space
- color not being the only status cue
- scalable text and UI density settings later
- reduced animation by default early on

## Product tone

The tone should be:
- serious but readable
- informed but not bloated
- dramatic through consequence, not melodrama
- college-football-specific without parody
- professional rather than cartoonish

## Success metrics for the first playable version

The first playable version is successful if testers say:
- “I always had meaningful decisions”
- “I could feel the roster pressure”
- “I cared about next year while managing this year”
- “The menus felt like the game, not a wrapper around the game”
- “I wanted to hit continue”

## Definition of done for the first real management slice

Done means the player can:
- load into a fictional career
- understand the state of the program
- make offseason roster and staff decisions
- recruit and use the portal
- manage a season week by week
- see the consequences in standings / rankings / history
- reach Year 2 with no impossible roster, eligibility, or save state problems

## Immediate deliverable after reading this file

Produce:
1. a structured PRD
2. a P0 / P1 / P2 feature matrix
3. a definition-of-done checklist for Prototype and Alpha

Then continue to `06_RULES_AND_WORLD_MODEL.md`.
