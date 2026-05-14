import { useEffect, useMemo, useState } from "react";
import { compactNumber, feet, money, titleCase } from "../data/format";
import { getPlayerProfile, getProgramRoster, getRosterOverview, getStarterCountsByPosition, keyRatingsForPosition, positionOptions } from "../data/selectors";
import type { CareerState, ProgramSeedBundle, RosterPlayerRecord, RosterSortKey } from "../data/types";

const rosterColumns: Array<{ key: RosterSortKey; label: string }> = [
  { key: "rosterSlot", label: "#" },
  { key: "primaryPosition", label: "Pos" },
  { key: "classYear", label: "Yr" },
  { key: "nilValue", label: "NIL" },
  { key: "morale", label: "Morale" },
  { key: "overall", label: "OVR" },
  { key: "schemeFit", label: "Fit" },
];

const teamTabs = ["Overview", "Depth Chart", "Formation Subs", "NIL/Budget", "Health", "Staff"] as const;

type TeamTab = (typeof teamTabs)[number];

type RosterScreenProps = {
  bundle: ProgramSeedBundle;
  state: CareerState;
  onSelectPlayer: (personId: string, openProfile?: boolean) => void;
  onPositionFilter: (position: string) => void;
  onSort: (sortKey: RosterSortKey) => void;
  onToggleWatch: (player: RosterPlayerRecord) => void;
  onDevelopmentFocus: (player: RosterPlayerRecord, focus: string) => void;
};

const focusOptions = ["Technique", "Strength", "Explosiveness", "Coverage", "Ball Security", "Film Study"];

