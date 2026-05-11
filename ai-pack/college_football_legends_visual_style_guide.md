# College Football Legends — Visual Style Guidebook

## 1. North Star

**College Football Legends** should feel like a premium, fictional American college football dynasty simulator: part modern sports broadcast package, part coach’s office command center, part legacy-building RPG. The interface is not playful or arcade-first. It is serious, dense, confident, and built for long-term immersion.

The screenshots establish a consistent fantasy:

- The user is not just playing games; they are **running a program**.
- Every screen should feel like a high-end athletic department dashboard.
- The UI should communicate prestige, pressure, tradition, rankings, rivalries, money, recruiting, staff management, player development, and week-to-week stakes.
- It should look like a cross between Football Manager, EA-style college football presentation, ESPN/CFP broadcast graphics, and a dark executive control panel.
- The game should make the player feel like a head coach, general manager, recruiter, program architect, and dynasty-builder all at once.

The visual identity is **dark, metallic, grid-based, data-heavy, school-branded, prestige-driven, and cinematic**.

---

## 2. Core Visual Mood

### Overall vibe

The UI should feel:

- Premium
- Heavy
- Dense
- Tactical
- Serious
- Masculine without being cartoonish
- Sports-broadcast adjacent
- Menu-forward
- Coach-office / war-room inspired
- Slightly gritty
- High-contrast
- Legacy/tradition focused
- Built for repeat daily/weekly management loops

This is not a light mobile app UI. It is a console/PC sports management interface with deep menu systems, persistent sidebars, compact data widgets, ranked lists, sortable tables, and rich team identity.

### Emotional tone

The game should evoke:

- Pressure: week-to-week decisions matter.
- Prestige: every program has history, status, and expectations.
- Control: the player can manage everything.
- Competition: rankings, rivalry games, recruiting battles, and staff ratings are always visible.
- Momentum: the season calendar and news ticker make the world feel alive.
- Identity: every screen should immediately communicate the user’s school, colors, logo, record, rank, and current week.

---

## 3. Global Layout Philosophy

The screenshots show several page archetypes, but all share the same structural DNA.

### Primary layout forms

There are five major layout types:

1. **Dashboard / Team Hub Grid**  
   Dense card-based overview of team status, upcoming schedule, standings, leaders, recruiting, staff, polls, resources, and continue/play-week button.

2. **Sidebar Management Layout**  
   A vertical left navigation rail with the main workspace in the center and supporting panels on the right. Used for dashboards, team hub, recruiting, scouting, staff, tactics, development, program screens, and news.

3. **Full-Width Table Layout**  
   Main content dominated by a sortable data table, usually recruiting/scouting/NIL. Right side contains selected-player detail panel or summary panel.

4. **Cinematic Event Layout**  
   Signing Day, player morale event, coach response, rivalry week, playoff reveal, transfer decision, etc. Uses hero imagery, large headline text, story framing, and player/coach decision choices.

5. **Campus Map / Program Facilities Layout**  
   Isometric/aerial campus image with interactive facility nodes overlaid. Side panel gives week context, schedule, team status, and performers. This is the most world-building-heavy page type.

---

## 4. Screen Density and Information Architecture

The UI should be intentionally dense. A player should be able to glance at a screen and understand:

- Current team
- Current week/season
- Record and ranking
- Next opponent
- Team ratings
- Recruiting status
- Staff quality
- Current tasks
- Budget/resources
- Poll movement
- News/world events

Avoid sparse modern SaaS design. This game is closer to a sports sim control room. Cards, tables, badges, small labels, icons, and rankings should fill the screen.

### Density rules

- Most screens should use 3-column or multi-panel layouts.
- Important screens should include at least one persistent context region: top bar, left nav, right panel, bottom ticker, or footer resources.
- Cards should rarely be empty; each card should include labels, metrics, icons, small rankings, status text, or CTAs.
- Tables should show many columns, but remain readable through strong alignment, row dividers, and compact typography.
- Use repeated separators: vertical rules, subtle borders, horizontal dividers, muted panels, and card sections.

---

## 5. Color System

### Base palette

The base UI is almost always dark:

- Near-black charcoal backgrounds
- Deep navy-black panels
- Gunmetal gradients
- Subtle steel-blue tints
- Dark slate surfaces
- Black glass overlays
- Muted gray dividers

Suggested base colors:

- **Background black:** `#070A0D`
- **Deep navy charcoal:** `#0D1319`
- **Panel charcoal:** `#12181E`
- **Raised panel:** `#182027`
- **Card gradient start:** `#1A222A`
- **Card gradient end:** `#0D1116`
- **Border gray:** `#2C343D`
- **Fine divider:** `#313942`
- **Muted text:** `#A8B0B8`
- **Dim text:** `#6F7882`
- **Primary white:** `#F2F4F5`

### Accent palette

The UI heavily uses team-branded accent colors. Each school’s colors should dominate highlights, navigation selection, buttons, cards, headers, and rankings.

Common accent families:

- Alabama / USC / Minnesota / Missouri: deep crimson, cardinal, maroon, burgundy
- USC / Vanderbilt / gold UI: gold, brass, amber
- Penn State / dark UI: navy and white
- Oregon / recruiting interest: green
- Warning/risk: yellow/orange
- Failure/negative: red
- Success: green

Suggested universal semantic colors:

- **Success green:** `#75D24A`
- **Warning gold:** `#F4C542`
- **Danger red:** `#E34545`
- **Neutral gray:** `#8E969E`
- **Elite rating green:** `#52CF45`
- **Prestige gold:** `#D8B04A`

### Team-color behavior

Each program should define:

- Primary color
- Secondary color
- Tertiary/trim color
- Logo color treatment
- Button gradient treatment
- Selected row color
- Header glow/gradient
- Accent underline color

Examples from screenshots:

- Alabama screens use crimson headers and crimson buttons.
- USC screens use cardinal backgrounds with gold highlights and gold selected navigation underline.
- Vanderbilt uses black/gold prestige styling.
- Minnesota uses maroon header panels with gold team logo.
- Missouri uses maroon/gold over an aerial campus screen.

---

## 6. Surface Treatment

Panels should look layered and tactile, not flat.

### Common panel treatment

- Dark gradient fill
- Thin one-pixel border
- Slight inner shadow
- Slight top-edge highlight
- Subtle background texture/noise
- Minimal blur/glass effect in some overlays
- Sharp or slightly rounded corners, generally not pill-shaped

Recommended CSS-like treatment:

