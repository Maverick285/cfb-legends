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
