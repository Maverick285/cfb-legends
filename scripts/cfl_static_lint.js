const { execFileSync } = require("node:child_process");

const files = [
  "js/m0/foundation.js",
  "scripts/m0_foundation_smoke.js",
  "scripts/cfl_static_lint.js",
  "scripts/cfl_visual_static_check.js",
];

for (const file of files) {
  execFileSync(process.execPath, ["--check", file], { stdio: "inherit" });
}

console.log(`PASS static lint checked ${files.length} JavaScript files.`);
