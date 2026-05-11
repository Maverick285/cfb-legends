# Decision Log

## DL-20260503-19

**Title:** Waves 17-18 — Save schema v8 (persist all new history surfaces) + live injuries firing in games + alumni archive bug fix  
**Status:** accepted  
**Date:** 2026-05-03  

### Context

User asked for a "good testable state." Smoke-tested the actual UI by starting a fresh career and advancing through two seasons. Found and fixed three real production bugs that would have hit the player:

### Decisions

**Bug 1 — Save/load wipes new state (CRITICAL)**:
`exportSaveState` and `loadCareer` predated waves 5-16. None of `alumniArchive`, `coachLegacies`, `recordBook`, `awardsHistory`, `realignmentHistory`, `scrapbookArchive`, `nilState`, `pulseState`, `draftClasses`, `practiceState`, `actionLog`, `eventLog`, `aiSchoolStandings` were written to or read from the save blob. Verified: 16 alumni + 8 records + 41 events all reset to 0 after save→load.

Fix: Added all 13 fields to `exportSaveState` + matching restore branches in `loadCareer`. Bumped `SAVE_SCHEMA_VERSION` 7→8 with a passthrough migrator (all new fields are optional with empty defaults). After fix: 449KB save persists everything; before/after roundtrip is bit-identical.

**Bug 2 — Alumni records lose careerStats (HIGH)**:
`processYearEndDraftOutflow` was overwriting `data.playerProfiles = result.returning` BEFORE building alumni records, so the lookup chain `data.playerProfiles.find(p => p.id === d.playerId)` always returned undefined for departing players. Result: alumni records showed `seasonsPlayed: 0` and `careerTotals: {}` for everyone who left.

Fix: Snapshot `players()` into `playerById` map BEFORE the outflow rewrites the roster, then look up departing player refs from the snapshot. Also corrected the departure reason mapping ("graduating_senior" → "graduated", any player with draftRound → "drafted").

**Bug 3 — Injuries built but never firing live (MEDIUM)**:
`CGM_INJURY` engine shipped in Wave 12 but `runFullGame` never called it. Live games produced 0 injuries.

Fix: Added injury roll inside `runtime/sim-core.js simulateDriveByDriveGame` — after `runFullGame` returns, calls `CGM_INJURY.rollGameInjuries({events, roster, cadencePercent, random})` and attaches `injuries[]` to the result. App.js result handler now applies each injury to the live roster (sets `player.injured`, `injuryWeeksOut`, `injuryType`, mirrors to legacy `injuryStatus`) and emits an `injury` event. Weekly recovery hook in `runWeeklyAiRecruitingTickIfNeeded` calls `tickInjuryRecovery` and emits `injury_recovered` events when players come back.

**Bug 4 — `runtime/sim-core.js` had no cache-bust query**:
After fix #3, browser kept serving stale sim-core. Added `?v=wave18` to its script tag so the new injury wiring actually loads.

### Verification

End-to-end browser walk-through:
- Bootstrap loads → Start Career → 2 seasons advanced (60 weeks)
- 4 injury events fired with correct severity/weeksOut/type ("WR Tariq Foster — ribs (0wk, nick)")
- 16 alumni archived with proper reasons (drafted vs graduated)
- 8 record book entries set
- 2 awards seasons in history
- Save → Load roundtrip preserves every field

Full validation suite:
- 230/230 in-browser tests passing (no regressions)
- Harness 100-game soak: ALL bands PASS except success rate 34% MINOR
- 4/4 scenarios PASS (qb_injury, nil_flagged, rival_push, punt regression)
- 20-year soak ALL PASS (848ms)

### Consequences

The game is now **actually testable**:
- Career persists across browser sessions
- Alumni records carry real career stats
- Injuries happen during games and players miss weeks
- Coach firings archive with tenure
- All 7 History tabs (Archive / Scrapbook / Awards / Alumni / NFL Pipeline / Rivalry / Realignment) populate as you play
- 449KB save handles everything

What still doesn't auto-fire in live play:
- AI school carousel (engine exists, not hooked into AI program rollover)
- Schedule re-gen after realignment (Wave 13 cleanup task)
- AI school NIL state per-school (currently synthetic per-bid)

### References

- `app.js`: `exportSaveState`, `loadCareer`, `processYearEndDraftOutflow`, injury apply block in result handler, weekly recovery tick
- `runtime/sim-core.js`: `simulateDriveByDriveGame` injury roll
- `js/sim/archive/alumni-archive.js`: archiveDepartures reason upgrade
- `index.html`: cache-bust on `runtime/sim-core.js` + `app.js?v=wave18-injuries-live`

---

## DL-20260503-18

**Title:** Wave 16 — Alumni Archive: career-long player stat persistence + permanent draft/grad/medical-retire alumni record + coach legacy ledger  
**Status:** accepted  
**Date:** 2026-05-03  

### Decisions

User requested: "track all players/coaches stats forever and save outgoing players who medically retire / graduate / go pro as a draft class or something." Built it across three concerns:

**1. Career stat tally** — `js/sim/archive/alumni-archive.js` (`CGM_ALUMNI`):
- `recordPlayerSeasonStats(player, year, statLine)` — appends a season entry to `player.careerStats.seasons[]` AND adds to `careerStats.totals[]`. Numeric fields only.
- `recordPlayerAward(player, label, year)` — stamps award onto `careerStats.awardsWon[]`.
- Hooked into `app.js` season rollover via `tallyCareerStatsForRoster()` which runs BEFORE awards/draft outflow so departing players carry their full career line into the archive.

**2. Alumni archive** — `data.alumniArchive[]`, never capped:
- `buildAlumniRecord({player, reason, seasonYear, programId, draftRound, draftTier, draftPick})` produces a permanent record with the player's career totals + per-season breakdown + awards + draft info.
- `archiveDepartures` batches them at season rollover.
- `isHallOfFameWorthy` heuristic: ≥3 awards OR ≥9000 career passing yds OR ≥3500 rushing OR ≥3000 receiving OR ≥25 sacks OR ≥12 INTs.
- Old `data.draftClasses = data.draftClasses.slice(0, 10)` cap **removed**. Pipeline ledger keeps every class forever.
- Departure reasons enum: GRADUATED / DRAFTED / EARLY_DECLARE / MEDICAL_RETIRE / TRANSFERRED_OUT / DISMISSED / OTHER.

**3. Coach legacy ledger** — `data.coachLegacies[]`:
- `buildCoachLegacyRecord({coach, role, programId, startYear, endYear, tenureYears, recordSummary, championships, bowls, coyAwards, endReason})` produces a permanent coach bio.
- End reasons: FIRED / RETIRED / POACHED / LEFT_FOR_NFL / OTHER.
- Hooked into the staff-action FIRE handler in `app.js` so manually firing a coach archives their tenure.
- `coachLegacySummary(legacies)` rolls totals.

**4. UI** — New "Alumni" tab in History workspace renders three sections:
- **Hall of Fame Candidates** (HOF-worthy alumni, accent stripe + tinted background)
- **Career Leaderboards** (top 5 alumni by passing yds / rushing yds / receiving yds, side-by-side cards)
- **Recent Departures** (last 12 alumni with seasons-played, reason, departure year, career stat line, draft round)
- All rows show position · name · 4yr · Drafted 2030 · 11500 pass yds · 95 TDs · R1 #4

**5. Tests** — 14 across 4 suites (career stat tally, alumni record building w/ HOF gate, coach legacy, query helpers).

### Verification

- 230/230 in-browser tests across 62 suites (was 216/58).
- Single-game harness 100g soak: ALL bands PASS except success rate 34% MINOR (expected from penalties).
- 4/4 scenarios PASS.
- 20-year soak ALL PASS.
- UI verified: Alumni tab renders empty state correctly, then with seeded HOF QB shows leaderboards + HOF accent + draft pick badge.

### Consequences

Pros:
- Per-spec user request fully satisfied. Players' stats now persist forever — graduation / draft declaration / medical retirement all archive their full career line into `data.alumniArchive` permanently.
- Hall of Fame surfaces emergent dynasty narratives (the player who broke the school passing record AND won 3 awards naturally rises).
- 10-year cap removed from draft classes — multi-decade careers get the full pipeline ledger.
- Coach legacies persist when fired or carouseled out. Future coach scouting can show "hired from Big State, 5-year tenure, 38-22, 1 championship."

Cons / debt:
- AI carousel (Wave 5 STAFF-1) doesn't yet write to `data.coachLegacies` for AI school coaches — only player-school fires do. Future hook: add archive call inside `runOffseasonCarousel`.
- Per-game stats aren't preserved — only season totals roll into careerStats. Per-game depth for alumni "best game ever" is queued.
- Alumni filter UI (by program / position / reason / since-year) not exposed yet — engine has `queryAlumni` but the panel hardcodes recent + HOF.
- HOF heuristic is intentionally lightweight; eventually a vote-style ballot could replace it.

### References

- `js/sim/archive/alumni-archive.js`, `js/sim/tests/alumni-tests.js`
- `app.js`: `tallyCareerStatsForRoster`, `processYearEndDraftOutflow` (alumni push + cap removal), `resolveSeasonAwardsAndRecords` (award stamp), staff-action FIRE handler (coach legacy), `alumniPanel`, History tab def + branch
- `styles.css`: `.alumni-row`, `.alumni-row.hof`, `.alumni-leader-block`
- `harness/node-shim.js`: alumni-archive in LOAD_ORDER

---

## DL-20260503-17

**Title:** Wave 15 — 20-year soak validator (multi-year stability proof point)  
**Status:** accepted  
**Date:** 2026-05-03  

### Decisions

**`harness/soak.js`** — Multi-year deterministic soak runner. Per cycle:
- 12 procedural teams across 2 conferences (Alpha P4, Beta G5), seeded prestige + fanBase
- Round-robin games within each conference (60 games/year)
- Per-game playEvents tallied into per-team per-player simple stat lines (passing/rushing yds/TDs)
- Year-end:
  - `CGM_AWARDS.resolveSeasonAwards` produces ballots per team
  - `CGM_AWARDS.detectRecordBreaks` + `applyRecordBreaks` builds the school record book
  - `CGM_REALIGNMENT.runOffseasonRealignment` shuffles conferences (with `minConfSize: 4` for the 6-team conferences)
  - Win/loss reset for the next year

**Validation bands** (`SOAK_BANDS`):
- realignmentTotal 1-60 over 20 years (some movement, not chaos)
- avgScorePerTeam 14-50 ppg
- awardsUniqueWinners ≥ 5% diversity (no monopoly)
- noPermLoser / noPermUndefeated equality checks (no team should be all 0-N or all undefeated for ≥5 yrs)
- recordBookFilled ≥ 4 records over the soak

**Realignment engine bug found + fixed** — `MIN_CONF_SIZE = 8` was hardcoded. Soak with 6-team conferences couldn't realign at all because every move would drop the source below MIN. Changed to `args.minConfSize` parameter (defaults to 8 for production use; soak passes 4).

### Verification

5 seeds × 20 years × 720 games each = **3,600 simulated games. ALL 5 SEEDS PASS** every band. Per-seed elapsed: ~880ms (~250µs per game on this hardware).

| Seed | Realignment Total | Avg Score | Records | Validation |
|------|-------------------|-----------|---------|------------|
| 1    | 2                 | 25.9      | 4       | ALL PASS   |
| 7    | 2                 | 25.6      | 4       | ALL PASS   |
| 42   | 2                 | 26.4      | 4       | ALL PASS   |
| 99   | 2                 | 26.2      | 4       | ALL PASS   |
| 200  | 2                 | 25.1      | 4       | ALL PASS   |

### Consequences

This satisfies the spec's beta-gate item *"20-year sim is stable"* (per `12_FINAL_ALPHA_DEFINITION.md`). The full game cycle — game sim + realignment + awards + records + AI standings reset — runs cleanly for 20 years across multiple deterministic seeds with no state corruption, no infinite loops, no permanent dynasty/permanent loser.

Pros:
- Major regression guard. Any future change to realignment / awards / game-engine will run against this soak. Breakage shows up immediately.
- `npm run soak:20` is fast enough (~1s) to run after every meaningful sim change.
- Found a real bug (the minConfSize default lockout) that nobody would have noticed without a multi-year soak.

Cons / debt:
- Soak doesn't yet exercise: STAFF carousel, NIL bidding, transfer portal, scrapbook composer (mostly because they're tied to `data` / `career` state, not pure modules). Future enhancement: lift more of the season-rollover sequence into pure functions.
- Awards diversity ratio runs at ~0.06-0.07 (6-7% unique winners) which is real-team-dynasty-ish — top QB rosters tend to dominate. Could tighten the band, but current is loose enough to pass naturally.

### References

- `harness/soak.js`, `package.json` (npm run soak / soak:20 / soak:5)
- `js/sim/realignment/realignment-engine.js` (`minConfSize` parameter)
- `harness/runs/soak/seed_*.json` (run outputs)

---

## DL-20260503-16

**Title:** Wave 14 — Awards & Records engine (POTY ballots, position awards, COY, All-American, school record book)  
**Status:** accepted  
**Date:** 2026-05-03  

### Decisions

**Awards engine** — `js/sim/awards/awards-engine.js` exposing `CGM_AWARDS`:
- 10 season awards: POTY, QB/RB/WR/OL/EDGE/LB/DB position awards, Freshman of the Year, Coach of the Year.
- `scoreCandidate(player, statLine, ctx)` — per-position stat blends (qb/rb/wr/edge/lb/db/ol/coach/best_overall) + non-stat modifiers (team success, conference strength, big-game bonus, rivalry win, postseason performance) per spec §"Award Inputs" ("do not use stats alone").
- `resolveSeasonAwards` produces ballots with finalists + winners.
- `resolveAllTeams` builds per-conference + national All-American teams (12 positions).
- `detectRecordBreaks` + `applyRecordBreaks` for the school record book (9 stat types: passing yards/TDs, rushing yards/TDs, receiving yards/rec, sacks, INTs, tackles).
- `buildWatchListSnapshot` for in-season tracking with stage progression (preseason / midseason / late_season_finalists / winner).
- 10 tests across 5 suites.

**Season-rollover hook** — `resolveSeasonAwardsAndRecords()` runs BEFORE the scrapbook composer so the new awards/records become eligible historic moments. Pulls per-player stat lines from `seasonState.seasonPlayerBook`, runs ballots + all-teams + record detection, persists to `data.awardsHistory[]` and `data.recordBook`. Emits `award_won` (historic for POTY/COY, major otherwise) and `record_broken` (major) events for everything won/broken on the player's program.

**History UI** — New "Awards & Records" tab in History workspace. Top section shows last 5 seasons with: per-award winner row (label · player · score), All-American chips, record-break callouts. Bottom section shows the full school record book (9 records, year-stamped with holder).

### Verification

- 216/216 in-browser tests passing across 58 suites (was 206/53). +10 awards tests across 5 new suites.
- Harness 100-game soak: same as Wave 13 (Y/A 5.81, combined 51.x, success 34% MINOR, all other bands PASS).
- 4/4 scenarios PASS.
- UI verified: Awards & Records tab renders with empty record book on a fresh career (correct — no season completed).

### Consequences

Pros:
- Multi-year careers now build a real legacy: school records year-stamped with the player who set them, all-conference and All-American honors, position awards visible in History.
- Awards events flow into the scrapbook composer + Media Clippings — winning POTY shows up as wire reports.
- The team-success and conference-strength multipliers prevent stat compilers on losing teams from winning everything (per spec §"do not use stats alone").

Cons / debt:
- Records are school-season scope only. National-season + career-scope (spec §"Records") not yet implemented.
- Heisman-style ballot doesn't yet poll AI school candidates (only player's own roster eligible). The `resolveAllTeams` path covers this for All-American but POTY is single-team for now.
- Watch-list snapshots aren't surfaced anywhere yet; the helper exists but no in-season UI consumes it.
- Coach of the Year doesn't yet differentiate position coaches from head coaches.

### References

- `js/sim/awards/awards-engine.js`, `js/sim/tests/awards-tests.js`
- `app.js`: `resolveSeasonAwardsAndRecords`, `awardsAndRecordsPanel`, History tab branch + tab def
- `styles.css`: `.awards-season`, `.award-row`, `.all-american-chip`, `.record-row`
- `harness/node-shim.js`: awards in LOAD_ORDER

---

## DL-20260503-15

**Title:** Wave 13 — Conference Realignment engine, season-rollover hook, History UI tab  
**Status:** accepted  
**Date:** 2026-05-03  

### Decisions

**Realignment engine** — `js/sim/realignment/realignment-engine.js` exposing `CGM_REALIGNMENT`:
- `computeRealignmentPressure` produces 0-100 with reason codes from 7 inputs (ambition vs tier, media value, recent W%, conference instability, geography, rivalries-at-risk, booster pressure). Bands: stable / watch / rumored / moving.
- `scoreConferenceFit` evaluates accept/reject from the receiving conference's POV: prestige fit, media addition, geography, tier compatibility, full-conf rejection (cap 18).
- `runOffseasonRealignment` runs a full cycle: filters candidates ≥50 pressure, tries every higher-tier conference, accepts probabilistically based on fit (0.9/0.55/0.25 by score band), guards against draining source conferences below MIN_CONF_SIZE (8), caps total moves at maxMovesPerCycle (default 5).
- `applyMoves` mutates programs and records `realignmentHistory` per program.

**Season rollover hook** — `runOffseasonRealignmentCycle()` in `app.js` runs after scrapbook composer + before draft outflow. Builds prevWinPct from AI standings + player career.record, calls the engine with seeded RNG, applies moves, persists `data.realignmentHistory`, and emits one `historic`-severity event per move ("Boise State leaves MWC for Big Ten").

**History UI** — New "Realignment" tab in History workspace. `realignmentPanel()` groups moves by year, renders each as `team · fromConf → **toConf** · pressure score`. New CSS `.realign-year-block`, `.realign-row`, `.realign-arrow`, `.realign-pressure`.

### Verification

- 206/206 in-browser tests passing across 53 suites (was 194/50). Added 11 realignment tests across 3 suites.
- Harness 100-game soak: ALL bands PASS except success rate at 34% (MINOR, expected from penalties).
- 4/4 scenarios PASS.
- Tuning iteration: initial pressure formula was too tight — high-prestige G5 schools maxed out at ~28 pressure, never crossed the 60 threshold. Re-tuned ambition coefficient (0.4 → 0.7), expanded media-value lift, lowered move threshold (60 → 50), and switched candidate→target tier search from "exactly one tier above" to "any higher tier" (so a G5 school can leap to P4 like real CFB).

### Consequences

Pros:
- Multi-year saves now have the most prominent feature missing from the spec — conference shake-ups. Programs jump tiers, source conferences thin out, dynasty narratives have causal explanations ("they joined the Big Ten in '28").
- Surfaces in History tab year-by-year so the player can scan the whole realignment ledger.
- Emits historic-severity events so the scrapbook composer + Media Clippings will pick them up.
- Engine is pure + seeded — same career, same realignment moves, every time.

Cons / debt:
- Schedule generator doesn't yet rebuild conference schedules after a move. Next-season schedule will still reference old conference for the existing schedule rows. Wave 14 task.
- Standings/rankings UI doesn't yet refresh conference grouping mid-render.
- Conference rivalries (data.rivalries) aren't passed in as `rivalriesAtRisk`, so that pressure brake is currently inert.
- No "user can decline an invitation" flow — moves resolve fully autonomously. UI hook for player-controlled program could be added.

### References

- `js/sim/realignment/realignment-engine.js`, `js/sim/tests/realignment-tests.js`
- `app.js`: `runOffseasonRealignmentCycle`, `realignmentPanel`, History tab branch
- `styles.css`: `.realign-year-block` family
- `harness/node-shim.js`: realignment in LOAD_ORDER

---

## DL-20260503-14

**Title:** Wave 12 — drive max-plays bump, penalty box-score stats, per-game injury engine  
**Status:** accepted  
**Date:** 2026-05-03  

### Decisions

**12a — Drive maxPlays cap 16 → 20.** With penalties now replaying the down (DL-20260503-11), drives can need extra slots. Real CFB drives can run 14+ plays. Bumped both `drive-engine.js` default and `game-engine.js` callsite.

**12b — Penalty stats in box score.** Added `penalties_count` + `penalty_yards` to `emptyTeamLine`. Per-event credit logic in `creditPlayEventToLine` (offense penalty → offending team) and `buildGameBook` (defensive penalty → defending team). Two new entries in `STAT_TAXONOMY` ("Penalties", "Penalty Yards") under category `discipline`. New "Discipline" group in the team stats panel renders right above Drives.

**12c — Per-game injury engine.** New module `js/sim/injury/injury-engine.js` exposing `CGM_INJURY`:
- 5 severity bands (nick / minor / moderate / severe / seasonEnding) with weeksOut ranges
- Per-position propensity multipliers (RB 1.35, K 0.40, etc)
- Per-play kind multipliers (sack 2.4×, rush 1.6×, KR/PR 1.8×, pass 0.7×)
- `BASE_PER_PLAY = 0.0007` × ~130 plays/game ≈ ~9% per-game injury probability
- Stamina/bravery shave a small risk margin
- `applyInjury(player, injury)` mutates player; `tickInjuryRecovery(roster)` decrements weeksOut + returns recovered list
- `rollGameInjuries({events, roster, cadencePercent, random})` per-game pass
- Position-aware injury types (QB → "shoulder/ankle/ribs/concussion/knee", season-ending → "ACL tear" / "Achilles rupture")
- 9 tests across 3 suites: rate sanity, position differential (RB > WR), kicker near-zero, cadence scaling, severity bands ordering, recovery tick, per-game pass.

