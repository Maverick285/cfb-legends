# 24_TRAIT_ARCHETYPES_CREATORS_AND_ADVANCED_IDENTITY_SYSTEMS.md

## Purpose

This document expands several major identity, immersion, and creation systems for the CFB-FM project:

1. Trait cluster labels and scouting language
2. LLM-driven report freshness without hallucinated facts
3. Create-a-player, create-a-coach, and creator tools
4. Dynasty mode and career mode
5. Stadium builder
6. Uniform designer
7. Play designer and offensive/defensive strategy systems
8. Tempo identity and tactical philosophy
9. Integration rules across recruiting, development, scouting, media, and game simulation

The goal is to make the game feel alive, personalized, and endlessly replayable while still grounded in deterministic simulation logic.

The player should feel like every recruit, coach, school, stadium, uniform set, scheme, and dynasty has a distinct identity.

---

# Part I — Trait Cluster System

## North Star

The game should not describe players only through raw attributes.

A real scouting report does not say:

```text
Work Ethic: 17
Coachability: 15
Hip Fluidity: 6
Development Curve: Late
```

It says something like:

```text
Late-developing gym rat with strong study habits and real competitive fire, but he has stiff hips and may struggle changing direction in space.
```

The game needs both:

1. structured attributes for the sim engine, and
2. human-readable trait clusters for immersion.

The trait cluster system turns raw attributes into meaningful labels.

## Design Principle

Trait labels are **derived descriptions**, not separate truth.

The source of truth remains:
- attributes
- hidden traits
- development curve
- body profile
- medical/injury profile
- personality weights
- scouting confidence
- staff bias
- role/scheme context

Labels are generated from those facts.

This prevents the LLM from inventing player qualities.

---

# Part II — Trait Cluster Categories

Every player/prospect can have multiple clustered descriptors.

Example:

```text
late-developing / gym rat / studious / gamer / stiff-hipped
```

These labels should be built from modular cluster families.

## 1. Development Curve Labels

Derived from:
- age/class
- physical maturity
- potential gap
- growth rate
- work ethic
- frame
- late-bloomer flag
- high school development quality

Labels:

```text
Early Bloomer
Late Developer
Late Bloomer
Raw Tools Prospect
Physically Maxed
Technique-Dependent
Slow Burn
Fast Starter
Boom/Bust
High Floor
High Ceiling
Low Floor
Ready-Made Contributor
Multi-Year Project
Senior-Year Riser
Camp Riser
Underdeveloped Frame
```

### Example Rules

```text
Late Developer:
- truePotential high
- currentAbility modest
- frame still developing
- workEthic >= 12
- physicalMaturity <= 45
```

```text
Physically Maxed:
- current physical attributes high
- frame growth remaining low
- potential gap modest
```

---

## 2. Work/Preparation Labels

Derived from:
- work ethic
- practice effort
- coachability
- film study
- academic discipline
- consistency
- staff reports

Labels:

```text
Gym Rat
Film Junkie
Studious
Practice Player
Self-Starter
Coach's Favorite
Low-Maintenance Worker
Needs Pushing
Coasts on Talent
Inconsistent Worker
High-Variance Practice Player
```

### Example Rules

```text
Gym Rat:
- strength/conditioning improvement tendency high
- workEthic >= 16
- practiceEffort >= 15
- discipline >= 11
```

```text
Studious:
- filmStudy >= 15
- academicDiscipline >= 12
- footballIQ growth rate above average
```

---

## 3. Competitive / Mental Labels

Derived from:
- competitiveness
- pressure
- big-game nerve
- composure
- aggression
- resilience
- leadership

Labels:

```text
Gamer
Big-Game Player
Quiet Competitor
Alpha
Emotional Spark
Steady Hand
Confidence Player
Front-Runner
Needs Confidence
Volatile Competitor
Clutch
Shrinks Under Pressure
```

### Example Rules

