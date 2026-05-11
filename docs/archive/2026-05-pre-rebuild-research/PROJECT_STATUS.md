# Project Status

## Current Snapshot

**Date / session identifier:** 2026-05-03 / M19 Waves 17-18 (Save schema v8 persists all new state + live injuries firing in games + alumni-archive lookup bug fix; 230/230 across 62 suites; full UI smoke walk-through clean)  

**Status: GOOD FOR HUMAN TESTING.** Bootstrap → start career → advance 60 weeks → injuries fire, alumni archive, awards roll, scrapbook composes, save/load roundtrip identical (449KB). Every History tab populates as you play.  

Wave 16: Players' stats persist forever — every season tally adds to `careerStats.totals` and an entry in `careerStats.seasons[]`. When a player departs (graduates, declares for the draft, medically retires, transfers), they're archived permanently in `data.alumniArchive[]` with their full career stat line, awards, and (if applicable) draft round. The 10-year cap on `data.draftClasses` is gone — multi-decade careers get the full pipeline ledger. Coaches who get fired are archived in `data.coachLegacies[]` with tenure + record summary. New "Alumni" tab in History workspace renders Hall of Fame, career leaderboards, and recent departures.  

Wave 15: New `harness/soak.js` runs 12 procedural teams across 20 years per cycle: round-robin games + awards resolution + record-book updates + realignment between years. Multi-seed verification across 3,600 games all passing. Found and fixed a `MIN_CONF_SIZE` lockout bug in the realignment engine that would have prevented any small conference from ever shedding programs. **This satisfies the spec's beta-gate item "20-year sim is stable."**  

Wave 14: 10 season awards (POTY, position awards, COY, Freshman) + per-conference and national All-American teams + 9-stat school record book. Resolves at season rollover before scrapbook so award/record events become historic moments. New "Awards & Records" History tab.  

Wave 13: Programs now jump conferences each offseason based on a 7-input pressure score (ambition vs tier, media value, recent W%, instability, geography, rivalries, booster pressure). Conferences accept/reject by fit + capacity + tier compatibility. Moves emit historic events, persist to `data.realignmentHistory`, and surface in a new History tab.  

Wave 12: Drives can run up to 20 plays so penalty replays don't truncate them. Penalty count + yards now appear per team in the box score under a new "Discipline" group. New `CGM_INJURY` engine with severity bands, position-aware propensity, recovery tick, and per-game pass — ready to wire into `runFullGame` next.  

Wave 11: Recruiting inspector now shows recent rival NIL bid stream per prospect (school · $X.XM · week). REPLAY dispatch covers 5 of the registered reducers — sign + hire fire from portal/staff handlers. Harness validators added per play type (rush share/avg, pass share/avg, penalty rate). Critical bug found: harness shim was missing 9 modules including extras, so penalty rate showed `0%` until fixed — now 6.2% (in band).  

Wave 10: AI schools now bid against the player on top recruits during each weekly tick (synthetic pools by tier; capped 40% per-bid; bumps suitor interest; emits nil_bid events ≥ $0.5M). Penalty events render distinctively in PBP as "FLAG · type · ±yds · accepted".  

Wave 9: Roster inspector now shows the 17-term PORTAL-2 risk profile per player. Penalties replay the down with accept/decline + autoFirstDown for defensive flags. AI schools bid for top recruits via `CGM_AI_NIL` (capped at 40% of pool, scaled by interest + stars + NIL preference). Season-end auto-composer at `rollToNextSeasonYear` archives the scrapbook page to `data.scrapbookArchive`. Live action handlers (advanceCareer, setPracticeEmphasis, applyRecruitingAction) now dispatch to `CGM_REPLAY` — `window.CGM_VERIFY_SESSION()` confirms hash equivalence.

Test harness: **185/185 passing across 47 suites** (was 174/43).  

Wave 8: extras live in engine — weather affects deep+intermediate pass yards (verified: clear 7.83 → heavy_rain 6.21 → wind_25 5.43 yds/attempt), fatigue accumulates per drive with conditioning floor, penalties roll at ~8.5%. Scrapbook now uses CGM_SCRAPBOOK.composeSeasonPage in History tab with tier-coded headlines. Staff inspector shows hot-seat band + reason codes derived from career.record + tenure + booster pressure.  

Wave 7: SCRAPBOOK depth (4-tier importance scoring + season compose), HARNESS scenario fixtures (4/4 PASS including punt-bug regression guard), PERSIST-2 reducer registration for 5 high-leverage actions (replay scaffold now end-to-end functional).

Test harness: **174/174 passing across 43 suites** (was 94/22 at start of session).  

Wave 5: PLAYGEN-CALIBRATION (harness all-rush bug + pass weight tune; combined 54.2, Y/A 6.22, success 36.3% in band) + STAFF-1 (coaching carousel + hot seat + movement effects) + PORTAL-2 (17-term risk formula + AI fit + retention meetings) + MEDIA-1 (voices around the program, wired into Program Desk).

Wave 6: PLAYGEN polish modules (penalties at ~8.5% rate, 7 weather profiles, fatigue propagation with no_huddle / huddle deltas, ST returns with realistic touchback rates). 16 new tests.

Test harness: **156/156 passing across 39 suites** (was 94/22 at start of session).  

Wave 2: Program Desk + Schedule + Rankings + History migrated to workspace shell; Scrapbook + Media Clippings panels shipped via event log.

Wave 3: HARNESS-2 — Node sim runner (`npm run sim`) loads in-browser sim modules via vm shim, runs N games between procedural rosters, writes `harness/runs/seed_N/{summary.json, games.csv, validation_report.md, anomalies.json}`. PERSIST-2 — `CGM_STATE_HASH` (deterministic FNV-1a hash over canonical-JSON projection) + `CGM_REPLAY` (registerReducer / replay / verifyReplay / record) scaffold. Test harness **94/94 passing across 22 suites**.

Wave 4 (PLAYGEN-FIX, same session): HARNESS-2 immediately surfaced two structural bugs in `applyPlayOutcome`:
1. Punt landing position lost — receiving team got the punter's spot.
2. `outcome.yards` vs `outcome.yardsGained` field mismatch — `state.yardsToGoal` and `state.distance` never decremented after any play, so first downs never fired and drives died after 4 plays.

Both fixed in-line. 200-game soak at equal talent: combined score 4.9 → 38.4, Y/A 4.73 → 5.68 (real CFB ~5.6), home win rate 100% → 44%. The harness paid for itself in the same session it shipped.  
**Current milestone:** M19 - UI Rescue Polish Pack adoption (wave 1)  
**Current vertical slice:** the cozy reskin from M18 was judged "decorative cozy skin on a card dashboard" by the new `CFB_FM_UI_RESCUE_POLISH_PACK`. New direction per its master + spec 04/05/06/07: **professional FM-style desktop sim first**, warm program-office atmosphere as subtle accent only. Wave 1 ships: spec-04 dark professional design tokens, workspace shell primitives (ObjectHeader / TabBar / ActionBar / DataGrid / RightInspector / status bar) per spec 05, real `CGM_DATAGRID` module (sticky header, sortable, formatters, badge / meter / rating cell types, selectable rows) per spec 06, and 4 screens redesigned to the new shell as polish-gate benchmarks: Roster Room (spec 07), Recruiting Board (spec 07), Transfer Portal, Staff Room.  
**Working role for this session:** Product/UX implementation agent  
**Build / schema version:** static-prototype-1.0, save schema v7  
**Ruleset version currently assumed:** demo-fictional-0.1  
**Content pack versions currently assumed:** fbs-2026 (default), lakeview-demo-0.9 (fallback toggle)  
**Test status:** 84/84 in-browser tests passing across 20 suites.

## One-Paragraph Status

M12 is now complete in the static prototype. Sandbox setup now includes three additional player-facing knobs: injury cadence, NIL volatility, and progression pace. These settings persist with the existing rules profile, flow through start/save/load, and now influence deterministic live signals: injury-risk read models, NIL/benefit market pressure drift, and morale progression deltas tied to usage promises. Browser QA extends the sandbox script to validate the new controls, and M3-M12 compatibility/regression checks are passing.

## North-Star Check

- Are we still building the office before the stadium? Yes.
- Did any recent work drift toward clone behavior? No; branding, schools, people, and naming are fictional.
- Did any recent work violate fictional-first prototype rules? No.
- Did any recent work hardcode volatile sports rules? No rules engine exists yet; current values are demo content only.
- Is the menus-first yearly loop more complete than it was before this session? Yes. M12 is complete and sandbox setup now drives deeper economy/risk/progression behavior once the yearly loop begins.

## Completed Since Last Update

