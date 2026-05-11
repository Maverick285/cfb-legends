# College Football Legends — Football Simulation Engine Realism Roadmap

## Purpose

This document captures the practical simulation-engine strategy for building a realistic American football dynasty-management game, especially for a creator who cares about coaching immersion and football truth rather than simply shipping the smallest possible MVP.

The central question is:

> How do we build toward a serious, immersive, coach-realistic football simulation without pretending we can immediately reproduce decades of studio-scale engine work?

The answer is not to avoid realism. The answer is to build realism in layers, prove each layer with tests, and use football’s discrete play structure to our advantage.

---

# 1. The Core Reality

A mature match engine like Football Manager or Madden may involve massive amounts of code and thousands of hours of human tuning. That does not mean a solo creator can reproduce it immediately.

But it also does not mean realism is impossible.

The key is to avoid thinking of the engine as one monolithic “match engine.” Instead, build it as a set of testable layers:

```text
Game
  → Drive
    → Situation
      → Personnel
        → Formation
          → Concept
            → Defensive Call
              → Conflict Resolver
                → Outcome
                  → Explanation
                    → Stats / Consequences
```

The objective is not to simulate 22 bodies in full physical detail from day one. The objective is to simulate the **football conflicts that decide a play**.

---

# 2. Why Football Is More Feasible Than Soccer

Football is still complex because there are 22 players on the field, but football has one huge advantage over soccer:

> Football is naturally divided into discrete plays.

A football game can be modeled as:

```text
Pre-snap state
→ play call
→ alignment
→ assignment conflict
→ play result
→ new down/distance/clock/field position
```

That makes football easier to decompose than soccer, where the game is continuous, fluid, and state changes constantly.

A football sim can start as a sequence of play-resolution events, then grow more sophisticated over time.

---

# 3. What Could Possibly Use Millions of Lines of Code?

A mature sports engine may include code for:

1. Core simulation logic
2. Tactical AI
3. Player decision-making
4. Player positioning
5. Physics / collision / ball movement
6. Animation selection
7. Rendering hooks
8. Camera logic
9. Commentary hooks
10. Statistics tracking
11. Injury/fatigue systems
12. Morale/confidence effects
13. Referee/penalty logic
14. Weather/field effects
15. Substitution logic
16. Opponent AI
17. Difficulty balancing
18. Save/load compatibility
19. Debug tooling
20. Test harnesses
21. Legacy compatibility
22. Years of edge-case fixes

A huge mature engine is not just clean core logic. It is also accumulated scar tissue: patches, compatibility, debug tools, presentation glue, legacy behaviors, special cases, and balancing systems.

For this project, the early goal is not to reproduce all of that. The early goal is to build a football-specific play resolver that can grow.

---

# 4. The Engine Should Be Coach-Realistic First

The first serious target should be:

> Can the engine explain football in a way that makes a former coach nod?

A bad engine says:

```text
Team A offense 87 vs Team B defense 81 = 6-yard gain
```

A better engine says:

```text
11 personnel, trips right, inside zone glance RPO
vs.
4-2-5 quarters, nickel apex removed, box count favorable

Pre-snap:
- QB identifies 5.5-man box.
- Apex LB is in conflict.
- Boundary safety depth reduces the glance window.

Post-snap:
- OL combo wins frontside A-gap.
- Apex fits run instead of widening.
- QB pulls and throws glance.
- WR release wins inside leverage.
- Result: 14-yard completion.
```

That kind of explanation is the real immersion layer.

---

# 5. The Three-Layer Match Engine

The match engine should have three separable layers.

## Layer 1 — Statistical Outcome

Produces:

- yards
- success/failure
- touchdown
- sack
- turnover
- penalty
- injury/fatigue effect
- clock movement
- field position change
- down/distance update

## Layer 2 — Football Explanation

Produces:

- why the play worked
- who won/lost
- what matchup mattered
- what schematic conflict mattered
- what tendency was punished
- which player or unit deserves credit/blame

## Layer 3 — Presentation Layer

Shows:

- drive chart
- play log
- key play card
- coach headset note
- film-room diagram
- postgame report
- momentum chart
- unit grades

The first two layers can be built before any live 2D or 3D visualization.

---

# 6. The Key Design Decision: Simulate Conflicts, Not All 22 Players Equally

Do not begin by trying to simulate all 22 players as autonomous agents with full physical movement.

That is how the project drowns.

Instead:

> Model all 22 players as context. Resolve 3–6 decisive conflicts per play. Assign credit/blame to the relevant players. Update stats and explanations from those conflicts.