```css
background: linear-gradient(180deg, #1B232B 0%, #0D1116 100%);
border: 1px solid rgba(255,255,255,0.12);
box-shadow:
  inset 0 1px 0 rgba(255,255,255,0.06),
  0 8px 24px rgba(0,0,0,0.35);
```

### Card corner radius

The images use mostly restrained corners:

- Main cards: 2–6 px radius
- Buttons: 2–5 px radius
- Circular ratings and meters: fully round
- Profile/image frames: square or slightly rounded

Avoid soft consumer-app rounded rectangles. This should look more like a sports broadcast system, not a productivity app.

### Textures

Use subtle texture in backgrounds:

- Diagonal line patterns
- Stadium shadows
- Brushed metal noise
- Very faint carbon fiber / grid texture
- Dark vignette around screen edges
- Paper/poster texture only on special hero screens if appropriate

---

## 7. Typography

Typography is central. The screenshots rely on condensed, athletic, all-caps type.

### Primary font personality

Use a bold condensed sports font for:

- Screen titles
- Team names
- Card headings
- Major numbers
- Event headlines
- Section labels
- Buttons
- Navigation labels

The font should resemble:

- Varsity-adjacent athletic block lettering
- Condensed broadcast graphics
- Tall uppercase sports typography
- Slightly industrial sans-serif

Good approximations:

- Bebas Neue
- Oswald
- DIN Condensed
- Tungsten-style condensed fonts
- Knockout/Gotham Condensed-inspired fonts
- Agency FB-like sports UI fonts

### Secondary font personality

Use a clean sans-serif for:

- Data labels
- Body text
- Player notes
- Descriptions
- Table values
- News snippets

Good approximations:

- Inter
- Roboto Condensed
- IBM Plex Sans Condensed
- Source Sans 3
- Rajdhani

### Typography rules

- Most labels are uppercase.
- Headings are condensed, bold, and high contrast.
- Numbers are large, bold, and often brighter than labels.
- Labels are smaller, muted gray, uppercase.
- Body text is compact and readable, usually 12–16 px depending on layout.
- Buttons use uppercase text with wide tracking.
- Player names use bold white, sometimes with a smaller metadata line below.
- Rankings use large numeric hierarchy.

### Suggested scale

- Game logo: 36–64 px, bold block
- Main screen title: 28–48 px condensed uppercase
- Card title: 16–22 px condensed uppercase
- Big metric: 28–48 px
- Medium metric: 20–28 px
- Table name: 14–17 px bold
- Metadata: 10–13 px uppercase/condensed
- Sidebar nav: 13–16 px uppercase/condensed
- Ticker text: 11–14 px

---

## 8. Logos and Branding

### Game logo

The game logo appears as **COLLEGE FOOTBALL LEGENDS**, usually in white, cream, or gold, with star accents. It should feel like a premium sports title logo. The mark may include:

- Shield emblem
- Stars
- Football icon
- Block lettering
- Distressed/embossed texture
- Cream/gold trim

Logo should usually live in:

- Top-left header
- Left sidebar top
- Bottom-left footer
- Campus/event screens

### Team branding

Every screen should emphasize the controlled program:

- Team logo
- Team name
- Nickname
- Record
- Conference record
- Head coach name
- Season/week
- Prestige/rank
- Next opponent

Team identity should be visible in the top header or sidebar on nearly every screen.

### Logo use

- Opponent logos should appear in schedule rows, matchup cards, and rankings.
- Rankings should include small team logos for visual scanning.
- Recruiting tables should include small logos for top schools.
- Selected school logo should influence selected row color and action button color.

---

## 9. Global Header Patterns

There are several viable header types.

### A. Top horizontal program header

Seen in dashboard and recruiting screens.

Contains:

- Game logo or program logo at far left
- Team block: logo, school name, nickname, coach, season/year
- Program prestige or star rating
- Record/rank
- Next game
- Icon buttons: search, inbox, settings, notifications
- Continue button on right

Behavior:

- Header background uses team primary color gradient or black glass.
- Team block should be prominent.
- Information is separated by thin vertical dividers.
- Continue button should be a dominant CTA, usually team-accent gradient or gold/green depending on context.

### B. Left logo + top nav tabs

Seen in USC-style dynasty screens.

Contains:

- Game logo top-left
- Team badge and name
- Horizontal section tabs: Dashboard, Team, Recruiting, Tactics, Schedule, Program, Dynasty
- Search/settings/continue at right

Behavior:

- Active tab has bright underline, often gold.
- Header height is moderate, around 80–110 px.
- Useful for broad top-level navigation.

### C. Tall branded header ribbon

Seen in Alabama dashboard.

Contains:

- Large team logo
- Team name
- Coach and season line
- Prestige stars
- Record
- Ranking
- Next game
- Continue button

Behavior:

- Uses deep crimson gradient for team identity.
- Strong sense of broadcast package.
- Good for main dashboard home screen.

---

## 10. Left Sidebar Navigation

Sidebar navigation is one of the strongest repeated patterns.

### Visual treatment

- Fixed vertical rail on the left
- Dark gradient background
- Game logo at top
- Nav items stacked with icon + label
- Active item highlighted with team-color block or gradient
- Notification badges for inbox/recruiting/transfer portal
- Secondary grouping labels such as TEAM, PROGRAM, DATA HUB
- Bottom settings link
- Sometimes includes current week/game info at bottom

### Sidebar width

Typical widths:

- Narrow icon rail: 80–110 px
- Full sidebar: 180–240 px

### Navigation groups

Common nav sections:

**General**
- Dashboard
- Home
- Inbox
- News
- League News
- Social Feed

**Team**
- Team Hub
- Team Overview
- Roster
- Depth Chart
- Training
- Player Morale
- Development
- Injury Report

**Program**
- Staff
- Facilities
- Finances
- Alumni
- Program History
- Conference
- Rivals

**Competition**
- Schedule
- Standings
- Conferences
- Stats
- Awards Watch
- CFB Rankings
- Recruiting Rankings

**Football Operations**
- Tactics
- Playbook
- Gameplan
- Scouting

**Talent Acquisition**
- Recruiting
- Recruiting Board
- Prospect Search
- Recruiting Classes
- Visits
- Targets
- Recruiting Strategy
- NIL & Budget
- Transfer Portal

**System**
- Game Settings
- Settings

### Active state

Active nav item should use:

- Team-color background block or gradient
- White icon/text
- Thin bright left border or full red/cardinal block
- Optional badge count

Inactive items use:

- Muted gray icon/text
- Hover state brightens slightly
- Group labels in small uppercase gray

---

## 11. Bottom Bars and Tickers

