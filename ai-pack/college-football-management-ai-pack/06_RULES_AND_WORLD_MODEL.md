# 06_RULES_AND_WORLD_MODEL

> Use this file as an instruction set for the AI working on the project.

**Read after:** 05_PRODUCT_REQUIREMENTS.md
**Primary outputs required:**
- A versioned rules architecture for modern college football
- A clear separation between hard rules, soft simulation, and flavor
- Initial JSON-style ruleset templates for eligibility, portal, postseason, benefits, and calendars
**Stop when:**
- Volatile rules are represented as data with verification metadata
- The AI can explain which rules are current assumptions and which are only watchlist items
- The first playable version can operate with a simplified fictional world while preserving real structural logic

## Purpose

This file defines the **world logic contract**.

The game must simulate a version of modern college football that is:
- grounded in current reality
- flexible enough to change
- abstract enough to stay fun
- explicit enough to test

This is the place where external reality becomes configurable game structure.

## Foundational rule-engine principles

### 1. Separate hard rules from soft simulation
Not everything needs the same level of strictness.

#### Hard rules
Must be deterministic and explicit.
Examples:
- eligibility clock
- redshirt thresholds
- portal window timing
- postseason bracket logic
- full-time / progress-toward-degree gates
- whether a ruleset uses scholarship caps or roster limits

#### Soft simulation
Should be systemic but tunable.
Examples:
- player transfer risk
- donor patience
- fan reaction
- facility impact
- recruiting relationship strength
- NIL market pressure

#### Flavor systems
Should enrich the experience without owning core outcomes.
Examples:
- news headlines
- media narratives
- recruit quotes
- rivalry storylines

### 2. Every volatile rule must be versioned
Every ruleset file should contain:
- `ruleset_id`
- `effective_from`
- `effective_to`
- `last_verified_at`
- `volatility`
- `source_ids`
- `notes`

### 3. The fictional prototype should preserve structure, not exact scale
If world-size reduction is necessary early, keep the *shape* of the sport:
- recruit → roster → season → postseason → offseason
- eligibility pressure
- roster retention pressure
- ranking / bracket consequences
- program resource allocation

### 4. Never let UI components define rules
UI screens may expose rules, but they must not *own* them.

## Current real-world structural assumptions to model

These assumptions are grounded in the source appendix and should be treated as current until refreshed.

### NIL and player compensation environment
- Student-athletes may receive compensation from third parties for NIL activities when the deal reflects a valid business purpose and compensation is within a reasonable range. [Source IDs: NCAA-01]
- Division I changed its NIL rules in April 2024 to allow schools to help student-athletes identify NIL opportunities and facilitate deals between student-athletes and third parties. [Source IDs: NCAA-02]
- Following the June 6, 2025 House settlement approval, Division I schools in the relevant framework may provide direct financial benefits to student-athletes, with year-one benefits referenced by the NCAA at approximately $20.5 million under the settlement framework. [Source IDs: NCAA-02, NCAA-03, NCAA-04]
- The settlement-related rules also tie those benefits to full-time enrollment, progress-toward-degree requirements, and the athlete’s eligibility period. [Source IDs: NCAA-03]

### Roster / scholarship environment
- The settlement framework replaced sport-specific scholarship limits with roster-limit logic for opt-in Division I programs, with schools able to offer scholarships to any student-athletes on the declared roster up to the applicable roster structure. [Source IDs: NCAA-02, NCAA-04]
- Current student-athletes affected by the transition received legislated exceptions in the adopted roster-limit changes. [Source IDs: NCAA-04]
- If a student-athlete receiving athletics aid loses a roster spot for roster-management, performance, or injury reasons, the scholarship cannot be revoked unless and until the student chooses to transfer. [Source IDs: NCAA-04]

### Eligibility and academics
- Division I student-athletes currently operate under a five-year eligibility window and academic progress standards, including 40/60/80 percentage-of-degree checkpoints, term-hour and GPA rules. [Source IDs: NCAA-05]
- Division I football student-athletes may compete in up to four contests without using a season of football. [Source IDs: NCAA-06]
- As of April 2024, transfer eligibility rules were updated so academically eligible student-athletes can be immediately eligible at the next school; graduate-transfer conditions remain explicit. [Source IDs: NCAA-07]

### Portal timing
- Football portal entry windows moved to a 15-day January period of Jan. 2–16, with a coaching-change exception tied to the hiring/public announcement of a new head coach and an alternate opening on day 31 if no coach is hired, through June 30. [Source IDs: NCAA-08]

