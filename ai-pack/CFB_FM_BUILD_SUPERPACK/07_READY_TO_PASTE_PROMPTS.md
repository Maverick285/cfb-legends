# Ready-To-Paste AI Prompts

## Prompt: Packet 0.1 Repository Skeleton

```text
You are implementing Packet 0.1 for the CFB-FM project.

Goal:
Create the repository skeleton for a Tauri + React + TypeScript + SQLite desktop app.

Read these rules:
- This is a menu-heavy simulation app, not a graphics-first game.
- No game features yet.
- No fake roster/recruiting dashboards yet.
- Build structure, scripts, docs, and test foundation.
- Maintain project memory files.

Deliver:
1. Tauri + React + TypeScript starter project
2. folder structure:
   src/app
   src/ui
   src/routes
   src/components
   src/tables
   src/profiles
   src/domain
   src/sim
   src/events
   src/data
   src/services
   src/testing
   src/utils
   config/rulesets
   config/balance
   assets/generated
   tests
   scripts
   docs
3. PROJECT_STATUS.md
4. DECISION_LOG.md
5. NEXT_PACKET.md
6. ARCHITECTURE.md
7. AI_CODING_RULES.md
8. README.md
9. Vitest setup
10. basic smoke test

Acceptance:
- app starts
- tests run
- no game logic yet
- project memory files explain how future AI sessions continue
```

## Prompt: Packet 0.2 RNG and IDs

```text
Implement Packet 0.2 — Deterministic RNG and ID Utilities.

Goal:
Create deterministic random utilities and stable ID generation.

Deliver:
- src/domain/rng.ts
- src/domain/ids.ts
- tests/unit/rng.test.ts
- tests/unit/ids.test.ts

Requirements:
- same seed produces same sequence
- namespaced RNG supported
- weighted pick supported
- integer and float helpers
- deterministic ID creation by prefix + parts
- no Math.random in sim code

Acceptance:
- tests pass
- utilities documented
- PROJECT_STATUS.md updated
- NEXT_PACKET.md points to config/ruleset loader
```

## Prompt: Packet 0.3 Config Ruleset Loader

```text
Implement Packet 0.3 — Config and Ruleset Loader.

Goal:
Create JSON ruleset loading and validation.

Deliver:
- config/rulesets/current_fictional.json
- config/schemas/ruleset.schema.json or TypeScript validator
- src/data/configLoader.ts
- src/domain/ruleset.ts
- tests/unit/configLoader.test.ts

Ruleset must include:
- roster limits
- scholarship rules
- NIL rules
- direct benefit rules
- transfer windows
- redshirt rules
- weekly practice time units
- recruiting calendar
- playoff format
- signing periods

Acceptance:
- valid config loads
- invalid config fails loudly
- no hardcoded rules
- tests pass
```

## Prompt: Packet 1.3 Player Entity v1

```text
Implement Packet 1.3 — Player Entity v1.

Goal:
Create a granular player entity suitable for long-term development simulation.

Deliver:
- src/domain/player.ts
- player factory for tests
- serialization helpers
- tests/unit/player.test.ts

Player must include:
- identity
- schoolId
- position
- secondary positions
- height/weight
- class/eligibility
- visible attributes
- hidden attributes
- preference weights
- NIL profile
- morale profile
- development profile
- academic/life profile
- durability profile
- market/brand profile

Attribute groups:
- physical
- movement
- technical
- football IQ
- mental
- personality
- durability
- academic/life
- market/brand
- hidden preferences

Hard rules:
- hidden traits cannot be exposed by default public view
- all values must validate ranges
- player must serialize/deserialize
- deterministic test factory must use seeded RNG

Acceptance:
- tests pass
- hidden/public views tested
- PROJECT_STATUS.md updated
```

## Prompt: Packet 7.5 Trait Clusters v1

```text
Implement Packet 7.5 — Scouting and Trait Clusters v1.

Goal:
Convert structured player/prospect data into human-readable scouting labels.

Deliver:
- src/domain/traitCluster.ts
- src/sim/scouting/traitDerivation.ts
- tests/unit/traitDerivation.test.ts

Trait cluster object:
- id
- label
- category
- visibility
- confidence
- evidence
- source
- positive/negative/neutral
- gameplayEffects

Categories:
- development curve
- work/preparation
- competitive/mental
- physical body/movement
- football IQ
- personality/retention
- role/scheme
- risk

Required example labels:
- Late Developer
- Gym Rat
- Studious
- Gamer
- Bad Hips
- Money-Motivated
- Development-Focused
- Portal Risk

Hard rules:
- labels are derived from data, not invented
- every label needs evidence
- confidence must reflect scouting certainty
- staff bias should be supported even if basic

Acceptance:
- tests show labels appear/disappear based on attributes
- labels include confidence and evidence
- no LLM required
```

## Prompt: Packet 10.2 NIL Clearinghouse v1

```text
Implement Packet 10.2 — NIL Clearinghouse v1.

Goal:
Create a mock NIL deal review system to prevent unrealistic NIL deals from breaking sim balance.

Deliver:
- src/domain/nil.ts
- src/sim/finance/nilClearinghouse.ts
- tests/unit/nilClearinghouse.test.ts

Inputs:
- player/recruit profile
- proposed amount
- position
- school market strength
- donor risk
- timing
- comparable market value
- player brand value
- recruit/player status

Outputs:
- marketValueEstimate
- proposedDealAmount
- multiplier
- riskScore
- reviewStatus:
  Approved
  ApprovedWithScrutiny
  DelayedReview
  Flagged
  Denied
- reasons

Hard rules:
- high NIL can be allowed if justified
- absurd NIL should be flagged
- denial is rare and configurable
- flagged deals create friction, not automatic punishment

Acceptance:
- normal deal approved
- slightly high deal approved with scrutiny
- absurd low-profile deal flagged/denied
- tests pass
```

## Prompt: LLM Narrative Service

```text
Implement Local Narrative Service architecture.

Goal:
Prepare LLM integration for scouting/media/play-by-play without making AI required.

Deliver:
- src/services/narrative/NarrativeService.ts
- src/services/narrative/MockNarrativeService.ts
- src/services/narrative/LocalLLMService.ts
- src/services/narrative/ReportPayloadBuilder.ts
- src/services/narrative/NarrativeValidator.ts
- tests

Hard rules:
- simulation facts come from structured payload only
- LLM cannot invent injuries, commitments, stats, money, or violations
- if LLM unavailable, deterministic fallback templates are used
- service interface must be provider-agnostic
- all generated text should be cacheable

Acceptance:
- mock service works
- fallback works
- local service can be configured but not required
- forbidden-claim validation exists
```
