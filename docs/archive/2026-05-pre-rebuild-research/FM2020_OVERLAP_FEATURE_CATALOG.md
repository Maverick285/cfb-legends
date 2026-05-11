# FM 2020 Overlap Feature Catalog For CGM

Date: 2026-05-06

Purpose: catalog how Football Manager 2020 appears to handle systems that overlap with Campus Gridiron Manager, using local-file inspection as an analogue. This is a reference for architecture and functionality, not a source for copied code, databases, UI, text, or assets.

Reference install:

`C:\Program Files (x86)\Steam\steamapps\common\Football Manager 2020`

## How To Read This

Each section lists:

- CGM feature area
- FM analogue
- observed FM files/resources
- inferred implementation pattern
- CGM implementation target

The word "inferred" matters. We can inspect resource/data structure and derive patterns, but much runtime behavior is inside compiled code.

## 1. Clickthrough, Object Routing, And Menus

### FM Analogue

FM appears to route user interaction through event IDs, event targets, object links, action records, menu records, and shortcut records.

### Observed Files

- `data/game/actions.fmf`
- `data/game/menus.fmf`
- `data/game/shortcuts.fmf`
- `data/game/properties.fmf`
- `data/game/panels.fmf`
- `data/database/resources.fmf`

### Observed Pattern

- Action records include IDs, event IDs, event targets, priorities, line-up indexes, widget types, object-link actions, icons, and separators.
- Menus dispatch event IDs to target contexts such as global/game/screen/browser-like targets.
- Shortcuts map keys/flags to event IDs and targets.
- Object action groups include links to related surfaces: fixtures, news, finance, transfers, staff, information, stats, shortlist, comparison, and context actions.
- Context actions are composed from resource definitions instead of hard-coded per screen.

### CGM Target

Build:

- `object-router`
- `action-registry`
- `menu-registry`
- `shortcut-registry`
- `workspace-route-state`

Every clickable thing should resolve through:

```js
{
  objectType: "player",
  objectId: "player_123",
  parentType: "program",
  parentId: "program_045",
  sourceWorkspace: "roster",
  intent: "open_profile"
}
```

Rules:

- Rows do not mutate screens directly.
- Buttons dispatch action IDs.
- Context actions are filtered by object type, date window, user role, and ruleset.
- Navigation history is first-class: back/forward, selected object, source workspace, active tab.

## 2. Player History And Long-Term Memory

### FM Analogue

FM separates current person data from history data and appears to index history by subject.

### Observed Files

- `data/database/db/*/*_fm/people_db.dat`
- `data/database/db/*/*_fm/basic_people_db.dat`
- `data/database/db/*/*_fm/pl_hist_id.dat`
- `data/database/db/*/*_fm/pl_hist_index.dat`
- `data/database/db/*/*_fm/pl_hist_dt.dat`
- `data/database/db/*/*_fm/non_pl_hist_id.dat`
- `data/database/db/*/*_fm/non_pl_hist_index.dat`
- `data/database/db/*/*_fm/non_pl_hist_dt.dat`
- `data/game/actions.fmf`
- `data/game/properties.fmf`
- `data/game/panels.fmf`
- `data/simatch/events/match_events.xml`

### Observed Pattern

- Live people data and basic people data are separate stores.
- Player history and non-player history are separate stores.
- History is split into ID, index, and data payload files.
- Action resources include retirement-related actions and a keep-data-after-retirement concept.
- Event resources reference former clubs and loan history, which implies relationship history survives after the current team changes.

### CGM Target

Build:

- `history-index`
- `player-history-store`
- `coach-history-store`
- `program-history-store`
- `archived-person-records`

Minimum player history categories:

- program membership
- recruiting origin
- depth chart role
- development focus changes
- game stats
- injuries
- awards
- promises
- NIL deals
- portal status
- transfer/graduation/draft outcome
- notable events

Minimum indexes:

- by subject ID
- by subject type
- by program ID
- by season
- by week
- by event type

Critical rule:

Current player records should not carry all old history inline. Player profile selectors should assemble current state plus indexed history.

## 3. Calendar, Time, And Advance Flow

### FM Analogue

FM treats time as a rule-driven calendar with season boundaries, date records, windows, fixture rules, match days, and scheduled events.