```text
Gamer:
- bigGameNerve >= 15
- competitiveness >= 15
- consistency >= 11
- practice-to-game delta positive
```

```text
Confidence Player:
- performance strongly tied to morale/confidence
- pressure handling medium/low
```

---

## 4. Physical Body / Movement Labels

Derived from:
- height
- weight
- frame
- speed
- agility
- hip fluidity
- bend
- explosiveness
- flexibility
- injury history

Labels:

```text
Long Frame
Compact Build
Thick Lower Half
Twitchy
Linear Athlete
Fluid Mover
Stiff-Hipped
Bad Hips
High-Cut
Explosive First Step
Heavy Feet
Flexible
Poor Bend
Natural Bender
Frame to Add Weight
Maxed-Out Frame
Durability Concern
```

### Example Rules

```text
Bad Hips:
- hipFluidity <= 6
- changeOfDirection <= 8
- position requires lateral movement
```

```text
Linear Athlete:
- speed high
- acceleration high
- changeOfDirection low/medium
- hipFluidity low/medium
```

---

## 5. Football IQ / Processing Labels

Derived from:
- awareness
- processing
- decision-making
- play recognition
- assignment discipline
- film study
- position-specific IQ

Labels:

```text
Quick Processor
Slow Processor
Assignment Sound
Instinctive
See-Ball-Get-Ball
Freelancer
Overthinker
Anticipatory
System-Dependent
Playbook Sponge
Mental Bust Risk
```

---

## 6. Personality / Retention Labels

Derived from:
- loyalty
- ambition
- money sensitivity
- location preference
- relationship dependence
- playing-time sensitivity
- family influence
- transfer openness
- NIL value preference

Labels:

```text
Money-Motivated
Development-Focused
Homebody
Location-Sensitive
Playing-Time Driven
Relationship Recruit
Brand Builder
NFL-Or-Bust
Loyal Program Guy
Portal Risk
Family-Led Decision
Low Drama
High Maintenance
Needs Clear Role
```

### Example Rules

```text
Money-Motivated:
- money preference >= 0.75
- NIL sensitivity high
- brand exposure preference medium/high
```

```text
Development-Focused:
- proDevelopment preference >= 0.75
- NFL ambition high
- money preference not overriding
```

---

## 7. Role / Scheme Labels

Derived from:
- attributes
- archetype
- scheme fit
- position projection
- body type
- football IQ

Labels:

```text
Air Raid Fit
RPO Fit
Power Run Fit
Zone Run Fit
Option Fit
Nickel Defender
Box Safety
Field Corner
Boundary Corner
Space Backer
Edge Projection
Interior Projection
Developmental Tackle
Slot Weapon
Gadget Player
Special Teams Floor
```

---

## 8. Risk Labels

Derived from:
- injury
- academics
- hidden traits
- development volatility
- scouting uncertainty
- retention risk
- off-field profile

Labels:

```text
Academic Risk
Injury Risk
Transfer Risk
Bust Risk
Character Question
High Variance
Low Certainty Evaluation
Scheme Risk
Position Projection Risk
Medical Red Flag
Compliance Watch
```

Use carefully. Avoid making this feel sensational or arcade-like.

---

# Part III — Trait Cluster Engine

## Trait Cluster Object

```json
{
  "id": "trait_cluster_gym_rat",
  "label": "Gym Rat",
  "category": "Work/Preparation",
  "visibility": "scouted",
  "confidence": 0.72,
  "source": "derived",
  "evidence": [
    "High work ethic",
    "Strong practice effort",
    "Strength gains over two evaluation periods"
  ],
  "positive": true,
  "gameplayEffects": [
    "Improved development response to strength training",
    "Lower risk of practice-effort events"
  ]
}
```

## Visibility Levels

Trait labels should not all be visible.

```text
Public
Scouted
Staff Opinion
Hidden
Debug Only
```

