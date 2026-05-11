<!-- FILE: 00_START_HERE_DYNAMIC_IMAGE_GENERATION_PACK.md -->

# CFB-FM Dynamic Image Generation Pack — Start Here

## Purpose

This pack defines how CFB-FM should generate dynamic images for news stories, game moments, player stories, recruiting commitments, Program Scrapbook entries, and media clippings.

Example:

```text
News headline:
McClain’s Fourth-Quarter Throw Sends Oklahoma Past Texas

Generated image:
A grounded, fictional sports-media image of that specific QB, in that specific game, at that venue, in that weather, wearing the correct uniform colors.
```

## Core Rule

```text
Simulation creates facts.
Image prompt builder describes those facts.
Image model renders the scene.
Generated image is an optional asset.
```

The image model must never invent:

- injuries
- NIL amounts
- commitments
- scores
- weather
- player identity
- game location
- uniforms
- stats
- violations
- real logos or real brands

## Correct Pipeline

```text
News/Event happens
→ collect grounded game facts
→ build NewsImageContext
→ build ImageGenerationPayload
→ validate prompt
→ queue image job
→ local image service generates image
→ save file
→ save asset metadata
→ display in News / Program Desk / Scrapbook / Player Profile
```

## Files Included

### Specs

- `74_DYNAMIC_IMAGE_GENERATION_SYSTEM_SPEC.md`
- `75_IMAGE_GENERATION_DATA_MODELS.md`
- `76_PROMPT_BUILDER_AND_CONTEXT_PIPELINE.md`
- `77_PROMPT_VALIDATION_SAFETY_AND_CONSISTENCY.md`
- `78_LOCAL_IMAGE_SERVICE_AND_COMFYUI_PIPELINE.md`
- `79_UI_INTEGRATION_EVENT_RULES_AND_SCRAPBOOK_USAGE.md`
- `80_IMPLEMENTATION_PACKETS_AND_READY_PROMPTS.md`

### TypeScript Code Skeleton

- `src/domain/assets/generatedAsset.ts`
- `src/domain/assets/visualIdentity.ts`
- `src/domain/assets/newsImage.ts`
- `src/services/assets/newsImagePromptBuilder.ts`
- `src/services/assets/imagePromptValidator.ts`
- `src/services/assets/AssetGenerationService.ts`
- `src/services/news/buildNewsImageContext.ts`
- `src/services/news/generateNewsImage.ts`
- `src/ui/news/NewsImageCard.tsx`

### Local Image Service

- `local-ai-services/image_service/main.py`
- `local-ai-services/image_service/providers/comfyui_provider.py`
- `local-ai-services/image_service/requirements.txt`

### Data / SQL

- `sql/generated_assets.sql`
- `game_data/image_style_presets.json`

## Build Order

```text
1. Domain models
2. Prompt builder
3. Prompt validator
4. Mock asset service
5. Generated asset repository
6. News image UI component
7. Local FastAPI image service
8. ComfyUI adapter
9. Player visual identity / portrait references
10. Auto-generation for Tier 3–4 moments
```

## MVP Goal

The MVP does **not** need real image generation.

The MVP should:

```text
build grounded prompts
validate prompts
queue mock jobs
save asset metadata
show placeholders / failed / ready states
```

Then plug in ComfyUI later.

## Non-Negotiables

- Game works if image service is offline.
- Images generate asynchronously.
- Continue is never blocked by image generation.
- Prompt is grounded in game facts.
- Real logos/trademarks are avoided unless private mode explicitly allows them.
- Player consistency uses visual identity + portrait reference where available.


<!-- FILE: 74_DYNAMIC_IMAGE_GENERATION_SYSTEM_SPEC.md -->

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


<!-- FILE: 75_IMAGE_GENERATION_DATA_MODELS.md -->

# 75 — Image Generation Data Models

## Purpose

This document defines the TypeScript data models for dynamic generated images.

## GeneratedAsset

```ts
export type GeneratedAssetType =
  | "player_portrait"
  | "coach_portrait"
  | "news_image"
  | "scrapbook_image"
  | "game_moment_image"
  | "stadium_image"
  | "uniform_preview"
  | "recruit_commitment_image"
  | "draft_night_image";

export type GeneratedAssetStatus =
  | "queued"
  | "generating"
  | "ready"
  | "failed"
  | "fallback";

export type GeneratedAsset = {
  id: string;
  assetType: GeneratedAssetType;
  entityRefs: EntityRef[];
  sourceEventId?: string;
  sourceNewsId?: string;
  sourceGameId?: string;

  filePath?: string;
  thumbnailPath?: string;

  prompt: string;
  negativePrompt?: string;
  seed: number;
  provider: "comfyui" | "local_sd" | "cloud" | "mock";

  status: GeneratedAssetStatus;
  locked: boolean;

  createdAt: string;
  updatedAt: string;

  metadata: Record<string, unknown>;
};
```

## EntityRef

```ts
export type EntityRef = {
  type:
    | "player"
    | "team"
    | "school"
    | "game"
    | "stadium"
    | "news"
    | "scrapbook"
    | "coach"
    | "prospect";
  id: string;
  label?: string;
};
```

## PlayerVisualIdentity

```ts
export type PlayerVisualIdentity = {
  playerId: string;
  visualSeed: number;
  portraitAssetId?: string;

  descriptors: {
    ageBand: string;
    build: string;
    skinToneDescriptor?: string;
    hair?: string;
    facialHair?: string;
    faceShape?: string;
    expressionDefault?: string;
  };

  locked: boolean;
};
```

## TeamVisualIdentity

```ts
export type TeamVisualIdentity = {
  teamId: string;
  schoolId: string;
  primaryColor: string;
  secondaryColor: string;
  helmetDescription: string;
  homeUniformDescription: string;
  awayUniformDescription: string;
  alternateUniformDescriptions: string[];
  logoAssetId?: string;
  allowRealLogoPrivateModeOnly: boolean;
};
```

## VenueVisualIdentity

```ts
export type VenueVisualIdentity = {
  stadiumId: string;
  name: string;
  city: string;
  state: string;
  stadiumType:
    | "college_bowl"
    | "campus_stadium"
    | "dome"
    | "neutral_site"
    | "small_college";
  capacityBand: string;
  turfDescription: string;
  architectureDescription: string;
  crowdDescription: string;
};
```

## NewsImageContext

