// MATCHUP-2: Matchup Score Utilities + Reason Code Engine
// Spec: ai-pack/CFB_FM_NEXT_CORE_IMPLEMENTATION_SPECS/29_ATTRIBUTE_TO_OUTCOME_AND_PLAYER_MATCHUP_SPEC.md
//
// Pure functions that turn unit ratings into matchup outcomes with structured
// reason codes. Every matchup follows the same pattern (spec §"Matchup Score
// Pattern"):
//   matchupScore = relevant_offense + role_fit + scheme_fit + staff/gameplan
//                  + practice + morale - fatigue - injury - weather
//                  - opponent_relevant - context + variance
// Outputs: { advantage: -100..100, confidence: 0..1, reasonCodes: [...] }

(function initMatchup(global) {
  const REGISTRY = global.CGM_MATCHUP_REGISTRY;
  if (!REGISTRY) {
    if (global.console) global.console.error("CGM_MATCHUP_REGISTRY missing — load attribute-registry.js first");
    return;
  }

  // ── Reason code catalogue ────────────────────────────────────────────────
  // Every reason code emitted by the engine MUST appear here so downstream
  // narrative + telemetry layers can surface them. Keep messages concise:
  // narrative builders compose them, they aren't shown to users verbatim.
  const REASON_CODES = {
    // Pass game (spec §157-303)
    pass_protection_advantage: { side: "offense", weight: 1, message: "Pass protection holds up" },
    edge_rush_mismatch:        { side: "defense", weight: 1, message: "Edge rush wins the matchup" },
    blitz_pickup_failure:      { side: "defense", weight: 1, message: "Blitz pickup broke down" },
    qb_avoided_pressure:       { side: "offense", weight: 0.6, message: "QB escaped pressure" },
    fatigue_created_pressure:  { side: "defense", weight: 0.5, message: "Fatigued OL gave up pressure" },
    wr_route_advantage:        { side: "offense", weight: 1, message: "WRs winning route matchups" },
    cb_press_win:              { side: "defense", weight: 1, message: "CBs locked up at the line" },
    safety_help_limited_window:{ side: "defense", weight: 0.6, message: "Safety help shrinks windows" },
    coverage_bust:             { side: "offense", weight: 1, message: "Coverage bust" },
    bad_hips_exposed:          { side: "offense", weight: 0.7, message: "Stiff-hipped DB beaten on break" },
    qb_processing_found_open_receiver: { side: "offense", weight: 1, message: "QB processed pressure and found open WR" },
    pressure_forced_miss:      { side: "defense", weight: 1, message: "Pressure forced an off-target throw" },
    deep_accuracy_edge:        { side: "offense", weight: 0.8, message: "QB deep ball is on point" },
    bad_decision_into_coverage:{ side: "defense", weight: 1, message: "QB threw into coverage" },
    // Run game (spec §305-397)
    front_advantage_offense:   { side: "offense", weight: 0.8, message: "Numbers favor the run" },
    stacked_box:               { side: "defense", weight: 0.8, message: "Stacked box" },
    ol_run_block_win:          { side: "offense", weight: 1, message: "OL drives the line of scrimmage" },
    dl_run_stop_win:           { side: "defense", weight: 1, message: "DL stuffs the run at the LOS" },
    rb_vision_success:         { side: "offense", weight: 0.9, message: "RB vision finds the cutback" },
    lb_run_fit_stop:           { side: "defense", weight: 0.9, message: "LBs fit gaps cleanly" },
    speed_to_edge:             { side: "offense", weight: 0.7, message: "Speed wins the edge" },
    contain_breakdown:         { side: "offense", weight: 0.8, message: "Edge contain broke" },
    // Sacks/turnovers (spec §398-460)
    edge_bend_sack:            { side: "defense", weight: 1, message: "Edge bent and got home" },
    interior_collapse:         { side: "defense", weight: 0.9, message: "Pocket collapsed from the interior" },
    qb_held_too_long:          { side: "defense", weight: 0.8, message: "QB held it too long" },
    fumble_strip_attempt:      { side: "defense", weight: 0.6, message: "Strip attempt forced fumble" },
    ball_security_loss:        { side: "defense", weight: 0.8, message: "Ball security failed in traffic" },
    // Context modifiers
    fatigue_missed_tackle:     { side: "offense", weight: 0.6, message: "Fatigued defenders missed tackles" },
    weather_deep_pass_penalty: { side: "defense", weight: 0.5, message: "Wind/rain shrinks deep windows" },
    crowd_false_start:         { side: "defense", weight: 0.5, message: "Crowd noise drew a false start" },
    morale_clutch_moment:      { side: "offense", weight: 0.5, message: "High morale steadied the offense" },
    morale_collapse:           { side: "defense", weight: 0.5, message: "Low morale cracked under pressure" },
    scheme_fit_advantage:      { side: "offense", weight: 0.4, message: "Scheme fit unlocks a clean concept" },
    scheme_fit_drag:           { side: "defense", weight: 0.4, message: "Scheme fit limits offensive options" },
  };

  function reasonText(codeId) {
    const def = REASON_CODES[codeId];
    return def ? def.message : codeId;
  }

  // ── Core matchup math ────────────────────────────────────────────────────
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /**
   * Compute a matchup advantage given offensive and defensive unit ratings
   * plus optional context modifiers. Returns spec-compliant { advantage,
   * confidence, reasonCodes }.
   *
   * @param {object} args
   *   - offense: { rating: 0-100, depth: 0-100 }
   *   - defense: { rating: 0-100, depth: 0-100 }
   *   - schemeBias?: -10..+10 (offense-positive)
   *   - moraleDelta?: -10..+10 (offense-positive)
   *   - fatigueOffense?: 0..40 (penalty)
   *   - fatigueDefense?: 0..40 (penalty)
   *   - weatherPenalty?: 0..15 (offense-negative)
   *   - random: () => number in [0,1) — required for variance
   *   - rule: short label for the matchup type, e.g. "pass_block"
   *   - winCode / loseCode: reason codes emitted on clear edges
   */
  function resolveMatchup(args) {
    const off = args.offense || { rating: 50, depth: 50 };
    const def = args.defense || { rating: 50, depth: 50 };
    const scheme = Number.isFinite(args.schemeBias) ? args.schemeBias : 0;
    const morale = Number.isFinite(args.moraleDelta) ? args.moraleDelta : 0;
    const fatigueOff = Number.isFinite(args.fatigueOffense) ? args.fatigueOffense : 0;
    const fatigueDef = Number.isFinite(args.fatigueDefense) ? args.fatigueDefense : 0;
    const weather = Number.isFinite(args.weatherPenalty) ? args.weatherPenalty : 0;
    const random = typeof args.random === "function" ? args.random : Math.random;

    const offTerm = off.rating + (off.depth - 50) * 0.10 + scheme + morale - fatigueOff - weather;
    const defTerm = def.rating + (def.depth - 50) * 0.10 - fatigueDef;
    const variance = (random() - 0.5) * 18; // -9..+9
    const rawAdvantage = offTerm - defTerm + variance;
    const advantage = clamp(Math.round(rawAdvantage), -100, 100);
    // Confidence proxy: more reliable when the rating gap is large or the
    // context modifiers all push the same way.
    const directionalLoad = Math.abs(off.rating - def.rating) + Math.abs(scheme) + Math.abs(morale);
    const confidence = clamp(directionalLoad / 60, 0.05, 0.95);

    const reasonCodes = [];
    const winCode = args.winCode;
    const loseCode = args.loseCode;
    if (advantage >= 8 && winCode) reasonCodes.push(winCode);
    if (advantage <= -8 && loseCode) reasonCodes.push(loseCode);
    if (fatigueOff >= 18) reasonCodes.push("fatigue_created_pressure");
    if (fatigueDef >= 18) reasonCodes.push("fatigue_missed_tackle");
    if (weather >= 8 && advantage < 0) reasonCodes.push("weather_deep_pass_penalty");
    if (morale >= 6 && advantage > 4) reasonCodes.push("morale_clutch_moment");
    if (morale <= -6 && advantage < -4) reasonCodes.push("morale_collapse");
    if (scheme >= 4) reasonCodes.push("scheme_fit_advantage");
    if (scheme <= -4) reasonCodes.push("scheme_fit_drag");

    return {
      rule: args.rule || "matchup",
      advantage,
      confidence: Number(confidence.toFixed(2)),
      reasonCodes,
      offRating: Math.round(offTerm),
      defRating: Math.round(defTerm),
      variance: Number(variance.toFixed(1)),
    };
  }

  // ── Higher-level resolvers used by the drive sim ─────────────────────────
  /**
   * Resolve the overall pass-game advantage for a single play.
   * Takes precomputed unit ratings (from computeTeamUnits) and contextual
   * modifiers. Folds the four spec sub-steps (protection, separation,
   * decision/accuracy, catch/YAC) into one composite score.
   */
  function resolvePassMatchup(off, def, ctx) {
    const c = ctx || {};
    const random = typeof c.random === "function" ? c.random : Math.random;
    const protection = resolveMatchup({
      offense: off.units.ol_pass_block,
      defense: def.units.edge_pass_rush,
      moraleDelta: c.moraleDelta || 0,
      fatigueOffense: c.fatigueOffense || 0,
      fatigueDefense: c.fatigueDefense || 0,
      weatherPenalty: c.weatherPenalty || 0,
      random,
      rule: "pass_protection",
      winCode: "pass_protection_advantage",
      loseCode: "edge_rush_mismatch",
    });
    const separation = resolveMatchup({
      offense: off.units.wr_separation,
      defense: def.units.cb_coverage,
      moraleDelta: c.moraleDelta || 0,
      schemeBias: c.schemeBias || 0,
      fatigueDefense: c.fatigueDefense || 0,
      random,
      rule: "wr_vs_cb",
      winCode: "wr_route_advantage",
      loseCode: "cb_press_win",
    });
    const decision = resolveMatchup({
      offense: { rating: off.units.qb_passing.rating, depth: off.units.wr_hands.rating },
      defense: { rating: (def.units.s_coverage.rating + def.units.lb_coverage.rating) / 2, depth: 60 },
      moraleDelta: c.moraleDelta || 0,
      weatherPenalty: c.weatherPenalty || 0,
      random,
      rule: "qb_decision",
      winCode: "qb_processing_found_open_receiver",
      loseCode: "bad_decision_into_coverage",
    });
    // Composite advantage with weights — protection gates the rest. If
    // protection is badly losing, separation/decision can't fully express.
    const protGate = clamp(protection.advantage / 30 + 0.5, 0.2, 1.1);
    const composite = clamp(Math.round(
      (protection.advantage * 0.35) +
      (separation.advantage * 0.30 * protGate) +
      (decision.advantage * 0.35 * protGate)
    ), -100, 100);
    const confidence = (protection.confidence + separation.confidence + decision.confidence) / 3;
    const reasonCodes = [
      ...protection.reasonCodes,
      ...separation.reasonCodes,
      ...decision.reasonCodes,
    ];
    return {
      rule: "pass_play",
      advantage: composite,
      confidence: Number(confidence.toFixed(2)),
      reasonCodes,
      breakdown: { protection, separation, decision },
    };
  }

  /**
   * Resolve the overall run-game advantage for a single play.
   */
  function resolveRunMatchup(off, def, ctx) {
    const c = ctx || {};
    const random = typeof c.random === "function" ? c.random : Math.random;
    const trench = resolveMatchup({
      offense: off.units.ol_run_block,
      defense: def.units.dl_run_stop,
      schemeBias: c.schemeBias || 0,
      moraleDelta: c.moraleDelta || 0,
      fatigueOffense: c.fatigueOffense || 0,
      fatigueDefense: c.fatigueDefense || 0,
      random,
      rule: "ol_vs_dl",
      winCode: "ol_run_block_win",
      loseCode: "dl_run_stop_win",
    });
    const secondLevel = resolveMatchup({
      offense: off.units.rb_rushing,
      defense: def.units.lb_tackling,
      moraleDelta: c.moraleDelta || 0,
      fatigueDefense: c.fatigueDefense || 0,
      random,
      rule: "rb_vs_lb",
      winCode: "rb_vision_success",
      loseCode: "lb_run_fit_stop",
    });
    const composite = clamp(Math.round(trench.advantage * 0.55 + secondLevel.advantage * 0.45), -100, 100);
    const confidence = (trench.confidence + secondLevel.confidence) / 2;
    return {
      rule: "run_play",
      advantage: composite,
      confidence: Number(confidence.toFixed(2)),
      reasonCodes: [...trench.reasonCodes, ...secondLevel.reasonCodes],
      breakdown: { trench, secondLevel },
    };
  }

  /**
   * Convert a play matchup to a yards-gained probability distribution.
   * Returns { yards, isExplosive, isBigLoss, isTurnoverThreat, scoringChance }
   * — primitive enough to feed back into the drive-level sim, structured
   * enough to feed STAT-2 PlayEvent emission later.
   */
  function projectPlayOutcome(matchup, playType, random) {
    const adv = matchup.advantage;
    const r = random();
    const variance = (r - 0.5) * 8;
    let baseYards;
    if (playType === "pass") {
      baseYards = (adv * 0.10) + 4 + variance;
    } else {
      baseYards = (adv * 0.07) + 3 + variance;
    }
    const yards = Math.round(baseYards);
    const explosiveCutoff = playType === "pass" ? 22 : 14;
    const isExplosive = yards >= explosiveCutoff && adv > 5;
    const isBigLoss = yards <= -3;
    const turnoverChance = playType === "pass"
      ? clamp(0.018 - (adv * 0.0009), 0.005, 0.06)
      : clamp(0.011 - (adv * 0.0006), 0.003, 0.04);
    const isTurnoverThreat = random() < turnoverChance;
    const scoringChance = clamp(0.04 + (adv * 0.0035), 0.005, 0.30);
    return { yards, isExplosive, isBigLoss, isTurnoverThreat, scoringChance };
  }

  global.CGM_MATCHUP = {
    REASON_CODES,
    reasonText,
    resolveMatchup,
    resolvePassMatchup,
    resolveRunMatchup,
    projectPlayOutcome,
  };
})(window);
