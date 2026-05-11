# FM Save Deep Scan Pass 3 - CGM Gap Audit

Date: 2026-05-07

Purpose: compare the FM-derived durable-store boundaries against the current Campus Gridiron Manager codebase. This is not a source-copying exercise; it translates observed architecture boundaries into a practical keep/quarantine/build-next audit.

## Current Codebase Signal

The project is not empty scaffolding. It already has useful engine pieces:

- append-only action and event logs in `js/sim/persistence/action-log.js` and `js/sim/persistence/event-log.js`
- reducer/replay scaffolding in `js/sim/persistence/reducers.js`
- recruiting logic in `js/sim/recruiting/recruiting-v2.js`
- portal and retention logic in `js/sim/portal/portal-v2.js`
- NIL logic in `js/sim/nil/nil-engine.js`
- player development logic in `js/sim/dev/dev-engine.js`
- injury logic in `js/sim/injury/injury-engine.js`
- campus/media reaction logic in `js/sim/pulse/campus-pulse.js` and `js/sim/media/voices-engine.js`
- invariants in `js/sim/qc/invariants.js`
- UI workspaces for desk, schedule, portal, history, staff, and development

The problem is not absence of systems. The problem is that many systems are still module-local or screen-local instead of being coordinated through canonical durable stores and read models.

## FM Boundary Versus CGM Status

| FM-derived boundary | Current CGM status | Practical gap |
| --- | --- | --- |
| Calendar/future fixtures/windows/deadlines | Calendar data exists in `data/demo-world.js`, schedule UI exists, week advancement exists | Needs canonical `calendarEvents`, `eventDeadlines`, `scheduledGames`, lifecycle states, and selectors |
| Completed history | Event log exists; history UI exists; awards/injuries/stats modules exist | Needs separate append-only career, stat, injury, award, program, and media history stores |
| Transactions/negotiations | Recruiting, portal, NIL, staff modules exist; action log records decisions | Needs first-class active offers, negotiations, future moves, completed transactions, and failed negotiations |
| Scouting/snapshots | Scouting terms and dev snapshots exist in several modules | Needs durable `scoutingReports`, `attributeSnapshots`, and staff/player snapshot stores with timestamps and certainty |
| Interaction/promises/relationships | Promise and relationship concepts appear in recruiting/portal/pulse/logs | Needs promise lifecycle, conversation/interaction records, and relationship deltas as durable objects |
| Training/development | Development engine exists; development UI exists | Needs training assignment records, position training records, and periodic development observations |
| World tick stability | Week advancement, invariants, event/action logs exist | Needs an explicit phase-based world tick runner that calls modules in order and writes all outputs into canonical stores |
| Save migration/repair | Schema version and migration terms exist in persistence comments/code | Needs a visible migration registry with subsystem ownership and invariant repair passes |

## Keep

These are worth preserving as parts-bin modules:

- `js/sim/persistence/action-log.js`
- `js/sim/persistence/event-log.js`
- `js/sim/persistence/reducers.js`
- `js/sim/recruiting/recruiting-v2.js`
- `js/sim/portal/portal-v2.js`
- `js/sim/nil/nil-engine.js`
- `js/sim/dev/dev-engine.js`
- `js/sim/injury/injury-engine.js`
- `js/sim/pulse/campus-pulse.js`
- `js/sim/qc/invariants.js`
- existing UI helpers as display/reference material, not as the source of truth

## Quarantine

These patterns should not be expanded until the domain spine exists:

- screen-owned lists that are not backed by shared stores
- calendar entries that only exist as display agenda text
- recruiting actions that only adjust interest instead of creating offer/visit/contact records
- history views that summarize events without appending typed history records
- world advancement that directly mutates scattered state without a phase contract

## Build Next

Recommended next coding direction:

1. Add a `js/sim/domain/` layer with canonical store constructors and IDs.
2. Add `calendarEvents`, `eventDeadlines`, `scheduledGames`, `historyStores`, `transactionStores`, `scoutingStores`, `interactionStores`, and `developmentStores`.
3. Add a phase-based `world-tick-runner` that calls existing engines and writes to those stores.
4. Add selectors/read models for Program Desk, Recruiting Board, Player Profile, Calendar, and Inbox.
5. Wire one vertical slice: select recruit -> scout/contact/offer -> schedule visit -> advance week -> inspect calendar/history/inbox/player profile.

## Why This Helps Planning

The FM save work did not tell us to build "more data." It showed which boundaries must be first-class if the menus are going to function. The gap audit shows that CGM already has a lot of useful subsystem logic, but it needs a central domain spine before another visual pass.

The next planning choice is therefore narrow:

- Option A: build the domain spine and one functional vertical slice.
- Option B: keep wrapping existing modules screen by screen and accept that some clicks will stay fake until later.

Option A is the better next coding direction.