- Created a static menu prototype with dashboard, roster, recruiting, schedule, staff, training, finance, and rankings screens.
- Extracted `college-football-management-ai-pack.zip` into the workspace.
- Created this active status file and a decision log.
- Aligned the prototype to the pack's Program Desk and primary screen set.
- Added Transfer Portal, Facilities / AD, History, and Analytics Lab menu shells.
- Added blocking Program Desk items and Continue button blocked/ready feedback.
- Split demo world content from `app.js` into `data/demo-world.js`.
- Added deterministic date/week advancement using the demo calendar.
- Added event-driven notifications, including a later generated blocker.
- Added career bootstrap panel for starting or loading the Lakeview demo seed.
- Added local save/load shell using a versioned static-prototype save payload.
- Added save reconstruction from seed data plus calendar index and resolved notification IDs.
- Added startup validation for the demo content pack.
- Added a visible startup error overlay for malformed content.
- Added multiple fictional program choices to the career bootstrap.
- Added deterministic seed-based career generation with a saved world hash.
- Added phase-aware calendar events through opener and postgame review.
- Added Program Desk deep-link actions for notification-linked screens.
- Added autosave after new career, blocker resolution, and time advancement.
- Moved major screen-specific panel rows into content-pack view models.
- Completed M1 acceptance checks.
- Added canonical `playerProfiles` records to the demo content pack with eligibility/redshirt state.
- Added canonical `prospectProfiles` records and Recruiting row-to-profile route flow.
- Added selectable roster rows and a dedicated Player Profile route/panel with action controls.
- Added eligibility/redshirt action shell: redshirt intent, development focus, and game-count shell updates.
- Added threshold-triggered eligibility warning generation for redshirt preservation.
- Added save payload schema v2 with backward-compatible migration from v1 and persisted `playerDecisions`.
- Added depth-chart starter assignment controls and duplicate/empty slot validation.
- Added Program Desk blocking notification generation for illegal depth-chart states.
- Added staff role open/hire interaction shell with candidate lists from content data.
- Added depth chart persistence fields in save schema v2 payload.
- Added opener-phase participation updates that increment game counts for assigned starters.
- Expanded redshirt warning behavior to fire both near-threshold and crossed-threshold states.
- Added dynamic staff delegation quality/readout updates tied to current staff assignments.
- Completed M2 gate checks for eligibility warnings, redshirt game-count tracking, depth validation, and delegation quality updates.
- Read and applied `14_DATA_ACQUISITION_AND_SIM_CALIBRATION.md`.
- Read and applied `15_FM_RESEARCH_AND_OPEN_SOURCE.md`.
- Added data pipeline scaffold directories: `data_raw/`, `data_processed/`, and `game_data/`.
- Updated README governance section with explicit data/calibration and differentiation policy.
- Added recruiting state model with weekly action budget reset behavior.
- Added synthetic prospect pool top-up generation by class and region.
- Added actionable recruiting controls (scout/contact/offer/visit) with action-point costs.
- Added commitment-resolution logic for Lakeview and other-school outcomes.
- Added Recruiting Board class-needs sync and committed-class summary tables.
- Added save schema v3 migration with persisted recruiting state and prospect model state.
- Completed M3 required gate checks in headless runtime.
- Added M4 portal state model with open/closed window gating and countdown metadata.
- Added coach-change exception path that temporarily opens portal actions in closed windows.
- Added retention-risk action economy (conversation/role pitch/benefit boost) with weekly AP resets.
- Added benefit allocation model with hard per-bucket and total-pool caps.
- Added roster-limit compliance warnings and blocking alerts tied to pending portal additions.
- Added donor/fan confidence integration for benefit and retention decision outcomes.
- Added save schema v4 migration and persistence for portal, retention, and benefit states.
- Clarified and enforced the FM skin-swap benchmark interpretation as structural guidance, not copy behavior.
- Completed M4 required gate checks in headless runtime.
- Added season-state model for regular season, postseason stage, and Year 2 rollover continuity.
- Added game-result engine v1 with deterministic seeded outcomes for scheduled fixtures.
- Added schedule/result updates, recent box-score summaries, and career-record synchronization.
- Added standings update flow that re-sorts conference table as results land.
- Added rankings reaction flow tied to win/loss outcomes.
- Added legal four-team CFP bracket construction and semifinal/final resolution shell.
- Added history archival write on completed season.
- Added save schema v5 migration and persistence for season-state fields.
- Completed M5 required gate checks in headless runtime.
- Added M6 pressure model with traceable objective-pressure events and cause lines.
- Added facilities request approve/defer controls with persistent long-term boost tracking.
- Added morale and usage-promise tracking with player-level trace rows and retention-risk coupling.
- Added stewardship-derived Program Home/Facilities/Analytics read-model updates.
- Added history consistency guards for sorted, de-duplicated multi-year archive continuity.
- Added save schema v6 migration and persistence for pressure/culture/facilities state.
- Completed M6 required gate checks in headless runtime.
- Added M7 notification tuning with stream-level anti-spam caps and unresolved non-blocking queue limits.
- Added M7 recruiting board filters (position/status) for faster list refinement.
- Added M7 analytics balance snapshot model with quick sanity-band indicators.
- Added `runSeasonSoak` helper for deterministic multi-season telemetry checks.
- Added `runMigrationGoldenChecks` helper for save migration compatibility verification.
- Completed M7 required gate checks in headless runtime (1/5/20-season soak, no menu dead ends, spam-control criteria, migration checks).
- Added M8 deterministic drive-by-drive game simulation and stored drive logs.
- Added tactical profile controls with clear impact on scoring/volatility.
- Added richer opponent tendency model surfaces for schedule/game-week review.
- Added optional play-by-play text layer tied to completed game output.
- Added advanced data hub read-model metrics (yards/play, success rate, explosive profile, tactical signal).
- Added `runM8PerformanceCheck` helper for simulation runtime guardrails.
- Completed M8 required gate checks in headless runtime.
- Added `runM9BalanceCalibration` helper for tactic-impact spread evidence.
- Added `runM9HardeningCheck` aggregator for runtime + calibration health checks.
- Added analytics "Alpha Hardening" and "Hardening Results" panels with one-click report generation.
- Added browser smoke automation script at `scripts/m9_browser_smoke.js` using Playwright.
- Completed M9 required gate checks (headless + browser smoke) and reran M3-M8 regressions.
- Extracted deterministic simulation logic into `runtime/sim-core.js`.
- Extracted hardening report helpers into `runtime/hardening-core.js`.
- Updated `index.html` script load order to include runtime modules before `app.js`.
- Added compatibility fallbacks in `app.js` so existing direct VM harnesses continue to work without preloading runtime modules.
- Added expanded Playwright regression script at `scripts/m10_browser_regression.js`.
- Completed M10 required gate checks (module wiring, browser regression, and compatibility check).
- Added sandbox bootstrap controls in `index.html` for experience mode, rules presets, and six tuning sliders.
- Added `SANDBOX_RULE_PRESETS` and normalized `rulesProfile` model handling in `app.js`.
- Added save/load/start integration for `career.experienceMode` and `career.rulesProfile`.
- Wired recruiting AP, retention AP, and portal exception duration to sandbox rules profile values.
- Wired scoring environment, volatility, and tactical-impact multipliers into drive simulation payloads.
- Updated `runtime/sim-core.js` to apply sandbox multipliers to offensive baseline, tactical weighting, and variance.
- Added sandbox mode visibility in career chrome (`coachLabel` includes mode).
- Fixed AP rebalance behavior so changed recruiting/retention budgets correctly adjust available AP when max AP changes.
- Added Playwright sandbox customization script at `scripts/m11_sandbox_customization.js`.
- Completed M11 required gate checks (headless compatibility + browser regression + sandbox customization flow).
- Added three new sandbox bootstrap controls: injury cadence, NIL volatility, and progression pace.
- Extended `SANDBOX_RULE_PRESETS` and rules-profile normalization to include the new M12 knobs.
- Wired NIL volatility into deterministic benefit market-pressure drift in `refreshBenefitPressure`.
- Wired progression pace into morale delta scaling for promise/usage outcomes.
- Wired injury cadence into live injury-risk and load-management read-model signals.
- Extended sandbox browser checks to validate new knob effects in Finance and Development screens.
- Completed M12 required gate checks (M3-M8 headless regressions, M10 browser regression, and expanded sandbox customization flow).

## In Progress

