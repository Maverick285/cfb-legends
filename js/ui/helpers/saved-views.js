(function initSavedViews(global) {
  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderSavedViewSelect(savedViews, dataAttr, placeholder) {
    const items = Array.isArray(savedViews) ? savedViews : [];
    const optionRows = [`<option value="">${escapeHtml(placeholder || "Saved Views")}</option>`]
      .concat(items.map((view, index) => `<option value="${index}">${escapeHtml(view && view.name ? view.name : `View ${index + 1}`)}</option>`));
    return `<select data-saved-view="${escapeHtml(dataAttr || "saved")}">${optionRows.join("")}</select>`;
  }

  function cloneValue(value) {
    if (Array.isArray(value)) return value.map(cloneValue);
    if (value && typeof value === "object") return { ...value };
    return value;
  }

  function applySavedView(targetState, savedView) {
    if (!targetState || !savedView || typeof savedView !== "object") return false;
    Object.keys(savedView).forEach((key) => {
      if (key === "name") return;
      targetState[key] = cloneValue(savedView[key]);
    });
    return true;
  }

  global.CGM_SAVED_VIEWS = {
    renderSavedViewSelect,
    applySavedView,
  };
})(window);
