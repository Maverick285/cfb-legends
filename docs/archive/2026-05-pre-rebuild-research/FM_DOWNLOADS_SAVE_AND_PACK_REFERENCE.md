# FM Downloads Save And Pack Reference

Date: 2026-05-07

Purpose: capture architecture and data-shape findings from the two recent FM zip files and the `.fm` save file in Downloads. This is reference material for Campus Gridiron Manager architecture. Do not copy FM content, databases, strings, assets, or implementation.

## Files Inspected

Downloads:

- `C:\Users\joshu\Downloads\ULTIMATE25SEASONSTART1.fm`
- `C:\Users\joshu\Downloads\CTRL26_1-5_WIN.zip`
- `C:\Users\joshu\Downloads\sortitoutsi.net FM26 Data Update - 2026-05-06 03-30-05.zip`

## 1. `ULTIMATE25SEASONSTART1.fm`

### Container Findings

The `.fm` file is an FMF container:

- file size: `239,868,130` bytes
- header starts with `fmf.`
- compressed payload begins at offset `26`
- payload begins with zstd-style magic bytes
- streaming decompression produced a `1,025,944,293` byte temporary binary
- decompressed header starts with `tad.`
- exposed save/game version string: `24.3.0+0`
- decompressed file contains many `tad.` section markers

### Important Save-File Pattern

The decompressed save begins with a list of migration/patch manager identifiers. This is a major architecture clue: the save carries or applies named migration/repair patches by subsystem.

Observed manager/patch areas:

- rule groups
- contracts
- player stats
- feeder club links
- finance/facility upgrades
- human non-player/youth recruitment
- manager principles
- interactions/promises
- squad planner
- club vision
- tactics/style conversion
- set piece responsibilities
- news/inbox cleanup
- press conferences
- regeneration/new staff generation
- person-name normalization
- retirements
- scouting focus/search cleanup
- training/mentoring/set-piece prep
- transfer data and loan fees
- dynamics/pivotal moments
- player buy-in
- person progression/late bloomers

### Save Schema Tokens Found

High-value table/store names surfaced from decompressed save strings:

- `PERSON_HISTORY`
- `PERSON_HISTORY_CAREER_ENTRY`
- `PLAYING_HISTORY`
- `NON_PLAYING_HISTORY`
- `PLAYER_STATS_HISTORY`
- `INJURY_HISTORY`
- `PERSON_YEAR_AWARD_HISTORY`
- `COMP_HISTORY`
- `COMP_HISTORY_RECORD`
- `TC_CUP_HISTORY`
- `TC_LEAGUE_HISTORY`
- `STARTING_PERSON_HISTORY`
- `STARTING_TEAM_CUP_HISTORY`
- `STARTING_TEAM_LEAGUE_HISTORY`
- `PRESS_CONFERENCE_HISTORY`
- `INTERACTION_CONVERSATION_HISTORY`
- `INTERACTION_PROMISE`
- `FULL_CONTRACT`
- `CONTRACT_OFFER`
- `LOAN_CONTRACT`
- `TRIAL_CONTRACT`
- `FAILED_CONTRACT_NEGOTIATION_INFO`
- `FULL_TRANSFER_OFFER`
- `PAST_TRANSFER`
- `STARTING_FUTURE_TRANSFER`
- `STARTING_PAST_TRANSFER`
- `TRANSFER_WINDOW`
- `TRANSFER_DEADLINE_DAY`
- `TRANSFER_CONFIDENCE`
- `SCOUTED_PERSON`
- `SCOUTED_PERSON_TAG`
- `SCOUTED_TEAM_INFO`
- `NON_PLAYER_ATTRIBUTE_SNAPSHOT`
- `NON_PLAYER_TENDENCY_ARRAY`
- `ACTUAL_NON_PLAYER`
- `ACTUAL_PLAYER`
- `ACTUAL_PLAYER_AND_NON_PLAYER`
- `RETIRED_PERSON_NAME_STRINGS`
- `RETIRED_PERSON_NAME_POINTERS`
- `INDIVIDUAL_TRAINING_INFO`
- `TACTICAL_TRAINING_DATA`
- `POSITION_TRAINING`
- `TRAINING_CAMP`
- `TRAINING_SESSION`
- `FIXTURE_RECORD`
- `FIXTURE_RESULT`
- `FIXTURE_RULES`
- `FIXTURE_TO_PLAY_FULL`
- `FIXTURE_TO_PLAY_QUICK`
- `TEAM_FUTURE_FIXTURE`
- `TEAM_FIXTURE_BLOCK`
- `COMP_SCHEDULE_DATE`
- `SQUAD_SELECTION_RULES`
- `SQUAD_SELECTION_RULES_CHANGES`
- `PLAYERS_ALLOWED_TO_BE_REGISTERED_INFO`
- `LONG_TERM_INJURED_PLAYERS_THAT_CAN_BE_REPLACED_IN_SQUAD_INFO`
- `MAX_TRANSFERS_IN_A_TRANSFER_WINDOW_INFO`
- `MAX_TRANSFERS_IN_A_SEASON_USING_SQUAD_SELECTION_RULE_INFO`
- `STAFFING_POLICY`
- `TEAM_STAFFING_POLICY`
- `STARTING_SUPPORT_STAFF`
- `CLUB_STAFF_JOB_STATUS_INFO`
- `CLUB_FINANCE`
- `CLUB_OTHER_INCOME`
- `BASE_FINANCE_RECORD`
- `FINANCE_TOTALS`
- `MEDIA_CLUB`
- `NEWS_MANAGER`
- `PRESS_CONFERENCE_QUESTION`
- `PRESS_CONFERENCE_ANSWERED_QUESTION`
- `PRESS_CONFERENCE_QUESTION_TEMPLATE`
- `PRESS_CONFERENCE_ALTERNATIVE_ANSWER_TEMPLATE`
- `PLAYER_ATTRIBUTE_SNAPSHOT`
- `PLAYER_PROGRESS_OBSERVATION`
- `PLAYER_HAPPINESS`
- `PLAYER_CONFIDENCE`
- `PLAYER_FORM`
- `PLAYER_INJURY`
- `PLAYER_BUY_BACK_INFO`
- `MANAGER_RECORDS`
- `MANAGER_COMP_STATS`
- `HOF_MANAGER_RECORD`

