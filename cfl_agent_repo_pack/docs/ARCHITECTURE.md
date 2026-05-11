# Architecture — College Football Legends

## Architecture Goal
Build a reusable, data-driven UI system for a college football dynasty management game. The UI must scale across many schools, screens, and game states without one-off rewrites.

## Recommended Stack For Prototype
- React
- TypeScript strict mode
- Vite
- CSS Modules, Tailwind, or tokenized CSS variables
- Zod for schemas
- Vitest for unit/component tests
- Playwright for visual and integration tests
- Storybook or Ladle later for isolated component visual tests

## Recommended Folder Structure
```text
/src
  /app
    App.tsx
    routes.tsx

  /design
    tokens.ts
    typography.ts
    themes.ts
    cssVariables.ts

  /brands
    teamBrand.schema.ts
    alabama.brand.ts
    usc.brand.ts
    notreDame.brand.ts
    sampleCustom.brand.ts

  /components
    /layout
    /navigation
    /buttons
    /cards
    /tables
    /charts
    /ratings
    /builder
    /progression
    /postgame
    /media

  /screens
    /dashboard
    /recruiting
    /nil
    /stadium
    /uniform
    /schoolCreator
    /coachingUpgrades
    /postgame
    /campus
    /signingDay

  /data
    /schemas
    /mock

  /game
    /models
    /simulation
    /rules

/tests
  /unit
  /visual
  /integration

/specs
  /screens
  /reference-images

/tasks
```

## Dependency Rules
- `/components` may import from `/design`, `/brands` types, and utility files.
- `/components` must not import from `/screens`.
- `/screens` compose components and inject data.
- `/design` must not import game data or screen code.
- `/brands` should contain brand data and brand schema only.
- `/game` must not import React UI.
- `/data/mock` may import schemas/types and provide sample content.

## Data-Driven UI Rule
Every reusable component receives all display data through typed props. Reusable components must never hardcode:
- school/team names,
- colors,
- records,
- rankings,
- scores,
- player names,
- budget values,
- image paths except default placeholders.

## Team Brand Rule
All team-specific visuals are derived from a `TeamBrand` object:
- primary color,
- secondary color,
- accent color,
- logos,
- wordmark,
- abbreviation,
- gradient preferences,
- active state treatment.

## Page Template Rule
Every screen should use a named template, such as:
- DashboardTemplate
- RecruitingBoardTemplate
- NILManagementTemplate
- StadiumBuilderTemplate
- UniformCreatorTemplate
- SchoolCreatorTemplate
- CoachingUpgradesTemplate
- GameReportCardTemplate

## Quality Gates
Feature work is not complete unless:
- typecheck passes,
- lint passes,
- unit tests pass,
- build passes,
- visual tests pass for UI work,
- screenshots are saved for UI work.
