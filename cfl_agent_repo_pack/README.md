# College Football Legends — Local Agent Repo Pack

This zip is a handoff pack for a local PC coding agent. It is not the game itself. It is the discipline layer the agent should install into the project before building features.

## How To Use
1. Unzip this pack.
2. Copy its contents into the root of the game repo, or give the local agent this folder and tell it to merge the files thoughtfully.
3. Start with `scripts/initial_agent_prompt.md`.
4. Do not start feature work until Milestone 0 in `docs/BUILD_ORDER.md` is complete.

## Most Important Files
- `AGENTS.md` — controlling rules for all agents.
- `CLAUDE.md` — Claude-specific instruction file.
- `docs/BUILD_ORDER.md` — required implementation order.
- `docs/ARCHITECTURE.md` — folder structure and architecture rules.
- `specs/VISUAL_QA_RULES.md` — objective visual QA rules.
- `tasks/TASK_TEMPLATE.md` — task format.
- `tasks/COMPONENT_CONTRACT_TEMPLATE.md` — component planning format.
- `tasks/FINAL_REPORT_TEMPLATE.md` — required final report format.
- `specs/screens/*.visual-spec.md` — starter visual specs for main screens.
- `tests/visual/playwright-visual-template.spec.ts` — visual testing starter.

## Annotated Screenshots
Yes, annotated current screens are very helpful. Put them in:

`specs/reference-images/`

Recommended labels:
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

## Operating Principle
The agent should build a reusable, data-driven visual system: design tokens, team brand tokens, typed page data, reusable components, visual tests, and screen templates. It should not create disconnected one-off mockups.
