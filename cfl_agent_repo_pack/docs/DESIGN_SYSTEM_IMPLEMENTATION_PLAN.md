# Design System Implementation Plan

## Objective
Build the College Football Legends UI as a reusable design system before building feature screens.

## Phase 1 — Tokens
Create:
- `src/design/tokens.ts`
- `src/design/typography.ts`
- `src/design/themes.ts`

Token categories:
- base colors,
- semantic colors,
- typography,
- spacing,
- border radius,
- shadows,
- panel gradients,
- z-index,
- animation timings.

## Phase 2 — Team Brand Schema
Create:
- `src/brands/teamBrand.schema.ts`
- sample brand packs for Alabama, USC, Notre Dame, Vanderbilt, Minnesota, and a custom fictional school.

## Phase 3 — Core Components
Build in this order:
1. Button
2. Panel
3. PanelHeader
4. AppHeader
5. SidebarNav
6. TopTabNav
7. BottomTicker
8. StatTile
9. GradeBadge
10. StarRating
11. RatingRing
12. ProgressBar
13. DataTable
14. ScheduleRow
15. RankingRow
16. ScoreBanner

## Phase 4 — Specialized Components
Build:
- RecruitingRow
- ProspectDetailPanel
- NILBudgetCard
- PartnerRow
- ActivityFeedRow
- SkillNode
- SkillTree
- ReportGradeCard
- UniformAttributeRow
- UniformPreviewStage
- StadiumOverviewPanel
- SeatingDiagram
- ExpansionOptionCard

## Phase 5 — Shells
Build:
- LeftSidebarShell
- TopNavShell
- HybridShell
- WizardShell
- BuilderShell
- ProgressionShell
- PostgameShell

## Phase 6 — Screen Templates
Build one page at a time from existing components.

Order:
1. Dashboard
2. Recruiting Board
3. NIL Management
4. Game Report Card
5. Coaching Upgrades
6. School Creator
7. Uniform Creator
8. Stadium Builder

## Design Rules
- Dark metallic base.
- Team colors applied through TeamBrand.
- Dense, premium, sports-broadcast style.
- Compact typography.
- Cards and tables aligned to grid.
- No bright white backgrounds.
- No generic SaaS look.
- No unbounded one-off CSS.

## Component Contract Requirement
Before implementing a component, create or update a component contract using `tasks/COMPONENT_CONTRACT_TEMPLATE.md`.
