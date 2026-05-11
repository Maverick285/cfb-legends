# 07_MENU_UX_AND_SCREEN_SPECS

> Use this file as an instruction set for the AI working on the project.

**Read after:** 06_RULES_AND_WORLD_MODEL.md
**Primary outputs required:**
- A complete shell and navigation spec for the menus-first game
- Detailed primary-screen specifications tied to real player questions
- A notification, table, filtering, and comparison standard for the entire product
**Stop when:**
- The AI can map every major player decision to at least one screen
- The shell supports the full yearly and weekly loops without dead ends
- Screen designs are distinct from benchmarks while still using proven management patterns

## UX thesis

The interface is the game.

The UI must make the player feel:
- informed
- pressured
- capable
- responsible
- one click away from the next useful comparison

The interface should feel like a **dense operational cockpit**, not a slideshow.

## Design goals

1. High information density without chaos
2. Fast access to recurring tasks
3. Strong “continue” rhythm
4. Easy comparison of options
5. Clear urgency hierarchy
6. Original screen naming and structure
7. Flexibility for delegation and automation
8. Strong future-planning surfaces

## Shell architecture

### Persistent left navigation
Use a stable sidebar for the highest-frequency sections.

Recommended top-level nav:
- Program Desk
- Program Home
- Roster
- Recruiting
- Transfer Portal
- Staff
- Development
- Schedule
- Rankings / Conference / CFP
- Finances / Benefits
- Facilities / AD
- History
- Analytics Lab

### Top bar
The top bar should always show:
- current date / week
- school identity
- high-level record
- urgent alerts count
- search
- compare tray access
- continue button

### Right-side contextual rail
Optional contextual panel for:
- watchlist items
- quick compare
- staff recommendation snippet
- roster need warnings
- calendar reminders

### Continue button behavior
The Continue button is central to pacing.

It should:
- advance to the next meaningful event or next day depending on settings
- transform into a blocking state when urgent action is required
- clearly explain why the player cannot safely continue
- show what will likely happen next if no blocking item exists

## Notification taxonomy

All notifications must have a severity class.

### FYI
Non-blocking information.

### Advisory
Useful recommendation, no immediate deadline.

### Action Recommended
Likely high-value to address soon.

### Deadline
Time-sensitive. Should be visually distinct.

### Must Respond
Blocks Continue until resolved or explicitly delegated if allowed.

### Critical System Warning
Used for save/data integrity, impossible roster states, or broken rule conditions. Rare, loud, and explicit.

## Table standards

Tables are a primary interaction model.

All major tables should support:
- sort by any visible column
- multi-filter
- text search
- saved views
- bulk select for safe actions
- quick compare
- export / copy later if appropriate
- density options later

### Table design rule
If a player needs to move between three screens to compare basic alternatives, the table design is too weak.

## Filter standards

At minimum provide:
- positional filters
- class/year filters
- availability filters
- risk filters
- need/fit filters
- watchlist tags
- saved custom filters

Filters should be:
- visible
- reversible
- composable
- quick to clear

## Comparison standards

The player must be able to compare:
- player vs player
- prospect vs current roster
- transfer target vs recruit
- staff candidate vs current staff
- schedule paths
- resume / rankings / bracket positions

Comparison should never require writing things down manually.

## Search standards

Global search should locate:
- players
- prospects
- staff
- schools
- conferences
- rivalry pages
- historical records
- current alerts

## Navigation rules

### Rule 1
The player should reach any top-level management area in one click from the sidebar.

### Rule 2
The player should reach the most common sub-actions in two clicks or fewer.

### Rule 3
The same concept should not live under three different menus.

### Rule 4
If a screen is primarily a filtered view of another screen, consider integrating it as a tab or saved view instead.

## Primary screen set

These are the core screens for the first serious version.

## Program Desk (Inbox replacement)

**Purpose:** Primary command center. Surface deadlines, must-answer items, staff memos, headlines, recruiting updates, portal alerts, injuries, compliance issues, and board/AD asks.

**Primary player questions:**
- What needs my attention before I can continue?
- What changed since the last advance?
- Which decisions are urgent, optional, or safely delegated?