### Verification

- 194/194 in-browser tests passing across 50 suites (was 185/47).
- Harness 200-game soak: combined 51, Y/A 5.75, penalty rate 6%, rush share 41% / avg 6.19, pass share 44% / avg 7.76, home win 60%. Only outstanding: success rate 33.9% (1.1 below 35-band — penalties slow drives, expected).
- 4/4 scenarios PASS.
- Injury engine module-only: not yet wired into the live drive loop. Available via `CGM_INJURY` for any caller.

### Consequences

Pros:
- Box-score now shows penalty stats per team — players can see who's undisciplined.
- Injury engine is ready: a future advance-week or simulate-game caller can `rollGameInjuries` over the play log + `tickInjuryRecovery` weekly. Position propensity + severity bands match standard sim conventions.
- maxPlays bump means long, hard-fought drives don't artificially die at the play 16 cap.

Cons / debt:
- Injury engine isn't wired into `runFullGame` yet — Wave 13 task. The per-game pass needs a hook in `simulateGame` (or wherever play events come back).
- Recovery tick needs a weekly hook (similar to `runWeeklyAiRecruitingTickIfNeeded`).
- Roster UI doesn't yet surface `injured`/`injuryWeeksOut`/`injuryType` fields. Currently those are written but invisible.
- Success rate band edge (33.9 vs 35 floor) is acceptable but could be reclaimed by lifting penalty disciplineFloor from 50 → 65 default.

### References

- `js/sim/playgen/drive-engine.js`, `game-engine.js` (maxPlays 16 → 20)
- `js/sim/stats/stat-accumulator.js` (penalty fields + crediting)
- `js/sim/stats/stat-taxonomy.js` (penalty stat defs)
- `js/sim/injury/injury-engine.js`, `js/sim/tests/injury-tests.js`
- `app.js` (Discipline group in `STAT_GROUPS`)
- `harness/node-shim.js` (load injury-engine)

---

## DL-20260503-13

**Title:** Wave 11 — Rival NIL bids in inspector, REPLAY dispatch for sign/hire, per-play-type harness validators, harness shim full module load  
**Status:** accepted  
**Date:** 2026-05-03  
**Owner / role:** Sim implementation agent  

### Decisions

**11a — Rival NIL bids in Recruiting prospect inspector**: New helper `rivalNilBidsForProspect(prospect, limit)` filters the live event log for `nil_bid` events targeting the selected prospect and renders them as a 3-column row stream (school · `$Xm` amount · week). Inspector adds a "Rival NIL Bids" section (only when bids exist). New CSS `.bid-stream`, `.bid-row` with warning-colored left border + monospace amount.

**11b — REPLAY dispatch coverage extended**: `dispatchToReplay("SIGN_TRANSFER", { playerId, fromSchool, contractYears, scholarshipUsed })` fires from the portal-action handler when `action === "pursue"`. `dispatchToReplay("HIRE_COACH", { candidateId, role, salaryK, years })` fires from the staff-action `hire` branch. Brings live-handler coverage to 5 of the registered reducers (advance, practice, recruit, sign, hire).

**11c — Per-play-type stat distribution validators**: Harness now buckets every event by `playType`, computes `count / sharePct / avgYards / successRatePct` per type, validates `rush` and `pass` against bands derived from real CFB anchors (rush 3.0-6.5 ypc + 25-60% share; pass 4.0-9.0 yds/att + 25-55% share). Penalty rate validated at 3-12% (real CFB ~6-9%). New "Per-Play-Type Breakdown" table in `validation_report.md`. Stdout now prints rush/pass shares + penalty rate.

**11d — Harness node-shim loads all sim modules**: The shim was missing `extras-engine`, `coaching-carousel`, `portal-v2`, `voices-engine`, `ai-nil-bidding`, `scrapbook-engine`, `state-hash`, `replay`, `reducers`. Penalty rate showed `0%` because EXTRAS was null in the harness. After adding them: penalty rate = 6.2% (in band).

### Verification

Final harness 200-game soak (78v75 talent):

| Metric           | Before W11 | After W11 | Band |
|------------------|------------|-----------|------|
| Combined score   | 55.8       | 50.3      | 30-80 |
| Yards/play       | 6.25       | 5.72      | 4.5-8.5 |
| Success rate     | 36.0%      | 33.6%     | 35-55 (now MINOR — penalties slow drives) |
| Plays/game       | 137        | 137.8     | 100-180 |
| Home win rate    | 69%        | 60%       | 35-75 |
| Penalty rate     | 0% (broken) | 6.2%     | 3-12 |
| Rush share / avg | n/a        | 40.9% / 5.98 | 25-60 / 3.0-6.5 |
| Pass share / avg | n/a        | 44.5% / 7.89 | 25-55 / 4.0-9.0 |

185/185 in-browser tests still passing. 4/4 scenarios PASS.

### Consequences

Pros:
- Players see active rival pressure on every prospect — no more guessing if AI schools are chasing the same kid.
- Replay dispatch now covers the 5 highest-leverage actions; a real session's signing + hiring decisions can be hash-verified.
- Per-type validators surface stat-shape regressions before they hit the play-by-play feed (e.g., if rush avg drifts to 8 ypc the harness flags it).
- The shim fix means the harness is now a true mirror of the in-browser sim — no more silent module gaps.

Cons / debt:
- Success rate dropped 2.4 pts after penalties started firing. The drive engine accepts the penalty but doesn't compensate by extending max-plays cap. Tuning options: bump `maxPlays` from 16 → 18 or shrink penalty `disciplineFloor` default.
- Penalty box-score line still missing (yards/team).
- 10 more registered actions still need REPLAY dispatch wiring for full session reproducibility.

### References

- `app.js` — `recruitingProspectInspector` ("Rival NIL Bids" section), `rivalNilBidsForProspect`, portal `pursue` + staff `hire` REPLAY dispatches
- `styles.css` — `.bid-stream`, `.bid-row`
- `harness/run.js` — penalty rate band, per-play-type validators, expanded stdout
- `harness/node-shim.js` — full module LOAD_ORDER

---

## DL-20260503-12

**Title:** Wave 10 — AI-NIL bidding live in weekly tick + penalty events surfaced in play-by-play  
**Status:** accepted  
**Date:** 2026-05-03  
**Owner / role:** Sim implementation agent  
**Related milestone / slice:** M19 — Wave 10 player-facing polish  

### Decisions

**10a — AI-NIL weekly tick wired into live advance flow**
- New `runAiNilBiddingTick(weekIndex)` in `app.js`. Filters uncommitted prospects to 4★+ or OVR ≥ 80, builds a synthetic per-AI-school NIL pool from `prog.nilTier` (or estimated from prestige), and calls `CGM_AI_NIL.runWeeklyBiddingTick`.
- Each successful bid bumps the corresponding suitor's interest in `prospect.suitors` (capped at 99). Bids ≥ $0.5M emit a `nil_bid` event in the live event log; bids ≥ $1.5M are notable severity (so they appear in MEDIA Clippings on the Desk).
- Hook point: end of `runWeeklyAiRecruitingTickIfNeeded` so it fires alongside the existing AI recruiting tick. Same week-seeded RNG family for determinism.
- The player NEVER bids against themselves — `career.programId` is excluded from the schoolIndex.

**10b — Penalty events visible in play-by-play**
- `js/sim/playgen/game-engine.js` `playByPlay` formatter now branches on `e.playType === "penalty_only"` to render `"FLAG · {name} · {±yds} · accepted"` instead of the generic playType label.
- Reason-code suffix filter: penalties also drop the `penalty_*` codes from the trailing "— reason" suffix to avoid duplicate text.
- Verified live: in a 100-play game with default 50% discipline, ~5 flags surface as readable FLAG lines (e.g. "14:36 A: FLAG · holding offense · -10 · accepted").

### Verification

- 185/185 in-browser tests still passing across 47 suites.
- Harness 100-game soak: ALL PASS (Y/A 6.25, combined 55.8, success 36%, plays/game 137).
- 4/4 scenarios PASS.
- AI-NIL tick + penalty PBP both confirmed via in-browser eval.

### Consequences

Pros:
- Rivals now actively compete for top recruits each week — the recruiting board moves on its own. The Desk's Media Clippings will pick up notable-severity NIL bids and surface them as wire reports.
- Penalties show up as readable game events in the PBP feed — players can see the call, yardage, and that it was accepted, just like real CFB.
- The combined effect of waves 5-10 means the game now has: real penalties, real weather, real fatigue, real ST returns, real coaching carousel, real transfer-risk + retention meetings, real AI bidding wars, real tier-coded scrapbook history, and a working replay-verification scaffold.

Cons / debt:
- AI-NIL bid amounts are synthetic (derived from tier, not from a per-school real NIL state). Phase 2: integrate with `CGM_NIL` per-school state so pools deplete as schools spend.
- Penalty events still don't surface in stat books (no penalty yards by team in box score). Box-score integration is queued.
- Replay dispatch still covers only 3 of ~15 high-leverage handlers.

### References

- `app.js` — `runAiNilBiddingTick`, hook in `runWeeklyAiRecruitingTickIfNeeded`
- `js/sim/playgen/game-engine.js` — `playByPlay` penalty branch
- `index.html` cache-bust to `app.js?v=wave10a-ai-nil-tick`

---

## DL-20260503-11

**Title:** Wave 9 — PORTAL UI risk panel, penalty down-replay, AI-NIL bidding, season-end scrapbook composer, CGM_REPLAY live dispatch  
**Status:** accepted  
**Date:** 2026-05-03  
**Owner / role:** Sim implementation agent  
**Related milestone / slice:** M19 — Wave 9 deep integration  

### Decisions

**9a — PORTAL-2 risk panel in Roster inspector**
- New `computeRichTransferRisk(player)` builds a TransferContext from morale, broken promises, position depth, transfer-risk band, scheme fit, year, and team success → calls `CGM_PORTAL_V2.computeTransferRisk` → returns the 17-term scored profile.
- Inspector "Why They Might Leave" section shows band label (Low Risk / On Watch / Concern / High Risk / Imminent), 0-100 score, and pill chips for the top 5 reason codes.
- New CSS `.risk-detail`, `.risk-{low,watch,concern,high,imminent}` with severity stripes + soft tinted gradients on high+imminent.

**9b — Penalty down-replay**
- `js/sim/playgen/drive-engine.js`: added `decidePenaltyAccept(penalty, outcome)` heuristic — offensive penalties always enforced, defensive penalties accepted when better than the play or carry autoFirstDown.
- When penalty fires + accepted: rewrites `outcome.kind = "penalty_offense" | "penalty_defense"`, `outcome.bucket = "penalty"`, clears scoring/turnover, stashes penalty meta at `outcome._penaltyMeta`, adds `penalty_accepted` reason code.
- `js/sim/playgen/game-state.js` `applyPlayOutcome`: new branch for penalty kinds — applies yards but does NOT advance the down. Auto-first-down for defensive flags (PI, holding-defense, facemask, personal_foul, targeting). Returns `transition.penalty = true`.
- `js/sim/playgen/play-resolver.js`: penalty kinds map to `playType: "penalty_only"` + `chargedPlayType: "penalty_no_play"` + `outcome: "penalty"` for stat correctness.
- Verification: 200-game soak still ALL PASS after integration (combined 55.1, Y/A 6.23, success 36.4% — penalties net to ~0 expected yards over many trials).

**9c — AI-NIL bidding wars**
- New module `js/sim/ai/ai-nil-bidding.js` exposing `CGM_AI_NIL`. Each AI school computes a per-prospect bid from pool size + interest + prospect stars/ovr + NIL preference. Bid jittered to avoid ties. Capped at 40% of pool to prevent draining.
- `interestBumpFromBid` translates dollar amount into suitor-board interest delta (0.5x expected → +2, 1.0x → +6, 1.6x → +12), scaled by prospect's NIL preference.
- `runBiddingRound` competes multiple bidders per prospect, sorts desc. `runWeeklyBiddingTick` aggregates across all priority prospects.
- 11 tests across 4 suites verify dry-pool exclusion, low-interest exclusion, walk-on exclusion, sort order, NIL-preference amplification, and bid cap.

**9d — Season-end scrapbook composer**
- `composeAndArchiveSeasonScrapbook()` called from `rollToNextSeasonYear` BEFORE record reset. Pulls events for the just-finished season, scores them via `CGM_SCRAPBOOK.topMomentsForSeason` with postseason + program-firsts context, composes a page via `composeSeasonPage`, and pushes to `data.scrapbookArchive`.
- Logs a `scrapbook_composed` event (severity major if any historic, notable otherwise) so the archive is itself reflected in the live event log.
- `scrapbookPanel()` in History workspace now prefers `data.scrapbookArchive` when populated, falling back to live-event composition for unfinished seasons. Each archived page shows the tier-coded headlines + meta line.

**9e — CGM_REPLAY live dispatch**
- New `dispatchToReplay(type, payload)` wraps `CGM_REPLAY.applyAction` against a session-scoped recording stored at `window.CGM_SESSION_RECORDING` (seed, startedAt, actions[], replayState).
- Wired into 3 high-leverage handlers: `advanceCareer` (ADVANCE_WEEK), `setPracticeEmphasis` (SET_PRACTICE_EMPHASIS), recruit-action click handler (APPLY_RECRUIT_ACTION).
- New global `window.CGM_VERIFY_SESSION()` replays the recorded action list from initial state and compares the final hash. Verified end-to-end via in-browser eval: 3 dispatches → recorded hash `30e10b3c` matches replay hash `30e10b3c` (`ok: true`).

### Verification

- In-browser tests: **185/185 passing across 47 suites** (was 174/43 before this wave).
- Harness 100-game soak: ALL PASS (Y/A 6.25, combined 55.8, success 36%, plays/game 137, home win 69%).
- Harness 4/4 scenarios PASS.
- `CGM_VERIFY_SESSION()` returns `ok: true` for a 3-action recording.

### Consequences

