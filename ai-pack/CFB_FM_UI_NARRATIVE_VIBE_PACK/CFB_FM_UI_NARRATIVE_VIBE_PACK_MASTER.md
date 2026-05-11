

<!-- FILE: 00_START_HERE_UI_NARRATIVE_VIBE_PACK.md -->

# CFB-FM UI and Narrative Vibe Pack — Start Here

## Purpose

This pack defines the emotional, visual, narrative, and interaction direction for CFB-FM.

The goal is not to make a futuristic sports dashboard.

The goal is to make the user feel like they are running a college football program from a warm, lived-in football office:

```text
part coach's desk
part recruiting room
part film room
part local newspaper archive
part media guide
part campus memory book
```

The interface should feel:

```text
cozy
nostalgic
serious when needed
dense but not sterile
personal
local
archival
quietly addictive
```

The game should not feel:

```text
neon
edgy
sports-betting
futuristic
generic dashboard
mobile-first
overanimated
```

## Core UI North Star

```text
CFB-FM should feel like a warm, lived-in college football office: part coach's desk, part recruiting room, part local newspaper archive, part film room, and part program history book. The UI should be cozy and nostalgic by default, dense and functional for serious decisions, and capable of becoming cinematic only when the moment truly matters.
```

## The Three Narrative Surfaces

Do not build one endless media/fan feed.

Build three coordinated narrative surfaces:

```text
1. Program Desk
   Daily operations, decisions, blockers, staff briefings.

2. Campus Pulse
   Ambient mood and perspective around the program.

3. Program Scrapbook
   Long-term memory, program-defining moments, player stories, history.
```

Together they create:

```text
daily management
emotional context
long-term memory
```

## How To Use This Pack

Give this pack to the UI/UX coding AI when implementing:

- app shell
- Program Desk
- Campus Pulse
- media clippings
- staff briefing
- player/recruit profiles
- history/scrapbook
- big moment presentation
- visual design system
- narrative event presentation
- copywriting tone
- UI acceptance tests

Use `12_UI_NARRATIVE_IMPLEMENTATION_PACKETS.md` for build order.

Use `13_READY_TO_PASTE_UI_NARRATIVE_PROMPTS.md` for direct coding prompts.

## Non-Negotiable Design Rules

```text
Warm over flashy.
Dense over empty.
Specific over generic.
Narrative over noise.
Memory over feed spam.
Clickability over decoration.
Consequences over vibes only.
Big moments should feel big because normal weeks are calm.
```

## What This Pack Is Not

This pack does not replace the stats engine, play generator, recruiting engine, or save system.

It tells the AI how those systems should be presented to the user in a way that feels emotionally right.

## Critical Implementation Rule

The UI cannot invent story.

The simulation creates facts.
The narrative layer presents facts.
The UI preserves memory.

```text
Sim truth → narrative event → Program Desk / Campus Pulse / Scrapbook
```


<!-- FILE: 01_UI_VIBE_NORTH_STAR_AND_EMOTIONAL_TARGET.md -->

# UI Vibe North Star and Emotional Target

## North Star

The game should feel like the user is sitting inside the life of a college football program.

Not controlling abstract sports data.

Not managing a spreadsheet with helmets.

Not using a futuristic sports-betting app.

The user should feel the program has:

- a town
- a campus
- a locker room
- a staff room
- local media
- boosters
- history
- grudges
- traditions
- young players with stories
- recruits with families and preferences
- mistakes remembered over years
- triumphs that become part of the archive

## Desired Emotional Feel

The game should feel:

```text
cozy
nostalgic
warm
lived-in
archival
local
textural
quiet
serious
personal
```

It should become:

```text
tense
grand
loud
historic
ceremonial
```

only at the right moments.

## Emotional Rhythm

The normal rhythm:

```text
quiet routine
staff notes
small discoveries
practice choices
recruiting calls
calendar pressure
one more Continue
```

The buildup:

```text
rivalry week
signing day
portal deadline
playoff ranking
staff rumor
player transfer meeting
```

The peak:

```text
conference title
major upset
top recruit signs
rivalry win
record broken
draft night
national title
coach fired
realignment
```

The memory:

```text
scrapbook entry
media clipping
history update
player story update
program identity shift
```

## The Main Player Emotion

The user should say:

```text
I remember this.
```

Examples:

```text
I remember recruiting this QB as a raw sophomore.
I remember almost losing him to the portal.
I remember when that assistant was just a position coach.
I remember when this rivalry broke our season.
I remember the walk-on who became a captain.
I remember the first time we beat them.
```

That emotional memory is the target.

## What Makes This Different From Generic Sports Sims

Most sports sims show:

- scores
- standings
- ratings
- trades/recruits
- news feed

CFB-FM should show:

- the program's internal pulse
- why people care
- how decisions echo
- what becomes part of history
- how players and towns fit together
- how local pressure feels
- how staff interpret events
- how a save develops mythology

## Visual Metaphor

Use:

```text
The Program Office
```

Sub-metaphors:

```text
Coach's desk
Recruiting folders
Film room
Depth chart board
Local newspaper archive
Staff briefing binder
Media guide
Campus bulletin board
Radio show notes
Booster ledger
Program scrapbook
```

Do not overdo literal fake paper everywhere.

The game should be a modern, usable application **inspired by** these objects.

## The User's Mental Map

The user should feel:

```text
Program Desk:
  What needs me today?

Roster Room:
  Who are my players?

Recruiting Room:
  Who are we becoming?

Practice Field:
  How are we shaping them?

Film Room:
  How do we win this week?

NIL / Money:
  What resources and pressures are shaping the roster?

Campus Pulse:
  How does the world around the program feel?

History:
  What have we become?
```

## Tone Rules

## Normal Week

Tone:

```text
calm
organized
quietly busy
```

Presentation:

```text
staff notes
short clippings
calendar
task cards
tables
subtle accents
```

## Important Week

Tone:

```text
focused
tense
high-stakes
```

Presentation:

```text
larger section headers
more reactions
visible stakes
staff disagreement
deadline pressure
```

## Historic Moment

Tone:

```text
ceremonial
memorable
archival
```

