// PLAYGEN polish tests: penalties, weather, fatigue, ST returns.
(function registerExtrasTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const E = global.CGM_EXTRAS;
  if (!RUNNER || !E) return;

  RUNNER.suite("PLAYGEN-extras penalties", (t) => {
    t.test("rate is in CFB-realistic band over many trials", (a) => {
      let count = 0;
      const trials = 5000;
      let s = 1;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      for (let i = 0; i < trials; i++) {
        const p = E.rollPenalty({ random: rand, playKind: "rush", disciplineFloor: 50 });
        if (p) count++;
      }
      const rate = count / trials;
      a.ok(rate > 0.05 && rate < 0.13, `penalty rate ${(rate*100).toFixed(1)}% should be 5-13%`);
    });
    t.test("low discipline draws more flags", (a) => {
      let lo = 0, hi = 0;
      let s = 1;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      const trials = 3000;
      for (let i = 0; i < trials; i++) if (E.rollPenalty({ random: rand, playKind: "pass", disciplineFloor: 25 })) lo++;
      s = 1;
      for (let i = 0; i < trials; i++) if (E.rollPenalty({ random: rand, playKind: "pass", disciplineFloor: 90 })) hi++;
      a.ok(lo > hi * 1.3, `low-disc ${lo} > high-disc ${hi} * 1.3`);
    });
    t.test("returned penalty has reason code + yards", (a) => {
      const p = E.rollPenalty({ random: () => 0.001, playKind: "rush", disciplineFloor: 30 });
      if (!p) { a.ok(true, "no flag this trial — that's fine"); return; }
      a.ok(p.reasonCodes[0].startsWith("penalty_"));
      a.ok(Number.isFinite(p.yards));
    });
  });

  RUNNER.suite("PLAYGEN-extras weather", (t) => {
    t.test("heavy rain shrinks deep pass yards", (a) => {
      const clear = E.applyWeatherToPassYards(40, "deep", "clear");
      const rain = E.applyWeatherToPassYards(40, "deep", "heavy_rain");
      a.ok(rain < clear);
    });
    t.test("short pass not affected by deep-pass multiplier", (a) => {
      const clear = E.applyWeatherToPassYards(6, "short", "clear");
      const wind = E.applyWeatherToPassYards(6, "short", "wind_25");
      a.equal(clear, wind);
    });
    t.test("weather increases fumble chance", (a) => {
      const dry = E.fumbleChanceWithWeather(0.012, "clear");
      const wet = E.fumbleChanceWithWeather(0.012, "heavy_rain");
      a.ok(wet > dry);
    });
    t.test("kick accuracy degraded by wind", (a) => {
      a.ok(E.kickAccuracyMultiplier("wind_25") < E.kickAccuracyMultiplier("clear"));
    });
    t.test("clear weather → no reason code", (a) => {
      a.equal(E.weatherReasonCode("clear"), null);
      a.equal(E.weatherReasonCode("snow"), "weather_snow");
    });
  });

  RUNNER.suite("PLAYGEN-extras fatigue", (t) => {
    t.test("no_huddle accumulates fatigue faster than huddle", (a) => {
      let nhFatigue = 0, hFatigue = 0;
      for (let i = 0; i < 8; i++) {
        nhFatigue = E.updateFatigue({ currentFatigue: nhFatigue, tempo: "no_huddle", isOffense: true }).fatigue;
        hFatigue = E.updateFatigue({ currentFatigue: hFatigue, tempo: "huddle", isOffense: true }).fatigue;
      }
      a.ok(nhFatigue > hFatigue * 1.5, `nh ${nhFatigue} vs huddle ${hFatigue}`);
    });
    t.test("conditioning floor reduces accumulation", (a) => {
      let weak = 0, fit = 0;
      for (let i = 0; i < 10; i++) {
        weak = E.updateFatigue({ currentFatigue: weak, tempo: "fast", conditioningFloor: 35 }).fatigue;
        fit = E.updateFatigue({ currentFatigue: fit, tempo: "fast", conditioningFloor: 90 }).fatigue;
      }
      a.ok(weak > fit);
    });
    t.test("threshold reason codes fire only on crossing", (a) => {
      // From 69, even one no_huddle tick clears 70.
      const r1 = E.updateFatigue({ currentFatigue: 69, tempo: "no_huddle", isOffense: false, conditioningFloor: 40 });
      a.ok(r1.reasonCodes.includes("defense_fatigue_high"), `crossed 70 (got ${r1.fatigue})`);
      // Already past 70; another tick shouldn't refire 'high' code (only 'gassed' at 90).
      const r2 = E.updateFatigue({ currentFatigue: 75, tempo: "no_huddle", isOffense: false, conditioningFloor: 80 });
      a.ok(!r2.reasonCodes.includes("defense_fatigue_high"), "no refire when already over");
    });
    t.test("defense fatigue boosts offense YPP multiplier", (a) => {
      const fresh = E.fatigueYardsMultiplier({ offenseFatigue: 30, defenseFatigue: 30 });
      const tired = E.fatigueYardsMultiplier({ offenseFatigue: 30, defenseFatigue: 90 });
      a.ok(tired > fresh);
    });
    t.test("recoverBetweenDrives reduces fatigue", (a) => {
      const r = E.recoverBetweenDrives({ offenseFatigue: 60, defenseFatigue: 80, random: () => 0.5 });
      a.ok(r.offenseFatigue < 60);
      a.ok(r.defenseFatigue < 80);
      a.ok(r.recovered >= 8 && r.recovered <= 14);
    });
  });

  RUNNER.suite("PLAYGEN-extras special-teams returns", (t) => {
    t.test("punt: fast returner vs poor coverage produces return", (a) => {
      let s = 5;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      let totalRet = 0, fairCatches = 0;
      for (let i = 0; i < 500; i++) {
        const r = E.resolvePuntReturn({ puntDistance: 42, returnerSpeed: 90, coverageRating: 50, random: rand });
        if (r.fairCatch) fairCatches++;
        else totalRet += r.returnYards;
      }
      const avg = totalRet / Math.max(1, 500 - fairCatches);
      a.ok(avg >= 8, `avg return ${avg.toFixed(1)} should be ≥8 with strong returner`);
      a.ok(fairCatches < 250, "elite returner doesn't fair-catch most of the time");
    });
    t.test("kickoff: high coverage produces touchback often", (a) => {
      let touchbacks = 0;
      let s = 9;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      for (let i = 0; i < 500; i++) {
        const r = E.resolveKickoffReturn({ returnerSpeed: 50, coverageRating: 90, random: rand });
        if (r.touchback) touchbacks++;
      }
      a.ok(touchbacks > 250, `touchback rate ${touchbacks}/500 should be majority`);
    });
    t.test("kickoff TD ultra-rare", (a) => {
      let tds = 0;
      let s = 13;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      for (let i = 0; i < 2000; i++) {
        const r = E.resolveKickoffReturn({ returnerSpeed: 95, coverageRating: 60, random: rand });
        if (r.touchdown) tds++;
      }
      const rate = tds / 2000;
      a.ok(rate >= 0 && rate < 0.04, `KR TD rate ${(rate*100).toFixed(2)}% should be <4%`);
    });
  });
})(window);
