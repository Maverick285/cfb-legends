// MATCHUP-1: Attribute Registry + Team Unit Ratings
// Spec: ai-pack/CFB_FM_NEXT_CORE_IMPLEMENTATION_SPECS/29_ATTRIBUTE_TO_OUTCOME_AND_PLAYER_MATCHUP_SPEC.md
//
// Translates a roster of player profiles (with the existing 36-key 1-20 `attrs`
// plus `position` / `ovr` / `hidden`) into a structured set of UNIT RATINGS
// scaled 0-100 that the matchup engine consumes. Each unit rating is the
// average of the top-N players at the contributing positions across the
// relevant attribute keys, with a small bonus for OVR depth so a deep team
// edges a thin one even when the top-line numbers match.
//
// All functions are pure and deterministic.

(function initAttributeRegistry(global) {
  // attribute keys per unit role, drawn from the existing 36-key generic attrs.
  // (Kept in sync with PLAYER_ATTRS / KEY_ATTRS_BY_POSITION in app.js.)
  const UNIT_DEFS = {
    // OFFENSE
    qb_passing:       { positions: ["QB"],       slots: 1, attrs: ["throwing","decisions","anticipation","composure","concentration","technique","vision"] },
    qb_mobility:      { positions: ["QB"],       slots: 1, attrs: ["pace","acceleration","agility","balance","decisions"] },
    rb_rushing:       { positions: ["HB"],       slots: 2, attrs: ["ballCarrying","pace","acceleration","agility","balance","vision","bravery"] },
    rb_receiving:     { positions: ["HB"],       slots: 2, attrs: ["catching","routeRunning","firstTouch","agility","offTheBall"] },
    wr_separation:    { positions: ["WR"],       slots: 3, attrs: ["routeRunning","pace","acceleration","agility","offTheBall","flair"] },
    wr_hands:         { positions: ["WR"],       slots: 3, attrs: ["catching","concentration","firstTouch","jumping","composure"] },
    te_versatility:   { positions: ["TE"],       slots: 2, attrs: ["catching","routeRunning","passBlocking","strength","positioning"] },
    ol_pass_block:    { positions: ["LT","OT","OG","C"], slots: 5, attrs: ["passBlocking","technique","strength","anticipation","determination"] },
    ol_run_block:     { positions: ["LT","OT","OG","C"], slots: 5, attrs: ["runBlocking","strength","technique","determination","aggression"] },
    // DEFENSE
    edge_pass_rush:   { positions: ["EDGE","DE"], slots: 3, attrs: ["passRush","acceleration","agility","strength","technique","aggression"] },
    dl_run_stop:      { positions: ["DT","DE","EDGE"], slots: 4, attrs: ["tackling","strength","positioning","anticipation","determination"] },
    lb_tackling:      { positions: ["LB"],       slots: 3, attrs: ["tackling","positioning","anticipation","decisions","aggression"] },
    lb_coverage:      { positions: ["LB"],       slots: 3, attrs: ["coverage","anticipation","agility","decisions","positioning"] },
    cb_coverage:      { positions: ["CB","DB"],  slots: 3, attrs: ["coverage","pace","acceleration","anticipation","agility","positioning"] },
    s_coverage:       { positions: ["S","DB"],   slots: 2, attrs: ["coverage","positioning","anticipation","decisions","jumping"] },
    s_run_support:    { positions: ["S","DB"],   slots: 2, attrs: ["tackling","positioning","aggression","anticipation","strength"] },
    // SPECIAL TEAMS
    kicking:          { positions: ["K"],        slots: 1, attrs: ["kicking","composure","concentration","determination","technique"] },
    punting:          { positions: ["P"],        slots: 1, attrs: ["punting","composure","concentration","technique"] },
  };

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /**
   * Compute average attr value (1-20) across a list of players for the given
   * attr keys. Missing players or attrs are treated as 10 (neutral).
   */
  function averageAttrAcross(players, attrKeys) {
    if (!players.length || !attrKeys.length) return 10;
    let total = 0;
    let count = 0;
    players.forEach((p) => {
      const attrs = p && p.attrs;
      attrKeys.forEach((k) => {
        const v = attrs && Number.isFinite(attrs[k]) ? attrs[k] : 10;
        total += v;
        count += 1;
      });
    });
    return count > 0 ? total / count : 10;
  }

  /**
   * Pick the top N players at any of the given positions, sorted by OVR DESC.
   * Players with no OVR fall back to 60.
   */
  function pickTopAtPositions(roster, positions, slots) {
    if (!Array.isArray(roster)) return [];
    const allowed = new Set(positions);
    const pool = roster.filter((p) => p && allowed.has(p.position));
    pool.sort((a, b) => (Number(b.ovr) || 60) - (Number(a.ovr) || 60));
    return pool.slice(0, Math.max(1, slots));
  }

  /**
   * 1-20 average → 0-100 unit rating. We keep a slight nonlinear lift on the
   * elite end so a roster averaging 17 reads "elite" rather than just "above
   * average" — matches the spec's `eliteMultiplier` guidance (line ~125).
   */
  function unitRatingFromAttrAvg(avg) {
    const linear = ((avg - 1) / 19) * 100;
    // Sigmoid-ish lift centered at 12 (FM-style "first-team starter" line).
    const eliteLift = 1 / (1 + Math.exp(-(avg - 12) / 2));
    return clamp(Math.round(linear + eliteLift * 4 - 2), 1, 99);
  }

  /**
   * Compute a single unit rating for a roster.
   * Returns { unit, rating, depth, contributors }
   *   rating: 0-100
   *   depth:  0-100, how many quality bodies the unit has
   *   contributors: top-N players that produced the rating
   */
  function computeUnitRating(roster, unitId) {
    const def = UNIT_DEFS[unitId];
    if (!def) {
      return { unit: unitId, rating: 50, depth: 50, contributors: [] };
    }
    const top = pickTopAtPositions(roster, def.positions, def.slots);
    if (!top.length) {
      return { unit: unitId, rating: 50, depth: 30, contributors: [] };
    }
    const avg = averageAttrAcross(top, def.attrs);
    const rating = unitRatingFromAttrAvg(avg);
    // depth: count of players >= 70 OVR at the unit's positions.
    const allowed = new Set(def.positions);
    const qualityBodies = roster.filter((p) => p && allowed.has(p.position) && (Number(p.ovr) || 0) >= 70).length;
    const depth = clamp(Math.round((qualityBodies / Math.max(1, def.slots * 1.5)) * 100), 1, 99);
    return { unit: unitId, rating, depth, contributors: top };
  }

  /**
   * Compute every unit rating for a team.
   * Returns { teamId, units: { unit_id: { rating, depth, contributors } } }
   */
  function computeTeamUnits(roster, teamId) {
    const units = {};
    Object.keys(UNIT_DEFS).forEach((unitId) => {
      const result = computeUnitRating(roster, unitId);
      units[unitId] = { rating: result.rating, depth: result.depth, contributors: result.contributors };
    });
    return { teamId: teamId || null, units };
  }

  /**
   * Quick-look summary: pick the offensive and defensive unit a team is
   * strongest in. Used for narrative reason codes and program-identity tags.
   */
  function teamStrengths(teamUnits, count) {
    const limit = count || 3;
    const entries = Object.entries(teamUnits.units).map(([id, u]) => ({ id, rating: u.rating }));
    entries.sort((a, b) => b.rating - a.rating);
    return entries.slice(0, limit);
  }

  global.CGM_MATCHUP_REGISTRY = {
    UNIT_DEFS,
    UNIT_IDS: Object.keys(UNIT_DEFS),
    computeUnitRating,
    computeTeamUnits,
    teamStrengths,
    // exposed for reuse in matchup math + tests
    averageAttrAcross,
    pickTopAtPositions,
    unitRatingFromAttrAvg,
  };
})(window);
