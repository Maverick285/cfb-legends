import type { RosterPlayerRecord } from "../data/types";

export function PlayerPortrait({ player, large = false }: { player: RosterPlayerRecord; large?: boolean }) {
  const initials = `${player.person.firstName[0] || ""}${player.person.lastName[0] || ""}`;
  return (
    <div className={`player-portrait ${large ? "large" : ""}`}>
      <span>{player.athlete.jerseyNumber}</span>
      <strong>{initials}</strong>
      <em>{player.athlete.primaryPosition}</em>
    </div>
  );
}
