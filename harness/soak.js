#!/usr/bin/env node
// HARNESS-2 multi-year soak validator.
// Spec: 49_TEST_HARNESS_SCENARIO_BALANCE_AND_AI_QC_SPEC.md §"Headless Sim Runs" + §"Statistical Validation"
//       + 12_FINAL_ALPHA_DEFINITION.md beta gate item: "20-year sim is stable"
//
// Runs N seasons of:
//   - Round-robin games among M procedural teams across 2 conferences
//   - Per-game playEvents fed into per-player accumulator → season stats
//   - Year-end:
//       * Awards resolved (POTY ballot, All-American)
//       * Record book updates
//       * Realignment cycle (rolls programs between conferences)
//       * AI standings reset
//   - Soak-validate cumulative state at end of N years.
//
// Usage:
//   node harness/soak.js                      # default seed=1, years=20, teams=12
//   node harness/soak.js --seed 5 --years 20 --teams 16
//   node harness/soak.js --json               # machine-readable output

const fs = require("fs");
const path = require("path");
const { loadAll } = require("./node-shim");
const { buildRoster, mulberry32, hashStr } = require("./seeded-roster");

function parseArgs(argv) {
  const args = { seed: 1, years: 20, teams: 12, json: false };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i], v = argv[i + 1];
    if (k === "--seed") { args.seed = Number(v); i++; }
    else if (k === "--years") { args.years = Number(v); i++; }
    else if (k === "--teams") { args.teams = Number(v); i++; }
    else if (k === "--json") args.json = true;
  }
  return args;
}

function defaultTendencies() {
  return { passRate: 52, runRate: 48, deepRate: 18, blitzRate: 22, pace: 65 };
}
function defaultGamePlan() { return { aggression: 0.5, riskTolerance: 0.5 }; }

function runSeason(args) {
  const sim = args.sim;
  const teams = args.teams;
  const random = args.random;
  const conferences = args.conferences;
  const playerStatsByTeam = {};

  // Round-robin within each conference.
  const games = [];
  Object.entries(conferences).forEach(([confId, members]) => {
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        const home = members[i];
        const away = members[j];
        const result = sim.game.runFullGame({
          gameId: `${confId}-${home}-${away}-${args.year}`,
          random,
          homeTeamId: home, awayTeamId: away,
          homeRoster: teams[home].roster, awayRoster: teams[away].roster,
          homeShortName: home, awayShortName: away,
          homeTendencies: defaultTendencies(), awayTendencies: defaultTendencies(),
          homeGamePlan: defaultGamePlan(), awayGamePlan: defaultGamePlan(),
          playerTeamId: home,
        });
        if (result.ourScore > result.oppScore) { teams[home].wins++; teams[away].losses++; }
        else { teams[away].wins++; teams[home].losses++; }
        games.push({ home, away, homeScore: result.ourScore, awayScore: result.oppScore, plays: result.events.length });

        // Tally per-player stats (only the simplest: pass yds for QB1, rush yds for HB1, rec yds for WR1).
        result.events.forEach((e) => {
          if (!e.players) return;
          const offTeam = e.possessionTeamId;
          if (!playerStatsByTeam[offTeam]) playerStatsByTeam[offTeam] = {};
          if (e.playType === "pass" && e.players.qb && (e.result && e.result.outcome === "complete" || (e.yardsGained || 0) > 0)) {
            const id = e.players.qb;
            if (!playerStatsByTeam[offTeam][id]) playerStatsByTeam[offTeam][id] = { passing_yards: 0, passing_tds: 0, position: "QB" };
            playerStatsByTeam[offTeam][id].passing_yards += e.yardsGained || 0;
            if (e.scoring && e.playType === "pass") playerStatsByTeam[offTeam][id].passing_tds++;
          }
          if (e.playType === "rush" && e.players.rusher) {
            const id = e.players.rusher;
            if (!playerStatsByTeam[offTeam][id]) playerStatsByTeam[offTeam][id] = { rushing_yards: 0, rushing_tds: 0, position: "HB" };
            playerStatsByTeam[offTeam][id].rushing_yards += e.yardsGained || 0;
            if (e.scoring) playerStatsByTeam[offTeam][id].rushing_tds++;
          }
        });
      }
    }
  });
  return { games, playerStatsByTeam };
}

