# 01_GUIDING_LIGHT

> Use this file as an instruction set for the AI working on the project.

**Read after:** 00_START_HERE.md
**Primary outputs required:**
- A stable product thesis that will not drift with short-term implementation decisions
- A clear set of design commandments that all later docs must obey
- A one-paragraph master brief that can be pasted into any AI session
**Stop when:**
- The AI can explain the game in one paragraph, one page, and one roadmap without contradiction
- The AI can reject scope creep by pointing to an explicit commandment in this file
- All later docs can inherit terminology and priorities from this file

## Canonical one-sentence mission

Create the best **information-dense, menus-first, college-football program management sim** possible: a game about running a modern program across recruiting, retention, staffing, eligibility, finance, culture, and postseason pressure — with the on-field engine arriving later.

## Canonical product thesis

This game is a **program builder**, not a play-caller with spreadsheets glued on top.

The player should feel like the adult in the room who has to make the hard decisions nobody else wants:
- who to recruit
- who to keep
- who to redshirt
- who to promise
- who to pay
- who to cut loose
- which staff to trust
- which risks to absorb
- how to survive a season while building the next three

The game’s emotional core is this:

> **You are not merely trying to win Saturday. You are trying to keep the whole machine from flying apart while turning it into a contender.**

That is why menus matter more than graphics at the start. The soul of the game lives in information flow, decision weight, and consequences over time.

## What the player fantasy must be

The player fantasy is **Head Coach + Program Architect**.

In early versions, the user may control both coaching and front-office authority because it simplifies the loop and exposes the full management game. Later versions can allow narrower role paths, but the first version should let the player act across:
- roster construction
- recruiting
- portal strategy
- staffing
- development
- program finance and resource allocation
- postseason positioning
- long-term institutional strategy

The player should feel these tensions constantly:
- immediate wins vs long-term sustainability
- high school recruiting vs portal patching
- player development vs roster churn
- donor pressure vs actual roster needs
- academic stability vs raw talent
- program identity vs opportunistic adaptation

## What the game is

This game is:

- a modern college-football management sim
- desktop-first and mouse/keyboard-first
- menu-heavy and text-rich
- single-player-first in the beginning
- deterministic at the simulation core
- flexible enough to support fictional and licensed content packs later
- structured around a yearly loop with weekly decision spikes
- built so the first playable version works before any advanced visual match layer exists
- similar to a Football Manager skin swap

## What the game is not

This game is **not**:

- a NCAA/EA brand clone
- an arcade football game with dynasty menus
- a 3D stadium project pretending to be a management game
- a lore-only campus visual novel
- a legal-contract simulator
- a pure spreadsheet sandbox with no emotional framing
- a shallow “coach career” game where roster, money, and rules are flavor text

## The non-negotiable design commandments

### 1. Build the office before the stadium

The first playable version is a management game, not a match presentation game.

### 2. Research the decision, not the pixels

Benchmark products are useful because they reveal how experts package decisions. They are not blueprints to be copied.

### 3. Every screen must answer a real management question

No decorative screens. No “cool” screens that do not change action.

### 4. Rules must be versioned and data-driven

Current college-football rules are too unstable to hardcode. Every volatile rule needs:
- a ruleset identifier
- an effective date range
- a last-verified date
- source references
- a confidence label
- a watchlist flag if likely to change

### 5. The first deep system is roster management

Roster pressure is the heart of modern college football. Recruiting, portal, development, eligibility, and benefit allocation must all feed into it.

### 6. Information density beats visual spectacle

The interface should reward the player for knowing the world better, not for clicking through giant animated panels.

### 7. Delegation matters

The player must be able to automate routine work and reclaim control of high-leverage choices.

### 8. The world must remember

History matters. Rivalries, coaches, awards, records, and past seasons must accumulate and remain explorable.

### 9. The sim core must run without the UI

If a system cannot run headless, it is not ready.

### 10. Legal distinctness is a product requirement

Distinct naming, screen organization, interaction patterns, art direction, and content strategy are not optional polish. They are core requirements.

