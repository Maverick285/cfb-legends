# Feature Depth Rubrics

## Purpose

This document defines what “deep enough” means for each major system.

Use these rubrics to judge AI-coded work.

---

# Recruiting Rubric

## Score 0

Static recruit list or mock data.

## Score 1

Recruiting table exists, but recruits do not evolve or make real decisions.

## Score 2

Prospect entity exists with basic interest and offers.

## Score 3

Multi-year prospects, scouted ranges, interest formula, offers, and save/load work.

## Score 4

Recruiting connects to staff, NIL, school fit, visits, promises, AI schools, and events.

## Score 5

20-year sim validates class distributions, late bloomers, busts, AI school recruiting, blue-chip concentration, and signing outcomes.

## Required Proof

- prospects start as sophomores/juniors
- players can develop/stagnate/regress
- scouted ratings differ from truth
- interest has reason codes
- AI schools compete
- signing affects future roster
- NIL is not the only factor

---

# Player Development Rubric

## Score 0

Players have an overall rating only.

## Score 1

Players have attributes but no meaningful progression.

## Score 2

Players improve over time using simple progression.

## Score 3

Development uses hidden traits, potential, staff, practice, playing time, and facilities.

## Score 4

Development supports regression, injuries, position changes, morale, role fit, and staff reports.

## Score 5

Long-run sim validates elite player scarcity, breakout rates, bust rates, draft outputs, and development factories.

## Required Proof

- work ethic matters
- coachability matters
- practice matters
- staff matters
- facilities matter
- injuries can derail careers
- not every player improves
- hidden traits are not perfectly known

---

# Practice Rubric

## Score 0

Practice is cosmetic.

## Score 1

Practice has a slider but weak effects.

## Score 2

Practice allocation affects one stat.

## Score 3

Practice time units, intensity, categories, fatigue, readiness, and morale work.

## Score 4

Practice affects development, injuries, team vibe, game prep, position groups, and events.

## Score 5

Long-run validation proves practice strategies create different but balanced program identities.

## Required Proof

- NCAA/ruleset time cap exists
- intensity has tradeoffs
- players react differently
- staff can recommend/delegate
- extreme practice can backfire
- recovery matters

---

# Team Vibe / Morale Rubric

## Score 0

Single morale number with no effects.

## Score 1

Morale shown but barely affects gameplay.

## Score 2

Morale affects transfer risk.

## Score 3

Team vibe combines morale, leadership, trust, fatigue, wins, and conflict.

## Score 4

Team vibe affects practice, transfers, close games, events, and recruiting perception.

## Score 5

Long-run sim shows culture programs, toxic collapses, and leadership effects without arcade behavior.

## Required Proof

- pep talks can help or hurt
- player personality affects reaction
- leaders matter
- broken promises matter
- team vibe creates events
- vibe does not become a magic win button

---

# NIL / Roster Economics Rubric

## Score 0

Scholarships only.

## Score 1

NIL number exists but does little.

## Score 2

NIL affects recruit interest.

## Score 3

NIL, direct benefits, scholarship status, roster spot, and playing time are separate.

## Score 4

Clearinghouse, booster pressure, locker room jealousy, retention, and walk-on NIL cases exist.

## Score 5

Long-run validation proves NIL market ranges, flag rates, retention effects, and non-money paths to winning are plausible.

## Required Proof

- walk-on can have NIL value
- scholarship status is not economic value
- huge deals can be flagged
- money preference varies by player
- development-focused players exist
- NIL can create problems

---

# Staff Rubric

## Score 0

Staff are names only.

## Score 1

Staff have ratings but no effects.

## Score 2

Staff affect one system.

## Score 3

Staff affect recruiting, development, and scouting reports.

## Score 4

Staff have responsibilities, workload, bias, disagreements, contracts, and poaching.

## Score 5

Long-run sim validates coaching trees, staff movement, staff-driven program identities, and staff quality effects.

## Required Proof

- staff can be wrong
- staff can disagree
- staff can be delegated to
- staff workload matters
- position coaches matter
- staff leaving affects recruiting/development

---

# Game Simulation / Play-By-Play Rubric

## Score 0

Random scores.

## Score 1

Team rating creates score.

## Score 2

Box score and basic player stats exist.

## Score 3

Roster quality, scheme, home field, morale, injuries, and practice affect results.

## Score 4

Structured play-by-play, drives, game plans, tempo, matchups, and postgame reports exist.

## Score 5

Long-run validation proves scoring, upset rates, stat leaders, tempo effects, and scheme diversity are plausible.

## Required Proof

- same seed gives same game
- play-by-play matches box score
- better teams usually win
- upsets happen
- tempo has tradeoffs
- scheme fit matters
- practice readiness matters

---

# Draft Rubric

## Score 0

No draft.

## Score 1

Top-rated players randomly drafted.

## Score 2

Ability and production affect draft.

## Score 3

Position value, traits, size, injuries, production, and school visibility affect draft.

## Score 4

Draft feeds school NFL pipeline, recruiting reputation, player decisions, and staff reputation.

## Score 5

Long-run output resembles real-world draft distributions by school type, conference, position, and star background.

## Required Proof

- school pipeline matters but does not dominate
- G5 players can be drafted
- production matters
- traits matter
- development factories emerge
- draft validates talent model

---

# Custom School / Conference Rubric

## Score 0

Cosmetic names only.

## Score 1

Custom school appears but has no real effects.

## Score 2

Custom school joins world and schedule.

## Score 3

Custom school has structural power, facilities, NIL, town, recruiting geography, and conference membership.

## Score 4

Custom conferences affect revenue, scheduling, prestige, playoff access, rivalries, and recruiting.

## Score 5

Long-run sim shows custom schools/conferences behave plausibly and can rise/fall causally.

## Required Proof

- custom objects use same systems
- no special fake path
- custom conference schedules work
- custom school can recruit/play/develop/save/load

---

# LLM / Narrative Rubric

## Score 0

LLM invents game facts.

## Score 1

LLM writes flavor but no guardrails.

## Score 2

LLM receives structured payloads.

## Score 3

Fallbacks, forbidden-claim validation, and caching exist.

## Score 4

Reports are grounded, varied, staff-personality-aware, and connected to events.

## Score 5

Narrative layer enhances immersion across scouting, media, play-by-play, meetings, and town flavor without corrupting simulation.

## Required Proof

- game works without LLM
- LLM cannot decide facts
- bad output is rejected
- fallback templates exist
- reports cite structured evidence

---

# UI Density Rubric

## Score 0

Static mockups.

## Score 1

Basic pages and cards.

## Score 2

Tables exist.

## Score 3

Tables have sorting/filtering, clickable rows, and real state.

## Score 4

Saved views, comparisons, nested tabs, staff recommendation rails, and drill-down links exist.

## Score 5

Power user can spend 20 minutes on a screen making meaningful decisions.

## Required Proof

- every entity clickable
- no shallow card-only screens
- filters and saved views
- table customization
- breadcrumbs/back navigation
- hover cards or detail panels
