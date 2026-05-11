# Start Here

Date: 2026-05-07

This is the current source of truth for Campus Gridiron Manager.

## North Star

Build a college football management sim where the menus are the game:

- every player, recruit, coach, school, game, stat, promise, transaction, and event is clickable
- screens are dense, professional, and useful rather than decorative
- user actions create durable records that later screens can read
- the game can advance through weeks/seasons without state becoming nonsense
- art supports the menus, but data and interaction carry the experience

The target feel is a professional desktop management sim with subtle college football atmosphere.

## Current Direction

The next build should not be another broad UI pass and should not be a rewrite from scratch.

Use the existing project as a parts library:

- keep existing engines: recruiting, portal, NIL, development, injuries, playgen, stats, pulse, logs, invariants
- quarantine screen-owned fake state
- rebuild the app foundation before feature depth
- add a canonical domain spine only after the shell/state path is coherent
- use intro screen to first game as the later acceptance journey, not the first coding task

## Active Docs

- `docs/BUILD_PLAN.md` - consolidated build plan and milestone sequence
- `docs/PROJECT_STATUS.md` - current status only
- `docs/DECISION_LOG.md` - current decisions only
- `docs/CGM_MENU_GRAPHICS_ASSET_MANIFEST.md` - graphics and image asset plan

## Archived Research

Older research and planning docs were preserved here:

- `docs/archive/2026-05-pre-rebuild-research/`

Use the archive for reference, not as the active task list.

## Immediate Next Task

Start M0 from `docs/BUILD_PLAN.md`:

1. Build a cohesive app shell and route registry.
2. Add a small app/domain state container.
3. Add save/load/reset hooks.
4. Prove one row click opens one object profile from durable state.