- **M19 UI rescue wave 1 is complete in the static prototype.** The new `CFB_FM_UI_RESCUE_POLISH_PACK` (specs 00–10 + master) declared the M18 cozy reskin failed acceptance: the cream/parchment look was a *decorative* skin on top of a card dashboard, not a professional management UI. Hard rule from spec 00: **freeze new feature additions until UI passes the polish gate**. Wave 1 satisfies the gate for the table-workspace pattern.
  - **Spec 04 design tokens** (Classic Management Dark) replaced the cozy palette in `styles.css`. New tokens: `--bg-app #101312`, `--bg-sidebar #171a18`, `--bg-surface #1f231f`, `--bg-elevated #2d332e`, `--text-primary #f0eee7`, `--text-secondary #b9b5a8`, `--text-muted #7f7a6f`, `--border-subtle #343a34`, `--border-strong #4b5149`, `--accent #c7a45b`, `--success/--warning/--danger/--info`. Typography (`--font-ui`, `--font-headline`, `--font-number` with tabular-nums for stats), spacing tokens (1/2/3/4/6/8), radius tokens, shadow tokens. Legacy `--ink/--page/--panel/etc` kept as aliases so unmigrated screens still render.
  - **Spec 05 workspace shell primitives** under new class prefix `fm-` (`.fm-workspace`, `.fm-workspace-main`, `.fm-workspace-content`, `.fm-workspace-status`, `.obj-header`, `.tab-bar`, `.action-bar`, `.inspector`, `.inspector-actions`, `.inspector-badge`). Renamed to `fm-` to avoid collision with the existing `<main class="workspace">`.
  - **Spec 06 DataGrid module** at `js/ui/datagrid.js` (`CGM_DATAGRID`): column definitions with formatters, cell types (`badge`, `meter`, `rating`, `trend`), sortable headers with direction indicators, filter helpers, sticky header, dense 32-px rows with monospace tabular numerics for numeric columns, selectable rows with accent-bordered active state, hover state, empty state. Plus high-level helpers `renderObjectHeader`, `renderTabBar`, `renderActionBar`, `renderInspector`, `renderTableWorkspace`.
  - **Roster Room redesigned** per spec 07. ObjectHeader ("Roster Room / Tennessee · 2026 Preseason Setup / Players 68 · Vibe Stable · High Risk 20 · Record 0-0") + 7 tabs (Players / Depth Chart / Eligibility / Development / Morale / NIL / Transfer Risk) + ActionBar with 5 view modes (General / Attributes / Eligibility / NIL / Development), position + class filters, live-search box, Ask Staff / Export buttons + sortable DataGrid with view-specific columns (Name/Pos/Class/CA/PA/Morale/Risk/Eligibility/Dev for General view; full attribute matrix for Attributes view; etc.) + RightInspector with Top Concern + Transfer Watch when nothing selected, or staff brief / trait labels / stat line / 4 quick-action buttons when a player is selected + status bar. Tab/sort/filter/search persist in `window.CGM_UI_STATE.roster`.
  - **Recruiting Board redesigned** per spec 07: header w/ AP / On Board / Committed / Class Rank meta, 5 tabs (Board / Search / Watchlist / Committed / Pipeline), position + stars + status filters + search, sortable DataGrid (Name/Pos/Class/Stars/Grade/Scouted/Our Int/Leader/Status/Need Fit) showing real `CGM_RECRUITING_V2` suitor data, per-prospect Inspector with Where We Stand + Suitor Board + Scouting metadata + 4 quick recruit-action buttons (scout/contact/offer/open profile that wire to the existing `applyRecruitAction`).
  - **Transfer Portal redesigned**: 3 tabs (Incoming / Outgoing Risk / Compliance), Incoming + Outgoing tabs render their respective tuple arrays as DataGrids with proper badges (High/Medium/Low risk badges), Compliance tab embeds the existing `portalCompliancePanel` inside the new shell, RightInspector shows Strategy meters.
  - **Staff Room redesigned**: 4 tabs (Coordinators / Position Coaches / Open Roles / Delegation), each tab swaps DataGrid columns appropriately, RightInspector shows Head Coach DNA via the existing `coachProfilePanel`. Fixed a pre-existing `titleCaseFromCamel is not defined` bug while wiring this up.
  - **Click delegation** added in `app.js` for `data-roster-tab`, `data-roster-row`, `data-recruiting-tab`, `data-recruiting-row`, `data-portal-tab`, `data-staff-tab`, `data-dg-sort`, `data-insp-action`. Change + input listeners for `data-roster-control`, `data-recruiting-control` (live search + filter selects).
  - **`renderView()`** sets `document.body.dataset.activeView` so CSS hides the legacy program-strip + topbar h2 on workspace screens (Roster / Recruiting / Portal / Staff). Card-grid screens (Program Home, Program Desk, History, Analytics, etc.) keep their existing chrome — they'll migrate in M19 wave 2.
- Spec 04 §"Acceptance Criteria" gate: app looks professional before content loads (✅), tables are readable (✅), nav is polished (✅), buttons are consistent (✅), colors are restrained (✅), team accents work (brass `--accent`), cozy elements are subtle (no parchment in tables), Roster + Recruiting can be implemented without one-off CSS (✅ — both use the same primitives).

- M18 wave is complete in the static prototype. Six packets shipped autonomously without per-packet check-ins:
  - **REC-1 (`js/sim/recruiting/recruiting-v2.js`)** — 13-input weighted interest formula (playingTime, prestige, nilOpportunity, distanceFromHome, schemeFit, coachQuality, winningCulture, developmentTrack, academicFit, facilities, recruiterRelationship, rivalCompetition, campusFit), per-prospect suitor list, leaderboardForProspect helper, maybeCommit logic that requires HS_SR + threshold + clear leader, rolloverProspectClasses (HS_FR → HS_SO → HS_JR → HS_SR → graduate), classDistributionForPool. Tested with 5 suite tests covering formula range, suitor tracking, commit thresholds, class progression.
  - **AI-SCHOOL-2 / AI recruiting (`js/sim/recruiting/ai-recruiting.js`)** — weighted-reservoir picks ~22 acting schools per week, each touches ~4 prospects, runs `applyInterestUpdate`, may extend offers, and fires the unified `maybeCommit` so prospects can land elsewhere. Player-team school is excluded (its interest comes from user actions). Emits commit events to the event log with `player_school_won` / `rival_school_won` reason codes.
  - **PULSE-1 (`js/sim/pulse/campus-pulse.js`)** — 8 PulseComponents (fanMood, studentEnergy, boosterTemperature, localMediaTone, lockerRoomTone, recruitBuzz, nationalPerception, campusTownMood) backed by a `REASON_CODE_IMPACTS` table mapping ~20 named reason codes to per-component score deltas. Pulse reads the last 200 events from the event log, weights by recency (4-week lookback), and produces a `programTemperature` rollup with labels (Euphoric / Hopeful / Steady / Restless / Angry / Checked Out) and ↑ — ↓ trends derived from the prior snapshot.
  - **NIL-1 (`js/sim/nil/nil-engine.js`)** — per-program NIL pool with starting size scaled by nilTier × fanBase, weekly recharge tied to booster temperature score from Pulse, pledgeToProspect that decrements pool + records in pledgesThisCycle + emits `nil_collective_swing` reason code, pledgeInterestBump that scales with prospect.preferences.nil weight, year-rollover spend reset, compliance flagging when spend > 1.5× cap.
  - **DRAFT-1 (`js/sim/draft/draft-engine.js`)** — `shouldDepart` (SR always, GR/5th always, JR sometimes if OVR ≥ 84 and ambition ≥ 12), `projectDraftTier` mapping OVR + small variance to one of 8 tiers (R1 lock down to Undrafted), `processSeniorOutflow` mutates roster + builds archive row + emits draft-departure events with severity scaled by round.
  - **VIBE-RESKIN-1 (`styles.css`)** — palette inversion from dark esports dashboard to cozy cream + brass + forest-green + barn-red, per `CFB_FM_UI_NARRATIVE_VIBE_PACK/02_VISUAL_DESIGN_SYSTEM_COZY_NOSTALGIC.md`. Fonts shifted toward Georgia serif on headings/strong text. Body uses warm-paper gradient instead of the prior dark linear gradient. Sidebar reads as a tabbed binder spine. Panels render as parchment cards with a subtle box shadow. Trait badges remapped to brass/moss/barn instead of mint/red.
  - **STAT calibration tuning (`js/sim/playgen/play-resolver.js`)** — `passBucketWeights` rebalanced. Mass pulled out of chunk/explosive/breakaway and into incomplete + short_comp + successful (4–14 yd buckets). Effect: Y/A across a 12-game season dropped from ~11.92 to ~9.14, completion% from 70.8% to 67.8%, top QB TDs from 24 to 17 (more in real CFB elite-but-mortal range). Real CFB target is ~7.5; further tuning recommended once scenario fixtures land.
- App.js wiring:
  - `ensureProspectSuitors`, `runWeeklyAiRecruitingTickIfNeeded`, `recomputeCampusPulse`, `ensureNilState`, `tickNilWeekly`, `processYearEndDraftOutflow` — all wired into career start, weekly continue, post-game flow, and year rollover.
  - National Top 10 / 25 already pulls from AI standings (M17); now also enriched by reason codes from this wave.
