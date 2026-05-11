# FM Save Deep Scan Pass 2 - Build Implications

Date: 2026-05-07

Purpose: convert the current save scan into concrete Campus Gridiron Manager implementation guidance. This does not copy FM content; it translates observed save-store boundaries into our own college-football domain tasks.

## Scan Status

- npm script: `npm run fm:save-scan`
- scan source bytes: `1,025,944,293`
- `tad.` sections: `1,271`
- largest packed record blocks: `342,204,536 bytes at 683739757; 276,342,963 bytes at 110088930; 112,062,280 bytes at 464994383; 109,950,118 bytes at 20586`

## Domain Boundaries Confirmed By Store Names

### Calendar And Fixtures

Observed tokens: `FIXTURE_RULES`, `FIXTURE_RECORD`, `FIXTURE_RESULT`, `FIXTURE_TO_PLAY_FULL`, `FIXTURE_TO_PLAY_QUICK`, `TEAM_FUTURE_FIXTURE`, `TRANSFER_WINDOW`, `TRANSFER_DEADLINE_DAY`.

CGM implication: build calendar as a queue of scheduled objects, not a rendered list. Games, windows, deadlines, visit dates, signing dates, training blocks, and media events should be durable records with lifecycle states.

First coding task: create `calendarEvents`, `eventDeadlines`, and `scheduledGames` stores plus selectors for current week, upcoming deadlines, and completed event history.

### Histories

Observed tokens: `PERSON_HISTORY`, `PLAYING_HISTORY`, `NON_PLAYING_HISTORY`, `PLAYER_STATS_HISTORY`, `INJURY_HISTORY`, `PERSON_YEAR_AWARD_HISTORY`, `COMP_HISTORY`, `PRESS_CONFERENCE_HISTORY`.

CGM implication: history is not one blob. Separate career history, stat history, injury history, award history, competition/program history, and press/media history.

First coding task: create append-only history stores and a player profile read model that composes them.

### Transactions

Observed tokens: `FULL_CONTRACT`, `CONTRACT_OFFER`, `LOAN_CONTRACT`, `TRIAL_CONTRACT`, `FAILED_CONTRACT_NEGOTIATION_INFO`, `FULL_TRANSFER_OFFER`, `PAST_TRANSFER`, `STARTING_FUTURE_TRANSFER`.

CGM implication: active negotiations, failed negotiations, current agreements, future moves, and past moves should be distinct objects.

First coding task: split recruiting/portal/NIL/staff moves into `activeOffers`, `negotiations`, `futureMoves`, and `completedTransactions`.

### People, Staff, And Scouting

Observed tokens: `SCOUTED_PERSON`, `SCOUTED_TEAM_INFO`, `NON_PLAYER_ATTRIBUTE_SNAPSHOT`, `NON_PLAYER_TENDENCY_ARRAY`, `PLAYER_ATTRIBUTE_SNAPSHOT`, `PLAYER_PROGRESS_OBSERVATION`.

CGM implication: scouted knowledge and staff/player snapshots are separate from true current attributes. This supports fog-of-war, scouting accuracy, and history comparisons.

First coding task: add `scoutingReports`, `attributeSnapshots`, and `staffTendencySnapshots`.

### World Stability

Observed tokens: `WORLD`, `EVENT`, `RETIREMENT`, `REGEN`, `NEWGEN`, `STAFFING_POLICY`, `CLUB_FINANCE`, `SQUAD_SELECTION_RULES`.

CGM implication: long saves need explicit lifecycle systems: yearly rollover, retirements/graduations, new recruit generation, staffing policy, finances, rules, and migration/repair passes.

First coding task: create a world tick runner with phases and invariant checks.

### Relationships And Promises

Observed tokens: `INTERACTION_CONVERSATION_HISTORY`, `INTERACTION_PROMISE`, `PROMISE`, `RELATIONSHIP`, `RIVALRY`.

CGM implication: conversations, promises, relationships, rivalries, and reactions should be records that future systems can read.

First coding task: create an interaction event store and promise lifecycle states.

### Training And Development

Observed tokens: `INDIVIDUAL_TRAINING_INFO`, `TACTICAL_TRAINING_DATA`, `POSITION_TRAINING`.

CGM implication: development is not just changing ratings. Store training assignments, positional development, snapshots, and progress observations separately.

First coding task: create training plan records and periodic development snapshots.

## Recommended Next Coding Direction

Build a thin vertical slice that proves this architecture before adding more screens:

1. Domain stores: calendar, history, transaction, scouting, interaction, training.
2. Actions: offer scholarship, schedule visit, advance week, record game result, generate inbox item.
3. Selectors: program desk, recruiting board, player profile, calendar.
4. Browser proof: click a recruit, offer, schedule visit, advance week, see profile/history/calendar/inbox update from the same durable records.

That slice directly attacks the current failure mode: menus that appear rich but do not function.
