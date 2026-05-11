# Engine and Architecture Spec

## Engine Decision

Use:

```text
Tauri + React + TypeScript + SQLite
```

This is the correct architecture because the game is menu-heavy, table-heavy, data-heavy, and simulation-first.

Do not start with Unity, Unreal, or Godot.

Those engines are useful for visual games. This project needs a desktop application shell, a real database, dense UI, and deterministic simulation.

## Layer Diagram

```text
React UI
  ↓
Client State Store
  ↓
Application Services
  ↓
Simulation Core
  ↓
Persistence Layer
  ↓
SQLite + JSON Configs
  ↓
Optional Local AI Services
```

## Recommended Tech

### Desktop

```text
Tauri 2
```

### Frontend

```text
React
TypeScript
Tailwind or equivalent
TanStack Table
Zustand or Redux Toolkit
React Router
```

### Data

```text
SQLite
Drizzle ORM or direct SQL wrapper
JSON rules/config files
```

### Testing

```text
Vitest
Playwright
Headless sim runner
Scenario test runner
```

### AI Services

```text
Narrative service: local OpenAI-compatible LLM endpoint
Asset service: ComfyUI wrapper or equivalent image generation backend
```

## Folder Structure

```text
/src
  /app
  /ui
  /routes
  /components
  /tables
  /profiles
  /sim
  /domain
  /events
  /data
  /services
  /services/narrative
  /services/assets
  /testing
  /utils

/config
  /rulesets
  /balance
  /schemas

/assets
  /generated
  /portraits
  /logos
  /uniforms
  /stadiums

/docs
/tests
/scripts
/sim_runs
/qa_reports
```

## Simulation Truth Rule

The simulation core owns all truth.

The LLM may write:

- scouting prose
- media blurbs
- staff voice
- play-by-play wording
- press questions
- town immersion text

The LLM may not decide:

- ratings
- injuries
- commits
- transfers
- NIL approval
- money
- game outcomes
- discipline events
- eligibility

## AI Service Rule

The game should run completely without AI services.

If AI is unavailable:

- use deterministic templates
- use silhouette portraits
- queue asset jobs
- never block Continue
- never corrupt saves

## Save/Load Rule

All stateful objects must be serializable and versioned.

Every schema change must include:

- migration note
- tests
- save/load round trip
- version bump if necessary

## Headless Rule

Every major system must be runnable without the UI.

Required commands eventually:

```bash
npm run sim -- --seasons 1 --seed 123
npm run sim -- --seasons 20 --seed 123
npm run test:scenario
npm run test:invariants
```