Presentation:

```text
moment card
scrapbook entry
media clipping
reaction bundle
history update
```

## Design Anti-Patterns

Avoid:

- constant hype
- endless fake tweets
- huge animations for minor events
- generic SaaS dashboard cards
- burying data behind pretty panels
- sterile spreadsheet-only UI
- neon sports-betting visual language
- mobile-first density
- overuse of memes
- fake edgy drama

## Golden Rule

```text
The UI should make the user care more about the simulation truth.
It should not distract from it.
```


<!-- FILE: 02_VISUAL_DESIGN_SYSTEM_COZY_NOSTALGIC.md -->

# Visual Design System — Cozy, Nostalgic, Program-Office Style

## North Star

The visual design should feel warm and archival while remaining readable and fast.

Think:

```text
old media guides
recruiting folders
local newspaper clippings
coach's office
film room notes
campus bulletin board
program archive
```

Do not think:

```text
neon scoreboard
sports betting app
futuristic command center
Madden Ultimate Team
crypto dashboard
```

## Palette Philosophy

Use muted warm neutrals as the foundation.

Team colors should be accents, not full-screen floods.

## Base Palette

Recommended color roles:

```text
background_paper: warm cream
background_panel: off-white / warm gray
background_elevated: soft beige
text_primary: charcoal
text_secondary: faded slate
text_muted: warm gray
divider: muted tan / gray
accent_primary: team color
accent_secondary: brass / aged gold
danger: muted red
warning: amber
success: muted green
info: faded navy
```

## Example Theme

```text
Base background: aged cream
Panel: warm off-white
Primary text: charcoal
Secondary text: slate gray
Accent: team primary color
Secondary accent: brass/gold
Borders: faint tan
```

## Team Color Use

Use team color for:

- small section accents
- selected nav item
- header underline
- badges
- key moment border
- small icon fills
- rivalry/game context

Do not use team color for:

- entire background
- huge saturated panels
- every button
- unreadable text contrast

## Texture

Use subtle texture only.

Acceptable:

- paper grain
- folder tab edges
- very light noise
- newspaper clipping background
- chalkboard accent area
- binder-divider lines
- soft shadows

Avoid:

- heavy grunge
- fake wood desk background
- full skeuomorphic UI
- unreadable distressed fonts
- texture behind dense tables

## Typography

Use three typographic roles.

## UI Font

Purpose:

- tables
- buttons
- forms
- navigation
- reports

Personality:

```text
clean
readable
slightly warm
not futuristic
```

## Headline / Clipping Font

Purpose:

- media clippings
- scrapbook headlines
- section titles
- big moments

Personality:

```text
newspaper
media guide
slab serif
classic sports publication
```

Use sparingly.

## Stat / Number Font

Purpose:

- box scores
- tables
- leaderboards
- ratings
- dashboards

Personality:

```text
tabular
stable
compact
legible
```

Use tabular numbers.

## Spacing

Dense but breathable.

Guidelines:

- tables should be compact
- cards should not be oversized
- key sections need hierarchy
- avoid giant empty dashboard cards
- use collapsible groups
- use right inspector instead of popups

## Borders and Panels

Panel styles:

```text
paper panel
folder panel
clipping panel
binder section
chalkboard panel
ledger panel
```

These are visual variants, not entirely different components.

## Component Visual Language

## ProgramItem Card

Looks like:

```text
staff note / office task slip
```

Fields:

- category tag
- severity
- due date
- summary
- staff/source
- quick action
- affected entity links

## Media Clipping

Looks like:

```text
local newspaper clipping
```

Fields:

- outlet/source
- headline
- short blurb
- date
- narrative tag
- affected entities

## Staff Note

Looks like:

```text
briefing memo
```

Fields:

- staff name
- role
- confidence
- recommendation
- concern
- action

## Scrapbook Moment

Looks like:

```text
archived program-history card
```

Fields:

- date
- headline
- category
- image/portrait/logo optional
- key entities
- why it mattered
- follow-up links

## Ledger Panel

For finance/NIL.

Looks like:

```text
budget ledger / booster notebook
```

Fields:

- amount
- source
- allocation
- risk
- status
- reason codes

## Film Room Panel

For tactics/play-by-play.

Looks like:

```text
film cutup / coaching report
```

Fields:

- situation
- concept
- result
- reason codes
- personnel
- next action

## Icon Style

Use simple icons:

- folder
- clipboard
- whistle
- football
- helmet
- film reel
- newspaper
- calendar
- megaphone
- trophy
- stadium
- dollar ledger
- map pin
- radio
- star
- warning flag

Avoid:

- neon icons
- excessive emoji
- animated icons everywhere
- futuristic glyphs

## Animation

Subtle animation only.

Acceptable:

- gentle panel expansion
- soft fade for new ProgramItem
- small highlight when a record is broken
- light page transition
- scoreboard count-up for big moment

Avoid:

- spinning loaders everywhere
- flashy particle effects
- constant bouncing badges
- sports-betting style live tickers

## Big Moment Visual Treatment

For Tier 4 events:

- darker / richer background panel
- team color accent
- headline font
- scrapbook card
- small media clipping bundle
- staff/fan/booster reaction bundle
- "File to Scrapbook" or auto-file state

Do not use this treatment for routine events.

## Accessibility

Required:

- high contrast mode
- scalable text
- keyboard navigation
- no color-only status indicators
- readable tables
- reduced motion option
- clear focus states
- consistent button placement

## Theme Modes

At minimum:

```text
Classic Office Light
Classic Office Dark
High Contrast
```

Future:

```text
Media Guide
Chalkboard
Retro PC
School-specific skin
```

## Design Token Categories

```ts
type DesignTokens = {
  color: {
    backgroundPaper: string;
    backgroundPanel: string;
    textPrimary: string;
    textSecondary: string;
    accentPrimary: string;
    accentSecondary: string;
    borderSubtle: string;
    danger: string;
    warning: string;
    success: string;
  };
  typography: {
    ui: string;
    headline: string;
    numbers: string;
  };
  radius: {
    panel: string;
    card: string;
    pill: string;
  };
  shadow: {
    panel: string;
    clipping: string;
    modal: string;
  };
  texture: {
    paper: string;
    none: string;
  };
};
```

