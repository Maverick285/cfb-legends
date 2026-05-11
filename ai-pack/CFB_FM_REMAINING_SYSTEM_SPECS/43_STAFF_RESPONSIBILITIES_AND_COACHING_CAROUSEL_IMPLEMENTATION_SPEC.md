# 43 — Staff, Responsibilities, and Coaching Carousel Implementation Spec

## North Star

Staff are not cosmetic.

They should generate information, create uncertainty, influence player development, drive recruiting, affect tactics, carry relationships, and create program instability when they leave.

A good staff should make the user feel smarter.
A bad staff should make the user feel blind.

## Staff Roles

Football leadership:

- Head Coach
- Offensive Coordinator
- Defensive Coordinator
- Special Teams Coordinator
- General Manager / Director of Player Personnel
- Assistant Head Coach

Position coaches:

- QB
- RB
- WR
- TE
- OL
- DL
- EDGE
- LB
- CB
- S
- Specialists

Support/recruiting:

- Recruiting Coordinator
- Transfer Portal Director
- Scouting Analyst
- High School Relations
- Strength Coach
- Medical/Rehab
- Academic Advisor
- Compliance Officer
- NIL Liaison
- Booster Relations
- Media Relations
- Data Analyst

## Staff Entity

```ts
type Staff = {
  id: StaffId;
  identity: StaffIdentity;
  role: StaffRole;
  schoolId?: SchoolId;
  contract: StaffContract;
  attributes: StaffAttributes;
  personality: StaffPersonality;
  preferences: StaffPreferences;
  relationships: StaffRelationships;
  biases: StaffEvaluationBias;
  workload: StaffWorkload;
  reputation: StaffReputation;
};
```

## Staff Attributes

Categories:

- recruiting
- evaluation
- player development
- position teaching
- tactical knowledge
- game planning
- play calling
- motivation
- discipline
- relationship building
- analytics
- NIL pitch
- academic support
- compliance judgment
- media handling
- booster relations

## Staff Personality

- ambition
- loyalty
- ego
- integrity
- patience
- adaptability
- pressure handling
- conflict tolerance
- work rate
- risk tolerance
- player empathy
- political skill

## Staff Bias

Bias examples:

- overvalues size
- overvalues speed
- underrates small-school prospects
- trusts veterans
- loves raw athletes
- avoids academic risk
- chases stars
- scheme zealot
- dislikes portal
- NIL aggressive
- old-school disciplinarian

Bias affects reports and recommendations.

## Responsibilities

Each responsibility has owner and mode.

Modes:

- user controls
- staff recommends
- staff handles routine
- staff handles unless critical
- staff fully controls
- committee

Responsibility categories:

- recruiting board
- scouting assignments
- offers
- visits
- portal scouting
- depth chart
- redshirts
- practice plan
- individual development plans
- player meetings
- game plan
- NIL recommendations
- academic monitoring
- compliance review
- staff hiring shortlist

## Staff Reports

Report types:

- recruit evaluation
- player development
- depth chart recommendation
- transfer risk
- practice fatigue
- game plan
- opponent scout
- NIL market
- academic risk
- staff workload
- facility needs

Reports include:

- summary
- recommendation
- confidence
- evidence
- bias risk
- action options

Staff can disagree.

## Workload

Workload sources:

- assigned recruits
- position group size
- practice duties
- scouting travel
- game plan work
- player meetings
- staff vacancies
- season phase

High workload effects:

- slower reports
- lower accuracy
- missed contacts
- burnout
- morale decline
- leaving risk

## Staff Hiring

Candidate fields:

- role fit
- attributes
- personality
- scheme fit
- recruiting regions
- development specialty
- contract demand
- ambition
- reputation
- baggage/risk
- relationship to existing staff
- career goal

Hiring actions:

- search
- filter
- interview
- request recommendation
- offer contract
- negotiate title
- negotiate salary
- promise autonomy
- withdraw

## Contracts

Fields:

- salary
- years
- buyout
- bonuses
- title
- play-calling rights
- recruiting territory
- autonomy
- promotion clause
- retention bonus

Staff can ask for:

- raise
- extension
- promotion
- more autonomy
- better budget
- coordinator role
- head coach opportunity

## Coaching Carousel

Occurs mostly offseason, but rumors can happen in-season.

Triggers:

- poor performance
- hot seat
- retirement
- staff poached
- coordinator success
- scandal/controversy, toned down
- school ambition
- conference movement
- booster pressure

Effects:

- recruiting instability
- player transfer risk
- staff chemistry
- scheme changes
- program identity
- AI school trajectory

## Staff Movement

When staff leave:

- relationships may leave
- recruits may decommit
- players may enter portal
- scheme install may reset
- development may suffer
- new staff may bring targets/players

## Coaching Trees

Track:

- staff under head coach
- promotions
- former players turned coaches
- assistants becoming head coaches
- scheme lineage
- rivalry branches

## Events

- staff report completed
- staff disagreement
- staff asks raise
- rival contacts staff
- staff burns out
- staff recommends recruit
- staff wants autonomy
- staff accepts job
- coordinator fired
- staff hire candidate found

## UI

Staff workspace tabs:

- Overview
- Responsibilities
- Reports
- Staff Search
- Contracts
- Workload
- Chemistry
- Coaching Tree
- Recruiting Territories
- Analytics

## Tests

Required:

- staff report accuracy affected by evaluation
- staff bias changes recommendation
- staff workload reduces accuracy
- responsibilities delegate actions
- staff contract saves/loads
- staff can be poached
- staff leaving affects recruit/player state
- AI school hires staff
- coaching tree updates

## Acceptance Criteria

Staff system is acceptable when:

- staff affect recruiting
- staff affect development
- staff affect scouting uncertainty
- staff affect practice/game prep
- responsibilities/delegation work
- staff reports can be wrong
- staff can disagree
- staff can leave
- coaching carousel changes the world