- New UI panels:
  - **Program Home** → Campus Pulse panel (8 components + temperature with reason-coded recent drivers).
  - **Recruiting** → Suitor Board panel (top contested HS_SR prospects with the 3 leading suitor schools and interest scores).
  - **Finances / NIL** → NIL Pool panel (pool / cap / weekly recharge / season spend / compliance flags / recent pledges).
  - **History** → NFL Pipeline panel (year-by-year departing class with draft tiers and top-5 names).
- Verified: full 12-week Tennessee season produces a believable Pulse temperature (Steady 66 with Fan Mood Hopeful 78 ↑), 16/16 prospects with suitor lists, 9 commits this season, NIL pool $23.08M / $31.40M cap, top QB stat line at 9.14 Y/A (down from 11.92).

- M17 wave is complete in the static prototype: Action+Event log, AI school weekly tick, and an in-browser invariant harness.
  - `js/sim/persistence/event-log.js` — PERSIST-1 event log: typed `Event` records with 19 categories (game_played, drive_finished, score_change, turnover, injury, recruit_action, recruit_commit, transfer_in/out, player_breakout/regression, facility_upgrade, season_rolled, ranking_change, promise_made/broken, media_clip, season_award, milestone) and 5 severities (trivial / minor / notable / major / historic). Indexes by category + actor for O(1) filtering. `pruneLog` keeps all major+historic and trims trivial-first when over `maxRetained`. Serialization helpers for save/load.
  - `js/sim/persistence/action-log.js` — PERSIST-1 action log: typed `Action` records with 22 decision types (career_start, continue_advance, depth_chart_set, redshirt_decision, dev_focus_change, promise_made, practice_emphasis_set, recruit_action/offer, portal_action, retention_action, facility_request, tactical_profile_set, tempo_set, playbook_install, staff_hire/fire/extension, scenario_loaded, rules_profile_changed, save_loaded, ai_school_decision). Each action carries `patchBefore`/`patchAfter` for replay support and `reasonCodes` for narrative consumers.
  - `js/sim/ai/ai-school.js` — AI-SCHOOL-1: lightweight per-week rival game sim. `initStandings(programs)` creates a record per team. `runWeeklyAiSchoolTick({...})` shuffles unmatched teams, pairs same-conference 70% of the time, simulates each game via a rating-driven beta-ish distribution with sandbox volatility, applies wins/losses + rating drift (small bumps for quality wins/losses), returns the events. `resetSeasonRecords` zeros W/L on year rollover but preserves rating drift across seasons. `topTeams` sorts by rating with W-L tiebreaker.
  - `js/sim/qc/invariants.js` — HARNESS-1 lite: 12 structural invariants covering programId resolution, depth-chart validity, roster composition minimums, season record consistency, AI standings size, plausibility of rival W-L count vs schedule length, schedule has 12 games, season stat book vs games played, player stat book keys are real player ids, event log presence, and CFP bracket size matches the 12-team format. Returns ReconciliationResult-shaped entries.
- Save schema bumped from v6 to v7 (DL-20260502-03 mirrored TS contract; SQLite migration deferred). Migration adds empty `actionLog`, `eventLog`, `aiSchoolStandings` to v6 saves on load. Migration golden checks loop now covers v1–v7.
- App.js wiring:
  - `ensureEventLog` / `ensureActionLog` / `logEvent` / `logAction` helpers route through the typed factories with try/catch fallbacks. Logs are eagerly initialized at career start.
  - `startNewCareer` emits a `career_start` action and a `season_rolled` event, plus initializes `aiSchoolStandings` from the active programs list.
  - Each completed game emits a `game_played` event with severity scaled by margin/rivalry, runs `runAiSchoolWeeklyTickIfNeeded(weekIndex)` to sim the rest of the country's games for the same week, bumps the player team's record into the AI standings, and emits a `media_clip` event summarizing the world tick.
  - Year rollover calls `resetAiSchoolForNewSeason` and emits a `season_rolled` event.
  - National Top 25 generator now reads from `aiSchoolStandings` (real wins/losses + drifted rating + recent-result trend) instead of the legacy patchwork — Top 10 looks like a real CFB final-week poll (Georgia 10-2, Ohio State 12-0, Tennessee ★ 8-4, Texas 10-2, Alabama 10-2, Oregon 11-1, etc.).
- New UI panels on Analytics Lab:
  - **Recent Events** — last 12 events with severity badges (major/notable/minor) + category + week + reason codes.
  - **Recent Actions** — last 10 user/AI decisions.
  - **Validation Harness** — runs all 12 invariants on demand and surfaces pass/warn/error counts + the failing IDs and messages.
- Verified: 134 rivals played 1596 total games over a 12-week season (full ~12 games each), W-L spread 12-0 down to 0-12 in plausible distribution. 0 invariant errors / 0 warnings on a clean season.

- M16 PLAYGEN + per-player stats wave is complete in the static prototype. The drive sim is now per-play; team and player stats are real CFB numbers.
  - `js/sim/playgen/game-state.js` — PLAYGEN-1: GameState factory + Situation classifier (downDistanceBucket/fieldZone/clockState/scoreState/gamePhase) + applyPlayOutcome state machine that handles down advancement, first down resets, turnover on downs, possession swaps, and period transitions.
  - `js/sim/playgen/play-selector.js` — PLAYGEN-2: situation-aware offensive PlayCallContext picker (inside_run/outside_run/quick_pass/intermediate_pass/deep_pass/play_action/screen/punt/field_goal/kneel/spike) with 4th-down decision tree (FG range, punt distance, going-for-it triggers) and a defensive response selector (front/coverage/pressure).
  - `js/sim/playgen/play-resolver.js` — PLAYGEN-3: per-play outcome resolver that runs MATCHUP composite resolvers, samples yards from spec-compliant distribution buckets (loss/stuffed/short_gain/successful/chunk/explosive/breakaway for runs; sack/incomplete/short_comp/successful/chunk/explosive/breakaway/interception for passes), picks participants via top-of-roster + role weighting (QB1, HB1 ~62% / HB2 ~28% / HB3 ~10%, WR1 ~30% / WR2 ~22% / WR3 ~15% / TE ~14% / RB checkdown ~10%, EDGE rotation), and emits a structured PlayEvent with full participants block.
  - `js/sim/playgen/drive-engine.js` — PLAYGEN-4: orchestrates a single drive (select → resolve → emit → transition → repeat) until score / turnover / punt / period end.
  - `js/sim/playgen/game-engine.js` — PLAYGEN-5: top-level `runFullGame` that alternates possessions through `runDrive` and produces { events, drives, score, advanced, matchupSnapshot } in the legacy result shape sim-core expects.
  - `js/sim/stats/player-stat-accumulator.js` — STAT-4..7: walks PlayEvents that carry participants and credits per-player passing (att/comp/yards/td/int/sacks_taken), rushing (att/yards/td/longest), receiving (tgt/rec/yards/td/longest), and defense (sacks/ints) lines. Includes NCAA passer rating formula and topByStat helpers.
- Sim wiring: `runtime/sim-core.js` now prefers `CGM_GAME_ENGINE.runFullGame` when modules are loaded, falling back to the legacy drive-level scoring for the headless harness. Result shape is preserved so all existing UI keeps working.
- Stat accumulation: post-game flow now builds a per-game `lastPlayerBook` and rolls it into a season-cumulative `seasonPlayerBook` (player-id keyed: passers/rushers/receivers/defenders).
- New UI panels:
  - **Player Profile**: "Season Stats" panel with full passing / rushing / receiving / defense breakdowns and derived stats (Y/A, YPC, YPR, comp%, catch%, NCAA passer rating).
  - **Analytics Lab**: "Stat Leaders" panel pinned at top showing top 5 in passing yards, passing TDs, rushing yards, rushing TDs, receiving yards, receptions, sacks, interceptions across the player's roster.
- Verified: a 12-game Tennessee season produces Hunter Brooks 204/288, 3434 yards, 24 TD/3 INT, 196.4 rating; Cameron Sullivan 128 carries / 978 yards / 6 TD; Tyler Sullivan 69 catches / 1016 yards / 6 TD. Per-game stats land in real ranges (Alabama-Tennessee box score: 314 yards on 40 plays = 7.85 yards/play).
- 11 test suites / 47 passing covers PLAYGEN state transitions, play selector situational behavior, end-to-end game determinism, lopsided matchup resolution (strong team wins ≥9/12), player stat credit (passing/rushing/receiving/sack/int), NCAA passer rating math, and season accumulation.

