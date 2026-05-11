const fs = require("node:fs");

const foundation = fs.readFileSync("js/m0/foundation.js", "utf8");
const styles = fs.readFileSync("styles.css", "utf8");
const index = fs.readFileSync("index.html", "utf8");

const checks = [
  ["app header test id", index.includes('data-testid="app-header"')],
  ["sidebar test id", index.includes('data-testid="sidebar-nav"')],
  ["main content test id", index.includes('data-testid="main-content"')],
  ["dashboard grid", foundation.includes("cfl-dashboard-grid")],
  ["current matchup card", foundation.includes('data-testid="current-matchup-card"')],
  ["team overview card", foundation.includes('data-testid="team-overview-card"')],
  ["schedule card", foundation.includes('data-testid="schedule-card"')],
  ["recruiting card", foundation.includes('data-testid="recruiting-card"')],
  ["staff card", foundation.includes('data-testid="staff-card"')],
  ["rankings card", foundation.includes('data-testid="rankings-card"')],
  ["bottom ticker", foundation.includes('data-testid="bottom-ticker"')],
  ["continue button", foundation.includes('data-testid="continue-button"')],
  ["continue mutates week", foundation.includes("function continueWeek()") && foundation.includes("career.advance")],
  ["dashboard css", styles.includes(".cfl-dashboard-grid")],
  ["matchup css", styles.includes(".cfl-matchup-card")],
  ["ticker css", styles.includes(".cfl-bottom-ticker")],
  ["hidden override", styles.includes("[hidden]") && styles.includes("!important")],
];

let failed = false;
for (const [name, pass] of checks) {
  if (pass) console.log(`PASS ${name}`);
  else {
    failed = true;
    console.error(`FAIL ${name}`);
  }
}

if (failed) process.exit(1);
console.log(`${checks.length} dashboard visual contract checks passed.`);
