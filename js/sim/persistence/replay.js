// PERSIST-2: Action replay scaffold.
// Spec: ai-pack/CFB_FM_REMAINING_SYSTEM_SPECS/41_DATABASE_SAVE_MIGRATION_AND_EVENT_LOG_SPEC.md §"Replay"
//
// Records and replays a deterministic action stream so we can:
//   1. reconstruct any prior session given (seed, initialState, actions)
//   2. assert that replay produces a state with the same hash as the
//      authoritative recorded state
//
// This is a **scaffold**, not a wholesale rewrite of every action handler in
// app.js. Existing handlers are pushed through `dispatch(actionType, payload,
// state)` which looks up a registered reducer. Handlers can be registered
// incrementally — until a handler is registered, that action is treated as
// an opaque "external mutation" and the replay is non-deterministic for it,
// which is flagged in the result.
//
// Pure helpers; no DOM, no globals beyond global.CGM_REPLAY.

(function initReplay(global) {
  const reducers = {};

  /**
   * Register a pure reducer.
   * @param {string} actionType
   * @param {(state, payload) => state} reducer  must return new state (or
   *   mutate in place + return; we hash both ways)
   */
  function registerReducer(actionType, reducer) {
    if (typeof reducer !== "function") throw new Error("registerReducer: reducer must be a function");
    reducers[actionType] = reducer;
  }

  function listRegistered() {
    return Object.keys(reducers).sort();
  }

  function clearRegistry() {
    Object.keys(reducers).forEach((k) => delete reducers[k]);
  }

  /**
   * Apply a single action to state. Returns { state, ok, missingReducer }.
   */
  function applyAction(state, action) {
    const reducer = reducers[action.type];
    if (!reducer) return { state, ok: false, missingReducer: true };
    const next = reducer(state, action.payload);
    return { state: next === undefined ? state : next, ok: true, missingReducer: false };
  }

  /**
   * Replay a list of actions starting from initialState.
   * @param {object} args { initialState, actions }
   * @returns {object} { finalState, applied, skipped, hashTrail }
   *   - applied: array of action types applied
   *   - skipped: array of { index, type } for actions with no reducer
   *   - hashTrail: array of state hashes after each applied action
   */
  function replay(args) {
    const SH = global.CGM_STATE_HASH;
    if (!SH) throw new Error("replay: CGM_STATE_HASH not loaded");
    const initialState = args.initialState;
    const actions = args.actions || [];
    let state = clone(initialState);
    const applied = [];
    const skipped = [];
    const hashTrail = [SH.hashState(state)];

    actions.forEach((action, i) => {
      const result = applyAction(state, action);
      if (result.missingReducer) {
        skipped.push({ index: i, type: action.type });
      } else {
        applied.push(action.type);
        state = result.state;
        hashTrail.push(SH.hashState(state));
      }
    });

    return {
      finalState: state,
      finalHash: hashTrail[hashTrail.length - 1],
      applied,
      skipped,
      hashTrail,
    };
  }

  /**
   * Replay actions and verify the final state matches an expected hash.
   * @returns {object} { ok, expected, actual, diff?, applied, skipped }
   */
  function verifyReplay(args) {
    const SH = global.CGM_STATE_HASH;
    const result = replay(args);
    const ok = result.finalHash === args.expectedHash;
    return {
      ok,
      expected: args.expectedHash,
      actual: result.finalHash,
      diff: ok ? null : { hashTrail: result.hashTrail },
      applied: result.applied,
      skipped: result.skipped,
    };
  }

  /**
   * Build a Recording = a self-contained payload that can be replayed later.
   * @param {object} args { seed, initialState, actions }
   * @returns {object} recording with finalHash baked in
   */
  function record(args) {
    const SH = global.CGM_STATE_HASH;
    if (!SH) throw new Error("record: CGM_STATE_HASH not loaded");
    const result = replay({ initialState: args.initialState, actions: args.actions });
    return {
      version: 1,
      seed: args.seed || null,
      initialStateHash: SH.hashState(args.initialState),
      initialState: clone(args.initialState),
      actions: clone(args.actions),
      finalStateHash: result.finalHash,
      applied: result.applied,
      skipped: result.skipped,
    };
  }

  function clone(v) {
    return v === undefined ? undefined : JSON.parse(JSON.stringify(v));
  }

  global.CGM_REPLAY = {
    registerReducer,
    listRegistered,
    clearRegistry,
    applyAction,
    replay,
    verifyReplay,
    record,
  };
})(window);
