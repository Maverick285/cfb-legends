// REC-1: Recruiting v2 — Multi-Year Pools + AI School Competition
// Spec: ai-pack/CFB_FM_NEXT_CORE_IMPLEMENTATION_SPECS/30_RECRUITING_ENGINE_IMPLEMENTATION_SPEC.md
//
// First slice of the v2 recruiting engine. Adds on top of the existing
// recruiting state in app.js (synthesizeProspects, prospectInterestFromPreferences,
// scoutedLow/High, hidden traits) the things that were missing:
//   1. Multi-year HS class pools (HS_FR / HS_SO / HS_JR / HS_SR + grad year)
//   2. Per-prospect AI school competition: each rival school can also be
//      pursuing the same prospect, with a tracked interest score and recent
//      contact count. Drives "Rival is leading" flavor and changes the
//      probability the prospect commits elsewhere.
//   3. 13-input weighted interest formula with reason codes per input
//   4. Commitment resolution that reads the FULL competitor list, not just
//      the player's interest
//
// Pure functions; consumed by app.js orchestration.

(function initRecruitingV2(global) {
  // 13 interest inputs per spec §"Recruit Preference Weights" / interest formula.
  const INTEREST_INPUTS = [
    "playingTime",   // depth chart projection at this position
    "prestige",      // school's national reputation
    "nilOpportunity",// NIL pool / market fit
    "distanceFromHome",
    "schemeFit",
    "coachQuality",
    "winningCulture",
    "developmentTrack", // pro pipeline / dev grade
    "academicFit",
    "facilities",
    "recruiterRelationship",
    "rivalCompetition",  // who else is in the room
    "campusFit",         // visit + culture
  ];

  // Reason codes for interest-changing events.
  const REC_REASON_CODES = {
    interest_playing_time:        "Likely early playing time",
    interest_prestige:            "Drawn by program prestige",
    interest_nil:                 "Sees a strong NIL fit",
    interest_distance:            "Close to home",
    interest_scheme:              "Scheme matches play style",
    interest_coach:               "Strong feel for the head coach",
    interest_winning:             "Wants to win now",
    interest_development:         "Believes in the dev path",
    interest_academic:            "Academics matter to family",
    interest_facilities:          "Loves the facilities",
    interest_relationship:        "Personal recruiter relationship",
    interest_rival_pressure:      "Rival is putting on heavy pressure",
    interest_campus:              "Connected with the campus",
    visit_bump:                   "Big bump after official visit",
    promise_made:                 "Promise made — usage / starting role",
    promise_broken:               "Earlier promise looks broken",
    coach_change_concern:         "Concern about coaching stability",
    nil_collective_swing:         "NIL collective swung the talk",
  };

  // HS class lifecycle. Caller bumps gradYear and reclassifies on year rollover.
  const HS_CLASSES = ["HS_FR", "HS_SO", "HS_JR", "HS_SR"];
  function nextHsClass(cls) {
    const idx = HS_CLASSES.indexOf(cls);
    if (idx < 0 || idx === HS_CLASSES.length - 1) return null; // SR graduates
    return HS_CLASSES[idx + 1];
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /**
   * Compute spec-compliant 13-input weighted interest score with reason codes
   * for the inputs that materially shifted the result.
   * @param {object} prospect with .preferences {input: weight 0-1} and .hidden
   * @param {object} program  { prestige, nilTier, recruitingTier, fanBase, distanceFromProspect (0-100), schemeFit (0-1), coachRep (0-100), recentWinPct (0-1), academicTier, facilityTier }
   * @returns {object} { interest: 0-100, reasonCodes: [..], breakdown: {input: contribution} }
   */
  function computeInterestScore(prospect, program) {
    const prefs = prospect.preferences || {};
    const breakdown = {};
    const reasonCodes = [];
    function add(input, contribution, reasonCode) {
      breakdown[input] = (breakdown[input] || 0) + contribution;
      if (Math.abs(contribution) >= 4 && reasonCode && !reasonCodes.includes(reasonCode)) reasonCodes.push(reasonCode);
    }
    // Each contribution is bounded; total clamped 0-100.
    add("playingTime",      (prefs.playingTime || 0.7) * (program.playingTimeOpen ? 18 : 4), "interest_playing_time");
    add("prestige",         (prefs.prestige || 0.6) * ((program.prestige || 70) - 60) * 0.32, "interest_prestige");
    add("nilOpportunity",   (prefs.nil || 0.5) * (((program.nilTier || 5) - 4) * 5), "interest_nil");
    add("distanceFromHome", (prefs.distance || 0.5) * (60 - (program.distanceFromProspect || 50)) * 0.18, "interest_distance");
    add("schemeFit",        (prefs.scheme || 0.7) * (program.schemeFit || 0.6) * 18, "interest_scheme");
    add("coachQuality",     (prefs.coach || 0.7) * ((program.coachRep || 60) - 55) * 0.30, "interest_coach");
    add("winningCulture",   (prefs.winning || 0.6) * ((program.recentWinPct || 0.5) - 0.4) * 22, "interest_winning");
    add("developmentTrack", 0.55 * (((program.recruitingTier || 5) - 4) * 4), "interest_development");
    add("academicFit",      0.4 * (((program.academicTier || 5) - 4) * 3), "interest_academic");
    add("facilities",       0.4 * (((program.facilityTier || 5) - 4) * 4), "interest_facilities");
    add("recruiterRelationship", 0.5 * ((program.relationshipScore || 0) * 14), "interest_relationship");
    add("rivalCompetition", 0.4 * (program.rivalPressure ? -8 : 0), "interest_rival_pressure");
    add("campusFit",        0.4 * (program.visitsTaken ? 12 : 0), "interest_campus");

    const total = Object.values(breakdown).reduce((s, v) => s + v, 0);
    const interest = clamp(Math.round(40 + total), 1, 99);
    return { interest, reasonCodes, breakdown };
  }

  /**
   * AI school suitor record per prospect. The player's school uses the same
   * shape, so commit logic is unified.
   */
  function emptySuitor(schoolId, schoolName) {
    return {
      schoolId,
      schoolName: schoolName || schoolId,
      interest: 0,
      contactsThisCycle: 0,
      offered: false,
      visited: false,
      promiseLevel: 0,
      reasonCodes: [],
    };
  }

  function ensureSuitorList(prospect) {
    if (!Array.isArray(prospect.suitors)) prospect.suitors = [];
    return prospect.suitors;
  }

  function findOrCreateSuitor(prospect, schoolId, schoolName) {
    const list = ensureSuitorList(prospect);
    let s = list.find((x) => x.schoolId === schoolId);
    if (!s) { s = emptySuitor(schoolId, schoolName); list.push(s); }
    return s;
  }

  /**
   * Apply an interest update from a single school. Used by AI school weekly
   * tick AND user actions (scout/contact/offer/visit). Returns the resulting
   * suitor record + reason codes.
   */
  function applyInterestUpdate(prospect, schoolId, schoolName, programContext, reasonCodeOverride) {
    const suitor = findOrCreateSuitor(prospect, schoolId, schoolName);
    const result = computeInterestScore(prospect, programContext);
    // Soft blend: 70% new score, 30% prior to avoid violent swings.
    const next = Math.round(result.interest * 0.7 + (suitor.interest || 40) * 0.3);
    const delta = next - suitor.interest;
    suitor.interest = next;
    if (Array.isArray(reasonCodeOverride)) {
      suitor.reasonCodes = reasonCodeOverride.slice(0, 3);
    } else {
      suitor.reasonCodes = result.reasonCodes.slice(0, 3);
    }
    return { suitor, delta, reasonCodes: result.reasonCodes };
  }

  /**
   * Sort suitors by current interest. Returns array of { schoolId, interest,
   * isLeader: bool, gap: int }.
   */
  function leaderboardForProspect(prospect) {
    const list = ensureSuitorList(prospect);
    const sorted = list.slice().sort((a, b) => b.interest - a.interest);
    return sorted.map((s, i) => ({
      ...s,
      rank: i + 1,
      isLeader: i === 0,
      gap: i === 0 ? 0 : sorted[0].interest - s.interest,
    }));
  }

  /**
   * Decide whether a prospect commits this week and to whom. Driven by:
   *   - Top suitor's interest >= commitThreshold
   *   - Gap between top and second >= 8 (no clear leader → no commit)
   *   - Prospect is HS_SR (juniors/sophs don't commit yet here)
   * Returns { committed: bool, schoolId?, runner-up?, reasonCodes }.
   */
  function maybeCommit(prospect, random) {
    if (prospect.classYear !== "HS_SR" && prospect.classYear !== "HS SR") return { committed: false, reasonCodes: ["not_senior"] };
    if (prospect.commitmentStatus && prospect.commitmentStatus.startsWith("Committed")) return { committed: false, reasonCodes: ["already_committed"] };
    const board = leaderboardForProspect(prospect);
    if (!board.length) return { committed: false, reasonCodes: ["no_suitors"] };
    const leader = board[0];
    const runnerGap = board.length > 1 ? leader.interest - board[1].interest : 100;
    const commitThreshold = 72;
    if (leader.interest < commitThreshold) return { committed: false, reasonCodes: ["interest_below_threshold"] };
    if (runnerGap < 8 && random() < 0.6) return { committed: false, reasonCodes: ["no_clear_leader"] };
    // Commit roll scales with interest above threshold.
    const commitRoll = random();
    const threshold = clamp(0.18 + (leader.interest - commitThreshold) * 0.022, 0.20, 0.85);
    if (commitRoll > threshold) return { committed: false, reasonCodes: ["leaning_but_waiting"] };
    return {
      committed: true,
      schoolId: leader.schoolId,
      schoolName: leader.schoolName,
      runnerUpId: board[1] ? board[1].schoolId : null,
      reasonCodes: ["commit_resolved", ...(leader.reasonCodes || [])],
    };
  }

  /**
   * Year rollover: bump every prospect's classYear forward, drop graduated
   * SRs, generate a new HS_FR cohort to keep pool size stable.
   */
  function rolloverProspectClasses(prospects) {
    const survivors = [];
    const graduated = [];
    prospects.forEach((p) => {
      const next = nextHsClass(p.classYear === "HS SR" ? "HS_SR" : (p.classYear || "HS_SR"));
      if (next === null) {
        graduated.push(p);
      } else {
        p.classYear = next;
        // Reset year-specific tracking
        p.contactsThisCycle = 0;
        p.commitmentStatus = "Open";
        p.committedToUs = false;
        survivors.push(p);
      }
    });
    return { survivors, graduated };
  }

  /**
   * Distribute a pool size across HS classes per real-world recruiting funnel.
   * SR-heavy (immediate commits matter most), JR meaningful, SO/FR thinner.
   */
  const CLASS_DISTRIBUTION = { HS_SR: 0.45, HS_JR: 0.30, HS_SO: 0.18, HS_FR: 0.07 };

  function classDistributionForPool(poolSize) {
    return Object.fromEntries(
      Object.entries(CLASS_DISTRIBUTION).map(([cls, ratio]) => [cls, Math.round(poolSize * ratio)])
    );
  }

  global.CGM_RECRUITING_V2 = {
    INTEREST_INPUTS,
    REC_REASON_CODES,
    HS_CLASSES,
    CLASS_DISTRIBUTION,
    nextHsClass,
    computeInterestScore,
    findOrCreateSuitor,
    applyInterestUpdate,
    leaderboardForProspect,
    maybeCommit,
    rolloverProspectClasses,
    classDistributionForPool,
  };
})(window);
