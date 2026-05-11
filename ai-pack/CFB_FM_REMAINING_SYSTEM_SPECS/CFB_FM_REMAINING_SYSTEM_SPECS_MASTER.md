

<!-- FILE: 00_START_HERE_REMAINING_SYSTEM_SPECS.md -->

# CFB-FM Remaining System Implementation Specs — Start Here

## Purpose

This pack continues the implementation-grade specification work for the CFB-FM project.

Previous packs covered:

- overall vision
- execution governance
- depth gates
- stats engine
- play generator
- attribute-to-outcome model
- recruiting
- development/practice/team vibe
- AI schools
- NIL/boosters/portal
- draft
- data calibration
- Program Desk
- trait/scouting language
- awards/history/media

This pack covers the remaining structural systems that will determine whether the project can actually become a coherent game:

- database/save/migration/event log
- screen-by-screen UI workspaces
- staff/responsibilities/coaching carousel
- scheduling/conferences/realignment/postseason
- creator/editor/sandbox/commissioner tools
- facilities/stadium/uniform/brand identity
- college town immersion/content pipeline
- LLM narrative/chat/media interactions
- test harness/scenarios/balance/AI QC
- integrated vertical slice acceptance plan

## Why This Pack Matters

The previous specs define what the sim should do.

This pack defines how the game should be held together.

Without these systems, the game risks becoming:

```text
A pile of promising modules that do not save, do not navigate well, do not test well, and do not feel like one living program.
```

## Critical Principle

Every major system must connect to:

```text
GameWorld state
save/load
event log
Program Desk
Data Lab
tests
UI workspaces
```

If it does not, it is not part of the game yet.

## Recommended Next Build Area

If the coding AI has not started yet:

```text
Start with database/save/event log.
```

If the coding AI already has a basic repo:

```text
Build screen/workspace framework and Program Desk/Continue Gate.
```

If the sim core exists:

```text
Build test harness and 1-season headless validation.
```

## Files Included

- `41_DATABASE_SAVE_MIGRATION_AND_EVENT_LOG_SPEC.md`
- `42_SCREEN_BY_SCREEN_UI_WORKSPACE_SPEC.md`
- `43_STAFF_RESPONSIBILITIES_AND_COACHING_CAROUSEL_IMPLEMENTATION_SPEC.md`
- `44_SCHEDULING_CONFERENCES_REALIGNMENT_AND_POSTSEASON_SPEC.md`
- `45_CREATOR_EDITOR_SANDBOX_AND_COMMISSIONER_MODE_SPEC.md`
- `46_FACILITIES_STADIUM_UNIFORM_AND_BRAND_IDENTITY_SPEC.md`
- `47_COLLEGE_TOWN_IMMERSION_AND_CONTENT_PIPELINE_SPEC.md`
- `48_LLM_NARRATIVE_CHAT_AND_MEDIA_INTERACTION_SPEC.md`
- `49_TEST_HARNESS_SCENARIO_BALANCE_AND_AI_QC_SPEC.md`
- `50_VERTICAL_SLICE_INTEGRATION_AND_ACCEPTANCE_PLAN.md`
- `51_READY_TO_PASTE_BUILD_PROMPTS_REMAINING_SYSTEMS.md`
- `CFB_FM_REMAINING_SYSTEM_SPECS_MASTER.md`


<!-- FILE: 41_DATABASE_SAVE_MIGRATION_AND_EVENT_LOG_SPEC.md -->

# 41 — Database, Save, Migration, and Event Log Spec

## North Star

The game must be persistent, auditable, replayable, and migration-safe.

A long-running dynasty sim cannot rely on fragile JSON blobs or UI-local state forever.

The early build may use JSON snapshots, but the mature build should use SQLite with explicit schemas, versioning, migrations, and event/action logs.

## Core Principles

```text
No UI-only game state.
Every stateful system must save.
Every important action must log.
Every save must include a version.
Every migration must be explicit.
Every weird state should be replayable.
```

## Persistence Architecture

Recommended mature storage:

```text
SQLite database for world state and history.
JSON config files for rulesets/balance.
Local asset folders for generated images/audio.
```

Use JSON snapshots only as early scaffolding or export/import.

## Storage Layers

```text
Config Layer:
  rulesets, balance presets, calibration targets

World State Layer:
  current career/save state

History Layer:
  seasons, games, records, awards, drafts

Event Log Layer:
  actions, sim events, audit trail

Asset Metadata Layer:
  generated portraits, logos, uniforms, stadiums, audio
```

## Save File Structure

A save should include:

```ts
type SaveMetadata = {
  saveId: string;
  saveVersion: number;
  rulesetId: string;
  balancePresetId: string;
  createdAt: string;
  updatedAt: string;
  currentSeason: number;
  currentWeek: string;
  userCoachId?: string;
  userSchoolId?: string;
  seed: string;
};
```

## SQLite Tables

Recommended tables:

```text
save_metadata
world_state
schools
conferences
conference_memberships
schedules
games
drives
plays
stat_deltas
team_game_stats
player_game_stats
team_season_stats
player_season_stats
players
prospects
staff
recruiting_states
recruiting_boards
practice_plans
team_vibe
nil_deals
booster_segments
facilities
program_items
event_log
action_log
records
awards
draft_results
media_narratives
assets
bookmarks
user_settings
```

## Early vs Mature Save Strategy

## Early

JSON snapshot:

```text
GameWorld serialized to disk.
```

Acceptable for first prototype.

## Mature

SQLite:

```text
Entities stored in normalized tables.
Large history stored as rows.
Event log stored append-only.
```

## GameWorld State Ownership

Every stateful system must declare where it lives.

Examples:

```text
Roster:
  players table + schoolId

Recruiting:
  prospects table + recruiting_states + recruiting_boards

Practice:
  practice_plans + team_vibe

Program Desk:
  program_items

Stats:
  plays + stat_deltas + game_stats + season_stats

Assets:
  assets table + file paths
```

## Event Log

The event log records things that happen in the world.

```ts
type GameEventLogEntry = {
  id: string;
  timestamp: GameDate;
  eventType: string;
  category: string;
  sourceSystem: string;
  affectedEntities: EntityRef[];
  payload: Record<string, unknown>;
  reasonCodes: ReasonCode[];
};
```

Examples:

- recruit committed
- player entered portal
- staff hired
- NIL deal flagged
- game completed
- record broken
- injury occurred
- practice plan applied

## Action Log

The action log records decisions.

