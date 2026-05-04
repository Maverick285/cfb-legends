// Tests for REC-1, AI recruiting, PULSE-1, NIL-1, DRAFT-1.
// Combined to keep file count manageable.
(function registerM18Tests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const REC = global.CGM_RECRUITING_V2;
  const AIR = global.CGM_AI_RECRUITING;
  const PULSE = global.CGM_CAMPUS_PULSE;
  const NIL = global.CGM_NIL;
  const DRAFT = global.CGM_DRAFT;
  const EL = global.CGM_EVENT_LOG;
  if (!RUNNER) return;

  function makeRng(seed) { let s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  // ── REC-1 ────────────────────────────────────────────────────────────────
  if (REC) {
    RUNNER.suite("REC-1 recruiting v2 interest", (t) => {
      t.test("computeInterestScore yields 1-99 with reason codes", (a) => {
        const prospect = { preferences: { playingTime: 0.9, prestige: 0.6, nil: 0.7, distance: 0.4, scheme: 0.7, coach: 0.8, winning: 0.6 } };
        const program = { prestige: 90, nilTier: 8, recruitingTier: 8, schemeFit: 0.8, coachRep: 88, recentWinPct: 0.75, distanceFromProspect: 30, playingTimeOpen: true };
        const result = REC.computeInterestScore(prospect, program);
        a.inRange(result.interest, 1, 99, "score in range");
        a.ok(result.reasonCodes.length > 0, "emits reason codes for elite school");
      });

      t.test("applyInterestUpdate creates suitor and tracks delta", (a) => {
        const prospect = { preferences: { playingTime: 0.7, prestige: 0.6, nil: 0.5, distance: 0.5, scheme: 0.6, coach: 0.7, winning: 0.5 } };
        const ctx = { prestige: 80, nilTier: 6, schemeFit: 0.7, coachRep: 80, recentWinPct: 0.6, playingTimeOpen: true };
        const r1 = REC.applyInterestUpdate(prospect, "S1", "School 1", ctx);
        a.ok(r1.suitor.interest > 0, "suitor has interest");
        const board = REC.leaderboardForProspect(prospect);
        a.equal(board[0].schoolId, "S1", "S1 is leader");
      });

      t.test("maybeCommit requires HS_SR + threshold + clear leader", (a) => {
        const prospect = { classYear: "HS_SR", suitors: [
          { schoolId: "A", schoolName: "A", interest: 80 },
          { schoolId: "B", schoolName: "B", interest: 76 },
        ]};
        // close gap and threshold-pass: rarely commits
        let commits = 0;
        for (let i = 0; i < 200; i += 1) {
          const r = REC.maybeCommit({ ...prospect, suitors: prospect.suitors.slice() }, makeRng(100 + i));
          if (r.committed) commits += 1;
        }
        a.ok(commits < 60, `close gap should rarely commit (${commits}/200)`);
      });

      t.test("clear leader at high interest commits", (a) => {
        const prospect = { classYear: "HS_SR", suitors: [
          { schoolId: "A", schoolName: "A", interest: 90 },
          { schoolId: "B", schoolName: "B", interest: 60 },
        ]};
        let commits = 0;
        for (let i = 0; i < 200; i += 1) {
          const r = REC.maybeCommit({ ...prospect, suitors: prospect.suitors.slice() }, makeRng(200 + i));
          if (r.committed) commits += 1;
        }
        a.ok(commits > 80, `clear leader should commit often (${commits}/200)`);
      });

      t.test("rolloverProspectClasses graduates HS_SR + advances others", (a) => {
        const prospects = [
          { id: "p1", classYear: "HS_SR" },
          { id: "p2", classYear: "HS_JR" },
          { id: "p3", classYear: "HS_SO" },
        ];
        const result = REC.rolloverProspectClasses(prospects);
        a.equal(result.graduated.length, 1, "1 graduated");
        a.equal(result.survivors.length, 2, "2 survived");
        a.equal(prospects[1].classYear, "HS_SR", "HS_JR → HS_SR");
        a.equal(prospects[2].classYear, "HS_JR", "HS_SO → HS_JR");
      });
    });
  }

  // ── AI-Recruiting ────────────────────────────────────────────────────────
  if (AIR && REC) {
    RUNNER.suite("AI recruiting tick", (t) => {
      t.test("runWeeklyAiRecruitingTick mutates suitor lists + emits commits", (a) => {
        const programs = [];
        for (let i = 0; i < 30; i += 1) programs.push({ id: `p${i}`, shortName: `T${i}`, programRating: 70 + i, nilTier: 5, recruitingTier: 5 });
        const prospects = [];
        for (let i = 0; i < 12; i += 1) {
          prospects.push({
            id: `pr${i}`, name: `Prospect ${i}`, position: "WR", stars: "4-star", classYear: "HS_SR",
            commitmentStatus: "Open", trueRating: 75,
            preferences: { playingTime: 0.7, prestige: 0.6, nil: 0.5, distance: 0.5, scheme: 0.7, coach: 0.7, winning: 0.6 },
          });
        }
        const result = AIR.runWeeklyAiRecruitingTick({
          programs, prospects, random: makeRng(7), playerTeamId: "p0", weekIndex: 1,
        });
        a.ok(result.contacts > 10, `contacts placed (${result.contacts})`);
        a.ok(prospects.some((p) => Array.isArray(p.suitors) && p.suitors.length > 0), "at least one prospect has suitors");
      });
    });
  }

  // ── PULSE-1 ──────────────────────────────────────────────────────────────
  if (PULSE && EL) {
    RUNNER.suite("PULSE-1 campus pulse", (t) => {
      t.test("snapshot returns 8 components + temperature", (a) => {
        const log = EL.createLog();
        EL.appendEvent(log, EL.createEvent({ id: "e1", category: "game_played", severity: "major", summary: "win", reasonCodes: ["result_win", "rivalry_game"] }));
        const snap = PULSE.computePulseSnapshot(log, { currentWeek: 1 });
        a.equal(snap.components.length, 8, "8 components");
        a.ok(snap.temperature.label, "temperature labeled");
        a.inRange(snap.temperature.score, 1, 99, "temperature in range");
      });

      t.test("rivalry win lifts fanMood vs baseline", (a) => {
        const log = EL.createLog();
        EL.appendEvent(log, EL.createEvent({ id: "e1", category: "game_played", severity: "major", summary: "rivalry win", reasonCodes: ["result_win", "rivalry_game"] }));
        const snap = PULSE.computePulseSnapshot(log, { currentWeek: 1 });
        const fan = snap.components.find((c) => c.id === "fanMood");
        a.ok(fan.score > 60, `fanMood lifted (${fan.score})`);
      });

      t.test("loss tanks fanMood", (a) => {
        const log = EL.createLog();
        EL.appendEvent(log, EL.createEvent({ id: "e1", category: "game_played", severity: "major", summary: "ugly loss", reasonCodes: ["result_loss", "blowout"] }));
        const snap = PULSE.computePulseSnapshot(log, { currentWeek: 1 });
        const fan = snap.components.find((c) => c.id === "fanMood");
        a.ok(fan.score < 60, `fanMood drops (${fan.score})`);
      });

      t.test("trend arrows reflect prior snapshot", (a) => {
        const log = EL.createLog();
        const snap1 = PULSE.computePulseSnapshot(log, { currentWeek: 0 });
        EL.appendEvent(log, EL.createEvent({ id: "e1", category: "recruit_commit", severity: "major", summary: "commit", reasonCodes: ["commit_resolved"] }));
        const snap2 = PULSE.computePulseSnapshot(log, { currentWeek: 1, prevSnapshot: snap1 });
        const buzz = snap2.components.find((c) => c.id === "recruitBuzz");
        a.equal(buzz.trend, "↑", "recruitBuzz trend up");
      });
    });
  }

  // ── NIL-1 ────────────────────────────────────────────────────────────────
  if (NIL) {
    RUNNER.suite("NIL-1 booster pool", (t) => {
      t.test("startingPool scales with tier + fanBase", (a) => {
        const small = NIL.startingPool(3, "small");
        const massive = NIL.startingPool(9, "massive");
        a.ok(massive > small * 3, `massive tier 9 >> small tier 3 (${massive} vs ${small})`);
      });

      t.test("rechargeWeekly capped at capMillions", (a) => {
        const program = { nilTier: 7, fanBase: "large" };
        const state = NIL.emptyState(program);
        state.poolMillions = state.capMillions; // already full
        NIL.rechargeWeekly(state, program, 80);
        a.equal(state.poolMillions, state.capMillions, "stays at cap");
      });

      t.test("pledgeToProspect reduces pool + records pledge", (a) => {
        const program = { nilTier: 7, fanBase: "large" };
        const state = NIL.emptyState(program);
        const before = state.poolMillions;
        const result = NIL.pledgeToProspect(state, program, 1.5, { id: "p1", name: "Test" }, []);
        a.ok(result.ok, "pledge ok");
        a.equal(state.poolMillions, Math.round((before - 1.5) * 100) / 100, "pool reduced");
        a.equal(state.pledgesThisCycle.length, 1, "pledge recorded");
        a.ok(result.reasonCodes.includes("nil_collective_swing"), "reason code present");
      });

      t.test("pledgeToProspect refuses when insufficient", (a) => {
        const program = { nilTier: 4, fanBase: "small" };
        const state = NIL.emptyState(program);
        const result = NIL.pledgeToProspect(state, program, 999, { id: "p1", name: "Test" }, []);
        a.ok(!result.ok, "rejected");
        a.ok(result.reasonCodes.includes("insufficient_nil_pool"), "reason code present");
      });

      t.test("pledgeInterestBump scales with prospect.preferences.nil", (a) => {
        const moneyMotivated = { preferences: { nil: 0.9 } };
        const dev = { preferences: { nil: 0.2 } };
        a.ok(NIL.pledgeInterestBump(moneyMotivated, 1.0) > NIL.pledgeInterestBump(dev, 1.0), "money-motivated bumps more");
      });
    });
  }

  // ── DRAFT-1 ──────────────────────────────────────────────────────────────
  if (DRAFT) {
    RUNNER.suite("DRAFT-1 senior outflow", (t) => {
      t.test("seniors always depart, freshmen never", (a) => {
        const sr = { id: "s1", year: "SR", ovr: 80, hidden: { ambition: 14 } };
        const fr = { id: "f1", year: "FR", ovr: 80, hidden: { ambition: 14 } };
        let srLeaves = 0, frLeaves = 0;
        for (let i = 0; i < 100; i += 1) {
          if (DRAFT.shouldDepart(sr, makeRng(100 + i)).depart) srLeaves += 1;
          if (DRAFT.shouldDepart(fr, makeRng(200 + i)).depart) frLeaves += 1;
        }
        a.equal(srLeaves, 100, "all SR depart");
        a.equal(frLeaves, 0, "no FR depart");
      });

      t.test("juniors with high OVR + ambition declare early sometimes", (a) => {
        const jr = { id: "j1", year: "JR", ovr: 92, hidden: { ambition: 18 } };
        let leaves = 0;
        for (let i = 0; i < 200; i += 1) if (DRAFT.shouldDepart(jr, makeRng(300 + i)).depart) leaves += 1;
        a.ok(leaves > 30 && leaves < 180, `some early entries (${leaves}/200)`);
      });

      t.test("projectDraftTier returns correct tier per OVR", (a) => {
        const r1 = DRAFT.projectDraftTier({ ovr: 95, pot: 95 }, makeRng(1));
        const udfa = DRAFT.projectDraftTier({ ovr: 70, pot: 72 }, makeRng(1));
        a.equal(r1.round, 1, "95 OVR = R1");
        a.equal(udfa.label, "Priority UDFA", "70 OVR = priority UDFA");
      });

      t.test("processSeniorOutflow returns departing + returning + summary", (a) => {
        const roster = [
          { id: "p1", year: "SR", position: "QB", name: "QB1", ovr: 90, hidden: { ambition: 12 } },
          { id: "p2", year: "JR", position: "HB", name: "HB1", ovr: 75, hidden: { ambition: 10 } },
          { id: "p3", year: "FR", position: "WR", name: "WR1", ovr: 70, hidden: { ambition: 8 } },
        ];
        const result = DRAFT.processSeniorOutflow(roster, makeRng(50));
        a.ok(result.departing.length >= 1, "SR departed");
        a.ok(result.returning.length >= 1, "FR returned");
      });
    });
  }
})(window);
