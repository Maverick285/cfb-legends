import type { CSSProperties, ReactNode } from "react";
import { compactDate, money } from "../data/format";
import { getNextGame, getRosterOverview } from "../data/selectors";
import type { CareerState, ProgramSeedBundle } from "../data/types";

type AppShellProps = {
  bundle: ProgramSeedBundle;
  state: CareerState;
  onRoute: (route: CareerState["route"]) => void;
  onSave: () => void;
  onReset: () => void;
  children: ReactNode;
};

const navItems: Array<{ route: CareerState["route"]; label: string; icon: string }> = [
  { route: "dashboard", label: "Home", icon: "H" },
  { route: "roster", label: "Team", icon: "T" },
  { route: "player", label: "Profile", icon: "P" },
];

export function AppShell({ bundle, state, onRoute, onSave, onReset, children }: AppShellProps) {
  const { school, program, conference } = bundle.selectedProgram;
  const brand = bundle.selectedProgram.brand;
  const overview = getRosterOverview(bundle);
  const nextGame = getNextGame(bundle);
  return (
    <div
      className="app-shell"
      style={{
        "--team-primary": brand.primaryColor,
        "--team-secondary": brand.secondaryColor,
      } as CSSProperties}
    >
      <aside className="side-rail">
        <div className="brand-mark">{school.abbreviation}</div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.route}
              className={state.route === item.route ? "active" : ""}
              type="button"
              onClick={() => onRoute(item.route)}
              aria-label={item.label}
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
          <button type="button" disabled aria-label="Recruiting" title="Recruiting">R</button>
          <button type="button" disabled aria-label="Scheme" title="Scheme">S</button>
          <button type="button" disabled aria-label="Stats and News" title="Stats and News">N</button>
          <button type="button" disabled aria-label="Settings" title="Settings">G</button>
        </nav>
        <div className="league-mark">CFBL</div>
      </aside>
      <main className="app-main">
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
            <div><span>Record</span><strong>0-0</strong><em>{conference.conferenceName}</em></div>
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
        {children}
      </main>
    </div>
  );
}
