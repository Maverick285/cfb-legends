# 76 — Prompt Builder and Context Pipeline

## Purpose

This document defines how the game converts a news event into a grounded image prompt.

## Pipeline

```text
NewsItem + GameWorld
→ buildNewsImageContextFromNews
→ collect player/team/venue visual identities
→ buildNewsImagePrompt
→ validateImagePrompt
→ queue asset job
```

## Prompt Builder Requirements

The prompt builder must be:

- deterministic
- grounded in facts
- seed-stable
- style-preset aware
- validator-friendly
- provider-agnostic

## Prompt Sections

A good prompt should include:

```text
1. fictional game disclaimer
2. primary subject
3. event/moment
4. team uniform
5. opponent/background
6. venue/location
7. weather/atmosphere
8. game context
9. style preset
10. safety line: no real logos/trademarks/readable text/real person likeness
```

## Example Prompt

```text
Cinematic sports media image from a fictional college football management game. Fictional QB Darius McClain, jersey number 12, during a late game-winning touchdown. Team uniform: crimson helmet, white jersey with crimson numbers, white pants. Opponent colors visible in the background: burnt orange and white. Location: Cotton Bowl in Dallas, Texas, historic neutral-site stadium with packed split-color crowd. Weather and atmosphere: light rain, wet turf, stadium lights reflecting off the field. Game context: period 4, clock 01:12. Style: professional college football photography, realistic action shot, editorial sports magazine quality, dramatic but believable. No real logos, no real trademarks, no readable brand text, no real person likeness.
```

## Negative Prompt

Default:

```text
real logo, real trademark, readable text, watermark, extra fingers, deformed hands, distorted face, wrong sport, soccer, basketball, baseball, cartoon, anime, low quality, blurry, AI artifacts
```

## Seed Stability

Stable seed should use:

```text
eventId
newsId
primaryPlayerId
teamId
venueId
eventType
```

Do not use random seed unless user explicitly regenerates.

## Regeneration

When user clicks Regenerate:

```text
same prompt
new seed
same source facts
new asset
old asset remains if locked
```

## Player Consistency

If `PlayerVisualIdentity.portraitAssetId` exists:

```text
include referenceImagePath
include stable descriptors
include visualSeed
```

If unavailable:

```text
use descriptors + stable seed
```

## Uniform Consistency

Use `TeamVisualIdentity`.

Do not ask model for “Oklahoma logo” unless private mode explicitly allows real logos.

Instead:

```text
crimson helmet
white jersey with crimson numbers
cream accent stripes
```

## Venue Consistency

Use `VenueVisualIdentity`.

Example:

```text
historic neutral-site stadium with packed split-color crowd
```

Avoid unsupported specifics.

## Event Type Descriptions

## game_winning_touchdown

```text
late game-winning touchdown, tense stadium, key player in action
```

## record_breaking_performance

```text
record-breaking performance, player celebrating or in action, crowd reacting
```

## top_recruit_commitment

```text
commitment ceremony-style image, recruit at podium/table or campus backdrop
```

## draft_selection

```text
draft-night editorial image, player and family/staff celebrating, no real league logos
```

## stadium_project

```text
stadium/facility construction or reveal, architectural concept style
```

## Prompt Builder Tests

Required:

- game-winning TD prompt includes player/team/venue/weather
- prompt excludes forbidden brand/logos
- same event produces same seed
- regeneration changes seed only when requested
- no player reference path if no portrait
- Tier 4 uses scrapbook asset type
- invalid prompt rejected by validator

## Acceptance Criteria

Prompt pipeline is acceptable when:

- all prompts are grounded
- prompt includes enough visual detail
- prompt avoids real IP by default
- prompt can be audited
- prompt is deterministic
- prompt supports player/venue consistency
