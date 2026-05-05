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
    if (isRecord(prefs.staff)) global.CGM_UI_STATE.staff = { ...prefs.staff };
    if (isRecord(prefs.analytics)) global.CGM_UI_STATE.analytics = { ...prefs.analytics };
    if (Array.isArray(prefs.bookmarks)) global.CGM_UI_STATE.bookmarks = prefs.bookmarks.slice(0, 12);
    if (Array.isArray(prefs.playerWatchlist)) global.CGM_UI_STATE.playerWatchlist = prefs.playerWatchlist.slice(0, 24);
    if (Array.isArray(prefs.prospectWatchlist)) global.CGM_UI_STATE.prospectWatchlist = prefs.prospectWatchlist.slice(0, 32);
  }

  function persistUiState() {
    if (!isRecord(global.CGM_UI_STATE)) return;
    const roster = isRecord(global.CGM_UI_STATE.roster) ? global.CGM_UI_STATE.roster : {};
    const recruiting = isRecord(global.CGM_UI_STATE.recruiting) ? global.CGM_UI_STATE.recruiting : {};
    const staff = isRecord(global.CGM_UI_STATE.staff) ? global.CGM_UI_STATE.staff : {};
    const analytics = isRecord(global.CGM_UI_STATE.analytics) ? global.CGM_UI_STATE.analytics : {};
    const bookmarks = Array.isArray(global.CGM_UI_STATE.bookmarks) ? global.CGM_UI_STATE.bookmarks.slice(0, 12) : [];
    const playerWatchlist = Array.isArray(global.CGM_UI_STATE.playerWatchlist) ? global.CGM_UI_STATE.playerWatchlist.slice(0, 24) : [];
    const prospectWatchlist = Array.isArray(global.CGM_UI_STATE.prospectWatchlist) ? global.CGM_UI_STATE.prospectWatchlist.slice(0, 32) : [];
    writeUiPrefs({ roster, recruiting, staff, analytics, bookmarks, playerWatchlist, prospectWatchlist });
  }

  global.CGM_UI_PREFS = {
    readUiPrefs,
    writeUiPrefs,
    loadUiStateFromPrefs,
    persistUiState,
  };
})(window);
