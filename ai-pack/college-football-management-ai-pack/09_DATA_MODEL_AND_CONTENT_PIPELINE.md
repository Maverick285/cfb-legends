# 09_DATA_MODEL_AND_CONTENT_PIPELINE

> Use this file as an instruction set for the AI working on the project.

**Read after:** 08_SYSTEM_ARCHITECTURE.md
**Primary outputs required:**
- A canonical data model for the simulation core, save layer, and content packs
- A fictional-content pipeline that can generate a full playable world without licensed assets
- Validation rules that prevent impossible states and fragile save files
**Stop when:**
- The AI can explain the difference between content data, generated world state, and save-state data
- Every major screen and simulation system has a known source of truth
- The project can load a fictional world, persist it, migrate it, and validate it before gameplay starts

## Data model thesis

This project will succeed or fail on data discipline.

A menus-first management sim is really a machine for:
- storing state
- changing state
- comparing state over time
- presenting state in useful ways

If the model is vague, the UI will lie, the simulation will drift, saves will become brittle, and balancing will turn into guesswork.

The correct mindset is:

> **The data model is the game. The UI is how the player touches it. The simulation is how it evolves.**

## Three kinds of data

Treat these as different classes of information with different lifecycles.

### 1. Authorable content data
This is static or slowly changing source material kept under version control.

Examples:
- fictional schools
- fictional conferences
- city/region profiles
- names databases
- archetypes
- facility templates
- rulesets
- schedule templates
- UI labels
- generated-text templates

Characteristics:
- human-editable
- schema-validated
- pack/version identified
- safe to diff in source control

### 2. Generated world data
This is deterministic output produced when a new career starts.

Examples:
- generated rosters
- generated staff pools
- prospect classes
- school-specific objectives
- preseason rankings
- donor personalities
- injury baselines
- media expectations

Characteristics:
- derived from content + seed + ruleset
- reproducible from the same inputs
- belongs to a specific career

### 3. Save-state data
This is the living career state that changes as the player acts and time advances.

Examples:
- commitments
- transfers
- injuries
- morale changes
- results
- rankings
- finances
- facility upgrades
- historical records

Characteristics:
- mutable through commands and simulation events
- must survive migrations
- must be snapshot-safe and reloadable

## Non-negotiable modeling rules

### 1. One canonical source of truth per fact
Do not store the same fact in multiple authoritative places.

Bad:
- player redshirt state in player record and roster slot and save metadata

Good:
- player references a single `eligibility_record`
- UI derives redshirt badges from that record

### 2. Season-aware everything
College-football structure changes. Conference alignment changes. Rules change. Postseason logic changes.

Therefore:
- conference membership is season-aware
- objective sets are season-aware
- rulesets are season-aware
- postseason format is season-aware
- history views are snapshot-aware

### 3. Derived fields should be derivable
If a value can be reliably derived, do not persist it unless there is a performance reason.

Examples that should usually be derived:
- depth chart shortages
- class balance by position
- total benefit allocation remaining
- current ranking trend
- roster eligibility warnings

Examples that may be persisted for performance or history:
- weekly analytics aggregates
- ranking snapshots by date
- news items already generated
- archived selection committee resumes

### 4. Rules-sensitive state must be explicit
Do not hide important sports logic inside generic booleans.

Bad:
- `is_eligible: true`

Better:
- `eligibility_record.seasons_played`
- `eligibility_record.games_played_this_season`
- `eligibility_record.redshirt_preserved`
- `eligibility_record.academic_term_status`
- `eligibility_record.transfer_exception_used`

### 5. IDs must be stable and opaque
Every entity must have:
- a stable unique ID
- no dependence on display name
- no dependence on database row order
- compatibility with migrations and content-pack updates

Recommended format:
- content entities: `school_iron_plains`
- generated/save entities: UUID or deterministic seeded IDs

### 6. Human-readable slugs are helpers, not truth
Use slugs for tooling and debugging, not as the only key.

