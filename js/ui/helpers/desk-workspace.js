(function initDeskWorkspaceHelpers(global) {
  function deskSeverityFromNotification(notification) {
    if (notification.blocking) return "blocker";
    if (notification.severity === "Deadline") return "deadline";
    if (notification.severity === "Action Recommended" || notification.severity === "Decision") return "decision";
    return "fyi";
  }

  function programItemHtml(notification, selectedId) {
    const sev = deskSeverityFromNotification(notification);
    const meta = `${(notification.department || "general").toUpperCase()} · ${notification.deadline || "No deadline"}`;
    const sel = notification.id === selectedId ? "selected" : "";
    const action = notification.targetView ? `<button class="primary" data-desk-open="${notification.targetView}" data-desk-item="${notification.id}">Open</button>` : "";
    const openAttr = notification.targetView ? ` data-desk-open="${notification.targetView}"` : "";
    return `<div class="program-item severity-${sev} ${sel}" data-desk-item="${notification.id}"${openAttr}>
      <div class="program-item-stripe"></div>
      <div class="program-item-body">
        <div class="program-item-title">${notification.title || "Item"}</div>
        <div class="program-item-meta">${meta}</div>
        <div class="program-item-summary">${notification.body || "No detail provided."}</div>
      </div>
      <div class="program-item-action">
        ${action}
        <button data-desk-resolve="${notification.id}">Resolve</button>
      </div>
    </div>`;
  }

  function buildDeskSelectedInspector(selected) {
    const sev = deskSeverityFromNotification(selected);
    const sevLabel = sev === "blocker" ? "Blocker" : sev === "deadline" ? "Deadline" : sev === "decision" ? "Decision" : "FYI";
    const sevBadge = sev === "blocker" ? "danger" : sev === "deadline" ? "warning" : sev === "decision" ? "info" : "good";
    return {
      title: selected.title || "Item",
      sub: `${(selected.department || "General").toUpperCase()} · ${selected.deadline || "No deadline"}`,
      sections: [
        { label: "Status", html: `<span class="inspector-badge ${sevBadge}">${sevLabel}</span>` },
        { label: "Why It Matters", html: `<p style="margin:0">${selected.body || "No additional detail."}</p>` },
        { label: "Linked Workspace", html: `<p style="margin:0;color:var(--text-secondary)">${selected.linked || "—"}</p>` },
      ],
      actions: [
        ...(selected.targetView ? [{ label: `Open ${selected.linked || selected.targetView}`, action: `desk-open:${selected.targetView}`, primary: true }] : []),
        { label: "Mark Resolved", action: `desk-resolve:${selected.id}` },
      ],
    };
  }

  function buildDeskInboxInspector(selected) {
    return {
      title: selected.subject || "Inbox Event",
      sub: `${selected.category || "General"} · ${selected.priority || "Info"} · ${selected.week || "This week"}`,
      sections: [
        { label: "Situation", html: `<p style="margin:0">${selected.body || "No detail provided."}</p>` },
        { label: "Staff Read", html: (selected.staffOpinions || []).length ? (selected.staffOpinions || []).map((opinion) => `<div class="data-row"><span>${opinion.role}</span><span>${opinion.opinion}</span></div>`).join("") : '<p style="margin:0;color:var(--text-muted);font-size:var(--text-sm)">No staff notes attached.</p>' },
        { label: "Status", html: selected.resolved ? `<span class="inspector-badge good">Resolved: ${selected.chosenAction || "acknowledged"}</span>` : `<span class="inspector-badge info">Awaiting decision</span>` },
      ],
      actions: [
        ...(selected.targetView && selected.targetView !== "desk" ? [{ label: `Open ${selected.targetView}`, action: `desk-open:${selected.targetView}`, primary: true }] : []),
        ...(!selected.resolved ? [{ label: "Acknowledge", action: `inbox-ack:${selected.id}` }] : []),
      ],
    };
  }

  function buildDeskReadinessInspector(blockers, decisions, agenda) {
    return {
      title: "Continue Readiness",
      sub: blockers.length ? `${blockers.length} blocker(s)` : "Ready to advance",
      sections: [
        {
          label: "Status",
          html: blockers.length
            ? `<span class="inspector-badge danger">Blocked</span><p style="margin-top:var(--space-2)">Resolve all blockers above before pressing Continue.</p>`
            : `<span class="inspector-badge good">Ready</span><p style="margin-top:var(--space-2)">${decisions.length ? `${decisions.length} decision item(s) remain, but Continue can still advance time.` : "No blockers. Press Continue in the topbar or here on the desk to advance time."}</p>`,
        },
        {
          label: "Advance",
          html: `<div class="data-list"><button class="data-row clickable-row" data-continue-from-desk="now" ${blockers.length ? "disabled" : ""}><span>${blockers.length ? "Blocked until triage is clear" : "Advance to next meaningful event"}</span><span class="rating">Go</span></button></div>`,
        },
        {
          label: "Today's Agenda",
          html: `<div class="data-list">${(agenda || []).slice(0, 4).map((item) => `<div class="data-row"><span>${item[0]}</span><span style="color:var(--text-secondary)">${item[1]}</span></div>`).join("") || '<p style="color:var(--text-muted);font-size:var(--text-sm)">No items scheduled.</p>'}</div>`,
        },
      ],
    };
  }

  global.CGM_DESK_WORKSPACE = {
    deskSeverityFromNotification,
    programItemHtml,
    buildDeskSelectedInspector,
    buildDeskInboxInspector,
    buildDeskReadinessInspector,
  };
})(window);
