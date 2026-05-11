# CGM Menu Graphics Asset Manifest

Date: 2026-05-07

Purpose: define the menu-screen graphics Campus Gridiron Manager should create and use. FM assets/screenshots are dimensional and layout reference only. Do not copy FM art, icons, logos, textures, or screen compositions.

## Source Inventory

Local reference sources inspected:

- `C:\Users\joshu\Downloads\fm_screenshots`
- `C:\Users\joshu\Downloads\CTRL26_1-5_WIN.zip`
- `C:\Users\joshu\OneDrive\Desktop\FM Game\Screens for game`
- `C:\Users\joshu\OneDrive\Desktop\FM Game\Screens for game\AI Game Screens`
- `C:\Users\joshu\Downloads\openart-download-images`
- `C:\Users\joshu\Downloads\openart-download-images (1)`
- `ai-pack\CFB_FM_UI_RESCUE_POLISH_PACK`
- `ai-pack\CFB_FM_DYNAMIC_IMAGE_GENERATION_PACK`

Generated inventory:

- `tmp\asset-inventory\image_inventory.json`
- `tmp\asset-inventory\fm_screenshots_contact.png`
- `tmp\asset-inventory\ai_game_screens_contact.png`

Observed local reference dimensions:

- `1792x1008` and `1920x1080`: full desktop/widescreen screen concepts
- `650x366`, `700x366`, `739x415`: FM screenshot/reference-card proportions
- `1024x1024`, `1536x1536`, `2048x2048`: square portraits/tiles
- `1152x1536`, `1216x1536`, `1024x1536`: portrait/mobile or tall editorial concepts
- `3840x2160`, `2560x1440`: high-res widescreen art source masters

## Efficient Direction

Do not build the game around many one-off background images. The menu system should be mostly CSS, layout, icons, data grids, and object records.

Use custom graphics only where they add identity or context:

- player/recruit/coach portraits
- stadium and campus images
- news/story thumbnails
- program and rivalry header art
- competition/conference tiles
- trophy/award/scrapbook images
- generic placeholders/fallbacks

The efficient workflow:

1. Use FM screenshots for size, density, and placement reference.
2. Use existing CGM AI reference images for style direction.
3. Generate a finite base art library for menu surfaces.
4. Let computed/AI graphics create event-specific images later.
5. Keep all major menu screens functional without needing bespoke art.

## Asset Size Standards

These sizes should be enough for the first polished menu system.

| Asset class | Source/master size | Display crop targets | Format | Use |
| --- | ---: | --- | --- | --- |
| App background | `2560x1440` | `16:9`, blurred/cropped | jpg/webp | login/main menu/start career only |
| Program header image | `1920x640` | `3:1`, `16:5` | jpg/webp | program desk, team page |
| Stadium hero | `1920x1080` | `16:9`, `21:9` | jpg/webp | stadium page, game preview |
| News image | `1280x720` | `16:9` | jpg/webp | inbox, media, story cards |
| Story thumbnail | `640x360` | `16:9` | jpg/webp | compact inbox/story lists |
| Player/recruit portrait | `1024x1024` | square, `4:5` crop | png/webp | profile, roster, recruit board |
| Coach/staff portrait | `1024x1024` | square, `4:5` crop | png/webp | staff profile, carousel |
| Team tile/logo field | `1024x1024` | square | png/svg/webp | team cards, conference tables |
| Conference tile | `1024x576` | `16:9` | png/webp | conference page, realignment |
| Rivalry banner | `1920x640` | `3:1` | jpg/webp | rivalry pages, game week |
| Award/trophy image | `1024x1024` | square | png/webp | awards, history, scrapbook |
| Facility/campus image | `1280x720` | `16:9` | jpg/webp | facilities, recruiting visit |
| Uniform/helmet preview | `1024x1024` | square | png/webp | team identity, game preview |
| Placeholder portrait | `1024x1024` | square | png/webp | missing person art |
| Placeholder venue | `1280x720` | `16:9` | jpg/webp | missing stadium/campus art |
| Icon sprite/source | `256x256` or vector | `16`, `20`, `24`, `32` px | svg/png | nav/action/status icons |

## First Must-Have Graphics

These should exist before the next serious UI polish pass.

### Shell And Navigation

| Asset | Size | Screen | Purpose | Notes |
| --- | ---: | --- | --- | --- |
| `app-bg-main-menu` | `2560x1440` | Start/main menu | Establish game identity | Campus stadium/office atmosphere, not busy behind text |
| `app-bg-loading` | `2560x1440` | Loading/save screens | Reusable transition backdrop | Similar palette, lower contrast |
| `brand-wordmark` | vector or `1600x400` | Main menu/topbar | Game identity | Should be original CGM branding |
| `nav-icon-set` | vector | Sidebar/actions | Consistent navigation | Prefer lucide where possible; only custom for football-specific concepts |

### Program Desk

| Asset | Size | Screen | Purpose | Notes |
| --- | ---: | --- | --- | --- |
| `program-header-default` | `1920x640` | Program Desk | Header image fallback | Campus football facility, dusk/light office tone |
| `program-office-bg` | `1920x1080` | Program Desk moments | Contextual background | Use sparingly; not behind tables |
| `stadium-default` | `1920x1080` | Program/stadium/game preview | Venue fallback | Wide, readable, not over-dark |
| `facility-default` | `1280x720` | Facilities/recruiting | Facility visual | Weight room, locker room, indoor facility variants |

