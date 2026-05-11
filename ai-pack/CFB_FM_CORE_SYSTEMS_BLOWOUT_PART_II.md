# CFB-FM Core Systems Expansion Spec — Part II

## Purpose

This document expands the next three major systems that determine whether the game feels like a true Football Manager-style college football universe instead of a shallow dashboard:

1. Staff, Responsibilities, and Program Operations
2. Game Simulation, Tactics, Practice, and Matchday
3. Finance, NIL, Boosters, Facilities, and Sandbox/Data Lab

These systems connect directly to the first blowout document:

- Recruiting needs staff.
- Player development needs staff and practice.
- Inbox needs staff reports and program events.
- Game results must reflect tactics, roster quality, morale, injuries, staff quality, scheme fit, and randomness.
- Finance/NIL must affect recruiting, retention, staffing, facilities, and long-term program power.
- Sandbox/Data Lab must let the player tune the game until the simulation feels right.

The goal remains the same:

> Build a true college-football Football Manager experience: dense, menu-driven, data-rich, alive, unpredictable, configurable, and addictive.

---

# Part I — Staff, Responsibilities, and Program Operations

## Staff System North Star

Staff should not be decorative.

In a true FM-style college football sim, staff are one of the player’s most important tools. They evaluate recruits, develop players, prepare game plans, maintain relationships, manage morale, handle academics, recommend depth-chart changes, recruit territories, detect risks, and sometimes create problems.

The player should feel like they are running a large program with a real organization underneath them.

Staff should create:
- information
- uncertainty
- delegation
- disagreement
- bottlenecks
- specialization
- relationships
- politics
- continuity
- instability
- hidden competitive advantage

A good staff should make the player feel smarter. A bad staff should make the player feel blind.

## Staff Design Philosophy

FM works because the user does not directly control everything. The game constantly asks:

- Do you trust this assistant?
- Is this scout wrong?
- Is this coach better at development or recruiting?
- Do you delegate or micromanage?
- Do you accept a staff recommendation?
- Do you replace a loyal coach with a better technician?
- Do you hire a recruiter who is weak tactically?
- Do you risk losing a great coordinator to a bigger job?

College football adds even more staff importance because recruiting, NIL, player retention, development, academics, and transfer management are constant.

The staff model should produce meaningful tradeoffs.

No perfect staff should be affordable or easily retained.

## Staff Roles

The base game should support these staff categories:

### Football Leadership

- Head Coach
- Offensive Coordinator
- Defensive Coordinator
- Special Teams Coordinator
- General Manager / Director of Player Personnel
- Assistant Head Coach

### Position Coaches

- QB Coach
- RB Coach
- WR Coach
- TE Coach
- OL Coach
- DL Coach
- EDGE Coach, optional depending scheme
- LB Coach
- CB Coach
- Safety Coach
- Specialists Coach

### Recruiting / Personnel

- Recruiting Coordinator
- National Recruiting Director
- Regional Recruiter
- High School Relations Director
- Transfer Portal Director
- Scouting Analyst
- Recruiting Analyst
- Film Evaluator

### Player Development

- Strength & Conditioning Coach
- Player Development Director
- Sports Psychologist
- Nutrition Director
- Medical Director
- Athletic Trainer
- Rehab Specialist

### Program Operations

- Compliance Officer
- Academic Advisor
- Tutor Coordinator
- NIL Liaison
- Booster Relations Director
- Media Relations Director
- Operations Director
- Equipment/Logistics Manager

### Analytics

- Football Analyst
- Data Analyst
- Opponent Scout
- Quality Control Coach
- Self-Scout Analyst

## Staff Entity Schema

```json
{
  "id": "staff_2031_ou_qbcoach_001",
  "firstName": "Marcus",
  "lastName": "Reed",
  "displayName": "Marcus Reed",
  "age": 38,
  "role": "QB Coach",
  "programId": "school_ou",
  "contract": {
    "salary": 475000,
    "yearsRemaining": 2,
    "buyout": 250000,
    "bonusClauses": ["CFP appearance", "Top 10 offense"]
  },
  "background": {
    "almaMater": "Fictional State",
    "formerPlayer": true,
    "formerPosition": "QB",
    "coachingTree": "Air Raid",
    "homeRegion": "Texas"
  },
  "personality": {
    "ambition": 16,
    "loyalty": 9,
    "ego": 12,
    "discipline": 10,
    "mediaSavvy": 11,
    "integrity": 14,
    "adaptability": 13,
    "workRate": 17
  },
  "attributes": {
    "qbDevelopment": 17,
    "recruiting": 14,
    "evaluation": 12,
    "tacticalKnowledge": 15,
    "relationshipBuilding": 16,
    "motivation": 13,
    "discipline": 9,
    "analytics": 8,
    "nilPitch": 10,
    "academicSupport": 7
  },
  "relationships": {
    "headCoach": 72,
    "oc": 65,
    "players": {},
    "recruits": {},
    "highSchoolCoaches": {}
  },
  "preferences": {
    "scheme": "Air Raid",
    "recruitingRegions": ["TX", "OK"],
    "playerArchetypes": ["Pocket Distributor", "Processor"],
    "riskTolerance": 0.42
  }
}
```

## Staff Attribute Categories

