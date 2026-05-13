# College Football Legends — UI Refactor & Premium Screen Plan

## Purpose

This plan is for turning the current `cfb-legends` repo from a large working prototype into a maintainable, premium-looking, desktop-first sports-management game UI.

The goal is not to randomly “modernize” the code. The goal is to preserve the working sim/game systems while creating a reusable UI architecture that can support dense Football Manager / OOTP / CK-style screens without becoming unmaintainable.

---

## Current Read

The repo has already improved since the first audit. You now have:

- A real `js/ui` layer beginning.
- A reusable `datagrid.js` table/workspace component.
- Dedicated UI helper files for several workspaces.
- A real design-token section in `styles.css`.
- A simulation folder with many separate systems.
- A still-too-large `app.js` that continues to hold too much world/UI/state/screen logic.

The next move is to finish separating the UI from `app.js` without breaking the game.

---

# High-Level Strategy

## Core rule

`app.js` should become the conductor, not the orchestra.

It should eventually only handle:

| Responsibility | Explanation |
|---|---|
| Bootstrapping | Load the game, content pack, save data, and initial state. |
| Routing | Determine which screen is active. |
| Global event delegation | Catch high-level clicks and route them to the right module. |
| Global state coordination | Pass state into screen renderers. |
| Save/load calls | Trigger persistence, but not contain the entire persistence system. |

Everything else should move into dedicated modules.

---

# Target Folder Structure

```text
js/
  app/
    bootstrap.js
    router.js
    state.js
    events.js
    selectors.js

  ui/
    components/
      shell.js
      datagrid.js
      player-profile-hero.js
      player-comparison-hero.js
      player-actions-menu.js
      stat-pill.js
      status-pill.js
      tab-bar.js
      inspector.js
      footer-ticker.js

    screens/
      dashboard-screen.js
      roster-screen.js
      depth-chart-screen.js
      recruiting-hub-screen.js
      recruiting-pitch-screen.js
      calendar-screen.js
      game-planning-screen.js
      portal-screen.js
      staff-screen.js
      finance-screen.js

    helpers/
      workspace-table.js
      topbar-tools.js
      saved-views.js
      export-tools.js
      room-focus.js
      analytics-focus.js

  sim/
    existing sim files stay here

  data/
    demo-world.js
    fbs-world.js

assets/
  ui/
    icons/
    textures/
    portraits/
    panels/
    badges/
```

---

# Phase 1 — Freeze Before Refactor

| Step | Your Task | AI Agent Prompt | Expected Output | Why This Matters |
|---|---|---|---|---|
| 1.1 | Commit the current working state. | `Before changing anything, create a git commit with the message: "Checkpoint before UI refactor". Do not modify code. Confirm the working tree is clean afterward.` | Clean git checkpoint. | Refactors create weird bugs. You need a hard restore point. |
| 1.2 | Run the game locally and screenshot key screens. | `Launch the current game locally. Capture screenshots of the dashboard, roster, depth chart, recruiting, calendar, and game planning screens. Save them in /docs/audit/current-screens/.` | Baseline screenshots. | You need visual regression references so the agent does not accidentally delete working screens. |
| 1.3 | Generate a file map. | `Create docs/audit/repo-map.md listing the major files and what each appears to do. Focus on app.js, styles.css, js/ui, js/sim, data, and assets.` | Repo map. | Prevents the AI from blindly editing files it does not understand. |
| 1.4 | Identify top-level render functions in `app.js`. | `Scan app.js and create docs/audit/app-render-inventory.md. List every function that renders a major screen, panel, table, modal, profile, inspector, or navigation element. Include line references if possible.` | Render inventory. | This tells you what should move out of `app.js`. |

---

# Phase 2 — Define the UI Contract

Before moving code, define what each screen receives and returns.

## Screen Module Standard

Every screen file should follow this shape:

```js
(function initRosterScreen(global) {
  function renderRosterScreen(ctx) {
    const { state, world, uiState } = ctx;
    return `
      <section class="screen screen-roster">
        ...
      </section>
    `;
  }

  function bindRosterScreenEvents(root, ctx) {
    // Optional. Use only for screen-specific events.
  }

  global.CGM_SCREENS = global.CGM_SCREENS || {};
  global.CGM_SCREENS.roster = {
    render: renderRosterScreen,
    bind: bindRosterScreenEvents,
  };
})(window);
```

