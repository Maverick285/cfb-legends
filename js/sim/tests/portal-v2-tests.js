// PORTAL-2 tests: risk formula, window logic, AI fit, retention meetings.
(function registerPortalV2Tests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const P = global.CGM_PORTAL_V2;
  if (!RUNNER || !P) return;

  RUNNER.suite("PORTAL-2 transfer-risk formula", (t) => {
    t.test("benchmark player with no problems → low risk", (a) => {
      const r = P.computeTransferRisk({}, {
        snapsPctVsExpected: 100, coachRelationship: 70, loyalty: 70,
        teamSuccessIndex: 70, developmentSatisfaction: 75, strongRelationships: 75,
      });
      a.ok(r.transferRisk < 25, `low risk (got ${r.transferRisk})`);
      a.equal(r.riskBand, "low");
    });
    t.test("benched + broken promise + crowded → concern or higher", (a) => {
      const r = P.computeTransferRisk({}, {
        snapsPctVsExpected: 20,
        roleMismatch: true,
        brokenPromises: 2,
        positionCrowding: 4,
        coachRelationship: 35,
      });
      a.ok(r.transferRisk >= 35, `concern+ risk (got ${r.transferRisk})`);
      a.ok(["concern","high","imminent"].includes(r.riskBand));
      a.ok(r.mainReasons.includes("playing_time_dissatisfied"));
      a.ok(r.mainReasons.includes("broken_promises_2"));
    });
    t.test("severe stack (low PT + many broken + scheme + ambition + external) → high+", (a) => {
      const r = P.computeTransferRisk({}, {
        snapsPctVsExpected: 10,
        roleMismatch: true,
        brokenPromises: 3,
        positionCrowding: 5,
        coachRelationship: 25,
        schemeChange: true,
        ambition: 90,
        externalSchoolInterest: 80,
      });
      a.ok(r.transferRisk >= 55, `high+ stack (got ${r.transferRisk})`);
      a.ok(["high","imminent"].includes(r.riskBand));
    });
    t.test("coaching change pushes high-risk to imminent", (a) => {
      const base = P.computeTransferRisk({}, { snapsPctVsExpected: 30, brokenPromises: 1 });
      const withChange = P.computeTransferRisk({}, { snapsPctVsExpected: 30, brokenPromises: 1, coachingChange: true });
      a.ok(withChange.transferRisk > base.transferRisk + 10);
      a.ok(withChange.allReasons.includes("coaching_change_pressure"));
    });
    t.test("loyalty + team success suppress risk", (a) => {
      const r = P.computeTransferRisk({}, {
        snapsPctVsExpected: 60,  // mild dissatisfaction
        loyalty: 95,
        teamSuccessIndex: 90,
        developmentSatisfaction: 85,
      });
      a.ok(r.transferRisk < 20);
      a.ok(r.allReasons.includes("high_loyalty"));
      a.ok(r.allReasons.includes("team_success"));
    });
    t.test("NIL shortfall vs expectations", (a) => {
      const big = P.computeTransferRisk({}, { nilExpected: 200, nilActual: 50 });
      const small = P.computeTransferRisk({}, { nilExpected: 200, nilActual: 180 });
      a.ok(big.transferRisk > small.transferRisk + 8);
      a.ok(big.allReasons.includes("nil_shortfall"));
    });
  });

  RUNNER.suite("PORTAL-2 windows + entry", (t) => {
    t.test("isInPortalWindow honors ranges", (a) => {
      const w = [{ openWeek: 16, closeWeek: 20 }, { openWeek: 32, closeWeek: 35 }];
      a.equal(P.isInPortalWindow(15, w), false);
      a.equal(P.isInPortalWindow(16, w), true);
      a.equal(P.isInPortalWindow(33, w), true);
      a.equal(P.isInPortalWindow(36, w), false);
    });
    t.test("entry refused outside window without exception", (a) => {
      const profile = { riskBand: "imminent", mainReasons: ["x"] };
      const r = P.decidePortalEntry({ riskProfile: profile, week: 10, windows: [{ openWeek: 16, closeWeek: 20 }], random: () => 0.0 });
      a.equal(r.entered, false);
      a.ok(r.reasonCodes.includes("outside_window"));
    });
    t.test("coaching-change exception allows entry outside window", (a) => {
      const profile = { riskBand: "imminent", mainReasons: ["coaching_change_pressure"] };
      const r = P.decidePortalEntry({
        riskProfile: profile, week: 10, windows: [{ openWeek: 16, closeWeek: 20 }],
        coachingChangeException: true, random: () => 0.01,
      });
      a.equal(r.entered, true);
    });
    t.test("imminent band has higher entry rate than watch", (a) => {
      const wins = [{ openWeek: 1, closeWeek: 99 }];
      let imminentEnters = 0, watchEnters = 0;
      const trials = 500;
      for (let i = 0; i < trials; i++) {
        const r1 = P.decidePortalEntry({ riskProfile: { riskBand: "imminent", mainReasons: [] }, week: 5, windows: wins, random: () => i / trials });
        const r2 = P.decidePortalEntry({ riskProfile: { riskBand: "watch", mainReasons: [] }, week: 5, windows: wins, random: () => i / trials });
        if (r1.entered) imminentEnters++;
        if (r2.entered) watchEnters++;
      }
      a.ok(imminentEnters > watchEnters * 5, `imminent ${imminentEnters} vs watch ${watchEnters}`);
    });
  });

  RUNNER.suite("PORTAL-2 AI fit + ranking", (t) => {
    t.test("school with high need + budget scores higher than indifferent school", (a) => {
      const player = { id: "p1", position: "QB", ovr: 85, attrs: {}, preferredScheme: "spread" };
      const big = { id: "elite", needsByPosition: { QB: 90 }, talentFloor: 78, nilBudgetK: 800, scheme: "spread" };
      const small = { id: "thin", needsByPosition: { QB: 10 }, talentFloor: 78, nilBudgetK: 100, scheme: "pro" };
      const r1 = P.scorePortalFit(player, big);
      const r2 = P.scorePortalFit(player, small);
      a.ok(r1.score > r2.score + 20);
      a.ok(r1.reasonCodes.includes("position_priority_need"));
    });
    t.test("rankDestinations sorts by score desc", (a) => {
      const player = { id: "p1", position: "WR", ovr: 80 };
      const schools = [
        { id: "a", needsByPosition: { WR: 30 }, talentFloor: 70, nilBudgetK: 200 },
        { id: "b", needsByPosition: { WR: 80 }, talentFloor: 75, nilBudgetK: 400 },
        { id: "c", needsByPosition: { WR: 0 },  talentFloor: 78, nilBudgetK: 100 },
      ];
      const ranked = P.rankDestinations(player, schools, 3);
      a.equal(ranked[0].schoolId, "b");
      a.ok(ranked[0].score >= ranked[1].score);
      a.ok(ranked[1].score >= ranked[2].score);
    });
    t.test("expectedNilForOvr scales with ovr", (a) => {
      a.ok(P.expectedNilForOvr(95) > P.expectedNilForOvr(85));
      a.ok(P.expectedNilForOvr(85) > P.expectedNilForOvr(75));
    });
  });

  RUNNER.suite("PORTAL-2 retention meetings", (t) => {
    t.test("addressing matched concerns reduces risk more than ignoring", (a) => {
      const profile = P.computeTransferRisk({}, {
        snapsPctVsExpected: 30, brokenPromises: 1, positionCrowding: 4,
      });
      const matched = P.runRetentionMeeting({
        riskProfile: profile,
        coachAttrs: { relationships: 80, motivation: 80 },
        addressing: ["playing_time_dissatisfied", "broken_promises_1", "position_crowded"],
        random: () => 0.5,
      });
      const ignored = P.runRetentionMeeting({
        riskProfile: profile,
        coachAttrs: { relationships: 80, motivation: 80 },
        addressing: ["academic_issue", "homesick"],
        random: () => 0.5,
      });
      a.ok(matched.delta < ignored.delta - 2, `matched delta ${matched.delta} < ignored ${ignored.delta} - 2`);
    });
    t.test("better coach skill = larger risk reduction", (a) => {
      const profile = { transferRisk: 60, allReasons: ["x"], mainReasons: [] };
      const great = P.runRetentionMeeting({
        riskProfile: profile,
        coachAttrs: { relationships: 95, motivation: 95 },
        addressing: ["x"], random: () => 0.5,
      });
      const poor = P.runRetentionMeeting({
        riskProfile: profile,
        coachAttrs: { relationships: 30, motivation: 30 },
        addressing: ["x"], random: () => 0.5,
      });
      a.ok(great.delta < poor.delta - 3);
    });
    t.test("kept promise reduces further; broken promise backfires", (a) => {
      const profile = { transferRisk: 50, allReasons: [], mainReasons: [] };
      const kept = P.runRetentionMeeting({
        riskProfile: profile, coachAttrs: { relationships: 70, motivation: 70 },
        addressing: [], promiseMade: true, random: () => 0.0,
      });
      const broken = P.runRetentionMeeting({
        riskProfile: profile, coachAttrs: { relationships: 70, motivation: 70 },
        addressing: [], promiseMade: true, random: () => 0.99,
      });
      a.ok(kept.delta < broken.delta);
      a.ok(kept.reasonCodes.includes("promise_landed"));
      a.ok(broken.reasonCodes.includes("promise_dismissed"));
    });
  });

  RUNNER.suite("PORTAL-2 departure effects", (t) => {
    t.test("starter departure marks depth hole + chemistry hit", (a) => {
      const r = P.computePortalDeparture({ id: "p", depthChartRank: 1, year: "JR" }, {});
      a.ok(r.markers.depthHole);
      a.ok(r.markers.classChemistryDelta <= -6);
      a.ok(r.reasonCodes.includes("starter_left"));
    });
    t.test("backup departure is small chemistry hit only", (a) => {
      const r = P.computePortalDeparture({ id: "p", depthChartRank: 4, year: "FR" }, {});
      a.ok(!r.markers.depthHole);
      a.ok(r.markers.classChemistryDelta >= -3);
    });
    t.test("captain departure adds extra chemistry + recruit hit", (a) => {
      const r = P.computePortalDeparture({ id: "p", depthChartRank: 1, year: "SR", captain: true }, {});
      a.ok(r.markers.classChemistryDelta <= -10);
      a.ok(r.markers.recruitMomentumDelta < 0);
      a.ok(r.reasonCodes.includes("captain_left"));
    });
  });
})(window);
