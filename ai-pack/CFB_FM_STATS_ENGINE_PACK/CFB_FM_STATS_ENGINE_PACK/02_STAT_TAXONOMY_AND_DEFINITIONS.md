# Stat Taxonomy and Definitions

## Purpose

This file defines the stat registry the game needs before a real stat engine can exist.

Every stat should have:

- id
- display name
- owner type
- official/internal classification
- source play types
- aggregation rule
- display format
- validation notes

## Owner Types

```text
Team
Player
Drive
Game
Season
Career
SchoolRecord
ConferenceRecord
NationalRecord
```

## Official-Style Team Stats

### Scoring

```text
points
touchdowns
offensive_touchdowns
defensive_touchdowns
special_teams_touchdowns
passing_touchdowns
rushing_touchdowns
receiving_touchdowns
field_goals_made
extra_points_made
two_point_conversions
safeties
points_per_game
points_per_drive
```

### Total Offense

```text
total_yards
total_plays
yards_per_play
passing_yards
rushing_yards
passing_attempts
pass_completions
rushing_attempts
turnovers
first_downs
```

Important college-football rule target:

```text
Sacks should be treated according to college-stat rules.
The implementation should follow the NCAA Football Statisticians' Manual.
In college football, sack yardage is generally charged against rushing rather than passing.
```

### Passing

```text
team_pass_attempts
team_pass_completions
team_completion_percentage
team_passing_yards
team_passing_touchdowns
team_interceptions_thrown
team_sacks_allowed
team_sack_yards_allowed
team_yards_per_pass_attempt
team_adjusted_passing_efficiency_internal
```

### Rushing

```text
team_rush_attempts
team_rushing_yards
team_rushing_touchdowns
team_yards_per_rush
team_tackles_for_loss_allowed
team_rushing_first_downs
```

### Receiving

Receiving is usually player-owned, but team summaries may include:

```text
team_receptions
team_receiving_yards
team_receiving_touchdowns
team_drops_internal
team_yards_after_catch_internal
```

### Downs

```text
first_downs_total
first_downs_rushing
first_downs_passing
first_downs_penalty
third_down_attempts
third_down_conversions
third_down_percentage
fourth_down_attempts
fourth_down_conversions
fourth_down_percentage
```

### Red Zone

```text
red_zone_trips
red_zone_scores
red_zone_touchdowns
red_zone_field_goals
red_zone_empty_trips
red_zone_td_percentage
red_zone_scoring_percentage
```

### Drives

```text
drives
drive_plays
drive_yards
average_starting_field_position
average_drive_yards
average_drive_plays
average_drive_time
points_per_drive
turnovers_per_drive
```

### Penalties

```text
penalties
penalty_yards
accepted_penalties
declined_penalties
offsetting_penalties
pre_snap_penalties_internal
post_play_penalties_internal
```

### Defense

```text
points_allowed
yards_allowed
plays_allowed
yards_per_play_allowed
passing_yards_allowed
rushing_yards_allowed
first_downs_allowed
third_down_conversions_allowed
turnovers_forced
sacks
tackles_for_loss
interceptions
fumbles_forced
fumbles_recovered
defensive_touchdowns
red_zone_trips_allowed
red_zone_scores_allowed
```

### Special Teams

```text
kickoff_returns
kickoff_return_yards
kickoff_return_touchdowns
punt_returns
punt_return_yards
punt_return_touchdowns
punts
punt_yards
net_punt_yards
field_goal_attempts
field_goals_made
extra_point_attempts
extra_points_made
blocked_kicks
touchbacks
```

### Clock

```text
time_of_possession_seconds
average_time_per_drive
plays_per_game
seconds_per_play_internal
garbage_time_plays_internal
```

## Official-Style Player Stats

## Quarterback / Passer

