# 10_SIMULATION_SYSTEMS

> Use this file as an instruction set for the AI working on the project.

**Read after:** 09_DATA_MODEL_AND_CONTENT_PIPELINE.md
**Primary outputs required:**
- A full systems-design blueprint for how the world advances over time
- Clear contracts for each major subsystem and how they interact
- A practical first-version simulation plan that supports menus before play-by-play depth
**Stop when:**
- The AI can describe exactly what happens when the player presses Continue
- The project can simulate a season headlessly with deterministic results from a fixed seed
- Every major menu screen has at least one backing subsystem and event source

## Simulation thesis

The simulation is not one giant black box. It is a set of coordinated subsystems that each answer a different question.

Examples:
- Who is interested in my school?
- Who wants to leave?
- Who can still redshirt?
- Why did donor confidence fall?
- Why did we move from rank 11 to rank 8?
- Why is the AD suddenly pressuring me on facilities?

The player must be able to feel the consequences of these systems through menus and messages.

The simulation should therefore be:
- deterministic from a known seed
- explainable at a high level
- decomposed into subsystems
- testable in isolation
- staged so the box-score engine arrives before any deep match presentation

## First-principles rules for simulation design

### 1. Menus drive the design
If a system does not produce useful state for a menu, alert, or long-term consequence, it is probably premature.

### 2. Deterministic core, noisy presentation
The simulation logic should be deterministic. Presentation text can vary more freely as long as it does not rewrite reality.

### 3. Weekly tension, yearly memory
The game should feel sharp week to week but meaningful year to year.

### 4. Every important outcome should have a reason trail
The user does not need full math exposure, but the project should be able to explain:
- major commitments
- transfer exits
- ranking movement
- redshirt loss
- AD/fan/donor swings
- recruiting board changes

### 5. Placeholder game resolution is acceptable early
A credible box score with solid consequences is far more valuable than a shallow visual match layer.

## Canonical time model

Use explicit phases. At minimum:

- preseason setup
- recruiting preseason
- regular season
- rivalry / late-season stretch
- conference championship week
- postseason selection
- playoff / bowls
- roster retention and exits
- winter portal window
- offseason staff and finance cycle
- class rollover / new prospects
- spring development phase
- preseason reset

Within phases, use:
- day
- week
- special deadlines

The player’s primary advance action is **Continue**. Continue should process the smallest meaningful unit of time while respecting blocking items and scheduled events.

## Recommended order of operations for a Continue step

When the player advances time, process in this order unless a ruleset overrides it:

1. gather pending user commands
2. validate commands against active ruleset and phase
3. commit accepted commands to domain state
4. process immediate resulting events
5. advance day/week/phase clock
6. run scheduled subsystem ticks for the new time slice
7. resolve games if game day
8. resolve rankings / standings / postseason implications if relevant
9. generate inbox/news output
10. update read models and analytics caches
11. write autosave/snapshot if policy requires it

## Recommended weekly high-level processing order

For a normal in-season week:

1. clear expired messages and deadlines
2. process staff delegation outputs
3. process recruiting actions and interest shifts
4. process portal/retention rumblings
5. process practice and development changes
6. process injuries and fatigue
7. finalize depth-chart legality checks
8. simulate games
9. update standings and rankings
10. update morale, fan, donor, and AD pressure
11. generate inbox/news items
12. archive analytics snapshots

## Recommended offseason high-level processing order

1. season closure and history archival
2. job security and staffing review
3. player retention conversations
4. transfer portal entry and target discovery
5. benefit and budget planning
6. roster pruning / limit compliance
7. prospect class rollover
8. offseason development
9. schedule and preseason expectation generation
10. new season bootstrap

## Major subsystem contracts

### Time, calendar, and phase control

**Purpose:** Advance the world in deterministic, inspectable steps and expose the current legal context for every action.

**Cadence:** daily, weekly, and phase-transition ticks

**Core inputs:**
- season calendar
- ruleset windows
- current world state
- queued user commands

**Core outputs:**
- new phase/week/day values
- expired deadlines
- new actionable events
- legal/illegal action states for UI

**Version 1 must include:**
- daily tick
- weekly rollup
- portal/recruiting/postseason windows
- continue blockers

