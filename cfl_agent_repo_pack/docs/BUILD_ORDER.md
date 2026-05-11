# Build Order

## Do Not Start With Screens
The agent must not start by building the Stadium Builder, Uniform Creator, Recruiting Board, or any other feature screen. Start with the repo discipline and design system.

## Milestone 0 — Repo Quality Harness
1. Inspect repo.
2. Add/update `AGENTS.md` and `CLAUDE.md`.
3. Add TypeScript strict mode.
4. Add ESLint with zero warnings.
5. Add Prettier.
6. Add Vitest.
7. Add Playwright.
8. Add scripts:
   - `typecheck`
   - `lint`
   - `test`
   - `build`
   - `visual:test`
   - `screenshot`
   - `check`
9. Create artifact folders for screenshots and reports.
10. Run all checks and report PASS/FAIL.

## Milestone 1 — Foundation
1. Design tokens.
2. TeamBrand schema.
3. Sample brand packs.
4. Basic app shell.
5. Visual test smoke route.

## Milestone 2 — Core Components
1. Button
2. Panel
3. AppHeader
4. SidebarNav
5. TopTabNav
6. BottomTicker
7. StatTile
8. DataTable
9. Rating widgets
10. Grade widgets

## Milestone 3 — First Vertical Slice
Build one complete dashboard route using sample data and one team brand.

Acceptance:
- renders at `/dashboard`,
- uses reusable components,
- passes tests,
- screenshot saved,
- no hardcoded school data in reusable components.

## Milestone 4 — Brand Swap Test
Render the same dashboard with multiple brand packs.

Acceptance:
- Alabama-style crimson works,
- USC-style cardinal/gold works,
- Notre Dame-style navy/gold works,
- Custom school works,
- no layout breakage.

## Milestone 5 — Feature Templates
Proceed screen-by-screen:
1. Recruiting Board
2. NIL Management
3. Game Report Card
4. Coaching Upgrades
5. School Creator
6. Uniform Creator
7. Stadium Builder

Each screen must have:
- visual spec,
- data schema,
- reusable components,
- screenshot test,
- final report.
