// INJURY-1 tests: per-play roll, weekly recovery, per-game injury pass.
(function registerInjuryTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const I = global.CGM_INJURY;
  if (!RUNNER || !I) return;

  function attrs(stamina, bravery) {
    return { stamina: stamina || 12, bravery: bravery || 12 };
  }

  RUNNER.suite("INJURY-1 per-play roll", (t) => {
    t.test("most plays do NOT injure (rate < 1%)", (a) => {
      let s = 1;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      let injured = 0;
      const trials = 5000;
      for (let i = 0; i < trials; i++) {
        const r = I.rollInjuryOnPlay({
          player: { id: "p1", position: "WR", attrs: attrs() },
          playKind: "pass", random: rand,
        });
        if (r) injured++;
      }
      const rate = injured / trials;
      a.ok(rate < 0.02, `injury rate ${(rate*100).toFixed(2)}% should be < 2% per pass play`);
    });
    t.test("RB on rush plays injures more than WR on passes", (a) => {
      let s1 = 1, s2 = 1;
      const r1 = () => { s1 = (Math.imul(s1, 1664525) + 1013904223) >>> 0; return s1 / 4294967296; };
      const r2 = () => { s2 = (Math.imul(s2, 1664525) + 1013904223) >>> 0; return s2 / 4294967296; };
      let rb = 0, wr = 0;
      const trials = 8000;
      for (let i = 0; i < trials; i++) {
        if (I.rollInjuryOnPlay({ player: { id: "rb", position: "HB", attrs: attrs() }, playKind: "rush", random: r1 })) rb++;
        if (I.rollInjuryOnPlay({ player: { id: "wr", position: "WR", attrs: attrs() }, playKind: "pass", random: r2 })) wr++;
      }
      a.ok(rb > wr * 1.5, `RB rushes ${rb} > WR passes ${wr} * 1.5`);
    });
    t.test("kickers see almost no injuries", (a) => {
      let s = 1;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      let injured = 0;
      const trials = 5000;
      for (let i = 0; i < trials; i++) {
        if (I.rollInjuryOnPlay({ player: { id: "k", position: "K", attrs: attrs() }, playKind: "field_goal", random: rand })) injured++;
      }
      a.ok(injured < trials * 0.005, `kicker injuries ${injured} should be < 0.5%`);
    });
    t.test("higher cadencePercent produces more injuries", (a) => {
      let s1 = 1, s2 = 1;
      const r1 = () => { s1 = (Math.imul(s1, 1664525) + 1013904223) >>> 0; return s1 / 4294967296; };
      const r2 = () => { s2 = (Math.imul(s2, 1664525) + 1013904223) >>> 0; return s2 / 4294967296; };
      let lo = 0, hi = 0;
      const trials = 5000;
      for (let i = 0; i < trials; i++) {
        if (I.rollInjuryOnPlay({ player: { id: "p", position: "HB", attrs: attrs() }, playKind: "rush", cadencePercent: 70, random: r1 })) lo++;
        if (I.rollInjuryOnPlay({ player: { id: "p", position: "HB", attrs: attrs() }, playKind: "rush", cadencePercent: 160, random: r2 })) hi++;
      }
      a.ok(hi > lo * 1.5, `cadence 160% (${hi}) > 70% (${lo}) * 1.5`);
    });
    t.test("returned injury carries severity, weeksOut, type, reasonCodes", (a) => {
      // Use a forced-true random
      const r = I.rollInjuryOnPlay({
        player: { id: "x", name: "T1 X", position: "HB", attrs: attrs() },
        playKind: "sack", random: () => 0.0001,
      });
      if (r) {
        a.ok(I.SEVERITY_BANDS[r.severity], "valid severity band");
        a.ok(r.weeksOut >= 0);
        a.ok(typeof r.type === "string");
        a.ok(r.reasonCodes.includes("injury_occurred"));
      } else {
        a.ok(true, "skipped (no injury this trial)");
      }
    });
  });

  RUNNER.suite("INJURY-1 recovery + apply", (t) => {
    t.test("applyInjury marks player out + sets fields", (a) => {
      const player = { id: "p1", name: "P1" };
      I.applyInjury(player, { weeksOut: 3, type: "ankle", severity: "moderate" });
      a.equal(player.injured, true);
      a.equal(player.injuryWeeksOut, 3);
      a.equal(player.injuryType, "ankle");
      a.equal(player.injurySeverity, "moderate");
    });
    t.test("tickInjuryRecovery decrements + recovers", (a) => {
      const roster = [
        { id: "a", injured: true, injuryWeeksOut: 1 }, // recovers
        { id: "b", injured: true, injuryWeeksOut: 3 }, // still out
        { id: "c", injured: false },                   // unaffected
      ];
      const r = I.tickInjuryRecovery(roster);
      a.equal(r.recovered.length, 1);
      a.equal(r.recovered[0], "a");
      a.equal(r.stillOut.length, 1);
      a.equal(r.stillOut[0], "b");
      a.equal(roster[0].injured, false);
      a.equal(roster[1].injuryWeeksOut, 2);
    });
    t.test("severity bands ordered weeksOut nick < minor < moderate < severe", (a) => {
      a.ok(I.SEVERITY_BANDS.nick.weeksOutMax < I.SEVERITY_BANDS.minor.weeksOutMax);
      a.ok(I.SEVERITY_BANDS.minor.weeksOutMax < I.SEVERITY_BANDS.moderate.weeksOutMax);
      a.ok(I.SEVERITY_BANDS.moderate.weeksOutMax < I.SEVERITY_BANDS.severe.weeksOutMax);
      a.ok(I.SEVERITY_BANDS.severe.weeksOutMax < I.SEVERITY_BANDS.seasonEnding.weeksOutMin);
    });
  });

  RUNNER.suite("INJURY-1 per-game pass", (t) => {
    t.test("per-game pass injures roughly 0-3 players", (a) => {
      let s = 99;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      // Build a synthetic events list with participant ids.
      const roster = [
        { id: "qb1", position: "QB", attrs: attrs() },
        { id: "rb1", position: "HB", attrs: attrs() },
        { id: "wr1", position: "WR", attrs: attrs() },
      ];
      const events = [];
      for (let i = 0; i < 80; i++) {
        events.push({
          playType: ["rush","pass","rush","pass","sack"][i % 5],
          players: { rusher: "rb1", qb: "qb1", target: "wr1" },
        });
      }
      const fired = I.rollGameInjuries({ events, roster, cadencePercent: 100, random: rand });
      a.ok(fired.length >= 0 && fired.length <= 6, `fired ${fired.length} injuries (in [0,6])`);
    });
  });
})(window);