**Later expansion:**
- dynamic schedule disruptions, richer calendar customization, expanded offseason ceremonies.

### Event orchestration, inbox, and news

**Purpose:** Turn raw state changes into readable, prioritized player-facing information.

**Cadence:** after every meaningful state change and at end-of-day/end-of-week summaries

**Core inputs:**
- domain events
- importance rules
- player preferences
- storyline state

**Core outputs:**
- inbox items
- news briefs
- blocking alerts
- digest summaries

**Version 1 must include:**
- severity tiers
- must-respond queue
- linked entities
- deduplication

**Later expansion:**
- AI-generated summaries, richer media personalities, custom briefings.

### Recruit generation and scouting

**Purpose:** Create believable prospect classes and uncertain information around them.

**Cadence:** at career generation, class rollover, and weekly scouting actions

**Core inputs:**
- region talent profiles
- school prestige and pipelines
- staff ratings
- RNG seed

**Core outputs:**
- prospect pool
- scouting confidence changes
- updated evaluations
- recruiting storylines

**Version 1 must include:**
- prospect generation
- star/rating ranges
- basic scouting confidence
- regional flavor

**Later expansion:**
- camp circuits, reclassifications, richer film/profile layers.

### Recruiting relationships, visits, and commitments

**Purpose:** Model the race to sign high-school prospects.

**Cadence:** weekly with per-action updates

**Core inputs:**
- school pitch
- staff relationships
- distance/pipeline
- playing time
- prestige
- promises
- visit effects

**Core outputs:**
- interest shifts
- leaderboards
- commitments
- decommitments
- class rankings

**Version 1 must include:**
- board priorities
- offers
- contact actions
- visits
- commitment resolution

**Later expansion:**
- silent commitments, flips, family influence, media pressure.

### Roster management, eligibility, and redshirt logic

**Purpose:** Keep roster state legal and strategically interesting across years.

**Cadence:** on roster changes, game participation, term transitions, and season rollover

**Core inputs:**
- eligibility records
- academic records
- game participation
- ruleset definitions

**Core outputs:**
- eligibility status
- redshirt preservation
- warnings
- forced decisions

**Version 1 must include:**
- five-year clock representation
- games-played tracking
- redshirt checks
- academic risk flags

**Later expansion:**
- medical/waiver exceptions and more granular institutional policies.

### Retention risk and transfer portal

**Purpose:** Model modern roster churn and late-cycle roster repair.

**Cadence:** weekly during sensitive phases, with special portal windows

**Core inputs:**
- playing time
- morale
- benefits
- prestige
- relationships
- coaching changes
- depth chart outlook

**Core outputs:**
- transfer risk
- portal entries
- destination races
- retention conversations

**Version 1 must include:**
- risk scores
- portal windows
- coach-change exception path
- destination matching

**Later expansion:**
- tampering rumors, agent influence, return-to-school reversals.

### Practice, development, and progression

**Purpose:** Convert time, coaching quality, and role context into player growth or stagnation.

**Cadence:** weekly and offseason phases

**Core inputs:**
- player traits
- age/class
- playing time
- practice plan
- staff development ratings
- injury status

**Core outputs:**
- attribute changes
- trait gains/losses
- position switches
- readiness changes

**Version 1 must include:**
- weekly growth
-  position-group plans
- basic offseason jumps
- scheme-fit effects

**Later expansion:**
- deep drills, individualized plans, practice accidents, mentor systems.

### Injuries, fatigue, and medical management

**Purpose:** Create availability pressure and tradeoffs without turning the game into random punishment.

**Cadence:** game resolution, weekly recovery, and practice load changes

**Core inputs:**
- injury susceptibility
- fatigue
- usage
- practice intensity
- medical staff quality

**Core outputs:**
- injury events
- recovery timelines
- snap restrictions
- risk warnings

**Version 1 must include:**
- basic injury severity bands
- return timelines
- fatigue accumulation
- medical alerts

**Later expansion:**
- setback risk, rehab quality, hidden chronic conditions.

### Staffing, delegation, and institutional competence

**Purpose:** Make staff composition matter mechanically, not cosmetically.

**Cadence:** on hiring/firing, weekly delegated work, and seasonal evaluations

