# 51 — Ready-To-Paste Build Prompts for Remaining Systems

## Prompt: SAVE-1 Database and Save Architecture

```text
Implement SAVE-1 — Database, Save, Migration, and Event Log foundation.

Goal:
Create a persistence foundation for the CFB-FM project.

Deliver:
- SaveMetadata type
- GameWorld serialization interface
- SaveRepository interface
- JSON snapshot save/load implementation for early build
- save version field
- migration registry
- event log type
- action log type
- state validation scaffold
- tests

Hard rules:
- no UI-only state
- save/load round trip required
- migrations must be explicit
- event/action log must be append-only
- no simulation logic in UI

Acceptance:
- generated world save/load round trip passes
- migration registry can register fake migration in test
- action log entry can be written/read
- validation catches duplicate IDs in test
```

## Prompt: UI-Workspace Framework

```text
Implement UIWORK-1 — Workspace Layout Framework.

Goal:
Create reusable FM-like workspace layout components.

Deliver:
- WorkspaceShell
- WorkspaceHeader
- Breadcrumbs
- SubTabNav
- ActionBar
- RightInspector
- SavedViewSlot placeholder
- route integration for Roster and Recruiting placeholders

Hard rules:
- no fake gameplay state
- components reusable
- use data-testid hooks
- no card-only main layout
- support dense table area

Acceptance:
- workspace renders header/subtabs/inspector
- breadcrumbs render
- Roster route uses WorkspaceShell
- Recruiting route uses WorkspaceShell
- tests or Storybook-like smoke if available
```

## Prompt: STAFF-1 Staff Responsibilities Foundation

```text
Implement STAFF-1 — Staff Responsibilities Foundation.

Goal:
Make staff functional enough to own responsibilities and generate reports later.

Deliver:
- Staff entity
- StaffAttributes
- StaffPersonality
- StaffBias
- ResponsibilityAssignment
- ResponsibilityMode
- StaffWorkload shell
- tests

Hard rules:
- staff are not cosmetic
- responsibilities must be serializable
- modes include user controls, recommends, handles routine, handles unless critical, fully controls
- no UI-only staff state

Acceptance:
- staff can be assigned recruiting/scouting/practice responsibility
- responsibility saves/loads
- staff bias exists in type
- workload shell exists
```

## Prompt: SCHED-1 Conference and Schedule Generator

```text
Implement SCHED-1 — Conference and Schedule Generator v1.

Goal:
Generate legal schedules for fictional/custom conferences.

Deliver:
- ConferenceSchedulingRules
- Rivalry entity
- ScheduleGame entity
- schedule generator
- tests

Hard rules:
- no team plays itself
- no duplicate games
- protected rivalries scheduled if configured
- home/away balance attempted
- conference game count respected

Acceptance:
- generated schedule is valid
- protected rivalry included
- custom conference can generate schedule
- tests cover invalid cases
```

## Prompt: CREATOR-1 Custom School Creator Data Model

```text
Implement CREATOR-1 — Custom School Creator Data Model.

Goal:
Create the data model and validation for custom schools.

Deliver:
- CustomSchoolInput
- school creation validator
- structural power fields
- facility/NIL/town fields
- createSchoolFromInput function
- tests

Hard rules:
- created school must be real School entity
- no UI-only creator output
- invalid values rejected
- custom school must be save/load compatible

Acceptance:
- valid custom school created
- invalid custom school rejected
- custom school can join conference
- custom school survives save/load
```

## Prompt: TEST-1 Headless Sim and Invariant Harness

```text
Implement TEST-1 — Headless Sim and Invariant Harness.

Goal:
Create the testing foundation for long-run sim validation.

Deliver:
- headless sim runner scaffold
- invariant check registry
- validation report type
- anomaly type
- sample invariants
- tests

Initial invariants:
- no duplicate IDs
- no player on two rosters
- no team plays itself
- no duplicate games
- no invalid ProgramItem blocker state
- no invalid save metadata

Acceptance:
- npm script or callable function runs headless scaffold
- invariant registry executes
- failing invariant creates anomaly
- validation report exports JSON
```

## Prompt: LLM-2 Structured Meeting Interaction

```text
Implement LLM-2 — Structured Meeting Interaction Foundation.

Goal:
Create safe chat-like interactions where the user chooses structured options and LLM only writes flavor.

Deliver:
- MeetingContext type
- MeetingOption type
- MeetingOutcome type
- deterministic outcome handler
- narrative payload builder
- fallback text renderer
- tests

Hard rules:
- freeform LLM output cannot mutate state
- user choice determines simulation effect
- LLM only writes grounded language
- fallback works offline

Acceptance:
- player meeting with three choices works
- chosen option applies deterministic morale/trust effect
- narrative payload contains facts and forbidden claims
- fallback text produced without LLM
```
