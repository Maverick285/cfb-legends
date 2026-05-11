const fs = require("fs");
const path = require("path");
const { createInitialWorld, ATTRIBUTE_KEYS } = require("../world.js");

const root = path.resolve(__dirname, "..");
const requiredFiles = ["index.html", "styles.css", "app.js", "world.js"].map((file) => path.join(root, file));
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`Missing required prototype file: ${file}`);
}

const world = createInitialWorld();
if (world.roster.length !== 105) {
  throw new Error(`Expected 105 roster players, got ${world.roster.length}`);
}

for (const player of world.roster) {
  const missing = ATTRIBUTE_KEYS.filter((key) => typeof player.attributes[key] !== "number");
  if (missing.length) throw new Error(`${player.displayName} missing attributes: ${missing.join(", ")}`);
  if (!player.positionOverall || typeof player.positionOverall[player.primaryPosition] !== "number") {
    throw new Error(`${player.displayName} missing computed position overall for ${player.primaryPosition}`);
  }
  if (!player.personId || !player.displayName || !player.primaryPosition || !player.classYear) {
    throw new Error(`Incomplete player identity record: ${JSON.stringify(player)}`);
  }
}

const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8");
const expectedRoutes = [
  "home", "dashboard", "news", "standings", "calendar", "roster", "depth", "training",
  "game-scout", "recruiting", "facilities", "coaches", "staff", "records", "history", "settings",
];
for (const route of expectedRoutes) {
  if (!appSource.includes(`"${route}"`) && !appSource.includes(`'${route}'`)) {
    throw new Error(`Route not present in app.js: ${route}`);
  }
}

const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
for (const selector of [".side-rail", ".top-bar", ".secondary-nav", ".home-page", ".story-reel", ".story-slide", ".quick-actions", ".dashboard-grid", ".dashboard-widget", ".status-strip", ".table-panel"]) {
  if (!css.includes(selector)) throw new Error(`Missing required shell selector: ${selector}`);
}

if (!appSource.includes("function renderDashboard")) throw new Error("Dashboard route renderer missing");
if (!appSource.includes("world.stories.map")) throw new Error("Home narrative reel is not backed by story records");
if (!appSource.includes("quick-actions")) throw new Error("Home page quick actions panel missing");
if (!appSource.includes("data-story-jump")) throw new Error("Home narrative reel is missing visible story navigation controls");
if (appSource.includes('sectionHeader("Home"') || appSource.includes('sectionHeader("Dashboard"')) {
  throw new Error("Home/Dashboard must not render center page headers");
}
const widgetCalls = (appSource.match(/widget\("/g) || []).length + (appSource.match(/data-widget="team-snapshot"/g) || []).length;
if (widgetCalls !== 9) throw new Error(`Expected 9 dashboard widgets, found ${widgetCalls}`);
for (const dashboardRequirement of ["topPlayer(", "roomAverage(", "standingsWidget()", "scheduleWidget(", "trainingWidget(", "statsWidget()", "recruitingCard(", "strategyCard(", "injuryCard("]) {
  if (!appSource.includes(dashboardRequirement)) {
    throw new Error(`Dashboard widget is missing richer programmatic content: ${dashboardRequirement}`);
  }
}
if (!css.includes("grid-template-columns: repeat(3, minmax(0, 1fr))")) {
  throw new Error("Dashboard grid is not locked to equal 3-column desktop tiles");
}
for (const selector of [".widget-body", ".mini-kpi", ".player-line", ".meter-line", ".standings-pack", ".next-game-card", ".objective-list"]) {
  if (!css.includes(selector)) throw new Error(`Missing dashboard widget presentation selector: ${selector}`);
}
for (const selector of [".depth-workbench", ".formation-board", ".formation-token", ".formation-picker", ".formation-tabs", ".formation-choice", ".depth-player-list", ".depth-list-columns", ".depth-player-row", ".depth-profile-widget"]) {
  if (!css.includes(selector)) throw new Error(`Missing depth chart selector: ${selector}`);
}
for (const depthRequirement of ["depthFormations", "formationAssignments", "renderFormationSpots", "renderFormationList", "renderSmallPlayerProfile", "data-depth-position", "data-depth-tab", "data-depth-formation-choice", "data-depth-player", "data-depth-spot"]) {
  if (!appSource.includes(depthRequirement)) throw new Error(`Depth chart interaction missing: ${depthRequirement}`);
}
for (const selector of [".roster-workbench", ".roster-profile-large", ".roster-board-table", ".position-filter", ".comparison-profile", ".role-pill", ".swap-flash"]) {
  if (!css.includes(selector)) throw new Error(`Missing global roster/depth selector: ${selector}`);
}
for (const rosterRequirement of ["renderLargePlayerProfile", "renderComparisonProfile", "renderRosterRows", "data-roster-swap", "data-position-filter-value", "data-roster-player"]) {
  if (!appSource.includes(rosterRequirement)) throw new Error(`Global roster/depth interaction missing: ${rosterRequirement}`);
}
if (!appSource.includes('player.isSelectedStarter ? "Selected" : player.isStarter ? "Starter" : "Reserve"')) {
  throw new Error("Formation depth rows must clearly distinguish selected starter, starter, and reserve state");
}
for (const banned of ["dataChip(", ".data-chip", "world/store record", "screen-shaped placeholder data"]) {
  if (appSource.includes(banned) || css.includes(banned)) {
    throw new Error(`Visible provenance/debug label artifact still present: ${banned}`);
  }
}

console.log("PASS cfl-next prototype validation: desktop shell, narrative reel, equal dashboard widgets, formation depth chart, and global roster board present");