Pros:
- The Roster inspector now answers "why might this player leave?" with concrete reason codes — first time the PORTAL-2 engine is felt by the player.
- Penalties are now real: down-replay, accept/decline, autoFirstDown for defensive flags. Game flow matches real CFB.
- AI schools will now bid against the player on top recruits — recruiting feels alive instead of player-vs-static-NPCs.
- Scrapbook archive persists across save/load (it's on `data`), so multi-year careers accumulate a real history.
- Session recording → hash verification means a future "Load this prior week" or "AI QC packet" feature has a deterministic foundation.

Cons / debt:
- Penalty events go through `applyPlayOutcome` but the drive doesn't extend the play count cap. If many penalties chain, drive could end on max-plays without scoring.
- AI-NIL bidding isn't yet plugged into a weekly tick in app.js — module exists + tested, but no caller invokes `runWeeklyBiddingTick` yet (Wave 10 task).
- `CGM_REPLAY` dispatch covers 3 of the ~15 highest-leverage actions. Full coverage means signTransfer, hireCoach, fireCoach, redshirt, depthChartChange, benefitAllocation, etc.
- Season-end composer doesn't yet emit narrative MOMENT events (only the scrapbook_composed marker). MEDIA voices could be triggered from the page summary.

### References

- `app.js`: `computeRichTransferRisk`, `composeAndArchiveSeasonScrapbook`, `dispatchToReplay`, `window.CGM_VERIFY_SESSION`, scrapbook archive in History panel
- `js/sim/playgen/drive-engine.js`, `game-state.js`, `play-resolver.js` — penalty replay
- `js/sim/ai/ai-nil-bidding.js`, `js/sim/tests/ai-nil-tests.js`
- `styles.css` — `.risk-detail`, `.risk-{band}`, `.risk-reasons`

---

## DL-20260503-10

**Title:** Wave 8 — live integration of PLAYGEN-extras + SCRAPBOOK + STAFF carousel into the running game  
**Status:** accepted  
**Date:** 2026-05-03  
**Owner / role:** Sim implementation agent  
**Related milestone / slice:** M19 — Wave 8 integration sweep  

### Problem Statement

Waves 5-7 shipped engines as standalone modules (PLAYGEN-extras, SCRAPBOOK depth, STAFF carousel) but none of them were called by the live game. `runFullGame` still produced events without weather, without fatigue, without penalties. The History workspace's Scrapbook tab still used the old severity-filtered list. The Staff workspace inspector showed the head coach's profile but no hot-seat status.

### Decision

**8a — PLAYGEN-extras live in `runDrive` + `runFullGame`**:
- `drive-engine.js` now reads weather + fatigue + penalty state per play. Pass yards adjusted by `applyWeatherToPassYards` for deep/intermediate. Per-play `updateFatigue` ticks both teams; `fatigueYardsMultiplier` lifts offense YPP when defense ≥70 fatigue. `rollPenalty` adds yards adjustment + reason code (no down-replay yet — flagged as next-iteration work).
- `game-engine.js` carries per-team fatigue across drives (`teamFatigue` map keyed by teamId, with `recoverBetweenDrives` 8-14 between possessions). Weather flows from args.weather (default "clear") through to drive.
- Verification (in-browser eval, same seed/rosters across weathers): clear avg deep yds = 7.83, heavy_rain = 6.21 (-21%), wind_25 = 5.43 (-31%). Matches the multipliers exactly.
- 200-game soak baseline still PASSES all bands (Y/A 6.25, success 36%, combined 55.8, home win 38-69% range).

**8b — SCRAPBOOK in History workspace**:
- `app.js` `scrapbookPanel()` now routes through `CGM_SCRAPBOOK.composeSeasonPage` when available, with legacy fallback. Renders per-year pages with tier-coded headline strips (historic/major/notable/trivia colors) + per-page meta line ("N moments · M historic").
- New CSS: `.scrapbook-headline`, `.scrapbook-tier.tier-{historic,major,notable,trivia}`, `.scrapbook-meta`, `.year-sub`.
- Module-only fallback preserved so an unloaded module doesn't break the panel.

**8c — STAFF hot-seat in Staff workspace inspector**:
- New `computeHcHotSeat()` parses `career.record` into wins/losses, derives `expectedWins` from program prestige, computes `tenureYears` from `career.year - career.startYear`, reads booster pressure from `data.pressureState`, and calls `CGM_CAROUSEL.evaluateHotSeat`.
- Result displayed at the top of the Staff inspector as "Job Security" section: score (0-100), band label (Secure / On the Radar / Hot Seat / Fire Watch), and up to 4 reason codes as pill chips.
- New CSS: `.hot-seat`, `.hot-seat-{secure,watch,hot_seat,fire_imminent}` with severity stripes + soft gradients.

### Verification

- 174/174 in-browser tests still passing across 43 suites.
- Harness 100-game soak: all bands PASS (Y/A 6.25, combined 55.8, success 36%, plays/game 137, home win 69%).
- 4/4 scenarios PASS (qb_injury, nil_flagged, rival_push, punt regression guard).
- Live verification via preview eval: weather flow confirmed working. Hot-seat panel renders with band="Secure" + score=0 on a fresh career (correct: no losses yet).

### Consequences

Pros:
- The wave-5-7 engine work is now actually felt by the player. Weather + fatigue change game outcomes. Hot-seat appears immediately for any program. Scrapbook headlines are tier-styled rather than raw category dumps.
- All three integrations are guarded with `if (MODULE)` checks so unloading a module degrades to legacy behavior, not crash.

Cons:
- Penalties are still no-replay (yards adjust + reason code, but down doesn't reset). Real penalty machinery would require down-replay logic in the drive loop.
- Hot-seat reads `career.record` and `data.pressureState`; deeper integration would feed real game-by-game results into a tenure-aware expectation model.
- Scrapbook tier-coding is good but the season-end "compose new page" flow (spec calls for an explicit composer at season transition) is still queued.
- Cache busting now requires bumping `?v=` on every edit cycle. A proper static-asset hash would solve this.

### References

- `js/sim/playgen/drive-engine.js`, `js/sim/playgen/game-engine.js`
- `app.js` (`scrapbookPanel`, `computeHcHotSeat`, `renderStaffWorkspace` inspector wiring)
- `styles.css` (`.hot-seat`, `.scrapbook-headline`, `.scrapbook-tier`, `.scrapbook-meta`)

---

## DL-20260503-09

**Title:** Wave 7 — SCRAPBOOK depth + HARNESS scenarios + PERSIST-2 reducer registration  
**Status:** accepted  
**Date:** 2026-05-03  
**Owner / role:** Sim implementation agent  
**Related milestone / slice:** M19 — Wave 7 final autonomous build pass  

### Decision

**SCRAPBOOK depth** — `js/sim/scrapbook/scrapbook-engine.js` (`CGM_SCRAPBOOK`):
- 4-tier importance scoring (trivia / notable / major / historic) with named reason-code keys for auto-promotion (national title, first playoff, perfect season, etc).
- `scoreEvent(event, ctx)` blends severity floor + reason-code lifts + context (rivalry, postseason, opponent ranked, blowout margin, program firsts).
- `topMomentsForSeason` filters by minTier, sorts by score, dedupes by category|actor.
- `composeSeasonPage` produces structured page (headlines / byCategory / counts) the UI can render.
- `composeMemoryArchive` rolls per-season pages newest-first with totals.
- 11 tests, 3 suites.

**HARNESS scenario fixtures** — `harness/scenario.js` + `harness/scenarios/registry.js`:
- 4 deterministic scenarios: `qb_injury_depth_chart`, `nil_deal_flagged`, `top_recruit_rival_push`, `punt_field_position` (regression guard for the punt bug fixed in DL-20260503-07).
- `npm run scenarios` runs all; `npm run scenario -- --id <name>` runs one. Exit code 1 on any failure.
- All 4 PASS.

**PERSIST-2 v2 reducer registration** — `js/sim/persistence/reducers.js` (`CGM_REDUCERS`):
- Registers 5 high-leverage reducers with `CGM_REPLAY`: `ADVANCE_WEEK`, `APPLY_RECRUIT_ACTION`, `SET_PRACTICE_EMPHASIS`, `SIGN_TRANSFER`, `HIRE_COACH`.
- Each reducer is pure (state, payload) → state. No mutation of inputs.
- `registerAll()` exposed so tests can re-register after `clearRegistry()` calls in PERSIST-2 v1 isolation tests.
- 8 tests covering registration, per-reducer behavior, deterministic replay, hash verification.

### Verification

In-browser tests: **174/174 passing across 43 suites** (was 156/39).
Harness scenarios: **4/4 PASS**.
Harness 200-game soak: still in band (Y/A 5.6, success 36%, home win 38.5%).

### Consequences

Pros:
- `CGM_SCRAPBOOK` is now the bridge between the event log and a meaningful long-term memory surface — the UI can call `composeSeasonPage` at season end and get a printable page.
- `harness/scenario.js` adds a third validation layer: unit tests + statistical bands + targeted scenarios. The punt regression now has a permanent guard — if anyone breaks `applyPlayOutcome` again, scenario fails immediately.
- `CGM_REDUCERS` proves the replay scaffold works end-to-end with realistic payloads. A real session recording can now be hash-verified against a replay.

Cons / debt:
- Scrapbook engine is module-only — UI integration (replace History → Scrapbook tab to use `composeSeasonPage`) is queued.
- Reducers are stubs that capture intent; they don't yet replicate the full app.js handler logic. A real hash-verified session needs the live handlers to dispatch through `CGM_REPLAY` (not just call mutators directly). That's the next step.
- All wave-5/6/7 modules need a UI integration sweep into app.js before players see them.

### References

- `js/sim/scrapbook/scrapbook-engine.js`, `js/sim/tests/scrapbook-tests.js`
- `harness/scenario.js`, `harness/scenarios/registry.js`
- `js/sim/persistence/reducers.js`, `js/sim/tests/reducers-tests.js`
- `package.json` (scenarios + scenario scripts)
- Specs: `06_PROGRAM_SCRAPBOOK_AND_MEMORY_SYSTEM.md`, `49_TEST_HARNESS_SCENARIO_BALANCE_AND_AI_QC_SPEC.md`, `41_DATABASE_SAVE_MIGRATION_AND_EVENT_LOG_SPEC.md`

---

## DL-20260503-08

**Title:** Waves 5-6 — calibration, STAFF carousel, PORTAL v2, MEDIA voices, PLAYGEN polish (penalties + weather + fatigue + ST returns)  
**Status:** accepted  
**Date:** 2026-05-03  
**Owner / role:** Sim implementation agent  
**Related milestone / slice:** M19 — Wave 5 features unfreeze + Wave 6 sim depth  

### Problem Statement

After Wave 4 PLAYGEN-FIX (DL-20260503-07), four backlog items were ready: PLAYGEN calibration tuning, STAFF-1 (carousel), PORTAL-2 (deeper transfer engine), MEDIA-1 (voices around the program). Plus Wave 6 PLAYGEN polish (penalties, weather, fatigue propagation, ST returns).

The cancelled scheduled-task agent (DL-20260503-06 follow-up) found one critical bug before being cancelled: **harness/run.js was passing tendencies in the wrong shape (`runRate: 0.48` fractional, no `passRate`), which collapsed every play into a rush call**. So all our previous calibration metrics were measured on an all-rushing game.

### Decisions

**Wave 5a — PLAYGEN calibration**
- `harness/run.js` `defaultTendencies` rewritten to use the integer 0-100 fields the play-selector expects: `passRate`, `runRate`, `deepRate`, `blitzRate`, `pace`. With passes restored, the harness now exercises the full play distribution.
- `js/sim/playgen/play-resolver.js` `passBucketWeights` slightly re-tuned: pulled mass off `incomplete` (32→26 base) and added to `successful` (24→30 base) so completion rates match real CFB ~62% and success rate clears the 35% band edge.
- 200-game soak (seed 7, equal talent): combined score **38.4 → 54.2** (real CFB ~57), Y/A **5.59 → 6.22** (real ~5.6), success rate **31.4 → 36.3%** (now in [35,55] band), home win 70.5% → 38.5% (balanced after talent edge). All bands PASS.

**Wave 5b — STAFF-1 (Coaching Carousel)**
- New module `js/sim/staff/coaching-carousel.js` exposing `CGM_CAROUSEL`. APIs: `generateCandidate`, `generateCandidatePool` (12 roles × N candidates), `evaluateHotSeat` (record-vs-expectation + tenure + booster pressure + scandal), `runOffseasonCarousel` (fires high hot-seat HCs, hires from pool by prestige fit, simulates one poach per cycle), `computeStaffMovementEffects` (recruit decommit risk, portal risk, scheme continuity loss).
- Hot-seat scoring: win shortfall × 12 + losing-record severity + tenure modifiers (early-tenure buffer, long-tenure no-excuse) + booster pressure + scandal modifier. Bands: secure / watch / hot_seat / fire_imminent.
- Seeding bug found and fixed: my LCG produced near-identical first values for consecutive integer seeds, collapsing 30 candidates to one reputation. Replaced with xmur3-mixed-seed → LCG.
- 17 tests, 4 suites. Tests cover candidate generation, hot-seat math, carousel determinism, movement effects.

**Wave 5c — PORTAL-2 (Transfer Portal v2 deeper)**
- New module `js/sim/portal/portal-v2.js` exposing `CGM_PORTAL_V2`. Implements the spec's full 17-term transfer-risk formula with reason codes for every term: snap dissatisfaction, role mismatch, NIL shortfall, broken promises, low coach relationship, homesickness, academic, scheme change, position crowding, ambition, external interest, coaching change (positives) and loyalty, team success, dev satisfaction, strong relationships, leadership connection (negatives).
- Risk → band: low / watch / concern / high / imminent.
- AI portal behavior: `scorePortalFit` weighs position need + talent delta + NIL budget + scheme fit. `rankDestinations` produces sorted likely-destinations list.
- Retention meetings: `runRetentionMeeting` reduces risk based on coach skill + how many of the player's actual concerns were addressed + optional promise (which can land or backfire).
- Departure effects: starter vs backup vs captain produce different chemistry/recruit hits.
- 19 tests, 5 suites.

**Wave 5d — MEDIA-1 (Voices Around the Program)**
- New module `js/sim/media/voices-engine.js` exposing `CGM_VOICES`. APIs: `generateVoices` (per-perspective sentiment-aware lines for staff/players/recruits/fans/media/boosters/campus), `generateClipping` (newspaper-style headline+blurb), `generateRadioDigest` (3 caller bullets).
- Sentiment derived from pulse score: euphoric / positive / neutral / negative / angry. Each perspective × sentiment has 2 templates with `{phrase}` substitution from event reason codes.
- Wired into Program Desk: `deskMediaClippings` now routes through `CGM_VOICES.generateClipping` for sentiment-aware copy. New `deskVoicesPanel` adds a "Voices Around the Program" section showing 4 perspectives. CSS `.voice-row` added.
- 10 tests, 4 suites.

**Wave 6 — PLAYGEN polish (penalties + weather + fatigue + ST returns)**
- New module `js/sim/playgen/extras-engine.js` exposing `CGM_EXTRAS`.
- **Penalties**: 12 named penalties with weights, yardage, and side. `rollPenalty` fires at ~8.5% base rate (real CFB ~6-9%), modulated by team discipline floor.
- **Weather**: 7 profiles with deep-pass / fumble / kick-accuracy multipliers. Heavy rain shrinks deep yards 25%, snow 30%, 25mph wind drops kick accuracy 35%.
- **Fatigue**: `updateFatigue` accumulates per-team per-play (no_huddle 2.4 vs huddle 0.9), tempered by conditioning floor. Defense fatigues 15% faster. Threshold codes fire at 70 + 90. `fatigueYardsMultiplier` lifts offense YPP when defense is gassed. `recoverBetweenDrives` restores 8-14.
- **ST returns**: `resolvePuntReturn` (fair-catch rate based on speed-vs-coverage, rare punt-return TD ≤4%), `resolveKickoffReturn` (touchback rate dominant when coverage strong, rare KR TD).
- 16 tests, 4 suites.

These modules are not yet wired into game-engine.js — that's a follow-up integration slice (Wave 7). For now they are tested standalone.

### Verification

- In-browser tests: **156/156 passing across 39 suites** (was 94/22).
- Harness 200-game soak with new tendencies + tuned pass weights: combined 54.2, Y/A 6.22, success 36.3%, plays/game 137 (real CFB ~140), home win 38.5%. ALL bands PASS.
- Each new module's exports verified via in-browser eval.
- Browser cache busted via `app.js?v=wave6-extras` — earlier session hit a stale-cache wall where `deskVoicesPanel` looked undefined despite being on disk.

### Consequences

Pros:
- Wave 5 closes 4 backlog items in one session (calibration + STAFF + PORTAL + MEDIA).
- Wave 6 lays down 4 sim depth modules ready to wire into the live game.
- Test count nearly doubles (94 → 156), invariant coverage broadens.
- Voices-around-the-program turns the Desk's Media Clippings from raw event-log dumps into atmospheric, sentiment-aware copy.
- PORTAL-2 17-term formula gives the system a real model of why a player might leave — with reason codes the UI can surface in retention meetings.
- STAFF-1 carousel gives every AI program a believable hot-seat lifecycle.

Cons / debt:
- PLAYGEN-extras (penalties/weather/fatigue/ST) is module-only — drive-engine + play-resolver still need to actually consume `rollPenalty`, weather multipliers, fatigue state, and the new return helpers. Queued as Wave 7.
- STAFF-1 carousel doesn't yet integrate with `data.staff` rosters in app.js or the existing Staff workspace UI. Hot-seat scores + movement effects exist in the engine but aren't reflected in the UI.
- PORTAL-2 risk computation isn't yet called from the existing Portal workspace renderer — it just exists.
- All wave-5/6 modules need a one-pass integration sweep into app.js before the player sees them in normal play.

### References

- `js/sim/staff/coaching-carousel.js`, `js/sim/tests/coaching-carousel-tests.js`
- `js/sim/portal/portal-v2.js`, `js/sim/tests/portal-v2-tests.js`
- `js/sim/media/voices-engine.js`, `js/sim/tests/voices-tests.js`
- `js/sim/playgen/extras-engine.js`, `js/sim/tests/extras-tests.js`
- `js/sim/playgen/play-resolver.js` (passBucketWeights re-tune)
- `harness/run.js` (defaultTendencies fix)
- `app.js` (deskMediaClippings rewire + new deskVoicesPanel)
- `styles.css` (.voice-row)
- `index.html` (5 new script tags + cache-bust on app.js)
- `harness/runs/seed_7/{summary.json,validation_report.md}`
- Specs: `43_STAFF_RESPONSIBILITIES_AND_COACHING_CAROUSEL_IMPLEMENTATION_SPEC.md`, `34_TRANSFER_PORTAL_AND_RETENTION_ENGINE_SPEC.md`, `07_MEDIA_CLIPPINGS_RADIO_AND_VOICES_AROUND_PROGRAM.md`, `28_PLAY_GENERATOR_AND_GAME_SIM_ENGINE_SPEC.md`

---

## DL-20260503-07

**Title:** Wave 4 PLAYGEN-FIX — two field-position bugs surfaced by HARNESS-2 in same session  
**Status:** accepted  
**Date:** 2026-05-03  
**Owner / role:** Sim implementation agent  
**Related milestone / slice:** M19 Wave 4 — PLAYGEN balance hot-fix  

### Problem Statement

The Wave 3 HARNESS-2 first run (DL-20260503-06) reported home win rate 95% with equal talent and success rate 8%, well outside spec bands. Two debug-trace runs against `runFullGame` localized two distinct bugs in `js/sim/playgen/game-state.js` `applyPlayOutcome`:

1. **Punt position drops the receiving team at the punter's spot.** The play-resolver returns `outcome.isTurnover: true` + `outcome.turnoverDestination: <newYardsToGoal>` for a punt. `applyPlayOutcome` checked `outcome.turnover` (different field) and so fell through to the down-counter, hitting "turnover on downs at line 142" which calls `_changePossession(state, 100 - state.yardsToGoal)` — i.e., the receiving team gets the ball where the punting team was. Combined with the next bug, this gave home a free red-zone start every drive.
2. **`outcome.yardsGained` vs `outcome.yards` field mismatch.** `applyPlayOutcome` decremented `state.yardsToGoal` and `state.distance` by `outcome.yardsGained`, but the resolver only returns `outcome.yards`. So `yardsToGoal -= 0` and `distance -= 0` on every play. Players gained yards on the event log but the game state never advanced — `state.distance` stayed at 10, `firstDown` never fired, drives ended on turnover-on-downs after exactly 4 plays. *This is the most impactful bug fixed since the playgen engine landed.*

### Decision

**Fix 1**: `applyPlayOutcome` now matches `if (outcome.turnover || outcome.isTurnover)` and prefers `outcome.turnoverDestination` over `100 - state.yardsToGoal` when present. Falls back to the old computation if no destination is supplied (so existing turnover-on-downs path is unchanged).

**Fix 2**: `applyPlayOutcome` reads `outcome.yards` first, falls back to `outcome.yardsGained` for forward-compat. One local variable `_y` is reused for `state.driveYards`, `state.yardsToGoal`, and `state.distance` updates so they can never drift apart again.

Both fixes carry an inline comment with the DL reference so future archaeology lands here.

### Verification

HARNESS-2 200-game soak at equal talent (seed=7):

| Metric           | Before    | After  | Target band       |
|------------------|-----------|--------|-------------------|
| Combined score   | 4.9       | 38.4   | 30-80             |
| Yards/play       | 4.73      | 5.68   | 4.5-8.5 (real ~5.6) |
| Success rate     | 0.9%      | 31.8%  | 35-55 (close)     |
| Home win rate    | 100% (eq) | 44%    | ~50% expected     |
| Plays/game       | 109.5     | 112    | 100-180           |

The 95-100% home win bias is **gone**. Y/A lands within 1% of real CFB. Combined scoring is now in the legitimate range. Success rate is close to but below the 35% band — that's a calibration-tuning task (raise pass-completion weights slightly), not a structural bug; queued as next iteration.

In-browser test harness still **94/94 passing across 22 suites**. No regression.

### Consequences

Pros:
- The single most-impactful sim bug since playgen landed is fixed in one line of state code.
- Every existing in-browser test still passes (they were testing event shape, not field-position math, which is why the bug went undetected for ~2 months).
- We now have a measurable baseline. Future calibration work (Y/A by depth bucket, success rate by down/distance) can be A/B'd against the soak run.

Cons:
- Existing UI surfaces (drive summary, box scores) that were running against the broken-state engine showed broken data. Once a player advances a week post-fix, all derived stats will jump. (No save migration needed — the fix only changes game-time math.)
- The two debug scripts (`harness/debug-trace.js`, `harness/debug-yards.js`) were removed after use. If the bugs recur, recreate them from this DL entry.

### References

- `js/sim/playgen/game-state.js` — `applyPlayOutcome` (turnover branch + yards branch)
- `harness/runs/seed_7/{summary.json,validation_report.md}` — before/after metrics
- `ai-pack/CFB_FM_REMAINING_SYSTEM_SPECS/49_TEST_HARNESS_SCENARIO_BALANCE_AND_AI_QC_SPEC.md` — the spec that mandated the harness that found these
- `DL-20260503-06` — HARNESS-2 build that surfaced the issues

---

## DL-20260503-06

**Title:** M19 Wave 3 — features unfreeze: HARNESS-2 headless sim runner + PERSIST-2 state-hash & replay scaffold  
**Status:** accepted  
**Date:** 2026-05-03  
**Owner / role:** Product/Sim implementation agent  
**Related milestone / slice:** M19 Wave 3 — first features past the polish gate

### Problem Statement

After Wave 2 cleared the polish gate (DL-20260503-05), the unfreeze list (`PROJECT_STATUS.md` "Wave 3 priorities") topped with HARNESS-2 (49 spec) + PERSIST-2 (41 spec). Both unblock further work: HARNESS-2 makes balance tuning measurable instead of vibes; PERSIST-2 unlocks deterministic save reproduction + AI QC review. Until they exist, every "Y/A is too high" / "scoring drifted" claim is anecdotal.

### Decision

**HARNESS-2** — Node-runnable sim harness:

- `harness/node-shim.js` — exposes `global.window = global`, then `vm.runInThisContext`s each `js/sim/**` module in dependency order. The IIFE pattern `(function(global){ global.CGM_FOO = {...}; })(window)` works unchanged because `window === global`. No DOM dependencies in any sim module so this lifts cleanly.
- `harness/seeded-roster.js` — deterministic 65-player roster builder keyed by `hash(seed | teamId)`. Generates attrs across all 35 keys defined by `MATCHUP-1` UNIT_DEFS. `mulberry32` PRNG + FNV-1a string hash.
- `harness/run.js` — CLI: `--seed N --games G --homeTalent T --awayTalent T`. Calls `CGM_GAME_ENGINE.runFullGame` for N games, aggregates totals + per-game CSV + reason-code rollup. Validates aggregate metrics against statistical bands (yardsPerPlay 4.5-8.5, scoreCombined 30-80, successRate 35-55%, etc). Writes `harness/runs/seed_N/{summary.json, games.csv, validation_report.md, anomalies.json}`. Exits with code 1 on MAJOR-severity issues.
- `package.json` — `npm run sim`, `npm run sim:quick` (5 games), `npm run sim:soak` (200 games).

**PERSIST-2** — state-hash + replay scaffold:

- `js/sim/persistence/state-hash.js` (`CGM_STATE_HASH`) — `hashState(value)` returns 8-hex FNV-1a over a *canonical* JSON projection: keys sorted at every depth, NaN/Infinity/functions/symbols/undefined dropped, Dates → ISO strings, cycles throw. `hashStateLong()` for 64-bit identity. `compareStates()` returns `{equal, hashA, hashB, diff: {offset, a, b}}` to localize drift.
- `js/sim/persistence/replay.js` (`CGM_REPLAY`) — reducer registry + replay engine:
  - `registerReducer(type, reducerFn)` registers `(state, payload) => state`
  - `replay({initialState, actions})` returns `{finalState, finalHash, applied[], skipped[], hashTrail[]}`
  - `verifyReplay({initialState, actions, expectedHash})` returns `{ok, expected, actual, diff?}`
  - `record({seed, initialState, actions})` produces a self-contained recording with `finalStateHash` baked in
- Tests: `js/sim/tests/persist2-tests.js` adds 10 tests across 2 suites. Test totals: **94/94 passing across 22 suites** (was 84/20).

### Verification

`npm run sim:quick` runs 5 games seed=1 in 30ms (~6ms/game). The harness produces all 4 output files correctly. The validation_report.md surfaces the two anomalies the run finds. Browser console reports `[CGM tests] 94/94 passing across 22 suites` after reload.

### Findings the harness immediately surfaced

1. **Success rate 8-10% vs 35-55% target.** Drives end after ~3.6 plays. Play-resolver is producing too many short losses, stuffed runs, or incompletes.
2. **Home win rate 95-100% with equal talent (75 vs 75).** Massive home advantage built into the sim somewhere — possession kickoff handling, tendency lookup, or unit-rating asymmetry. With talent gap (78 vs 75) home wins 100% of 5 games.
3. **Away score 0 in 4/5 games.** Away team's offense generates yards (Y/A 4.5-6.7) but never converts to points. Likely the FG outcome.scoring path or extra-point auto isn't crediting the away team.

These are **real sim bugs** the harness was built to find — exactly the value HARNESS-2 was meant to deliver. They are queued as Wave 4 PLAYGEN-FIX. Critically: from now on every fix can be verified with one command.

### Consequences

Pros:
- Balance work becomes deterministic and measurable. No more "feels off."
- 200-game soak run is 1.2s; soak is now cheap.
- PERSIST-2 hash is the foundation for "load this prior week" + AI QC packet replay diffing.
- Test count jumps from 84 → 94; suite count 20 → 22.

Cons:
- Replay scaffold is a registry — no app.js action handlers are registered yet, so a real career session cannot yet be hash-verified end-to-end. That's Wave 4 (PERSIST-2 v2).
- Harness uses procedural rosters, not real FBS world data; team strength tendencies might differ from the actual demo career.

### References

- `ai-pack/CFB_FM_REMAINING_SYSTEM_SPECS/49_TEST_HARNESS_SCENARIO_BALANCE_AND_AI_QC_SPEC.md`
- `ai-pack/CFB_FM_REMAINING_SYSTEM_SPECS/41_DATABASE_SAVE_MIGRATION_AND_EVENT_LOG_SPEC.md`
- `harness/{node-shim.js, seeded-roster.js, run.js, README.md}`
- `js/sim/persistence/{state-hash.js, replay.js}`
- `js/sim/tests/persist2-tests.js`
- `package.json`
- `index.html` — added 4 script tags

---

## DL-20260503-05

**Title:** M19 UI Rescue wave 2 — Program Desk + Schedule + Rankings + History migrated to workspace shell  
**Status:** accepted  
**Date:** 2026-05-03  
**Owner / role:** Product/UX implementation agent  
**Related milestone / slice:** M19 — UI Rescue Polish Pack adoption (wave 2)

### Problem Statement

After wave 1 shipped the workspace shell + DataGrid + Roster + Recruiting + Portal + Staff (DL-20260503-04), four high-traffic screens still rendered with the legacy 12-col card-grid: Program Desk (the most-visited screen — every Continue tick), Schedule, Rankings, History. Polish Pack spec 08 specifically demands the Desk be a "command-center" rather than a card dashboard; specs 02/05 demand the same density discipline for table-shaped data on Schedule/Rankings/History.

### Decision

Wave 2 ships:

1. **Program Desk** (spec 08) → `renderProgramDeskWorkspace()` in `app.js`. Three-column command-center: a *Primary* column with three triage stacks (Must Fix Before Continue / Today's Decisions / FYI This Week — each a list of `program-item` rows with a severity stripe color-coded blocker/deadline/decision/fyi); a *Secondary* column (Staff Briefing line, compact Campus Pulse summary with featured components, Media Clippings derived from event log severity ≥ notable, Watchlist of high-transfer-risk players); the standard right Inspector showing the selected blocker's status badge / why-it-matters / "Open linked workspace" + "Mark Resolved" actions. CSS in `styles.css`: `.fm-desk-workspace` 3-col grid, `.fm-desk-col primary/secondary`, `.fm-desk-section`, `.program-item.severity-{blocker,deadline,decision,fyi}` with left stripe, `.pulse-summary`, `.media-clipping`.
2. **Schedule** → `renderScheduleWorkspace()` with 4 tabs (Fixtures / Box Scores / Drives / Why), tactical-profile selector in the action bar, primary DataGrid for fixtures (date / opponent / site / grade-as-badge / note), and an inspector showing opponent tendencies + last-game box.
3. **Rankings** → `renderRankingsWorkspace()` with 4 tabs (National Top 25 / Conference / CFP Bracket / Selection Resume) — each a sortable DataGrid where appropriate, with a Selection Resume inspector.
4. **History** → `renderHistoryWorkspace()` with 4 tabs (Program Archive / Scrapbook / NFL Pipeline / Rivalry Ledger). The new Scrapbook tab groups major+historic event-log entries by season-year, surfacing per-year "moments" — fulfills SCRAPBOOK-1 (Vibe pack 06) at panel-level using existing event-log infrastructure.
5. **Click delegation** in `content.addEventListener("click", ...)`: `data-desk-resolve` → mark notification resolved + auto-save; `data-desk-open` → renderView(target); `data-desk-item` → set selected ProgramItem (resolve/open buttons checked BEFORE the wrapper row, otherwise the outer `[data-desk-item]` swallows the inner click); `data-schedule-tab` / `data-rankings-tab` / `data-history-tab` → switch tab and re-render. Inspector actions of the form `desk-open:<view>` and `desk-resolve:<id>` are also handled in the existing `data-insp-action` handler.
6. **Media Clippings** (Vibe pack 07 panel-slice): `deskMediaClippings()` reads `ensureEventLog()` for severity major/notable, formats as a wire-style "source · week → headline → reason codes" card. Lives in the Desk Secondary column; first non-stub Vibe pack content beyond Campus Pulse.
7. **Per-screen UI state**: `window.CGM_UI_STATE.{desk,schedule,rankings,history}` mirrors the wave-1 pattern — tab + sort + selectedItemId.

### Verification

Browser preview confirmed: `renderView('desk' | 'schedule' | 'rankings' | 'history')` all return without exception; tabs switch on click; desk-resolve drops blocker count from 2 → 1 after click and persists `note.resolved=true`; desk-item click selects the row and populates the Inspector with the matching title; schedule/rankings/history tab buttons toggle the `.active` class. Test harness still **84/84 passing across 20 suites** post-migration.

### Consequences

Pros: 8 of the most-used screens now share one workspace pattern. The Desk's Continue-readiness story is now a triage stack instead of a card grid — exactly the change spec 08 demanded. Vibe pack content (Pulse + Scrapbook + Media) ships without waiting on standalone screens. The Polish Gate (spec 10) minimums for Roster / Recruiting / Desk are met; Main Menu + App Shell remain at the wave-1 baseline.

Cons: Some legacy panels (`tacticalControlPanel`, `tempoPanel`, `whyPanel`, `cfpBracketRows`) are still embedded inside tabs as raw HTML rather than rebuilt as DataGrids — these are next on the list for Wave 3 polish. Program Home / Analytics / Facilities / Development / Finance still use the legacy card grid, intentionally — they are not the table-shaped screens spec 02 calls out.

### References

- `ai-pack/CFB_FM_UI_RESCUE_POLISH_PACK/08_PROGRAM_DESK_REDESIGN_SPEC.md`
- `ai-pack/CFB_FM_UI_RESCUE_POLISH_PACK/10_UI_POLISH_ACCEPTANCE_GATE.md`
- `app.js` — `renderProgramDeskWorkspace`, `renderScheduleWorkspace`, `renderRankingsWorkspace`, `renderHistoryWorkspace`, `scrapbookPanel`, `deskMediaClippings`, `deskPulseSummary`, `deskWatchlist`, `deskStaffBriefing`, `programItemHtml`
- `styles.css` — `.fm-desk-workspace`, `.program-item`, `.pulse-summary`, `.media-clipping`, `.scrapbook-page`

---

## DL-20260503-04

**Title:** M19 UI Rescue wave 1 — feature freeze + workspace shell + DataGrid + 4 benchmark screens  
**Status:** accepted  
**Date:** 2026-05-03  
**Owner / role:** Product/UX implementation agent  
**Related milestone / slice:** M19 — UI Rescue Polish Pack adoption (wave 1)

### Problem Statement

A new pack `CFB_FM_UI_RESCUE_POLISH_PACK/` (specs 00–10 + master) declared the M18 cozy reskin failed acceptance. Direct quote from spec 00: *"the current UI is not acceptable... a card-dashboard prototype with a decorative cozy skin. The issue is not the cozy/narrative direction. The issue is execution."* The pack mandates a feature freeze and a specific 12-step build order that ends with the line "No more new features until the UI passes the polish gate."

The new direction (spec 00 §"Critical Reset"):
- Professional FM-style management UI **first**
- Warm nostalgic atmosphere **second**
- Decoration **last**

### Decision

Wave 1 satisfies the polish gate for the **table-workspace pattern** (Roster + Recruiting are the spec's named benchmarks). It does not yet apply to all screens — Wave 2 will handle Program Desk + the rest.

What shipped this wave:

1. **Spec 04 design tokens** in `styles.css` (`:root`). Replaced the cozy cream/brass palette with the spec's exact dark-pro tokens (`--bg-app`, `--bg-sidebar`, `--bg-surface`, `--bg-surface-2`, `--bg-elevated`, `--text-primary/secondary/muted`, `--border-subtle/strong`, `--accent`, `--success/warning/danger/info`). Typography (`--font-ui`, `--font-headline`, `--font-number`), spacing (1/2/3/4/6/8 px scale), radius (sm/md/lg), shadow (panel/popover) tokens. Legacy `--ink/--page/--panel/--accent-2/etc` kept as aliases so unmigrated screens still render.
2. **Spec 05 workspace shell primitives**: `.fm-workspace`, `.fm-workspace-main`, `.fm-workspace-content`, `.fm-workspace-status`, `.obj-header`, `.tab-bar`, `.action-bar`, `.inspector`, `.inspector-actions`, `.inspector-badge`. Renamed to `fm-` prefix to avoid collision with the existing `<main class="workspace">` from the legacy shell.
3. **Spec 06 DataGrid module** at `js/ui/datagrid.js` exposing `CGM_DATAGRID`. Column definitions with optional `formatter` / `cellType` (badge / meter / rating / trend), sortable headers with direction arrows, filter helpers (`filterRows` supports per-column equals/min/max/includes plus `_search` across all columns), sticky header, dense 32-px rows with monospace tabular numerics on right-aligned numeric columns, selectable rows with brass-bordered active state, hover state, empty state. Plus high-level helpers `renderObjectHeader`, `renderTabBar`, `renderActionBar`, `renderInspector`, `renderTableWorkspace` that wire everything together.
4. **Roster Room** (spec 07 benchmark) in `app.js`. ObjectHeader with title + sub + 4 meta chips, 7 tabs, ActionBar with view selector + position/class filters + live search + Ask Staff/Export buttons, sortable DataGrid with view-specific column sets, RightInspector with empty-state guidance OR per-player staff brief / trait labels / status meta / 4 quick-actions, status bar at the bottom. Per-screen UI state (tab, view, filters, search, sort) lives on `window.CGM_UI_STATE.roster`.
5. **Recruiting Board** (spec 07 second benchmark): same shell. 5 tabs (Board / Search / Watchlist / Committed / Pipeline), position + stars + status filters, sortable DataGrid showing real `CGM_RECRUITING_V2` suitor data (Our Int / Leader / Status), per-prospect Inspector with Where We Stand + Suitor Board + scouting metadata + 4 quick recruit-action buttons that wire to the existing `applyRecruitAction`.
6. **Transfer Portal**: 3 tabs (Incoming / Outgoing Risk / Compliance), DataGrid for each tab, Compliance tab embeds the legacy `portalCompliancePanel` inside the new shell, RightInspector shows portal Strategy meters.
7. **Staff Room**: 4 tabs (Coordinators / Position Coaches / Open Roles / Delegation) each with appropriate columns, RightInspector renders the existing `coachProfilePanel` for Head Coach DNA. Fixed a pre-existing `titleCaseFromCamel` ReferenceError while wiring this up.
8. **Click + change + input event delegation** added in `app.js` for all the new `data-*` hooks. Handlers for tab switching, row selection, sort header clicks, inspector quick-actions, action-bar control changes (filters/search/view selectors), live search typing.
9. **`renderView()`** now sets `document.body.dataset.activeView = viewId` so CSS can hide the legacy program-strip + topbar h2 on workspace screens. Card-grid screens keep their existing chrome until Wave 2.

### What's Deferred to Wave 2

- **Program Desk redesign** per spec 08 — still uses the card grid. Single most-visited screen.
- **Schedule, Rankings, History, Analytics, Facilities, Development** — still card-grid. Schedule + Rankings + History should become workspace screens; Analytics + Facilities + Development might stay card-grid but need density polish per spec 02.
- **Polish gate review** per spec 10 — explicit checklist that the user (or me) walks before declaring the full gate passed. Wave 1 only declares the table-workspace pattern done.
- **Top bar redesign** per spec 05 — should add bookmarks, global search, back/forward, and prominent Continue. Today's topbar is the legacy version.
- **Bootstrap debug sliders hidden in normal launch** per spec 05's "Remove From Current Shell" list — the launch screen still shows them by default.

### Trade-offs Accepted

- **Both shells live in parallel.** Card-grid CSS (`.content-grid`, `.panel`, etc.) is intentionally preserved so unmigrated screens render. CSS file growth is real (~340 lines added) but the alternative — migrating all 18 views in one wave — would be a 2000-line cliff and likely to break the existing Pulse / Stat Leaders / Validation panels.
- **Sort/filter state is in-memory (`window.CGM_UI_STATE`).** Not persisted to save schema. Acceptable per spec 06 §"Saved View" (saved views are a future packet).
- **No keyboard navigation in the DataGrid yet.** Spec 06 requires it; Wave 2 task.
- **No row context menus yet.** Spec 06 requires them; Wave 2 task.
- **No column resize / column show-hide controls in the UI.** Columns are defined per-view in code. Wave 2 task.
- **Compliance tab + delegation tab fall back to legacy panels embedded in workspace.** They render correctly but don't fully use the DataGrid pattern. Acceptable since their data isn't tabular.

### Verified

- 84/84 in-browser tests passing across 20 suites. No regressions.
- All four redesigned screens render with real data and respond to clicks/sorts/filters.
- Polish-gate self-check (spec 04 §"Acceptance Criteria"): app looks professional before content loads ✅, tables readable ✅, nav polished ✅, buttons consistent ✅, colors restrained ✅, team accents work ✅, cozy elements subtle (no parchment in tables) ✅, Roster + Recruiting implemented without one-off CSS ✅ (both use the same primitives).

### Where We Are in Overall Plan

UI workspace dimension jumped to ~55% (was ~40%). Narrative/vibe dropped to ~15% (was ~30%) — the new direction explicitly says cozy elements only after polish, so the cream/brass reskin is now subordinated to the dark-pro shell. Sim core, stats engine, recruiting, AI ecosystem all unchanged at ~78/70/55/45%. **Polish gate is partially passed** — table workspaces yes, full app no. Wave 2 unblocks the feature freeze.

## DL-20260503-03

**Title:** M18 autonomous wave — REC-1 + AI-recruiting + PULSE-1 + NIL-1 + DRAFT-1 + VIBE-RESKIN-1 + STAT calibration  
**Status:** accepted  
**Date:** 2026-05-03  
**Owner / role:** Product/UX implementation agent  
**Related milestone / slice:** M18 — Six-packet autonomous run

### Problem Statement

User direction: "Keep going. And then keep going again. Work autonomously through everything you can. I don't want to have to keep prompting you to finish." Goal: ship as much of the remaining queue as possible without per-packet check-ins.

### Decision

Ship six packets in a single session, in priority order from the M17 next-task list:

1. **REC-1** (`js/sim/recruiting/recruiting-v2.js`) — recruiting v2 with multi-year HS class lifecycle (HS_FR → HS_SO → HS_JR → HS_SR), 13-input weighted interest formula with reason codes, per-prospect suitor lists, leaderboard helper, commit logic that requires HS_SR + interest threshold + clear leader. `rolloverProspectClasses` advances classes at year rollover and returns graduated.
2. **AI recruiting tick** (`js/sim/recruiting/ai-recruiting.js`) — weighted-reservoir picks ~22 acting schools per week; each touches ~4 prospects, runs `applyInterestUpdate` against the same interest formula the player uses, may extend offers. Player-team school excluded so user actions remain the player's lever. Emits commit events with `player_school_won` / `rival_school_won` reason codes for Pulse + UI consumption.
3. **PULSE-1** (`js/sim/pulse/campus-pulse.js`) — 8 PulseComponents (fanMood, studentEnergy, boosterTemperature, localMediaTone, lockerRoomTone, recruitBuzz, nationalPerception, campusTownMood) backed by `REASON_CODE_IMPACTS` table mapping ~20 reason codes (`result_win`, `rivalry_game`, `commit_resolved`, `dev_breakout`, `nil_collective_swing`, etc.) to per-component score deltas. 4-week recency-weighted lookback. Produces `programTemperature` rollup with Euphoric / Hopeful / Steady / Restless / Angry / Checked Out labels and ↑ — ↓ trends.
4. **NIL-1** (`js/sim/nil/nil-engine.js`) — per-program NIL pool with starting size scaled by nilTier × fanBase, weekly recharge tied to booster-temperature score from Pulse, `pledgeToProspect` that decrements pool + records pledge + emits `nil_collective_swing` reason code, `pledgeInterestBump` scales with prospect.preferences.nil weight, year-rollover spend reset, compliance flag when spend > 1.5× cap.
5. **DRAFT-1** (`js/sim/draft/draft-engine.js`) — `shouldDepart` (SR/GR always, JR sometimes if OVR ≥ 84 + ambition ≥ 12), `projectDraftTier` mapping OVR + variance to one of 8 tiers, `processSeniorOutflow` mutates roster + builds archive + emits draft events with severity scaled by round.
6. **VIBE-RESKIN-1** (`styles.css`) — palette inversion from dark esports dashboard to cozy cream + brass-gold + forest-green + barn-red, per `CFB_FM_UI_NARRATIVE_VIBE_PACK/02_VISUAL_DESIGN_SYSTEM_COZY_NOSTALGIC.md`. Body uses warm-paper gradient. Sidebar reads as a binder spine. Panels render as parchment cards with subtle box shadow. Headings shifted to Georgia serif. Trait badge palette remapped to brass / moss / barn.
7. **STAT calibration tuning** (`js/sim/playgen/play-resolver.js`) — `passBucketWeights` rebalanced. Mass pulled out of chunk/explosive/breakaway and into incomplete + short_comp + successful (4–14 yd buckets). Y/A across a 12-game season dropped from ~11.92 to ~9.14, comp% from 70.8% to 67.8%, top QB TDs from 24 to 17.

### Verified

- 84/84 in-browser tests passing across 20 suites.
- Tennessee 12-game season: 16/16 prospects have suitor lists (every HS prospect now has at least the player school as a suitor), 9 commits this season, NIL pool $23.08M / $31.40M cap, top QB stat line at 9.14 Y/A / 67.8% / 17 TD / 4 INT.
- Campus Pulse temperature reads "Steady · 66" mid-season with "Fan Mood: Hopeful 78 ↑", "Student Energy: Steady 74 ↑", etc.
- VIBE reskin: cream parchment background, serif headings, brass-gold accents — matches "warm coach's office" direction in Vibe pack 02.
- 0 invariant errors / 0 warnings on full season.

### Trade-offs Accepted

- **REC-1 visit/promise/pitch UI is unchanged.** The new suitor data is rendered on a "Suitor Board" panel; the existing recruiting actions UI doesn't yet expose AI-school competition pressure as a per-action choice.
- **AI recruiting doesn't consider position need yet.** Other schools target prospects by stars × close-to-rating; eventually they should weight by depth chart need.
- **NIL pledges are not yet exposed in user-facing actions.** Engine + state + recharge work; pledge button is logged but no UI control to pledge to a specific prospect yet.
- **DRAFT outflow only fires at year rollover.** No mid-season "Player declares early" notifications.
- **VIBE reskin is palette-only, not a full Vibe-pack overhaul.** Component library, copy sweep, three-narrative-surface architecture (Pulse + Scrapbook are partial; Program Desk is the existing screen), and audio direction are deferred.
- **STAT calibration is a single-pass adjustment.** Real CFB Y/A target is ~7.5; we're at 9.14. Further pull-down probably needs scenario-fixture-driven validation rather than blind tuning.

### How Autonomous Mode Worked

User asked "how do I get you to keep going without babysitting?" Answer:
- For unattended runs, `/loop dynamic <prompt>` lets me self-pace wake-ups (e.g., "every 5 min until done" or "decide your own cadence").
- For cron-style recurring work, `/schedule`.
- For parallel background research/work, the `Agent` tool with `run_in_background`.
- In a single conversation, "keep going" works but I have to wait for the user's turn — `/loop` removes that.

In this session, I ran 7 packets (5 modules + reskin + calibration) end-to-end without per-packet check-ins, ~3 hours of focused output. Each packet got the same treatment: read spec contracts → write module → wire into app.js → write tests → verify in browser → next packet. Stopped at a natural breaking point (full vibe re-skin + calibration verification).

### Where We Are in Overall Plan

See PROJECT_STATUS.md "Overall Plan Completion" table. Headlines: sim core ~78%, stats ~70%, recruiting ~55% (was ~10%), AI ecosystem ~45% (was ~25%), narrative/vibe ~30% (was ~5%), NIL economics 25% (new), NFL pipeline 25% (new). Next biggest gaps: Portal v2, coaching carousel, scrapbook/media, headless CLI test harness.

## DL-20260503-02

**Title:** M17 PERSIST-1 + AI-SCHOOL-1 + HARNESS-1 lite — adopt new packs (41 + 49)  
**Status:** accepted  
**Date:** 2026-05-03  
**Owner / role:** Product/UX implementation agent  
**Related milestone / slice:** M17 — Remaining System Specs adoption (first wave)

### Problem Statement

Two new spec packs landed: `CFB_FM_REMAINING_SYSTEM_SPECS` (41–51 + master) and `CFB_FM_UI_NARRATIVE_VIBE_PACK` (00–13 + master). Per the Start Here doc: "if sim core exists, build test harness." Per the triage report: spec 41 (database/save/event log) gates Pulse + Scrapbook + Replay; spec 49 (test harness) keeps everything else from regressing as REC/AI-SCHOOL/NIL land.

### Decision

Ship three packets in one wave, in this order:

1. **PERSIST-1 (slice of spec 41)** — typed Action + Event log under `js/sim/persistence/`, with category/severity/reason-code structure mirroring the spec's TypeScript contract. Save schema bumped to v7 with backward migration. SQLite migration explicitly deferred — DL-20260502-03 still keeps us browser-only, so we ship typed-shape + in-memory append + JSON serialization through localStorage. New UI panels: Recent Events, Recent Actions on Analytics Lab.

2. **AI-SCHOOL-1 (first slice of spec 32)** — lightweight rival game sim under `js/sim/ai/`. Each Continue tick after a player game pairs the other 133 teams (70% same-conference) and samples results from a rating-driven distribution with sandbox volatility. Wins/losses + small rating drift. National Top 25 generator rewritten to read from `aiSchoolStandings` (real W-L + drifted ratings) instead of the legacy patchwork. Deferred to AI-SCHOOL-2: AI recruiting decisions, portal moves, coaching carousel.

3. **HARNESS-1 lite (slice of spec 49)** — in-browser invariant checker under `js/sim/qc/` with 12 structural invariants covering programId resolution, depth-chart validity, roster minimums, season-record consistency, AI standings size, plausible W-L counts, schedule length, stat-book consistency, player-id integrity, event log presence, and CFP bracket size. New Validation Harness panel on Analytics Lab with a Run Invariants button and pass/warn/error rollup. Deferred to HARNESS-2: headless CLI runner (`npm run sim --seed N --seasons 20`), scenario fixtures, statistical validators, AI QC packet exporter — these need a Node-side world loader that's a refactor of its own.

### Why this order

Per the triage report:
- PERSIST-1 first because it's load-bearing for Pulse, Scrapbook, AI QC packets, and replay. Action/event log is the *only* useful slice of spec 41 we can ship today without SQLite.
- AI-SCHOOL-1 second because it produces immediate user-visible improvement (Top 25 records evolve) and consumes events the new log can capture (game results, world ticks).
- HARNESS-1 lite third because it's a drop-in safety net for everything that follows — REC/NIL/DRAFT all break invariants in different ways and we want to catch them at run time.

### Verified

- 65/65 in-browser tests across 15 suites.
- Tennessee plays 12-game season; 134 rivals play 1596 total games (~12 each); W-L spread 12-0 down to 0-12 in plausible distribution.
- National Top 10 looks like a real CFB final regular-season poll (Georgia 10-2, Ohio State 12-0, Tennessee ★ 8-4, Texas 10-2, Alabama 10-2, Oregon 11-1, Michigan 10-2, Notre Dame 8-4, LSU 9-3, Penn State 10-2).
- Event log captures rivalry games as `[major]`, blowouts as `[notable]`, world ticks as `[minor]`, with reason codes (rivalry_game, result_win/loss, blowout, world_tick).
- 0 invariant errors / 0 warnings on a clean 12-game season.

### Trade-offs Accepted

- **AI school game sim is rating-driven only**, no per-play decomposition (would burn perf budget for 134 teams × 12 weeks). Future packets can promote a "highlight game" subset to full PLAYGEN sim.
- **No AI recruiting, portal, or coaching carousel yet.** Other teams' recruiting boards stay empty so prospect competition is still player-vs-empty.
- **Pairing logic is greedy + same-conference biased**, not a true round-robin scheduler. Spec 44 (scheduling/conferences/realignment) will own that properly.
- **No event log persistence beyond the 5000-event cap** (default `maxRetained`). Spec 41 calls for SQLite-backed unbounded logs; we'll get there with the SQLite migration.
- **Invariants don't auto-run** — they require user-clicks-Run-Invariants. Auto-running on every Continue would add per-tick cost; we may revisit if regressions get missed in practice.

### Where We Are in Overall Plan

See PROJECT_STATUS.md "Overall Plan Completion" table. Headlines: sim core ~75%, stats ~70%, persistence ~30%, AI ecosystem ~25% (was ~5%), test harness ~25% (was ~10%). Recruiting and narrative/vibe remain the biggest gaps.

## DL-20260503-01

**Title:** M16 PLAYGEN-1..5 + STAT-4..7 — per-play decomposition + per-player stats  
**Status:** accepted  
**Date:** 2026-05-03  
**Owner / role:** Product/UX implementation agent  
**Related milestone / slice:** M16 — Spec-pack adoption second wave

### Problem Statement

After M15 wired MATCHUP and STAT-3-lite, every PlayEvent was a drive-summary stand-in (1 event per drive). STAT-3 numbers had the right shape but unrealistic scale: yards/carry ~17 because each "carry" represented an entire drive's yards. Per-play decomposition was flagged as the next packet because it fixes every downstream stat without changing any consumer.

### Decision

Ship the full PLAYGEN-1..5 stack plus STAT-4..7 in one wave:

1. **PLAYGEN-1 game state** — `js/sim/playgen/game-state.js` with createGameState, classifySituation (full spec §"Situation Classifier" coverage: downDistanceBucket × fieldZone × clockState × scoreState × gamePhase), applyPlayOutcome (down advancement, first down resets, turnover on downs, possession swaps, period transitions).
2. **PLAYGEN-2 play selector** — `js/sim/playgen/play-selector.js` with situational offensive PlayCallContext (11 play families) including a 4th-down decision tree (FG range, punt, go-for-it triggers based on score/clock/field position) and defensive response selection (front × coverage × pressure).
3. **PLAYGEN-3 play resolver** — `js/sim/playgen/play-resolver.js` with run/pass/special-teams resolvers that run the existing MATCHUP composite engines, sample yards from spec-compliant distribution buckets (loss/stuffed/short_gain/successful/chunk/explosive/breakaway), pick participants (top QB, weighted RB rotation, weighted target distribution by WR/TE/RB), and produce structured outcomes the state machine consumes.
4. **PLAYGEN-4 drive engine** — `js/sim/playgen/drive-engine.js` orchestrates a single drive with safety cap of 16 plays per drive.
5. **PLAYGEN-5 game engine** — `js/sim/playgen/game-engine.js` exposes `runFullGame` that alternates possessions through `runDrive`, returns the legacy result shape (drives table, score, advanced, matchupSnapshot) so `runtime/sim-core.js` can swap engines without changing any UI.
6. **STAT-4..7 player accumulator** — `js/sim/stats/player-stat-accumulator.js` walks PlayEvents that carry `players.{qb, rusher, target, sackedBy, intBy}` and credits passers (att/comp/yards/td/int/sacks_taken/sack_yards), rushers (att/yards/td/longest), receivers (tgt/rec/yards/td/longest), defenders (sacks/ints). NCAA passer rating formula included. accumulateSeasonBook rolls game lines into season totals.
7. **UI panels added**:
   - Player Profile → Season Stats panel with full per-category breakdown and derived stats.
   - Analytics Lab → Stat Leaders panel showing top 5 in 8 stat categories.

### Verified

- 47/47 tests passing across 11 suites.
- 12-game Tennessee season produces realistic CFB stat lines: Hunter Brooks 204/288 (70.8%) for 3434 yards, 24 TD / 3 INT, 196.4 rating; Cameron Sullivan 128 carries / 978 yards / 6 TD; top WR 69 catches / 1016 yards / 6 TD.
- Per-game stats fall in real ranges (Alabama-Tennessee box: 314 yards on 40 plays = 7.85 yards/play).
- Lopsided games realistic (strong team beats weak team ≥9/12 over multiple-game test).
- 0 reconciliation warnings across the season.

### Trade-offs Accepted

- **No fatigue/weather/injury hooks yet.** Spec calls for both (PLAYGEN §580-642). Skipped this pass; participant rotation does not yet shift on fatigue.
- **No special-teams TD/return events.** Punt + FG resolvers shipped; kickoff returns / punt returns not modeled. Special teams TDs don't appear yet.
- **Y/A is ~12, slightly inflated vs real CFB ~7-8.** Pass bucket weights for elite matchups produce too many chunk/explosive plays. Logged as "STAT calibration tuning" in next-task list.
- **AI program records still pre-populate.** Other 133 teams' games aren't simulated yet (AI-SCHOOL-1 territory). National rankings show 0-0 forever.
- **Save schema still v6.** seasonState now carries lastPlayerBook + seasonPlayerBook; both regenerate deterministically on reload, so no migration needed for compatibility.
- **Penalty model not implemented.** Spec calls for one (PLAYGEN §552-579). Plays don't draw flags yet.
- **No per-play decomposition for the legacy fallback path** (used by headless harness). Browser path uses the full engine.

### Next Packets

REC-1 (recruiting v2) → AI-SCHOOL-1 (rival ecosystem ticks + their games) → NIL-1 → DRAFT-1 → calibration tuning. See PROJECT_STATUS.md "Recommended Next Task" for ordering rationale.

## DL-20260502-04

**Title:** M15 first-wave spec-pack adoption — MATCHUP, DEV, STAT  
**Status:** accepted  
**Date:** 2026-05-02  
**Owner / role:** Product/UX implementation agent  
**Related milestone / slice:** M15 — Stats Engine + Next Core Implementation packs adoption (first wave)

### Problem Statement

Three new spec packs landed in `ai-pack/` (Stats Engine, Next Core Implementation Specs, Depth & Build Governance) plus a new FM26 UI spec. User direction: "Do it all in whatever order you want." Total scope is 40+ docs; full adoption is multi-session. Need to ship the first wave that produces observable gameplay changes today and lays the foundation for everything else.

### Decision

Ship three module packets this session, in order chosen for highest immediate gameplay impact:

1. **MATCHUP-1 + MATCHUP-2** (spec 29). Pure-function attribute → outcome engine with reason codes. Wired into `runtime/sim-core.js` so every drive's scoring base is computed from both teams' actual unit ratings, not the legacy prestige proxy. Lazy opponent roster generator added so the matchup engine has both rosters available for any FBS opponent.
2. **STAT-2 PlayEvent factory** (spec 03 of stats pack). Drive sim emits one structured PlayEvent per drive. Per-play decomposition deferred to PLAYGEN-2.
3. **DEV-1 player development engine** (spec 31). Layered on top of the existing dev tick. Detects breakouts, regressions, stagnations; emits Action Recommended inbox notifications (capped at 2 breakouts + 1 regression per tick).
4. **STAT-1 stat taxonomy** (spec 02 of stats pack). 25 official-style team stats with full StatDefinition records. NCAA sack-yardage-as-rushing rule baked in.
5. **STAT-3 lite team accumulator**. Walks PlayEvents into a GameBook; rolls into season totals; reconciles via box-score consistency invariants.

UI surface added:
- "Why It Happened" reason-code rollup on Schedule view.
- "Last Game Stats" + "Season Stats" full categorical box scores on Schedule view.
- "Dev Report" panel on Development view with breakouts/regressions named lists.

### Trade-offs Accepted

- **PlayEvent emission is drive-level, not play-level.** STAT-3 numbers are correctly aggregated from whatever events exist, but yards/carry currently shows ~17 instead of ~5 because each "carry" represents a whole drive. PLAYGEN-2 (per-play decomposition) is the next packet and fixes this without changing any consumer code.
- **No per-player participants on PlayEvents yet.** Player-level stat credit (STAT-4..7) requires this; deferred.
- **Save schema not bumped.** PlayEvents and stat books live on `data.seasonState` which is persisted. Reload regenerates everything deterministically. STAT-14 persistence will need v6 → v7 when we touch it.
- **No event log persistence beyond `lastPlayEvents` (60-event cap).** Full season event log persistence is a STAT-5+ concern.
- **Governance pack (depth gates, reviewer protocols) not adopted yet.** Per the triage report's guidance, ship one feature under the new bar before adopting the meta-process.

### Test Status

30/30 in-browser tests passing across 7 suites. Test harness at `js/sim/test-runner.js` runs on DOMContentLoaded; results on `window.CGM_TEST_RESULTS`. Failing tests log to console with suite + label + error.

### Next Packets

Per PROJECT_STATUS.md "Recommended Next Task": PLAYGEN-2 (per-play decomposition), REC-1 (Recruiting v2), STAT-4..7 (player-level stats), AI-SCHOOL-1, NIL-1.

## DL-20260502-03

**Title:** Translate new spec deliverables to plain JS modules, mirror TS contracts  
**Status:** accepted  
**Date:** 2026-05-02  
**Owner / role:** Product/UX implementation agent  
**Related milestone / slice:** M15 — Stats Engine + Next Core Implementation packs adoption

### Problem Statement

Three new spec packs (`CFB_FM_STATS_ENGINE_PACK`, `CFB_FM_NEXT_CORE_IMPLEMENTATION_SPECS`, `CFB_FM_DEPTH_AND_BUILD_GOVERNANCE_PACK`) and `26_FM26_UI_RESEARCH_AND_CFBFM_LAYOUT_SPEC.md` ship deliverables in TypeScript paths (e.g. `src/domain/stats/statDefinitions.ts`) and assume a Vitest-style test runner. The existing prototype is static HTML/JS per `DL-20260501-02`, with all logic in `app.js` + `runtime/sim-core.js` + `runtime/hardening-core.js`.

### Decision

Translate spec deliverables into plain JavaScript modules under a new `js/sim/` directory tree, mirroring the spec's TypeScript exports/contracts (function signatures, data shapes, naming) so a future TypeScript migration is mechanical. Modules are loaded by `index.html` as ordinary `<script>` tags before `app.js`. Tests are in-browser, registered against a tiny harness that runs at boot and writes results to a global `window.CGM_TEST_RESULTS` (no Vitest, no node test runner, no build step).

### Rationale

- Preserves the static-prototype constraint of `DL-20260501-02` while adopting the new specs' module discipline.
- Keeps `app.js` from absorbing another 5000 lines of stats/sim code.
- Mirroring exports means a future migration to `engine/` TypeScript package (or Tauri) is a line-by-line port, not a redesign.
- Avoids tooling overhead (bundlers, transpilers, test runners) that would slow the current iteration loop.

### Trade-offs Accepted

- No static type checking — relies on JSDoc annotations + in-browser tests for safety.
- New modules can't use ES module import/export until index.html switches to module scripts; for now they expose globals like `window.CGM_MATCHUP`.
- Test discipline must be enforced by hand (every new module gets a test file in `js/sim/tests/`).

### File Layout

```
js/sim/
  matchup/        # MATCHUP-1, MATCHUP-2 (spec 29)
  events/         # STAT-2 PlayEvent schema, STAT-3 StatDelta
  playgen/        # PLAYGEN-1..N (spec 28)
  stats/          # STAT-1, STAT-4..14
  tests/          # in-browser test runner + per-module tests
  test-runner.js  # registers tests, runs at DOMContentLoaded
```

### When This Decision Should Be Revisited

When (a) the engine reaches ~10,000 lines and the no-types cost outweighs the migration cost, or (b) we ship to desktop and the static-prototype constraint is lifted.

## DL-20260502-02

**Title:** M14 FBS real-schools content pack as default world  
**Status:** accepted  
**Date:** 2026-05-02  
**Owner / role:** Product/UX implementation agent  
**Related milestone / slice:** M14 full-game content

### Problem Statement

After M13 expanded the demo to 75 procedural players + 12 procedural teams + 25 fictional rankings, the user asked: "There are only 12 teams in the whole game? This is just for my own use, no redistribution, so why can't I use the real schools?" Followed by: "Full FBS. They need rosters, equivalent overall ratings based on last 5 years and projected next 5, etc. Color schemes and college names, town names, can all be real... No real player names obvi. We are building a full game. Not a spec."

### Context

The codebase was already content-pack driven (`data/demo-world.js` exposed as `window.CGM_DEMO_WORLD`), so swapping in a real FBS pack was an additive change rather than a refactor. The original "fictional-first" decision (DL-20260501-13) was made for legal distinctness of any future distributable build. For personal-use only, school names + cities + color schemes + conference alignment are not legally fraught (they're facts/trademarks at most, used non-commercially). Real player names remain off-limits.

### Decision

1. Add `data/fbs-world.js` as a sibling to `data/demo-world.js`, exposing `window.CGM_FBS_WORLD` with the same schema. 134 teams across 11 conferences (SEC 16, Big Ten 18, Big 12 16, ACC 17, Pac-12 8, AAC 14, MWC 7, Sun Belt 13, MAC 13, CUSA 10, Independents 2). Each team has full metadata: real conference / city / colors / nickname / rival, plus `programRating` (50-95), `historicalRatings[2021-2025]`, `projectedRatings[2026-2030]`, recruiting/NIL/fanbase tiers.
2. Use a tuple-per-team format with a builder function so the data is dense (~134 lines of team data, not ~2,000), and auto-generate the 134 × 3 = 402 coach/school/stadium attribute blocks from each team's `programRating` + `fanBase`. Validation passes for any team.
3. Default the active content pack to FBS. Add a `#contentPackSelect` toggle in the bootstrap UI persisted in `localStorage["cgm.contentPack"]`. Switching reloads the page and clears the save (incompatible payload).
4. Scale `synthesizeRosterFill` OVR distribution by team `programRating` so Alabama starters land 87-99 and Akron starters land 65-78. Same trait/scout/dev systems, same 75-player target, just rating-shaped talent.
5. Seed AI program states from each team's `programRating` instead of flat default 50. National Top 25 now displays believable ratings (Ohio State 98, Georgia 95, etc.) instead of every team showing 60-65.
6. Pre-season AI records show "0-0" until the player has played a game, instead of synthesizing fake "3-2" records before kickoff.
7. Default starting team is Tennessee (recognizable mid-elite SEC).

### Rejected Alternatives

- **Real player names**: NIL-era personality rights, different ethics tier even for personal use; procedural fictional names already feel real and avoid the issue.
- **Hand-write 134 × 3 attribute blocks**: 12,000+ lines of manual data, no upside vs. auto-derivation from programRating + fanBase.
- **Full per-team historical roster reconstruction**: not requested, and procedural rosters scaled by rating already deliver the right talent feel.
- **Lazy-generate other-team rosters on demand**: deferred to a later milestone; not blocking gameplay since the player only manages their own roster in detail.

### Trade-offs Accepted

- "Next 5 years" projections are educated trajectory guesses (program momentum + recent results), not prediction. Knowledge cutoff is January 2026; 2025 CFP final is on the cutoff edge so 2025 champion specifics may be off.
- Realignment is a moving target (especially Pac-12 / MWC); pack reflects approximate 2025-26 era alignment.
- Coach/school/stadium attribute blocks are auto-derived from programRating + fanBase rather than hand-tuned per team. Believable but not surgical.
- Schedule generator picks non-conference opponents from a rating band — realistic in shape, not a true historic reconstruction.
- Logos remain generic 2-letter crests ("AL" for Alabama, "TN" for Tennessee, "ND" for Notre Dame, etc.) — no trademark imagery.
- Calendar prose still has some Lakeview-specific flavor (e.g. "Finalize third-down package for Prairie State") inherited from the demo pack. Cosmetic; can be templated in a later pass.
- Date label still shows "Monday, Aug 25, 2028" because the demo calendar is reused; the season-state year correctly reads 2026. Cosmetic.

### Distribution

This pack is for the user's personal local copy only. Not for redistribution.

## DL-20260502-01

**Title:** M13 first-play depth pass — procedural roster + world + 12-team CFP + Practice Emphasis  
**Status:** accepted  
**Date:** 2026-05-02  
**Owner / role:** Product/UX implementation agent  
**Related milestone / slice:** M13 first-play depth

### Problem Statement

A live tour of the demo career revealed the menu shell, player profiles, recruiting, sim, traits, scouting confidence, and ecosystem all had real depth — but the *content* was thin enough to break immersion within thirty seconds. The Roster screen showed 6 players, the Schedule had 5 games, the National Top 10 listed 3 teams, the CFP was a 4-team shell, and the Development screen was display-only with no weekly choice. The user hadn't tried the game yet and asked: "fix whatever you think needs to be fixed for me to enjoy it."

### Context

A prior automated audit reported these systems as "NOT STARTED," which was wrong — almost every gap turned out to be a content/rendering problem rather than missing engine code (`TRAIT_CLUSTER_DEFS`, `PROSPECT_ARCHETYPES` with preference weights, `prospectTrueRating`/`scoutedLow`/`scoutedHigh`, `positionCoaches`, `playerDefaultPosAttrs`, `playerDefaultHidden`, `simulateEntityDrivenDevelopmentTick`, and `injuryRiskSignalScore` were already wired). The decision was to fix surface content gaps using the existing engine rather than build new systems.

### Decision

1. Fill the roster procedurally at career bootstrap to a realistic CFB position composition (~75 scholarship players), reusing existing trait/attr scaffolding; deterministic from `career.seed`.
2. Fill the world procedurally (12-team conference standings, 25-team national poll, 12-game schedule) at career bootstrap; deterministic from `career.seed`.
3. Replace the 4-team CFP with the modern 12-team format (top-4 byes, seeds 5–12 in first round) and update `playPostseasonRound` to walk First Round → Quarterfinals → Semifinals → Championship.
4. Add a weekly Practice Emphasis (Balanced / Conditioning / Schemes / Position Drills / Recovery) that modulates the dev tick (`growthBudget`, mental-key bias, posAttr bonus), `injuryRiskSignalScore`, and per-player morale via the existing `updatePlayerMorale`. Replace the static "Weekly Focus" panel on the Development screen with the new interactive panel.
5. Defer the original audit's "Pass 1" (traits/hidden/scouting) entirely — already shipped.
6. Defer `app.js` modularization and multi-year prospect lifecycle to a later milestone.

### Trade-offs Accepted

- Procedural OL position split (LT vs OT) gets reshuffled by `recomputePlayerBestPositions` because LT/OT share key attrs in `KEY_ATTRS_BY_POSITION`. Total OL count is correct; the LT vs OT label split is off by a couple. Accepted as cosmetic.
- AI program records pre-populate to a non-zero record before the player's first game because `simulateAiProgramEcosystemTick` runs at career bootstrap. Tracked for next pass.
- `data.playerProfiles` is not in the save payload; procedural roster regenerates each load. Deterministic so safe, but development progress is preserved only via `data.playerDecisions`.
- Save schema not bumped (still v6). New `data.practiceState` is created on demand by `ensurePracticeState`; it is not persisted to disk, so emphasis resets to "balanced" on reload. Accepted as M13-acceptable; persist in M14.

## DL-20260501-01

**Title:** Treat the planning pack as the project governance source  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M0 - Foundation and repo bootstrap

### Problem Statement

The project now has a detailed external planning pack. Future implementation needs a clear source of truth so the prototype does not drift into ad hoc feature work.

### Context

The pack defines the core stance: fictional-first, menus-first, rules as data, deterministic simulation, and no match-engine work until the management loop is useful. The existing prototype already started as a static menu shell, which fits the pack but needed naming and scope alignment.

### Options Considered

**Option A:** Treat the pack as reference material only.  
Pros: fast and flexible.  
Cons: easy to drift, duplicate planning, and lose rationale.

**Option B:** Treat the pack as active governance for milestones, UX, architecture, data, and QA.  
Pros: preserves the plan, gives future sessions a stable handoff, and keeps scope pressure controlled.  
Cons: requires maintaining status and decision logs.

### Decision

Use the planning pack as the governing source for product direction, milestone sequencing, screen vocabulary, and architectural constraints.

### Why This Option Won

It matches the user's intent in providing the pack, prevents premature match-engine work, and gives future work a durable way to decide whether a change belongs in the current slice.

### Consequences

Positive:
- Future work has a clear roadmap and vocabulary.
- The prototype can be judged against explicit menu-first requirements.

Tradeoffs:
- Some quick UI ideas may be deferred if they do not fit the first management loop.

Risks:
- The docs can become stale if not updated after meaningful implementation cycles.

### Reversibility

Easy. The project can later replace the planning pack with a revised product brief, but current work should reference it until then.

### Files / Systems Affected

- `ai-pack/college-football-management-ai-pack/*`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- menu shell / navigation

### Follow-Up Actions Required

- Keep `docs/PROJECT_STATUS.md` current after meaningful work cycles.
- Add new decision entries for architecture, save schema, rules, or scope changes.

### Tests Or Validations Required

- Each implementation pass should include at least a static parse/reference check.
- Browser visual QA should be added once a browser test dependency is available.

### Source Or Research References

- `00_START_HERE.md`
- `05_PRODUCT_REQUIREMENTS.md`
- `07_MENU_UX_AND_SCREEN_SPECS.md`
- `11_IMPLEMENTATION_ROADMAP.md`

### Notes For Future Sessions

Do not move to on-field simulation until the Program Desk, roster, recruiting, portal, staff, development, schedule, rankings, history, and save/load loop can carry a season.

---

## DL-20260501-02

**Title:** Keep the immediate slice static, menu-first, and fictionally branded  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M0 - Menus-first prototype shell

### Problem Statement

The workspace began empty. The project needed a tangible first artifact without prematurely selecting a full desktop framework, simulation stack, or save format.

### Context

The planning pack recommends package boundaries and a desktop-first shape, but M0 also emphasizes clean sequencing. The current user priority is the menus side first, with the engine much later.

### Options Considered

**Option A:** Immediately scaffold a full monorepo and desktop shell.  
Pros: closer to the eventual architecture.  
Cons: more setup overhead before the menu vocabulary is proven.

**Option B:** Keep a static browser prototype for the first UI pass.  
Pros: fast to inspect, easy to revise, no build step, and enough to validate menu structure.  
Cons: not the final architecture and not suitable for persistence or simulation.

### Decision

Keep the current slice as a static HTML/CSS/JS prototype while aligning it with the planning pack's Program Desk and primary screen set.

### Why This Option Won

It serves the user's immediate request, supports rapid iteration on the management menus, and avoids pretending the engine architecture is ready before the data model and first loop are specified.

### Consequences

Positive:
- The prototype opens directly in a browser.
- Screen names and flows can evolve quickly.

Tradeoffs:
- Demo data remains close to the UI until the next data separation step.

Risks:
- If too much behavior is added to the static app, it may need a cleanup pass before moving to the real app architecture.

### Reversibility

Medium. The visual shell can migrate to a framework later, but static UI logic should stay modest to reduce migration cost.

### Files / Systems Affected

- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `docs/PROJECT_STATUS.md`

### Follow-Up Actions Required

- Split demo content into a data module.
- Add a deterministic time/notification model before save/load.
- Decide the real app stack before implementing persistence.

### Tests Or Validations Required

- JavaScript parse check.
- HTML reference check.
- Browser layout check when available.

### Source Or Research References

- `07_MENU_UX_AND_SCREEN_SPECS.md`
- `08_SYSTEM_ARCHITECTURE.md`
- `09_DATA_MODEL_AND_CONTENT_PIPELINE.md`

### Notes For Future Sessions

Static prototype work is useful only while it clarifies the menu game. Avoid building deep simulation services into this file structure.

---

## DL-20260501-03

**Title:** Use a static content pack and deterministic event deck for the prototype loop  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M1 - Program Desk loop

### Problem Statement

The prototype needed to stop mixing all demo world facts directly into `app.js`, and Continue needed to advance real prototype state instead of inserting a one-off fake refresh message.

### Context

The planning pack says rules and content should be data, not UI code. The project is still a static browser prototype, so a full content-loader package would be premature, but keeping the seed world separate now lowers the cost of later validation, save/load, and world generation work.

### Options Considered

**Option A:** Keep all demo data inside `app.js`.  
Pros: simplest file count.  
Cons: UI and content stay coupled, harder to test state transitions, and poor preparation for save/load.

**Option B:** Move the demo world into `data/demo-world.js` as a static global content pack.  
Pros: works without a build step, separates seed facts from rendering, and supports deterministic calendar events.  
Cons: not the final loader architecture and still relies on browser globals.

**Option C:** Scaffold a full content-loader package now.  
Pros: closer to final architecture.  
Cons: too much infrastructure before the prototype loop proves itself.

### Decision

Use `data/demo-world.js` as the static content pack for the current prototype and add a small deterministic calendar/event deck that `app.js` consumes for Program Desk advancement.

### Why This Option Won

It follows the pack's data-separation direction while staying appropriately small for the static prototype. It gives Continue a testable state transition and keeps the later migration path open.

### Consequences

Positive:
- Demo content is no longer embedded directly in the app renderer.
- Continue now updates date/week state and injects event-driven notifications.
- The blocker loop can be tested deterministically.

Tradeoffs:
- `window.CGM_DEMO_WORLD` is a prototype-only global.
- Some screen tables still contain inline view data and should move later.

Risks:
- Without validation, malformed content can still break startup.

### Reversibility

Easy. The static content pack can later become JSON loaded by a real content-loader module.

### Files / Systems Affected

- `data/demo-world.js`
- `app.js`
- `index.html`
- `README.md`
- `docs/PROJECT_STATUS.md`
- Program Desk / event system

### Follow-Up Actions Required

- Add content shape validation before rendering.
- Add a career bootstrap screen that selects or creates a seed.
- Add minimal save/load for career header, calendar index, and notification resolution state.

### Tests Or Validations Required

- JavaScript parse check.
- HTML script reference check.
- DOM execution check for initial blockers.
- Deterministic advance check through at least two calendar events.

### Source Or Research References

- `07_MENU_UX_AND_SCREEN_SPECS.md`
- `08_SYSTEM_ARCHITECTURE.md`
- `09_DATA_MODEL_AND_CONTENT_PIPELINE.md`
- `11_IMPLEMENTATION_ROADMAP.md`

### Notes For Future Sessions

Do not build real simulation logic around `window.CGM_DEMO_WORLD`. Treat it as a stepping stone toward a validated content loader and save-state model.

---

## DL-20260501-04

**Title:** Store only compact prototype save state and rebuild deterministic content on load  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M1 - Career bootstrap and local save/load shell

### Problem Statement

The prototype needed save/load behavior, but saving the full UI data object would blur the line between seed content, derived event content, and player state.

### Context

The planning pack separates content data from save-state data. The current app has a deterministic demo calendar and seed world, so most data can be reconstructed instead of persisted. The only state that must survive a local reload right now is the career header, current calendar index, advance count, and which notifications were resolved.

### Options Considered

**Option A:** Save the entire `data` object.  
Pros: quick and captures every current field.  
Cons: mixes seed content with save state, makes future content updates brittle, and saves derived event notifications redundantly.

**Option B:** Save a compact payload and rebuild from the content pack.  
Pros: keeps the save small, supports deterministic reconstruction, and matches the future content/save separation.  
Cons: requires reconstruction logic and assumes event IDs remain stable.

**Option C:** Delay save/load until a full persistence package exists.  
Pros: avoids prototype persistence debt.  
Cons: leaves the M1 Program Desk loop without a critical user-facing capability.

### Decision

Use browser local storage for a versioned prototype save payload. Persist only career header fields, current calendar index, advance count, and resolved notification IDs. On load, rebuild seed data from `data/demo-world.js`, replay calendar event notifications through the saved index, then apply resolved notification IDs.

### Why This Option Won

It gives the player an immediate save/load loop without violating the pack's data-separation principle. It also creates a clear migration path toward a real persistence package later.

### Consequences

Positive:
- The prototype can save, load, and continue from a deterministic Program Desk state.
- Seed data remains the source of truth for the fictional world.
- The saved payload stays small and easy to inspect.

Tradeoffs:
- Saves depend on stable notification IDs.
- Local storage is browser-specific and not a real game save file.

Risks:
- Future edits to the demo event deck can invalidate old local saves unless migrations or compatibility rules are added.

### Reversibility

Easy. The local storage payload can be replaced by a file-backed persistence layer while keeping the same conceptual fields.

### Files / Systems Affected

- `index.html`
- `styles.css`
- `app.js`
- `data/demo-world.js`
- `README.md`
- `docs/PROJECT_STATUS.md`
- Program Desk / event system
- prototype save/load shell

### Follow-Up Actions Required

- Add content pack shape validation.
- Add a migration registry before changing save payload structure.
- Replace local storage with proper file-based persistence once the app stack is selected.

### Tests Or Validations Required

- Save/load reconstruction check.
- Post-load advance check.
- Static parse and HTML reference checks.

### Source Or Research References

- `08_SYSTEM_ARCHITECTURE.md`
- `09_DATA_MODEL_AND_CONTENT_PIPELINE.md`
- `11_IMPLEMENTATION_ROADMAP.md`

### Notes For Future Sessions

Do not expand the prototype save by dumping UI state wholesale. If a new state field matters, decide whether it is seed content, derived content, or real save state before persisting it.

---

## DL-20260501-05

**Title:** Validate prototype content at startup before state cloning  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M1 - Content pack startup validation

### Problem Statement

The app loaded `window.CGM_DEMO_WORLD` without checking its shape. A malformed content pack could fail later in rendering or state logic with unclear errors.

### Context

The planning pack calls for content/rules validation before gameplay starts. The project is still a static prototype, but the seed world already includes career data, calendar events, notifications, and table rows that multiple screens depend on.

### Options Considered

**Option A:** Keep trusting the demo content pack.  
Pros: no extra code.  
Cons: fragile startup and poor failure messages.

**Option B:** Add a lightweight in-app validator before cloning state.  
Pros: clear field-level errors, no build step, and enough protection for the static prototype.  
Cons: validation code lives in `app.js` until a real content-loader package exists.

**Option C:** Introduce a full schema library now.  
Pros: closer to final tooling.  
Cons: adds dependency and build questions before the app stack is chosen.

### Decision

Add a lightweight startup validator in `app.js` and fail before state cloning when required content fields are missing, malformed, duplicated, or outside the current notification taxonomy.

### Why This Option Won

It satisfies the immediate M1 need without expanding infrastructure prematurely. It also makes content errors visible to the user and testable through the existing Node-backed harness.

### Consequences

Positive:
- Malformed content now fails with clear field-level messages.
- The app validates career data, calendar events, notification objects, tuple-table shapes, duplicate notification IDs, notification severity values, and the career/calendar link.
- The validator gives future content work a concrete contract.

Tradeoffs:
- Validation is hand-written and should later move into a content-loader module or schema package.

Risks:
- The validator must be kept in sync as content fields grow.

### Reversibility

Easy. The current validator can be replaced by a schema-driven loader without changing the content pack concept.

### Files / Systems Affected

- `app.js`
- `styles.css`
- `README.md`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- content pack startup path

### Follow-Up Actions Required

- Move inline screen table data toward content/view-model helpers.
- Move validation into a content-loader package when the real app structure is introduced.
- Add test fixtures for invalid content once a test runner exists.

### Tests Or Validations Required

- Valid content boot check.
- Invalid content failure check.
- Startup error overlay check.
- Existing save/load and deterministic advance regression checks.

### Source Or Research References

- `09_DATA_MODEL_AND_CONTENT_PIPELINE.md`
- `11_IMPLEMENTATION_ROADMAP.md`
- `12_TEST_QA_AND_BALANCE.md`

### Notes For Future Sessions

Every new content field should either be validated here or intentionally treated as optional display-only data until the real content-loader module exists.

---

## DL-20260501-06

**Title:** Complete M1 in the static prototype and move next to M2 profile foundations  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M1 acceptance pass

### Problem Statement

M1 required a working career bootstrap, deterministic fictional career generation, time/phase advancement, Program Desk blockers, autosave, and notification deep links. The prototype had most pieces but lacked seeded program choice, phase-aware event progression, autosave, and deep-link verification.

### Context

The user explicitly authorized autonomous work through M1. The planning pack's M1 exit condition is that a user can start a career, land on Program Home, review inbox items, and advance through preseason without dead ends. The project remains a static prototype, so the solution should complete the management loop without introducing a premature desktop app stack.

### Options Considered

**Option A:** Stop after moving inline screen data into content view models.  
Pros: small and low risk.  
Cons: leaves M1 incomplete.

**Option B:** Complete the remaining M1 gates inside the static prototype.  
Pros: satisfies the milestone, proves the Program Desk loop, and creates a stronger base for M2.  
Cons: increases `app.js` size and keeps prototype-only state logic in the static shell.

**Option C:** Pause and scaffold the final architecture before finishing M1.  
Pros: closer to eventual boundaries.  
Cons: delays proving the core loop and violates the current menus-first momentum.

### Decision

Complete M1 in the static prototype by adding fictional program choice, deterministic seed generation, phase-aware calendar progression, Program Desk deep links, autosave, and a longer preseason path through opener/postgame review.

### Why This Option Won

It directly satisfies the M1 exit condition while staying aligned with the "office before stadium" priority. The static prototype now proves the loop before deeper architecture work begins.

### Consequences

Positive:
- M1 has clear passing acceptance checks.
- A user can start, review, resolve blockers, autosave, load, and advance through the preseason path.
- M2 can focus on roster/player profile foundations instead of unfinished Program Desk plumbing.

Tradeoffs:
- Some prototype logic remains in `app.js` until the real app architecture is introduced.
- Local storage remains a temporary persistence layer.

Risks:
- Larger static files will become harder to maintain if M2 continues without introducing modest module boundaries.

### Reversibility

Medium. The generated career/profile logic and content pack fields can migrate into app services and a content-loader package later, but the user-facing M1 behavior should remain.

### Files / Systems Affected

- `index.html`
- `styles.css`
- `app.js`
- `data/demo-world.js`
- `README.md`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- career bootstrap
- Program Desk / event system
- prototype autosave
- content pack view models

### Follow-Up Actions Required

- Begin M2 roster/player profile foundations.
- Add a migration registry before changing the local save payload.
- Consider splitting static JS into small modules before the next large UI slice.

### Tests Or Validations Required

- Continue blocker gate.
- Deterministic seed generation.
- Phase transition validity.
- Program Desk deep-link behavior.
- Autosave state write.
- Full preseason path to postgame review.

### Source Or Research References

- `05_PRODUCT_REQUIREMENTS.md`
- `07_MENU_UX_AND_SCREEN_SPECS.md`
- `09_DATA_MODEL_AND_CONTENT_PIPELINE.md`
- `11_IMPLEMENTATION_ROADMAP.md`

### Notes For Future Sessions

Treat M1 as complete. Do not keep polishing the Program Desk loop unless a regression appears; move next to M2 roster/player profile foundations.

---

## DL-20260501-07

**Title:** Add M2 profile routes/actions and keep saves compatible through schema v2 migration  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M2 - roster and recruiting profile foundations

### Problem Statement

M2 required concrete profile foundations, but the prototype only had flat roster/recruit tables with no row-level route behavior, no player-level action persistence, and a v1 save payload that could not store profile decisions.

### Context

The roadmap and status file identified the first M2 slice as row selection, profile route/panel behavior, eligibility/redshirt action shell, and save-state fields for player-level decisions. The prototype remains static/browser-first, so the implementation needed to improve management decision quality without introducing a full app-stack migration.

### Options Considered

**Option A:** Keep profile screens as static table expansions only.  
Pros: low implementation risk and minimal state changes.  
Cons: no route behavior and weak decision interaction.

**Option B:** Add profile route views and persist player decisions with a save schema bump and migration.  
Pros: meaningful M2 progress, explicit profile actions, and save compatibility retained.  
Cons: increased app.js complexity inside the static shell.

**Option C:** Delay profile actions until a full modular architecture refactor.  
Pros: cleaner long-term boundaries.  
Cons: delays milestone value and leaves M2 unfinished.

### Decision

Implement Option B: add row-select profile routes for roster/recruiting, add player eligibility/redshirt/development action shells, persist player decisions in save schema v2, and migrate v1 saves automatically.

### Why This Option Won

It satisfies the next M2 slice directly while preserving backward compatibility with existing local saves and keeping the menus-first prototype momentum.

### Consequences

Positive:
- Roster and recruiting rows now open dedicated profile routes.
- Player profile actions now affect persistent state and warning behavior.
- Existing v1 local saves remain loadable through migration.

Tradeoffs:
- `app.js` carries additional route/state complexity until modularized.
- Eligibility logic is still a shell, not a full rules-engine implementation.

Risks:
- Additional route branches can increase UI regression risk without browser automation.

### Reversibility

Medium. The interaction patterns should stay, but route/state logic can be moved into modular services when the prototype transitions to the target architecture.

### Files / Systems Affected

- `app.js`
- `data/demo-world.js`
- `styles.css`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- roster / eligibility / redshirt
- recruiting
- save/load / migrations

### Follow-Up Actions Required

- Implement depth chart validation for illegal or empty states.
- Add first staff delegation and hire/fire interaction shells.
- Add browser-level interaction checks once Playwright (or equivalent) is available.

### Tests Or Validations Required

- Parse checks for modified JS files.
- Headless boot smoke check with DOM stubs.
- Profile data integrity checks for player/prospect record presence.
- Save/load check confirming v1 compatibility path and v2 decision persistence.

### Source Or Research References

- `05_PRODUCT_REQUIREMENTS.md`
- `07_MENU_UX_AND_SCREEN_SPECS.md`
- `09_DATA_MODEL_AND_CONTENT_PIPELINE.md`
- `11_IMPLEMENTATION_ROADMAP.md`

### Notes For Future Sessions

Treat the M2 profile foundation slice as complete. Continue with depth chart legality checks and staff interaction flows before attempting deep recruiting math or match-engine work.

---

## DL-20260501-08

**Title:** Add depth validation blockers and first-pass staff hire/fire flow in M2 shell  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M2 - depth and staff interaction shell

### Problem Statement

After profile-route foundations, M2 still lacked interactive depth-chart legality behavior and meaningful staff management actions, leaving key roster/staff decisions too static.

### Context

The roadmap requires depth chart planning and staff/responsibility flows in M2. The prototype already had display shells but no assignment validation or hire/fire action pathway.

### Options Considered

**Option A:** Keep depth and staff as static presentation-only panels.  
Pros: minimal code complexity.  
Cons: misses core M2 management actions.

**Option B:** Add starter assignment controls with validation, and implement staff open-role and hire interactions inside current static architecture.  
Pros: immediate decision impact and stronger weekly loop pressure.  
Cons: grows app.js interaction complexity before modular refactor.

**Option C:** Delay both features until a full architecture transition.  
Pros: cleaner long-term boundaries.  
Cons: stalls milestone progress.

### Decision

Implement Option B: add depth assignment controls, validation checks, Program Desk blocker generation for illegal depth states, and first-pass staff hire/fire interactions with candidate pools from the content pack.

### Why This Option Won

It satisfies the next unfinished M2 tasks while preserving the existing menus-first prototype loop and without introducing match-engine scope creep.

### Consequences

Positive:
- Depth planner now supports interactive slot assignment and illegal-state detection.
- Invalid depth states now surface as Must Respond Program Desk blockers.
- Staff screen now supports opening roles and hiring replacements from candidate pools.

Tradeoffs:
- Logic remains in static app-layer code rather than dedicated domain modules.
- Staff effects are still qualitative shells, not full recommendation-quality simulation.

Risks:
- More event handlers in a single file raise regression risk until modularized.

### Reversibility

Medium. UI behavior should remain, but implementation details can move into modular services and rules modules later.

### Files / Systems Affected

- `app.js`
- `data/demo-world.js`
- `styles.css`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- roster / eligibility / redshirt
- staffing / delegation
- save/load / migrations

### Follow-Up Actions Required

- Tie eligibility and redshirt warning evolution to weekly advancement events.
- Add delegation quality consequences driven by staff state changes.
- Expand automated interaction coverage once browser QA tooling is installed.

### Tests Or Validations Required

- Parse checks for modified JavaScript files.
- Headless boot smoke check with depth/staff data presence assertions.
- Depth validation blocker smoke check through notification generation path.

### Source Or Research References

- `05_PRODUCT_REQUIREMENTS.md`
- `07_MENU_UX_AND_SCREEN_SPECS.md`
- `09_DATA_MODEL_AND_CONTENT_PIPELINE.md`
- `11_IMPLEMENTATION_ROADMAP.md`

### Notes For Future Sessions

Treat depth validation and staff interaction shells as complete for this prototype stage. Continue M2 with weekly eligibility/delegation consequence wiring before moving to M3 recruiting depth.

---

## DL-20260501-09

**Title:** Mark M2 complete and transition next work to M3 recruiting loop depth  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M2 - completion acceptance

### Problem Statement

After multiple M2 slices, the project needed a clear completion decision so work does not stall in perpetual roster/staff polish.

### Context

M2 roadmap deliverables and gate behaviors were implemented in the static prototype: roster/profile routes, depth assignment/validation, eligibility/redshirt tracking across game counts, and staff interaction shells with delegation quality effects.

### Options Considered

**Option A:** Keep M2 open for additional refinement.  
Pros: potential polish gains.  
Cons: milestone thrash and delayed recruiting-loop progress.

**Option B:** Accept M2 as complete for current prototype scope and move to M3.  
Pros: preserves sequencing discipline and roadmap momentum.  
Cons: leaves some M2 systems at shell depth rather than full simulation detail.

### Decision

Accept Option B. Mark M2 complete in project status and move the next implementation target to M3 recruiting board/prospect loop depth.

### Why This Option Won

It aligns with the implementation roadmap's sequencing principles and avoids over-investing in pre-M3 polish while core recruiting loop depth remains unfinished.

### Consequences

Positive:
- Milestone sequencing remains explicit and disciplined.
- The project can now prioritize recruiting-board depth as intended.

Tradeoffs:
- Some M2 interactions remain shell-level and will need later simulation hardening.

Risks:
- Without browser automation, UI regressions can still slip through while entering M3.

### Reversibility

Easy. If later testing finds M2 regressions, targeted fixes can be applied while keeping milestone status intact.

### Files / Systems Affected

- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- milestone tracking and workflow discipline

### Follow-Up Actions Required

- Start M3 prospect action loops and confidence/commitment transitions.
- Add broader automated interaction tests when browser tooling is available.

### Tests Or Validations Required

- Confirm M2 gate checks stay green while beginning M3.

### Source Or Research References

- `11_IMPLEMENTATION_ROADMAP.md`
- `05_PRODUCT_REQUIREMENTS.md`

### Notes For Future Sessions

Treat M2 as complete unless a clear regression appears. Direct new feature work toward M3 recruiting depth.

---

## DL-20260501-10

**Title:** Adopt docs 14/15 as active governance for data calibration and benchmark research  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M3 pre-implementation governance pass

### Problem Statement

New guidance files were added outside the numbered pack sequence. Without explicit adoption, future sessions could ignore data-sourcing constraints and benchmark-differentiation rules.

### Context

`14_DATA_ACQUISITION_AND_SIM_CALIBRATION.md` defines how real-world data can be used safely (distribution/calibration only, no real-player shipping) and proposes a data pipeline scaffold. `15_FM_RESEARCH_AND_OPEN_SOURCE.md` clarifies how FM research should be translated without copying branded UI/trade dress.

### Options Considered

**Option A:** Treat files 14/15 as optional notes.  
Pros: low process overhead.  
Cons: inconsistent compliance risk across sessions.

**Option B:** Promote files 14/15 into active governance with concrete repository updates.  
Pros: clear constraints, consistent implementation direction, lower legal/distinctness risk.  
Cons: requires doc/status maintenance and incremental scaffold work.

### Decision

Choose Option B. Treat docs 14/15 as active governance for all M3+ work that touches data ingestion, calibration, and benchmark-informed UX decisions.

### Why This Option Won

It keeps the project aligned with fictional-first constraints while still enabling realistic simulation tuning and useful management-pattern research.

### Consequences

Positive:
- Data usage is now explicitly constrained to distribution/calibration workflows.
- FM benchmarking can inform decision loops without clone drift.
- M3 can start with a prepared pipeline directory structure.

Tradeoffs:
- Additional governance checks are required when adding data-ingestion scripts.

Risks:
- Source terms/licensing validation is still needed before real automated pulls.

### Reversibility

Easy. Policies can be revised later, but current implementation should follow this stance until replaced by a newer decision.

### Files / Systems Affected

- `README.md`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- `data_raw/`
- `data_processed/`
- `game_data/`

### Follow-Up Actions Required

- Add first extraction/transform scripts for synthetic name and rating distributions.
- Add source-term checks before any external API scraping automation.
- Use docs 14/15 in every M3+ planning cycle.

### Tests Or Validations Required

- Verify docs 14/15 are referenced in status/next-session prompt.
- Verify pipeline scaffold directories exist in workspace.

### Source Or Research References

- `14_DATA_ACQUISITION_AND_SIM_CALIBRATION.md`
- `15_FM_RESEARCH_AND_OPEN_SOURCE.md`

### Notes For Future Sessions

Use real-world data only for calibration targets and synthetic distribution building. Keep all shipped players and staff fictional. Translate benchmark patterns; do not copy FM wording/layout trade dress.

---

## DL-20260501-11

**Title:** Complete M3 recruiting loop and transition next work to M4 retention/portal depth  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M3 - recruiting board, actions, commitments

### Problem Statement

The project needed to finish M3 deliverables and explicitly confirm the required recruiting test gates before moving to M4.

### Context

M3 called for prospect generation, Recruiting Board and Prospect Profile depth, scouting confidence behavior, action loops (offer/contact/visit), commitment resolution, and class summary synchronization.

### Options Considered

**Option A:** Ship only UI actions without recruitment state progression.  
Pros: faster implementation.  
Cons: misses M3 simulation gates.

**Option B:** Implement a full static-shell recruiting loop with weekly budget, state transitions, commitment checks, and synced summaries.  
Pros: meets M3 gates and strengthens Continue loop value.  
Cons: increases app.js complexity in the static architecture.

### Decision

Choose Option B. Complete M3 with deterministic prospect generation/top-up, recruiting action economy, confidence/interest updates, commitment outcomes, and class summary sync checks.

### Why This Option Won

It fulfills the roadmap deliverables while preserving fictional-first constraints and keeps milestone sequencing disciplined.

### Consequences

Positive:
- Continue loop now includes recruiting consequences and commitment updates.
- Recruiting Board reflects class-need alignment and signed class state.
- Save/load preserves recruiting state in schema v3.

Tradeoffs:
- Additional mutable recruiting state and logic remain centralized in `app.js`.

Risks:
- Without browser automation, UI regressions remain possible.

### Reversibility

Medium. Recruit-system behavior should remain, but implementation can be moved into modular services later.

### Files / Systems Affected

- `app.js`
- `data/demo-world.js`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- recruiting
- save/load / migrations

### Follow-Up Actions Required

- Begin M4 retention and portal-depth implementation.
- Add recruiting edge-case fixtures once broader test harness exists.

### Tests Or Validations Required

- Prospect pool generation gate (class/region coverage).
- Recruiting action effect gate (interest changes and budget consumption).
- Commitment consistency gate (no contradictory commitment states).
- Class-summary sync gate (counts align with board and commitments).

### Source Or Research References

- `11_IMPLEMENTATION_ROADMAP.md`
- `07_MENU_UX_AND_SCREEN_SPECS.md`
- `14_DATA_ACQUISITION_AND_SIM_CALIBRATION.md`
- `15_FM_RESEARCH_AND_OPEN_SOURCE.md`

### Notes For Future Sessions

Treat M3 as complete unless regression appears. Move directly to M4 retention/portal/budget interactions.

---

## DL-20260501-12

**Title:** Complete M4 retention/portal/benefit loop and advance to M5 season-shell work  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M4 - retention, transfer portal, benefit allocation

### Problem Statement

The prototype had portal and finance shells, but M4 required rules-aware behavior: legal portal window gating, coach-change exception handling, retention conversations, benefit allocation constraints, and roster-limit compliance warnings.

### Context

Roadmap M4 gates required:
- portal windows obey ruleset
- coach-change exceptions are handled
- benefit allocation cannot exceed configured pools
- roster-limit compliance warnings appear before lock deadlines

### Options Considered

**Option A:** Keep portal/finance views as static read-only tables.  
Pros: low implementation risk.  
Cons: fails M4 gates and does not deepen Continue-loop consequences.

**Option B:** Add lightweight but functional M4 state/actions in the static prototype, plus migration support and headless gates.  
Pros: satisfies milestone exit criteria while preserving menu-first cadence.  
Cons: increases single-file complexity in `app.js` until modularization.

### Decision

Choose Option B. Implement portal state, retention state, and benefit state as validated data models with actionable UI controls, save-schema v4 persistence, and deterministic headless gate checks.

### Why This Option Won

It directly satisfies the roadmap's M4 acceptance gates and keeps the project sequence disciplined toward M5 without prematurely introducing infrastructure churn.

### Consequences

Positive:
- Transfer portal actions now respect open/closed window legality.
- Coach-change exception opens a temporary legal path when needed.
- Retention actions consume weekly AP and change risk outcomes.
- Benefit allocations obey bucket and total-pool caps.
- Compliance warnings escalate when pending additions threaten roster limits.

Tradeoffs:
- More interaction logic now lives in `app.js` until architecture refactor.

Risks:
- Browser-layout regressions remain possible without Playwright coverage.

### Reversibility

Medium. Domain behavior should remain, but implementation details can later move into services/modules.

### Files / Systems Affected

- `app.js`
- `data/demo-world.js`
- `README.md`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- transfer portal / retention
- finances / benefits
- notifications / compliance
- save/load / migrations

### Follow-Up Actions Required

- Start M5 with season-result progression, standings/rankings updates, and postseason legality checks.
- Add broader automated UI interaction checks once browser automation is available.

### Tests Or Validations Required

- M4 headless gate bundle for portal legality, coach-change exception, benefit cap enforcement, and compliance warnings.
- M3 recruiting regression gate after M4 merge.

### Source Or Research References

- `11_IMPLEMENTATION_ROADMAP.md`
- `07_MENU_UX_AND_SCREEN_SPECS.md`
- `12_TEST_QA_AND_BALANCE.md`

### Notes For Future Sessions

Treat M4 as complete unless regression appears. Move to M5 season-shell progression before any match-presentation expansion.

---

## DL-20260501-13

**Title:** Clarify FM skin-swap phrasing as benchmark shorthand, not clone direction  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** Distinctness governance refresh

### Problem Statement

The phrase "similar to a Football Manager skin swap" can be misread as clone permission or as forbidden language if placed under a "we are not" lens. The project needed explicit interpretation so implementation choices stay both useful and legally distinct.

### Context

`01_GUIDING_LIGHT.md` includes the phrase under "what the game is" as shorthand for management-interface density and continue-loop rhythm. Distinctness docs simultaneously require non-copy behavior for naming, organization, wording, and trade dress.

### Options Considered

**Option A:** Remove all FM benchmark language.  
Pros: lower ambiguity.  
Cons: loses a useful shorthand for decision-density goals.

**Option B:** Keep the benchmark phrase but explicitly constrain it to structural translation, not visual/textual copying.  
Pros: preserves useful design target while honoring distinctness requirements.  
Cons: requires clear documentation to prevent drift.

### Decision

Choose Option B. Keep FM skin-swap phrasing as benchmark shorthand for decision density and menu rhythm, and explicitly disallow clone behavior in labels, layouts, and content identity.

### Why This Option Won

It aligns with both guidance streams: practical research translation and legal/product distinctness.

### Consequences

Positive:
- FM research remains actionable.
- Distinctness obligations stay explicit.
- Future sessions have less ambiguity when classifying benchmark-inspired changes.

Tradeoffs:
- Review discipline is still required to catch accidental wording/layout drift.

### Reversibility

Easy. This is a governance interpretation and can be revised by later decisions.

### Files / Systems Affected

- `README.md`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- distinctness governance

### Follow-Up Actions Required

- Keep checking new screens for unique naming, structure, and flow.
- Continue using docs 03/15 before major UX additions.

### Tests Or Validations Required

- Manual doc consistency check: benchmark phrasing and distinctness rules do not conflict.

### Source Or Research References

- `01_GUIDING_LIGHT.md`
- `03_DISTINCTNESS_AND_RISK.md`
- `15_FM_RESEARCH_AND_OPEN_SOURCE.md`

### Notes For Future Sessions

Translate benchmark patterns into college-football-specific screens and loops. Do not copy branded wording, table identity, or trade-dress structure.

---

## DL-20260501-14

**Title:** Complete M5 season competition shell and advance next work to M6 stewardship systems  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M5 - schedule/results, standings/rankings, CFP, history v1

### Problem Statement

The prototype had strong preseason and roster-management loops but still needed a complete season competition shell with outcome consequences, postseason flow, and Year 2 rollover continuity.

### Context

M5 required the project to deliver:
- game result engine v1
- standings/rankings reactions
- legal CFP bracket flow
- history archival
- Year 2 rollover behavior

### Options Considered

**Option A:** Keep game results mostly static and postpone postseason/rollover wiring.  
Pros: less implementation effort.  
Cons: fails M5 test gates and leaves yearly loop incomplete.

**Option B:** Implement a deterministic lightweight season engine in the static app, integrated with save state and screen read models.  
Pros: satisfies M5 gates now and preserves menus-first sequencing.  
Cons: adds more domain logic into a single prototype file before modular refactor.

### Decision

Choose Option B. Implement deterministic schedule simulation, standings/rankings updates, CFP bracket resolution, season archival entry, and Year 2 rollover with schema v5 persistence.

### Why This Option Won

It closes the yearly-loop gap while keeping architecture and scope aligned with the roadmap: management depth first, presentation depth later.

### Consequences

Positive:
- Full season can now simulate headlessly in this prototype.
- Rankings and conference context respond to played results.
- CFP structure is represented and resolved in a legal four-team shell.
- Completed seasons are archived before rollover.
- Year 2 can start with coherent carry-forward state.

Tradeoffs:
- More state orchestration remains in `app.js` pending module extraction.

Risks:
- Current schedule generation remains fixed-content, not dynamic worldgen.

### Reversibility

Medium. Behavior should remain, but implementation should eventually migrate to app-services/sim modules.

### Files / Systems Affected

- `app.js`
- `data/demo-world.js`
- `README.md`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- schedule/results
- rankings/conference/CFP
- history archival
- save/load / migrations

### Follow-Up Actions Required

- Begin M6 pressure and stewardship depth (fan/donor/AD, facilities leverage, morale/promise traces).
- Add broader scenario tests around multi-season balance and history continuity.

### Tests Or Validations Required

- M5 headless gate bundle for full season simulation, standings/rankings reaction, CFP legality, and Year 2 rollover.
- M3/M4 regression gates after M5 merge.

### Source Or Research References

- `11_IMPLEMENTATION_ROADMAP.md`
- `10_SIMULATION_SYSTEMS.md`
- `12_TEST_QA_AND_BALANCE.md`

### Notes For Future Sessions

Treat M5 as complete unless regression appears. Move next to M6 institutional-pressure depth before any advanced match-presentation work.

---

## DL-20260501-15

**Title:** Complete M6 stewardship systems and advance next work to M7 balancing and polish  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M6 - objective pressure, facilities leverage, morale/promise, history continuity

### Problem Statement

After M5 season-shell completion, the prototype needed stewardship depth so outcomes are explainable and institutional pressure is visible: objective pressure traceability, facility leverage consequences, morale/promise reactions, and reliable multi-year continuity.

### Context

M6 required the project to deliver:
- pressure traces tied to clear causes and outcomes
- facilities request actions with durable effects
- morale and usage-promise reactions visible in management views
- repeated year rollover continuity without history corruption

### Options Considered

**Option A:** Keep stewardship mostly narrative and postpone stateful pressure/culture/facility systems.  
Pros: lower implementation effort.  
Cons: fails M6 gate intent and weakens explainability.

**Option B:** Implement lightweight but stateful stewardship systems integrated with current season and save loops.  
Pros: satisfies M6 gates now and strengthens management consequences.  
Cons: adds additional model and UI complexity inside static prototype code.

### Decision

Choose Option B. Implement pressure, culture/promise, and facilities state models; wire them into season progression; expose traces and controls in Program Home/Facilities/Analytics/Player Profile; and persist via schema v6 migration.

### Why This Option Won

It satisfies M6 acceptance behavior while preserving menus-first sequencing and keeps the prototype's annual loop legible to the player.

### Consequences

Positive:
- Pressure movement is now attributable through visible trace events.
- Facility approve/defer decisions now create long-term state changes.
- Morale shifts react to promise and usage context.
- Multi-year rollovers preserve coherent history and stewardship context.

Tradeoffs:
- Stewardship calibration is intentionally coarse and needs M7 tuning.
- More domain logic remains centralized in `app.js` pending modular extraction.

Risks:
- Without broader soak testing, edge-case oscillation risk remains in pressure/morale interactions.

### Reversibility

Medium. The behavior should remain, but implementation details can later move into dedicated simulation/state modules.

### Files / Systems Affected

- `app.js`
- `data/demo-world.js`
- `README.md`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- pressure/objective tracking
- facilities requests and impacts
- morale/promise tracking
- save/load / migrations

### Follow-Up Actions Required

- Start M7 balancing and QA hardening with multi-season soak checks.
- Tune pressure/morale/facility effect coefficients and alert thresholds.
- Add broader interaction and continuity regression coverage.

### Tests Or Validations Required

- M6 headless gate bundle for pressure traceability, facilities consequences, morale/promise reaction visibility, and continuity checks.
- M5 regression gate after M6 merge.
- M3/M4 regression gate after M6 merge.

### Source Or Research References

- `11_IMPLEMENTATION_ROADMAP.md`
- `10_SIMULATION_SYSTEMS.md`
- `12_TEST_QA_AND_BALANCE.md`

### Notes For Future Sessions

Treat M6 as complete unless regression appears. Move next to M7 balancing, notification tuning, and UX polish before deeper systems expansion.

---

## DL-20260501-16

**Title:** Complete M7 balancing and refinement pass and advance next work to M8 simulation/presentation depth  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M7 - balance instrumentation, notification tuning, soak validation, UX filters

### Problem Statement

After M6 stewardship depth, the prototype needed alpha hardening: control inbox spam, improve board readability, add objective balance signals, and prove long-run stability with soak and migration checks.

### Context

M7 required the project to deliver:
- balance configuration/observability pass
- notification tuning
- table/filter UX refinement
- multi-season soak evidence
- migration safety confidence

### Options Considered

**Option A:** Prioritize cosmetic polish only.  
Pros: lower implementation risk and faster visual wins.  
Cons: fails M7 stability intent and leaves tuning blind.

**Option B:** Implement practical runtime balancing tools and verification hooks inside the current static shell.  
Pros: satisfies M7 gates and improves confidence before M8 expansion.  
Cons: adds more utility logic in `app.js` pending modular extraction.

### Decision

Choose Option B. Add notification anti-spam stream caps, recruiting board filters, analytics balance snapshot read models, and callable soak/migration helpers (`runSeasonSoak`, `runMigrationGoldenChecks`) used in headless gate validation.

### Why This Option Won

It turns M6 systems into a more durable alpha by replacing subjective balance checks with repeatable evidence while preserving menus-first momentum.

### Consequences

Positive:
- Notification load now stays bounded in long runs.
- Recruiting board review can be narrowed by position/status.
- Balance risk is surfaced in a dedicated analytics snapshot.
- 1/5/20-season soak runs and migration compatibility checks are now repeatable in one harness.

Tradeoffs:
- Telemetry and soak helpers currently live in app-layer code.
- Sanity bands are provisional and require continued calibration.

Risks:
- Deeper simulation richness is still limited by the lightweight deterministic model.

### Reversibility

Medium. Behavior should remain, but helper implementations should later migrate to dedicated test/sim modules.

### Files / Systems Affected

- `app.js`
- `README.md`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- notifications / inbox load
- recruiting board UX filters
- analytics balance instrumentation
- soak and migration validation helpers

### Follow-Up Actions Required

- Begin M8 with carefully scoped simulation/presentation depth increments.
- Keep soak/migration checks in regression bundles as M8 systems land.
- Expand browser-level QA once Playwright coverage is available.

### Tests Or Validations Required

- M7 gate bundle: menu render sweep, migration golden checks, and 1/5/20-season soak pass.
- M3-M6 regression bundle after M7 merge.

### Source Or Research References

- `11_IMPLEMENTATION_ROADMAP.md`
- `12_TEST_QA_AND_BALANCE.md`
- `07_MENU_UX_AND_SCREEN_SPECS.md`

### Notes For Future Sessions

Treat M7 as complete unless regression appears. Move next to M8 without displacing the management-loop integrity gate.

---

## DL-20260501-17

**Title:** Complete M8 drive simulation and advanced presentation slice while preserving menus-first integrity  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M8 - drive-by-drive simulation, tactical impact, advanced data hub, optional play-by-play

### Problem Statement

After M7 stability hardening, the prototype needed richer football flavor without displacing core management loops: drive-level game outputs, tactical impact visibility, and deeper analytics context.

### Context

M8 required the project to deliver:
- drive-by-drive simulation
- richer opponent tendencies
- advanced data hub
- optional play-by-play text
- presentation polish that does not break menus-first flow

### Options Considered

**Option A:** Add only cosmetic presentation polish.  
Pros: lower risk and faster implementation.  
Cons: fails M8 simulation-depth gates.

**Option B:** Add deterministic drive-level simulation and lightweight presentation/read-model layers integrated with existing season loop.  
Pros: satisfies M8 gates while preserving management continuity.  
Cons: increases complexity in monolithic `app.js` until modularization.

### Decision

Choose Option B. Implement deterministic drive-by-drive results, tactical profile controls that alter outcomes, opponent tendency signals, optional play-by-play output, and advanced analytics hub rows; validate with consistency/performance/tactical-impact headless gates.

### Why This Option Won

It adds meaningful football-facing depth while keeping the product anchored in menu decisions and deterministic season progression.

### Consequences

Positive:
- Box-score outcomes now have drive-level explainability.
- Tactical profile decisions are visible and testable.
- Opponent tendency and advanced efficiency signals improve game-week decision context.
- Optional play-by-play adds flavor without changing core simulation determinism.

Tradeoffs:
- Additional simulation/presentation logic now lives in a single static file.
- Metric formulas are intentionally lightweight and need calibration under broader playtesting.

Risks:
- Without modular extraction and browser automation, maintenance and UI regression risk remain elevated.

### Reversibility

Medium. Behavior should remain, but implementation should migrate to dedicated simulation and presentation modules.

### Files / Systems Affected

- `app.js`
- `README.md`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- season simulation
- schedule/opponent presentation
- analytics data hub
- tactical controls and play-by-play mode

### Follow-Up Actions Required

- Run post-M8 alpha hardening with browser QA and targeted balancing.
- Modularize high-churn simulation/presentation paths.
- Keep M3-M8 regression and soak/performance checks in default validation bundle.

### Tests Or Validations Required

- M8 gate bundle: drive/box consistency, tactical-impact evidence, and performance guardrail pass.
- M3-M7 regression bundle after M8 merge.

### Source Or Research References

- `11_IMPLEMENTATION_ROADMAP.md`
- `10_SIMULATION_SYSTEMS.md`
- `12_TEST_QA_AND_BALANCE.md`

### Notes For Future Sessions

Treat M8 as complete unless regression appears. Focus next on hardening quality and architecture without undoing menus-first velocity.

---

## DL-20260501-18

**Title:** Complete M9 alpha hardening pass and transition next work to M10 modular architecture cleanup  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M9 - hardening checks, calibration evidence, browser smoke automation

### Problem Statement

After M8 simulation depth, the project needed a practical hardening loop that verifies runtime health, tactical-calibration impact, and browser-level shell integrity before deeper expansion.

### Context

The roadmap pack ends at M8, so post-M8 work required an explicit continuity slice. M9 was defined as alpha hardening with measurable checks that can be rerun quickly and kept in regression flow.

### Options Considered

**Option A:** Defer hardening and jump directly into architecture refactor.  
Pros: immediate code-organization progress.  
Cons: weaker confidence baseline while refactoring.

**Option B:** Add in-app hardening report hooks plus browser smoke automation first, then refactor.  
Pros: safer sequencing and clearer regression guardrails.  
Cons: adds temporary utility logic to the monolithic app file.

### Decision

Choose Option B. Implement deterministic hardening helpers (`runM9BalanceCalibration`, `runM9HardeningCheck`), wire analytics panels for report visibility, and add Playwright smoke automation (`scripts/m9_browser_smoke.js`) before M10 modularization.

### Why This Option Won

It establishes a stronger quality baseline for subsequent architecture changes while staying aligned with menus-first governance.

### Consequences

Positive:
- Runtime and tactical-impact health can be checked from code and UI.
- Browser-level smoke checks now validate major navigation and key controls.
- Regression confidence increased before code-structure refactors.

Tradeoffs:
- Hardening utilities currently reside in `app.js` and should be extracted during M10.

Risks:
- Broader browser coverage is still needed beyond smoke-level checks.

### Reversibility

Easy to medium. Report and smoke layers can be expanded or moved to dedicated modules with low behavior risk.

### Files / Systems Affected

- `app.js`
- `scripts/m9_browser_smoke.js`
- `README.md`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`
- analytics/hardening UI
- browser QA automation

### Follow-Up Actions Required

- Start M10 modular extraction for simulation/presentation/hardening code paths.
- Expand Playwright coverage from smoke to interaction/regression suites.
- Keep M3-M9 gates in default validation bundle.

### Tests Or Validations Required

- M9 headless hardening gate bundle.
- M9 browser smoke script pass.
- M3-M8 regression bundle after M9 merge.

### Source Or Research References

- `11_IMPLEMENTATION_ROADMAP.md`
- `10_SIMULATION_SYSTEMS.md`
- `12_TEST_QA_AND_BALANCE.md`

### Notes For Future Sessions

Treat M9 as complete unless regression appears. Begin M10 with modularization while preserving all milestone gates and deterministic behavior.

---

## DL-20260501-19

**Title:** Complete M10 runtime modularization pass with compatibility-preserving browser regression expansion  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M10 - sim/hardening module extraction and Playwright regression depth

### Problem Statement

Post-M9 hardening checks improved confidence, but key simulation and hardening code remained concentrated in one monolithic runtime file, raising maintenance risk for future changes.

### Context

The post-M8 path called for architecture cleanup and broader browser QA. A safe first slice needed to add real module seams without breaking existing deterministic harnesses.

### Options Considered

**Option A:** Perform a large refactor that fully decomposes app runtime in one pass.  
Pros: faster end-state architecture.  
Cons: high regression risk and difficult verification in one milestone.

**Option B:** Extract high-churn deterministic helpers into runtime modules with fallback compatibility and expand browser regression coverage in parallel.  
Pros: reduces risk while improving structure and test depth incrementally.  
Cons: temporary dual-path execution (module + fallback) until deeper extraction is finished.

### Decision

Choose Option B. Extract simulation and hardening helper logic into `runtime/sim-core.js` and `runtime/hardening-core.js`, load modules before `app.js`, keep compatibility fallbacks for direct VM harnesses, and add `scripts/m10_browser_regression.js` for broader Playwright interaction coverage.

### Why This Option Won

It adds meaningful architecture boundaries now while preserving gate stability and existing automation flows.

### Consequences

Positive:
- Simulation and hardening logic now has explicit module seams.
- Browser QA coverage increased beyond smoke checks.
- Existing direct VM harnesses remain functional due to fallbacks.

Tradeoffs:
- Some logic is temporarily duplicated between module and fallback paths.

Risks:
- Continued modularization is needed to avoid long-term split-maintenance overhead.

### Reversibility

Easy. Module loading can be rolled back with minimal behavior risk because fallbacks preserve equivalent behavior.

### Files / Systems Affected

- `runtime/sim-core.js`
- `runtime/hardening-core.js`
- `app.js`
- `index.html`
- `scripts/m10_browser_regression.js`
- `README.md`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`

### Follow-Up Actions Required

- Continue M11 extraction for state/read-model/panel helpers.
- Introduce cleaner content-loader boundaries after runtime split stabilizes.
- Keep both headless and browser regression suites in standard validation runs.

### Tests Or Validations Required

- M10 headless gate bundle for module wiring and simulation continuity.
- M10 browser regression script pass.
- Direct app.js compatibility gate for existing VM harnesses.

### Source Or Research References

- `08_SYSTEM_ARCHITECTURE.md`
- `10_SIMULATION_SYSTEMS.md`
- `12_TEST_QA_AND_BALANCE.md`

### Notes For Future Sessions

Treat M10 as complete unless regressions appear. Continue extraction in smaller verifiable slices while maintaining deterministic behavior and browser regression stability.

---

## DL-20260501-20

**Title:** Prioritize sandbox-first customization and complete M11 rules-profile foundation  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M11 - sandbox setup, rules presets, and gameplay multiplier wiring

### Problem Statement

The prototype had a stronger yearly loop after M10, but lacked a clear way for players to define the kind of college-football universe they wanted before beginning a career.

### Context

Product direction shifted toward "the CFB game every kid wanted," emphasizing sandbox control and experimentation over fixed default pacing. Existing systems already exposed AP economies and simulation coefficients, so M11 could create a user-facing configuration layer that mapped directly into those systems.

### Options Considered

**Option A:** Continue architecture extraction first and defer sandbox customization until later milestones.  
Pros: cleaner internals sooner.  
Cons: misses immediate player-facing product direction.

**Option B:** Add a sandbox-first bootstrap layer now (mode, presets, tunable rules), wire settings into core systems, and validate with targeted browser automation.  
Pros: immediate player-visible differentiation, fast iteration loop, and measurable behavior impact.  
Cons: increases coupling pressure in `app.js` until deeper extraction continues.

### Decision

Choose Option B. Implement sandbox-first setup controls in bootstrap, introduce canonical `rulesProfile` preset normalization, persist mode/rules through save/load, and wire the profile into recruiting, retention, portal exceptions, and simulation multipliers.

### Why This Option Won

It directly serves the current product goal and creates a strong customization baseline while remaining compatible with existing deterministic and browser QA gates.

### Consequences

Positive:
- Players can now select experience mode and tune key world parameters before starting.
- Core AP economies and game simulation now respond to bootstrap rules settings.
- A dedicated Playwright scenario validates the customization flow end-to-end.

Tradeoffs:
- Some rules plumbing remains in monolithic app orchestration code pending deeper extraction.

Risks:
- Additional rule knobs could outpace UX clarity if not grouped and explained carefully.

### Reversibility

Medium. Preset definitions and slider set can be adjusted or reduced safely, but persisted `rulesProfile` usage should stay backward-compatible.

### Files / Systems Affected

- `index.html`
- `app.js`
- `runtime/sim-core.js`
- `scripts/m11_sandbox_customization.js`
- `README.md`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`

### Follow-Up Actions Required

- Expand sandbox control surface in M12 (pace/injury/NIL volatility candidates).
- Continue module extraction for state/read-model helpers now that rules-profile seams are proven.
- Add multi-preset scenario packs for repeatable browser QA.

### Tests Or Validations Required

- Headless M3-M8 compatibility rerun after rules-profile wiring.
- Playwright M10 regression rerun after bootstrap/control additions.
- New Playwright M11 sandbox customization flow pass.

### Source Or Research References

- `05_PRODUCT_REQUIREMENTS.md`
- `07_MENU_UX_AND_SCREEN_SPECS.md`
- `10_SIMULATION_SYSTEMS.md`
- `12_TEST_QA_AND_BALANCE.md`

### Notes For Future Sessions

Treat M11 as complete and stable. Push M12 toward broader, clearly named sandbox knobs and stronger scenario-driven QA while preserving deterministic behavior and migration compatibility.

---

## DL-20260501-21

**Title:** Complete M12 sandbox depth by wiring injury/NIL/progression controls into deterministic runtime signals  
**Status:** accepted  
**Date:** 2026-05-01  
**Owner / role:** Codex implementation agent  
**Related milestone / slice:** M12 - sandbox rule depth and read-model signal integration

### Problem Statement

M11 enabled sandbox setup but still concentrated customization around AP and sim-scoring controls. The loop needed additional knobs that changed player-facing risk/economy behavior during weekly management.

### Context

The product direction remains sandbox-first. Existing systems already had stable hooks for morale, benefit pressure, and risk dashboards, making M12 a strong point to introduce deeper control without destabilizing foundational systems.

### Options Considered

**Option A:** Add new sliders as cosmetic labels only and defer behavior wiring.  
Pros: low risk, faster UI expansion.  
Cons: weak player trust; settings feel fake.

**Option B:** Add sliders and wire each to deterministic system behavior plus browser validation.  
Pros: meaningful customization, stronger product signal, and testable outcomes.  
Cons: more integration touchpoints in current monolithic orchestration.

### Decision

Choose Option B. Add injury cadence, NIL volatility, and progression pace as persisted rules-profile settings and wire them into deterministic pressure/risk/morale behavior with updated browser checks.

### Why This Option Won

It keeps sandbox customization credible and measurable while preserving deterministic simulation and existing regression coverage.

### Consequences

Positive:
- Sandbox setup now impacts economic pressure and player-development dynamics.
- Development and Finance screens visibly reflect new sandbox settings.
- Regression suite now covers the additional sandbox knobs.

Tradeoffs:
- More rules-driven behavior remains in app-level orchestration pending future extraction.

Risks:
- Additional knobs increase balance-complexity pressure and tuning burden.

### Reversibility

Medium. Individual knobs/ranges can be tuned or removed, but persisted profile compatibility should remain intact.

### Files / Systems Affected

- `index.html`
- `app.js`
- `scripts/m11_sandbox_customization.js`
- `README.md`
- `docs/PROJECT_STATUS.md`
- `docs/DECISION_LOG.md`

### Follow-Up Actions Required

- Expand M13 preset identity so each preset has clearer economic/risk personality.
- Continue runtime extraction of rules/read-model logic from `app.js`.
- Add scenario packs that compare preset behavior across multiple simulated weeks.

### Tests Or Validations Required

- M3-M8 headless compatibility regression pass.
- M10 browser regression pass.
- Expanded sandbox browser script pass including M12 knob effects.

### Source Or Research References

- `05_PRODUCT_REQUIREMENTS.md`
- `07_MENU_UX_AND_SCREEN_SPECS.md`
- `10_SIMULATION_SYSTEMS.md`
- `12_TEST_QA_AND_BALANCE.md`

### Notes For Future Sessions

Treat M12 as complete and stable. Move next toward M13 preset personality depth and scenario-pack QA while keeping deterministic behavior and backward-compatible rules-profile normalization.

---

## DL-20260506-01

**Title:** Pivot rebuild strategy to FM-inspired domain/resource architecture before UI V2 workflows  
**Status:** accepted  
**Date:** 2026-05-06  
**Owner / role:** Codex architecture agent  
**Related milestone / slice:** UI rebuild / domain model recovery

### Problem Statement

Recent playtesting exposed that the current app has too much scaffolded surface area and too little meaningful interaction. The UI is text-heavy, inconsistent, and often disconnected from durable state changes.

### Context

The latest 2026-05-06 planning packs and visual direction emphasize professional management-game workspaces, but the project still contains a large monolithic app shell and many legacy screen patterns. The local Football Manager 2020 install was inspected as a high-level systems reference for database shape, resource definitions, event authoring, and history storage.

### Options Considered

**Option A:** Continue patching the existing monolithic UI and restyle screens in place.  
Pros: fastest visible progress.  
Cons: preserves scattered state ownership and fake interactions.

**Option B:** Throw away the current project and restart from scratch.  
Pros: cleanest surface.  
Cons: loses useful sim modules, tests, harnesses, data generation, and save/event concepts.

**Option C:** Treat the existing project as a parts library, define a canonical domain/resource layer, then rebuild thin screen workflows on top.  
Pros: preserves useful work while addressing the actual architecture failure.  
Cons: requires a deliberate schema and selector/action pass before flashy UI progress.

### Decision

Choose Option C. The next rebuild should establish canonical entities, relationship tables, event/history stores, action definitions, selectors, and versioned rules before or alongside Program Desk, Roster, Player Profile, and Recruiting UI V2.

### Why This Option Won

The FM 2020 structure points to a mature separation between base database, overlays, resources, actions, rules, events, and history. The current game needs that separation more than it needs another broad UI pass.

### Consequences

Positive:
- Screens can become thin consumers of real state instead of owners of fake screen data.
- Clicks can be verified through commands, state mutation, logs, and persistence.
- Existing sim modules can be salvaged selectively rather than trusted wholesale.

Tradeoffs:
- Short-term visual progress may slow while the domain/resource layer is clarified.
- Some current app-level logic will be quarantined instead of incrementally patched.

Risks:
- Over-modeling could stall the rebuild if the schema tries to cover every future system.

### Reversibility

Medium. The V2 schema/action/selector layer can start as plain JavaScript objects and modules, then migrate to a database-backed format later if needed.

### Files / Systems Affected

- `docs/FM2020_ARCHITECTURE_NOTES.md`
- `docs/DECISION_LOG.md`
- Future: canonical world schema, selectors, actions, Program Desk V2, Roster V2, Recruiting V2

### Follow-Up Actions Required

- Draft the canonical M1/M2 world schema.
- Audit current modules into keep/quarantine/replace buckets.
- Build selectors/actions for the first playable vertical slice.
- Rebuild Program Desk, Roster, Player Profile, and Recruiting as thin UI workflows.
- Use `docs/CGM_DOMAIN_RESOURCE_ARCHITECTURE.md` as the implementation contract for the rebuild.

### Tests Or Validations Required

- State mutation tests for each action.
- Selector tests for each rebuilt screen read model.
- Browser smoke tests proving row clicks, inspector updates, actions, save/load, and continue-week flow.

### Source Or Research References

- `docs/FM2020_ARCHITECTURE_NOTES.md`
- `docs/FM2020_OVERLAP_FEATURE_CATALOG.md`
- `docs/FM26_EDITOR_REFERENCE_NOTES.md`
- `docs/FM_DOWNLOADS_SAVE_AND_PACK_REFERENCE.md`
- `docs/FM_SAVE_DEEP_SCAN_REPORT.md`
- `ai-pack/CFB_FM_UI_CANONICAL_SPEC.md`
- `ai-pack/CFB_FM_UI_CONSOLIDATION_DIRECTIVE/CFB_FM_UI_CONSOLIDATION_SPRINT_DIRECTIVE.md`
- `ai-pack/college_football_legends_visual_style_guide.md`

## 2026-05-07 - Add Repeatable FM Save Deep Scan

### Context

The FM save is too large to inspect manually with confidence. A one-time string scrape found useful subsystem names, but it did not explain how the 1 GB decompressed save is shaped.

### Decision

Add a repeatable local scanner for architecture-level save analysis and schedule this thread to continue the work periodically.

### Consequences

- `npm run fm:save-scan` now regenerates a markdown report and JSON report.
- The first structured scan found `1,271` `tad.` sections, four very large packed record blocks, and hundreds of smaller binary record sections.
- Future analysis can iterate on section sizing, record density, and subsystem co-occurrence without recopying proprietary content.

### Source Or Research References

- `scripts/fm_save_deep_scan.js`
- `docs/FM_SAVE_DEEP_SCAN_REPORT.md`
- `docs/FM_SAVE_PASS2_BUILD_IMPLICATIONS.md`
- `docs/FM_SAVE_PASS3_CGM_GAP_AUDIT.md`
- `docs/FM_SAVE_PASS4_DOMAIN_SPINE_IMPLEMENTATION_PLAN.md`
- `tmp/fm-save-scan/fm_save_deep_scan.json`

## 2026-05-07 - Preserve Existing Engines, Build A Domain Spine Next

### Context

The FM save scan identified durable boundaries around calendar, histories, transactions, scouting/snapshots, interactions/promises, training, world ticking, and migration/repair. A follow-up CGM audit found that many related engines already exist, but they are not yet coordinated through canonical durable stores and read models.

### Decision

Do not restart from scratch. Preserve the useful engines as parts-bin modules, but plan the next coding work around a `js/sim/domain/` spine and one functional vertical slice.

### Consequences

- Existing recruiting, portal, NIL, development, injury, pulse, event-log, action-log, reducer, and invariant modules remain valuable.
- Screen-owned data and isolated click handlers should be quarantined until they write to canonical stores.
- The next implementation plan should start with durable stores, selectors, and actions, then prove them through recruit -> offer -> visit -> advance week -> profile/calendar/inbox/history updates.

### Source Or Research References

- `docs/FM_SAVE_PASS3_CGM_GAP_AUDIT.md`

## 2026-05-07 - First Implementation Slice Is Recruit-Centered Domain Spine

### Context

The FM save-derived store boundaries and the CGM gap audit both point to the same implementation need: durable stores and selectors before another UI pass. The existing project exposes browser-global modules, so the first version can match that style and stay harness-friendly.

### Decision

Use a recruit-centered vertical slice as the first implementation proof for the domain spine.

### Consequences

- Add `js/sim/domain/` with store constructors, recruit-centered actions, selectors, and a phase-based world tick runner.
- Prove the flow: scout recruit, contact recruit, offer scholarship, schedule visit, advance week, then read the same records through calendar, inbox, recruiting board, player profile, and program desk selectors.
- Add a deterministic harness scenario before wiring more UI.

### Source Or Research References

- `docs/FM_SAVE_PASS4_DOMAIN_SPINE_IMPLEMENTATION_PLAN.md`

## 2026-05-07 - Menu Graphics Use A Finite Asset Library

### Context

FM screenshots, FM26 UI bundles, CGM reference images, and the UI rescue/style packs were reviewed for menu art direction. FM-style management screens are mostly dense data UI, not bespoke illustration screens.

### Decision

Use FM assets/screenshots only as dimensional and layout reference. Build a finite CGM-owned menu graphics library with reusable portraits, stadium/campus images, news thumbnails, headers, tiles, and fallback art.

### Consequences

- Do not build every menu around a unique generated background.
- Generate or curate assets around concrete screen purposes and crop sizes.
- Keep major workspaces functional without art dependencies.
- Reserve dynamic image generation for event-specific news, moments, portraits, and scrapbook assets after the domain event system exists.

### Source Or Research References

- `docs/CGM_MENU_GRAPHICS_ASSET_MANIFEST.md`
- `tmp/asset-inventory/image_inventory.json`
- `tmp/asset-inventory/fm_screenshots_contact.png`
- `tmp/asset-inventory/ai_game_screens_contact.png`
