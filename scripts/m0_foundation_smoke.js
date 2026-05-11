#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const foundation = fs.readFileSync(path.join(root, "js", "m0", "foundation.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const checks = [
  ["index loads M0 foundation", index.includes("js/m0/foundation.js")],
  ["index does not load legacy app.js", !index.includes("app.js?v=")],
  ["foundation exposes CGM_M0", foundation.includes("global.CGM_M0")],
  ["foundation has route registry", foundation.includes("const ROUTES")],
  ["foundation has save key", foundation.includes("cgm.m0Career.v1")],
  ["foundation can create world", foundation.includes("function createWorld")],
  ["foundation can render roster", foundation.includes("function renderRoster")],
  ["foundation can render person profile", foundation.includes("function renderPerson")],
  ["foundation supports hash person route", foundation.includes("#/person/")],
  ["foundation has selectors", foundation.includes("const selectors")],
  ["styles include M0 shell", styles.includes(".m0-workspace")],
  ["styles include M0 table", styles.includes(".m0-table")],
];

const failed = checks.filter(([, passed]) => !passed);
checks.forEach(([label, passed]) => {
  console.log(`${passed ? "PASS" : "FAIL"} ${label}`);
});

if (failed.length) {
  console.error(`\n${failed.length} M0 foundation checks failed.`);
  process.exit(1);
}

console.log(`\n${checks.length} M0 foundation checks passed.`);