- M15 first wave of spec-pack adoption is complete in the static prototype. New module tree at `js/sim/` mirrors the spec's TypeScript structure as plain JS:
  - `js/sim/test-runner.js` — tiny in-browser test harness, auto-runs at DOMContentLoaded, writes summary to `window.CGM_TEST_RESULTS`.
  - `js/sim/matchup/attribute-registry.js` — MATCHUP-1: 18 unit definitions (qb_passing, ol_pass_block, edge_pass_rush, cb_coverage, etc.) computed from the existing 36-key 1-20 `attrs` and OVR-sorted top-N picks per position.
  - `js/sim/matchup/matchup.js` — MATCHUP-2: pure `resolveMatchup` engine with the spec's `advantage / confidence / reasonCodes` output shape, plus `resolvePassMatchup` and `resolveRunMatchup` composite resolvers and a `projectPlayOutcome` helper. Reason code catalogue covers 30+ named codes mapped to offense/defense side and human messages.
  - `js/sim/events/play-event.js` — STAT-2: PlayEvent factory with the spec's full field set (clock, field position, players, scoring, turnover, penalty, statEligibility, reasonCodes), `PLAY_TYPES` / `CHARGED_TYPES` / `OUTCOMES` validation sets, and `indexByDrive` grouping.
  - `js/sim/dev/dev-engine.js` — DEV-1: `computeDevelopmentProfile` + `runWeeklyDevTick` + `runOffseasonDevTick`. Profile is derived from `devCurve`, `pot - ovr` gap, `hidden.workEthic`, `hidden.coachability`, year-based `physicalMaturity`, and produces `{ growthMultiplier, breakoutChance, regressionRisk, stagnationRisk, classWeights }`. Weekly tick respects per-class weights so FRs grow physical, SRs grow IQ.
  - `js/sim/stats/stat-taxonomy.js` — STAT-1: ~25 official-style team stats with full StatDefinition records (id, displayName, owner, category, classification, sourceEvents, aggregation, displayFormat, description). Includes derived stats (yards_per_play, completion_pct, etc.) plus the NCAA sack-yardage-as-rushing rule baked in.
  - `js/sim/stats/stat-accumulator.js` — STAT-3 lite: `buildGameBook(events, meta)` walks PlayEvents and produces `{ home, away, meta }` team stat lines, `accumulateLineInto` rolls game lines into season totals, `reconcileGameBook` runs box-score consistency invariants and returns ReconciliationResult entries.
  - `js/sim/tests/*.js` — 30 in-browser tests across 7 suites covering all of the above.
- Sim wiring (`runtime/sim-core.js`): the existing drive-by-drive sim now computes both teams' unit ratings via MATCHUP-1, runs `resolvePassMatchup` / `resolveRunMatchup` per drive, derives drive scoring base from the resulting advantage (instead of the legacy prestige proxy), captures reason codes, and emits a structured PlayEvent per drive with charged play types. Falls back to the prestige proxy if the matchup modules aren't loaded.
- Opponent roster cache (`rosterForOpponentName` in app.js): lazily generates a full 75-player roster for any FBS opponent on first request and caches it on `data.opponentRosters` keyed by team id, so MATCHUP has both sides' attrs available.
- DEV-1 layer in `simulateEntityDrivenDevelopmentTick`: detects breakouts (high gain week + Boom/Bust curve + young player with potential gap) and late-career regression warnings, capped at 2 breakouts + 1 regression notification per tick to avoid spamming the inbox. Stashes a `developmentReport` on `cultureState` that the new Dev Report panel reads.
- New UI panels:
  - **Schedule view**: "Why It Happened" reason-code rollup + side badges, "Last Game Stats" (full categorical box score derived from STAT-3 accumulator), "Season Stats" (running totals through the season).
  - **Development view**: "Dev Report" panel (week, breakouts, regressions, stagnations + named lists with up/down trait badges).
- Architecture decision logged as DL-20260502-03: plain-JS modules under `js/sim/` with mirrored TS contracts, no Vitest/no build step. Future migration to a TS engine package is mechanical because exports already match the spec's shape.

- Honest limitation: PlayEvent emission is currently 1 event per DRIVE (one stand-in event), not per play. STAT-3 numbers are correctly aggregated from whatever events exist, but per-play decomposition (PLAYGEN-2..N) is required before pass attempts / yards-per-carry land in realistic ranges. Rushing yards/carry currently shows ~17 instead of ~5 because each "carry" represents an entire drive's yards.

- M14 FBS content pack is complete. The game now defaults to a full 134-team FBS universe with real conference alignment (SEC, Big Ten, Big 12, ACC, Pac-12 rebuild, AAC, MWC, Sun Belt, MAC, CUSA, Independents). Content pack toggle in bootstrap UI lets users switch back to the Lakeview demo for testing.
- New file: `data/fbs-world.js` — single self-contained content pack that exposes `window.CGM_FBS_WORLD`. Each team has: id, name, shortName, 2-letter crest, real conference, state, city, primary+secondary color hex, nickname, rival, programRating (50-95), historicalRatings[2021-2025], projectedRatings[2026-2030], recruitingTier (1-9), nilTier (1-9), fanBase (small/medium/large/massive), brandRecognition (40-99). Tuple format keeps the team data dense (~134 lines) and a builder function expands them into full `programs` records plus matching coach/school/stadium profile records auto-derived from each team's programRating + fanBase (so the schema validator passes for any team).
- Content pack switcher: `app.js` now reads `localStorage["cgm.contentPack"]` (default "fbs") at module load and selects `window.CGM_FBS_WORLD` vs `window.CGM_DEMO_WORLD` accordingly. Bootstrap UI gets a new `#contentPackSelect` dropdown that persists the choice and reloads.
- `synthesizeRosterFill` now scales OVR by team `programRating`: starters at Alabama (rating 91) land 87-99, starters at Akron (rating 52) land 65-78. Same procedural fill, same trait/scout systems, but rating shapes the talent distribution.
- AI program states (other 133 teams) now seed from each team's `programRating` instead of a flat default 50, so the National Top 25 displays believable ratings (Ohio State 98, Georgia 95, Texas 95, Oregon 95, Michigan 93, Alabama 92, LSU 92, Penn State 91, Clemson 91, Oklahoma 89, Notre Dame 89...) instead of every team showing 60.
- Pre-season records: AI teams now show "0-0" until the player has played at least one game, instead of pre-populating fake "3-2" records before kickoff.
- Default starting team is **Tennessee** (recognizable mid-elite program, SEC, real schedule including Maryland / at Michigan State / Georgia / at Texas / Houston / at LSU / Oklahoma / at Ole Miss / Kansas / at Auburn / Missouri / at Alabama with rivalry-week tagging).
- Player names remain fully fictional (procedural pool); only school/town/conference/color data is real. Personal-use only — pack should not be redistributed.
- Honest scope note: "next 5 years" projections are educated trajectory guesses (program momentum, recruiting tier, recent results), not prediction. Knowledge cutoff January 2026 — the 2025 CFP final is on the cutoff edge so 2025 champion specifics may be off.

- M13 first-play depth pass also remains complete in the static prototype (procedural roster + world expansion + 12-team CFP + Practice Emphasis).
- Procedural roster fill: career bootstrap now expands the 6 named demo players into a ~75-player scholarship roster respecting realistic CFB position composition (4 QB / 5 HB / 9 WR / 4 TE / 2 LT / 3 OT / 4 OG / 2 C / 4 EDGE / 3 DE / 5 DT / 8 LB / 6 CB / 5 S / 2 K / 1 P / 1 LS), deterministic from `career.seed`, with class distribution skewed by depth (starters older, deep depth younger).
- Each procedural player gets a position archetype from `PROSPECT_ARCHETYPES`, a derived devCurve + potentialGrade, OVR/POT bands by depth, generic 36-key `attrs` (via new `playerDefaultGenericAttrs`), `posAttrs` (via `playerDefaultPosAttrs`), and `hidden` personality (via `playerDefaultHidden`). Existing `ensureCultureState` backfills morale + promises automatically.
- Procedural world fill: `synthesizeWorldFill` expands the conference standings to 12 teams, generates a Top 25 national poll from demo programs + procedural fill, and grows the regular-season schedule to 12 games over Aug 30–Nov 22 with deterministic Home/Away splits.
- Replaced the legacy 4-team CFP with the 12-team bracket: top 4 seeds get first-round byes, seeds 5–12 play first-round games, then quarterfinal/semifinal/championship walk through `playPostseasonRound` deterministically.
- Added Practice Emphasis weekly choice (Balanced / Conditioning / Schemes / Position Drills / Recovery) on the Development screen. The active emphasis multiplies dev-tick `growthBudget`, biases gain toward mental keys when "Schemes", adds a posAttr tick when "Position Drills", tilts `injuryRiskSignalScore` ±, and applies a per-week morale delta to all rostered players via `updatePlayerMorale`.
- Replaced static "Weekly Focus" agenda panel with the new interactive Practice Emphasis panel (active label + blurb, 5 buttons, weekly-effects readout, recent-weeks history).
- Updated panel labels: "National Top 10" → "National Top 25"; "Four-team field shell" → "12-team field — top 4 seeds get first-round byes".