```ts
export type NewsImageEventType =
  | "game_winning_touchdown"
  | "record_breaking_performance"
  | "rivalry_win"
  | "injury_return"
  | "top_recruit_commitment"
  | "signing_day"
  | "coach_hired"
  | "coach_fired"
  | "draft_selection"
  | "award_win"
  | "stadium_project"
  | "transfer_commitment";

export type WeatherVisualContext = {
  condition:
    | "clear"
    | "cloudy"
    | "light_rain"
    | "heavy_rain"
    | "snow"
    | "windy"
    | "hot"
    | "cold"
    | "night";
  temperatureF?: number;
  windMph?: number;
};

export type UniformVisualContext = {
  helmet: string;
  jersey: string;
  pants: string;
  accentColors: string[];
  number?: string;
};

export type NewsImageContext = {
  eventId: string;
  newsId: string;
  eventType: NewsImageEventType;
  importanceTier: 0 | 1 | 2 | 3 | 4;

  headline: string;
  summary: string;

  primaryPlayerId?: string;
  primaryTeamId: string;
  opponentTeamId?: string;
  gameId?: string;
  venueId?: string;

  period?: number;
  clock?: string;
  scoreContext?: string;

  weather?: WeatherVisualContext;
  uniform?: UniformVisualContext;

  allowedFacts: string[];
  forbiddenClaims: string[];
};
```

## ImagePromptPayload

```ts
export type ImagePromptPayload = {
  jobId: string;
  assetType: "news_image" | "scrapbook_image" | "game_moment_image";
  prompt: string;
  negativePrompt: string;
  seed: number;
  width: number;
  height: number;

  sourceEventId: string;
  sourceNewsId?: string;

  entityRefs: EntityRef[];

  referenceImagePath?: string;

  metadata: Record<string, unknown>;
};
```

## Image Style Preset

```ts
export type ImageStylePreset = {
  id: string;
  label: string;
  promptSuffix: string;
  negativePromptAdditions: string[];
  width: number;
  height: number;
  autoGenerateMinTier: 0 | 1 | 2 | 3 | 4;
};
```

## Data Ownership

```text
Player visual identity:
  player entity or asset repository

Team visual identity:
  school/team identity system

Venue visual identity:
  stadium/facilities system

Generated asset:
  generated_assets table / asset repository

News image context:
  built from event/news/game state at generation time
```

## Acceptance Criteria

The model layer is acceptable when:

- every generated image has source event/news references
- every generated image stores prompt/seed/provider/status
- player/team/venue visual identities exist
- news context has allowed/forbidden facts
- image prompts can be rebuilt/audited


<!-- FILE: 76_PROMPT_BUILDER_AND_CONTEXT_PIPELINE.md -->

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


<!-- FILE: 77_PROMPT_VALIDATION_SAFETY_AND_CONSISTENCY.md -->

# 77 — Prompt Validation, Safety, and Consistency

## Purpose

The image model should not introduce unsupported facts or unsafe/legally messy content.

Validation is required before the prompt is sent to an image provider.

## Validation Goals

Reject prompts that include unsupported:

- injuries
- suspensions
- arrests
- violations
- NIL amounts
- commitments
- firings
- hiring
- real brands
- real media brands
- real-person likeness claims
- logos/trademarks, unless private mode explicitly allows

## Prompt Validation Result

```ts
export type ImagePromptValidationResult = {
  passed: boolean;
  errors: string[];
};
```

## Forbidden Pattern Examples

```ts
const forbiddenPatterns = [
  { pattern: /\barrest(ed)?\b/, label: "arrest" },
  { pattern: /\bsuspended\b/, label: "suspension" },
  { pattern: /\binjured\b|\binjury\b/, label: "injury" },
  { pattern: /\$[0-9]/, label: "dollar amount" },
  { pattern: /\bnike\b|\badidas\b|\bunder armour\b/i, label: "real brand" },
  { pattern: /\bespn\b|\bfox sports\b|\bcbs\b/i, label: "real media brand" }
];
```

## Allowed Facts Override

If the game event includes an injury, then injury language may be allowed.

Example:

```text
allowedFacts includes:
"player returned from confirmed hamstring injury"
```

Then prompt may include injury return context.

If not, reject.

## Private Real-School Mode

If private mode allows real logos/uniforms, still keep it configurable.

```ts
type ImageGenerationPolicy = {
  allowRealLogos: boolean;
  allowRealUniformMarks: boolean;
  allowRealStadiumNames: boolean;
  allowRealPlayerLikeness: false;
};
```

Even in private mode, avoid real person likeness unless user supplies their own image/reference knowingly.

## Player Consistency Rules

The image can depict a fictional player if:

- player exists in GameWorld
- player visual identity exists
- prompt uses stable descriptors
- prompt uses reference image if available

Do not invent:

- different jersey number
- different team
- unsupported injury
- unsupported celebration context

## Weather Consistency Rules

Weather must come from game context.

If weather unknown:

```text
clear football weather
```

Do not invent snow/rain.

## Venue Consistency Rules

Venue must come from game/stadium context.

If venue unknown:

```text
packed college football stadium
```

Do not invent specific stadium unless known.

## Validation Tests

Required:

- prompt with unsupported injury rejected
- prompt with unsupported dollar amount rejected
- prompt with real brand rejected
- prompt with allowed injury passes
- prompt with known venue passes
- prompt with unknown venue uses generic fallback
- prompt with real-person likeness request rejected
- private logo policy can allow real logos only if explicitly enabled

## Acceptance Criteria

Prompt validation is acceptable when:

- unsafe/unsupported claims are blocked
- errors are logged
- fallback asset can be created
- validation happens before queueing
- policy supports private/fictional modes


<!-- FILE: 78_LOCAL_IMAGE_SERVICE_AND_COMFYUI_PIPELINE.md -->

# 78 — Local Image Service and ComfyUI Pipeline

## Purpose

This document defines the local image generation service.

The game should not call ComfyUI directly from UI code.

Use:

```text
Game App
→ AssetGenerationService client
→ Local FastAPI image service
→ provider adapter
→ generated image file
→ asset metadata
```

## Why A Wrapper Service

A wrapper service gives:

- provider switching
- job queue
- status polling
- prompt logging
- output path control
- FFmpeg/Pillow postprocessing
- thumbnail generation
- safe fallbacks
- mocked provider for tests

## Service Endpoints

## Health

```http
GET /health
```

## Generate Image

```http
POST /image/generate
```

## Job Status

```http
GET /image/jobs/{jobId}
```

## Cancel Job

```http
POST /image/jobs/{jobId}/cancel
```

## Local Service Providers

Start with:

