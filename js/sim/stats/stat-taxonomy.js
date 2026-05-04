// STAT-1: Stat Taxonomy Registry
// Spec: ai-pack/CFB_FM_STATS_ENGINE_PACK/02_STAT_TAXONOMY_AND_DEFINITIONS.md
// Contract: ai-pack/CFB_FM_STATS_ENGINE_PACK/10_TYPESCRIPT_CONTRACTS_REFERENCE.md
//
// Minimal but real subset of the spec's full official-style stat list — enough
// to populate per-team and per-season Stats screens today, and structured so
// the full set can be added incrementally without changing consumers.
//
// Each StatDefinition mirrors the spec's TypeScript contract:
//   { id, displayName, owner, category, classification, sourceEvents,
//     aggregation, displayFormat, description, validationNotes? }

(function initStatTaxonomy(global) {
  function defineStat(id, displayName, owner, category, classification, sourceEvents, aggregation, displayFormat, description, validationNotes) {
    return {
      id, displayName, owner, category, classification,
      sourceEvents, aggregation, displayFormat, description,
      validationNotes: validationNotes || [],
    };
  }

  // Source-event tokens reference STAT-2 PlayEvent.chargedPlayType + result.outcome.
  const STATS = [
    // ── Scoring (team) ────────────────────────────────────────────────────
    defineStat("points",                  "Points",                   "team", "scoring", "official_style", ["scoring.score"], "sum",        "points",  "Total points scored in the scope (game, season, etc.)."),
    defineStat("touchdowns",              "Total TDs",                "team", "scoring", "official_style", ["scoring.touchdown"], "sum",    "integer", "Touchdowns scored across all phases."),
    defineStat("passing_touchdowns",      "Passing TDs",              "team", "scoring", "official_style", ["passing_attempt_complete:touchdown"], "sum", "integer", "Touchdowns scored on passing plays."),
    defineStat("rushing_touchdowns",      "Rushing TDs",              "team", "scoring", "official_style", ["rushing_attempt:touchdown"], "sum", "integer", "Touchdowns scored on rushing plays."),
    defineStat("field_goals_made",        "FGs Made",                 "team", "scoring", "official_style", ["field_goal_attempt:score"], "sum", "integer", "Field goals successfully kicked."),

    // ── Total Offense (team) ──────────────────────────────────────────────
    defineStat("total_yards",             "Total Yards",              "team", "offense", "official_style", ["passing_attempt_complete","rushing_attempt","scramble_rush"], "sum",        "yards",     "All offensive yards gained."),
    defineStat("total_plays",             "Total Plays",              "team", "offense", "official_style", ["rushing_attempt","passing_attempt_complete","passing_attempt_incomplete","passing_attempt_interception","sack_college_rushing_loss","scramble_rush"], "sum", "integer", "Total offensive plays."),
    defineStat("yards_per_play",          "Yards/Play",               "team", "offense", "derived",        ["total_yards","total_plays"], "derived",   "decimal_1", "Yards gained divided by plays."),
    defineStat("turnovers",               "Turnovers",                "team", "offense", "official_style", ["passing_attempt_interception","fumble_return","interception_return"], "sum", "integer", "Possessions ending in interception or fumble lost."),

    // ── Passing (team) ────────────────────────────────────────────────────
    defineStat("team_pass_attempts",      "Pass Attempts",            "team", "passing", "official_style", ["passing_attempt_complete","passing_attempt_incomplete","passing_attempt_interception"], "sum", "integer", "All pass attempts (completions + incompletions + interceptions)."),
    defineStat("team_pass_completions",   "Completions",              "team", "passing", "official_style", ["passing_attempt_complete"], "sum", "integer", "Successfully completed passes."),
    defineStat("team_completion_pct",     "Completion %",             "team", "passing", "derived",        ["team_pass_completions","team_pass_attempts"], "derived", "percentage", "Completions divided by attempts."),
    defineStat("team_passing_yards",      "Passing Yards",            "team", "passing", "official_style", ["passing_attempt_complete"], "sum", "yards", "Net passing yards (gross minus sack yards in NCAA rule)."),
    defineStat("team_interceptions_thrown","Interceptions",           "team", "passing", "official_style", ["passing_attempt_interception"], "sum", "integer", "Passes intercepted by defense."),

    // ── Rushing (team) ────────────────────────────────────────────────────
    defineStat("team_rush_attempts",      "Rush Attempts",            "team", "rushing", "official_style", ["rushing_attempt","scramble_rush","sack_college_rushing_loss"], "sum", "integer", "All rushing attempts (NCAA includes sacks as rushing losses)."),
    defineStat("team_rushing_yards",      "Rushing Yards",            "team", "rushing", "official_style", ["rushing_attempt","scramble_rush","sack_college_rushing_loss"], "sum", "yards", "Net rushing yards (NCAA rule: includes sack yardage as rushing loss).",
      ["NCAA charges sack yardage to rushing, not passing — use chargedPlayType to route."]),
    defineStat("team_yards_per_rush",     "Yards/Carry",              "team", "rushing", "derived",        ["team_rushing_yards","team_rush_attempts"], "derived", "decimal_1", "Rushing yards per attempt."),

    // ── Drives ────────────────────────────────────────────────────────────
    defineStat("drives",                  "Drives",                   "team", "drives",  "official_style", ["drive_summary"], "sum", "integer", "Possessions in scope."),
    defineStat("points_per_drive",        "Points/Drive",             "team", "drives",  "derived",        ["points","drives"], "derived", "decimal_1", "Points scored divided by drives."),

    // ── Defense (team) ────────────────────────────────────────────────────
    defineStat("points_allowed",          "Points Allowed",           "team", "defense", "official_style", ["scoring.score:opponent"], "sum", "points", "Points scored by opponent."),
    defineStat("yards_allowed",           "Yards Allowed",            "team", "defense", "official_style", ["passing_attempt_complete:opponent","rushing_attempt:opponent","scramble_rush:opponent"], "sum", "yards", "Total yards allowed."),
    defineStat("turnovers_forced",        "Takeaways",                "team", "defense", "official_style", ["passing_attempt_interception:opponent","fumble_return:opponent"], "sum", "integer", "Defensive takeaways."),
    defineStat("sacks",                   "Sacks",                    "team", "defense", "official_style", ["sack_college_rushing_loss:opponent"], "sum", "integer", "Quarterback sacks recorded by defense."),

    // ── Penalties (team) — Wave-12 ────────────────────────────────────────
    defineStat("penalties_count",         "Penalties",                "team", "discipline", "official_style", ["penalty_no_play"], "sum", "integer", "Number of penalties accepted against this team."),
    defineStat("penalty_yards",           "Penalty Yards",            "team", "discipline", "official_style", ["penalty_no_play"], "sum", "yards", "Yardage assessed against this team via penalties."),
  ];

  // Index for fast lookup.
  const STATS_BY_ID = {};
  STATS.forEach((s) => { STATS_BY_ID[s.id] = s; });

  function getStat(id) {
    return STATS_BY_ID[id] || null;
  }

  function statsByCategory(category) {
    return STATS.filter((s) => s.category === category);
  }

  function statsByOwner(owner) {
    return STATS.filter((s) => s.owner === owner);
  }

  /** Format a stat value for display per its displayFormat. */
  function formatStatValue(stat, value) {
    if (value === null || value === undefined || Number.isNaN(value)) return "—";
    if (stat.displayFormat === "percentage") return `${Math.round(value * 1000) / 10}%`;
    if (stat.displayFormat === "decimal_1") return Number(value).toFixed(1);
    if (stat.displayFormat === "yards") return `${Math.round(value)} yds`;
    if (stat.displayFormat === "points") return String(Math.round(value));
    if (stat.displayFormat === "integer") return String(Math.round(value));
    return String(value);
  }

  global.CGM_STAT_TAXONOMY = {
    STATS,
    STATS_BY_ID,
    getStat,
    statsByCategory,
    statsByOwner,
    formatStatValue,
    defineStat,
  };
})(window);
