// PLAYGEN-4: Drive Engine
// Spec: 28_PLAY_GENERATOR_AND_GAME_SIM_ENGINE_SPEC.md §"Core Flow"
//
// Runs a single drive end-to-end: select play → resolve → emit PlayEvent →
// transition state → repeat until score / turnover / punt / end of period.
// Returns the array of PlayEvents emitted plus a drive summary.

(function initDriveEngine(global) {
  const STATE = global.CGM_GAME_STATE;
  const SEL = global.CGM_PLAY_SELECTOR;
  const RES = global.CGM_PLAY_RESOLVER;
  if (!STATE || !SEL || !RES) {
    if (global.console) global.console.error("DriveEngine missing deps");
    return;
  }
  // EXTRAS is optional — drive runs cleanly with or without it loaded.
  function getExtras() { return global.CGM_EXTRAS || null; }

  // Penalty accept/decline heuristic. Real coaches decline if the play result
  // is more favorable. We use a simple rule: accept if the penalty yardage is
  // strictly better for the offense than the play (offensive penalty: always
  // accepted = enforced; defensive: accepted unless the play already gained
  // more than the penalty).
  function decidePenaltyAccept(penalty, outcome) {
    if (!penalty) return false;
    if (penalty.side === "offense") return true; // can't decline against yourself
    // Defensive penalty: accept if penalty.yards > play yards OR play was a loss
    const playYds = (outcome && outcome.yards) || 0;
    if (penalty.autoFirstDown) return true;
    return penalty.yards >= playYds;
  }

  /**
   * Run a single drive against the current GameState. Mutates state.
   * @param {object} args
   *   - state: GameState (mutated)
   *   - offRoster, defRoster
   *   - offUnits, defUnits (precomputed unit ratings)
   *   - tendencies
   *   - gamePlan
   *   - random
   *   - maxPlays (safety cap)
   * @returns {object} { events, summary }
   *   summary: { result, points, plays, yards, startYTG, endYTG, possessionTeamId }
   */
  function runDrive(args) {
    const state = args.state;
    const random = args.random || Math.random;
    // Wave-12: bumped 16 → 20 so penalty replays don't truncate drives.
    // Real CFB drives can run 14+ plays; with no-down-on-penalties they may need extra slots.
    const maxPlays = args.maxPlays || 20;
    const events = [];
    const driveStartTeam = state.possessionTeamId;
    const driveStartYTG = state.yardsToGoal;
    let pointsScored = 0;
    let result = "punt";
    let safetyExit = false;
    const EXTRAS = getExtras();
    const weather = args.weather || (state.gameContext && state.gameContext.weather) || "clear";
    // Per-team fatigue carried in via args.fatigue (mutated in place by game-engine).
    const fatigueState = args.fatigue || { offense: 0, defense: 0 };
    const tempo = (args.tendencies && args.tendencies.pace && args.tendencies.pace >= 80) ? "no_huddle"
                : (args.tendencies && args.tendencies.pace && args.tendencies.pace >= 70) ? "fast"
                : (args.tendencies && args.tendencies.pace && args.tendencies.pace <= 50) ? "huddle"
                : "balanced";
    const conditioningFloor = (args.conditioningFloor != null) ? args.conditioningFloor : 65;

    for (let i = 0; i < maxPlays; i += 1) {
      // Exit if game over.
      if (state.gameComplete) { safetyExit = true; break; }
      // Exit if possession changed under us (defensive TD or special teams swap).
      if (state.possessionTeamId !== driveStartTeam) {
        // The previous play already changed possession.
        return { events, summary: summarize(state, events, result, pointsScored, driveStartTeam, driveStartYTG) };
      }

      const situation = STATE.classifySituation(state);
      const call = SEL.selectOffensivePlay({ state, situation, tendencies: args.tendencies, gamePlan: args.gamePlan, random });
      const defResp = SEL.selectDefensiveResponse({ situation, tendencies: args.opponentTendencies || args.tendencies, random });

      const beforeState = {
        playNumber: state.playNumber,
        drivePlayNumber: state.drivePlayNumber,
        period: state.period,
        clock: { minutes: state.clock.minutes, seconds: state.clock.seconds },
        possessionTeamId: state.possessionTeamId,
        defenseTeamId: state.defenseTeamId,
        down: state.down,
        distance: state.distance,
        yardsToGoal: state.yardsToGoal,
        driveId: state.driveId,
      };

      const outcome = RES.resolvePlay({
        state, offRoster: args.offRoster, defRoster: args.defRoster,
        offUnits: args.offUnits, defUnits: args.defUnits,
        call, defResp, random,
      });

      // PLAYGEN-extras integration: apply weather + fatigue to outcome yards
      // BEFORE scoring detection. Penalties roll separately and append a
      // reason code (no down-replay yet — that's a deeper refactor).
      if (EXTRAS) {
        // Weather: shrinks deep+intermediate pass yards in adverse conditions.
        if (outcome.kind === "pass" && Number.isFinite(outcome.yards) && outcome.yards > 0) {
          const depth = (call.playFamily === "deep_pass") ? "deep"
                      : (call.playFamily === "intermediate_pass" || call.playFamily === "play_action") ? "intermediate"
                      : "short";
          const adj = EXTRAS.applyWeatherToPassYards(outcome.yards, depth, weather);
          if (adj !== outcome.yards) {
            const wrCode = EXTRAS.weatherReasonCode(weather);
            if (wrCode && outcome.reasonCodes && !outcome.reasonCodes.includes(wrCode)) outcome.reasonCodes.push(wrCode);
            outcome.yards = adj;
          }
        }
        // Fatigue: when defense is gassed, offense YPP gets a small lift.
        if ((outcome.kind === "rush" || outcome.kind === "pass") && Number.isFinite(outcome.yards)) {
          const mult = EXTRAS.fatigueYardsMultiplier({
            offenseFatigue: fatigueState.offense, defenseFatigue: fatigueState.defense,
          });
          if (Math.abs(mult - 1) > 0.01) {
            outcome.yards = Math.round(outcome.yards * mult);
            if (outcome.reasonCodes && fatigueState.defense >= 70) outcome.reasonCodes.push("defense_gassed_lift");
          }
        }
        // Per-play fatigue accumulation (offense and defense each tick).
        const offTick = EXTRAS.updateFatigue({
          currentFatigue: fatigueState.offense, tempo, conditioningFloor, isOffense: true,
        });
        const defTick = EXTRAS.updateFatigue({
          currentFatigue: fatigueState.defense, tempo, conditioningFloor, isOffense: false,
        });
        fatigueState.offense = offTick.fatigue;
        fatigueState.defense = defTick.fatigue;
        if (outcome.reasonCodes) {
          offTick.reasonCodes.forEach((c) => outcome.reasonCodes.push(c));
          defTick.reasonCodes.forEach((c) => outcome.reasonCodes.push(c));
        }
        // Penalty roll. If a penalty hits, decide accept/decline + replay the
        // down (offensive penalties replay; defensive penalties auto-firstdown
        // when flagged, otherwise add yards + replay).
        if (outcome.kind === "rush" || outcome.kind === "pass") {
          const penalty = EXTRAS.rollPenalty({
            random, situation, playKind: outcome.kind,
            disciplineFloor: 50,
          });
          if (penalty) {
            const accept = decidePenaltyAccept(penalty, outcome);
            if (accept) {
              // Replay the down. Replace the outcome with a synthetic
              // penalty-only event: yards = penalty.yards, no scoring,
              // not a turnover, repeat the down.
              outcome.kind = penalty.side === "offense" ? "penalty_offense" : "penalty_defense";
              outcome.yards = penalty.yards;
              outcome.isTouchdown = false;
              outcome.isTurnover = false;
              outcome.scoring = null;
              outcome.bucket = "penalty";
              if (outcome.reasonCodes) penalty.reasonCodes.forEach((c) => outcome.reasonCodes.push(c));
              if (outcome.reasonCodes) outcome.reasonCodes.push("penalty_accepted");
              outcome._penaltyMeta = penalty;
            } else {
              // Decline — original outcome stands but tag the reason code.
              if (outcome.reasonCodes) outcome.reasonCodes.push(`penalty_declined_${penalty.name}`);
            }
          }
        }
      }

      // Synthetic scoring: if outcome.isTouchdown, set scoring + auto extra point.
      if (outcome.isTouchdown) {
        outcome.scoring = { team: state.possessionTeamId, points: 7, type: outcome.kind + "_td" };
        result = "TD";
        pointsScored = 7;
      } else if (outcome.kind === "field_goal" && outcome.isComplete) {
        result = "FG";
        pointsScored = 3;
      } else if (outcome.kind === "punt") {
        result = "Punt";
      } else if (outcome.isInterception) {
        result = "INT";
      } else if (outcome.isTurnover && outcome.kind === "rush") {
        result = "Fumble";
      }

      const transition = STATE.applyPlayOutcome(state, outcome);
      const event = RES.buildPlayEvent({ state, beforeState, call, defResp, outcome, transition });
      events.push(event);

      // After scoring or turnover the drive ends.
      if (outcome.isTouchdown || outcome.scoring || outcome.isTurnover || outcome.kind === "punt" || outcome.kind === "kneel" || outcome.kind === "spike") {
        // Special: kneel/spike don't end the drive on their own — they tick clock.
        if (outcome.kind === "kneel" || outcome.kind === "spike") continue;
        return { events, summary: summarize(state, events, result, pointsScored, driveStartTeam, driveStartYTG) };
      }

      // End of period mid-drive: tick the clock period and continue.
      const total = state.clock.minutes * 60 + state.clock.seconds;
      if (total <= 0) {
        STATE.maybeAdvancePeriod(state);
      }
    }
    return { events, summary: summarize(state, events, result, pointsScored, driveStartTeam, driveStartYTG) };
  }

  function summarize(state, events, result, points, startTeam, startYTG) {
    const yards = events.reduce((s, e) => s + (e.yardsGained || 0), 0);
    return {
      result,
      points,
      plays: events.length,
      yards,
      startYTG,
      endYTG: state.yardsToGoal,
      possessionTeamId: startTeam,
      driveId: events.length ? events[0].driveId : state.driveId,
    };
  }

  global.CGM_DRIVE_ENGINE = { runDrive };
})(window);
