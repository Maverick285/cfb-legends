# CFB-FM Core Systems Expansion Spec

## Purpose

This document blows out the three systems that will make the game feel like a true college-football version of Football Manager:

1. Recruiting System
2. Player Attribute + Development Model
3. Inbox + Event Engine

These systems should not be treated as isolated modules. They are the heart of the game loop. Recruiting fills the future roster. Player development determines whether recruiting mattered. The Inbox/Event Engine turns raw simulation state into decisions, pressure, story, consequence, and immersion.

The target is not a lightweight dashboard. The target is a dense, long-term, menu-first college football management simulation with the same addiction loop as Football Manager: information, uncertainty, staff reports, scouting, comparison, small decisions, consequences, and time advancement.

The game can include sandbox/debug tools because the player wants them and because they will help tune the simulation. But sandbox controls should support the sim. They should not replace the FM-like experience.

---

# Part I — Recruiting System

## Recruiting System North Star

Recruiting is the college-football equivalent of Football Manager’s transfer market, youth intake, scouting system, squad planning, contract negotiation, board politics, and long-term roster construction all rolled into one.

It must be deep enough to be its own game.

The player should feel like they are running a year-round recruiting department, not clicking “offer scholarship” on a list.

Recruiting must include:

- national and regional prospect discovery
- scouting uncertainty
- hidden traits
- high school pipelines
- recruiting boards
- staff assignments
- recruiting budgets
- school prestige
- scheme fit
- depth chart opportunity
- academics
- NIL expectations
- direct school benefit expectations
- relationships
- visits
- commitments
- decommitments
- flips
- signing periods
- late risers
- busts
- sleepers
- portal overlap
- roster needs
- staff recommendations
- AI school competition
- promise tracking
- long-term roster planning

The player should never be able to perfectly know a recruit. The system should always have uncertainty, noise, staff bias, and incomplete information.

## Recruiting Design Philosophy

Recruiting should not be a simple points race. A points race becomes mathy and sterile.

Instead, recruiting should model interest, fit, relationship strength, perceived opportunity, resource commitment, school identity, timing, and competitor pressure.

A recruit should make decisions based on a weighted preference model.

The player can influence that model through actions, staff, resources, visits, promises, and program performance.

The player should feel like they can be smart, not just rich.

A smaller program should be able to find:
- overlooked local three-stars
- late bloomers
- scheme-specific misfits
- academically limited prospects bigger schools avoid
- transfer portal reclamation players
- regional loyalty prospects

A blue blood should be able to flex:
- prestige
- facilities
- playoff path
- NIL power
- NFL pipeline
- staff reputation
- national reach

But blue bloods should also lose battles because of:
- crowded depth charts
- bad relationship fit
- coaching instability
- player wants immediate playing time
- NIL mismatch
- scheme mismatch
- geography/family pull
- broken promises
- late competitor push

## Recruiting Calendar

The recruiting calendar should be configurable by ruleset.

Baseline modern calendar:

### January
- portal exits/entries
- early enrollees arrive
- staff movement
- final high school recruiting cleanup
- roster needs recalculated
- returning player retention meetings

### February
- signing day
- late commits
- unsigned prospects
- staff recruiting region assignments
- scholarship count review

### March
- spring practice begins
- underclassmen evaluations
- junior-day events
- new prospect database refresh
- early offers

### April
- spring game visits
- transfer portal spring window, if ruleset allows
- post-spring roster attrition
- updated position needs

### May
- staff travel
- high school evaluation period
- camp invite planning
- hidden gem discovery

### June
- official visit weekends
- summer camps
- rising senior evaluations
- recruiting board reshuffle

### July
- quiet/dead periods depending ruleset
- staff reports
- commitment wave
- elite prospect battles

### August
- preseason camp
- senior film updates
- depth chart promises tested
- season visit planning

### September-November
- game-day visits
- rivalry visit weekends
- official visits
- midseason commitments
- competitor poaching

### December
- early signing period
- coaching carousel
- portal chaos
- decommitment risk
- scholarship math crisis
- early bowl/playoff effects

## Recruit Entity Schema

Each recruit should have visible, partially visible, and hidden data.

### Identity

```json
{
  "id": "prospect_2032_000123",
  "firstName": "Darius",
  "lastName": "McClain",
  "displayName": "Darius McClain",
  "classYear": 2032,
  "hometown": "Tulsa",
  "state": "OK",
  "region": "Southern Plains",
  "highSchool": "Fictional HS",
  "heightInches": 74,
  "weightPounds": 196,
  "primaryPosition": "QB",
  "secondaryPositions": ["ATH"],
  "handedness": "Right",
  "starsPublic": 4,
  "nationalRankPublic": 188,
  "stateRankPublic": 4,
  "positionRankPublic": 13
}
```

### Ratings

Ratings should have true values and scouted ranges.

```json
{
  "trueRatings": {
    "throwPower": 15,
    "shortAccuracy": 13,
    "mediumAccuracy": 12,
    "deepAccuracy": 10,
    "mobility": 14,
    "processing": 9,
    "poise": 11,
    "leadership": 16
  },
  "scoutedRatings": {
    "throwPower": {"low": 13, "high": 17, "confidence": 0.58},
    "shortAccuracy": {"low": 10, "high": 15, "confidence": 0.44},
    "processing": {"low": 6, "high": 13, "confidence": 0.25}
  }
}
```

### Potential

```json
{
  "truePotential": 18,
  "publicPotentialGrade": "High 4-star",
  "scoutedPotential": {
    "low": 13,
    "high": 18,
    "confidence": 0.39
  },
  "developmentCurve": "Late Bloomer",
  "bustRisk": 0.31,
  "breakoutChance": 0.18
}
```

### Preferences