### Coaching Attributes

- Position Development
- Technique Teaching
- Scheme Teaching
- Film Teaching
- Game Planning
- Play Calling
- Motivation
- Discipline
- Player Management
- Adaptability
- Tactical Creativity
- Halftime Adjustments
- Practice Organization
- Talent Utilization

### Recruiting Attributes

- Talent Evaluation
- Relationship Building
- Closing Ability
- Regional Knowledge
- High School Coach Network
- Parent Communication
- NIL Pitching
- Academic Pitching
- Prestige Pitching
- Underdog Pitching
- National Recruiting
- Local Recruiting
- Portal Recruiting
- Work Rate

### Personnel Attributes

- Roster Construction
- Portal Evaluation
- Scholarship Management
- Risk Assessment
- Contract/Budget Judgment
- Position Projection
- Hidden Gem Detection
- Bust Detection
- Staff Hiring Judgment
- Long-Term Planning

### Personality Attributes

- Ambition
- Loyalty
- Ego
- Integrity
- Patience
- Discipline
- Adaptability
- Conflict Tolerance
- Media Comfort
- Pressure Handling
- Player Empathy
- Political Skill

### Analytical Attributes

- Data Literacy
- Self-Scout Skill
- Opponent Scout Skill
- Tendency Detection
- Play Efficiency Analysis
- Recruiting Analytics
- Injury Risk Analysis
- Development Projection
- Budget Efficiency

## Staff Hidden Traits

Hidden traits should matter.

Examples:
- hates recruiting
- excellent closer
- bad with parents
- elite film teacher
- poor practice organizer
- great locker room presence
- scheme zealot
- flexible tactician
- secretly wants head coach job
- likely to leave quickly
- loyal to current head coach
- conflict with boosters
- poor compliance judgment
- great at identifying sleepers
- overvalues size
- overvalues speed
- underrates small-school prospects
- favors upperclassmen
- trusts young players
- bad under pressure
- strong local high school relationships

## Staff Responsibilities System

The player should be able to delegate by responsibility.

### Recruiting Responsibilities

- build initial board
- assign scouts
- evaluate film
- recommend offers
- contact recruits
- schedule visits
- manage scholarship board
- handle low-priority recruits
- monitor flip risk
- monitor rival activity
- portal scouting
- walk-on identification

### Roster Responsibilities

- recommend depth chart
- manage redshirts
- monitor transfer risk
- recommend position changes
- recommend cuts/non-renewals if ruleset supports
- monitor academic risk
- manage player meetings
- track promises
- handle morale issues

### Practice Responsibilities

- create weekly practice plan
- manage individual development plans
- assign reps
- manage fatigue
- manage injury recovery
- plan scout team
- run film review
- prepare special teams

### Game Responsibilities

- offensive game plan
- defensive game plan
- special teams plan
- in-game play calling, later
- halftime adjustments
- clock strategy
- fourth-down decisions
- substitution logic
- weather adjustments

### Program Responsibilities

- NIL liaison management
- booster communication
- academic support
- compliance monitoring
- media obligations
- staff contracts
- facility requests
- budget monitoring

## Responsibility Modes

Each responsibility should support these modes:

- User controls all
- Staff recommends only
- Staff handles routine items
- Staff handles unless high priority
- Staff fully controls
- Committee recommendation
- Auto-delegate by category

Example:

```json
{
  "responsibility": "Recruiting Offers",
  "mode": "Staff recommends only",
  "primaryStaffId": "staff_recruiting_director_001",
  "approvalRequiredAboveStars": 3,
  "approvalRequiredForScholarship": true
}
```

## Staff Reports

Staff reports are how the game creates FM-like texture.

Report types:

### Recruiting Reports

- initial prospect evaluation
- updated film review
- visit feedback
- family concern
- rival pressure
- NIL expectation
- academic risk
- fit comparison
- offer recommendation
- withdrawal recommendation
- sleeper recommendation

### Player Reports

- monthly development report
- practice standout
- regression concern
- morale concern
- position change recommendation
- redshirt recommendation
- transfer risk alert
- injury rehab update
- leadership report
- academic concern

### Team Reports

- position room health
- depth chart risk
- staff workload
- locker room morale
- practice quality
- game plan readiness
- opponent matchup
- self-scout tendency
- penalty discipline
- injury risk

### Program Reports

- budget report
- NIL market report
- donor sentiment
- fan confidence
- AD confidence
- facility comparison
- conference revenue report
- compliance review

## Staff Report Accuracy

Reports should not be perfectly accurate.

Accuracy depends on:
- staff evaluation skill
- staff relationship with player/recruit
- scout confidence
- workload
- time spent
- region familiarity
- position expertise
- hidden bias
- morale
- ambition
- internal politics

Example:
A bad evaluator might call a recruit a “must-take” because of size, while a great analyst flags poor agility and low coachability.

## Staff Disagreement

Staff should disagree.

Example:

```text
GM:
“Do not take another quarterback. We already have three scholarship QBs underclassmen.”

OC:
“This is the best thrower on our board. I want him.”

Recruiting Coordinator:
“We are third, but a visit could swing it.”
```

Disagreement creates real gameplay. The user must choose which voice to trust.

## Staff Workload

Staff workload should matter.

