// Tests for PLAYGEN modules (game-state, play-selector, play-resolver, drive-engine, game-engine).
(function registerPlaygenTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const STATE = global.CGM_GAME_STATE;
  const SEL = global.CGM_PLAY_SELECTOR;
  const RES = global.CGM_PLAY_RESOLVER;
  const DRIVE = global.CGM_DRIVE_ENGINE;
  const GAME = global.CGM_GAME_ENGINE;
  const REG = global.CGM_MATCHUP_REGISTRY;
  if (!RUNNER || !STATE || !SEL || !RES || !DRIVE || !GAME || !REG) return;

  function makeRng(seed) {
    let s = seed;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }
  function fakePlayer(over, position) {
    const baseAttr = Math.max(1, Math.min(20, Math.round(over / 5.5)));
    const attrs = {};
    [
      "throwing","catching","routeRunning","ballCarrying","passBlocking","runBlocking",
      "tackling","passRush","coverage","kicking","punting","longSnapping","technique","firstTouch",
      "decisions","anticipation","composure","concentration","determination","workRate",
      "leadership","aggression","bravery","flair","teamwork","positioning","vision","offTheBall",
      "pace","acceleration","agility","strength","stamina","balance","jumping",
    ].forEach((k) => { attrs[k] = baseAttr; });
    return { id: `p-${position}-${Math.random().toString(36).slice(2,7)}`, name: `${position} Player`, position, ovr: over, attrs };
  }
  function fakeRoster(rating) {
    const r = [];
    [["QB",2],["HB",3],["WR",4],["TE",2],["LT",2],["OT",2],["OG",4],["C",2],
     ["EDGE",2],["DE",2],["DT",3],["LB",4],["CB",4],["S",3],["K",1],["P",1]].forEach(([pos, n]) => {
      for (let i = 0; i < n; i += 1) r.push(fakePlayer(Math.max(50, Math.min(99, rating - 6 + Math.floor(Math.random() * 12))), pos));
    });
    return r;
  }

  RUNNER.suite("PLAYGEN-1 game state", (t) => {
    t.test("createGameState initializes correctly", (a) => {
      const s = STATE.createGameState({ gameId: "g1", homeTeamId: "H", awayTeamId: "A", kickReturnerTeamId: "A" });
      a.equal(s.possessionTeamId, "A", "away receives opening kick");
      a.equal(s.defenseTeamId, "H", "home defends first");
      a.equal(s.down, 1, "first down");
      a.equal(s.distance, 10, "10 to go");
      a.equal(s.score.H, 0, "home 0");
    });

    t.test("classifySituation maps down/distance/zone correctly", (a) => {
      const s = STATE.createGameState({ gameId: "g1", homeTeamId: "H", awayTeamId: "A" });
      s.down = 3; s.distance = 12;
      let sit = STATE.classifySituation(s);
      a.equal(sit.downDistanceBucket, "third_long", "3rd & 12 = third_long");
      s.down = 3; s.distance = 2;
      sit = STATE.classifySituation(s);
      a.equal(sit.downDistanceBucket, "third_short", "3rd & 2 = third_short");
      s.yardsToGoal = 8;
      sit = STATE.classifySituation(s);
      a.equal(sit.fieldZone, "red_zone", "yardsToGoal 8 = red_zone");
      s.yardsToGoal = 3;
      sit = STATE.classifySituation(s);
      a.equal(sit.fieldZone, "goal_line", "yardsToGoal 3 = goal_line");
    });

    t.test("applyPlayOutcome advances down + distance correctly", (a) => {
      const s = STATE.createGameState({ gameId: "g1", homeTeamId: "H", awayTeamId: "A" });
      STATE.applyPlayOutcome(s, { yardsGained: 4, clockSeconds: 30 });
      a.equal(s.down, 2, "2nd down after 4yd gain");
      a.equal(s.distance, 6, "6 to go");
      a.equal(s.yardsToGoal, 71, "75 - 4");
      STATE.applyPlayOutcome(s, { yardsGained: 7, clockSeconds: 28 });
      a.equal(s.down, 1, "first down after gaining 11 total");
      a.equal(s.distance, 10, "fresh set");
    });

    t.test("turnover on downs swaps possession", (a) => {
      const s = STATE.createGameState({ gameId: "g1", homeTeamId: "H", awayTeamId: "A", kickReturnerTeamId: "A" });
      s.down = 4; s.distance = 5;
      STATE.applyPlayOutcome(s, { yardsGained: 2, clockSeconds: 30 });
      a.equal(s.possessionTeamId, "H", "possession flipped to H");
    });
  });

  RUNNER.suite("PLAYGEN-2 play selector", (t) => {
    t.test("3rd & long biases pass", (a) => {
      const s = STATE.createGameState({ gameId: "g1", homeTeamId: "H", awayTeamId: "A" });
      s.down = 3; s.distance = 12;
      let passes = 0;
      for (let i = 0; i < 100; i += 1) {
        const sit = STATE.classifySituation(s);
        const call = SEL.selectOffensivePlay({ state: s, situation: sit, tendencies: { passRate: 50, runRate: 50, blitzRate: 30 }, random: makeRng(100 + i) });
        if (call.playFamily.includes("pass")) passes += 1;
      }
      a.ok(passes > 60, `3rd & long should pass often (${passes}/100)`);
    });

    t.test("4th down with FG range picks field goal", (a) => {
      const s = STATE.createGameState({ gameId: "g1", homeTeamId: "H", awayTeamId: "A" });
      s.down = 4; s.distance = 6; s.yardsToGoal = 28; // 45-yd FG
      const call = SEL.selectOffensivePlay({ state: s, situation: STATE.classifySituation(s), tendencies: { passRate: 50, runRate: 50, blitzRate: 30 }, random: makeRng(1) });
      a.equal(call.playFamily, "field_goal", "should attempt the FG");
    });

    t.test("4th down out of FG range punts", (a) => {
      const s = STATE.createGameState({ gameId: "g1", homeTeamId: "H", awayTeamId: "A" });
      s.down = 4; s.distance = 8; s.yardsToGoal = 60;
      const call = SEL.selectOffensivePlay({ state: s, situation: STATE.classifySituation(s), tendencies: { passRate: 50, runRate: 50, blitzRate: 30 }, random: makeRng(1) });
      a.equal(call.playFamily, "punt", "should punt");
    });
  });

  RUNNER.suite("PLAYGEN-5 game engine end-to-end", (t) => {
    t.test("runFullGame produces realistic per-game stats", (a) => {
      const home = fakeRoster(85);
      const away = fakeRoster(80);
      const result = GAME.runFullGame({
        gameId: "test-g1", random: makeRng(42),
        homeTeamId: "H", awayTeamId: "A",
        homeRoster: home, awayRoster: away,
        homeShortName: "Home", awayShortName: "Away",
        homeTendencies: { passRate: 50, runRate: 50, blitzRate: 30, pace: 65 },
        awayTendencies: { passRate: 50, runRate: 50, blitzRate: 30, pace: 65 },
        homeGamePlan: {}, awayGamePlan: {},
        playerTeamId: "H",
      });
      a.ok(result.events.length > 60, `at least 60 plays in a game (got ${result.events.length})`);
      a.ok(result.events.length < 220, `not absurdly many plays (got ${result.events.length})`);
      const totalScore = result.ourScore + result.oppScore;
      a.inRange(totalScore, 6, 130, `total score sane (${totalScore})`);
    });

    t.test("stronger team beats weaker team most of the time", (a) => {
      let strongWins = 0;
      for (let i = 0; i < 12; i += 1) {
        const strong = fakeRoster(92);
        const weak = fakeRoster(60);
        const result = GAME.runFullGame({
          gameId: `test-g${i}`, random: makeRng(500 + i),
          homeTeamId: "S", awayTeamId: "W",
          homeRoster: strong, awayRoster: weak,
          homeShortName: "Strong", awayShortName: "Weak",
          homeTendencies: { passRate: 50, runRate: 50, blitzRate: 30, pace: 65 },
          awayTendencies: { passRate: 50, runRate: 50, blitzRate: 30, pace: 65 },
          homeGamePlan: {}, awayGamePlan: {},
          playerTeamId: "S",
        });
        if (result.win) strongWins += 1;
      }
      a.ok(strongWins >= 9, `strong wins majority (${strongWins}/12)`);
    });

    t.test("PlayEvents carry participants for stats credit", (a) => {
      const home = fakeRoster(80);
      const away = fakeRoster(75);
      const result = GAME.runFullGame({
        gameId: "test-g3", random: makeRng(1234),
        homeTeamId: "H", awayTeamId: "A",
        homeRoster: home, awayRoster: away,
        homeShortName: "Home", awayShortName: "Away",
        homeTendencies: { passRate: 60, runRate: 40, blitzRate: 25, pace: 65 },
        awayTendencies: { passRate: 50, runRate: 50, blitzRate: 30, pace: 65 },
        homeGamePlan: {}, awayGamePlan: {},
        playerTeamId: "H",
      });
      const passEvents = result.events.filter((e) => e.chargedPlayType && e.chargedPlayType.startsWith("passing_attempt"));
      const haveParticipants = passEvents.filter((e) => e.players && e.players.qb);
      a.ok(haveParticipants.length > 5, `pass events carry QB participant (${haveParticipants.length})`);
    });
  });
})(window);