## Acceptance Criteria

The visual system is acceptable when:

- the UI feels warm and nostalgic
- dense tables remain readable
- team colors are tasteful accents
- big moments visually stand apart
- normal weeks stay calm
- texture does not hurt usability
- accessibility options exist
- the app does not look like a generic sportsbook dashboard


<!-- FILE: 03_THE_THREE_NARRATIVE_SURFACES.md -->

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


<!-- FILE: 04_NARRATIVE_IMPORTANCE_TIERS_AND_BIG_MOMENT_PRESENTATION.md -->

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


<!-- FILE: 05_CAMPUS_PULSE_AND_PROGRAM_TEMPERATURE_SYSTEM.md -->

# Campus Pulse and Program Temperature System

## North Star

Campus Pulse is the emotional atmosphere of the program.

It should summarize how the world around the program feels without forcing the user to read endless fake posts.

Program Temperature is the short label that captures the overall mood.

## Program Temperature

Examples:

```text
Quiet Confidence
Restless Optimism
Championship Fever
Boiling Pressure
Full Buy-In
Fractured
Waiting for a Spark
Winter Uncertainty
Local Doubt
Recruiting Momentum
Hot Seat Watch
```

## ProgramTemperature Object

```ts
type ProgramTemperature = {
  label: string;
  score: number;
  trend: "rising" | "falling" | "stable" | "volatile";
  components: CampusPulseComponents;
  reasonCodes: ReasonCode[];
  updatedAt: GameDate;
};
```

## CampusPulseComponents

```ts
type CampusPulseComponents = {
  fanMood: PulseComponent;
  studentEnergy: PulseComponent;
  boosterTemperature: PulseComponent;
  localMediaTone: PulseComponent;
  lockerRoomTone: PulseComponent;
  recruitBuzz: PulseComponent;
  nationalPerception: PulseComponent;
  campusTownMood: PulseComponent;
};
```

## PulseComponent

```ts
type PulseComponent = {
  score: number;
  label: string;
  trend: "up" | "down" | "flat" | "volatile";
  summary: string;
  reasonCodes: ReasonCode[];
  recentDrivers: EntityRef[];
};
```

## Component Inputs

## Fan Mood

Inputs:

- record
- expectation
- rivalry results
- streaks
- offense/defense style
- recruiting class
- coach reputation
- historical patience
- ticket price
- media tone

Labels:

```text
Euphoric
Hopeful
Restless
Angry
Checked Out
Cautiously Optimistic
Spoiled
```

## Student Energy

Inputs:

- ranking
- rivalry week
- home schedule
- weather
- campus culture
- student section strength
- night game
- recent wins

Labels:

```text
Electric
High
Steady
Flat
Distracted
```

## Booster Temperature

Inputs:

- wins
- rivalry
- NIL success
- facilities
- staff hires
- budget discipline
- media embarrassment
- recruiting class

Labels:

```text
Encouraged
Watchful
Impatient
Agitated
Generous
Divided
```

## Local Media Tone

Inputs:

- recent results
- hot seat
- recruiting misses
- player stories
- controversy
- expectations
- rivalry

Labels:

```text
Supportive
Skeptical
Critical
Curious
Hype-Building
Hot Seat
```

## Locker Room Tone

Inputs:

- team vibe
- morale
- promises
- role clarity
- transfer risk
- leadership
- fatigue
- injuries

Labels:

```text
Bought In
Stable
Uneasy
Divided
Tired
Rallying
```

## Recruit Buzz

Inputs:

- visit results
- commits
- decommits
- NIL reputation
- draft/development reputation
- campus atmosphere
- staff stability
- social/media narratives

Labels:

```text
Heating Up
Positive
Uncertain
Cooling
Damaged
Breakthrough
```

## National Perception

Inputs:

- ranking
- playoff odds
- major wins
- draft picks
- conference strength
- media narratives
- coach reputation

Labels:

```text
Contender
Overlooked
Fraud Watch
Rising
Fading
Irrelevant
```

## Campus/Town Mood

Inputs:

- home games
- local economy/fan interest abstraction
- rivalry
- attendance
- weather
- campus traditions
- player behavior events

Labels:

```text
Buzzing
Settled
Tense
Quiet
Celebratory
```

## Pulse Effects

Campus Pulse can affect:

- attendance
- recruit visit atmosphere
- booster donations
- media pressure
- player morale
- NIL local opportunities
- home field atmosphere

Keep effects subtle.

## Update Timing

Update after:

- game result
- major recruit event
- transfer event
- staff event
- NIL event
- facility event
- weekly Continue
- ranking/postseason event

## UI

Campus Pulse appears:

- Program Desk summary
- dedicated detail panel
- postgame reaction
- weekly recap
- media narrative

## Detail View

For each component show:

- label
- trend
- short summary
- top reason codes
- recent events
- possible action if relevant

Example:

```text
Booster Temperature: Watchful

Drivers:
- Rivalry loss: -12
- Top 10 recruiting class: +8
- NIL miss on portal QB: -5

Suggested:
Review NIL campaign or schedule booster meeting.
```

## Tests

Required:

- rivalry loss lowers fan mood
- top recruit commit raises recruit buzz
- NIL miss lowers booster temperature
- high team vibe improves locker room tone
- watchlisted event raises visibility
- Program Temperature label changes with component mix
- effects are subtle and capped

## Acceptance Criteria

Campus Pulse is acceptable when:

- it summarizes mood without spam
- every label has reason codes
- it changes after meaningful events
- it affects gameplay lightly
- it appears in Program Desk
- it can be drilled into


<!-- FILE: 06_PROGRAM_SCRAPBOOK_AND_MEMORY_SYSTEM.md -->

# Program Scrapbook and Memory System

## North Star

The Program Scrapbook is the emotional memory of the save.

It should make long-term careers feel meaningful.

The user should be able to look back after 15 seasons and remember:

- who mattered
- what changed the program
- what hurt
- what became legendary
- who grew up inside the program