Workload sources:
- recruiting targets assigned
- player group size
- scouting assignments
- game planning duties
- meetings
- travel
- staff vacancies
- season phase

High workload effects:
- lower report accuracy
- slower scouting
- missed recruit contact
- player morale issues missed
- development plan quality drops
- increased staff burnout
- higher chance of leaving

## Staff Hiring

Staff hiring should feel like FM hiring.

Candidate fields:
- role fit
- attributes
- compensation expectation
- contract length
- buyout
- scheme fit
- recruiting regions
- development specialties
- ambition
- loyalty
- reputation
- career goals
- relationships
- baggage
- availability

Hiring actions:
- search candidates
- filter candidates
- interview
- request references
- offer contract
- negotiate salary
- negotiate role title
- promise coordinator autonomy
- promise recruiting region
- promise future promotion
- withdraw offer

## Staff Contracts

Staff contracts should include:
- salary
- term
- buyout
- bonuses
- title
- responsibilities
- autonomy
- recruiting territory
- non-compete style restriction, optional fictional
- retention bonus
- promotion clause
- performance clause

Staff can demand:
- raise
- extension
- title promotion
- play-calling duty
- recruiting control
- coordinator role
- facilities upgrade
- staff budget increase

## Coaching Carousel

The coaching carousel must eventually be a major offseason system.

Events:
- head coaches fired
- coordinators hired away
- assistants poached
- retirements
- scandals
- promotions
- rival approaches staff
- staff wants interview permission
- staff accepts job
- staff leaves after bowl
- staff leaves immediately
- staff takes recruits with him, maybe

Effects:
- recruiting instability
- player morale
- scheme changes
- staff chemistry
- development disruption
- fan confidence
- AD confidence

## Staff Chemistry

Staff chemistry affects:
- report consistency
- player development
- recruiting coordination
- scheme implementation
- staff retention
- morale
- conflict events

Chemistry factors:
- scheme alignment
- personality alignment
- prior relationships
- success
- role clarity
- ambition conflicts
- head coach management
- pay disparity
- public criticism

## Program Operations Screen

Tabs:
1. Staff Overview
2. Responsibilities
3. Staff Search
4. Contracts
5. Reports
6. Workload
7. Chemistry
8. Coaching Tree
9. Open Positions
10. Candidate Shortlist
11. Delegation Rules
12. Program Operations
13. Academic/Compliance Staff
14. Recruiting Territories
15. Staff Analytics

## Staff Overview Columns

- name
- role
- age
- salary
- contract years
- reputation
- development
- recruiting
- tactics
- evaluation
- region
- scheme
- ambition
- loyalty
- workload
- morale
- risk of leaving
- relationship with HC
- key strength
- key weakness

## Staff Analytics

Metrics:
- recruit hit rate
- scout accuracy
- player development by position
- injury rate by position
- morale by position
- transfer rate by position
- offer-to-commit efficiency
- visit conversion rate
- hidden gem discoveries
- bust recommendations
- staff workload efficiency
- cost per value added

## Staff Events

- staff recommends target
- staff disagrees with board
- staff asks for raise
- staff contacted by rival
- staff wants more autonomy
- staff conflict
- staff improves attribute
- staff develops recruiting relationship
- staff loses high school connection
- staff burns out
- staff caught in compliance issue
- staff retires
- staff becomes head coach candidate
- staff brings candidate from old school
- staff relationship with player saves transfer

## Staff Acceptance Criteria

The staff system is not done until:

- every major responsibility can be delegated
- staff generate reports
- staff can be wrong
- staff can disagree
- staff workload matters
- staff affect recruiting
- staff affect player development
- staff affect game prep
- staff contracts and hiring exist
- staff can leave or be poached
- staff chemistry exists
- position coaches matter by position
- GM/personnel director matters
- academic/compliance staff matter
- player/recruit relationships with staff persist
- staff analytics can evaluate performance

## Fun Future Ideas for Staff

### Coaching Tree Mode

Track every assistant who leaves and becomes a coordinator/head coach. Rivalries emerge between coaching tree branches.

### Staff Personality Drama

A brilliant OC refuses to recruit. A legendary recruiter cannot coach technique. A young analyst wants play-calling power. A loyal position coach becomes outdated.

### Alumni Staff

Former star players can become coaches. They bring prestige and recruiting juice but may lack technical coaching skill.

### Staff Scandal Layer

A staffer may get accused of tampering, recruiting violations, or personal misconduct. The player must decide whether to suspend, defend, fire, or investigate.

---

# Part II — Game Simulation, Tactics, Practice, and Matchday

## Game Simulation North Star

The game engine should not come first, but it cannot be fake forever.

The player does not need 3D football early. The player needs results that feel earned, explainable, and connected to the management systems.

A good match engine answers:

- Did my roster construction matter?
- Did my player development matter?
- Did my staff matter?
- Did my game plan matter?
- Did injuries and morale matter?
- Did my opponent’s scheme matter?
- Did randomness happen in a believable way?
- Can I understand why I won or lost?

The first engine can be statistical. The final engine can be play-by-play. But every phase must produce believable outputs.

## Simulation Build Ladder

### Level 1 — Result + Box Score Engine

Inputs:
- team ratings
- player ratings
- scheme
- injuries
- home field
- morale
- coaching
- weather
- randomness

