# Campus Gridiron Manager - Agent Rules

This repo follows the discipline pack in `cfl_agent_repo_pack/`.

## Current Rules

- Build reusable, data-driven screens instead of one-off mockups.
- Do not expose a player-facing button unless it has real state-backed behavior.
- The Dashboard must follow `cfl_agent_repo_pack/specs/screens/dashboard.visual-spec.md`.
- UI work must run the available checks before being reported as done.
- Reference images are style and layout guidance only; do not copy proprietary content.

## Current Static-App Check Commands

```bash
npm run check
```

This runs JavaScript syntax checks, the M0 smoke test, and static dashboard visual contract checks.
