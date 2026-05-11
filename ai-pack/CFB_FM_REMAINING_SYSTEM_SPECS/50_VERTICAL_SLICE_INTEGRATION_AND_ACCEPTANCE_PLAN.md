# 50 — Vertical Slice Integration and Acceptance Plan

## North Star

The project must avoid building endless isolated modules.

A vertical slice proves the game loop.

The first serious vertical slice should let the user:

```text
start career
generate world
view Program Desk
advance time
manage roster
recruit one class
set practice
simulate games with structured stats
finish season
sign recruits
save/load
view history
run validation
```

## Vertical Slice 0 — Shell Truth

Goal:

- app starts
- world generates
- save/load works
- Continue advances week
- Program Desk shows real items
- no fake data

Required systems:

- repo
- RNG
- config loader
- GameWorld
- save/load
- ProgramItem model
- app shell

Acceptance:

- deterministic generated world
- round-trip save/load
- Continue changes week

## Vertical Slice 1 — Game Truth

Goal:

- play generator creates structured plays
- stats engine creates box score
- game sim completes
- schedule has games

Required systems:

- schedule
- game state
- PlayEvents
- Stats Engine
- reconciler
- plain play text

Acceptance:

- one game sim reconciles
- season can simulate games
- box scores are from plays

## Vertical Slice 2 — Roster Truth

Goal:

- players exist
- depth charts exist
- team ratings come from players
- player stats accumulate
- eligibility shell works

Required systems:

- player entity
- roster table
- depth chart
- team ratings
- game stats

Acceptance:

- better roster affects game outputs
- player stats persist

## Vertical Slice 3 — Recruiting Truth

Goal:

- prospects exist
- board works
- interest works
- commits/signing work
- signed recruit becomes player

Required systems:

- prospect lifecycle
- scouting
- interest engine
- recruiting board
- signing conversion

Acceptance:

- one recruiting class signs
- future roster changes

## Vertical Slice 4 — Development Truth

Goal:

- practice affects development
- team vibe/morale exist
- players improve/stagnate/regress

Required systems:

- practice time units
- development tick
- team vibe
- player reports

Acceptance:

- practice choices have consequences
- not all players improve

## Vertical Slice 5 — Modern Roster Truth

Goal:

- NIL and portal affect behavior

Required systems:

- NIL market
- clearinghouse
- transfer risk
- retention meetings
- portal search

Acceptance:

- player can leave
- user can try to retain
- NIL creates tradeoffs

## Vertical Slice 6 — World Truth

Goal:

- AI schools act
- seasons matter
- history persists

Required systems:

- AI school manager
- recruiting AI
- portal AI
- draft
- awards
- records
- history

Acceptance:

- 5-season sim has plausible world movement

## Personal Playable Alpha

Required:

- Vertical Slices 0–3
- basic practice from Slice 4
- one-season headless sim
- no blocker bugs
- save/load stable
- Program Desk usable

## FM-Like Beta

Required:

- Vertical Slices 0–6
- 20-season validation
- dense UI pass
- Data Lab
- custom schools/conferences
- optional LLM narrative
- optional portraits/assets
- no core shallow systems

## Acceptance Standards

Every vertical slice must have:

- user flow
- data model
- sim logic
- UI
- save/load
- tests
- validation
- known limitations

## Do Not Add Before Alpha Unless Needed

- stadium builder
- uniform designer
- full career mode
- full play designer
- AI-generated fight songs
- extensive town flavor
- 2D visualizer
- social media depth

These are expansion/immersion layers.

## Add Early If Useful For Testing

- Data Lab
- Commissioner editor basics
- debug exports
- custom school simple creator
- sandbox presets

## Final Acceptance Question

After each vertical slice, ask:

```text
Can the user hit Continue and see real consequences?
```

If not, the slice is not complete.