Outputs:
- final score
- team stats
- player stats
- injuries
- morale changes
- rankings effects

### Level 2 — Drive Engine

Inputs:
- same as Level 1
- field position
- drive tendencies
- offensive/defensive efficiency
- turnovers
- explosive play probabilities
- red zone efficiency

Outputs:
- drive chart
- scoring sequence
- win probability
- key plays summary

### Level 3 — Play-by-Play Engine

Inputs:
- personnel groups
- formations
- play calls
- down/distance
- fatigue
- substitutions
- matchups

Outputs:
- play log
- player-level results
- tactical feedback
- advanced stats

### Level 4 — 2D Viewer

Visualizes:
- field position
- drives
- formations, abstracted
- play direction
- key moments
- momentum

### Level 5 — 3D Optional

Only after game is already excellent.

## Team Ratings

Team ratings should be derived from players, staff, scheme, morale, and preparation.

Team aggregate categories:
- overall offense
- rushing offense
- passing offense
- explosive offense
- efficiency offense
- red zone offense
- third down offense
- pass protection
- run blocking
- QB play
- receiver separation
- offensive depth

- overall defense
- run defense
- pass defense
- pass rush
- coverage
- tackling
- red zone defense
- third down defense
- havoc
- defensive depth

- special teams
- kicker reliability
- punting
- return game
- coverage units

- coaching
- scheme fit
- game planning
- motivation
- adjustment
- discipline

- intangible
- morale
- chemistry
- home field
- rivalry motivation
- fatigue
- pressure handling

## Player-to-Team Aggregation

Do not average all players equally.

Use depth chart and role weights.

Example QB impact:
- starter: 80%
- backup: 15%
- third string: 5%

Example OL impact:
- five starters each 16%
- sixth OL 8%
- depth 12% combined

Example WR impact:
- WR1: 28%
- WR2: 22%
- WR3: 18%
- TE/RB receiving: variable
- depth: 10%

Injuries and fatigue should adjust these weights.

## Scheme System

Schemes should matter.

### Offensive Schemes

- Air Raid
- Spread RPO
- Power Spread
- Pro Style
- Option
- Triple Option
- Veer and Shoot
- West Coast
- Smashmouth
- Tempo Spread
- Balanced Multiple

Scheme attributes:
- run/pass tendency
- tempo
- formation width
- QB run usage
- TE usage
- RB receiving usage
- deep shot frequency
- screen frequency
- option usage
- play-action reliance
- explosive volatility
- ball control
- OL requirements
- QB requirements

### Defensive Schemes

- 4-3
- 3-4
- 4-2-5
- 3-3-5
- Nickel Base
- Multiple
- Quarters
- Man Pressure
- Zone Match
- Bend but Don’t Break
- Aggressive Blitz
- Stack Defense

Defensive attributes:
- front structure
- blitz rate
- man/zone rate
- coverage shell
- run fit aggressiveness
- havoc focus
- explosive prevention
- red zone style
- substitution demands
- DB requirements
- LB requirements
- DL requirements

## Scheme Fit

Each player should have scheme fit by role.

Example:
A QB with great processing and accuracy but poor mobility fits Pro Style and Air Raid better than RPO.

An undersized but fast LB fits 3-3-5 better than 3-4.

Scheme fit affects:
- performance
- development
- morale
- recruiting
- transfer risk
- staff recommendations

## Playbook Complexity

Playbooks should have complexity ratings.

High complexity:
- better ceiling
- worse for young players
- more turnovers/assignment errors
- requires high IQ
- needs good staff

Low complexity:
- better early results
- lower ceiling
- easier installs
- helps young teams

## Game Plan Screen

Tabs:
1. Overview
2. Offensive Plan
3. Defensive Plan
4. Special Teams
5. Opponent Scout
6. Matchups
7. Weather
8. Injury/Fatigue
9. Practice Prep
10. Staff Recommendations
11. Analytics
12. Risk Report

## Offensive Game Plan Options

- run/pass balance
- tempo
- aggressiveness
- fourth-down aggression
- deep passing
- short passing
- RPO usage
- QB run usage
- screen usage
- play action
- inside run
- outside run
- target distribution
- protect QB
- attack weak corner
- avoid star defender
- rotate backs
- use young players
- conserve starter, if mismatch

## Defensive Game Plan Options

- stop run
- stop pass
- contain QB
- pressure QB
- limit explosives
- force turnovers
- bend but don’t break
- man coverage
- zone coverage
- blitz frequency
- spy QB
- bracket star WR
- load box
- rotate DL
- play freshmen
- conservative tackling
- aggressive strip attempts

## Special Teams Plan

- kick return aggression
- punt return aggression
- fake likelihood
- directional kicking
- avoid returner
- long FG threshold
- fourth-down vs FG logic
- kickoff depth
- onside threshold

## Matchup System

Matchups drive outcomes.

Examples:
- LT pass block vs RE pass rush
- WR speed vs CB speed
- WR route running vs CB man coverage
- QB processing vs defense disguise
- RB vision vs LB run fits
- OL run blocking vs DL gap discipline
- OC play calling vs DC adjustment
- kicker clutch vs pressure/weather

