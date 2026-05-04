// PERSIST-1 (slice of spec 41): Event Log
// Spec: ai-pack/CFB_FM_REMAINING_SYSTEM_SPECS/41_DATABASE_SAVE_MIGRATION_AND_EVENT_LOG_SPEC.md
//
// World-things-that-happened, append-only, structured. Distinct from the
// Action Log (decisions): events are *facts the simulation produced*. Used by:
//   - replay (deterministic from seed + events)
//   - Campus Pulse drivers (each event carries reasonCodes that pulse reads)
//   - Program Scrapbook memory selection
//   - AI QC packets (export to disk)
//   - the in-app "Recent Events" panel
//
// Spec calls for SQLite-backed; we ship the typed shape + in-memory append +
// JSON serialization. SQLite migration is deferred (DL-20260502-03 keeps us
// browser-only for now).

(function initEventLog(global) {
  // Event categories — must be one of these.
  const EVENT_CATEGORIES = new Set([
    "game_played",       // a game completed (any team)
    "drive_finished",    // a single drive ended (TD/FG/punt/turnover)
    "score_change",      // a play that changed the scoreboard
    "turnover",          // INT or fumble lost
    "injury",            // a player got hurt
    "recruit_action",    // contact/scout/offer/visit
    "recruit_commit",    // a prospect committed
    "transfer_in",       // a portal addition
    "transfer_out",      // a player left
    "player_breakout",   // dev engine flagged a breakout
    "player_regression", // dev engine flagged a regression
    "facility_upgrade",  // facility built/upgraded
    "season_rolled",     // year-end rollover
    "ranking_change",    // top 25 movement
    "promise_made",      // recruiting/retention promise added
    "promise_broken",    // promise broken (downgrade)
    "media_clip",        // narrative clip posted
    "season_award",      // postseason award/honor
    "milestone",         // round-number stat (1000 yard rusher, etc.)
    // Wave 9-18 additions:
    "award_won",         // POTY / position award / COY winner stamped
    "record_broken",     // school-season record broken
    "scrapbook_composed",// season-end scrapbook composer ran
    "realignment",       // school changed conferences
    "nil_bid",           // rival NIL bid against a prospect
    "injury_recovered",  // player returned from injury
  ]);

  // Severity buckets for narrative/scrapbook ranking.
  const EVENT_SEVERITY = new Set(["trivial", "minor", "notable", "major", "historic"]);

  /**
   * Build a typed Event record. All optional fields default to null/[] so
   * downstream consumers can tell "not applicable" apart from "missing".
   *
   * @param {object} a
   *   - id              required, unique
   *   - category        required, must be in EVENT_CATEGORIES
   *   - severity        required, must be in EVENT_SEVERITY
   *   - season, week    when in season time it happened (week is a string like "Week 6")
   *   - actorId         optional team or player id that's "the subject"
   *   - actorName       optional display name
   *   - subjectIds      optional array of related entity ids
   *   - summary         human-readable one-liner
   *   - reasonCodes     optional array (drives Pulse, Scrapbook ranking)
   *   - data            optional payload (game id, score, attribute deltas, etc.)
   */
  function createEvent(a) {
    if (!a || typeof a !== "object") throw new Error("createEvent: args required");
    if (!a.id) throw new Error("createEvent: id required");
    if (!EVENT_CATEGORIES.has(a.category)) throw new Error(`createEvent: invalid category ${a.category}`);
    if (!EVENT_SEVERITY.has(a.severity)) throw new Error(`createEvent: invalid severity ${a.severity}`);
    return {
      id: a.id,
      timestamp: a.timestamp || Date.now(),
      category: a.category,
      severity: a.severity,
      season: a.season || null,
      week: a.week || null,
      actorId: a.actorId || null,
      actorName: a.actorName || null,
      subjectIds: Array.isArray(a.subjectIds) ? a.subjectIds.slice() : [],
      summary: a.summary || "",
      reasonCodes: Array.isArray(a.reasonCodes) ? a.reasonCodes.slice() : [],
      data: a.data || null,
    };
  }

  function createLog() {
    return { events: [], byCategory: {}, byActor: {}, count: 0, maxRetained: 5000 };
  }

  /**
   * Append an event to the log + maintain category/actor indexes for O(1)
   * filtering. Caps the in-memory log at maxRetained to avoid unbounded
   * growth — older trivial/minor events get pruned first.
   */
  function appendEvent(log, event) {
    log.events.push(event);
    log.count += 1;
    if (!log.byCategory[event.category]) log.byCategory[event.category] = [];
    log.byCategory[event.category].push(event.id);
    if (event.actorId) {
      if (!log.byActor[event.actorId]) log.byActor[event.actorId] = [];
      log.byActor[event.actorId].push(event.id);
    }
    if (log.events.length > log.maxRetained) pruneLog(log);
    return event;
  }

  function pruneLog(log) {
    // Keep all major/historic events. Drop oldest minor/trivial first.
    const keepers = log.events.filter((e) => e.severity === "major" || e.severity === "historic");
    const trimmable = log.events.filter((e) => e.severity !== "major" && e.severity !== "historic");
    const trimmed = trimmable.slice(-Math.max(0, log.maxRetained - keepers.length));
    log.events = [...keepers, ...trimmed].sort((a, b) => a.timestamp - b.timestamp);
    // Rebuild indexes.
    log.byCategory = {};
    log.byActor = {};
    log.events.forEach((e) => {
      if (!log.byCategory[e.category]) log.byCategory[e.category] = [];
      log.byCategory[e.category].push(e.id);
      if (e.actorId) {
        if (!log.byActor[e.actorId]) log.byActor[e.actorId] = [];
        log.byActor[e.actorId].push(e.id);
      }
    });
  }

  function recentEvents(log, limit) {
    return log.events.slice(-Math.max(1, limit || 25)).reverse();
  }

  function eventsByCategory(log, category, limit) {
    const ids = new Set(log.byCategory[category] || []);
    return log.events.filter((e) => ids.has(e.id)).slice(-Math.max(1, limit || 50)).reverse();
  }

  function eventsByActor(log, actorId, limit) {
    const ids = new Set(log.byActor[actorId] || []);
    return log.events.filter((e) => ids.has(e.id)).slice(-Math.max(1, limit || 50)).reverse();
  }

  function eventsBySeason(log, season) {
    return log.events.filter((e) => e.season === season);
  }

  function severityCounts(log) {
    const counts = { trivial: 0, minor: 0, notable: 0, major: 0, historic: 0 };
    log.events.forEach((e) => { counts[e.severity] = (counts[e.severity] || 0) + 1; });
    return counts;
  }

  /** Reload a serialized log (e.g. from save state). */
  function rehydrateLog(serialized) {
    if (!serialized || !Array.isArray(serialized.events)) return createLog();
    const log = createLog();
    serialized.events.forEach((e) => {
      try { appendEvent(log, createEvent(e)); }
      catch (_) { /* drop malformed events on load */ }
    });
    if (Number.isFinite(serialized.maxRetained)) log.maxRetained = serialized.maxRetained;
    return log;
  }

  function serializeLog(log) {
    return { events: log.events.slice(), maxRetained: log.maxRetained };
  }

  global.CGM_EVENT_LOG = {
    EVENT_CATEGORIES,
    EVENT_SEVERITY,
    createEvent,
    createLog,
    appendEvent,
    pruneLog,
    recentEvents,
    eventsByCategory,
    eventsByActor,
    eventsBySeason,
    severityCounts,
    rehydrateLog,
    serializeLog,
  };
})(window);