```text
mock
```

Then add:

```text
comfyui
```

Future:

```text
local_sd
cloud
```

## FastAPI Service MVP

The MVP service can:

- accept payload
- write prompt JSON
- return a mock placeholder
- save job status

This proves game integration before real image generation.

## ComfyUI Adapter

The adapter should:

- load workflow JSON template
- inject prompt
- inject negative prompt
- inject seed
- inject width/height
- inject reference image if workflow supports it
- call `/prompt`
- poll `/history/{prompt_id}`
- copy output image to game asset folder
- return file path

## Workflow Template

Each ComfyUI workflow has node IDs. Do not hardcode blindly.

Use config:

```yaml
comfyui:
  base_url: "http://127.0.0.1:8188"
  workflow_template: "workflows/news_image_sdxl.json"
  nodes:
    positive_prompt: "6"
    negative_prompt: "7"
    seed: "3"
    width_height: "5"
    reference_image: "20"
```

## Output Folders

```text
assets/generated/news_image/
assets/generated/scrapbook_image/
assets/generated/game_moment_image/
assets/generated/player_portrait/
assets/generated/thumbnails/
```

## Thumbnails

Generate thumbnails with Pillow or image library:

```text
1280x720 full
400x225 thumbnail
```

## Job Status

```text
queued
generating
ready
failed
fallback
```

## Failure Behavior

If generation fails:

- return failed asset status
- keep transcript/news visible
- show Try Again
- log error
- do not block Continue

## Acceptance Criteria

Local image service is acceptable when:

- mock provider works
- game can queue job
- job status can be polled
- output file path is returned
- ComfyUI adapter can be configured
- failure is safe


<!-- FILE: 79_UI_INTEGRATION_EVENT_RULES_AND_SCRAPBOOK_USAGE.md -->

# 79 — UI Integration, Event Rules, and Scrapbook Usage

## Purpose

This document defines where generated images appear and when they generate.

## UI Locations

## Program Desk

Show image thumbnails for Tier 3–4 moments.

Tier 2:

```text
show Generate Image button
```

## Media Clippings

Media clipping cards can display thumbnail if available.

## Postgame Report

Show key generated moment image if game had Tier 3–4 event.

## Program Scrapbook

Tier 4 auto-filed entries should include generated image if available.

If image is pending:

```text
show placeholder
```

## Player Profile

Player story timeline can show linked moment images.

## Recruit Profile

Commitment/signing story can show generated commitment/campus image.

## Game Recap

Show generated images for:

- key play
- record performance
- rivalry win
- championship moment

## Display States

```text
none
queued
generating
ready
failed
fallback
locked
```

## NewsImageCard Component States

## No Asset

```text
No image generated yet
[Generate Image]
```

## Queued / Generating

```text
Generating image...
```

## Ready

Show image.

Actions:

```text
Regenerate
Lock
Replace
Hide
```

## Failed

```text
Image unavailable
[Try Again]
```

## Auto-Generation Rules

```ts
function shouldAutoGenerateImage(event: NarrativeEvent, settings: UserImageSettings): boolean {
  if (!settings.aiImagesEnabled) return false;
  if (event.importanceTier >= 4) return true;
  if (event.importanceTier >= 3 && settings.autoGenerateTier3) return true;
  return false;
}
```

## User Settings

```ts
type UserImageSettings = {
  aiImagesEnabled: boolean;
  autoGenerateTier3: boolean;
  autoGenerateTier4: boolean;
  preferredStylePresetId: string;
  allowRealLogosPrivateModeOnly: boolean;
  hideGeneratedImages: boolean;
};
```

## Event Integration

When narrative event is created:

```text
if shouldAutoGenerateImage
  build image context
  queue image job
  attach asset placeholder to event/news/scrapbook
```

## Scrapbook Integration

Tier 4:

```text
auto-create ScrapbookEntry
queue image
attach image asset id when ready
```

Tier 3:

```text
prompt user to file
image optional
```

## Regenerate Flow

```text
user clicks Regenerate
if existing asset locked, create new variant
if unlocked, replace or create variant based on setting
use same source facts
new seed
save metadata
```

## Manual Replace

User can upload/select a local image.

Store:

```text
provider = "manual"
locked = true
```

## Acceptance Criteria

UI integration is acceptable when:

- image card handles all statuses
- images attach to news/scrapbook entries
- Tier 4 auto-generates if enabled
- user can regenerate/lock/hide
- image service failure does not break UI


<!-- FILE: 80_IMPLEMENTATION_PACKETS_AND_READY_PROMPTS.md -->

# 80 — Implementation Packets and Ready Prompts

## IMG-1 — Domain Models

Deliver:

- GeneratedAsset
- PlayerVisualIdentity
- TeamVisualIdentity
- VenueVisualIdentity
- NewsImageContext
- ImagePromptPayload
- ImageStylePreset

Acceptance:

- types compile
- status transitions valid
- visual identity can be attached to player/team/venue

## IMG-2 — Prompt Builder

Deliver:

- buildNewsImagePrompt
- stableSeed helper
- event type descriptions
- weather descriptions
- negative prompt builder
- tests

Acceptance:

- prompt includes player/team/venue/weather
- same input gives same seed
- Tier 4 returns scrapbook asset type

## IMG-3 — Prompt Validator

Deliver:

- validateImagePrompt
- forbidden pattern rules
- private mode policy
- tests

Acceptance:

- unsupported injury rejected
- unsupported dollar amount rejected
- real brand rejected
- allowed facts can permit specific terms

## IMG-4 — Mock Asset Service

Deliver:

- AssetGenerationService interface
- MockImageAssetService
- GeneratedAssetRepository shell
- tests

Acceptance:

- queueImage returns fallback/queued asset
- game can save asset metadata
- service failure is safe

## IMG-5 — News Image Context Builder

Deliver:

- buildNewsImageContextFromNews
- handlers for touchdown, recruit commitment, draft, award, stadium project
- tests

Acceptance:

- context uses real event/world facts
- no missing entity silently ignored
- allowed/forbidden facts populated

## IMG-6 — NewsImageCard UI

Deliver:

- NewsImageCard
- queued/generating/ready/failed states
- Generate / Regenerate / Lock actions shell
- tests

Acceptance:

- transcript/news displays without image
- button queues job
- failed state safe

## IMG-7 — Local FastAPI Image Service

Deliver:

- local-ai-services/image_service/main.py
- mock provider
- /health
- /image/generate
- /image/jobs/{jobId}
- requirements.txt

Acceptance:

