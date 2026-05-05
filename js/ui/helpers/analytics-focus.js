(function initAnalyticsFocus(global) {
  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderFocusSummary(focus) {
    if (!focus || !focus.type || !focus.name) return "";
    const meta = Array.isArray(focus.meta) ? focus.meta.filter(Boolean) : [];
    const chips = meta.map((item) => `<span class="inspector-badge info">${escapeHtml(item)}</span>`).join(" ");
    return `<div class="data-list"><div class="data-row"><span><strong>${escapeHtml(focus.name)}</strong></span><span class="rating">${escapeHtml(focus.type === "player" ? "Player" : "Prospect")}</span></div></div>${chips ? `<div class="trait-badge-row" style="margin-top:8px">${chips}</div>` : ""}`;
  }

  global.CGM_ANALYTICS_FOCUS = {
    renderFocusSummary,
  };
})(window);