```ts
type ActionLogEntry = {
  id: string;
  timestamp: GameDate;
  actorType: "user" | "ai_school" | "system" | "staff_delegate";
  actorId: string;
  actionType: string;
  targetEntities: EntityRef[];
  before?: StatePatchSummary;
  after?: StatePatchSummary;
  reasonCodes: ReasonCode[];
  packetId?: string;
};
```

Examples:

- user offered recruit
- AI school changed depth chart
- staff delegated practice plan
- user approved NIL deal
- Continue advanced week

## Replay

Replay goal:

```text
Given seed + initial state + action log, reproduce the same resulting state.
```

Early replay can be partial.

Mature replay should support:

- replay from save point
- replay season
- replay game
- replay week
- compare state hashes

## State Hashing

After major transitions, compute hash:

```text
before Continue
after Continue
after game sim
after save/load
after migration
```

Use for determinism tests.

## Migrations

Every save schema version change requires a migration.

```ts
type Migration = {
  fromVersion: number;
  toVersion: number;
  description: string;
  migrate(save: unknown): unknown;
};
```

Migration tests:

- load old save
- migrate
- validate
- save/load round trip

## Validation

Every loaded save must validate:

- entity references exist
- no duplicate IDs
- no invalid dates
- no impossible roster states
- no invalid conference memberships
- no invalid program items
- no orphaned assets
- no invalid stat links
- no missing ruleset

## Asset Metadata

```ts
type AssetRecord = {
  id: string;
  entityId?: string;
  assetType: "portrait" | "logo" | "uniform" | "stadium" | "audio" | "news";
  filePath: string;
  provider: string;
  seed?: string;
  promptHash?: string;
  locked: boolean;
  createdAt: string;
};
```

Assets are files. The database stores references.

## Save/Load Tests

Required tests:

- empty world round trip
- generated world round trip
- player hidden traits preserved
- recruiting board preserved
- schedule preserved
- game stats preserved
- ProgramItems preserved
- action log preserved
- custom school preserved
- generated asset reference preserved
- migration test

## Database Access Pattern

Do not let UI components query arbitrary tables directly.

Use repositories/services:

```text
SchoolRepository
PlayerRepository
RecruitingRepository
StatsRepository
ProgramDeskRepository
SaveRepository
```

UI calls application services, not raw database operations.

## Acceptance Criteria

This system is acceptable when:

- all core entities save/load
- migrations exist
- action log exists
- event log exists
- state validation exists
- replay scaffolding exists
- no UI-only state persists
- generated assets are referenced safely
- save/load round-trip tests pass


<!-- FILE: 42_SCREEN_BY_SCREEN_UI_WORKSPACE_SPEC.md -->

# 42 — Screen-by-Screen UI Workspace Spec

## North Star

The UI must feel like a college football program operating system.

It must be dense, clickable, fast, and consistent.

Do not build shallow dashboards.

Every major screen should be a workspace with:

- header
- breadcrumbs
- subtabs
- action bar
- dense table or structured workspace
- right inspector
- staff recommendations
- reason codes where relevant
- click-through links
- saved views

## Global Layout

```text
Top Bar
Left Navigation
Main Workspace
Right Inspector / Staff Rail
```

## Top Bar

Always visible.

Fields/actions:

- current date/week
- season phase
- Continue button
- blocker count
- global search/command palette
- bookmarks
- save indicator
- AI service status
- settings shortcut

## Left Navigation

Primary sections:

- Program Desk
- Roster
- Recruiting
- Transfer Portal
- Staff
- Practice
- Tactics / Playbook
- Schedule
- Games / Play-by-Play
- Rankings / Postseason
- Finance / NIL
- Facilities
- Data Hub
- World
- History
- Sandbox / Data Lab
- Settings

## Workspace Framework

```ts
type WorkspaceConfig = {
  id: string;
  title: string;
  route: string;
  subtabs: WorkspaceTab[];
  defaultTab: string;
  supportsSavedViews: boolean;
  supportsRightInspector: boolean;
  supportsBookmarks: boolean;
};
```

## Program Desk

Tabs:

- Overview
- Tasks
- Reports
- Calendar
- News
- Watchlist
- Delegated
- Archive

Overview sections:

1. Must Fix To Continue
2. Today's Decisions
3. Next Game / Deadline
4. Staff Briefing
5. Calendar Snapshot
6. Watchlist
7. News

Right inspector shows selected ProgramItem.

Required actions:

- quick fix
- delegate
- open screen
- dismiss/archive
- accept consequence
- resolve

## Roster Workspace

Tabs:

- Overview
- Roster
- Depth Chart
- Eligibility
- Morale
- Development
- NIL
- Transfer Risk
- Position Groups
- Reports
- History

Roster table columns:

- name
- position
- role
- class
- height/weight
- current ability
- potential/staff opinion
- key attributes
- morale
- transfer risk
- NIL expectation
- eligibility
- development trend
- injury status
- promises
- staff note

Right inspector:

- player summary
- staff recommendation
- next action
- risks
- links to profile/depth/practice/NIL

## Player Profile

Tabs:

- Overview
- Attributes
- Trait Labels
- Development
- Game Logs
- Season Stats
- Career Stats
- Eligibility
- Academics
- Morale
- NIL
- Relationships
- Reports
- History

Every trait label clickable.

## Recruiting Workspace

Tabs:

- Overview
- Search
- Board
- Needs
- Visits
- Offers
- Staff Assignments
- Commitments
- Competitors
- Promises
- Analytics
- Late Risers
- Risk Report

Search/Board columns:

- name
- position
- class
- grade level
- state
- high school
- stars
- public rank
- your eval
- scouted confidence
- trait labels
- interest
- relationship
- top schools
- NIL expectation
- playing-time fit
- development fit
- scheme fit
- location fit
- staff owner
- last contact
- next action
- risk

Required actions:

- add to board
- assign scout
- contact
- offer
- schedule visit
- make pitch
- promise
- compare
- delegate
- withdraw

## Prospect Profile

Tabs:

- Overview
- Scouting
- Attributes / Ranges
- Trait Labels
- Preferences
- Recruitment
- Visits
- Offers
- Competitors
- Development Projection
- Reports
- Similar Players

## Transfer Portal Workspace

Tabs:

- Overview
- Search
- Board
- Your Risks
- Targets
- Offers
- Commitments
- Retention
- Analytics

Columns:

- name
- position
- prior school
- class/eligibility
- current ability
- potential
- portal reason
- NIL expectation
- role expectation
- interest
- scheme fit
- academic risk
- injury risk
- staff recommendation

