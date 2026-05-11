# CFB-FM Build Superpack — Start Here

## Purpose

This pack is the practical handoff from “giant vision” to “AI can actually build it.”

The project target is a private, desktop-first, Football Manager-style college football management simulator with:

- dense clickable UI
- persistent world state
- deterministic simulation
- real-school/private mode support
- fictional/custom mode support
- multi-year recruiting
- NIL-era roster economics
- hidden traits and scouting uncertainty
- play-by-play first, no visual sim at launch
- LLM-assisted storytelling
- AI-generated portraits and graphics
- sandbox tools for tuning the sim
- long-term dynasty and career modes

The game is not a lightweight dashboard. It is a living college football universe.

## How To Use This Pack

Do not give the coder AI every document at once.

Use the packet system.

Each AI coding session should receive:

1. `01_MASTER_BUILD_PROMPT.md`
2. `02_ENGINE_ARCHITECTURE_SPEC.md`
3. `03_AI_CODING_PROTOCOL.md`
4. `04_REPO_STRUCTURE.md`
5. the specific packet from `05_FIRST_10_PACKETS.md` or `06_PACKETS_11_30.md`
6. current project file tree
7. current `PROJECT_STATUS.md`
8. current test output

## Hard Build Rule

A feature is not real until it has:

- data model
- simulation logic
- UI hook or screen
- persistence
- tests
- event/log integration where relevant
- acceptance criteria met

No UI-only fake state.

## Recommended First Move

Start with:

```text
Packet 0.1 — Repository Skeleton
```

Then go in order.

Do not jump to recruiting UI before persistence, deterministic RNG, world state, and Continue loop exist.
