# Stat Credit Rules

## Purpose

This document defines how structured PlayEvents should be converted into StatDeltas.

The NCAA Football Statisticians' Manual should be the final authority for official-style rules. This document gives the implementation structure and default behavior.

## Core Output: StatDelta

```ts
type StatDelta = {
  playId: string;
  ownerType: "team" | "player" | "drive";
  ownerId: string;
  statId: string;
  amount: number;
  classification: "official_style" | "internal" | "derived_support";
  reason: string;
};
```

## General Rules

1. Only structured PlayEvents create official stats.
2. Text descriptions never create stats.
3. Penalty enforcement determines whether the play counts.
4. Return yards are separate from offensive yards.
5. Penalty yards are separate from offensive yards.
6. Defensive/special teams TDs count as points but not offensive yards.
7. Team totals must reconcile after every game.
8. Sacks must follow college-stat treatment.

---

# Passing Plays

## Completed Pass

Input:

```text
chargedPlayType = passing_attempt_complete
yardsGained = Y
passerId exists
receiverId exists
```

Credit:

Passer:
- +1 pass_attempt
- +1 pass_completion
- +Y passing_yards
- +1 passing_touchdown if scoring offensive TD

Receiver:
- +1 reception
- +Y receiving_yards
- +1 receiving_touchdown if scoring offensive TD

Offense Team:
- +1 pass_attempt
- +1 pass_completion
- +Y passing_yards
- +Y total_yards
- +1 total_play
- +1 first_down_passing if firstDownType = passing

Defense Team:
- yards_allowed +Y
- passing_yards_allowed +Y

Internal:
- air_yards
- yards_after_catch
- target
- coverage target

## Incomplete Pass

Credit:

Passer:
- +1 pass_attempt

Intended Receiver:
- +1 target_internal

Offense Team:
- +1 pass_attempt
- +1 total_play

Defense:
- +1 pass_attempt_allowed
- +1 pass_defended if participant exists and event marks pass defended

No passing yards.

## Interception

Credit:

Passer:
- +1 pass_attempt
- +1 interception_thrown

Defense:
- interceptor +1 interception
- team +1 interception
- team +1 turnover_forced

If return:
- interceptor +return_yards
- defense team +interception_return_yards
- defensive TD if returned for score

Offense:
- +1 turnover

Team passing yards:
- normally 0 unless completed then fumbled/intercepted edge case is represented differently.

## Spike

Implementation note:

Use manual-confirmed rule.

Default configurable behavior:

```text
spike counts as pass attempt, incomplete, no target
```

But this must be tied to NCAA manual confirmation.

## Intentional Grounding

Treat as penalty/sack-style according to manual and ruleset.

Do not approximate silently.

Represent explicitly as penalty with loss/down effects.

---

# Rushing Plays

## Designed Rush

Input:

```text
chargedPlayType = rushing_attempt
rusherId exists
yardsGained = Y
```

Credit:

Rusher:
- +1 rushing_attempt
- +Y rushing_yards
- +1 rushing_touchdown if offensive TD

Offense Team:
- +1 rushing_attempt
- +Y rushing_yards
- +Y total_yards
- +1 total_play
- +1 first_down_rushing if firstDownType = rushing

Defense:
- rushing_yards_allowed +Y

Internal:
- yards_after_contact
- broken tackles
- run stuff if applicable

## Scramble

Credit as rushing attempt by QB.

Also mark internal:

```text
scramble_yards
```

## Sack

College-style default:

```text
Sack is charged as a rushing attempt and negative rushing yards to the passer/team.
```

Credit:

Passer/QB:
- +1 rushing_attempt
- negative rushing_yards
- +1 sack_taken
- sack_yards_lost

Offense Team:
- +1 rushing_attempt
- negative rushing_yards
- negative total_yards
- +1 total_play
- +1 sack_allowed
- sack_yards_allowed