```json
{
  "preferences": {
    "playingTime": 0.95,
    "prestige": 0.67,
    "distanceFromHome": 0.72,
    "nil": 0.64,
    "academics": 0.28,
    "schemeFit": 0.83,
    "coachRelationship": 0.91,
    "nflPipeline": 0.69,
    "winning": 0.76,
    "campusLife": 0.35,
    "conferenceStrength": 0.55
  },
  "dealBreakers": [
    "No clear path to playing time by year two"
  ]
}
```

### Hidden Personality

```json
{
  "hidden": {
    "loyalty": 14,
    "ambition": 17,
    "coachability": 12,
    "workEthic": 9,
    "pressure": 11,
    "academicDiscipline": 7,
    "socialStability": 10,
    "familyInfluence": 15,
    "handlerInfluence": 8
  }
}
```

### Recruitment State Per School

```json
{
  "recruitment": {
    "school_ou": {
      "interest": 68,
      "relationship": 54,
      "staffContact": 42,
      "visitScheduled": true,
      "officialVisitUsed": false,
      "offerStatus": "Offered",
      "nilExpectationMet": false,
      "playingTimePromise": "Compete by year two",
      "riskOfFlip": 0.21,
      "lastContactWeek": "2031-WEEK-09",
      "leaderStatus": "Top 3"
    }
  }
}
```

## Recruit Generation

Recruit generation must use data-driven distributions.

Inputs:
- state population
- historical recruiting density
- position distribution
- size distribution by position
- name frequency by state/region
- school prestige effects
- high school program quality
- era/ruleset
- random seed

Output:
- national prospect pool
- regional prospect pools
- hidden small-school prospects
- junior college prospects, optional
- international prospects, optional future

The generator must create:
- obvious elite players
- underrated players
- overrated players
- raw athletes
- low-floor/high-ceiling players
- high-floor/low-ceiling players
- academic risks
- injury-risk prospects
- culture fits
- portal-prone personalities

## Recruit Archetypes

Every recruit should have an archetype that affects ratings, development, preferences, and scouting noise.

### QB Archetypes

- Pocket Distributor
- Big-Armed Gambler
- Dual-Threat Creator
- Option Athlete
- Processor
- Raw Tools Prospect
- System QB
- Late-Blooming Multi-Sport Athlete

### RB Archetypes

- Workhorse
- Speed Back
- Power Back
- Third-Down Back
- Space Player
- Short-Yardage Hammer
- Raw Athlete

### WR Archetypes

- Route Technician
- Deep Threat
- Possession Receiver
- Slot Separator
- Contested-Catch Specialist
- Return Specialist
- Raw Height/Speed Prospect

### OL Archetypes

- Road Grader
- Pass Protector
- Zone-Movement Lineman
- Raw Frame Prospect
- Multi-Position Utility
- Technician

### DL Archetypes

- Edge Rusher
- Interior Disruptor
- Nose Tackle
- Power End
- Speed Rusher
- Raw Length Prospect

### LB Archetypes

- Thumper
- Coverage Backer
- Blitzer
- Field General
- Hybrid Safety/LB
- Raw Athlete

### DB Archetypes

- Man Corner
- Zone Corner
- Nickel
- Centerfield Safety
- Box Safety
- Ball Hawk
- Raw Track Athlete

### Specialist Archetypes

- Big-Leg Kicker
- Accurate Kicker
- Directional Punter
- Power Punter
- Return Specialist

## Recruiting Interest Formula

Recruit interest should be calculated as a living score.

Example base formula:

```text
interest =
  schoolPrestigeMatch
+ playingTimeOpportunity
+ schemeFit
+ relationshipScore
+ NILAlignment
+ distanceFromHomeFit
+ coachStability
+ recentPerformance
+ facilityAppeal
+ academicFit
+ conferencePrestige
+ NFLPipeline
+ visitExperience
+ promiseFit
- depthChartBlockers
- brokenPromisePenalty
- coachingChangePenalty
- scandalPenalty
- competitorPressure
```

Each recruit weights these differently.

A recruit who values playing time should not care as much about prestige. A recruit who wants NIL should respond to financial packages. A recruit with high family influence should care about location.

## Recruiting Actions

### Basic Actions

- Add to board
- Remove from board
- Assign scout
- Offer scholarship
- Offer preferred walk-on
- Schedule call
- Send position coach
- Send coordinator
- Send head coach
- Invite to camp
- Invite to game
- Schedule official visit
- Schedule unofficial visit
- Make NIL pitch
- Make academic pitch
- Make playing-time pitch
- Make scheme pitch
- Make NFL development pitch
- Make campus-life pitch

### Advanced Actions

- Promise position
- Promise no redshirt
- Promise early playing time
- Promise role in offense/defense
- Promise family visit support
- Promise academic support
- Promise jersey number, optional
- Promise leadership opportunity
- Slow-play prospect
- Withdraw offer
- Increase priority
- Create contingency list
- Ask staff for recommendation
- Compare against current roster
- Compare against board
- Request deeper evaluation
- Host private workout
- Watch senior film
- Re-rank position group
- Scout competitor interest

## Recruiting Board

The Recruiting Board is the most important non-roster screen.

Tabs:

1. Overview
2. Needs
3. Search
4. Board
5. Top Targets
6. Offers
7. Visits
8. Commitments
9. Competitors
10. Pipelines
11. Staff Assignments
12. Analytics
13. Promises
14. Watchlist
15. Late Risers
16. Risk Report

### Recruiting Board Columns

Must support customizable columns.

Core columns:
- name
- position
- archetype
- stars
- national rank
- state rank
- hometown
- height
- weight
- interest
- relationship
- top schools
- your rank
- staff owner
- scout confidence
- potential range
- floor
- ceiling
- scheme fit
- NIL expectation
- playing time concern
- academics
- visit status
- offer status
- commitment status
- flip risk
- last contact
- next action
- urgency
- risk note

## Recruiting Search

Search should feel like FM player search.

