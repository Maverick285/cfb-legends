(function initTopbarTools(global) {
  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderQuickOpenPanel(model) {
    const query = escapeHtml(model && model.query);
    const results = Array.isArray(model && model.results) ? model.results : [];
    const selectedIndex = Number(model && model.selectedIndex) || 0;
    if (!query) {
      return '<div class="topbar-popover empty"><p>Search players, recruits, staff, or rooms.</p></div>';
    }
    if (!results.length) {
      return `<div class="topbar-popover empty"><p>No results for <strong>${query}</strong>.</p></div>`;
    }
    return `<div class="topbar-popover"><div class="topbar-popover-list">${results.map((result, index) => {
      const active = index === selectedIndex ? " active" : "";
      return `<button class="topbar-result${active}" data-global-result="${escapeHtml(result.id || String(index))}">
        <span class="topbar-result-main">
          <strong>${escapeHtml(result.title)}</strong>
          <small>${escapeHtml(result.meta || "")}</small>
        </span>
        <span class="topbar-result-tag">${escapeHtml(result.tag || "Open")}</span>
      </button>`;
    }).join("")}</div></div>`;
  }

  function renderBookmarkMenu(bookmarks, activeView) {
    const items = Array.isArray(bookmarks) ? bookmarks : [];
    if (!items.length) {
      return '<div class="topbar-popover empty"><p>No bookmarks yet. Pin a room from the top bar.</p></div>';
    }
    return `<div class="topbar-popover"><div class="topbar-popover-list">${items.map((bookmark, index) => {
      const isActive = bookmark && bookmark.viewId === activeView;
      return `<div class="topbar-bookmark${isActive ? " active" : ""}">
        <button class="topbar-bookmark-open" data-bookmark-open="${index}">
          <span class="topbar-result-main">
            <strong>${escapeHtml(bookmark && bookmark.label)}</strong>
            <small>${escapeHtml(bookmark && bookmark.viewId)}</small>
          </span>
        </button>
        <button class="topbar-bookmark-remove" data-bookmark-remove="${index}" aria-label="Remove bookmark">×</button>
      </div>`;
    }).join("")}</div></div>`;
  }

  global.CGM_TOPBAR_TOOLS = {
    escapeHtml,
    renderQuickOpenPanel,
    renderBookmarkMenu,
  };
})(window);