**Core inputs:**
- staff ratings
- contracts
- responsibility map
- program culture
- budget

**Core outputs:**
- action quality modifiers
- recommendation quality
- delegated outcomes
- staff retention/firing pressure

**Version 1 must include:**
- hire/fire flow
- role assignment
- responsibility delegation
- rating-based modifiers

**Later expansion:**
- staff politics, promotion ladders, personality conflicts.

### Finances, NIL context, direct benefits, and facilities

**Purpose:** Represent the financial pressure points of a modern program.

**Cadence:** weekly summaries, monthly rollups, and event-based adjustments

**Core inputs:**
- school budget
- donor support
- facility costs
- benefit agreements
- NIL market context
- winning/losing shocks

**Core outputs:**
- budget state
- benefit capacity
- facility upgrade progress
- donor mood changes

**Version 1 must include:**
- budget buckets
- donor sentiment
- direct-benefit allocation model
- facility requests

**Later expansion:**
- richer booster ecosystems, sponsorship flavor, regional market volatility.

### Schedule, opponent strength, and game result simulation

**Purpose:** Resolve competition before a play-by-play engine exists.

**Cadence:** weekly game days and postseason rounds

**Core inputs:**
- team ratings
- depth charts
- injuries
- fatigue
- home field
- rest
- scheme matchup
- random seed

**Core outputs:**
- scores
- box scores
- result events
- resume value changes

**Version 1 must include:**
- schedule generator or loader
- team-strength game model
- box score shell
- basic rivalry/context modifiers

**Later expansion:**
- drive simulation, play-by-play text, tactical counters.

### Conference standings, rankings, and CFP resolution

**Purpose:** Turn season results into meaningful stakes and postseason structure.

**Cadence:** weekly during season and after title/postseason rounds

**Core inputs:**
- game results
- resume metrics
- conference rules
- poll logic
- selection protocol rules

**Core outputs:**
- standings
- poll snapshots
- CFP field
- seeds
- bracket results

**Version 1 must include:**
- standings
- polls
- selection snapshots
- 12-team bracket flow
- season-aware seeding logic

**Later expansion:**
- committee room flavor, resume explainer tools, what-if simulations.

### Morale, culture, promises, and chemistry

**Purpose:** Translate human factors into long-term program stability.

**Cadence:** weekly, after major decisions, and around role changes

**Core inputs:**
- wins/losses
- promises
- playing time
- relationships
- leadership traits
- transfer rumors

**Core outputs:**
- morale shifts
- culture trends
- broken-promise penalties
- locker-room warnings

**Version 1 must include:**
- morale states
- promise tracking
- position-group chemistry
- leader effects

**Later expansion:**
- faction systems, richer personality interactions, media blowups.

### Fan sentiment, donor pressure, and AD expectations

**Purpose:** Create external pressure that shapes priorities beyond pure optimization.

**Cadence:** weekly trends and event-driven spikes

**Core inputs:**
- record
- rivalry results
- recruiting success
- brand trajectory
- financial asks
- public promises

**Core outputs:**
- confidence scores
- objective pressure
- job security
- resource opportunities

**Version 1 must include:**
- fan confidence
- donor confidence
- AD objective tracker
- job security

**Later expansion:**
- message-board noise, donor factions, political tradeoffs.

### History, records, and legacy accumulation

**Purpose:** Make multi-year play emotionally sticky and analytically traceable.

**Cadence:** after every completed season and major milestone

**Core inputs:**
- results
- awards
- titles
- record books
- career events

**Core outputs:**
- history pages
- trophy room entries
- career arcs
- record updates

**Version 1 must include:**
- season archives
- title history
- rivalry streaks
- coach history

**Later expansion:**
- hall-of-fame style layers, documentary recaps, richer timeline visualizations.

### Analytics aggregation and explanation

**Purpose:** Turn raw simulation output into decision support without requiring the user to do mental math constantly.

**Cadence:** weekly, monthly, and on-demand

**Core inputs:**
- game stats
- recruiting data
- roster data
- development deltas
- financial metrics

**Core outputs:**
- dashboards
- trend charts
- comparisons
- alerts

**Version 1 must include:**
- program health cards
- position shortage analysis
- recruiting board summaries
- resume comparisons

