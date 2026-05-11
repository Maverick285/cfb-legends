(function initInboxTools(global) {
  function inboxCategoryClass(category) {
    return {
      Recruiting: "cat-recruit",
      Staff: "cat-staff",
      Roster: "cat-roster",
      GameWeek: "cat-gameweek",
      Finance: "cat-finance",
      World: "cat-world",
    }[category] || "cat-general";
  }

  function inboxPriorityBadge(priority) {
    return {
      High: `<span class="badge danger">${priority}</span>`,
      Medium: `<span class="badge warn">${priority}</span>`,
      Low: `<span class="badge quiet">${priority}</span>`,
    }[priority] || `<span class="badge quiet">Info</span>`;
  }

  function inboxStaffOpinionsHtml(event) {
    return (event.staffOpinions || []).map((opinion) =>
      `<div class="ie-staff-opinion"><strong>${opinion.role}:</strong> <em>"${opinion.opinion}"</em></div>`
    ).join("");
  }

  function inboxActionsHtml(event) {
    if (!event.resolved && Array.isArray(event.actions) && event.actions.length) {
      return `<div class="ie-actions">${event.actions.map((action) =>
        `<button class="small-action" data-inbox-action="${action.id}" data-inbox-id="${event.id}" title="${action.consequence}">${action.label}</button>`
      ).join("")}</div>`;
    }
    if (event.resolved) {
      return `<div class="ie-actions"><span class="badge quiet resolved-tag">Resolved: ${event.chosenAction || "acknowledged"}</span></div>`;
    }
    return `<button class="small-action secondary" data-inbox-ack="${event.id}">Acknowledge</button>`;
  }

  function inboxOpenButtonHtml(event) {
    return event.targetView && event.targetView !== "desk"
      ? `<button class="small-action secondary" data-inbox-open="${event.targetView}" data-inbox-id="${event.id}">Open ${event.targetView}</button>`
      : "";
  }

  function inboxEventCard(event, selectedId) {
    const resolved = event.resolved ? " ie-resolved" : "";
    const selected = event.id === selectedId ? " selected" : "";
    const staffHtml = inboxStaffOpinionsHtml(event);
    return `<div class="inbox-event-card${resolved}${selected} ${inboxCategoryClass(event.category)}" data-desk-inbox-item="${event.id}">
      <div class="ie-header">
        <div>
          <span class="ie-category">${event.category}</span>
          <strong class="ie-subject">${event.subject}</strong>
        </div>
        <div class="ie-meta">${inboxPriorityBadge(event.priority)}<span class="ie-week">${event.week}</span></div>
      </div>
      <p class="ie-body">${event.body}</p>
      ${staffHtml ? `<div class="ie-staff">${staffHtml}</div>` : ""}
      <div class="ie-footer">${inboxActionsHtml(event)}${inboxOpenButtonHtml(event)}</div>
    </div>`;
  }

  function filteredInboxEvents(events, filterCat, limit) {
    let filtered = Array.isArray(events) ? events.slice() : [];
    if (filterCat && filterCat !== "All") {
      filtered = filtered.filter((event) => event.category === filterCat);
    }
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }

  function inboxEventList(events, filterCat, limit, selectedId) {
    const visibleEvents = filteredInboxEvents(events, filterCat, limit);
    if (!visibleEvents.length) {
      return `<div class="agenda-item"><strong>No events</strong><p>Inbox is clear for this category.</p></div>`;
    }
    return `<div class="inbox-event-list">${visibleEvents.map((event) => inboxEventCard(event, selectedId)).join("")}</div>`;
  }

  function inboxSummaryPanel(events, categories) {
    const allEvents = Array.isArray(events) ? events : [];
    const unresolvedEvents = allEvents.filter((event) => !event.resolved);
    const categoryCounts = {};
    unresolvedEvents.forEach((event) => {
      categoryCounts[event.category] = (categoryCounts[event.category] || 0) + 1;
    });
    const filterButtons = [`<button class="small-action secondary" data-inbox-filter="All">All <small>(${unresolvedEvents.length})</small></button>`];
    (categories || []).forEach((category) => {
      const count = categoryCounts[category] || 0;
      if (count > 0) filterButtons.push(`<button class="small-action secondary" data-inbox-filter="${category}">${category} <small>(${count})</small></button>`);
    });
    return `<div class="agenda-list">
      <div class="agenda-item">
        <time>Inbox Status</time>
        <strong>${unresolvedEvents.length} unresolved of ${allEvents.length} total events</strong>
        <p>Select a filter to view by category. All decisions have consequences — staff recommendations are shown on each card.</p>
        <div class="ie-actions">${filterButtons.join("")}</div>
      </div>
    </div>`;
  }

  global.CGM_INBOX_TOOLS = {
    inboxEventCard,
    inboxEventList,
    inboxSummaryPanel,
    filteredInboxEvents,
  };
})(window);
