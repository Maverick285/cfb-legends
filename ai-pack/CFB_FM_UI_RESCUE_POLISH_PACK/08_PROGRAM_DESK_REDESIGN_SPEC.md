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
