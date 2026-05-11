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
