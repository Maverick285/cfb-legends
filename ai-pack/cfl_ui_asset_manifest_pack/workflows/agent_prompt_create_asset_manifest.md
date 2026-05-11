# Agent Prompt — Create/Update Asset Manifest

You are preparing the College Football Legends UI for production implementation.

Do not code screens yet.

## Inputs

- Read `docs/PRODUCTION_ASSET_BIBLE.md`.
- Read `docs/ANNOTATION_GUIDE.md`.
- Read `docs/STATIC_DYNAMIC_RULES.md`.
- Inspect reference images in `specs/reference-images/` if present.
- Use `manifests/ui_asset_manifest.csv` and `manifests/screen_asset_map.csv` as starting points.

## Task

For each reference screen:

1. Identify the screen template family.
2. Identify the reusable shell regions.
3. Identify reusable components.
4. Identify static graphics needed.
5. Identify hybrid graphics needed.
6. Identify dynamic data/text/chart regions.
7. Update the manifest files.
8. Do not create duplicate assets if an existing global panel/widget can serve the purpose.

## Output

Produce:

- updated asset manifest
- updated screen-to-asset map
- missing asset list
- priority list
- issues/questions

## Completion Rule

Do not claim completion unless every screen has:

- required regions identified
- assets classified static/dynamic/hybrid
- dynamic regions listed
- reusable components mapped