Matchup reports should surface:
- advantage
- disadvantage
- exploit
- danger
- staff confidence
- suggested plan

## Weather Effects

Weather:
- clear
- rain
- heavy rain
- wind
- cold
- snow
- heat
- humidity

Effects:
- passing accuracy
- deep passing
- kicking
- ball security
- fatigue
- injuries
- attendance
- tempo
- upset probability

## Home Field

Home field should depend on:
- stadium size
- attendance
- fan intensity
- rivalry
- night game
- weather familiarity
- travel distance
- altitude, optional
- team momentum
- student section
- program prestige

Effects:
- false starts
- communication issues
- morale boost
- pressure on opponent
- officiating slight bias, optional sandbox
- recruit visit impact

## Rivalry Games

Rivalry games should have special logic:
- morale boost
- higher volatility
- stronger fan reaction
- bigger recruiting effects
- bigger AD/fan confidence effects
- historical streak tracking
- event package
- player emotion

## Practice System Integration

Practice feeds game readiness.

Weekly practice outputs:
- readiness
- fatigue
- injury risk
- morale
- development
- game plan familiarity
- position group confidence
- discipline
- assignment error risk

Practice choices:
- intense contact
- light contact
- recovery
- opponent prep
- fundamentals
- red zone
- third down
- two-minute
- special teams
- ball security
- tackling
- pass protection
- blitz pickup
- film study

Tradeoffs:
- intense practice improves readiness but increases injuries/fatigue
- light practice lowers injury risk but may reduce sharpness
- opponent prep helps upcoming game but less development
- fundamentals help long term but less matchup-specific boost

## In-Game Management

Eventually, the player may choose:
- watch result only
- watch key moments
- drive-by-drive
- full play-by-play
- delegate to coordinators

In-game decisions:
- go for it
- punt
- field goal
- onside
- challenge/review, if applicable
- change tempo
- change run/pass balance
- bench player
- rotate backups
- aggressive/conservative defense
- protect lead
- two-minute strategy
- halftime adjustments

## Coordinator Autonomy

If delegated:
- OC/DC call game based on their traits
- risk tolerance matters
- adaptability matters
- scheme preference matters
- relationship with head coach matters
- staff quality affects adjustments

## Game Output Reports

Postgame report should include:
- final score
- scoring summary
- box score
- player stats
- injuries
- key plays
- win probability swing
- what worked
- what failed
- staff comments
- recruit reactions
- morale changes
- ranking implications
- conference race implications
- analytics summary

## Advanced Stats

Team:
- success rate
- explosiveness
- EPA-like metric
- havoc rate
- finishing drives
- field position
- pace
- pressure rate
- missed tackles
- penalties
- turnover luck

Player:
- QB efficiency
- yards after contact
- yards per route
- pressure allowed
- run stops
- coverage grade
- missed tackles
- explosive plays created
- assignment busts
- clutch plays

## Rankings and Postseason

Ranking model should consider:
- record
- strength of schedule
- margin
- quality wins
- bad losses
- conference championship
- injuries, optional committee logic
- prestige bias, optional sandbox
- recency
- head-to-head
- poll inertia

Postseason outputs:
- conference standings
- tie breakers
- conference title games
- bowl selection
- CFP bracket
- home-field first-round games, ruleset dependent
- awards
- All-Conference
- All-American
- draft declarations

## Awards

Awards:
- Heisman-like award
- positional awards
- freshman awards
- coach of year
- coordinator awards
- conference awards
- academic awards

Award logic:
- stats
- team success
- prestige
- media attention
- position bias
- narrative momentum

## Game Simulation Acceptance Criteria

The game simulation system is not done until:

- box scores are believable
- player stats are believable
- teams win/lose for explainable reasons
- roster quality matters
- scheme fit matters
- staff matters
- practice matters
- injuries matter
- morale matters
- home field matters
- weather matters
- rivalry effects exist
- rankings and postseason work
- postgame reports explain outcomes
- long-run stats match real-ish CFB distributions
- no absurd stat lines dominate unless rare
- lower programs can upset higher programs
- elite programs are strong but not invincible
- sandbox tuning can adjust scoring, volatility, injuries, upsets, and stat environment

## Fun Future Ideas for Game Simulation

### Broadcast Text Mode

A stylized play-by-play ticker with announcer flavor and rivalry/history callbacks.

### 2D Chalkboard Viewer

Instead of 3D, use animated Xs and Os, drive charts, and win probability graphs.

### Coordinator Cam

Watch the game from the perspective of the OC/DC with suggested adjustments.

### Film Room

After games, generate a film-style breakdown:
- three plays that decided the game
- one player who graded better than stats showed
- one hidden problem
- one tactical adjustment recommendation

### Historical Style Eras

Era presets:
- wishbone 1970s
- power football 1990s
- spread revolution 2000s
- RPO era
- NIL/portal chaos era

---

# Part III — Finance, NIL, Boosters, Facilities, and Sandbox/Data Lab

## Finance/NIL North Star

College football is not just a sport. It is a money, power, influence, politics, and resource allocation game.

The finance/NIL system must create strategic tradeoffs.

The player should never simply “buy everyone.” Money should help, but money should also create expectations, politics, jealousy, budget constraints, and risk.

