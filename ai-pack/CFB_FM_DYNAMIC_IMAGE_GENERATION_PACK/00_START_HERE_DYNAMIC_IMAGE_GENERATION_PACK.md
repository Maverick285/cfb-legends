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
