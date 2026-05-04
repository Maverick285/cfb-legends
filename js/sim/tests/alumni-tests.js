// ARCHIVE-1 tests: career stat tally, alumni records, coach legacies, queries.
(function registerAlumniTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const A = global.CGM_ALUMNI;
  if (!RUNNER || !A) return;

  RUNNER.suite("ARCHIVE-1 career stat tally", (t) => {
    t.test("recordPlayerSeasonStats accumulates totals + appends seasons", (a) => {
      const player = { id: "qb1", name: "QB1", position: "QB" };
      A.recordPlayerSeasonStats(player, 2030, { passing_yards: 3500, passing_tds: 28 });
      A.recordPlayerSeasonStats(player, 2031, { passing_yards: 4100, passing_tds: 35 });
      a.equal(player.careerStats.totals.passing_yards, 7600);
      a.equal(player.careerStats.totals.passing_tds, 63);
      a.equal(player.careerStats.seasons.length, 2);
      a.equal(player.careerStats.seasons[1].year, 2031);
    });
    t.test("non-numeric fields are dropped", (a) => {
      const player = { id: "x" };
      A.recordPlayerSeasonStats(player, 2030, { passing_yards: 100, position: "QB", garbage: undefined });
      a.equal(player.careerStats.totals.passing_yards, 100);
      a.equal(player.careerStats.totals.position, undefined);
    });
    t.test("recordPlayerAward appends with year stamp", (a) => {
      const player = { id: "x" };
      A.recordPlayerAward(player, "Coach of the Year", 2030);
      A.recordPlayerAward(player, "POTY", 2031);
      a.equal(player.careerStats.awardsWon.length, 2);
      a.equal(player.careerStats.awardsWon[0].year, 2030);
    });
  });

  RUNNER.suite("ARCHIVE-1 alumni records", (t) => {
    t.test("buildAlumniRecord captures totals + draft info", (a) => {
      const player = {
        id: "rb1", name: "Big Back", position: "HB", year: "SR", ovr: 92,
        careerStats: {
          totals: { rushing_yards: 4500, rushing_tds: 50 },
          seasons: [
            { year: 2028, rushing_yards: 1100 }, { year: 2029, rushing_yards: 1300 },
            { year: 2030, rushing_yards: 1500 }, { year: 2031, rushing_yards: 600 },
          ],
          awardsWon: [{ award: "RB of the Year", year: 2030 }],
        },
      };
      const rec = A.buildAlumniRecord({
        player, reason: A.DEPART_REASONS.DRAFTED, seasonYear: 2031,
        programId: "TX", draftRound: 1, draftTier: "Top-10", draftPick: 7,
      });
      a.equal(rec.playerId, "rb1");
      a.equal(rec.departureReason, "drafted");
      a.equal(rec.seasonsPlayed, 4);
      a.equal(rec.draft.round, 1);
      a.equal(rec.draft.year, 2032);
      a.equal(rec.careerTotals.rushing_yards, 4500);
      a.equal(rec.awardsWon.length, 1);
      a.ok(rec.hallOfFameWorthy, "RB with 4500yd career + award is HOF-worthy");
    });
    t.test("HOF gate: 3+ awards qualifies regardless of stats", (a) => {
      const rec = A.buildAlumniRecord({
        player: { id: "x", careerStats: { totals: { rushing_yards: 500 }, seasons: [], awardsWon: [
          { award: "All-Conference", year: 2028 },
          { award: "All-Conference", year: 2029 },
          { award: "All-American",   year: 2030 },
        ]} },
        reason: A.DEPART_REASONS.GRADUATED, seasonYear: 2030, programId: "X",
      });
      a.ok(rec.hallOfFameWorthy);
    });
    t.test("low-stat zero-award player is not HOF", (a) => {
      const rec = A.buildAlumniRecord({
        player: { id: "x", careerStats: { totals: {}, seasons: [], awardsWon: [] } },
        reason: A.DEPART_REASONS.GRADUATED, seasonYear: 2030, programId: "X",
      });
      a.ok(!rec.hallOfFameWorthy);
    });
    t.test("archiveDepartures handles draft outflow shape", (a) => {
      const departing = [
        { playerId: "a", name: "A", position: "QB", playerRef: { id: "a", careerStats: { totals: { passing_yards: 8000 }, seasons: [{}], awardsWon: [] } }, draftRound: 1, draftTier: "Top-10", departReason: "drafted" },
        { playerId: "b", name: "B", position: "OL", playerRef: { id: "b", careerStats: { totals: {}, seasons: [{}], awardsWon: [] } }, departReason: "graduated" },
      ];
      const records = A.archiveDepartures({ departing, seasonYear: 2030, programId: "TX" });
      a.equal(records.length, 2);
      a.equal(records[0].departureReason, "drafted");
      a.equal(records[1].departureReason, "graduated");
      a.ok(records[0].draft);
      a.equal(records[1].draft, null);
    });
  });

  RUNNER.suite("ARCHIVE-1 coach legacy", (t) => {
    t.test("buildCoachLegacyRecord captures tenure", (a) => {
      const rec = A.buildCoachLegacyRecord({
        coach: { identity: { fullName: "Dan Carter" } },
        role: "HC", programId: "TX",
        startYear: 2025, endYear: 2031,
        recordSummary: "62-18", championships: 1, bowls: 5, coyAwards: 2,
        endReason: A.COACH_END_REASONS.LEFT_FOR_NFL,
      });
      a.equal(rec.tenureYears, 7);
      a.equal(rec.championships, 1);
      a.equal(rec.endReason, "left_for_nfl");
    });
    t.test("coachLegacySummary aggregates totals", (a) => {
      const legacies = [
        { tenureYears: 5, championships: 0, coyAwards: 1 },
        { tenureYears: 8, championships: 2, coyAwards: 0 },
      ];
      const s = A.coachLegacySummary(legacies);
      a.equal(s.totalCoaches, 2);
      a.equal(s.totalSeasons, 13);
      a.equal(s.totalChampionships, 2);
      a.equal(s.totalCoyAwards, 1);
    });
  });

  RUNNER.suite("ARCHIVE-1 queries", (t) => {
    function makeAlumni() {
      return [
        { playerId: "1", position: "QB", programId: "TX", departureReason: "drafted", seasonsPlayed: 4, careerTotals: { passing_yards: 12000 }, draft: { round: 1 }, hallOfFameWorthy: true, departureSeason: 2025 },
        { playerId: "2", position: "QB", programId: "TX", departureReason: "graduated", seasonsPlayed: 2, careerTotals: { passing_yards: 1500 }, draft: null, hallOfFameWorthy: false, departureSeason: 2027 },
        { playerId: "3", position: "HB", programId: "OK", departureReason: "drafted", seasonsPlayed: 3, careerTotals: { rushing_yards: 4000 }, draft: { round: 2 }, hallOfFameWorthy: true, departureSeason: 2026 },
      ];
    }
    t.test("filter by program", (a) => {
      a.equal(A.queryAlumni(makeAlumni(), { programId: "TX" }).length, 2);
      a.equal(A.queryAlumni(makeAlumni(), { programId: "OK" }).length, 1);
    });
    t.test("filter by position + draftedOnly", (a) => {
      const list = A.queryAlumni(makeAlumni(), { position: "QB", draftedOnly: true });
      a.equal(list.length, 1);
      a.equal(list[0].playerId, "1");
    });
    t.test("filter by hofOnly", (a) => {
      a.equal(A.queryAlumni(makeAlumni(), { hofOnly: true }).length, 2);
    });
    t.test("filter sinceYear", (a) => {
      a.equal(A.queryAlumni(makeAlumni(), { sinceYear: 2026 }).length, 2);
    });
    t.test("topAlumniByCareerStat sorts desc", (a) => {
      const top = A.topAlumniByCareerStat(makeAlumni(), "passing_yards", 5);
      a.equal(top[0].playerId, "1");
    });
  });
})(window);
