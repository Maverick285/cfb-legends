(function initStaffWorkspaceHelpers(global) {
  function buildStaffFastLinksHtml() {
    return '<div class="data-list"><button class="data-row clickable-row" data-open-view="development"><span>Open development plans</span><span class="rating">Dev</span></button><button class="data-row clickable-row" data-open-view="recruiting"><span>Open recruiting for staffing impact</span><span class="rating">Rec</span></button></div>';
  }

  function buildStaffOpeningsLinksHtml() {
    return '<div class="data-list"><button class="data-row clickable-row" data-open-view="recruiting"><span>Open recruiting to judge recruiting staff impact</span><span class="rating">Rec</span></button><button class="data-row clickable-row" data-open-view="development"><span>Open development to assess coaching load</span><span class="rating">Dev</span></button></div>';
  }

  function buildStaffSelectionConfig(options) {
    const {
      tab,
      rows,
      selectedRowId,
      coachDetailCard,
      data,
    } = options;
    if (tab === "position") {
      const selectedCoach = (rows || []).find((row) => row.id === selectedRowId) || rows[0] || null;
      return {
        selectedRowId: selectedCoach ? selectedCoach.id : null,
        inspectorTitle: selectedCoach ? selectedCoach.name : "Position Coach Inspector",
        inspectorSub: selectedCoach ? `${selectedCoach.role} · ${(selectedCoach.devGroups || []).join(", ") || "No groups assigned"}` : "Pick a coach to inspect staff impact.",
        inspectorSections: [
          { label: "Profile", html: selectedCoach ? coachDetailCard(selectedCoach) : "<p>No position coach selected.</p>" },
          { label: "Actions", html: selectedCoach ? `<div class="decision-actions"><button data-staff-action="fire" data-staff-role="${selectedCoach.role}">Open Role</button><button data-open-view="development">Open Development</button></div>` : "<p>Select a coach row to manage this slot.</p>" },
        ],
      };
    }
    if (tab === "openings") {
      const selectedOpening = (rows || []).find((row) => row._id === selectedRowId) || rows[0] || null;
      const candidates = selectedOpening && data.staffCandidates ? (data.staffCandidates[selectedOpening.role] || []) : [];
      return {
        selectedRowId: selectedOpening ? selectedOpening._id : null,
        inspectorTitle: selectedOpening ? selectedOpening.role : "Open Roles",
        inspectorSub: selectedOpening ? `${candidates.length} candidate(s) ready` : "Pick an open role to review candidates.",
        inspectorSections: [
          { label: "Candidates", html: selectedOpening
            ? (candidates.length
              ? `<div class="decision-list">${candidates.map(([name, specialty, grade]) => `<div class="decision-item"><div><strong>${name}</strong><p>${specialty}</p><div class="decision-meta"><span>${selectedOpening.role}</span><span>Grade ${grade}</span></div></div><div class="decision-actions"><button class="small-action" data-staff-action="hire" data-staff-role="${selectedOpening.role}" data-staff-name="${name}" data-staff-specialty="${specialty}" data-staff-grade="${grade}">Hire</button></div></div>`).join("")}</div>`
              : `<p>No candidates generated for ${selectedOpening.role} yet.</p>`)
            : "<p>Select an open role to review its hiring board.</p>" },
          { label: "Fast Links", html: buildStaffOpeningsLinksHtml() },
        ],
      };
    }
    if (tab === "delegation") {
      const selectedDelegation = (rows || []).find((row) => row._id === selectedRowId) || rows[0] || null;
      return {
        selectedRowId: selectedDelegation ? selectedDelegation._id : null,
        inspectorTitle: selectedDelegation ? selectedDelegation[0] : "Delegation",
        inspectorSub: selectedDelegation ? `${selectedDelegation[1]} · ${selectedDelegation[2]} load · ${selectedDelegation[3]} risk` : "Pick an area to review delegation pressure.",
        inspectorSections: [
          { label: "Recommendation", html: selectedDelegation ? `<div class="data-list"><div class="data-row"><span>Owner</span><span>${selectedDelegation[1]}</span></div><div class="data-row"><span>Load</span><span>${selectedDelegation[2]}</span></div><div class="data-row"><span>Risk</span><span>${selectedDelegation[3]}</span></div><div class="data-row"><span>Staff recommendation</span><span>${selectedDelegation[4]}</span></div></div>` : "<p>No delegation area selected.</p>" },
          { label: "Fast Links", html: '<div class="data-list"><button class="data-row clickable-row" data-open-view="staff"><span>Stay in staff room to review another lane</span><span class="rating">Staff</span></button></div>' },
        ],
      };
    }
    const selectedCoordinator = (rows || []).find((row) => row._id === selectedRowId) || rows[0] || null;
    return {
      selectedRowId: selectedCoordinator ? selectedCoordinator._id : null,
      inspectorTitle: selectedCoordinator ? selectedCoordinator[1] : "Coordinator Inspector",
      inspectorSub: selectedCoordinator ? `${selectedCoordinator[0]} · ${selectedCoordinator[2]} · Grade ${selectedCoordinator[3]}` : "Pick a coordinator to inspect their slot.",
      inspectorSections: [
        { label: "Selected Coach", html: selectedCoordinator ? `<div class="data-list"><div class="data-row"><span>Role</span><span>${selectedCoordinator[0]}</span></div><div class="data-row"><span>Specialty</span><span>${selectedCoordinator[2]}</span></div><div class="data-row"><span>Grade</span><span>${selectedCoordinator[3]}</span></div></div>` : "<p>No coordinator selected.</p>" },
        { label: "Actions", html: selectedCoordinator ? `<div class="decision-actions"><button data-staff-action="fire" data-staff-role="${selectedCoordinator[0]}">Open Role</button><button data-open-view="development">Open Development</button></div>` : "<p>Select a coach row to manage this slot.</p>" },
      ],
    };
  }

  global.CGM_STAFF_WORKSPACE = {
    buildStaffFastLinksHtml,
    buildStaffSelectionConfig,
  };
})(window);
