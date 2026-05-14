# Project Status

Date: 2026-05-14

## Current State

The project has moved to the new `cfl-app/` React + TypeScript + Vite path.

`cfl-next/` remains the active visual prototype and screen reference. The old root static app, legacy `app.js`, `js/sim/`, `js/ui/`, and harness code are parts-bin/reference systems.

## Active Milestone

R1 - Team room roster screen and shared roster-adjacent screen frame.

## Current Goal

Build the roster screen as the reusable team-room frame for roster-adjacent screens:

```text
top program bar -> left icon rail -> selected player profile -> team tabs -> overview band -> dense roster grid
```

The same shell should support Depth Chart, Formation Subs, NIL/Budget, Health, and Staff without creating a separate visual language for each screen.

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
- Reworked the active roster screen around the supplied May 13 visual references:
  - persistent top program bar.
  - narrow left icon rail.
  - large selected-player profile panel.
  - Overview / Depth Chart / Formation Subs / NIL/Budget / Health / Staff team tabs.
  - roster overview metrics from seed data.
  - class, position, NIL, and health summary bands.
  - denser 105-player roster table with internal scrolling.

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
- Roster command screen visual smoke passes at 1920x1080:
  - 105 rows render.
  - no console errors.
  - page body does not vertically or horizontally overflow.
  - roster table scrolls inside its panel.
  - team tabs render: Overview, Depth Chart, Formation Subs, NIL/Budget, Health, Staff.

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

Build the first real depth chart mode inside the new team-room frame in `cfl-app/`.

Acceptance target:

- derive position rooms from the same 105-player roster records.
- show starter/challenger comparison from seed ratings.
- write a durable depth override action.
- save/load preserves the override.
- the Depth Chart tab changes real depth state rather than showing a placeholder.

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
