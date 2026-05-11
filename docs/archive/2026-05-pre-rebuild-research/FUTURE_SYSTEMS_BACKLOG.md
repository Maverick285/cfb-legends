# Future Systems Backlog

_Last updated: 2026-05-05_

This backlog captures medium-to-longer-term systems that would make the FM Game world feel more alive, more reactive, and more worth inhabiting between simple menu actions.

The focus here is **systemic depth first**, then **presentation/immersion seasoning** once the core loops are stable.

---

## Guiding Principle

Prioritize features that:

1. create new meaningful decisions,
2. persist state across seasons,
3. cause believable consequences,
4. reinforce player/coach/world continuity,
5. improve the "why do I care about this save?" feeling.

---

## Recommended Build Order

1. **Relationship Graph + Shared History Ledger**
2. **Captaincy / Leadership Layer**
3. **Promise System + Contradiction Detection**
4. **Continuity Rewards for Staying at a School**
5. **AD / School President Expectations**
6. **Medical Redshirts**
7. **Advanced Metrics Layer**
8. **Lore / Program Memory Surfaces**
9. **Event Presentation Layer (cutscenes, clips, speeches)**

Why this order:
- relationships, leadership, and promises create the strongest systemic drama fastest
- continuity rewards and admin expectations make long careers matter
- advanced metrics and medical redshirts deepen the simulation
- lore and presentation become much more valuable once the world has memory

---

# 1) Relationship Graph + Shared History Ledger

## Goal
Make relationships between players, coaches, and programs persist across time instead of being implied and forgotten.

## Core Idea
Track who played with whom, who coached whom, who recruited whom, and how those relationships evolved.

## Systems
- player ↔ player relationship scores
- player ↔ coach trust / loyalty / friction
- coach ↔ coach history and familiarity
- school ↔ coach affinity
- shared-history ledger:
  - recruited together
  - started together
  - won conference together
  - survived rebuilding years together
  - promise kept / broken history

## Gameplay Payoff
- retention becomes more believable
- transfer decisions can reference real bonds
- captains and locker room tone become grounded in history
- recruiting can benefit from known pipelines and former-player loyalty
- staff hires can carry chemistry or baggage

## Dependencies
- none; this is foundational

## Suggested Data Shape
- `relationshipState.edges`
- `relationshipState.history`
- `relationshipState.programAffinity`

## Priority
**Very High**

---

# 2) Captaincy / Leadership Layer

## Goal
Let the user choose team captains and make leadership matter beyond flavor text.

## Systems
- assign 1-4 captains
- optional position-group leaders
- leadership traits:
  - vocal leader
  - lead-by-example
  - locker-room stabilizer
  - volatile alpha
- captain effects on:
  - morale floor
  - composure in big games
  - retention stability
  - development buy-in
  - response to losing streaks

## Gameplay Payoff
- meaningful preseason and midseason leadership decisions
- easier emotional attachment to specific players
- ties directly into speeches, rivalry games, adversity, and continuity

## Dependencies
- works best after relationship graph exists

## Priority
**Very High**

---

# 3) Promise System + Contradiction Detection

## Goal
Allow recruiting/retention promises that can help in the short term and hurt later if mishandled.

## Promise Types
- starting role
- early playing time
- no redshirt
- development focus
- position fit / scheme fit
- NIL support emphasis
- playoff / title contention pitch
- staff continuity
- culture / family / loyalty pitch

## Key Twist
Promises can be **contradictory**.

Examples:
- two players promised the same starting slot
- multiple recruits promised unrealistic early snaps
- transfer retention promises that clash with roster reality

## Consequences
- promise trust score
- discovery chance
- locker room resentment
- decommit / transfer risk
- media / donor / staff concern if a lie becomes visible

## Gameplay Payoff
This can become one of the best systemic drama engines in the game.

## Dependencies
- benefits from relationship graph
- benefits from role/depth awareness

## Priority
**Very High**

---

# 4) Continuity Rewards for Staying at a School

## Goal
Make long-term tenure at a school materially rewarding instead of mostly cosmetic.

## Systems
As a coach stays longer:
- donor trust grows
- contract leverage improves
- NIL support deepens
- recruiting momentum compounds
- alumni / pipeline loyalty improves
- morale stabilizes faster after losses
- staff retention improves
- institutional patience increases during bad stretches

For players who stay:
- legacy / loyalty bonus
- leadership growth
- stronger chemistry network
- fan attachment
- boosted NIL / local brand opportunities

## Gameplay Payoff
- rebuilds feel distinct from job-hopping careers
- staying put becomes a strategic choice, not just sentimental

## Dependencies
- relationship graph helps a lot

## Priority
**High**

---

# 5) Athletic Director / School President Expectations

## Goal
Split institutional pressure into believable stakeholders instead of one generic pressure score.

