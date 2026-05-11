# 49 — Test Harness, Scenario, Balance, and AI QC Spec

## North Star

This game cannot be manually tested.

The test harness must catch:

- impossible states
- shallow systems
- broken saves
- unrealistic stats
- recruiting imbalance
- NIL exploits
- AI school failures
- UI regressions
- long-run drift

## Test Layers

1. Unit tests
2. Integration tests
3. Scenario tests
4. Invariant tests
5. Headless sim runs
6. Statistical validation
7. Replay tests
8. UI automation
9. AI QC review package

## Invariant Suite

Must check:

- no duplicate IDs
- no player on two rosters
- no invalid eligibility
- no invalid schedule
- no team plays itself
- no duplicate games
- no recruit signs twice
- no invalid NIL deal
- no unresolved hard blocker after Continue
- no box score reconciliation errors
- no save/load state drift
- no invalid conference membership
- no orphaned assets

## Scenario Harness

Scenario file:

```ts
type Scenario = {
  id: string;
  description: string;
  seed: string;
  setup(world: GameWorld): GameWorld;
  actions: ScenarioAction[];
  expected: ScenarioExpectation[];
};
```

Required scenarios:

- QB injury depth chart
- NIL deal flagged
- top recruit rival push
- player transfer risk
- redshirt limit warning
- staff poached
- practice extreme fatigue
- custom conference schedule
- pep talk backfires
- late bloomer rises
- penalty nullifies touchdown
- play-by-play box score reconciliation
- AI school misses QB cycle
- booster restricted gift
- coach change portal wave

## Headless Runner

Commands:

```bash
npm run sim -- --seed 123 --seasons 1
npm run sim -- --seed 123 --seasons 5
npm run sim -- --seed 123 --seasons 20
npm run scenario -- --id nil_deal_flagged
npm run validate -- --run sim_runs/seed_123
```

## Sim Run Output

```text
sim_runs/{runId}/
  summary.json
  schools.csv
  players.csv
  prospects.csv
  games.csv
  plays.csv
  stats.csv
  recruiting.csv
  transfers.csv
  nil.csv
  draft.csv
  awards.csv
  events.csv
  anomalies.json
  validation_report.md
  ai_qc_packet.md
```

## Statistical Validation

Validate:

- recruiting star counts
- prospect development rates
- elite player counts
- game stats
- play outcome rates
- NIL deal ranges
- transfer volume
- draft distribution
- school dominance
- AI school roster health
- awards distribution

## Balance Presets

Allow:

- realistic
- chaos
- low NIL
- high NIL
- development heavy
- portal chaos
- old-school
- custom

Each preset should be validated separately.

## AI QC Packet

Export concise package for AI reviewer:

- run summary
- anomalies
- top statistical outliers
- school dominance
- player leaderboards
- recruiting distribution
- draft distribution
- NIL distribution
- transfer distribution
- event repetition
- sample narratives

## AI QC Prompt

```text
You are QA director for a college football management sim.

Review the attached run.

Find:
- impossible states
- unrealistic distributions
- broken incentives
- shallow systems
- AI school failures
- exploits
- repetitive events
- missing consequences

For each issue:
1. severity
2. evidence
3. likely cause
4. proposed fix
5. regression test
```

## Replay

Replay requirements:

- replay from save
- replay game
- replay week
- compare state hash
- inspect action log
- inspect event log

## UI Automation

Use Playwright.

Smoke flows:

- start career
- open Program Desk
- resolve blocker
- open roster
- sort/filter table
- open player profile
- open recruiting board
- offer recruit
- set practice plan
- simulate game
- view box score
- save/load

## Test Acceptance

A system is not accepted unless:

- unit tests cover formulas
- integration tests cover state changes
- save/load tests cover stateful objects
- scenario test exists for important edge case
- invariants updated
- headless validation available if simulation-relevant

## Release Gates

Alpha:

- one-season headless sim passes
- core invariants pass
- save/load passes
- no reconciliation errors

Beta:

- 20-season sim passes
- AI schools stable
- stat distributions plausible
- recruiting distributions plausible
- draft distribution plausible
- NIL market plausible
- UI smoke tests pass

## Acceptance Criteria

Testing system is acceptable when:

- headless sim exists
- scenarios exist
- invariants exist
- validation reports exist
- AI QC packet exports
- replay scaffold exists
- UI smoke tests exist
- every fixed bug gets regression test
