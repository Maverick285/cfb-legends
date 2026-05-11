# College Football Legends — Production Asset Bible

## 1. Purpose

This document defines the production asset strategy for College Football Legends. It should be used by the AI agent before coding major UI screens.

The game should use a **graphics-pack-first, template-driven UI pipeline**:

1. Generate/reference main screen mockups.
2. Break those screens into reusable visual parts.
3. Classify each part as static, dynamic, hybrid, or programmatic.
4. Create a literal asset manifest with file names, sizes, formats, states, and usage.
5. Build reusable UI templates and wire dynamic data into them.

## 2. Key distinction

Do not make one background image per page and place invisible buttons on top. That is brittle.

Instead, build pages from reusable layers:

```text
Layer 1 — Global shell
Header, sidebar, footer, ticker, app background.

Layer 2 — Reusable panels/components
Cards, tables, rows, buttons, tabs, score banners, grade cards, skill nodes.

Layer 3 — Graphic skins and decorative assets
Panel textures, headers, dividers, accents, stamps, frames, icons.

Layer 4 — Dynamic data
Text, numbers, records, ranks, players, scores, charts, colors, team logos.
```

## 3. Static vs dynamic rule

### Static / premade graphics
Use real exported graphics for:

- game logo lockups
- icons
- subtle background textures
- decorative corners/brackets
- panel skins where a 9-slice/scalable approach is useful
- button skins if not CSS-rendered
- signed stamp
- skill node art
- stadium top-down base artwork
- uniform mannequin base artwork
- helmet shell artwork
- hero image frames

### Programmatic graphics
Render in code:

- text
- team names
- player names
- records
- rankings
- stat values
- grades
- budget values
- chart fills
- progress bars
- table rows
- selected states
- team-color tinting where practical
- star counts
- line scores

### Hybrid graphics
Use a static frame + dynamic code content for:

- score banners
- matchup cards
- postgame report cards
- NIL budget cards
- recruiting prospect cards
- stadium expansion cards
- school identity preview cards

## 4. Sizing strategy

Use a 1920x1080 baseline.

Common reusable sizes:

```text
App header:                 1920x96 or 1920x120
Sidebar:                    240x1080 or 256x1080
Footer ticker:              1920x40 or 1920x48
Large hero frame:           960x540
Medium content card:        420x220
Small summary card:         320x160
Wide stat strip:            820x88 or 960x96
Right detail panel:         420x760
Large tile:                 320x180
Small list row:             320x56
Table row:                  40 / 56 / 72 px high
Large CTA button:           260x48
Medium button:              180x40
Small button:               120x32
```

## 5. Use scalable assets when possible

For panels/buttons, prefer one of these:

- CSS-rendered gradients/borders/shadows
- SVG scalable frames
- 9-slice PNG panels

Do not export 80 different fixed card backgrounds unless absolutely necessary.

## 6. Recoloring and team brands

Team identity must come from brand tokens:

- primary color
- secondary color
- accent color
- dark variant
- light/cream variant
- logo paths
- wordmark paths

Do not bake Alabama crimson, USC cardinal, Notre Dame navy, etc. into shared component assets. Shared art should be neutral or tintable.

## 7. Asset priority

Build the global graphics first. Then build components. Then special screen-family assets. Then unique hero images.

The correct sequence is:

1. global shell
2. panels/buttons/icons
3. data widgets
4. page-family special assets
5. content/hero art
6. team-specific logo packs
7. final polish overlays