Defense:
- sacker +1 sack
- sacker +sack_yards
- team +1 sack
- team +sack_yards
- likely +1 tackle_for_loss depending rule implementation
- pressure defender internal credit if different

Important:
- no pass attempt
- no passing yards

## Kneel Down

Default:

```text
credit as QB rushing attempt with negative yards
```

But mark:

```text
kneel_down_internal = true
```

So analytics can exclude kneel-downs from efficiency if desired.

## Bad Snap / Team Rush

If no individual should be credited, use team rushing entry.

Use official manual for exact classification.

Represent with:

```text
ownerType = team
statId = team_rush_attempt
```

and optional player impact if identified.

---

# Receiving

Receiving stats usually come from completed passes.

Receiver earns:

- reception
- receiving yards
- receiving TD
- receiving first down
- fumble if fumbles after catch

Targets and drops are internal unless the design chooses to show them.

## Yards After Catch

Internal:

```text
receiver +YAC
team +YAC
```

Should not double-count official receiving yards.

---

# Fumbles

## Fumble On Rush

Rusher receives:

- rushing attempt
- rushing yards to point credited by play event
- fumble
- fumble_lost if turnover

Defense receives:

- forced fumble if forcedByPlayerId
- fumble recovery if recoveredByPlayerId
- fumble return yards if return
- defensive TD if returned for score

Team:
- offense turnover if lost
- defense turnover forced

## Fumble After Reception

Receiver receives:

- reception
- receiving yards credited by event
- fumble
- fumble_lost if turnover

Passer still receives:

- pass attempt
- completion
- passing yards credited by event

## Fumble Return

Return yards are not offensive yards.

Credit:

- fumble_recoverer return yards
- defensive/special teams team return yards
- TD if scored

## Fumble Not Lost

Credit fumble to player.
No turnover.

---

# Penalties

Penalty logic is one of the most important areas.

## Penalty Types By Enforcement

```text
No Play
Live Ball
Dead Ball
Post Play
Offsetting
Declined
```

## No-Play Penalty

If penalty negates play:

```text
statEligibility.nullifiedByPenalty = true
```

Credit:

- penalty
- penalty yards

Do not credit normal play stats.

Examples:
- false start
- offensive holding before completed play if enforcement negates play depending event
- illegal formation

## Live-Ball Penalty

Play may count, and penalty yards apply after.

Credit both:

- play stats
- penalty stats

depending enforcement.

Example:
- defensive pass interference may create penalty first down but not passing yards.

## Declined Penalty

Credit play stats.
No penalty yards unless manual says track declined count internally.

## Offsetting Penalties

Usually no play or replay down depending rule.
Credit offsetting count internally.
Do not credit play stats if nullified.

## Penalty First Downs

If penalty creates first down:

Team:
- +1 first_down_penalty

Do not credit rushing/passing first down.

## Penalty Yards

Penalty yards are not offensive yards.

---

# First Downs

First down types:

```text
rushing
passing
penalty
```

A play can create only one credited first down event for normal purposes.

Credit:

Team:
- +1 first_down_total
- +1 first_down_rushing/pass/penalty

Player:
- rushing_first_down or receiving_first_down or passing_first_down support stat, optional/internal

---

# Touchdowns and Points

## Offensive Rushing TD

Rusher:
- rushing TD

Team:
- offensive TD
- rushing TD
- points +6

## Offensive Passing TD

Passer:
- passing TD

Receiver:
- receiving TD

Team:
- offensive TD
- passing TD
- receiving TD support
- points +6

## Defensive TD

Defense:
- defensive TD
- points +6
- return yards by type

Offense:
- turnover if applicable

No offensive yards.

## Special Teams TD

Returner:
- return TD
- return yards

Team:
- special teams TD
- points +6

No offensive yards.

## Safety

Credit:
- scoring team +2
- opponent may receive team negative field event
- defensive player credit depends on play details

