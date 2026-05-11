// HARNESS-2: Node shim for browser-shaped sim modules.
// Spec: ai-pack/CFB_FM_REMAINING_SYSTEM_SPECS/49_TEST_HARNESS_SCENARIO_BALANCE_AND_AI_QC_SPEC.md §"Headless Runner"
//
// Each js/sim/** module is an IIFE that attaches to `window`. We expose `global`
// as `window` and load each file in dependency order via vm.runInThisContext.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

global.window = global;
if (!global.console) global.console = console;

const ROOT = path.resolve(__dirname, "..");

const LOAD_ORDER = [
  "js/sim/matchup/attribute-registry.js",
  "js/sim/matchup/matchup.js",
  "js/sim/events/play-event.js",
  "js/sim/dev/dev-engine.js",
  "js/sim/persistence/event-log.js",
  "js/sim/persistence/action-log.js",
  "js/sim/persistence/state-hash.js",
  "js/sim/persistence/replay.js",
  "js/sim/persistence/reducers.js",
  "js/sim/staff/coaching-carousel.js",
  "js/sim/portal/portal-v2.js",
  "js/sim/media/voices-engine.js",
  "js/sim/ai/ai-school.js",
  "js/sim/ai/ai-nil-bidding.js",
  "js/sim/qc/invariants.js",
  "js/sim/recruiting/recruiting-v2.js",
  "js/sim/recruiting/ai-recruiting.js",
  "js/sim/pulse/campus-pulse.js",
  "js/sim/nil/nil-engine.js",
  "js/sim/draft/draft-engine.js",
  "js/sim/scrapbook/scrapbook-engine.js",
  "js/sim/stats/stat-taxonomy.js",
  "js/sim/stats/stat-accumulator.js",
  "js/sim/stats/player-stat-accumulator.js",
  "js/sim/playgen/game-state.js",
  "js/sim/playgen/play-selector.js",
  "js/sim/playgen/play-resolver.js",
  "js/sim/playgen/drive-engine.js",
  "js/sim/playgen/game-engine.js",
  "js/sim/playgen/extras-engine.js",
  "js/sim/injury/injury-engine.js",
  "js/sim/realignment/realignment-engine.js",
  "js/sim/awards/awards-engine.js",
  "js/sim/archive/alumni-archive.js",
];

function loadAll() {
  for (const rel of LOAD_ORDER) {
    const abs = path.join(ROOT, rel);
    const src = fs.readFileSync(abs, "utf8");
    vm.runInThisContext(src, { filename: rel });
  }
  return {
    matchup: global.CGM_MATCHUP,
    registry: global.CGM_MATCHUP_REGISTRY,
    state: global.CGM_GAME_STATE,
    drive: global.CGM_DRIVE_ENGINE,
    game: global.CGM_GAME_ENGINE,
    invariants: global.CGM_INVARIANTS,
    eventLog: global.CGM_EVENT_LOG,
    actionLog: global.CGM_ACTION_LOG,
    playerStats: global.CGM_PLAYER_STAT_ACCUMULATOR,
  };
}

module.exports = { loadAll };
