import type { CSSProperties, ReactNode } from "react";
import type { CareerState, ProgramSeedBundle } from "../../data/types";
import { LeftNavRail } from "./LeftNavRail";
import { TopProgramBar } from "./TopProgramBar";

export type GameShellProps = {
  bundle: ProgramSeedBundle;
  state: CareerState;
  onRoute: (route: CareerState["route"]) => void;
  onSave: () => void;
  onReset: () => void;
  children: ReactNode;
};

export function GameShell({ bundle, state, onRoute, onSave, onReset, children }: GameShellProps) {
  const { school, brand } = bundle.selectedProgram;

  return (
    <div
      className="app-shell"
      style={{
        "--team-primary": brand.primaryColor,
        "--team-secondary": brand.secondaryColor,
      } as CSSProperties}
    >
      <LeftNavRail schoolAbbreviation={school.abbreviation} currentRoute={state.route} onRoute={onRoute} />
      <main className="app-main">
        <TopProgramBar bundle={bundle} state={state} onSave={onSave} onReset={onReset} />
        {children}
      </main>
    </div>
  );
}