Examples:
- “Long Frame” may be public.
- “Gym Rat” may require scouting.
- “Money-Motivated” may require relationship depth.
- “Portal Risk” may be staff opinion.
- “Low Loyalty” should generally be hidden.

## Confidence

Each label should have confidence.

Example:

```text
Possible late bloomer
Staff believes he is a gym rat
Strong evidence of stiff hips
Unclear competitiveness
```

Confidence depends on:
- scouting depth
- staff quality
- staff bias
- time known
- number of reports
- player consistency
- data quality

## Staff Bias

Different staff can label the same player differently.

Example:

```text
WR Coach:
Raw but explosive slot weapon.

Recruiting Director:
High-variance athlete with real bust risk.

Strength Coach:
Frame can carry 20 more pounds.
```

This is good. It makes the user decide whom to trust.

---

# Part IV — LLM Scouting Report Layer

## North Star

The LLM should make reports feel fresh, human, and varied.

The LLM must never create truth.

It should only convert structured data into natural language.

## Grounded Report Payload

Before calling an LLM, build a structured payload:

```json
{
  "playerName": "Darius McClain",
  "position": "QB",
  "classYear": 2032,
  "scoutConfidence": 0.58,
  "visibleTraits": [
    "Late Developer",
    "Gym Rat",
    "Studious",
    "Gamer",
    "Bad Hips"
  ],
  "scoutedRatings": {
    "throwPower": {"low": 13, "high": 17},
    "processing": {"low": 8, "high": 13},
    "mobility": {"low": 10, "high": 15}
  },
  "staffOpinions": [
    {
      "staffRole": "QB Coach",
      "opinion": "Likes competitiveness and work habits but worries about lower-body mechanics."
    }
  ],
  "riskLabels": [
    "Position Projection Risk"
  ],
  "forbiddenClaims": [
    "injury",
    "commitment",
    "NIL amount",
    "academic violation"
  ]
}
```

## LLM Output Rules

The LLM may write:

```text
McClain reads like a late-developing, high-effort quarterback prospect. The staff likes the way he competes and studies, but there are real questions about whether his movement skills translate outside of structure.
```

The LLM may not write:

```text
He tore his ACL last year.
```

unless the payload includes that fact.

## Report Types

### Recruiting Report

Sections:
- Summary
- What We Like
- What Worries Us
- Scheme Fit
- Development Plan
- Recruiting Angle
- Staff Split
- Final Recommendation

### Player Development Report

Sections:
- Progress
- Practice Habits
- Attribute Movement
- Role Fit
- Morale/Buy-In
- Next Development Focus

### Portal Report

Sections:
- Why Available
- Fit
- Cost/Risk
- Retention Risk
- Expected Role
- Recommendation

### Draft Report

Sections:
- NFL Projection
- Trait Strengths
- Translation Concerns
- Measurables
- Production
- School Pipeline Context

## Tone Variants

Reports can vary by staff personality:

```text
Blunt
Analytical
Old-School
Optimistic
Risk-Averse
Recruiter-Salesman
Film-Nerd
CEO Summary
```

## Acceptance Criteria

The trait/LLM report system is not done until:
- labels are derived from structured attributes
- every label has evidence
- labels have confidence
- staff can disagree
- LLM reports are grounded in payloads
- LLM cannot invent facts
- reports feel varied
- labels influence gameplay
- scouting confidence affects label certainty

---

# Part V — Creator Systems

## North Star

Creator tools are not side gimmicks. They are how the player personalizes the universe.

The game should eventually support:
- Create-a-School
- Create-a-Player
- Create-a-Coach
- Create-a-Conference
- Create-a-Stadium
- Create-a-Uniform
- Create-a-Playbook
- Create-a-Ruleset
- Create-a-Rivalry
- Create-a-Bowl
- Create-a-Dynasty Scenario

Creator tools should feed directly into the same simulation systems as generated or real-world data.