**Primary actions:**
- Open the linked screen or profile
- Respond to blocking items
- Pin, snooze, archive, or delegate messages
- Change continue settings and automation preferences

**Data required:**
- Current date/week
- notification severity
- message source
- linked entities
- deadlines
- recommendation text
- impact preview

**Must-have widgets / panels:**
- Must Respond queue
- Today / This Week / FYI tabs
- Quick filters by department
- Pinned watches
- Continue button state

**Default columns / fields:**
- Date
- Topic
- Severity
- Department
- Linked Entity
- Deadline
- Recommended Action

**Empty-state rule:** If nothing is urgent, show a calm summary and the most relevant optional tasks.

**Future expansion:** Smart triage, AI-generated briefing summaries, custom digests.

## Program Home

**Purpose:** One-screen status view for the entire program.

**Primary player questions:**
- How healthy is the program right now?
- What are my top strategic problems this season?
- How do prestige, fan confidence, and AD goals look?

**Primary actions:**
- Jump to roster, recruiting, finance, schedule, staff, or facilities
- Review season objectives and trend graphs
- Request major actions from AD

**Data required:**
- record
- prestige
- conference standing
- fan confidence
- donor confidence
- budget summary
- facility state
- headline storylines

**Must-have widgets / panels:**
- Program health cards
- season objective tracker
- trend spark lines
- key injuries
- rivalry tile

**Default columns / fields:**
- Metric
- Current
- Trend
- Target
- Owner

**Empty-state rule:** During preseason/new save, show baseline expectations and setup tasks.

**Future expansion:** Advanced prestige history, recruiting pipeline map, long-form reports.

## Roster

**Purpose:** Dense table view for the full team.

**Primary player questions:**
- Who is on the roster and what state are they in?
- Where are my position shortages or surpluses?
- Who is at risk academically, medically, or via transfer?

**Primary actions:**
- Filter and sort by any attribute
- set roles
- assign redshirt intent
- compare players
- tag cuts/retention priorities
- open player profile

**Data required:**
- position
- class year
- age
- overall/potential bands
- scheme fit
- eligibility state
- academic state
- injury
- morale
- transfer risk
- benefit allocation

**Must-have widgets / panels:**
- saved views
- bulk actions
- compare tray
- team needs summary

**Default columns / fields:**
- Name
- Pos
- Year
- OVR
- POT
- Scheme Fit
- Eligibility
- Academic
- Injury
- Transfer Risk
- Benefit Tier

**Empty-state rule:** Impossible in normal play; if roster import fails, show explicit data error.

**Future expansion:** custom column formulas, scatter plots, development history inline.

## Player Profile

**Purpose:** Single source of truth for a player’s football, academic, contractual, and narrative state.

**Primary player questions:**
- How good is this player now and later?
- What does he need to develop or stay?
- What hidden risks or opportunities exist?

**Primary actions:**
- Set development focus
- change redshirt intent
- adjust promises/role
- review conversations
- allocate/adjust benefits
- compare to teammates and targets

**Data required:**
- ratings
- traits
- archetype
- personality
- development path
- scheme fit
- snap history
- injuries
- academics
- eligibility clock
- portal probability
- dealbreakers/expectations

**Must-have widgets / panels:**
- overview card
- ratings tabs
- history timeline
- development graph
- retention risk panel

**Default columns / fields:**
- Attribute
- Current
- Projected
- Confidence
- Context

**Empty-state rule:** Never empty; load failure should show diagnostic state.

**Future expansion:** film clips, agent/advisor relationships, social/media narrative.

## Depth Chart Planner

**Purpose:** Future-facing roster planning by position group.

**Primary player questions:**
- Who starts now?
- What happens next season and the season after?
- Where do I need high-school recruits, portal help, or internal development?

**Primary actions:**
- Set current depth chart
- view future depth
- flag priority needs
- push needs to recruiting/portal boards

**Data required:**
- starters
- rotational players
- eligibility expirations
- development trajectories
- projected holes
- succession quality

**Must-have widgets / panels:**
- year tabs
- position cards
- need severity meter
- export-to-board actions

**Default columns / fields:**
- Position
- Starter
- Backup
- Future Starter
- Need Level
- Recommended Acquisition Path