Filters:
- position
- state
- region
- stars
- national rank range
- height
- weight
- speed range
- scheme fit
- potential range
- academic risk
- NIL expectation
- interest threshold
- unoffered only
- high upside
- low confidence
- sleeper candidates
- local recruits
- staff recommended
- late risers
- rival targets
- no current leader
- likely flip candidates

Saved searches:
- Oklahoma speed athletes
- three-star linemen with high frame potential
- uncommitted QBs with high processing
- low-NIL high-interest recruits
- local walk-on candidates
- high-academic OL
- DBs with elite speed
- underrated players by staff evaluation

## Visits System

Visits must be a complete subgame.

Visit types:
- unofficial visit
- official visit
- junior day
- camp
- spring game visit
- rivalry weekend visit
- night game visit
- homecoming visit
- playoff push visit

Visit components:
- host player
- position coach meeting
- coordinator meeting
- head coach meeting
- facility tour
- academic tour
- game atmosphere
- family meeting
- NIL collective meeting
- depth chart pitch
- film session
- campus-life event

Visit success factors:
- game result
- crowd strength
- weather
- campus vibe
- host compatibility
- staff charisma
- competitor timing
- family happiness
- NIL alignment
- promise fit
- position-room crowding

Visit result examples:
- interest rises
- interest drops
- family prefers closer school
- recruit loves scheme
- recruit worries about playing time
- recruit commits
- recruit silently commits
- recruit delays
- recruit adds rival to top group
- NIL expectation increases
- recruit becomes higher priority for competitor

## Scholarship and Roster Math

Scholarship/roster logic must be brutally visible.

Screens:
- current scholarship chart
- projected next-year chart
- position by class
- expiring eligibility
- expected transfers
- early draft risk
- medical retirement candidates
- walk-ons
- preferred walk-ons
- redshirt plan
- signed class
- commits
- pending targets
- oversign risk
- roster limit risk

The AI must warn the user:
- You have 5 commits but only 3 projected slots.
- You are overloading WR and ignoring OL.
- You have no QB in next class.
- You promised playing time to three players at the same position.
- Signing this player may cause current player to transfer.
- You need a punter next season.
- You are relying on too many unscouted prospects.

## Commitment System

Commitments should not be final until signing unless ruleset says otherwise.

Commitment types:
- verbal commit
- silent commit
- soft verbal
- hard commit
- signed
- early enrollee
- decommit
- flip
- greyshirt, optional
- blueshirt, optional

Commitment risk factors:
- low loyalty
- high ambition
- coaching change
- coordinator leaves
- competing offer
- NIL shortfall
- playing-time change
- poor season
- scandal
- family pressure
- rival visit
- staff neglect

## AI School Recruiting Logic

Other schools should not behave randomly.

Each AI program needs:
- recruiting region preferences
- scheme preferences
- prestige
- budget
- staff strength
- NIL power
- roster needs
- aggressiveness
- risk tolerance
- development reputation
- academic standards
- transfer preference

AI recruiting actions:
- identify needs
- build board
- prioritize targets
- offer
- schedule visits
- react to competitors
- flip targets
- drop targets
- seek contingencies
- fill roster late

AI mistakes should happen:
- overrecruiting one position
- missing on QB
- losing commits after coach leaves
- chasing too many five-stars
- ignoring academics
- taking low-character high-talent players

## Recruiting Staff Assignments

Staff should own recruiting territories and position groups.

Staff assignment fields:
- region
- state
- position
- target list
- visit owner
- scouting owner
- relationship owner

Staff attributes affecting recruiting:
- charisma
- work rate
- evaluation skill
- region familiarity
- position expertise
- relationship building
- NIL pitch skill
- academic pitch skill
- closer ability
- loyalty
- integrity
- risk tolerance

Staff report examples:
- “Coach Daniels believes this QB’s public ranking is inflated.”
- “Our RB coach thinks this three-star back is a perfect fit for outside zone.”
- “Recruit’s family is concerned about distance.”
- “Rival school has made a serious NIL push.”
- “We are losing ground because we have not contacted him in three weeks.”

## Recruiting Promises

Promises are powerful and dangerous.

Promise types:
- no redshirt
- chance to start by year two
- position guarantee
- offensive/defensive role
- jersey number
- NIL support
- academic support
- family access
- leadership path
- transfer avoidance
- coach will stay, risky

Promise tracking:
- promise owner
- deadline
- current status
- player awareness
- family awareness
- staff recommendation
- breach probability
- breach consequence

Broken promise effects:
- morale drop
- transfer risk
- recruit reputation damage
- staff credibility loss
- future recruiting penalty
- locker room skepticism
- local pipeline damage

## Recruiting Analytics

Analytics should not replace scouting. It should supplement it.

Metrics:
- expected commitment probability
- cost per interest point
- likelihood of signing
- staff confidence
- fit-adjusted value
- roster impact score
- portal risk after signing
- development-adjusted value
- bust-adjusted value
- regional pipeline value
- opportunity cost

Screens:
- board efficiency
- class balance
- position need heatmap
- scholarship allocation
- scout confidence heatmap
- competitor pressure
- staff workload
- projected class ranking
- development value ranking

## Recruiting Screen Acceptance Criteria

Recruiting is not done until:

- Player can search prospects using advanced filters.
- Player can save custom views.
- Prospects have uncertainty ranges.
- Staff can be assigned to targets.
- Visits produce meaningful outcomes.
- Scholarships affect roster math.
- Promises are tracked.
- Other schools compete actively.
- Recruits commit, decommit, flip, and sign.
- Recruiting class affects future roster.
- AI can run recruiting for non-user teams.
- User can delegate recruiting to staff.
- System produces believable recruiting classes over 20 seasons.
- Recruiting has at least 50 meaningful event types.

---

# Part II — Player Attribute + Development Model

## Player Model North Star

Football Manager’s soul is not just its match engine. It is the feeling that every player is an individual with strengths, weaknesses, potential, personality, hidden traits, role fit, development trajectory, morale, and context.