No created object should be UI-only.

---

# Part VI — Create-a-Player

## Modes

```text
Realistic Prospect
Walk-On
Transfer
Current Roster Player
Dynasty Legend
Sandbox Monster
Randomized Balanced Player
```

## Required Fields

Identity:
- name
- hometown
- state
- high school
- age/class
- position
- secondary positions
- height
- weight
- handedness

Ratings:
- physical
- technical
- football IQ
- mental
- hidden traits
- potential
- development curve

Preferences:
- money
- development
- location
- playing time
- winning
- academics
- coach relationship
- brand exposure
- family influence

Status:
- recruit
- signed player
- portal player
- walk-on
- scholarship
- NIL profile
- eligibility

## Creator Balance Modes

```text
Realistic Lock
Soft Cap
Unlimited Sandbox
Random Within Archetype
```

Realistic Lock prevents impossible players unless explicitly overridden.

## Output

Created players must:
- enter database
- be save/load compatible
- appear in recruiting/roster/portal screens
- be affected by development
- have trait clusters
- be available in reports

---

# Part VII — Create-a-Coach

## Coach Creator Fields

Identity:
- name
- age
- hometown
- alma mater
- former role
- coaching tree
- personality
- career ambition

Attributes:
- recruiting
- development
- tactics
- evaluation
- motivation
- discipline
- analytics
- player relationships
- staff management
- media
- booster relations

Philosophy:
- offensive style
- defensive style
- tempo
- risk tolerance
- recruiting philosophy
- discipline style
- player development style
- portal aggressiveness
- NIL comfort

Hidden:
- loyalty
- ambition
- ego
- integrity
- pressure handling
- adaptability
- burnout risk
- scandal risk, low frequency and toned down

## Career Mode Use

Create-a-coach should feed directly into Career Mode.

---

# Part VIII — Dynasty Mode

## Dynasty Mode North Star

Dynasty Mode means controlling a program long-term.

The player is not just coaching games. The player is building an institution.

## Dynasty Mode Features

- choose school
- set coach identity
- manage recruiting
- manage staff
- manage roster
- manage finances
- manage facilities
- manage NIL
- manage booster relationships
- manage culture
- manage schedule
- manage postseason
- build history
- chase records
- survive expectations

## Dynasty Objectives

Objectives differ by school.

Examples:

```text
Blue Blood:
- make playoff
- beat rival
- top 10 recruiting class
- produce draft picks

G5:
- win conference
- upset P4 team
- develop players
- avoid losing coach/stars

Rebuild:
- stabilize roster
- improve facilities
- reduce transfers
- establish pipeline
```

## Dynasty Score

Track:
- wins
- conference titles
- playoff appearances
- national titles
- rivalry record
- draft picks
- All-Americans
- player development
- recruiting classes
- financial growth
- facility growth
- coaching tree
- culture score

---

# Part IX — Career Mode

## Career Mode North Star

Career Mode follows the coach, not the school.

The player can start small and move.

## Starting Roles

```text
Graduate Assistant
Position Coach
Coordinator
G5 Head Coach
P4 Head Coach
Custom
```

## Career Progression

Coach reputation grows based on:
- recruiting success
- player development
- unit performance
- scheme identity
- staff relationships
- media handling
- job interviews
- winning
- culture
- discipline
- draft production

## Job Market

Schools evaluate coach candidates using:
- record
- scheme fit
- recruiting region
- development reputation
- salary expectations
- baggage
- personality
- fan approval
- donor approval
- academic/compliance profile

## Career Events

- interview request
- extension offer
- hot seat
- coordinator poached
- alma mater calls
- dream job opens
- staff follows you
- recruits reconsider
- players transfer after departure

## Career Mode Acceptance Criteria

- user can move jobs
- old school continues simulating
- staff may follow
- recruiting effects persist
- coach history persists
- coach identity matters

---

