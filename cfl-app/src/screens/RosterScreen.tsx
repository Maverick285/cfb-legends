import { feet, money } from "../data/format";
import { getPlayerProfile, getProgramRoster, positionOptions } from "../data/selectors";
import type { CareerState, ProgramSeedBundle, RosterPlayerRecord, RosterSortKey } from "../data/types";
import { PlayerHero } from "../components/PlayerHero";
import { StatusPill } from "../components/StatusPill";

const columns: Array<{ key: RosterSortKey; label: string }> = [
  { key: "rosterSlot", label: "Slot" },
  { key: "primaryPosition", label: "Pos" },
  { key: "overall", label: "OVR" },
  { key: "potentialAbility", label: "POT" },
  { key: "classYear", label: "Class" },
  { key: "morale", label: "Morale" },
  { key: "schemeFit", label: "Fit" },
  { key: "nilValue", label: "NIL" },
];

type RosterScreenProps = {
  bundle: ProgramSeedBundle;
  state: CareerState;
  onSelectPlayer: (personId: string, openProfile?: boolean) => void;
  onPositionFilter: (position: string) => void;
  onSort: (sortKey: RosterSortKey) => void;
  onToggleWatch: (player: RosterPlayerRecord) => void;
  onDevelopmentFocus: (player: RosterPlayerRecord, focus: string) => void;
};

export function RosterScreen({ bundle, state, onSelectPlayer, onPositionFilter, onSort, onToggleWatch, onDevelopmentFocus }: RosterScreenProps) {
  const roster = getProgramRoster(bundle, state);
  const selectedPlayer = getPlayerProfile(bundle, state.selectedPersonId) || roster[0];
  const positions = positionOptions(bundle);
  return (
    <section className="screen roster-screen">
      <header className="screen-title">
        <div>
          <span>Roster Room</span>
          <h1>{state.positionFilter === "ALL" ? "Whole Roster" : `${state.positionFilter} Room`}</h1>
        </div>
        <strong>{roster.length} Players</strong>
      </header>
      {selectedPlayer && (
        <PlayerHero
          player={selectedPlayer}
          isWatched={state.watchlistPersonIds.includes(selectedPlayer.person.personId)}
          developmentFocus={state.developmentFocusByPersonId[selectedPlayer.person.personId]}
          onToggleWatch={() => onToggleWatch(selectedPlayer)}
          onDevelopmentFocus={(focus) => onDevelopmentFocus(selectedPlayer, focus)}
        />
      )}
      <div className="position-bar">
        {positions.map((position) => (
          <button key={position} className={state.positionFilter === position ? "active" : ""} type="button" onClick={() => onPositionFilter(position)}>
            {position}
          </button>
        ))}
      </div>
      <div className="table-wrap">
        <table className="roster-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>
                  <button type="button" onClick={() => onSort(column.key)}>
                    {column.label}{state.sortKey === column.key ? (state.sortDirection === "asc" ? " ▲" : " ▼") : ""}
                  </button>
                </th>
              ))}
              <th>Name</th>
              <th>Ht/Wt</th>
              <th>Health</th>
              <th>Trait</th>
              <th>Watch</th>
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
                <td>{player.membership.rosterSlot}</td>
                <td>{player.athlete.primaryPosition}</td>
                <td className="num">{player.ratings.overall}</td>
                <td className="num">{player.ratings.potentialAbility}</td>
                <td>{player.athlete.classYear}</td>
                <td className="num">{player.ratings.morale}</td>
                <td className="num">{player.athlete.schemeFit}</td>
                <td>{money(player.nil?.estimatedNilValue || 0)}</td>
                <td>
                  <strong>{player.person.displayName}</strong>
                  <small>{player.person.hometownCity}, {player.person.hometownState}</small>
                </td>
                <td>{feet(player.athlete.heightInches)} / {player.athlete.weightPounds}</td>
                <td><StatusPill tone={player.ratings.injuryResistance > 70 ? "good" : "warn"}>{player.ratings.injuryResistance}</StatusPill></td>
                <td>{player.traits[0]?.traitName || "None"}</td>
                <td>{state.watchlistPersonIds.includes(player.person.personId) ? "Yes" : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
