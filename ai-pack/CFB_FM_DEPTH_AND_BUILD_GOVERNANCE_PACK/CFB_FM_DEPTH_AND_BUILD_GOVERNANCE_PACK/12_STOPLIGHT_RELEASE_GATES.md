# Stoplight Release Gates

## Purpose

This document defines when the project can move between development phases.

---

# Gate Colors

## Red

Do not proceed.

Examples:

- save/load broken
- deterministic sim broken
- core tests failing
- major UI-only state
- recruiting signs duplicate players
- Continue bypasses blocking events
- LLM controls sim facts

## Yellow

Proceed only if recorded.

Examples:

- scaffolded UI exists
- limited placeholder
- partial tests
- feature not integrated yet
- balance not validated
- known bug with workaround

## Green

Proceed.

Examples:

- tests pass
- persistence works
- consequences proven
- event hooks exist
- validation acceptable for current stage

---

# Alpha Gate

Before playable alpha:

- [ ] app starts
- [ ] save/load works
- [ ] deterministic RNG works
- [ ] world generation works
- [ ] calendar/Continue works
- [ ] basic inbox works
- [ ] roster table works
- [ ] player profiles work
- [ ] prospect generation works
- [ ] recruiting board works
- [ ] basic practice works
- [ ] basic game sim works
- [ ] structured play-by-play exists
- [ ] basic NIL exists
- [ ] one-season headless sim works
- [ ] core invariants pass

Red blockers:

- no save/load
- no deterministic sim
- UI-only core state
- no tests

---

# Beta Gate

Before FM-like beta:

- [ ] recruiting reaches depth score 5
- [ ] development reaches depth score 5
- [ ] practice reaches depth score 5
- [ ] NIL/clearinghouse reaches depth score 5
- [ ] staff reaches depth score 4+
- [ ] play-by-play reaches depth score 4+
- [ ] draft reaches depth score 4+
- [ ] AI schools behave plausibly
- [ ] 20-year sim passes validation
- [ ] UI density pass complete
- [ ] Data Lab works
- [ ] custom schools/conferences work
- [ ] LLM/asset services optional
- [ ] history persists

Red blockers:

- 20-year sim nonsense
- AI schools broken
- recruiting imbalance
- talent inflation
- unexplainable results
- no long-run validation

---

# Personal Release Gate

Before calling a build “good enough to play seriously”:

- [ ] can play 5 seasons without crash
- [ ] recruiting feels meaningful
- [ ] development creates surprises
- [ ] NIL creates tradeoffs
- [ ] practice matters
- [ ] losses make sense
- [ ] wins feel earned
- [ ] players have identities
- [ ] schools rise/fall causally
- [ ] no dominant exploit discovered
- [ ] you want to hit Continue again

---

# Expansion Gate

Do not add expansion features until core loops work.

Expansion features include:

- stadium builder
- uniform designer
- full play designer
- career mode
- conference commissioner mode
- full town immersion packs
- AI fight songs
- 2D visualizer

Allowed earlier only if they support core testing or creator foundations.

---

# Feature Freeze Rule

When approaching alpha or beta, stop adding ideas.

Switch to:

- bug fixing
- integration
- balance
- UI friction
- long-run validation
- content repetition reduction

A deep smaller game beats a giant shallow one.
