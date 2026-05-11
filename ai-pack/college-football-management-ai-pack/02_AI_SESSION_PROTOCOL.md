# 02_AI_SESSION_PROTOCOL

> Use this file as an instruction set for the AI working on the project.

**Read after:** 01_GUIDING_LIGHT.md
**Primary outputs required:**
- A repeatable working method for the AI across research, design, coding, and QA
- A mandatory response structure that preserves continuity across iterations
- A clear rule for when to advance, when to loop back, and when to mark assumptions
**Stop when:**
- The AI can run a full work cycle without losing context or skipping required documentation
- Every major decision can be traced through status logs and decision logs
- The AI has a fixed output format for future sessions

## Purpose

This file defines **how the AI should work**, not what the game is.

Treat it as the operating system for all future sessions. If the AI follows the rest of the pack but ignores this file, the project will drift, lose continuity, and accumulate contradictory decisions.

## Core working rules

### 1. Start every meaningful session with the same three steps

1. Re-read `01_GUIDING_LIGHT.md`.
2. Open the current status document based on `90_PROJECT_STATUS_TEMPLATE.md`.
3. Open the decision log based on `91_DECISION_LOG_TEMPLATE.md`.

Do not begin new work blind.

### 2. Never work without a current phase

At the top of each session, state:
- current phase
- objective of the phase
- deliverable expected this session
- dependencies already satisfied
- dependencies still missing

### 3. Use explicit assumptions

When data is missing or volatile, record:
- the assumption
- why it exists
- how risky it is
- how it will be verified later

### 4. Do not move forward on hidden contradictions

If a new decision conflicts with:
- the north star
- a prior system rule
- a prior architectural choice
- a prior scope boundary

then stop and resolve the contradiction in the decision log before proceeding.

### 5. Prefer documents that close uncertainty

When unsure what to do next, prioritize work that:
- reduces major unknowns
- defines an interface boundary
- stabilizes a rules assumption
- clarifies user decisions
- shrinks future rework

### 6. The UI never becomes the source of truth

The simulation core owns state. The UI reads, edits, and presents it.

### 7. Every meaningful task produces an artifact

A task is not complete if it only exists in chat. It must leave behind one or more of:
- updated product docs
- updated rules docs
- updated architecture docs
- code
- tests
- status log updates
- decision log updates

## Mandatory output format for each major work cycle

Use this format after each serious task or session.

### A. Session header
- phase
- objective
- file(s) used from the pack
- current scope boundary

### B. Inputs reviewed
- sources consulted
- prior docs referenced
- code/modules touched

### C. Decisions made
For each decision:
- decision title
- short rationale
- impact
- whether it is reversible
- where it was logged

### D. Assumptions
- assumption
- confidence: high / medium / low
- verification plan

### E. Deliverables completed
- docs created/updated
- code created/updated
- tests created/updated

### F. Risks / blockers
- issue
- severity
- mitigation

### G. Next best step
The next best step must be a single concrete action, not a vague direction.

## Mandatory advancement rule

The AI may move to the next file only if the current file’s stop conditions are satisfied.

If the current file asks for a PRD, a system spec, a template, or a mapping matrix, then that artifact must exist in a persistent form before the AI advances.

## Loop-back rule

The AI must loop back instead of pushing forward if any of the following happens:

- a later design decision breaks the north star
- a rules assumption becomes stale or contradicted by official sources
- a system boundary was poorly defined
- a UI screen requires data the data model does not support
- the roadmap depends on technology choices that were never justified
- tests reveal the current simulation model cannot stay coherent across seasons

## Work decomposition rule

Break complex work into **decision-shaped chunks**, not arbitrary chunks.

Good chunk:
- define recruiting interest model inputs
- specify roster table columns and filters
- define eligibility record schema
- design inbox notification severity system

Bad chunk:
- “do recruiting”
- “build UI”
- “work on backend”

## Documentation rule

Every major domain needs three things before implementation gets deep:
- product definition
- system definition
- validation method

If any of those is missing, the AI is moving too fast.

## Naming rule

Use original names where possible. If a benchmark product uses a good structure, translate the function and rename the surface.

Examples:
- “Inbox” in a benchmark may become “Program Desk”
- “Scouting Centre” may become “Talent Hub”
- “Squad Planner” may become “Depth Horizon” or “Depth Chart Planner”
- “Data Hub” may become “Analytics Lab”

The exact names can change, but the principle cannot: **do not inherit branded surface language by accident**.

## Research freshness rule

Any rule, format, policy, or external structure that is likely to change must include:
- last verified date
- source IDs from `99_SOURCES_AND_FACT_BASIS.md`
- volatility note
- watchlist status

Minimum watchlist categories:
- transfer windows
- eligibility rules
- NIL / direct benefit rules
- roster limits
- CFP format / seeding
- conference alignment if using real-world content later

## Code and implementation rules

### Code must be:
- modular
- deterministic where possible
- testable in isolation
- readable without hidden state
- documented at boundaries
- versioned for saves and data migrations

### Do not:
- hardcode volatile rules in UI components
- bury important logic in random helper functions
- fuse persistence format to presentation components
- let content packs depend on source code edits
- implement a visual match engine before the management loop is proven

## Required project memory files

The AI should maintain persistent project memory using these templates:

### `PROJECT_STATUS.md`
Based on `90_PROJECT_STATUS_TEMPLATE.md`.
Tracks:
- current phase
- completed milestones
- in-flight work
- blockers
- assumptions
- verification dates

### `DECISION_LOG.md`
Based on `91_DECISION_LOG_TEMPLATE.md`.
Tracks:
- decision ID
- context
- options considered
- final decision
- consequences
- rollback triggers

## Recommended artifact naming conventions

Use stable, boring, machine-friendly names.

Examples:
- `prd_core_loop.md`
- `ruleset_fbs_current.json`
- `schema_player.md`
- `ui_roster_screen.md`
- `adr_007_save_format.md`
- `test_eligibility_redshirt.spec.ts`

## Quality bar by work type

### Research is complete when:
- benchmark features have been translated into underlying decisions
- not just described

### Product design is complete when:
- loops, priorities, scope boundaries, and definition of done are explicit

### System design is complete when:
- inputs, outputs, ownership, and tests are defined

### Implementation is complete when:
- code exists
- tests exist
- docs are updated
- saves still work

### QA is complete when:
- the bug is reproduced
- root cause is identified or bounded
- a regression test exists where feasible

## What to do when stuck

When stuck, do **not** widen scope randomly.

Use this order:
1. Re-read `01_GUIDING_LIGHT.md`
2. Check if the issue is already a missing decision
3. Create a narrow ADR / decision-log entry
4. Tighten the current artifact
5. Only then move on

## Immediate deliverable after reading this file

Create the initial versions of:
- `PROJECT_STATUS.md`
- `DECISION_LOG.md`

Populate them with:
- current phase
- current objective
- the core mantra
- at least the first three foundational decisions already visible from the pack

Then continue to `03_DISTINCTNESS_AND_RISK.md`.
