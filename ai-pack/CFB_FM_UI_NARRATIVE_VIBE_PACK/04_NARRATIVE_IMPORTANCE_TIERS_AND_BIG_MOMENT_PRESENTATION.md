# Narrative Importance Tiers and Big Moment Presentation

## North Star

The game should feel calm most of the time and big at the right times.

If everything is dramatic, nothing matters.

Every narrative event must have an importance tier.

## Tier 0 — Ambient

Small flavor.

Examples:

- minor fan chatter
- routine staff note
- small recruiting mention
- weather note
- minor local clipping

Presentation:

- small note
- digest only
- no interruption
- no special visual treatment

Program Desk:

- may appear in Staff Briefing or Campus Pulse detail

Scrapbook:

- never auto-file

## Tier 1 — Notable

Worth seeing.

Examples:

- scout report complete
- player morale concern
- recruit adds you to top 5
- practice fatigue warning
- minor NIL update
- position coach note

Presentation:

- Program Desk item
- small category badge
- staff note
- optional action

Scrapbook:

- not auto-file
- user can manually file

## Tier 2 — Important

Needs attention.

Examples:

- starter injury
- top recruit schedules visit
- player considering transfer
- NIL deal flagged
- coach contacted by rival
- team vibe slipping
- booster request

Presentation:

- Today's Decisions
- right inspector detail
- consequence preview
- staff recommendation
- soft blocker possible

Scrapbook:

- prompt only if user wants

## Tier 3 — Major Moment

Pause the rhythm.

Examples:

- rivalry game week
- signing day
- playoff ranking
- conference title game
- top player enters portal
- coordinator poached
- draft declaration
- major upset
- record watch

Presentation:

- larger header
- reaction bundle
- staff/fan/media/booster context
- calendar emphasis
- optional special workspace

Scrapbook:

- prompt to file
- auto-file if milestone

## Tier 4 — Program-Defining

Make it feel historic.

Examples:

- national title
- first playoff appearance
- legendary recruit signs
- school record broken
- coach fired
- conference realignment
- stadium expansion completed
- walk-on wins national award
- rivalry streak broken after many years
- historic upset
- player drafted in first round after rebuild

Presentation:

- full Moment Card
- scrapbook entry
- media clipping bundle
- staff/fan/booster reactions
- history update
- optional audio sting later
- optional generated image later

Scrapbook:

- auto-file

## NarrativeImportance Object

```ts
type NarrativeImportanceTier = 0 | 1 | 2 | 3 | 4;

type NarrativeImportance = {
  tier: NarrativeImportanceTier;
  label: string;
  reasonCodes: ReasonCode[];
  presentationRules: PresentationRule[];
  autoScrapbook: boolean;
  programDeskPriority: number;
};
```

## Importance Calculation

Inputs:

- event type
- player/recruit/staff importance
- school context
- rivalry context
- record/milestone
- postseason impact
- user watchlist
- historical rarity
- program expectations
- current narrative arc

Example:

```text
Top 50 recruit signs:
  Tier 3 for most programs
  Tier 4 for first blue-chip of rebuild
  Tier 2 for established blue blood with many similar recruits
```

## Contextual Importance

Importance is not fixed.

A bowl win can be:

- Tier 1 for a blue blood
- Tier 3 for a rebuild
- Tier 4 for a first-ever major bowl

A three-star commit can be:

- Tier 0 for powerhouse
- Tier 3 if he is local, hidden gem, perfect scheme fit, and long-recruited

## Big Moment Card

Fields:

- headline
- subheadline
- date/week
- category
- key entities
- why it mattered
- immediate effects
- reactions
- links
- file status
- optional image

Example:

```text
Headline:
McClain Signs: Sooners Land Their Quarterback of the Future

Why it mattered:
Your staff identified McClain as a sophomore and built the relationship for two years. Texas made a late NIL push, but McClain chose the development path and stayed close to home.

Effects:
Recruit Buzz +8
QB Room Future Outlook +12
QB Coach Reputation +4
```

## Reaction Bundle

Tier 3–4 events should show multiple perspectives.

```ts
type ReactionBundle = {
  staff?: ReactionItem[];
  players?: ReactionItem[];
  recruits?: ReactionItem[];
  fans?: ReactionItem[];
  media?: ReactionItem[];
  boosters?: ReactionItem[];
  campus?: ReactionItem[];
};
```

## Reaction Item

```ts
type ReactionItem = {
  sourceType: "staff" | "player" | "recruit" | "fan" | "media" | "booster" | "campus";
  sourceId?: string;
  summary: string;
  tone: "positive" | "negative" | "neutral" | "mixed";
  reasonCodes: ReasonCode[];
};
```

## Big Moment Timing

When a Tier 4 event occurs:

- do not immediately auto-advance past it
- show the moment
- allow user to open details
- allow user to continue when ready

But do not overuse modal interruptions.

Use a full-page or Program Desk hero panel rather than intrusive popups.

## Event Examples By Tier

## Recruiting

Tier 0:
- low-priority recruit gets another offer

Tier 1:
- scout report complete

Tier 2:
- top target schedules visit

Tier 3:
- top target commits/decommits

Tier 4:
- first five-star in school history signs

## Game

Tier 0:
- routine win over weak opponent

Tier 1:
- solid conference win

Tier 2:
- upset loss

Tier 3:
- rivalry win, conference title berth

Tier 4:
- national title, historic upset, record-breaking game

## Player

Tier 0:
- backup improves minor trait

Tier 1:
- player standing out in practice

Tier 2:
- starter injury, transfer concern

Tier 3:
- star declares for draft, wins major award

Tier 4:
- walk-on becomes All-American, school record broken

## Presentation Tests

Required tests:

- Tier 0 does not create Scrapbook entry
- Tier 4 creates Scrapbook entry
- watchlisted entity raises priority
- first-ever milestone raises tier
- routine repeat event does not over-trigger
- reaction bundle contains only grounded facts
- Program Desk orders high tier above low tier

## Acceptance Criteria

This system is acceptable when:

- event importance is contextual
- major moments feel distinct
- normal weeks remain calm
- Scrapbook auto-files true milestones
- reaction bundles are grounded
- tiering prevents feed spam