Many screens include a bottom information strip.

### Ticker bar

Use for:

- Top 25 poll updates
- SEC/Big Ten/news ticker
- Recruiting commits
- Injury updates
- Heisman watch
- Transfer portal alerts
- Score updates

Visual style:

- Thin dark bar at bottom
- Small uppercase category label at left
- Items separated by vertical lines, bullets, or dots
- Text scrolls horizontally or cycles
- Important rankings highlighted with team color or gold

### Controller hint bar

Some console-style screens include bottom-left button hints:

- A Select
- B Back
- X Inbox / Sort
- Y Help / Team Needs
- Menu

Visual style:

- Colored circular controller icons
- Small muted labels
- Fits along bottom edge
- Optional right-side resource strip

### Resource footer

Some dashboard screens include bottom resources:

- Program funds
- Energy
- Fan confidence
- Prestige points
- Recruiting budget
- Scholarships

Visual style:

- Dark footer bar
- Icon + label + value blocks
- Thin vertical separators
- Continue button at far right

---

## 12. Buttons and CTAs

### Primary buttons

Examples:

- CONTINUE
- PLAY WEEK
- VIEW MATCHUP PREVIEW
- VIEW RECRUITING
- VIEW STAFF
- GAME PREVIEW
- RECRUITING BOARD
- PORTAL CENTER

Visual treatment:

- Team-color gradient, commonly crimson/cardinal/maroon
- Thin bright border or inner highlight
- White uppercase condensed text
- Chevron arrow on right for navigation
- Slightly beveled, serious feel

### Secondary buttons

Examples:

- View Full Schedule
- View Full Rankings
- View All Stats
- View All Tasks
- Scout Player
- Remove from Board
- Add to Shortlist

Visual treatment:

- Dark fill
- Gray border
- Muted white text
- Icon optional
- Smaller height

### Gold buttons

Used for:

- Continue on USC/gold screens
- Active Signing Day actions
- High-prestige CTA moments

Treatment:

- Gold/yellow gradient
- Dark text or black text
- Strong contrast
- Slight shine

### Button rules

- Buttons should be rectangular, not overly rounded.
- Use uppercase text.
- Include directional arrows for navigation/continue.
- Primary action should always be visually obvious.
- Buttons inside cards should align full-width or bottom-aligned.

---

## 13. Cards and Widgets

### Card hierarchy

Cards fall into several types:

1. **Summary cards** — team overview, record, ratings, prestige.
2. **Metric cards** — OVR/OFF/DEF/ST, PPG, turnover diff, 3rd down, red zone.
3. **List cards** — standings, staff overview, team leaders, schedule.
4. **Story cards** — news, morale, top stories.
5. **Decision cards** — coach response options.
6. **Budget cards** — funds, allocation, NIL demand.
7. **Recruiting cards** — class rank, commits, needs, top targets.
8. **Facility map nodes** — interactive campus locations.

### Card anatomy

Most cards include:

- Header/title in condensed uppercase
- Optional subtitle / context line
- Divider line
- Content grid/list/metric
- CTA button at bottom
- Team-color accent strip, selected row, or small highlight

### Card spacing

- Use tight but readable padding.
- Cards are aligned to a strict grid.
- Gaps are consistent, usually 12–20 px.
- Internal row spacing is compact.

---

## 14. Dashboard / Team Hub Screens

Dashboard screens are the main home base.

### Purpose

The dashboard should let the player quickly understand the current week and decide what to do next.

### Common content blocks

- Current week matchup
- Team hub hero image
- Team performance stats
- Team chemistry
- Program prestige
- Conference standings
- Team leaders
- Upcoming schedule
- Recruiting class status
- Staff overview
- Top 25 poll ticker
- Resources footer
- Continue/play week button

### Layout pattern 1: Three-column grid

Left column:

- Week matchup card
- Chemistry card
- Prestige card

Center column:

- Team Hub hero image
- Stat row below hero
- Standings card
- Team leaders card

Right column:

- Upcoming schedule
- Recruiting class
- Staff overview

Bottom:

- Top 25 poll ticker
- Footer resources and Continue button

### Layout pattern 2: Sidebar + central schedule/team overview + right news/rankings

Left:

- Full sidebar nav

Center-left:

- Next match card
- Schedule list

Center:

- Team overview card
- Key players
- Team stats per game

Right:

- Top stories
- Top 25 rankings
- Recruiting overview
- Tasks

### Dashboard visual rules

- Keep the current opponent visible.
- Record/ranking should appear near team name and matchup card.
- Use logos heavily in matchup and schedule rows.
- Team stats should use large numbers and rank labels.
- Avoid giant empty spaces.
- Use a news ticker to make the world feel alive.

---

## 15. Matchup Cards

### Content

A matchup card should include:

- Week number
- Season year
- Team logo/name/record
- Opponent logo/name/record
- VS or AT marker
- Date
- Stadium
- City/state
- Time and TV/network if applicable
- Weather if relevant
- Button: View Matchup Preview / Game Preview / Play Week

### Visual treatment

- Opposing team logos large and balanced.
- VS marker in center, sometimes shield-shaped.
- Team names in bold uppercase.
- Records smaller below.
- Venue details in muted gray.
- Primary button at bottom.

### Variants

- Next Match card can use stadium background image darkened behind logos.
- Rivalry game should include trophy/rivalry label.
- Bye week should appear in schedule but no matchup card necessary.

---

## 16. Team Overview Ratings

Team ratings appear repeatedly.

### Rating metrics

Common ratings:

- OVR
- OFF
- DEF
- ST
- Team morale
- Chemistry
- Coach prestige
- Program prestige
- Fan support
- Facilities
- Academics
- Brand exposure
- NIL collective

### Visual forms

1. **Circular ring gauges**  
   Used for OVR/OFF/DEF ratings. White ring with red/team-color progress and big number in center.

2. **Boxed number tiles**  
   OVR/OFF/DEF/ST values in compact square tiles.

3. **Letter grades**  
   A+, A, A-, B+, B, etc. Usually green/yellow.

4. **Star ratings**  
   Program prestige, recruiting class, prospect rating.

5. **Progress bars**  
   Morale, chemistry, coach prestige XP, fan support.

### Rules

- Ratings should be instantly scannable.
- Big numbers should be white or green.
- Labels should be small uppercase gray.
- Elite values use green or gold.
- Poor values use red/orange.

---

## 17. Schedule Lists

Schedule rows are compact and logo-heavy.

### Row content

