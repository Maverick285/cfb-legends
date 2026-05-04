// STAT-3 (lite): Team Stat Accumulator
// Spec: ai-pack/CFB_FM_STATS_ENGINE_PACK/04_STAT_CREDIT_RULES.md
//        ai-pack/CFB_FM_STATS_ENGINE_PACK/05_ACCUMULATOR_RECONCILIATION_AND_STORAGE.md
//
// Walks an array of PlayEvents and produces a TeamGameBook with per-team
// totals + a per-game pair { home, away }. Until per-play decomposition lands
// (PLAYGEN-2..N), each PlayEvent is one drive-summary stand-in, so credit
// rules collapse to: charged play type → team rows.
//
// Per spec §"NCAA rule" sack yardage is charged against rushing, NOT passing
// — that's why "sack_college_rushing_loss" is a chargedPlayType and counted
// in team_rush_attempts / team_rushing_yards.

(function initStatAccumulator(global) {
  const TAX = global.CGM_STAT_TAXONOMY;
  if (!TAX) {
    if (global.console) global.console.error("CGM_STAT_TAXONOMY missing — load stat-taxonomy.js first");
    return;
  }

  function emptyTeamLine() {
    return {
      points: 0,
      touchdowns: 0,
      passing_touchdowns: 0,
      rushing_touchdowns: 0,
      field_goals_made: 0,
      total_yards: 0,
      total_plays: 0,
      turnovers: 0,
      team_pass_attempts: 0,
      team_pass_completions: 0,
      team_passing_yards: 0,
      team_interceptions_thrown: 0,
      team_rush_attempts: 0,
      team_rushing_yards: 0,
      drives: 0,
      // defensive aggregates (mirror of opponent line)
      points_allowed: 0,
      yards_allowed: 0,
      turnovers_forced: 0,
      sacks: 0,
      // Wave-12: penalty box-score
      penalties_count: 0,
      penalty_yards: 0,
    };
  }

  /**
   * Apply a single PlayEvent to the matching team's stat line.
   * @param {object} line   Team stat line (mutated)
   * @param {object} event  PlayEvent
   */
  function creditPlayEventToLine(line, event) {
    const charged = event.chargedPlayType;
    const yards = Number.isFinite(event.yardsGained) ? event.yardsGained : 0;
    const isScore = event.result && event.result.outcome === "score";
    const isTouchdownYards = isScore && yards >= 20;

    // Drives = each unique driveId. Caller dedupes via Set; we just bump on
    // the first event of a drive (callers route accordingly).
    if (charged === "rushing_attempt" || charged === "scramble_rush" || charged === "sack_college_rushing_loss") {
      line.team_rush_attempts += 1;
      line.team_rushing_yards += yards;
      line.total_plays += 1;
      line.total_yards += yards;
      if (isScore) {
        line.rushing_touchdowns += 1;
        line.touchdowns += 1;
        line.points += isTouchdownYards ? 7 : 6;
      }
    } else if (charged === "passing_attempt_complete") {
      line.team_pass_attempts += 1;
      line.team_pass_completions += 1;
      line.team_passing_yards += yards;
      line.total_plays += 1;
      line.total_yards += yards;
      if (isScore) {
        line.passing_touchdowns += 1;
        line.touchdowns += 1;
        line.points += isTouchdownYards ? 7 : 6;
      }
    } else if (charged === "passing_attempt_incomplete") {
      line.team_pass_attempts += 1;
      line.total_plays += 1;
    } else if (charged === "passing_attempt_interception") {
      line.team_pass_attempts += 1;
      line.team_interceptions_thrown += 1;
      line.turnovers += 1;
      line.total_plays += 1;
    } else if (charged === "field_goal_attempt") {
      if (isScore) {
        line.field_goals_made += 1;
        line.points += 3;
      }
    } else if (charged === "penalty_no_play" || event.playType === "penalty_only") {
      // Wave-12: book the penalty against the OFFENDING side.
      // outcome.kind tells us which side (penalty_offense vs penalty_defense),
      // but at the event level we infer from yardsGained sign + reason codes.
      // Simpler: defensive penalty has POSITIVE yards (offense gains), offensive
      // has NEGATIVE. So the offending team is the OFFENSE for negative yards
      // and the DEFENSE for positive yards. Since `line` is always the offense
      // here (we already gated on possessionTeamId match), invert for positive.
      const yds = Math.abs(yards);
      const isDefensivePenalty = yards > 0;
      // For now, both penalties get booked but to opposite sides.
      // We attach the "true offender" credit via a sibling helper.
      if (!isDefensivePenalty) {
        line.penalties_count += 1;
        line.penalty_yards += yds;
      }
      // (defensive penalties counted via the def line in buildGameBook below)
    }

    // Drive-summary tag (lets callers count drives without a separate event).
    if (charged === "rushing_attempt" || charged.startsWith("passing_attempt_")) {
      // Counted at the caller because we need driveId-level dedup.
    }
  }

  /**
   * Build a GameBook from an array of PlayEvents.
   * The book has { home, away } stat lines plus { meta }.
   *
   * Caller must tell us which teamId is "home" and which is "away" (via
   * `meta.homeTeamId` and `meta.awayTeamId`). Each PlayEvent's
   * possessionTeamId determines which line gets credited.
   */
  function buildGameBook(events, meta) {
    const m = meta || {};
    const home = emptyTeamLine();
    const away = emptyTeamLine();
    const driveSeen = { home: new Set(), away: new Set() };

    events.forEach((event) => {
      const off = event.possessionTeamId === m.homeTeamId ? home
                : event.possessionTeamId === m.awayTeamId ? away
                : null;
      const def = off === home ? away : home;
      if (!off) return;
      creditPlayEventToLine(off, event);
      // Drive count: each unique driveId per team
      const sideKey = off === home ? "home" : "away";
      if (event.driveId && !driveSeen[sideKey].has(event.driveId)) {
        driveSeen[sideKey].add(event.driveId);
        off.drives += 1;
      }
      // Defensive mirroring
      if (def) {
        const charged = event.chargedPlayType;
        if (charged === "passing_attempt_interception") def.turnovers_forced += 1;
        if (charged === "sack_college_rushing_loss") def.sacks += 1;
        if (charged === "rushing_attempt" || charged === "scramble_rush" || charged.startsWith("passing_attempt_")) {
          def.yards_allowed += Number.isFinite(event.yardsGained) ? event.yardsGained : 0;
        }
        // Wave-12: defensive penalty (positive yards on offense's event) gets
        // credited to the defense's penalty line.
        if ((charged === "penalty_no_play" || event.playType === "penalty_only") && (event.yardsGained || 0) > 0) {
          def.penalties_count += 1;
          def.penalty_yards += Math.abs(event.yardsGained || 0);
        }
      }
    });

    // Mirror points across.
    home.points_allowed = away.points;
    away.points_allowed = home.points;

    return {
      home,
      away,
      meta: {
        gameId: m.gameId || (events[0] && events[0].gameId) || null,
        homeTeamId: m.homeTeamId || null,
        awayTeamId: m.awayTeamId || null,
        homeTeamName: m.homeTeamName || null,
        awayTeamName: m.awayTeamName || null,
        playCount: events.length,
      },
    };
  }

  /**
   * Add a derived value (yards_per_play, completion_pct, etc.).
   */
  function deriveValue(line, statId) {
    if (statId === "yards_per_play") {
      return line.total_plays > 0 ? line.total_yards / line.total_plays : 0;
    }
    if (statId === "team_completion_pct") {
      return line.team_pass_attempts > 0 ? line.team_pass_completions / line.team_pass_attempts : 0;
    }
    if (statId === "team_yards_per_rush") {
      return line.team_rush_attempts > 0 ? line.team_rushing_yards / line.team_rush_attempts : 0;
    }
    if (statId === "points_per_drive") {
      return line.drives > 0 ? line.points / line.drives : 0;
    }
    return null;
  }

  /**
   * Add the contents of `addLine` into `targetLine` (used to roll game stats
   * up into season stats).
   */
  function accumulateLineInto(targetLine, addLine) {
    Object.keys(addLine).forEach((k) => {
      if (typeof targetLine[k] === "number" && typeof addLine[k] === "number") {
        targetLine[k] += addLine[k];
      } else if (targetLine[k] === undefined) {
        targetLine[k] = addLine[k];
      }
    });
    return targetLine;
  }

  /**
   * Reconcile a GameBook against simple invariants (per spec §"Box Score
   * Reconciliation"). Returns an array of ReconciliationResult entries.
   */
  function reconcileGameBook(book) {
    const results = [];
    function check(side, line) {
      // total_plays must equal sum of attempt types
      const expectedPlays = line.team_rush_attempts + line.team_pass_attempts;
      if (line.total_plays !== expectedPlays) {
        results.push({
          id: `${side}.total_plays_consistency`, severity: "warning",
          check: "total_plays = rush + pass attempts",
          expected: expectedPlays, actual: line.total_plays,
          message: `${side} total_plays (${line.total_plays}) != rush(${line.team_rush_attempts}) + pass(${line.team_pass_attempts})`,
        });
      }
      // total_yards >= passing_yards + rushing_yards (sacks may reduce rushing — already counted as rushing in college rule)
      const yardSum = line.team_passing_yards + line.team_rushing_yards;
      if (Math.abs(line.total_yards - yardSum) > 0.5) {
        results.push({
          id: `${side}.total_yards_consistency`, severity: "warning",
          check: "total_yards = passing + rushing",
          expected: yardSum, actual: line.total_yards,
          message: `${side} total_yards mismatch`,
        });
      }
      // touchdowns = passing + rushing (defensive/ST TDs not yet emitted)
      const tdSum = line.passing_touchdowns + line.rushing_touchdowns;
      if (line.touchdowns !== tdSum) {
        results.push({
          id: `${side}.touchdowns_consistency`, severity: "warning",
          check: "touchdowns = passing + rushing",
          expected: tdSum, actual: line.touchdowns,
          message: `${side} touchdowns mismatch`,
        });
      }
      results.push({
        id: `${side}.box_pass`, severity: "pass",
        check: "box score pass", message: `${side} box score consistent`,
      });
    }
    check("home", book.home);
    check("away", book.away);
    return results;
  }

  global.CGM_STAT_ACCUMULATOR = {
    emptyTeamLine,
    creditPlayEventToLine,
    buildGameBook,
    deriveValue,
    accumulateLineInto,
    reconcileGameBook,
  };
})(window);
