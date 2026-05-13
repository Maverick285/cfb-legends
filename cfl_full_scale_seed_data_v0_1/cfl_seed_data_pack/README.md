# College Football Legends — Synthetic Full-Scale Seed Data Pack v0.1

Generated: 2026-05-10T05:23:18.810706Z

## What this contains

This pack provides a first-pass, full-scale synthetic seed dataset for a fictional college football dynasty-management game.

It includes:
- 138 FBS-style schools/programs for the 2026 alignment baseline.
- 14490 rostered athletes, using a 105-player roster limit per program.
- 1932 coaches/staff profiles.
- 6000 national recruits.
- 30000 recruit-program interest rows.
- 828 scheduled games and 1656 team schedule rows.
- NIL, stadium, uniform, brand, ratings, traits, schemes, and concept tables.

## Important caveat

School/team names and conference alignment are intended as current-real-world-inspired seed scaffolding. Player, recruit, coach, staff, NIL, rating, schedule, stadium, and uniform data are synthetic placeholders.

Do not treat this as licensed roster data, real player data, or real NIL data.

## Roster/scholarship baseline

This first seed assumes:
- football roster limit: 105
- scholarships funded: 105
- walk-on slots: 0

The model follows the post-House settlement concept that sport-specific scholarship limits are removed and roster limits control the maximum roster size.

## Files

- `/csv/` — one CSV per table
- `/json/` — one JSON per table
- `/sql/cfl_seed_data.sqlite` — SQLite database with the same tables
- `manifest.csv` / `manifest.json` — table inventory

## Best next step

Import this into the game as disposable seed data, then review:
1. player rating fields
2. coach/staff fields
3. NIL fields
4. program budget/prestige values
5. conference/team alignment
6. roster position distribution
7. recruit star distribution
8. schedule logic

This is designed to be revised, not treated as final.
