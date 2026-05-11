#!/usr/bin/env node
// HARNESS-2: Headless sim runner.
// Spec: 49_TEST_HARNESS_SCENARIO_BALANCE_AND_AI_QC_SPEC.md §"Headless Runner"
//
// Usage:
//   node harness/run.js                    # default: seed=123 games=10
//   node harness/run.js --seed 42 --games 100
//   node harness/run.js --seed 7 --games 50 --homeTalent 80 --awayTalent 70
//
// Output:
//   harness/runs/seed_{seed}/summary.json
//   harness/runs/seed_{seed}/games.csv
//   harness/runs/seed_{seed}/validation_report.md
//   harness/runs/seed_{seed}/anomalies.json

const fs = require("fs");
const path = require("path");

const { loadAll } = require("./node-shim");
const { buildRoster, mulberry32, hashStr } = require("./seeded-roster");

function parseArgs(argv) {
  const args = { seed: 123, games: 10, homeTalent: 78, awayTalent: 75 };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    const v = argv[i + 1];
    if (k === "--seed") { args.seed = Number(v); i++; }
    else if (k === "--games") { args.games = Number(v); i++; }
    else if (k === "--homeTalent") { args.homeTalent = Number(v); i++; }
    else if (k === "--awayTalent") { args.awayTalent = Number(v); i++; }
    else if (k === "--help" || k === "-h") {
      console.log("Usage: node harness/run.js [--seed N] [--games G] [--homeTalent T] [--awayTalent T]");
      process.exit(0);
    }
  }
  return args;
}

function defaultTendencies(label) {
  // play-selector expects integer 0-100 fields: passRate, runRate, blitzRate, pace.
  // Fractional / wrong-shape returns made every call NaN→false→rush. Surfaced
  // by the cancelled scheduled-run agent at 2026-05-03T20:09Z.
  return {
    label,
    passRate: 52,
    runRate: 48,
    deepRate: 18,
    blitzRate: 22,
    pace: 65,
    coverageBias: "balanced",
  };
}
function defaultGamePlan() {
  return { aggression: 0.5, riskTolerance: 0.5, passProtection: 0.5 };
}

function pct(v) { return Math.round(v * 1000) / 10; }

