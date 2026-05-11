# 04_RESEARCH_PROGRAM

> Use this file as an instruction set for the AI working on the project.

**Read after:** 03_DISTINCTNESS_AND_RISK.md
**Primary outputs required:**
- A complete research plan across benchmarks, current college-football rules, and user-facing management patterns
- A screen atlas, interaction pattern library, decision loop map, and benchmark translation matrix
- A current-rules watchlist with source references and freshness notes
**Stop when:**
- The AI has a documented understanding of why benchmark screens exist, not just what they show
- Modern college-football systems have been translated into product requirements and rules concerns
- Research artifacts are structured so later design files can directly consume them

## Research objective

Research enough to make strong design choices without becoming a museum docent.

The goal is **not** to endlessly collect facts. The goal is to learn how great management sims structure decisions and how modern college football changes those decisions.

Research has to answer four big questions:

1. What makes long-form management games addictive and navigable?
2. What makes modern college football structurally different from club soccer?
3. Which benchmark patterns should be preserved, replaced, or reinvented?
4. Which external rules or market conditions are volatile enough to require configurable systems?

## Research streams

Run research in four streams. Do not collapse them into one messy note.

### Stream A: Football Manager structural research
Study FM as a management-interface benchmark.

Focus on:
- inbox / mandatory response flow
- navigation shell
- squad overview
- squad planning / future planning
- scouting and recruitment flow
- board / facilities / long-term infrastructure
- analytics surfaces
- delegation patterns
- filters, tables, comparison flows

Do **not** focus first on:
- cosmetic skinning
- match visuals
- soccer-specific tactical panels that do not translate
- flavor text alone

### Stream B: College-football systems research
Study the current college-football landscape as a rules-and-structure problem.

Focus on:
- recruiting
- transfer movement
- eligibility and redshirt rules
- academic progression / full-time requirements
- NIL and school-directed benefits
- front-office/GM style responsibilities
- conference structure and schedule complexity
- CFP format and ranking logic
- institutional pressure: AD, donors, fans, facilities

### Stream C: Competitor / adjacent product research
Study EA Dynasty and Bowl Bound for:
- college-football player expectations
- recruiting presentation
- portal framing
- history/archive value
- budget/facility/administrative systems
- how much realism players expect to manage from menus

### Stream D: Internal synthesis
Turn research into product decisions:
- what to emulate structurally
- what to reject
- what to translate
- what to invent

## Required research artifacts

### 1. Screen Atlas
One card per benchmark screen or major system.

Each card must include:
- product
- screen/system name
- frequency of use
- problem it solves
- player question answered
- data shown
- actions enabled
- dependencies
- what should replace it in the college-football game
- keep / drop / merge / reinvent judgment

### 2. Interaction Pattern Library
A reusable catalog of interaction patterns that deserve to survive translation.

At minimum include:
- sidebar navigation
- top summary bar
- continue/advance flow
- must-respond state
- quick compare
- saved views
- dense tables
- filter chips
- pinned watches
- delegation matrices
- alerts and escalation levels
- analytics dashboard pinning

### 3. Decision Loop Map
Map the loops that make the experience sticky.

At minimum define:
- yearly loop
- weekly loop
- day/continue loop
- emergency interruption loop
- offseason loop
- recruiting cycle loop
- retention / portal loop

### 4. Benchmark Translation Matrix
Defined in `03_DISTINCTNESS_AND_RISK.md`.

### 5. Rules Volatility Watchlist
Track all rule areas likely to change and note:
- source IDs
- last verified date
- confidence level
- expected product impact if the rule changes

### 6. Player Fantasy Narrative
Write a short narrative explaining what the player thinks they are doing at each major phase of a season. This should inform UI tone and pacing.

## Research method by stream

## Stream A method: Football Manager

For every major FM screen researched, ask:

1. Why does this screen exist?
2. Why does the player return to it often?
3. What decision is easier after visiting it?
4. What data had to be precomputed for it to work?
5. Which part is soccer-specific and which part is universal?
6. What is the college-football equivalent?

### FM screens / systems to study first
- user interface shell
- inbox and must-respond flow
- squad overview
- squad planner
- scouting centre / recruitment focus / shortlist
- team report and dynamics
- club details / board performance / facilities
- data hub

Use source IDs from `99_SOURCES_AND_FACT_BASIS.md` for grounding.

## Stream B method: college football

Research modern college football as if you were designing a rules engine and a front-office sim.

