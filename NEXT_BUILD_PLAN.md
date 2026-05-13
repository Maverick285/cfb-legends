# College Football Legends - Next Build Plan

Date: 2026-05-11

## Decision

Treat `cfl-next/` as the active visual prototype and create a new React app as the real game path.

The old root static app should become parts-bin/reference. It proved useful ideas, but continuing to expand giant HTML-string screens will slow the project down now that the game clearly needs reusable components, durable local data, sortable tables, profile views, filters, comparison panels, action menus, and save state.

## Active Project Roles

```text
cfl-app/                         Real app path to create next
cfl-next/                        Active visual/reference prototype
cfl_full_scale_seed_data_v0_1/   Seed data source
app.js                           Legacy parts bin only
js/sim/                          Simulation systems parts bin
js/ui/                           Reusable ideas/helpers parts bin
harness/                         Test/sim reference
ai-pack/                         Research/reference only
Screens for game/                Visual reference only
```

## Recommended Stack

- React
- TypeScript
- Vite
- plain CSS or CSS modules at first
- local JSON/content-pack loader first
- SQLite/Electron/Tauri later, only when the local game loop needs it

Do not start with a server. The first backend is a local game data layer.

## Why React Now

React is worth using now because the project is about to become component-heavy:

- app shell
- route screens
- sortable data grids
- player profile panels
- depth chart comparison panels
- filters
- tabs
- action menus
- modal/inspector surfaces
- save/load state
- live updates after game actions

The current static approach can still inform the design, but it is the wrong place to build the full product.

## Seed Pack Reality

The current seed pack is strong enough to become the first real data source:

- 138 programs
- 14,490 rostered athletes
- 105 athletes per program
- 1,932 coach/staff profiles
- 6,000 recruits
- 30,000 recruit-program interest rows
- 828 games
- CSV, JSON, and SQLite versions
- `manifest.json` with expected row counts

Location:

```text
cfl_full_scale_seed_data_v0_1/cfl_seed_data_pack/
```

Use the JSON files first for Vite/browser simplicity. Keep the SQLite file for later desktop/local persistence work.

## First Coding Milestone

```text
Load real seed data, select one program, render its 105-player roster from normalized records, click a player, show real profile, save selected career.
```

This is the first real spine. Everything else should wait until this is working.

## Phase 1 - Scaffold `cfl-app`

Create:

```text
cfl-app/
  package.json
  vite.config.ts
  tsconfig.json
  index.html
  src/
    main.tsx
    App.tsx
    styles/
      tokens.css
      app.css
    data/
      seedLoader.ts
      seedValidation.ts
      normalizedStore.ts
      selectors.ts
      actions.ts
      persistence.ts
    screens/
      StartScreen.tsx
      DashboardScreen.tsx
      RosterScreen.tsx
      PlayerProfileScreen.tsx
      DepthChartScreen.tsx
    components/
      AppShell.tsx
      ObjectHeader.tsx
      ActionBar.tsx
      DataGrid.tsx
      RightInspector.tsx
      PlayerPortrait.tsx
      PlayerSummary.tsx
      StatusPill.tsx
```

Do not overbuild routing yet. Simple route state is enough for the first milestone.

## Phase 2 - Seed Import / Validation

Build a script or app-side validation module that:

- reads `manifest.json`
- confirms every listed JSON table exists
- confirms row counts match the manifest
- confirms 138 programs exist
- confirms every program has 105 roster memberships
- confirms every rostered athlete has:
  - a `people` row
  - an `athlete_profiles` row
  - a `player_ratings` row
- confirms no orphan roster memberships
- confirms schedules reference valid programs/games
- outputs an import report

First output:

```text
cfl-app/reports/seed-import-report.json
```

This gate matters more than a pretty UI. If the data layer is bad, every screen becomes fake.

## Phase 3 - Normalized Game Store

Build a browser-friendly normalized store from the seed JSON:

```ts
type GameStore = {
  conferencesById: Record<string, Conference>;
  schoolsById: Record<string, School>;
  programsById: Record<string, Program>;
  teamBrandsByProgramId: Record<string, TeamBrand>;
  stadiumsByProgramId: Record<string, Stadium>;
  peopleById: Record<string, Person>;
  athleteProfilesByPersonId: Record<string, AthleteProfile>;
  playerRatingsByPersonId: Record<string, PlayerRatings>;
  playerTraitsByPersonId: Record<string, PlayerTrait[]>;
  rosterMembershipsByProgramId: Record<string, RosterMembership[]>;
  schedulesByProgramId: Record<string, ScheduleRow[]>;
  recruitingProfilesByPersonId: Record<string, RecruitingProfile>;
};
```

Keep generated/imported seed state separate from career state.

Career state should hold only player choices and mutable save data:

```ts
type CareerState = {
  selectedProgramId: string;
  selectedPersonId?: string;
  depthOverrides: Record<string, string[]>;
  watchlistPersonIds: string[];
  developmentFocusByPersonId: Record<string, string>;
  actionLog: ActionLogEntry[];
  currentDate: string;
  currentWeek: number;
};
```

## Phase 4 - Selectors

Selectors answer UI questions. They should not mutate state.

Required first selectors:

- `getProgramRoster(programId)`
- `getPlayerProfile(personId)`
- `getPlayerRatings(personId)`
- `getPlayerTraits(personId)`
- `getDepthChart(programId)`
- `getProgramSchedule(programId)`
- `getDashboardState(programId)`
- `getProgramBrand(programId)`

The Roster and Player Profile screens should read through selectors only, not raw table joins inside JSX.

## Phase 5 - Actions

Actions mutate durable career state and write action log entries.

Required first actions:

- `selectProgram(programId)`
- `selectPlayer(personId)`
- `addWatchlist(personId)`
- `removeWatchlist(personId)`
- `setDevelopmentFocus(personId, focus)`
- `swapDepthPlayers(programId, position, fromPersonId, toPersonId)`
- `saveCareer()`
- `loadCareer()`

No visible action button should exist until it has a real action behind it.

## Phase 6 - First Screens

### Start / Program Select

Purpose: choose one program and enter the save.

Required:

- program list from seed data
- selected program creates career state
- save/load selected program

### Roster Screen

Purpose: decide who matters on the roster.

Required:

- exactly 105 rows for selected program
- sortable table
- position filter
- columns: Name, Pos, Class, OVR, POT, Year, Height, Weight, Hometown, Dev, Traits, Watch
- click row selects player
- open profile route/action
- add/remove watchlist

### Player Profile

Purpose: inspect one player and take a durable action.

Required:

- profile from joined person/profile/ratings/traits/NIL rows
- ratings grid
- traits
- roster context
- development focus action
- action log display

### Depth Chart

Purpose: choose who starts and compare tradeoffs.

Required:

- position tabs
- starter/challenger comparison
- depth order table/list
- swap depth action
- save/load depth override

## What Not To Build Yet

Defer:

- Electron/Tauri
- server backend
- dynamic image generation
- real game sim integration
- NIL economy depth
- transfer portal depth
- staff carousel depth
- recruiting pitch engine
- schedule sim
- news/media generation

Those become much easier after the seed loader, normalized store, selectors, actions, roster, profile, and depth chart exist.

## Reference Image Workflow

For each screen, pick one reference from:

```text
Screens for game/AI Game Screens/Top Choices/
```

For each screen define:

1. reference image choice
2. screen purpose
3. required actions

The code should implement decisions and state first, then chase visual fidelity.

## Immediate Next Step

Start with:

```text
1. Create cfl-app with React + TypeScript + Vite.
2. Build seed loader and validation report.
3. Normalize the seed data into a game store.
4. Select one program.
5. Render that program's 105-player roster.
6. Click a player and show profile.
7. Save/load selected career.
```

Only after that should the UI expand to depth chart and recruiting.