- service starts
- mock job returns output placeholder
- job status works

## IMG-8 — ComfyUI Provider Adapter

Deliver:

- providers/comfyui_provider.py
- config fields
- workflow template injection
- status polling shell

Acceptance:

- mocked ComfyUI call works in tests
- provider can inject prompt/negative/seed/size

## IMG-9 — Player Consistency

Deliver:

- player portrait reference support
- visual identity lifecycle
- regenerate/lock portrait flow
- prompt uses referenceImagePath if available

Acceptance:

- same player uses stable visualSeed
- news image can reference portrait asset

## Ready Prompt: IMG-1 Through IMG-4

```text
Implement IMG-1 through IMG-4 for the CFB-FM dynamic image generation pipeline.

Goal:
Create the domain models, prompt builder, prompt validator, and mock asset service for grounded dynamic news/scrapbook images.

Core rule:
Simulation creates facts. Image model renders only those facts. Game must work without image generation.

Deliver:
1. GeneratedAsset type
2. PlayerVisualIdentity type
3. TeamVisualIdentity type
4. VenueVisualIdentity type
5. NewsImageContext type
6. ImagePromptPayload type
7. buildNewsImagePrompt
8. validateImagePrompt
9. AssetGenerationService interface
10. MockImageAssetService
11. tests

Hard rules:
- no real logos/trademarks by default
- no unsupported injuries/NIL amounts/commits
- deterministic seed from event/news/player/team/venue
- Tier 4 event returns scrapbook_image type
- service failure does not block gameplay

Acceptance:
- prompt builder test for game-winning touchdown
- same input same seed
- unsupported injury rejected
- unsupported dollar amount rejected
- mock service queues/saves fallback asset
```

## Ready Prompt: IMG-7 ComfyUI Service

```text
Implement IMG-7 — Local FastAPI Image Service.

Goal:
Create a local image generation service wrapper for dynamic generated assets.

Deliver:
- local-ai-services/image_service/main.py
- requirements.txt
- mock provider
- /health endpoint
- /image/generate endpoint
- /image/jobs/{jobId} endpoint
- output folders under assets/generated
- prompt JSON logging

Hard rules:
- mock provider first
- do not require ComfyUI for tests
- safe failure behavior
- service returns GeneratedAsset-compatible JSON

Acceptance:
- service starts
- POST /image/generate creates mock output
- GET /image/jobs/{jobId} returns status
- failed provider returns failed status, not crash
```


<!-- FILE: game_data/image_style_presets.json -->

{
  "presets": [
    {
      "id": "sports_media_photo",
      "label": "Sports Media Photo",
      "promptSuffix": "professional college football photography, realistic action shot, editorial sports magazine quality, dramatic but believable",
      "negativePromptAdditions": [
        "cartoon",
        "anime",
        "low quality",
        "wrong sport"
      ],
      "width": 1280,
      "height": 720,
      "autoGenerateMinTier": 3
    },
    {
      "id": "scrapbook_archive",
      "label": "Program Scrapbook Archive",
      "promptSuffix": "archival sports photograph, nostalgic program-history feel, dramatic but grounded, suitable for a college football scrapbook",
      "negativePromptAdditions": [
        "fake newspaper text",
        "readable brand text",
        "watermark"
      ],
      "width": 1280,
      "height": 720,
      "autoGenerateMinTier": 4
    },
    {
      "id": "media_guide_portrait",
      "label": "Media Guide Portrait",
      "promptSuffix": "clean college football media guide portrait, neutral background, professional team photo style",
      "negativePromptAdditions": [
        "action pose",
        "crowd",
        "readable text",
        "real logo"
      ],
      "width": 768,
      "height": 1024,
      "autoGenerateMinTier": 4
    },
    {
      "id": "newspaper_clipping_photo",
      "label": "Newspaper Clipping Photo",
      "promptSuffix": "local newspaper sports photograph style, slightly grainy, grounded, realistic, no readable newspaper text",
      "negativePromptAdditions": [
        "readable text",
        "real newspaper logo",
        "watermark"
      ],
      "width": 1280,
      "height": 720,
      "autoGenerateMinTier": 3
    },
    {
      "id": "recruit_commitment_card",
      "label": "Recruit Commitment Image",
      "promptSuffix": "recruit commitment scene, campus backdrop, respectful sports recruiting photo style, no readable text, no real logos",
      "negativePromptAdditions": [
        "real logo",
        "readable text",
        "brand marks"
      ],
      "width": 1280,
      "height": 720,
      "autoGenerateMinTier": 3
    }
  ]
}


<!-- FILE: local-ai-services/image_service/main.py -->

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Literal
from pathlib import Path
from datetime import datetime
import json
import uuid

app = FastAPI(title="CFB-FM Local Image Service")

ASSET_ROOT = Path("../../assets/generated").resolve()
ASSET_ROOT.mkdir(parents=True, exist_ok=True)

JOBS: Dict[str, dict] = {}


class EntityRef(BaseModel):
    type: str
    id: str
    label: Optional[str] = None


class ImageGenerationPayload(BaseModel):
    jobId: str
    assetType: Literal["news_image", "scrapbook_image", "game_moment_image"]
    prompt: str
    negativePrompt: Optional[str] = None
    seed: int
    width: int = 1280
    height: int = 720
    sourceEventId: str
    sourceNewsId: Optional[str] = None
    entityRefs: List[EntityRef] = []
    referenceImagePath: Optional[str] = None
    metadata: Dict[str, object] = {}


class GeneratedAsset(BaseModel):
    id: str
    assetType: str
    entityRefs: List[EntityRef]
    sourceEventId: Optional[str] = None
    sourceNewsId: Optional[str] = None
    filePath: Optional[str] = None
    thumbnailPath: Optional[str] = None
    prompt: str
    negativePrompt: Optional[str] = None
    seed: int
    provider: str
    status: Literal["queued", "generating", "ready", "failed", "fallback"]
    locked: bool = False
    createdAt: str
    updatedAt: str
    metadata: Dict[str, object] = {}


@app.get("/health")
def health():
    return {
        "ok": True,
        "providers": {
            "mock": "available",
            "comfyui": "configure_in_provider"
        }
    }


