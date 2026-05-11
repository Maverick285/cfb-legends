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
