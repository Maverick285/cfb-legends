// PLAYGEN-3: Per-Play Outcome Resolver
// Spec: 28_PLAY_GENERATOR_AND_GAME_SIM_ENGINE_SPEC.md §"Outcome Resolver"
//
// Takes the offensive call + defensive response + both teams' rosters and
// resolves a single play into:
//   - yards gained (sampled from a distribution bucket per spec §"Yards Model")
//   - completion / incompletion / sack / interception / turnover
//   - clock seconds consumed (per spec §"Clock Consumption Defaults")
//   - reason codes (from MATCHUP composite)
//   - a structured PlayEvent (STAT-2 shape)
//   - participant ids (QB, ball carrier, target, sack defender) for STAT-4..7

(function initPlayResolver(global) {
  const REG = global.CGM_MATCHUP_REGISTRY;
  const M = global.CGM_MATCHUP;
  const PE = global.CGM_PLAY_EVENT;
  if (!REG || !M || !PE) {
    if (global.console) global.console.error("PlayResolver missing deps (matchup registry / matchup / play-event)");
    return;
  }

  // Yards distribution buckets per spec §"Yards Gained Model".
  // Each bucket: [minYards, maxYards].
  const RUN_BUCKETS = {
    loss:        [-4, -1],
    stuffed:     [0, 1],
    short_gain:  [2, 3],
    successful:  [4, 6],
    chunk:       [7, 12],
    explosive:   [13, 24],
    breakaway:   [25, 80],
  };
  const PASS_BUCKETS = {
    sack:        [-9, -3],
    incomplete:  [0, 0],
    short_comp:  [3, 7],
    successful:  [8, 14],
    chunk:       [15, 24],
    explosive:   [25, 45],
    breakaway:   [46, 90],
    interception:[0, 0],
  };

  // Clock consumption defaults per spec §"Clock Consumption Defaults".
  const CLOCK_RANGES = {
    rush:                 [28, 42],
    completePassInBounds: [18, 38],
    completePassOOB:      [6, 18],
    incompletePass:       [4, 8],
    sack:                 [20, 40],
    punt:                 [8, 14],
    fieldGoal:            [4, 8],
    spike:                [3, 5],
    kneel:                [40, 42],
  };
  // Tempo modifier: No-Huddle / Fast / Extreme cuts a few seconds; Huddle adds.
  const TEMPO_OFFSET = { Extreme: -10, Fast: -6, "No-Huddle": -5, Balanced: 0, Huddle: 4 };

  function rngRange(random, min, max) { return min + random() * (max - min); }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function pickWeighted(random, weights) {
    const total = weights.reduce((s, w) => s + w[1], 0);
    if (total <= 0) return weights[0][0];
    const roll = random() * total;
    let acc = 0;
    for (const [k, w] of weights) {
      acc += w;
      if (roll <= acc) return k;
    }
    return weights[weights.length - 1][0];
  }

  /**
   * Convert a matchup advantage (-100..+100) into bucket probabilities.
   * Returns array of [bucketName, weight].
   */
  function runBucketWeights(advantage) {
    const a = clamp(advantage, -50, 50);
    return [
      ["loss",        Math.max(2, 9 - a * 0.18)],
      ["stuffed",     Math.max(3, 16 - a * 0.20)],
      ["short_gain",  Math.max(8, 22 - a * 0.10)],
      ["successful",  Math.max(15, 25 + a * 0.20)],
      ["chunk",       Math.max(6, 14 + a * 0.18)],
      ["explosive",   Math.max(2, 8 + a * 0.12)],
      ["breakaway",   Math.max(0.5, 2 + a * 0.05)],
    ];
  }
  function passBucketWeights(advantage, depth) {
    // Calibration tuning DL-20260503-03: real CFB Y/A ~7.0-7.8.
    // Wave-5 calibration (post-DL-20260503-07): the harness all-rush bug
    // hid the real distribution. With passes restored, success rate sat at
    // 33% (under the 35-55 band). Pull a touch off `incomplete` and add to
    // `successful` so completion rates and first-down conversion track real
    // CFB (~62% completion, ~45% success rate by EPA convention).
    const a = clamp(advantage, -50, 50);
    const isDeep = depth === "deep";
    const isShort = depth === "short";
    return [
      ["sack",         Math.max(1, 5 - a * 0.10)],
      ["incomplete",   Math.max(12, 26 - a * 0.20) + (isDeep ? 14 : 0)],
      ["short_comp",   isShort ? Math.max(24, 40 + a * 0.12) : Math.max(12, 22 + a * 0.10)],
      ["successful",   Math.max(18, 30 + a * 0.16)],
      ["chunk",        isDeep ? Math.max(4, 11 + a * 0.16) : Math.max(3, 8 + a * 0.12)],
      ["explosive",    isDeep ? Math.max(1.5, 5 + a * 0.14) : Math.max(1, 3 + a * 0.10)],
      ["breakaway",    Math.max(0.15, 0.6 + a * 0.04)],
      ["interception", Math.max(0.6, 2.2 - a * 0.04)],
    ];
  }

  // ── Participant pickers ──────────────────────────────────────────────────
  function topQB(roster) {
    const qbs = roster.filter((p) => p.position === "QB").sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
    return qbs[0] || null;
  }
  function pickRusher(roster, random) {
    const hbs = roster.filter((p) => p.position === "HB").sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
    if (!hbs.length) return null;
    // Top HB takes ~62%, HB2 ~28%, HB3+ ~10%.
    const r = random();
    if (r < 0.62 && hbs[0]) return hbs[0];
    if (r < 0.90 && hbs[1]) return hbs[1];
    return hbs[Math.min(hbs.length - 1, 2)];
  }
  function pickReceiver(roster, random, prefRole) {
    if (prefRole === "RB") {
      const hbs = roster.filter((p) => p.position === "HB").sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
      if (hbs.length) return hbs[Math.floor(random() * Math.min(2, hbs.length))];
    }
    const wrs = roster.filter((p) => p.position === "WR").sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
    const tes = roster.filter((p) => p.position === "TE").sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
    const r = random();
    // WR1 ~30%, WR2 ~22%, WR3 ~15%, TE1 ~14%, RB checkdown ~10%, others ~9%
    if (r < 0.30 && wrs[0]) return wrs[0];
    if (r < 0.52 && wrs[1]) return wrs[1];
    if (r < 0.67 && wrs[2]) return wrs[2];
    if (r < 0.81 && tes[0]) return tes[0];
    if (r < 0.91) {
      const hbs = roster.filter((p) => p.position === "HB").sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
      if (hbs[0]) return hbs[0];
    }
    return wrs[Math.min(wrs.length - 1, 3)] || tes[0] || null;
  }
  function pickPassRusher(roster, random) {
    const rushers = roster.filter((p) => p.position === "EDGE" || p.position === "DE" || p.position === "DT")
                          .sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
    if (!rushers.length) return null;
    // Top rusher ~50%, second ~30%, others ~20%.
    const r = random();
    if (r < 0.50 && rushers[0]) return rushers[0];
    if (r < 0.80 && rushers[1]) return rushers[1];
    return rushers[Math.min(rushers.length - 1, 3)];
  }
  function pickKicker(roster) {
    const ks = roster.filter((p) => p.position === "K").sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
    return ks[0] || null;
  }
  function pickPunter(roster) {
    const ps = roster.filter((p) => p.position === "P").sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
    return ps[0] || null;
  }

  // ── Resolvers ────────────────────────────────────────────────────────────
  function resolveRunPlay(args) {
    const { state, offRoster, defRoster, offUnits, defUnits, call, defResp, random } = args;
    const ctx = { random, schemeBias: defResp.front === "loaded_box" ? -8 : (defResp.front === "light_box" ? 6 : 0), moraleDelta: 0, fatigueOffense: 0, fatigueDefense: 0 };
    const matchup = M.resolveRunMatchup({ units: offUnits }, { units: defUnits }, ctx);
    const bucket = pickWeighted(random, runBucketWeights(matchup.advantage));
    const [lo, hi] = RUN_BUCKETS[bucket];
    const yards = Math.round(rngRange(random, lo, hi));
    const fumbleChance = clamp(0.012 - matchup.advantage * 0.0003, 0.003, 0.04);
    const fumbleLost = random() < fumbleChance;
    const rusher = pickRusher(offRoster, random);
    const isTd = state.yardsToGoal - yards <= 0 && yards > 0;
    const clockSeconds = Math.round(rngRange(random, CLOCK_RANGES.rush[0], CLOCK_RANGES.rush[1]) + (TEMPO_OFFSET[call.tempoMode] || 0));
    return {
      kind: "rush",
      yards,
      bucket,
      isTouchdown: isTd,
      isTurnover: fumbleLost,
      reasonCodes: [...matchup.reasonCodes, `run_bucket_${bucket}`, ...defResp.reasonCodes],
      clockSeconds: Math.max(3, clockSeconds),
      participants: { rusher: rusher ? rusher.id : null, rusherName: rusher ? rusher.name : null },
      fumble: fumbleLost,
    };
  }

  function resolvePassPlay(args) {
    const { state, offRoster, defRoster, offUnits, defUnits, call, defResp, random } = args;
    const ctx = { random, schemeBias: defResp.coverage === "match" ? -4 : (defResp.coverage === "prevent" ? -10 : 0), fatigueOffense: 0, fatigueDefense: 0 };
    const matchup = M.resolvePassMatchup({ units: offUnits }, { units: defUnits }, ctx);
    const depth = call.playFamily === "deep_pass" ? "deep"
                : call.playFamily === "intermediate_pass" || call.playFamily === "play_action" ? "intermediate"
                : "short";
    const bucket = pickWeighted(random, passBucketWeights(matchup.advantage, depth));
    const qb = topQB(offRoster);
    const rusher = pickPassRusher(defRoster, random);
    const target = pickReceiver(offRoster, random, call.targetRole);
    const isComplete = bucket !== "incomplete" && bucket !== "interception" && bucket !== "sack";
    const isInt = bucket === "interception";
    const isSack = bucket === "sack";
    const [lo, hi] = PASS_BUCKETS[bucket];
    let yards = bucket === "incomplete" || bucket === "interception" ? 0 : Math.round(rngRange(random, lo, hi));
    if (isSack) yards = Math.round(rngRange(random, lo, hi));
    const isTd = isComplete && state.yardsToGoal - yards <= 0 && yards > 0;
    let clockSeconds;
    if (isSack) clockSeconds = Math.round(rngRange(random, CLOCK_RANGES.sack[0], CLOCK_RANGES.sack[1]));
    else if (!isComplete) clockSeconds = Math.round(rngRange(random, CLOCK_RANGES.incompletePass[0], CLOCK_RANGES.incompletePass[1]));
    else clockSeconds = Math.round(rngRange(random, CLOCK_RANGES.completePassInBounds[0], CLOCK_RANGES.completePassInBounds[1]));
    clockSeconds = Math.max(3, clockSeconds + (TEMPO_OFFSET[call.tempoMode] || 0));

    return {
      kind: isSack ? "sack" : "pass",
      yards,
      bucket,
      isComplete,
      isInterception: isInt,
      isSack,
      isTouchdown: isTd,
      isTurnover: isInt,
      reasonCodes: [...matchup.reasonCodes, `pass_bucket_${bucket}`, ...defResp.reasonCodes],
      clockSeconds,
      participants: {
        qb: qb ? qb.id : null, qbName: qb ? qb.name : null,
        target: target ? target.id : null, targetName: target ? target.name : null,
        sackedBy: isSack && rusher ? rusher.id : null,
        sackedByName: isSack && rusher ? rusher.name : null,
        intBy: isInt && rusher ? rusher.id : null,
      },
    };
  }

  function resolveSpecialTeams(args) {
    const { state, offRoster, defRoster, call, random } = args;
    if (call.playFamily === "field_goal") {
      const kicker = pickKicker(offRoster);
      const distance = state.yardsToGoal + 17;
      const kickerSkill = kicker && kicker.attrs ? kicker.attrs.kicking : 12;
      const baseChance = clamp(0.95 - (distance - 30) * 0.020 + (kickerSkill - 12) * 0.018, 0.20, 0.99);
      const made = random() < baseChance;
      return {
        kind: "field_goal",
        yards: 0,
        bucket: made ? "fg_made" : "fg_missed",
        isComplete: made,
        isTouchdown: false,
        isTurnover: !made,
        scoring: made ? { team: state.possessionTeamId, points: 3, type: "field_goal" } : null,
        reasonCodes: [made ? "field_goal_made" : "field_goal_missed"],
        clockSeconds: Math.round(rngRange(random, CLOCK_RANGES.fieldGoal[0], CLOCK_RANGES.fieldGoal[1])),
        participants: { kicker: kicker ? kicker.id : null, kickerName: kicker ? kicker.name : null, distance },
      };
    }
    if (call.playFamily === "punt") {
      const punter = pickPunter(offRoster);
      const punterSkill = punter && punter.attrs ? punter.attrs.punting : 12;
      const distance = clamp(Math.round(40 + (punterSkill - 10) * 1.4 + rngRange(random, -8, 10)), 28, 65);
      const newYardsToGoal = clamp(100 - (state.yardsToGoal - distance), 5, 99);
      return {
        kind: "punt",
        yards: 0,
        bucket: "punt",
        isComplete: true,
        isTouchdown: false,
        isTurnover: true, // possession swap
        turnoverDestination: newYardsToGoal,
        reasonCodes: distance >= 50 ? ["booming_punt"] : [],
        clockSeconds: Math.round(rngRange(random, CLOCK_RANGES.punt[0], CLOCK_RANGES.punt[1])),
        participants: { punter: punter ? punter.id : null, punterName: punter ? punter.name : null, distance },
      };
    }
    if (call.playFamily === "kneel") {
      return {
        kind: "kneel",
        yards: -1,
        bucket: "kneel",
        isComplete: false,
        isTouchdown: false,
        isTurnover: false,
        reasonCodes: ["victory_formation"],
        clockSeconds: Math.round(rngRange(random, CLOCK_RANGES.kneel[0], CLOCK_RANGES.kneel[1])),
        participants: {},
      };
    }
    if (call.playFamily === "spike") {
      return {
        kind: "spike",
        yards: 0,
        bucket: "spike",
        isComplete: false,
        isTouchdown: false,
        isTurnover: false,
        reasonCodes: ["clock_kill"],
        clockSeconds: Math.round(rngRange(random, CLOCK_RANGES.spike[0], CLOCK_RANGES.spike[1])),
        participants: {},
      };
    }
    return { kind: "noop", yards: 0, bucket: "noop", isComplete: false, isTouchdown: false, isTurnover: false, reasonCodes: [], clockSeconds: 0, participants: {} };
  }

  /**
   * Top-level resolver: dispatch to run/pass/ST then synthesize a structured
   * outcome the game state machine + PlayEvent factory can consume.
   */
  function resolvePlay(args) {
    const family = args.call.playFamily;
    if (family === "field_goal" || family === "punt" || family === "kneel" || family === "spike") {
      return resolveSpecialTeams(args);
    }
    if (family === "inside_run" || family === "outside_run" || family === "qb_run") {
      return resolveRunPlay(args);
    }
    return resolvePassPlay(args);
  }

  /**
   * Build a PlayEvent from a (state, call, defResp, outcome, transition) tuple.
   * Caller is responsible for calling state machine BEFORE building the event
   * if they want before/after fields populated correctly.
   */
  function buildPlayEvent(args) {
    const { state, beforeState, call, defResp, outcome, transition } = args;
    let chargedPlayType;
    let outcomeKey;
    if (outcome.kind === "rush" || outcome.kind === "qb_run") {
      chargedPlayType = "rushing_attempt";
      outcomeKey = outcome.isTurnover ? "turnover" : (outcome.isTouchdown ? "score" : (outcome.yards <= 0 ? "no_gain" : "gain"));
    } else if (outcome.kind === "pass") {
      if (outcome.isInterception) { chargedPlayType = "passing_attempt_interception"; outcomeKey = "turnover"; }
      else if (outcome.isComplete) { chargedPlayType = "passing_attempt_complete"; outcomeKey = outcome.isTouchdown ? "score" : "complete"; }
      else { chargedPlayType = "passing_attempt_incomplete"; outcomeKey = "incomplete"; }
    } else if (outcome.kind === "sack") {
      chargedPlayType = "sack_college_rushing_loss";
      outcomeKey = "loss";
    } else if (outcome.kind === "field_goal") {
      chargedPlayType = "field_goal_attempt";
      outcomeKey = outcome.isComplete ? "score" : "no_gain";
    } else if (outcome.kind === "punt") {
      chargedPlayType = "punt";
      outcomeKey = "change_of_possession";
    } else if (outcome.kind === "kneel") {
      chargedPlayType = "kneel_down_rush";
      outcomeKey = "no_gain";
    } else if (outcome.kind === "spike") {
      chargedPlayType = "spike_pass_attempt";
      outcomeKey = "incomplete";
    } else if (outcome.kind === "penalty_offense" || outcome.kind === "penalty_defense") {
      chargedPlayType = "penalty_no_play";
      outcomeKey = "penalty";
    } else {
      chargedPlayType = "no_stat";
      outcomeKey = "no_gain";
    }

    const playType = (outcome.kind === "rush" || outcome.kind === "qb_run") ? "rush"
                   : outcome.kind === "pass" ? "pass"
                   : outcome.kind === "sack" ? "sack"
                   : outcome.kind === "field_goal" ? "field_goal"
                   : outcome.kind === "punt" ? "punt"
                   : outcome.kind === "kneel" ? "kneel_down"
                   : outcome.kind === "spike" ? "spike"
                   : (outcome.kind === "penalty_offense" || outcome.kind === "penalty_defense") ? "penalty_only"
                   : "rush";

    return PE.createPlayEvent({
      id: `${state.gameId}-p${beforeState.playNumber + 1}`,
      gameId: state.gameId,
      driveId: beforeState.driveId,
      playNumber: beforeState.playNumber + 1,
      drivePlayNumber: beforeState.drivePlayNumber + 1,
      period: beforeState.period,
      clockBefore: { minutes: beforeState.clock.minutes, seconds: beforeState.clock.seconds },
      clockAfter: { minutes: state.clock.minutes, seconds: state.clock.seconds },
      possessionTeamId: beforeState.possessionTeamId,
      defenseTeamId: beforeState.defenseTeamId,
      homeTeamId: state.homeTeamId,
      awayTeamId: state.awayTeamId,
      downBefore: beforeState.down,
      distanceBefore: beforeState.distance,
      yardsToGoalBefore: beforeState.yardsToGoal,
      playCall: call,
      playType,
      chargedPlayType,
      outcome: outcomeKey,
      yardsGained: outcome.yards || 0,
      firstDown: !!transition.firstDown,
      firstDownType: transition.firstDown ? (outcome.kind === "rush" ? "rushing" : "passing") : null,
      scoring: outcome.scoring || (outcome.isTouchdown ? { team: beforeState.possessionTeamId, points: 6, type: outcome.kind === "rush" ? "rush_td" : "pass_td" } : null),
      turnover: outcome.isTurnover ? { type: outcome.isInterception ? "interception" : (outcome.kind === "punt" ? "punt" : "fumble"), recoveringTeamId: state.possessionTeamId } : null,
      players: outcome.participants || null,
      possessionChange: !!transition.turnover || !!transition.scored,
      downAfter: state.down,
      distanceAfter: state.distance,
      yardsToGoalAfter: state.yardsToGoal,
      reasonCodes: outcome.reasonCodes || [],
    });
  }

  global.CGM_PLAY_RESOLVER = {
    RUN_BUCKETS,
    PASS_BUCKETS,
    runBucketWeights,
    passBucketWeights,
    resolvePlay,
    buildPlayEvent,
  };
})(window);
