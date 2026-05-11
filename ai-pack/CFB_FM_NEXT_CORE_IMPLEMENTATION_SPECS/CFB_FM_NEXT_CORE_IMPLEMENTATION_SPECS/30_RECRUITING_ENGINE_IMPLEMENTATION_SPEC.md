# 30 — Recruiting Engine Implementation Spec

## North Star

Recruiting is the college-football equivalent of FM's transfer market, youth intake, scouting, squad planning, and long-term talent pipeline.

The user should feel like they are projecting imperfect teenagers into future college players.

Recruiting should reward:

- player fit
- development vision
- geographic strategy
- staff evaluation
- scheme identity
- relationships
- NIL realism
- roster planning
- risk management

It should not be a simple points race.

## Core Loop

```text
Generate multi-year prospect pool
→ discover / identify
→ scout
→ interpret uncertainty
→ compare to roster and scheme
→ assign staff
→ contact / offer / visit / pitch
→ handle competitor pressure
→ manage NIL and promises
→ commit / decommit / flip
→ sign
→ convert to player
→ develop
→ validate evaluation years later
```

## Prospect Lifecycle

Prospects should exist across multiple years.

```text
Freshman: background pool / mostly hidden
Sophomore: early ID, low confidence
Junior: active recruiting begins
Senior: full recruiting, visits, commitments, signing
```

## Prospect Tiers

Not every high school player needs full simulation.

```text
Tier 1: national blue-chip prospects
Tier 2: FBS recruitable prospects
Tier 3: regional/depth prospects
Tier 4: generated if discovered
Tier 5: statistical background pool
```

Full detail is required for Tiers 1–3.

## Class Distribution

Configurable defaults:

```text
five-stars: about 32
four-stars: about 300
three-stars: about 1500
two-stars/unranked: large background pool
```

These should be generated from calibration data when available.

## Prospect Entity Requirements

```ts
type Prospect = {
  id: ProspectId;
  classYear: number;
  gradeLevel: "FR" | "SO" | "JR" | "SR";
  identity: ProspectIdentity;
  highSchool: HighSchoolProfile;
  position: Position;
  secondaryPositions: Position[];
  archetype: string;
  physical: PhysicalProfile;
  trueAttributes: PlayerAttributes;
  publicRating: PublicRating;
  scoutedRatings: ScoutedRatings;
  hiddenTraits: HiddenPlayerTraits;
  preferences: RecruitPreferenceWeights;
  developmentProfile: ProspectDevelopmentProfile;
  recruitmentStateBySchool: Record<SchoolId, RecruitmentState>;
  traitClusters: TraitClusterInstance[];
};
```

## Prospect Evolution

Every offseason and sometimes in-season:

```text
prospectGrowth =
  baselineAgeGrowth
+ physicalMaturation
+ highSchoolCoaching
+ workEthic
+ coachability
+ sportFocus
+ randomVariance
- injuryEffect
- stagnationRisk
```

Outcomes:

- late bloomer
- early bloomer
- stagnation
- regression
- position change
- high school transfer
- ranking rise/fall
- public overrating
- public underrating

## Public Rating vs True Ability

Public stars/rankings are not truth.

Public ratings are influenced by:

- camp exposure
- region
- school reputation
- measurables
- production
- recruiting buzz
- media visibility
- offers
- staff discovery
- scouting services bias

True ability is hidden.

Scouted ranges are school-specific.

## Scouting Confidence

Scouting confidence improves through:

- film review
- live evaluation
- camp invite
- staff visit
- official visit
- relationship depth
- regional familiarity
- position coach expertise
- data quality

Confidence decreases or remains noisy if:

- young prospect
- limited film
- position projection
- injury
- raw athlete
- poor staff evaluator
- unfamiliar region
- high variance trait profile

## Scouting Output

Scouting should produce:

- attribute ranges
- trait labels
- risk labels
- staff opinion
- scheme fit
- development projection
- NIL expectation estimate
- preference estimate
- recommendation

Reports can be wrong.

## Recruitment State

```ts
type RecruitmentState = {
  schoolId: SchoolId;
  interest: number;
  relationship: number;
  offerStatus: "none" | "watching" | "offered" | "withdrawn";
  priority: "none" | "low" | "medium" | "high" | "must_get";
  staffOwnerId?: StaffId;
  lastContactWeek?: GameWeek;
  contactFatigue: number;
  visitStatus: VisitStatus;
  pitchHistory: Pitch[];
  promises: Promise[];
  nilExpectationKnown: boolean;
  nilExpectationEstimate?: Range;
  commitmentStatus: "none" | "soft_verbal" | "verbal" | "signed";
  flipRisk: number;
  schoolRankInTopList?: number;
  reasonCodes: ReasonCode[];
};
```

## Recruit Preferences

Every recruit has weighted preferences.

```ts
type RecruitPreferenceWeights = {
  money: number;
  proDevelopment: number;
  location: number;
  playingTime: number;
  winning: number;
  academics: number;
  relationshipWithCoach: number;
  familyInfluence: number;
  brandExposure: number;
  schemeFit: number;
  conferencePrestige: number;
  campusCulture: number;
  earlyEnrollment: number;
};
```

These are hidden or partially scouted.

## Interest Formula

Recruit interest should be calculated with reason codes.

```text
interest =
  locationFit * locationPreference
+ playingTimeOpportunity * playingTimePreference
+ NILAlignment * moneyPreference
+ developmentReputation * proDevelopmentPreference
+ coachRelationship * relationshipPreference
+ schemeFit * schemeFitPreference
+ winningPrestige * winningPreference
+ academicFit * academicsPreference
+ brandExposure * brandExposurePreference
+ familyApproval * familyInfluence
+ campus/townFit * campusCulturePreference
+ visitExperience
+ staffMomentum
- depthChartBlockers
- brokenPromiseReputation
- distancePenalty
- coachingInstability
- competitorMomentum
- overContactFatigue
```