### 11. Fiction-first content is mandatory

Prototype with fictional schools, players, and assets. Licensing is a later layer.

### 12. No feature exists outside a loop

If a feature does not clearly belong to a yearly, weekly, or moment-to-moment loop, cut it or redefine it.

## Core product pillars

### Pillar A: Run the whole program

The user must feel the pressure of managing a living institution, not just a depth chart.

### Pillar B: Modern college football, not nostalgia cosplay

The game must reflect the contemporary college-football reality: recruiting, transfer movement, benefit expectations, shifting postseason logic, and front-office style staffing.

### Pillar C: Dense but legible decision making

High information density is good. Confusion is not. The UI should feel like a powerful cockpit, not a filing cabinet explosion.

### Pillar D: Consequences across years

A great season should shape the next three. A bad recruiting cycle should hurt. A staff hire should matter later. Shortcuts should leave scars.

### Pillar E: Stories emerge from systems

Most memorable moments should come from the interaction of systems: the failed retention push, the backup who develops, the donor-driven facility upgrade, the late CFP jump, the transfer who changes a rivalry.

## Design priorities in order

When forced to choose, prioritize in this order:

1. clear decisions
2. simulation integrity
3. save stability
4. information density and speed
5. long-term consequences
6. narrative quality
7. visual polish
8. audiovisual spectacle

## Release ladder

### Prototype
Small fictional world. Menus-first. Yearly loop works. Box scores only.

### Alpha
Core systems integrated: recruiting, portal, staff, eligibility, benefits, standings, postseason, history, saves.

### Beta
Deeper balancing, stronger analytics, better narrative/news, more world content, longer-term stability.

### 1.0
Full management experience with mature AI, strong history layer, polished UX, and an upgraded but still optional match visualization path.

### Post-1.0
2D/3D visualization, online leagues, deeper content packs, mod tools, historical eras, role-specialized careers.

## Scope discipline rules

Cut or delay any idea that violates one of these:

- It requires a match engine before the yearly loop works.
- It requires licensed content before the fictional prototype is fun.
- It creates a giant art/content burden without deepening management.
- It cannot be tested deterministically.
- It does not change a meaningful decision.
- It makes the UI slower without increasing clarity or control.

## The “guiding light” test for every decision

Before approving a feature, answer these questions:

1. What management question does this help answer?
2. Which loop does it belong to?
3. What consequence does it create over time?
4. Could this be done with less art and more systemic depth?
5. Does it move the project toward the first playable management loop?
6. Does it keep the game legally distinct?
7. Can it be run and tested headless?

If the answer to two or more is “no,” do not build it yet.

## Success criteria for the first real playable version

The first real playable version succeeds if a player can:

- pick a school
- evaluate the inherited roster
- plan the depth chart now and next year
- run recruiting and portal activity
- track eligibility and redshirt status
- manage staff and delegation
- allocate resources and benefit priorities
- simulate a full season
- see standings, rankings, and postseason progression
- review history and trophy progress
- reach the next offseason with coherent world state and stable saves

## Failure modes to avoid

This project fails if it becomes any of the following:

- a UI shell with no systemic consequences
- a codebase where rules are scattered across features
- a football engine demo with fake management menus
- a benchmark-copying exercise
- a content burden that requires licensing before the design works
- a stats dump that never turns into actual decisions

## Canonical one-paragraph brief to paste into any AI session

Build a legally distinct, desktop-first, menus-first college-football program management sim. The first goal is not a match engine; it is a complete yearly management loop built around roster construction, recruiting, portal strategy, staffing, player development, eligibility, finance/benefit pressure, standings, and postseason consequences. Prototype with fictional schools and players. Keep all volatile sport rules versioned and data-driven. Every screen must answer a real management question. Every system must run headless for testing. Build the office before the stadium.

## Immediate deliverable after reading this file

Write a short “project creed” using this file’s language only. It should be no more than 12 bullet points and should become the persistent summary the AI reuses before every major task.

Then continue to `02_AI_SESSION_PROTOCOL.md`.