### 7. Never hardcode volatile rules into UI components
The UI should ask the rules layer:
- whether a player can redshirt
- whether the portal is open
- what postseason format applies
- what roster limit applies
- whether a benefit allocation is valid

## Cross-cutting metadata every entity class should consider

Not every field belongs on every entity, but these ideas should be standardized:

- `id`
- `schema_version`
- `source_pack_id`
- `created_from_seed`
- `created_at_phase`
- `valid_from_season`
- `valid_to_season`
- `tags`
- `notes_internal`

## Recommended storage split

### Content pack storage
Use JSON or YAML plus schema validation for:
- rulesets
- fictional school definitions
- conferences
- facility templates
- name pools
- geography
- schedule templates
- generated text templates
- archetypes and tuning defaults

### Career save storage
Use SQLite or an equivalent embedded database for:
- current world state
- history tables
- event logs
- snapshots
- migrations

### Cache / view-model storage
Optional, disposable, and rebuildable.

Use only for:
- search indexes
- denormalized analytics views
- large sortable tables
- expensive comparison snapshots

## Recommended content directory layout

```text
/content
  /packs
    /core-fictional
      pack.json
      /schools
      /conferences
      /facilities
      /names
      /archetypes
      /generated_text
      /schedules
      /rulesets
  /schemas
  /validation
  /examples

/careers
  /saves
  /snapshots
  /exports
```

## Content pack design rules

Each content pack must declare:
- pack ID
- version
- compatibility range
- author
- description
- dependency list
- license notes
- whether it is fictional, licensed, or internal test data

Each content pack should be able to answer:
- What world objects does this pack define?
- What rulesets does it expect?
- What other packs must load first?
- What will break if this pack is missing?

## Fictional world generation pipeline

Use a deterministic pipeline when creating a new career.

### Step 1: Load packs and rules
- load base fictional pack
- load optional flavor packs
- validate pack compatibility
- load chosen ruleset
- lock RNG seed

### Step 2: Instantiate the institutional world
- create schools
- assign conferences for the selected season
- create facilities
- load donor and fan profiles
- assign budget baselines
- attach objectives

### Step 3: Create the human world
- generate or load coaches and staff pools
- generate current rosters
- generate recruit classes
- generate transfer candidate pools
- assign academic and personality traits

### Step 4: Build competition structures
- create season calendar
- generate schedule
- seed preseason rankings
- attach postseason format
- precompute rivalry/storyline metadata

### Step 5: Run validation
- every school has a valid conference context
- roster counts fit active ruleset
- every player has eligibility and academic records
- schedule has no impossible duplicates
- postseason structure is internally valid

### Step 6: Write initial save snapshot
- commit clean initial state
- store seed, pack versions, and ruleset version
- create migration anchor

## Canonical entity catalog

### `school`

**Purpose:** Institution/program container.

**Required fields:**
- `id`
- `slug`
- `display_name`
- `short_name`
- `state_region`
- `market_size`
- `prestige`
- `fan_base`
- `donor_base`
- `conference_id`
- `facility_ids`
- `brand_profile`
- `academic_profile`
- `colors_theme`
- `historical_tiers`

**Relations:**
- has many staff
- has many players
- belongs to one conference per season
- has budgets, facilities, objectives, history

**Implementation note:** Keep real-world brand assets out of the prototype content pack.

### `conference`

**Purpose:** Competition grouping and rules context.

**Required fields:**
- `id`
- `name`
- `short_name`
- `subdivision`
- `team_ids_by_season`
- `championship_rule_set_id`
- `schedule_template_id`
- `protected_opponents`
- `revenue_profile`

**Relations:**
- has many schools
- feeds postseason rules

**Implementation note:** Conference alignment must be season-aware, not global.

### `season`

**Purpose:** Global timebox for one competition year.

