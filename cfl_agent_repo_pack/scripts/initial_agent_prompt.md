# Initial Prompt For Local Agent

You are working on College Football Legends, a college football dynasty-management game UI.

Before touching feature screens, read these files:
- `AGENTS.md`
- `CLAUDE.md`
- `docs/ARCHITECTURE.md`
- `docs/BUILD_ORDER.md`
- `docs/DESIGN_SYSTEM_IMPLEMENTATION_PLAN.md`
- `specs/VISUAL_QA_RULES.md`

Your first assignment is Milestone 0 only: prepare the repo for disciplined AI-assisted development.

## Do Not Build Feature Screens Yet
Do not build Dashboard, Recruiting Board, Stadium Builder, Uniform Creator, or any screen templates yet.

## Milestone 0 Tasks
1. Inspect the repo structure.
2. Report current scripts and missing quality gates.
3. Add or verify:
   - TypeScript strict checking,
   - ESLint with zero warnings,
   - Prettier,
   - Vitest,
   - Playwright,
   - npm scripts for `typecheck`, `lint`, `test`, `build`, `visual:test`, `screenshot`, and `check`.
4. Create screenshot artifact directories if missing.
5. Add one minimal Playwright smoke visual test for the app root or an existing route.
6. Run all available checks.
7. Produce final report using `tasks/FINAL_REPORT_TEMPLATE.md`.

## Completion Rule
Do not claim success if any command fails. If the repo is not ready to pass all commands yet, report FAIL and list exactly what remains.