## Scrapbook Entry Types

```text
Game Moment
Recruiting Moment
Player Moment
Staff Moment
Program Moment
Facility Moment
Rivalry Moment
Draft Moment
Award Moment
Realignment Moment
Collapse / Rebuild Moment
```

## Scrapbook Entry Schema

```ts
type ScrapbookEntry = {
  id: string;
  season: number;
  week: string;
  date: GameDate;
  category: ScrapbookCategory;
  tier: NarrativeImportanceTier;
  headline: string;
  summary: string;
  longText?: string;
  affectedEntities: EntityRef[];
  primaryEntity?: EntityRef;
  stats?: Record<string, number>;
  mediaClippings: MediaClipping[];
  reactions: ReactionBundle;
  tags: string[];
  reasonCodes: ReasonCode[];
  imageAssetId?: string;
  userPinned: boolean;
  autoGenerated: boolean;
};
```

## Auto-Scrapbook Rules

Auto-file:

- Tier 4 events
- school records
- national awards
- national title
- first playoff appearance
- rivalry streak broken
- first five-star at program
- first first-round pick after drought
- coach milestone
- stadium project completed
- conference realignment move

Prompt to file:

- Tier 3 events
- user watchlist events
- notable player milestones
- major staff moves
- major recruiting flips

Never auto-file:

- routine reports
- minor news
- repeated low-impact events

## Scrapbook UI

Views:

- Timeline
- By Season
- By Player
- By Coach
- By Rivalry
- By Category
- Pinned
- Program-Defining

Entry card:

- headline
- date
- category
- short summary
- key entity links
- media clipping
- reaction highlights
- tags
- "open full story"

## Full Entry View

Includes:

- headline
- context
- why it mattered
- relevant stats
- related game/recruit/player/staff
- reaction bundle
- follow-up consequences
- links to history pages

## Player Story Integration

Player profile should show:

```text
Story Timeline
Scrapbook Appearances
Key Moments
```

Examples:

- recruited
- committed
- redshirted
- first start
- breakout game
- injury
- transfer meeting
- award
- draft decision

## Recruit Story Integration

Prospect profile should show:

```text
Recruiting Story So Far
```

Fields:

- discovery event
- primary recruiter
- top competing schools
- key visit
- preference clues
- NIL/development/location tension
- final decision

## Coach Story Integration

Coach profile should show:

- career milestones
- staff tree
- program-defining games
- hot seat moments
- championships
- assistants developed

## Rivalry Story Integration

Rivalry page should show:

- series history
- streaks
- scrapbook moments
- heartbreaking losses
- legendary wins
- trophy history

## Memory Tags

Examples:

```text
rebuild_moment
rivalry
first_time
heartbreak
breakthrough
dynasty
collapse
player_legend
staff_tree
draft_pipeline
walk_on_story
```

## Narrative Continuity

Future media can reference past scrapbook entries.

Example:

```text
Three years ago, McClain was a late-developing camp find. Now he is one win from leading the program to its first playoff berth.
```

This should be grounded in entries, not invented.

## Tests

Required:

- Tier 4 auto-files
- Tier 3 prompts
- routine event not filed
- entry links to entities
- player profile shows scrapbook appearances
- record-breaking game creates entry
- save/load preserves scrapbook
- LLM summary uses only entry facts

## Acceptance Criteria

Scrapbook is acceptable when:

- big moments are remembered
- entries are grounded in sim facts
- players/recruits/coaches link to memory
- long saves develop history
- user can manually pin/file moments
- routine events do not clutter archive


<!-- FILE: 07_MEDIA_CLIPPINGS_RADIO_AND_VOICES_AROUND_PROGRAM.md -->

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


<!-- FILE: 08_SCREEN_PERSONALITIES_AND_COMPONENT_LIBRARY.md -->

# Screen Personalities and Component Library

## North Star

Every major screen should feel like part of the same game, but each should have its own identity.

The user should instantly understand:

```text
I am in the recruiting room.
I am in the film room.
I am in the program archive.
I am in the money/booster ledger.
```

## Shared Layout Components

## AppShell

Contains:

- TopBar
- LeftNav
- MainWorkspace
- RightInspector

## WorkspaceShell

Contains:

- WorkspaceHeader
- Breadcrumbs
- SubTabs
- ActionBar
- MainContent
- RightInspector
- Footer/ReasonCodes optional

## EntityLink

Any player, recruit, staff, school, town, game, record, or trait should be clickable.

## RightInspector

Shows selected entity/item.

Types:

- player quick view
- recruit quick view
- staff advice
- ProgramItem detail
- stat explanation
- trait definition
- facility project

## StaffAdviceRail

Shows:

- primary recommendation
- dissenting view
- confidence
- quick action

## ReasonCodeList

Shows why something happened.

Example:

```text
Interest +12: close to home
Interest +9: development reputation
Interest -7: crowded QB room
```

## MomentCard

Used for Tier 3–4 events.

Fields:

- headline
- subheadline
- category
- key entities
- reactions
- links
- file status

## MediaClippingCard

Short headline + outlet + summary.

## PulseMeter

Shows Campus Pulse component.

## ScrapbookEntryCard

Shows archived moment.

## Workspace Personalities

## Program Desk

Visual feel:

```text
coach's desk
organized folders
briefing notes
calendar
clippings
```

Primary components:

- ProgramItemCard
- StaffBriefingCard
- ContinueBlockerCard
- CampusPulseSummary
- CalendarSnapshot
- MediaClippingCard

## Roster Room

Visual feel:

```text
depth chart board
player folders
position room
```

Primary components:

- DenseTable
- PlayerQuickInspector
- DepthChartBoard
- PositionGroupPanel
- PlayerStoryTimeline

## Recruiting Room

Visual feel:

```text
recruiting board
map
folders
staff assignments
visit calendar
```

Primary components:

- ProspectTable
- RecruitingMap
- VisitCalendar
- ProspectQuickInspector
- StaffAssignmentBoard
- RecruitingStoryPanel

## Practice Field

Visual feel:

```text
weekly practice sheet
field plan
fatigue board
```

Primary components:

- PracticeTimeAllocator
- IntensitySelector
- FatigueRiskPanel
- TeamVibePanel
- PositionGroupPracticeTable

## Film Room

Visual feel:

```text
film cutups
scouting binder
chalkboard
```

Primary components:

- GamePlanPanel
- MatchupBoard
- PlayByPlayTable
- DriveChart
- ReasonCodeFilmNotes

## NIL / Money

Visual feel:

```text
ledger
booster notes
clearinghouse files
```

Primary components:

- NILDealTable
- ClearinghouseReviewCard
- BoosterSegmentPanel
- BudgetLedger
- DirectBenefitAllocator

## History / Scrapbook

Visual feel:

```text
media guide
archive
trophy room
scrapbook
```

Primary components:

- Timeline
- ScrapbookEntryCard
- RecordTable
- SeasonArchive
- PlayerLegacyPanel

## Data Hub

Visual feel:

```text
analytics binder
film charting room
```

Primary components:

- ChartPanel
- DataTable
- ValidationReport
- DistributionBandChart
- ExportButton

## Component States

Every component should support:

- loading
- empty
- error
- degraded/offline
- no data yet
- hidden due to scouting uncertainty
- locked/unavailable
- delegated

## Empty State Tone

Bad:

```text
No data.
```

Good:

```text
No staff reports yet. Assign a scout or wait for the next evaluation window.
```

## Buttons and Actions

Use immersive verbs.

Examples:

- Review Report
- Ask Staff
- Call Recruit
- Schedule Visit
- Meet With Player
- Set Practice Plan
- Send Position Coach
- File to Scrapbook
- Open Film Room
- Use Staff Recommendation
- Delegate to Coordinator

Avoid generic verbs where possible:

- Submit
- Execute
- Confirm
- Process

## Acceptance Criteria

Component library is acceptable when:

- components are reusable
- screen personality is visible but not gimmicky
- dense tables remain central
- right inspector reduces popups
- click-through is universal
- empty states are useful
- actions use football/program language


<!-- FILE: 09_PLAYER_RECRUIT_AND_COACH_STORY_UI.md -->

# Player, Recruit, and Coach Story UI

## North Star

The user should care about people.

Not just ratings.

Every player, recruit, and coach should accumulate a story across the save.

## Player Story UI

## Player Profile Header

Show:

- portrait
- name
- position
- class
- hometown
- high school
- role
- trait labels
- current morale
- transfer risk
- key staff note
- current story tag

Example story tag:

```text
Late-blooming starter
```

## Player Story Panel

Sections:

```text
Origin
Recruiting Story
Development Arc
Role History
Big Moments
Relationships
Promises
NIL / Brand
Future Outlook
```

## Origin

- hometown
- high school
- recruiting class
- star rating
- why he chose school
- primary recruiter

## Development Arc

Show timeline:

- arrived
- redshirt
- position change
- breakout practice
- first start
- injury
- regression
- award
- transfer meeting

## Big Moments

Links to:

- games
- records
- awards
- scrapbook entries
- media clippings

## Current Narrative Summary

Generated from facts.

Example:

```text
A late-developing Tulsa quarterback who nearly transferred after his redshirt year, McClain has become the face of the offense after winning the job in camp.
```

LLM can write this, but facts must be grounded.

## Recruit Story UI

## Prospect Profile Header

Show:

- name
- position
- class/grade
- hometown
- high school
- public stars
- your eval
- scouted confidence
- top schools
- trait labels

## Recruiting Story So Far

Sections:

```text
Discovery
Evaluation
Relationship
Why He Likes Us
Why He Hesitates
Competitor Threat
NIL / Role / Development Tension
Next Best Action
```

Example:

```text
Your staff identified him after a summer camp before his junior season. He values development and staying within the region, but Texas has made a late NIL push.
```

## Preference Clues

Do not reveal hidden preferences perfectly.

Show:

```text
Staff believes money matters.
Family appears location-sensitive.
Development pitch has landed well.
Playing time concern is real.
```

## Recruit Timeline

- discovered
- scouted
- offered
- visit
- top group
- commitment
- decommit
- signing

## Coach Story UI

## Coach Profile Header

Show:

- role
- age
- alma mater
- coaching tree
- philosophy
- reputation
- contract
- ambition risk

## Coach Story Sections

```text
Career Path
Coaching Tree
Scheme Identity
Recruiting Regions
Development Track Record
Staff Relationships
Player Relationships
Big Moments
Job Market
```

## Staff Narrative Summary

Example:

```text
A young Air Raid assistant with deep Texas ties, Reed has quickly become one of the staff's best relationship builders but is already drawing coordinator interest.
```

## Relationship Web

Show:

- players close to coach
- recruits tied to coach
- staff chemistry
- high school connections

## Story Triggers

Player:

- commits
- signs
- redshirts
- first start
- breakout game
- injury
- transfer meeting
- award
- draft declaration

Recruit:

- discovered early
- visit
- commitment
- flip
- signing

Coach:

- hired
- promoted
- poached
- wins award
- develops draft pick
- clashes with staff
- becomes head coach candidate

## Tests

Required:

- player story uses actual events
- recruit story uses actual recruiting state
- coach story uses actual history
- hidden preferences are not exposed as certainty
- narrative summary falls back without LLM
- scrapbook links appear
- entity links work

## Acceptance Criteria

Story UI is acceptable when:

- people feel like individuals
- story is grounded in sim facts
- major moments link to history
- hidden info remains uncertain
- user can click through the story


<!-- FILE: 10_COPYWRITING_INTERACTION_LANGUAGE_AND_TONE_GUIDE.md -->

# Copywriting, Interaction Language, and Tone Guide

## North Star

Words matter.

The game's writing should feel like college football operations, not generic software.

Use language that sounds like:

```text
staff meeting
coach's office
local sports page
recruiting room
film room
program archive
```

Avoid language that sounds like:

```text
generic dashboard
corporate SaaS
sports betting
social media engagement bait
futuristic esports
```

## Button Language

Use action verbs tied to football operations.

## Good

