# CFB-FM UI Canonical Spec

## Purpose

This file is the single implementation target for UI work.

Use it instead of bouncing between overlapping UI rescue, FM research, workspace, polish, and narrative docs.

It consolidates the practical rules from:
- UI consolidation sprint directive
- screen-by-screen workspace spec
- FM26 research/layout guidance
- UI rescue/polish pack
- original menu UX and screen specs

If another UI doc conflicts with this one, use this file unless a newer explicit sprint directive overrides it.

---

## 1. North Star

Build a **professional college football management sim UI**.

Priority order:
1. Professional FM-style management UI first
2. Warm college-football atmosphere second
3. Decoration last

The product should feel like:
- dense
- clickable
- fast
- table-forward
- desktop-first
- trustworthy
- built for long saves

It must not feel like:
- a generic admin dashboard
- a debug tool
- a scrapbook wall
- a cozy card app
- a betting UI
- a student project

---

## 2. Core Shell

### Required layout

```text
AppShell
├── Sidebar
├── MainColumn
│   ├── TopBar
│   └── WorkspaceArea
└── RightInspector (screen-owned or integrated per workspace)
```

### TopBar must include
- back
- forward
- current date/week
- season phase
- blocker count
- global search / command entry
- bookmarks
- save status
- Continue button

### Sidebar primary nav
- Program Desk
- Program Home
- Roster
- Recruiting
- Transfer Portal
- Staff
- Development
- Tactics / Playbook
- Schedule
- Rankings / Postseason
- Finance / NIL
- Facilities
- Data Hub
- World
- History
- Sandbox / Data Lab
- Settings

### Shell rules
- Continue must remain visually dominant
- TopBar does not own screen titles
- Screen identity belongs to the workspace ObjectHeader
- Team colors are restrained accents only

---

## 3. Universal Workspace Pattern

Every major screen should fit this structure:

```text
ObjectHeader
TabBar
ActionBar
Main Workspace Body
RightInspector
Status / Reason Footer
```

### Required component language
- AppShell
- Sidebar
- TopBar
- ObjectHeader
- TabBar
- ActionBar
- DataGrid
- RightInspector
- StatusBadge
- FilterBar
- ProgramItem

### Interaction rules
- every important row is clickable
- row selection updates the inspector
- primary entities should open full profile on click or quick action
- comparisons must not require manual note-taking
- no critical workflows hidden behind decorative cards

---

## 4. Non-Negotiable Rules

1. No card walls for core screens
2. No debug sliders in normal startup flow
3. DataGrid is the primary comparison surface for core data-heavy screens
4. No mock data on real screens
5. RightInspector is required on dense decision screens
6. Roster and Recruiting are benchmark screens
7. Cozy is subtle, not structural
8. All major screens must support real long-save density

Forbidden as primary layout on core screens:
- equal card grids
- repeated generic `panel()` walls
- decorative cards replacing tables
- debug/bootstrap-first startup screens

---

## 5. DataGrid Standard

Minimum required capabilities:
- column definitions
- sorting
- filtering
- row selection
- sticky header
- compact density
- empty state
- loading state
- right inspector integration
- shared component language across screens

Required next-tier capabilities:
- saved views
- column visibility controls
- quick compare support
- keyboard focus behavior
- better status/footer language

Nice-to-have later:
- column resizing
- virtualization
- multi-select
- context menu
- full command palette integration

---

## 6. Main Menu / Bootstrap

### Default normal flow
Primary actions:
- Continue Career
- Start New Career
- Load Career
- Data Lab
- Settings

Secondary actions:
- Favorite Team
- Advanced Setup
- AI Services
- Credits / Sources

### Rules
- normal launch must not expose sandbox tuning first
- debug/sim sliders belong under Advanced Setup / Sandbox / Data Lab
- menu should look like a real product front door, not a tuning modal

---

## 7. Program Desk

### Purpose
Program Desk is the daily command center.

It answers:
- what needs attention now
- what blocks Continue
- what staff wants me to know
- what deadlines are coming
- what changed in the world

### Target structure
Primary:
- Must Fix Before Continue
- Today’s Decisions
- Staff Recommends
- Next Deadline

Secondary:
- Staff Briefing
- Campus Pulse
- Media Clippings
- Watchlist
- Calendar Snapshot

### Rules
- not a raw inbox list
- not equal-weight dashboard soup
- blocker/decision hierarchy must be obvious
- selected item should populate inspector

---

## 8. Benchmark Screen: Roster

### Required layout
```text
ObjectHeader
TabBar
ActionBar
DataGrid
RightInspector
StatusFooter
```

### Header shape
```text
Roster Room
[School] · [Season / Phase]
[Players] · [Transfer Watch] · [Team Vibe] · [Injuries]
```

