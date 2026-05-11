# Roster and Recruiting Screen Redesign Spec

## Purpose

Roster and Recruiting are the benchmark screens.

If these do not look professional, the rest of the game will not feel credible.

No new major UI work should proceed until these two screens pass polish.

---

# Roster Room Redesign

## Layout

```text
ObjectHeader
TabBar
ActionBar
Main DataGrid
Right Inspector
Bottom Status/Reason Bar
```

## Header

```text
Roster Room
[School] · [Season Phase]
82 players · 4 transfer watch · Team Vibe Stable · 3 injuries
```

## Tabs

```text
Players
Depth Chart
Eligibility
Development
Morale
NIL
Transfer Risk
Reports
```

## ActionBar

- View dropdown
- Position filter
- Class filter
- Status filter
- Search
- Compare
- Columns
- Ask Staff

## Main DataGrid

Use real player rows.

No card grid.

Default view:

- Name
- Pos
- Class
- Role
- Current Ability
- Potential
- Morale
- Transfer Risk
- NIL
- Eligibility
- Dev Trend
- Injury

## Right Inspector

When player selected:

- portrait/initials
- name
- position/class
- staff summary
- trait labels
- morale/transfer risk
- next action
- quick buttons

Quick buttons:

- Open Profile
- Compare
- Meet With Player
- Set Dev Focus
- Add Watch
- View Stats

## Empty Selection Inspector

Shows:

- staff top roster concern
- next recommended action
- team vibe
- transfer watch summary

## Visual Target

Professional, compact, dark management sim.

Warmth only in subtle accents.

## Reject If

- roster is shown as cards
- player rows are oversized
- no filters
- no right inspector
- no tabs
- no column control
- no click-through

---

# Recruiting Room Redesign

## Layout

```text
ObjectHeader
TabBar
ActionBar
Main DataGrid
Right Inspector
Bottom Reason/Status Bar
```

## Header

```text
Recruiting Room
2032 Class · 17 targets · #18 class · 4 official visits scheduled
```

## Tabs

```text
Board
Search
Needs
Visits
Offers
Commitments
Competitors
Staff
Analytics
```

## ActionBar

- View dropdown
- Position filter
- State/Region filter
- Stars filter
- Interest filter
- Confidence filter
- Search
- Assign Scout
- Add Target
- Columns

## Main DataGrid

Default board columns:

- Name
- Pos
- State
- Stars
- Rank
- Your Eval
- Confidence
- Interest
- Relationship
- NIL
- Playing Time Fit
- Development Fit
- Scheme Fit
- Staff
- Last Contact
- Risk

## Right Inspector

When recruit selected:

- profile summary
- trait labels
- why he likes you
- why he hesitates
- top competitors
- staff recommendation
- next action
- reason codes

Quick buttons:

- Open Profile
- Contact
- Assign Scout
- Offer
- Schedule Visit
- Make Pitch
- Compare
- Add Watch

## Visual Target

Should feel like a recruiting board, not a set of cards.

Serious, dense, high-signal.

## Reject If

- priority targets appear as cards
- filters are separate panel cards
- no saved views
- no right inspector
- no scouted uncertainty display
- no reason codes
- no staff owner/action column

## Acceptance Criteria

Roster and Recruiting redesign passes when:

- both use DataGrid
- both have tabs/action bars
- both have right inspectors
- both support saved views
- both have compact density
- both look professional at 1440x900
- both can support 100+ rows without looking broken
