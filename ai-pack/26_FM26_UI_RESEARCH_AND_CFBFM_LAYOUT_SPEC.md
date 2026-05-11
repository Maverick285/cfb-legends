# 26_FM26_UI_RESEARCH_AND_CFBFM_LAYOUT_SPEC.md

## Purpose

This document captures the research takeaways from Football Manager 26's redesigned UI/UX and converts them into a practical layout spec for the CFB-FM project.

The goal is not to copy FM26.

The goal is to understand:
- why Sports Interactive changed the UI
- what they were trying to solve
- what appears to have worked
- what appears to have frustrated players
- what structure makes the most sense for a private college football FM-style sim
- what should replace or evolve the traditional Inbox system
- how daily-required actions and Continue-blocking issues should work

---

# 1. Core Recommendation

Use a hybrid layout:

```text
Program Desk + Continue Gate + Stable Left Navigation + Global Search + Bookmarks + Dense Workspaces
```

Do not use a pure old-school Inbox.

Do not use a pure FM26-style tile/card Portal.

Use a stronger system:

```text
Program Desk = daily command center
Continue Gate = hard blocker resolver
Workspaces = deep FM-style screens
Search = universal navigation and knowledge lookup
Bookmarks = user-personalized shortcuts
```

The UI should be optimized for:

- desktop
- dense tables
- fast navigation
- long saves
- power-user workflows
- quick issue fixing
- deep drill-down
- keyboard/command palette
- low click count
- high information density

The game should feel like:

```text
I am running a college football program from a command center.
```

Not:

```text
I am reading an email inbox.
```

And not:

```text
I am opening endless cards that hide the information I need.
```

---

# 2. What FM26 Publicly Said It Was Trying To Do

Sports Interactive described the FM26 UI redesign as a full overhaul driven by:

- design team vision
- direct community feedback
- data on how players navigated previous FM editions

The three stated principles were:

```text
Efficiency
Familiarity
Predictability
```

In practice, SI said this meant faster access to information, quicker navigation, fewer clicks, keeping FM recognizable, and making the game easier to pick up and master.

They also emphasized accessibility, including font readability and color contrast.

## FM26's Major UI Building Blocks

### Tile and Card System

FM26 introduced a Tile and Card system.

Tiles give snapshots.
Cards open for more detail.

The intent was progressive disclosure:

```text
summary first
detail on click
```

### Portal

FM26 combined the older Home and Inbox concepts into the Portal.

The stated reason was that previous Home screen usage was limited while most player time was spent in the Inbox.

Portal elements included:

- messages
- filters: All, New, Tasks, Unread
- improved action panel
- Advice dropdown
- news
- upcoming fixtures
- two-week calendar snapshot

### Top Navigation Bar

FM26 moved major navigation to a top navigation bar.

The categories were consolidated and each category reveals submenus.

### Search

FM26 expanded Search beyond entities.

Search can find:

- players/clubs/nations
- objects
- information
- navigation targets
- tiles
- messages
- news
- guides

### FMPedia

FM26 added FMPedia as an in-career glossary/user guide integrated into Search.

### Bookmarks

FM26 added customizable bookmarks.

The default set is curated from highly visited areas, and the user can choose additional bookmarks.

---

# 3. What Appears To Have Gone Wrong In FM26

The stated principles were good.

The risk is in execution.

Public reviews and player response suggest that the redesign created friction for many veteran users.

Common reported problems:

- too many extra clicks
- information buried behind popups/cards
- unclear click targets
- missing or hidden comparative data
- screens that looked cleaner but were less functional
- controller/mobile-style simplification applied to a desktop-heavy game
- data that used to be one click away becoming several clicks away

The lesson for CFB-FM:

```text
Do not confuse visual cleanliness with usability.
```

A management sim must keep key comparative data close to the surface.

Cards are useful for summaries.
Tables are necessary for decisions.

---

# 4. Design Lessons To Adopt

## Adopt: Progressive Disclosure

