# Media Clippings, Radio Digest, and Voices Around the Program

## North Star

Do not build a fake social media firehose.

Build curated, grounded perspectives that make the program feel alive.

The user should see:

- what local media thinks
- what fans are feeling
- what boosters care about
- what recruits are noticing
- what staff believes actually matters
- what the locker room feels like

## Narrative Surfaces

## Media Clippings

Short, curated headlines and blurbs.

Types:

- local newspaper
- regional recruiting notebook
- national college football site
- campus paper
- radio show summary
- conference notebook
- draft buzz

## Radio Digest

Weekly or postgame digest of local fan sentiment.

Not individual fake tweets.

Example:

```text
Local Radio Digest

- Callers praised the defensive front.
- Several questioned the fourth-quarter tempo.
- The main concern remains offensive line depth.
```

## Voices Around the Program

A structured perspective bundle.

Perspectives:

- Staff
- Players
- Recruits
- Fans
- Media
- Boosters
- Campus

Example:

```text
Staff:
The defensive staff believes the young front has turned a corner.

Players:
The locker room is fully bought in after the comeback.

Recruits:
Several visitors mentioned the fourth-quarter atmosphere.

Fans:
Local reaction is euphoric. Expectations are rising fast.

Boosters:
A facility donor wants to reopen stadium expansion talks.
```

## MediaClipping Schema

```ts
type MediaClipping = {
  id: string;
  outletType:
    | "local_newspaper"
    | "campus_paper"
    | "regional_recruiting"
    | "national_media"
    | "radio_digest"
    | "conference_notebook";
  headline: string;
  summary: string;
  tone: "positive" | "negative" | "neutral" | "mixed";
  category: ProgramCategory;
  affectedEntities: EntityRef[];
  importanceTier: NarrativeImportanceTier;
  reasonCodes: ReasonCode[];
  generatedAt: GameDate;
};
```

## RadioDigest Schema

```ts
type RadioDigest = {
  id: string;
  week: string;
  overallTone: string;
  bullets: string[];
  keyConcerns: string[];
  keyPraise: string[];
  affectedSystems: ProgramCategory[];
  reasonCodes: ReasonCode[];
};
```

## Generation Triggers

Media clippings should trigger after:

- games
- rivalry games
- signing day
- top recruit commitment
- decommit/flip
- coach rumors
- staff firing/hiring
- draft decisions
- award watch updates
- NIL flagged deal
- facility project
- realignment
- record-breaking performance

## Frequency Rules

Avoid spam.

Caps:

```text
normal week: 2-4 clippings
big week: 5-8 clippings
historic event: special bundle
```

Use digests instead of many separate items.

## Tone Rules

Local media can be:

- skeptical
- proud
- impatient
- hopeful
- harsh after rivalry losses
- sentimental for player stories

Boosters can be:

- excited
- watchful
- impatient
- divided
- generous
- meddling

Fans can be:

- euphoric
- restless
- spoiled
- loyal
- angry
- hopeful

Recruits can be:

- impressed
- skeptical
- curious
- concerned
- excited

## LLM Usage

LLM can write clipping text from grounded payloads.

Payload includes:

- event facts
- allowed tone
- relevant stats
- entity names
- forbidden claims
- max length
- outlet type

LLM cannot invent quotes or facts.

## UI Placement

Media appears in:

- Program Desk
- Campus Pulse detail
- postgame report
- Scrapbook entries
- History
- player/recruit profiles if relevant

## Examples

## After Big Win

```text
Local Newspaper:
Defense Sets Tone as Sooners Find Their Footing

Summary:
The win did more than move the record. It changed the tone around a young defense that had been searching for proof.
```

## After Recruiting Miss

```text
Regional Recruiting Notebook:
Late NIL Push Not Enough for Sooners

Summary:
The staff stayed in the fight, but the prospect's final decision came down to immediate role and a stronger NIL package elsewhere.
```

## After Walk-On Breakout

```text
Campus Paper:
Walk-On's Moment Becomes Locker Room Rallying Point

Summary:
Players have talked about his work for months. Saturday was the first time the rest of the state saw it.
```

## Tests

Required:

- clippings generated from event facts
- clipping cap enforced
- no unsupported facts in LLM output
- radio digest groups fan reaction
- Voices bundle uses grounded reactions
- major event creates richer bundle
- routine events do not spam

## Acceptance Criteria

This system is acceptable when:

- media adds atmosphere without feed spam
- perspectives are grounded
- fan/media/booster/recruit reactions are distinct
- big moments get richer coverage
- ordinary weeks remain quiet
