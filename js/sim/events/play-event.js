// STAT-2: Structured PlayEvent Factory (minimal)
// Spec: ai-pack/CFB_FM_STATS_ENGINE_PACK/03_PLAY_EVENT_SCHEMA.md
//
// Per DL-20260502-03 we ship a minimal subset of the spec's PlayEvent shape
// that the drive sim can populate today, while preserving the field names so
// later stat-credit (STAT-3) and accumulator (STAT-5) work plugs in cleanly.
// Optional fields the sim doesn't yet produce (airYards, scoring, players,
// statEligibility) are left null; downstream code should tolerate that.

(function initPlayEvent(global) {
  const PLAY_TYPES = new Set([
    "rush","pass","sack","scramble","kneel_down","spike","punt","field_goal",
    "extra_point","two_point","kickoff","kickoff_return","punt_return",
    "interception_return","fumble_return","penalty_only","timeout","end_period",
  ]);
  const CHARGED_TYPES = new Set([
    "rushing_attempt","passing_attempt_complete","passing_attempt_incomplete",
    "passing_attempt_interception","sack_college_rushing_loss","scramble_rush",
    "kneel_down_rush","spike_pass_attempt","punt","field_goal_attempt",
    "extra_point_attempt","two_point_attempt","kickoff","return",
    "penalty_no_play","penalty_live_ball","no_stat",
  ]);
  const OUTCOMES = new Set([
    "gain","loss","no_gain","complete","incomplete","touchdown","turnover",
    "penalty","score","change_of_possession",
  ]);

  function clock(minutes, seconds) {
    return { minutes: Math.max(0, minutes | 0), seconds: Math.max(0, Math.min(59, seconds | 0)) };
  }

  function fieldPosition(yardsToGoal, displayLabel) {
    const ytg = Math.max(1, Math.min(99, yardsToGoal | 0));
    return { yardsToGoal: ytg, display: displayLabel || `OWN ${100 - ytg}` };
  }

  /**
   * Build a minimal PlayEvent. Required arguments are validated; optional
   * fields default to null so downstream consumers can tell "not modeled yet"
   * apart from "modeled and zero".
   *
   * @param {object} a
   *   id, gameId, driveId, playNumber, drivePlayNumber,
   *   period, clockBefore, clockAfter,
   *   possessionTeamId, defenseTeamId, homeTeamId, awayTeamId,
   *   downBefore, distanceBefore, yardsToGoalBefore,
   *   playType, chargedPlayType,
   *   yardsGained, firstDown,
   *   outcome (PlayResult.outcome),
   *   reasonCodes
   * @returns {object} PlayEvent
   */
  function createPlayEvent(a) {
    if (!a || typeof a !== "object") throw new Error("createPlayEvent: args required");
    if (!a.id) throw new Error("createPlayEvent: id required");
    if (!PLAY_TYPES.has(a.playType)) throw new Error(`createPlayEvent: invalid playType ${a.playType}`);
    if (a.chargedPlayType && !CHARGED_TYPES.has(a.chargedPlayType)) {
      throw new Error(`createPlayEvent: invalid chargedPlayType ${a.chargedPlayType}`);
    }
    if (a.outcome && !OUTCOMES.has(a.outcome)) {
      throw new Error(`createPlayEvent: invalid outcome ${a.outcome}`);
    }
    return {
      id: a.id,
      gameId: a.gameId || null,
      driveId: a.driveId || null,
      playNumber: a.playNumber | 0,
      drivePlayNumber: a.drivePlayNumber | 0,
      period: a.period | 0,
      clockBefore: a.clockBefore || clock(0, 0),
      clockAfter: a.clockAfter || a.clockBefore || clock(0, 0),
      possessionTeamId: a.possessionTeamId || null,
      defenseTeamId: a.defenseTeamId || null,
      homeTeamId: a.homeTeamId || null,
      awayTeamId: a.awayTeamId || null,
      downBefore: a.downBefore || null,
      distanceBefore: Number.isFinite(a.distanceBefore) ? a.distanceBefore : null,
      yardsToGoalBefore: Number.isFinite(a.yardsToGoalBefore) ? a.yardsToGoalBefore : null,
      yardLineBefore: a.yardLineBefore || null,
      playCall: a.playCall || null,
      playType: a.playType,
      chargedPlayType: a.chargedPlayType || "no_stat",
      result: a.result || (a.outcome ? { outcome: a.outcome, descriptionKey: a.descriptionKey || a.outcome } : null),
      yardsGained: Number.isFinite(a.yardsGained) ? a.yardsGained : 0,
      airYards: Number.isFinite(a.airYards) ? a.airYards : null,
      yardsAfterCatch: Number.isFinite(a.yardsAfterCatch) ? a.yardsAfterCatch : null,
      yardsAfterContact: Number.isFinite(a.yardsAfterContact) ? a.yardsAfterContact : null,
      firstDown: Boolean(a.firstDown),
      firstDownType: a.firstDownType || null,
      scoring: a.scoring || null,
      turnover: a.turnover || null,
      penalty: a.penalty || null,
      players: a.players || null,
      possessionChange: Boolean(a.possessionChange),
      downAfter: a.downAfter || null,
      distanceAfter: Number.isFinite(a.distanceAfter) ? a.distanceAfter : null,
      yardsToGoalAfter: Number.isFinite(a.yardsToGoalAfter) ? a.yardsToGoalAfter : null,
      yardLineAfter: a.yardLineAfter || null,
      statEligibility: a.statEligibility || null,
      reasonCodes: Array.isArray(a.reasonCodes) ? a.reasonCodes.slice() : [],
    };
  }

  /**
   * Group PlayEvents by drive, then by game. Used by accumulators (STAT-3+)
   * to walk events in order without re-sorting at every consumer.
   */
  function indexByDrive(events) {
    const drives = new Map();
    events.forEach((e) => {
      const key = e.driveId || "drive-unknown";
      if (!drives.has(key)) drives.set(key, []);
      drives.get(key).push(e);
    });
    drives.forEach((list) => list.sort((a, b) => a.drivePlayNumber - b.drivePlayNumber));
    return drives;
  }

  global.CGM_PLAY_EVENT = {
    PLAY_TYPES,
    CHARGED_TYPES,
    OUTCOMES,
    clock,
    fieldPosition,
    createPlayEvent,
    indexByDrive,
  };
})(window);
