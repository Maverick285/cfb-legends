

<!-- FILE: 00_START_HERE_UI_RESCUE_POLISH_PACK.md -->

# CFB-FM UI Rescue and Professional Polish Pack — Start Here

## Purpose

This pack exists because the current UI is not acceptable.

The current build looks amateur because it is still a card-dashboard prototype with a decorative "cozy" skin. The issue is not the cozy/narrative direction. The issue is execution.

The UI must be rebuilt around professional management-sim information architecture.

## Blunt Diagnosis

Current UI failure mode:

```text
decorative panels
generic dashboard layout
weak hierarchy
too much card grid
not enough dense table/workspace structure
inconsistent palette
inconsistent spacing
debug/sandbox controls exposed too early
no strong visual system
no FM-grade interaction model
```

The correct target:

```text
professional
dense
restrained
credible
FM-like
desktop-first
table-forward
clickable
polished
warm only as subtle atmosphere
```

## What This Pack Does

It defines:

- why the current UI fails
- what FM-style menus actually do well
- a new professional visual standard
- a strict redesign target
- screen-by-screen redlines
- component rules
- CSS/design-token rules
- implementation sequence
- ready-to-paste prompts for the AI
- acceptance gates

## Critical Reset

The phrase "cozy nostalgic" was interpreted too literally.

The new instruction is:

```text
Professional FM-style management UI first.
Warm nostalgic atmosphere second.
Decoration last.
```

## New UI North Star

```text
CFB-FM should feel like a professional college football management application with the density and credibility of Football Manager, lightly skinned with warm program-office atmosphere. It should never look like a hobby dashboard or fake scrapbook site.
```

## Immediate Build Order

1. Freeze feature additions.
2. Audit current CSS and markup.
3. Replace card dashboard layout with workspace shell.
4. Build professional design tokens.
5. Build real table component.
6. Build tab bar and action bar.
7. Build right inspector.
8. Redesign Program Desk.
9. Redesign Roster as the UI benchmark.
10. Redesign Recruiting as the second benchmark.
11. Apply to all screens.
12. Only then reintroduce cozy narrative accents.

## Hard Rule

No more new features until the UI passes the polish gate.

A feature screen is not acceptable if it looks like:

```text
generic web dashboard
bootstrap admin panel
student project
card wall
debug tool
```

It must look like:

```text
serious desktop management sim
```


<!-- FILE: 01_CURRENT_UI_FAILURE_AUDIT.md -->

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


<!-- FILE: 02_FM_MENU_BENCHMARK_AND_POLISH_PRINCIPLES.md -->

# FM Menu Benchmark and Polish Principles

## Purpose

This document defines what the UI should learn from Football Manager menus.

This is not about copying FM assets or exact layouts.

It is about copying the product discipline.

## FM Interface Traits To Emulate

## 1. Dense Clickability

FM's official manual emphasizes that a huge number of on-screen items are clickable and reveal details. That is the core interaction philosophy.

CFB-FM must follow this:

```text
Every player, recruit, staff member, team, stat, trait, report source, and event entity should be clickable.
```

## 2. Sidebar As Primary Club Navigation

FM uses a sidebar as the main way to navigate the user's club/institution area.

CFB-FM should keep a stable left sidebar.

But it must look professional:

- compact
- aligned
- clear active state
- restrained icons
- no oversized cards
- no noisy footer widget

## 3. Object-Based Screens

FM screens usually represent a main game object:

- player
- club
- squad
- competition
- match
- staff member

CFB-FM should organize screens around objects:

- program
- roster
- player
- recruit
- staff member
- game
- conference
- school

Each object gets:

- header
- tabs
- action menu
- related links
- inspector

## 4. Tab Bars and Menus

FM uses tabs to navigate around the current screen/object.

CFB-FM needs a tab system on every major workspace.

Examples:

Roster:

```text
Overview | Players | Depth Chart | Eligibility | Morale | Development | NIL | Transfer Risk
```

Recruiting:

```text
Overview | Search | Board | Visits | Offers | Staff | Competitors | Analytics
```

## 5. Customizable Views and Columns

FM supports customizable columns and table views.

CFB-FM needs this before the UI will feel serious.

Minimum:

- saved views
- column show/hide
- sorting
- filtering
- density toggle
- sticky headers

## 6. Filters

FM screens often include filters.

CFB-FM must not hide filtering behind cute panels.

Every major table needs visible filter affordances:

- position
- class
- status
- risk
- confidence
- region
- role
- NIL expectation

