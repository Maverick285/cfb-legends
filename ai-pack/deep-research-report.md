# Menus-First College Football Management Sim Scope Pack

## Executive summary

I rebuilt the scope around the thing you actually want: a true Football Manager–style college-football management sim, not a light dynasty dashboard. The pack is structured around the patterns that make Football Manager work at all: Inbox as the central hub, dense and customizable tables, staff delegation and staff-generated reports, multi-season squad planning, flexible training depth, and a recruitment workspace that is itself a planning system rather than a single summary page. The official Football Manager manual and feature pages are very clear on those points: the Inbox is the main hub, staff responsibilities delegate day-to-day tasks, the squad planner projects future roster shape, training can be handled in varying depth, the recruitment home screen is designed for prioritization, and the data hub is a customizable report surface. citeturn12view0turn12view1turn12view2turn12view3turn12view4turn1search2turn12view5

The pack also translates the sport correctly. The comparator products show the right split of responsibilities: entity["video_game","EA SPORTS College Football 26","dynasty mode 2025"] foregrounds staff-building and modern recruiting, while entity["video_game","Bowl Bound College Football","Grey Dog 2015"] still sells itself on detailed recruiting, player development, and deep sim AI. Current official college-football structures matter for scope too: entity["organization","NCAA","college sports governing body"] still treats four contests as the key redshirt threshold in Division I football, permits third-party NIL compensation, and now uses a Jan. 2–16 football transfer window with a head-coach-change exception; the entity["sports_event","College Football Playoff","12 team postseason"] is a 12-team field seeded directly off the final rankings, with four byes to the four highest-ranked teams, and that basic structure continues through the 2026–27 season. citeturn12view21turn12view22turn12view23turn12view12turn12view14turn18search12turn12view15turn12view16turn12view17

I also generated the deliverables you asked for as actual markdown artifacts plus a zip. Start with the comprehensive scope file, then the index.  
- [Download the full zip](sandbox:/mnt/data/cfb_fm_scope_pack.zip)  
- [Open `scope.md`](sandbox:/mnt/data/cfb_fm_scope_pack/scope.md)  
- [Open `00_INDEX.md`](sandbox:/mnt/data/cfb_fm_scope_pack/00_INDEX.md)

## What the research says the game must be

The biggest correction is scope density. If you want this to feel like Football Manager, every major module has to become a workspace, not a page. That means each primary module needs nested tabs, dense tables, saved views, filters, quick actions, staff recommendations, deterministic triggers, and Inbox hooks. The FM sources support exactly that interpretation: the Inbox is the game’s hub, the squad screen is where much of your time goes, squad planning is explicitly multi-season, and staff responsibilities exist to offload day-to-day work without removing the player from the management layer. citeturn12view0turn12view1turn12view2

The college-football translation should not be “FM with helmets.” It should be “FM-style information architecture applied to a roster-churn sport.” That means recruiting becomes the game’s transfer-market equivalent; the portal becomes a second acquisition market; development, eligibility, and redshirts become first-class systems; and admin pressure, fan pressure, boosters, and facilities take over some of the roles that club boards and transfer budgets occupy in FM. The current rules environment reinforces that design choice because portal timing, NIL, and CFP selection all create time-boxed, report-heavy decisions that are naturally suited to an Inbox/Continue loop. citeturn18search12turn12view14turn12view15turn12view16

The benchmarking conclusion is straightforward:

| Pattern | FM | EA Dynasty | Bowl Bound | Your Game | Decision |
|---|---|---|---|---|---|
| Inbox-led management loop | core | partial | weak | core | keep |
| Dense sortable tables | core | moderate | moderate | core | keep |
| Multi-season planner | core | light | moderate | core | keep |
| Staff responsibilities and reports | core | moderate | moderate | core | keep |
| Recruitment as a full workspace | core | strong | strong | core | merge |
| Portal/retention pressure | none | moderate | light | core | reinvent |
| Analytics hub | core | light | light | core | keep |
| Card-heavy overview dashboards | moderate | strong | low | low | drop from primary loop |
| Match spectacle | important but not the core management layer | strong | light | delay | postpone |

That table comes directly out of the official FM manuals and feature pages, EA’s Dynasty page, and Bowl Bound’s official store descriptions. citeturn12view0turn12view1turn12view2turn12view3turn12view4turn12view5turn12view21turn12view22turn12view23

