# Ready-To-Paste AI Prompts — Stats Engine

## STAT-1 Prompt

```text
Implement STAT-1 — Stat Taxonomy Registry for the CFB-FM project.

Goal:
Define the stat registry used by the stats engine.

Context:
The game is a Tauri + React + TypeScript + SQLite college football management sim. Structured PlayEvents are the truth. Text play-by-play is presentation only.

Deliver:
- src/domain/stats/statDefinitions.ts
- src/domain/stats/statTypes.ts
- tests/unit/statDefinitions.test.ts

Every stat definition must include:
- id
- displayName
- owner type
- category
- classification: official_style | internal | derived
- source event types
- aggregation type
- display format
- description

Include team, player, defense, special teams, advanced/internal, and derived stat definitions.

Hard rules:
- no UI code
- no mock gameplay data
- unique stat IDs
- official-style stats separated from internal stats
- derived stats do not become raw truth

Acceptance:
- test validates unique IDs
- test validates required fields
- test validates no duplicate display-critical IDs
- PROJECT_STATUS.md updated
- NEXT_PACKET.md points to STAT-2
```

## STAT-2 Prompt

```text
Implement STAT-2 — PlayEvent and GameBook Schema.

Goal:
Create the structured play event model that will feed the stats engine.

Deliver:
- src/domain/stats/playEvent.ts
- src/domain/stats/gameBook.ts
- src/domain/stats/drive.ts
- validation helpers
- tests/unit/playEvent.test.ts
- tests/unit/gameBook.test.ts

PlayEvent must include:
- gameId
- driveId
- playNumber
- period
- clockBefore/clockAfter
- possessionTeamId
- defenseTeamId
- down/distance
- yardsToGoal
- playType
- chargedPlayType
- yardsGained
- firstDown
- scoring result
- turnover result
- penalty result
- participants
- statEligibility
- reasonCodes

Hard rules:
- no text parsing
- invalid down rejected
- possession and defense cannot be same
- invalid yardsToGoal rejected
- serializable
- deterministic-friendly

Acceptance:
- tests pass
- invalid events fail
- valid sample events serialize/deserialize
- PROJECT_STATUS.md updated
```

## STAT-3 Prompt

```text
Implement STAT-3 — StatDelta and Basic Accumulator.

Goal:
Convert basic PlayEvents into StatDeltas and Team/Player GameStats.

Implement:
- completed pass
- incomplete pass
- interception
- rush
- rushing touchdown
- passing touchdown
- sack as college-style rushing loss
- kneel down as rush with internal kneel flag

Deliver:
- src/sim/stats/statDelta.ts
- src/sim/stats/statAccumulator.ts
- src/sim/stats/creditRules/passCredit.ts
- src/sim/stats/creditRules/rushCredit.ts
- tests/unit/statAccumulator.basic.test.ts

Hard rules:
- no Math.random
- no text parsing
- no UI code
- sack should not count as pass attempt
- sack should create negative rushing yards under college-style rules
- completed pass credits passer, receiver, team passing, team total yards

Acceptance:
- completed pass test passes
- incomplete pass test passes
- rushing test passes
- sack test passes
- passing TD test passes
- rushing TD test passes
```

## STAT-5 Prompt

```text
Implement STAT-5 — Penalty Credit and Nullification.

Goal:
Make penalties explicit and prevent penalty yards or nullified play yards from corrupting offensive stats.

Implement:
- no-play penalty
- live-ball penalty
- dead-ball penalty
- declined penalty
- offsetting penalty
- automatic first down
- loss of down

Deliver:
- src/sim/stats/creditRules/penaltyCredit.ts
- tests/unit/penaltyCredit.test.ts

Hard rules:
- penalty yards are never total offense
- nullified play stats do not count
- live-ball penalty may preserve play stats
- declined penalties preserve play stats but do not add accepted penalty yards
- first down by penalty must be separate from rushing/passing first down

Acceptance:
- false start test
- defensive pass interference test
- holding nullifies TD test
- declined penalty test
- offsetting penalties test
```

## STAT-7 Prompt

```text
Implement STAT-7 — Box Score Reconciler.

Goal:
Validate that every finalized game has internally consistent stats.

Deliver:
- src/sim/stats/reconciler.ts
- tests/unit/reconciler.test.ts

Required checks:
- score equals scoring plays
- total yards equals passing + rushing
- team passing attempts equal player passing attempts
- team completions equal player completions
- team passing yards equal player passing yards
- team rushing yards equals player rushing yards plus explicit team rushing
- first downs total equals rushing + passing + penalty
- turnovers equal interceptions thrown + fumbles lost
- return yards not counted as total offense
- penalty yards not counted as total offense
- special teams yards not counted as total offense

Acceptance:
- valid game passes
- invalid total yards fails
- invalid score fails
- invalid first downs fails
- error messages identify likely cause
```

## STAT-12 Prompt

```text
Implement STAT-12 — Play Generator Integration.

Goal:
Wire the existing game simulator so box scores are produced from structured PlayEvents, not invented after the score.

Rules:
- Keep current sim if needed, but it must output structured PlayEvents.
- StatAccumulator must create the box score.
- Play-by-play text must read PlayEvent data.
- No text parsing.
- No fake stat totals.

Deliver:
- integration between game sim and PlayEvent model
- box score generated from StatAccumulator
- tests/integration/gameStatsIntegration.test.ts

Acceptance:
- simulated game produces PlayEvents
- PlayEvents produce box score
- box score reconciles
- scoring plays equal final score
- save/load preserves game stats
```
