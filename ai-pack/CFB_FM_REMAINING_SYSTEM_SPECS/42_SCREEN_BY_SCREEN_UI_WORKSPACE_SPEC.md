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
