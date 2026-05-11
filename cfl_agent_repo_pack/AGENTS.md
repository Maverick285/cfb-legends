# College Football Legends — Agent Operating Rules

## Prime Directive
Do not ship half-complete code. Do not claim success unless the required checks actually pass.

This project is a template-driven, data-driven game UI. The agent must build reusable systems, not one-off screens.

## Absolute Rules
1. Do not create one-off screens when a template/component should exist.
2. Do not hardcode school names, records, scores, colors, player names, budgets, rankings, or logos inside reusable components.
3. All school-specific identity must come from a TeamBrand data object.
4. All page content must come from typed data objects or mock data files.
5. Do not create a new Button, Panel, Nav, Table, Card, Rating, or Chart component if an existing component can be extended.
6. Do not modify global styles, design tokens, routing, package scripts, or architecture files unless the task specifically allows it.
7. Do not report completion without running required commands.
8. Do not say “looks good,” “should work,” “implemented,” or “complete” unless the final report status is PASS.
9. If any command fails, the final status is FAIL.
10. If screenshots or visual tests are required and missing, the final status is FAIL.

## Required Workflow For Every Coding Task
1. Read the task file.
2. Read all referenced specs.
3. Inspect relevant existing files.
4. Produce a short implementation plan.
5. Confirm files to be changed.
6. Make the smallest viable change.
7. Add or update tests.
8. Run required commands.
9. Fix failures.
10. Save visual artifacts if the task affects UI.
11. Produce final report using `tasks/FINAL_REPORT_TEMPLATE.md`.

## Completion Gate
A task is complete only if:
- acceptance criteria are checked off,
- typecheck passes,
- lint passes,
- tests pass,
- build passes,
- visual tests pass if the task affects UI,
- screenshots are saved if the task affects UI,
- no unauthorized files were changed.

## Required Commands
Default required commands:
```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

For visual/UI tasks also run:
```bash
npm run visual:test
npm run screenshot
```

If scripts do not exist yet, create them as part of the quality harness task before feature development begins.

## Visual QA Rule
AI vision review is not a completion gate. It may be used only as an additional critique step. Completion requires objective checks: screenshot tests, DOM assertions, visual specs, and saved artifacts.

## Architecture Rules
- `/src/design` contains tokens, typography, themes, and design primitives.
- `/src/brands` contains team brand schemas and school brand packs.
- `/src/components` contains reusable components only.
- `/src/screens` composes reusable components into page templates.
- `/src/data` contains mock/sample data and typed schemas.
- `/src/game` contains simulation/rules/models and must not import React UI.
- Components must not import from screens.
- Design tokens must not import game data.
- Screens may import components, brands, and data.

## Visual Identity Rules
The UI is dark, dense, premium, athletic, school-branded, and data-heavy. It should resemble a serious college football dynasty management sim, not a generic web dashboard.

## Forbidden Behaviors
- Hardcoding visual values in page components when tokens exist.
- Duplicating a component because it is faster.
- Reporting success after eyeballing the page.
- Skipping tests because the change is “small.”
- Hiding errors in the final report.
- Changing task scope without saying so.
- Creating decorative mockups that are not data-bound.

## Final Report Requirement
Use `tasks/FINAL_REPORT_TEMPLATE.md`. The report must include PASS/FAIL, files changed, commands run, acceptance criteria, screenshots/artifacts, known issues, and not-done items.
