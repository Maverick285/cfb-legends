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
