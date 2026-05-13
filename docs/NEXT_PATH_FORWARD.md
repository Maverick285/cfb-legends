# CFB Legends - Single Path Forward

Date: 2026-05-11

Superseded note: after reviewing the fuller seed pack and the `cfl-next` prototype direction, use `../NEXT_BUILD_PLAN.md` as the active plan. This file remains useful background for screen priorities and decision discipline.

## Goal

Build toward a AAA-looking college football management sim in the spirit of Football Manager: dense, professional, clickable, long-save friendly, and driven by decisions rather than decoration.

The practical goal now is not the whole game. It is to get the main screens built on a stable foundation so the rest of the game can reuse the same shell, table, inspector, profile, and action patterns.

## Current Reality

The project has three layers:

1. Active app: `index.html`, `styles.css`, `js/m0/foundation.js`
   - This is what actually loads.
   - It passes `npm run check`.
   - It has Start, Dashboard, Roster, Person Profile, save/load, routing, and a minimal durable world.

2. Parts bin: `app.js`, `js/sim/`, `js/ui/`, `data/`
   - `app.js` is too large and should not become the main path again.
   - `js/sim/` has useful systems to reintroduce later.
   - `js/ui/datagrid.js` and helpers are useful patterns, but only after they match the M0 foundation.

3. Reference prototypes and docs: `cfl-next/`, `ai-pack/`, `Screens for game/`
   - `cfl-next` has useful broader UI ideas for roster, depth chart, recruiting, and shell feel.
   - `ai-pack/CFB_FM_UI_CANONICAL_SPEC.md` is the best distilled UI target.
   - Most AI-pack files are reference only, not an execution queue.

## The Decision

Continue from the active M0 foundation. Do not restart in React, do not revive legacy `app.js`, and do not build more broad fake screens.

The next practical move is:

```text
improve the active roster/person loop -> add depth chart -> add recruiting board
```

Those three screens establish most reusable pieces needed by the full game.

## Screen Fidelity Target

The UI should feel like a premium desktop sports management game:

- dark, dense, confident, and table-forward
- strong fixed app shell with sidebar, topbar, workspace, inspector, footer/status
- every important entity row is clickable
- selected row updates an inspector or profile from the same state record
- team color accents are restrained
- visual assets support identity, but tables and decisions carry the game
- portraits and header/stadium art are used where they clarify identity

Avoid:

- generic SaaS dashboard styling
- card walls as the main screen structure
- oversized decorative panels hiding shallow state
- fake buttons that do not read or write game state
- one-off generated screens with no reusable components
- random image paths buried in CSS/JS

## Recommended JS Shape

Keep the current static browser-script approach until the screens prove themselves. A framework migration is not the next step.

Target structure:

```text
js/
  m0/
    foundation.js          # boot, routing, global state, save/load, top-level actions
    selectors.js           # move derived reads here once foundation grows
    actions.js             # durable mutations: watchlist, dev focus, depth move

  ui/
    components/
      object-header.js
      action-bar.js
      data-grid.js         # can wrap or adapt existing js/ui/datagrid.js
      status-pill.js
      person-portrait.js
      player-summary.js
      player-actions.js

    screens/
      dashboard-screen.js
      roster-screen.js
      person-profile-screen.js
      depth-chart-screen.js
      recruiting-screen.js
```

Do not split into dozens of files immediately. The first good target is 8-12 UI files, not 50.

Rule of thumb:

- one file for app foundation
- one file for selectors
- one file for durable actions
- one file per real screen
- one file per heavily reused component

## Main Screens To Build First

### 1. Roster Room

Purpose: decide who is on the team, who matters, and who needs attention.

Layout:

```text
ObjectHeader
TabBar / ActionBar
Dense roster table
RightInspector
Status footer
```

Required:

- rows from `world.people`
- selected player state
- columns: Name, Pos, Class, Role/Status, OVR, POT, Morale, Dev Focus, Injury/Health, Watch
- row click selects player
- double-click or profile action opens `#/person/:id`
- one real action: add/remove watchlist or set development focus
- save/load preserves that action

Why first: it extends the existing working proof instead of creating a new unsupported system.

### 2. Player Profile

Purpose: understand one person and take a durable action.

Layout:

```text
ObjectHeader
Profile summary / portrait area
Tabbed detail region
Right action/history panel
Status footer
```

Required:

- reads the same person record as roster
- tabs: Overview, Development, History, Actions
- one durable action from M2: watchlist or development focus
- action log entry
- save/load preserves result

Why second: this proves object routing is not just visual navigation.

### 3. Depth Chart

Purpose: decide who starts at each position and what tradeoff that creates.

Layout:

```text
ObjectHeader
Position tabs
Starter vs challenger comparison
Depth list / table
RightInspector
Status footer
```

Required:

- backed by records, not hardcoded UI-only assignments
- selected position
- selected starter/challenger
- columns or comparison rows: OVR, POT, Morale, Dev, Health, class, fit
- one real action: set starter or move player up/down
- write action log
- save/load preserves depth move

Why third: it reuses roster, person, table, selection, inspector, and actions.

### 4. Recruiting Board

Purpose: choose targets, understand fit, and take the next recruiting action.

Do this after depth chart, not before.

Required first version:

- prospects as records
- board table
- selected prospect inspector
- action: add/remove target or assign scout
- no NIL/visit/pitch complexity yet

## What To Ignore For Now

Defer until the three main object screens work:

- full game engine integration
- transfer portal
- NIL economics
- staff carousel
- dynamic image generation
- advanced sandbox knobs
- realignment
- awards/history
- AI media voices
- broad recruiting pitch simulation

Those are valuable, but adding them before the object/action/state loop is solid will recreate the mess.

## Next Implementation Sprint

### Sprint A - M2 Player Object Loop

1. Create `js/m0/selectors.js` and move person/program/roster derived reads out of `foundation.js`.
2. Create `js/m0/actions.js` with one durable action: toggle player watchlist or set development focus.
3. Upgrade active Roster screen into a real DataGrid-style workspace.
4. Upgrade active Person Profile to show action history and the chosen durable action.
5. Add a smoke test proving the action survives save/load.

Acceptance:

- `npm run check` passes
- roster row selection works
- player profile route works
- action mutates world state
- save/load preserves action
- no visible button is fake

### Sprint B - Depth Chart

1. Add depth chart records to created world.
2. Add route/nav item only when screen works.
3. Build depth chart screen using roster/player components.
4. Add set-starter or move-depth action.
5. Add smoke test.

Acceptance:

- depth nav is visible
- position selection works
- starter/challenger comparison is clear
- depth move writes durable state
- save/load preserves depth chart

### Sprint C - Recruiting Board

1. Add shallow prospect records.
2. Add recruiting route/nav item only when screen works.
3. Build board table and inspector.
4. Add one action: add target or assign scout.
5. Add smoke test.

Acceptance:

- recruiting board is table-first
- selected prospect inspector works
- one recruiting action writes durable state
- save/load preserves it

## Practical Rule

Every screen must answer:

1. What decision is the player making?
2. What records provide the information?
3. What action can the player take now?
4. Where is that action saved?

If a screen cannot answer all four, it should not be built yet.
