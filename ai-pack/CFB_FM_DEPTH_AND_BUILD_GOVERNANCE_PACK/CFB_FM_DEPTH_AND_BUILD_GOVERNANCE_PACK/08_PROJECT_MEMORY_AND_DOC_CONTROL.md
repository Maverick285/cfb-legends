# Project Memory and Documentation Control

## Purpose

Large AI-built projects fail when context gets lost.

This document defines the project memory system.

---

# Required Memory Files

## PROJECT_STATUS.md

Tracks what exists.

Must include:

- current stage
- completed packets
- working systems
- scaffolded systems
- broken systems
- current test status
- save version
- ruleset version
- next packet

## DECISION_LOG.md

Tracks architectural decisions.

Use when:

- changing architecture
- changing data model
- changing save format
- adding/removing a major dependency
- changing simulation philosophy
- changing AI integration

## NEXT_PACKET.md

Tells the next AI exactly what to do.

Must include:

- recommended packet
- why it is next
- files to read
- files likely touched
- acceptance criteria
- known risks

## ARCHITECTURE.md

Explains system structure.

Must include:

- layers
- state ownership
- sim/UI separation
- persistence
- AI service boundaries
- testing strategy

## AI_CODING_RULES.md

Short rule list for every AI session.

---

# Documentation Update Rule

Every packet must update at least one of:

- PROJECT_STATUS.md
- NEXT_PACKET.md

If architecture changed, update:

- DECISION_LOG.md
- ARCHITECTURE.md

If coding rules changed, update:

- AI_CODING_RULES.md

---

# Decision Log Format

```markdown
## YYYY-MM-DD — [Decision]

### Decision

### Reason

### Alternatives Considered

### Consequences

### Revisit When
```

---

# Status Format

```markdown
# Project Status

## Current Stage

## Completed Packets

## Functional Systems

## Integrated Systems

## Validated Systems

## Scaffolded Only

## Broken / Missing

## Current Test Status

## Current Save Version

## Current Ruleset Version

## Next Recommended Packet
```

---

# System Status Definitions

## Not Started

No real work.

## Scaffolded

Files/types/routes exist, but gameplay depth does not.

## Functional

Basic system works.

## Integrated

Connected to related systems, events, and persistence.

## Validated

Long-run/statistical validation passed.

## Needs Refactor

Works but violates architecture or depth standards.

## Blocked

Cannot proceed without another dependency.

---

# Document Hygiene Rules

- Do not let docs become vague.
- Record limitations explicitly.
- Record placeholders explicitly.
- Record debt immediately.
- Do not delete old decisions silently.
- Do not let AI rewrite core docs without reason.
- Version major scope documents.

---

# Scope Control

New ideas are allowed.

But every new idea must be classified:

```text
Core Alpha
Beta
Expansion
Sandbox
Cosmetic
Research Needed
```

Do not let expansion ideas invade alpha unless they support core simulation.

---

# New Idea Intake Template

```markdown
# Idea Intake

## Idea

## Why It Matters

## Affected Systems

## Alpha/Beta/Expansion

## Data Needed

## Risks

## Minimum Implementation

## Full Implementation

## Acceptance Criteria
```
