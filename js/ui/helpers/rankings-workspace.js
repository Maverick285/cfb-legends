(function initRankingsWorkspaceHelpers(global) {
  function buildSelectedRankingsRow(state, rows) {
    const selectedRow = (rows || []).find((row) => row._id === state.selectedRowId) || rows[0] || null;
    if (!selectedRow) return null;
    return {
      selectedRowId: selectedRow._id,
      row: selectedRow,
    };
  }

  function buildRankingsSelectedInspector(selectedRow, tab) {
    return {
      title: selectedRow[1],
      sub: tab === "conference"
        ? `${selectedRow[2]} · Rating ${selectedRow[3]} · ${selectedRow[4]}`
        : `${selectedRow[2]} · Rating ${selectedRow[3]} · Trend ${selectedRow[4]}`,
      sections: [
        { label: "Ranking Snapshot", html: `<div class="data-list"><div class="data-row"><span>Rank</span><span>${selectedRow[0]}</span></div><div class="data-row"><span>Program</span><span>${selectedRow[1]}</span></div><div class="data-row"><span>Record</span><span>${selectedRow[2]}</span></div><div class="data-row"><span>Rating</span><span class="rating">${selectedRow[3]}</span></div><div class="data-row"><span>${tab === "conference" ? "Grade" : "Trend"}</span><span>${selectedRow[4]}</span></div></div>` },
        { label: "Next Step", html: `<div class="decision-actions"><button data-rankings-tab="resume">Open Resume</button><button data-open-view="schedule">Open Schedule</button><button data-open-view="history">Open History</button></div>` },
      ],
    };
  }

  function buildRankingsResumeInspector(resumeRows) {
    return {
      title: "Selection Resume",
      sub: "Year-end CFP profile",
      sections: [
        { label: "Profile", html: `<div class="data-list">${(resumeRows || []).map((r) => `<button class="data-row clickable-row" data-open-view="rankings"><span>${r[0]}</span><span class="rating">${r[1]}</span></button>`).join("")}</div>` },
      ],
    };
  }

  global.CGM_RANKINGS_WORKSPACE = {
    buildSelectedRankingsRow,
    buildRankingsSelectedInspector,
    buildRankingsResumeInspector,
  };
})(window);
