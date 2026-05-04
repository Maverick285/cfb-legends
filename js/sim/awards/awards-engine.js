// AWARDS-1: Awards + Records engine
// Spec: 39_AWARDS_RECORDS_HISTORY_AND_MEDIA_NARRATIVE_SPEC.md
//
// First slice:
//   - Weekly award resolution (Player of the Week buckets) from a per-week
//     player-stat snapshot
//   - Season award resolution (Player of the Year, position awards, COY,
//     Conference POTY, All-American teams)
//   - Record book: school season + national season + career-best detection
//   - Watch lists with progress bars (preseason / midseason / finalist / winner)
//
// Pure: caller passes per-player season stat lines; module produces ballots
// + winners + record breaks. Caller persists to data.

(function initAwards(global) {
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  // ── Award definitions ──────────────────────────────────────────────────
  const SEASON_AWARDS = [
    { id: "poty",        label: "Player of the Year",      positions: ["QB","HB","WR","TE","EDGE","LB","CB","S"], statBlend: "best_overall" },
    { id: "qb_award",    label: "Quarterback of the Year", positions: ["QB"], statBlend: "qb" },
    { id: "rb_award",    label: "Running Back of the Year",positions: ["HB"], statBlend: "rb" },
    { id: "wr_award",    label: "Receiver of the Year",    positions: ["WR","TE"], statBlend: "wr" },
    { id: "ol_award",    label: "OL of the Year",          positions: ["LT","OT","OG","C"], statBlend: "ol" },
    { id: "edge_award",  label: "Edge of the Year",        positions: ["EDGE","DE"], statBlend: "edge" },
    { id: "lb_award",    label: "LB of the Year",          positions: ["LB"], statBlend: "lb" },
    { id: "db_award",    label: "DB of the Year",          positions: ["CB","S","DB"], statBlend: "db" },
    { id: "fr_award",    label: "Freshman of the Year",    positions: ["QB","HB","WR","TE","EDGE","LB","CB","S","DT","DE","OT","OG","C","LT"], statBlend: "best_overall", filter: (p) => p.year === "FR" },
    { id: "coy",         label: "Coach of the Year",       positions: [], statBlend: "coach" },
  ];

  // Score blend weights per blend type. Returns a 0-100 candidacy score.
  function scoreCandidate(player, statLine, ctx) {
    const blend = ctx.blend || "best_overall";
    const teamWinPct = clamp(ctx.teamWinPct || 0.5, 0, 1);
    const conferenceStrength = clamp(ctx.conferenceStrength || 0.5, 0, 1);
    const reasonCodes = [];
    let score = 0;

    if (blend === "qb") {
      const yds = (statLine && statLine.passing_yards) || 0;
      const td = (statLine && statLine.passing_tds) || 0;
      const ints = (statLine && statLine.passing_ints) || 0;
      score = clamp((yds / 50) + (td * 5) - (ints * 4), 0, 100);
      if (yds >= 3500) reasonCodes.push("3500yd_passer");
      if (td >= 30) reasonCodes.push("30+TDs");
    } else if (blend === "rb") {
      const yds = (statLine && statLine.rushing_yards) || 0;
      const td = (statLine && statLine.rushing_tds) || 0;
      score = clamp((yds / 25) + (td * 5), 0, 100);
      if (yds >= 1500) reasonCodes.push("1500yd_rusher");
    } else if (blend === "wr") {
      const yds = (statLine && statLine.receiving_yards) || 0;
      const rec = (statLine && statLine.receiving_rec) || 0;
      const td = (statLine && statLine.receiving_tds) || 0;
      score = clamp((yds / 25) + (rec * 0.6) + (td * 5), 0, 100);
      if (yds >= 1200) reasonCodes.push("1200yd_receiver");
    } else if (blend === "edge") {
      const sacks = (statLine && statLine.sacks) || 0;
      const tfl = (statLine && statLine.tfl) || 0;
      score = clamp((sacks * 6) + (tfl * 2.5), 0, 100);
      if (sacks >= 12) reasonCodes.push("double_digit_sacks");
    } else if (blend === "lb") {
      const tackles = (statLine && statLine.tackles) || 0;
      const sacks = (statLine && statLine.sacks) || 0;
      const ff = (statLine && statLine.forced_fumbles) || 0;
      score = clamp((tackles * 0.7) + (sacks * 4) + (ff * 5), 0, 100);
    } else if (blend === "db") {
      const ints = (statLine && statLine.interceptions) || 0;
      const pds = (statLine && statLine.pass_defenses) || 0;
      const tackles = (statLine && statLine.tackles) || 0;
      score = clamp((ints * 8) + (pds * 2) + (tackles * 0.4), 0, 100);
      if (ints >= 6) reasonCodes.push("ballhawk");
    } else if (blend === "ol") {
      // OL has no easy statline; use OVR as proxy + team rushing yards.
      score = clamp(((player.ovr || 70) - 50) * 2 + (ctx.teamRushYards || 0) / 60, 0, 100);
    } else if (blend === "coach") {
      // Inputs: team win pct vs expected, conference title, postseason advance.
      const expectedWinPct = ctx.expectedWinPct || 0.5;
      const overperform = teamWinPct - expectedWinPct;
      score = clamp(50 + overperform * 100 + (ctx.confTitle ? 15 : 0) + (ctx.playoffAdvance || 0) * 10, 0, 100);
      if (overperform >= 0.2) reasonCodes.push("overperformance");
    } else { // best_overall
      const all = [
        scoreCandidate(player, statLine, { ...ctx, blend: "qb" }),
        scoreCandidate(player, statLine, { ...ctx, blend: "rb" }),
        scoreCandidate(player, statLine, { ...ctx, blend: "wr" }),
        scoreCandidate(player, statLine, { ...ctx, blend: "edge" }),
        scoreCandidate(player, statLine, { ...ctx, blend: "lb" }),
        scoreCandidate(player, statLine, { ...ctx, blend: "db" }),
      ];
      score = Math.max(...all.map((a) => a.score));
    }

    // Spec: do NOT use stats alone. Apply non-stat modifiers.
    score *= 0.85 + (teamWinPct - 0.5) * 0.4; // team success
    score *= 0.9 + conferenceStrength * 0.2;   // conference quality
    if (ctx.bigGameMomentBonus) score += 5;
    if (ctx.rivalryWin) score += 3;
    if (ctx.postseasonPerformance) score += 6;

    return {
      score: Math.round(clamp(score, 0, 100)),
      reasonCodes: reasonCodes.concat(
        teamWinPct >= 0.75 ? ["team_success"] :
        teamWinPct < 0.4 ? ["team_struggles"] : []
      ),
    };
  }

  /**
   * Run season awards across a roster + opponent context.
   * @param {object} args
   *   - players: [{ id, name, position, year, ovr, teamId }]
   *   - statsByPlayerId: { playerId: { passing_yards, ... } }
   *   - teamWinPctByTeamId: { teamId: 0..1 }
   *   - conferenceStrengthByTeamId: { teamId: 0..1 }
   * @returns {object} { ballots: [{award, candidates: [{playerId, score, reasonCodes}], winner}] }
   */
  function resolveSeasonAwards(args) {
    const players = args.players || [];
    const stats = args.statsByPlayerId || {};
    const winPct = args.teamWinPctByTeamId || {};
    const confStr = args.conferenceStrengthByTeamId || {};

    const ballots = SEASON_AWARDS.map((award) => {
      let pool = players;
      if (award.positions && award.positions.length) pool = pool.filter((p) => award.positions.includes(p.position));
      if (typeof award.filter === "function") pool = pool.filter(award.filter);

      const candidates = pool.map((p) => {
        const result = scoreCandidate(p, stats[p.id], {
          blend: award.statBlend,
          teamWinPct: winPct[p.teamId] || 0.5,
          conferenceStrength: confStr[p.teamId] || 0.5,
        });
        return { playerId: p.id, playerName: p.name, position: p.position, year: p.year, teamId: p.teamId, ...result };
      }).sort((a, b) => b.score - a.score);

      const winner = candidates[0] || null;
      const finalists = candidates.slice(0, 5);
      return {
        award: award.id,
        label: award.label,
        candidates: candidates.slice(0, 10),
        finalists,
        winner,
      };
    });

    return { ballots };
  }

  /**
   * Compute All-Conference + All-American teams from the same data.
   * Returns { allConference: { confId: [{position, playerId, line}] }, allAmerican: [...] }
   */
  function resolveAllTeams(args) {
    const players = args.players || [];
    const stats = args.statsByPlayerId || {};
    const winPct = args.teamWinPctByTeamId || {};
    const confStr = args.conferenceStrengthByTeamId || {};
    const conferenceByTeamId = args.conferenceByTeamId || {};

    const POS_SLOTS = ["QB","HB","WR","TE","LT","OG","C","EDGE","DT","LB","CB","S"];
    const allConference = {};
    const allAmericanCandidates = [];

    POS_SLOTS.forEach((pos) => {
      const positionPool = players.filter((p) => p.position === pos);
      const scored = positionPool.map((p) => {
        const result = scoreCandidate(p, stats[p.id], {
          blend: pos === "QB" ? "qb" : pos === "HB" ? "rb" : (pos === "WR" || pos === "TE") ? "wr"
              : ["LT","OT","OG","C"].includes(pos) ? "ol" : pos === "EDGE" ? "edge" : pos === "LB" ? "lb"
              : "db",
          teamWinPct: winPct[p.teamId] || 0.5,
          conferenceStrength: confStr[p.teamId] || 0.5,
        });
        return { ...result, player: p, conf: conferenceByTeamId[p.teamId] || null };
      }).sort((a, b) => b.score - a.score);

      // Per conference: pick top scorer at this position
      const byConf = {};
      scored.forEach((s) => {
        if (!s.conf) return;
        if (!byConf[s.conf]) byConf[s.conf] = [];
        byConf[s.conf].push(s);
      });
      Object.entries(byConf).forEach(([confId, list]) => {
        if (!allConference[confId]) allConference[confId] = [];
        allConference[confId].push({
          position: pos, playerId: list[0].player.id, playerName: list[0].player.name,
          score: list[0].score, reasonCodes: list[0].reasonCodes,
        });
      });

      // All-American: top 1 nationally per position
      if (scored[0]) {
        allAmericanCandidates.push({
          position: pos, playerId: scored[0].player.id, playerName: scored[0].player.name,
          score: scored[0].score, reasonCodes: scored[0].reasonCodes,
        });
      }
    });

    return { allConference, allAmerican: allAmericanCandidates };
  }

  // ── Records ────────────────────────────────────────────────────────────
  /**
   * Detect record breaks given the season's stats vs an existing recordBook.
   * @param {object} args { recordBook, statsByPlayerId, players, teamId }
   * @returns {object} { breaks: [{type, scope, holder, value, prev}] }
   */
  function detectRecordBreaks(args) {
    const breaks = [];
    const book = args.recordBook || {};
    const stats = args.statsByPlayerId || {};
    const players = args.players || [];
    const seasonYear = args.seasonYear || new Date().getFullYear();

    // School-season records
    const schoolRecords = book.schoolSeason || {};
    const schoolStatTypes = [
      ["passing_yards", "Single-Season Passing Yards"],
      ["passing_tds",   "Single-Season Passing TDs"],
      ["rushing_yards", "Single-Season Rushing Yards"],
      ["rushing_tds",   "Single-Season Rushing TDs"],
      ["receiving_yards","Single-Season Receiving Yards"],
      ["receiving_rec", "Single-Season Receptions"],
      ["sacks",         "Single-Season Sacks"],
      ["interceptions", "Single-Season Interceptions"],
      ["tackles",       "Single-Season Tackles"],
    ];

    schoolStatTypes.forEach(([key, label]) => {
      let topPlayer = null;
      let topVal = 0;
      players.forEach((p) => {
        if (p.teamId !== args.teamId) return;
        const v = (stats[p.id] || {})[key] || 0;
        if (v > topVal) { topVal = v; topPlayer = p; }
      });
      if (!topPlayer) return;
      const prev = schoolRecords[key];
      if (!prev || topVal > (prev.value || 0)) {
        breaks.push({
          scope: "school_season", type: key, label,
          holder: topPlayer.name, holderId: topPlayer.id,
          value: topVal, prev: prev ? prev.value : 0,
          prevHolder: prev ? prev.holder : null,
          year: seasonYear,
        });
      }
    });

    return { breaks };
  }

  /**
   * Apply detected record breaks to the recordBook (mutates).
   * @returns the updated recordBook
   */
  function applyRecordBreaks(recordBook, breaks) {
    if (!recordBook.schoolSeason) recordBook.schoolSeason = {};
    breaks.forEach((b) => {
      if (b.scope === "school_season") {
        recordBook.schoolSeason[b.type] = {
          value: b.value, holder: b.holder, holderId: b.holderId, year: b.year, label: b.label,
        };
      }
    });
    return recordBook;
  }

  // ── Watch lists (preseason + midseason snapshots) ──────────────────────
  /**
   * Build a watch list snapshot for a given award.
   * @param {object} args { award (id), ballot, week }
   */
  function buildWatchListSnapshot(args) {
    const ballot = args.ballot || {};
    const candidates = (ballot.candidates || []).slice(0, 10);
    const stage = (args.week || 0) <= 2 ? "preseason"
                : (args.week || 0) <= 8 ? "midseason"
                : (args.week || 0) <= 13 ? "late_season_finalists"
                : "winner";
    return {
      award: ballot.award,
      label: ballot.label,
      stage,
      week: args.week,
      candidates: candidates.map((c) => ({
        playerId: c.playerId, playerName: c.playerName,
        position: c.position, score: c.score, teamId: c.teamId,
        reasonCodes: c.reasonCodes,
      })),
    };
  }

  global.CGM_AWARDS = {
    SEASON_AWARDS,
    scoreCandidate,
    resolveSeasonAwards,
    resolveAllTeams,
    detectRecordBreaks,
    applyRecordBreaks,
    buildWatchListSnapshot,
  };
})(window);