## Context Object Standard

```js
const ctx = {
  state,
  world,
  uiState,
  selectors,
  actions,
  components,
};
```

| Field | Meaning |
|---|---|
| `state` | Current career/save/game state. |
| `world` | Static game world/content pack data. |
| `uiState` | Filters, selected player IDs, selected tabs, sorting, open menus. |
| `selectors` | Read-only helper functions that derive data. |
| `actions` | Functions that mutate state or trigger game actions. |
| `components` | Shared UI render functions. |

## AI Agent Prompt

```text
Create docs/architecture/ui-module-contract.md.

Define the standard interface for every UI screen module in this game.

Requirements:
- No framework migration yet.
- Use the current global browser-script style.
- Screens should register themselves under window.CGM_SCREENS.
- Components should register under window.CGM_UI.
- app.js should call screen.render(ctx), then optionally screen.bind(root, ctx).
- Include examples for roster-screen.js and depth-chart-screen.js.
- Explain how this keeps app.js small while avoiding a React migration for now.
```

## Explanation

This avoids the trap of moving code into random files with no contract. You want a boring standard so every future screen works the same way.

---

# Phase 3 — Extract Shared Components First

Do not start with whole screens. Start with reusable components that roster/depth/recruiting will all need.

## Component Priority Table

| Priority | Component | File | Explanation |
|---:|---|---|---|
| 1 | Player Profile Hero | `js/ui/components/player-profile-hero.js` | This is the top-half full-width roster profile. It defines the premium visual language for player screens. |
| 2 | Player Comparison Hero | `js/ui/components/player-comparison-hero.js` | Used by depth chart, transfer portal, recruiting comparisons, and position battles. |
| 3 | Player Actions Menu | `js/ui/components/player-actions-menu.js` | Needed across roster, depth chart, recruiting, NIL, discipline, development, and portal. |
| 4 | Status Pill | `js/ui/components/status-pill.js` | Used for morale, injury, redshirt, transfer risk, academic risk, NIL status, eligibility. |
| 5 | Stat Pill / Stat Grid | `js/ui/components/stat-pill.js` | Reusable dense numeric display without attribute bars. |
| 6 | Footer Ticker | `js/ui/components/footer-ticker.js` | Keeps the bottom frame consistent across modules. |
| 7 | Screen Header | `js/ui/components/screen-header.js` | Keeps page titles, breadcrumbs, and filters consistent. |

---

## Prompt 3.1 — Extract Player Profile Hero

```text
Create js/ui/components/player-profile-hero.js.

Goal:
Build a reusable premium player profile hero component for College Football Legends.

It should render the top half of the roster screen.

Inputs:
- player
- team
- selectedPanelIndex
- availablePanels
- actions
- options

Visual requirements:
- Full-width horizontal profile hero.
- Large stylized player thumbnail on the left.
- Player name and overall rating close together.
- No row of data directly under the thumbnail.
- Bio information grouped cleanly: position, class, height, weight, hometown, archetype, eligibility, scholarship/NIL.
- Morale should be prominent but not cartoonish.
- Dense numeric attributes only. No attribute bars.
- Include nav bubbles/dots showing profile subpages: Overview, Attributes, Development, Contract/NIL, History.
- Include a closed "Player Actions" button/menu area, but do not auto-open the dropdown.
- Use existing design tokens from styles.css.
- Return an HTML string.
- Register as window.CGM_UI.renderPlayerProfileHero.

Do not change app.js yet except to include the script in index.html if necessary.
Also add the CSS needed to styles.css under a clear comment:
"/* Player Profile Hero */"
```

## Why

This component is the single most important visual object in the game. If this looks premium, the roster, depth chart, portal, development, and recruiting pages can all inherit the same visual standard.

---

## Prompt 3.2 — Extract Player Comparison Hero

