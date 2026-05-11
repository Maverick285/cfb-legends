// HARNESS-2: Procedural seeded roster builder.
// Builds a 65-player roster with 36-key 1-20 attrs at a target talent level.
// Deterministic given (seed, teamId, talent).

function mulberry32(a) {
  return function next() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const ATTR_KEYS = [
  "throwing","decisions","anticipation","composure","concentration","technique","vision",
  "ballCarrying","catching","routeRunning","firstTouch","passBlocking","runBlocking",
  "passRush","tackling","coverage","strength","positioning","determination","aggression",
  "pace","acceleration","agility","balance","jumping","stamina","bravery","flair",
  "leadership","workRate","kicking","punting","offTheBall","handling","reflexes",
];

const POSITION_PLAN = [
  ["QB", 3], ["HB", 4], ["WR", 7], ["TE", 3],
  ["LT", 2], ["OT", 2], ["OG", 4], ["C", 2],
  ["EDGE", 3], ["DE", 3], ["DT", 4],
  ["LB", 6], ["CB", 5], ["S", 4], ["DB", 2],
  ["K", 1], ["P", 1],
];

function buildRoster({ seed, teamId, talent = 75 }) {
  const r = mulberry32(hashStr(`${seed}|${teamId}`));
  const players = [];
  let id = 0;
  for (const [pos, n] of POSITION_PLAN) {
    for (let i = 0; i < n; i++) {
      const ovrJitter = Math.round((r() - 0.5) * 14);
      const ovr = Math.max(40, Math.min(99, talent + ovrJitter - i * 2));
      const attrs = {};
      for (const k of ATTR_KEYS) {
        const base = 1 + ((ovr - 40) / 59) * 19;
        const v = Math.max(1, Math.min(20, Math.round(base + (r() - 0.5) * 4)));
        attrs[k] = v;
      }
      players.push({
        id: `${teamId}-p${++id}`,
        name: `${pos} #${id}`,
        position: pos,
        ovr,
        year: ["FR","SO","JR","SR"][Math.floor(r() * 4)],
        attrs,
      });
    }
  }
  return players;
}

module.exports = { buildRoster, mulberry32, hashStr };
