# Agent Prompt: Import CFL Seed Data

You are working in the College Football Legends repo.

Use this seed data pack as disposable first-pass data scaffolding.

Tasks:
1. Inspect `/csv` and `/json`.
2. Do not assume the data is final or balanced.
3. Create import loaders that map these tables into the current app's data layer.
4. Preserve IDs exactly.
5. Do not silently drop columns. If a column does not map, report it.
6. Add a seed import report listing imported tables, rows, unmapped columns, and validation errors.
7. Do not build UI until seed import validation passes.

Quality gates:
- all table row counts match manifest
- every rostered program has 105 players
- every athlete has a ratings row
- every program has NIL, stadium, brand, and uniform records
- no orphan personId/programId references