## 7. Continue As Central Time Control

FM treats Continue as the central conduit for progressing time.

CFB-FM must treat Continue as sacred:

- always visible
- strong placement
- blockers obvious
- quick fix resolver
- not visually buried

## 8. Navigation History / Back-Forward

FM supports navigation history.

CFB-FM needs:

- back
- forward
- breadcrumbs
- recent screens
- search
- bookmarks

## 9. Context Actions

FM supports right-click/context menus and action menus.

CFB-FM needs:

- row actions
- context menu
- action dropdowns
- right inspector quick actions

Examples:

Right-click player:

- open profile
- compare
- add to watchlist
- meet with player
- change development focus
- view stats
- view promises

## 10. Professional Restraint

FM menus are not gorgeous in a Dribbble sense.

They are professional because they are:

- consistent
- dense
- functional
- aligned
- restrained
- systematized

CFB-FM needs that first.

## What Not To Copy From FM25

FM25 screenshots were not a released final game. They were work-in-progress/preview material, and FM25 was ultimately cancelled.

Use them as caution, not gospel.

The lesson:

```text
A cleaner UI is not automatically a better management UI.
```

The goal is not more empty space and fewer panels.

The goal is:

```text
more usable density
better hierarchy
less visual amateurism
```

## FM-Inspired CFB-FM Layout Principle

Every major workspace should follow:

```text
Object Header
Subnav Tabs
View / Filter / Action Bar
Main Dense Table or Structured Workspace
Right Inspector
Status / Reason Codes / Footer
```

## FM-Inspired Professional Polish Checklist

A screen should pass:

- clear screen/object identity
- professional spacing
- compact density
- useful table view
- consistent buttons
- consistent typography
- visible filters/actions
- clickable rows
- right inspector
- no decorative clutter
- no debug controls
- no generic card wall
- no fake data

## CFB-FM Distinction

CFB-FM should still have:

- Program Desk
- Campus Pulse
- Program Scrapbook
- recruiting room identity
- coach office warmth

But these should sit on top of a professional FM-grade structure.

Warmth is atmosphere.

Structure is product quality.

## Target Feeling

```text
This looks like a serious management sim that has been skinned with college football warmth.
```

Not:

```text
This looks like a cozy web dashboard made in one weekend.
```


<!-- FILE: 03_PROFESSIONAL_UI_REDLINE_STANDARDS.md -->

# Professional UI Redline Standards

## Purpose

This document sets hard visual and interaction standards.

If a screen violates these, reject it.

## Redline 1 — No Card Walls For Core Screens

Core screens may use panels, but not as the main structure.

Forbidden for core screens:

```text
12 equal cards in a grid
repeated panel(title, meta, body)
dashboard card soup
```

Required:

```text
workspace header
tabs
action/filter bar
primary table/workspace
right inspector
secondary panels only when useful
```

## Redline 2 — No Debug Controls In Normal Flow

Sandbox sliders cannot appear in the standard bootstrap or career start screen.

Move to:

```text
Advanced Setup
Sandbox
Data Lab
Commissioner Mode
```

## Redline 3 — Tables Must Be Real Tables

A CSS grid pretending to be a table is not enough.

Minimum table requirements:

- column definitions
- sticky header
- sorting
- filtering
- row selection
- clickable rows
- keyboard focus
- density modes
- saved views
- empty state
- loading state

## Redline 4 — One Component System

No random one-off panels.

Required components:

- AppShell
- Sidebar
- TopBar
- ObjectHeader
- TabBar
- ActionBar
- DataGrid
- RightInspector
- ProgramItem
- MomentCard
- StatusBadge
- FilterBar

## Redline 5 — Strict Spacing System

Use an 8px spacing system.

Allowed spacing:

```text
4
8
12
16
24
32
48
```

Avoid random one-offs.

## Redline 6 — Strict Type Scale

Recommended base:

```text
11px micro
12px label
13px table/body compact
14px body
16px subhead
20px screen title
24px major title
32px rare hero
```

Use tabular numbers for stats.

## Redline 7 — Controlled Color

Use semantic tokens.

Do not hand-code random colors in components.

Color roles:

- background
- surface
- surface raised
- text primary
- text secondary
- border
- accent
- warning
- danger
- success
- info

## Redline 8 — Team Colors Are Accents

Team color may appear in:

- active nav indicator
- header underline
- selected row accent
- badge accent
- milestone border

It should not flood panels.

## Redline 9 — No Cheap Gradients

Use gradients only if subtle and systematic.