@app.post("/image/generate", response_model=GeneratedAsset)
def generate_image(payload: ImageGenerationPayload):
    asset_id = f"asset_{payload.jobId}_{uuid.uuid4().hex[:8]}"

    asset = GeneratedAsset(
        id=asset_id,
        assetType=payload.assetType,
        entityRefs=payload.entityRefs,
        sourceEventId=payload.sourceEventId,
        sourceNewsId=payload.sourceNewsId,
        prompt=payload.prompt,
        negativePrompt=payload.negativePrompt,
        seed=payload.seed,
        provider="mock",
        status="queued",
        locked=False,
        createdAt=datetime.utcnow().isoformat(),
        updatedAt=datetime.utcnow().isoformat(),
        metadata=payload.metadata,
    )

    JOBS[payload.jobId] = {
        "payload": payload.model_dump(),
        "asset": asset.model_dump(),
        "status": "queued"
    }

    try:
        output_path = run_mock_or_real_provider(payload, asset_id)
        asset.filePath = str(output_path)
        asset.status = "ready"
        asset.updatedAt = datetime.utcnow().isoformat()

        JOBS[payload.jobId]["asset"] = asset.model_dump()
        JOBS[payload.jobId]["status"] = "ready"

        return asset
    except Exception as exc:
        asset.status = "failed"
        asset.updatedAt = datetime.utcnow().isoformat()
        asset.metadata["error"] = str(exc)

        JOBS[payload.jobId]["asset"] = asset.model_dump()
        JOBS[payload.jobId]["status"] = "failed"

        return asset


@app.get("/image/jobs/{job_id}", response_model=GeneratedAsset)
def job_status(job_id: str):
    job = JOBS.get(job_id)

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return GeneratedAsset(**job["asset"])


def run_mock_or_real_provider(payload: ImageGenerationPayload, asset_id: str) -> Path:
    folder = ASSET_ROOT / payload.assetType
    folder.mkdir(parents=True, exist_ok=True)

    prompt_path = folder / f"{asset_id}_prompt.json"
    prompt_path.write_text(
        json.dumps(payload.model_dump(), indent=2),
        encoding="utf-8"
    )

    placeholder_path = folder / f"{asset_id}.txt"
    placeholder_path.write_text(
        f"MOCK IMAGE PLACEHOLDER\n\nPROMPT:\n{payload.prompt}\n",
        encoding="utf-8"
    )

    return placeholder_path


<!-- FILE: local-ai-services/image_service/providers/comfyui_provider.py -->

from pathlib import Path
import requests
import json
import time


class ComfyUIProvider:
    def __init__(self, base_url: str, workflow_template_path: str, node_config: dict):
        self.base_url = base_url.rstrip("/")
        self.workflow_template_path = Path(workflow_template_path)
        self.node_config = node_config

    def generate(self, payload, output_path: Path) -> Path:
        workflow = json.loads(self.workflow_template_path.read_text())

        nodes = self.node_config

        workflow[nodes["positive_prompt"]]["inputs"]["text"] = payload.prompt

        if nodes.get("negative_prompt") and payload.negativePrompt:
            workflow[nodes["negative_prompt"]]["inputs"]["text"] = payload.negativePrompt

        if nodes.get("seed"):
            workflow[nodes["seed"]]["inputs"]["seed"] = payload.seed

        if nodes.get("width_height"):
            workflow[nodes["width_height"]]["inputs"]["width"] = payload.width
            workflow[nodes["width_height"]]["inputs"]["height"] = payload.height

        if nodes.get("reference_image") and payload.referenceImagePath:
            workflow[nodes["reference_image"]]["inputs"]["image"] = payload.referenceImagePath

        response = requests.post(
            f"{self.base_url}/prompt",
            json={"prompt": workflow},
            timeout=30
        )
        response.raise_for_status()

        prompt_id = response.json()["prompt_id"]

        for _ in range(300):
            history = requests.get(
                f"{self.base_url}/history/{prompt_id}",
                timeout=10
            ).json()

            if prompt_id in history:
                return self._copy_latest_output_to(output_path)

            time.sleep(1)

        raise TimeoutError("ComfyUI generation timed out")

    def _copy_latest_output_to(self, output_path: Path) -> Path:
        # TODO:
        # Replace this with real ComfyUI output lookup based on your workflow output node.
        raise NotImplementedError("Implement ComfyUI output extraction for your workflow.")


<!-- FILE: local-ai-services/image_service/requirements.txt -->

fastapi
uvicorn
pydantic
requests
pillow


<!-- FILE: sql/generated_assets.sql -->

