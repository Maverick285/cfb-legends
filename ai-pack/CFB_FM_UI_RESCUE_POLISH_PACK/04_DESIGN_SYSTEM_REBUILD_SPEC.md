# Design System Rebuild Spec

## Purpose

The UI needs a professional design system before more screens are added.

This is a rebuild, not a color tweak.

## Design Direction

```text
Professional desktop management sim
Subtle college football program-office warmth
Dense data
Low decoration
Strong hierarchy
```

## Theme Modes

## Default

```text
Classic Management Dark
```

Use dark/professional base with warm accents.

Why:

- FM-like
- dense data easier to scan
- avoids amateur parchment look
- team colors can accent cleanly

## Optional

```text
Classic Office Light
```

Use later after dark theme is polished.

## Color Tokens

```css
:root {
  --bg-app: #101312;
  --bg-sidebar: #171a18;
  --bg-surface: #1f231f;
  --bg-surface-2: #262b26;
  --bg-elevated: #2d332e;

  --text-primary: #f0eee7;
  --text-secondary: #b9b5a8;
  --text-muted: #7f7a6f;

  --border-subtle: #343a34;
  --border-strong: #4b5149;

  --accent: #c7a45b;
  --accent-soft: rgba(199, 164, 91, 0.16);
  --team-accent: var(--accent);

  --success: #74a66a;
  --warning: #d4a84d;
  --danger: #c96b5f;
  --info: #7d9dbb;
}
```

## Typography Tokens

```css
--font-ui: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-headline: Georgia, "Times New Roman", serif;
--font-number: "Roboto Mono", "SFMono-Regular", Consolas, monospace;

--text-xxs: 11px;
--text-xs: 12px;
--text-sm: 13px;
--text-md: 14px;
--text-lg: 16px;
--text-xl: 20px;
--text-2xl: 24px;
```

## Spacing Tokens

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
```

## Radius Tokens

```css
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
```

Avoid pill overuse.

## Shadow Tokens

Use minimal shadows.

```css
--shadow-panel: 0 1px 2px rgba(0,0,0,0.35);
--shadow-popover: 0 12px 32px rgba(0,0,0,0.45);
```

## Component Styling Rules

## Sidebar

- width 240–260px
- compact nav rows
- active row with left border/accent
- no oversized logo card
- no decorative bottom card unless useful
- supports collapsed mode later

## Top Bar

- height 56–64px
- Continue button prominent
- blockers next to Continue
- search box/palette
- date/week
- no clutter

## Object Header

- title
- subtitle/context
- key metadata chips
- primary actions
- breadcrumb above or below

## Tab Bar

- compact horizontal tabs
- active underline
- overflow menu if too many
- secondary tabs allowed

## Action Bar

- view selector
- filters
- search within table
- compare
- export if relevant
- action dropdown

## DataGrid

- sticky header
- compact rows 30–36px
- selected row state
- hover state
- numeric alignment right
- sortable headers
- column groups
- saved views

## Right Inspector

- width 320–380px
- selected entity summary
- staff recommendation
- action buttons
- reason codes
- related links

## Panels

Panels are secondary.

Use them for:

- summaries
- details
- moment cards
- staff notes

Do not use panels as entire screen foundation.

## Badges

Use semantic statuses:

- critical
- warning
- watch
- good
- info
- neutral

Badges should be small and consistent.

## Cozy/Nostalgic Layer

Allowed only after base polish:

- subtle paper clipping for Media Clipping
- headline font for MomentCard only
- brass accent color
- muted texture in non-table areas
- scrapbook page only in History/Scrapbook

Forbidden in base workspace:

- parchment panels everywhere
- fake paper backgrounds behind data grids
- novelty fonts in tables
- heavy gradients

## Acceptance Criteria

Design system is acceptable when:

- app looks professional before content loads
- tables are readable
- nav feels polished
- buttons are consistent
- colors are restrained
- team accents work
- cozy elements are subtle
- Roster and Recruiting can be implemented without one-off CSS