```text
Create js/ui/components/player-comparison-hero.js.

Goal:
Build a reusable two-player comparison hero for the Depth Chart screen.

Inputs:
- leftPlayer
- rightPlayer
- position
- comparisonStats
- selectedPanelIndex
- availablePanels
- actions

Visual requirements:
- Same premium frame language as PlayerProfileHero.
- Two player thumbnails on opposite sides.
- Player names and overall ratings should sit on or near the lower portion of each thumbnail, like a stylized VS matchup card.
- Center should compare many applicable stats, not one bar.
- Use dense numeric comparison rows.
- Highlight the better number subtly.
- Include closed Player Actions buttons under each player.
- Include nav bubbles/dots for comparison pages: Overview, Key Attributes, Production, Development, Risk.
- Return an HTML string.
- Register as window.CGM_UI.renderPlayerComparisonHero.
- Add CSS to styles.css under:
"/* Player Comparison Hero */"
```

## Why

Depth chart is not just a list. It is a position-battle screen. The player should feel like they are comparing two athletes for a job, not looking at a spreadsheet.

---

## Prompt 3.3 — Extract Player Actions Menu

```text
Create js/ui/components/player-actions-menu.js.

Goal:
Create a reusable closed Player Actions button/menu component.

Inputs:
- player
- context
- isOpen
- availableActions

Actions should support examples like:
- View Full Profile
- Promise Playing Time
- Discuss Role
- Redshirt Plan
- NIL Conversation
- Development Focus
- Injury Review
- Discipline Meeting
- Transfer Risk Meeting
- Add to Watchlist
- Compare Player

Requirements:
- Component should render closed by default.
- It should use data attributes for event delegation.
- Do not implement the actual game logic yet.
- Register as window.CGM_UI.renderPlayerActionsMenu.
- Include a small helper window.CGM_UI.getDefaultPlayerActions(player, context).
```

## Why

This creates the RPG-style management interaction layer. You will use the same action menu everywhere, so it must be reusable early.

---

# Phase 4 — Rebuild the Roster Screen Around Components

## Desired Roster Layout

```text
┌────────────────────────────────────────────────────────────┐
│ Player Profile Hero — top 1/2, full width                  │
│ thumbnail | name + OVR | bio | morale | attributes | menu  │
│ nav bubbles: overview / attributes / development / etc.    │
├────────────────────────────────────────────────────────────┤
│ Filters / sorting / view tabs                              │
├────────────────────────────────────────────────────────────┤
│ Dense roster table                                         │
│ POS | Name | OVR | POT | CLS | HT | WT | Morale | NIL | ...│
└────────────────────────────────────────────────────────────┘
│ footer ticker/status bar                                   │
└────────────────────────────────────────────────────────────┘
```

## Prompt 4.1 — Create Roster Screen Module

```text
Create js/ui/screens/roster-screen.js.

Goal:
Move the roster screen rendering out of app.js and rebuild it using:
- window.CGM_UI.renderPlayerProfileHero
- window.CGM_DATAGRID.renderDataGrid
- existing roster/team/player data

Requirements:
- Top half of the screen is the player profile hero.
- Bottom half is a dense sortable roster table.
- No attribute bars in the roster list.
- Use numeric columns.
- Include at least these columns if data exists:
  POS, Name, OVR, POT, Class, Height, Weight, Morale, Fatigue, Health, NIL, Redshirt, Eligibility, Role, Depth, Dev, Transfer Risk.
- Selected player in the table controls the player shown in the hero.
- Preserve existing roster functionality where possible.
- Do not delete old roster logic until the new screen works.
- Register the screen as window.CGM_SCREENS.roster.
- Add comments explaining what old app.js logic this replaces.
```

## Explanation

This gets you out of “giant HTML string in app.js” and into a reusable screen file. It also forces the roster screen to use the new profile hero instead of becoming a one-off layout.

---

## Prompt 4.2 — Wire Roster Screen Into Router

```text
Update the app routing/rendering so that when active view is "roster", app.js uses window.CGM_SCREENS.roster.render(ctx).

Requirements:
- Keep a fallback to the old roster renderer if the new module fails.
- Add console.warn messages if the new screen module is missing.
- Do not remove old code yet.
- Confirm the roster page loads without console errors.
- Confirm selecting a player updates the hero.
```

