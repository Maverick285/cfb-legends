# CFB-FM UI Consolidation Sprint Directive

## Purpose

This document tells the coding AI exactly what to do next.

The current UI is partially improved, but still not acceptable. It has started moving toward an FM-style workspace system, but the old card/dashboard prototype architecture is still present. That creates an inconsistent, amateur interface.

This sprint is **UI consolidation only**.

No new gameplay systems.  
No new sim features.  
No new cozy decoration.  
No new content.  
No new sandbox features.  
No new LLM features.  

The goal is to make the existing app look and behave like a professional desktop management sim.

---

# 1. Blunt Current Diagnosis

The current UI has improved from the previous version, but it still looks amateur because it is half old system and half new system.

## Current Problems

```text
legacy card-grid dashboard still exists
panel() layout still dominates many screens
Program Desk still feels like dashboard/inbox soup
bootstrap/start screen still feels like a debug tool
sandbox controls are too visible in normal flow
topbar and workspace headers fight each other
DataGrid exists but is not yet the core visual language everywhere
Roster and Recruiting are improved but not polished
cozy theme is still interpreted too decoratively
```

## What Went Right

The current build has useful pieces:

```text
DataGrid started
workspace shell started
right inspector started
dark professional tokens started
Roster and Recruiting partially migrated
```

Keep those. Improve and standardize them.

## What Went Wrong

The AI patched the UI instead of replacing the old layout architecture.

The old dashboard system must be removed from core screens.

---

# 2. New UI North Star

Use this as the guiding rule:

```text
Professional FM-style management UI first.
Warm nostalgic atmosphere second.
Decoration last.
```

The target is:

```text
A professional college football management application with the density and credibility of Football Manager, lightly skinned with warm program-office atmosphere.
```

The target is **not**:

```text
a cozy web dashboard
a parchment card wall
a fake scrapbook site
a generic admin panel
a debug tool
a sports-betting UI
```

---

# 3. Hard Freeze

Until this sprint is complete, do not add:

```text
new recruiting logic
new game sim logic
new NIL features
new player development features
new AI audio
new LLM content
new stadium/uniform systems
new town immersion
new data scraping
new sandbox sliders
```

Only work on:

```text
UI architecture
visual polish
layout consolidation
table/DataGrid quality
Program Desk triage
Main Menu / Bootstrap rescue
Roster polish
Recruiting polish
```

---

# 4. Non-Negotiable UI Rules

## Rule 1 — No Card Walls For Core Screens

Core screens may use small panels, but not as the primary layout.

Forbidden as the main layout:

```text
equal-weight card grid
dashboard card wall
repeated panel(title, meta, body)
large decorative cards replacing tables
```

Required:

```text
ObjectHeader
TabBar
ActionBar
DataGrid or structured workspace
RightInspector
Status / reason-code footer
```

## Rule 2 — No Debug Bootstrap

The first user-facing screen must not show sim-tuning sliders.

Move these to Advanced Setup / Data Lab / Sandbox:

```text
Recruiting AP
Retention AP
Portal Exceptions
Scoring Environment
Volatility
Tactical Impact
Injury Cadence
NIL Volatility
Progression Pace
Transfer Population
Reality Anchor
```

## Rule 3 — Roster And Recruiting Are Benchmark Screens

Do not continue until these two screens look professional.

Minimum polish score:

```text
Roster: 4 / 5
Recruiting: 4 / 5
```

## Rule 4 — DataGrid Is The Core Interaction Component

Roster, Recruiting, Portal, Staff, Finance/NIL, and Data Hub must use the same DataGrid system.

Do not use one-off CSS grid rows for core data tables.

## Rule 5 — Topbar Does Not Own Screen Titles

The global topbar should show:

```text
date/week
season phase
Continue button
blocker count
search
bookmarks
save status
```

The workspace ObjectHeader should show:

```text
screen title
screen context
screen metadata
screen actions
```

Do not hide old topbar titles with CSS hacks. Rebuild the shell properly.

## Rule 6 — Cozy Is Subtle

Do not use:

```text
heavy parchment
fake paper everywhere
random gradients
wood desk background
large scrapbook cards on normal screens
novelty fonts in tables
```

Use:

```text
warm accent colors
subtle brass/gold accents
restrained media clipping treatment only where appropriate
professional dark management base
```

## Rule 7 — Every Important Row Is Clickable

Rows must select and populate the RightInspector.

Double-click or primary click should open the full profile where appropriate.

## Rule 8 — No Mock Data On Real Screens

If a screen is connected to gameplay, it must use real app state.

If mock data remains, label the screen as scaffold-only and do not count it as polished.

---

# 5. Required Sprint Deliverables

By the end of this sprint, deliver:

```text
1. cleaned AppShell
2. professional topbar
3. professional sidebar
4. WorkspaceShell component/pattern
5. ObjectHeader component/pattern
6. TabBar component/pattern
7. ActionBar component/pattern
8. hardened DataGrid
9. RightInspector component/pattern
10. rebuilt Main Menu / Bootstrap
11. rebuilt Program Desk
12. polished Roster screen
13. polished Recruiting screen
14. old card-grid core layout removed or quarantined
15. UI polish report with scores
```

---

# 6. Files To Inspect First

Inspect these before coding:

```text
index.html
styles.css
app.js
js/ui/datagrid.js
```

Also inspect any additional UI files that now exist.

You must identify:

```text
legacy panel/card functions
legacy content-grid layout
old bootstrap flow
current DataGrid implementation
current Roster rendering
current Recruiting rendering
current Program Desk rendering
topbar/sidebar implementation
```

---

# 7. Implementation Sequence

## Step 1 — UI Audit Before Code

Before changing code, write a short audit.

Include:

```text
legacy components still active
screens still using card-grid layout
places where old topbar conflicts with workspace headers
where sandbox/debug settings appear in normal flow
DataGrid limitations
Roster polish blockers
Recruiting polish blockers
Program Desk polish blockers
```

Do not skip this.

## Step 2 — Quarantine Legacy Layout

Find the legacy pattern:

```text
panel()
content-grid
cardTemplate
panel-header
panel-body
data-row
table-row
decision-item
agenda-item
```

Do not necessarily delete everything immediately if it breaks the app.

But core screens must stop using it:

```text
Program Desk
Roster
Recruiting
Main Menu / Bootstrap
```

Create a clear separation:

```text
legacy helpers = temporary / deprecated
workspace helpers = primary
```

Add a comment or constant if needed:

```text
// Deprecated: do not use for primary workspaces.
```

## Step 3 — Rebuild AppShell

The shell should be:

```text
AppShell
  Sidebar
  MainArea
    TopBar
    WorkspaceArea
  RightInspector or per-workspace inspector
```

Global topbar contents:

```text
back/forward
current date/week
season phase
Continue
blockers
search
bookmarks
save status
```

Sidebar contents:

```text
Program Desk
Roster
Recruiting
Portal
Staff
Practice
Tactics
Schedule
Rankings
NIL / Money
Facilities
Data Hub
World
History
Sandbox
Settings
```

## Step 4 — Build/Rebuild WorkspaceShell

Every major screen should use:

```text
WorkspaceShell
  ObjectHeader
  TabBar
  ActionBar
  WorkspaceBody
  RightInspector
  StatusFooter
```

Do not use generic cards as the full screen layout.

## Step 5 — Harden DataGrid

DataGrid v1 must support:

```text
column definitions
sorting
filter controls
row selection
selected row state
row click
compact density
sticky header
badges/meters
empty state
loading state
saved view scaffold
column visibility scaffold
right inspector integration
```

Nice-to-have but not required in this sprint:

```text
column resizing
virtualization
full context menu
keyboard shortcuts
multi-select
```

Do not fake these if not implemented. Put them in "future work."

## Step 6 — Rebuild Main Menu / Bootstrap

Replace the current `Career Bootstrap` flow with a real main menu.

Main menu primary actions:

```text
Continue Career
Start New Career
Load Career
Data Lab
Settings
```

Secondary actions:

```text
Favorite Team
Advanced Setup
AI Services
Credits / Sources
```

Normal first-launch view must not expose debug sliders.

Advanced setup can include:

```text
rules preset
experience mode
world seed
content pack
sandbox tuning
```

But it must be behind:

```text
Advanced Setup
```

## Step 7 — Rebuild Program Desk

Program Desk must use strict triage hierarchy.

Layout:

```text
Header Summary
Primary Triage Column
Secondary Briefing Column
Right Inspector
```

Header:

```text
Program Desk
[Date / Week / Phase]
[Blockers] [Decisions] [Program Temperature]
```

Primary sections:

```text
Must Fix Before Continue
Today's Decisions
Staff Recommends
Next Deadline
```

Secondary sections:

```text
Staff Briefing
Campus Pulse
Media Clippings
Watchlist
```

No raw Inbox-dominated layout.

No equal-weight panel wall.

## Step 8 — Polish Roster As Benchmark

Roster layout:

```text
ObjectHeader
TabBar
ActionBar
DataGrid
RightInspector
StatusFooter
```

Header example:

```text
Roster Room
Oklahoma · 2028 Preseason
82 players · 4 transfer watch · Team Vibe: Stable · 3 injuries
```

Tabs:

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

Default columns:

```text
Name
Pos
Class
Role
Current Ability
Potential
Morale
Transfer Risk
NIL
Eligibility
Dev Trend
Injury
```

RightInspector for selected player:

```text
portrait / initials
name
position / class
staff summary
trait labels
morale
transfer risk
next action
quick actions
```

Quick actions:

```text
Open Profile
Compare
Meet With Player
Set Dev Focus
Add Watch
View Stats
```