- Date or week
- Opponent logo
- Opponent name
- Home/away marker: vs / at
- Result: W/L or pending
- Score
- Conference marker if applicable
- Ranking marker if opponent ranked
- Time/TBD for future games

### Visual treatment

- Thin horizontal separators
- Green W, red L
- Opponent logos aligned left
- Scores aligned right
- Current/next game may be highlighted
- Bye week appears as text row

### Variants

- Full schedule card on dashboard
- Upcoming schedule compact list on right rail
- Season schedule larger table with multiple columns

---

## 18. Standings and Rankings

### Standings cards

Content:

- Conference/division label
- Rank number
- Team logo
- Team name
- Conference record
- Overall record

Visual treatment:

- Selected/player team row highlighted in team color
- Thin row separators
- Compact table headings
- Logos small but visible
- Rank left-aligned

### Top 25 ranking cards

Content:

- Rank
- Team logo
- Team name
- Record
- Filter dropdown: CFP / AP / Coaches / Week
- User’s team highlighted

Visual treatment:

- Dark table
- Selected team highlighted crimson/maroon
- Top rank rows use strong contrast
- Top 5 visible, full rankings button below

### Ticker ranking strip

- Shows top 5 teams and user team position.
- Format: `1 Georgia (7-0) | 2 Ohio State (6-0) | ... | 18 Minnesota (5-2)`

---

## 19. Team Leaders and Player Lists

### Team leader card content

- Small player headshot
- Stat category
- Player name
- Stat value
- Optional position

Examples:

- Passing YDS
- Rushing YDS
- Receiving YDS
- Tackles
- Sacks
- Interceptions

### Visual treatment

- Headshot aligned left
- Category label small gray uppercase
- Player name bold white
- Stat value large or right-aligned
- Rows separated by thin dividers
- Player headshots cropped to shoulders, realistic sports-photo style

---

## 20. Staff Overview

### Content

- Staff role abbreviation
- Headshot
- Name
- Specialty/rating
- Letter grade or numeric grade

Examples:

- OC Brian Smith A-
- DC Jake Landry B+
- STC Matt Barnes B
- Recruiting Coord Pat Kelly A-
- Position coaches with OFF/DEF/COA ratings

### Visual treatment

- Compact rows
- Headshots small circular/square
- Ratings color-coded
- CTA: View Staff / Staff Management

### Staff identity

The staff should feel like a real management layer, not a static list. Each coach should have:

- Role
- Name
- Specialty
- Grade
- Recruiting skill
- Development skill
- Scheme fit
- Prestige contribution

---

## 21. Recruiting Overview Cards

Recruiting appears constantly because it is central to the game.

### Common metrics

- Recruiting class rank
- National rank
- Conference rank
- Commits
- Signed
- Undecided
- Offers
- Scholarships used/available
- Top commit
- Team needs
- Star breakdown

### Visual treatment

- Large class rank number, e.g. `#16`, `#1`, `#3`
- Supporting metrics in boxes
- Stars in gold
- CTA button: View Recruiting / Recruiting Board
- Top commit row with portrait, name, position, hometown, stars, destination

---

## 22. Recruiting Board / Scouting Table Screen

This is a major page type.

### Purpose

Let the player evaluate and manage prospects with sortable, filterable data.

### Layout

Left:

- Sidebar navigation

Top:

- Team/program header
- Current week/season
- Continue button
- Recruiting-specific tabs

Center:

- Recruiting Board table
- Filters/dropdowns above table
- Pagination below
- Action buttons below table

Right:

- Selected prospect detail panel
- Prospect portrait
- Rank/position
- Name
- Stars
- Height/weight/class/hometown
- Top schools
- Overview/ratings/stats/reports/history tabs
- Scouting percentage
- Interest level
- Offer status
- Visit status
- Player notes
- Scouting summary
- Attribute snapshot
- View Full Report button

### Top filters

Examples:

- Recruiting class year dropdown
- Position dropdown
- Region dropdown
- View: Ratings
- Filters
- Sort by

### Recruiting table columns

Minimum recommended columns:

- Rank
- Portrait
- Name
- Stars
- Position
- Position rank
- Overall rating
- State
- Interest level
- Top schools
- Offer status
- Visit status
- Risk

Possible expanded columns:

- Height
- Weight
- Hometown
- National rank
- Pipeline region
- Archetype
- Personality
- Development trait
- NIL demand
- Academic fit
- Scheme fit

### Table visual treatment

- Dark rows with subtle alternating shade
- Strong selected row outline/highlight in team color
- Prospects include portrait thumbnails
- Stars in gold
- Ratings in green if elite
- Interest bars use green/yellow/red
- Logos for top schools aligned horizontally
- Bottom shows `8 of 1000` or pagination
- Action buttons use icon + label

### Prospect detail panel

Visual details:

- Large colored header using team accent
- Large portrait on left or center
- Rank number in top-left, e.g. `#1`
- Position in top-right, e.g. `QB`
- Name large and stacked
- Stars below name
- Metadata lines compact
- Tabs under portrait/header
- Data cards below

### Attribute snapshot

Use horizontal bars:

- Arm Strength
- Accuracy
- Decision Making
- Pocket Presence
- Athleticism
- Speed
- Agility
- Leadership

Bars should be green for high values.

---

## 23. Signing Day Table Screen

There are two Signing Day styles in the images: a management-table version and a cinematic reveal version.

### Signing Day — Management Table Version

Purpose:

- Finalize recruiting class.
- Track commits, signed players, undecided prospects.

Layout:

- Left sidebar nav
- Top USC/program header
- Page title: SIGNING DAY
- Summary stats row: commits, signed, undecided, class rank
- Tabs: All Commits, Signed, Undecided
- Filters: Position, More Filters
- Main recruit table
- Right class summary panel
- Team needs panel
- Bottom news feed and Continue button

Table columns:

- Rank
- Player
- Stars
- Position
- Height
- Weight
- Hometown
- Nat rank
- Status
- Interest/top schools

Status examples:

- Signed with green check
- Undecided
- Interest percentages for multiple schools

Right panel:

- Program logo
- National rank
- Conference rank
- Stars
- Commits/signed count
- Position breakdown
- Team needs list with LOW/MEDIUM need labels
- Button: View Recruiting Board

### Visual tone

This version is operational. It should feel like the final administrative screen for National Signing Day.

---

## 24. Cinematic Signing Day Screen

### Purpose

Make top recruit signings feel like major sports events.

### Layout

- Large game logo top-left
- Current user program card left
- Center hero signing card
- Right class rankings panel
- Bottom carousel of today’s signings
- Bottom news ticker and controller hints
- Week/signing day/coach prestige UI at top-right

