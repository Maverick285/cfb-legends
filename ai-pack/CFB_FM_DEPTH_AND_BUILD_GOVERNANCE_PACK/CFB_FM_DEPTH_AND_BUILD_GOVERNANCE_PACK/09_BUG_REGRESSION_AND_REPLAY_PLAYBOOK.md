# Bug, Regression, and Replay Playbook

## Purpose

A simulation game creates weird bugs.

This document defines how to capture, reproduce, and prevent them.

---

# Bug Report Template

```markdown
# Bug Report

## Summary

## Severity

## Seed

## Save File

## Week/Season

## Ruleset

## Steps To Reproduce

## Expected Behavior

## Actual Behavior

## Relevant Event Log Entries

## Screenshots / Output

## Suspected System

## Regression Test Needed
```

---

# Severity

## Critical

- save corrupts
- game cannot continue
- impossible state breaks sim
- crash

## High

- major system wrong
- unrealistic exploit
- roster/eligibility broken
- recruiting/signing broken

## Medium

- bad calculation
- UI misleading
- event wrong
- balance issue

## Low

- copy issue
- minor UI issue
- rare flavor problem

---

# Replay Requirement

Every user/sim action should eventually log:

```json
{
  "tick": "2031-WEEK-07",
  "actor": "school_ou",
  "action": "offer_scholarship",
  "target": "prospect_123",
  "before": {},
  "after": {},
  "reasonCodes": []
}
```

Goal:

```text
Every weird state can be reproduced.
```

---

# Regression Test Rule

Every fixed bug must add a test unless impossible.

If no test is added, explain why in the bug report.

---

# Common Bug Classes

## Save/Load Bugs

Symptoms:

- state disappears
- hidden traits exposed
- events duplicate
- dates reset
- custom school loses data

Required tests:

- round-trip save/load
- migration load
- hidden/public view test

## Determinism Bugs

Symptoms:

- same seed produces different result
- replay diverges
- AI school behavior changes randomly

Required tests:

- same-seed equality
- different-seed difference
- no Math.random scan

## Roster Bugs

Symptoms:

- duplicate player
- player on two teams
- invalid eligibility
- impossible redshirt
- no positions

Required tests:

- invariant check
- scenario test

## Recruiting Bugs

Symptoms:

- recruit signs twice
- interest unexplained
- all recruits pick money
- AI schools ignore needs

Required tests:

- signing invariant
- interest reason code test
- AI board-building test

## NIL Bugs

Symptoms:

- absurd deals approved
- all deals denied
- walk-ons impossible
- NIL does not affect behavior

Required tests:

- clearinghouse thresholds
- walk-on NIL
- retention effect

## Development Bugs

Symptoms:

- everyone improves
- nobody improves
- elite talent inflates
- hidden traits irrelevant

Required tests:

- growth distribution
- regression case
- hidden trait impact

---

# Anomaly Report

Headless sim should output anomalies:

```json
{
  "severity": "high",
  "system": "recruiting",
  "message": "One school signed 19 five-star recruits.",
  "season": 2034,
  "schoolId": "school_x",
  "suggestedTest": "recruiting_class_concentration_limit"
}
```

---

# Fix Packet Template

```markdown
# Fix Packet

## Bug

## Root Cause

## Files To Change

## Required Fix

## Regression Test

## Acceptance Criteria
```