function runOnce({ seed, games, homeTalent, awayTalent }) {
  const sim = loadAll();
  if (!sim.game || !sim.game.runFullGame) {
    throw new Error("CGM_GAME_ENGINE missing — module load failed");
  }

  const homeId = "HOME";
  const awayId = "AWAY";
  const homeRoster = buildRoster({ seed, teamId: homeId, talent: homeTalent });
  const awayRoster = buildRoster({ seed, teamId: awayId, talent: awayTalent });

  const rng = mulberry32(hashStr(`${seed}|games`));

  const results = [];
  let totalPlays = 0;
  let totalYards = 0;
  let totalScoreHome = 0, totalScoreAway = 0;
  let totalExplosivesHome = 0, totalExplosivesAway = 0;
  let totalSuccess = 0;
  const reasonRollup = {};
  const driveResultRollup = { TD: 0, FG: 0, Punt: 0, INT: 0, Fumble: 0, Other: 0 };
  let homeWins = 0;
  // Per-play-type stats for distribution validation.
  const playTypeStats = {}; // playType → { count, totalYards, totalSuccess }
  let penaltyCount = 0;

  for (let i = 0; i < games; i++) {
    const result = sim.game.runFullGame({
      gameId: `g${i + 1}`,
      random: rng,
      homeTeamId: homeId,
      awayTeamId: awayId,
      homeRoster,
      awayRoster,
      homeShortName: "Home",
      awayShortName: "Away",
      homeTendencies: defaultTendencies("HomeTend"),
      awayTendencies: defaultTendencies("AwayTend"),
      homeGamePlan: defaultGamePlan(),
      awayGamePlan: defaultGamePlan(),
      playerTeamId: homeId,
    });

    const homePts = result.ourScore;
    const awayPts = result.oppScore;
    if (homePts > awayPts) homeWins++;
    totalScoreHome += homePts;
    totalScoreAway += awayPts;

    const allEvents = result.events || [];
    totalPlays += allEvents.length;
    allEvents.forEach((e) => {
      totalYards += e.yardsGained || 0;
      if ((e.yardsGained || 0) >= 20) {
        if (e.possessionTeamId === homeId) totalExplosivesHome++;
        else totalExplosivesAway++;
      }
      if (e.firstDown || (e.scoring && e.scoring.points > 0)) totalSuccess++;
      (e.reasonCodes || []).forEach((c) => { reasonRollup[c] = (reasonRollup[c] || 0) + 1; });
      // Per-play-type bucket
      const pt = e.playType || "unknown";
      if (!playTypeStats[pt]) playTypeStats[pt] = { count: 0, totalYards: 0, success: 0 };
      playTypeStats[pt].count++;
      playTypeStats[pt].totalYards += e.yardsGained || 0;
      if (e.firstDown || (e.scoring && e.scoring.points > 0)) playTypeStats[pt].success++;
      if (pt === "penalty_only") penaltyCount++;
    });
    (result.driveSummaries || []).forEach((d) => {
      const r = d.result || "Other";
      driveResultRollup[r] = (driveResultRollup[r] || 0) + 1;
    });

    results.push({
      gameId: `g${i + 1}`,
      homeScore: homePts,
      awayScore: awayPts,
      win: result.win,
      plays: allEvents.length,
      drives: (result.driveSummaries || []).length,
      ourYpp: result.advanced.ourYardsPerPlay,
      oppYpp: result.advanced.oppYardsPerPlay,
      ourSuccessRate: result.advanced.ourSuccessRate,
      explosives: result.advanced.explosivePlays,
    });
  }

  const totals = {
    games,
    plays: totalPlays,
    avgPlaysPerGame: Math.round((totalPlays / Math.max(1, games)) * 10) / 10,
    avgScoreHome: Math.round((totalScoreHome / Math.max(1, games)) * 10) / 10,
    avgScoreAway: Math.round((totalScoreAway / Math.max(1, games)) * 10) / 10,
    avgScoreCombined: Math.round(((totalScoreHome + totalScoreAway) / Math.max(1, games)) * 10) / 10,
    yardsPerPlay: Math.round((totalYards / Math.max(1, totalPlays)) * 100) / 100,
    successRate: pct(totalSuccess / Math.max(1, totalPlays)),
    explosivesPerGameHome: Math.round((totalExplosivesHome / Math.max(1, games)) * 10) / 10,
    explosivesPerGameAway: Math.round((totalExplosivesAway / Math.max(1, games)) * 10) / 10,
    homeWinRate: pct(homeWins / Math.max(1, games)),
    driveResults: driveResultRollup,
    topReasonCodes: Object.entries(reasonRollup).sort((a, b) => b[1] - a[1]).slice(0, 12),
    penaltyRate: pct(penaltyCount / Math.max(1, totalPlays)),
    playTypeBreakdown: Object.entries(playTypeStats).map(([type, s]) => ({
      type,
      count: s.count,
      sharePct: pct(s.count / Math.max(1, totalPlays)),
      avgYards: Math.round((s.totalYards / Math.max(1, s.count)) * 100) / 100,
      successRatePct: pct(s.success / Math.max(1, s.count)),
    })).sort((a, b) => b.count - a.count),
  };

  return { totals, perGame: results };
}

// ── Statistical validation bands ────────────────────────────────────────
// Real CFB FBS averages (5-year mean): Y/A ~5.7 (per attempt), per-play yards
// blending rush+pass ~5.6, total points/team ~28.5, total scored combined ~57,
// successful play rate ~45%, explosive plays per team ~6/game.
// We use slightly looser bands because our sim is a sandbox.
const BANDS = {
  yardsPerPlay: { min: 4.5, max: 8.5, target: "~5.5-6.5 (real CFB ~5.6)" },
  avgScoreCombined: { min: 30, max: 80, target: "~50-60 (real CFB ~57)" },
  successRate: { min: 35, max: 55, target: "~42-48% (real CFB ~45)" },
  avgPlaysPerGame: { min: 100, max: 180, target: "~130-150 combined" },
  explosivesPerGameHome: { min: 2, max: 12, target: "~5-7 per team" },
  homeWinRate: { min: 35, max: 75, target: "~50% with equal talent, ~60% with home edge" },
  penaltyRate: { min: 3, max: 12, target: "~6-9% of plays (real CFB)" },
};

