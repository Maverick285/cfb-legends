// Tests for AI-SCHOOL-1.
(function registerAiSchoolTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const AI = global.CGM_AI_SCHOOL;
  if (!RUNNER || !AI) return;

  function makeRng(seed) {
    let s = seed;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }
  function fakePrograms(count, baseRating) {
    const arr = [];
    for (let i = 0; i < count; i += 1) {
      arr.push({
        id: `p${i}`, shortName: `Team ${i}`, name: `Team ${i}`,
        programRating: Math.max(50, Math.min(99, baseRating + (i % 30) - 15)),
        conference: i < count / 2 ? "confA" : "confB",
      });
    }
    return arr;
  }

  RUNNER.suite("AI-SCHOOL-1", (t) => {
    t.test("initStandings populates every program", (a) => {
      const progs = fakePrograms(20, 75);
      const s = AI.initStandings(progs);
      a.equal(Object.keys(s).length, 20, "20 entries");
      a.equal(s.p0.wins, 0, "starts 0-0");
      a.equal(s.p0.shortName, "Team 0");
    });

    t.test("simulateAiGame: stronger team wins more often", (a) => {
      const teamA = { ratingNow: 90, shortName: "A" };
      const teamB = { ratingNow: 60, shortName: "B" };
      let aWins = 0;
      const rng = makeRng(7);
      for (let i = 0; i < 200; i += 1) {
        const r = AI.simulateAiGame({ teamA, teamB, random: rng, volatility: 1, neutralSite: true });
        if (r.aPoints > r.bPoints) aWins += 1;
      }
      a.ok(aWins > 160, `90-rated beats 60-rated often (${aWins}/200)`);
    });

    t.test("runWeeklyAiSchoolTick produces ~half the teams' games (paired)", (a) => {
      const progs = fakePrograms(20, 75);
      const standings = AI.initStandings(progs);
      const events = AI.runWeeklyAiSchoolTick({
        programs: progs, standings, random: makeRng(11),
        playerTeamId: "p0", volatility: 1, weekIndex: 1,
      });
      a.ok(events.length >= 8 && events.length <= 10, `~9 games for 19 teams (${events.length})`);
      const totalWinsLosses = Object.values(standings).reduce((s, r) => s + r.wins + r.losses, 0);
      a.ok(totalWinsLosses === events.length * 2, "wins+losses = 2 per game");
    });

    t.test("ticking many weeks produces reasonable W/L spread", (a) => {
      const progs = fakePrograms(40, 75);
      const standings = AI.initStandings(progs);
      for (let week = 0; week < 12; week += 1) {
        AI.runWeeklyAiSchoolTick({ programs: progs, standings, random: makeRng(100 + week),
          playerTeamId: "p0", volatility: 1, weekIndex: week });
      }
      const top = AI.topTeams(standings, 5);
      const totalGames = Object.values(standings).reduce((s, r) => s + r.wins + r.losses, 0);
      a.ok(totalGames >= 100, `enough games played (${totalGames})`);
      a.ok(top.length === 5, "top 5 returned");
      a.ok(top[0].wins >= 0 && top[0].wins <= 14, "top team has plausible wins");
    });

    t.test("resetSeasonRecords zeros W/L but preserves rating drift", (a) => {
      const progs = fakePrograms(10, 75);
      const standings = AI.initStandings(progs);
      AI.runWeeklyAiSchoolTick({ programs: progs, standings, random: makeRng(33),
        playerTeamId: "p0", volatility: 1, weekIndex: 1 });
      const ratingBefore = standings.p1.ratingNow;
      AI.resetSeasonRecords(standings);
      a.equal(standings.p1.wins, 0, "wins zeroed");
      a.equal(standings.p1.losses, 0, "losses zeroed");
      a.equal(standings.p1.ratingNow, ratingBefore, "rating preserved");
    });
  });
})(window);