### Observed Files

- `data/comp editor.fmf`
- `data/game/menus.fmf`
- `data/game/properties.fmf`
- `data/game/panels.fmf`

### Observed Pattern

- Competition rule groups include season update day.
- Start/end dates are explicit records.
- Transfer windows are structured start/end windows.
- Fixture rules and match days are structured lists.
- Debug/event menus include week jumps and long-term time jumps.
- Promise warnings and evaluations appear tied to season boundaries.

### CGM Target

Build:

- `calendar-engine`
- `season-phase-registry`
- `advance-week-pipeline`
- `action-window-checker`

Calendar phases:

- offseason
- recruiting setup
- camps
- preseason
- regular season
- rivalry week
- conference championship
- postseason
- signing window
- portal window
- winter development
- spring practice

`advanceWeek` should not be a date increment. It should:

1. validate required decisions
2. determine current phase
3. run phase-specific systems
4. write action/event/history logs
5. update enabled/disabled actions
6. create next Program Desk tasks

## 4. World Simulation And Event Ticks

### FM Analogue

FM exposes debug hooks/resources for batch world simulation, database analysis, newgen generation, retirements, morale/promise evaluation, player-count fixes, and long-term ability updates.

### Observed Files

- `data/game/menus.fmf`
- `data/game/properties.fmf`
- `data/game/hints.fmf`
- `data/simatch/events/match_events.xml`

### Observed Pattern

- World systems can be run/analyzed outside normal UI.
- Player generation and non-player generation are distinct.
- Retirements are a world-level batch process.
- Promise/morale events are scheduled/evaluated.
- Long-term future sim has debug affordances.
- Event tables carry probability and delay-like fields.

### CGM Target

Build:

- `world-tick-runner`
- `system-pipeline`
- `system-metrics`
- `system-invariants`
- `future-soak-harness`

Weekly system pipeline:

```text
preflight invariants
calendar update
games
injuries
development
recruiting
portal
NIL
morale/promises
academics/eligibility
staff carousel
rankings/awards/media
inbox generation
history/archive writes
postflight invariants
```

Each system returns:

- state patch
- event records
- history records
- metrics
- warnings/errors

## 5. Future Stability And Long-Term Drift Control

### FM Analogue

FM has signs of long-term simulation testing and world-health maintenance: database analysis, future ability updates, newgen analysis, player-count repair, retirements, and tendency templates.

### Observed Files

- `data/game/menus.fmf`
- `data/game/properties.fmf`
- `data/database/db/*`

### Observed Pattern

- The game needs tooling to inspect database size and populations.
- Generated people are templated/analyzed.
- Long-term updates can be run in year-scale jumps.
- Population maintenance exists for inactive or underfilled areas.

### CGM Target

Build guardrails early:

- roster min/max by program
- scholarship count bounds
- class-year distribution bounds
- recruit supply by region/position/tier
- staff job coverage
- conference membership validity
- schedule completeness
- ratings distribution bounds
- prestige/NIL/budget bounds
- injury count bounds
- no dangling relationship IDs

Run soak checks:

- 1 season
- 5 seasons
- 10 seasons
- 20 seasons

Store season snapshots for drift comparison.

## 6. Non-Player Transactions, Staff, And Coach Market

### FM Analogue

FM distinguishes players and non-players. Non-player resources include staff actions, staff shortlist, staff comparison, contract offers, national jobs, non-player generation, non-player tendency templates, and non-player history stores.

### Observed Files

- `data/game/actions.fmf`
- `data/game/menus.fmf`
- `data/game/properties.fmf`
- `data/game/panels.fmf`
- `data/database/db/*/*_fm/non_pl_hist_*.dat`

### Observed Pattern

- Non-players are first-class.
- Staff actions are not just player actions with different labels.
- Staff have contracts, shortlists, comparisons, job offers, tendencies, and history.
- Non-player generation and player generation are separate systems.

### CGM Target

Build:

- `coachesById`
- `coachProgramContracts`
- `staffTransactionLog`
- `coachHistory`
- `staffTendencies`
- `staffSearchState`
- `staff-transaction-engine`

Transactions:

- interview
- hire
- fire
- extend
- reject offer
- accept offer
- retire
- leave for another job
- promote/demote role
- assign responsibility
- poach coordinator

Staff effects should feed:

- recruiting
- development
- scheme fit
- morale
- program prestige
- player retention
- inbox/news

## 7. Scouting, Recruiting, Shortlists, And Knowledge

### FM Analogue

FM scouting resources include scout actions, assignment panels, knowledge displays, shortlists, reports, interest, trials, and comparison.

### Observed Files

- `data/game/actions.fmf`
- `data/game/shortcuts.fmf`
- `data/game/properties.fmf`
- `data/game/panels.fmf`
- `data/game/hints.fmf`

### Observed Pattern

- Scouting has assignments and reports.
- Knowledge appears as a tracked concept.
- Shortlists are persistent relationship lists.
- Reports are separate artifacts, not just player attributes.
- Scouting workflows create context actions and table columns.

### CGM Target

Recruiting should not be only a board of visible recruits.

Build:

- `recruitProgramInterest`
- `recruitingAssignments`
- `scoutingReports`
- `programRegionKnowledge`
- `recruitShortlists`
- `visitSchedules`
- `offerRecords`

Recruiting actions:

- add/remove board
- assign recruiter
- request evaluation
- offer scholarship
- schedule visit
- call/contact
- promise role
- compare recruit
- withdraw offer

The board should show both current values and confidence/knowledge level.

## 8. Finance, Budgets, NIL, And Economic Pressure

### FM Analogue

FM has extensive finance/budget/wage/value resources, plus rule/editor concepts for prize/appearance money and owner funding behavior.

### Observed Files

- `data/game/properties.fmf`
- `data/game/panels.fmf`
- `data/game/actions.fmf`
- `data/comp editor.fmf`
- `data/database/db/*/edt/permanent/sugardaddy.edt`

### Observed Pattern

- Financial data has dedicated panels, labels, columns, and histories.
- Budgets and wages are separate concerns.
- Competitions can define money outputs.
- Ownership/funding behavior can be configured as a rule/overlay.

### CGM Target

Build NIL/economics as a ledger, not loose numbers:

- `programFinancials`
- `nilCollectives`
- `boosterInfluence`
- `nilDeals`
- `budgetLedger`
- `facilityInvestmentLedger`
- `coachSalaryLedger`
- `scholarshipAllocation`

Every money-like change writes a transaction:

- source
- destination
- amount
- category
- week
- season
- linked object
- visibility

## 9. Media, News, Inbox, And Narrative Events

### FM Analogue

FM separates event definitions, report text variants, media/news links, hints, press-related debug/resources, and event probabilities.

### Observed Files

- `data/simatch/events/match_events.xml`
- `data/game/actions.fmf`
- `data/game/menus.fmf`
- `data/game/properties.fmf`
- `data/game/hints.fmf`

### Observed Pattern

- Events are data records.
- Events can have different presentation channels.
- Reports/news are tied to source events.
- Media is connected to object routes and action surfaces.

### CGM Target

Build:

- `eventDefinitions`
- `newsItems`
- `inboxItems`
- `mediaEvents`
- `narrativeTemplates`
- `visibilityRules`

Rules:

- Systems emit events.
- Event definitions decide whether those become inbox, news, scrapbook, radio/voice, or hidden logs.
- UI does not invent one-off prose without a backing event.

## 10. Roster, Squad, Training, Development, And Roles

### FM Analogue

FM resources include squad actions, lineup/substitution concepts, training schedules, rest schedules, positions, comparison, contract info, and player status columns.

### Observed Files

- `data/game/actions.fmf`
- `data/game/properties.fmf`
- `data/game/panels.fmf`
- `data/game/hints.fmf`
- `data/simatch/events/match_events.xml`

### Observed Pattern

- Squad/player actions are context menus.
- Training/rest are actions and schedules, not just text.
- Position and comparison are reusable table/property concepts.
- Match event/stats systems reference positions/substitutions separately from roster UI.

### CGM Target

Build:

- `depthChartAssignments`
- `playerDevelopmentPlans`
- `practicePlans`
- `restStatus`
- `positionTraining`
- `playerComparisonModel`
- `availabilityStatus`

Roster actions:

