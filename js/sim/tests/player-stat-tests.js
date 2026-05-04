// Tests for STAT-4..7 player stat accumulator.
(function registerPlayerStatTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const PSA = global.CGM_PLAYER_STAT_ACCUMULATOR;
  const PE = global.CGM_PLAY_EVENT;
  if (!RUNNER || !PSA || !PE) return;

  function pe(opts) { return PE.createPlayEvent(opts); }

  RUNNER.suite("STAT-4..7 player accumulator", (t) => {
    t.test("credits a passing line", (a) => {
      const events = [
        pe({ id: "p1", playType: "pass", chargedPlayType: "passing_attempt_complete", outcome: "complete", yardsGained: 14,
          possessionTeamId: "H", players: { qb: "QB1", qbName: "Marcus", target: "WR1", targetName: "Devon" } }),
        pe({ id: "p2", playType: "pass", chargedPlayType: "passing_attempt_incomplete", outcome: "incomplete", yardsGained: 0,
          possessionTeamId: "H", players: { qb: "QB1", qbName: "Marcus", target: "WR1", targetName: "Devon" } }),
        pe({ id: "p3", playType: "pass", chargedPlayType: "passing_attempt_complete", outcome: "score", yardsGained: 32,
          possessionTeamId: "H", players: { qb: "QB1", qbName: "Marcus", target: "WR2", targetName: "Tyrek" }, scoring: { team: "H", points: 7 } }),
      ];
      const book = PSA.buildGamePlayerBook(events);
      a.equal(book.passers["QB1"].att, 3, "3 attempts");
      a.equal(book.passers["QB1"].comp, 2, "2 completions");
      a.equal(book.passers["QB1"].yards, 46, "passing yards");
      a.equal(book.passers["QB1"].td, 1, "1 TD");
      a.equal(book.receivers["WR1"].rec, 1, "WR1 1 catch");
      a.equal(book.receivers["WR1"].tgt, 2, "WR1 2 targets");
      a.equal(book.receivers["WR2"].td, 1, "WR2 1 TD");
    });

    t.test("credits a rushing line including TDs", (a) => {
      const events = [
        pe({ id: "p1", playType: "rush", chargedPlayType: "rushing_attempt", outcome: "gain", yardsGained: 7,
          possessionTeamId: "H", players: { rusher: "RB1", rusherName: "Calvin" } }),
        pe({ id: "p2", playType: "rush", chargedPlayType: "rushing_attempt", outcome: "no_gain", yardsGained: -1,
          possessionTeamId: "H", players: { rusher: "RB1" } }),
        pe({ id: "p3", playType: "rush", chargedPlayType: "rushing_attempt", outcome: "score", yardsGained: 22,
          possessionTeamId: "H", players: { rusher: "RB1" }, scoring: { team: "H", points: 7 } }),
      ];
      const book = PSA.buildGamePlayerBook(events);
      a.equal(book.rushers["RB1"].att, 3, "3 carries");
      a.equal(book.rushers["RB1"].yards, 28, "yards = 7 - 1 + 22");
      a.equal(book.rushers["RB1"].td, 1, "1 TD");
      a.equal(book.rushers["RB1"].longest, 22, "longest = 22");
    });

    t.test("credits sack to defender + QB sack line", (a) => {
      const events = [
        pe({ id: "p1", playType: "sack", chargedPlayType: "sack_college_rushing_loss", outcome: "loss", yardsGained: -7,
          possessionTeamId: "H", players: { qb: "QB1", sackedBy: "EDGE1" } }),
      ];
      const book = PSA.buildGamePlayerBook(events);
      a.equal(book.passers["QB1"].sacks, 1, "1 sack against QB");
      a.equal(book.passers["QB1"].sack_yards, 7, "7 sack yards");
      a.equal(book.defenders["EDGE1"].sacks, 1, "1 sack credit to EDGE1");
    });

    t.test("interception credits defender + QB int", (a) => {
      const events = [
        pe({ id: "p1", playType: "pass", chargedPlayType: "passing_attempt_interception", outcome: "turnover", yardsGained: 0,
          possessionTeamId: "H", players: { qb: "QB1", target: "WR1", intBy: "CB1" } }),
      ];
      const book = PSA.buildGamePlayerBook(events);
      a.equal(book.passers["QB1"].int, 1, "QB1 1 INT");
      a.equal(book.defenders["CB1"].ints, 1, "CB1 1 INT credit");
    });

    t.test("season accumulator rolls game lines", (a) => {
      const game1Events = [
        pe({ id: "g1p1", playType: "rush", chargedPlayType: "rushing_attempt", outcome: "gain", yardsGained: 5,
          possessionTeamId: "H", players: { rusher: "RB1", rusherName: "Calvin" } }),
      ];
      const game2Events = [
        pe({ id: "g2p1", playType: "rush", chargedPlayType: "rushing_attempt", outcome: "gain", yardsGained: 9,
          possessionTeamId: "H", players: { rusher: "RB1", rusherName: "Calvin" } }),
        pe({ id: "g2p2", playType: "rush", chargedPlayType: "rushing_attempt", outcome: "score", yardsGained: 18,
          possessionTeamId: "H", players: { rusher: "RB1" }, scoring: { team: "H", points: 7 } }),
      ];
      const season = { passers: {}, rushers: {}, receivers: {}, defenders: {}, gamesIncluded: 0 };
      PSA.accumulateSeasonBook(season, PSA.buildGamePlayerBook(game1Events));
      PSA.accumulateSeasonBook(season, PSA.buildGamePlayerBook(game2Events));
      a.equal(season.gamesIncluded, 2, "2 games");
      a.equal(season.rushers["RB1"].att, 3, "3 total carries");
      a.equal(season.rushers["RB1"].yards, 32, "32 yards");
      a.equal(season.rushers["RB1"].td, 1, "1 TD");
      a.equal(season.rushers["RB1"].longest, 18, "longest preserved");
    });

    t.test("passer rating computes per NCAA formula", (a) => {
      const line = { att: 30, comp: 22, yards: 320, td: 3, int: 1, sacks: 1, sack_yards: 7 };
      const rating = PSA.passerRating(line);
      // ((8.4*320) + (330*3) + (100*22) - (200*1)) / 30 = (2688 + 990 + 2200 - 200) / 30 = 5678/30 ≈ 189.3
      a.close(rating, 189.3, 0.5, "passer rating");
    });

    t.test("topByStat sorts descending and limits", (a) => {
      const book = {
        A: { att: 5, yards: 30 },
        B: { att: 8, yards: 70 },
        C: { att: 2, yards: 18 },
      };
      const top = PSA.topByStat(book, "yards", 2);
      a.equal(top.length, 2, "limit honored");
      a.equal(top[0].id, "B", "B has most yards");
      a.equal(top[1].id, "A", "A second");
    });
  });
})(window);
