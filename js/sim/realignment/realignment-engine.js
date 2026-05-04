// REALIGN-1: Conference Realignment Engine
// Spec: 44_SCHEDULING_CONFERENCES_REALIGNMENT_AND_POSTSEASON_SPEC.md §"Realignment"
//
// Each offseason, score every program for "realignment pressure" using:
//   - revenue gap vs conference average
//   - conference instability (recent moves)
//   - school ambition (prestige + recent success)
//   - geography mismatch
//   - media value (rough proxy: prestige × fanBase tier)
//   - playoff access (P4 vs G5 tier delta)
//   - rivalry concerns (negative pressure)
//
// High-pressure programs receive invitations from conferences a tier above.
// Receiving conferences may decline if they're already full or the candidate
// doesn't add value. Each move emits a historic-tier event.
//
// Pure: caller passes the world snapshot + RNG; module returns a list of moves
// to apply. Caller is responsible for mutating program.conference + recording
// the move in history.

(function initRealignment(global) {
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  // Conference tier order (higher index = more prestigious money tier).
  const TIER_ORDER = ["Indep", "G5", "G5+", "P4"];
  const MIN_CONF_SIZE = 8;
  const MAX_CONF_SIZE = 18;

  // ── Pressure scoring ────────────────────────────────────────────────────
  /**
   * Score a single program's realignment pressure 0-100.
   * @param {object} args { program, conferenceMap, recentSeasonRecord, prestige, fanBaseScore }
   */
  function computeRealignmentPressure(args) {
    const program = args.program || {};
    const conferenceMap = args.conferenceMap || {};
    const conf = conferenceMap[program.conference] || { tier: "G5", short: "?" };
    const reasonCodes = [];
    let pressure = 0;

    const prestige = clamp(Number(args.prestige || program.prestige) || 60, 1, 99);
    const fanBaseScore = clamp(Number(args.fanBaseScore) || 50, 0, 100);
    const recentWinPct = clamp(Number(args.recentWinPct) || 0.5, 0, 1);

    // Ambition: high-prestige schools in low-tier conferences chafe.
    const tierIndex = TIER_ORDER.indexOf(conf.tier || "G5");
    const tierGap = (TIER_ORDER.length - 1) - tierIndex; // 0 if P4, 3 if Indep
    if (tierGap > 0) {
      // Re-tuned (DL-20260503-15): every (prestige-50) point above the floor
      // counts. Stronger weight so high-prestige G5 schools actually pressure
      // their way to P4. Previous 0.4 made max ambition lift only ~22pts.
      const ambitionLift = (prestige - 50) * 0.7 * tierGap;
      if (ambitionLift > 0) {
        pressure += ambitionLift;
        reasonCodes.push("ambition_above_conference");
      }
    }

    // Media value (proxy: prestige × fanBase). High-media schools attract higher-tier offers.
    const mediaScore = (prestige + fanBaseScore) / 2;
    if (mediaScore >= 70 && tierGap > 0) {
      pressure += (mediaScore - 70) * 0.5;
      reasonCodes.push("strong_media_value");
    }

    // Recent success: above-average wins add pressure.
    if (recentWinPct >= 0.55) {
      pressure += (recentWinPct - 0.55) * 80;
      reasonCodes.push("recent_success");
    } else if (recentWinPct < 0.35) {
      pressure -= 6;
      reasonCodes.push("recent_struggles");
    }

    // Conference instability: recent moves IN this conference.
    const recentMoves = Number(args.recentMovesInConf) || 0;
    if (recentMoves >= 2) {
      pressure += recentMoves * 4;
      reasonCodes.push("conference_unstable");
    }

    // Geography: if the program is geographically isolated from its conference.
    if (args.geographyMismatch) {
      pressure += 10;
      reasonCodes.push("geography_mismatch");
    }

    // Rivalry concerns: a move would break protected rivalries → negative pressure.
    if (Number(args.rivalriesAtRisk) >= 2) {
      pressure -= Number(args.rivalriesAtRisk) * 3;
      reasonCodes.push("rivalries_at_risk");
    }

    // Booster pressure (positive — boosters often want more revenue).
    if (Number(args.boosterPressure || 0) >= 70) {
      pressure += (args.boosterPressure - 70) * 0.3;
      reasonCodes.push("booster_pressure");
    }

    return {
      pressure: clamp(Math.round(pressure), 0, 100),
      band: pressure >= 70 ? "moving" : pressure >= 50 ? "rumored" : pressure >= 30 ? "watch" : "stable",
      reasonCodes,
      currentTier: conf.tier,
    };
  }

  // ── Conference fit scoring (does the conf want this program?) ───────────
  /**
   * Score how attractive a candidate is to a target conference.
   * @param {object} args { candidate, targetConference, currentMembers }
   */
  function scoreConferenceFit(args) {
    const cand = args.candidate || {};
    const target = args.targetConference || {};
    const members = args.currentMembers || [];
    const reasonCodes = [];
    let score = 0;

    // Size cap
    if (members.length >= MAX_CONF_SIZE) {
      return { score: -100, fit: "rejected_full", reasonCodes: ["conference_full"] };
    }
    // Prestige fit: target's average member prestige vs candidate's
    const avgMemberPrestige = members.length
      ? members.reduce((s, m) => s + (m.prestige || 60), 0) / members.length
      : 60;
    const prestigeDelta = (cand.prestige || 60) - avgMemberPrestige;
    if (prestigeDelta >= -5) score += 20;
    else if (prestigeDelta >= -15) score += 8;
    else { score -= 10; reasonCodes.push("below_conference_floor"); }

    // Media value
    const mediaScore = ((cand.prestige || 60) + (cand.fanBaseScore || 50)) / 2;
    if (mediaScore >= 75) { score += 15; reasonCodes.push("media_addition"); }
    else if (mediaScore >= 65) { score += 8; }

    // Geographic fit (caller passes a coarse 0-1 fit score).
    if (Number.isFinite(cand.geoFit)) {
      score += (cand.geoFit - 0.5) * 12;
      if (cand.geoFit >= 0.7) reasonCodes.push("geo_fit_strong");
      if (cand.geoFit < 0.3) reasonCodes.push("geo_fit_weak");
    }

    // Tier compatibility: target won't take a program more than 1 tier below.
    const targetTierIdx = TIER_ORDER.indexOf(target.tier || "G5");
    const candTierIdx = TIER_ORDER.indexOf(cand.currentTier || "G5");
    if (candTierIdx >= 0 && candTierIdx < targetTierIdx - 1) {
      score -= 15;
      reasonCodes.push("tier_mismatch");
    }

    return {
      score: Math.round(score),
      fit: score >= 25 ? "strong" : score >= 10 ? "viable" : score >= -5 ? "borderline" : "rejected",
      reasonCodes,
    };
  }

  // ── Resolution: who moves where ─────────────────────────────────────────
  /**
   * Run a full offseason realignment cycle.
   *
   * @param {object} args
   *   - programs: [{ id, name, prestige, conference, fanBaseScore }]
   *   - conferences: { id: { id, name, short, tier } }
   *   - prevWinPctById: { programId: 0..1 }   (last season W%)
   *   - recentMovesByConf: { confId: int }    (moves in past 3 years)
   *   - boosterPressureById: { programId: 0..100 }
   *   - random: () => [0,1)
   *   - maxMovesPerCycle: cap on total moves (default 6)
   * @returns {object} { moves: [{programId, fromConf, toConf, year, reasonCodes}], summary }
   */
  function runOffseasonRealignment(args) {
    const programs = args.programs || [];
    const conferences = args.conferences || {};
    const random = args.random || Math.random;
    const maxMoves = args.maxMovesPerCycle || 6;
    const year = args.year || new Date().getFullYear();
    const minConfSize = Number.isFinite(args.minConfSize) ? args.minConfSize : MIN_CONF_SIZE;

    // Score every program's pressure.
    const pressures = programs.map((p) => {
      const recentWinPct = (args.prevWinPctById || {})[p.id] || 0.5;
      const recentMovesInConf = (args.recentMovesByConf || {})[p.conference] || 0;
      const boosterPressure = (args.boosterPressureById || {})[p.id] || 50;
      const eval0 = computeRealignmentPressure({
        program: p,
        conferenceMap: conferences,
        recentWinPct,
        prestige: p.prestige,
        fanBaseScore: p.fanBaseScore || 50,
        recentMovesInConf,
        boosterPressure,
      });
      return { program: p, ...eval0 };
    });

    // Pick top-pressure candidates that exceed move threshold.
    // Re-tuned (DL-20260503-15): 50 (was 60) so realistic ambitious G5+ schools
    // qualify. Acceptance still gated by conference fit + capacity.
    const candidates = pressures
      .filter((c) => c.pressure >= 50)
      .sort((a, b) => b.pressure - a.pressure)
      .slice(0, maxMoves * 2); // overscan, will be filtered by acceptance

    const conferenceMembers = {};
    programs.forEach((p) => {
      if (!conferenceMembers[p.conference]) conferenceMembers[p.conference] = [];
      conferenceMembers[p.conference].push(p);
    });

    const moves = [];
    const movedSchools = new Set();
    const updatedConfMembers = JSON.parse(JSON.stringify(conferenceMembers));

    for (const cand of candidates) {
      if (moves.length >= maxMoves) break;
      if (movedSchools.has(cand.program.id)) continue;

      // Try every conference at a higher tier than current. Schools can
      // sometimes leap (G5 → P4), so we don't restrict to "one tier above."
      const currentTierIdx = TIER_ORDER.indexOf(cand.currentTier);
      if (currentTierIdx >= TIER_ORDER.length - 1) continue;
      const targetConfs = Object.values(conferences).filter((c) => {
        const ti = TIER_ORDER.indexOf(c.tier || "G5");
        return ti > currentTierIdx;
      });
      let bestTarget = null;
      let bestScore = -Infinity;
      for (const tc of targetConfs) {
        const members = updatedConfMembers[tc.id] || [];
        if (members.length >= MAX_CONF_SIZE) continue;
        const fit = scoreConferenceFit({
          candidate: { ...cand.program, currentTier: cand.currentTier, geoFit: 0.5 + (random() - 0.5) * 0.4 },
          targetConference: tc,
          currentMembers: members,
        });
        if (fit.score > bestScore) {
          bestScore = fit.score;
          bestTarget = { conf: tc, fit };
        }
      }
      if (!bestTarget || bestTarget.fit.score < 10) continue;

      // Acceptance: deterministic if score ≥ 25, probabilistic otherwise.
      const acceptanceProb = bestTarget.fit.score >= 25 ? 0.9
                          : bestTarget.fit.score >= 15 ? 0.55
                          : 0.25;
      if (random() > acceptanceProb) continue;

      // Old conference must not drop below the configured min size.
      const fromMembers = updatedConfMembers[cand.program.conference] || [];
      if (fromMembers.length <= minConfSize) {
        continue; // can't drain the source any further
      }

      const move = {
        programId: cand.program.id,
        programName: cand.program.shortName || cand.program.name,
        fromConf: cand.program.conference,
        toConf: bestTarget.conf.id,
        year,
        pressure: cand.pressure,
        reasonCodes: [...cand.reasonCodes, ...bestTarget.fit.reasonCodes],
      };
      moves.push(move);
      movedSchools.add(cand.program.id);
      updatedConfMembers[cand.program.conference] = fromMembers.filter((m) => m.id !== cand.program.id);
      if (!updatedConfMembers[bestTarget.conf.id]) updatedConfMembers[bestTarget.conf.id] = [];
      updatedConfMembers[bestTarget.conf.id].push(cand.program);
    }

    return {
      moves,
      summary: {
        year,
        movesCount: moves.length,
        candidatesEvaluated: candidates.length,
        topPressure: pressures.sort((a, b) => b.pressure - a.pressure).slice(0, 5).map((p) => ({
          programId: p.program.id, pressure: p.pressure, band: p.band,
        })),
      },
    };
  }

  /**
   * Apply moves to a programs array (mutates each program's `conference`).
   * Returns the input array for chaining.
   */
  function applyMoves(programs, moves) {
    const byId = {};
    programs.forEach((p) => { byId[p.id] = p; });
    moves.forEach((m) => {
      const p = byId[m.programId];
      if (p) {
        p.conference = m.toConf;
        if (!Array.isArray(p.realignmentHistory)) p.realignmentHistory = [];
        p.realignmentHistory.push({ year: m.year, fromConf: m.fromConf, toConf: m.toConf });
      }
    });
    return programs;
  }

  global.CGM_REALIGNMENT = {
    TIER_ORDER, MIN_CONF_SIZE, MAX_CONF_SIZE,
    computeRealignmentPressure,
    scoreConferenceFit,
    runOffseasonRealignment,
    applyMoves,
  };
})(window);
