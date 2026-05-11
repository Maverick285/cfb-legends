# 90_PROJECT_STATUS_TEMPLATE

> Copy this file into the active working status document, or overwrite its sections after every meaningful work cycle.

## Purpose

This file is the live operational heartbeat of the project.

Update it after:
- finishing a vertical slice
- changing milestone focus
- making a major architecture or rules decision
- uncovering a blocking risk
- completing a test pass
- handing the project to another AI session

Do not let this file become fiction. If something is uncertain, say so plainly.

---

## Current snapshot

**Date / session identifier:**  
**Current milestone:**  
**Current vertical slice:**  
**Working role for this session:**  
**Build / schema version:**  
**Ruleset version currently assumed:**  
**Content pack versions currently assumed:**  

## One-paragraph status

Write a blunt summary of where the project stands right now.

## North-star check

Answer these directly:

- Are we still building the office before the stadium?
- Did any recent work drift toward clone behavior?
- Did any recent work violate fictional-first prototype rules?
- Did any recent work hardcode volatile sports rules?
- Is the menus-first yearly loop more complete than it was before this session?

## Completed since last update

List concrete completed work only.

- 
- 
- 

## In progress

List active work that is not done yet.

- 
- 
- 

## Blockers

List anything preventing clean progress.

- 
- 
- 

## Key decisions made this cycle

Reference the decision log IDs.

- 
- 
- 

## Files created or updated

- 
- 
- 

## Systems affected

Check all that apply and add notes.

- [ ] menu shell / navigation
- [ ] inbox / event system
- [ ] roster / eligibility / redshirt
- [ ] recruiting
- [ ] transfer portal / retention
- [ ] staffing / delegation
- [ ] finance / benefits / facilities
- [ ] schedule / results / box scores
- [ ] rankings / conference / CFP
- [ ] morale / culture / promises
- [ ] history / trophy room
- [ ] analytics / dashboards
- [ ] save/load / migrations
- [ ] schemas / content packs
- [ ] tests / QA / balance
- [ ] documentation

Notes:

## Tests run this cycle

For each test or validation:
- name
- result
- what it proves
- unresolved concerns

Example format:
- `eligibility_redshirt_threshold.spec.ts` — PASS — redshirt preservation holds through threshold edge case
- `full_season_seed_1001.sim` — FAIL — rankings diverged after conference title week

## Save / migration impact

- Did the schema change?
- Do migrations need to be written or updated?
- Were golden saves checked?
- What old saves are now at risk?

## Data / rules impact

- What entities or fields changed?
- What ruleset assumptions were introduced, updated, or removed?
- Does `06_RULES_AND_WORLD_MODEL.md` need revision?
- Does `99_SOURCES_AND_FACT_BASIS.md` need a source refresh?

## UX / player-impact summary

Describe what the player can do now that they could not do before.

## Known risks

List the top risks, not every tiny concern.

- 
- 
- 

## Known debt intentionally accepted

List debt that was accepted on purpose and why.

- 
- 
- 

## Out-of-scope items explicitly deferred

List work that was consciously pushed later.

- 
- 
- 

## Recommended next task

State the single best next task in one sentence.

## Recommended governing docs for next task

- 
- 
- 

## Recommended prompt for next session

Write a ready-to-paste prompt for the next AI session.

```text
Read 00_START_HERE.md, 01_GUIDING_LIGHT.md, this status file, and the decision log first.

Current milestone:
Current slice:

Your exact task:
- 

Constraints:
- keep the prototype fictional-first
- do not drift into advanced match-engine work
- update the status file and decision log when done

Return:
- assumptions
- files changed
- tests run
- risks
- next action
```

## Approval to advance milestone?

Choose one:
- [ ] yes, current milestone exit condition is satisfied
- [ ] no, more work is needed in the current milestone

If yes, explain why.
If no, name the missing exit criteria.