# Part X — Stadium Builder

## North Star

The stadium is not just visual. It affects money, recruiting, atmosphere, and home-field advantage.

## Stadium Attributes

```text
Capacity
Age
Condition
Noise
Student Section Impact
Luxury Suites
Recruiting Appeal
Tradition Value
Weather Exposure
Fan Amenities
Location
Expansion Potential
Maintenance Cost
```

## Stadium Builder Modes

```text
Basic Upgrade Menu
Detailed Builder
Sandbox Unlimited
Realistic Budget
```

## Buildable Components

- seating capacity
- student section
- luxury suites
- club seating
- video board
- locker rooms
- tunnel
- recruiting lounge
- press box
- concessions
- tailgate district
- parking
- stadium lighting
- field surface
- roof/canopy, rare/expensive
- sound system
- tradition features/statues

## Gameplay Effects

Capacity:
- ticket revenue
- attendance ceiling
- prestige
- home-field potential

Student section:
- noise
- recruit visit atmosphere
- rivalry effect

Luxury suites:
- booster revenue
- donor satisfaction

Recruiting lounge:
- visit score

Locker room/tunnel:
- player morale
- recruiting appeal

Video board/lights:
- night game atmosphere
- media appeal

## Stadium Project Lifecycle

```text
Idea
AD Approval
Donor Funding
Design
Construction
Disruption
Completion
Recruiting/Revenue Effects
```

## Stadium Events

- donor offers naming-rights money
- construction delay
- cost overrun
- fan backlash
- recruit impressed
- rivalry atmosphere boost
- student section controversy
- stadium expansion campaign

---

# Part XI — Uniform Designer

## North Star

Uniforms affect identity, recruiting flavor, fan sentiment, and immersion.

They should not dominate gameplay, but they should matter enough to be fun.

## Uniform Components

- helmet
- logo
- facemask
- jersey
- pants
- socks
- cleats
- gloves
- number font
- sleeve pattern
- collar
- shoulder stripes
- alternates
- throwbacks

## Uniform Attributes

```text
Tradition
Modernity
Recruit Appeal
Fan Approval
Brand Strength
Rivalry Identity
Special Event Value
```

## Uniform Sets

- home
- away
- alternate
- blackout
- whiteout
- throwback
- rivalry
- playoff
- military appreciation, optional
- custom

## Gameplay Effects

Small effects only:
- recruit impression
- fan sentiment
- brand identity
- player morale for big games
- merchandise revenue

Avoid arcade effects like:
- +5 speed because of uniforms

## AI Graphics Hook

Uniform designer should support:
- generated previews
- AI-assisted concept art
- palette selection
- template export
- private real-school mode
- fictional mode

---

# Part XII — Play Designer

## North Star

The player should eventually design football identity, not just pick aggressive offense.

The play designer should be optional and layered.

Casual player:
- chooses scheme and tendencies

Power user:
- edits playbook concepts and situational calls

Deep user:
- designs plays and packages

## Playbook Layers

```text
Scheme
Concept Families
Formations
Personnel Groups
Plays
Situational Tendencies
Game Plan
Play Calls
```

## Offensive Concepts

Examples:
- inside zone
- outside zone
- power
- counter
- duo
- mesh
- four verticals
- flood
- stick
- Y-cross
- RPO glance
- bubble screen
- play-action shot
- speed option
- triple option
- QB draw
- screens
- sprint out
- quick game

## Defensive Concepts

Examples:
- Cover 1
- Cover 2
- Cover 3
- Quarters
- Cover 6
- Man Pressure
- Zone Blitz
- Sim Pressure
- Spy
- Match Quarters
- Tampa 2
- Goal Line Front
- Bear Front
- Odd Front
- Even Front

## Play Designer Fields

