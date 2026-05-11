# Headless Sim Harness (HARNESS-2)

Node-runnable harness for the in-browser sim modules under `js/sim/**`.
Spec: `ai-pack/CFB_FM_REMAINING_SYSTEM_SPECS/49_TEST_HARNESS_SCENARIO_BALANCE_AND_AI_QC_SPEC.md`.

## Quick Start

```bash
npm run sim                           # default: seed 123, 10 games
npm run sim:quick                     # 5 games, fast smoke
npm run sim:soak                      # 200 games, statistical sample
node harness/run.js --seed 42 --games 100 --homeTalent 80 --awayTalent 70
```

## Output

For a given seed N, results land in `harness/runs/seed_N/`:

- `summary.json` — args + aggregate totals + elapsed time
- `games.csv` — per-game scores, plays, Y/A, success rate, explosives
- `validation_report.md` — markdown table of metrics vs. statistical bands
- `anomalies.json` — list of band violations (severity MAJOR/MINOR)

Process exit code is `1` if any MAJOR-severity issues are found.

## Statistical Bands (BANDS in `run.js`)

| Metric                | Band       | Real CFB target          |
|-----------------------|------------|--------------------------|
| yardsPerPlay          | 4.5 - 8.5  | ~5.5-6.5                 |
| avgScoreCombined      | 30 - 80    | ~50-60 (real CFB ~57)    |
| successRate           | 35 - 55%   | ~42-48% (real CFB ~45)   |
| avgPlaysPerGame       | 100 - 180  | ~130-150 combined        |
| explosivesPerGameHome | 2 - 12     | ~5-7 per team            |
| homeWinRate           | 35 - 75%   | ~50% with equal talent   |

## How It Works

`node-shim.js` exposes `global.window = global`, then `vm.runInThisContext`s
each `js/sim/**` module in dependency order. Each module's IIFE attaches its
public surface to `window.CGM_*`, which is now `global.CGM_*`. No browser DOM
is touched.

`seeded-roster.js` builds a deterministic 65-player roster keyed by
`hash(seed | teamId)`, with attribute distributions scaled to a target talent
ovr. Every position in `MATCHUP-1` UNIT_DEFS is populated.

`run.js` calls `CGM_GAME_ENGINE.runFullGame` for N games, aggregates events,
and writes the four output files.

## Continuous Monitor

`harness/loop.js` runs the harness on a cadence forever. Each tick rotates the seed, runs N games, and appends a record to `harness/runs/history.jsonl` plus a one-line summary to stdout. `harness/runs/loop-status.json` always shows the latest tick.

```bash
npm run loop                  # every 10 min, 100 games per tick (default)
npm run loop:fast             # every 60s, 50 games — useful while tuning
npm run loop:once             # one tick and exit
npm run loop:status           # print loop-status.json
node harness/loop.js --interval 1800 --games 200    # custom
```

### Run in the background (already running on this machine)

```bash
nohup node harness/loop.js --interval 600 --games 100 > harness/runs/loop.log 2>&1 &
```

Check on it:

```bash
tail -f harness/runs/loop.log               # follow output
tail -n 5 harness/runs/history.jsonl        # last 5 ticks as JSON
cat harness/runs/loop-status.json           # current status (pid, last tick)
```

Stop it:

```bash
# Find the PID:
cat harness/runs/loop-status.json | grep pid
# Then:
taskkill /PID <pid> /F                       # Windows
# or:
kill <pid>                                   # Unix
```

### Survive reboots — Windows Task Scheduler

Run once in PowerShell (Admin):

```powershell
$action = New-ScheduledTaskAction -Execute "node.exe" -Argument "harness/loop.js --interval 600 --games 100" -WorkingDirectory "C:\Users\joshu\OneDrive\Desktop\FM Game"
$trigger = New-ScheduledTaskTrigger -AtLogon
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERNAME" -LogonType Interactive
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -RestartCount 5 -RestartInterval (New-TimeSpan -Minutes 5)
Register-ScheduledTask -TaskName "CGM-HarnessLoop" -Action $action -Trigger $trigger -Principal $principal -Settings $settings
```

Verify with `Get-ScheduledTask -TaskName CGM-HarnessLoop`. Remove with `Unregister-ScheduledTask -TaskName CGM-HarnessLoop -Confirm:$false`.

## Wave-3 Findings (2026-05-03 first run)

Initial harness run with seed=123 surfaced two real sim balance bugs:

1. **Success rate ~8%** — drives end after 3.6 plays on average; play-resolver
   is producing too many short losses or stuffed runs. Spec target is ~45%.
2. **Home win rate 95% with equal talent** — extreme home advantage built into
   the engine. With a 3-point talent gap (78 vs 75), home wins 100/100. Likely
   in tendency-vs-defense matrix, possession kickoff handling, or unit-rating
   scaling. Spec target is ~50% at equal talent.

These are the first quantitative balance issues the harness has produced.
HARNESS-2 itself is working — this is what it's *for*. Next-session task:
trace the success-rate drop with a single-game `--verbose` flag and audit
play-resolver buckets.
