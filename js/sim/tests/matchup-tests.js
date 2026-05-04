// Tests for MATCHUP-1 attribute registry + MATCHUP-2 matchup engine.
// Maps to spec §"Tests" in 29_ATTRIBUTE_TO_OUTCOME_AND_PLAYER_MATCHUP_SPEC.md.

(function registerMatchupTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const REG = global.CGM_MATCHUP_REGISTRY;
  const M = global.CGM_MATCHUP;
  if (!RUNNER || !REG || !M) return;

  function fakePlayer(over, position, attrOverrides) {
    const baseAttr = Math.max(1, Math.min(20, Math.round((over || 70) / 5.5)));
    const attrs = {};
    [
      "throwing","catching","routeRunning","ballCarrying","passBlocking","runBlocking",
      "tackling","passRush","coverage","kicking","punting","longSnapping","technique","firstTouch",
      "decisions","anticipation","composure","concentration","determination","workRate",
      "leadership","aggression","bravery","flair","teamwork","positioning","vision","offTheBall",
      "pace","acceleration","agility","strength","stamina","balance","jumping",
    ].forEach((k) => { attrs[k] = baseAttr; });
    Object.assign(attrs, attrOverrides || {});
    return { id: `p-${position}-${over}-${Math.random().toString(36).slice(2,6)}`, position, ovr: over, attrs };
  }

  function fakeRoster(programRating) {
    // 6 OL, 4 DL/EDGE, 4 LB, 6 DB, 4 WR, 2 RB, 2 QB, 2 TE — enough to populate every unit
    const r = programRating || 75;
    const roster = [];
    [["QB", 2], ["HB", 2], ["WR", 4], ["TE", 2], ["LT", 2], ["OT", 2], ["OG", 4], ["C", 2],
     ["EDGE", 2], ["DE", 2], ["DT", 3], ["LB", 4], ["CB", 4], ["S", 3], ["K", 1], ["P", 1]].forEach(([pos, n]) => {
      for (let i = 0; i < n; i += 1) {
        const ovr = Math.max(50, Math.min(99, r - 6 + Math.floor(Math.random() * 12)));
        roster.push(fakePlayer(ovr, pos));
      }
    });
    return roster;
  }

  RUNNER.suite("MATCHUP-1 attribute registry", (t) => {
    t.test("unitRatingFromAttrAvg lifts elite tiers", (a) => {
      a.ok(REG.unitRatingFromAttrAvg(17) > REG.unitRatingFromAttrAvg(13) + 15, "elite gap > steady gap");
      a.inRange(REG.unitRatingFromAttrAvg(10), 30, 60, "average attr → middling unit rating");
      a.inRange(REG.unitRatingFromAttrAvg(18), 85, 99, "elite attr → elite unit rating");
    });

    t.test("computeUnitRating returns deterministic shape", (a) => {
      const team = REG.computeTeamUnits(fakeRoster(80), "test-team");
      a.ok(team.units.qb_passing && Number.isFinite(team.units.qb_passing.rating), "qb_passing rating");
      a.ok(team.units.ol_pass_block && Number.isFinite(team.units.ol_pass_block.rating), "ol rating");
      a.ok(team.units.cb_coverage && Number.isFinite(team.units.cb_coverage.rating), "cb rating");
    });

    t.test("higher-rated roster produces higher unit ratings", (a) => {
      const elite = REG.computeTeamUnits(fakeRoster(92), "elite");
      const weak = REG.computeTeamUnits(fakeRoster(58), "weak");
      a.ok(elite.units.qb_passing.rating > weak.units.qb_passing.rating, "elite QB > weak QB");
      a.ok(elite.units.ol_pass_block.rating > weak.units.ol_pass_block.rating, "elite OL > weak OL");
      a.ok(elite.units.cb_coverage.rating > weak.units.cb_coverage.rating, "elite DB > weak DB");
    });

    t.test("teamStrengths picks top N units", (a) => {
      const team = REG.computeTeamUnits(fakeRoster(85), "team");
      const strengths = REG.teamStrengths(team, 3);
      a.equal(strengths.length, 3, "returns 3 strengths");
      a.ok(strengths[0].rating >= strengths[1].rating, "sorted DESC");
    });
  });

  RUNNER.suite("MATCHUP-2 matchup engine", (t) => {
    t.test("resolveMatchup returns spec-shaped output", (a) => {
      const fixedRng = makeRng(42);
      const result = M.resolveMatchup({
        offense: { rating: 85, depth: 80 },
        defense: { rating: 60, depth: 55 },
        random: fixedRng,
        winCode: "ol_run_block_win",
        loseCode: "dl_run_stop_win",
      });
      a.inRange(result.advantage, -100, 100, "advantage in [-100, 100]");
      a.inRange(result.confidence, 0, 1, "confidence in [0, 1]");
      a.ok(Array.isArray(result.reasonCodes), "reasonCodes is array");
    });

    t.test("same seed produces same output (determinism)", (a) => {
      const aOut = M.resolveMatchup({ offense: { rating: 80, depth: 70 }, defense: { rating: 70, depth: 60 }, random: makeRng(7) });
      const bOut = M.resolveMatchup({ offense: { rating: 80, depth: 70 }, defense: { rating: 70, depth: 60 }, random: makeRng(7) });
      a.equal(aOut.advantage, bOut.advantage, "deterministic advantage");
    });

    t.test("strong offense vs weak defense favors offense over many trials", (a) => {
      const rng = makeRng(123);
      let offWins = 0;
      for (let i = 0; i < 200; i += 1) {
        const r = M.resolveMatchup({ offense: { rating: 88, depth: 80 }, defense: { rating: 55, depth: 50 }, random: rng });
        if (r.advantage > 0) offWins += 1;
      }
      a.ok(offWins >= 170, `offense wins majority (${offWins}/200)`);
    });

    t.test("fatigue penalty appears in reason codes when high", (a) => {
      const result = M.resolveMatchup({
        offense: { rating: 70, depth: 60 }, defense: { rating: 80, depth: 70 },
        fatigueOffense: 25, random: makeRng(9),
      });
      a.ok(result.reasonCodes.indexOf("fatigue_created_pressure") >= 0, "fatigue reason present");
    });

    t.test("resolvePassMatchup composites three sub-resolvers and emits reason codes", (a) => {
      const off = REG.computeTeamUnits(fakeRoster(90), "off");
      const def = REG.computeTeamUnits(fakeRoster(60), "def");
      const result = M.resolvePassMatchup(off, def, { random: makeRng(101) });
      a.inRange(result.advantage, -100, 100, "composite in range");
      a.ok(result.breakdown.protection, "exposes protection breakdown");
      a.ok(result.breakdown.separation, "exposes separation breakdown");
      a.ok(result.breakdown.decision, "exposes decision breakdown");
    });

    t.test("projectPlayOutcome scales yards by advantage", (a) => {
      const rng = makeRng(55);
      const positive = M.projectPlayOutcome({ advantage: 30 }, "pass", rng);
      const negative = M.projectPlayOutcome({ advantage: -30 }, "pass", rng);
      a.ok(positive.yards > negative.yards, "positive advantage → more yards");
    });
  });

  // tiny deterministic RNG for tests
  function makeRng(seed) {
    let s = seed;
    return function () {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }
})(window);
