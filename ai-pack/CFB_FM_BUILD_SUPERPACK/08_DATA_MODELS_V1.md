# Data Models v1

This document defines the first-pass data model targets.

These are intentionally broad. The AI should implement only the fields required by the active packet, but future fields should be anticipated.

---

# GameWorld

```ts
type GameWorld = {
  id: string;
  saveVersion: number;
  rulesetId: string;
  seed: string;
  currentSeason: number;
  currentWeek: string;
  phase: SeasonPhase;
  userSchoolId?: string;

  schools: Record<SchoolId, School>;
  conferences: Record<ConferenceId, Conference>;
  players: Record<PlayerId, Player>;
  prospects: Record<ProspectId, Prospect>;
  staff: Record<StaffId, Staff>;
  events: Record<EventId, GameEvent>;
  inbox: InboxState;
  finances: Record<SchoolId, FinanceProfile>;
  facilities: Record<SchoolId, FacilityProfile>;
  actionLog: ActionLogEntry[];
};
```

# School

```ts
type School = {
  id: SchoolId;
  name: string;
  shortName: string;
  mascot: string;
  city: string;
  state: string;
  conferenceId: ConferenceId;
  colors: SchoolColors;

  structuralPower: {
    alumniBase: number;
    donorWealth: number;
    fanIntensity: number;
    localTalentAccess: number;
    regionalTalentDensity: number;
    facilities: number;
    nflPipeline: number;
    mediaExposure: number;
    academicPrestige: number;
    campusAppeal: number;
    locationAppeal: number;
    tradition: number;
    recentSuccess: number;
    staffBudget: number;
    nilMarketStrength: number;
  };

  identity: {
    tacticalIdentityLabels: string[];
    cultureLabels: string[];
    townProfileId?: string;
  };
};
```

# Conference

```ts
type Conference = {
  id: ConferenceId;
  name: string;
  teams: SchoolId[];
  divisions?: Record<string, SchoolId[]>;
  pods?: Record<string, SchoolId[]>;
  protectedRivalries: Array<[SchoolId, SchoolId]>;
  conferenceGames: number;
  championshipFormat: "none" | "top_two" | "divisions" | "pods";
  revenueShareModel: "equal" | "performance" | "tiered";
  mediaDealStrength: number;
  prestige: number;
  playoffAccess: "auto_possible" | "at_large_only" | "none";
};
```

# Player

```ts
type Player = {
  id: PlayerId;
  firstName: string;
  lastName: string;
  schoolId: SchoolId;
  hometown: string;
  state: string;
  position: Position;
  secondaryPositions: Position[];
  heightInches: number;
  weightPounds: number;
  handedness?: "left" | "right";
  classYear: PlayerClass;
  eligibility: EligibilityProfile;

  attributes: PlayerAttributes;
  hidden: HiddenPlayerTraits;
  preferences: PlayerPreferenceWeights;
  morale: MoraleProfile;
  development: DevelopmentProfile;
  nil: PlayerNilProfile;
  academic: AcademicProfile;
  health: HealthProfile;
  market: MarketProfile;

  traitClusters: TraitClusterInstance[];
};
```

# Player Preference Weights

```ts
type PlayerPreferenceWeights = {
  money: number;
  proDevelopment: number;
  location: number;
  playingTime: number;
  winning: number;
  academics: number;
  relationshipWithCoach: number;
  familyInfluence: number;
  brandExposure: number;
  schemeFit: number;
};
```

# Prospect

```ts
type Prospect = {
  id: ProspectId;
  firstName: string;
  lastName: string;
  classYear: number;
  gradeLevel: "FR" | "SO" | "JR" | "SR";
  hometown: string;
  state: string;
  region: string;
  highSchool: string;
  position: Position;
  secondaryPositions: Position[];
  heightInches: number;
  weightPounds: number;

  trueAttributes: PlayerAttributes;
  publicRating: PublicProspectRating;
  scoutedRatings: ScoutedRatings;
  hidden: HiddenPlayerTraits;
  preferences: PlayerPreferenceWeights;
  development: ProspectDevelopmentProfile;
  recruitment: Record<SchoolId, RecruitmentState>;

  traitClusters: TraitClusterInstance[];
};
```

# RecruitmentState

```ts
type RecruitmentState = {
  interest: number;
  relationship: number;
  offerStatus: "none" | "watching" | "offered" | "withdrawn";
  priority: "none" | "low" | "medium" | "high" | "must_get";
  staffOwnerId?: StaffId;
  visitStatus?: VisitStatus;
  nilExpectationKnown: boolean;
  nilExpectation?: number;
  playingTimeConcern: number;
  locationFit: number;
  schemeFit: number;
  lastContactWeek?: string;
  commitmentStatus: "none" | "verbal" | "soft_verbal" | "signed";
  flipRisk: number;
};
```

# Staff

```ts
type Staff = {
  id: StaffId;
  firstName: string;
  lastName: string;
  schoolId?: SchoolId;
  role: StaffRole;
  age: number;
  contract: StaffContract;
  attributes: StaffAttributes;
  personality: StaffPersonality;
  preferences: StaffPreferences;
  relationships: StaffRelationships;
  biases: StaffEvaluationBias;
  workload: StaffWorkload;
};
```

# NIL Deal Review

```ts
type NilDealReview = {
  id: string;
  entityId: PlayerId | ProspectId;
  schoolId: SchoolId;
  proposedAmount: number;
  marketValueEstimate: number;
  multiplier: number;
  riskScore: number;
  status:
    | "Approved"
    | "ApprovedWithScrutiny"
    | "DelayedReview"
    | "Flagged"
    | "Denied";
  reasons: string[];
};
```

# Event

```ts
type GameEvent = {
  id: EventId;
  type: string;
  category: EventCategory;
  priority: "critical" | "high" | "normal" | "low" | "flavor";
  blocking: boolean;
  createdAt: string;
  expiresAt?: string;
  subject: string;
  body: string;
  actors: Record<string, string>;
  actions: EventAction[];
  resolved: boolean;
  archived: boolean;
};
```