The CFB version must make each player feel like a college athlete in a program.

A player should not be a static rating blob.

A player should have:
- physical tools
- position skills
- football IQ
- mental traits
- personality
- academic profile
- development curve
- eligibility state
- morale
- role expectations
- injury history
- hidden potential
- relationship with coaches
- relationship with teammates
- transfer risk
- NIL expectations
- draft ambition
- leadership influence
- practice habits
- scheme fit

## Rating Scale

Use a 1–20 scale for FM feel.

Interpretation:
- 1-3: unusable
- 4-6: poor
- 7-9: below average
- 10-11: average
- 12-13: solid
- 14-15: good
- 16-17: excellent
- 18-19: elite
- 20: generational

There should also be an internal 0–100 or 0–1000 scale for calculations if needed, but user-facing attributes should be 1–20.

## Overall Rating Warning

Avoid a single OVR dominating the game.

If included, make it:
- role-specific
- scheme-specific
- context-sensitive
- staff-opinion based
- uncertain for prospects

Examples:
- “Current Ability as Air Raid QB: 13”
- “Current Ability as RPO QB: 15”
- “Current Ability as Pro-Style QB: 10”

## Core Player Schema

```json
{
  "id": "player_2031_ou_001",
  "firstName": "Caleb",
  "lastName": "Fictional",
  "programId": "school_ou",
  "position": "QB",
  "secondaryPositions": ["ATH"],
  "heightInches": 74,
  "weightPounds": 205,
  "classYear": "RS_SO",
  "eligibilityYearsRemaining": 3,
  "redshirtStatus": "Used",
  "gamesPlayedThisSeason": 6,
  "hometown": "Norman",
  "state": "OK",
  "recruitingClass": 2029,
  "recruitingStars": 4,
  "archetype": "Dual-Threat Creator"
}
```

## Physical Attributes

All positions:
- Speed
- Acceleration
- Agility
- Balance
- Strength
- Explosiveness
- Jumping
- Change of Direction
- Stamina
- Durability
- Flexibility
- Size/Frame
- Recovery

Position effects:
- Speed matters differently for WR, CB, RB, QB, LB, edge.
- Strength matters differently for OL, DL, TE, RB, LB.
- Durability affects injury probability and recovery.
- Frame affects future weight gain and position-change potential.

## Mental Attributes

All positions:
- Work Rate
- Coachability
- Discipline
- Composure
- Pressure Handling
- Leadership
- Aggression
- Focus
- Consistency
- Adaptability
- Competitiveness
- Resilience
- Teamwork
- Ambition
- Loyalty

Hidden or semi-hidden:
- Professionalism
- Ego
- Transfer Openness
- NIL Sensitivity
- Academic Discipline
- Social Stability
- Media Comfort
- Big-Game Temperament
- Practice Effort
- Playbook Study

## Football IQ Attributes

General:
- Play Recognition
- Processing
- Anticipation
- Awareness
- Decision-Making
- Instincts
- Assignment Discipline
- Situational Awareness
- Film Study
- Communication

Position-specific:
- QB reads coverage
- LB diagnoses run/pass
- safety coverage rotation awareness
- OL blitz pickup
- RB pass protection awareness
- WR option-route recognition

## QB Attributes

- Throw Power
- Short Accuracy
- Medium Accuracy
- Deep Accuracy
- Touch
- Timing
- Release Speed
- Pocket Presence
- Mobility
- Scramble Instinct
- Ball Security
- Read Progression
- Coverage Diagnosis
- RPO Decision
- Option Pitch
- Play Action
- Throw on Run
- Pressure Response

## RB Attributes

- Vision
- Burst
- Contact Balance
- Power
- Elusiveness
- Ball Security
- Pass Protection
- Receiving
- Route Running
- Short Yardage
- Patience
- Cutback Sense
- Open Field Running
- Goal Line Instinct
- Durability

## WR/TE Attributes

- Hands
- Catch Radius
- Release
- Route Running
- Separation
- Deep Speed
- Contested Catch
- YAC
- Blocking
- Option Routes
- Sideline Awareness
- Red Zone Ability
- Concentration
- Physicality
- Return Ability

TE additional:
- Inline Blocking
- Pass Protection
- Zone Blocking
- H-Back Versatility

## OL Attributes

- Run Blocking
- Pass Blocking
- Zone Blocking
- Gap Blocking
- Anchor
- Footwork
- Hand Placement
- Leverage
- Pulling
- Blitz Pickup
- Screen Blocking
- Penalty Avoidance
- Combo Blocks
- Awareness
- Snap Accuracy, for centers

## DL/EDGE Attributes

- Pass Rush
- Power Rush
- Speed Rush
- Bend
- Hand Usage
- Block Shedding
- Run Defense
- Gap Discipline
- Pursuit
- Tackling
- Interior Push
- Edge Setting
- Motor
- Strip Ability
- Stunt Execution

## LB Attributes

- Tackling
- Pursuit
- Run Fits
- Block Shedding
- Coverage
- Blitzing
- Zone Awareness
- Man Coverage
- Play Diagnosis
- Spy Ability
- Communication
- Physicality
- Range

## DB Attributes

- Man Coverage
- Zone Coverage
- Press
- Recovery Speed
- Ball Skills
- Tackling
- Pursuit Angles
- Route Recognition
- Hip Fluidity
- Change of Direction
- Safety Help
- Slot Coverage
- Blitzing
- Run Support
- Interception Instinct

## Specialists

Kicker:
- Kick Power
- Kick Accuracy
- Clutch
- Weather Resistance
- Kickoff Distance
- Consistency

Punter:
- Punt Power
- Punt Accuracy
- Hang Time
- Coffin Corner
- Pressure Handling
- Weather Resistance

Returner:
- Vision
- Burst
- Ball Security
- Open Field
- Decision-Making

