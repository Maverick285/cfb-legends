import { useMemo, useState } from "react";
import { compactNumber, money } from "../data/format";
import { getPlayerProfile, getProgramRoster, getRosterOverview, getStarterCountsByPosition, keyRatingsForPosition, positionOptions } from "../data/selectors";
import type { CareerState, ProgramSeedBundle, RosterPlayerRecord, RosterSortKey } from "../data/types";
import { PlayerFeaturePanel } from "../components/player/PlayerFeaturePanel";
import { ContextPanel } from "../components/team-room/ContextPanel";
import type { BreakdownItem, MetricItem } from "../components/team-room/MetricStrip";
import { RosterOverviewPanel } from "../components/team-room/RosterOverviewPanel";
import { RosterTable } from "../components/team-room/RosterTable";
import { TeamRoomLayout } from "../components/team-room/TeamRoomLayout";
import { TeamTabs, type TeamRoomTab } from "../components/team-room/TeamTabs";

type RosterScreenProps = {
  bundle: ProgramSeedBundle;
  state: CareerState;
  onSelectPlayer: (personId: string, openProfile?: boolean) => void;
  onPositionFilter: (position: string) => void;
  onSort: (sortKey: RosterSortKey) => void;
  onDevelopmentFocus: (player: RosterPlayerRecord, focus: string) => void;
};

const focusOptions = ["Technique", "Strength", "Explosiveness", "Coverage", "Ball Security", "Film Study"];
const positionSummaryOrder = ["QB", "RB", "WR", "TE", "OL", "DL", "EDGE", "LB", "CB", "S", "K", "P"];

export function RosterScreen({ bundle, state, onSelectPlayer, onPositionFilter, onSort, onDevelopmentFocus }: RosterScreenProps) {
  const [activeTab, setActiveTab] = useState<TeamRoomTab>("Overview");
  const roster = getProgramRoster(bundle, state);
  const selectedPlayer = getPlayerProfile(bundle, state.selectedPersonId) || roster[0];
  const positions = positionOptions(bundle);
  const overview = getRosterOverview(bundle);
  const starterCounts = useMemo(() => getStarterCountsByPosition(bundle), [bundle]);
  const positionCounts = useMemo<BreakdownItem[]>(() => {
    return positionSummaryOrder
      .filter((position) => overview.byPosition[position])
      .map((position) => ({ label: position, value: overview.byPosition[position] }));
  }, [overview.byPosition]);
  const contextMetrics = buildContextMetrics(activeTab, bundle, overview, starterCounts);

  const dataPanel = (
    <div className="team-data-panel">
      <TeamTabs activeTab={activeTab} onTab={setActiveTab} />
      <RosterOverviewPanel overview={overview} positionCounts={positionCounts} onDepthChart={() => setActiveTab("Depth Chart")} />
      <ContextPanel title={activeTab} metrics={contextMetrics} />
      <section className="roster-list-panel">
        <div className="position-bar compact-filter">
          {positions.map((position) => (
            <button key={position} className={state.positionFilter === position ? "active" : ""} type="button" onClick={() => onPositionFilter(position)}>
              {position}
            </button>
          ))}
        </div>
        <div className="table-wrap roster-list-wrap">
          <RosterTable
            roster={roster}
            selectedPersonId={state.selectedPersonId}
            sortKey={state.sortKey}
            sortDirection={state.sortDirection}
            watchlistPersonIds={state.watchlistPersonIds}
            onSort={onSort}
            onSelectPlayer={onSelectPlayer}
          />
        </div>
        <footer className="roster-legend">
          <span>{roster.length} rostered</span>
          <span>{state.watchlistPersonIds.length} watched</span>
          <span>{state.positionFilter === "ALL" ? "All positions" : state.positionFilter}</span>
        </footer>
      </section>
    </div>
  );

  const featurePanel = selectedPlayer && (
    <PlayerFeaturePanel
      player={selectedPlayer}
      seasonYear={bundle.selectedProgram.program.seasonYear}
      keyRatings={keyRatingsForPosition(selectedPlayer)}
      developmentFocus={state.developmentFocusByPersonId[selectedPlayer.person.personId] || "Unset"}
      focusOptions={focusOptions}
      onDevelopmentFocus={(focus) => onDevelopmentFocus(selectedPlayer, focus)}
    />
  );

  return <TeamRoomLayout dataPanel={dataPanel} featurePanel={featurePanel} />;
}

