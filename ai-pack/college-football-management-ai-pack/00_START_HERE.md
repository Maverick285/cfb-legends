# 00_START_HERE

> Use this file as an instruction set for the AI working on the project.

**Primary outputs required:**
- A disciplined, sequenced execution of the full planning pack
- A living project status document updated after each work cycle
- A decision log that explains why major choices were made
- A menus-first college-football management sim plan that can survive rule changes and scope pressure
**Stop when:**
- The AI has read the files in order and produced the deliverable requested by each file
- The AI has updated `90_PROJECT_STATUS_TEMPLATE.md` and `91_DECISION_LOG_TEMPLATE.md` after each meaningful milestone
- The AI has not moved to match-engine work until the menus-first yearly loop is fully specified and testable

## What this pack is

This is a turnkey instruction pack for building a **legally distinct, modern college-football management sim** from scratch.

It is not a loose idea dump. It is a working sequence. The files are numbered for a reason. Read them in order. Do the work they ask for. Record progress. Do not skip straight to code unless the earlier files explicitly tell you to.

The north star is simple:

> **Build the office before the stadium.**

The first real win is not flashy gameplay. The first real win is a working management loop with strong menus, clear decisions, stable data, reliable saves, believable world state, and a testable simulation core.

## How to use this pack

1. Start every session by rereading `01_GUIDING_LIGHT.md`.
2. Read the next file in sequence.
3. Produce the deliverables that file asks for.
4. Update:
   - `90_PROJECT_STATUS_TEMPLATE.md`
   - `91_DECISION_LOG_TEMPLATE.md`
5. Move to the next file only when the current file’s stop conditions are satisfied.
6. If new research or constraints invalidate earlier work, loop back and revise the affected files instead of papering over the issue.

## Required reading order

1. `01_GUIDING_LIGHT.md`
2. `02_AI_SESSION_PROTOCOL.md`
3. `03_DISTINCTNESS_AND_RISK.md`
4. `04_RESEARCH_PROGRAM.md`
5. `05_PRODUCT_REQUIREMENTS.md`
6. `06_RULES_AND_WORLD_MODEL.md`
7. `07_MENU_UX_AND_SCREEN_SPECS.md`
8. `08_SYSTEM_ARCHITECTURE.md`
9. `09_DATA_MODEL_AND_CONTENT_PIPELINE.md`
10. `10_SIMULATION_SYSTEMS.md`
11. `11_IMPLEMENTATION_ROADMAP.md`
12. `12_TEST_QA_AND_BALANCE.md`
13. `13_AI_ROLE_PROMPTS.md`

Reference and support files:
- `90_PROJECT_STATUS_TEMPLATE.md`
- `91_DECISION_LOG_TEMPLATE.md`
- `99_SOURCES_AND_FACT_BASIS.md`

## Global constraints

These apply across the entire project.

### 1. No clone behavior

Research benchmark products aggressively, but do **not** copy their layouts, wording, art direction, trade dress, or branded terminology. Translate benchmark features into the underlying decision they support, then rebuild the decision flow in original form.

### 2. Fiction first

The prototype must use fictional schools, fictional players, fictional brands, and fictional media entities. Real schools, logos, coaches, or players are a separate licensing problem and should not block core development.

### 3. Menus first

The project begins as a menu-heavy management sim. The first playable version can use schedule results, box scores, and text summaries. A visual match engine is a late-stage enhancement, not an early dependency.

### 4. Rules are data, not code

NCAA / CFP / transfer / NIL / postseason rules are too volatile to hardcode. Put all such rules in versioned data files with source references and verification dates.

### 5. Deterministic simulation core

The simulation must run headless without the UI. Every major system must be testable using a seed.

### 6. Every screen must answer a real question

If a screen does not help the player decide something, compress it, merge it, or remove it.

### 7. Every feature must belong to a loop

Every feature must live inside at least one of:
- yearly loop
- weekly loop
- moment-to-moment decision loop

### 8. No fake certainty

Where rules or external structures are volatile, the AI must mark assumptions, cite sources, and create watchlist items rather than pretending certainty.

## Immediate deliverable after reading this file

Produce a short kickoff note that includes:
- the current phase
- the next file to read
- the non-negotiable design mantra
- the specific output you expect to produce from the next file
- confirmation that status and decision logs will be maintained

Then continue to `01_GUIDING_LIGHT.md`.
