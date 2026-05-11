# Campus Gridiron Manager Domain/Resource Architecture

Date: 2026-05-06

Purpose: define the architecture direction for the rebuild after studying Football Manager 2020 as a systems analogue. This is our own design. It borrows product-architecture lessons, not proprietary content or implementation.

## Core Principle

Screens must not own game truth.

The UI should render derived read models and dispatch validated actions. Durable state belongs to the world model, relationship tables, history/event stores, definitions, and rulesets.

Target flow:

```text
world state
  -> definitions/resources/rulesets
  -> selectors/read models
  -> workspace UI
  -> actions/commands
  -> reducers/mutations
  -> action log + event log + history
  -> persistence
```

## Layer Responsibilities

### `world`

Canonical save state. Everything has a stable ID.

Examples:

- `programsById`
- `playersById`
- `coachesById`
- `recruitsById`
- `conferencesById`
- `gamesById`
- `seasonsById`
- `weeksById`

Rules:

- No screen-only entity copies.
- No entity references by display name.
- No action should mutate derived UI rows directly.

### `relations`

Join tables and relationship records.

Examples:

- `playerProgramMemberships`
- `coachProgramContracts`
- `recruitProgramInterest`
- `depthChartAssignments`
- `scholarshipAllocations`
- `nilDeals`
- `transferPortalEntries`
- `visitSchedules`
- `programRivalries`
- `conferenceMemberships`

Rules:

- Relationships get their own IDs when they have lifecycle, dates, status, or history.
- Many-to-many data does not live as nested ad hoc arrays on both sides.
- Derived selectors can denormalize for UI display.

### `history`

Append-friendly records and snapshots.

Examples:

- `playerHistory`
- `coachHistory`
- `programHistory`
- `seasonSnapshots`
- `weeklySnapshots`
- `awardHistory`
- `injuryHistory`
- `recruitingHistory`

Rules:

- Live player data should not carry every old season stat inline.
- History entries should be queryable by subject ID, season, week, and event type.
- Player/profile pages should load from selectors over history, not one giant nested profile object.

### `definitions`

Static game vocabulary.

Examples:

- `positions`
- `positionGroups`
- `archetypes`
- `skills`
- `traits`
- `schemeFits`
- `regions`
- `facilities`
- `awardTypes`
- `injuryTypes`
- `eventTypes`

Rules:

- Definitions are versioned.
- Definitions do not mutate during a save, except through explicit migration.

### `resources`

Declarative UI/action metadata.

Examples:

- `workspaceDefinitions`
- `tabDefinitions`
- `columnDefinitions`
- `actionDefinitions`
- `menuDefinitions`
- `shortcutDefinitions`
- `inspectorBlockDefinitions`

Rules:

- Screens load columns/actions/tabs by ID.
- Actions define required subject type, enabled conditions, labels, consequences, and reducer command.
- Columns define value selector, formatting, sort behavior, and empty state.

### `rulesets`

Versioned simulation and calendar rules.

Examples:

- `calendarRules`
- `conferenceRules`
- `postseasonRules`
- `recruitingCalendarRules`
- `transferWindowRules`
- `rosterRules`
- `scholarshipRules`
- `eligibilityRules`
- `redshirtRules`
- `nilRules`
- `progressionRules`
- `injuryRules`

Rules:

- A save stores its active ruleset version.
- Rule changes require migration or explicit compatibility behavior.
- Screens read rule-derived status from selectors, not scattered constants.

### `selectors`

Read models for screens.

Examples:

- `getProgramDeskModel(world, programId, weekId)`
- `getRosterWorkspaceModel(world, programId, seasonId)`
- `getPlayerProfileModel(world, playerId, programId)`
- `getRecruitingBoardModel(world, programId, cycleId)`
- `getRecruitProfileModel(world, recruitId, programId)`
- `getDepthChartModel(world, programId, weekId)`

Rules:

- Selectors are pure.
- Selectors may denormalize but must not mutate.
- Selectors are tested independently from the UI.

### `actions`

Validated commands.

Examples:

- `setDepthChartAssignment`
- `setDevelopmentFocus`
- `offerScholarship`
- `withdrawScholarship`
- `scheduleVisit`
- `contactRecruit`
- `promiseRole`
- `resolveInboxDecision`
- `advanceWeek`

Rules:

- Every action has a definition and reducer.
- Every action writes to `actionLog`.
- Significant consequences write to `eventLog` and/or history.
- UI buttons do not directly mutate state.

## First Vertical Slice Contract

The first rebuild should prove this flow:

```text
Main Menu
  -> Start Career
  -> Program Desk
  -> Roster
  -> Player Profile
  -> Recruiting
  -> Continue Week
```

Minimum functional requirements:

- Program selection creates canonical world/save state.
- Program Desk shows real week, tasks, blockers, inbox items, and continue state.
- Roster loads from `playersById` plus `playerProgramMemberships`.
- Clicking a player selects `playerId` and loads a real Player Profile selector.
- Roster actions mutate state through action definitions/reducers.
- Recruiting board loads from `recruitsById` plus `recruitProgramInterest`.
- Recruiting actions mutate relationship records.
- Continue Week runs actions/systems, writes logs, and updates screen selectors.
- Save/load roundtrip preserves IDs, relations, action log, event log, and selected screen state.

