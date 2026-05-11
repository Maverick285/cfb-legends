# Repository Structure Spec

## Top-Level Tree

```text
cfb-fm/
  package.json
  README.md
  PROJECT_STATUS.md
  DECISION_LOG.md
  NEXT_PACKET.md
  ARCHITECTURE.md
  AI_CODING_RULES.md

  src/
    app/
    ui/
    routes/
    components/
    tables/
    profiles/
    domain/
    sim/
    events/
    data/
    services/
    testing/
    utils/

  config/
    rulesets/
    balance/
    schemas/

  assets/
    generated/
    portraits/
    logos/
    uniforms/
    stadiums/

  tests/
    unit/
    integration/
    scenarios/
    invariants/
    ui/

  scripts/
    run_headless_sim.ts
    validate_world.ts
    export_qc_report.ts

  sim_runs/
  qa_reports/
  docs/
```

## Domain Layer

```text
src/domain/
  ids.ts
  rng.ts
  world.ts
  school.ts
  conference.ts
  season.ts
  player.ts
  prospect.ts
  staff.ts
  finance.ts
  facility.ts
  nil.ts
  game.ts
  event.ts
  save.ts
```

## Simulation Layer

```text
src/sim/
  engine.ts
  calendar.ts
  worldGenerator.ts
  teamRatings.ts
  gameSim/
    level1ResultEngine.ts
    boxScore.ts
    playByPlayTypes.ts
  recruiting/
    prospectGenerator.ts
    interestEngine.ts
    scouting.ts
  development/
    developmentTick.ts
    practice.ts
  roster/
    eligibility.ts
    depthChart.ts
    transferRisk.ts
  finance/
    budgetEngine.ts
    nilClearinghouse.ts
  staff/
    staffReports.ts
    responsibilities.ts
```

## Events Layer

```text
src/events/
  eventRegistry.ts
  eventTypes.ts
  eventActions.ts
  inbox.ts
  continueGate.ts
  templates/
```

## Data Layer

```text
src/data/
  db.ts
  migrations/
  saveLoad.ts
  repositories/
  serializers/
```

## UI Layer

```text
src/routes/
  InboxRoute.tsx
  ProgramHomeRoute.tsx
  RosterRoute.tsx
  RecruitingRoute.tsx
  StaffRoute.tsx
  ScheduleRoute.tsx
  FinanceRoute.tsx
  PracticeRoute.tsx
  DataLabRoute.tsx
  SettingsRoute.tsx

src/tables/
  DataTable.tsx
  columnRegistry.ts
  savedViews.ts

src/profiles/
  PlayerProfile.tsx
  ProspectProfile.tsx
  StaffProfile.tsx
  SchoolProfile.tsx
```

## Services Layer

```text
src/services/narrative/
  NarrativeService.ts
  MockNarrativeService.ts
  LocalLLMService.ts
  ReportPayloadBuilder.ts
  PromptTemplates.ts
  NarrativeValidator.ts

src/services/assets/
  AssetService.ts
  MockAssetService.ts
  LocalImageService.ts
  AssetQueue.ts
  PortraitPromptBuilder.ts
```

## Testing Layer

```text
src/testing/
  factories/
  fixtures/
  invariantChecks.ts
  scenarioRunner.ts
  simRunner.ts
  qcExport.ts
```

## Configs

```text
config/rulesets/current_fictional.json
config/rulesets/modern_nil_private.json
config/balance/default.json
config/balance/chaos.json
config/schemas/ruleset.schema.json
```

## Hard Rule

If the AI creates a file outside this structure, it must explain why.
