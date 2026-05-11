# 74 — Dynamic Image Generation System Spec

## North Star

Dynamic generated images should make the save feel alive by visually representing real events that happened inside the simulation.

They should appear in:

- Program Desk
- Media Clippings
- Postgame Reports
- Campus Pulse
- Player Story Timeline
- Recruit Commitment Stories
- Program Scrapbook
- Draft Night Recaps
- Rivalry History
- Game Recaps

They should not be random AI art.

Every image must be grounded in structured game facts.

## Example

Given this actual game event:

```text
Darius McClain throws a go-ahead TD against Texas at the Cotton Bowl in light rain.
```

The game builds this image idea:

```text
fictional QB Darius McClain
Oklahoma uniform colors
Texas opponent colors in background
neutral-site rivalry stadium
light rain
wet turf
fourth quarter go-ahead touchdown
cinematic sports media photo
no real logos
no readable brand text
```

## What The Image System Owns

The image system owns:

- image job creation
- prompt building
- prompt validation
- asset metadata
- file paths
- thumbnails
- job status
- image provider integration
- UI display states
- regenerate / lock / replace controls

## What The Image System Does Not Own

The image system does not decide:

- whether the player scored
- what the weather was
- what the score was
- what uniform was worn
- whether a recruit committed
- whether a player was injured
- whether a NIL deal happened
- whether an event matters

Those are simulation/event-system facts.

## Image Asset Types

```text
player_portrait
coach_portrait
news_image
scrapbook_image
game_moment_image
stadium_image
uniform_preview
recruit_commitment_image
draft_night_image
```

## Generation Triggers

## Tier 0–1 Events

No image by default.

Examples:

- minor scouting report
- small practice note
- routine media mention

## Tier 2 Events

Image optional. Show a Generate Image button.

Examples:

- player considering transfer
- high-value recruit schedules visit
- NIL deal flagged
- starter returns from injury, if confirmed by sim

## Tier 3 Events

Auto-queue if AI images are enabled.

Examples:

- rivalry game win
- top recruit commits
- star player enters portal
- conference title berth
- major upset

## Tier 4 Events

Auto-queue and attach to Scrapbook.

Examples:

- national title
- first playoff appearance
- school record broken
- legendary recruit signs
- stadium expansion completed
- first first-round pick after drought
- walk-on wins major award

## Image Style Modes

Start with these style presets:

```text
sports_media_photo
media_guide_portrait
newspaper_clipping_photo
scrapbook_archive
stadium_concept
uniform_preview
recruit_commitment_card
draft_night_editorial
```

## Recommended Default

```text
sports_media_photo
```

## Prompt Grounding

The prompt builder must consume:

- event type
- headline
- summary
- primary player
- team
- opponent
- venue
- weather
- uniform
- game state
- score context
- importance tier
- visual identity
- reference portrait if available

## Prompt Should Avoid

- real logos
- real trademarks
- readable brand text
- real person likeness
- unsupported injuries
- unsupported NIL amounts
- unsupported commits
- unsupported quotes
- unsupported weather
- unsupported stadium details

## Consistency

Player consistency should use:

- stable visual seed
- player visual identity descriptors
- existing portrait reference if available
- locked player portrait
- same jersey number when known
- same team visual identity

Venue consistency should use:

- venue visual identity
- city/state
- stadium type
- capacity band
- architecture description
- weather context

Team consistency should use:

- primary color
- secondary color
- helmet description
- uniform description
- no real logos unless private mode explicitly allows

## User Controls

The user should be able to:

- generate image
- regenerate image
- lock image
- replace manually
- hide AI images
- disable auto-generation
- choose style preset
- use generic silhouettes
- delete generated files

## Offline Behavior

If image service is unavailable:

```text
show transcript/news story
show placeholder
allow queueing
do not block gameplay
```

## Acceptance Criteria

This system is acceptable when:

- images are generated from structured facts
- prompt validation exists
- image generation is async
- generated assets persist
- UI supports queued/generating/ready/failed states
- Tier 4 events auto-attach to Scrapbook
- image service can be mocked
- game works with no image service
