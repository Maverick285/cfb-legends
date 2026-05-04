// DEV-1: Player Development Engine
// Spec: ai-pack/CFB_FM_NEXT_CORE_IMPLEMENTATION_SPECS/31_PLAYER_DEVELOPMENT_PRACTICE_AND_TEAM_VIBE_ENGINE_SPEC.md
//
// Pure functions that take a player snapshot + context and return:
//   - { gains: {attrKey: delta}, events: [DevelopmentEvent], reasonCodes }
//
// Compatible with the existing 36-key generic attrs and `pot`/`devCurve`/
// `hidden` fields on player profiles. The legacy
// `simulateEntityDrivenDevelopmentTick` in app.js still drives the loop;
// this module supplies the "real" attribute-class-aware tick + breakout/
// regression/bust event detection on top.

(function initDevEngine(global) {
  const PHYSICAL_KEYS  = ["pace","acceleration","agility","strength","stamina","balance","jumping"];
  const TECHNICAL_KEYS = ["throwing","catching","routeRunning","ballCarrying","passBlocking","runBlocking","tackling","passRush","coverage","kicking","punting","longSnapping","technique","firstTouch"];
  const IQ_KEYS        = ["decisions","anticipation","positioning","vision","offTheBall","concentration"];
  const MENTAL_KEYS    = ["composure","determination","workRate","leadership","aggression","bravery","flair","teamwork"];

  const ATTR_CLASS = {};
  PHYSICAL_KEYS.forEach((k) => { ATTR_CLASS[k] = "physical"; });
  TECHNICAL_KEYS.forEach((k) => { ATTR_CLASS[k] = "technical"; });
  IQ_KEYS.forEach((k) => { ATTR_CLASS[k] = "iq"; });
  MENTAL_KEYS.forEach((k) => { ATTR_CLASS[k] = "mental"; });

  // Map year string → physical maturity points (0-100). Older players are more
  // physically mature, leaving less room for raw athletic growth but more room
  // for technical/IQ growth via reps.
  const YEAR_MATURITY = { FR: 35, SO: 55, JR: 75, SR: 88, GR: 95 };

  const CURVE_TO_PROFILE = {
    "Steady Developer":  { breakoutChance: 0.06, regressionRisk: 0.05, stagnationRisk: 0.18, growthMultiplier: 1.00 },
    "Early Bloomer":     { breakoutChance: 0.10, regressionRisk: 0.04, stagnationRisk: 0.10, growthMultiplier: 1.10 },
    "Late Bloomer":      { breakoutChance: 0.14, regressionRisk: 0.06, stagnationRisk: 0.22, growthMultiplier: 1.00 },
    "Boom/Bust":         { breakoutChance: 0.18, regressionRisk: 0.12, stagnationRisk: 0.20, growthMultiplier: 1.05 },
    "BoomBust":          { breakoutChance: 0.18, regressionRisk: 0.12, stagnationRisk: 0.20, growthMultiplier: 1.05 },
    "High Floor":        { breakoutChance: 0.05, regressionRisk: 0.03, stagnationRisk: 0.15, growthMultiplier: 0.95 },
    "Raw Tools Prospect":{ breakoutChance: 0.16, regressionRisk: 0.08, stagnationRisk: 0.30, growthMultiplier: 0.95 },
    "Physically Maxed":  { breakoutChance: 0.04, regressionRisk: 0.05, stagnationRisk: 0.25, growthMultiplier: 0.90 },
  };

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function attrClass(key) { return ATTR_CLASS[key] || "technical"; }

  /**
   * Build a DevelopmentProfile snapshot for a player.
   * @param {object} player    Player record (existing app.js shape)
   * @returns {object} profile
   */
  function computeDevelopmentProfile(player) {
    if (!player) return null;
    const curveDef = CURVE_TO_PROFILE[player.devCurve] || CURVE_TO_PROFILE["Steady Developer"];
    const hidden = player.hidden || {};
    const workEthic = Number.isFinite(hidden.workEthic) ? hidden.workEthic : 10;
    const coachability = Number.isFinite(hidden.coachability) ? hidden.coachability : 10;
    const ovr = Number(player.ovr) || 70;
    const pot = Number(player.pot) || ovr;
    const potentialGap = Math.max(0, pot - ovr);
    const physicalMaturity = YEAR_MATURITY[player.year] || 60;
    return {
      curve: player.devCurve || "Steady Developer",
      growthMultiplier: curveDef.growthMultiplier,
      // breakout chance scales up if the potential gap is wide AND work ethic is high
      breakoutChance: clamp(curveDef.breakoutChance + (potentialGap * 0.005) + ((workEthic - 10) * 0.005), 0.01, 0.40),
      regressionRisk: clamp(curveDef.regressionRisk + ((10 - workEthic) * 0.008) + (player.year === "SR" ? 0.05 : 0), 0.01, 0.35),
      stagnationRisk: clamp(curveDef.stagnationRisk + (potentialGap < 4 ? 0.10 : 0) - ((coachability - 10) * 0.01), 0.02, 0.50),
      physicalMaturity,
      potentialGap,
      coachabilityLift: clamp(((coachability - 10) * 0.04) + 1.0, 0.7, 1.4),
      workEthicLift: clamp(((workEthic - 10) * 0.04) + 1.0, 0.7, 1.5),
      // Per-class growth weights (sum ~ 1.0). Raw rookies grow physical; older
      // players grow technical/IQ via reps.
      classWeights: classWeightsForMaturity(physicalMaturity),
    };
  }

  function classWeightsForMaturity(physicalMaturity) {
    if (physicalMaturity <= 45) return { physical: 0.45, technical: 0.30, iq: 0.15, mental: 0.10 };
    if (physicalMaturity <= 65) return { physical: 0.30, technical: 0.35, iq: 0.20, mental: 0.15 };
    if (physicalMaturity <= 80) return { physical: 0.18, technical: 0.40, iq: 0.27, mental: 0.15 };
    return { physical: 0.10, technical: 0.35, iq: 0.35, mental: 0.20 };
  }

  /**
   * Run a weekly development tick on one player.
   *
   * @param {object} player Player record (mutated in place: attrs, ovr left for caller)
   * @param {object} ctx
   *   - random: () => [0,1)
   *   - keyAttrsForPosition: string[] — boost gains in these
   *   - practiceCategoryWeights?: { physical, technical, iq, mental } (sums ~1)
   *   - practiceIntensity?: -0.3 .. +0.3 modifier
   *   - moraleScore: 20-98
   *   - teamVibe?: 0-100
   *   - facilityBoost?: 0-30
   *   - coachTeaching: 1-20
   *   - schoolSupport: 1-20
   *   - paceFactor: 0.7-1.6 (sandbox progressionPacePercent)
   *   - allowEvents?: bool — emit breakout/regression/bust events
   * @returns {object} { gains: {attr: +1}, regressions: {attr: -1}, events, reasonCodes }
   */
  function runWeeklyDevTick(player, ctx) {
    const profile = computeDevelopmentProfile(player);
    if (!profile || !player) return { gains: {}, regressions: {}, events: [], reasonCodes: [] };
    const random = typeof ctx.random === "function" ? ctx.random : Math.random;
    const events = [];
    const reasonCodes = [];
    const gains = {};
    const regressions = {};

    const moraleScore = Number.isFinite(ctx.moraleScore) ? ctx.moraleScore : 65;
    const teamVibe = Number.isFinite(ctx.teamVibe) ? ctx.teamVibe : 60;
    const coachTeaching = Number.isFinite(ctx.coachTeaching) ? ctx.coachTeaching : 12;
    const schoolSupport = Number.isFinite(ctx.schoolSupport) ? ctx.schoolSupport : 12;
    const facilityBoost = Number.isFinite(ctx.facilityBoost) ? ctx.facilityBoost : 0;
    const paceFactor = clamp(Number.isFinite(ctx.paceFactor) ? ctx.paceFactor : 1.0, 0.6, 1.6);
    const intensity = clamp(Number.isFinite(ctx.practiceIntensity) ? ctx.practiceIntensity : 0, -0.3, 0.3);
    const practiceWeights = ctx.practiceCategoryWeights || profile.classWeights;
    const keyAttrs = new Set(ctx.keyAttrsForPosition || []);

    // Base growth budget. Mirrors spec §"Weekly Development Tick" formula.
    const weeklyGain =
      0.35
      + ((coachTeaching - 10) * 0.05)
      + ((schoolSupport - 10) * 0.04)
      + ((moraleScore - 65) * 0.012)
      + ((teamVibe - 60) * 0.008)
      + (facilityBoost * 0.025)
      + intensity;
    const adjusted = weeklyGain
      * profile.growthMultiplier
      * profile.workEthicLift
      * profile.coachabilityLift
      * paceFactor;
    const variance = (random() - 0.5) * 0.30;
    const budget = Math.max(0, adjusted + variance);
    const expectedGains = Math.round(budget);

    // Convert budget into attribute picks weighted by attribute-class.
    if (expectedGains > 0 && profile.potentialGap > 0) {
      for (let i = 0; i < expectedGains; i += 1) {
        const cls = pickWeighted(random, mergeWeights(profile.classWeights, practiceWeights));
        const candidates = candidatesForClass(player, cls, keyAttrs);
        if (!candidates.length) continue;
        const pick = candidates[Math.floor(random() * candidates.length)];
        gains[pick] = (gains[pick] || 0) + 1;
        reasonCodes.push(`dev_${cls}_gain`);
      }
    }

    // Stagnation roll: if player is mostly maxed and rolls bad, no gain.
    if (profile.potentialGap < 3 && random() < profile.stagnationRisk) {
      reasonCodes.push("dev_stagnation");
    }

    // Regression roll: pull one attr down. More likely on SR seasons or low
    // morale or low work ethic (already baked into profile.regressionRisk).
    if (random() < profile.regressionRisk) {
      const cls = pickWeighted(random, profile.classWeights);
      const candidates = candidatesForClass(player, cls, new Set());
      if (candidates.length) {
        const pick = candidates[Math.floor(random() * candidates.length)];
        regressions[pick] = (regressions[pick] || 0) - 1;
        reasonCodes.push(`dev_${cls}_regression`);
      }
    }

    // Breakout event detection: high gain week + high breakout chance + young
    // player with potential gap ⇒ emit a breakout event the inbox can show.
    if (ctx.allowEvents && expectedGains >= 2 && profile.potentialGap >= 6 && random() < profile.breakoutChance) {
      events.push({
        type: "breakout",
        playerId: player.id,
        playerName: player.name,
        position: player.position,
        magnitude: expectedGains,
        ovrBefore: Number(player.ovr) || 70,
        message: `${player.name} (${player.position}) had a breakout practice week.`,
        reasonCodes: ["dev_breakout"],
      });
    }

    // Bust event: SR or older with negative regression and no gains.
    if (ctx.allowEvents && expectedGains === 0 && Object.keys(regressions).length > 0 && (player.year === "SR" || player.year === "GR")) {
      events.push({
        type: "regression_warning",
        playerId: player.id,
        playerName: player.name,
        position: player.position,
        message: `${player.name} (${player.position}) lost a step this week.`,
        reasonCodes: ["dev_late_career_decline"],
      });
    }

    return { gains, regressions, events, reasonCodes };
  }

  /**
   * Run an offseason development tick: bigger budget, more physical growth.
   */
  function runOffseasonDevTick(player, ctx) {
    const profile = computeDevelopmentProfile(player);
    if (!profile) return { gains: {}, regressions: {}, events: [], reasonCodes: [] };
    const random = typeof ctx.random === "function" ? ctx.random : Math.random;
    const moraleScore = Number.isFinite(ctx.moraleScore) ? ctx.moraleScore : 65;
    const facilityBoost = Number.isFinite(ctx.facilityBoost) ? ctx.facilityBoost : 0;
    const coachTeaching = Number.isFinite(ctx.coachTeaching) ? ctx.coachTeaching : 12;
    const baseBudget = 2.4
      + ((coachTeaching - 10) * 0.18)
      + ((moraleScore - 65) * 0.02)
      + (facilityBoost * 0.10);
    const adjusted = baseBudget * profile.growthMultiplier * profile.workEthicLift * profile.coachabilityLift;
    const expectedGains = Math.max(0, Math.min(8, Math.round(adjusted + (random() - 0.5) * 1.2)));
    const gains = {};
    const reasonCodes = [];
    const events = [];
    const keyAttrs = new Set(ctx.keyAttrsForPosition || []);
    for (let i = 0; i < expectedGains; i += 1) {
      const cls = pickWeighted(random, profile.classWeights);
      const candidates = candidatesForClass(player, cls, keyAttrs);
      if (!candidates.length) continue;
      const pick = candidates[Math.floor(random() * candidates.length)];
      gains[pick] = (gains[pick] || 0) + 1;
      reasonCodes.push(`offseason_${cls}_gain`);
    }
    if (expectedGains >= 5 && profile.potentialGap >= 5 && random() < profile.breakoutChance * 1.4) {
      events.push({
        type: "offseason_breakout",
        playerId: player.id,
        playerName: player.name,
        position: player.position,
        magnitude: expectedGains,
        ovrBefore: Number(player.ovr) || 70,
        message: `${player.name} (${player.position}) had a breakout offseason.`,
        reasonCodes: ["dev_offseason_breakout"],
      });
    }
    return { gains, regressions: {}, events, reasonCodes };
  }

  // ── Helpers ──────────────────────────────────────────────────────────────
  function mergeWeights(a, b) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    const merged = {};
    keys.forEach((k) => {
      merged[k] = (a[k] || 0) * 0.6 + (b[k] || 0) * 0.4;
    });
    return merged;
  }

  function pickWeighted(random, weights) {
    const entries = Object.entries(weights).filter(([, w]) => w > 0);
    const total = entries.reduce((s, [, w]) => s + w, 0);
    if (total <= 0) return entries[0] ? entries[0][0] : "technical";
    const roll = random() * total;
    let acc = 0;
    for (const [key, w] of entries) {
      acc += w;
      if (roll <= acc) return key;
    }
    return entries[entries.length - 1][0];
  }

  function candidatesForClass(player, cls, keySet) {
    const all = cls === "physical" ? PHYSICAL_KEYS
              : cls === "technical" ? TECHNICAL_KEYS
              : cls === "iq" ? IQ_KEYS
              : MENTAL_KEYS;
    const attrs = player.attrs || {};
    // Prefer key-position attrs first (they're more meaningful), then fall back
    // to any non-maxed attr in the class.
    const keyMatches = all.filter((k) => keySet.has(k) && (attrs[k] || 10) < 19);
    if (keyMatches.length) return keyMatches;
    return all.filter((k) => (attrs[k] || 10) < 19);
  }

  global.CGM_DEV_ENGINE = {
    PHYSICAL_KEYS,
    TECHNICAL_KEYS,
    IQ_KEYS,
    MENTAL_KEYS,
    ATTR_CLASS,
    YEAR_MATURITY,
    CURVE_TO_PROFILE,
    attrClass,
    computeDevelopmentProfile,
    runWeeklyDevTick,
    runOffseasonDevTick,
  };
})(window);