One other research outcome matters: this work did **not** uncover any official open-source code for Football Manager from entity["company","Sports Interactive","game studio"]. The official product is commercial, and the useful “open-source FM-like” references are separate community projects such as entity["video_game","OpenFoot Manager","open source sim"] and entity["video_game","Open Football","rust sim"]. So the right approach is to learn systems from official manuals and feature pages, then use adjacent open-source projects only for architecture patterns and tooling ideas, not for product imitation or code reuse. citeturn13search9turn13search2turn13search3turn13search11turn13search1

## What is in the pack

The pack is split into one master scope file plus supporting specs. The master file is designed to be the architect’s “guiding light,” and the supporting files are sequenced so an AI can execute them in order without drifting.

| File | Purpose |
|---|---|
| [scope.md](sandbox:/mnt/data/cfb_fm_scope_pack/scope.md) | master scope, assumptions, thesis, loops, module list, architecture/testing/roadmap summary |
| [00_INDEX.md](sandbox:/mnt/data/cfb_fm_scope_pack/00_INDEX.md) | exact reading order and iteration protocol |
| [01_NORTH_STAR.md](sandbox:/mnt/data/cfb_fm_scope_pack/01_NORTH_STAR.md) | product creed, anti-patterns, FM-density rules |
| [02_BENCHMARK_TRANSLATION.md](sandbox:/mnt/data/cfb_fm_scope_pack/02_BENCHMARK_TRANSLATION.md) | FM vs EA Dynasty vs Bowl Bound vs Your Game translation table |
| [03_UI_WORKSPACES.md](sandbox:/mnt/data/cfb_fm_scope_pack/03_UI_WORKSPACES.md) | purpose, tabs, fields, controls, inbox items, staff recommendations, triggers, wireframe text for each primary module |
| [04_ATTRIBUTES_AND_SCOUTING.md](sandbox:/mnt/data/cfb_fm_scope_pack/04_ATTRIBUTES_AND_SCOUTING.md) | full player/staff/prospect attributes, hidden traits, scouting confidence model |
| [05_ENTITIES_AND_SCHEMAS.md](sandbox:/mnt/data/cfb_fm_scope_pack/05_ENTITIES_AND_SCHEMAS.md) | ER diagram plus sample JSON for player, staff, prospect, team, season, NIL deal, roster slot, eligibility record |
| [06_RULESETS_AND_CALENDAR.md](sandbox:/mnt/data/cfb_fm_scope_pack/06_RULESETS_AND_CALENDAR.md) | ruleset JSON, season phases, mermaid timeline |
| [07_DATA_PIPELINE.md](sandbox:/mnt/data/cfb_fm_scope_pack/07_DATA_PIPELINE.md) | source classification, script plan, pseudocode for synthetic names and size distributions |
| [08_ARCHITECTURE.md](sandbox:/mnt/data/cfb_fm_scope_pack/08_ARCHITECTURE.md) | React/TypeScript + Electron + deterministic sim-core + SQLite + JSON config + CI/replay architecture |
| [09_TESTING_AND_QA.md](sandbox:/mnt/data/cfb_fm_scope_pack/09_TESTING_AND_QA.md) | headless sim runner, 35 invariants, 20 scenarios, statistical gates, replay format, Playwright smoke tests, AI QA prompts |
| [10_ROADMAP.md](sandbox:/mnt/data/cfb_fm_scope_pack/10_ROADMAP.md) | M1–M20 with scope, dev-time class, acceptance tests, artifacts, and Advanced Setup sandbox hiding |
| [11_AI_SESSION_PROTOCOL.md](sandbox:/mnt/data/cfb_fm_scope_pack/11_AI_SESSION_PROTOCOL.md) | session checklist, refusal rules, prompt templates |
| [99_SOURCES.md](sandbox:/mnt/data/cfb_fm_scope_pack/99_SOURCES.md) | research source inventory |