**Empty-state rule:** For a brand new save, prefill with current roster projections.

**Future expansion:** what-if scenarios, injuries/offseason departures toggle.

## Recruiting Board

**Purpose:** Main operating screen for high-school and prep talent acquisition.

**Primary player questions:**
- Which prospects matter most right now?
- How likely am I to sign them?
- Where should limited recruiting actions be spent this week?

**Primary actions:**
- Add/remove prospects
- set priority tier
- assign recruiter
- schedule visits
- send/adjust offers
- review scouting confidence
- compare recruiting ROI

**Data required:**
- interest level
- school list
- relationship map
- region/pipeline
- scouting confidence
- visit history
- academic risk
- dealbreakers
- projected fit

**Must-have widgets / panels:**
- board lanes by tier
- filters and saved searches
- team needs overlay
- weekly action budget

**Default columns / fields:**
- Name
- Pos
- Stars/Tier
- Interest
- Top Schools
- Need Fit
- Scout Confidence
- Academic Risk
- Visit Status
- Commit Chance

**Empty-state rule:** Show recommendations seeded from team needs and pipelines.

**Future expansion:** regional heat maps, social rumor system, class-composition optimizer.

## Prospect Profile

**Purpose:** Detailed evaluation screen for a single recruit.

**Primary player questions:**
- Is this player actually worth the effort?
- What are his motivations, risks, and best path to commitment?
- Does he fit my scheme and roster timeline?

**Primary actions:**
- Adjust recruiting pitch
- assign staff actions
- schedule/modify visit
- change priority
- set contingency tags

**Data required:**
- rating bands
- traits
- athletic testing
- personality
- academics
- family/location preferences
- favorite schools
- dealbreakers
- scheme fit

**Must-have widgets / panels:**
- overview
- scouting report tabs
- interest timeline
- visit planner
- comparison panel

**Default columns / fields:**
- Signal
- Value
- Confidence
- Impact

**Empty-state rule:** If under-scouted, explicitly show uncertainty instead of fake precision.

**Future expansion:** film clips, camp performances, social buzz.

## Transfer Portal

**Purpose:** Manage incoming and outgoing transfer activity.

**Primary player questions:**
- Who entered the portal, why, and who fits my needs?
- Which of my players are likely to leave?
- What is the trade-off between short-term fixes and long-term development?

**Primary actions:**
- Search/filter portal entries
- contact targets when allowed
- prioritize retention actions
- compare portal vs HS routes
- view entry reasons

**Data required:**
- eligibility remaining
- entry reason
- dealbreakers
- academic transfer risk
- scheme fit
- immediate contribution score
- benefit expectations

**Must-have widgets / panels:**
- incoming targets tab
- outgoing risk tab
- window countdown
- compliance panel

**Default columns / fields:**
- Name
- Pos
- Year
- OVR
- Years Left
- Entry Reason
- Fit
- Academic Transfer Risk
- Expected Cost
- Interest

**Empty-state rule:** When portal is closed, show countdown and your internal retention watch list.

**Future expansion:** tampering flags, advisor networks, NIL market comps.

## Staff & Responsibilities

**Purpose:** Hire, fire, evaluate, and delegate.

**Primary player questions:**
- Who is doing what?
- Where is my staff weak?
- Which tasks should be delegated or reclaimed?

**Primary actions:**
- hire/fire staff
- set responsibilities
- review contracts
- monitor chemistry and fit

**Data required:**
- role
- ratings
- salary
- personality
- scheme fit
- network strength
- task load
- delegation assignments

**Must-have widgets / panels:**
- org chart
- responsibility matrix
- candidate shortlist
- budget tracker

**Default columns / fields:**
- Name
- Role
- Key Ratings
- Scheme Fit
- Salary
- Contract
- Task Load
- Recommendation

**Empty-state rule:** At new-save start, populate with current staff and recommended first actions.

**Future expansion:** staff rivalries, poaching, internal promotions, front-office staff types.

## Practice & Development

**Purpose:** Control how the program develops players over time.

**Primary player questions:**
- What should the team emphasize this week and this season?
- Who needs reps, rehab, tutoring, or a role change?
- How do I balance development vs immediate wins?