**Required fields:**
- `id`
- `year_label`
- `ruleset_id`
- `calendar_id`
- `phase`
- `week_index`
- `day_index`
- `selection_snapshots`
- `championship_outcomes`

**Relations:**
- contains many weeks, games, events, rankings

**Implementation note:** Drive all simulation from explicit season state, not system clock.

### `coach`

**Purpose:** User or AI program leader.

**Required fields:**
- `id`
- `name`
- `career_profile`
- `archetype`
- `ratings`
- `philosophy`
- `contract`
- `reputation`
- `career_history`
- `preferences`

**Relations:**
- belongs to school
- oversees staff responsibilities

**Implementation note:** Differentiate head coach, coordinator, and future career paths via role metadata.

### `staff_member`

**Purpose:** All non-player football ops roles.

**Required fields:**
- `id`
- `name`
- `role`
- `ratings`
- `scheme_fit`
- `network_regions`
- `salary`
- `contract`
- `personality`
- `task_load`
- `delegation_scope`

**Relations:**
- belongs to school
- can be assigned to prospects, players, or tasks

**Implementation note:** Support GM/personnel roles as first-class staff types.

### `player`

**Purpose:** Rostered athlete.

**Required fields:**
- `id`
- `name`
- `position`
- `class_year`
- `age`
- `ratings`
- `traits`
- `personality`
- `school_id`
- `eligibility_record_id`
- `academic_record_id`
- `injury_state_id`
- `morale_state_id`
- `contractual_state_id`
- `history`

**Relations:**
- belongs to school
- has eligibility/academic/injury records
- participates in games

**Implementation note:** Separate current value from future potential and confidence.

### `prospect`

**Purpose:** Unsigned high-school/prep/JUCO target.

**Required fields:**
- `id`
- `name`
- `origin_profile`
- `position`
- `ratings_band`
- `personality`
- `academic_profile`
- `interest_model`
- `visit_history`
- `dealbreakers`
- `commitment_state`

**Relations:**
- linked to many schools via recruiting_status

**Implementation note:** Prospect data should include uncertainty until scouted.

### `transfer_entry`

**Purpose:** Portal item for incoming/outgoing transfer activity.

**Required fields:**
- `id`
- `player_id`
- `entry_date`
- `entry_reason`
- `allowed_contact_window`
- `eligibility_remaining`
- `academic_transfer_state`
- `benefit_expectations`
- `recruitment_status`

**Relations:**
- references player
- visible to many schools

**Implementation note:** Portal logic must be ruleset-aware.

### `eligibility_record`

**Purpose:** Track seasons used, clock, and special statuses.

**Required fields:**
- `id`
- `player_id`
- `clock_start`
- `clock_end`
- `seasons_used`
- `games_played_this_season`
- `redshirt_status`
- `waiver_flags`
- `graduation_status`

**Relations:**
- belongs to player

**Implementation note:** Never derive this ad hoc from game logs only; persist authoritative state.

### `academic_record`

**Purpose:** Track academic standing and progress.

**Required fields:**
- `id`
- `player_id`
- `term_hours`
- `annual_hours`
- `gpa`
- `ptd_percent`
- `full_time_status`
- `warning_flags`
- `support_plan`

**Relations:**
- belongs to player

**Implementation note:** Use school-configurable thresholds mapped through ruleset requirements.

### `injury_state`

**Purpose:** Current medical availability and recovery model.

**Required fields:**
- `id`
- `player_id`
- `status`
- `severity`
- `expected_return`
- `practice_limit`
- `medical_redshirt_flags`
- `history`

**Relations:**
- belongs to player

**Implementation note:** Keep diagnosis detail broad unless you need deeper medical gameplay.

### `morale_state`

**Purpose:** Retention, chemistry, and satisfaction data.

**Required fields:**
- `id`
- `player_id`
- `locker_room_state`
- `playing_time_satisfaction`
- `development_satisfaction`
- `brand_exposure_satisfaction`
- `benefit_satisfaction`
- `transfer_risk`

