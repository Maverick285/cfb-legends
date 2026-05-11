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