## Staff Workspace

Tabs:

- Overview
- Responsibilities
- Staff Search
- Contracts
- Reports
- Workload
- Chemistry
- Coaching Tree
- Recruiting Territories
- Analytics

Staff columns:

- name
- role
- age
- salary
- contract years
- development
- recruiting
- evaluation
- tactics
- region
- workload
- morale
- risk of leaving
- key strength
- key weakness

## Practice Workspace

Tabs:

- Weekly Plan
- Time Allocation
- Intensity
- Position Groups
- Individual Plans
- Fatigue
- Injury Risk
- Team Vibe
- Staff Recommendations
- History

Required UI:

- time-unit allocation
- intensity selector
- projected effects
- warnings
- staff recommended plan
- delegate mode
- player-level impact preview

## Tactics / Playbook Workspace

Tabs:

- Identity
- Offensive Scheme
- Defensive Scheme
- Tempo
- Game Plan
- Concepts
- Install Quality
- Matchups
- Staff Recommendations
- Play Designer, later

## Schedule / Games Workspace

Tabs:

- Schedule
- Results
- Upcoming Game
- Game Preview
- Play-by-Play
- Box Score
- Drive Chart
- Team Stats
- Player Stats
- Postgame Report

## Finance / NIL Workspace

Tabs:

- Overview
- Budget
- NIL Market
- Direct Benefits
- Clearinghouse
- Boosters
- Donor Campaigns
- Facilities Funding
- Forecast
- Compliance Risk

## Facilities Workspace

Tabs:

- Overview
- Stadium
- Football Facilities
- Projects
- Donor Funding
- Recruiting Impact
- Revenue Impact
- History

## Data Hub

Tabs:

- Team Performance
- Player Performance
- Recruiting Efficiency
- Development
- NIL / Finance
- Injuries
- Transfers
- Draft
- Sim Validation
- Balance

## World Workspace

Tabs:

- Schools
- Conferences
- Rankings
- Recruiting Map
- Draft Pipeline
- Coach Carousel
- Realignment
- Towns
- News

## History Workspace

Tabs:

- Program Timeline
- Seasons
- Coaches
- Players
- Records
- Awards
- Draft
- Rivalries
- Recruiting Classes

## Sandbox / Data Lab

Tabs:

- Advanced Setup
- Commissioner Editor
- Batch Sim
- Balance Dashboard
- Scenario Runner
- Validation Reports
- Export / Import

## Global Search

Search types:

- player
- recruit
- staff
- school
- conference
- town
- screen
- task
- report
- CFBPedia entry
- stat
- playbook concept

## Bookmarks

Can bookmark:

- routes
- saved views
- entities
- reports
- Data Lab presets

## Saved Views

Must support:

- roster
- recruiting
- portal
- staff
- finance
- data hub

Saved view stores:

- columns
- filters
- sort
- grouping
- pinned columns

## FM-Density Acceptance

A screen is not acceptable if:

- it only has cards
- it lacks click-through
- it lacks filters where needed
- it lacks sorting where needed
- it hides comparison data
- it uses mock data
- it cannot support 20 minutes of real decisions

## UI Tests

Required:

- main routes render
- Continue button accessible
- Program Desk actions work
- table sorting/filtering works
- row click opens profile
- saved view persists
- global search finds entity
- bookmarks navigate
- data-testid hooks exist

## Acceptance Criteria

The UI system is acceptable when:

- every major system has a workspace
- dense tables exist where decisions require comparison
- every meaningful entity is clickable
- right inspector reduces popup dependence
- Program Desk and Continue Gate are separate
- saved views/bookmarks/search support power users
- UI state connects to real GameWorld state


<!-- FILE: 43_STAFF_RESPONSIBILITIES_AND_COACHING_CAROUSEL_IMPLEMENTATION_SPEC.md -->

# 43 — Staff, Responsibilities, and Coaching Carousel Implementation Spec

## North Star

Staff are not cosmetic.

They should generate information, create uncertainty, influence player development, drive recruiting, affect tactics, carry relationships, and create program instability when they leave.

A good staff should make the user feel smarter.
A bad staff should make the user feel blind.

## Staff Roles

Football leadership:

- Head Coach
- Offensive Coordinator
- Defensive Coordinator
- Special Teams Coordinator
- General Manager / Director of Player Personnel
- Assistant Head Coach

Position coaches:

- QB
- RB
- WR
- TE
- OL
- DL
- EDGE
- LB
- CB
- S
- Specialists

Support/recruiting:

- Recruiting Coordinator
- Transfer Portal Director
- Scouting Analyst
- High School Relations
- Strength Coach
- Medical/Rehab
- Academic Advisor
- Compliance Officer
- NIL Liaison
- Booster Relations
- Media Relations
- Data Analyst

## Staff Entity

```ts
type Staff = {
  id: StaffId;
  identity: StaffIdentity;
  role: StaffRole;
  schoolId?: SchoolId;
  contract: StaffContract;
  attributes: StaffAttributes;
  personality: StaffPersonality;
  preferences: StaffPreferences;
  relationships: StaffRelationships;
  biases: StaffEvaluationBias;
  workload: StaffWorkload;
  reputation: StaffReputation;
};
```

## Staff Attributes

Categories:

- recruiting
- evaluation
- player development
- position teaching
- tactical knowledge
- game planning
- play calling
- motivation
- discipline
- relationship building
- analytics
- NIL pitch
- academic support
- compliance judgment
- media handling
- booster relations

## Staff Personality

- ambition
- loyalty
- ego
- integrity
- patience
- adaptability
- pressure handling
- conflict tolerance
- work rate
- risk tolerance
- player empathy
- political skill

## Staff Bias

Bias examples:

- overvalues size
- overvalues speed
- underrates small-school prospects
- trusts veterans
- loves raw athletes
- avoids academic risk
- chases stars
- scheme zealot
- dislikes portal
- NIL aggressive
- old-school disciplinarian

Bias affects reports and recommendations.

## Responsibilities

Each responsibility has owner and mode.

Modes:

- user controls
- staff recommends
- staff handles routine
- staff handles unless critical
- staff fully controls
- committee

Responsibility categories:

- recruiting board
- scouting assignments
- offers
- visits
- portal scouting
- depth chart
- redshirts
- practice plan
- individual development plans
- player meetings
- game plan
- NIL recommendations
- academic monitoring
- compliance review
- staff hiring shortlist

## Staff Reports

Report types:

- recruit evaluation
- player development
- depth chart recommendation
- transfer risk
- practice fatigue
- game plan
- opponent scout
- NIL market
- academic risk
- staff workload
- facility needs

Reports include:

- summary
- recommendation
- confidence
- evidence
- bias risk
- action options

Staff can disagree.

## Workload

Workload sources:

- assigned recruits
- position group size
- practice duties
- scouting travel
- game plan work
- player meetings
- staff vacancies
- season phase

High workload effects:

- slower reports
- lower accuracy
- missed contacts
- burnout
- morale decline
- leaving risk

## Staff Hiring

Candidate fields:

- role fit
- attributes
- personality
- scheme fit
- recruiting regions
- development specialty
- contract demand
- ambition
- reputation
- baggage/risk
- relationship to existing staff
- career goal

Hiring actions:

- search
- filter
- interview
- request recommendation
- offer contract
- negotiate title
- negotiate salary
- promise autonomy
- withdraw

## Contracts

Fields:

- salary
- years
- buyout
- bonuses
- title
- play-calling rights
- recruiting territory
- autonomy
- promotion clause
- retention bonus

Staff can ask for:

- raise
- extension
- promotion
- more autonomy
- better budget
- coordinator role
- head coach opportunity

## Coaching Carousel

Occurs mostly offseason, but rumors can happen in-season.

Triggers:

- poor performance
- hot seat
- retirement
- staff poached
- coordinator success
- scandal/controversy, toned down
- school ambition
- conference movement
- booster pressure

Effects:

- recruiting instability
- player transfer risk
- staff chemistry
- scheme changes
- program identity
- AI school trajectory

## Staff Movement

When staff leave:

- relationships may leave
- recruits may decommit
- players may enter portal
- scheme install may reset
- development may suffer
- new staff may bring targets/players

## Coaching Trees

Track:

- staff under head coach
- promotions
- former players turned coaches
- assistants becoming head coaches
- scheme lineage
- rivalry branches

## Events

- staff report completed
- staff disagreement
- staff asks raise
- rival contacts staff
- staff burns out
- staff recommends recruit
- staff wants autonomy
- staff accepts job
- coordinator fired
- staff hire candidate found

## UI

Staff workspace tabs:

- Overview
- Responsibilities
- Reports
- Staff Search
- Contracts
- Workload
- Chemistry
- Coaching Tree
- Recruiting Territories
- Analytics

## Tests

Required:

- staff report accuracy affected by evaluation
- staff bias changes recommendation
- staff workload reduces accuracy
- responsibilities delegate actions
- staff contract saves/loads
- staff can be poached
- staff leaving affects recruit/player state
- AI school hires staff
- coaching tree updates

## Acceptance Criteria

Staff system is acceptable when:

- staff affect recruiting
- staff affect development
- staff affect scouting uncertainty
- staff affect practice/game prep
- responsibilities/delegation work
- staff reports can be wrong
- staff can disagree
- staff can leave
- coaching carousel changes the world


<!-- FILE: 44_SCHEDULING_CONFERENCES_REALIGNMENT_AND_POSTSEASON_SPEC.md -->

# 44 — Scheduling, Conferences, Realignment, and Postseason Spec

## North Star

The college football world must have structure.

Schedules, conferences, rivalries, rankings, postseason access, and realignment all shape program incentives.

The user should be able to play:

- fictional structures
- real-school private mode
- custom conferences
- custom playoff formats
- historical/alternate eras
- chaos sandbox

## Conference Entity

```ts
type Conference = {
  id: ConferenceId;
  name: string;
  teams: SchoolId[];
  divisions?: Record<string, SchoolId[]>;
  pods?: Record<string, SchoolId[]>;
  protectedRivalries: RivalryRule[];
  conferenceGames: number;
  championshipFormat:
    | "none"
    | "top_two"
    | "divisions"
    | "pods"
    | "custom";
  revenueShareModel: "equal" | "performance" | "tiered";
  mediaDealStrength: number;
  prestige: number;
  playoffAccess: "auto_possible" | "at_large_only" | "none";
  schedulingRules: ConferenceSchedulingRules;
};
```

## Scheduling Inputs

- team list
- conference memberships
- rivalry games
- protected games
- home/away balance
- conference game count
- non-conference game count
- bye weeks
- neutral site games
- TV/marquee windows, optional
- custom user constraints
- postseason dates

## Schedule Generator

Must support:

- round-robin/division/pod rules
- protected rivalries
- balanced home/away over multi-year cycles
- non-conference scheduling
- bye week distribution
- no duplicate games
- no team plays itself
- custom conferences

## Non-Conference Scheduling

AI/user can schedule:

- home game
- away game
- neutral site
- rivalry
- buy game
- strength-of-schedule game
- recruiting-region game

Effects:

- revenue
- SOS
- recruiting exposure
- risk
- fan interest
- travel fatigue

## Rivalries

Rivalry entity:

```ts
type Rivalry = {
  id: string;
  teams: [SchoolId, SchoolId];
  name?: string;
  protected: boolean;
  intensity: number;
  history: RivalryHistory;
  trophy?: string;
};
```

Effects:

- fan sentiment
- home-field intensity
- recruiting
- team vibe
- coach expectations
- media narratives

## Rankings

Ranking model inputs:

- record
- strength of schedule
- quality wins
- bad losses
- margin / game control
- conference strength
- head-to-head
- recency
- injuries, optional
- poll inertia
- prestige bias, sandbox toggle

Outputs:

- poll rankings
- committee rankings
- playoff seeding
- media narratives

## Conference Standings

Track:

- overall record
- conference record
- division/pod record
- head-to-head
- common opponents
- tiebreakers
- points/other rules if custom

Tiebreakers must be configurable.

## Conference Championship

Formats:

- none
- divisions
- top two
- pods
- custom

Outputs:

- matchup
- venue
- revenue
- prestige
- playoff effects
- awards/media

## Postseason

Support configurable postseason.

Fields:

- playoff size
- autobids
- at-large count
- seeding rules
- home first round
- byes
- bowl tie-ins
- neutral sites
- committee model
- historical mode

## Bowl System

Bowl selection factors:

- conference tie-ins
- team record
- prestige
- geography
- fan travel
- TV interest
- rematch avoidance
- custom rules

## Realignment

Realignment triggers:

- revenue gap
- conference instability
- school ambition
- geography
- media deal
- playoff access
- rivalry concerns
- political/booster pressure
- user sandbox trigger

Outputs:

- invitations
- accept/reject
- conference membership changes
- schedule changes
- revenue changes
- prestige changes
- rivalry disruption
- media narratives