```json
{
  "playId": "play_mesh_001",
  "name": "Mesh Rail",
  "formation": "Trips Right",
  "personnel": "11",
  "concept": "Mesh",
  "tempoCompatibility": ["Normal", "Fast"],
  "primaryReadPosition": "WR",
  "requiredAttributes": {
    "qbProcessing": 12,
    "wrRouteRunning": 13,
    "passProtection": 10
  },
  "strengths": ["man coverage", "short yardage"],
  "weaknesses": ["heavy pressure", "poor route runners"],
  "installCost": 3,
  "complexity": 12
}
```

## Play Install System

Not every team can run every play well.

Install quality depends on:
- practice time
- staff teaching
- player IQ
- continuity
- complexity
- injuries
- freshman usage
- scheme familiarity

## Play Designer Acceptance Criteria

- playbook affects game sim
- complexity matters
- install quality matters
- staff can recommend plays
- bad fit causes errors
- user can delegate
- custom plays save/load
- play design feeds reports

---

# Part XIII — Tempo Strategy System

## North Star

Tempo is a core football identity, not just a slider.

Tempo affects:
- plays per game
- fatigue
- opponent fatigue
- explosive chances
- defensive exposure
- injury risk
- development reps
- upset potential
- clock control
- recruiting identity

## Tempo Modes

```text
Huddle / Slow
Balanced
Fast
No-Huddle
Extreme Tempo
Variable Tempo
```

## Strategic Profiles

### Slow / Ball Control

Pros:
- protects defense
- reduces variance
- helps underdogs stay close
- lowers play count

Cons:
- fewer possessions
- harder comebacks
- less stat production
- may bore recruits

### Fast / Tempo

Pros:
- increases possessions
- stresses defenses
- boosts offensive stats
- appeals to some recruits
- creates upset volatility

Cons:
- tires own defense
- increases mistakes
- increases injury/fatigue
- exposes depth issues

### Variable Tempo

Pros:
- tactical flexibility
- harder to prepare for
- can exploit matchups

Cons:
- requires high IQ and staff
- harder install
- more errors if poorly coached

## Tempo Attributes

Team:
- tempo familiarity
- communication
- conditioning
- offensive continuity
- QB command

Coach:
- tempo comfort
- game management
- risk tolerance

Player:
- stamina
- processing
- assignment discipline
- composure

## Tempo Events

- offense struggling with tempo install
- defense exhausted by offensive pace
- recruits love high-tempo system
- veteran QB pushing for faster pace
- staff recommends slowing down
- late-season fatigue warning

---

# Part XIV — Tactical Identity System

## North Star

Each program should have a recognizable football identity.

Identity should emerge from:
- scheme
- recruiting
- staff
- player attributes
- tempo
- practice
- game planning
- history

## Identity Labels

Examples:

```text
Air Raid Lab
Defensive Meat Grinder
Development Factory
Tempo Chaos Team
Power Run Program
DB Factory
QB Factory
Portal Mercenary Program
Local Pipeline Program
Blue-Chip Machine
Walk-On Factory
Culture Program
NIL Superpower
```

These labels should affect:
- recruiting perception
- media narratives
- player interest
- staff interest
- fan expectations

## Identity Evolution

A program can become a QB factory by:
- signing QBs
- developing QBs
- producing draft picks
- running QB-friendly scheme

A program can lose that identity if:
- staff leaves
- development drops
- scheme changes
- recruits bust

---

# Part XV — Integration with Clickable FM UI

## Clickability Rule

Everything must be clickable.

A scouting report label should be clickable.

Example:

```text
Late Developer
```

Clicking opens:
- definition
- evidence
- similar past players
- staff confidence
- development implications
- recommended training plan

## Entity Link Chains

The user should be able to click:

```text
Recruit -> Trait Label -> Similar Player -> Old Recruiting Class -> Staff Evaluator -> Region -> High School -> Other Prospects
```

or:

```text
Stadium Project -> Booster -> Donor Segment -> NIL Campaign -> Recruit Visit -> Commitment
```

