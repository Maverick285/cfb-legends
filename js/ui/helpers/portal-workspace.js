(function initPortalWorkspaceHelpers(global) {
  function buildPortalFastLinks() {
    return '<div class="data-list"><button class="data-row clickable-row" data-open-view="roster"><span>Open roster for cap and risk context</span><span class="rating">Roster</span></button><button class="data-row clickable-row" data-open-view="finance"><span>Open finance for retention pressure</span><span class="rating">NIL</span></button></div>';
  }

  function buildOutgoingPortalWorkspaceConfig(options) {
    const {
      outgoingRiskRows,
      players,
      selectedOutgoingId,
      actionPoints,
      maxActionPoints,
      retentionActionCost,
      portalStrategyMeters,
    } = options;
    const rows = (outgoingRiskRows || []).map((r, i) => ({ _id: `o${i}`, _rowIndex: i, 0: r[0], 1: r[1], 2: r[2], 3: r[3], 4: r[4] }));
    const selectedOutgoing = rows.find((row) => row._id === selectedOutgoingId) || rows[0] || null;
    const selectedPlayer = selectedOutgoing
      ? (players || []).find((player) => player.name === selectedOutgoing[1] && player.position === selectedOutgoing[0])
      : null;
    const riskTone = selectedOutgoing && selectedOutgoing[3] === "High"
      ? "critical"
      : selectedOutgoing && selectedOutgoing[3] === "Medium"
        ? "warning"
        : "good";
    return {
      rows,
      selectedId: selectedOutgoing ? selectedOutgoing._id : null,
      statusText: `<strong>${rows.length}</strong> at risk · Retention AP <strong>${actionPoints}/${maxActionPoints}</strong>`,
      inspectorTitle: selectedOutgoing ? selectedOutgoing[1] : "Retention Inspector",
      inspectorSub: selectedOutgoing
        ? `${selectedOutgoing[0]} · ${selectedOutgoing[2]} · ${selectedOutgoing[3]} risk`
        : "Pick a player to dig into",
      inspectorSections: [
        { label: "Strategy", html: portalStrategyMeters() },
        { label: "Selected Risk", html: selectedOutgoing
          ? `<div class="data-list"><div class="data-row"><span>Risk level</span><span class="badge badge-${riskTone}">${selectedOutgoing[3]}</span></div><div class="data-row"><span>Reason</span><span>${selectedOutgoing[4] || "No reason recorded"}</span></div><div class="data-row"><span>Retention AP</span><span class="rating">${actionPoints}/${maxActionPoints}</span></div></div>`
          : `<p>Select an outgoing-risk row to work that player end-to-end.</p>` },
        { label: "Actions", html: selectedOutgoing
          ? `<div class="decision-actions"><button data-retention-action="conversation" data-retention-index="${selectedOutgoing._rowIndex}" ${actionPoints >= retentionActionCost.conversation ? "" : "disabled"}>Conversation (1 AP)</button><button data-retention-action="rolePitch" data-retention-index="${selectedOutgoing._rowIndex}" ${actionPoints >= retentionActionCost.rolePitch ? "" : "disabled"}>Role Pitch (1 AP)</button><button data-retention-action="benefitBoost" data-retention-index="${selectedOutgoing._rowIndex}" ${actionPoints >= retentionActionCost.benefitBoost ? "" : "disabled"}>Benefit Boost (2 AP)</button>${selectedPlayer ? `<button data-open-player="${selectedPlayer.id}">Open Player Profile</button>` : ""}</div>`
          : `<p>No retention actions available until a player is selected.</p>` },
      ],
    };
  }

  function buildIncomingPortalWorkspaceConfig(options) {
    const {
      portalRows,
      portalWindowOpen,
      selectedIncomingId,
      portalWindowLabel,
      portalStrategyMeters,
    } = options;
    const rows = portalWindowOpen
      ? (portalRows || []).map((r, i) => ({ _id: `p${i}`, _rowIndex: i, 0: r[0], 1: r[1], 2: r[2], 3: r[3], 4: r[4] }))
      : [];
    const selectedIncoming = rows.find((row) => row._id === selectedIncomingId) || rows[0] || null;
    return {
      rows,
      selectedId: selectedIncoming ? selectedIncoming._id : null,
      statusText: portalWindowOpen
        ? `<strong>${rows.length}</strong> in portal · ${portalWindowLabel}`
        : `<strong>Window closed</strong> · Preseason should not show a fresh incoming portal board`,
      inspectorTitle: selectedIncoming ? selectedIncoming[1] : "Portal Inspector",
      inspectorSub: selectedIncoming
        ? `${selectedIncoming[0]} · ${selectedIncoming[2]} · OVR ${selectedIncoming[3]}`
        : portalWindowLabel,
      inspectorSections: [
        { label: "Strategy", html: portalStrategyMeters() },
        { label: "Selected Target", html: selectedIncoming
          ? `<div class="data-list"><div class="data-row"><span>Status</span><span>${selectedIncoming[4] || "Open"}</span></div><div class="data-row"><span>Portal Window</span><span>${portalWindowLabel}</span></div></div>`
          : `<p>Select a portal target to review their status.</p>` },
        { label: "Fast Links", html: buildPortalFastLinks() },
      ],
    };
  }

  global.CGM_PORTAL_WORKSPACE = {
    buildPortalFastLinks,
    buildOutgoingPortalWorkspaceConfig,
    buildIncomingPortalWorkspaceConfig,
  };
})(window);
