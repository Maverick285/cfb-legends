import { money } from "../data/format";
import { getDashboardState } from "../data/selectors";
import type { CareerState, ProgramSeedBundle } from "../data/types";

export function DashboardScreen({ bundle, state, onOpenRoster, onOpenPlayer }: {
  bundle: ProgramSeedBundle;
  state: CareerState;
  onOpenRoster: () => void;
  onOpenPlayer: (personId: string) => void;
}) {
  const dashboard = getDashboardState(bundle, state);
  const program = bundle.selectedProgram.program;
  const nil = bundle.selectedProgram.nil;
  return (
    <section className="screen dashboard-screen">
      <header className="screen-title">
        <div>
          <span>Program Desk</span>
          <h1>{bundle.selectedProgram.school.schoolName} Athletic Desk</h1>
        </div>
        <button type="button" onClick={onOpenRoster}>Review Roster</button>
      </header>
      <div className="desk-grid">
        <button className="desk-widget hero-widget" type="button" onClick={() => onOpenPlayer(dashboard.topPlayer.person.personId)}>
          <span>Roster Anchor</span>
          <strong>{dashboard.topPlayer.person.displayName}</strong>
          <em>{dashboard.topPlayer.athlete.primaryPosition} / OVR {dashboard.topPlayer.ratings.overall} / POT {dashboard.topPlayer.ratings.potentialAbility}</em>
        </button>
        <article className="desk-widget">
          <span>Roster</span>
          <strong>{dashboard.rosterCount}/105</strong>
          <em>Average OVR {dashboard.averageOverall}</em>
        </article>
        <article className="desk-widget">
          <span>Watchlist</span>
          <strong>{dashboard.watchCount}</strong>
          <em>Durable player attention list</em>
        </article>
        <article className="desk-widget">
          <span>NIL Collective</span>
          <strong>{money(nil.nilAvailable)}</strong>
          <em>{nil.collectiveName} / health {nil.brandHealth}</em>
        </article>
        <article className="desk-widget">
          <span>Facilities</span>
          <strong>{program.facilitiesGrade}</strong>
          <em>Academic {program.academicGrade} / Brand {program.brandExposure}</em>
        </article>
        <article className="desk-widget">
          <span>Next Game</span>
          <strong>{dashboard.nextGame?.opponent?.schoolName || "TBD"}</strong>
          <em>Week {dashboard.nextGame?.schedule?.week || 1} / {dashboard.nextGame?.schedule?.homeAwayNeutral || "home"}</em>
        </article>
      </div>
    </section>
  );
}