### Hero card

Content:

- Recruit rank: `#1 Overall Recruit`
- Portrait in uniform
- Name huge, with signature-like script first name possible
- Position, height, weight, hometown
- Top schools row with logos
- Big stamped `SIGNED`
- Destination team/logo

Visual treatment:

- Locker room / recruiting room background
- Dark vignette
- Team-color panel behind player
- Gold stamp effect
- Large dramatic typography
- This should feel like a TV broadcast commitment reveal

### Today’s Signings carousel

Each card includes:

- Position
- Stars
- Rank
- Portrait
- Name
- Hometown
- Signed status with green check

One card can be `More to come` with a plus sign.

### Class rankings panel

Content:

- Rank number
- Team logo
- Points
- User team highlighted
- Button: Full Rankings

---

## 25. NIL & Budget Recruiting Screen

### Purpose

Manage NIL collective funds and allocate offers/resources to prospects.

### Layout

Left:

- Recruiting sidebar, active `NIL & Budget`
- Recruiting summary card below

Top:

- Season/offseason/week
- Program identity
- Influence score
- Program prestige
- Fan support

Main:

- Page title: NIL & BUDGET
- Explanatory subtitle
- Left budget overview card
- Left budget allocation donut chart
- Large prospects table on right
- Bottom Top 25 ticker

### Budget overview card

Content:

- Total NIL budget
- Spent
- Committed
- Available
- Monthly income
- Monthly expenses

Visual treatment:

- Total budget in large bright green
- Available also green
- Spent/committed in white/gray
- Use monetary formatting: `$13.65M`, `$1.25M`, `$950K`

### Budget allocation chart

Use donut chart with position categories:

- QB
- WR
- OL
- DL
- LB
- DB
- TE
- ATH

Show percent and dollar amount next to each.

### NIL prospect table columns

- Rank
- Prospect
- Position
- Overall
- Interest/team logo
- NIL demand
- Offer
- Visit
- Interest percentage ring
- Risk

### Risk colors

- Low: green
- Medium: yellow/gold
- High: red/orange

### Important vibe

This screen should feel more executive/financial than pure recruiting, but still sports-branded. It should not look like an accounting app; it should look like a recruiting war room with money layered on top.

---

## 26. News / Dynasty Event Screen

### Purpose

Deliver narrative events and decisions that affect morale, loyalty, performance, prestige, chemistry, or roster retention.

### Layout

- Top header with team/program
- Left sidebar with News selected and grouped nav
- Main hero story card
- Right rail with team overview, CFP rankings, upcoming schedule
- Bottom news ticker

### Hero event card

Content:

- Large cinematic player image
- Event category label, e.g. PLAYER MORALE
- Huge headline, e.g. STAR QB SEEKS ASSURANCES
- Description text
- Coach’s Response section
- Multiple decision options
- Outcome hints on right side of each option

### Decision option card anatomy

- Icon in circular badge
- Option title in uppercase
- Short description
- Outcome modifiers aligned right
- Selected/hovered option has gold outline or team-color border

Example options:

- Meet and Reassure: + Morale, + Loyalty
- Adjust Offensive Plan: + Morale, + Performance
- Involve Team Leaders: + Morale, Neutral
- Challenge Him: - Morale, + Competitiveness

### Visual treatment

- Hero image darkened at bottom for text readability
- Large headline in white condensed type
- Category pill in team color
- Decision area below hero image separated by dark panel
- Effects use green/red/yellow text

### Narrative principles

These screens are where the game becomes more like CK3/RPG. Decisions should:

- Have tradeoffs
- Affect multiple systems
- Be flavored by player personality, coach personality, team chemistry, and program culture
- Create emergent stories
- Sometimes cause follow-up events

---

## 27. Coaches Hub / Staff Management Dashboard

### Purpose

Give the player a high-level operational view as head coach/GM.

### Layout

- Left sidebar
- Top header with team identity and coach prestige
- Main cards arranged in grid
- Bottom schedule/team leaders blocks
- Resource footer

### Common cards

- Team overview: OVR/OFF/DEF/ST, morale, chemistry
- Last game: result and score
- Next game: logos, opponent, date, stadium, rivalry label
- Coach prestige: numeric rating, progress bar to next level
- Recruiting overview: class rank, commits, star breakdown, scholarships
- Transfer portal: targets, available players, needs
- Staff overview: coach names/roles/ratings
- Season schedule table
- Team leaders list

### Coach prestige card

Should include:

- Numeric prestige value, e.g. `88`
- Title label, e.g. LEGEND
- Progress bar
- XP value, e.g. `5,320 / 6,000`
- Next level label

This gives RPG progression to coaching career.

---

## 28. Campus Map / Facilities Screen

### Purpose

Visualize the program as a campus and give facilities/program systems a physical home.

### Layout

- Full-screen aerial campus image
- Top header with team identity, prestige, budget, NIL budget, coach trust
- Left vertical week/status panel
- Interactive facility nodes overlaid across campus
- Bottom controller hint bar and motto

### Background

Use high-quality aerial/isometric campus art:

- Stadium visible
- Practice fields
- Athletic buildings
- Academic buildings
- Admin buildings
- Water/landscape if applicable
- Fall colors can add collegiate atmosphere
- Should feel like a believable university campus, not a generic city map

### Facility nodes

Nodes are rectangular dark labels with icons and subtitles.

Examples:

- Athletic Facilities — Practice, Training & Recovery
- Recruiting Center — Scout Prospects & Recruits
- Stadium — Game Day & Atmosphere
- Team Hub — Manage Coaches & Players
- Academic Center — Academics & Student Life
- Scouting Department — Opposition Scouting & Analysis
- Administration — Budget, Staff & Upgrades

Visual treatment:

- Team-color header/left icon block
- Dark translucent body
- Thin gold or team-color border
- White uppercase title
- Smaller muted subtitle
- Positioned spatially over relevant campus area

### Left week/status panel

Content:

- Week number
- Days until rivalry game
- Mini schedule list
- Team status: morale, fatigue, injuries
- Top performers with headshots/stats

### This screen’s vibe

This is the most immersive screen. It makes the program feel like a place. It should be used for program-building, facilities upgrades, staff/admin, recruiting center, academic center, and stadium atmosphere.

---

## 29. Program / GM Dashboard

### Purpose

A generalized overview for running the program, especially in a GM-style mode.

### Layout

