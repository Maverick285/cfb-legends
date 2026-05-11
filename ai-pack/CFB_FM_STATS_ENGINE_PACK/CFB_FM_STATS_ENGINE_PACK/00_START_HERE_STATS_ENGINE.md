# CFB-FM Stats Engine Pack — Start Here

## Purpose

This pack defines the stats engine for the CFB-FM project.

The immediate goal is **not** colorful play-by-play prose.

The immediate goal is:

```text
A structured play-event engine that credits stats correctly,
builds believable box scores,
stores season/career stats,
and validates outputs against real college football distributions.
```

Color commentary, broadcast flavor, and LLM-written play descriptions can come later.

## Core Rule

```text
Structured PlayEvent = truth.
Generated text = presentation.
```

Never parse play-by-play text to create stats.

Correct flow:

```text
Game situation
→ play generator creates structured PlayEvent
→ stat engine converts PlayEvent into StatDeltas
→ accumulator builds box score
→ reconciler validates totals
→ season/career stat store updates
→ text renderer writes play-by-play sentence
```

Wrong flow:

```text
Text sentence
→ parse sentence
→ guess stats
```

## Why This Matters

Stats drive:

- awards
- draft stock
- NIL value
- morale
- recruiting pitches
- player development reputation
- staff reputation
- scheme identity
- media stories
- history
- records
- coach evaluation

If the stats are fake, everything downstream becomes fake.

## What This Pack Contains

- `01_STATS_ENGINE_NORTH_STAR.md`
- `02_STAT_TAXONOMY_AND_DEFINITIONS.md`
- `03_PLAY_EVENT_SCHEMA.md`
- `04_STAT_CREDIT_RULES.md`
- `05_ACCUMULATOR_RECONCILIATION_AND_STORAGE.md`
- `06_CALIBRATION_TARGETS_AND_DATA_PIPELINE.md`
- `07_TESTING_AND_INVARIANTS.md`
- `08_AI_BUILD_PACKETS_STATS_ENGINE.md`
- `09_READY_TO_PASTE_STATS_PROMPTS.md`
- `10_TYPESCRIPT_CONTRACTS_REFERENCE.md`
- `CFB_FM_STATS_ENGINE_MASTER.md`

## Sources To Treat As Authoritative

Use the NCAA Football Statisticians' Manual as the stat-credit authority.

Use CollegeFootballData / cfbfastR as the real play-by-play calibration source.

Use NCAA/ESPN stat pages only as broad public sanity checks.

## Immediate Build Priority

Build in this order:

1. Stat taxonomy
2. PlayEvent schema
3. StatDelta schema
4. StatAccumulator
5. Box score reconciler
6. Season/career stat store
7. Real-data calibration pipeline
8. Data Lab validation
9. Play generator integration
10. Text play-by-play renderer

Do not jump straight to pretty play text.
