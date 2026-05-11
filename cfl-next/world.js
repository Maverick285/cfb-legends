(function defineWorldFactory(root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.CFLNextWorld = factory();
})(typeof globalThis !== "undefined" ? globalThis : window, function buildFactory() {
  "use strict";

  const ATTRIBUTE_KEYS = [
    "speed", "acceleration", "agility", "strength", "explosiveness", "stamina",
    "throwPower", "shortAccuracy", "intermediateAccuracy", "deepAccuracy", "processing", "poise",
    "ballSecurity", "vision", "contactBalance", "routeRunning", "hands", "contestedCatch",
    "release", "runBlock", "passBlock", "anchor", "pulling", "getOff", "bend", "powerRush",
    "blockShedding", "tackling", "pursuit", "manCoverage", "zoneCoverage", "press",
    "kickPower", "kickAccuracy", "discipline", "workEthic", "leadership", "footballIQ",
  ];

  const POSITION_PLAN = [
    ["QB", 6], ["RB", 8], ["WR", 14], ["TE", 7], ["OT", 10], ["OG", 8], ["C", 5],
    ["EDGE", 8], ["DL", 10], ["LB", 10], ["CB", 9], ["S", 6], ["K", 1], ["P", 1], ["LS", 2],
  ];

  const POSITION_WEIGHTS = {
    QB: { throwPower: 1.0, shortAccuracy: 1.0, intermediateAccuracy: 1.2, deepAccuracy: 0.8, processing: 1.3, poise: 1.0, footballIQ: 1.1, leadership: 0.6, speed: 0.25 },
    RB: { speed: 0.9, acceleration: 1.0, agility: 0.9, strength: 0.45, explosiveness: 0.8, vision: 1.1, contactBalance: 1.0, ballSecurity: 0.75, hands: 0.35 },
    WR: { speed: 1.0, acceleration: 0.9, agility: 0.75, routeRunning: 1.1, hands: 1.0, contestedCatch: 0.65, release: 0.75, footballIQ: 0.35 },
    TE: { strength: 0.65, speed: 0.45, routeRunning: 0.75, hands: 0.9, contestedCatch: 0.75, runBlock: 0.75, passBlock: 0.45, footballIQ: 0.45 },
    OT: { strength: 1.0, passBlock: 1.2, runBlock: 0.95, anchor: 1.1, pulling: 0.45, discipline: 0.55, stamina: 0.45 },
    OG: { strength: 1.05, passBlock: 0.85, runBlock: 1.1, anchor: 0.9, pulling: 0.8, discipline: 0.55 },
    C: { strength: 0.8, passBlock: 0.9, runBlock: 0.9, anchor: 0.8, footballIQ: 1.1, discipline: 0.75, leadership: 0.45 },
    EDGE: { getOff: 1.1, bend: 1.0, powerRush: 0.85, blockShedding: 0.7, pursuit: 0.65, tackling: 0.5, speed: 0.55 },
    DL: { strength: 1.1, getOff: 0.75, powerRush: 0.85, blockShedding: 1.0, tackling: 0.65, stamina: 0.45 },
    LB: { speed: 0.65, strength: 0.55, blockShedding: 0.75, tackling: 1.0, pursuit: 1.05, zoneCoverage: 0.75, footballIQ: 0.8, discipline: 0.55 },
    CB: { speed: 1.0, acceleration: 0.9, agility: 0.9, manCoverage: 1.1, zoneCoverage: 0.75, press: 0.65, footballIQ: 0.45, tackling: 0.35 },
    S: { speed: 0.8, acceleration: 0.65, tackling: 0.85, pursuit: 0.75, manCoverage: 0.55, zoneCoverage: 1.0, footballIQ: 0.8, leadership: 0.35 },
    K: { kickPower: 1.25, kickAccuracy: 1.25, poise: 0.85, discipline: 0.5 },
    P: { kickPower: 1.15, kickAccuracy: 1.1, poise: 0.75, discipline: 0.5 },
    LS: { discipline: 1.0, footballIQ: 0.8, strength: 0.65, passBlock: 0.45, stamina: 0.45 },
  };

  const FIRST_NAMES = [
    "Jalen", "Marcus", "Trey", "Cam", "Darius", "Malik", "Eli", "Bryce", "Andre", "Noah",
    "Caleb", "Micah", "Jaylen", "Isaiah", "Ty", "Kaden", "Roman", "Devin", "Cole", "Miles",
    "Nate", "Brady", "Zion", "Quentin", "Rashad", "Owen", "Grant", "Kai", "Drew", "Landon",
  ];

  const LAST_NAMES = [
    "Turner", "Hayes", "Johnson", "Miller", "Brooks", "Carter", "Reed", "Harris", "Bennett", "Coleman",
    "Wright", "Parker", "Morris", "Foster", "Cooper", "Sullivan", "Griffin", "Porter", "Bryant", "Ellis",
    "Fields", "Bishop", "Watkins", "Marshall", "Hughes", "Sanders", "Warren", "Bell", "Knight", "Powell",
  ];

  const CITIES = [
    ["Nashville", "TN"], ["Memphis", "TN"], ["Knoxville", "TN"], ["Atlanta", "GA"], ["Birmingham", "AL"],
    ["Louisville", "KY"], ["Charlotte", "NC"], ["Dallas", "TX"], ["Houston", "TX"], ["Jackson", "MS"],
    ["Orlando", "FL"], ["Savannah", "GA"], ["Mobile", "AL"], ["Little Rock", "AR"], ["St. Louis", "MO"],
  ];

  const TRAITS = [
    "Film Junkie", "High Motor", "Late Developer", "Big Game Nerve", "Locker Room Voice",
    "Raw Tools", "Coach's Favorite", "Confidence Player", "Quiet Competitor", "Fast Starter",
  ];

  function hashString(input) {
    let h = 2166136261;
    for (let i = 0; i < input.length; i += 1) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function random() {
      a += 0x6D2B79F5;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, Math.round(n)));
  }

  function pick(list, random) {
    return list[Math.floor(random() * list.length)];
  }

  function weightedOverall(attrs, position) {
    const weights = POSITION_WEIGHTS[position] || POSITION_WEIGHTS.LB;
    let score = 0;
    let total = 0;
    Object.keys(weights).forEach((key) => {
      score += (attrs[key] || 50) * weights[key];
      total += weights[key];
    });
    return clamp(score / Math.max(1, total), 35, 99);
  }

  function buildAttributes(position, talent, random) {
    const attrs = {};
    ATTRIBUTE_KEYS.forEach((key) => {
      const positionalBoost = POSITION_WEIGHTS[position] && POSITION_WEIGHTS[position][key] ? POSITION_WEIGHTS[position][key] * 9 : 0;
      const noise = (random() - 0.5) * 22;
      attrs[key] = clamp(talent + positionalBoost + noise, 34, 96);
    });
    return attrs;
  }

  function physicalProfile(position, random) {
    const base = {
      QB: [74, 215], RB: [70, 209], WR: [73, 195], TE: [76, 242], OT: [78, 308], OG: [76, 302], C: [75, 295],
      EDGE: [76, 255], DL: [75, 294], LB: [74, 232], CB: [71, 188], S: [72, 202], K: [72, 190], P: [74, 198], LS: [74, 235],
    }[position] || [73, 210];
    return {
      heightInches: clamp(base[0] + (random() - 0.5) * 5, 66, 81),
      weightPounds: clamp(base[1] + (random() - 0.5) * 38, 165, 330),
    };
  }

  function buildRoster() {
    const random = mulberry32(hashString("cfl-next-vanderbilt-2031"));
    const roster = [];
    let number = 0;
    POSITION_PLAN.forEach(([position, count]) => {
      for (let depth = 1; depth <= count; depth += 1) {
        number += 1;
        const talent = 58 + random() * 21 + (depth <= 2 ? 8 : 0) - (depth > count - 2 ? 5 : 0);
        const attrs = buildAttributes(position, talent, random);
        const physical = physicalProfile(position, random);
        const city = pick(CITIES, random);
        const firstName = pick(FIRST_NAMES, random);
        const lastName = pick(LAST_NAMES, random);
        const positionOverall = {};
        Object.keys(POSITION_WEIGHTS).forEach((pos) => {
          const related = pos === position || (position === "WR" && pos === "TE") || (position === "CB" && pos === "S") || (position === "OT" && pos === "OG");
          if (related) positionOverall[pos] = weightedOverall(attrs, pos);
        });
        const overall = positionOverall[position] || weightedOverall(attrs, position);
        roster.push({
          personId: `person_${String(number).padStart(4, "0")}`,
          firstName,
          lastName,
          displayName: `${firstName} ${lastName}`,
          primaryPosition: position,
          secondaryPositions: Object.keys(positionOverall).filter((pos) => pos !== position),
          jerseyNumber: number <= 99 ? number : number - 99,
          classYear: pick(["FR", "SO", "JR", "SR", "RS-FR", "RS-SO", "RS-JR"], random),
          hometownCity: city[0],
          hometownState: city[1],
          highSchool: `${city[0]} ${pick(["Central", "West", "East", "North", "Catholic", "Prep"], random)}`,
          heightInches: physical.heightInches,
          weightPounds: physical.weightPounds,
          handedness: position === "QB" && random() > 0.84 ? "left" : "right",
          attributes: attrs,
          overall,
          potential: clamp(overall + 4 + random() * 14, overall, 99),
          positionOverall,
          morale: clamp(58 + random() * 34, 1, 100),
          confidence: clamp(52 + random() * 38, 1, 100),
          fatigue: clamp(8 + random() * 35, 0, 100),
          healthStatus: random() > 0.92 ? "limited" : "available",
          scholarshipStatus: number <= 85 ? "scholarship" : "walk-on",
          redshirtStatus: random() > 0.82 ? "available" : "none",
          depthSlot: depth,
          developmentFocus: pick(["Technique", "Strength", "Film Study", "Explosiveness", "Coverage", "Ball Security"], random),
          traits: [pick(TRAITS, random), pick(TRAITS, random)].filter((value, index, arr) => arr.indexOf(value) === index),
        });
      }
    });
    return roster;
  }

  function createInitialWorld() {
    const roster = buildRoster();
    const starters = roster.filter((player) => player.depthSlot === 1);
    const avg = (items, key) => Math.round(items.reduce((sum, item) => sum + item[key], 0) / Math.max(1, items.length));
    return {
      schemaVersion: 1,
      worldId: "world_vanderbilt_2031",
      currentDateLabel: "Sun, Sep 1, 2031",
      currentWeekLabel: "Week 2",
      currentPhase: "Game Week",
      userProgramId: "program_vanderbilt",
      school: {
        schoolId: "school_vanderbilt",
        programId: "program_vanderbilt",
        name: "Vanderbilt University",
        shortName: "Vanderbilt",
        nickname: "Commodores",
        abbreviation: "VAN",
        conference: "SEC",
        division: "SEC East",
        record: "7-2",
        conferenceRecord: "4-2 SEC",
        rank: 14,
        colors: {
          primary: "#0B0B0B",
          secondary: "#B7A66A",
          accent: "#F4E6B3",
          surface: "#111513",
        },
      },
      season: {
        seasonId: "season_2031",
        year: 2031,
        rulesetId: "ruleset_modern_cfb_v1",
        phase: "regular_season",
        week: 2,
      },
      roster,
      staff: [
        { coachId: "coach_001", name: "Raymond Keene", role: "Head Coach", recruiting: 78, development: 74, playCalling: 71 },
        { coachId: "coach_002", name: "Gabe Whitlow", role: "Offensive Coordinator", recruiting: 68, development: 81, playCalling: 84 },
        { coachId: "coach_003", name: "Marcus Bell", role: "Defensive Coordinator", recruiting: 72, development: 76, playCalling: 79 },
        { coachId: "coach_004", name: "T.J. Mallory", role: "Recruiting Coordinator", recruiting: 88, development: 64, playCalling: 58 },
      ],
      schedule: [
        { week: 1, opponent: "Western Kentucky", site: "vs", result: "W 38-17", status: "final" },
        { week: 2, opponent: "#9 Notre Dame", site: "vs", result: "3:30 PM", status: "next" },
        { week: 3, opponent: "Georgia", site: "at", result: "TBD", status: "scheduled" },
        { week: 4, opponent: "Mississippi State", site: "vs", result: "TBD", status: "scheduled" },
        { week: 5, opponent: "Tennessee", site: "at", result: "TBD", status: "scheduled" },
      ],
      standings: [
        { program: "Georgia", conf: "5-0", overall: "8-1" },
        { program: "Alabama", conf: "5-1", overall: "8-1" },
        { program: "Vanderbilt", conf: "4-2", overall: "7-2" },
        { program: "Tennessee", conf: "3-2", overall: "6-3" },
      ],
      stories: [
        {
          storyId: "story_captain_challenge",
          category: "Leadership",
          title: "The Captain's Challenge",
          kicker: "Senior QB Jack Turner asks for a more aggressive offensive identity before Notre Dame.",
          body: "The staff room is split. The coordinator likes the current script, the captain thinks the ceiling is higher, and the next decision will echo through morale and preparation.",
          subjectType: "player",
          subjectId: "person_0001",
          sourceStatus: "sample-event",
          targetRoute: "news",
        },
        {
          storyId: "story_visit_weekend",
          category: "Recruiting",
          title: "Three Official Visits Need Hosts",
          kicker: "A four-star edge, a local receiver, and a late-rising tackle arrive this weekend.",
          body: "The visit plan can lean into playing time, academic prestige, or the Notre Dame atmosphere. Staff recommends matching each recruit with a position-room leader.",
          subjectType: "recruiting",
          subjectId: "visit_weekend_001",
          sourceStatus: "sample-event",
          targetRoute: "recruiting",
        },
        {
          storyId: "story_depth_pressure",
          category: "Roster",
          title: "Nickel Room Under Pressure",
          kicker: "Two limited defensive backs have shifted the game-plan board.",
          body: "Depth chart data shows Vanderbilt can still play the preferred nickel package, but the staff may need a lower-contact practice plan before Saturday.",
          subjectType: "position_group",
          subjectId: "CB",
          sourceStatus: "computed-from-roster",
          targetRoute: "depth",
        },
      ],
      metrics: {
        overall: avg(starters, "overall"),
        offense: avg(starters.filter((p) => ["QB", "RB", "WR", "TE", "OT", "OG", "C"].includes(p.primaryPosition)), "overall"),
        defense: avg(starters.filter((p) => ["EDGE", "DL", "LB", "CB", "S"].includes(p.primaryPosition)), "overall"),
        specialTeams: avg(starters.filter((p) => ["K", "P", "LS"].includes(p.primaryPosition)), "overall"),
        morale: avg(roster, "morale"),
        confidence: avg(roster, "confidence"),
        fanHappiness: 88,
        rosterCount: roster.length,
        scholarshipCount: roster.filter((p) => p.scholarshipStatus === "scholarship").length,
        budget: "$18.4M",
        recruitingRank: 14,
        commitments: 10,
      },
      inbox: [
        { id: "inbox_001", title: "Captain requests offensive aggression", category: "Leadership", priority: "high" },
        { id: "inbox_002", title: "Notre Dame scout packet ready", category: "Game Scout", priority: "normal" },
        { id: "inbox_003", title: "Three official visits need hosts", category: "Recruiting", priority: "high" },
      ],
    };
  }

  return { ATTRIBUTE_KEYS, POSITION_PLAN, createInitialWorld, weightedOverall };
});
