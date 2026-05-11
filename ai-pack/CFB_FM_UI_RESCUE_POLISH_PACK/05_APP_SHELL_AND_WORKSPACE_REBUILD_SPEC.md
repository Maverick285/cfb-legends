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