// Per-play-type avg-yard bands. Real CFB anchors:
//   rush: ~4.4 ypc; pass: ~7.1 yds/att (incl incompletes); sack: ~ -7;
//   field_goal: 0 (special); punt: 0 (event yards = 0 since landing handled separately)
const PLAY_TYPE_BANDS = {
  rush:  { avgYardsMin: 3.0, avgYardsMax: 6.5, sharePctMin: 25, sharePctMax: 60, target: "real CFB rush ~4.4 ypc, ~45-55% share" },
  pass:  { avgYardsMin: 4.0, avgYardsMax: 9.0, sharePctMin: 25, sharePctMax: 55, target: "real CFB pass ~7.1 yds/att, ~45-55% share" },
};

function validate(totals) {
  const issues = [];
  const checks = [];
  for (const [key, band] of Object.entries(BANDS)) {
    const v = Number(totals[key]);
    const ok = v >= band.min && v <= band.max;
    checks.push({ key, value: v, band, ok });
    if (!ok) {
      issues.push({
        severity: v < band.min * 0.7 || v > band.max * 1.3 ? "MAJOR" : "MINOR",
        check: key, value: v, expected: `${band.min}-${band.max}`, target: band.target,
      });
    }
  }
  // Per-play-type validation
  (totals.playTypeBreakdown || []).forEach((row) => {
    const band = PLAY_TYPE_BANDS[row.type];
    if (!band) return;
    if (row.avgYards < band.avgYardsMin || row.avgYards > band.avgYardsMax) {
      issues.push({
        severity: "MINOR", check: `playType.${row.type}.avgYards`, value: row.avgYards,
        expected: `${band.avgYardsMin}-${band.avgYardsMax}`, target: band.target,
      });
    }
    if (row.sharePct < band.sharePctMin || row.sharePct > band.sharePctMax) {
      issues.push({
        severity: "MINOR", check: `playType.${row.type}.sharePct`, value: row.sharePct,
        expected: `${band.sharePctMin}-${band.sharePctMax}`, target: band.target,
      });
    }
  });
  return { checks, issues };
}

function validationReport(args, totals, validation) {
  const lines = [];
  lines.push(`# Sim Run Validation Report`);
  lines.push(``);
  lines.push(`Run: seed=${args.seed} games=${args.games} home=${args.homeTalent} away=${args.awayTalent}`);
  lines.push(``);
  lines.push(`## Aggregate Stats`);
  lines.push(``);
  lines.push(`| Metric | Value | Band | Target | Result |`);
  lines.push(`|--------|-------|------|--------|--------|`);
  validation.checks.forEach((c) => {
    lines.push(`| ${c.key} | ${c.value} | ${c.band.min}-${c.band.max} | ${c.band.target} | ${c.ok ? "PASS" : "FAIL"} |`);
  });
  lines.push(``);
  lines.push(`## Drive Result Distribution`);
  lines.push(``);
  Object.entries(totals.driveResults).forEach(([k, v]) => {
    lines.push(`- ${k}: ${v}`);
  });
  lines.push(``);
  lines.push(`## Per-Play-Type Breakdown`);
  lines.push(``);
  lines.push(`| Type | Count | Share % | Avg Yds | Success % |`);
  lines.push(`|------|-------|---------|---------|-----------|`);
  (totals.playTypeBreakdown || []).forEach((r) => {
    lines.push(`| ${r.type} | ${r.count} | ${r.sharePct} | ${r.avgYards} | ${r.successRatePct} |`);
  });
  lines.push(``);
  lines.push(`Penalty rate: **${totals.penaltyRate}%** of plays (target 6-9%).`);
  lines.push(``);
  lines.push(`## Top Reason Codes`);
  lines.push(``);
  totals.topReasonCodes.forEach(([code, count]) => {
    lines.push(`- ${code}: ${count}`);
  });
  lines.push(``);
  if (validation.issues.length) {
    lines.push(`## Issues`);
    lines.push(``);
    validation.issues.forEach((issue) => {
      lines.push(`- **${issue.severity}** ${issue.check} = ${issue.value} (expected ${issue.expected}; ${issue.target})`);
    });
  } else {
    lines.push(`## Issues`);
    lines.push(``);
    lines.push(`None — all metrics within statistical bands.`);
  }
  lines.push(``);
  return lines.join("\n");
}

