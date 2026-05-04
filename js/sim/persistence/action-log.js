// PERSIST-1 (slice of spec 41): Action Log
// Spec: ai-pack/CFB_FM_REMAINING_SYSTEM_SPECS/41_DATABASE_SAVE_MIGRATION_AND_EVENT_LOG_SPEC.md
//
// Decisions the user made (or AI made, e.g. AI school recruiting). Distinct
// from the Event Log (facts the sim produced). Each action carries:
//   - actorId (whoever decided)
//   - decisionType
//   - reasonCodes (so Pulse + Scrapbook can read why)
//   - patches (before/after snapshots of the affected entity slice — for replay)
//
// Append-only. Used by:
//   - replay (seed + actions → identical state)
//   - audit ("why did X happen this season?")
//   - AI QC packets (export decision history for review)

(function initActionLog(global) {
  // Catalogued decision types. Anything outside this set throws on append so
  // we don't accidentally log unstructured strings.
  const ACTION_TYPES = new Set([
    "career_start",
    "continue_advance",
    "depth_chart_set",
    "redshirt_decision",
    "dev_focus_change",
    "promise_made",
    "practice_emphasis_set",
    "recruit_action",        // scout/contact/offer/visit
    "recruit_offer",
    "recruit_decommit_action",
    "portal_action",
    "retention_action",
    "facility_request",
    "tactical_profile_set",
    "tempo_set",
    "playbook_install",
    "staff_hire",
    "staff_fire",
    "staff_extension",
    "scenario_loaded",
    "rules_profile_changed",
    "save_loaded",
    "ai_school_decision",    // any AI school's decision (rolled up)
  ]);

  function createAction(a) {
    if (!a || typeof a !== "object") throw new Error("createAction: args required");
    if (!a.id) throw new Error("createAction: id required");
    if (!ACTION_TYPES.has(a.type)) throw new Error(`createAction: invalid type ${a.type}`);
    return {
      id: a.id,
      timestamp: a.timestamp || Date.now(),
      type: a.type,
      season: a.season || null,
      week: a.week || null,
      actorId: a.actorId || null,
      actorRole: a.actorRole || "user",
      summary: a.summary || "",
      reasonCodes: Array.isArray(a.reasonCodes) ? a.reasonCodes.slice() : [],
      patchBefore: a.patchBefore || null,
      patchAfter: a.patchAfter || null,
      data: a.data || null,
    };
  }

  function createLog() {
    return { actions: [], byType: {}, byActor: {}, count: 0, maxRetained: 4000 };
  }

  function appendAction(log, action) {
    log.actions.push(action);
    log.count += 1;
    if (!log.byType[action.type]) log.byType[action.type] = [];
    log.byType[action.type].push(action.id);
    if (action.actorId) {
      if (!log.byActor[action.actorId]) log.byActor[action.actorId] = [];
      log.byActor[action.actorId].push(action.id);
    }
    if (log.actions.length > log.maxRetained) prune(log);
    return action;
  }

  function prune(log) {
    log.actions = log.actions.slice(-log.maxRetained);
    log.byType = {};
    log.byActor = {};
    log.actions.forEach((a) => {
      if (!log.byType[a.type]) log.byType[a.type] = [];
      log.byType[a.type].push(a.id);
      if (a.actorId) {
        if (!log.byActor[a.actorId]) log.byActor[a.actorId] = [];
        log.byActor[a.actorId].push(a.id);
      }
    });
  }

  function recentActions(log, limit) {
    return log.actions.slice(-Math.max(1, limit || 25)).reverse();
  }
  function actionsByType(log, type, limit) {
    const ids = new Set(log.byType[type] || []);
    return log.actions.filter((a) => ids.has(a.id)).slice(-Math.max(1, limit || 50)).reverse();
  }
  function actionsByActor(log, actorId, limit) {
    const ids = new Set(log.byActor[actorId] || []);
    return log.actions.filter((a) => ids.has(a.id)).slice(-Math.max(1, limit || 50)).reverse();
  }

  function rehydrateLog(serialized) {
    if (!serialized || !Array.isArray(serialized.actions)) return createLog();
    const log = createLog();
    serialized.actions.forEach((a) => {
      try { appendAction(log, createAction(a)); }
      catch (_) { /* drop malformed */ }
    });
    if (Number.isFinite(serialized.maxRetained)) log.maxRetained = serialized.maxRetained;
    return log;
  }

  function serializeLog(log) {
    return { actions: log.actions.slice(), maxRetained: log.maxRetained };
  }

  global.CGM_ACTION_LOG = {
    ACTION_TYPES,
    createAction,
    createLog,
    appendAction,
    recentActions,
    actionsByType,
    actionsByActor,
    rehydrateLog,
    serializeLog,
  };
})(window);
