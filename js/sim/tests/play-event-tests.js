// Tests for STAT-2 PlayEvent schema.
(function registerPlayEventTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const PE = global.CGM_PLAY_EVENT;
  if (!RUNNER || !PE) return;

  RUNNER.suite("STAT-2 PlayEvent factory", (t) => {
    t.test("creates a minimal valid event", (a) => {
      const e = PE.createPlayEvent({
        id: "p-1", playType: "rush", chargedPlayType: "rushing_attempt",
        outcome: "gain", yardsGained: 6, downBefore: 1, distanceBefore: 10,
        yardsToGoalBefore: 75, period: 1, possessionTeamId: "T1",
        defenseTeamId: "T2", homeTeamId: "T1", awayTeamId: "T2",
      });
      a.equal(e.playType, "rush", "playType set");
      a.equal(e.yardsGained, 6, "yardsGained set");
      a.equal(e.result.outcome, "gain", "result outcome derived from outcome shorthand");
    });

    t.test("rejects invalid playType", (a) => {
      try {
        PE.createPlayEvent({ id: "x", playType: "bogus", outcome: "gain" });
        a.ok(false, "should have thrown");
      } catch (err) {
        a.ok(String(err.message).includes("playType"), "errors on bad playType");
      }
    });

    t.test("rejects invalid chargedPlayType", (a) => {
      try {
        PE.createPlayEvent({ id: "x", playType: "pass", chargedPlayType: "made_up" });
        a.ok(false, "should have thrown");
      } catch (err) {
        a.ok(String(err.message).includes("chargedPlayType"), "errors on bad chargedPlayType");
      }
    });

    t.test("indexByDrive groups + sorts by drivePlayNumber", (a) => {
      const events = [
        PE.createPlayEvent({ id: "p3", playType: "rush", driveId: "D1", drivePlayNumber: 3 }),
        PE.createPlayEvent({ id: "p1", playType: "rush", driveId: "D1", drivePlayNumber: 1 }),
        PE.createPlayEvent({ id: "p2", playType: "pass", driveId: "D1", drivePlayNumber: 2 }),
        PE.createPlayEvent({ id: "p4", playType: "rush", driveId: "D2", drivePlayNumber: 1 }),
      ];
      const drives = PE.indexByDrive(events);
      const d1 = drives.get("D1").map((e) => e.id);
      a.equal(d1, ["p1", "p2", "p3"], "drive 1 sorted");
      a.equal(drives.get("D2").length, 1, "drive 2 indexed");
    });

    t.test("reasonCodes is always an array", (a) => {
      const e = PE.createPlayEvent({ id: "p-2", playType: "pass", outcome: "complete" });
      a.ok(Array.isArray(e.reasonCodes), "array even when omitted");
      a.equal(e.reasonCodes.length, 0, "empty by default");
    });
  });
})(window);