**Relations:**
- belongs to player

**Implementation note:** Use morale as consequence output, not arbitrary randomness.

### `benefit_agreement`

**Purpose:** School-directed financial/benefit allocation state.

**Required fields:**
- `id`
- `player_id`
- `school_id`
- `benefit_type`
- `effective_term`
- `amount_band`
- `status`
- `source_rule_refs`
- `audit_notes`

**Relations:**
- belongs to player and school

**Implementation note:** Model ranges/bands early; exact legal wording can come later.

### `nil_market_item`

**Purpose:** Third-party NIL opportunity/environment signal.

**Required fields:**
- `id`
- `player_or_prospect_id`
- `source_type`
- `market_value_band`
- `region`
- `brand_fit_tags`
- `status`
- `reported_flag`

**Relations:**
- may attach to player or prospect context

**Implementation note:** Represent market pressure without simulating every legal detail at first.

### `roster_slot`

**Purpose:** Position and roster planning abstraction.

**Required fields:**
- `id`
- `school_id`
- `season_id`
- `position_group`
- `depth_level`
- `player_id`
- `future_projection`
- `need_level`

**Relations:**
- belongs to school and season

**Implementation note:** Useful for planner UI and recruiting integration.

### `scheme_profile`

**Purpose:** Offensive/defensive/special teams identity.

**Required fields:**
- `id`
- `school_id`
- `offense_family`
- `defense_family`
- `tempo`
- `personnel_preferences`
- `attribute_weights`

**Relations:**
- belongs to school/staff
- feeds fit calculations

**Implementation note:** Treat scheme as gameplay-significant, not cosmetic.

### `practice_plan`

**Purpose:** Weekly or seasonal development plan.

**Required fields:**
- `id`
- `school_id`
- `week_id`
- `team_focus`
- `individual_focus_map`
- `rehab_allocations`
- `academic_support_allocations`

**Relations:**
- belongs to week and school

**Implementation note:** Keep plans easy to reason about in UI.

### `game`

**Purpose:** Single scheduled contest and its result.

**Required fields:**
- `id`
- `season_id`
- `week_id`
- `home_school_id`
- `away_school_id`
- `stakes`
- `result_state`
- `box_score_id`
- `sim_seed`
- `postseason_flag`

**Relations:**
- belongs to season/week
- generates stats and history

**Implementation note:** Sim seed is mandatory for reproducibility.

### `box_score`

**Purpose:** Aggregated statistical result for a game.

**Required fields:**
- `id`
- `game_id`
- `team_totals`
- `player_totals`
- `scoring_summary`
- `drive_summary_refs`

**Relations:**
- belongs to game

**Implementation note:** Start with box score, add drives/play-by-play later.

### `ranking_snapshot`

**Purpose:** Persisted standings/poll/selection view at a point in time.

**Required fields:**
- `id`
- `season_id`
- `snapshot_type`
- `week_label`
- `entries`
- `criteria_notes`
- `bracket_projection`

**Relations:**
- belongs to season

**Implementation note:** Do not recompute historical rankings on the fly from current logic.

### `cfp_bracket`

**Purpose:** Postseason bracket state.

**Required fields:**
- `id`
- `season_id`
- `selection_day_snapshot_id`
- `seeds`
- `matchups`
- `sites`
- `results`

**Relations:**
- belongs to season

**Implementation note:** Bracket logic must come from ruleset config.

### `objective`

**Purpose:** AD/board goals and promises.

**Required fields:**
- `id`
- `school_id`
- `owner_type`
- `category`
- `description`
- `target`
- `deadline`
- `importance`
- `status`

**Relations:**
- belongs to school and season/career

**Implementation note:** Objectives should drive pressure, not script outcomes.

### `facility`

**Purpose:** Infrastructure affecting recruiting and development.

**Required fields:**
- `id`
- `school_id`
- `type`
- `level`
- `condition`
- `upgrade_cost_band`
- `development_modifiers`
- `recruiting_modifiers`