export function RosterScreen({ bundle, state, onSelectPlayer, onPositionFilter, onSort, onToggleWatch, onDevelopmentFocus }: RosterScreenProps) {
  const [activeTab, setActiveTab] = useState<TeamTab>("Overview");
  const roster = getProgramRoster(bundle, state);
  const selectedPlayer = getPlayerProfile(bundle, state.selectedPersonId) || roster[0];
  const [modelMissing, setModelMissing] = useState(false);
  const positions = positionOptions(bundle);
  const overview = getRosterOverview(bundle);
  const ratings = selectedPlayer ? keyRatingsForPosition(selectedPlayer) : [];
  const topTrait = selectedPlayer?.traits[0];
  const watchlisted = Boolean(selectedPlayer && state.watchlistPersonIds.includes(selectedPlayer.person.personId));
  const developmentFocus = selectedPlayer ? state.developmentFocusByPersonId[selectedPlayer.person.personId] || "Unset" : "Unset";
  const starterCounts = useMemo(() => getStarterCountsByPosition(bundle), [bundle]);
  const positionCounts = useMemo(() => {
    return ["QB", "RB", "WR", "TE", "OL", "DL", "EDGE", "LB", "CB", "S", "K", "P"]
      .filter((position) => overview.byPosition[position])
      .map((position) => [position, overview.byPosition[position]] as const);
  }, [overview.byPosition]);

  useEffect(() => {
    setModelMissing(false);
  }, [selectedPlayer?.person.personId]);

  return (
    <section className="team-room roster-command-screen">
      {selectedPlayer && (
        <aside className="roster-player-card">
          <div className="player-stage">
            <div className="stage-glow" />
            <div className="player-number">{selectedPlayer.athlete.jerseyNumber}</div>
            <div className="player-identity">
              <span>{selectedPlayer.athlete.primaryPosition} / {titleCase(selectedPlayer.athlete.depthChartRole)}</span>
              <strong>{selectedPlayer.person.firstName}<br />{selectedPlayer.person.lastName}</strong>
            </div>
            <div className="player-card-number">{selectedPlayer.athlete.jerseyNumber}</div>
            <div className="player-card-position">{selectedPlayer.athlete.primaryPosition}</div>
            {!modelMissing && (
              <img
                className="player-model-asset"
                src={`/assets/player-models/${selectedPlayer.person.personId}.png`}
                alt=""
                onError={() => setModelMissing(true)}
              />
            )}
          </div>

          <div className="player-card-grid">
            <div><span>Class</span><strong>{selectedPlayer.athlete.classYear}</strong></div>
            <div><span>HT / WT</span><strong>{feet(selectedPlayer.athlete.heightInches)} / {selectedPlayer.athlete.weightPounds}</strong></div>
            <div><span>Hometown</span><strong>{selectedPlayer.person.hometownCity}, {selectedPlayer.person.hometownState}</strong></div>
          </div>

          <div className="player-tags">
            {selectedPlayer.athlete.captainStatus && <span>Captain</span>}
            {topTrait && <span>{topTrait.traitName}</span>}
            <span>Morale {selectedPlayer.ratings.morale}</span>
          </div>

          <p className="player-summary">
            {selectedPlayer.person.displayName} is a {selectedPlayer.athlete.primaryPosition} with {selectedPlayer.ratings.overall} overall ability,
            {selectedPlayer.ratings.potentialAbility} potential, and a {selectedPlayer.athlete.schemeFit} scheme fit in the current system.
          </p>

          <div className="key-ratings-strip">
            {ratings.map(([label, value]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
                <i style={{ width: `${Math.max(8, Math.min(100, value))}%` }} />
              </div>
            ))}
          </div>

          <div className="player-card-widgets">
            <div>
              <span>Impact</span>
              <strong>{selectedPlayer.ratings.overall}</strong>
              <em>{selectedPlayer.athlete.depthChartRole}</em>
            </div>
            <div>
              <span>Development</span>
              <strong>{developmentFocus === "Unset" ? "No Focus" : developmentFocus}</strong>
              <select value={developmentFocus} onChange={(event) => onDevelopmentFocus(selectedPlayer, event.target.value)}>
                <option value="Unset">Unset</option>
                {focusOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <span>NIL Value</span>
              <strong>{money(selectedPlayer.nil?.estimatedNilValue || 0)}</strong>
              <em>{titleCase(selectedPlayer.nil?.nilStatus || "standard")}</em>
            </div>
            <div>
              <span>{bundle.selectedProgram.program.seasonYear} Form</span>
              <strong>{selectedPlayer.ratings.confidence}</strong>
              <em>Confidence</em>
            </div>
          </div>

          <div className="player-card-actions">
            <button type="button" onClick={() => onSelectPlayer(selectedPlayer.person.personId, true)}>View Player Card</button>
            <button type="button" onClick={() => onToggleWatch(selectedPlayer)}>{watchlisted ? "Remove Watch" : "Add Watch"}</button>
          </div>
        </aside>
      )}

      <div className="team-data-panel">
        <nav className="team-tabs" aria-label="Team room sections">
          {teamTabs.map((tab) => (
            <button key={tab} className={activeTab === tab ? "active" : ""} type="button" onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </nav>

        <section className="roster-overview-band">
          <div className="overview-title">
            <span>Roster Overview</span>
            <button type="button" onClick={() => setActiveTab("Depth Chart")}>Depth Chart</button>
          </div>
          <div className="overview-metrics">
            <Metric label="Team OVR" value={overview.teamOverall} note="Whole roster" />
            <Metric label="Offense" value={overview.offenseOverall} note="OVR" />
            <Metric label="Defense" value={overview.defenseOverall} note="OVR" />
            <Metric label="Special Teams" value={overview.specialTeamsOverall} note="OVR" />
            <Metric label="Roster Size" value={`${overview.rosterSize}/${overview.rosterLimit}`} note="Players" />
            <Metric label="Scholarships" value={`${overview.scholarshipCount}/${overview.scholarshipLimit}`} note="Funded" />
            <Metric label="NIL Valuation" value={money(overview.totalNil)} note="Roster" />
          </div>
          <div className="overview-breakdowns">
            <Breakdown title="Class Breakdown" values={overview.byClass} order={["FR", "RS FR", "SO", "RS SO", "JR", "RS JR", "SR", "RS SR"]} />
            <div className="breakdown-card">
              <span>Position Breakdown</span>
              <div className="breakdown-values compact">
                {positionCounts.map(([position, count]) => <strong key={position}>{position}<em>{count}</em></strong>)}
              </div>
            </div>
            <div className="health-snapshot">
              <span>Health Snapshot</span>
              <strong>{overview.teamHealth}%</strong>
              <em>{overview.injured} elevated-risk players</em>
            </div>
          </div>
        </section>

        <section className="context-band">
          <h2>{activeTab}</h2>
          <ContextContent tab={activeTab} bundle={bundle} overview={overview} starterCounts={starterCounts} />
        </section>

        <section className="roster-list-panel">
          <div className="position-bar compact-filter">
            {positions.map((position) => (
              <button key={position} className={state.positionFilter === position ? "active" : ""} type="button" onClick={() => onPositionFilter(position)}>
                {position}
              </button>
            ))}
          </div>
          <div className="table-wrap roster-list-wrap">
            <table className="roster-table roster-command-table">
              <thead>
                <tr>
                  {rosterColumns.map((column) => (
                    <th key={column.key}>
                      <button type="button" onClick={() => onSort(column.key)}>
                        {column.label}{state.sortKey === column.key ? (state.sortDirection === "asc" ? " ^" : " v") : ""}
                      </button>
                    </th>
                  ))}
                  <th>Player</th>
                  <th>Archetype</th>
                  <th>SPD</th>
                  <th>STR</th>
                  <th>FBIQ</th>
                  <th>Hometown</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((player) => (
                  <tr
                    key={player.person.personId}
                    className={player.person.personId === state.selectedPersonId ? "selected" : ""}
                    onClick={() => onSelectPlayer(player.person.personId)}
                    onDoubleClick={() => onSelectPlayer(player.person.personId, true)}
                  >
                    <td>{player.athlete.jerseyNumber}</td>
                    <td>{player.athlete.primaryPosition}</td>
                    <td>{player.athlete.classYear}</td>
                    <td>{money(player.nil?.estimatedNilValue || 0)}</td>
                    <td>{player.ratings.morale}</td>
                    <td className="num">{player.ratings.overall}</td>
                    <td>{player.athlete.schemeFit}</td>
                    <td>
                      <strong>{player.person.displayName}</strong>
                      <small>{player.athlete.depthChartRole}</small>
                    </td>
                    <td>{player.traits[0]?.traitName || titleCase(player.athlete.playingTimeExpectation)}</td>
                    <td>{player.ratings.speed}</td>
                    <td>{player.ratings.strength}</td>
                    <td>{player.ratings.footballIQ}</td>
                    <td>{player.person.hometownCity}, {player.person.hometownState}</td>
                    <td>{statusText(player, state.watchlistPersonIds.includes(player.person.personId))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <footer className="roster-legend">
            <span>{roster.length} rostered</span>
            <span>{state.watchlistPersonIds.length} watched</span>
            <span>{state.positionFilter === "ALL" ? "All positions" : state.positionFilter}</span>
          </footer>
        </section>
      </div>
    </section>
  );
}

function Metric({ label, value, note }: { label: string; value: string | number; note: string }) {
  return (
    <div className="overview-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <em>{note}</em>
    </div>
  );
}

function Breakdown({ title, values, order }: { title: string; values: Record<string, number>; order: string[] }) {
  return (
    <div className="breakdown-card">
      <span>{title}</span>
      <div className="breakdown-values">
        {order.filter((key) => values[key]).map((key) => <strong key={key}>{key}<em>{values[key]}</em></strong>)}
      </div>
    </div>
  );
}

function ContextContent({ tab, bundle, overview, starterCounts }: { tab: TeamTab; bundle: ProgramSeedBundle; overview: ReturnType<typeof getRosterOverview>; starterCounts: Record<string, number> }) {
  const headCoach = bundle.selectedProgram.staff.find((staff) => staff.assignment?.roleId === "head_coach");
  const offensiveCoordinator = bundle.selectedProgram.staff.find((staff) => staff.assignment?.roleId === "offensive_coordinator");
  const defensiveCoordinator = bundle.selectedProgram.staff.find((staff) => staff.assignment?.roleId === "defensive_coordinator");
  if (tab === "NIL/Budget") {
    return (
      <div className="context-grid">
        <Metric label="Collective" value={bundle.selectedProgram.nil.collectiveName} note="Active" />
        <Metric label="Available" value={money(bundle.selectedProgram.nil.nilAvailable)} note="Budget" />
        <Metric label="Monthly Income" value={money(bundle.selectedProgram.nil.monthlyIncome)} note="Projected" />
        <Metric label="Followers" value={compactNumber(bundle.selectedProgram.nil.socialFollowing)} note="Reach" />
      </div>
    );
  }
  if (tab === "Health") {
    return (
      <div className="context-grid">
        <Metric label="Team Health" value={`${overview.teamHealth}%`} note="Availability" />
        <Metric label="Elevated Risk" value={overview.injured} note="Injury resistance" />
        <Metric label="High Stamina" value={bundle.selectedProgram.roster.filter((player) => player.ratings.stamina >= 80).length} note="80+" />
        <Metric label="Low Stamina" value={bundle.selectedProgram.roster.filter((player) => player.ratings.stamina < 60).length} note="Under 60" />
      </div>
    );
  }
  if (tab === "Staff") {
    return (
      <div className="context-grid">
        <Metric label="Head Coach" value={headCoach?.person?.displayName || "Open"} note={headCoach?.coach ? `${headCoach.coach.reputation} rep` : "Staff"} />
        <Metric label="Offense" value={offensiveCoordinator?.person?.displayName || bundle.selectedProgram.program.offensiveScheme} note={bundle.selectedProgram.program.offensiveScheme} />
        <Metric label="Defense" value={defensiveCoordinator?.person?.displayName || bundle.selectedProgram.program.defensiveScheme} note={bundle.selectedProgram.program.defensiveScheme} />
        <Metric label="Coach Trust" value={bundle.selectedProgram.program.coachTrust} note="Program" />
      </div>
    );
  }
  if (tab === "Depth Chart" || tab === "Formation Subs") {
    return (
      <div className="context-grid">
        <Metric label="QB Starters" value={starterCounts.QB || 0} note="Roster roles" />
        <Metric label="Skill Starters" value={(starterCounts.RB || 0) + (starterCounts.WR || 0) + (starterCounts.TE || 0)} note="RB/WR/TE" />
        <Metric label="Front Seven" value={(starterCounts.DL || 0) + (starterCounts.EDGE || 0) + (starterCounts.LB || 0)} note="DL/EDGE/LB" />
        <Metric label="Secondary" value={(starterCounts.CB || 0) + (starterCounts.S || 0)} note="CB/S" />
      </div>
    );
  }
  return (
    <div className="context-grid">
      <Metric label="Position Grades" value={`${overview.offenseOverall}/${overview.defenseOverall}`} note="Off / Def" />
      <Metric label="Class Balance" value={`${overview.byClass.FR || 0} FR / ${overview.byClass.SR || 0} SR`} note="Roster" />
      <Metric label="Facilities" value={bundle.selectedProgram.program.facilitiesGrade} note="Grade" />
      <Metric label="Academics" value={bundle.selectedProgram.program.academicGrade} note="Grade" />
    </div>
  );
}

function statusText(player: RosterPlayerRecord, watched: boolean): string {
  if (player.ratings.injuryResistance < 50) return "Risk";
  if (watched) return "Watch";
  if (player.athlete.captainStatus) return "Captain";
  return titleCase(player.athlete.transferStatus);
}
