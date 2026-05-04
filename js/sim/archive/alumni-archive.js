// ARCHIVE-1: Alumni + Coach archive with career-long stat persistence
// Spec: implied by user requirement — "track all player/coach stats forever
// and save outgoing players (medical / graduate / pro) into a draft class".
//
// Three concerns:
//   1. Per-player career stat accumulator (each season tally rolls into a
//      lifetime totals object on the player)
//   2. Departure archive (alumni record per player who graduates / retires /
//      goes pro / transfers out / medically retires)
//   3. Coach legacy archive (per-coach tenure record per program)
//
// Pure: caller passes mutable state; module records and persists.

(function initAlumniArchive(global) {
  const DEPART_REASONS = {
    GRADUATED: "graduated",
    DRAFTED: "drafted",
    EARLY_DECLARE: "early_declare",
    MEDICAL_RETIRE: "medical_retire",
    TRANSFERRED_OUT: "transferred_out",
    DISMISSED: "dismissed",
    OTHER: "other",
  };

  const COACH_END_REASONS = {
    FIRED: "fired",
    RETIRED: "retired",
    POACHED: "poached",
    LEFT_FOR_NFL: "left_for_nfl",
    OTHER: "other",
  };

  // ── Career stat tally ──────────────────────────────────────────────────
  /**
   * Add a single-season stat line to a player's career totals + push to
   * seasons[]. Pure-ish (mutates player.careerStats).
   *
   * @param {object} player
   * @param {number} seasonYear
   * @param {object} statLine — { passing_yards, passing_tds, rushing_yards, ... }
   */
  function recordPlayerSeasonStats(player, seasonYear, statLine) {
    if (!player) return;
    if (!player.careerStats) player.careerStats = { seasons: [], totals: {}, awardsWon: [] };
    const cs = player.careerStats;
    const cleanLine = {};
    Object.keys(statLine || {}).forEach((k) => {
      if (typeof statLine[k] === "number") cleanLine[k] = statLine[k];
    });
    cs.seasons.push({ year: seasonYear, ...cleanLine });
    Object.entries(cleanLine).forEach(([k, v]) => {
      cs.totals[k] = (cs.totals[k] || 0) + v;
    });
    return cs;
  }

  /**
   * Record an award-won entry on the player's career.
   */
  function recordPlayerAward(player, awardLabel, seasonYear) {
    if (!player) return;
    if (!player.careerStats) player.careerStats = { seasons: [], totals: {}, awardsWon: [] };
    if (!Array.isArray(player.careerStats.awardsWon)) player.careerStats.awardsWon = [];
    player.careerStats.awardsWon.push({ award: awardLabel, year: seasonYear });
  }

  // ── Departure archive ──────────────────────────────────────────────────
  /**
   * Build an alumni record. Caller pushes the result onto data.alumniArchive.
   * @param {object} args { player, reason, seasonYear, programId, draftRound, draftTier, draftPick }
   * @returns {object} alumniRecord
   */
  function buildAlumniRecord(args) {
    const player = args.player || {};
    const reason = args.reason || DEPART_REASONS.OTHER;
    const seasonYear = args.seasonYear || new Date().getFullYear();
    const careerStats = player.careerStats || { seasons: [], totals: {}, awardsWon: [] };
    const seasonsPlayed = (careerStats.seasons || []).length;
    return {
      playerId: player.id,
      name: player.name,
      position: player.position,
      finalYear: player.year,
      finalOvr: player.ovr,
      programId: args.programId || player.programId,
      departureReason: reason,
      departureSeason: seasonYear,
      seasonsPlayed,
      careerTotals: { ...(careerStats.totals || {}) },
      careerSeasons: (careerStats.seasons || []).slice(),
      awardsWon: (careerStats.awardsWon || []).slice(),
      draft: args.draftRound ? {
        round: args.draftRound,
        tier: args.draftTier,
        pick: args.draftPick,
        year: seasonYear + 1, // drafted the spring after their final college season
      } : null,
      hallOfFameWorthy: isHallOfFameWorthy(careerStats),
    };
  }

  /**
   * Heuristic: any single-season ≥ position-relevant threshold OR ≥3 awards.
   * Lightweight gate — caller can override with their own ballot.
   */
  function isHallOfFameWorthy(careerStats) {
    const totals = (careerStats && careerStats.totals) || {};
    const awards = (careerStats && careerStats.awardsWon) || [];
    if (awards.length >= 3) return true;
    if ((totals.passing_yards || 0) >= 9000) return true;
    if ((totals.rushing_yards || 0) >= 3500) return true;
    if ((totals.receiving_yards || 0) >= 3000) return true;
    if ((totals.sacks || 0) >= 25) return true;
    if ((totals.interceptions || 0) >= 12) return true;
    return false;
  }

  /**
   * Archive a list of departing players. Returns array of alumniRecords.
   * Caller is responsible for `data.alumniArchive.push(...records)`.
   */
  function archiveDepartures(args) {
    const departing = args.departing || [];
    const seasonYear = args.seasonYear;
    const programId = args.programId;
    return departing.map((d) => {
      const player = d.playerRef || d;
      // Upgrade reason: if a player went in the draft they're "drafted"
      // regardless of what the CGM_DRAFT engine called the depart trigger.
      let reason = d.departReason || d.reason || DEPART_REASONS.GRADUATED;
      if (d.draftRound) reason = DEPART_REASONS.DRAFTED;
      else if (reason === "graduating_senior") reason = DEPART_REASONS.GRADUATED;
      return buildAlumniRecord({
        player, reason, seasonYear, programId,
        draftRound: d.draftRound,
        draftTier: d.draftTier,
        draftPick: d.draftPick,
      });
    });
  }

  // ── Coach legacy archive ────────────────────────────────────────────────
  /**
   * Build a coach legacy record at the end of their tenure.
   * @param {object} args { coach, role, programId, tenureYears, recordSummary, championships, endReason }
   */
  function buildCoachLegacyRecord(args) {
    const coach = args.coach || {};
    return {
      coachId: coach.id || (coach.identity && `${coach.identity.first}-${coach.identity.last}`),
      name: coach.name || (coach.identity && coach.identity.fullName),
      role: args.role,
      programId: args.programId,
      startYear: args.startYear,
      endYear: args.endYear,
      tenureYears: Number(args.tenureYears) || ((args.endYear || 0) - (args.startYear || 0) + 1),
      recordSummary: args.recordSummary || null,
      championships: Number(args.championships) || 0,
      bowls: Number(args.bowls) || 0,
      coyAwards: Number(args.coyAwards) || 0,
      endReason: args.endReason || COACH_END_REASONS.OTHER,
      attributes: coach.attributes || null,
      personality: coach.personality || null,
    };
  }

  // ── Query helpers ──────────────────────────────────────────────────────
  /**
   * Get alumni filtered by program / departure reason / position.
   */
  function queryAlumni(alumniArchive, filters) {
    const f = filters || {};
    return (alumniArchive || []).filter((a) => {
      if (f.programId && a.programId !== f.programId) return false;
      if (f.position && a.position !== f.position) return false;
      if (f.reason && a.departureReason !== f.reason) return false;
      if (f.minSeasonsPlayed && a.seasonsPlayed < f.minSeasonsPlayed) return false;
      if (f.draftedOnly && !a.draft) return false;
      if (f.hofOnly && !a.hallOfFameWorthy) return false;
      if (f.sinceYear && a.departureSeason < f.sinceYear) return false;
      return true;
    });
  }

  /**
   * Top alumni leaderboard for a given career stat (e.g. passing_yards).
   */
  function topAlumniByCareerStat(alumniArchive, statKey, limit) {
    return (alumniArchive || [])
      .filter((a) => (a.careerTotals || {})[statKey] != null)
      .sort((a, b) => (b.careerTotals[statKey] || 0) - (a.careerTotals[statKey] || 0))
      .slice(0, limit || 10);
  }

  /**
   * Coach legacy summary: total seasons, championships, COY awards.
   */
  function coachLegacySummary(coachLegacies) {
    const summary = { totalCoaches: 0, totalSeasons: 0, totalChampionships: 0, totalCoyAwards: 0 };
    (coachLegacies || []).forEach((c) => {
      summary.totalCoaches += 1;
      summary.totalSeasons += c.tenureYears || 0;
      summary.totalChampionships += c.championships || 0;
      summary.totalCoyAwards += c.coyAwards || 0;
    });
    return summary;
  }

  global.CGM_ALUMNI = {
    DEPART_REASONS, COACH_END_REASONS,
    recordPlayerSeasonStats,
    recordPlayerAward,
    buildAlumniRecord,
    isHallOfFameWorthy,
    archiveDepartures,
    buildCoachLegacyRecord,
    queryAlumni,
    topAlumniByCareerStat,
    coachLegacySummary,
  };
})(window);