---

# Field Goals

## Made Field Goal

Kicker:
- +1 field_goal_attempt
- +1 field_goal_made
- update long if applicable

Team:
- +1 field_goal_attempt
- +1 field_goal_made
- +3 points

## Missed Field Goal

Kicker:
- +1 field_goal_attempt

Team:
- +1 field_goal_attempt

If returnable missed FG:
- represent as return play in same or linked PlayEvent.

## Blocked Field Goal

Kicker:
- attempt

Defense:
- blocked kick credit

If returned:
- return yards and TD if applicable

---

# Extra Points and Two-Point Attempts

## Extra Point Made

Kicker:
- XP attempt
- XP made

Team:
- XP attempt
- XP made
- +1 point

## Extra Point Missed

Kicker:
- XP attempt

Team:
- XP attempt

## Two-Point Conversion

If successful:
- team +2
- player stats according to rush/pass event if rules require
- two_point_conversion stat

Use manual-confirmed stat handling.

---

# Punts

## Punt

Punter:
- +1 punt
- +punt_yards

Team:
- +1 punt
- +punt_yards

If fair catch/no return:
- no return yards

If return:
- returner punt return + return yards

If downed/inside 20:
- punter/team inside_20 if applicable

If blocked:
- blocked punt event
- defense blocked kick
- return/fumble logic if possession changes

Punt yards and punt return yards are not offensive yards.

---

# Kickoffs

Kicker/team:
- kickoff
- touchback if applicable

Returner:
- kickoff return
- kickoff return yards
- kickoff return TD if scored

Kickoff return yards are not offensive yards.

---

# Tackles

Tackle credit should be included when participants exist.

## Solo Tackle

Primary tackler:
- +1 solo tackle
- +1 total tackle

## Assisted Tackle

Each assisted tackler:
- +1 assisted tackle
- +0.5 or +1 total tackle depending chosen display convention

Implementation decision:
Use separate solo/assisted counts and derive total according to selected display convention.

## Sack Tackle

Sacker:
- sack
- sack yards
- tackle/TFL handling according to manual implementation.

## Tackle For Loss

If rushing play or sack loses yards:
- defender credited TFL if participant exists and rules qualify

---

# Red Zone

A drive becomes a red-zone trip when offense reaches opponent 20 or closer.

Track:

- red_zone_trip
- red_zone_score
- red_zone_touchdown
- red_zone_field_goal
- red_zone_empty

Do not double-count multiple plays within one drive.

---

# Explosive Plays

Internal definition configurable.

Default:

```text
pass explosive: 20+ yards
rush explosive: 10+ or 15+ yards depending config
```

Store:

- explosive_play
- explosive_pass
- explosive_rush
- explosive_allowed

---

# Garbage Time

Garbage time should not remove official stats.

It should mark internal analytics:

```text
garbageTime = true
```

Official totals still count.

Analytics can exclude or split.

---

# Overtime

Overtime stats generally count in college football.

But Data Lab should allow separate overtime split.

Represent:

```text
period > 4
overtimeSequence
```

---

# Unsupported or Complex Cases

These should be explicit, not silently wrong.

- multiple laterals
- double fumbles
- penalties after change of possession
- blocked kick with multiple possession changes
- weird overtime special cases
- team safety
- statistical corrections after game

If unsupported early, create:

```text
unsupportedComplexPlay = true
```

and ensure test fixtures cover the later implementation.

---

# Stat Credit Acceptance Criteria

The stat credit rules are acceptable when:

- completed pass credits passer/receiver/team correctly
- incomplete pass credits attempt only
- interception credits passer/defense/return correctly
- rush credits rusher/team correctly
- sack uses college-style stat treatment
- fumble after rush/reception is credited correctly
- penalties can nullify or preserve play stats
- first downs are categorized correctly
- points match scoring plays
- special teams stats stay separate from offense
- box score reconciles after every game
