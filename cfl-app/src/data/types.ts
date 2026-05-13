export type ProgramIndexRow = {
  programId: string;
  schoolId: string;
  schoolName: string;
  nickname: string;
  abbreviation: string;
  conferenceId: string;
  conferenceName: string;
  prestige: number;
  primaryColor: string;
  secondaryColor: string;
};

export type Person = {
  personId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  dateOfBirth: string;
  age: number;
  hometownCity: string;
  hometownState: string;
  personRoleType: string;
};

export type AthleteProfile = {
  personId: string;
  primaryPosition: string;
  secondaryPosition: string | null;
  jerseyNumber: number;
  heightInches: number;
  weightPounds: number;
  classYear: string;
  eligibilityYearsRemaining: number;
  redshirtStatus: string;
  transferStatus: string;
  depthChartRole: string;
  captainStatus: boolean;
  schemeFit: number;
  developmentSpeed: number;
  playingTimeExpectation: string;
  academicStanding: number;
};

export type PlayerRatings = {
  personId: string;
  position: string;
  overall: number;
  currentAbility: number;
  potentialAbility: number;
  speed: number;
  acceleration: number;
  strength: number;
  agility: number;
  stamina: number;
  injuryResistance: number;
  leadership: number;
  workEthic: number;
  discipline: number;
  footballIQ: number;
  consistency: number;
  clutch: number;
  ballSecurity: number;
  morale: number;
  confidence: number;
  armStrength: number;
  shortAccuracy: number;
  intermediateAccuracy: number;
  deepAccuracy: number;
  vision: number;
  burst: number;
  contactBalance: number;
  routeRunning: number;
  hands: number;
  runBlockPower: number;
  passSet: number;
  getOff: number;
  tackling: number;
  manCoverage: number;
  zoneCoverage: number;
  kickPower: number;
  kickAccuracy: number;
  puntPower: number;
  puntAccuracy: number;
  [key: string]: string | number;
};

export type PlayerTrait = {
  personId: string;
  traitId: string;
  traitName: string;
  category: string;
  polarity: string;
  strength: number;
};

export type RosterMembership = {
  rosterMembershipId: string;
  programId: string;
  personId: string;
  seasonYear: number;
  rosterSlot: number;
  scholarshipStatus: string;
  scholarshipEquivalency: number;
  activeRoster: boolean;
  positionGroup: string;
};

export type AthleteNil = {
  personId: string;
  programId: string;
  seasonYear: number;
  estimatedNilValue: number;
  nilStatus: string;
  marketability: number;
  socialFollowing: number;
};

export type RosterPlayerRecord = {
  membership: RosterMembership;
  person: Person;
  athlete: AthleteProfile;
  ratings: PlayerRatings;
  traits: PlayerTrait[];
  nil: AthleteNil | null;
};

export type ProgramSeedBundle = {
  generatedAt: string;
  sourcePack: string;
  defaultProgramId: string;
  programIndex: ProgramIndexRow[];
  selectedProgram: {
    program: {
      programId: string;
      schoolId: string;
      conferenceId: string;
      seasonYear: number;
      programPrestige: number;
      coachTrust: number;
      boosterSupport: number;
      fanConfidence: number;
      athleticBudget: number;
      recruitingBudget: number;
      nilBudgetTotal: number;
      facilitiesGrade: number;
      academicGrade: number;
      brandExposure: number;
      offensiveScheme: string;
      defensiveScheme: string;
      pipelineStates: string;
    };
    school: {
      schoolId: string;
      schoolName: string;
      nickname: string;
      abbreviation: string;
      city: string;
      state: string;
      conferenceId: string;
    };
    conference: {
      conferenceId: string;
      conferenceName: string;
      powerTier: string;
    };
    brand: {
      primaryColor: string;
      secondaryColor: string;
      accentColor: string;
      darkNeutral: string;
      lightNeutral: string;
    };
    stadium: {
      stadiumName: string;
      capacity: number;
      homeFieldAdvantage: number;
      noiseRating: number;
    };
    nil: {
      nilBudgetTotal: number;
      nilSpent: number;
      nilCommitted: number;
      nilAvailable: number;
      collectiveName: string;
      donorInfluence: number;
      brandHealth: number;
    };
    roster: RosterPlayerRecord[];
    staff: unknown[];
    schedules: unknown[];
  };
};

export type CareerActionLogEntry = {
  id: string;
  type: string;
  personId?: string;
  summary: string;
  createdAt: string;
};

export type CareerState = {
  selectedProgramId: string;
  selectedPersonId: string;
  route: "dashboard" | "roster" | "player";
  positionFilter: string;
  sortKey: RosterSortKey;
  sortDirection: "asc" | "desc";
  watchlistPersonIds: string[];
  developmentFocusByPersonId: Record<string, string>;
  actionLog: CareerActionLogEntry[];
  currentWeek: number;
  currentDate: string;
};

export type RosterSortKey =
  | "overall"
  | "potentialAbility"
  | "primaryPosition"
  | "classYear"
  | "morale"
  | "schemeFit"
  | "nilValue"
  | "rosterSlot";
