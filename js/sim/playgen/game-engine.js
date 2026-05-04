// PLAYGEN-5: Game Engine
// Spec: 28_PLAY_GENERATOR_AND_GAME_SIM_ENGINE_SPEC.md §"Core Flow"
//
// Top-level orchestrator. Replaces the legacy drive-by-drive scoring with a
// real per-play sim:
//   - createGameState
//   - while game not over: runDrive(opposing teams alternate possession)
//   - emit drive summary rows for the existing UI's Drive Summary panel
//   - return { events, drives, score, advanced } for sim-core.

(function initGameEngine(global) {
  const REG = global.CGM_MATCHUP_REGISTRY;
  const STATE = global.CGM_GAME_STATE;
  const DRIVE = global.CGM_DRIVE_ENGINE;
  if (!REG || !STATE || !DRIVE) {
    if (global.console) global.console.error("GameEngine missing deps");
    return;
  }

  /**
   * Run a full game.
   * @param {object} args
   *   - gameId
   *   - random: () => [0,1)
   *   - homeTeamId, awayTeamId
   *   - homeRoster, awayRoster
   *   - homeTendencies, awayTendencies
   *   - homeGamePlan, awayGamePlan
   *   - playerTeamId (for win/loss labeling — caller passes ourselves)
   *   - maxDrives (safety cap, default 28)
   * @returns {object} { events, drives, score, win, advanced }
   */
  function runFullGame(args) {
    const random = args.random || Math.random;
    const homeUnits = REG.computeTeamUnits(args.homeRoster || [], args.homeTeamId);
    const awayUnits = REG.computeTeamUnits(args.awayRoster || [], args.awayTeamId);
    const state = STATE.createGameState({
      gameId: args.gameId || "g-x",
      homeTeamId: args.homeTeamId,
      awayTeamId: args.awayTeamId,
      kickReturnerTeamId: args.awayTeamId, // simple convention: away receives the opening kick
      startingYardsToGoal: 75,
    });

    const allEvents = [];
    const driveSummaries = [];
    const maxDrives = args.maxDrives || 28;
    const weather = args.weather || "clear";
    // Per-team fatigue carried across drives; recovered between drives by extras.
    const teamFatigue = { [args.homeTeamId]: { offense: 0, defense: 0 }, [args.awayTeamId]: { offense: 0, defense: 0 } };
    const EXTRAS = global.CGM_EXTRAS;

    let driveIndex = 0;
    while (driveIndex < maxDrives) {
      if (state.gameComplete) break;
      const offIsHome = state.possessionTeamId === args.homeTeamId;
      const offTeamId = offIsHome ? args.homeTeamId : args.awayTeamId;
      const defTeamId = offIsHome ? args.awayTeamId : args.homeTeamId;
      const offRoster = offIsHome ? args.homeRoster : args.awayRoster;
      const defRoster = offIsHome ? args.awayRoster : args.homeRoster;
      const offUnits = offIsHome ? homeUnits : awayUnits;
      const defUnits = offIsHome ? awayUnits : homeUnits;
      const offTendencies = offIsHome ? args.homeTendencies : args.awayTendencies;
      const defTendencies = offIsHome ? args.awayTendencies : args.homeTendencies;
      const offGamePlan = offIsHome ? args.homeGamePlan : args.awayGamePlan;

      // Fatigue handed in is the OFFENSE side for this drive (since the
      // current possessor is offense). Defense fatigue mirrors the other team.
      const driveFatigue = {
        offense: teamFatigue[offTeamId].offense,
        defense: teamFatigue[defTeamId].defense,
      };

      const { events, summary } = DRIVE.runDrive({
        state,
        offRoster, defRoster,
        offUnits: offUnits.units, defUnits: defUnits.units,
        tendencies: offTendencies,
        opponentTendencies: defTendencies,
        gamePlan: offGamePlan,
        random,
        maxPlays: 20,
        weather,
        fatigue: driveFatigue,
        conditioningFloor: 65,
      });
      // Write fatigue back to per-team store + recover between drives.
      teamFatigue[offTeamId].offense = driveFatigue.offense;
      teamFatigue[defTeamId].defense = driveFatigue.defense;
      if (EXTRAS && EXTRAS.recoverBetweenDrives) {
        const rec = EXTRAS.recoverBetweenDrives({
          offenseFatigue: teamFatigue[offTeamId].offense,
          defenseFatigue: teamFatigue[defTeamId].defense,
          random,
        });
        teamFatigue[offTeamId].offense = rec.offenseFatigue;
        teamFatigue[defTeamId].defense = rec.defenseFatigue;
      }
      events.forEach((e) => allEvents.push(e));
      driveSummaries.push({ index: driveIndex + 1, ...summary, offTeamId: summary.possessionTeamId });
      driveIndex += 1;

      // End-of-game guard.
      const totalSeconds = state.clock.minutes * 60 + state.clock.seconds;
      if (totalSeconds <= 0 && state.period >= 4) {
        STATE.maybeAdvancePeriod(state);
        if (state.gameComplete) break;
      }
    }

    // Compute aggregate advanced metrics for the existing UI panels.
    const homePoints = state.score[args.homeTeamId] || 0;
    const awayPoints = state.score[args.awayTeamId] || 0;
    const ourTeamId = args.playerTeamId;
    const ourPoints = ourTeamId === args.homeTeamId ? homePoints : awayPoints;
    const oppPoints = ourTeamId === args.homeTeamId ? awayPoints : homePoints;
    const ourEvents = allEvents.filter((e) => e.possessionTeamId === ourTeamId);
    const oppEvents = allEvents.filter((e) => e.possessionTeamId !== ourTeamId);
    const ourYards = ourEvents.reduce((s, e) => s + (e.yardsGained || 0), 0);
    const oppYards = oppEvents.reduce((s, e) => s + (e.yardsGained || 0), 0);
    const ourPlays = ourEvents.length;
    const oppPlays = oppEvents.length;
    const ourExplosives = ourEvents.filter((e) => e.yardsGained >= 20).length;
    const oppExplosives = oppEvents.filter((e) => e.yardsGained >= 20).length;
    const ourSuccess = ourEvents.filter((e) => e.firstDown || (e.scoring && e.scoring.points > 0)).length;

    const drives = driveSummaries.map((d) => {
      const points = d.points || 0;
      const explosive = points === 7 && d.yards >= 25;
      const offTeamShort = d.offTeamId === args.homeTeamId ? args.homeShortName : args.awayShortName;
      const result = d.result === "TD" ? (explosive ? "TD (explosive)" : "TD")
                   : d.result === "FG" ? "FG"
                   : d.result === "INT" ? "Turnover"
                   : d.result === "Fumble" ? "Turnover"
                   : "Punt";
      const clock = `${Math.max(1, 5 - Math.ceil((d.index * 4) / Math.max(1, driveSummaries.length)))}Q ${String(Math.max(0, 14 - ((d.index * 14) % 15))).padStart(2, "0")}:00`;
      return [String(d.index), offTeamShort, result, String(points), clock];
    });

    const playByPlay = allEvents.slice(0, 80).map((e) => {
      const team = e.possessionTeamId === args.homeTeamId ? args.homeShortName : args.awayShortName;
      // Penalty events render distinctively: "FLAG: false start on offense,
      // -5 yds, replay 1st & 10". Wave-9 PLAYGEN polish.
      let desc;
      if (e.playType === "penalty_only") {
        const code = (e.reasonCodes || []).find((c) => c.startsWith("penalty_") && c !== "penalty_accepted");
        const name = code ? code.replace(/^penalty_/, "").replace(/_/g, " ") : "penalty";
        const sideLabel = (e.reasonCodes || []).includes("penalty_accepted") ? "accepted" : "";
        desc = `FLAG · ${name}${e.yardsGained ? ` · ${e.yardsGained > 0 ? "+" : ""}${e.yardsGained}` : ""}${sideLabel ? ` · ${sideLabel}` : ""}`;
      } else {
        desc = e.playType === "rush" ? `Rush for ${e.yardsGained}` :
               e.playType === "pass" ? (e.result && e.result.outcome === "complete" ? `Complete for ${e.yardsGained}` : e.result && e.result.outcome === "incomplete" ? "Incomplete" : "Interception") :
               e.playType === "sack" ? `Sack for ${e.yardsGained}` :
               e.playType === "field_goal" ? (e.scoring ? "FG good" : "FG missed") :
               e.playType === "punt" ? "Punt" :
               e.playType === "kneel_down" ? "Kneel" :
               e.playType === "spike" ? "Spike" : e.playType;
      }
      const why = (e.reasonCodes || []).filter((c) => !c.startsWith("penalty_")).slice(0, 1).join(", ");
      return `${e.clockBefore.minutes}:${String(e.clockBefore.seconds).padStart(2,"0")} ${team}: ${desc}${why ? ` — ${why}` : ""}.`;
    });

    const reasonRollup = {};
    allEvents.forEach((e) => (e.reasonCodes || []).forEach((c) => { reasonRollup[c] = (reasonRollup[c] || 0) + 1; }));

    const advanced = {
      ourYardsPerPlay: Number((ourYards / Math.max(1, ourPlays)).toFixed(1)),
      oppYardsPerPlay: Number((oppYards / Math.max(1, oppPlays)).toFixed(1)),
      ourSuccessRate: Math.round((ourSuccess / Math.max(1, ourPlays)) * 100),
      oppSuccessRate: 0,
      explosivePlays: `${ourExplosives}-${oppExplosives}`,
    };

    return {
      events: allEvents,
      drives,
      driveSummaries,
      playByPlay,
      reasonRollup,
      ourScore: ourPoints,
      oppScore: oppPoints,
      win: ourPoints > oppPoints,
      advanced,
      finalState: state,
      matchupSnapshot: { ours: ourTeamId === args.homeTeamId ? homeUnits.units : awayUnits.units, theirs: ourTeamId === args.homeTeamId ? awayUnits.units : homeUnits.units },
    };
  }

  global.CGM_GAME_ENGINE = { runFullGame };
})(window);
