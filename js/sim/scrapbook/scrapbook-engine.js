// SCRAPBOOK-1 deeper: importance scoring + season-end compose
// Spec: ai-pack/CFB_FM_UI_NARRATIVE_VIBE_PACK/06_PROGRAM_SCRAPBOOK_AND_MEMORY_SYSTEM.md
//
// Reads from the existing event log and produces:
//   - per-event importance tier (1-4) using reason codes + stats deltas
//   - season-end scrapbook page (curated subset, deduped, ordered)
//   - per-program memory archive that grows year-over-year

(function initScrapbook(global) {
  // ── Tiers ──────────────────────────────────────────────────────────────
  // 1 = trivia, 2 = notable, 3 = major (prompt-to-file), 4 = historic (auto-file)
  const TIER = { TRIVIA: 1, NOTABLE: 2, MAJOR: 3, HISTORIC: 4 };

  // Reason codes that auto-bump to historic.
  const HISTORIC_KEYS = new Set([
    "national_title_won",
    "first_playoff_appearance",
    "first_five_star",
    "school_record_set",
    "rivalry_streak_broken",
    "stadium_completed",
    "first_first_round_pick",
    "coach_milestone",
    "realignment_move",
    "national_award_won",
    "perfect_season",
    "undefeated_regular",
  ]);
  const MAJOR_KEYS = new Set([
    "conference_title_won",
    "rivalry_win",
    "rivalry_loss",
    "ranked_upset",
    "comeback_win",
    "blowout_win",
    "blowout_loss",
    "5star_commit",
    "elite_class_signed",
    "coach_fired",
    "coach_hired_marquee",
    "starting_qb_injury",
    "captain_left",
    "explosive_kickoff_return",
    "punt_return_touchdown",
  ]);
  const NOTABLE_KEYS = new Set([
    "explosive_pass_play",
    "red_zone_efficient",
    "fourth_quarter_collapse",
    "fourth_down_conversion",
    "two_deep_left",
    "starter_left",
    "scheme_install_reset",
    "promise_landed",
    "promise_dismissed",
    "booming_punt",
    "run_bucket_breakaway",
    "national_top_25_entry",
  ]);

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /**
   * Score a single event. Returns { tier, score, reasonCodes }.
   * @param {object} event — shape from CGM_EVENT_LOG.createEvent
   * @param {object} ctx — { isRivalry?, isPostseason?, programFirsts? Set, scoreMargin?, opponentRanked? }
   */
  function scoreEvent(event, ctx) {
    const codes = event.reasonCodes || [];
    const c = ctx || {};
    let score = 0;

    // Severity floor.
    const sev = event.severity || "minor";
    score += sev === "historic" ? 80 : sev === "major" ? 50 : sev === "notable" ? 25 : sev === "minor" ? 8 : 2;

    // Reason-code lifts.
    let auto = null;
    for (const code of codes) {
      if (HISTORIC_KEYS.has(code)) { auto = TIER.HISTORIC; score += 40; }
      else if (MAJOR_KEYS.has(code)) { auto = auto || TIER.MAJOR; score += 18; }
      else if (NOTABLE_KEYS.has(code)) { score += 6; }
    }

    // Context lifts.
    if (c.isRivalry) score += 12;
    if (c.isPostseason) score += 18;
    if (c.opponentRanked) score += 8;
    if (Number(c.scoreMargin) >= 28 || Number(c.scoreMargin) <= -28) score += 10;
    if (c.programFirsts && c.programFirsts.has(event.category)) {
      score += 30;
      auto = auto || TIER.MAJOR;
    }

    // Map score to tier (auto-set wins).
    let tier;
    if (auto) tier = auto;
    else if (score >= 80) tier = TIER.HISTORIC;
    else if (score >= 50) tier = TIER.MAJOR;
    else if (score >= 25) tier = TIER.NOTABLE;
    else tier = TIER.TRIVIA;

    return { tier, score: clamp(Math.round(score), 0, 200), tierName: tierName(tier) };
  }

  function tierName(t) {
    return t === 4 ? "historic" : t === 3 ? "major" : t === 2 ? "notable" : "trivia";
  }

  /**
   * Score a list of events and return the top N by score, deduplicated by
   * (category, primaryEntity).
   */
  function topMomentsForSeason(args) {
    const events = args.events || [];
    const ctx = args.ctx || {};
    const limit = args.limit || 12;
    const minTier = args.minTier || TIER.NOTABLE;
    const scored = events.map((e) => ({ event: e, ...scoreEvent(e, ctx) }));
    const filtered = scored.filter((s) => s.tier >= minTier);
    // Dedupe key: category + primary actor.
    const seen = new Set();
    const unique = [];
    for (const s of filtered.sort((a, b) => b.score - a.score)) {
      const key = `${s.event.category}|${s.event.actorId || ""}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(s);
      if (unique.length >= limit) break;
    }
    return unique;
  }

  /**
   * Compose a season-end Scrapbook page from a list of scored moments.
   * Returns a structured page the UI can render.
   */
  function composeSeasonPage(args) {
    const season = args.season || new Date().getFullYear();
    const moments = args.moments || [];
    const programName = args.programName || "the Program";
    const finalRecord = args.finalRecord || null;

    // Bucket by category for the page layout.
    const byCategory = {};
    moments.forEach((m) => {
      const cat = m.event.category || "other";
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(m);
    });

    const headlines = moments.slice(0, 3).map((m) => ({
      headline: m.event.summary || "Untitled",
      tier: m.tierName,
      score: m.score,
      category: m.event.category,
    }));

    const pageTitle = season + " Season — " + programName;
    const subtitle = finalRecord ? `Final record: ${finalRecord}` : "";

    return {
      season,
      programName,
      pageTitle,
      subtitle,
      headlines,
      byCategory,
      momentCount: moments.length,
      historicCount: moments.filter((m) => m.tier === TIER.HISTORIC).length,
    };
  }

  /**
   * Build a multi-season memory archive from per-season pages.
   */
  function composeMemoryArchive(args) {
    const pages = args.pages || [];
    const sorted = pages.slice().sort((a, b) => b.season - a.season);
    const totals = sorted.reduce((acc, p) => {
      acc.seasons += 1;
      acc.moments += p.momentCount || 0;
      acc.historic += p.historicCount || 0;
      return acc;
    }, { seasons: 0, moments: 0, historic: 0 });
    return { pages: sorted, totals };
  }

  global.CGM_SCRAPBOOK = {
    TIER,
    HISTORIC_KEYS,
    MAJOR_KEYS,
    NOTABLE_KEYS,
    scoreEvent,
    tierName,
    topMomentsForSeason,
    composeSeasonPage,
    composeMemoryArchive,
  };
})(window);
