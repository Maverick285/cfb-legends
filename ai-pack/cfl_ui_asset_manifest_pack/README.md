# College Football Legends — UI Asset Manifest Pack

This pack is for a local AI coding/design agent. Its purpose is to turn visual mockups/reference screens into a reusable production UI graphics system.

The goal is **not** to create one flat image per screen. The goal is to identify reusable shells, panels, widgets, graphic skins, dynamic slots, and page templates so the game UI can be assembled programmatically.

## Use this pack like this

1. Put reference screenshots in `specs/reference-images/`.
2. Annotate the screenshots using the labels in `docs/ANNOTATION_GUIDE.md`.
3. Have the agent fill or update `manifests/ui_asset_manifest.csv` and `manifests/ui_asset_manifest.json`.
4. Build assets in the priority order listed in `docs/BUILD_PRIORITY.md`.
5. Implement screens from templates, not one-off designs.
6. Any dynamic data — team names, colors, records, player names, scores, charts, ranks — must be rendered in code, not baked into graphics.

## Core rule

Every screen must be built from:

- shared shell graphics
- reusable components
- reusable panel/widget skins
- team brand tokens
- page-specific structured data
- dynamic text/data/chart rendering

If an asset cannot be reused, it should be marked as screen-specific and justified.
