# LLM and Asset Pipeline Spec

## Purpose

This file defines how storytelling and generated graphics integrate into the game.

## Core Principle

```text
Simulation = truth
LLM = language
Image model = assets
```

The game must remain fully playable if both AI services are offline.

---

# Narrative Service

## Interface

```ts
export interface NarrativeService {
  generateScoutingReport(payload: ScoutingReportPayload): Promise<NarrativeResult>;
  generatePlayerDevelopmentReport(payload: DevelopmentReportPayload): Promise<NarrativeResult>;
  generateMediaBlurb(payload: MediaBlurbPayload): Promise<NarrativeResult>;
  generatePlayByPlayLine(payload: PlayByPlayPayload): Promise<NarrativeResult>;
  generateMeetingDialogue(payload: MeetingPayload): Promise<NarrativeResult>;
}
```

## Implementations

```text
MockNarrativeService
TemplateNarrativeService
LocalLLMService
CachedNarrativeService
```

## Local LLM Endpoint

Use an OpenAI-compatible local endpoint.

Example expected config:

```json
{
  "provider": "local_openai_compatible",
  "baseUrl": "http://localhost:8080/v1",
  "model": "local-model",
  "enabled": false
}
```

## Grounded Payload

Every LLM call must include only structured facts.

Example:

```json
{
  "reportType": "scouting",
  "entityId": "prospect_001",
  "facts": {
    "name": "Darius McClain",
    "position": "QB",
    "visibleTraitLabels": ["Late Developer", "Gym Rat", "Bad Hips"],
    "scoutConfidence": 0.58
  },
  "forbiddenClaims": [
    "injury",
    "commitment",
    "NIL amount",
    "academic violation"
  ],
  "tone": "blunt_staff_report"
}
```

## Validation

The narrative validator should check:

- forbidden keywords/claims
- unsupported injury mention
- unsupported commitment mention
- unsupported money mention
- unsupported violation mention

If validation fails:

- discard LLM output
- use fallback template
- log issue

## Caching

Cache generated text by:

- payload hash
- model
- prompt version
- entity id
- season/week

This prevents repeated AI calls.

---

# Asset Service

## Interface

```ts
export interface AssetService {
  generatePortrait(payload: PortraitPayload): Promise<AssetResult>;
  generateLogo(payload: LogoPayload): Promise<AssetResult>;
  generateUniformPreview(payload: UniformPayload): Promise<AssetResult>;
  generateStadiumConcept(payload: StadiumPayload): Promise<AssetResult>;
}
```

## Implementations

```text
MockAssetService
LocalImageService
QueuedAssetService
```

## Asset Metadata

```ts
type GeneratedAsset = {
  id: string;
  entityId: string;
  assetType: "portrait" | "logo" | "uniform" | "stadium" | "news";
  filePath: string;
  seed: string;
  provider: string;
  promptVersion: string;
  locked: boolean;
  createdAt: string;
};
```

## Storage

```text
assets/generated/portraits
assets/generated/logos
assets/generated/uniforms
assets/generated/stadiums
```

SQLite stores metadata.

## Portrait Flow

```text
Player generated
  ↓
Portrait job queued
  ↓
Asset service builds prompt
  ↓
ComfyUI/local generator creates image
  ↓
File saved
  ↓
metadata saved
  ↓
UI displays portrait
```

## User Controls

- regenerate
- lock
- replace manually
- hide portrait
- batch-generate
- queue only stars/starters

## Performance

AI generation must be async.

Never block:

- Continue
- save/load
- sim loop
- UI render
- game result generation

## Fallbacks

If service offline:

- show silhouette
- show initials
- queue job
- warn user quietly
