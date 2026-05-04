// STAFF-1 tests: candidate pool, hot seat eval, offseason carousel.
(function registerCarouselTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const C = global.CGM_CAROUSEL;
  if (!RUNNER || !C) return;

  RUNNER.suite("STAFF-1 candidate generation", (t) => {
    t.test("generateCandidate returns role-shaped output", (a) => {
      const cand = C.generateCandidate({ seed: 1, role: "HC" });
      a.equal(cand.role, "HC");
      a.ok(cand.identity.fullName.length > 3, "has a name");
      a.ok(cand.attributes.motivation >= 1 && cand.attributes.motivation <= 99, "attrs in 1-99 range");
      a.ok(cand.contractDemand.salaryK >= 100, "HC salary > 100K");
    });
    t.test("OC gets tactical/playCalling boost over generic floor", (a) => {
      const oc = C.generateCandidate({ seed: 5, role: "OC", reputation: 80 });
      a.ok(oc.attributes.tactical >= 60, "OC tactical >= 60 with 80 rep");
      a.ok(oc.attributes.playCalling >= 60, "OC playCalling >= 60");
    });
    t.test("position coach gets positionTeaching boost", (a) => {
      const pc = C.generateCandidate({ seed: 7, role: "QB_COACH", reputation: 70 });
      a.ok(pc.attributes.positionTeaching >= 55, "QB coach positionTeaching boosted");
    });
    t.test("higher reputation produces higher salary demand", (a) => {
      const lo = C.generateCandidate({ seed: 9, role: "HC", reputation: 40 });
      const hi = C.generateCandidate({ seed: 9, role: "HC", reputation: 90 });
      a.ok(hi.contractDemand.salaryK > lo.contractDemand.salaryK * 1.5, "rep 90 demands much more than rep 40");
    });
    t.test("generateCandidatePool covers all roles", (a) => {
      const pool = C.generateCandidatePool({ seed: 100, perRole: 3 });
      a.equal(pool.byRole.HC.length, 3);
      a.equal(pool.byRole.OC.length, 3);
      a.equal(pool.byRole.RECRUITING_COORDINATOR.length, 3);
      a.ok(pool.all.length === C.ROLES.length * 3, "all = ROLES * perRole");
    });
    t.test("same seed produces same candidate (determinism)", (a) => {
      const c1 = C.generateCandidate({ seed: 42, role: "HC" });
      const c2 = C.generateCandidate({ seed: 42, role: "HC" });
      a.equal(c1.identity.fullName, c2.identity.fullName);
      a.equal(c1.attributes.motivation, c2.attributes.motivation);
      a.equal(c1.contractDemand.salaryK, c2.contractDemand.salaryK);
    });
  });

  RUNNER.suite("STAFF-1 hot-seat evaluation", (t) => {
    t.test("losing record produces hot-seat band", (a) => {
      const r = C.evaluateHotSeat({ wins: 2, losses: 9, expectedWins: 7, tenureYears: 5, boosterPressure: 70 });
      a.ok(r.score >= 50, `score ${r.score} should be hot seat (≥50)`);
      a.ok(r.reasonCodes.includes("losing_record_severe") || r.reasonCodes.find((c) => c.startsWith("win_shortfall_")), "has reason code");
    });
    t.test("overperforming HC gets buffer (low score)", (a) => {
      const r = C.evaluateHotSeat({ wins: 11, losses: 1, expectedWins: 7, tenureYears: 4, boosterPressure: 30 });
      a.ok(r.score < 30, `score ${r.score} should be secure`);
      a.equal(r.band, "secure");
    });
    t.test("first-2-year buffer protects new HC", (a) => {
      const losing5y = C.evaluateHotSeat({ wins: 4, losses: 8, expectedWins: 8, tenureYears: 5 });
      const losing1y = C.evaluateHotSeat({ wins: 4, losses: 8, expectedWins: 8, tenureYears: 1 });
      a.ok(losing1y.score < losing5y.score, "1-year tenure shields more than 5-year");
      a.ok(losing1y.reasonCodes.includes("early_tenure_buffer"));
    });
    t.test("scandal jumps the score", (a) => {
      const noScandal = C.evaluateHotSeat({ wins: 8, losses: 4, expectedWins: 7, tenureYears: 3 });
      const scandal = C.evaluateHotSeat({ wins: 8, losses: 4, expectedWins: 7, tenureYears: 3, recentScandal: true });
      a.ok(scandal.score > noScandal.score + 20, "scandal adds ≥20 to score");
      a.ok(scandal.reasonCodes.includes("recent_scandal"));
    });
  });

  RUNNER.suite("STAFF-1 offseason carousel", (t) => {
    t.test("blowout-bad school gets fired with high probability", (a) => {
      const pool = C.generateCandidatePool({ seed: 200, perRole: 30 }); // ample pool
      const state = {};
      const schools = Array.from({ length: 20 }, (_, i) => ({
        id: `school${i}`, name: `School ${i}`,
        hcId: `hc${i}`, hcTenureYears: 5,
        wins: 1, losses: 11, expectedWins: 8,
        boosterPressure: 90, prestige: 60,
      }));
      const result = C.runOffseasonCarousel({
        schools, candidatePool: pool, state,
        random: (() => { let s = 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; })(),
      });
      a.ok(result.fires.length >= 12, `at least 12 of 20 disasters get fired (got ${result.fires.length})`);
      a.equal(result.hires.length, result.fires.length, "every fire produces a hire when pool is ample");
    });
    t.test("secure HCs are not fired", (a) => {
      const pool = C.generateCandidatePool({ seed: 300, perRole: 5 });
      const schools = [{
        id: "secure", name: "Secure", hcId: "h1", hcTenureYears: 4,
        wins: 11, losses: 1, expectedWins: 8, boosterPressure: 25, prestige: 70,
      }];
      const result = C.runOffseasonCarousel({
        schools, candidatePool: pool, state: {},
        random: () => 0.5,
      });
      a.equal(result.fires.length, 0);
      a.equal(result.hires.length, 0);
    });
    t.test("hire reputation aligns with school prestige (statistical, 50 trials)", (a) => {
      // Single trial is noisy. Run 50 trials, compare averages.
      let eliteSum = 0, eliteN = 0, midSum = 0, midN = 0;
      for (let trial = 0; trial < 50; trial++) {
        const pool = C.generateCandidatePool({ seed: 400 + trial, perRole: 30 });
        const schools = [
          { id: "elite", hcId: "h1", hcTenureYears: 6, wins: 2, losses: 10, expectedWins: 9, boosterPressure: 95, prestige: 92 },
          { id: "midmajor", hcId: "h2", hcTenureYears: 6, wins: 2, losses: 10, expectedWins: 7, boosterPressure: 95, prestige: 38 },
        ];
        const result = C.runOffseasonCarousel({
          schools, candidatePool: pool, state: {}, random: () => 0.1,
        });
        const eliteHire = result.hires.find((h) => h.schoolId === "elite");
        const midHire = result.hires.find((h) => h.schoolId === "midmajor");
        if (eliteHire) { eliteSum += eliteHire.reputation; eliteN++; }
        if (midHire) { midSum += midHire.reputation; midN++; }
      }
      const eliteAvg = eliteSum / Math.max(1, eliteN);
      const midAvg = midSum / Math.max(1, midN);
      a.ok(eliteAvg > midAvg + 15, `elite avg rep ${eliteAvg.toFixed(1)} > mid avg rep ${midAvg.toFixed(1)} + 15`);
    });
    t.test("state.movements accumulates across cycles", (a) => {
      const pool = C.generateCandidatePool({ seed: 500, perRole: 8 });
      const state = {};
      const baseSchool = { hcTenureYears: 5, wins: 1, losses: 11, expectedWins: 8, boosterPressure: 90, prestige: 60 };
      C.runOffseasonCarousel({
        schools: [{ id: "s1", hcId: "h1", ...baseSchool }],
        candidatePool: pool, state, random: () => 0.1,
      });
      C.runOffseasonCarousel({
        schools: [{ id: "s2", hcId: "h2", ...baseSchool }],
        candidatePool: pool, state, random: () => 0.1,
      });
      a.ok(state.movements.length >= 4, `≥4 movements across 2 cycles (got ${state.movements.length})`);
      a.equal(state.year, new Date().getFullYear() + 2, "year advances per cycle");
    });
  });

  RUNNER.suite("STAFF-1 movement effects", (t) => {
    t.test("HC departure produces large risk bumps + reset markers", (a) => {
      const eff = C.computeStaffMovementEffects({ departingStaff: { role: "HC" }, incomingStaff: null });
      a.ok(eff.markers.recruitDecommitRiskBump >= 20, "recruit risk ≥20");
      a.ok(eff.markers.playerPortalRiskBump >= 10, "portal risk ≥10");
      a.ok(eff.markers.schemeContinuity <= 0.2, "no incoming → continuity ≤0.2");
      a.ok(eff.reasonCodes.includes("scheme_install_reset"));
    });
    t.test("position coach departure is minor", (a) => {
      const eff = C.computeStaffMovementEffects({ departingStaff: { role: "QB_COACH" }, incomingStaff: { role: "QB_COACH" } });
      a.ok(eff.markers.recruitDecommitRiskBump <= 6, "minor recruit risk");
      a.ok(eff.markers.stabilityIndexDelta >= -5, "minor stability hit");
    });
    t.test("incoming replacement reduces continuity hit", (a) => {
      const noReplace = C.computeStaffMovementEffects({ departingStaff: { role: "OC" } });
      const withReplace = C.computeStaffMovementEffects({ departingStaff: { role: "OC" }, incomingStaff: { role: "OC" } });
      a.ok(withReplace.markers.schemeContinuity > noReplace.markers.schemeContinuity, "replacement helps continuity");
    });
  });
})(window);