- set depth chart role
- set development focus
- set redshirt plan
- rest/limit player
- change position training
- compare player
- open player history

## 11. Conferences, Scheduling, Postseason, And Realignment

### FM Analogue

FM competition-editor resources are rule groups with parent/child competitions, league/cup groupings, fixtures, rounds, date windows, sorting rules, team counts, upper/lower division links, and prize settings.

### Observed Files

- `data/comp editor.fmf`
- `data/game/versus comps/*.xml`
- `data/game/properties.fmf`
- `data/game/panels.fmf`

### Observed Pattern

- Competitions are structured, hierarchical rule groups.
- Parent/child competition links exist.
- Team counts and required teams are rule data.
- Rounds, fixture rules, match days, sorting rules, and dates are data.
- Promotion/relegation is represented as rule data in FM; our equivalent is postseason qualification/realignment.

### CGM Target

Build:

- `conferenceRules`
- `conferenceMemberships`
- `scheduleRules`
- `postseasonRules`
- `rankingRules`
- `realignmentRules`
- `rivalryRules`

Do not hard-code schedule logic into schedule screens.

## 12. Save/Database Versioning And Overlays

### FM Analogue

FM has multiple database versions and smaller overlay folders/files beside large base stores.

### Observed Files

- `data/database/db/2000`
- `data/database/db/2001`
- `data/database/db/2010`
- `data/database/db/2030`
- `data/database/db/2040`
- `data/database/db/*/*.xml`
- `data/database/db/*/dbc`
- `data/database/db/*/edt`
- `data/database/db/*/lnc`

### Observed Pattern

- Base database versions are separate.
- Database metadata has version/description/author-like manifest data.
- Overlays modify or supplement base data.
- Some overlays are binary/packed; some are text/config-like.

### CGM Target

Build:

- `saveSchemaVersion`
- `rulesetVersion`
- `worldSeed`
- `baseWorldVersion`
- `patches`
- `migrations`
- `generatedState`
- `userState`

Separate:

- static definitions
- generated world
- user save state
- patch/migration records
- UI preferences

## 13. Editor Change Records And Patch Files

### FM26 Analogue

The FM26 Pre-Game Editor exports readable XML change records and `.fmf` editor-data overlays. A small exported rules file shows a `db_changes` list where each record targets a database table type, unique entity ID, property ID, typed new value, version, random/change ID, original/default value, and client/language-field flags.

### Observed Files

- `C:/Users/joshu/OneDrive/Documents/Sports Interactive/Football Manager 26/editor data/XML Rules.xml`
- `C:/Users/joshu/OneDrive/Documents/Sports Interactive/Football Manager 26/editor data/Added BLB.fmf`
- `C:/Users/joshu/OneDrive/Documents/Sports Interactive/Football Manager 26/editor data/League & Data Updates.fmf`
- `C:/Users/joshu/Downloads/sortitoutsi.net FM26 Data Update - 2026-05-06 03-30-05.zip`
- `docs/FM26_EDITOR_REFERENCE_NOTES.md`

### Observed Pattern

- Editor output is a patch list, not a full cloned database.
- Patches are table/entity/property changes.
- Values are typed.
- Export metadata includes database/rules versions.
- Display/language fields are identifiable.
- Modular overlays can separate league structure, contracts, and new people.

### CGM Target

Build:

- `change-record` schema
- `patch-loader`
- `patch-validator`
- `editor-export-import`
- `database-change-log`

CGM patches should target table/entity/property and carry old/new values, value type, source, schema version, world version, and ruleset version.

## Immediate Work Queue Derived From FM Overlap

1. Create `object-router` and `action-registry`.
2. Create `history-index` and archive model.
3. Create `calendar-engine` and `advance-week-pipeline`.
4. Create `world-tick-runner` with pre/post invariants.
5. Create `staff-transaction-engine`.
6. Create resource schemas for actions, columns, workspaces, menus, shortcuts, event definitions, and rulesets.
7. Rebuild Program Desk, Roster, Player Profile, and Recruiting on those contracts.
8. Add editor/patch import-export using FM26-style change records.
9. Add subsystem-owned migration registry, informed by the decompressed `.fm` save patch-manager list.
10. Split history, transaction, and UI table-view stores into separate modules.
