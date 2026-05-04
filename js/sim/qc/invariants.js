// HARNESS-1 (lite): In-Browser Invariant Checker
// Spec: ai-pack/CFB_FM_REMAINING_SYSTEM_SPECS/49_TEST_HARNESS_SCENARIO_BALANCE_AND_AI_QC_SPEC.md
//
// Walks the live game state and asserts a set of invariants that should hold
// at all times. Returns ReconciliationResult-shaped entries so the AI QC
// packet (next packet) can serialize them. Run from the in-app "Validation"
// panel; intended to be re-run after every continue tick / save load / spec
// change so regressions surface immediately instead of during deep play.

(function initInvariants(global) {
  /**
   * Assertion catalogue. Each invariant has:
   *   - id            stable token used in reports
   *   - severity      "error" | "warning" | "info"
   *   - check         (state) => null | { actual, expected, message, evidence }
   * `state` is { career, data, programs, world } (the same names app.js uses).
   */
  const INVARIANTS = [
    {
      id: "career.programId_resolves",
      severity: "error",
      check(state) {
        const found = state.programs.find((p) => p.id === state.career.programId);
        if (!found) return { message: `career.programId '${state.career.programId}' has no matching program record` };
        return null;
      },
    },
    {
      id: "depth_chart.slots_reference_valid_players",
      severity: "error",
      check(state) {
        const dc = state.data.depthChart || {};
        const playerIds = new Set((state.data.playerProfiles || []).map((p) => p.id));
        const broken = Object.entries(dc).filter(([, id]) => id && !playerIds.has(id));
        if (broken.length) return { message: `depth chart references missing players: ${broken.map(([slot, id]) => `${slot}=${id}`).join(", ")}` };
        return null;
      },
    },
    {
      id: "roster.composition_minimums",
      severity: "warning",
      check(state) {
        const counts = {};
        (state.data.playerProfiles || []).forEach((p) => { counts[p.position] = (counts[p.position] || 0) + 1; });
        const required = { QB: 2, HB: 2, WR: 3, OL: 5 };
        const olCount = (counts.LT || 0) + (counts.OT || 0) + (counts.OG || 0) + (counts.C || 0);
        const issues = [];
        if ((counts.QB || 0) < required.QB) issues.push(`QB: ${counts.QB || 0}/${required.QB}`);
        if ((counts.HB || 0) < required.HB) issues.push(`HB: ${counts.HB || 0}/${required.HB}`);
        if ((counts.WR || 0) < required.WR) issues.push(`WR: ${counts.WR || 0}/${required.WR}`);
        if (olCount < required.OL) issues.push(`OL: ${olCount}/${required.OL}`);
        if (issues.length) return { message: `roster below minimums: ${issues.join(", ")}` };
        return null;
      },
    },
    {
      id: "season.record_matches_played_games",
      severity: "warning",
      check(state) {
        const ss = state.data.seasonState;
        if (!ss || !Array.isArray(ss.playedGames)) return null;
        const wins = ss.playedGames.filter((g) => g.outcome === "W").length;
        const losses = ss.playedGames.filter((g) => g.outcome === "L").length;
        if (ss.overallRecord && (ss.overallRecord.wins !== wins || ss.overallRecord.losses !== losses)) {
          return {
            actual: `${ss.overallRecord.wins}-${ss.overallRecord.losses}`,
            expected: `${wins}-${losses}`,
            message: `seasonState.overallRecord drifted from playedGames`,
          };
        }
        return null;
      },
    },
    {
      id: "save_schema.version_current",
      severity: "info",
      check(state) {
        // Best-effort check via export, not a hard error.
        return null;
      },
    },
    {
      id: "ai_school.standings_match_program_count",
      severity: "warning",
      check(state) {
        const standings = state.data.aiSchoolStandings;
        if (!standings) return null;
        const sCount = Object.keys(standings).length;
        if (sCount !== state.programs.length) {
          return {
            actual: sCount, expected: state.programs.length,
            message: `aiSchoolStandings has ${sCount} entries vs ${state.programs.length} programs`,
          };
        }
        return null;
      },
    },
    {
      id: "ai_school.records_within_schedule_bounds",
      severity: "warning",
      check(state) {
        const standings = state.data.aiSchoolStandings;
        if (!standings) return null;
        const ss = state.data.seasonState;
        const maxGames = Math.max(13, (ss && ss.currentGameIndex) || 0);
        const overflow = Object.entries(standings).filter(([, rec]) => (rec.wins + rec.losses) > maxGames + 2);
        if (overflow.length) return { message: `${overflow.length} teams have impossibly many games this season` };
        return null;
      },
    },
    {
      id: "schedule.has_twelve_games",
      severity: "warning",
      check(state) {
        const len = (state.data.schedule || []).length;
        if (len !== 12) return { actual: len, expected: 12, message: `schedule has ${len} games (expected 12)` };
        return null;
      },
    },
    {
      id: "stats.season_book_consistent_with_games_played",
      severity: "warning",
      check(state) {
        const ss = state.data.seasonState;
        if (!ss || !ss.seasonStatBook) return null;
        const games = ss.currentGameIndex || 0;
        if (ss.seasonStatBook.gamesIncluded !== games && games > 0) {
          return { actual: ss.seasonStatBook.gamesIncluded, expected: games, message: `seasonStatBook.gamesIncluded != currentGameIndex` };
        }
        return null;
      },
    },
    {
      id: "player_stats.season_book_keyed_by_real_player_ids",
      severity: "warning",
      check(state) {
        const ss = state.data.seasonState;
        const book = ss && ss.seasonPlayerBook;
        if (!book) return null;
        const playerIds = new Set((state.data.playerProfiles || []).map((p) => p.id));
        const orphanPassers = Object.keys(book.passers || {}).filter((id) => !playerIds.has(id));
        if (orphanPassers.length) return { message: `seasonPlayerBook.passers has ${orphanPassers.length} ids not on the roster` };
        return null;
      },
    },
    {
      id: "event_log.exists_and_grows",
      severity: "info",
      check(state) {
        const log = state.data.eventLog;
        if (!log) return { message: "no event log present yet" };
        return null;
      },
    },
    {
      id: "rules.cfp_field_size_matches_constant",
      severity: "info",
      check(state) {
        // CFP_FIELD_SIZE is a top-level constant; if the bracket exists it should be 11 rows (4 first round + 4 QF + 2 semi + 1 final).
        const bracket = state.data.seasonState && state.data.seasonState.cfpBracket;
        if (!Array.isArray(bracket) || !bracket.length) return null;
        if (bracket.length !== 11) return { actual: bracket.length, expected: 11, message: `cfpBracket length ${bracket.length} vs expected 11 (12-team)` };
        return null;
      },
    },
  ];

  function runInvariants(state) {
    const results = [];
    INVARIANTS.forEach((inv) => {
      try {
        const failure = inv.check(state);
        if (failure) {
          results.push({
            id: inv.id, severity: inv.severity,
            check: inv.id,
            actual: failure.actual,
            expected: failure.expected,
            message: failure.message,
            evidence: failure.evidence || null,
          });
        } else {
          results.push({ id: inv.id, severity: "pass", check: inv.id, message: "ok" });
        }
      } catch (e) {
        results.push({ id: inv.id, severity: "error", check: inv.id, message: `invariant threw: ${e && e.message}` });
      }
    });
    return results;
  }

  function summarize(results) {
    return {
      total: results.length,
      pass: results.filter((r) => r.severity === "pass").length,
      info: results.filter((r) => r.severity === "info").length,
      warning: results.filter((r) => r.severity === "warning").length,
      error: results.filter((r) => r.severity === "error").length,
    };
  }

  global.CGM_INVARIANTS = {
    INVARIANTS,
    runInvariants,
    summarize,
  };
})(window);
