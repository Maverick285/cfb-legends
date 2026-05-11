# Packet Completion Standard

## Purpose

This document defines what every AI work packet must deliver.

It prevents AI from claiming a packet is done when it only built partial or cosmetic output.

---

# Required Packet Output

Every completed packet must end with this report.

```markdown
# Packet Completion Report

## Packet Name

## Summary

## Files Changed

## Domain Model Changes

## Simulation Logic Changes

## Persistence Changes

## UI Changes

## Event / Inbox Hooks

## Tests Added

## Debug / Export Additions

## Save/Load Impact

## Determinism Impact

## Known Limitations

## Acceptance Criteria Checklist

## Depth Score

## Next Packet Recommendation
```

If the AI does not provide this, the packet is incomplete.

---

# Required Proof

## 1. Proof of Real State

The AI must identify where the system state lives.

Example:

```text
PracticePlan lives at GameWorld.practicePlans[schoolId][weekId].
```

Bad:

```text
Practice state is managed locally in the component.
```

## 2. Proof of Determinism

If randomness is involved, the AI must show:

```text
Uses seeded RNG from src/domain/rng.ts.
No Math.random.
```

## 3. Proof of Persistence

If stateful, the AI must show:

```text
Save/load round-trip test added.
```

## 4. Proof of Consequence

The AI must list downstream effects.

Example:

```text
Practice intensity affects fatigue, readiness, morale, and development tick.
```

## 5. Proof of Testing

The AI must list tests by file.

Example:

```text
tests/unit/practice.test.ts
tests/integration/practiceContinue.test.ts
```

## 6. Proof of UI Connection

If UI was added:

```text
The screen reads from GameWorld state and dispatches domain actions.
```

## 7. Proof of Events

If the feature should alert the user:

```text
Events added: practice_fatigue_warning, low_team_vibe_alert.
```

---

# Packet Review Checklist

Before accepting a packet, answer yes/no.

## Architecture

- [ ] Did it avoid unrelated rewrites?
- [ ] Did it follow the repo structure?
- [ ] Did it avoid UI-only state?
- [ ] Did it avoid hardcoded rules?
- [ ] Did it preserve headless simulation?

## Data

- [ ] Are types explicit?
- [ ] Are invalid states prevented?
- [ ] Are hidden fields separated?
- [ ] Are IDs stable?
- [ ] Are relationships clear?

## Simulation

- [ ] Is logic deterministic?
- [ ] Are consequences real?
- [ ] Are formulas explainable?
- [ ] Are reason codes available?
- [ ] Are edge cases handled?

## Persistence

- [ ] Does it save?
- [ ] Does it load?
- [ ] Is there a round-trip test?
- [ ] Is migration considered?
- [ ] Does loading validate state?

## UI

- [ ] Is it connected to real state?
- [ ] Are important things clickable?
- [ ] Is it dense enough for FM-style use?
- [ ] Are there data-testid hooks?
- [ ] Does it avoid fake dashboards?

## Events

- [ ] Does the Inbox surface important changes?
- [ ] Can events block Continue if needed?
- [ ] Do event actions change state?
- [ ] Are events logged?
- [ ] Are duplicates/spam controlled?

## Tests

- [ ] Unit tests exist?
- [ ] Integration tests exist if needed?
- [ ] Edge cases covered?
- [ ] Invariant tests updated?
- [ ] Tests would fail if system were fake?

## Validation

- [ ] Does it export/debug reasons?
- [ ] Does it support headless sim?
- [ ] Has any long-run behavior been checked if applicable?
- [ ] Are statistical targets defined?
- [ ] Are exploit risks listed?

---

# Acceptance Outcomes

## Accept

All required criteria met.

## Accept as Scaffolding

Allowed only if the packet was explicitly foundational.

Must record:

```text
This is scaffolding, not a real gameplay system.
```

## Reject and Fix

Use when:

- tests missing
- state is UI-only
- feature is cosmetic
- consequences missing
- persistence missing
- randomness unseeded
- architecture drift occurred

## Defer

Use when the packet uncovered a larger dependency.

Must create a new packet.

---

# Packet Status Labels

Use these labels in `PROJECT_STATUS.md`.

```text
Not Started
Scaffolded
Functional
Integrated
Validated
Blocked
Rejected
Needs Refactor
```

## Meaning

### Scaffolded

Structure exists, but gameplay depth does not.

### Functional

Basic logic works.

### Integrated

Connected to other systems and events.

### Validated

Long-run/statistical validation passed.

---

# Examples

## Bad Completion Report

```text
Built recruiting screen with sample prospects.
```

Reject.

## Good Completion Report

```text
Built Prospect entity, deterministic generator, scouted ranges, recruiting board table using real state, save/load test, interest formula tests, and event hook for scout report completion.
Depth Score: 3.5.
Known limitation: AI schools not yet recruiting.
```

Accept as functional if packet scope matches.