The game should model:
- athletic department budget
- football budget
- staff salaries
- recruiting budget
- travel budget
- facilities
- NIL ecosystem
- direct school benefit allocations
- booster groups
- donor confidence
- fan sentiment
- media revenue
- conference revenue
- playoff/bowl payouts
- ticket sales
- merchandise
- program prestige

## Money Model

Separate money into buckets.

### Athletic Department Budget

Broad institutional support.

Uses:
- staff salary pool
- facilities
- travel
- operations
- academics
- compliance
- medical
- recruiting

### Football Operating Budget

Day-to-day program spend.

Uses:
- recruiting travel
- scouting
- support staff
- equipment
- camps
- analytics
- nutrition
- development

### NIL Ecosystem

Third-party or collective-like support.

Uses:
- recruit influence
- player retention
- star player market value
- public profile
- donor campaigns

### Direct Benefits / Revenue Share

Ruleset-dependent school-paid player benefits.

Uses:
- player allocation
- retention
- recruiting expectations
- roster strategy

### Facility Capital

Long-term investment.

Uses:
- stadium
- locker room
- weight room
- indoor facility
- nutrition center
- academic center
- recovery/medical
- recruiting lounge

## Financial Entity Schema

```json
{
  "programId": "school_ou",
  "season": 2031,
  "finances": {
    "athleticDepartmentBudget": 185000000,
    "footballOperatingBudget": 42000000,
    "staffSalaryPool": 14000000,
    "recruitingBudget": 3200000,
    "facilityBudget": 9000000,
    "nilEcosystemStrength": 88,
    "nilCollectiveAvailable": 14500000,
    "directBenefitPool": 20500000,
    "boosterConfidence": 76,
    "fanSentiment": 82,
    "adConfidence": 71
  }
}
```

## Revenue Sources

- conference media distribution
- ticket sales
- luxury suites
- donor contributions
- merchandise
- bowl payout
- playoff payout
- sponsorships
- neutral-site games
- rivalry games
- facility naming rights
- student fees, optional
- university subsidy, optional
- booster campaigns
- historical prestige

## Expenses

- head coach salary
- assistant salaries
- analyst salaries
- support staff
- recruiting travel
- scouting services
- player development
- nutrition
- medical/rehab
- academic support
- facilities maintenance
- facilities upgrades
- equipment
- travel
- compliance
- NIL administration
- direct player benefits
- buyouts
- legal/compliance events
- scandal costs

## NIL Ecosystem

NIL is not just a wallet.

NIL should include:
- collective strength
- donor enthusiasm
- market size
- local business interest
- player brand value
- position market value
- team success
- social media presence
- player personality
- controversy risk
- family/handler pressure

Player NIL value depends on:
- star rating
- position
- performance
- social media
- personality
- hometown/local appeal
- team prestige
- media exposure
- rivalry hero moments
- awards
- draft buzz

## NIL Deal Types

- local car dealership
- restaurant deal
- apparel deal
- camp appearance
- autograph signing
- social media promotion
- collective stipend
- donor-backed deal
- performance-adjacent bonus, avoid if ruleset disallows
- charity appearance
- podcast/media content

## NIL Effects

Positive:
- improves recruiting
- improves retention
- boosts morale for paid players
- increases program appeal
- raises star power

Negative:
- locker room jealousy
- booster influence
- unrealistic expectations
- recruit bidding wars
- budget exhaustion
- public criticism
- compliance risk
- player entitlement
- broken promises

## Direct Benefits / Revenue Share

Ruleset configurable.

Fields:
- pool amount
- allocation by player
- allocation by position
- allocation by class
- performance-related restrictions
- compliance flags
- reporting rules

Strategic choices:
- pay stars
- distribute broadly
- prioritize recruits
- prioritize retention
- prioritize portal
- prioritize QB/OL/DL
- reward leadership
- avoid jealousy

## Booster System

Boosters should be semi-independent political actors.

Booster attributes:
- wealth
- patience
- influence
- favorite position
- favorite staff member
- risk tolerance
- ego
- public profile
- compliance risk
- rivalry obsession
- NIL willingness
- facility willingness
- meddling tendency

Booster events:
- wants meeting
- funds NIL push
- withdraws support
- demands staff firing
- wants son/nephew considered
- offers facility donation
- leaks criticism
- backs rival candidate
- demands rivalry win
- causes compliance concern

## Donor Segments

Instead of modeling every donor at first, use segments.

Segments:
- mega boosters
- former players
- local business donors
- general alumni
- student/fan small donors
- corporate partners
- NIL-focused donors
- facility-focused donors

Each segment has:
- money
- enthusiasm
- patience
- priorities
- risk
- relationship score

## Fan Sentiment

Fan sentiment should affect:
- attendance
- pressure
- booster confidence
- recruiting atmosphere
- AD patience
- media tone
- home-field advantage

Fan sentiment drivers:
- wins/losses
- rivalry games
- offensive style
- defense
- recruiting class rank
- portal losses
- scandals
- coach personality
- bowl/CFP success
- player retention
- ticket prices

## AD / Board Confidence

AD confidence differs from fan sentiment.

AD cares about:
- objectives
- budget discipline
- academics
- compliance
- winning
- donor relations
- media reputation
- staff stability
- long-term trajectory

