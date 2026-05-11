# FM Menu Benchmark and Polish Principles

## Purpose

This document defines what the UI should learn from Football Manager menus.

This is not about copying FM assets or exact layouts.

It is about copying the product discipline.

## FM Interface Traits To Emulate

## 1. Dense Clickability

FM's official manual emphasizes that a huge number of on-screen items are clickable and reveal details. That is the core interaction philosophy.

CFB-FM must follow this:

```text
Every player, recruit, staff member, team, stat, trait, report source, and event entity should be clickable.
```

## 2. Sidebar As Primary Club Navigation

FM uses a sidebar as the main way to navigate the user's club/institution area.

CFB-FM should keep a stable left sidebar.

But it must look professional:

- compact
- aligned
- clear active state
- restrained icons
- no oversized cards
- no noisy footer widget

## 3. Object-Based Screens

FM screens usually represent a main game object:

- player
- club
- squad
- competition
- match
- staff member

CFB-FM should organize screens around objects:

- program
- roster
- player
- recruit
- staff member
- game
- conference
- school

Each object gets:

- header
- tabs
- action menu
- related links
- inspector

## 4. Tab Bars and Menus

FM uses tabs to navigate around the current screen/object.

CFB-FM needs a tab system on every major workspace.

Examples:

Roster:

```text
Overview | Players | Depth Chart | Eligibility | Morale | Development | NIL | Transfer Risk
```

Recruiting:

```text
Overview | Search | Board | Visits | Offers | Staff | Competitors | Analytics
```

## 5. Customizable Views and Columns

FM supports customizable columns and table views.

CFB-FM needs this before the UI will feel serious.

Minimum:

- saved views
- column show/hide
- sorting
- filtering
- density toggle
- sticky headers

## 6. Filters

FM screens often include filters.

CFB-FM must not hide filtering behind cute panels.

Every major table needs visible filter affordances:

- position
- class
- status
- risk
- confidence
- region
- role
- NIL expectation

## 7. Continue As Central Time Control

FM treats Continue as the central conduit for progressing time.

CFB-FM must treat Continue as sacred:

- always visible
- strong placement
- blockers obvious
- quick fix resolver
- not visually buried

## 8. Navigation History / Back-Forward

FM supports navigation history.

CFB-FM needs:

- back
- forward
- breadcrumbs
- recent screens
- search
- bookmarks

## 9. Context Actions

FM supports right-click/context menus and action menus.

CFB-FM needs:

- row actions
- context menu
- action dropdowns
- right inspector quick actions

Examples:

Right-click player:

- open profile
- compare
- add to watchlist
- meet with player
- change development focus
- view stats
- view promises

## 10. Professional Restraint

FM menus are not gorgeous in a Dribbble sense.

They are professional because they are:

- consistent
- dense
- functional
- aligned
- restrained
- systematized

CFB-FM needs that first.

## What Not To Copy From FM25

FM25 screenshots were not a released final game. They were work-in-progress/preview material, and FM25 was ultimately cancelled.

Use them as caution, not gospel.

The lesson:

```text
A cleaner UI is not automatically a better management UI.
```

The goal is not more empty space and fewer panels.

The goal is:

```text
more usable density
better hierarchy
less visual amateurism
```

## FM-Inspired CFB-FM Layout Principle

Every major workspace should follow:

```text
Object Header
Subnav Tabs
View / Filter / Action Bar
Main Dense Table or Structured Workspace
Right Inspector
Status / Reason Codes / Footer
```

## FM-Inspired Professional Polish Checklist

A screen should pass:

- clear screen/object identity
- professional spacing
- compact density
- useful table view
- consistent buttons
- consistent typography
- visible filters/actions
- clickable rows
- right inspector
- no decorative clutter
- no debug controls
- no generic card wall
- no fake data

## CFB-FM Distinction

CFB-FM should still have:

- Program Desk
- Campus Pulse
- Program Scrapbook
- recruiting room identity
- coach office warmth

But these should sit on top of a professional FM-grade structure.

Warmth is atmosphere.

Structure is product quality.

## Target Feeling

```text
This looks like a serious management sim that has been skinned with college football warmth.
```

Not:

```text
This looks like a cozy web dashboard made in one weekend.
```