## Custom Conference Creator

User can:

- create conference
- rename conference
- add/remove teams
- set divisions/pods
- protect rivalries
- set revenue sharing
- set media strength
- set championship format
- set playoff access
- set schedule rules

## Events

- schedule released
- rivalry week
- ranking released
- CFP ranking update
- conference title clinched
- bowl invite
- playoff bracket set
- realignment rumor
- conference invite
- media deal announced

## Tests

Required:

- no duplicate games
- no self games
- home/away balance
- protected rivalry scheduled
- conference standings correct
- tiebreaker works
- championship matchup correct
- playoff bracket valid
- custom conference saves/loads
- realignment changes schedule next year
- postseason stats/history saved

## Acceptance Criteria

This system is acceptable when:

- schedules are legal
- custom conferences work
- rivalries are protected if configured
- standings/tiebreakers work
- postseason works by ruleset
- realignment changes world causally
- rankings are plausible and explainable


<!-- FILE: 45_CREATOR_EDITOR_SANDBOX_AND_COMMISSIONER_MODE_SPEC.md -->

# 45 — Creator, Editor, Sandbox, and Commissioner Mode Spec

## North Star

Creator and sandbox tools are not side gimmicks.

They support:

- customization
- testing
- balance tuning
- private real-school mode
- fantasy rebuilds
- what-if scenarios
- debugging

Created objects must use the same simulation systems as normal objects.

No creator output should be UI-only.

## Modes

## Standard Career

Normal gameplay.

## Advanced Setup

Configure the world before starting.

## Commissioner Mode

Edit world during a save.

## Data Lab

Run simulations and inspect balance.

## Creator Studio

Create schools, players, coaches, conferences, uniforms, stadiums, playbooks, rivalries, bowls, rulesets.

## Create-a-School

Fields:

- name
- short name
- mascot
- colors
- city/state
- stadium
- conference
- prestige
- facilities
- academic profile
- fan intensity
- alumni size
- donor base
- NIL market
- local recruiting footprint
- media exposure
- tradition
- campus appeal
- location appeal

Modes:

- cupcake rebuild
- realistic new FBS
- sleeping giant
- blue blood
- G5 climber
- NIL monster
- academic powerhouse
- development factory

## Create-a-Player

Modes:

- prospect
- current roster player
- transfer
- walk-on
- dynasty legend
- sandbox monster
- random balanced

Fields:

- identity
- position
- body
- attributes
- hidden traits
- potential
- development curve
- preferences
- NIL profile
- eligibility
- school/portal/recruit status

Balance modes:

- realistic lock
- soft cap
- unlimited sandbox

## Create-a-Coach

Fields:

- name
- age
- hometown
- alma mater
- role
- coaching tree
- attributes
- personality
- philosophy
- scheme
- recruiting regions
- career ambition
- hidden traits

## Create-a-Conference

Fields:

- name
- teams
- divisions/pods
- protected rivalries
- championship format
- media strength
- revenue sharing
- playoff access
- schedule rules

## Create-a-Ruleset

Fields:

- roster rules
- NIL rules
- direct benefits
- transfer windows
- redshirt rules
- practice time
- playoff format
- conference rules
- scholarship relevance
- academic strictness
- injury settings

## Commissioner Editor

Editable:

- players
- prospects
- schools
- conferences
- schedules
- staff
- finances
- NIL deals
- facilities
- injuries
- records
- rankings
- ruleset/balance

Every edit must be logged.

## Data Lab

Tools:

- run 1/5/20/100 seasons
- compare presets
- export stats
- inspect AI decisions
- inspect anomalies
- tune balance
- view distributions
- replay logs

## Sandbox Parameters

World:

- team count
- conference layout
- talent density
- regional talent
- school power distribution

Recruiting:

- star counts
- scouting opacity
- NIL importance
- flip rate
- late bloomer rate
- bust rate

Development:

- growth speed
- regression chance
- staff impact
- facility impact
- practice impact

Games:

- scoring
- pace
- upsets
- injuries
- penalties
- turnovers
- home field
- weather

NIL:

- market size
- clearinghouse strictness
- booster meddling
- jealousy sensitivity

## Validation

Creator must validate:

- no invalid IDs
- school has conference
- conference has teams
- player attributes in range
- no impossible eligibility
- schedule legal
- ruleset complete
- save/load works

## Events

- custom school added
- commissioner edit made
- ruleset changed
- sandbox preset loaded
- Data Lab sim completed
- balance anomaly found

## Tests

Required:

- custom school enters schedule
- custom conference schedules games
- created player saves/loads
- created coach can be hired
- commissioner edit logs action
- invalid created object rejected
- sandbox preset applies
- Data Lab run exports report

## Acceptance Criteria

This system is acceptable when:

- creator tools produce real entities
- created objects participate in simulation
- edits are logged
- sandbox changes are config-driven
- Data Lab supports balance testing
- user can create custom school/conference/player/coach safely


<!-- FILE: 46_FACILITIES_STADIUM_UNIFORM_AND_BRAND_IDENTITY_SPEC.md -->

# 46 — Facilities, Stadium, Uniform, and Brand Identity Spec

## North Star

Program identity should be visible and functional.

Facilities, stadiums, uniforms, and brand affect:

- recruiting
- NIL
- fan sentiment
- revenue
- home-field atmosphere
- player morale
- program prestige
- town/campus immersion

They should not become arcade stat boosts.

## Facilities

Facility categories:

- stadium
- locker room
- weight room
- indoor practice
- practice fields
- nutrition
- recovery/medical
- academic center
- recruiting lounge
- analytics/film center
- equipment
- fan amenities

Each facility has:

- rating
- condition
- upkeep cost
- upgrade cost
- construction time
- effect profile
- donor funding potential

## Facility Effects

Recruiting:

- visit impression
- development pitch
- NIL/brand appeal
- player comfort

Development:

- strength gains
- recovery
- injury rehab
- practice quality
- nutrition

Finance:

- revenue
- upkeep
- booster interest
- ticket sales

Home Field:

- crowd noise
- atmosphere
- recruit visit effect

## Stadium

Fields:

- capacity
- age
- condition
- noise
- student section impact
- luxury suites
- recruiting appeal
- tradition value
- weather exposure
- fan amenities
- location
- expansion potential
- maintenance cost

## Stadium Builder

Buildable components:

- seating capacity
- student section
- luxury suites
- club seating
- video board
- locker rooms
- tunnel
- recruiting lounge
- press box
- concessions
- tailgate district
- parking
- lighting
- field surface
- roof/canopy
- sound system
- statues/tradition features