For each topic, ask:
- what is the real-world rule or pattern?
- how stable is it?
- how should it affect gameplay?
- does it belong in deterministic rules, soft simulation, or flavor text?
- what is the minimum fun/useful version for the first playable release?

### Mandatory research topics
- third-party NIL
- school-directed benefits / revenue-share style allocations
- academic and eligibility requirements
- redshirt logic
- transfer windows and exceptions
- immediate eligibility conditions
- roster limits vs scholarship logic
- postseason selection and bracket logic
- GM/front-office responsibilities
- donor/fan/AD pressure
- conference scheduling complexity

## Stream C method: EA Dynasty and Bowl Bound

These are not the main benchmark for UI structure, but they are important for **sport fit**.

### For EA Dynasty, focus on:
- how recruiting is framed emotionally
- how the transfer portal is surfaced
- how coach/program growth is framed
- how scheduling / custom conference constraints are communicated
- how player expectations and retention pressure show up

### For Bowl Bound, focus on:
- budget framing
- summer training / development framing
- historical archive value
- lightweight but serious administrative depth

### Required question for both:
What does this product prove players want to manage from menus in a college-football game?

## Stream D method: synthesis

Research is only useful if it lands in design choices.

Every synthesis note should answer:
- what this means for product scope
- what this means for rules architecture
- what this means for the UI shell
- what this means for the first vertical slice
- what this does **not** mean we should build now

## Recommended artifact formats

## Screen Atlas card template

```md
### [Product] - [Screen/System]

- Frequency of use:
- Core problem solved:
- Main player question:
- Primary data shown:
- Primary actions:
- Input dependencies:
- Why it works:
- What should replace it in our game:
- Keep / Drop / Merge / Reinvent:
- Distinct naming notes:
- Open questions:
- Source IDs:
```

## Interaction Pattern card template

```md
### Pattern: [name]

- Purpose:
- Trigger:
- Information density:
- Why it matters:
- College-football translation:
- Risks if omitted:
- Risks if copied too literally:
- Source IDs:
```

## Decision Loop template

```md
### [Loop Name]

- Starts when:
- Ends when:
- Core questions:
- Key screens used:
- Main actions:
- Consequences created:
- Metrics of success:
- Failure states:
```

## Rules Watchlist template

```md
### [Rule Area]

- Current assumption:
- Source IDs:
- Last verified:
- Volatility:
- Product systems affected:
- Fallback if rule changes:
```

## Research scoring rubric

Use a simple 1–5 scoring pass for benchmark features.

### Value score
How strongly does this feature improve decision quality?

### Fit score
How naturally does it map to college football?

### Distinctness risk
How likely is direct translation to feel cloned?

### MVP necessity
Do we need it in the first playable version?

This prevents vague “this is cool” thinking.

## Minimum research package before design can proceed

Before moving on, the AI must have:

- at least 12 Screen Atlas cards
- at least 10 Interaction Pattern cards
- the full yearly and weekly decision loops
- the benchmark translation matrix
- a volatility watchlist covering the major rules categories
- a one-page synthesis memo

## Common research failure modes

### Failure mode 1: screenshot collecting
A pile of images is not research.

### Failure mode 2: describing instead of abstracting
“this screen has tabs and a left nav” is weak. The useful insight is why the tabs and nav reduce cognitive load.

### Failure mode 3: soccer literalism
A good soccer management pattern may need a different college-football expression.

### Failure mode 4: over-researching volatile trivia
Do not get buried in details that will not affect the first playable management loop.

### Failure mode 5: confusing authenticity with value
A real-world rule only matters if it changes player decisions or systemic consequences.

## Research checkpoints

### Checkpoint A: structural understanding
Can the AI explain how FM’s inbox, squad, planner, scouting, and analytics surfaces reinforce the continue loop?

### Checkpoint B: sport understanding
Can the AI explain how college football differs structurally from soccer management because of recruiting, retention, eligibility, institutional politics, and postseason structure?

### Checkpoint C: translation readiness
Can the AI already outline what the first 10–16 core screens of the new game should be?

If the answer to any checkpoint is no, keep researching.

## Immediate deliverable after reading this file

Produce the following, in this order:
1. Screen Atlas
2. Interaction Pattern Library
3. Decision Loop Map
4. Rules Volatility Watchlist
5. One-page synthesis memo

Then continue to `05_PRODUCT_REQUIREMENTS.md`.
