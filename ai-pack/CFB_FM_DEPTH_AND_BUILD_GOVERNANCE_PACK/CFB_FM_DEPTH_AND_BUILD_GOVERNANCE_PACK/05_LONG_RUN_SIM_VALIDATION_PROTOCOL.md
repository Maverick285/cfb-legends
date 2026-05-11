# Long-Run Simulation Validation Protocol

## Purpose

A sports management game can look correct for one week and become nonsense after ten seasons.

This document defines how to validate the simulation over time.

---

# Required Sim Runs

## Early Development

```text
1-season run
```

Purpose:

- check crashes
- check obvious impossible states
- check save/load
- check schedules
- check basic stats

## Functional Systems

```text
5-season run
```

Purpose:

- check player progression
- check recruiting cycles
- check roster churn
- check staff/finance drift
- check initial balance

## Mature Systems

```text
20-season run
```

Purpose:

- check dynasties
- check collapses
- check talent distribution
- check draft outputs
- check NIL inflation
- check school dominance
- check historical persistence

## Sandbox Stress

```text
100-season run
```

Purpose:

- identify deep model drift
- check performance
- check save size
- check long-term absurdities

---

# Required Exports

Each sim run should export:

```text
summary.json
schools.csv
players.csv
prospects.csv
recruiting_classes.csv
games.csv
standings.csv
draft.csv
nil_deals.csv
transfers.csv
injuries.csv
staff.csv
events.csv
anomalies.json
validation_report.md
```

---

# Validation Categories

## Recruiting

Track:

- five-star count
- four-star count
- three-star count
- recruit distribution by state
- recruit distribution by position
- signing class size
- blue-chip concentration
- late bloomer rate
- bust rate
- AI recruiting class quality
- user/AI class imbalance

Red flags:

- too many elite prospects
- one region dominates unrealistically forever
- AI schools ignore positions
- NIL always wins
- local geography irrelevant
- development reputation irrelevant
- five-stars never bust
- three-stars never become elite

## Player Development

Track:

- average attribute growth by class
- elite player count
- 16+ rating player count
- 18+ rating player count
- development by school
- development by staff quality
- development by facilities
- work-ethic effect
- injury regression
- walk-on breakout rate

Red flags:

- talent inflation
- every player improves
- nobody regresses
- hidden traits do not matter
- facilities/staff do not matter
- elite players become too common
- development factories do not emerge

## NIL and Roster Economics

Track:

- NIL deal size distribution
- average deal by position
- clearinghouse flag rate
- approval/denial rates
- walk-on NIL cases
- NIL impact on recruiting
- NIL impact on retention
- locker room jealousy events
- booster involvement

Red flags:

- every good recruit gets absurd money
- no deals are flagged
- too many deals are denied
- walk-ons never matter
- money is the only winning strategy
- NIL has no retention effect

## Transfers

Track:

- portal entries by year
- portal entries by position
- star player transfers
- retention success
- playing-time-driven transfers
- NIL-driven transfers
- coaching-change transfers
- homesickness/location transfers

Red flags:

- everyone transfers
- nobody transfers
- playing time irrelevant
- hidden preferences irrelevant
- user can talk everyone out of transferring
- AI schools cannot retain players

## Games

Track:

- points per game
- yards per play
- turnovers
- upset rate
- blowout rate
- close game rate
- home-field impact
- tempo impact
- scheme diversity
- injury impact
- strength vs wins correlation

Red flags:

- scores too high/low
- elite teams never lose
- underdogs win too often
- scheme does not matter
- tempo always superior
- home field irrelevant
- play-by-play does not match box score

## Draft

Track:

- picks by school
- picks by conference
- first-rounders
- position distribution
- G5 picks
- late bloomer picks
- five-star hit rate
- three-star breakout rate
- school NFL pipeline effect

Red flags:

- same schools dominate forever without causal reasons
- G5 never produces draft picks
- production irrelevant
- traits irrelevant
- school reputation dominates too much
- draft count too high/low

## Schools and Dynasties

Track:

- win distribution
- playoff appearances
- conference titles
- school prestige movement
- donor growth/decline
- facility growth
- recruiting geography effects
- dynasties
- collapses

Red flags:

- SEC/current powers are permanently great by label
- structural school power never changes
- facilities do not matter
- donor base does not matter
- local talent geography does not matter
- no new powers emerge

---

# Validation Report Template

```markdown
# Validation Report

## Run Info

Seed:
Seasons:
Ruleset:
Balance preset:

## Pass / Fail Summary

## Major Anomalies

## Recruiting Distribution

## Player Development

## NIL / Clearinghouse

## Transfers

## Games

## Draft

## School Power / Dynasties

## Impossible States

## Exploit Risks

## Recommended Balance Changes

## Regression Tests To Add
```

---

# Acceptance Gates

## 1-Season Gate

Must pass before playable alpha.

## 5-Season Gate

Must pass before calling any core system functional.

## 20-Season Gate

Must pass before beta.

## 100-Season Gate

Optional but valuable for sandbox/balance maturity.

---

# The Truth Serum Rule

If a feature cannot be evaluated in a headless run, it is probably not really part of the simulation.

Exceptions:

- pure UI preferences
- purely cosmetic assets
- manual creator tools

Everything else should affect exported long-run data.
