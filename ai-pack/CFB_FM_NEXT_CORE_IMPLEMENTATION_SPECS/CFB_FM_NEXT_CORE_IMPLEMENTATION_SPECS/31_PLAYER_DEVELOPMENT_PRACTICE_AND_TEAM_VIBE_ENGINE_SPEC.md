# 31 — Player Development, Practice, and Team Vibe Engine Spec

## North Star

This game should be about development.

Recruiting matters because you choose players.
Practice matters because you shape them.
Culture matters because people respond differently.
Fit matters because the same player can succeed or fail in different environments.

The system must avoid the common sports-sim failure:

```text
everyone gets better every offseason
```

Realistic development includes:

- late bloomers
- early bloomers
- stagnation
- regression
- injury derailment
- position-change breakouts
- confidence swings
- hidden work ethic
- scheme fit
- staff impact
- facilities impact
- playing time impact

## Core Loop

```text
Evaluate player
→ assign role/depth
→ set practice plan
→ set individual development plan
→ manage workload and morale
→ play games / earn reps
→ weekly/monthly development tick
→ report changes
→ reassess role, retention, recruiting need
```

## Development Inputs

## Player Inputs

- current attributes
- potential
- development curve
- age/class
- work ethic
- coachability
- practice effort
- consistency
- confidence
- ambition
- injury history
- durability
- academic stress
- morale
- role satisfaction
- scheme fit
- position fit

## Environment Inputs

- position coach quality
- staff development rating
- strength coach
- facilities
- practice allocation
- individual development plan
- playing time
- game performance
- team vibe
- leadership
- depth chart competition
- injuries/fatigue

## Development Profile

```ts
type DevelopmentProfile = {
  currentAbilityByRole: Record<RoleId, number>;
  potentialAbilityByRole: Record<RoleId, HiddenNumber>;
  developmentCurve:
    | "early_bloomer"
    | "late_bloomer"
    | "steady"
    | "boom_bust"
    | "high_floor"
    | "raw_tools"
    | "physically_maxed"
    | "injury_limited";
  physicalMaturity: number;
  technicalGrowthRate: number;
  mentalGrowthRate: number;
  volatility: number;
  regressionRisk: number;
  breakoutChance: number;
  stagnationRisk: number;
  lastDevelopmentTick: GameDate;
  developmentHistory: DevelopmentLogEntry[];
};
```

## Weekly Development Tick

During season, development should be smaller and tied to practice/reps.

```text
weeklyGain =
  baseAgeCurve
+ practiceCategoryEffect
+ individualPlanEffect
+ staffDevelopmentEffect
+ facilityEffect
+ repsEffect
+ workEthicModifier
+ coachabilityModifier
+ moraleModifier
+ teamVibeModifier
- fatiguePenalty
- injuryPenalty
- academicStressPenalty
- roleConfusionPenalty
+ variance
```

## Offseason Development Tick

Offseason can be larger for physical development and role learning.

```text
offseasonGain =
  physicalMaturation
+ strengthProgram
+ technicalTraining
+ filmStudy
+ staffEffect
+ facilityEffect
+ hiddenTraitEffect
+ positionChangeEffect
- injuryRecoveryPenalty
- transferAdjustmentPenalty
+ variance
```

## Regression

Regression must exist.

Causes:

- injury
- fatigue overload
- low morale
- poor fit
- lack of reps
- bad coaching
- academic stress
- confidence collapse
- aging out for older players
- position change failure
- low work ethic
- low coachability

## Attribute-Specific Development

Not all attributes develop the same way.

### Physical

Most influenced by:

- age
- physical maturity
- strength program
- nutrition/facilities
- injury
- frame
- genetics/hidden potential

### Technical

Most influenced by:

- position coaching
- practice category
- reps
- individual plan
- coachability
- scheme fit

### Football IQ

Most influenced by:

- film study
- playing time
- staff teaching
- academic/study habits
- experience
- playbook complexity

### Mental

Most influenced by:

- game experience
- leadership
- adversity
- morale
- coach relationship
- team vibe
- big games

## Practice System

## Practice Time Units

Practice is constrained by ruleset.

```ts
type PracticeWeek = {
  schoolId: SchoolId;
  weekId: string;
  totalTimeUnits: number;
  allocations: PracticeAllocation[];
  intensity: PracticeIntensity;
  staffOwnerId?: StaffId;
  delegated: boolean;
};
```

