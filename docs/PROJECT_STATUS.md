# Project Status

Date: 2026-05-12

## Current State

The project has moved to the new `cfl-app/` React + TypeScript + Vite path.

`cfl-next/` remains the active visual prototype and screen reference. The old root static app, legacy `app.js`, `js/sim/`, `js/ui/`, and harness code are parts-bin/reference systems.

## Active Milestone

R0 - React app foundation and seed-backed player object loop.

## Current Goal

Prove the real app path has usable bones:

```text
seed pack -> validation report -> compact browser bundle -> start career -> dashboard -> 105-player roster -> player profile -> durable action -> save/load
```

This comes before depth chart expansion, recruiting, NIL, staff, portal, or game simulation work.

## Completed This Pass

- Added `cfl-app/` as the new real app path.
- Added React, TypeScript, and Vite config under `cfl-app/`.
- Added `scripts/build_cfl_app_seed.js`.
- Validated the full seed pack:
  - 22 manifest tables.
  - 138 programs.
  - every rostered program has 105 roster rows.
  - rostered athletes have people/profile/ratings rows.
  - programs have NIL, stadium, brand, and uniform records.
  - schedule references resolve.
- Generated:
  - `cfl-app/reports/seed-import-report.json`
  - `cfl-app/public/seed/seed-import-report.json`
  - `cfl-app/public/seed/seed-v0.1-demo.json`
- Built a first Vanderbilt career slice from seed data.
- Implemented:
  - Start screen.
  - App shell.
  - Program Desk dashboard.
  - 105-player roster table.
  - Player profile route.
  - Player hero component.
  - Watchlist action.
  - Development focus action.
  - Local save/load persistence.

## Verification

- `npm run seed:build` passes.
- `npm run app:typecheck` passes.
- `npm run app:build` passes.
- Browser smoke passes:
  - Start Vanderbilt career.
  - Roster renders 105 rows.
  - Player row selection updates hero.
  - Double-click opens player profile.
  - Watchlist persists after reload.
  - Development focus persists after reload.

## Current App URL

Run:

```bash
npm run app:dev
```

Then open:

```text
http://127.0.0.1:5173/
```

## Next Implementation Step

Build the first real depth chart screen in `cfl-app/`.

Acceptance target:

- derive position rooms from the same 105-player roster records.
- show starter/challenger comparison from seed ratings.
- write a durable depth override action.
- save/load preserves the override.
- no visible depth-chart button exists unless it changes durable state.

## Keep

- `cfl-next/` for visual/screen reference.
- `cfl_full_scale_seed_data_v0_1/` as disposable full-scale seed source.
- legacy sim and UI modules as parts-bin code only.

## Quarantine

Do not expand:

- old root static app as the main path.
- legacy `app.js`.
- screen-owned fake data.
- buttons that only change display text.
- broad screens before the player/object/depth state loop is durable.
