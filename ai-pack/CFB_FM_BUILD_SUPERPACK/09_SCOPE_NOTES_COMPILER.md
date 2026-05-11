# Scope Notes Compiler

This document captures the user's expanding design ideas in organized form.

It should be treated as active design input.

---

# Recruiting Timeline

Recruiting starts before senior year.

Prospect lifecycle:

```text
Freshman: background/hidden pool
Sophomore: early identification, very low confidence
Junior: active recruiting begins
Senior: commitment/signing pressure
```

Prospects can:

- develop
- stagnate
- regress
- transfer high schools
- change positions
- rise in rankings
- fall in rankings
- be overrated
- be underrated

Recruiting must feel like projecting future players, not shopping for final ratings.

---

# Development Is The Core Game

The game is about:

```text
choosing the right players
developing them
fitting them to your play style
building a program identity
```

Multiple paths to win must exist:

- blue-chip talent machine
- development factory
- scheme edge
- defensive identity
- high-tempo chaos
- portal mercenary model
- walk-on/local pipeline model
- NIL superpower
- culture program
- NFL factory

No single strategy should dominate every 20-year sim.

---

# Realistic Talent Distribution

The number of high-overall players across the league must match reality.

Recruiting class defaults should approximate:

```text
~32 five-stars
~300 four-stars
~1500 three-stars
large background pool of two-stars/unranked
```

Not all background players need full simulation.

Use detail tiers:

```text
Tier 1: nationally relevant prospects
Tier 2: FBS recruitable prospects
Tier 3: regional/depth prospects
Tier 4: generated if discovered
Tier 5: statistical background pool
```

Validation reports must track:

- number of elite players
- number of 16+ rating players
- number of 18+ rating players
- draftable player counts
- blue-chip concentration
- walk-on breakout rate
- 3-star breakout rate
- 5-star bust rate

---

# NIL-Era Roster Economics

Scholarships are not the main limiter anymore.

Separate roster currencies:

- roster spot
- scholarship status
- NIL value
- direct benefit allocation
- playing time
- development attention
- trust/promises
- academic fit
- draft exposure

A walk-on can make NIL money.

Scholarship status does not equal economic value.

---

# NIL Clearinghouse

The game needs a mock clearinghouse for deals that are too high or suspicious.

Statuses:

- Approved
- Approved with scrutiny
- Delayed review
- Flagged
- Denied

Inputs:

- player market value
- proposed amount
- position
- school market size
- donor base
- local business strength
- social/media value
- comparable deals
- booster risk
- timing
- repeated patterns

The clearinghouse should create friction, not always punishment.

---

# School Power Must Be Causal

SEC-type schools or current powers should not be great forever because of labels.

They should start with advantages because of modeled causes:

- alumni base
- donor base
- facilities
- recruiting geography
- NFL pipeline
- conference prestige
- media exposure
- fan intensity
- staff budget
- NIL market
- tradition
- recent success

If these erode, they fall.

If another school builds these, it rises.

---

# Draft As Calibration Tool

The draft should reflect real-life style output.

It is not just flavor. It validates the sim.

Track:

- draft picks by school
- draft picks by conference
- first-rounders
- position distribution
- P4 vs G5
- late bloomers
- busts
- NFL pipeline concentration

Draft logic should consider:

- ability
- athletic traits
- production
- competition level
- position value
- size thresholds
- injuries
- age/class
- school NFL reputation
- visibility

---

# Practice Strategy

Practice must matter.

Use weekly time units from ruleset.

Practice categories:

- fundamentals
- strength and conditioning
- film study
- position technique
- scheme install
- opponent prep
- special teams
- recovery
- academics
- leadership/culture

Intensity:

```text
Light
Normal
Intense
Extreme
```

Effects:

- development
- injury risk
- fatigue
- morale
- readiness
- team vibe

Users can fully control, semi-control, or delegate.

---

# Team Vibe

Team Vibe is an overall team culture/chemistry state.

Components:

- average morale
- leadership
- coach trust
- winning momentum
- conflict
- fatigue
- broken promises
- locker room chemistry

Effects:

- clutch performance
- transfer risk
- practice quality
- development
- negative event frequency
- recruit perception

---

# Pep Talks and Meetings

FM-like pep talks should exist.

Types:

- pre-game
- halftime
- post-game
- weekly team meeting
- crisis meeting
- position group meeting
- 1-on-1 player meeting

Tones:

- calm
- assertive
- aggressive
- passionate
- supportive
- disappointed
- demanding
- confident
- inspirational

Player reactions depend on:

- personality
- coach relationship
- confidence
- pressure handling
- recent performance
- role satisfaction

Pep talks can help or hurt.

---

# College Town Immersion

Every college town should feel distinct.

Town profile fields:

- landmarks
- food culture
- game day identity
- rivalry flavor
- local memes
- weather profile
- town size
- campus appeal
- nightlife
- fan intensity
- local pride

Immersion should affect:

- recruiting visits
- player homesickness
- player location fit
- morale
- fan pressure
- commentary
- media flavor

Use curated/crowdsourced/scraped data, but compress it to high-signal content.

Avoid massive lore dumps.

---

# Trait Cluster Labels

Scouting should describe players with labels derived from attributes.

Example:

```text
late-developing / gym rat / studious / gamer / bad hips
```

Labels must be derived from structured data.

Categories:

- development curve
- work/preparation
- competitive/mental
- body/movement
- football IQ
- personality/retention
- role/scheme
- risk

LLMs can convert labels into prose, but cannot invent labels or facts.

---

# Customization

User wants:

- custom conferences
- custom school creator
- create player
- create coach
- dynasty mode
- career mode
- stadium builder
- uniform designer
- play designer
- offensive tempo strategies
- AI-generated graphics
- 8-bit style fight songs eventually

Creator tools must use the same systems as normal game objects.

No creator output should be cosmetic-only unless explicitly marked cosmetic.

---

# UI Clickability

FM feel comes from clickability.

Hard rules:

- every player name clickable
- every recruit clickable
- every school clickable
- every staff member clickable
- every trait label clickable
- every town/city clickable if meaningful
- every report source clickable
- every stat drillable if possible
- breadcrumbs/back navigation
- hover cards
- comparison panels

Example chain:

```text
Recruit -> Trait Label -> Similar Player -> Old Recruiting Class -> Staff Evaluator -> Region -> High School -> Other Prospects
```

This is the feel to capture.

---

# Play-by-Play First

No visual sim first.

Start with structured play-by-play.

The sim engine creates facts:

- down
- distance
- clock
- field position
- play type
- result
- yards
- players involved
- pressure
- coverage
- concept
- turnover
- penalty

Text is generated by templates or LLM.

Real play-by-play data can be used to calibrate tendencies and language patterns.

---

# LLM Immersion

Use LLM for:

- scouting reports
- staff voice
- media questions
- commentary phrasing
- town flavor
- recruit dialogue
- player meetings

Do not use LLM for:

- ratings
- outcomes
- injuries
- commitments
- NIL approvals
- money
- discipline facts

LLM is flavor. Simulation is truth.