The data-and-calibration side of the pack is tuned to the best currently accessible sources. entity["organization","CollegeFootballData.com","cfb stats site"] is the right starting point because the official site emphasizes API access, CSV-style exporting, starter packs, and model-training packs, while the public endpoint catalog shows relevant surfaces such as rosters, drive data, advanced box scores, play-by-play, historical polls and rankings, recruiting, and talent-composite data. `load_cfb_rosters()` in cfbfastR explicitly wraps the CFBD team-roster endpoint. entity["company","Kaggle","data platform"] then fills bulk-calibration gaps with large downloadable sets for 2002–2026 game stats, 2013–2023 team-season stats, 2005–2013 player/team/play data, and portal/recruiting data. Official NCAA stats pages and the CFP’s own rules pages are the reference checks; entity["organization","Sports Reference","sports statistics site"] is useful for targeted history checks, but its own data-use and bot-traffic pages are a warning to use it cautiously and sparingly. citeturn12view7turn16view0turn12view8turn17search0turn4search5turn4search3turn4search1turn4search2turn14search0turn12view15turn10search0turn10search1turn10search3

## How the pack expects the AI to execute

The execution stance is deliberately strict. The UI is recommended as React/TypeScript in a desktop shell, but the game truth lives in a separate deterministic simulation core with SQLite saves and JSON rules/config. That separation matters because you want a menus-first game with reliable seed replay, not a UI that accidentally becomes the business-logic owner. The pack therefore makes the AI build in a vertical-slice order: world bootstrap first, then time/inbox, then roster/staff, then recruiting/portal, then finances/admin pressure, then the competition shell, and only after that history/analytics hardening. That sequencing follows both FM’s actual strengths and the practical way college-football data is available today. citeturn12view0turn12view1turn12view2turn12view4turn12view5turn12view21turn12view22turn12view23

The roadmap in the pack runs M1 through M20. The important gating logic is simple. M1–M4 create the repo, rules engine, world bootstrap, and Inbox/Continue loop. M5–M12 build the real game: roster, player profile, depth planner, staff responsibilities, practice/development, recruiting, prospect dossiers, and portal/retention. M13–M17 add money, admin pressure, schedule/results, rankings/CFP, analytics, and history. M18–M20 harden the data pipeline, testing, replay, AI QA, and the Advanced Setup separation so the normal flow stays clean. The result is that a full-season management loop becomes playable before any match-engine temptation gets a chance to swallow the project.

The pack also hardcodes a build-size discipline. The recommendation is to keep the final packaged build in roughly the 50–400MB range by shipping compact generated calibration JSON instead of raw historical datasets, keeping art and audio sparse, and excluding debug/test artifacts from the production build. That range is a product-management recommendation rather than a sourced external requirement, but it is the right constraint if you want fast packaging, fast installs, and low friction for iteration.

## How QA and self-checking should work

The testing posture in the pack is aggressive because this genre collapses if it produces nonsense. The core requirement is a headless season runner that emits structured outputs for teams, players, recruiting, portal, rankings, inbox samples, errors, weirdness reports, and an NDJSON replay log. On top of that, the spec includes more than 30 invariant tests, 20 explicit scenario harnesses, statistical realism gates, Playwright smoke tests for the UI shell, and a markdown AI-QA template that forces the model to identify impossible states, unrealistic outcomes, boring loops, and missing FM-style depth. That is exactly the practical answer to “I can’t possibly run every scenario myself”: you don’t; the sim does, deterministically, and the AI reviews the outputs like a ruthless analyst.

That QA posture is especially important because the modern rules environment creates lots of brittle edge cases: redshirt thresholds, transfer windows and exceptions, NIL abstractions, conference-title logic, and CFP seeding rules are all state machines, not flavor text. The official NCAA and CFP materials are why the pack treats those as ruleset data plus regression tests instead of one-off conditionals buried in UI code. citeturn12view12turn12view14turn18search12turn12view15turn12view16turn12view17

## Research basis and immediate next move

The research basis behind the pack is solid enough to build on without waiting for more clarification. FM’s official manuals and feature pages give you the structural grammar; EA Dynasty and Bowl Bound tell you what college-football players already expect; CFBD, cfbfastR, Kaggle, NCAA stats, and CFP rules provide the calibration and rules backbone. That combination is enough to build a menus-first alpha that feels like Football Manager in information density while also feeling unmistakably like college football. citeturn12view0turn12view1turn12view2turn12view3turn12view4turn12view5turn12view21turn12view22turn12view23turn12view7turn16view0turn12view8turn4search5turn4search3turn4search1turn14search0turn12view15turn12view16

The immediate next move is simple: hand the AI only three files first — `scope.md`, `01_NORTH_STAR.md`, and `10_ROADMAP.md` — and force it to execute **M1 only**. If it tries to jump to a match engine, real schools, or pretty match presentation, it is already off track.