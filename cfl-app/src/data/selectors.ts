import type { CareerState, ProgramSeedBundle, RosterPlayerRecord, RosterSortKey } from "./types";

const sortReaders: Record<RosterSortKey, (player: RosterPlayerRecord) => string | number> = {
  overall: (player) => player.ratings.overall,
  potentialAbility: (player) => player.ratings.potentialAbility,
  primaryPosition: (player) => player.athlete.primaryPosition,
  classYear: (player) => player.athlete.classYear,
  morale: (player) => player.ratings.morale,
  schemeFit: (player) => player.athlete.schemeFit,
  nilValue: (player) => player.nil?.estimatedNilValue || 0,
  rosterSlot: (player) => player.membership.rosterSlot,
};

export function getProgramRoster(bundle: ProgramSeedBundle, state: CareerState): RosterPlayerRecord[] {
  const base = bundle.selectedProgram.roster.filter((player) => {
    return state.positionFilter === "ALL" || player.athlete.primaryPosition === state.positionFilter;
  });
  const reader = sortReaders[state.sortKey];
  return base.slice().sort((a, b) => {
    const left = reader(a);
    const right = reader(b);
    let result = 0;
    if (typeof left === "number" && typeof right === "number") result = left - right;
    else result = String(left).localeCompare(String(right));
    if (result === 0) result = a.membership.rosterSlot - b.membership.rosterSlot;
    return state.sortDirection === "asc" ? result : -result;
  });
}

export function getPlayerProfile(bundle: ProgramSeedBundle, personId: string): RosterPlayerRecord | undefined {
  return bundle.selectedProgram.roster.find((player) => player.person.personId === personId);
}

export function getDashboardState(bundle: ProgramSeedBundle, state: CareerState) {
  const roster = bundle.selectedProgram.roster;
  const topPlayer = roster.slice().sort((a, b) => b.ratings.overall - a.ratings.overall)[0];
  const watchCount = state.watchlistPersonIds.length;
  const averageOverall = Math.round(roster.reduce((sum, player) => sum + player.ratings.overall, 0) / roster.length);
  const nextGame = bundle.selectedProgram.schedules[0] as {
    schedule?: { week: number; homeAwayNeutral: string };
    opponent?: { schoolName: string; nickname: string };
  } | undefined;
  return {
    topPlayer,
    watchCount,
    averageOverall,
    nextGame,
    rosterCount: roster.length,
  };
}

export function positionOptions(bundle: ProgramSeedBundle): string[] {
  return ["ALL", ...Array.from(new Set(bundle.selectedProgram.roster.map((player) => player.athlete.primaryPosition))).sort()];
}

export function keyRatingsForPosition(player: RosterPlayerRecord): Array<[string, number]> {
  const ratings = player.ratings;
  switch (player.athlete.primaryPosition) {
    case "QB":
      return [["Arm", Number(ratings.armStrength)], ["Accuracy", Math.round((Number(ratings.shortAccuracy) + Number(ratings.intermediateAccuracy) + Number(ratings.deepAccuracy)) / 3)], ["IQ", Number(ratings.footballIQ)], ["Clutch", Number(ratings.clutch)]];
    case "RB":
      return [["Burst", Number(ratings.burst)], ["Vision", Number(ratings.vision)], ["Security", Number(ratings.ballSecurity)], ["Speed", Number(ratings.speed)]];
    case "WR":
    case "TE":
      return [["Hands", Number(ratings.hands)], ["Routes", Number(ratings.routeRunning)], ["Speed", Number(ratings.speed)], ["Clutch", Number(ratings.clutch)]];
    case "OL":
      return [["Run Block", Number(ratings.runBlockPower)], ["Pass Set", Number(ratings.passSet)], ["Strength", Number(ratings.strength)], ["Discipline", Number(ratings.discipline)]];
    case "DL":
    case "EDGE":
      return [["Get Off", Number(ratings.getOff)], ["Strength", Number(ratings.strength)], ["Motor", Number(ratings.motor)], ["Tackle", Number(ratings.tackling)]];
    case "LB":
      return [["Tackle", Number(ratings.tackling)], ["IQ", Number(ratings.footballIQ)], ["Coverage", Number(ratings.zoneCoverage)], ["Pursuit", Number(ratings.pursuitAngle)]];
    case "CB":
    case "S":
      return [["Man", Number(ratings.manCoverage)], ["Zone", Number(ratings.zoneCoverage)], ["Speed", Number(ratings.speed)], ["Ball", Number(ratings.ballSkills)]];
    case "K":
      return [["Power", Number(ratings.kickPower)], ["Accuracy", Number(ratings.kickAccuracy)], ["Clutch", Number(ratings.clutch)], ["Consistency", Number(ratings.consistency)]];
    case "P":
      return [["Power", Number(ratings.puntPower)], ["Accuracy", Number(ratings.puntAccuracy)], ["Consistency", Number(ratings.consistency)], ["Discipline", Number(ratings.discipline)]];
    default:
      return [["OVR", ratings.overall], ["POT", ratings.potentialAbility], ["Speed", Number(ratings.speed)], ["IQ", Number(ratings.footballIQ)]];
  }
}
