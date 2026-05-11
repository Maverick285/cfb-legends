# 32 — AI School Program Manager Spec

## North Star

The game world only works if AI-controlled schools are real participants.

Every AI school must manage:

- roster
- recruiting
- staff
- NIL
- transfers
- practice identity
- scheme
- finances
- depth chart
- player development
- postseason goals
- program direction

The AI does not need to be perfect. It needs to be plausible, varied, and capable of both success and mistakes.

## Core Loop

Every AI school runs a seasonal management cycle:

```text
evaluate program state
→ set goals
→ evaluate roster needs
→ recruit
→ use portal
→ manage retention
→ hire/fire staff
→ set depth chart
→ set practice identity
→ simulate games
→ react to results
→ adjust strategy
```

## AI Program Profile

```ts
type AIProgramProfile = {
  schoolId: SchoolId;
  archetypes: AIProgramArchetype[];
  riskTolerance: number;
  NILAggression: number;
  portalAggression: number;
  loyaltyToStaff: number;
  patience: number;
  developmentFocus: number;
  recruitingAmbition: number;
  schemeRigidity: number;
  localRecruitingBias: number;
  academicStrictness: number;
  boosterPressureSensitivity: number;
};
```

## AI Archetypes

- blue-chip chaser
- regional pipeline builder
- development factory
- portal mercenary
- NIL aggressor
- scheme-first underdog
- defensive grinder
- tempo chaos program
- academic filter
- booster-chaos program
- patient builder
- impatient blue blood
- conservative roster manager
- high-risk recruiter

AI schools can combine archetypes.

Example:

```text
Blue blood with NIL aggressor + impatient booster profile.
```

## Program Evaluation

AI evaluates:

- record
- recent success
- roster talent
- roster balance
- recruiting class
- transfer risk
- staff quality
- finances/NIL
- fan/booster confidence
- conference position
- schedule difficulty
- draft output
- development output

Output:

- short-term priority
- long-term priority
- pressure level
- risk posture

## Roster Management

AI must evaluate:

- current depth chart
- next-year depth
- eligibility losses
- likely transfers
- position needs
- playing-time promises
- NIL allocation
- portal needs
- recruiting needs

AI mistakes allowed:

- overstack a position
- miss a QB cycle
- ignore special teams
- trust bad evaluation
- chase stars over fit
- mismanage promises

But mistakes should come from profile and constraints.

## Recruiting AI

AI process:

```text
build needs map
score prospects
create board
assign staff
offer
schedule visits
make pitches
adjust to competitor pressure
fallback when losing
sign class
```

AI prospect score:

```text
fitScore =
  rosterNeed
+ talentEvaluation
+ schemeFit
+ locationFit
+ interest
+ NILAffordability
+ developmentFit
+ staffPipeline
- risk
- opportunityCost
```

AI board should contain tiers:

- must-get
- high priority
- solid fit
- fallback
- watchlist

## Portal AI

AI uses portal when:

- roster hole
- poor recruiting class
- coach change
- win-now pressure
- NIL available
- starter injured/transferred
- scheme change

Portal AI should weigh:

- immediate ability
- eligibility
- NIL cost
- fit
- locker room impact
- player risk
- opportunity cost

## Retention AI

AI must try to keep important players.

Retention decisions:

- promise role
- increase NIL/direct benefit
- staff meeting
- development plan
- accept transfer
- encourage transfer
- replace via portal

AI should not retain everyone.

## Staff AI

AI handles:

- hiring
- firing
- extensions
- poaching
- role changes
- scheme changes

Inputs:

- performance
- staff reputation
- budget
- scheme fit
- recruiting success
- development output
- booster/fan pressure

AI can make bad hires.

## NIL AI

AI allocates NIL by strategy.

Profiles:

- star-heavy
- broad distribution
- recruit-focused
- retention-focused
- QB/skill focused
- trenches focused
- conservative compliance
- aggressive booster

AI must use clearinghouse and budget constraints.

## Depth Chart AI

Inputs:

- current ability
- staff opinion
- scheme fit
- player role promises
- development priority
- fatigue/injury
- morale
- experience

AI may choose:

- best player now
- develop younger player
- honor promise
- preserve redshirt
- rotate

## Practice AI

AI sets practice based on:

- coach philosophy
- team fatigue
- upcoming opponent
- development needs
- team vibe
- injuries
- scheme install

Profiles:

- intense disciplinarian
- player-friendly
- fundamentals-heavy
- analytics prep
- development-focused
- gameplan-heavy

## Game Plan AI

AI chooses:

- tempo
- run/pass tendency
- aggression
- defensive focus
- special teams aggression
- clock strategy

Inputs:

- scheme
- opponent weakness
- own roster
- injuries
- weather
- game stakes
- coach risk tolerance

## Program Trajectory

AI schools can rise or fall.

Rise causes:

- great staff
- strong recruiting
- NIL growth
- facilities
- development
- draft output
- conference opportunity

Fall causes:

- bad hires
- staff turnover
- poor development
- booster chaos
- weak NIL
- recruiting misses
- transfer losses
- facility stagnation

No school is permanently dominant by label.

## AI Decision Reason Codes

Every AI major decision should export reason codes.

Examples:

```text
need_qb_next_cycle
nil_budget_insufficient
local_pipeline_priority
coach_hot_seat_win_now
depth_chart_blocks_recruit
development_reputation_high
```

## Data Lab AI Reports

For each AI school, export:

- recruiting strategy
- portal strategy
- NIL allocation
- roster needs
- staff decisions
- mistakes/risks
- program trajectory

## Events

AI decisions should create world news:

- rival signs top recruit
- coach fired
- staff poached
- star transfers
- NIL push
- conference power rising
- dynasty forming
- program collapse

## Tests

Required:

- AI builds needs map
- AI recruits by position need
- AI fills class
- AI uses portal for holes
- AI retains star differently than backup
- AI depth chart is legal
- AI respects budget/NIL constraints
- AI can make profile-driven choices
- AI school state saves/loads
- 20-year sim does not collapse AI rosters

## Acceptance Criteria

AI School Manager is acceptable when:

- AI schools recruit
- AI schools manage roster
- AI schools use portal
- AI schools use NIL
- AI schools hire/fire staff
- AI schools set depth charts
- AI schools develop identities
- AI mistakes are plausible
- no school is permanently great by label
- long-run world produces believable rises/falls
