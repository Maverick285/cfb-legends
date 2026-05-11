# 71 — Player Comps Feature Implementation Spec

## North Star

The player comp feature should make recruits and players easier to understand without flattening them into one overall rating.

This should feel like NBA 2K-style draft comps, but adapted for college football.

The feature should help the user answer:

```text
What kind of player is this?
What is the upside?
What are the risks?
What scheme might unlock him?
Who from college football history does his profile resemble?
```

## What A Comp Is

A comp is a **similarity label** generated from structured traits and attributes.

It is not prophecy.

## Comp Types

```ts
type PlayerCompType =
  | "style"
  | "ceiling"
  | "floor"
  | "scheme"
  | "draft"
  | "developmental";
```

## Style Comp

Closest current play-style match.

Example:

```text
Style Comp: Tavon Austin-type slot gadget weapon
```

## Ceiling Comp

Best-case outcome if development hits.

Example:

```text
Ceiling Comp: Lamar Jackson-type spread creator
```

## Floor Comp

If weaknesses persist.

Example:

```text
Floor Comp: ATH/QB tweener with position-change risk
```

## Scheme Comp

Best fit.

Example:

```text
Scheme Comp: Pat White-style spread-option trigger
```

## Draft Comp

Future optional layer tied to NFL projection.

## PlayerCompProfile

```ts
type PlayerCompProfile = {
  id: string;
  name: string;
  school: string;
  primaryPosition: Position;
  archetype: string;
  compType: PlayerCompType;
  tags: string[];
  signatureVector: Partial<Record<AttributeId, number>>;
  traitRequirements?: string[];
  bodyRequirements?: BodyRequirement;
  hardGates?: CompGate[];
  bestFor: string;
  caution: string;
  safeDisplayRule: string;
};
```

## CandidateCompResult

```ts
type CandidateCompResult = {
  compId: string;
  compName: string;
  compType: PlayerCompType;
  score: number;
  confidence: number;
  label: string;
  similarities: ReasonCode[];
  differences: ReasonCode[];
  caution: string;
  displayText: string;
};
```

## How To Calculate A Comp

## Step 1 — Position Gate

Only compare against relevant positions.

Examples:

```text
QB can match QB or ATH/QB comps.
RB can match RB or WR/RB hybrid comps.
CB can match CB/S hybrid comps.
```

## Step 2 — Archetype / Tag Gate

Compare trait tags:

```text
dual_threat
speed
processor
power
route_runner
press
edge
space_weapon
```

## Step 3 — Body Gate

Use height/weight/frame where relevant.

Examples:

```text
Derrick Henry comp requires huge back frame.
DeVonta Smith comp allows slim frame.
Calvin Johnson comp requires massive WR frame.
```

## Step 4 — Attribute Similarity

Compute weighted distance between player attributes and comp signature.

Example:

```text
similarity = 1 - weightedNormalizedDistance(playerVector, compVector)
```

Use position-specific weights.

## Step 5 — Trait Match

Add modifiers for:

- hidden traits
- development curve
- work ethic
- coachability
- big-game nerve
- money preference, if relevant only to narrative
- consistency
- injury/durability

## Step 6 — Confidence

For recruits, confidence depends on scouting.

```text
confidence =
  scoutingConfidence
* attributeVisibility
* positionProjectionConfidence
* staffEvaluationSkill
```

Current players can have higher confidence.

## Step 7 — Similarities and Differences

Every comp result must show:

```text
Why this comp fits
Where it does not fit
Confidence level
```

Example:

```text
Similarities:
- Elite speed and agility
- Open-field creation
- Big-play rushing value

Differences:
- Accuracy is lower than the comp
- Awareness is still raw
- Staff has limited live evaluation
```

## Scouted Range Handling

For recruits, do not use true hidden ratings.

Use scouted ranges.

Options:

```text
conservative: use low end
optimistic: use high end
staff_mean: use weighted midpoint
```

Recommended:

```text
use staff_mean for style comp
use optimistic projection for ceiling comp
use conservative projection for floor comp
```

## Comp Display Labels

Examples:

```text
Michael Vick-style tools comp
Raw Lamar Jackson-type spread creator
Barry Sanders-type open-field mover
DeVonta Smith-style route technician
Ndamukong Suh-style interior disruptor
Ed Reed-type centerfield ballhawk
```

Add modifiers:

```text
raw
lite
poor man's
developmental
high-variance
scheme-specific
ceiling
floor
```

Use carefully.

## Do Not Over-Comp

Not every player deserves a famous comp.

If similarity is low:

```text
No strong comp
```

or:

```text
Closest profile: developmental zone-run back
```

Minimum thresholds:

```text
style comp score >= 0.62
ceiling comp score >= 0.55 but requires upside/potential
confidence >= 0.35 for recruits
```

If below:

```text
Insufficient scouting confidence
```

## Michael Vick Example

If prospect has:

```text
speed >= 18
agility >= 18
acceleration >= 18
scramble instinct >= 16
throw power >= 15
accuracy <= 11
awareness <= 10
```

Then show:

```text
Style Comp: Raw Michael Vick-type dual-threat athlete

Similarities:
- rare speed/agility for the position
- dangerous open-field rushing profile
- enough arm strength to threaten vertically

Differences:
- current accuracy is much less developed
- awareness/processing remain raw
- comp is a tools/style comparison, not a projection

Confidence:
based on scouting confidence
```

If accuracy and awareness are also high:

```text
Ceiling Comp: Michael Vick-style explosive dual-threat QB
```

## UI Placement

Show comps in:

- Prospect Profile
- Recruiting Board right inspector
- Player Profile
- Draft Projection
- Staff Scouting Report
- Player Development Report
- Transfer Portal profile

## Prospect Profile Comp Panel

Fields:

```text
Top Style Comp
Ceiling Comp
Floor/Warning Comp
Scheme Fit Comp
Confidence
Why it fits
Where it does not
Staff source
```

## Recruiting Board Column

Add optional columns:

```text
Top Comp
Comp Confidence
Comp Type
```

## Staff Report Language

Example:

```text
"Our staff sees a Raw Michael Vick-type tools profile: elite speed, twitch, and open-field danger at quarterback. The concern is that his accuracy and awareness are far behind the athletic profile."
```

## LLM Rules

LLM may write comp prose.

LLM may not choose the comp.

The engine chooses the comp from structured data.

## Data Files

Add:

```text
game_data/comps/college_player_comps_library.json
```

## Tests

Required:

- elite speed raw QB returns Michael Vick-style tools comp
- polished pocket QB does not return Michael Vick
- huge power back can return Derrick Henry/Bo Jackson style
- slim route WR can return DeVonta Smith
- low scouting confidence lowers comp confidence
- no comp returned below threshold
- differences are generated for mismatched traits
- comp uses scouted values for recruits, not hidden truth

## Acceptance Criteria

The feature is acceptable when:

- comps are generated from structured data
- comp confidence exists
- similarities/differences are shown
- famous comps are not overused
- recruits use scouted ranges
- staff reports can mention comps safely
- UI makes clear this is style/projection, not destiny