Forbidden:

- random panel gradients
- high contrast shiny effects
- fake parchment gradients on every card

## Redline 10 — Right Inspector Required

For dense screens, selecting a row should populate a right inspector.

Screens requiring inspector:

- roster
- recruiting
- portal
- staff
- finance/NIL
- schedule/game
- data hub

## Redline 11 — Context Actions Required

Rows should support actions.

Minimum:

- open profile
- compare
- watchlist
- primary action
- more actions

## Redline 12 — Breadcrumbs Required For Drill-Down

Profiles and nested pages need breadcrumbs.

Example:

```text
Recruiting > Board > QB > Darius McClain
```

## Redline 13 — No Icon-Only Ambiguity

Icon-only buttons need:

- tooltip
- aria-label
- consistent placement
- text alternative in key areas

## Redline 14 — No All-Caps Everywhere

Use uppercase only for labels and tiny metadata.

Do not make the whole UI shout.

## Redline 15 — No Full Cozy Gimmick

Do not implement:

- fake wood background
- heavy parchment
- fake sticky notes everywhere
- novelty fonts
- huge scrapbook UI on normal screens

Cozy should be a restraint layer, not a theme park.

## Redline 16 — Main Menu Must Look Like A Product

The current bootstrap modal is not acceptable.

Main menu must have:

- polished save cards
- clean new career flow
- favorite team chooser
- settings
- Data Lab
- no developer sliders unless Advanced Setup

## Redline 17 — Program Desk Must Be Triage, Not Inbox Soup

Program Desk sections:

- Must Fix
- Today's Decisions
- Staff Briefing
- Calendar
- Campus Pulse
- Media Clippings
- Watchlist

Do not show raw `Inbox` as a generic list without hierarchy.

## Redline 18 — UI Must Support 136-Team Scale

Do not design only for the demo team.

Tables and filters must work for:

- 130+ schools
- thousands of players
- thousands of recruits
- multi-year saves

## Redline 19 — No Mock Data On Real Screens

Mock data is allowed in tests/stories only.

If a screen uses mock data, it must be labeled:

```text
Scaffold only
```

## Redline 20 — Every Screen Gets A Polish Score

Score each screen:

```text
0 = unacceptable
1 = rough scaffold
2 = usable but amateur
3 = acceptable prototype
4 = professional
5 = FM-grade
```

Core screens must reach 4 before new feature expansion.

Roster and Recruiting must reach 5 eventually.


<!-- FILE: 04_DESIGN_SYSTEM_REBUILD_SPEC.md -->

# Design System Rebuild Spec

## Purpose

The UI needs a professional design system before more screens are added.

This is a rebuild, not a color tweak.

## Design Direction

```text
Professional desktop management sim
Subtle college football program-office warmth
Dense data
Low decoration
Strong hierarchy
```

## Theme Modes

## Default

```text
Classic Management Dark
```

Use dark/professional base with warm accents.

Why:

- FM-like
- dense data easier to scan
- avoids amateur parchment look
- team colors can accent cleanly

## Optional

```text
Classic Office Light
```

Use later after dark theme is polished.

## Color Tokens

```css
:root {
  --bg-app: #101312;
  --bg-sidebar: #171a18;
  --bg-surface: #1f231f;
  --bg-surface-2: #262b26;
  --bg-elevated: #2d332e;

  --text-primary: #f0eee7;
  --text-secondary: #b9b5a8;
  --text-muted: #7f7a6f;

  --border-subtle: #343a34;
  --border-strong: #4b5149;

  --accent: #c7a45b;
  --accent-soft: rgba(199, 164, 91, 0.16);
  --team-accent: var(--accent);

  --success: #74a66a;
  --warning: #d4a84d;
  --danger: #c96b5f;
  --info: #7d9dbb;
}
```

## Typography Tokens

```css
--font-ui: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-headline: Georgia, "Times New Roman", serif;
--font-number: "Roboto Mono", "SFMono-Regular", Consolas, monospace;

--text-xxs: 11px;
--text-xs: 12px;
--text-sm: 13px;
--text-md: 14px;
--text-lg: 16px;
--text-xl: 20px;
--text-2xl: 24px;
```