Categories:

- fundamentals
- strength and conditioning
- film study
- position technique
- scheme install
- opponent prep
- special teams
- recovery
- academic support
- leadership/culture

## Intensity

```text
Light
Normal
Intense
Extreme
```

Effects:

```text
Light:
  lower injury/fatigue
  lower readiness/development
  morale protection

Normal:
  balanced

Intense:
  better readiness/development
  higher fatigue/injury risk
  morale strain

Extreme:
  possible short-term boost
  major fatigue/injury/morale risk
  only some personalities tolerate it
```

## Practice Outputs

Each week:

- readiness
- fatigue
- injury risk
- morale impact
- development impact
- game plan familiarity
- position group confidence
- team vibe movement

## Individual Development Plans

Examples:

- add weight
- improve route running
- improve pass protection
- improve deep accuracy
- improve ball security
- learn new position
- improve playbook understanding
- rehab focus
- leadership growth
- conditioning

IDP success depends on:

- player traits
- staff
- practice time
- facility
- morale
- focus fit
- injury/fatigue

## Position Changes

Position change inputs:

- body type
- athletic traits
- football IQ
- willingness
- role opportunity
- staff recommendation
- practice allocation
- player morale

Outcomes:

- successful conversion
- partial conversion
- stalled conversion
- morale issue
- transfer risk increase
- hidden potential unlock

## Team Vibe

Team Vibe is a team-level cultural/chemistry metric.

Components:

- average morale
- leadership strength
- coach trust
- position-room cohesion
- winning momentum
- fatigue/burnout
- conflict
- broken promises
- staff stability
- role clarity

```ts
type TeamVibe = {
  score: number;
  components: {
    morale: number;
    leadership: number;
    coachTrust: number;
    roleClarity: number;
    momentum: number;
    fatigue: number;
    conflict: number;
    brokenPromises: number;
  };
  labels: string[];
  history: TeamVibeLogEntry[];
};
```

## Team Vibe Effects

High vibe:

- better response to adversity
- fewer transfers
- better practice buy-in
- slight clutch performance stability
- recruits notice culture

Low vibe:

- transfer risk
- conflict events
- practice resistance
- blown assignments under pressure
- poor response to losses
- staff concern events

Do not make vibe a direct ratings boost. It should reduce volatility and affect behavior.

## Pep Talks and Meetings

Types:

- pre-game
- halftime
- post-game
- weekly team meeting
- crisis meeting
- position group meeting
- player 1-on-1

Tone:

- calm
- assertive
- aggressive
- passionate
- supportive
- disappointed
- demanding
- confident
- inspirational

Player reaction depends on:

- personality
- confidence
- pressure handling
- coach relationship
- recent performance
- role satisfaction
- team vibe
- leadership

Output:

- morale delta
- team vibe delta
- short-term composure/readiness effect
- trust delta
- conflict risk

Pep talks can backfire.

## Development Reports

Staff should report:

- breakout practice
- stagnation concern
- role confusion
- position-change suggestion
- workload issue
- fatigue issue
- hidden development clue
- coachability issue
- leadership growth
- confidence problem

Reports may be wrong or biased.

## Events

- player developing faster than expected
- player stagnating
- player unhappy with workload
- practice fatigue warning
- team vibe slipping
- leader calls team meeting
- pep talk backfires
- position coach recommends IDP change
- injury recovery ahead/behind schedule
- freshman struggling with playbook

## Tests

Required:

- work ethic affects development
- coachability affects technical growth
- staff quality affects growth
- facilities affect physical/recovery growth
- intense practice increases fatigue
- extreme practice can reduce morale
- recovery reduces injury risk
- team vibe affects transfer risk
- pep talk can help/hurt based on personality
- player can regress
- late bloomer can emerge
- save/load preserves development history

## Long-Run Validation

Track:

- average growth by class
- elite player scarcity
- breakout rates
- stagnation rates
- regression rates
- injury derailment
- development by school
- staff impact
- facility impact
- practice strategy impact
- position-change success

## Acceptance Criteria

This system is acceptable when:

- development is not automatic
- hidden traits matter
- practice choices matter
- staff/facilities matter
- morale/team vibe matter
- players can regress
- player identities emerge
- development drives recruiting/draft reputation
- long-run talent levels remain plausible
