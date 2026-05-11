# 40 — Next Core Build Packets and Ready Prompts

## Purpose

This file turns specs 28–39 into implementation packets.

Use these after the Stats Engine pack is accepted.

---

# PLAYGEN Packets

## PLAYGEN-1 — Game State, Clock, Field, Drive Model

Deliver:

- GameState
- GameClock
- FieldPosition/yardsToGoal
- Drive
- game state transition helpers
- tests

Acceptance:

- valid down/distance
- clock transitions
- field position transitions
- drive start/end
- scoring updates

## PLAYGEN-2 — Situation Classifier

Deliver:

- down/distance bucket
- field zone
- clock state
- score state
- game phase
- tests

Acceptance:

- situations classify correctly
- reason codes exist

## PLAYGEN-3 — Offensive Play Selector

Deliver:

- play family selection
- game plan input
- scheme tendency input
- down/distance logic
- clock/score logic
- tests

Acceptance:

- 3rd and long produces more passes
- goal line produces appropriate calls
- trailing late changes aggressiveness

## PLAYGEN-4 — Defensive Response Selector

Deliver:

- front/coverage/pressure response
- defensive scheme input
- situation logic
- tests

Acceptance:

- loaded box vs short yardage
- prevent late
- blitz profile varies by coach/scheme

## PLAYGEN-5 — Basic Outcome Resolver

Deliver:

- run outcome
- pass outcome
- sack
- turnover
- penalty hook
- structured PlayEvent output
- tests

Acceptance:

- valid PlayEvents
- seed deterministic
- no box score invention

## PLAYGEN-6 — Stats Engine Integration

Deliver:

- PlayEvents feed accumulator
- box score from stats
- game simulation loop
- reconciliation
- tests

Acceptance:

- simulated game creates plays
- final score equals scoring plays
- box score reconciles

---

# MATCHUP Packets

## MATCHUP-1 — Attribute Registry

Deliver:

- attribute definitions
- groups
- position relevance
- tests

## MATCHUP-2 — Matchup Score Utilities

Deliver:

- normalize ratings
- weighted matchup
- fatigue/morale/weather modifiers
- reason codes
- tests

## MATCHUP-3 — Passing Matchups

Deliver:

- pass protection vs rush
- separation vs coverage
- QB decision/accuracy
- catch/YAC
- tests

## MATCHUP-4 — Rushing Matchups

Deliver:

- OL/front
- RB vision/finish
- tackling
- yards bucket
- tests

## MATCHUP-5 — Special Teams Matchups

Deliver:

- kicking
- punting
- returns
- weather/pressure
- tests

---

# DEVELOPMENT Packets

## DEV-1 — Development Profile and Tick

Deliver:

- development profile
- weekly tick
- offseason tick
- tests

## DEV-2 — Practice Time Unit System

Deliver:

- practice plan
- ruleset cap
- category allocation
- intensity
- tests

## DEV-3 — Team Vibe

Deliver:

- team vibe object
- component calculation
- effects
- tests

## DEV-4 — Pep Talks and Meetings

Deliver:

- meeting object
- tone/reaction model
- morale/vibe effects
- tests

## DEV-5 — Position Change System

Deliver:

- position change recommendation
- training progress
- success/failure
- tests

---

# RECRUITING Packets

## REC-1 — Prospect Lifecycle Generator

Deliver:

- FR/SO/JR/SR pools
- tiered detail
- star distributions
- tests

## REC-2 — Prospect Evolution

Deliver:

- high school development
- rankings movement
- late bloomer/stagnation/regression
- tests

## REC-3 — Scouting Confidence

Deliver:

- scouted ranges
- staff evaluation
- confidence changes
- tests

## REC-4 — Interest Engine

Deliver:

- preference-weighted interest
- reason codes
- tests

## REC-5 — Visits, Pitches, Promises

Deliver:

- visit outcomes
- pitch fit
- promises
- tests

## REC-6 — Commit, Decommit, Sign

Deliver:

- commitment states
- flip risk
- signing
- prospect-to-player conversion
- tests

## REC-7 — AI Recruiting

Deliver:

- AI needs map
- AI board
- AI offers/visits
- AI signing class
- tests

---

# AI School Packets

## AISCHOOL-1 — AI Program Profile

## AISCHOOL-2 — Roster Needs AI

## AISCHOOL-3 — AI Depth Chart

## AISCHOOL-4 — AI Portal Use

## AISCHOOL-5 — AI Staff Decisions

## AISCHOOL-6 — AI Program Trajectory / Identity

---

# NIL Packets

## NIL-1 — NIL Market Value

## NIL-2 — NIL Deal Object

## NIL-3 — Clearinghouse Review

## NIL-4 — Booster Segments

## NIL-5 — Locker Room Economics

