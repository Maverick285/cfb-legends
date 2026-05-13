import { useEffect, useMemo, useState } from "react";
import { AppShell } from "./components/AppShell";
import { createNewCareer, selectPlayer, setDevelopmentFocus, setPositionFilter, setRosterSort, setRoute, toggleWatchlist } from "./data/actions";
import { loadSeedBundle } from "./data/seedLoader";
import { clearCareer, loadCareer, saveCareer } from "./data/persistence";
import type { CareerState, ProgramSeedBundle, RosterPlayerRecord, RosterSortKey } from "./data/types";
import { DashboardScreen } from "./screens/DashboardScreen";
import { PlayerProfileScreen } from "./screens/PlayerProfileScreen";
import { RosterScreen } from "./screens/RosterScreen";
import { StartScreen } from "./screens/StartScreen";
import "./styles/tokens.css";
import "./styles/app.css";

export default function App() {
  const [bundle, setBundle] = useState<ProgramSeedBundle | null>(null);
  const [state, setState] = useState<CareerState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSeedBundle()
      .then((loaded) => {
        setBundle(loaded);
        const saved = loadCareer();
        if (saved && saved.selectedProgramId === loaded.defaultProgramId) setState(saved);
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  useEffect(() => {
    if (state) saveCareer(state);
  }, [state]);

  const selectedProgram = useMemo(() => {
    if (!bundle) return null;
    return bundle.programIndex.find((program) => program.programId === bundle.defaultProgramId) || bundle.programIndex[0];
  }, [bundle]);

  if (error) return <main className="load-state">Seed load failed: {error}</main>;
  if (!bundle || !selectedProgram) return <main className="load-state">Loading seed pack...</main>;

  if (!state) {
    return <StartScreen bundle={bundle} onStart={() => setState(createNewCareer(bundle))} />;
  }

  function update(mutator: (current: CareerState) => CareerState) {
    setState((current) => (current ? mutator(current) : current));
  }

  function handleToggleWatch(player: RosterPlayerRecord) {
    update((current) => toggleWatchlist(current, player.person.personId, player.person.displayName));
  }

  function handleDevelopmentFocus(player: RosterPlayerRecord, focus: string) {
    update((current) => setDevelopmentFocus(current, player.person.personId, player.person.displayName, focus));
  }

  function handleReset() {
    clearCareer();
    setState(null);
  }

  return (
    <AppShell
      bundle={bundle}
      state={state}
      onRoute={(route) => update((current) => setRoute(current, route))}
      onSave={() => saveCareer(state)}
      onReset={handleReset}
    >
      {state.route === "dashboard" && (
        <DashboardScreen
          bundle={bundle}
          state={state}
          onOpenRoster={() => update((current) => setRoute(current, "roster"))}
          onOpenPlayer={(personId) => update((current) => selectPlayer(current, personId, "player"))}
        />
      )}
      {state.route === "roster" && (
        <RosterScreen
          bundle={bundle}
          state={state}
          onSelectPlayer={(personId, openProfile = false) => update((current) => selectPlayer(current, personId, openProfile ? "player" : "roster"))}
          onPositionFilter={(position) => update((current) => setPositionFilter(current, position))}
          onSort={(sortKey: RosterSortKey) => update((current) => setRosterSort(current, sortKey))}
          onToggleWatch={handleToggleWatch}
          onDevelopmentFocus={handleDevelopmentFocus}
        />
      )}
      {state.route === "player" && (
        <PlayerProfileScreen
          bundle={bundle}
          state={state}
          onBackToRoster={() => update((current) => setRoute(current, "roster"))}
          onToggleWatch={handleToggleWatch}
          onDevelopmentFocus={handleDevelopmentFocus}
        />
      )}
    </AppShell>
  );
}