## Stadium Project Lifecycle

```text
concept
→ approval
→ donor funding
→ design
→ construction
→ disruption
→ completion
→ effects
```

Project risks:

- cost overrun
- delay
- donor conflict
- fan backlash
- recruiting boost
- revenue boost

## Uniform Designer

Uniform elements:

- helmet
- logo
- facemask
- jersey
- pants
- socks
- cleats
- gloves
- number font
- stripes
- collar
- alternates
- throwbacks

Uniform attributes:

- tradition
- modernity
- recruit appeal
- fan approval
- brand strength
- rivalry identity
- special event value

## Uniform Effects

Small effects only:

- recruit impression
- fan sentiment
- merchandise revenue
- player morale for big games
- brand identity

No arcade boosts:

```text
No +5 speed uniforms.
```

## Brand Identity

Identity labels:

- traditional blue blood
- modern flashy brand
- defensive grinder
- development factory
- NIL superpower
- local pipeline program
- uniform innovator
- stadium atmosphere school
- academic prestige program

Identity emerges from systems, not manual label only.

## AI Graphics Pipeline

Assets:

- logos
- uniforms
- helmets
- stadium concepts
- facility concepts

Flow:

```text
creator input
→ prompt payload
→ asset service
→ generated image
→ user lock/regenerate
→ asset metadata saved
```

AI output is cosmetic unless linked to facilities/uniform schema.

## Events

- donor offers stadium funding
- facility project delayed
- recruits impressed by upgrade
- fans dislike uniform reveal
- alternate uniform boosts recruiting visit atmosphere
- stadium expansion approved
- facility falls behind rivals

## Tests

Required:

- facility affects recruiting score
- facility affects development/recovery
- stadium affects revenue/home field
- uniform set saves/loads
- generated asset metadata saves
- project cost/time updates
- facility project completion changes rating
- no uniform arcade stat boost

## Acceptance Criteria

This system is acceptable when:

- facilities affect core systems
- stadium affects revenue/atmosphere
- uniforms affect identity/flavor modestly
- projects have costs/time/consequences
- assets are optional and saved as references
- identity emerges from program behavior


<!-- FILE: 47_COLLEGE_TOWN_IMMERSION_AND_CONTENT_PIPELINE_SPEC.md -->

# 47 — College Town Immersion and Content Pipeline Spec

## North Star

Each college town should feel distinct.

Town immersion should affect gameplay lightly but meaningfully:

- recruiting visits
- player homesickness
- location fit
- campus appeal
- fan pressure
- NIL/local market
- media flavor
- rivalry flavor

It should not become giant lore dumps.

## Town Profile

```ts
type TownProfile = {
  id: string;
  schoolId: SchoolId;
  city: string;
  state: string;
  region: string;
  populationBand: string;
  campusType: "small_town" | "college_town" | "urban" | "suburban" | "rural";
  weatherProfile: WeatherProfile;
  cultureTags: string[];
  landmarks: FlavorItem[];
  foodCulture: FlavorItem[];
  gameDayTraditions: FlavorItem[];
  localMemes: FlavorItem[];
  rivalryFlavor: FlavorItem[];
  nightlife: number;
  campusAppeal: number;
  localPride: number;
  mediaPressure: number;
  fanIntensity: number;
  NILLocalMarket: number;
  confidence: number;
};
```

## Flavor Item

```ts
type FlavorItem = {
  id: string;
  type: "landmark" | "food" | "tradition" | "meme" | "weather" | "rivalry" | "local_reference";
  text: string;
  tone: "positive" | "neutral" | "negative" | "joking";
  confidence: number;
  sourceIds: string[];
  approved: boolean;
  tags: string[];
};
```

## Gameplay Uses

## Recruiting Visits

Town/campus fit affects visit outcome.

Examples:

- recruit loves small-town atmosphere
- recruit wants urban NIL market
- family likes campus safety/comfort
- weather/culture mismatch lowers fit

## Player Morale

Location fit affects:

- homesickness
- transfer risk
- happiness
- family influence
- campus adjustment

## NIL

Town/local market affects:

- local business NIL
- brand exposure
- booster/business opportunities

## Media/Commentary

Town flavor can appear in:

- game day notes
- rivalry stories
- recruit visit reports
- media narratives
- player adjustment events

## Content Collection Pipeline

Sources:

- Reddit/team subreddits
- fan forums
- school/city pages
- Wikipedia
- local articles
- user/crowdsourced notes

Pipeline:

```text
collect raw candidates
→ tag
→ filter
→ deduplicate
→ confidence score
→ human/user approval
→ compress to profile
→ generate gameplay-safe text
```

## Filtering Rules

Reject:

- offensive content
- personal attacks
- private information
- hyper-specific one-off jokes
- outdated references
- defamatory claims
- extreme stereotypes
- NSFW content
- political flamebait unless user explicitly wants it and it is safe

## Compression

Each school should keep:

- 5–10 landmarks
- 3–5 food/culture items
- 5–10 identity notes
- 3–5 game day notes
- 3–5 rivalry notes

Quality over quantity.

## LLM Use

LLM can summarize approved flavor into:

- recruit visit language
- media blurbs
- town profile summaries
- player homesickness notes

LLM cannot invent real local facts.

Payload must include approved FlavorItems.

## Events

- recruit family liked town
- player homesick
- local business NIL opportunity
- rivalry week local hype
- campus visit praised
- weather/culture adjustment issue

## Tests

Required:

- town profile saves/loads
- flavor items require approval
- rejected content not used
- recruit location preference affects visit
- player homesickness uses location fit
- LLM payload includes only approved items
- town flavor does not spam Program Desk

## Acceptance Criteria

This system is acceptable when:

- every school can have town identity
- town identity affects recruiting/morale lightly
- content is curated and safe
- flavor appears contextually
- no lore dumps
- user can crowdsource/import/approve content


<!-- FILE: 48_LLM_NARRATIVE_CHAT_AND_MEDIA_INTERACTION_SPEC.md -->

# 48 — LLM Narrative, Chat, and Media Interaction Spec

## North Star

LLMs should make the world feel alive.

They should not control the simulation.

The simulation produces truth.
The LLM writes grounded language from truth.

## Allowed LLM Uses

- scouting reports
- staff voice
- media blurbs
- press conference questions
- recruit/player dialogue flavor
- player meeting phrasing
- play-by-play text variation
- town flavor summaries
- weekly digest
- rivalry narrative
- award/draft blurbs