### Recruiting

| Asset | Size | Screen | Purpose | Notes |
| --- | ---: | --- | --- | --- |
| `recruit-placeholder-male` | `1024x1024` | Recruit board/profile | Missing recruit portrait | Neutral generated portrait; no real person likeness |
| `recruit-visit-campus` | `1280x720` | Visit screen/inbox | Official visit story art | Campus/stadium tour visual |
| `recruit-commitment` | `1280x720` | Inbox/news | Commitment story image | Table/hat/stadium scene, no real logos |
| `signing-day-default` | `1280x720` | Signing day | Event backdrop | Desk, papers, broadcast vibe |

### Roster And Player Profile

| Asset | Size | Screen | Purpose | Notes |
| --- | ---: | --- | --- | --- |
| `player-placeholder` | `1024x1024` | Roster/profile | Missing player portrait | Jersey-neutral, crop-safe |
| `position-room-qb` | `1280x720` | Room focus | QB room contextual art | Optional after first pass |
| `position-room-line` | `1280x720` | Room focus | Line room contextual art | Optional after first pass |
| `training-field-default` | `1280x720` | Development/training | Training context image | Low-contrast, table-safe crop |
| `injury-rehab-default` | `1280x720` | Medical/injury news | Injury context | No gore; training-room scene |

### Staff

| Asset | Size | Screen | Purpose | Notes |
| --- | ---: | --- | --- | --- |
| `coach-placeholder` | `1024x1024` | Staff profile | Missing coach portrait | Age/style variants later |
| `coach-office-default` | `1280x720` | Staff/carousel | Staff context | Office/film room |
| `press-room-default` | `1280x720` | Media/staff news | Press conference context | Original school backdrop |

### Game Week And Schedule

| Asset | Size | Screen | Purpose | Notes |
| --- | ---: | --- | --- | --- |
| `game-preview-default` | `1280x720` | Schedule/game preview | Matchup story art | Stadium field, neutral teams |
| `rivalry-week-default` | `1920x640` | Rivalry page/game week | Rivalry banner | Crowd, trophy, split colors |
| `scoreboard-default` | `1280x720` | Results/postgame | Result visual | Can be computed later |
| `weather-night-rain` | `1280x720` | Game preview | Weather context | Optional dynamic image preset |

### Media, History, Scrapbook

| Asset | Size | Screen | Purpose | Notes |
| --- | ---: | --- | --- | --- |
| `news-default` | `1280x720` | Inbox/news | Generic story fallback | Use for low-importance stories |
| `record-breaking-default` | `1280x720` | News/history | Major stat story | Player silhouette/stadium board |
| `award-trophy-default` | `1024x1024` | Awards/history | Award visual | Original trophy design |
| `scrapbook-page-bg` | `1920x1080` | Scrapbook only | Nostalgic layer | Do not use across base app |
| `newspaper-clipping-bg` | `1280x720` | Media clip | Optional texture | Use lightly, not as every panel |

## Later Dynamic/Computed Assets

These should be generated by systems after the domain spine exists:

- player portrait per generated player identity
- coach portrait per staff identity
- news image per major event
- game moment image for big plays
- recruit commitment image
- draft night image
- stadium project image
- uniform preview
- rivalry-specific banner
- award/scrapbook image

The dynamic image data models already exist in `ai-pack\CFB_FM_DYNAMIC_IMAGE_GENERATION_PACK`.

## Screen-By-Screen Graphics Policy

| Screen | Needs custom art? | Primary graphics |
| --- | --- | --- |
| Program Desk | Yes, light | program header, stadium thumbnail, recent news thumbnails |
| Roster | Minimal | player portraits only |
| Player Profile | Yes | player portrait, training/news thumbnails |
| Recruiting Board | Minimal | recruit portraits, visit/commit thumbnails |
| Recruit Profile | Yes | recruit portrait, campus visit/commitment image |
| Calendar/Schedule | Minimal | game preview thumbnails only |
| Game Preview | Yes | stadium/game/rivalry banner |
| Postgame | Yes | result/news/game moment image |
| Staff | Yes | coach portraits, office/press thumbnails |
| Transfer Portal | Minimal | player portraits, portal status icons |
| NIL | Minimal | sponsor/market generic tile later |
| History/Scrapbook | Yes | scrapbook/trophy/news images |
| Settings/Save | No | app background only |

## Prompt Brief Template

Use this template when creating new menu art:

```text
Original college football management simulation UI asset.
Purpose: [screen/use].
Scene: [specific visual].
Composition: [wide banner / square portrait / 16:9 thumbnail].
Style: professional sports-management game, realistic but slightly editorial, restrained contrast, dark UI compatible, no real logos, no readable text, no copyrighted marks.
Palette: dark green-black base, brass/warm accent, team color accents only if supplied.
Crop safety: important subject centered, safe margins for UI overlays.
Output: [width]x[height].
```

## Recommended Immediate Work

1. Curate 10-15 of the best existing AI Game Screens as style references only.
2. Generate the first must-have library: main menu background, default program header, default stadium, player placeholder, recruit placeholder, coach placeholder, news default, game preview default, commitment image, award trophy, press room, training field.
3. Build the UI so those assets are optional and replaceable.
4. Add dynamic image generation only after the domain event system can say what happened.

