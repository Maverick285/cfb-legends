// NIL-1: Booster + NIL Pool + Recruit Money Sensitivity
// Spec: ai-pack/CFB_FM_NEXT_CORE_IMPLEMENTATION_SPECS/33_NIL_BOOSTER_AND_ROSTER_ECONOMICS_IMPLEMENTATION_SPEC.md
//
// First slice: track a per-program NIL pool that recharges weekly from the
// program's nilTier + booster temperature. Spend reduces it; spend on a
// prospect increases that prospect's "interest_nil" contribution and tilts
// commitment in our favor (tilt is small-to-moderate, not deterministic — per
// spec "NIL is one input of 13").

(function initNilEngine(global) {
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  // Convert a school's nilTier (1–9) into a starting pool size in $M.
  function startingPool(nilTier, fanBase) {
    const fanMult = fanBase === "massive" ? 1.4 : fanBase === "large" ? 1.15 : fanBase === "medium" ? 1.0 : 0.75;
    return Math.round(((nilTier || 5) * 1.4) * fanMult * 10) / 10;
  }

  function emptyState(program) {
    return {
      poolMillions: startingPool(program.nilTier, program.fanBase),
      capMillions: startingPool(program.nilTier, program.fanBase) * 2.0,
      weeklyRecharge: 0.18 + (program.nilTier || 5) * 0.05,
      pledgesThisCycle: [],
      spendThisYear: 0,
      complianceFlags: 0,
    };
  }

  function ensureState(state, program) {
    if (!state) return emptyState(program);
    if (!Number.isFinite(state.poolMillions)) state.poolMillions = startingPool(program.nilTier, program.fanBase);
    if (!Number.isFinite(state.capMillions)) state.capMillions = state.poolMillions * 2.0;
    if (!Number.isFinite(state.weeklyRecharge)) state.weeklyRecharge = 0.18 + (program.nilTier || 5) * 0.05;
    if (!Array.isArray(state.pledgesThisCycle)) state.pledgesThisCycle = [];
    if (!Number.isFinite(state.spendThisYear)) state.spendThisYear = 0;
    if (!Number.isFinite(state.complianceFlags)) state.complianceFlags = 0;
    return state;
  }

  /**
   * Recharge pool weekly. Boosters supply more when the team is winning
   * (boosterTempScore from Campus Pulse, 0–100) and less when losing.
   */
  function rechargeWeekly(state, program, boosterTempScore) {
    ensureState(state, program);
    const tempMult = clamp(0.5 + (boosterTempScore || 50) / 100, 0.4, 1.4);
    const drip = state.weeklyRecharge * tempMult;
    state.poolMillions = clamp(Math.round((state.poolMillions + drip) * 100) / 100, 0, state.capMillions);
    return drip;
  }

  /**
   * Pledge NIL money to a specific prospect. Returns:
   *   { ok: bool, amountSpent, reasonCodes }
   * Side effects:
   *   - Reduces poolMillions
   *   - Adds suitor reasonCode "nil_collective_swing" to event log path
   *   - Bumps the prospect's "nilOpportunity" contribution by tilting their
   *     suitor.interest +X (caller is responsible for re-running interest math)
   */
  function pledgeToProspect(state, program, amountM, prospect, reasonCodes) {
    ensureState(state, program);
    const reasons = (reasonCodes || []).slice();
    if (state.poolMillions < amountM) {
      reasons.push("insufficient_nil_pool");
      return { ok: false, amountSpent: 0, reasonCodes: reasons };
    }
    state.poolMillions = Math.round((state.poolMillions - amountM) * 100) / 100;
    state.spendThisYear = Math.round((state.spendThisYear + amountM) * 100) / 100;
    state.pledgesThisCycle.unshift({
      prospectId: prospect.id, prospectName: prospect.name,
      amountM, week: state.lastWeek || 0,
    });
    state.pledgesThisCycle = state.pledgesThisCycle.slice(0, 20);
    reasons.push("nil_collective_swing");
    return { ok: true, amountSpent: amountM, reasonCodes: reasons };
  }

  /**
   * Compute the interest-bump a NIL pledge should produce for a given prospect.
   * Spec: NIL matters more for "money-motivated" prospects. We read
   * prospect.preferences.nil weight (0–1) and amountM to scale.
   */
  function pledgeInterestBump(prospect, amountM) {
    const weight = (prospect.preferences && prospect.preferences.nil) || 0.5;
    const sizeFactor = clamp(amountM / 1.0, 0.2, 4.0); // 1M = baseline
    return Math.round(weight * sizeFactor * 6); // 0–24 point bump
  }

  /** Year rollover: zero spendThisYear and pledgesThisCycle but preserve pool. */
  function rolloverNilForNewSeason(state) {
    if (!state) return;
    state.spendThisYear = 0;
    state.pledgesThisCycle = [];
  }

  /** Compliance: if spend exceeds 1.5× cap in a season, flag it. */
  function maybeFlagCompliance(state) {
    if (!state) return false;
    if (state.spendThisYear > state.capMillions * 1.5) {
      state.complianceFlags += 1;
      return true;
    }
    return false;
  }

  global.CGM_NIL = {
    startingPool,
    emptyState,
    ensureState,
    rechargeWeekly,
    pledgeToProspect,
    pledgeInterestBump,
    rolloverNilForNewSeason,
    maybeFlagCompliance,
  };
})(window);