## Forbidden LLM Uses

LLM may not decide:

- ratings
- injuries
- wins/losses
- play outcomes
- commits
- transfers
- NIL approvals
- violations
- money
- eligibility
- discipline events
- hidden traits not in payload

## Narrative Service Interface

```ts
interface NarrativeService {
  generateScoutingReport(payload: ScoutingReportPayload): Promise<NarrativeResult>;
  generateStaffReport(payload: StaffReportPayload): Promise<NarrativeResult>;
  generateMediaBlurb(payload: MediaPayload): Promise<NarrativeResult>;
  generateMeetingDialogue(payload: MeetingPayload): Promise<NarrativeResult>;
  generatePlayText(payload: PlayTextPayload): Promise<NarrativeResult>;
  generateWeeklyDigest(payload: WeeklyDigestPayload): Promise<NarrativeResult>;
}
```

## Implementations

- TemplateNarrativeService
- MockNarrativeService
- LocalLLMService
- CachedNarrativeService

The game must work with TemplateNarrativeService only.

## Grounded Payload

Every payload includes:

- facts
- allowed claims
- forbidden claims
- tone
- entity references
- stats
- reason codes
- confidence
- max length
- style guide

## Narrative Result

```ts
type NarrativeResult = {
  text: string;
  provider: string;
  promptHash?: string;
  payloadHash: string;
  validationStatus: "passed" | "failed" | "fallback";
  rejectedReason?: string;
};
```

## Validator

Checks:

- unsupported injury claim
- unsupported commitment claim
- unsupported NIL amount
- unsupported violation
- unsupported quote
- unsupported stat
- profanity/unsafe output if desired
- overlong output

If failed:

```text
discard LLM output
use fallback
log issue
```

## Chat-Like Interactions

Use limited structured chats.

Examples:

- player meeting
- recruit family meeting
- press conference
- staff meeting
- booster meeting

Do not implement freeform chaos early.

## Interaction Model

```text
Simulation creates meeting context.
User chooses from structured response options.
LLM writes natural conversation around selected option.
Simulation applies deterministic consequences.
```

Do not let freeform user text directly change state until a later, heavily validated system.

## Press Conferences

Question types:

- big win
- bad loss
- rivalry
- recruit signing
- transfer loss
- player performance
- staff rumor
- NIL controversy
- playoff ranking

User responses are structured choices.

Effects:

- morale
- media relation
- fan sentiment
- recruit perception
- player trust

## Staff Voice

Staff personality changes tone:

- blunt
- analytical
- optimistic
- risk-averse
- old-school
- recruiter-salesman
- film nerd
- CEO summary

## Play-by-Play Text

Early:

```text
template only
```

Later:

```text
LLM variation from structured PlayEvent
```

LLM cannot add unsupported details.

## Caching

Cache by:

- payload hash
- provider
- model
- prompt version
- entity id
- season/week

## Offline Mode

If LLM unavailable:

- template text
- no blocked gameplay
- optional queued generation

## Events

- LLM provider offline
- narrative validation failed
- generated report ready
- cached report reused

## Tests

Required:

- service works with template provider
- unsupported claim rejected
- fallback used on failure
- payload hash stable
- LLM unavailable does not block Continue
- structured chat choice applies deterministic consequence
- freeform text cannot mutate state

## Acceptance Criteria

This system is acceptable when:

- LLM enhances immersion
- game works without LLM
- LLM cannot create facts
- structured choices drive consequences
- validation/fallback/caching exist
- reports remain grounded in sim data


<!-- FILE: 49_TEST_HARNESS_SCENARIO_BALANCE_AND_AI_QC_SPEC.md -->

# 49 — Test Harness, Scenario, Balance, and AI QC Spec

## North Star

This game cannot be manually tested.

The test harness must catch:

- impossible states
- shallow systems
- broken saves
- unrealistic stats
- recruiting imbalance
- NIL exploits
- AI school failures
- UI regressions
- long-run drift

## Test Layers

1. Unit tests
2. Integration tests
3. Scenario tests
4. Invariant tests
5. Headless sim runs
6. Statistical validation
7. Replay tests
8. UI automation
9. AI QC review package

## Invariant Suite

Must check:

- no duplicate IDs
- no player on two rosters
- no invalid eligibility
- no invalid schedule
- no team plays itself
- no duplicate games
- no recruit signs twice
- no invalid NIL deal
- no unresolved hard blocker after Continue
- no box score reconciliation errors
- no save/load state drift
- no invalid conference membership
- no orphaned assets

## Scenario Harness

Scenario file:

```ts
type Scenario = {
  id: string;
  description: string;
  seed: string;
  setup(world: GameWorld): GameWorld;
  actions: ScenarioAction[];
  expected: ScenarioExpectation[];
};
```

Required scenarios:

- QB injury depth chart
- NIL deal flagged
- top recruit rival push
- player transfer risk
- redshirt limit warning
- staff poached
- practice extreme fatigue
- custom conference schedule
- pep talk backfires
- late bloomer rises
- penalty nullifies touchdown
- play-by-play box score reconciliation
- AI school misses QB cycle
- booster restricted gift
- coach change portal wave

## Headless Runner

Commands:

```bash
npm run sim -- --seed 123 --seasons 1
npm run sim -- --seed 123 --seasons 5
npm run sim -- --seed 123 --seasons 20
npm run scenario -- --id nil_deal_flagged
npm run validate -- --run sim_runs/seed_123
```

## Sim Run Output

```text
sim_runs/{runId}/
  summary.json
  schools.csv
  players.csv
  prospects.csv
  games.csv
  plays.csv
  stats.csv
  recruiting.csv
  transfers.csv
  nil.csv
  draft.csv
  awards.csv
  events.csv
  anomalies.json
  validation_report.md
  ai_qc_packet.md
```

## Statistical Validation

Validate:

- recruiting star counts
- prospect development rates
- elite player counts
- game stats
- play outcome rates
- NIL deal ranges
- transfer volume
- draft distribution
- school dominance
- AI school roster health
- awards distribution

## Balance Presets

Allow:

- realistic
- chaos
- low NIL
- high NIL
- development heavy
- portal chaos
- old-school
- custom

Each preset should be validated separately.

## AI QC Packet

Export concise package for AI reviewer:

- run summary
- anomalies
- top statistical outliers
- school dominance
- player leaderboards
- recruiting distribution
- draft distribution
- NIL distribution
- transfer distribution
- event repetition
- sample narratives

## AI QC Prompt

