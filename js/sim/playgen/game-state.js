// PLAYGEN-1: Game State Machine
// Spec: ai-pack/CFB_FM_NEXT_CORE_IMPLEMENTATION_SPECS/28_PLAY_GENERATOR_AND_GAME_SIM_ENGINE_SPEC.md
//
// Owns the deterministic state machine that ticks through downs / clock /
// field position / drive transitions. Pure: every mutation goes through a
// named transition function so the per-play resolver in play-resolver.js can
// drive it without touching internals.

(function initGameState(global) {
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /**
   * Build a fresh GameState for the start of a game.
   */
  function createGameState(args) {
    if (!args) throw new Error("createGameState: args required");
    return {
      gameId: args.gameId || `g-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
      period: 1,
      clock: { minutes: 15, seconds: 0 },
      possessionTeamId: args.kickReturnerTeamId || args.awayTeamId,
      defenseTeamId:    args.kickReturnerTeamId === args.homeTeamId ? args.awayTeamId : args.homeTeamId,
      homeTeamId: args.homeTeamId,
      awayTeamId: args.awayTeamId,
      score: { [args.homeTeamId]: 0, [args.awayTeamId]: 0 },
      down: 1,
      distance: 10,
      yardsToGoal: args.startingYardsToGoal || 75,
      driveId: `${args.gameId || "g"}-d1`,
      driveStartYardsToGoal: args.startingYardsToGoal || 75,
      drivePlays: 0,
      driveYards: 0,
      playNumber: 0,
      drivePlayNumber: 0,
      gameComplete: false,
      gameContext: args.gameContext || {},
      teamRuntimeState: args.teamRuntimeState || {},
    };
  }

  /**
   * Situation classifier from the spec §"Situation Classifier".
   * Returns a Situation snapshot used by both offense and defense selectors.
   */
  function classifySituation(state) {
    const margin = state.score[state.possessionTeamId] - state.score[state.defenseTeamId];
    let downDistanceBucket = "standard";
    if (state.down === 3) {
      if (state.distance <= 3) downDistanceBucket = "third_short";
      else if (state.distance <= 7) downDistanceBucket = "third_medium";
      else downDistanceBucket = "third_long";
    } else if (state.down === 4) {
      downDistanceBucket = state.distance <= 3 ? "fourth_short" : "fourth_long";
    } else if (state.distance <= 2) {
      downDistanceBucket = "short_yardage";
    }

    let fieldZone;
    if (state.yardsToGoal >= 90) fieldZone = "backed_up";
    else if (state.yardsToGoal >= 60) fieldZone = "own_side";
    else if (state.yardsToGoal >= 40) fieldZone = "midfield";
    else if (state.yardsToGoal > 20) fieldZone = "plus_territory";
    else if (state.yardsToGoal > 5) fieldZone = "red_zone";
    else fieldZone = "goal_line";

    const totalSeconds = state.clock.minutes * 60 + state.clock.seconds;
    let clockState = "normal";
    if (state.period === 2 && totalSeconds <= 120) clockState = "two_minute";
    else if (state.period === 4 && totalSeconds <= 240 && margin <= 8 && margin >= -8) clockState = "four_minute";
    else if (state.period === 4 && totalSeconds <= 60 && margin < 0) clockState = "desperation";
    else if (state.period === 2 && totalSeconds <= 30) clockState = "end_half";

    let scoreState = "tied";
    if (margin >= 17) scoreState = "leading_big";
    else if (margin >= 1) scoreState = "leading_small";
    else if (margin >= -8) scoreState = "trailing_small";
    else scoreState = "trailing_big";

    let gamePhase = "early";
    if (state.period >= 5) gamePhase = "overtime";
    else if (state.period >= 3) gamePhase = "late";
    else if (state.period >= 2) gamePhase = "middle";

    return { downDistanceBucket, fieldZone, clockState, scoreState, gamePhase, margin };
  }

  /**
   * Apply the result of a play to the state. Returns a transition record so
   * callers can identify what happened (first down, score, turnover, etc.).
   */
  function applyPlayOutcome(state, outcome) {
    const before = {
      down: state.down,
      distance: state.distance,
      yardsToGoal: state.yardsToGoal,
      possessionTeamId: state.possessionTeamId,
      defenseTeamId: state.defenseTeamId,
      driveId: state.driveId,
      drivePlayNumber: state.drivePlayNumber + 1,
    };

    // Resolver uses `outcome.yards`; tolerate either name to avoid
    // catastrophic field-position drift if a future bucket emits one or the
    // other. Surfaced by HARNESS-2 (DL-20260503-06).
    const _y = Number.isFinite(outcome.yards) ? outcome.yards : (outcome.yardsGained || 0);

    state.playNumber += 1;
    state.drivePlayNumber += 1;
    state.drivePlays += 1;
    state.driveYards += _y;

    // Clock runoff
    if (Number.isFinite(outcome.clockSeconds)) {
      const total = state.clock.minutes * 60 + state.clock.seconds;
      const next = Math.max(0, total - outcome.clockSeconds);
      state.clock = { minutes: Math.floor(next / 60), seconds: next % 60 };
    }

    const transition = { ...before, scored: false, turnover: false, firstDown: false, drivePoints: 0 };

    if (outcome.scoring) {
      const team = outcome.scoring.team || state.possessionTeamId;
      const points = outcome.scoring.points || 0;
      state.score[team] = (state.score[team] || 0) + points;
      transition.scored = true;
      transition.drivePoints = points;
      // After a TD or FG the offense kicks off; we collapse "kickoff" into a
      // possession swap with field position reset.
      _changePossession(state, 75);
      return transition;
    }
    if (outcome.turnover || outcome.isTurnover) {
      transition.turnover = true;
      // Punts (and any future return-aware play) carry an explicit landing
      // spot. Without this, every punt collapses into "turnover on downs at
      // the punter's spot" — giving the receiving team an automatic red-zone
      // start. Surfaced by HARNESS-2 (DL-20260503-06).
      const explicitDest = Number.isFinite(outcome.turnoverDestination) ? outcome.turnoverDestination : null;
      const returnYards = (outcome.turnover && outcome.turnover.returnYards) || 0;
      const newYardsToGoal = explicitDest != null ? explicitDest : (100 - state.yardsToGoal - returnYards);
      _changePossession(state, newYardsToGoal);
      return transition;
    }

    // Penalty branch: apply yardage but DON'T advance the down. Defensive
    // penalties with autoFirstDown reset the chain. Drive-engine sets
    // outcome.kind to "penalty_offense" / "penalty_defense" and stashes the
    // penalty record at outcome._penaltyMeta.
    if (outcome.kind === "penalty_offense" || outcome.kind === "penalty_defense") {
      state.yardsToGoal = clamp(state.yardsToGoal - _y, 1, 99);
      state.distance -= _y;
      const meta = outcome._penaltyMeta || {};
      if (meta.autoFirstDown) {
        state.down = 1;
        state.distance = Math.min(10, state.yardsToGoal);
        transition.firstDown = true;
        transition.penaltyAutoFirstDown = true;
      } else if (state.distance <= 0) {
        state.down = 1;
        state.distance = Math.min(10, state.yardsToGoal);
        transition.firstDown = true;
      }
      // Down does NOT advance — the snap is replayed.
      transition.penalty = true;
      return transition;
    }

    // Apply yards
    state.yardsToGoal = clamp(state.yardsToGoal - _y, 1, 99);
    state.distance -= _y;

    // First down check
    if (state.distance <= 0) {
      state.down = 1;
      state.distance = Math.min(10, state.yardsToGoal);
      transition.firstDown = true;
    } else if (state.down >= 4) {
      // Turnover on downs
      transition.turnover = true;
      _changePossession(state, 100 - state.yardsToGoal);
    } else {
      state.down += 1;
    }

    return transition;
  }

  function _changePossession(state, newYardsToGoal) {
    const tmp = state.possessionTeamId;
    state.possessionTeamId = state.defenseTeamId;
    state.defenseTeamId = tmp;
    state.yardsToGoal = clamp(Number.isFinite(newYardsToGoal) ? newYardsToGoal : 75, 1, 99);
    state.down = 1;
    state.distance = Math.min(10, state.yardsToGoal);
    state.driveId = `${state.gameId}-d${state.playNumber + 1}`;
    state.driveStartYardsToGoal = state.yardsToGoal;
    state.drivePlays = 0;
    state.driveYards = 0;
    state.drivePlayNumber = 0;
  }

  /**
   * Advance the period clock if it's expired. Returns true if a period
   * boundary was crossed.
   */
  function maybeAdvancePeriod(state) {
    const total = state.clock.minutes * 60 + state.clock.seconds;
    if (total > 0) return false;
    if (state.period >= 4) {
      state.gameComplete = state.score[state.homeTeamId] !== state.score[state.awayTeamId];
      if (!state.gameComplete) {
        // Simple OT: each side gets a possession from the 25.
        state.period += 1;
        state.clock = { minutes: 5, seconds: 0 };
      }
      return true;
    }
    state.period += 1;
    state.clock = { minutes: 15, seconds: 0 };
    return true;
  }

  global.CGM_GAME_STATE = {
    createGameState,
    classifySituation,
    applyPlayOutcome,
    maybeAdvancePeriod,
  };
})(window);
