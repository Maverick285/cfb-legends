// PORTAL-2: Transfer Portal v2 — risk formula + AI portal behavior
// Spec: ai-pack/CFB_FM_NEXT_CORE_IMPLEMENTATION_SPECS/.../34_TRANSFER_PORTAL_AND_RETENTION_ENGINE_SPEC.md
//
// First slice: deterministic transfer-risk computation per the spec's 17-term
// formula, risk-band classification, AI-school portal behavior (which players
// enter the portal each week, which AI schools target them).
//
// Pure / deterministic. Caller passes in players + context; module returns
// new objects without mutating inputs (except where explicitly noted).

(function initPortalV2(global) {
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  // ── Transfer Risk Formula ───────────────────────────────────────────────
  // 17 terms per spec §"Transfer Risk Formula".
  // Each term contributes 0-15 points (most terms much smaller); positives
  // raise risk, negatives reduce it. Final score clamped 0-100.
  //
  // Inputs come from a "TransferContext" the caller assembles from app state.
  // Missing fields default to neutral (0 contribution) so partial integration
  // works during incremental rollout.
  function computeTransferRisk(player, ctx) {
    const c = ctx || {};
    const reasonCodes = [];
    let risk = 0;

    // Positives
    const ptdPct = clamp(Number(c.snapsPctVsExpected) || 100, 0, 200);
    if (ptdPct < 50) {
      risk += (50 - ptdPct) * 0.4;
      reasonCodes.push("playing_time_dissatisfied");
    }
    if (c.roleMismatch) {
      risk += 10;
      reasonCodes.push("role_mismatch");
    }
    const nilExpected = Number(c.nilExpected) || 0;
    const nilActual = Number(c.nilActual) || 0;
    if (nilExpected > 0 && nilActual < nilExpected * 0.5) {
      risk += 12;
      reasonCodes.push("nil_shortfall");
    } else if (nilExpected > 0 && nilActual < nilExpected * 0.8) {
      risk += 5;
      reasonCodes.push("nil_under_expectations");
    }
    if (Number(c.brokenPromises) > 0) {
      risk += Math.min(15, Number(c.brokenPromises) * 6);
      reasonCodes.push(`broken_promises_${c.brokenPromises}`);
    }
    if (Number(c.coachRelationship) < 40) {
      risk += (40 - c.coachRelationship) * 0.25;
      reasonCodes.push("low_coach_relationship");
    }
    if (c.homesick) {
      risk += 6;
      reasonCodes.push("homesick");
    }
    if (c.academicIssue) {
      risk += 7;
      reasonCodes.push("academic_issue");
    }
    if (c.schemeChange) {
      risk += 8;
      reasonCodes.push("scheme_change");
    }
    if (Number(c.positionCrowding) >= 3) {
      risk += Math.min(12, Number(c.positionCrowding) * 2);
      reasonCodes.push("position_crowded");
    }
    const ambition = Number(c.ambition) || 50;
    if (ambition >= 75) {
      risk += (ambition - 75) * 0.3;
      reasonCodes.push("high_ambition");
    }
    const externalInterest = Number(c.externalSchoolInterest) || 0;
    if (externalInterest >= 60) {
      risk += (externalInterest - 60) * 0.25;
      reasonCodes.push("external_school_interest");
    }
    if (c.coachingChange) {
      risk += 14;
      reasonCodes.push("coaching_change_pressure");
    }

    // Negatives
    const loyalty = Number(c.loyalty) || 50;
    if (loyalty >= 70) {
      risk -= (loyalty - 70) * 0.4;
      reasonCodes.push("high_loyalty");
    }
    const teamSuccess = clamp(Number(c.teamSuccessIndex) || 50, 0, 100);
    if (teamSuccess >= 65) {
      risk -= (teamSuccess - 65) * 0.3;
      reasonCodes.push("team_success");
    }
    if (Number(c.developmentSatisfaction) >= 70) {
      risk -= 8;
      reasonCodes.push("dev_satisfied");
    }
    if (Number(c.strongRelationships) >= 70) {
      risk -= 6;
      reasonCodes.push("strong_relationships");
    }
    if (c.leadershipConnection) {
      risk -= 5;
      reasonCodes.push("leadership_connection");
    }

    risk = clamp(Math.round(risk), 0, 100);
    return {
      transferRisk: risk,
      riskBand: bandForRisk(risk),
      mainReasons: reasonCodes.slice(0, 5),
      allReasons: reasonCodes,
    };
  }

  function bandForRisk(risk) {
    if (risk >= 75) return "imminent";
    if (risk >= 55) return "high";
    if (risk >= 35) return "concern";
    if (risk >= 20) return "watch";
    return "low";
  }

  // ── Portal Window ───────────────────────────────────────────────────────
  // Ruleset-driven: caller passes the active windows. We only check whether a
  // given week falls inside one of them.
  function isInPortalWindow(week, windows) {
    if (!windows || !windows.length) return false;
    return windows.some((w) =>
      week >= w.openWeek && week <= w.closeWeek
    );
  }

  // ── Entering Portal ─────────────────────────────────────────────────────
  /**
   * Given a player + risk profile + RNG, decide whether they enter the portal
   * this week. Spec: high-risk players in-window have meaningful entry chance.
   */
  function decidePortalEntry(args) {
    const profile = args.riskProfile;
    const inWindow = isInPortalWindow(args.week, args.windows);
    const exception = args.coachingChangeException || args.graduateTransferException;
    if (!inWindow && !exception) {
      return { entered: false, reasonCodes: ["outside_window"] };
    }
    const random = args.random || Math.random;
    const baseChance =
      profile.riskBand === "imminent" ? 0.55 :
      profile.riskBand === "high"     ? 0.32 :
      profile.riskBand === "concern"  ? 0.10 :
      profile.riskBand === "watch"    ? 0.025 : 0.005;
    const rolled = random();
    const entered = rolled < baseChance;
    return {
      entered,
      reasonCodes: entered
        ? ["entered_portal", `band_${profile.riskBand}`, ...profile.mainReasons.slice(0, 2)]
        : [`no_entry_band_${profile.riskBand}`],
      rolled,
      threshold: baseChance,
    };
  }

  // ── AI Portal Behavior ──────────────────────────────────────────────────
  /**
   * For an AI school, score a portal player as a fit. Higher score = stronger
   * interest. Considers: position need, talent fit, NIL budget, scheme fit.
   *
   * @param {object} portalPlayer { id, position, ovr, attrs, transferProfile }
   * @param {object} school { needsByPosition, talentFloor, nilBudgetK, scheme, prestige }
   */
  function scorePortalFit(portalPlayer, school) {
    const reasonCodes = [];
    let score = 0;

    const need = (school.needsByPosition || {})[portalPlayer.position] || 0;
    if (need >= 70) { score += 25; reasonCodes.push("position_priority_need"); }
    else if (need >= 40) { score += 12; reasonCodes.push("position_moderate_need"); }
    else if (need >= 20) { score += 4; }

    const talentDelta = (portalPlayer.ovr || 70) - (school.talentFloor || 65);
    if (talentDelta >= 10) { score += 22; reasonCodes.push("talent_upgrade_huge"); }
    else if (talentDelta >= 5) { score += 14; reasonCodes.push("talent_upgrade"); }
    else if (talentDelta >= 0) { score += 6; }
    else if (talentDelta < -5) { score -= 10; reasonCodes.push("talent_below_floor"); }

    const expectedNilK = expectedNilForOvr(portalPlayer.ovr || 70);
    if ((school.nilBudgetK || 0) >= expectedNilK) {
      score += 8;
      reasonCodes.push("nil_capacity_match");
    } else if ((school.nilBudgetK || 0) < expectedNilK * 0.5) {
      score -= 12;
      reasonCodes.push("nil_capacity_short");
    }

    if (school.scheme && portalPlayer.preferredScheme === school.scheme) {
      score += 6;
      reasonCodes.push("scheme_fit");
    }

    return { score: Math.round(score), reasonCodes };
  }

  function expectedNilForOvr(ovr) {
    if (ovr >= 90) return 600;
    if (ovr >= 85) return 350;
    if (ovr >= 80) return 180;
    if (ovr >= 75) return 90;
    return 30;
  }

  /**
   * For each portal player, return ranked list of likely destinations from a
   * pool of AI schools. Top N schools likely to make offers.
   */
  function rankDestinations(portalPlayer, schools, limit) {
    const ranked = (schools || []).map((school) => ({
      schoolId: school.id,
      ...scorePortalFit(portalPlayer, school),
    })).sort((a, b) => b.score - a.score);
    return ranked.slice(0, limit || 6);
  }

  // ── Retention Meeting ───────────────────────────────────────────────────
  /**
   * Run a retention meeting that may reduce the player's transfer risk.
   * Effectiveness depends on coach skill + matching the right reason codes.
   * @param {object} args { riskProfile, coachAttrs, addressing: ReasonCode[], promiseMade?, random? }
   */
  function runRetentionMeeting(args) {
    const profile = args.riskProfile;
    const coachAttrs = args.coachAttrs || {};
    const addressing = args.addressing || [];
    const random = args.random || Math.random;

    const coachSkill = ((coachAttrs.relationships || 50) + (coachAttrs.motivation || 50)) / 200;
    const matched = addressing.filter((code) => profile.allReasons.includes(code));
    const matchRatio = profile.allReasons.length ? matched.length / Math.min(3, profile.allReasons.length) : 0;
    let riskDelta = -Math.round(coachSkill * 12 * (0.4 + matchRatio * 0.8));

    const reasonCodes = ["retention_meeting_held"];
    if (matched.length > 0) reasonCodes.push(`addressed_${matched.length}_concerns`);
    if (args.promiseMade) {
      const promiseLand = random() < 0.55;
      if (promiseLand) {
        riskDelta -= 8;
        reasonCodes.push("promise_landed");
      } else {
        riskDelta += 4;
        reasonCodes.push("promise_dismissed");
      }
    }

    const newRisk = clamp(profile.transferRisk + riskDelta, 0, 100);
    return {
      newRisk,
      newBand: bandForRisk(newRisk),
      delta: riskDelta,
      matched,
      reasonCodes,
    };
  }

  // ── Portal Effects On Team ──────────────────────────────────────────────
  /**
   * When a player enters the portal, return the team-level effects:
   * depth impact, scheme impact, recruit signaling.
   */
  function computePortalDeparture(player, team) {
    const reasonCodes = ["portal_departure"];
    const markers = {
      depthHole: false,
      scholarshipFreed: 1,
      classChemistryDelta: -2,
      recruitMomentumDelta: 0,
    };
    if (player.depthChartRank === 1) {
      markers.depthHole = true;
      markers.classChemistryDelta = -6;
      reasonCodes.push("starter_left");
    } else if (player.depthChartRank <= 2) {
      markers.classChemistryDelta = -3;
      reasonCodes.push("two_deep_left");
    }
    if ((player.year === "JR" || player.year === "SR") && player.captain) {
      markers.classChemistryDelta -= 4;
      markers.recruitMomentumDelta = -5;
      reasonCodes.push("captain_left");
    }
    return { markers, reasonCodes };
  }

  global.CGM_PORTAL_V2 = {
    computeTransferRisk,
    bandForRisk,
    isInPortalWindow,
    decidePortalEntry,
    scorePortalFit,
    rankDestinations,
    runRetentionMeeting,
    computePortalDeparture,
    expectedNilForOvr,
  };
})(window);
