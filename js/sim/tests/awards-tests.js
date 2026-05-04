// AWARDS-1 tests: candidate scoring, season ballots, all-teams, record breaks.
(function registerAwardsTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const A = global.CGM_AWARDS;
  if (!RUNNER || !A) return;

  RUNNER.suite("AWARDS-1 candidate scoring", (t) => {
    t.test("3500yd / 35TD QB scores high", (a) => {
      const r = A.scoreCandidate(
        { id: "qb1", position: "QB", year: "JR", ovr: 88 },
        { passing_yards: 3800, passing_tds: 36, passing_ints: 6 },
        { blend: "qb", teamWinPct: 0.8, conferenceStrength: 0.9 }
      );
      a.ok(r.score >= 80, `QB score ${r.score} should be ≥ 80`);
      a.ok(r.reasonCodes.includes("3500yd_passer"));
      a.ok(r.reasonCodes.includes("30+TDs"));
    });
    t.test("team success amplifies score; struggles dampens", (a) => {
      const win = A.scoreCandidate(
        { id: "rb", position: "HB" }, { rushing_yards: 1300, rushing_tds: 12 },
        { blend: "rb", teamWinPct: 0.85, conferenceStrength: 0.7 }
      );
      const lose = A.scoreCandidate(
        { id: "rb", position: "HB" }, { rushing_yards: 1300, rushing_tds: 12 },
        { blend: "rb", teamWinPct: 0.25, conferenceStrength: 0.7 }
      );
      a.ok(win.score > lose.score + 5);
    });
    t.test("coach overperformance scores well", (a) => {
      const r = A.scoreCandidate(
        { id: "coach", position: null }, null,
        { blend: "coach", teamWinPct: 0.85, expectedWinPct: 0.55, confTitle: true, playoffAdvance: 1 }
      );
      a.ok(r.score >= 70);
      a.ok(r.reasonCodes.includes("overperformance"));
    });
    t.test("score never < 0 or > 100", (a) => {
      const high = A.scoreCandidate(
        { position: "QB" }, { passing_yards: 8000, passing_tds: 80 },
        { blend: "qb", teamWinPct: 1, conferenceStrength: 1, postseasonPerformance: true }
      );
      const low = A.scoreCandidate(
        { position: "QB" }, { passing_yards: 0, passing_tds: 0, passing_ints: 30 },
        { blend: "qb", teamWinPct: 0, conferenceStrength: 0 }
      );
      a.ok(high.score <= 100 && high.score >= 0);
      a.ok(low.score <= 100 && low.score >= 0);
    });
  });

  RUNNER.suite("AWARDS-1 season ballots", (t) => {
    t.test("resolveSeasonAwards picks a winner per award", (a) => {
      const players = [
        { id: "qb1", name: "Big Arm", position: "QB", year: "JR", teamId: "TX" },
        { id: "rb1", name: "Power Back", position: "HB", year: "SR", teamId: "TX" },
        { id: "wr1", name: "Speed", position: "WR", year: "SO", teamId: "TX" },
        { id: "fr1", name: "Phenom", position: "QB", year: "FR", teamId: "TX" },
      ];
      const stats = {
        qb1: { passing_yards: 3800, passing_tds: 35, passing_ints: 8 },
        rb1: { rushing_yards: 1500, rushing_tds: 18 },
        wr1: { receiving_yards: 1300, receiving_rec: 85, receiving_tds: 12 },
        fr1: { passing_yards: 2200, passing_tds: 18, passing_ints: 10 },
      };
      const r = A.resolveSeasonAwards({
        players, statsByPlayerId: stats,
        teamWinPctByTeamId: { TX: 0.8 },
      });
      a.ok(r.ballots.length >= 8);
      const qb = r.ballots.find((b) => b.award === "qb_award");
      a.equal(qb.winner.playerId, "qb1");
      const fr = r.ballots.find((b) => b.award === "fr_award");
      a.equal(fr.winner.playerId, "fr1");
    });
  });

  RUNNER.suite("AWARDS-1 all-teams", (t) => {
    t.test("resolveAllTeams picks per-position per-conf top + national", (a) => {
      const players = [
        { id: "secqb", name: "SEC QB", position: "QB", teamId: "ALA" },
        { id: "b10qb", name: "B10 QB", position: "QB", teamId: "OSU" },
        { id: "secrb", name: "SEC RB", position: "HB", teamId: "ALA" },
      ];
      const stats = {
        secqb: { passing_yards: 4000, passing_tds: 40, passing_ints: 5 },
        b10qb: { passing_yards: 3000, passing_tds: 25, passing_ints: 8 },
        secrb: { rushing_yards: 1600, rushing_tds: 18 },
      };
      const r = A.resolveAllTeams({
        players, statsByPlayerId: stats,
        teamWinPctByTeamId: { ALA: 0.85, OSU: 0.7 },
        conferenceByTeamId: { ALA: "sec", OSU: "big10" },
      });
      a.ok(r.allConference.sec);
      a.ok(r.allConference.big10);
      const aaQb = r.allAmerican.find((s) => s.position === "QB");
      a.equal(aaQb.playerId, "secqb", "national QB winner is the SEC QB with bigger stats");
    });
  });

  RUNNER.suite("AWARDS-1 record breaks", (t) => {
    t.test("first season sets every record", (a) => {
      const players = [
        { id: "qb1", name: "Air Show", position: "QB", teamId: "TX" },
        { id: "rb1", name: "Powerback", position: "HB", teamId: "TX" },
      ];
      const stats = {
        qb1: { passing_yards: 3800, passing_tds: 32 },
        rb1: { rushing_yards: 1500, rushing_tds: 18 },
      };
      const r = A.detectRecordBreaks({
        recordBook: {}, statsByPlayerId: stats, players, teamId: "TX", seasonYear: 2030,
      });
      a.ok(r.breaks.length >= 4, `expected ≥4 record breaks (got ${r.breaks.length})`);
      const passYds = r.breaks.find((b) => b.type === "passing_yards");
      a.ok(passYds);
      a.equal(passYds.holder, "Air Show");
      a.equal(passYds.value, 3800);
      a.equal(passYds.prev, 0);
    });
    t.test("only beats prior record, not just any value", (a) => {
      const book = { schoolSeason: { passing_yards: { value: 4000, holder: "Old Legend", year: 1995, label: "Single-Season Passing Yards" } } };
      const players = [{ id: "qb1", name: "Try Hard", position: "QB", teamId: "TX" }];
      const stats = { qb1: { passing_yards: 3500 } };
      const r = A.detectRecordBreaks({ recordBook: book, statsByPlayerId: stats, players, teamId: "TX", seasonYear: 2030 });
      const passYds = r.breaks.find((b) => b.type === "passing_yards");
      a.equal(passYds, undefined, "no break — didn't pass 4000");
    });
    t.test("applyRecordBreaks updates book", (a) => {
      const book = {};
      const breaks = [
        { scope: "school_season", type: "rushing_yards", label: "Single-Season Rushing Yards", holder: "Power", holderId: "rb1", value: 1800, year: 2030 },
      ];
      A.applyRecordBreaks(book, breaks);
      a.equal(book.schoolSeason.rushing_yards.value, 1800);
      a.equal(book.schoolSeason.rushing_yards.holder, "Power");
    });
  });

  RUNNER.suite("AWARDS-1 watch lists", (t) => {
    t.test("buildWatchListSnapshot tags stage by week", (a) => {
      const ballot = {
        award: "poty", label: "Player of the Year",
        candidates: [{ playerId: "x", playerName: "X", position: "QB", score: 92, teamId: "T", reasonCodes: [] }],
      };
      a.equal(A.buildWatchListSnapshot({ ballot, week: 1 }).stage, "preseason");
      a.equal(A.buildWatchListSnapshot({ ballot, week: 6 }).stage, "midseason");
      a.equal(A.buildWatchListSnapshot({ ballot, week: 12 }).stage, "late_season_finalists");
      a.equal(A.buildWatchListSnapshot({ ballot, week: 16 }).stage, "winner");
    });
  });
})(window);
