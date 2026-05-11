# 03_DISTINCTNESS_AND_RISK

> Use this file as an instruction set for the AI working on the project.

**Read after:** 02_AI_SESSION_PROTOCOL.md
**Primary outputs required:**
- A benchmark translation framework that prevents lazy cloning
- A risk register covering likeness, IP, rules volatility, and product distinctness
- A feature translation matrix: keep / drop / merge / reinvent
**Stop when:**
- The AI can explain how to research Football Manager and college-football competitors without copying them
- The prototype content policy is explicitly fictional-first
- High-risk areas are logged with mitigation strategies

## Purpose

This file exists to stop the project from making the dumbest possible mistake:

> building an obvious Football Manager clone with helmets.

That would be strategically weak, legally noisy, creatively lazy, and structurally wrong for modern college football.

## The benchmark rule

Benchmark products are tools for learning:
- how they organize decisions
- how they pace information
- how they reduce complexity
- how they make long careers playable

They are **not**:
- UI templates
- naming guides
- art direction guides
- legal shields

## Primary benchmark set

Use these products as the core comparison set:

- Football Manager: benchmark for management UI patterns, inbox-driven flow, recruitment structure, squad planning, analytics
- EA College Football Dynasty: benchmark for college-football flavor, recruiting/portal expectations, coach/program framing
- Bowl Bound College Football: benchmark for administrative depth, budgets, archives, lighter-surface but serious sim structure

For facts and source anchors, use `99_SOURCES_AND_FACT_BASIS.md`.

## What to copy vs what to translate

### Safe to learn from
- screen purpose
- information hierarchy
- decision timing
- delegation patterns
- comparison workflows
- filter/search behavior
- history and analytics framing
- long-term consequence design

### Not safe to copy
- branded terminology
- distinctive screen naming
- layout mimicry
- iconography or visual language too close to a benchmark
- art direction
- exact menu hierarchy
- exact table order if it creates obvious surface similarity
- benchmark-specific text phrasing
- real-school / real-player identity without licensing

## Translation rule

For each benchmark feature, create a four-way decision:

- **Keep**: the underlying decision is already right for this game
- **Drop**: the benchmark feature solves a soccer-specific or irrelevant problem
- **Merge**: combine multiple benchmark features into one college-football-specific screen or system
- **Reinvent**: preserve the management purpose but rebuild the interaction around college-football reality

### Example translations

| Benchmark concept | Wrong approach | Right approach |
|---|---|---|
| Inbox | Recreate FM’s inbox verbatim | Build a distinct “Program Desk” with blocking deadlines, staff memos, recruiting alerts, compliance alerts, and AD messages |
| Squad Planner | Rename it and keep same logic | Turn it into a depth-chart horizon planner tied to eligibility, recruiting class shape, and portal need |
| Transfers | Treat college football like pro transfer windows only | Split into recruiting board, transfer portal, and retention risk systems |
| Board Confidence | Port the same board vocabulary | Reframe around AD confidence, donor patience, fan pressure, and institutional goals |
| Data Hub | Recreate same screens | Build a customizable Analytics Lab that unlocks after sufficient data exists |

## Prototype content policy

### Mandatory in the prototype
- fictional schools
- fictional players
- fictional conferences if needed
- fictional logos and brands
- fictional media entities
- original copywriting
- original screen naming

### Explicitly out of scope for prototype
- real school branding
- real player likenesses
- real coach likenesses
- copied school traditions
- copied rivalry presentation language
- anything that requires formal licensing to be safely commercialized

## Risk categories

### 1. Likeness and right-of-publicity risk
Using real or highly recognizable player or coach identity without a license is a major risk area. Past litigation around athlete likeness in college sports is not theoretical history; it is a warning. Use fictional people first.

### 2. Trademark and brand risk
School names, logos, slogans, conference marks, bowl/game marks, trophy marks, and some presentation assets require separate consideration. Do not let prototype progress depend on them.

### 3. Trade dress / product look-and-feel risk
Even without copying names or logos, overly similar screen structure, wording, and visual rhythm can create avoidable exposure and make the game look derivative.

### 4. Rules-volatility risk
Modern college-football rules are changing fast. If you hardcode assumptions, you create product breakage and rework.

### 5. Scope-risk by authenticity obsession
Trying to simulate every legal, financial, or institutional nuance before the core management loop works will kill the project.

## Practical mitigation strategy

### Mitigation A: Functional decomposition
Document each benchmark screen by:
- what question it answers
- what data it needs
- what actions it enables
- what college-football equivalent should replace it

Do not document benchmark screens only by how they look.

### Mitigation B: Original vocabulary
Create and maintain a project glossary. Build your own naming system early.

Examples of distinct vocabulary candidates:
- Program Desk
- Talent Hub
- Depth Chart Planner
- Program Home
- Analytics Lab
- Benefit Allocations
- Retention Watch
- Program Confidence
- Staff Responsibilities
- History Vault / Trophy Room

### Mitigation C: Fiction-first content packs
Structure content so the game can load different data packs later:
- fictional base pack
- licensed pack if ever approved
- community mod packs if appropriate later

### Mitigation D: Source-based rules layer
Put volatile rules in config files with source references, not scattered code.

### Mitigation E: Risk register
Maintain an explicit risk register with:
- risk
- severity
- probability
- owner
- mitigation
- trigger for review

## The “obvious clone” checklist

If too many of these are true, the project is drifting into clone territory:

- the sidebar/menu structure looks nearly identical to FM
- terminology feels inherited instead of designed
- the screen order is basically the same
- table views are arranged the same way for the same reasons
- the product pitch could be mistaken for “FM, but college football”
- the college-specific systems feel bolted on rather than foundational

If 3 or more are true, stop and redesign.

## The “legally distinct but strategically weak” trap

Avoid the opposite mistake too.

A game can be legally distinct and still bad because it ignores proven management patterns. Do not throw away useful patterns merely to appear different. The goal is not surface novelty. The goal is a better fit for the sport.

## Required benchmark translation deliverable

Create a matrix with the following columns:

- benchmark product
- feature/screen/system
- underlying player question
- why players use it
- what should happen in the college-football game
- keep / drop / merge / reinvent
- notes on distinct naming or structure

The matrix should cover at least:
- FM inbox
- FM squad screen
- FM squad planner
- FM recruitment focus / scouting
- FM data hub
- FM board/facilities
- EA recruiting flow
- EA transfer portal flow
- EA coach/program progression
- Bowl Bound budgets
- Bowl Bound archive/history layer

## Risk register minimum contents

The initial risk register must include at least:
- likeness/licensing risk
- rules-volatility risk
- scope creep risk
- save-format instability risk
- cloned-surface-language risk
- match-engine-too-early risk
- data-model-underbuilt risk
- headline/news repetition risk

## Product-risk principles

1. Distinctness is a design input, not a final polish pass.
2. Fiction-first is the cheapest path to truth.
3. Rules volatility is guaranteed, not hypothetical.
4. Original structure matters more than original color choices.
5. A better college-football fit is more important than superficial similarity to famous management games.

## Immediate deliverable after reading this file

Produce:
1. a distinctness memo
2. the benchmark translation matrix
3. the initial risk register

Then continue to `04_RESEARCH_PROGRAM.md`.