## Stakeholders
### Athletic Director
Cares more about:
- wins
- rivalries
- recruiting class strength
- postseason berths
- revenue / attendance / donor tone

### School President
Cares more about:
- discipline
- academics
- scandal avoidance
- reputation
- sustainable culture

## Gameplay Payoff
- pressure becomes more nuanced
- conflicting expectations create better tension
- job security can feel more realistic

## Dependencies
- can reuse existing pressure infrastructure

## Priority
**High**

---

# 6) Medical Redshirts

## Goal
Add realistic eligibility handling when injuries derail a season.

## Systems
- injury game-count tracking
- automatic eligibility checks
- approval/denial outcomes
- player morale reaction to lost year vs preserved year
- roster planning consequences

## Gameplay Payoff
- increases realism
- creates better injury recovery stories
- improves long-term roster management

## Dependencies
- modest; mostly season/injury bookkeeping

## Priority
**High**

---

# 7) Advanced Metrics Layer

## Goal
Deepen the football simulation using modern stat lenses that help decision-making.

## Possible Metrics
- EPA/play
- success rate
- explosive play rate
- havoc rate
- stuff rate
- pressure rate
- red zone efficiency
- early-down pass rate
- finishing drives
- third/fourth down aggressiveness

## Use Cases
- scouting opponents
- evaluating coordinators
- explaining wins/losses
- judging player development and scheme fit
- informing AD/booster/media narratives

## Gameplay Payoff
- analytics room becomes more credible
- helps distinguish coaching styles and program identities

## Dependencies
- stronger once game simulation outputs support richer play/result detail

## Priority
**Medium-High**

---

# 8) Lore / Program Memory Surfaces

## Goal
Make the save feel like a world with history, myth, and accumulated texture.

## Systems
- coaching tree
- rivalry timeline
- iconic classes
- best seasons
- program legends
- famous upsets / collapses
- school traditions
- alumni memory
- "played/coached together" records

## Surfaces
- History room
- Scrapbook
- player/coaches profiles
- rivalry ledger
- season review pages

## Gameplay Payoff
- creates emotional continuity
- makes long saves rewarding to revisit
- supports immersion without requiring moment-to-moment UI polish

## Dependencies
- relationship/history ledger first

## Priority
**Medium-High**

---

# 9) Event Presentation Layer

## Goal
Use occasional high-impact presentation moments to reward important events.

## Candidate Moments
- signing day
- locker room speech
- rivalry game intro
- runout / tunnel moment
- bowl berth / playoff reveal
- captain announcement
- senior day
- major injury return
- championship celebration

## Media Ideas
- short real audio/video clips
- lightweight cutscenes
- stylized overlays / title cards
- ambient crowd / booth / locker room snippets

## Important Constraint
This should remain **rare and event-driven** so it feels special instead of slowing down the sim.

## Dependencies
- best after important systems already produce meaningful moments

## Priority
**Medium**

---

# Cross-Cutting Supporting Systems

## A) Contradiction / Credibility Engine
Shared logic that checks whether the program is making promises or claims that conflict with reality.

Examples:
- too many promised starters
- NIL promises that exceed plausible support
- staff promises after a coordinator is about to leave
- title-contender pitch during visible collapse

## B) Trust / Reputation Score
Tracks whether players, recruits, staff, donors, and admins believe the coach follows through.

## C) Event Memory Tags
Short structured tags that future systems can reference:
- `captain-chosen`
- `promise-broken`
- `medical-redshirt-granted`
- `five-year-tenure-hit`
- `signed-top-class`
- `won-rivalry-streak`

These will make future lore and narrative surfaces much easier to build.

---

# Practical First Slice Recommendation

If starting tomorrow, the best first slice is:

## Slice 1: Relationships + Captains
- add lightweight relationship/history scaffolding
- add captain selection
- connect captains to morale/locker room tone/retention modifiers
- surface captaincy and relationship notes in roster/player/desk views

## Slice 2: Promises
- formalize promise records
- show active promises in player/prospect context
- add contradiction checks
- create fallout events when lies or conflicts are discovered

## Slice 3: Continuity + Admin Pressure
- tenure bonuses
- AD/President expectations
- donor confidence as a more explicit lever

That sequence gives the game a much stronger "living world" feel without needing fancy presentation first.

---

# Shortlist: Best Features for Immediate Emotional Impact

If choosing only a few to maximize player attachment quickly:

1. **Choose captains**
2. **Persistent relationship memory**
3. **Promises that can be broken**
4. **Contradiction fallout**
5. **Tenure / continuity rewards**

These are the features most likely to make users say:
> "This save remembers what happened to my people."

---

# Notes

- Build systemic memory before heavy cutscene work.
- Prefer features that create reusable state over one-off spectacle.
- Presentation becomes much more powerful once the game can truthfully say why a moment matters.
