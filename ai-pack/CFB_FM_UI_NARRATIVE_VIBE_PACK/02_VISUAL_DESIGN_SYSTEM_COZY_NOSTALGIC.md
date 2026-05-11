# Visual Design System — Cozy, Nostalgic, Program-Office Style

## North Star

The visual design should feel warm and archival while remaining readable and fast.

Think:

```text
old media guides
recruiting folders
local newspaper clippings
coach's office
film room notes
campus bulletin board
program archive
```

Do not think:

```text
neon scoreboard
sports betting app
futuristic command center
Madden Ultimate Team
crypto dashboard
```

## Palette Philosophy

Use muted warm neutrals as the foundation.

Team colors should be accents, not full-screen floods.

## Base Palette

Recommended color roles:

```text
background_paper: warm cream
background_panel: off-white / warm gray
background_elevated: soft beige
text_primary: charcoal
text_secondary: faded slate
text_muted: warm gray
divider: muted tan / gray
accent_primary: team color
accent_secondary: brass / aged gold
danger: muted red
warning: amber
success: muted green
info: faded navy
```

## Example Theme

```text
Base background: aged cream
Panel: warm off-white
Primary text: charcoal
Secondary text: slate gray
Accent: team primary color
Secondary accent: brass/gold
Borders: faint tan
```

## Team Color Use

Use team color for:

- small section accents
- selected nav item
- header underline
- badges
- key moment border
- small icon fills
- rivalry/game context

Do not use team color for:

- entire background
- huge saturated panels
- every button
- unreadable text contrast

## Texture

Use subtle texture only.

Acceptable:

- paper grain
- folder tab edges
- very light noise
- newspaper clipping background
- chalkboard accent area
- binder-divider lines
- soft shadows

Avoid:

- heavy grunge
- fake wood desk background
- full skeuomorphic UI
- unreadable distressed fonts
- texture behind dense tables

## Typography

Use three typographic roles.

## UI Font

Purpose:

- tables
- buttons
- forms
- navigation
- reports

Personality:

```text
clean
readable
slightly warm
not futuristic
```

## Headline / Clipping Font

Purpose:

- media clippings
- scrapbook headlines
- section titles
- big moments

Personality:

```text
newspaper
media guide
slab serif
classic sports publication
```

Use sparingly.

## Stat / Number Font

Purpose:

- box scores
- tables
- leaderboards
- ratings
- dashboards

Personality:

```text
tabular
stable
compact
legible
```

Use tabular numbers.

## Spacing

Dense but breathable.

Guidelines:

- tables should be compact
- cards should not be oversized
- key sections need hierarchy
- avoid giant empty dashboard cards
- use collapsible groups
- use right inspector instead of popups

## Borders and Panels

Panel styles:

```text
paper panel
folder panel
clipping panel
binder section
chalkboard panel
ledger panel
```

These are visual variants, not entirely different components.

## Component Visual Language

## ProgramItem Card

Looks like:

```text
staff note / office task slip
```

Fields:

- category tag
- severity
- due date
- summary
- staff/source
- quick action
- affected entity links

## Media Clipping

Looks like:

```text
local newspaper clipping
```

Fields:

- outlet/source
- headline
- short blurb
- date
- narrative tag
- affected entities

## Staff Note

Looks like:

```text
briefing memo
```

Fields:

- staff name
- role
- confidence
- recommendation
- concern
- action

## Scrapbook Moment

Looks like:

```text
archived program-history card
```

Fields:

- date
- headline
- category
- image/portrait/logo optional
- key entities
- why it mattered
- follow-up links

## Ledger Panel

For finance/NIL.

Looks like:

```text
budget ledger / booster notebook
```

Fields:

- amount
- source
- allocation
- risk
- status
- reason codes

## Film Room Panel

For tactics/play-by-play.

Looks like:

```text
film cutup / coaching report
```

Fields:

- situation
- concept
- result
- reason codes
- personnel
- next action

## Icon Style

Use simple icons:

- folder
- clipboard
- whistle
- football
- helmet
- film reel
- newspaper
- calendar
- megaphone
- trophy
- stadium
- dollar ledger
- map pin
- radio
- star
- warning flag

Avoid:

- neon icons
- excessive emoji
- animated icons everywhere
- futuristic glyphs

## Animation

Subtle animation only.

Acceptable:

- gentle panel expansion
- soft fade for new ProgramItem
- small highlight when a record is broken
- light page transition
- scoreboard count-up for big moment

Avoid:

- spinning loaders everywhere
- flashy particle effects
- constant bouncing badges
- sports-betting style live tickers

## Big Moment Visual Treatment

For Tier 4 events:

- darker / richer background panel
- team color accent
- headline font
- scrapbook card
- small media clipping bundle
- staff/fan/booster reaction bundle
- "File to Scrapbook" or auto-file state

Do not use this treatment for routine events.

## Accessibility

Required:

- high contrast mode
- scalable text
- keyboard navigation
- no color-only status indicators
- readable tables
- reduced motion option
- clear focus states
- consistent button placement

## Theme Modes

At minimum:

```text
Classic Office Light
Classic Office Dark
High Contrast
```

Future:

```text
Media Guide
Chalkboard
Retro PC
School-specific skin
```

## Design Token Categories

```ts
type DesignTokens = {
  color: {
    backgroundPaper: string;
    backgroundPanel: string;
    textPrimary: string;
    textSecondary: string;
    accentPrimary: string;
    accentSecondary: string;
    borderSubtle: string;
    danger: string;
    warning: string;
    success: string;
  };
  typography: {
    ui: string;
    headline: string;
    numbers: string;
  };
  radius: {
    panel: string;
    card: string;
    pill: string;
  };
  shadow: {
    panel: string;
    clipping: string;
    modal: string;
  };
  texture: {
    paper: string;
    none: string;
  };
};
```

## Acceptance Criteria

The visual system is acceptable when:

- the UI feels warm and nostalgic
- dense tables remain readable
- team colors are tasteful accents
- big moments visually stand apart
- normal weeks stay calm
- texture does not hurt usability
- accessibility options exist
- the app does not look like a generic sportsbook dashboard
