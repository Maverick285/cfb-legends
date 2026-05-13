import { money, titleCase } from "../data/format";
import { getPlayerProfile, keyRatingsForPosition } from "../data/selectors";
import type { CareerState, ProgramSeedBundle, RosterPlayerRecord } from "../data/types";
import { PlayerHero } from "../components/PlayerHero";
import { StatusPill } from "../components/StatusPill";

type PlayerProfileScreenProps = {
  bundle: ProgramSeedBundle;
  state: CareerState;
  onBackToRoster: () => void;
  onToggleWatch: (player: RosterPlayerRecord) => void;
  onDevelopmentFocus: (player: RosterPlayerRecord, focus: string) => void;
};

export function PlayerProfileScreen({ bundle, state, onBackToRoster, onToggleWatch, onDevelopmentFocus }: PlayerProfileScreenProps) {
  const player = getPlayerProfile(bundle, state.selectedPersonId) || bundle.selectedProgram.roster[0];
  const ratings = keyRatingsForPosition(player);
  const relatedLog = state.actionLog.filter((entry) => entry.personId === player.person.personId).slice(0, 6);
  return (
    <section className="screen player-profile-screen">
      <header className="screen-title">
        <div>
          <span>Player Profile</span>
          <h1>{player.person.displayName}</h1>
        </div>
        <button type="button" onClick={onBackToRoster}>Back to Roster</button>
      </header>
      <PlayerHero
        player={player}
        isWatched={state.watchlistPersonIds.includes(player.person.personId)}
        developmentFocus={state.developmentFocusByPersonId[player.person.personId]}
        onToggleWatch={() => onToggleWatch(player)}
        onDevelopmentFocus={(focus) => onDevelopmentFocus(player, focus)}
      />
      <div className="profile-grid">
        <article className="profile-panel">
          <span>Attributes</span>
          <div className="rating-grid">
            {ratings.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
            <div><span>Work Ethic</span><strong>{player.ratings.workEthic}</strong></div>
            <div><span>Discipline</span><strong>{player.ratings.discipline}</strong></div>
            <div><span>Football IQ</span><strong>{player.ratings.footballIQ}</strong></div>
            <div><span>Consistency</span><strong>{player.ratings.consistency}</strong></div>
          </div>
        </article>
        <article className="profile-panel">
          <span>Context</span>
          <dl className="detail-list">
            <div><dt>Role</dt><dd>{titleCase(player.athlete.depthChartRole)}</dd></div>
            <div><dt>Expectation</dt><dd>{titleCase(player.athlete.playingTimeExpectation)}</dd></div>
            <div><dt>Eligibility</dt><dd>{player.athlete.eligibilityYearsRemaining} years</dd></div>
            <div><dt>Redshirt</dt><dd>{titleCase(player.athlete.redshirtStatus)}</dd></div>
            <div><dt>NIL</dt><dd>{money(player.nil?.estimatedNilValue || 0)} / {titleCase(player.nil?.nilStatus || "none")}</dd></div>
          </dl>
          <div className="hero-pills">
            {player.traits.map((trait) => <StatusPill key={trait.traitId}>{trait.traitName} {trait.strength}</StatusPill>)}
          </div>
        </article>
        <article className="profile-panel">
          <span>Action Log</span>
          {relatedLog.length ? (
            <ul className="action-log">
              {relatedLog.map((entry) => <li key={entry.id}>{entry.summary}</li>)}
            </ul>
          ) : (
            <p className="muted">No player-specific actions yet.</p>
          )}
        </article>
      </div>
    </section>
  );
}
