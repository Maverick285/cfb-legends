# Naming Conventions

## Asset file naming

Use lowercase snake_case.

Format:

```text
<system>_<family>_<component>_<variant>_<state>_<size>.<ext>
```

Examples:

```text
shell_header_bg_neutral_1920x120.png
panel_standard_bg_dark_640x360.png
btn_primary_gold_hover_260x48.png
skilltree_node_selected.svg
stadium_builder_preview_frame_960x420.png
```

## Categories

Use one of these top-level prefixes:

- `shell_`
- `panel_`
- `btn_`
- `icon_`
- `divider_`
- `badge_`
- `chart_`
- `rating_`
- `table_`
- `score_`
- `matchup_`
- `recruiting_`
- `nil_`
- `stadium_builder_`
- `uniform_creator_`
- `school_creator_`
- `skilltree_`
- `postgame_`
- `macrohub_`
- `signingday_`

## State suffixes

- `_idle`
- `_hover`
- `_pressed`
- `_selected`
- `_disabled`
- `_locked`
- `_unlocked`
- `_maxed`
- `_warning`
- `_success`
- `_danger`

## Size suffix

Use `WIDTHxHEIGHT` for raster assets.

Examples:

- `_1920x1080`
- `_420x220`
- `_320x180`

SVG assets do not require size suffix unless exported for a specific fixed viewbox.
