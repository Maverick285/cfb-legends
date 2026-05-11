# CFB-FM Remaining System Implementation Specs — Start Here

## Purpose

This pack continues the implementation-grade specification work for the CFB-FM project.

Previous packs covered:

- overall vision
- execution governance
- depth gates
- stats engine
- play generator
- attribute-to-outcome model
- recruiting
- development/practice/team vibe
- AI schools
- NIL/boosters/portal
- draft
- data calibration
- Program Desk
- trait/scouting language
- awards/history/media

This pack covers the remaining structural systems that will determine whether the project can actually become a coherent game:

- database/save/migration/event log
- screen-by-screen UI workspaces
- staff/responsibilities/coaching carousel
- scheduling/conferences/realignment/postseason
- creator/editor/sandbox/commissioner tools
- facilities/stadium/uniform/brand identity
- college town immersion/content pipeline
- LLM narrative/chat/media interactions
- test harness/scenarios/balance/AI QC
- integrated vertical slice acceptance plan

## Why This Pack Matters

The previous specs define what the sim should do.

This pack defines how the game should be held together.

Without these systems, the game risks becoming:

```text
A pile of promising modules that do not save, do not navigate well, do not test well, and do not feel like one living program.
```

## Critical Principle

Every major system must connect to:

```text
GameWorld state
save/load
event log
Program Desk
Data Lab
tests
UI workspaces
```

If it does not, it is not part of the game yet.

## Recommended Next Build Area

If the coding AI has not started yet:

```text
Start with database/save/event log.
```

If the coding AI already has a basic repo:

```text
Build screen/workspace framework and Program Desk/Continue Gate.
```

If the sim core exists:

```text
Build test harness and 1-season headless validation.
```

## Files Included

- `41_DATABASE_SAVE_MIGRATION_AND_EVENT_LOG_SPEC.md`
- `42_SCREEN_BY_SCREEN_UI_WORKSPACE_SPEC.md`
- `43_STAFF_RESPONSIBILITIES_AND_COACHING_CAROUSEL_IMPLEMENTATION_SPEC.md`
- `44_SCHEDULING_CONFERENCES_REALIGNMENT_AND_POSTSEASON_SPEC.md`
- `45_CREATOR_EDITOR_SANDBOX_AND_COMMISSIONER_MODE_SPEC.md`
- `46_FACILITIES_STADIUM_UNIFORM_AND_BRAND_IDENTITY_SPEC.md`
- `47_COLLEGE_TOWN_IMMERSION_AND_CONTENT_PIPELINE_SPEC.md`
- `48_LLM_NARRATIVE_CHAT_AND_MEDIA_INTERACTION_SPEC.md`
- `49_TEST_HARNESS_SCENARIO_BALANCE_AND_AI_QC_SPEC.md`
- `50_VERTICAL_SLICE_INTEGRATION_AND_ACCEPTANCE_PLAN.md`
- `51_READY_TO_PASTE_BUILD_PROMPTS_REMAINING_SYSTEMS.md`
- `CFB_FM_REMAINING_SYSTEM_SPECS_MASTER.md`