Board/University cares about:
- reputation
- money
- compliance
- academics
- scandals
- political pressure

## Facilities

Facilities must affect recruiting and development.

Facility categories:
- stadium
- locker room
- weight room
- indoor practice
- practice fields
- nutrition
- recovery/medical
- academic center
- recruiting lounge
- player housing, if included
- analytics/film center
- equipment
- fan experience

Facility ratings:
- 1-20 user-facing
- condition
- prestige
- effect type
- upkeep cost
- upgrade cost
- construction time
- donor funding possibility

Facility effects:
- recruiting appeal
- development
- injury recovery
- morale
- fan attendance
- home field
- NIL appeal
- staff appeal

## Facility Projects

Project fields:
- name
- cost
- donor funding
- school funding
- duration
- disruption
- benefit
- risk
- approval requirement
- fan reaction
- recruiting impact

Examples:
- upgrade locker room
- build indoor facility
- expand stadium
- renovate weight room
- build recovery center
- add recruiting lounge
- improve academic center
- add luxury suites

## Finance Screen

Tabs:
1. Overview
2. Budget
3. Revenue
4. Expenses
5. Staff Salaries
6. Recruiting Budget
7. NIL Ecosystem
8. Direct Benefits
9. Boosters
10. Facilities
11. Donor Campaigns
12. Fan Sentiment
13. AD Objectives
14. Forecast
15. Compliance Risk
16. Sandbox/Data Lab

## Finance Overview Widgets

- total budget
- football budget
- staff salary pool
- recruiting spend
- NIL ecosystem strength
- direct benefit pool
- booster confidence
- fan sentiment
- facility rank
- AD confidence
- deficit/surplus
- upcoming obligations
- risk alerts

## Budget Decisions

- increase recruiting budget
- reduce staff pool
- request facility funds
- ask boosters for NIL support
- allocate direct benefits
- invest in academics
- invest in analytics
- invest in medical
- increase ticket prices
- schedule neutral-site game
- schedule body-bag game, if lower program
- request AD budget increase

## Financial Pressure

If finances are poor:
- staff leave
- recruiting suffers
- facilities decline
- fan sentiment drops
- AD pressure rises
- NIL weakens
- transfer risk rises
- development slows

If finances are strong:
- expectations rise
- boosters meddle more
- staff demand more
- recruits expect more
- fans become impatient

## Compliance Risk

Compliance should be abstracted but present.

Risk sources:
- aggressive boosters
- NIL ambiguity
- staff integrity
- recruit promises
- transfer tampering
- academic shortcuts
- player benefits
- scandal events

Compliance events:
- internal review
- warning
- investigation
- self-report
- minor penalty
- major penalty
- staff suspension
- scholarship/roster penalty, ruleset dependent
- reputation loss

## Sandbox/Data Lab North Star

The sandbox layer is essential.

The user wants sandbox tools because:
- they are fun
- they allow custom worlds
- they help tune the sim engine
- they let the player explore what-if scenarios
- they reduce frustration
- they support testing

Sandbox should be powerful but organized.

## Sandbox Modes

### Standard Career

Normal FM-like experience.

### Advanced Setup

Player configures:
- teams
- rules
- conferences
- playoff
- talent density
- finances
- NIL
- transfer volatility
- injury rate
- scoring environment

### Commissioner Mode

Player can edit:
- teams
- players
- recruits
- staff
- conferences
- rules
- schedules
- budgets
- facilities

### Data Lab

Player can:
- run 10/20/100 season simulations
- export stats
- compare to real distributions
- inspect AI decisions
- adjust weights
- tune randomness
- view graphs
- detect unrealistic outputs

### Chaos Mode

Optional fun mode:
- realignment frequent
- portal volatility high
- scandals common
- NIL market wild
- playoff expansion likely
- coaches leave often
- boosters meddle heavily

## Sandbox Parameters

### World

- team count
- conference count
- fictional/real schools
- promotion/relegation
- regionality
- prestige distribution
- talent density
- high school distribution
- pipeline strength
- walk-on strength

### Rules

- scholarship limits
- roster limits
- redshirt rules
- transfer windows
- playoff size
- bowl system
- NIL legality
- direct benefits
- staff limits
- recruiting calendar
- signing periods

### Simulation

- scoring
- pace
- offensive explosiveness
- defensive strength
- upset frequency
- injury frequency
- fatigue severity
- weather severity
- home-field strength
- rivalry volatility
- ranking bias
- blue blood inertia

### Recruiting

- recruit randomness
- scouting opacity
- NIL importance
- distance-from-home importance
- playing-time importance
- flip frequency
- late bloomer frequency
- bust frequency
- sleeper frequency
- AI aggression

### Development

- development speed
- potential volatility
- regression chance
- injury development penalty
- facility impact
- staff impact
- playing time impact
- hidden attribute opacity

### Finance

- revenue scale
- NIL market size
- donor meddling
- facility cost scale
- staff salary inflation
- budget strictness
- compliance strictness

## Data Lab Reports

Reports:
- scoring distribution
- win distribution
- upset frequency
- undefeated teams
- recruiting class distribution
- player development curves
- transfer volume
- injury volume
- staff movement
- financial health
- playoff diversity
- conference balance
- blue blood dominance
- G5 success
- stat leader realism