## Blockers

- No active technical blockers.

## Key Decisions Made This Cycle

- `DL-20260501-01` - Treat the planning pack as the project governance source.
- `DL-20260501-02` - Keep the current slice static and menu-first while aligning names and screens to the pack.
- `DL-20260501-03` - Use a static content pack and deterministic event deck for the prototype loop.
- `DL-20260501-04` - Store only compact prototype save state and rebuild deterministic content on load.
- `DL-20260501-05` - Validate prototype content at startup before state cloning.
- `DL-20260501-06` - Complete M1 in the static prototype and move next to M2 profile foundations.
- `DL-20260501-07` - Add M2 profile routes/actions and introduce save schema v2 migration compatibility.
- `DL-20260501-08` - Add depth validation blocker flow and staff hire/fire interaction shell for M2.
- `DL-20260501-09` - Complete M2 in the static prototype and advance next to M3 recruiting depth.
- `DL-20260501-10` - Adopt new data acquisition and benchmark-translation governance for M3+.
- `DL-20260501-11` - Complete M3 recruiting loop and move next to M4 retention/portal systems.
- `DL-20260501-12` - Complete M4 retention/portal/benefit loop and move next to M5 season shell.
- `DL-20260501-13` - Treat FM skin-swap wording as benchmark shorthand in "what the game is" while preserving legal distinctness requirements.
- `DL-20260501-14` - Complete M5 season competition shell and move next to M6 stewardship depth.
- `DL-20260501-15` - Complete M6 stewardship depth and move next to M7 balance/soak refinement.
- `DL-20260501-16` - Complete M7 balancing/soak/UX refinement and move next to M8 simulation/presentation depth.
- `DL-20260501-17` - Complete M8 simulation/presentation slice and move next to alpha hardening/modularization.
- `DL-20260501-18` - Complete M9 hardening pass and move next to M10 modular architecture cleanup.
- `DL-20260501-19` - Complete M10 modular runtime extraction and move next to M11 loader/architecture continuation.
- `DL-20260501-20` - Prioritize sandbox-first customization as the immediate product direction and complete M11 foundation wiring.
- `DL-20260501-21` - Complete M12 sandbox depth by wiring injury/NIL/progression controls into deterministic runtime signals.
- `DL-20260502-01` - M13 first-play depth pass: procedurally fill roster + world + adopt 12-team CFP + add weekly Practice Emphasis. Driven by direct user feedback ("fix whatever you think needs to be fixed for me to enjoy it") after a live tour confirmed depth was hidden behind a 6-player demo roster, 5-game schedule, 3-team rankings, and a static Development screen.
- `DL-20260502-02` - M14 FBS content pack: add `data/fbs-world.js` with all 134 real FBS schools across 11 conferences and make it the default world; keep Lakeview demo as fallback toggle. User-driven scope shift: "We are building a full game. Not a spec." Personal-use, non-distro per user direction. Player names stay fictional.
- `DL-20260502-03` - M15 architecture: translate new spec packs to plain-JS modules under `js/sim/` mirroring TS contracts. No Vitest/no build step. Future TS migration is mechanical. See full entry in DECISION_LOG.md.
- `DL-20260502-04` - M15 first wave packets: MATCHUP-1/2 + STAT-2 PlayEvent + DEV-1 + STAT-1/3-lite + Why/Dev/Stats UI panels.
- `DL-20260503-01` - M16 PLAYGEN-1..5 + STAT-4..7: per-play decomposition + per-player stat accumulator. Sim now produces real CFB stat lines.
- `DL-20260503-02` - M17 PERSIST-1 + AI-SCHOOL-1 + HARNESS-1 lite: action/event log with v6→v7 save migration, 134-team rival weekly game sim, and 12-invariant in-browser validation harness. National Top 25 now derives from real W-L records.
- `DL-20260503-03` - M18 autonomous wave: REC-1 + AI-recruiting + PULSE-1 + NIL-1 + DRAFT-1 + VIBE-RESKIN-1 + STAT calibration shipped in one session. 84/84 tests across 20 suites. Full details in DECISION_LOG.md.
- `DL-20260503-04` - M19 UI rescue wave 1: feature freeze + spec 04 dark-pro tokens + workspace shell primitives + DataGrid module + Roster/Recruiting/Portal/Staff redesigned to FM-style table workspaces. Full details in DECISION_LOG.md.

## Files Created Or Updated

- `ai-pack/college-football-management-ai-pack/*`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- `README.md`
- `index.html`
- `styles.css`
- `app.js`
- `data/demo-world.js`

## Systems Affected

- [x] menu shell / navigation
- [x] inbox / event system
- [x] roster / eligibility / redshirt
- [x] recruiting
- [x] transfer portal / retention
- [x] staffing / delegation
- [x] finance / benefits / facilities
- [x] schedule / results / box scores
- [x] rankings / conference / CFP
- [x] history / trophy room
- [x] analytics / dashboards
- [x] save/load / migrations
- [x] schemas / content packs
- [x] tests / QA / balance
- [x] documentation

## Tests Run This Cycle

- Static file read / parse check - PASS - confirms the main files exist and `app.js` parses as JavaScript.
- HTML reference check - PASS - confirms `index.html` references the expected CSS and JS files.
- ASCII check - PASS - confirms edited project files use ASCII-only text.
- Minimal DOM execution check - PASS - confirms the app initializes on Program Desk with two blockers and expanded navigation.
- Deterministic advance check - PASS - resolving two blockers advances to Tuesday, and the next advance creates a Wednesday blocker.
- Save/load reconstruction check - PASS - saving Tuesday state and loading it restores date, resolved blockers, and event-driven messages.
- Post-load advance check - PASS - loading a Tuesday save and continuing creates the Wednesday blocker.
- Content validation success check - PASS - the current demo content pack validates and boots.
- Content validation failure check - PASS - malformed content throws a clear field-level error and renders the startup error overlay.
- Continue blocker gate - PASS - Continue does not advance while blocking Program Desk items are unresolved.
- Deterministic generation check - PASS - same seed and program produce the same world hash, while a different seed changes it.
- Deep-link check - PASS - Program Desk Open actions navigate to linked primary screens.
- Phase transition check - PASS - calendar phases progress in valid order.
- Autosave check - PASS - new career, blocker resolution, and advancement write local save state.
- Full M1 preseason path check - PASS - clearing blockers advances from Program Home through postgame review and reaches the M1 completion item without dead ends.
- M2 parse check - PASS - updated `app.js` and `data/demo-world.js` parse cleanly after profile route/action additions.
- M2 headless boot check - PASS - stubbed DOM runtime initializes with the new profile models and route wiring.
- M2 profile data integrity check - PASS - demo world contains expected player and prospect profile record counts.
- M2 slice-two parse check - PASS - `app.js` and `data/demo-world.js` parse cleanly after depth/staff updates.
- M2 slice-two headless boot check - PASS - runtime initializes with depth chart and staff candidate models present.
- Depth validation blocker check - PASS - invalid depth assignments now generate a Program Desk Must Respond blocker.
- M2 final parse check - PASS - all updated JavaScript files parse cleanly after event/delegation logic additions.
- M2 final headless boot check - PASS - stubbed DOM runtime initializes after all M2 completion updates.
- Eligibility warning gate - PASS - preserve-intent players now emit near-threshold and crossed-threshold warnings.
- Redshirt game-count gate - PASS - opener-phase participation increments starter game counts and persists to save decisions.
- Delegation quality gate - PASS - staff role openings and hires update delegation recommendation rows dynamically.
- Browser render check - NOT RUN - Playwright is not installed in this workspace.
- Docs 14/15 ingestion check - PASS - both new governance docs were read and reflected in project policy/docs.
- M3 parse check - PASS - `app.js` and `data/demo-world.js` parse cleanly after recruiting-loop additions.
- M3 gate check bundle - PASS - prospect pools generate with class/region coverage, actions change interest and consume budget, commitment states stay consistent, and class summary rows stay synchronized with board/commit counts.
- M4 parse check - PASS - `app.js` and `data/demo-world.js` parse cleanly after portal/retention/benefit additions.
- M4 gate check bundle - PASS - portal actions are blocked while the window is closed, coach-change exception opens actions, retention benefit boosts consume retention budget and reduce risk, benefit over-allocation is rejected, and roster-limit compliance blockers appear when pending additions exceed the configured limit.
- M3 regression check - PASS - recruiting action impact and class-summary synchronization still pass after M4 updates.
- M5 parse check - PASS - `app.js` and `data/demo-world.js` parse cleanly after season/CFP/rollover additions.
- M5 gate check bundle - PASS - full season sim runs headlessly, standings and rankings react to results, CFP bracket shape is legal, and Year 2 rollover resets the active record while preserving season archive state.
- M3/M4 regression check - PASS - recruiting and retention/portal core gates still pass after M5 updates.
- M6 parse check - PASS - `app.js` and `data/demo-world.js` parse cleanly after stewardship state and UI additions.
- M6 gate check bundle - PASS - objective pressure changes are traceable, facility requests alter long-term state, morale reacts to usage/promise shifts, and history continuity remains consistent across repeated year rollovers.
- M5 regression check - PASS - season simulation, CFP shell, and Year 2 rollover still pass after M6 updates.
- M3/M4 regression check - PASS - recruiting and portal/retention gates still pass after M6 updates.
- M7 parse check - PASS - `app.js` parses cleanly after notification tuning, filter UX controls, and soak helper additions.
- M7 gate check bundle - PASS - major menus render without dead ends in headless runtime, migration golden checks pass, and 1/5/20-season soak checks pass with no impossible-state hits.
- M7 notification control check - PASS - max unresolved non-blocking notifications remained within configured cap during 1/5/20-season soak runs.
- M3-M6 regression check - PASS - recruiting/portal gates, season rollover, and stewardship traces still pass after M7 updates.
- M8 parse check - PASS - `app.js` parses cleanly after drive simulation and presentation-layer additions.
- M8 gate check bundle - PASS - drive summaries match box-score totals, tactical profile changes produce distinct scoring outcomes, and performance check stays within configured runtime guardrails.
- M3-M7 regression check - PASS - milestone gates from recruiting through soak/migration remain green after M8 updates.
- M9 parse check - PASS - `app.js` and `scripts/m9_browser_smoke.js` parse cleanly.
- M9 gate check bundle - PASS - hardening report API passes, calibration spread meets threshold, and M8 drive/box consistency remains intact.
- M9 browser smoke check - PASS - Playwright script confirms major menu navigation and M8/M9 control interactions.
- M3-M8 regression check - PASS - prior milestone gates remain green after M9 updates.
- M10 parse check - PASS - `app.js`, `runtime/sim-core.js`, `runtime/hardening-core.js`, and `scripts/m10_browser_regression.js` parse cleanly.
- M10 gate check bundle - PASS - runtime module wiring is functional, hardening checks still pass, and simulation output remains coherent.
- M10 browser regression check - PASS - Playwright regression script validates nav/filter/tactic/hardening/continue interactions.
- M10 compatibility check - PASS - direct VM harness running only `app.js` (without runtime preloads) still passes core compatibility gate.
- M11 parse check - PASS - `app.js`, `runtime/sim-core.js`, and `scripts/m11_sandbox_customization.js` parse cleanly after sandbox customization additions.
- M11 sandbox browser check - PASS - Playwright script confirms sandbox mode label, custom AP/portal settings reflection, and continue-flow interaction.
- M12 parse check - PASS - `app.js`, `index.html`, and `scripts/m11_sandbox_customization.js` parse cleanly after M12 knob additions.
- M12 sandbox browser check - PASS - Playwright script confirms custom NIL volatility and injury/progression settings surface in Finance/Development signals.
- M10 regression rerun - PASS - Playwright regression script remains green after M12 changes.
- M3-M8 compatibility rerun - PASS - headless milestone checks remain green after M12 rules-profile wiring.