## Resource Examples

These are illustrative schemas for our game, not FM-derived content.

### Action Definition

```js
{
  id: "set_development_focus",
  subjectType: "player",
  workspaceIds: ["roster", "player_profile"],
  command: "SET_PLAYER_DEVELOPMENT_FOCUS",
  enabledWhen: ["player_is_on_user_program", "season_is_active"],
  writes: ["playersById", "playerHistory", "actionLog"],
  consequences: ["development_focus_changed"]
}
```

### Column Definition

```js
{
  id: "player_overall",
  entityType: "player",
  label: "OVR",
  value: "ratings.overall",
  format: "integer",
  sortable: true,
  align: "right"
}
```

### Workspace Definition

```js
{
  id: "roster",
  objectType: "program",
  tabs: ["overview", "depth_chart", "development", "eligibility"],
  primaryTable: "roster_players",
  actions: ["set_depth_chart_assignment", "set_development_focus", "open_player_profile"],
  inspector: "player_summary_inspector",
  persists: ["activeTab", "sort", "filters", "selectedPlayerId"]
}
```

### Event Definition

```js
{
  id: "recruit_interest_shift",
  category: "recruiting",
  subjectTypes: ["recruit", "program"],
  trigger: "weekly_recruiting_tick",
  probabilityModel: "weighted_interest_delta",
  writes: ["recruitProgramInterest", "eventLog", "recruitingHistory"],
  visibleIn: ["program_desk", "recruit_profile", "news"]
}
```

## Test Requirements

Every rebuilt screen needs four test levels:

1. Selector test
   Given world state, the screen read model is correct.

2. Action test
   Given a command, the reducer mutates expected tables and writes logs.

3. Persistence test
   Save/load preserves world, relations, history, ruleset version, and UI state.

4. Browser smoke test
   Clicks select objects, actions become enabled/disabled correctly, inspector updates, and visible state changes.

## Anti-Patterns To Quarantine

- Screen-owned fake objects
- Display-name references instead of stable IDs
- One-off click handlers that mutate UI text only
- Duplicated nested copies of relationships
- Actions without logs
- Events embedded as hard-coded prose in screen renderers
- Rules scattered as constants inside UI files
- Large screens that directly know every system detail

## Immediate Next Build Step

Before another broad UI pass, create these modules:

- `js/domain/schema.js`
- `js/domain/world-factory.js`
- `js/domain/selectors/program-desk.js`
- `js/domain/selectors/roster.js`
- `js/domain/selectors/player-profile.js`
- `js/domain/actions/roster-actions.js`
- `js/domain/actions/recruiting-actions.js`
- `js/domain/resources/action-definitions.js`
- `js/domain/resources/column-definitions.js`
- `js/domain/resources/workspace-definitions.js`
- `js/domain/rulesets/default-ruleset.js`
- `js/domain/navigation/object-router.js`
- `js/domain/calendar/calendar-engine.js`
- `js/domain/history/history-index.js`
- `js/domain/world/world-tick-runner.js`
- `js/domain/world/system-invariants.js`
- `js/domain/staff/staff-transaction-engine.js`
- `js/domain/generation/generation-templates.js`

Then rebuild Program Desk, Roster, Player Profile, and Recruiting as consumers of those modules.

## Additional Required Contracts

### Object Router

All clickthrough should resolve stable object references:

```js
{
  objectType: "player",
  objectId: "player_123",
  parentType: "program",
  parentId: "program_045",
  sourceWorkspace: "roster"
}
```

The router decides the destination workspace, selected object, available tabs, breadcrumbs, and context actions.

### History Index

History should be queryable without loading every historical record into every live entity.

Minimum indexes:

- by subject ID
- by subject type
- by season
- by week
- by event type
- by program ID

### Calendar Engine

The calendar is not just dates. It is the scheduler for systems and action availability.

Minimum outputs:

- current phase
- current week
- enabled recruiting windows
- enabled portal windows
- practice/development state
- game week state
- postseason state
- required decision gates
- systems to run on advance

### World Tick Runner

`advanceWeek` should run a declared system pipeline:

```text
preflight invariants
  -> calendar phase update
  -> games
  -> injuries
  -> development
  -> recruiting
  -> transfer portal
  -> NIL
  -> morale/promises
  -> staff carousel
  -> awards/rankings/media
  -> inbox generation
  -> archive/history writes
  -> postflight invariants
```

Each system returns:

- state patch
- action/event/history records
- metrics
- warnings/errors

### Long-Term Stability

Future sim needs guardrails from the start.

Minimum invariants:

- roster min/max by program
- scholarship count bounds
- class-year distribution bounds
- recruit pool size by region/position/tier
- staff job coverage
- conference membership validity
- schedule completeness
- rating distribution bounds
- prestige/NIL/budget bounds
- injury count bounds
- no dangling relationship IDs

### Staff/Non-Player Transactions

Staff are first-class non-player entities.

Required records:

- `coachesById`
- `coachProgramContracts`
- `staffTransactionLog`
- `coachHistory`
- `staffTendencies`
- `staffSearchState`

Required actions:

- interview
- offer contract
- accept/reject contract
- hire
- fire
- extend
- retire
- leave for another job
- promote/demote role
- assign recruiting/development responsibility