Example: Power vs. 4-2-5 over front.

Key conflicts:

1. Down block vs. 3-tech
2. Puller kickout vs. edge
3. Playside LB fit
4. Safety alley support

The play result can come from how those conflicts resolve.

Example: Smash concept vs. Cover 2.

Key conflicts:

1. Corner squat discipline vs. hitch
2. Safety width/depth vs. corner route
3. QB read/timing
4. WR route leverage
5. Pass protection duration

The backside X receiver does not need to be deeply simulated unless the QB progresses there or the defensive rotation makes him relevant.

---

# 7. Core Engine Architecture

Recommended architecture:

```text
/engine
  /concepts
    offensiveConcepts.json
    defensiveCalls.json
    fronts.json
    coverages.json
  /ratings
    playerRatings.ts
    schemeFit.ts
  /sim
    playResolver.ts
    driveResolver.ts
    gameResolver.ts
    playCaller.ts
    gameState.ts
  /explain
    playExplanation.ts
    filmNoteGenerator.ts
    gameReport.ts
  /calibration
    runBatchSim.ts
    statTargets.ts
    compareToTargets.ts
  /tests
    footballTruth.test.ts
    statCalibration.test.ts
```

The calibration harness matters as much as the resolver. Without it, the engine is just a theory.

---

# 8. Personnel Layer

The offense selects personnel groupings such as:

```text
10 personnel
11 personnel
12 personnel
21 personnel
empty
heavy
goal line
```

Defense answers with packages such as:

```text
4-2-5 nickel
4-3
3-4
3-3-5
dime
goal line
hybrid/multiple
```

Personnel affects:

- box count
- run strength
- pass matchups
- substitution stress
- defensive comfort
- fatigue
- tempo constraints
- formation flexibility

---

# 9. Formation Layer

Offensive formations may include:

```text
2x2
3x1 trips
bunch
stack
empty
pistol
gun offset
under center
TE wing
nub TE
```

Defensive structures may include:

```text
over
under
tite
bear
mint
even
odd
split safety
middle closed
press
off
```

This layer creates the pre-snap structure and determines the first set of likely conflicts.

---

# 10. Concept Layer

Offensive calls should eventually be concept-based, not merely “run” or “pass.”

## Run Concepts

- inside zone
- outside zone
- duo
- power
- counter
- pin-pull
- split zone
- bash
- GT counter
- QB draw
- speed option

## Pass Concepts

- stick
- spacing
- mesh
- shallow
- dagger
- drive
- smash
- flood
- four verticals
- Y-cross
- mills
- choice
- screens

## RPO / Play Action

- glance RPO
- bubble RPO
- stick RPO
- split zone glance
- power read
- PA boot
- PA deep shot

## Defensive Calls

- cover 1
- cover 2
- Tampa 2
- cover 3
- cover 4 quarters
- palms / 2-read
- cover 6
- match 3
- fire zone
- creeper
- simulated pressure
- man blitz
- robber

---

# 11. Concept Metadata

Every concept should carry metadata describing what it stresses, requires, punishes, and is vulnerable to.

Example offensive concept:

```ts
{
  concept: "glance_rpo",
  stresses: ["apex_defender", "box_count", "inside_leverage"],
  requiredSkills: ["qb_read", "wr_release", "ol_inside_zone"],
  vulnerableTo: ["cloud_corner", "robber", "fast_pressure"],
  punishes: ["overaggressive_lb", "single_high_rotation", "soft_box"]
}
```

Example defensive call:

```ts
{
  coverage: "quarters",
  strengths: ["vertical_match", "run_support_safeties"],
  weaknesses: ["rpo_conflict", "slot_leverage_stress"],
  requiredSkills: ["safety_read", "nickel_discipline", "lb_coverage"]
}
```

This is how plays become matchups of football ideas instead of generic rating checks.

---

# 12. Football-Specific Player Ratings

Generic ratings are not enough. The ratings should reflect real football roles.

## Quarterback

- arm strength
- short accuracy
- intermediate accuracy
- deep accuracy
- timing
- anticipation
- pocket movement
- pressure response
- pre-snap ID
- post-snap processing
- RPO read
- option mesh
- progression discipline
- scramble instinct
- ball security
- leadership
- confidence volatility

## Running Back

- vision
- burst
- contact balance
- patience
- one-cut ability
- gap discipline
- pass protection
- receiving
- ball security
- short-yardage power
- outside-zone fit
- inside-zone fit
- counter/power fit

