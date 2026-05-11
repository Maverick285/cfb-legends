# Calibration Targets and Data Pipeline

## Purpose

The stats engine must not just be internally consistent.

It must produce outputs that look like real college football.

The right approach is:

```text
Use real data to build target distributions.
Use Data Lab to compare simulated outputs to those distributions.
Tune play generator parameters until outputs are plausible.
```

## Primary Data Sources

## CollegeFootballData / cfbfastR

Use for:

- play-by-play data
- play types
- player play stats
- team stats
- box scores
- drive data
- EPA/WPA-style optional analytics

Why:

- structured
- filterable by year/week/team/offense/defense/play type
- usable for calibration scripts

## NCAA Football Statisticians' Manual

Use for:

- official-style stat credit rules
- edge cases
- penalties
- sacks
- fumbles
- special teams
- team stats

## NCAA / ESPN Public Stat Pages

Use for broad sanity checks:

- top offense
- median-ish offense
- bottom offense
- scoring offense
- rushing/passing extremes
- defense
- special teams

Do not rely only on public leader pages for deep calibration.

## Data Pipeline

```text
data_raw/
  cfbd/
    plays/
    games/
    teams/
    boxscores/
  manual_reference/
  public_stats/

data_processed/
  play_type_distributions/
  down_distance_outcomes/
  team_stat_bands/
  player_stat_bands/
  scheme_archetypes/
  calibration_targets/

game_data/
  stat_calibration_current_era.json
  stat_calibration_scheme_archetypes.json
```

## Scripts

```text
scripts/stats/
  01_pull_cfbd_plays.py
  02_normalize_play_types.py
  03_build_down_distance_distributions.py
  04_build_team_stat_bands.py
  05_build_player_stat_bands.py
  06_build_scheme_archetype_targets.py
  07_compare_sim_to_targets.py
  08_export_stats_validation_report.py
```

## Required Calibration Dimensions

## By Team Quality

```text
elite
top_10
top_25
above_average
average
below_average
bottom_25
```

## By Scheme

```text
air_raid
spread_rpo
power_spread
option
triple_option
pro_style
tempo_spread
defensive_grind
```

## By Tempo

```text
slow
balanced
fast
extreme
```

## By Game State

```text
neutral
garbage_time
trailing_big
leading_big
two_minute
red_zone
third_down
fourth_down
overtime
```

## By Level

```text
P4_vs_P4
P4_vs_G5
G5_vs_G5
FCS_or_low_level_if_included
```

## Team Calibration Targets

Targets should be distribution bands, not single numbers.

Example structure:

```json
{
  "current_era_fbs": {
    "team_game": {
      "points": {
        "average_band": [20, 35],
        "top_offense_season_ppg": [38, 48],
        "bottom_offense_season_ppg": [10, 22]
      },
      "total_yards": {
        "average_game_band": [320, 460],
        "top_offense_season_ypg": [460, 530],
        "bottom_offense_season_ypg": [230, 340]
      }
    }
  }
}
```

Do not hardcode these permanently.

Generate them from data when possible.

## Public Sanity Examples

Recent public leader pages are useful sanity checks.

Example top-end current-era outputs:

```text
Top total offenses can exceed 500 yards/game.
Top scoring offenses can sit around the low-to-mid 40s points/game.
Top passing offenses can exceed 300 passing yards/game.
Top rushing offenses can exceed 280 rushing yards/game.
```

These are top-end bands, not normal-team averages.

## Player Calibration Targets

## QB

Track season distribution:

```text
passing yards
passing TDs
interceptions
completion percentage
yards/attempt
sacks taken
rushing contribution
```

Bands:

```text
elite passer
top 10 passer
average starter
low-volume starter
backup/noise
```

## RB

Track:

```text
rush attempts
rushing yards
yards/carry
rushing TDs
receiving usage
fumbles
```

## WR/TE

Track:

```text
targets
receptions
receiving yards
receiving TDs
yards/reception
YAC internal
drops internal
```

## Defense

Track:

```text
tackles
sacks
TFL
interceptions
passes defended
forced fumbles
```

## Special Teams

Track:

```text
FG attempts
FG percentage
punt average
return yards
touchbacks
```

## Play-Level Calibration

The play generator should eventually match:

- run/pass rate by down/distance
- yards gained distribution
- sack rate
- interception rate
- fumble rate
- penalty rate
- explosive play rate
- third-down conversion rate
- red-zone TD rate
- punt frequency
- field goal attempt frequency

## Situation-Based Examples

### 3rd and Long

Should have:

- higher pass rate
- lower conversion rate
- higher sack/pressure risk
- higher incompletion rate

### Goal Line

Should have:

- higher run rate
- shorter yardage outcomes
- higher TD probability
- lower explosive probability

### Blowout Late

Should have:

- more backups
- more rushing by leading team
- less aggressive passing
- garbage-time stat flag

## Scheme Calibration

## Air Raid

Expected tendencies:

- high pass attempts
- high passing yards
- lower rushing share
- more WR targets
- more QB volume

## Option / Triple Option

Expected tendencies:

- high rushing attempts
- lower passing attempts
- high rushing yards
- unique QB/RB rushing split
- lower play-by-play passing volume

## Tempo Spread

Expected tendencies:

- more plays
- more possessions
- more fatigue
- higher variance
- more total yards possible
- defense may allow more plays

## Power Run

Expected tendencies:

- more rushing
- slower tempo
- fewer total plays
- lower variance
- strong time of possession

## Data Lab Validation Report

After each sim batch, generate:

```text
Stats Validation Report
```

Sections:

- scoring distribution
- total yard distribution
- pass/rush split
- player leaderboards
- scheme output comparison
- tempo output comparison
- red-zone rates
- third-down rates
- sack/interception/fumble rates
- penalty rates
- explosive rates
- anomalies
- suggested tuning

## Anomaly Examples

```json
{
  "severity": "high",
  "system": "stats",
  "message": "Sim produced 37 QBs with 5,000+ passing yards in one season.",
  "likelyCause": "Pass volume too high or season stat accumulation double-counting.",
  "suggestedTest": "season_passing_yards_distribution"
}
```

```json
{
  "severity": "critical",
  "system": "stats",
  "message": "Team total yards do not equal passing + rushing yards.",
  "likelyCause": "Return yards or penalty yards leaking into total offense.",
  "suggestedTest": "box_score_total_yards_reconciliation"
}
```

## Acceptance Criteria

Calibration is acceptable when:

- simulated team averages sit within real-data bands
- top offenses look elite but not impossible
- bad offenses remain bad
- schemes create different stat shapes
- tempo changes volume without becoming always superior
- player leaderboards look plausible
- stat totals reconcile
- no long-run inflation occurs
