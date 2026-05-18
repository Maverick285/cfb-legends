import { money } from "../../data/format";
import type { getRosterOverview } from "../../data/selectors";
import { BreakdownCard, MetricStrip, type BreakdownItem } from "./MetricStrip";

type RosterOverview = ReturnType<typeof getRosterOverview>;

type RosterOverviewPanelProps = {
  overview: RosterOverview;
  positionCounts: BreakdownItem[];
  onDepthChart: () => void;
};

export function RosterOverviewPanel({ overview, positionCounts, onDepthChart }: RosterOverviewPanelProps) {
  const classCounts = ["FR", "SO", "JR", "SR"]
    .filter((classYear) => overview.byClass[classYear])
    .map((classYear) => ({ label: classYear, value: overview.byClass[classYear] }));

  return (
    <section className="roster-overview-band">
      <div className="overview-title">
        <span>Roster Overview</span>
        <button type="button" onClick={onDepthChart}>Depth Chart</button>
      </div>
      <MetricStrip
        className="overview-metrics"
        metrics={[
          { label: "Team OVR", value: overview.teamOverall, note: "Whole roster" },
          { label: "Offense", value: overview.offenseOverall, note: "OVR" },
          { label: "Defense", value: overview.defenseOverall, note: "OVR" },
          { label: "Special Teams", value: overview.specialTeamsOverall, note: "OVR" },
          { label: "Roster Size", value: `${overview.rosterSize}/${overview.rosterLimit}`, note: "Players" },
          { label: "Scholarships", value: `${overview.scholarshipCount}/${overview.scholarshipLimit}`, note: "Funded" },
          { label: "NIL Valuation", value: money(overview.totalNil), note: "Roster" },
        ]}
      />
      <div className="overview-breakdowns">
        <BreakdownCard title="Class Breakdown" values={classCounts} />
        <BreakdownCard title="Position Breakdown" values={positionCounts} compact />
        <div className="health-snapshot">
          <span>Health Snapshot</span>
          <strong>{overview.teamHealth}%</strong>
          <em>{overview.injured} elevated-risk players</em>
        </div>
      </div>
    </section>
  );
}
