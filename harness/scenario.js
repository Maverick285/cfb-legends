#!/usr/bin/env node
// HARNESS-2 scenario runner. Spec: 49 §"Scenario Harness".
//
// Usage:
//   node harness/scenario.js                           # run all scenarios
//   node harness/scenario.js --id qb_injury_depth_chart
//   node harness/scenario.js --id punt_field_position --json

const { loadAll } = require("./node-shim");
const { SCENARIOS, runScenario, runAllScenarios } = require("./scenarios/registry");

function parseArgs(argv) {
  const args = { id: null, json: false };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--id") { args.id = argv[i + 1]; i++; }
    else if (k === "--json") args.json = true;
    else if (k === "--list") args.list = true;
    else if (k === "--help" || k === "-h") {
      console.log("Usage: node harness/scenario.js [--id <name>] [--json] [--list]");
      console.log("Available IDs:");
      SCENARIOS.forEach((s) => console.log(`  ${s.id} — ${s.description}`));
      process.exit(0);
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.list) {
    SCENARIOS.forEach((s) => console.log(`${s.id} — ${s.description}`));
    return;
  }
  const sim = loadAll();
  const results = args.id ? [runScenario(args.id, sim)] : runAllScenarios(sim);

  if (args.json) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    let pass = 0, fail = 0;
    results.forEach((r) => {
      const tag = r.passed ? "PASS" : "FAIL";
      console.log(`[${tag}] ${r.id} — ${r.description || ""}`);
      if (!r.passed) {
        console.log("       details:", JSON.stringify(r.details));
        fail++;
      } else { pass++; }
    });
    console.log(`\n${pass} pass · ${fail} fail · ${results.length} total`);
  }
  process.exit(results.some((r) => !r.passed) ? 1 : 0);
}

if (require.main === module) main();

module.exports = { main };
