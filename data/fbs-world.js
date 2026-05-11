// FBS 2026 content pack. 134 teams across 11 conferences with real names,
// cities, conferences, color schemes, and rating histories. Player names are
// fictional — only school/town/conference data is real. Personal use only.
//
// Ratings reflect the 2021-2025 era (knowledge cutoff Jan 2026) plus an
// explicit five-year forward projection. The trajectory tag drives both: 0 =
// stable, +1/+2 = rising, -1/-2 = declining. Procedurally derived from these:
//   - historicalRatings[2021..2025]
//   - projectedRatings[2026..2030]
//   - coach / school / stadium profile attribute blocks
//
// All 134 teams get full coach/school/stadium profile records so the schema
// validator passes for any team the player picks. The procedural roster fill
// in app.js scales OVR distribution by each team's programRating.

window.CGM_FBS_WORLD = (function buildFbsWorld() {
  // ── Helpers ──────────────────────────────────────────────────────────────
  function pseudoRandom(seedString) {
    let h = 5381;
    for (let i = 0; i < seedString.length; i += 1) {
      h = ((h << 5) + h) + seedString.charCodeAt(i);
      h |= 0;
    }
    if (h <= 0) h = (-h) + 1;
    return function next() {
      h = (h * 9301 + 49297) % 233280;
      return h / 233280;
    };
  }
  function clampRating(v) { return Math.max(40, Math.min(99, v)); }
  function ratedAttr(rating, base) {
    return Math.max(1, Math.min(20, Math.round(base + (rating - 75) * 0.18)));
  }

  function histRatings(base, traj, seed) {
    const r = pseudoRandom(seed + ":hist");
    // 2021..2025 (years ago: 4..0 from current)
    return [4, 3, 2, 1, 0].map((yearsAgo) => {
      const noise = Math.round((r() - 0.5) * 6);
      return clampRating(base - traj * yearsAgo + noise);
    });
  }
  function projRatings(base, traj, seed) {
    const r = pseudoRandom(seed + ":proj");
    // 2026..2030 (years out: 1..5)
    return [1, 2, 3, 4, 5].map((yearsOut) => {
      const noise = Math.round((r() - 0.5) * 4);
      return clampRating(base + traj * yearsOut + noise);
    });
  }

  const COACH_KEYS = [
    "tacticalKnowledge","offensiveStrategy","defensiveStrategy","playCalling","qbDevelopment",
    "skillDevelopment","lineDevelopment","strengthConditioning","specialTeams","gameManagement",
    "inGameAdaptation","opponentAnalysis","dataAnalysis","recruitment","scoutingCurrent",
    "scoutingPotential","negotiating","budgetControl","mediaHandling","manManagement",
    "motivation","discipline","determination","professionalism","leadership","adaptability",
    "decisionMaking","composure","pressureHandling","loyalty","ambition","teaching",
    "sportsScience","academyDevelopment","staffDelegation",
  ];
  const SCHOOL_KEYS = [
    "academicPrestige","boosterStrength","fanPassion","brandReach","complianceCulture",
    "administrativeStability","boardPatience","nilCapacity","nilStructure","recruitingFootprint",
    "alumniNetwork","campusAppeal","studentSupport","transferFriendliness","tradition",
    "mediaMarket","sponsorshipPower","rivalryHeat","weatherAdvantage","travelBurden",
    "conferenceLeverage","facilitiesQuality","medicalSupport","sportsScienceSupport","nutritionProgram",
    "tutoringProgram","disciplineCulture","innovationAppetite","fiscalHealth","donorReliability",
    "ticketDemand","merchandisingPower","digitalEngagement","pipelineAccess","longTermVision",
  ];
  const SCHOOL_FAN_KEYS = new Set([
    "boosterStrength","fanPassion","brandReach","nilCapacity","alumniNetwork","tradition",
    "mediaMarket","sponsorshipPower","ticketDemand","merchandisingPower","digitalEngagement","donorReliability",
  ]);
  const STADIUM_KEYS = [
    "capacity","atmosphere","turfQuality","weatherControl","lockerRoomQuality",
    "trainingComplexLink","medicalBayQuality","crowdNoise","sightlines","pressFacilities",
    "vipSuites","concessionQuality","parkingAccess","transitAccess","securityReadiness",
    "homeFieldAdvantage","scoreboardTech","broadcastInfrastructure","lightingQuality","drainageQuality",
    "structuralCondition","expansionPotential","maintenanceDiscipline","emergencyPreparedness","acoustics",
    "studentSectionEnergy","accessibility","familyAmenities","fieldHeating","practiceFieldAdjacency",
    "travelTeamFacilities","officialsFacilities","replaySupport","sustainability","revenueEfficiency",
  ];
  const STADIUM_FAN_KEYS = new Set([
    "capacity","atmosphere","crowdNoise","sightlines","vipSuites","studentSectionEnergy",
    "homeFieldAdvantage","scoreboardTech","broadcastInfrastructure",
  ]);
  const FAN_BOOST = { massive: 2, large: 1, medium: 0, small: -2 };

  function fillAttrs(keys, fanKeys, fans, rating, base, seed) {
    const r = pseudoRandom(seed);
    const a = ratedAttr(rating, base);
    const boost = FAN_BOOST[fans] || 0;
    const result = {};
    keys.forEach((k) => {
      // Wider jitter (±4 instead of ±2) so elite programs don't have every
      // attribute pinned to 20. Maintain mean while spreading values.
      let v = a + Math.round((r() - 0.5) * 8);
      if (fanKeys && fanKeys.has(k)) v += boost;
      result[k] = Math.max(1, Math.min(20, v));
    });
    return result;
  }

  // ── Conference definitions ───────────────────────────────────────────────
  const CONFERENCES = {
    sec:     { name: "Southeastern Conference",      short: "SEC",      tier: "P4" },
    big10:   { name: "Big Ten Conference",           short: "Big Ten",  tier: "P4" },
    big12:   { name: "Big 12 Conference",            short: "Big 12",   tier: "P4" },
    acc:     { name: "Atlantic Coast Conference",    short: "ACC",      tier: "P4" },
    pac12:   { name: "Pac-12 Conference",            short: "Pac-12",   tier: "G5+" },
    aac:     { name: "American Athletic Conference", short: "AAC",      tier: "G5" },
    mwc:     { name: "Mountain West Conference",     short: "MWC",      tier: "G5" },
    sunbelt: { name: "Sun Belt Conference",          short: "Sun Belt", tier: "G5" },
    mac:     { name: "Mid-American Conference",      short: "MAC",      tier: "G5" },
    cusa:    { name: "Conference USA",               short: "CUSA",     tier: "G5" },
    indep:   { name: "Independents",                 short: "Indep.",   tier: "Indep" },
  };

  // ── Team data ────────────────────────────────────────────────────────────
  // Tuple: [id, name, short, crest, conf, state, city, color1, color2,
  //         rating, traj, recT, nilT, fans, brand, nickname, rival]
  const TEAMS = [
    // ===== SEC (16) =====
    ["alabama",          "University of Alabama",                  "Alabama",          "AL",   "sec",   "AL", "Tuscaloosa",      "#9E1B32", "#828A8F", 91,  0, 9, 9, "massive", 99, "Crimson Tide",     "auburn"],
    ["arkansas",         "University of Arkansas",                 "Arkansas",         "ARK",  "sec",   "AR", "Fayetteville",    "#9D2235", "#FFFFFF", 75,  0, 6, 6, "large",   72, "Razorbacks",       "missouri"],
    ["auburn",           "Auburn University",                      "Auburn",           "AUB",  "sec",   "AL", "Auburn",          "#03244D", "#DD550C", 80,  1, 8, 7, "massive", 88, "Tigers",           "alabama"],
    ["florida",          "University of Florida",                  "Florida",          "FLA",  "sec",   "FL", "Gainesville",     "#0021A5", "#FA4616", 78,  1, 8, 8, "massive", 91, "Gators",           "florida-state"],
    ["georgia",          "University of Georgia",                  "Georgia",          "UGA",  "sec",   "GA", "Athens",          "#BA0C2F", "#000000", 95,  0, 9, 9, "massive", 99, "Bulldogs",         "florida"],
    ["kentucky",         "University of Kentucky",                 "Kentucky",         "UK",   "sec",   "KY", "Lexington",       "#0033A0", "#FFFFFF", 70, -1, 5, 5, "medium",  60, "Wildcats",         "tennessee"],
    ["lsu",              "Louisiana State University",             "LSU",              "LSU",  "sec",   "LA", "Baton Rouge",     "#461D7C", "#FDD023", 88,  0, 9, 9, "massive", 95, "Tigers",           "alabama"],
    ["mississippi-state","Mississippi State University",           "Miss. State",      "MSST", "sec",   "MS", "Starkville",      "#660000", "#FFFFFF", 70, -1, 5, 5, "medium",  62, "Bulldogs",         "ole-miss"],
    ["missouri",         "University of Missouri",                 "Missouri",         "MIZ",  "sec",   "MO", "Columbia",        "#F1B82D", "#000000", 80,  1, 6, 6, "large",   72, "Tigers",           "arkansas"],
    ["oklahoma",         "University of Oklahoma",                 "Oklahoma",         "OU",   "sec",   "OK", "Norman",          "#841617", "#FDF9D8", 86,  0, 8, 8, "massive", 92, "Sooners",          "oklahoma-state"],
    ["ole-miss",         "University of Mississippi",              "Ole Miss",         "OM",   "sec",   "MS", "Oxford",          "#CE1126", "#14213D", 84,  1, 7, 7, "large",   78, "Rebels",           "mississippi-state"],
    ["south-carolina",   "University of South Carolina",           "South Carolina",   "SC",   "sec",   "SC", "Columbia",        "#73000A", "#000000", 76,  1, 6, 6, "large",   70, "Gamecocks",        "clemson"],
    ["tennessee",        "University of Tennessee",                "Tennessee",        "TN",   "sec",   "TN", "Knoxville",       "#FF8200", "#FFFFFF", 87,  1, 8, 8, "massive", 90, "Volunteers",       "alabama"],
    ["texas",            "University of Texas",                    "Texas",            "TEX",  "sec",   "TX", "Austin",          "#BF5700", "#FFFFFF", 91,  1, 9, 9, "massive", 98, "Longhorns",        "oklahoma"],
    ["texas-am",         "Texas A&M University",                   "Texas A&M",        "TAMU", "sec",   "TX", "College Station", "#500000", "#FFFFFF", 80,  0, 8, 9, "massive", 85, "Aggies",           "lsu"],
    ["vanderbilt",       "Vanderbilt University",                  "Vanderbilt",       "VU",   "sec",   "TN", "Nashville",       "#000000", "#A28D5B", 62,  1, 4, 4, "small",   45, "Commodores",       "tennessee"],

    // ===== Big Ten (18) =====
    ["illinois",         "University of Illinois",                 "Illinois",         "ILL",  "big10", "IL", "Champaign",       "#13294B", "#E84A27", 73,  1, 5, 5, "medium",  60, "Fighting Illini",  "northwestern"],
    ["indiana",          "Indiana University",                     "Indiana",          "IU",   "big10", "IN", "Bloomington",     "#990000", "#FFFFFF", 78,  2, 5, 5, "medium",  65, "Hoosiers",         "purdue"],
    ["iowa",             "University of Iowa",                     "Iowa",             "IOWA", "big10", "IA", "Iowa City",       "#FFCD00", "#000000", 78,  0, 6, 6, "large",   75, "Hawkeyes",         "iowa-state"],
    ["maryland",         "University of Maryland",                 "Maryland",         "MD",   "big10", "MD", "College Park",    "#E03A3E", "#FFD520", 70, -1, 5, 5, "medium",  58, "Terrapins",        "rutgers"],
    ["michigan",         "University of Michigan",                 "Michigan",         "MICH", "big10", "MI", "Ann Arbor",       "#00274C", "#FFCB05", 90,  0, 9, 9, "massive", 99, "Wolverines",       "ohio-state"],
    ["michigan-state",   "Michigan State University",              "Michigan State",   "MSU",  "big10", "MI", "East Lansing",    "#18453B", "#FFFFFF", 70, -1, 6, 6, "large",   70, "Spartans",         "michigan"],
    ["minnesota",        "University of Minnesota",                "Minnesota",        "MIN",  "big10", "MN", "Minneapolis",     "#7A0019", "#FFCC33", 73,  0, 5, 5, "medium",  60, "Golden Gophers",   "wisconsin"],
    ["nebraska",         "University of Nebraska",                 "Nebraska",         "NEB",  "big10", "NE", "Lincoln",         "#E41C38", "#FFFFFF", 73, -1, 6, 6, "large",   72, "Cornhuskers",      "iowa"],
    ["northwestern",     "Northwestern University",                "Northwestern",     "NW",   "big10", "IL", "Evanston",        "#4E2A84", "#FFFFFF", 65, -1, 4, 4, "small",   52, "Wildcats",         "illinois"],
    ["ohio-state",       "Ohio State University",                  "Ohio State",       "OSU",  "big10", "OH", "Columbus",        "#BB0000", "#666666", 95,  0, 9, 9, "massive", 99, "Buckeyes",         "michigan"],
    ["oregon",           "University of Oregon",                   "Oregon",           "ORE",  "big10", "OR", "Eugene",          "#154733", "#FEE123", 91,  1, 9, 9, "large",   90, "Ducks",            "washington"],
    ["penn-state",       "Pennsylvania State University",          "Penn State",       "PSU",  "big10", "PA", "University Park", "#041E42", "#FFFFFF", 88,  0, 8, 8, "massive", 90, "Nittany Lions",    "ohio-state"],
    ["purdue",           "Purdue University",                      "Purdue",           "PUR",  "big10", "IN", "West Lafayette",  "#CFB991", "#000000", 65, -1, 5, 5, "medium",  55, "Boilermakers",     "indiana"],
    ["rutgers",          "Rutgers University",                     "Rutgers",          "RU",   "big10", "NJ", "Piscataway",      "#CC0033", "#FFFFFF", 68,  1, 5, 5, "medium",  55, "Scarlet Knights",  "maryland"],
    ["ucla",             "UCLA",                                   "UCLA",             "UCLA", "big10", "CA", "Los Angeles",     "#2D68C4", "#F2A900", 73,  0, 7, 7, "large",   78, "Bruins",           "usc"],
    ["usc",              "University of Southern California",      "USC",              "USC",  "big10", "CA", "Los Angeles",     "#990000", "#FFCC00", 84,  0, 9, 9, "massive", 92, "Trojans",          "ucla"],
    ["washington",       "University of Washington",               "Washington",       "UW",   "big10", "WA", "Seattle",         "#4B2E83", "#B7A57A", 80, -1, 7, 7, "large",   78, "Huskies",          "oregon"],
    ["wisconsin",        "University of Wisconsin",                "Wisconsin",        "WIS",  "big10", "WI", "Madison",         "#C5050C", "#FFFFFF", 76, -1, 6, 6, "large",   75, "Badgers",          "minnesota"],

    // ===== Big 12 (16) =====
    ["arizona",          "University of Arizona",                  "Arizona",          "ARIZ", "big12", "AZ", "Tucson",          "#003366", "#CC0033", 73,  0, 6, 6, "medium",  62, "Wildcats",         "arizona-state"],
    ["arizona-state",    "Arizona State University",               "Arizona State",    "ASU",  "big12", "AZ", "Tempe",           "#8C1D40", "#FFC627", 80,  2, 6, 7, "large",   72, "Sun Devils",       "arizona"],
    ["baylor",           "Baylor University",                      "Baylor",           "BAY",  "big12", "TX", "Waco",            "#003015", "#FFB81C", 73,  0, 6, 6, "medium",  62, "Bears",            "tcu"],
    ["byu",              "Brigham Young University",               "BYU",              "BYU",  "big12", "UT", "Provo",           "#002E5D", "#FFFFFF", 76,  0, 6, 5, "large",   72, "Cougars",          "utah"],
    ["cincinnati",       "University of Cincinnati",               "Cincinnati",       "CIN",  "big12", "OH", "Cincinnati",      "#E00122", "#000000", 73,  0, 6, 5, "medium",  60, "Bearcats",         "west-virginia"],
    ["colorado",         "University of Colorado",                 "Colorado",         "COL",  "big12", "CO", "Boulder",         "#CFB87C", "#000000", 75,  1, 7, 7, "large",   78, "Buffaloes",        "utah"],
    ["houston",          "University of Houston",                  "Houston",          "HOU",  "big12", "TX", "Houston",         "#C8102E", "#FFFFFF", 70, -1, 6, 5, "medium",  58, "Cougars",          "tcu"],
    ["iowa-state",       "Iowa State University",                  "Iowa State",       "ISU",  "big12", "IA", "Ames",            "#C8102E", "#F1BE48", 80,  1, 5, 5, "medium",  68, "Cyclones",         "iowa"],
    ["kansas",           "University of Kansas",                   "Kansas",           "KU",   "big12", "KS", "Lawrence",        "#0051BA", "#E8000D", 70,  1, 5, 5, "medium",  62, "Jayhawks",         "kansas-state"],
    ["kansas-state",     "Kansas State University",                "Kansas State",     "KSU",  "big12", "KS", "Manhattan",       "#512888", "#FFFFFF", 80,  0, 6, 6, "medium",  68, "Wildcats",         "kansas"],
    ["oklahoma-state",   "Oklahoma State University",              "Oklahoma State",   "OKST", "big12", "OK", "Stillwater",      "#FF7300", "#000000", 78,  0, 7, 6, "large",   72, "Cowboys",          "oklahoma"],
    ["tcu",              "Texas Christian University",             "TCU",              "TCU",  "big12", "TX", "Fort Worth",      "#4D1979", "#A3A9AC", 78,  0, 7, 7, "large",   72, "Horned Frogs",     "baylor"],
    ["texas-tech",       "Texas Tech University",                  "Texas Tech",       "TT",   "big12", "TX", "Lubbock",         "#CC0000", "#000000", 73,  1, 6, 6, "large",   65, "Red Raiders",      "texas"],
    ["ucf",              "University of Central Florida",          "UCF",              "UCF",  "big12", "FL", "Orlando",         "#000000", "#BC9B6A", 73,  0, 6, 6, "medium",  62, "Knights",          "south-florida"],
    ["utah",             "University of Utah",                     "Utah",             "UT",   "big12", "UT", "Salt Lake City",  "#CC0000", "#FFFFFF", 82,  0, 7, 7, "large",   75, "Utes",             "byu"],
    ["west-virginia",    "West Virginia University",               "West Virginia",    "WVU",  "big12", "WV", "Morgantown",      "#002855", "#EAAA00", 73,  0, 6, 6, "large",   70, "Mountaineers",     "pitt"],

    // ===== ACC (17) =====
    ["boston-college",   "Boston College",                         "Boston College",   "BC",   "acc",   "MA", "Chestnut Hill",   "#8B0000", "#A39161", 65, -1, 5, 5, "small",   55, "Eagles",           "syracuse"],
    ["california",       "University of California, Berkeley",     "California",       "CAL",  "acc",   "CA", "Berkeley",        "#003262", "#FDB515", 65,  0, 5, 5, "medium",  58, "Golden Bears",     "stanford"],
    ["clemson",          "Clemson University",                     "Clemson",          "CLEM", "acc",   "SC", "Clemson",         "#F66733", "#522D80", 86, -1, 8, 8, "massive", 95, "Tigers",           "south-carolina"],
    ["duke",             "Duke University",                        "Duke",             "DUKE", "acc",   "NC", "Durham",          "#003087", "#FFFFFF", 70,  1, 5, 5, "small",   55, "Blue Devils",      "north-carolina"],
    ["florida-state",    "Florida State University",               "Florida State",    "FSU",  "acc",   "FL", "Tallahassee",     "#782F40", "#CEB888", 78, -2, 8, 8, "massive", 90, "Seminoles",        "florida"],
    ["georgia-tech",     "Georgia Institute of Technology",        "Georgia Tech",     "GT",   "acc",   "GA", "Atlanta",         "#B3A369", "#003057", 72,  1, 6, 5, "medium",  60, "Yellow Jackets",   "georgia"],
    ["louisville",       "University of Louisville",               "Louisville",       "LOU",  "acc",   "KY", "Louisville",      "#AD0000", "#000000", 76,  0, 6, 6, "large",   65, "Cardinals",        "kentucky"],
    ["miami-fl",         "University of Miami",                    "Miami",            "MIA",  "acc",   "FL", "Coral Gables",    "#F47321", "#005030", 81,  1, 8, 8, "large",   85, "Hurricanes",       "florida-state"],
    ["nc-state",         "NC State University",                    "NC State",         "NCS",  "acc",   "NC", "Raleigh",         "#CC0000", "#000000", 75,  0, 6, 6, "large",   65, "Wolfpack",         "north-carolina"],
    ["north-carolina",   "University of North Carolina",           "North Carolina",   "UNC",  "acc",   "NC", "Chapel Hill",     "#7BAFD4", "#FFFFFF", 73,  0, 6, 6, "large",   70, "Tar Heels",        "nc-state"],
    ["pitt",             "University of Pittsburgh",               "Pittsburgh",       "PITT", "acc",   "PA", "Pittsburgh",      "#003594", "#FFB81C", 73,  0, 6, 6, "medium",  62, "Panthers",         "west-virginia"],
    ["smu",              "Southern Methodist University",          "SMU",              "SMU",  "acc",   "TX", "Dallas",          "#0033A0", "#C8102E", 78,  1, 7, 7, "medium",  68, "Mustangs",         "tcu"],
    ["stanford",         "Stanford University",                    "Stanford",         "STAN", "acc",   "CA", "Stanford",        "#8C1515", "#FFFFFF", 65, -1, 6, 5, "medium",  68, "Cardinal",         "california"],
    ["syracuse",         "Syracuse University",                    "Syracuse",         "SYR",  "acc",   "NY", "Syracuse",        "#F76900", "#000E54", 70,  0, 5, 5, "medium",  58, "Orange",           "boston-college"],
    ["virginia",         "University of Virginia",                 "Virginia",         "UVA",  "acc",   "VA", "Charlottesville", "#232D4B", "#F84C1E", 65,  0, 5, 5, "medium",  55, "Cavaliers",        "virginia-tech"],
    ["virginia-tech",    "Virginia Tech",                          "Virginia Tech",    "VT",   "acc",   "VA", "Blacksburg",      "#630031", "#CF4520", 73,  0, 6, 6, "large",   65, "Hokies",           "virginia"],
    ["wake-forest",      "Wake Forest University",                 "Wake Forest",      "WF",   "acc",   "NC", "Winston-Salem",   "#9E7E38", "#000000", 67,  0, 5, 4, "small",   52, "Demon Deacons",    "duke"],

    // ===== Pac-12 rebuild (8) =====
    ["washington-state", "Washington State University",            "Washington State", "WSU",  "pac12", "WA", "Pullman",         "#981E32", "#5E6A71", 68,  0, 5, 5, "medium",  58, "Cougars",          "oregon-state"],
    ["oregon-state",     "Oregon State University",                "Oregon State",     "ORST", "pac12", "OR", "Corvallis",       "#DC4405", "#000000", 70,  0, 5, 5, "medium",  60, "Beavers",          "washington-state"],
    ["boise-state",      "Boise State University",                 "Boise State",      "BSU",  "pac12", "ID", "Boise",           "#0033A0", "#D64309", 78,  0, 5, 5, "medium",  68, "Broncos",          "fresno-state"],
    ["colorado-state",   "Colorado State University",              "Colorado State",   "CSU",  "pac12", "CO", "Fort Collins",    "#1E4D2B", "#C8C372", 65,  0, 4, 4, "medium",  52, "Rams",             "wyoming"],
    ["fresno-state",     "Fresno State",                           "Fresno State",     "FRES", "pac12", "CA", "Fresno",          "#C41E3A", "#003594", 70,  0, 5, 4, "medium",  58, "Bulldogs",         "boise-state"],
    ["san-diego-state",  "San Diego State University",             "San Diego State",  "SDSU", "pac12", "CA", "San Diego",       "#000000", "#A6192E", 68,  0, 5, 4, "medium",  58, "Aztecs",           "fresno-state"],
    ["utah-state",       "Utah State University",                  "Utah State",       "USU",  "pac12", "UT", "Logan",           "#00263A", "#9CA3AF", 65, -1, 4, 4, "small",   52, "Aggies",           "byu"],
    ["texas-state",      "Texas State University",                 "Texas State",      "TXST", "pac12", "TX", "San Marcos",      "#501214", "#928E70", 64,  1, 4, 4, "small",   48, "Bobcats",          "utsa"],

    // ===== AAC (14) =====
    ["army",             "United States Military Academy",         "Army",             "ARMY", "aac",   "NY", "West Point",      "#000000", "#D4BF91", 70,  0, 4, 3, "medium",  72, "Black Knights",    "navy"],
    ["charlotte",        "UNC Charlotte",                          "Charlotte",        "CHAR", "aac",   "NC", "Charlotte",       "#005035", "#A49665", 60, -1, 4, 4, "small",   45, "49ers",            "east-carolina"],
    ["east-carolina",    "East Carolina University",               "East Carolina",    "ECU",  "aac",   "NC", "Greenville",      "#592A8A", "#FFC72C", 65,  0, 4, 4, "small",   50, "Pirates",          "memphis"],
    ["fau",              "Florida Atlantic University",            "FAU",              "FAU",  "aac",   "FL", "Boca Raton",      "#003366", "#CC0000", 62,  0, 4, 4, "small",   48, "Owls",             "fiu"],
    ["memphis",          "University of Memphis",                  "Memphis",          "MEM",  "aac",   "TN", "Memphis",         "#003087", "#898D8D", 75,  0, 5, 5, "medium",  62, "Tigers",           "tulane"],
    ["navy",             "United States Naval Academy",            "Navy",             "NAVY", "aac",   "MD", "Annapolis",       "#00205B", "#B9975B", 68,  0, 4, 3, "medium",  68, "Midshipmen",       "army"],
    ["north-texas",      "University of North Texas",              "North Texas",      "UNT",  "aac",   "TX", "Denton",          "#00853E", "#FFFFFF", 62,  0, 4, 4, "small",   48, "Mean Green",       "smu"],
    ["rice",             "Rice University",                        "Rice",             "RICE", "aac",   "TX", "Houston",         "#00205B", "#C1C6C8", 58, -1, 3, 3, "small",   42, "Owls",             "houston"],
    ["south-florida",    "University of South Florida",            "South Florida",    "USF",  "aac",   "FL", "Tampa",           "#006747", "#CFC493", 65,  1, 5, 5, "medium",  55, "Bulls",            "ucf"],
    ["temple",           "Temple University",                      "Temple",           "TEM",  "aac",   "PA", "Philadelphia",    "#9E1B32", "#FFFFFF", 60, -1, 4, 4, "small",   48, "Owls",             "navy"],
    ["tulane",           "Tulane University",                      "Tulane",           "TUL",  "aac",   "LA", "New Orleans",     "#006747", "#A6A8AB", 73,  0, 5, 5, "small",   58, "Green Wave",       "memphis"],
    ["tulsa",            "University of Tulsa",                    "Tulsa",            "TLSA", "aac",   "OK", "Tulsa",           "#003594", "#C8102E", 60, -1, 4, 4, "small",   45, "Golden Hurricane", "oklahoma-state"],
    ["uab",              "UAB",                                    "UAB",              "UAB",  "aac",   "AL", "Birmingham",      "#1E6B52", "#F4C300", 63,  0, 4, 4, "small",   50, "Blazers",          "memphis"],
    ["utsa",             "University of Texas at San Antonio",     "UTSA",             "UTSA", "aac",   "TX", "San Antonio",     "#0C2340", "#F15A22", 70,  1, 5, 5, "medium",  55, "Roadrunners",      "rice"],

    // ===== Mountain West (7) =====
    ["air-force",        "United States Air Force Academy",        "Air Force",        "AF",   "mwc",   "CO", "Colorado Springs","#003087", "#8A8D8F", 68,  0, 4, 3, "medium",  62, "Falcons",          "navy"],
    ["hawaii",           "University of Hawaii",                   "Hawaii",           "HAW",  "mwc",   "HI", "Honolulu",        "#024731", "#C8C8C8", 60,  0, 4, 3, "small",   50, "Rainbow Warriors", "fresno-state"],
    ["nevada",           "University of Nevada, Reno",             "Nevada",           "NEV",  "mwc",   "NV", "Reno",            "#003366", "#A6A8AB", 60, -1, 4, 4, "small",   48, "Wolf Pack",        "unlv"],
    ["new-mexico",       "University of New Mexico",               "New Mexico",       "NM",   "mwc",   "NM", "Albuquerque",     "#BA0C2F", "#A39161", 56, -1, 3, 3, "small",   42, "Lobos",            "new-mexico-state"],
    ["san-jose-state",   "San Jose State University",              "San Jose State",   "SJSU", "mwc",   "CA", "San Jose",        "#0055A2", "#E5A823", 64,  0, 4, 4, "small",   48, "Spartans",         "fresno-state"],
    ["unlv",             "University of Nevada, Las Vegas",        "UNLV",             "UNLV", "mwc",   "NV", "Las Vegas",       "#CF0A2C", "#A6A8AB", 65,  1, 4, 4, "medium",  55, "Rebels",           "nevada"],
    ["wyoming",          "University of Wyoming",                  "Wyoming",          "WYO",  "mwc",   "WY", "Laramie",         "#492F24", "#FFC425", 62,  0, 3, 3, "small",   48, "Cowboys",          "colorado-state"],

    // ===== Sun Belt (13) =====
    ["app-state",        "Appalachian State University",           "Appalachian State","APP",  "sunbelt", "NC", "Boone",         "#000000", "#FFCD00", 70,  0, 4, 4, "medium",  55, "Mountaineers",     "georgia-southern"],
    ["arkansas-state",   "Arkansas State University",              "Arkansas State",   "ARST", "sunbelt", "AR", "Jonesboro",     "#CC092F", "#000000", 60,  0, 3, 3, "small",   45, "Red Wolves",       "louisiana"],
    ["coastal-carolina", "Coastal Carolina University",            "Coastal Carolina", "CCU",  "sunbelt", "SC", "Conway",        "#006F71", "#A27752", 65,  0, 4, 4, "small",   50, "Chanticleers",     "app-state"],
    ["georgia-southern", "Georgia Southern University",            "Georgia Southern", "GSU",  "sunbelt", "GA", "Statesboro",    "#003366", "#FFFFFF", 65,  0, 4, 4, "small",   52, "Eagles",           "georgia-state"],
    ["georgia-state",    "Georgia State University",               "Georgia State",    "GAST", "sunbelt", "GA", "Atlanta",       "#0033A0", "#FFFFFF", 60,  0, 4, 4, "small",   45, "Panthers",         "georgia-southern"],
    ["james-madison",    "James Madison University",               "James Madison",    "JMU",  "sunbelt", "VA", "Harrisonburg",  "#450084", "#CBB677", 72,  1, 4, 4, "medium",  58, "Dukes",            "old-dominion"],
    ["louisiana",        "University of Louisiana at Lafayette",   "Louisiana",        "LA",   "sunbelt", "LA", "Lafayette",     "#CE181E", "#000000", 68,  0, 4, 4, "small",   52, "Ragin' Cajuns",    "ulm"],
    ["marshall",         "Marshall University",                    "Marshall",         "MAR",  "sunbelt", "WV", "Huntington",    "#00B140", "#000000", 65,  0, 4, 4, "small",   55, "Thundering Herd",  "app-state"],
    ["old-dominion",     "Old Dominion University",                "Old Dominion",     "ODU",  "sunbelt", "VA", "Norfolk",       "#003057", "#7C878E", 60, -1, 3, 3, "small",   45, "Monarchs",         "james-madison"],
    ["south-alabama",    "University of South Alabama",            "South Alabama",    "SALA", "sunbelt", "AL", "Mobile",        "#00205B", "#BF0D3E", 60,  0, 3, 3, "small",   45, "Jaguars",          "troy"],
    ["southern-miss",    "University of Southern Mississippi",     "Southern Miss",    "USM",  "sunbelt", "MS", "Hattiesburg",   "#000000", "#FFAB00", 60,  0, 3, 3, "small",   45, "Golden Eagles",    "louisiana"],
    ["troy",             "Troy University",                        "Troy",             "TROY", "sunbelt", "AL", "Troy",          "#8B1A1A", "#000000", 65,  0, 4, 4, "small",   50, "Trojans",          "south-alabama"],
    ["ulm",              "University of Louisiana Monroe",         "ULM",              "ULM",  "sunbelt", "LA", "Monroe",        "#73000A", "#FFC72C", 56, -1, 3, 3, "small",   42, "Warhawks",         "louisiana"],

    // ===== MAC (13) =====
    ["akron",            "University of Akron",                    "Akron",            "AKR",  "mac",   "OH", "Akron",           "#00205B", "#84754E", 52, -1, 3, 3, "small",   38, "Zips",             "kent-state"],
    ["ball-state",       "Ball State University",                  "Ball State",       "BALL", "mac",   "IN", "Muncie",          "#BA0C2F", "#FFFFFF", 58,  0, 3, 3, "small",   42, "Cardinals",        "miami-oh"],
    ["bowling-green",    "Bowling Green State University",         "Bowling Green",    "BG",   "mac",   "OH", "Bowling Green",   "#FE5000", "#492F24", 60,  0, 3, 3, "small",   45, "Falcons",          "toledo"],
    ["buffalo",          "University at Buffalo",                  "Buffalo",          "BUFF", "mac",   "NY", "Buffalo",         "#0067B1", "#FFC72C", 60,  0, 3, 3, "small",   45, "Bulls",            "akron"],
    ["central-michigan", "Central Michigan University",            "Central Michigan", "CMU",  "mac",   "MI", "Mount Pleasant",  "#6A0032", "#FFC82E", 60,  0, 3, 3, "small",   45, "Chippewas",        "western-michigan"],
    ["eastern-michigan", "Eastern Michigan University",            "Eastern Michigan", "EMU",  "mac",   "MI", "Ypsilanti",       "#006633", "#FFFFFF", 56,  0, 3, 3, "small",   42, "Eagles",           "central-michigan"],
    ["kent-state",       "Kent State University",                  "Kent State",       "KENT", "mac",   "OH", "Kent",            "#002664", "#EAAB00", 50, -1, 3, 2, "small",   38, "Golden Flashes",   "akron"],
    ["umass",            "University of Massachusetts",            "UMass",            "UMAS", "mac",   "MA", "Amherst",         "#971B2F", "#000000", 50,  0, 3, 3, "small",   42, "Minutemen",        "uconn"],
    ["miami-oh",         "Miami University",                       "Miami (OH)",       "MOH",  "mac",   "OH", "Oxford",          "#B61E2E", "#000000", 65,  0, 4, 3, "small",   55, "RedHawks",         "ball-state"],
    ["northern-illinois","Northern Illinois University",           "Northern Illinois","NIU",  "mac",   "IL", "DeKalb",          "#CC0000", "#000000", 62,  0, 3, 3, "small",   45, "Huskies",          "western-michigan"],
    ["ohio",             "Ohio University",                        "Ohio",             "OHIO", "mac",   "OH", "Athens",          "#00694E", "#CDA077", 65,  0, 4, 3, "small",   50, "Bobcats",          "miami-oh"],
    ["toledo",           "University of Toledo",                   "Toledo",           "TOL",  "mac",   "OH", "Toledo",          "#003E7E", "#FFD200", 67,  0, 4, 3, "small",   52, "Rockets",          "bowling-green"],
    ["western-michigan", "Western Michigan University",            "Western Michigan", "WMU",  "mac",   "MI", "Kalamazoo",       "#6C4023", "#B5A268", 60,  0, 3, 3, "small",   45, "Broncos",          "central-michigan"],

    // ===== Conference USA (10) =====
    ["fiu",              "Florida International University",       "FIU",              "FIU",  "cusa",  "FL", "Miami",           "#081E3F", "#B6862C", 56,  0, 3, 3, "small",   42, "Panthers",         "fau"],
    ["jacksonville-state","Jacksonville State University",         "Jacksonville State","JVST","cusa",  "AL", "Jacksonville",    "#CE0000", "#FFFFFF", 60,  1, 3, 3, "small",   45, "Gamecocks",        "sam-houston"],
    ["kennesaw-state",   "Kennesaw State University",              "Kennesaw State",   "KENN", "cusa",  "GA", "Kennesaw",        "#000000", "#FFC72C", 50,  1, 3, 2, "small",   40, "Owls",             "georgia-state"],
    ["liberty",          "Liberty University",                     "Liberty",          "LIB",  "cusa",  "VA", "Lynchburg",       "#990000", "#002D62", 70,  0, 4, 4, "small",   58, "Flames",           "old-dominion"],
    ["louisiana-tech",   "Louisiana Tech University",              "Louisiana Tech",   "LATC", "cusa",  "LA", "Ruston",          "#001F5B", "#C8102E", 58,  0, 3, 3, "small",   45, "Bulldogs",         "southern-miss"],
    ["middle-tennessee", "Middle Tennessee State University",      "Middle Tennessee", "MTSU", "cusa",  "TN", "Murfreesboro",    "#0066CC", "#FFFFFF", 62,  0, 3, 3, "small",   48, "Blue Raiders",     "western-kentucky"],
    ["new-mexico-state", "New Mexico State University",            "New Mexico State", "NMSU", "cusa",  "NM", "Las Cruces",      "#8B0000", "#FFFFFF", 56,  0, 3, 3, "small",   42, "Aggies",           "new-mexico"],
    ["sam-houston",      "Sam Houston State University",           "Sam Houston",      "SHSU", "cusa",  "TX", "Huntsville",      "#F77F00", "#000000", 60,  1, 3, 3, "small",   45, "Bearkats",         "jacksonville-state"],
    ["utep",             "University of Texas at El Paso",         "UTEP",             "UTEP", "cusa",  "TX", "El Paso",         "#FF8200", "#041E42", 56, -1, 3, 3, "small",   45, "Miners",           "new-mexico-state"],
    ["western-kentucky", "Western Kentucky University",            "Western Kentucky", "WKU",  "cusa",  "KY", "Bowling Green",   "#C8102E", "#FFFFFF", 62,  0, 3, 3, "small",   48, "Hilltoppers",      "middle-tennessee"],

    // ===== Independents (2) =====
    ["notre-dame",       "University of Notre Dame",               "Notre Dame",       "ND",   "indep", "IN", "Notre Dame",      "#0C2340", "#C99700", 88,  0, 9, 8, "massive", 99, "Fighting Irish",   "usc"],
    ["uconn",            "University of Connecticut",              "Connecticut",      "UCON", "indep", "CT", "Storrs",          "#000E2F", "#A8A8A8", 56,  0, 4, 3, "small",   45, "Huskies",          "umass"],
  ];

  // ── Build expanded program records + profile records ─────────────────────
  const programs = TEAMS.map((t) => ({
    id: t[0],
    name: t[1],
    shortName: t[2],
    crest: t[3],
    record: "0-0",
    rival: t[16],
    headCoachProfileId: `coach-${t[0]}-hc`,
    schoolProfileId: `school-${t[0]}`,
    stadiumProfileId: `stadium-${t[0]}`,
    basePrestige: t[9],
    baseFanConfidence: clampRating(Math.round(t[9] * 0.85 + 8)),
    baseDonorConfidence: clampRating(Math.round(t[9] * 0.78 + 4)),
    baseAcademicStability: clampRating(75 + Math.round((t[9] - 75) * 0.4)),
    conference: t[4],
    state: t[5],
    city: t[6],
    colorPrimary: t[7],
    colorSecondary: t[8],
    programRating: t[9],
    historicalRatings: histRatings(t[9], t[10], t[0]),
    projectedRatings: projRatings(t[9], t[10], t[0]),
    recruitingTier: t[11],
    nilTier: t[12],
    fanBase: t[13],
    brandRecognition: t[14],
    nickname: t[15],
  }));

  const coachProfiles = TEAMS.map((t) => ({
    id: `coach-${t[0]}-hc`,
    name: `${t[2]} Head Coach`,
    role: "Head Coach",
    programId: t[0],
    attrs: fillAttrs(COACH_KEYS, null, t[13], t[9], 13, `coach:${t[0]}:${t[9]}`),
  }));
  const schoolProfiles = TEAMS.map((t) => ({
    id: `school-${t[0]}`,
    name: t[1],
    conference: (CONFERENCES[t[4]] || { short: t[4] }).short,
    programId: t[0],
    attrs: fillAttrs(SCHOOL_KEYS, SCHOOL_FAN_KEYS, t[13], t[9], 13, `school:${t[0]}:${t[9]}`),
  }));
  const stadiumProfiles = TEAMS.map((t) => ({
    id: `stadium-${t[0]}`,
    name: `${t[2]} Stadium`,
    city: t[6],
    programId: t[0],
    attrs: fillAttrs(STADIUM_KEYS, STADIUM_FAN_KEYS, t[13], t[9], 12, `stadium:${t[0]}:${t[9]}`),
  }));

  // ── Default career: starting team is Tennessee (recognizable, mid-elite) ─
  const DEFAULT_PROGRAM_ID = "tennessee";
  const defaultProgram = programs.find((p) => p.id === DEFAULT_PROGRAM_ID) || programs[0];

  // ── Build a real-conference standings + a realistic schedule for default ─
  function buildStandings(programId) {
    const myProg = programs.find((p) => p.id === programId);
    if (!myProg) return [];
    const conf = myProg.conference;
    const confTeams = programs.filter((p) => p.conference === conf);
    confTeams.sort((a, b) => b.programRating - a.programRating);
    return confTeams.map((p, i) => [
      String(i + 1),
      p.shortName,
      "0-0",
      String(p.programRating),
      p.programRating >= 90 ? "A" : p.programRating >= 82 ? "A-" : p.programRating >= 75 ? "B+" : p.programRating >= 68 ? "B" : "C+",
    ]);
  }

  const SEASON_DATES = ["Aug 30", "Sep 6", "Sep 13", "Sep 20", "Sep 27", "Oct 4", "Oct 11", "Oct 18", "Oct 25", "Nov 1", "Nov 8", "Nov 22"];

  function buildSchedule(programId) {
    const myProg = programs.find((p) => p.id === programId);
    if (!myProg) return [];
    const conf = myProg.conference;
    const confOpps = programs.filter((p) => p.conference === conf && p.id !== programId);
    confOpps.sort((a, b) => b.programRating - a.programRating);
    const nonConf = programs.filter((p) => p.conference !== conf && p.programRating >= myProg.programRating - 18 && p.programRating <= myProg.programRating + 12);
    nonConf.sort((a, b) => Math.abs(b.programRating - myProg.programRating) - Math.abs(a.programRating - myProg.programRating));
    // Mix: 1 non-con FCS-ish opener, then alternate conf/non-conf, then conf push to end.
    const ordered = [];
    const confPick = confOpps.slice(0, 8);
    const nonPick = nonConf.slice(0, 4);
    // Slot pattern roughly: NC, NC, C, C, NC, C, C, C, NC, C, C, C (rivalry last)
    const order = [
      { from: "n", idx: 0 },
      { from: "n", idx: 1 },
      { from: "c", idx: 0 },
      { from: "c", idx: 1 },
      { from: "n", idx: 2 },
      { from: "c", idx: 2 },
      { from: "c", idx: 3 },
      { from: "c", idx: 4 },
      { from: "n", idx: 3 },
      { from: "c", idx: 5 },
      { from: "c", idx: 6 },
      { from: "c", idx: 7 },
    ];
    // If a rival exists in the conference pool, make sure they're slotted in
    // the rivalry-week slot (Nov 22 / index 11).
    const rivalIdxInConf = confPick.findIndex((p) => p.id === myProg.rival);
    if (rivalIdxInConf >= 0) {
      const rival = confPick.splice(rivalIdxInConf, 1)[0];
      confPick.push(rival);
      // overwrite last slot to take that rival
      order[11] = { from: "c", idx: confPick.length - 1 };
    }
    order.forEach((slot, i) => {
      const pool = slot.from === "c" ? confPick : nonPick;
      const opp = pool[slot.idx] || pool[pool.length - 1];
      if (!opp) return;
      const isHome = i % 2 === 0;
      const grade =
        opp.programRating >= 90 ? "A+"
        : opp.programRating >= 82 ? "A-"
        : opp.programRating >= 75 ? "B+"
        : opp.programRating >= 68 ? "B"
        : "C+";
      const note =
        opp.id === myProg.rival ? "Rivalry week"
        : opp.programRating >= 88 ? "Marquee matchup"
        : opp.programRating >= 80 ? "Conference contender"
        : slot.from === "n" ? "Non-conference"
        : "Conference game";
      ordered.push([
        SEASON_DATES[i] || "Nov 29",
        isHome ? opp.shortName : `at ${opp.shortName}`,
        isHome ? "Home" : "Away",
        grade,
        note,
      ]);
    });
    return ordered;
  }

  // ── Calendar / agenda / notifications ────────────────────────────────────
  // Reuse the demo pack's calendar + boot notifications. The calendar items
  // are camp-week prose that's mostly generic (a couple of strings mention
  // Lakeview-specific players/opponents — accepted as flavor for v1).
  const demo = window.CGM_DEMO_WORLD || {};
  const demoData = (demo && demo.data) || {};

  // ── Seed roster ──────────────────────────────────────────────────────────
  // Validation requires playerProfiles to be non-empty AND depth-chart slots
  // QB1/RB1/WR1/LT1/EDGE1/CB1 to all be filled with valid player ids. Seed one
  // realistic player per required slot with proper FM-style 1-20 attrs scaled
  // to the team's programRating, so the dev-tick OVR recompute lands sensibly.
  // synthesizeRosterFill in app.js then expands these into a full ~75-player
  // roster on career bootstrap.
  const SEED_FIRST = ["Marcus","Jaylen","Trevor","Cameron","Brandon","Devin","Tyler","Mason","Caleb","Ethan","Hunter","Bryce","Logan","Connor","Dylan","Austin"];
  const SEED_LAST = ["Mitchell","Bennett","Caldwell","Harper","Spencer","Whitman","Chambers","Rivera","Brooks","Sullivan","Kennedy","Vaughn","Patterson","Cole","Stratton","Garrison"];
  const SEED_SLOTS = [
    { slot: "QB1",   pos: "QB",   year: "JR", arch: "Pocket Distributor" },
    { slot: "RB1",   pos: "HB",   year: "SO", arch: "Workhorse" },
    { slot: "WR1",   pos: "WR",   year: "SR", arch: "Route Technician" },
    { slot: "LT1",   pos: "LT",   year: "JR", arch: "Pass Protector" },
    { slot: "EDGE1", pos: "EDGE", year: "SO", arch: "Edge Rusher" },
    { slot: "CB1",   pos: "CB",   year: "FR", arch: "Man Corner" },
  ];
  // 36-key generic attrs schema — must mirror PLAYER_ATTRS in app.js.
  const PLAYER_ATTR_KEYS = [
    "throwing","catching","routeRunning","ballCarrying","passBlocking","runBlocking",
    "tackling","passRush","coverage","kicking","punting","longSnapping","technique","firstTouch",
    "decisions","anticipation","composure","concentration","determination","workRate",
    "leadership","aggression","bravery","flair","teamwork","positioning","vision","offTheBall",
    "pace","acceleration","agility","strength","stamina","balance","jumping",
  ];
  const KEY_BY_POS = {
    QB:   ["throwing","decisions","anticipation","vision","composure","concentration","technique","flair"],
    HB:   ["ballCarrying","pace","acceleration","agility","strength","bravery","decisions","balance"],
    WR:   ["catching","routeRunning","pace","acceleration","agility","firstTouch","offTheBall","flair"],
    LT:   ["passBlocking","runBlocking","strength","technique","agility","determination","stamina","anticipation"],
    EDGE: ["passRush","acceleration","agility","strength","technique","aggression","positioning","bravery"],
    CB:   ["coverage","pace","acceleration","anticipation","decisions","positioning","agility","jumping"],
  };
  function seedAttrs(position, ovr, seed) {
    const r = pseudoRandom(seed);
    const base = Math.round(ovr / 5.5);
    const keySet = new Set(KEY_BY_POS[position] || []);
    const attrs = {};
    PLAYER_ATTR_KEYS.forEach((k) => {
      const isKey = keySet.has(k);
      const noise = Math.round((r() - 0.5) * 5);
      const penalty = isKey ? 0 : -3;
      attrs[k] = Math.max(1, Math.min(20, base + penalty + noise));
    });
    return attrs;
  }
  const seedPlayers = SEED_SLOTS.map((s, i) => {
    const seedKey = `seed:${DEFAULT_PROGRAM_ID}:${s.pos}:${i}`;
    const r = pseudoRandom(seedKey);
    const first = SEED_FIRST[Math.floor(r() * SEED_FIRST.length)];
    const last = SEED_LAST[Math.floor(r() * SEED_LAST.length)];
    const ovr = Math.max(70, Math.min(95, defaultProgram.programRating - 2 + (i % 3) - 1));
    return {
      id: `player-${DEFAULT_PROGRAM_ID}-seed-${s.pos.toLowerCase()}-${i}`,
      name: `${first} ${last}`,
      position: s.pos,
      positions: [s.pos],
      year: s.year,
      ovr,
      pot: Math.max(ovr, Math.min(99, defaultProgram.programRating + 4)),
      schemeFit: "Standard A",
      archetype: s.arch,
      academicStatus: "On track",
      transferRisk: "Low",
      morale: "Stable",
      developmentFocus: "Technique",
      redshirtIntent: s.year === "FR" ? "Preserve" : "No Redshirt",
      attrs: seedAttrs(s.pos, ovr, seedKey),
      eligibility: {
        seasonsPlayed: s.year === "SR" ? 3 : s.year === "JR" ? 2 : s.year === "SO" ? 1 : 0,
        remainingSeasons: s.year === "SR" ? 1 : s.year === "JR" ? 2 : s.year === "SO" ? 3 : 4,
        gamesPlayedThisSeason: 0,
        redshirtUsed: false,
      },
    };
  });
  const seedDepthChart = {};
  SEED_SLOTS.forEach((s, i) => { seedDepthChart[s.slot] = seedPlayers[i].id; });

  const standings = buildStandings(DEFAULT_PROGRAM_ID);
  const schedule = buildSchedule(DEFAULT_PROGRAM_ID);

  return {
    schemaVersion: 1,
    contentPackId: "fbs-2026",
    contentPackLabel: "FBS 2026 (Real Schools)",
    phaseOrder: demo.phaseOrder || ["Preseason Setup", "Game Week", "Opener", "Postgame Review"],
    programs,
    conferences: CONFERENCES,
    career: {
      seed: "fbs-2026-tennessee",
      coachName: "Head Coach",
      programId: DEFAULT_PROGRAM_ID,
      startYear: 2026,
      school: defaultProgram.name,
      record: "0-0",
      currentEventIndex: 0,
      advanceCount: 0,
    },
    calendar: demo.calendar || [],
    data: Object.assign({}, demoData, {
      coachProfiles,
      schoolProfiles,
      stadiumProfiles,
      programs: undefined,
      roster: seedPlayers.map((p) => [p.position, p.name, p.year, String(p.ovr), `Seed ${p.archetype}`]),
      playerProfiles: seedPlayers,
      playerDecisions: {},
      depthChart: seedDepthChart,
      standings,
      schedule,
      // Reset team-specific demo state so synth fills it cleanly.
      seasonState: {
        seasonYear: 2026,
        currentGameIndex: 0,
        overallRecord: { wins: 0, losses: 0 },
        conferenceRecord: { wins: 0, losses: 0 },
        playedGames: [],
        cfpBracket: [],
        postseasonStage: "regular",
        seasonComplete: false,
        yearRolled: false,
        lastResultSummary: "No games played yet",
      },
      pressureState: { objectivePressure: 42, jobSecurity: 74, adTrust: 71, trace: [] },
      cultureState: { promiseLedger: {}, moraleScores: {}, moraleTrace: [] },
      facilitiesState: {
        requestStatus: { "Indoor Field": "Pending", "Weight Room": "Pending", "Academic Center": "Pending", "Recruit Lounge": "Pending" },
        upgradeHistory: [],
        longTermBoost: 0,
      },
    }),
  };
})();