## Spacing Tokens

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
```

## Radius Tokens

```css
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
```

Avoid pill overuse.

## Shadow Tokens

Use minimal shadows.

```css
--shadow-panel: 0 1px 2px rgba(0,0,0,0.35);
--shadow-popover: 0 12px 32px rgba(0,0,0,0.45);
```

## Component Styling Rules

## Sidebar

- width 240–260px
- compact nav rows
- active row with left border/accent
- no oversized logo card
- no decorative bottom card unless useful
- supports collapsed mode later

## Top Bar

- height 56–64px
- Continue button prominent
- blockers next to Continue
- search box/palette
- date/week
- no clutter

## Object Header

- title
- subtitle/context
- key metadata chips
- primary actions
- breadcrumb above or below

## Tab Bar

- compact horizontal tabs
- active underline
- overflow menu if too many
- secondary tabs allowed

## Action Bar

- view selector
- filters
- search within table
- compare
- export if relevant
- action dropdown

## DataGrid

- sticky header
- compact rows 30–36px
- selected row state
- hover state
- numeric alignment right
- sortable headers
- column groups
- saved views

## Right Inspector

- width 320–380px
- selected entity summary
- staff recommendation
- action buttons
- reason codes
- related links

## Panels

Panels are secondary.

Use them for:

- summaries
- details
- moment cards
- staff notes

Do not use panels as entire screen foundation.

## Badges

Use semantic statuses:

- critical
- warning
- watch
- good
- info
- neutral

Badges should be small and consistent.

## Cozy/Nostalgic Layer

Allowed only after base polish:

- subtle paper clipping for Media Clipping
- headline font for MomentCard only
- brass accent color
- muted texture in non-table areas
- scrapbook page only in History/Scrapbook

Forbidden in base workspace:

- parchment panels everywhere
- fake paper backgrounds behind data grids
- novelty fonts in tables
- heavy gradients

## Acceptance Criteria

Design system is acceptable when:

- app looks professional before content loads
- tables are readable
- nav feels polished
- buttons are consistent
- colors are restrained
- team accents work
- cozy elements are subtle
- Roster and Recruiting can be implemented without one-off CSS


<!-- FILE: 05_APP_SHELL_AND_WORKSPACE_REBUILD_SPEC.md -->

# App Shell and Workspace Rebuild Spec

## Purpose

Replace the current card-grid shell with a professional desktop management sim shell.

## New App Layout

```text
AppShell
├── Sidebar
├── MainColumn
│   ├── TopBar
│   ├── ObjectHeader
│   ├── TabBar
│   ├── ActionBar
│   └── WorkspaceContent
└── RightInspector
```

RightInspector may collapse depending screen.

## TopBar

Must include:

- back/forward
- current date/week
- season phase
- global search
- bookmarks
- Continue button
- blocker count
- save status

Continue must be visually dominant.

## Sidebar

Primary nav:

- Program Desk
- Roster
- Recruiting
- Portal
- Staff
- Practice
- Tactics
- Schedule
- Rankings
- NIL / Money
- Facilities
- Data Hub
- World
- History
- Sandbox

Sidebar row:

- icon
- label
- badge/count optional
- active state
- hover state

## ObjectHeader

Example Roster:

```text
Roster Room
Oklahoma Sooners · 2028 Preseason
Scholarship: 82/105 · Team Vibe: Stable · Transfer Watch: 4
```

Actions:

- Ask Staff
- Save View
- Export
- More

## TabBar

Screens must have tabs.

Example Roster:

```text
Overview
Players
Depth Chart
Eligibility
Development
Morale
NIL
Transfer Risk
Reports
```

## ActionBar

Contextual.

Roster:

- View: General / Attributes / Eligibility / NIL / Development
- Filter: Position, Class, Status
- Search player
- Compare selected
- Columns
- More

Recruiting:

- View: Board / Search / Watchlist
- Filter: Position, State, Stars, Interest, Confidence
- Search
- Assign Scout
- Add Target
- Columns

## WorkspaceContent

Must be screen-specific.

Avoid generic card grid.

## RightInspector

Always shows selected item where possible.

If no selection:

- show screen guidance
- staff recommendation
- current top issue

## Workspace Templates

## Table Workspace

For Roster, Recruiting, Portal, Staff.

Layout:

```text
main DataGrid
right inspector
footer reason/status bar
```

## Planner Workspace

For Practice, Depth Chart, Tactics.

Layout:

```text
planner area
impact preview
staff advice
right inspector
```

## Ledger Workspace

For NIL/Finance.

Layout:

```text
ledger table
deal review panel
booster/clearinghouse inspector
```

## Archive Workspace

For History/Scrapbook.

Layout:

```text
timeline/list
filters
entry preview
right inspector
```

## Data Workspace

For Data Hub.

Layout:

```text
chart/table split
filters
validation report
export actions
```

## Remove From Current Shell

Remove/reduce:

- program-strip across every screen
- repeated 12-col card grid as default
- generic panel headers everywhere
- sidebar bottom "Next Kickoff" card if not real/actionable
- bootstrap debug sliders in normal launch

## Keep

- left sidebar
- topbar Continue
- real view IDs
- current working simulation data
- Program Desk concept

## Acceptance Criteria

New shell is acceptable when:

- Roster can render as professional table workspace
- Recruiting can render as professional table workspace
- Program Desk uses hierarchy, not raw card wall
- right inspector works
- topbar/Continue are polished
- layout does not look like generic admin dashboard


<!-- FILE: 06_DATAGRID_AND_TABLE_SYSTEM_SPEC.md -->

# DataGrid and Table System Spec

## Purpose

The game cannot look FM-like without a real table system.

The current CSS grid rows are insufficient.

## DataGrid Requirements

Minimum:

- column definitions
- row data
- sorting
- filtering
- saved views
- column show/hide
- column resizing
- sticky header
- selected row
- row click
- row actions
- compact density
- keyboard navigation
- empty/loading states

## Column Definition

```ts
type DataGridColumn<T> = {
  id: string;
  label: string;
  accessor: (row: T) => unknown;
  width?: number;
  minWidth?: number;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  filterable?: boolean;
  formatter?: (value: unknown, row: T) => string;
  cellType?: "text" | "number" | "badge" | "meter" | "link" | "rating" | "trend";
};
```

## Saved View

```ts
type SavedTableView = {
  id: string;
  screenId: string;
  name: string;
  columnIds: string[];
  columnWidths: Record<string, number>;
  sort: SortSpec[];
  filters: FilterSpec[];
  density: "compact" | "comfortable";
  pinnedColumns?: string[];
};
```

## Row Interaction

Required:

- click row selects and opens inspector
- double-click opens profile
- right-click opens context menu
- checkbox/select for compare
- hover state
- keyboard focus

## Context Menu

Examples for player:

- Open Profile
- Compare
- Add to Watchlist
- Meet With Player
- Set Development Focus
- View Game Log
- View Promises

Examples for recruit:

- Open Profile
- Add to Board
- Assign Scout
- Contact
- Offer
- Schedule Visit
- Compare

## DataGrid Visual Rules

- row height 30–36px compact
- header height 32–36px
- small text 12–13px
- zebra or subtle row separation
- selected row with accent border/background
- numeric columns right-aligned
- ratings visually compact
- no huge padding
- no large card rows

## Required Tables

## Roster Table

Columns:

- name
- pos
- class
- role
- CA
- PA/staff potential
- key attrs
- morale
- transfer risk
- NIL
- eligibility
- injury
- dev trend
- staff note

## Recruiting Table

Columns:

- name
- pos
- class
- state
- stars
- rank
- eval
- confidence
- interest
- relationship
- NIL expectation
- playing time fit
- development fit
- scheme fit
- staff owner
- last contact
- risk

## Portal Table

Columns:

- name
- pos
- prior school
- class
- ability
- eligibility
- reason
- NIL
- role expectation
- interest
- risk
- staff rec

## Staff Table

Columns:

- name
- role
- age
- salary
- contract
- recruiting
- development
- evaluation
- tactics
- region
- workload
- leaving risk

## Finance/NIL Table

Columns:

- player/recruit
- deal type
- amount
- market estimate
- status
- risk
- source
- review
- impact

## Acceptance Criteria

DataGrid is acceptable when:

- Roster and Recruiting use it
- row selection populates inspector
- sorting/filtering work
- saved views persist
- context actions exist
- no core screen uses fake CSS-grid table rows


<!-- FILE: 07_ROSTER_AND_RECRUITING_SCREEN_REDESIGN_SPEC.md -->

# Roster and Recruiting Screen Redesign Spec

## Purpose

Roster and Recruiting are the benchmark screens.

If these do not look professional, the rest of the game will not feel credible.

No new major UI work should proceed until these two screens pass polish.

---

# Roster Room Redesign

## Layout

```text
ObjectHeader
TabBar
ActionBar
Main DataGrid
Right Inspector
Bottom Status/Reason Bar
```

## Header

```text
Roster Room
[School] · [Season Phase]
82 players · 4 transfer watch · Team Vibe Stable · 3 injuries
```

## Tabs

```text
Players
Depth Chart
Eligibility
Development
Morale
NIL
Transfer Risk
Reports
```

## ActionBar

- View dropdown
- Position filter
- Class filter
- Status filter
- Search
- Compare
- Columns
- Ask Staff

## Main DataGrid

Use real player rows.

No card grid.

Default view:

- Name
- Pos
- Class
- Role
- Current Ability
- Potential
- Morale
- Transfer Risk
- NIL
- Eligibility
- Dev Trend
- Injury

## Right Inspector

When player selected:

- portrait/initials
- name
- position/class
- staff summary
- trait labels
- morale/transfer risk
- next action
- quick buttons

Quick buttons:

- Open Profile
- Compare
- Meet With Player
- Set Dev Focus
- Add Watch
- View Stats

## Empty Selection Inspector

Shows:

- staff top roster concern
- next recommended action
- team vibe
- transfer watch summary

## Visual Target

Professional, compact, dark management sim.

Warmth only in subtle accents.

## Reject If

- roster is shown as cards
- player rows are oversized
- no filters
- no right inspector
- no tabs
- no column control
- no click-through

---

# Recruiting Room Redesign

## Layout

```text
ObjectHeader
TabBar
ActionBar
Main DataGrid
Right Inspector
Bottom Reason/Status Bar
```

## Header

```text
Recruiting Room
2032 Class · 17 targets · #18 class · 4 official visits scheduled
```

## Tabs

```text
Board
Search
Needs
Visits
Offers
Commitments
Competitors
Staff
Analytics
```

## ActionBar

- View dropdown
- Position filter
- State/Region filter
- Stars filter
- Interest filter
- Confidence filter
- Search
- Assign Scout
- Add Target
- Columns

## Main DataGrid

Default board columns:

- Name
- Pos
- State
- Stars
- Rank
- Your Eval
- Confidence
- Interest
- Relationship
- NIL
- Playing Time Fit
- Development Fit
- Scheme Fit
- Staff
- Last Contact
- Risk

## Right Inspector

When recruit selected:

- profile summary
- trait labels
- why he likes you
- why he hesitates
- top competitors
- staff recommendation
- next action
- reason codes

Quick buttons:

- Open Profile
- Contact
- Assign Scout
- Offer
- Schedule Visit
- Make Pitch
- Compare
- Add Watch

## Visual Target

Should feel like a recruiting board, not a set of cards.

Serious, dense, high-signal.

## Reject If

- priority targets appear as cards
- filters are separate panel cards
- no saved views
- no right inspector
- no scouted uncertainty display
- no reason codes
- no staff owner/action column

## Acceptance Criteria

Roster and Recruiting redesign passes when:

- both use DataGrid
- both have tabs/action bars
- both have right inspectors
- both support saved views
- both have compact density
- both look professional at 1440x900
- both can support 100+ rows without looking broken


<!-- FILE: 08_PROGRAM_DESK_REDESIGN_SPEC.md -->

# Program Desk Redesign Spec

## Purpose

The Program Desk should be the command center, not an inbox card wall.

## Current Problem

Current Program Desk has:

- Must Respond panel
- Continue Readiness panel
- Inbox panel
- Inbox Summary panel
- Today panel
- Pinned Watches panel
- FYI panel
- Active Promises panel

This is too much like a dashboard grid.

It lacks a clear triage hierarchy.

## New Program Desk Layout

```text
ObjectHeader / Top Summary
Primary Triage Column
Secondary Briefing Column
Right Inspector
```

## Header

```text
Program Desk
Monday, Aug 25 · Preseason Setup
2 blockers · 5 decisions · Program Temperature: Restless Optimism
```

## Primary Column

Sections:

1. Must Fix Before Continue
2. Today's Decisions
3. Next Deadline
4. Staff Recommends

## Secondary Column

Sections:

1. Staff Briefing
2. Campus Pulse
3. Media Clippings
4. Watchlist

## Right Inspector

Shows selected ProgramItem.

Fields:

- summary
- why it matters
- affected entities
- staff recommendation
- reason codes
- consequence preview
- quick actions
- open workspace

## ProgramItem Visual

Compact, not oversized.

Fields:

- severity stripe
- category
- title
- due/expiry
- one-line consequence
- source
- primary action

## Continue Gate

Continue button in topbar.

If blockers:

- clicking Continue opens Continue Gate
- Program Desk also lists blockers
- blockers have quick fix buttons

## No Raw Inbox

The word "Inbox" should be removed or demoted.

Use:

- Program Desk
- Tasks
- Briefing
- Reports

## Campus Pulse Summary

Small compact panel.

Shows:

- Program Temperature
- Fan Mood
- Booster Temp
- Locker Room
- Recruit Buzz

Click opens detail.

## Media Clippings

Only 2–4 per week.

No feed spam.

## Visual Target

Should look like a polished command center.

Not:

- wall of equal panels
- inbox clone
- generic admin dashboard

## Acceptance Criteria

Program Desk passes when:

- blockers are visually first
- decisions are clearly second
- staff briefing is grouped
- selected item opens inspector
- no raw card wall
- no generic Inbox label dominates
- Continue Gate is separate
- it looks professional at 1440x900


<!-- FILE: 09_AI_UI_RESCUE_PROMPTS.md -->

# AI UI Rescue Prompts

## Prompt 1 — UI Audit and No-Code Diagnosis

```text
You are the UI rescue lead for CFB-FM.