function buildContextMetrics(
  tab: TeamRoomTab,
  bundle: ProgramSeedBundle,
  overview: ReturnType<typeof getRosterOverview>,
  starterCounts: Record<string, number>,
): MetricItem[] {
  const headCoach = bundle.selectedProgram.staff.find((staff) => staff.assignment?.roleId === "head_coach");
  const offensiveCoordinator = bundle.selectedProgram.staff.find((staff) => staff.assignment?.roleId === "offensive_coordinator");
  const defensiveCoordinator = bundle.selectedProgram.staff.find((staff) => staff.assignment?.roleId === "defensive_coordinator");

  if (tab === "NIL/Budget") {
    return [
      { label: "Collective", value: bundle.selectedProgram.nil.collectiveName, note: "Active" },
      { label: "Available", value: money(bundle.selectedProgram.nil.nilAvailable), note: "Budget" },
      { label: "Monthly Income", value: money(bundle.selectedProgram.nil.monthlyIncome), note: "Projected" },
      { label: "Followers", value: compactNumber(bundle.selectedProgram.nil.socialFollowing), note: "Reach" },
    ];
  }

  if (tab === "Health") {
    return [
      { label: "Team Health", value: `${overview.teamHealth}%`, note: "Availability" },
      { label: "Elevated Risk", value: overview.injured, note: "Injury resistance" },
      { label: "High Stamina", value: bundle.selectedProgram.roster.filter((player) => player.ratings.stamina >= 80).length, note: "80+" },
      { label: "Low Stamina", value: bundle.selectedProgram.roster.filter((player) => player.ratings.stamina < 60).length, note: "Under 60" },
    ];
  }

  if (tab === "Staff") {
    return [
      { label: "Head Coach", value: headCoach?.person?.displayName || "Open", note: headCoach?.coach ? `${headCoach.coach.reputation} rep` : "Staff" },
      { label: "Offense", value: offensiveCoordinator?.person?.displayName || bundle.selectedProgram.program.offensiveScheme, note: bundle.selectedProgram.program.offensiveScheme },
      { label: "Defense", value: defensiveCoordinator?.person?.displayName || bundle.selectedProgram.program.defensiveScheme, note: bundle.selectedProgram.program.defensiveScheme },
      { label: "Coach Trust", value: bundle.selectedProgram.program.coachTrust, note: "Program" },
    ];
  }

  if (tab === "Depth Chart" || tab === "Formation Subs") {
    return [
      { label: "QB Starters", value: starterCounts.QB || 0, note: "Roster roles" },
      { label: "Skill Starters", value: (starterCounts.RB || 0) + (starterCounts.WR || 0) + (starterCounts.TE || 0), note: "RB/WR/TE" },
      { label: "Front Seven", value: (starterCounts.DL || 0) + (starterCounts.EDGE || 0) + (starterCounts.LB || 0), note: "DL/EDGE/LB" },
      { label: "Secondary", value: (starterCounts.CB || 0) + (starterCounts.S || 0), note: "CB/S" },
    ];
  }

  return [
    { label: "Position Grades", value: `${overview.offenseOverall}/${overview.defenseOverall}`, note: "Off / Def" },
    { label: "Class Balance", value: `${overview.byClass.FR || 0} FR / ${overview.byClass.SR || 0} SR`, note: "Roster" },
    { label: "Facilities", value: bundle.selectedProgram.program.facilitiesGrade, note: "Grade" },
    { label: "Academics", value: bundle.selectedProgram.program.academicGrade, note: "Grade" },
  ];
}
