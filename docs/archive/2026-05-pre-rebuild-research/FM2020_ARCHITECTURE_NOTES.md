# FM 2020 Architecture Reference Notes

Date: 2026-05-06

Purpose: capture high-level architecture lessons from the local Football Manager 2020 install for lawful reference and analogy. These notes are about system shape, data organization, and product architecture. They are not a source for copied code, assets, databases, skins, text, or proprietary implementations.

## Scope Inspected

Local reference path:

`C:\Program Files (x86)\Steam\steamapps\common\Football Manager 2020`

Observed file categories:

- Packed resource archives: `.fmf`
- World database stores: `.dat`
- Database patch/config overlays: `.dbc`, `.edt`, `.lnc`, `.ddt`
- Readable XML/JSON configuration: match events, tactic styles, physics constraints, competition configs
- Facegen/model resources
- Runtime binaries

## Key Structural Findings

### Base Database Plus Overlays

The install keeps multiple database versions under `data/database/db`, with large binary world stores and smaller patch-like folders beside them.

Observed database-store names include:

- `people_db.dat`
- `basic_people_db.dat`
- `client_db.dat`
- `server_db.dat`
- `lang_db.dat`
- `summary.dat`
- `pl_hist_id.dat`
- `pl_hist_index.dat`
- `pl_hist_dt.dat`
- `non_pl_hist_id.dat`
- `non_pl_hist_index.dat`
- `non_pl_hist_dt.dat`

Observed overlay folders include:

- `dbc`
- `edt`
- `lnc`

Lesson for our game: do not make one giant mutable save blob do every job. Use a base world, deterministic generated state, patch/override layers, and derived save state.

### History Is Split From Current State

Player history appears to be separated into ID, index, and data stores. That is the important pattern, not the binary format.

Lesson for our game: keep high-volume historical records separate from live entity records. Use stable IDs and append/read models for history so player pages, program history, awards, and records can be loaded without rewriting the full world.

### Resource Definitions Are Data-Driven

Several `.fmf` archives contain compressed XML-like records after a small header. The exposed categories include actions, menus, properties, panels, shortcuts, hints, and competition-editor settings.

Lesson for our game: UI and action behavior should not be buried inside one procedural app file. We need resource definitions for:

- actions
- columns/properties
- screen routes
- menu/sidebar entries
- keyboard shortcuts
- event definitions
- reusable workspace panels

Additional inspection shows these archives often contain many compressed resource records, not one monolithic resource. The important pattern is a resource manager that can scan/cache/preload typed records and hand them to the UI/runtime by ID.

Observed resource vocabulary:

- action groups with action IDs, event IDs, widget types, icons, priorities, line-up ordering, separators, and target object links
- menu definitions with event IDs and event targets
- shortcut definitions mapping key/flags to event IDs and event targets
- column-property tables with short stable column IDs, widths, names, hints, formatting, and event hooks
- panel resources made from widgets, layout attachments, attachment groups, draw order, session-state flags, and embedded object widgets

Lesson for our game: every major UI workspace should be backed by explicit resource definitions rather than bespoke markup. A Roster view, Recruiting board, Program Desk inbox, and Player Profile should all be able to say: these are my columns, these are my actions, this is my selected-object inspector, and this is how state is remembered.

### Event Tables Are Authoring Data

The match event file is a large XML record table with event IDs, numeric parameters, report/replay flags, probabilities, and translation references.

Lesson for our game: recruiting, news, injuries, discipline, morale, NIL, portal, coaching-carousel, and rivalry events should be authorable data records consumed by an event engine, not hand-written screen copy.

### Rules Are Versioned Config

Physics/tactics/config files include version-gated constraints and style definitions.

Lesson for our game: rules should be versioned and profile-driven. A save should know which rules version produced it, and migrations should be explicit.

### Competitions Are Rule Groups

The competition editor resource contains typed rule-group records. Observed field categories include:

- nation
- competition
- parent competition
- child competitions
- league competitions
- cup competitions
- secondary league competitions
- required teams
- minimum and maximum team counts
- season update day
- start/end dates
- match days
- transfer windows
- fixture rules
- match rules
- substitution rules
- sort rules
- rounds
- promotion/relegation places
- upper/lower division links
- prize/appearance money

Lesson for our game: college football structure should not be hard-coded into schedule screens. Conferences, divisions, independents, bowls, playoff formats, rivalry weeks, transfer windows, roster limits, redshirt/eligibility windows, and recruiting calendars should be rule groups. A save should point to a ruleset version, not rely on scattered constants.

### UI Panels Are Declarative Layout Trees

Panel resources are built from widgets and layout attachments. Observed widget/layout categories include tables, labels, buttons, object/person/club widgets, graph widgets, finance widgets, picture widgets, sticky-to-side attachments, vertical/horizontal arrange attachments, grid layout, autosize groups, and state-save flags.

Lesson for our game: the UI can still be custom and web-native, but it should use declarative workspace descriptions where possible:

- stable screen ID
- selected object type
- route parameters
- tab definitions
- column definitions
- action definitions
- inspector blocks
- persisted view state

This is how we avoid another monolithic screen file.

