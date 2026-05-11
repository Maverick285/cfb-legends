# Screen Personalities and Component Library

## North Star

Every major screen should feel like part of the same game, but each should have its own identity.

The user should instantly understand:

```text
I am in the recruiting room.
I am in the film room.
I am in the program archive.
I am in the money/booster ledger.
```

## Shared Layout Components

## AppShell

Contains:

- TopBar
- LeftNav
- MainWorkspace
- RightInspector

## WorkspaceShell

Contains:

- WorkspaceHeader
- Breadcrumbs
- SubTabs
- ActionBar
- MainContent
- RightInspector
- Footer/ReasonCodes optional

## EntityLink

Any player, recruit, staff, school, town, game, record, or trait should be clickable.

## RightInspector

Shows selected entity/item.

Types:

- player quick view
- recruit quick view
- staff advice
- ProgramItem detail
- stat explanation
- trait definition
- facility project

## StaffAdviceRail

Shows:

- primary recommendation
- dissenting view
- confidence
- quick action

## ReasonCodeList

Shows why something happened.

Example:

```text
Interest +12: close to home
Interest +9: development reputation
Interest -7: crowded QB room
```

## MomentCard

Used for Tier 3–4 events.

Fields:

- headline
- subheadline
- category
- key entities
- reactions
- links
- file status

## MediaClippingCard

Short headline + outlet + summary.

## PulseMeter

Shows Campus Pulse component.

## ScrapbookEntryCard

Shows archived moment.

## Workspace Personalities

## Program Desk

Visual feel:

```text
coach's desk
organized folders
briefing notes
calendar
clippings
```

Primary components:

- ProgramItemCard
- StaffBriefingCard
- ContinueBlockerCard
- CampusPulseSummary
- CalendarSnapshot
- MediaClippingCard

## Roster Room

Visual feel:

```text
depth chart board
player folders
position room
```

Primary components:

- DenseTable
- PlayerQuickInspector
- DepthChartBoard
- PositionGroupPanel
- PlayerStoryTimeline

## Recruiting Room

Visual feel:

```text
recruiting board
map
folders
staff assignments
visit calendar
```

Primary components:

- ProspectTable
- RecruitingMap
- VisitCalendar
- ProspectQuickInspector
- StaffAssignmentBoard
- RecruitingStoryPanel

## Practice Field

Visual feel:

```text
weekly practice sheet
field plan
fatigue board
```

Primary components:

- PracticeTimeAllocator
- IntensitySelector
- FatigueRiskPanel
- TeamVibePanel
- PositionGroupPracticeTable

## Film Room

Visual feel:

```text
film cutups
scouting binder
chalkboard
```

Primary components:

- GamePlanPanel
- MatchupBoard
- PlayByPlayTable
- DriveChart
- ReasonCodeFilmNotes

## NIL / Money

Visual feel:

```text
ledger
booster notes
clearinghouse files
```

Primary components:

- NILDealTable
- ClearinghouseReviewCard
- BoosterSegmentPanel
- BudgetLedger
- DirectBenefitAllocator

## History / Scrapbook

Visual feel:

```text
media guide
archive
trophy room
scrapbook
```

Primary components:

- Timeline
- ScrapbookEntryCard
- RecordTable
- SeasonArchive
- PlayerLegacyPanel

## Data Hub

Visual feel:

```text
analytics binder
film charting room
```

Primary components:

- ChartPanel
- DataTable
- ValidationReport
- DistributionBandChart
- ExportButton

## Component States

Every component should support:

- loading
- empty
- error
- degraded/offline
- no data yet
- hidden due to scouting uncertainty
- locked/unavailable
- delegated

## Empty State Tone

Bad:

```text
No data.
```

Good:

```text
No staff reports yet. Assign a scout or wait for the next evaluation window.
```

## Buttons and Actions

Use immersive verbs.

Examples:

- Review Report
- Ask Staff
- Call Recruit
- Schedule Visit
- Meet With Player
- Set Practice Plan
- Send Position Coach
- File to Scrapbook
- Open Film Room
- Use Staff Recommendation
- Delegate to Coordinator

Avoid generic verbs where possible:

- Submit
- Execute
- Confirm
- Process

## Acceptance Criteria

Component library is acceptable when:

- components are reusable
- screen personality is visible but not gimmicky
- dense tables remain central
- right inspector reduces popups
- click-through is universal
- empty states are useful
- actions use football/program language