Each term must be normalized and exported as reason codes.

## Location Fit

Factors:

- distance from home
- same state
- neighboring state
- region familiarity
- family influence
- town/campus match
- weather preference
- urban/small-town preference

## Playing Time Opportunity

Inputs:

- current depth chart
- projected depth chart
- class balance
- player archetype
- roster attrition
- promises
- scheme usage
- staff honesty reputation

A recruit who values playing time should care more about this than prestige.

## NIL Alignment

Inputs:

- recruit NIL expectation
- school NIL market
- booster willingness
- direct benefits if relevant
- clearinghouse risk
- position market
- brand exposure
- locker room jealousy risk

Money should matter differently for each recruit.

## Development Reputation

Inputs:

- school draft output by position
- player development history
- position coach reputation
- facilities
- scheme usage
- comparable players
- staff stability

This is crucial for your design.

A recruit who values pro development should choose a lower NIL deal sometimes.

## Relationship

Relationship is built through:

- staff contact
- visits
- honesty
- relevant pitch
- family communication
- high school coach relationship
- prior pipeline
- promises kept/broken historically

Over-contact can backfire.

## Offers

Offer types:

- scholarship
- preferred walk-on
- roster spot with NIL support
- delayed offer
- conditional offer
- greyshirt/blueshirt if ruleset supports

Scholarship is no longer the only value signal.

## Visits

Visit types:

- unofficial visit
- official visit
- junior day
- camp
- spring game
- rivalry game
- night game
- playoff push visit

Visit components:

- staff meetings
- player host
- family meeting
- facility tour
- academic tour
- game atmosphere
- NIL meeting
- town/campus exposure
- scheme meeting

Visit outcome affects:

- interest
- relationship
- family approval
- NIL expectation
- commitment chance
- flip risk
- competitor comparison

## Pitches

Pitch types:

- early playing time
- development/NFL pipeline
- NIL/brand
- location/home
- academics
- scheme fit
- winning/playoff path
- culture/team vibe
- family comfort
- position role

A pitch works better when:

- it matches recruit preferences
- the school can actually deliver
- staff member is credible
- scouting has correctly identified preference

Bad pitches can reduce trust.

## Promises

Promise types:

- no redshirt
- chance to start
- position guarantee
- usage/role
- NIL support
- development plan
- academic support
- family access
- coach stability
- jersey number, optional flavor

Broken promises affect:

- morale
- transfer risk
- future recruiting reputation
- staff credibility
- local pipeline

## Commitments

Commitment types:

- top group
- soft verbal
- verbal
- signed
- early enrollee

Commit decision inputs:

- final interest score
- timing
- school momentum
- competitor pressure
- family influence
- loyalty
- ambition
- NIL alignment
- visit outcome
- coaching stability

## Decommit / Flip Risk

Inputs:

- loyalty
- ambition
- competitor interest
- NIL shortfall
- coaching change
- poor season
- playing-time change
- broken contact cadence
- bad visit
- family pressure
- rival momentum

Commitments are not final until signed.

## AI School Recruiting

AI schools must recruit actively.

AI school process:

```text
evaluate roster needs
identify priority positions
build board
assign staff
offer prospects
schedule visits
make pitches
react to competitor pressure
manage NIL
fill class
fallback to contingencies
```

AI archetypes:

- blue-chip chaser
- regional pipeline builder
- development-focused
- portal-heavy
- NIL aggressor
- scheme-specific
- academic-filtered
- risk-tolerant
- conservative evaluator

AI mistakes should happen:

- chase too many elites
- miss QB need
- over-recruit one position
- ignore scheme fit
- underestimate local sleeper
- lose commit after staff change

## Recruiting Board UI Requirements

Tabs:

- Overview
- Search
- Board
- Needs
- Visits
- Offers
- Staff Assignments
- Commitments
- Competitors
- Promises
- Analytics
- Late Risers
- Risk Report

Columns:

- name
- position
- class
- grade
- state
- stars
- public rank
- your eval
- scouted confidence
- interest
- relationship
- top schools
- NIL expectation
- playing-time fit
- development fit
- scheme fit
- staff owner
- last contact
- next action
- risk labels

## Recruiting Events

- scout report complete
- recruit rises/falls
- rival offer
- rival visit
- recruit asks for promise
- NIL expectation changes
- family concern
- visit result
- commitment
- decommit
- flip risk alert
- signing day decision
- staff recommends withdrawal
- late sleeper found

## Tests

Required:

- class distribution matches config
- sophomore evolves into senior
- late bloomer exists
- scouting confidence narrows range
- interest changes with NIL preference
- interest changes with playing-time preference
- location preference affects school ranking
- visit affects interest
- AI school fills class needs
- recruit cannot sign with two schools
- signed recruit becomes player with hidden traits intact
- broken promise affects future recruiting

## Long-Run Validation

Track:

- five-star distribution
- four-star distribution
- signing class sizes
- blue-chip concentration
- local recruiting patterns
- AI school recruiting quality
- late bloomer rate
- bust rate
- position balance
- NIL impact
- development-reputation impact

## Acceptance Criteria

Recruiting is acceptable when:

- prospects exist before senior year
- prospect development is dynamic
- scouting uncertainty is real
- interest has reason codes
- schools compete
- NIL matters but does not dominate
- development-focused recruits exist
- AI schools recruit plausibly
- commits/decommits/flips happen
- signing class affects future roster
- long-run distributions match targets
