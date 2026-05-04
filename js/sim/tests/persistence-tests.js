// Tests for PERSIST-1 event-log + action-log.
(function registerPersistTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const EL = global.CGM_EVENT_LOG;
  const AL = global.CGM_ACTION_LOG;
  if (!RUNNER || !EL || !AL) return;

  RUNNER.suite("PERSIST-1 event log", (t) => {
    t.test("createEvent enforces category + severity", (a) => {
      try { EL.createEvent({ id: "x", category: "bogus", severity: "minor" }); a.ok(false, "should throw"); }
      catch (e) { a.ok(/category/.test(e.message), "rejects bad category"); }
      try { EL.createEvent({ id: "x", category: "game_played", severity: "magnificent" }); a.ok(false, "should throw"); }
      catch (e) { a.ok(/severity/.test(e.message), "rejects bad severity"); }
    });

    t.test("appendEvent indexes by category + actor", (a) => {
      const log = EL.createLog();
      EL.appendEvent(log, EL.createEvent({ id: "e1", category: "game_played", severity: "minor", actorId: "T1", summary: "win" }));
      EL.appendEvent(log, EL.createEvent({ id: "e2", category: "game_played", severity: "minor", actorId: "T2", summary: "loss" }));
      EL.appendEvent(log, EL.createEvent({ id: "e3", category: "recruit_commit", severity: "notable", actorId: "T1", summary: "got him" }));
      a.equal(EL.eventsByCategory(log, "game_played").length, 2, "2 game events");
      a.equal(EL.eventsByActor(log, "T1").length, 2, "T1 has 2 events");
    });

    t.test("recentEvents returns most-recent N reversed", (a) => {
      const log = EL.createLog();
      for (let i = 0; i < 5; i += 1) EL.appendEvent(log, EL.createEvent({ id: `e${i}`, category: "game_played", severity: "minor", summary: `g${i}` }));
      const recent = EL.recentEvents(log, 3);
      a.equal(recent.length, 3);
      a.equal(recent[0].id, "e4", "most recent first");
    });

    t.test("rehydrateLog roundtrips", (a) => {
      const log = EL.createLog();
      EL.appendEvent(log, EL.createEvent({ id: "e1", category: "game_played", severity: "major", summary: "final" }));
      EL.appendEvent(log, EL.createEvent({ id: "e2", category: "milestone", severity: "historic", summary: "1000-yarder" }));
      const ser = EL.serializeLog(log);
      const back = EL.rehydrateLog(ser);
      a.equal(back.events.length, 2, "both events back");
      a.equal(back.events[0].id, "e1");
      a.equal(EL.severityCounts(back).historic, 1);
    });

    t.test("prune keeps major+historic and trims trivial first", (a) => {
      const log = EL.createLog();
      log.maxRetained = 4;
      ["minor", "minor", "minor", "major", "minor", "minor"].forEach((sev, i) => {
        EL.appendEvent(log, EL.createEvent({ id: `e${i}`, category: "game_played", severity: sev, summary: `s${i}` }));
      });
      const counts = EL.severityCounts(log);
      a.ok(counts.major >= 1, "major preserved");
      a.ok(log.events.length <= 5, "trimmed to roughly maxRetained");
    });
  });

  RUNNER.suite("PERSIST-1 action log", (t) => {
    t.test("createAction enforces type", (a) => {
      try { AL.createAction({ id: "x", type: "made_up" }); a.ok(false, "should throw"); }
      catch (e) { a.ok(/type/.test(e.message), "rejects bad type"); }
      const ok = AL.createAction({ id: "y", type: "practice_emphasis_set", summary: "set conditioning" });
      a.equal(ok.type, "practice_emphasis_set");
    });

    t.test("appendAction + actionsByType + actionsByActor", (a) => {
      const log = AL.createLog();
      AL.appendAction(log, AL.createAction({ id: "a1", type: "recruit_action", actorId: "U", summary: "scout" }));
      AL.appendAction(log, AL.createAction({ id: "a2", type: "recruit_action", actorId: "U", summary: "offer" }));
      AL.appendAction(log, AL.createAction({ id: "a3", type: "practice_emphasis_set", actorId: "U", summary: "schemes" }));
      a.equal(AL.actionsByType(log, "recruit_action").length, 2);
      a.equal(AL.actionsByActor(log, "U").length, 3);
    });

    t.test("rehydrate roundtrips", (a) => {
      const log = AL.createLog();
      AL.appendAction(log, AL.createAction({ id: "a1", type: "promise_made", summary: "no redshirt" }));
      const ser = AL.serializeLog(log);
      const back = AL.rehydrateLog(ser);
      a.equal(back.actions.length, 1);
      a.equal(back.actions[0].type, "promise_made");
    });
  });
})(window);