**Relations:**
- belongs to school

**Implementation note:** Support degradation/regrading over time.

### `fan_sentiment`

**Purpose:** Public pressure and enthusiasm.

**Required fields:**
- `id`
- `school_id`
- `confidence`
- `expectation_level`
- `rivalry_heat`
- `headline_pressure`
- `attendance_modifier`

**Relations:**
- belongs to school and season

**Implementation note:** Separate fans from donors and AD expectations.

### `donor_segment`

**Purpose:** Booster resource and pressure model.

**Required fields:**
- `id`
- `school_id`
- `segment_name`
- `wealth_band`
- `priorities`
- `patience`
- `influence`
- `engagement_state`

**Relations:**
- belongs to school

**Implementation note:** Avoid real persons in prototype.

### `event_log`

**Purpose:** Immutable history of major events.

**Required fields:**
- `id`
- `season_id`
- `date_key`
- `event_type`
- `subject_refs`
- `payload`
- `headline_text`
- `visibility`

**Relations:**
- linked across whole sim

**Implementation note:** Use for debugging, history pages, and news generation.


## Recommended relational rules

### School-centric rules
A school owns or references:
- one active head coach at a time
- many staff roles
- many players
- one or more objective records
- fan and donor sentiment records
- facility portfolio
- financial profile
- season history

### Player-centric rules
A player must reference:
- exactly one school or be unattached
- exactly one eligibility record
- exactly one academic record
- at most one injury state
- at most one morale state
- optional benefit agreement(s) depending on ruleset
- current roster slot if attached to a program

### Prospect-centric rules
A prospect is not yet a rostered player. Keep the concepts separate.

A prospect should hold:
- recruitment state
- interest model
- scouting confidence
- visit history
- commitment status
- optional reclassification or decommitment flags

### Transfer-centric rules
A transfer entry should link:
- origin player
- origin school
- destination school when resolved
- portal timestamps
- eligibility implications
- relationship and demand metadata

### Game-centric rules
A game references:
- home school
- away school
- scheduled phase/week/day
- status
- result payload
- box score ID
- ranking/resume effects after processing

## Recommended schema split by concern

### Core identity tables
- schools
- conferences
- coaches
- staff_members
- players
- prospects

### Competition tables
- seasons
- schedules
- games
- box_scores
- standings snapshots
- ranking snapshots
- postseason bracket tables

### Program operation tables
- objectives
- facilities
- finances
- donor segments
- fan sentiment
- benefit agreements
- NIL market items

### Health and development tables
- practice plans
- injuries
- morale
- academic records
- eligibility records
- scheme profiles

### Event and history tables
- event log
- inbox items
- generated news
- historical records
- awards
- rivalry snapshots

## Serialization and save guidelines

### Store normalized domain state
Avoid giant nested JSON blobs as the only save source.

### Add explicit save headers
Every save should include:
- save version
- code compatibility range
- content pack versions
- ruleset ID and version
- initial seed
- current season and phase
- checksum or integrity data

### Support migrations as first-class citizens
Create a migration registry. Never silently mutate old saves without recording it.

### Preserve auditability
Whenever possible, retain enough history to explain:
- why a player became ineligible
- why a roster exceeded limits
- why rankings changed
- why a donor mood changed
- why a commitment flipped

## Example: player data shape

```json
{
  "id": "player_9f12c7",
  "schema_version": 1,
  "display_name": "Marcus Hale",
  "school_id": "school_lake_valley",
  "position_group": "QB",
  "class_year_label": "SO",
  "physical_profile": {
    "height_in": 74,
    "weight_lb": 212
  },
  "ratings": {
    "overall": 78,
    "throw_power": 81,
    "accuracy_short": 77,
    "accuracy_deep": 74,
    "awareness": 76,
    "mobility": 73
  },
  "personality": {
    "competitiveness": 69,
    "loyalty": 58,
    "ego": 42,
    "work_ethic": 81
  },
  "scheme_fit_tags": ["spread", "tempo"],
  "eligibility_record_id": "elig_9f12c7",
  "academic_record_id": "acad_9f12c7",
  "injury_state_id": null,
  "morale_state_id": "mor_9f12c7",
  "roster_slot_id": "slot_qb_2",
  "status_flags": ["starter_candidate"]
}
```