## Explanation

Do not rip out old code immediately. Add the new version behind the same route, verify it, then clean later.

---

# Phase 5 — Rebuild the Depth Chart Screen

## Desired Depth Chart Layout

```text
┌────────────────────────────────────────────────────────────┐
│ Player Comparison Hero                                     │
│ left thumbnail/name/OVR  vs  comparison grid  vs  right    │
│ closed Player Actions under each player                    │
│ nav bubbles: overview / key attrs / production / risk      │
├────────────────────────────────────────────────────────────┤
│ Position selector tabs: QB HB WR TE OL DL LB CB S K P      │
├───────────────────────────────┬────────────────────────────┤
│ Selected Position List         │ Role/position notes        │
│ QB1 Player A                   │ scheme fit                 │
│ QB2 Player B                   │ development note           │
│ QB3 Player C                   │ fatigue/injury risk        │
└───────────────────────────────┴────────────────────────────┘
│ footer ticker/status bar                                   │
└────────────────────────────────────────────────────────────┘
```

## Prompt 5.1 — Create Depth Chart Screen Module

```text
Create js/ui/screens/depth-chart-screen.js.

Goal:
Move depth chart rendering out of app.js and rebuild it using:
- window.CGM_UI.renderPlayerComparisonHero
- window.CGM_DATAGRID.renderDataGrid
- existing depth chart/player/team data

Requirements:
- Only one position is selected at a time.
- The lower middle-left section lists players for the selected position.
- The top hero compares the current starter vs selected challenger.
- Player names and OVR should be attached visually to the lower part of their thumbnails.
- Center comparison should include multiple relevant stats for the selected position.
- Include closed Player Actions under each player.
- Use numeric comparison rows, not bars.
- Add position tabs or pills.
- Register as window.CGM_SCREENS.depth.
```

## Explanation

This creates the reusable “position battle” screen. Depth chart should feel like a coaching decision room, not a generic table.

---

# Phase 6 — Asset Naming and Graphic Placement

## Why this matters

You asked for a way to see which graphics go where. The answer is an asset manifest.

You do not want random image paths buried in CSS and JS. You want named assets with intended usage.

## Target Asset Manifest

Create:

```text
assets/ui/asset-manifest.js
```

Example:

```js
window.CGM_ASSETS = {
  textures: {
    appBg: "assets/ui/textures/app-bg-noise.webp",
    panelGrain: "assets/ui/textures/panel-grain.webp",
    stadiumWash: "assets/ui/textures/stadium-wash.webp",
  },
  portraits: {
    placeholder: "assets/ui/portraits/player-placeholder.svg",
  },
  panels: {
    heroFrame: "assets/ui/panels/hero-frame.svg",
    comparisonSlash: "assets/ui/panels/comparison-slash.svg",
  },
  icons: {
    roster: "assets/ui/icons/roster.svg",
    depth: "assets/ui/icons/depth-chart.svg",
    recruiting: "assets/ui/icons/recruiting.svg",
  },
};
```

## Prompt 6.1 — Build Asset Manifest

```text
Create assets/ui/asset-manifest.js.

Goal:
Centralize all UI graphic paths for College Football Legends.

Requirements:
- Create categories: textures, portraits, panels, badges, icons, backgrounds, overlays.
- Use existing asset paths if files exist.
- For missing assets, add placeholder paths and comments explaining what asset should eventually be created.
- Register as window.CGM_ASSETS.
- Update one component, PlayerProfileHero, to read from window.CGM_ASSETS where appropriate.
```

## Explanation

This lets you inspect a screen and immediately know that a graphic comes from `CGM_ASSETS.panels.heroFrame`, not some mystery CSS background.

---

# Phase 7 — CSS Cleanup Without Breaking Everything

## Problem

`styles.css` is improving, but long-term it will become another `app.js` if it holds every style.

## Target CSS Split

```text
styles/
  tokens.css
  shell.css
  components/
    datagrid.css
    player-profile-hero.css
    player-comparison-hero.css
    player-actions-menu.css
    status-pill.css
  screens/
    roster-screen.css
    depth-chart-screen.css
    recruiting-screen.css
    dashboard-screen.css
```

