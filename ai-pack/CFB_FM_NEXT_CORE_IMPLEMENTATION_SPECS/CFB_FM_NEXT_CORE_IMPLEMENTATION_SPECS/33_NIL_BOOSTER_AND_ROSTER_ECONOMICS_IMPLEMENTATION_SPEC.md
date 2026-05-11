# 33 — NIL, Booster, and Roster Economics Implementation Spec

## North Star

Modern college football roster building is not controlled primarily by scholarships.

The game must model a broader economy:

```text
roster spot
scholarship status
NIL value
direct benefit allocation
playing time
development attention
coach trust
location fit
draft exposure
booster power
clearinghouse friction
```

Money should matter. It should not be the only way to win.

## Core Loop

```text
evaluate player/recruit expectations
→ estimate market value
→ allocate NIL/direct benefits/resources
→ clearinghouse review
→ player/recruit reaction
→ locker room/booster/compliance consequences
→ recruiting/retention outcome
```

## Roster Currencies

## Roster Spot

A player must occupy a roster slot unless ruleset says otherwise.

## Scholarship

Still matters, but less than older models.

Effects:

- security
- prestige
- family perception
- institutional support
- sometimes financial relief

## NIL

Third-party/collective-style market value.

Effects:

- recruiting
- retention
- morale
- jealousy
- booster pressure
- clearinghouse review

## Direct Benefits

School-administered benefit pool if ruleset enables.

Effects:

- retention
- morale
- roster strategy
- compliance reporting

## Playing Time

A scarce currency.

Effects:

- recruiting
- transfer risk
- development
- promises

## Development Attention

Coaching and practice resources are limited.

Effects:

- player growth
- morale
- staff workload

## NIL Market Value Model

Market value estimate:

```text
marketValue =
  playerTalentValue
+ positionPremium
+ productionValue
+ brandExposure
+ schoolMarketStrength
+ localBusinessInterest
+ socialProfile
+ draftBuzz
+ scarcity
+ rivalry/heroMoments
- riskDiscount
```

## Position Premium

Configurable.

Typical high value:

- QB
- elite WR
- elite edge
- elite OT
- star RB in certain contexts

But school identity can change premiums.

Example:

```text
Option team may value QB/RB differently.
Defensive school may value DL/LB more.
```

## Player Money Preference

Every player has hidden preference weights.

```ts
type PlayerPreferenceWeights = {
  money: number;
  proDevelopment: number;
  location: number;
  playingTime: number;
  winning: number;
  academics: number;
  relationshipWithCoach: number;
  brandExposure: number;
  familyInfluence: number;
};
```

Money preference affects reaction to NIL but should not erase all other values.

## NIL Deal Object

```ts
type NILDeal = {
  id: string;
  entityId: PlayerId | ProspectId;
  schoolId: SchoolId;
  amount: number;
  termWeeks: number;
  dealType:
    | "collective"
    | "local_business"
    | "appearance"
    | "social_media"
    | "autograph"
    | "camp"
    | "charity"
    | "donor_backed";
  sponsorType: string;
  proposedBy: "user" | "ai_school" | "booster" | "system";
  status:
    | "proposed"
    | "approved"
    | "approved_with_scrutiny"
    | "delayed"
    | "flagged"
    | "denied"
    | "expired";
  review: NILDealReview;
  lockerRoomImpact: number;
  boosterImpact: number;
  complianceRisk: number;
};
```

## Clearinghouse Review

The clearinghouse checks whether a deal is plausible.

Inputs:

- market value estimate
- proposed amount
- multiplier
- player profile
- position
- school NIL market
- donor risk
- deal type
- timing
- comparable deals
- repeated pattern
- recruit/player status

Statuses:

- Approved
- Approved with scrutiny
- Delayed review
- Flagged
- Denied

Denial should be rare. Flagging/delay should be more common.

## Clearinghouse Risk Formula

```text
risk =
  amountMultiplierRisk
+ lowProfileHighAmountRisk
+ timingRisk
+ donorRisk
+ repeatedPatternRisk
+ dealTypeRisk
+ marketMismatchRisk
- playerBrandJustification
- schoolMarketJustification
```

Reason codes required.

## Booster System

Booster segments:

- mega boosters
- former players
- local business donors
- general alumni
- corporate partners
- NIL-focused donors
- facility-focused donors

Each segment has:

- wealth
- enthusiasm
- patience
- influence
- risk tolerance
- meddling tendency
- compliance risk
- favorite priorities

## Booster Actions

User can:

- host event
- ask for NIL push
- ask for facility money
- meet private donor
- launch campaign
- soothe angry boosters
- reject meddling request

Outcomes:

- money gained
- confidence changed
- influence increased
- compliance risk
- political pressure

## Booster Meddling

Examples:

- wants staff fired
- wants recruit prioritized
- wants NIL money for certain position
- wants public statement
- threatens to pull support
- offers restricted donation

This should be occasional, not constant.

## Locker Room Economics

High NIL differences can create:

- jealousy
- morale issues
- leadership challenges
- transfer risk
- demands from other players
- team vibe changes

But high team vibe and leadership can buffer this.

## Direct Benefits

Ruleset-driven.

Fields:

- pool amount
- allocation method
- player allocations
- position allocations
- compliance flags
- morale impact
- retention impact

Strategies:

- star-heavy
- broad distribution
- retention-focused
- recruit-focused
- position-focused
- leadership reward

## Walk-On NIL

A player can be:

```text
walk-on with NIL deal
```

This must be supported.

Scholarship status does not determine economic value.

## Budget Constraints

Budgets:

- football operating budget
- NIL ecosystem strength
- collective available funds
- direct benefit pool
- facility campaign funds
- staff salary pool

Do not blend them into one magic money number.

## User Actions

- propose NIL deal
- negotiate NIL expectation
- allocate direct benefit
- raise booster money
- launch campaign
- ask collective for support
- decline bidding war
- spread funds broadly
- prioritize retention
- prioritize recruit
- request clearinghouse review
- self-report concern, optional

## AI School NIL Actions

AI schools should:

- estimate market value
- decide aggression
- allocate funds
- trigger clearinghouse review
- react to flags
- create bidding pressure
- sometimes overpay

## Events

- deal approved
- deal delayed
- deal flagged
- deal denied
- booster offers restricted money
- locker room jealousy
- player asks for more
- recruit NIL expectation rises
- collective funds running low
- donor anger
- compliance warning

## Tests

Required:

- walk-on can receive NIL
- high-profile QB large deal approved/scrutinized
- low-profile player absurd deal flagged
- timing risk increases score
- donor risk matters
- NIL affects recruit interest based on money preference
- NIL affects retention
- broad distribution lowers jealousy
- star-heavy distribution can create jealousy
- direct benefits separate from NIL
- save/load preserves deals

## Long-Run Validation

Track:

- deal sizes by position
- flag rate
- denial rate
- NIL impact on recruiting
- NIL impact on retention
- school NIL concentration
- money-only strategy win rate
- locker room jealousy events
- walk-on NIL cases
- booster influence

## Acceptance Criteria

This system is acceptable when:

- scholarship is not the main roster economy
- NIL matters but does not dominate
- development/location/playing time still matter
- absurd deals are flagged
- walk-on NIL is supported
- boosters help and cause problems
- locker room economics exist
- long-run NIL market remains plausible
