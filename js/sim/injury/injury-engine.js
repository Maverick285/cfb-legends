// INJURY-1: Per-game + per-week injury engine
// Spec: implied by all the existing UI hooks (injuryCadencePercent setting,
// "Injury cadence" rule display, eligibility tracking) but never built.
//
// First slice:
//   - Per-play injury roll (very low rate, contextual to play kind)
//   - Per-week recovery tick (decrement weeksOut, mark recovered)
//   - Severity bands map to weeksOut ranges
//   - Pure functions; caller mutates roster + emits events.
//
// All probabilities scaled by an external `cadencePercent` (100 = baseline).
// Spec ranges from existing tunables: 70-160%.

(function initInjuryEngine(global) {
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function rng(r, lo, hi) { return lo + r() * (hi - lo); }

  const SEVERITY_BANDS = {
    nick:    { weeksOutMin: 0, weeksOutMax: 1, label: "Day-to-day" },
    minor:   { weeksOutMin: 1, weeksOutMax: 2, label: "Probable" },
    moderate:{ weeksOutMin: 2, weeksOutMax: 4, label: "Doubtful" },
    severe:  { weeksOutMin: 4, weeksOutMax: 8, label: "Out indefinitely" },
    seasonEnding: { weeksOutMin: 12, weeksOutMax: 14, label: "Season-ending" },
  };

  // Position injury propensity multipliers — RB/QB/EDGE see more contact.
  const POSITION_MULT = {
    QB: 1.05, HB: 1.35, FB: 1.20, WR: 0.95, TE: 1.10,
    LT: 0.90, OT: 0.90, OG: 0.90, C: 0.90,
    DE: 1.20, EDGE: 1.20, DT: 1.10, LB: 1.20,
    CB: 1.05, S: 1.10, DB: 1.05,
    K: 0.40, P: 0.40,
  };

  // Per-play base rate (very small — most plays produce no injury).
  const BASE_PER_PLAY = 0.0007; // ~0.07% × 130 plays = ~9% chance per game
  // Severity weights (sum = 1.0). Most injuries are nicks; season-ending is rare.
  const SEVERITY_WEIGHTS = [
    ["nick",         0.45],
    ["minor",        0.30],
    ["moderate",     0.15],
    ["severe",       0.07],
    ["seasonEnding", 0.03],
  ];

  function pickSeverity(random) {
    const r = random();
    let acc = 0;
    for (const [name, w] of SEVERITY_WEIGHTS) {
      acc += w;
      if (r <= acc) return name;
    }
    return "nick";
  }

  function weeksOutForSeverity(severity, random) {
    const band = SEVERITY_BANDS[severity] || SEVERITY_BANDS.nick;
    return Math.round(rng(random, band.weeksOutMin, band.weeksOutMax));
  }

  /**
   * Roll for an injury given a single play context.
   * @param {object} args
   *   - player: { id, position, attrs?: { stamina, bravery } }
   *   - playKind: "rush" | "pass" | "sack" | "kickoff_return" | "punt_return" | other
   *   - cadencePercent: 70-160 (default 100)
   *   - random
   * @returns {object|null} { playerId, severity, weeksOut, type, reasonCodes }
   */
  function rollInjuryOnPlay(args) {
    const random = args.random || Math.random;
    const cadence = clamp(Number(args.cadencePercent) || 100, 30, 200) / 100;
    const player = args.player || {};
    if (!player.id) return null;

    let rate = BASE_PER_PLAY * cadence;
    const posMult = POSITION_MULT[player.position] || 1.0;
    rate *= posMult;
    // High-contact play kinds bump rate.
    if (args.playKind === "sack") rate *= 2.4;
    else if (args.playKind === "rush") rate *= 1.6;
    else if (args.playKind === "kickoff_return" || args.playKind === "punt_return") rate *= 1.8;
    else if (args.playKind === "pass") rate *= 0.7;
    // Stamina + bravery shave a little risk for tougher players.
    const stamina = (player.attrs && player.attrs.stamina) || 12;
    const bravery = (player.attrs && player.attrs.bravery) || 12;
    rate *= 1 - clamp(((stamina + bravery) / 2 - 12) / 30, -0.2, 0.2);

    if (random() > rate) return null;

    const severity = pickSeverity(random);
    const weeksOut = weeksOutForSeverity(severity, random);
    const type = injuryTypeForPosition(player.position, severity, random);
    return {
      playerId: player.id,
      playerName: player.name,
      position: player.position,
      severity,
      weeksOut,
      type,
      reasonCodes: ["injury_occurred", `severity_${severity}`, `pos_${player.position}`, args.playKind ? `play_${args.playKind}` : ""].filter(Boolean),
    };
  }

  function injuryTypeForPosition(position, severity, random) {
    const types = position === "QB" ? ["shoulder", "ankle", "ribs", "concussion", "knee"]
                : (position === "HB" || position === "FB") ? ["knee", "ankle", "hamstring", "shoulder", "concussion"]
                : (position === "WR" || position === "TE") ? ["hamstring", "ankle", "knee", "concussion", "ribs"]
                : (position && position.startsWith("O")) || position === "C" ? ["ankle", "knee", "back", "shoulder"]
                : (position === "EDGE" || position === "DE" || position === "DT") ? ["knee", "shoulder", "ankle", "back"]
                : (position === "LB") ? ["knee", "shoulder", "concussion", "ankle"]
                : (position === "CB" || position === "S" || position === "DB") ? ["hamstring", "ankle", "concussion", "knee"]
                : ["ankle", "knee"];
    if (severity === "seasonEnding") return random() < 0.6 ? "ACL tear" : "Achilles rupture";
    return types[Math.floor(random() * types.length)];
  }

  /**
   * Apply an injury to a roster entry. Mutates the player by setting
   * `injured: true`, `injuryWeeksOut: N`, `injuryType: ...`.
   */
  function applyInjury(player, injury) {
    if (!player || !injury) return false;
    player.injured = true;
    player.injuryWeeksOut = Number(injury.weeksOut) || 0;
    player.injuryType = injury.type || "unknown";
    player.injurySeverity = injury.severity;
    return true;
  }

  /**
   * Weekly recovery tick. Decrements every injured player's weeksOut.
   * @returns {object} { recovered: [playerIds], stillOut: [playerIds] }
   */
  function tickInjuryRecovery(roster) {
    const recovered = [];
    const stillOut = [];
    (roster || []).forEach((p) => {
      if (!p.injured) return;
      const w = (p.injuryWeeksOut || 0) - 1;
      if (w <= 0) {
        p.injured = false;
        p.injuryWeeksOut = 0;
        recovered.push(p.id);
      } else {
        p.injuryWeeksOut = w;
        stillOut.push(p.id);
      }
    });
    return { recovered, stillOut };
  }

  /**
   * Roll a per-game injury pass across both rosters' actively-played snaps.
   * Caller passes the final play-event log; we sample the participants and
   * roll injury chances on the high-contact plays.
   *
   * @param {object} args { events, roster, cadencePercent, random }
   * @returns {array} list of injuries that fired
   */
  function rollGameInjuries(args) {
    const events = args.events || [];
    const roster = args.roster || [];
    const random = args.random || Math.random;
    const cadence = args.cadencePercent || 100;
    const byId = {};
    roster.forEach((p) => { byId[p.id] = p; });
    const fired = [];
    events.forEach((e) => {
      const partIds = e.players ? Object.values(e.players).filter((v) => typeof v === "string") : [];
      partIds.forEach((pid) => {
        const player = byId[pid];
        if (!player) return;
        if (player.injured) return; // already out
        const injury = rollInjuryOnPlay({
          player, playKind: e.playType, cadencePercent: cadence, random,
        });
        if (injury) fired.push(injury);
      });
    });
    return fired;
  }

  global.CGM_INJURY = {
    SEVERITY_BANDS,
    POSITION_MULT,
    BASE_PER_PLAY,
    rollInjuryOnPlay,
    applyInjury,
    tickInjuryRecovery,
    rollGameInjuries,
    pickSeverity,
    weeksOutForSeverity,
  };
})(window);