Good pattern:

```text
overview -> focused detail -> deep drill-down
```

Use this everywhere.

Example:

```text
Recruiting Board row
-> prospect quick inspector
-> full prospect profile
-> scouting reports
-> staff opinions
-> similar past players
```

## Adopt: Global Search

Search should be one of the main navigation systems.

It should find:

- players
- recruits
- staff
- schools
- conferences
- towns
- screens
- reports
- rules
- glossary entries
- news
- events
- tasks
- bookmarks
- playbook concepts

## Adopt: Bookmarks

Let the user create shortcuts.

Default bookmarks:

- Recruiting Board
- Roster
- Depth Chart
- Practice Plan
- Transfer Watch
- Data Lab

Allow at least 24 bookmarks eventually.

## Adopt: In-Game Glossary

Create:

```text
CFBPedia
```

It should explain:

- NIL
- direct benefits
- transfer portal
- redshirt
- practice time units
- team vibe
- trait labels
- position roles
- offensive concepts
- defensive concepts
- recruiting stages
- clearinghouse review
- draft projection

## Adopt: Action Panel

Every important task should have:

- recommended action
- alternatives
- consequence preview
- delegate option
- open related screen

## Adopt: Accessibility

Use:

- readable font sizes
- strong contrast
- scalable UI
- keyboard navigation
- consistent button placement
- clear disabled states
- color + icon + text, not color alone

---

# 5. Design Lessons To Avoid

## Avoid: Card-Only Depth

Cards are good for summaries, but bad for roster/recruiting decisions.

Do not make the main Roster, Recruiting, Portal, Staff, NIL, or Data Hub screens card-only.

Use dense tables.

## Avoid: Hidden Critical Data

Never require five clicks to compare two players.

Never hide key attributes in a popup when the user is making a selection.

If the user must choose penalty takers, recruits, starters, practice focus, NIL allocation, or staff hires, the comparison data must be visible in the decision view.

## Avoid: Controller-First Desktop UI

This game is desktop-first.

Controller-friendly layouts can come later.

## Avoid: Portal As A Junk Drawer

The Program Desk should not become:

```text
messages + news + reports + tasks + calendar + everything else
```

It needs strict information hierarchy.

## Avoid: Replacing Workflow With Notifications

A stream of messages is not a management interface.

Daily events need classification, triage, delegation, and direct resolution.

---

# 6. Recommended CFB-FM Layout

## Global App Structure

```text
Top Bar
Left Navigation
Main Workspace
Right Inspector / Staff Advice Rail
Bottom Status / Debug Rail, optional
```

## Top Bar

Always visible.

Contains:

- current date/week
- season phase
- Continue button
- blocking issue count
- global search / command palette
- bookmarks
- save/status indicator
- AI service status, optional
- quick settings

Example:

```text
2031 Week 7 | Regular Season | Continue | 3 Blockers | Search | Bookmarks
```

## Left Navigation

Stable, always visible.

Primary sections:

```text
Program Desk
Roster
Recruiting
Transfer Portal
Staff
Practice
Tactics / Playbook
Schedule
Games / Play-by-Play
Rankings / Postseason
Finance / NIL
Facilities
Data Hub
World
History
Sandbox / Data Lab
Settings
```

Why left nav over FM26 top nav:

- better for many sections
- better for desktop muscle memory
- better for expandable depth
- less dropdown dependence
- leaves top bar for time/Continue/search
- easier to scan while working in dense tables

## Main Workspace

Every major screen uses this pattern:

```text
Header
Subtabs
Action Bar
Main Table / Workspace
Right Inspector
Context Footer / Reason Codes
```

## Right Inspector / Staff Advice Rail

When a row is selected, show:

- quick summary
- staff recommendation
- risk flags
- next action
- linked entities
- reason codes

This reduces popups.

Use popups sparingly.

## Breadcrumbs

Every drill-down page should show breadcrumbs.

Example:

```text
Recruiting > 2032 Board > QB > Darius McClain > Scouting Reports
```

---

# 7. Replace "Inbox" With "Program Desk"

## Why

Inbox implies passive email.

The game needs active program management.

Use:

```text
Program Desk
```

or:

```text
Command Center
```

Recommended name:

```text
Program Desk
```

It fits college football better.

## Program Desk Purpose

The Program Desk is the daily control surface.

It answers:

```text
What needs my attention?
What blocks advancement?
What should I know?
What did my staff find?
What deadlines are coming?
What changed in the world?
Where should I go next?
```

## Program Desk Sections

### 1. Must Fix To Continue

Hard blockers.

Examples:

- no eligible QB on depth chart
- roster invalid
- game week plan missing
- signing day unresolved
- compliance review required
- budget approval deadline
- transfer window decision deadline
- unresolved player meeting that expires today

### 2. Today's Decisions

Important but not always blocking.

Examples:

- recruit wants role promise
- player considering portal
- booster meeting request
- staff contract decision
- practice intensity concern
- NIL deal review delayed

### 3. Staff Briefing

Grouped reports.

Examples:

- recruiting coordinator summary
- GM roster risk report
- OC game plan note
- academic advisor warning
- strength coach fatigue report

### 4. Calendar / Deadlines

A rolling view.

Recommended:

```text
Today
Next 7 Days
Next 14 Days
Season Milestones
```

### 5. News / World

Non-action updates.

Examples:

- rival loses coordinator
- playoff rankings update
- top recruit commits elsewhere
- conference realignment rumor

### 6. Watchlist

User-tracked items.

Examples:

- top recruits
- transfer risks
- injured players
- staff poaching risk
- NIL deals under review

---

# 8. Alternatives To A Traditional Inbox

## Option A — Program Desk

Best main choice.

Strengths:

- combines tasks, reports, calendar, and news
- still familiar to FM users
- better than passive inbox
- supports daily rhythm

Weakness:

- can become cluttered if not governed

Use as main hub.

## Option B — Task Queue

A pure task list.

Strengths:

- clear actionability
- easy to show blockers
- easy to resolve issues

Weakness:

- loses immersion
- feels like project management software

Use inside Program Desk, not as whole game.

## Option C — Calendar-First Agenda

Everything is organized by date.

Strengths:

- great for recruiting deadlines, practice, games
- makes season rhythm clear

Weakness:

- poor for emergent issues
- not enough for daily triage

Use as Program Desk panel and separate Calendar screen.

## Option D — Staff Meeting Digest

Daily/weekly briefing from staff.

Strengths:

- immersive
- makes staff feel alive
- reduces spam

Weakness:

- can hide urgent issues
- less precise for power users

Use as Staff Briefing section.

## Option E — Kanban Board

Columns like:

```text
New
Needs Decision
Delegated
Watching
Resolved
```

Strengths:

- good for long-running issues
- good for recruiting/portal tasks

Weakness:

- not ideal as main daily hub
- too SaaS-like

Use optionally for recruiting tasks or Data Lab/debug.

## Option F — Command Palette

Keyboard-first universal action/search.

Strengths:

- fastest power-user navigation
- great for large games

Weakness:

- not a replacement for hub

Use globally.

## Final Choice

Use a hybrid:

```text
Program Desk
+ Task Queue
+ Calendar Agenda
+ Staff Digest
+ Command Palette
```

Do not rely on a single Inbox.

---

# 9. Continue Gate System

## Purpose

The Continue Gate is separate from the Program Desk.

The Program Desk shows what matters.

The Continue Gate decides whether time can advance.

## Continue Button Behavior

When user clicks Continue:

```text
1. Run preflight checks.
2. If no blockers, advance time.
3. If blockers exist, open Continue Gate panel.
4. Let user fix, delegate, auto-resolve, or open screen.
5. Re-run checks.
6. Advance when clean.
```

## Continue Gate UI

Panel title:

```text
Cannot Advance Yet
```

or:

```text
3 Issues Need Resolution
```

Each blocker card shows:

- issue
- severity
- due date
- affected entity
- why it blocks
- recommended fix
- quick fix button
- delegate button
- open full screen
- ignore option only if allowed

## Example Blocker

```text
Game Week Depth Chart Invalid

Reason:
You do not have an eligible QB assigned to the active depth chart.

Quick Fix:
Use staff recommendation

Other Actions:
Open Depth Chart
Delegate to OC
Delay if rule allows
```

## Quick Fix Philosophy

Every blocker should offer one or more fixes:

- staff recommended fix
- auto-fill legal minimum
- open relevant screen
- delegate to staff
- postpone if rules allow

## Delegation Policies

The user should be able to set policies:

```text
Staff may auto-fix minor depth chart gaps.
Staff may not approve NIL deals above $250,000.
Compliance issues always require user approval.
Recruit promises always require user approval.
Practice plan may be auto-generated if not set by Tuesday.
```

## Continue Gate Categories

### Hard Blockers

Must fix.

- illegal roster
- no depth chart for game
- unresolved signing decision
- compliance violation
- save corruption/invalid state

### Soft Blockers

Can advance but with consequence.

- practice plan not customized
- recruit not contacted
- player meeting delayed
- staff report unread
- NIL opportunity expiring

### Warnings

No block.

- fatigue rising
- recruit interest falling
- team vibe slipping
- booster patience low

---

# 10. Event/Task Data Model

## Core Concept

Do not model this as email.

Model it as:

```text
Actionable Program Item
```

## Item Types

```text
Task
BlockingIssue
Alert
Report
News
Deadline
Recommendation
WatchItem
Digest
```

## Suggested Schema

```ts
type ProgramItem = {
  id: string;
  type:
    | "task"
    | "blocking_issue"
    | "alert"
    | "report"
    | "news"
    | "deadline"
    | "recommendation"
    | "watch_item"
    | "digest";

  category:
    | "roster"
    | "recruiting"
    | "portal"
    | "practice"
    | "game_week"
    | "staff"
    | "finance"
    | "nil"
    | "compliance"
    | "academics"
    | "media"
    | "world";

  severity: "critical" | "high" | "normal" | "low" | "flavor";

  status:
    | "new"
    | "unread"
    | "read"
    | "needs_decision"
    | "delegated"
    | "resolved"
    | "expired"
    | "archived";

  blocking: boolean;
  softBlock: boolean;

  createdAt: GameDate;
  dueAt?: GameDate;
  expiresAt?: GameDate;

  source: {
    kind: "staff" | "system" | "media" | "player" | "recruit" | "booster" | "league";
    id?: string;
  };

  affectedEntities: EntityRef[];

  summary: string;
  detail: string;

  actions: ProgramItemAction[];

  recommendedActionId?: string;
  delegationAllowed: boolean;
  autoResolveAllowed: boolean;

  consequencePreview?: ConsequencePreview[];
  reasonCodes?: ReasonCode[];

  duplicateKey?: string;
  groupKey?: string;
};
```

## Action Schema

```ts
type ProgramItemAction = {
  id: string;
  label: string;
  type:
    | "quick_fix"
    | "open_screen"
    | "delegate"
    | "dismiss"
    | "delay"
    | "accept"
    | "reject"
    | "negotiate"
    | "schedule"
    | "promise"
    | "auto_resolve";

  requiresConfirmation: boolean;
  consequencePreview: ConsequencePreview[];
  handler: string;
};
```

## Reason Codes

Every item should explain itself.

Example:

```text
Transfer Risk Rising

Reason codes:
- Playing time below expectation: +18 risk
- NIL expectation unmet: +11 risk
- Relationship with position coach: -6 risk
- Team winning streak: -4 risk
```

This is critical for trust.

---

# 11. Program Desk Layout Spec

## Desktop Layout