## Current Ability and Potential

Each player has:
- current ability
- potential ability
- role-specific ability
- scheme-specific ability
- staff perceived ability
- public reputation
- internal development ceiling
- hidden bust/breakout probabilities

Potential should not be perfectly knowable.

Potential grades:
- Limited
- Serviceable
- Solid Starter
- All-Conference Upside
- All-American Upside
- NFL Upside
- Generational

Potential can shift slightly based on:
- injuries
- development environment
- position changes
- confidence
- playing time
- coaching
- work ethic
- physical maturation

## Development Curves

Development curve types:
- Early Bloomer
- Late Bloomer
- Steady Developer
- Boom/Bust
- High Floor
- Raw Tools
- Physically Maxed
- Technique Dependent
- Injury Limited
- Confidence Dependent

Development is driven by:
- age/class
- practice reps
- game reps
- staff development skill
- position coach expertise
- player work rate
- player coachability
- facility quality
- morale
- injuries
- scheme fit
- role clarity
- academic stress
- competition level
- leadership environment

## Development Formula

Example monthly progression:

```text
developmentGain =
  baseAgeCurve
+ potentialGapFactor
+ practiceQuality
+ staffDevelopment
+ playingTimeLearning
+ facilityBonus
+ workRateModifier
+ coachabilityModifier
+ moraleModifier
+ schemeFitModifier
- injuryPenalty
- academicStressPenalty
- lowConfidencePenalty
- positionCrowdingPenalty
+ randomVariance
```

Players should not always improve. Regression must exist.

Regression causes:
- injury
- low morale
- poor fit
- lack of reps
- bad coaching
- academic stress
- confidence collapse
- physical decline after major injury
- off-field issue

## Practice System

Practice should feed development and game performance.

Practice screens:
- weekly overview
- position group plans
- individual development plans
- injury risk
- fatigue
- morale
- academic balance
- staff recommendations
- scout team
- redshirt development
- depth reps

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

Individual development plans:
- add weight
- lose weight
- improve route running
- improve pass protection
- improve deep accuracy
- learn new position
- improve playbook understanding
- reduce penalties
- improve ball security
- rehab focus

## Position Changes

Position changes should be an important system.

Examples:
- high school QB to WR
- safety to linebacker
- WR to corner
- tackle to guard
- defensive end to edge linebacker
- RB to slot
- TE to OL
- QB to TE

Position change success depends on:
- frame
- athletic traits
- football IQ
- willingness
- staff evaluation
- role availability
- player morale
- time in program
- practice investment

Position change can:
- increase value
- cause morale issue
- unlock hidden potential
- damage development if wrong
- affect transfer risk

## Morale and Happiness

Morale is not one number.

Categories:
- playing time happiness
- role happiness
- team success happiness
- staff relationship
- academic stress
- NIL satisfaction
- development satisfaction
- locker room fit
- family pressure
- public recognition
- injury frustration

Morale effects:
- practice effort
- game performance
- transfer risk
- leadership influence
- willingness to redshirt
- willingness to change positions
- acceptance of promises
- response to criticism

## Relationships

Relationships:
- player to head coach
- player to position coach
- player to coordinator
- player to teammates
- player to position room
- player to family
- player to NIL collective
- player to media/fans, optional

Relationship effects:
- retention
- morale
- development
- leadership
- transfer risk
- buy-in
- conflict events

## Eligibility and Academic Model

Fields:
- eligibility years remaining
- redshirt used
- games played
- academic standing
- major
- GPA band
- progress-to-degree
- tutor support
- academic risk
- suspension risk
- appeal status

Academic events:
- player misses class
- tutor requests more support
- professor issue
- academic probation
- bowl eligibility impact
- summer school need
- transfer credit issue
- graduate transfer status

## NIL / Benefits / Draft Ambition

Players should have expectations.

Fields:
- NIL sensitivity
- current NIL value
- expected NIL value
- school-paid benefit allocation
- family financial pressure
- public profile
- draft ambition
- transfer leverage
- agent/handler pressure, optional fictionalized

Effects:
- star players may demand more
- backups may transfer for money/playing time
- promises affect trust
- winning increases NIL market
- scandal reduces NIL appeal

## Transfer Risk

Transfer risk formula:

```text
transferRisk =
  playingTimeDissatisfaction
+ roleMismatch
+ NILShortfall
+ brokenPromises
+ lowStaffRelationship
+ homesickness
+ academicIssues
+ schemeChange
+ positionCrowding
+ highAmbition
+ competitorInterest
- loyalty
- teamSuccess
- strongRelationship
- developmentSatisfaction
```

Risk bands:
- Low
- Watch
- Concern
- High
- Imminent

Transfer prevention actions:
- meeting
- role promise
- NIL discussion
- position change
- depth chart clarification
- development plan
- staff intervention
- family meeting
- accept transfer
- encourage transfer

## Player Profile Screen

Tabs:
1. Overview
2. Attributes
3. Development
4. Statistics
5. Game Logs
6. Eligibility
7. Academics
8. Morale
9. Relationships
10. Training
11. Reports
12. Promises
13. History
14. Comparison

Overview should show:
- role
- form
- current ability
- potential
- morale summary
- transfer risk
- eligibility
- development trend
- staff recommendation
- next decision

## Depth Chart and Squad Planner

This is one of the most FM-like screens.

Tabs:
- current depth chart
- next season projection
- two-year projection
- recruiting impact
- portal needs
- redshirt plan
- eligibility loss
- position room morale
- scholarship chart
- playing-time promises
- staff recommendations

Important warnings:
- no playable backup
- promised starter blocked
- too many underclassmen
- no future depth
- position room morale poor
- likely transfer if not addressed
- recruit changes future depth

## Player Development Acceptance Criteria

The system is not done until:

- players have 1–20 attributes
- players have hidden personality traits
- players develop over time
- development differs by coaching, reps, personality, and facilities
- players can regress
- morale affects behavior
- transfer risk emerges from context
- position changes are possible
- academics and eligibility matter
- staff reports can be wrong
- scouting reports can be uncertain
- depth chart planning affects recruiting and transfers
- 20-season sims produce believable player careers
- no player feels like only an OVR number

---

# Part III — Inbox + Event Engine

## Inbox/Event North Star

The Inbox is the game.

The sim produces state. The Inbox turns state into decisions.

Football Manager works because the player is constantly pulled through time by a stream of relevant messages, recommendations, reports, and required responses. The CFB version must do the same.

The Inbox should be:
- information hub
- decision hub
- narrative engine
- alert system
- staff interface
- calendar driver
- consequence delivery system

The player should be able to manage almost the whole program from the Inbox, drilling into screens only when more detail is needed.

## Event Engine Design

Events should be data-driven.

Each event has:
- trigger
- conditions
- priority
- visibility
- recipients
- message template
- actions
- consequences
- expiration
- follow-up events
- AI handling logic
- tags
- test coverage

## Event Schema

```json
{
  "id": "event_recruit_rival_offer_001",
  "type": "Recruiting",
  "category": "Rival Offer",
  "priority": "High",
  "blocking": false,
  "createdAt": "2031-WEEK-08",
  "expiresAt": "2031-WEEK-10",
  "subject": "Rival makes push for top QB target",
  "bodyTemplate": "{rivalSchool} has made a serious push for {prospect}. Your staff believes the recruitment is tightening.",
  "actors": {
    "prospectId": "prospect_2032_000123",
    "rivalSchoolId": "school_texas",
    "staffId": "staff_qb_coach_01"
  },
  "conditions": {
    "prospectInterestUserMin": 40,
    "prospectInterestRivalMin": 35
  },
  "actions": [
    "send_head_coach",
    "schedule_call",
    "increase_priority",
    "make_nil_pitch",
    "do_nothing"
  ],
  "consequences": {
    "do_nothing": {
      "prospectInterestDelta": -4,
      "relationshipDelta": -2,
      "rivalMomentumDelta": 5
    }
  },
  "followUps": [
    "event_recruit_updates_top_three"
  ]
}
```

## Event Categories

### Recruiting Events

- scout report completed
- prospect adds school to top group
- prospect drops school
- rival offer
- rival visit
- commitment
- decommitment
- silent commit rumor
- NIL expectation shift
- family concern
- academic risk warning
- late riser discovered
- staff recommends offer
- staff recommends withdrawal
- target injured
- high school coach feedback
- camp standout
- visit successful
- visit failed
- prospect wants promise
- signing day decision
- flip risk rising

### Portal Events

- player enters portal
- your player considering portal
- portal target interested
- portal target demands role
- competitor contacts player
- academic transfer issue
- immediate eligibility concern
- portal window closing
- emergency depth need
- former recruit available
- staff recommends portal offer

### Roster Events

- player unhappy
- player wants meeting
- player asks about role
- player wants position change
- player considering redshirt
- player refuses redshirt
- player injury
- player returns from injury
- player develops trait
- player regresses
- player has breakout practice
- player conflict
- captain recommendation
- depth chart concern
- promise nearing failure

### Staff Events

- assistant wants raise
- assistant contacted by rival
- staff recommends target
- staff disagreement
- coordinator wants scheme change
- recruiting coordinator overworked
- coach relationship issue
- staff contract expiring
- staff retirement rumor
- staff scandal
- staff pipeline opportunity

### Finance/NIL Events

- booster wants meeting
- NIL collective shortfall
- donor offers restricted gift
- facility request
- budget cut
- AD adds objective
- revenue projection update
- bowl payout
- playoff payout
- ticket sales change
- merchandise spike
- donor anger

### Academic/Compliance Events

- player academic warning
- tutor request
- eligibility review
- NCAA inquiry
- paperwork issue
- transfer credits issue
- redshirt eligibility alert
- roster limit violation
- benefit allocation issue
- ruleset change

### Game Week Events

- opponent scout report
- weather forecast
- injury report
- practice performance
- media question
- rivalry pressure
- depth chart lock
- gameplan recommendation
- upset alert
- trap game warning

### Postgame Events

- result summary
- player of game
- injury fallout
- media reaction
- fan sentiment
- ranking change
- recruit reaction
- team morale shift
- staff report
- analytics summary
- conference race update

### World Events

- conference realignment
- playoff format change
- coaching carousel
- scandal at rival
- rule change
- NIL market shift
- TV deal
- high school pipeline change
- demographic shift
- new facility arms race

## Inbox UI

Tabs:
1. All
2. Must Respond
3. Recruiting
4. Roster
5. Staff
6. Game Week
7. Finance
8. Compliance
9. Media
10. World
11. Archived

Message card fields:
- subject
- category
- priority
- source
- date
- expiration
- affected entity
- suggested action
- consequence preview
- staff confidence
- blocking status

Message details:
- full report
- relevant data panel
- action buttons
- staff recommendations
- compare links
- history
- related messages
- possible consequences
- defer option
- delegate option

## Blocking vs Non-Blocking Events

Blocking events prevent Continue.

Examples:
- roster illegal
- game day depth chart incomplete
- scholarship/roster violation
- signing day decision
- player meeting deadline
- staff contract deadline
- compliance issue
- playoff selection response, if applicable

Non-blocking events are informational or optional.

The player should be able to configure inbox filters but not hide legally/structurally required events.

## Staff Recommendations

Every major event should include staff opinions when relevant.

Example:

```text
Recruiting Coordinator:
“I recommend we keep pushing. We are still in his top three, and his family likes our staff.”

OC:
“I like the player, but he does not fit our current RPO package.”

GM:
“We have two QBs already committed. Taking him may create a transfer problem.”
```

Staff can disagree. That is good.

Disagreement creates gameplay.