## But do not split immediately.

First, mark sections clearly inside `styles.css`.

## Prompt 7.1 — Add CSS Section Index

```text
Refactor styles.css only by adding clear section comments and a table of contents at the top.

Do not change visual values yet.

Add section headings like:
- Design Tokens
- Global Reset
- App Shell
- Sidebar Navigation
- Topbar
- M0 Workspace
- DataGrid
- Player Profile Hero
- Player Comparison Hero
- Dashboard
- Bootstrap / Main Menu
- Utilities
- Responsive Rules

Do not move CSS into separate files yet.
Do not alter selectors unless necessary.
```

## Explanation

This is a safe first step. You want organization before file-splitting.

---

# Phase 8 — DevTools Workflow

Once the components exist, Chrome DevTools becomes useful.

## Your Manual Workflow

| Action | What You Look For | Why |
|---|---|---|
| Inspect player profile hero | Check class names, asset paths, layout boxes | Confirms the component is traceable. |
| Toggle selected player | Watch which DOM changes | Confirms state flow is clean. |
| Resize browser | Check if dense desktop layout breaks | This game should be desktop-first but not totally fragile. |
| Use computed styles | Verify token usage | Prevents random one-off colors/sizes. |
| Check console | Find missing modules/assets | Catches failed script loads and broken data. |
| Use Network tab | Confirm assets load once | Prevents repeated image loads or broken paths. |
| Performance tab later | Measure heavy screens | Dense tables can get slow if rendering is sloppy. |

## DevTools checklist

```text
For each screen:
[ ] No console errors.
[ ] No missing asset 404s.
[ ] Main screen uses one registered screen module.
[ ] Reusable components are visible in class names.
[ ] No giant inline style blobs except controlled meter widths.
[ ] Table header remains sticky if intended.
[ ] Footer/ticker remains anchored.
[ ] Selected row state is obvious.
[ ] Clicking player updates the hero without full app reload.
[ ] Layout still works at 1366x768 and 1920x1080.
```

---

# Phase 9 — Prompt Pack for AI Agent

## Prompt A — General Working Rules

```text
You are working on the College Football Legends repo.

Rules:
1. Preserve existing game functionality.
2. Do not delete old code until the replacement is verified.
3. Keep app.js moving toward router/bootstrap/controller only.
4. New UI screen modules register under window.CGM_SCREENS.
5. New reusable UI components register under window.CGM_UI.
6. Use existing design tokens from styles.css.
7. No generic SaaS/dashboard aesthetic.
8. The target look is premium desktop sports-management game UI: dense, cinematic, tactile, dark, metallic, collegiate, and data-rich.
9. Avoid huge whitespace, mobile-first card layouts, generic Tailwind/SaaS patterns, and childish bright colors.
10. After each task, report changed files, what was moved, what still depends on app.js, and any console errors.
```

---

## Prompt B — Audit Before Editing

```text
Before editing, inspect the repo and answer:
1. Which functions currently render the target screen?
2. Which data structures does the screen depend on?
3. Which event handlers does it use?
4. Which CSS classes does it rely on?
5. Which pieces should become shared components?
6. What is the safest incremental change?

Then make only the smallest useful change.
```

---

## Prompt C — Roster Screen Premium Rebuild

```text
Rebuild the roster screen as a premium desktop sports-management screen.

Use:
- PlayerProfileHero across the top half/full width.
- Dense sortable roster table underneath.
- No attribute bars.
- Numeric columns.
- Player Actions menu closed by default.
- Nav bubbles in the profile hero for profile subpages.
- Existing left navigation/topbar/footer should remain intact.

Do not invent a new app shell.
Do not make it look like a SaaS admin dashboard.
Preserve existing data and selection behavior.
```

---

## Prompt D — Depth Chart Premium Rebuild

```text
Rebuild the depth chart screen as a position-battle screen.

Use:
- PlayerComparisonHero across the top.
- Left player and right player thumbnails on opposite sides.
- Names and overall ratings visually attached to the lower part of the thumbnails.
- Dense comparison grid in the center with many relevant stats.
- Closed Player Actions under each player.
- One selected position at a time.
- Lower panel lists the depth order for that selected position.

Do not use a generic table-only layout.
The screen should feel like a coaching staff comparing two players for a starting job.
```

