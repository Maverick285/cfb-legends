// Tests for HARNESS-1 lite invariants.
(function registerInvariantsTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const INV = global.CGM_INVARIANTS;
  if (!RUNNER || !INV) return;

  function fakeState(overrides) {
    const base = {
      career: { programId: "p1" },
      programs: [{ id: "p1", shortName: "P1" }, { id: "p2", shortName: "P2" }],
      data: {
        playerProfiles: [
          { id: "x", position: "QB", name: "x" },
          { id: "y", position: "QB", name: "y" },
          { id: "z", position: "HB", name: "z" },
          { id: "w", position: "HB", name: "w" },
          { id: "wr1", position: "WR", name: "wr1" },
          { id: "wr2", position: "WR", name: "wr2" },
          { id: "wr3", position: "WR", name: "wr3" },
          { id: "lt1", position: "LT", name: "lt1" },
          { id: "lt2", position: "OT", name: "lt2" },
          { id: "og1", position: "OG", name: "og1" },
          { id: "og2", position: "OG", name: "og2" },
          { id: "c1",  position: "C",  name: "c1" },
        ],
        depthChart: { QB1: "x", RB1: "z", WR1: "wr1", LT1: "lt1", EDGE1: null, CB1: null },
        seasonState: { currentGameIndex: 3, overallRecord: { wins: 2, losses: 1 }, playedGames: [
          { outcome: "W" }, { outcome: "W" }, { outcome: "L" },
        ], cfpBracket: [], seasonStatBook: { gamesIncluded: 3 } },
        schedule: new Array(12),
        aiSchoolStandings: { p1: { wins: 0, losses: 0 }, p2: { wins: 0, losses: 0 } },
        eventLog: { events: [] },
      },
    };
    return Object.assign(base, overrides || {});
  }

  RUNNER.suite("HARNESS-1 invariants", (t) => {
    t.test("clean state passes most invariants", (a) => {
      const state = fakeState();
      const results = INV.runInvariants(state);
      const errors = results.filter((r) => r.severity === "error");
      a.equal(errors.length, 0, `no errors on clean state (got ${errors.map((e) => e.id).join(",")})`);
    });

    t.test("broken depth chart triggers error", (a) => {
      const state = fakeState();
      state.data.depthChart.QB1 = "ghost-id-not-on-roster";
      const results = INV.runInvariants(state);
      const found = results.find((r) => r.id === "depth_chart.slots_reference_valid_players" && r.severity === "error");
      a.ok(found, "broken depth chart caught");
    });

    t.test("missing program for career.programId triggers error", (a) => {
      const state = fakeState({ career: { programId: "ghost" } });
      const results = INV.runInvariants(state);
      const found = results.find((r) => r.id === "career.programId_resolves" && r.severity === "error");
      a.ok(found, "bad programId caught");
    });

    t.test("season record drift triggers warning", (a) => {
      const state = fakeState();
      state.data.seasonState.overallRecord = { wins: 5, losses: 0 };
      const results = INV.runInvariants(state);
      const found = results.find((r) => r.id === "season.record_matches_played_games" && r.severity === "warning");
      a.ok(found, "record drift caught");
    });

    t.test("summarize counts severities", (a) => {
      const state = fakeState();
      const results = INV.runInvariants(state);
      const sum = INV.summarize(results);
      a.equal(sum.total, results.length, "totals match");
      a.ok(sum.pass > 0, "some pass");
    });
  });
})(window);