## Step 9 — Polish Recruiting As Benchmark

Recruiting layout:

```text
ObjectHeader
TabBar
ActionBar
DataGrid
RightInspector
StatusFooter
```

Header example:

```text
Recruiting Room
2032 Class · 17 targets · #18 class · 4 official visits scheduled
```

Tabs:

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

Default columns:

```text
Name
Pos
State
Stars
Rank
Your Eval
Confidence
Interest
Relationship
NIL
Playing Time Fit
Development Fit
Scheme Fit
Staff
Last Contact
Risk
```

RightInspector for selected recruit:

```text
profile summary
trait labels
why he likes us
why he hesitates
top competitors
staff recommendation
next action
reason codes
```

Quick actions:

```text
Open Profile
Contact
Assign Scout
Offer
Schedule Visit
Make Pitch
Compare
Add Watch
```

## Step 10 — Polish Report

At the end, output a UI polish report.

Required:

```text
screens changed
legacy patterns removed
components added
known remaining legacy UI
polish score by screen
remaining blockers
next UI packet recommendation
```

---

# 8. Visual Direction

## Preferred Default

Use a professional dark management-sim base.

Example token direction:

```text
background: deep charcoal / green-black
surface: dark slate
surface raised: slightly lighter slate
text primary: warm off-white
text secondary: muted warm gray
accent: brass/gold or team color
team color: restrained accent
danger/warning/success: muted, not neon
```

## Warmth

Add warmth through:

```text
accent color
subtle typography
media clipping components
moment cards
program history screens
```

Do not add warmth through:

```text
every screen looking like parchment
large fake paper cards
cute textures behind tables
```

---

# 9. Component Requirements

## AppShell

Must be the single root layout.

## Sidebar

Professional, compact, stable.

## TopBar

Continue is prominent.

## WorkspaceShell

Reusable.

## ObjectHeader

Screen identity and metadata.

## TabBar

Workspace navigation.

## ActionBar

Filters, views, search, actions.

## DataGrid

Core table component.

## RightInspector

Selected row/entity detail.

## StatusFooter

Reason codes, selected count, last updated, validation state.

---

# 10. UI Polish Acceptance Gate

Score these screens:

```text
App Shell
Main Menu / Bootstrap
Program Desk
Roster
Recruiting
```

Use this scale:

```text
0 = broken / embarrassing
1 = rough prototype
2 = usable but amateur
3 = acceptable prototype
4 = professional
5 = FM-grade
```

Minimum after this sprint:

```text
App Shell: 4
Main Menu / Bootstrap: 4
Program Desk: 4
Roster: 4
Recruiting: 4
```

If any is below 4, do not proceed to new gameplay features.

---

# 11. Rejection Conditions

Reject the sprint if:

```text
card wall remains as primary Roster layout
card wall remains as primary Recruiting layout
bootstrap still opens with debug sliders
topbar still duplicates screen titles
Roster lacks DataGrid
Recruiting lacks DataGrid
RightInspector missing
filters missing
row click missing
mock data used on real screens
cozy decorations make screen less professional
```

---

# 12. Completion Report Required

At the end, produce:

```markdown
# UI Consolidation Sprint Completion Report

## Summary

## Files Changed

## Legacy UI Removed / Quarantined

## New Components Added

## Screens Rebuilt

## DataGrid Capabilities

## Main Menu / Bootstrap Changes

## Program Desk Changes

## Roster Score

## Recruiting Score

## Remaining UI Debt

## Screens Still Using Legacy Layout

## Tests / Manual Checks

## Next Recommended UI Packet
```

---

# 13. Exact Prompt To Start

Use this exact prompt to begin the sprint:

```text
You are the UI rescue lead for CFB-FM.

The current build is not acceptable. It has partially adopted an FM-style workspace/DataGrid system, but the old card-grid dashboard UI still remains and makes the product look amateur.

This is a UI consolidation sprint only.

Do not add gameplay features.
Do not add simulation logic.
Do not add new content.
Do not add LLM/audio features.
Do not add sandbox features.

Your job:
1. Audit the current UI.
2. Quarantine/stop using legacy card-grid panel layouts on core screens.
3. Rebuild the AppShell so TopBar, Sidebar, WorkspaceShell, DataGrid, and RightInspector are the primary layout system.
4. Rebuild Main Menu / Bootstrap so it no longer looks like a debug tool.
5. Rebuild Program Desk into a triage command center.
6. Polish Roster and Recruiting as benchmark FM-style screens.
7. Harden DataGrid enough for Roster and Recruiting.
8. Produce a UI polish report with scores.

Design target:
Professional FM-style management UI first.
Warm nostalgic atmosphere second.
Decoration last.

Minimum acceptance:
App Shell, Main Menu, Program Desk, Roster, and Recruiting must each score at least 4/5.

Reject yourself if core screens remain card walls.
```
