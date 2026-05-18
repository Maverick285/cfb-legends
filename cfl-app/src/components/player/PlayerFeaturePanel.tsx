import { feet, money, titleCase } from "../../data/format";
import type { RosterPlayerRecord } from "../../data/types";
import { AssetSlot } from "./AssetSlot";
import { StatusBadge } from "./StatusBadge";

type PlayerFeaturePanelProps = {
  player: RosterPlayerRecord;
  seasonYear: number;
  keyRatings: Array<[string, number]>;
  developmentFocus: string;
  focusOptions: string[];
  onDevelopmentFocus: (focus: string) => void;
};

export function PlayerFeaturePanel({ player, seasonYear, keyRatings, developmentFocus, focusOptions, onDevelopmentFocus }: PlayerFeaturePanelProps) {
  const topTrait = player.traits[0];
  const displayClass = player.athlete.classYear.replace("RS ", "");

  return (
    <aside className="roster-player-card">
      <div className="player-stage">
        <div className="stage-glow" />
        <div className="player-number">{player.athlete.jerseyNumber}</div>
        <div className="player-card-number">{player.athlete.jerseyNumber}</div>
        <div className="player-card-position">{player.athlete.primaryPosition}</div>
        <AssetSlot
          className="player-model-asset"
          src={`/assets/player-models/${player.person.personId}.png`}
          fallbackSrc="/assets/player-models/placeholder-player.svg"
        />
        <div className="player-identity">
          <span>{player.athlete.primaryPosition} / {titleCase(player.athlete.depthChartRole)}</span>
          <strong>{player.person.firstName}<br />{player.person.lastName}</strong>
        </div>
        <div className="player-card-grid">
          <div><span>Class</span><strong>{displayClass}</strong></div>
          <div><span>HT / WT</span><strong>{feet(player.athlete.heightInches)} / {player.athlete.weightPounds}</strong></div>
          <div><span>Hometown</span><strong>{player.person.hometownCity}, {player.person.hometownState}</strong></div>
        </div>
        <div className="player-tags">
          {player.athlete.captainStatus && <StatusBadge>Captain</StatusBadge>}
          {topTrait && <StatusBadge>{topTrait.traitName}</StatusBadge>}
          <StatusBadge>Morale {player.ratings.morale}</StatusBadge>
        </div>
        <p className="player-summary">
          {player.person.displayName} is a {player.athlete.primaryPosition} with {player.ratings.overall} overall ability,
          {player.ratings.potentialAbility} potential, and a {player.athlete.schemeFit} scheme fit in the current system.
        </p>
        <div className="key-ratings-strip">
          {keyRatings.map(([label, value]) => (
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
            <strong>{player.ratings.overall}</strong>
            <em>{player.athlete.depthChartRole}</em>
          </div>
          <div>
            <span>Development</span>
            <strong>{developmentFocus === "Unset" ? "No Focus" : developmentFocus}</strong>
            <select value={developmentFocus} onChange={(event) => onDevelopmentFocus(event.target.value)}>
              <option value="Unset">Unset</option>
              {focusOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div>
            <span>NIL Value</span>
            <strong>{money(player.nil?.estimatedNilValue || 0)}</strong>
            <em>{titleCase(player.nil?.nilStatus || "standard")}</em>
          </div>
          <div>
            <span>{seasonYear} Form</span>
            <strong>{player.ratings.confidence}</strong>
            <em>Confidence</em>
          </div>
        </div>
      </div>
    </aside>
  );
}