```text
Review Report
Ask Staff
Call Recruit
Schedule Visit
Meet With Player
Set Practice Plan
Send Position Coach
Open Film Room
Add to Watchlist
File to Scrapbook
Use Staff Recommendation
Delegate to Coordinator
Open Depth Chart
Approve Deal
Request Review
```

## Avoid

```text
Submit
Execute
Process
Engage
Activate
Resolve All
Optimize
```

## Program Desk Section Names

Use:

```text
Must Fix To Continue
Today's Decisions
Staff Briefing
Campus Pulse
Media Clippings
Watchlist
Calendar
```

Avoid:

```text
Notifications
Messages
Feed
Tasks Dashboard
Engagement Center
```

## Status Labels

## Fan Mood

```text
Euphoric
Hopeful
Restless
Angry
Checked Out
Cautiously Optimistic
Spoiled
```

## Booster Temperature

```text
Generous
Encouraged
Watchful
Impatient
Agitated
Divided
```

## Locker Room Tone

```text
Bought In
Stable
Uneasy
Divided
Tired
Rallying
```

## Recruit Buzz

```text
Heating Up
Positive
Uncertain
Cooling
Damaged
Breakthrough
```

## Program Temperature

```text
Quiet Confidence
Restless Optimism
Championship Fever
Boiling Pressure
Full Buy-In
Fractured
Waiting for a Spark
Winter Uncertainty
Local Doubt
Recruiting Momentum
```

## Staff Voice Styles

## Blunt

```text
"We are thin at tackle. If we do not address it now, it will cost us by October."
```

## Analytical

```text
"The concern is not the top of the room. It is the drop-off after the second unit."
```

## Old-School

```text
"He needs reps, not promises. Put him in the work and see if he responds."
```

## Optimistic

```text
"There is something here. He is not ready yet, but the habits are exactly what we want."
```

## Risk-Averse

```text
"I would be careful. The upside is real, but the evaluation is still too uncertain."
```

## Recruiter-Salesman

```text
"Get him on campus. The family will love the place, and we can win the room."
```

## Media Voice

Should sound like local/regional sports coverage.

Examples:

```text
"Saturday did not settle every question, but it changed the tone around the program."
```

```text
"The staff has spent two years building this recruitment. Now the final push begins."
```

Avoid:

```text
"Fans are absolutely losing their minds online!"
```

unless the game is intentionally using a lighter radio/fan digest.

## Player Meeting Tone

Keep grounded.

Examples:

```text
Player:
"I just need to know where I stand."

Coach options:
- "You are still in the plan. I need you ready."
- "You will get a fair shot, but I cannot promise starts."
- "If you need a bigger role now, we should be honest about that."
```

## Recruit Meeting Tone

Examples:

```text
Recruit:
"Coach, I like what you're building. I just need to know how I fit."

Options:
- Pitch development path
- Pitch early role
- Pitch staying close to home
- Pitch NIL/brand opportunity
- Be honest about competition
```

## NIL / Booster Tone

Should feel practical, not cartoonish.

Good:

```text
"A facilities-focused donor is willing to help, but wants the project tied to recruiting visibility."
```

Bad:

```text
"Rich booster demands you start his favorite player."
```

Use meddling sparingly and realistically.

## Error / Blocker Tone

Clear, direct, not generic.

Bad:

```text
Cannot continue.
```

Good:

```text
Cannot advance to game day: no eligible quarterback is assigned to the active depth chart.
```

Quick fixes:

```text
Use OC Recommendation
Open Depth Chart
Delegate to Staff
```

## Empty State Tone

Bad:

```text
No reports.
```

Good:

```text
No staff reports yet. Assign a scout or wait for the next evaluation window.
```

## Big Moment Tone

Tier 4 events should feel archival.

Example:

```text
"This one will go in the book."
```

But do not overuse dramatic copy.

## Tone Acceptance Criteria

Writing is acceptable when:

- it sounds like football operations
- it is grounded in facts
- it avoids generic software language
- it avoids cartoon drama
- it makes actions feel meaningful
- it supports the cozy nostalgic atmosphere


<!-- FILE: 11_AUDIO_AMBIENCE_AND_ASSET_DIRECTION_OPTIONAL.md -->

# Audio, Ambience, and Asset Direction — Optional Future Layer

## North Star

Audio and generated assets should support the cozy, nostalgic atmosphere.

They should not be required for core gameplay.

## Audio Philosophy

Use subtle ambience.

Normal UI should be quiet.

Big moments can have light ceremonial treatment.

## Ambient Sounds

Possible low-volume loops:

- office ambience
- paper shuffle
- distant crowd murmur
- radio static/tuning
- film projector hum
- rain outside office
- stadium pregame murmur
- marching band far away

## UI Sounds

Subtle:

- page turn
- folder open
- soft pencil mark
- clipboard tap
- camera shutter for scrapbook
- newspaper press tick
- radio click

Avoid:

- futuristic whooshes
- loud casino sounds
- constant notification pings
- aggressive sports broadcast stingers

## Big Moment Sounds

For Tier 4 only:

- crowd swell
- fight-song-style sting
- radio call snippet, generated/private
- camera flashes
- press room murmur
- trophy room ambience

## Fight Songs / 8-Bit Audio

Future idea:

- AI-generated 8-bit fight-song-like themes
- school-specific but legally safe/private as needed
- used for big wins, title screens, stadium moments
- user can disable

## Asset Direction

Generated art should feel like:

- media guide portrait
- local newspaper photo
- program archive image
- campus postcard
- stadium concept
- retro game icon
- recruiting profile card

Avoid:

- hyper-glossy trading-card look
- fantasy armor sports graphics
- neon esports style
- unrealistic AI faces that break immersion

## Asset Types

- player portraits
- coach portraits
- school logos
- uniform previews
- stadium concepts
- scrapbook images
- media clipping thumbnails
- town/campus images

## Asset Pipeline

```text
structured entity data
→ prompt payload
→ asset service
→ generated image/audio
→ user review/lock/regenerate
→ asset metadata saved
```

## Prompt Data

For portraits:

- age
- role
- position
- body type
- team colors
- style: media guide portrait
- seed
- avoid real-player likeness unless private/user-supplied

