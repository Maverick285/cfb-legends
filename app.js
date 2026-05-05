const icons = {
  home: '<svg viewBox="0 0 24 24"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
  inbox: '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M4 14h4l2 3h4l2-3h4"/></svg>',
  roster: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/><path d="M20 8v6"/><path d="M23 11h-6"/></svg>',
  depth: '<svg viewBox="0 0 24 24"><path d="M6 3v18"/><path d="M18 3v18"/><path d="M6 8h12"/><path d="M6 16h12"/><circle cx="6" cy="8" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="6" cy="16" r="2"/><circle cx="18" cy="16" r="2"/></svg>',
  recruiting: '<svg viewBox="0 0 24 24"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6"/></svg>',
  portal: '<svg viewBox="0 0 24 24"><path d="M4 12h14"/><path d="m14 6 6 6-6 6"/><path d="M4 5v14"/></svg>',
  schedule: '<svg viewBox="0 0 24 24"><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>',
  staff: '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  training: '<svg viewBox="0 0 24 24"><path d="M6.5 6.5h11"/><path d="M6.5 17.5h11"/><path d="M3 9.5v5"/><path d="M21 9.5v5"/><path d="M8 12h8"/></svg>',
  finance: '<svg viewBox="0 0 24 24"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6"/></svg>',
  rankings: '<svg viewBox="0 0 24 24"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M5 4H3v3a4 4 0 0 0 4 4"/><path d="M19 4h2v3a4 4 0 0 1-4 4"/></svg>',
  facilities: '<svg viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/><path d="M9 10h.01"/><path d="M15 10h.01"/></svg>',
  history: '<svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 14h3v3H7z"/><path d="M12 9h3v8h-3z"/><path d="M17 5h3v12h-3z"/></svg>',
  analytics: '<svg viewBox="0 0 24 24"><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 15 4-4 3 3 5-7"/></svg>',
  creator: '<svg viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/><circle cx="12" cy="12" r="9"/></svg>',
};

const navItems = [
  { id: "desk", label: "Program Desk", icon: "inbox" },
  { id: "home", label: "Program Home", icon: "home" },
  { id: "roster", label: "Roster", icon: "roster" },
  { id: "depth", label: "Depth Planner", icon: "depth" },
  { id: "recruiting", label: "Recruiting", icon: "recruiting" },
  { id: "portal", label: "Transfer Portal", icon: "portal" },
  { id: "staff", label: "Staff", icon: "staff" },
  { id: "development", label: "Development", icon: "training" },
  { id: "schedule", label: "Schedule", icon: "schedule" },
  { id: "rankings", label: "Rankings", icon: "rankings" },
  { id: "finance", label: "Finances / NIL", icon: "finance" },
  { id: "facilities", label: "Facilities / AD", icon: "facilities" },
  { id: "history", label: "History", icon: "history" },
  { id: "analytics", label: "Analytics Lab", icon: "analytics" },
  { id: "creator", label: "Creator Tools", icon: "creator" },
];

const VALID_VIEW_IDS = new Set(navItems.map((item) => item.id));
// ── Content pack selection ─────────────────────────────────────────────────
// Two packs ship: the original Lakeview demo and the FBS 2026 real-school pack.
// The user picks one in the bootstrap; the choice persists in localStorage and
// drives which `window.CGM_*_WORLD` is treated as the active world. Switching
// packs requires a page reload (handled by the bootstrap UI).
const CONTENT_PACK_KEY = "cgm.contentPack";
function readActiveContentPackId() {
  try {
    const stored = window.localStorage && window.localStorage.getItem(CONTENT_PACK_KEY);
    if (stored === "demo" || stored === "fbs") return stored;
  } catch (e) { /* localStorage unavailable */ }
  return "fbs";
}
const ACTIVE_CONTENT_PACK = readActiveContentPackId();
const world = (ACTIVE_CONTENT_PACK === "fbs" && window.CGM_FBS_WORLD)
  ? window.CGM_FBS_WORLD
  : window.CGM_DEMO_WORLD;
const SAVE_KEY = "cgm.demoCareer.v1";
const SAVE_SCHEMA_VERSION = 8;
const REDSHIRT_MAX_GAMES = 4;
const RECRUITING_ACTION_BUDGET = 7;
const RETENTION_ACTION_BUDGET = 4;
const RECRUITING_POOL_MIN = 16;
const PORTAL_EXCEPTION_ADVANCES = 2;
const CFP_FIELD_SIZE = 12;
const TACTICAL_PROFILES = ["Balanced", "Aggressive", "Conservative"];
const TEMPO_PROFILES = ["Huddle", "Balanced", "Fast", "No-Huddle", "Extreme"];
const TEMPO_DETAILS = {
  Huddle:       { desc: "Traditional huddle. Controls the clock and maximizes precision.", plays: 58, fatigueNote: "Low fatigue load — depth matters less", recruitNote: "Appeals to power-run and pro-style recruits", schemeTag: "Pro-Style / Power Run" },
  Balanced:     { desc: "Mixed tempo. Flexibility to push or slow down based on game situation.", plays: 66, fatigueNote: "Normal fatigue load", recruitNote: "No skew — broad appeal to all archetypes", schemeTag: "Any scheme" },
  Fast:         { desc: "Up-tempo attack. More plays without going full no-huddle.", plays: 74, fatigueNote: "Moderate fatigue increase — monitor your lines", recruitNote: "Appeals to spread and skill-heavy recruits", schemeTag: "Air Raid / Spread" },
  "No-Huddle":  { desc: "No-huddle hurry-up. Stresses opposing defense with quick strikes.", plays: 82, fatigueNote: "High fatigue on both lines — depth is critical", recruitNote: "Appeals to quick-twitch perimeter skill players", schemeTag: "Spread / RPO" },
  Extreme:      { desc: "Frenetic pace. Maximum variance and chaos. High injury risk.", plays: 90, fatigueNote: "Critical fatigue — rotation depth mandatory", recruitNote: "Appeals to athletes; repels pro-style traditionalists", schemeTag: "Extreme Spread" },
};
const NOTIFICATION_MAX_TOTAL = 64;
const NOTIFICATION_MAX_PER_STREAM = 3;
const NOTIFICATION_MAX_UNRESOLVED_NON_BLOCKING = 12;
const VALID_SEVERITIES = new Set([
  "FYI",
  "Advisory",
  "Action Recommended",
  "Deadline",
  "Must Respond",
  "Critical System Warning",
]);
const DEPTH_SLOT_POSITION = {
  QB1: "QB",
  RB1: "HB",
  WR1: "WR",
  LT1: "LT",
  EDGE1: "EDGE",
  CB1: "CB",
};
const RECRUITING_ACTION_COST = {
  scout: 1,
  contact: 1,
  offer: 2,
  visit: 2,
};
const RETENTION_ACTION_COST = {
  conversation: 1,
  rolePitch: 1,
  benefitBoost: 2,
};
const BENEFIT_BUCKET_KEYS = ["retention", "recruiting", "development", "emergency"];
const PROSPECT_FIRST_NAMES = [
  "Avery",
  "Micah",
  "Jordan",
  "Tariq",
  "Landon",
  "Jace",
  "Carter",
  "Devin",
  "Nolan",
  "Bryce",
  "Elias",
  "Kendrick",
  "Rowan",
  "Malik",
  "Tristan",
  "Andre",
  "Calvin",
  "Rhett",
  "Dorian",
  "Xavier",
];
const PROSPECT_LAST_NAMES = [
  "Keaton",
  "Mills",
  "Bishop",
  "Hale",
  "Vaughn",
  "Mercer",
  "Sloan",
  "Ellison",
  "Pruitt",
  "Turner",
  "Dawes",
  "McBride",
  "Harlan",
  "Foster",
  "Santos",
  "Rivers",
  "Quinn",
  "Maddox",
  "Keller",
  "Barlow",
];
const PROSPECT_POSITIONS = ["QB", "HB", "WR", "OT", "CB", "LB", "S", "DT", "EDGE"];
const PROSPECT_REGIONS = ["Great Lakes", "Southeast", "Texas", "West Coast", "Mid-South", "Central"];
const POSITION_NEED_WEIGHT = {
  High: 16,
  Medium: 10,
  Low: 5,
};
const SANDBOX_RULE_PRESETS = {
  careerClassic: {
    label: "Career Classic",
    recruitingActionPoints: 7,
    retentionActionPoints: 4,
    portalExceptionAdvances: 2,
    scoringEnvironmentPercent: 100,
    volatilityPercent: 100,
    tacticalImpactPercent: 100,
    injuryCadencePercent: 100,
    nilVolatilityPercent: 100,
    progressionPacePercent: 100,
    transferPopulationPercent: 100,
    realityAnchorPercent: 100,
  },
  arcadeFireworks: {
    label: "Arcade Fireworks",
    recruitingActionPoints: 10,
    retentionActionPoints: 6,
    portalExceptionAdvances: 4,
    scoringEnvironmentPercent: 125,
    volatilityPercent: 130,
    tacticalImpactPercent: 120,
    injuryCadencePercent: 120,
    nilVolatilityPercent: 135,
    progressionPacePercent: 120,
    transferPopulationPercent: 125,
    realityAnchorPercent: 90,
  },
  chaosWeek: {
    label: "Chaos Week",
    recruitingActionPoints: 9,
    retentionActionPoints: 5,
    portalExceptionAdvances: 5,
    scoringEnvironmentPercent: 115,
    volatilityPercent: 145,
    tacticalImpactPercent: 130,
    injuryCadencePercent: 140,
    nilVolatilityPercent: 150,
    progressionPacePercent: 110,
    transferPopulationPercent: 155,
    realityAnchorPercent: 75,
  },
  hardcoreBuilder: {
    label: "Hardcore Builder",
    recruitingActionPoints: 5,
    retentionActionPoints: 3,
    portalExceptionAdvances: 1,
    scoringEnvironmentPercent: 90,
    volatilityPercent: 90,
    tacticalImpactPercent: 105,
    injuryCadencePercent: 85,
    nilVolatilityPercent: 80,
    progressionPacePercent: 90,
    transferPopulationPercent: 80,
    realityAnchorPercent: 120,
  },
};

const PLAYER_ATTRS = [
  "throwing","catching","routeRunning","ballCarrying","passBlocking","runBlocking",
  "tackling","passRush","coverage","kicking","punting","longSnapping","technique","firstTouch",
  "decisions","anticipation","composure","concentration","determination","workRate",
  "leadership","aggression","bravery","flair","teamwork","positioning","vision","offTheBall",
  "pace","acceleration","agility","strength","stamina","balance","jumping",
];
const PLAYER_ATTR_GROUPS = [
  { label: "Technical", keys: ["throwing","catching","routeRunning","ballCarrying","passBlocking","runBlocking","tackling","passRush","coverage","kicking","punting","longSnapping","technique","firstTouch"] },
  { label: "Mental",    keys: ["decisions","anticipation","composure","concentration","determination","workRate","leadership","aggression","bravery","flair","teamwork","positioning","vision","offTheBall"] },
  { label: "Physical",  keys: ["pace","acceleration","agility","strength","stamina","balance","jumping"] },
];
const PLAYER_ATTR_LABELS = {
  throwing:"Throwing", catching:"Catching", routeRunning:"Route Running", ballCarrying:"Ball Carrying",
  passBlocking:"Pass Blocking", runBlocking:"Run Blocking", tackling:"Tackling", passRush:"Pass Rush",
  coverage:"Coverage", kicking:"Kicking", punting:"Punting", longSnapping:"Long Snapping",
  technique:"Technique", firstTouch:"First Touch",
  decisions:"Decisions", anticipation:"Anticipation", composure:"Composure", concentration:"Concentration",
  determination:"Determination", workRate:"Work Rate", leadership:"Leadership", aggression:"Aggression",
  bravery:"Bravery", flair:"Flair", teamwork:"Teamwork", positioning:"Positioning",
  vision:"Vision", offTheBall:"Off the Ball",
  pace:"Pace", acceleration:"Acceleration", agility:"Agility", strength:"Strength",
  stamina:"Stamina", balance:"Balance", jumping:"Jumping",
};
const KEY_ATTRS_BY_POSITION = {
  QB:   new Set(["throwing","decisions","anticipation","vision","composure","concentration","technique","flair"]),
  HB:   new Set(["ballCarrying","pace","acceleration","agility","strength","bravery","decisions","balance"]),
  WR:   new Set(["catching","routeRunning","pace","acceleration","agility","firstTouch","offTheBall","flair"]),
  TE:   new Set(["catching","passBlocking","strength","jumping","technique","decisions","positioning","teamwork"]),
  LT:   new Set(["passBlocking","runBlocking","strength","technique","agility","determination","stamina","anticipation"]),
  OT:   new Set(["passBlocking","runBlocking","strength","technique","agility","determination","stamina","anticipation"]),
  OG:   new Set(["passBlocking","runBlocking","strength","technique","agility","determination","stamina","positioning"]),
  C:    new Set(["passBlocking","runBlocking","strength","decisions","leadership","technique","concentration","teamwork"]),
  EDGE: new Set(["passRush","acceleration","agility","strength","technique","aggression","positioning","bravery"]),
  DE:   new Set(["passRush","tackling","strength","technique","aggression","positioning","stamina","concentration"]),
  DT:   new Set(["passRush","tackling","strength","stamina","aggression","technique","positioning","determination"]),
  LB:   new Set(["tackling","positioning","decisions","pace","strength","aggression","concentration","anticipation"]),
  CB:   new Set(["coverage","pace","acceleration","anticipation","decisions","positioning","agility","jumping"]),
  S:    new Set(["coverage","tackling","anticipation","decisions","positioning","pace","concentration","leadership"]),
  DB:   new Set(["coverage","pace","anticipation","decisions","positioning","agility","concentration","bravery"]),
  K:    new Set(["kicking","composure","concentration","determination","bravery","technique"]),
  P:    new Set(["punting","kicking","composure","concentration","determination","technique"]),
  LS:   new Set(["longSnapping","composure","concentration","determination","technique"]),
};
const DEFAULT_PLAYER_ATTRS = {
  throwing:10, catching:10, routeRunning:10, ballCarrying:10, passBlocking:10, runBlocking:10,
  tackling:10, passRush:10, coverage:10, kicking:10, punting:10, longSnapping:10,
  technique:10, firstTouch:10,
  decisions:10, anticipation:10, composure:10, concentration:10, determination:10, workRate:10,
  leadership:10, aggression:10, bravery:10, flair:10, teamwork:10, positioning:10, vision:10, offTheBall:10,
  pace:10, acceleration:10, agility:10, strength:10, stamina:10, balance:10, jumping:10,
};
const COACH_ATTRS = [
  "tacticalKnowledge", "offensiveStrategy", "defensiveStrategy", "playCalling", "qbDevelopment",
  "skillDevelopment", "lineDevelopment", "strengthConditioning", "specialTeams", "gameManagement",
  "inGameAdaptation", "opponentAnalysis", "dataAnalysis", "recruitment", "scoutingCurrent",
  "scoutingPotential", "negotiating", "budgetControl", "mediaHandling", "manManagement",
  "motivation", "discipline", "determination", "professionalism", "leadership", "adaptability",
  "decisionMaking", "composure", "pressureHandling", "loyalty", "ambition", "teaching",
  "sportsScience", "academyDevelopment", "staffDelegation",
];
const SCHOOL_ATTRS = [
  "academicPrestige", "boosterStrength", "fanPassion", "brandReach", "complianceCulture",
  "administrativeStability", "boardPatience", "nilCapacity", "nilStructure", "recruitingFootprint",
  "alumniNetwork", "campusAppeal", "studentSupport", "transferFriendliness", "tradition",
  "mediaMarket", "sponsorshipPower", "rivalryHeat", "weatherAdvantage", "travelBurden",
  "conferenceLeverage", "facilitiesQuality", "medicalSupport", "sportsScienceSupport", "nutritionProgram",
  "tutoringProgram", "disciplineCulture", "innovationAppetite", "fiscalHealth", "donorReliability",
  "ticketDemand", "merchandisingPower", "digitalEngagement", "pipelineAccess", "longTermVision",
];
const STADIUM_ATTRS = [
  "capacity", "atmosphere", "turfQuality", "weatherControl", "lockerRoomQuality",
  "trainingComplexLink", "medicalBayQuality", "crowdNoise", "sightlines", "pressFacilities",
  "vipSuites", "concessionQuality", "parkingAccess", "transitAccess", "securityReadiness",
  "homeFieldAdvantage", "scoreboardTech", "broadcastInfrastructure", "lightingQuality", "drainageQuality",
  "structuralCondition", "expansionPotential", "maintenanceDiscipline", "emergencyPreparedness", "acoustics",
  "studentSectionEnergy", "accessibility", "familyAmenities", "fieldHeating", "practiceFieldAdjacency",
  "travelTeamFacilities", "officialsFacilities", "replaySupport", "sustainability", "revenueEfficiency",
];
const PROSPECT_AGENT_TYPES = ["Value Seeker", "Brand Builder", "Early Path", "Loyalist"];
const COORDINATOR_ROLE_BLUEPRINTS = {
  "Offensive Coordinator": ["offensiveStrategy", "playCalling", "qbDevelopment", "skillDevelopment", "inGameAdaptation"],
  "Defensive Coordinator": ["defensiveStrategy", "gameManagement", "opponentAnalysis", "lineDevelopment", "inGameAdaptation"],
  "Recruiting Director": ["recruitment", "scoutingCurrent", "scoutingPotential", "negotiating", "mediaHandling"],
  "Strength Coach": ["strengthConditioning", "sportsScience", "discipline", "teaching", "motivation"],
};

// ── Prospect Archetypes ─────────────────────────────────────────────────────
// pref keys: playingTime, prestige, nil, distance, scheme, coach, winning (0–1 weight)
// devCurve: "Steady" | "Early" | "Late" | "BoomBust"
const PROSPECT_ARCHETYPES = {
  QB: [
    { name:"Pocket Distributor",    pref:{playingTime:0.70,prestige:0.85,nil:0.45,distance:0.55,scheme:0.90,coach:0.80,winning:0.70}, devCurve:"Steady"   },
    { name:"Big-Armed Gambler",     pref:{playingTime:0.90,prestige:0.60,nil:0.50,distance:0.40,scheme:0.70,coach:0.65,winning:0.70}, devCurve:"BoomBust"  },
    { name:"Dual-Threat Creator",   pref:{playingTime:0.95,prestige:0.55,nil:0.60,distance:0.50,scheme:0.95,coach:0.80,winning:0.80}, devCurve:"Early"     },
    { name:"Raw Tools Prospect",    pref:{playingTime:0.55,prestige:0.70,nil:0.40,distance:0.60,scheme:0.55,coach:0.90,winning:0.40}, devCurve:"Late"      },
    { name:"Processor",             pref:{playingTime:0.80,prestige:0.90,nil:0.30,distance:0.65,scheme:0.90,coach:0.90,winning:0.80}, devCurve:"Steady"   },
  ],
  HB: [
    { name:"Workhorse",             pref:{playingTime:0.95,prestige:0.60,nil:0.40,distance:0.40,scheme:0.70,coach:0.75,winning:0.70}, devCurve:"Steady"   },
    { name:"Speed Back",            pref:{playingTime:0.90,prestige:0.50,nil:0.55,distance:0.50,scheme:0.90,coach:0.70,winning:0.65}, devCurve:"Early"    },
    { name:"Power Back",            pref:{playingTime:0.90,prestige:0.70,nil:0.50,distance:0.45,scheme:0.80,coach:0.70,winning:0.80}, devCurve:"Steady"   },
    { name:"Third-Down Back",       pref:{playingTime:0.70,prestige:0.55,nil:0.50,distance:0.50,scheme:0.75,coach:0.80,winning:0.70}, devCurve:"Steady"   },
    { name:"Raw Athlete",           pref:{playingTime:0.80,prestige:0.50,nil:0.50,distance:0.60,scheme:0.55,coach:0.90,winning:0.50}, devCurve:"Late"     },
  ],
  WR: [
    { name:"Route Technician",      pref:{playingTime:0.80,prestige:0.75,nil:0.75,distance:0.50,scheme:0.90,coach:0.90,winning:0.65}, devCurve:"Steady"   },
    { name:"Deep Threat",           pref:{playingTime:0.90,prestige:0.55,nil:0.65,distance:0.40,scheme:0.95,coach:0.70,winning:0.65}, devCurve:"Early"    },
    { name:"Possession Receiver",   pref:{playingTime:0.70,prestige:0.80,nil:0.80,distance:0.60,scheme:0.80,coach:0.80,winning:0.70}, devCurve:"Steady"   },
    { name:"Slot Separator",        pref:{playingTime:0.90,prestige:0.50,nil:0.50,distance:0.50,scheme:0.90,coach:0.80,winning:0.65}, devCurve:"Steady"   },
    { name:"Raw Height/Speed",      pref:{playingTime:0.60,prestige:0.60,nil:0.55,distance:0.55,scheme:0.60,coach:0.90,winning:0.45}, devCurve:"Late"     },
  ],
  OT: [
    { name:"Road Grader",           pref:{playingTime:0.80,prestige:0.70,nil:0.40,distance:0.45,scheme:0.75,coach:0.75,winning:0.70}, devCurve:"Steady"   },
    { name:"Pass Protector",        pref:{playingTime:0.70,prestige:0.80,nil:0.50,distance:0.50,scheme:0.85,coach:0.90,winning:0.65}, devCurve:"Steady"   },
    { name:"Zone-Movement Lineman", pref:{playingTime:0.70,prestige:0.65,nil:0.40,distance:0.50,scheme:0.90,coach:0.80,winning:0.65}, devCurve:"Steady"   },
    { name:"Raw Frame Prospect",    pref:{playingTime:0.50,prestige:0.65,nil:0.40,distance:0.60,scheme:0.55,coach:0.90,winning:0.50}, devCurve:"Late"     },
  ],
  CB: [
    { name:"Man Corner",            pref:{playingTime:0.90,prestige:0.65,nil:0.65,distance:0.50,scheme:0.80,coach:0.80,winning:0.70}, devCurve:"Early"    },
    { name:"Zone Corner",           pref:{playingTime:0.80,prestige:0.70,nil:0.55,distance:0.50,scheme:0.85,coach:0.80,winning:0.70}, devCurve:"Steady"   },
    { name:"Ball Hawk",             pref:{playingTime:0.90,prestige:0.55,nil:0.55,distance:0.50,scheme:0.75,coach:0.80,winning:0.80}, devCurve:"Steady"   },
    { name:"Raw Track Athlete",     pref:{playingTime:0.70,prestige:0.50,nil:0.50,distance:0.60,scheme:0.55,coach:0.90,winning:0.45}, devCurve:"Late"     },
  ],
  LB: [
    { name:"Thumper",               pref:{playingTime:0.90,prestige:0.60,nil:0.40,distance:0.40,scheme:0.80,coach:0.75,winning:0.70}, devCurve:"Steady"   },
    { name:"Coverage Backer",       pref:{playingTime:0.80,prestige:0.70,nil:0.50,distance:0.50,scheme:0.90,coach:0.90,winning:0.70}, devCurve:"Steady"   },
    { name:"Blitzer",               pref:{playingTime:0.90,prestige:0.55,nil:0.50,distance:0.50,scheme:0.80,coach:0.70,winning:0.70}, devCurve:"Early"    },
    { name:"Raw Athlete",           pref:{playingTime:0.70,prestige:0.50,nil:0.50,distance:0.60,scheme:0.55,coach:0.90,winning:0.50}, devCurve:"Late"     },
  ],
  S: [
    { name:"Centerfield Safety",    pref:{playingTime:0.80,prestige:0.70,nil:0.50,distance:0.50,scheme:0.80,coach:0.80,winning:0.70}, devCurve:"Steady"   },
    { name:"Box Safety",            pref:{playingTime:0.90,prestige:0.55,nil:0.45,distance:0.45,scheme:0.75,coach:0.75,winning:0.70}, devCurve:"Steady"   },
    { name:"Ball Hawk",             pref:{playingTime:0.90,prestige:0.55,nil:0.55,distance:0.50,scheme:0.75,coach:0.80,winning:0.80}, devCurve:"Early"    },
    { name:"Raw Track Athlete",     pref:{playingTime:0.70,prestige:0.50,nil:0.50,distance:0.60,scheme:0.55,coach:0.90,winning:0.45}, devCurve:"Late"     },
  ],
  DT: [
    { name:"Interior Disruptor",    pref:{playingTime:0.80,prestige:0.65,nil:0.55,distance:0.45,scheme:0.80,coach:0.80,winning:0.70}, devCurve:"Steady"   },
    { name:"Nose Tackle",           pref:{playingTime:0.70,prestige:0.70,nil:0.40,distance:0.40,scheme:0.80,coach:0.80,winning:0.70}, devCurve:"Steady"   },
    { name:"Raw Length Prospect",   pref:{playingTime:0.55,prestige:0.60,nil:0.40,distance:0.60,scheme:0.55,coach:0.90,winning:0.50}, devCurve:"Late"     },
  ],
  EDGE: [
    { name:"Edge Rusher",           pref:{playingTime:0.90,prestige:0.70,nil:0.70,distance:0.45,scheme:0.80,coach:0.80,winning:0.75}, devCurve:"Early"    },
    { name:"Speed Rusher",          pref:{playingTime:0.90,prestige:0.55,nil:0.65,distance:0.50,scheme:0.80,coach:0.75,winning:0.70}, devCurve:"Early"    },
    { name:"Power End",             pref:{playingTime:0.80,prestige:0.70,nil:0.50,distance:0.45,scheme:0.80,coach:0.80,winning:0.70}, devCurve:"Steady"   },
    { name:"Raw Length Prospect",   pref:{playingTime:0.55,prestige:0.65,nil:0.40,distance:0.60,scheme:0.55,coach:0.90,winning:0.50}, devCurve:"Late"     },
  ],
};
const POTENTIAL_GRADES = [
  "Limited","Serviceable","Solid Starter","All-Conference Upside","All-American Upside","NFL Upside","Generational",
];
const DEV_CURVE_LABELS = { Steady:"Steady Developer", Early:"Early Bloomer", Late:"Late Bloomer", BoomBust:"Boom/Bust" };

// ── Inbox Event Types ──────────────────────────────────────────────────────
const INBOX_EVENT_CATS = ["Recruiting","Staff","Roster","GameWeek","Finance","World"];
// Promise types available when sending a coordinator/HC to a recruit
const RECRUITING_PROMISE_TYPES = [
  { id:"noRedshirt",        label:"No Redshirt",            commitBonus:6,  riskBase:0.20 },
  { id:"startingPath",      label:"Path to Starting",       commitBonus:9,  riskBase:0.30 },
  { id:"positionGuarantee", label:"Position Guarantee",     commitBonus:7,  riskBase:0.25 },
  { id:"nilSupport",        label:"NIL Support Package",    commitBonus:5,  riskBase:0.15 },
  { id:"earlyPlayingTime",  label:"Early Playing Time",     commitBonus:8,  riskBase:0.35 },
];
const PROMISE_TYPE_MAP = RECRUITING_PROMISE_TYPES.reduce((m, p) => { m[p.id] = p; return m; }, {});

// Position coach role names (beyond 4 coordinators)
const POSITION_COACH_ROLES = [
  "QB Coach","RB Coach","WR Coach","TE Coach","OL Coach",
  "DL Coach","EDGE Coach","LB Coach","CB Coach","S Coach",
  "Special Teams Coordinator","Recruiting Coordinator",
  "Strength & Conditioning","Player Development Director",
];

// ── Position-Specific Attribute Spec ─────────────────────────────────────
// posAttrs are stored on player objects separate from generic attrs.
// They represent the FM-style position-specific view of a player's abilities.
const POSITION_ATTRS_SPEC = {
  QB: { groups: [
    { label:"Arm",      keys:["throwPower","shortAcc","mediumAcc","deepAcc","touch","release"] },
    { label:"Decision", keys:["readProgression","coverageDiag","pocketPresence","pressureResp","rpoDecision","playAction"] },
    { label:"Athletic", keys:["mobility","scrambleInstinct","ballSecurity","durability"] },
  ]},
  HB: { groups: [
    { label:"Running",  keys:["vision","burst","contactBalance","power","elusiveness","cutbackSense"] },
    { label:"Usage",    keys:["ballSecurity","passProtection","receiving","routeRunning","shortYardage"] },
    { label:"Athletic", keys:["openFieldRunning","goalLineInstinct","patience","durability"] },
  ]},
  WR: { groups: [
    { label:"Receiving", keys:["hands","catchRadius","separation","release","routeRunning","deepSpeed"] },
    { label:"Advanced",  keys:["contestedCatch","yac","optionRoutes","sidelineAwareness","redZoneAbility","returnAbility"] },
    { label:"Physical",  keys:["concentration","physicality","blocking","durability"] },
  ]},
  TE: { groups: [
    { label:"Receiving", keys:["hands","catchRadius","separation","routeRunning","redZoneAbility","concentration"] },
    { label:"Blocking",  keys:["inlineBlocking","passProtection","runBlocking","zoneBlocking","physicality"] },
    { label:"Advanced",  keys:["hBackVersatility","deepSpeed","contestedCatch","durability"] },
  ]},
  OT: { groups: [
    { label:"Blocking",  keys:["runBlocking","passBlocking","zoneBlocking","gapBlocking","anchor"] },
    { label:"Technique", keys:["footwork","handPlacement","leverage","pulling","blitzPickup"] },
    { label:"Mental",    keys:["penaltyAvoid","comboBlocks","awareness","durability"] },
  ]},
  OG: { groups: [
    { label:"Blocking",  keys:["runBlocking","passBlocking","gapBlocking","zoneBlocking","anchor"] },
    { label:"Technique", keys:["footwork","handPlacement","leverage","pulling","comboBlocks"] },
    { label:"Mental",    keys:["blitzPickup","penaltyAvoid","awareness","durability"] },
  ]},
  C: { groups: [
    { label:"Blocking",   keys:["runBlocking","passBlocking","anchor","leverage","comboBlocks"] },
    { label:"Technique",  keys:["snapAccuracy","footwork","handPlacement","blitzPickup","zoneBlocking"] },
    { label:"Leadership", keys:["lineCommunication","awareness","penaltyAvoid","durability"] },
  ]},
  EDGE: { groups: [
    { label:"Pass Rush", keys:["passRushPower","powerRush","speedRush","bend","handUsage"] },
    { label:"Defense",   keys:["blockShedding","runDefense","gapDiscipline","pursuit","edgeSetting"] },
    { label:"Physical",  keys:["tacklingSkill","motor","stripAbility","stuntExec","durability"] },
  ]},
  DE: { groups: [
    { label:"Pass Rush", keys:["passRushPower","powerRush","speedRush","bend","handUsage"] },
    { label:"Defense",   keys:["blockShedding","runDefense","gapDiscipline","pursuit","edgeSetting"] },
    { label:"Physical",  keys:["tacklingSkill","motor","stripAbility","stuntExec","durability"] },
  ]},
  DT: { groups: [
    { label:"Interior",  keys:["passRushPower","interiorPush","powerRush","handUsage","blockShedding"] },
    { label:"Defense",   keys:["runDefense","gapDiscipline","pursuit","tacklingSkill","edgeSetting"] },
    { label:"Advanced",  keys:["motor","stuntExec","stripAbility","anchor","durability"] },
  ]},
  LB: { groups: [
    { label:"Coverage",  keys:["coverageSkill","zoneCoverage","manCoverage","playDiagnosis","spyAbility"] },
    { label:"Defense",   keys:["tacklingSkill","pursuit","runFits","blockShedding","blitzing"] },
    { label:"Advanced",  keys:["lineCommunication","range","physicality","durability"] },
  ]},
  CB: { groups: [
    { label:"Coverage",  keys:["manCoverage","zoneCoverage","press","recoverySpeed","routeRecognition"] },
    { label:"Ball",      keys:["ballSkills","hipFluidity","changeOfDir","slotCoverage","interceptionInst"] },
    { label:"Physical",  keys:["tacklingSkill","pursuitAngles","runSupport","blitzing","durability"] },
  ]},
  S: { groups: [
    { label:"Coverage",  keys:["manCoverage","zoneCoverage","safetyHelp","routeRecognition","ballSkills"] },
    { label:"Defense",   keys:["tacklingSkill","pursuitAngles","runSupport","blitzing","playDiagnosis"] },
    { label:"Advanced",  keys:["range","lineCommunication","hipFluidity","interceptionInst","durability"] },
  ]},
  DB: { groups: [
    { label:"Coverage",  keys:["manCoverage","zoneCoverage","press","recoverySpeed","routeRecognition"] },
    { label:"Ball",      keys:["ballSkills","hipFluidity","changeOfDir","slotCoverage","interceptionInst"] },
    { label:"Physical",  keys:["tacklingSkill","pursuitAngles","runSupport","blitzing","durability"] },
  ]},
  K:  { groups: [
    { label:"Kicking",   keys:["kickPower","kickAcc","kickoffDist","consistency"] },
    { label:"Mental",    keys:["clutch","weatherResist","pressureResp","technique"] },
  ]},
  P:  { groups: [
    { label:"Punting",   keys:["puntPower","puntAcc","hangTime","coffinCorner","consistency"] },
    { label:"Mental",    keys:["clutch","weatherResist","pressureResp","technique"] },
  ]},
  LS: { groups: [
    { label:"Technique", keys:["snapAccuracy","consistency","technique","durability"] },
    { label:"Mental",    keys:["clutch","pressureResp","awareness"] },
  ]},
};
const POS_ATTR_LABELS = {
  throwPower:"Throw Power",  shortAcc:"Short Acc.",   mediumAcc:"Medium Acc.",  deepAcc:"Deep Acc.",
  touch:"Touch",             release:"Release Speed",  readProgression:"Read Prog.", coverageDiag:"Cover. Diag.",
  pocketPresence:"Pocket Presence", pressureResp:"Pressure Resp.", rpoDecision:"RPO Decision", playAction:"Play Action",
  mobility:"Mobility",       scrambleInstinct:"Scramble Inst.", ballSecurity:"Ball Security", durability:"Durability",
  vision:"Vision",           burst:"Burst",            contactBalance:"Contact Balance", power:"Power",
  elusiveness:"Elusiveness", cutbackSense:"Cutback Sense", passProtection:"Pass Protect.",
  receiving:"Receiving",     routeRunning:"Route Running", shortYardage:"Short Yardage",
  openFieldRunning:"Open Field",  goalLineInstinct:"Goal Line Inst.",  patience:"Patience",
  hands:"Hands",             catchRadius:"Catch Radius",  separation:"Separation",   deepSpeed:"Deep Speed",
  contestedCatch:"Contested Catch", yac:"YAC",             optionRoutes:"Option Routes",
  sidelineAwareness:"Sideline Aware.", redZoneAbility:"Red Zone",  returnAbility:"Return Ability",
  concentration:"Concentration", physicality:"Physicality", blocking:"Blocking",
  inlineBlocking:"Inline Block.", zoneBlocking:"Zone Block.", runBlocking:"Run Block.",
  passBlocking:"Pass Block.",  gapBlocking:"Gap Block.",  anchor:"Anchor",   footwork:"Footwork",
  handPlacement:"Hand Placement", leverage:"Leverage",     pulling:"Pulling",  blitzPickup:"Blitz Pickup",
  penaltyAvoid:"Penalty Avoid.", comboBlocks:"Combo Blocks", awareness:"Awareness",
  snapAccuracy:"Snap Accuracy", lineCommunication:"Line Comm.",   hBackVersatility:"H-Back Vers.",
  passRushPower:"Pass Rush",   powerRush:"Power Rush",    speedRush:"Speed Rush",   bend:"Bend",
  handUsage:"Hand Usage",      blockShedding:"Block Shed.",  runDefense:"Run Defense",
  gapDiscipline:"Gap Discipline", pursuit:"Pursuit",         edgeSetting:"Edge Setting",
  tacklingSkill:"Tackling",    motor:"Motor",             stripAbility:"Strip Ability", stuntExec:"Stunt Exec.",
  interiorPush:"Interior Push",
  coverageSkill:"Coverage",    zoneCoverage:"Zone Coverage", manCoverage:"Man Coverage",
  playDiagnosis:"Play Diagnosis", spyAbility:"Spy Ability",   runFits:"Run Fits",   blitzing:"Blitzing",
  range:"Range",               press:"Press",             recoverySpeed:"Recovery Speed",
  routeRecognition:"Route Recog.", ballSkills:"Ball Skills",   hipFluidity:"Hip Fluidity",
  changeOfDir:"Change of Dir.", slotCoverage:"Slot Coverage", interceptionInst:"Interception",
  pursuitAngles:"Pursuit Angles", runSupport:"Run Support",   safetyHelp:"Safety Help",
  kickPower:"Kick Power",      kickAcc:"Kick Accuracy",   kickoffDist:"Kickoff Dist.",
  consistency:"Consistency",   clutch:"Clutch",           weatherResist:"Weather Resist.",
  technique:"Technique",       puntPower:"Punt Power",    puntAcc:"Punt Accuracy",
  hangTime:"Hang Time",        coffinCorner:"Coffin Corner",
};

// Position-group keys for dev tick (which posAttr keys are "key" for position)
const POSITION_KEY_POS_ATTRS = Object.fromEntries(
  Object.entries(POSITION_ATTRS_SPEC).map(([pos, spec]) => [pos, new Set(spec.groups[0].keys)])
);

// ── Trait Cluster Definitions ────────────────────────────────────────────
// Each def derives a human-readable scout label from structured entity data.
// visibility: "public" | "scouted" | "staffOpinion" | "hidden"
// derive(entity) receives the merged player/prospect object and returns true/false.
// For prospects: attrs = generic, posAttrs = position-specific, hidden = personality
//   preferences = recruiting prefs, devCurve, trueRating, potentialGrade
// For roster players: same fields plus ovr, pot, morale, etc.
const TRAIT_CLUSTER_DEFS = [
  // ── Dev Curve ─────────────────────────────────────────────────────────
  { id:"early_bloomer",      label:"Early Bloomer",       cat:"Dev Curve",     pos:true,  vis:"scouted",
    derive: (e) => e.devCurve === "Early" || (e.hidden && e.hidden.workEthic >= 15 && (e.trueRating >= 72 || e.ovr >= 72)) },
  { id:"late_developer",     label:"Late Developer",      cat:"Dev Curve",     pos:null,  vis:"scouted",
    derive: (e) => e.devCurve === "Late" || (["All-American Upside","NFL Upside","Generational"].includes(e.potentialGrade) && (e.trueRating < 72 || (e.pot && e.pot - e.ovr > 16))) },
  { id:"boom_bust",          label:"Boom/Bust",           cat:"Dev Curve",     pos:null,  vis:"scouted",
    derive: (e) => e.devCurve === "BoomBust" },
  { id:"high_ceiling",       label:"High Ceiling",        cat:"Dev Curve",     pos:true,  vis:"public",
    derive: (e) => ["All-American Upside","NFL Upside","Generational"].includes(e.potentialGrade) || (e.pot && e.pot >= 88) },
  { id:"high_floor",         label:"High Floor",          cat:"Dev Curve",     pos:true,  vis:"scouted",
    derive: (e) => (e.trueRating >= 78 || e.ovr >= 76) && ["Solid Starter","All-Conference Upside"].includes(e.potentialGrade) },
  { id:"physically_maxed",   label:"Physically Maxed",    cat:"Dev Curve",     pos:null,  vis:"scouted",
    derive: (e) => (e.hidden && e.hidden.workEthic >= 14) && ["Serviceable","Solid Starter"].includes(e.potentialGrade) },
  { id:"raw_tools",          label:"Raw Tools Prospect",  cat:"Dev Curve",     pos:null,  vis:"public",
    derive: (e) => e.potentialGrade === "All-American Upside" && (e.trueRating < 68 || (e.pot && e.ovr && e.pot - e.ovr > 20)) },

  // ── Work / Preparation ────────────────────────────────────────────────
  { id:"gym_rat",            label:"Gym Rat",             cat:"Work/Prep",     pos:true,  vis:"scouted",
    derive: (e) => e.hidden && e.hidden.workEthic >= 16 && e.hidden.coachability >= 13 },
  { id:"studious",           label:"Studious",            cat:"Work/Prep",     pos:true,  vis:"scouted",
    derive: (e) => e.hidden && e.hidden.coachability >= 15 && e.hidden.workEthic >= 13 },
  { id:"coachs_favorite",    label:"Coach's Favorite",    cat:"Work/Prep",     pos:true,  vis:"staffOpinion",
    derive: (e) => e.hidden && e.hidden.coachability >= 17 },
  { id:"low_maintenance",    label:"Low Maintenance",     cat:"Work/Prep",     pos:true,  vis:"staffOpinion",
    derive: (e) => e.hidden && e.hidden.coachability >= 14 && e.hidden.ambition <= 10 },
  { id:"self_starter",       label:"Self-Starter",        cat:"Work/Prep",     pos:true,  vis:"scouted",
    derive: (e) => e.hidden && e.hidden.workEthic >= 15 && e.attrs && e.attrs.determination >= 14 },
  { id:"coasts_on_talent",   label:"Coasts on Talent",    cat:"Work/Prep",     pos:false, vis:"staffOpinion",
    derive: (e) => (e.trueRating >= 78 || e.ovr >= 78) && e.hidden && e.hidden.workEthic <= 7 },
  { id:"needs_pushing",      label:"Needs Pushing",       cat:"Work/Prep",     pos:false, vis:"staffOpinion",
    derive: (e) => e.hidden && e.hidden.workEthic <= 9 && e.hidden.coachability >= 10 },

  // ── Competitive / Mental ─────────────────────────────────────────────
  { id:"gamer",              label:"Gamer",               cat:"Competitive",   pos:true,  vis:"scouted",
    derive: (e) => e.attrs && e.attrs.composure >= 15 && e.attrs.concentration >= 14 && (e.attrs.determination >= 14 || e.attrs.bravery >= 14) },
  { id:"alpha",              label:"Alpha",               cat:"Competitive",   pos:true,  vis:"scouted",
    derive: (e) => e.attrs && e.attrs.leadership >= 16 && e.attrs.aggression >= 13 },
  { id:"steady_hand",        label:"Steady Hand",         cat:"Competitive",   pos:true,  vis:"scouted",
    derive: (e) => e.attrs && e.attrs.composure >= 16 && e.attrs.concentration >= 15 },
  { id:"quiet_competitor",   label:"Quiet Competitor",    cat:"Competitive",   pos:true,  vis:"staffOpinion",
    derive: (e) => e.hidden && e.hidden.ambition >= 14 && e.attrs && e.attrs.leadership <= 10 && e.attrs.determination >= 14 },
  { id:"emotional_spark",    label:"Emotional Spark",     cat:"Competitive",   pos:null,  vis:"scouted",
    derive: (e) => e.attrs && e.attrs.aggression >= 15 && e.attrs.composure <= 9 },
  { id:"confidence_player",  label:"Confidence Player",   cat:"Competitive",   pos:null,  vis:"staffOpinion",
    derive: (e) => e.attrs && e.attrs.composure <= 8 && e.attrs.determination >= 13 },
  { id:"shrinks_pressure",   label:"Shrinks Under Pressure", cat:"Competitive", pos:false, vis:"staffOpinion",
    derive: (e) => e.attrs && e.attrs.composure <= 6 && e.attrs.concentration <= 8 },

  // ── Physical / Body ──────────────────────────────────────────────────
  { id:"twitchy",            label:"Twitchy",             cat:"Physical",      pos:true,  vis:"public",
    derive: (e) => e.attrs && e.attrs.acceleration >= 15 && e.attrs.agility >= 15 },
  { id:"explosive_first_step", label:"Explosive First Step", cat:"Physical",  pos:true,  vis:"public",
    derive: (e) => e.attrs && e.attrs.acceleration >= 16 },
  { id:"stiff_hipped",       label:"Stiff-Hipped",        cat:"Physical",      pos:false, vis:"scouted",
    derive: (e) => (e.posAttrs && (e.posAttrs.hipFluidity <= 7 || e.posAttrs.changeOfDir <= 7)) || (e.attrs && e.attrs.agility <= 7) },
  { id:"linear_athlete",     label:"Linear Athlete",      cat:"Physical",      pos:null,  vis:"scouted",
    derive: (e) => e.attrs && e.attrs.pace >= 15 && e.attrs.acceleration >= 14 && e.attrs.agility <= 10 },
  { id:"natural_bender",     label:"Natural Bender",      cat:"Physical",      pos:true,  vis:"scouted",
    derive: (e) => e.posAttrs && e.posAttrs.bend >= 15 },
  { id:"poor_bend",          label:"Poor Bend",           cat:"Physical",      pos:false, vis:"scouted",
    derive: (e) => e.posAttrs && e.posAttrs.bend !== undefined && e.posAttrs.bend <= 7 },
  { id:"heavy_feet",         label:"Heavy Feet",          cat:"Physical",      pos:false, vis:"scouted",
    derive: (e) => e.attrs && e.attrs.agility <= 8 && e.attrs.acceleration <= 9 },
  { id:"durability_concern", label:"Durability Concern",  cat:"Physical",      pos:false, vis:"scouted",
    derive: (e) => e.posAttrs && e.posAttrs.durability !== undefined && e.posAttrs.durability <= 6 },
  { id:"fluid_mover",        label:"Fluid Mover",         cat:"Physical",      pos:true,  vis:"public",
    derive: (e) => e.attrs && e.attrs.agility >= 15 && e.attrs.balance >= 14 },

  // ── Football IQ / Processing ─────────────────────────────────────────
  { id:"quick_processor",    label:"Quick Processor",     cat:"Football IQ",   pos:true,  vis:"scouted",
    derive: (e) => e.attrs && e.attrs.anticipation >= 15 && e.attrs.decisions >= 14 },
  { id:"slow_processor",     label:"Slow Processor",      cat:"Football IQ",   pos:false, vis:"staffOpinion",
    derive: (e) => e.attrs && e.attrs.anticipation <= 7 && e.attrs.decisions <= 8 },
  { id:"instinctive",        label:"Instinctive",         cat:"Football IQ",   pos:true,  vis:"scouted",
    derive: (e) => e.attrs && e.attrs.anticipation >= 16 && e.attrs.offTheBall >= 13 },
  { id:"assignment_sound",   label:"Assignment Sound",    cat:"Football IQ",   pos:true,  vis:"scouted",
    derive: (e) => e.attrs && e.attrs.concentration >= 15 && e.attrs.positioning >= 14 },
  { id:"freelancer",         label:"Freelancer",          cat:"Football IQ",   pos:null,  vis:"scouted",
    derive: (e) => e.attrs && e.attrs.flair >= 15 && e.attrs.teamwork <= 10 },
  { id:"playbook_sponge",    label:"Playbook Sponge",     cat:"Football IQ",   pos:true,  vis:"staffOpinion",
    derive: (e) => e.hidden && e.hidden.coachability >= 16 && e.attrs && e.attrs.anticipation >= 13 },
  { id:"system_dependent",   label:"System-Dependent",    cat:"Football IQ",   pos:null,  vis:"staffOpinion",
    derive: (e) => e.preferences && e.preferences.scheme >= 0.85 && e.attrs && e.attrs.decisions <= 10 },

  // ── Personality / Retention ──────────────────────────────────────────
  { id:"loyal_program_guy",  label:"Loyal Program Guy",   cat:"Personality",   pos:true,  vis:"staffOpinion",
    derive: (e) => e.hidden && e.hidden.loyalty >= 16 },
  { id:"portal_risk",        label:"Portal Risk",         cat:"Personality",   pos:false, vis:"staffOpinion",
    derive: (e) => e.hidden && e.hidden.transferOpenness >= 15 },
  { id:"homebody",           label:"Homebody",            cat:"Personality",   pos:null,  vis:"scouted",
    derive: (e) => e.preferences && e.preferences.distance >= 0.70 },
  { id:"playing_time_driven", label:"Playing-Time Driven", cat:"Personality",  pos:null,  vis:"scouted",
    derive: (e) => e.preferences && e.preferences.playingTime >= 0.85 },
  { id:"money_motivated",    label:"Money-Motivated",     cat:"Personality",   pos:null,  vis:"scouted",
    derive: (e) => e.preferences && e.preferences.nil >= 0.75 },
  { id:"development_focused",label:"Development-Focused", cat:"Personality",   pos:true,  vis:"scouted",
    derive: (e) => e.preferences && e.preferences.coach >= 0.80 && e.hidden && e.hidden.ambition >= 13 },
  { id:"low_drama",          label:"Low Drama",           cat:"Personality",   pos:true,  vis:"staffOpinion",
    derive: (e) => e.hidden && e.hidden.loyalty >= 14 && e.hidden.ambition <= 10 && e.attrs && e.attrs.aggression <= 10 },
  { id:"family_led",         label:"Family-Led Decision", cat:"Personality",   pos:null,  vis:"scouted",
    derive: (e) => e.hidden && e.hidden.familyInfluence >= 15 },
  { id:"brand_builder",      label:"Brand Builder",       cat:"Personality",   pos:null,  vis:"scouted",
    derive: (e) => e.preferences && e.preferences.prestige >= 0.85 && e.preferences.nil >= 0.65 },
  { id:"nfl_or_bust",        label:"NFL-Or-Bust",         cat:"Personality",   pos:null,  vis:"staffOpinion",
    derive: (e) => e.hidden && e.hidden.ambition >= 17 && e.preferences && e.preferences.prestige >= 0.80 },

  // ── Risk ─────────────────────────────────────────────────────────────
  { id:"high_variance_eval", label:"High Variance",       cat:"Risk",          pos:false, vis:"scouted",
    derive: (e) => e.devCurve === "BoomBust" || (e.scoutedHigh && e.scoutedLow && e.scoutedHigh - e.scoutedLow >= 20) },
  { id:"bust_risk",          label:"Bust Risk",           cat:"Risk",          pos:false, vis:"staffOpinion",
    derive: (e) => e.hidden && e.hidden.coachability <= 6 && e.hidden.workEthic <= 8 },
  { id:"transfer_risk",      label:"Transfer Risk",       cat:"Risk",          pos:false, vis:"staffOpinion",
    derive: (e) => e.hidden && e.hidden.transferOpenness >= 14 && e.hidden.loyalty <= 8 },
  { id:"academic_risk",      label:"Academic Risk",       cat:"Risk",          pos:false, vis:"public",
    derive: (e) => e.academicStatus === "At Risk" || e.academicStatus === "Ineligible" },
];

// Visibility threshold: how much scouting unlocks higher-vis traits (0-1)
const TRAIT_VIS_THRESHOLD = { public: 0, scouted: 0.25, staffOpinion: 0.60, hidden: 1.0 };

function clampAttr(v) { return Math.max(1, Math.min(20, Math.round(v || 10))); }
function attrValClass(v) {
  if (v >= 17) return "av-elite";
  if (v >= 13) return "av-high";
  if (v >= 7)  return "av-mid";
  return "av-low";
}
function renderAttrGroup(group, attrs, keySet) {
  const rows = group.keys.map((key) => {
    const val = Number.isInteger(attrs[key]) ? attrs[key] : 10;
    const isKey = keySet && keySet.has(key);
    const cls = attrValClass(val);
    const pct = ((val / 20) * 100).toFixed(1);
    return `<div class="attr-row${isKey ? " key-attr" : ""}">
      <span class="attr-label">${PLAYER_ATTR_LABELS[key]}</span>
      <div class="attr-bar-wrap"><div class="attr-bar-fill ${cls}" style="width:${pct}%"></div></div>
      <span class="attr-val ${cls}">${val}</span>
    </div>`;
  }).join("");
  return `<div class="attr-group"><p class="attr-group-label">${group.label}</p>${rows}</div>`;
}

/**
 * Render attribute group for a prospect with uncertainty shading.
 * Shows a narrow confirmed bar (from scouted low) overlaid by a faded range bar (to scouted high).
 */
function renderProspectAttrGroup(group, posAttrs, scoutedLow, scoutedHigh) {
  const spread = scoutedHigh && scoutedLow ? (scoutedHigh - scoutedLow) : 0;
  const uncertaintyScale = Math.min(1, spread / 10); // 0=exact, 1=totally uncertain
  const rows = group.keys.map((key) => {
    const val = Number.isInteger(posAttrs[key]) ? posAttrs[key] : 10;
    // Attribute may be anywhere in the scouted range; compute possible high/low
    const halfSpread = Math.round((uncertaintyScale * 4));
    const low = Math.max(1, val - halfSpread);
    const high = Math.min(20, val + halfSpread);
    const cls = attrValClass(val);
    const pctLow = ((low / 20) * 100).toFixed(1);
    const pctHigh = ((high / 20) * 100).toFixed(1);
    const valLabel = halfSpread > 0 ? `${low}–${high}` : `${val}`;
    return `<div class="attr-row">
      <span class="attr-label">${POS_ATTR_LABELS[key] || PLAYER_ATTR_LABELS[key] || key}</span>
      <div class="attr-bar-wrap">
        ${halfSpread > 0 ? `<div class="attr-bar-possible" style="width:${pctHigh}%"></div>` : ""}
        <div class="attr-bar-fill ${cls}" style="width:${pctLow}%"></div>
      </div>
      <span class="attr-val ${cls}">${valLabel}</span>
    </div>`;
  }).join("");
  return `<div class="attr-group"><p class="attr-group-label">${group.label}</p>${rows}</div>`;
}
function defaultAttrRecord(keys, baseline = 10) {
  return keys.reduce((record, key) => {
    record[key] = baseline;
    return record;
  }, {});
}
function playerDefaultPosAttrs(position, ovr, random) {
  const spec = POSITION_ATTRS_SPEC[position] || POSITION_ATTRS_SPEC["WR"];
  const base = Math.round((ovr || 60) / 5.5);          // 1-20 scale from 0-99 ovr
  const result = {};
  spec.groups.forEach((group, gi) => {
    group.keys.forEach((key) => {
      // First group (primary technical attrs) closer to base; others slightly lower
      const gPenalty = gi === 0 ? 0 : gi === 1 ? -1 : -2;
      const noise = random ? Math.round((random() - 0.5) * 4) : 0;
      result[key] = Math.max(1, Math.min(20, base + gPenalty + noise));
    });
  });
  return result;
}
function playerDefaultHidden(random) {
  return {
    loyalty:           Math.max(1, Math.min(20, Math.round(10 + (random ? (random() - 0.5) * 10 : 0)))),
    ambition:          Math.max(1, Math.min(20, Math.round(10 + (random ? (random() - 0.5) * 10 : 0)))),
    coachability:      Math.max(1, Math.min(20, Math.round(10 + (random ? (random() - 0.5) * 10 : 0)))),
    workEthic:         Math.max(1, Math.min(20, Math.round(10 + (random ? (random() - 0.5) * 10 : 0)))),
    transferOpenness:  Math.max(1, Math.min(20, Math.round(10 + (random ? (random() - 0.5) * 10 : 0)))),
  };
}
function playerDefaultGenericAttrs(position, ovr, random) {
  // Generic 36-key 1-20 attrs derived from OVR. Key position attrs ride higher.
  const base = Math.round((ovr || 60) / 5.5);
  const result = Object.assign({}, DEFAULT_PLAYER_ATTRS);
  const keySet = KEY_ATTRS_BY_POSITION[position] || new Set();
  PLAYER_ATTRS.forEach((key) => {
    const isKey = keySet.has(key);
    const noise = random ? Math.round((random() - 0.5) * 5) : 0;
    const penalty = isKey ? 0 : -3;
    result[key] = Math.max(1, Math.min(20, base + penalty + noise));
  });
  return result;
}
function renderPosAttrGroup(group, posAttrs) {
  const rows = group.keys.map((key) => {
    const val = Number.isInteger(posAttrs[key]) ? posAttrs[key] : 10;
    const label = POS_ATTR_LABELS[key] || key;
    const cls = attrValClass(val);
    const pct = ((val / 20) * 100).toFixed(1);
    return `<div class="attr-row">
      <span class="attr-label">${label}</span>
      <div class="attr-bar-wrap"><div class="attr-bar-fill ${cls}" style="width:${pct}%"></div></div>
      <span class="attr-val ${cls}">${val}</span>
    </div>`;
  }).join("");
  return `<div class="attr-group"><p class="attr-group-label">${group.label}</p>${rows}</div>`;
}

// ── Trait Cluster Engine ──────────────────────────────────────────────────
/**
 * Derive all matching trait clusters for a player or prospect entity.
 * scoutingDepth 0-1: 0 = just saw them, 0.5 = offered+visited, 1 = full scouting/roster player.
 * Returns array of { id, label, cat, pos, confidence, evidence }.
 */
function deriveTraitClusters(entity, scoutingDepth) {
  if (!entity) return [];
  const depth = scoutingDepth !== undefined ? scoutingDepth : 1; // roster players = fully known
  const clusters = [];
  for (const def of TRAIT_CLUSTER_DEFS) {
    const threshold = TRAIT_VIS_THRESHOLD[def.vis] || 0;
    if (depth < threshold) continue;
    let matches = false;
    try { matches = def.derive(entity); } catch (_) { continue; }
    if (!matches) continue;
    // Confidence: scouted traits get uncertainty noise; public traits are high-conf
    const baseConf = def.vis === "public" ? 0.90 : def.vis === "scouted" ? 0.62 + depth * 0.28 : depth * 0.80;
    clusters.push({ id: def.id, label: def.label, cat: def.cat, pos: def.pos, confidence: Math.min(0.98, baseConf) });
  }
  return clusters;
}

/** Generate evidence strings for a single cluster given the entity */
function clusterEvidence(def, entity) {
  const ev = [];
  if (entity.hidden) {
    if (entity.hidden.workEthic >= 15) ev.push("High work ethic noted by staff");
    if (entity.hidden.coachability >= 15) ev.push("Responds well to coaching feedback");
    if (entity.hidden.loyalty >= 16) ev.push("Strong program loyalty reported");
    if (entity.hidden.transferOpenness >= 15) ev.push("Shows interest in exploring options");
    if (entity.hidden.ambition >= 16) ev.push("High professional ambition");
  }
  if (entity.attrs) {
    if (entity.attrs.composure >= 15) ev.push("Composed under game pressure");
    if (entity.attrs.acceleration >= 15) ev.push("Elite acceleration in camp tape");
    if (entity.attrs.anticipation >= 15) ev.push("Fast reading of defensive keys");
  }
  if (entity.devCurve) ev.push(`Dev curve: ${DEV_CURVE_LABELS[entity.devCurve] || entity.devCurve}`);
  if (entity.potentialGrade) ev.push(`Projected ceiling: ${entity.potentialGrade}`);
  return ev.slice(0, 3);
}

/** Render an array of trait cluster objects as badges */
const TRAIT_EXTRA_DESC = {
  gym_rat:             "Among the fastest developers physically. Weight room production exceeds expectations.",
  studious:            "Absorbs playbooks quickly. Coach trust and role clarity build faster than average.",
  coachs_favorite:     "Maximal coachability. Staff unity bonus for playing time decisions.",
  portal_risk:         "Elevated transfer probability. Monitor playing time and promises closely.",
  bust_risk:           "Poor habits and mindset. Development may stall or reverse without intervention.",
  gamer:               "Composure holds in high-stakes moments. Playoff and rivalry performances get a boost.",
  alpha:               "Natural leader. Positive morale effect on teammates when performing well.",
  high_ceiling:        "Projected to develop significantly beyond current rating. Trust the process.",
  boom_bust:           "Wide projection cone — can overperform or underperform. High variance.",
  homebody:            "Strong distance preference. Unlikely to leave region voluntarily.",
  playing_time_driven: "Primary driver is immediate starts. Unhappy behind seniors on the depth chart.",
  nfl_or_bust:         "NFL pathway is the stated priority. Prestige and exposure matter greatly.",
  transfer_risk:       "One suboptimal season could trigger a transfer request.",
  academic_risk:       "Academic eligibility flags present. May miss games without active intervention.",
  early_bloomer:       "Peaks early. High production in years 1-2. Tails off by senior season.",
  late_developer:      "Slow to show full potential. Trust the development — big year-3/4 jump expected.",
  steady_hand:         "Doesn't rattle. Consistent performer regardless of game environment.",
  shrinks_pressure:    "Known to underperform in big moments. Avoid high-leverage roles.",
  emotional_spark:     "Can ignite a team — or ignite a locker room the wrong way. Handle carefully.",
  loyal_program_guy:   "Program loyalty is high. Transfer risk negligible if promises are kept.",
  money_motivated:     "NIL is a primary factor. Competing schools will target with offers.",
  quick_processor:     "Reads defenses and situations faster than peers. High football IQ.",
  slow_processor:      "Decision-making lags in live situations. Needs simplified assignments.",
  instinctive:         "Plays off instinct before the snap. Antici­pation is a major asset.",
  twitchy:             "Explosive first-step athlete. Stands out visually at any exposure event.",
  heavy_feet:          "Limited change-of-direction quickness. Scheme fit is critical.",
  durability_concern:  "Injury history or physical fragility noted. Monitor snap count.",
};

function traitClusterBadges(clusters) {
  if (!clusters || !clusters.length) return '<span class="trait-empty">No traits identified yet</span>';
  return clusters.map((c) => {
    const cls = c.pos === true ? "tc-pos" : c.pos === false ? "tc-neg" : "tc-neutral";
    const confPct = Math.round(c.confidence * 100);
    return `<span class="trait-badge ${cls}" data-trait-link="${c.id}" title="${c.cat} · ${confPct}% confidence">${c.label}</span>`;
  }).join(" ");
}

function traitDetailCard(traitId) {
  const def = TRAIT_CLUSTER_DEFS.find((d) => d.id === traitId);
  if (!def) return "";
  const polarityCls = def.pos === true ? "tc-pos" : def.pos === false ? "tc-neg" : "tc-neutral";
  const polarityLabel = def.pos === true ? "Positive" : def.pos === false ? "Negative" : "Neutral";
  const visTierLabel = { public: "Always visible", scouted: "Visible at 25%+ scouting", staffOpinion: "Requires 60%+ staff confidence", hidden: "Fully hidden" };
  const extraDesc = TRAIT_EXTRA_DESC[traitId] || "";
  return `<div class="trait-popover" data-for-trait="${traitId}">
    <div class="trait-popover-header">
      <span class="trait-badge ${polarityCls}">${def.label}</span>
      <span class="trait-popover-cat">${def.cat}</span>
    </div>
    ${extraDesc ? `<p class="trait-popover-desc">${extraDesc}</p>` : ""}
    <div class="trait-popover-meta">
      <span class="${polarityCls}">${polarityLabel}</span>
      <span>${visTierLabel[def.vis] || def.vis}</span>
    </div>
  </div>`;
}

/** Group trait badges by category */
function traitClustersGrouped(clusters) {
  if (!clusters || !clusters.length) return '<span class="trait-empty">No traits identified yet.</span>';
  const groups = {};
  clusters.forEach((c) => { (groups[c.cat] = groups[c.cat] || []).push(c); });
  return Object.entries(groups).map(([cat, items]) =>
    `<div class="trait-group">
      <p class="trait-group-label">${cat}</p>
      <div class="trait-badge-row">${traitClusterBadges(items)}</div>
    </div>`
  ).join("");
}

/** Compute visible trait clusters for a prospect based on scouting actions taken */
function prospectScoutingDepth(prospect) {
  if (!prospect) return 0;
  const visitCount = Array.isArray(prospect.visitHistory) ? prospect.visitHistory.length : 0;
  const scoutWidth = typeof prospect.scoutedHigh === "number" && typeof prospect.scoutedLow === "number"
    ? Math.max(0, 30 - (prospect.scoutedHigh - prospect.scoutedLow)) / 30   // narrower range = more scouted
    : 0;
  const baseDepth = prospect.status === "Committed" || prospect.status === "Enrolled" ? 0.85
    : visitCount >= 1 ? 0.55
    : prospect.status === "Offered" ? 0.30
    : 0.10;
  return Math.min(0.95, baseDepth + scoutWidth * 0.20);
}

function attrKeyToLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

// ── Creator Tools ────────────────────────────────────────────────────────
/** Unique ID for user-created entities */
function generateCreatorId(prefix) {
  return `${prefix}-c${Date.now().toString(36)}-${Math.floor(Math.random() * 9999)}`;
}

/** Collect creator form field values from currently rendered form */
function readCreatorForm() {
  const fields = {};
  content.querySelectorAll("[data-creator-field]").forEach((el) => {
    fields[el.dataset.creatorField] = el.value !== undefined ? el.value : el.textContent;
  });
  return fields;
}

/**
 * Build a player (roster or prospect) from creator form fields.
 * Returns { isProspect: bool, entity: {...} }.
 */
function buildCreatedPlayer(fields) {
  const pos = fields.position || "WR";
  const ovr = Math.max(40, Math.min(99, Number(fields.ovr) || 72));
  const mode = fields.mode || "realistic";
  const seed = `creator:${fields.name || ""}:${pos}:${ovr}:${Date.now()}`;
  const rng = createSeededRandom(seed);
  const hidden = playerDefaultHidden(rng);
  const posAttrs = playerDefaultPosAttrs(pos, ovr, rng);

  if (mode === "sandbox") {
    // sandbox: inflate key pos attrs
    const spec = POSITION_ATTRS_SPEC[pos] || POSITION_ATTRS_SPEC["WR"];
    spec.groups[0].keys.forEach((k) => { posAttrs[k] = Math.min(20, posAttrs[k] + 3); });
  }

  const devCurve = fields.devCurve || "Normal";
  const potentialGrade = fields.potentialGrade || "B";
  const year = fields.year || "FR";
  const remainingSeasons = year === "SR" ? 1 : year === "JR" ? 2 : year === "SO" ? 3 : 4;
  const stars = Math.max(1, Math.min(5, Number(fields.stars) || Math.max(2, Math.round(ovr / 20))));
  const asProspect = fields.addAs === "prospect";

  if (asProspect) {
    const prospect = {
      id: generateCreatorId("prospect"),
      name: fields.name || "Created Prospect",
      position: pos,
      stars,
      gradYear: 2029,
      hometown: fields.hometown || "Created",
      state: fields.state || "—",
      highSchool: "—",
      status: "Available",
      interest: 50,
      commitChance: 20,
      scoutConfidence: 85,
      ovr,
      pot: Math.min(99, ovr + 5),
      devCurve,
      potentialGrade,
      attrs: posAttrs,
      hidden,
      posAttrs,
      scoutedLow: Math.max(55, ovr - 5),
      scoutedHigh: Math.min(99, ovr + 5),
      visitHistory: [],
      offerHistory: [],
      _created: true,
    };
    return { isProspect: true, entity: prospect };
  }

  const player = {
    id: generateCreatorId("player"),
    name: fields.name || "Created Player",
    position: pos,
    positions: [pos],
    year,
    ovr,
    pot: Math.min(99, ovr + 5),
    schemeFit: "Created",
    archetype: fields.archetype || "General",
    academicStatus: "On track",
    transferRisk: "Low",
    morale: "High",
    developmentFocus: "Balanced",
    redshirtIntent: "Undecided",
    devCurve,
    potentialGrade,
    hidden,
    attrs: posAttrs,
    posAttrs,
    eligibility: {
      seasonsPlayed: 0,
      remainingSeasons,
      gamesPlayedThisSeason: 0,
      redshirtUsed: false,
    },
    _created: true,
  };
  return { isProspect: false, entity: player };
}

/** Build a coach profile from creator form fields */
function buildCreatedCoach(fields) {
  const gradeToRating = { "A+": 18, A: 17, "B+": 15, B: 14, "C+": 12, C: 11 };
  const recBase = gradeToRating[fields.recruitingGrade] || 13;
  const devBase = gradeToRating[fields.developmentGrade] || 13;
  const role = fields.role || "Position Coach";
  const jitter = () => Math.round((Math.random() - 0.5) * 3);
  const devGroup = fields.devGroup || "";
  return {
    id: generateCreatorId("coach"),
    name: fields.name || "Created Coach",
    role,
    programId: currentProgram().id,
    devGroups: devGroup ? [devGroup] : [],
    attrs: {
      recruitment: Math.min(20, recBase + jitter()),
      scoutingCurrent: Math.min(20, recBase - 1 + jitter()),
      scoutingPotential: Math.min(20, recBase - 1 + jitter()),
      skillDevelopment: Math.min(20, devBase + jitter()),
      qbDevelopment: Math.min(20, devBase + (role === "QB Coach" ? 2 : -1) + jitter()),
      motivation: Math.min(20, 12 + jitter()),
      teaching: Math.min(20, devBase + jitter()),
      manManagement: Math.min(20, 12 + jitter()),
      discipline: Math.min(20, 12 + jitter()),
      determination: Math.min(20, 13 + jitter()),
      pressureHandling: Math.min(20, 12 + jitter()),
      loyalty: Math.min(20, 13 + jitter()),
      ambition: Math.min(20, 11 + jitter()),
    },
    _created: true,
  };
}

// ── Creator Form Renderers ───────────────────────────────────────────────
const CREATOR_POSITIONS = ["QB","HB","WR","TE","LT","OT","OG","C","EDGE","DE","DT","LB","CB","S","DB","K","P"];
const CREATOR_YEARS = ["FR","SO","JR","SR","GR"];
const CREATOR_DEV_CURVES = ["Early","Normal","Late","BoomBust"];
const CREATOR_POTENTIAL_GRADES = ["A+","A","A-","B+","B","B-","C+","C"];
const CREATOR_GRADES = ["A+","A","B+","B","C+","C"];
const CREATOR_COACH_ROLES = ["Head Coach","Offensive Coordinator","Defensive Coordinator","QB Coach","WR Coach","RB Coach","TE Coach","OL Coach","DL Coach","LB Coach","DB Coach","ST Coach","Recruiting Coordinator","Strength Coach"];
const CREATOR_ARCHETYPES = ["General","Field General","Dual-Threat","Speed Cutter","Power Back","Possession Receiver","Speed Burner","Blocking Back","Pocket Passer","Scrambler","Pass Rusher","Run Stuffer","Coverage Corner","Press Corner","Single High Safety","Box Safety","Versatile Backer","Pass Coverage LB","Mauler"];

function creatorSelect(fieldName, options, defaultVal, label, displayMap) {
  const opts = options.map((o) => {
    const display = (displayMap && displayMap[o]) || o;
    return `<option value="${o}"${o === defaultVal ? " selected" : ""}>${display}</option>`;
  }).join("");
  return `<label class="creator-label">${label}<select data-creator-field="${fieldName}" class="creator-input">${opts}</select></label>`;
}

function creatorInput(fieldName, placeholder, label, type, defaultVal) {
  const t = type || "text";
  const val = defaultVal !== undefined ? ` value="${defaultVal}"` : "";
  return `<label class="creator-label">${label}<input data-creator-field="${fieldName}" class="creator-input" type="${t}" placeholder="${placeholder}"${val}></label>`;
}

function creatorPlayerForm() {
  return `<div class="creator-form" id="creator-player-form">
    <div class="creator-form-grid">
      ${creatorInput("name", "e.g. Jamal Wright", "Full Name", "text", "")}
      ${creatorSelect("position", CREATOR_POSITIONS, "WR", "Position")}
      ${creatorSelect("year", CREATOR_YEARS, "FR", "Class Year")}
      ${creatorSelect("archetype", CREATOR_ARCHETYPES, "General", "Archetype")}
      ${creatorInput("ovr", "72", "Base OVR (40–99)", "number", "72")}
      ${creatorSelect("devCurve", CREATOR_DEV_CURVES, "Normal", "Dev Curve", { Early: "Early Bloomer", Normal: "Steady", Late: "Late Bloomer", BoomBust: "Boom/Bust" })}
      ${creatorSelect("potentialGrade", CREATOR_POTENTIAL_GRADES, "B", "Potential Grade")}
      ${creatorInput("stars", "3", "Stars (only used if added as Prospect)", "number", "3")}
      ${creatorInput("hometown", "e.g. Austin, TX", "Hometown", "text", "")}
      ${creatorSelect("addAs", ["roster player", "prospect"], "roster player", "Add As")}
      ${creatorSelect("mode", ["realistic", "sandbox"], "realistic", "Balance Mode")}
    </div>
    <p class="creator-note">
      <strong>Realistic</strong> locks attributes to balanced ranges. <strong>Sandbox</strong> boosts key attributes.
      Use "prospect" to add them to the recruiting board first.
    </p>
    <button class="action-btn" data-creator-action="submit-player">Add to Roster / Board</button>
  </div>`;
}

function creatorCoachForm() {
  return `<div class="creator-form" id="creator-coach-form">
    <div class="creator-form-grid">
      ${creatorInput("name", "e.g. Marcus Reed", "Full Name", "text", "")}
      ${creatorSelect("role", CREATOR_COACH_ROLES, "Position Coach", "Role")}
      ${creatorSelect("devGroup", ["", ...CREATOR_POSITIONS], "", "Dev Group (position)")}
      ${creatorSelect("recruitingGrade", CREATOR_GRADES, "B", "Recruiting Grade")}
      ${creatorSelect("developmentGrade", CREATOR_GRADES, "B", "Development Grade")}
    </div>
    <p class="creator-note">
      Coach will be added to your position coaches list. Set a <strong>Dev Group</strong> to assign recruiting and development responsibilities.
    </p>
    <button class="action-btn" data-creator-action="submit-coach">Add Coach</button>
  </div>`;
}

function creatorCreatedPanel() {
  const createdPlayers = (data.playerProfiles || []).filter((p) => p._created);
  const createdProspects = (data.prospectProfiles || []).filter((p) => p._created);
  const createdCoaches = (data.positionCoaches || []).filter((c) => c._created);
  const total = createdPlayers.length + createdProspects.length + createdCoaches.length;
  if (!total) {
    return `<p class="creator-note" style="margin-top:12px">No created entities yet. Use the Player or Coach tabs to add custom entities.</p>`;
  }
  const playerRows = createdPlayers.map((p) =>
    `<div class="creator-entity-row"><span>${p.name}</span><span>${p.position} · ${p.year} · OVR ${p.ovr}</span><span class="badge-pill">Roster</span></div>`
  ).join("");
  const prospectRows = createdProspects.map((p) =>
    `<div class="creator-entity-row"><span>${p.name}</span><span>${p.position} · ${p.stars}★ · OVR ${p.ovr}</span><span class="badge-pill">Prospect</span></div>`
  ).join("");
  const coachRows = createdCoaches.map((c) =>
    `<div class="creator-entity-row"><span>${c.name}</span><span>${c.role} · ${(c.devGroups || []).join(", ") || "No group"}</span><span class="badge-pill">Coach</span></div>`
  ).join("");
  return `<div class="creator-entity-list">
    ${playerRows}${prospectRows}${coachRows}
  </div>`;
}

function creatorPanel() {
  const tabs = [
    { id: "player", label: "Create Player" },
    { id: "coach", label: "Create Coach" },
    { id: "created", label: "Created Entities" },
  ];
  const tabBar = tabs.map((t) =>
    `<button class="profile-tab${creatorTab === t.id ? " active-tab" : ""}" data-creator-tab="${t.id}">${t.label}</button>`
  ).join("");
  const body = creatorTab === "player" ? creatorPlayerForm()
    : creatorTab === "coach" ? creatorCoachForm()
    : creatorCreatedPanel();
  return `<div class="profile-layout">
    <div class="profile-tabs">${tabBar}</div>
    <div class="creator-body">${body}</div>
  </div>`;
}

function profileLookup(list, profileId) {
  if (!Array.isArray(list) || !isNonEmptyString(profileId)) return null;
  return list.find((item) => item && item.id === profileId) || null;
}
function currentProgram() {
  return programById(career.programId);
}
function currentCoachProfile() {
  const program = currentProgram();
  return profileLookup(data.coachProfiles, program.headCoachProfileId);
}
function currentSchoolProfile() {
  const program = currentProgram();
  return profileLookup(data.schoolProfiles, program.schoolProfileId);
}
function currentStadiumProfile() {
  const program = currentProgram();
  return profileLookup(data.stadiumProfiles, program.stadiumProfileId);
}
function titleCaseFromCamel(key) {
  if (typeof key !== "string") return String(key || "");
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}
function topAttributeRows(attrs, keys, count) {
  if (!isRecord(attrs)) return [];
  return keys
    .map((key) => [titleCaseFromCamel(key), Number.isInteger(attrs[key]) ? attrs[key] : 10])
    .sort((left, right) => right[1] - left[1])
    .slice(0, count);
}
function validateAttributeRecord(record, keys, path, errors) {
  if (!isRecord(record)) {
    errors.push(`${path} must be an object`);
    return;
  }
  keys.forEach((key) => {
    if (!Number.isInteger(record[key]) || record[key] < 1 || record[key] > 20) {
      errors.push(`${path}.${key} must be an integer from 1 to 20`);
    }
  });
}
function validateEntityProfiles(candidate, path, expectedAttrs, requiredKeys, errors) {
  if (!Array.isArray(candidate) || !candidate.length) {
    errors.push(`${path} must be a non-empty array`);
    return;
  }
  const ids = new Set();
  candidate.forEach((entry, index) => {
    const entryPath = `${path}[${index}]`;
    if (!isRecord(entry)) {
      errors.push(`${entryPath} must be an object`);
      return;
    }
    requireString(entry, entryPath, "id", errors);
    requiredKeys.forEach((key) => requireString(entry, entryPath, key, errors));
    validateAttributeRecord(entry.attrs, expectedAttrs, `${entryPath}.attrs`, errors);
    if (isNonEmptyString(entry.id)) {
      if (ids.has(entry.id)) errors.push(`${entryPath}.id must be unique`);
      ids.add(entry.id);
    }
  });
}
function validateEntityGraph(candidate, errors) {
  if (!isRecord(candidate) || !Array.isArray(candidate.programs) || !isRecord(candidate.data)) return;
  const coachById = new Set(Array.isArray(candidate.data.coachProfiles) ? candidate.data.coachProfiles.map((item) => item.id) : []);
  const schoolById = new Set(Array.isArray(candidate.data.schoolProfiles) ? candidate.data.schoolProfiles.map((item) => item.id) : []);
  const stadiumById = new Set(Array.isArray(candidate.data.stadiumProfiles) ? candidate.data.stadiumProfiles.map((item) => item.id) : []);

  candidate.programs.forEach((program, index) => {
    const path = `programs[${index}]`;
    if (!isRecord(program)) return;
    if (!isNonEmptyString(program.headCoachProfileId) || !coachById.has(program.headCoachProfileId)) {
      errors.push(`${path}.headCoachProfileId must match data.coachProfiles.id`);
    }
    if (!isNonEmptyString(program.schoolProfileId) || !schoolById.has(program.schoolProfileId)) {
      errors.push(`${path}.schoolProfileId must match data.schoolProfiles.id`);
    }
    if (!isNonEmptyString(program.stadiumProfileId) || !stadiumById.has(program.stadiumProfileId)) {
      errors.push(`${path}.stadiumProfileId must match data.stadiumProfiles.id`);
    }
  });
}

validateWorldOrFail(world);

const career = clone(world.career);
const programs = clone(world.programs);
const calendar = clone(world.calendar);
const data = clone(world.data);
let isDirty = true;
let careerStarted = false;
let selectedPlayerId = null;
let selectedProspectId = null;
let creatorTab = "player"; // "player" | "coach" | "created"

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function programById(programId) {
  return programs.find((program) => program.id === programId) || programs[0];
}

function createSeededRandom(seed) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return () => {
    hash += 0x6d2b79f5;
    let value = hash;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function seededRange(random, min, max) {
  return min + Math.floor(random() * (max - min + 1));
}

function clampRating(value) {
  return Math.max(1, Math.min(99, value));
}

function generateCareerProfile(seed, program) {
  const random = createSeededRandom(`${seed}:${program.id}`);
  const prestige = clampRating(program.basePrestige + seededRange(random, -3, 4));
  const fanConfidence = clampRating(program.baseFanConfidence + seededRange(random, -6, 7));
  const donorConfidence = clampRating(program.baseDonorConfidence + seededRange(random, -5, 8));
  const academicStability = clampRating(program.baseAcademicStability + seededRange(random, -4, 5));
  const recruitingClass = seededRange(random, 14, 38);
  const nilPool = (2.4 + random() * 2.2).toFixed(1);
  const hash = `${program.id}-${prestige}-${fanConfidence}-${donorConfidence}-${academicStability}-${recruitingClass}-${nilPool}`;

  return {
    prestige,
    fanConfidence,
    donorConfidence,
    academicStability,
    recruitingClass,
    nilPool,
    hash,
  };
}

function applyGeneratedProgramState() {
  const program = programById(career.programId);
  const profile = generateCareerProfile(career.seed, program);
  career.school = program.name;
  career.record = program.record;
  career.generatedProfile = profile;
  career.worldHash = profile.hash;
  ensureCareerSandboxState();
}

function defaultRulesProfile() {
  return {
    presetId: "careerClassic",
    ...clone(SANDBOX_RULE_PRESETS.careerClassic),
  };
}

function clampInteger(value, min, max, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

function normalizeRulesProfile(candidate) {
  const base = defaultRulesProfile();
  const source = isRecord(candidate) ? candidate : {};
  const presetId = isNonEmptyString(source.presetId) && SANDBOX_RULE_PRESETS[source.presetId]
    ? source.presetId
    : base.presetId;
  return {
    presetId,
    recruitingActionPoints: clampInteger(source.recruitingActionPoints, 4, 14, base.recruitingActionPoints),
    retentionActionPoints: clampInteger(source.retentionActionPoints, 2, 10, base.retentionActionPoints),
    portalExceptionAdvances: clampInteger(source.portalExceptionAdvances, 0, 5, base.portalExceptionAdvances),
    scoringEnvironmentPercent: clampInteger(source.scoringEnvironmentPercent, 70, 150, base.scoringEnvironmentPercent),
    volatilityPercent: clampInteger(source.volatilityPercent, 70, 150, base.volatilityPercent),
    tacticalImpactPercent: clampInteger(source.tacticalImpactPercent, 70, 150, base.tacticalImpactPercent),
    injuryCadencePercent: clampInteger(source.injuryCadencePercent, 70, 160, base.injuryCadencePercent),
    nilVolatilityPercent: clampInteger(source.nilVolatilityPercent, 70, 160, base.nilVolatilityPercent),
    progressionPacePercent: clampInteger(source.progressionPacePercent, 70, 160, base.progressionPacePercent),
    transferPopulationPercent: clampInteger(source.transferPopulationPercent, 60, 180, base.transferPopulationPercent),
    realityAnchorPercent: clampInteger(source.realityAnchorPercent, 60, 140, base.realityAnchorPercent),
  };
}

function ensureCareerSandboxState() {
  if (!isRecord(career.rulesProfile)) {
    career.rulesProfile = defaultRulesProfile();
  }
  career.rulesProfile = normalizeRulesProfile(career.rulesProfile);
  if (!isNonEmptyString(career.experienceMode)) career.experienceMode = "Sandbox";
}

function rulesProfile() {
  ensureCareerSandboxState();
  return career.rulesProfile;
}

function ruleValue(key, fallback) {
  const profile = rulesProfile();
  const value = profile[key];
  return Number.isFinite(value) ? value : fallback;
}

function validateWorldOrFail(candidate) {
  const errors = validateWorld(candidate);
  if (errors.length) {
    const message = `Content pack validation failed:\n- ${errors.join("\n- ")}`;
    showStartupError(message);
    throw new Error(message);
  }
}

function validateWorld(candidate) {
  const errors = [];
  if (!isRecord(candidate)) {
    return ["window.CGM_DEMO_WORLD must be an object loaded before app.js"];
  }

  validatePhaseOrder(candidate.phaseOrder, errors);
  validatePrograms(candidate.programs, errors);
  validateCareer(candidate.career, errors);
  validateCalendar(candidate.calendar, errors);
  validateData(candidate.data, errors);
  validateCareerCalendarLink(candidate, errors);
  validateNotificationIds(candidate, errors);
  validateEntityGraph(candidate, errors);
  return errors;
}

function validateCareer(candidate, errors) {
  if (!isRecord(candidate)) {
    errors.push("career must be an object");
    return;
  }
  requireString(candidate, "career", "seed", errors);
  requireString(candidate, "career", "coachName", errors);
  requireString(candidate, "career", "programId", errors);
  requireString(candidate, "career", "school", errors);
  requireString(candidate, "career", "record", errors);
  if (candidate.startYear !== undefined && (!Number.isInteger(candidate.startYear) || candidate.startYear < 2010 || candidate.startYear > 2035)) {
    errors.push("career.startYear must be an integer from 2010 to 2035");
  }
  requireInteger(candidate, "career", "currentEventIndex", errors);
  requireInteger(candidate, "career", "advanceCount", errors);
}

function validatePhaseOrder(candidate, errors) {
  if (!Array.isArray(candidate) || !candidate.length) {
    errors.push("phaseOrder must be a non-empty array");
    return;
  }
  candidate.forEach((phase, index) => {
    if (!isNonEmptyString(phase)) errors.push(`phaseOrder[${index}] must be a non-empty string`);
  });
}

function validatePrograms(candidate, errors) {
  if (!Array.isArray(candidate) || !candidate.length) {
    errors.push("programs must be a non-empty array");
    return;
  }
  const ids = new Set();
  candidate.forEach((program, index) => {
    const path = `programs[${index}]`;
    if (!isRecord(program)) {
      errors.push(`${path} must be an object`);
      return;
    }
    requireString(program, path, "id", errors);
    requireString(program, path, "name", errors);
    requireString(program, path, "shortName", errors);
    requireString(program, path, "crest", errors);
    requireString(program, path, "record", errors);
    requireString(program, path, "rival", errors);
    requireString(program, path, "headCoachProfileId", errors);
    requireString(program, path, "schoolProfileId", errors);
    requireString(program, path, "stadiumProfileId", errors);
    ["basePrestige", "baseFanConfidence", "baseDonorConfidence", "baseAcademicStability"].forEach((key) => {
      if (!Number.isInteger(program[key]) || program[key] < 1 || program[key] > 99) {
        errors.push(`${path}.${key} must be an integer from 1 to 99`);
      }
    });
    if (isNonEmptyString(program.id)) {
      if (ids.has(program.id)) errors.push(`program id "${program.id}" is duplicated`);
      ids.add(program.id);
    }
  });
}

function validateCalendar(candidate, errors) {
  if (!Array.isArray(candidate) || !candidate.length) {
    errors.push("calendar must be a non-empty array");
    return;
  }

  candidate.forEach((event, index) => {
    const path = `calendar[${index}]`;
    if (!isRecord(event)) {
      errors.push(`${path} must be an object`);
      return;
    }
    requireString(event, path, "id", errors);
    requireString(event, path, "phase", errors);
    if (isNonEmptyString(event.phase) && !candidatePhaseSet().has(event.phase)) {
      errors.push(`${path}.phase must exist in phaseOrder`);
    }
    requireString(event, path, "dateLabel", errors);
    requireString(event, path, "weekLabel", errors);
    requireString(event, path, "nextEvent", errors);
    validateTupleRows(event.agenda, `${path}.agenda`, 3, errors);
    if (event.notifications !== undefined) {
      validateNotifications(event.notifications, `${path}.notifications`, errors);
    }
  });
}

function validateData(candidate, errors) {
  if (!isRecord(candidate)) {
    errors.push("data must be an object");
    return;
  }

  validateNotifications(candidate.notifications, "data.notifications", errors);
  validateTupleRows(candidate.roster, "data.roster", 5, errors);
  validateTupleRows(candidate.recruits, "data.recruits", 5, errors);
  validateTupleRows(candidate.portal, "data.portal", 5, errors);
  validateTupleRows(candidate.outgoingRisk, "data.outgoingRisk", 5, errors);
  validateTupleRows(candidate.schedule, "data.schedule", 5, errors);
  validateTupleRows(candidate.standings, "data.standings", 5, errors);
  validateTupleRows(candidate.staff, "data.staff", 4, errors);
  validateTupleRows(candidate.staffOpenings, "data.staffOpenings", 2, errors);
  validateTupleRows(candidate.facilities, "data.facilities", 5, errors);
  validateTupleRows(candidate.history, "data.history", 5, errors);
  validateEntityProfiles(candidate.coachProfiles, "data.coachProfiles", COACH_ATTRS, ["name", "programId", "role"], errors);
  validateEntityProfiles(candidate.schoolProfiles, "data.schoolProfiles", SCHOOL_ATTRS, ["name", "programId", "conference"], errors);
  validateEntityProfiles(candidate.stadiumProfiles, "data.stadiumProfiles", STADIUM_ATTRS, ["name", "programId", "city"], errors);
  validatePlayerProfiles(candidate.playerProfiles, errors);
  validateProspectProfiles(candidate.prospectProfiles, errors);
  validatePlayerDecisions(candidate.playerDecisions, errors);
  validateRecruitingState(candidate.recruitingState, errors);
  validatePortalState(candidate.portalState, errors);
  validateRetentionState(candidate.retentionState, errors);
  validateBenefitState(candidate.benefitState, errors);
  validateSeasonState(candidate.seasonState, errors);
  validatePressureState(candidate.pressureState, errors);
  validateCultureState(candidate.cultureState, errors);
  validateFacilitiesState(candidate.facilitiesState, errors);
  validateDepthChartState(candidate.depthChart, errors);
  validateStaffCandidates(candidate.staffCandidates, errors);
  validateViewModels(candidate.viewModels, errors);
}

function validateDepthChartState(candidate, errors) {
  if (!isRecord(candidate)) {
    errors.push("data.depthChart must be an object");
    return;
  }
  Object.keys(DEPTH_SLOT_POSITION).forEach((slot) => {
    if (!isNonEmptyString(candidate[slot])) {
      errors.push(`data.depthChart.${slot} must be a non-empty player id`);
    }
  });
}

function validateStaffCandidates(candidate, errors) {
  if (!isRecord(candidate)) {
    errors.push("data.staffCandidates must be an object");
    return;
  }
  Object.keys(candidate).forEach((role) => {
    const rows = candidate[role];
    if (!Array.isArray(rows) || !rows.length) {
      errors.push(`data.staffCandidates.${role} must be a non-empty array`);
      return;
    }
    rows.forEach((row, index) => {
      if (!Array.isArray(row) || row.length !== 3) {
        errors.push(`data.staffCandidates.${role}[${index}] must be [name, specialty, grade]`);
      }
    });
  });
}

function validateProspectProfiles(candidate, errors) {
  if (!Array.isArray(candidate) || !candidate.length) {
    errors.push("data.prospectProfiles must be a non-empty array");
    return;
  }
  const ids = new Set();
  candidate.forEach((prospect, index) => {
    const path = `data.prospectProfiles[${index}]`;
    if (!isRecord(prospect)) {
      errors.push(`${path} must be an object`);
      return;
    }
    requireString(prospect, path, "id", errors);
    requireString(prospect, path, "name", errors);
    requireString(prospect, path, "position", errors);
    requireString(prospect, path, "stars", errors);
    requireInteger(prospect, path, "interest", errors);
    requireInteger(prospect, path, "grade", errors);
    requireString(prospect, path, "pipeline", errors);
    requireString(prospect, path, "status", errors);
    if (prospect.scoutConfidence !== undefined) requireInteger(prospect, path, "scoutConfidence", errors);
    if (prospect.needFit !== undefined) requireInteger(prospect, path, "needFit", errors);
    if (prospect.commitChance !== undefined) requireInteger(prospect, path, "commitChance", errors);
    if (prospect.commitmentStatus !== undefined) requireString(prospect, path, "commitmentStatus", errors);
    if (prospect.priority !== undefined) requireString(prospect, path, "priority", errors);
    if (prospect.classYear !== undefined) requireString(prospect, path, "classYear", errors);
    if (prospect.offered !== undefined) requireBoolean(prospect, path, "offered", errors);
    if (prospect.visited !== undefined) requireBoolean(prospect, path, "visited", errors);
    if (prospect.committedToUs !== undefined) requireBoolean(prospect, path, "committedToUs", errors);
    if (isNonEmptyString(prospect.id)) {
      if (ids.has(prospect.id)) errors.push(`${path}.id must be unique`);
      ids.add(prospect.id);
    }
  });
}

function validatePlayerProfiles(candidate, errors) {
  if (!Array.isArray(candidate) || !candidate.length) {
    errors.push("data.playerProfiles must be a non-empty array");
    return;
  }
  const ids = new Set();
  candidate.forEach((player, index) => {
    const path = `data.playerProfiles[${index}]`;
    if (!isRecord(player)) {
      errors.push(`${path} must be an object`);
      return;
    }
    requireString(player, path, "id", errors);
    requireString(player, path, "name", errors);
    requireString(player, path, "position", errors);
    requireString(player, path, "year", errors);
    requireInteger(player, path, "ovr", errors);
    requireInteger(player, path, "pot", errors);
    requireString(player, path, "schemeFit", errors);
    requireString(player, path, "developmentFocus", errors);
    requireString(player, path, "redshirtIntent", errors);
    if (!isRecord(player.eligibility)) {
      errors.push(`${path}.eligibility must be an object`);
    } else {
      requireInteger(player.eligibility, `${path}.eligibility`, "seasonsPlayed", errors);
      requireInteger(player.eligibility, `${path}.eligibility`, "remainingSeasons", errors);
      requireInteger(player.eligibility, `${path}.eligibility`, "gamesPlayedThisSeason", errors);
      requireBoolean(player.eligibility, `${path}.eligibility`, "redshirtUsed", errors);
    }
    if (isNonEmptyString(player.id)) {
      if (ids.has(player.id)) errors.push(`${path}.id must be unique`);
      ids.add(player.id);
    }
  });
}

function validatePlayerDecisions(candidate, errors) {
  if (candidate === undefined) return;
  if (!isRecord(candidate)) {
    errors.push("data.playerDecisions must be an object");
    return;
  }
  Object.keys(candidate).forEach((playerId) => {
    const entry = candidate[playerId];
    if (!isRecord(entry)) {
      errors.push(`data.playerDecisions.${playerId} must be an object`);
      return;
    }
    if (entry.redshirtIntent !== undefined && !isNonEmptyString(entry.redshirtIntent)) {
      errors.push(`data.playerDecisions.${playerId}.redshirtIntent must be a non-empty string`);
    }
    if (entry.developmentFocus !== undefined && !isNonEmptyString(entry.developmentFocus)) {
      errors.push(`data.playerDecisions.${playerId}.developmentFocus must be a non-empty string`);
    }
    if (entry.gamesPlayedThisSeason !== undefined && !Number.isInteger(entry.gamesPlayedThisSeason)) {
      errors.push(`data.playerDecisions.${playerId}.gamesPlayedThisSeason must be an integer`);
    }
  });
}

function validateRecruitingState(candidate, errors) {
  if (!isRecord(candidate)) {
    errors.push("data.recruitingState must be an object");
    return;
  }
  requireInteger(candidate, "data.recruitingState", "actionPoints", errors);
  requireInteger(candidate, "data.recruitingState", "maxActionPoints", errors);
  if (candidate.weekLabel !== undefined) requireString(candidate, "data.recruitingState", "weekLabel", errors);
}

function validatePortalState(candidate, errors) {
  if (!isRecord(candidate)) {
    errors.push("data.portalState must be an object");
    return;
  }
  requireInteger(candidate, "data.portalState", "rosterLimit", errors);
  requireInteger(candidate, "data.portalState", "coachChangeExceptionRemaining", errors);
  if (!Array.isArray(candidate.pendingAdds)) {
    errors.push("data.portalState.pendingAdds must be an array");
  } else {
    candidate.pendingAdds.forEach((name, index) => {
      if (!isNonEmptyString(name)) {
        errors.push(`data.portalState.pendingAdds[${index}] must be a non-empty string`);
      }
    });
  }
}

function validateRetentionState(candidate, errors) {
  if (!isRecord(candidate)) {
    errors.push("data.retentionState must be an object");
    return;
  }
  requireInteger(candidate, "data.retentionState", "actionPoints", errors);
  requireInteger(candidate, "data.retentionState", "maxActionPoints", errors);
  if (candidate.weekLabel !== undefined) requireString(candidate, "data.retentionState", "weekLabel", errors);
  if (candidate.playerRisk !== undefined && !isRecord(candidate.playerRisk)) {
    errors.push("data.retentionState.playerRisk must be an object");
  }
}

function validateBenefitState(candidate, errors) {
  if (!isRecord(candidate)) {
    errors.push("data.benefitState must be an object");
    return;
  }
  requireInteger(candidate, "data.benefitState", "totalPool", errors);
  if (!isRecord(candidate.buckets)) {
    errors.push("data.benefitState.buckets must be an object");
    return;
  }
  BENEFIT_BUCKET_KEYS.forEach((key) => {
    const bucket = candidate.buckets[key];
    if (!isRecord(bucket)) {
      errors.push(`data.benefitState.buckets.${key} must be an object`);
      return;
    }
    requireInteger(bucket, `data.benefitState.buckets.${key}`, "budgeted", errors);
    requireInteger(bucket, `data.benefitState.buckets.${key}`, "committed", errors);
    requireInteger(bucket, `data.benefitState.buckets.${key}`, "pressure", errors);
  });
}

function validateSeasonState(candidate, errors) {
  if (!isRecord(candidate)) {
    errors.push("data.seasonState must be an object");
    return;
  }
  requireInteger(candidate, "data.seasonState", "seasonYear", errors);
  requireInteger(candidate, "data.seasonState", "currentGameIndex", errors);
  if (!isRecord(candidate.overallRecord)) {
    errors.push("data.seasonState.overallRecord must be an object");
  } else {
    requireInteger(candidate.overallRecord, "data.seasonState.overallRecord", "wins", errors);
    requireInteger(candidate.overallRecord, "data.seasonState.overallRecord", "losses", errors);
  }
  if (!isRecord(candidate.conferenceRecord)) {
    errors.push("data.seasonState.conferenceRecord must be an object");
  } else {
    requireInteger(candidate.conferenceRecord, "data.seasonState.conferenceRecord", "wins", errors);
    requireInteger(candidate.conferenceRecord, "data.seasonState.conferenceRecord", "losses", errors);
  }
  if (!Array.isArray(candidate.playedGames)) {
    errors.push("data.seasonState.playedGames must be an array");
  }
  if (!Array.isArray(candidate.cfpBracket)) {
    errors.push("data.seasonState.cfpBracket must be an array");
  }
  if (!isNonEmptyString(candidate.postseasonStage)) {
    errors.push("data.seasonState.postseasonStage must be a non-empty string");
  }
  requireBoolean(candidate, "data.seasonState", "seasonComplete", errors);
  requireBoolean(candidate, "data.seasonState", "yearRolled", errors);
}

function validatePressureState(candidate, errors) {
  if (!isRecord(candidate)) {
    errors.push("data.pressureState must be an object");
    return;
  }
  requireInteger(candidate, "data.pressureState", "objectivePressure", errors);
  requireInteger(candidate, "data.pressureState", "jobSecurity", errors);
  requireInteger(candidate, "data.pressureState", "adTrust", errors);
  if (!Array.isArray(candidate.trace)) {
    errors.push("data.pressureState.trace must be an array");
  }
}

function validateCultureState(candidate, errors) {
  if (!isRecord(candidate)) {
    errors.push("data.cultureState must be an object");
    return;
  }
  if (!isRecord(candidate.promiseLedger)) {
    errors.push("data.cultureState.promiseLedger must be an object");
  }
  if (!isRecord(candidate.moraleScores)) {
    errors.push("data.cultureState.moraleScores must be an object");
  }
  if (!Array.isArray(candidate.moraleTrace)) {
    errors.push("data.cultureState.moraleTrace must be an array");
  }
}

function validateFacilitiesState(candidate, errors) {
  if (!isRecord(candidate)) {
    errors.push("data.facilitiesState must be an object");
    return;
  }
  if (!isRecord(candidate.requestStatus)) {
    errors.push("data.facilitiesState.requestStatus must be an object");
  }
  if (!Array.isArray(candidate.upgradeHistory)) {
    errors.push("data.facilitiesState.upgradeHistory must be an array");
  }
  requireInteger(candidate, "data.facilitiesState", "longTermBoost", errors);
}

function validateNotifications(candidate, path, errors) {
  if (!Array.isArray(candidate)) {
    errors.push(`${path} must be an array`);
    return;
  }

  candidate.forEach((notification, index) => {
    const itemPath = `${path}[${index}]`;
    if (!isRecord(notification)) {
      errors.push(`${itemPath} must be an object`);
      return;
    }
    requireString(notification, itemPath, "id", errors);
    requireString(notification, itemPath, "title", errors);
    requireString(notification, itemPath, "body", errors);
    requireString(notification, itemPath, "severity", errors);
    if (isNonEmptyString(notification.severity) && !VALID_SEVERITIES.has(notification.severity)) {
      errors.push(`${itemPath}.severity must match the notification taxonomy`);
    }
    requireString(notification, itemPath, "department", errors);
    requireString(notification, itemPath, "deadline", errors);
    requireString(notification, itemPath, "linked", errors);
    requireString(notification, itemPath, "targetView", errors);
    if (isNonEmptyString(notification.targetView) && !VALID_VIEW_IDS.has(notification.targetView)) {
      errors.push(`${itemPath}.targetView must match a primary navigation id`);
    }
    requireBoolean(notification, itemPath, "blocking", errors);
    requireBoolean(notification, itemPath, "resolved", errors);
  });
}

function validateViewModels(candidate, errors) {
  if (!isRecord(candidate)) {
    errors.push("data.viewModels must be an object");
    return;
  }
  const required = [
    "pinnedWatches",
    "seasonObjectives",
    "rosterRisk",
    "eligibilityWatch",
    "depthTwoDeep",
    "futureHoles",
    "pipelineStrength",
    "visitWeekend",
    "portalStrategy",
    "delegationLoad",
    "individualPlans",
    "loadManagement",
    "opponentScout",
    "nationalTop10",
    "selectionResume",
    "budgetOverview",
    "marketPressure",
    "adConfidence",
    "objectives",
    "rivalryLedger",
    "memoryHooks",
    "analyticsReports",
    "analyticsFindings",
  ];
  required.forEach((key) => {
    if (!Array.isArray(candidate[key]) || !candidate[key].length) {
      errors.push(`data.viewModels.${key} must be a non-empty array`);
    }
  });
}

function validateTupleRows(candidate, path, tupleLength, errors) {
  if (!Array.isArray(candidate)) {
    errors.push(`${path} must be an array`);
    return;
  }

  candidate.forEach((row, index) => {
    if (!Array.isArray(row) || row.length !== tupleLength) {
      errors.push(`${path}[${index}] must be an array with ${tupleLength} fields`);
      return;
    }
    row.forEach((value, fieldIndex) => {
      if (!isNonEmptyString(value)) {
        errors.push(`${path}[${index}][${fieldIndex}] must be a non-empty string`);
      }
    });
  });
}

function validateNotificationIds(candidate, errors) {
  const ids = new Set();
  const allNotifications = [
    ...(candidate.data && Array.isArray(candidate.data.notifications) ? candidate.data.notifications : []),
    ...(Array.isArray(candidate.calendar)
      ? candidate.calendar.flatMap((event) => (event && Array.isArray(event.notifications) ? event.notifications : []))
      : []),
  ];

  allNotifications.forEach((notification) => {
    if (!isRecord(notification) || !isNonEmptyString(notification.id)) return;
    if (ids.has(notification.id)) {
      errors.push(`notification id "${notification.id}" is duplicated`);
    }
    ids.add(notification.id);
  });
}

function validateCareerCalendarLink(candidate, errors) {
  if (!isRecord(candidate.career) || !Array.isArray(candidate.calendar)) return;
  if (
    Array.isArray(candidate.programs) &&
    isNonEmptyString(candidate.career.programId) &&
    !candidate.programs.some((program) => program && program.id === candidate.career.programId)
  ) {
    errors.push("career.programId must match a program id");
  }
  if (
    Number.isInteger(candidate.career.currentEventIndex) &&
    candidate.career.currentEventIndex >= candidate.calendar.length
  ) {
    errors.push("career.currentEventIndex must point to an existing calendar event");
  }
  validatePhaseTransitions(candidate, errors);
}

function validatePhaseTransitions(candidate, errors) {
  if (!Array.isArray(candidate.phaseOrder) || !Array.isArray(candidate.calendar)) return;
  const phaseIndex = new Map(candidate.phaseOrder.map((phase, index) => [phase, index]));
  let previous = 0;
  candidate.calendar.forEach((event, index) => {
    if (!event || !phaseIndex.has(event.phase)) return;
    const current = phaseIndex.get(event.phase);
    if (current < previous) {
      errors.push(`calendar[${index}].phase cannot move backward in phaseOrder`);
    }
    if (current > previous + 1) {
      errors.push(`calendar[${index}].phase cannot skip a phase`);
    }
    previous = current;
  });
}

function candidatePhaseSet() {
  return new Set((world && Array.isArray(world.phaseOrder) ? world.phaseOrder : []).filter(isNonEmptyString));
}

function requireString(candidate, path, key, errors) {
  if (!isNonEmptyString(candidate[key])) {
    errors.push(`${path}.${key} must be a non-empty string`);
  }
}

function requireInteger(candidate, path, key, errors) {
  if (!Number.isInteger(candidate[key]) || candidate[key] < 0) {
    errors.push(`${path}.${key} must be a non-negative integer`);
  }
}

function requireBoolean(candidate, path, key, errors) {
  if (typeof candidate[key] !== "boolean") {
    errors.push(`${path}.${key} must be a boolean`);
  }
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function showStartupError(message) {
  const existing = document.querySelector("#startupError");
  if (existing) existing.remove();
  const error = document.createElement("pre");
  error.id = "startupError";
  error.className = "startup-error";
  error.textContent = message;
  document.body.appendChild(error);
}

function currentEvent() {
  return calendar[career.currentEventIndex] || calendar[calendar.length - 1];
}

function syncAgendaFromCalendar() {
  data.agenda = clone(currentEvent().agenda || []);
}

function players() {
  return Array.isArray(data.playerProfiles) ? data.playerProfiles : [];
}

function findPlayer(playerId) {
  return players().find((player) => player.id === playerId) || null;
}

function prospects() {
  return Array.isArray(data.prospectProfiles) ? data.prospectProfiles : [];
}

function findProspect(prospectId) {
  return prospects().find((prospect) => prospect.id === prospectId) || null;
}

function ensurePlayerSelection() {
  const pool = players();
  if (!pool.length) {
    selectedPlayerId = null;
    return;
  }
  if (!pool.some((player) => player.id === selectedPlayerId)) {
    selectedPlayerId = pool[0].id;
  }
}

function ensureProspectSelection() {
  const pool = prospects();
  if (!pool.length) {
    selectedProspectId = null;
    return;
  }
  if (!pool.some((prospect) => prospect.id === selectedProspectId)) {
    selectedProspectId = pool[0].id;
  }
}

function ensurePlayerDecisionState() {
  if (!isRecord(data.playerDecisions)) data.playerDecisions = {};
}

function ensureDepthChartState() {
  if (!isRecord(data.depthChart)) data.depthChart = {};
  Object.keys(DEPTH_SLOT_POSITION).forEach((slot) => {
    if (!isNonEmptyString(data.depthChart[slot])) {
      const option = players().find((player) => player.position === DEPTH_SLOT_POSITION[slot]);
      data.depthChart[slot] = option ? option.id : "";
    }
  });
}

function ensureStaffState() {
  if (!Array.isArray(data.staffOpenings)) data.staffOpenings = [];
  if (!isRecord(data.staffCandidates)) data.staffCandidates = {};
  if (!Array.isArray(data.coachProfiles)) data.coachProfiles = [];
  if (!Array.isArray(data.coordinatorProfiles)) data.coordinatorProfiles = [];
  if (!Array.isArray(data.schoolProfiles)) data.schoolProfiles = [];
  if (!Array.isArray(data.stadiumProfiles)) data.stadiumProfiles = [];
  if (!isRecord(data.aiProgramStates)) data.aiProgramStates = {};

  const program = currentProgram();

  if (!data.coachProfiles.length) {
    data.coachProfiles = [{
      id: `${program.id}-head-coach`,
      name: career.coachName,
      role: "Head Coach",
      programId: program.id,
      attrs: defaultAttrRecord(COACH_ATTRS),
    }];
  }
  Object.keys(COORDINATOR_ROLE_BLUEPRINTS).forEach((role) => {
    const existing = data.coordinatorProfiles.find((entry) => entry.programId === program.id && entry.role === role);
    if (existing) return;
    const attrs = defaultAttrRecord(COACH_ATTRS);
    COORDINATOR_ROLE_BLUEPRINTS[role].forEach((key) => { attrs[key] = 14; });
    data.coordinatorProfiles.push({
      id: `${program.id}-${role.replace(/\s+/g, "-").toLowerCase()}`,
      name: `${program.shortName} ${role}`,
      role,
      programId: program.id,
      attrs,
    });
  });
  if (!data.schoolProfiles.length) {
    data.schoolProfiles = [{
      id: `${program.id}-school`,
      name: program.name,
      conference: "Independent",
      programId: program.id,
      attrs: defaultAttrRecord(SCHOOL_ATTRS),
    }];
  }
  if (!data.stadiumProfiles.length) {
    data.stadiumProfiles = [{
      id: `${program.id}-stadium`,
      name: `${program.shortName} Stadium`,
      city: "Unknown",
      programId: program.id,
      attrs: defaultAttrRecord(STADIUM_ATTRS),
    }];
  }

  programs.forEach((entry) => {
    if (entry.id === career.programId) return;
    if (!isRecord(data.aiProgramStates[entry.id])) {
      // Seed AI program state from each team's actual programRating so the
      // national poll/rankings start in believable territory instead of all
      // teams sitting at default 50. Demo programs without programRating
      // fall back to basePrestige.
      const baseRating = Number.isFinite(entry.programRating)
        ? entry.programRating
        : (Number.isFinite(entry.basePrestige) ? entry.basePrestige : 70);
      data.aiProgramStates[entry.id] = {
        recruitingMomentum: Math.max(30, Math.min(98, baseRating + 2)),
        developmentQuality: Math.max(30, Math.min(98, baseRating)),
        rosterQuality: Math.max(30, Math.min(98, baseRating)),
        portalAggression: Math.max(30, Math.min(95, Math.round(baseRating * 0.65 + 20))),
      };
    }
  });

  // ── Position Coaches ─────────────────────────────────────────────────────
  if (!Array.isArray(data.positionCoaches)) data.positionCoaches = [];
  const pcRng = createSeededRandom(`pcstaff-${program.id}-${career.seed}`);
  // Position group each coach develops (+1 dev bonus to that group)
  const POSITION_COACH_GROUPS = {
    "QB Coach":           ["QB"],
    "RB Coach":           ["HB","FB"],
    "WR Coach":           ["WR","TE"],
    "TE Coach":           ["TE"],
    "OL Coach":           ["OT","OG","C","OL"],
    "DL Coach":           ["DT","DE","NT"],
    "EDGE Coach":         ["EDGE","DE"],
    "LB Coach":           ["LB","ILB","OLB"],
    "CB Coach":           ["CB","DB"],
    "S Coach":            ["S","FS","SS","DB"],
    "Special Teams Coordinator": ["K","P","LS"],
    "Recruiting Coordinator":    [],
    "Strength & Conditioning":   [],
    "Player Development Director": [],
  };
  POSITION_COACH_ROLES.forEach((role) => {
    const existing = data.positionCoaches.find((c) => c.programId === program.id && c.role === role);
    if (existing) {
      // Ensure contract fields on old entries
      if (!Number.isInteger(existing.salary)) existing.salary = Math.round(200 + pcRng() * 600) * 1000;
      if (!Number.isInteger(existing.contractYears)) existing.contractYears = 1 + Math.floor(pcRng() * 3);
      if (!Number.isInteger(existing.contractYear)) existing.contractYear = 1;
      if (!Array.isArray(existing.devGroups)) existing.devGroups = POSITION_COACH_GROUPS[role] || [];
      return;
    }
    const salary = (Math.round(200 + pcRng() * 600)) * 1000;
    const contractYears = 1 + Math.floor(pcRng() * 3);
    const firstName = ["Marcus","James","Tyler","Derek","Kevin","Brian","Scott","Eric"][Math.floor(pcRng() * 8)];
    const lastName = ["Johnson","Williams","Brown","Davis","Miller","Wilson","Moore","Taylor"][Math.floor(pcRng() * 8)];
    data.positionCoaches.push({
      id: `${program.id}-${role.replace(/\s+/g, "-").toLowerCase()}`,
      name: `${firstName} ${lastName}`,
      role,
      programId: program.id,
      salary,
      contractYears,
      contractYear: 1,
      devGroups: POSITION_COACH_GROUPS[role] || [],
      attrs: defaultAttrRecord(["teaching","motivation","discipline","recruitment","skillDevelopment","scoutingCurrent"], 10 + Math.floor(pcRng() * 6)),
      happiness: 60 + Math.floor(pcRng() * 30),
      reputation: Math.round(pcRng() * 80),
    });
  });
}

function ensureRecruitingState() {
  const configuredBudget = ruleValue("recruitingActionPoints", RECRUITING_ACTION_BUDGET);
  if (!isRecord(data.recruitingState)) {
    data.recruitingState = {
      actionPoints: configuredBudget,
      maxActionPoints: configuredBudget,
      weekLabel: currentEvent().weekLabel,
      filters: { position: "All", status: "All" },
    };
  }
  const priorMax = Number.isInteger(data.recruitingState.maxActionPoints)
    ? data.recruitingState.maxActionPoints
    : null;
  if (!Number.isInteger(data.recruitingState.maxActionPoints)) {
    data.recruitingState.maxActionPoints = configuredBudget;
  }
  data.recruitingState.maxActionPoints = configuredBudget;
  if (!Number.isInteger(data.recruitingState.actionPoints)) {
    data.recruitingState.actionPoints = data.recruitingState.maxActionPoints;
  }
  if (Number.isInteger(priorMax) && priorMax > 0 && priorMax !== configuredBudget) {
    const spent = Math.max(0, priorMax - data.recruitingState.actionPoints);
    data.recruitingState.actionPoints = Math.max(0, configuredBudget - spent);
  }
  data.recruitingState.actionPoints = Math.min(data.recruitingState.actionPoints, data.recruitingState.maxActionPoints);
  if (!isNonEmptyString(data.recruitingState.weekLabel)) {
    data.recruitingState.weekLabel = currentEvent().weekLabel;
  }
  if (!isRecord(data.recruitingState.filters)) {
    data.recruitingState.filters = { position: "All", status: "All" };
  }
  if (!isNonEmptyString(data.recruitingState.filters.position)) data.recruitingState.filters.position = "All";
  if (!isNonEmptyString(data.recruitingState.filters.status)) data.recruitingState.filters.status = "All";
}

function riskLabelToScore(label) {
  if (label === "High") return 78;
  if (label === "Medium") return 54;
  return 28;
}

function riskScoreToLabel(score) {
  if (score >= 70) return "High";
  if (score >= 45) return "Medium";
  return "Low";
}

function retentionKey(row) {
  return `${row[0]}:${row[1]}`;
}

function ensurePortalState() {
  if (!isRecord(data.portalState)) {
    data.portalState = {
      rosterLimit: 7,
      coachChangeExceptionRemaining: 0,
      pendingAdds: [],
      targetStatus: {},
    };
  }
  if (!Number.isInteger(data.portalState.rosterLimit) || data.portalState.rosterLimit < 1) {
    data.portalState.rosterLimit = 7;
  }
  if (!Number.isInteger(data.portalState.coachChangeExceptionRemaining) || data.portalState.coachChangeExceptionRemaining < 0) {
    data.portalState.coachChangeExceptionRemaining = 0;
  }
  if (!Array.isArray(data.portalState.pendingAdds)) data.portalState.pendingAdds = [];
  if (!isRecord(data.portalState.targetStatus)) data.portalState.targetStatus = {};

  (Array.isArray(data.portal) ? data.portal : []).forEach((row) => {
    const name = row[1];
    if (!isNonEmptyString(name)) return;
    if (!isNonEmptyString(data.portalState.targetStatus[name])) {
      data.portalState.targetStatus[name] = row[4] || "Watch list";
    }
  });
}

function ensureRetentionState() {
  const configuredBudget = ruleValue("retentionActionPoints", RETENTION_ACTION_BUDGET);
  if (!isRecord(data.retentionState)) {
    data.retentionState = {
      actionPoints: configuredBudget,
      maxActionPoints: configuredBudget,
      weekLabel: currentEvent().weekLabel,
      playerRisk: {},
      notes: {},
      baseReason: {},
    };
  }
  const priorMax = Number.isInteger(data.retentionState.maxActionPoints)
    ? data.retentionState.maxActionPoints
    : null;
  if (!Number.isInteger(data.retentionState.maxActionPoints) || data.retentionState.maxActionPoints < 1) {
    data.retentionState.maxActionPoints = configuredBudget;
  }
  data.retentionState.maxActionPoints = configuredBudget;
  if (!Number.isInteger(data.retentionState.actionPoints) || data.retentionState.actionPoints < 0) {
    data.retentionState.actionPoints = data.retentionState.maxActionPoints;
  }
  if (Number.isInteger(priorMax) && priorMax > 0 && priorMax !== configuredBudget) {
    const spent = Math.max(0, priorMax - data.retentionState.actionPoints);
    data.retentionState.actionPoints = Math.max(0, configuredBudget - spent);
  }
  data.retentionState.actionPoints = Math.min(data.retentionState.actionPoints, data.retentionState.maxActionPoints);
  if (!isNonEmptyString(data.retentionState.weekLabel)) {
    data.retentionState.weekLabel = currentEvent().weekLabel;
  }
  if (!isRecord(data.retentionState.playerRisk)) data.retentionState.playerRisk = {};
  if (!isRecord(data.retentionState.notes)) data.retentionState.notes = {};
  if (!isRecord(data.retentionState.baseReason)) data.retentionState.baseReason = {};

  (Array.isArray(data.outgoingRisk) ? data.outgoingRisk : []).forEach((row) => {
    const key = retentionKey(row);
    if (!Number.isInteger(data.retentionState.playerRisk[key])) {
      data.retentionState.playerRisk[key] = riskLabelToScore(row[3]);
    }
    if (!isNonEmptyString(data.retentionState.baseReason[key])) {
      data.retentionState.baseReason[key] = row[4] || "No reason recorded";
    }
  });
}

function ensureBenefitState() {
  if (!isRecord(data.benefitState)) {
    data.benefitState = {
      totalPool: 460,
      buckets: {
        retention: { budgeted: 170, committed: 110, pressure: 68 },
        recruiting: { budgeted: 140, committed: 70, pressure: 62 },
        development: { budgeted: 90, committed: 45, pressure: 40 },
        emergency: { budgeted: 60, committed: 10, pressure: 30 },
      },
    };
  }
  if (!Number.isInteger(data.benefitState.totalPool) || data.benefitState.totalPool < 1) {
    data.benefitState.totalPool = 460;
  }
  if (!isRecord(data.benefitState.buckets)) data.benefitState.buckets = {};
  BENEFIT_BUCKET_KEYS.forEach((key) => {
    const defaultBudget = key === "retention" ? 170 : key === "recruiting" ? 140 : key === "development" ? 90 : 60;
    if (!isRecord(data.benefitState.buckets[key])) {
      data.benefitState.buckets[key] = { budgeted: defaultBudget, committed: 0, pressure: 35 };
    }
    const bucket = data.benefitState.buckets[key];
    if (!Number.isInteger(bucket.budgeted) || bucket.budgeted < 0) bucket.budgeted = defaultBudget;
    if (!Number.isInteger(bucket.committed) || bucket.committed < 0) bucket.committed = 0;
    if (!Number.isInteger(bucket.pressure) || bucket.pressure < 0) bucket.pressure = 35;
    bucket.committed = Math.min(bucket.committed, bucket.budgeted);
  });
  rebalanceBenefitBudgetsToPool();
  refreshBenefitPressure();
}

function currentSeasonYear() {
  ensureSeasonState();
  return data.seasonState.seasonYear;
}

function ensureSeasonState() {
  const baseYear = clampInteger(career.startYear, 2010, 2035, 2028);
  if (!isRecord(data.seasonState)) {
    data.seasonState = {
      seasonYear: baseYear,
      currentGameIndex: 0,
      overallRecord: { wins: 0, losses: 0 },
      conferenceRecord: { wins: 0, losses: 0 },
      playedGames: [],
      cfpBracket: [],
      postseasonStage: "regular",
      seasonComplete: false,
      yearRolled: false,
      lastResultSummary: "No games played yet",
      tacticalProfile: "Balanced",
      playByPlayEnabled: false,
      lastDriveSummary: [],
      lastPlayByPlay: [],
      lastAdvancedBox: null,
      lastOpponentTendencies: [],
      lastHardeningReport: null,
    };
  }
  if (!Number.isInteger(data.seasonState.seasonYear) || data.seasonState.seasonYear < 2000) data.seasonState.seasonYear = baseYear;
  if (!Number.isInteger(data.seasonState.currentGameIndex) || data.seasonState.currentGameIndex < 0) data.seasonState.currentGameIndex = 0;
  if (!isRecord(data.seasonState.overallRecord)) data.seasonState.overallRecord = { wins: 0, losses: 0 };
  if (!Number.isInteger(data.seasonState.overallRecord.wins) || data.seasonState.overallRecord.wins < 0) data.seasonState.overallRecord.wins = 0;
  if (!Number.isInteger(data.seasonState.overallRecord.losses) || data.seasonState.overallRecord.losses < 0) data.seasonState.overallRecord.losses = 0;
  if (!isRecord(data.seasonState.conferenceRecord)) data.seasonState.conferenceRecord = { wins: 0, losses: 0 };
  if (!Number.isInteger(data.seasonState.conferenceRecord.wins) || data.seasonState.conferenceRecord.wins < 0) data.seasonState.conferenceRecord.wins = 0;
  if (!Number.isInteger(data.seasonState.conferenceRecord.losses) || data.seasonState.conferenceRecord.losses < 0) data.seasonState.conferenceRecord.losses = 0;
  if (!Array.isArray(data.seasonState.playedGames)) data.seasonState.playedGames = [];
  if (!Array.isArray(data.seasonState.cfpBracket)) data.seasonState.cfpBracket = [];
  if (!isNonEmptyString(data.seasonState.postseasonStage)) data.seasonState.postseasonStage = "regular";
  if (typeof data.seasonState.seasonComplete !== "boolean") data.seasonState.seasonComplete = false;
  if (typeof data.seasonState.yearRolled !== "boolean") data.seasonState.yearRolled = false;
  if (!isNonEmptyString(data.seasonState.lastResultSummary)) data.seasonState.lastResultSummary = "No games played yet";
  if (!isNonEmptyString(data.seasonState.tacticalProfile) || !TACTICAL_PROFILES.includes(data.seasonState.tacticalProfile)) {
    data.seasonState.tacticalProfile = "Balanced";
  }
  if (!isNonEmptyString(data.seasonState.tempoProfile) || !TEMPO_PROFILES.includes(data.seasonState.tempoProfile)) {
    data.seasonState.tempoProfile = "Balanced";
  }
  if (typeof data.seasonState.playByPlayEnabled !== "boolean") data.seasonState.playByPlayEnabled = false;
  if (!Array.isArray(data.seasonState.lastDriveSummary)) data.seasonState.lastDriveSummary = [];
  if (!Array.isArray(data.seasonState.lastPlayByPlay)) data.seasonState.lastPlayByPlay = [];
  if (!Array.isArray(data.seasonState.lastOpponentTendencies)) data.seasonState.lastOpponentTendencies = [];
  if (data.seasonState.lastHardeningReport !== null && !isRecord(data.seasonState.lastHardeningReport)) {
    data.seasonState.lastHardeningReport = null;
  }
  syncCareerRecordFromSeasonState();
}

function simCore() {
  if (window.CGM_SIM_CORE) return window.CGM_SIM_CORE;
  window.CGM_SIM_CORE = {
    tacticModifiers(profile) {
      if (profile === "Aggressive") return { offense: 4, defense: -2, variance: 5, passBias: 8 };
      if (profile === "Conservative") return { offense: -1, defense: 3, variance: 2, passBias: -8 };
      return { offense: 1, defense: 1, variance: 3, passBias: 0 };
    },
    opponentTendencyProfile(config) {
      const random = createSeededRandom(`${config.seed}:opp-tendency:${config.seasonYear}:${config.opponent}`);
      const runBase = seededRange(random, 38, 56);
      return {
        runRate: runBase,
        passRate: 100 - runBase,
        pace: seededRange(random, 58, 74),
        blitzRate: seededRange(random, 20, 42),
      };
    },
    driveOutcomeLabel(points, explosive, turnover) {
      if (turnover) return "Turnover";
      if (points === 7 && explosive) return "TD (explosive)";
      if (points === 7) return "TD";
      if (points === 3) return "FG";
      return "Punt";
    },
    simulateDriveByDriveGame(config) {
      const random = createSeededRandom(`${config.seed}:drive:${config.seasonYear}:${config.gameIndex}:${config.advanceCount}:${config.tacticalProfile}`);
      const tactical = this.tacticModifiers(config.tacticalProfile);
      const tacticalImpact = Math.max(0.7, Math.min(1.5, (Number(config.tacticalImpactPercent) || 100) / 100));
      const scoringEnvironment = Math.max(0.7, Math.min(1.5, (Number(config.scoringEnvironmentPercent) || 100) / 100));
      const volatility = Math.max(0.7, Math.min(1.5, (Number(config.volatilityPercent) || 100) / 100));
      tactical.offense = Math.round(tactical.offense * tacticalImpact);
      tactical.defense = Math.round(tactical.defense * tacticalImpact);
      tactical.variance = Math.max(1, Math.round(tactical.variance * volatility));
      const tendencies = this.opponentTendencyProfile({ seed: config.seed, seasonYear: config.seasonYear, opponent: config.opponentName });
      const drives = [];
      const playByPlay = [];
      const driveCount = seededRange(random, 18, 22);
      let ourScore = 0;
      let oppScore = 0;
      let ourPlays = 0;
      let oppPlays = 0;
      let ourExplosives = 0;
      let oppExplosives = 0;
      let ourSuccess = 0;
      let oppSuccess = 0;
      for (let driveIndex = 0; driveIndex < driveCount; driveIndex += 1) {
        const ourBall = driveIndex % 2 === 0;
        const tempo = Math.max(48, Math.min(80, tendencies.pace + seededRange(random, -8, 9)));
        const plays = Math.max(3, Math.min(14, Math.round((tempo / 10) + seededRange(random, -2, 3))));
        const explosive = seededRange(random, 1, 100) <= (ourBall ? 19 + tactical.passBias / 4 : 17);
        const turnover = seededRange(random, 1, 100) <= (ourBall ? 9 : 10 + Math.max(0, tactical.passBias / 6));
        const offenseBase = (ourBall
          ? 46 + Math.floor(config.prestige / 6) + tactical.offense - Math.floor(config.opponentQuality / 16)
          : 42 + Math.floor(config.opponentQuality / 7) - tactical.defense - Math.floor(config.prestige / 18)) * scoringEnvironment;
        const scoringRoll = seededRange(random, 1, 100) + seededRange(random, -tactical.variance, tactical.variance);
        const scoreDelta = offenseBase - scoringRoll;
        let points = 0;
        if (!turnover) {
          if (scoreDelta >= 8 || (explosive && scoreDelta >= 1)) points = 7;
          else if (scoreDelta >= -9) points = 3;
        }
        if (ourBall) {
          ourScore += points;
          ourPlays += plays;
          if (explosive) ourExplosives += 1;
          if (points > 0) ourSuccess += 1;
        } else {
          oppScore += points;
          oppPlays += plays;
          if (explosive) oppExplosives += 1;
          if (points > 0) oppSuccess += 1;
        }
        const clock = `${Math.max(1, 4 - Math.floor((driveIndex * 4) / driveCount))}Q ${String(Math.max(0, 14 - ((driveIndex * 14) % 15))).padStart(2, "0")}:00`;
        const resultLabel = this.driveOutcomeLabel(points, explosive, turnover);
        const offenseTeam = ourBall ? config.teamShortName : config.opponentName;
        drives.push([String(driveIndex + 1), offenseTeam, resultLabel, String(points), clock]);
        playByPlay.push(`${clock} ${offenseTeam}: ${resultLabel}${points ? ` for ${points}` : ""}${explosive ? " off explosive gain" : ""}.`);
      }
      if (ourScore === oppScore) {
        if (seededRange(random, 1, 100) <= 50) {
          ourScore += 3;
          drives.push([String(drives.length + 1), config.teamShortName, "OT FG", "3", "OT 04:00"]);
          playByPlay.push(`OT 04:00 ${config.teamShortName}: OT FG for 3.`);
        } else {
          oppScore += 3;
          drives.push([String(drives.length + 1), config.opponentName, "OT FG", "3", "OT 04:00"]);
          playByPlay.push(`OT 04:00 ${config.opponentName}: OT FG for 3.`);
        }
      }
      const advanced = {
        ourYardsPerPlay: Math.max(3.2, Number(((ourScore * 1.35) + ourExplosives * 2 + 12) / Math.max(ourPlays, 1)).toFixed(1)),
        oppYardsPerPlay: Math.max(3.0, Number(((oppScore * 1.3) + oppExplosives * 2 + 10) / Math.max(oppPlays, 1)).toFixed(1)),
        ourSuccessRate: Number(((ourSuccess / Math.max(1, Math.ceil(drives.length / 2))) * 100).toFixed(0)),
        oppSuccessRate: Number(((oppSuccess / Math.max(1, Math.floor(drives.length / 2))) * 100).toFixed(0)),
        explosivePlays: `${ourExplosives}-${oppExplosives}`,
      };
      return { ourScore, oppScore, win: ourScore > oppScore, drives, playByPlay, tendencies, advanced };
    },
  };
  return window.CGM_SIM_CORE;
}

function hardeningCore() {
  if (window.CGM_HARDENING_CORE) return window.CGM_HARDENING_CORE;
  window.CGM_HARDENING_CORE = {
    buildHardeningSummary(report) {
      if (!report || !report.calibration || !report.calibration.results) {
        return { label: "Pending", details: "No hardening report yet" };
      }
      const rows = report.calibration.results;
      return {
        label: report.pass ? "Healthy" : "Review needed",
        details: `${rows.Balanced.avgTotalPoints} / ${rows.Aggressive.avgTotalPoints} / ${rows.Conservative.avgTotalPoints}`,
      };
    },
    buildHardeningReport(tick, perf, calibration) {
      return {
        tick,
        perf,
        calibration,
        pass: Boolean(perf && perf.pass) && Boolean(calibration && calibration.pass),
      };
    },
  };
  return window.CGM_HARDENING_CORE;
}

function tacticModifiers() {
  ensureSeasonState();
  return simCore().tacticModifiers(data.seasonState.tacticalProfile);
}

function setTacticalProfile(profile) {
  ensureSeasonState();
  if (!TACTICAL_PROFILES.includes(profile)) return false;
  data.seasonState.tacticalProfile = profile;
  appendPressureTrace("Game Plan", 0, `Tactical profile set to ${profile}`);
  refreshStewardshipModels();
  return true;
}

function setTempoProfile(tempo) {
  ensureSeasonState();
  if (!TEMPO_PROFILES.includes(tempo)) return false;
  data.seasonState.tempoProfile = tempo;
  appendPressureTrace("Game Plan", 0, `Tempo set to ${tempo}`);
  refreshStewardshipModels();
  return true;
}

function setPlayByPlayEnabled(enabled) {
  ensureSeasonState();
  data.seasonState.playByPlayEnabled = Boolean(enabled);
  if (!data.seasonState.playByPlayEnabled) data.seasonState.lastPlayByPlay = [];
  return true;
}

function opponentTendencyProfile(game) {
  ensureSeasonState();
  return simCore().opponentTendencyProfile({
    seed: career.seed,
    seasonYear: data.seasonState.seasonYear,
    opponent: game.opponent,
  });
}

function driveOutcomeLabel(points, explosive, turnover) {
  return simCore().driveOutcomeLabel(points, explosive, turnover);
}

function simulateDriveByDriveGame(game) {
  ensureSeasonState();
  const profile = career.generatedProfile || generateCareerProfile(career.seed, programById(career.programId));
  const coach = currentCoachProfile();
  const coordinator = coordinatorInfluenceSnapshot();
  const school = currentSchoolProfile();
  const stadium = currentStadiumProfile();
  const coachEdge = averageAttr(coach && coach.attrs, ["gameManagement", "inGameAdaptation", "tacticalKnowledge", "playCalling"], 10) - 10;
  const coordinatorEdge = (((coordinator.offense - 10) * 0.7) + ((coordinator.defense - 10) * 0.5));
  const schoolEdge = averageAttr(school && school.attrs, ["facilitiesQuality", "sportsScienceSupport", "boosterStrength", "boardPatience"], 10) - 10;
  const venueEdge = averageAttr(stadium && stadium.attrs, ["homeFieldAdvantage", "crowdNoise", "atmosphere", "fieldHeating"], 10) - 10;
  const venueModifier = game.away ? -venueEdge : venueEdge;
  const effectivePrestige = Math.max(55, Math.min(99, Math.round(profile.prestige + (coachEdge * 1.6) + coordinatorEdge + (schoolEdge * 1.2) + (venueModifier * 0.9))));
  const effectiveOpponentQuality = Math.max(60, Math.min(99, Math.round(game.opponentQuality - (venueModifier * 0.65))));
  const myProgram = programById(career.programId);
  const opponentRoster = rosterForOpponentName(game.opponent);
  const opponentProgram = programs.find((p) => {
    const cleaned = String(game.opponent || "").replace(/^at\s+/i, "").trim();
    return p.shortName === cleaned || p.name === cleaned;
  });
  return simCore().simulateDriveByDriveGame({
    seed: career.seed,
    seasonYear: data.seasonState.seasonYear,
    gameIndex: game.index,
    advanceCount: career.advanceCount,
    tacticalProfile: data.seasonState.tacticalProfile,
    prestige: effectivePrestige,
    donorConfidence: profile.donorConfidence,
    opponentQuality: effectiveOpponentQuality,
    teamShortName: myProgram.shortName,
    opponentName: game.opponent,
    scoringEnvironmentPercent: ruleValue("scoringEnvironmentPercent", 100),
    volatilityPercent: ruleValue("volatilityPercent", 100),
    tacticalImpactPercent: ruleValue("tacticalImpactPercent", 100),
    // MATCHUP wiring (DL-20260502-03): pass actual rosters so the sim base
    // score is derived from real unit ratings instead of the prestige proxy.
    roster: players(),
    opponentRoster,
    teamId: myProgram.id,
    opponentId: opponentProgram ? opponentProgram.id : null,
    isHome: !game.away,
    homeTeamId: game.away ? (opponentProgram ? opponentProgram.id : null) : myProgram.id,
    awayTeamId: game.away ? myProgram.id : (opponentProgram ? opponentProgram.id : null),
  });
}

function runM8PerformanceCheck(iterations = 120) {
  ensureSeasonState();
  const games = Math.max(10, Number(iterations) || 120);
  const start = Date.now();
  for (let index = 0; index < games; index += 1) {
    const game = scheduleRowToGameContext(data.schedule[index % data.schedule.length], index % data.schedule.length);
    simulateDriveByDriveGame(game);
  }
  const elapsedMs = Date.now() - start;
  return {
    games,
    elapsedMs,
    perGameMs: Number((elapsedMs / games).toFixed(2)),
    pass: elapsedMs <= games * 4,
  };
}

function runM9BalanceCalibration(sampleGames = 180) {
  ensureSeasonState();
  const original = data.seasonState.tacticalProfile;
  const game = scheduleRowToGameContext(data.schedule[data.seasonState.currentGameIndex] || data.schedule[0], data.seasonState.currentGameIndex || 0);
  const profiles = ["Balanced", "Aggressive", "Conservative"];
  const results = {};
  const samples = Math.max(30, Number(sampleGames) || 180);

  profiles.forEach((profile) => {
    data.seasonState.tacticalProfile = profile;
    let totalPoints = 0;
    let ourPoints = 0;
    let wins = 0;
    for (let index = 0; index < samples; index += 1) {
      const sim = simulateDriveByDriveGame({ ...game, index: game.index + index + 200 });
      totalPoints += sim.ourScore + sim.oppScore;
      ourPoints += sim.ourScore;
      if (sim.win) wins += 1;
    }
    results[profile] = {
      avgTotalPoints: Number((totalPoints / samples).toFixed(2)),
      avgOurPoints: Number((ourPoints / samples).toFixed(2)),
      winRate: Number(((wins / samples) * 100).toFixed(1)),
    };
  });
  data.seasonState.tacticalProfile = original;

  const spread = Math.abs(results.Aggressive.avgTotalPoints - results.Conservative.avgTotalPoints);
  const impactPass = spread >= 6;
  return {
    samples,
    spread: Number(spread.toFixed(2)),
    impactPass,
    results,
    pass: impactPass,
  };
}

function runM9HardeningCheck() {
  ensureSeasonState();
  const perf = runM8PerformanceCheck(180);
  const calibration = runM9BalanceCalibration(180);
  const report = hardeningCore().buildHardeningReport(`${currentSeasonYear()}-${career.advanceCount}`, perf, calibration);
  data.seasonState.lastHardeningReport = report;
  return report;
}

function syncCareerRecordFromSeasonState() {
  if (!isRecord(data.seasonState) || !isRecord(data.seasonState.overallRecord)) return;
  const wins = data.seasonState.overallRecord.wins;
  const losses = data.seasonState.overallRecord.losses;
  career.record = `${wins}-${losses}`;
}

function moraleLabelToScore(label) {
  if (label === "High") return 82;
  if (label === "Stable") return 68;
  if (label === "Low") return 45;
  return 62;
}

function moraleScoreToLabel(score) {
  if (score >= 80) return "High";
  if (score >= 60) return "Stable";
  return "Low";
}

function ensurePressureState() {
  if (!isRecord(data.pressureState)) {
    data.pressureState = {
      objectivePressure: 42,
      jobSecurity: 74,
      adTrust: 71,
      trace: [],
    };
  }
  if (!Number.isInteger(data.pressureState.objectivePressure)) data.pressureState.objectivePressure = 42;
  if (!Number.isInteger(data.pressureState.jobSecurity)) data.pressureState.jobSecurity = 74;
  if (!Number.isInteger(data.pressureState.adTrust)) data.pressureState.adTrust = 71;
  if (!Array.isArray(data.pressureState.trace)) data.pressureState.trace = [];
}

function appendPressureTrace(source, delta, detail) {
  ensurePressureState();
  const current = data.pressureState.objectivePressure;
  const next = Math.max(1, Math.min(99, current + delta));
  data.pressureState.objectivePressure = next;
  data.pressureState.jobSecurity = Math.max(1, Math.min(99, 100 - next + Math.floor(data.pressureState.adTrust / 6)));
  data.pressureState.trace.unshift([
    `${currentSeasonYear()}-${career.advanceCount}`,
    source,
    delta > 0 ? `+${delta}` : String(delta),
    String(next),
    detail,
  ]);
  data.pressureState.trace = data.pressureState.trace.slice(0, 18);
}

function ensureCultureState() {
  if (!isRecord(data.cultureState)) {
    data.cultureState = {
      promiseLedger: {},
      moraleScores: {},
      moraleTrace: [],
    };
  }
  if (!isRecord(data.cultureState.promiseLedger)) data.cultureState.promiseLedger = {};
  if (!isRecord(data.cultureState.moraleScores)) data.cultureState.moraleScores = {};
  if (!Array.isArray(data.cultureState.moraleTrace)) data.cultureState.moraleTrace = [];

  players().forEach((player) => {
    if (!isNonEmptyString(data.cultureState.promiseLedger[player.id])) {
      const defaultPromise = player.year === "FR" ? "Development Year" : player.position === "QB" ? "High Usage" : "Rotation";
      data.cultureState.promiseLedger[player.id] = defaultPromise;
    }
    if (!Number.isInteger(data.cultureState.moraleScores[player.id])) {
      data.cultureState.moraleScores[player.id] = moraleLabelToScore(player.morale);
    }
    player.morale = moraleScoreToLabel(data.cultureState.moraleScores[player.id]);
    if (!isRecord(player.attrs)) {
      player.attrs = Object.assign({}, DEFAULT_PLAYER_ATTRS);
    } else {
      PLAYER_ATTRS.forEach((key) => {
        if (!Number.isInteger(player.attrs[key])) player.attrs[key] = 10;
      });
    }
    if (!Array.isArray(player.positions) || !player.positions.length) {
      player.positions = [player.position];
    }
    // — Position-specific attrs (posAttrs)
    if (!isRecord(player.posAttrs) || Object.keys(player.posAttrs).length === 0) {
      const rng = createSeededRandom(`posattrs-${player.id}-${career.seed}`);
      player.posAttrs = playerDefaultPosAttrs(player.position, player.ovr, rng);
    } else {
      // Ensure any new spec keys are filled in for existing saves
      const spec = POSITION_ATTRS_SPEC[player.position] || POSITION_ATTRS_SPEC["WR"];
      spec.groups.forEach((g) => g.keys.forEach((k) => {
        if (!Number.isInteger(player.posAttrs[k])) player.posAttrs[k] = 10;
      }));
    }
    // — Hidden personality traits
    if (!isRecord(player.hidden)) {
      const rng = createSeededRandom(`hidden-${player.id}-${career.seed}`);
      player.hidden = playerDefaultHidden(rng);
    }
  });
}
function ensurePromisesState() {
  if (!Array.isArray(data.promises)) data.promises = [];
}

function makeRecruitingPromise(typeId, prospect) {
  ensurePromisesState();
  const def = PROMISE_TYPE_MAP[typeId];
  if (!def) return false;
  const id = `rp-${prospect.id}-${typeId}`;
  if (data.promises.some((p) => p.id === id)) return false;
  const textMap = {
    noRedshirt: `Promised ${prospect.name} they will not be redshirted.`,
    startingPath: `Promised ${prospect.name} a clear path to starting.`,
    positionGuarantee: `Guaranteed ${prospect.name} will play ${prospect.position}.`,
    nilSupport: `Committed NIL support package to ${prospect.name}.`,
    earlyPlayingTime: `Promised ${prospect.name} meaningful playing time early.`,
  };
  data.promises.push({
    id,
    category: "Recruiting",
    typeId,
    label: def.label,
    entityId: prospect.id,
    entityName: prospect.name,
    text: textMap[typeId] || `Promise made to ${prospect.name}.`,
    week: currentEvent().weekLabel,
    breachRisk: def.riskBase,
    breached: false,
    fulfilled: false,
    acknowledged: false,
  });
  prospect.commitChance = Math.min(99, (prospect.commitChance || 50) + def.commitBonus);
  prospect.promisesMade = Array.isArray(prospect.promisesMade) ? [...prospect.promisesMade, def.label] : [def.label];
  return true;
}

function makePlayerPromise(typeId, player, customText) {
  ensurePromisesState();
  const id = `pp-${player.id}-${typeId}-${career.advanceCount}`;
  if (data.promises.some((p) => p.id === id)) return false;
  data.promises.push({
    id,
    category: "Retention",
    typeId,
    label: typeId,
    entityId: player.id,
    entityName: player.name,
    text: customText || `Promise made to ${player.name}.`,
    week: currentEvent().weekLabel,
    breachRisk: 0.25,
    breached: false,
    fulfilled: false,
    acknowledged: false,
  });
  return true;
}

function detectAndInjectPromiseBreachEvents() {
  ensurePromisesState();
  const recruitingPromises = data.promises.filter((p) => p.category === "Recruiting" && !p.breached && !p.fulfilled);
  recruitingPromises.forEach((promise) => {
    const prospect = findProspect(promise.entityId);
    if (!prospect || prospect.committedToUs || prospect.commitmentStatus === "Signed") {
      promise.fulfilled = true;
      return;
    }
    const rng = createSeededRandom(`breach-${promise.id}-${career.advanceCount}`);
    const roll = seededRange(rng, 0, 99);
    if (roll < Math.round(promise.breachRisk * 100)) {
      promise.breached = true;
      if (prospect) {
        prospect.commitChance = Math.max(1, (prospect.commitChance || 50) - 12);
        prospect.interest = Math.max(1, (prospect.interest || 40) - 8);
        prospect.flipRisk = Math.min(99, (prospect.flipRisk || 0) + 20);
      }
      injectNotification({
        id: `promise-breach-${promise.id}`,
        title: `Promise breach risk: ${promise.entityName}`,
        body: `${promise.text} Your program may not be able to keep this promise. Recruit interest is falling.`,
        severity: "Action Recommended",
        department: "Recruiting",
        deadline: currentEvent().weekLabel,
        linked: promise.entityName,
        targetView: "recruiting",
        blocking: false,
        resolved: false,
      });
    }
  });
}

function promiseLedgerRows() {
  ensurePromisesState();
  const rows = [["Entity", "Promise", "Category", "Status", "Breach Risk"]];
  const active = data.promises.filter((p) => !p.fulfilled && !p.breached).slice(0, 12);
  if (!active.length) {
    rows.push(["—", "No active promises", "—", "—", "—"]);
    return rows;
  }
  active.forEach((p) => {
    rows.push([
      p.entityName,
      p.label,
      p.category,
      p.breached ? "BREACHED" : p.fulfilled ? "Fulfilled" : "Active",
      `${Math.round(p.breachRisk * 100)}%`,
    ]);
  });
  return rows;
}

// ── Inbox Event Engine ──────────────────────────────────────────────────────
function ensureInboxEvents() {
  if (!Array.isArray(data.inboxEvents)) data.inboxEvents = [];
}

function inboxEventExists(id) {
  return Array.isArray(data.inboxEvents) && data.inboxEvents.some((e) => e.id === id);
}

function pushInboxEvent(evt) {
  ensureInboxEvents();
  if (inboxEventExists(evt.id)) return;
  data.inboxEvents.unshift(evt);
  // Cap at 60 most recent events; keep unresolved ones
  const unresolved = data.inboxEvents.filter((e) => !e.resolved);
  const resolved = data.inboxEvents.filter((e) => e.resolved).slice(0, 20);
  data.inboxEvents = [...unresolved.slice(0, 40), ...resolved];
}

function resolveInboxEvent(id, chosenAction) {
  ensureInboxEvents();
  const evt = data.inboxEvents.find((e) => e.id === id);
  if (!evt) return false;
  evt.resolved = true;
  evt.chosenAction = chosenAction || "acknowledged";
  applyInboxEventConsequences(evt, chosenAction);
  return true;
}

function applyInboxEventConsequences(evt, actionId) {
  const consequences = evt.consequences && actionId ? evt.consequences[actionId] : null;
  if (!consequences) return;
  // Interest delta on prospect
  if (consequences.interestDelta && evt.prospectId) {
    const prospect = findProspect(evt.prospectId);
    if (prospect) {
      prospect.interest = Math.max(1, Math.min(99, (prospect.interest || 50) + consequences.interestDelta));
      prospect.commitChance = Math.max(1, Math.min(99, (prospect.commitChance || 50) + Math.round(consequences.interestDelta * 0.7)));
    }
  }
  // Morale delta on player
  if (consequences.moraleDelta && evt.playerId) {
    const player = findPlayer(evt.playerId);
    if (player) updatePlayerMorale(player, consequences.moraleDelta, `Inbox: ${evt.subject}`);
  }
  // Notification follow-up
  if (consequences.followUpNote) {
    injectNotification({
      id: `inbox-followup-${evt.id}`,
      title: consequences.followUpNote.title || "Follow-up",
      body: consequences.followUpNote.body || "",
      severity: "FYI",
      department: evt.category || "General",
      deadline: "Next week",
      linked: evt.subject,
      targetView: evt.targetView || "desk",
      blocking: false,
      resolved: false,
    });
  }
}

function generateEcosystemInboxEvents() {
  ensurePromisesState();
  ensureInboxEvents();
  const week = currentEvent().weekLabel;
  const rng = createSeededRandom(`inbox-${career.seed}-${career.advanceCount}`);
  const prestige = career.generatedProfile ? career.generatedProfile.prestige : 10;
  const worldState = data.worldModelState || {};
  const marketHeat = worldState.marketHeat || 50;

  // ── Recruiting events ──
  const openProspects = prospects().filter((p) => !p.committedToUs && p.interest >= 35 && p.offered);
  openProspects.slice(0, 3).forEach((prospect, i) => {
    // Rival offer pressure
    if (seededRange(rng, 0, 99) < Math.min(75, 25 + prospect.rivalInterest / 2)) {
      const rivalName = ["State", "Tech", "U", "A&M", "State University"][seededRange(rng, 0, 4)];
      pushInboxEvent({
        id: `rival-offer-${prospect.id}-${career.advanceCount}-${i}`,
        category: "Recruiting",
        priority: prospect.priority === "Tier 1" ? "High" : "Medium",
        subject: `${rivalName} pushes hard for ${prospect.name}`,
        body: `A credible rival program is aggressively pursuing ${prospect.name} (${prospect.position}, ${prospect.stars}). Staff believes your lead could narrow within two weeks if no action is taken.`,
        staffOpinions: [
          { role:"Recruiting Coordinator", opinion:`We are currently ${prospect.interest > 60 ? "leading" : "in the mix"}. Contact this week matters.` },
          { role:"Offensive Coordinator",  opinion:`${prospect.position} fits our scheme. The archetype (${prospect.archetype}) is ideal.` },
        ],
        actions: [
          { id:"send_hc",      label:"Send Head Coach",        consequence: "Increases interest, costs HC visit budget" },
          { id:"schedule_ov",  label:"Schedule Official Visit", consequence: "Higher commit chance; limited OVs available" },
          { id:"nil_pitch",    label:"Make NIL Pitch",          consequence: "Minor interest gain; may raise expectations" },
          { id:"hold",         label:"Monitor Only",            consequence: "Interest may drop if rival escalates" },
        ],
        consequences: {
          send_hc:     { interestDelta: 8,  followUpNote: { title:"HC Visit Confirmed", body:`Head coach personally visited ${prospect.name}.` } },
          schedule_ov: { interestDelta: 12 },
          nil_pitch:   { interestDelta: 4  },
          hold:        { interestDelta: -3 },
        },
        prospectId: prospect.id,
        targetView: "recruiting",
        week,
        resolved: false,
        chosenAction: null,
      });
    }

    // Flip risk warning
    if (!inboxEventExists(`flip-warning-${prospect.id}`) && prospect.flipRisk >= 30 && prospect.committedToUs) {
      pushInboxEvent({
        id: `flip-warning-${prospect.id}-${career.advanceCount}`,
        category: "Recruiting",
        priority: "High",
        subject: `Decommit watch: ${prospect.name}`,
        body: `Your committed ${prospect.stars} ${prospect.position} ${prospect.name} is showing signs of wavering. Their interest has dropped recently and a rival program is making contact.`,
        staffOpinions: [
          { role:"Recruiting Director", opinion:`Flip risk is real. We need a relationship call or personal visit soon.` },
        ],
        actions: [
          { id:"call",          label:"Schedule Personal Call", consequence: "Reduces flip risk" },
          { id:"visit_campus",  label:"Invite for Unofficial",  consequence: "Significant interest boost" },
          { id:"nil_increase",  label:"Increase NIL Offer",     consequence: "Costs budget; may resolve risk" },
          { id:"let_go",        label:"Release from Commitment",consequence: "Frees scholarship; burns bridge" },
        ],
        consequences: {
          call:         { interestDelta: 5  },
          visit_campus: { interestDelta: 10 },
          nil_increase: { interestDelta: 8  },
          let_go:       { interestDelta: -20 },
        },
        prospectId: prospect.id,
        targetView: "recruiting",
        week,
        resolved: false,
        chosenAction: null,
      });
    }
  });

  // Late riser discovery
  if (seededRange(rng, 0, 99) < 35) {
    const riserSeed = `riser-${career.seed}-${career.advanceCount}`;
    const riserRng = createSeededRandom(riserSeed);
    const pos = PROSPECT_POSITIONS[seededRange(riserRng, 0, PROSPECT_POSITIONS.length - 1)];
    const firstName = PROSPECT_FIRST_NAMES[seededRange(riserRng, 0, PROSPECT_FIRST_NAMES.length - 1)];
    const lastName = PROSPECT_LAST_NAMES[seededRange(riserRng, 0, PROSPECT_LAST_NAMES.length - 1)];
    pushInboxEvent({
      id: `late-riser-${riserSeed}`,
      category: "Recruiting",
      priority: "Medium",
      subject: `Late riser spotted: ${firstName} ${lastName} (${pos})`,
      body: `Scout report flagged an overlooked ${pos} from the ${PROSPECT_REGIONS[seededRange(riserRng, 0, PROSPECT_REGIONS.length - 1)]} region. Film suggests real upside not reflected in current rankings.`,
      staffOpinions: [
        { role:"Recruiting Coordinator", opinion:"This player is moving up. Getting in early could be valuable." },
        { role:"Strength Coach",         opinion:"Good frame and athleticism. Could develop well in our system." },
      ],
      actions: [
        { id:"add_board",    label:"Add to Board",         consequence: "Start tracking; no commitment" },
        { id:"offer_now",    label:"Offer Immediately",     consequence: "Shows interest before rivals; costs offer slot" },
        { id:"watch_only",   label:"Watch More Film First", consequence: "Lower risk; may lose window" },
      ],
      consequences: {
        add_board:  {},
        offer_now:  {},
        watch_only: {},
      },
      targetView: "recruiting",
      week,
      resolved: false,
      chosenAction: null,
    });
  }

  // ── Roster events ──
  const unhappyPlayers = players().filter((p) => {
    const score = data.cultureState && data.cultureState.moraleScores ? (data.cultureState.moraleScores[p.id] || 60) : 60;
    return score < 40 && !p.inPortal;
  });
  unhappyPlayers.slice(0, 2).forEach((player, i) => {
    if (inboxEventExists(`player-unhappy-${player.id}`)) return;
    pushInboxEvent({
      id: `player-unhappy-${player.id}-${career.advanceCount}-${i}`,
      category: "Roster",
      priority: "High",
      subject: `${player.name} requesting a meeting`,
      body: `${player.name} (${player.position}, ${player.year}) has been noticeably quiet in team activities. Your position coach flagged a concern about their engagement and playing time satisfaction.`,
      staffOpinions: [
        { role:"Offensive Coordinator",  opinion:`${player.name} feels underused. Worth a honest conversation.` },
        { role:"Recruiting Coordinator", opinion:`He has been checking the portal. Don't let this escalate.` },
      ],
      actions: [
        { id:"meeting",     label:"Schedule Private Meeting",       consequence: "Morale boost; may reveal root issue" },
        { id:"more_reps",   label:"Promise More Reps in Practice",  consequence: "Morale boost; rival player may object" },
        { id:"depth_bump",  label:"Move Up the Depth Chart",        consequence: "High morale boost; creates roster tension" },
        { id:"ignore",      label:"Monitor Without Action",         consequence: "Risk of portal entry increases" },
      ],
      consequences: {
        meeting:    { moraleDelta: 3  },
        more_reps:  { moraleDelta: 5  },
        depth_bump: { moraleDelta: 8  },
        ignore:     { moraleDelta: -4 },
      },
      playerId: player.id,
      targetView: "roster",
      week,
      resolved: false,
      chosenAction: null,
    });
  });

  // ── Staff events ──
  const staffList = Array.isArray(data.staff) ? data.staff : [];
  if (staffList.length > 0 && seededRange(rng, 0, 99) < 28) {
    const staffRow = staffList[seededRange(rng, 0, staffList.length - 1)];
    const staffRole = staffRow[0] || "Assistant";
    pushInboxEvent({
      id: `staff-interest-${staffRole}-${career.advanceCount}`,
      category: "Staff",
      priority: "Medium",
      subject: `${staffRole} reportedly drawing outside attention`,
      body: `Your ${staffRole} has been mentioned in connection with an opening at a rival program. Contract security and role clarity may be factors.`,
      staffOpinions: [
        { role:"Head Coach", opinion:"We should address this proactively before it becomes a distraction." },
      ],
      actions: [
        { id:"contract_talk", label:"Open Contract Extension Talk", consequence: "Retains staff; costs budget" },
        { id:"reassure",      label:"Reassure and Promote Role",     consequence: "Low cost; lower retention chance" },
        { id:"let_explore",   label:"Give Permission to Explore",    consequence: "May lose staff; shows loyalty" },
      ],
      consequences: {
        contract_talk: {},
        reassure:      {},
        let_explore:   {},
      },
      targetView: "staff",
      week,
      resolved: false,
      chosenAction: null,
    });
  }

  // ── Finance event ──
  if (marketHeat > 65 && seededRange(rng, 0, 99) < 40) {
    pushInboxEvent({
      id: `nil-market-shift-${career.advanceCount}`,
      category: "Finance",
      priority: "Medium",
      subject: "NIL market heating up in your region",
      body: `The transfer market and NIL collective activity in your conference have intensified. Several competitors are making larger NIL commitments. Your current pool may not be competitive for high-demand targets.`,
      staffOpinions: [
        { role:"Recruiting Director", opinion:"Three of our top-5 targets have NIL expectations above our current cap." },
        { role:"Strength Coach",      opinion:"Won't lose current roster to this, but recruiting impact is real." },
      ],
      actions: [
        { id:"boost_nil",   label:"Request Booster NIL Boost",   consequence: "Increases NIL pool; short-term" },
        { id:"adjust_board",label:"Adjust Board to Lower-NIL Targets", consequence: "Safer; may reduce ceiling" },
        { id:"monitor",     label:"Hold Current Strategy",        consequence: "Risk of falling behind" },
      ],
      consequences: {
        boost_nil:    {},
        adjust_board: {},
        monitor:      {},
      },
      targetView: "finance",
      week,
      resolved: false,
      chosenAction: null,
    });
  }

  // ── World event: coaching carousel ──
  if (seededRange(rng, 0, 99) < 18) {
    const programs = Array.isArray(data.standings) ? data.standings.slice(1).map((r) => r[0]) : ["State", "Tech University"];
    const rivalProg = programs[seededRange(rng, 0, programs.length - 1)] || "Rival Program";
    pushInboxEvent({
      id: `coaching-carousel-${career.advanceCount}`,
      category: "World",
      priority: "Low",
      subject: `Coaching change reported at ${rivalProg}`,
      body: `A coaching staff change at ${rivalProg} may create instability in their recruiting class and give your program an opening. Their committed prospects could reconsider.`,
      staffOpinions: [
        { role:"Recruiting Director", opinion:"Two of their commitments play positions we need. This is our window." },
      ],
      actions: [
        { id:"target_commits", label:"Contact Their Decommit Targets", consequence: "Aggressive; could flip 1-2 prospects" },
        { id:"wait_watch",     label:"Monitor Situation",              consequence: "Lower risk; less urgency" },
      ],
      consequences: {
        target_commits: {},
        wait_watch:     {},
      },
      targetView: "recruiting",
      week,
      resolved: false,
      chosenAction: null,
    });
  }

  // Auto-detect promise breaches and fire events
  detectAndInjectPromiseBreachEvents();
}

function updatePlayerMorale(player, delta, cause) {
  ensureCultureState();
  const current = data.cultureState.moraleScores[player.id] || moraleLabelToScore(player.morale);
  const next = Math.max(20, Math.min(98, current + delta));
  data.cultureState.moraleScores[player.id] = next;
  player.morale = moraleScoreToLabel(next);
  data.cultureState.moraleTrace.unshift([
    `${currentSeasonYear()}-${career.advanceCount}`,
    player.name,
    delta > 0 ? `+${delta}` : String(delta),
    player.morale,
    cause,
  ]);
  data.cultureState.moraleTrace = data.cultureState.moraleTrace.slice(0, 20);
}

function ensureFacilitiesState() {
  if (!isRecord(data.facilitiesState)) {
    data.facilitiesState = {
      requestStatus: {},
      upgradeHistory: [],
      longTermBoost: 0,
    };
  }
  if (!isRecord(data.facilitiesState.requestStatus)) data.facilitiesState.requestStatus = {};
  if (!Array.isArray(data.facilitiesState.upgradeHistory)) data.facilitiesState.upgradeHistory = [];
  if (!Number.isInteger(data.facilitiesState.longTermBoost)) data.facilitiesState.longTermBoost = 0;
  if (!Number.isInteger(data.facilitiesState.stadiumUpgradePoints)) data.facilitiesState.stadiumUpgradePoints = 10;
  (Array.isArray(data.facilities) ? data.facilities : []).forEach((row) => {
    if (!isNonEmptyString(data.facilitiesState.requestStatus[row[0]])) data.facilitiesState.requestStatus[row[0]] = "Pending";
  });
}

function parseLevel(levelText) {
  const match = String(levelText || "").match(/Level\s+(\d+)/i);
  return match ? Number(match[1]) : 1;
}

// ── Practice Emphasis ───────────────────────────────────────────────────────
// One-of-four weekly choice that modulates dev-tick gain, injury risk, and
// morale on Continue. The deterministic dev tick picks up the multipliers via
// practiceEmphasisModifiers().
const PRACTICE_EMPHASIS_OPTIONS = [
  { id: "balanced",     label: "Balanced",        blurb: "Steady mix. No bonuses or penalties.",
    devGain: 1.0,  injuryDelta: 0,  staminaDelta: 0,  moraleDelta: 0 },
  { id: "conditioning", label: "Conditioning",    blurb: "Stamina + injury hardening. Skill gain dips.",
    devGain: 0.85, injuryDelta: -8, staminaDelta: 4,  moraleDelta: -1 },
  { id: "schemes",      label: "Schemes",         blurb: "Mental dev focus (decisions, anticipation). Fatigue rises.",
    devGain: 1.18, injuryDelta: 0,  staminaDelta: -2, moraleDelta: 1, mentalBoost: true },
  { id: "position",     label: "Position Drills", blurb: "Position-specific attribute focus. Highest skill gain.",
    devGain: 1.25, injuryDelta: 4,  staminaDelta: -1, moraleDelta: 0, posAttrBoost: true },
  { id: "recovery",     label: "Recovery",        blurb: "Reset week. Heals fatigue + morale; minimal dev.",
    devGain: 0.55, injuryDelta: -14, staminaDelta: 6, moraleDelta: 3 },
];
const PRACTICE_EMPHASIS_MAP = Object.fromEntries(PRACTICE_EMPHASIS_OPTIONS.map((opt) => [opt.id, opt]));

function ensurePracticeState() {
  if (!isRecord(data.practiceState)) {
    data.practiceState = { emphasis: "balanced", history: [] };
  }
  if (!isNonEmptyString(data.practiceState.emphasis) || !PRACTICE_EMPHASIS_MAP[data.practiceState.emphasis]) {
    data.practiceState.emphasis = "balanced";
  }
  if (!Array.isArray(data.practiceState.history)) data.practiceState.history = [];
}

// PERSIST-1: ensure event/action logs exist and are routed through the typed
// helpers when modules are loaded. Falls back to plain arrays when they aren't
// (which shouldn't happen in the browser path but keeps the legacy harness
// happy).
function ensureEventLog() {
  if (!window.CGM_EVENT_LOG) return null;
  if (!data.eventLog || !Array.isArray(data.eventLog.events)) {
    data.eventLog = window.CGM_EVENT_LOG.createLog();
  } else if (!data.eventLog.byCategory) {
    // Just-loaded from a save: rehydrate into a typed log.
    data.eventLog = window.CGM_EVENT_LOG.rehydrateLog(data.eventLog);
  }
  return data.eventLog;
}
function ensureActionLog() {
  if (!window.CGM_ACTION_LOG) return null;
  if (!data.actionLog || !Array.isArray(data.actionLog.actions)) {
    data.actionLog = window.CGM_ACTION_LOG.createLog();
  } else if (!data.actionLog.byType) {
    data.actionLog = window.CGM_ACTION_LOG.rehydrateLog(data.actionLog);
  }
  return data.actionLog;
}

// REC-1: ensure prospect suitor lists exist; backfill the player school as a
// suitor on every prospect so old saves work cleanly.
function ensureProspectSuitors() {
  if (!window.CGM_RECRUITING_V2 || !Array.isArray(data.prospectProfiles)) return;
  const REC = window.CGM_RECRUITING_V2;
  const myProg = programById(career.programId);
  data.prospectProfiles.forEach((p) => {
    if (!Array.isArray(p.suitors)) p.suitors = [];
    REC.findOrCreateSuitor(p, myProg.id, myProg.shortName);
    const us = p.suitors.find((s) => s.schoolId === myProg.id);
    if (us && Number.isFinite(p.interest) && us.interest === 0) us.interest = p.interest;
    // Audit fix #9: seed 1-3 rival suitors per prospect on first contact so
    // the recruiting board doesn't show "Tennessee" as the leader for every
    // prospect on day one. Picks rivals deterministically from same conf +
    // a couple of national contenders, with interest jittered.
    const starsNum = parseInt(String(p.stars).replace(/[^0-9]/g, ""), 10) || 0;
    if (p.suitors.length === 1 && (starsNum >= 3 || (p.ovr || 0) >= 75)) {
      const rivalRng = createSeededRandom(`${career.seed}:rivals:${p.id}`);
      const ratingOf = (q) => Number(q.programRating) || Number(q.basePrestige) || 60;
      const candidatePool = programs.filter((q) => q.id !== myProg.id && ratingOf(q) >= 60);
      const sameConf = candidatePool.filter((q) => q.conference === myProg.conference);
      const elsewhere = candidatePool.filter((q) => q.conference !== myProg.conference);
      const rivals = [];
      if (sameConf.length) rivals.push(sameConf[Math.floor(rivalRng() * sameConf.length)]);
      if (sameConf.length > 1) {
        let pick;
        let safety = 0;
        do { pick = sameConf[Math.floor(rivalRng() * sameConf.length)]; safety++; } while (rivals.includes(pick) && safety < 6);
        if (!rivals.includes(pick)) rivals.push(pick);
      }
      if (elsewhere.length) rivals.push(elsewhere[Math.floor(rivalRng() * elsewhere.length)]);
      // Player's own interest jittered around their .interest field
      if (us) {
        us.interest = Math.max(20, Math.min(99, (Number(p.interest) || 50) + Math.round((rivalRng() - 0.5) * 20)));
        us.reasonCodes = ["initial_contact"];
      }
      rivals.forEach((rival) => {
        const baseInterest = Math.round(45 + (ratingOf(rival) - 60) * 0.6 + (rivalRng() - 0.5) * 25);
        const interest = Math.max(20, Math.min(99, baseInterest));
        const suitor = REC.findOrCreateSuitor(p, rival.id, rival.shortName);
        if (suitor && suitor.interest === 0) {
          suitor.interest = interest;
          suitor.reasonCodes = ["program_targets_position"];
        }
      });
    }
  });
}

function runWeeklyAiRecruitingTickIfNeeded(weekIndex) {
  if (!window.CGM_AI_RECRUITING || !Array.isArray(data.prospectProfiles)) return null;
  ensureProspectSuitors();
  const aiStandings = ensureAiSchoolStandings();
  const random = createSeededRandom(`${career.seed}:ai-rec:${currentSeasonYear()}:${weekIndex || 0}`);
  const result = window.CGM_AI_RECRUITING.runWeeklyAiRecruitingTick({
    programs,
    prospects: data.prospectProfiles,
    random,
    playerTeamId: career.programId,
    weekIndex: weekIndex || 0,
    aiStandings,
  });
  // Emit commit events for each prospect that committed this tick.
  (result.commitEvents || []).forEach((evt) => {
    logEvent({
      category: "recruit_commit",
      severity: evt.isPlayerCommit ? "major" : "minor",
      actorId: evt.schoolId,
      actorName: evt.schoolName,
      subjectIds: [evt.prospectId],
      summary: evt.isPlayerCommit
        ? `Got the commit from ${evt.position} ${evt.prospectName}`
        : `${evt.position} ${evt.prospectName} (${evt.stars}) commits to ${evt.schoolName}`,
      reasonCodes: ["commit_resolved", evt.isPlayerCommit ? "player_school_won" : "rival_school_won"],
      data: { prospectId: evt.prospectId, schoolId: evt.schoolId, runnerUpId: evt.runnerUpId },
    });
  });
  // AI-NIL-1: bidding-war pass for top uncommitted prospects this week.
  runAiNilBiddingTick(weekIndex);
  return result;
}

function runAiNilBiddingTick(weekIndex) {
  const N = window.CGM_AI_NIL;
  if (!N || !Array.isArray(data.prospectProfiles)) return null;
  // Filter to uncommitted seniors with high enough stars to draw real bids.
  const targets = data.prospectProfiles.filter((p) =>
    !p.committedToUs && !p.committedTo && (p.stars >= 4 || (p.ovr || 0) >= 80)
  ).slice(0, 30);
  if (!targets.length) return null;
  // Build a school index: each AI program's NIL pool comes from a per-school
  // state (or a synthetic estimate from prestige tier).
  const schoolIndex = {};
  programs.forEach((prog) => {
    if (prog.id === career.programId) return; // we don't bid against ourselves
    const tier = prog.nilTier || Math.max(1, Math.round((prog.prestige || 60) / 10));
    schoolIndex[prog.id] = {
      id: prog.id,
      nilStateMillions: 0.5 + tier * 0.7, // synthetic pool, refreshed annually
      prestige: prog.prestige || 60,
    };
  });
  const random = createSeededRandom(`${career.seed}:ai-nil:${currentSeasonYear()}:${weekIndex || 0}`);
  const result = N.runWeeklyBiddingTick({
    prospects: targets, schoolIndex, random,
  });
  // Apply interest deltas to prospect.suitors and emit a notable event for
  // the highest single bid so the user sees the pressure.
  result.rounds.forEach((round) => {
    const prospect = data.prospectProfiles.find((p) => p.id === round.prospectId);
    if (!prospect) return;
    round.bids.forEach((bid) => {
      const suitor = (prospect.suitors || []).find((s) => s.schoolId === bid.schoolId);
      if (suitor) {
        suitor.interest = Math.min(99, (suitor.interest || 0) + (bid.interestDelta || 0));
      }
    });
    if (round.bids[0] && round.bids[0].amountM >= 0.5) {
      const top = round.bids[0];
      const topSchool = programs.find((p) => p.id === top.schoolId);
      logEvent({
        category: "nil_bid",
        severity: top.amountM >= 1.5 ? "notable" : "minor",
        actorId: top.schoolId,
        actorName: topSchool ? topSchool.shortName : top.schoolId,
        subjectIds: [round.prospectId],
        summary: `${topSchool ? topSchool.shortName : top.schoolId} pushed $${top.amountM}M at ${prospect.position} ${prospect.name || round.prospectId}`,
        reasonCodes: top.reasonCodes || [],
      });
    }
  });
  return result;
}

// PULSE-1: Campus Pulse helpers.
function ensurePulseState() {
  if (!isRecord(data.pulseState)) data.pulseState = { snapshot: null, history: [] };
  return data.pulseState;
}

function recomputeCampusPulse() {
  if (!window.CGM_CAMPUS_PULSE) return null;
  const state = ensurePulseState();
  const log = ensureEventLog();
  if (!log) return state.snapshot || null;
  const snapshot = window.CGM_CAMPUS_PULSE.computePulseSnapshot(log, {
    prevSnapshot: state.snapshot,
    currentWeek: career.advanceCount || 0,
  });
  state.snapshot = snapshot;
  state.history.unshift({ week: career.advanceCount, temperature: snapshot.temperature });
  state.history = state.history.slice(0, 24);
  return snapshot;
}

// NIL-1: ensure NIL state exists for the player school.
function ensureNilState() {
  if (!window.CGM_NIL) return null;
  const myProg = programById(career.programId);
  if (!isRecord(data.nilState)) data.nilState = window.CGM_NIL.emptyState(myProg);
  data.nilState = window.CGM_NIL.ensureState(data.nilState, myProg);
  return data.nilState;
}

function tickNilWeekly() {
  if (!window.CGM_NIL) return;
  const state = ensureNilState();
  const myProg = programById(career.programId);
  // Pull booster temperature from Pulse if available.
  const pulse = ensurePulseState().snapshot;
  const boosterScore = pulse && pulse.components ? (pulse.components.find((c) => c.id === "boosterTemperature") || { score: 55 }).score : 55;
  state.lastWeek = career.advanceCount || 0;
  window.CGM_NIL.rechargeWeekly(state, myProg, boosterScore);
  if (window.CGM_NIL.maybeFlagCompliance(state)) {
    logEvent({
      category: "media_clip",
      severity: "notable",
      actorId: career.programId,
      actorName: myProg.shortName,
      summary: `Compliance office flags NIL spend at ${myProg.shortName}`,
      reasonCodes: ["compliance_flag"],
    });
  }
}

// DRAFT-1: process senior outflow at year rollover.
function processYearEndDraftOutflow() {
  if (!window.CGM_DRAFT) return null;
  const random = createSeededRandom(`${career.seed}:draft:${currentSeasonYear()}`);
  // Snapshot players BEFORE outflow so we can recover full player refs (with
  // their careerStats) for the alumni archive even though `data.playerProfiles`
  // gets overwritten below.
  const playersSnapshot = players().slice();
  const playerById = {};
  playersSnapshot.forEach((p) => { playerById[p.id] = p; });
  const result = window.CGM_DRAFT.processSeniorOutflow(playersSnapshot, random);
  // Mutate the roster: keep returning, drop departing.
  const myProg = programById(career.programId);
  data.playerProfiles = result.returning;
  // Stash the draft class on the season state for History panel.
  if (!Array.isArray(data.draftClasses)) data.draftClasses = [];
  const archive = window.CGM_DRAFT.buildArchiveRow(currentSeasonYear(), result.classSummary, result.departing);
  data.draftClasses.unshift({ ...archive, departing: result.departing });
  // ARCHIVE-1: keep ALL draft classes, no 10-year cap. Multi-decade careers
  // get the full pipeline ledger for History → Alumni.
  // (Old code: data.draftClasses = data.draftClasses.slice(0, 10);)

  // ARCHIVE-1: push permanent alumni records for each departing player so
  // their career stats persist forever, even after the roster drops them.
  if (window.CGM_ALUMNI) {
    if (!Array.isArray(data.alumniArchive)) data.alumniArchive = [];
    // The departing entries are summary records from CGM_DRAFT; we need to
    // recover the full player object (with careerStats) from the prior roster
    // snapshot before it was overwritten.
    const departingWithRefs = result.departing.map((d) => {
      // Use the pre-outflow snapshot so we get the full player object with
      // its accumulated careerStats. The departing entries themselves only
      // carry summary fields, so without the snapshot the alumni record was
      // showing seasons=0.
      const ref = playerById[d.playerId]
        || { id: d.playerId, name: d.name, position: d.position, year: "SR", ovr: d.ovr, careerStats: d.careerStats };
      return { ...d, playerRef: ref };
    });
    const alumniRecs = window.CGM_ALUMNI.archiveDepartures({
      departing: departingWithRefs,
      seasonYear: currentSeasonYear(),
      programId: career.programId,
    });
    alumniRecs.forEach((rec) => data.alumniArchive.push(rec));
  }
  // Emit events
  result.departing.slice(0, 6).forEach((d) => {
    logEvent({
      category: "milestone",
      severity: d.draftRound === 1 ? "major" : d.draftRound ? "notable" : "minor",
      actorId: career.programId,
      actorName: myProg.shortName,
      subjectIds: [d.playerId],
      summary: d.draftRound
        ? `${d.position} ${d.name} projected ${d.draftTier}`
        : `${d.position} ${d.name} departs (${d.draftTier})`,
      reasonCodes: ["draft_departure", d.departReason],
    });
  });
  return result;
}

// AI-SCHOOL-1: cache + helpers for the rival-game weekly tick.
function ensureAiSchoolStandings() {
  if (!window.CGM_AI_SCHOOL) return null;
  if (!isRecord(data.aiSchoolStandings) || !Object.keys(data.aiSchoolStandings).length) {
    data.aiSchoolStandings = window.CGM_AI_SCHOOL.initStandings(programs);
  }
  return data.aiSchoolStandings;
}

function runAiSchoolWeeklyTickIfNeeded(weekIndex) {
  const standings = ensureAiSchoolStandings();
  if (!standings) return null;
  const seedString = `${career.seed}:ai-school:${currentSeasonYear()}:${weekIndex || 0}`;
  const random = createSeededRandom(seedString);
  const events = window.CGM_AI_SCHOOL.runWeeklyAiSchoolTick({
    programs,
    standings,
    random,
    playerTeamId: career.programId,
    volatility: ruleValue("volatilityPercent", 100) / 100,
    weekIndex: weekIndex || 0,
  });
  // Emit a roll-up event so the Recent Events panel acknowledges the tick.
  if (events.length) {
    logEvent({
      category: "media_clip",
      severity: "minor",
      actorId: "world",
      actorName: "National Wire",
      summary: `${events.length} games around the country this week`,
      reasonCodes: ["world_tick"],
      data: { sample: events.slice(0, 3) },
    });
  }
  return events;
}

function resetAiSchoolForNewSeason() {
  const standings = ensureAiSchoolStandings();
  if (!standings || !window.CGM_AI_SCHOOL) return;
  window.CGM_AI_SCHOOL.resetSeasonRecords(standings);
}

function logEvent(spec) {
  const log = ensureEventLog();
  if (!log) return null;
  try {
    const id = spec.id || `evt-${currentSeasonYear()}-${career.advanceCount}-${log.count + 1}`;
    const event = window.CGM_EVENT_LOG.createEvent({
      ...spec,
      id,
      season: spec.season || currentSeasonYear(),
      week: spec.week || (data.seasonState ? `Wk ${data.seasonState.currentGameIndex || 0}` : null),
    });
    return window.CGM_EVENT_LOG.appendEvent(log, event);
  } catch (e) {
    if (window.console) window.console.warn("logEvent failed:", e && e.message);
    return null;
  }
}

function logAction(spec) {
  const log = ensureActionLog();
  if (!log) return null;
  try {
    const id = spec.id || `act-${currentSeasonYear()}-${career.advanceCount}-${log.count + 1}`;
    const action = window.CGM_ACTION_LOG.createAction({
      ...spec,
      id,
      season: spec.season || currentSeasonYear(),
      week: spec.week || (data.seasonState ? `Wk ${data.seasonState.currentGameIndex || 0}` : null),
    });
    return window.CGM_ACTION_LOG.appendAction(log, action);
  } catch (e) {
    if (window.console) window.console.warn("logAction failed:", e && e.message);
    return null;
  }
}

function currentPracticeEmphasis() {
  ensurePracticeState();
  return PRACTICE_EMPHASIS_MAP[data.practiceState.emphasis] || PRACTICE_EMPHASIS_MAP.balanced;
}

function setPracticeEmphasis(id) {
  if (!PRACTICE_EMPHASIS_MAP[id]) return false;
  ensurePracticeState();
  const previous = data.practiceState.emphasis;
  // PERSIST-2 v2: dispatch through CGM_REPLAY for replay verification.
  dispatchToReplay("SET_PRACTICE_EMPHASIS", { emphasis: id });
  data.practiceState.emphasis = id;
  data.practiceState.history.unshift({
    week: career.advanceCount || 0,
    emphasis: id,
    label: PRACTICE_EMPHASIS_MAP[id].label,
  });
  data.practiceState.history = data.practiceState.history.slice(0, 12);
  logAction({
    type: "practice_emphasis_set",
    actorId: career.programId,
    actorRole: "user",
    summary: `Practice emphasis set to ${PRACTICE_EMPHASIS_MAP[id].label}`,
    reasonCodes: ["user_choice"],
    patchBefore: { emphasis: previous },
    patchAfter: { emphasis: id },
  });
  markDirty();
  return true;
}

function practiceEmphasisPanel() {
  const current = currentPracticeEmphasis();
  const buttons = PRACTICE_EMPHASIS_OPTIONS.map((opt) => {
    const isActive = opt.id === current.id;
    return `<button class="small-action${isActive ? "" : " secondary"}" data-practice-emphasis="${opt.id}">${opt.label}</button>`;
  }).join(" ");
  const effects = [
    ["Skill gain", current.devGain >= 1.1 ? "Boosted" : current.devGain >= 0.95 ? "Steady" : current.devGain >= 0.7 ? "Reduced" : "Minimal"],
    ["Injury risk", current.injuryDelta <= -10 ? "Much lower" : current.injuryDelta < 0 ? "Lower" : current.injuryDelta > 0 ? "Higher" : "Unchanged"],
    ["Stamina", current.staminaDelta > 0 ? "Recovering" : current.staminaDelta < 0 ? "Drained" : "Steady"],
    ["Morale tilt", current.moraleDelta > 0 ? "Positive" : current.moraleDelta < 0 ? "Negative" : "Neutral"],
  ];
  const effectRows = effects.map(([k, v]) => `<div class="data-row"><span>${k}</span><span>${v}</span></div>`).join("");
  const recent = (data.practiceState && Array.isArray(data.practiceState.history) ? data.practiceState.history : [])
    .slice(0, 4)
    .map((h) => `<div class="data-row"><span>Wk ${h.week}</span><span>${h.label}</span></div>`)
    .join("") || `<div class="data-row"><span>—</span><span>No prior weeks</span></div>`;
  return `<div class="agenda-item"><strong>Active emphasis: ${current.label}</strong><p>${current.blurb}</p></div>
    <div class="decision-actions" style="margin:10px 0">${buttons}</div>
    <p class="label" style="margin-bottom:6px">Weekly Effects</p>
    <div class="data-list">${effectRows}</div>
    <p class="label" style="margin:10px 0 6px">Recent Weeks</p>
    <div class="data-list">${recent}</div>`;
}

function applyFacilityRequest(rowIndex, action) {
  ensureFacilitiesState();
  ensureBenefitState();
  const row = Array.isArray(data.facilities) ? data.facilities[rowIndex] : null;
  if (!row) return false;
  const area = row[0];
  if (action === "defer") {
    data.facilitiesState.requestStatus[area] = "Deferred";
    appendPressureTrace("Facilities", 2, `${area} request deferred`);
    return true;
  }
  if (action !== "approve") return false;
  if (!commitBenefits("emergency", 20)) return false;
  const level = parseLevel(row[1]);
  const nextLevel = Math.min(5, level + 1);
  row[1] = `Level ${nextLevel}`;
  row[4] = `${Math.min(95, 50 + (nextLevel * 10))}%`;
  data.facilitiesState.requestStatus[area] = "Approved";
  data.facilitiesState.longTermBoost += 1;
  data.facilitiesState.upgradeHistory.unshift([
    String(currentSeasonYear()),
    area,
    `Level ${level} -> Level ${nextLevel}`,
    "Approved",
    `Boost ${data.facilitiesState.longTermBoost}`,
  ]);
  data.facilitiesState.upgradeHistory = data.facilitiesState.upgradeHistory.slice(0, 10);
  career.generatedProfile.prestige = clampRating(career.generatedProfile.prestige + 1);
  adjustProgramConfidence(1, 2);
  appendPressureTrace("Facilities", -3, `${area} upgrade approved`);
  return true;
}

function evaluatePromiseAndMoraleAfterUsage() {
  ensureCultureState();
  ensureRetentionState();
  players().forEach((player) => {
    const promise = data.cultureState.promiseLedger[player.id] || "Rotation";
    const usage = player.eligibility.gamesPlayedThisSeason;
    if (promise === "High Usage") {
      if (usage === 0 && data.seasonState.currentGameIndex >= 2) {
        updatePlayerMorale(player, scaledProgressionDelta(-8), "Broken usage promise");
      } else if (usage >= 3) {
        updatePlayerMorale(player, scaledProgressionDelta(3), "Usage promise met");
      }
    } else if (promise === "Rotation") {
      if (usage === 0 && data.seasonState.currentGameIndex >= 3) {
        updatePlayerMorale(player, scaledProgressionDelta(-4), "No rotation reps delivered");
      } else if (usage >= 1) {
        updatePlayerMorale(player, scaledProgressionDelta(2), "Rotation reps delivered");
      }
    } else if (promise === "Development Year") {
      if (usage <= 1) {
        updatePlayerMorale(player, scaledProgressionDelta(2), "Development promise held");
      } else {
        updatePlayerMorale(player, scaledProgressionDelta(-8), "Development promise overused");
      }
    }

    const key = `${player.position}:${player.name}`;
    if (Number.isInteger(data.retentionState.playerRisk[key])) {
      if (player.morale === "Low") data.retentionState.playerRisk[key] = Math.min(95, data.retentionState.playerRisk[key] + 4);
      if (player.morale === "High") data.retentionState.playerRisk[key] = Math.max(5, data.retentionState.playerRisk[key] - 3);
    }
  });
  updateOutgoingRiskRowsFromState();
}

function scaledProgressionDelta(baseDelta) {
  const pace = ruleValue("progressionPacePercent", 100);
  const scaled = Math.round(baseDelta * (pace / 100));
  if (scaled === 0) return baseDelta > 0 ? 1 : -1;
  return scaled;
}

function ensureWorldModelState() {
  if (!isRecord(data.worldModelState)) {
    data.worldModelState = {
      marketHeat: 50,
      developmentIntensity: 50,
      tacticalCohesion: 50,
      relationshipTrace: [],
      realismProjectionRows: [],
      realismProjectionScore: null,
    };
  }
  if (!Number.isInteger(data.worldModelState.marketHeat)) data.worldModelState.marketHeat = 50;
  if (!Number.isInteger(data.worldModelState.developmentIntensity)) data.worldModelState.developmentIntensity = 50;
  if (!Number.isInteger(data.worldModelState.tacticalCohesion)) data.worldModelState.tacticalCohesion = 50;
  if (!Array.isArray(data.worldModelState.relationshipTrace)) data.worldModelState.relationshipTrace = [];
  if (!Array.isArray(data.worldModelState.realismProjectionRows)) data.worldModelState.realismProjectionRows = [];
  if (!Number.isFinite(data.worldModelState.realismProjectionScore)) data.worldModelState.realismProjectionScore = null;
}

function transferPopulationScale() {
  return Math.max(0.6, Math.min(1.8, ruleValue("transferPopulationPercent", 100) / 100));
}

function averageAttr(attrs, keys, fallback = 10) {
  if (!isRecord(attrs) || !Array.isArray(keys) || !keys.length) return fallback;
  const total = keys.reduce((sum, key) => sum + (Number.isInteger(attrs[key]) ? attrs[key] : fallback), 0);
  return total / keys.length;
}

function yearDevelopmentCurve(year) {
  if (year === "FR") return 1.25;
  if (year === "SO") return 1.05;
  if (year === "JR") return 0.82;
  if (year === "SR") return 0.58;
  return 0.75;
}

function developmentFocusKeys(focus) {
  if (focus === "Strength") return ["strength", "stamina", "balance", "agility", "bravery", "determination"];
  if (focus === "Film Study") return ["decisions", "anticipation", "positioning", "vision", "concentration", "composure"];
  return ["technique", "firstTouch", "workRate", "teamwork", "offTheBall", "acceleration"];
}

function positionFitScore(player, position) {
  const keys = [...(KEY_ATTRS_BY_POSITION[position] || [])];
  if (!keys.length) return 8;
  const technical = averageAttr(player.attrs, keys, 10);
  const physical = averageAttr(player.attrs, ["pace", "acceleration", "agility", "strength", "stamina", "balance", "jumping"], 10);
  const mental = averageAttr(player.attrs, ["decisions", "anticipation", "composure", "determination", "workRate", "positioning"], 10);
  return (technical * 0.7) + (physical * 0.2) + (mental * 0.1);
}

function recomputePlayerBestPositions(player) {
  const scored = Object.keys(KEY_ATTRS_BY_POSITION)
    .map((position) => ({ position, score: positionFitScore(player, position) }))
    .sort((left, right) => right.score - left.score);
  const topTwo = scored.slice(0, 2).map((entry) => entry.position);
  player.positions = topTwo.length ? topTwo : [player.position];
  if (player.year === "FR" && player.eligibility.gamesPlayedThisSeason === 0 && topTwo.length) {
    player.position = topTwo[0];
  }
}

function recomputePlayerOverall(player) {
  const basePosition = player.position;
  const fit = positionFitScore(player, basePosition);
  const converted = Math.round(57 + (fit * 2.1));
  const smoothed = Math.round(((Number(player.ovr) || 70) * 0.72) + (converted * 0.28));
  player.ovr = Math.max(55, Math.min(Math.max(player.pot - 8, 55), smoothed));
}

function syncRosterRatingsFromProfiles() {
  if (!Array.isArray(data.roster)) return;
  const byName = new Map(players().map((player) => [player.name, player]));
  data.roster.forEach((row) => {
    if (!Array.isArray(row) || row.length < 4) return;
    const player = byName.get(row[1]);
    if (!player) return;
    row[0] = player.position;
    row[3] = String(player.ovr);
  });
}

function worldModelTrace(source, detail) {
  ensureWorldModelState();
  data.worldModelState.relationshipTrace.unshift([
    `${currentSeasonYear()}-${career.advanceCount}`,
    source,
    detail,
  ]);
  data.worldModelState.relationshipTrace = data.worldModelState.relationshipTrace.slice(0, 16);
}

function coordinatorProfilesForProgram(programId) {
  ensureStaffState();
  return data.coordinatorProfiles.filter((profile) => profile.programId === programId);
}

function coordinatorInfluenceSnapshot(programId = career.programId) {
  const profiles = coordinatorProfilesForProgram(programId);
  if (!profiles.length) {
    return {
      offense: 10,
      defense: 10,
      recruiting: 10,
      conditioning: 10,
      development: 10,
    };
  }
  const byRole = (role) => profiles.find((profile) => profile.role === role);
  const oc = byRole("Offensive Coordinator");
  const dc = byRole("Defensive Coordinator");
  const rd = byRole("Recruiting Director");
  const sc = byRole("Strength Coach");
  return {
    offense: averageAttr(oc && oc.attrs, ["offensiveStrategy", "playCalling", "qbDevelopment", "inGameAdaptation"], 10),
    defense: averageAttr(dc && dc.attrs, ["defensiveStrategy", "gameManagement", "opponentAnalysis", "inGameAdaptation"], 10),
    recruiting: averageAttr(rd && rd.attrs, ["recruitment", "scoutingCurrent", "scoutingPotential", "negotiating", "mediaHandling"], 10),
    conditioning: averageAttr(sc && sc.attrs, ["strengthConditioning", "sportsScience", "discipline", "motivation"], 10),
    development: averageAttr(
      [oc, dc, sc].filter(Boolean).reduce((acc, item) => {
        if (!acc) return item.attrs;
        return Object.keys(acc).reduce((next, key) => {
          next[key] = Math.round((acc[key] + (item.attrs[key] || 10)) / 2);
          return next;
        }, {});
      }, null),
      ["teaching", "academyDevelopment", "discipline", "motivation", "adaptability"],
      10,
    ),
  };
}

function ensureProspectAgentFields(prospect) {
  const random = createSeededRandom(`${career.seed}:prospect-agent:${prospect.id}`);
  if (!isNonEmptyString(prospect.agentType)) {
    prospect.agentType = PROSPECT_AGENT_TYPES[seededRange(random, 0, PROSPECT_AGENT_TYPES.length - 1)];
  }
  if (!Number.isInteger(prospect.demandScore)) prospect.demandScore = seededRange(random, 6, 17);
  if (!Number.isInteger(prospect.leverageScore)) prospect.leverageScore = seededRange(random, 5, 16);
}

function prospectNegotiationCost(action, prospect) {
  const base = action === "visit" ? 14 : action === "offer" ? 10 : action === "contact" ? 6 : 3;
  const volatility = Math.max(0.7, Math.min(1.8, ruleValue("nilVolatilityPercent", 100) / 100));
  const demand = Number.isInteger(prospect.demandScore) ? prospect.demandScore : 10;
  const leverage = Number.isInteger(prospect.leverageScore) ? prospect.leverageScore : 10;
  const agentBias = prospect.agentType === "Value Seeker" ? 1.2 : prospect.agentType === "Brand Builder" ? 1.15 : prospect.agentType === "Early Path" ? 0.95 : 0.9;
  const raw = base * volatility * agentBias * (0.7 + (demand / 20)) * (0.8 + (leverage / 24));
  return Math.max(2, Math.round(raw));
}

function recruitingNegotiationBonus(prospect) {
  const school = currentSchoolProfile();
  const coord = coordinatorInfluenceSnapshot();
  const nilSupport = averageAttr(school && school.attrs, ["nilCapacity", "nilStructure", "boosterStrength", "brandReach"], 10);
  const demandPenalty = Math.max(0, (Number(prospect.demandScore) || 10) - 10);
  const leveragePenalty = Math.max(0, (Number(prospect.leverageScore) || 10) - 10);
  return Math.round(((coord.recruiting - 10) * 0.8) + ((nilSupport - 10) * 0.6) - (demandPenalty * 0.5) - (leveragePenalty * 0.4));
}

function simulateAiProgramEcosystemTick() {
  ensureStaffState();
  ensureWorldModelState();
  const activeProspects = prospects().filter((prospect) => prospect.commitmentStatus === "Open");
  programs.forEach((program) => {
    if (program.id === career.programId) return;
    const state = data.aiProgramStates[program.id];
    if (!state) return;
    const coach = profileLookup(data.coachProfiles, program.headCoachProfileId);
    const school = profileLookup(data.schoolProfiles, program.schoolProfileId);
    const coord = coordinatorInfluenceSnapshot(program.id);
    const coaching = averageAttr(coach && coach.attrs, ["tacticalKnowledge", "inGameAdaptation", "teaching", "manManagement"], 10);
    const institutional = averageAttr(school && school.attrs, ["boosterStrength", "nilCapacity", "facilitiesQuality", "pipelineAccess"], 10);
    const random = createSeededRandom(`${career.seed}:ai:${program.id}:${currentSeasonYear()}:${career.advanceCount}`);
    state.recruitingMomentum = Math.max(15, Math.min(95, Math.round(state.recruitingMomentum + ((coord.recruiting - 10) * 0.55) + ((institutional - 10) * 0.4) + seededRange(random, -3, 3))));
    state.developmentQuality = Math.max(15, Math.min(95, Math.round(state.developmentQuality + ((coord.development - 10) * 0.45) + ((coaching - 10) * 0.35) + seededRange(random, -2, 2))));
    state.portalAggression = Math.max(10, Math.min(95, Math.round(state.portalAggression + ((data.worldModelState.marketHeat - 50) * 0.15) + seededRange(random, -2, 3))));
    state.rosterQuality = Math.max(20, Math.min(99, Math.round((state.recruitingMomentum * 0.3) + (state.developmentQuality * 0.35) + (coaching * 2.1) + seededRange(random, -2, 2))));

    const standing = data.standings.find((row) => row[1] === program.shortName || row[1] === program.name);
    if (standing) {
      const current = Number(standing[3]) || 80;
      const target = Math.max(68, Math.min(99, Math.round((current * 0.84) + (state.rosterQuality * 0.16))));
      standing[3] = String(target);
      standing[4] = target >= 92 ? "A" : target >= 88 ? "A-" : target >= 84 ? "B+" : target >= 80 ? "B" : "B-";
    }
  });

  if (activeProspects.length) {
    const competitors = Object.values(data.aiProgramStates);
    const pressure = competitors.length
      ? competitors.reduce((sum, entry) => sum + entry.recruitingMomentum, 0) / competitors.length
      : 50;
    const pressureDelta = pressure >= 68 ? 2 : pressure <= 42 ? 0 : 1;
    activeProspects.forEach((prospect) => {
      prospect.interest = Math.max(1, prospect.interest - pressureDelta);
      recalcProspectState(prospect);
    });
  }
  worldModelTrace("AI Ecosystem", `Avg rival recruiting pressure applied to ${activeProspects.length} open prospects`);
}

function aiProgramRaceRows() {
  ensureStaffState();
  const header = [["Program", "Recruiting", "Development", "Portal", "Roster"]];
  const rows = programs
    .filter((program) => program.id !== career.programId)
    .map((program) => {
      const state = data.aiProgramStates[program.id] || { recruitingMomentum: 50, developmentQuality: 50, portalAggression: 50, rosterQuality: 50 };
      return [
        program.shortName,
        String(state.recruitingMomentum),
        String(state.developmentQuality),
        String(state.portalAggression),
        String(state.rosterQuality),
      ];
    });
  return [...header, ...rows];
}

function targetPortalPopulation() {
  const base = 8;
  const scaled = Math.round(base * transferPopulationScale());
  return Math.max(4, Math.min(22, scaled));
}

function synthesizePortalCandidate(seed, index) {
  const random = createSeededRandom(`${seed}:portal:${currentSeasonYear()}:${career.advanceCount}:${index}`);
  const position = PROSPECT_POSITIONS[seededRange(random, 0, PROSPECT_POSITIONS.length - 1)];
  const first = PROSPECT_FIRST_NAMES[seededRange(random, 0, PROSPECT_FIRST_NAMES.length - 1)];
  const last = PROSPECT_LAST_NAMES[seededRange(random, 0, PROSPECT_LAST_NAMES.length - 1)];
  const year = ["FR", "SO", "JR", "SR"][seededRange(random, 0, 3)];
  const rating = seededRange(random, 74, 90);
  const note = seededRange(random, 1, 100) <= 40 ? "Wants immediate role" : "Scheme fit, market active";
  return [position, `${first} ${last}`, year, String(rating), note];
}

function rebalancePortalPopulationTick() {
  ensurePortalState();
  if (!Array.isArray(data.portal)) data.portal = [];
  const target = targetPortalPopulation();
  const used = new Set(data.portal.map((row) => row[1]));
  let guard = 0;
  while (data.portal.length < target && guard < 64) {
    const candidate = synthesizePortalCandidate(career.seed, data.portal.length + guard);
    if (!used.has(candidate[1])) {
      used.add(candidate[1]);
      data.portal.push(candidate);
      if (!isNonEmptyString(data.portalState.targetStatus[candidate[1]])) {
        data.portalState.targetStatus[candidate[1]] = candidate[4];
      }
    }
    guard += 1;
  }

  if (data.portal.length > target) {
    const pending = new Set(data.portalState.pendingAdds || []);
    const kept = [];
    data.portal.forEach((row) => {
      if (kept.length < target) {
        kept.push(row);
        return;
      }
      if (pending.has(row[1])) kept.push(row);
    });
    data.portal = kept.slice(0, Math.max(target, pending.size));
  }
}

function runFiveYearRealityProjection() {
  ensureWorldModelState();
  const years = 5;
  const baseYear = clampInteger(career.startYear, 2010, 2035, currentSeasonYear());
  const anchor = Math.max(0.6, Math.min(1.4, ruleValue("realityAnchorPercent", 100) / 100));
  const transferScale = transferPopulationScale();
  const nilScale = Math.max(0.7, Math.min(1.6, ruleValue("nilVolatilityPercent", 100) / 100));
  const progressionScale = Math.max(0.7, Math.min(1.6, ruleValue("progressionPacePercent", 100) / 100));
  const random = createSeededRandom(`${career.seed}:realism-projection:${baseYear}:${career.advanceCount}`);
  const rows = [["Year", "Transfer %", "Top-25 hit", "Total Pts", "Reality Gap"]];
  let totalGap = 0;

  for (let offset = 0; offset < years; offset += 1) {
    const year = baseYear + offset;
    const targetTransferRate = Math.min(32, Math.max(14, 16 + ((year - 2020) * 1.6)));
    const simulatedTransferRate = Math.max(10, Math.min(40,
      targetTransferRate
      + ((transferScale - 1) * 11)
      + ((nilScale - 1) * 7)
      + seededRange(random, -3, 4),
    ));
    const targetTop25 = 65;
    const simulatedTop25 = Math.max(35, Math.min(92,
      targetTop25
      + ((anchor - 1) * 18)
      + ((progressionScale - 1) * 9)
      - ((transferScale - 1) * 6)
      + seededRange(random, -5, 5),
    ));
    const targetTotalPoints = Math.min(66, Math.max(49, 55 + ((year - 2020) * 0.6)));
    const simulatedTotalPoints = Math.max(42, Math.min(72,
      targetTotalPoints
      + ((ruleValue("scoringEnvironmentPercent", 100) - 100) * 0.08)
      + ((ruleValue("volatilityPercent", 100) - 100) * 0.04)
      + seededRange(random, -3, 3),
    ));

    const gap = Math.round(
      Math.abs(simulatedTransferRate - targetTransferRate)
      + (Math.abs(simulatedTop25 - targetTop25) * 0.6)
      + (Math.abs(simulatedTotalPoints - targetTotalPoints) * 0.9),
    );
    totalGap += gap;
    rows.push([
      String(year),
      `${simulatedTransferRate}% (target ${targetTransferRate}%)`,
      `${simulatedTop25}%`,
      String(simulatedTotalPoints),
      String(gap),
    ]);
  }

  const avgGap = Number((totalGap / years).toFixed(1));
  const score = Math.max(1, Math.min(99, Math.round(100 - (avgGap * 1.35))));
  data.worldModelState.realismProjectionRows = rows;
  data.worldModelState.realismProjectionScore = score;
  worldModelTrace("Projection", `5Y realism score ${score} from base year ${baseYear}`);
  return { score, rows };
}

function realismProjectionRows() {
  ensureWorldModelState();
  if (Array.isArray(data.worldModelState.realismProjectionRows) && data.worldModelState.realismProjectionRows.length) {
    return data.worldModelState.realismProjectionRows;
  }
  return [["Year", "Transfer %", "Top-25 hit", "Total Pts", "Reality Gap"], ["-", "Run projection", "Run projection", "Run projection", "-"]];
}

function realismProjectionPanel() {
  ensureWorldModelState();
  const score = Number.isFinite(data.worldModelState.realismProjectionScore)
    ? data.worldModelState.realismProjectionScore
    : "Pending";
  return `<div class="agenda-list">
    <div class="agenda-item">
      <time>2020+ Anchor Calibration</time>
      <strong>Realism score: ${score}</strong>
      <p>Uses your start year and sandbox sliders to estimate five-year closeness to target real-world trends.</p>
      <button class="small-action" data-run-realism="5y">Run 5-Year Projection</button>
    </div>
  </div>`;
}

function simulateEntityDrivenDevelopmentTick() {
  ensureCultureState();
  ensureFacilitiesState();
  ensureWorldModelState();
  ensureStaffState();
  ensurePracticeState();

  const coach = currentCoachProfile();
  const coordinator = coordinatorInfluenceSnapshot();
  const school = currentSchoolProfile();
  const stadium = currentStadiumProfile();
  const coachTeaching = averageAttr(coach && coach.attrs, ["teaching", "academyDevelopment", "motivation", "discipline"], 10) + ((coordinator.development - 10) * 0.55);
  const schoolSupport = averageAttr(school && school.attrs, ["sportsScienceSupport", "nutritionProgram", "tutoringProgram", "facilitiesQuality"], 10);
  const venueSupport = averageAttr(stadium && stadium.attrs, ["trainingComplexLink", "medicalBayQuality", "practiceFieldAdjacency", "maintenanceDiscipline"], 10) + ((coordinator.conditioning - 10) * 0.35);
  const facilityBoost = data.facilitiesState.longTermBoost || 0;
  const paceFactor = Math.max(0.75, Math.min(1.45, ruleValue("progressionPacePercent", 100) / 100));
  const emphasis = currentPracticeEmphasis();
  const MENTAL_KEYS = ["decisions","anticipation","composure","concentration","determination","positioning","vision","leadership"];

  const intensity = Math.round(45 + ((coachTeaching - 10) * 2.6) + ((schoolSupport - 10) * 1.8) + ((venueSupport - 10) * 1.2) + (facilityBoost * 2));
  data.worldModelState.developmentIntensity = Math.max(10, Math.min(95, intensity));

  players().forEach((player) => {
    const moraleScore = data.cultureState.moraleScores[player.id] || moraleLabelToScore(player.morale);
    const growthCurve = yearDevelopmentCurve(player.year);
    const random = createSeededRandom(`${career.seed}:dev:${currentSeasonYear()}:${career.advanceCount}:${player.id}`);
    const focusKeys = developmentFocusKeys(player.developmentFocus);
    const keyAttrs = [...(KEY_ATTRS_BY_POSITION[player.position] || [])];
    let candidateKeys = [...new Set([...focusKeys, ...keyAttrs])];
    // "Schemes" emphasis biases gains toward mental processing attributes.
    if (emphasis.mentalBoost) candidateKeys = [...new Set([...candidateKeys, ...MENTAL_KEYS])];
    const potentialCap = Math.max(10, Math.min(20, Math.round((Number(player.pot) || 80) / 5)));

    const growthBudget = ((0.45 + ((coachTeaching - 10) * 0.05) + ((schoolSupport - 10) * 0.04) + ((moraleScore - 65) * 0.01) + (facilityBoost * 0.03))
      * growthCurve
      * paceFactor
      * emphasis.devGain)
      + ((random() - 0.5) * 0.24);

    const gains = Math.max(0, Math.min(3, Math.round(growthBudget)));
    for (let index = 0; index < gains; index += 1) {
      const pick = candidateKeys[Math.floor(random() * candidateKeys.length)];
      if (!pick) continue;
      const isKey = keyAttrs.includes(pick);
      const cap = Math.min(20, potentialCap + (isKey ? 2 : 0));
      player.attrs[pick] = Math.min(cap, clampAttr(player.attrs[pick] + 1));
    }

    // "Position Drills" gives an extra posAttr tick on top of the normal one.
    if (emphasis.posAttrBoost && isRecord(player.posAttrs)) {
      const posSpec = POSITION_ATTRS_SPEC[player.position] || POSITION_ATTRS_SPEC["WR"];
      const primPosKeys = posSpec.groups[0].keys;
      const bonusPick = primPosKeys[Math.floor(random() * primPosKeys.length)];
      if (bonusPick) {
        const posCap = Math.min(20, potentialCap + 2);
        player.posAttrs[bonusPick] = Math.min(posCap, clampAttr((player.posAttrs[bonusPick] || 10) + 1));
      }
    }

    // Develop posAttrs in parallel (1 gain per tick on average)
    if (isRecord(player.posAttrs) && gains > 0) {
      const posSpec = POSITION_ATTRS_SPEC[player.position] || POSITION_ATTRS_SPEC["WR"];
      const posKeySet = POSITION_KEY_POS_ATTRS[player.position] || new Set();
      const allPosKeys = posSpec.groups.flatMap((g) => g.keys);
      const primPosKeys = posSpec.groups[0].keys;
      const posPool = [...new Set([...primPosKeys, ...allPosKeys])];
      const posPick = posPool[Math.floor(random() * posPool.length)];
      if (posPick) {
        const isPosKey = posKeySet.has(posPick);
        const posCap = Math.min(20, potentialCap + (isPosKey ? 2 : 0));
        player.posAttrs[posPick] = Math.min(posCap, clampAttr((player.posAttrs[posPick] || 10) + 1));
      }
    }

    // Position-coach dev bonus: matching position coach adds 1 extra gain/3 ticks
    if (gains > 0 && Array.isArray(data.positionCoaches)) {
      const posCoach = data.positionCoaches.find(
        (c) => c.programId === currentProgram().id && Array.isArray(c.devGroups) && c.devGroups.includes(player.position)
      );
      if (posCoach && random() < 0.33) {
        const coachingKeys = [...(KEY_ATTRS_BY_POSITION[player.position] || [])];
        const bonusPick = coachingKeys[Math.floor(random() * coachingKeys.length)];
        if (bonusPick) {
          player.attrs[bonusPick] = Math.min(potentialCap + 2, clampAttr(player.attrs[bonusPick] + 1));
        }
      }
    }

    if (player.year === "SR" && random() > 0.86) {
      const decayPool = PLAYER_ATTRS.filter((key) => !candidateKeys.includes(key));
      const decayKey = decayPool[Math.floor(random() * decayPool.length)];
      if (decayKey) player.attrs[decayKey] = Math.max(1, clampAttr(player.attrs[decayKey] - 1));
    }

    recomputePlayerBestPositions(player);
    recomputePlayerOverall(player);
  });

  // Apply weekly practice morale tilt to all rostered players.
  if (emphasis.moraleDelta) {
    players().forEach((player) => {
      updatePlayerMorale(player, emphasis.moraleDelta, `Practice: ${emphasis.label}`);
    });
  }

  // DEV-1 layer (spec 31): use the development engine to detect breakouts /
  // regressions / late-career declines on top of the base attribute growth.
  // Generates Action Recommended inbox events for narrative-worthy changes
  // and stashes a per-week dev report on cultureState.developmentReport.
  const DEV = window.CGM_DEV_ENGINE;
  if (DEV && typeof DEV.runWeeklyDevTick === "function") {
    const devReport = { breakouts: [], regressions: [], stagnations: 0 };
    const practiceWeights = practiceCategoryWeightsForEmphasis(emphasis);
    players().forEach((player) => {
      const moraleScore = data.cultureState.moraleScores[player.id] || moraleLabelToScore(player.morale);
      const random = createSeededRandom(`${career.seed}:dev1:${currentSeasonYear()}:${career.advanceCount}:${player.id}`);
      const result = DEV.runWeeklyDevTick(player, {
        random,
        keyAttrsForPosition: [...(KEY_ATTRS_BY_POSITION[player.position] || [])],
        practiceCategoryWeights: practiceWeights,
        practiceIntensity: emphasis.devGain >= 1.18 ? 0.18 : emphasis.devGain >= 1.05 ? 0.10 : emphasis.devGain <= 0.7 ? -0.15 : 0,
        moraleScore,
        teamVibe: 60 + Math.round((data.pressureState.adTrust - 50) * 0.3),
        coachTeaching,
        schoolSupport,
        facilityBoost,
        paceFactor,
        allowEvents: true,
      });
      if (result.events.length) {
        result.events.forEach((evt) => {
          if (evt.type === "breakout" || evt.type === "offseason_breakout") devReport.breakouts.push(evt);
          else if (evt.type === "regression_warning") devReport.regressions.push(evt);
        });
      }
      if (result.reasonCodes.indexOf("dev_stagnation") >= 0) devReport.stagnations += 1;
    });

    // Cap the inbox spam: at most 2 breakouts + 1 regression notification per tick.
    devReport.breakouts.slice(0, 2).forEach((evt) => {
      injectNotification({
        id: `dev-breakout-${currentSeasonYear()}-${career.advanceCount}-${evt.playerId}`,
        title: `Breakout: ${evt.playerName}`,
        body: `${evt.message} Position: ${evt.position}. Magnitude ${evt.magnitude}.`,
        severity: "Action Recommended",
        department: "Development",
        deadline: "This week",
        linked: "Development",
        targetView: "development",
        blocking: false,
        resolved: false,
      });
    });
    devReport.regressions.slice(0, 1).forEach((evt) => {
      injectNotification({
        id: `dev-regression-${currentSeasonYear()}-${career.advanceCount}-${evt.playerId}`,
        title: `Late-career decline: ${evt.playerName}`,
        body: `${evt.message} Consider rest or rotation.`,
        severity: "FYI",
        department: "Development",
        deadline: "This week",
        linked: "Development",
        targetView: "development",
        blocking: false,
        resolved: false,
      });
    });
    if (!isRecord(data.cultureState.developmentReport)) data.cultureState.developmentReport = {};
    data.cultureState.developmentReport = {
      week: career.advanceCount,
      breakouts: devReport.breakouts.length,
      regressions: devReport.regressions.length,
      stagnations: devReport.stagnations,
      breakoutNames: devReport.breakouts.map((e) => `${e.position} ${e.playerName}`),
      regressionNames: devReport.regressions.map((e) => `${e.position} ${e.playerName}`),
    };
  }

  syncRosterRatingsFromProfiles();
  worldModelTrace("Development", `Intensity ${data.worldModelState.developmentIntensity} (coach ${Math.round(coachTeaching)}, support ${Math.round(schoolSupport)}, practice ${emphasis.label})`);
}

function practiceCategoryWeightsForEmphasis(emphasis) {
  // Map the existing weekly Practice Emphasis IDs onto DEV-1 category weights
  // so the dev tick respects what the user picked on the Development screen.
  const id = emphasis && emphasis.id;
  if (id === "conditioning") return { physical: 0.55, technical: 0.20, iq: 0.10, mental: 0.15 };
  if (id === "schemes")      return { physical: 0.10, technical: 0.25, iq: 0.50, mental: 0.15 };
  if (id === "position")     return { physical: 0.20, technical: 0.55, iq: 0.15, mental: 0.10 };
  if (id === "recovery")     return { physical: 0.30, technical: 0.20, iq: 0.20, mental: 0.30 };
  return { physical: 0.25, technical: 0.30, iq: 0.25, mental: 0.20 };
}

function simulateTransferMarketTick() {
  ensureRetentionState();
  ensureCultureState();
  ensureWorldModelState();
  const school = currentSchoolProfile();
  const marketBase = ruleValue("nilVolatilityPercent", 100);
  const transferScale = transferPopulationScale();
  const nilDepth = averageAttr(school && school.attrs, ["nilCapacity", "nilStructure", "boosterStrength", "ticketDemand"], 10);
  const transferCulture = averageAttr(school && school.attrs, ["transferFriendliness", "boardPatience", "fanPassion", "complianceCulture"], 10);
  const random = createSeededRandom(`${career.seed}:market:${currentSeasonYear()}:${career.advanceCount}`);
  const heat = Math.round(28 + ((marketBase - 100) * 0.42) + ((transferScale - 1) * 24) + (nilDepth * 2.1) + ((transferCulture - 10) * 1.2) + seededRange(random, -4, 5));
  data.worldModelState.marketHeat = Math.max(15, Math.min(95, heat));

  data.outgoingRisk.forEach((row) => {
    const player = players().find((entry) => entry.name === row[1]);
    if (!player) return;
    const key = retentionKey(row);
    const current = Number.isInteger(data.retentionState.playerRisk[key])
      ? data.retentionState.playerRisk[key]
      : riskLabelToScore(row[3]);
    const morale = data.cultureState.moraleScores[player.id] || moraleLabelToScore(player.morale);
    const fitPrimary = positionFitScore(player, player.position);
    const fitBest = positionFitScore(player, player.positions && player.positions[0] ? player.positions[0] : player.position);
    const fitGap = Math.max(0, Math.round((fitBest - fitPrimary) * 1.5));
    const volatilityDrift = Math.round((data.worldModelState.marketHeat - 50) / 14) + Math.round((transferScale - 1) * 3);
    const moraleDrift = morale >= 80 ? -3 : morale >= 65 ? -1 : morale >= 50 ? 2 : 5;
    const next = Math.max(5, Math.min(95, current + volatilityDrift + moraleDrift + fitGap));
    data.retentionState.playerRisk[key] = next;
  });
  updateOutgoingRiskRowsFromState();
  worldModelTrace("Market", `Heat ${data.worldModelState.marketHeat} (NIL ${marketBase}%, transfer ${ruleValue("transferPopulationPercent", 100)}%)`);
}

function computeProgramCohesionSignal() {
  ensureWorldModelState();
  const coach = currentCoachProfile();
  const school = currentSchoolProfile();
  const stadium = currentStadiumProfile();
  const leadership = averageAttr(coach && coach.attrs, ["leadership", "manManagement", "staffDelegation", "professionalism"], 10);
  const institution = averageAttr(school && school.attrs, ["administrativeStability", "longTermVision", "disciplineCulture", "alumniNetwork"], 10);
  const environment = averageAttr(stadium && stadium.attrs, ["homeFieldAdvantage", "atmosphere", "crowdNoise", "structuralCondition"], 10);
  const morale = Math.round(players().reduce((sum, player) => sum + (data.cultureState.moraleScores[player.id] || moraleLabelToScore(player.morale)), 0) / Math.max(1, players().length));
  const cohesion = Math.round((leadership * 2.2) + (institution * 1.5) + (environment * 1.1) + (morale / 2.4));
  data.worldModelState.tacticalCohesion = Math.max(10, Math.min(95, cohesion));
}

/** Derive 1-3 program identity labels from current roster + school + dev signals */
function deriveProgramIdentity() {
  ensureStaffState();
  ensureWorldModelState();
  const school = currentSchoolProfile();
  const roster = players();
  const labels = [];

  // Recruiting prestige check
  const nilCap = averageAttr(school && school.attrs, ["nilCapacity","nilStructure","boosterStrength"], 10);
  if (nilCap >= 16) labels.push({ label:"NIL Superpower",      cat:"Program", positive:true  });

  // Roster composition checks
  const positionCounts = {};
  roster.forEach((p) => { positionCounts[p.position] = (positionCounts[p.position] || 0) + 1; });
  const qbs = positionCounts["QB"] || 0;
  const dbs = (positionCounts["CB"] || 0) + (positionCounts["S"] || 0) + (positionCounts["DB"] || 0);
  const olinemen = (positionCounts["OT"] || 0) + (positionCounts["OG"] || 0) + (positionCounts["C"] || 0);
  if (qbs >= 4) labels.push({ label:"QB Factory",             cat:"Program", positive:true  });
  if (dbs >= 10) labels.push({ label:"DB Factory",             cat:"Program", positive:true  });
  if (olinemen >= 8) labels.push({ label:"O-Line Fortress",   cat:"Program", positive:true  });

  // Development check
  const devIntensity = data.worldModelState.developmentIntensity || 50;
  if (devIntensity >= 78) labels.push({ label:"Development Factory",  cat:"Program", positive:true  });

  // Transfer portal aggressiveness
  const portalEntries = (data.outgoingRisk || []).length;
  if (portalEntries >= 6) labels.push({ label:"Portal Mercenary",     cat:"Program", positive:null  });

  // Culture signals
  const avgMorale = roster.length ? Math.round(roster.reduce((s, p) => s + (data.cultureState && data.cultureState.moraleScores[p.id] || 50), 0) / roster.length) : 50;
  if (avgMorale >= 78) labels.push({ label:"Culture Program",         cat:"Program", positive:true  });
  if (avgMorale <= 40) labels.push({ label:"Locker Room Issues",      cat:"Program", positive:false });

  // Local pipeline — simple: if recruitingFootprint & alumniNetwork high
  const local = averageAttr(school && school.attrs, ["pipelineAccess","alumniNetwork","recruitingFootprint"], 10);
  if (local >= 15) labels.push({ label:"Local Pipeline Program",      cat:"Program", positive:true  });

  // Prestige
  const prestige = averageAttr(school && school.attrs, ["academicPrestige","brandReach","mediaMarket","fanPassion"], 10);
  if (prestige >= 17) labels.push({ label:"Blue-Chip Machine",        cat:"Program", positive:true  });
  if (prestige <= 8)  labels.push({ label:"Rebuild Project",          cat:"Program", positive:null  });

  // Cohesion / defensive identity
  const cohesion = data.worldModelState.tacticalCohesion || 50;
  if (cohesion >= 82) labels.push({ label:"Defensive Meat Grinder",   cat:"Program", positive:true  });

  // Walk-on check
  const walkonCount = roster.filter((p) => p.scholarshipStatus === "Walk-On").length;
  if (walkonCount >= 8) labels.push({ label:"Walk-On Factory",        cat:"Program", positive:null  });

  return labels.slice(0, 4); // Show top 4 most relevant
}

function programIdentityPanel() {
  ensureCultureState();
  const identities = deriveProgramIdentity();
  const prog = currentProgram();
  if (!identities.length) {
    return `<div class="prog-identity"><span class="trait-empty">Program identity not yet established.</span></div>`;
  }
  const badges = identities.map((id) => {
    const cls = id.positive === true ? "tc-pos" : id.positive === false ? "tc-neg" : "tc-neutral";
    return `<span class="trait-badge ${cls}">${id.label}</span>`;
  }).join(" ");
  return `<div class="prog-identity">
    <p class="label" style="margin-bottom:6px">${prog.name} Identity</p>
    <div class="trait-badge-row">${badges}</div>
  </div>`;
}

function simulateWorldEcosystemTick() {
  rebalancePortalPopulationTick();
  simulateEntityDrivenDevelopmentTick();
  simulateTransferMarketTick();
  simulateAiProgramEcosystemTick();
  computeProgramCohesionSignal();
  generateEcosystemInboxEvents();
}

function worldModelSnapshotRows() {
  ensureWorldModelState();
  const header = [["Signal", "Value", "Source"]];
  const rows = [
    ["Development intensity", String(data.worldModelState.developmentIntensity), "Coach + school + facilities"],
    ["Market heat", String(data.worldModelState.marketHeat), "NIL volatility + institution"],
    ["Tactical cohesion", String(data.worldModelState.tacticalCohesion), "Coach + school + stadium + morale"],
  ];
  return [...header, ...rows];
}

function worldRelationshipTraceRows() {
  ensureWorldModelState();
  const header = [["Tick", "Domain", "Detail"]];
  if (!data.worldModelState.relationshipTrace.length) {
    return [...header, ["-", "System", "No world-model traces yet"]];
  }
  return [...header, ...data.worldModelState.relationshipTrace.slice(0, 10)];
}

function ensureHistoryConsistency() {
  if (!Array.isArray(data.history)) return;
  const unique = [];
  const seen = new Set();
  data.history.forEach((row) => {
    if (!Array.isArray(row) || row.length !== 5) return;
    if (seen.has(row[0])) return;
    seen.add(row[0]);
    unique.push(row);
  });
  unique.sort((a, b) => Number(b[0]) - Number(a[0]));
  data.history = unique.slice(0, 16);
}

function refreshStewardshipModels() {
  ensurePressureState();
  ensureCultureState();
  ensureFacilitiesState();
  ensureHistoryConsistency();

  const wins = data.seasonState.overallRecord.wins;
  const losses = data.seasonState.overallRecord.losses;
  const totalGames = Math.max(1, wins + losses);
  const winPct = Math.round((wins / totalGames) * 100);
  const moraleAvg = Math.round(
    players().reduce((sum, player) => sum + (data.cultureState.moraleScores[player.id] || moraleLabelToScore(player.morale)), 0) /
      Math.max(1, players().length),
  );

  data.viewModels.seasonObjectives = [
    ["Metric", "Current", "Target", "Trend", "Owner"],
    ["Conference finish", data.standings[0] && data.standings[0][1] === programById(career.programId).shortName ? "1st" : "Chasing", "Top 3", winPct >= 60 ? "Up" : "Down", "AD"],
    ["Rivalry game", "Pending", "Win", data.pressureState.objectivePressure <= 45 ? "Stable" : "High", "HC"],
    ["Recruiting class", `#${career.generatedProfile.recruitingClass}`, "Top 25", benefitPoolRemaining() >= 100 ? "Up" : "Flat", "RD"],
    ["Academic flags", "3", "Under 5", "Good", "Staff"],
  ];

  data.viewModels.adConfidence = [
    ["Board trust", data.pressureState.adTrust],
    ["Job security", data.pressureState.jobSecurity],
    ["Objective pressure", data.pressureState.objectivePressure],
    ["Fan patience", career.generatedProfile.fanConfidence],
  ];

  data.viewModels.objectives = [
    ["Goal", "Target", "Reward", "Risk", "Status"],
    ["Conference finish", "Top 3", "Budget", "Job trust", data.pressureState.objectivePressure <= 55 ? "On Track" : "At Risk"],
    ["Rivalry", "Win", "Prestige", "Fan trust", winPct >= 50 ? "Open" : "Pressure"],
    ["Roster morale", "Stable+", "Retention", "Portal exits", moraleAvg >= 60 ? "Healthy" : "Warning"],
  ];

  const injuryRisk = injuryRiskSignalScore();
  data.viewModels.rosterRisk = [
    ["Progression pace", ruleValue("progressionPacePercent", 100)],
    ["Conditioning", 80],
    ["Injury risk", injuryRisk],
    ["Morale", moraleAvg],
    ["Transfer risk", Math.round((data.outgoingRisk.filter((row) => row[3] === "High").length / Math.max(1, data.outgoingRisk.length)) * 100)],
  ];

  data.viewModels.loadManagement = [
    ["Conditioning", 80],
    ["Injury cadence", ruleValue("injuryCadencePercent", 100)],
    ["Live injury risk", injuryRisk],
    ["Progression pace", ruleValue("progressionPacePercent", 100)],
  ];

  data.viewModels.analyticsFindings = [
    ["Pressure", `Objective pressure is ${data.pressureState.objectivePressure}.`, data.pressureState.trace[0] ? data.pressureState.trace[0][4] : "No pressure events yet."],
    ["Morale", `Team morale average is ${moraleAvg}.`, data.cultureState.moraleTrace[0] ? data.cultureState.moraleTrace[0][4] : "No morale deltas yet."],
    ["Facilities", `Long-term facility boost is ${data.facilitiesState.longTermBoost}.`, data.facilitiesState.upgradeHistory[0] ? data.facilitiesState.upgradeHistory[0][2] : "No facility upgrades yet."],
    ["Transfer population", `${ruleValue("transferPopulationPercent", 100)}% slider active.`, `Portal pool target ${targetPortalPopulation()}.`],
    ["Reality anchor", `${ruleValue("realityAnchorPercent", 100)}% anchor strength.`, `Start year ${clampInteger(career.startYear, 2010, 2035, currentSeasonYear())}.`],
  ];

  const lastAdvanced = isRecord(data.seasonState.lastAdvancedBox) ? data.seasonState.lastAdvancedBox : null;
  data.viewModels.advancedDataHub = [
    ["Metric", "Us", "Opponent", "Signal"],
    ["Yards / play", lastAdvanced ? String(lastAdvanced.ourYardsPerPlay) : "-", lastAdvanced ? String(lastAdvanced.oppYardsPerPlay) : "-", "Efficiency"],
    ["Success rate", lastAdvanced ? `${lastAdvanced.ourSuccessRate}%` : "-", lastAdvanced ? `${lastAdvanced.oppSuccessRate}%` : "-", "Down quality"],
    ["Explosive plays", lastAdvanced ? String(lastAdvanced.explosivePlays.split("-")[0]) : "-", lastAdvanced ? String(lastAdvanced.explosivePlays.split("-")[1]) : "-", "Chunk gain"],
    ["Tactical profile", data.seasonState.tacticalProfile, "-", "Game plan"],
  ];

  const unresolvedNonBlocking = data.notifications.filter((item) => !item.blocking && !item.resolved).length;
  const impossible = impossibleStateFlags();
  data.viewModels.balanceSnapshot = [
    ["Metric", "Value", "Band", "Status"],
    ["Win rate", `${winPct}%`, "30-85%", winPct >= 30 && winPct <= 85 ? "In band" : "Review"],
    ["Unresolved non-blocking", String(unresolvedNonBlocking), `<= ${NOTIFICATION_MAX_UNRESOLVED_NON_BLOCKING}`, unresolvedNonBlocking <= NOTIFICATION_MAX_UNRESOLVED_NON_BLOCKING ? "In band" : "Spam risk"],
    ["Retention high-risk", String(data.outgoingRisk.filter((row) => row[3] === "High").length), "0-4", data.outgoingRisk.filter((row) => row[3] === "High").length <= 4 ? "In band" : "Review"],
    ["Impossible state flags", String(impossible.length), "0", impossible.length === 0 ? "Clear" : "Action needed"],
  ];

  // ── Live-computed viewModels (replaces all static demo-world placeholders) ─

  // pinnedWatches: live pressure signals
  const highRiskCount = data.outgoingRisk.filter((row) => row[3] === "High").length;
  const topProspect = prospects().sort((a, b) => (b.commitChance || 0) - (a.commitChance || 0))[0];
  const visitBudget = Math.round((benefitPoolRemaining() / Math.max(1, data.benefitState.totalPool)) * 100);
  data.viewModels.pinnedWatches = [
    ["QB succession", (() => { const qbs = players().filter((p) => p.position === "QB").sort((a, b) => b.ovr - a.ovr); return qbs.length >= 2 ? Math.max(0, 100 - (qbs[0].ovr - qbs[1].ovr) * 8) : 30; })()],
    [topProspect ? `${topProspect.name} commit` : "Top recruit", topProspect ? (topProspect.commitChance || 50) : 50],
    ["Visit budget", visitBudget],
    ["Board confidence", data.pressureState.adTrust],
    ["High flight risks", Math.max(0, 100 - highRiskCount * 18)],
  ];

  // pipelineStrength: count committed + scouted prospects by region
  const regionStrength = {};
  PROSPECT_REGIONS.forEach((r) => { regionStrength[r] = 0; });
  prospects().forEach((p) => {
    if (!isNonEmptyString(p.pipeline) || !regionStrength.hasOwnProperty(p.pipeline)) return;
    const weight = p.commitmentStatus === "Committed Lakeview" ? 40
      : p.commitmentStatus === "Offered" ? 15
      : p.status === "Scouted" ? 8 : 4;
    regionStrength[p.pipeline] = Math.min(99, (regionStrength[p.pipeline] || 0) + weight);
  });
  // Boost by school.attrs.pipelineAccess for home region
  const school = currentSchoolProfile();
  const homeRegion = (school && isNonEmptyString(school.attrs && school.pipeline)) ? school.pipeline : "Great Lakes";
  const pipelineLift = school ? Math.round(averageAttr(school.attrs, ["pipelineAccess", "alumniNetwork"], 10) * 2.5) : 0;
  if (regionStrength.hasOwnProperty(homeRegion)) regionStrength[homeRegion] = Math.min(99, regionStrength[homeRegion] + pipelineLift);
  data.viewModels.pipelineStrength = Object.entries(regionStrength)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([region, score]) => [region, score]);
  if (!data.viewModels.pipelineStrength.length) {
    data.viewModels.pipelineStrength = [["No active pipeline", 0]];
  }

  // futureHoles: positions where starter is SR/JR with no quality backup
  const positionMap = {};
  players().forEach((p) => {
    if (!positionMap[p.position]) positionMap[p.position] = [];
    positionMap[p.position].push(p);
  });
  const YEAR_ORDER = ["FR", "SO", "JR", "SR", "GR", "5th"];
  const holeRows = [["Position", "Starter", "Backup", "Need", "Path"]];
  const KEY_POSITIONS = ["QB", "OT", "WR", "CB", "LB", "EDGE", "DT", "HB"];
  KEY_POSITIONS.forEach((pos) => {
    const pool = (positionMap[pos] || []).sort((a, b) => b.ovr - a.ovr);
    if (!pool.length) { holeRows.push([pos, "Empty", "None", "Critical", "Recruit + Portal"]); return; }
    const starter = pool[0];
    const backup = pool[1];
    const starterYear = YEAR_ORDER.indexOf(starter.year);
    const starterLeaving = starterYear >= 2; // JR or above
    const backupOvr = backup ? backup.ovr : 0;
    const gap = starter.ovr - backupOvr;
    const need = !backup ? "Critical" : gap >= 15 ? "High" : gap >= 8 ? "Medium" : "Low";
    const path = !backup || gap >= 12 ? "Recruit + Portal" : gap >= 6 ? "Internal dev" : "Depth is fine";
    if (need !== "Low") {
      holeRows.push([pos, `${starter.year} ${starter.ovr}`, backup ? `${backup.year} ${backup.ovr}` : "None", need, path]);
    }
  });
  data.viewModels.futureHoles = holeRows.length > 1 ? holeRows : [...holeRows, ["-", "No critical holes", "-", "Good", "Monitor depth"]];

  // depthTwoDeep: actual top starters per key position
  const twoDeepRows = [["Position", "Name", "OVR", "Note"]];
  ["QB", "HB", "WR", "OT", "EDGE", "CB"].forEach((pos) => {
    const top = (positionMap[pos] || []).sort((a, b) => b.ovr - a.ovr).slice(0, 2);
    top.forEach((p, i) => {
      const clusters = deriveTraitClusters(p, 0.8);
      const note = clusters.length ? clusters[0].label : (p.developmentFocus || p.devCurve || "—");
      twoDeepRows.push([`${pos}${i + 1}`, p.name, String(p.ovr), note]);
    });
  });
  data.viewModels.depthTwoDeep = twoDeepRows;

  // eligibilityWatch: players with redshirt consideration or concern
  const eligRows = [["Pos", "Player", "Year", "Status", "Staff Note"]];
  players().forEach((p) => {
    const gp = p.eligibility && p.eligibility.gamesPlayedThisSeason || 0;
    const rs = p.redshirtIntent;
    const portalRisk = data.outgoingRisk.find((row) => row[1] === p.name);
    const highRisk = portalRisk && portalRisk[3] === "High";
    const concern = rs === "Redshirt" ? "Redshirt intent" :
      rs === "Medical" ? "Medical RS" :
      gp >= 4 && rs === "Redshirt" ? "Eligibility used" :
      highRisk ? "Portal risk" :
      p.year === "FR" ? "Monitor year" : null;
    if (concern) eligRows.push([p.position, p.name, p.year, concern, highRisk ? "Retention priority" : rs === "Redshirt" ? "Preserve year" : "Track closely"]);
  });
  data.viewModels.eligibilityWatch = eligRows.length > 1 ? eligRows.slice(0, 8) : [...eligRows, ["-", "No flags", "-", "Clear", "All good"]];

  // selectionResume
  const rankedWins = data.seasonState.playedGames ? data.seasonState.playedGames.filter((g) => g.win && g.opponentQuality >= 75).length : 0;
  const strengthOfSchedule = Math.round(
    (data.seasonState.playedGames || []).reduce((sum, g) => sum + (g.opponentQuality || 60), 0) /
      Math.max(1, (data.seasonState.playedGames || []).length)
  );
  data.viewModels.selectionResume = [
    ["Conference standing", Math.min(99, Math.max(1, data.pressureState.objectivePressure <= 40 ? 82 : data.pressureState.objectivePressure <= 60 ? 65 : 45))],
    ["Strength of schedule", strengthOfSchedule || 60],
    ["Ranked wins", Math.min(99, rankedWins * 20)],
    ["Margin profile", Math.min(99, winPct)],
  ];

  // marketPressure: NIL market + position scarcity
  const nilUtil = Math.round((totalCommittedBenefits() / Math.max(1, data.benefitState.totalPool)) * 100);
  const qbMarket = Math.min(99, 50 + prospects().filter((p) => p.position === "QB" && p.commitmentStatus !== "Committed Lakeview").length * 10);
  const tacMarket = Math.min(99, 40 + prospects().filter((p) => p.position === "OT" && p.commitmentStatus !== "Committed Lakeview").length * 8);
  data.viewModels.marketPressure = [
    ["QB market heat", qbMarket],
    ["OT market heat", tacMarket],
    ["NIL utilization", nilUtil],
    ["Booster patience", data.pressureState.adTrust],
  ];

  // analyticsReports: use lastAdvancedBox for real post-game metrics
  const lastBox = isRecord(data.seasonState.lastAdvancedBox) ? data.seasonState.lastAdvancedBox : null;
  const expRate = lastBox ? Math.round((lastBox.expressivePlays || 0) / Math.max(1, lastBox.totalPlays || 12) * 100) : null;
  data.viewModels.analyticsReports = [
    ["Metric", "Value", "Signal", "Trend"],
    ["Yards per play", lastBox ? String(lastBox.ourYardsPerPlay) : "—", lastBox ? (lastBox.ourYardsPerPlay >= 5.5 ? "Strong" : "Average") : "No games", lastBox ? (lastBox.ourYardsPerPlay >= 5.5 ? "Good" : "Watch") : "—"],
    ["Success rate", lastBox ? `${lastBox.ourSuccessRate}%` : "—", lastBox ? (lastBox.ourSuccessRate >= 45 ? "Above avg" : "Below avg") : "No games", "—"],
    ["Recruiting rank", `#${career.generatedProfile.recruitingClass}`, career.generatedProfile.recruitingClass <= 25 ? "Good" : "Rebuild", benefitPoolRemaining() >= 100 ? "Up" : "Flat"],
    ["Dev gain (avg)", `+${(data.facilitiesState.longTermBoost / 10 + 1.8).toFixed(1)}`, "Annual", data.facilitiesState.longTermBoost ? "Lift" : "Base"],
  ];

  // opponentScout: derive from tendencies of next game or standing pressures
  const nextGame = (data.schedule || []).find((row) => !row[3] && row[1] && row[1] !== "BYE");
  const oppName = nextGame ? nextGame[1] : "Next opponent";
  const oppRng = createSeededRandom(`${career.seed}:scout:${currentSeasonYear()}:${oppName}`);
  data.viewModels.opponentScout = [
    [`${oppName} run game`, seededRange(oppRng, 40, 88)],
    [`${oppName} pass def`, seededRange(oppRng, 38, 85)],
    [`Special teams`, seededRange(oppRng, 45, 80)],
    [`Discipline`, seededRange(oppRng, 40, 82)],
  ];

  // individualPlans: pick one development plan per side-of-ball + one rookie
  // so the table shows variety instead of the first 5 (which were all the
  // same depth chart slot with the same developmentFocus).
  data.viewModels.individualPlans = [["Pos", "Player", "Plan", "Trend", "Owner"]];
  const planPool = players().filter((p) => isNonEmptyString(p.developmentFocus));
  const wantPositions = ["QB", "HB", "WR", "EDGE", "LB", "CB"];
  const picked = [];
  wantPositions.forEach((pos) => {
    const found = planPool.find((p) => p.position === pos && !picked.find((x) => x.id === p.id));
    if (found) picked.push(found);
  });
  // Fill remainder with anyone left
  for (const p of planPool) {
    if (picked.length >= 6) break;
    if (!picked.find((x) => x.id === p.id)) picked.push(p);
  }
  picked.slice(0, 6).forEach((p) => {
    const morale = data.cultureState.moraleScores[p.id] || 60;
    data.viewModels.individualPlans.push([p.position, p.name, p.developmentFocus, morale >= 68 ? "Up" : morale <= 45 ? "Down" : "Flat", p.year === "FR" || p.year === "SO" ? "Dev Coach" : "OC/DC"]);
  });
  if (data.viewModels.individualPlans.length === 1) {
    data.viewModels.individualPlans.push(["-", "No active plans", "Assign via Player Profile", "—", "—"]);
  }

  // visitWeekend: upcoming visit prospects
  data.viewModels.visitWeekend = [];
  const visitProspects = prospects().filter((p) => Array.isArray(p.visitHistory) && p.visitHistory.length);
  if (!visitProspects.length) {
    data.viewModels.visitWeekend = [["No visits scheduled", "Contact prospects to set up campus visits.", ""]];
  } else {
    visitProspects.slice(0, 3).forEach((p) => {
      const commit = p.commitChance || 0;
      const priority = commit >= 65 ? "Close to commitment" : commit >= 40 ? "Building interest" : "Early contact";
      data.viewModels.visitWeekend.push([p.name, `${p.position} · ${p.stars}★ · ${p.pipeline}`, priority]);
    });
  }

  // rivalryLedger: derive from history
  const prog = programById(career.programId);
  const rivalName = prog.rival || "Rival";
  const historyRivalWins = (data.history || []).filter((row) => Array.isArray(row) && row[4] && String(row[4]).includes(rivalName) && String(row[4]).toLowerCase().includes("win")).length;
  const historyRivalLoss = (data.history || []).filter((row) => Array.isArray(row) && row[4] && String(row[4]).includes(rivalName) && String(row[4]).toLowerCase().includes("loss")).length;
  data.viewModels.rivalryLedger = [
    ["Span", "Wins", "Losses", "Streak", "Note"],
    ["Career (tracked)", String(historyRivalWins), String(historyRivalLoss), historyRivalWins > historyRivalLoss ? `W${historyRivalWins}` : `L${historyRivalLoss}`, historyRivalWins > historyRivalLoss ? "Ahead in series" : "Must build momentum"],
    ["Win pct", `${winPct}%`, "Target 50%+", winPct >= 50 ? "Good" : "Behind", "Overall record"],
  ];

  // memoryHooks: from real history
  data.viewModels.memoryHooks = [];
  (data.history || []).slice(0, 4).forEach((row) => {
    if (!Array.isArray(row) || !row[4]) return;
    data.viewModels.memoryHooks.push([String(row[0]), row[4], `Record: ${row[1]}`]);
  });
  if (!data.viewModels.memoryHooks.length) {
    data.viewModels.memoryHooks = [["—", "No history yet", "Play more seasons"]];
  }

  // nationalTop25: derive from AI program states (demo programs) plus expanded
  // procedural standings + national pool, so the poll feels real (~25 entries).
  ensureStaffState();
  const userShort = (programById(career.programId) || { shortName: "" }).shortName;
  // AI-SCHOOL-1: derive Top 25 from the live AI standings (real wins/losses
  // + drifted ratings) instead of the legacy patchwork. Player team's record
  // comes from `career.record` so the user-team line matches the chrome.
  const aiStandings = ensureAiSchoolStandings();
  const ranked = aiStandings
    ? Object.entries(aiStandings).map(([id, rec]) => {
        const isUser = id === career.programId;
        const trend = rec.recentResults.length === 0 ? "—"
                    : rec.recentResults[0].win ? "↑" : "↓";
        return {
          id,
          name: rec.shortName || id,
          rating: Math.round(rec.ratingNow),
          record: isUser ? career.record : `${rec.wins}-${rec.losses}`,
          trend,
          isUser,
        };
      }).sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        const aWp = (a.wins || 0) - (a.losses || 0);
        const bWp = (b.wins || 0) - (b.losses || 0);
        return bWp - aWp;
      })
    : [];
  data.viewModels.nationalTop10 = [
    ["#", "Program", "Record", "Rating", "Trend"],
    ...ranked.slice(0, 25).map((entry, i) => [
      String(i + 1),
      entry.name + (entry.isUser ? " ★" : ""),
      entry.record,
      String(entry.rating),
      entry.trend,
    ]),
  ];

  // staffCandidates: generate live candidates for open roles
  ensureStaffState();
  const CANDIDATE_NAMES = ["Derrick Haas", "Calvin Norwood", "Randall Voss", "Preston Foley", "Terrance Obi", "Jamie Stroud", "Marcus Weil", "Elias Pruitt", "Lorenzo Bass", "Sean Covington", "Brad Whitmore", "Damon Yates"];
  const CANDIDATE_SPECIALTIES_BY_ROLE = {
    "Offensive Coordinator": ["Air Raid Architect", "Power Run Specialist", "RPO Designer", "West Coast System"],
    "Defensive Coordinator": ["4-2-5 Specialist", "3-3-5 Innovator", "Press Coverage", "Zone Blitz"],
    "Recruiting Director": ["Southeast Pipeline", "National Footprint", "Data-driven Evaluator", "Relationship Builder"],
    "Strength Coach": ["Athletic Development", "Injury Prevention", "Olympic Lifts", "Sports Science"],
  };
  const CANDIDATE_GRADES = ["A+", "A", "A-", "B+", "B", "B+", "B", "B-"];
  const rng = createSeededRandom(`${career.seed}:candidates:${currentSeasonYear()}`);
  data.staffCandidates = {};
  data.staffOpenings.forEach(([role]) => {
    const specialties = CANDIDATE_SPECIALTIES_BY_ROLE[role] || ["General"];
    const names = [...CANDIDATE_NAMES].sort(() => seededRange(rng, 0, 1) - 0.5).slice(0, 3);
    data.staffCandidates[role] = names.map((name) => [
      name,
      specialties[seededRange(rng, 0, specialties.length - 1)],
      CANDIDATE_GRADES[seededRange(rng, 0, CANDIDATE_GRADES.length - 1)],
    ]);
  });
}

function impossibleStateFlags() {
  const flags = [];
  const playerIds = new Set(players().map((player) => player.id));
  const depthIds = Object.values(data.depthChart || {}).filter((id) => isNonEmptyString(id));
  const duplicates = depthIds.length !== new Set(depthIds).size;
  if (duplicates) flags.push("duplicate-depth-assignment");
  if (depthIds.some((id) => !playerIds.has(id))) flags.push("depth-references-missing-player");
  const projected = projectedRosterCount();
  if (projected > data.portalState.rosterLimit) flags.push("projected-roster-over-limit");
  return flags;
}

function runSeasonSoak(seasonCount) {
  ensureDepthChartState();
  ensurePortalState();
  ensureRecruitingState();
  ensureRetentionState();
  ensureBenefitState();
  ensureSeasonState();
  ensurePressureState();
  ensureCultureState();
  ensureFacilitiesState();

  const target = Math.max(1, Number(seasonCount) || 1);
  const startYear = currentSeasonYear();
  const targetYear = startYear + target;
  const metrics = {
    startYear,
    targetYear,
    advances: 0,
    seasonsCompleted: 0,
    maxUnresolvedNonBlocking: 0,
    maxPressure: data.pressureState.objectivePressure,
    minMorale: 99,
    impossibleStateHits: [],
  };

  let guard = target * 400;
  while (currentSeasonYear() < targetYear && guard > 0) {
    const beforeYear = currentSeasonYear();
    if (!advanceCareer()) break;
    guard -= 1;
    metrics.advances += 1;
    const unresolvedNonBlocking = data.notifications.filter((item) => !item.blocking && !item.resolved).length;
    metrics.maxUnresolvedNonBlocking = Math.max(metrics.maxUnresolvedNonBlocking, unresolvedNonBlocking);
    metrics.maxPressure = Math.max(metrics.maxPressure, data.pressureState.objectivePressure);
    const moraleFloor = players().reduce((min, player) => Math.min(min, moraleLabelToScore(player.morale)), 99);
    metrics.minMorale = Math.min(metrics.minMorale, moraleFloor);
    const flags = impossibleStateFlags();
    if (flags.length) {
      metrics.impossibleStateHits.push({
        tick: `${currentSeasonYear()}-${career.advanceCount}`,
        flags,
      });
    }
    if (currentSeasonYear() > beforeYear) {
      metrics.seasonsCompleted += 1;
    }
  }

  metrics.completedTarget = metrics.seasonsCompleted >= target;
  metrics.guardExhausted = guard <= 0;
  metrics.notificationSpamControlled = metrics.maxUnresolvedNonBlocking <= NOTIFICATION_MAX_UNRESOLVED_NON_BLOCKING;
  metrics.noImpossibleStates = metrics.impossibleStateHits.length === 0;
  metrics.pass = metrics.completedTarget && metrics.notificationSpamControlled && metrics.noImpossibleStates;
  return metrics;
}

function runMigrationGoldenChecks() {
  const baseCareer = {
    seed: career.seed,
    coachName: career.coachName,
    programId: career.programId,
    school: career.school,
    record: career.record,
    currentEventIndex: career.currentEventIndex,
    advanceCount: career.advanceCount,
    worldHash: career.worldHash,
  };
  const versions = [1, 2, 3, 4, 5, 6, 7];
  const results = versions.map((version) => {
    const migrated = migrateSave({
      version,
      savedAt: "2026-05-01T00:00:00.000Z",
      career: baseCareer,
      resolvedNotificationIds: [],
      playerDecisions: {},
      depthChart: {},
      recruitingState: {},
      prospectProfiles: [],
      portalState: {},
      retentionState: {},
      benefitState: {},
      seasonState: {},
      pressureState: {},
      cultureState: {},
      facilitiesState: {},
    });
    return {
      version,
      pass: Boolean(migrated && migrated.version === SAVE_SCHEMA_VERSION && isRecord(migrated.career)),
    };
  });
  return {
    pass: results.every((entry) => entry.pass),
    results,
  };
}

function rebalanceBenefitBudgetsToPool() {
  const totalBudgeted = BENEFIT_BUCKET_KEYS
    .map((key) => data.benefitState.buckets[key].budgeted)
    .reduce((sum, value) => sum + value, 0);
  if (totalBudgeted === data.benefitState.totalPool) return;
  const emergency = data.benefitState.buckets.emergency;
  emergency.budgeted = Math.max(0, emergency.budgeted + (data.benefitState.totalPool - totalBudgeted));
  emergency.committed = Math.min(emergency.committed, emergency.budgeted);
}

function totalCommittedBenefits() {
  ensureBenefitState();
  return BENEFIT_BUCKET_KEYS
    .map((key) => data.benefitState.buckets[key].committed)
    .reduce((sum, value) => sum + value, 0);
}

function benefitPoolRemaining() {
  ensureBenefitState();
  return Math.max(0, data.benefitState.totalPool - totalCommittedBenefits());
}

function refreshBenefitPressure() {
  if (!isRecord(data.benefitState) || !isRecord(data.benefitState.buckets)) return;
  ensureRetentionState();
  const highRiskCount = (Array.isArray(data.outgoingRisk) ? data.outgoingRisk : []).filter((row) => {
    const score = data.retentionState.playerRisk[retentionKey(row)] || riskLabelToScore(row[3]);
    return score >= 70;
  }).length;
  BENEFIT_BUCKET_KEYS.forEach((key) => {
    const bucket = data.benefitState.buckets[key];
    const usage = bucket.budgeted ? Math.round((bucket.committed / bucket.budgeted) * 70) : 0;
    const market = key === "retention" ? highRiskCount * 8 : key === "recruiting" ? 14 : key === "development" ? 8 : 6;
    const volatilityOffset = nilVolatilityOffsetForBucket(key);
    bucket.pressure = Math.max(1, Math.min(99, usage + market + volatilityOffset));
  });
}

function nilVolatilityOffsetForBucket(bucketKey) {
  const volatility = ruleValue("nilVolatilityPercent", 100);
  const scale = Math.max(0, Math.round((volatility - 100) / 8));
  if (scale === 0) return 0;
  const random = createSeededRandom(`${career.seed}:nil-market:${career.advanceCount}:${bucketKey}`);
  return Math.round((random() * 2 - 1) * scale);
}

function isPortalWindowOpen() {
  ensurePortalState();
  return currentEvent().phase === "Postgame Review" || data.portalState.coachChangeExceptionRemaining > 0;
}

function portalWindowCountdown() {
  const currentIndex = career.currentEventIndex;
  for (let index = currentIndex; index < calendar.length; index += 1) {
    if (calendar[index].phase === "Postgame Review") {
      return index - currentIndex;
    }
  }
  return null;
}

function portalWindowLabel() {
  const countdown = portalWindowCountdown();
  if (isPortalWindowOpen()) {
    if (currentEvent().phase === "Postgame Review") return "Open now (seasonal window)";
    return `Open now (coach-change exception, ${data.portalState.coachChangeExceptionRemaining} advance(s) left)`;
  }
  if (countdown === null) return "Closed (no configured open window in remaining calendar)";
  if (countdown === 0) return "Opening at current milestone";
  return `Closed (${countdown} ${countdown === 1 ? "advance" : "advances"} until window opens)`;
}

function maybeResetRetentionBudgetForWeek() {
  ensureRetentionState();
  const week = currentEvent().weekLabel;
  if (data.retentionState.weekLabel !== week) {
    data.retentionState.weekLabel = week;
    data.retentionState.actionPoints = data.retentionState.maxActionPoints;
  }
}

function updateOutgoingRiskRowsFromState() {
  ensureRetentionState();
  if (!Array.isArray(data.outgoingRisk)) return;
  data.outgoingRisk = data.outgoingRisk.map((row) => {
    const key = retentionKey(row);
    const score = data.retentionState.playerRisk[key] || riskLabelToScore(row[3]);
    const risk = riskScoreToLabel(score);
    const baseReason = data.retentionState.baseReason[key] || row[4] || "No reason recorded";
    const note = data.retentionState.notes[key];
    return [row[0], row[1], row[2], risk, note ? `${baseReason}; ${note}` : baseReason];
  });
}

function adjustProgramConfidence(fanDelta, donorDelta) {
  const profile = career.generatedProfile || generateCareerProfile(career.seed, programById(career.programId));
  profile.fanConfidence = clampRating((profile.fanConfidence || 50) + fanDelta);
  profile.donorConfidence = clampRating((profile.donorConfidence || 50) + donorDelta);
  career.generatedProfile = profile;
}

function commitBenefits(bucketKey, amount) {
  ensureBenefitState();
  if (!Number.isInteger(amount) || amount <= 0) return false;
  const bucket = data.benefitState.buckets[bucketKey];
  if (!bucket) return false;
  if (bucket.committed + amount > bucket.budgeted) return false;
  if (totalCommittedBenefits() + amount > data.benefitState.totalPool) return false;
  bucket.committed += amount;
  refreshBenefitPressure();
  return true;
}

function applyBenefitAdjustment(bucketKey, delta) {
  ensureBenefitState();
  const bucket = data.benefitState.buckets[bucketKey];
  if (!bucket || !Number.isInteger(delta) || delta === 0) return false;
  if (delta > 0) {
    const committed = commitBenefits(bucketKey, delta);
    if (!committed) return false;
    if (bucketKey === "retention") adjustProgramConfidence(1, -1);
    if (bucketKey === "recruiting") adjustProgramConfidence(0, 1);
    appendPressureTrace("Benefit Allocation", bucketKey === "retention" ? -1 : 1, `${bucketKey} +${delta}k committed`);
    return true;
  }
  const release = Math.abs(delta);
  if (bucket.committed < release) return false;
  bucket.committed -= release;
  refreshBenefitPressure();
  if (bucketKey === "retention") adjustProgramConfidence(-1, 1);
  if (bucketKey === "recruiting") adjustProgramConfidence(0, -1);
  appendPressureTrace("Benefit Allocation", bucketKey === "retention" ? 1 : -1, `${bucketKey} -${release}k committed`);
  return true;
}

function projectedRosterCount() {
  ensurePortalState();
  return players().length + data.portalState.pendingAdds.length;
}

function rosterComplianceSummary() {
  ensurePortalState();
  const projected = projectedRosterCount();
  const limit = data.portalState.rosterLimit;
  const delta = limit - projected;
  if (delta < 0) return { tone: "Over", detail: `${Math.abs(delta)} over limit`, blocking: true };
  if (delta === 0) return { tone: "At limit", detail: "No room for additional adds", blocking: false };
  if (delta === 1) return { tone: "Near limit", detail: "One slot remains", blocking: false };
  return { tone: "Compliant", detail: `${delta} slots remain`, blocking: false };
}

function refreshRosterComplianceNotification() {
  ensurePortalState();
  const id = "roster-limit-compliance";
  data.notifications = data.notifications.filter((notification) => notification.id !== id);
  const projected = projectedRosterCount();
  const limit = data.portalState.rosterLimit;
  const countdown = portalWindowCountdown();
  const open = isPortalWindowOpen();
  const nearLock = open || (countdown !== null && countdown <= 2);
  if (!nearLock && projected < limit) return;

  if (projected > limit) {
    injectNotification({
      id,
      title: "Projected roster exceeds configured limit",
      body: `Projected count ${projected} is above limit ${limit}. Remove pending adds before portal lock.`,
      severity: "Must Respond",
      department: "Compliance",
      deadline: "Before portal lock",
      linked: "Transfer Portal",
      targetView: "portal",
      blocking: true,
      resolved: false,
    });
    return;
  }

  if (projected >= limit - 1) {
    injectNotification({
      id,
      title: "Roster-limit warning",
      body: `Projected count ${projected}/${limit}. Review portal additions before lock.`,
      severity: "Deadline",
      department: "Compliance",
      deadline: "Before portal lock",
      linked: "Transfer Portal",
      targetView: "portal",
      blocking: false,
      resolved: false,
    });
  }
}

function stepPortalExceptionClock() {
  ensurePortalState();
  if (data.portalState.coachChangeExceptionRemaining > 0 && currentEvent().phase !== "Postgame Review") {
    data.portalState.coachChangeExceptionRemaining = Math.max(0, data.portalState.coachChangeExceptionRemaining - 1);
  }
}

function activateCoachChangeException() {
  ensurePortalState();
  if (data.portalState.coachChangeExceptionRemaining > 0) return false;
  data.portalState.coachChangeExceptionRemaining = ruleValue("portalExceptionAdvances", PORTAL_EXCEPTION_ADVANCES);
  appendPressureTrace("Portal Exception", 2, "Coach-change exception used");
  return true;
}

function applyRetentionAction(rowIndex, action) {
  ensureRetentionState();
  ensureBenefitState();
  maybeResetRetentionBudgetForWeek();
  const row = Array.isArray(data.outgoingRisk) ? data.outgoingRisk[rowIndex] : null;
  if (!row) return false;
  const key = retentionKey(row);
  const cost = RETENTION_ACTION_COST[action] || 1;
  if (data.retentionState.actionPoints < cost) return false;

  let reduction = 0;
  let note = "Retention touch completed";
  if (action === "conversation") {
    reduction = 12;
    note = "Held direct retention conversation";
    adjustProgramConfidence(1, 0);
  }
  if (action === "rolePitch") {
    reduction = 16;
    note = "Presented role and usage plan";
    adjustProgramConfidence(1, 0);
  }
  if (action === "benefitBoost") {
    reduction = 22;
    note = "Offered benefit-backed retention package";
    if (!commitBenefits("retention", 20)) return false;
    adjustProgramConfidence(2, -1);
  }

  const currentScore = Number.isInteger(data.retentionState.playerRisk[key])
    ? data.retentionState.playerRisk[key]
    : riskLabelToScore(row[3]);
  data.retentionState.playerRisk[key] = Math.max(5, currentScore - reduction);
  data.retentionState.notes[key] = note;
  data.retentionState.actionPoints -= cost;
  appendPressureTrace("Retention", -1, `${row[1]} ${action} action`);
  updateOutgoingRiskRowsFromState();
  refreshBenefitPressure();
  return true;
}

function applyPortalTargetAction(rowIndex, action) {
  ensurePortalState();
  ensureBenefitState();
  const row = Array.isArray(data.portal) ? data.portal[rowIndex] : null;
  if (!row) return false;
  if (!isPortalWindowOpen()) return false;

  const name = row[1];
  const status = data.portalState.targetStatus[name] || row[4] || "Watch list";
  if (action === "contact") {
    data.portalState.targetStatus[name] = "Contact established";
    row[4] = "Contact established";
    appendPressureTrace("Portal", 0, `Contact opened with ${name}`);
    return true;
  }
  if (action === "pursue") {
    if (!(status === "Contact established" || status === "Likely transfer")) return false;
    const random = createSeededRandom(`${career.seed}:portal-negotiation:${name}:${career.advanceCount}`);
    const school = currentSchoolProfile();
    const nilDepth = averageAttr(school && school.attrs, ["nilCapacity", "nilStructure", "boosterStrength", "ticketDemand"], 10);
    const demand = seededRange(random, 8, 18);
    const agentBias = seededRange(random, 0, 3);
    const cost = Math.max(8, Math.round((10 + demand + agentBias + ((ruleValue("nilVolatilityPercent", 100) - 100) * 0.08) - ((nilDepth - 10) * 0.8))));
    if (!commitBenefits("recruiting", cost)) return false;
    data.portalState.targetStatus[name] = "Likely transfer";
    row[4] = "Likely transfer";
    if (!data.portalState.pendingAdds.includes(name)) data.portalState.pendingAdds.push(name);
    appendPressureTrace("Portal", 1, `Pending add created for ${name} (cost ${cost}k)`);
    refreshRosterComplianceNotification();
    return true;
  }
  if (action === "remove") {
    data.portalState.targetStatus[name] = "Watch list";
    row[4] = "Watch list";
    data.portalState.pendingAdds = data.portalState.pendingAdds.filter((entry) => entry !== name);
    appendPressureTrace("Portal", -1, `Pending add removed for ${name}`);
    refreshRosterComplianceNotification();
    return true;
  }
  return false;
}

function driftRetentionRisk() {
  ensureRetentionState();
  ensureWorldModelState();
  maybeResetRetentionBudgetForWeek();
  if (!Array.isArray(data.outgoingRisk)) return;
  data.outgoingRisk.forEach((row) => {
    const key = retentionKey(row);
    const current = Number.isInteger(data.retentionState.playerRisk[key])
      ? data.retentionState.playerRisk[key]
      : riskLabelToScore(row[3]);
    const drift = current >= 70 ? 4 : current >= 45 ? 2 : 1;
    const retentionPressure = data.benefitState && data.benefitState.buckets && data.benefitState.buckets.retention
      ? data.benefitState.buckets.retention.pressure
      : 60;
    const pressureDrift = retentionPressure >= 80 ? 2 : 0;
    const marketDrift = data.worldModelState.marketHeat >= 72 ? 2 : data.worldModelState.marketHeat <= 38 ? -1 : 0;
    data.retentionState.playerRisk[key] = Math.min(95, Math.max(5, current + drift + pressureDrift + marketDrift));
  });
  updateOutgoingRiskRowsFromState();
}

function scheduleRowToGameContext(row, index) {
  const site = row[2] || "Home";
  const away = site.toLowerCase().includes("away") || site.toLowerCase().includes("at");
  const opponentQuality = parseInt(row[3], 10);
  const quality = Number.isFinite(opponentQuality) ? opponentQuality : 80;
  return {
    index,
    weekLabel: row[0],
    opponent: row[1],
    away,
    opponentQuality: quality,
  };
}

function computeGameResult(game) {
  return simulateDriveByDriveGame(game);
}

function updateScheduleWithResult(game, result) {
  const row = data.schedule[game.index];
  const resultText = result.win ? `W ${result.ourScore}-${result.oppScore}` : `L ${result.ourScore}-${result.oppScore}`;
  const note = result.win ? "Final - Win" : "Final - Loss";
  row[3] = resultText;
  row[4] = note;
}

function updateStandingsForGame(result) {
  ensureSeasonState();
  if (result.win) {
    data.seasonState.overallRecord.wins += 1;
    data.seasonState.conferenceRecord.wins += 1;
  } else {
    data.seasonState.overallRecord.losses += 1;
    data.seasonState.conferenceRecord.losses += 1;
  }

  const lakeviewIndex = data.standings.findIndex((row) => row[1] === programById(career.programId).shortName || row[1] === career.school);
  if (lakeviewIndex >= 0) {
    const row = data.standings[lakeviewIndex];
    row[2] = `${data.seasonState.overallRecord.wins}-${data.seasonState.overallRecord.losses}`;
    const delta = result.win ? 2 : -2;
    const rating = Math.max(68, Math.min(99, (Number(row[3]) || 85) + delta));
    row[3] = String(rating);
    row[4] = rating >= 92 ? "A" : rating >= 88 ? "A-" : rating >= 84 ? "B+" : rating >= 80 ? "B" : "B-";
  }

  data.standings = [...data.standings].sort((a, b) => {
    const [aw, al] = a[2].split("-").map((v) => Number(v) || 0);
    const [bw, bl] = b[2].split("-").map((v) => Number(v) || 0);
    const aPct = aw + al > 0 ? aw / (aw + al) : 0;
    const bPct = bw + bl > 0 ? bw / (bw + bl) : 0;
    if (bPct !== aPct) return bPct - aPct;
    return (Number(b[3]) || 0) - (Number(a[3]) || 0);
  });
  data.standings.forEach((row, index) => {
    row[0] = String(index + 1);
  });
}

function updateRankingsAfterGame(result) {
  const wins = data.seasonState.overallRecord.wins;
  const losses = data.seasonState.overallRecord.losses;
  const ratingBase = career.generatedProfile.prestige + (wins * 2) - (losses * 2) + (result.win ? 1 : -1);
  const rating = Math.max(72, Math.min(98, ratingBase));
  const trend = result.win ? "Up" : "Down";
  const rankEstimate = Math.max(4, 24 - wins + losses);
  const list = vm("nationalTop10");
  if (!Array.isArray(list) || list.length < 2) return;
  const targetName = programById(career.programId).shortName;
  let idx = list.findIndex((row, index) => index > 0 && row[1] === targetName);
  if (idx < 0) {
    list.push([String(rankEstimate), targetName, `${wins}-${losses}`, String(rating), trend]);
    idx = list.length - 1;
  } else {
    list[idx] = [String(rankEstimate), targetName, `${wins}-${losses}`, String(rating), trend];
  }
}

function buildBoxScoreRow(game, result) {
  const ourSchool = programById(career.programId).shortName;
  const summary = `${ourSchool} ${result.ourScore} - ${game.opponent} ${result.oppScore}`;
  return [game.weekLabel, summary, result.win ? "Win" : "Loss"];
}

function playNextRegularSeasonGame() {
  ensureSeasonState();
  ensureCultureState();
  if (data.seasonState.currentGameIndex === 0) data.seasonState.yearRolled = false;
  if (data.seasonState.currentGameIndex >= data.schedule.length) return false;
  const row = data.schedule[data.seasonState.currentGameIndex];
  const game = scheduleRowToGameContext(row, data.seasonState.currentGameIndex);
  const result = computeGameResult(game);

  ensureDepthChartState();
  Object.values(data.depthChart).forEach((playerId) => {
    const starter = findPlayer(playerId);
    if (!starter) return;
    starter.eligibility.gamesPlayedThisSeason += 1;
    persistPlayerDecision(starter);
  });

  updateScheduleWithResult(game, result);
  updateStandingsForGame(result);
  updateRankingsAfterGame(result);
  evaluatePromiseAndMoraleAfterUsage();
  const boxScore = buildBoxScoreRow(game, result);
  data.seasonState.lastDriveSummary = Array.isArray(result.drives) ? result.drives.slice(0, 24) : [];
  data.seasonState.lastPlayByPlay = data.seasonState.playByPlayEnabled && Array.isArray(result.playByPlay)
    ? result.playByPlay.slice(0, 80)
    : [];
  // MATCHUP wiring: stash structured PlayEvents + reason-code rollup so the
  // UI can show "why" the game went the way it did. Capped to keep memory
  // reasonable across a full season; full event log lives in playedGames if
  // we need it later (STAT-5 accumulator will own persistence).
  data.seasonState.lastPlayEvents = Array.isArray(result.playEvents) ? result.playEvents.slice(0, 60) : [];
  data.seasonState.lastReasonCodes = isRecord(result.reasonCodeRollup) ? result.reasonCodeRollup : {};
  data.seasonState.lastMatchupSnapshot = result.matchupSnapshot || null;

  // INJURY-1 wiring (Wave 18): apply per-game injuries to the live roster +
  // emit events. Injuries from the sim core arrive on result.injuries.
  if (Array.isArray(result.injuries) && result.injuries.length && window.CGM_INJURY) {
    const myProg = programById(career.programId);
    const roster = data.playerProfiles || [];
    result.injuries.forEach((inj) => {
      const player = roster.find((p) => p.id === inj.playerId);
      if (!player) return;
      window.CGM_INJURY.applyInjury(player, inj);
      // Mirror onto the legacy fields the UI already reads.
      player.injuryStatus = inj.severity === "seasonEnding" ? "Out for Season" : `${window.CGM_INJURY.SEVERITY_BANDS[inj.severity].label} (${inj.weeksOut}wk)`;
      logEvent({
        category: "injury",
        severity: inj.severity === "seasonEnding" ? "major" : (inj.severity === "severe" ? "notable" : "minor"),
        actorId: career.programId,
        actorName: myProg.shortName,
        subjectIds: [inj.playerId],
        summary: `${inj.position} ${inj.playerName || player.name} — ${inj.type} (${inj.weeksOut}wk, ${inj.severity})`,
        reasonCodes: inj.reasonCodes || ["injury_occurred"],
      });
    });
  }

  // STAT-1/3 wiring (DL-20260502-03): accumulate the game's PlayEvents into a
  // GameBook with per-team stat lines, and roll the player team's totals into
  // the season aggregate stashed on seasonState.seasonStatBook.
  const ACC = window.CGM_STAT_ACCUMULATOR;
  if (ACC && Array.isArray(result.playEvents) && result.playEvents.length) {
    const myProgram = programById(career.programId);
    const opponentProgram = programs.find((p) => {
      const cleaned = String(game.opponent || "").replace(/^at\s+/i, "").trim();
      return p.shortName === cleaned || p.name === cleaned;
    });
    const meta = {
      gameId: result.playEvents[0].gameId,
      homeTeamId: game.away ? (opponentProgram ? opponentProgram.id : "opp") : myProgram.id,
      awayTeamId: game.away ? myProgram.id : (opponentProgram ? opponentProgram.id : "opp"),
      homeTeamName: game.away ? (opponentProgram ? opponentProgram.shortName : game.opponent) : myProgram.shortName,
      awayTeamName: game.away ? myProgram.shortName : (opponentProgram ? opponentProgram.shortName : game.opponent),
    };
    const book = ACC.buildGameBook(result.playEvents, meta);
    const reconciliation = ACC.reconcileGameBook(book);
    data.seasonState.lastGameBook = book;
    data.seasonState.lastReconciliation = reconciliation;
    if (!isRecord(data.seasonState.seasonStatBook)) {
      data.seasonState.seasonStatBook = { our: ACC.emptyTeamLine(), opp: ACC.emptyTeamLine(), gamesIncluded: 0 };
    }
    const ourLine = meta.homeTeamId === myProgram.id ? book.home : book.away;
    const oppLine = meta.homeTeamId === myProgram.id ? book.away : book.home;
    ACC.accumulateLineInto(data.seasonState.seasonStatBook.our, ourLine);
    ACC.accumulateLineInto(data.seasonState.seasonStatBook.opp, oppLine);
    data.seasonState.seasonStatBook.gamesIncluded += 1;
  }

  // STAT-4..7 (DL-20260502-04): credit per-player stat lines from PlayEvents
  // that carry participants. Game book stashed on seasonState.lastPlayerBook;
  // season totals roll into seasonState.seasonPlayerBook (player-id keyed).
  const PSA = window.CGM_PLAYER_STAT_ACCUMULATOR;
  if (PSA && Array.isArray(result.playEvents) && result.playEvents.length) {
    const myProgram = programById(career.programId);
    const ourEvents = result.playEvents.filter((e) => e.possessionTeamId === myProgram.id);
    const ourPlayerBook = PSA.buildGamePlayerBook(ourEvents);
    data.seasonState.lastPlayerBook = ourPlayerBook;
    if (!isRecord(data.seasonState.seasonPlayerBook)) {
      data.seasonState.seasonPlayerBook = { passers: {}, rushers: {}, receivers: {}, defenders: {}, gamesIncluded: 0 };
    }
    PSA.accumulateSeasonBook(data.seasonState.seasonPlayerBook, ourPlayerBook);
  }

  // AI-SCHOOL-1: sim the rest of the country's games for this week so the
  // National Top 25 and rivals' records evolve alongside the player's.
  runAiSchoolWeeklyTickIfNeeded(data.seasonState.currentGameIndex);
  // REC-1 / AI-SCHOOL-2: AI schools push interest + occasionally land commits.
  runWeeklyAiRecruitingTickIfNeeded(data.seasonState.currentGameIndex);
  // NIL-1: weekly NIL pool recharge (driven by booster temperature when Pulse is on).
  tickNilWeekly();
  // INJURY-1: weekly recovery tick. Decrements every injured player's weeksOut.
  if (window.CGM_INJURY && Array.isArray(data.playerProfiles)) {
    const recovery = window.CGM_INJURY.tickInjuryRecovery(data.playerProfiles);
    if (recovery.recovered.length) {
      const myProg = programById(career.programId);
      recovery.recovered.forEach((pid) => {
        const p = data.playerProfiles.find((x) => x.id === pid);
        if (!p) return;
        p.injuryStatus = "Healthy";
        logEvent({
          category: "injury_recovered",
          severity: "minor",
          actorId: career.programId,
          actorName: myProg.shortName,
          subjectIds: [pid],
          summary: `${p.position} ${p.name} cleared to play`,
          reasonCodes: ["injury_recovered"],
        });
      });
    }
  }
  // PULSE-1: recompute Campus Pulse from the latest events.
  recomputeCampusPulse();
  // Also bump the player team's own record into the AI standings so it's
  // included in the Top 25 picture deterministically.
  const aiStandings = ensureAiSchoolStandings();
  if (aiStandings && aiStandings[career.programId]) {
    const myRec = aiStandings[career.programId];
    if (result.win) myRec.wins += 1; else myRec.losses += 1;
    myRec.pointsFor += result.ourScore;
    myRec.pointsAgainst += result.oppScore;
    myRec.recentResults.unshift({ week: data.seasonState.currentGameIndex, opponent: game.opponent, points: result.ourScore, oppPoints: result.oppScore, win: result.win });
    myRec.recentResults = myRec.recentResults.slice(0, 6);
  }

  // PERSIST-1: emit a typed event for the game result. Severity scales with
  // how lopsided / rivalry-flavored the result was so Scrapbook ranking and
  // Campus Pulse have meaningful drivers.
  const cleanedOpp = String(game.opponent || "").replace(/^at\s+/i, "").trim();
  const oppProgram = programs.find((p) => p.shortName === cleanedOpp || p.name === cleanedOpp);
  const margin = result.ourScore - result.oppScore;
  const myProgRecord = programById(career.programId);
  const isRivalry = oppProgram && (oppProgram.id === myProgRecord.rival || myProgRecord.id === oppProgram.rival);
  const severity = isRivalry ? "major" : Math.abs(margin) >= 30 ? "notable" : Math.abs(margin) >= 14 ? "minor" : "minor";
  logEvent({
    category: "game_played",
    severity,
    actorId: career.programId,
    actorName: myProgRecord.shortName,
    subjectIds: oppProgram ? [oppProgram.id] : [],
    summary: `${myProgRecord.shortName} ${result.ourScore} - ${oppProgram ? oppProgram.shortName : game.opponent} ${result.oppScore}`,
    reasonCodes: [
      result.win ? "result_win" : "result_loss",
      isRivalry ? "rivalry_game" : "regular_game",
      Math.abs(margin) >= 21 ? "blowout" : Math.abs(margin) <= 7 ? "close_game" : "decisive",
    ],
    data: {
      gameId: result.playEvents && result.playEvents[0] ? result.playEvents[0].gameId : null,
      ourScore: result.ourScore,
      oppScore: result.oppScore,
      site: game.away ? "away" : "home",
      week: game.weekLabel,
    },
  });
  data.seasonState.lastAdvancedBox = isRecord(result.advanced) ? clone(result.advanced) : null;
  data.seasonState.lastOpponentTendencies = result.tendencies
    ? [["Run rate", `${result.tendencies.runRate}%`], ["Pass rate", `${result.tendencies.passRate}%`], ["Pace", String(result.tendencies.pace)], ["Blitz", `${result.tendencies.blitzRate}%`]]
    : [];
  data.seasonState.playedGames.push({
    weekLabel: game.weekLabel,
    opponent: game.opponent,
    ourScore: result.ourScore,
    oppScore: result.oppScore,
    outcome: result.win ? "W" : "L",
    drives: Array.isArray(result.drives) ? result.drives.length : 0,
  });
  data.seasonState.lastResultSummary = `${result.win ? "Win" : "Loss"} vs ${game.opponent} (${result.ourScore}-${result.oppScore})`;
  data.seasonState.currentGameIndex += 1;
  syncCareerRecordFromSeasonState();
  appendPressureTrace(
    "Game Result",
    result.win ? -2 : 3,
    result.win ? `Beat ${game.opponent} in ${game.weekLabel}` : `Lost to ${game.opponent} in ${game.weekLabel}`,
  );
  injectNotification({
    id: `game-final-${data.seasonState.seasonYear}-${game.index}`,
    title: `Final: ${boxScore[1]}`,
    body: `Week result logged. Updated record is ${career.record}.`,
    severity: "Action Recommended",
    department: "Schedule",
    deadline: "This week",
    linked: "Schedule",
    targetView: "schedule",
    blocking: false,
    resolved: false,
  });
  if (data.seasonState.currentGameIndex >= data.schedule.length) {
    data.seasonState.postseasonStage = "selection";
    buildCfpBracket();
  }
  refreshStewardshipModels();
  return true;
}

function buildCfpBracket() {
  ensureSeasonState();
  const ranked = vm("nationalTop10").slice(1).map((row) => ({
    seed: Number(row[0]) || 99,
    team: row[1],
    record: row[2],
    rating: Number(row[3]) || 80,
  }));
  const unique = [];
  const seen = new Set();
  ranked.forEach((entry) => {
    if (seen.has(entry.team)) return;
    unique.push(entry);
    seen.add(entry.team);
  });
  unique.sort((a, b) => {
    if (a.seed !== b.seed) return a.seed - b.seed;
    return b.rating - a.rating;
  });
  const field = unique.slice(0, CFP_FIELD_SIZE);
  if (field.length < CFP_FIELD_SIZE) return;
  // 12-team CFP: top 4 seeds get first-round byes; seeds 5-12 play first round.
  // First-round pairings: 5v12, 6v11, 7v10, 8v9. QF pairings: 1v(8/9), 2v(7/10), 3v(6/11), 4v(5/12).
  data.seasonState.cfpBracket = [
    ["First Round",  `(5) ${field[4].team} vs (12) ${field[11].team}`, "Pending"],
    ["First Round",  `(6) ${field[5].team} vs (11) ${field[10].team}`, "Pending"],
    ["First Round",  `(7) ${field[6].team} vs (10) ${field[9].team}`,  "Pending"],
    ["First Round",  `(8) ${field[7].team} vs (9) ${field[8].team}`,   "Pending"],
    ["Quarterfinal", `(1) ${field[0].team} vs TBD`,                    "Pending"],
    ["Quarterfinal", `(2) ${field[1].team} vs TBD`,                    "Pending"],
    ["Quarterfinal", `(3) ${field[2].team} vs TBD`,                    "Pending"],
    ["Quarterfinal", `(4) ${field[3].team} vs TBD`,                    "Pending"],
    ["Semifinal",    "TBD vs TBD",                                     "Pending"],
    ["Semifinal",    "TBD vs TBD",                                     "Pending"],
    ["Championship", "TBD",                                            "Pending"],
  ];
  injectNotification({
    id: `cfp-field-${data.seasonState.seasonYear}`,
    title: "CFP field set",
    body: `Selection stage is complete. The 12-team bracket has been published — top four seeds have first-round byes.`,
    severity: "Action Recommended",
    department: "Rankings",
    deadline: "This week",
    linked: "Rankings",
    targetView: "rankings",
    blocking: false,
    resolved: false,
  });
}

function playPostseasonRound() {
  ensureSeasonState();
  const bracket = data.seasonState.cfpBracket;
  if (!Array.isArray(bracket) || bracket.length < 11) return false;

  // Strip a "(seed)" prefix if present for cleaner display in later rounds.
  const stripSeed = (label) => String(label).replace(/^\(\d+\)\s*/, "");

  // Resolve a single matchup at index, write back the winner, and return the
  // winner team string (without seed). Returns null if matchup is incomplete.
  const resolveMatchup = (index, key) => {
    const matchup = bracket[index][1];
    if (!matchup || matchup.includes("TBD")) return null;
    const parts = matchup.split(" vs ");
    if (parts.length !== 2) return null;
    const teamA = stripSeed(parts[0]);
    const teamB = stripSeed(parts[1]);
    const random = createSeededRandom(`${career.seed}:cfp:${key}:${data.seasonState.seasonYear}:${index}`);
    const winner = seededRange(random, 1, 100) <= 50 ? teamA : teamB;
    bracket[index][2] = `${winner} advanced`;
    return winner;
  };

  // First round: indices 0..3 produce the four lower-bracket winners.
  if (data.seasonState.postseasonStage === "selection" || data.seasonState.postseasonStage === "regular") {
    const firstRoundWinners = [];
    for (let i = 0; i < 4; i += 1) firstRoundWinners.push(resolveMatchup(i, "first"));
    if (firstRoundWinners.some((w) => !w)) return false;
    // Wire winners into quarterfinal slots (5v12 → 4-seed; 6v11 → 3-seed; 7v10 → 2-seed; 8v9 → 1-seed).
    bracket[4][1] = bracket[4][1].replace("TBD", firstRoundWinners[3]); // 1 vs (8/9)
    bracket[5][1] = bracket[5][1].replace("TBD", firstRoundWinners[2]); // 2 vs (7/10)
    bracket[6][1] = bracket[6][1].replace("TBD", firstRoundWinners[1]); // 3 vs (6/11)
    bracket[7][1] = bracket[7][1].replace("TBD", firstRoundWinners[0]); // 4 vs (5/12)
    data.seasonState.postseasonStage = "first-round-complete";
    injectNotification({
      id: `cfp-first-${data.seasonState.seasonYear}`,
      title: "CFP first round resolved",
      body: `Quarterfinal matchups are set. Top four seeds enter the bracket.`,
      severity: "Advisory",
      department: "Rankings",
      deadline: "This week",
      linked: "Rankings",
      targetView: "rankings",
      blocking: false,
      resolved: false,
    });
    return true;
  }

  // Quarterfinals: indices 4..7 → semifinal slots 8 and 9.
  if (data.seasonState.postseasonStage === "first-round-complete") {
    const qfWinners = [];
    for (let i = 4; i <= 7; i += 1) qfWinners.push(resolveMatchup(i, "qf"));
    if (qfWinners.some((w) => !w)) return false;
    // QF winners pair into semis: (1/8/9) vs (4/5/12), (2/7/10) vs (3/6/11)
    bracket[8][1] = `${qfWinners[0]} vs ${qfWinners[3]}`;
    bracket[9][1] = `${qfWinners[1]} vs ${qfWinners[2]}`;
    data.seasonState.postseasonStage = "quarterfinal-complete";
    injectNotification({
      id: `cfp-qf-${data.seasonState.seasonYear}`,
      title: "CFP quarterfinals resolved",
      body: `Semifinal matchups: ${bracket[8][1]} and ${bracket[9][1]}.`,
      severity: "Advisory",
      department: "Rankings",
      deadline: "This week",
      linked: "Rankings",
      targetView: "rankings",
      blocking: false,
      resolved: false,
    });
    return true;
  }

  // Semifinals: indices 8 and 9 → championship slot 10.
  if (data.seasonState.postseasonStage === "quarterfinal-complete") {
    const semiWinners = [resolveMatchup(8, "semi"), resolveMatchup(9, "semi")];
    if (semiWinners.some((w) => !w)) return false;
    bracket[10][1] = `${semiWinners[0]} vs ${semiWinners[1]}`;
    data.seasonState.postseasonStage = "semifinal-complete";
    injectNotification({
      id: `cfp-semifinal-${data.seasonState.seasonYear}`,
      title: "CFP semifinals resolved",
      body: `Championship matchup is ${bracket[10][1]}.`,
      severity: "Advisory",
      department: "Rankings",
      deadline: "This week",
      linked: "Rankings",
      targetView: "rankings",
      blocking: false,
      resolved: false,
    });
    return true;
  }

  // Championship: index 10.
  if (data.seasonState.postseasonStage === "semifinal-complete") {
    const random = createSeededRandom(`${career.seed}:cfp-final:${data.seasonState.seasonYear}`);
    const parts = bracket[10][1].split(" vs ");
    if (parts.length !== 2 || parts[1] === "TBD") return false;
    const teamA = stripSeed(parts[0]);
    const teamB = stripSeed(parts[1]);
    const champion = seededRange(random, 1, 100) <= 50 ? teamA : teamB;
    bracket[10][2] = `${champion} champion`;
    data.seasonState.postseasonStage = "champion-set";
    data.seasonState.seasonComplete = true;
    archiveSeasonHistory(champion);
    injectNotification({
      id: `cfp-final-${data.seasonState.seasonYear}`,
      title: `${champion} won the CFP championship`,
      body: `Season ${data.seasonState.seasonYear} is complete. Review archive and roll to next year.`,
      severity: "Action Recommended",
      department: "History",
      deadline: "Before continue",
      linked: "History",
      targetView: "history",
      blocking: false,
      resolved: false,
    });
    return true;
  }
  return false;
}

function archiveSeasonHistory(champion) {
  ensureSeasonState();
  if (!Array.isArray(data.history)) return;
  const season = String(data.seasonState.seasonYear);
  data.history = data.history.filter((row) => row[0] !== season);
  data.history.unshift([
    season,
    `${data.seasonState.overallRecord.wins}-${data.seasonState.overallRecord.losses}`,
    champion === programById(career.programId).shortName ? "CFP Champion" : "CFP cycle complete",
    vm("nationalTop10").find((row, index) => index > 0 && row[1] === programById(career.programId).shortName)?.[0] || "NR",
    `CFP winner: ${champion}`,
  ]);
  ensureHistoryConsistency();
}

function rollToNextSeasonYear() {
  ensureSeasonState();
  if (!data.seasonState.seasonComplete) return false;
  data.seasonState.yearRolled = true;
  data.seasonState.seasonYear += 1;
  // Re-stamp the calendar so the new season's dateLabels reflect the new year.
  reseedCalendarYear(data.seasonState.seasonYear);
  data.seasonState.currentGameIndex = 0;
  data.seasonState.overallRecord = { wins: 0, losses: 0 };
  data.seasonState.conferenceRecord = { wins: 0, losses: 0 };
  data.seasonState.playedGames = [];
  data.seasonState.cfpBracket = [];
  data.seasonState.postseasonStage = "regular";
  data.seasonState.seasonComplete = false;
  data.seasonState.lastResultSummary = "Season reset complete";
  // SCRAPBOOK-1 deeper: compose the season-end scrapbook page from the event
  // log + final record, store it in data.scrapbookArchive for the History tab
  // to surface. Runs BEFORE record reset so finalRecord is the just-finished
  // season's mark.
  // ARCHIVE-1: tally each active player's season stats into their lifetime
  // careerStats BEFORE awards (so awards see careerStats too) and BEFORE
  // draft outflow (so the alumni archive captures everything).
  tallyCareerStatsForRoster();
  // AWARDS-1: resolve season awards + detect record breaks BEFORE scrapbook
  // so the composer can pull the new awards/records as historic moments.
  resolveSeasonAwardsAndRecords();
  composeAndArchiveSeasonScrapbook();
  // STAFF-1: run the AI-school coaching carousel for every rival program.
  // Hot HC seats fire fires + brings in a new HC + emits historic events
  // that flow into the scrapbook + media on the next composer cycle.
  runAiSchoolCarouselCycle();
  // REALIGN-1: run conference realignment cycle (after this season's results
  // are baked, before we wipe records). Programs that move are reflected in
  // the next season's standings + scheduling.
  runOffseasonRealignmentCycle();
  // DRAFT-1: process senior outflow + draft projection BEFORE we reset.
  if (window.CGM_DRAFT) processYearEndDraftOutflow();
  // REC-1: roll prospect classes forward (HS_FR → HS_SO → … → graduate).
  if (window.CGM_RECRUITING_V2 && Array.isArray(data.prospectProfiles)) {
    window.CGM_RECRUITING_V2.rolloverProspectClasses(data.prospectProfiles);
  }
  // NIL-1: zero spend, keep pool.
  if (window.CGM_NIL && data.nilState) window.CGM_NIL.rolloverNilForNewSeason(data.nilState);
  // AI-SCHOOL-1: zero out rivals' season records so the new year starts clean.
  resetAiSchoolForNewSeason();
  logEvent({
    category: "season_rolled",
    severity: "notable",
    actorId: career.programId,
    actorName: programById(career.programId).shortName,
    summary: `Season ${data.seasonState.seasonYear} begins`,
    reasonCodes: ["year_rollover"],
  });
  players().forEach((player) => {
    player.eligibility.gamesPlayedThisSeason = 0;
    persistPlayerDecision(player);
  });
  // REALIGN-1 cleanup: rebuild the schedule from scratch so newly-realigned
  // conferences are reflected in next season's opponents. Falls back to the
  // legacy reset if the schedule generator isn't available.
  if (typeof expandSeasonSchedule === "function") {
    data.schedule = [];
    expandSeasonSchedule(`${career.seed}:${data.seasonState.seasonYear}`, 12);
  } else {
    data.schedule.forEach((row) => { row[3] = "-"; row[4] = "Upcoming"; });
  }
  career.currentEventIndex = 0;
  career.advanceCount += 1;
  syncAgendaFromCalendar();
  syncCareerRecordFromSeasonState();
  appendPressureTrace("Year Rollover", -1, `Entered season ${data.seasonState.seasonYear}`);
  refreshStewardshipModels();
  injectNotification({
    id: `year-rollover-${data.seasonState.seasonYear}`,
    title: `Year ${data.seasonState.seasonYear} started`,
    body: "Season state rolled over with preserved archive history.",
    severity: "FYI",
    department: "System",
    deadline: "None",
    linked: "Program Desk",
    targetView: "desk",
    blocking: false,
    resolved: false,
  });
  return true;
}

function advanceSeasonCompetitionShell() {
  ensureSeasonState();
  if (data.seasonState.currentGameIndex < data.schedule.length) {
    return playNextRegularSeasonGame();
  }
  if (!data.seasonState.seasonComplete) {
    return playPostseasonRound();
  }
  return rollToNextSeasonYear();
}

function cfpBracketRows() {
  ensureSeasonState();
  const header = [["Round", "Matchup", "Result"]];
  if (!Array.isArray(data.seasonState.cfpBracket) || !data.seasonState.cfpBracket.length) {
    return [...header, ["-", "Bracket not set", "Pending"]];
  }
  return [...header, ...data.seasonState.cfpBracket];
}

function recentBoxScoresRows() {
  ensureSeasonState();
  const header = [["Week", "Result", "Outcome"]];
  if (!Array.isArray(data.seasonState.playedGames) || !data.seasonState.playedGames.length) {
    return [...header, ["-", "No completed games yet", "-"]];
  }
  const rows = data.seasonState.playedGames
    .slice(-5)
    .reverse()
    .map((game) => [
      game.weekLabel,
      `${programById(career.programId).shortName} ${game.ourScore} - ${game.opponent} ${game.oppScore}`,
      game.outcome,
    ]);
  return [...header, ...rows];
}

function driveSummaryRows() {
  ensureSeasonState();
  const header = [["Drive", "Offense", "Result", "Pts", "Clock"]];
  if (!Array.isArray(data.seasonState.lastDriveSummary) || !data.seasonState.lastDriveSummary.length) {
    return [...header, ["-", "No completed game", "Drive log will populate after game simulation", "-", "-"]];
  }
  return [...header, ...data.seasonState.lastDriveSummary.slice(0, 20)];
}

function playByPlayPanel() {
  ensureSeasonState();
  const enabled = data.seasonState.playByPlayEnabled;
  const lines = Array.isArray(data.seasonState.lastPlayByPlay) ? data.seasonState.lastPlayByPlay.slice(0, 10) : [];
  const content = enabled
    ? (lines.length
      ? lines.map((line) => `<div class="agenda-item"><strong>Play</strong><p>${line}</p></div>`).join("")
      : '<div class="agenda-item"><strong>No game text yet</strong><p>Complete a game to generate play-by-play lines.</p></div>')
    : '<div class="agenda-item"><strong>Play-by-play is off</strong><p>Enable it for text flavor while preserving deterministic outcomes.</p></div>';
  return `<div class="agenda-list">
    <div class="agenda-item">
      <time>Mode</time>
      <strong>${enabled ? "Enabled" : "Disabled"}</strong>
      <p>Toggle controls optional text generation only.</p>
      <button class="small-action secondary" data-toggle-playbyplay="toggle">${enabled ? "Disable" : "Enable"}</button>
    </div>
    ${content}
  </div>`;
}

function playerStatsPanel(player) {
  ensureSeasonState();
  const PSA = window.CGM_PLAYER_STAT_ACCUMULATOR;
  const book = data.seasonState.seasonPlayerBook;
  if (!PSA || !book || !player) {
    return '<div class="agenda-list"><div class="agenda-item"><strong>No season stats yet</strong><p>Player stats populate after games are played.</p></div></div>';
  }
  const passLine = book.passers[player.id];
  const rushLine = book.rushers[player.id];
  const recvLine = book.receivers[player.id];
  const defLine = book.defenders[player.id];
  if (!passLine && !rushLine && !recvLine && !defLine) {
    return `<div class="agenda-list"><div class="agenda-item"><strong>No stats this season</strong><p>${player.name} has not been credited yet through ${book.gamesIncluded} game${book.gamesIncluded === 1 ? "" : "s"}.</p></div></div>`;
  }
  const sections = [];
  if (passLine && passLine.att > 0) {
    const d = PSA.passingDerived(passLine);
    sections.push(`<p class="label" style="margin:8px 0 4px">Passing</p><div class="data-list">
      <div class="data-row"><span>Att / Comp</span><span class="rating">${passLine.comp}/${passLine.att}</span></div>
      <div class="data-row"><span>Yards</span><span class="rating">${passLine.yards}</span></div>
      <div class="data-row"><span>TD / INT</span><span class="rating">${passLine.td}/${passLine.int}</span></div>
      <div class="data-row"><span>Y/A</span><span class="rating">${d.ypa.toFixed(1)}</span></div>
      <div class="data-row"><span>Comp %</span><span class="rating">${(d.pct * 100).toFixed(1)}%</span></div>
      <div class="data-row"><span>Passer Rating</span><span class="rating">${d.rating.toFixed(1)}</span></div>
      <div class="data-row"><span>Sacks Taken</span><span>${passLine.sacks} (${passLine.sack_yards} yds)</span></div>
    </div>`);
  }
  if (rushLine && rushLine.att > 0) {
    const d = PSA.rushingDerived(rushLine);
    sections.push(`<p class="label" style="margin:8px 0 4px">Rushing</p><div class="data-list">
      <div class="data-row"><span>Carries</span><span class="rating">${rushLine.att}</span></div>
      <div class="data-row"><span>Yards</span><span class="rating">${rushLine.yards}</span></div>
      <div class="data-row"><span>TD</span><span class="rating">${rushLine.td}</span></div>
      <div class="data-row"><span>YPC</span><span class="rating">${d.ypc.toFixed(1)}</span></div>
      <div class="data-row"><span>Long</span><span>${rushLine.longest}</span></div>
    </div>`);
  }
  if (recvLine && (recvLine.tgt > 0 || recvLine.rec > 0)) {
    const d = PSA.receivingDerived(recvLine);
    sections.push(`<p class="label" style="margin:8px 0 4px">Receiving</p><div class="data-list">
      <div class="data-row"><span>Targets / Rec</span><span class="rating">${recvLine.tgt}/${recvLine.rec}</span></div>
      <div class="data-row"><span>Yards</span><span class="rating">${recvLine.yards}</span></div>
      <div class="data-row"><span>TD</span><span class="rating">${recvLine.td}</span></div>
      <div class="data-row"><span>YPR</span><span class="rating">${d.ypr.toFixed(1)}</span></div>
      <div class="data-row"><span>Catch %</span><span class="rating">${(d.catchPct * 100).toFixed(1)}%</span></div>
      <div class="data-row"><span>Long</span><span>${recvLine.longest}</span></div>
    </div>`);
  }
  if (defLine && (defLine.sacks > 0 || defLine.ints > 0)) {
    sections.push(`<p class="label" style="margin:8px 0 4px">Defense</p><div class="data-list">
      <div class="data-row"><span>Sacks</span><span class="rating">${defLine.sacks}</span></div>
      <div class="data-row"><span>Interceptions</span><span class="rating">${defLine.ints}</span></div>
    </div>`);
  }
  return `<p class="label" style="margin:0 0 6px">Through ${book.gamesIncluded} game${book.gamesIncluded === 1 ? "" : "s"}</p>${sections.join("")}`;
}

function campusPulsePanel() {
  if (!window.CGM_CAMPUS_PULSE) return '<div class="agenda-list"><div class="agenda-item"><strong>Pulse module not loaded</strong></div></div>';
  const state = ensurePulseState();
  if (!state.snapshot) recomputeCampusPulse();
  const snap = state.snapshot;
  if (!snap) return '<div class="agenda-list"><div class="agenda-item"><strong>Campus Pulse</strong><p>Snapshot will compute after the first event.</p></div></div>';
  const tempBadgeColor = snap.temperature.score >= 70 ? "tc-pos" : snap.temperature.score >= 45 ? "tc-neutral" : "tc-pos";
  const header = `<div class="data-row"><div><strong>Program Temperature</strong><p style="opacity:0.7">Composite from 8 components</p></div><span class="trait-badge ${tempBadgeColor}">${snap.temperature.label} · ${snap.temperature.score}</span></div>`;
  const trendDisplay = (t) => {
    if (t === "↑") return '<span style="color:var(--success);margin-left:4px">↑</span>';
    if (t === "↓") return '<span style="color:var(--danger);margin-left:4px">↓</span>';
    return '<span style="color:var(--text-muted);margin-left:4px;opacity:0.45">·</span>';
  };
  const compRows = snap.components.map((c) => {
    const drivers = (c.recentDrivers || []).slice(0, 2).map((d) => d.summary).filter(Boolean).join(" · ");
    return `<div class="data-row"><div><strong>${c.label}</strong>${drivers ? `<p style="opacity:0.6;font-size:11px">${drivers}</p>` : ""}</div><span class="rating">${c.labelText}${trendDisplay(c.trend)}</span></div>`;
  }).join("");
  return header + `<div class="data-list">${compRows}</div>`;
}

function nilPoolPanel() {
  if (!window.CGM_NIL) return '<div class="agenda-list"><div class="agenda-item"><strong>NIL module not loaded</strong></div></div>';
  const state = ensureNilState();
  const myProg = programById(career.programId);
  const cap = state.capMillions || 1;
  const fillPct = Math.round((state.poolMillions / cap) * 100);
  const recentPledges = (state.pledgesThisCycle || []).slice(0, 4).map((p) =>
    `<div class="data-row"><span>${p.prospectName}</span><span class="rating">$${p.amountM.toFixed(2)}M</span></div>`
  ).join("") || `<div class="data-row"><span>—</span><span style="opacity:0.5">No recent pledges</span></div>`;
  return `<div class="data-list">
    <div class="data-row"><div><strong>NIL Pool</strong><p style="opacity:0.7">$${state.poolMillions.toFixed(2)}M / $${cap.toFixed(2)}M cap (${fillPct}%)</p></div><span class="rating">${myProg.fanBase || "—"}</span></div>
    <div class="data-row"><span>Weekly recharge</span><span class="rating">+$${state.weeklyRecharge.toFixed(2)}M</span></div>
    <div class="data-row"><span>Spend this season</span><span class="rating">$${(state.spendThisYear || 0).toFixed(2)}M</span></div>
    <div class="data-row"><span>Compliance flags</span><span class="rating">${state.complianceFlags || 0}</span></div>
  </div>
  <p class="label" style="margin:10px 0 6px">Recent Pledges</p>
  <div class="data-list">${recentPledges}</div>`;
}

function recruitingSuitorBoardPanel() {
  if (!window.CGM_RECRUITING_V2) return '<div class="agenda-list"><div class="agenda-item"><strong>Recruiting v2 not loaded</strong></div></div>';
  ensureProspectSuitors();
  const REC = window.CGM_RECRUITING_V2;
  const myProg = programById(career.programId);
  // Show top 6 most-contested HS_SR prospects we're in on.
  const seniors = (data.prospectProfiles || []).filter((p) =>
    (p.classYear === "HS_SR" || p.classYear === "HS SR") &&
    !(p.commitmentStatus && p.commitmentStatus.startsWith("Committed"))
  );
  const ourBoard = seniors.filter((p) =>
    Array.isArray(p.suitors) && p.suitors.some((s) => s.schoolId === myProg.id && s.interest > 30)
  );
  ourBoard.sort((a, b) => {
    const aBoard = REC.leaderboardForProspect(a);
    const bBoard = REC.leaderboardForProspect(b);
    const aGap = aBoard.length > 1 ? aBoard[0].interest - aBoard[1].interest : 100;
    const bGap = bBoard.length > 1 ? bBoard[0].interest - bBoard[1].interest : 100;
    return aGap - bGap;
  });
  const rows = ourBoard.slice(0, 8).map((p) => {
    const board = REC.leaderboardForProspect(p);
    const top = board.slice(0, 3).map((s) => {
      const isUs = s.schoolId === myProg.id;
      const cls = isUs ? "tc-pos" : "tc-neutral";
      return `<span class="trait-badge ${cls}">${s.schoolName} ${s.interest}</span>`;
    }).join(" ");
    return `<div class="data-row"><div><strong>${p.position} ${p.name}</strong><p style="opacity:0.7;font-size:11px">${p.stars} · ${p.classYear || "?"}</p></div><span>${top}</span></div>`;
  }).join("");
  if (!rows) {
    return '<div class="agenda-list"><div class="agenda-item"><strong>Suitor board empty</strong><p>Once you push interest with prospects, the most-contested ones land here.</p></div></div>';
  }
  return `<p class="label" style="margin:0 0 6px">Most-contested HS seniors on our board</p><div class="data-list">${rows}</div>`;
}

function draftClassPanel() {
  if (!Array.isArray(data.draftClasses) || !data.draftClasses.length) {
    return '<div class="agenda-list"><div class="agenda-item"><strong>No draft classes yet</strong><p>Departures show here at year rollover.</p></div></div>';
  }
  const rows = data.draftClasses.map((cls) => {
    return `<div class="data-row"><div><strong>${cls.seasonYear}</strong><p style="opacity:0.7;font-size:11px">${cls.note}</p>${cls.topDeparting ? `<p style="opacity:0.5;font-size:11px">${cls.topDeparting}</p>` : ""}</div><span class="rating">${cls.pickCount}</span></div>`;
  }).join("");
  return `<p class="label" style="margin:0 0 6px">NFL pipeline — most recent class first</p><div class="data-list">${rows}</div>`;
}

function validationPanel() {
  const INV = window.CGM_INVARIANTS;
  if (!INV) return '<div class="agenda-list"><div class="agenda-item"><strong>Invariants module not loaded</strong></div></div>';
  // Run on demand AND surface the last result.
  const cached = window.CGM_LAST_INVARIANT_RUN;
  if (!cached) {
    return `<div class="agenda-list">
      <div class="agenda-item">
        <strong>Validation harness</strong>
        <p>Runs ${INV.INVARIANTS.length} structural invariants over the live game state. Use this after a season to catch silent regressions.</p>
        <button class="small-action" data-run-invariants="run">Run Invariants</button>
      </div>
    </div>`;
  }
  const sum = cached.summary;
  const sevColor = { error: "tc-pos", warning: "tc-neutral", info: "tc-neutral", pass: "tc-pos" };
  const fails = cached.results.filter((r) => r.severity === "error" || r.severity === "warning");
  const failRows = fails.length
    ? fails.map((r) => `<div class="data-row"><div><strong>${r.id}</strong><p style="opacity:0.7;font-size:11px">${r.message}</p></div><span class="trait-badge ${sevColor[r.severity]}">${r.severity}</span></div>`).join("")
    : `<div class="data-row"><span style="opacity:0.6">All invariants passed.</span></div>`;
  return `<div class="agenda-list">
    <div class="agenda-item">
      <strong>Last run: ${cached.ranAt}</strong>
      <p>Pass ${sum.pass} / Warn ${sum.warning} / Error ${sum.error} / Info ${sum.info} (total ${sum.total})</p>
      <button class="small-action" data-run-invariants="run">Re-run</button>
    </div>
  </div>
  <p class="label" style="margin:10px 0 6px">Issues</p>
  <div class="data-list">${failRows}</div>`;
}

// ── UI-RESCUE-1: Roster workspace ─────────────────────────────────────────
// Spec: ai-pack/CFB_FM_UI_RESCUE_POLISH_PACK/07_ROSTER_AND_RECRUITING_SCREEN_REDESIGN_SPEC.md
// Replaces the prior card-grid Roster with a real management-sim table
// workspace: ObjectHeader → TabBar → ActionBar → DataGrid → RightInspector.

const ROSTER_TABS = [
  { id: "players", label: "Players" },
  { id: "depth", label: "Depth Chart" },
  { id: "eligibility", label: "Eligibility" },
  { id: "development", label: "Development" },
  { id: "morale", label: "Morale" },
  { id: "nil", label: "NIL" },
  { id: "risk", label: "Transfer Risk" },
];
const ROSTER_VIEWS = [
  { id: "general", label: "General" },
  { id: "attributes", label: "Attributes" },
  { id: "eligibility", label: "Eligibility" },
  { id: "nil", label: "NIL" },
  { id: "development", label: "Development" },
];

const ROSTER_VIEW_PRESETS = {
  general: ["name", "position", "year", "ovr", "pot", "morale", "transferRisk", "redshirtIntent", "devCurve"],
  attributes: ["name", "position", "year", "ovr", "pot", "throwing", "decisions", "pace", "strength", "agility", "tackling", "coverage"],
  eligibility: ["name", "position", "year", "ovr", "gamesThisSeason", "seasonsPlayed", "remaining", "redshirtAvailable", "academic"],
  nil: ["name", "position", "year", "ovr", "morale", "transferRisk"],
  development: ["name", "position", "year", "ovr", "pot", "devCurve", "potentialGrade", "developmentFocus"],
};

function ensureRosterUiState() {
  if (!isRecord(window.CGM_UI_STATE)) window.CGM_UI_STATE = {};
  const ui = window.CGM_UI_STATE;
  if (!isRecord(ui.roster)) ui.roster = {};
  if (!ui.roster.tab) ui.roster.tab = "players";
  if (!ui.roster.view) ui.roster.view = "general";
  if (!ui.roster.posFilter) ui.roster.posFilter = "all";
  if (!ui.roster.classFilter) ui.roster.classFilter = "all";
  if (typeof ui.roster.search !== "string") ui.roster.search = "";
  if (!Array.isArray(ui.roster.sort)) ui.roster.sort = [{ colId: "ovr", direction: "desc" }];
  if (!Array.isArray(ui.roster.visibleColumns) || !ui.roster.visibleColumns.length) ui.roster.visibleColumns = (ROSTER_VIEW_PRESETS[ui.roster.view] || []).slice();
  if (!Array.isArray(ui.roster.savedViews)) ui.roster.savedViews = [];
  return ui.roster;
}

function applyVisibleColumns(columns, visibleColumns) {
  if (!Array.isArray(visibleColumns) || !visibleColumns.length) return columns;
  const allowed = new Set(visibleColumns);
  const filtered = columns.filter((col) => allowed.has(col.id));
  return filtered.length ? filtered : columns;
}

function cycleVisibleColumns(state, presetsMap) {
  const presets = Object.values(presetsMap).filter(Array.isArray);
  const current = JSON.stringify(state.visibleColumns || []);
  const idx = presets.findIndex((p) => JSON.stringify(p) == current);
  state.visibleColumns = (presets[(idx + 1) % presets.length] || presets[0] || []).slice();
  persistUiState();
}

function saveCurrentView(state, name, keys) {
  if (!Array.isArray(state.savedViews)) state.savedViews = [];
  const safeName = (name || '').trim().slice(0, 40);
  if (!safeName) return false;
  const record = {};
  keys.forEach((key) => {
    const value = state[key];
    record[key] = Array.isArray(value)
      ? value.map((entry) => (isRecord(entry) ? { ...entry } : entry))
      : isRecord(value)
        ? { ...value }
        : value;
  });
  record.name = safeName;
  state.savedViews = [record, ...state.savedViews.filter((v) => v.name !== safeName)].slice(0, 8);
  persistUiState();
  return true;
}

function renderSavedViewControl(savedViews, dataAttr, placeholder) {
  const helper = window.CGM_SAVED_VIEWS;
  if (helper && typeof helper.renderSavedViewSelect === "function") {
    return helper.renderSavedViewSelect(savedViews, dataAttr, placeholder);
  }
  return "";
}

function applySavedViewState(targetState, savedView) {
  const helper = window.CGM_SAVED_VIEWS;
  if (helper && typeof helper.applySavedView === "function") {
    return helper.applySavedView(targetState, savedView);
  }
  if (!isRecord(targetState) || !isRecord(savedView)) return false;
  Object.keys(savedView).forEach((key) => {
    if (key === "name") return;
    targetState[key] = Array.isArray(savedView[key]) ? savedView[key].slice() : savedView[key];
  });
  return true;
}

function renderSimpleWorkspaceTable(rows, options = {}) {
  const helper = window.CGM_WORKSPACE_TABLE;
  if (helper && typeof helper.renderSimpleWorkspaceTable === "function") {
    return helper.renderSimpleWorkspaceTable(rows, options);
  }
  const DG = window.CGM_DATAGRID;
  if (!DG) return table(rows || []);
  const source = Array.isArray(rows) ? rows : [];
  if (!source.length || source.length < 2) return `<div class="table-list"><div class="table-row"><span>${options.emptyMessage || "No data"}</span></div></div>`;
  const [headerRow, ...bodyRows] = source;
  const columns = headerRow.map((label, index) => ({
    id: `c${index}`,
    label: String(label),
    accessor: (row) => row[`c${index}`],
    sortable: false,
  }));
  const dataRows = bodyRows.map((row, rowIndex) => {
    const record = { _id: `${options.keyPrefix || "row"}-${rowIndex}` };
    headerRow.forEach((_, cellIndex) => {
      record[`c${cellIndex}`] = Array.isArray(row) ? (row[cellIndex] ?? "") : "";
    });
    return record;
  });
  return DG.renderDataGrid({
    columns,
    rows: dataRows,
    rowKey: (row) => row._id,
    emptyMessage: options.emptyMessage || "No data",
  });
}

function rosterColumnsForView(view) {
  const DG = window.CGM_DATAGRID;
  if (!DG) return [];
  const baseCols = [
    { id: "name", label: "Name", accessor: (r) => r.name, width: 180 },
    { id: "position", label: "Pos", accessor: (r) => r.position, width: 56, align: "center" },
    { id: "year", label: "Class", accessor: (r) => r.year, width: 64, align: "center" },
  ];
  if (view === "attributes") {
    return [
      ...baseCols,
      { id: "ovr", label: "OVR", accessor: (r) => r.ovr, cellType: "rating", width: 60 },
      { id: "pot", label: "POT", accessor: (r) => r.pot, cellType: "rating", width: 60 },
      { id: "throwing", label: "Throw", accessor: (r) => r.attrs && r.attrs.throwing, width: 64 },
      { id: "decisions", label: "Dec", accessor: (r) => r.attrs && r.attrs.decisions, width: 64 },
      { id: "pace", label: "Pace", accessor: (r) => r.attrs && r.attrs.pace, width: 64 },
      { id: "strength", label: "Str", accessor: (r) => r.attrs && r.attrs.strength, width: 64 },
      { id: "agility", label: "Agi", accessor: (r) => r.attrs && r.attrs.agility, width: 64 },
      { id: "tackling", label: "Tkl", accessor: (r) => r.attrs && r.attrs.tackling, width: 64 },
      { id: "coverage", label: "Cov", accessor: (r) => r.attrs && r.attrs.coverage, width: 64 },
    ];
  }
  if (view === "eligibility") {
    return [
      ...baseCols,
      { id: "ovr", label: "OVR", accessor: (r) => r.ovr, cellType: "rating", width: 60 },
      { id: "gamesThisSeason", label: "GP", accessor: (r) => r.eligibility && r.eligibility.gamesPlayedThisSeason, width: 60, align: "center" },
      { id: "seasonsPlayed", label: "Seasons", accessor: (r) => r.eligibility && r.eligibility.seasonsPlayed, width: 80 },
      { id: "remaining", label: "Remaining", accessor: (r) => r.eligibility && r.eligibility.remainingSeasons, width: 100 },
      { id: "redshirtAvailable", label: "RS Avail", accessor: (r) => (r.eligibility && r.eligibility.redshirtUsed) ? "N" : "Y", cellType: "badge", width: 90,
        badgeMap: { "Y": "good", "N": "warning" } },
      { id: "academic", label: "Academic", accessor: (r) => r.academicStatus, width: 130 },
    ];
  }
  if (view === "nil") {
    return [
      ...baseCols,
      { id: "ovr", label: "OVR", accessor: (r) => r.ovr, cellType: "rating", width: 60 },
      { id: "morale", label: "Morale", accessor: (r) => r.morale, cellType: "badge", width: 100,
        badgeMap: { "High": "good", "Stable": "info", "Low": "warning" } },
      { id: "transferRisk", label: "Risk", accessor: (r) => r.transferRisk, cellType: "badge", width: 100,
        badgeMap: { "Low": "good", "Medium": "warning", "High": "critical" } },
    ];
  }
  if (view === "development") {
    return [
      ...baseCols,
      { id: "ovr", label: "OVR", accessor: (r) => r.ovr, cellType: "rating", width: 60 },
      { id: "pot", label: "POT", accessor: (r) => r.pot, cellType: "rating", width: 60 },
      { id: "devCurve", label: "Curve", accessor: (r) => r.devCurve, width: 140 },
      { id: "potentialGrade", label: "Ceiling", accessor: (r) => r.potentialGrade, width: 160 },
      { id: "developmentFocus", label: "Focus", accessor: (r) => r.developmentFocus, width: 110 },
    ];
  }
  // general view (default)
  return [
    ...baseCols,
    { id: "ovr", label: "OVR", accessor: (r) => r.ovr, cellType: "rating", width: 60 },
    { id: "pot", label: "POT", accessor: (r) => r.pot, cellType: "rating", width: 60 },
    { id: "morale", label: "Morale", accessor: (r) => r.morale, cellType: "badge", width: 100,
      badgeMap: { "High": "good", "Stable": "info", "Low": "warning" } },
    { id: "transferRisk", label: "Risk", accessor: (r) => r.transferRisk, cellType: "badge", width: 100,
      badgeMap: { "Low": "good", "Medium": "warning", "High": "critical" } },
    { id: "redshirtIntent", label: "Eligibility", accessor: (r) => r.redshirtIntent, width: 110 },
    { id: "devCurve", label: "Dev", accessor: (r) => r.devCurve, width: 130, sortable: false },
  ];
}

function rosterFilterControls(state) {
  const positions = ["all","QB","HB","WR","TE","LT","OT","OG","C","EDGE","DE","DT","LB","CB","S","K","P","LS"];
  const classes = ["all","FR","SO","JR","SR","GR"];
  const posOpts = positions.map((p) => `<option value="${p}" ${p === state.posFilter ? "selected" : ""}>${p === "all" ? "All Pos" : p}</option>`).join("");
  const classOpts = classes.map((c) => `<option value="${c}" ${c === state.classFilter ? "selected" : ""}>${c === "all" ? "All Class" : c}</option>`).join("");
  const viewOpts = ROSTER_VIEWS.map((v) => `<option value="${v.id}" ${v.id === state.view ? "selected" : ""}>${v.label}</option>`).join("");
  const savedViewSelect = renderSavedViewControl(state.savedViews, "roster", "Load Saved View");
  return [
    `<select data-roster-control="view">${viewOpts}</select>`,
    `<select data-roster-control="pos">${posOpts}</select>`,
    `<select data-roster-control="class">${classOpts}</select>`,
    `<input type="search" placeholder="Search players" value="${state.search.replace(/"/g, "&quot;")}" data-roster-control="search" />`,
    savedViewSelect,
  ].filter(Boolean);
}

function rosterPlayerInspector(player) {
  const DG = window.CGM_DATAGRID;
  if (!player) {
    const bench = players().filter((p) => p.transferRisk === "High").slice(0, 3);
    const manualWatch = ensurePlayerWatchlistState().slice(0, 4);
    const watchRows = [
      ...manualWatch.map((entry) => `<div class="data-row"><span>${entry.position} ${entry.name}</span><span class="inspector-badge info">Watch</span></div>`),
      ...bench.filter((p) => !manualWatch.some((entry) => entry.playerId === p.id)).slice(0, Math.max(0, 4 - manualWatch.length)).map((p) => `<div class="data-row"><span>${p.position} ${p.name}</span><span class="inspector-badge danger">High</span></div>`),
    ];
    const watchList = watchRows.length
      ? watchRows.join("")
      : `<p style="color:var(--text-muted);font-size:var(--text-sm)">No high-risk players right now.</p>`;
    return DG.renderInspector({
      title: "Roster Snapshot",
      sub: "No player selected",
      sections: [
        { label: "Top Concern", html: '<p>Select a player to see their staff briefing, traits, and quick actions.</p>' },
        { label: "Transfer Watch", html: `<div class="data-list">${watchList}</div>` },
      ],
    });
  }
  const moraleScore = (data.cultureState && data.cultureState.moraleScores && data.cultureState.moraleScores[player.id]) || 60;
  const promise = (data.cultureState && data.cultureState.promiseLedger && data.cultureState.promiseLedger[player.id]) || "Rotation";
  const clusters = window.deriveTraitClusters ? window.deriveTraitClusters(player, 1.0) : [];
  const traitChips = (clusters || []).slice(0, 4).map((c) => {
    const cls = c.pos === true ? "good" : c.pos === false ? "danger" : "info";
    return `<span class="inspector-badge ${cls}">${c.label}</span>`;
  }).join(" ") || `<span class="inspector-badge info">No labels yet</span>`;
  const moraleBadge = moraleScore >= 75 ? "good" : moraleScore >= 55 ? "info" : "warning";
  const riskBadge = player.transferRisk === "High" ? "danger" : player.transferRisk === "Medium" ? "warning" : "good";
  // PORTAL-2 deeper: when CGM_PORTAL_V2 is loaded, derive a 17-term risk profile
  // from the player's morale + role context. Surfaces in a new Inspector section.
  const richRisk = computeRichTransferRisk(player);
  const psaBook = data.seasonState && data.seasonState.seasonPlayerBook;
  let statLine = "";
  if (psaBook) {
    const pass = psaBook.passers && psaBook.passers[player.id];
    const rush = psaBook.rushers && psaBook.rushers[player.id];
    const rec = psaBook.receivers && psaBook.receivers[player.id];
    if (pass && pass.att > 0) statLine = `<dt>Passing</dt><dd>${pass.comp}/${pass.att} · ${pass.yards} yds · ${pass.td} TD</dd>`;
    else if (rush && rush.att > 0) statLine = `<dt>Rushing</dt><dd>${rush.att} att · ${rush.yards} yds · ${rush.td} TD</dd>`;
    else if (rec && rec.tgt > 0) statLine = `<dt>Receiving</dt><dd>${rec.rec}/${rec.tgt} · ${rec.yards} yds · ${rec.td} TD</dd>`;
  }
  return DG.renderInspector({
    title: `${player.position} · ${player.name}`,
    sub: `${player.year} · OVR ${player.ovr} · Ceiling ${player.potentialGrade || "—"}`,
    sections: [
      { label: "Staff Brief", html: `<p>${player.archetype || "Roster contributor"} · ${player.devCurve || "Steady developer"}.</p>` },
      { label: "Trait Labels", html: traitChips },
      { label: "Status", html:
        `<dl class="inspector-meta">
          <dt>Morale</dt><dd><span class="inspector-badge ${moraleBadge}">${player.morale || "—"} · ${moraleScore}</span></dd>
          <dt>Transfer Risk</dt><dd><span class="inspector-badge ${riskBadge}">${player.transferRisk || "—"}</span></dd>
          <dt>Promise</dt><dd>${promise}</dd>
          <dt>Dev Focus</dt><dd>${player.developmentFocus || "—"}</dd>
          ${statLine}
        </dl>`,
      },
      ...(richRisk ? [{
        label: "Why They Might Leave",
        html: `<div class="risk-detail risk-${richRisk.riskBand}">
          <div class="risk-score-row"><span class="risk-band">${richRisk.bandLabel}</span><span class="risk-score">${richRisk.transferRisk}</span></div>
          <div class="risk-reasons">${richRisk.mainReasons.map((c) =>
            `<span class="risk-reason">${c.replace(/_/g, " ")}</span>`).join("") || '<span class="muted">No active risk factors</span>'}</div>
        </div>`,
      }] : []),
    ],
    actions: [
      { label: "Open Profile", action: "open-player", primary: true },
      { label: "Compare", action: "compare-player" },
      { label: "Meet With Player", action: "meet-player" },
      { label: "Set Dev Focus", action: "set-dev" },
      { label: isPlayerWatched(player.id) ? "Remove Watch" : "Add Watch", action: "add-watch" },
      { label: "View Stats", action: "view-stats" },
    ],
  });
}

function renderRosterWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  const state = ensureRosterUiState();
  const allPlayers = players();
  const cols = applyVisibleColumns(rosterColumnsForView(state.view), state.visibleColumns);
  // Filter data per state.
  const filters = [];
  if (state.posFilter && state.posFilter !== "all") filters.push({ colId: "position", value: state.posFilter });
  if (state.classFilter && state.classFilter !== "all") filters.push({ colId: "year", value: state.classFilter });
  if (state.search) filters.push({ colId: "_search", value: state.search });
  const myProgram = programById(career.programId);
  const phaseLabel = (currentEvent() && currentEvent().phase) || "Preseason";
  const seasonYear = currentSeasonYear();
  const totalPlayers = allPlayers.length;
  const highRisk = allPlayers.filter((p) => p.transferRisk === "High").length;
  const morale = data.cultureState && data.cultureState.moraleScores
    ? Math.round(Object.values(data.cultureState.moraleScores).reduce((s, v) => s + v, 0) / Math.max(1, Object.keys(data.cultureState.moraleScores).length))
    : 60;
  const moraleLabel = morale >= 75 ? "Strong" : morale >= 55 ? "Stable" : "Low";

  const injuries = allPlayers.filter((p) => p.injuryStatus && p.injuryStatus !== "Healthy").length;
  const header = DG.renderObjectHeader({
    title: "Roster Room",
    sub: `${myProgram.shortName} · ${seasonYear} ${phaseLabel}`,
    meta: [
      { label: "Players", value: String(totalPlayers), openView: "roster" },
      { label: "Transfer Watch", value: String(highRisk), openView: "portal" },
      { label: "Team Vibe", value: moraleLabel, openView: "home" },
      { label: "Injuries", value: String(injuries), openView: "schedule" },
    ],
  });
  const tabs = DG.renderTabBar({ tabs: [
    { id: "players", label: "Players" },
    { id: "depth", label: "Depth Chart" },
    { id: "eligibility", label: "Eligibility" },
    { id: "development", label: "Development" },
    { id: "morale", label: "Morale" },
    { id: "nil", label: "NIL" },
    { id: "transfer", label: "Transfer Risk" },
    { id: "reports", label: "Reports" },
  ], activeId: state.tab, dataAttr: "roster-tab" });
  const actions = DG.renderActionBar({
    groups: [
      { controls: rosterFilterControls(state) },
      { controls: ['<button data-roster-action="compare">Compare</button>', '<button data-roster-action="columns">Columns</button>', '<button data-roster-action="save-view">Save View</button>', '<button data-roster-action="ask-staff">Ask Staff</button>', '<button data-roster-action="export">Export</button>'] },
    ],
  });
  const dgHtml = DG.renderDataGrid({
    columns: cols,
    rows: allPlayers,
    rowKey: (r) => r.id,
    selectedId: selectedPlayerId,
    sort: state.sort,
    filters,
    emptyMessage: "No players match the current filter.",
    dataAttr: "roster-row",
  });
  const selected = selectedPlayerId ? findPlayer(selectedPlayerId) : null;
  const inspector = rosterPlayerInspector(selected);
  const status = `<strong>${allPlayers.length}</strong> on roster · <strong>${ROSTER_VIEWS.find((v) => v.id === state.view).label}</strong> view · <strong>${selected ? selected.name : "none"}</strong> selected`;
  return DG.renderTableWorkspace({ header, tabs, actions, dataGrid: dgHtml, inspector, status });
}

// ── UI-RESCUE-1: Recruiting workspace ─────────────────────────────────────
const RECRUITING_TABS = [
  { id: "board", label: "Board" },
  { id: "search", label: "Search" },
  { id: "watchlist", label: "Watchlist" },
  { id: "committed", label: "Committed" },
  { id: "pipeline", label: "Pipeline" },
];
const RECRUITING_VIEW_PRESETS = {
  board: ["name", "position", "state", "stars", "rank", "yourEval", "confidence", "interest", "relationship", "nil", "risk"],
  fit: ["name", "position", "stars", "interest", "playingTimeFit", "developmentFit", "schemeFit", "staff"],
  contact: ["name", "position", "stars", "interest", "relationship", "staff", "lastContact", "status", "risk"],
};

function ensureRecruitingUiState() {
  if (!isRecord(window.CGM_UI_STATE)) window.CGM_UI_STATE = {};
  const ui = window.CGM_UI_STATE;
  if (!isRecord(ui.recruiting)) ui.recruiting = {};
  if (!ui.recruiting.tab) ui.recruiting.tab = "board";
  if (!ui.recruiting.posFilter) ui.recruiting.posFilter = "all";
  if (!ui.recruiting.starsFilter) ui.recruiting.starsFilter = "all";
  if (!ui.recruiting.statusFilter) ui.recruiting.statusFilter = "all";
  if (typeof ui.recruiting.search !== "string") ui.recruiting.search = "";
  if (!Array.isArray(ui.recruiting.sort)) ui.recruiting.sort = [{ colId: "interest", direction: "desc" }];
  if (!Array.isArray(ui.recruiting.visibleColumns) || !ui.recruiting.visibleColumns.length) ui.recruiting.visibleColumns = RECRUITING_VIEW_PRESETS.board.slice();
  if (!Array.isArray(ui.recruiting.savedViews)) ui.recruiting.savedViews = [];
  return ui.recruiting;
}

function recruitingControls(state) {
  const positions = ["all","QB","HB","WR","TE","OT","EDGE","DT","LB","CB","S"];
  const stars = ["all","5","4","3","2"];
  const statuses = ["all","Open","Committed","Committed Elsewhere","Offered"];
  const posOpts = positions.map((p) => `<option value="${p}" ${p === state.posFilter ? "selected" : ""}>${p === "all" ? "All Pos" : p}</option>`).join("");
  const starOpts = stars.map((s) => `<option value="${s}" ${s === state.starsFilter ? "selected" : ""}>${s === "all" ? "All Stars" : `${s}★`}</option>`).join("");
  const statusOpts = statuses.map((s) => `<option value="${s}" ${s === state.statusFilter ? "selected" : ""}>${s === "all" ? "All Status" : s}</option>`).join("");
  const savedViewSelect = renderSavedViewControl(state.savedViews, "recruiting", "Load Saved View");
  return [
    `<select data-recruiting-control="pos">${posOpts}</select>`,
    `<select data-recruiting-control="stars">${starOpts}</select>`,
    `<select data-recruiting-control="status">${statusOpts}</select>`,
    `<input type="search" placeholder="Search prospects" value="${state.search.replace(/"/g, "&quot;")}" data-recruiting-control="search" />`,
    savedViewSelect,
  ].filter(Boolean);
}

function recruitingProspectInspector(prospect) {
  const DG = window.CGM_DATAGRID;
  const REC = window.CGM_RECRUITING_V2;
  if (!prospect) {
    const board = (data.prospectProfiles || []).filter((p) => (p.classYear === "HS_SR" || p.classYear === "HS SR"));
    const top = board.sort((a, b) => (b.interest || 0) - (a.interest || 0)).slice(0, 4);
    const list = top.map((p) =>
      `<div class="data-row"><span>${p.position} ${p.name}</span><span class="inspector-badge info">${p.interest || 0}</span></div>`
    ).join("") || `<p style="color:var(--text-muted);font-size:var(--text-sm)">No HS seniors on the board.</p>`;
    return DG.renderInspector({
      title: "Recruiting Snapshot",
      sub: "No prospect selected",
      sections: [
        { label: "Top Concern", html: '<p>Select a prospect to see their suitor board, hidden traits, and quick recruiting actions.</p>' },
        { label: "Top Senior Targets", html: `<div class="data-list">${list}</div>` },
      ],
    });
  }
  const us = (prospect.suitors || []).find((s) => s.schoolId === career.programId);
  const board = REC ? REC.leaderboardForProspect(prospect) : [];
  const leader = board[0];
  const youAreLeader = leader && leader.schoolId === career.programId;
  const leaderBadge = youAreLeader ? "good" : leader ? "warning" : "info";
  const leaderText = leader ? `${leader.schoolName} · ${leader.interest}` : "No suitors yet";
  const top3 = board.slice(0, 3).map((s) => {
    const cls = s.schoolId === career.programId ? "good" : "info";
    return `<div class="data-row"><span>${s.schoolName}</span><span class="inspector-badge ${cls}">${s.interest}</span></div>`;
  }).join("");
  // AI-NIL-1 (live): pull recent rival NIL bids on this prospect from the
  // event log so the player sees competitive pressure as it happens.
  const rivalBidsHtml = rivalNilBidsForProspect(prospect, 4);
  return DG.renderInspector({
    title: `${prospect.position} · ${prospect.name}`,
    sub: `${prospect.stars} · ${prospect.classYear || "HS"} · ${prospect.pipeline || "Region n/a"}`,
    sections: [
      { label: "Profile Summary", html: `<p><span class="inspector-badge ${leaderBadge}">${youAreLeader ? "Leading" : "Trailing"}</span> · Leader: ${leaderText}</p>` },
      { label: "Trait Labels", html: `<div class="data-list"><div class="data-row"><span>${prospect.archetype || "National target"}</span><span>${prospect.devCurve || "Steady"}</span></div></div>` },
      { label: "Why He Likes Us", html: `<p>${prospect.pitchSummary || `Need fit ${prospect.needFit || "—"}, relationship ${us ? us.interest : (prospect.interest || 0)}, and regional comfort are carrying the profile.`}</p>` },
      { label: "Why He Hesitates", html: `<p>${prospect.hesitationSummary || `Competition pressure from ${leader ? leader.schoolName : "the field"} and NIL expectations remain the main reasons this one is not closed yet.`}</p>` },
      { label: "Top Competitors", html: `<div class="data-list">${top3 || `<p style="color:var(--text-muted);font-size:var(--text-sm)">No suitors yet.</p>`}</div>` },
      ...(rivalBidsHtml ? [{ label: "Rival NIL Bids", html: rivalBidsHtml }] : []),
      { label: "Staff Recommendation", html: `<p>${prospect.staffRecommendation || "Keep pressure on with contact cadence, assign the best relationship coach, and line up a visit if the board stays warm."}</p>` },
      { label: "Reason Codes", html:
        `<dl class="inspector-meta">
          <dt>Stars</dt><dd>${prospect.stars}</dd>
          <dt>Your Eval</dt><dd>${prospect.grade || "—"}</dd>
          <dt>Confidence</dt><dd>${prospect.scoutedLow || "?"}–${prospect.scoutedHigh || "?"}</dd>
          <dt>Need Fit</dt><dd>${prospect.needFit || "—"}</dd>
          <dt>Interest</dt><dd>${us ? us.interest : (prospect.interest || 0)}</dd>
          <dt>Status</dt><dd>${prospect.commitmentStatus || "Open"}</dd>
        </dl>`,
      },
    ],
    actions: [
      { label: "Open Profile", action: "open-prospect", primary: true },
      { label: "Contact", action: "contact-prospect" },
      { label: "Assign Scout", action: "scout-prospect" },
      { label: "Offer", action: "offer-prospect" },
      { label: "Schedule Visit", action: "schedule-visit" },
      { label: "Make Pitch", action: "make-pitch" },
      { label: "Compare", action: "compare-prospect" },
      { label: "Add Watch", action: "watch-prospect" },
    ],
  });
}

function rivalNilBidsForProspect(prospect, limit) {
  const log = ensureEventLog();
  if (!log) return "";
  const max = Number(limit) || 4;
  const bids = log.events.filter((e) =>
    e.category === "nil_bid" && Array.isArray(e.subjectIds) && e.subjectIds.includes(prospect.id)
  ).slice(-max).reverse();
  if (!bids.length) return "";
  return `<div class="bid-stream">${bids.map((b) =>
    `<div class="bid-row"><span class="bid-school">${b.actorName || b.actorId}</span><span class="bid-amount">${(b.summary || "").match(/\$([\d.]+)M/) ? "$" + (b.summary.match(/\$([\d.]+)M/)[1]) + "M" : "—"}</span><span class="bid-week">Wk ${b.week || "—"}</span></div>`
  ).join("")}</div>`;
}

function renderRecruitingWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  const REC = window.CGM_RECRUITING_V2;
  ensureProspectSuitors && ensureProspectSuitors();
  const state = ensureRecruitingUiState();
  const myProgram = programById(career.programId);
  const phaseLabel = (currentEvent() && currentEvent().phase) || "Preseason";
  const recruitingOpen = !/preseason/i.test(phaseLabel);
  const allProspects = recruitingOpen ? (data.prospectProfiles || []) : [];

  // Filter: tab + UI controls
  let visible = allProspects.slice();
  if (state.tab === "watchlist") visible = visible.filter((p) => p.priority === "Tier 1");
  else if (state.tab === "committed") visible = visible.filter((p) => p.commitmentStatus && p.commitmentStatus.startsWith("Committed"));
  else if (state.tab === "pipeline") visible = visible.filter((p) => p.classYear !== "HS_SR" && p.classYear !== "HS SR");
  // board / search default: keep all
  if (state.posFilter !== "all") visible = visible.filter((p) => p.position === state.posFilter);
  if (state.starsFilter !== "all") visible = visible.filter((p) => String(p.stars || "").charAt(0) === state.starsFilter);
  if (state.statusFilter !== "all") visible = visible.filter((p) => (p.commitmentStatus || "Open") === state.statusFilter);
  if (state.search) {
    const q = state.search.toLowerCase();
    visible = visible.filter((p) => (p.name || "").toLowerCase().includes(q) || (p.position || "").toLowerCase().includes(q));
  }

  const cols = applyVisibleColumns([
    { id: "name", label: "Name", accessor: (r) => r.name, width: 180 },
    { id: "position", label: "Pos", accessor: (r) => r.position, width: 56, align: "center" },
    { id: "state", label: "State", accessor: (r) => r.homeState || r.pipeline || "—", width: 90 },
    { id: "stars", label: "Stars", accessor: (r) => r.stars, width: 70,
      formatter: (v) => {
        const n = parseInt(String(v).replace(/[^0-9]/g, ""), 10);
        if (!n) return v || "—";
        return `<span style="color:var(--accent);letter-spacing:1px">${"★".repeat(n)}</span><span style="color:var(--text-muted);letter-spacing:1px">${"☆".repeat(Math.max(0, 5 - n))}</span>`;
      } },
    { id: "rank", label: "Rank", accessor: (r) => r.rank || r.grade || "—", width: 70 },
    { id: "yourEval", label: "Your Eval", accessor: (r) => r.grade, cellType: "rating", width: 70 },
    { id: "confidence", label: "Confidence", accessor: (r) => r.scoutedHigh && r.scoutedLow ? Math.max(1, 100 - ((r.scoutedHigh - r.scoutedLow) * 7)) : 20, cellType: "rating", width: 90 },
    { id: "interest", label: "Interest", accessor: (r) => {
        const us = (r.suitors || []).find((s) => s.schoolId === career.programId);
        return us ? us.interest : (r.interest || 0);
      }, cellType: "rating", width: 80 },
    { id: "relationship", label: "Relationship", accessor: (r) => r.relationship || r.needFit || "—", width: 100 },
    { id: "nil", label: "NIL", accessor: (r) => r.nilPriority || r.nilAsk || "—", width: 80 },
    { id: "playingTimeFit", label: "PT Fit", accessor: (r) => r.playingTimeFit || r.needFit || "—", width: 80 },
    { id: "developmentFit", label: "Dev Fit", accessor: (r) => r.developmentFit || "—", width: 80 },
    { id: "schemeFit", label: "Scheme", accessor: (r) => r.schemeFit || "—", width: 90 },
    { id: "staff", label: "Staff", accessor: (r) => r.staffLead || "Board", width: 90 },
    { id: "lastContact", label: "Last Contact", accessor: (r) => r.lastContact || "—", width: 110 },
    { id: "risk", label: "Risk", accessor: (r) => r.flipRisk || "—", width: 70 },
  ], state.visibleColumns);

  const ap = recruitingActionPoints();
  const maxAp = data.recruitingState && data.recruitingState.maxActionPoints || 7;
  const committed = allProspects.filter((p) => p.committedToUs).length;
  const onBoard = allProspects.filter((p) => {
    const us = (p.suitors || []).find((s) => s.schoolId === career.programId);
    return us && us.interest >= 30;
  }).length;
  const seasonYear = currentSeasonYear();

  const visitsScheduled = visible.filter((p) => p.visitScheduled || p.officialVisitScheduled).length;
  const header = DG.renderObjectHeader({
    title: "Recruiting Room",
    sub: `${seasonYear + 4} Class · ${myProgram.shortName}`,
    meta: [
      { label: "Targets", value: String(onBoard), openView: "recruiting" },
      { label: "Action Pts", value: `${ap}/${maxAp}`, openView: "recruiting" },
      { label: "Class Rank", value: `#${career.generatedProfile && career.generatedProfile.recruitingClass || "—"}`, openView: "home" },
      { label: "Visits", value: String(visitsScheduled), openView: "recruiting" },
    ],
  });
  const tabs = DG.renderTabBar({ tabs: [
    { id: "board", label: "Board" },
    { id: "search", label: "Search" },
    { id: "needs", label: "Needs" },
    { id: "visits", label: "Visits" },
    { id: "offers", label: "Offers" },
    { id: "committed", label: "Commitments" },
    { id: "competitors", label: "Competitors" },
    { id: "staff", label: "Staff" },
    { id: "analytics", label: "Analytics" },
  ], activeId: state.tab, dataAttr: "recruiting-tab" });
  const actions = DG.renderActionBar({
    groups: [
      { controls: recruitingControls(state) },
      { controls: ['<button data-recruiting-action="assign-scout">Assign Scout</button>', '<button data-recruiting-action="columns">Columns</button>', '<button data-recruiting-action="save-view">Save View</button>', '<button data-recruiting-action="ask-staff">Ask Staff</button>'] },
    ],
  });
  const dgHtml = DG.renderDataGrid({
    columns: cols, rows: visible, rowKey: (r) => r.id,
    selectedId: selectedProspectId, sort: state.sort,
    emptyMessage: recruitingOpen
      ? "No prospects match the current filters."
      : "Recruiting board opens after preseason. Use this time to review roster needs, portal risk, and staff priorities.",
    dataAttr: "recruiting-row",
  });
  const selected = selectedProspectId ? findProspect(selectedProspectId) : null;
  const inspector = recruitingProspectInspector(selected);
  const status = recruitingOpen
    ? `<strong>${visible.length}</strong> shown · <strong>${onBoard}</strong> on board · <strong>${committed}</strong> committed · <strong>${selected ? selected.name : "none"}</strong> selected`
    : `<strong>Preseason hold</strong> · Recruiting board is intentionally blank before in-season scouting opens`;
  return DG.renderTableWorkspace({ header, tabs, actions, dataGrid: dgHtml, inspector, status });
}

// ── UI-RESCUE-1: Portal workspace ──────────────────────────────────────────
const PORTAL_TABS = [
  { id: "incoming", label: "Incoming" },
  { id: "outgoing", label: "Outgoing Risk" },
  { id: "compliance", label: "Compliance" },
];
function ensurePortalUiState() {
  if (!isRecord(window.CGM_UI_STATE)) window.CGM_UI_STATE = {};
  const ui = window.CGM_UI_STATE;
  if (!isRecord(ui.portal)) ui.portal = { tab: "incoming", sort: [{ colId: "rating", direction: "desc" }] };
  return ui.portal;
}

function renderPortalWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  const state = ensurePortalUiState();
  const myProgram = programById(career.programId);
  const phaseLabel = (currentEvent() && currentEvent().phase) || "Preseason";

  let cols, rows, rowKey, statusText;
  if (state.tab === "outgoing") {
    cols = [
      { id: "position", label: "Pos", accessor: (r) => r[0], width: 64 },
      { id: "name", label: "Player", accessor: (r) => r[1], width: 200 },
      { id: "year", label: "Class", accessor: (r) => r[2], width: 70 },
      { id: "risk", label: "Risk", accessor: (r) => r[3], cellType: "badge", width: 100,
        badgeMap: { "High": "critical", "Medium": "warning", "Low": "good" } },
      { id: "note", label: "Reason", accessor: (r) => r[4], width: 360, sortable: false },
    ];
    rows = (data.outgoingRisk || []).map((r, i) => ({ _id: `o${i}`, 0: r[0], 1: r[1], 2: r[2], 3: r[3], 4: r[4] }));
    rowKey = (r) => r._id;
    const ap = data.retentionState && data.retentionState.actionPoints || 0;
    const maxAp = data.retentionState && data.retentionState.maxActionPoints || 4;
    statusText = `<strong>${rows.length}</strong> at risk · Retention AP <strong>${ap}/${maxAp}</strong>`;
  } else if (state.tab === "compliance") {
    return DG.renderTableWorkspace({
      header: DG.renderObjectHeader({
        title: "Transfer Portal", sub: `${myProgram.shortName} · ${phaseLabel}`,
        meta: [{ label: "Window", value: portalWindowLabel() }],
      }),
      tabs: DG.renderTabBar({ tabs: PORTAL_TABS, activeId: state.tab, dataAttr: "portal-tab" }),
      actions: DG.renderActionBar({ groups: [{ controls: [] }] }),
      dataGrid: `<div style="padding:var(--space-4)">${portalCompliancePanel()}</div>`,
      inspector: DG.renderInspector({
        title: "Portal Window",
        sub: portalWindowLabel(),
        sections: [{ label: "Strategy", html: portalStrategyMeters() }],
      }),
      status: `Window: ${portalWindowLabel()}`,
    });
  } else {
    cols = [
      { id: "position", label: "Pos", accessor: (r) => r[0], width: 64 },
      { id: "name", label: "Player", accessor: (r) => r[1], width: 200 },
      { id: "year", label: "Class", accessor: (r) => r[2], width: 70 },
      { id: "rating", label: "OVR", accessor: (r) => Number(r[3]), cellType: "rating", width: 70 },
      { id: "status", label: "Status", accessor: (r) => r[4], width: 240, sortable: false },
    ];
    rows = isPortalWindowOpen()
      ? (data.portal || []).map((r, i) => ({ _id: `p${i}`, 0: r[0], 1: r[1], 2: r[2], 3: r[3], 4: r[4] }))
      : [];
    rowKey = (r) => r._id;
    statusText = isPortalWindowOpen()
      ? `<strong>${rows.length}</strong> in portal · ${portalWindowLabel()}`
      : `<strong>Window closed</strong> · Preseason should not show a fresh incoming portal board`;
  }

  const header = DG.renderObjectHeader({
    title: "Transfer Portal",
    sub: `${myProgram.shortName} · ${phaseLabel}`,
    meta: [
      { label: "Window", value: portalWindowLabel(), openView: "portal" },
      { label: "Pending", value: String((data.portalState && data.portalState.pendingAdds && data.portalState.pendingAdds.length) || 0), openView: "portal" },
      { label: "Roster Cap", value: String((data.portalState && data.portalState.rosterLimit) || "—"), openView: "roster" },
    ],
  });
  const tabs = DG.renderTabBar({ tabs: PORTAL_TABS, activeId: state.tab, dataAttr: "portal-tab" });
  const actions = DG.renderActionBar({
    groups: [
      { controls: ['<button data-portal-action-bar="window">Toggle Window Info</button>'] },
    ],
  });
  const dgHtml = DG.renderDataGrid({
    columns: cols, rows, rowKey, sort: state.sort,
    emptyMessage: state.tab === "incoming" && !isPortalWindowOpen()
      ? "Portal window is closed. Prior spring/summer transfers should already be on your roster."
      : "No entries.",
    dataAttr: "portal-row",
  });
  const inspector = DG.renderInspector({
    title: state.tab === "outgoing" ? "Retention Inspector" : "Portal Inspector",
    sub: state.tab === "outgoing" ? "Pick a player to dig into" : portalWindowLabel(),
    sections: [
      { label: "Strategy", html: portalStrategyMeters() },
      { label: "Fast Links", html: `<div class="data-list"><button class="data-row clickable-row" data-open-view="roster"><span>Open roster for cap and risk context</span><span class="rating">Roster</span></button><button class="data-row clickable-row" data-open-view="finance"><span>Open finance for retention pressure</span><span class="rating">NIL</span></button></div>` },
    ],
  });
  return DG.renderTableWorkspace({ header, tabs, actions, dataGrid: dgHtml, inspector, status: statusText });
}

// ── UI-RESCUE-1: Staff workspace ──────────────────────────────────────────
const STAFF_TABS = [
  { id: "coordinators", label: "Coordinators" },
  { id: "position", label: "Position Coaches" },
  { id: "openings", label: "Open Roles" },
  { id: "delegation", label: "Delegation" },
];
function ensureStaffUiState() {
  if (!isRecord(window.CGM_UI_STATE)) window.CGM_UI_STATE = {};
  const ui = window.CGM_UI_STATE;
  if (!isRecord(ui.staff)) ui.staff = { tab: "coordinators", sort: [{ colId: "grade", direction: "desc" }] };
  return ui.staff;
}

function renderStaffWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  const state = ensureStaffUiState();
  const myProgram = programById(career.programId);

  let cols, rows, rowKey;
  if (state.tab === "position") {
    const pcs = (data.positionCoaches || []).filter((c) => c.programId === myProgram.id);
    cols = [
      { id: "name", label: "Coach", accessor: (r) => r.name, width: 220 },
      { id: "role", label: "Role", accessor: (r) => r.role, width: 160 },
      { id: "groups", label: "Dev Groups", accessor: (r) => (r.devGroups || []).join(", "), width: 180, sortable: false },
      { id: "teaching", label: "Teach", accessor: (r) => r.attrs && r.attrs.teaching, cellType: "rating", width: 80 },
      { id: "motivation", label: "Motiv", accessor: (r) => r.attrs && r.attrs.motivation, cellType: "rating", width: 80 },
      { id: "discipline", label: "Disc", accessor: (r) => r.attrs && r.attrs.discipline, cellType: "rating", width: 80 },
    ];
    rows = pcs;
    rowKey = (r) => r.id;
  } else if (state.tab === "openings") {
    const openings = data.staffOpenings || [];
    cols = [
      { id: "role", label: "Open Role", accessor: (r) => r, width: 240 },
      { id: "candidates", label: "Candidates Available", accessor: (r) => (data.staffCandidates && data.staffCandidates[r] || []).length, cellType: "rating", width: 200 },
    ];
    rows = openings.map((r, i) => ({ _id: `op${i}`, role: r, value: r }));
    cols[0].accessor = (r) => r.role;
    cols[1].accessor = (r) => (data.staffCandidates && data.staffCandidates[r.role] || []).length;
    rowKey = (r) => r._id;
  } else if (state.tab === "delegation") {
    const delegationRows = staffDelegationRows();
    const header = delegationRows[0];
    cols = header.map((h, i) => ({ id: `c${i}`, label: h, accessor: (r) => r[i], width: i === 0 ? 130 : 140, sortable: false }));
    rows = delegationRows.slice(1).map((r, i) => ({ _id: `d${i}`, ...r }));
    rowKey = (r) => r._id;
  } else {
    // coordinators
    cols = [
      { id: "role", label: "Role", accessor: (r) => r[0], width: 220 },
      { id: "name", label: "Name", accessor: (r) => r[1], width: 200 },
      { id: "specialty", label: "Specialty", accessor: (r) => r[2], width: 240, sortable: false },
      { id: "grade", label: "Grade", accessor: (r) => r[3], cellType: "badge", width: 80,
        badgeMap: { "A+": "good", "A": "good", "A-": "good", "B+": "info", "B": "info", "B-": "warning", "C+": "warning", "C": "warning" } },
    ];
    rows = (data.staff || []).map((r, i) => ({ _id: `s${i}`, 0: r[0], 1: r[1], 2: r[2], 3: r[3] }));
    rowKey = (r) => r._id;
  }

  const header = DG.renderObjectHeader({
    title: "Staff Room",
    sub: `${myProgram.shortName} · Coaching staff overview`,
    meta: [
      { label: "Coaches", value: String((data.staff || []).length), openView: "staff" },
      { label: "Position", value: String((data.positionCoaches || []).filter((c) => c.programId === myProgram.id).length), openView: "staff" },
      { label: "Open Roles", value: String((data.staffOpenings || []).length), openView: "staff" },
    ],
  });
  const tabs = DG.renderTabBar({ tabs: STAFF_TABS, activeId: state.tab, dataAttr: "staff-tab" });
  const actions = DG.renderActionBar({ groups: [{ controls: [] }] });
  const dgHtml = DG.renderDataGrid({
    columns: cols, rows, rowKey, sort: state.sort,
    emptyMessage: "No staff in this view.",
    dataAttr: "staff-row",
  });
  // STAFF-1 hot-seat status for HC inspector.
  const hotSeat = computeHcHotSeat();
  const hotSeatHtml = hotSeat ? `<div class="hot-seat hot-seat-${hotSeat.band}">
    <div class="hot-seat-header">
      <span class="hot-seat-label">Hot Seat</span>
      <span class="hot-seat-score">${hotSeat.score}</span>
    </div>
    <div class="hot-seat-band">${hotSeat.bandLabel}</div>
    <div class="hot-seat-reasons">${hotSeat.reasonCodes.slice(0, 4).map((c) =>
      `<span class="hot-seat-reason">${c.replace(/_/g, " ")}</span>`).join("")}</div>
  </div>` : "";

  const inspector = DG.renderInspector({
    title: "Head Coach DNA",
    sub: career.coachName || "Coach",
    sections: [
      ...(hotSeatHtml ? [{ label: "Job Security", html: hotSeatHtml }] : []),
      { label: "Profile", html: coachProfilePanel() },
      { label: "Fast Links", html: `<div class="data-list"><button class="data-row clickable-row" data-open-view="development"><span>Open development plans</span><span class="rating">Dev</span></button><button class="data-row clickable-row" data-open-view="recruiting"><span>Open recruiting for staffing impact</span><span class="rating">Rec</span></button></div>` },
    ],
  });
  return DG.renderTableWorkspace({ header, tabs, actions, dataGrid: dgHtml, inspector, status: `${rows.length} in view · ${state.tab}` });
}

// PERSIST-2 v2: dispatch live action handlers through CGM_REPLAY so an entire
// session can be replayed deterministically + hash-verified. This is a
// pass-through wrapper — the live game's mutations still happen as-is, but
// each action is also recorded into a session log + applied to a parallel
// reducer state.
function dispatchToReplay(type, payload) {
  const RP = window.CGM_REPLAY;
  if (!RP || !RP.applyAction) return;
  if (!window.CGM_SESSION_RECORDING) {
    window.CGM_SESSION_RECORDING = {
      seed: career && career.seed || "default",
      startedAt: new Date().toISOString(),
      actions: [],
      replayState: {},
    };
  }
  const rec = window.CGM_SESSION_RECORDING;
  const action = { type, payload, at: career && career.advanceCount, ts: Date.now() };
  rec.actions.push(action);
  // Apply to the parallel reducer state. Failures are ignored silently — the
  // live game doesn't depend on this; it's a verification layer.
  try {
    const result = RP.applyAction(rec.replayState, action);
    if (result.ok && result.state !== undefined) rec.replayState = result.state;
  } catch (e) { /* noop */ }
}

// Expose a small API for a future "Verify Session" UI control.
window.CGM_VERIFY_SESSION = function verifySession() {
  const RP = window.CGM_REPLAY;
  const rec = window.CGM_SESSION_RECORDING;
  if (!RP || !rec) return { ok: false, reason: "no recording or replay module" };
  const SH = window.CGM_STATE_HASH;
  const replay = RP.replay({ initialState: {}, actions: rec.actions });
  const recordedHash = SH.hashState(rec.replayState);
  return {
    ok: replay.finalHash === recordedHash,
    actionsRecorded: rec.actions.length,
    actionsReplayed: replay.applied.length,
    actionsSkipped: replay.skipped.length,
    recordedHash, replayHash: replay.finalHash,
    sessionStarted: rec.startedAt,
  };
};

function tallyCareerStatsForRoster() {
  const ALUMNI = window.CGM_ALUMNI;
  if (!ALUMNI) return;
  const psaBook = data.seasonState && data.seasonState.seasonPlayerBook;
  if (!psaBook) return;
  const seasonYear = currentSeasonYear();
  const myProgram = programById(career.programId);
  (data.playerProfiles || []).forEach((player) => {
    if (player.programId && player.programId !== myProgram.id) return;
    const pass = (psaBook.passers && psaBook.passers[player.id]) || null;
    const rush = (psaBook.rushers && psaBook.rushers[player.id]) || null;
    const rec = (psaBook.receivers && psaBook.receivers[player.id]) || null;
    const def = (psaBook.defenders && psaBook.defenders[player.id]) || null;
    const line = {};
    if (pass && pass.att) {
      line.passing_yards = pass.yards || 0;
      line.passing_tds = pass.td || 0;
      line.passing_ints = pass.ints || 0;
      line.passing_completions = pass.comp || 0;
      line.passing_attempts = pass.att || 0;
    }
    if (rush && rush.att) {
      line.rushing_yards = rush.yards || 0;
      line.rushing_tds = rush.td || 0;
      line.rushing_attempts = rush.att || 0;
    }
    if (rec && rec.tgt) {
      line.receiving_yards = rec.yards || 0;
      line.receiving_rec = rec.rec || 0;
      line.receiving_tds = rec.td || 0;
    }
    if (def) {
      line.tackles = def.tackles || 0;
      line.sacks = def.sacks || 0;
      line.interceptions = def.ints || 0;
    }
    if (Object.keys(line).length) {
      ALUMNI.recordPlayerSeasonStats(player, seasonYear, line);
    }
  });
}

function alumniPanel() {
  const ALUMNI = window.CGM_ALUMNI;
  const archive = data.alumniArchive || [];
  if (!archive.length) {
    return '<p style="color:var(--text-muted);font-size:var(--text-sm);padding:var(--space-3)">No alumni yet. Players who graduate, declare for the draft, or medically retire will be archived here with their full career stats.</p>';
  }
  // Hall of Fame block
  const hof = archive.filter((a) => a.hallOfFameWorthy).sort((a, b) => (b.departureSeason || 0) - (a.departureSeason || 0));
  // Recent departures (last 3 seasons)
  const recent = archive.slice().sort((a, b) => (b.departureSeason || 0) - (a.departureSeason || 0)).slice(0, 12);
  // Career leaderboards
  const topPass = ALUMNI ? ALUMNI.topAlumniByCareerStat(archive, "passing_yards", 5) : [];
  const topRush = ALUMNI ? ALUMNI.topAlumniByCareerStat(archive, "rushing_yards", 5) : [];
  const topRec  = ALUMNI ? ALUMNI.topAlumniByCareerStat(archive, "receiving_yards", 5) : [];

  const reasonLabel = (r) => ({
    drafted: "Drafted", graduated: "Graduated", graduating_senior: "Graduated",
    early_declare: "Early Decl.", early_entry: "Early Entry",
    medical_retire: "Medical Retire", transferred_out: "Transfer Out",
    dismissed: "Dismissed", other: "Other",
  })[r] || r;

  function alumniRow(a) {
    const stats = [];
    if (a.careerTotals.passing_yards) stats.push(`${a.careerTotals.passing_yards} pass yds`);
    if (a.careerTotals.rushing_yards) stats.push(`${a.careerTotals.rushing_yards} rush yds`);
    if (a.careerTotals.receiving_yards) stats.push(`${a.careerTotals.receiving_yards} rec yds`);
    if (a.careerTotals.sacks) stats.push(`${a.careerTotals.sacks} sk`);
    if (a.careerTotals.interceptions) stats.push(`${a.careerTotals.interceptions} INT`);
    return `<div class="alumni-row${a.hallOfFameWorthy ? ' hof' : ''}">
      <span class="alumni-pos">${escapeHtml(a.position || "")}</span>
      <span class="alumni-name">${escapeHtml(a.name || "")}</span>
      <span class="alumni-meta">${a.seasonsPlayed}yr · ${reasonLabel(a.departureReason)} ${a.departureSeason || ""}</span>
      <span class="alumni-stats">${stats.join(" · ") || "—"}</span>
      ${a.draft ? `<span class="alumni-draft">R${a.draft.round}${a.draft.pick ? ` · #${a.draft.pick}` : ""}</span>` : '<span class="alumni-draft"></span>'}
    </div>`;
  }

  function leaderboardBlock(title, stat, list) {
    if (!list.length) return "";
    return `<div class="alumni-leader-block">
      <h4>${title}</h4>
      ${list.map((a, i) =>
        `<div class="alumni-leader-row"><span class="alumni-leader-rank">${i + 1}</span><span class="alumni-leader-name">${escapeHtml(a.name)}</span><span class="alumni-leader-val">${a.careerTotals[stat]}</span></div>`
      ).join("")}
    </div>`;
  }

  return `<div class="alumni-section">
    <div class="alumni-section-header">
      <h3>Hall of Fame Candidates</h3>
      <span class="alumni-count">${hof.length} alumni · ${archive.length} total archived</span>
    </div>
    ${hof.length
      ? `<div class="alumni-list">${hof.slice(0, 10).map(alumniRow).join("")}</div>`
      : '<p style="color:var(--text-muted);font-size:var(--text-sm)">No HOF-worthy alumni yet.</p>'}
  </div>
  <div class="alumni-section">
    <h3>Career Leaderboards</h3>
    <div class="alumni-leaderboards">
      ${leaderboardBlock("Career Passing Yards", "passing_yards", topPass)}
      ${leaderboardBlock("Career Rushing Yards", "rushing_yards", topRush)}
      ${leaderboardBlock("Career Receiving Yards", "receiving_yards", topRec)}
    </div>
  </div>
  <div class="alumni-section">
    <h3>Recent Departures</h3>
    <div class="alumni-list">${recent.map(alumniRow).join("")}</div>
  </div>`;
}

function awardsAndRecordsPanel() {
  const history = data.awardsHistory || [];
  const recordBook = (data.recordBook && data.recordBook.schoolSeason) || {};
  const recordRows = Object.entries(recordBook).sort((a, b) => (b[1].year || 0) - (a[1].year || 0));

  const recordsHtml = recordRows.length
    ? recordRows.map(([key, rec]) =>
        `<div class="record-row">
          <span class="record-label">${escapeHtml(rec.label || key)}</span>
          <span class="record-value">${rec.value}</span>
          <span class="record-holder">${escapeHtml(rec.holder || "—")}</span>
          <span class="record-year">${rec.year || "—"}</span>
        </div>`
      ).join("")
    : '<p style="color:var(--text-muted);font-size:var(--text-sm)">No school records set yet. Play seasons to fill the book.</p>';

  if (!history.length) {
    return `<div class="awards-section">
        <h3 class="awards-section-title">School Records</h3>
        <div class="record-book">${recordsHtml}</div>
      </div>
      <p style="color:var(--text-muted);font-size:var(--text-sm);padding-top:var(--space-3)">No award seasons resolved yet. Awards land at season rollover.</p>`;
  }

  const seasonsHtml = history.slice().reverse().slice(0, 5).map((season) => {
    const winnersHtml = season.ballots.filter((b) => b.winner).map((b) =>
      `<div class="award-row">
        <span class="award-label">${escapeHtml(b.label)}</span>
        <span class="award-winner">${escapeHtml(b.winner.playerName)}${b.winner.position ? ` · ${b.winner.position}` : ""}</span>
        <span class="award-score">${b.winner.score}</span>
      </div>`
    ).join("");
    const allAm = (season.allAmerican || []).slice(0, 12).map((a) =>
      `<span class="all-american-chip">${a.position} ${escapeHtml(a.playerName)}</span>`
    ).join("");
    const breaks = (season.recordBreaks || []).map((br) =>
      `<div class="record-break-row">${escapeHtml(br.label)}: <strong>${br.value}</strong> (${escapeHtml(br.holder)})</div>`
    ).join("");
    return `<div class="awards-season">
      <div class="awards-season-header">${season.season}</div>
      <div class="awards-winners">${winnersHtml}</div>
      ${allAm ? `<div class="all-american-row"><span class="awards-sublabel">All-American:</span> ${allAm}</div>` : ""}
      ${breaks ? `<div class="record-breaks-row"><span class="awards-sublabel">Records broken:</span><div>${breaks}</div></div>` : ""}
    </div>`;
  }).join("");

  return `<div class="awards-section">
    <h3 class="awards-section-title">Season Awards</h3>
    ${seasonsHtml}
  </div>
  <div class="awards-section">
    <h3 class="awards-section-title">School Records</h3>
    <div class="record-book">${recordsHtml}</div>
  </div>`;
}

function resolveSeasonAwardsAndRecords() {
  const A = window.CGM_AWARDS;
  if (!A) return null;
  const myProgram = programById(career.programId);
  // Build per-player season stat lines from the season player accumulator.
  const seasonBook = data.seasonState && data.seasonState.seasonStatBook;
  const psaBook = data.seasonState && data.seasonState.seasonPlayerBook;
  if (!psaBook) return null;
  const players = (data.playerProfiles || []).filter((p) => p.programId === myProgram.id || !p.programId);
  // Map per-player accumulated lines into the awards engine's expected shape.
  const statsByPlayerId = {};
  players.forEach((p) => {
    const pass = (psaBook.passers && psaBook.passers[p.id]) || null;
    const rush = (psaBook.rushers && psaBook.rushers[p.id]) || null;
    const rec = (psaBook.receivers && psaBook.receivers[p.id]) || null;
    const def = (psaBook.defenders && psaBook.defenders[p.id]) || null;
    statsByPlayerId[p.id] = {
      passing_yards: pass ? pass.yards : 0,
      passing_tds: pass ? pass.td : 0,
      passing_ints: pass ? pass.ints : 0,
      rushing_yards: rush ? rush.yards : 0,
      rushing_tds: rush ? rush.td : 0,
      receiving_yards: rec ? rec.yards : 0,
      receiving_rec: rec ? rec.rec : 0,
      receiving_tds: rec ? rec.td : 0,
      sacks: def ? (def.sacks || 0) : 0,
      tackles: def ? (def.tackles || 0) : 0,
      interceptions: def ? (def.ints || 0) : 0,
    };
    p.teamId = p.teamId || myProgram.id;
  });
  // Team win pct
  const split = (career.record || "0-0").split("-").map(Number);
  const wpTotal = (split[0] || 0) + (split[1] || 0);
  const teamWinPct = wpTotal ? split[0] / wpTotal : 0.5;

  const ballotsResult = A.resolveSeasonAwards({
    players, statsByPlayerId,
    teamWinPctByTeamId: { [myProgram.id]: teamWinPct },
    conferenceStrengthByTeamId: { [myProgram.id]: 0.7 },
  });
  const allTeams = A.resolveAllTeams({
    players, statsByPlayerId,
    teamWinPctByTeamId: { [myProgram.id]: teamWinPct },
    conferenceByTeamId: { [myProgram.id]: myProgram.conference },
  });
  // Record breaks
  if (!data.recordBook) data.recordBook = {};
  const breaks = A.detectRecordBreaks({
    recordBook: data.recordBook, statsByPlayerId, players,
    teamId: myProgram.id, seasonYear: currentSeasonYear(),
  });
  A.applyRecordBreaks(data.recordBook, breaks.breaks);

  // Persist
  if (!Array.isArray(data.awardsHistory)) data.awardsHistory = [];
  data.awardsHistory.push({
    season: currentSeasonYear(),
    ballots: ballotsResult.ballots.map((b) => ({
      award: b.award, label: b.label,
      winner: b.winner ? { playerId: b.winner.playerId, playerName: b.winner.playerName, score: b.winner.score, position: b.winner.position } : null,
      finalists: b.finalists.slice(0, 3).map((f) => ({ playerId: f.playerId, playerName: f.playerName, score: f.score })),
    })),
    allConference: allTeams.allConference,
    allAmerican: allTeams.allAmerican,
    recordBreaks: breaks.breaks,
  });
  // Emit events for each award won + record broken.
  ballotsResult.ballots.forEach((b) => {
    if (!b.winner) return;
    const teamMatches = b.winner.teamId === myProgram.id || !b.winner.teamId;
    if (!teamMatches) return; // for now only fire on player's own team awards
    logEvent({
      category: "award_won",
      severity: b.award === "poty" || b.award === "coy" ? "historic" : "major",
      actorId: career.programId,
      actorName: myProgram.shortName,
      subjectIds: [b.winner.playerId],
      summary: `${b.label}: ${b.winner.playerName}`,
      reasonCodes: ["award_won", `award_${b.award}`, ...(b.winner.reasonCodes || [])],
    });
    // ARCHIVE-1: stamp the award onto the player's careerStats for HOF gating.
    if (window.CGM_ALUMNI) {
      const winnerPlayer = (data.playerProfiles || []).find((p) => p.id === b.winner.playerId);
      if (winnerPlayer) window.CGM_ALUMNI.recordPlayerAward(winnerPlayer, b.label, currentSeasonYear());
    }
  });
  breaks.breaks.forEach((br) => {
    logEvent({
      category: "record_broken",
      severity: "major",
      actorId: career.programId,
      actorName: myProgram.shortName,
      subjectIds: [br.holderId],
      summary: `${br.holder} sets ${br.label} (${br.value})`,
      reasonCodes: ["record_broken", `record_${br.type}`],
    });
  });
  return { ballots: ballotsResult.ballots, allTeams, breaks: breaks.breaks };
}

function realignmentPanel() {
  const moves = data.realignmentHistory || [];
  if (!moves.length) {
    return '<p style="color:var(--text-muted);font-size:var(--text-sm);padding:var(--space-3)">No realignment moves yet. Conferences shuffle as the simulation advances years.</p>';
  }
  const byYear = {};
  moves.forEach((m) => {
    const y = m.year || "?";
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(m);
  });
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));
  const confName = (id) => (world.conferences && world.conferences[id] && world.conferences[id].short) || id;
  return years.slice(0, 8).map((y) => {
    const rows = byYear[y].map((m) =>
      `<div class="realign-row">
        <span class="realign-team">${m.programName || m.programId}</span>
        <span class="realign-arrow">${confName(m.fromConf)} → <strong>${confName(m.toConf)}</strong></span>
        <span class="realign-pressure">P ${m.pressure || "—"}</span>
      </div>`
    ).join("");
    return `<div class="realign-year-block">
      <div class="realign-year">${y}</div>
      <div class="realign-rows">${rows}</div>
    </div>`;
  }).join("");
}

function runAiSchoolCarouselCycle() {
  const C = window.CGM_CAROUSEL;
  if (!C || !Array.isArray(programs) || programs.length === 0) return null;
  const standings = ensureAiSchoolStandings && ensureAiSchoolStandings();
  if (!standings) return null;
  // Build the schools input for the carousel — we skip the player's own
  // program because the player's HC is handled by the "Hot Seat" inspector.
  const schools = programs.filter((p) => p.id !== career.programId).map((p) => {
    const rec = standings[p.id] || { wins: 0, losses: 0 };
    const total = (rec.wins || 0) + (rec.losses || 0);
    const winPct = total ? rec.wins / total : 0.5;
    const expectedWinPct = 0.4 + ((p.programRating || p.basePrestige || 60) - 60) / 100;
    const expectedWins = Math.round(total * expectedWinPct);
    // Synthetic HC fields. Most AI schools have a coach hcTenureYears between
    // 1-7. We seed by program id so the same school produces deterministic
    // tenure across saves.
    let s = 1;
    const code = String(p.id);
    for (let k = 0; k < code.length; k++) s = (s * 31 + code.charCodeAt(k)) >>> 0;
    const tenure = 1 + (s % 7);
    return {
      id: p.id, name: p.shortName || p.name,
      hcId: `${p.id}-hc-${data.seasonState && data.seasonState.seasonYear || 0}`,
      hcTenureYears: tenure,
      wins: rec.wins || 0,
      losses: rec.losses || 0,
      expectedWins,
      boosterPressure: 50 + ((p.programRating || 70) - 70) * 0.6,
      prestige: p.programRating || p.basePrestige || 60,
    };
  });
  // Build candidate pool deterministically by season year.
  const pool = C.generateCandidatePool({
    seed: hashStrLite(`${career.seed}:carousel:${data.seasonState && data.seasonState.seasonYear}`),
    perRole: 12,
  });
  const random = createSeededRandom(`${career.seed}:carousel:${data.seasonState && data.seasonState.seasonYear}`);
  const carouselState = ensureCarouselState();
  const result = C.runOffseasonCarousel({
    schools, candidatePool: pool, state: carouselState, random,
  });
  // Emit historic events for fires + hires (only major schools — fans care).
  result.fires.slice(0, 8).forEach((fire) => {
    const prog = programs.find((p) => p.id === fire.schoolId);
    if (!prog) return;
    const sev = (prog.programRating || 70) >= 78 ? "major" : "notable";
    logEvent({
      category: "milestone", severity: sev,
      actorId: prog.id, actorName: prog.shortName,
      summary: `${prog.shortName} fires HC after ${fire.hotSeatScore}-rated hot seat`,
      reasonCodes: ["ai_carousel_fire", ...fire.reasonCodes],
    });
  });
  result.hires.slice(0, 8).forEach((hire) => {
    const prog = programs.find((p) => p.id === hire.schoolId);
    if (!prog) return;
    const sev = (prog.programRating || 70) >= 78 && hire.reputation >= 75 ? "major" : "notable";
    logEvent({
      category: "milestone", severity: sev,
      actorId: prog.id, actorName: prog.shortName,
      summary: `${prog.shortName} hires ${hire.newHcName} (rep ${hire.reputation})`,
      reasonCodes: ["ai_carousel_hire", ...hire.reasonCodes],
    });
  });
  // Persist to data.coachLegacies for any fired AI HC.
  if (window.CGM_ALUMNI) {
    if (!Array.isArray(data.coachLegacies)) data.coachLegacies = [];
    result.fires.forEach((fire) => {
      const prog = programs.find((p) => p.id === fire.schoolId);
      if (!prog) return;
      const sch = schools.find((s) => s.id === fire.schoolId);
      if (!sch) return;
      const startYear = currentSeasonYear() - sch.hcTenureYears + 1;
      const endYear = currentSeasonYear();
      const wins = sch.wins, losses = sch.losses;
      const recordSummary = `${wins}-${losses}`;
      data.coachLegacies.push(window.CGM_ALUMNI.buildCoachLegacyRecord({
        coach: { id: fire.formerHcId, name: `${prog.shortName} HC` },
        role: "HC", programId: prog.id,
        startYear, endYear, tenureYears: sch.hcTenureYears,
        recordSummary, championships: 0, bowls: 0, coyAwards: 0,
        endReason: window.CGM_ALUMNI.COACH_END_REASONS.FIRED,
      }));
    });
  }
  return result;
}

function ensureCarouselState() {
  if (!isRecord(data.carouselState)) data.carouselState = {};
  return data.carouselState;
}

function hashStrLite(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function runOffseasonRealignmentCycle() {
  const R = window.CGM_REALIGNMENT;
  if (!R || !Array.isArray(programs) || !world || !world.conferences) return null;
  // Build prevWinPctById from the AI school standings + the player's record.
  const standings = ensureAiSchoolStandings && ensureAiSchoolStandings();
  const prevWinPctById = {};
  programs.forEach((p) => {
    const rec = (standings && standings[p.id]) || null;
    if (rec) {
      const total = (rec.wins || 0) + (rec.losses || 0);
      prevWinPctById[p.id] = total ? rec.wins / total : 0.5;
    } else if (p.id === career.programId) {
      const split = (career.record || "0-0").split("-").map(Number);
      const tot = (split[0] || 0) + (split[1] || 0);
      prevWinPctById[p.id] = tot ? split[0] / tot : 0.5;
    } else {
      prevWinPctById[p.id] = 0.5;
    }
  });
  const random = createSeededRandom(`${career.seed}:realign:${currentSeasonYear()}`);
  const result = R.runOffseasonRealignment({
    programs, conferences: world.conferences,
    prevWinPctById, random, year: currentSeasonYear(),
    maxMovesPerCycle: 5,
  });
  if (!result.moves.length) return result;

  // Apply mutations + persist a realignment history slot on data.
  R.applyMoves(programs, result.moves);
  if (!Array.isArray(data.realignmentHistory)) data.realignmentHistory = [];
  result.moves.forEach((m) => data.realignmentHistory.push(m));
  // Emit a historic-tier event per move.
  result.moves.forEach((m) => {
    const fromShort = (world.conferences[m.fromConf] || {}).short || m.fromConf;
    const toShort = (world.conferences[m.toConf] || {}).short || m.toConf;
    logEvent({
      category: "realignment",
      severity: "historic",
      actorId: m.programId,
      actorName: m.programName,
      summary: `${m.programName} leaves ${fromShort} for ${toShort}`,
      reasonCodes: ["realignment_move", ...m.reasonCodes],
    });
  });
  return result;
}

function composeAndArchiveSeasonScrapbook() {
  const SB = window.CGM_SCRAPBOOK;
  if (!SB) return null;
  const log = ensureEventLog();
  if (!log) return null;
  const myProgram = programById(career.programId);
  const seasonYear = (data.seasonState && data.seasonState.seasonYear) || career.year || new Date().getFullYear();
  // Pull events for this season only.
  const seasonEvents = log.events.filter((e) => (e.season || seasonYear) === seasonYear);
  const ctx = {
    isPostseason: data.seasonState && data.seasonState.postseasonStage && data.seasonState.postseasonStage !== "regular",
    programFirsts: new Set((data.firstsThisSeason || [])),
  };
  const moments = SB.topMomentsForSeason({
    events: seasonEvents, limit: 16, minTier: SB.TIER.NOTABLE, ctx,
  });
  const page = SB.composeSeasonPage({
    season: seasonYear,
    moments,
    programName: myProgram.shortName,
    finalRecord: career.record,
  });
  // Persist to a scrapbook archive on the data object.
  if (!Array.isArray(data.scrapbookArchive)) data.scrapbookArchive = [];
  // Replace existing entry for this season (idempotent if rerun).
  const existing = data.scrapbookArchive.findIndex((p) => p.season === seasonYear);
  if (existing >= 0) data.scrapbookArchive[existing] = page;
  else data.scrapbookArchive.push(page);
  // Log a notable event so the next composer cycle picks it up.
  logEvent({
    category: "scrapbook_composed",
    severity: page.historicCount > 0 ? "major" : "notable",
    actorId: career.programId,
    actorName: myProgram.shortName,
    summary: `${page.pageTitle}: ${page.momentCount} moments archived (${page.historicCount} historic)`,
    reasonCodes: ["scrapbook_composed", `season_${seasonYear}`],
  });
  return page;
}

function computeRichTransferRisk(player) {
  const P = window.CGM_PORTAL_V2;
  if (!P || !player) return null;
  // Build a TransferContext from data we already track on the player.
  const moraleScore = (data.cultureState && data.cultureState.moraleScores && data.cultureState.moraleScores[player.id]) || 60;
  const promise = (data.cultureState && data.cultureState.promiseLedger && data.cultureState.promiseLedger[player.id]);
  const brokenPromises = (data.cultureState && data.cultureState.brokenPromises && data.cultureState.brokenPromises[player.id]) || 0;
  const allRoster = players();
  const sameDepth = allRoster.filter((p) => p.position === player.position).length;
  const ctx = {
    snapsPctVsExpected: player.transferRisk === "High" ? 35 : player.transferRisk === "Medium" ? 70 : 95,
    roleMismatch: player.schemeFit === "Standard B" || player.schemeFit === "Poor",
    nilExpected: 0, nilActual: 0,
    brokenPromises,
    coachRelationship: moraleScore,
    homesick: false,
    academicIssue: player.academicStatus !== "On track",
    schemeChange: false,
    positionCrowding: sameDepth,
    ambition: 50 + (player.ovr - 70) * 1.2,
    externalSchoolInterest: player.transferRisk === "High" ? 70 : player.transferRisk === "Medium" ? 45 : 20,
    coachingChange: false,
    loyalty: player.morale === "High" ? 80 : player.morale === "Stable" ? 55 : 35,
    teamSuccessIndex: 50 + ((career.record || "0-0").split("-")[0] - (career.record || "0-0").split("-")[1]) * 5,
    developmentSatisfaction: player.developmentFocus ? 70 : 50,
    strongRelationships: moraleScore >= 70 ? 75 : 50,
    leadershipConnection: player.year === "SR" || player.year === "JR",
  };
  const result = P.computeTransferRisk(player, ctx);
  const bandLabels = {
    low: "Low Risk", watch: "On Watch", concern: "Concern",
    high: "High Risk", imminent: "Imminent",
  };
  return { ...result, bandLabel: bandLabels[result.riskBand] || result.riskBand };
}

function computeHcHotSeat() {
  const C = window.CGM_CAROUSEL;
  if (!C || !C.evaluateHotSeat) return null;
  // Parse career.record like "8-3" → wins/losses.
  const rec = (career.record || "0-0").split("-").map((n) => Number(n) || 0);
  const wins = rec[0] || 0;
  const losses = rec[1] || 0;
  const games = wins + losses;
  // Expected wins from program prestige (rough): high-prestige expects 9-10,
  // mid expects 7, low expects 5-6.
  const myProgram = programById(career.programId);
  const prestige = (myProgram && myProgram.prestige) || 60;
  const expectedWins = games ? Math.round(games * (0.4 + prestige / 200)) : 0;
  const tenureYears = (career.year || 1) - (career.startYear || career.year || 1) + 1;
  const boosterPressure = (data.pressureState && data.pressureState.boosterPressure) || 50;
  const result = C.evaluateHotSeat({
    wins, losses, expectedWins, tenureYears, boosterPressure,
    recentScandal: !!(data.flags && data.flags.recentScandal),
  });
  const bandLabels = {
    secure: "Secure", watch: "On the Radar",
    hot_seat: "Hot Seat", fire_imminent: "Fire Watch",
  };
  return { ...result, bandLabel: bandLabels[result.band] || result.band };
}

// ── UI-RESCUE wave 2: Program Desk command center per spec 08 ──────────────
function ensureDeskUiState() {
  if (!isRecord(window.CGM_UI_STATE)) window.CGM_UI_STATE = {};
  if (!isRecord(window.CGM_UI_STATE.desk)) window.CGM_UI_STATE.desk = { selectedItemId: null };
  return window.CGM_UI_STATE.desk;
}

function wrapLegacyPanels(panels) {
  return `<div class="content-grid legacy-workspace-panels" style="padding:var(--space-4)">${panels.join("")}</div>`;
}

function renderPlayerWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  const player = findPlayer(selectedPlayerId);
  if (!player) {
    return wrapLegacyPanels([panel("Player Profile", "No player selected", "span-12", "<p>No valid player selection is available.</p>")]);
  }
  const header = DG.renderObjectHeader({
    title: player.name,
    sub: `${player.position} · ${player.year} · ${player.archetype || "Player"}`,
    meta: [
      { label: "OVR", value: String(player.ovr || "—"), openView: "roster" },
      { label: "Morale", value: String(player.morale || "—"), openView: "desk" },
      { label: "Transfer Risk", value: String(player.transferRisk || "—"), openView: "portal" },
      { label: "Dev Focus", value: String(player.developmentFocus || "—"), openView: "development" },
    ],
  });
  const actions = DG.renderActionBar({ groups: [{ controls: ['<button data-open-view="roster">Back to Roster</button>', '<button data-open-view="development">Development</button>', '<button data-insp-action="view-stats">View Stats</button>'] }] });
  const dataGrid = `
    <div class="workspace-grid workspace-grid-2">
      <section class="workspace-card workspace-card-span-2">
        <h3>Player Profile</h3>
        <p class="workspace-card-sub">${player.position} · ${player.year}</p>
        ${playerProfilePanel(player)}
      </section>
      <section class="workspace-card">
        <h3>Eligibility Snapshot</h3>
        <p class="workspace-card-sub">Rules and availability</p>
        ${eligibilitySnapshot(player)}
      </section>
      <section class="workspace-card">
        <h3>Peer Comparison</h3>
        <p class="workspace-card-sub">Nearby depth at the same position</p>
        ${peerComparisonTable(player)}
      </section>
      <section class="workspace-card workspace-card-span-2">
        <h3>Season Stats</h3>
        <p class="workspace-card-sub">Per-game and accumulated stat lines</p>
        <button class="clickable-card" data-open-view="analytics">${playerStatsPanel(player)}</button>
      </section>
    </div>`;
  const inspector = DG.renderInspector({
    title: "Player Snapshot",
    sub: `${player.position} room`,
    sections: [
      { label: "Status", html: `<div class="data-list"><button class="data-row clickable-row" data-open-view="desk"><span>Usage Promise</span><span>${(data.cultureState && data.cultureState.promiseLedger && data.cultureState.promiseLedger[player.id]) || "Rotation"}</span></button><button class="data-row clickable-row" data-open-view="development"><span>Academic</span><span>${player.academicStatus || "—"}</span></button><button class="data-row clickable-row" data-open-view="analytics"><span>Scheme Fit</span><span>${player.schemeFit || "—"}</span></button></div>` },
    ],
  });
  return DG.renderTableWorkspace({ header, actions, dataGrid, inspector, status: `${player.name} profile` });
}

function renderDepthWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  const header = DG.renderObjectHeader({
    title: "Depth Planner",
    sub: `${programById(career.programId).shortName} · two-deep and succession`,
    meta: [
      { label: "Slots", value: String(Object.keys(DEPTH_SLOT_POSITION || {}).length), openView: "depth" },
      { label: "Future Holes", value: String(Math.max(0, (vm("futureHoles") || []).length - 1)), openView: "recruiting" },
    ],
  });
  const dataGrid = `
    <div class="workspace-grid workspace-grid-2">
      <section class="workspace-card">
        <h3>Depth Assignments</h3>
        <p class="workspace-card-sub">Starter shell with validation</p>
        ${depthPlannerPanel()}
      </section>
      <section class="workspace-card">
        <h3>Two-Deep</h3>
        <p class="workspace-card-sub">Key roles</p>
        ${rosterRows(vm("depthTwoDeep"), { targetView: "roster" })}
      </section>
      <section class="workspace-card workspace-card-span-2">
        <h3>Future Holes</h3>
        <p class="workspace-card-sub">Push needs to recruiting or portal</p>
        <button class="clickable-card" data-open-view="recruiting">${renderSimpleWorkspaceTable(vm("futureHoles"), { keyPrefix: "depth-holes", emptyMessage: "No future holes flagged." })}</button>
      </section>
    </div>`;
  const inspector = DG.renderInspector({
    title: "Depth Notes",
    sub: "Roster planning",
    sections: [
      { label: "Recommendation", html: `<p>Use this room to connect roster planning to recruiting and portal needs instead of juggling separate legacy cards.</p>` },
    ],
  });
  return DG.renderTableWorkspace({ header, dataGrid, inspector, status: "Depth chart workspace" });
}

function renderProspectWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  const prospect = findProspect(selectedProspectId);
  if (!prospect) {
    return wrapLegacyPanels([panel("Prospect Profile", "No prospect selected", "span-12", "<p>No valid prospect selection is available.</p>")]);
  }
  const header = DG.renderObjectHeader({
    title: prospect.name,
    sub: `${prospect.position} · ${prospect.stars} · ${prospect.classYear || "HS"}`,
    meta: [
      { label: "Grade", value: String(prospect.grade || "—"), openView: "recruiting" },
      { label: "Need Fit", value: String(prospect.needFit || "—"), openView: "recruiting" },
      { label: "Pipeline", value: String(prospect.pipeline || "—"), openView: "recruiting" },
      { label: "Status", value: String(prospect.commitmentStatus || "Open"), openView: "recruiting" },
    ],
  });
  const actions = DG.renderActionBar({ groups: [{ controls: ['<button data-open-view="recruiting">Back to Recruiting</button>', '<button data-insp-action="contact-prospect">Contact</button>', '<button data-insp-action="offer-prospect">Offer</button>'] }] });
  const dataGrid = `
    <div class="workspace-grid workspace-grid-2">
      <section class="workspace-card workspace-card-span-2">
        <h3>Prospect Profile</h3>
        <p class="workspace-card-sub">${prospect.position} · ${prospect.stars}</p>
        ${prospectProfilePanel(prospect)}
      </section>
      <section class="workspace-card">
        <h3>Recruiting Snapshot</h3>
        <p class="workspace-card-sub">Decision support shell</p>
        ${prospectSnapshot(prospect)}
      </section>
      <section class="workspace-card">
        <h3>Position Board</h3>
        <p class="workspace-card-sub">Current board at this position</p>
        ${prospectBoardTable(prospect)}
      </section>
    </div>`;
  const inspector = DG.renderInspector({
    title: "Recruiting Intel",
    sub: prospect.name,
    sections: [
      { label: "Staff Summary", html: `<div class="data-list"><button class="data-row clickable-row" data-open-view="recruiting"><span>${prospect.staffRecommendation || "Keep pressure on if your relationship score is still moving."}</span><span class="rating">Board</span></button></div>` },
    ],
  });
  return DG.renderTableWorkspace({ header, actions, dataGrid, inspector, status: `${prospect.name} profile` });
}

function renderDevelopmentWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  const header = DG.renderObjectHeader({
    title: "Development Centre",
    sub: `${programById(career.programId).shortName} · practice and player growth`,
    meta: [
      { label: "Agenda", value: String((data.agenda || []).length) },
      { label: "Eligibility Flags", value: String(Math.max(0, (vm("eligibilityWatch") || []).length - 1)) },
      { label: "Future Holes", value: String(Math.max(0, (vm("futureHoles") || []).length - 1)) },
    ],
  });
  const dataGrid = `
    <div class="workspace-grid workspace-grid-2">
      <section class="workspace-card">
        <h3>Practice Emphasis</h3>
        <p class="workspace-card-sub">Choose this week's focus</p>
        ${practiceEmphasisPanel()}
      </section>
      <section class="workspace-card">
        <h3>Individual Plans</h3>
        <p class="workspace-card-sub">Player growth targets</p>
        ${renderSimpleWorkspaceTable(vm("individualPlans"), { keyPrefix: "dev-plans", emptyMessage: "No development plans yet." })}
      </section>
      <section class="workspace-card">
        <h3>Dev Report</h3>
        <p class="workspace-card-sub">Weekly breakouts and regressions</p>
        ${devReportPanel()}
      </section>
      <section class="workspace-card">
        <h3>This Week Agenda</h3>
        <p class="workspace-card-sub">Calendar items</p>
        ${agendaList(data.agenda)}
      </section>
      <section class="workspace-card">
        <h3>Load Management</h3>
        <p class="workspace-card-sub">Fatigue and injury signals</p>
        ${meters(vm("loadManagement"))}
      </section>
      <section class="workspace-card">
        <h3>Eligibility Watch</h3>
        <p class="workspace-card-sub">Redshirt, portal and academic flags</p>
        ${renderSimpleWorkspaceTable(vm("eligibilityWatch"), { keyPrefix: "eligibility", emptyMessage: "No eligibility issues." })}
      </section>
      <section class="workspace-card">
        <h3>Two-Deep Snapshot</h3>
        <p class="workspace-card-sub">Top starters by position</p>
        ${renderSimpleWorkspaceTable(vm("depthTwoDeep"), { keyPrefix: "twodeep", emptyMessage: "No two-deep data." })}
      </section>
      <section class="workspace-card workspace-card-span-2">
        <h3>Future Holes</h3>
        <p class="workspace-card-sub">Succession gaps needing action</p>
        ${renderSimpleWorkspaceTable(vm("futureHoles"), { keyPrefix: "holes", emptyMessage: "No future holes flagged." })}
      </section>
    </div>`;
  const inspector = DG.renderInspector({
    title: "Weekly Focus",
    sub: "Player development",
    sections: [
      { label: "Risk Read", html: `<div class="data-list"><div class="data-row"><span>Injury Signal</span><span class="rating">${injuryRiskSignalScore()}</span></div></div>` },
    ],
  });
  return DG.renderTableWorkspace({ header, dataGrid, inspector, status: "Development workspace" });
}

function renderFinanceWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  ensureBenefitState();
  const header = DG.renderObjectHeader({
    title: "Finance Office",
    sub: `${programById(career.programId).shortName} · NIL and benefits`,
    meta: [
      { label: "Pool Remaining", value: `$${benefitPoolRemaining()}k` },
      { label: "Total Pool", value: `$${data.benefitState.totalPool}k` },
      { label: "NIL Volatility", value: `${ruleValue("nilVolatilityPercent", 100)}%` },
    ],
  });
  const dataGrid = `
    <div class="workspace-grid workspace-grid-2">
      <section class="workspace-card workspace-card-span-2">
        <h3>NIL Pool</h3>
        <p class="workspace-card-sub">Booster collective and season spend</p>
        ${nilPoolPanel()}
      </section>
      <section class="workspace-card">
        <h3>Budget Overview</h3>
        <p class="workspace-card-sub">Benefit pool $${benefitPoolRemaining()}k remaining</p>
        ${renderSimpleWorkspaceTable(benefitBudgetRows(), { keyPrefix: "budget" })}
      </section>
      <section class="workspace-card">
        <h3>Market Pressure</h3>
        <p class="workspace-card-sub">Retention and acquisition climate</p>
        ${benefitPressureMeters()}
      </section>
      <section class="workspace-card workspace-card-span-2">
        <h3>Benefit Allocation</h3>
        <p class="workspace-card-sub">Adjust committed amounts by bucket</p>
        ${benefitAllocationPanel()}
      </section>
    </div>`;
  const inspector = DG.renderInspector({
    title: "Budget Notes",
    sub: "Current market climate",
    sections: [
      { label: "Guidance", html: `<p>Keep retention funded before opening aggressive recruiting spends if the portal or morale pressure is rising.</p>` },
    ],
  });
  return DG.renderTableWorkspace({ header, dataGrid, inspector, status: "Finance workspace" });
}

function renderFacilitiesWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  ensureFacilitiesState();
  const header = DG.renderObjectHeader({
    title: "Facilities and AD",
    sub: `${programById(career.programId).shortName} · stewardship and infrastructure`,
    meta: [
      { label: "Upgrade Pts", value: String((data.facilitiesState && data.facilitiesState.stadiumUpgradePoints) || 0) },
      { label: "Requests", value: String((data.facilities || []).length) },
      { label: "Objectives", value: String(Math.max(0, (vm("objectives") || []).length - 1)) },
    ],
  });
  const upgradePts = (data.facilitiesState && data.facilitiesState.stadiumUpgradePoints) || 0;
  const dataGrid = `
    <div class="workspace-grid workspace-grid-2">
      <section class="workspace-card">
        <h3>Facility Requests</h3>
        <p class="workspace-card-sub">Approve or defer live requests</p>
        ${facilitiesRequestPanel()}
      </section>
      <section class="workspace-card">
        <h3>AD Confidence</h3>
        <p class="workspace-card-sub">Job and politics</p>
        ${meters(vm("adConfidence"))}
      </section>
      <section class="workspace-card">
        <h3>School DNA</h3>
        <p class="workspace-card-sub">Institution profile</p>
        ${schoolProfilePanel()}
      </section>
      <section class="workspace-card">
        <h3>Stadium Builder</h3>
        <p class="workspace-card-sub">${upgradePts} upgrade pts, 2 pts per attribute</p>
        ${stadiumProfilePanel()}
      </section>
      <section class="workspace-card">
        <h3>Objectives</h3>
        <p class="workspace-card-sub">Season expectations</p>
        ${renderSimpleWorkspaceTable(vm("objectives"), { keyPrefix: "objectives", emptyMessage: "No objectives loaded." })}
      </section>
      <section class="workspace-card">
        <h3>Facility Impact Log</h3>
        <p class="workspace-card-sub">Upgrade history</p>
        ${renderSimpleWorkspaceTable(facilityImpactRows(), { keyPrefix: "facility-impact", emptyMessage: "No facility impact history yet." })}
      </section>
      <section class="workspace-card workspace-card-span-2">
        <h3>Pressure Events</h3>
        <p class="workspace-card-sub">Traceable objective pressure</p>
        ${renderSimpleWorkspaceTable(pressureTraceRows(), { keyPrefix: "pressure-trace", emptyMessage: "No pressure events logged." })}
      </section>
    </div>`;
  const inspector = DG.renderInspector({
    title: "Stewardship",
    sub: "AD relationship",
    sections: [
      { label: "Recommendation", html: `<p>Balance visible facility wins with objective pressure so the workspace feels like decision support, not a debug board.</p>` },
    ],
  });
  return DG.renderTableWorkspace({ header, dataGrid, inspector, status: "Facilities workspace" });
}

function renderAnalyticsWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  const header = DG.renderObjectHeader({
    title: "Analytics Lab",
    sub: `${programById(career.programId).shortName} · reports and model checks`,
    meta: [
      { label: "Reports", value: String(Math.max(0, (vm("analyticsReports") || []).length - 1)) },
      { label: "Findings", value: String((vm("analyticsFindings") || []).length) },
      { label: "Race Rows", value: String(Math.max(0, (aiProgramRaceRows() || []).length - 1)) },
    ],
  });
  const dataGrid = `
    <div class="workspace-grid workspace-grid-2">
      <section class="workspace-card workspace-card-span-2">
        <h3>Stat Leaders</h3>
        <p class="workspace-card-sub">Top players this season</p>
        ${statLeadersPanel()}
      </section>
      <section class="workspace-card">
        <h3>Recent Events</h3>
        <p class="workspace-card-sub">World events log</p>
        <button class="clickable-card" data-open-view="history">${recentEventsPanel()}</button>
      </section>
      <section class="workspace-card">
        <h3>Recent Actions</h3>
        <p class="workspace-card-sub">Decision log</p>
        <button class="clickable-card" data-open-view="desk">${recentActionsPanel()}</button>
      </section>
      <section class="workspace-card">
        <h3>Validation Harness</h3>
        <p class="workspace-card-sub">Structural invariants</p>
        ${validationPanel()}
      </section>
      <section class="workspace-card">
        <h3>Pinned Reports</h3>
        <p class="workspace-card-sub">Unlocks more after games</p>
        <button class="clickable-card" data-open-view="analytics">${renderSimpleWorkspaceTable(vm("analyticsReports"), { keyPrefix: "analytics-reports", emptyMessage: "No reports unlocked yet." })}</button>
      </section>
      <section class="workspace-card">
        <h3>Key Findings</h3>
        <p class="workspace-card-sub">Decision support</p>
        ${agendaList(vm("analyticsFindings"), { targetView: "analytics" })}
      </section>
      <section class="workspace-card">
        <h3>Balance Snapshot</h3>
        <p class="workspace-card-sub">Sanity bands for quick tuning</p>
        <button class="clickable-card" data-open-view="analytics">${renderSimpleWorkspaceTable(vm("balanceSnapshot"), { keyPrefix: "balance-snapshot", emptyMessage: "No balance snapshot available." })}</button>
      </section>
      <section class="workspace-card">
        <h3>World Model Signals</h3>
        <p class="workspace-card-sub">Entity-linked live simulation state</p>
        <button class="clickable-card" data-open-view="analytics">${renderSimpleWorkspaceTable(worldModelSnapshotRows(), { keyPrefix: "world-model", emptyMessage: "No world model signals yet." })}</button>
      </section>
      <section class="workspace-card">
        <h3>Relationship Trace</h3>
        <p class="workspace-card-sub">Deterministic causal log</p>
        ${renderSimpleWorkspaceTable(worldRelationshipTraceRows(), { keyPrefix: "relationship-trace", emptyMessage: "No relationship trace yet." })}
      </section>
      <section class="workspace-card">
        <h3>Reality Projection</h3>
        <p class="workspace-card-sub">Five-year calibration against anchor bands</p>
        ${realismProjectionPanel()}
      </section>
      <section class="workspace-card">
        <h3>Projection Table</h3>
        <p class="workspace-card-sub">Year-over-year target gap estimate</p>
        ${renderSimpleWorkspaceTable(realismProjectionRows(), { keyPrefix: "projection-table", emptyMessage: "No projection table yet." })}
      </section>
      <section class="workspace-card">
        <h3>AI Program Race</h3>
        <p class="workspace-card-sub">Rival ecosystem progression</p>
        ${renderSimpleWorkspaceTable(aiProgramRaceRows(), { keyPrefix: "ai-race", emptyMessage: "No race data yet." })}
      </section>
      <section class="workspace-card workspace-card-span-2">
        <h3>Advanced Data Hub</h3>
        <p class="workspace-card-sub">Efficiency, success, and tactical signals</p>
        ${renderSimpleWorkspaceTable(vm("advancedDataHub"), { keyPrefix: "advanced-hub", emptyMessage: "No advanced hub rows yet." })}
      </section>
      <section class="workspace-card">
        <h3>Alpha Hardening</h3>
        <p class="workspace-card-sub">Calibration and runtime checks</p>
        ${alphaHardeningPanel()}
      </section>
      <section class="workspace-card">
        <h3>Hardening Results</h3>
        <p class="workspace-card-sub">Most recent check summary</p>
        ${renderSimpleWorkspaceTable(alphaHardeningRows(), { keyPrefix: "hardening-results", emptyMessage: "No hardening results yet." })}
      </section>
      <section class="workspace-card">
        <h3>Morale / Promise Trace</h3>
        <p class="workspace-card-sub">Usage and promise reaction log</p>
        ${renderSimpleWorkspaceTable(moraleTraceRows(), { keyPrefix: "morale-trace", emptyMessage: "No morale trace yet." })}
      </section>
      <section class="workspace-card">
        <h3>Facility Impact Log</h3>
        <p class="workspace-card-sub">Long-term stewardship effects</p>
        ${renderSimpleWorkspaceTable(facilityImpactRows(), { keyPrefix: "facility-impact-analytics", emptyMessage: "No facility impact history yet." })}
      </section>
    </div>`;
  const inspector = DG.renderInspector({
    title: "Lab Notes",
    sub: "Calibration and signal review",
    sections: [
      { label: "Use", html: `<p>This room now behaves like a single analytics workspace instead of a loose pile of diagnostic cards.</p>` },
    ],
  });
  return DG.renderTableWorkspace({ header, dataGrid, inspector, status: "Analytics workspace" });
}

function renderProgramHomeWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  const myProgram = programById(career.programId);
  const pulse = ensurePulseState && ensurePulseState().snapshot;
  const tempLabel = pulse ? `${pulse.temperature.label} · ${pulse.temperature.score}` : "Steady · —";
  const header = DG.renderObjectHeader({
    title: "Program Home",
    sub: `${myProgram.shortName} · Executive overview`,
    meta: [
      { label: "Record", value: career.record, openView: "schedule" },
      { label: "Prestige", value: String(career.generatedProfile.prestige), openView: "history" },
      { label: "Recruiting Class", value: `#${career.generatedProfile.recruitingClass}`, openView: "recruiting" },
      { label: "Program Temperature", value: tempLabel, openView: "desk" },
    ],
  });
  const tabs = DG.renderTabBar({
    tabs: [
      { id: "desk", label: "Program Desk" },
      { id: "roster", label: "Roster" },
      { id: "recruiting", label: "Recruiting" },
      { id: "schedule", label: "Schedule" },
      { id: "staff", label: "Staff" },
      { id: "history", label: "History" },
    ],
    activeId: "desk",
    dataAttr: "home-jump",
  });
  const actions = DG.renderActionBar({
    groups: [
      { controls: ['<button data-view="desk" class="primary">Open Program Desk</button>', '<button data-view="roster">Roster</button>', '<button data-view="recruiting">Recruiting</button>', '<button data-view="schedule">Schedule</button>'] },
    ],
  });
  const contentHtml = `
    <div class="workspace-grid workspace-grid-2" style="padding:var(--space-4)">
      <section class="workspace-card workspace-card-span-2">
        <h3>Campus Pulse</h3>
        <p class="workspace-card-sub">Program temperature and component scores</p>
        <button class="clickable-card" data-open-view="desk">${campusPulsePanel()}</button>
      </section>
      <section class="workspace-card">
        <h3>Program Health</h3>
        <p class="workspace-card-sub">Current pressure points</p>
        <button class="clickable-card" data-open-view="desk">${meters(programHealthMetrics())}</button>
      </section>
      <section class="workspace-card">
        <h3>Season Objectives</h3>
        <p class="workspace-card-sub">Athletic department goals</p>
        <button class="clickable-card" data-open-view="facilities">${renderSimpleWorkspaceTable(vm("seasonObjectives"), { keyPrefix: "season-objectives", emptyMessage: "No objectives loaded." })}</button>
      </section>
      <section class="workspace-card">
        <h3>Pressure Trace</h3>
        <p class="workspace-card-sub">Why pressure moved</p>
        <button class="clickable-card" data-open-view="facilities">${renderSimpleWorkspaceTable(pressureTraceRows(), { keyPrefix: "pressure-home", emptyMessage: "No pressure trace yet." })}</button>
      </section>
      <section class="workspace-card workspace-card-span-2">
        <h3>Program Identity</h3>
        <p class="workspace-card-sub">Derived from roster, staff, and culture</p>
        <button class="clickable-card" data-open-view="home">${programIdentityPanel()}</button>
      </section>
      <section class="workspace-card">
        <h3>Roster Snapshot</h3>
        <p class="workspace-card-sub">Projected core</p>
        ${rosterRows(data.roster.slice(0, 5), { targetView: "roster" })}
      </section>
      <section class="workspace-card">
        <h3>Conference Table</h3>
        <p class="workspace-card-sub">Current league view</p>
        <button class="clickable-card" data-open-view="rankings">${standingsTable(data.standings)}</button>
      </section>
      <section class="workspace-card workspace-card-span-2">
        <h3>Bookmarks</h3>
        <p class="workspace-card-sub">Pinned rooms for quick return</p>
        ${bookmarkListPanel()}
      </section>
    </div>`;
  const inspector = DG.renderInspector({
    title: "Executive Notes",
    sub: "Program summary",
    sections: [
      { label: "Next Kickoff", html: `<button class="data-row clickable-row" data-open-view="schedule"><span>${document.getElementById("nextKickoffOpponent") ? document.getElementById("nextKickoffOpponent").textContent : "—"}</span><span class="rating">Open</span></button>` },
      { label: "Watch Items", html: `<button class="data-row clickable-row" data-open-view="desk"><span>${blockingItems().length} blocker(s) · ${(data.notifications || []).filter((n) => !n.resolved).length} open items</span><span class="rating">Desk</span></button>` },
      { label: "Bookmarks", html: bookmarkListPanel() },
    ],
  });
  return DG.renderTableWorkspace({ header, tabs, actions, dataGrid: contentHtml, inspector, status: `Home overview · ${career.record}` });
}

function deskSeverityFromNotification(n) {
  if (n.blocking) return "blocker";
  if (n.severity === "Deadline") return "deadline";
  if (n.severity === "Action Recommended" || n.severity === "Decision") return "decision";
  return "fyi";
}

function programItemHtml(n, selectedId) {
  const sev = deskSeverityFromNotification(n);
  const meta = `${(n.department || "general").toUpperCase()} · ${n.deadline || "No deadline"}`;
  const sel = n.id === selectedId ? "selected" : "";
  const action = n.targetView ? `<button class="primary" data-desk-open="${n.targetView}" data-desk-item="${n.id}">Open</button>` : "";
  const openAttr = n.targetView ? ` data-desk-open="${n.targetView}"` : "";
  return `<div class="program-item severity-${sev} ${sel}" data-desk-item="${n.id}"${openAttr}>
    <div class="program-item-stripe"></div>
    <div class="program-item-body">
      <div class="program-item-title">${n.title || "Item"}</div>
      <div class="program-item-meta">${meta}</div>
      <div class="program-item-summary">${n.body || "No detail provided."}</div>
    </div>
    <div class="program-item-action">
      ${action}
      <button data-desk-resolve="${n.id}">Resolve</button>
    </div>
  </div>`;
}

function deskPulseSummary() {
  if (!window.CGM_CAMPUS_PULSE) return '<p style="color:var(--text-muted);font-size:var(--text-sm)">Pulse not loaded.</p>';
  const state = ensurePulseState();
  if (!state.snapshot) recomputeCampusPulse();
  const snap = state.snapshot;
  if (!snap) return '<p style="color:var(--text-muted);font-size:var(--text-sm)">Pulse populates after first event.</p>';
  const featured = ["fanMood","boosterTemperature","lockerRoomTone","recruitBuzz"];
  const rows = featured.map((id) => {
    const c = snap.components.find((x) => x.id === id);
    if (!c) return "";
    const arrow = c.trend === "↑" ? '<span style="color:var(--success);margin-right:4px">↑</span>'
                : c.trend === "↓" ? '<span style="color:var(--danger);margin-right:4px">↓</span>'
                : '';
    return `<div class="pulse-row"><span class="pulse-label">${c.label}</span><span class="pulse-val">${c.score}</span><span class="pulse-trend">${arrow}${c.labelText}</span></div>`;
  }).join("");
  return `<div class="pulse-summary">
    <div class="pulse-summary-temp">
      <strong>${snap.temperature.label}</strong>
      <span class="badge">${snap.temperature.score}</span>
    </div>
    ${rows}
  </div>`;
}

function deskMediaClippings() {
  const log = ensureEventLog();
  if (!log) return '<p style="color:var(--text-muted);font-size:var(--text-sm)">No clippings yet.</p>';
  const newsworthy = log.events.filter((e) => e.severity === "major" || e.severity === "notable").slice(-4).reverse();
  if (!newsworthy.length) return '<p style="color:var(--text-muted);font-size:var(--text-sm)">No notable headlines this week.</p>';

  // MEDIA-1: route through CGM_VOICES if available so clippings carry real
  // sentiment-aware copy. Falls back to raw event summary if module unloaded.
  const VOICES = window.CGM_VOICES;
  const pulse = ensurePulseState && ensurePulseState().snapshot;
  const pulseScore = pulse && pulse.temperature ? pulse.temperature.score : 50;

  return newsworthy.map((e, i) => {
    if (VOICES) {
      // Deterministic per-event RNG so re-renders are stable.
      let s = 1; for (let k = 0; k < (e.id || `${i}`).length; k++) s = (s * 31 + (e.id || `${i}`).charCodeAt(k)) >>> 0;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      const c = VOICES.generateClipping({ pulseScore, recentEvents: [e], random: rand });
      return `<button class="media-clipping clickable-card" data-open-view="history">
        <div class="source">${c.sourceLabel} · ${weekLabelOf(e)}</div>
        <p class="headline">${c.headline}</p>
        <p class="body">${c.body}</p>
      </button>`;
    }
    const src = e.actorName || "Wire Report";
    const headline = e.summary || e.category;
    const body = `${eventCategoryLabel(e.category)} · ${(e.reasonCodes || []).slice(0,2).join(" · ") || "—"}`;
    return `<button class="media-clipping clickable-card" data-open-view="history">
      <div class="source">${src} · ${weekLabelOf(e)}</div>
      <p class="headline">${headline}</p>
      <p class="body">${body}</p>
    </button>`;
  }).join("");
}

function deskVoicesPanel() {
  const VOICES = window.CGM_VOICES;
  if (!VOICES) return '';
  const pulse = ensurePulseState && ensurePulseState().snapshot;
  const pulseScore = pulse && pulse.temperature ? pulse.temperature.score : 50;
  const log = ensureEventLog();
  const recent = log ? log.events.slice(-6) : [];
  // Deterministic per-week rng so the same week renders the same voices.
  const seed = (currentEvent() && currentEvent().week) || 0;
  let s = (seed + 1) >>> 0;
  const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  const r = VOICES.generateVoices({
    pulseScore,
    recentEvents: recent,
    perspectives: ["staff", "players", "fans", "boosters"],
    random: rand,
  });
  return r.voices.map((v) =>
    `<button class="voice-row clickable-row" data-open-view="desk"><span class="voice-tag">${v.perspective}</span><span class="voice-line">${v.line}</span></button>`
  ).join("");
}

function deskWatchlist() {
  const highRisk = players().filter((p) => p.transferRisk === "High").slice(0, 5);
  if (!highRisk.length) return '<p style="color:var(--text-muted);font-size:var(--text-sm)">No watchlist concerns.</p>';
  return `<div class="data-list">${highRisk.map((p) =>
    `<button class="data-row clickable-row" data-select-player="${p.id}"><span><strong>${p.position} ${p.name}</strong></span><span class="inspector-badge danger">High</span></button>`
  ).join("")}</div>`;
}

function deskStaffBriefing() {
  const myProgram = programById(career.programId);
  const seasonRecord = career.record;
  const upcoming = (data.schedule || []).find((row) => row[3] === "-" || !row[3] || row[4] === "Upcoming");
  const lines = [];
  if (upcoming) lines.push(`<p style="margin:0 0 var(--space-2);font-size:var(--text-sm)">Next: <strong>${upcoming[1]}</strong> on ${upcoming[0]} (${upcoming[3]} grade — ${upcoming[4]}).</p>`);
  lines.push(`<p style="margin:0 0 var(--space-2);font-size:var(--text-sm)">Record <strong>${seasonRecord}</strong> · Class <strong>#${career.generatedProfile && career.generatedProfile.recruitingClass || "—"}</strong> · Recruits committed <strong>${(data.prospectProfiles || []).filter((p) => p.committedToUs).length}</strong>.</p>`);
  return lines.join("");
}

function renderProgramDeskWorkspace() {
  ensureDeskUiState();
  const state = window.CGM_UI_STATE.desk;
  const myProgram = programById(career.programId);
  const event = currentEvent();
  const readiness = continueReadinessSnapshot();
  const blockers = readiness.blockers;
  const decisions = readiness.decisions;
  const fyi = readiness.unresolved.filter((n) => !n.blocking && n.severity !== "Action Recommended" && n.severity !== "Decision").slice(0, 4);
  const pulse = ensurePulseState().snapshot;
  const tempLabel = pulse ? `${pulse.temperature.label} · ${pulse.temperature.score}` : "—";

  const selected = state.selectedItemId
    ? (data.notifications || []).find((n) => n.id === state.selectedItemId)
    : null;

  const headerHtml = `<header class="obj-header">
    <h2>Program Desk</h2>
    <p class="obj-header-sub">${event.dateLabel} · ${event.phase}</p>
    <div class="obj-header-meta">
      <span><strong>Blockers:</strong> ${blockers.length}</span>
      <span><strong>Decisions:</strong> ${decisions.length}</span>
      <span title="Program temperature 0-100 from 8 components: Cold ≤20, Restless 21-40, Steady 41-60, Warm 61-80, Hot 81-100"><strong>Pulse:</strong> ${tempLabel}</span>
      <span><strong>Record:</strong> ${career.record}</span>
    </div>
  </header>`;

  const nextDeadline = readiness.nextDeadline || [...blockers, ...decisions, ...fyi].find((n) => n.deadline);
  const continueCard = `<div class="fm-desk-continue-card ${readiness.ready ? "ready" : "blocked"}" data-open-view="desk">
    <div>
      <p class="label" style="margin:0 0 4px">Continue Gate</p>
      <strong>${readiness.ready ? "Ready to advance" : `${blockers.length} blocker(s) before continue`}</strong>
      <p style="margin:6px 0 0;color:var(--text-secondary);font-size:var(--text-xs)">${readiness.ready
        ? (decisions.length ? `${decisions.length} decision item(s) are still on the desk, but time can move.` : "No blockers remain. Continue will move to the next meaningful event.")
        : "Resolve all blocker-tagged items in the left column before the topbar Continue action will fire."}</p>
    </div>
    <div class="fm-desk-continue-actions">
      <button class="primary" data-continue-from-desk="now" ${readiness.ready ? "" : "disabled"}>Continue</button>
      <button data-open-view="schedule">Calendar</button>
    </div>
  </div>`;
  const primaryHtml = `<header class="obj-header" style="border:0;background:transparent;padding:0">
    <h2 style="font-size:var(--text-md);margin:0">Triage</h2>
  </header>
  ${continueCard}
  <div class="fm-desk-section">
    <div class="fm-desk-section-header"><h3>Must Fix Before Continue</h3><span class="count">${blockers.length}</span></div>
    ${blockers.length ? blockers.map((n) => programItemHtml(n, state.selectedItemId)).join("")
      : '<p style="color:var(--text-muted);font-size:var(--text-sm);margin:0">No blockers. Press Continue to advance.</p>'}
  </div>
  <div class="fm-desk-section">
    <div class="fm-desk-section-header"><h3>Today\'s Decisions</h3><span class="count">${decisions.length}</span></div>
    ${decisions.length ? decisions.slice(0, 6).map((n) => programItemHtml(n, state.selectedItemId)).join("")
      : '<p style="color:var(--text-muted);font-size:var(--text-sm);margin:0">No decisions waiting.</p>'}
  </div>
  <div class="fm-desk-section">
    <div class="fm-desk-section-header"><h3>Staff Recommends</h3><span class="count">${fyi.length}</span></div>
    ${fyi.length ? fyi.map((n) => programItemHtml(n, state.selectedItemId)).join("")
      : '<p style="color:var(--text-muted);font-size:var(--text-sm);margin:0">All quiet.</p>'}
  </div>
  <div class="fm-desk-section">
    <div class="fm-desk-section-header"><h3>Next Deadline</h3></div>
    ${nextDeadline ? programItemHtml(nextDeadline, state.selectedItemId) : '<p style="color:var(--text-muted);font-size:var(--text-sm);margin:0">No deadlines on the desk.</p>'}
  </div>`;

  const secondaryHtml = `<div class="fm-desk-section">
    <div class="fm-desk-section-header"><h3>Staff Briefing</h3></div>
    ${deskStaffBriefing()}
  </div>
  <div class="fm-desk-section">
    <div class="fm-desk-section-header"><h3>Campus Pulse</h3></div>
    ${deskPulseSummary()}
  </div>
  <div class="fm-desk-section">
    <div class="fm-desk-section-header"><h3>Media Clippings</h3></div>
    ${deskMediaClippings()}
  </div>
  <div class="fm-desk-section">
    <div class="fm-desk-section-header"><h3>Voices Around the Program</h3></div>
    ${deskVoicesPanel() || '<p style="color:var(--text-muted);font-size:var(--text-sm)">Voices module loading…</p>'}
  </div>
  <div class="fm-desk-section">
    <div class="fm-desk-section-header"><h3>Watchlist</h3></div>
    ${deskWatchlist()}
  </div>`;

  let inspectorHtml;
  if (selected) {
    const sev = deskSeverityFromNotification(selected);
    const sevLabel = sev === "blocker" ? "Blocker" : sev === "deadline" ? "Deadline" : sev === "decision" ? "Decision" : "FYI";
    const sevBadge = sev === "blocker" ? "danger" : sev === "deadline" ? "warning" : sev === "decision" ? "info" : "good";
    inspectorHtml = window.CGM_DATAGRID.renderInspector({
      title: selected.title || "Item",
      sub: `${(selected.department || "General").toUpperCase()} · ${selected.deadline || "No deadline"}`,
      sections: [
        { label: "Status", html: `<span class="inspector-badge ${sevBadge}">${sevLabel}</span>` },
        { label: "Why It Matters", html: `<p style="margin:0">${selected.body || "No additional detail."}</p>` },
        { label: "Linked Workspace", html: `<p style="margin:0;color:var(--text-secondary)">${selected.linked || "—"}</p>` },
      ],
      actions: [
        ...(selected.targetView ? [{ label: `Open ${selected.linked || selected.targetView}`, action: `desk-open:${selected.targetView}`, primary: true }] : []),
        { label: "Mark Resolved", action: `desk-resolve:${selected.id}` },
      ],
    });
  } else {
    inspectorHtml = window.CGM_DATAGRID.renderInspector({
      title: "Continue Readiness",
      sub: blockers.length ? `${blockers.length} blocker(s)` : "Ready to advance",
      sections: [
        { label: "Status", html: blockers.length
          ? `<span class="inspector-badge danger">Blocked</span><p style="margin-top:var(--space-2)">Resolve all blockers above before pressing Continue.</p>`
          : `<span class="inspector-badge good">Ready</span><p style="margin-top:var(--space-2)">${decisions.length ? `${decisions.length} decision item(s) remain, but Continue can still advance time.` : "No blockers. Press Continue in the topbar or here on the desk to advance time."}</p>` },
        { label: "Advance", html: `<div class="data-list"><button class="data-row clickable-row" data-continue-from-desk="now" ${blockers.length ? "disabled" : ""}><span>${blockers.length ? "Blocked until triage is clear" : "Advance to next meaningful event"}</span><span class="rating">Go</span></button></div>` },
        { label: "Today's Agenda", html: `<div class="data-list">${(data.agenda || []).slice(0, 4).map((a) =>
          `<div class="data-row"><span>${a[0]}</span><span style="color:var(--text-secondary)">${a[1]}</span></div>`
        ).join("") || '<p style="color:var(--text-muted);font-size:var(--text-sm)">No items scheduled.</p>'}</div>` },
      ],
    });
  }

  return `${headerHtml}<div class="fm-desk-workspace">
    <div class="fm-desk-col primary">${primaryHtml}</div>
    <div class="fm-desk-col secondary">${secondaryHtml}</div>
    ${inspectorHtml}
  </div>`;
}

// ── UI-RESCUE wave 2: Schedule workspace ───────────────────────────────────
function ensureScheduleUiState() {
  if (!isRecord(window.CGM_UI_STATE)) window.CGM_UI_STATE = {};
  if (!isRecord(window.CGM_UI_STATE.schedule)) {
    window.CGM_UI_STATE.schedule = { tab: "fixtures", sort: [{ colId: "date", direction: "asc" }] };
  }
  return window.CGM_UI_STATE.schedule;
}

const SCHEDULE_TABS = [
  { id: "fixtures", label: "Fixtures" },
  { id: "boxscores", label: "Box Scores" },
  { id: "drives", label: "Last Game Drives" },
  { id: "why", label: "Why" },
];

function renderScheduleWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  const state = ensureScheduleUiState();
  const myProgram = programById(career.programId);
  const phaseLabel = (currentEvent() && currentEvent().phase) || "Preseason";

  let bodyHtml;
  if (state.tab === "boxscores") {
    bodyHtml = `<div style="padding:var(--space-4)"><button class="clickable-card" data-open-view="schedule">${renderSimpleWorkspaceTable(recentBoxScoresRows(), { keyPrefix: "boxscores", emptyMessage: "No box scores yet." })}</button></div>`;
  } else if (state.tab === "drives") {
    bodyHtml = `<div style="padding:var(--space-4)"><button class="clickable-card" data-open-view="schedule">${renderSimpleWorkspaceTable(driveSummaryRows(), { keyPrefix: "drives", emptyMessage: "No drive data yet." })}</button></div>`;
  } else if (state.tab === "why") {
    bodyHtml = `<div style="padding:var(--space-4)"><button class="clickable-card" data-open-view="analytics">${whyPanel()}</button></div>`;
  } else {
    // Wave 19: sort by canonical season-week ordinal so Aug→Sep→Oct→Nov,
    // not alphabetical (which puts Aug, Nov, Oct, Sep — broken).
    const yr = currentSeasonYear();
    const cols = [
      { id: "date", label: "Date", accessor: (r) => r._dateOrdinal, width: 110,
        formatter: (_, r) => `${r[0]} <span style="color:var(--text-muted);font-size:var(--text-xxs)">${yr}</span>` },
      { id: "opponent", label: "Opponent", accessor: (r) => r[1], width: 220 },
      { id: "site", label: "Site", accessor: (r) => r[2], width: 80 },
      { id: "grade", label: "Grade", accessor: (r) => r[3], cellType: "badge", width: 80,
        badgeMap: { "A+": "good", "A": "good", "A-": "good", "B+": "info", "B": "info", "B-": "warning", "C+": "warning", "C": "warning", "Result W": "good", "Result L": "critical" } },
      { id: "note", label: "Note", accessor: (r) => r[4], width: 360, sortable: false },
    ];
    const rows = (data.schedule || []).map((r, i) => ({
      _id: `g${i}`, 0: r[0], 1: r[1], 2: r[2], 3: r[3], 4: r[4],
      _dateOrdinal: SEASON_DATE_LABELS.indexOf(r[0]) >= 0 ? SEASON_DATE_LABELS.indexOf(r[0]) : 99,
    }));
    bodyHtml = DG.renderDataGrid({
      columns: cols, rows, rowKey: (r) => r._id, sort: state.sort,
      emptyMessage: "Schedule is empty.",
      dataAttr: "schedule-row",
    });
  }

  const games = (data.schedule || []).length;
  const played = (data.seasonState && data.seasonState.currentGameIndex) || 0;
  const header = DG.renderObjectHeader({
    title: "Schedule",
    sub: `${myProgram.shortName} · ${currentSeasonYear()} ${phaseLabel}`,
    meta: [
      { label: "Games", value: String(games), openView: "schedule" },
      { label: "Played", value: String(played), openView: "schedule" },
      { label: "Record", value: career.record, openView: "rankings" },
    ],
  });
  const tabs = DG.renderTabBar({ tabs: SCHEDULE_TABS, activeId: state.tab, dataAttr: "schedule-tab" });
  const actions = DG.renderActionBar({
    groups: [
      { controls: [`<select data-tactical-profile><option ${data.seasonState && data.seasonState.tacticalProfile === "Aggressive" ? "selected" : ""}>Aggressive</option><option ${(!data.seasonState || data.seasonState.tacticalProfile === "Balanced" || !data.seasonState.tacticalProfile) ? "selected" : ""}>Balanced</option><option ${data.seasonState && data.seasonState.tacticalProfile === "Conservative" ? "selected" : ""}>Conservative</option></select>`] },
    ],
  });
  const inspector = DG.renderInspector({
    title: "Opponent Scout",
    sub: data.seasonState && data.seasonState.lastResultSummary || "No result yet",
    sections: [
      { label: "Tendencies", html: `<div class="data-list">${opponentTendencyRows().slice(1, 6).map((r) => `<button class="data-row clickable-row" data-open-view="analytics"><span>${r[0]}</span><span class="rating">${r[1]}</span></button>`).join("")}</div>` },
      { label: "Last Box", html: `<div class="data-list">${recentBoxScoresRows().slice(1, 4).map((r) => `<button class="data-row clickable-row" data-open-view="schedule"><span>${r[0]}</span><span class="rating">${r[1]}</span></button>`).join("")}</div>` },
    ],
  });
  const status = `${games} games · ${played} played · ${state.tab}`;
  return DG.renderTableWorkspace({ header, tabs, actions, dataGrid: bodyHtml, inspector, status });
}

// ── UI-RESCUE wave 2: Rankings workspace ───────────────────────────────────
function ensureRankingsUiState() {
  if (!isRecord(window.CGM_UI_STATE)) window.CGM_UI_STATE = {};
  if (!isRecord(window.CGM_UI_STATE.rankings)) {
    window.CGM_UI_STATE.rankings = { tab: "national", sort: [{ colId: "rating", direction: "desc" }] };
  }
  return window.CGM_UI_STATE.rankings;
}
const RANKINGS_TABS = [
  { id: "national", label: "National Top 25" },
  { id: "conference", label: "Conference" },
  { id: "cfp", label: "CFP Bracket" },
  { id: "resume", label: "Selection Resume" },
];

function renderRankingsWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  const state = ensureRankingsUiState();
  const myProgram = programById(career.programId);

  let bodyHtml;
  if (state.tab === "conference") {
    const rows = (data.standings || []).map((r, i) => ({ _id: `c${i}`, 0: r[0], 1: r[1], 2: r[2], 3: r[3], 4: r[4] }));
    const cols = [
      { id: "rank", label: "#", accessor: (r) => r[0], width: 50, align: "center" },
      { id: "team", label: "Team", accessor: (r) => r[1], width: 220 },
      { id: "record", label: "Record", accessor: (r) => r[2], width: 90 },
      { id: "rating", label: "Rating", accessor: (r) => Number(r[3]), cellType: "rating", width: 90 },
      { id: "grade", label: "Grade", accessor: (r) => r[4], width: 80 },
    ];
    bodyHtml = DG.renderDataGrid({ columns: cols, rows, rowKey: (r) => r._id, sort: state.sort, dataAttr: "rankings-row" });
  } else if (state.tab === "cfp") {
    bodyHtml = `<div style="padding:var(--space-4)"><button class="clickable-card" data-open-view="rankings">${renderSimpleWorkspaceTable(cfpBracketRows(), { keyPrefix: "cfp", emptyMessage: "No CFP bracket yet." })}</button></div>`;
  } else if (state.tab === "resume") {
    bodyHtml = `<div style="padding:var(--space-4)"><button class="clickable-card" data-open-view="rankings">${meters(vm("selectionResume"))}</button></div>`;
  } else {
    const top25 = vm("nationalTop10").slice(1);
    const rows = top25.map((r, i) => ({ _id: `n${i}`, 0: r[0], 1: r[1], 2: r[2], 3: r[3], 4: r[4] }));
    const cols = [
      { id: "rank", label: "#", accessor: (r) => Number(r[0]), width: 50, align: "center" },
      { id: "team", label: "Program", accessor: (r) => r[1], width: 220 },
      { id: "record", label: "Record", accessor: (r) => r[2], width: 90 },
      { id: "rating", label: "Rating", accessor: (r) => Number(r[3]), cellType: "rating", width: 90 },
      { id: "trend", label: "Trend", accessor: (r) => r[4], width: 80, align: "center" },
    ];
    bodyHtml = DG.renderDataGrid({ columns: cols, rows, rowKey: (r) => r._id, sort: state.sort, dataAttr: "rankings-row" });
  }

  const header = DG.renderObjectHeader({
    title: "Rankings",
    sub: `${myProgram.shortName} · ${currentSeasonYear()}`,
    meta: [
      { label: "Conference", value: ((world.conferences && world.conferences[myProgram.conference] && world.conferences[myProgram.conference].short) || (myProgram.conference || "—").toUpperCase()), openView: "rankings" },
      { label: "Record", value: career.record, openView: "schedule" },
    ],
  });
  const tabs = DG.renderTabBar({ tabs: RANKINGS_TABS, activeId: state.tab, dataAttr: "rankings-tab" });
  const actions = DG.renderActionBar({ groups: [{ controls: [] }] });
  const inspector = DG.renderInspector({
    title: "Selection Resume",
    sub: "Year-end CFP profile",
    sections: [
      { label: "Profile", html: `<div class="data-list">${vm("selectionResume").map((r) => `<button class="data-row clickable-row" data-open-view="rankings"><span>${r[0]}</span><span class="rating">${r[1]}</span></button>`).join("")}</div>` },
    ],
  });
  return DG.renderTableWorkspace({ header, tabs, actions, dataGrid: bodyHtml, inspector, status: `${state.tab} view` });
}

// ── UI-RESCUE wave 2: History/Scrapbook workspace ─────────────────────────
function ensureHistoryUiState() {
  if (!isRecord(window.CGM_UI_STATE)) window.CGM_UI_STATE = {};
  if (!isRecord(window.CGM_UI_STATE.history)) window.CGM_UI_STATE.history = { tab: "archive" };
  return window.CGM_UI_STATE.history;
}
const HISTORY_TABS = [
  { id: "archive", label: "Program Archive" },
  { id: "scrapbook", label: "Scrapbook" },
  { id: "awards", label: "Awards & Records" },
  { id: "alumni", label: "Alumni" },
  { id: "draft", label: "NFL Pipeline" },
  { id: "rivalry", label: "Rivalry Ledger" },
  { id: "realignment", label: "Realignment" },
];

function scrapbookPanel() {
  const log = ensureEventLog();
  if (!log) return '<p style="color:var(--text-muted)">No events yet.</p>';
  const SB = window.CGM_SCRAPBOOK;
  const myProgram = programById(career.programId);

  // SCRAPBOOK-1 deeper: prefer the season-end archive when it exists. Each
  // entry is a fully-composed page from composeAndArchiveSeasonScrapbook.
  if (SB && Array.isArray(data.scrapbookArchive) && data.scrapbookArchive.length) {
    const sortedArchive = data.scrapbookArchive.slice().sort((a, b) => b.season - a.season);
    const archiveHtml = sortedArchive.slice(0, 8).map((page) => {
      if (!page.momentCount) return "";
      const headlines = page.headlines.map((h) =>
        `<div class="scrapbook-headline">
          <span class="scrapbook-tier tier-${h.tier}">${h.tier}</span>
          <span class="scrapbook-headline-text">${escapeHtml(h.headline)}</span>
        </div>`
      ).join("");
      return `<div class="scrapbook-page">
        <div class="year">${page.season}${page.subtitle ? ` <span class="year-sub">${page.subtitle}</span>` : ""}</div>
        <div class="moments">${headlines || '<p style="color:var(--text-muted);margin:0">Nothing notable.</p>'}</div>
        <div class="scrapbook-meta">${page.momentCount} moments · ${page.historicCount} historic · archived</div>
      </div>`;
    }).filter(Boolean).join("");
    if (archiveHtml) return archiveHtml;
  }

  // Group events by season for per-page composition.
  const yearGroups = {};
  log.events.forEach((e) => {
    const year = e.season || career.year || new Date().getFullYear();
    if (!yearGroups[year]) yearGroups[year] = [];
    yearGroups[year].push(e);
  });
  const years = Object.keys(yearGroups).sort((a, b) => Number(b) - Number(a));
  if (!years.length) return '<p style="color:var(--text-muted);font-size:var(--text-sm);padding:var(--space-3)">Major moments will collect here as you play.</p>';

  // SCRAPBOOK-1: route through CGM_SCRAPBOOK.composeSeasonPage if available
  // for tier scoring + dedup + structured headlines. Falls back to legacy
  // severity-filtered list when module is unloaded.
  if (SB && SB.composeSeasonPage) {
    const pages = years.slice(0, 8).map((y) => {
      const events = yearGroups[y];
      const moments = SB.topMomentsForSeason({
        events, limit: 8, minTier: SB.TIER.NOTABLE,
        ctx: { isPostseason: false, programFirsts: new Set() },
      });
      return SB.composeSeasonPage({
        season: Number(y),
        moments,
        programName: myProgram.shortName,
        finalRecord: y === years[0] ? career.record : null,
      });
    });

    return pages.map((page) => {
      if (!page.momentCount) return ""; // skip pages with nothing
      const headlines = page.headlines.map((h) =>
        `<div class="scrapbook-headline">
          <span class="scrapbook-tier tier-${h.tier}">${h.tier}</span>
          <span class="scrapbook-headline-text">${escapeHtml(h.headline)}</span>
        </div>`
      ).join("");
      return `<div class="scrapbook-page">
        <div class="year">${page.season}${page.subtitle ? ` <span class="year-sub">${page.subtitle}</span>` : ""}</div>
        <div class="moments">${headlines || '<p style="color:var(--text-muted);margin:0">Nothing notable.</p>'}</div>
        <div class="scrapbook-meta">${page.momentCount} moments · ${page.historicCount} historic</div>
      </div>`;
    }).filter(Boolean).join("");
  }

  // Legacy fallback
  const filtered = years.slice(0, 8).map((y) => {
    const moments = yearGroups[y].filter((e) => e.severity === "major" || e.severity === "historic").slice(-6).reverse();
    return { year: y, moments };
  }).filter((p) => p.moments.length);
  if (!filtered.length) return '<p style="color:var(--text-muted);font-size:var(--text-sm);padding:var(--space-3)">Major moments will collect here as you play.</p>';
  return filtered.map((p) =>
    `<div class="scrapbook-page">
      <div class="year">${p.year}</div>
      <div class="moments">${p.moments.map((m) =>
        `<div class="moment">
          <span class="moment-tag">${eventCategoryLabel(m.category)}</span>
          <span class="moment-text">${m.summary}</span>
        </div>`
      ).join("")}</div>
    </div>`
  ).join("");
}

function escapeHtml(s) {
  if (s === null || s === undefined) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function renderHistoryWorkspace() {
  const DG = window.CGM_DATAGRID;
  if (!DG) return '<div style="padding:24px">DataGrid module not loaded.</div>';
  const state = ensureHistoryUiState();
  const myProgram = programById(career.programId);

  let bodyHtml;
  if (state.tab === "scrapbook") {
    bodyHtml = `<div style="padding:var(--space-4)">${scrapbookPanel()}</div>`;
  } else if (state.tab === "draft") {
    bodyHtml = `<div style="padding:var(--space-4)"><button class="clickable-card" data-open-view="history">${draftClassPanel()}</button></div>`;
  } else if (state.tab === "rivalry") {
    bodyHtml = `<div style="padding:var(--space-4)"><button class="clickable-card" data-open-view="history">${renderSimpleWorkspaceTable(vm("rivalryLedger"), { keyPrefix: "rivalry", emptyMessage: "No rivalry ledger yet." })}</button></div>`;
  } else if (state.tab === "realignment") {
    bodyHtml = `<div style="padding:var(--space-4)">${realignmentPanel()}</div>`;
  } else if (state.tab === "awards") {
    bodyHtml = `<div style="padding:var(--space-4)">${awardsAndRecordsPanel()}</div>`;
  } else if (state.tab === "alumni") {
    bodyHtml = `<div style="padding:var(--space-4)">${alumniPanel()}</div>`;
  } else {
    const cols = [
      { id: "year", label: "Year", accessor: (r) => r[0], width: 80 },
      { id: "record", label: "Record", accessor: (r) => r[1], width: 90 },
      { id: "post", label: "Postseason", accessor: (r) => r[2], width: 160 },
      { id: "rank", label: "Final Rank", accessor: (r) => r[3], width: 120 },
      { id: "memory", label: "Memory", accessor: (r) => r[4], width: 360, sortable: false },
    ];
    const rows = (data.history || []).map((r, i) => ({ _id: `h${i}`, 0: r[0], 1: r[1], 2: r[2], 3: r[3], 4: r[4] }));
    bodyHtml = DG.renderDataGrid({ columns: cols, rows, rowKey: (r) => r._id, dataAttr: "history-row", emptyMessage: "Play a season for the archive to populate." });
  }

  const header = DG.renderObjectHeader({
    title: "Program History",
    sub: `${myProgram.shortName} · ${myProgram.nickname || ""}`,
    meta: [
      { label: "Seasons Logged", value: String((data.history || []).length), openView: "history" },
      { label: "Draft Classes", value: String((data.draftClasses || []).length), openView: "history" },
    ],
  });
  const tabs = DG.renderTabBar({ tabs: HISTORY_TABS, activeId: state.tab, dataAttr: "history-tab" });
  const actions = DG.renderActionBar({ groups: [{ controls: [] }] });
  const inspector = DG.renderInspector({
    title: "Memory Hooks",
    sub: "Stories worth telling",
    sections: [
      { label: "Recent Hooks", html: `<div class="data-list">${vm("memoryHooks").slice(0, 4).map((r) => `<button class="data-row clickable-row" data-open-view="history"><span><strong>${r[0]}</strong> ${r[1]}</span></button>`).join("") || '<p style="color:var(--text-muted)">No hooks yet.</p>'}</div>` },
    ],
  });
  return DG.renderTableWorkspace({ header, tabs, actions, dataGrid: bodyHtml, inspector, status: `${state.tab} view` });
}

const EVENT_CATEGORY_LABEL = {
  game_played: "Game Played",
  drive_finished: "Drive Finished",
  score_change: "Score Change",
  turnover: "Turnover",
  injury: "Injury",
  recruit_action: "Recruiting Action",
  recruit_commit: "Recruiting Commit",
  transfer_in: "Transfer In",
  transfer_out: "Transfer Out",
  player_breakout: "Breakout",
  player_regression: "Regression",
  facility_upgrade: "Facility Upgrade",
  season_rolled: "Season Rollover",
  ranking_change: "Ranking Change",
  promise_made: "Promise Made",
  promise_broken: "Promise Broken",
  media_clip: "Media Clipping",
  season_award: "Season Award",
  milestone: "Milestone",
  award_won: "Award Won",
  record_broken: "School Record",
  scrapbook_composed: "Season Recap",
  realignment: "Conference Realignment",
  nil_bid: "NIL Bid",
  injury_recovered: "Returned from Injury",
};
function eventCategoryLabel(cat) { return EVENT_CATEGORY_LABEL[cat] || (cat || "Event").replace(/_/g, " "); }
function weekLabelOf(e) {
  if (!e || !e.week) return "Preseason";
  const w = String(e.week);
  return w.match(/^Wk\s/i) ? w : `Wk ${w}`;
}

function recentEventsPanel() {
  const log = ensureEventLog();
  if (!log || !log.events.length) {
    return '<div class="agenda-list"><div class="agenda-item"><strong>No events logged</strong><p>Events appear after the first game / continue tick.</p></div></div>';
  }
  const events = window.CGM_EVENT_LOG.recentEvents(log, 12);
  const sevColor = { historic: "tc-pos", major: "tc-pos", notable: "tc-neutral", minor: "tc-neutral", trivial: "tc-neutral" };
  const rows = events.map((e) => {
    const codes = (e.reasonCodes || []).slice(0, 2).join(" · ");
    const weekStr = e.week ? (String(e.week).match(/^Wk\s/i) ? e.week : `Wk ${e.week}`) : "";
    return `<div class="data-row"><div><strong>${e.summary}</strong><p style="opacity:0.7;font-size:11px">${eventCategoryLabel(e.category)}${weekStr ? " · " + weekStr : ""}${codes ? " · " + codes : ""}</p></div><span class="trait-badge ${sevColor[e.severity] || "tc-neutral"}">${e.severity}</span></div>`;
  }).join("");
  const counts = window.CGM_EVENT_LOG.severityCounts(log);
  const summary = `<div class="data-row"><div><strong>Event log</strong><p style="opacity:0.7">${log.count} total · ${counts.major + counts.historic} major+</p></div></div>`;
  return summary + `<div class="data-list">${rows}</div>`;
}

const ACTION_TYPE_LABEL = {
  career_start: "Career Start",
  continue_advance: "Advance Week",
  practice_emphasis_set: "Set Practice Emphasis",
  recruit_action: "Recruit Action",
  portal_action: "Portal Action",
  staff_action: "Staff Move",
  retention_meeting: "Retention Meeting",
  benefit_allocation: "Benefit Allocation",
  facility_request: "Facility Request",
  game_plan_set: "Game Plan",
};
function actionTypeLabel(t) { return ACTION_TYPE_LABEL[t] || (t || "Action").replace(/_/g, " "); }

function recentActionsPanel() {
  const log = ensureActionLog();
  if (!log || !log.actions.length) {
    return '<div class="agenda-list"><div class="agenda-item"><strong>No actions logged</strong><p>Decisions appear here once you take them.</p></div></div>';
  }
  const actions = window.CGM_ACTION_LOG.recentActions(log, 10);
  const rows = actions.map((a) => {
    const codes = (a.reasonCodes || []).slice(0, 2).join(" · ");
    const weekStr = a.week ? (String(a.week).match(/^Wk\s/i) ? a.week : `Wk ${a.week}`) : "";
    return `<div class="data-row"><div><strong>${a.summary || actionTypeLabel(a.type)}</strong><p style="opacity:0.7;font-size:11px">${actionTypeLabel(a.type)}${weekStr ? " · " + weekStr : ""}${codes ? " · " + codes : ""}</p></div><span class="trait-badge tc-neutral">${a.actorRole || "user"}</span></div>`;
  }).join("");
  return `<div class="data-row"><div><strong>Action log</strong><p style="opacity:0.7">${log.count} total decisions</p></div></div>` + `<div class="data-list">${rows}</div>`;
}

function statLeadersPanel() {
  ensureSeasonState();
  const PSA = window.CGM_PLAYER_STAT_ACCUMULATOR;
  const book = data.seasonState.seasonPlayerBook;
  if (!PSA || !book || !book.gamesIncluded) {
    return '<div class="agenda-list"><div class="agenda-item"><strong>No stats yet</strong><p>Stat leaders populate after the first game.</p></div></div>';
  }
  function renderTop(book, statKey, label, lookup) {
    const top = PSA.topByStat(book, statKey, 5);
    if (!top.length) return "";
    const rows = top.filter((entry) => entry.line[statKey] > 0).map((entry) => {
      const line = entry.line;
      const name = line._name || lookup(entry.id) || entry.id;
      return `<div class="data-row"><span><strong>${name}</strong></span><span class="rating">${line[statKey]}</span></div>`;
    }).join("");
    if (!rows) return "";
    return `<p class="label" style="margin:8px 0 4px">${label}</p><div class="data-list">${rows}</div>`;
  }
  const lookup = (id) => {
    const p = (data.playerProfiles || []).find((x) => x.id === id);
    return p ? p.name : null;
  };
  return [
    renderTop(book.passers, "yards", "Passing Yards", lookup),
    renderTop(book.passers, "td", "Passing TDs", lookup),
    renderTop(book.rushers, "yards", "Rushing Yards", lookup),
    renderTop(book.rushers, "td", "Rushing TDs", lookup),
    renderTop(book.receivers, "yards", "Receiving Yards", lookup),
    renderTop(book.receivers, "rec", "Receptions", lookup),
    renderTop(book.defenders, "sacks", "Sacks", lookup),
    renderTop(book.defenders, "ints", "Interceptions", lookup),
  ].filter(Boolean).join("");
}

function teamStatsPanel(scope) {
  ensureSeasonState();
  const TAX = window.CGM_STAT_TAXONOMY;
  const ACC = window.CGM_STAT_ACCUMULATOR;
  if (!TAX || !ACC) {
    return '<div class="agenda-list"><div class="agenda-item"><strong>Stats engine not loaded</strong><p>Reload the page.</p></div></div>';
  }
  const lookSeason = scope === "season";
  const book = lookSeason ? data.seasonState.seasonStatBook : data.seasonState.lastGameBook;
  if (!book) {
    return `<div class="agenda-list"><div class="agenda-item"><strong>No ${scope} stats yet</strong><p>${lookSeason ? "Play your first game to start the season book." : "Last game stats will populate after the next simulated game."}</p></div></div>`;
  }
  const myProgram = programById(career.programId);
  let ourLine, oppLine, ourLabel, oppLabel;
  if (lookSeason) {
    ourLine = book.our; oppLine = book.opp;
    ourLabel = myProgram.shortName; oppLabel = "Opponents";
  } else {
    const ourIsHome = book.meta.homeTeamId === myProgram.id;
    ourLine = ourIsHome ? book.home : book.away;
    oppLine = ourIsHome ? book.away : book.home;
    ourLabel = myProgram.shortName;
    oppLabel = ourIsHome ? book.meta.awayTeamName || "Opponent" : book.meta.homeTeamName || "Opponent";
  }

  const STAT_GROUPS = [
    { label: "Scoring",  ids: ["points","touchdowns","passing_touchdowns","rushing_touchdowns","field_goals_made"] },
    { label: "Offense",  ids: ["total_yards","total_plays","yards_per_play","turnovers"] },
    { label: "Passing",  ids: ["team_pass_attempts","team_pass_completions","team_completion_pct","team_passing_yards","team_interceptions_thrown"] },
    { label: "Rushing",  ids: ["team_rush_attempts","team_rushing_yards","team_yards_per_rush"] },
    { label: "Defense",  ids: ["yards_allowed","turnovers_forced","sacks"] },
    { label: "Discipline", ids: ["penalties_count","penalty_yards"] },
    { label: "Drives",   ids: ["drives","points_per_drive"] },
  ];

  function valueFor(line, statId) {
    const def = TAX.getStat(statId);
    if (!def) return null;
    if (def.aggregation === "derived") return ACC.deriveValue(line, statId);
    return line[statId];
  }

  const groupHtml = STAT_GROUPS.map((group) => {
    const rows = group.ids.map((id) => {
      const def = TAX.getStat(id);
      if (!def) return "";
      const ourVal = valueFor(ourLine, id);
      const oppVal = valueFor(oppLine, id);
      return `<div class="data-row"><span>${def.displayName}</span><span class="rating">${TAX.formatStatValue(def, ourVal)}</span><span style="opacity:0.55">vs ${TAX.formatStatValue(def, oppVal)}</span></div>`;
    }).join("");
    return `<p class="label" style="margin:10px 0 4px">${group.label}</p><div class="data-list">${rows}</div>`;
  }).join("");
  const header = lookSeason
    ? `<div class="data-row"><div><strong>Season Through Week ${book.gamesIncluded || 0}</strong><p style="opacity:0.7">${ourLabel} totals vs accumulated opponent totals</p></div></div>`
    : `<div class="data-row"><div><strong>${ourLabel} vs ${oppLabel}</strong><p style="opacity:0.7">Last completed game</p></div></div>`;
  return header + groupHtml;
}

function devReportPanel() {
  ensureCultureState();
  const report = data.cultureState.developmentReport;
  if (!report || !Number.isFinite(report.week)) {
    return '<div class="agenda-list"><div class="agenda-item"><strong>No development data yet</strong><p>Advance one week with a roster active to see breakouts/regressions.</p></div></div>';
  }
  const summaryRow = `<div class="data-row"><div><strong>Week ${report.week}</strong><p style="opacity:0.7">Last weekly dev tick</p></div><span class="rating">${report.breakouts}↑ ${report.regressions}↓</span></div>`;
  const statRows = [
    ["Breakouts", report.breakouts || 0],
    ["Regressions", report.regressions || 0],
    ["Stagnations", report.stagnations || 0],
  ].map(([k, v]) => `<div class="data-row"><span>${k}</span><span class="rating">${v}</span></div>`).join("");
  const breakoutList = (report.breakoutNames || []).slice(0, 4).map((name) =>
    `<div class="data-row"><div><strong>${name}</strong><p style="opacity:0.7">Breakout week</p></div><span class="trait-badge tc-pos">Up</span></div>`
  ).join("") || `<div class="data-row"><span>—</span><span style="opacity:0.5">No breakouts this week</span></div>`;
  const regressionList = (report.regressionNames || []).slice(0, 4).map((name) =>
    `<div class="data-row"><div><strong>${name}</strong><p style="opacity:0.7">Late-career decline</p></div><span class="trait-badge tc-neutral">Down</span></div>`
  ).join("") || `<div class="data-row"><span>—</span><span style="opacity:0.5">No regressions this week</span></div>`;
  return `<div class="data-list">${summaryRow}${statRows}</div>
    <p class="label" style="margin:10px 0 6px">Breakouts</p>
    <div class="data-list">${breakoutList}</div>
    <p class="label" style="margin:10px 0 6px">Regressions</p>
    <div class="data-list">${regressionList}</div>`;
}

function whyPanel() {
  ensureSeasonState();
  const rollup = data.seasonState.lastReasonCodes;
  const M = window.CGM_MATCHUP;
  if (!rollup || !Object.keys(rollup).length) {
    return '<div class="agenda-list"><div class="agenda-item"><strong>No matchup data yet</strong><p>Reason codes populate after the next simulated game.</p></div></div>';
  }
  const sorted = Object.entries(rollup).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const rows = sorted.map(([code, count]) => {
    const text = M ? M.reasonText(code) : code;
    const def = M && M.REASON_CODES[code];
    const sideBadge = def ? `<span class="trait-badge tc-${def.side === 'offense' ? 'pos' : 'neutral'}">${def.side}</span>` : "";
    return `<div class="data-row"><div><strong>${text}</strong> ${sideBadge}<p style="opacity:0.6;font-size:11px">${code}</p></div><span class="rating">${count}x</span></div>`;
  }).join("");
  return `<div class="data-list">${rows}</div>`;
}

function opponentTendencyRows() {
  ensureSeasonState();
  const header = [["Signal", "Value"]];
  if (!Array.isArray(data.seasonState.lastOpponentTendencies) || !data.seasonState.lastOpponentTendencies.length) {
    const game = scheduleRowToGameContext(data.schedule[data.seasonState.currentGameIndex] || data.schedule[0], data.seasonState.currentGameIndex || 0);
    const tendencies = opponentTendencyProfile(game);
    return [
      ...header,
      ["Run rate", `${tendencies.runRate}%`],
      ["Pass rate", `${tendencies.passRate}%`],
      ["Pace", String(tendencies.pace)],
      ["Blitz", `${tendencies.blitzRate}%`],
    ];
  }
  return [...header, ...data.seasonState.lastOpponentTendencies];
}

function tacticalControlPanel() {
  ensureSeasonState();
  const profile = data.seasonState.tacticalProfile;
  const buttons = TACTICAL_PROFILES
    .map((entry) => `<button class="small-action${entry === profile ? " secondary" : ""}" data-set-tactic="${entry}">${entry}</button>`)
    .join("");
  return `<div class="agenda-list">
    <div class="agenda-item">
      <time>Active Profile</time>
      <strong>${profile}</strong>
      <p>Aggressive pushes offense and variance; Conservative protects defense and pace.</p>
      <div class="chip-row">${buttons}</div>
    </div>
    <div class="agenda-item">
      <time>M8 Impact Gate</time>
      <strong>Tactical changes should shift game shape</strong>
      <p>Current mode directly changes drive scoring thresholds and volatility.</p>
    </div>
  </div>`;
}

function tempoPanel() {
  ensureSeasonState();
  const current = data.seasonState.tempoProfile;
  const det = TEMPO_DETAILS[current] || TEMPO_DETAILS.Balanced;
  const buttons = TEMPO_PROFILES
    .map((t) => `<button class="small-action${t === current ? " secondary" : ""}" data-set-tempo="${t}">${t}</button>`)
    .join("");
  return `<div class="agenda-list">
    <div class="agenda-item">
      <time>Active Tempo</time>
      <strong>${current}</strong>
      <p>${det.desc}</p>
      <div class="chip-row">${buttons}</div>
    </div>
    <div class="agenda-item">
      <time>Plays / Game</time>
      <strong>~${det.plays}</strong>
      <p>${det.fatigueNote}</p>
    </div>
    <div class="agenda-item">
      <time>Recruit Appeal</time>
      <strong>${det.schemeTag}</strong>
      <p>${det.recruitNote}</p>
    </div>
  </div>`;
}

function alphaHardeningRows() {
  ensureSeasonState();
  const header = [["Check", "Value", "Target", "Status"]];
  const report = data.seasonState.lastHardeningReport;
  if (!report) {
    return [
      ...header,
      ["Hardening report", "Not run", "Run check", "Pending"],
      ["Performance", "-", "<= 4.0 ms / game", "Pending"],
      ["Tactical spread", "-", ">= 6 total points", "Pending"],
    ];
  }
  return [
    ...header,
    ["Tick", report.tick, "Current", "Info"],
    ["Performance", `${report.perf.perGameMs} ms/game`, "<= 4.0", report.perf.pass ? "Pass" : "Review"],
    ["Tactical spread", `${report.calibration.spread} pts`, ">= 6", report.calibration.pass ? "Pass" : "Review"],
    ["Overall", report.pass ? "Pass" : "Review", "Pass", report.pass ? "Pass" : "Review"],
  ];
}

function alphaHardeningPanel() {
  ensureSeasonState();
  const report = data.seasonState.lastHardeningReport;
  const summary = hardeningCore().buildHardeningSummary(report);
  const details = report
    ? `<div class="agenda-item"><strong>Balanced/Agg/Cons avg totals</strong><p>${summary.details}</p></div>`
    : '<div class="agenda-item"><strong>No report yet</strong><p>Run a check to generate calibration and performance evidence.</p></div>';
  return `<div class="agenda-list">
    <div class="agenda-item">
      <time>M9 Alpha Hardening</time>
      <strong>${report ? summary.label : "Pending"}</strong>
      <p>Runs performance guardrail and tactical-impact calibration against deterministic simulation.</p>
      <button class="small-action" data-run-hardening="m9">Run Hardening Check</button>
    </div>
    ${details}
  </div>`;
}

function createProspectId(seed, index) {
  return `prospect-gen-${seed.replace(/[^a-z0-9]+/gi, "").toLowerCase()}-${index}`;
}

function weightedNeedForPosition(position) {
  const holes = vm("futureHoles").slice(1);
  const row = holes.find((entry) => entry[0] === position || (position === "HB" && entry[0] === "RB"));
  if (!row) return 6;
  const need = row[3];
  return POSITION_NEED_WEIGHT[need] || 7;
}

function prospectArchetypeForPosition(position, random) {
  const list = PROSPECT_ARCHETYPES[position] || PROSPECT_ARCHETYPES["WR"];
  return list[seededRange(random, 0, list.length - 1)];
}

function prospectTrueRating(starBand, devCurve, random) {
  // 3-star: 55-70, 4-star: 68-82, 5-star: 80-95; Late bloomers skew lower now
  const base = starBand === 5 ? seededRange(random, 80, 95)
    : starBand === 4 ? seededRange(random, 68, 82)
    : seededRange(random, 55, 70);
  const curveAdj = devCurve === "Early" ? 2 : devCurve === "Late" ? -4 : devCurve === "BoomBust" ? seededRange(random, -6, 6) : 0;
  return Math.max(45, Math.min(99, base + curveAdj));
}

function prospectPotentialGrade(starBand, trueRating, devCurve) {
  if (devCurve === "Late" && trueRating < 65) {
    const idx = starBand - 3 + 2; // 3-star Late → index 2 (Solid Starter upside)
    return POTENTIAL_GRADES[Math.min(idx + 1, POTENTIAL_GRADES.length - 1)];
  }
  if (starBand === 5) return trueRating >= 90 ? "Generational" : "NFL Upside";
  if (starBand === 4) return trueRating >= 80 ? "All-American Upside" : "All-Conference Upside";
  return trueRating >= 70 ? "Solid Starter" : "Serviceable";
}

function prospectPreferences(archetype, random) {
  const base = archetype.pref;
  const keys = Object.keys(base);
  const result = {};
  keys.forEach((k) => {
    result[k] = Math.max(0.1, Math.min(1.0, base[k] + (seededRange(random, -12, 12) / 100)));
  });
  return result;
}

function prospectInterestFromPreferences(preferences, programProfile) {
  // programProfile: {prestige(1-20), nilPool(M$), playingTimeOpen(bool), schemeFit(0-1), coachRep(1-20), winPct(0-1)}
  const prestige = programProfile.prestige || 10;
  const nil = Math.min(1, (programProfile.nilPool || 1) / 4); // 4M = full score
  const playingTime = programProfile.playingTimeOpen ? 0.9 : 0.4;
  const scheme = programProfile.schemeFit || 0.5;
  const coachRep = (programProfile.coachRep || 10) / 20;
  const winning = programProfile.winPct || 0.5;
  // Distance: assume medium distance by default (0.5)
  const distance = 0.5;

  const score =
    preferences.prestige * prestige / 20 * 25 +
    preferences.nil * nil * 20 +
    preferences.playingTime * playingTime * 20 +
    preferences.scheme * scheme * 15 +
    preferences.coach * coachRep * 12 +
    preferences.winning * winning * 10 +
    preferences.distance * distance * 8;

  return Math.max(8, Math.min(94, Math.round(score)));
}

function synthesizeProspects(seed, count) {
  const random = createSeededRandom(`${seed}:prospects`);
  const generated = [];
  for (let index = 0; index < count; index += 1) {
    const first = PROSPECT_FIRST_NAMES[seededRange(random, 0, PROSPECT_FIRST_NAMES.length - 1)];
    const last = PROSPECT_LAST_NAMES[seededRange(random, 0, PROSPECT_LAST_NAMES.length - 1)];
    const position = PROSPECT_POSITIONS[seededRange(random, 0, PROSPECT_POSITIONS.length - 1)];
    const starBand = seededRange(random, 3, 5);
    const stars = `${starBand}-star`;
    const region = PROSPECT_REGIONS[index % PROSPECT_REGIONS.length];
    const needFit = Math.max(35, Math.min(99, weightedNeedForPosition(position) + seededRange(random, -10, 15)));

    // Archetype drives dev curve, preferences, and true rating
    const archetype = prospectArchetypeForPosition(position, random);
    const trueRating = prospectTrueRating(starBand, archetype.devCurve, random);
    const potentialGrade = prospectPotentialGrade(starBand, trueRating, archetype.devCurve);
    const preferences = prospectPreferences(archetype, random);

    // Generate per-program interest from preferences + program profile
    const progProfile = career && career.generatedProfile ? {
      prestige: career.generatedProfile.prestige,
      nilPool: Number(career.generatedProfile.nilPool) || 1,
      playingTimeOpen: needFit >= 65,
      schemeFit: seededRange(random, 30, 85) / 100,
      coachRep: career.generatedProfile.prestige,
      winPct: seededRange(random, 30, 70) / 100,
    } : { prestige: 10, nilPool: 1, playingTimeOpen: false, schemeFit: 0.5, coachRep: 10, winPct: 0.5 };

    const interest = prospectInterestFromPreferences(preferences, progProfile);

    // Scouted rating: range around trueRating narrowed by scoutConfidence
    const scoutConfidence = seededRange(random, 28, 68);
    const scoutSpread = Math.max(3, Math.round((100 - scoutConfidence) * 0.18));
    const scoutedLow = Math.max(45, trueRating - scoutSpread);
    const scoutedHigh = Math.min(99, trueRating + scoutSpread);

    const grade = Math.max(70, Math.min(95, seededRange(random, 74, 93) + (starBand - 4) * 2));
    const priority = needFit >= 80 ? "Tier 1" : needFit >= 60 ? "Tier 2" : "Tier 3";
    const classYear = index % 5 === 0 ? "HS JR" : "HS SR";
    const agentType = PROSPECT_AGENT_TYPES[seededRange(random, 0, PROSPECT_AGENT_TYPES.length - 1)];
    const demandScore = seededRange(random, 6, 17);
    const leverageScore = seededRange(random, 5, 16);

    // Hidden personality traits
    const hidden = {
      loyalty: seededRange(random, 5, 18),
      ambition: seededRange(random, 5, 18),
      coachability: seededRange(random, 5, 18),
      workEthic: seededRange(random, 5, 18),
      familyInfluence: seededRange(random, 5, 18),
    };

    generated.push({
      id: createProspectId(seed, index),
      name: `${first} ${last}`,
      position,
      stars,
      interest,
      grade,
      pipeline: region,
      status: "Open recruitment",
      scoutConfidence,
      needFit,
      commitChance: Math.max(5, Math.min(95, Math.floor((interest * 0.45) + (scoutConfidence * 0.25) + (needFit * 0.3)))),
      commitmentStatus: "Open",
      offered: false,
      visited: false,
      committedToUs: false,
      priority,
      classYear,
      agentType,
      demandScore,
      leverageScore,
      // Archetype + development
      archetype: archetype.name,
      devCurve: DEV_CURVE_LABELS[archetype.devCurve] || archetype.devCurve,
      potentialGrade,
      trueRating,
      scoutedLow,
      scoutedHigh,
      preferences,
      hidden,
      // Recruiting tracking
      topSchools: [],
      visitHistory: [],
      promisesMade: [],
      flipRisk: 0,
      rivalInterest: seededRange(random, 20, 75),
    });
  }
  return generated;
}

// ── Procedural Roster Fill ──────────────────────────────────────────────────
// Realistic CFB roster composition (procedural fill targets).
// Total target ~75. The 6 named demo players occupy slots; the rest are filled.
const ROSTER_COMPOSITION_TARGET = {
  QB: 4, HB: 5, WR: 9, TE: 4,
  LT: 2, OT: 3, OG: 4, C: 2,
  EDGE: 4, DE: 3, DT: 5,
  LB: 8, CB: 6, S: 5,
  K: 2, P: 1, LS: 1,
};
const ROSTER_SCHEME_FITS_BY_POS = {
  QB: ["Spread Option A", "Pro Style B+", "Air Raid A-", "RPO B+", "Power Run B"],
  HB: ["Outside Zone A", "Inside Zone B+", "Power Gap A-", "Stretch Run B", "Three-Down Back A"],
  WR: ["Slot Motion A", "Boundary X A-", "Field Z B+", "Run-After-Catch A", "Vertical Stems B"],
  TE: ["Y In-Line A", "Move TE B+", "Big-Slot A-", "H-Back B"],
  LT: ["Pass Pro A", "Zone Anchor B+", "Power Combo B"],
  OT: ["Pass Pro A-", "Zone Anchor B+", "Power Combo B"],
  OG: ["Pull/Trap A", "Combo Block B+", "Anchor B"],
  C:  ["Line Communicator A", "Zone Reach B+"],
  EDGE: ["Wide-9 A", "Stand-Up Rush A-", "5-Tech B+", "Gap-Set B"],
  DE: ["5-Tech A-", "Closed Edge B+", "Stunt B"],
  DT: ["1-Tech A", "3-Tech A-", "Nose B+"],
  LB: ["Mike A", "Will B+", "Sam B", "Dime Backer A-"],
  CB: ["Boundary Press A", "Field Zone A-", "Slot Nickel B+", "Pattern Match B"],
  S:  ["Single-High A", "Strong Box B+", "Robber B", "Two-High A-"],
  K:  ["Power Leg A", "Accuracy Specialist A-"],
  P:  ["Hangtime A", "Directional B+"],
  LS: ["Veteran Snapper A"],
};
const ROSTER_ARCHETYPE_FALLBACK = {
  QB: "Pocket Distributor", HB: "Workhorse", WR: "Route Technician", TE: "Y In-Line",
  LT: "Pass Protector", OT: "Pass Protector", OG: "Road Grader", C: "Road Grader",
  EDGE: "Edge Rusher", DE: "Power End", DT: "Interior Disruptor",
  LB: "Coverage Backer", CB: "Zone Corner", S: "Centerfield Safety",
  K: "Accuracy Specialist", P: "Hangtime Specialist", LS: "Veteran Snapper",
};
const ROSTER_DEV_FOCI = ["Technique", "Strength", "Film Study", "Conditioning"];

// Pick a dev focus weighted by position so the Individual Plans table doesn't
// show "Technique" for everyone. Each position has 2-3 plausible foci with
// weighted likelihoods.
const DEV_FOCUS_BY_POSITION = {
  QB: ["Film Study", "Film Study", "Film Study", "Conditioning", "Technique"],
  HB: ["Strength", "Conditioning", "Strength", "Strength", "Technique"],
  FB: ["Strength", "Strength", "Conditioning"],
  WR: ["Conditioning", "Conditioning", "Film Study", "Technique", "Film Study"],
  TE: ["Strength", "Film Study", "Strength", "Technique"],
  LT: ["Strength", "Strength", "Technique"], OT: ["Strength", "Strength", "Technique"],
  OG: ["Strength", "Strength", "Strength", "Technique"], C: ["Film Study", "Film Study", "Strength", "Technique"],
  EDGE: ["Strength", "Conditioning", "Strength", "Technique"], DE: ["Strength", "Strength", "Technique"],
  DT: ["Strength", "Strength", "Strength", "Conditioning"],
  LB: ["Film Study", "Film Study", "Conditioning", "Strength", "Technique"],
  CB: ["Conditioning", "Conditioning", "Film Study", "Technique"],
  S: ["Film Study", "Film Study", "Conditioning", "Technique"], DB: ["Film Study", "Conditioning", "Technique"],
  K: ["Technique"], P: ["Technique"], LS: ["Technique"],
};
function pickDevFocusForPosition(position, random) {
  const pool = DEV_FOCUS_BY_POSITION[position] || ROSTER_DEV_FOCI;
  return pool[seededRange(random, 0, pool.length - 1)];
}

function rosterClassYearForDepth(random, depthIndex) {
  // Starters skew older; deep depth skews younger.
  const r = seededRange(random, 1, 100);
  if (depthIndex === 0) return r <= 10 ? "FR" : r <= 30 ? "SO" : r <= 65 ? "JR" : "SR";
  if (depthIndex === 1) return r <= 25 ? "FR" : r <= 55 ? "SO" : r <= 80 ? "JR" : "SR";
  return r <= 45 ? "FR" : r <= 75 ? "SO" : r <= 92 ? "JR" : "SR";
}

function rosterOvrForDepth(depthIndex, random, programRating) {
  // Reference rating 75 = unscaled bands. Each rating point shifts ±0.55 OVR.
  // Alabama (92) → starters land 78-91 + 9 = 87-99. Akron (52) → 78-91 - 13 = 65-78.
  const tierShift = Math.round(((programRating || 75) - 75) * 0.55);
  const clamp = (lo, hi, v) => Math.max(lo, Math.min(hi, v));
  if (depthIndex === 0) return clamp(50, 99, seededRange(random, 78, 91) + tierShift);
  if (depthIndex === 1) return clamp(45, 95, seededRange(random, 70, 82) + tierShift);
  if (depthIndex === 2) return clamp(45, 92, seededRange(random, 60, 74) + tierShift);
  return clamp(40, 88, seededRange(random, 52, 68) + tierShift);
}

function rosterPotentialGrade(pot) {
  if (pot >= 92) return "All-American Upside";
  if (pot >= 86) return "Solid Starter";
  if (pot >= 78) return "Serviceable";
  if (pot >= 70) return "Backup/Depth";
  return "Special Teams Floor";
}

function buildProceduralRosterPlayer(seed, position, depthIndex, slotKey, programRating) {
  const random = createSeededRandom(`${seed}:roster:${position}:${slotKey}`);
  const first = PROSPECT_FIRST_NAMES[seededRange(random, 0, PROSPECT_FIRST_NAMES.length - 1)];
  const last = PROSPECT_LAST_NAMES[seededRange(random, 0, PROSPECT_LAST_NAMES.length - 1)];
  const year = rosterClassYearForDepth(random, depthIndex);
  const ovr = rosterOvrForDepth(depthIndex, random, programRating);
  const archetypeOpt = (PROSPECT_ARCHETYPES[position] && PROSPECT_ARCHETYPES[position].length)
    ? PROSPECT_ARCHETYPES[position][seededRange(random, 0, PROSPECT_ARCHETYPES[position].length - 1)]
    : { name: ROSTER_ARCHETYPE_FALLBACK[position] || "General", devCurve: "Steady" };
  const devCurveKey = archetypeOpt.devCurve || "Steady";
  const devCurveLabel = DEV_CURVE_LABELS[devCurveKey] || devCurveKey;
  const ceilingBoost = devCurveKey === "Late" ? seededRange(random, 8, 16)
    : devCurveKey === "BoomBust" ? seededRange(random, -2, 16)
    : devCurveKey === "Early" ? seededRange(random, 2, 6)
    : seededRange(random, 4, 9);
  const pot = Math.max(ovr, Math.min(99, ovr + ceilingBoost));
  const remainingSeasons = year === "SR" ? 1 : year === "JR" ? 2 : year === "SO" ? 3 : 4;
  const seasonsPlayed = 4 - remainingSeasons;
  const schemeFits = ROSTER_SCHEME_FITS_BY_POS[position] || ["Standard B"];
  const schemeFit = schemeFits[seededRange(random, 0, schemeFits.length - 1)];
  const academic = seededRange(random, 1, 100) <= 88 ? "On track" : "Tutor assigned";
  const transferRisk = (() => {
    const r = seededRange(random, 1, 100);
    // Re-tuned (audit fix #11): default population was 30% HIGH risk on day 1.
    // Now: starters mostly Low, depth chart further down skews Medium not High.
    if (depthIndex === 0) return r <= 80 ? "Low" : r <= 96 ? "Medium" : "High";
    if (depthIndex === 1) return r <= 65 ? "Low" : r <= 92 ? "Medium" : "High";
    return r <= 50 ? "Low" : r <= 88 ? "Medium" : "High";
  })();
  const morale = (() => {
    const r = seededRange(random, 1, 100);
    return r <= 55 ? "High" : r <= 88 ? "Stable" : "Low";
  })();
  const redshirtIntent = year === "FR" && depthIndex >= 2 ? "Preserve" : "No Redshirt";
  // Generate base attrs/posAttrs/hidden up front so they're seeded by the slot key.
  const attrs = playerDefaultGenericAttrs(position, ovr, random);
  const posAttrs = playerDefaultPosAttrs(position, ovr, random);
  const hidden = playerDefaultHidden(random);
  return {
    id: `player-proc-${position.toLowerCase()}-${slotKey}-${String(seed).replace(/[^a-z0-9]/gi, "").slice(0, 8) || "world"}`,
    name: `${first} ${last}`,
    position,
    positions: [position],
    year,
    ovr,
    pot,
    schemeFit,
    archetype: archetypeOpt.name,
    academicStatus: academic,
    transferRisk,
    morale,
    developmentFocus: pickDevFocusForPosition(position, random),
    redshirtIntent,
    devCurve: devCurveLabel,
    potentialGrade: rosterPotentialGrade(pot),
    hidden,
    attrs,
    posAttrs,
    eligibility: {
      seasonsPlayed,
      remainingSeasons,
      gamesPlayedThisSeason: 0,
      redshirtUsed: false,
    },
    _procedural: true,
  };
}

function rebuildLegacyRosterRows() {
  // Mirror playerProfiles into the legacy data.roster 5-tuple table used by the
  // Program Home "Roster Snapshot" panel and other tuple-shaped readers. Only
  // top players per position appear; deeper depth lives only in playerProfiles.
  if (!Array.isArray(data.playerProfiles)) return;
  const byPos = {};
  data.playerProfiles.forEach((p) => {
    if (!byPos[p.position]) byPos[p.position] = [];
    byPos[p.position].push(p);
  });
  const order = ["QB","HB","WR","TE","LT","OT","OG","C","EDGE","DE","DT","LB","CB","S","K","P","LS"];
  const rows = [];
  order.forEach((pos) => {
    const list = (byPos[pos] || []).slice().sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
    list.slice(0, pos === "QB" || pos === "HB" || pos === "TE" ? 1 : 2).forEach((p) => {
      const note = p.archetype || p.schemeFit || "Depth";
      rows.push([p.position, p.name, p.year, String(p.ovr), note]);
    });
  });
  data.roster = rows;
}

function synthesizeRosterFill(seed) {
  if (!Array.isArray(data.playerProfiles)) data.playerProfiles = [];
  // Pull the player's program rating so OVR distribution reflects team strength.
  const myProg = programs.find((p) => p.id === career.programId);
  const programRating = myProg && Number.isFinite(myProg.programRating)
    ? myProg.programRating
    : (myProg && Number.isFinite(myProg.basePrestige) ? myProg.basePrestige : 75);
  const counts = {};
  data.playerProfiles.forEach((p) => { counts[p.position] = (counts[p.position] || 0) + 1; });
  const usedNames = new Set(data.playerProfiles.map((p) => p.name));
  Object.entries(ROSTER_COMPOSITION_TARGET).forEach(([pos, target]) => {
    let depthIndex = counts[pos] || 0;
    let slot = depthIndex;
    let guard = 0;
    while ((counts[pos] || 0) < target && guard < 50) {
      const slotKey = `${pos}-${slot}-${guard}`;
      const player = buildProceduralRosterPlayer(seed, pos, depthIndex, slotKey, programRating);
      if (!usedNames.has(player.name)) {
        usedNames.add(player.name);
        data.playerProfiles.push(player);
        counts[pos] = (counts[pos] || 0) + 1;
        depthIndex += 1;
        slot += 1;
      }
      guard += 1;
    }
  });
  rebuildLegacyRosterRows();
}

// ── Lazy opponent roster generator ──────────────────────────────────────────
// Per MATCHUP-1/2 wiring: the matchup engine needs both teams' rosters. The
// player's roster is fully procedural (synthesizeRosterFill); other 133 FBS
// teams generate on demand using the same builder, scaled to their own
// programRating, and cached on `data.opponentRosters` keyed by team id so
// repeated games inside one season see a stable opponent.
function ensureOpponentRosterCache() {
  if (!isRecord(data.opponentRosters)) data.opponentRosters = {};
}

function rosterForOpponentName(opponentName) {
  if (!isNonEmptyString(opponentName)) return [];
  ensureOpponentRosterCache();
  const cleanName = String(opponentName).replace(/^at\s+/i, "").trim();
  // Resolve to a program record by shortName (FBS pack uses short names in
  // schedule rows). If unknown (fictional opponent), fall back to a synthetic
  // 75-OVR program rating so the matchup engine still produces a sane result.
  const program = programs.find((p) => p.shortName === cleanName)
    || programs.find((p) => p.name === cleanName)
    || null;
  const cacheKey = program ? program.id : `unknown:${cleanName}`;
  if (Array.isArray(data.opponentRosters[cacheKey]) && data.opponentRosters[cacheKey].length) {
    return data.opponentRosters[cacheKey];
  }
  const programRating = program && Number.isFinite(program.programRating)
    ? program.programRating
    : (program && Number.isFinite(program.basePrestige) ? program.basePrestige : 70);
  const oppSeed = `${career.seed}:opp:${cacheKey}`;
  const roster = [];
  Object.entries(ROSTER_COMPOSITION_TARGET).forEach(([pos, target]) => {
    for (let depthIndex = 0; depthIndex < target; depthIndex += 1) {
      const slotKey = `${pos}-${depthIndex}-0`;
      roster.push(buildProceduralRosterPlayer(oppSeed, pos, depthIndex, slotKey, programRating));
    }
  });
  data.opponentRosters[cacheKey] = roster;
  return roster;
}

// ── Procedural World Fill ───────────────────────────────────────────────────
// Expand the demo's tiny world (3 programs / 5 schedule / 5 standings) into a
// believable national landscape: a 12-team conference, a 25-team national poll,
// and a 12-game regular-season schedule. All deterministic from career.seed.
const FICTIONAL_PROGRAM_PREFIXES = [
  "Pacific", "Atlantic", "Cascade", "Sierra", "Granite", "Crescent",
  "Bayfield", "Hilltop", "Riverside", "Lakeside", "Pine Valley", "Cedar",
  "Iron Range", "Sundown", "Western", "Eastern", "Northern", "Southern",
  "Heartland", "Gulf Shore", "Liberty", "Capitol", "Frontier", "Summit",
  "Fairview", "Brookline", "Stonewall", "Marshfield", "Harbor", "Aurora",
];
const FICTIONAL_PROGRAM_SUFFIXES = [
  "State", "Tech", "A&M", "College", "University", "Christian", "Methodist",
  "Polytechnic", "Catholic", "Maritime", "Mining", "Pacific",
];
const PROGRAM_RATING_GRADE = (rating) => rating >= 92 ? "A+" : rating >= 88 ? "A" : rating >= 84 ? "A-" : rating >= 80 ? "B+" : rating >= 76 ? "B" : rating >= 72 ? "B-" : rating >= 68 ? "C+" : "C";

function generateFictionalProgramName(random, used) {
  let guard = 0;
  while (guard < 60) {
    const prefix = FICTIONAL_PROGRAM_PREFIXES[seededRange(random, 0, FICTIONAL_PROGRAM_PREFIXES.length - 1)];
    const suffix = FICTIONAL_PROGRAM_SUFFIXES[seededRange(random, 0, FICTIONAL_PROGRAM_SUFFIXES.length - 1)];
    const name = `${prefix} ${suffix}`;
    if (!used.has(name)) {
      used.add(name);
      return name;
    }
    guard += 1;
  }
  return `Program ${used.size + 1}`;
}

function expandConferenceStandings(seed, targetSize) {
  if (!Array.isArray(data.standings)) data.standings = [];
  if (data.standings.length >= targetSize) return;
  const random = createSeededRandom(`${seed}:conference`);
  const used = new Set(data.standings.map((row) => row[1]));
  while (data.standings.length < targetSize) {
    const name = generateFictionalProgramName(random, used);
    const rating = seededRange(random, 62, 84);
    data.standings.push([
      String(data.standings.length + 1),
      name,
      "0-0",
      String(rating),
      PROGRAM_RATING_GRADE(rating),
    ]);
  }
}

function expandNationalRankings(seed, targetSize) {
  if (!isRecord(data.viewModels)) data.viewModels = {};
  if (!Array.isArray(data.viewModels.nationalTop10)) {
    data.viewModels.nationalTop10 = [["#", "Program", "Record", "Rating", "Trend"]];
  }
  const header = data.viewModels.nationalTop10[0];
  const existingRows = data.viewModels.nationalTop10.slice(1);
  if (existingRows.length >= targetSize) return;
  const random = createSeededRandom(`${seed}:rankings`);
  const used = new Set(existingRows.map((row) => row[1]));
  // Seed rankings with conference teams so the player's own and their league
  // appear in the national poll picture.
  (data.standings || []).forEach((row) => {
    if (used.has(row[1])) return;
    used.add(row[1]);
    const rating = Number(row[3]) || seededRange(random, 60, 90);
    existingRows.push([String(existingRows.length + 1), row[1], "0-0", String(rating), "-"]);
  });
  while (existingRows.length < targetSize) {
    const name = generateFictionalProgramName(random, used);
    const rating = seededRange(random, 70, 96);
    existingRows.push([String(existingRows.length + 1), name, "0-0", String(rating), "-"]);
  }
  // Sort by rating DESC and renumber so the poll feels real.
  existingRows.sort((a, b) => Number(b[3]) - Number(a[3]));
  existingRows.forEach((row, i) => { row[0] = String(i + 1); });
  data.viewModels.nationalTop10 = [header, ...existingRows];
}

const SEASON_DATE_LABELS = [
  "Aug 30", "Sep 6", "Sep 13", "Sep 20", "Sep 27",
  "Oct 4", "Oct 11", "Oct 18", "Oct 25",
  "Nov 1", "Nov 8", "Nov 15", "Nov 22", "Nov 29",
];

function expandSeasonSchedule(seed, targetSize) {
  if (!Array.isArray(data.schedule)) data.schedule = [];
  if (data.schedule.length >= targetSize) return;
  const random = createSeededRandom(`${seed}:schedule`);
  const ourName = (programs.find((p) => p.id === career.programId) || programs[0] || { shortName: "Lakeview" }).shortName;
  const usedOpponents = new Set();
  data.schedule.forEach((row) => {
    const cleaned = String(row[1]).replace(/^at\s+/i, "");
    usedOpponents.add(cleaned);
  });
  usedOpponents.add(ourName);
  // Pull eligible opponents from the conference + national pool.
  const candidatePool = [];
  (data.standings || []).forEach((row) => candidatePool.push({ name: row[1], rating: Number(row[3]) || 70 }));
  ((data.viewModels && data.viewModels.nationalTop10) || []).slice(1).forEach((row) => {
    candidatePool.push({ name: row[1], rating: Number(row[3]) || 70 });
  });
  // Reserve which dates are already booked.
  const usedDates = new Set(data.schedule.map((row) => row[0]));
  // Walk dates in calendar order and slot in extra opponents.
  for (const dateLabel of SEASON_DATE_LABELS) {
    if (data.schedule.length >= targetSize) break;
    if (usedDates.has(dateLabel)) continue;
    let pickGuard = 0;
    let opponent = null;
    while (pickGuard < 24 && !opponent) {
      const candidate = candidatePool[seededRange(random, 0, candidatePool.length - 1)];
      if (candidate && !usedOpponents.has(candidate.name)) {
        opponent = candidate;
      }
      pickGuard += 1;
    }
    if (!opponent) {
      // Fall back to any unused conference team.
      const fallback = candidatePool.find((c) => !usedOpponents.has(c.name));
      if (!fallback) break;
      opponent = fallback;
    }
    usedOpponents.add(opponent.name);
    const isHome = seededRange(random, 0, 1) === 0;
    const grade = PROGRAM_RATING_GRADE(opponent.rating);
    const note = opponent.rating >= 90 ? "Marquee matchup"
      : opponent.rating >= 84 ? "Conference contender"
      : opponent.rating >= 76 ? "Conference game"
      : "Get-right opportunity";
    data.schedule.push([
      dateLabel,
      isHome ? opponent.name : `at ${opponent.name}`,
      isHome ? "Home" : "Away",
      grade,
      note,
    ]);
    usedDates.add(dateLabel);
  }
  // Sort by canonical season date so games render in calendar order.
  const dateOrder = SEASON_DATE_LABELS.reduce((acc, label, index) => { acc[label] = index; return acc; }, {});
  data.schedule.sort((a, b) => (dateOrder[a[0]] !== undefined ? dateOrder[a[0]] : 99) - (dateOrder[b[0]] !== undefined ? dateOrder[b[0]] : 99));
}

function synthesizeWorldFill(seed) {
  expandConferenceStandings(seed, 12);
  expandNationalRankings(seed, 25);
  expandSeasonSchedule(seed, 12);
}

function normalizeProspect(prospect) {
  if (!isNonEmptyString(prospect.commitmentStatus)) prospect.commitmentStatus = "Open";
  if (!Number.isInteger(prospect.scoutConfidence)) prospect.scoutConfidence = Math.max(30, Math.min(95, prospect.interest || 50));
  if (!Number.isInteger(prospect.needFit)) prospect.needFit = 55;
  if (!Number.isInteger(prospect.commitChance)) {
    prospect.commitChance = Math.max(5, Math.min(95, Math.floor(((prospect.interest || 40) + prospect.scoutConfidence + prospect.needFit) / 3)));
  }
  if (typeof prospect.offered !== "boolean") prospect.offered = false;
  if (typeof prospect.visited !== "boolean") prospect.visited = false;
  if (typeof prospect.committedToUs !== "boolean") prospect.committedToUs = false;
  if (!isNonEmptyString(prospect.priority)) prospect.priority = "Tier 2";
  if (!isNonEmptyString(prospect.classYear)) prospect.classYear = "HS SR";
  // New v2 fields with safe defaults for legacy prospects
  if (!isNonEmptyString(prospect.archetype)) prospect.archetype = "Prospect";
  if (!isNonEmptyString(prospect.devCurve)) prospect.devCurve = "Steady Developer";
  if (!isNonEmptyString(prospect.potentialGrade)) prospect.potentialGrade = "Solid Starter";
  if (!Number.isInteger(prospect.trueRating)) prospect.trueRating = Math.max(55, Math.min(95, (prospect.grade || 75)));
  if (!Number.isInteger(prospect.scoutedLow)) prospect.scoutedLow = Math.max(45, prospect.trueRating - 8);
  if (!Number.isInteger(prospect.scoutedHigh)) prospect.scoutedHigh = Math.min(99, prospect.trueRating + 8);
  if (!isRecord(prospect.preferences)) prospect.preferences = { playingTime:0.8, prestige:0.6, nil:0.5, distance:0.5, scheme:0.7, coach:0.7, winning:0.6 };
  if (!isRecord(prospect.hidden)) prospect.hidden = { loyalty:10, ambition:10, coachability:10, workEthic:10, familyInfluence:10 };
  if (!Array.isArray(prospect.topSchools)) prospect.topSchools = [];
  if (!Array.isArray(prospect.visitHistory)) prospect.visitHistory = [];
  if (!Array.isArray(prospect.promisesMade)) prospect.promisesMade = [];
  if (!Number.isInteger(prospect.flipRisk)) prospect.flipRisk = 0;
  if (!Number.isInteger(prospect.rivalInterest)) prospect.rivalInterest = 40;
}

function ensureProspectPool() {
  if (!Array.isArray(data.prospectProfiles)) data.prospectProfiles = [];
  data.prospectProfiles.forEach((prospect) => normalizeProspect(prospect));
  if (data.prospectProfiles.length >= RECRUITING_POOL_MIN) return;
  const needed = RECRUITING_POOL_MIN - data.prospectProfiles.length;
  const generated = synthesizeProspects(career.seed, needed);
  data.prospectProfiles = [...data.prospectProfiles, ...generated];
}

function syncRecruitRowsFromProspects() {
  const sorted = [...prospects()]
    .sort((a, b) => (b.commitChance || 0) - (a.commitChance || 0))
    .slice(0, 10)
    .map((prospect) => [
      prospect.position,
      prospect.name,
      prospect.stars,
      `${prospect.interest}%`,
      prospect.commitmentStatus === "Committed Lakeview" ? "Committed" : prospect.status,
    ]);
  data.recruits = sorted;
}

function recruitingActionPoints() {
  ensureRecruitingState();
  return data.recruitingState.actionPoints;
}

function resetRecruitingWeekBudget() {
  ensureRecruitingState();
  data.recruitingState.actionPoints = data.recruitingState.maxActionPoints;
  data.recruitingState.weekLabel = currentEvent().weekLabel;
}

function maybeResetRecruitingBudgetForWeek() {
  ensureRecruitingState();
  const week = currentEvent().weekLabel;
  if (data.recruitingState.weekLabel !== week) {
    resetRecruitingWeekBudget();
  }
}

function recalcProspectState(prospect) {
  prospect.interest = Math.max(1, Math.min(99, prospect.interest));
  prospect.scoutConfidence = Math.max(1, Math.min(99, prospect.scoutConfidence));
  prospect.needFit = Math.max(1, Math.min(99, prospect.needFit));
  prospect.commitChance = Math.max(
    1,
    Math.min(99, Math.floor((prospect.interest * 0.45) + (prospect.scoutConfidence * 0.25) + (prospect.needFit * 0.3))),
  );
  if (prospect.commitmentStatus === "Committed Lakeview") {
    prospect.status = "Committed to Lakeview";
    prospect.committedToUs = true;
    return;
  }
  if (prospect.commitmentStatus === "Committed Other") {
    prospect.status = "Committed elsewhere";
    prospect.committedToUs = false;
    return;
  }
  prospect.committedToUs = false;
  if (prospect.visited) {
    prospect.status = "Visit completed";
  } else if (prospect.offered) {
    prospect.status = "Offer active";
  } else {
    prospect.status = "Open recruitment";
  }
}

function applyRecruitingAction(action, prospect) {
  ensureRecruitingState();
  maybeResetRecruitingBudgetForWeek();
  if (prospect.commitmentStatus !== "Open") return false;

  // Handle promise actions (prefix: promise_)
  if (action.startsWith("promise_")) {
    const typeId = action.slice("promise_".length);
    return makeRecruitingPromise(typeId, prospect);
  }

  const cost = RECRUITING_ACTION_COST[action] || 1;
  if (data.recruitingState.actionPoints < cost) return false;
  if (action === "visit" && !prospect.offered) return false;

  ensureProspectAgentFields(prospect);
  const cashCost = prospectNegotiationCost(action, prospect);
  if (!commitBenefits("recruiting", cashCost)) return false;

  data.recruitingState.actionPoints -= cost;
  const random = createSeededRandom(`${career.seed}:${career.advanceCount}:${prospect.id}:${action}`);
  const bonus = recruitingNegotiationBonus(prospect);
  if (action === "scout") {
    prospect.scoutConfidence += seededRange(random, 8, 14) + Math.max(0, Math.floor(bonus / 2));
    // Scouting narrows the range toward the true rating
    const narrow = seededRange(random, 1, 3);
    if (prospect.scoutedLow !== undefined) prospect.scoutedLow = Math.min(prospect.trueRating || prospect.grade, prospect.scoutedLow + narrow);
    if (prospect.scoutedHigh !== undefined) prospect.scoutedHigh = Math.max(prospect.trueRating || prospect.grade, prospect.scoutedHigh - narrow);
    prospect.interest += seededRange(random, 1, 3) + Math.max(0, Math.floor(bonus / 4));
  }
  if (action === "contact") {
    prospect.interest += seededRange(random, 3, 7) + Math.max(0, Math.floor(bonus / 2));
    prospect.scoutConfidence += seededRange(random, 1, 4) + Math.max(0, Math.floor(bonus / 5));
  }
  if (action === "offer") {
    prospect.offered = true;
    prospect.interest += seededRange(random, 6, 10) + Math.max(0, Math.floor(bonus / 2));
  }
  if (action === "visit") {
    prospect.visited = true;
    prospect.visitHistory = Array.isArray(prospect.visitHistory) ? [...prospect.visitHistory, currentEvent().weekLabel] : [currentEvent().weekLabel];
    prospect.interest += seededRange(random, 8, 12) + Math.max(0, bonus);
    prospect.scoutConfidence += seededRange(random, 3, 6) + Math.max(0, Math.floor(bonus / 2));
    // Visiting increases commitment intensity -- narrow range further
    if (prospect.scoutedLow !== undefined) prospect.scoutedLow = Math.min(prospect.trueRating || prospect.grade, prospect.scoutedLow + 2);
    if (prospect.scoutedHigh !== undefined) prospect.scoutedHigh = Math.max(prospect.trueRating || prospect.grade, prospect.scoutedHigh - 2);
  }
  recalcProspectState(prospect);
  prospect.status = `${prospect.status} | ${prospect.agentType} agent (${cashCost}k)`;
  return true;
}

function resolveProspectCommitments() {
  const random = createSeededRandom(`${career.seed}:commit:${career.advanceCount}:${currentEvent().id}`);
  prospects().forEach((prospect) => {
    if (prospect.commitmentStatus !== "Open") return;
    ensureProspectAgentFields(prospect);
    recalcProspectState(prospect);
    const ourRoll = seededRange(random, 1, 100);
    const leveragePenalty = Math.max(0, (prospect.leverageScore || 10) - 10);
    const aiPressure = Object.values(data.aiProgramStates || {}).reduce((sum, state) => sum + (state.recruitingMomentum || 50), 0) /
      Math.max(1, Object.keys(data.aiProgramStates || {}).length);
    const pressurePenalty = aiPressure >= 70 ? 3 : aiPressure <= 40 ? -2 : 0;
    const commitThreshold = (prospect.visited ? 82 : prospect.offered ? 88 : 101) + leveragePenalty + pressurePenalty;
    if (prospect.commitChance >= commitThreshold && ourRoll <= 28) {
      prospect.commitmentStatus = "Committed Lakeview";
      recalcProspectState(prospect);
      injectNotification({
        id: `commit-${prospect.id}-${career.advanceCount}`,
        title: `${prospect.name} committed to ${programById(career.programId).shortName}`,
        body: `${prospect.position} ${prospect.name} accepted your class pitch after sustained recruiting contact.`,
        severity: "Action Recommended",
        department: "Recruiting",
        deadline: "This week",
        linked: "Recruiting",
        targetView: "recruiting",
        blocking: false,
        resolved: false,
      });
      return;
    }
    const otherSchoolRoll = seededRange(random, 1, 100);
    if (prospect.interest <= 36 && otherSchoolRoll <= 14) {
      prospect.commitmentStatus = "Committed Other";
      recalcProspectState(prospect);
    }
  });
}

function buildClassSummaryRows() {
  const holes = vm("futureHoles").slice(1);
  const rows = [["Position", "Need", "Board", "Committed", "Sync"]];
  holes.forEach((row) => {
    const position = row[0] === "RB" ? "HB" : row[0];
    const need = row[3];
    const boardCount = prospects().filter(
      (prospect) => prospect.position === position && prospect.commitmentStatus === "Open",
    ).length;
    const committed = prospects().filter(
      (prospect) => prospect.position === position && prospect.commitmentStatus === "Committed Lakeview",
    ).length;
    const sync = need === "High" && boardCount < 2 && committed === 0 ? "Risk" : "Aligned";
    rows.push([row[0], need, String(boardCount), String(committed), sync]);
  });
  return rows;
}

function committedClassRows() {
  const committed = prospects()
    .filter((prospect) => prospect.commitmentStatus === "Committed Lakeview")
    .sort((a, b) => b.grade - a.grade)
    .slice(0, 8);
  if (!committed.length) {
    return table([["Pos", "Prospect", "Stars", "Grade", "Region"], ["-", "No commits yet", "-", "-", "-"]]);
  }
  const rows = committed.map((p) => {
    const cls = attrValClass(Math.round((p.grade || 70) / 5));
    return `<button class="table-row selectable" data-select-prospect="${p.id}">
      <span>${p.position}</span>
      <strong>${p.name}</strong>
      <span>${p.stars}</span>
      <span class="attr-val ${cls}" style="background:none">${p.grade}</span>
      <span>${p.pipeline || "\u2014"}</span>
    </button>`;
  }).join("");
  return `<div class="table-list">
    <div class="table-row header"><span>Pos</span><span>Prospect</span><span>Stars</span><span>Grade</span><span>Region</span></div>
    ${rows}
  </div>`;
}

function syncRecruitingModels() {
  ensureRecruitingState();
  ensureProspectPool();
  prospects().forEach((prospect) => recalcProspectState(prospect));
  syncRecruitRowsFromProspects();
}

function applySavedPlayerDecisions() {
  ensurePlayerDecisionState();
  players().forEach((player) => {
    const decision = data.playerDecisions[player.id] || {};
    if (isNonEmptyString(decision.redshirtIntent)) {
      player.redshirtIntent = decision.redshirtIntent;
    }
    if (isNonEmptyString(decision.developmentFocus)) {
      player.developmentFocus = decision.developmentFocus;
    }
    if (Number.isInteger(decision.gamesPlayedThisSeason)) {
      player.eligibility.gamesPlayedThisSeason = Math.max(0, decision.gamesPlayedThisSeason);
    }
  });
  ensurePlayerSelection();
  ensureProspectSelection();
}

function persistPlayerDecision(player) {
  ensurePlayerDecisionState();
  data.playerDecisions[player.id] = {
    redshirtIntent: player.redshirtIntent,
    developmentFocus: player.developmentFocus,
    gamesPlayedThisSeason: player.eligibility.gamesPlayedThisSeason,
  };
}

function refreshEligibilityNotification(player) {
  const id = `eligibility-${player.id}-redshirt-watch`;
  data.notifications = data.notifications.filter((notification) => notification.id !== id);
  if (player.redshirtIntent !== "Preserve") return;

  const games = player.eligibility.gamesPlayedThisSeason;
  if (games <= REDSHIRT_MAX_GAMES - 2) return;
  const crossed = games > REDSHIRT_MAX_GAMES;

  injectNotification({
    id,
    title: crossed ? `${player.name} crossed redshirt threshold` : `${player.name} is near redshirt threshold`,
    body: crossed
      ? `${player.name} now has ${games} game appearances and can no longer preserve redshirt this season.`
      : `${player.name} has ${games} game appearances. Only ${Math.max(0, REDSHIRT_MAX_GAMES - games)} preservable game(s) remain.`,
    severity: crossed ? "Deadline" : "Action Recommended",
    department: "Roster",
    deadline: crossed ? "Today" : "This week",
    linked: "Player Profile",
    targetView: "roster",
    blocking: false,
    resolved: false,
  });
}

function refreshAllEligibilityNotifications() {
  players().forEach((player) => refreshEligibilityNotification(player));
}

function refreshDepthValidationNotification() {
  const id = "depth-validation-illegal";
  data.notifications = data.notifications.filter((notification) => notification.id !== id);
  const issues = depthValidationIssues();
  if (!issues.length) return;
  injectNotification({
    id,
    title: "Depth chart has invalid assignments",
    body: issues.join(" "),
    severity: "Must Respond",
    department: "Roster",
    deadline: "Before continue",
    linked: "Depth Planner",
    targetView: "depth",
    blocking: true,
    resolved: false,
  });
}

function applyEventParticipation(event) {
  if (!event || event.phase !== "Opener") return;
  ensureDepthChartState();
  const starterIds = new Set(Object.values(data.depthChart));
  starterIds.forEach((playerId) => {
    const player = findPlayer(playerId);
    if (!player) return;
    player.eligibility.gamesPlayedThisSeason += 1;
    persistPlayerDecision(player);
  });
}

applyGeneratedProgramState();
syncAgendaFromCalendar();
ensurePlayerDecisionState();
applySavedPlayerDecisions();
ensureDepthChartState();
ensureStaffState();
ensureRecruitingState();
ensurePortalState();
ensureRetentionState();
ensureBenefitState();
ensureSeasonState();
ensurePressureState();
ensureCultureState();
ensureFacilitiesState();
syncRecruitingModels();
updateOutgoingRiskRowsFromState();
refreshRosterComplianceNotification();
simulateWorldEcosystemTick();
refreshStewardshipModels();
refreshAllEligibilityNotifications();
refreshDepthValidationNotification();

// One single calendar step. Internal — callers should use advanceCareer.
function advanceCalendarOnce() {
  if (career.currentEventIndex >= calendar.length - 1) return false;
  career.currentEventIndex += 1;
  career.advanceCount += 1;
  dispatchToReplay("ADVANCE_WEEK", {});
  logAction({
    type: "continue_advance",
    actorId: career.programId,
    actorRole: "user",
    summary: `Advance to ${calendar[career.currentEventIndex].dateLabel}`,
    reasonCodes: ["weekly_continue"],
  });
  syncAgendaFromCalendar();
  const event = currentEvent();
  injectEventNotifications(event);
  applyEventParticipation(event);
  stepPortalExceptionClock();
  maybeResetRecruitingBudgetForWeek();
  simulateWorldEcosystemTick();
  resolveProspectCommitments();
  syncRecruitingModels();
  driftRetentionRisk();
  refreshBenefitPressure();
  refreshRosterComplianceNotification();
  refreshStewardshipModels();
  refreshAllEligibilityNotifications();
  refreshDepthValidationNotification();
  return true;
}

// Continue: advance ONE day. If we're at end-of-calendar, run the next game
// or postseason round or season rollover.
function advanceCareer() {
  if (advanceCalendarOnce()) return true;
  if (advanceSeasonCompetitionShell()) {
    simulateWorldEcosystemTick();
    refreshBenefitPressure();
    refreshRosterComplianceNotification();
    refreshStewardshipModels();
    syncCareerRecordFromSeasonState();
    return true;
  }
  injectNotification({
    id: "event-demo-horizon",
    title: "Demo calendar horizon reached",
    body: "The prototype has reached the end of the current deterministic event deck.",
    severity: "FYI",
    department: "System",
    deadline: "None",
    linked: "Project Status",
    blocking: false,
    resolved: false,
  });
  return false;
}

// Skip-to-Next-Event: walk forward day-by-day until we hit something the user
// hasn't already seen — a brand new blocker, a brand new decision, a game day,
// or a season transition. Caps at 60 days for safety.
function skipToNextEvent() {
  const MAX = 60;
  const startWasComplete = data.seasonState && data.seasonState.seasonComplete;
  // Snapshot existing notification ids so newly-fired ones during the skip
  // can be detected. Notifications already on screen don't stop the skip.
  const seenNotifIds = new Set((data.notifications || []).map((n) => n.id));
  function newBlockerFired() {
    return (data.notifications || []).some((n) =>
      !n.resolved && n.blocking && !seenNotifIds.has(n.id)
    );
  }
  function newDecisionFired() {
    return (data.notifications || []).some((n) =>
      !n.resolved && !n.blocking && (n.severity === "Action Recommended" || n.severity === "Decision") && !seenNotifIds.has(n.id)
    );
  }
  let steps = 0;
  let moved = false;
  for (let i = 0; i < MAX; i++) {
    const calendarRoom = career.currentEventIndex < calendar.length - 1;
    if (calendarRoom) {
      if (!advanceCalendarOnce()) break;
      moved = true;
      steps++;
      const phase = currentEvent().phase;
      if (phase === "Opener" || phase === "Postgame Review") {
        // fall through to game-play branch
      } else if (newBlockerFired()) {
        return { steps, reason: "blocker" };
      } else {
        // Decisions don't stop the skip — they queue up in the inbox and the
        // player handles them from Desk when they get there. Otherwise every
        // preseason camp task halts the Skip.
        continue;
      }
    }

    if (advanceSeasonCompetitionShell()) {
      simulateWorldEcosystemTick();
      refreshBenefitPressure();
      refreshRosterComplianceNotification();
      refreshStewardshipModels();
      syncCareerRecordFromSeasonState();
      moved = true;
      steps++;
      if (data.seasonState && data.seasonState.seasonComplete && !startWasComplete) {
        return { steps, reason: "season_complete" };
      }
      return { steps, reason: "game" };
    }

    break;
  }
  return { steps, reason: moved ? "max" : "none" };
}

function injectEventNotifications(event) {
  (event.notifications || []).slice().reverse().forEach((notification) => {
    injectNotification(notification);
  });
}

function injectNotification(notification) {
  if (data.notifications.some((item) => item.id === notification.id)) return;
  if (!canInjectNotification(notification)) return;
  data.notifications.unshift(clone(notification));
  pruneNotificationQueue();
}

function notificationStreamKey(notification) {
  return [
    notification.department || "System",
    notification.targetView || "desk",
    notification.linked || "General",
    notification.severity || "FYI",
  ].join("|");
}

function canInjectNotification(notification) {
  if (notification.blocking) return true;
  const key = notificationStreamKey(notification);
  const unresolvedInStream = data.notifications.filter(
    (item) => !item.blocking && !item.resolved && notificationStreamKey(item) === key,
  ).length;
  return unresolvedInStream < NOTIFICATION_MAX_PER_STREAM;
}

function pruneNotificationQueue() {
  const keep = [];
  const streamCounts = new Map();
  data.notifications.forEach((item) => {
    if (item.blocking) {
      keep.push(item);
      return;
    }
    if (item.resolved) {
      keep.push(item);
      return;
    }
    const key = notificationStreamKey(item);
    const count = streamCounts.get(key) || 0;
    if (count >= NOTIFICATION_MAX_PER_STREAM) return;
    streamCounts.set(key, count + 1);
    keep.push(item);
  });
  data.notifications = keep;

  let unresolvedNonBlocking = data.notifications.filter((item) => !item.blocking && !item.resolved).length;
  if (unresolvedNonBlocking > NOTIFICATION_MAX_UNRESOLVED_NON_BLOCKING) {
    const next = [];
    for (let index = 0; index < data.notifications.length; index += 1) {
      const item = data.notifications[index];
      if (!item.blocking && !item.resolved && unresolvedNonBlocking > NOTIFICATION_MAX_UNRESOLVED_NON_BLOCKING) {
        unresolvedNonBlocking -= 1;
        continue;
      }
      next.push(item);
    }
    data.notifications = next;
  }

  if (data.notifications.length > NOTIFICATION_MAX_TOTAL) {
    data.notifications = data.notifications.slice(0, NOTIFICATION_MAX_TOTAL);
  }
}

function resetDataFromWorld() {
  Object.keys(data).forEach((key) => delete data[key]);
  Object.assign(data, clone(world.data));
  // Procedurally fill the roster up to a realistic CFB composition before any
  // downstream "ensure*State" runs so backfills (morale, posAttrs, hidden, etc.)
  // see the full roster on the first pass. Deterministic from career.seed.
  synthesizeRosterFill(career.seed || (world.career && world.career.seed) || "lakeview");
  synthesizeWorldFill(career.seed || (world.career && world.career.seed) || "lakeview");
  ensurePlayerDecisionState();
  applySavedPlayerDecisions();
  ensureDepthChartState();
  ensureStaffState();
  ensureRecruitingState();
  ensurePortalState();
  ensureRetentionState();
  ensureBenefitState();
  ensureSeasonState();
  ensurePressureState();
  ensureCultureState();
  ensureFacilitiesState();
  syncRecruitingModels();
  updateOutgoingRiskRowsFromState();
  refreshRosterComplianceNotification();
  simulateWorldEcosystemTick();
  refreshStewardshipModels();
  refreshAllEligibilityNotifications();
  refreshDepthValidationNotification();
  syncAgendaFromCalendar();
}

function resetCareer(overrides = {}) {
  Object.keys(career).forEach((key) => delete career[key]);
  Object.assign(career, clone(world.career), overrides);
  career.startYear = clampInteger(career.startYear, 2010, 2035, clampInteger(world.career.startYear, 2010, 2035, 2028));
  career.currentEventIndex = clampEventIndex(career.currentEventIndex);
  applyGeneratedProgramState();
  resetDataFromWorld();
  // Re-stamp the calendar's year so dateLabels match the chosen startYear.
  // The world calendar is hardcoded to 2028; without this every screen shows
  // 2028 even on a 2026 career.
  reseedCalendarYear(career.startYear);
}

// Walk the calendar and rewrite each entry's dateLabel so the year matches
// the active season (defaults to career.startYear). Idempotent.
function reseedCalendarYear(targetYear) {
  if (!Number.isFinite(targetYear) || !Array.isArray(calendar)) return;
  const yr = String(targetYear);
  calendar.forEach((entry) => {
    if (!entry || typeof entry.dateLabel !== "string") return;
    entry.dateLabel = entry.dateLabel.replace(/\b20\d{2}\b/, yr);
  });
}

function rebuildEventsThroughCurrentDate() {
  for (let index = 1; index <= career.currentEventIndex; index += 1) {
    injectEventNotifications(calendar[index]);
  }
}

function applyResolvedNotifications(ids) {
  const resolvedIds = new Set(ids || []);
  data.notifications.forEach((notification) => {
    notification.resolved = resolvedIds.has(notification.id);
  });
}

function clampEventIndex(index) {
  const parsed = Number(index);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.min(calendar.length - 1, Math.trunc(parsed)));
}

function localStore() {
  try {
    return window.localStorage || null;
  } catch (error) {
    return null;
  }
}

function readUiPrefs() {
  const helper = window.CGM_UI_PREFS;
  if (helper && typeof helper.readUiPrefs === "function") return helper.readUiPrefs();
  const store = localStore();
  if (!store) return {};
  try {
    return JSON.parse(store.getItem("cgm.uiPrefs.v1") || "{}") || {};
  } catch (error) {
    return {};
  }
}

function writeUiPrefs(prefs) {
  const helper = window.CGM_UI_PREFS;
  if (helper && typeof helper.writeUiPrefs === "function") return helper.writeUiPrefs(prefs);
  const store = localStore();
  if (!store) return;
  try {
    store.setItem("cgm.uiPrefs.v1", JSON.stringify(prefs || {}));
  } catch (error) {
    // noop
  }
}

function loadUiStateFromPrefs() {
  const helper = window.CGM_UI_PREFS;
  if (helper && typeof helper.loadUiStateFromPrefs === "function") return helper.loadUiStateFromPrefs();
  const prefs = readUiPrefs();
  if (!isRecord(window.CGM_UI_STATE)) window.CGM_UI_STATE = {};
  if (isRecord(prefs.roster)) window.CGM_UI_STATE.roster = { ...prefs.roster };
  if (isRecord(prefs.recruiting)) window.CGM_UI_STATE.recruiting = { ...prefs.recruiting };
  if (Array.isArray(prefs.bookmarks)) window.CGM_UI_STATE.bookmarks = prefs.bookmarks.slice(0, 12);
}

function persistUiState() {
  const helper = window.CGM_UI_PREFS;
  if (helper && typeof helper.persistUiState === "function") return helper.persistUiState();
  if (!isRecord(window.CGM_UI_STATE)) return;
  const roster = isRecord(window.CGM_UI_STATE.roster) ? window.CGM_UI_STATE.roster : {};
  const recruiting = isRecord(window.CGM_UI_STATE.recruiting) ? window.CGM_UI_STATE.recruiting : {};
  const bookmarks = Array.isArray(window.CGM_UI_STATE.bookmarks) ? window.CGM_UI_STATE.bookmarks.slice(0, 12) : [];
  writeUiPrefs({ roster, recruiting, bookmarks });
}

function currentViewLabel() {
  const view = views[activeView];
  return view ? (typeof view.title === "function" ? view.title() : view.title) : activeView;
}

function ensurePlayerWatchlistState() {
  if (!isRecord(window.CGM_UI_STATE)) window.CGM_UI_STATE = {};
  if (!Array.isArray(window.CGM_UI_STATE.playerWatchlist)) window.CGM_UI_STATE.playerWatchlist = [];
  return window.CGM_UI_STATE.playerWatchlist;
}

function isPlayerWatched(playerId) {
  return ensurePlayerWatchlistState().some((entry) => entry && entry.playerId === playerId);
}

function togglePlayerWatch(player) {
  if (!player || !player.id) return false;
  const watchlist = ensurePlayerWatchlistState();
  const index = watchlist.findIndex((entry) => entry && entry.playerId === player.id);
  if (index >= 0) {
    watchlist.splice(index, 1);
    persistUiState();
    return false;
  }
  watchlist.unshift({
    playerId: player.id,
    name: player.name,
    position: player.position,
    risk: player.transferRisk || "Low",
    morale: player.morale || "Stable",
    note: `${player.developmentFocus || "Balanced"} focus`,
  });
  window.CGM_UI_STATE.playerWatchlist = watchlist.slice(0, 24);
  persistUiState();
  return true;
}

function readSavedCareer() {
  const store = localStore();
  if (!store) return null;
  try {
    const raw = store.getItem(SAVE_KEY);
    if (!raw) return null;
    const save = migrateSave(JSON.parse(raw));
    if (!save || !save.career) return null;
    if (!programs.some((program) => program.id === (save.career.programId || world.career.programId))) return null;
    return save;
  } catch (error) {
    return null;
  }
}

function hasLocalSave() {
  return Boolean(readSavedCareer());
}

function migrateSave(save) {
  if (!isRecord(save) || !isRecord(save.career)) return null;
  if (save.version === 1) {
    return {
      version: SAVE_SCHEMA_VERSION,
      savedAt: save.savedAt,
      career: save.career,
      resolvedNotificationIds: Array.isArray(save.resolvedNotificationIds) ? save.resolvedNotificationIds : [],
      playerDecisions: {},
      depthChart: null,
      recruitingState: null,
      prospectProfiles: null,
      portalState: null,
      retentionState: null,
      benefitState: null,
      seasonState: null,
      pressureState: null,
      cultureState: null,
      facilitiesState: null,
    };
  }
  if (save.version === 2) {
    return {
      version: SAVE_SCHEMA_VERSION,
      savedAt: save.savedAt,
      career: save.career,
      resolvedNotificationIds: Array.isArray(save.resolvedNotificationIds) ? save.resolvedNotificationIds : [],
      playerDecisions: isRecord(save.playerDecisions) ? save.playerDecisions : {},
      depthChart: isRecord(save.depthChart) ? save.depthChart : null,
      recruitingState: null,
      prospectProfiles: null,
      portalState: null,
      retentionState: null,
      benefitState: null,
      seasonState: null,
      pressureState: null,
      cultureState: null,
      facilitiesState: null,
    };
  }
  if (save.version === 3) {
    return {
      version: SAVE_SCHEMA_VERSION,
      savedAt: save.savedAt,
      career: save.career,
      resolvedNotificationIds: Array.isArray(save.resolvedNotificationIds) ? save.resolvedNotificationIds : [],
      playerDecisions: isRecord(save.playerDecisions) ? save.playerDecisions : {},
      depthChart: isRecord(save.depthChart) ? save.depthChart : null,
      recruitingState: isRecord(save.recruitingState) ? save.recruitingState : null,
      prospectProfiles: Array.isArray(save.prospectProfiles) ? save.prospectProfiles : null,
      portalState: null,
      retentionState: null,
      benefitState: null,
      seasonState: null,
      pressureState: null,
      cultureState: null,
      facilitiesState: null,
    };
  }
  if (save.version === 4) {
    return {
      version: SAVE_SCHEMA_VERSION,
      savedAt: save.savedAt,
      career: save.career,
      resolvedNotificationIds: Array.isArray(save.resolvedNotificationIds) ? save.resolvedNotificationIds : [],
      playerDecisions: isRecord(save.playerDecisions) ? save.playerDecisions : {},
      depthChart: isRecord(save.depthChart) ? save.depthChart : null,
      recruitingState: isRecord(save.recruitingState) ? save.recruitingState : null,
      prospectProfiles: Array.isArray(save.prospectProfiles) ? save.prospectProfiles : null,
      portalState: isRecord(save.portalState) ? save.portalState : null,
      retentionState: isRecord(save.retentionState) ? save.retentionState : null,
      benefitState: isRecord(save.benefitState) ? save.benefitState : null,
      seasonState: null,
      pressureState: null,
      cultureState: null,
      facilitiesState: null,
    };
  }
  if (save.version === 5) {
    return {
      version: SAVE_SCHEMA_VERSION,
      savedAt: save.savedAt,
      career: save.career,
      resolvedNotificationIds: Array.isArray(save.resolvedNotificationIds) ? save.resolvedNotificationIds : [],
      playerDecisions: isRecord(save.playerDecisions) ? save.playerDecisions : {},
      depthChart: isRecord(save.depthChart) ? save.depthChart : null,
      recruitingState: isRecord(save.recruitingState) ? save.recruitingState : null,
      prospectProfiles: Array.isArray(save.prospectProfiles) ? save.prospectProfiles : null,
      portalState: isRecord(save.portalState) ? save.portalState : null,
      retentionState: isRecord(save.retentionState) ? save.retentionState : null,
      benefitState: isRecord(save.benefitState) ? save.benefitState : null,
      seasonState: isRecord(save.seasonState) ? save.seasonState : null,
      pressureState: null,
      cultureState: null,
      facilitiesState: null,
    };
  }
  // v6 → v7: add empty actionLog + eventLog (PERSIST-1)
  if (save.version === 6) {
    return {
      version: SAVE_SCHEMA_VERSION,
      savedAt: save.savedAt,
      career: save.career,
      resolvedNotificationIds: save.resolvedNotificationIds || [],
      playerDecisions: save.playerDecisions || {},
      depthChart: save.depthChart || null,
      recruitingState: save.recruitingState || null,
      prospectProfiles: save.prospectProfiles || null,
      portalState: save.portalState || null,
      retentionState: save.retentionState || null,
      benefitState: save.benefitState || null,
      seasonState: save.seasonState || null,
      pressureState: save.pressureState || null,
      cultureState: save.cultureState || null,
      facilitiesState: save.facilitiesState || null,
      inboxEvents: save.inboxEvents || [],
      promises: save.promises || [],
      positionCoaches: save.positionCoaches || [],
      actionLog: { actions: [], maxRetained: 4000 },
      eventLog: { events: [], maxRetained: 5000 },
      aiSchoolStandings: {},
    };
  }
  if (save.version === 7) {
    // v7 → v8: only added optional history surfaces (alumniArchive,
    // coachLegacies, recordBook, awardsHistory, realignmentHistory,
    // scrapbookArchive, nilState, pulseState, draftClasses, practiceState).
    // All default to empty/null and are populated by the rollover engines.
    return { ...save, version: SAVE_SCHEMA_VERSION };
  }
  if (save.version === SAVE_SCHEMA_VERSION) return save;
  return null;
}

function exportSaveState() {
  ensureCareerSandboxState();
  return {
    version: SAVE_SCHEMA_VERSION,
    savedAt: new Date().toISOString(),
    career: {
      seed: career.seed,
      coachName: career.coachName,
      programId: career.programId,
      school: career.school,
      record: career.record,
      startYear: clampInteger(career.startYear, 2010, 2035, 2028),
      currentEventIndex: career.currentEventIndex,
      advanceCount: career.advanceCount,
      worldHash: career.worldHash,
      experienceMode: career.experienceMode,
      rulesProfile: clone(career.rulesProfile || defaultRulesProfile()),
    },
    resolvedNotificationIds: data.notifications
      .filter((notification) => notification.resolved)
      .map((notification) => notification.id),
    playerDecisions: clone(data.playerDecisions || {}),
    depthChart: clone(data.depthChart || {}),
    recruitingState: clone(data.recruitingState || {}),
    prospectProfiles: clone(data.prospectProfiles || []),
    portalState: clone(data.portalState || {}),
    retentionState: clone(data.retentionState || {}),
    benefitState: clone(data.benefitState || {}),
    seasonState: clone(data.seasonState || {}),
    pressureState: clone(data.pressureState || {}),
    cultureState: clone(data.cultureState || {}),
    facilitiesState: clone(data.facilitiesState || {}),
    inboxEvents: clone(data.inboxEvents || []),
    promises: clone(data.promises || []),
    positionCoaches: clone(data.positionCoaches || []),
    actionLog: data.actionLog && window.CGM_ACTION_LOG ? window.CGM_ACTION_LOG.serializeLog(data.actionLog) : { actions: [], maxRetained: 4000 },
    eventLog: data.eventLog && window.CGM_EVENT_LOG ? window.CGM_EVENT_LOG.serializeLog(data.eventLog) : { events: [], maxRetained: 5000 },
    aiSchoolStandings: clone(data.aiSchoolStandings || {}),
    // Wave 9-16 additions — multi-year persistence + history surfaces.
    alumniArchive: clone(data.alumniArchive || []),
    coachLegacies: clone(data.coachLegacies || []),
    recordBook: clone(data.recordBook || {}),
    awardsHistory: clone(data.awardsHistory || []),
    realignmentHistory: clone(data.realignmentHistory || []),
    scrapbookArchive: clone(data.scrapbookArchive || []),
    nilState: clone(data.nilState || null),
    pulseState: data.pulseState ? { snapshot: clone(data.pulseState.snapshot), history: clone((data.pulseState.history || []).slice(0, 24)) } : null,
    draftClasses: clone(data.draftClasses || []),
    practiceState: clone(data.practiceState || null),
    carouselState: clone(data.carouselState || null),
  };
}

function saveCareer(options = {}) {
  const store = localStore();
  if (!store) {
    if (!options.silent) setBootstrapStatus("Local storage is unavailable in this browser.");
    return false;
  }
  store.setItem(SAVE_KEY, JSON.stringify(exportSaveState()));
  isDirty = false;
  renderCareerChrome();
  if (!options.silent) setBootstrapStatus("Career saved locally.");
  return true;
}

function autoSaveCareer() {
  if (!careerStarted) return false;
  return saveCareer({ silent: true });
}

function loadCareer() {
  const save = readSavedCareer();
  if (!save) {
    setBootstrapStatus("No compatible local save found.");
    return false;
  }
  resetCareer({
    seed: save.career.seed || world.career.seed,
    coachName: save.career.coachName || world.career.coachName,
    programId: save.career.programId || world.career.programId,
    startYear: clampInteger(save.career.startYear, 2010, 2035, clampInteger(world.career.startYear, 2010, 2035, 2028)),
    currentEventIndex: clampEventIndex(save.career.currentEventIndex),
    advanceCount: Number(save.career.advanceCount) || 0,
    experienceMode: isNonEmptyString(save.career.experienceMode) ? save.career.experienceMode : "Sandbox",
    rulesProfile: normalizeRulesProfile(save.career.rulesProfile),
  });
  rebuildEventsThroughCurrentDate();
  applyResolvedNotifications(save.resolvedNotificationIds);
  data.playerDecisions = clone(save.playerDecisions || {});
  applySavedPlayerDecisions();
  if (isRecord(save.depthChart)) data.depthChart = clone(save.depthChart);
  if (isRecord(save.recruitingState)) data.recruitingState = clone(save.recruitingState);
  if (Array.isArray(save.prospectProfiles) && save.prospectProfiles.length) {
    data.prospectProfiles = clone(save.prospectProfiles);
  }
  if (isRecord(save.portalState)) data.portalState = clone(save.portalState);
  if (isRecord(save.retentionState)) data.retentionState = clone(save.retentionState);
  if (isRecord(save.benefitState)) data.benefitState = clone(save.benefitState);
  if (isRecord(save.seasonState)) data.seasonState = clone(save.seasonState);
  if (isRecord(save.pressureState)) data.pressureState = clone(save.pressureState);
  if (isRecord(save.cultureState)) data.cultureState = clone(save.cultureState);
  if (isRecord(save.facilitiesState)) data.facilitiesState = clone(save.facilitiesState);
  if (Array.isArray(save.inboxEvents)) data.inboxEvents = clone(save.inboxEvents);
  if (Array.isArray(save.promises)) data.promises = clone(save.promises);
  if (Array.isArray(save.positionCoaches)) data.positionCoaches = clone(save.positionCoaches);
  // Wave 9-16 additions — restore the multi-year persistence surfaces.
  if (Array.isArray(save.alumniArchive)) data.alumniArchive = clone(save.alumniArchive);
  if (Array.isArray(save.coachLegacies)) data.coachLegacies = clone(save.coachLegacies);
  if (isRecord(save.recordBook)) data.recordBook = clone(save.recordBook);
  if (Array.isArray(save.awardsHistory)) data.awardsHistory = clone(save.awardsHistory);
  if (Array.isArray(save.realignmentHistory)) data.realignmentHistory = clone(save.realignmentHistory);
  if (Array.isArray(save.scrapbookArchive)) data.scrapbookArchive = clone(save.scrapbookArchive);
  if (isRecord(save.nilState)) data.nilState = clone(save.nilState);
  if (isRecord(save.pulseState)) data.pulseState = clone(save.pulseState);
  if (Array.isArray(save.draftClasses)) data.draftClasses = clone(save.draftClasses);
  if (isRecord(save.practiceState)) data.practiceState = clone(save.practiceState);
  if (isRecord(save.carouselState)) data.carouselState = clone(save.carouselState);
  // Restore action + event logs so the historical log persists across saves.
  if (save.actionLog && window.CGM_ACTION_LOG) data.actionLog = window.CGM_ACTION_LOG.rehydrateLog(save.actionLog);
  if (save.eventLog && window.CGM_EVENT_LOG) data.eventLog = window.CGM_EVENT_LOG.rehydrateLog(save.eventLog);
  if (isRecord(save.aiSchoolStandings)) data.aiSchoolStandings = clone(save.aiSchoolStandings);
  ensureDepthChartState();
  ensureStaffState();
  ensureRecruitingState();
  ensurePortalState();
  ensureRetentionState();
  ensureBenefitState();
  ensureSeasonState();
  ensurePressureState();
  ensureCultureState();
  ensureFacilitiesState();
  syncRecruitingModels();
  updateOutgoingRiskRowsFromState();
  refreshRosterComplianceNotification();
  refreshStewardshipModels();
  refreshAllEligibilityNotifications();
  refreshDepthValidationNotification();
  isDirty = false;
  careerStarted = true;
  hideBootstrap();
  renderView("desk");
  setBootstrapStatus("Career loaded.");
  return true;
}

function startNewCareer() {
  const coachName = (coachNameInput.value || world.career.coachName).trim().slice(0, 32);
  const seed = (seedInput.value || world.career.seed).trim().slice(0, 40);
  const programId = programSelect.value || world.career.programId;
  const startYear = clampInteger(startYearInput ? startYearInput.value : world.career.startYear, 2010, 2035, 2028);
  const experienceMode = experienceModeSelect && isNonEmptyString(experienceModeSelect.value)
    ? experienceModeSelect.value
    : "Sandbox";
  const profile = readBootstrapRulesProfile();
  resetCareer({
    seed: seed || world.career.seed,
    coachName: coachName || world.career.coachName,
    programId,
    startYear,
    currentEventIndex: 0,
    advanceCount: 0,
    experienceMode,
    rulesProfile: profile,
  });
  isDirty = true;
  careerStarted = true;
  selectedPlayerId = null;
  selectedProspectId = null;
  // PERSIST-1: eagerly initialize the action + event logs so consumers don't
  // have to defensively check for them. Also seed AI standings for the world.
  ensureEventLog();
  ensureActionLog();
  ensureAiSchoolStandings();
  ensureNilState();
  ensureProspectSuitors();
  recomputeCampusPulse();
  logAction({
    type: "career_start",
    actorId: career.programId,
    actorRole: "user",
    summary: `New career: ${career.coachName} at ${career.school}`,
    reasonCodes: ["new_career"],
    data: { seed: career.seed, startYear: career.startYear, experienceMode: career.experienceMode },
  });
  logEvent({
    category: "season_rolled",
    severity: "notable",
    actorId: career.programId,
    actorName: programById(career.programId).shortName,
    summary: `Career begins at ${career.school}`,
    reasonCodes: ["new_career"],
  });
  hideBootstrap();
  autoSaveCareer();
  renderView("home");
}

function markDirty() {
  isDirty = true;
  renderCareerChrome();
}

const views = {
  desk: {
    title: "Program Desk",
    render: () => [renderProgramDeskWorkspace()],
  },
  home: {
    title: "Program Home",
    render: () => [renderProgramHomeWorkspace()],
  },
  roster: {
    title: "Roster Room",
    render: () => [renderRosterWorkspace()],
  },
  player: {
    title: () => {
      const player = findPlayer(selectedPlayerId);
      return player ? `Player Profile: ${player.name}` : "Player Profile";
    },
    render: () => [renderPlayerWorkspace()],
  },
  depth: {
    title: "Depth Planner",
    render: () => [renderDepthWorkspace()],
  },
  recruiting: {
    title: "Recruiting Board",
    render: () => [renderRecruitingWorkspace()],
  },
  prospect: {
    title: () => {
      const prospect = findProspect(selectedProspectId);
      return prospect ? `Prospect Profile: ${prospect.name}` : "Prospect Profile";
    },
    render: () => [renderProspectWorkspace()],
  },
  portal: {
    title: "Transfer Portal",
    render: () => [renderPortalWorkspace()],
  },
  staff: {
    title: "Staff Room",
    render: () => [renderStaffWorkspace()],
  },
  development: {
    title: "Development Centre",
    render: () => [renderDevelopmentWorkspace()],
  },
  schedule: {
    title: "Schedule",
    render: () => [renderScheduleWorkspace()],
  },
  rankings: {
    title: "Rankings",
    render: () => [renderRankingsWorkspace()],
  },
  finance: {
    title: "Finance Office",
    render: () => [renderFinanceWorkspace()],
  },
  facilities: {
    title: "Facilities / AD",
    render: () => [renderFacilitiesWorkspace()],
  },
  history: {
    title: "Program History",
    render: () => [renderHistoryWorkspace()],
  },
  analytics: {
    title: "Analytics Lab",
    render: () => [renderAnalyticsWorkspace()],
  },
  creator: {
    title: "Creator Tools",
    render: () => {
      const createdCount = [
        ...(data.playerProfiles || []).filter((p) => p._created),
        ...(data.prospectProfiles || []).filter((p) => p._created),
        ...(data.positionCoaches || []).filter((c) => c._created),
      ].length;
      const subtitle = createdCount ? `${createdCount} created entit${createdCount === 1 ? "y" : "ies"}` : "Build custom players, coaches, and more";
      return [
        panel("Creator Tools", subtitle, "span-8", creatorPanel()),
        panel("Creator Guide", "How creator tools work", "span-4",
          `<div class="creator-guide">
            <p class="label">What You Can Build</p>
            <div class="data-row"><span>Create Player</span><span>Roster or prospect</span></div>
            <div class="data-row"><span>Create Coach</span><span>Staff member</span></div>
            <div class="data-row" style="opacity:0.45"><span>Create School</span><span>Coming — Stage 23</span></div>
            <div class="data-row" style="opacity:0.45"><span>Stadium Builder</span><span>Coming — Stage 23</span></div>
            <div class="data-row" style="opacity:0.45"><span>Playbook Designer</span><span>Coming — Stage 24</span></div>
            <p class="label" style="margin-top:14px">Balance Modes</p>
            <div class="data-row"><span>Realistic</span><span>Attributes capped to OVR band</span></div>
            <div class="data-row"><span>Sandbox</span><span>Key attrs boosted; no ceiling</span></div>
            <p class="label" style="margin-top:14px">Rules</p>
            <p class="ie-body">Created entities enter the same system as all other players. They compete for roster spots, appear in trait reports, and are tracked through development.</p>
          </div>`
        ),
      ];
    },
  },
};

const nav = document.querySelector("#mainNav");
const content = document.querySelector("#content");
const continueButton = document.querySelector("#continueButton");
const backButton = document.querySelector("#backButton");
const forwardButton = document.querySelector("#forwardButton");
const globalSearchInput = document.querySelector("#globalSearchInput");
const globalSearchPanel = document.querySelector("#globalSearchPanel");
const bookmarkButton = document.querySelector("#bookmarkButton");
const bookmarkMenu = document.querySelector("#bookmarkMenu");
loadUiStateFromPrefs();
const urgentCount = document.querySelector("#urgentCount");
const careerDate = document.querySelector("#careerDate");
const recordLabel = document.querySelector("#recordLabel");
const weekLabel = document.querySelector("#weekLabel");
const phaseLabel = document.querySelector("#phaseLabel");
const crestLabel = document.querySelector("#crestLabel");
const programNameLabel = document.querySelector("#programNameLabel");
const coachLabel = document.querySelector("#coachLabel");
const saveStateLabel = document.querySelector("#saveStateLabel");
const saveButton = document.querySelector("#saveButton");
const careerButton = document.querySelector("#careerButton");
const bootstrapScreen = document.querySelector("#bootstrapScreen");
const continueCareerTile = document.querySelector("#continueCareerTile");
const newCareerTile = document.querySelector("#newCareerTile");
const dataLabTile = document.querySelector("#dataLabTile");
const settingsTile = document.querySelector("#settingsTile");
const favoriteTeamTile = document.querySelector("#favoriteTeamTile");
const advancedSetupToggle = document.querySelector("#advancedSetupToggle");
const aiServicesTile = document.querySelector("#aiServicesTile");
const creditsTile = document.querySelector("#creditsTile");
const bootstrapSetupPanel = document.querySelector("#bootstrapSetupPanel");
const bootstrapAdvancedPanel = document.querySelector("#bootstrapAdvancedPanel");
const coachNameInput = document.querySelector("#coachNameInput");
const experienceModeSelect = document.querySelector("#experienceModeSelect");
const programSelect = document.querySelector("#programSelect");
const rulesPresetSelect = document.querySelector("#rulesPresetSelect");
const contentPackSelect = document.querySelector("#contentPackSelect");
if (contentPackSelect) {
  contentPackSelect.value = ACTIVE_CONTENT_PACK;
  contentPackSelect.addEventListener("change", (event) => {
    const next = event.target.value === "demo" ? "demo" : "fbs";
    try { window.localStorage.setItem(CONTENT_PACK_KEY, next); } catch (e) { /* noop */ }
    try { window.localStorage.removeItem(SAVE_KEY); } catch (e) { /* noop */ }
    window.location.reload();
  });
}
const seedInput = document.querySelector("#seedInput");
const startYearInput = document.querySelector("#startYearInput");
const recruitingApInput = document.querySelector("#recruitingApInput");
const retentionApInput = document.querySelector("#retentionApInput");
const portalExceptionInput = document.querySelector("#portalExceptionInput");
const scoringEnvInput = document.querySelector("#scoringEnvInput");
const volatilityInput = document.querySelector("#volatilityInput");
const tacticalImpactInput = document.querySelector("#tacticalImpactInput");
const injuryCadenceInput = document.querySelector("#injuryCadenceInput");
const nilVolatilityInput = document.querySelector("#nilVolatilityInput");
const progressionPaceInput = document.querySelector("#progressionPaceInput");
const transferPopulationInput = document.querySelector("#transferPopulationInput");
const realityAnchorInput = document.querySelector("#realityAnchorInput");
const recruitingApValue = document.querySelector("#recruitingApValue");
const retentionApValue = document.querySelector("#retentionApValue");
const portalExceptionValue = document.querySelector("#portalExceptionValue");
const scoringEnvValue = document.querySelector("#scoringEnvValue");
const volatilityValue = document.querySelector("#volatilityValue");
const tacticalImpactValue = document.querySelector("#tacticalImpactValue");
const injuryCadenceValue = document.querySelector("#injuryCadenceValue");
const nilVolatilityValue = document.querySelector("#nilVolatilityValue");
const progressionPaceValue = document.querySelector("#progressionPaceValue");
const transferPopulationValue = document.querySelector("#transferPopulationValue");
const realityAnchorValue = document.querySelector("#realityAnchorValue");
const startCareerButton = document.querySelector("#startCareerButton");
const loadCareerButton = document.querySelector("#loadCareerButton");
const closeBootstrapButton = document.querySelector("#closeBootstrapButton");
const bootstrapStatus = document.querySelector("#bootstrapStatus");
let activeView = "desk";
let viewHistory = ["desk"];
let viewHistoryIndex = 0;
let globalSearchState = { query: "", results: [], selectedIndex: 0, open: false };
let bookmarkMenuOpen = false;

function blockingItems() {
  return data.notifications.filter((item) => item.blocking && !item.resolved);
}

function vm(key) {
  return data.viewModels[key] || [];
}

function programHealthMetrics() {
  const profile = career.generatedProfile || generateCareerProfile(career.seed, programById(career.programId));
  ensurePressureState();
  return [
    ["Prestige", profile.prestige],
    ["Fan confidence", profile.fanConfidence],
    ["Donor confidence", profile.donorConfidence],
    ["Academic stability", profile.academicStability],
    ["Objective pressure", data.pressureState.objectivePressure],
  ];
}

function renderNav() {
  const blockers = blockingItems().length;
  nav.innerHTML = navItems
    .map((item) => {
      const activeRoute = activeView === "player" ? "roster" : activeView === "prospect" ? "recruiting" : activeView;
      const active = item.id === activeRoute ? " active" : "";
      const count = item.id === "desk" && blockers ? `<small>${blockers}</small>` : "";
      return `<button class="nav-button${active}" data-view="${item.id}">
        <span class="nav-icon" aria-hidden="true">${icons[item.icon]}</span>
        <span>${item.label}</span>
        ${count}
      </button>`;
    })
    .join("");
}

function renderView(viewId, options) {
  const nextView = views[viewId] ? viewId : "desk";
  const opts = isRecord(options) ? options : {};
  activeView = nextView;
  if (!opts.skipHistory) {
    if (viewHistory[viewHistoryIndex] !== nextView) {
      viewHistory = viewHistory.slice(0, viewHistoryIndex + 1);
      viewHistory.push(nextView);
      viewHistoryIndex = viewHistory.length - 1;
    }
  }
  const view = views[nextView] || views.desk;
  renderNav();
  renderCareerChrome();
  document.body.setAttribute("data-active-view", nextView);
  content.innerHTML = view.render().join("");
  updateTopbarControls();
  hideGlobalSearchPanel();
  hideBookmarkMenu();
}

function continueReadinessSnapshot() {
  const blockers = blockingItems();
  const unresolved = (data.notifications || []).filter((item) => !item.resolved);
  const decisions = unresolved.filter((item) => !item.blocking && (item.severity === "Action Recommended" || item.severity === "Decision"));
  const nextDeadline = unresolved.find((item) => item.deadline && item.deadline !== "No deadline");
  return {
    blockers,
    unresolved,
    decisions,
    nextDeadline,
    ready: blockers.length === 0,
  };
}

function renderCareerChrome() {
  const readiness = continueReadinessSnapshot();
  const blockers = readiness.blockers.length;
  const event = currentEvent();
  const program = programById(career.programId);
  careerDate.textContent = event.dateLabel;
  recordLabel.textContent = `${career.school} ${career.record}`;
  crestLabel.textContent = program.crest;
  programNameLabel.textContent = career.school;
  coachLabel.textContent = `Coach: ${career.coachName} (${career.experienceMode || "Sandbox"})`;
  weekLabel.textContent = event.weekLabel;
  phaseLabel.textContent = event.phase;
  saveStateLabel.textContent = isDirty ? "Unsaved" : "Saved";
  urgentCount.textContent = String(blockers);
  continueButton.textContent = blockers ? `Needs Attention (${blockers})` : readiness.decisions.length ? `Continue (${readiness.decisions.length})` : "Continue";
  continueButton.title = blockers
    ? "Open Program Desk to resolve must-respond items before advancing."
    : readiness.decisions.length
      ? `${readiness.decisions.length} decision item(s) are waiting, but time can advance.`
      : "Advance to the next meaningful event.";
  saveButton.disabled = !careerStarted;
  // Sidebar "Next Kickoff" — pull from the canonical-sorted schedule using
  // currentGameIndex as the played-cursor.
  const nextOpp = document.getElementById("nextKickoffOpponent");
  const nextWhen = document.getElementById("nextKickoffWhen");
  if (nextOpp && nextWhen) {
    const sched = (data.schedule || []).slice().sort((a, b) => {
      const ia = SEASON_DATE_LABELS.indexOf(a[0]);
      const ib = SEASON_DATE_LABELS.indexOf(b[0]);
      return (ia >= 0 ? ia : 99) - (ib >= 0 ? ib : 99);
    });
    const cursor = (data.seasonState && data.seasonState.currentGameIndex) || 0;
    const upcoming = sched[cursor];
    if (upcoming) {
      const opp = String(upcoming[1]).replace(/^at\s+/i, "");
      const site = String(upcoming[2] || "").toLowerCase() === "away" ? "@" : "vs";
      nextOpp.textContent = `${site} ${opp}`;
      nextWhen.textContent = `${upcoming[0]} · ${currentSeasonYear()}`;
    } else {
      nextOpp.textContent = "Season complete";
      nextWhen.textContent = "Awaiting rollover";
    }
  }
}

function updateTopbarControls() {
  if (backButton) backButton.disabled = viewHistoryIndex <= 0;
  if (forwardButton) forwardButton.disabled = viewHistoryIndex >= viewHistory.length - 1;
}

function hideGlobalSearchPanel() {
  globalSearchState.open = false;
  if (globalSearchPanel) {
    globalSearchPanel.hidden = true;
    globalSearchPanel.innerHTML = "";
  }
}

function hideBookmarkMenu() {
  bookmarkMenuOpen = false;
  if (bookmarkMenu) {
    bookmarkMenu.hidden = true;
    bookmarkMenu.innerHTML = "";
  }
}

function scoreSearchMatch(query, text) {
  const q = String(query || "").toLowerCase();
  const hay = String(text || "").toLowerCase();
  if (!q || !hay) return -1;
  if (hay === q) return 200;
  if (hay.startsWith(q)) return 120;
  const at = hay.indexOf(q);
  if (at >= 0) return 80 - Math.min(at, 40);
  const tokens = q.split(/\s+/).filter(Boolean);
  const matched = tokens.filter((token) => hay.includes(token)).length;
  return matched ? matched * 20 : -1;
}

function buildGlobalSearchResults(query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return [];
  const results = [];
  navItems.forEach((item) => {
    const score = Math.max(scoreSearchMatch(q, item.label), scoreSearchMatch(q, item.id));
    if (score >= 0) {
      results.push({
        id: `view:${item.id}`,
        kind: "view",
        title: item.label,
        meta: "Open room",
        tag: "Room",
        viewId: item.id,
        score,
      });
    }
  });
  players().forEach((player) => {
    const score = Math.max(scoreSearchMatch(q, `${player.name} ${player.position} ${player.year}`), scoreSearchMatch(q, player.name));
    if (score >= 0) {
      results.push({
        id: `player:${player.id}`,
        kind: "player",
        title: player.name,
        meta: `${player.position} · ${player.year} · OVR ${player.ovr}`,
        tag: "Player",
        playerId: player.id,
        score: score + 8,
      });
    }
  });
  prospects().forEach((prospect) => {
    const score = Math.max(scoreSearchMatch(q, `${prospect.name} ${prospect.position} ${prospect.classYear || ""}`), scoreSearchMatch(q, prospect.name));
    if (score >= 0) {
      results.push({
        id: `prospect:${prospect.id}`,
        kind: "prospect",
        title: prospect.name,
        meta: `${prospect.position} · ${prospect.stars || "?"}★ · ${prospect.commitmentStatus || "Open"}`,
        tag: "Recruit",
        prospectId: prospect.id,
        score: score + 6,
      });
    }
  });
  (data.staff || []).forEach((entry, index) => {
    const name = entry && entry[1];
    const role = entry && entry[0];
    const score = Math.max(scoreSearchMatch(q, `${name} ${role}`), scoreSearchMatch(q, name));
    if (score >= 0) {
      results.push({
        id: `staff:${index}`,
        kind: "staff",
        title: name,
        meta: `${role} · ${entry[2] || "Generalist"} · ${entry[3] || "—"}`,
        tag: "Staff",
        viewId: "staff",
        score: score + 4,
      });
    }
  });
  const bookmarks = isRecord(window.CGM_UI_STATE) && Array.isArray(window.CGM_UI_STATE.bookmarks)
    ? window.CGM_UI_STATE.bookmarks
    : [];
  bookmarks.forEach((bookmark, index) => {
    const score = Math.max(scoreSearchMatch(q, `${bookmark.label} ${bookmark.viewId}`), scoreSearchMatch(q, bookmark.label));
    if (score >= 0) {
      results.push({
        id: `bookmark:${index}`,
        kind: "bookmark",
        title: bookmark.label,
        meta: `Bookmarked ${bookmark.viewId}`,
        tag: "Saved",
        viewId: bookmark.viewId,
        score: score + 2,
      });
    }
  });
  return results
    .sort((a, b) => (b.score - a.score) || String(a.title).localeCompare(String(b.title)))
    .slice(0, 12);
}

function renderGlobalSearchPanel() {
  if (!globalSearchPanel) return;
  const helper = window.CGM_TOPBAR_TOOLS;
  if (!helper || typeof helper.renderQuickOpenPanel !== "function") return;
  globalSearchPanel.innerHTML = helper.renderQuickOpenPanel(globalSearchState);
  globalSearchPanel.hidden = false;
  globalSearchState.open = true;
}

function refreshGlobalSearch(query) {
  globalSearchState.query = String(query || "").trim();
  globalSearchState.results = buildGlobalSearchResults(globalSearchState.query);
  globalSearchState.selectedIndex = 0;
  if (!globalSearchState.query) {
    hideGlobalSearchPanel();
    return;
  }
  hideBookmarkMenu();
  renderGlobalSearchPanel();
}

function openSearchResult(result) {
  if (!result) return;
  if (result.kind === "player") {
    selectedPlayerId = result.playerId;
    hideGlobalSearchPanel();
    renderView("player");
    return;
  }
  if (result.kind === "prospect") {
    selectedProspectId = result.prospectId;
    hideGlobalSearchPanel();
    renderView("recruiting");
    return;
  }
  hideGlobalSearchPanel();
  renderView(result.viewId || "desk");
}

function renderBookmarkMenuPanel() {
  if (!bookmarkMenu) return;
  const helper = window.CGM_TOPBAR_TOOLS;
  const bookmarks = isRecord(window.CGM_UI_STATE) && Array.isArray(window.CGM_UI_STATE.bookmarks)
    ? window.CGM_UI_STATE.bookmarks
    : [];
  if (!helper || typeof helper.renderBookmarkMenu !== "function") return;
  bookmarkMenu.innerHTML = helper.renderBookmarkMenu(bookmarks, activeView);
  bookmarkMenu.hidden = false;
  bookmarkMenuOpen = true;
}

function readBootstrapRulesProfile() {
  const presetId = rulesPresetSelect && isNonEmptyString(rulesPresetSelect.value) && SANDBOX_RULE_PRESETS[rulesPresetSelect.value]
    ? rulesPresetSelect.value
    : "careerClassic";
  return normalizeRulesProfile({
    presetId,
    recruitingActionPoints: recruitingApInput ? Number(recruitingApInput.value) : undefined,
    retentionActionPoints: retentionApInput ? Number(retentionApInput.value) : undefined,
    portalExceptionAdvances: portalExceptionInput ? Number(portalExceptionInput.value) : undefined,
    scoringEnvironmentPercent: scoringEnvInput ? Number(scoringEnvInput.value) : undefined,
    volatilityPercent: volatilityInput ? Number(volatilityInput.value) : undefined,
    tacticalImpactPercent: tacticalImpactInput ? Number(tacticalImpactInput.value) : undefined,
    injuryCadencePercent: injuryCadenceInput ? Number(injuryCadenceInput.value) : undefined,
    nilVolatilityPercent: nilVolatilityInput ? Number(nilVolatilityInput.value) : undefined,
    progressionPacePercent: progressionPaceInput ? Number(progressionPaceInput.value) : undefined,
    transferPopulationPercent: transferPopulationInput ? Number(transferPopulationInput.value) : undefined,
    realityAnchorPercent: realityAnchorInput ? Number(realityAnchorInput.value) : undefined,
  });
}

function writeBootstrapRulesProfile(profile) {
  if (rulesPresetSelect) rulesPresetSelect.value = profile.presetId;
  if (recruitingApInput) recruitingApInput.value = String(profile.recruitingActionPoints);
  if (retentionApInput) retentionApInput.value = String(profile.retentionActionPoints);
  if (portalExceptionInput) portalExceptionInput.value = String(profile.portalExceptionAdvances);
  if (scoringEnvInput) scoringEnvInput.value = String(profile.scoringEnvironmentPercent);
  if (volatilityInput) volatilityInput.value = String(profile.volatilityPercent);
  if (tacticalImpactInput) tacticalImpactInput.value = String(profile.tacticalImpactPercent);
  if (injuryCadenceInput) injuryCadenceInput.value = String(profile.injuryCadencePercent);
  if (nilVolatilityInput) nilVolatilityInput.value = String(profile.nilVolatilityPercent);
  if (progressionPaceInput) progressionPaceInput.value = String(profile.progressionPacePercent);
  if (transferPopulationInput) transferPopulationInput.value = String(profile.transferPopulationPercent);
  if (realityAnchorInput) realityAnchorInput.value = String(profile.realityAnchorPercent);
  refreshBootstrapRulesLabels();
}

function refreshBootstrapRulesLabels() {
  if (recruitingApValue && recruitingApInput) recruitingApValue.textContent = String(recruitingApInput.value);
  if (retentionApValue && retentionApInput) retentionApValue.textContent = String(retentionApInput.value);
  if (portalExceptionValue && portalExceptionInput) portalExceptionValue.textContent = String(portalExceptionInput.value);
  if (scoringEnvValue && scoringEnvInput) scoringEnvValue.textContent = String(scoringEnvInput.value);
  if (volatilityValue && volatilityInput) volatilityValue.textContent = String(volatilityInput.value);
  if (tacticalImpactValue && tacticalImpactInput) tacticalImpactValue.textContent = String(tacticalImpactInput.value);
  if (injuryCadenceValue && injuryCadenceInput) injuryCadenceValue.textContent = String(injuryCadenceInput.value);
  if (nilVolatilityValue && nilVolatilityInput) nilVolatilityValue.textContent = String(nilVolatilityInput.value);
  if (progressionPaceValue && progressionPaceInput) progressionPaceValue.textContent = String(progressionPaceInput.value);
  if (transferPopulationValue && transferPopulationInput) transferPopulationValue.textContent = String(transferPopulationInput.value);
  if (realityAnchorValue && realityAnchorInput) realityAnchorValue.textContent = String(realityAnchorInput.value);
}

function applySelectedPresetToBootstrap() {
  if (!rulesPresetSelect) return;
  const preset = SANDBOX_RULE_PRESETS[rulesPresetSelect.value] || SANDBOX_RULE_PRESETS.careerClassic;
  writeBootstrapRulesProfile(normalizeRulesProfile({
    presetId: rulesPresetSelect.value,
    ...preset,
  }));
}

function syncBootstrapControls(message) {
  ensureCareerSandboxState();
  coachNameInput.value = career.coachName || world.career.coachName;
  if (startYearInput) startYearInput.value = String(clampInteger(career.startYear, 2010, 2035, 2028));
  programSelect.innerHTML = programs
    .map((program) => `<option value="${program.id}">${program.name}</option>`)
    .join("");
  programSelect.value = career.programId || world.career.programId;
  if (experienceModeSelect) {
    experienceModeSelect.value = career.experienceMode || "Sandbox";
  }
  if (rulesPresetSelect) {
    rulesPresetSelect.innerHTML = Object.keys(SANDBOX_RULE_PRESETS)
      .map((presetId) => `<option value="${presetId}">${SANDBOX_RULE_PRESETS[presetId].label}</option>`)
      .join("");
  }
  writeBootstrapRulesProfile(career.rulesProfile || defaultRulesProfile());
  seedInput.value = career.seed || world.career.seed;
  loadCareerButton.disabled = !hasLocalSave();
  closeBootstrapButton.disabled = !careerStarted;
  setBootstrapStatus(
    message || (hasLocalSave() ? "Found a saved career — click Load Save to resume." : "Pick a school and start a new career."),
  );
}

function showBootstrap(message) {
  syncBootstrapControls(message);
  bootstrapScreen.hidden = false;
}

function hideBootstrap() {
  bootstrapScreen.hidden = true;
}

function setBootstrapStatus(message) {
  if (bootstrapStatus) bootstrapStatus.textContent = message;
}

function panel(title, meta, span, body) {
  return `<article class="panel ${span}">
    <header class="panel-header">
      <h3>${title}</h3>
      <span>${meta}</span>
    </header>
    <div class="panel-body">${body}</div>
  </article>`;
}

// ── Inbox Event Renderer ───────────────────────────────────────────────────
function inboxEventCard(evt) {
  const resolved = evt.resolved ? " ie-resolved" : "";
  const catClass = {
    Recruiting: "cat-recruit", Staff: "cat-staff", Roster: "cat-roster",
    GameWeek: "cat-gameweek", Finance: "cat-finance", World: "cat-world",
  }[evt.category] || "cat-general";
  const priBadge = {
    High: `<span class="badge danger">${evt.priority}</span>`,
    Medium: `<span class="badge warn">${evt.priority}</span>`,
    Low: `<span class="badge quiet">${evt.priority}</span>`,
  }[evt.priority] || `<span class="badge quiet">Info</span>`;

  const staffHTML = (evt.staffOpinions || []).map((o) =>
    `<div class="ie-staff-opinion"><strong>${o.role}:</strong> <em>"${o.opinion}"</em></div>`
  ).join("");

  let actionsHTML = "";
  if (!evt.resolved && Array.isArray(evt.actions) && evt.actions.length) {
    actionsHTML = `<div class="ie-actions">${evt.actions.map((a) =>
      `<button class="small-action" data-inbox-action="${a.id}" data-inbox-id="${evt.id}" title="${a.consequence}">${a.label}</button>`
    ).join("")}</div>`;
  } else if (evt.resolved) {
    actionsHTML = `<div class="ie-actions"><span class="badge quiet resolved-tag">Resolved: ${evt.chosenAction || "acknowledged"}</span></div>`;
  } else {
    actionsHTML = `<button class="small-action secondary" data-inbox-ack="${evt.id}">Acknowledge</button>`;
  }

  const openBtn = evt.targetView && evt.targetView !== "desk"
    ? `<button class="small-action secondary" data-open-view="${evt.targetView}">Open ${evt.targetView}</button>`
    : "";

  return `<div class="inbox-event-card${resolved} ${catClass}">
    <div class="ie-header">
      <div>
        <span class="ie-category">${evt.category}</span>
        <strong class="ie-subject">${evt.subject}</strong>
      </div>
      <div class="ie-meta">${priBadge}<span class="ie-week">${evt.week}</span></div>
    </div>
    <p class="ie-body">${evt.body}</p>
    ${staffHTML ? `<div class="ie-staff">${staffHTML}</div>` : ""}
    <div class="ie-footer">${actionsHTML}${openBtn}</div>
  </div>`;
}

function inboxEventList(filterCat, limit = 8) {
  ensureInboxEvents();
  let events = data.inboxEvents || [];
  if (filterCat && filterCat !== "All") {
    events = events.filter((e) => e.category === filterCat);
  }
  events = events.slice(0, limit);
  if (!events.length) {
    return `<div class="agenda-item"><strong>No events</strong><p>Inbox is clear for this category.</p></div>`;
  }
  return `<div class="inbox-event-list">${events.map(inboxEventCard).join("")}</div>`;
}

function inboxSummaryPanel() {
  ensureInboxEvents();
  const total = (data.inboxEvents || []).length;
  const unresolved = (data.inboxEvents || []).filter((e) => !e.resolved).length;
  const cats = {};
  (data.inboxEvents || []).filter((e) => !e.resolved).forEach((e) => {
    cats[e.category] = (cats[e.category] || 0) + 1;
  });
  const catButtons = INBOX_EVENT_CATS.map((cat) => {
    const n = cats[cat] || 0;
    return n > 0 ? `<button class="small-action secondary" data-inbox-filter="${cat}">${cat} <small>(${n})</small></button>` : "";
  }).filter(Boolean).join("");
  return `<div class="agenda-list">
    <div class="agenda-item">
      <time>Inbox Status</time>
      <strong>${unresolved} unresolved of ${total} total events</strong>
      <p>Select a filter to view by category. All decisions have consequences — staff recommendations are shown on each card.</p>
      <div class="ie-actions">${catButtons}</div>
    </div>
  </div>`;
}

function promisesPanel() {
  const rows = promiseLedgerRows();
  return `<div>${table(rows)}</div>
    <div style="margin-top: 8px;">
      <p style="font-size:0.78rem;opacity:0.7;">Active promises affect commit chance and retention. Breaches trigger events and damage relationships.</p>
    </div>`;
}

function notificationList(blockingOnly, limit = 10) {
  const items = data.notifications
    .filter((item) => (blockingOnly ? item.blocking : !item.blocking))
    .slice(0, limit);
  if (!items.length) {
    return `<div class="agenda-item">
      <strong>No matching items</strong>
      <p>The desk is clear for this category.</p>
    </div>`;
  }
  return `<div class="decision-list">${items
    .map((item) => {
      const resolved = item.resolved ? " resolved" : "";
      const badge = severityBadge(item);
      const openButton = item.targetView
        ? `<button class="small-action secondary" data-open-view="${item.targetView}">Open</button>`
        : "";
      const button = item.blocking
        ? `<button class="small-action" data-resolve="${item.id}" ${item.resolved ? "disabled" : ""}>${item.resolved ? "Resolved" : "Resolve"}</button>`
        : "";
      return `<div class="decision-item${resolved}">
        <div>
          <strong>${item.title}</strong>
          <p>${item.body}</p>
          <div class="decision-meta">
            <span>${item.department}</span>
            <span>Deadline: ${item.deadline}</span>
            <span>Link: ${item.linked}</span>
          </div>
        </div>
        <div class="decision-actions">
          ${badge}
          ${openButton}
          ${button}
        </div>
      </div>`;
    })
    .join("")}</div>`;
}

function severityBadge(item) {
  const severity = item.resolved ? "Resolved" : item.severity;
  let tone = "quiet";
  if (severity === "Must Respond") tone = "danger";
  if (severity === "Deadline" || severity === "Action Recommended") tone = "warn";
  return `<span class="badge ${tone}">${severity}</span>`;
}

function readinessPanel() {
  const blockers = blockingItems();
  const event = currentEvent();
  const status = blockers.length
    ? ["Needs Attention", "Open Program Desk and clear Must Respond or Deadline items before advancing."]
    : ["Ready", "No blockers remain. Continue will move to the next meaningful event."];
  return `<div class="agenda-list">
    <div class="agenda-item">
      <time>${status[0]}</time>
      <strong>${blockers.length ? `${blockers.length} item(s) require a response` : "Week can advance"}</strong>
      <p>${status[1]}</p>
    </div>
    <div class="agenda-item">
      <time>Next Event</time>
      <strong>${event.nextEvent}</strong>
      <p>Advancing updates the date, agenda, and any event-driven Program Desk items.</p>
    </div>
  </div>`;
}

function agendaList(items, options = {}) {
  const targetView = options.targetView || "desk";
  return `<div class="agenda-list">${items
    .map(
      ([time, title, body], index) => `<button class="agenda-item clickable-card" data-open-view="${targetView}" data-agenda-index="${index}">
        <time>${time}</time>
        <strong>${title}</strong>
        <p>${body}</p>
      </button>`,
    )
    .join("")}</div>`;
}

function bookmarkListPanel() {
  const bookmarks = isRecord(window.CGM_UI_STATE) && Array.isArray(window.CGM_UI_STATE.bookmarks)
    ? window.CGM_UI_STATE.bookmarks
    : [];
  if (!bookmarks.length) {
    return '<p style="color:var(--text-muted);font-size:var(--text-sm)">No bookmarks yet. Save a room from the top bar to pin it here.</p>';
  }
  return `<div class="data-list">${bookmarks.map((bookmark) => `<button class="data-row clickable-row" data-open-view="${bookmark.viewId}"><span>${bookmark.label}</span><span class="rating">Open</span></button>`).join("")}</div>`;
}

function rosterRows(items, options = {}) {
  const targetView = options.targetView || "player";
  return `<div class="data-list">${items
    .map(([role, name, rating, note]) => {
      const meta = note || rating;
      const score = note ? rating : "";
      return `<button class="data-row clickable-row" data-open-view="${targetView}">
        <div>
          <strong>${role} - ${name}</strong>
          <span>${meta}</span>
        </div>
        ${score ? `<span class="rating">${score}</span>` : ""}
      </button>`;
    })
    .join("")}</div>`;
}

function rosterTable(items) {
  return table([
    ["Pos", "Player", "Class", "OVR", "Report"],
    ...items,
  ]);
}

function rosterTableInteractive(items) {
  if (!items.length) {
    return "<p>No player records are available.</p>";
  }
  ensurePlayerSelection();
  const rows = items
    .map((player) => {
      const isActive = player.id === selectedPlayerId;
      return `<button class="table-row selectable${isActive ? " active" : ""}" data-select-player="${player.id}">
        <span>${player.position}</span>
        <strong>${player.name}</strong>
        <span>${player.year}</span>
        <span>${player.ovr}</span>
        <span>${player.redshirtIntent}</span>
      </button>`;
    })
    .join("");
  return `<div class="table-list">
    <div class="table-row header">
      <span>Pos</span>
      <span>Player</span>
      <span>Class</span>
      <span>OVR</span>
      <span>Redshirt</span>
    </div>
    ${rows}
  </div>`;
}

function playerProfilePanel(player) {
  ensureCultureState();
  const warning = playerRedshirtWarning(player);
  const promise = data.cultureState.promiseLedger[player.id] || "Rotation";
  const attrs = player.attrs || {};
  const posAttrs = player.posAttrs || {};
  const hidden = player.hidden || {};
  const keySet = KEY_ATTRS_BY_POSITION[player.position] || new Set();
  const posSpec = POSITION_ATTRS_SPEC[player.position];
  const positionsLabel = Array.isArray(player.positions) && player.positions.length
    ? player.positions.join(" · ") : player.position;

  // Pos-attr panel (position-specific)
  const posAttrHtml = posSpec
    ? `<div class="attr-grid">${posSpec.groups.map((g) => renderPosAttrGroup(g, posAttrs)).join("")}</div>`
    : `<div class="attr-grid">${PLAYER_ATTR_GROUPS.map((g) => renderAttrGroup(g, attrs, keySet)).join("")}</div>`;

  // Generic attr panel
  const genAttrHtml = `<div class="attr-grid">${PLAYER_ATTR_GROUPS.map((g) => renderAttrGroup(g, attrs, keySet)).join("")}</div>`;

  // Trait clusters — roster players are fully known (depth=1)
  const clusters = deriveTraitClusters(player, 1.0);
  const traitHtml = `
    <div class="profile-hidden-traits">
      <p class="label" style="margin-bottom:6px">Scout Labels</p>
      ${traitClustersGrouped(clusters)}
    </div>
    <div class="profile-hidden-traits" style="margin-top:10px">
      <p class="label" style="margin-bottom:6px">Personality (hidden)</p>
      ${[["Loyalty",hidden.loyalty],["Ambition",hidden.ambition],["Coachability",hidden.coachability],
         ["Work Ethic",hidden.workEthic],["Transfer Openness",hidden.transferOpenness]]
        .map(([k,v]) => {
          const lbl = v >= 16 ? "Very High" : v >= 12 ? "High" : v >= 8 ? "Average" : v >= 4 ? "Low" : "Very Low";
          return `<div class="data-row"><span>${k}</span><span>${lbl}</span></div>`;
        }).join("")}
    </div>`;

  // Scout report
  const reportHtml = scoutingReportCard(player, 1.0);

  // Player identity header strip
  const devBadge = player.devCurve ? `<span class="trait-badge tc-neutral">${player.devCurve} Developer</span>` : "";
  const potBadge = player.potentialGrade ? `<span class="trait-badge tc-pos">Ceiling: ${player.potentialGrade}</span>` : "";
  const headerBadges = [devBadge, potBadge].filter(Boolean).join(" ");

  return `<div class="profile-layout">
    <div class="profile-hero">
      <div class="profile-hero-main">
        <span class="profile-pos-badge">${player.position}</span>
        <div><strong class="profile-hero-name">${player.name}</strong><span class="profile-hero-meta">${player.year} · ${player.archetype} · <span class="${attrValClass(Math.round(player.ovr / 5.5))}">OVR ${player.ovr}</span></span></div>
      </div>
      ${headerBadges ? `<div class="trait-badge-row" style="margin-top:6px">${headerBadges}</div>` : ""}
    </div>
    <div class="profile-meta">
      <div class="data-row"><span>Scheme Fit</span><span>${player.schemeFit}</span></div>
      <div class="data-row"><span>Positions</span><span>${positionsLabel}</span></div>
      <div class="data-row"><span>Academic</span><span>${player.academicStatus}</span></div>
      <div class="data-row"><span>Transfer Risk</span><span>${player.transferRisk}</span></div>
      <div class="data-row"><span>Morale</span><span>${player.morale}</span></div>
      <div class="data-row"><span>Dev Focus</span><span>${player.developmentFocus}</span></div>
    </div>
    <div class="profile-tabs">
      <button class="profile-tab active-tab" data-profile-tab="pos-attrs" data-player-id="${player.id}">Position Attrs</button>
      <button class="profile-tab" data-profile-tab="gen-attrs" data-player-id="${player.id}">General Attrs</button>
      <button class="profile-tab" data-profile-tab="personality" data-player-id="${player.id}">Traits &amp; Personality</button>
      <button class="profile-tab" data-profile-tab="report" data-player-id="${player.id}">Scout Report</button>
    </div>
    <div class="profile-tab-content" data-tab-panel="pos-attrs">${posAttrHtml}</div>
    <div class="profile-tab-content" data-tab-panel="gen-attrs" style="display:none">${genAttrHtml}</div>
    <div class="profile-tab-content" data-tab-panel="personality" style="display:none">${traitHtml}</div>
    <div class="profile-tab-content" data-tab-panel="report" style="display:none">${reportHtml}</div>
    <div class="profile-actions">
      <p class="label">Redshirt Intent</p>
      <div class="chip-row">
        ${intentAction(player, "Preserve")}
        ${intentAction(player, "Evaluate")}
        ${intentAction(player, "No Redshirt")}
      </div>
      <p class="label">Development Focus</p>
      <div class="chip-row">
        ${focusAction(player, "Film Study")}
        ${focusAction(player, "Strength")}
        ${focusAction(player, "Technique")}
      </div>
      <p class="label">Usage Promise</p>
      <div class="chip-row">
        ${promiseAction(player, "High Usage", promise)}
        ${promiseAction(player, "Rotation", promise)}
        ${promiseAction(player, "Development Year", promise)}
      </div>
      <p class="label">Game Count (prototype shell)</p>
      <div class="chip-row">
        <button class="small-action secondary" data-player-action="games" data-player-id="${player.id}" data-player-value="-1">-1 game</button>
        <button class="small-action" data-player-action="games" data-player-id="${player.id}" data-player-value="1">+1 game</button>
        <button class="small-action secondary" data-open-view="roster">Back to Roster</button>
      </div>
      ${warning ? `<div class="profile-warning">${warning}</div>` : ""}
    </div>
  </div>`;
}

function depthPlannerPanel() {
  ensureDepthChartState();
  const rows = Object.keys(DEPTH_SLOT_POSITION)
    .map((slot) => {
      const options = depthOptionsForSlot(slot)
        .map((player) => {
          const selected = data.depthChart[slot] === player.id ? " selected" : "";
          return `<option value="${player.id}"${selected}>${player.name} (${player.year}, ${player.ovr})</option>`;
        })
        .join("");
      return `<label class="depth-row">
        <span>${slot}</span>
        <select data-depth-slot="${slot}">${options}</select>
      </label>`;
    })
    .join("");
  const issues = depthValidationIssues();
  const issueMarkup = issues.length
    ? `<div class="profile-warning">${issues.map((issue) => `<div>${issue}</div>`).join("")}</div>`
    : '<div class="agenda-item"><strong>Depth is valid</strong><p>No required slots are empty and no duplicate starters are assigned.</p></div>';
  return `<div class="profile-layout">
    <div class="profile-actions">
      <p class="label">Starter Slots</p>
      ${rows}
    </div>
    ${issueMarkup}
    <div class="field-card-wrap">${fieldView()}</div>
  </div>`;
}

function depthOptionsForSlot(slot) {
  const position = DEPTH_SLOT_POSITION[slot];
  return players().filter((player) => player.position === position);
}

function depthValidationIssues() {
  ensureDepthChartState();
  const issues = [];
  const seen = new Set();
  Object.keys(DEPTH_SLOT_POSITION).forEach((slot) => {
    const playerId = data.depthChart[slot];
    if (!isNonEmptyString(playerId)) {
      issues.push(`${slot} has no assigned starter.`);
      return;
    }
    if (seen.has(playerId)) {
      issues.push(`Duplicate starter assignment detected at ${slot}.`);
    }
    seen.add(playerId);
  });
  return issues;
}

function intentAction(player, label) {
  const selected = player.redshirtIntent === label;
  return `<button class="small-action${selected ? " secondary" : ""}" data-player-action="redshirt" data-player-id="${player.id}" data-player-value="${label}">${label}</button>`;
}

function focusAction(player, label) {
  const selected = player.developmentFocus === label;
  return `<button class="small-action${selected ? " secondary" : ""}" data-player-action="focus" data-player-id="${player.id}" data-player-value="${label}">${label}</button>`;
}

function promiseAction(player, label, current) {
  const selected = current === label;
  return `<button class="small-action${selected ? " secondary" : ""}" data-player-action="promise" data-player-id="${player.id}" data-player-value="${label}">${label}</button>`;
}

function playerRedshirtWarning(player) {
  const games = player.eligibility.gamesPlayedThisSeason;
  if (player.redshirtIntent !== "Preserve") return "";
  if (games > REDSHIRT_MAX_GAMES) {
    return `Warning: redshirt is no longer preservable (${games} games).`;
  }
  const remaining = REDSHIRT_MAX_GAMES - games;
  return `Preserve track: ${remaining} game(s) remain before threshold.`;
}

function eligibilitySnapshot(player) {
  const status = player.eligibility.redshirtUsed ? "Used" : "Available";
  return `<div class="data-list">
    <div class="data-row"><div><strong>Seasons Played</strong><span>Five-year window shell</span></div><span>${player.eligibility.seasonsPlayed}</span></div>
    <div class="data-row"><div><strong>Remaining Seasons</strong><span>Before expiration</span></div><span>${player.eligibility.remainingSeasons}</span></div>
    <div class="data-row"><div><strong>Games This Season</strong><span>Redshirt threshold ${REDSHIRT_MAX_GAMES}</span></div><span>${player.eligibility.gamesPlayedThisSeason}</span></div>
    <div class="data-row"><div><strong>Redshirt Used</strong><span>Career level</span></div><span>${status}</span></div>
  </div>`;
}

function peerComparisonTable(player) {
  const peers = players()
    .filter((entry) => entry.position === player.position)
    .slice(0, 7);
  if (!peers.length) return "<p>No peers at this position.</p>";
  const rows = peers.map((entry) => {
    const isActive = entry.id === player.id;
    const ovr = entry.ovr;
    const cls = attrValClass(ovr);
    return `<button class="table-row selectable${isActive ? " active" : ""}" data-select-player="${entry.id}">
      <span>${entry.position}</span>
      <strong>${entry.name}</strong>
      <span>${entry.year}</span>
      <span class="attr-val ${cls}" style="background:none">${ovr}</span>
      <span>${entry.developmentFocus || "\u2014"}</span>
    </button>`;
  }).join("");
  return `<div class="table-list">
    <div class="table-row header"><span>Pos</span><span>Player</span><span>Class</span><span>OVR</span><span>Focus</span></div>
    ${rows}
  </div>`;
}

function recruitTable(items) {
  return table([
    ["Pos", "Player", "Grade", "Interest", "Status"],
    ...items,
  ]);
}

function recruitTableInteractive(items) {
  if (!items.length) {
    return "<p>No recruiting targets are available.</p>";
  }
  ensureProspectSelection();
  const rows = [...items]
    .sort((a, b) => {
      const commitmentRank = (value) => (value === "Committed Lakeview" ? 2 : value === "Open" ? 1 : 0);
      const rankDelta = commitmentRank(b.commitmentStatus) - commitmentRank(a.commitmentStatus);
      if (rankDelta) return rankDelta;
      return (b.commitChance || 0) - (a.commitChance || 0);
    })
    .map((prospect) => {
      const active = prospect.id === selectedProspectId;
      const statusText = prospect.commitmentStatus === "Committed Lakeview"
        ? "Committed"
        : prospect.commitmentStatus === "Committed Other"
          ? "Elsewhere"
          : prospect.status;
      return `<button class="table-row selectable${active ? " active" : ""}" data-select-prospect="${prospect.id}">
        <span>${prospect.position}</span>
        <strong>${prospect.name}</strong>
        <span>${prospect.stars}</span>
        <span>${prospect.commitChance}%</span>
        <span>${statusText}</span>
      </button>`;
    })
    .join("");
  return `<div class="table-list">
    <div class="table-row header">
      <span>Pos</span>
      <span>Prospect</span>
      <span>Stars</span>
      <span>Commit</span>
      <span>Status</span>
    </div>
    ${rows}
  </div>`;
}

function filteredProspects() {
  ensureRecruitingState();
  const filters = data.recruitingState.filters;
  return prospects().filter((prospect) => {
    const positionOk = filters.position === "All" || prospect.position === filters.position;
    const statusOk = filters.status === "All" || prospect.commitmentStatus === filters.status;
    return positionOk && statusOk;
  });
}

function recruitingFilterPanel() {
  ensureRecruitingState();
  const selectedPosition = data.recruitingState.filters.position;
  const selectedStatus = data.recruitingState.filters.status;
  const positions = ["All", ...new Set(prospects().map((prospect) => prospect.position))].sort();
  const statuses = ["All", "Open", "Committed Lakeview", "Committed Other"];
  const count = filteredProspects().length;

  const positionOptions = positions
    .map((position) => `<option value="${position}"${position === selectedPosition ? " selected" : ""}>${position}</option>`)
    .join("");
  const statusOptions = statuses
    .map((status) => `<option value="${status}"${status === selectedStatus ? " selected" : ""}>${status}</option>`)
    .join("");

  return `<div class="profile-layout">
    <div class="profile-actions">
      <label class="depth-row">
        <span>Position</span>
        <select data-recruit-filter="position">${positionOptions}</select>
      </label>
      <label class="depth-row">
        <span>Status</span>
        <select data-recruit-filter="status">${statusOptions}</select>
      </label>
      <div class="agenda-item">
        <strong>${count} board targets shown</strong>
        <p>Use filters to reduce board noise and review open paths faster.</p>
      </div>
    </div>
  </div>`;
}

function prospectProfilePanel(prospect) {
  const locked = prospect.commitmentStatus !== "Open";
  const noOffer = !prospect.offered;
  const budgetLow = recruitingActionPoints() < 1;
  const visitCostLow = recruitingActionPoints() < RECRUITING_ACTION_COST.visit;
  const offerCostLow = recruitingActionPoints() < RECRUITING_ACTION_COST.offer;
  const lockText = locked ? `<div class="profile-warning">Recruitment closed: ${prospect.status}</div>` : "";

  const scoutedStr = prospect.scoutedLow && prospect.scoutedHigh
    ? `${prospect.scoutedLow}-${prospect.scoutedHigh} (±${Math.round((prospect.scoutedHigh - prospect.scoutedLow) / 2)})`
    : "Unknown";

  const prefs = prospect.preferences || {};
  const topPrefs = Object.entries(prefs)
    .sort(([,a],[,b]) => b - a).slice(0, 3)
    .map(([k]) => k.replace(/([A-Z])/g, ' $1').trim()).join(", ");

  const promiseList = (prospect.promisesMade || []).join(", ") || "None";

  // Trait clusters, depth derived from scouting progress
  const scoutDepth = prospectScoutingDepth(prospect);
  const clusters = deriveTraitClusters(prospect, scoutDepth);
  const traitSection = clusters.length
    ? `<div class="prospect-traits"><p class="label" style="margin-bottom:6px">Scout Labels <span style="font-size:0.72rem;color:var(--quiet)">(${Math.round(scoutDepth * 100)}% scouted)</span></p>${traitClustersGrouped(clusters)}</div>`
    : `<div class="prospect-traits"><p class="label">Scout Labels</p><span class="trait-empty">Scout further to reveal traits.</span></div>`;

  // Attribute panel, uses uncertainty bars based on scouted range
  const posSpec = POSITION_ATTRS_SPEC[prospect.position];
  const prospecPosAttrs = prospect.posAttrs || (posSpec ? playerDefaultPosAttrs(prospect.position, prospect.ovr || 72, createSeededRandom(`prospect:attrs:${prospect.id}`)) : {});
  const prospectAttrHtml = posSpec
    ? `<div class="attr-grid">${posSpec.groups.map((g) => renderProspectAttrGroup(g, prospecPosAttrs, prospect.scoutedLow, prospect.scoutedHigh)).join("")}</div>`
    : `<p class="creator-note">No position attribute spec for ${prospect.position}.</p>`;

  // Scout report
  const prospectReportHtml = scoutingReportCard(prospect, scoutDepth);

  // Star display
  const starStr = "★".repeat(prospect.stars || 0) + "☆".repeat(5 - (prospect.stars || 0));
  const devBadge = prospect.devCurve ? `<span class="trait-badge tc-neutral">${prospect.devCurve}</span>` : "";
  const potBadge = prospect.potentialGrade ? `<span class="trait-badge tc-pos">Ceiling ${prospect.potentialGrade}</span>` : "";
  const scoutBadge = `<span class="trait-badge tc-neutral">${Math.round(scoutDepth * 100)}% scouted</span>`;

  const promiseButtons = !locked && prospect.offered
    ? RECRUITING_PROMISE_TYPES.map((pt) => {
        const alreadyMade = (prospect.promisesMade || []).includes(pt.label);
        return `<button class="small-action secondary" data-recruit-action="promise_${pt.id}" data-prospect-id="${prospect.id}" ${alreadyMade ? "disabled" : ""}>${pt.label}${alreadyMade ? " ✓" : ""}</button>`;
      }).join("")
    : "";

  return `<div class="profile-layout">
    <div class="profile-hero">
      <div class="profile-hero-main">
        <span class="profile-pos-badge">${prospect.position}</span>
        <div>
          <strong class="profile-hero-name">${prospect.name}</strong>
          <span class="profile-hero-meta">${prospect.hometown}, ${prospect.state} · ${starStr}</span>
        </div>
      </div>
      <div class="trait-badge-row" style="margin-top:6px">${[devBadge, potBadge, scoutBadge].filter(Boolean).join(" ")}</div>
    </div>
    <div class="profile-meta">
      <div class="data-row"><span>Scouted OVR</span><span>${scoutedStr}</span></div>
      <div class="data-row"><span>Campus Interest</span><span>${prospect.interest}%</span></div>
      <div class="data-row"><span>Top Priorities</span><span>${topPrefs}</span></div>
      <div class="data-row"><span>Pipeline</span><span>${prospect.pipeline}</span></div>
      <div class="data-row"><span>Need Fit</span><span>${prospect.needFit}%</span></div>
      <div class="data-row"><span>Flip Risk</span><span>${prospect.flipRisk}%</span></div>
      <div class="data-row"><span>Promises Made</span><span>${promiseList}</span></div>
      <div class="data-row"><span>Status</span><span>${prospect.status}</span></div>
    </div>
    <div class="profile-tabs">
      <button class="profile-tab active-tab" data-profile-tab="prospect-attrs">Attributes</button>
      <button class="profile-tab" data-profile-tab="prospect-traits">Traits</button>
      <button class="profile-tab" data-profile-tab="prospect-report">Scout Report</button>
    </div>
    <div class="profile-tab-content" data-tab-panel="prospect-attrs">${prospectAttrHtml}</div>
    <div class="profile-tab-content" data-tab-panel="prospect-traits" style="display:none">${traitSection}</div>
    <div class="profile-tab-content" data-tab-panel="prospect-report" style="display:none">${prospectReportHtml}</div>
    <div class="profile-actions">
      <p class="label">Recruiting Actions (${recruitingActionPoints()} AP left)</p>
      <div class="chip-row">
        <button class="small-action secondary" data-recruit-action="scout" data-prospect-id="${prospect.id}" ${locked || budgetLow ? "disabled" : ""}>Scout (1)</button>
        <button class="small-action secondary" data-recruit-action="contact" data-prospect-id="${prospect.id}" ${locked || budgetLow ? "disabled" : ""}>Contact (1)</button>
        <button class="small-action secondary" data-recruit-action="offer" data-prospect-id="${prospect.id}" ${locked || offerCostLow ? "disabled" : ""}>Offer (2)</button>
        <button class="small-action secondary" data-recruit-action="visit" data-prospect-id="${prospect.id}" ${locked || noOffer || visitCostLow ? "disabled" : ""}>Visit (2)</button>
        <button class="small-action secondary" data-open-view="recruiting">Back to Recruiting</button>
      </div>
      ${promiseButtons ? `<p class="label" style="margin-top:8px">Make a Promise (improves commit chance)</p><div class="chip-row">${promiseButtons}</div>` : ""}
      ${lockText}
    </div>
  </div>`;
}

function prospectSnapshot(prospect) {
  const confidence = Math.max(1, Math.min(99, prospect.scoutConfidence));
  const closing = Math.max(1, Math.min(99, prospect.commitChance));
  const nilNeed = Math.max(1, Math.min(99, 100 - prospect.interest + 20));
  return meters([
    ["Scout confidence", confidence],
    ["Commit chance", closing],
    ["NIL pressure", nilNeed],
  ]);
}

function prospectBoardTable(prospect) {
  const board = prospects()
    .filter((entry) => entry.position === prospect.position)
    .slice(0, 8);
  if (!board.length) return "<p>No position board data.</p>";
  const rows = board.map((entry) => {
    const active = entry.id === prospect.id;
    return `<button class="table-row selectable${active ? " active" : ""}" data-select-prospect="${entry.id}">
      <span>${entry.position}</span>
      <strong>${entry.name}</strong>
      <span>${entry.stars}</span>
      <span>${entry.scoutConfidence}%</span>
      <span>${entry.commitChance}%</span>
    </button>`;
  }).join("");
  return `<div class="table-list">
    <div class="table-row header"><span>Pos</span><span>Prospect</span><span>Stars</span><span>Scout</span><span>Commit</span></div>
    ${rows}
  </div>`;
}

// ── Grounded Report Payload Builder ──────────────────────────────────────
// Builds a structured payload for deterministic report language generation.
// Follows the spec in 24_TRAIT_ARCHETYPES doc Part IV.
// No LLM required — also used to generate deterministic text reports inline.
function buildScoutingReportPayload(entity, scoutingDepth) {
  const depth = scoutingDepth !== undefined ? scoutingDepth : 1;
  const clusters = deriveTraitClusters(entity, depth);
  const visTraits = clusters.map((c) => c.label);
  const riskTraits = clusters.filter((c) => c.cat === "Risk").map((c) => c.label);

  // Scouted attribute ranges (for prospect: from scoutedLow/High; for player: exact)
  const scoutedRatings = {};
  if (entity.scoutedLow && entity.scoutedHigh && entity.attrs) {
    const keySet = KEY_ATTRS_BY_POSITION[entity.position] || new Set();
    [...keySet].slice(0, 4).forEach((k) => {
      const v = entity.attrs[k] || 10;
      const spread = Math.round((entity.scoutedHigh - entity.scoutedLow) / 4);
      scoutedRatings[PLAYER_ATTR_LABELS[k] || k] = { low: Math.max(1, v - spread), high: Math.min(20, v + spread) };
    });
  } else if (entity.attrs) {
    const keySet = KEY_ATTRS_BY_POSITION[entity.position] || new Set();
    [...keySet].slice(0, 4).forEach((k) => {
      const v = entity.attrs[k] || 10;
      scoutedRatings[PLAYER_ATTR_LABELS[k] || k] = { low: v, high: v };
    });
  }

  // Staff opinions (from position coaches + HC context)
  const staffOpinions = [];
  if (entity.position) {
    const posCoaches = (data.positionCoaches || []).filter(
      (c) => c.programId === currentProgram().id && Array.isArray(c.devGroups) && c.devGroups.includes(entity.position)
    );
    posCoaches.slice(0, 2).forEach((c) => {
      const tone = (c.attrs && c.attrs.motivation >= 14) ? "encouraging" : "analytical";
      const highlight = clusters.find((t) => t.pos === true);
      const concern = clusters.find((t) => t.pos === false);
      const opinionParts = [];
      if (highlight) opinionParts.push(`Noted ${highlight.label.toLowerCase()}`);
      if (concern) opinionParts.push(`concerned about ${concern.label.toLowerCase()}`);
      if (opinionParts.length) {
        staffOpinions.push({ staffRole: c.role, opinion: opinionParts.join("; ") + ".", tone });
      }
    });
  }

  // Forbidden claims — things the report MUST NOT assert without evidence
  const forbiddenClaims = ["injury","criminal","NIL dollar amount","academic violation","commitment","decommitment"];
  if (!entity.academicStatus || entity.academicStatus === "Good Standing") forbiddenClaims.push("academic risk");

  return {
    entityName: entity.name || "Unknown",
    position: entity.position,
    classYear: entity.classYear || entity.year,
    stars: entity.stars,
    scoutConfidence: entity.scoutConfidence || Math.round(depth * 95),
    visibleTraits: visTraits,
    riskLabels: riskTraits,
    devCurve: entity.devCurve,
    potentialGrade: entity.potentialGrade,
    scoutedRatings,
    staffOpinions,
    forbiddenClaims,
  };
}

/**
 * Generate a deterministic text scouting report from a payload.
 * No LLM — rule-based language templates grounded in structured facts.
 */
function generateDeterministicScoutReport(payload) {
  const { entityName, position, visibleTraits, riskLabels, devCurve, potentialGrade, scoutedRatings, staffOpinions } = payload;
  const posTraits = (visibleTraits || []).filter((t) => {
    const def = TRAIT_CLUSTER_DEFS.find((d) => d.label === t);
    return def && def.pos === true;
  });
  const negTraits = (visibleTraits || []).filter((t) => {
    const def = TRAIT_CLUSTER_DEFS.find((d) => d.label === t);
    return def && def.pos === false;
  });
  const neutralTraits = (visibleTraits || []).filter((t) => {
    const def = TRAIT_CLUSTER_DEFS.find((d) => d.label === t);
    return def && def.pos === null;
  });

  const devDesc = devCurve === "Early" ? "a player who could contribute quickly"
    : devCurve === "Late" ? "a prospect who will need time to develop"
    : devCurve === "BoomBust" ? "a high-variance prospect with real boom-or-bust potential"
    : "a steady developmental player";

  const summaryParts = [`${entityName} is ${devDesc}`];
  if (potentialGrade) summaryParts.push(`with a projected ceiling of ${potentialGrade}`);
  const summary = summaryParts.join(" ") + ".";

  const likes = posTraits.length
    ? `Staff values: ${posTraits.join(", ")}.`
    : "No standout positives identified at this scouting depth.";

  const concerns = negTraits.length
    ? `Concerns noted: ${negTraits.join(", ")}.`
    : null;

  const neutralNote = neutralTraits.length
    ? `Context: ${neutralTraits.join(", ")}.`
    : null;

  const ratingLines = Object.entries(scoutedRatings || {}).map(([k, v]) =>
    v.low === v.high ? `  ${k}: ${v.low}` : `  ${k}: ${v.low}–${v.high}`
  ).join("\n");

  const staffBlock = (staffOpinions || []).map(
    (opinion) => `  ${opinion.staffRole}: "${opinion.opinion}"`
  ).join("\n");

  const riskBlock = riskLabels && riskLabels.length
    ? `Risk flags: ${riskLabels.join(", ")}.`
    : null;

  const lines = [
    `SCOUTING REPORT — ${entityName} · ${position || "?"}`,
    "",
    summary,
    "",
    likes,
    concerns,
    neutralNote,
    ratingLines ? `Key Ratings:\n${ratingLines}` : null,
    staffBlock ? `Staff Opinions:\n${staffBlock}` : null,
    riskBlock,
  ].filter(Boolean);

  return lines.join("\n");
}

/** Render a scouting report card for any entity (player or prospect) */
function scoutingReportCard(entity, scoutingDepth) {
  ensureStaffState();
  const depth = scoutingDepth !== undefined ? scoutingDepth : 1;
  const payload = buildScoutingReportPayload(entity, depth);
  const report = generateDeterministicScoutReport(payload);
  // Format for HTML with a card-style view
  const lines = report.split("\n");
  const title = lines[0] || "Scouting Report";
  const body = lines.slice(2).join("\n").trim();
  const htmlBody = body.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>");
  return `<div class="scout-report-card">
    <p class="scout-report-title">${title}</p>
    <div class="scout-report-body"><p>${htmlBody}</p></div>
  </div>`;
}

function portalTableInteractive(items) {
  ensurePortalState();
  const open = isPortalWindowOpen();
  if (!Array.isArray(items) || !items.length) {
    return "<p>No portal targets are available in this slice.</p>";
  }
  const rows = items
    .map((row, index) => {
      const name = row[1];
      const status = data.portalState.targetStatus[name] || row[4] || "Watch list";
      const canPursue = status === "Contact established" || status === "Likely transfer";
      const pending = data.portalState.pendingAdds.includes(name);
      return `<div class="decision-item">
        <div>
          <strong>${row[0]} ${name}</strong>
          <p>${row[2]} | OVR ${row[3]} | ${status}</p>
        </div>
        <div class="decision-actions">
          <button class="small-action secondary" data-portal-action="contact" data-portal-index="${index}" ${open ? "" : "disabled"}>Contact</button>
          <button class="small-action" data-portal-action="pursue" data-portal-index="${index}" ${open && canPursue ? "" : "disabled"}>Pursue</button>
          <button class="small-action secondary" data-portal-action="remove" data-portal-index="${index}" ${pending ? "" : "disabled"}>Remove</button>
        </div>
      </div>`;
    })
    .join("");
  return `<div class="decision-list">
    ${rows}
    ${open ? "" : '<div class="agenda-item"><strong>Portal is closed</strong><p>Use retention actions while waiting for the open window or activate a coach-change exception.</p></div>'}
  </div>`;
}

function portalRiskTableInteractive(items) {
  ensureRetentionState();
  maybeResetRetentionBudgetForWeek();
  if (!Array.isArray(items) || !items.length) {
    return "<p>No outgoing-risk players are tracked right now.</p>";
  }
  return `<div class="decision-list">${items
    .map((row, index) => {
      const key = retentionKey(row);
      const score = data.retentionState.playerRisk[key] || riskLabelToScore(row[3]);
      return `<div class="decision-item">
        <div>
          <strong>${row[0]} ${row[1]} (${row[2]})</strong>
          <p>Risk ${riskScoreToLabel(score)} (${score}) - ${row[4]}</p>
        </div>
        <div class="decision-actions">
          <button class="small-action secondary" data-retention-action="conversation" data-retention-index="${index}" ${data.retentionState.actionPoints >= RETENTION_ACTION_COST.conversation ? "" : "disabled"}>Conversation (1)</button>
          <button class="small-action secondary" data-retention-action="rolePitch" data-retention-index="${index}" ${data.retentionState.actionPoints >= RETENTION_ACTION_COST.rolePitch ? "" : "disabled"}>Role Pitch (1)</button>
          <button class="small-action" data-retention-action="benefitBoost" data-retention-index="${index}" ${data.retentionState.actionPoints >= RETENTION_ACTION_COST.benefitBoost ? "" : "disabled"}>Benefit Boost (2)</button>
        </div>
      </div>`;
    })
    .join("")}</div>`;
}

function portalCompliancePanel() {
  ensurePortalState();
  const countdown = portalWindowCountdown();
  const summary = rosterComplianceSummary();
  const projected = projectedRosterCount();
  const limit = data.portalState.rosterLimit;
  const pending = data.portalState.pendingAdds.join(", ");
  return `<div class="agenda-list">
    <div class="agenda-item">
      <time>Portal Window</time>
      <strong>${portalWindowLabel()}</strong>
      <p>${countdown === null ? "No future open window is configured in this demo calendar." : `Countdown: ${countdown} event(s).`}</p>
    </div>
    <div class="agenda-item">
      <time>Roster Compliance</time>
      <strong>${summary.tone}</strong>
      <p>Projected ${projected}/${limit}. ${summary.detail}</p>
    </div>
    <div class="agenda-item">
      <time>Pending Adds</time>
      <strong>${data.portalState.pendingAdds.length}</strong>
      <p>${pending || "No pending incoming additions."}</p>
    </div>
    <div class="agenda-item">
      <time>Coach-Change Exception</time>
      <strong>${data.portalState.coachChangeExceptionRemaining > 0 ? "Active" : "Inactive"}</strong>
      <p>Temporary portal access path in rules-sensitive periods.</p>
      <button class="small-action" data-portal-exception="activate" ${data.portalState.coachChangeExceptionRemaining > 0 ? "disabled" : ""}>Activate (${ruleValue("portalExceptionAdvances", PORTAL_EXCEPTION_ADVANCES)} advances)</button>
    </div>
  </div>`;
}

function portalStrategyMeters() {
  ensureBenefitState();
  ensureRetentionState();
  const highRisk = (Array.isArray(data.outgoingRisk) ? data.outgoingRisk : []).filter((row) => {
    const score = data.retentionState.playerRisk[retentionKey(row)] || riskLabelToScore(row[3]);
    return score >= 70;
  }).length;
  const retentionPressure = data.benefitState.buckets.retention.pressure;
  const recruitPressure = data.benefitState.buckets.recruiting.pressure;
  return meters([
    ["Outgoing high-risk count", Math.min(99, highRisk * 20)],
    ["Retention pressure", retentionPressure],
    ["Acquisition pressure", recruitPressure],
    ["Benefit pool used", Math.min(99, Math.round((totalCommittedBenefits() / data.benefitState.totalPool) * 100))],
  ]);
}

function benefitBudgetRows() {
  ensureBenefitState();
  const rows = [["Category", "Budgeted", "Committed", "Available", "Pressure"]];
  BENEFIT_BUCKET_KEYS.forEach((key) => {
    const bucket = data.benefitState.buckets[key];
    rows.push([
      key[0].toUpperCase() + key.slice(1),
      `$${bucket.budgeted}k`,
      `$${bucket.committed}k`,
      `$${Math.max(0, bucket.budgeted - bucket.committed)}k`,
      String(bucket.pressure),
    ]);
  });
  rows.push(["Total Pool", `$${data.benefitState.totalPool}k`, `$${totalCommittedBenefits()}k`, `$${benefitPoolRemaining()}k`, "-"]);
  return rows;
}

function benefitBudgetTable() {
  return table(benefitBudgetRows());
}

function benefitPressureMeters() {
  ensureBenefitState();
  return meters([
    ["NIL market volatility", ruleValue("nilVolatilityPercent", 100)],
    ["Retention", data.benefitState.buckets.retention.pressure],
    ["Recruiting", data.benefitState.buckets.recruiting.pressure],
    ["Development", data.benefitState.buckets.development.pressure],
    ["Emergency", data.benefitState.buckets.emergency.pressure],
  ]);
}

function injuryRiskSignalScore() {
  const cadence = ruleValue("injuryCadencePercent", 100);
  const tactical = data.seasonState && data.seasonState.tacticalProfile === "Aggressive" ? 10 : 0;
  const random = createSeededRandom(`${career.seed}:injury:${career.advanceCount}:${data.seasonState ? data.seasonState.currentGameIndex : 0}`);
  const noise = Math.round((random() * 2 - 1) * 6);
  // Active practice emphasis tilts the live injury read.
  ensurePracticeState();
  const emphasis = currentPracticeEmphasis();
  const practiceTilt = Number.isFinite(emphasis.injuryDelta) ? emphasis.injuryDelta : 0;
  return Math.max(8, Math.min(95, Math.round(24 * (cadence / 100)) + tactical + noise + practiceTilt));
}

function benefitAllocationPanel() {
  ensureBenefitState();
  const rows = BENEFIT_BUCKET_KEYS
    .map((key) => {
      const bucket = data.benefitState.buckets[key];
      const label = key[0].toUpperCase() + key.slice(1);
      return `<div class="decision-item">
        <div>
          <strong>${label}</strong>
          <p>$${bucket.committed}k committed of $${bucket.budgeted}k budgeted</p>
        </div>
        <div class="decision-actions">
          <button class="small-action secondary" data-benefit-bucket="${key}" data-benefit-delta="-10" ${bucket.committed >= 10 ? "" : "disabled"}>-10k</button>
          <button class="small-action" data-benefit-bucket="${key}" data-benefit-delta="10" ${bucket.committed + 10 <= bucket.budgeted && benefitPoolRemaining() >= 10 ? "" : "disabled"}>+10k</button>
        </div>
      </div>`;
    })
    .join("");
  return `<div class="decision-list">
    ${rows}
    <div class="agenda-item">
      <strong>Pool Remaining: $${benefitPoolRemaining()}k</strong>
      <p>Allocation cannot exceed bucket budgets or total configured pool.</p>
    </div>
  </div>`;
}

function facilitiesRequestPanel() {
  ensureFacilitiesState();
  if (!Array.isArray(data.facilities) || !data.facilities.length) {
    return "<p>No facility requests are available.</p>";
  }
  return `<div class="decision-list">${data.facilities
    .map((row, index) => {
      const status = data.facilitiesState.requestStatus[row[0]] || "Pending";
      return `<div class="decision-item">
        <div>
          <strong>${row[0]} (${row[1]})</strong>
          <p>${row[2]} | Cost ${row[3]} | Approval ${row[4]} | ${status}</p>
        </div>
        <div class="decision-actions">
          <button class="small-action" data-facility-action="approve" data-facility-index="${index}" ${status === "Approved" ? "disabled" : ""}>Approve</button>
          <button class="small-action secondary" data-facility-action="defer" data-facility-index="${index}" ${status === "Deferred" ? "disabled" : ""}>Defer</button>
        </div>
      </div>`;
    })
    .join("")}</div>`;
}

function coachProfilePanel() {
  ensureStaffState();
  const profile = currentCoachProfile();
  if (!profile) return "<p>No coach profile linked to this program.</p>";
  const rows = topAttributeRows(profile.attrs, COACH_ATTRS, 10);
  return `<div class="decision-list">
    <div class="agenda-item">
      <strong>${profile.name}</strong>
      <p>${profile.role} | Program ${currentProgram().shortName}</p>
    </div>
    ${rows.map(([label, value]) => `<div class="data-row"><div><strong>${label}</strong></div><span class="rating">${value}</span></div>`).join("")}
  </div>`;
}

function positionCoachesPanel() {
  ensureStaffState();
  const coaches = (data.positionCoaches || []).filter((c) => c.programId === currentProgram().id);
  if (!coaches.length) return "<p>No position coaches on staff.</p>";
  function happinessLabel(v) {
    if (v >= 80) return '<span style="color:var(--good)">Happy</span>';
    if (v >= 55) return '<span style="color:var(--muted)">Neutral</span>';
    return '<span style="color:var(--bad)">Unhappy</span>';
  }
  const rows = coaches.map((c) => {
    const salary = c.salary ? `$${(c.salary / 1000).toFixed(0)}K` : "—";
    const contract = c.contractYears ? `Yr ${c.contractYear || 1}/${c.contractYears}` : "—";
    const groups = Array.isArray(c.devGroups) && c.devGroups.length ? c.devGroups.join(", ") : "—";
    return `<tr>
      <td><strong>${c.name}</strong></td>
      <td>${c.role}</td>
      <td>${salary}</td>
      <td>${contract}</td>
      <td>${groups}</td>
      <td>${happinessLabel(c.happiness || 60)}</td>
    </tr>`;
  }).join("");
  return `<table class="staff-table">
    <thead><tr>
      <th>Name</th><th>Role</th><th>Salary</th><th>Contract</th><th>Dev Groups</th><th>Mood</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function schoolProfilePanel() {
  ensureStaffState();
  const profile = currentSchoolProfile();
  if (!profile) return "<p>No school profile linked to this program.</p>";
  const rows = topAttributeRows(profile.attrs, SCHOOL_ATTRS, 8);
  const tableRows = [["School", profile.name], ["Conference", profile.conference], ...rows];
  return table(tableRows);
}

const STADIUM_UPGRADE_BIG8 = [
  { key: "homeFieldAdvantage", label: "Home-Field Edge",    impact: "Boosts game-day scoring mod" },
  { key: "atmosphere",         label: "Atmosphere",         impact: "Fan ratings & recruit visits" },
  { key: "capacity",           label: "Capacity",           impact: "Revenue per home game" },
  { key: "lockerRoomQuality",  label: "Locker Room",        impact: "Recruit campus tour score" },
  { key: "studentSectionEnergy",label: "Student Section",  impact: "Crowd noise opponent penalty" },
  { key: "trainingComplexLink",label: "Training Complex",   impact: "Player development rate" },
  { key: "turfQuality",        label: "Turf Quality",       impact: "Weather resilience" },
  { key: "scoreboardTech",     label: "Scoreboard Tech",    impact: "Fan experience score" },
];

function stadiumProfilePanel() {
  ensureStaffState();
  ensureFacilitiesState();
  const profile = currentStadiumProfile();
  if (!profile) return "<p>No stadium profile linked to this program.</p>";
  const pts = data.facilitiesState.stadiumUpgradePoints;
  const upgradePtsCls = pts >= 4 ? "av-high" : pts >= 2 ? "av-mid" : "av-low";
  let html = `<div class="stadium-builder">
    <div class="profile-hero" style="margin-bottom:14px">
      <div class="profile-hero-main">
        <div class="profile-pos-badge">STD</div>
        <div>
          <div class="profile-hero-name">${profile.name}</div>
          <div class="profile-hero-meta">${profile.city} &nbsp;·&nbsp; <span class="attr-val ${upgradePtsCls}">${pts}</span> upgrade pts remaining</div>
        </div>
      </div>
    </div>`;
  STADIUM_UPGRADE_BIG8.forEach(({ key, label, impact }) => {
    const val = (profile.attrs && typeof profile.attrs[key] === "number") ? profile.attrs[key] : 10;
    const cls = attrValClass(val);
    const pct = Math.round((val / 20) * 100);
    const maxed = val >= 20;
    const cantAfford = pts < 2;
    const canUpgrade = !maxed && !cantAfford;
    html += `<div class="stadium-upgrade-row">
      <span class="attr-label">${label}</span>
      <div class="attr-bar-wrap"><div class="attr-bar-fill ${cls}" style="width:${pct}%"></div></div>
      <span class="attr-val ${cls}">${val}</span>
      <span class="stadium-impact-note">${impact}</span>
      <button class="small-action${canUpgrade ? "" : " disabled"}" data-stadium-upgrade="${key}" ${canUpgrade ? "" : "disabled"}>+1 (2pts)</button>
    </div>`;
  });
  html += "</div>";
  return html;
}

function entityRelationshipPanel() {
  ensureStaffState();
  const program = currentProgram();
  const coach = currentCoachProfile();
  const school = currentSchoolProfile();
  const stadium = currentStadiumProfile();
  return `<div class="decision-list">
    <div class="agenda-item"><strong>Program</strong><p>${program.name} (${program.id})</p></div>
    <div class="agenda-item"><strong>Head Coach Link</strong><p>${coach ? `${coach.name} (${program.headCoachProfileId})` : "Missing"}</p></div>
    <div class="agenda-item"><strong>School Link</strong><p>${school ? `${school.name} (${program.schoolProfileId})` : "Missing"}</p></div>
    <div class="agenda-item"><strong>Stadium Link</strong><p>${stadium ? `${stadium.name} (${program.stadiumProfileId})` : "Missing"}</p></div>
  </div>`;
}

function pressureTraceRows() {
  ensurePressureState();
  const header = [["Tick", "Source", "Delta", "Pressure", "Reason"]];
  if (!data.pressureState.trace.length) {
    return [...header, ["-", "System", "0", String(data.pressureState.objectivePressure), "No trace events yet"]];
  }
  return [...header, ...data.pressureState.trace.slice(0, 10)];
}

function moraleTraceRows() {
  ensureCultureState();
  const header = [["Tick", "Player", "Delta", "Morale", "Cause"]];
  if (!data.cultureState.moraleTrace.length) {
    return [...header, ["-", "Team", "0", "Stable", "No morale events yet"]];
  }
  return [...header, ...data.cultureState.moraleTrace.slice(0, 10)];
}

function facilityImpactRows() {
  ensureFacilitiesState();
  const header = [["Season", "Area", "Change", "Status", "Impact"]];
  if (!data.facilitiesState.upgradeHistory.length) {
    return [...header, [String(currentSeasonYear()), "Facilities", "No upgrades", "Pending", "Long-term boost 0"]];
  }
  return [...header, ...data.facilitiesState.upgradeHistory.slice(0, 10)];
}

function coachHistoryRows() {
  const header = [["Season", "Coach", "Record", "Pressure", "Note"]];
  const years = [...data.history].slice(0, 6);
  const rows = years.map((row) => [row[0], career.coachName, row[1], String(data.pressureState.objectivePressure), row[4]]);
  return rows.length ? [...header, ...rows] : [...header, [String(currentSeasonYear()), career.coachName, career.record, String(data.pressureState.objectivePressure), "Active season"]];
}

function scheduleTable(items) {
  return table([
    ["Date", "Opponent", "Site", "Grade", "Note"],
    ...items,
  ]);
}

function standingsTable(items) {
  return table([
    ["#", "Program", "Record", "Rating", "Grade"],
    ...items,
  ]);
}

function table(rows) {
  return `<div class="table-list">${rows
    .map((row, index) => {
      const className = index === 0 ? "table-row header" : "table-row";
      const cells = row
        .map((cell, cellIndex) => {
          const tag = index > 0 && cellIndex === 1 ? "strong" : "span";
          return `<${tag}>${cell}</${tag}>`;
        })
        .join("");
      return `<div class="${className}">${cells}</div>`;
    })
    .join("")}</div>`;
}

function meters(items) {
  return `<div class="data-list">${items
    .map(([label, value]) => `<div class="data-row">
      <div>
        <strong>${label}</strong>
        <div class="meter" aria-label="${label}: ${value}%">
          <span style="--value: ${value}%"></span>
        </div>
      </div>
      <span class="rating">${value}</span>
    </div>`)
    .join("")}</div>`;
}

function fieldView() {
  const tokens = [
    ["QB", 48, 57],
    ["RB", 58, 62],
    ["X", 20, 30],
    ["Y", 35, 46],
    ["Z", 76, 33],
    ["LT", 39, 70],
    ["LG", 44, 70],
    ["C", 49, 70],
    ["RG", 54, 70],
    ["RT", 59, 70],
    ["TE", 68, 68],
  ];
  return `<div class="field-card" aria-label="Offensive depth chart field">
    ${tokens
      .map(
        ([label, left, top]) =>
          `<span class="player-token" style="left:${left}%; top:${top}%">${label}</span>`,
      )
      .join("")}
  </div>`;
}

function staffGrid(items) {
  if (!items.length) return '<p>No staff members found.</p>';
  return `<div class="staff-grid">${items
    .map(([role, name, specialty, grade]) => {
      const score = gradeToScore(grade);
      const barCls = score >= 90 ? "av-elite" : score >= 82 ? "av-high" : score >= 74 ? "av-mid" : "av-low";
      const barPct = Math.round((score / 100) * 100);
      return `<div class="staff-card">
        <div class="staff-card-header">
          <strong>${name}</strong>
          <span class="staff-grade-badge ${barCls}">${grade}</span>
        </div>
        <p class="staff-card-role">${role}</p>
        <p class="staff-card-spec">${specialty}</p>
        <div class="attr-bar-wrap" style="margin:6px 0"><div class="attr-bar-fill ${barCls}" style="width:${barPct}%"></div></div>
        <button class="small-action secondary" data-staff-action="fire" data-staff-role="${role}">Open Role</button>
      </div>`;
    })
    .join("")}</div>`;
}

function staffOpeningsPanel() {
  ensureStaffState();
  if (!data.staffOpenings.length) {
    return '<div class="agenda-item"><strong>No open staff roles</strong><p>All core positions are currently filled.</p></div>';
  }
  return `<div class="decision-list">${data.staffOpenings
    .map(([role, status]) => {
      const candidates = Array.isArray(data.staffCandidates[role]) ? data.staffCandidates[role] : [];
      const candidateRows = candidates
        .map(
          ([name, specialty, grade]) => `<div class="decision-item">
            <div>
              <strong>${name}</strong>
              <p>${specialty}</p>
              <div class="decision-meta"><span>${role}</span><span>Grade ${grade}</span></div>
            </div>
            <div class="decision-actions">
              <button class="small-action" data-staff-action="hire" data-staff-role="${role}" data-staff-name="${name}" data-staff-specialty="${specialty}" data-staff-grade="${grade}">Hire</button>
            </div>
          </div>`,
        )
        .join("");
      return `<article class="agenda-item">
        <time>${status}</time>
        <strong>${role}</strong>
        <p>Choose a candidate to fill this role.</p>
        ${candidateRows || "<p>No candidates in current shell.</p>"}
      </article>`;
    })
    .join("")}</div>`;
}

function gradeToScore(grade) {
  const map = {
    "A+": 98,
    A: 94,
    "A-": 90,
    "B+": 85,
    B: 80,
    "B-": 75,
    "C+": 70,
    C: 65,
    "C-": 60,
  };
  return map[grade] || 68;
}

function staffDelegationRows() {
  ensureStaffState();
  const rows = [["Area", "Owner", "Load", "Risk", "Recommendation"]];
  const roleMap = new Map((data.staff || []).map((row) => [row[0], row]));
  const areas = [
    ["Recruiting", "Recruiting Director", "High"],
    ["Defense", "Defensive Coordinator", "Med"],
    ["Offense", "Offensive Coordinator", "Med"],
    ["Sports Science", "Strength Coach", "Low"],
  ];
  areas.forEach(([area, role, load]) => {
    const entry = roleMap.get(role);
    if (!entry) {
      rows.push([area, "Open", load, "High", "Low"]);
      return;
    }
    const score = gradeToScore(entry[3]);
    const recommendation = score >= 90 ? "High" : score >= 82 ? "Good" : score >= 74 ? "Med" : "Low";
    const risk = score >= 88 ? "Low" : score >= 78 ? "Med" : "High";
    rows.push([area, entry[1], load, risk, recommendation]);
  });
  return rows;
}

nav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (!button) return;
  renderView(button.dataset.view);
});

content.addEventListener("click", (event) => {
  const rosterActionBtn = event.target.closest("[data-roster-action]");
  if (rosterActionBtn) {
    const action = rosterActionBtn.dataset.rosterAction;
    const ui = ensureRosterUiState();
    if (action === "compare") {
      if (selectedPlayerId) renderView("player");
      else setBootstrapStatus("Pick a player first, then compare from the player profile's peer section.");
    }
    else if (action === "columns") { cycleVisibleColumns(ui, ROSTER_VIEW_PRESETS); renderView("roster"); }
    else if (action === "save-view") { const ok = saveCurrentView(ui, `Roster ${ui.view} ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`, ["tab", "view", "posFilter", "classFilter", "search", "sort", "visibleColumns"]); setBootstrapStatus(ok ? "Saved current roster view." : "Could not save roster view."); persistUiState(); }
    else if (action === "ask-staff") {
      const player = findPlayer(selectedPlayerId);
      setBootstrapStatus(player
        ? `${player.position} ${player.name}: ${player.transferRisk === "High" ? "Retention risk is high, protect morale and usage." : "Stable enough to keep developing."} Focus: ${player.developmentFocus || "Balanced reps"}.`
        : "Select a player to get a staff read on fit, risk, and development focus.");
    }
    else if (action === "export") setBootstrapStatus("Export is not wired yet, but saved views and bookmarks now preserve your working setup.");
    return;
  }
  const recruitingActionBtn = event.target.closest("[data-recruiting-action]");
  if (recruitingActionBtn) {
    const action = recruitingActionBtn.dataset.recruitingAction;
    const ui = ensureRecruitingUiState();
    if (action === "assign-scout") {
      const prospect = findProspect(selectedProspectId);
      if (!prospect) setBootstrapStatus("Select a prospect first, then assign scouting pressure.");
      else if (applyRecruitingAction("scout", prospect)) {
        setBootstrapStatus(`Scouting assigned to ${prospect.name}. Confidence ${Math.round(prospect.scoutConfidence || 0)}%, interest ${Math.round(prospect.interest || 0)}%.`);
        renderView("recruiting");
      } else {
        setBootstrapStatus(`Could not scout ${prospect.name}. Check AP, portal status, or whether recruitment is still open.`);
      }
    }
    else if (action === "columns") { cycleVisibleColumns(ui, RECRUITING_VIEW_PRESETS); renderView("recruiting"); }
    else if (action === "save-view") { const ok = saveCurrentView(ui, `Recruiting ${ui.tab} ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`, ["tab", "posFilter", "starsFilter", "statusFilter", "search", "sort", "visibleColumns"]); setBootstrapStatus(ok ? "Saved current recruiting view." : "Could not save recruiting view."); persistUiState(); }
    else if (action === "ask-staff") {
      const prospect = findProspect(selectedProspectId);
      setBootstrapStatus(prospect
        ? `${prospect.name}: ${prospect.staffRecommendation || "Stay involved while momentum is moving."} Commit ${prospect.commitChance || 0}%, interest ${prospect.interest || 0}%, need fit ${prospect.needFit || 0}%.`
        : "Select a prospect to get a staff recruiting read.");
    }
    return;
  }
  // UI-RESCUE-1: Roster workspace interactions ──────────────────────────
  const rosterTabBtn = event.target.closest("[data-roster-tab]");
  if (rosterTabBtn) {
    const ui = ensureRosterUiState();
    ui.tab = rosterTabBtn.dataset.rosterTab;
    persistUiState();
    renderView("roster");
    return;
  }
  const rosterRow = event.target.closest("[data-roster-row]");
  if (rosterRow) {
    selectedPlayerId = rosterRow.dataset.rosterRow;
    renderView("player");
    return;
  }
  // Recruiting workspace
  const recruitingTabBtn = event.target.closest("[data-recruiting-tab]");
  if (recruitingTabBtn) {
    const ui = ensureRecruitingUiState();
    ui.tab = recruitingTabBtn.dataset.recruitingTab;
    persistUiState();
    renderView("recruiting");
    return;
  }
  const recruitingRow = event.target.closest("[data-recruiting-row]");
  if (recruitingRow) {
    selectedProspectId = recruitingRow.dataset.recruitingRow;
    renderView("recruiting");
    return;
  }
  const portalTabBtn = event.target.closest("[data-portal-tab]");
  if (portalTabBtn) {
    const ui = ensurePortalUiState();
    ui.tab = portalTabBtn.dataset.portalTab;
    renderView("portal");
    return;
  }
  const staffTabBtn = event.target.closest("[data-staff-tab]");
  if (staffTabBtn) {
    const ui = ensureStaffUiState();
    ui.tab = staffTabBtn.dataset.staffTab;
    renderView("staff");
    return;
  }
  // Program Desk — check inner buttons (resolve/open) BEFORE the wrapper row
  const deskResolveBtn = event.target.closest("[data-desk-resolve]");
  if (deskResolveBtn) {
    const id = deskResolveBtn.dataset.deskResolve;
    const note = (data.notifications || []).find((n) => n.id === id);
    if (note) {
      note.resolved = true;
      autoSaveCareer();
    }
    const ui = ensureDeskUiState();
    if (ui.selectedItemId === id) ui.selectedItemId = null;
    renderView("desk");
    return;
  }
  const deskOpenBtn = event.target.closest("[data-desk-open]");
  if (deskOpenBtn) {
    const target = deskOpenBtn.dataset.deskOpen;
    if (target && views[target]) renderView(target);
    return;
  }
  const deskItemBtn = event.target.closest("[data-desk-item]");
  if (deskItemBtn) {
    const ui = ensureDeskUiState();
    ui.selectedItemId = deskItemBtn.dataset.deskItem;
    renderView("desk");
    return;
  }
  // Schedule / Rankings / History tab switches
  const homeJumpBtn = event.target.closest("[data-home-jump]");
  if (homeJumpBtn) {
    const viewId = homeJumpBtn.dataset.homeJump;
    if (viewId && views[viewId]) renderView(viewId);
    return;
  }
  const scheduleTabBtn = event.target.closest("[data-schedule-tab]");
  if (scheduleTabBtn) {
    const ui = ensureScheduleUiState();
    ui.tab = scheduleTabBtn.dataset.scheduleTab;
    renderView("schedule");
    return;
  }
  const rankingsTabBtn = event.target.closest("[data-rankings-tab]");
  if (rankingsTabBtn) {
    const ui = ensureRankingsUiState();
    ui.tab = rankingsTabBtn.dataset.rankingsTab;
    renderView("rankings");
    return;
  }
  const historyTabBtn = event.target.closest("[data-history-tab]");
  if (historyTabBtn) {
    const ui = ensureHistoryUiState();
    ui.tab = historyTabBtn.dataset.historyTab;
    renderView("history");
    return;
  }
  const dgSort = event.target.closest("[data-dg-sort]");
  if (dgSort) {
    let ui = null;
    if (activeView === "roster") ui = ensureRosterUiState();
    else if (activeView === "recruiting") ui = ensureRecruitingUiState();
    else if (activeView === "portal") ui = ensurePortalUiState();
    else if (activeView === "staff") ui = ensureStaffUiState();
    else if (activeView === "schedule") ui = ensureScheduleUiState();
    else if (activeView === "rankings") ui = ensureRankingsUiState();
    if (!ui) return;
    const colId = dgSort.dataset.dgSort;
    const cur = ui.sort && ui.sort[0];
    const dir = cur && cur.colId === colId && cur.direction === "asc" ? "desc" : (cur && cur.colId === colId ? "asc" : "desc");
    ui.sort = [{ colId, direction: dir }];
    if (activeView === "roster" || activeView === "recruiting") persistUiState();
    renderView(activeView);
    return;
  }
  const inspAction = event.target.closest("[data-insp-action]");
  if (inspAction) {
    const action = inspAction.dataset.inspAction;
    if (action.startsWith("desk-open:")) {
      const target = action.slice("desk-open:".length);
      if (views[target]) renderView(target);
      return;
    }
    if (action.startsWith("desk-resolve:")) {
      const id = action.slice("desk-resolve:".length);
      const note = (data.notifications || []).find((n) => n.id === id);
      if (note) {
        note.resolved = true;
        autoSaveCareer();
      }
      const ui = ensureDeskUiState();
      ui.selectedItemId = null;
      renderView("desk");
      return;
    }
    if (action === "open-player" && selectedPlayerId) renderView("player");
    else if (action === "open-prospect" && selectedProspectId) renderView("prospect");
    else if (action === "scout-prospect" && selectedProspectId) {
      const prospect = findProspect(selectedProspectId);
      if (prospect && applyRecruitingAction("scout", prospect)) setBootstrapStatus(`Scouted ${prospect.name}. Confidence ${Math.round(prospect.scoutConfidence || 0)}%, interest ${Math.round(prospect.interest || 0)}%.`);
      else setBootstrapStatus("Could not scout this prospect right now.");
      renderView("recruiting");
    } else if (action === "contact-prospect" && selectedProspectId) {
      const prospect = findProspect(selectedProspectId);
      if (prospect && applyRecruitingAction("contact", prospect)) setBootstrapStatus(`Reached out to ${prospect.name}. Interest ${Math.round(prospect.interest || 0)}%.`);
      else setBootstrapStatus("Could not contact this prospect right now.");
      renderView("recruiting");
    } else if (action === "offer-prospect" && selectedProspectId) {
      const prospect = findProspect(selectedProspectId);
      if (prospect && applyRecruitingAction("offer", prospect)) setBootstrapStatus(`Offer sent to ${prospect.name}. Commit chance ${Math.round(prospect.commitChance || 0)}%.`);
      else setBootstrapStatus("Could not make an offer right now.");
      renderView("recruiting");
    } else if (action === "compare-player") {
      if (selectedPlayerId) renderView("player");
      else setBootstrapStatus("Pick a player first, then use the peer comparison section from the player room.");
    } else if (action === "meet-player") {
      const player = findPlayer(selectedPlayerId);
      if (player) {
        player.morale = Math.min(99, Number(player.morale || 50) + 3);
        player.transferRisk = player.morale >= 75 ? "Low" : player.transferRisk;
        markDirty();
        autoSaveCareer();
        setBootstrapStatus(`Met with ${player.name}. Morale is now ${player.morale}.`);
        renderView("player");
      } else setBootstrapStatus("Select a player first to hold a meeting.");
    } else if (action === "view-stats") {
      if (selectedPlayerId) renderView("player");
      else setBootstrapStatus("Select a player first to inspect stats.");
    } else if (action === "set-dev") {
      const player = findPlayer(selectedPlayerId);
      if (player) {
        const options = ["Strength", "Technique", "Conditioning", "Film Study", "Leadership"];
        const currentIndex = Math.max(0, options.indexOf(player.developmentFocus || ""));
        player.developmentFocus = options[(currentIndex + 1) % options.length];
        markDirty();
        autoSaveCareer();
        setBootstrapStatus(`${player.name} development focus set to ${player.developmentFocus}.`);
        renderView("player");
      } else setBootstrapStatus("Select a player first to set a development focus.");
    } else if (action === "add-watch") {
      const player = findPlayer(selectedPlayerId);
      if (player) {
        const added = togglePlayerWatch(player);
        if (added && player.transferRisk === "Low") player.transferRisk = "Medium";
        setBootstrapStatus(added
          ? `Added ${player.name} to the watchlist. They now show up in roster snapshots and bookmarks survive reloads.`
          : `Removed ${player.name} from the watchlist.`);
        renderView("player");
      } else setBootstrapStatus("Select a player first to add a watch note.");
    } else if (action === "schedule-visit") {
      const prospect = findProspect(selectedProspectId);
      if (prospect && applyRecruitingAction("visit", prospect)) setBootstrapStatus(`Visit scheduled for ${prospect.name}. Interest ${Math.round(prospect.interest || 0)}%.`);
      else setBootstrapStatus("Could not schedule a visit. Make sure the player has an offer and you still have AP.");
      renderView(prospect ? "prospect" : "recruiting");
    } else if (action === "make-pitch") {
      const prospect = findProspect(selectedProspectId);
      if (prospect && applyRecruitingAction(prospect.offered ? "contact" : "offer", prospect)) {
        setBootstrapStatus(prospect.offered
          ? `Made another push with ${prospect.name}. Interest ${Math.round(prospect.interest || 0)}%.`
          : `Pitch escalated into an offer for ${prospect.name}. Commit chance ${Math.round(prospect.commitChance || 0)}%.`);
      } else setBootstrapStatus("Could not make a pitch right now.");
      renderView(prospect ? "prospect" : "recruiting");
    } else if (action === "compare-prospect") {
      if (selectedProspectId) renderView("prospect");
      else setBootstrapStatus("Pick a prospect first, then compare from the position board in the prospect room.");
    } else if (action === "watch-prospect") {
      const ui = ensureRecruitingUiState();
      ui.tab = "watchlist";
      persistUiState();
      renderView("recruiting");
      setBootstrapStatus("Switched to the recruiting watchlist so you can review your top priority board.");
    }
    return;
  }

  // Practice emphasis selection (Development screen)
  const practiceBtn = event.target.closest("[data-practice-emphasis]");
  if (practiceBtn) {
    setPracticeEmphasis(practiceBtn.dataset.practiceEmphasis);
    autoSaveCareer();
    renderView("development");
    return;
  }

  // HARNESS-1 Validation panel run button
  const runInvariants = event.target.closest("[data-run-invariants]");
  if (runInvariants) {
    if (window.CGM_INVARIANTS) {
      const results = window.CGM_INVARIANTS.runInvariants({ career, programs, world, data });
      window.CGM_LAST_INVARIANT_RUN = {
        ranAt: new Date().toLocaleTimeString(),
        results,
        summary: window.CGM_INVARIANTS.summarize(results),
      };
      renderView("analytics");
    }
    return;
  }

  // Creator tab switching
  const creatorTabBtn = event.target.closest("[data-creator-tab]");
  if (creatorTabBtn) {
    creatorTab = creatorTabBtn.dataset.creatorTab;
    renderView("creator");
    return;
  }

  // Trait detail popover
  const traitLink = event.target.closest("[data-trait-link]");
  if (traitLink) {
    const traitId = traitLink.dataset.traitLink;
    const existing = document.querySelector(".trait-popover");
    if (existing) {
      const alreadyOpen = existing.dataset.forTrait === traitId && existing.previousElementSibling === traitLink;
      existing.remove();
      if (alreadyOpen) return;
    }
    const cardHtml = traitDetailCard(traitId);
    if (cardHtml) {
      const wrap = document.createElement("div");
      wrap.innerHTML = cardHtml;
      const node = wrap.firstElementChild;
      traitLink.insertAdjacentElement("afterend", node);
    }
    return;
  }

  // Creator submit actions
  const creatorAction = event.target.closest("[data-creator-action]");
  if (creatorAction) {
    const action = creatorAction.dataset.creatorAction;
    const fields = readCreatorForm();

    if (action === "submit-player") {
      if (!isNonEmptyString(fields.name)) {
        alert("Please enter a player name.");
        return;
      }
      const { isProspect, entity } = buildCreatedPlayer(fields);
      if (isProspect) {
        if (!Array.isArray(data.prospectProfiles)) data.prospectProfiles = [];
        data.prospectProfiles.push(entity);
        selectedProspectId = entity.id;
      } else {
        if (!Array.isArray(data.playerProfiles)) data.playerProfiles = [];
        data.playerProfiles.push(entity);
        selectedPlayerId = entity.id;
        // Also add to roster table row
        if (!data.roster) data.roster = [];
        data.roster.push([entity.position, entity.name, entity.year, String(entity.ovr), `Created ${entity.archetype}`]);
      }
      creatorTab = "created";
      refreshStewardshipModels();
      markDirty();
      autoSaveCareer();
      renderView("creator");
      return;
    }

    if (action === "submit-coach") {
      if (!isNonEmptyString(fields.name)) {
        alert("Please enter a coach name.");
        return;
      }
      ensureStaffState();
      const coach = buildCreatedCoach(fields);
      if (!Array.isArray(data.positionCoaches)) data.positionCoaches = [];
      data.positionCoaches.push(coach);
      creatorTab = "created";
      refreshStewardshipModels();
      markDirty();
      autoSaveCareer();
      renderView("creator");
      return;
    }
  }

  // Inbox event actions
  const inboxAction = event.target.closest("[data-inbox-action]");
  if (inboxAction) {
    const evtId = inboxAction.dataset.inboxId;
    const actionId = inboxAction.dataset.inboxAction;
    if (evtId && actionId) {
      resolveInboxEvent(evtId, actionId);
      markDirty();
      autoSaveCareer();
    }
    renderView(activeView);
    return;
  }

  const inboxAck = event.target.closest("[data-inbox-ack]");
  if (inboxAck) {
    resolveInboxEvent(inboxAck.dataset.inboxAck, "acknowledged");
    markDirty();
    autoSaveCareer();
    renderView(activeView);
    return;
  }

  const inboxFilter = event.target.closest("[data-inbox-filter]");
  if (inboxFilter) {
    renderView("desk");
    return;
  }

  // Profile tab switching (pos-attrs / gen-attrs / personality)
  const profileTab = event.target.closest("[data-profile-tab]");
  if (profileTab) {
    const tabName = profileTab.dataset.profileTab;
    const profileLayout = profileTab.closest(".profile-layout");
    if (profileLayout) {
      profileLayout.querySelectorAll(".profile-tab").forEach((btn) => btn.classList.remove("active-tab"));
      profileTab.classList.add("active-tab");
      profileLayout.querySelectorAll(".profile-tab-content").forEach((panel) => {
        panel.style.display = panel.dataset.tabPanel === tabName ? "" : "none";
      });
    }
    return;
  }

  const realismAction = event.target.closest("[data-run-realism]");
  if (realismAction) {
    runFiveYearRealityProjection();
    markDirty();
    autoSaveCareer();
    renderView("analytics");
    return;
  }

  const hardeningAction = event.target.closest("[data-run-hardening]");
  if (hardeningAction) {
    runM9HardeningCheck();
    markDirty();
    autoSaveCareer();
    renderView("analytics");
    return;
  }

  const tacticAction = event.target.closest("[data-set-tactic]");
  if (tacticAction) {
    const next = tacticAction.dataset.setTactic;
    if (!setTacticalProfile(next)) return;
    markDirty();
    autoSaveCareer();
    renderView("schedule");
    return;
  }

  const tempoAction = event.target.closest("[data-set-tempo]");
  if (tempoAction) {
    const next = tempoAction.dataset.setTempo;
    if (!setTempoProfile(next)) return;
    markDirty();
    autoSaveCareer();
    renderView("schedule");
    return;
  }

  const playByPlayAction = event.target.closest("[data-toggle-playbyplay]");
  if (playByPlayAction) {
    setPlayByPlayEnabled(!data.seasonState.playByPlayEnabled);
    markDirty();
    autoSaveCareer();
    renderView("schedule");
    return;
  }

  const portalExceptionAction = event.target.closest("[data-portal-exception]");
  if (portalExceptionAction) {
    if (portalExceptionAction.dataset.portalException === "activate" && activateCoachChangeException()) {
      injectNotification({
        id: `portal-exception-${career.advanceCount}`,
        title: "Coach-change exception activated",
        body: `Portal access is temporarily open for ${PORTAL_EXCEPTION_ADVANCES} advance(s).`,
        severity: "Action Recommended",
        department: "Compliance",
        deadline: "This week",
        linked: "Transfer Portal",
        targetView: "portal",
        blocking: false,
        resolved: false,
      });
      markDirty();
      autoSaveCareer();
      renderView("portal");
    }
    return;
  }

  const portalAction = event.target.closest("[data-portal-action]");
  if (portalAction) {
    const action = portalAction.dataset.portalAction;
    const rowIndex = Number(portalAction.dataset.portalIndex);
    if (!Number.isInteger(rowIndex) || rowIndex < 0) return;
    const success = applyPortalTargetAction(rowIndex, action);
    if (success) {
      // PERSIST-2 v2: dispatch through CGM_REPLAY for replay verification.
      if (action === "pursue") {
        const target = (data.portalState && data.portalState.targets && data.portalState.targets[rowIndex]) || {};
        dispatchToReplay("SIGN_TRANSFER", {
          playerId: target.id || target.playerId || `portal-${rowIndex}`,
          fromSchool: target.fromSchool || null,
          contractYears: target.contractYears || 1,
          scholarshipUsed: 1,
        });
      }
      refreshBenefitPressure();
      refreshRosterComplianceNotification();
      refreshStewardshipModels();
      markDirty();
      autoSaveCareer();
    }
    renderView("portal");
    return;
  }

  const retentionAction = event.target.closest("[data-retention-action]");
  if (retentionAction) {
    const action = retentionAction.dataset.retentionAction;
    const rowIndex = Number(retentionAction.dataset.retentionIndex);
    if (!Number.isInteger(rowIndex) || rowIndex < 0) return;
    const success = applyRetentionAction(rowIndex, action);
    if (success) {
      refreshBenefitPressure();
      refreshStewardshipModels();
      markDirty();
      autoSaveCareer();
    }
    renderView("portal");
    return;
  }

  const benefitAction = event.target.closest("[data-benefit-bucket]");
  if (benefitAction) {
    const bucketKey = benefitAction.dataset.benefitBucket;
    const delta = Number(benefitAction.dataset.benefitDelta);
    if (!isNonEmptyString(bucketKey) || !Number.isInteger(delta)) return;
    const success = applyBenefitAdjustment(bucketKey, delta);
    if (success) {
      refreshBenefitPressure();
      refreshRosterComplianceNotification();
      refreshStewardshipModels();
      markDirty();
      autoSaveCareer();
    }
    renderView("finance");
    return;
  }

  const facilityAction = event.target.closest("[data-facility-action]");
  if (facilityAction) {
    const action = facilityAction.dataset.facilityAction;
    const rowIndex = Number(facilityAction.dataset.facilityIndex);
    if (!Number.isInteger(rowIndex) || rowIndex < 0) return;
    const success = applyFacilityRequest(rowIndex, action);
    if (success) {
      refreshStewardshipModels();
      markDirty();
      autoSaveCareer();
    }
    renderView("facilities");
    return;
  }

  const recruitAction = event.target.closest("[data-recruit-action]");
  if (recruitAction) {
    const action = recruitAction.dataset.recruitAction;
    const prospect = findProspect(recruitAction.dataset.prospectId);
    if (!prospect || !isNonEmptyString(action)) return;
    const success = applyRecruitingAction(action, prospect);
    if (success) {
      // PERSIST-2 v2: dispatch through CGM_REPLAY for replay verification.
      dispatchToReplay("APPLY_RECRUIT_ACTION", { prospectId: prospect.id, action });
      syncRecruitingModels();
      markDirty();
      autoSaveCareer();
    }
    renderView(activeView);
    return;
  }

  const staffAction = event.target.closest("[data-staff-action]");
  if (staffAction) {
    const action = staffAction.dataset.staffAction;
    const role = staffAction.dataset.staffRole;
    if (!isNonEmptyString(role)) return;
    ensureStaffState();
    if (action === "fire") {
      // ARCHIVE-1: archive the departing coach's legacy before we drop them.
      if (window.CGM_ALUMNI) {
        if (!Array.isArray(data.coachLegacies)) data.coachLegacies = [];
        const departing = (data.staff || []).find((row) => row[0] === role);
        if (departing) {
          const startYear = (data.coachStartYears && data.coachStartYears[role]) || (career.startYear || currentSeasonYear());
          const endYear = currentSeasonYear();
          const legacy = window.CGM_ALUMNI.buildCoachLegacyRecord({
            coach: { id: `${role}-${departing[1]}`, name: departing[1] },
            role, programId: career.programId,
            startYear, endYear, tenureYears: Math.max(1, endYear - startYear + 1),
            recordSummary: career.record,
            endReason: window.CGM_ALUMNI.COACH_END_REASONS.FIRED,
          });
          data.coachLegacies.push(legacy);
        }
      }
      data.staff = data.staff.filter((row) => row[0] !== role);
      if (!data.staffOpenings.some((opening) => opening[0] === role)) {
        data.staffOpenings.push([role, "Open"]);
      }
    }
    if (action === "hire") {
      const name = staffAction.dataset.staffName;
      const specialty = staffAction.dataset.staffSpecialty;
      const grade = staffAction.dataset.staffGrade;
      if (!isNonEmptyString(name) || !isNonEmptyString(specialty) || !isNonEmptyString(grade)) return;
      // PERSIST-2 v2: dispatch through CGM_REPLAY for replay verification.
      dispatchToReplay("HIRE_COACH", {
        candidateId: name,
        role,
        salaryK: 0,
        years: 1,
      });
      data.staff = data.staff.filter((row) => row[0] !== role);
      data.staff.push([role, name, specialty, grade]);
      data.staffOpenings = data.staffOpenings.filter((opening) => opening[0] !== role);
    }
    markDirty();
    refreshStewardshipModels();
    autoSaveCareer();
    renderView("staff");
    return;
  }

  const selectProspect = event.target.closest("[data-select-prospect]");
  if (selectProspect) {
    selectedProspectId = selectProspect.dataset.selectProspect;
    renderView("prospect");
    return;
  }

  const selected = event.target.closest("[data-select-player]");
  if (selected) {
    selectedPlayerId = selected.dataset.selectPlayer;
    renderView("player");
    return;
  }

  const playerAction = event.target.closest("[data-player-action]");
  if (playerAction) {
    const player = findPlayer(playerAction.dataset.playerId);
    if (!player) return;
    const { playerAction: action, playerValue } = {
      playerAction: playerAction.dataset.playerAction,
      playerValue: playerAction.dataset.playerValue,
    };
    if (action === "redshirt" && isNonEmptyString(playerValue)) {
      player.redshirtIntent = playerValue;
    }
    if (action === "focus" && isNonEmptyString(playerValue)) {
      player.developmentFocus = playerValue;
    }
    if (action === "promise" && isNonEmptyString(playerValue)) {
      ensureCultureState();
      data.cultureState.promiseLedger[player.id] = playerValue;
      updatePlayerMorale(player, 1, `Promise updated to ${playerValue}`);
    }
    if (action === "games") {
      const delta = Number(playerValue) || 0;
      player.eligibility.gamesPlayedThisSeason = Math.max(
        0,
        player.eligibility.gamesPlayedThisSeason + delta,
      );
      evaluatePromiseAndMoraleAfterUsage();
    }
    persistPlayerDecision(player);
    refreshEligibilityNotification(player);
    refreshStewardshipModels();
    markDirty();
    autoSaveCareer();
    renderView(activeView);
    return;
  }

  const continueFromDesk = event.target.closest("[data-continue-from-desk]");
  if (continueFromDesk) {
    if (blockingItems().length) {
      renderView("desk");
      return;
    }
    continueButton.click();
    return;
  }

  const openButton = event.target.closest("[data-open-view]");
  if (openButton) {
    const viewId = openButton.dataset.openView;
    if (viewId === "player" && selectedPlayerId) renderView("player");
    else if (viewId === "prospect" && selectedProspectId) renderView("prospect");
    else renderView(viewId);
    return;
  }

  const stadiumUpgradeBtn = event.target.closest("[data-stadium-upgrade]");
  if (stadiumUpgradeBtn) {
    const attrKey = stadiumUpgradeBtn.dataset.stadiumUpgrade;
    ensureFacilitiesState();
    const stadium = currentStadiumProfile();
    if (!stadium || !stadium.attrs) return;
    const cost = 2;
    if (data.facilitiesState.stadiumUpgradePoints < cost) {
      alert("Not enough stadium upgrade points. Points refresh each season.");
      return;
    }
    const current = typeof stadium.attrs[attrKey] === "number" ? stadium.attrs[attrKey] : 10;
    if (current >= 20) return;
    stadium.attrs[attrKey] = current + 1;
    data.facilitiesState.stadiumUpgradePoints -= cost;
    data.facilitiesState.upgradeHistory.unshift([
      String(currentSeasonYear()), attrKey, `${current} \u2192 ${current + 1}`, "Complete",
      `${data.facilitiesState.stadiumUpgradePoints} pts remaining`,
    ]);
    appendPressureTrace("Stadium", -1, `Upgraded ${attrKey} to ${current + 1}`);
    refreshStewardshipModels();
    markDirty();
    autoSaveCareer();
    renderView("facilities");
    return;
  }

  const button = event.target.closest("[data-resolve]");
  if (!button) return;
  const item = data.notifications.find((entry) => entry.id === button.dataset.resolve);
  if (!item) return;
  item.resolved = true;
  markDirty();
  autoSaveCareer();
  renderView(activeView);
});

content.addEventListener("input", (event) => {
  const rosterSearch = event.target.closest("[data-roster-control='search']");
  if (rosterSearch) {
    const ui = ensureRosterUiState();
    ui.search = rosterSearch.value;
    persistUiState();
    renderView("roster");
    return;
  }
  const recSearch = event.target.closest("[data-recruiting-control='search']");
  if (recSearch) {
    const ui = ensureRecruitingUiState();
    ui.search = recSearch.value;
    persistUiState();
    renderView("recruiting");
  }
});

content.addEventListener("change", (event) => {
  // UI-RESCUE-1: Roster action-bar control changes
  const rosterControl = event.target.closest("[data-roster-control]");
  if (rosterControl) {
    const ui = ensureRosterUiState();
    const key = rosterControl.dataset.rosterControl;
    const v = rosterControl.value;
    if (key === "view") { ui.view = v; ui.visibleColumns = (ROSTER_VIEW_PRESETS[v] || []).slice(); }
    else if (key === "pos") ui.posFilter = v;
    else if (key === "class") ui.classFilter = v;
    else if (key === "search") ui.search = v;
    persistUiState();
    renderView("roster");
    return;
  }
  // Recruiting action-bar
  const recControl = event.target.closest("[data-recruiting-control]");
  if (recControl) {
    const ui = ensureRecruitingUiState();
    const key = recControl.dataset.recruitingControl;
    const v = recControl.value;
    if (key === "pos") ui.posFilter = v;
    else if (key === "stars") ui.starsFilter = v;
    else if (key === "status") ui.statusFilter = v;
    else if (key === "search") ui.search = v;
    persistUiState();
    renderView("recruiting");
    return;
  }

  const savedViewPicker = event.target.closest("[data-saved-view]");
  if (savedViewPicker) {
    const scope = savedViewPicker.dataset.savedView;
    const index = Number(savedViewPicker.value);
    if (scope === "roster") {
      const ui = ensureRosterUiState();
      const savedView = Array.isArray(ui.savedViews) ? ui.savedViews[index] : null;
      if (savedView && applySavedViewState(ui, savedView)) {
        persistUiState();
        setBootstrapStatus(`Loaded saved roster view: ${savedView.name}.`);
        renderView("roster");
      }
    } else if (scope === "recruiting") {
      const ui = ensureRecruitingUiState();
      const savedView = Array.isArray(ui.savedViews) ? ui.savedViews[index] : null;
      if (savedView && applySavedViewState(ui, savedView)) {
        persistUiState();
        setBootstrapStatus(`Loaded saved recruiting view: ${savedView.name}.`);
        renderView("recruiting");
      }
    }
    return;
  }

  const filterPicker = event.target.closest("[data-recruit-filter]");
  if (filterPicker) {
    ensureRecruitingState();
    const key = filterPicker.dataset.recruitFilter;
    const value = filterPicker.value || "All";
    if (key === "position" || key === "status") {
      data.recruitingState.filters[key] = value;
      renderView("recruiting");
    }
    return;
  }

  const picker = event.target.closest("[data-depth-slot]");
  if (!picker) return;
  const slot = picker.dataset.depthSlot;
  if (!Object.prototype.hasOwnProperty.call(DEPTH_SLOT_POSITION, slot)) return;
  data.depthChart[slot] = picker.value || "";
  refreshDepthValidationNotification();
  markDirty();
  autoSaveCareer();
  renderView("depth");
});

saveButton.addEventListener("click", () => {
  saveCareer();
});

careerButton.addEventListener("click", () => {
  showBootstrap();
});

if (continueCareerTile) {
  continueCareerTile.addEventListener("click", () => {
    if (!loadCareer()) setBootstrapStatus("No local save found. Start a new career instead.");
  });
}

if (newCareerTile) {
  newCareerTile.addEventListener("click", () => {
    if (bootstrapSetupPanel) bootstrapSetupPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (dataLabTile) {
  dataLabTile.addEventListener("click", () => {
    hideBootstrap();
    renderView("analytics");
  });
}

if (settingsTile) {
  settingsTile.addEventListener("click", () => {
    if (bootstrapAdvancedPanel) bootstrapAdvancedPanel.open = true;
    if (advancedSetupToggle) advancedSetupToggle.setAttribute("aria-expanded", "true");
  });
}

if (favoriteTeamTile) {
  favoriteTeamTile.addEventListener("click", () => {
    if (bootstrapSetupPanel) bootstrapSetupPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    if (programSelect) programSelect.focus();
  });
}

if (advancedSetupToggle) {
  advancedSetupToggle.addEventListener("click", () => {
    if (!bootstrapAdvancedPanel) return;
    bootstrapAdvancedPanel.open = !bootstrapAdvancedPanel.open;
    advancedSetupToggle.setAttribute("aria-expanded", bootstrapAdvancedPanel.open ? "true" : "false");
  });
}

if (aiServicesTile) {
  aiServicesTile.addEventListener("click", () => {
    setBootstrapStatus("AI services panel is reserved for a later integration pass.");
  });
}

if (creditsTile) {
  creditsTile.addEventListener("click", () => {
    setBootstrapStatus("Sources: content packs, sim systems, and the FM workspace shell.");
  });
}

startCareerButton.addEventListener("click", () => {
  startNewCareer();
});

loadCareerButton.addEventListener("click", () => {
  loadCareer();
});

closeBootstrapButton.addEventListener("click", () => {
  if (careerStarted) hideBootstrap();
});

if (backButton) {
  backButton.addEventListener("click", () => {
    if (viewHistoryIndex <= 0) return;
    viewHistoryIndex -= 1;
    renderView(viewHistory[viewHistoryIndex], { skipHistory: true });
  });
}

if (forwardButton) {
  forwardButton.addEventListener("click", () => {
    if (viewHistoryIndex >= viewHistory.length - 1) return;
    viewHistoryIndex += 1;
    renderView(viewHistory[viewHistoryIndex], { skipHistory: true });
  });
}

if (globalSearchInput) {
  globalSearchInput.addEventListener("input", () => {
    refreshGlobalSearch(globalSearchInput.value || "");
  });
  globalSearchInput.addEventListener("focus", () => {
    if ((globalSearchInput.value || "").trim()) refreshGlobalSearch(globalSearchInput.value || "");
  });
  globalSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      if (!globalSearchState.results.length) return;
      event.preventDefault();
      globalSearchState.selectedIndex = Math.min(globalSearchState.selectedIndex + 1, globalSearchState.results.length - 1);
      renderGlobalSearchPanel();
      return;
    }
    if (event.key === "ArrowUp") {
      if (!globalSearchState.results.length) return;
      event.preventDefault();
      globalSearchState.selectedIndex = Math.max(globalSearchState.selectedIndex - 1, 0);
      renderGlobalSearchPanel();
      return;
    }
    if (event.key === "Escape") {
      hideGlobalSearchPanel();
      return;
    }
    if (event.key !== "Enter") return;
    const query = (globalSearchInput.value || "").trim();
    if (!query) return;
    if (!globalSearchState.open) refreshGlobalSearch(query);
    const result = globalSearchState.results[globalSearchState.selectedIndex] || globalSearchState.results[0];
    if (result) {
      event.preventDefault();
      openSearchResult(result);
    }
  });
}

if (bookmarkButton) {
  bookmarkButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isRecord(window.CGM_UI_STATE)) window.CGM_UI_STATE = {};
    if (!Array.isArray(window.CGM_UI_STATE.bookmarks)) window.CGM_UI_STATE.bookmarks = [];
    const label = currentViewLabel();
    const existing = window.CGM_UI_STATE.bookmarks.find((b) => b.viewId === activeView);
    if (!existing) {
      const bookmark = { viewId: activeView, label };
      window.CGM_UI_STATE.bookmarks = [bookmark, ...window.CGM_UI_STATE.bookmarks].slice(0, 12);
      persistUiState();
      setBootstrapStatus(`Bookmarked ${label}.`);
    }
    if (bookmarkMenuOpen) hideBookmarkMenu();
    else {
      hideGlobalSearchPanel();
      renderBookmarkMenuPanel();
    }
  });
}

document.addEventListener("click", (event) => {
  const resultBtn = event.target.closest("[data-global-result]");
  if (resultBtn) {
    const result = globalSearchState.results.find((entry) => entry.id === resultBtn.dataset.globalResult);
    if (result) openSearchResult(result);
    return;
  }
  const bookmarkOpenBtn = event.target.closest("[data-bookmark-open]");
  if (bookmarkOpenBtn) {
    const bookmarks = isRecord(window.CGM_UI_STATE) && Array.isArray(window.CGM_UI_STATE.bookmarks)
      ? window.CGM_UI_STATE.bookmarks
      : [];
    const bookmark = bookmarks[Number(bookmarkOpenBtn.dataset.bookmarkOpen)];
    if (bookmark) {
      hideBookmarkMenu();
      renderView(bookmark.viewId || "desk");
    }
    return;
  }
  const bookmarkRemoveBtn = event.target.closest("[data-bookmark-remove]");
  if (bookmarkRemoveBtn) {
    if (isRecord(window.CGM_UI_STATE) && Array.isArray(window.CGM_UI_STATE.bookmarks)) {
      window.CGM_UI_STATE.bookmarks.splice(Number(bookmarkRemoveBtn.dataset.bookmarkRemove), 1);
      persistUiState();
      renderBookmarkMenuPanel();
      setBootstrapStatus("Bookmark removed.");
    }
    return;
  }
  if (!event.target.closest(".topbar-search-wrap")) hideGlobalSearchPanel();
  if (!event.target.closest("#bookmarkButton") && !event.target.closest("#bookmarkMenu")) hideBookmarkMenu();
});

if (rulesPresetSelect) {
  rulesPresetSelect.addEventListener("change", () => {
    applySelectedPresetToBootstrap();
  });
}

[recruitingApInput, retentionApInput, portalExceptionInput, scoringEnvInput, volatilityInput, tacticalImpactInput, injuryCadenceInput, nilVolatilityInput, progressionPaceInput, transferPopulationInput, realityAnchorInput]
  .forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => {
      refreshBootstrapRulesLabels();
    });
  });

continueButton.addEventListener("click", () => {
  if (!careerStarted) {
    showBootstrap("Start or load a career before advancing.");
    return;
  }
  if (blockingItems().length) {
    setBootstrapStatus(`Continue is waiting on ${blockingItems().length} must-respond item(s). Review Program Desk to clear them.`);
    renderView("desk");
    continueButton.textContent = `Needs Attention (${blockingItems().length})`;
    return;
  }
  continueButton.textContent = "Advancing...";
  window.setTimeout(() => {
    advanceCareer();
    markDirty();
    autoSaveCareer();
    renderView(activeView);
  }, 200);
});

const skipButton = document.querySelector("#skipButton");
if (skipButton) {
  skipButton.addEventListener("click", () => {
    if (!careerStarted) {
      showBootstrap("Start or load a career before skipping.");
      return;
    }
    if (blockingItems().length) {
      setBootstrapStatus(`Skip is waiting on ${blockingItems().length} must-respond item(s). Review Program Desk first.`);
      renderView("desk");
      skipButton.textContent = `Needs Attention (${blockingItems().length})`;
      window.setTimeout(() => { skipButton.textContent = "Skip Time"; }, 1500);
      return;
    }
    skipButton.textContent = "Skipping...";
    window.setTimeout(() => {
      const result = skipToNextEvent();
      markDirty();
      autoSaveCareer();
      // Surface where we stopped via the section title briefly.
      const nextLabel = result.reason === "blocker" ? "Blocker hit"
                      : result.reason === "decision" ? "Decision waiting"
                      : result.reason === "game" ? "Game played"
                      : result.reason === "season_complete" ? "Season complete"
                      : result.reason === "max" ? "Skipped 60 days" : "Nothing to skip";
      skipButton.textContent = `Skip Time`;
      // Always go to Desk so the player sees what's pending.
      renderView("desk");
      // Brief toast via topbar coach label
      const original = coachLabel.textContent;
      coachLabel.textContent = `${nextLabel} (+${result.steps})`;
      window.setTimeout(() => { coachLabel.textContent = original; }, 2500);
    }, 200);
  });
}

renderView(activeView);
showBootstrap(hasLocalSave() ? "Found a saved career — click Load Save to resume." : "Pick a school and start a new career.");
