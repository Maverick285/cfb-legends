// AI-NIL-1: AI-school NIL bidding wars
// Spec: ai-pack/CFB_FM_NEXT_CORE_IMPLEMENTATION_SPECS/.../34_TRANSFER_PORTAL...
//       + ai-pack/CFB_FM_REMAINING_SYSTEM_SPECS/.../36_NIL_AND_BOOSTER_ECONOMY_SPEC.md
//
// First slice: each AI program gets a NIL pool (from CGM_NIL.startingPool /
// equivalent inputs) and a per-cycle bidding strategy. For each top prospect
// in the world, the AI schools that have them as a real suitor bid an amount
// of their pool proportional to their interest score and the prospect's NIL
// preference. The bid bumps the suitor's interest in the recruiting engine.
//
// Pure / deterministic given (random, world).

(function initAiNil(global) {
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /**
   * Compute a single AI school's bid for a prospect.
   * @param {object} args
   *   - school: { id, nilTier, fanBase, prestige, nilStateMillions }
   *   - prospect: { id, ovr, stars, preferences: { nil 0..1 } }
   *   - existingInterest: 0-100 from suitor record
   *   - random: () => [0,1)
   * @returns {object|null} { amountM, reasonCodes } or null if school passes
   */
  function computeBid(args) {
    const school = args.school || {};
    const prospect = args.prospect || {};
    const random = args.random || Math.random;
    const interest = clamp(Number(args.existingInterest) || 0, 0, 100);
    if (interest < 35) return null; // not a real suitor
    const pool = Number(school.nilStateMillions) || 0;
    if (pool < 0.05) return null; // dry pool

    // Talent driver: 5* commit warrants a real bid; 2* doesn't.
    const stars = Number(prospect.stars) || 3;
    const ovr = Number(prospect.ovr) || 70;
    if (stars < 3 && ovr < 75) return null;

    // Prospect's NIL preference (0..1) determines whether bidding moves them.
    const nilPref = Number((prospect.preferences || {}).nil) || 0.5;

    // Base bid: a fraction of pool weighted by interest + stars + nil pref.
    const interestFactor = (interest - 35) / 65;
    const starFactor = (stars - 2) / 3;
    const baseFraction = 0.05 + interestFactor * 0.20 + starFactor * 0.10;
    let amountM = pool * baseFraction;

    // Add a competitive jitter so identical suitors don't tie.
    amountM *= 0.85 + random() * 0.30;

    // Cap bid at the prospect's "expected value" — overpaying is fine but
    // we don't drain the pool entirely on one kid.
    const expectedM = expectedNilForOvrStars(ovr, stars);
    amountM = clamp(amountM, 0.05, Math.min(pool * 0.4, expectedM * 1.6));

    if (amountM < 0.05) return null;
    return {
      amountM: Math.round(amountM * 100) / 100,
      reasonCodes: [
        "ai_nil_bid",
        `bid_${stars}star`,
        nilPref >= 0.7 ? "nil_motivated_target" : "balanced_target",
        interest >= 75 ? "ai_priority_target" : "ai_pursuing",
      ],
    };
  }

  function expectedNilForOvrStars(ovr, stars) {
    // Loose: $200K per star + $40K per OVR point above 70.
    return Math.max(0.1, (Number(stars) || 3) * 0.2 + Math.max(0, Number(ovr) - 70) * 0.04);
  }

  /**
   * Convert a bid amount + prospect NIL preference into an interest bump.
   * Tracks how much the bid moves the prospect on the suitor leaderboard.
   */
  function interestBumpFromBid(amountM, prospect) {
    const nilPref = Number((prospect.preferences || {}).nil) || 0.5;
    const expected = expectedNilForOvrStars(prospect.ovr || 70, prospect.stars || 3);
    const ratio = amountM / Math.max(0.1, expected);
    // 0.5x expected → +2, 1.0x → +6, 1.6x → +12. Multiplied by NIL preference.
    const base = Math.min(15, ratio * 6 + (ratio > 1 ? (ratio - 1) * 8 : 0));
    return Math.round(base * (0.5 + nilPref * 0.8));
  }

  /**
   * Run a bidding round across many AI schools competing for the same
   * prospect. Returns a list of bids (sorted by amount desc) + an interest
   * delta map for the suitor leaderboard.
   *
   * @param {object} args
   *   - prospect
   *   - bidders: [{ school, existingInterest }]  (each AI school + its
   *     current interest in this prospect)
   *   - random
   * @returns {object} { bids: [{schoolId, amountM, interestDelta, reasonCodes}], summary }
   */
  function runBiddingRound(args) {
    const prospect = args.prospect || {};
    const random = args.random || Math.random;
    const bidders = args.bidders || [];
    const bids = [];
    bidders.forEach((b) => {
      const bid = computeBid({
        school: b.school, prospect,
        existingInterest: b.existingInterest, random,
      });
      if (bid) {
        bids.push({
          schoolId: b.school.id,
          amountM: bid.amountM,
          interestDelta: interestBumpFromBid(bid.amountM, prospect),
          reasonCodes: bid.reasonCodes,
        });
      }
    });
    bids.sort((a, b) => b.amountM - a.amountM);
    return {
      bids,
      summary: {
        prospectId: prospect.id,
        totalBids: bids.length,
        totalSpentM: bids.reduce((s, b) => s + b.amountM, 0),
        topBidM: bids[0] ? bids[0].amountM : 0,
        topSchoolId: bids[0] ? bids[0].schoolId : null,
      },
    };
  }

  /**
   * Run bidding for all priority prospects this week.
   * Returns aggregate map for caller to apply.
   */
  function runWeeklyBiddingTick(args) {
    const prospects = args.prospects || [];
    const schoolIndex = args.schoolIndex || {}; // schoolId → school object
    const random = args.random || Math.random;
    const allRounds = [];
    let totalBids = 0;
    let totalSpentM = 0;
    prospects.forEach((p) => {
      // Build bidders from prospect.suitors using schoolIndex.
      const bidders = (p.suitors || [])
        .map((s) => {
          const school = schoolIndex[s.schoolId];
          if (!school) return null;
          return { school, existingInterest: s.interest };
        })
        .filter(Boolean);
      if (!bidders.length) return;
      const round = runBiddingRound({ prospect: p, bidders, random });
      if (round.bids.length) {
        allRounds.push({ prospectId: p.id, ...round });
        totalBids += round.bids.length;
        totalSpentM += round.summary.totalSpentM;
      }
    });
    return {
      rounds: allRounds,
      totalBids,
      totalSpentM: Math.round(totalSpentM * 100) / 100,
    };
  }

  global.CGM_AI_NIL = {
    computeBid,
    interestBumpFromBid,
    runBiddingRound,
    runWeeklyBiddingTick,
    expectedNilForOvrStars,
  };
})(window);
