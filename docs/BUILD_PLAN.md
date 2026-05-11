# Campus Gridiron Manager Build Plan

Date: 2026-05-07

## Correction

The next step is not adding recruiting, staff, NIL, portal, or game-week features.

The next step is building the bones:

```text
working app shell -> durable world state -> selectors -> one tiny proof action
```

The old code should be treated as a parts bin. Useful engines can be reused later, but they should not drive the rebuild until the foundation is coherent.

## North Star

Build a college football management sim where the menus are the game:

- cohesive desktop app shell
- every screen has a clear object, route, and state source
- every important click mutates durable state
- every visible number/text can be traced back to a record
- save/load preserves the world
- UI is dense and professional, not decorative

## Build Philosophy

Do not build breadth first.

Do not start with:

- a full recruiting system
- a full roster system
- a full schedule system
- a full game engine loop
- a full intro cinematic/start flow
- more generated screens

Start with a minimal, boring, reliable app foundation.

The intro-to-first-game journey remains the long product pipeline, but it is not the first coding task. It is the acceptance path after the foundation exists.

## Milestone Overview

| Milestone | Name | Goal |
| --- | --- | --- |
| M0 | App Foundation | New cohesive shell, route system, state container, save/load, empty domain spine |
| M1 | Start Career Foundation | Start screen creates a real world and lands in a working Program Desk |
| M2 | First Real Object Loop | One object type is fully clickable and state-backed |
| M3 | Time Control | Continue advances time through explicit phases |
| M4 | Preseason Slice | Roster/calendar/recruiting placeholders become real enough to prepare for game week |
| M5 | First Game Slice | First game preview, sim, result, stats/history write |
| M6 | Postgame Loop | Recap, inbox, history, and next-week state agree |
| M7 | Broaden Features | Expand recruiting, portal, NIL, staff, development using existing engines |

## M0 - App Foundation

Purpose: replace the incoherent shell with a stable base before any feature work.

Build:

- new app boot path
- stable route registry
- stable left sidebar
- top bar with date/search/continue placeholder
- object header pattern
- tab/action/filter bar pattern
- right inspector pattern
- status/footer area
- app-level state container
- empty domain store container
- save/load/reset hooks
- error boundary/startup validation
- one deterministic smoke test

Allowed screens:

- Start
- Program Desk
- Roster
- Recruiting
- Calendar
- Inbox
- Player/Profile placeholder
- Settings/Debug

These screens may be skeletal, but they must be cohesive and route correctly.

Domain stores in M0 should be empty/simple constructors only:

- `world`
- `programs`
- `people`
- `calendarEvents`
- `actions`
- `events`
- `history`
- `ui`

M0 proof action:

- click one seeded player/person row
- route to that person profile
- inspector/header update from the same person record
- save/load preserves selected career/world state

Acceptance gate:

- app opens cleanly
- Start screen works
- route changes work
- sidebar active states work
- Program Desk renders from selectors, not hardcoded screen text
- one row click opens an object profile
- save/load roundtrip works
- no screen needs fake generated paragraphs to appear complete

## M1 - Start Career Foundation

Purpose: make the intro screen create a real minimum world.

Build:

- new career button
- choose one fictional/default program
- initialize world seed
- initialize date/week
- initialize minimal roster/person list
- initialize minimal calendar
- initialize action/event logs
- persist save schema
- land on Program Desk

Acceptance gate:

- user can start career from a clean load
- Program Desk shows real current week/program/person counts
- save/load returns to the same career
- debug view can show the raw world/state

## M2 - First Real Object Loop

Purpose: prove object-driven UI before feature depth.

Recommended object: player/person.

Build:

- roster table from `people` records
- player profile route
- object header
- tabs: Overview, History, Development placeholder, Actions
- one action: add/remove watchlist or set development focus
- action log write
- event/history write only if appropriate
- selector refresh

Acceptance gate:

- click player in roster
- profile opens
- action mutates durable state
- Program Desk or Inbox can show that action if relevant
- save/load preserves it

## M3 - Time Control

Purpose: make Continue a real app primitive.

Build:

- phase-based `advanceWeek`
- blocker list
- action/event log entries
- calendar event state changes
- invariant checks
- simple generated inbox item from world tick

Acceptance gate:

- Continue either blocks with a reason or advances one week
- calendar/week changes are durable
- inbox/event log reflects the tick
- save/load preserves the new week

## M4 - Preseason Slice

Purpose: add only the minimum systems needed to prepare for the first game.

Build:

- depth chart shell backed by records
- calendar game event
- basic staff recommendation
- basic recruiting board as real records, but shallow
- basic practice/development focus

Acceptance gate:

- user can resolve obvious first-game blockers
- no broad recruiting/portal/NIL complexity yet

## M5 - First Game Slice

Purpose: reach the first game with enough durable state to make the result matter.

Build:

- game preview route
- opponent/game calendar event
- depth chart validity
- sim first game using existing engine as parts-bin
- write result
- write team/player stat records
- write history/event records

Acceptance gate:

- first game completes
- result is visible on schedule, Program Desk, history, and relevant profiles
- save/load preserves result

## M6 - Postgame Loop

Purpose: make the first result feed the menu game.

Build:

- postgame recap
- inbox/news from event records
- player history/stat profile updates
- next-week calendar state
- simple morale/reputation reaction

Acceptance gate:

- after first game, the world has changed in visible, traceable ways

## M7 - Broaden Features

Purpose: only after the app works, start pulling old engines back in.

Possible imports:

- recruiting depth
- transfer portal
- NIL
- staff carousel
- player development
- injuries
- campus pulse
- awards/history
- richer game simulation

Acceptance gate:

- each imported engine writes through the domain spine and selectors
- no engine owns screen-local state

## Immediate Coding Target

Start M0 only.

Do not implement recruiting actions yet.

Build a cohesive app foundation with:

1. route registry
2. shell layout
3. state container
4. empty domain stores
5. selectors
6. save/load
7. one person row -> profile proof click

