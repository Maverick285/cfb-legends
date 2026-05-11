#!/usr/bin/env node
// HARNESS-2 continuous monitor. Runs the sim harness on a cadence forever,
// appends a one-line JSON record to harness/runs/history.jsonl, prints a
// human-readable summary, and exits non-zero only if the harness itself
// crashes (band violations are recorded but do not stop the loop).
//
// Usage:
//   node harness/loop.js                    # default: every 600s, 100 games
//   node harness/loop.js --interval 300 --games 200
//   node harness/loop.js --once             # run once and exit
//   node harness/loop.js --interval 60 --games 50  # rapid for dev

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const HISTORY = path.join(__dirname, "runs", "history.jsonl");
const STATUS = path.join(__dirname, "runs", "loop-status.json");

function parseArgs(argv) {
  const args = { interval: 600, games: 100, seedRotation: true, once: false };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i], v = argv[i + 1];
    if (k === "--interval") { args.interval = Number(v); i++; }
    else if (k === "--games") { args.games = Number(v); i++; }
    else if (k === "--seed") { args.seed = Number(v); args.seedRotation = false; i++; }
    else if (k === "--once") { args.once = true; }
    else if (k === "--help" || k === "-h") {
      console.log("Usage: node harness/loop.js [--interval SEC] [--games N] [--seed N] [--once]");
      process.exit(0);
    }
  }
  return args;
}

function nowIso() { return new Date().toISOString(); }

function runOnce(seed, games) {
  return new Promise((resolve) => {
    const t0 = Date.now();
    const child = spawn(process.execPath, [
      path.join(__dirname, "run.js"),
      "--seed", String(seed),
      "--games", String(games),
    ], { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
    let out = "", err = "";
    child.stdout.on("data", (d) => { out += d.toString(); });
    child.stderr.on("data", (d) => { err += d.toString(); });
    child.on("close", (code) => {
      const elapsed = Date.now() - t0;
      const summary = readSummaryFor(seed);
      resolve({ seed, games, code, elapsed, out, err, summary });
    });
  });
}

function readSummaryFor(seed) {
  const p = path.join(__dirname, "runs", `seed_${seed}`, "summary.json");
  try { return JSON.parse(fs.readFileSync(p, "utf8")); }
  catch { return null; }
}

function writeStatus(state) {
  fs.mkdirSync(path.dirname(STATUS), { recursive: true });
  fs.writeFileSync(STATUS, JSON.stringify(state, null, 2));
}

function appendHistory(record) {
  fs.mkdirSync(path.dirname(HISTORY), { recursive: true });
  fs.appendFileSync(HISTORY, JSON.stringify(record) + "\n");
}

function summarize(record) {
  const t = record.totals;
  if (!t) return `[${record.at}] iter=${record.iter} seed=${record.seed} FAIL exit=${record.code} ${record.issues || ""}`;
  return `[${record.at}] iter=${record.iter} seed=${record.seed} games=${record.games} ` +
    `score=${t.avgScoreHome}-${t.avgScoreAway} ypp=${t.yardsPerPlay} ` +
    `succ=${t.successRate}% homeWin=${t.homeWinRate}% (${record.elapsed}ms exit=${record.code})`;
}

async function main() {
  const args = parseArgs(process.argv);
  let iter = 0;
  let baseSeed = args.seed || 1;
  const startedAt = nowIso();

  console.log(`[HARNESS-LOOP] started at ${startedAt} interval=${args.interval}s games=${args.games}`);
  writeStatus({ pid: process.pid, startedAt, args, iter });

  const tick = async () => {
    iter += 1;
    const seed = args.seedRotation ? (baseSeed + iter) : baseSeed;
    const result = await runOnce(seed, args.games);
    const record = {
      at: nowIso(),
      iter,
      seed,
      games: args.games,
      elapsed: result.elapsed,
      code: result.code,
      totals: result.summary ? result.summary.totals : null,
      issues: result.summary && result.summary.totals ? null : result.err.slice(-200),
    };
    appendHistory(record);
    writeStatus({ pid: process.pid, startedAt, lastIter: iter, lastAt: record.at, lastSummary: record.totals, args });
    console.log(summarize(record));
  };

  await tick();
  if (args.once) return;

  setInterval(() => {
    tick().catch((e) => console.error("[HARNESS-LOOP] tick error:", e.message));
  }, args.interval * 1000);
}

main().catch((e) => { console.error("[HARNESS-LOOP] fatal:", e); process.exit(2); });
