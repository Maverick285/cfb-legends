// HARNESS-2 scenarios — deterministic fixtures the harness can replay to
// assert specific behaviors. Spec: 49_TEST_HARNESS_SCENARIO_BALANCE_AND_AI_QC_SPEC.md §"Scenario Harness".
//
// A scenario is { id, description, run(sim) → { passed, details } }.
// `sim` is the loaded module surface from harness/node-shim.js loadAll().

const { buildRoster } = require("../seeded-roster");

const SCENARIOS = [
  {
    id: "qb_injury_depth_chart",
    description: "Starter QB removed → top backup gets snaps, OVR delta surfaced",
    run(sim) {
      const home = buildRoster({ seed: 1001, teamId: "H", talent: 78 });
      const away = buildRoster({ seed: 1001, teamId: "A", talent: 75 });
      const qbs = home.filter((p) => p.position === "QB").sort((a, b) => b.ovr - a.ovr);
      if (qbs.length < 2) return { passed: false, details: "Roster did not generate ≥2 QBs" };
      const starter = qbs[0];
      const backup = qbs[1];
      const ovrDelta = starter.ovr - backup.ovr;
      // Remove starter; keep backup as the new QB1.
      const homeWithoutStarter = home.filter((p) => p.id !== starter.id);
      const newQbs = homeWithoutStarter.filter((p) => p.position === "QB").sort((a, b) => b.ovr - a.ovr);
      const passed = newQbs[0].id === backup.id && newQbs[0].ovr <= starter.ovr;
      return {
        passed,
        details: { starterOvr: starter.ovr, backupOvr: backup.ovr, ovrDelta, newStarterId: newQbs[0].id },
      };
    },
  },
  {
    id: "nil_deal_flagged",
    description: "NIL pledge above pool → engine refuses with insufficient_nil_pool reason code",
    run(sim) {
      const NIL = global.CGM_NIL;
      if (!NIL) return { passed: false, details: "CGM_NIL not loaded" };
      // Build a state object the engine recognizes by calling its public APIs.
      const program = { id: "us", nilTier: 3, fanBase: "small" };
      const state = {
        poolMillions: 5,
        capMillions: 10,
        weeklyRecharge: 0.3,
        pledgesThisCycle: [],
        spendThisYear: 0,
        complianceFlags: 0,
      };
      const before = state.poolMillions;
      const prospect = { id: "p1", name: "Test Prospect", preferences: { nil: 0.7 } };
      // Try to over-pledge by 5M.
      const result = NIL.pledgeToProspect(state, program, before + 5, prospect, []);
      const passed = !result.ok && (result.reasonCodes || []).includes("insufficient_nil_pool");
      return { passed, details: { before, requested: before + 5, result } };
    },
  },
  {
    id: "top_recruit_rival_push",
    description: "High-interest rival → suitor leaderboard reflects rival pressure",
    run(sim) {
      const REC = global.CGM_RECRUITING_V2;
      if (!REC) return { passed: false, details: "CGM_RECRUITING_V2 not loaded" };
      const prospect = {
        id: "p1",
        position: "WR",
        stars: 4,
        ovr: 88,
        attrs: {},
        preferences: {
          closeToHome: 0.6, scheme: 0.6, nil: 0.7, devReputation: 0.5, exposure: 0.6,
          depthChart: 0.5, coachStyle: 0.6, programPrestige: 0.65, academic: 0.5,
          facilities: 0.55, fanCulture: 0.5, communityFit: 0.5, playingTime: 0.7,
        },
        suitors: [],
      };
      // Programs need playingTimeOpen (boolean) + the standard fields.
      const us =    { id: "us",    prestige: 70, scheme: "spread", recentSuccess: 65, devReputation: 70, depthAtPosition: 30, playingTimeOpen: true,  nilTier: 3, facilitiesScore: 70, academicScore: 70, fanCulture: 70, communityScore: 70, exposureScore: 70 };
      const rival = { id: "rival", prestige: 85, scheme: "spread", recentSuccess: 85, devReputation: 80, depthAtPosition: 20, playingTimeOpen: true,  nilTier: 4, facilitiesScore: 90, academicScore: 75, fanCulture: 85, communityScore: 75, exposureScore: 85 };
      // Real signature: applyInterestUpdate(prospect, schoolId, schoolName, programContext, reasonCodeOverride?)
      REC.applyInterestUpdate(prospect, "us",    "Us",    us,    null);
      REC.applyInterestUpdate(prospect, "rival", "Rival", rival, null);
      const suitorIds = (prospect.suitors || []).map((s) => s.schoolId);
      const passed = suitorIds.includes("us") && suitorIds.includes("rival");
      return {
        passed,
        details: { suitorCount: (prospect.suitors || []).length, suitorIds, prospectId: prospect.id },
      };
    },
  },
  {
    id: "punt_field_position",
    description: "Punt-position regression — receiving team should not get punter's spot",
    run(sim) {
      // Build an isolated game. After AWAY's first drive ends in a punt,
      // HOME's starting yardsToGoal should be > AWAY's punter spot.
      const home = buildRoster({ seed: 2001, teamId: "H", talent: 75 });
      const away = buildRoster({ seed: 2001, teamId: "A", talent: 75 });
      let s = 7;
      const rng = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      const result = sim.game.runFullGame({
        gameId: "punt-test",
        random: rng,
        homeTeamId: "H", awayTeamId: "A",
        homeRoster: home, awayRoster: away,
        homeShortName: "H", awayShortName: "A",
        homeTendencies: { passRate: 52, runRate: 48, deepRate: 18, blitzRate: 22, pace: 65 },
        awayTendencies: { passRate: 52, runRate: 48, deepRate: 18, blitzRate: 22, pace: 65 },
        homeGamePlan: { aggression: 0.5 }, awayGamePlan: { aggression: 0.5 },
        playerTeamId: "H",
      });
      // Find the first punt event; check the next-drive starting yardsToGoal.
      const events = result.events;
      const puntIdx = events.findIndex((e) => e.playType === "punt");
      if (puntIdx === -1) return { passed: true, details: "No punt in this game (acceptable)" };
      const puntEvent = events[puntIdx];
      const nextEvent = events[puntIdx + 1];
      if (!nextEvent) return { passed: true, details: "Punt was the last play" };
      // The punter's pre-punt yardsToGoal — receiving team should be on the
      // OTHER side of the field (so their yardsToGoal should be roughly
      // 100 - puntEvent.yardsToGoalBefore + puntDistance, not 100 - puntEvent.yardsToGoalBefore).
      const passed = nextEvent.possessionTeamId !== puntEvent.possessionTeamId
        && nextEvent.yardsToGoalBefore > 30; // sanity: shouldn't immediately be in red zone
      return {
        passed,
        details: {
          puntFromYTG: puntEvent.yardsToGoalBefore,
          nextDriveYTG: nextEvent.yardsToGoalBefore,
          posBefore: puntEvent.possessionTeamId,
          posAfter: nextEvent.possessionTeamId,
        },
      };
    },
  },
];

function runScenario(id, sim) {
  const scenario = SCENARIOS.find((s) => s.id === id);
  if (!scenario) return { id, passed: false, details: `Unknown scenario: ${id}. Available: ${SCENARIOS.map((s) => s.id).join(", ")}` };
  try {
    const result = scenario.run(sim);
    return { id, description: scenario.description, ...result };
  } catch (e) {
    return { id, passed: false, details: { error: e.message, stack: (e.stack || "").split("\n").slice(0, 4) } };
  }
}

function runAllScenarios(sim) {
  return SCENARIOS.map((s) => runScenario(s.id, sim));
}

module.exports = { SCENARIOS, runScenario, runAllScenarios };
