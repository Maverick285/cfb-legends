# 73 — Ready-To-Paste Player Comps Implementation Prompt

```text
Implement the Player Comps feature for CFB-FM.

Goal:
Add an NBA 2K-style comp system for recruits, transfer players, draft prospects, and current players.

Use:
- game_data/comps/college_player_comps_library.json
- 70_COLLEGE_PLAYER_COMPS_LIBRARY.md
- 71_PLAYER_COMPS_FEATURE_IMPLEMENTATION_SPEC.md
- 72_PLAYER_COMP_ENGINE_CODE_SKETCH.md

Core rule:
Comps are style/projection labels, not guarantees.

Deliver:
1. PlayerCompProfile type
2. CandidateCompResult type
3. comp library loader
4. player/recruit comp engine
5. position/tag/body gates
6. weighted attribute similarity
7. comp confidence calculation
8. similarities and differences reason codes
9. PlayerCompPanel UI component
10. optional Recruiting Board / Player Profile comp fields
11. tests

Hard rules:
- Do not let LLM choose comps.
- Engine chooses comps from structured attributes.
- Recruits use scouted ranges, not hidden true values.
- Display confidence.
- Display similarities and differences.
- Do not overuse famous comps.
- If score/confidence too low, show "No strong comp yet."
- Phrase as "style comp" or "tools comp," not destiny.

Specific required test:
A mobile QB with speed >= 18, acceleration >= 18, agility >= 18, scramble instinct >= 16, throw power >= 15, but low accuracy and low processing should receive a "Raw Michael Vick-type dual-threat athlete" style/tools comp with differences noting poor accuracy and awareness.

Other required tests:
- polished pocket QB does not receive Michael Vick comp
- huge power RB can receive Derrick Henry/Herschel/Bo style comp
- slim route-running WR can receive DeVonta Smith/Amari Cooper style comp
- low scouting confidence lowers comp confidence
- no comp appears below threshold
- comp result includes at least two similarities and one difference when possible

Acceptance:
- comp panel appears on Prospect Profile and Player Profile
- Recruiting Board can optionally show top comp and confidence
- staff report can mention comp using grounded result
- no hidden true ratings leaked for recruits
```
