# Visual QA Rules — College Football Legends

## Core Principle
AI vision review is not QA. It is only an advisory critique. A UI task is complete only when objective visual checks and acceptance criteria pass.

## Required Visual Gates For UI Tasks
1. Required DOM regions exist.
2. No required panel overflows the viewport.
3. No marked text is clipped.
4. Screenshot is saved.
5. Screenshot test passes or diff is reviewed and explicitly accepted.
6. Component visual tests pass if a shared component changed.
7. The screen satisfies its visual spec checklist.
8. Final report includes exact artifact paths.

## Required Viewports
At minimum test:
- 1920 × 1080

Recommended later:
- 2560 × 1440
- 3840 × 2160
- 1366 × 768 sanity check

## Required Test IDs
Major regions should expose stable `data-testid` values:
- `app-header`
- `sidebar-nav`
- `top-nav`
- `screen-title`
- `main-content`
- `right-rail`
- `bottom-ticker`
- `continue-button`

Cards/panels should expose either:
- `data-testid="team-overview-card"`, etc., or
- `data-panel`

Text that must never clip should include:
- `data-no-clip`

## Visual Fail Conditions
A screen fails visual QA if:
- a required region is missing,
- a required panel overlaps another panel,
- a required panel overflows the viewport,
- major text is clipped,
- team colors are not applied through brand tokens,
- a one-off component duplicates an existing component,
- the page is sparse where the spec requires dense management UI,
- the active nav state is missing,
- the current week/team/record/ranking context is missing,
- the CTA is missing or visually weak,
- the screen does not match the intended page archetype.

## AI Visual Critique Prompt
When asked to visually inspect a screenshot, answer this checklist only:

1. Is the page using the correct shell?
2. Are all required regions present?
3. Is the navigation active state correct?
4. Are all required cards/panels present?
5. Is any text clipped?
6. Are any panels overlapping?
7. Is there unexpected empty space?
8. Are team colors applied through the brand system?
9. Does the primary CTA appear in the expected location?
10. Are any elements visibly off-grid?
11. What specific file/component is likely responsible for each issue?

Do not answer “looks good” without listing evidence.