```text
You are QA director for a college football management sim.

Review the attached run.

Find:
- impossible states
- unrealistic distributions
- broken incentives
- shallow systems
- AI school failures
- exploits
- repetitive events
- missing consequences

For each issue:
1. severity
2. evidence
3. likely cause
4. proposed fix
5. regression test
```

## Replay

Replay requirements:

- replay from save
- replay game
- replay week
- compare state hash
- inspect action log
- inspect event log

## UI Automation

Use Playwright.

Smoke flows:

- start career
- open Program Desk
- resolve blocker
- open roster
- sort/filter table
- open player profile
- open recruiting board
- offer recruit
- set practice plan
- simulate game
- view box score
- save/load

## Test Acceptance

A system is not accepted unless:

- unit tests cover formulas
- integration tests cover state changes
- save/load tests cover stateful objects
- scenario test exists for important edge case
- invariants updated
- headless validation available if simulation-relevant

## Release Gates

Alpha:

- one-season headless sim passes
- core invariants pass
- save/load passes
- no reconciliation errors

Beta:

- 20-season sim passes
- AI schools stable
- stat distributions plausible
- recruiting distributions plausible
- draft distribution plausible
- NIL market plausible
- UI smoke tests pass

## Acceptance Criteria

Testing system is acceptable when:

- headless sim exists
- scenarios exist
- invariants exist
- validation reports exist
- AI QC packet exports
- replay scaffold exists
- UI smoke tests exist
- every fixed bug gets regression test


<!-- FILE: 50_VERTICAL_SLICE_INTEGRATION_AND_ACCEPTANCE_PLAN.md -->

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


<!-- FILE: 51_READY_TO_PASTE_BUILD_PROMPTS_REMAINING_SYSTEMS.md -->

# 51 — Ready-To-Paste Build Prompts for Remaining Systems

## Prompt: SAVE-1 Database and Save Architecture

```text
Implement SAVE-1 — Database, Save, Migration, and Event Log foundation.

Goal:
Create a persistence foundation for the CFB-FM project.

Deliver:
- SaveMetadata type
- GameWorld serialization interface
- SaveRepository interface
- JSON snapshot save/load implementation for early build
- save version field
- migration registry
- event log type
- action log type
- state validation scaffold
- tests

Hard rules:
- no UI-only state
- save/load round trip required
- migrations must be explicit
- event/action log must be append-only
- no simulation logic in UI

Acceptance:
- generated world save/load round trip passes
- migration registry can register fake migration in test
- action log entry can be written/read
- validation catches duplicate IDs in test
```

## Prompt: UI-Workspace Framework

```text
Implement UIWORK-1 — Workspace Layout Framework.

Goal:
Create reusable FM-like workspace layout components.

Deliver:
- WorkspaceShell
- WorkspaceHeader
- Breadcrumbs
- SubTabNav
- ActionBar
- RightInspector
- SavedViewSlot placeholder
- route integration for Roster and Recruiting placeholders

Hard rules:
- no fake gameplay state
- components reusable
- use data-testid hooks
- no card-only main layout
- support dense table area

Acceptance:
- workspace renders header/subtabs/inspector
- breadcrumbs render
- Roster route uses WorkspaceShell
- Recruiting route uses WorkspaceShell
- tests or Storybook-like smoke if available
```

## Prompt: STAFF-1 Staff Responsibilities Foundation

```text
Implement STAFF-1 — Staff Responsibilities Foundation.

Goal:
Make staff functional enough to own responsibilities and generate reports later.

Deliver:
- Staff entity
- StaffAttributes
- StaffPersonality
- StaffBias
- ResponsibilityAssignment
- ResponsibilityMode
- StaffWorkload shell
- tests

Hard rules:
- staff are not cosmetic
- responsibilities must be serializable
- modes include user controls, recommends, handles routine, handles unless critical, fully controls
- no UI-only staff state

Acceptance:
- staff can be assigned recruiting/scouting/practice responsibility
- responsibility saves/loads
- staff bias exists in type
- workload shell exists
```

## Prompt: SCHED-1 Conference and Schedule Generator

```text
Implement SCHED-1 — Conference and Schedule Generator v1.

Goal:
Generate legal schedules for fictional/custom conferences.

Deliver:
- ConferenceSchedulingRules
- Rivalry entity
- ScheduleGame entity
- schedule generator
- tests

Hard rules:
- no team plays itself
- no duplicate games
- protected rivalries scheduled if configured
- home/away balance attempted
- conference game count respected

Acceptance:
- generated schedule is valid
- protected rivalry included
- custom conference can generate schedule
- tests cover invalid cases
```

## Prompt: CREATOR-1 Custom School Creator Data Model

```text
Implement CREATOR-1 — Custom School Creator Data Model.

Goal:
Create the data model and validation for custom schools.

Deliver:
- CustomSchoolInput
- school creation validator
- structural power fields
- facility/NIL/town fields
- createSchoolFromInput function
- tests

Hard rules:
- created school must be real School entity
- no UI-only creator output
- invalid values rejected
- custom school must be save/load compatible

Acceptance:
- valid custom school created
- invalid custom school rejected
- custom school can join conference
- custom school survives save/load
```

## Prompt: TEST-1 Headless Sim and Invariant Harness

```text
Implement TEST-1 — Headless Sim and Invariant Harness.

Goal:
Create the testing foundation for long-run sim validation.

Deliver:
- headless sim runner scaffold
- invariant check registry
- validation report type
- anomaly type
- sample invariants
- tests

Initial invariants:
- no duplicate IDs
- no player on two rosters
- no team plays itself
- no duplicate games
- no invalid ProgramItem blocker state
- no invalid save metadata

Acceptance:
- npm script or callable function runs headless scaffold
- invariant registry executes
- failing invariant creates anomaly
- validation report exports JSON
```

## Prompt: LLM-2 Structured Meeting Interaction

```text
Implement LLM-2 — Structured Meeting Interaction Foundation.

Goal:
Create safe chat-like interactions where the user chooses structured options and LLM only writes flavor.

Deliver:
- MeetingContext type
- MeetingOption type
- MeetingOutcome type
- deterministic outcome handler
- narrative payload builder
- fallback text renderer
- tests

Hard rules:
- freeform LLM output cannot mutate state
- user choice determines simulation effect
- LLM only writes grounded language
- fallback works offline

Acceptance:
- player meeting with three choices works
- chosen option applies deterministic morale/trust effect
- narrative payload contains facts and forbidden claims
- fallback text produced without LLM
```
