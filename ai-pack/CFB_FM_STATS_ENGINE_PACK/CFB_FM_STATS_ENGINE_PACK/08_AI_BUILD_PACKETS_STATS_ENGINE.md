# AI Build Packets — Stats Engine

## Purpose

These packets tell the coding AI exactly how to build the stats engine without creating fake box scores.

Use these in order.

---

# STAT-1 — Stat Taxonomy Registry

## Size

Medium

## Goal

Define all stat IDs and metadata.

## Deliverables

- `src/domain/stats/statDefinitions.ts`
- `src/domain/stats/statTypes.ts`
- `tests/unit/statDefinitions.test.ts`

## Requirements

Each stat has:

- id
- display name
- owner type
- category
- official/internal/derived classification
- aggregation type
- display format
- source event types
- description

## Acceptance

- registry validates unique IDs
- derived stats are marked derived
- official-style vs internal stats are distinct
- no UI code

---

# STAT-2 — PlayEvent and GameBook Schema

## Size

Large

## Goal

Create the structured event model.

## Deliverables

- `src/domain/stats/playEvent.ts`
- `src/domain/stats/gameBook.ts`
- `src/domain/stats/drive.ts`
- validation helpers
- tests

## Requirements

PlayEvent includes:

- game id
- drive id
- period
- clock
- down/distance
- yards to goal
- possession/defense teams
- play type
- charged play type
- result
- yards
- participants
- scoring
- turnover
- penalty
- stat eligibility
- reason codes

## Acceptance

- invalid down rejected
- invalid team relationship rejected
- play event serializes/deserializes
- tests cover basic validation

---

# STAT-3 — StatDelta and Basic Accumulator

## Size

Large

## Goal

Convert simple PlayEvents into stat deltas and box score counts.

## Implement First

- completed pass
- incomplete pass
- interception
- rush
- rushing TD
- passing TD
- sack
- kneel down

## Deliverables

- `src/sim/stats/statDelta.ts`
- `src/sim/stats/statAccumulator.ts`
- `src/sim/stats/creditRules/passCredit.ts`
- `src/sim/stats/creditRules/rushCredit.ts`
- tests

## Acceptance

- completed pass credits passer/receiver/team
- sack is college-style rushing loss
- no text parsing
- same PlayEvent always same deltas

---

# STAT-4 — Turnovers, Fumbles, and Defense

## Size

Large

## Goal

Add defensive and turnover credit.

## Implement

- interception return
- pick-six
- fumble on rush
- fumble after catch
- forced fumble
- fumble recovery
- fumble return TD
- tackles
- sacks/TFL

## Acceptance

- turnovers reconcile
- defensive TD does not count as offensive yards
- fumble recovery return yards separate
- tests cover edge cases

---

# STAT-5 — Penalties

## Size

Large

## Goal

Implement penalty stat credit and nullification.

## Implement

- no-play penalty
- live-ball penalty
- dead-ball penalty
- declined penalty
- offsetting penalty
- automatic first down
- loss of down

## Acceptance

- penalty yards do not become offense
- nullified plays do not credit normal stats
- live-ball plays can count plus penalty
- first down by penalty credited correctly

---

# STAT-6 — Special Teams

## Size

Large

## Goal

Add kicks, punts, and returns.

## Implement

- field goal made/missed
- blocked field goal
- extra point
- two-point attempt
- punt
- punt return
- blocked punt
- kickoff
- kickoff return
- touchback

## Acceptance

- special teams yards separate from offense
- scoring reconciles
- tests cover returns and blocked kicks

---

# STAT-7 — Reconciler

## Size

Large

## Goal

Validate every game box score.

## Deliverables

- `src/sim/stats/reconciler.ts`
- invariant checks
- tests

## Required Checks

- score equals scoring plays
- total yards equals pass + rush
- team/player passing totals match
- team/player rushing totals match
- first downs reconcile
- turnovers reconcile
- no return/penalty yards in total offense

## Acceptance

- bad box score fails
- good box score passes
- errors include useful messages

---

# STAT-8 — Season and Career Stat Store

## Size

Medium

## Goal

Aggregate finalized game stats.

## Deliverables

- `src/domain/stats/seasonStats.ts`
- `src/domain/stats/careerStats.ts`
- aggregation functions
- save/load tests

## Acceptance

- season totals equal game sums
- career totals equal season sums
- transfers can be tracked by school

---

# STAT-9 — Records and Leaderboards

## Size

Medium

## Goal

Create stat leaderboards and records.

## Deliverables

- national leaders
- conference leaders
- school leaders
- game/season/career records

## Acceptance

- leaders update after finalized games
- records persist
- ties handled

---

# STAT-10 — Calibration Data Pipeline

## Size

Large

## Goal

Build scripts for real-data calibration.

## Deliverables

- scripts to ingest CFBD/cfbfastR play data
- normalize play types
- build target distributions
- export calibration JSON

## Acceptance

- can produce target JSON
- target JSON has bands, not single values
- supports scheme/tempo/situation segmentation when data exists

---

# STAT-11 — Data Lab Stats Validation

## Size

Large

## Goal

Compare simulated outputs against target distributions.

## Deliverables

- stats validation report
- anomaly detection
- charts/tables if UI exists
- JSON export

## Acceptance

- flags unrealistic stats
- flags reconciliation failures
- flags player leaderboard anomalies

---

# STAT-12 — Play Generator Integration

## Size

Large

## Goal

Wire current game sim to structured PlayEvents.

## Requirements

- no fake box score generation after result
- plays generate stats
- box score comes from accumulated plays
- current drive/result engine can be adapted but cannot bypass stats

## Acceptance

- simulated game creates PlayEvents
- PlayEvents create box score
- text renderer uses PlayEvents
- no box score invention

---

# STAT-13 — Text Play-by-Play Template Renderer

## Size

Medium

## Goal

Render plain, non-color play text from structured plays.

## Important

No colorful commentary yet.

## Deliverables

- template renderer
- play summary lines
- deterministic fallback text

## Acceptance

- text matches structured facts
- no stats created by text
- can be replaced by LLM later

---

# STAT-14 — Save/Load and Replay Audit

## Size

Medium

## Goal

Ensure stats can be audited and replayed.

## Deliverables

- persist PlayEvents
- persist StatDeltas
- persist finalized box score
- replay test

## Acceptance

- replayed game regenerates same box score
- save/load preserves stats
