# 38 — Attribute, Trait Cluster, and Scouting Language Spec

## North Star

The game should describe players like football people do.

Not just:

```text
Speed 16
Work Ethic 17
Hip Fluidity 6
```

But:

```text
Late-developing gym rat with strong study habits and real competitive fire, but stiff hips limit his change of direction.
```

The underlying truth is structured data.
The scouting language is derived from that data.
LLMs may rewrite grounded reports, but they cannot invent facts.

## Attribute Registry

Every attribute needs:

- id
- display name
- group
- valid range
- position relevance
- development category
- hidden/visible status
- scouting difficulty
- outcome effects
- trait cluster links

## Attribute Object

```ts
type AttributeDefinition = {
  id: string;
  displayName: string;
  group:
    | "physical"
    | "movement"
    | "technical"
    | "football_iq"
    | "mental"
    | "personality"
    | "durability"
    | "academic_life"
    | "market_brand";
  visibleByDefault: boolean;
  hidden: boolean;
  min: number;
  max: number;
  positionRelevance: Record<Position, number>;
  developmentCategory: string;
  scoutingDifficulty: number;
  outcomeEffects: string[];
};
```

## Required Attribute Groups

## Physical

- speed
- acceleration
- strength
- explosiveness
- stamina
- jumping
- frame
- flexibility
- durability

## Movement

- agility
- change of direction
- balance
- hip fluidity
- bend
- footwork
- lateral quickness

## Football IQ

- processing
- awareness
- anticipation
- play recognition
- assignment discipline
- communication
- situational awareness
- film study

## Mental

- composure
- pressure handling
- competitiveness
- consistency
- confidence
- aggression
- discipline
- resilience
- leadership
- teamwork

## Personality / Hidden

- work ethic
- coachability
- loyalty
- ambition
- ego
- money sensitivity
- transfer openness
- family influence
- social stability
- academic discipline
- practice effort
- big-game nerve

## Market / Brand

- brand appeal
- media comfort
- social profile
- local marketability
- NIL ambition

## Trait Cluster Categories

- development curve
- work/preparation
- competitive/mental
- body/movement
- football IQ
- personality/retention
- role/scheme
- risk

## Trait Cluster Object

```ts
type TraitClusterDefinition = {
  id: string;
  label: string;
  category: string;
  visibility: "public" | "scouted" | "staff_opinion" | "hidden" | "debug";
  positive: boolean | "mixed";
  derivationRules: TraitRule[];
  evidenceTemplates: string[];
  gameplayEffects: string[];
  positionApplicability: Record<Position, number>;
};
```

## Trait Rule

```ts
type TraitRule = {
  attributeId: string;
  operator: ">=" | "<=" | "between";
  value: number | [number, number];
  weight: number;
};
```

## Required Trait Labels

## Development

- Early Bloomer
- Late Developer
- Late Bloomer
- Raw Tools Prospect
- Physically Maxed
- Boom/Bust
- High Floor
- High Ceiling
- Multi-Year Project
- Ready-Made Contributor

## Work/Preparation

- Gym Rat
- Film Junkie
- Studious
- Practice Player
- Self-Starter
- Needs Pushing
- Coasts on Talent
- Inconsistent Worker

## Competitive/Mental

- Gamer
- Big-Game Player
- Quiet Competitor
- Alpha
- Steady Hand
- Confidence Player
- Volatile Competitor
- Clutch
- Shrinks Under Pressure

## Body/Movement

- Long Frame
- Compact Build
- Twitchy
- Linear Athlete
- Fluid Mover
- Stiff-Hipped
- Bad Hips
- Heavy Feet
- Natural Bender
- Frame to Add Weight
- Maxed-Out Frame

## Football IQ

- Quick Processor
- Slow Processor
- Assignment Sound
- Instinctive
- Freelancer
- Overthinker
- Playbook Sponge
- Mental Bust Risk

