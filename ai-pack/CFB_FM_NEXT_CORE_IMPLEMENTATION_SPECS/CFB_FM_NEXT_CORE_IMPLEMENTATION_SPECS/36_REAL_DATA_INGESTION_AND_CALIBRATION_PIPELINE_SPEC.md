# 36 — Real Data Ingestion and Calibration Pipeline Spec

## North Star

The game should use real college football data to calibrate fictional/private simulations.

Real data should inform:

- talent distribution
- play outcomes
- stats
- school power inputs
- recruiting geography
- draft pipelines
- name generation
- town immersion
- scheme tendencies
- attendance/fan intensity proxies

The goal is not to perfectly reproduce reality. The goal is to keep the sim from drifting into nonsense.

## Data Modes

```text
fictional_mode
real_school_private_mode
custom_mode
hybrid_mode
```

The pipeline should support all four.

## Data Folders

```text
data_raw/
  cfbd/
  kaggle/
  wikipedia/
  ncaa_public/
  reddit_town_flavor/
  manual_reference/

data_processed/
  teams/
  rosters/
  plays/
  stats/
  recruiting/
  draft/
  school_power/
  names/
  towns/
  calibration/

game_data/
  calibration/
  synthetic/
  real_private/
  configs/
```

## Source Registry

Every data source must be registered.

```ts
type DataSourceRecord = {
  id: string;
  name: string;
  url?: string;
  type: "api" | "csv" | "scrape" | "manual" | "crowdsource";
  licenseNotes: string;
  rawRedistributionAllowed: boolean | "unknown";
  devOnly: boolean;
  shippedUse: "none" | "aggregate_only" | "private_mode" | "allowed";
  fields: string[];
  refreshCadence: string;
  riskNotes: string[];
};
```

## Core Sources

## CFBD / CollegeFootballData

Use for:

- games
- plays
- drives
- team stats
- player usage where available
- rosters
- recruiting
- rankings
- team/conference data

## Kaggle

Use as fallback/bulk historical data.

## Wikipedia

Use for:

- school metadata
- conference history
- stadiums
- rivalries
- awards
- town references, limited

## NCAA / ESPN Public Stats

Use for public sanity checks.

## Reddit / Crowdsource

Use for town flavor only after filtering.

Do not use unfiltered Reddit text directly in game.

## Name Generation

Use real rosters only to build aggregate distributions:

- first names
- last names
- state/region names
- position/body distributions
- hometown distributions

Do not ship raw identifiable player rows unless private mode and user chooses.

## School Power Inputs

Build school starting values from proxies:

- enrollment/alumni estimate
- historical football revenue if available
- stadium size
- attendance
- draft picks
- historical win rate
- conference membership
- recruiting geography
- local talent density
- recent success
- facilities estimate
- media exposure
- fan intensity proxy

Output:

```ts
type SchoolPowerInput = {
  alumniBase: number;
  donorWealth: number;
  fanIntensity: number;
  localTalentAccess: number;
  regionalTalentDensity: number;
  facilities: number;
  nflPipeline: number;
  mediaExposure: number;
  academicPrestige: number;
  campusAppeal: number;
  locationAppeal: number;
  tradition: number;
  recentSuccess: number;
  staffBudget: number;
  nilMarketStrength: number;
  confidence: number;
  sources: string[];
};
```

## Play Outcome Calibration

From play-by-play data build:

- run/pass by down/distance
- yards gained distributions
- sack rates
- interception rates
- fumble rates
- penalty rates
- explosive rates
- red-zone results
- third/fourth down conversion
- play types by scheme/team archetype
- tempo/plays per game
- garbage-time tendencies

## Stat Calibration

Build bands for:

- team PPG
- total yards/game
- pass yards/game
- rush yards/game
- yards/play
- turnovers/game
- sacks
- penalties
- red-zone TD rate
- individual leaderboards
- positional stat distributions

## Recruiting Calibration

Build:

- star distribution
- state distribution
- position distribution
- blue-chip concentration
- school signing patterns
- regional pipeline tendencies
- recruit height/weight by position

## Draft Calibration

Build:

- draft picks by school
- draft picks by conference
- picks by position
- first-round distribution
- star rating background
- P4/G5 distribution
- development factory indicators

## Town Immersion Pipeline

Raw collection:

- landmarks
- food spots
- game day traditions
- rivalry terms
- memes
- weather/local culture
- campus identity

Filtering:

- remove offensive content
- remove one-off jokes
- remove outdated references
- remove personally identifying comments
- compress to high-signal tags

Output:

```ts
type TownFlavorProfile = {
  schoolId: string;
  city: string;
  cultureTags: string[];
  landmarks: FlavorItem[];
  foodCulture: FlavorItem[];
  gameDayIdentity: FlavorItem[];
  rivalryFlavor: FlavorItem[];
  localMemes: FlavorItem[];
  weatherNotes: FlavorItem[];
  confidence: number;
};
```

## ETL Scripts

Required:

```text
01_pull_cfbd_games.py
02_pull_cfbd_plays.py
03_pull_cfbd_rosters.py
04_pull_cfbd_recruiting.py
05_normalize_play_types.py
06_build_stat_targets.py
07_build_recruiting_targets.py
08_build_school_power_inputs.py
09_build_name_models.py
10_build_draft_targets.py
11_scrape_wikipedia_school_metadata.py
12_collect_town_flavor_candidates.py
13_filter_town_flavor.py
14_export_game_calibration_json.py
```

## Data Validation

Each processed dataset should validate:

- missing fields
- duplicate IDs
- impossible values
- year coverage
- source confidence
- outliers
- schema match

## Outputs

```text
game_data/calibration/stat_targets_current_era.json
game_data/calibration/play_outcome_targets.json
game_data/calibration/recruiting_targets.json
game_data/calibration/draft_targets.json
game_data/calibration/school_power_inputs.json
game_data/synthetic/name_model.json
game_data/real_private/schools.json
game_data/real_private/town_flavor.json
```

## Data Lab Integration

Data Lab compares sim output to calibration targets.

Reports:

- stat realism
- recruiting realism
- draft realism
- school power drift
- NIL market realism
- transfer realism
- play outcome realism

## Tests

Required:

- source registry validation
- raw-to-processed schema validation
- name model output valid
- stat target JSON valid
- school power input ranges valid
- play outcome distributions sum correctly
- calibration report can load all outputs

## Acceptance Criteria

Data pipeline is acceptable when:

- real data becomes aggregate calibration
- fictional mode can use targets
- private real-school mode can use school data
- raw source risks are tracked
- outputs are schema-validated
- Data Lab consumes calibration JSON
- sim can be compared against real distributions
