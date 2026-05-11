# Reference Image Usage

Reference images are layout/style guidance, not pixel-copy targets.

## Rules
1. Preserve page archetype, hierarchy, density, and component structure.
2. Do not bake reference-image text into components.
3. Do not hardcode team colors from the screenshot unless they are in TeamBrand tokens.
4. Use reference images to identify reusable components and layout templates.
5. Produce a written visual spec before implementing a screen.
6. Store approved reference images in `specs/reference-images/`.
7. Store screen-specific specs in `specs/screens/`.

## Annotation Guidance
Annotated screenshots are highly useful. Mark:
- page shell regions,
- reusable components,
- dynamic data zones,
- static decorative zones,
- expected CTA locations,
- density/spacing issues,
- examples of what should not be copied literally.

## Recommended Annotation Labels
- SHELL
- HEADER
- LEFT NAV
- TOP NAV
- MAIN PREVIEW
- RIGHT PANEL
- DATA CARD
- REUSABLE COMPONENT
- DYNAMIC DATA
- BRAND TOKEN
- STATIC IMAGE
- CTA
- FAIL IF MISSING