For stadium:

- capacity
- region
- architecture style
- school colors
- weather
- era
- project type

For uniform:

- colors
- tradition/modernity score
- helmet style
- stripe style
- logo
- number font

## User Controls

- regenerate
- lock
- replace manually
- hide generated assets
- batch generation
- disable audio
- reduced motion
- low-resource mode

## Acceptance Criteria

Optional asset/audio layer is acceptable when:

- core game works without it
- assets are stored as references
- user can lock/regenerate
- audio is subtle and optional
- big sounds are reserved for big moments
- visual style matches cozy nostalgic direction


<!-- FILE: 12_UI_NARRATIVE_IMPLEMENTATION_PACKETS.md -->

# UI Narrative Implementation Packets

## Purpose

These are implementation packets for the AI coder.

Use these after the base app shell and Program Desk model exist, or use them to guide those systems.

---

# UINVIBE-1 — Design Tokens and Theme Foundation

## Goal

Create the cozy/nostalgic visual foundation.

## Deliverables

- design token file
- Classic Office Light theme
- Classic Office Dark theme
- typography roles
- status colors
- panel variants
- accessibility contrast check where possible

## Acceptance

- UI can use semantic tokens
- team colors can be applied as accents
- no hardcoded neon/futuristic styling
- dense tables remain readable

---

# UINVIBE-2 — Narrative Importance Tier Model

## Goal

Create importance tiers for events.

## Deliverables

- NarrativeImportanceTier type
- tier calculation helper
- presentation rules
- tests

## Acceptance

- Tier 0 does not interrupt
- Tier 4 auto-files Scrapbook
- watchlisted entities raise priority
- first-time milestones raise priority

---

# UINVIBE-3 — Program Desk Visual System

## Goal

Implement Program Desk with cozy office feel.

## Deliverables

- Program Desk overview layout
- ProgramItemCard
- StaffBriefingCard
- ContinueBlockerCard
- CalendarSnapshot
- MediaClippingCard
- RightInspector

## Acceptance

- actions are connected to ProgramItems
- no raw feed
- blockers clearly separated
- staff briefing grouped

---

# UINVIBE-4 — Campus Pulse System

## Goal

Implement Campus Pulse mood surface.

## Deliverables

- CampusPulse model
- ProgramTemperature model
- pulse calculation helper
- Program Desk summary component
- detail panel

## Acceptance

- labels have reason codes
- pulse updates from real events
- no fake social feed
- trend visible

---

# UINVIBE-5 — Program Scrapbook

## Goal

Implement long-term memory system.

## Deliverables

- ScrapbookEntry model
- auto-file rules
- Scrapbook route
- entry card
- full entry view
- player/recruit/coach links

## Acceptance

- Tier 4 events create entry
- user can pin/file
- entries save/load
- player profile shows related entries

---

# UINVIBE-6 — Media Clippings and Radio Digest

## Goal

Create curated media reaction instead of social feed spam.

## Deliverables

- MediaClipping model
- RadioDigest model
- clipping generator from events
- digest grouping
- UI components

## Acceptance

- clippings are capped
- digest groups fan reaction
- generated text uses grounded facts
- no infinite feed

---

# UINVIBE-7 — Voices Around the Program

## Goal

Create multi-perspective reaction bundles.

## Deliverables

- ReactionBundle model
- ReactionItem model
- generator from event consequences
- UI component

## Acceptance

- staff/fan/booster/recruit/player perspectives can appear
- all reactions have reason codes
- no invented facts

---

# UINVIBE-8 — Player / Recruit / Coach Story Panels

## Goal

Make people feel like individuals.

## Deliverables

- PlayerStoryPanel
- RecruitingStoryPanel
- CoachStoryPanel
- story event timeline
- grounded summary fallback

## Acceptance

- story uses real events
- hidden info remains uncertain
- scrapbook links appear
- no LLM required

---

# UINVIBE-9 — Moment Card and Big Event Presentation

## Goal

Make major events feel important.

## Deliverables

- MomentCard
- MomentPage or Program Desk hero
- reaction bundle integration
- scrapbook integration
- history links

## Acceptance

- Tier 4 event gets special treatment
- routine events do not
- user can continue when ready
- no modal spam

---

# UINVIBE-10 — Copy and Interaction Language Pass

## Goal

Replace generic app copy with program-appropriate language.

## Deliverables

- action label registry
- status label registry
- empty state copy
- blocker copy
- staff voice templates

## Acceptance

- buttons use immersive verbs
- blockers are clear
- empty states are helpful
- generic SaaS language reduced

---

# UINVIBE-11 — FM-Density and Clickability Audit

## Goal

Make sure cozy vibe does not reduce depth.

## Deliverables

- UI density checklist
- clickability checklist
- audit script/manual checklist
- reviewer prompt

## Acceptance

- every screen has score
- card-only screens flagged
- missing click paths flagged
- table density protected

---

# UINVIBE-12 — Narrative QA and Spam Control

## Goal

Prevent narrative systems from becoming noisy.

## Deliverables

- clipping caps
- event grouping
- tier-based presentation
- digest rules
- tests

## Acceptance

- normal week stays calm
- big week feels bigger
- repeated events group
- low-tier events do not clutter


<!-- FILE: 13_READY_TO_PASTE_UI_NARRATIVE_PROMPTS.md -->

# Ready-To-Paste UI Narrative Prompts

## Prompt: UINVIBE-1 Design Tokens and Theme Foundation

```text
Implement UINVIBE-1 — Design Tokens and Theme Foundation.

Goal:
Create the cozy, nostalgic visual foundation for CFB-FM.

Design direction:
The UI should feel like a warm college football program office: media guides, staff notes, recruiting folders, film room, local newspaper archive. It should not feel neon, futuristic, or like a sports-betting app.

Deliver:
- semantic design tokens
- Classic Office Light theme
- Classic Office Dark theme
- typography roles: ui, headline, numbers
- panel variants: paper, folder, clipping, ledger, film
- status colors for success/warning/danger/info
- team accent color support
- basic documentation

Hard rules:
- team colors are accents, not full backgrounds
- dense tables must remain readable
- no heavy texture behind tables
- no hardcoded neon styling
- accessibility contrast should be considered

Acceptance:
- components can reference semantic tokens
- both themes load
- table text remains readable
- project docs updated
```

