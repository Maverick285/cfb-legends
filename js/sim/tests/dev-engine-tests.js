// Tests for DEV-1 player development engine.
// Maps to spec §"Tests" in 31_PLAYER_DEVELOPMENT_PRACTICE_AND_TEAM_VIBE_ENGINE_SPEC.md.

(function registerDevEngineTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const DEV = global.CGM_DEV_ENGINE;
  if (!RUNNER || !DEV) return;

  function makeRng(seed) {
    let s = seed;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }

  function fakePlayer(over) {
    const attrs = {};
    [
      "throwing","catching","routeRunning","ballCarrying","passBlocking","runBlocking",
      "tackling","passRush","coverage","kicking","punting","longSnapping","technique","firstTouch",
      "decisions","anticipation","composure","concentration","determination","workRate",
      "leadership","aggression","bravery","flair","teamwork","positioning","vision","offTheBall",
      "pace","acceleration","agility","strength","stamina","balance","jumping",
    ].forEach((k) => { attrs[k] = Math.max(1, Math.min(20, Math.round(over / 5.5))); });
    return {
      id: `p-${over}-${Math.random().toString(36).slice(2,5)}`,
      name: "Test Player",
      position: "WR",
      year: "SO",
      ovr: over,
      pot: Math.min(99, over + 8),
      devCurve: "Steady Developer",
      attrs,
      hidden: { workEthic: 14, coachability: 14 },
    };
  }

  RUNNER.suite("DEV-1 development profile", (t) => {
    t.test("computeDevelopmentProfile fills required fields", (a) => {
      const p = fakePlayer(70);
      const prof = DEV.computeDevelopmentProfile(p);
      a.ok(prof, "profile returned");
      a.inRange(prof.breakoutChance, 0, 1, "breakoutChance in [0,1]");
      a.inRange(prof.regressionRisk, 0, 1, "regressionRisk in [0,1]");
      a.inRange(prof.physicalMaturity, 0, 100, "maturity in [0,100]");
      a.ok(prof.classWeights.physical + prof.classWeights.technical + prof.classWeights.iq + prof.classWeights.mental > 0.95, "class weights sum ~1");
    });

    t.test("Boom/Bust curve has higher breakout + regression than Steady", (a) => {
      const steady = fakePlayer(70); steady.devCurve = "Steady Developer";
      const boom = fakePlayer(70); boom.devCurve = "Boom/Bust";
      const sp = DEV.computeDevelopmentProfile(steady);
      const bp = DEV.computeDevelopmentProfile(boom);
      a.ok(bp.breakoutChance > sp.breakoutChance, "boom > steady breakout");
      a.ok(bp.regressionRisk > sp.regressionRisk, "boom > steady regression");
    });

    t.test("FR maturity weights physical higher than SR", (a) => {
      const fr = fakePlayer(70); fr.year = "FR";
      const sr = fakePlayer(70); sr.year = "SR";
      const fp = DEV.computeDevelopmentProfile(fr);
      const sp = DEV.computeDevelopmentProfile(sr);
      a.ok(fp.classWeights.physical > sp.classWeights.physical, "FR has more physical weight");
      a.ok(sr.year === "SR" && sp.classWeights.iq > fp.classWeights.iq, "SR has more IQ weight");
    });
  });

  RUNNER.suite("DEV-1 weekly tick", (t) => {
    t.test("returns deterministic shape", (a) => {
      const p = fakePlayer(72);
      const result = DEV.runWeeklyDevTick(p, { random: makeRng(11), moraleScore: 70, coachTeaching: 14, schoolSupport: 14 });
      a.ok(typeof result.gains === "object", "gains is object");
      a.ok(typeof result.regressions === "object", "regressions is object");
      a.ok(Array.isArray(result.events), "events is array");
      a.ok(Array.isArray(result.reasonCodes), "reasonCodes is array");
    });

    t.test("higher coach teaching produces more gains over many trials", (a) => {
      let lowGain = 0;
      let highGain = 0;
      for (let i = 0; i < 200; i += 1) {
        const lowP = fakePlayer(72);
        const highP = fakePlayer(72);
        const lowR = DEV.runWeeklyDevTick(lowP, { random: makeRng(100 + i), moraleScore: 65, coachTeaching: 8 });
        const highR = DEV.runWeeklyDevTick(highP, { random: makeRng(100 + i), moraleScore: 65, coachTeaching: 18 });
        lowGain += Object.values(lowR.gains).reduce((s, v) => s + v, 0);
        highGain += Object.values(highR.gains).reduce((s, v) => s + v, 0);
      }
      a.ok(highGain > lowGain * 1.4, `high coach > low coach (${highGain} vs ${lowGain})`);
    });

    t.test("breakout events fire on Boom/Bust prospects with high ceiling", (a) => {
      let breakouts = 0;
      for (let i = 0; i < 80; i += 1) {
        const p = fakePlayer(68);
        p.devCurve = "Boom/Bust";
        p.year = "SO";
        const result = DEV.runWeeklyDevTick(p, {
          random: makeRng(200 + i),
          moraleScore: 80,
          coachTeaching: 16,
          schoolSupport: 16,
          allowEvents: true,
          paceFactor: 1.3,
        });
        if (result.events.some((e) => e.type === "breakout")) breakouts += 1;
      }
      a.ok(breakouts > 0, `at least 1 breakout in 80 trials (got ${breakouts})`);
    });

    t.test("offseason tick produces larger gain budget than weekly", (a) => {
      let weeklySum = 0;
      let offseasonSum = 0;
      for (let i = 0; i < 50; i += 1) {
        const p1 = fakePlayer(72);
        const p2 = fakePlayer(72);
        const w = DEV.runWeeklyDevTick(p1, { random: makeRng(300 + i), moraleScore: 70, coachTeaching: 14 });
        const o = DEV.runOffseasonDevTick(p2, { random: makeRng(300 + i), moraleScore: 70, coachTeaching: 14 });
        weeklySum += Object.values(w.gains).reduce((s, v) => s + v, 0);
        offseasonSum += Object.values(o.gains).reduce((s, v) => s + v, 0);
      }
      a.ok(offseasonSum > weeklySum * 2, `offseason >> weekly (${offseasonSum} vs ${weeklySum})`);
    });

    t.test("low work ethic produces more regression than high", (a) => {
      let lowReg = 0;
      let highReg = 0;
      for (let i = 0; i < 200; i += 1) {
        const lowP = fakePlayer(75); lowP.hidden = { workEthic: 5, coachability: 10 }; lowP.year = "SR";
        const highP = fakePlayer(75); highP.hidden = { workEthic: 18, coachability: 14 }; highP.year = "SR";
        const lr = DEV.runWeeklyDevTick(lowP, { random: makeRng(400 + i), moraleScore: 60, coachTeaching: 12 });
        const hr = DEV.runWeeklyDevTick(highP, { random: makeRng(400 + i), moraleScore: 60, coachTeaching: 12 });
        lowReg += Object.keys(lr.regressions).length;
        highReg += Object.keys(hr.regressions).length;
      }
      a.ok(lowReg > highReg, `low workEthic regresses more (${lowReg} vs ${highReg})`);
    });
  });
})(window);