function gamesCsv(perGame) {
  const header = "gameId,homeScore,awayScore,win,plays,drives,ourYpp,oppYpp,ourSuccessRate,explosives";
  const rows = perGame.map((g) =>
    `${g.gameId},${g.homeScore},${g.awayScore},${g.win ? 1 : 0},${g.plays},${g.drives},${g.ourYpp},${g.oppYpp},${g.ourSuccessRate},"${g.explosives}"`
  );
  return [header, ...rows].join("\n");
}

function main() {
  const args = parseArgs(process.argv);
  console.log(`[HARNESS-2] Starting seed=${args.seed} games=${args.games} homeTalent=${args.homeTalent} awayTalent=${args.awayTalent}`);
  const t0 = Date.now();
  const { totals, perGame } = runOnce(args);
  const validation = validate(totals);
  const elapsed = Date.now() - t0;

  const outDir = path.join(__dirname, "runs", `seed_${args.seed}`);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "summary.json"), JSON.stringify({ args, totals, elapsedMs: elapsed }, null, 2));
  fs.writeFileSync(path.join(outDir, "games.csv"), gamesCsv(perGame));
  fs.writeFileSync(path.join(outDir, "validation_report.md"), validationReport(args, totals, validation));
  fs.writeFileSync(path.join(outDir, "anomalies.json"), JSON.stringify(validation.issues, null, 2));

  console.log(`[HARNESS-2] Wrote ${outDir}`);
  console.log(`  games:                ${args.games}`);
  console.log(`  elapsed:              ${elapsed}ms (${(elapsed / args.games).toFixed(1)}ms/game)`);
  console.log(`  avg score:            ${totals.avgScoreHome} - ${totals.avgScoreAway} (combined ${totals.avgScoreCombined})`);
  console.log(`  yards/play:           ${totals.yardsPerPlay}`);
  console.log(`  success rate:         ${totals.successRate}%`);
  console.log(`  plays/game:           ${totals.avgPlaysPerGame}`);
  console.log(`  explosives/game:      ${totals.explosivesPerGameHome}H / ${totals.explosivesPerGameAway}A`);
  console.log(`  home win rate:        ${totals.homeWinRate}%`);
  console.log(`  penalty rate:         ${totals.penaltyRate}%`);
  console.log(`  rush share/avg:       ${(totals.playTypeBreakdown.find(r => r.type === "rush") || {}).sharePct || 0}% / ${(totals.playTypeBreakdown.find(r => r.type === "rush") || {}).avgYards || 0}`);
  console.log(`  pass share/avg:       ${(totals.playTypeBreakdown.find(r => r.type === "pass") || {}).sharePct || 0}% / ${(totals.playTypeBreakdown.find(r => r.type === "pass") || {}).avgYards || 0}`);
  console.log(`  validation:           ${validation.issues.length === 0 ? "ALL PASS" : `${validation.issues.length} issue(s)`}`);
  if (validation.issues.length) {
    validation.issues.forEach((i) => console.log(`    [${i.severity}] ${i.check}=${i.value} (want ${i.expected})`));
  }

  const exitCode = validation.issues.some((i) => i.severity === "MAJOR") ? 1 : 0;
  process.exit(exitCode);
}

if (require.main === module) {
  main();
}

module.exports = { runOnce, validate };
