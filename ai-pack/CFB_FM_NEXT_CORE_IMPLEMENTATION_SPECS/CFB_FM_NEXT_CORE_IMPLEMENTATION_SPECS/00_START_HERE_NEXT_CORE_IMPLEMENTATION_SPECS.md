# CFB-FM Next Core Implementation Specs — Start Here

## Purpose

This pack scopes the next systems that must be built **after the Stats Engine**.

The Stats Engine answers:

```text
Given a structured play result, who earns what stats?
```

This pack answers the next questions:

```text
How does the game decide what structured play result happens?
How do attributes translate to outcomes?
How do recruits choose schools?
How do players develop?
How do AI schools manage programs?
How do NIL, boosters, and the portal change behavior?
How do draft results validate player development?
How does real data calibrate everything?
How does the Program Desk organize daily decisions?
How do trait labels and scouting language become reliable?
How do records, awards, and media narratives turn stats into history?
```

## Documents Included

- `28_PLAY_GENERATOR_AND_GAME_SIM_ENGINE_SPEC.md`
- `29_ATTRIBUTE_TO_OUTCOME_AND_PLAYER_MATCHUP_SPEC.md`
- `30_RECRUITING_ENGINE_IMPLEMENTATION_SPEC.md`
- `31_PLAYER_DEVELOPMENT_PRACTICE_AND_TEAM_VIBE_ENGINE_SPEC.md`
- `32_AI_SCHOOL_PROGRAM_MANAGER_SPEC.md`
- `33_NIL_BOOSTER_AND_ROSTER_ECONOMICS_IMPLEMENTATION_SPEC.md`
- `34_TRANSFER_PORTAL_AND_RETENTION_ENGINE_SPEC.md`
- `35_DRAFT_AND_NFL_PIPELINE_CALIBRATION_SPEC.md`
- `36_REAL_DATA_INGESTION_AND_CALIBRATION_PIPELINE_SPEC.md`
- `37_PROGRAM_DESK_AND_CONTINUE_GATE_IMPLEMENTATION_SPEC.md`
- `38_ATTRIBUTE_TRAIT_CLUSTER_AND_SCOUTING_LANGUAGE_SPEC.md`
- `39_AWARDS_RECORDS_HISTORY_AND_MEDIA_NARRATIVE_SPEC.md`
- `40_NEXT_CORE_BUILD_PACKETS_AND_PROMPTS.md`
- `CFB_FM_NEXT_CORE_IMPLEMENTATION_SPECS_MASTER.md`

## Build Order

Use this order if the codebase is ready for implementation:

```text
1. 28 Play Generator
2. 29 Attribute-to-Outcome Model
3. 31 Development / Practice / Team Vibe
4. 30 Recruiting Engine
5. 32 AI School Program Manager
6. 33 NIL / Booster / Roster Economics
7. 34 Transfer Portal / Retention
8. 35 Draft / NFL Pipeline
9. 36 Real Data Calibration Pipeline
10. 37 Program Desk / Continue Gate
11. 38 Trait Clusters / Scouting Language
12. 39 Awards / Records / History / Media
```

## Design Priority

The core risk is not missing features.

The core risk is building beautiful screens around fake or shallow numbers.

These specs are designed to force the AI to build:

- structured inputs
- deterministic logic
- formulas with reason codes
- tests
- validation
- save/load support
- Data Lab outputs
- cross-system consequences

## Non-Negotiable Rule

Every system must eventually pass the depth gate:

```text
data model
simulation logic
persistence
UI/workflow hook
events/inbox hooks
tests
debug/export tooling
long-run validation
```

## Immediate Next Packet

If the Stats Engine pack has been accepted, the next coding target is:

```text
PLAYGEN-1 — Game State, Clock, Field, Drive, and Situation Model
```

That starts the Play Generator and Game Simulation Engine.
