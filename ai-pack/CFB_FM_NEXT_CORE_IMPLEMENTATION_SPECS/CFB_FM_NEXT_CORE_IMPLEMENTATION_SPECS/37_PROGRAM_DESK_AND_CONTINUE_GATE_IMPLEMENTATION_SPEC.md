# 37 — Program Desk and Continue Gate Implementation Spec

## North Star

The user should not manage the game through a passive email inbox.

The user should manage the program from a command center.

The Program Desk answers:

```text
What needs my attention?
What blocks advancing?
What changed?
What does my staff recommend?
What deadlines are coming?
What should I investigate?
```

The Continue Gate answers:

```text
Can time advance?
If not, what exactly must be fixed?
Can I quick-fix or delegate it?
```

## Core Concepts

```text
ProgramItem = any actionable, informational, or blocking item
Program Desk = daily hub
Continue Gate = advancement preflight resolver
Workspace = deep screen where work happens
```

## ProgramItem Types

```text
task
blocking_issue
alert
report
news
deadline
recommendation
watch_item
digest
```

## ProgramItem Schema

```ts
type ProgramItem = {
  id: string;
  type: ProgramItemType;
  category: ProgramCategory;
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
  source: ProgramItemSource;
  affectedEntities: EntityRef[];
  summary: string;
  detail: string;
  actions: ProgramItemAction[];
  recommendedActionId?: string;
  delegationAllowed: boolean;
  autoResolveAllowed: boolean;
  consequencePreview: ConsequencePreview[];
  reasonCodes: ReasonCode[];
  duplicateKey?: string;
  groupKey?: string;
};
```

## Categories

- roster
- recruiting
- portal
- practice
- game_week
- staff
- finance
- nil
- compliance
- academics
- media
- world
- data_lab

## Program Desk Layout

Main sections:

1. Must Fix To Continue
2. Today's Decisions
3. Staff Briefing
4. Calendar / Deadlines
5. Watchlist
6. News / World
7. Delegated Items

## Program Desk Tabs

- Overview
- Tasks
- Reports
- Calendar
- News
- Watchlist
- Delegated
- Archive

## Must Fix To Continue

Hard blockers.

Examples:

- invalid depth chart
- no eligible QB
- game plan missing if required
- signing day unresolved
- NIL deal review requiring decision
- compliance issue
- roster invalid by ruleset
- save migration issue

## Soft Blockers

Can advance but create consequence.

Examples:

- practice plan not customized
- top recruit contact overdue
- player meeting delayed
- fatigue warning
- staff report unread
- booster request expiring

Soft blockers should show:

```text
Advance anyway with consequence
```

when allowed.

## Continue Gate

When user clicks Continue:

```text
run preflight checks
→ collect hard blockers
→ collect soft blockers
→ if no hard blockers and user accepts soft blockers, advance
→ if blockers exist, open Continue Gate panel
```

## Preflight Check Registry

```ts
type ContinuePreflightCheck = {
  id: string;
  category: ProgramCategory;
  run(world: GameWorld): ContinueCheckResult[];
};
```

Examples:

- checkDepthChartLegal
- checkEligiblePlayers
- checkPracticePlan
- checkGamePlan
- checkSigningDeadline
- checkRosterLimits
- checkComplianceReview
- checkUnresolvedRequiredMeetings
- checkPortalDeadline

## ContinueCheckResult

```ts
type ContinueCheckResult = {
  id: string;
  severity: "critical" | "high" | "normal" | "low";
  blocking: boolean;
  softBlock: boolean;
  summary: string;
  reasonCodes: ReasonCode[];
  affectedEntities: EntityRef[];
  quickFixes: ProgramItemAction[];
};
```

## Quick Fix Actions

Every blocker should attempt to provide:

- use staff recommendation
- auto-fill legal minimum
- delegate to responsible staff
- open relevant screen
- delay if allowed
- accept consequence if soft block

Example:

```text
Invalid Depth Chart
Quick Fix: Use OC Recommended Depth Chart
Open: Depth Chart
Delegate: Offensive Coordinator
```

## Delegation Policies

The user can configure:

- staff may auto-fix minor depth chart issues
- staff may auto-generate practice plan
- staff may not approve NIL deals above threshold
- user must approve recruit promises
- user must approve compliance issues
- staff may handle low-priority recruiting contacts

## Staff Briefing

Staff Briefing groups reports.

Examples:

- GM roster risk report
- Recruiting coordinator board update
- OC game prep note
- Strength coach fatigue report
- Academic advisor warning
- NIL liaison deal update

The briefing should reduce spam.

## Duplicate / Grouping Logic

Use groupKey and duplicateKey.

Examples:

Instead of five messages:

```text
WR unhappy
WR unhappy
WR unhappy
WR unhappy
WR unhappy
```

Group into:

```text
WR room morale slipping
```

## Watchlist

User can watch:

- recruits
- players
- staff
- NIL deals
- portal targets
- injuries
- rivals
- conference races
- records

Watchlist items generate higher visibility.

## Program Desk UI Requirements

- left nav section
- summary counts
- severity filters
- due date filters
- category filters
- right inspector
- quick action buttons
- consequence preview
- staff recommendation
- links to affected entities
- archive/delegate/resolve
- keyboard support

## Tests

Required:

- hard blocker prevents Continue
- soft blocker can be accepted
- quick fix resolves blocker
- delegate changes status
- duplicate items group
- expired item changes status
- ProgramItem saves/loads
- event action logs result
- user policy auto-resolves allowed item
- user policy does not auto-resolve forbidden item

## Acceptance Criteria

This system is acceptable when:

- Program Desk replaces passive inbox
- Continue Gate blocks invalid advancement
- quick fixes work
- delegation works
- staff briefing reduces spam
- daily tasks are triaged
- user can resolve blockers without hunting
- power users can navigate directly to workspaces