**Later expansion:**
- deeper data hub, predictive models, custom views.


## The minimum viable simulation stack

The first playable menus-first alpha needs these systems to be credible, even if still shallow:

### Absolutely required for alpha
- time/calendar
- event/inbox/news orchestration
- roster/eligibility/redshirt logic
- recruiting board and commitment flow
- transfer portal and retention risk
- staffing/delegation
- finance/benefit allocation
- schedule and box-score results
- standings/rankings/CFP
- history archival

### Helpful but initially lighter
- deep morale/culture modeling
- advanced injury nuance
- sophisticated analytics
- donor faction politics

### Explicitly later
- full tactical play-calling depth
- 2D/3D on-field visualization
- highly granular playbook trees
- overproduced cutscene-style presentation

## Subsystem integration rules

### Domain events are the glue
Each subsystem should emit events instead of directly mutating unrelated subsystems whenever practical.

Examples:
- `RecruitCommitted`
- `PlayerEnteredPortal`
- `PlayerRedshirtPreserved`
- `SeasonPhaseChanged`
- `FacilityRequestApproved`
- `RankingsUpdated`
- `CoachOnHotSeatRaised`

### Systems may subscribe, but avoid hidden chains
It is fine for morale to react to portal exits, or fan sentiment to react to rivalry losses, but the chain should remain inspectable.

### Prefer layered processing over circular dependencies
Bad:
- morale changes recruiting directly while recruiting simultaneously changes morale in the same opaque pass

Better:
- recruiting emits results
- morale processes those results in the next ordered step
- inbox explains both

## Recommended formulas and modeling direction

Do not take these as final balance numbers. Treat them as structural guidance.

### Team strength for early game simulation
Early team strength can be a weighted composite of:
- starters by position group
- depth quality
- injury penalties
- fatigue penalties
- development state
- coaching competence
- scheme fit
- home field
- randomness

Simple example:

```text
team_strength =
  roster_rating_core
  + depth_modifier
  + coaching_modifier
  + scheme_fit_modifier
  - injury_penalty
  - fatigue_penalty
  + home_field_bonus
  + noise
```

### Recruiting interest model
Prospect interest should combine:
- baseline regional affinity
- school prestige
- staff recruiter strength
- scheme fit
- playing time path
- visit quality
- promise attractiveness
- current season performance
- distance friction
- benefit/NIL ecosystem attractiveness if modeled at prospect stage
- randomness

### Transfer risk model
Player transfer risk should combine:
- depth chart disappointment
- broken promises
- morale
- benefit dissatisfaction
- coach stability
- team success
- relationship quality
- scheme fit
- class-year urgency
- market pull

### Development model
Player growth should combine:
- age/class stage
- hidden growth potential
- work ethic
- coaching development ratings
- practice plan intensity
- playing time
- injury drag
- morale / buy-in
- randomness within a bounded band

### Ranking/resume model
For early versions, rankings can use:
- win/loss record
- opponent quality
- margin cap or efficiency proxy
- road win value
- conference title value
- recent-form smoothing
- preseason inertia that decays

Do not lock the game into one fake-precision formula. Build room for:
- poll logic
- committee logic
- season-specific postseason logic

## Recommended explanation surfaces

Each major subsystem should expose some lightweight reasoning to the UI.

### Recruiting explanations
- “Strong relationship with recruiting coordinator”
- “Immediate playing time path”
- “Distance from home is a concern”
- “Recent losing streak hurt momentum”

### Transfer explanations
- “Projected depth-chart drop”
- “Broken promise regarding usage”
- “Interested in higher-prestige destination”
- “Coach uncertainty increased exit risk”

### Ranking explanations
- “Road win over top-25 team”
- “Conference title improved resume”
- “Weak strength of schedule relative to peers”

### Benefit/finance explanations
- “Facility request delayed due to budget pressure”
- “Donor enthusiasm increased after rivalry win”
- “Retention package consumed remaining pool”

## Event taxonomy

Use a clear event taxonomy so inbox generation and analytics stay clean.

### Command events
Generated when the player or AI takes an action.
Examples:
- `OfferExtended`
- `VisitScheduled`
- `StaffHired`

