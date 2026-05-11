# FM26 Editor Reference Notes

Date: 2026-05-06

Purpose: capture architecture and functionality lessons from the locally installed/open Football Manager 26 Pre-Game Editor and recent FM26 data files. This is a reference for our own implementation. Do not copy FM content, assets, UI, databases, or proprietary implementation.

## Sources Inspected

FM26 Editor cache:

`C:\Users\joshu\AppData\Local\Packages\SportsInteractive.FootballManager26PreGameEditor_5w3tn6tb6stnm\LocalCache\Local\Sports Interactive\Editor 26`

FM26 editor exports:

`C:\Users\joshu\OneDrive\Documents\Sports Interactive\Football Manager 26\editor data`

Recent downloads:

- `sortitoutsi.net FM26 Data Update - 2026-05-06 03-30-05.zip`
- `CTRL26_1-5_WIN.zip`
- `Football Manager 26 Pre-Game Editor Installer.exe`

## Important Files Found

Editor exports:

- `XML Rules.xml`
- `League & Data Updates.fmf`
- `Added BLB.fmf`
- `Untitled.xml`
- `last_saved_rules.tmp`

Downloaded FM26 data update:

- `sortitoutsi.net FM26 Data Update - England Lower League Pyramid.fmf`
- `sortitoutsi.net FM26 Data Update - Contracts.fmf`
- `sortitoutsi.net FM26 Data Update - New People.fmf`

Downloaded FM26 UI bundles:

- `ui-panelids-uxml_assets_all.bundle`
- `ui-tableviews_assets_all.bundle`
- `ui-widgets_assets_all.bundle`
- `ui-tileslayouts_assets_all.bundle`
- `ui-styles_assets_default.bundle`
- other Unity bundle files

## FM26 Editor Export Model

The readable `XML Rules.xml` export is the clearest exact model so far.

Top-level structure:

```text
record
  list verf
  list db_changes
  integer version
  integer rule_group_version
  boolean beta
  string orvs
  string svvs
```

Each database change record contains:

- `database_table_type`
- `db_unique_id`
- `property`
- typed `new_value`
- `version`
- `db_random_id`
- optional `odvl` original/default value
- `is_client_field`
- optional `is_language_field`

Example structural shape:

```text
record
  integer database_table_type
  large db_unique_id
  unsigned property
  typed new_value
  integer version
  integer db_random_id
  optional original value
  boolean is_client_field
  optional boolean is_language_field
```

### CGM Lesson

This is exactly the kind of patch model we need.

For Campus Gridiron Manager, database edits, save migrations, generated-world patches, and user customizations should be represented as explicit change records:

```js
{
  changeId: "chg_001",
  schemaVersion: 1,
  table: "programs",
  entityId: "program_045",
  property: "shortName",
  oldValue: "Texas",
  newValue: "Texas State",
  valueType: "string",
  source: "user_editor",
  season: 2026,
  createdAt: "2026-05-06T00:00:00.000Z"
}
```

Rules:

- Patches are appendable and inspectable.
- Patches target table/entity/property, not raw UI state.
- Patches carry old/new values where possible.
- Patches declare schema/ruleset version.
- Language/display fields are distinguishable from simulation fields.

## FM26 Editor Versioning

The editor preference and export files show explicit database/version identifiers:

- database folder/version references such as `2600` and `2620`
- editor export fields `orvs` and `svvs`
- `version`
- `rule_group_version`
- database location preference pointing to a versioned FM26 database folder

### CGM Lesson

CGM needs separate version IDs for:

- app version
- save schema version
- base world version
- ruleset version
- editor/customization version
- generated world seed/version

Do not use one generic `version` field for everything.

## FM26 Editor Channels

The FM26 Editor cache contains 65 channel preference files. These are mostly logging/debug channel settings, but their names reveal the major editor subsystems.

High-value channels for our overlap:

- `database_changes`
- `dbcache debug output`
- `comp errors`
- `comp start dates`
- `comp_start_and_end_dates`
- `competition stage rules`
- `comp_events`
- `comp_xml`
- `disc_rules`
- `edt errors`
- `fixture_rules`
- `home grown player due dates`
- `home grown players`
- `league history errors`
- `league scheduling`
- `MATCH_TIMING_CHANNEL`
- `MEMORY_CHANNEL`
- `nation work permit active`
- `PERSISTENT_USER_DATA_LOG`
- `RECOMMENDED_RULE_GROUPS_LOG`
- `savegame xml changes`
- `SCREEN_CLIENT_TIMING`
- `THREAD_ACTION_CHANNEL`
- `transfer_windows`
- `translation usage`
- `warnings-and-errors`
- `xml_parser`

### CGM Lesson

FM26’s editor/debug organization reinforces that each hard subsystem needs its own log channel or observability surface.

CGM should have named debug/validation channels:

- `database_changes`
- `save_migrations`
- `ruleset_changes`
- `calendar`
- `schedule_generation`
- `postseason_rules`
- `conference_rules`
- `recruiting_calendar`
- `transfer_portal_windows`
- `eligibility`
- `roster_limits`
- `staff_transactions`
- `world_tick`
- `long_term_soak`
- `warnings_errors`
- `ui_navigation`
- `table_views`

## FM26 Table/View Persistence

The editor preferences include:

- `table_settings.xml`
- `views-v2-general.xml`
- many `views-v2-view-*.xml` files

Observed table/view state structure includes:

- database table type
- field ID
- current view
- sort state
- columns
- collapsed state
- encoded/numeric path IDs

### CGM Lesson

FM26 persists table state separately from the world. CGM should do the same.

Persist UI preferences separately:

- active workspace
- active tab
- selected object ref
- table sort
- filters
- column visibility/order
- collapsed sections
- saved views
- zoom/density

Do not mix these into simulation state.

## FM26 UI Bundle Model

The `CTRL26_1-5_WIN.zip` download contains Unity asset bundles. The sampled bundles reveal:

- `UnityFS`
- `VisualTreeAsset`
- `StyleSheet`
- UXML namespace/element metadata
- `StreamedTableView`
- column metadata
- tile layouts
- widgets
- styles
- panel IDs

### CGM Lesson

FM26 appears to lean heavily on declarative UI assets:

- visual tree assets
- stylesheets
- table-view definitions
- widgets
- tile layouts
- panel IDs

CGM web implementation should mirror the architecture, not the technology:

- workspace definitions
- table definitions
- column definitions
- inspector definitions
- route/object definitions
- style tokens
- saved view definitions

Screens should be thin renderers over these resources.

## FM26 Editor Data Update Files

The recent sortitoutsi data update contains three modular editor-data overlays:

- lower league pyramid
- contracts
- new people

The `.fmf` files use a newer `afe` format, not the same simple zlib-readable FM2020 resource format.

### CGM Lesson

The modular split matters:

- structure/rules overlay
- contract/transaction overlay
- people/entity overlay

CGM should allow patches to be split by concern:

- `world_structure_patch`
- `people_patch`
- `contract_patch`
- `rules_patch`
- `schedule_patch`
- `name_text_patch`
- `financial_patch`

## Direct Architecture Changes For CGM

Add or prioritize:

1. `change-record` schema
2. `patch-loader`
3. `patch-validator`
4. `ruleset-version` registry
5. `database-change-log`
6. `table-view-state` persistence
7. `debug-channel-registry`
8. `editor-export-import` format
9. `workspace/table resource definitions`

## Proposed CGM Change Record

```js
{
  id: "change_000001",
  source: "editor",
  sourceFile: "custom_program_patch.json",
  schemaVersion: 1,
  baseWorldVersion: "2026.0",
  rulesetVersion: "cfb_default_1",
  table: "programs",
  entityId: "program_blb",
  property: "displayName",
  oldValue: null,
  newValue: "Baller League Ballers",
  valueType: "string",
  isDisplayField: true,
  isSimulationField: false,
  createdAt: "2026-05-06T00:00:00.000Z"
}
```

## Proposed CGM Debug Channel Record

```js
{
  id: "fixture_rules",
  enabled: true,
  level: "debug",
  storeText: true,
  storeImmediate: true,
  showContext: false,
  recordStack: false
}
```

## Proposed CGM Table View State

```js
{
  workspaceId: "roster",
  tableId: "roster_players",
  currentViewId: "default",
  sort: [{ columnId: "overall", direction: "desc" }],
  columns: ["name", "pos", "year", "overall", "dev", "status"],
  filters: [{ field: "status", op: "not", value: "graduated" }],
  collapsedGroups: [],
  selectedObjectRef: { type: "player", id: "player_123" }
}
```

## What This Adds Beyond FM2020 Notes

FM2020 showed the mature game structure: base databases, overlays, resources, rules, histories, events.

FM26 Editor shows a more exact editor/change model:

- database patches are explicit records
- each patch targets a table, entity, and property
- values are typed
- original/default values can be retained
- version/ruleset metadata travels with exports
- editor debug channels are subsystem-specific
- table/view preferences are persisted independently
- UI resources are declarative Unity assets

This should become the pattern for our own editor/customization/save architecture.

## Related Download/Save Analysis

See `docs/FM_DOWNLOADS_SAVE_AND_PACK_REFERENCE.md` for analysis of:

- `ULTIMATE25SEASONSTART1.fm`
- `CTRL26_1-5_WIN.zip`
- `sortitoutsi.net FM26 Data Update - 2026-05-06 03-30-05.zip`

That note adds concrete save-file lessons around subsystem-owned migrations, history stores, transaction stores, and UI resource bundles.