### Postseason
- The CFP uses a 12-team format.
- For the 2025–26 season, the five highest-ranked conference champions are guaranteed access, but the bracket is seeded directly from the final CFP rankings, with the top four ranked teams receiving first-round byes. [Source IDs: CFP-01]
- The CFP Management Committee announced in January 2026 that the 12-team format would continue through the 2026–27 season. [Source IDs: CFP-02]
- The selection committee protocol emphasizes strength of schedule, head-to-head results, common-opponent comparison without incentivizing margin of victory, and other relevant factors. [Source IDs: CFP-03]

## Watchlist rules that may change later

These should **not** be treated as current production truth unless re-verified at implementation time.

### Eligibility model watchlist
In late April 2026, the NCAA signaled an age-based eligibility concept that could alter the traditional “four seasons in five years” structure in future seasons, while explicitly preserving the current structure for 2025–26 competitors. [Source IDs: NCAA-09]

### Transfers / tampering watchlist
The same April 2026 board action included discussion of narrower transfer-portal exceptions tied to benefits agreements and a proposal to presume tampering violations under certain conditions if adopted later. [Source IDs: NCAA-09]

## The three-layer world model

## Layer 1: Rules Fact Layer
What is true in this ruleset?

Examples:
- how many games preserve a redshirt
- what portal windows exist
- what academic gates exist
- how postseason seeding works
- what compensation model is active

## Layer 2: Game Balance Layer
How strong are system effects?

Examples:
- recruiting influence values
- donor patience
- NIL market abundance
- facility upgrade costs
- transfer-risk weights

## Layer 3: Fiction Layer
What does this world look and feel like?

Examples:
- school archetypes
- conference identities
- regional pipelines
- media voice
- donor personalities
- rivalries
- prestige tiers

Keep these layers separate. Real rules should not leak into brand or narrative content, and balance tweaks should not require rewriting hard-rule logic.

## Required ruleset families

Create these initial ruleset families even if some stay partial early:

- `fbs_current_2026`
- `fbs_legacy_pre_settlement`
- `fictional_modern_open`
- `prototype_reduced_world`

The reduced-world prototype should preserve the same rule shapes but can compress:
- number of teams
- number of prospects
- schedule density
- geographic breadth

## Required rules modules

The rules engine should be broken into modular files or modules at minimum:

- calendar rules
- eligibility rules
- academic rules
- roster rules
- benefit / compensation rules
- portal rules
- recruiting rules
- postseason rules
- conference rules

## Recommended config structure

```json
{
  "ruleset_id": "fbs_current_2026",
  "effective_from": "2025-07-01",
  "effective_to": null,
  "last_verified_at": "2026-05-01",
  "volatility": "high",
  "source_ids": ["NCAA-01", "NCAA-02", "NCAA-03", "NCAA-04", "NCAA-05", "NCAA-06", "NCAA-07", "NCAA-08", "CFP-01", "CFP-02", "CFP-03"],
  "modules": {
    "eligibility": "eligibility_current_2026.json",
    "academics": "academics_current_2026.json",
    "roster": "roster_current_2026.json",
    "benefits": "benefits_current_2026.json",
    "portal": "portal_current_2026.json",
    "postseason": "postseason_current_2026.json",
    "calendar": "calendar_current_2026.json"
  },
  "notes": [
    "Watch NCAA-09 for possible future eligibility redesign.",
    "Treat compensation mechanics as ranges/bands in prototype."
  ]
}
```

## Example module: eligibility

```json
{
  "module_id": "eligibility_current_2026",
  "seasons_of_competition": 4,
  "clock_years": 5,
  "redshirt_max_games": 4,
  "full_time_required": true,
  "progress_toward_degree": {
    "year_2_degree_pct": 40,
    "year_3_degree_pct": 60,
    "year_4_degree_pct": 80,
    "min_hours_next_term": 6
  },
  "graduate_transfer": {
    "degree_required": true,
    "must_leave_academically_eligible": true,
    "must_enroll_full_time_postgrad": true
  },
  "watchlist_flags": ["age_based_eligibility_proposal_2026"]
}
```

## Example module: portal

```json
{
  "module_id": "portal_current_2026",
  "windows": [
    {
      "type": "primary",
      "open": "01-02",
      "close": "01-16"
    }
  ],
  "coach_change_exception": {
    "trigger": "new_head_coach_hired_or_announced",
    "opens_after_days": 5,
    "duration_days": 15,
    "fallback_if_no_hire_after_days": 31,
    "last_possible_day": "06-30"
  },
  "entry_required_for_contact": true,
  "watchlist_flags": ["tampering_enforcement_changes_2026"]
}
```