## Save / Migration Impact

- A prototype save payload exists in browser local storage under `cgm.demoCareer.v1`.
- Save schema remains version 6 for M11.
- M12 extends `career.rulesProfile` keys with injury/NIL/progression percentages while preserving backward-compatible normalization defaults for older saves.
- Version 6 persists pressure state, culture/promise state, and facilities impact state in addition to prior v5 fields.
- M11 extends v6 payload usage with persisted `career.experienceMode` and `career.rulesProfile` (backward-compatible defaults applied when missing).
- M7 adds automated golden migration checks validating v1 -> v6, v2 -> v6, v3 -> v6, v4 -> v6, v5 -> v6, and v6 passthrough behavior.

## Data / Rules Impact

- Current demo data is illustrative and not a ruleset.
- Demo content is now separated into `data/demo-world.js`.
- Startup validates career, calendar, notifications, table tuple lengths, notification severity taxonomy, duplicate notification IDs, and the career/calendar link.
- Content pack now includes fictional programs, phase order, event target views, view-model rows, canonical player profiles, and canonical prospect profiles.
- Data validation now checks structured player/prospect profile records and optional persisted player decision entries.
- Data validation now also checks depth chart starter state, staff openings, and staff candidate pools.
- Data validation now checks recruiting state shape and richer optional prospect model fields (confidence, commitment, flags).
- Data validation now checks portal state shape, retention state shape, and benefit bucket allocation state.
- Data validation now checks season-state shape for record, postseason stage, played games, bracket rows, and rollover flags.
- Data validation now checks pressure-state, culture-state, and facilities-state structure for M6 stewardship systems.
- M7 adds runtime balance instrumentation helpers for soak evidence (`runSeasonSoak`) and migration compatibility checks (`runMigrationGoldenChecks`).
- M8 adds runtime simulation helpers for drive-level outputs and performance guardrails (`runM8PerformanceCheck`).
- M9 adds runtime hardening helpers (`runM9BalanceCalibration`, `runM9HardeningCheck`) and browser smoke automation hooks.
- M10 adds runtime module boundaries (`runtime/sim-core.js`, `runtime/hardening-core.js`) while preserving fallback execution for legacy harnesses.
- `06_RULES_AND_WORLD_MODEL.md` does not need revision yet.

## UX / Player-Impact Summary

The player can now do everything from M1-M9 plus benefit from M10 stability upgrades: runtime logic is split into dedicated modules, browser regression coverage is broader, and existing automation harnesses remain compatible.

## Known Risks

- The static app now has more route/state branching (`player`, `prospect`, portal/finance actions) and more interaction handlers in one file, increasing maintenance cost until modularization.
- The current static app is useful for UX iteration but not enough for deterministic simulation.
- The season engine remains lightweight and deterministic; richer schedule generation and multi-team stat depth are still pending.
- Pressure/morale/facility and drive-sim coefficients still need broader playtest calibration, though M9/M10 tooling now shortens tuning cycles.
- Save data is stored in local browser storage, so it is machine/browser-specific and not a durable file-based save.
- Without browser visual QA, layout regressions may slip through.
- External data licensing/terms must still be validated per source before automated pulls are implemented.

## Known Debt Intentionally Accepted

- Static HTML/CSS/JS was accepted to move quickly on menu shape before selecting a heavier application stack.
- Placeholder world data was accepted because the first goal is screen vocabulary and flow, not balanced simulation.
- A global `window.CGM_DEMO_WORLD` content pack was accepted for the static prototype; the later app architecture should replace it with a proper loader.

## Out-Of-Scope Items Explicitly Deferred

- Match engine and game presentation.
- Licensed teams, logos, players, or conferences.
- Deep recruiting math.
- Real file-based save/load and migration registry.
- Desktop packaging.

## Overall Plan Completion (Honest Estimate, 2026-05-03)

Now spans 6 spec packs (Stats Engine, Next Core 28-40, Depth/Build Governance, Remaining System Specs 41-51, UI/Narrative/Vibe, FM26 UI Layout). Per-dimension % shipped:

