// PULSE-1: Campus Pulse + Program Temperature
// Spec: ai-pack/CFB_FM_UI_NARRATIVE_VIBE_PACK/05_CAMPUS_PULSE_AND_PROGRAM_TEMPERATURE_SYSTEM.md
//
// 8 PulseComponents that read recent EventLog entries (PERSIST-1) and produce
// human-readable temperature labels with reasonCodes. Pure function: takes
// the event log + program context, returns a snapshot the UI renders.
//
// Component design per spec §"PulseComponent":
//   { id, label, score (0-100), trend, summary, reasonCodes, recentDrivers }

(function initCampusPulse(global) {
  const COMPONENT_DEFS = [
    { id: "fanMood",            label: "Fan Mood",             baseline: 60 },
    { id: "studentEnergy",      label: "Student Energy",       baseline: 65 },
    { id: "boosterTemperature", label: "Booster Temperature",  baseline: 55 },
    { id: "localMediaTone",     label: "Local Media Tone",     baseline: 55 },
    { id: "lockerRoomTone",     label: "Locker Room Tone",     baseline: 60 },
    { id: "recruitBuzz",        label: "Recruit Buzz",         baseline: 55 },
    { id: "nationalPerception", label: "National Perception",  baseline: 50 },
    { id: "campusTownMood",     label: "Campus Town Mood",     baseline: 60 },
  ];

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  // Score → label per spec.
  function labelForScore(s) {
    if (s >= 88) return "Euphoric";
    if (s >= 75) return "Hopeful";
    if (s >= 60) return "Steady";
    if (s >= 45) return "Restless";
    if (s >= 28) return "Angry";
    return "Checked Out";
  }

  // Reason-code → component score-deltas table. This is the spec's central
  // wiring: which world events move which component.
  // Returns: { componentId: delta }
  const REASON_CODE_IMPACTS = {
    // Game results
    result_win:               { fanMood: +6, studentEnergy: +5, lockerRoomTone: +4, nationalPerception: +1, boosterTemperature: +2, campusTownMood: +5, localMediaTone: +3 },
    result_loss:              { fanMood: -7, studentEnergy: -5, lockerRoomTone: -4, nationalPerception: -1, boosterTemperature: -3, campusTownMood: -4, localMediaTone: -3 },
    rivalry_game:             { fanMood: +2, studentEnergy: +3, campusTownMood: +3, localMediaTone: +2 },
    blowout:                  { fanMood: +3, boosterTemperature: +3, nationalPerception: +2 },
    close_game:               { fanMood: +1, lockerRoomTone: +1 },
    decisive:                 {},
    world_tick:               {},
    // Recruiting
    commit_resolved:          { recruitBuzz: +12, fanMood: +4, boosterTemperature: +5, localMediaTone: +3, nationalPerception: +2 },
    interest_playing_time:    { recruitBuzz: +1 },
    interest_prestige:        { recruitBuzz: +1, nationalPerception: +1 },
    interest_nil:             { recruitBuzz: +1, boosterTemperature: +1 },
    interest_coach:           { recruitBuzz: +1 },
    visit_bump:               { recruitBuzz: +3 },
    promise_made:             { recruitBuzz: +2, lockerRoomTone: +1 },
    promise_broken:           { recruitBuzz: -4, lockerRoomTone: -3, fanMood: -2 },
    nil_collective_swing:     { boosterTemperature: +4, recruitBuzz: +2 },
    // Development
    dev_breakout:             { fanMood: +3, lockerRoomTone: +2, recruitBuzz: +1, localMediaTone: +2 },
    dev_late_career_decline:  { lockerRoomTone: -1, fanMood: -1 },
    dev_offseason_breakout:   { fanMood: +2, recruitBuzz: +2 },
    // Calendar / season
    new_career:               { fanMood: +2, boosterTemperature: +2, recruitBuzz: +1, nationalPerception: +1 },
    year_rollover:            { fanMood: +1, lockerRoomTone: +1 },
    weekly_continue:          {},
  };

  /**
   * Compute a single PulseComponent score from recent events.
   * Newer events have more weight; events older than `lookbackWeeks` are dropped.
   */
  function computeComponentScore(componentId, events, baseline, options) {
    const opts = options || {};
    const lookback = opts.lookbackWeeks || 4;
    let score = baseline;
    const weeksAgoNow = opts.currentWeek != null ? opts.currentWeek : 999;
    const drivers = [];
    events.forEach((evt) => {
      // weight by recency (most recent ~1.0, older down to ~0.3)
      const evtWeek = (evt.data && evt.data.weekIndex) || (evt.season ? evtNumericWeek(evt) : weeksAgoNow);
      const weeksAgo = Math.max(0, weeksAgoNow - evtWeek);
      if (weeksAgo > lookback) return;
      const recency = clamp(1.0 - (weeksAgo / (lookback + 1)) * 0.6, 0.4, 1.0);
      (evt.reasonCodes || []).forEach((code) => {
        const impact = REASON_CODE_IMPACTS[code];
        if (!impact) return;
        const delta = impact[componentId];
        if (!delta) return;
        const adjusted = delta * recency;
        score += adjusted;
        if (Math.abs(adjusted) >= 1.5) {
          drivers.push({ code, delta: Math.round(adjusted * 10) / 10, summary: evt.summary });
        }
      });
    });
    return { score: clamp(Math.round(score), 1, 99), drivers: drivers.slice(-4) };
  }

  function evtNumericWeek(evt) {
    if (!evt.week) return 0;
    const m = String(evt.week).match(/(\d+)/);
    return m ? Number(m[1]) : 0;
  }

  function trendForScore(prevScore, currScore) {
    const delta = currScore - prevScore;
    if (delta >= 4) return "↑";
    if (delta <= -4) return "↓";
    return "—";
  }

  /**
   * Compute the full Campus Pulse snapshot.
   * @param {object} eventLog  CGM_EVENT_LOG instance
   * @param {object} options
   *   - prevSnapshot: previous snapshot (for trend arrows)
   *   - currentWeek: numeric week index
   *   - lookbackWeeks: default 4
   * @returns {object} { components: [...], temperature: { score, label }, ... }
   */
  function computePulseSnapshot(eventLog, options) {
    const opts = options || {};
    const events = (eventLog && Array.isArray(eventLog.events)) ? eventLog.events.slice(-200) : [];
    const prev = opts.prevSnapshot || {};
    const components = COMPONENT_DEFS.map((def) => {
      const result = computeComponentScore(def.id, events, def.baseline, opts);
      const prevScore = (prev.components || []).find((c) => c.id === def.id);
      return {
        id: def.id,
        label: def.label,
        score: result.score,
        labelText: labelForScore(result.score),
        trend: prevScore ? trendForScore(prevScore.score, result.score) : "—",
        recentDrivers: result.drivers,
        reasonCodes: result.drivers.map((d) => d.code),
      };
    });
    const tempScore = Math.round(components.reduce((s, c) => s + c.score, 0) / components.length);
    const temperature = {
      score: tempScore,
      label: labelForScore(tempScore),
    };
    return {
      components,
      temperature,
      computedAt: opts.currentWeek != null ? opts.currentWeek : null,
    };
  }

  global.CGM_CAMPUS_PULSE = {
    COMPONENT_DEFS,
    REASON_CODE_IMPACTS,
    labelForScore,
    computeComponentScore,
    computePulseSnapshot,
  };
})(window);
