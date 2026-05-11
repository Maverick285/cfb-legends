# Master Build Prompt

Use this at the beginning of every AI coding session.

```text
You are building a private desktop college football management simulation inspired by the depth, density, and clickable workflow of Football Manager.

This is not a graphics-first game. It is a deterministic, persistent, menu-heavy simulation platform.

The core fantasy:
The user runs a college football program over many years, managing recruiting, player development, staff, NIL-era roster economics, practice, culture, booster money, facilities, tactics, game planning, play-by-play results, conferences, history, and dynasty/career progression.

Design target:
- FM-like clickable UI
- dense sortable/filterable tables
- persistent sidebar
- Inbox/Continue loop
- staff reports
- scouting uncertainty
- hidden traits
- long-term development
- custom conferences/schools
- sandbox and Data Lab
- play-by-play first, no visual sim required at launch

Architecture target:
- Tauri + React + TypeScript desktop app
- SQLite save/world database
- JSON rules/config
- deterministic simulation core
- AI service layer for LLM text and generated graphics
- AI never controls truth; AI only writes flavor or produces assets

Non-negotiables:
- no UI-only game state
- deterministic seeds
- save/load compatibility
- event/action log
- headless simulation ability
- tests for every meaningful system
- dense UI, not dashboard cards
- every meaningful entity should be clickable
- configurable rules, not hardcoded NCAA assumptions
- simulation works without LLM/image services

When implementing a packet:
1. Read the packet goal.
2. Keep changes focused.
3. Do not rewrite unrelated architecture.
4. Add or update schemas.
5. Add simulation logic.
6. Add UI only when requested.
7. Add tests.
8. Update PROJECT_STATUS.md.
9. Update NEXT_PACKET.md.
10. Explain any tradeoffs.
```
