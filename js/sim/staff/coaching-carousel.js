// STAFF-1: Coaching Carousel
// Spec: ai-pack/CFB_FM_REMAINING_SYSTEM_SPECS/43_STAFF_RESPONSIBILITIES_AND_COACHING_CAROUSEL_IMPLEMENTATION_SPEC.md
//
// First slice: deterministic candidate-pool generation + hot-seat evaluation +
// offseason carousel that fires/hires/poaches AI school head coaches and
// coordinators. UI integration happens later — this is engine + reason codes.
//
// All functions are pure given (random, world). Mutates a `carouselState`
// passed in by the caller; never reaches into globals beyond the dependency
// declarations at the top.

(function initCoachingCarousel(global) {
  // ── Helpers ──────────────────────────────────────────────────────────────
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function pick(arr, r) { return arr[Math.floor(r() * arr.length)]; }
  function rngRange(r, min, max) { return min + r() * (max - min); }
  function deepFreeze(o) { return o; } // marker, not enforced

  const FIRST_NAMES = [
    "Marcus","Devon","Aaron","Dale","Vance","Raymond","Curtis","Mike","Hank",
    "Pete","Bobby","Coleman","Reggie","Dwight","Stan","Wayne","Eddie","Lance",
    "Rusty","Marv","Glen","Cody","Bryce","Garrett","Tate","Dak","Ronnie",
  ];
  const LAST_NAMES = [
    "Whitfield","Crouse","Bellamy","Holloway","Tate","McMillan","Aiken",
    "Vance","Dorsey","Kingsley","Hargrove","Lattimer","Stovall","Gentry",
    "Lockwood","Pendergrass","Kerrigan","Doyle","Marston","Calloway","Rooks",
    "Voss","Whitaker","Rinaldi","Sundberg","Hatcher","Truitt","Vinson",
  ];

  const ROLES = [
    "HC", "OC", "DC", "STC", "QB_COACH", "RB_COACH", "WR_COACH",
    "OL_COACH", "DL_COACH", "LB_COACH", "DB_COACH", "RECRUITING_COORDINATOR",
  ];

  const ATTR_KEYS = [
    "recruiting","evaluation","development","positionTeaching","tactical",
    "gamePlanning","playCalling","motivation","discipline","relationships",
    "analytics","nilPitch",
  ];
  const PERSONALITY_KEYS = [
    "ambition","loyalty","ego","integrity","patience","adaptability","pressureHandling",
  ];

  function makeRng(seed) {
    // Mix the seed up-front (xmur3) so consecutive seeds produce uncorrelated
    // streams. Without this, an LCG with seeds 400/401/402 returns ~identical
    // first values and the whole candidate pool collapses to one reputation.
    let h = seed >>> 0;
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h = (h ^ (h >>> 16)) >>> 0;
    let s = h || 1;
    return function next() {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  // ── Identity ─────────────────────────────────────────────────────────────
  function generateIdentity(r) {
    const first = pick(FIRST_NAMES, r);
    const last = pick(LAST_NAMES, r);
    const age = Math.round(rngRange(r, 32, 64));
    return { first, last, fullName: `${first} ${last}`, age };
  }

  function generateAttributes(r, role, reputation) {
    // Reputation lifts the floor; role tilts which attrs are central.
    const floor = clamp(40 + reputation * 0.4, 40, 80);
    const out = {};
    ATTR_KEYS.forEach((k) => {
      out[k] = Math.round(clamp(floor + rngRange(r, -15, 25), 1, 99));
    });
    // Role-specific lifts.
    if (role === "HC") { out.motivation += 8; out.relationships += 6; }
    if (role === "OC" || role === "DC") { out.tactical += 10; out.gamePlanning += 8; out.playCalling += 8; }
    if (role === "STC") { out.discipline += 10; }
    if (role === "RECRUITING_COORDINATOR") { out.recruiting += 14; out.evaluation += 8; out.nilPitch += 6; }
    if (role.endsWith("_COACH")) { out.positionTeaching += 12; out.development += 8; }
    Object.keys(out).forEach((k) => { out[k] = clamp(out[k], 1, 99); });
    return out;
  }

  function generatePersonality(r) {
    const out = {};
    PERSONALITY_KEYS.forEach((k) => {
      out[k] = Math.round(clamp(50 + rngRange(r, -30, 30), 1, 99));
    });
    return out;
  }

  function generateContractDemand(r, role, reputation) {
    // Salary in $K. HC top out around $9M = 9000K. Lower ranks scale down.
    const base = role === "HC" ? 1500
               : (role === "OC" || role === "DC") ? 700
               : role === "STC" ? 350
               : role.endsWith("_COACH") ? 250
               : 200;
    const repMult = 0.6 + (reputation / 100) * 1.6; // 0.6x to 2.2x
    const salary = Math.round(base * repMult * rngRange(r, 0.85, 1.25));
    const years = Math.round(rngRange(r, 2, 5));
    return {
      salaryK: salary,
      years,
      buyoutK: Math.round(salary * years * 0.45),
      title: role,
    };
  }

  /**
   * Generate a single staff candidate.
   * @param {object} args { seed, role, reputation? }
   */
  function generateCandidate(args) {
    const r = makeRng(args.seed);
    const role = args.role || pick(ROLES, r);
    const reputation = Number.isFinite(args.reputation) ? args.reputation : Math.round(rngRange(r, 35, 90));
    const id = `cand-${args.seed}-${role}`;
    return {
      id,
      identity: generateIdentity(r),
      role,
      reputation,
      attributes: generateAttributes(r, role, reputation),
      personality: generatePersonality(r),
      contractDemand: generateContractDemand(r, role, reputation),
      schoolId: null,
      careerGoal: pick(["climber","stable_lifer","retire_soon","championship_or_bust"], r),
    };
  }

  /**
   * Generate a candidate pool keyed by role.
   * @returns {object} { byRole: { HC: [...], OC: [...], ... }, all: [...] }
   */
  function generateCandidatePool(args) {
    const seed = args.seed;
    const perRole = args.perRole || 6;
    const out = { byRole: {}, all: [] };
    ROLES.forEach((role, ri) => {
      out.byRole[role] = [];
      for (let i = 0; i < perRole; i++) {
        const c = generateCandidate({ seed: seed + ri * 100 + i, role });
        out.byRole[role].push(c);
        out.all.push(c);
      }
    });
    return out;
  }

  // ── Hot Seat ─────────────────────────────────────────────────────────────
  /**
   * Compute hot-seat score 0-100 (higher = closer to firing).
   * Inputs: { wins, losses, expectedWins, tenureYears, boosterPressure (0-100) }
   * Spec triggers: poor performance, hot seat, scandal, booster pressure, etc.
   */
  function evaluateHotSeat(args) {
    const wins = Number(args.wins) || 0;
    const losses = Number(args.losses) || 0;
    const games = wins + losses;
    const expectedWins = Number.isFinite(args.expectedWins) ? args.expectedWins : Math.round(games * 0.55);
    const tenureYears = Number(args.tenureYears) || 1;
    const boosterPressure = clamp(Number(args.boosterPressure) || 50, 0, 100);
    const reasonCodes = [];

    let score = 0;
    const winShortfall = expectedWins - wins;
    if (winShortfall > 0) {
      score += winShortfall * 12;
      reasonCodes.push(`win_shortfall_${winShortfall}`);
    } else if (winShortfall < -2) {
      score -= Math.min(20, Math.abs(winShortfall) * 4);
      reasonCodes.push("overperformed_expectations");
    }
    if (games >= 8 && wins / games < 0.3) {
      score += 25;
      reasonCodes.push("losing_record_severe");
    }
    if (tenureYears <= 2 && winShortfall > 0) {
      score -= 15; // first-2-year buffer
      reasonCodes.push("early_tenure_buffer");
    }
    if (tenureYears >= 6 && winShortfall > 0) {
      score += 8;
      reasonCodes.push("long_tenure_no_excuse");
    }
    if (boosterPressure >= 75) {
      score += (boosterPressure - 75) * 0.6;
      reasonCodes.push("booster_pressure_high");
    } else if (boosterPressure <= 30) {
      score -= 8;
      reasonCodes.push("booster_pressure_low");
    }
    if (args.recentScandal) {
      score += 25;
      reasonCodes.push("recent_scandal");
    }

    return {
      score: clamp(Math.round(score), 0, 100),
      reasonCodes,
      band: score >= 70 ? "fire_imminent"
          : score >= 50 ? "hot_seat"
          : score >= 30 ? "watch"
          : "secure",
    };
  }

  // ── Carousel ─────────────────────────────────────────────────────────────
  function ensureCarouselState(state) {
    state.movements = state.movements || [];
    state.firedThisCycle = state.firedThisCycle || [];
    state.hiredThisCycle = state.hiredThisCycle || [];
    state.poachedThisCycle = state.poachedThisCycle || [];
    state.year = state.year || new Date().getFullYear();
    return state;
  }

  /**
   * Run an offseason carousel cycle for a list of school records.
   * @param {object} args
   *   - schools: [{ id, name, hcId, hcTenureYears, wins, losses, expectedWins, boosterPressure, prestige (0-100) }]
   *   - candidatePool: result from generateCandidatePool()
   *   - state: carousel state (mutated)
   *   - random: () => [0,1)
   * @returns {object} { fires, hires, poaches, eventCount }
   */
  function runOffseasonCarousel(args) {
    const schools = args.schools || [];
    const pool = args.candidatePool;
    const state = ensureCarouselState(args.state || {});
    const random = args.random || Math.random;
    if (!pool || !pool.byRole) throw new Error("runOffseasonCarousel: candidatePool required");

    const hcCandidates = pool.byRole.HC.slice().sort((a, b) => b.reputation - a.reputation);
    const fires = [];
    const hires = [];
    const poaches = [];

    schools.forEach((school) => {
      const hot = evaluateHotSeat({
        wins: school.wins,
        losses: school.losses,
        expectedWins: school.expectedWins,
        tenureYears: school.hcTenureYears,
        boosterPressure: school.boosterPressure,
      });
      const fireRoll = random();
      const fireProbability = hot.score >= 70 ? 0.85 : hot.score >= 50 ? 0.35 : hot.score >= 30 ? 0.05 : 0.0;
      if (fireRoll < fireProbability) {
        const fired = {
          schoolId: school.id,
          formerHcId: school.hcId,
          year: state.year,
          hotSeatScore: hot.score,
          reasonCodes: ["hc_fired", ...hot.reasonCodes],
        };
        fires.push(fired);
        state.firedThisCycle.push(fired);
        state.movements.push({ type: "fire", ...fired });

        // Hire — pull the best available candidate suited to the school's prestige.
        const cand = pickBestForSchool(hcCandidates, school);
        if (cand) {
          const hired = {
            schoolId: school.id,
            newHcId: cand.id,
            newHcName: cand.identity.fullName,
            reputation: cand.reputation,
            year: state.year,
            reasonCodes: ["hc_hired", `from_pool`, `rep_${cand.reputation}`],
          };
          hires.push(hired);
          state.hiredThisCycle.push(hired);
          state.movements.push({ type: "hire", ...hired });
          // Remove from pool so two schools don't get the same hire.
          const idx = hcCandidates.indexOf(cand);
          if (idx >= 0) hcCandidates.splice(idx, 1);
        }
      }
    });

    // Poaching: top OCs/DCs from successful AI schools may get HC offers.
    // Slice 1: simulate one poach per cycle if there's a "successful coordinator"
    // (school with wins >= expectedWins + 2) and an open HC slot.
    const successfulSchools = schools.filter((s) => (s.wins || 0) >= (s.expectedWins || 0) + 2);
    if (successfulSchools.length && fires.length) {
      const source = pick(successfulSchools, random);
      const dest = pick(fires, random);
      if (source.id !== dest.schoolId) {
        const poach = {
          fromSchoolId: source.id,
          toSchoolId: dest.schoolId,
          year: state.year,
          reasonCodes: ["coordinator_poached", `source_overperformed`],
        };
        poaches.push(poach);
        state.poachedThisCycle.push(poach);
        state.movements.push({ type: "poach", ...poach });
      }
    }

    state.year += 1;
    return { fires, hires, poaches, eventCount: state.movements.length };
  }

  function pickBestForSchool(candidates, school) {
    if (!candidates.length) return null;
    const prestige = clamp(Number(school.prestige) || 50, 0, 100);
    // Higher-prestige schools attract higher-rep candidates. Pick the candidate
    // whose reputation is closest to (prestige + 5).
    const target = prestige + 5;
    let best = candidates[0];
    let bestDelta = Math.abs(best.reputation - target);
    for (const c of candidates) {
      const d = Math.abs(c.reputation - target);
      if (d < bestDelta) { best = c; bestDelta = d; }
    }
    return best;
  }

  // ── Movement Effects ─────────────────────────────────────────────────────
  /**
   * Compute the downstream effects when a head coach leaves.
   * Returns risk markers the caller can apply to recruits/players/staff.
   */
  function computeStaffMovementEffects(args) {
    const departing = args.departingStaff || {};
    const incoming = args.incomingStaff || null;
    const reasonCodes = [];
    const markers = {
      recruitDecommitRiskBump: 0,
      playerPortalRiskBump: 0,
      schemeContinuity: incoming ? 0.4 : 0.2, // 0..1 — staff turnover hurts continuity
      stabilityIndexDelta: -8,
    };
    if (departing.role === "HC") {
      markers.recruitDecommitRiskBump = 25;
      markers.playerPortalRiskBump = 12;
      markers.schemeContinuity = incoming ? 0.3 : 0.1;
      markers.stabilityIndexDelta = -18;
      reasonCodes.push("hc_change_recruit_decommit_pressure", "hc_change_portal_pressure", "scheme_install_reset");
    } else if (departing.role === "OC" || departing.role === "DC") {
      markers.recruitDecommitRiskBump = 10;
      markers.playerPortalRiskBump = 5;
      markers.schemeContinuity = incoming ? 0.5 : 0.25;
      markers.stabilityIndexDelta = -10;
      reasonCodes.push("coordinator_change_scheme_uncertainty");
    } else if (departing.role && departing.role.endsWith("_COACH")) {
      markers.recruitDecommitRiskBump = 4;
      markers.playerPortalRiskBump = 2;
      markers.stabilityIndexDelta = -3;
      reasonCodes.push("position_coach_change_minor");
    }
    return { markers, reasonCodes };
  }

  global.CGM_CAROUSEL = {
    ROLES,
    ATTR_KEYS,
    PERSONALITY_KEYS,
    generateCandidate,
    generateCandidatePool,
    evaluateHotSeat,
    runOffseasonCarousel,
    computeStaffMovementEffects,
    ensureCarouselState,
  };
})(window);
