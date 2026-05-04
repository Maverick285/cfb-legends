// AI-SCHOOL-1: Rival Game Simulation + Standings Evolution
// Spec: ai-pack/CFB_FM_NEXT_CORE_IMPLEMENTATION_SPECS/32_AI_SCHOOL_PROGRAM_MANAGER_SPEC.md
//
// First slice: lightweight game-result simulation for the other 133 FBS teams
// each week the player advances. No per-play decomposition for AI vs AI games
// (would burn perf budget); each result is sampled from a beta distribution
// driven by the two teams' programRating + sandbox volatility.
//
// Output: a Map<teamId, { wins, losses, ratingNow, recentResults }> the player
// app reads to update standings + National Top 25 weekly.
//
// Future packets: real per-play AI vs AI sim for "highlight" games; AI
// recruiting decisions; coaching carousel; portal AI.

(function initAiSchool(global) {
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function emptyRecord() {
    return { wins: 0, losses: 0, ratingNow: 70, recentResults: [], pointsFor: 0, pointsAgainst: 0, opponentsPlayed: [] };
  }

  /**
   * Initialize standings for every program. Call once at career start (idempotent).
   */
  function initStandings(programs) {
    const standings = {};
    programs.forEach((p) => {
      standings[p.id] = {
        ...emptyRecord(),
        ratingNow: Number.isFinite(p.programRating) ? p.programRating
                : Number.isFinite(p.basePrestige) ? p.basePrestige : 70,
        baseRating: Number.isFinite(p.programRating) ? p.programRating
                 : Number.isFinite(p.basePrestige) ? p.basePrestige : 70,
        conference: p.conference || null,
        shortName: p.shortName || p.name,
      };
    });
    return standings;
  }

  /**
   * Sample a single AI vs AI game result. Higher-rated team wins more often,
   * with margin scaling with rating gap. Volatility multiplier widens variance.
   */
  function simulateAiGame(args) {
    const { teamA, teamB, random, volatility, neutralSite } = args;
    const homeBoost = neutralSite ? 0 : 3;
    const aRating = teamA.ratingNow + homeBoost;
    const bRating = teamB.ratingNow;
    const ratingGap = aRating - bRating;
    const vol = Math.max(0.6, Math.min(1.6, volatility || 1));
    // Sample two scoring lines, then add gap-adjusted bias.
    const aBase = 17 + (aRating - 70) * 0.55 + (random() - 0.5) * 28 * vol;
    const bBase = 17 + (bRating - 70) * 0.55 + (random() - 0.5) * 28 * vol;
    const gapBias = ratingGap * 0.4;
    const aPoints = Math.max(0, Math.round(aBase + gapBias * 0.5));
    const bPoints = Math.max(0, Math.round(bBase - gapBias * 0.5));
    if (aPoints === bPoints) {
      // Decide overtime by rating + random.
      const tiebreak = (aRating - bRating) * 0.05 + (random() - 0.5);
      if (tiebreak >= 0) return { aPoints: aPoints + 3, bPoints };
      return { aPoints, bPoints: bPoints + 3 };
    }
    return { aPoints, bPoints };
  }

  /**
   * Pair up programs and sim games for one weekly tick. Tries to pair within
   * the same conference 70% of the time; the rest are non-conference. Skips
   * the player team (their game is simmed elsewhere with the per-play engine).
   */
  function runWeeklyAiSchoolTick(args) {
    const { programs, standings, random, playerTeamId, volatility, weekIndex } = args;
    const eligible = programs
      .map((p) => p.id)
      .filter((id) => id !== playerTeamId);

    // Shuffle deterministically so pairings rotate per week.
    const order = eligible.slice();
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    const events = [];
    const used = new Set();
    for (let i = 0; i < order.length; i += 1) {
      const aId = order[i];
      if (used.has(aId)) continue;
      const teamA = standings[aId];
      if (!teamA) continue;
      // Pick an opponent: prefer same-conference unmatched team.
      let opponentId = null;
      for (let j = i + 1; j < order.length; j += 1) {
        const candId = order[j];
        if (used.has(candId)) continue;
        const teamB = standings[candId];
        if (!teamB) continue;
        const sameConf = teamA.conference && teamA.conference === teamB.conference;
        const wantSameConf = random() < 0.7;
        if (wantSameConf === sameConf) { opponentId = candId; break; }
      }
      if (!opponentId) {
        // Fallback to next unmatched.
        for (let j = i + 1; j < order.length; j += 1) {
          if (!used.has(order[j])) { opponentId = order[j]; break; }
        }
      }
      if (!opponentId) continue;
      used.add(aId);
      used.add(opponentId);
      const teamB = standings[opponentId];
      const result = simulateAiGame({
        teamA,
        teamB,
        random,
        volatility,
        neutralSite: false,
      });
      // Apply to standings.
      teamA.pointsFor += result.aPoints;
      teamA.pointsAgainst += result.bPoints;
      teamB.pointsFor += result.bPoints;
      teamB.pointsAgainst += result.aPoints;
      teamA.opponentsPlayed.push(opponentId);
      teamB.opponentsPlayed.push(aId);
      const aWon = result.aPoints > result.bPoints;
      if (aWon) { teamA.wins += 1; teamB.losses += 1; }
      else      { teamB.wins += 1; teamA.losses += 1; }
      // Rolling rating drift: a quality win/loss bumps rating slightly.
      const drift = aWon
        ? clamp(((teamB.ratingNow - teamA.ratingNow) + 4) * 0.06, -0.6, 1.4)
        : clamp(((teamB.ratingNow - teamA.ratingNow) - 4) * 0.06, -1.4, 0.6);
      teamA.ratingNow = clamp(Math.round((teamA.ratingNow + drift) * 10) / 10, 40, 99);
      teamB.ratingNow = clamp(Math.round((teamB.ratingNow - drift) * 10) / 10, 40, 99);
      // Record on each team's recent log (cap 6).
      teamA.recentResults.unshift({ week: weekIndex, opponent: opponentId, points: result.aPoints, oppPoints: result.bPoints, win: aWon });
      teamB.recentResults.unshift({ week: weekIndex, opponent: aId, points: result.bPoints, oppPoints: result.aPoints, win: !aWon });
      teamA.recentResults = teamA.recentResults.slice(0, 6);
      teamB.recentResults = teamB.recentResults.slice(0, 6);
      events.push({
        homeId: aId, awayId: opponentId,
        homeShort: teamA.shortName, awayShort: teamB.shortName,
        homePoints: result.aPoints, awayPoints: result.bPoints,
        homeWon: aWon,
      });
    }
    return events;
  }

  /**
   * Reset all rivals' season records (called on year rollover).
   */
  function resetSeasonRecords(standings) {
    Object.values(standings).forEach((rec) => {
      rec.wins = 0;
      rec.losses = 0;
      rec.pointsFor = 0;
      rec.pointsAgainst = 0;
      rec.recentResults = [];
      rec.opponentsPlayed = [];
    });
  }

  /**
   * Top N teams by rating (with light tiebreaker: wins, then point diff).
   */
  function topTeams(standings, limit) {
    return Object.entries(standings)
      .map(([id, rec]) => ({ id, ...rec }))
      .sort((a, b) => {
        if (b.ratingNow !== a.ratingNow) return b.ratingNow - a.ratingNow;
        if (b.wins !== a.wins) return b.wins - a.wins;
        return (b.pointsFor - b.pointsAgainst) - (a.pointsFor - a.pointsAgainst);
      })
      .slice(0, limit || 25);
  }

  global.CGM_AI_SCHOOL = {
    initStandings,
    simulateAiGame,
    runWeeklyAiSchoolTick,
    resetSeasonRecords,
    topTeams,
  };
})(window);
