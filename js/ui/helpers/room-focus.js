(function initRoomFocus(global) {
  function focusRosterForPlayer(state, player) {
    if (!state || !player) return false;
    state.tab = "players";
    state.view = "general";
    state.posFilter = player.position || "all";
    state.classFilter = player.year || "all";
    state.search = player.name || "";
    return true;
  }

  function focusRecruitingForProspect(state, prospect) {
    if (!state || !prospect) return false;
    state.tab = "search";
    state.posFilter = prospect.position || "all";
    state.starsFilter = String(prospect.stars || "all").charAt(0) || "all";
    state.statusFilter = "all";
    state.search = prospect.name || "";
    return true;
  }

  global.CGM_ROOM_FOCUS = {
    focusRosterForPlayer,
    focusRecruitingForProspect,
  };
})(window);