- Top header with GM identity and prestige
- Horizontal top tabs: Dashboard, Team Management, Recruiting, Tactics, Program, Dynasty
- Left icon rail
- Main 2x3 grid of operational cards
- Right rail season schedule and GM tasks
- Bottom Top 25 ticker

### Cards

- Team Overview: logo, stars, prestige, national rank, OVR/OFF/DEF
- Recruiting: class rank, target commits, top commits
- Team Management: depth chart, roster, player development, injury report, transfer portal
- Tactics: offensive scheme, defensive scheme, special teams, gameplan button
- Scouting: active scouts, scouting points, top targets
- Program: facilities, fan support, academics, brand exposure, NIL collective

### Right rail

- Season record split: W-L, conference, home, away
- Upcoming schedule list
- GM tasks checklist

### Visual emphasis

This screen should be modular, like a command dashboard. Each card should be clickable and communicate both status and next action.

---

## 30. Tactics / Gameplan Cards

Even though the screenshots do not show a full tactics page, they imply the style.

### Visual treatment

- Chalkboard/play-diagram icons
- X/O play art in muted background
- Scheme labels in bold white
- Tactical cards in dark panels
- Gameplan button with small icon

### Content examples

- Offensive scheme: Spread Option, Pro Style, Air Raid, Power Run, Veer & Shoot
- Defensive scheme: 4-2-5, 3-4, 4-3, Nickel, Multiple
- Special teams: Balanced, Aggressive Return, Conservative
- Opponent scouting report
- Weekly gameplan tasks
- Practice emphasis
- Matchup advantages

### Visual motifs

- Diagram lines and X/O icons as ghosted background art
- Clipboards, whistles, headsets, film-room icons
- Color-coded matchups

---

## 31. Tables

Tables are core to the game.

### Table design rules

- Header row is uppercase, small, muted gray.
- Rows are dark, separated by thin lines.
- Selected row uses team-color outline or fill.
- Numeric columns should align right or center.
- Names align left.
- Logos/portraits appear as visual anchors.
- Data should be compact but legible.
- Sorting/dropdowns above table should be visible but not dominate.

### Table row height

- Compact lists: 36–44 px
- Recruiting rows with portraits: 64–88 px
- Signing Day rows: 60–82 px
- NIL rows: 72–92 px

### Selected row treatment

Options:

- Team-color full-row translucent fill
- Thin neon/cardinal/gold outline
- Brighter text
- Small left indicator bar

### Empty/locked rows

Use dark placeholders, plus signs, locks, or “More to come” cards rather than blank spaces.

---

## 32. Player Portraits and Imagery

### Style

Player/coach images should be realistic, sports-photography inspired, and consistent.

Traits:

- Clean lighting
- Shoulder-up portraits for tables/cards
- Full torso or waist-up for hero screens
- Uniforms match team colors
- Faces vary by ethnicity, hairstyle, age, build
- Coaches older/more mature, often in polo/headset/sideline attire
- Recruits may appear in neutral black shirt or team uniform depending on commitment state

### Portrait contexts

- Recruiting board: neutral prospect headshots or black shirt portraits
- Signing Day hero: recruit in team uniform
- Team leaders: player headshot in uniform
- Staff overview: coach headshot
- News event: cinematic locker room / facility photo

### Image treatment

- Dark gradient overlays for text readability
- Vignette edges
- Subtle color grading matching team palette
- High contrast
- No cartoon style

---

## 33. Hero Images

Hero images appear on Team Hub, News, Signing Day, and campus map screens.

### Team Hub hero

- In-game or sideline huddle image
- Shows multiple players in uniform
- Feels like real college football photography
- Below image is a row of key stat metrics

### News hero

- Single player in locker room or tunnel
- Dramatic lighting
- Emotional expression
- Used to support narrative events

### Signing Day hero

- Recruit portrait with commitment graphics
- Locker room/recruiting room background
- Big stamp/text overlays

### Campus hero

- Aerial campus map
- Interactive nodes

### Rules

- Hero images should never feel random. They should match the page purpose.
- Dark overlay must preserve readability.
- Team colors should appear in uniform, lighting, or graphic accents.

---

## 34. Icons

Icons are simple, white/gray line icons, sometimes in circular badges.

Common icon categories:

- Home
- Inbox/mail
- Roster/people
- Calendar/schedule
- Media/news
- Staff/person
- Scouting/binoculars
- Stats/bar chart
- History/clock
- Settings/gear
- Tactics/play diagram
- Recruiting/person-plus
- Transfer arrows
- Facilities/building
- Finances/dollar
- Academic/book
- Stadium/football
- Administration/capitol/building
- Trophy/awards
- Clipboard/tasks
- Bell/notifications
- Search

### Icon rules

- Use consistent line weight.
- Inactive icons gray.
- Active icons white or team-color.
- Larger feature icons can sit in team-color square badges.
- Decision icons can sit in circular badges with gold/team-color ring.

---

## 35. Ratings, Grades, and Status Indicators

### Stars

Use gold stars for:

- Program prestige
- Recruit quality
- Team prestige
- Signing day cards

Star system:

- 1–5 stars
- Half stars allowed if desired
- Empty stars dark gray
- Gold stars should be bright and satisfying

### Letter grades

Use for culture, staff, facilities, academics, fan support, coach trust.

Colors:

- A / A+ / A-: green
- B / B+: yellow-green or gold
- C: yellow
- D/F: red/orange

### Numeric ratings

Use 0–100 system.

Visual coding:

- 90+: green / elite
- 80–89: white/gold
- 70–79: yellow
- 60–69: orange
- below 60: red

### Status pills/checks

- Signed: green check + green text
- Complete: green
- Incomplete: red
- Offered: green
- Unofficial/Official Visit: neutral/white
- Risk Low/Medium/High: green/yellow/red
- Interest levels: Very High green, High green/yellow, Medium yellow, Low red

---

## 36. Progress and Circular Meters

### Circular meters

Used for:

- OVR/OFF/DEF
- Interest percentage
- Recruiting chance
- Scouting summary

Treatment:

- Thick circular ring
- Dark track
- Colored progress arc
- Large center number
- Label below or beside

### Progress bars

Used for:

- Coach prestige XP
- Morale
- Chemistry
- Interest level
- Budget allocation maybe
- Fan support

Treatment:

- Thin bar
- Dark track
- Green/gold/team-color fill
- Small label at side

### Donut charts

Used for:

- Recruiting star breakdown
- NIL budget allocation
- Position breakdown

Treatment:

- Dark card background
- Multi-color slices
- Center value or category total
- Legend with position, percent, amount/count

---

## 37. Page-Type Differences