## Architecture Implications For Campus Gridiron Manager

The current project should not proceed as a pure UI re-wrap. The next rebuild should put a small domain/resource layer under the screens.

Recommended layers:

1. `world`
   Canonical entities keyed by stable IDs.

2. `definitions`
   Static definitions for positions, archetypes, actions, screens, columns, rules, events, and generated content templates.

3. `relations`
   Join tables for program membership, depth chart slots, recruiting interest, scholarships, NIL deals, staff contracts, rivalries, conference membership, and player relationships.

4. `history`
   Append-only or indexable event/history records, separate from live entity state.

5. `actions`
   Validated commands that mutate world state and write action/event logs.

6. `selectors`
   Derived read models for UI screens.

7. `ui`
   Thin workspace screens that render selectors and call actions.

8. `resources`
   Declarative screen, column, action, shortcut, menu, and layout resources. These should be loaded by ID and validated in tests.

9. `rulesets`
   Versioned season/conference/recruiting/roster/postseason/calendar rules. Saves should store the active ruleset version.

## Proposed Project Tables

Core entities:

- `programs`
- `players`
- `coaches`
- `recruits`
- `conferences`
- `games`
- `seasons`
- `weeks`
- `facilities`
- `injuries`
- `awards`
- `media_items`
- `transactions`

Relationship tables:

- `player_program_memberships`
- `coach_program_contracts`
- `recruit_program_interest`
- `player_relationships`
- `coach_relationships`
- `program_rivalries`
- `conference_memberships`
- `depth_chart_assignments`
- `scholarship_allocations`
- `nil_deals`
- `transfer_portal_entries`
- `visit_schedules`

History/event tables:

- `event_log`
- `action_log`
- `player_history`
- `program_history`
- `season_snapshots`
- `weekly_snapshots`
- `news_items`
- `decision_records`

Definition tables:

- `positions`
- `archetypes`
- `play_styles`
- `scheme_fits`
- `recruiting_regions`
- `eligibility_rules`
- `progression_rules`
- `injury_rules`
- `competition_rules`
- `ranking_rules`
- `event_definitions`
- `action_definitions`
- `screen_definitions`
- `column_definitions`

Resource/rules tables:

- `workspace_definitions`
- `tab_definitions`
- `inspector_block_definitions`
- `shortcut_definitions`
- `menu_definitions`
- `rulesets`
- `calendar_rules`
- `conference_rules`
- `postseason_rules`
- `roster_rules`
- `eligibility_windows`
- `transfer_windows`
- `recruiting_calendar_rules`

## Rebuild Guidance

Use the existing project as a parts library, not as the permanent app shell.

Keep or salvage:

- deterministic sim modules that already have tests
- save/action/event-log concepts
- data generation that can feed canonical entities
- DataGrid ideas if they remain thin and reusable

Quarantine or replace:

- monolithic app orchestration
- screen-owned fake data
- text-only UI states that do not call real actions
- legacy card/table markup patterns used as primary app structure

Next practical sequence:

1. Define the canonical M1/M2 world schema.
2. Define the resource schemas for actions, columns, workspace tabs, shortcuts, inspectors, and rulesets.
3. Build selectors/actions for Program Desk, Roster, Player Profile, and Recruiting.
4. Rebuild those screens as thin consumers of selectors/actions/resources.
5. Verify every screen through state-changing smoke tests.
6. Only then expand into presentation/immersion packs.

## Direct Mappings To Our Game

FM pattern: `people_db`, `basic_people_db`, player/non-player history stores.  
CGM mapping: split live player/coach records from player history, coach history, ratings snapshots, awards, injuries, recruiting history, and portal history.

FM pattern: `actions.fmf` action records.  
CGM mapping: action definitions such as `offer_scholarship`, `schedule_visit`, `set_depth_chart_role`, `set_dev_focus`, `promise_playing_time`, `withdraw_offer`, `contact_recruit`, `resolve_inbox_item`.

FM pattern: `properties.fmf` column-property tables.  
CGM mapping: reusable columns for roster, recruiting board, depth chart, portal, staff, schedule, finances, program history, award lists, and inbox.

FM pattern: `match_events.xml`.  
CGM mapping: event definitions for recruiting updates, NIL pressure, injuries, morale changes, staff movement, compliance issues, rivalry stories, player development, and transfer decisions.

FM pattern: competition rule groups.  
CGM mapping: conference membership, scheduling rules, division rules, playoff/bowl rules, transfer portal windows, recruiting calendar, scholarship/roster limits, eligibility, redshirt behavior, and postseason qualification.

FM pattern: panel resources with saved session/default state.  
CGM mapping: workspace view state, selected rows, active tabs, saved filters, column visibility, sort order, and inspector pinning.

## Subsystem Notes From Further Inspection

### Clickthrough And Navigation

FM resources show a strong event/target pattern. Menus, shortcuts, and actions carry event IDs and event targets. Object links and workspace links are action records, not one-off DOM clicks.

Observed patterns:

- action records can point to object links
- menu items dispatch event IDs to targets such as global/screen/browser contexts
- shortcuts map key/flag combinations to event IDs and targets
- object action menus contain links to fixtures, news, finance, transfers, staff, information, stats, shortlist, comparison, and debug surfaces
- action groups have priorities and line-up indexes, which implies the UI can compose context menus consistently across object types

CGM implication:

- Every clickable row/object should route through a typed navigation/action registry.
- Use stable object refs: `{ type: "player", id: "p_123" }`, `{ type: "program", id: "program_texas" }`.
- Context menus should be generated from action definitions filtered by selected object, role, game date, and ruleset.
- Browser smoke tests should prove every top-level screen has a click path back to the selected object and its parent context.

### Player History

FM separates current person data from history stores. The player history files are split into ID, index, and data payloads. There are separate player and non-player history stores.

Observed patterns:

- `pl_hist_id.dat`
- `pl_hist_index.dat`
- `pl_hist_dt.dat`
- `non_pl_hist_id.dat`
- `non_pl_hist_index.dat`
- `non_pl_hist_dt.dat`
- actions include keeping data about a person when they retire
- match events reference former clubs and loan history

CGM implication:

- Player profiles need a current record plus indexed history streams.
- History should include team membership, depth chart status, stats, awards, injuries, development changes, recruiting origin, transfer events, NIL events, promises, suspensions, and notable game events.
- Retired/graduated/transferred players should retain a compact archive record instead of disappearing or staying fully live forever.
- Former-team and former-recruiting-context stories require relationship history, not just current team ID.

### Calendar And Time

Competition editor resources include explicit season update days, start/end dates, match days, transfer windows, fixture rules, and date records. Debug menus include training advance by weeks and multi-year ability-update jumps.

Observed patterns:

- season update day as a first-class date rule
- start/end dates per competition/rule group
- transfer windows as start/end date records
- fixture rules as structured lists
- match days as structured records
- debug advance by 1 week, 2 weeks, 1 year, 2 years, 5 years, 10 years, 20 years
- promise warning/evaluation events tied to season boundaries

CGM implication:

- Build a real calendar engine before expanding screens.
- Calendar should have phases: offseason, recruiting contact, camps, preseason, regular season, rivalry week, conference championships, bowls/playoff, signing windows, portal windows, training/development windows.
- `advanceWeek` should be a scheduler tick that runs phase-specific systems, not a generic date increment.
- Calendar selectors should explain why an action is enabled/disabled: outside window, roster full, visit week unavailable, dead period, season ended, etc.

### World Simulation And Event Ticks

FM exposes debug hooks for database analysis, newgen players, newgen non-players, in-active nation player count fixes, retirements, morale/promise evaluation, training advance, and long-term ability updates.

Observed patterns:

- systems can be run/analyzed independent of UI
- new player and non-player generation are separate concerns
- retirements are a batch world event
- promise warnings/evaluations are scheduled events
- world health checks exist for population counts and database size
- event records carry probability and delay fields

CGM implication:

- World sim should be a pipeline of named systems with budgets and invariants.
- Each week should run deterministic ticks: games, injuries, development, recruiting interest, portal movement, staff carousel, NIL pressure, morale, academics/eligibility, inbox/news generation.
- Long-term sim should run maintenance passes: create recruits, graduate players, archive old entities, hire/fire staff, normalize rosters, fill empty teams, rebalance pipelines.
- Every system should emit metrics so we can catch runaway values before the save becomes nonsense.

### Keeping Future Sims From Getting Wild

FM has signs of explicit future-sim tooling: ability-update jumps across many years, database analysis, newgen analysis, inactive-nation player-count fixes, retirements, and tendency templates.

CGM implication:

- Future stability is a product feature, not a balancing afterthought.
- Add invariant checks for population, roster sizes, scholarship counts, eligibility classes, recruit supply, staff jobs, budgets/NIL pools, conference membership, schedule completeness, and rating distributions.
- Use bounded distributions and caps for ratings, development, NIL, prestige, morale, injuries, and recruiting interest.
- Use archetype templates for generated players/coaches instead of unconstrained random creation.
- Run soak tests at 1, 5, 10, and 20 season intervals.
- Save long-term snapshots so drift can be compared by season.

### Non-Player Transactions

FM distinguishes player and non-player data/history, and resources mention non-player generation, non-player tendency templates, non-player analysis, staff shortlist actions, staff comparison, contract offers, national jobs, and staff links.

CGM implication:

- Coaches/staff should not be bolted onto players. They need their own entity type, history, contracts, tendencies, roles, job market, and transaction log.
- Non-player transactions should include hire, fire, retire, extend contract, reject offer, interview, promote assistant, poach coordinator, change role, and leave for rival.
- Staff transactions should write to program history, coach history, inbox/news, and recruiting/development effects.
- A staff-carousel system should run independently of the user UI, then expose consequences through Program Desk.

## Practical Architecture Additions For CGM

Add these engines/modules before broad feature expansion:

- `calendar-engine`
- `world-tick-runner`
- `system-invariants`
- `history-index`
- `object-router`
- `action-registry`
- `staff-transaction-engine`
- `generation-templates`
- `future-soak-harness`

Each should be plain and testable before becoming fancy.
