(function initM0Foundation(global) {
  "use strict";

  const SAVE_KEY = "cgm.m0Career.v1";
  const ROUTES = [
    { id: "desk", label: "Dashboard", icon: "inbox" },
    { id: "roster", label: "Roster", icon: "roster" },
  ];

  const icons = {
    inbox: '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M4 14h4l2 3h4l2-3h4"/></svg>',
    roster: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/><path d="M20 8v6"/><path d="M23 11h-6"/></svg>',
    recruiting: '<svg viewBox="0 0 24 24"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6"/></svg>',
    schedule: '<svg viewBox="0 0 24 24"><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>',
    analytics: '<svg viewBox="0 0 24 24"><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 15 4-4 3 3 5-7"/></svg>',
  };

  const state = {
    route: { id: "desk", params: {} },
    world: null,
    selectedPersonId: null,
    dirty: false,
  };

  const el = {};

  document.addEventListener("DOMContentLoaded", boot);

  function boot() {
    cacheElements();
    renderStartScreen();
    cacheElements();
    wireEvents();
    renderNav();
    const save = loadSave();
    if (save) {
      state.world = save.world;
      state.route = save.route || state.route;
      state.selectedPersonId = save.selectedPersonId || null;
    } else {
      state.world = null;
    }
    render();
    showStart(false);
    global.CGM_M0 = {
      state,
      createWorld,
      saveGame,
      loadSave,
      resetCareer,
      navigate,
      openPersonFromDom: openPerson,
      selectors,
    };
  }

  function cacheElements() {
    [
      "bootstrapScreen", "content", "mainNav", "programNameLabel", "crestLabel",
      "careerDate", "weekLabel", "phaseLabel", "recordLabel", "coachLabel",
      "urgentCount", "saveStateLabel", "nextKickoffOpponent", "nextKickoffWhen",
      "continueButton", "saveButton", "careerButton", "startCareerButton",
      "coachNameInput", "programSelect", "bootstrapStatus", "globalSearchInput",
    ].forEach((id) => { el[id] = document.getElementById(id); });
  }

  function wireEvents() {
    on(el.bootstrapScreen, "click", handleStartClick);
    on(el.careerButton, "click", () => showStart(true));
    on(el.saveButton, "click", () => {
      saveGame();
      render();
    });
    on(el.continueButton, "click", () => {
      if (!state.world) return showStart(true);
      continueWeek();
    });
    on(el.content, "click", handleContentClick);
    on(global, "popstate", () => {
      const route = parseHash();
      state.route = route;
      if (route.id === "person") state.selectedPersonId = route.params.personId;
      render();
    });
    on(global, "hashchange", () => {
      const route = parseHash();
      state.route = route;
      if (route.id === "person") state.selectedPersonId = route.params.personId;
      render();
    });
  }

  function on(target, event, handler) {
    if (target && target.addEventListener) target.addEventListener(event, handler);
  }

  function populateProgramSelect() {
    if (!el.programSelect) return;
    const programs = getSourcePrograms();
    el.programSelect.innerHTML = programs.slice(0, 8).map((program) => (
      `<option value="${escapeAttr(program.id)}">${escapeHtml(program.name || program.shortName || program.id)}</option>`
    )).join("");
  }

  function renderStartScreen() {
    if (!el.bootstrapScreen) return;
    const save = loadSave();
    const saveProgram = save && save.world && selectors.currentProgram(save.world);
    const continueDetail = saveProgram ? `${saveProgram.name} / ${save.world.career.dateLabel}` : "No career saved";
    el.bootstrapScreen.innerHTML = `
      <section class="m0-start-screen" aria-labelledby="m0StartTitle">
        <div class="m0-start-brand">
          <p class="eyebrow">College Football Management</p>
          <h2 id="m0StartTitle">Campus Gridiron Manager</h2>
          <p>Take over a program, manage the week, and build the dynasty from the athletic department desk.</p>
        </div>

        <div class="m0-start-menu" aria-label="Main menu">
          <button class="m0-menu-button primary" type="button" data-start-new>
            <strong>New Career</strong>
            <span>Choose a coach and program</span>
          </button>
          <button class="m0-menu-button" type="button" data-continue-career ${save ? "" : "disabled"}>
            <strong>Continue Career</strong>
            <span>${escapeHtml(continueDetail)}</span>
          </button>
        </div>

        <section class="m0-start-setup" id="m0StartSetup" hidden>
          <div>
            <h3>New Career</h3>
            <p>Only the choices needed to enter the game are shown here.</p>
          </div>
          <div class="m0-start-fields">
            <label>
              <span>Coach Name</span>
              <input id="coachNameInput" type="text" value="Alex Carter" maxlength="32" autocomplete="off" />
            </label>
            <label>
              <span>Program</span>
              <select id="programSelect"></select>
            </label>
          </div>
          <div class="m0-start-actions">
            <button class="primary-action" id="startCareerButton" type="button" data-confirm-new-career>Start Career</button>
            <button class="ghost-action" type="button" data-cancel-new-career>Cancel</button>
          </div>
        </section>

        <p class="m0-start-status" id="bootstrapStatus" aria-live="polite"></p>
      </section>
    `;
    cacheElements();
    populateProgramSelect();
    setBootstrapStatus(save ? "Career ready to continue." : "Start a new career.");
  }

  function handleStartClick(event) {
    const target = event.target.closest("button");
    if (!target || target.disabled) return;
    if (target.matches("[data-start-new]")) {
      const setup = document.getElementById("m0StartSetup");
      if (setup) setup.hidden = false;
      if (el.coachNameInput) el.coachNameInput.focus();
      return;
    }
    if (target.matches("[data-confirm-new-career]")) return startCareerFromForm();
    if (target.matches("[data-continue-career]")) return continueCareer();
    if (target.matches("[data-cancel-new-career]")) {
      const setup = document.getElementById("m0StartSetup");
      if (setup) setup.hidden = true;
    }
  }

  function startCareerFromForm() {
    const programId = el.programSelect && el.programSelect.value;
    const coachName = (el.coachNameInput && el.coachNameInput.value.trim()) || "Alex Carter";
    state.world = createWorld({ programId, coachName });
    state.route = { id: "desk", params: {} };
    state.selectedPersonId = state.world.people[0] && state.world.people[0].id;
    state.dirty = true;
    navigate("desk", {}, true);
    saveGame();
    showApp();
    render();
  }

  function continueCareer() {
    const save = loadSave();
    if (!save) {
      setBootstrapStatus("No local save found. Start a new career.");
      return;
    }
    state.world = save.world;
    state.route = save.route || { id: "desk", params: {} };
    state.selectedPersonId = save.selectedPersonId || null;
    state.dirty = false;
    showApp();
    navigate(state.route.id, state.route.params || {}, true);
    render();
  }

  function showStart(force) {
    renderStartScreen();
    if (el.bootstrapScreen) el.bootstrapScreen.hidden = false;
    document.body.classList.toggle("m0-start-open", true);
    if (!force && state.world) return;
  }

  function showApp() {
    if (el.bootstrapScreen) el.bootstrapScreen.hidden = true;
    document.body.classList.toggle("m0-start-open", false);
  }

  function createWorld(options) {
    const programs = getSourcePrograms();
    const program = programs.find((item) => item.id === options.programId) || programs[0] || {
      id: "lakeview",
      name: "Lakeview College",
      shortName: "Lakeview",
      crest: "LC",
      record: "0-0",
    };
    const people = getSourcePlayers(program.id).slice(0, 24).map((player, index) => ({
      id: player.id || `person-${index + 1}`,
      type: "player",
      name: player.name || `Player ${index + 1}`,
      position: player.position || "ATH",
      classYear: player.year || player.classYear || "FR",
      overall: Number(player.ovr || player.overall || 70),
      potential: Number(player.pot || player.potential || player.ovr || 75),
      morale: player.morale || "Stable",
      status: player.transferRisk ? `Transfer risk: ${player.transferRisk}` : "Available",
      developmentFocus: player.developmentFocus || "Balanced",
    }));
    if (!people.length) {
      people.push(
        { id: "person-qb-1", type: "player", name: "Jalen Ricks", position: "QB", classYear: "JR", overall: 88, potential: 90, morale: "High", status: "Available", developmentFocus: "Film Study" },
        { id: "person-hb-1", type: "player", name: "Trey McCall", position: "HB", classYear: "SO", overall: 84, potential: 88, morale: "Stable", status: "Available", developmentFocus: "Technique" }
      );
    }
    const now = new Date().toISOString();
    return {
      schemaVersion: 1,
      createdAt: now,
      updatedAt: now,
      career: {
        coachName: options.coachName,
        programId: program.id,
        seasonYear: 2028,
        week: 1,
        phase: "Preseason Setup",
        dateLabel: "Monday, Aug 25, 2028",
      },
      programs: [{
        id: program.id,
        name: program.name || program.shortName || "Lakeview College",
        shortName: program.shortName || program.name || "Lakeview",
        crest: program.crest || initials(program.name || program.id),
        record: program.record || "0-0",
      }],
      people,
      calendarEvents: [{
        id: "cal-week-1",
        type: "week",
        title: "Preseason setup opens",
        week: 1,
        status: "current",
        linkedRoute: "desk",
      }, {
        id: "cal-week-2",
        type: "game",
        title: `${program.shortName || program.name || "Lakeview"} vs Ridge City`,
        week: 2,
        status: "upcoming",
        linkedRoute: "desk",
      }],
      actions: [],
      events: [{
        id: "event-career-start",
        type: "career.start",
        summary: `${options.coachName} started at ${program.name || program.id}.`,
        at: now,
      }],
      history: [],
      ui: {},
    };
  }

  function getSourcePrograms() {
    const source = global.CGM_DEMO_WORLD || global.CGM_FBS_WORLD || {};
    return Array.isArray(source.programs) ? source.programs : [];
  }

  function getSourcePlayers(programId) {
    const fbs = global.CGM_FBS_WORLD;
    const demo = global.CGM_DEMO_WORLD;
    if (fbs && fbs.data && Array.isArray(fbs.data.playerProfiles)) return fbs.data.playerProfiles;
    if (demo && demo.data && Array.isArray(demo.data.playerProfiles)) return demo.data.playerProfiles;
    if (demo && Array.isArray(demo.playerProfiles)) return demo.playerProfiles;
    return [];
  }

  function render() {
    renderShell();
    renderNav();
    if (!state.world) {
      renderStartPlaceholder();
      return;
    }
    const route = state.route || parseHash();
    const view = route.id === "person" ? renderPerson(route.params.personId) : renderRoute(route.id);
    el.content.innerHTML = view;
    bindRenderedControls();
    document.body.dataset.activeView = route.id;
  }

  function bindRenderedControls() {
    el.content.querySelectorAll("tr[data-person-id]").forEach((row) => {
      row.addEventListener("click", () => openPerson(row.dataset.personId));
    });
  }

  function renderShell() {
    const world = state.world;
    const program = world && selectors.currentProgram(world);
    text(el.programNameLabel, program ? program.name : "Campus Gridiron");
    text(el.crestLabel, program ? program.crest : "CG");
    text(el.careerDate, world ? world.career.dateLabel : "No career loaded");
    text(el.weekLabel, world ? `Week ${world.career.week}` : "Start");
    text(el.phaseLabel, world ? world.career.phase : "Main Menu");
    text(el.recordLabel, program ? `${program.shortName} ${program.record}` : "No program");
    text(el.coachLabel, world ? `Coach: ${world.career.coachName}` : "Coach: none");
    text(el.urgentCount, world ? "0" : "1");
    if (el.urgentCount && el.urgentCount.parentElement) el.urgentCount.parentElement.hidden = true;
    text(el.saveStateLabel, state.dirty ? "Unsaved" : "Saved");
    const programName = program ? program.shortName : "Lakeview";
    text(el.nextKickoffOpponent, world ? `${programName} vs Ridge City` : "No career");
    text(el.nextKickoffWhen, world ? `${world.career.phase} / Week ${world.career.week}` : "Start a career");
  }

  function renderNav() {
    if (!el.mainNav) return;
    const active = state.route && state.route.id === "person" ? "roster" : ((state.route && state.route.id) || "desk");
    el.mainNav.innerHTML = ROUTES.map((item) => `
      <button class="nav-button ${active === item.id ? "active" : ""}" type="button" data-route="${escapeAttr(item.id)}">
        <span class="nav-icon" aria-hidden="true">${icons[item.icon] || ""}</span>
        <span>${escapeHtml(item.label)}</span>
      </button>
    `).join("");
    el.mainNav.querySelectorAll("[data-route]").forEach((button) => {
      button.addEventListener("click", () => navigate(button.dataset.route));
    });
  }

  function renderStartPlaceholder() {
    el.content.innerHTML = `
      <section class="m0-empty">
        <p class="eyebrow">No Career Loaded</p>
        <h2>Start a career to enter the app shell.</h2>
        <p>Create or continue a career from the main menu.</p>
        <button class="primary-action" type="button" data-open-start>Open Start Screen</button>
      </section>
    `;
  }

  function renderRoute(routeId) {
    if (routeId === "roster") return renderRoster();
    if (routeId === "calendar") return renderCalendar();
    if (routeId === "inbox") return renderInbox();
    if (routeId === "settings") return renderSettings();
    return renderDesk();
  }

  function renderDesk() {
    const desk = selectors.programDesk(state.world);
    const dashboard = selectors.dashboard(state.world);
    return workspace({
      eyebrow: "Dashboard",
      title: desk.programName,
      subtitle: `${desk.dateLabel} / ${desk.phase}`,
      meta: [`Week ${desk.week}`, `${dashboard.record}`, `Rank ${dashboard.rank}`, `${desk.eventCount} updates`],
      main: `
        <section class="cfl-dashboard-grid" data-testid="main-content">
          <article class="cfl-panel cfl-matchup-card" data-panel data-testid="current-matchup-card">
            <div>
              <p class="eyebrow">Next Game</p>
              <h3 data-no-clip>${escapeHtml(dashboard.nextGame.home)} <span>vs</span> ${escapeHtml(dashboard.nextGame.away)}</h3>
              <p>${escapeHtml(dashboard.nextGame.when)} / ${escapeHtml(dashboard.nextGame.venue)}</p>
            </div>
            <div class="cfl-score-strip">
              <span>${escapeHtml(dashboard.nextGame.homeRecord)}</span>
              <strong>${escapeHtml(dashboard.nextGame.line)}</strong>
              <span>${escapeHtml(dashboard.nextGame.awayRecord)}</span>
            </div>
            <button class="cfl-continue" type="button" data-continue-week data-testid="continue-button">Continue</button>
          </article>

          <article class="cfl-panel cfl-team-card" data-panel data-testid="team-overview-card">
            <div class="cfl-rating-ring">
              <strong>${dashboard.teamGrade}</strong>
              <span>Team Grade</span>
            </div>
            <div>
              <p class="eyebrow">Team Overview</p>
              <h3>${escapeHtml(dashboard.program.shortName)} Football</h3>
              <div class="cfl-stat-row">
                ${statTile("Offense", dashboard.ratings.offense)}
                ${statTile("Defense", dashboard.ratings.defense)}
                ${statTile("Special", dashboard.ratings.special)}
              </div>
            </div>
          </article>

          <article class="cfl-panel" data-panel data-testid="schedule-card">
            <p class="eyebrow">Schedule</p>
            <h3>Upcoming</h3>
            ${dashboard.schedule.map((game) => `
              <div class="cfl-list-row">
                <span>${escapeHtml(game.week)}</span>
                <strong>${escapeHtml(game.opponent)}</strong>
                <em>${escapeHtml(game.location)}</em>
              </div>
            `).join("")}
          </article>

          <article class="cfl-panel" data-panel data-testid="recruiting-card">
            <p class="eyebrow">Recruiting</p>
            <h3>${dashboard.recruiting.commits} Commits / Class Rank ${dashboard.recruiting.rank}</h3>
            <div class="cfl-meter"><span style="width:${dashboard.recruiting.momentum}%"></span></div>
            <p>${escapeHtml(dashboard.recruiting.headline)}</p>
          </article>

          <article class="cfl-panel" data-panel data-testid="staff-card">
            <p class="eyebrow">Staff</p>
            <h3>Staff Confidence ${dashboard.staff.confidence}%</h3>
            ${dashboard.staff.notes.map((note) => `<div class="cfl-list-row compact"><strong>${escapeHtml(note)}</strong></div>`).join("")}
          </article>

          <article class="cfl-panel" data-panel data-testid="rankings-card">
            <p class="eyebrow">Rankings / News</p>
            <h3>National Pulse</h3>
            ${dashboard.news.map((item) => `<div class="cfl-news-row"><span>${escapeHtml(item.tag)}</span><strong>${escapeHtml(item.title)}</strong></div>`).join("")}
          </article>
        </section>
        <section class="cfl-bottom-ticker" data-testid="bottom-ticker">
          ${dashboard.ticker.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </section>
      `,
      inspector: `
        <p class="eyebrow">Command Center</p>
        <h3>${escapeHtml(dashboard.phase)}</h3>
        <p>${escapeHtml(dashboard.commandNote)}</p>
        <div class="m0-inspector-stats">
          ${kpi("Budget", dashboard.budget)}
          ${kpi("Morale", dashboard.morale)}
          ${kpi("Roster", `${dashboard.rosterCount} players`)}
        </div>
        <button class="primary-action" type="button" data-go-route="roster">Review Roster</button>
      `,
      status: "Dashboard ready.",
    });
  }

  function statTile(label, value) {
    return `<div class="cfl-stat-tile"><span>${escapeHtml(label)}</span><strong>${escapeHtml(String(value))}</strong></div>`;
  }

  function continueWeek() {
    if (!state.world) return;
    const currentWeek = Number(state.world.career.week || 1);
    state.world.career.week = currentWeek + 1;
    state.world.career.phase = currentWeek >= 1 ? "Game Week" : "Preseason Setup";
    state.world.career.dateLabel = currentWeek >= 1 ? "Monday, Sep 1, 2028" : state.world.career.dateLabel;
    appendAction("career.continue", { fromWeek: currentWeek, toWeek: state.world.career.week });
    appendEvent("career.advance", `Advanced to Week ${state.world.career.week}.`);
    state.dirty = true;
    saveGame();
    render();
    global.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  function renderRoster() {
    const rows = selectors.rosterRows(state.world);
    return workspace({
      eyebrow: "Object Workspace",
      title: "Roster",
      subtitle: "Squad list and player profiles.",
      meta: [`${rows.length} players`, "Selectable rows"],
      main: `
        <section class="m0-table-wrap">
          <table class="m0-table">
            <thead><tr><th>Name</th><th>Pos</th><th>Class</th><th>OVR</th><th>Potential</th><th>Status</th></tr></thead>
            <tbody>
              ${rows.map((person) => `
                <tr data-person-id="${escapeAttr(person.id)}" onclick="window.CGM_M0.openPersonFromDom('${escapeAttr(person.id)}')" class="${state.selectedPersonId === person.id ? "selected" : ""}">
                  <td><a class="m0-row-link" href="#/person/${escapeAttr(person.id)}" data-person-id="${escapeAttr(person.id)}">${escapeHtml(person.name)}</a></td>
                  <td>${escapeHtml(person.position)}</td>
                  <td>${escapeHtml(person.classYear)}</td>
                  <td class="numeric">${person.overall}</td>
                  <td class="numeric">${person.potential}</td>
                  <td>${escapeHtml(person.status)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </section>
      `,
      inspector: renderInspector(),
      status: "Roster loaded.",
    });
  }

  function renderPerson(personId) {
    const person = selectors.personById(state.world, personId) || selectors.rosterRows(state.world)[0];
    if (!person) return renderRoster();
    state.selectedPersonId = person.id;
    return workspace({
      eyebrow: "Person Profile",
      title: person.name,
      subtitle: `${person.position} / ${person.classYear} / ${person.status}`,
      meta: [`OVR ${person.overall}`, `POT ${person.potential}`, person.developmentFocus],
      main: `
        <section class="m0-profile-summary">
          <div class="m0-portrait" aria-hidden="true"></div>
          <div>
            <h3>Overview</h3>
            <dl class="m0-detail-grid">
              <div><dt>Position</dt><dd>${escapeHtml(person.position)}</dd></div>
              <div><dt>Class</dt><dd>${escapeHtml(person.classYear)}</dd></div>
              <div><dt>Overall</dt><dd>${person.overall}</dd></div>
              <div><dt>Potential</dt><dd>${person.potential}</dd></div>
              <div><dt>Morale</dt><dd>${escapeHtml(person.morale)}</dd></div>
              <div><dt>Focus</dt><dd>${escapeHtml(person.developmentFocus)}</dd></div>
            </dl>
          </div>
        </section>
        <section class="m0-panel">
          <h3>Player Notes</h3>
          <p>${escapeHtml(person.name)} is available for selection. Development focus: ${escapeHtml(person.developmentFocus)}.</p>
          <button class="ghost-action" type="button" data-go-route="roster">Back to Roster</button>
        </section>
      `,
      inspector: renderInspector(person),
      status: "Profile loaded.",
    });
  }

  function renderCalendar() {
    const items = state.world.calendarEvents || [];
    return workspace({
      eyebrow: "Calendar",
      title: "Calendar",
      subtitle: "M0 durable event list, not a full scheduler yet.",
      meta: [`${items.length} events`, "Read-only"],
      main: `<section class="m0-venue-card"><div><p class="eyebrow">Upcoming</p><h3>First Game Context Surface</h3><p>Venue/game art placeholder sized for future game previews.</p></div></section><section class="m0-panel">${items.map((item) => `<p><strong>${escapeHtml(item.title)}</strong><br><span class="m0-muted">Week ${item.week} / ${item.status}</span></p>`).join("")}</section>`,
      inspector: renderInspector(),
      status: "Calendar depth starts in M3.",
    });
  }

  function renderInbox() {
    return workspace({
      eyebrow: "Inbox",
      title: "Inbox",
      subtitle: "Event-derived messages only.",
      meta: [`${state.world.events.length} events`],
      main: `<section class="m0-panel">${state.world.events.slice().reverse().map((event) => `<p><strong>${escapeHtml(event.type)}</strong><br>${escapeHtml(event.summary)}</p>`).join("")}</section>`,
      inspector: renderInspector(),
      status: "Inbox is currently a thin event-log view.",
    });
  }

  function renderSettings() {
    return workspace({
      eyebrow: "Debug",
      title: "Settings / Debug",
      subtitle: "Small tools for verifying M0 state.",
      meta: ["Save/load", "Reset", "Raw state"],
      main: `
        <section class="m0-panel">
          <h3>State Tools</h3>
          <div class="m0-button-row">
            <button class="primary-action" type="button" data-save-now>Save</button>
            <button class="ghost-action" type="button" data-reset-career>Reset Career</button>
          </div>
          <pre class="m0-state-dump">${escapeHtml(JSON.stringify({ route: state.route, selectedPersonId: state.selectedPersonId, world: state.world }, null, 2))}</pre>
        </section>
      `,
      inspector: renderInspector(),
      status: "Debug view is intentionally visible during M0.",
    });
  }

  function renderStub(title, note) {
    return workspace({
      eyebrow: "Quarantined Feature",
      title,
      subtitle: note,
      meta: ["M0 placeholder", "No fake feature depth"],
      main: `<section class="m0-panel"><h3>${escapeHtml(title)} waits for the foundation.</h3><p>${escapeHtml(note)}</p></section>`,
      inspector: renderInspector(),
      status: `${title} will be rebuilt through the domain spine later.`,
    });
  }

  function workspace(parts) {
    return `
      <section class="m0-workspace">
        <header class="m0-object-header">
          <div>
            <p class="eyebrow">${escapeHtml(parts.eyebrow)}</p>
            <h2>${escapeHtml(parts.title)}</h2>
            <p>${escapeHtml(parts.subtitle)}</p>
          </div>
          <div class="m0-meta-row">${(parts.meta || []).map((item) => `<span>${escapeHtml(String(item))}</span>`).join("")}</div>
        </header>
        <div class="m0-workspace-grid">
          <main>${parts.main}</main>
          <aside class="m0-inspector">${parts.inspector}</aside>
        </div>
        <footer class="m0-status">${escapeHtml(parts.status || "")}</footer>
      </section>
    `;
  }

  function renderInspector(person) {
    const selected = person || selectors.personById(state.world, state.selectedPersonId);
    if (!selected) {
      return `
        <p class="eyebrow">Inspector</p>
        <h3>No object selected</h3>
        <p>Select a roster row to prove object routing.</p>
      `;
    }
    return `
      <p class="eyebrow">Selected Person</p>
      <h3>${escapeHtml(selected.name)}</h3>
      <p>${escapeHtml(selected.position)} / ${escapeHtml(selected.classYear)}</p>
      <div class="m0-inspector-stats">
        ${kpi("OVR", selected.overall)}
        ${kpi("POT", selected.potential)}
        ${kpi("Morale", selected.morale)}
      </div>
      <button class="primary-action" type="button" data-person-id="${escapeAttr(selected.id)}">Open Profile</button>
    `;
  }

  function renderDeskInspector(desk) {
    const program = selectors.currentProgram(state.world);
    return `
      <p class="eyebrow">Up Next</p>
      <h3>Preseason Setup</h3>
      <p>Week ${escapeHtml(desk.week)} / ${escapeHtml(desk.dateLabel)}</p>
      <div class="m0-inspector-stats">
        ${kpi("Program", program ? program.shortName : "None")}
        ${kpi("Record", program ? program.record : "0-0")}
        ${kpi("Coach", state.world.career.coachName)}
      </div>
      <button class="primary-action" type="button" data-go-route="roster">Review Roster</button>
    `;
  }

  function kpi(label, value) {
    return `<div class="m0-kpi"><span>${escapeHtml(label)}</span><strong>${escapeHtml(String(value))}</strong></div>`;
  }

  function handleContentClick(event) {
    const openStart = event.target.closest("[data-open-start]");
    if (openStart) return showStart(true);
    const continueButton = event.target.closest("[data-continue-week]");
    if (continueButton) return continueWeek();
    const routeButton = event.target.closest("[data-go-route]");
    if (routeButton) return navigate(routeButton.dataset.goRoute);
    const saveButton = event.target.closest("[data-save-now]");
    if (saveButton) {
      saveGame();
      render();
      return;
    }
    const resetButton = event.target.closest("[data-reset-career]");
    if (resetButton) {
      resetCareer();
      return;
    }
    const personRow = event.target.closest("[data-person-id]");
    if (personRow) {
      openPerson(personRow.dataset.personId);
    }
  }

  function openPerson(personId) {
    if (!personId) return;
    state.selectedPersonId = personId;
    appendAction("person.opened", { personId });
    navigate("person", { personId });
  }

  function navigate(routeId, params, replace) {
    state.route = { id: routeId, params: params || {} };
    const hash = routeToHash(state.route);
    if (replace) global.history.replaceState(null, "", hash);
    else global.history.pushState(null, "", hash);
    render();
  }

  function parseHash() {
    const hash = global.location.hash.replace(/^#\/?/, "");
    const parts = hash.split("/").filter(Boolean);
    if (parts[0] === "person" && parts[1]) return { id: "person", params: { personId: parts[1] } };
    const id = parts[0] || "desk";
    if (ROUTES.some((route) => route.id === id)) return { id, params: {} };
    return { id: "desk", params: {} };
  }

  function routeToHash(route) {
    if (route.id === "person") return `#/person/${route.params.personId}`;
    return `#/${route.id}`;
  }

  function saveGame() {
    if (!state.world) return;
    state.world.updatedAt = new Date().toISOString();
    const payload = {
      schemaVersion: 1,
      savedAt: new Date().toISOString(),
      route: state.route,
      selectedPersonId: state.selectedPersonId,
      world: state.world,
    };
    global.localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    state.dirty = false;
    setBootstrapStatus("Career saved.");
  }

  function loadSave() {
    try {
      const raw = global.localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const payload = JSON.parse(raw);
      if (!payload || payload.schemaVersion !== 1 || !payload.world) return null;
      return payload;
    } catch (error) {
      return null;
    }
  }

  function resetCareer() {
    global.localStorage.removeItem(SAVE_KEY);
    state.world = null;
    state.route = { id: "desk", params: {} };
    state.selectedPersonId = null;
    state.dirty = false;
    global.history.replaceState(null, "", "#/desk");
    showStart(true);
    render();
  }

  function appendAction(type, data) {
    if (!state.world) return;
    state.world.actions.push({
      id: `action-${state.world.actions.length + 1}`,
      type,
      data,
      at: new Date().toISOString(),
    });
    state.dirty = true;
  }

  function appendEvent(type, summary) {
    if (!state.world) return;
    state.world.events.push({
      id: `event-${state.world.events.length + 1}`,
      type,
      summary,
      at: new Date().toISOString(),
    });
  }

  const selectors = {
    currentProgram(world) {
      return world && world.programs && world.programs[0];
    },
    programDesk(world) {
      const program = selectors.currentProgram(world);
      return {
        programName: program ? program.name : "No Program",
        dateLabel: world.career.dateLabel,
        phase: world.career.phase,
        week: world.career.week,
        peopleCount: world.people.length,
        eventCount: world.events.length,
      };
    },
    rosterRows(world) {
      return world && Array.isArray(world.people) ? world.people.filter((person) => person.type === "player") : [];
    },
    personById(world, personId) {
      return world && Array.isArray(world.people) ? world.people.find((person) => person.id === personId) : null;
    },
    dashboard(world) {
      const program = selectors.currentProgram(world) || { name: "Lakeview College", shortName: "Lakeview", record: "0-0" };
      const roster = selectors.rosterRows(world);
      const week = Number(world.career.week || 1);
      const isGameWeek = world.career.phase === "Game Week";
      return {
        program,
        phase: world.career.phase,
        record: program.record || "0-0",
        rank: week > 1 ? "#24" : "NR",
        teamGrade: "B+",
        budget: "$4.2M",
        morale: "Stable",
        rosterCount: roster.length,
        commandNote: isGameWeek ? "Game week is open. Review the roster before kickoff." : "Preseason setup is open. Lock the roster before game week.",
        ratings: { offense: 84, defense: 81, special: 78 },
        nextGame: {
          home: program.shortName || program.name,
          away: "Ridge City",
          homeRecord: program.record || "0-0",
          awayRecord: "0-0",
          when: isGameWeek ? "Saturday, Sep 6" : "Week 2",
          venue: "Lakeview Stadium",
          line: program.shortName === "Ridge City" ? "Even" : "LV -3.5",
        },
        schedule: [
          { week: "W2", opponent: "Ridge City", location: "Home" },
          { week: "W3", opponent: "Prairie State", location: "Away" },
          { week: "W4", opponent: "Northern Plains", location: "Home" },
        ],
        recruiting: {
          commits: 3,
          rank: 28,
          momentum: 62,
          headline: "Two priority targets have visits scheduled before conference play.",
        },
        staff: {
          confidence: 74,
          notes: ["OC likes the QB room", "DB coach requests one scholarship review", "Strength staff reports no new injuries"],
        },
        news: [
          { tag: "TOP 25", title: "Ridge City receiving poll votes" },
          { tag: "NIL", title: "Regional sponsor asks about QB room" },
          { tag: "RECRUIT", title: "Four-star tackle trims list to five" },
        ],
        ticker: [
          "Prairie State names a freshman starter at QB",
          "Ridge City installs new no-huddle package",
          "Lakeview donors approve facility study",
          "National signing window opens in eight weeks",
        ],
      };
    },
  };

  function initials(value) {
    return String(value || "CG").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  }

  function text(node, value) {
    if (node) node.textContent = value;
  }

  function setBootstrapStatus(value) {
    text(el.bootstrapStatus, value);
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }
})(window);
