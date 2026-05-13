# Decision Log

Date reset: 2026-05-07

The previous long decision log was archived at:

- `docs/archive/2026-05-pre-rebuild-research/DECISION_LOG.md`

## 2026-05-07 - Rebuild App Foundation Before Feature Depth

### Context

The project has many systems and screens, but the user experience still risks feeling fake because broad UI scaffolding can outpace durable state. The current UI also lacks a cohesive shell and reliable click/navigation foundation.

### Decision

Proceed with an app-foundation-first rebuild. Treat old code as a parts bin. Build shell, routing, state, save/load, and one object-profile proof before adding recruiting or other feature depth.

### Rationale

The intro-to-first-game path is still the eventual acceptance journey, but it is too broad for the first coding step. The first step must prove that the app itself works.

### Consequences

- Build M0 app foundation before feature work.
- Preserve existing engines as parts-bin modules.
- Quarantine screen-owned fake state.
- Use the journey from intro screen to first game as the later acceptance path.
- Use graphics only as supporting menu assets, not as the core structure.

### References

- `docs/START_HERE.md`
- `docs/BUILD_PLAN.md`
- `docs/PROJECT_STATUS.md`
- `docs/CGM_MENU_GRAPHICS_ASSET_MANIFEST.md`

## 2026-05-07 - Archive Old Research, Keep It Reference-Only

### Context

The docs folder had become a mix of old milestone logs, FM analysis, UI research, architecture sketches, and active planning. That made it unclear what to execute next.

### Decision

Archive pre-rebuild research and replace active docs with a small current set.

### Consequences

- Active docs now start from `docs/START_HERE.md`.
- Historical docs are preserved under `docs/archive/2026-05-pre-rebuild-research/`.
- Future coding work should update `PROJECT_STATUS.md` and this decision log only when the active plan changes.

## 2026-05-07 - M0 Boots Through New Foundation Script

### Context

The legacy `app.js` mixes shell rendering, feature logic, save migration, and broad screen state. Continuing to patch it would keep the project in the same incoherent shape.

### Decision

Stop loading legacy `app.js` from `index.html` for the active M0 path. Load data packs plus `js/m0/foundation.js` instead.

### Consequences

- The old app remains in the repo as parts-bin code.
- The active UI now starts from a smaller shell/state/router foundation.
- Feature engines will be reintroduced only after they can write through the new state and selector path.

## 2026-05-07 - Rebuild Start Screen Before Feature Expansion

### Context

The first visible screen still looked and behaved like the old broad bootstrap scaffold: fake menu tiles, technical setup fields, and weak placeholder art made the project feel incoherent before the player entered the app.

### Decision

Treat the start screen as the first screen-by-screen rebuild target. Replace the old bootstrap content at runtime with a focused full-screen menu and a minimal New Career setup.

### Consequences

- No world seed, rules preset, advanced setup, Data Lab, AI Services, or fake settings tiles on the first screen.
- New Career and Continue Career are the only first-screen actions; Continue disables when no save exists. Load Career stays hidden until it can browse or distinguish multiple saves.
- The default new career uses the fictional demo program set so the first experience is not anchored to a real-school data dump.
- A dark, blurred generated menu background replaces the old SVG placeholder for the active start screen.

## 2026-05-07 - Hide Controls That Do Not Yet Do Real Work

### Context

Reference screens show dense menus, but every visible command needs a credible destination. The current shell still exposed developer-era controls such as Skip, Debug, placeholder Recruiting, duplicate Save buttons, Back/Forward, search, bookmarks, and a Load button that only continued the same local save.

### Decision

Keep only the visible buttons that work in the current rebuild: New Career, Continue Career, Main Menu, Save, Dashboard, Roster, row/profile navigation, and Review Roster.

### Consequences

- The player-facing shell is smaller but less fake.
- Placeholder systems remain in code/docs as parts-bin work, not visible primary navigation.
- Future screens should be added one at a time only when their buttons have real state-backed behavior.

## 2026-05-07 - Adopt CFL Agent Repo Pack Discipline

### Context

The current UI still looked like an underbuilt prototype because the active build had no objective visual contract, no required dashboard regions, and no repo-level check command.

### Decision

Adopt `cfl_agent_repo_pack` as the project discipline layer. Start applying it to the active static app immediately instead of waiting for a full framework migration.

### Consequences

- Added root `AGENTS.md` pointing future agents at the pack.
- Added `npm run check` with static-app equivalents for typecheck, lint, test, build, visual contract check, and screenshot artifact setup.
- Rebuilt the Dashboard toward `specs/screens/dashboard.visual-spec.md`: matchup, team overview, schedule, recruiting, staff, rankings/news, bottom ticker, and Continue CTA.
- Continue now mutates durable career state by advancing the week and saving.
- A future React/TypeScript migration can still replace this static harness, but the current app now has a concrete gate.

## 2026-05-12 - Promote `cfl-app` as the Real App Path

### Context

The `cfl-next/` prototype is the newest and strongest visual direction, but it is still a static HTML-string prototype. The new full-scale seed pack provides enough table coverage to begin building from a real data spine instead of extending mock screens.

### Decision

Create `cfl-app/` as the real app path using React, TypeScript, and Vite. Keep `cfl-next/` as the visual/reference prototype. Treat the old root app, legacy `app.js`, `js/sim/`, `js/ui/`, and harness systems as parts-bin/reference code.

### Consequences

- The first backend is a local game data layer, not a server.
- Seed import/validation must pass before UI expansion.
- The first real slice is Vanderbilt from the seed pack: dashboard, 105-player roster, player profile, watchlist, development focus, and save/load.
- Future screens should be built page by page in `cfl-app/`, starting with a durable depth chart.
- React components now carry reusable screen structure instead of giant HTML strings.

### References

- `NEXT_BUILD_PLAN.md`
- `docs/PROJECT_STATUS.md`
- `cfl_full_scale_seed_data_v0_1/cfl_seed_data_pack/`
- `cfl-app/`
