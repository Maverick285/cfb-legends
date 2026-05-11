(function bootCflNext() {
  "use strict";

  const world = window.CFLNextWorld.createInitialWorld();
  const app = document.getElementById("app");

  const navItems = [
    ["home", "Home", "home"], ["dashboard", "Dashboard", "analytics"], ["news", "News", "inbox"], ["standings", "Standings", "conference"],
    ["calendar", "Calendar", "calendar"], ["roster", "Roster", "roster"], ["depth", "Depth Chart", "depth-chart"],
    ["training", "Training", "practice"], ["game-scout", "Game Scout", "scouting"], ["recruiting", "Recruiting", "recruiting"],
    ["facilities", "Facilities", "facilities"], ["coaches", "Coaches", "staff"], ["staff", "Staff", "settings"],
    ["records", "Records", "dynasty"], ["history", "History", "analytics"], ["settings", "Settings", "settings"],
  ];

  const secondary = ["overview", "team", "recruiting", "schedule", "staff", "finance", "board"];

  const routeTitles = {
    home: "Home",
    dashboard: "Athletic Desk",
    news: "News Desk",
    standings: "Conference Standings",
    calendar: "Football Calendar",
    roster: "Roster Room",
    depth: "Depth Chart",
    training: "Training Ground",
    "game-scout": "Notre Dame Scout Packet",
    recruiting: "Recruiting Board",
    finance: "Budget Room",
    facilities: "Facilities Plan",
    coaches: "Coaching Staff",
    staff: "Football Operations",
    records: "Record Book",
    history: "Program History",
    settings: "Settings",
  };

  const depthFormations = {
    offense: [
      {
        id: "off-11-spread",
        label: "11 Spread",
        sublabel: "1 RB / 1 TE / 3 WR",
        call: "Inside Zone / RPO",
        spots: [
          ["QB", "QB", 50, 72], ["RB", "RB", 50, 86],
          ["WR", "X", 14, 34], ["WR", "Z", 86, 34], ["WR", "Slot", 72, 46], ["TE", "Y", 62, 44],
          ["OT", "LT", 34, 57], ["OG", "LG", 42, 57], ["C", "C", 50, 57], ["OG", "RG", 58, 57], ["OT", "RT", 66, 57],
        ],
      },
      {
        id: "off-12-wide",
        label: "12 Wide Zone",
        sublabel: "2 TE / wide-zone base",
        call: "Wide Zone / Boot",
        spots: [
          ["QB", "QB", 50, 72], ["RB", "RB", 47, 86],
          ["WR", "X", 15, 34], ["WR", "Z", 86, 36], ["TE", "Y", 66, 46], ["TE", "H", 31, 48],
          ["OT", "LT", 34, 57], ["OG", "LG", 42, 57], ["C", "C", 50, 57], ["OG", "RG", 58, 57], ["OT", "RT", 66, 57],
        ],
      },
      {
        id: "off-20-gun",
        label: "20 Gun",
        sublabel: "2 backs / pressure answers",
        call: "Counter / Screen",
        spots: [
          ["QB", "QB", 50, 72], ["RB", "A", 42, 84], ["RB", "B", 58, 84],
          ["WR", "X", 13, 35], ["WR", "Z", 87, 35], ["WR", "Slot", 72, 46],
          ["OT", "LT", 34, 57], ["OG", "LG", 42, 57], ["C", "C", 50, 57], ["OG", "RG", 58, 57], ["OT", "RT", 66, 57],
        ],
      },
    ],
    defense: [
      {
        id: "def-425",
        label: "4-2-5 Nickel",
        sublabel: "vs spread / match zone",
        call: "Mint / Quarters",
        spots: [
          ["CB", "CB", 14, 28], ["S", "FS", 42, 18], ["S", "SS", 58, 18], ["CB", "CB", 86, 28], ["CB", "Nickel", 72, 42],
          ["LB", "Mike", 44, 48], ["LB", "Will", 56, 48],
          ["EDGE", "Edge", 32, 62], ["DL", "DT", 44, 64], ["DL", "NT", 56, 64], ["EDGE", "Edge", 68, 62],
        ],
      },
      {
        id: "def-335",
        label: "3-3-5 Stack",
        sublabel: "sim pressure / RPO answer",
        call: "Creeper / Match 3",
        spots: [
          ["CB", "CB", 14, 28], ["S", "FS", 43, 18], ["S", "SS", 57, 18], ["CB", "CB", 86, 28], ["S", "Star", 72, 42],
          ["LB", "Sam", 38, 48], ["LB", "Mike", 50, 48], ["LB", "Will", 62, 48],
          ["EDGE", "Edge", 36, 64], ["DL", "Nose", 50, 66], ["EDGE", "Edge", 64, 64],
        ],
      },
      {
        id: "def-goal",
        label: "Goal Line",
        sublabel: "heavy front / short yardage",
        call: "Bear / Cover 0",
        spots: [
          ["CB", "CB", 18, 28], ["S", "S", 50, 22], ["CB", "CB", 82, 28],
          ["LB", "Sam", 34, 47], ["LB", "Mike", 50, 47], ["LB", "Will", 66, 47],
          ["EDGE", "Edge", 28, 63], ["DL", "DT", 42, 65], ["DL", "NT", 50, 67], ["DL", "DT", 58, 65], ["EDGE", "Edge", 72, 63],
        ],
      },
    ],
    st: [
      {
        id: "st-kickoff",
        label: "Kickoff Cover",
        sublabel: "lane integrity / speed",
        call: "Middle Right",
        spots: [
          ["K", "K", 50, 84], ["CB", "L1", 18, 62], ["S", "L2", 28, 62], ["LB", "L3", 38, 62], ["RB", "L4", 46, 62],
          ["WR", "R4", 54, 62], ["LB", "R3", 62, 62], ["S", "R2", 72, 62], ["CB", "R1", 82, 62], ["EDGE", "Contain", 14, 46], ["EDGE", "Contain", 86, 46],
        ],
      },
      {
        id: "st-punt",
        label: "Punt Protect",
        sublabel: "max protect / coverage release",
        call: "Shield Right",
        spots: [
          ["P", "P", 50, 86], ["LS", "LS", 50, 61], ["LB", "Shield", 42, 72], ["LB", "Shield", 50, 73], ["TE", "Shield", 58, 72],
          ["WR", "Gunner", 12, 38], ["WR", "Gunner", 88, 38], ["OT", "LT", 35, 58], ["OG", "LG", 43, 58], ["OG", "RG", 57, 58], ["OT", "RT", 65, 58],
        ],
      },
      {
        id: "st-field-goal",
        label: "Field Goal",
        sublabel: "operation / protection",
        call: "Hash Balanced",
        spots: [
          ["K", "K", 50, 86], ["P", "H", 50, 76], ["LS", "LS", 50, 61], ["TE", "Wing", 30, 58], ["TE", "Wing", 70, 58],
          ["OT", "LT", 36, 58], ["OG", "LG", 43, 58], ["C", "C", 50, 58], ["OG", "RG", 57, 58], ["OT", "RT", 64, 58], ["RB", "Edge", 82, 52],
        ],
      },
    ],
  };

  function icon(id) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#cfl-${id}"></use></svg>`;
  }

  function render() {
    const route = currentRoute();
    app.innerHTML = `
      ${sprite()}
      <aside class="side-rail">
        <div class="brand-block">
          <div class="logo-mark">CFL</div>
          <div>
            <span>College Football</span>
            <strong>Legends</strong>
          </div>
        </div>
        <nav class="primary-nav" aria-label="Primary">
          ${navItems.map(([id, label, iconId]) => `
            <a class="nav-link ${route === id ? "active" : ""}" href="#/${id}" data-route="${id}">
              ${icon(iconId)}
              <span>${label}</span>
              ${id === "news" ? `<b>${world.inbox.length}</b>` : ""}
            </a>
          `).join("")}
        </nav>
        <a class="coach-card" href="#/coaches">
          <span>Coach</span>
          <strong>${world.staff[0].name}</strong>
        </a>
      </aside>

      <section class="main-frame">
        <header class="top-bar">
          <a class="team-plate" href="#/dashboard">
            <span class="team-logo">V</span>
            <span>
              <strong>${world.school.name}</strong>
              <em>${world.school.record} (${world.school.conferenceRecord})</em>
            </span>
          </a>
          <div class="next-event">
            <span>Next Event</span>
            <strong>${world.schedule.find((g) => g.status === "next").opponent}</strong>
          </div>
          <div class="utility-icons" aria-label="Utilities">
            <a href="#/news" title="Search">${icon("search")}</a>
            <a href="#/news" title="Inbox">${icon("inbox")}<b>${world.inbox.length}</b></a>
            <a href="#/settings" title="Settings">${icon("settings")}</a>
          </div>
          <button class="continue-button" type="button" data-advance>Continue</button>
        </header>

        <nav class="secondary-nav" aria-label="Secondary">
          ${secondary.map((id) => `<a href="#/${id === "overview" ? "dashboard" : id}" class="${matchesSecondary(route, id) ? "active" : ""}">${titleCase(id)}</a>`).join("")}
        </nav>

        <main class="content-shell" data-route="${route}">
          ${renderRoute(route)}
        </main>

        <footer class="status-strip">
          <a href="#/standings"><span>RPI</span><strong>#14</strong></a>
          <a href="#/standings"><span>Conf Rank</span><strong>3rd</strong></a>
          <a href="#/finance"><span>Budget</span><strong>${world.metrics.budget}</strong></a>
          <a href="#/roster"><span>Roster</span><strong>${world.metrics.rosterCount}/105</strong></a>
          <a href="#/dashboard"><span>Morale</span><strong>${world.metrics.morale}/100</strong></a>
          <a href="#/dashboard"><span>Fan Happy</span><strong>${world.metrics.fanHappiness}</strong></a>
        </footer>
      </section>
    `;
    wire();
  }

  function currentRoute() {
    const route = (location.hash || "#/home").replace(/^#\//, "");
    return routeTitles[route] ? route : "home";
  }

  function matchesSecondary(route, id) {
    if (id === "overview") return route === "dashboard";
    if (id === "team") return ["roster", "depth", "training"].includes(route);
    if (id === "board") return ["standings", "records", "history"].includes(route);
    return route === id;
  }

  function renderRoute(route) {
    if (route === "home") return renderHome();
    if (route === "dashboard") return renderDashboard();
    if (route === "roster") return renderRoster();
    if (route === "depth") return renderDepth();
    if (route === "news") return renderNews();
    if (route === "standings") return renderStandings();
    if (route === "calendar" || route === "schedule") return renderSchedule();
    if (route === "coaches" || route === "staff") return renderStaff(route);
    if (route === "recruiting") return renderRecruiting();
    if (route === "game-scout") return renderScout();
    return renderDepartmentShell(route);
  }

  function sectionHeader(eyebrow, title, detail) {
    return `
      <header class="screen-header">
        <div>
          <span>${eyebrow}</span>
          <h1>${title}</h1>
          <p>${detail}</p>
        </div>
        <div class="screen-record">
          <strong>${world.currentDateLabel}</strong>
          <em>${world.currentWeekLabel} / ${world.currentPhase}</em>
        </div>
      </header>
    `;
  }

  function renderHome() {
    return `
      <section class="home-page">
        <div class="story-reel" aria-label="Program stories">
          ${world.stories.map((story, index) => `
            <a class="story-slide ${index === 0 ? "active" : ""}" id="story-${index + 1}" href="#/${story.targetRoute}" data-story="${story.category.toLowerCase()}">
              <span class="story-category">${story.category}</span>
              <div class="story-caption">
                <h2>${story.title}</h2>
                <strong>${story.kicker}</strong>
                <p>${story.body}</p>
              </div>
            </a>
          `).join("")}
          <div class="story-controls" aria-label="Story navigation">
            ${world.stories.map((story, index) => `
              <button class="${index === 0 ? "active" : ""}" type="button" data-story-jump="${index}" aria-label="Show ${story.title}"></button>
            `).join("")}
          </div>
        </div>
        <aside class="quick-actions">
          <span class="panel-kicker">Quick Actions</span>
          <a href="#/news"><strong>Handle Inbox</strong><em>${world.inbox.length} items</em></a>
          <a href="#/game-scout"><strong>Review Game Plan</strong><em>${world.schedule.find((g) => g.status === "next").opponent}</em></a>
          <a href="#/recruiting"><strong>Host Visits</strong><em>${world.metrics.commitments} commits</em></a>
          <a href="#/dashboard"><strong>Open Desk</strong><em>9 windows</em></a>
        </aside>
      </section>
    `;
  }

  function renderDashboard() {
    const qb1 = topPlayer("QB");
    const rb1 = topPlayer("RB");
    const wr1 = topPlayer("WR");
    const edge1 = topPlayer("EDGE");
    const nextGame = world.schedule.find((g) => g.status === "next");
    const limited = world.roster.filter((p) => p.healthStatus === "limited").slice(0, 3);
    return `
      <section class="dashboard-grid" data-testid="dashboard-widget-grid">
        <a class="panel dashboard-widget team-snapshot" href="#/roster" data-widget="team-snapshot">
          <div class="widget-top"><span class="panel-kicker">Team Snapshot</span></div>
          <div class="widget-body team-card-body">
            <div class="team-mark-block">
              <div class="big-v">V</div>
              <strong>#${world.school.rank} ${world.school.shortName}</strong>
              <span>${world.school.record} / ${world.school.conferenceRecord}</span>
            </div>
            <div class="dashboard-kpis two-up">
              ${miniKpi("OVR", world.metrics.overall)}
              ${miniKpi("OFF", world.metrics.offense)}
              ${miniKpi("DEF", world.metrics.defense)}
              ${miniKpi("ST", world.metrics.specialTeams)}
            </div>
            ${meter("Morale", world.metrics.morale)}
          </div>
          <span class="open-cue">Open Roster Room</span>
        </a>
        ${widget("standings", "Conf / NCAA Standing", standingsWidget(), "Open Standings")}
        ${widget("calendar", "Schedule", scheduleWidget(nextGame), "Open Calendar")}
        ${widget("records", "Award Tracker", awardTracker(qb1, rb1, edge1), "Open Records")}
        ${widget("training", "Training / Practice Grades", trainingWidget(qb1), "Open Training")}
        ${widget("standings", "Stats / NCAA Rank", statsWidget(), "Open Team Stats")}
        ${widget("recruiting", "Recruiting Class", recruitingCard(wr1), "Open Recruiting")}
        ${widget("game-scout", "Strategy", strategyCard(nextGame), "Open Game Scout")}
        ${widget("news", "Injuries", injuryCard(limited), "Open News Desk")}
      </section>
    `;
  }

  function renderRoster() {
    const rows = rosterRows("ALL");
    const selectedPlayer = rows[0];
    return `
      <section class="roster-workbench" data-roster-filter="ALL" data-roster-primary="${selectedPlayer.personId}">
        <div class="roster-mode-bar">
          <div>
            <span class="panel-kicker">Global Depth Chart</span>
            <strong data-roster-title>Whole Roster / Overall Board</strong>
          </div>
          <div class="mode-actions">
            <a href="#/depth">Formation View</a>
            <button type="button" data-roster-swap disabled>Swap Selected</button>
          </div>
        </div>
        <article class="roster-profile-large" data-roster-profile>
          ${renderLargePlayerProfile(selectedPlayer)}
        </article>
        <section class="roster-main-list">
          <div class="position-filter" data-position-filter>
            ${["ALL", "QB", "RB", "WR", "TE", "OT", "OG", "C", "EDGE", "DL", "LB", "CB", "S", "K", "P", "LS"].map((position) => `
              <button type="button" class="${position === "ALL" ? "active" : ""}" data-position-filter-value="${position}">${position}</button>
            `).join("")}
          </div>
          <div class="roster-table-wrap">
            <table class="roster-board-table">
              <thead><tr><th>Rank</th><th>Role</th><th>#</th><th>Name</th><th>Pos</th><th>Class</th><th>OVR</th><th>Pot</th><th>Ht/Wt</th><th>Morale</th><th>Fatigue</th><th>Health</th><th>Focus</th><th>Trait</th></tr></thead>
              <tbody data-roster-list>
                ${renderRosterRows(rows, selectedPlayer.personId)}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    `;
  }

  function renderDepth() {
    const side = "offense";
    const formation = depthFormations[side][0];
    const selectedPosition = "QB";
    const assignments = formationAssignments(formation);
    const selectedSpot = "0";
    const selectedPlayers = depthPlayers(selectedPosition, assignments, selectedSpot);
    const selectedPlayer = selectedPlayers[0];
    return `
      <section class="depth-workbench" data-depth-side="${side}" data-depth-formation="${formation.id}" data-depth-position="${selectedPosition}" data-depth-spot="${selectedSpot}">
        <div class="depth-mode-bar">
          <div>
            <span class="panel-kicker">Formation Depth Chart</span>
            <strong>Personnel Board / ${formation.label}</strong>
          </div>
          <div class="mode-actions">
            <a href="#/roster">Global Depth Chart</a>
          </div>
        </div>
        <div class="depth-top">
          <article class="formation-board-panel">
            <div class="formation-board-heading">
              <span class="panel-kicker">Whiteboard</span>
              <strong data-depth-board-title>${formation.label}</strong>
              <em data-depth-board-call>${formation.call}</em>
            </div>
            <div class="formation-board" data-depth-board>
              ${renderFormationSpots(formation, selectedPosition, selectedSpot, assignments)}
            </div>
          </article>
          <aside class="formation-picker">
            <div class="formation-tabs" role="tablist" aria-label="Formation groups">
              ${["offense", "defense", "st"].map((tab) => `<button type="button" class="${tab === side ? "active" : ""}" data-depth-tab="${tab}">${tab === "st" ? "ST" : titleCase(tab)}</button>`).join("")}
            </div>
            <div class="formation-list" data-depth-formation-list>
              ${renderFormationList(side, formation.id)}
            </div>
          </aside>
        </div>
        <div class="depth-bottom">
          <article class="depth-player-list panel">
            <div class="depth-list-header">
              <span class="panel-kicker" data-depth-list-label>${selectedPosition} Depth</span>
              <strong data-depth-list-count>${selectedPlayers.length} Players</strong>
            </div>
            <div class="depth-list-columns" aria-hidden="true">
              <span>Slot</span>
              <span>Player</span>
              <span>Role</span>
              <span>OVR</span>
              <span>Pot</span>
              <span>Morale</span>
              <span>Fatigue</span>
              <span>Health</span>
            </div>
            <div class="depth-list-rows" data-depth-list>
              ${renderDepthList(selectedPlayers, selectedPlayer.personId)}
            </div>
          </article>
          <aside class="depth-profile-widget profile-card" data-depth-profile>
            ${renderSmallPlayerProfile(selectedPlayer, "formation")}
          </aside>
        </div>
      </section>
    `;
  }

  function renderFormationSpots(formation, selectedPosition, selectedSpot, assignments = formationAssignments(formation)) {
    return formation.spots.map(([position, label, x, y], index) => {
      const assignment = assignments[String(index)];
      return `
      <button
        type="button"
        class="formation-token ${String(index) === String(selectedSpot) ? "active" : ""}"
        style="left:${x}%; top:${y}%"
        data-depth-position="${position}"
        data-depth-spot="${index}"
        data-depth-assigned-player="${assignment ? assignment.personId : ""}"
        aria-label="${label} ${position}"
      >
        <b>${label}</b>
        <span>${position}</span>
        ${assignment ? `<em>#${assignment.jerseyNumber} ${assignment.lastName}</em>` : ""}
      </button>
    `;
    }).join("");
  }

  function renderFormationList(side, activeFormationId) {
    return depthFormations[side].map((formation) => `
      <button type="button" class="formation-choice ${formation.id === activeFormationId ? "active" : ""}" data-depth-formation-choice="${formation.id}">
        <strong>${formation.label}</strong>
        <span>${formation.sublabel}</span>
        <em>${formation.call}</em>
      </button>
    `).join("");
  }

  function formationAssignments(formation) {
    const used = new Set();
    const counters = {};
    const assignments = {};
    formation.spots.forEach(([position], index) => {
      counters[position] = (counters[position] || 0) + 1;
      const available = world.roster
        .filter((player) => player.primaryPosition === position && !used.has(player.personId))
        .slice()
        .sort((a, b) => a.depthSlot - b.depthSlot || b.overall - a.overall);
      const player = available[0];
      if (player) {
        assignments[String(index)] = player;
        used.add(player.personId);
      }
    });
    return assignments;
  }

  function depthPlayers(position, assignments = {}, selectedSpot = "") {
    const assignedByPlayer = new Map(Object.entries(assignments).map(([spot, player]) => [player.personId, spot]));
    return world.roster
      .filter((player) => player.primaryPosition === position)
      .slice()
      .sort((a, b) => a.depthSlot - b.depthSlot || b.overall - a.overall)
      .map((player) => ({
        ...player,
        assignedSpot: assignedByPlayer.get(player.personId) || "",
        isStarter: assignedByPlayer.has(player.personId),
        isSelectedStarter: assignedByPlayer.get(player.personId) === String(selectedSpot),
      }));
  }

  function renderDepthList(players, selectedPersonId) {
    return players.map((player) => `
      <button type="button" class="depth-player-row ${player.personId === selectedPersonId ? "active" : ""}" data-depth-player="${player.personId}" data-depth-player-position="${player.primaryPosition}">
        <b>${player.depthSlot}</b>
        <span>
          <strong>${player.displayName}</strong>
          <em>#${player.jerseyNumber} / ${player.classYear} / ${feet(player.heightInches)} / ${player.weightPounds}</em>
        </span>
        <mark class="${player.isSelectedStarter ? "primary" : player.isStarter ? "locked" : ""}">${player.isSelectedStarter ? "Selected" : player.isStarter ? "Starter" : "Reserve"}</mark>
        <i>${player.overall}</i>
        <small>${player.potential}</small>
        <small>${player.morale}</small>
        <small>${player.fatigue}</small>
        <small>${player.healthStatus}</small>
      </button>
    `).join("");
  }

  function renderSmallPlayerProfile(player, context = "depth") {
    const ratings = keyRatings(player);
    return `
      <div class="profile-topline small-profile">
        <div class="player-number">${player.jerseyNumber}</div>
        <div>
          <span class="panel-kicker">${player.primaryPosition} / ${player.classYear} / ${context}</span>
          <h3>${player.displayName}</h3>
          <p>${player.hometownCity}, ${player.hometownState} / ${player.highSchool}</p>
        </div>
      </div>
      <div class="profile-score-strip">
        ${miniKpi("OVR", player.overall)}
        ${miniKpi("POT", player.potential)}
        ${miniKpi("Morale", player.morale)}
      </div>
      <div class="profile-ratings">
        ${ratings.map(([label, value]) => meter(label, value)).join("")}
      </div>
      <div class="badge-row">
        ${player.traits.map((trait) => statusPill(trait, trait.includes("Raw") || trait.includes("Late") ? "warn" : "good")).join("")}
      </div>
    `;
  }

  function renderLargePlayerProfile(player, comparePlayer = null, contextPosition = player.primaryPosition) {
    if (comparePlayer && comparePlayer.personId !== player.personId) {
      return renderComparisonProfile(player, comparePlayer, contextPosition);
    }
    const ratings = keyRatingsForPosition(player, contextPosition);
    return `
      <div class="large-profile-layout">
        <div class="large-profile-identity">
          <div class="player-number">${player.jerseyNumber}</div>
          <div>
            <span class="panel-kicker">${player.primaryPosition} / ${player.classYear} / ${feet(player.heightInches)} / ${player.weightPounds}</span>
            <h2>${player.displayName}</h2>
            <p>${player.hometownCity}, ${player.hometownState} / ${player.highSchool}</p>
          </div>
        </div>
        <div class="profile-score-strip large">
          ${miniKpi("OVR", player.overall)}
          ${miniKpi("POT", player.potential)}
          ${miniKpi("Morale", player.morale)}
          ${miniKpi("Fatigue", player.fatigue)}
        </div>
        <div class="large-profile-ratings">
          ${ratings.map(([label, value]) => meter(label, value)).join("")}
        </div>
        <div class="large-profile-notes">
          ${statusPill(player.traits[0] || "Trait", "good")}
          ${statusPill(player.traits[1] || player.developmentFocus, player.traits[1] && player.traits[1].includes("Raw") ? "warn" : "neutral")}
          <span>${player.developmentFocus} focus / ${player.scholarshipStatus}</span>
        </div>
      </div>
    `;
  }

  function renderComparisonProfile(primary, compare, contextPosition) {
    const primaryRatings = Object.fromEntries(keyRatingsForPosition(primary, contextPosition));
    const compareRatings = Object.fromEntries(keyRatingsForPosition(compare, contextPosition));
    const labels = Object.keys(primaryRatings);
    return `
      <div class="comparison-profile">
        <div class="compare-heading">
          <span class="panel-kicker">Swap Comparison / ${contextPosition}</span>
          <strong>${primary.displayName}</strong>
          <em>vs</em>
          <strong>${compare.displayName}</strong>
        </div>
        <div class="compare-score-grid">
          ${compareMetric("OVR", primary.overall, compare.overall)}
          ${compareMetric("POT", primary.potential, compare.potential)}
          ${compareMetric("Morale", primary.morale, compare.morale)}
          ${compareMetric("Fatigue", primary.fatigue, compare.fatigue, true)}
        </div>
        <div class="compare-ratings">
          ${labels.map((label) => compareMetric(label, primaryRatings[label], compareRatings[label])).join("")}
        </div>
      </div>
    `;
  }

  function compareMetric(label, a, b, lowerIsBetter = false) {
    const diff = lowerIsBetter ? a - b : b - a;
    const tone = diff > 0 ? "up" : diff < 0 ? "down" : "even";
    return `<div class="compare-metric ${tone}"><span>${label}</span><b>${a}</b><em>${diff > 0 ? "+" : ""}${diff}</em><strong>${b}</strong></div>`;
  }

  function rosterRows(position = "ALL") {
    return world.roster
      .filter((player) => position === "ALL" || player.primaryPosition === position)
      .slice()
      .sort((a, b) => b.overall - a.overall || a.primaryPosition.localeCompare(b.primaryPosition) || a.depthSlot - b.depthSlot);
  }

  function renderRosterRows(players, selectedPersonId, comparePersonId = "") {
    const starterCounts = {};
    return players.map((player, index) => {
      starterCounts[player.primaryPosition] = starterCounts[player.primaryPosition] || startingSlotsForPosition(player.primaryPosition);
      const role = player.depthSlot <= starterCounts[player.primaryPosition] ? "Starter" : player.depthSlot <= starterCounts[player.primaryPosition] + 2 ? "Rotation" : "Reserve";
      return `
        <tr class="${player.personId === selectedPersonId ? "selected" : ""} ${player.personId === comparePersonId ? "compare" : ""}" data-roster-player="${player.personId}" data-roster-player-position="${player.primaryPosition}">
          <td>${index + 1}</td>
          <td><span class="role-pill ${role.toLowerCase()}">${role}</span></td>
          <td>${player.jerseyNumber}</td>
          <td><strong>${player.displayName}</strong><small>${player.hometownCity}, ${player.hometownState}</small></td>
          <td>${player.primaryPosition}</td>
          <td>${player.classYear}</td>
          <td class="num">${player.overall}</td>
          <td class="num">${player.potential}</td>
          <td>${feet(player.heightInches)} / ${player.weightPounds}</td>
          <td>${player.morale}</td>
          <td>${player.fatigue}</td>
          <td>${player.healthStatus}</td>
          <td>${player.developmentFocus}</td>
          <td>${player.traits[0] || ""}</td>
        </tr>
      `;
    }).join("");
  }

  function startingSlotsForPosition(position) {
    const base = { QB: 1, RB: 1, WR: 3, TE: 1, OT: 2, OG: 2, C: 1, EDGE: 2, DL: 2, LB: 2, CB: 3, S: 2, K: 1, P: 1, LS: 1 };
    return base[position] || 1;
  }

  function keyRatings(player) {
    return keyRatingsForPosition(player, player.primaryPosition);
  }

  function keyRatingsForPosition(player, position) {
    const attrs = player.attributes;
    const byPosition = {
      QB: [["Arm", attrs.throwPower], ["Accuracy", Math.round((attrs.shortAccuracy + attrs.intermediateAccuracy + attrs.deepAccuracy) / 3)], ["Processing", attrs.processing]],
      RB: [["Burst", attrs.acceleration], ["Vision", attrs.vision], ["Balance", attrs.contactBalance]],
      WR: [["Speed", attrs.speed], ["Routes", attrs.routeRunning], ["Hands", attrs.hands]],
      TE: [["Hands", attrs.hands], ["Blocking", attrs.runBlock], ["Routes", attrs.routeRunning]],
      OT: [["Pass Set", attrs.passBlock], ["Anchor", attrs.anchor], ["Run Block", attrs.runBlock]],
      OG: [["Power", attrs.strength], ["Run Block", attrs.runBlock], ["Pulling", attrs.pulling]],
      C: [["IQ", attrs.footballIQ], ["Anchor", attrs.anchor], ["Discipline", attrs.discipline]],
      EDGE: [["Get-Off", attrs.getOff], ["Bend", attrs.bend], ["Power", attrs.powerRush]],
      DL: [["Power", attrs.strength], ["Block Shed", attrs.blockShedding], ["Motor", attrs.stamina]],
      LB: [["Tackle", attrs.tackling], ["Pursuit", attrs.pursuit], ["Coverage", attrs.zoneCoverage]],
      CB: [["Man", attrs.manCoverage], ["Zone", attrs.zoneCoverage], ["Speed", attrs.speed]],
      S: [["Zone", attrs.zoneCoverage], ["Tackle", attrs.tackling], ["IQ", attrs.footballIQ]],
      K: [["Power", attrs.kickPower], ["Accuracy", attrs.kickAccuracy], ["Poise", attrs.poise]],
      P: [["Power", attrs.kickPower], ["Placement", attrs.kickAccuracy], ["Poise", attrs.poise]],
      LS: [["Discipline", attrs.discipline], ["Strength", attrs.strength], ["IQ", attrs.footballIQ]],
    };
    return byPosition[position] || [["Speed", attrs.speed], ["Strength", attrs.strength], ["IQ", attrs.footballIQ]];
  }

  function renderNews() {
    return `
      ${sectionHeader("News", "Inbox & News Desk", "Inbox items are event-shaped records and each row links back to its category screen.")}
      <section class="story-layout">
        <article class="headline-card">
          <span>Dramatic Narrative</span>
          <h2>The Captain's Challenge</h2>
          <p>Senior QB Jack Turner has requested a meeting. He believes the offense is too conservative and says the team is not reaching its potential.</p>
          <div class="choice-stack">
            <a href="#/training"><strong>Back your QB</strong><span>Empower the offense and raise morale.</span></a>
            <a href="#/game-scout"><strong>Stay the course</strong><span>Remind the room that the plan wins games.</span></a>
            <a href="#/coaches"><strong>Meet in the middle</strong><span>Adjust the script but preserve balance.</span></a>
          </div>
        </article>
        <aside class="profile-card">
          <div class="player-number">10</div>
          <h3>Jack Turner</h3>
          <p>SR (RS) / Quarterback / Nashville, TN</p>
          <dl><dt>Player Morale</dt><dd>Content</dd><dt>Relationship</dt><dd>Solid</dd><dt>Season</dt><dd>1,296 YDS / 14 TD</dd></dl>
        </aside>
      </section>
    `;
  }

  function renderStandings() {
    return `${sectionHeader("Board", "SEC Standings", "Conference records are stored as program snapshots for the current world.")}<section class="panel wide">${miniTable("SEC East", world.standings.map(s => [s.program, s.conf, s.overall]))}</section>`;
  }

  function renderSchedule() {
    return `${sectionHeader("Calendar", "Schedule", "Games are durable schedule records with result/status fields.")}<section class="panel wide">${scheduleList("Upcoming", world.schedule)}</section>`;
  }

  function renderStaff(route) {
    return `
      ${sectionHeader(route === "coaches" ? "Coaches" : "Operations", route === "coaches" ? "Coaching Staff" : "Football Operations", "Staff are people with coach profiles, contracts, roles, and assignments.")}
      <section class="staff-grid">
        ${world.staff.map((coach) => `<article class="staff-card"><h3>${coach.name}</h3><p>${coach.role}</p>${metric("REC", coach.recruiting)}${metric("DEV", coach.development)}${metric("CALL", coach.playCalling)}</article>`).join("")}
      </section>
    `;
  }

  function renderRecruiting() {
    return `
      ${sectionHeader("Recruiting", "Recruiting Board", "Prospects are modeled as people with recruiting relationships, visits, and interest history.")}
      <section class="recruit-grid">
        ${["Evan Miles", "Korey Banks", "Damon Price", "Tavon Reeves", "Luke Callahan"].map((name, index) => `
          <article class="recruit-card">
            <span>${index < 2 ? "Top Target" : "Board"}</span>
            <h3>${name}</h3>
            <p>${["QB", "EDGE", "WR", "OT", "CB"][index]} / ${["TN", "GA", "FL", "AL", "TX"][index]} / ${4 - (index > 2 ? 1 : 0)} Star</p>
            <div class="bar"><i style="width:${82 - index * 9}%"></i></div>
            <small>Interest ${82 - index * 9}% / Relationship ${66 - index * 5}%</small>
          </article>
        `).join("")}
      </section>
    `;
  }

  function renderScout() {
    return `
      ${sectionHeader("Game Scout", "Notre Dame Scout Packet", "Opponent reports, matchups, and game-plan locks for the next event.")}
      <section class="scout-grid">
        <article class="panel wide"><h2>Key Matchup</h2><p>Vanderbilt nickel package versus Notre Dame 12 personnel play-action. The stress point is LB eye discipline against split-zone bluff.</p></article>
        <article class="panel">${gradePanel("Opponent Tendencies", [["Early Down Run", "58%"], ["Play Action", "31%"], ["Pressure Rate", "26%"]])}</article>
        <article class="panel">${strategyCard()}</article>
      </section>
    `;
  }

  function renderDepartmentShell(route) {
    const screens = {
      facilities: {
        eyebrow: "Facilities",
        detail: "Capital projects, stadium pressure, football operations, and recruiting-facing assets.",
        panels: [
          ["Stadium Expansion", "Capacity", "40,350", "Concept board"],
          ["Football Center", "Facility Grade", "B+", "Upgrade queue"],
          ["Recovery Wing", "Player Health", "91", "Staff request"],
        ],
      },
      finance: {
        eyebrow: "Finance",
        detail: "Budget rooms separate athletic budget, recruiting spend, NIL commitments, and booster pressure.",
        panels: [
          ["Football Budget", "Available", "$18.4M", "Board approved"],
          ["Recruiting Travel", "Committed", "$1.8M", "In season"],
          ["Collective Pulse", "NIL Health", "B+", "Donor stable"],
        ],
      },
      records: {
        eyebrow: "Records",
        detail: "Awards, milestones, streaks, and long-term school history are durable records.",
        panels: [
          ["Award Watch", "Tracked Players", "7", "Weekly update"],
          ["Season Streak", "Home Wins", "6", "Active"],
          ["NFL Pipeline", "Draft Grades", "4", "Projected"],
        ],
      },
      history: {
        eyebrow: "History",
        detail: "Program memory tracks seasons, coaches, rivalries, championships, and player careers.",
        panels: [
          ["Program Wins", "All-Time", "657", "Imported baseline"],
          ["Rivalry Ledger", "Active Series", "9", "Annual games"],
          ["Coach Timeline", "Current Era", "Year 1", "Career start"],
        ],
      },
      settings: {
        eyebrow: "Settings",
        detail: "Rulesets, save controls, data imports, and accessibility settings live outside the football desk.",
        panels: [
          ["Ruleset", "Preset", "Modern FBS", "Locked for career"],
          ["Autosave", "State", "On", "Every week"],
          ["UI Scale", "Current", "100%", "Profile setting"],
        ],
      },
    };
    const screen = screens[route] || {
      eyebrow: routeTitles[route],
      detail: "This destination is wired into the shell and ready for its table-backed screen.",
      panels: [
        [routeTitles[route], "Status", "Ready", "Screen route"],
        ["Data Contract", "Source", "Pending", "Needs table"],
        ["Review", "Approval", "Open", "Design pass"],
      ],
    };
    return `
      ${sectionHeader(screen.eyebrow, routeTitles[route], screen.detail)}
      <section class="department-page">
        ${screen.panels.map(([title, label, value, note]) => `
          <article class="panel">
            <span class="panel-kicker">${label}</span>
            <h3>${title}</h3>
            <div class="large-value">${value}</div>
            <p>${note}</p>
          </article>
        `).join("")}
      </section>
    `;
  }

  function widget(route, title, body, actionLabel) {
    return `
      <a class="panel dashboard-widget" href="#/${route}" data-widget="${route}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}">
        <div class="widget-top"><span class="panel-kicker">${title}</span></div>
        ${body}
        <span class="open-cue">${actionLabel}</span>
      </a>
    `;
  }

  function metric(label, value) {
    return `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`;
  }

  function topPlayer(position) {
    return world.roster
      .filter((player) => player.primaryPosition === position)
      .slice()
      .sort((a, b) => b.overall - a.overall || a.depthSlot - b.depthSlot)[0];
  }

  function roomAverage(positions) {
    const players = world.roster.filter((player) => positions.includes(player.primaryPosition) && player.depthSlot <= 3);
    return Math.round(players.reduce((sum, player) => sum + player.overall, 0) / Math.max(1, players.length));
  }

  function miniKpi(label, value) {
    return `<div class="mini-kpi"><span>${label}</span><strong>${value}</strong></div>`;
  }

  function meter(label, value) {
    return `<div class="meter-line"><span>${label}</span><b>${value}</b><i><em style="width:${Math.max(0, Math.min(100, value))}%"></em></i></div>`;
  }

  function statusPill(label, tone = "neutral") {
    return `<span class="status-pill ${tone}">${label}</span>`;
  }

  function playerLine(player, detail) {
    return `<div class="player-line"><b>${player.jerseyNumber}</b><span><strong>${player.displayName}</strong><em>${player.primaryPosition} / ${detail}</em></span><i>${player.overall}</i></div>`;
  }

  function standingsWidget() {
    return `
      <div class="widget-body">
        <div class="standings-pack">
          ${world.standings.map((row, index) => `
            <div class="${row.program === world.school.shortName ? "user-team" : ""}">
              <b>${index + 1}</b><strong>${row.program}</strong><span>${row.conf}</span><em>${row.overall}</em>
            </div>
          `).join("")}
        </div>
        <div class="widget-note"><strong>Race:</strong> 1.0 game behind Alabama for SEC East control.</div>
      </div>
    `;
  }

  function scheduleWidget(nextGame) {
    return `
      <div class="widget-body">
        <div class="next-game-card">
          <span>Week ${nextGame.week} / Home</span>
          <strong>${nextGame.opponent}</strong>
          <em>${nextGame.result} / Rivalry Game</em>
        </div>
        <div class="compact-list">
          ${world.schedule.slice(2, 5).map((game) => `<div><span>${game.site}</span><strong>${game.opponent}</strong><em>${game.result}</em></div>`).join("")}
        </div>
      </div>
    `;
  }

  function awardTracker(qb1, rb1, edge1) {
    return `
      <div class="widget-body">
        ${playerLine(qb1, "National QB watch")}
        ${playerLine(edge1, "SEC defender watch")}
        ${playerLine(rb1, "Breakout list")}
        <div class="badge-row">${statusPill("2 Rising", "good")}${statusPill("1 Needs Win", "warn")}</div>
      </div>
    `;
  }

  function trainingWidget(qb1) {
    const rows = [
      ["QB Room", roomAverage(["QB"]), "Install"],
      ["OL Run Fits", roomAverage(["OT", "OG", "C"]), "Heavy"],
      ["Nickel Group", roomAverage(["CB", "S", "LB"]), "Limited"],
    ];
    return `
      <div class="widget-body">
        <div class="training-focus"><strong>${qb1.displayName}</strong><span>${qb1.developmentFocus} / ${qb1.traits[0]}</span></div>
        ${rows.map(([label, value, tag]) => meter(`${label} ${tag}`, value)).join("")}
      </div>
    `;
  }

  function statsWidget() {
    return `
      <div class="widget-body stats-split">
        <div>${miniKpi("YPG", "498.7")}${miniKpi("Rank", "4th")}</div>
        <div>${miniKpi("PPG Allowed", "18.7")}${miniKpi("Rank", "12th")}</div>
        <div class="compact-list full">
          <div><span>Turnovers</span><strong>+11</strong><em>1st</em></div>
          <div><span>3rd Down</span><strong>52%</strong><em>2nd</em></div>
        </div>
      </div>
    `;
  }

  function recruitingCard(anchorPlayer) {
    return `
      <div class="widget-body recruiting-widget">
        <div class="recruit-rank"><strong>#${world.metrics.recruitingRank}</strong><span>National Class</span></div>
        <div class="dashboard-kpis two-up">
          ${miniKpi("Commits", world.metrics.commitments)}
          ${miniKpi("Open Spots", 9)}
        </div>
        <div class="compact-list">
          <div><span>Top Need</span><strong>${anchorPlayer.primaryPosition}</strong><em>High</em></div>
          <div><span>Visit Weekend</span><strong>3 Targets</strong><em>Sat</em></div>
        </div>
      </div>
    `;
  }

  function strategyCard(nextGame) {
    const game = nextGame || world.schedule.find((g) => g.status === "next");
    return `
      <div class="widget-body">
        <div class="next-game-card compact">
          <span>Scout Lock</span>
          <strong>${game.opponent}</strong>
          <em>12 personnel / play-action pressure</em>
        </div>
        <div class="objective-list">
          <div>${statusPill("On Track", "good")}<span>SEC title path alive</span></div>
          <div>${statusPill("At Risk", "warn")}<span>Nickel depth stress</span></div>
          <div>${statusPill("Set", "neutral")}<span>Recruiting weekend script</span></div>
        </div>
      </div>
    `;
  }

  function injuryCard(limited) {
    return `
      <div class="widget-body">
        <div class="dashboard-kpis two-up">
          ${miniKpi("Limited", limited.length)}
          ${miniKpi("Available", world.roster.filter((p) => p.healthStatus === "available").length)}
        </div>
        <div class="compact-list">
          ${limited.map((player) => `<div><span>${player.primaryPosition}</span><strong>${player.displayName}</strong><em>${player.fatigue}%</em></div>`).join("")}
        </div>
        <div class="widget-note"><strong>Practice:</strong> lower-contact defensive script recommended.</div>
      </div>
    `;
  }

  function miniTable(title, rows) {
    return `${title ? `<h3>${title}</h3>` : ""}<div class="mini-table">${rows.map((r) => `<div>${r.map((c, i) => `<span class="${i === 0 ? "primary" : ""}">${c}</span>`).join("")}</div>`).join("")}</div>`;
  }

  function scheduleList(title, games) {
    return `${title ? `<h3>${title}</h3>` : ""}<div class="schedule-list">${games.map((g) => `<div><span>${g.week}</span><strong>${g.site} ${g.opponent}</strong><em>${g.result}</em></div>`).join("")}</div>`;
  }

  function gradePanel(title, rows) {
    return `${title ? `<h3>${title}</h3>` : ""}<div class="grade-list">${rows.map(([a, b]) => `<div><span>${a}</span><strong>${b}</strong></div>`).join("")}</div>`;
  }

  function feet(inches) {
    return `${Math.floor(inches / 12)}'${inches % 12}"`;
  }

  function titleCase(value) {
    return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  }

  function wire() {
    const advance = app.querySelector("[data-advance]");
    if (advance) {
      advance.addEventListener("click", () => {
        advance.textContent = "Continue Locked";
        advance.disabled = true;
      });
    }

    const reel = app.querySelector(".story-reel");
    const storyButtons = Array.from(app.querySelectorAll("[data-story-jump]"));
    if (reel && storyButtons.length) {
      storyButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const index = Number(button.dataset.storyJump);
          reel.scrollTo({ left: reel.clientWidth * index, behavior: "smooth" });
          setActiveStory(index);
        });
      });
      reel.addEventListener("scroll", () => {
        const index = Math.round(reel.scrollLeft / Math.max(1, reel.clientWidth));
        setActiveStory(index);
      }, { passive: true });
    }

    const depthScreen = app.querySelector("[data-depth-side]");
    if (depthScreen) {
      const board = depthScreen.querySelector("[data-depth-board]");
      const formationList = depthScreen.querySelector("[data-depth-formation-list]");
      const list = depthScreen.querySelector("[data-depth-list]");
      const profile = depthScreen.querySelector("[data-depth-profile]");
      const boardTitle = depthScreen.querySelector("[data-depth-board-title]");
      const boardCall = depthScreen.querySelector("[data-depth-board-call]");
      const listLabel = depthScreen.querySelector("[data-depth-list-label]");
      const listCount = depthScreen.querySelector("[data-depth-list-count]");

      depthScreen.querySelectorAll("[data-depth-tab]").forEach((button) => {
        button.addEventListener("click", () => {
          const side = button.dataset.depthTab;
          const formation = depthFormations[side][0];
          depthScreen.dataset.depthSide = side;
          depthScreen.dataset.depthFormation = formation.id;
          depthScreen.dataset.depthSpot = "0";
          depthScreen.querySelectorAll("[data-depth-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
          formationList.innerHTML = renderFormationList(side, formation.id);
          renderDepthBoard(formation, formation.spots[0][0], "0");
          updateDepthPosition(formation.spots[0][0], "0");
        });
      });

      formationList.addEventListener("click", (event) => {
        const choice = event.target.closest("[data-depth-formation-choice]");
        if (!choice) return;
        const side = depthScreen.dataset.depthSide;
        const formation = depthFormations[side].find((item) => item.id === choice.dataset.depthFormationChoice) || depthFormations[side][0];
        depthScreen.dataset.depthFormation = formation.id;
        depthScreen.dataset.depthSpot = "0";
        formationList.innerHTML = renderFormationList(side, formation.id);
        renderDepthBoard(formation, formation.spots[0][0], "0");
        updateDepthPosition(formation.spots[0][0], "0");
      });

      board.addEventListener("click", (event) => {
        const token = event.target.closest("[data-depth-position]");
        if (!token) return;
        updateDepthPosition(token.dataset.depthPosition, token.dataset.depthSpot);
      });

      list.addEventListener("click", (event) => {
        const row = event.target.closest("[data-depth-player]");
        if (!row) return;
        const player = world.roster.find((item) => item.personId === row.dataset.depthPlayer);
        if (!player) return;
        list.querySelectorAll("[data-depth-player]").forEach((item) => item.classList.toggle("active", item === row));
        profile.innerHTML = renderSmallPlayerProfile(player, "formation");
      });

      function currentFormation() {
        const side = depthScreen.dataset.depthSide;
        return depthFormations[side].find((formation) => formation.id === depthScreen.dataset.depthFormation) || depthFormations[side][0];
      }

      function renderDepthBoard(formation, selectedPosition, selectedSpot) {
        board.innerHTML = renderFormationSpots(formation, selectedPosition, selectedSpot, formationAssignments(formation));
        boardTitle.textContent = formation.label;
        boardCall.textContent = formation.call;
      }

      function updateDepthPosition(position, spot = depthScreen.dataset.depthSpot || "0") {
        const formation = currentFormation();
        const assignments = formationAssignments(formation);
        const players = depthPlayers(position, assignments, spot);
        const selectedPlayer = players[0];
        depthScreen.dataset.depthPosition = position;
        depthScreen.dataset.depthSpot = String(spot);
        board.querySelectorAll("[data-depth-position]").forEach((token) => token.classList.toggle("active", token.dataset.depthSpot === String(spot)));
        listLabel.textContent = `${position} Depth`;
        listCount.textContent = `${players.length} Players`;
        list.innerHTML = renderDepthList(players, selectedPlayer.personId);
        profile.innerHTML = renderSmallPlayerProfile(selectedPlayer, "formation");
        boardTitle.textContent = formation.label;
        boardCall.textContent = formation.call;
      }
    }

    const rosterWorkbench = app.querySelector("[data-roster-filter]");
    if (rosterWorkbench) {
      const list = rosterWorkbench.querySelector("[data-roster-list]");
      const profile = rosterWorkbench.querySelector("[data-roster-profile]");
      const title = rosterWorkbench.querySelector("[data-roster-title]");
      const swapButton = rosterWorkbench.querySelector("[data-roster-swap]");
      let primaryId = rosterWorkbench.dataset.rosterPrimary;
      let compareId = "";
      let filter = rosterWorkbench.dataset.rosterFilter || "ALL";

      rosterWorkbench.querySelector("[data-position-filter]").addEventListener("click", (event) => {
        const button = event.target.closest("[data-position-filter-value]");
        if (!button) return;
        filter = button.dataset.positionFilterValue;
        rosterWorkbench.dataset.rosterFilter = filter;
        rosterWorkbench.querySelectorAll("[data-position-filter-value]").forEach((item) => item.classList.toggle("active", item === button));
        const rows = rosterRows(filter);
        primaryId = rows[0].personId;
        compareId = "";
        title.textContent = filter === "ALL" ? "Whole Roster / Overall Board" : `${filter} Room / Overall Board`;
        list.innerHTML = renderRosterRows(rows, primaryId, compareId);
        profile.innerHTML = renderLargePlayerProfile(rows[0], null, filter === "ALL" ? rows[0].primaryPosition : filter);
        swapButton.disabled = true;
      });

      list.addEventListener("click", (event) => {
        const row = event.target.closest("[data-roster-player]");
        if (!row) return;
        if (!primaryId || primaryId === row.dataset.rosterPlayer) {
          primaryId = row.dataset.rosterPlayer;
          compareId = "";
        } else {
          compareId = row.dataset.rosterPlayer;
        }
        syncRosterSelection();
      });

      list.addEventListener("mouseover", (event) => {
        const row = event.target.closest("[data-roster-player]");
        if (!row || !primaryId || row.dataset.rosterPlayer === primaryId) return;
        compareId = row.dataset.rosterPlayer;
        syncRosterSelection();
      });

      swapButton.addEventListener("click", () => {
        if (!primaryId || !compareId) return;
        const primaryRow = list.querySelector(`[data-roster-player="${primaryId}"]`);
        const compareRow = list.querySelector(`[data-roster-player="${compareId}"]`);
        if (!primaryRow || !compareRow) return;
        const marker = document.createElement("tr");
        list.insertBefore(marker, primaryRow);
        list.insertBefore(primaryRow, compareRow);
        list.insertBefore(compareRow, marker);
        marker.remove();
        primaryRow.classList.add("swap-flash");
        compareRow.classList.add("swap-flash");
      });

      function syncRosterSelection() {
        const primary = world.roster.find((player) => player.personId === primaryId);
        const compare = world.roster.find((player) => player.personId === compareId);
        list.querySelectorAll("[data-roster-player]").forEach((row) => {
          row.classList.toggle("selected", row.dataset.rosterPlayer === primaryId);
          row.classList.toggle("compare", row.dataset.rosterPlayer === compareId);
        });
        profile.innerHTML = renderLargePlayerProfile(primary, compare, filter === "ALL" ? primary.primaryPosition : filter);
        swapButton.disabled = !primary || !compare || primary.primaryPosition !== compare.primaryPosition;
      }
    }

    function setActiveStory(index) {
      storyButtons.forEach((button, buttonIndex) => {
        button.classList.toggle("active", buttonIndex === index);
      });
      app.querySelectorAll(".story-slide").forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === index);
      });
    }
  }

  function sprite() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" class="svg-sprite">
        <symbol id="cfl-home" viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h5v-5h3v5h5v-9.5"/></symbol>
        <symbol id="cfl-inbox" viewBox="0 0 24 24"><path d="M4 5h16v14H4z"/><path d="M4 13h4l2 3h4l2-3h4"/></symbol>
        <symbol id="cfl-calendar" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></symbol>
        <symbol id="cfl-roster" viewBox="0 0 24 24"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M3 21v-2a5 5 0 0 1 10 0v2"/><path d="M17 11a3 3 0 1 0 0-6"/><path d="M16 21v-2a5 5 0 0 0-2-4"/></symbol>
        <symbol id="cfl-depth-chart" viewBox="0 0 24 24"><path d="M12 4v4M7 12h10M7 12v4M17 12v4"/><rect x="9" y="2" width="6" height="4" rx="1"/><rect x="4" y="16" width="6" height="4" rx="1"/><rect x="14" y="16" width="6" height="4" rx="1"/></symbol>
        <symbol id="cfl-practice" viewBox="0 0 24 24"><path d="M4 7h16v10H4z"/><path d="M9 7v10M15 7v10"/><path d="M12 10v4"/></symbol>
        <symbol id="cfl-scouting" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="m16 16 5 5"/><path d="M8 11h6M11 8v6"/></symbol>
        <symbol id="cfl-recruiting" viewBox="0 0 24 24"><path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/></symbol>
        <symbol id="cfl-facilities" viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M5 21V8l7-4 7 4v13"/><path d="M9 21v-6h6v6"/><path d="M8 11h2M14 11h2"/></symbol>
        <symbol id="cfl-staff" viewBox="0 0 24 24"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M3 21v-2a5 5 0 0 1 10 0v2"/><path d="M17 13a2.5 2.5 0 1 0 0-5"/><path d="M16 21v-1.5a4 4 0 0 0-2-3.5"/></symbol>
        <symbol id="cfl-settings" viewBox="0 0 24 24"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M4 12h2M18 12h2M12 4v2M12 18v2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4"/></symbol>
        <symbol id="cfl-conference" viewBox="0 0 24 24"><path d="M4 7h16v11H4z"/><path d="M7 10h10M7 14h10"/><path d="M10 4h4v3"/></symbol>
        <symbol id="cfl-dynasty" viewBox="0 0 24 24"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M7 7H4a3 3 0 0 0 3 3M17 7h3a3 3 0 0 1-3 3"/></symbol>
        <symbol id="cfl-analytics" viewBox="0 0 24 24"><path d="M5 19V9M12 19V5M19 19v-7"/><path d="M3 19h18"/></symbol>
        <symbol id="cfl-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></symbol>
      </svg>
    `;
  }

  window.addEventListener("hashchange", render);
  render();
})();
