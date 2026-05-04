// DRAFT-1: NFL Pipeline + Senior Outflow + History Archive
// Spec: ai-pack/CFB_FM_NEXT_CORE_IMPLEMENTATION_SPECS/35_DRAFT_AND_NFL_PIPELINE_CALIBRATION_SPEC.md
//
// Year-rollover logic that:
//   1. Identifies seniors leaving (graduation or early declaration)
//   2. Projects each leaver's draft slot (rd 1–7 or undrafted) from OVR/POT/age
//   3. Records the year's draft class on the program archive (visible on History)
//   4. Removes them from the active roster
//
// Pure functions; year-rollover orchestration lives in app.js.

(function initDraftEngine(global) {
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  // OVR → draft slot probability table per spec §"Draft Tier Calibration".
  // Each row: { minOvr, round, label } — first match wins.
  const DRAFT_TIERS = [
    { minOvr: 92, label: "Round 1 lock",      round: 1, summary: "Top-15 NFL prospect" },
    { minOvr: 88, label: "Round 1 / 2",       round: 1, summary: "Late R1 / early R2" },
    { minOvr: 84, label: "Round 2 / 3",       round: 2, summary: "Day 2 prospect" },
    { minOvr: 80, label: "Round 3 / 4",       round: 3, summary: "Mid-round projection" },
    { minOvr: 76, label: "Round 4 / 5",       round: 4, summary: "Late-round value" },
    { minOvr: 72, label: "Round 6 / 7",       round: 6, summary: "Late-round flier" },
    { minOvr: 68, label: "Priority UDFA",     round: null, summary: "Priority undrafted free agent" },
    { minOvr: 0,  label: "Undrafted",         round: null, summary: "Undrafted" },
  ];

  /**
   * Determine if a player departs after the season. Seniors always leave;
   * juniors with high OVR + high "ambition" hidden trait may declare early.
   */
  function shouldDepart(player, random) {
    const yr = player.year;
    if (yr === "GR" || yr === "5th") return { depart: true, reason: "eligibility_used" };
    if (yr === "SR") return { depart: true, reason: "graduating_senior" };
    if (yr === "JR") {
      const ovr = Number(player.ovr) || 70;
      const ambition = (player.hidden && player.hidden.ambition) || 10;
      // Probability of early entry: scales with OVR above 84 + ambition above 12.
      const earlyChance = clamp(((ovr - 84) * 0.06) + ((ambition - 12) * 0.04), 0, 0.65);
      if (random() < earlyChance) return { depart: true, reason: "early_declaration", earlyChance };
    }
    return { depart: false, reason: null };
  }

  /**
   * Project draft slot from OVR + small adjustments. Returns the matching tier.
   */
  function projectDraftTier(player, random) {
    const ovr = Number(player.ovr) || 70;
    const pot = Number(player.pot) || ovr;
    // Slight upward nudge for high potential gap (shows "raw but talented").
    const adjusted = ovr + clamp((pot - ovr) * 0.3, 0, 4);
    // Add small variance so draft picks don't feel deterministic.
    const noise = (random() - 0.5) * 4;
    const finalScore = adjusted + noise;
    return DRAFT_TIERS.find((t) => finalScore >= t.minOvr) || DRAFT_TIERS[DRAFT_TIERS.length - 1];
  }

  /**
   * Process the year's outflow. Returns:
   *   { departing: [{playerId, name, position, year, ovr, draftTier, reason}],
   *     returning: [...players who came back],
   *     classSummary: { pickedR1: n, pickedR2: n, ..., undrafted: n } }
   */
  function processSeniorOutflow(roster, random) {
    const departing = [];
    const returning = [];
    const classSummary = { pickedR1: 0, pickedR2: 0, pickedR3: 0, pickedR4plus: 0, udfa: 0, undrafted: 0 };
    roster.forEach((player) => {
      const verdict = shouldDepart(player, random);
      if (!verdict.depart) {
        returning.push(player);
        return;
      }
      const tier = projectDraftTier(player, random);
      const draftRecord = {
        playerId: player.id,
        name: player.name,
        position: player.position,
        year: player.year,
        ovr: player.ovr,
        pot: player.pot,
        archetype: player.archetype,
        draftTier: tier.label,
        draftRound: tier.round,
        draftSummary: tier.summary,
        departReason: verdict.reason,
      };
      departing.push(draftRecord);
      if (tier.round === 1) classSummary.pickedR1 += 1;
      else if (tier.round === 2) classSummary.pickedR2 += 1;
      else if (tier.round === 3) classSummary.pickedR3 += 1;
      else if (tier.round) classSummary.pickedR4plus += 1;
      else if (tier.label === "Priority UDFA") classSummary.udfa += 1;
      else classSummary.undrafted += 1;
    });
    return { departing, returning, classSummary };
  }

  /** Build the history-archive row for a draft class. */
  function buildArchiveRow(seasonYear, classSummary, departingTopFive) {
    const pickCount = classSummary.pickedR1 + classSummary.pickedR2 + classSummary.pickedR3 + classSummary.pickedR4plus;
    const note = pickCount === 0
      ? "No draft picks"
      : `${pickCount} drafted (${classSummary.pickedR1} R1, ${classSummary.pickedR2} R2, ${classSummary.pickedR3} R3, ${classSummary.pickedR4plus} R4-7)${classSummary.udfa ? `, ${classSummary.udfa} UDFA` : ""}`;
    const top = (departingTopFive || []).slice(0, 5).map((p) => `${p.position} ${p.name} (${p.draftTier})`).join("; ");
    return {
      seasonYear: String(seasonYear),
      pickCount,
      classSummary,
      note,
      topDeparting: top,
    };
  }

  global.CGM_DRAFT = {
    DRAFT_TIERS,
    shouldDepart,
    projectDraftTier,
    processSeniorOutflow,
    buildArchiveRow,
  };
})(window);
