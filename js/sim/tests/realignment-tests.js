// REALIGN-1 tests: pressure scoring, conference fit, full cycle.
(function registerRealignmentTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const R = global.CGM_REALIGNMENT;
  if (!RUNNER || !R) return;

  const CONFS = {
    sec:    { id: "sec",    name: "SEC",    short: "SEC",    tier: "P4" },
    big10:  { id: "big10",  name: "Big Ten",short: "Big Ten",tier: "P4" },
    aac:    { id: "aac",    name: "AAC",    short: "AAC",    tier: "G5" },
    mwc:    { id: "mwc",    name: "MWC",    short: "MWC",    tier: "G5" },
    mac:    { id: "mac",    name: "MAC",    short: "MAC",    tier: "G5" },
  };

  RUNNER.suite("REALIGN-1 pressure scoring", (t) => {
    t.test("low-tier high-prestige school feels strong pressure to move up", (a) => {
      const r = R.computeRealignmentPressure({
        program: { id: "boise", conference: "mwc" },
        conferenceMap: CONFS,
        prestige: 88,
        fanBaseScore: 70,
        recentWinPct: 0.75,
      });
      a.ok(r.pressure >= 50, `pressure ${r.pressure} should be ≥ 50`);
      a.ok(r.reasonCodes.includes("ambition_above_conference"));
      a.ok(r.reasonCodes.includes("recent_success"));
    });
    t.test("P4 school at par stays stable", (a) => {
      const r = R.computeRealignmentPressure({
        program: { id: "ala", conference: "sec" },
        conferenceMap: CONFS,
        prestige: 90, fanBaseScore: 90, recentWinPct: 0.78,
      });
      a.ok(r.pressure < 30, `P4 pressure ${r.pressure} should be < 30`);
      a.equal(r.band, "stable");
    });
    t.test("conference instability adds pressure", (a) => {
      const noInstability = R.computeRealignmentPressure({
        program: { id: "x", conference: "aac" },
        conferenceMap: CONFS, prestige: 70, fanBaseScore: 60, recentWinPct: 0.55, recentMovesInConf: 0,
      });
      const unstable = R.computeRealignmentPressure({
        program: { id: "x", conference: "aac" },
        conferenceMap: CONFS, prestige: 70, fanBaseScore: 60, recentWinPct: 0.55, recentMovesInConf: 4,
      });
      a.ok(unstable.pressure > noInstability.pressure);
      a.ok(unstable.reasonCodes.includes("conference_unstable"));
    });
    t.test("rivalries-at-risk reduces pressure", (a) => {
      const noRivals = R.computeRealignmentPressure({
        program: { id: "x", conference: "aac" }, conferenceMap: CONFS,
        prestige: 80, fanBaseScore: 70, recentWinPct: 0.65,
      });
      const withRivals = R.computeRealignmentPressure({
        program: { id: "x", conference: "aac" }, conferenceMap: CONFS,
        prestige: 80, fanBaseScore: 70, recentWinPct: 0.65, rivalriesAtRisk: 4,
      });
      a.ok(withRivals.pressure < noRivals.pressure);
    });
  });

  RUNNER.suite("REALIGN-1 conference fit", (t) => {
    t.test("strong P4 candidate accepted into P4 conference", (a) => {
      const fit = R.scoreConferenceFit({
        candidate: { id: "x", prestige: 80, fanBaseScore: 75, currentTier: "G5+", geoFit: 0.7 },
        targetConference: CONFS.sec,
        currentMembers: [
          { id: "m1", prestige: 80 }, { id: "m2", prestige: 78 }, { id: "m3", prestige: 82 },
        ],
      });
      a.ok(fit.score >= 25, `fit ${fit.score} should be strong`);
      a.equal(fit.fit, "strong");
    });
    t.test("full conference rejects all candidates", (a) => {
      const members = Array.from({ length: 18 }, (_, i) => ({ id: `m${i}`, prestige: 75 }));
      const fit = R.scoreConferenceFit({
        candidate: { id: "x", prestige: 90, fanBaseScore: 90, currentTier: "G5", geoFit: 0.6 },
        targetConference: CONFS.sec,
        currentMembers: members,
      });
      a.equal(fit.fit, "rejected_full");
      a.ok(fit.reasonCodes.includes("conference_full"));
    });
    t.test("low-prestige candidate borderline at best", (a) => {
      const fit = R.scoreConferenceFit({
        candidate: { id: "x", prestige: 50, fanBaseScore: 40, currentTier: "G5", geoFit: 0.5 },
        targetConference: CONFS.sec,
        currentMembers: [{ id: "m1", prestige: 85 }, { id: "m2", prestige: 88 }],
      });
      a.ok(fit.score < 25, `weak fit ${fit.score}`);
      a.ok(fit.reasonCodes.includes("below_conference_floor"));
    });
    t.test("tier mismatch (G5 to P4 skipping G5+) penalized", (a) => {
      const fit = R.scoreConferenceFit({
        candidate: { id: "x", prestige: 75, fanBaseScore: 65, currentTier: "G5", geoFit: 0.6 },
        targetConference: CONFS.sec,
        currentMembers: [{ id: "m1", prestige: 78 }, { id: "m2", prestige: 80 }],
      });
      a.ok(fit.reasonCodes.includes("tier_mismatch"));
    });
  });

  RUNNER.suite("REALIGN-1 full offseason cycle", (t) => {
    t.test("hot G5+ programs move up to P4 over a cycle", (a) => {
      let s = 1;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      const programs = [
        // Two strong G5+ candidates targeting P4
        { id: "boise", shortName: "Boise State", conference: "mwc", prestige: 86, fanBaseScore: 70 },
        { id: "memphis", shortName: "Memphis", conference: "aac", prestige: 84, fanBaseScore: 68 },
        // Filler
        ...Array.from({ length: 12 }, (_, i) => ({ id: `secf${i}`, conference: "sec", prestige: 80, fanBaseScore: 80 })),
        ...Array.from({ length: 14 }, (_, i) => ({ id: `b10f${i}`, conference: "big10", prestige: 78, fanBaseScore: 78 })),
        ...Array.from({ length: 10 }, (_, i) => ({ id: `aacf${i}`, conference: "aac", prestige: 60, fanBaseScore: 50 })),
        ...Array.from({ length: 10 }, (_, i) => ({ id: `mwcf${i}`, conference: "mwc", prestige: 58, fanBaseScore: 50 })),
      ];
      const result = R.runOffseasonRealignment({
        programs,
        conferences: CONFS,
        prevWinPctById: { boise: 0.85, memphis: 0.82 },
        random: rand,
        year: 2030,
      });
      a.ok(result.moves.length >= 1, `at least 1 move (got ${result.moves.length})`);
      a.ok(result.summary.candidatesEvaluated >= 1);
    });
    t.test("source conferences never drop below MIN_CONF_SIZE", (a) => {
      let s = 5;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      // Tiny G5 conference with only 8 members (= min size). A move should be blocked.
      const programs = [
        ...Array.from({ length: 8 }, (_, i) => ({ id: `g5_${i}`, shortName: `G5_${i}`, conference: "mac", prestige: 82, fanBaseScore: 65 })),
        // Big P4 with capacity
        ...Array.from({ length: 12 }, (_, i) => ({ id: `p4_${i}`, conference: "sec", prestige: 80, fanBaseScore: 80 })),
      ];
      const prevWinPctById = {};
      for (let i = 0; i < 8; i++) prevWinPctById[`g5_${i}`] = 0.8;
      const result = R.runOffseasonRealignment({
        programs, conferences: CONFS, prevWinPctById, random: rand, year: 2030,
      });
      // After the cycle, mac must still have ≥ MIN members.
      const macSurvivors = programs.filter((p) => p.conference === "mac").length - result.moves.filter((m) => m.fromConf === "mac").length;
      a.ok(macSurvivors >= R.MIN_CONF_SIZE, `mac survivors ${macSurvivors} ≥ ${R.MIN_CONF_SIZE}`);
    });
    t.test("applyMoves mutates conference + records realignmentHistory", (a) => {
      const programs = [
        { id: "x", conference: "mwc" },
        { id: "y", conference: "sec" },
      ];
      R.applyMoves(programs, [{ programId: "x", fromConf: "mwc", toConf: "big10", year: 2030 }]);
      a.equal(programs[0].conference, "big10");
      a.equal(programs[0].realignmentHistory.length, 1);
      a.equal(programs[0].realignmentHistory[0].year, 2030);
      a.equal(programs[1].conference, "sec", "untouched program unchanged");
    });
    t.test("moves capped at maxMovesPerCycle", (a) => {
      let s = 9;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      const programs = [];
      for (let i = 0; i < 30; i++) {
        programs.push({ id: `g5plus_${i}`, conference: "mwc", prestige: 88, fanBaseScore: 75 });
      }
      for (let i = 0; i < 12; i++) programs.push({ id: `p4_${i}`, conference: "sec", prestige: 80, fanBaseScore: 80 });
      const prevWinPctById = {};
      programs.forEach((p) => { prevWinPctById[p.id] = 0.8; });
      const result = R.runOffseasonRealignment({
        programs, conferences: CONFS, prevWinPctById, random: rand,
        maxMovesPerCycle: 3, year: 2030,
      });
      a.ok(result.moves.length <= 3, `moves ${result.moves.length} ≤ 3 cap`);
    });
  });
})(window);
