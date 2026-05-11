# 34 — Transfer Portal and Retention Engine Spec

## North Star

The transfer portal should feel like modern roster free agency, but with college-football constraints:

- role
- NIL
- development
- relationships
- homesickness
- coaching changes
- eligibility
- timing
- academic fit
- roster opportunity

The user should be able to fight to keep players, but not always succeed.

## Core Loop

```text
monitor roster satisfaction
→ identify transfer risks
→ trigger meetings/events
→ player decides whether to enter portal
→ schools evaluate portal players
→ offers/visits/role promises
→ commitment/enrollment
→ roster/depth impact
```

## Transfer Risk Formula

```text
transferRisk =
  playingTimeDissatisfaction
+ roleMismatch
+ NILShortfall
+ brokenPromises
+ lowCoachRelationship
+ homesickness
+ academicIssue
+ schemeChange
+ positionCrowding
+ highAmbition
+ externalInterest
+ coachingChange
- loyalty
- teamSuccess
- developmentSatisfaction
- strongRelationships
- leadershipConnection
```

Every term needs reason codes.

## Player Transfer Profile

```ts
type TransferProfile = {
  transferRisk: number;
  riskBand: "low" | "watch" | "concern" | "high" | "imminent";
  mainReasons: ReasonCode[];
  likelyDestinations: SchoolId[];
  portalStatus:
    | "not_considering"
    | "considering"
    | "meeting_requested"
    | "entered_portal"
    | "committed_transfer"
    | "withdrawn";
  portalEntryWeek?: GameWeek;
  retentionMeetings: RetentionMeeting[];
};
```

## Portal Windows

Ruleset-driven.

Support:

- main portal window
- spring window if enabled
- coaching-change exception
- graduate transfer exception
- custom sandbox rules

Do not hardcode current rules.

## Entering Portal

Triggers:

- high transfer risk
- coach fired/leaves
- coordinator leaves
- role promise broken
- NIL unmet
- depth chart blocked
- scheme change
- academic/campus fit issue
- family/location pressure
- disciplinary/culture issue, toned down

Not all high-risk players enter. Loyalty and relationships matter.

## Retention Meetings

User actions:

- promise role
- promise competition
- increase NIL
- offer direct benefit
- explain development path
- suggest position change
- involve position coach
- involve family
- be honest
- encourage transfer
- delay

Outcomes:

- stays
- stays temporarily
- enters portal
- morale changes
- promise created
- trust changes
- teammates notice
- staff opinion changes

## Portal Player Entity

Portal players can be existing players or generated transfers.

Fields:

- current school
- prior school
- eligibility
- position
- ratings/scouted ranges
- stats
- reason for transfer
- NIL expectation
- role expectation
- academic transfer risk
- immediate eligibility status
- preferred destinations
- interest by school

## Portal Search

Filters:

- position
- class/eligibility
- ability
- potential
- NIL expectation
- role expectation
- interest
- academic risk
- scheme fit
- prior production
- injury history
- hometown
- portal reason
- immediate eligibility

## Portal Recruiting

Actions:

- contact
- offer role
- offer NIL
- offer direct benefit
- schedule visit
- pitch development
- pitch winning
- pitch location
- promise starting job
- withdraw interest

Portal recruiting is faster and more role/NIL-driven than HS recruiting.

## AI Portal Behavior

AI schools use portal to:

- fill urgent holes
- replace transfers
- chase win-now upgrades
- support new coach scheme
- recover from recruiting misses

AI can overuse portal and hurt culture/development.

## Tampering / Compliance Risk

For private sim, include abstract risk.

Risk sources:

- contacting before portal
- booster pressure
- repeated patterns
- staff integrity
- aggressive NIL timing

Events:

- rumor
- warning
- internal review
- reputation hit

Keep toned down.

## Portal Effects On Team

Portal losses affect:

- depth chart
- team vibe
- morale
- recruiting needs
- staff reputation
- fan confidence
- NIL pressure

Portal additions affect:

- depth chart
- promises
- player morale
- chemistry
- development path
- team vibe

## Events

- player considering portal
- player requests meeting
- player enters portal
- portal target interested
- portal window closing
- former recruit enters portal
- star player poached
- position room worried
- staff recommends retention plan
- NIL demand from player
- transfer commits

## Tests

Required:

- playing time increases risk
- NIL shortfall increases risk for money-focused player
- strong relationship reduces risk
- coach change increases risk
- retention meeting can reduce risk
- promise creates future obligation
- player can enter only valid window unless exception
- portal player can join new school
- AI uses portal for roster hole
- save/load preserves portal status

## Long-Run Validation

Track:

- portal volume
- transfer reasons
- star transfers
- position distribution
- NIL-driven transfers
- playing-time transfers
- coach-change transfers
- retention success
- AI portal usage
- portal-heavy program outcomes

## Acceptance Criteria

Portal system is acceptable when:

- players leave for understandable reasons
- user can sometimes talk players out of leaving
- user cannot retain everyone
- NIL/role/development/location all matter
- AI schools use portal plausibly
- portal changes roster strategy
- long-run volume is plausible
