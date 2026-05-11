# 99_SOURCES_AND_FACT_BASIS

> Use this file as the fact basis and refresh checklist for any date-sensitive or research-heavy part of the project.

## Why this file exists

This project depends on two kinds of external truth:

1. **Current college-football rules and structures**  
2. **Benchmark-product patterns worth translating into original designs**

Both can drift:
- sports rules can change
- postseason structure can change
- portal windows can change
- compensation/benefit rules can change
- benchmark products can evolve between editions

This file records the source categories the project relied on and tells future AI sessions what must be refreshed before implementation or release decisions.

## Source-of-truth priority order

When sources disagree, prefer them in this order:

1. official governing body or official postseason source
2. official product manual / official benchmark materials
3. official school or conference release for contextual examples
4. high-quality reporting for context
5. community commentary only if nothing better exists

## What must be refreshed most often

Refresh these before any major rules pass or release candidate:
- NIL and compensation rules
- House-settlement implementation details
- roster-limit assumptions
- portal windows and exceptions
- CFP format and seeding
- eligibility proposals that may change the current model

Refresh these when UX or benchmark work changes:
- FM manual pages used as structural references
- competitor feature pages
- benchmark product update notes

## How to use this appendix

When an AI is about to modify:
- `06_RULES_AND_WORLD_MODEL.md`
- `07_MENU_UX_AND_SCREEN_SPECS.md`
- `10_SIMULATION_SYSTEMS.md`
- `11_IMPLEMENTATION_ROADMAP.md`
- any production ruleset data

…it should check whether the relevant source entries below need to be refreshed.

## Fact basis captured when this pack was assembled

This pack was assembled with research current to **2026-05-01**.

High-impact fact areas captured in the pack include:
- third-party NIL is an active, normal part of college athletics structure
- House-settlement-era changes created a path for direct school-paid athlete benefits in opt-in Division I contexts
- roster-limit logic in the current era is not safely modeled by old scholarship-era assumptions alone
- redshirt and eligibility logic must remain explicit and ruleset-driven
- Division I football transfer timing and exceptions are current-era systems, not timeless constants
- the CFP structure and seeding behavior are season-sensitive and should not be hardcoded as eternal truth
- modern program management increasingly includes front-office / GM-style responsibilities
- Football Manager is the main benchmark for decision density and menu architecture, not for copy-paste design

## Source entries

### NCAA-01 — NIL (Name, Image, Likeness)

- **Domain / source type:** ncaa.org / official
- **Used for:** Current third-party NIL framing, reporting expectations, and the boundary between NIL and pay-for-play.
- **Volatility:** high
- **Refresh priority:** before implementing NIL/compliance-facing systems or text

### NCAA-02 — NCAA timeline / rule-change material covering April 2024 facilitation changes and June 2025 House settlement implementation

- **Domain / source type:** ncaa.org / official
- **Used for:** Direct school-paid benefits context, House-settlement era rules direction, and recent rule-change timeline.
- **Volatility:** high
- **Refresh priority:** before implementing benefits, compliance, or roster-limit assumptions

### NCAA-03 — House settlement / proposed rule changes / roster-limits implementation pages

- **Domain / source type:** ncaa.org / official
- **Used for:** Direct school benefits, roster limits replacing scholarship caps in some Division I contexts, and transition protections.
- **Volatility:** high
- **Refresh priority:** before shipping any ruleset labeled current

### NCAA-04 — Staying on Track to Graduate

- **Domain / source type:** ncaa.org / official
- **Used for:** Five-year clock and progress-toward-degree framing.
- **Volatility:** medium
- **Refresh priority:** before deepening eligibility/academic systems

### NCAA-05 — Transfer Terms

- **Domain / source type:** ncaa.org / official
- **Used for:** Redshirt preservation framing and transfer terminology.
- **Volatility:** medium
- **Refresh priority:** before finalizing eligibility edge cases

### NCAA-06 — Transfer and immediate eligibility / Division I transfer guidance

- **Domain / source type:** ncaa.org / official
- **Used for:** Transfer treatment and exceptions context.
- **Volatility:** high
- **Refresh priority:** before finalizing portal logic

### NCAA-07 — Transfer Portal windows for Division I football (January window and coach-change exception materials)

- **Domain / source type:** ncaa.org / official
- **Used for:** Portal timing and exception logic.
- **Volatility:** high
- **Refresh priority:** before finalizing portal calendars

### NCAA-08 — Recent NCAA proposals touching age-based eligibility / pending governance changes

- **Domain / source type:** ncaa.org / official
- **Used for:** Rules watchlist and why eligibility rules must remain configurable.
- **Volatility:** high
- **Refresh priority:** during every ruleset update

### CFP-01 — College Football Playoff official seeding update for 2025–26

- **Domain / source type:** collegefootballplayoff.com / official
- **Used for:** Season-aware seeding logic in current-era rulesets.
- **Volatility:** high
- **Refresh priority:** before shipping postseason logic

### CFP-02 — College Football Playoff continuation / 12-team format through 2026–27

- **Domain / source type:** collegefootballplayoff.com / official
- **Used for:** Current postseason structure assumptions.
- **Volatility:** high
- **Refresh priority:** before each release or major rules pass