**Primary actions:**
- set team emphasis
- assign individual development
- manage rehab
- adjust redshirt and special-teams plans

**Data required:**
- practice focus
- individual plans
- fatigue
- health
- development trends
- academic support usage

**Must-have widgets / panels:**
- weekly plan
- individual card list
- risk warnings
- position-group summaries

**Default columns / fields:**
- Player
- Plan
- Dev Trend
- Fatigue
- Health
- Academic Support
- Coach Owner

**Empty-state rule:** Default to staff recommendations until user overrides.

**Future expansion:** spring camp modules, install packages, leadership council.

## Schedule / Results / Opponent Intel

**Purpose:** Calendar, results, opponent prep, and game context.

**Primary player questions:**
- What happened, what is next, and what matters most?
- What does the opponent do well or badly?
- How does the schedule shape risk and opportunity?

**Primary actions:**
- view results
- set game emphasis
- review opponent tendencies
- jump to box scores

**Data required:**
- schedule
- travel/rest context
- opponent summary
- stakes
- result history
- team form

**Must-have widgets / panels:**
- season calendar
- week preview
- opponent capsule
- result cards

**Default columns / fields:**
- Week
- Opponent
- Home/Away
- Result
- Record Impact
- Rivalry/Stake
- Prep Status

**Empty-state rule:** In preseason, show future schedule and known rivalry/story stakes.

**Future expansion:** drive charts, opponent scout package, travel fatigue modeling.

## Rankings / Conference / CFP

**Purpose:** Track standings, rankings, resume, and postseason structure.

**Primary player questions:**
- Where do I stand in conference and national races?
- What does the bracket look like if the season ended today?
- Why is one team ranked ahead of another?

**Primary actions:**
- view standings
- inspect resume comparisons
- view selection logic
- jump to relevant teams/games

**Data required:**
- conference standings
- polls
- selection committee ranking
- strength metrics
- conference champ access
- bracket

**Must-have widgets / panels:**
- standings tables
- resume compare
- projected bracket
- selection notes

**Default columns / fields:**
- Team
- Record
- Conf Record
- Rank
- Resume Score
- Conf Champ Status
- Projected Seed

**Empty-state rule:** Before rankings start, show projected contenders and criteria explainer.

**Future expansion:** what-if bracket simulator, custom postseason rules.

## Finances / NIL / Benefits

**Purpose:** Model the money side without turning the game into contract-law software.

**Primary player questions:**
- What resources do I control, what are players expecting, and where are the constraints?
- How should money be divided between roster needs, staff, facilities, and player retention?

**Primary actions:**
- set budget priorities
- allocate direct benefits
- track third-party NIL environment
- review donor/booster segments

**Data required:**
- budget
- cash flow
- staff payroll
- facility requests
- benefit allocations
- third-party NIL ecosystem
- retention pressure

**Must-have widgets / panels:**
- budget lanes
- allocation sliders
- market pressure indicators
- compliance warnings

**Default columns / fields:**
- Category
- Budgeted
- Committed
- Available
- Pressure
- Owner

**Empty-state rule:** At start of save, show baseline allocations and current obligations.

**Future expansion:** collective ecosystem, sponsor ecosystems, agent/rep dynamics.

## Facilities / AD / Board

**Purpose:** Long-term institutional management.

**Primary player questions:**
- What will the AD approve?
- Which infrastructure upgrades matter most?
- How do objectives and politics affect my job security?

**Primary actions:**
- request upgrades
- review AD confidence
- respond to objectives
- view governance/policy notes

**Data required:**
- facility ratings
- AD objectives
- job security
- historical asks
- budget constraints
- institutional strategy

**Must-have widgets / panels:**
- facility cards
- request history
- confidence breakdown
- objective tracker

**Default columns / fields:**
- Area
- Current Level
- Impact
- Upgrade Cost
- Approval Odds
- Priority

**Empty-state rule:** Brand-new save should show inherited program state and short-term leverage.

**Future expansion:** campus politics, conference pressure, president/regent interference.

## History / Trophy Room

**Purpose:** Preserve memory and create long-term emotional stakes.