| Dimension                           | %    | Notes                                                                                       |
|-------------------------------------|------|---------------------------------------------------------------------------------------------|
| Sim core (game/drive/play engine)   | **~95%** *(was ~92%)* | PLAYGEN-1..5 + matchup engine + per-play decomposition + Wave-5 calibration + Wave-6 polish modules now LIVE in runDrive + Wave-9 penalty down-replay with accept/decline + autoFirstDown. Still missing: in-game injuries, weather inputs from a calendar, OL hand-fights detail. |
| Stats engine                        | ~70% | STAT-1..7 + reconciler. Missing: season-aggregates beyond per-game, awards/leaders deeper surfacing, advanced derived metrics, plausibility validators. |
| Recruiting depth                    | **~55%** *(was ~10%)* | REC-1 shipped: 13-input interest formula, suitor leaderboards, AI school competition, multi-year HS class lifecycle, commit logic with reason codes. Suitor Board UI panel. Missing: visit/promise/pitch UI flow refresh, recruiting pipeline visualization, prospect scouting depth controls. |
| AI ecosystem                        | **~75%** *(was ~65%)* | AI school game sim + recruiting + STAFF carousel + PORTAL-2 AI behavior + Wave-9 AI-NIL bidding wars (per-prospect bids capped at 40% pool, scaled by interest+stars+NIL pref). Missing: weekly tick wired into app.js advance flow, in-season trade-ins. |
| Persistence / Save                  | **~70%** *(was ~60%)* | v7 save schema + state-hash + replay scaffold + 5 reducers + Wave-9 live dispatch from advanceCareer/setPracticeEmphasis/applyRecruitingAction + `CGM_VERIFY_SESSION()` hash verification. Missing: full handler coverage (signTransfer, hireCoach, etc), SQLite migration, repository pattern. |
| UI workspaces (per spec 42)         | **~40%** *(was ~30%)* | New panels added: Campus Pulse, Suitor Board, NIL Pool, NFL Pipeline. Recruiting/staff/scheduling/facilities/creator workspaces still partial stubs. |
| Narrative / vibe (Vibe pack)        | **~70%** *(was ~55%)* | Campus Pulse + Scrapbook panel + MEDIA voices in Desk + Wave-7 SCRAPBOOK depth (4-tier importance scoring, season-end compose, multi-year archive). Missing: UI integration of season-page compose into History workspace, big-moment presentation animations. |
| Test harness                        | **~80%** *(was ~65%)* | 174 in-browser tests + 12 invariants + Node CLI runner + state-hash + replay scaffold + 4 scenario fixtures (`npm run scenarios`) + reducer registration. Missing: stat distribution validators, AI QC packet exporter. |
| Calibration                         | **~50%** *(was ~20%)* | Wave-4 PLAYGEN-FIX brought Y/A to 5.68 (real CFB ~5.6) and combined score 38.4 (real ~57). Success rate 31.8% vs target 35-55 needs minor tuning. Home/away symmetry restored. Soak runs deterministic via `npm run sim:soak`. |
| NIL economics                       | **~25%** *(new dimension)* | Pool / cap / recharge / pledge / compliance flagging shipped. Missing: per-player NIL deals UI, booster mood feedback into pulse, real recruiting tilt. |
| NFL Pipeline                        | **~25%** *(new dimension)* | Senior outflow + early entry + 8-tier draft projection + history archive shipped. Missing: alumni tracking, coach reputation effect from NFL pipeline. |

**Closest to Alpha gate (per spec 50):** sim core, stats, persistence (action/event log slice).
**Furthest from Alpha:** recruiting depth, narrative/vibe, headless test harness, AI ecosystem beyond game sim.

## Recommended Next Task

After M19 wave 2 (2026-05-03): Program Desk + Schedule + Rankings + History are now in the workspace shell, joining wave-1's Roster + Recruiting + Portal + Staff. SCRAPBOOK + MEDIA Clippings shipped as panels inside Desk + History (event-log driven). All 84 in-browser tests still pass.

Wave 3 (shipped same session): HARNESS-2 + PERSIST-2 ✓.

Wave 4 priorities:

1. **PLAYGEN-FIX** — Fix the two sim-balance issues HARNESS-2 surfaced: success rate ~8% vs ~45% target; home win rate ~95% vs ~50% with equal talent. Likely in play-resolver buckets and/or possession asymmetry. Use `npm run sim:soak` (200 games) to verify. Add Y/A target band (4-9) to BANDS.
2. **HARNESS-2 v2** — Scenario fixtures (QB injury, NIL flag, top recruit rival push), AI QC packet exporter (`anomalies.md` + sample narratives), stats CSV broken out by player.
3. **PERSIST-2 v2** — Register the existing app.js action handlers as reducers so verifyReplay can certify a real session. Start with the 5 highest-leverage actions (advanceWeek, applyRecruitAction, setPracticeEmphasis, signTransfer, hireCoach).
4. **STAFF-1 (Coaching Carousel)** — coaches can be hired/fired/poached between schools each offseason. Spec: `43_STAFF_RESPONSIBILITIES_AND_COACHING_CAROUSEL_IMPLEMENTATION_SPEC.md`.
5. **PORTAL-1 (Transfer Portal v2 deeper)** — incoming + outgoing reason-coded fits, AI school portal moves. Spec: `34_TRANSFER_PORTAL_AND_RETENTION_ENGINE_SPEC.md`.

After M18 wave: 7 of the 12-ish biggest packets are now shipped. Remaining priority queue:

1. **PORTAL-1 (Transfer Portal v2)** — incoming + outgoing portal with reason-coded fits, AI school portal moves, integration with the suitor system. Spec: `34_TRANSFER_PORTAL_AND_RETENTION_ENGINE_SPEC.md`. Closest to "missing structural piece" now.
2. **STAFF-1 (Coaching Carousel)** — coaches can be hired/fired/poached between schools each offseason; AI carousel for the rest. Spec: `43_STAFF_RESPONSIBILITIES_AND_COACHING_CAROUSEL_IMPLEMENTATION_SPEC.md`.
3. **SCRAPBOOK-1 (Program Scrapbook)** — long-term memory: pick big-moment events from the log, build a season-by-season memory book, surface big plays/players from prior years. Spec: `CFB_FM_UI_NARRATIVE_VIBE_PACK/06_PROGRAM_SCRAPBOOK_AND_MEMORY_SYSTEM.md`. Uses the event log infrastructure already shipped.
4. **MEDIA-1 (Media clippings + voices)** — surface generated narrative ("local beat writer says X") tied to event log entries. Spec: `CFB_FM_UI_NARRATIVE_VIBE_PACK/07_MEDIA_CLIPPINGS_RADIO_AND_VOICES_AROUND_PROGRAM.md`.
5. **HARNESS-2 (Headless CLI runner)** — `npm run sim --seed N --seasons 20`, scenario fixtures, statistical validators, AI QC packet exporter. Spec: `49_TEST_HARNESS_SCENARIO_BALANCE_AND_AI_QC_SPEC.md`. Unblocks honest balance work.
6. **PERSIST-2 (Action replay + state hash)** — given seed + actionLog, replay to a hash-equal end state. Foundation for "load this prior week" + AI QC. Spec: `41_DATABASE_SAVE_MIGRATION_AND_EVENT_LOG_SPEC.md`.
7. **STAT calibration deeper pass** — Y/A still at ~9 vs real ~7.5; pull explosive/breakaway weights down further once HARNESS-2 gives me a CLI to verify across 1000s of games.
8. **STAFF/POSITION-COACH UI sweep** — staff workspace + position-coach happiness/loyalty/contract UI per spec 43.

Defer: full SQLite migration (spec 41 §SQLite), depth-gate review process (governance pack), FM26 UI architecture (UI-1..8 layout overhaul), uniform/stadium designers (spec 46), college town immersion (spec 47), LLM narrative chat (spec 48).

Play through a season end-to-end and tune. Likely next gaps surfaced by the live tour but **not** addressed in M13:

- AI program records get pre-populated to "3-2" before our season starts, but the player's record stays "0-0" — the world ecosystem ticks ahead of the player. Either gate AI sim to in-season weeks or zero out their records at career bootstrap.
- Procedural OL position split (LT vs OT) gets reshuffled by `recomputePlayerBestPositions` because LT/OT share key attrs; cosmetic only, but worth fixing by either skipping the recompute for procedural players or differentiating posAttr seeds per position.
- `data.playerProfiles` is not in the save payload, so the procedural roster regenerates on every load. Deterministic so it's safe, but development progress on procedural players is preserved only if `data.playerDecisions` (keyed by player id) gets written for them.
- Practice Emphasis history records `week: career.advanceCount` before Continue advances — labels would feel more natural with a real season-week label.
- Schedule note generation is rule-of-thumb ("Marquee matchup" / "Conference game" / "Get-right opportunity") and could be richer once ecosystem knows opponent identity.

Begin M14 continuation: modularize app.js (now 8500+ lines) and introduce the cleaner content-loader path that DL-20260501-19/20 already flagged.

## Recommended Governing Docs For Next Task

- `00_START_HERE.md`
- `05_PRODUCT_REQUIREMENTS.md`
- `07_MENU_UX_AND_SCREEN_SPECS.md`
- `08_SYSTEM_ARCHITECTURE.md`
- `09_DATA_MODEL_AND_CONTENT_PIPELINE.md`
- `11_IMPLEMENTATION_ROADMAP.md`
- `14_DATA_ACQUISITION_AND_SIM_CALIBRATION.md`
- `15_FM_RESEARCH_AND_OPEN_SOURCE.md`

## Recommended Prompt For Next Session

```text
Read docs/PROJECT_STATUS.md, docs/DECISION_LOG.md, and the planning pack files 00, 05, 07, 08, 09, 10, 11, and 12. M10 is complete. Begin M11 by continuing module extraction (state/read-model/panel helpers), introducing a cleaner content-loader boundary, and preserving M3-M10 gate stability.

Also read `14_DATA_ACQUISITION_AND_SIM_CALIBRATION.md` and `15_FM_RESEARCH_AND_OPEN_SOURCE.md` before M11+ expansion, and keep all generated players fictional.
```
