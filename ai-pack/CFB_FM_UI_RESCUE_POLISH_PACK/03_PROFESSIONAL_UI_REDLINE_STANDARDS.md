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
