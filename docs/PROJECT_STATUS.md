# Project Status

Date: 2026-05-07

## Current State

The project is entering a focused rebuild phase.

Previous work produced many useful systems, but the active direction is now to stop expanding broad screen scaffolding and rebuild the app foundation before adding feature depth.

## Active Milestone

M0 - App Foundation.

## Current Goal

Prove the app has usable bones:

```text
boot -> start screen -> program desk -> route navigation -> one object row -> profile -> save/load
```

This comes before recruiting, portal, NIL, staff, or first-game feature depth.

## Keep

Existing modules remain useful as parts-bin systems:

- recruiting
- portal
- NIL
- development
- injuries
- play generation
- stats
- campus pulse/media
- action log
- event log
- reducers/replay
- invariants
- UI datagrid/workspace helpers

## Quarantine

Do not expand these patterns:

- screen-owned fake lists
- actions that only change display text
- calendar entries that are not durable records
- news/inbox items not derived from events
- broad UI screens that do not mutate/read shared state
- one-off decorative graphics used to hide missing function

## Next Implementation Step

Start M0 from `docs/BUILD_PLAN.md`.

First code target:

- route registry
- cohesive shell layout
- app/domain state container
- selectors for Program Desk and one object profile
- save/load roundtrip
- one deterministic smoke test

## M0 Progress

- Legacy `app.js` is no longer loaded by `index.html`.
- `js/m0/foundation.js` now owns boot, routing, career creation, state, save/load, and basic selectors.
- The first screen is now rebuilt screen-by-screen: a full-screen main menu replaces the old bootstrap form, removes world seed/rules/advanced setup clutter, and only exposes wired career actions.
- New Career now opens a minimal setup panel and creates a fictional Lakeview demo career from shared state; Continue activates only when a local save exists.
- Visible active screens are Start, Dashboard, Roster, and Person Profile. Recruiting, calendar, inbox, settings/debug, skip, search, bookmarks, and other broad controls are hidden until they do real work.
- `cfl_agent_repo_pack` has been adopted as the active discipline layer. The Dashboard now follows its Team Hub visual spec with matchup, team overview, schedule, recruiting, staff, rankings/news, bottom ticker, and a real Continue action that advances week state.
- Added root `AGENTS.md` and static-app check scripts: `typecheck`, `lint`, `test`, `build`, `visual:test`, `screenshot`, and `check`.
- One object route exists: `#/person/:personId`.
- Added `npm run m0:smoke` for foundation wiring checks.

## Archive

Historical docs and research were moved to:

- `docs/archive/2026-05-pre-rebuild-research/`
