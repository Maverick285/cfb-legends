# System Implementation Spec Template

## Purpose

Use this template before implementing any major system.

The feature scope docs describe what the system should feel like.
This document forces the AI to specify how it will actually work.

---

# Template

```markdown
# System Implementation Spec: [System Name]

## 1. System Purpose

What problem does this system solve?

## 2. Player Fantasy

What should the user feel when using this system?

## 3. Core Loop

Input → decision → simulation → consequence → feedback.

## 4. Domain Entities

List entities, fields, IDs, relationships, and validation rules.

## 5. Hidden vs Visible Data

What is true internally?
What is shown publicly?
What is shown through scouting/staff opinion?

## 6. State Ownership

Where does the state live in GameWorld?

## 7. Config / Ruleset Dependencies

What belongs in JSON config instead of code?

## 8. Simulation Logic

Formulas, state transitions, and reason codes.

## 9. Randomness

What is random?
What seed namespace is used?
What is the expected distribution?

## 10. User Actions

List actions, requirements, costs, and consequences.

## 11. AI School Actions

How do non-user schools interact with this system?

## 12. Events and Inbox Hooks

What events are generated?
Which are blocking?
What actions do events provide?

## 13. UI Requirements

Screens, tabs, tables, filters, clickable links, test IDs.

## 14. Persistence

Save shape, migrations, round-trip requirements.

## 15. Tests

Unit, integration, scenario, invariant, statistical.

## 16. Debug / Data Lab

What exports or reason codes exist?

## 17. Long-Run Validation

What metrics should be checked after 5/20 seasons?

## 18. Exploit Risks

How might the user cheese this system?

## 19. Acceptance Criteria

Concrete checklist.

## 20. Future Expansion

What is intentionally deferred?
```

---

# Example: Recruiting Implementation Spec Skeleton

## 1. System Purpose

Recruiting models the acquisition of future players through multi-year evaluation, relationship building, NIL-era economics, school fit, visits, promises, and signing decisions.

## 2. Player Fantasy

The user should feel like they are projecting teenagers into future college players, not shopping for known ratings.

## 3. Core Loop

```text
Discover prospect
→ scout/evaluate
→ compare fit
→ allocate staff/resources
→ build relationship
→ manage NIL/playing-time expectations
→ handle competitor pressure
→ secure commitment
→ sign
→ develop
```

## 4. Domain Entities

- Prospect
- RecruitmentState
- ScoutingReport
- Visit
- Offer
- Promise
- RecruitingBoard
- StaffAssignment
- RecruitingClass

## 5. Hidden vs Visible

True attributes are hidden.
Public ratings are imperfect.
Scouted ranges narrow over time.
Staff reports can be biased.

## 6. State Ownership

```text
GameWorld.prospects
GameWorld.recruitingBoards[schoolId]
GameWorld.staffAssignments
GameWorld.events
```

## 7. Config Dependencies

- national recruit counts
- star distribution
- recruiting calendar
- visit limits
- NIL rules
- scouting speed
- decommit volatility

## 8. Simulation Logic

Must include:

- prospect evolution
- interest engine
- scouting confidence
- visit outcomes
- commitment probability
- decommit risk
- AI school recruiting

## 9. Randomness

Use seed namespaces:

```text
recruit_generation
prospect_evolution
recruit_interest
visit_outcome
commit_decision
```

## 10. User Actions

- add to board
- assign scout
- contact
- offer
- schedule visit
- make pitch
- promise
- withdraw
- delegate

## 11. AI School Actions

AI schools must:

- identify needs
- build boards
- offer recruits
- schedule visits
- react to competitor pressure
- fill classes

## 12. Events

- scout report complete
- rival push
- visit result
- decommit risk
- NIL expectation changed
- signing deadline

## 13. UI

Tabs:

- Overview
- Search
- Board
- Visits
- Offers
- Staff Assignments
- Competitors
- Promises
- Analytics

## 14. Persistence

Recruitment state must save/load.

## 15. Tests

- distribution tests
- interest formula tests
- save/load tests
- event tests
- AI recruiting tests

## 16. Debug

Recruit interest must have reason codes.

## 17. Long-Run Validation

- class star distributions
- blue-chip concentration
- AI school behavior
- late bloomer rates
- bust rates

## 18. Exploit Risks

- user always wins recruits by spamming contact
- NIL money dominates everything
- local schools too weak/strong
- high scouting accuracy too early

## 19. Acceptance Criteria

Recruiting is not accepted until signing a class changes future roster and long-run distributions remain plausible.