function runSoak(args) {
  const sim = loadAll();
  if (!sim.game) throw new Error("CGM_GAME_ENGINE not loaded");
  const REALIGN = global.CGM_REALIGNMENT;
  const AWARDS = global.CGM_AWARDS;
  const { years, teams: teamCount, seed } = args;

  // Procedural teams + conferences.
  const teams = {};
  const teamIds = [];
  for (let i = 0; i < teamCount; i++) {
    const id = `T${String(i).padStart(2, "0")}`;
    teamIds.push(id);
    teams[id] = {
      id, shortName: id, prestige: 60 + Math.round(((i * 13) % 30) - 10),
      fanBaseScore: 50 + ((i * 7) % 40),
      conference: i < teamCount / 2 ? "alpha" : "beta",
      roster: buildRoster({ seed, teamId: id, talent: 70 + ((i * 11) % 15) }),
      wins: 0, losses: 0,
      historicalRecords: [],
    };
  }
  const conferenceDefs = {
    alpha: { id: "alpha", name: "Alpha Conf", short: "ALPHA", tier: "P4" },
    beta:  { id: "beta",  name: "Beta Conf",  short: "BETA",  tier: "G5" },
  };

  const recordBook = {};
  const awardsHistory = [];
  const realignmentMoves = [];
  const yearlyTotals = [];

  let s = hashStr(`${seed}|soak`);
  const random = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };

  for (let y = 0; y < years; y++) {
    const year = 2030 + y;
    // Reset year records
    teamIds.forEach((id) => { teams[id].wins = 0; teams[id].losses = 0; });
    // Build conferences map for this year's standings.
    const confMembers = { alpha: [], beta: [] };
    teamIds.forEach((id) => { confMembers[teams[id].conference].push(id); });

    const seasonResult = runSeason({
      sim, teams, random, year,
      conferences: confMembers,
    });

    // Record per-team record + standings
    teamIds.forEach((id) => {
      teams[id].historicalRecords.push({
        year, wins: teams[id].wins, losses: teams[id].losses,
        conference: teams[id].conference,
      });
    });

    // ── Awards (per team — single roster, single program POV) ──
    if (AWARDS) {
      teamIds.forEach((tid) => {
        const players = teams[tid].roster.map((p) => ({ ...p, teamId: tid }));
        const stats = seasonResult.playerStatsByTeam[tid] || {};
        // Only run a couple of cheap awards for the soak.
        const ballots = AWARDS.resolveSeasonAwards({
          players, statsByPlayerId: stats,
          teamWinPctByTeamId: { [tid]: teams[tid].wins / Math.max(1, teams[tid].wins + teams[tid].losses) },
        });
        const breaks = AWARDS.detectRecordBreaks({
          recordBook, statsByPlayerId: stats, players, teamId: tid, seasonYear: year,
        });
        if (breaks.breaks.length) AWARDS.applyRecordBreaks(recordBook, breaks.breaks);
        const qbAward = ballots.ballots.find((b) => b.award === "qb_award");
        const rbAward = ballots.ballots.find((b) => b.award === "rb_award");
        if (qbAward && qbAward.winner) {
          awardsHistory.push({ year, teamId: tid, award: "qb", winnerId: qbAward.winner.playerId, score: qbAward.winner.score });
        }
        if (rbAward && rbAward.winner) {
          awardsHistory.push({ year, teamId: tid, award: "rb", winnerId: rbAward.winner.playerId, score: rbAward.winner.score });
        }
      });
    }

    // ── Realignment cycle ──
    if (REALIGN) {
      const programs = teamIds.map((id) => ({
        id, shortName: teams[id].shortName, conference: teams[id].conference,
        prestige: teams[id].prestige, fanBaseScore: teams[id].fanBaseScore,
      }));
      const prevWinPctById = {};
      teamIds.forEach((id) => {
        const total = teams[id].wins + teams[id].losses;
        prevWinPctById[id] = total ? teams[id].wins / total : 0.5;
      });
      const result = REALIGN.runOffseasonRealignment({
        programs, conferences: conferenceDefs,
        prevWinPctById, random, year,
        maxMovesPerCycle: 2,
        minConfSize: 4, // soak has small conferences
      });
      result.moves.forEach((m) => {
        teams[m.programId].conference = m.toConf;
        realignmentMoves.push(m);
      });
    }

    yearlyTotals.push({
      year,
      games: seasonResult.games.length,
      avgScore: Math.round((seasonResult.games.reduce((s, g) => s + g.homeScore + g.awayScore, 0) / Math.max(1, seasonResult.games.length * 2)) * 10) / 10,
      avgPlays: Math.round((seasonResult.games.reduce((s, g) => s + g.plays, 0) / Math.max(1, seasonResult.games.length)) * 10) / 10,
      realignedThisYear: realignmentMoves.filter((m) => m.year === year).length,
    });
  }

  return { teams, recordBook, awardsHistory, realignmentMoves, yearlyTotals };
}

const SOAK_BANDS = {
  realignmentTotal: { min: 1, max: 60, target: "1-60 moves over 20 years (some, but not chaos)" },
  avgScorePerTeam: { min: 14, max: 50, target: "14-50 points per team per game" },
  awardsUniqueWinners: { min: 0.05, max: 1.0, target: "≥5% of awards go to different players (no monopoly)" },
  noPermLoser: { equality: true, target: "no team should have all 0-N records across 20 years" },
  noPermUndefeated: { equality: true, target: "no team should have all undefeated records across 20 years" },
  recordBookFilled: { min: 4, max: 99, target: "record book gathered ≥4 records over the soak (passing/rushing yds/TDs)" },
};

