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
