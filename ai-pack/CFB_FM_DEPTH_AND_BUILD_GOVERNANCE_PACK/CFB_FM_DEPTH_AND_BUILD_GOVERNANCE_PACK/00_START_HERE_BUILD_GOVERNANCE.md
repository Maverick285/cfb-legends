# CFB-FM Build Governance Pack — Start Here

## Purpose

This pack exists to keep the AI from building a shallow fake version of the game.

The project is large enough that the normal AI failure mode is predictable:

```text
It will build screens that look right,
but the underlying systems will be shallow, disconnected, untested, or unsaved.
```

This pack defines how to prevent that.

Use these documents as the **acceptance authority** for every coding packet.

## What This Pack Does

It gives you:

1. a depth gate for every feature
2. a packet acceptance standard
3. system implementation templates
4. AI reviewer prompts
5. QA protocols
6. long-run sim validation requirements
7. anti-placeholder rules
8. release gates
9. codebase audit prompts
10. exact definitions of what “real” means for each system

## Correct Build Mentality

You are not trying to get screenshots quickly.

You are trying to build a simulation that survives:

- save/load
- 20-year sims
- AI-school behavior
- roster edge cases
- NIL edge cases
- recruiting imbalance
- player development drift
- UI density expectations
- statistical validation
- replay/debug review

A pretty screen with fake data is not progress.

## The Core Rule

```text
A feature is real only when it has:
data model,
simulation logic,
persistence,
UI,
events/inbox hooks,
tests,
debug/export tooling,
and validation.
```

If it lacks these, it is either scaffolding or a placeholder.

That is allowed only when the packet explicitly says so.

## How To Use

For every AI coding packet:

1. Give the AI the packet.
2. Give it `01_DEPTH_GATE_AND_ACCEPTANCE_PROTOCOL.md`.
3. Give it the relevant feature rubric from `06_FEATURE_DEPTH_RUBRICS.md`.
4. After coding, run the reviewer prompt from `04_REVIEWER_AND_QA_PROTOCOL.md`.
5. Score the packet using `02_PACKET_COMPLETION_STANDARD.md`.
6. Do not move on until blockers are fixed.

## Recommended Workflow

```text
Builder AI writes code.
Reviewer AI audits code.
QA AI reviews sim outputs.
You accept/reject based on depth gates.
```

The builder should never be the sole judge of its own work.

## Most Important Files

Start with these:

- `01_DEPTH_GATE_AND_ACCEPTANCE_PROTOCOL.md`
- `02_PACKET_COMPLETION_STANDARD.md`
- `03_SYSTEM_IMPLEMENTATION_SPEC_TEMPLATE.md`
- `04_REVIEWER_AND_QA_PROTOCOL.md`
- `06_FEATURE_DEPTH_RUBRICS.md`

## What “Done” Means

For this project, “done” does not mean:

```text
The screen appears.
```

It means:

```text
The system works, persists, affects other systems, passes tests, and produces believable long-run behavior.
```