## Personality/Retention

- Money-Motivated
- Development-Focused
- Homebody
- Location-Sensitive
- Playing-Time Driven
- Relationship Recruit
- Brand Builder
- NFL-Or-Bust
- Loyal Program Guy
- Portal Risk
- High Maintenance
- Low Drama

## Role/Scheme

- Air Raid Fit
- RPO Fit
- Power Run Fit
- Zone Run Fit
- Option Fit
- Nickel Defender
- Box Safety
- Space Backer
- Edge Projection
- Slot Weapon
- Special Teams Floor

## Risk

- Academic Risk
- Injury Risk
- Transfer Risk
- Bust Risk
- High Variance
- Low Certainty Evaluation
- Scheme Risk
- Position Projection Risk
- Medical Red Flag

## Example Derivation: Bad Hips

```text
hipFluidity <= 6
changeOfDirection <= 8
lateralQuickness <= 8
position applicability:
  CB high
  S high
  LB medium
  WR medium
  RB medium
  OL low
  DL low/medium
```

Effects:

- worse recovery in man coverage
- worse route cuts
- worse lateral pursuit
- worse space tackling

## Example Derivation: Gym Rat

```text
workEthic >= 16
practiceEffort >= 15
discipline >= 11
strength/conditioning growth history positive
```

Effects:

- responds better to strength practice
- lower practice-effort event risk
- better offseason physical development

## Example Derivation: Money-Motivated

```text
money preference >= 0.75
NIL sensitivity high
brand exposure preference medium/high
```

Effects:

- NIL matters more in recruiting
- transfer risk rises if NIL shortfall
- may respond to booster/NIL pitch

## Scouting Confidence

Trait labels should have confidence.

```ts
type TraitClusterInstance = {
  traitId: string;
  confidence: number;
  visibility: string;
  evidence: string[];
  staffSourceId?: StaffId;
  lastUpdated: GameDate;
};
```

Confidence depends on:

- scouting depth
- staff evaluation skill
- staff bias
- time observed
- position familiarity
- report quality
- prospect/player consistency

## Staff Bias

Staff may disagree.

Example:

```text
WR Coach: “Raw but explosive.”
Recruiting Director: “High variance.”
Strength Coach: “Frame can add weight.”
```

This should be supported.

## Scouting Report Payload

LLM payloads must be grounded.

```ts
type ScoutingReportPayload = {
  entityId: string;
  reportType: string;
  visibleFacts: Record<string, unknown>;
  traitLabels: TraitClusterInstance[];
  scoutedRanges: ScoutedRatings;
  staffOpinions: StaffOpinion[];
  forbiddenClaims: string[];
  tone: string;
};
```

## Fallback Report Templates

No LLM required.

Template sections:

- Summary
- What We Like
- What Worries Us
- Scheme Fit
- Development Plan
- Risk
- Recommendation

## LLM Rules

LLM may:

- vary wording
- write staff voice
- summarize evidence
- add immersion tone

LLM may not:

- invent injuries
- invent NIL amounts
- invent commitments
- invent violations
- invent ratings
- invent hidden traits not in payload

## Clickability

Trait labels must be clickable.

Clicking shows:

- definition
- evidence
- confidence
- staff source
- similar past players
- gameplay implications
- recommended actions

## Tests

Required:

- Bad Hips derives from correct attributes
- Gym Rat derives from work traits
- Money-Motivated derives from preferences
- confidence changes with scouting depth
- staff bias changes label confidence/opinion
- hidden labels not shown publicly
- LLM payload contains forbidden claims
- fallback report works offline
- trait label effects appear in matchup/recruiting/dev systems

## Acceptance Criteria

This system is acceptable when:

- attributes are defined centrally
- labels derive from data
- labels include evidence/confidence
- scouting reports are grounded
- staff can disagree
- labels affect gameplay
- labels are clickable
- LLM cannot invent facts
