// Tests for STAT-1 taxonomy + STAT-3 lite accumulator.
(function registerStatTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const TAX = global.CGM_STAT_TAXONOMY;
  const ACC = global.CGM_STAT_ACCUMULATOR;
  const PE = global.CGM_PLAY_EVENT;
  if (!RUNNER || !TAX || !ACC || !PE) return;

  RUNNER.suite("STAT-1 stat taxonomy", (t) => {
    t.test("registry exposes core stats", (a) => {
      a.ok(TAX.getStat("points"), "points defined");
      a.ok(TAX.getStat("total_yards"), "total_yards defined");
      a.ok(TAX.getStat("team_pass_attempts"), "team_pass_attempts defined");
      a.ok(TAX.getStat("team_rush_attempts"), "team_rush_attempts defined");
      a.ok(TAX.getStat("yards_per_play"), "yards_per_play defined");
    });

    t.test("statsByCategory groups correctly", (a) => {
      const passing = TAX.statsByCategory("passing");
      a.ok(passing.length >= 4, "passing has multiple stats");
      a.ok(passing.every((s) => s.category === "passing"), "all are passing");
    });

    t.test("formatStatValue formats according to displayFormat", (a) => {
      a.equal(TAX.formatStatValue(TAX.getStat("yards_per_play"), 5.456), "5.5", "decimal_1");
      a.equal(TAX.formatStatValue(TAX.getStat("total_yards"), 314), "314 yds", "yards");
      a.equal(TAX.formatStatValue(TAX.getStat("team_completion_pct"), 0.625), "62.5%", "percentage");
      a.equal(TAX.formatStatValue(TAX.getStat("points"), 27), "27", "points");
    });
  });

  RUNNER.suite("STAT-3 lite accumulator", (t) => {
    function pe(opts) { return PE.createPlayEvent(opts); }

    t.test("buildGameBook tallies basic team lines", (a) => {
      const events = [
        pe({ id: "p1", playType: "rush", chargedPlayType: "rushing_attempt", outcome: "gain", yardsGained: 6,
             possessionTeamId: "H", defenseTeamId: "A", driveId: "d1" }),
        pe({ id: "p2", playType: "pass", chargedPlayType: "passing_attempt_complete", outcome: "complete", yardsGained: 18,
             possessionTeamId: "H", defenseTeamId: "A", driveId: "d1" }),
        pe({ id: "p3", playType: "pass", chargedPlayType: "passing_attempt_complete", outcome: "score", yardsGained: 22,
             possessionTeamId: "H", defenseTeamId: "A", driveId: "d1" }),
        pe({ id: "p4", playType: "rush", chargedPlayType: "rushing_attempt", outcome: "loss", yardsGained: -2,
             possessionTeamId: "A", defenseTeamId: "H", driveId: "d2" }),
        pe({ id: "p5", playType: "pass", chargedPlayType: "passing_attempt_interception", outcome: "turnover", yardsGained: 0,
             possessionTeamId: "A", defenseTeamId: "H", driveId: "d2" }),
      ];
      const book = ACC.buildGameBook(events, { homeTeamId: "H", awayTeamId: "A" });
      a.equal(book.home.team_rush_attempts, 1, "home rush attempts");
      a.equal(book.home.team_pass_attempts, 2, "home pass attempts");
      a.equal(book.home.team_passing_yards, 40, "home passing yards");
      a.equal(book.home.passing_touchdowns, 1, "home passing TD counted");
      a.equal(book.home.points, 7, "home scored 7 (long pass TD)");
      a.equal(book.away.team_interceptions_thrown, 1, "away INT");
      a.equal(book.home.turnovers_forced, 1, "home defense gets the takeaway");
      a.equal(book.home.points_allowed, 0, "home allowed 0 since away didn't score");
    });

    t.test("derived stats compute correctly", (a) => {
      const line = ACC.emptyTeamLine();
      line.total_yards = 350; line.total_plays = 70;
      a.close(ACC.deriveValue(line, "yards_per_play"), 5.0, 0.01, "yards/play");
      line.team_pass_attempts = 30; line.team_pass_completions = 18;
      a.close(ACC.deriveValue(line, "team_completion_pct"), 0.6, 0.01, "completion pct");
      line.team_rush_attempts = 40; line.team_rushing_yards = 200;
      a.close(ACC.deriveValue(line, "team_yards_per_rush"), 5.0, 0.01, "yards/carry");
      line.points = 35; line.drives = 7;
      a.close(ACC.deriveValue(line, "points_per_drive"), 5.0, 0.01, "points/drive");
    });

    t.test("reconciler reports box score consistency", (a) => {
      const events = [
        PE.createPlayEvent({ id: "p1", playType: "rush", chargedPlayType: "rushing_attempt", outcome: "gain", yardsGained: 5,
          possessionTeamId: "H", defenseTeamId: "A", driveId: "d1" }),
        PE.createPlayEvent({ id: "p2", playType: "pass", chargedPlayType: "passing_attempt_complete", outcome: "complete", yardsGained: 12,
          possessionTeamId: "H", defenseTeamId: "A", driveId: "d1" }),
      ];
      const book = ACC.buildGameBook(events, { homeTeamId: "H", awayTeamId: "A" });
      const results = ACC.reconcileGameBook(book);
      const passes = results.filter((r) => r.severity === "pass");
      const warnings = results.filter((r) => r.severity === "warning");
      a.ok(passes.length >= 2, "at least 2 pass results (one per side)");
      a.equal(warnings.length, 0, "no warnings for clean book");
    });

    t.test("accumulateLineInto rolls game stats into season totals", (a) => {
      const season = ACC.emptyTeamLine();
      const game1 = ACC.emptyTeamLine(); game1.points = 28; game1.total_yards = 420;
      const game2 = ACC.emptyTeamLine(); game2.points = 17; game2.total_yards = 350;
      ACC.accumulateLineInto(season, game1);
      ACC.accumulateLineInto(season, game2);
      a.equal(season.points, 45, "points summed");
      a.equal(season.total_yards, 770, "yards summed");
    });
  });
})(window);
