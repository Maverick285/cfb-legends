# The Three Narrative Surfaces: Program Desk, Campus Pulse, Program Scrapbook

## North Star

Do not build one endless feed.

Build three separate narrative surfaces, each with a clear job:

```text
Program Desk:
  What needs me today?

Campus Pulse:
  How does the program feel to the outside and inside world?

Program Scrapbook:
  What will be remembered?
```

This gives the game narrative depth without feed spam.

---

# 1. Program Desk

## Purpose

The Program Desk is the daily operations hub.

It is not an email inbox.

It is the coach/GM's desk:

- decisions
- blockers
- staff reports
- deadlines
- next game
- recruiting updates
- practice warnings
- money issues

## Program Desk Questions

It answers:

```text
What requires action?
What blocks Continue?
What is urgent?
What does my staff recommend?
What changed since last week?
Where should I go next?
```

## Program Desk Sections

```text
Must Fix To Continue
Today's Decisions
Staff Briefing
Next Game / Next Deadline
Calendar Snapshot
Watchlist
Media Clippings
Campus Pulse Summary
```

## Program Desk Tone

Warm, organized, slightly busy.

Visual metaphor:

```text
desk folders
staff memos
calendar notes
briefing binder
```

## Program Desk Items

Use `ProgramItem` objects.

Types:

- task
- blocker
- alert
- report
- recommendation
- deadline
- digest
- news

## Program Desk Must Not

- become a raw feed
- show 80 fake reactions
- bury blockers
- mix news and required actions without hierarchy
- require user to hunt for fixes

---

# 2. Campus Pulse

## Purpose

Campus Pulse is the ambient emotional state of the program.

It summarizes how the world around the program feels.

It is not a Twitter clone.

## Campus Pulse Categories

```text
Fan Mood
Student Energy
Booster Temperature
Local Media Tone
Locker Room Tone
Recruit Buzz
Campus/Town Mood
National Perception
```

## Example

```text
Campus Pulse: Restless Optimism

Fan Mood: Hopeful but impatient
Student Energy: High
Boosters: Watchful
Local Media: Skeptical
Locker Room: Stable
Recruit Buzz: Positive
```

## Inputs

Fan Mood:

- record
- expectations
- rivalry results
- offensive style
- losing streak
- recruiting class
- coach reputation

Student Energy:

- home games
- rivalry
- team ranking
- campus culture
- weather
- big moments

Booster Temperature:

- wins
- NIL results
- facilities
- staff hires
- rivalry losses
- budget discipline

Local Media Tone:

- recent results
- hot seat
- controversy
- narratives
- expectations

Locker Room Tone:

- team vibe
- morale
- leadership
- fatigue
- broken promises
- playing time issues

Recruit Buzz:

- visit weekends
- commits
- decommits
- NIL reputation
- draft/development reputation
- campus atmosphere

## Output Labels

Examples:

```text
Quiet Confidence
Restless Optimism
Championship Fever
Boiling Pressure
Fractured
Waiting for a Spark
Full Buy-In
Local Doubt
Recruiting Momentum
Winter Uncertainty
```

## Campus Pulse Detail View

Clicking a category opens:

- summary
- reason codes
- recent events
- representative clippings
- staff interpretation
- affected systems
- trend chart

## Campus Pulse Effects

Campus Pulse is mostly presentation, but it can affect:

- fan attendance
- booster confidence
- recruit atmosphere
- media pressure
- player morale
- home-field atmosphere

Effects should be subtle and reason-coded.

---

# 3. Program Scrapbook

## Purpose

The Program Scrapbook is long-term memory.

It automatically saves moments that matter.

This is the emotional archive of the save.

## Scrapbook Moment Types

```text
rivalry win
rivalry heartbreak
top recruit signed
first five-star
walk-on breakout
record broken
conference title
playoff appearance
national title
coach milestone
stadium expansion
assistant hired away
draft night success
player returns instead of transferring
legendary game
collapse moment
realignment move
```

## Scrapbook Entry Schema

```ts
type ScrapbookEntry = {
  id: string;
  season: number;
  week: string;
  date: GameDate;
  tier: NarrativeImportanceTier;
  category: ScrapbookCategory;
  headline: string;
  summary: string;
  affectedEntities: EntityRef[];
  stats?: Record<string, number>;
  mediaClippings: MediaClipping[];
  reactions: ReactionBundle;
  imageAssetId?: string;
  tags: string[];
  reasonCodes: ReasonCode[];
  userPinned: boolean;
};
```

## Scrapbook Presentation

Looks like:

```text
media guide archive
newspaper clipping
program history binder
```

Each entry should include:

- date
- headline
- context
- why it mattered
- links to players/games/recruits/staff
- optional generated image/portrait
- media clipping
- staff/fan/booster reaction

## Auto-Filing Rules

Events can auto-file if Tier 4 or user-pinned.

Tier 3 events may prompt:

```text
Add to Scrapbook?
```

The user can manually file:

- game
- player
- recruit
- staff event
- media clipping
- record

## Scrapbook Effects

Mostly memory, but it can feed:

- program history
- coach legacy
- player story
- rivalry history
- recruiting pitch
- media narratives

## Why Scrapbook Matters

This is how the user cares after 20 seasons.

A player profile should show:

```text
Appears in 3 Scrapbook moments
```

A coach profile should show:

```text
Program-defining moments
```

A rivalry page should show:

```text
Scrapbook moments against this opponent
```

---

# Integration Between The Three

## Example: Top Recruit Signs

Program Desk:

```text
Decision resolved: Darius McClain signs.
```

Campus Pulse:

```text
Recruit Buzz rises.
Fan Mood improves.
Boosters encouraged.
```

Scrapbook:

```text
If recruit is high enough or class-defining, create entry:
“McClain becomes cornerstone of 2032 class.”
```

## Example: Rivalry Loss

Program Desk:

```text
Postgame report and staff concerns.
```

Campus Pulse:

```text
Fan Mood drops.
Booster Temperature rises.
Local Media turns skeptical.
```

Scrapbook:

```text
Only if historic, humiliating, streak-breaking, or program-defining.
```

## Example: Walk-On Breakout

Program Desk:

```text
Staff report: walk-on pushing for playing time.
```

Campus Pulse:

```text
Locker Room Tone improves if teammates rally.
```

Scrapbook:

```text
Filed later if he starts, wins award, or changes season.
```

## Acceptance Criteria

This system is acceptable when:

- Program Desk handles daily work
- Campus Pulse summarizes mood without spam
- Scrapbook preserves major moments
- all three use real sim events
- no narrative surface invents facts
- user can click from narrative to entities
- major events feel remembered
- routine events do not become noise
