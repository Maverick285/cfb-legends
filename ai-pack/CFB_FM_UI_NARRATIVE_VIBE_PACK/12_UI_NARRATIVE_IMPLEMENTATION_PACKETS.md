# UI Narrative Implementation Packets

## Purpose

These are implementation packets for the AI coder.

Use these after the base app shell and Program Desk model exist, or use them to guide those systems.

---

# UINVIBE-1 — Design Tokens and Theme Foundation

## Goal

Create the cozy/nostalgic visual foundation.

## Deliverables

- design token file
- Classic Office Light theme
- Classic Office Dark theme
- typography roles
- status colors
- panel variants
- accessibility contrast check where possible

## Acceptance

- UI can use semantic tokens
- team colors can be applied as accents
- no hardcoded neon/futuristic styling
- dense tables remain readable

---

# UINVIBE-2 — Narrative Importance Tier Model

## Goal

Create importance tiers for events.

## Deliverables

- NarrativeImportanceTier type
- tier calculation helper
- presentation rules
- tests

## Acceptance

- Tier 0 does not interrupt
- Tier 4 auto-files Scrapbook
- watchlisted entities raise priority
- first-time milestones raise priority

---

# UINVIBE-3 — Program Desk Visual System

## Goal

Implement Program Desk with cozy office feel.

## Deliverables

- Program Desk overview layout
- ProgramItemCard
- StaffBriefingCard
- ContinueBlockerCard
- CalendarSnapshot
- MediaClippingCard
- RightInspector

## Acceptance

- actions are connected to ProgramItems
- no raw feed
- blockers clearly separated
- staff briefing grouped

---

# UINVIBE-4 — Campus Pulse System

## Goal

Implement Campus Pulse mood surface.

## Deliverables

- CampusPulse model
- ProgramTemperature model
- pulse calculation helper
- Program Desk summary component
- detail panel

## Acceptance

- labels have reason codes
- pulse updates from real events
- no fake social feed
- trend visible

---

# UINVIBE-5 — Program Scrapbook

## Goal

Implement long-term memory system.

## Deliverables

- ScrapbookEntry model
- auto-file rules
- Scrapbook route
- entry card
- full entry view
- player/recruit/coach links

## Acceptance

- Tier 4 events create entry
- user can pin/file
- entries save/load
- player profile shows related entries

---

# UINVIBE-6 — Media Clippings and Radio Digest

## Goal

Create curated media reaction instead of social feed spam.

## Deliverables

- MediaClipping model
- RadioDigest model
- clipping generator from events
- digest grouping
- UI components

## Acceptance

- clippings are capped
- digest groups fan reaction
- generated text uses grounded facts
- no infinite feed

---

# UINVIBE-7 — Voices Around the Program

## Goal

Create multi-perspective reaction bundles.

## Deliverables

- ReactionBundle model
- ReactionItem model
- generator from event consequences
- UI component

## Acceptance

- staff/fan/booster/recruit/player perspectives can appear
- all reactions have reason codes
- no invented facts

---

# UINVIBE-8 — Player / Recruit / Coach Story Panels

## Goal

Make people feel like individuals.

## Deliverables

- PlayerStoryPanel
- RecruitingStoryPanel
- CoachStoryPanel
- story event timeline
- grounded summary fallback

## Acceptance

- story uses real events
- hidden info remains uncertain
- scrapbook links appear
- no LLM required

---

# UINVIBE-9 — Moment Card and Big Event Presentation

## Goal

Make major events feel important.

## Deliverables

- MomentCard
- MomentPage or Program Desk hero
- reaction bundle integration
- scrapbook integration
- history links

## Acceptance

- Tier 4 event gets special treatment
- routine events do not
- user can continue when ready
- no modal spam

---

# UINVIBE-10 — Copy and Interaction Language Pass

## Goal

Replace generic app copy with program-appropriate language.

## Deliverables

- action label registry
- status label registry
- empty state copy
- blocker copy
- staff voice templates

## Acceptance

- buttons use immersive verbs
- blockers are clear
- empty states are helpful
- generic SaaS language reduced

---

# UINVIBE-11 — FM-Density and Clickability Audit

## Goal

Make sure cozy vibe does not reduce depth.

## Deliverables

- UI density checklist
- clickability checklist
- audit script/manual checklist
- reviewer prompt

## Acceptance

- every screen has score
- card-only screens flagged
- missing click paths flagged
- table density protected

---

# UINVIBE-12 — Narrative QA and Spam Control

## Goal

Prevent narrative systems from becoming noisy.

## Deliverables

- clipping caps
- event grouping
- tier-based presentation
- digest rules
- tests

## Acceptance

- normal week stays calm
- big week feels bigger
- repeated events group
- low-tier events do not clutter