### Simulation events
Generated when the world advances.
Examples:
- `WeekAdvanced`
- `PlayerProgressed`
- `InjuryOccurred`
- `ProspectInterestShifted`

### Resolution events
Generated when contests or deadlines resolve.
Examples:
- `RecruitCommitted`
- `GameCompleted`
- `PortalWindowClosed`

### Presentation events
Generated after domain truth exists.
Examples:
- `InboxItemCreated`
- `HeadlineGenerated`
- `DigestCompiled`

## Suggested severity model for player-facing alerts

Use severity levels that map to the menu shell:

- blocking
- urgent
- recommended
- informational
- archival

A recruiting nudge should not feel like an NCAA eligibility problem.

## How to keep the simulation explainable

### Store reason vectors
For major calculated outcomes, store a compact reason vector or contribution list.

Examples:
- top 5 factors behind a commitment
- top 3 factors behind a ranking movement
- top 4 drivers of transfer risk

### Keep explanations human, not raw math dumps
The UI should translate reasons into plain language.

### Use debug views for internal verification
Expose deeper breakdowns in dev/debug tools, not necessarily to players.

## Placeholder game simulation design

Do not wait for play-by-play.

### Version 1 game resolution
Output:
- final score
- quarter splits or at least half splits
- team stats
- rushing/passing totals
- turnovers
- key performers
- injuries from game
- resume effects

### Version 2
Add:
- drive summaries
- win probability swings if desired
- simple tactical notes

### Version 3
Add:
- play-by-play text
- tactical modifiers by scheme choice
- situational decisions

## Sim cadence by phase

### Preseason
Focus on:
- setup tasks
- roster reviews
- staff actions
- projection generation
- recruiting board setup

### In-season
Focus on:
- recruiting
- game prep
- results
- rankings
- morale and pressure changes

### Portal window
Focus on:
- exits
- retention
- target pursuit
- roster math
- financial tradeoffs

### Offseason
Focus on:
- staff changes
- benefit plans
- facilities
- player development
- future depth planning

## Ruleset-aware simulation requirements

Every subsystem must query the active ruleset for:
- roster limits
- scholarship logic if applicable to that mode
- redshirt logic
- portal windows
- direct-benefit availability
- postseason format
- conference title behavior
- eligibility rules

No subsystem should assume “the sport always works this way.”

## Balance philosophy

The goal is not perfect realism. The goal is believable strategic texture.

That means:
- enough volatility to create stories
- enough logic to reward planning
- enough transparency to avoid feeling cheated
- enough uncertainty to keep every save from converging immediately

## Tuning strategy

Use data-driven config files for:
- recruiting weights
- transfer risk thresholds
- injury rates
- development curves
- prestige drift
- donor reactivity
- ranking inertia
- game randomness

Never bury balance constants throughout UI code.

## AI-controlled program behavior

AI schools need strategy layers, not just random rolls.

At minimum, each AI program should have:
- recruiting aggressiveness profile
- transfer aggressiveness profile
- redshirt tendency
- staff investment tendency
- donor/facility aggressiveness
- win-now vs build preference

This creates distinct opponents and believable market behavior.

## Failure states the simulation must avoid

- impossible roster counts with no warning
- players simultaneously committed and uncommitted
- rankings not updating after major results
- postseason brackets incompatible with season rules
- portal entries outside legal windows without an exception
- players losing redshirt status incorrectly
- duplicate games or orphaned results
- morale or donor swings with no traceable cause

## Developer debug tools strongly recommended

Build internal tools for:
- force-advancing phases
- spawning recruits
- forcing injuries
- toggling portal windows
- inspecting ranking reasons
- replaying a week from a seed
- validating roster legality
- dumping event logs by entity

## Deliverables required from the AI after reading this file

1. A subsystem design spec for each major sim area
2. An explicit turn-processing order
3. Event definitions and sample payloads
4. Early game-result formula design
5. A set of tuning files or config schemas
6. An explanation strategy for major outcomes
7. A debug and observability plan

## Completion checklist

The AI is done with this file when it can answer:
- What happens on each Continue step?
- Which subsystem owns which behavior?
- How are outcomes explained to the user?
- How does the game simulate full seasons before a match engine exists?
- How can the simulation be tested headlessly and tuned safely?