## Action Consequences

Every inbox action should produce immediate and/or delayed consequences.

Action types:
- direct state change
- relationship change
- morale change
- interest change
- budget change
- promise creation
- event follow-up
- risk increase
- risk decrease
- hidden flag

Example:

Player asks for role clarity.

Actions:
- promise starting role
- promise competition
- tell him to earn it
- ask position coach to handle
- encourage transfer
- delay meeting

Consequences:
- morale changes
- trust changes
- transfer risk changes
- promise created
- teammates may react
- staff may disagree
- future event scheduled

## Event Trigger System

Triggers:
- time-based
- state-based
- threshold-based
- random weighted
- relationship-based
- outcome-based
- AI action-based
- user action-based
- ruleset-based

Examples:
- if recruit interest drops below 50 and priority high, trigger alert
- if player morale below 30 and transfer window near, trigger meeting
- if position group has fewer than 2 playable players, trigger depth warning
- if staff contract expires in 8 weeks, trigger negotiation
- if scout confidence reaches threshold, trigger report
- if rivalry week, trigger rivalry event package

## Event Priority

Priority levels:
- Critical
- High
- Normal
- Low
- Flavor

Critical examples:
- illegal roster
- missed signing deadline
- no eligible QB
- budget violation
- compliance issue

High examples:
- top recruit visit
- starting QB injury
- coordinator contacted by rival
- player transfer risk imminent

Normal:
- scout report complete
- staff suggestion
- depth chart update

Low:
- media chatter
- minor morale note

Flavor:
- alumni note
- historical stat
- rivalry trivia

## Event Cooldowns and Spam Control

The event system must avoid inbox spam.

Controls:
- event cooldowns
- category caps per week
- digest events
- escalation instead of repetition
- staff delegation summaries
- priority compression
- duplicate suppression

Example:
Do not send five separate low morale messages from one position room. Send one “WR room morale slipping” report.

## News and Narrative

Separate personal inbox from public news.

News categories:
- national headlines
- conference news
- recruiting news
- portal news
- rankings
- awards
- coach rumors
- scandals
- rivalry stories
- historical milestones

News affects:
- prestige
- morale
- recruit perception
- fan sentiment
- donor confidence
- media pressure

## Event Templates

Use templates with variables.

Example:

```text
Subject:
{playerName} wants clarity on his role

Body:
{playerName} has requested a meeting after seeing limited snaps over the last {weeks} weeks. {positionCoach} believes the situation may affect his willingness to remain with the program.

Context:
- Current depth chart: {depthRank}
- Promised role: {promiseStatus}
- Transfer risk: {transferRisk}
- Morale: {morale}
```

Templates should have tone variants:
- formal
- blunt
- staff casual
- media style
- rumor style
- booster style

## AI-Generated Text Guardrails

AI can generate flavor text, but structured state must control meaning.

Never let AI invent:
- ratings
- injuries
- violations
- commitments
- results
- money
- eligibility
- hidden facts

AI may generate:
- message wording
- media headlines
- staff phrasing
- recruit personality flavor
- historical summaries
- press conference text

All AI text must be grounded in event payloads.

## Press Conferences and Media

Optional but highly FM-like.

Media questions:
- after big win
- after bad loss
- after recruit signs
- after scandal
- before rivalry
- after player transfer
- after coordinator leaves

Responses affect:
- morale
- media relationship
- fan sentiment
- recruit perception
- player trust
- staff trust

Example:
Question: “Your starting QB threw three interceptions. Are you considering a change?”

Responses:
- defend him publicly
- say competition is open
- criticize decision-making
- refuse to answer
- blame scheme
- praise opponent

## Meetings

Meeting types:
- player meeting
- position room meeting
- team meeting
- staff meeting
- AD meeting
- booster meeting
- recruit family meeting
- NIL collective meeting
- compliance meeting

Each meeting should have:
- participants
- agenda
- tone
- options
- consequences
- follow-up

## Delegation

The player should not be forced to handle everything.

Delegation targets:
- recruiting coordinator
- position coaches
- GM
- OC/DC
- academic staff
- compliance officer
- strength coach

Delegation modes:
- fully handle
- recommend only
- handle low-priority
- handle unless critical
- never handle

Delegation quality depends on staff attributes.

Bad delegation can cause:
- missed targets
- broken promises
- poor morale
- budget waste
- compliance risk

## Event Engine Acceptance Criteria

The system is not done until:

- events are data-driven
- events can block Continue
- events can expire
- events can create follow-ups
- event actions change game state
- staff recommendations appear
- AI schools can react through events
- event spam is controlled
- player can delegate categories
- news and inbox are separate
- events support testing
- at least 200 event templates exist by beta
- event logs allow replay
- AI text cannot invent facts

---

# Part IV — Integration Between the Three Systems

## Recruiting to Development

Recruiting must feed development.

A recruit’s:
- hidden work ethic
- coachability
- frame
- potential
- academic discipline
- ambition
- loyalty
- promised role
- NIL expectation

must carry into the player profile after signing.

The player should later discover whether their recruiting evaluation was right.

## Development to Recruiting

Development reputation affects recruiting.

If the program develops QBs:
- QB recruits care more.
- QB staff gains reputation.
- NFL pipeline improves.
- portal QBs may show more interest.

If a program wastes talent:
- elite recruits become skeptical.
- transfer risk rises.
- staff evaluations are questioned.

## Inbox to Recruiting

Inbox drives recruiting decisions:
- rival push alerts
- visit results
- scout reports
- deadline warnings
- promise conflicts
- commitment announcements

## Inbox to Development

Inbox surfaces:
- morale issues
- breakout reports
- position change suggestions
- academic trouble
- transfer concerns
- development stalls
- injury rehab

## Recruiting to Inbox

Recruiting produces:
- high-priority alerts
- staff recommendations
- family concerns
- NIL shifts
- visit outcomes
- flips
- signing day drama