CREATE TABLE generated_assets (
  id TEXT PRIMARY KEY,
  asset_type TEXT NOT NULL,
  source_event_id TEXT,
  source_news_id TEXT,
  source_game_id TEXT,
  file_path TEXT,
  thumbnail_path TEXT,
  prompt TEXT NOT NULL,
  negative_prompt TEXT,
  seed INTEGER NOT NULL,
  provider TEXT NOT NULL,
  status TEXT NOT NULL,
  locked INTEGER NOT NULL DEFAULT 0,
  metadata_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE generated_asset_entities (
  asset_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  label TEXT,
  PRIMARY KEY (asset_id, entity_type, entity_id)
);

CREATE INDEX idx_generated_assets_news
ON generated_assets(source_news_id);

CREATE INDEX idx_generated_assets_event
ON generated_assets(source_event_id);


<!-- FILE: src/domain/assets/generatedAsset.ts -->

export type GeneratedAssetType =
  | "player_portrait"
  | "coach_portrait"
  | "news_image"
  | "scrapbook_image"
  | "game_moment_image"
  | "stadium_image"
  | "uniform_preview"
  | "recruit_commitment_image"
  | "draft_night_image";

export type GeneratedAssetStatus =
  | "queued"
  | "generating"
  | "ready"
  | "failed"
  | "fallback";

export type EntityRef = {
  type:
    | "player"
    | "team"
    | "school"
    | "game"
    | "stadium"
    | "news"
    | "scrapbook"
    | "coach"
    | "prospect";
  id: string;
  label?: string;
};

export type GeneratedAsset = {
  id: string;
  assetType: GeneratedAssetType;
  entityRefs: EntityRef[];
  sourceEventId?: string;
  sourceNewsId?: string;
  sourceGameId?: string;

  filePath?: string;
  thumbnailPath?: string;

  prompt: string;
  negativePrompt?: string;
  seed: number;
  provider: "comfyui" | "local_sd" | "cloud" | "mock" | "manual";

  status: GeneratedAssetStatus;
  locked: boolean;

  createdAt: string;
  updatedAt: string;

  metadata: Record<string, unknown>;
};


<!-- FILE: src/domain/assets/newsImage.ts -->

import type { EntityRef } from "./generatedAsset";

export type NewsImageEventType =
  | "game_winning_touchdown"
  | "record_breaking_performance"
  | "rivalry_win"
  | "injury_return"
  | "top_recruit_commitment"
  | "signing_day"
  | "coach_hired"
  | "coach_fired"
  | "draft_selection"
  | "award_win"
  | "stadium_project"
  | "transfer_commitment";

export type WeatherVisualContext = {
  condition:
    | "clear"
    | "cloudy"
    | "light_rain"
    | "heavy_rain"
    | "snow"
    | "windy"
    | "hot"
    | "cold"
    | "night";
  temperatureF?: number;
  windMph?: number;
};

export type UniformVisualContext = {
  helmet: string;
  jersey: string;
  pants: string;
  accentColors: string[];
  number?: string;
};

export type NewsImageContext = {
  eventId: string;
  newsId: string;
  eventType: NewsImageEventType;
  importanceTier: 0 | 1 | 2 | 3 | 4;

  headline: string;
  summary: string;

  primaryPlayerId?: string;
  primaryTeamId: string;
  opponentTeamId?: string;
  gameId?: string;
  venueId?: string;

  period?: number;
  clock?: string;
  scoreContext?: string;

  weather?: WeatherVisualContext;
  uniform?: UniformVisualContext;

  allowedFacts: string[];
  forbiddenClaims: string[];
};

export type ImagePromptPayload = {
  jobId: string;
  assetType: "news_image" | "scrapbook_image" | "game_moment_image";
  prompt: string;
  negativePrompt: string;
  seed: number;
  width: number;
  height: number;

  sourceEventId: string;
  sourceNewsId?: string;

  entityRefs: EntityRef[];

  referenceImagePath?: string;

  metadata: Record<string, unknown>;
};


<!-- FILE: src/domain/assets/visualIdentity.ts -->

export type PlayerVisualIdentity = {
  playerId: string;
  visualSeed: number;
  portraitAssetId?: string;

  descriptors: {
    ageBand: string;
    build: string;
    skinToneDescriptor?: string;
    hair?: string;
    facialHair?: string;
    faceShape?: string;
    expressionDefault?: string;
  };

  locked: boolean;
};

export type TeamVisualIdentity = {
  teamId: string;
  schoolId: string;
  primaryColor: string;
  secondaryColor: string;
  helmetDescription: string;
  homeUniformDescription: string;
  awayUniformDescription: string;
  alternateUniformDescriptions: string[];
  logoAssetId?: string;
  allowRealLogoPrivateModeOnly: boolean;
};

export type VenueVisualIdentity = {
  stadiumId: string;
  name: string;
  city: string;
  state: string;
  stadiumType: "college_bowl" | "campus_stadium" | "dome" | "neutral_site" | "small_college";
  capacityBand: string;
  turfDescription: string;
  architectureDescription: string;
  crowdDescription: string;
};


<!-- FILE: src/services/assets/AssetGenerationService.ts -->

import type { GeneratedAsset } from "../../domain/assets/generatedAsset";
import type { ImagePromptPayload } from "../../domain/assets/newsImage";

export interface AssetGenerationService {
  queueImage(payload: ImagePromptPayload): Promise<GeneratedAsset>;
  getJobStatus(jobId: string): Promise<GeneratedAsset>;
}

export class LocalImageAssetService implements AssetGenerationService {
  constructor(private readonly baseUrl: string) {}

  async queueImage(payload: ImagePromptPayload): Promise<GeneratedAsset> {
    const response = await fetch(`${this.baseUrl}/image/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Image service failed: ${response.status}`);
    }

    return response.json();
  }

  async getJobStatus(jobId: string): Promise<GeneratedAsset> {
    const response = await fetch(`${this.baseUrl}/image/jobs/${jobId}`);

    if (!response.ok) {
      throw new Error(`Image job status failed: ${response.status}`);
    }

    return response.json();
  }
}

export class MockImageAssetService implements AssetGenerationService {
  async queueImage(payload: ImagePromptPayload): Promise<GeneratedAsset> {
    const now = new Date().toISOString();

    return {
      id: `asset_${payload.jobId}`,
      assetType: payload.assetType,
      entityRefs: payload.entityRefs,
      sourceEventId: payload.sourceEventId,
      sourceNewsId: payload.sourceNewsId,
      prompt: payload.prompt,
      negativePrompt: payload.negativePrompt,
      seed: payload.seed,
      provider: "mock",
      status: "fallback",
      locked: false,
      createdAt: now,
      updatedAt: now,
      metadata: payload.metadata
    };
  }

  async getJobStatus(jobId: string): Promise<GeneratedAsset> {
    const now = new Date().toISOString();

    return {
      id: `asset_${jobId}`,
      assetType: "news_image",
      entityRefs: [],
      prompt: "",
      seed: 0,
      provider: "mock",
      status: "fallback",
      locked: false,
      createdAt: now,
      updatedAt: now,
      metadata: {}
    };
  }
}


<!-- FILE: src/services/assets/imagePromptValidator.ts -->

import type { NewsImageContext } from "../../domain/assets/newsImage";

export type ImagePromptValidationResult = {
  passed: boolean;
  errors: string[];
};

export function validateImagePrompt(input: {
  prompt: string;
  context: NewsImageContext;
}): ImagePromptValidationResult {
  const errors: string[] = [];
  const prompt = input.prompt.toLowerCase();

  const forbiddenPatterns = [
    { pattern: /\barrest(ed)?\b/, label: "arrest" },
    { pattern: /\bsuspended\b/, label: "suspension" },
    { pattern: /\binjured\b|\binjury\b/, label: "injury" },
    { pattern: /\$[0-9]/, label: "dollar amount" },
    { pattern: /\bnike\b|\badidas\b|\bunder armour\b/i, label: "real brand" },
    { pattern: /\bespn\b|\bfox sports\b|\bcbs\b/i, label: "real media brand" }
  ];

  for (const item of forbiddenPatterns) {
    if (item.pattern.test(prompt)) {
      const explicitlyAllowed = input.context.allowedFacts.some(f =>
        f.toLowerCase().includes(item.label)
      );

      if (!explicitlyAllowed) {
        errors.push(`Prompt contains unsupported ${item.label} reference.`);
      }
    }
  }

  for (const forbidden of input.context.forbiddenClaims) {
    if (prompt.includes(forbidden.toLowerCase())) {
      errors.push(`Prompt includes forbidden claim: ${forbidden}`);
    }
  }

  return {
    passed: errors.length === 0,
    errors
  };
}