Audit the current codebase and UI.

Goal:
Identify why the current UI looks amateur compared to Football Manager-style menus.

Review:
- index.html
- styles.css
- app.js render structure
- current screen layouts
- panel/card usage
- table implementation
- nav/topbar/sidebar
- bootstrap screen

Return:
1. top 20 UI failures
2. files causing them
3. components to delete/refactor
4. screens most in need of redesign
5. polish score for each screen
6. exact next implementation plan

Do not write code yet.
Be blunt.
```

## Prompt 2 — Design System Rebuild

```text
Implement the professional design system rebuild.

Goal:
Replace the current amateur cozy-card styling with a professional desktop management sim visual foundation.

Deliver:
- semantic CSS tokens
- dark professional default theme
- strict spacing scale
- strict type scale
- button styles
- badge styles
- table styles
- sidebar styles
- topbar styles
- object header styles
- tab/action bar styles
- right inspector styles

Hard rules:
- no feature logic changes
- no new screens
- remove cheap panel gradients
- no parchment card wall
- team colors only as accents
- dense tables must be readable

Acceptance:
- app shell looks professional before screen content
- existing screens visually improve without breaking
- no hardcoded random colors in new components
```

## Prompt 3 — Workspace Shell Components

```text
Implement FM-style workspace shell components.