```text
pass_attempts
pass_completions
completion_percentage
passing_yards
passing_touchdowns
interceptions_thrown
sacks_taken
sack_yards_lost
passing_first_downs
yards_per_attempt
yards_per_completion
fumbles
fumbles_lost
rushing_attempts
rushing_yards
rushing_touchdowns
```

Internal:

```text
air_yards
yards_after_catch_generated
turnover_worthy_throws
big_time_throws
pressure_dropbacks
pressured_completions
scramble_yards
designed_run_yards
coverage_read_grade
```

## Running Back / Rusher

```text
rushing_attempts
rushing_yards
rushing_touchdowns
yards_per_carry
rushing_first_downs
receptions
receiving_yards
receiving_touchdowns
fumbles
fumbles_lost
```

Internal:

```text
yards_after_contact
broken_tackles
stuffed_runs
explosive_runs
pass_protection_snaps
pass_protection_failures
```

## Receiver / Tight End

```text
targets_internal
receptions
receiving_yards
receiving_touchdowns
yards_per_reception
receiving_first_downs
fumbles
fumbles_lost
```

Internal:

```text
drops
yards_after_catch
contested_catches
explosive_receptions
route_grade
separation_score
```

## Offensive Line

Mostly internal, because official box scores rarely credit OL.

```text
snaps_internal
sacks_allowed_internal
pressures_allowed_internal
run_block_grade_internal
pass_block_grade_internal
penalties
missed_assignments_internal
```

## Defensive Players

```text
total_tackles
solo_tackles
assisted_tackles
tackles_for_loss
sacks
sack_yards
interceptions
interception_return_yards
interception_return_touchdowns
passes_defended
forced_fumbles
fumble_recoveries
fumble_return_yards
fumble_return_touchdowns
defensive_touchdowns
blocked_kicks
```

Internal:

```text
pressures
qb_hits
run_stops
missed_tackles
coverage_targets
coverage_completions_allowed
coverage_yards_allowed
havoc_plays
```

## Specialists

### Kicker

```text
field_goal_attempts
field_goals_made
field_goal_percentage
long_field_goal
extra_point_attempts
extra_points_made
extra_point_percentage
kickoffs
touchbacks
```

Internal:

```text
expected_fg_value
pressure_kicks
weather_adjusted_kicks
```

### Punter

```text
punts
punt_yards
average_punt
long_punt
inside_20
touchbacks
blocked_punts
```

Internal:

```text
net_punt_value
directional_success
hang_time_estimate
```

### Returner

```text
kickoff_returns
kickoff_return_yards
kickoff_return_touchdowns
punt_returns
punt_return_yards
punt_return_touchdowns
fumbles
fumbles_lost
```

## Advanced/Internal Team Metrics

These are not required for official box score, but are important for Data Hub.

```text
success_rate
explosive_play_rate
havoc_rate
points_per_scoring_opportunity
finishing_drives
field_position_value
turnover_margin
pressure_rate
stuff_rate
red_zone_efficiency
garbage_time_adjusted_efficiency
tempo_adjusted_efficiency
```

## Stat Definition Object

```ts
type StatDefinition = {
  id: string;
  displayName: string;
  owner: "team" | "player" | "drive" | "game" | "season" | "career";
  category: string;
  classification: "official_style" | "internal" | "derived";
  sourceEvents: string[];
  aggregation: "sum" | "average" | "percentage" | "max" | "derived";
  displayFormat: "integer" | "decimal_1" | "percentage" | "time" | "yards" | "points";
  description: string;
  validationNotes?: string[];
};
```

## Derived Stat Examples

```text
completion_percentage = completions / attempts
yards_per_attempt = passing_yards / pass_attempts
yards_per_play = total_yards / total_plays
third_down_percentage = third_down_conversions / third_down_attempts
points_per_drive = points / drives
```

Derived stats should never be separately stored as truth unless needed for performance.

Store raw counting stats first.

## Display Principle

The UI should distinguish:

```text
Official-style stat
Internal analytic stat
Derived stat
```

This avoids confusing the player when internal grades do not match public stat categories.