<!-- FILE: src/services/assets/newsImagePromptBuilder.ts -->

import crypto from "crypto";
import type { EntityRef } from "../../domain/assets/generatedAsset";
import type { PlayerVisualIdentity, TeamVisualIdentity, VenueVisualIdentity } from "../../domain/assets/visualIdentity";
import type { ImagePromptPayload, NewsImageContext, NewsImageEventType, WeatherVisualContext } from "../../domain/assets/newsImage";

export function buildNewsImagePrompt(input: {
  context: NewsImageContext;
  player?: {
    id: string;
    displayName: string;
    jerseyNumber?: string;
    position: string;
    visualIdentity?: PlayerVisualIdentity;
  };
  team: {
    id: string;
    displayName: string;
    visual: TeamVisualIdentity;
  };
  opponent?: {
    id: string;
    displayName: string;
    visual: TeamVisualIdentity;
  };
  venue?: VenueVisualIdentity;
}): ImagePromptPayload {
  const { context, player, team, opponent, venue } = input;

  const playerPhrase = player
    ? `fictional ${player.position} ${player.displayName}${player.jerseyNumber ? `, jersey number ${player.jerseyNumber}` : ""}`
    : `fictional college football player from ${team.displayName}`;

  const uniformPhrase = context.uniform
    ? `${context.uniform.helmet}, ${context.uniform.jersey}, ${context.uniform.pants}`
    : team.visual.homeUniformDescription;

  const venuePhrase = venue
    ? `${venue.name} in ${venue.city}, ${venue.state}, ${venue.architectureDescription}`
    : "a packed college football stadium";

  const weatherPhrase = context.weather ? describeWeather(context.weather) : "clear football weather";
  const eventPhrase = describeEventType(context.eventType, context.scoreContext);

  const prompt = [
    "Cinematic sports media image from a fictional college football management game.",
    `${playerPhrase} during ${eventPhrase}.`,
    `Team uniform: ${uniformPhrase}.`,
    opponent ? `Opponent colors visible in the background: ${opponent.visual.primaryColor} and ${opponent.visual.secondaryColor}.` : "",
    `Location: ${venuePhrase}.`,
    `Weather and atmosphere: ${weatherPhrase}.`,
    context.period && context.clock ? `Game context: period ${context.period}, clock ${context.clock}.` : "",
    "Style: professional college football photography, realistic action shot, editorial sports magazine quality, dramatic but believable.",
    "No real logos, no real trademarks, no readable brand text, no real person likeness."
  ].filter(Boolean).join(" ");

  const negativePrompt = [
    "real logo",
    "real trademark",
    "readable text",
    "watermark",
    "extra fingers",
    "deformed hands",
    "distorted face",
    "wrong sport",
    "soccer",
    "basketball",
    "baseball",
    "cartoon",
    "anime",
    "low quality",
    "blurry",
    "AI artifacts"
  ].join(", ");

  const seed = stableSeed([
    context.eventId,
    context.newsId,
    player?.id ?? "no_player",
    team.id,
    venue?.stadiumId ?? "no_venue",
    context.eventType
  ]);

  const entityRefs: EntityRef[] = [
    { type: "team", id: team.id, label: team.displayName },
    ...(player ? [{ type: "player" as const, id: player.id, label: player.displayName }] : []),
    ...(context.gameId ? [{ type: "game" as const, id: context.gameId }] : []),
    ...(venue ? [{ type: "stadium" as const, id: venue.stadiumId, label: venue.name }] : [])
  ];

  return {
    jobId: `image_job_${context.newsId}`,
    assetType: context.importanceTier >= 4 ? "scrapbook_image" : "news_image",
    prompt,
    negativePrompt,
    seed,
    width: 1280,
    height: 720,
    sourceEventId: context.eventId,
    sourceNewsId: context.newsId,
    entityRefs,
    referenceImagePath: player?.visualIdentity?.portraitAssetId
      ? `/assets/generated/portraits/${player.visualIdentity.portraitAssetId}.png`
      : undefined,
    metadata: {
      headline: context.headline,
      eventType: context.eventType,
      importanceTier: context.importanceTier,
      weather: context.weather,
      uniform: context.uniform
    }
  };
}

function describeWeather(weather: WeatherVisualContext): string {
  switch (weather.condition) {
    case "light_rain":
      return "light rain, wet turf, stadium lights reflecting off the field";
    case "heavy_rain":
      return "heavy rain, soaked uniforms, slick turf, dramatic stadium lighting";
    case "snow":
      return "snow falling, cold breath visible, winter football atmosphere";
    case "windy":
      return "windy conditions, flags moving, unsettled sky";
    case "night":
      return "night game under bright stadium lights";
    case "hot":
      return "hot afternoon, bright sun, heat haze near the field";
    case "cold":
      return "cold football weather, bundled crowd, crisp air";
    case "cloudy":
      return "cloudy sky, muted light, fall football atmosphere";
    default:
      return "clear football weather, packed crowd";
  }
}

function describeEventType(type: NewsImageEventType, scoreContext?: string): string {
  const extra = scoreContext ? `, ${scoreContext}` : "";

  switch (type) {
    case "game_winning_touchdown":
      return `a late game-winning touchdown${extra}`;
    case "record_breaking_performance":
      return `a record-breaking performance${extra}`;
    case "rivalry_win":
      return `a major rivalry win${extra}`;
    case "top_recruit_commitment":
      return "a signing-day commitment scene";
    case "draft_selection":
      return "a draft-night celebration";
    case "award_win":
      return "a major college football award moment";
    default:
      return `an important college football moment${extra}`;
  }
}

export function stableSeed(parts: string[]): number {
  const hash = crypto.createHash("sha256").update(parts.join("|")).digest("hex");
  return parseInt(hash.slice(0, 8), 16);
}


<!-- FILE: src/services/news/buildNewsImageContext.ts -->

import type { NewsImageContext } from "../../domain/assets/newsImage";

// These are placeholder imports. Replace with your actual domain types.
type NewsItem = any;
type GameWorld = any;

