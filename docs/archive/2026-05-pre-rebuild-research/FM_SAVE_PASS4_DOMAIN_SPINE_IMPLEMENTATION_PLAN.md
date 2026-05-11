# FM Save Deep Scan Pass 4 - Domain Spine Implementation Plan

Date: 2026-05-07

Purpose: convert the FM-derived save/store boundaries and the CGM gap audit into the first coding plan. This stays architecture-level and avoids copying FM implementation or content.

## Planning Conclusion

The next coding work should not be a full rewrite and should not be a broad UI pass. It should add a small canonical domain spine that existing engines can write into, then prove one recruit-centered vertical slice.

The existing project already has browser-global modules for logs, reducers, engines, and invariants. That means the domain spine can be implemented in the same style first, then upgraded later if the project moves to bundled modules or a database.

## Proposed New Files

Add these files under `js/sim/domain/`:

| File | Responsibility |
| --- | --- |
| `ids.js` | deterministic ID helpers for domain records |
| `stores.js` | constructors for canonical store collections |
| `calendar-store.js` | `calendarEvents`, `eventDeadlines`, `scheduledGames` |
| `history-store.js` | career, stat, injury, award, program, media history appenders |
| `transaction-store.js` | active offers, negotiations, future moves, completed transactions, failed negotiations |
| `scouting-store.js` | scouting reports and attribute/staff snapshots |
| `interaction-store.js` | conversation records, promise lifecycle, relationship deltas |
| `development-store.js` | training plans, position training, development observations |
| `world-tick-runner.js` | phase-based advance-week runner that calls existing engines and appends outputs |
| `selectors.js` | read models for Program Desk, Recruiting Board, Player Profile, Calendar, Inbox |

## Store Shape

The first version can be plain object arrays with indexes rebuilt on load:

```js
{
  schemaVersion: 1,
  calendarEvents: [],
  eventDeadlines: [],
  scheduledGames: [],
  histories: {
    career: [],
    stats: [],
    injuries: [],
    awards: [],
    program: [],
    media: []
  },
  transactions: {
    activeOffers: [],
    negotiations: [],
    futureMoves: [],
    completed: [],
    failedNegotiations: []
  },
  scouting: {
    reports: [],
    attributeSnapshots: [],
    staffSnapshots: []
  },
  interactions: {
    conversations: [],
    promises: [],
    relationshipDeltas: []
  },
  development: {
    trainingPlans: [],
    positionTraining: [],
    observations: []
  }
}
```

This mirrors the useful lesson from the FM save: current state, future queued state, completed history, and transaction/negotiation state are separate durable record families.

## Existing Modules To Wrap First

| Existing module | Use in the first slice |
| --- | --- |
| `js/sim/persistence/action-log.js` | record user decisions like scout/contact/offer/schedule visit/advance week |
| `js/sim/persistence/event-log.js` | record facts created by actions and world ticks |
| `js/sim/persistence/reducers.js` | keep as replay precedent, but extend later after domain actions stabilize |
| `js/sim/recruiting/recruiting-v2.js` | compute interest/reason codes; do not let it own durable offer/visit state |
| `js/sim/portal/portal-v2.js` | later transaction input; not first vertical slice |
| `js/sim/nil/nil-engine.js` | later NIL offer detail; not first vertical slice |
| `js/sim/dev/dev-engine.js` | later development observations during advance-week |
| `js/sim/injury/injury-engine.js` | later injury history during game/week ticks |
| `js/sim/pulse/campus-pulse.js` | read event log after the vertical slice emits real events |
| `js/sim/qc/invariants.js` | add domain-store invariants after the first store constructors exist |

## First Vertical Slice

The first slice should prove this exact flow:

1. Load/create domain stores.
2. Select one recruit.
3. `scoutRecruit(prospectId)`:
   - append action log record
   - add scouting report
   - add attribute snapshot with certainty
   - append event log record
4. `contactRecruit(prospectId)`:
   - append action log record
   - add interaction/conversation record
   - add relationship delta
   - append event log record
5. `offerScholarship(prospectId)`:
   - append active offer transaction
   - append recruiting history entry
   - append action and event log records
6. `scheduleOfficialVisit(prospectId, date/week)`:
   - append calendar event
   - append deadline/follow-up if needed
   - link calendar record to prospect and offer
7. `advanceWeek()`:
   - run phase list
   - mature calendar event states
   - evaluate offer/visit reactions
   - append inbox-driving events
   - run invariants
8. Read models confirm that Calendar, Inbox, Recruiting Board, and Player Profile all reflect the same underlying records.

## Initial Action API

Recommended action names:

- `CGM_DOMAIN_ACTIONS.scoutRecruit(domain, payload)`
- `CGM_DOMAIN_ACTIONS.contactRecruit(domain, payload)`
- `CGM_DOMAIN_ACTIONS.offerScholarship(domain, payload)`
- `CGM_DOMAIN_ACTIONS.scheduleOfficialVisit(domain, payload)`
- `CGM_DOMAIN_ACTIONS.advanceWeek(domain, payload)`

Payloads should include:

- `actorId`
- `programId`
- `prospectId`
- `season`
- `week`
- `reasonCodes`

Every action should return:

```js
{
  domain,
  action,
  events,
  changedRecords,
  invariantResults
}
```

## Selectors To Build Immediately

| Selector | Must prove |
| --- | --- |
| `getRecruitingBoardView(domain, programId)` | offer/contact/scout/visit statuses come from durable records |
| `getPlayerProfileView(domain, personId)` | profile timeline composes history, scouting, offers, interactions |
| `getCalendarView(domain, season, week)` | visits/deadlines/games come from queued calendar records |
| `getInboxView(domain, programId)` | inbox items are derived from event/action records, not static text |
| `getProgramDeskView(domain, programId)` | current week, next deadline, top action, and recent events agree |

## Tests To Add First

Add a deterministic harness scenario, probably in `harness/scenarios/registry.js` after the domain files exist:

`recruit_offer_visit_vertical_slice`

Assertions:

- scouting creates one scouting report and one attribute snapshot
- contact creates one conversation and one relationship delta
- offer creates one active offer and one recruiting history entry
- scheduling creates one calendar event linked to the prospect
- advancing week changes the event lifecycle and emits at least one event-log item
- all four read models reference the same prospect/offer/calendar IDs

## Decision

Use this as the immediate coding plan when implementation resumes:

1. Build the domain store constructors.
2. Build the five recruit-centered actions.
3. Build the five selectors.
4. Add the deterministic harness scenario.
5. Only then wire the visible UI buttons to these actions.

This lets the existing engines remain useful while preventing another round of rich-looking screens with isolated state.