```text
Top Bar
------------------------------------------------------------
Left Nav | Program Desk Main               | Right Inspector
         |                                 |
         | Must Fix To Continue            | Selected item
         | Today's Decisions               | Actions
         | Staff Briefing                  | Staff advice
         | Calendar                        | Links
         | News                            |
```

## Program Desk Tabs

```text
Overview
Tasks
Reports
Calendar
News
Watchlist
Delegated
Archive
```

## Overview Tab

Sections in order:

1. Must Fix To Continue
2. Today's Decisions
3. Next Game / Next Deadline
4. Staff Briefing
5. Calendar Snapshot
6. Watchlist
7. News

## Tasks Tab

Filters:

```text
All
Must Fix
Due Today
Recruiting
Roster
Practice
NIL
Staff
Delegated
Resolved
```

## Reports Tab

Grouped staff reports:

```text
Recruiting
Roster
Development
Practice
Game Week
Finance
Compliance
```

## Calendar Tab

Views:

```text
Today
Week
Two-Week
Month
Season Milestones
```

## News Tab

Filters:

```text
Program
Conference
National
Recruiting
Portal
Rivalries
Media
```

## Watchlist Tab

Tracked items:

- recruits
- players
- staff
- NIL deals
- injuries
- rivals
- conference races

---

# 12. Workspaces Beyond Program Desk

The Program Desk is the hub.

Deep work happens in workspaces.

## Workspace Pattern

Every major section should have:

```text
Header
Breadcrumbs
Subtabs
Action Bar
Table / Primary View
Inspector Rail
Saved Views
Search/Filter
```

## Recruiting Workspace

Tabs:

- Overview
- Search
- Board
- Visits
- Offers
- Staff Assignments
- Commitments
- Competitors
- Promises
- Analytics

## Roster Workspace

Tabs:

- Overview
- Roster
- Depth Chart
- Eligibility
- Morale
- Development
- NIL
- Transfer Risk
- Position Groups
- Reports

## Practice Workspace

Tabs:

- Weekly Plan
- Time Allocation
- Intensity
- Position Groups
- Individual Plans
- Fatigue
- Team Vibe
- Staff Recommendations
- History

## Finance/NIL Workspace

Tabs:

- Overview
- Budget
- NIL Market
- Direct Benefits
- Clearinghouse
- Boosters
- Facilities
- Forecast
- Compliance Risk

---

# 13. Search and Command Palette

## Search Modes

Global search should support:

```text
Entity search
Screen search
Action search
Guide search
Report search
News search
Task search
```

## Examples

User types:

```text
QB transfer risk
```

Results:

- players matching QB + transfer risk
- Transfer Risk screen
- CFBPedia article: Transfer Risk
- staff report about QB room
- relevant Program Desk task

User types:

```text
practice
```

Results:

- Practice Workspace
- current weekly practice plan
- CFBPedia: Practice Time Units
- staff recommendation
- fatigue warning

## Command Examples

```text
Open Recruiting Board
Offer selected recruit
Delegate practice plan
Show blockers
Run 5-year sim
Open Darius McClain
```

---

# 14. Bookmarks

## Purpose

Bookmarks are a power-user feature.

## Defaults

Start with:

- Program Desk
- Recruiting Board
- Roster
- Depth Chart
- Practice Plan
- Transfer Risk
- Data Lab

## User Options

Allow bookmarks for:

- screens
- saved views
- specific recruits
- specific players
- staff members
- custom filters
- reports
- Data Lab presets

## Bookmark Object

```ts
type Bookmark = {
  id: string;
  label: string;
  targetType: "route" | "entity" | "saved_view" | "report" | "data_lab_preset";
  target: string;
  icon?: string;
  order: number;
};
```

---

# 15. CFBPedia

## Purpose

Built-in glossary/help system.

## Access

- global search
- ribbon/help icon
- clickable glossary terms
- trait labels
- rules screens

## Content Types