export function buildNewsImageContextFromNews(
  news: NewsItem,
  world: GameWorld
): NewsImageContext {
  const event = world.events?.[news.sourceEventId];

  if (!event) {
    throw new Error(`Missing event for news item ${news.id}`);
  }

  switch (event.type) {
    case "game_moment_touchdown": {
      const game = world.games[event.gameId];
      const player = world.players[event.primaryPlayerId];
      const team = world.teams[event.teamId];
      const opponent = world.teams[event.opponentTeamId];

      return {
        eventId: event.id,
        newsId: news.id,
        eventType: "game_winning_touchdown",
        importanceTier: event.importanceTier,
        headline: news.headline,
        summary: news.summary,

        primaryPlayerId: player.id,
        primaryTeamId: team.id,
        opponentTeamId: opponent.id,
        gameId: game.id,
        venueId: game.venueId,

        period: event.payload.period,
        clock: event.payload.clock,
        scoreContext: event.payload.scoreContext,

        weather: {
          condition: game.weather.condition,
          temperatureF: game.weather.temperatureF,
          windMph: game.weather.windMph
        },

        uniform: {
          helmet: team.visual.helmetDescription,
          jersey: game.uniforms[team.id].jersey,
          pants: game.uniforms[team.id].pants,
          accentColors: [
            team.visual.primaryColor,
            team.visual.secondaryColor
          ],
          number: player.jerseyNumber
        },

        allowedFacts: [
          player.displayName,
          team.displayName,
          opponent.displayName,
          game.venueName,
          game.weather.condition,
          String(player.jerseyNumber),
          news.headline
        ],

        forbiddenClaims: [
          "injury",
          "arrest",
          "suspension",
          "NIL amount",
          "brand logo",
          "real broadcaster"
        ]
      };
    }

    case "top_recruit_commitment": {
      const prospect = world.prospects[event.prospectId];
      const team = world.teams[event.teamId];

      return {
        eventId: event.id,
        newsId: news.id,
        eventType: "top_recruit_commitment",
        importanceTier: event.importanceTier,
        headline: news.headline,
        summary: news.summary,
        primaryTeamId: team.id,
        allowedFacts: [
          prospect.displayName,
          team.displayName,
          prospect.position,
          prospect.homeState
        ],
        forbiddenClaims: [
          "NIL amount",
          "injury",
          "arrest",
          "suspension"
        ]
      };
    }

    default:
      return {
        eventId: event.id,
        newsId: news.id,
        eventType: "record_breaking_performance",
        importanceTier: event.importanceTier ?? 1,
        headline: news.headline,
        summary: news.summary,
        primaryTeamId: event.teamId,
        allowedFacts: [news.headline, news.summary],
        forbiddenClaims: [
          "injury",
          "arrest",
          "NIL amount",
          "real logo"
        ]
      };
  }
}


<!-- FILE: src/services/news/generateNewsImage.ts -->

import type { GeneratedAsset } from "../../domain/assets/generatedAsset";
import type { AssetGenerationService } from "../assets/AssetGenerationService";
import { buildNewsImagePrompt } from "../assets/newsImagePromptBuilder";
import { validateImagePrompt } from "../assets/imagePromptValidator";
import { buildNewsImageContextFromNews } from "./buildNewsImageContext";

// Placeholder domain types. Replace with actual types.
type NewsItem = any;
type GameWorld = any;

export interface GeneratedAssetRepository {
  save(asset: GeneratedAsset): Promise<void>;
  findByPromptHash(hash: string): Promise<GeneratedAsset | null>;
  createFallbackAsset(input: {
    sourceNewsId: string;
    sourceEventId: string;
    reason: string;
  }): Promise<GeneratedAsset>;
}

export async function queueGeneratedImageForNews(input: {
  news: NewsItem;
  world: GameWorld;
  assetService: AssetGenerationService;
  assetRepository: GeneratedAssetRepository;
}): Promise<GeneratedAsset | null> {
  const { news, world, assetService, assetRepository } = input;

  if (!news.sourceEventId) return null;

  const context = buildNewsImageContextFromNews(news, world);

  if (context.importanceTier < 2) return null;

  const player = context.primaryPlayerId
    ? getPlayerForImage(context.primaryPlayerId, world)
    : undefined;

  const team = getTeamForImage(context.primaryTeamId, world);
  const opponent = context.opponentTeamId
    ? getTeamForImage(context.opponentTeamId, world)
    : undefined;

  const venue = context.venueId
    ? getVenueForImage(context.venueId, world)
    : undefined;

  const payload = buildNewsImagePrompt({
    context,
    player,
    team,
    opponent,
    venue
  });

  const validation = validateImagePrompt({
    prompt: payload.prompt,
    context
  });

  if (!validation.passed) {
    return assetRepository.createFallbackAsset({
      sourceNewsId: news.id,
      sourceEventId: context.eventId,
      reason: validation.errors.join("; ")
    });
  }

  const queuedAsset = await assetService.queueImage(payload);
  await assetRepository.save(queuedAsset);

  return queuedAsset;
}

function getPlayerForImage(playerId: string, world: GameWorld) {
  const player = world.players[playerId];

  return {
    id: player.id,
    displayName: player.displayName,
    jerseyNumber: player.jerseyNumber,
    position: player.position,
    visualIdentity: player.visualIdentity
  };
}

function getTeamForImage(teamId: string, world: GameWorld) {
  const team = world.teams[teamId];

  return {
    id: team.id,
    displayName: team.displayName,
    visual: team.visual
  };
}

function getVenueForImage(venueId: string, world: GameWorld) {
  return world.venues[venueId];
}


<!-- FILE: src/ui/news/NewsImageCard.tsx -->

import type { GeneratedAsset } from "../../domain/assets/generatedAsset";

// Placeholder NewsItem type. Replace with actual type.
type NewsItem = {
  id: string;
  headline: string;
};

export function NewsImageCard({
  news,
  asset,
  onGenerate
}: {
  news: NewsItem;
  asset?: GeneratedAsset;
  onGenerate: () => void;
}) {
  if (!asset) {
    return (
      <section className="news-image-card empty">
        <div className="news-image-placeholder">
          <span>No image generated yet</span>
          <button onClick={onGenerate}>Generate Image</button>
        </div>
      </section>
    );
  }

  if (asset.status === "queued" || asset.status === "generating") {
    return (
      <section className="news-image-card loading">
        <div className="news-image-placeholder">
          Generating image...
        </div>
      </section>
    );
  }

  if (asset.status === "failed" || asset.status === "fallback") {
    return (
      <section className="news-image-card failed">
        <div className="news-image-placeholder">
          Image unavailable
          <button onClick={onGenerate}>Try Again</button>
        </div>
      </section>
    );
  }

  return (
    <section className="news-image-card">
      <img src={asset.filePath} alt={news.headline} />
      <footer>
        <span>Generated from save event</span>
        <button onClick={onGenerate}>Regenerate</button>
      </footer>
    </section>
  );
}
