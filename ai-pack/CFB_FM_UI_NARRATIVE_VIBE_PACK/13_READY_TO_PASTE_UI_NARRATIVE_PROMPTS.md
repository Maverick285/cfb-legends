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
