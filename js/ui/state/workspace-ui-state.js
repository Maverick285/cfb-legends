(function initWorkspaceUiState(global) {
  function isRecord(value) {
    return !!value && typeof value === "object" && !Array.isArray(value);
  }

  function cloneDefault(value) {
    if (Array.isArray(value)) return value.map(cloneDefault);
    if (isRecord(value)) return { ...value };
    return value;
  }

  function ensureWorkspaceUiState(key, defaults) {
    if (!isRecord(global.CGM_UI_STATE)) global.CGM_UI_STATE = {};
    if (!isRecord(global.CGM_UI_STATE[key])) {
      global.CGM_UI_STATE[key] = cloneDefault(defaults || {});
    }
    return global.CGM_UI_STATE[key];
  }

  global.CGM_WORKSPACE_UI_STATE = {
    ensureWorkspaceUiState,
  };
})(window);