- glossary definition
- system explanation
- rule explanation
- strategy guide
- formula explanation, if exposed
- tooltip

## CFBPedia Entries Needed Early

- NIL
- Direct Benefits
- Clearinghouse
- Redshirt
- Practice Time Units
- Team Vibe
- Trait Clusters
- Transfer Risk
- Recruiting Interest
- Scouting Confidence
- Scheme Fit
- Development Curve
- Blue-Chip Ratio
- Draft Projection

---

# 16. Information Architecture Decision

## Best Main Layout

Use:

```text
Left nav + top command bar + Program Desk
```

Not:

```text
top-nav only
```

Reasons:

- more scalable for CFB systems
- better for desktop density
- fewer hidden dropdowns
- clearer section identity
- easier to keep Program Desk separate from deep workspaces
- works better with stable muscle memory

## Best Program Desk Structure

Use:

```text
Must Fix
Today
Briefing
Calendar
News
Watchlist
```

This gives the user the benefits of an Inbox without making the whole game feel like email.

## Best Continue System

Use:

```text
Continue Gate
```

Continue Gate should be a system, not a screen.

It appears only when advancement is blocked or risky.

---

# 17. Implementation Packets

## Packet UI-1 — Program Item Model

Deliver:

- ProgramItem type
- action type
- reason codes
- severity
- status
- grouping
- tests

Acceptance:

- can create task/report/news/blocker
- items validate
- duplicate/group keys work

## Packet UI-2 — Continue Gate

Deliver:

- preflight check registry
- blocker collection
- Continue blocking
- quick fix action handlers
- tests

Acceptance:

- Continue blocks on hard issue
- soft issue warns
- quick fix resolves blocker
- event log records action

## Packet UI-3 — Program Desk v1

Deliver:

- Program Desk route
- Overview tab
- Must Fix section
- Today's Decisions
- Staff Briefing
- Calendar snapshot
- News panel
- Right Inspector

Acceptance:

- connected to real ProgramItem state
- no mock inbox
- actions work

## Packet UI-4 — Global Search v1

Deliver:

- search index
- entities
- routes
- tasks
- CFBPedia entries
- command palette shell

Acceptance:

- user can find screens and entities
- search works from top bar

## Packet UI-5 — Bookmarks v1

Deliver:

- default bookmarks
- add/remove/reorder
- route/entity targets
- save/load

Acceptance:

- bookmarks persist
- bookmarks navigate correctly

## Packet UI-6 — CFBPedia v1

Deliver:

- glossary entity
- help entries
- search integration
- clickable help terms

Acceptance:

- terms can be opened from search
- entries support markdown/text

## Packet UI-7 — Workspace Layout Framework

Deliver:

- header
- breadcrumbs
- subtabs
- action bar
- table region
- right inspector
- saved view slot

Acceptance:

- Roster and Recruiting can reuse it

## Packet UI-8 — FM-Density Audit

Deliver:

- screen density checklist
- test/audit script or manual checklist
- UI reviewer prompt integration

Acceptance:

- every screen gets density score
- card-only screens flagged

---

# 18. Acceptance Criteria For UI Direction

The UI direction is acceptable when:

- Program Desk replaces passive Inbox
- Continue Gate cleanly resolves blockers
- major screens use dense workspaces
- key data is not buried in popups
- every entity is clickable
- global search finds screens/entities/tasks/help
- bookmarks persist
- CFBPedia exists
- staff advice is visible in context
- daily attention items are triaged by severity and deadline
- user can resolve blockers without hunting through menus
- power users can bypass Program Desk and go straight to workspaces

---

# 19. Final Rule

Do not build a prettier Inbox.

Build a program operating system.

The daily hub should answer:

```text
What needs my decision?
What prevents me from advancing?
What changed?
What does my staff recommend?
What should I investigate?
Where do I go to fix it?
```

The deep workspaces should answer:

```text
What is the truth?
What are my options?
What are the consequences?
```

That is the layout philosophy.