### CGM Lessons From The Save

The save confirms several architecture choices:

1. **Migrations are subsystem-owned.**
   We need named patch/migration functions grouped by system, not one generic save upgrader.

2. **History is first-class.**
   Playing history, non-playing history, injury history, stats history, award history, competition history, and conversation history are separate concepts.

3. **Contracts and transactions are object stores.**
   Full contracts, offers, loans, trials, failed negotiations, past transfers, future transfers, deadline-day records, and transfer confidence are separate data records.

4. **Non-players are first-class.**
   Non-player attributes, tendencies, contracts, snapshots, retired names, support staff, staffing policies, and job status all deserve their own CGM tables.

5. **Training/development is structured.**
   Individual training, tactical training, position training, training camps, and sessions are separate records.

6. **Scheduling is not just fixtures.**
   The save distinguishes fixture records, fixture rules, quick/full playable fixtures, future fixtures, fixture blocks, and schedule dates.

7. **Rules produce registration/eligibility records.**
   Squad selection rules and replacement rules are structured data. For CGM, scholarship, roster, redshirt, injury replacement, portal, and eligibility rules should be data-driven.

8. **Media/interactions have history.**
   Press conference history, interaction promises, conversation history, news cleanup, and media clubs point toward durable narrative/event records.

## 2. `sortitoutsi.net FM26 Data Update - 2026-05-06 03-30-05.zip`

### Zip Contents

This zip contains three FM26 editor-data overlays:

- `Football Manager 26/editor data/sortitoutsi.net FM26 Data Update - England Lower League Pyramid.fmf`
- `Football Manager 26/editor data/sortitoutsi.net FM26 Data Update - Contracts.fmf`
- `Football Manager 26/editor data/sortitoutsi.net FM26 Data Update - New People.fmf`

### Format Findings

- all three are `.fmf`
- internal format starts with `afe.`
- simple zlib XML extraction did not expose records
- two files include a short readable marker: `Decomp by Raytwo sortitoutsi.net`

### CGM Lessons

The split is more important than the exact format:

- league/pyramid structure updates are a separate overlay
- contract updates are a separate overlay
- new people are a separate overlay

CGM should support patch packs by concern:

- `world_structure_patch`
- `people_patch`
- `contract_patch`
- `rules_patch`
- `schedule_patch`
- `history_patch`
- `financial_patch`
- `display_text_patch`

## 3. `CTRL26_1-5_WIN.zip`

### Zip Contents

This zip contains 18 Unity bundle files:

- UI backgrounds
- UI fonts
- icon sprite atlases at multiple resolutions
- main menu assets
- match assets
- panel IDs / UXML assets
- default styles
- table views
- tactics
- textures
- tile layouts
- tiles
- widgets

### UI Bundle Findings

Sampled bundles expose Unity UI resource architecture:

- `UnityFS`
- `VisualTreeAsset`
- `StyleSheet`
- UXML namespace/element metadata
- `StreamedTableView`
- table column metadata
- tile layout metadata
- widgets
- panel IDs
- styles and classes

### CGM Lessons

FM26’s UI asset pack reinforces that the UI is resource-driven.

For CGM:

- table views should be declarative resources
- panels/workspaces should have stable IDs
- styles should be tokenized and reusable
- widgets should be reusable components
- tile/card layouts should be definitions, not one-off markup
- table columns should be metadata-driven
- saved table views should persist separately from simulation state

## Direct CGM Architecture Additions

Add these design requirements:

### Migration Registry

```js
{
  id: "transfer_patch_old_save_games_unwanted_loan_fees",
  subsystem: "transfer",
  fromSchema: 4,
  toSchema: 5,
  appliesWhen: ["save_schema_lt_5"],
  touches: ["transferOffers", "loanContracts", "transactionHistory"]
}
```

### History Stores

Separate stores:

- `playerPlayingHistory`
- `playerStatsHistory`
- `injuryHistory`
- `awardHistory`
- `programHistory`
- `coachHistory`
- `interactionHistory`
- `conversationHistory`
- `pressHistory`
- `transactionHistory`

### Transaction Stores

Separate records:

- `contracts`
- `contractOffers`
- `loanAgreements`
- `trialAgreements`
- `pastTransfers`
- `futureTransfers`
- `portalEntries`
- `failedNegotiations`
- `nilDeals`
- `staffContracts`

### UI Resource Stores

Separate resources:

- `workspaceDefinitions`
- `panelDefinitions`
- `tableViewDefinitions`
- `columnDefinitions`
- `widgetDefinitions`
- `styleTokens`
- `savedViewState`

### Patch Packs

Patch pack structure:

```js
{
  id: "2026_custom_world_patch",
  baseWorldVersion: "2026.0",
  rulesetVersion: "cfb_default_1",
  patches: {
    worldStructure: [],
    people: [],
    contracts: [],
    schedules: [],
    rules: [],
    displayText: []
  }
}
```

## Practical Next Steps

1. Add a CGM migration registry before any further broad save changes.
2. Build history stores as separate modules, not nested player fields.
3. Split transactions into contracts/offers/portal/NIL/staff records.
4. Create declarative UI resources for table views and panels.
5. Define patch pack format by concern, modeled after the FM editor-data overlay pattern.

## Follow-Up Deep Scan

A repeatable local scanner now lives at `scripts/fm_save_deep_scan.js` and can be run with:

```bash
npm run fm:save-scan
```

The first deep scan wrote:

- `docs/FM_SAVE_DEEP_SCAN_REPORT.md`
- `docs/FM_SAVE_PASS2_BUILD_IMPLICATIONS.md`
- `docs/FM_SAVE_PASS3_CGM_GAP_AUDIT.md`
- `docs/FM_SAVE_PASS4_DOMAIN_SPINE_IMPLEMENTATION_PLAN.md`
- `tmp/fm-save-scan/fm_save_deep_scan.json`

Additional findings from that pass:

- the decompressed save contains `1,271` `tad.` section markers
- the scanner classified four very large packed record blocks totaling roughly `840.6 MB`
- hundreds of smaller sections appear to be sparse or dense binary record tables
- the early save region carries readable schema/object-pool metadata, including the high-value subsystem/store names already cataloged above
- the largest later regions are mostly packed records, not readable labels, so deeper reverse-reference work should focus on section shape, record sizing, offsets, and co-occurrence rather than plain string extraction
- the second pass converts observed save-store boundaries into CGM coding candidates: calendar queues, history stores, transaction stores, scouting/snapshot stores, interaction/promise stores, and a phased world tick runner
- the third pass compares those FM-derived boundaries against current CGM modules and concludes the project has useful engines, but needs a canonical domain spine and one functional vertical slice before another broad UI pass
- the fourth pass converts that conclusion into a file-by-file domain-spine implementation plan centered on a recruit -> scout/contact/offer -> visit -> advance week vertical slice
