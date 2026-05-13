import type { CSSProperties, ReactNode } from "react";
import type { CareerState, ProgramSeedBundle } from "../data/types";

type AppShellProps = {
  bundle: ProgramSeedBundle;
  state: CareerState;
  onRoute: (route: CareerState["route"]) => void;
  onSave: () => void;
  onReset: () => void;
  children: ReactNode;
};

const navItems: Array<{ route: CareerState["route"]; label: string }> = [
  { route: "dashboard", label: "Desk" },
  { route: "roster", label: "Roster" },
  { route: "player", label: "Player Profile" },
];

export function AppShell({ bundle, state, onRoute, onSave, onReset, children }: AppShellProps) {
  const { school, program, conference } = bundle.selectedProgram;
  const brand = bundle.selectedProgram.brand;
  return (
    <div
      className="app-shell"
      style={{
        "--team-primary": brand.primaryColor,
        "--team-secondary": brand.secondaryColor,
      } as CSSProperties}
    >
      <aside className="side-rail">
        <div className="brand-lockup">
          <div className="brand-mark">{school.abbreviation}</div>
          <div>
            <span>College Football</span>
            <strong>Legends</strong>
          </div>
        </div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.route}
              className={state.route === item.route ? "active" : ""}
              type="button"
              onClick={() => onRoute(item.route)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="app-main">
        <header className="top-bar">
          <div className="program-lockup">
            <div className="program-logo">{school.abbreviation}</div>
            <div>
              <span>{conference.conferenceName} / Week {state.currentWeek}</span>
              <strong>{school.schoolName} {school.nickname}</strong>
            </div>
          </div>
          <div className="top-actions">
            <div>
              <span>Prestige</span>
              <strong>{program.programPrestige}</strong>
            </div>
            <div>
              <span>Budget</span>
              <strong>${Math.round(program.athleticBudget / 1000000)}M</strong>
            </div>
            <button type="button" onClick={onSave}>Save</button>
            <button type="button" onClick={onReset}>Reset</button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