Deliver:
- AppShell layout refinement
- ObjectHeader component/helper
- TabBar component/helper
- ActionBar component/helper
- RightInspector component/helper
- Breadcrumb component/helper
- WorkspaceShell template

Hard rules:
- do not add gameplay features
- components must be reusable
- no card-wall default
- no UI-only state that affects sim

Acceptance:
- Roster and Recruiting can use WorkspaceShell
- topbar/leftnav/right inspector layout works
- selected item inspector placeholder works
```

## Prompt 4 — DataGrid v1

```text
Implement DataGrid v1.

Goal:
Replace fake grid rows with a real reusable table system.

Deliver:
- column definitions
- sortable columns
- filters
- row selection
- row click
- right inspector integration hook
- compact density styling
- empty/loading states
- saved view scaffold

Hard rules:
- no generic cards for roster/recruiting
- no mock data
- no feature scope expansion

Acceptance:
- DataGrid renders roster players
- DataGrid renders recruits
- selected row updates inspector
- sorting works
- filters work
```

## Prompt 5 — Roster Room Redesign

```text
Redesign the Roster screen using the professional workspace shell and DataGrid.

Required layout:
- ObjectHeader
- Tabs
- ActionBar
- DataGrid
- RightInspector

Tabs:
Players, Depth Chart, Eligibility, Development, Morale, NIL, Transfer Risk, Reports

