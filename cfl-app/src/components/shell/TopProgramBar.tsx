import { compactDate, money } from "../../data/format";
import { getNextGame, getRosterOverview, getTeamRecord } from "../../data/selectors";
import type { CareerState, ProgramSeedBundle } from "../../data/types";

type TopProgramBarProps = {
  bundle: ProgramSeedBundle;
  state: CareerState;
  onSave: () => void;
  onReset: () => void;
};

export function TopProgramBar({ bundle, state, onSave, onReset }: TopProgramBarProps) {
  const { school, program, conference } = bundle.selectedProgram;
  const overview = getRosterOverview(bundle);
  const nextGame = getNextGame(bundle);
  const record = getTeamRecord(bundle);

  return (
    <header className="top-bar">
      <div className="program-lockup">
        <div className="program-logo">{school.abbreviation}</div>
        <div>
          <span>{school.schoolName}</span>
          <strong>{school.nickname}</strong>
        </div>
      </div>
      <div className="top-metrics" aria-label="Program summary">
        <div><span>Team OVR</span><strong>{overview.teamOverall}</strong></div>
        <div><span>Budget</span><strong>{money(program.athleticBudget)}</strong></div>
        <div><span>NIL Value</span><strong>{money(overview.totalNil)}</strong></div>
        <div><span>Record</span><strong>{record.wins}-{record.losses}</strong><em>{conference.conferenceName}</em></div>
      </div>
      <div className="top-actions">
        <div>
          <span>Week</span>
          <strong>{nextGame?.game?.week || state.currentWeek}</strong>
          <em>{nextGame?.game?.date ? compactDate(nextGame.game.date) : state.currentDate}</em>
        </div>
        <div>
          <span>Next</span>
          <strong>{nextGame?.opponent?.abbreviation || "TBD"}</strong>
          <em>{nextGame?.game?.kickoffTime || "TBD"}</em>
        </div>
        <button className="continue-button" type="button" onClick={onSave}>Continue</button>
        <button className="reset-button" type="button" onClick={onReset}>Reset</button>
      </div>
    </header>
  );
}
