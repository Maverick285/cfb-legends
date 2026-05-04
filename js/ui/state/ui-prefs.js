(function initUiPrefs(global) {
  function isRecord(value) {
    return !!value && typeof value === "object" && !Array.isArray(value);
  }

  function localStore() {
    try {
      return global.localStorage || null;
    } catch (error) {
      return null;
    }
  }

  const UI_PREFS_KEY = "cgm.uiPrefs.v1";

  function readUiPrefs() {
    const store = localStore();
    if (!store) return {};
    try {
      return JSON.parse(store.getItem(UI_PREFS_KEY) || "{}") || {};
    } catch (error) {
      return {};
    }
  }

  function writeUiPrefs(prefs) {
    const store = localStore();
    if (!store) return;
    try {
      store.setItem(UI_PREFS_KEY, JSON.stringify(prefs || {}));
    } catch (error) {
      // noop
    }
  }

  function loadUiStateFromPrefs() {
    const prefs = readUiPrefs();
    if (!isRecord(global.CGM_UI_STATE)) global.CGM_UI_STATE = {};
    if (isRecord(prefs.roster)) global.CGM_UI_STATE.roster = { ...prefs.roster };
    if (isRecord(prefs.recruiting)) global.CGM_UI_STATE.recruiting = { ...prefs.recruiting };
    if (Array.isArray(prefs.bookmarks)) global.CGM_UI_STATE.bookmarks = prefs.bookmarks.slice(0, 12);
  }

  function persistUiState() {
    if (!isRecord(global.CGM_UI_STATE)) return;
    const roster = isRecord(global.CGM_UI_STATE.roster) ? global.CGM_UI_STATE.roster : {};
    const recruiting = isRecord(global.CGM_UI_STATE.recruiting) ? global.CGM_UI_STATE.recruiting : {};
    const bookmarks = Array.isArray(global.CGM_UI_STATE.bookmarks) ? global.CGM_UI_STATE.bookmarks.slice(0, 12) : [];
    writeUiPrefs({ roster, recruiting, bookmarks });
  }

  global.CGM_UI_PREFS = {
    readUiPrefs,
    writeUiPrefs,
    loadUiStateFromPrefs,
    persistUiState,
  };
})(window);
