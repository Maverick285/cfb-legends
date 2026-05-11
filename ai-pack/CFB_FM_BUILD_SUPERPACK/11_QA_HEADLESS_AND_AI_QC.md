# QA, Headless Simulation, and AI QC

## Purpose

The game is too complex to test manually.

Testing must be built into the architecture.

## QA Stack

1. unit tests
2. integration tests
3. invariant tests
4. scenario tests
5. statistical validation
6. headless sim runner
7. replay/event log
8. AI QC reports

---

# Invariants

These must never happen:

- duplicate player IDs
- player on two rosters
- negative eligibility
- impossible redshirt state
- team plays itself
- duplicate game in same week
- recruit signs with two schools
- NIL deal approved with missing entity
- team over hard roster cap if ruleset forbids
- player has invalid position
- event action references missing actor
- Continue passes blocking event
- save/load changes state

---

# Scenario Tests

Create scenario fixtures:

```text
qb_injury_depth_chart
top_recruit_rival_push
nil_deal_flagged
player_transfer_risk
redshirt_limit_warning
staff_poached
practice_extreme_fatigue
custom_conference_schedule
pep_talk_backfires
late_bloomer_rises
```

Each scenario defines:

- setup
- actions
- expected outcomes

---

# Statistical Validation

After multi-season sims, validate:

## Recruiting

- five-star count
- four-star count
- three-star count
- blue-chip concentration
- late-bloomer rate
- bust rate

## Player Development

- elite player counts
- average attribute growth
- regression rate
- walk-on breakout rate
- development by school

## Games

- points per game
- yards per game
- upset frequency
- undefeated teams
- blowout frequency
- close game frequency

## Draft

- picks by school
- picks by conference
- first-round count
- position distribution
- G5 representation

## Finance/NIL

- NIL deal sizes
- flagged deal rate
- donor influence
- budget health

## Transfers

- portal volume
- star transfers
- retention success
- position imbalance

---

# Headless Runner

Eventually support:

```bash
npm run sim -- --seed 123 --seasons 1
npm run sim -- --seed 123 --seasons 20
npm run sim -- --seed 123 --scenario nil_deal_flagged
```

Output:

```text
sim_runs/
  seed_123/
    summary.json
    teams.csv
    players.csv
    recruiting.csv
    games.csv
    draft.csv
    nil.csv
    anomalies.json
    qc_report.md
```

---

# AI QC Prompt

Use this after exporting a sim run.

```text
You are QA director for a college football management simulation.

Review the exported sim run.

Find:
- impossible states
- unrealistic outputs
- boring loops
- bad incentives
- AI school mistakes
- statistical outliers
- repeated events
- missing consequences
- places where the game feels fake

For each issue:
1. severity
2. evidence
3. likely system
4. proposed fix
5. regression test
```

---

# Replay System

Every action should be logged:

```json
{
  "tick": "2031-WEEK-07",
  "actor": "school_ou",
  "action": "offer_scholarship",
  "target": "prospect_123",
  "before": {},
  "after": {}
}
```

Goal:

```text
No ghost bugs.
```

If a weird state happens, replay the log.

---

# QA Acceptance

The QA system is acceptable when:

- one-season headless sim works
- invariant suite runs
- at least 10 scenarios exist
- statistical report exports
- AI QC package exports
- save/load round-trip test exists
- replay log exists
