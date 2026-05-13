import { feet, money, titleCase } from "../data/format";
import { keyRatingsForPosition } from "../data/selectors";
import type { RosterPlayerRecord } from "../data/types";
import { PlayerPortrait } from "./PlayerPortrait";
import { StatusPill } from "./StatusPill";

type PlayerHeroProps = {
  player: RosterPlayerRecord;
  isWatched: boolean;
  developmentFocus?: string;
  onToggleWatch: () => void;
  onDevelopmentFocus: (focus: string) => void;
};

const focusOptions = ["Technique", "Strength", "Explosiveness", "Coverage", "Ball Security", "Film Study"];

export function PlayerHero({ player, isWatched, developmentFocus, onToggleWatch, onDevelopmentFocus }: PlayerHeroProps) {
  const ratings = keyRatingsForPosition(player);
  const focus = developmentFocus || "Unset";
  return (
    <section className="player-hero">
      <PlayerPortrait player={player} large />
      <div className="hero-main">
        <div className="eyebrow">
          #{player.athlete.jerseyNumber} / {player.athlete.primaryPosition} / {player.athlete.classYear}
        </div>
        <h1>{player.person.displayName}</h1>
        <p>
          {player.person.hometownCity}, {player.person.hometownState} / {feet(player.athlete.heightInches)} / {player.athlete.weightPounds} lbs / {titleCase(player.membership.scholarshipStatus)}
        </p>
        <div className="hero-pills">
          <StatusPill tone={player.ratings.morale >= 70 ? "good" : "warn"}>Morale {player.ratings.morale}</StatusPill>
          <StatusPill tone={player.athlete.transferStatus === "none" ? "good" : "warn"}>{titleCase(player.athlete.transferStatus)}</StatusPill>
          <StatusPill>{money(player.nil?.estimatedNilValue || 0)} NIL</StatusPill>
          {player.traits.slice(0, 2).map((trait) => <StatusPill key={trait.traitId}>{trait.traitName}</StatusPill>)}
        </div>
      </div>
      <div className="hero-score">
        <div><span>OVR</span><strong>{player.ratings.overall}</strong></div>
        <div><span>POT</span><strong>{player.ratings.potentialAbility}</strong></div>
        <div><span>Fit</span><strong>{player.athlete.schemeFit}</strong></div>
      </div>
      <div className="hero-ratings">
        {ratings.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="hero-actions">
        <button type="button" onClick={onToggleWatch}>{isWatched ? "Remove Watch" : "Add Watch"}</button>
        <label>
          Development
          <select value={focus} onChange={(event) => onDevelopmentFocus(event.target.value)}>
            <option value="Unset">Unset</option>
            {focusOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      </div>
    </section>
  );
}
