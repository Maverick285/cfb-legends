# College Football Legends Visual Design System

Date: 2026-05-14

Source reference: the May 13 roster screen example with a dark full-screen console layout, left icon rail, persistent top bar, large player feature card, tabbed team panel, and dense roster table.

## North Star

The interface should feel like a premium football management game, not a website dashboard. Screens should be dense, dark, sharp, and data-forward. The visual hierarchy comes from scale, alignment, contrast, and team accent color, not from decorative cards or generic gradients.

## Canvas

- Primary target resolution: `1920x1080`.
- Desktop-first only for now. No mobile layout until the core screens are stable.
- App frame:
  - left rail: `70px`.
  - top bar visual height: about `72px`.
  - main screen area must fit inside the viewport.
  - large lists scroll inside their panel, not the entire page.
- New screen quality gate:
  - no body horizontal overflow at `1920x1080`.
  - no body vertical overflow at `1920x1080`.
  - dense data panels must use internal scrolling.

## Typography

Use three text roles:

- Display: `Bahnschrift Condensed`, then `DIN Condensed`, then `Roboto Condensed`, then `Arial Narrow`.
  - Use only for player names, large ratings, jersey numbers, major metric values, and screen-defining labels.
- UI: `Bahnschrift`, then `Aptos`, then `Segoe UI`.
  - Use for tabs, buttons, labels, table headers, compact nav, and metrics.
- Body: `Aptos`, then `Segoe UI`.
  - Use for short descriptive text and notes.

Scale:

- labels: `11px` or `12px`, uppercase, `0.14em` tracking.
- table body: `12px`.
- normal UI text: `14px`.
- compact headings: `16px` to `20px`.
- metric values: `28px` to `38px`.
- player names: `48px` to `76px`, condensed, tight leading.

Rules:

- Do not use viewport-width font scaling.
- Do not use negative letter spacing.
- Do not use hero-scale type inside small boxes.
- Avoid long text in buttons. Prefer icon buttons with tooltip/label where possible.

## Color

Base palette:

- background: near-black green/blue-black.
- panels: stepped black surfaces, not saturated color blocks.
- text: warm off-white.
- muted text: desaturated warm gray.
- accent: team secondary color, with `#ffb81c` as the default gold/orange accent.

Status colors:

- good/success: green.
- warning/attention: amber.
- danger/injury/error: red.
- info/scouting: blue.

Rules:

- Team primary color should tint large feature surfaces only.
- Team secondary color should drive selected rows, active tabs, key outlines, and CTA accents.
- Do not let a single hue dominate every panel. Use dark neutrals for structure and team color as emphasis.

## Spacing

Use a 4px grid:

- `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`.

Rules:

- Panel gaps should usually be `8px` or `12px`.
- Dense table cells should use `6px 10px`.
- Panel internal padding should usually be `12px` or `14px`.
- Do not nest cards inside cards. Use bordered regions and bands.

## Panels

Panel style:

- square corners.
- 1px low-contrast border.
- near-black translucent or solid surface.
- selected/accent state uses a thin team-color line or outline.

Panel hierarchy:

- primary feature card: largest region, can carry team tint and asset art.
- overview band: single horizontal panel with metric columns.
- context band: compact row of mode-specific metrics.
- table panel: scrollable list region with sticky header.

Rules:

- A panel must have a data purpose.
- Avoid filler panels. If a system is not implemented, show a real derived summary or do not expose the panel.
- No marketing-style hero cards inside the management shell.

## Tables

Roster/list tables are core UI.

Rules:

- Header height: about `34px`.
- Row height: about `34px`.
- Use tabular numerals.
- Sticky headers.
- Selected row: subtle team-color tint plus 1px accent outline.
- Hover row: low-contrast neutral highlight.
- Sort indicators should be compact symbols, not words.
- Keep columns stable; do not resize the layout when sort/filter state changes.

Required roster columns for the current roster page:

- number
- position
- year/class
- NIL
- morale
- overall
- fit
- player
- archetype/trait
- speed
- strength
- football IQ
- hometown
- status

## Navigation

Left rail:

- icon-only.
- `70px` wide.
- selected page gets team accent outline/left emphasis.
- disabled future sections may appear only if visually subdued and not presented as working.

Top bar:

- contains team mark/name, program metrics, week/date, next opponent, and Continue.
- Continue is the primary top-right action.
- Save/reset/debug controls should not visually compete with Continue.

Team room tabs:

- Overview
- Depth Chart
- Formation Subs
- NIL/Budget
- Health
- Staff

Tabs must not pretend a full page exists. Until a tab has durable state, it can show a compact seed-backed summary only.

## Asset Slots

For now, user-generated image assets can be dropped into the app. Later, the game can generate them.

Player model source asset:

- format: transparent PNG.
- source size: `1024x1024`.
- visible crop: knees-up or thighs-up player render.
- pose: front three-quarter, arms relaxed or game-ready, no ball unless the player role calls for it.
- lighting: dramatic stadium/key light, transparent background.
- uniform: school color accurate where possible.
- filename convention: `<personId>.png`, for example `person_007869.png`.
- folder: `cfl-app/public/assets/player-models/`.

Player-card background asset:

- format: JPG or PNG.
- source size: `1536x864`.
- use for team/player feature card backing plates.
- filename convention: `<programId>-player-card-bg.png`.
- folder: `cfl-app/public/assets/card-backgrounds/`.

Fallback rule:

- If a player model is missing, use a premium abstract jersey-number/position treatment.
- Missing art must not show broken image icons.
- The fallback is acceptable for development, not final visual target.

## Implementation Rules

- New visual constants belong in `cfl-app/src/styles/tokens.css`.
- Screen CSS should use tokens where possible.
- Do not add one-off colors or spacing unless there is a documented reason.
- Every new screen must have a Playwright screenshot at `1920x1080`.
- A screen is not visually accepted if it has body overflow, text collisions, broken asset icons, or fake-looking visible controls.

## Pushback Rule

If a requested layout would produce weak visual quality, fake functionality, or a screen that looks like scaffolding, stop and revise the plan before coding. Use the sketch for structure, not as permission to ship crude placeholders.
