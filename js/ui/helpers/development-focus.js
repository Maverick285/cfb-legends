(function initDevelopmentFocus(global) {
  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderFocusSummary(focus) {
    if (!focus || !focus.name) return "";
    const meta = Array.isArray(focus.meta) ? focus.meta.filter(Boolean) : [];
    return `<div class="data-list"><div class="data-row"><span><strong>${escapeHtml(focus.name)}</strong></span><span class="rating">Development</span></div></div>${meta.length ? `<div class="trait-badge-row" style="margin-top:8px">${meta.map((item) => `<span class="inspector-badge info">${escapeHtml(item)}</span>`).join(" ")}</div>` : ""}`;
  }

  global.CGM_DEVELOPMENT_FOCUS = {
    renderFocusSummary,
  };
})(window);
