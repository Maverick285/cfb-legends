# 91_DECISION_LOG_TEMPLATE

> Use this file as the structured record of important project decisions. Duplicate the entry template below for each new decision.

## Purpose

This file exists so the project does not forget why it looks the way it looks.

Create a new decision entry when:
- architecture changes
- rules assumptions change
- milestone scope changes
- a risky shortcut is accepted
- a benchmark-inspired idea is translated into an original solution
- a save/migration strategy changes
- a major feature is cut, delayed, or merged

Do not log trivia. Log decisions that future work could misunderstand.

## Decision quality rules

A good decision entry:
- states the problem clearly
- names the options considered
- explains the chosen direction
- records consequences
- names affected files/systems
- notes whether the decision is reversible

A bad decision entry:
- just says “we decided X”
- has no rationale
- has no impact analysis
- does not name what must change because of the decision

## Decision ID convention

Recommended format:
- `DL-YYYYMMDD-01`
- `DL-YYYYMMDD-02`

Or use a milestone-aware variant:
- `M3-DL-001`

Be consistent.

---

## Entry template

### Decision ID
`DL-YYYYMMDD-XX`

### Title
Short, specific, and decision-oriented.

### Status
Choose one:
- proposed
- accepted
- superseded
- rejected

### Date
YYYY-MM-DD

### Owner / role
Who made or ratified the decision?

### Related milestone / slice
Which roadmap milestone or slice does this belong to?

### Problem statement
What problem required a decision?

### Context
What facts, constraints, risks, or dependencies shaped the choice?

### Options considered

#### Option A
Description:

Pros:
- 

Cons:
- 

#### Option B
Description:

Pros:
- 

Cons:
- 

#### Option C
Description:

Pros:
- 

Cons:
- 

### Decision
State the chosen option plainly.

### Why this option won
Explain the reasoning. Tie it to:
- the guiding light
- legal distinctness
- rules stability
- implementation practicality
- player experience
- roadmap sequencing
- testability
- save safety

### Consequences

**Positive consequences:**
- 

**Negative consequences / tradeoffs:**
- 

**Risks introduced:**
- 

### Reversibility
Is this easy, medium, or hard to reverse? Explain why.

### Files / systems affected
- 
- 
- 

### Follow-up actions required
- 
- 
- 

### Tests or validations required
- 
- 
- 

### Source or research references
List any relevant docs or external sources consulted.

### Notes for future sessions
What should a later AI remember before revisiting this decision?

---

## Example entry

### Decision ID
`DL-20260501-01`

### Title
Keep postseason format rules in versioned data instead of embedding them in ranking code

### Status
accepted

### Date
2026-05-01

### Owner / role
AI Architect / Rules Researcher

### Related milestone / slice
M5 — standings, rankings, and CFP

### Problem statement
The project needs to support current postseason logic while staying resilient to future format or seeding changes.

### Context
Postseason structure is volatile compared with evergreen simulation concepts. Hardcoding it into ranking code would make future updates risky and would bleed rules logic into unrelated systems.

### Options considered

#### Option A
Hardcode current postseason logic inside the ranking service.

Pros:
- quick to implement

Cons:
- brittle
- hard to migrate
- difficult to test across modes

#### Option B
Store postseason rules in versioned ruleset data queried by ranking and bracket services.

Pros:
- adaptable
- testable
- season-aware
- supports alternate modes

Cons:
- more upfront design work

### Decision
Use versioned ruleset data for postseason structure and seeding behavior.

### Why this option won
It fits the guiding light, protects the sim against rule churn, and keeps the architecture cleaner for long careers and alternate modes.

### Consequences

**Positive consequences:**
- easier rule updates
- cleaner tests
- alternate modes become possible

**Negative consequences / tradeoffs:**
- more schema and validation work now

**Risks introduced:**
- poorly designed ruleset schemas could become too abstract or confusing

### Reversibility
Medium. The choice is reversible, but moving from hardcoded behavior to data-driven rules later would be more painful than doing it correctly now.

### Files / systems affected
- 06_RULES_AND_WORLD_MODEL.md
- 08_SYSTEM_ARCHITECTURE.md
- 10_SIMULATION_SYSTEMS.md
- postseason rules loader
- ranking service

### Follow-up actions required
- define bracket and seeding schema
- add tests for alternate rulesets
- record current real-world assumptions in the sources appendix

### Tests or validations required
- postseason legality tests
- season rollover tests
- ranking-to-bracket integration tests

### Source or research references
- rules and CFP source appendix entries in `99_SOURCES_AND_FACT_BASIS.md`

### Notes for future sessions
If postseason structure changes again, update the ruleset data and tests first before touching UI logic.
