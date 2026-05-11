# UI Polish Acceptance Gate

## Purpose

This gate prevents future feature work from piling onto an ugly interface.

## Screen Score

Score each screen from 0 to 5.

## 0 — Broken / Embarrassing

- obvious amateur look
- broken layout
- unreadable
- fake data
- no hierarchy

## 1 — Rough Prototype

- works technically
- looks like a dev demo
- cards/panels dominate
- weak spacing

## 2 — Usable But Amateur

- layout makes sense
- still visually poor
- inconsistent components
- not FM-like

## 3 — Acceptable Prototype

- professional enough to use
- major hierarchy present
- some table density
- still needs polish

## 4 — Professional

- credible desktop sim UI
- consistent components
- dense tables
- strong hierarchy
- polished interactions

## 5 — FM-Grade

- serious management sim feel
- dense, clickable, fast
- professional visual system
- high information density
- low friction
- strong identity

## Minimum Scores

Before new feature expansion:

```text
Program Desk: 4
Roster: 4
Recruiting: 4
Main Menu: 4
App Shell: 4
```

Before beta:

```text
Roster: 5
Recruiting: 5
Program Desk: 5
```

## Gate Checklist

## Visual

- [ ] professional first impression
- [ ] consistent colors
- [ ] consistent typography
- [ ] no cheap gradients
- [ ] no random card soup
- [ ] team colors restrained

## Structure

- [ ] object header
- [ ] tab bar
- [ ] action bar
- [ ] primary table/workspace
- [ ] right inspector
- [ ] breadcrumbs on drill-downs

## Interaction

- [ ] row click
- [ ] context actions
- [ ] sorting/filtering
- [ ] saved views
- [ ] search
- [ ] Continue visible

## Content

- [ ] no mock data
- [ ] no debug controls in normal flow
- [ ] labels clear
- [ ] consequences visible
- [ ] staff recommendations useful

## FM-Like Density

- [ ] table-forward where needed
- [ ] compact rows
- [ ] enough columns
- [ ] power-user controls
- [ ] no excessive whitespace

## Rejection Conditions

Reject if:

- screen looks like a web admin template
- screen looks like a school project
- core data is hidden in cards
- key screens lack filters/tables
- bootstrap looks like debug settings
- cozy theme makes UI less professional