function validate(soak) {
  const issues = [];
  // realignmentTotal
  const realignTotal = soak.realignmentMoves.length;
  if (realignTotal < SOAK_BANDS.realignmentTotal.min || realignTotal > SOAK_BANDS.realignmentTotal.max) {
    issues.push({ severity: "MAJOR", check: "realignmentTotal", value: realignTotal, expected: `${SOAK_BANDS.realignmentTotal.min}-${SOAK_BANDS.realignmentTotal.max}` });
  }
  // avg score
  const avg = soak.yearlyTotals.reduce((s, y) => s + y.avgScore, 0) / Math.max(1, soak.yearlyTotals.length);
  if (avg < SOAK_BANDS.avgScorePerTeam.min || avg > SOAK_BANDS.avgScorePerTeam.max) {
    issues.push({ severity: "MAJOR", check: "avgScorePerTeam", value: avg.toFixed(1), expected: `${SOAK_BANDS.avgScorePerTeam.min}-${SOAK_BANDS.avgScorePerTeam.max}` });
  }
  // awards diversity
  const winners = new Set(soak.awardsHistory.map((a) => a.winnerId));
  const diversity = winners.size / Math.max(1, soak.awardsHistory.length);
  if (diversity < SOAK_BANDS.awardsUniqueWinners.min) {
    issues.push({ severity: "MINOR", check: "awardsUniqueWinners", value: diversity.toFixed(3), expected: `≥ ${SOAK_BANDS.awardsUniqueWinners.min}` });
  }
  // permanent loser/winner check
  const teamIds = Object.keys(soak.teams);
  teamIds.forEach((id) => {
    const recs = soak.teams[id].historicalRecords;
    const allLosing = recs.every((r) => r.wins === 0);
    const allUndefeated = recs.every((r) => r.losses === 0 && r.wins > 0);
    if (allLosing && recs.length >= 5) {
      issues.push({ severity: "MAJOR", check: `noPermLoser:${id}`, value: "all 0-N", expected: "varied" });
    }
    if (allUndefeated && recs.length >= 5) {
      issues.push({ severity: "MAJOR", check: `noPermUndefeated:${id}`, value: "all undefeated", expected: "varied" });
    }
  });
  // record book filled
  const recordsCount = Object.keys((soak.recordBook && soak.recordBook.schoolSeason) || {}).length;
  if (recordsCount < SOAK_BANDS.recordBookFilled.min) {
    issues.push({ severity: "MINOR", check: "recordBookFilled", value: recordsCount, expected: `≥ ${SOAK_BANDS.recordBookFilled.min}` });
  }
  return { issues, summary: { realignTotal, avg: avg.toFixed(1), diversity: diversity.toFixed(3), recordsCount, awardsCount: soak.awardsHistory.length } };
}

function main() {
  const args = parseArgs(process.argv);
  console.log(`[SOAK] starting seed=${args.seed} years=${args.years} teams=${args.teams}`);
  const t0 = Date.now();
  const soak = runSoak(args);
  const elapsed = Date.now() - t0;
  const v = validate(soak);

  // Output
  const outDir = path.join(__dirname, "runs", "soak");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `seed_${args.seed}.json`), JSON.stringify({
    args, summary: v.summary, issues: v.issues,
    yearlyTotals: soak.yearlyTotals,
    realignmentMoves: soak.realignmentMoves,
    recordBook: soak.recordBook,
    awardsHistory: soak.awardsHistory.slice(0, 200),
    elapsedMs: elapsed,
  }, null, 2));

  if (args.json) {
    console.log(JSON.stringify({ summary: v.summary, issues: v.issues }, null, 2));
  } else {
    console.log(`[SOAK] ${args.years} years, ${args.teams} teams, elapsed ${elapsed}ms`);
    console.log(`  realignment moves total:  ${v.summary.realignTotal}`);
    console.log(`  avg score per team/game:  ${v.summary.avg}`);
    console.log(`  awards diversity ratio:   ${v.summary.diversity}`);
    console.log(`  records in book:          ${v.summary.recordsCount}`);
    console.log(`  awards distributed:       ${v.summary.awardsCount}`);
    if (v.issues.length === 0) console.log(`  validation:               ALL PASS`);
    else {
      console.log(`  validation:               ${v.issues.length} issue(s)`);
      v.issues.forEach((i) => console.log(`    [${i.severity}] ${i.check}=${i.value} (want ${i.expected})`));
    }
  }
  process.exit(v.issues.some((i) => i.severity === "MAJOR") ? 1 : 0);
}

if (require.main === module) main();

module.exports = { runSoak, validate };
