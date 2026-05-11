# 39 — Awards, Records, History, and Media Narrative Spec

## North Star

Stats become meaningful when the world remembers them.

This system turns game results and player careers into:

- awards
- records
- rivalries
- school history
- dynasty narratives
- media stories
- recruiting reputation
- draft reputation
- coach legacy

The game should feel like it has memory.

## Core Loop

```text
game stats
→ weekly leaders
→ media narratives
→ awards watch
→ season awards
→ records
→ draft/recruiting reputation
→ school/coach/player legacy
```

## Award Types

## Weekly

- National Player of the Week
- Conference Player of the Week
- Freshman of the Week
- Defensive Player of the Week
- Special Teams Player of the Week

## Season

- National Player of the Year
- QB/RB/WR/TE/OL awards
- Defensive awards
- Freshman awards
- Coach of the Year
- Coordinator awards
- Conference awards
- All-Conference
- All-American

## Award Inputs

- stats
- opponent quality
- team success
- conference strength
- position value
- narrative momentum
- media exposure
- big games
- rivalry games
- postseason performance
- previous reputation

Do not use stats alone.

## Award Watch Lists

During season:

- preseason watch
- midseason watch
- late-season finalists
- winner

Watch list affects:

- NIL value
- media attention
- recruit interest
- player morale
- draft stock

## Records

Record scopes:

- school game
- school season
- school career
- conference game
- conference season
- conference career
- national game
- national season
- national career

Record types:

- passing yards
- passing TDs
- rushing yards
- rushing TDs
- receiving yards
- receptions
- sacks
- interceptions
- tackles
- points
- team total yards
- team points
- wins
- streaks
- draft picks

## Record Object

```ts
type RecordEntry = {
  id: string;
  scope: RecordScope;
  statId: string;
  value: number;
  holderType: "player" | "team" | "coach";
  holderId: string;
  schoolId?: string;
  conferenceId?: string;
  season: number;
  gameId?: string;
  opponentId?: string;
  date: GameDate;
  contextTags: string[];
};
```

## History Entities

Track:

- player career history
- coach career history
- school season history
- rivalry history
- conference history
- playoff history
- draft history
- award history
- record history

## School History

Each school stores:

- season records
- conference titles
- playoff appearances
- bowl results
- national titles
- rivalry records
- draft picks
- award winners
- coach tenures
- recruiting class rankings
- facility milestones
- NIL era milestones

## Coach Legacy

Coach legacy includes:

- record
- titles
- rivalry record
- player development
- draft picks
- recruiting success
- staff tree
- program turnarounds
- scandals/compliance, if any
- job movement
- reputation labels

## Dynasty Detection

A dynasty is detected from:

- multi-year win rate
- titles
- playoff appearances
- recruiting dominance
- draft output
- staff tree
- conference dominance
- national perception

Dynasty should be causal, not label-based.

## Collapse Detection

Collapse from:

- win decline
- recruiting decline
- transfer losses
- staff losses
- NIL weakness
- booster conflict
- facility stagnation
- coach instability
- team vibe issues

Media should notice collapses.

## Media Narrative System

Narratives are structured, then optionally written by LLM.

Narrative types:

- breakout player
- hot seat
- dynasty rising
- dynasty fading
- recruiting coup
- transfer drama
- NIL controversy
- rivalry hype
- upset aftermath
- playoff race
- award watch
- draft buzz
- coach carousel
- school turnaround

## Narrative Object

```ts
type MediaNarrative = {
  id: string;
  type: string;
  subject: EntityRef;
  season: number;
  week: string;
  intensity: number;
  evidence: ReasonCode[];
  generatedHeadline?: string;
  generatedBody?: string;
  expiresAt?: GameDate;
  affects: NarrativeEffects;
};
```

## Narrative Effects

Narratives may affect:

- morale
- NIL value
- recruiting perception
- fan sentiment
- booster confidence
- staff pressure
- player draft buzz

Effects should be subtle and reason-coded.

## LLM Narrative Rules

LLM can write:

- headline
- article summary
- press blurb
- rivalry framing
- award-watch text

LLM cannot invent:

- stats
- quotes
- injuries
- arrests
- violations
- commitments
- NIL amounts

Payload must include all facts.

## Media Frequency

Avoid spam.

Use:

- weekly digest
- major story alerts
- watchlist boosts
- rivalry/postseason packages
- milestone alerts

Do not generate a story for every stat line.

## Awards UI

Tabs:

- Watch Lists
- Weekly Awards
- Conference Awards
- National Awards
- All-Americans
- History

## Records UI

Tabs:

- School Records
- Conference Records
- National Records
- Player Career
- Team Season
- Rivalry Records

## History UI

Tabs:

- Program Timeline
- Seasons
- Coaches
- Players
- Draft
- Awards
- Rivalries
- Facilities
- Recruiting Classes

## Events

- player added to award watch
- record broken
- coach hot seat
- rivalry streak extended
- dynasty narrative begins
- dynasty fading
- draft buzz rising
- school produces first first-rounder in years
- player wins national award

## Tests

Required:

- award watch ranking uses stats and team success
- record updates after game
- record does not update on worse value
- school history stores season result
- coach history updates job record
- dynasty detection triggers
- collapse detection triggers
- LLM payload is grounded
- narrative spam suppression works
- save/load preserves history

## Long-Run Validation

Track:

- award distribution by position
- award distribution by team strength
- records frequency
- dynasty count
- collapse count
- media story count
- draft/narrative correlation
- recruiting impact of awards/draft

## Acceptance Criteria

This system is acceptable when:

- stats feed awards
- awards feed NIL/draft/recruiting
- records persist
- school history persists
- coaches have careers
- dynasties are detected causally
- narratives are grounded
- media adds immersion without spam