### Tabs
- Players
- Depth Chart
- Eligibility
- Development
- Morale
- NIL
- Transfer Risk
- Reports

### Action bar
- View
- Position filter
- Class filter
- Status filter
- Search
- Compare
- Columns
- Ask Staff
- Export

### Default table columns
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

### Inspector requirements
- player summary
- trait labels
- staff summary
- morale / transfer risk
- next action
- quick actions

Quick actions:
- Open Profile
- Compare
- Meet With Player
- Set Dev Focus
- Add Watch
- View Stats

---

## 9. Benchmark Screen: Recruiting

### Required layout
```text
ObjectHeader
TabBar
ActionBar
DataGrid
RightInspector
StatusFooter
```

### Header shape
```text
Recruiting Room
[Class] · [Targets] · [Class Rank] · [Visits Scheduled]
```

### Tabs
- Board
- Search
- Needs
- Visits
- Offers
- Commitments
- Competitors
- Staff
- Analytics

### Action bar
- View
- Position filter
- State/region filter
- Stars filter
- Interest filter
- Confidence filter
- Search
- Assign Scout
- Add Target
- Columns

### Default table columns
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

### Inspector requirements
- profile summary
- trait labels
- why he likes us
- why he hesitates
- top competitors
- staff recommendation
- next action
- reason codes

Quick actions:
- Open Profile
- Contact
- Assign Scout
- Offer
- Schedule Visit
- Make Pitch
- Compare
- Add Watch

---

## 10. Other Workspace Targets

### Transfer Portal
Use table workspace with tabs like:
- Search
- Board
- Your Risks
- Targets
- Retention
- Analytics

### Staff
Use workspace with:
- Overview
- Responsibilities
- Search
- Contracts
- Workload
- Chemistry
- Territories
- Analytics

### Development / Practice
Use planner workspace, not card soup.
Should show:
- weekly emphasis
- individual plans
- fatigue / injury risk
- staff recommendation
- player-level impact preview

### Schedule / Games
Use workspace with:
- schedule
- results
- preview
- play-by-play
- box score
- drive chart
- postgame report

### Finance / NIL
Use ledger workspace with:
- budget
- NIL market
- direct benefits
- donors / boosters
- compliance risk
- forecast

### Facilities
Use stewardship workspace with:
- overview
- projects
- recruiting impact
- funding
- objective / AD pressure
- history

### History
Use archive workspace with:
- timeline
- seasons
- records
- awards
- draft
- rivalries
- recruiting classes

### Data Hub
Use data workspace with:
- team performance
- player performance
- recruiting efficiency
- development
- injuries
- transfers
- draft
- validation
- balance

---

## 11. Copy and Interaction Tone

Writing should be:
- clear
- confident
- compact
- specific
- operational

Avoid:
- novelty label spam
- fake seriousness on weak components
- overly decorative cozy language on work surfaces

Warmth belongs in:
- history
- media clippings
- scrapbook-style special moments
- subtle program flavor

Warmth does not belong in:
- main comparison tables
- critical decision screens
- routine workflow chrome

---

## 12. Acceptance Gate

Use 0–5 scoring.

### Core screen minimum before feature expansion
- App Shell: 4
- Main Menu: 4
- Program Desk: 4
- Roster: 4
- Recruiting: 4

### Beta target
- Program Desk: 5
- Roster: 5
- Recruiting: 5

### Reject if
- core screens are still card walls
- bootstrap still looks like a debug tool
- Roster or Recruiting lack DataGrid
- RightInspector is missing where required
- filters are missing where needed
- mock data is presented as real
- warmth/decor makes the UI less professional

---

## 13. Current Known Gaps

At the time this file was created, the likely remaining UI debt includes:
- legacy `panel()` content still living inside some new workspace shells
- incomplete saved views
- incomplete bookmarks
- shallow global search / command behavior
- missing breadcrumbs on drill-down pages
- inconsistent power-user controls across workspaces
- partial placeholder actions in shell/menu surfaces
- copy/encoding cleanup still needed in some strings

---

## 14. Recommended Implementation Order

1. Consolidate spec and stop UI doc sprawl
2. Finish shell polish and remove remaining shell inconsistencies
3. Remove legacy `panel()` dependence from major workspaces
4. Bring Roster and Recruiting from 4/5 toward 5/5
5. Formalize Program Desk and Continue Gate relationship
6. Implement real saved views / bookmarks / search improvements
7. Add breadcrumbs and richer compare/context actions
8. Run acceptance scoring again before feature expansion

---

## 15. Practical Rule For Future Work

When adding or modifying a screen, ask:
- is this a real workspace
- does it support dense decisions
- does it expose comparison clearly
- does it use shared component language
- does it feel more professional, not more decorative

If the answer is no, stop and redesign before extending features.