---

## Prompt E — Asset Manifest

```text
Create a centralized asset manifest for UI graphics.

Goal:
When I inspect a screen, I should be able to tell which file supplies each major graphic element.

Create:
assets/ui/asset-manifest.js

Register:
window.CGM_ASSETS = { ... }

Categories:
- icons
- portraits
- textures
- panels
- badges
- backgrounds
- overlays

Then update one component to use the manifest.
```

---

## Prompt F — Stop Cheap Web App Syndrome

```text
Review the screen for cheap-web-app visual problems.

Flag and fix:
- Too much whitespace.
- Generic rounded cards.
- Weak typography.
- Low data density.
- Flat SaaS dashboard feel.
- Inconsistent padding.
- Too many random colors.
- Lack of texture or frame hierarchy.
- Buttons that look like website buttons instead of game controls.
- Tables that look like spreadsheets instead of management-game tables.

Target:
Premium desktop game UI, not a SaaS product.
```

---

# Phase 10 — Acceptance Criteria

Do not consider the refactor successful until these are true.

## Code Structure

| Criteria | Pass/Fail |
|---|---|
| `app.js` no longer owns roster rendering. |  |
| `app.js` no longer owns depth chart rendering. |  |
| `PlayerProfileHero` is reusable. |  |
| `PlayerComparisonHero` is reusable. |  |
| `PlayerActionsMenu` is reusable. |  |
| `DataGrid` is used instead of custom one-off tables where practical. |  |
| Screen modules register under `window.CGM_SCREENS`. |  |
| Components register under `window.CGM_UI`. |  |
| Asset paths are centralized for major UI graphics. |  |

## Visual Quality

| Criteria | Pass/Fail |
|---|---|
| Roster page has premium top-half player profile hero. |  |
| Roster table is dense and data-rich. |  |
| Depth chart page feels like a position-battle comparison screen. |  |
| Player thumbnails are prominent and stylized. |  |
| Overall ratings are close to names, not floating randomly. |  |
| Footer/ticker remains consistent. |  |
| Left nav remains consistent. |  |
| No generic SaaS dashboard feel. |  |
| No childish/mobile-game look. |  |
| No dead/mystery graphics with unknown file origins. |  |

## Functional Quality

| Criteria | Pass/Fail |
|---|---|
| No console errors. |  |
| No missing asset 404s. |  |
| Selecting roster row updates player hero. |  |
| Selecting depth position updates player list. |  |
| Selecting challenger updates comparison hero. |  |
| Player Actions renders closed by default. |  |
| Sorting/filtering works where expected. |  |
| Save/load still works after UI changes. |  |

---

# Recommended Work Order

Do this in order:

```text
1. Commit current state.
2. Create repo map and render inventory.
3. Create UI module contract doc.
4. Create PlayerActionsMenu.
5. Create PlayerProfileHero.
6. Create PlayerComparisonHero.
7. Build new roster-screen.js.
8. Wire roster route with fallback.
9. Build new depth-chart-screen.js.
10. Wire depth route with fallback.
11. Add asset manifest.
12. Add CSS section index.
13. Only then start polishing visual assets.
```

---

# Critical Warning

Do not let the AI agent “redesign the app” in one big pass.

That is how you get broken spaghetti with prettier CSS.

The correct approach is:

```text
one component
one screen
one route
one test
one commit
```

Repeat.

---

# Final Practical Rule

Every new screen should answer four questions:

1. What decision is the player making here?
2. What information do they need to make that decision?
3. What action can they take immediately?
4. What visual hierarchy makes that obvious?

For roster:

> “Who is this player, what is his status, and what do I want to do with him?”

For depth chart:

> “Who should start at this position, and what am I risking by choosing him?”

For recruiting:

> “Who do I want, what do they care about, and what pitch/NIL move changes the story?”

For game planning:

> “Where is the opponent dangerous, and what plan gives me the best chance this week?”

Build every UI module around that decision.
