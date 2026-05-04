// PLAYGEN polish: penalties + weather + fatigue propagation + ST returns
// Spec: 28_PLAY_GENERATOR_AND_GAME_SIM_ENGINE_SPEC.md (penalties + weather notes)
//
// Pure helpers consumed by drive-engine / play-resolver. None of these mutate
// arguments; they return adjustment objects the caller folds in.

(function initExtras(global) {
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function rng(r, lo, hi) { return lo + r() * (hi - lo); }

  // ── Penalties ──────────────────────────────────────────────────────────
  const PENALTIES = {
    false_start:           { yards: -5, repeat: true,  side: "offense", weight: 8 },
    holding_offense:       { yards: -10, repeat: true, side: "offense", weight: 6 },
    holding_defense:       { yards: 5,  repeat: false, side: "defense", weight: 4 },
    pass_interference_def: { yards: 15, repeat: false, side: "defense", weight: 3, autoFirstDown: true },
    pass_interference_off: { yards: -10, repeat: true, side: "offense", weight: 1 },
    illegal_block:         { yards: -10, repeat: true, side: "offense", weight: 2 },
    offsides:              { yards: 5,  repeat: false, side: "defense", weight: 5 },
    encroachment:          { yards: 5,  repeat: false, side: "defense", weight: 3 },
    delay_of_game:         { yards: -5, repeat: true,  side: "offense", weight: 3 },
    facemask:              { yards: 15, repeat: false, side: "defense", weight: 1, autoFirstDown: true },
    targeting:             { yards: 15, repeat: false, side: "defense", weight: 0.4, ejection: true, autoFirstDown: true },
    personal_foul:         { yards: 15, repeat: false, side: "defense", weight: 1, autoFirstDown: true },
  };
  const PENALTY_BASE_RATE = 0.085; // ~8.5% of plays draw a flag (close to real CFB ~6-9%)

  /**
   * Roll for a penalty. Returns null OR a penalty object.
   * @param {object} args { random, situation, playKind, disciplineFloor (0-100) }
   */
  function rollPenalty(args) {
    const random = args.random || Math.random;
    const disc = clamp(Number(args.disciplineFloor) || 50, 0, 100);
    // Lower discipline → higher rate.
    const rate = PENALTY_BASE_RATE * (1.4 - disc / 100);
    if (random() > rate) return null;

    // Filter penalties by play context.
    const candidates = Object.entries(PENALTIES).filter(([k]) => {
      if (k === "delay_of_game" && args.playKind !== "rush" && args.playKind !== "pass") return false;
      if (k === "pass_interference_def" && args.playKind !== "pass") return false;
      if (k === "pass_interference_off" && args.playKind !== "pass") return false;
      if (k === "false_start" && args.playKind !== "rush" && args.playKind !== "pass") return false;
      return true;
    });

    const total = candidates.reduce((s, [, p]) => s + p.weight, 0);
    let roll = random() * total;
    for (const [name, p] of candidates) {
      roll -= p.weight;
      if (roll <= 0) {
        return {
          name,
          yards: p.yards,
          side: p.side,
          repeat: !!p.repeat,
          autoFirstDown: !!p.autoFirstDown,
          ejection: !!p.ejection,
          reasonCodes: [`penalty_${name}`],
        };
      }
    }
    return null;
  }

  // ── Weather ────────────────────────────────────────────────────────────
  const WEATHER_PROFILES = {
    clear:       { deepPassMult: 1.00, fumbleMult: 1.00, kickAccuracyMult: 1.00, label: "Clear" },
    light_rain:  { deepPassMult: 0.92, fumbleMult: 1.20, kickAccuracyMult: 0.95, label: "Light Rain" },
    heavy_rain:  { deepPassMult: 0.75, fumbleMult: 1.60, kickAccuracyMult: 0.85, label: "Heavy Rain" },
    snow:        { deepPassMult: 0.70, fumbleMult: 1.50, kickAccuracyMult: 0.80, label: "Snow" },
    wind_15:     { deepPassMult: 0.85, fumbleMult: 1.05, kickAccuracyMult: 0.85, label: "15mph Wind" },
    wind_25:     { deepPassMult: 0.65, fumbleMult: 1.10, kickAccuracyMult: 0.65, label: "25mph Wind" },
    cold:        { deepPassMult: 0.95, fumbleMult: 1.10, kickAccuracyMult: 0.95, label: "Below Freezing" },
  };

  function applyWeatherToPassYards(yards, depth, weather) {
    const w = WEATHER_PROFILES[weather] || WEATHER_PROFILES.clear;
    if (depth === "deep" || depth === "intermediate") {
      return Math.round(yards * w.deepPassMult);
    }
    return yards;
  }
  function fumbleChanceWithWeather(baseChance, weather) {
    const w = WEATHER_PROFILES[weather] || WEATHER_PROFILES.clear;
    return clamp(baseChance * w.fumbleMult, 0, 0.5);
  }
  function kickAccuracyMultiplier(weather) {
    const w = WEATHER_PROFILES[weather] || WEATHER_PROFILES.clear;
    return w.kickAccuracyMult;
  }
  function weatherReasonCode(weather) {
    if (!weather || weather === "clear") return null;
    return `weather_${weather}`;
  }

  // ── Fatigue propagation ────────────────────────────────────────────────
  /**
   * Update a per-team fatigue score across a drive. Returns the new fatigue
   * value (0-100, higher = more tired) + reason codes if a threshold was hit.
   */
  function updateFatigue(args) {
    const cur = clamp(Number(args.currentFatigue) || 0, 0, 100);
    const playsThisDrive = Number(args.playsThisDrive) || 0;
    const tempo = args.tempo || "balanced"; // "no_huddle" | "fast" | "balanced" | "huddle"
    const conditioningFloor = clamp(Number(args.conditioningFloor) || 60, 30, 100);
    const isOffense = !!args.isOffense;

    let delta = 1.2;
    if (tempo === "no_huddle") delta = 2.4;
    else if (tempo === "fast") delta = 1.8;
    else if (tempo === "huddle") delta = 0.9;

    // Conditioning resists accumulation.
    delta *= (1.4 - conditioningFloor / 100);
    // Defense fatigues faster than offense per drive (more reactive movement).
    if (!isOffense) delta *= 1.15;

    const next = clamp(cur + delta, 0, 100);
    const reasonCodes = [];
    if (next >= 70 && cur < 70) reasonCodes.push(isOffense ? "offense_fatigue_high" : "defense_fatigue_high");
    if (next >= 90 && cur < 90) reasonCodes.push(isOffense ? "offense_gassed" : "defense_gassed");
    return { fatigue: next, reasonCodes };
  }

  /**
   * Convert fatigue into a per-play yards multiplier for the OFFENSE.
   * High defense fatigue helps offense; high offense fatigue hurts offense.
   */
  function fatigueYardsMultiplier(args) {
    const off = clamp(Number(args.offenseFatigue) || 0, 0, 100);
    const def = clamp(Number(args.defenseFatigue) || 0, 0, 100);
    // Each side contributes ±5% at the extremes.
    const offDrag = off > 60 ? -((off - 60) / 40) * 0.05 : 0;
    const defLift = def > 60 ?  ((def - 60) / 40) * 0.06 : 0;
    return 1 + offDrag + defLift;
  }

  /**
   * Recovery between drives. Returns new fatigue scores.
   */
  function recoverBetweenDrives(args) {
    const random = args.random || Math.random;
    const off = clamp(Number(args.offenseFatigue) || 0, 0, 100);
    const def = clamp(Number(args.defenseFatigue) || 0, 0, 100);
    // Recover 8-14 between drives.
    const rec = Math.round(rng(random, 8, 14));
    return {
      offenseFatigue: clamp(off - rec, 0, 100),
      defenseFatigue: clamp(def - rec, 0, 100),
      recovered: rec,
    };
  }

  // ── Special Teams Returns ──────────────────────────────────────────────
  /**
   * Resolve a punt return. Returns net yards (replacing or augmenting the
   * raw punt distance computed by play-resolver).
   *
   * @param {object} args { puntDistance, returnerSpeed (0-99), coverageRating (0-99), random }
   */
  function resolvePuntReturn(args) {
    const random = args.random || Math.random;
    const punt = Number(args.puntDistance) || 40;
    const speed = clamp(Number(args.returnerSpeed) || 70, 1, 99);
    const cov = clamp(Number(args.coverageRating) || 70, 1, 99);
    const fairCatchProb = clamp(0.35 + (cov - speed) / 200, 0.1, 0.7);
    if (random() < fairCatchProb) {
      return { returnYards: 0, fairCatch: true, reasonCodes: ["punt_fair_catch"] };
    }
    const advantage = (speed - cov) / 99;
    const baseReturn = clamp(rng(random, 4, 14) + advantage * 18, -3, 95);
    const tdRoll = random();
    if (tdRoll < clamp(0.005 + Math.max(0, advantage) * 0.015, 0, 0.04)) {
      return {
        returnYards: Math.round(punt - 5 + 50), // simulate full return for ST TD math
        touchdown: true,
        reasonCodes: ["punt_return_touchdown"],
      };
    }
    const ret = Math.round(baseReturn);
    return {
      returnYards: ret,
      reasonCodes: ret >= 20 ? ["explosive_punt_return"] : (ret < 0 ? ["punt_return_loss"] : []),
    };
  }

  /**
   * Resolve a kickoff return. Caller decides starting yardsToGoal.
   */
  function resolveKickoffReturn(args) {
    const random = args.random || Math.random;
    const speed = clamp(Number(args.returnerSpeed) || 70, 1, 99);
    const cov = clamp(Number(args.coverageRating) || 70, 1, 99);
    const touchbackProb = clamp(0.45 + (cov - speed) / 250, 0.2, 0.85);
    if (random() < touchbackProb) {
      return { startYardsToGoal: 75, touchback: true, reasonCodes: ["kickoff_touchback"] };
    }
    const advantage = (speed - cov) / 99;
    const ret = clamp(Math.round(rng(random, 18, 32) + advantage * 25), 5, 100);
    if (random() < clamp(0.004 + Math.max(0, advantage) * 0.012, 0, 0.03)) {
      return { startYardsToGoal: 0, touchdown: true, returnYards: 100, reasonCodes: ["kickoff_return_touchdown"] };
    }
    return { startYardsToGoal: clamp(100 - ret, 5, 95), returnYards: ret, reasonCodes: ret >= 35 ? ["explosive_kickoff_return"] : [] };
  }

  global.CGM_EXTRAS = {
    PENALTIES, PENALTY_BASE_RATE,
    WEATHER_PROFILES,
    rollPenalty,
    applyWeatherToPassYards,
    fumbleChanceWithWeather,
    kickAccuracyMultiplier,
    weatherReasonCode,
    updateFatigue,
    fatigueYardsMultiplier,
    recoverBetweenDrives,
    resolvePuntReturn,
    resolveKickoffReturn,
  };
})(window);
