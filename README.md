# Campus Gridiron Manager

A static prototype for a fictional American college football program-management game. The project is menu-first: the office, roster, recruiting, portal, staff, development, finance, and history loops come before any match engine.

## Current Slice

- Program Desk with blocking items and Continue behavior
- Deterministic demo calendar with date/week advancement
- Career bootstrap panel for starting or loading the demo career
- Fictional program choice and deterministic seed-based career profile
- Phase-aware preseason calendar through opener and postgame review
- Local save/load shell for career header, calendar index, and resolved notifications
- Autosave after career start, blocker resolution, and time advancement
- Program Desk Open actions that deep-link to relevant screens
- Startup validation for the demo content pack with explicit field errors
- Program Home, Roster, Depth Planner, Recruiting Board, Transfer Portal, Staff, Development, Schedule, Rankings, Finances / NIL, Facilities / AD, History, and Analytics Lab screens
- Fictional school, conference, staff, players, recruits, and portal targets
- Demo world content loaded from `data/demo-world.js`
- Active project status and decision log under `docs/`
- Planning pack extracted under `ai-pack/college-football-management-ai-pack/`
- No build step required
- M4 retention conversations with weekly AP, transfer-window legality, coach-change exception path, benefit-bucket allocation controls, and roster-limit compliance warnings
- M5 season shell with deterministic game results, standings/rankings updates, CFP bracket flow, history archival entry, and Year 2 rollover
- M6 stewardship depth with traceable objective pressure events, facility-request long-term effects, morale/promise reaction tracking, and multi-year history consistency views
- M7 balancing and polish pass with notification anti-spam tuning, recruiting board filters, analytics balance snapshots, migration golden checks, and 1/5/20-season soak harness coverage
- M8 drive simulation and advanced presentation pass with drive-by-drive game output, tactical profile controls, richer opponent tendencies, optional play-by-play text mode, advanced analytics hub metrics, and simulation performance checks
- M9 alpha hardening pass with in-app hardening/calibration reports, browser smoke automation, and full M3-M8 regression confirmation
- M10 modularization pass with extracted runtime modules (`runtime/sim-core.js`, `runtime/hardening-core.js`), compatibility fallbacks, and expanded Playwright browser regression coverage
- M11 sandbox customization foundation with selectable experience mode, editable rules presets, bootstrap tuning sliders, and system-level wiring for AP budgets, portal exceptions, and simulation environment multipliers
- M12 sandbox depth pass with injury cadence, NIL volatility, and progression pace controls wired into load-risk, market-pressure, and morale-progression signals

Open `index.html` in a browser to run the prototype.

## Governing Docs

- `docs/PROJECT_STATUS.md` is the active project heartbeat.
- `docs/DECISION_LOG.md` records project-shaping choices.
- `ai-pack/college-football-management-ai-pack/00_START_HERE.md` begins the external planning pack.
- `14_DATA_ACQUISITION_AND_SIM_CALIBRATION.md` governs real-data usage and calibration targets.
- `15_FM_RESEARCH_AND_OPEN_SOURCE.md` governs benchmark research and distinctness constraints.

## Data Pipeline Scaffold

The project now includes the first scaffold for simulation calibration inputs:

- `data_raw/` for unprocessed source pulls.
- `data_processed/` for cleaned distributions and transforms.
- `game_data/` for game-ready synthetic outputs.

Data policy for this scaffold:

- Use real-world data for distributions/calibration only.
- Do not ship real players or identifiable people.
- Translate management concepts from benchmark games; do not copy branded UI or wording.

## Near-Term Roadmap

1. Start M13 by expanding sandbox economics/roster knobs and exposing clearer preset personalities.
2. Continue runtime extraction and introduce a cleaner content-loader path.
3. Expand browser QA from regression flows to repeatable scenario packs across multiple sandbox presets.
4. Add stronger migration fixtures once modularization introduces new save boundaries.
5. Keep distinctness and fictional-first constraints active while expanding football flavor.

## Naming Note

The prototype uses fictional programs and branding so it can develop its own identity while borrowing familiar management-game patterns.

Design note on FM benchmarking: "similar to a Football Manager skin swap" is treated as a structural benchmark shorthand in this project (decision density and menu rhythm), not as a copy target. UI labels, workflows, and content remain college-football-specific and distinct per the planning pack distinctness rules.
