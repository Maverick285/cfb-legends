# 35 — Draft and NFL Pipeline Calibration Spec

## North Star

The draft is both gameplay and calibration.

It should answer:

```text
Is the sim producing realistic elite talent?
Are development factories real?
Are school pipelines emerging causally?
Are player stats and attributes believable?
```

Draft output should feed back into:

- recruiting
- player NIL value
- staff reputation
- school prestige
- coach job offers
- program identity

## Draft Candidate Inputs

```text
current ability
potential projection
position value
size/measurable thresholds
athletic traits
technical traits
football IQ
production
competition level
scheme translation
injury history
age/class
character/personality risk
combine/pro day abstraction
school NFL pipeline
staff reputation
media visibility
```

## Draft Declaration Model

Players may declare if:

- draft stock high
- age/class eligible
- NIL not enough to retain
- ambition high
- injury risk concern
- family/money pressure
- team success
- coach advice
- projected round

Players may stay if:

- low draft grade
- high NIL
- loyalty
- unfinished goals
- development focus
- injury recovery
- strong coach relationship

## Draft Grade

```text
draftGrade =
  abilityGrade
+ traitsGrade
+ productionGrade
+ positionValue
+ sizeThreshold
+ competitionAdjustment
+ injuryAdjustment
+ ageAdjustment
+ schoolPipelineAdjustment
+ combineAdjustment
+ characterAdjustment
+ visibilityAdjustment
```

Reason codes required.

## Position Value

Different positions have different draft behavior.

High-value:

- QB
- OT
- edge
- CB
- WR

Contextual:

- RB production matters but positional value may cap
- LB/S/TE vary by traits
- K/P rare

Configurable.

## Production vs Traits

Draft should not be only stats.

Examples:

- elite production with poor size/traits may go later
- elite traits with modest production may still be drafted
- scheme-specific production may be discounted
- injuries can lower stock
- G5 stars can be drafted if traits/production strong

## School NFL Pipeline

Pipeline should matter subtly.

Inputs:

- recent draft picks by position
- staff development reputation
- scheme translation
- media exposure
- conference strength

Important:

```text
Pipeline helps visibility and trust.
It must not override player quality.
```

## Combine / Pro Day Abstraction

No need to simulate full combine early.

Use hidden event:

```text
combineResult =
  expectedAthleticism
+ preparation
+ variance
- injury
```

Can create:

- riser
- faller
- confirmed grade
- medical flag

## Draft Output

At minimum:

- rounds
- picks
- teams abstracted or generic pro slots
- undrafted free agent status
- draft grade
- reason codes

You do not need real NFL teams unless private mode wants them later.

## Draft Feedback Loops

Draft success affects:

- recruiting development pitch
- school NFL pipeline
- staff reputation
- position coach reputation
- NIL value for current players
- coach job market
- program identity labels

Example:

```text
Three QBs drafted in five years
→ QB Factory label
→ QB recruits value school more
→ OC/QB coach reputation rises
```

## Validation Metrics

Track:

- total draft picks per year
- first-round picks
- position distribution
- picks by school
- picks by conference
- picks by star background
- five-star hit rate
- four-star hit rate
- three-star breakout rate
- walk-on picks
- G5 picks
- school concentration
- draft pipeline mobility

## Red Flags

- same schools dominate forever without causal reason
- no G5 players drafted
- too many first-rounders
- too few draftable players
- stats dominate traits
- traits dominate production
- school prestige dominates everything
- NIL always prevents declarations
- players never stay
- players always stay

## Events

- player receives draft grade
- player considering declaration
- staff recommends stay/go
- player declares
- player returns
- draft result
- school produces first-rounder
- position coach reputation rises
- recruiting pitch unlocked
- draft drought warning

## Tests

Required:

- elite player gets high grade
- production improves grade
- injury lowers grade
- position value affects round
- G5 elite can be drafted
- school pipeline helps but does not dominate
- high NIL can influence return decision
- ambitious player more likely to declare
- draft result updates school pipeline
- long-run draft distribution plausible

## Acceptance Criteria

Draft system is acceptable when:

- it validates player development
- it feeds recruiting/staff/school reputation
- output distribution is plausible
- different school types can produce picks
- player decisions are explainable
- draft does not become a pure OVR list