**Primary player questions:**
- What has this program accomplished?
- Which rivalries, streaks, records, and coaches define the save?
- How is the world changing over decades?

**Primary actions:**
- view records
- see award histories
- compare eras
- jump to historical seasons

**Data required:**
- titles
- bowl/CFP appearances
- awards
- coaching history
- career leaders
- rivalry history

**Must-have widgets / panels:**
- trophy case
- record books
- timeline
- hall of fame

**Default columns / fields:**
- Record/Title
- Holder
- Date
- Context
- Status

**Empty-state rule:** On a new save, show school legacy and expected first milestones.

**Future expansion:** eras, documentaries, notable seasons, fan memory.

## Analytics Lab

**Purpose:** Customizable analytics workspace once enough games exist.

**Primary player questions:**
- What is actually driving wins, losses, and player value?
- Where am I outperforming or underperforming expectations?
- How do I turn data into decisions?

**Primary actions:**
- pin reports
- build dashboards
- compare teams/players
- export views

**Data required:**
- team trends
- player trends
- efficiency metrics
- usage
- development outcomes
- recruiting ROI

**Must-have widgets / panels:**
- custom dashboards
- report generator
- key findings panel

**Default columns / fields:**
- Metric
- Value
- Rank
- Trend
- Interpretation

**Empty-state rule:** Before enough data exists, explain when the lab unlocks and why.

**Future expansion:** interactive charts, opponent scouting models, recruiting market models.

## Cross-screen UX behaviors

### Quick compare tray
A persistent comparison tray lets the player pin:
- players
- prospects
- portal targets
- staff
- schools

### Watchlist / pin system
Allow the player to pin:
- players at risk to leave
- top recruits
- staff candidates
- facility requests
- rival schools / bracket rivals

### Context actions
Every row item should have a contextual action menu with the most common actions.

### Linked navigation
Any important entity reference should be clickable:
- player names
- school names
- conference names
- rankings entries
- staff names
- game results

## Screen sequencing by frequency

### Highest frequency
- Program Desk
- Roster
- Recruiting Board
- Transfer Portal
- Schedule / Results

### Medium frequency
- Player Profile
- Depth Chart Planner
- Staff & Responsibilities
- Practice & Development
- Rankings / Conference / CFP

### Lower frequency but high importance
- Finances / Benefits
- Facilities / AD
- History / Trophy Room
- Analytics Lab

This helps prioritize polish and shortcut support.

## Recommended first-run flow

A new save should guide the player through:
1. choose school / coach
2. Program Home overview
3. Program Desk urgent setup items
4. Roster scan
5. Depth Chart Planner
6. Recruiting Board
7. Staff responsibilities
8. Continue into first real week

## Empty state philosophy

Empty states should never feel like broken states.

Examples:
- No portal window active: show countdown and outgoing risk watch
- Not enough games for analytics: show unlock condition and what will appear later
- No active facility request: show current facility levels and what upgrades would help
- No major inbox items: show concise optional priorities

## Original naming guidance

Keep the naming system internally consistent and college-specific. Candidate naming patterns:

- Program Desk
- Program Home
- Talent Hub
- Depth Chart Planner
- Retention Watch
- Analytics Lab
- Benefit Allocations
- Program Confidence
- History Vault

Do not get stuck on perfect names early, but do avoid defaulting to benchmark labels.

## Accessibility checklist for each screen

Each core screen should be reviewed for:
- keyboard usability
- readable hierarchy
- status signals beyond color
- consistent heading structure
- tooltip or inline explanation for jargon
- no critical information hidden only in hover states

## Wireflow requirement

After this file is used, create at least:
- one global nav wireflow
- one weekly flow wireflow
- one offseason flow wireflow
- one recruiting-to-roster comparison flow
- one rankings-to-bracket flow

These can be low-fidelity and textual if necessary.

## Immediate deliverable after reading this file

Produce:
1. the shell/navigation spec
2. detailed screen cards for the full primary screen set
3. the notification taxonomy
4. the table/filter/compare standard
5. low-fidelity wireflows for weekly and offseason play

Then continue to `08_SYSTEM_ARCHITECTURE.md`.