## Example module: benefits / compensation

```json
{
  "module_id": "benefits_current_2026",
  "third_party_nil": {
    "allowed": true,
    "requires_valid_business_purpose": true,
    "reasonable_compensation_required": true,
    "school_facilitation_allowed": true
  },
  "school_directed_benefits": {
    "enabled": true,
    "opt_in_model": true,
    "year_one_cap_reference_usd_millions": 20.5,
    "full_time_required": true,
    "progress_toward_degree_required": true,
    "eligibility_period_required": true
  },
  "prototype_abstraction": {
    "use_amount_bands_instead_of_exact_contract_language": true
  }
}
```

## Example module: roster

```json
{
  "module_id": "roster_current_2026",
  "model": "roster_limits",
  "sport_specific_scholarship_caps_active": false,
  "declared_roster_scholarship_flexibility": true,
  "scholarship_protection": {
    "cannot_revoke_for_roster_management": true,
    "cannot_revoke_for_athletics_performance": true,
    "cannot_revoke_for_injury": true,
    "exception_if_student_transfers": true
  },
  "transition_exception_support": true
}
```

## Example module: postseason

```json
{
  "module_id": "postseason_current_2026",
  "format": "cfp_12_team",
  "access": {
    "guaranteed_conference_champs": 5,
    "at_large_slots": 7
  },
  "seeding": {
    "direct_from_final_rankings": true,
    "top_four_ranked_receive_byes": true,
    "no_reseeding": true
  },
  "selection_criteria": [
    "strength_of_schedule",
    "head_to_head",
    "common_opponents_without_margin_of_victory_incentive",
    "relevant_availability_factors"
  ]
}
```

## Season calendar design

The game needs a season calendar layer that is more granular than “offseason / season / postseason.”

Recommended phases:
- offseason reset
- staff cycle
- high-school recruiting phase
- portal phase
- preseason
- regular season early
- regular season stretch run
- rivalry / pressure weeks
- conference-title week
- selection / bracket week
- postseason / bowl / CFP
- departure and retention resolution

Each phase should expose:
- allowed actions
- blocked actions
- major deadlines
- automation defaults
- UI emphasis

## Program archetypes

Support different program types from day one, even in fiction:
- blueblood / prestige giant
- rising power
- stable middle-tier contender
- regional underdog
- academic-first institution
- donor-rich but unstable program
- rebuild / cratered legacy program

These archetypes should affect:
- prestige
- donor behavior
- recruiting reach
- expectation pressure
- facility baselines
- portal attractiveness
- patience for rebuilds

## Required world abstractions

These systems should be represented explicitly even if their first version is simple:

### 1. Benefit expectations
Players and recruits should care about resources, but early versions can abstract this into bands, tiers, or expectation categories rather than full legal contract trees.

### 2. Academic stability
Academic state should matter, but it can begin with clear risk flags and thresholds rather than transcript-level bureaucracy.

### 3. Retention pressure
Not every exit must be a portal entry animation. A retention-risk model plus key decision points is enough.

### 4. Institutional politics
AD, donor, and fan pressure should exist as separate signals, not one generic approval meter.

## Required edge-case handling

At minimum the rules engine must explicitly define behavior for:

- player appears in 0–4 games
- player exceeds redshirt threshold
- player graduates early
- player transfers while academically ineligible
- coach leaves / new coach hired
- player receives benefits but becomes academically ineligible
- season ends with unresolved roster overflow
- conference champion ranked outside top 12
- postseason teams outside a ranking cutoff still needing placement

## Simplification rules for the first playable version

It is acceptable early to simplify:
- exact NIL deal structure
- legal language of benefits agreements
- conference-level revenue modeling
- every postseason bowl outside the main bracket
- every waiver and appeal path

It is **not** acceptable early to simplify away:
- eligibility tracking
- redshirt logic
- portal windows
- roster planning pressure
- rankings/bracket consequences
- the difference between high-school recruiting and portal acquisition

## Immediate deliverable after reading this file

Produce:
1. the initial ruleset map
2. JSON skeletons for the main rules modules
3. the rules volatility watchlist with source IDs and verification dates

Then continue to `07_MENU_UX_AND_SCREEN_SPECS.md`.
