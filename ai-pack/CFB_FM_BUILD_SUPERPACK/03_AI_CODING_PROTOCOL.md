# AI Coding Protocol

## Why This Exists

AI will happily build shiny screens while hiding state in React components. That will kill this project.

This protocol forces the AI to build real systems.

## Every Packet Must Include

1. implementation summary
2. files changed
3. data model changes
4. simulation logic changes
5. persistence changes
6. UI changes, if applicable
7. tests added
8. acceptance checklist
9. known limitations
10. next packet recommendation

## AI Must Not

- hardcode rules that belong in config
- hide game state in UI components
- generate random results without seeded RNG
- use LLM output as game truth
- skip tests
- create placeholder-only UI
- rewrite unrelated architecture
- create facts that cannot be saved
- break headless simulation
- silently ignore invalid data

## Standard Work Packet Prompt

```text
Implement the following CFB-FM work packet.

Read:
- master build prompt
- engine architecture spec
- current PROJECT_STATUS.md
- current file tree
- current packet

Rules:
- Keep scope limited to this packet.
- Add tests.
- Update docs.
- Do not create UI-only game state.
- Use deterministic seeded random where randomness is needed.
- Persist state if the feature is stateful.
- Do not let AI/LLM decide simulation facts.
- Do not hardcode rules that belong in config.
- If a requirement cannot be completed, state exactly what remains.

Return:
1. summary
2. files changed
3. tests added
4. acceptance checklist
5. next packet handoff
```

## QA Prompt After Every Packet

```text
Review the implementation against the packet acceptance criteria.

Find:
- missing requirements
- placeholder logic
- UI-only state
- unseeded randomness
- missing persistence
- missing tests
- broken architecture
- save/load risk
- shallow FM-like UI issues

Return:
- pass/fail
- blockers
- fixes
- regression tests to add
```

## Required Project Memory Files

The repo must maintain:

```text
PROJECT_STATUS.md
DECISION_LOG.md
NEXT_PACKET.md
ARCHITECTURE.md
AI_CODING_RULES.md
```

## PROJECT_STATUS.md Template

```markdown
# Project Status

## Current Stage

## Completed Packets

## Working Systems

## Partial Systems

## Broken / Missing

## Current Test Status

## Current Save Version

## Current Ruleset Version

## Next Recommended Packet
```

## DECISION_LOG.md Template

```markdown
# Decision Log

## YYYY-MM-DD — Decision Name

### Decision

### Reason

### Alternatives Considered

### Consequences

### Revisit When
```

## NEXT_PACKET.md Template

```markdown
# Next Packet

## Packet

## Why This Next

## Files To Read

## Files Likely Touched

## Acceptance Criteria
```