## Example: prospect data shape

```json
{
  "id": "prospect_2027_1142",
  "schema_version": 1,
  "display_name": "Jalen Price",
  "class_year": 2027,
  "position_group": "WR",
  "home_region": "Gulf Coast",
  "rating_projection": {
    "current": 71,
    "ceiling": 87
  },
  "scouting_confidence": 0.46,
  "academics": {
    "preparedness": 0.62,
    "risk_band": "medium"
  },
  "interest_state": {
    "top_schools": ["school_capital_state", "school_red_desert"],
    "lean": "school_capital_state"
  },
  "recruitment_state": {
    "offer_status": "offered",
    "visit_scheduled": true,
    "commitment_status": "open"
  }
}
```

## Example: ruleset reference in save header

```json
{
  "save_version": 3,
  "career_id": "career_2026_0001",
  "seed": 128771,
  "ruleset": {
    "id": "fbs_current",
    "version": "2026.1"
  },
  "content_packs": [
    {
      "id": "core-fictional",
      "version": "1.0.0"
    }
  ],
  "current_date": "2026-08-18",
  "season_id": "season_2026"
}
```

## Data validation gates

Before the app can load a career or advance time, validate at least the following:

### Structural validation
- all referenced IDs exist
- all required fields are present
- enum values are legal
- schema versions are recognized

### World integrity validation
- every rostered player belongs to a valid school
- no school has duplicate active head coaches
- no schedule contains duplicate same-day games for the same team
- every active player has eligibility and academic records
- postseason bracket fields are internally consistent

### Rules validation
- roster counts comply with active rules
- benefit allocations do not exceed limits
- portal actions only occur in legal windows unless an exception exists
- redshirt and eligibility logic align with the active ruleset
- conference title logic matches conference rules

### Historical validation
- record books only reference completed games
- past rankings point to valid schools
- no history record refers to a deleted entity without an archival stub

## Migration policy

When the schema changes:
1. bump schema version
2. write an explicit migration
3. test the migration on golden saves
4. record the change in the decision log
5. update any content pack compatibility metadata

Never:
- hotfix saves by hand without documenting it
- delete unsupported fields silently
- trust UI code to fix domain data lazily

## Content authoring standards

### Naming
Use clear, stable identifiers and readable display names.

### Tags
Prefer tags over ad hoc booleans when the category may grow.

### Enumerations
Centralize enums. Do not duplicate them across packages.

### Units
Declare units in field names where ambiguity is possible:
- `_lb`
- `_in`
- `_pct`
- `_days`

### Nullability
Use null intentionally. Distinguish:
- unknown
- not applicable
- not yet assigned
- explicitly none

## What not to model too early

Do not overcomplicate the first data pass with:
- biometric micro-stats
- hundreds of hidden one-off traits
- exhaustive playbook route trees
- detailed campus maps
- social-media simulation noise
- unnecessary 3D presentation data

Only model what supports:
- the menus
- the yearly loop
- believable long-term consequences

## Deliverables required from the AI after reading this file

1. A canonical schema catalog for all core entities
2. A content-pack specification
3. A fictional-world generation spec
4. A save format and migration spec
5. Validation checklists and automated validators
6. Example records for the most important entity classes
7. A clear map from screens to source-of-truth entities

## Completion checklist

The AI is done with this file when it can answer:
- Where does each important fact live?
- Which data is authored versus generated versus saved?
- How is a fictional career created deterministically?
- How will old saves survive schema changes?
- How will impossible world states be prevented before they reach players?