## Prompt: UINVIBE-2 Narrative Importance Tier Model

```text
Implement UINVIBE-2 — Narrative Importance Tier Model.

Goal:
Create event importance tiers so normal weeks stay calm and big moments feel big.

Deliver:
- NarrativeImportanceTier type: 0,1,2,3,4
- tier labels
- presentation rules
- autoScrapbook flag
- tier calculation helper
- tests

Rules:
Tier 0 = ambient
Tier 1 = notable
Tier 2 = important
Tier 3 = major moment
Tier 4 = program-defining

Inputs:
- event type
- entity importance
- rivalry
- record/milestone
- postseason impact
- user watchlist
- historical rarity
- program context

Acceptance:
- Tier 0 does not interrupt
- Tier 4 auto-files to Scrapbook
- watchlisted entity raises priority
- first-time milestone raises priority
- repeated routine event stays low tier
```

## Prompt: UINVIBE-4 Campus Pulse System

```text
Implement UINVIBE-4 — Campus Pulse System.

Goal:
Create the ambient mood surface for the program.

Deliver:
- CampusPulse model
- ProgramTemperature model
- PulseComponent model
- calculation helper
- reason codes
- Program Desk summary component
- detail view component
- tests

Components:
- fanMood
- studentEnergy
- boosterTemperature
- localMediaTone
- lockerRoomTone
- recruitBuzz
- nationalPerception
- campusTownMood

Hard rules:
- Campus Pulse is not a social feed
- every label must have reason codes
- effects should be subtle
- no invented narrative facts

Acceptance:
- rivalry loss lowers fan mood
- top recruit commit raises recruit buzz
- high team vibe improves locker room tone
- NIL miss can lower booster temperature
- ProgramTemperature label updates based on components
```

## Prompt: UINVIBE-5 Program Scrapbook

```text
Implement UINVIBE-5 — Program Scrapbook.

Goal:
Create the long-term memory system for program-defining moments.

Deliver:
- ScrapbookEntry model
- auto-file rules
- manual file/pin action
- Scrapbook route
- ScrapbookEntryCard
- full entry view
- links to affected entities
- save/load support
- tests

Hard rules:
- entries must be grounded in real events
- Tier 4 auto-files
- Tier 3 can prompt
- routine events do not auto-file
- LLM not required

Acceptance:
- record-breaking game creates entry
- top milestone creates entry
- player profile can show related entries
- entries persist through save/load
- user can pin/manual file
```

## Prompt: UINVIBE-6 Media Clippings and Radio Digest

```text
Implement UINVIBE-6 — Media Clippings and Radio Digest.

Goal:
Replace raw fan/media feed spam with curated grounded clippings and radio summaries.

Deliver:
- MediaClipping model
- RadioDigest model
- clipping generator from narrative events
- weekly/postgame digest generator
- MediaClippingCard
- RadioDigestPanel
- tests

Hard rules:
- no infinite social feed
- cap clippings by week/event tier
- all text grounded in event facts
- LLM optional and validated
- routine events should not create spam

Acceptance:
- big win creates limited clipping bundle
- normal week creates small number of clippings
- radio digest groups fan reaction
- unsupported facts rejected
```

## Prompt: UINVIBE-8 Player / Recruit / Coach Story Panels

```text
Implement UINVIBE-8 — Player, Recruit, and Coach Story Panels.

Goal:
Make people feel like individuals with histories.

Deliver:
- PlayerStoryPanel
- RecruitingStoryPanel
- CoachStoryPanel
- StoryTimeline component
- grounded summary fallback
- links to events/scrapbook/stats
- tests

Player story sections:
- Origin
- Recruiting Story
- Development Arc
- Role History
- Big Moments
- Relationships
- Promises
- NIL / Brand
- Future Outlook

Recruit story sections:
- Discovery
- Evaluation
- Relationship
- Why He Likes Us
- Why He Hesitates
- Competitor Threat
- NIL / Role / Development Tension
- Next Best Action

Coach story sections:
- Career Path
- Coaching Tree
- Scheme Identity
- Recruiting Regions
- Development Track Record
- Big Moments
- Job Market

Hard rules:
- use real sim facts
- hidden info remains uncertain
- no LLM required
- all names/entities clickable

Acceptance:
- story timeline populates from events
- player profile links to scrapbook entries
- recruit story reflects recruiting state
- coach story reflects career history
```

## Prompt: UINVIBE-9 Moment Card and Big Event Presentation

```text
Implement UINVIBE-9 — Moment Card and Big Event Presentation.

Goal:
Make Tier 3 and Tier 4 events feel important without overusing modals.

Deliver:
- MomentCard component
- MomentDetail view or Program Desk hero panel
- ReactionBundle integration
- Scrapbook integration
- action buttons
- tests

MomentCard fields:
- headline
- subheadline
- date/week
- category
- key entities
- why it mattered
- immediate effects
- reactions
- links
- scrapbook file status

Hard rules:
- Tier 4 gets special treatment
- routine events do not
- user can continue when ready
- no unsupported facts
- no constant dramatic presentation

Acceptance:
- Tier 4 event renders MomentCard
- Tier 1 event does not
- MomentCard links to affected entities
- MomentCard can file to Scrapbook
```

## Prompt: UINVIBE-11 FM-Density and Clickability Audit

```text
Implement UINVIBE-11 — FM-Density and Clickability Audit.

Goal:
Protect the game from becoming a shallow cozy dashboard.

Deliver:
- UI density checklist
- clickability checklist
- screen audit utility or manual checklist file
- reviewer prompt
- docs

Checklist:
- dense table where comparison is needed
- row click-through
- filters
- saved views
- right inspector
- staff recommendations
- breadcrumbs
- hover/detail cards
- no mock data
- no card-only major screens

Acceptance:
- each main screen can be scored
- card-only screens are flagged
- missing click paths are flagged
- reviewer AI prompt included
```