This is how the game captures FM's feel.

## UI Requirements

- every name is a link
- every team is a link
- every trait is a link
- every school is a link
- every staff member is a link
- every event source is a link
- every stat can drill down if possible
- breadcrumbs/back navigation
- hover cards
- comparison side panels

---

# Part XVI — Implementation Order Addendum

Add these packets to the token-based execution plan.

## New Stage 21 — Trait Cluster and Report Language

### Packet 21.1 — Trait Cluster Schema

Size: Medium

Deliver:
- trait cluster definitions
- categories
- evidence fields
- confidence
- visibility
- tests

### Packet 21.2 — Trait Derivation Engine

Size: Large

Deliver:
- derive labels from attributes
- staff confidence
- scouting uncertainty
- tests

### Packet 21.3 — Grounded Report Payload Builder

Size: Medium

Deliver:
- report payloads
- forbidden claims list
- structured facts only
- tests

### Packet 21.4 — LLM Report Integration

Size: Large

Deliver:
- optional LLM provider interface
- prompt templates
- deterministic fallback templates
- report generation tests
- no hallucinated facts

## New Stage 22 — Creator Tools

### Packet 22.1 — Create-a-Player

Size: Large

### Packet 22.2 — Create-a-Coach

Size: Large

### Packet 22.3 — Create-a-School

Size: Large

### Packet 22.4 — Create-a-Conference

Size: Large

### Packet 22.5 — Creator Validation / Balance Modes

Size: Medium

## New Stage 23 — Stadium and Uniform Identity

### Packet 23.1 — Stadium Schema and Builder v1

Size: Large

### Packet 23.2 — Facility/Stadium Effects Integration

Size: Medium

### Packet 23.3 — Uniform Schema and Designer v1

Size: Large

### Packet 23.4 — AI Graphics Asset Hook

Size: Medium

## New Stage 24 — Playbook and Tempo Systems

### Packet 24.1 — Scheme/Concept Schema

Size: Large

### Packet 24.2 — Tempo Strategy Engine

Size: Medium

### Packet 24.3 — Play Install Quality

Size: Large

### Packet 24.4 — Play Designer UI v1

Size: Large

### Packet 24.5 — Game Sim Integration

Size: Large

## New Stage 25 — Dynasty/Career Modes

### Packet 25.1 — Dynasty Mode Shell

Size: Medium

### Packet 25.2 — Career Mode Coach Movement

Size: Large

### Packet 25.3 — Job Market Engine

Size: Large

### Packet 25.4 — Coach Reputation and Legacy

Size: Medium

---

# Part XVII — Hard Design Rules

Add these to the master rules.

## Trait Labels

```text
Trait labels must always be derived from structured attributes, not invented text.
```

## LLM Reports

```text
LLMs may write flavor. They may not create facts.
```

## Creator Tools

```text
Created objects must use the same simulation systems as generated objects.
```

## Uniforms

```text
Uniforms may affect identity, recruiting flavor, fan sentiment, and revenue.
They must not create arcade stat boosts.
```

## Stadiums

```text
Stadiums affect revenue, atmosphere, facilities, recruiting, and home-field context.
They are not purely cosmetic.
```

## Play Designer

```text
Custom plays must be constrained by install quality, player skill, staff teaching, and scheme logic.
```

## Tempo

```text
Tempo must create tradeoffs. Faster is not always better.
```

## Clickability

```text
Every meaningful entity, label, report, stat, and reference should be clickable or drillable.
```

---

# Final Principle

The best version of this game is not just a college football database.

It is a machine for creating identities.

A recruit has an identity.  
A coach has an identity.  
A team has an identity.  
A town has an identity.  
A stadium has an identity.  
A uniform has an identity.  
A playbook has an identity.  
A dynasty has an identity.

The simulation should generate those identities from structured data, then use reports, media, UI, and LLM flavor to make them feel human.
