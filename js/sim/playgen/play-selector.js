// PLAYGEN-2: Situation-Aware Play Selector
// Spec: 28_PLAY_GENERATOR_AND_GAME_SIM_ENGINE_SPEC.md §"Offensive Play Selection"
//
// Picks a PlayCallContext from the situation + game plan + tendencies. Pure
// function, deterministic given the random source. Returns one of the play
// families the resolver knows how to handle.

(function initPlaySelector(global) {
  const PLAY_FAMILIES = [
    "inside_run","outside_run","quick_pass","intermediate_pass","deep_pass",
    "play_action","screen","punt","field_goal","kneel","spike",
  ];

  // Field goal range guidance: at most a 55-yard kick is realistic.
  function fieldGoalRange(yardsToGoal) {
    return yardsToGoal + 17; // 17 = endzone (10) + snap depth (7)
  }

  /**
   * Pick offensive play call.
   * @param {object} args
   *   - state: GameState
   *   - situation: Situation classification
   *   - tendencies: { passRate, runRate, blitzRate, pace }
   *   - gamePlan: { aggressive: bool, tempo: "Balanced"/"Fast"/"Huddle"/"No-Huddle"/"Extreme" }
   *   - random: () => [0,1)
   * @returns {object} PlayCallContext
   */
  function selectOffensivePlay(args) {
    const state = args.state;
    const sit = args.situation || {};
    const tendencies = args.tendencies || { passRate: 50, runRate: 50, blitzRate: 30, pace: 65 };
    const gp = args.gamePlan || { aggressive: false, tempo: "Balanced" };
    const random = args.random || Math.random;
    const reasonCodes = [];

    // Special situations override everything.
    if (sit.clockState === "end_half" && (state.clock.minutes * 60 + state.clock.seconds) <= 8) {
      reasonCodes.push("clock_kill_spike_or_kneel");
      return { playFamily: "spike", aggressiveness: 0.5, tempoMode: "No-Huddle", reasonCodes };
    }
    if (sit.scoreState === "leading_big" && sit.gamePhase === "late" && (state.clock.minutes * 60 + state.clock.seconds) <= 60 && sit.downDistanceBucket !== "fourth_long") {
      reasonCodes.push("victory_formation");
      return { playFamily: "kneel", aggressiveness: 0.0, tempoMode: "Huddle", reasonCodes };
    }

    // 4th down decisions
    if (state.down === 4) {
      const fgRange = fieldGoalRange(state.yardsToGoal);
      const goingFor = sit.fieldZone === "goal_line" || (state.distance <= 2 && state.yardsToGoal > 35) || sit.scoreState === "trailing_big" || sit.clockState === "desperation";
      if (!goingFor && fgRange <= 55 && state.yardsToGoal <= 38) {
        reasonCodes.push("fourth_down_fg_attempt");
        return { playFamily: "field_goal", aggressiveness: 0.3, tempoMode: "Huddle", reasonCodes };
      }
      if (!goingFor && state.yardsToGoal > 38) {
        reasonCodes.push("fourth_down_punt");
        return { playFamily: "punt", aggressiveness: 0.0, tempoMode: "Huddle", reasonCodes };
      }
      reasonCodes.push("fourth_down_go_for_it");
      // Fall through to normal play call but bias to high-percentage.
    }

    // Base pass/run split from tendencies.
    let passRate = tendencies.passRate / 100;

    // Situational bias.
    if (sit.downDistanceBucket === "third_long" || sit.downDistanceBucket === "fourth_long") passRate += 0.20;
    else if (sit.downDistanceBucket === "third_short" || sit.downDistanceBucket === "fourth_short") passRate -= 0.20;
    else if (sit.downDistanceBucket === "short_yardage") passRate -= 0.18;
    if (sit.fieldZone === "goal_line") passRate -= 0.15;
    if (sit.fieldZone === "red_zone") passRate -= 0.05;
    if (sit.clockState === "two_minute" && sit.scoreState !== "leading_big") passRate += 0.18;
    if (sit.clockState === "desperation") passRate += 0.30;
    if (sit.scoreState === "trailing_big" && sit.gamePhase === "late") passRate += 0.10;
    if (sit.scoreState === "leading_big") passRate -= 0.10;
    passRate = Math.max(0.05, Math.min(0.95, passRate));

    const isPass = random() < passRate;
    if (isPass) {
      // Pick pass family based on situation.
      let depthRoll = random();
      let family;
      if (sit.clockState === "desperation" || (sit.downDistanceBucket === "third_long" && random() > 0.3)) {
        family = depthRoll < 0.55 ? "intermediate_pass" : "deep_pass";
      } else if (sit.fieldZone === "goal_line" || sit.fieldZone === "red_zone") {
        family = depthRoll < 0.55 ? "quick_pass" : depthRoll < 0.85 ? "play_action" : "intermediate_pass";
      } else {
        family = depthRoll < 0.45 ? "quick_pass"
              : depthRoll < 0.78 ? "intermediate_pass"
              : depthRoll < 0.92 ? "play_action"
              : "deep_pass";
      }
      // Screen sprinkle
      if (random() < 0.08 && sit.fieldZone !== "goal_line") family = "screen";
      reasonCodes.push(`pass_call_${family}`);
      return {
        playFamily: family,
        aggressiveness: family === "deep_pass" ? 0.85 : family === "intermediate_pass" ? 0.6 : 0.4,
        tempoMode: gp.tempo,
        targetRole: family === "screen" ? "RB" : family === "deep_pass" ? "WR" : "any",
        reasonCodes,
      };
    }

    // Run families
    let family;
    if (sit.fieldZone === "goal_line") {
      family = "inside_run";
    } else if (sit.downDistanceBucket === "short_yardage" || sit.downDistanceBucket === "third_short" || sit.downDistanceBucket === "fourth_short") {
      family = random() < 0.7 ? "inside_run" : "outside_run";
    } else {
      family = random() < 0.55 ? "inside_run" : "outside_run";
    }
    reasonCodes.push(`run_call_${family}`);
    return {
      playFamily: family,
      aggressiveness: 0.4,
      tempoMode: gp.tempo,
      reasonCodes,
    };
  }

  /**
   * Pick defensive response. Lighter-weight than the spec — lays out the
   * front + coverage + pressure that the resolver consumes.
   */
  function selectDefensiveResponse(args) {
    const sit = args.situation || {};
    const tendencies = args.tendencies || { blitzRate: 30 };
    const random = args.random || Math.random;
    const reasonCodes = [];

    let front = "balanced";
    if (sit.fieldZone === "goal_line") front = "goal_line";
    else if (sit.downDistanceBucket === "short_yardage" || sit.downDistanceBucket === "third_short") front = "loaded_box";
    else if (sit.downDistanceBucket === "third_long" || sit.clockState === "desperation") front = "light_box";
    else if (sit.scoreState === "leading_big" && sit.gamePhase === "late") front = "prevent";

    let coverage;
    const cRoll = random();
    if (front === "prevent") coverage = "prevent";
    else if (sit.downDistanceBucket === "third_long") coverage = cRoll < 0.6 ? "zone" : "match";
    else coverage = cRoll < 0.45 ? "zone" : cRoll < 0.78 ? "man" : "match";

    let pressure = "standard";
    const blitzRoll = random() * 100;
    if (blitzRoll < tendencies.blitzRate * 0.6) pressure = "blitz";
    else if (blitzRoll < tendencies.blitzRate) pressure = "simulated";
    else if (sit.scoreState === "trailing_big" && sit.gamePhase === "late") pressure = "heavy_blitz";

    if (front === "loaded_box") reasonCodes.push("loaded_box_run_threat");
    if (pressure === "blitz" || pressure === "heavy_blitz") reasonCodes.push("defense_brings_pressure");

    return { front, coverage, pressure, runFitAggression: front === "loaded_box" ? 75 : 50, explosivePrevention: front === "prevent" ? 80 : 40, reasonCodes };
  }

  global.CGM_PLAY_SELECTOR = {
    PLAY_FAMILIES,
    selectOffensivePlay,
    selectDefensiveResponse,
    fieldGoalRange,
  };
})(window);
