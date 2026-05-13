import type { CareerActionLogEntry, CareerState, ProgramSeedBundle, RosterSortKey } from "./types";

function log(type: string, summary: string, personId?: string): CareerActionLogEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type,
    summary,
    personId,
    createdAt: new Date().toISOString(),
  };
}

export function createNewCareer(bundle: ProgramSeedBundle): CareerState {
  const topPlayer = bundle.selectedProgram.roster.slice().sort((a, b) => b.ratings.overall - a.ratings.overall)[0];
  return {
    selectedProgramId: bundle.defaultProgramId,
    selectedPersonId: topPlayer.person.personId,
    route: "dashboard",
    positionFilter: "ALL",
    sortKey: "overall",
    sortDirection: "desc",
    watchlistPersonIds: [],
    developmentFocusByPersonId: {},
    actionLog: [log("career_start", `Started career with ${bundle.selectedProgram.school.schoolName}.`)],
    currentWeek: 1,
    currentDate: "2026-08-01",
  };
}

export function selectPlayer(state: CareerState, personId: string, route: CareerState["route"] = state.route): CareerState {
  return { ...state, selectedPersonId: personId, route };
}

export function setRoute(state: CareerState, route: CareerState["route"]): CareerState {
  return { ...state, route };
}

export function setPositionFilter(state: CareerState, positionFilter: string): CareerState {
  return { ...state, positionFilter };
}

export function setRosterSort(state: CareerState, sortKey: RosterSortKey): CareerState {
  if (state.sortKey === sortKey) {
    return { ...state, sortDirection: state.sortDirection === "asc" ? "desc" : "asc" };
  }
  const sortDirection = sortKey === "primaryPosition" || sortKey === "classYear" ? "asc" : "desc";
  return { ...state, sortKey, sortDirection };
}

export function toggleWatchlist(state: CareerState, personId: string, playerName: string): CareerState {
  const exists = state.watchlistPersonIds.includes(personId);
  const watchlistPersonIds = exists
    ? state.watchlistPersonIds.filter((id) => id !== personId)
    : [...state.watchlistPersonIds, personId];
  return {
    ...state,
    watchlistPersonIds,
    actionLog: [
      log(exists ? "watchlist_remove" : "watchlist_add", `${exists ? "Removed" : "Added"} ${playerName} ${exists ? "from" : "to"} watchlist.`, personId),
      ...state.actionLog,
    ],
  };
}

export function setDevelopmentFocus(state: CareerState, personId: string, playerName: string, focus: string): CareerState {
  return {
    ...state,
    developmentFocusByPersonId: {
      ...state.developmentFocusByPersonId,
      [personId]: focus,
    },
    actionLog: [
      log("development_focus", `Set ${playerName}'s development focus to ${focus}.`, personId),
      ...state.actionLog,
    ],
  };
}