## Development to Inbox

Development produces:
- player improves
- player stagnates
- player unhappy
- player requests role
- staff recommends redshirt
- player wants transfer

---

# Part V — Sandbox Layer

## Sandbox North Star

Sandbox tools exist for two reasons:

1. They let the player customize the game world.
2. They let the developer/player tune the simulation until it feels right.

The sandbox should not flatten the game. It should make it more flexible.

## Sandbox Setup Options

### World Options

- number of teams
- fictional vs real schools
- conference layout
- prestige distribution
- recruiting geography strength
- talent density
- playoff size
- bowl system
- promotion/relegation mode
- historical era mode
- transfer rules
- NIL rules
- scholarship/roster rules

### Sim Balance Options

- scoring environment
- offensive explosiveness
- defensive dominance
- upset frequency
- injury frequency
- development speed
- bust rate
- breakout rate
- transfer volatility
- recruiting randomness
- NIL market aggression
- staff movement frequency
- conference realignment frequency
- scandal frequency

### Player Difficulty Options

- AI recruiting aggressiveness
- hidden attribute opacity
- staff report accuracy
- budget strictness
- roster rules strictness
- promise consequences
- media pressure
- AD patience
- transfer risk severity

### Debug Options

- reveal hidden attributes
- force event
- force recruit decision
- simulate 10 seasons
- export world state
- compare sim distributions
- inspect AI school logic
- replay event log
- edit player
- edit recruit
- edit school
- edit ruleset

## Sandbox Should Be Separated

Player-facing:
- New Career Advanced Setup
- Commissioner Mode
- In-Game Editor
- Data Lab

Developer-facing:
- Debug Console
- Sim Runner
- Balance Dashboard
- Event Inspector
- AI Decision Inspector

## Sandbox Acceptance Criteria

- sandbox can tune sim without code changes
- user can create alternate CFB worlds
- debug tools are not mixed into normal gameplay
- sim exports distribution reports
- all major rule systems are configurable
- world can be saved and shared
- edits are logged

---

# Part VI — AI Coding Instructions

## General Instruction

The AI coder should build this as a long-term simulation platform, not a quick prototype.

Every task must include:
- schema update
- simulation logic
- UI screen or hook
- tests
- save/load compatibility
- sample data
- acceptance criteria

## Implementation Priority

1. Data schemas
2. Headless simulation
3. Save/load
4. Inbox engine
5. Player model
6. Recruiting model
7. UI screens
8. Staff delegation
9. Sandbox tools
10. Balance dashboards

## Non-Negotiables

- deterministic seeds
- no UI-only game state
- every action logged
- every Continue checks blocking events
- every player has hidden traits
- every recruit has uncertainty
- every staff report can be wrong
- every system exports debug data
- every major decision has consequences
- every sim run can be replayed

## AI Prompt Template for Each Module

```text
You are implementing [MODULE] for a CFB management sim inspired by Football Manager depth.

Read:
- global scope
- entity schemas
- relevant system spec
- testing requirements

Deliver:
1. data model
2. simulation logic
3. UI components
4. action handlers
5. event hooks
6. tests
7. sample data
8. acceptance checklist

Do not build placeholder-only UI.
Do not hardcode rules that belong in config.
Do not skip tests.
Do not create state that cannot be saved.
```

---

# Part VII — Minimum Beta Definition

The game reaches serious beta when:

- 134-team universe can run 20 seasons.
- recruiting classes are generated and signed.
- player careers persist and develop.
- players transfer, redshirt, graduate, get injured, improve, regress.
- staff influence recruiting and development.
- Inbox drives weekly decisions.
- user can delegate tasks.
- AI schools manage rosters.
- playoffs and postseason work.
- financial/NIL model influences decisions.
- sandbox tools tune the world.
- statistical outputs look plausible.
- no major impossible states appear in long-run tests.
- UI has dense tables, filters, saved views, nested tabs, and drill-down profiles.

---

# Part VIII — Fun Future Ideas

These are not core beta requirements, but they are strong expansion candidates.

## Historical What-If Mode

Start in:
- 1985
- 1995
- 2005
- 2014
- 2024

Each era has:
- different rules
- different conferences
- different postseason
- different recruiting geography
- different offensive/defensive trends
- different NIL/transfer rules

## Athletic Director Mode

Instead of just football:
- hire/fire football coach
- allocate department budget
- upgrade facilities
- manage conference affiliation
- balance academics and athletics
- eventually add basketball/baseball

## Coach Career RPG

The player begins as:
- GA
- position coach
- coordinator
- G5 head coach
- P4 head coach

Career traits:
- recruiting guru
- QB developer
- defensive mind
- CEO coach
- disciplinarian
- players’ coach
- analytics coach

## Scandal / Compliance System

Fictionalized system:
- booster violations
- academic fraud
- tampering
- staff misconduct
- player discipline
- media leaks
- internal investigation

## Media Universe

- reporters have personalities
- podcasts rank coaches
- fan boards react
- rivals spread rumors
- press conferences matter
- recruits notice public comments

## Coaching Tree System

Track:
- assistants hired away
- former players become coaches
- coaching trees
- rivalry between protégés
- scheme families

## Advanced Playbook Builder

Eventually:
- offensive concepts
- personnel groupings
- tempo
- run/pass tendency
- formation families
- defensive fronts
- coverage shells
- blitz packages

## Ownerless World Simulation

Let the world run for 100 years and watch:
- dynasties rise
- powers collapse
- conferences change
- records fall
- coaching trees spread
- recruiting pipelines shift

---

# Final Principle

The game should feel alive even when the player does nothing.

The player is not clicking through static screens. The player is sitting inside a living college football universe where every recruit, player, coach, booster, rival, and institution has incentives.

The real goal is not to make a sports dashboard.

The real goal is to make the player say:

“I’ll just hit Continue one more time.”

And then lose three hours.
