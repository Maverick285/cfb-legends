// PERSIST-2 v2: Action reducer registration for the 5 highest-leverage app actions.
// Spec: ai-pack/CFB_FM_REMAINING_SYSTEM_SPECS/41_DATABASE_SAVE_MIGRATION_AND_EVENT_LOG_SPEC.md §"Replay"
//
// These reducers don't replace the live app.js handlers (which mutate global
// `data`/`career`). Instead they describe what each action means as a pure
// (state, payload) → state transformation, so the replay scaffold can verify
// hash equivalence between two runs of the same action stream.
//
// Each reducer:
//   - reads the relevant slice from state
//   - returns a new state with the action's effect applied
//   - never mutates inputs
//
// To activate: load this file after replay.js. It self-registers with CGM_REPLAY.

(function initReducers(global) {
  const RP = global.CGM_REPLAY;
  if (!RP || !RP.registerReducer) return;

  function clone(v) { return v === undefined ? undefined : JSON.parse(JSON.stringify(v)); }

  function registerAll() {
    register();
  }

  function register() {
  // ── ADVANCE_WEEK ────────────────────────────────────────────────────────
  // Payload: {} (no args)
  // Effect: bumps the in-memory week counter + appends an event to the log.
  RP.registerReducer("ADVANCE_WEEK", (state, payload) => {
    const next = clone(state) || {};
    next.career = next.career || { advanceCount: 0, week: 0, season: 1 };
    next.career.advanceCount = (next.career.advanceCount || 0) + 1;
    next.career.week = (next.career.week || 0) + 1;
    if (next.career.week > 17) {
      next.career.week = 1;
      next.career.season = (next.career.season || 1) + 1;
    }
    next.eventLog = next.eventLog || { count: 0, events: [] };
    next.eventLog.events.push({
      id: `wk-${next.career.advanceCount}`,
      type: "week_advanced",
      season: next.career.season, week: next.career.week,
    });
    next.eventLog.count = next.eventLog.events.length;
    return next;
  });

  // ── APPLY_RECRUIT_ACTION ────────────────────────────────────────────────
  // Payload: { prospectId, action: "scout" | "contact" | "offer" | "visit" }
  // Effect: bumps a per-prospect interest counter + appends action to log.
  RP.registerReducer("APPLY_RECRUIT_ACTION", (state, payload) => {
    const next = clone(state) || {};
    const p = payload || {};
    next.recruiting = next.recruiting || { actionsByProspect: {}, history: [] };
    const k = p.prospectId || "unknown";
    next.recruiting.actionsByProspect[k] = next.recruiting.actionsByProspect[k] || {
      scoutCount: 0, contactCount: 0, offerCount: 0, visitCount: 0, interestBonus: 0,
    };
    const slot = next.recruiting.actionsByProspect[k];
    if (p.action === "scout")    { slot.scoutCount   += 1; slot.interestBonus += 2; }
    if (p.action === "contact")  { slot.contactCount += 1; slot.interestBonus += 4; }
    if (p.action === "offer")    { slot.offerCount   += 1; slot.interestBonus += 12; }
    if (p.action === "visit")    { slot.visitCount   += 1; slot.interestBonus += 8; }
    next.recruiting.history.push({ prospectId: k, action: p.action, at: next.career && next.career.week });
    return next;
  });

  // ── SET_PRACTICE_EMPHASIS ───────────────────────────────────────────────
  // Payload: { emphasis: "passing" | "rushing" | "defense" | "special_teams" | "balanced" }
  RP.registerReducer("SET_PRACTICE_EMPHASIS", (state, payload) => {
    const next = clone(state) || {};
    next.practice = next.practice || { history: [] };
    const e = (payload && payload.emphasis) || "balanced";
    next.practice.current = e;
    next.practice.history.push({ emphasis: e, at: next.career && next.career.week });
    return next;
  });

  // ── SIGN_TRANSFER ───────────────────────────────────────────────────────
  // Payload: { playerId, fromSchool, contractYears, scholarshipUsed }
  RP.registerReducer("SIGN_TRANSFER", (state, payload) => {
    const next = clone(state) || {};
    const p = payload || {};
    next.transfersIn = next.transfersIn || [];
    next.transfersIn.push({
      playerId: p.playerId || "unknown",
      fromSchool: p.fromSchool || null,
      contractYears: p.contractYears || 1,
      at: next.career && next.career.week,
    });
    next.scholarships = next.scholarships || { used: 0, max: 85 };
    next.scholarships.used = Math.min((next.scholarships.used || 0) + (p.scholarshipUsed || 1), next.scholarships.max);
    return next;
  });

  // ── HIRE_COACH ──────────────────────────────────────────────────────────
  // Payload: { candidateId, role, salaryK, years }
  RP.registerReducer("HIRE_COACH", (state, payload) => {
    const next = clone(state) || {};
    const p = payload || {};
    next.staff = next.staff || { hires: [], current: {} };
    next.staff.hires.push({
      candidateId: p.candidateId || "unknown",
      role: p.role || "POSITION_COACH",
      salaryK: Number(p.salaryK) || 0,
      years: Number(p.years) || 1,
      at: next.career && next.career.week,
    });
    next.staff.current[p.role || "POSITION_COACH"] = p.candidateId || "unknown";
    return next;
  });

  } // end register()

  register();

  global.CGM_REDUCERS = {
    registered: ["ADVANCE_WEEK", "APPLY_RECRUIT_ACTION", "SET_PRACTICE_EMPHASIS", "SIGN_TRANSFER", "HIRE_COACH"],
    registerAll,
  };
})(window);