### CFP-03 — College Football Playoff selection protocol / selection committee guidance

- **Domain / source type:** collegefootballplayoff.com / official
- **Used for:** Resume and field-selection context.
- **Volatility:** medium
- **Refresh priority:** when updating ranking and selection explanations

### FM-01 — Football Manager manual: UI, Inbox and News

- **Domain / source type:** community.sports-interactive.com / official benchmark
- **Used for:** Menu-shell patterns, continue flow, priority messaging, and information hierarchy.
- **Volatility:** low
- **Refresh priority:** when redesigning shell navigation

### FM-02 — Football Manager manual: Scouting Centre / recruitment-related pages

- **Domain / source type:** community.sports-interactive.com / official benchmark
- **Used for:** Recruitment workflows, scouting boards, and decision-support patterns.
- **Volatility:** low
- **Refresh priority:** when redesigning recruiting flows

### FM-03 — Football Manager manual: Squad Planner / squad and team-report pages

- **Domain / source type:** community.sports-interactive.com / official benchmark
- **Used for:** Depth planning and future squad-structure concepts.
- **Volatility:** low
- **Refresh priority:** when updating roster/depth planning UX

### FM-04 — Football Manager manual: Data Hub

- **Domain / source type:** community.sports-interactive.com / official benchmark
- **Used for:** Analytics-lab direction and information-density standards.
- **Volatility:** low
- **Refresh priority:** when deepening analytics

### FM-05 — Football Manager manual: Board / facilities / infrastructure pages

- **Domain / source type:** community.sports-interactive.com / official benchmark
- **Used for:** Institution-management patterns, requests, and facility progression ideas.
- **Volatility:** low
- **Refresh priority:** when building AD/facility flows

### EA-01 — EA SPORTS College Football Dynasty feature pages and deep dives

- **Domain / source type:** ea.com / official benchmark
- **Used for:** Modern college-football flavor checks: recruiting visits, portal emphasis, trophies, and dynasty framing.
- **Volatility:** medium
- **Refresh priority:** when comparing feature coverage, not for direct copying

### BB-01 — Bowl Bound College Football official site and Steam page

- **Domain / source type:** grey dog software / steam / benchmark
- **Used for:** Administrative-depth reference: budgets, academics, archives, and text-heavy management design.
- **Volatility:** medium
- **Refresh priority:** when evaluating management-depth gaps

### OU-01 — Oklahoma athletics release on hiring a football general manager

- **Domain / source type:** soonersports.com / official contextual
- **Used for:** Evidence that GM/front-office style roles are a real part of the modern college-football management fantasy.
- **Volatility:** low
- **Refresh priority:** rarely; use as context, not as rules authority

### LAW-01 — House v. NCAA / related legal-context coverage

- **Domain / source type:** official or high-quality legal/news sources / contextual
- **Used for:** Background legal context behind modern compensation structure changes.
- **Volatility:** medium
- **Refresh priority:** when reassessing legal-risk framing or rule assumptions


## Refresh protocol by work type

### If working on NIL, benefits, finance, or retention logic
Refresh:
- NCAA-01
- NCAA-02
- NCAA-03
- LAW-01

### If working on eligibility, redshirts, or roster legality
Refresh:
- NCAA-04
- NCAA-05
- NCAA-06
- NCAA-07
- NCAA-08

### If working on standings, rankings, or playoff logic
Refresh:
- CFP-01
- CFP-02
- CFP-03
- relevant conference-title rule sources if added later

### If working on menu shell, inbox flow, recruiting board UX, or analytics layouts
Refresh:
- FM-01
- FM-02
- FM-03
- FM-04
- FM-05

### If working on competitive benchmark coverage
Refresh:
- EA-01
- BB-01

### If working on staffing or GM/front-office fantasy
Refresh:
- OU-01

## Rules volatility watchlist

These topics are especially likely to need future changes:
- direct athlete compensation structure
- roster-limit implementation details
- NIL disclosure/compliance thresholds and process
- transfer-window timing and exceptions
- postseason seeding and access rules
- conference alignment effects on schedules and postseason paths
- eligibility reform proposals

## Benchmark interpretation warning

Benchmark sources are for:
- identifying decision-support patterns
- understanding why certain screens feel useful
- spotting gaps in current genre expectations

They are **not** for:
- cloning visual hierarchy
- copying labels or layout
- reproducing branded jargon
- replicating another studio’s exact recruitment or inbox design

## Source-gap rule

If an AI cannot find a fresh authoritative source for a volatile rule:
1. keep the system configurable
2. label the assumption clearly
3. record the assumption in the decision log
4. avoid presenting the assumption as timeless fact

## Suggested future source expansions

The appendix can later be expanded with:
- official conference championship tiebreaker sources
- official conference scheduling structure sources
- academic-eligibility guidance updates
- program-budget and athletic-department finance context sources
- additional benchmark management sims
- selected legal/licensing guidance if the project approaches commercial release

## Completion checklist

The AI is using this file correctly when it can answer:
- Which facts in the project are most likely to have changed?
- Which official sources should be refreshed before touching those facts?
- Which benchmark sources are structural references rather than cloning targets?
- What assumptions must stay configurable even after implementation?