### Dashboard pages

- Broadest overview
- Many cards
- Multiple panels
- Strong current-week context
- Continue button prominent
- Top 25/news ticker

### Recruiting pages

- Table-heavy
- Filters/tabs prominent
- Prospect portraits and ratings
- Right-side detail panels
- Strong use of stars, ranks, interest, offers

### Signing Day pages

- More dramatic
- Larger typography
- Gold accents
- Stamped graphic effects
- Recruiting class rank and commitment drama

### News/event pages

- Cinematic hero image
- Headline-driven
- Decision options
- Impact modifiers
- Smaller supporting right rail

### Program/facilities pages

- Campus/environment-focused
- Facility nodes
- Budgets/prestige/coach trust at top
- Program-building systems

### Staff/coaches pages

- Operational dashboard
- Coach prestige/progression
- Staff list cards
- Ratings and roles
- Schedule/recruiting/team overview still visible

### Scouting pages

- Similar to recruiting but more analytical
- Ratings, scouting completion, player reports, attribute snapshots
- Filters and data views important

### NIL/budget pages

- Financial overlay on recruiting
- More green money text
- Budget cards/charts
- Risk and offer values in table

---

## 38. Navigation Model

The game should support both high-level top tabs and detailed side navigation.

### Top-level categories

Recommended top nav:

- Dashboard
- Team Management
- Recruiting
- Tactics
- Schedule
- Program
- Dynasty
- Staff
- Office
- Scouting
- Stats

Not every screen needs every top tab. Some screens use a left sidebar only.

### Left sidebar detail nav

When inside a major category, sidebar should expose subpages. Example for Recruiting:

- Recruiting Board
- Prospect Search
- Recruiting Classes
- Visits
- Targets
- Recruiting Strategy
- NIL & Budget
- Signing Day

Example for Team:

- Team Hub
- Roster
- Depth Chart
- Training
- Development
- Player Morale
- Injury Report
- Transfer Portal

Example for Program:

- Facilities
- Finances
- Academics
- Alumni
- Staff
- Program History
- Conference
- Rivalries

---

## 39. World-State Persistence

The UI should constantly remind the player that time is moving.

Persistent world-state elements:

- Season year
- Week number
- Current phase: season, offseason, signing day, rivalry week
- Current date/time
- Record
- Conference record
- Ranking
- Next opponent
- Upcoming schedule
- News ticker
- Tasks/checklist
- Notifications/inbox badge

### Examples

- `Week 8 | 2025 Season`
- `2026 Offseason | Week 1`
- `Week 15 | Signing Day`
- `Wednesday, February 5, 2025`
- `Sun, Jan 4, 2026`

Use these details often. They create immersion.

---

## 40. Data Formatting Rules

### Rankings

- Use `#` prefix for major ranks: `#16 National`, `#2 Recruiting Class Rank`
- In tables, rank column may just show number.
- Team rankings in poll rows should use rank number, logo, team, record.

### Records

- Overall: `5-2`
- Conference: `(2-1)` or separate `Conf 2-1`
- Full split: `6-1 (4-1)`

### Scores

- Format: `W 38-10`, `L 24-27`
- Win green, loss red.

### Money

- `$12.45M`
- `$950K`
- `$1.80M Annual`
- Use green for available/income/positive.

### Dates

- Schedule rows: `Oct 18`, `Nov 9`, `Sat, Nov 16`
- Matchup cards can use full date: `Saturday, October 18, 2025`

### Time

- `3:30 PM ET | ABC`
- `7:30 PM CT`
- `TBD`

### Percentages

- `46.2%`
- `85.7%`
- `95%`

### Grades

- `A+`, `A`, `A-`, `B+`, `B`
- Keep uppercase and color-coded.

---

## 41. School Identity Examples from Images

### Minnesota Golden Gophers

- Dark dashboard with maroon/gold accents.
- Strong three-column grid.
- Current week vs Penn State card.
- Team chemistry and program prestige on left.
- Team hub hero huddle image center.
- Upcoming schedule, recruiting class, staff overview right.
- Bottom top 25 ticker and resource footer.

### Alabama Crimson Tide

- Crimson top header with huge Alabama identity.
- Sidebar full navigation.
- Dashboard includes next match, schedule, team overview, top stories, rankings, recruiting, tasks.
- Coaches hub uses staff/prestige/recruiting/portal/team leaders grid.
- Feels polished, elite, SEC-broadcast style.

### USC Trojans

- Cardinal/gold palette.
- Dynasty/news screen is cinematic and narrative-driven.
- Recruiting/signing screens use gold highlights and high-drama typography.
- Active tabs often gold underline.
- Signing Day hero uses locker-room energy and stamped SIGNED graphic.

### Missouri State Bears / Missouri-style campus page

- Full aerial campus screen.
- Facility nodes over interactive campus map.
- Left week/status panel.
- Top program budget/NIL/coach trust metrics.
- Feels like the program is a physical place.

### Vanderbilt Commodores

- Black/gold prestige UI.
- GM dashboard with modular cards.
- Emphasis on program attributes: facilities, fan support, academics, brand exposure, NIL collective.
- Strong GM/manager identity.

---

## 42. Specific Components to Build

### Required global components

- GameLogo
- ProgramHeader
- TopNav
- LeftSidebar
- BottomTicker
- ResourceFooter
- ContinueButton
- Card
- MetricTile
- RatingRing
- StarRating
- GradeBadge
- ProgressBar
- TeamLogoPair
- ScheduleRow
- RankingRow
- PlayerHeadshot
- CoachHeadshot
- Table
- FilterDropdown
- TabBar
- NotificationBadge
- ControllerHintBar

### Dashboard components

- MatchupPreviewCard
- TeamHubHeroCard
- TeamStatsStrip
- TeamChemistryCard
- ProgramPrestigeCard
- ConferenceStandingsCard
- TeamLeadersCard
- UpcomingScheduleCard
- RecruitingClassCard
- StaffOverviewCard
- TasksCard
- TopStoriesCard

### Recruiting components

- RecruitingSummaryCard
- ProspectTable
- ProspectRow
- ProspectDetailPanel
- ProspectAttributeSnapshot
- InterestMeter
- TopSchoolsLogoRow
- TeamNeedsCard
- ClassSummaryCard
- NILBudgetOverviewCard
- BudgetAllocationDonut
- NILProspectTable

### Event components

- NewsHeroCard
- CoachDecisionOption
- SigningDayHeroCard
- SigningCarouselCard
- ClassRankingsPanel
- EventImpactLabel

### Program components