## Wide Receiver / Tight End

- release
- route running
- leverage understanding
- hands
- contested catch
- YAC
- blocking
- option-route intelligence
- vertical speed
- spacing discipline
- red-zone feel

## Offensive Line

- run block power
- zone footwork
- combo timing
- reach block
- pull ability
- pass set
- anchor
- blitz pickup
- stunt recognition
- communication
- penalty discipline
- stamina

## Defensive Line / Edge

- get-off
- power
- bend
- hand usage
- gap discipline
- block destruction
- pass rush plan
- contain discipline
- motor
- run fit strength

## Linebacker

- run fit
- block shed
- pursuit angle
- tackling
- zone drop
- man coverage
- blitz timing
- play recognition
- eye discipline
- RPO discipline

## Defensive Back

- man coverage
- zone coverage
- match coverage
- press
- off technique
- ball skills
- tackling
- run support
- route recognition
- recovery speed
- communication

---

# 13. Scheme Fit Matters More Than Overall

A player should not merely be an “82 overall.”

He should be something like:

```text
82 overall
91 outside zone fit
74 gap-scheme fit
88 screen/YAC fit
62 pass protection
high volatility
slow learner
elite burst
bad ball security
```

That creates meaningful coaching decisions.

Examples:

- The best overall RB may not be the best back for duo/power.
- A tackle with high pass protection may not fit outside zone.
- A great man corner may be mediocre in quarters.
- A high-motor undersized edge may be productive in one system and exposed in another.

This is where immersion comes from.

---

# 14. Gameplanning Should Feel Like Coaching

User controls should feel coach-authentic.

## Offensive Plan

- personnel emphasis
- run/pass tendency
- tempo
- formation variety
- motion usage
- RPO usage
- play-action usage
- screen usage
- protection help
- target distribution
- shot-play frequency
- fourth-down aggressiveness
- red zone identity
- short-yardage identity

## Defensive Plan

- front structure
- box count philosophy
- coverage shell
- pressure frequency
- simulated pressure usage
- blitz source
- run fit philosophy
- spill vs box
- QB contain
- bracket star receiver
- disguise frequency
- tackling aggression
- rotation depth

## Practice Emphasis

- inside run
- pass protection
- blitz pickup
- tackling
- coverage communication
- red zone
- third down
- two-minute
- ball security
- special teams

These choices should produce consequences.

Example:

```text
You emphasized tempo and 11 personnel all week.
Result:
+ defense struggled to substitute
+ offense generated more snaps
- OL fatigue increased
- fourth quarter efficiency dropped
- backup WR mental bust caused interception
```

---

# 15. The Engine Should Produce Film Notes

Every game should generate notes that sound like a real coach watched the game.

Examples:

```text
Your offense created efficient early-down runs from 11 personnel because their nickel box stayed light. After halftime, they spun the strong safety down and forced you into longer third downs.

Your pass protection held up against four-man rush, but simulated pressures caused two protection busts from the right guard. The freshman QB was late identifying the nickel pressure and missed the hot route twice.

Defensively, your quarters structure handled vertical shots well, but your apex defenders were repeatedly conflicted by glance RPOs. Their QB made the correct pull/read decisions on 6 of 8 RPO opportunities.
```

This layer can create a lot of immersion before any advanced animation exists.

---

# 16. How to Know the Structure Works

Do not trust reasoning alone. Build tests.

The engine needs football-truth tests and calibration tests.

## Football-Truth Tests

### Test 1 — Box Count Sanity

```text
Inside zone should perform better against a 5-man box than a 7-man box, all else equal.
```

### Test 2 — Scheme Fit Sanity

```text
Outside zone should reward OL zone footwork more than raw power.
Duo/power should reward drive block, combo timing, and pull/kick ability more than lateral agility.
```

### Test 3 — Coverage Sanity

```text
Four verticals should stress quarters differently than Cover 3.
Stick/spacing should be more efficient against soft zone than tight man.
Mesh should punish man coverage more than spot-drop zone.
```

### Test 4 — RPO Sanity

```text
Glance RPO should punish apex/inside linebacker run conflict.
It should be less effective against disciplined conflict defenders or cloud/robber structures.
```

### Test 5 — Pressure Sanity

```text
Blitzing should increase pressure rate but also increase explosive-play risk.
Elite QBs should punish pressure better than low-processing QBs.
```

### Test 6 — Tempo Sanity

```text
Tempo should increase play count and substitution stress but increase fatigue and mental bust risk.
```

### Test 7 — Talent Sanity

