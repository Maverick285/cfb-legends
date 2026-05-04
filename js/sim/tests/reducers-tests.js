// PERSIST-2 v2 reducer tests: replay determinism for the 5 registered actions.
(function registerReducerTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const RP = global.CGM_REPLAY;
  const RED = global.CGM_REDUCERS;
  if (!RUNNER || !RP || !RED) return;

  RUNNER.suite("PERSIST-2 v2 reducer registration", (t) => {
    // PERSIST-2 (v1) tests call clearRegistry(); re-register before each test.
    function ensure() { if (RED.registerAll) RED.registerAll(); }
    t.test("all 5 reducers registered", (a) => {
      ensure();
      const list = RP.listRegistered();
      RED.registered.forEach((name) => a.ok(list.includes(name), `${name} registered`));
    });

    t.test("ADVANCE_WEEK rolls week + season correctly", (a) => {
      ensure();
      const out = RP.replay({
        initialState: { career: { week: 17, season: 1, advanceCount: 0 } },
        actions: [{ type: "ADVANCE_WEEK" }, { type: "ADVANCE_WEEK" }],
      });
      a.equal(out.finalState.career.season, 2, "rolled to season 2");
      a.equal(out.finalState.career.week, 2, "after rollover + 1 more advance");
    });

    t.test("APPLY_RECRUIT_ACTION accumulates per-prospect", (a) => {
      ensure();
      const out = RP.replay({
        initialState: {},
        actions: [
          { type: "APPLY_RECRUIT_ACTION", payload: { prospectId: "P1", action: "scout" } },
          { type: "APPLY_RECRUIT_ACTION", payload: { prospectId: "P1", action: "offer" } },
          { type: "APPLY_RECRUIT_ACTION", payload: { prospectId: "P2", action: "contact" } },
        ],
      });
      const slot = out.finalState.recruiting.actionsByProspect["P1"];
      a.equal(slot.scoutCount, 1);
      a.equal(slot.offerCount, 1);
      a.equal(slot.interestBonus, 14, "scout 2 + offer 12");
      a.equal(out.finalState.recruiting.actionsByProspect["P2"].contactCount, 1);
    });

    t.test("SET_PRACTICE_EMPHASIS overwrites + records history", (a) => {
      ensure();
      const out = RP.replay({
        initialState: {},
        actions: [
          { type: "SET_PRACTICE_EMPHASIS", payload: { emphasis: "passing" } },
          { type: "SET_PRACTICE_EMPHASIS", payload: { emphasis: "defense" } },
        ],
      });
      a.equal(out.finalState.practice.current, "defense");
      a.equal(out.finalState.practice.history.length, 2);
    });

    t.test("SIGN_TRANSFER bumps scholarship usage capped at 85", (a) => {
      ensure();
      const out = RP.replay({
        initialState: { scholarships: { used: 84, max: 85 } },
        actions: [
          { type: "SIGN_TRANSFER", payload: { playerId: "p1", scholarshipUsed: 1 } },
          { type: "SIGN_TRANSFER", payload: { playerId: "p2", scholarshipUsed: 1 } },
        ],
      });
      a.equal(out.finalState.scholarships.used, 85, "capped at 85");
      a.equal(out.finalState.transfersIn.length, 2);
    });

    t.test("HIRE_COACH records role + salary", (a) => {
      ensure();
      const out = RP.replay({
        initialState: {},
        actions: [{ type: "HIRE_COACH", payload: { candidateId: "c1", role: "OC", salaryK: 700, years: 3 } }],
      });
      a.equal(out.finalState.staff.current.OC, "c1");
      a.equal(out.finalState.staff.hires[0].salaryK, 700);
    });

    t.test("two replays of same action stream produce identical final hash", (a) => {
      ensure();
      const actions = [
        { type: "ADVANCE_WEEK" },
        { type: "APPLY_RECRUIT_ACTION", payload: { prospectId: "p1", action: "offer" } },
        { type: "SET_PRACTICE_EMPHASIS", payload: { emphasis: "passing" } },
        { type: "SIGN_TRANSFER", payload: { playerId: "x", scholarshipUsed: 1 } },
        { type: "HIRE_COACH", payload: { candidateId: "c1", role: "DC", salaryK: 800, years: 4 } },
        { type: "ADVANCE_WEEK" },
      ];
      const r1 = RP.replay({ initialState: {}, actions });
      const r2 = RP.replay({ initialState: {}, actions });
      a.equal(r1.finalHash, r2.finalHash, "deterministic replay");
      a.equal(r1.applied.length, 6);
    });

    t.test("verifyReplay confirms recorded session matches", (a) => {
      ensure();
      const actions = [
        { type: "ADVANCE_WEEK" },
        { type: "ADVANCE_WEEK" },
        { type: "APPLY_RECRUIT_ACTION", payload: { prospectId: "p1", action: "scout" } },
      ];
      const recording = RP.record({ seed: 1, initialState: {}, actions });
      const verify = RP.verifyReplay({ initialState: {}, actions, expectedHash: recording.finalStateHash });
      a.ok(verify.ok);
    });
  });
})(window);
