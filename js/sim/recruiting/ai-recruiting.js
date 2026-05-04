// REC-1 / AI-SCHOOL-2: AI school recruiting tick
// Spec: 30_RECRUITING_ENGINE_IMPLEMENTATION_SPEC.md §"AI Schools"
//        32_AI_SCHOOL_PROGRAM_MANAGER_SPEC.md §"AI school decisions"
//
// Each Continue tick a subset of rival schools "act" on a few prospects: they
// pick prospects whose stars/needs align, push interest, occasionally extend
// an offer, and (rarely) take a visit. Driven by the same interest math the
// player uses, so leaderboards are honest.

(function initAiRecruiting(global) {
  const REC = global.CGM_RECRUITING_V2;
  if (!REC) {
    if (global.console) global.console.error("AI recruiting needs CGM_RECRUITING_V2 loaded first");
    return;
  }

  // Tunables
  const SCHOOLS_ACTING_PER_TICK = 22;        // ~1/6 of FBS each week
  const PROSPECTS_PER_SCHOOL = 4;             // each acting school touches ~4 prospects

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /**
   * Pick which schools act this tick. Higher-rated schools act slightly more
   * often (they have bigger boards). Player school is excluded — its interest
   * comes from user actions.
   */
  function pickActingSchools(programs, playerTeamId, random, count) {
    const eligible = programs.filter((p) => p.id !== playerTeamId);
    // Weighted reservoir: weight = max(1, programRating - 60).
    const sample = [];
    const weighted = eligible.map((p) => ({
      id: p.id, weight: Math.max(1, (p.programRating || p.basePrestige || 70) - 55),
      program: p,
    }));
    for (let i = 0; i < count && weighted.length; i += 1) {
      const total = weighted.reduce((s, e) => s + e.weight, 0);
      let roll = random() * total;
      let pickIdx = 0;
      for (let j = 0; j < weighted.length; j += 1) {
        roll -= weighted[j].weight;
        if (roll <= 0) { pickIdx = j; break; }
      }
      sample.push(weighted[pickIdx].program);
      weighted.splice(pickIdx, 1);
    }
    return sample;
  }

  /**
   * Pick which prospects this school targets. Prefers prospects whose top
   * position matches a rough need bucket the school's rating implies, with a
   * dose of randomness so boards don't all look identical.
   */
  function pickTargetProspects(prospects, school, random, count) {
    const open = prospects.filter((p) =>
      p.classYear === "HS_SR" || p.classYear === "HS SR" ||
      p.classYear === "HS_JR" || p.classYear === "HS JR"
    );
    if (!open.length) return [];
    // Score each prospect for this school: stars × close-to-rating + jitter.
    const ratingTarget = (school.programRating || 70);
    const scored = open.map((p) => {
      const stars = Number((p.stars || "3-star").charAt(0)) || 3;
      const trueRating = p.trueRating || (60 + stars * 6);
      const fitDelta = Math.abs(trueRating - (ratingTarget - 5));
      const score = stars * 25 - fitDelta * 0.6 + (random() - 0.5) * 14;
      return { p, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, count).map((x) => x.p);
  }

  /**
   * Build a programContext object the interest-formula consumes from a
   * school + prospect pair.
   */
  function buildProgramContext(school, prospect) {
    const baseRating = school.programRating || school.basePrestige || 70;
    return {
      prestige: baseRating,
      nilTier: school.nilTier || 5,
      recruitingTier: school.recruitingTier || 5,
      academicTier: 5 + Math.round((baseRating - 70) / 12),
      facilityTier: 5 + Math.round((baseRating - 70) / 12),
      schemeFit: 0.55 + (Math.abs((baseRating - 50) % 13) / 26), // pseudo-deterministic shimmer
      coachRep: baseRating,
      recentWinPct: clamp(((school.winsThisYear || 0) - (school.lossesThisYear || 0) + 6) / 12, 0.2, 0.95),
      distanceFromProspect: 50, // simplified — could use state matching later
      playingTimeOpen: false,    // unknown for AI; conservative default
      relationshipScore: 0,
      visitsTaken: false,
      rivalPressure: false,
    };
  }

  /**
   * Run one weekly AI recruiting tick. Mutates prospect suitor lists in place.
   * Returns a summary object {schoolsActed, contacts, offers, commits}.
   */
  function runWeeklyAiRecruitingTick(args) {
    const { programs, prospects, random, playerTeamId, weekIndex, aiStandings } = args;
    const acting = pickActingSchools(programs, playerTeamId, random, SCHOOLS_ACTING_PER_TICK);
    let contacts = 0, offers = 0, commits = 0;
    const commitEvents = [];

    acting.forEach((school) => {
      // Inject current-season W/L for context (so winning programs feel hotter).
      if (aiStandings && aiStandings[school.id]) {
        school.winsThisYear = aiStandings[school.id].wins;
        school.lossesThisYear = aiStandings[school.id].losses;
      }
      const targets = pickTargetProspects(prospects, school, random, PROSPECTS_PER_SCHOOL);
      targets.forEach((prospect) => {
        const ctx = buildProgramContext(school, prospect);
        REC.applyInterestUpdate(prospect, school.id, school.shortName || school.name, ctx);
        contacts += 1;
        // Random chance to escalate to "offer" if interest is high enough.
        const suitor = REC.findOrCreateSuitor(prospect, school.id, school.shortName || school.name);
        if (!suitor.offered && suitor.interest >= 65 && random() < 0.30) {
          suitor.offered = true;
          offers += 1;
        }
      });
    });

    // After interest moves, check commits for HS seniors.
    prospects.forEach((p) => {
      const cls = p.classYear;
      if (cls !== "HS_SR" && cls !== "HS SR") return;
      if (p.commitmentStatus && p.commitmentStatus.startsWith("Committed")) return;
      const result = REC.maybeCommit(p, random);
      if (result.committed) {
        p.commitmentStatus = "Committed Elsewhere";
        if (result.schoolId === playerTeamId) p.commitmentStatus = "Committed";
        if (result.schoolId === playerTeamId) p.committedToUs = true;
        p.commitTo = result.schoolId;
        p.commitToName = result.schoolName;
        commits += 1;
        commitEvents.push({
          prospectId: p.id, prospectName: p.name, position: p.position, stars: p.stars,
          schoolId: result.schoolId, schoolName: result.schoolName,
          runnerUpId: result.runnerUpId,
          isPlayerCommit: result.schoolId === playerTeamId,
        });
      }
    });

    return { schoolsActed: acting.length, contacts, offers, commits, commitEvents, weekIndex };
  }

  global.CGM_AI_RECRUITING = {
    SCHOOLS_ACTING_PER_TICK,
    PROSPECTS_PER_SCHOOL,
    pickActingSchools,
    pickTargetProspects,
    buildProgramContext,
    runWeeklyAiRecruitingTick,
  };
})(window);