- CampusMap
- FacilityNode
- WeekStatusPanel
- ProgramAttributeCard
- GMTaskList
- CoachPrestigeCard
- StaffManagementCard
- TransferPortalCard

---

## 43. Animation and Interaction Feel

Use restrained, premium animations.

### Recommended interactions

- Active row glow/outline on hover
- Button slight brightness shift on hover
- Card lift by 1–2 px on hover
- Tab underline slides into place
- Progress rings animate on load
- Ticker scrolls or cycles smoothly
- Signing Day stamp slams/fades in for reveal moments
- Campus facility nodes glow when focused
- Notification badges pulse subtly when new

### Avoid

- Bouncy cartoon animations
- Excessive gradients
- Overly slow transitions
- Mobile-app softness
- Confetti except rare Signing Day/Championship moments

---

## 44. Accessibility and Readability

Even though the UI is dense, it must remain readable.

### Rules

- Maintain high contrast between text and dark backgrounds.
- Do not put small gray text over detailed images without dark overlay.
- Use consistent alignment.
- Use row separators in tables.
- Avoid excessive text shadows except on hero images.
- Large numbers should be readable from a distance.
- Important action buttons must be unmistakable.

### Minimum contrast targets

- Primary text: near-white on dark
- Secondary text: light gray, not too dim
- Disabled text: darker gray but still legible
- Team-color text should not be used for small body copy unless contrast is strong

---

## 45. Visual Do / Don’t

### Do

- Use dark metallic panels.
- Use school colors aggressively but tastefully.
- Keep headers full of context.
- Use logos, ranks, records, and stars everywhere.
- Use dense grids.
- Make Recruiting, Schedule, Rankings, Staff, and Program status visible often.
- Use cinematic images for events and hero cards.
- Make the user’s current team row highlighted in rankings/standings.
- Keep buttons bold and rectangular.
- Use condensed uppercase sports typography.
- Treat the game like a serious dynasty simulator.

### Don’t

- Do not make it look like a generic web dashboard.
- Do not use bright white backgrounds.
- Do not use cartoon mascots as primary UI art.
- Do not use overly rounded cards.
- Do not make the layout sparse.
- Do not hide rankings, records, week, and next opponent.
- Do not make recruiting feel like a simple list; it should feel like a major strategic battleground.
- Do not make NIL feel like a spreadsheet alone; it should feel like a recruiting arms race.
- Do not make event decisions feel decorative; they should visibly affect systems.

---

## 46. Example Screen Blueprints

### Main Dashboard Blueprint

```text
[Top Header]
Game Logo | Team Logo + Team Name + Coach/Season | Prestige | Record | Rank | Next Game | Icons | Continue

[Left Column]
Current Week Matchup
Team Chemistry
Program Prestige

[Center Column]
Team Hub Hero Image
Performance Stat Strip
Conference Standings + Team Leaders

[Right Column]
Upcoming Schedule
Recruiting Class
Staff Overview

[Bottom]
Top 25 Ticker
Resource Footer + Continue
```

### Recruiting Board Blueprint

```text
[Top Header]
Game Logo | Team/Coach/Prestige | Week/Date | Continue

[Left Sidebar]
Recruiting nav group active

[Main]
Page Title: Scouting / Recruiting Board
Tabs: Recruiting Board | Scouting Coverage | Shortlist | Visits | Targets | Commitments | Classes
Filters: Class Year | Position | Region | View | Filters
Large Prospect Table
Action Buttons: Add to Shortlist | Scout | Remove from Board
Pagination

[Right Detail Panel]
Selected Prospect Header
Portrait
Rank / Position / Stars / Metadata
Tabs: Overview | Ratings | Stats | Reports | History
Scouting Status
Recruiting Status
Player Notes
Attribute Snapshot
View Full Report
```

### Signing Day Cinematic Blueprint

```text
[Background]
Locker room / recruiting war room, dark vignette

[Top]
Game Logo left, week/signing day/coach prestige right

[Left]
Your Program Card
Class Rank
Points
Scholarships
Needs
Button

[Center]
Huge Signing Day Title
Hero Recruit Card
SIGNED Stamp
Top Schools Row
Destination Team

[Right]
Class Rankings Panel

[Bottom]
Today’s Signings Carousel
News Ticker
Controller Hints
```

### Campus Facilities Blueprint

```text
[Top Header]
Game Logo | Team Name/Record/Week | Prestige | Program Budget | NIL Budget | Coach Trust | Next Game

[Main]
Full aerial campus map
Facility nodes positioned over buildings/stadium/practice field

[Left Overlay]
Week number
Mini schedule
Team status
Top performers

[Bottom]
Controller hints
Dynasty motto/tagline
```

---

## 47. Implementation Guidance for an AI Builder

When generating UI screens, the AI should follow these principles:

1. **Start with the school identity.**  
   Pick team colors, logo, record, rank, coach, season, week, next opponent.

2. **Choose the page archetype.**  
   Dashboard, table, cinematic event, campus map, staff hub, NIL/budget, etc.

3. **Use the correct layout skeleton.**  
   Do not invent a sparse layout. Use a header/sidebar/card/table/right-panel system.

4. **Populate with believable sports-management data.**  
   Every card should have meaningful labels, ranks, values, grades, names, logos, or status.

5. **Use dark surfaces and team accents.**  
   The base UI remains dark; team identity appears in headers, active states, highlights, and buttons.

6. **Make the current week obvious.**  
   The user should always know what week/season they are in and what comes next.

7. **Make rankings and prestige visible.**  
   This game is about status. Ranks, stars, prestige, class rank, and coach prestige should appear often.

8. **Preserve sports-broadcast energy.**  
   Use logos, matchup cards, ticker bars, hero images, and bold condensed typography.

9. **Make actions obvious.**  
   Continue, Play Week, View Recruiting, Scout Player, Game Preview, Staff Management, etc. should be clear.

10. **Use narrative screens sparingly but dramatically.**  
   Player morale, Signing Day, transfer portal drama, rivalry pressure, coach trust, booster conflicts, media storms, and injuries deserve cinematic treatment.

---

## 48. Final Creative Summary

The game should visually communicate:

> “You are inside the command center of a major college football program. Every week is a decision point. Every recruit matters. Every ranking creates pressure. Every facility, coach, player, donor, NIL dollar, and rivalry game shapes your dynasty.”

The UI should be dark, dense, prestige-heavy, school-branded, and alive with data. It should blend the seriousness of Football Manager with the theatricality of American college football. It should make the player want to spend hours in menus because the menus themselves feel like the game world.