## NIL-6 — Direct Benefits

---

# Portal Packets

## PORTAL-1 — Transfer Risk

## PORTAL-2 — Portal Window

## PORTAL-3 — Retention Meetings

## PORTAL-4 — Portal Search/Recruiting

## PORTAL-5 — AI Portal Behavior

---

# Draft Packets

## DRAFT-1 — Draft Candidate Model

## DRAFT-2 — Draft Grade

## DRAFT-3 — Declaration Logic

## DRAFT-4 — Draft Results

## DRAFT-5 — Pipeline Feedback

## DRAFT-6 — Draft Validation

---

# Data Pipeline Packets

## DATA-1 — Source Registry

## DATA-2 — CFBD Games/Plays Pull

## DATA-3 — Stat Target Builder

## DATA-4 — Recruiting Target Builder

## DATA-5 — School Power Input Builder

## DATA-6 — Name Model Builder

## DATA-7 — Town Flavor Pipeline

## DATA-8 — Data Lab Target Loader

---

# Program Desk Packets

## DESK-1 — ProgramItem Model

## DESK-2 — Continue Preflight Registry

## DESK-3 — Continue Gate UI

## DESK-4 — Program Desk Overview

## DESK-5 — Staff Briefing Grouping

## DESK-6 — Delegation Policies

---

# Trait/Scouting Packets

## TRAIT-1 — Attribute Registry

## TRAIT-2 — Trait Cluster Definitions

## TRAIT-3 — Trait Derivation Engine

## TRAIT-4 — Scouting Report Payloads

## TRAIT-5 — Fallback Report Templates

## TRAIT-6 — LLM Provider Integration

---

# Awards/History Packets

## HIST-1 — Record Engine

## HIST-2 — Award Watch Engine

## HIST-3 — Season Awards

## HIST-4 — Coach/School History

## HIST-5 — Dynasty/Collapse Detection

## HIST-6 — Media Narrative Payloads

---

# Ready Prompt: PLAYGEN-1

```text
Implement PLAYGEN-1 — Game State, Clock, Field, and Drive Model.

Goal:
Create the foundational game state objects and transitions for structured play generation.

Deliver:
- GameState type
- GameClock type
- FieldPosition/yardsToGoal helpers
- Drive type
- startDrive/endDrive helpers
- advanceClock helper
- updateDownDistance helper
- tests

Hard rules:
- no stats credited here
- no text play-by-play here
- no UI code
- deterministic-friendly
- invalid down/distance rejected
- possession and defense cannot be same team

Acceptance:
- clock transitions tested
- field position transitions tested
- first down resets down/distance
- failed third down creates fourth down
- failed fourth down can create turnover on downs
- TD updates score through structured scoring state
```

# Ready Prompt: MATCHUP-2

```text
Implement MATCHUP-2 — Matchup Score Utilities.

Goal:
Create reusable utilities for turning 1-20 attributes into probability modifiers with reason codes.

Deliver:
- rating normalization
- weighted matchup score
- fatigue modifier
- morale/team vibe modifier
- weather modifier shell
- reason code builder
- tests

Hard rules:
- no outcome decisions yet
- no UI code
- no Math.random
- every utility returns reason codes

Acceptance:
- higher rating improves matchup score
- fatigue lowers score
- strong advantage creates positive reason code
- same inputs produce same outputs
```

# Ready Prompt: REC-4

```text
Implement REC-4 — Recruiting Interest Engine.

Goal:
Calculate recruit interest in each school using weighted preferences and school/recruit context.

Inputs:
- recruit preferences
- school structural power
- NIL alignment
- playing time opportunity
- development reputation
- coach relationship
- location fit
- scheme fit
- academics
- winning
- brand exposure
- family influence
- competitor pressure

Deliver:
- interest formula
- reason codes
- normalized score
- tests

Hard rules:
- NIL cannot be the only factor
- different recruits value different things
- reason codes required
- no UI code

Acceptance:
- money-focused recruit responds more to NIL
- development-focused recruit responds more to draft/development reputation
- location-focused recruit responds more to distance/home
- crowded depth chart lowers playing-time-focused recruit interest
```

# Ready Prompt: NIL-3

```text
Implement NIL-3 — NIL Clearinghouse Review.

Goal:
Review proposed NIL deals for realism and risk.

Deliver:
- market value estimate input
- risk score
- review status
- reason codes
- tests

Statuses:
- Approved
- ApprovedWithScrutiny
- DelayedReview
- Flagged
- Denied

Hard rules:
- high NIL can be approved if justified
- absurd low-profile deal should be flagged or denied
- denial should be configurable/rare
- reason codes required

Acceptance:
- normal deal approved
- high but plausible star QB deal scrutinized
- absurd low-profile deal flagged
- timing/donor risk increases risk score
```