Default table columns:
Name, Pos, Class, Role, Current Ability, Potential, Morale, Transfer Risk, NIL, Eligibility, Dev Trend, Injury

Inspector:
- selected player summary
- trait labels
- staff note
- morale/transfer risk
- quick actions

Hard rules:
- no card wall
- no fake data
- no oversized rows
- professional FM-like density

Acceptance:
- roster looks credible at 1440x900
- 100+ players would still work
- row click opens inspector
```

## Prompt 6 — Recruiting Room Redesign

```text
Redesign the Recruiting screen using the professional workspace shell and DataGrid.

Required layout:
- ObjectHeader
- Tabs
- ActionBar
- DataGrid
- RightInspector

Tabs:
Board, Search, Needs, Visits, Offers, Commitments, Competitors, Staff, Analytics

Default columns:
Name, Pos, State, Stars, Rank, Your Eval, Confidence, Interest, Relationship, NIL, Playing Time Fit, Development Fit, Scheme Fit, Staff, Last Contact, Risk

Inspector:
- recruit summary
- why he likes us
- why he hesitates
- competitors
- staff recommendation
- next action
- reason codes

Hard rules:
- no priority target card panel as primary UI
- no filters as separate big cards
- professional FM-like density

Acceptance:
- recruiting room looks like a serious management sim
- row click opens inspector
- filters and saved view scaffold visible
```

## Prompt 7 — Program Desk Redesign

```text
Redesign Program Desk.

