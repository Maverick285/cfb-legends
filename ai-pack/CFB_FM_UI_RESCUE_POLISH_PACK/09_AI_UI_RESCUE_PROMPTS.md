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
