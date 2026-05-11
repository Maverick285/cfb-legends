# Current UI Failure Audit

## Scope

This audit is based on the current uploaded project structure and UI implementation.

The build is a vanilla HTML/CSS/JS app with:

- `index.html`
- `styles.css`
- `app.js`
- many screens rendered as `panel(...)` cards
- grid-based content area
- cozy palette comments in CSS
- multiple simulation systems attached to a single UI shell

## Overall Verdict

```text
UI status: not acceptable
Professional polish: low
FM-likeness: low
Information architecture: partial
Visual maturity: low
```

The UI is not failing because it lacks features.

It is failing because the visual and interaction model is not disciplined enough.

## Major Failure 1 — Card Wall Instead Of Workspace

Current screens use repeated `panel(title, meta, span, body)` blocks.

This creates:

```text
dashboard card wall
samey panels
weak hierarchy
poor screen identity
low density
low professionalism
```

FM-style menus do not feel like a generic dashboard. They feel like structured workspaces with:

- object header
- tab bar
- action bar
- dense table
- filters/views
- detail inspector
- context actions
- status/footer

## Major Failure 2 — Cozy Theme Implemented As Decoration

The CSS includes warm palette comments, but the result is still amateur because:

- color tokens are not enough
- card gradients look cheap
- textures/paper metaphors are not integrated with layout
- buttons and inputs still feel generic
- panel repetition overwhelms the theme
- dark controls on cream panels create visual inconsistency
- "cozy" is not a substitute for hierarchy

Correct approach:

```text
Professional layout first.
Subtle warmth second.
No decorative gimmicks until the base UI is strong.
```

## Major Failure 3 — Debug/Sandbox Controls Are Too Prominent

The bootstrap screen exposes:

- recruiting AP
- retention AP
- portal exceptions
- scoring environment
- volatility
- tactical impact
- injury cadence
- NIL volatility
- progression pace
- transfer population
- reality anchor

This looks like a developer tool, not a professional game opening flow.

These controls should move to:

```text
Advanced Setup
Sandbox
Data Lab
Commissioner Mode
```

The normal first-start flow should show:

```text
Continue
New Career
Load Career
Favorite Team
Game Mode
Coach Setup
School Selection
```

## Major Failure 4 — Weak Typography

Current text hierarchy does not feel like a polished desktop sim.

Problems:

- headings are too plain
- labels are inconsistent
- uppercase/eyebrow style overused
- table text lacks compact professional rhythm
- numbers do not have enough dedicated treatment
- button labels do not create strong system identity

Need:

```text
strict type scale
tabular numbers
compact table typography
clear header/body/meta roles
```

## Major Failure 5 — Inconsistent Component Language

Buttons, badges, panels, rows, meters, and cards do not feel like one professional product.

Symptoms:

- too many border radii
- too many gradients
- inconsistent button weights
- generic icon buttons
- unbalanced visual weight
- panels compete for attention
- no strong base table component

Need:

```text
design system
tokenized components
screen templates
component acceptance tests
```

## Major Failure 6 — No Real Object Header Pattern

FM screens usually make it clear what object/screen you are viewing and provide tabs/actions around that object.

Current UI has:

```text
section title
status strip
cards
```

It needs:

```text
object header
primary tabs
secondary tabs when needed
action bar
view selector
filters
right inspector
```

## Major Failure 7 — Tables Are Not Professional Enough

FM's power comes from tables with:

- custom columns
- filters
- view menus
- sorting
- row click-through
- compact density
- context menus
- comparison tools

Current table rows are basic CSS grids. They are not yet a credible table system.

Need:

```text
real DataGrid component
sticky header
column definitions
resizable columns
saved views
filters
density modes
row actions
right-click/context menu
keyboard navigation
```

## Major Failure 8 — Screen Identity Is Weak

Screens currently share the same panel formula.

Roster, Recruiting, Schedule, Finance, and History all feel too similar.

Each screen needs a professional workspace structure with distinct layout priorities.

Examples:

```text
Roster = table + depth/inspector
Recruiting = search/table + board + inspector
Practice = planner + impact preview
Schedule = list + game preview + box score
Finance = ledger/table + deal review
History = archive/timeline + records
```

## Major Failure 9 — Too Many Fake-Mature Labels

Labels like "Program Desk", "Campus Pulse", and "Scrapbook" are not enough.

If the components underneath are amateur, the labels make it worse.

Narrative language must be supported by:

- hierarchy
- data structure
- timing
- tasteful presentation
- professional typography

## Major Failure 10 — No Polish Gate

The AI was allowed to keep adding features without a strict UI quality gate.

Need a hard rule:

```text
No new features until Roster and Recruiting pass FM-grade polish.
```

## Root Cause

The current UI was built from content specs, not from a professional interface system.

The AI interpreted "cozy" as:

```text
cream colors + card panels + labels
```

It should have interpreted it as:

```text
professional desktop sim layout with subtle warm visual language
```

## Immediate Corrective Action

Do not tweak colors.

Rebuild the UI foundation.

Required first:

1. professional design tokens
2. app shell
3. object header
4. tab/action bar
5. real data grid
6. right inspector
7. screen templates
8. Program Desk redesign
9. Roster redesign
10. Recruiting redesign

Only after those look good should the cozy narrative layer come back.
