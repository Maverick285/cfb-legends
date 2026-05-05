(function initScheduleWorkspaceHelpers(global) {
  function buildScheduleTendencyLinks(rows) {
    return `<div class="data-list">${rows.slice(1, 6).map((r) => `<button class="data-row clickable-row" data-open-view="analytics"><span>${r[0]}</span><span class="rating">${r[1]}</span></button>`).join("")}</div>`;
  }

  function buildSelectedScheduleGame(state, scheduleRows, playedCount, scheduleRowToGameContext) {
    const selectedRow = (scheduleRows || []).find((row) => row._id === state.selectedGameId) || scheduleRows[0] || null;
    if (!selectedRow) return null;
    const index = Number(String(selectedRow._id).replace("g", "")) || 0;
    return {
      selectedGameId: selectedRow._id,
      row: selectedRow,
      context: scheduleRowToGameContext([selectedRow[0], selectedRow[1], selectedRow[2], selectedRow[3], selectedRow[4]], index),
      played: index < playedCount,
    };
  }

  function buildScheduleSelectedInspector(selectedGame, tendencyHtml) {
    return {
      title: selectedGame.context.opponent,
      sub: `${selectedGame.context.weekLabel} · ${selectedGame.context.away ? "Away" : "Home"} · ${selectedGame.played ? "Played" : "Upcoming"}`,
      sections: [
        { label: "Game Context", html: `<div class="data-list"><div class="data-row"><span>Week</span><span>${selectedGame.context.weekLabel}</span></div><div class="data-row"><span>Opponent</span><span>${selectedGame.context.opponent}</span></div><div class="data-row"><span>Site</span><span>${selectedGame.context.away ? "Away" : "Home"}</span></div><div class="data-row"><span>Opponent quality</span><span class="rating">${selectedGame.context.opponentQuality}</span></div><div class="data-row"><span>Status</span><span>${selectedGame.played ? selectedGame.row[4] || "Played" : selectedGame.row[4] || "Scheduled"}</span></div></div>` },
        { label: "Next Step", html: `<div class="decision-actions"><button data-schedule-tab="why">Open Why View</button><button data-open-view="analytics">Open Analytics</button><button data-open-view="rankings">Open Rankings</button></div>` },
        { label: "Tendencies", html: tendencyHtml },
      ],
    };
  }

  global.CGM_SCHEDULE_WORKSPACE = {
    buildScheduleTendencyLinks,
    buildSelectedScheduleGame,
    buildScheduleSelectedInspector,
  };
})(window);
