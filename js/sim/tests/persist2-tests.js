// PERSIST-2 tests: state-hash determinism + replay scaffold.
(function registerPersist2Tests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const SH = global.CGM_STATE_HASH;
  const RP = global.CGM_REPLAY;
  if (!RUNNER || !SH || !RP) return;

  RUNNER.suite("PERSIST-2 state-hash", (t) => {
    t.test("hash is stable for same content regardless of key order", (a) => {
      const x = { b: 2, a: 1, c: { y: 2, x: 1 } };
      const y = { c: { x: 1, y: 2 }, a: 1, b: 2 };
      a.equal(SH.hashState(x), SH.hashState(y), "key reorder produces same hash");
    });
    t.test("hash differs when content differs", (a) => {
      const x = { score: 24 };
      const y = { score: 25 };
      a.ok(SH.hashState(x) !== SH.hashState(y), "different content → different hash");
    });
    t.test("nested arrays + dates serialize stably", (a) => {
      const d = new Date("2026-05-03T12:00:00.000Z");
      const x = { games: [{ id: "g1", at: d }, { id: "g2", at: d }] };
      const y = { games: [{ at: d, id: "g1" }, { at: d, id: "g2" }] };
      a.equal(SH.hashState(x), SH.hashState(y), "nested key reorder + date stable");
    });
    t.test("compareStates returns equal=true on match, false with diff offset", (a) => {
      const cmpSame = SH.compareStates({ a: 1 }, { a: 1 });
      a.ok(cmpSame.equal, "equal states");
      a.equal(cmpSame.diff, null, "no diff when equal");
      const cmpDiff = SH.compareStates({ a: 1 }, { a: 2 });
      a.ok(!cmpDiff.equal, "different states");
      a.ok(cmpDiff.diff && Number.isFinite(cmpDiff.diff.offset), "diff carries offset");
    });
    t.test("functions/undefined/symbols are dropped", (a) => {
      const x = { a: 1, fn: () => 1, sym: Symbol("x"), u: undefined, n: null };
      const y = { a: 1, n: null };
      a.equal(SH.hashState(x), SH.hashState(y), "non-serializable keys do not affect hash");
    });
  });

  RUNNER.suite("PERSIST-2 replay", (t) => {
    t.test("registered reducer fires; unregistered action is skipped", (a) => {
      RP.clearRegistry();
      RP.registerReducer("ADD", (state, payload) => ({ ...state, sum: (state.sum || 0) + payload.amount }));
      const initial = { sum: 0 };
      const actions = [
        { type: "ADD", payload: { amount: 5 } },
        { type: "UNKNOWN", payload: {} },
        { type: "ADD", payload: { amount: 3 } },
      ];
      const result = RP.replay({ initialState: initial, actions });
      a.equal(result.finalState.sum, 8, "two ADDs accumulate to 8");
      a.equal(result.applied.length, 2);
      a.equal(result.skipped.length, 1, "one action skipped");
      a.equal(result.skipped[0].type, "UNKNOWN");
    });

    t.test("verifyReplay confirms replay matches expected hash", (a) => {
      RP.clearRegistry();
      RP.registerReducer("INC", (state) => ({ ...state, n: (state.n || 0) + 1 }));
      const initial = { n: 0 };
      const actions = Array.from({ length: 10 }, () => ({ type: "INC", payload: {} }));
      const recording = RP.record({ seed: 42, initialState: initial, actions });
      const verify = RP.verifyReplay({ initialState: initial, actions, expectedHash: recording.finalStateHash });
      a.ok(verify.ok, "replay matches recording hash");
      a.equal(verify.actual, recording.finalStateHash);
    });

    t.test("replay with mutating reducer still produces stable hash", (a) => {
      RP.clearRegistry();
      RP.registerReducer("PUSH", (state, payload) => {
        state.items = state.items || [];
        state.items.push(payload.item);
        return state;
      });
      const r1 = RP.replay({
        initialState: {},
        actions: [{ type: "PUSH", payload: { item: "a" } }, { type: "PUSH", payload: { item: "b" } }],
      });
      const r2 = RP.replay({
        initialState: {},
        actions: [{ type: "PUSH", payload: { item: "a" } }, { type: "PUSH", payload: { item: "b" } }],
      });
      a.equal(r1.finalHash, r2.finalHash, "two replays produce same hash");
    });

    t.test("hashTrail captures one entry per applied action plus initial", (a) => {
      RP.clearRegistry();
      RP.registerReducer("X", (s) => ({ ...s, c: (s.c || 0) + 1 }));
      const result = RP.replay({
        initialState: { c: 0 },
        actions: [{ type: "X" }, { type: "X" }, { type: "X" }],
      });
      a.equal(result.hashTrail.length, 4, "1 initial + 3 applied = 4 hashes");
      const unique = new Set(result.hashTrail);
      a.equal(unique.size, 4, "each step produces a distinct hash");
    });

    t.test("registerReducer rejects non-function", (a) => {
      try { RP.registerReducer("BAD", "not a fn"); a.ok(false, "should throw"); }
      catch (e) { a.ok(/function/.test(e.message), "rejects non-function"); }
    });
  });
})(window);
