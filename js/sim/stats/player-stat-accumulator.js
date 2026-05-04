// STAT-4..7: Player Stat Accumulator
// Spec: ai-pack/CFB_FM_STATS_ENGINE_PACK/02_STAT_TAXONOMY_AND_DEFINITIONS.md
//        §"Quarterback / Passer", §"Running Back / Rusher", §"Receiver / Tight End", §"Defensive Players"
//
// Walks PlayEvents that carry `players` participant ids and credits per-player
// stat lines: passing, rushing, receiving, defense (sacks/INTs). Designed to
// run incrementally — caller passes a season totals object that mutates in
// place, so we don't have to walk every event in the season per game.

(function initPlayerStatAccumulator(global) {
  function emptyPasserLine() {
    return { att: 0, comp: 0, yards: 0, td: 0, int: 0, sacks: 0, sack_yards: 0 };
  }
  function emptyRusherLine() {
    return { att: 0, yards: 0, td: 0, longest: 0 };
  }
  function emptyReceiverLine() {
    return { tgt: 0, rec: 0, yards: 0, td: 0, longest: 0 };
  }
  function emptyDefenderLine() {
    return { sacks: 0, ints: 0 };
  }

  function ensure(map, id, factory) {
    if (!map[id]) map[id] = factory();
    return map[id];
  }

  /**
   * Build per-player stat books for a single game.
   * @param {Array<PlayEvent>} events
   * @returns {object} { passers: {id: line}, rushers: {id: line}, receivers: {id: line}, defenders: {id: line} }
   */
  function buildGamePlayerBook(events) {
    const passers = {};
    const rushers = {};
    const receivers = {};
    const defenders = {};

    events.forEach((event) => {
      const players = event.players || {};
      const charged = event.chargedPlayType;
      const yards = Number.isFinite(event.yardsGained) ? event.yardsGained : 0;
      const isTd = !!event.scoring;

      if (charged === "rushing_attempt" || charged === "scramble_rush") {
        const id = players.rusher || (charged === "scramble_rush" ? players.qb : null);
        const name = players.rusherName || players.qbName;
        if (id) {
          const line = ensure(rushers, id, emptyRusherLine);
          line.att += 1;
          line.yards += yards;
          line.longest = Math.max(line.longest, yards);
          if (isTd) line.td += 1;
          if (name) line._name = name;
        }
      } else if (charged === "passing_attempt_complete" || charged === "passing_attempt_incomplete" || charged === "passing_attempt_interception") {
        const qbId = players.qb;
        if (qbId) {
          const line = ensure(passers, qbId, emptyPasserLine);
          line.att += 1;
          if (charged === "passing_attempt_complete") {
            line.comp += 1; line.yards += yards;
            if (isTd) line.td += 1;
          }
          if (charged === "passing_attempt_interception") {
            line.int += 1;
            if (players.intBy) {
              const def = ensure(defenders, players.intBy, emptyDefenderLine);
              def.ints += 1;
            }
          }
          if (players.qbName) line._name = players.qbName;
        }
        // Receiver credit
        if (charged === "passing_attempt_complete" && players.target) {
          const line = ensure(receivers, players.target, emptyReceiverLine);
          line.tgt += 1; line.rec += 1; line.yards += yards;
          line.longest = Math.max(line.longest, yards);
          if (isTd) line.td += 1;
          if (players.targetName) line._name = players.targetName;
        } else if (charged === "passing_attempt_incomplete" && players.target) {
          const line = ensure(receivers, players.target, emptyReceiverLine);
          line.tgt += 1;
          if (players.targetName) line._name = players.targetName;
        }
      } else if (charged === "sack_college_rushing_loss") {
        // QB takes the hit (sack yardage tracked on passer line per NCAA).
        const qbId = players.qb;
        if (qbId) {
          const line = ensure(passers, qbId, emptyPasserLine);
          line.sacks += 1;
          line.sack_yards += Math.abs(yards);
        }
        // Defender credit
        if (players.sackedBy) {
          const def = ensure(defenders, players.sackedBy, emptyDefenderLine);
          def.sacks += 1;
        }
      }
    });

    return { passers, rushers, receivers, defenders };
  }

  function accumulateInto(target, source, factory) {
    Object.entries(source).forEach(([id, line]) => {
      const dst = ensure(target, id, factory);
      Object.entries(line).forEach(([k, v]) => {
        if (k === "_name") { dst._name = v; return; }
        if (k === "longest") {
          if (typeof v === "number") dst.longest = Math.max(dst.longest || 0, v);
          return;
        }
        if (typeof v === "number") dst[k] = (dst[k] || 0) + v;
      });
    });
  }

  /**
   * Roll a game player book into a season player book in place.
   * @param {object} season  { passers: {}, rushers: {}, receivers: {}, defenders: {}, gamesIncluded: 0 }
   * @param {object} game    output of buildGamePlayerBook
   */
  function accumulateSeasonBook(season, game) {
    if (!season.passers) season.passers = {};
    if (!season.rushers) season.rushers = {};
    if (!season.receivers) season.receivers = {};
    if (!season.defenders) season.defenders = {};
    if (!Number.isFinite(season.gamesIncluded)) season.gamesIncluded = 0;
    accumulateInto(season.passers, game.passers, emptyPasserLine);
    accumulateInto(season.rushers, game.rushers, emptyRusherLine);
    accumulateInto(season.receivers, game.receivers, emptyReceiverLine);
    accumulateInto(season.defenders, game.defenders, emptyDefenderLine);
    season.gamesIncluded += 1;
  }

  /** Pass yards per attempt + completion percentage helpers. */
  function passingDerived(line) {
    const ypa = line.att > 0 ? line.yards / line.att : 0;
    const pct = line.att > 0 ? line.comp / line.att : 0;
    const rating = passerRating(line);
    return { ypa, pct, rating };
  }

  // NCAA passer rating per the standard formula:
  // ((8.4 * yards) + (330 * TD) + (100 * comp) - (200 * INT)) / att
  function passerRating(line) {
    if (line.att <= 0) return 0;
    return ((8.4 * line.yards) + (330 * line.td) + (100 * line.comp) - (200 * line.int)) / line.att;
  }

  function rushingDerived(line) {
    const ypc = line.att > 0 ? line.yards / line.att : 0;
    return { ypc };
  }
  function receivingDerived(line) {
    const ypr = line.rec > 0 ? line.yards / line.rec : 0;
    const catchPct = line.tgt > 0 ? line.rec / line.tgt : 0;
    return { ypr, catchPct };
  }

  function topByStat(book, statKey, limit) {
    const entries = Object.entries(book).map(([id, line]) => ({ id, line }));
    entries.sort((a, b) => (b.line[statKey] || 0) - (a.line[statKey] || 0));
    return entries.slice(0, limit || 5);
  }

  global.CGM_PLAYER_STAT_ACCUMULATOR = {
    emptyPasserLine,
    emptyRusherLine,
    emptyReceiverLine,
    emptyDefenderLine,
    buildGamePlayerBook,
    accumulateSeasonBook,
    passingDerived,
    rushingDerived,
    receivingDerived,
    passerRating,
    topByStat,
  };
})(window);
