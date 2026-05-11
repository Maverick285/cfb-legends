# Task ___ — [Task Name]

## Goal
Describe the exact outcome. One task should do one thing.

## Context
Explain why this task exists and what system/page/component it belongs to.

## Relevant Specs
- `docs/ARCHITECTURE.md`
- `docs/DESIGN_SYSTEM_IMPLEMENTATION_PLAN.md`
- `specs/VISUAL_QA_RULES.md`
- `specs/screens/[screen].visual-spec.md`

## Files Allowed
List exact files or folders the agent may modify.

## Files Not Allowed
List protected files/folders. Example:
- `package.json` unless this is a tooling task
- `src/design/tokens.ts` unless this is a design-token task
- global CSS unless approved

## Requirements
- Requirement 1
- Requirement 2
- Requirement 3

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
- [ ] Typecheck passes
- [ ] Lint passes
- [ ] Tests pass
- [ ] Build passes
- [ ] Visual artifacts saved if UI changed

## Required Commands
```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

For UI tasks:
```bash
npm run visual:test
npm run screenshot
```

## Final Report
Use `tasks/FINAL_REPORT_TEMPLATE.md`.
