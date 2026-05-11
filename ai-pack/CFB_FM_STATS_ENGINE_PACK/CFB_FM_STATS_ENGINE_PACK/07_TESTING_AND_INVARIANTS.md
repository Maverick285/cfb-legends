# Stats Testing and Invariants

## Purpose

The stats engine needs more tests than most systems.

Every stat-credit rule should be testable with a tiny PlayEvent fixture.

## Test Categories

```text
unit tests
edge case tests
integration tests
reconciliation tests
season aggregation tests
long-run validation tests
```

## Unit Test Fixture Pattern

Each test should define:

```text
given PlayEvent
when applyPlay
then expected StatDeltas
then expected box score changes
```

Example:

```ts
test("completed pass credits passer receiver and team", () => {
  const play = makeCompletedPass({ yards: 11 });
  const deltas = creditPlay(play);
  expectDelta(deltas, passerId, "pass_attempts", 1);
  expectDelta(deltas, passerId, "pass_completions", 1);
  expectDelta(deltas, passerId, "passing_yards", 11);
  expectDelta(deltas, receiverId, "receptions", 1);
  expectDelta(deltas, receiverId, "receiving_yards", 11);
  expectDelta(deltas, offenseId, "team_passing_yards", 11);
  expectDelta(deltas, offenseId, "total_yards", 11);
});
```

## Required Unit Tests

## Passing

- completed pass
- completed pass TD
- incomplete pass
- interception
- pick-six
- spike
- pass nullified by penalty
- completed pass with post-play penalty
- completed pass then fumble
- sack on called pass

## Rushing

- normal rush
- rushing TD
- negative rush
- tackle for loss
- sack as college rushing loss
- QB scramble
- kneel down
- rush then fumble
- rush nullified by penalty

## Receiving

- reception
- receiving TD
- YAC internal
- drop internal
- target internal
- reception then fumble

## Defense

- solo tackle
- assisted tackle
- sack
- TFL
- interception
- pass defended
- forced fumble
- fumble recovery
- defensive TD

## Penalties

- false start no play
- defensive pass interference
- holding that nullifies play
- declined penalty
- offsetting penalties
- dead-ball penalty after play
- automatic first down
- loss of down

## Special Teams

- made field goal
- missed field goal
- blocked field goal
- extra point made
- extra point missed
- two-point conversion
- punt
- punt return
- blocked punt
- kickoff
- kickoff return TD
- touchback

## Game / Drive

- red-zone trip counted once
- drive result touchdown
- drive result field goal
- turnover drive
- end-half drive
- time of possession
- third-down conversion
- fourth-down conversion

## Reconciliation Invariants

These should run after every game.

```text
score equals scoring plays
total offense equals passing + rushing
team pass attempts equals player pass attempts
team completions equals player completions
team passing yards equals player passing yards
team rushing yards equals player rushing yards + team rushing yards
team passing TD equals player passing TD
team rushing TD equals player rushing TD
team turnovers equals INT thrown + fumbles lost
first downs total equals rushing + passing + penalty
special teams yards do not count as total offense
penalty yards do not count as total offense
return yards do not count as total offense
season totals equal sum of game totals
career totals equal sum of season totals
```

## Impossible States

Flag as errors:

- negative pass attempts
- completions > attempts
- receiving yards not equal passing yards, except explicit special cases
- points without scoring play
- scoring play without points
- player credited for stat but not on either team
- possession team and defense team same
- down outside 1-4
- yardsToGoal outside valid range
- penalty yards credited as total offense
- return yards credited as passing/rushing yards
- same play has both made FG and offensive TD
- turnover without possession change, unless fumble recovered by offense
- two teams both credited with same points
- duplicate play IDs

## Scenario Tests

Create full mini-games or drives.

### Scenario: Normal TD Drive

- rush 4
- completed pass 11
- incomplete
- rush 8
- passing TD 22

Expected:
- score 7 after XP
- drive yards 45
- pass/rush stats reconcile

### Scenario: Sack and Punt

- sack -8
- incomplete
- short completion
- punt

Expected:
- sack charged correctly
- negative rushing yards
- no pass attempt on sack
- punt stats separate

### Scenario: Penalty Nullifies TD

- completed pass TD
- offensive holding no-play/nullified

Expected:
- no passing/receiving TD
- no score
- penalty yards
- replay/enforced down state

### Scenario: Interception Return TD

Expected:
- QB attempt and INT
- defender INT and return TD
- defense points
- no offensive yards

### Scenario: Kickoff Return TD

Expected:
- special teams TD
- return yards
- no offensive yards

## Long-Run Tests

After 1 season:

- no reconciliation errors
- top stat lines plausible
- no duplicated games
- season totals equal game sums

After 5 seasons:

- leaderboards plausible
- records update
- no stat inflation
- scheme shapes visible

After 20 seasons:

- draft/awards input plausible
- school identities emerge
- no statistical collapse

## Test Acceptance

Stats engine packet cannot pass without:

- unit tests for all implemented play types
- reconciliation tests
- save/load tests for game stats
- season aggregation tests
- at least one scenario test