Goal:
Replace card dashboard/inbox soup with professional triage command center.

Layout:
- Header summary
- Primary triage column
- Secondary briefing column
- Right inspector

Sections:
- Must Fix Before Continue
- Today's Decisions
- Staff Recommends
- Staff Briefing
- Campus Pulse
- Media Clippings
- Watchlist

Hard rules:
- remove dominant Inbox label
- no equal-weight card wall
- blockers first
- decisions second
- selected item inspector
- Continue Gate separate

Acceptance:
- blockers obvious
- decisions actionable
- staff briefing grouped
- no raw feed spam
- looks professional
```

## Prompt 8 — Main Menu / Bootstrap Rescue

```text
Redesign the bootstrap/main menu.

Goal:
Remove developer-tool feel from first launch.

Normal first screen:
- Continue Career
- Start New Career
- Load Career
- Favorite Team
- Data Lab
- Settings

Move sandbox sliders to:
- Advanced Setup
- Data Lab
- Commissioner Mode

Hard rules:
- no debug sliders on normal first launch
- no amateur modal look
- no forced AI setup
- no clutter

Acceptance:
- first launch looks like a real game
- advanced settings still accessible
- favorite team / program selection clear
```

## Prompt 9 — UI Polish Gate

```text
Run a UI polish gate.

Score each screen 0-5:
- Program Desk
- Roster
- Recruiting
- Portal
- Staff
- Practice
- Schedule
- Finance
- History
- Analytics

Criteria:
- professional polish
- FM-like density
- clickability
- table quality
- hierarchy
- spacing
- typography
- component consistency

Reject any screen below 3.
Block feature work until Roster and Recruiting reach 4+.
```


<!-- FILE: 10_UI_POLISH_ACCEPTANCE_GATE.md -->

# UI Polish Acceptance Gate

## Purpose

This gate prevents future feature work from piling onto an ugly interface.

## Screen Score

Score each screen from 0 to 5.

## 0 — Broken / Embarrassing

- obvious amateur look
- broken layout
- unreadable
- fake data
- no hierarchy

## 1 — Rough Prototype

- works technically
- looks like a dev demo
- cards/panels dominate
- weak spacing

## 2 — Usable But Amateur

- layout makes sense
- still visually poor
- inconsistent components
- not FM-like

## 3 — Acceptable Prototype

- professional enough to use
- major hierarchy present
- some table density
- still needs polish

## 4 — Professional

- credible desktop sim UI
- consistent components
- dense tables
- strong hierarchy
- polished interactions

## 5 — FM-Grade

- serious management sim feel
- dense, clickable, fast
- professional visual system
- high information density
- low friction
- strong identity

## Minimum Scores

Before new feature expansion:

```text
Program Desk: 4
Roster: 4
Recruiting: 4
Main Menu: 4
App Shell: 4
```

Before beta:

```text
Roster: 5
Recruiting: 5
Program Desk: 5
```

## Gate Checklist

## Visual

- [ ] professional first impression
- [ ] consistent colors
- [ ] consistent typography
- [ ] no cheap gradients
- [ ] no random card soup
- [ ] team colors restrained

## Structure

- [ ] object header
- [ ] tab bar
- [ ] action bar
- [ ] primary table/workspace
- [ ] right inspector
- [ ] breadcrumbs on drill-downs

## Interaction

- [ ] row click
- [ ] context actions
- [ ] sorting/filtering
- [ ] saved views
- [ ] search
- [ ] Continue visible

## Content

- [ ] no mock data
- [ ] no debug controls in normal flow
- [ ] labels clear
- [ ] consequences visible
- [ ] staff recommendations useful

## FM-Like Density

- [ ] table-forward where needed
- [ ] compact rows
- [ ] enough columns
- [ ] power-user controls
- [ ] no excessive whitespace

## Rejection Conditions

Reject if:

- screen looks like a web admin template
- screen looks like a school project
- core data is hidden in cards
- key screens lack filters/tables
- bootstrap looks like debug settings
- cozy theme makes UI less professional
