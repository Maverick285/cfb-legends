(function initHistoryWorkspaceHelpers(global) {
  function buildSelectedHistorySeason(state, historyRows) {
    const selectedRow = (historyRows || []).find((row) => row._id === state.selectedSeasonId) || historyRows[0] || null;
    if (!selectedRow) return null;
    return {
      selectedSeasonId: selectedRow._id,
      season: selectedRow,
    };
  }

  function buildSelectedHistoryInspector(selectedSeason) {
    return {
      title: `Season ${selectedSeason[0]}`,
      sub: `${selectedSeason[1]} · ${selectedSeason[2]} · Final rank ${selectedSeason[3]}`,
      sections: [
        { label: "Season Snapshot", html: `<div class="data-list"><div class="data-row"><span>Record</span><span>${selectedSeason[1]}</span></div><div class="data-row"><span>Postseason</span><span>${selectedSeason[2]}</span></div><div class="data-row"><span>Final Rank</span><span>${selectedSeason[3]}</span></div><div class="data-row"><span>Memory</span><span>${selectedSeason[4]}</span></div></div>` },
        { label: "Next Step", html: `<div class="decision-actions"><button data-history-tab="scrapbook">Open Scrapbook</button><button data-history-tab="awards">Open Awards</button><button data-history-tab="draft">Open NFL Pipeline</button></div>` },
      ],
    };
  }

  function buildHistoryHooksInspector(memoryHooks) {
    return {
      title: "Memory Hooks",
      sub: "Stories worth telling",
      sections: [
        { label: "Recent Hooks", html: `<div class="data-list">${(memoryHooks || []).slice(0, 4).map((r) => `<button class="data-row clickable-row" data-open-view="history"><span><strong>${r[0]}</strong> ${r[1]}</span></button>`).join("") || '<p style="color:var(--text-muted)">No hooks yet.</p>'}</div>` },
      ],
    };
  }

  global.CGM_HISTORY_WORKSPACE = {
    buildSelectedHistorySeason,
    buildSelectedHistoryInspector,
    buildHistoryHooksInspector,
  };
})(window);