## Data Lab Acceptance Criteria

Data Lab is not done until:

- can run headless sim from UI
- can run multi-season batch
- can export CSV/JSON
- can show charts
- can compare against target ranges
- can flag unrealistic outputs
- can save balance presets
- can load balance presets
- can inspect AI decisions
- can replay a season
- can generate AI QC report input

## Finance/NIL/Sandbox Acceptance Criteria

This system is not done until:

- money affects recruiting
- money affects retention
- staff salaries matter
- facilities affect recruiting/development
- boosters create opportunities and problems
- NIL is separate from direct benefits
- fan sentiment and AD confidence differ
- budget tradeoffs exist
- facility projects exist
- compliance risk exists
- sandbox can tune major systems
- Data Lab can validate sim realism
- custom presets can be saved
- financial overpowered strategies have consequences

## Fun Future Ideas for Finance/Sandbox

### Booster Personality RPG

Major boosters become characters. Some are helpful. Some are nightmares.

### Athletic Department Empire Mode

The player controls multiple sports and must balance football with basketball, baseball, women’s sports, Title IX-style constraints, facilities, and conference politics.

### Conference Commissioner Mode

The player controls a conference:
- invite schools
- negotiate TV deals
- set championship format
- manage bowl tie-ins
- fight other conferences

### Full Realignment Sandbox

Drag-and-drop conferences, protected rivalries, scheduling pods, revenue sharing, playoff access.

### NIL Marketplace Simulator

A fictionalized NIL marketplace with brands, collectives, social media, player agents, family influence, and locker room jealousy.

---

# Part IV — Integration Across These Three Systems

## Staff to Game Simulation

Staff affect:
- game plan quality
- play calling
- halftime adjustments
- practice quality
- player development
- discipline
- morale
- injury prevention
- tactical fit

## Staff to Finance

Staff affect:
- salary budget
- booster confidence
- fan confidence
- recruiting efficiency
- program prestige
- AD objectives
- buyout risk

## Finance to Staff

Money affects:
- staff quality
- staff retention
- analyst pool
- support staff
- scouting budget
- development resources

## Finance to Game Simulation

Money affects:
- facilities
- player development
- injury recovery
- staffing
- recruiting
- depth
- morale

## Sandbox to Everything

Sandbox must be able to tune:
- staff movement
- scoring
- finances
- NIL volatility
- recruiting difficulty
- development speed
- injuries
- playoff system
- rankings
- portal chaos

## Inbox Hooks

Every system must produce Inbox items.

Staff:
- coach asks for raise
- staff recommends change
- assistant is poached

Game:
- opponent scout report
- injury before game
- postgame analysis

Finance:
- booster funds project
- NIL shortfall
- AD budget meeting

Sandbox/Data Lab:
- sim realism warning
- distribution outlier
- suggested tuning change

---

# Part V — AI Coding Instructions

## Staff Module Prompt

```text
Implement the Staff, Responsibilities, and Program Operations system.

Requirements:
- staff schema
- staff attributes
- contracts
- staff hiring/search
- staff reports
- responsibility delegation
- workload
- staff chemistry
- staff relationships
- staff impact on recruiting/development/game prep
- inbox events
- tests
- save/load support

Do not make staff cosmetic.
Every staff member must affect at least one gameplay system.
```

## Game Simulation Module Prompt

```text
Implement the Game Simulation, Tactics, Practice, and Matchday system.

Requirements:
- team rating aggregation from players
- scheme system
- game plan screen data
- Level 1 box score sim
- postgame reports
- practice readiness/fatigue integration
- weather/home/rivalry modifiers
- ranking/postseason hooks
- statistical validation exports
- tests

Do not build 3D.
Build believable outputs first.
```

## Finance/NIL/Sandbox Module Prompt

```text
Implement the Finance, NIL, Boosters, Facilities, and Sandbox/Data Lab system.

Requirements:
- budget schema
- revenue/expense model
- NIL ecosystem
- direct benefit allocations
- booster system
- facility projects
- fan/AD confidence
- compliance risk
- sandbox world/rules/sim parameters
- Data Lab batch simulation
- export reports
- tests

Do not make money a simple score.
Money must create choices, pressure, and consequences.
```

---

# Part VI — Minimum Combined Beta Definition

These systems are beta-ready when:

- staff reports shape decisions every week
- staff can be trusted, doubted, hired, fired, poached, and delegated to
- game results are believable and explainable
- practice affects both development and game readiness
- scheme fit matters
- finances affect roster building without becoming pure pay-to-win
- NIL creates both recruiting advantages and locker room problems
- boosters create opportunities and headaches
- facilities matter long term
- sandbox can create custom worlds
- Data Lab can tune realism
- every system generates Inbox events
- 20-year simulations produce plausible dynasties, collapses, staff movement, recruiting cycles, and postseason outcomes

---

# Final Principle

The game should not feel like three separate systems.

It should feel like one living machine:

Staff identify players.  
Money helps or limits the pursuit.  
Facilities and coaches develop them.  
Practice prepares them.  
Games reveal the truth.  
Results change perception.  
Perception changes recruiting.  
Recruiting changes the roster.  
The roster changes the future.  
The Inbox turns it all into decisions.

That is the loop.
