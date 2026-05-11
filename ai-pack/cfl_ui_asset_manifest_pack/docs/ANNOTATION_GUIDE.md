# Screenshot Annotation Guide

Annotated screens are extremely helpful. Annotate for production meaning, not just appearance.

## Use these labels

### Structure labels

- `GLOBAL SHELL`
- `APP HEADER`
- `TOP NAV`
- `LEFT SIDEBAR`
- `RIGHT RAIL`
- `FOOTER TICKER`
- `MAIN CONTENT`
- `HERO REGION`
- `PREVIEW REGION`
- `WORKSPACE REGION`

### Reuse labels

- `REUSABLE COMPONENT`
- `SCREEN TEMPLATE`
- `PANEL VARIANT`
- `TABLE VARIANT`
- `LIST ROW VARIANT`
- `BUTTON VARIANT`
- `CHART WIDGET`
- `SKILL TREE WIDGET`
- `BUILDER CONTROL`

### Asset labels

- `STATIC GRAPHIC`
- `DYNAMIC DATA`
- `DYNAMIC TEXT`
- `DYNAMIC CHART`
- `PROGRAMMATIC STATE`
- `BRAND TOKEN`
- `TEAM LOGO SLOT`
- `PLAYER IMAGE SLOT`
- `HERO IMAGE SLOT`
- `DECORATIVE ONLY`

### QA labels

- `FAIL IF MISSING`
- `FAIL IF CLIPPED`
- `FAIL IF NOT DYNAMIC`
- `FAIL IF WRONG TEAM COLOR`
- `OPTIONAL`
- `NICE TO HAVE`

## What to annotate

For each screen, mark:

1. What is the global shell?
2. What is reusable across screens?
3. What is unique to this screen family?
4. What should be static art?
5. What should be generated in code?
6. What is dynamic team/player/game data?
7. What should be a scalable asset instead of a fixed PNG?
8. What visual failure would make the screen unacceptable?

## Example annotation language

```text
LEFT SIDEBAR — reusable shell component. Active item color comes from team.primary. Icons are SVG.

CENTER STADIUM VIEW — preview region. Stadium image is content asset. Frame is reusable graphic.

RIGHT OVERVIEW CARD — reusable panel + dynamic data. Do not bake capacity/year/tier into image.

BOTTOM SEATING DIAGRAM — hybrid. Base diagram can be SVG, section colors/counts are dynamic.
```
