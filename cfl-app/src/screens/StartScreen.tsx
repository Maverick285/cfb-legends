import type { ProgramSeedBundle } from "../data/types";

export function StartScreen({ bundle, onStart }: { bundle: ProgramSeedBundle; onStart: () => void }) {
  const selected = bundle.programIndex.find((program) => program.programId === bundle.defaultProgramId);
  return (
    <main className="start-screen">
      <section className="start-panel">
        <div className="start-brand">
          <span>CFL</span>
          <strong>College Football Legends</strong>
        </div>
        <h1>Build the program from real records, not mock screens.</h1>
        <p>
          First React milestone: load the seed pack, validate the data, start one career, render a 105-player roster,
          click a player, mutate durable career state, and save it locally.
        </p>
        <div className="start-card">
          <span>Default Program</span>
          <strong>{selected?.schoolName} {selected?.nickname}</strong>
          <em>{selected?.conferenceName} / Prestige {selected?.prestige}</em>
        </div>
        <button type="button" onClick={onStart}>Start Vanderbilt Career</button>
      </section>
    </main>
  );
}