```text
A great DL should create more negative plays.
A bad center should increase pressure, run stuffs, and protection busts.
A freshman QB should have more volatility.
```

## Statistical Calibration Tests

Over thousands of simulated games, outputs should land in believable ranges for:

- plays per game
- yards per play
- completion percentage
- sack rate
- explosive play rate
- turnover rate
- penalty rate
- red zone TD percentage
- third down percentage
- rush/pass split
- scoring distribution
- QB stat distribution
- RB carry distribution
- WR target distribution

---

# 17. Football Sim Laboratory v0.1

The next major technical deliverable should be:

```text
Football Sim Laboratory v0.1
```

It should run controlled scenarios like:

```text
Oklahoma 11 personnel spread, inside zone/glance RPO tendency
vs.
Texas 4-2-5 quarters, aggressive apex defenders
```

And output:

- 1,000 simulated drives
- success rate
- yards/play
- explosive rate
- turnover rate
- sack rate
- RPO pull rate
- top success reasons
- top failure reasons
- sample play notes
- stat distribution charts/tables

That is how the structure proves itself.

---

# 18. EA/Madden Lesson

Madden has produced plausible normal stats for years because football can be abstracted on a per-play basis.

The relevant lesson is not that Madden is perfect. It is that credible football sim can be generated from:

- playbooks
- ratings
- tendencies
- personnel
- formation
- situation
- probability tables
- per-play resolution

But Madden also shows the danger: even a mature sim can produce weird stats if the balance between playbook, player traits, scheme, and ratings is wrong.

The engine must balance:

```text
ratings
scheme
play call
situation
matchup
fatigue
morale/confidence
randomness
coach tendency
```

If any one factor dominates too much, the sim will feel fake.

---

# 19. Recommended Version Roadmap

## Version 0 — Statistical Baseline

Goal: produce believable box scores.

Uses:

- team ratings
- run/pass tendencies
- pace
- field position
- simple play types

Proves:

- scoring ranges
- stat ranges
- drive logic
- clock logic

## Version 1 — Concept-Based Play Engine

Goal: plays have football meaning.

Adds:

- personnel
- formations
- offensive concepts
- defensive calls
- fronts
- coverage structures
- matchup tags
- decisive conflicts

Proves:

- scheme logic
- concept interactions
- player fit
- play-level explanations

## Version 2 — Coach Gameplanning

Goal: user decisions matter.

Adds:

- weekly plan
- scouting report
- offensive/defensive tendencies
- adjustments
- practice emphasis
- personnel packages
- opponent coordinator tendencies

Proves:

- immersion
- strategic consequence
- replayability

## Version 3 — Film-Room Presentation

Goal: user sees why things happened.

Adds:

- play cards
- drive chart
- film notes
- postgame grades
- matchup explanations
- blame/credit assignment
- tendency reports

Proves:

- emotional payoff
- coaching feel
- narrative realism

## Version 4 — Visualized Plays

Only after the engine has football truth.

Could add:

- 2D dots
- formation diagrams
- route/fit overlays
- animated key plays
- live coaching decisions
- halftime adjustments
- sideline feedback

---

# 20. What Not to Build First

Do not begin with:

- real-time 3D player movement
- animation systems
- broadcast camera logic
- every NCAA rule
- giant playbook editor
- every concept ever invented
- perfect referee/penalty simulation
- full 22-man autonomous AI
- online multiplayer

Those can come later.

The first realism target is a concept-based, explainable, statistically calibrated play engine.

---

# 21. What to Build First

Build in this order:

1. Player rating schema
2. Team/scheme identity model
3. Offensive concept library
4. Defensive front/coverage library
5. Play situation model
6. Play resolver
7. Drive resolver
8. Game resolver
9. Football-truth tests
10. Calibration harness
11. Explanation generator
12. Game report generator
13. UI presentation layer

---

# 22. The Core Standard

The key test is not:

> Does the engine produce a number?

The real test is:

> Does the engine produce an outcome and explanation that a football coach recognizes as plausible?

If the answer is yes, the project is on the right path.

---

# 23. Bottom Line

Football’s down-by-down structure makes this more feasible than soccer. EA/Madden’s long-running franchise simulation proves that credible football statistics can be generated from play-by-play abstraction. But believable stat totals are not enough.

The architecture that has a real chance is:

```text
play-by-play
concept-based
matchup-driven
calibrated statistically
explainable in football language
tested against coach-sanity scenarios
```

That is how the project moves from “AI thought this sounded good” to “the engine actually behaves like football.”
