

<!-- FILE: 00_START_HERE_PLAYER_COMPS_PACK.md -->

# CFB-FM Player Comps Pack — Start Here

## Purpose

This pack adds a college-football player comps feature similar in spirit to NBA 2K draft/player comps.

It includes:

- a large college football legend comp library
- JSON comp data
- an implementation spec
- a code sketch
- a ready-to-paste AI implementation prompt

## Core Rule

```text
Comps are style/projection labels, not guarantees.
```

Good:

```text
Raw Michael Vick-type dual-threat athlete
```

Bad:

```text
The next Michael Vick
```

## Files

- `70_COLLEGE_PLAYER_COMPS_LIBRARY.md`
- `71_PLAYER_COMPS_FEATURE_IMPLEMENTATION_SPEC.md`
- `72_PLAYER_COMP_ENGINE_CODE_SKETCH.md`
- `73_READY_TO_PASTE_PLAYER_COMPS_IMPLEMENTATION_PROMPT.md`
- `college_player_comps_library.json`

## User Example Covered

A mobile QB with amazing speed/agility but poor accuracy and awareness can receive:

```text
Style Comp: Raw Michael Vick-type dual-threat athlete
```

with explicit differences:

```text
accuracy is much less developed
awareness/processing remain raw
style/tools comp only
```


<!-- FILE: 70_COLLEGE_PLAYER_COMPS_LIBRARY.md -->

# College Player Comps Library


## Purpose

This library gives the game an NBA 2K-style “player comps” feature for recruits, transfers, draft prospects, and current players.

These are **style comps**, not guarantees.

A comp should answer:

```text
Who does this player's football profile remind the staff of?
```

Not:

```text
This player will become that person.
```

## Critical Display Rule

Every comp should be phrased carefully:

```text
Style Comp
Ceiling Comp
Floor Comp
Developmental Comp
Scheme Comp
```

Avoid saying:

```text
He is the next Michael Vick.
```

Use:

```text
His open-field speed and raw dual-threat profile give him a Michael Vick-style tools comp, though his accuracy and awareness are much less developed.
```

## Example From User

If a player is:

```text
mobile QB
amazing agility
amazing speed
poor throwing accuracy
poor awareness
```

The game can show:

```text
Style Comp: Raw Michael Vick-type dual-threat athlete
Why: elite speed/agility, rare open-field creation, big-play rushing threat
Concern: current accuracy and awareness are far below polished QB standards
Confidence: Medium if scouting confirms athletic traits; Low if passing data is limited
```

## Comp Categories

- Style Comp: closest play-style similarity
- Ceiling Comp: best-case developmental outcome
- Floor Comp: lower-end outcome if weaknesses persist
- Scheme Comp: best system comparison
- Draft Comp: later feature for NFL/draft projection

## Comp Library



# C Comps

## Creed Humphrey — Oklahoma

**Position:** C  
**Archetype:** Smart powerful center  
**Best For:** centers with leadership, strength, and pass/run balance  
**Attribute Signature:** Awareness 18, strength high, communication high  
**Caution:** Center/IQ comp  
**Tags:** center, iq, leader


## Alex Mack — California

**Position:** C  
**Archetype:** Cerebral center  
**Best For:** centers with awareness, leverage, and leadership  
**Attribute Signature:** Awareness/communication high, strength medium+  
**Caution:** Technical center  
**Tags:** center, processor, leader



# CB Comps

## Deion Sanders — Florida State

**Position:** CB  
**Archetype:** Elite cover/return superstar  
**Best For:** corners with speed, ball skills, swagger, and return value  
**Attribute Signature:** Speed 20, ball skills 19, man coverage high, tackling lower  
**Caution:** Generational cover/return comp  
**Tags:** cb, speed, ball_skills, returner


## Patrick Peterson — LSU

**Position:** CB  
**Archetype:** Big press-return corner  
**Best For:** large corners with press, speed, and return value  
**Attribute Signature:** Size 17+, speed 17+, press high, return high  
**Caution:** Big CB comp  
**Tags:** cb, press, returner


## Sauce Gardner — Cincinnati

**Position:** CB  
**Archetype:** Long press technician  
**Best For:** long corners with press, confidence, and low completion profile  
**Attribute Signature:** Length high, press high, man coverage high  
**Caution:** Long CB comp  
**Tags:** cb, length, press


## Darrelle Revis — Pittsburgh

**Position:** CB  
**Archetype:** Mirror man-cover corner  
**Best For:** corners with footwork, hip fluidity, and man technique  
**Attribute Signature:** Man coverage 19, hip fluidity high, footwork high  
**Caution:** Man coverage comp  
**Tags:** cb, man, technician



# CB/S Comps

## Charles Woodson — Michigan

**Position:** CB/S  
**Archetype:** Complete playmaking DB  
**Best For:** DBs with coverage, ball skills, return/WR value, and big-game traits  
**Attribute Signature:** Coverage high, ball skills 19, versatility high, big-game high  
**Caution:** Complete DB comp  
**Tags:** db, versatile, playmaker


## Jalen Ramsey — Florida State

**Position:** CB/S  
**Archetype:** Physical positionless DB  
**Best For:** DBs with size, man coverage, safety flexibility, and confidence  
**Attribute Signature:** Size/physicality high, man coverage high, versatility high  
**Caution:** Hybrid DB comp  
**Tags:** db, versatile, physical


## Malcolm Jenkins — Ohio State

**Position:** CB/S  
**Archetype:** Smart DB leader  
**Best For:** DBs with position versatility, leadership, and awareness  
**Attribute Signature:** Awareness high, versatility high, leadership high  
**Caution:** Reliable versatile DB  
**Tags:** db, leader, versatile



# CB/WR Comps

## Champ Bailey — Georgia

**Position:** CB/WR  
**Archetype:** Two-way cover athlete  
**Best For:** corners with elite athleticism and offensive/return value  
**Attribute Signature:** Speed high, man coverage high, ball skills high, WR value  
**Caution:** Two-way comp  
**Tags:** cb, two_way, athlete



# DB Comps

## Tyrann Mathieu — LSU

**Position:** DB  
**Archetype:** Instinctive havoc nickel/safety  
**Best For:** smaller DBs with instincts, ball skills, blitz, and chaos plays  
**Attribute Signature:** Instincts 19, ball skills high, blitz high, size small  
**Caution:** Nickel/havoc comp  
**Tags:** db, nickel, havoc


## Minkah Fitzpatrick — Alabama

**Position:** DB  
**Archetype:** Assignment-perfect versatile DB  
**Best For:** DBs with IQ, slot/safety versatility, and discipline  
**Attribute Signature:** Awareness/discipline high, coverage high, versatility high  
**Caution:** Smart versatile DB  
**Tags:** db, versatile, iq



# DE Comps

## J.J. Watt — Wisconsin

**Position:** DE  
**Archetype:** Effort-power developmental end  
**Best For:** big effort players with power, length, and development arc  
**Attribute Signature:** Work ethic/motor 19, size high, power high  
**Caution:** Development/motor comp  
**Tags:** de, motor, development



# DT Comps

## Ndamukong Suh — Nebraska

**Position:** DT  
**Archetype:** Interior wrecking ball  
**Best For:** DTs with power, disruption, strength, and dominance  
**Attribute Signature:** Strength 20, pass rush interior 19, run defense 19  
**Caution:** Generational interior comp  
**Tags:** dt, power, disruptor


## Aaron Donald — Pittsburgh

**Position:** DT  
**Archetype:** Undersized explosive disruptor  
**Best For:** smaller DTs with first step, leverage, strength, and production  
**Attribute Signature:** Explosiveness 19, leverage high, strength high, size lower  
**Caution:** Undersized elite only  
**Tags:** dt, undersized, explosive


## Warren Sapp — Miami

**Position:** DT  
**Archetype:** Penetrating three-tech  
**Best For:** DTs with burst, pass rush, and disruptive quickness  
**Attribute Signature:** First step high, pass rush high, strength medium+  
**Caution:** 3-tech comp  
**Tags:** dt, penetrator, pass_rush



# EDGE Comps

## Julius Peppers — North Carolina

**Position:** EDGE  
**Archetype:** Rare jumbo edge athlete  
**Best For:** huge edges with basketball movement and power  
**Attribute Signature:** Size 19, speed 17+, explosiveness high, pass rush high  
**Caution:** Rare size/athlete comp  
**Tags:** edge, athlete, power


## Chase Young — Ohio State

**Position:** EDGE  
**Archetype:** Prototype explosive edge  
**Best For:** edges with burst, bend, size, and pass-rush dominance  
**Attribute Signature:** Explosiveness/bend/pass rush 18+, size high  
**Caution:** Prototype edge  
**Tags:** edge, prototype, pass_rush


## Jadeveon Clowney — South Carolina

**Position:** EDGE  
**Archetype:** Freak edge athlete  
**Best For:** edges with rare size/speed and splash play upside  
**Attribute Signature:** Speed/size/explosiveness 19, motor/consistency variable  
**Caution:** Tools comp with consistency caveat  
**Tags:** edge, freak, tools


## Myles Garrett — Texas A&M

**Position:** EDGE  
**Archetype:** Power-speed edge prototype  
**Best For:** edges with strength, speed, bend, and pass-rush polish  
**Attribute Signature:** Power/speed/bend high, size high  
**Caution:** Elite edge comp  
**Tags:** edge, power_speed, prototype


## Joey Bosa — Ohio State

**Position:** EDGE  
**Archetype:** Technician power end  
**Best For:** edges with hand usage, power, discipline, and run defense  
**Attribute Signature:** Hand usage 18, power high, run defense high, speed medium+  
**Caution:** Technical edge  
**Tags:** edge, technician, power


## Nick Bosa — Ohio State

**Position:** EDGE  
**Archetype:** Polished compact edge  
**Best For:** edges with refined hands, bend, and leverage  
**Attribute Signature:** Technique high, bend high, power high  
**Caution:** Polished edge  
**Tags:** edge, bend, technician


## Aidan Hutchinson — Michigan

**Position:** EDGE  
**Archetype:** High-motor technician edge  
**Best For:** edges with motor, hands, size, and leadership  
**Attribute Signature:** Motor/work ethic 18, pass rush high, size high  
**Caution:** Motor/technique comp  
**Tags:** edge, motor, technician


## Will Anderson Jr. — Alabama

**Position:** EDGE  
**Archetype:** Relentless edge/LB rusher  
**Best For:** edges with first step, pursuit, motor, and production  
**Attribute Signature:** Motor 19, explosiveness high, pass rush high  
**Caution:** High-motor edge  
**Tags:** edge, motor, production


## Dwight Freeney — Syracuse

**Position:** EDGE  
**Archetype:** Compact spin/bend terror  
**Best For:** undersized speed rushers with bend and get-off  
**Attribute Signature:** Acceleration/bend 19, size lower, pass rush high  
**Caution:** Undersized rusher  
**Tags:** edge, undersized, bend


## Terrell Suggs — Arizona State

**Position:** EDGE  
**Archetype:** Production-heavy pass rusher  
**Best For:** edges with sack production, power, and instincts  
**Attribute Signature:** Pass rush production 19, power high, instincts high  
**Caution:** Production edge  
**Tags:** edge, production, power



# EDGE/LB Comps

## Von Miller — Texas A&M

**Position:** EDGE/LB  
**Archetype:** Explosive bend rusher  
**Best For:** speed/bend edges with elite first step  
**Attribute Signature:** Bend 19, speed 18, pass rush 18, size medium  
**Caution:** Speed rusher comp  
**Tags:** edge, bend, speed


## Khalil Mack — Buffalo

**Position:** EDGE/LB  
**Archetype:** Small-school power edge  
**Best For:** small-school edges with strength, production, and versatility  
**Attribute Signature:** Strength high, pass rush high, run defense high, school level lower  
**Caution:** G5/small-school edge  
**Tags:** edge, g5_star, power



# K Comps

## Sebastian Janikowski — Florida State

**Position:** K  
**Archetype:** Huge-leg kicker  
**Best For:** kickers with elite power and long field-goal range  
**Attribute Signature:** Kick power 20, accuracy medium+, pressure medium+  
**Caution:** Big leg comp  
**Tags:** kicker, power


## Justin Tucker — Texas

**Position:** K  
**Archetype:** Reliable elite accuracy kicker  
**Best For:** kickers with accuracy, clutch, and range  
**Attribute Signature:** Accuracy 19, clutch high, power high  
**Caution:** Accuracy/clutch comp  
**Tags:** kicker, accuracy, clutch


## Mason Crosby — Colorado

**Position:** K  
**Archetype:** Altitude-long-range kicker  
**Best For:** kickers with power and long-distance profile  
**Attribute Signature:** Kick power high, long range high, accuracy medium+  
**Caution:** Long-range comp  
**Tags:** kicker, range


## Rodrigo Blankenship — Georgia

**Position:** K  
**Archetype:** High-profile accurate college kicker  
**Best For:** kickers with consistency and visibility  
**Attribute Signature:** Accuracy high, consistency high, power medium+  
**Caution:** Consistency comp  
**Tags:** kicker, accuracy, consistency


## Roberto Aguayo — Florida State

**Position:** K  
**Archetype:** College automatic kicker  
**Best For:** kickers with elite college accuracy and confidence  
**Attribute Signature:** Accuracy 19, consistency high, clutch high  
**Caution:** College accuracy comp  
**Tags:** kicker, automatic



# LB Comps

## Luke Kuechly — Boston College

**Position:** LB  
**Archetype:** Instinctive tackle machine  
**Best For:** LBs with elite processing, tackling, and leadership  
**Attribute Signature:** Awareness 19, tackling 19, leadership high, speed medium+  
**Caution:** Instincts/IQ comp  
**Tags:** lb, instincts, tackling


## Ray Lewis — Miami

**Position:** LB  
**Archetype:** Alpha middle linebacker  
**Best For:** LBs with leadership, violence, instincts, and big-game presence  
**Attribute Signature:** Leadership 20, aggression high, tackling high, instincts high  
**Caution:** Alpha comp  
**Tags:** lb, leader, alpha


## Patrick Willis — Ole Miss

**Position:** LB  
**Archetype:** Explosive tackling missile  
**Best For:** LBs with speed, strength, pursuit, and tackling  
**Attribute Signature:** Speed 17+, tackling 19, pursuit high, strength high  
**Caution:** Modern LB power/speed  
**Tags:** lb, speed, tackling


## Derrick Johnson — Texas

**Position:** LB  
**Archetype:** Range-and-coverage backer  
**Best For:** LBs with athleticism, coverage, and pursuit  
**Attribute Signature:** Range high, coverage high, speed high  
**Caution:** Coverage LB  
**Tags:** lb, coverage, range


## Roquan Smith — Georgia

**Position:** LB  
**Archetype:** Fast modern field general  
**Best For:** smaller fast LBs with run fits, range, and leadership  
**Attribute Signature:** Speed 17+, run fits high, awareness high  
**Caution:** Modern LB  
**Tags:** lb, speed, field_general


## Devin White — LSU

**Position:** LB  
**Archetype:** Blitzing speed backer  
**Best For:** LBs with speed, aggression, blitz value, and range  
**Attribute Signature:** Speed 18, blitz 17+, aggression high  
**Caution:** Fast LB comp  
**Tags:** lb, blitz, speed


## Manti Te'o — Notre Dame

**Position:** LB  
**Archetype:** High-profile instinctive leader  
**Best For:** LBs with leadership, tackling, instincts, and program face traits  
**Attribute Signature:** Leadership high, tackling high, instincts high, speed medium  
**Caution:** Leader LB comp  
**Tags:** lb, leader, instincts


## C.J. Mosley — Alabama

**Position:** LB  
**Archetype:** Assignment-sound SEC linebacker  
**Best For:** LBs with discipline, tackling, and coverage/run balance  
**Attribute Signature:** Assignment discipline high, tackling high, coverage medium+  
**Caution:** Reliable LB  
**Tags:** lb, discipline, balanced


## LaVar Arrington — Penn State

**Position:** LB  
**Archetype:** Explosive havoc linebacker  
**Best For:** LBs with burst, aggression, and splash plays  
**Attribute Signature:** Explosiveness high, aggression high, instincts high  
**Caution:** Havoc LB  
**Tags:** lb, havoc, explosive



# LB/EDGE Comps

## Micah Parsons — Penn State

**Position:** LB/EDGE  
**Archetype:** Hybrid pass-rush athlete  
**Best For:** LB/edge hybrids with range, pass-rush, and elite athleticism  
**Attribute Signature:** Speed/explosiveness 18+, pass rush high, coverage medium+  
**Caution:** Hybrid rush/space comp  
**Tags:** lb, edge, hybrid


## Shaquem Griffin — UCF

**Position:** LB/EDGE  
**Archetype:** High-motor speed blitzer  
**Best For:** smaller speed LBs with motor, blitz, and emotional story  
**Attribute Signature:** Motor high, speed high, blitz high, size lower  
**Caution:** Motor/underdog comp  
**Tags:** lb, speed, motor



# LB/S Comps

## Brian Urlacher — New Mexico

**Position:** LB/S  
**Archetype:** Big hybrid space defender  
**Best For:** big athletic LBs/safeties with range and versatility  
**Attribute Signature:** Size 18, speed 16+, coverage high, versatility high  
**Caution:** Hybrid comp  
**Tags:** lb, hybrid, coverage



# OG Comps

## Quenton Nelson — Notre Dame

**Position:** OG  
**Archetype:** Punishing interior mauler  
**Best For:** guards with elite strength, leverage, and violence  
**Attribute Signature:** Strength 19, run block 19, aggression high, pass block high  
**Caution:** Interior power comp  
**Tags:** og, mauler, power



# OG/OT Comps

## Zack Martin — Notre Dame

**Position:** OG/OT  
**Archetype:** Technician guard/tackle  
**Best For:** OL with versatility, technique, and consistency  
**Attribute Signature:** Technique high, consistency high, pass/run high  
**Caution:** Versatile OL comp  
**Tags:** ol, versatile, technician



# OT Comps

## Orlando Pace — Ohio State

**Position:** OT  
**Archetype:** Generational blindside wall  
**Best For:** elite tackles with size, feet, power, and pass protection  
**Attribute Signature:** Pass block 19, footwork 19, size 19, strength high  
**Caution:** Generational; use rarely  
**Tags:** ot, pass_protection, elite


## Jonathan Ogden — UCLA

**Position:** OT  
**Archetype:** Massive technician tackle  
**Best For:** huge tackles with length, power, and technique  
**Attribute Signature:** Size/length 20, pass block high, strength high  
**Caution:** Prototype LT  
**Tags:** ot, length, technician


## Joe Thomas — Wisconsin

**Position:** OT  
**Archetype:** Clean technician tackle  
**Best For:** tackles with footwork, discipline, and balanced blocking  
**Attribute Signature:** Footwork 19, discipline high, pass/run block high  
**Caution:** Technician comp  
**Tags:** ot, technician, balanced


## Trent Williams — Oklahoma

**Position:** OT  
**Archetype:** Rare athletic power tackle  
**Best For:** tackles with athleticism, strength, and movement skill  
**Attribute Signature:** Strength 18, footwork high, agility high, run/pass high  
**Caution:** Athletic tackle comp  
**Tags:** ot, athlete, power


## Penei Sewell — Oregon

**Position:** OT  
**Archetype:** Young mauling movement tackle  
**Best For:** large tackles with power, movement, and early dominance  
**Attribute Signature:** Run block 18, movement high, strength high, youth high  
**Caution:** Physical young OT  
**Tags:** ot, mauler, movement


## Jake Long — Michigan

**Position:** OT  
**Archetype:** Classic power tackle  
**Best For:** big tackles with strength, run blocking, and pass protection  
**Attribute Signature:** Size/strength high, run/pass balance high  
**Caution:** Traditional OT  
**Tags:** ot, power, balanced


## D'Brickashaw Ferguson — Virginia

**Position:** OT  
**Archetype:** Long pass-protection tackle  
**Best For:** lean tackles with length, feet, and pass protection  
**Attribute Signature:** Length high, footwork high, strength medium  
**Caution:** Pass-protect OT  
**Tags:** ot, length, pass_protection


## Andrew Thomas — Georgia

**Position:** OT  
**Archetype:** SEC power technician  
**Best For:** tackles with run/pass balance, strength, and technique  
**Attribute Signature:** Pass/run block high, strength high, footwork high  
**Caution:** Balanced tackle  
**Tags:** ot, balanced, sec


## Tyron Smith — USC

**Position:** OT  
**Archetype:** Explosive tackle athlete  
**Best For:** tackles with rare athletic traits and projection  
**Attribute Signature:** Agility/strength high, frame high, pass block projection high  
**Caution:** Athletic projection  
**Tags:** ot, athlete, projection



# P Comps

## Ray Guy — Southern Miss

**Position:** P  
**Archetype:** Legendary power punter  
**Best For:** punters with huge leg, hang time, and field-position impact  
**Attribute Signature:** Punt power 20, hang time high, accuracy high  
**Caution:** Elite punter comp  
**Tags:** punter, power, hang_time


## Michael Dickson — Texas

**Position:** P  
**Archetype:** Directional weapon punter  
**Best For:** punters with hang time, directional control, and net value  
**Attribute Signature:** Punt accuracy high, hang time high, power high  
**Caution:** Modern punter comp  
**Tags:** punter, directional, net


## Braden Mann — Texas A&M

**Position:** P  
**Archetype:** Big-leg modern punter  
**Best For:** punters with huge distance and field-position value  
**Attribute Signature:** Punt power high, hang time high  
**Caution:** Power punter  
**Tags:** punter, power



# QB Comps

## Michael Vick — Virginia Tech

**Position:** QB  
**Archetype:** Explosive dual-threat tools monster  
**Best For:** elite-speed mobile QBs with rare burst, open-field creativity, and big-arm flashes  
**Attribute Signature:** Speed/acceleration/agility 18+, throw power 16+, scramble instinct high, accuracy/processing can be volatile  
**Caution:** Use as a style/tools comp, not a polished passing comp unless accuracy and awareness are also strong  
**Tags:** dual_threat, elite_speed, raw_tools, big_arm, scrambler


## Lamar Jackson — Louisville

**Position:** QB  
**Archetype:** Game-breaking spread creator  
**Best For:** mobile QBs who are offense-warping runners with improving passer traits  
**Attribute Signature:** Speed/agility 18+, acceleration 18+, vision high, creativity high, deep accuracy/tooling medium+  
**Caution:** Requires much better football IQ and production than a generic fast QB  
**Tags:** dual_threat, heisman, creator, speed


## Cam Newton — Auburn

**Position:** QB  
**Archetype:** Power dual-threat alpha  
**Best For:** big QBs with power-run value, leadership, and vertical passing threat  
**Attribute Signature:** Size/frame 17+, power 17+, leadership 16+, throw power 15+, pressure high  
**Caution:** Do not use for small speed-only QBs  
**Tags:** power_qb, leader, championship, dual_threat


## Tim Tebow — Florida

**Position:** QB  
**Archetype:** Culture-power option leader  
**Best For:** physical QBs with leadership, toughness, and red-zone power but passing questions  
**Attribute Signature:** Leadership/work ethic/competitiveness 18+, power 16+, accuracy modest, processing role-dependent  
**Caution:** Use when intangibles and power matter more than passing polish  
**Tags:** leader, option, power_qb, culture


## Vince Young — Texas

**Position:** QB  
**Archetype:** Big-game dual-threat passer-runner  
**Best For:** tall, fluid QBs with open-field running and clutch big-game traits  
**Attribute Signature:** Size 15+, speed 15+, composure/big-game nerve 18+, creativity high  
**Caution:** Needs clutch/poise to fit  
**Tags:** dual_threat, clutch, big_game


## Johnny Manziel — Texas A&M

**Position:** QB  
**Archetype:** Chaotic improvising creator  
**Best For:** undersized improvisers who extend plays and thrive in chaos  
**Attribute Signature:** Creativity 18+, agility 17+, pressure creativity high, discipline/structure lower  
**Caution:** High volatility; use for backyard creators  
**Tags:** improviser, chaos, undersized_qb


## Kyler Murray — Oklahoma

**Position:** QB  
**Archetype:** Compact elite athlete passer  
**Best For:** shorter QBs with elite speed, twitch, and passing accuracy  
**Attribute Signature:** Speed/agility 18+, short/medium accuracy 16+, processing 14+, size smaller  
**Caution:** Should not be used for inaccurate speed-only QBs  
**Tags:** dual_threat, compact, accurate, speed


## Baker Mayfield — Oklahoma

**Position:** QB  
**Archetype:** Fiery pocket-spread distributor  
**Best For:** competitive rhythm passers with swagger, accuracy, and leadership  
**Attribute Signature:** Competitiveness 18+, accuracy 16+, leadership high, size average  
**Caution:** More attitude/accuracy than raw physical tools  
**Tags:** leader, accuracy, spread_qb


## Joe Burrow — LSU

**Position:** QB  
**Archetype:** Elite processor with late explosion  
**Best For:** late-blooming QBs with accuracy, poise, and sudden senior-year leap  
**Attribute Signature:** Processing 18+, accuracy 18+, composure 18+, development curve late  
**Caution:** Use for polished passers, not raw athletes  
**Tags:** processor, late_bloomer, accuracy


## Trevor Lawrence — Clemson

**Position:** QB  
**Archetype:** Prototype five-star field general  
**Best For:** big, polished, high-pedigree QBs with arm talent and poise  
**Attribute Signature:** Size 17+, throw power 16+, accuracy 16+, composure high  
**Caution:** Needs high floor and high ceiling  
**Tags:** prototype, five_star, field_general


## Andrew Luck — Stanford

**Position:** QB  
**Archetype:** Pro-style intellectual prototype  
**Best For:** big, smart QBs with processing, accuracy, and athletic enough movement  
**Attribute Signature:** Processing 18+, awareness 18+, accuracy 16+, size 17+, work ethic high  
**Caution:** Best for cerebral QB comps  
**Tags:** processor, pro_style, academic


## Peyton Manning — Tennessee

**Position:** QB  
**Archetype:** Classic pocket professor  
**Best For:** pocket QBs with elite awareness, preparation, accuracy, and leadership  
**Attribute Signature:** Processing/awareness/film study 19+, accuracy high, mobility low/medium  
**Caution:** Do not use for rushing creators  
**Tags:** pocket, processor, leader


## Marcus Mariota — Oregon

**Position:** QB  
**Archetype:** Clean-tempo dual-threat operator  
**Best For:** spread-tempo QBs with athleticism, poise, and clean decision-making  
**Attribute Signature:** Speed 15+, processing 16+, discipline 16+, accuracy 15+  
**Caution:** Less chaotic than pure improvisers  
**Tags:** tempo, dual_threat, clean_operator


## Robert Griffin III — Baylor

**Position:** QB  
**Archetype:** Track-speed vertical spread QB  
**Best For:** elite speed QBs with deep-ball upside and explosive spread production  
**Attribute Signature:** Speed 19, deep accuracy 16+, throw power high, injury risk can vary  
**Caution:** Needs deep passing trait, not just speed  
**Tags:** speed, deep_ball, spread


## Kellen Moore — Boise State

**Position:** QB  
**Archetype:** Undersized timing savant  
**Best For:** limited-tool QBs with elite timing, processing, and system mastery  
**Attribute Signature:** Processing 18+, accuracy 16+, size/tooling low-medium  
**Caution:** Use for high IQ/low measurables  
**Tags:** processor, undersized, timing


## Colt McCoy — Texas

**Position:** QB  
**Archetype:** Efficient spread rhythm leader  
**Best For:** accurate, productive QBs with mobility and leadership but not elite tools  
**Attribute Signature:** Accuracy 16+, leadership 15+, mobility 12-15, processing high  
**Caution:** Good high-floor comp  
**Tags:** accuracy, rhythm, leader


## Sam Bradford — Oklahoma

**Position:** QB  
**Archetype:** Smooth spread pocket passer  
**Best For:** accurate, calm passers in spread systems  
**Attribute Signature:** Accuracy high, timing high, pocket presence high, mobility modest  
**Caution:** Use for passing polish  
**Tags:** accuracy, spread, pocket


## Tua Tagovailoa — Alabama

**Position:** QB  
**Archetype:** Quick-trigger lefty distributor  
**Best For:** quick-processing, accurate passers with touch and timing  
**Attribute Signature:** Short/medium accuracy 18+, timing 18+, processing high, durability watch optional  
**Caution:** Use for compact timing passers  
**Tags:** accuracy, quick_trigger, touch


## Bryce Young — Alabama

**Position:** QB  
**Archetype:** Poised undersized creator  
**Best For:** smaller QBs with elite poise, processing, and pocket creativity  
**Attribute Signature:** Composure 18+, processing 17+, creativity high, size low  
**Caution:** Not for pure speed runners  
**Tags:** poise, processor, undersized


## Jalen Hurts — Alabama/Oklahoma

**Position:** QB  
**Archetype:** Developmental power-leader QB  
**Best For:** QBs with leadership, strength, work ethic, and improving passing arc  
**Attribute Signature:** Leadership/work ethic 18+, power 15+, development improvement, accuracy rising  
**Caution:** Best for players with growth trajectory  
**Tags:** leader, development, power_qb


## Pat White — West Virginia

**Position:** QB  
**Archetype:** Spread-option speed trigger  
**Best For:** option/spread QBs with speed, toughness, and system fit  
**Attribute Signature:** Speed 17+, option decision high, toughness high, passing modest  
**Caution:** Best for option systems  
**Tags:** option, speed, system_qb


## Denard Robinson — Michigan

**Position:** QB  
**Archetype:** Pure-speed offensive weapon  
**Best For:** electric athletes playing QB with position-change/ATH potential  
**Attribute Signature:** Speed 19+, agility 18+, throw accuracy low-medium, awareness volatile  
**Caution:** Use for athlete/QB tweener comps  
**Tags:** athlete, speed, position_projection


## Eric Crouch — Nebraska

**Position:** QB  
**Archetype:** Option gamer  
**Best For:** tough option QBs with competitiveness, rushing value, and limited passing  
**Attribute Signature:** Competitiveness high, option IQ high, speed/agility high, passing low-medium  
**Caution:** Option-only style  
**Tags:** option, gamer, run_first



# RB Comps

## Barry Sanders — Oklahoma State

**Position:** RB  
**Archetype:** Impossible-cut explosive back  
**Best For:** compact backs with elite agility, burst, balance, and open-field creativity  
**Attribute Signature:** Agility/change of direction/balance 19+, vision 18+, size compact  
**Caution:** Generational comp; use sparingly and with high confidence  
**Tags:** elusive, vision, explosive


## Bo Jackson — Auburn

**Position:** RB  
**Archetype:** Rare power-speed specimen  
**Best For:** big backs with elite speed, strength, and breakaway power  
**Attribute Signature:** Speed 18+, strength 18+, frame 18+, explosiveness 18+  
**Caution:** Requires elite physicals  
**Tags:** power_speed, specimen, breakaway


## Herschel Walker — Georgia

**Position:** RB  
**Archetype:** Workhorse power athlete  
**Best For:** physical workhorse backs with size, straight-line burst, and durability  
**Attribute Signature:** Power 18+, stamina/durability high, speed 15+, workload tolerance high  
**Caution:** Less for scat backs  
**Tags:** workhorse, power, durability


## Adrian Peterson — Oklahoma

**Position:** RB  
**Archetype:** Violent downhill home-run back  
**Best For:** upright power backs with speed and physicality  
**Attribute Signature:** Power 18+, speed 17+, contact balance high, injury risk possible  
**Caution:** Needs physical dominance  
**Tags:** power, speed, workhorse


## Reggie Bush — USC

**Position:** RB  
**Archetype:** Space weapon superstar  
**Best For:** backs with receiving value, open-field agility, and explosive multi-use ability  
**Attribute Signature:** Agility 18+, speed 18+, receiving 16+, vision high  
**Caution:** Not a between-tackles-only comp  
**Tags:** space_weapon, receiving_back, explosive


## Derrick Henry — Alabama

**Position:** RB  
**Archetype:** Giant volume hammer  
**Best For:** huge backs with power, stamina, and late-game punishment  
**Attribute Signature:** Frame 19+, power 19+, stamina 18+, speed 14+  
**Caution:** Requires size/workload  
**Tags:** power, workhorse, big_back


## Christian McCaffrey — Stanford

**Position:** RB  
**Archetype:** Complete all-purpose back  
**Best For:** backs with rushing, receiving, return, vision, and work rate  
**Attribute Signature:** Receiving 18+, vision high, agility high, work ethic high  
**Caution:** Use for versatile all-purpose backs  
**Tags:** all_purpose, receiving, returner


## Saquon Barkley — Penn State

**Position:** RB  
**Archetype:** Explosive power-elusive hybrid  
**Best For:** backs with elite burst, thighs/strength, receiving, and splash plays  
**Attribute Signature:** Explosiveness 19, power 16+, agility 17+, receiving 14+  
**Caution:** Needs rare athletic blend  
**Tags:** power_speed, explosive, receiving


## Bijan Robinson — Texas

**Position:** RB  
**Archetype:** Smooth three-down creator  
**Best For:** backs with vision, balance, receiving, and refined movement  
**Attribute Signature:** Vision 18+, balance 18+, receiving high, agility high  
**Caution:** Polished, not just raw speed  
**Tags:** three_down, vision, smooth


## Darren McFadden — Arkansas

**Position:** RB  
**Archetype:** Long-striding wildcat weapon  
**Best For:** tall explosive backs with speed, wildcat/QB gadget value  
**Attribute Signature:** Speed 18, explosiveness 18, frame tall, ball skills optional  
**Caution:** Use for explosive/gadget backs  
**Tags:** speed, gadget, wildcat


## Ricky Williams — Texas

**Position:** RB  
**Archetype:** Punishing volume star  
**Best For:** workhorse backs with production, strength, and relentless carries  
**Attribute Signature:** Stamina 19, power 17+, vision high, durability high  
**Caution:** Volume back comp  
**Tags:** workhorse, production, power


## Ron Dayne — Wisconsin

**Position:** RB  
**Archetype:** Massive downhill bell cow  
**Best For:** large volume backs in power systems  
**Attribute Signature:** Frame/power/stamina 18+, agility modest  
**Caution:** Power-run scheme comp  
**Tags:** big_back, power, volume


## LaDainian Tomlinson — TCU

**Position:** RB  
**Archetype:** Complete smaller-school superstar  
**Best For:** backs with production, receiving, vision, and all-around polish  
**Attribute Signature:** Vision high, receiving high, production high, size medium  
**Caution:** Good for G5/development backs  
**Tags:** complete, g5_star, receiving


## Marshall Faulk — San Diego State

**Position:** RB  
**Archetype:** Receiving-back superstar  
**Best For:** backs with elite receiving, vision, and open-space value  
**Attribute Signature:** Receiving 18+, vision 18+, agility high  
**Caution:** Not a pure power comp  
**Tags:** receiving, space, complete


## Jamaal Charles — Texas

**Position:** RB  
**Archetype:** Track-speed slasher  
**Best For:** fast slashing backs with explosive long-run ability  
**Attribute Signature:** Speed 19, acceleration 18, power lower, vision high  
**Caution:** Speed/slasher comp  
**Tags:** speed, slasher, explosive


## CJ Spiller — Clemson

**Position:** RB  
**Archetype:** Return-game speed back  
**Best For:** backs with return value and explosive acceleration  
**Attribute Signature:** Speed 18+, return ability high, receiving medium+  
**Caution:** Best for all-purpose speed backs  
**Tags:** returner, speed, all_purpose


## Maurice Jones-Drew — UCLA

**Position:** RB  
**Archetype:** Compact power-return back  
**Best For:** short powerful backs with balance, burst, and return value  
**Attribute Signature:** Balance 18+, power 16+, acceleration high, compact frame  
**Caution:** Use for compact dense backs  
**Tags:** compact, power, returner


## Nick Chubb — Georgia

**Position:** RB  
**Archetype:** Efficient power-zone runner  
**Best For:** backs with strength, balance, patience, and inside-zone fit  
**Attribute Signature:** Power/balance 17+, vision high, discipline high  
**Caution:** Less receiving/space focus  
**Tags:** power, zone, efficient


## Travis Etienne — Clemson

**Position:** RB  
**Archetype:** Explosive one-cut finisher  
**Best For:** backs with burst, long speed, and big-play finishing  
**Attribute Signature:** Acceleration 18+, speed 17+, vision 15+, contact balance medium+  
**Caution:** Explosive rather than pure power  
**Tags:** explosive, one_cut, speed


## Ezekiel Elliott — Ohio State

**Position:** RB  
**Archetype:** Three-down power protector  
**Best For:** backs with power, ball security, receiving, and pass protection  
**Attribute Signature:** Power 16+, pass protection 17+, vision high, stamina high  
**Caution:** Good complete back comp  
**Tags:** three_down, pass_protection, power


## Alvin Kamara — Tennessee

**Position:** RB  
**Archetype:** Smooth space mismatch  
**Best For:** backs with receiving, balance, smooth cuts, and role versatility  
**Attribute Signature:** Receiving high, balance high, agility high, workload medium  
**Caution:** Less volume power  
**Tags:** space, receiving, smooth


## Toby Gerhart — Stanford

**Position:** RB  
**Archetype:** Physical short-yardage workhorse  
**Best For:** strong downhill backs with stamina and short-yardage value  
**Attribute Signature:** Power/stamina high, speed average, receiving low-medium  
**Caution:** Power-only comp  
**Tags:** power, short_yardage, workhorse



# S Comps

## Ed Reed — Miami

**Position:** S  
**Archetype:** Ball-hawking centerfielder  
**Best For:** safeties with anticipation, range, and interception instincts  
**Attribute Signature:** Anticipation 20, ball skills 19, range high  
**Caution:** Elite safety IQ comp  
**Tags:** safety, ballhawk, iq


## Sean Taylor — Miami

**Position:** S  
**Archetype:** Rare-size enforcer/playmaker  
**Best For:** safeties with size, speed, range, and physicality  
**Attribute Signature:** Size 18, speed 17+, tackling 18, ball skills high  
**Caution:** Rare safety comp  
**Tags:** safety, physical, range


## Eric Berry — Tennessee

**Position:** S  
**Archetype:** Instinctive versatile safety  
**Best For:** safeties with range, tackling, leadership, and ball skills  
**Attribute Signature:** Range high, tackling high, leadership high, ball skills high  
**Caution:** Complete safety  
**Tags:** safety, versatile, leader


## Earl Thomas — Texas

**Position:** S  
**Archetype:** Range-heavy free safety  
**Best For:** safeties with speed, range, and coverage instincts  
**Attribute Signature:** Speed/range high, awareness high, size medium  
**Caution:** Centerfield comp  
**Tags:** safety, range, coverage


## Budda Baker — Washington

**Position:** S  
**Archetype:** Small explosive safety  
**Best For:** smaller safeties with speed, tackling, and range  
**Attribute Signature:** Speed high, tackling high, size small, motor high  
**Caution:** Compact safety  
**Tags:** safety, speed, motor


## Antoine Winfield Jr. — Minnesota

**Position:** S  
**Archetype:** Instinctive compact ballhawk  
**Best For:** smaller safeties with instincts, tackling, and ball skills  
**Attribute Signature:** Instincts high, ball skills high, tackling high, size small  
**Caution:** Compact instincts DB  
**Tags:** safety, instincts, ballhawk



# TE Comps

## Kyle Pitts — Florida

**Position:** TE  
**Archetype:** Jumbo receiver mismatch  
**Best For:** TEs with WR movement, catch radius, and vertical mismatch  
**Attribute Signature:** Receiving 19, speed 16+, route running high, blocking lower  
**Caution:** Receiving TE only  
**Tags:** receiving_te, mismatch, vertical


## Brock Bowers — Georgia

**Position:** TE  
**Archetype:** Complete movement TE  
**Best For:** TEs with YAC, blocking effort, hands, and versatility  
**Attribute Signature:** Receiving/YAC high, blocking medium+, agility high  
**Caution:** Versatile TE comp  
**Tags:** complete_te, yac, versatile


## Vernon Davis — Maryland

**Position:** TE  
**Archetype:** Workout-warrior vertical TE  
**Best For:** TEs with elite speed/strength measurables  
**Attribute Signature:** Speed 18, strength 18, frame high, receiving high  
**Caution:** Rare athletic TE  
**Tags:** athlete, vertical_te, tools


## Kellen Winslow II — Miami

**Position:** TE  
**Archetype:** Explosive receiving TE  
**Best For:** athletic receiving TEs with aggression and vertical value  
**Attribute Signature:** Speed/agility high, hands high, blocking medium  
**Caution:** Receiving/attitude comp  
**Tags:** receiving_te, explosive


## Jeremy Shockey — Miami

**Position:** TE  
**Archetype:** Physical seam weapon  
**Best For:** TEs with toughness, hands, and emotional edge  
**Attribute Signature:** Physicality high, receiving high, blocking medium+  
**Caution:** Use for aggressive TE  
**Tags:** physical, seam, attitude


## Tyler Eifert — Notre Dame

**Position:** TE  
**Archetype:** Red-zone receiving TE  
**Best For:** TEs with hands, body control, and red-zone value  
**Attribute Signature:** Hands/catch radius high, speed medium, blocking medium  
**Caution:** Red-zone TE comp  
**Tags:** red_zone, receiving_te


## Dallas Clark — Iowa

**Position:** TE  
**Archetype:** H-back receiving technician  
**Best For:** undersized/move TEs with hands and route craft  
**Attribute Signature:** Route/hands high, size medium, blocking medium  
**Caution:** Move TE comp  
**Tags:** move_te, route_runner


## Mark Andrews — Oklahoma

**Position:** TE  
**Archetype:** Big slot seam target  
**Best For:** TEs with size, route savvy, and red-zone/seam production  
**Attribute Signature:** Hands high, route high, seam value high  
**Caution:** Receiving TE  
**Tags:** seam, big_slot, receiving_te


## George Kittle — Iowa

**Position:** TE  
**Archetype:** Developmental blocking/YAC TE  
**Best For:** TEs who combine blocking, effort, toughness, and YAC  
**Attribute Signature:** Blocking 18, YAC high, work ethic high, receiving medium+  
**Caution:** Developmental complete TE  
**Tags:** blocking, yac, development



# WR Comps

## Randy Moss — Marshall

**Position:** WR  
**Archetype:** Long-speed vertical alien  
**Best For:** tall receivers with elite deep speed, catch radius, and vertical dominance  
**Attribute Signature:** Speed 19, height/catch radius 18+, deep threat 19  
**Caution:** Generational; use sparingly  
**Tags:** deep_threat, height_speed, g5_star


## Larry Fitzgerald — Pittsburgh

**Position:** WR  
**Archetype:** Contested-catch technician  
**Best For:** receivers with hands, body control, routes, and ball skills  
**Attribute Signature:** Hands 19, contested catch 19, route running 16+, speed medium  
**Caution:** Polished catch-point comp  
**Tags:** hands, contested, technician


## Calvin Johnson — Georgia Tech

**Position:** WR  
**Archetype:** Mega-frame vertical mismatch  
**Best For:** huge WRs with speed, strength, and catch radius  
**Attribute Signature:** Height/frame 20, speed 17+, catch radius 20  
**Caution:** Rare size/speed only  
**Tags:** megatron, height_speed, mismatch


## Julio Jones — Alabama

**Position:** WR  
**Archetype:** Physical explosive X receiver  
**Best For:** big physical WRs with speed, blocking, and contested ability  
**Attribute Signature:** Speed 17+, physicality 18, route running high, blocking high  
**Caution:** Needs physical profile  
**Tags:** x_receiver, physical, speed


## DeVonta Smith — Alabama

**Position:** WR  
**Archetype:** Slim route artist  
**Best For:** lean receivers with route running, hands, separation, and polish  
**Attribute Signature:** Route running 19, hands 18, separation high, frame slim  
**Caution:** Do not use for size/physical comps  
**Tags:** route_runner, separator, slim


## Ja'Marr Chase — LSU

**Position:** WR  
**Archetype:** Power separator  
**Best For:** WRs with physicality, YAC, contested catches, and strong routes  
**Attribute Signature:** Physicality 18, YAC high, hands high, route running high  
**Caution:** Needs play strength  
**Tags:** physical, yac, contested


## Justin Jefferson — LSU

**Position:** WR  
**Archetype:** Slot-to-X separator  
**Best For:** receivers with route craft, hands, football IQ, and versatility  
**Attribute Signature:** Route running 18, hands 17, awareness high, slot/X flex  
**Caution:** Polish comp  
**Tags:** route_runner, versatile, slot


## Amari Cooper — Alabama

**Position:** WR  
**Archetype:** Smooth route technician  
**Best For:** receivers with advanced routes, release, and separation  
**Attribute Signature:** Route/release 18+, hands 16+, speed 15+  
**Caution:** Route-first  
**Tags:** technician, release, separator


## Michael Crabtree — Texas Tech

**Position:** WR  
**Archetype:** Production monster possession star  
**Best For:** productive WRs with hands, body control, and red-zone value  
**Attribute Signature:** Hands/production/red zone high, speed medium  
**Caution:** System production comp  
**Tags:** production, possession, red_zone


## Dez Bryant — Oklahoma State

**Position:** WR  
**Archetype:** Explosive contested-catch alpha  
**Best For:** WRs with physicality, ball skills, and emotional edge  
**Attribute Signature:** Contested catch 18+, physicality high, speed high, discipline volatile  
**Caution:** High-alpha comp  
**Tags:** alpha, contested, explosive


## Mike Evans — Texas A&M

**Position:** WR  
**Archetype:** Big-body rebounder  
**Best For:** huge receivers with contested catch and red-zone dominance  
**Attribute Signature:** Height/catch radius 19, contested 18, speed medium+  
**Caution:** Big-body only  
**Tags:** big_body, red_zone, contested


## Tavon Austin — West Virginia

**Position:** WR  
**Archetype:** Slot gadget blur  
**Best For:** small speed players with return/gadget/YAC value  
**Attribute Signature:** Speed/agility 19, YAC high, size small, route medium  
**Caution:** Use for slot/gadget weapons  
**Tags:** slot, gadget, returner


## Percy Harvin — Florida

**Position:** WR  
**Archetype:** Hybrid motion weapon  
**Best For:** WR/RB hybrids with speed, motion, option, and gadget value  
**Attribute Signature:** Speed 18+, agility 18, rushing/receiving both useful  
**Caution:** Hybrid comp  
**Tags:** hybrid, motion, gadget


## Peter Warrick — Florida State

**Position:** WR  
**Archetype:** Open-field magician  
**Best For:** WRs with agility, body control, and creative YAC  
**Attribute Signature:** Agility 18+, YAC 18+, hands high, speed high  
**Caution:** Elusive WR comp  
**Tags:** yac, agility, creator


## Marquise Brown — Oklahoma

**Position:** WR  
**Archetype:** Tiny vertical burner  
**Best For:** small WRs with elite speed and deep threat ability  
**Attribute Signature:** Speed 19, acceleration 19, frame small, route medium+  
**Caution:** Small deep-speed comp  
**Tags:** deep_threat, speed, small


## CeeDee Lamb — Oklahoma

**Position:** WR  
**Archetype:** YAC ball-winner  
**Best For:** WRs with hands, YAC, body control, and competitive catch skills  
**Attribute Signature:** Hands 18, YAC 18, contested high, speed medium+  
**Caution:** Physical/YAC comp  
**Tags:** yac, hands, competitive


## Garrett Wilson — Ohio State

**Position:** WR  
**Archetype:** Fluid separator  
**Best For:** receivers with body control, agility, and separation  
**Attribute Signature:** Agility/body control high, route running high, hands high  
**Caution:** Smooth movement comp  
**Tags:** separator, fluid, route_runner


## Marvin Harrison Jr. — Ohio State

**Position:** WR  
**Archetype:** Polished prototype X  
**Best For:** tall refined WRs with route running, hands, and catch radius  
**Attribute Signature:** Height 17+, route running 18, hands 18, catch radius high  
**Caution:** Polished, not raw  
**Tags:** prototype, x_receiver, polished


## Cooper Kupp — Eastern Washington

**Position:** WR  
**Archetype:** Small-school route savant  
**Best For:** WRs with elite route craft, hands, IQ, and production  
**Attribute Signature:** Route/IQ/hands high, speed medium, small-school production  
**Caution:** Use for G5/FCS technical WRs  
**Tags:** route_runner, small_school, iq


## Jameson Williams — Alabama

**Position:** WR  
**Archetype:** Long-speed field stretcher  
**Best For:** WRs with elite vertical speed and explosive separation  
**Attribute Signature:** Speed 19, deep threat 18, route medium+  
**Caution:** Deep speed comp  
**Tags:** speed, deep_threat, explosive


## Drake London — USC

**Position:** WR  
**Archetype:** Basketball-boxout possession X  
**Best For:** big WRs with contested catch, body control, and possession volume  
**Attribute Signature:** Height/catch radius high, contested 18, speed modest  
**Caution:** Big possession comp  
**Tags:** big_body, possession, contested



<!-- FILE: 71_PLAYER_COMPS_FEATURE_IMPLEMENTATION_SPEC.md -->

# 71 — Player Comps Feature Implementation Spec

## North Star

The player comp feature should make recruits and players easier to understand without flattening them into one overall rating.

This should feel like NBA 2K-style draft comps, but adapted for college football.

The feature should help the user answer:

```text
What kind of player is this?
What is the upside?
What are the risks?
What scheme might unlock him?
Who from college football history does his profile resemble?
```

## What A Comp Is

A comp is a **similarity label** generated from structured traits and attributes.

It is not prophecy.

## Comp Types

```ts
type PlayerCompType =
  | "style"
  | "ceiling"
  | "floor"
  | "scheme"
  | "draft"
  | "developmental";
```

## Style Comp

Closest current play-style match.

Example:

```text
Style Comp: Tavon Austin-type slot gadget weapon
```

## Ceiling Comp

Best-case outcome if development hits.

Example:

```text
Ceiling Comp: Lamar Jackson-type spread creator
```

## Floor Comp

If weaknesses persist.

Example:

```text
Floor Comp: ATH/QB tweener with position-change risk
```

## Scheme Comp

Best fit.

Example:

```text
Scheme Comp: Pat White-style spread-option trigger
```

## Draft Comp

Future optional layer tied to NFL projection.

## PlayerCompProfile

```ts
type PlayerCompProfile = {
  id: string;
  name: string;
  school: string;
  primaryPosition: Position;
  archetype: string;
  compType: PlayerCompType;
  tags: string[];
  signatureVector: Partial<Record<AttributeId, number>>;
  traitRequirements?: string[];
  bodyRequirements?: BodyRequirement;
  hardGates?: CompGate[];
  bestFor: string;
  caution: string;
  safeDisplayRule: string;
};
```

## CandidateCompResult

```ts
type CandidateCompResult = {
  compId: string;
  compName: string;
  compType: PlayerCompType;
  score: number;
  confidence: number;
  label: string;
  similarities: ReasonCode[];
  differences: ReasonCode[];
  caution: string;
  displayText: string;
};
```

## How To Calculate A Comp

## Step 1 — Position Gate

Only compare against relevant positions.

Examples:

```text
QB can match QB or ATH/QB comps.
RB can match RB or WR/RB hybrid comps.
CB can match CB/S hybrid comps.
```

## Step 2 — Archetype / Tag Gate

Compare trait tags:

```text
dual_threat
speed
processor
power
route_runner
press
edge
space_weapon
```

## Step 3 — Body Gate

Use height/weight/frame where relevant.

Examples:

```text
Derrick Henry comp requires huge back frame.
DeVonta Smith comp allows slim frame.
Calvin Johnson comp requires massive WR frame.
```

## Step 4 — Attribute Similarity

Compute weighted distance between player attributes and comp signature.

Example:

```text
similarity = 1 - weightedNormalizedDistance(playerVector, compVector)
```

Use position-specific weights.

## Step 5 — Trait Match

Add modifiers for:

- hidden traits
- development curve
- work ethic
- coachability
- big-game nerve
- money preference, if relevant only to narrative
- consistency
- injury/durability

## Step 6 — Confidence

For recruits, confidence depends on scouting.

```text
confidence =
  scoutingConfidence
* attributeVisibility
* positionProjectionConfidence
* staffEvaluationSkill
```

Current players can have higher confidence.

## Step 7 — Similarities and Differences

Every comp result must show:

```text
Why this comp fits
Where it does not fit
Confidence level
```

Example:

```text
Similarities:
- Elite speed and agility
- Open-field creation
- Big-play rushing value

Differences:
- Accuracy is lower than the comp
- Awareness is still raw
- Staff has limited live evaluation
```

## Scouted Range Handling

For recruits, do not use true hidden ratings.

Use scouted ranges.

Options:

```text
conservative: use low end
optimistic: use high end
staff_mean: use weighted midpoint
```

Recommended:

```text
use staff_mean for style comp
use optimistic projection for ceiling comp
use conservative projection for floor comp
```

## Comp Display Labels

Examples:

```text
Michael Vick-style tools comp
Raw Lamar Jackson-type spread creator
Barry Sanders-type open-field mover
DeVonta Smith-style route technician
Ndamukong Suh-style interior disruptor
Ed Reed-type centerfield ballhawk
```

Add modifiers:

```text
raw
lite
poor man's
developmental
high-variance
scheme-specific
ceiling
floor
```

Use carefully.

## Do Not Over-Comp

Not every player deserves a famous comp.

If similarity is low:

```text
No strong comp
```

or:

```text
Closest profile: developmental zone-run back
```

Minimum thresholds:

```text
style comp score >= 0.62
ceiling comp score >= 0.55 but requires upside/potential
confidence >= 0.35 for recruits
```

If below:

```text
Insufficient scouting confidence
```

## Michael Vick Example

If prospect has:

```text
speed >= 18
agility >= 18
acceleration >= 18
scramble instinct >= 16
throw power >= 15
accuracy <= 11
awareness <= 10
```

Then show:

```text
Style Comp: Raw Michael Vick-type dual-threat athlete

Similarities:
- rare speed/agility for the position
- dangerous open-field rushing profile
- enough arm strength to threaten vertically

Differences:
- current accuracy is much less developed
- awareness/processing remain raw
- comp is a tools/style comparison, not a projection

Confidence:
based on scouting confidence
```

If accuracy and awareness are also high:

```text
Ceiling Comp: Michael Vick-style explosive dual-threat QB
```

## UI Placement

Show comps in:

- Prospect Profile
- Recruiting Board right inspector
- Player Profile
- Draft Projection
- Staff Scouting Report
- Player Development Report
- Transfer Portal profile

## Prospect Profile Comp Panel

Fields:

```text
Top Style Comp
Ceiling Comp
Floor/Warning Comp
Scheme Fit Comp
Confidence
Why it fits
Where it does not
Staff source
```

## Recruiting Board Column

Add optional columns:

```text
Top Comp
Comp Confidence
Comp Type
```

## Staff Report Language

Example:

```text
"Our staff sees a Raw Michael Vick-type tools profile: elite speed, twitch, and open-field danger at quarterback. The concern is that his accuracy and awareness are far behind the athletic profile."
```

## LLM Rules

LLM may write comp prose.

LLM may not choose the comp.

The engine chooses the comp from structured data.

## Data Files

Add:

```text
game_data/comps/college_player_comps_library.json
```

## Tests

Required:

- elite speed raw QB returns Michael Vick-style tools comp
- polished pocket QB does not return Michael Vick
- huge power back can return Derrick Henry/Bo Jackson style
- slim route WR can return DeVonta Smith
- low scouting confidence lowers comp confidence
- no comp returned below threshold
- differences are generated for mismatched traits
- comp uses scouted values for recruits, not hidden truth

## Acceptance Criteria

The feature is acceptable when:

- comps are generated from structured data
- comp confidence exists
- similarities/differences are shown
- famous comps are not overused
- recruits use scouted ranges
- staff reports can mention comps safely
- UI makes clear this is style/projection, not destiny


<!-- FILE: 72_PLAYER_COMP_ENGINE_CODE_SKETCH.md -->

# 72 — Player Comp Engine Code Sketch

## Purpose

This is a code-level sketch for the AI coder.

## Suggested Files

```text
src/domain/comps/playerCompTypes.ts
src/data/comps/collegePlayerCompsRepository.ts
src/sim/comps/playerCompEngine.ts
src/sim/comps/playerCompReasonCodes.ts
src/ui/components/PlayerCompPanel.tsx
src/ui/components/CompBadge.tsx
game_data/comps/college_player_comps_library.json
```

## Types

```ts
export type PlayerCompType =
  | "style"
  | "ceiling"
  | "floor"
  | "scheme"
  | "draft"
  | "developmental";

export type PlayerCompProfile = {
  id: string;
  name: string;
  school: string;
  primaryPosition: Position;
  archetype: string;
  compType: PlayerCompType;
  tags: string[];
  signatureVector: Partial<Record<AttributeId, number>>;
  traitRequirements?: string[];
  bestFor: string;
  caution: string;
  safeDisplayRule: string;
};

export type CandidateCompResult = {
  compId: string;
  compName: string;
  compType: PlayerCompType;
  score: number;
  confidence: number;
  label: string;
  similarities: ReasonCode[];
  differences: ReasonCode[];
  caution: string;
  displayText: string;
};
```

## Algorithm Sketch

```ts
export function findPlayerComps(input: {
  player: Player | Prospect;
  visibleAttributes: Partial<Record<AttributeId, number>>;
  position: Position;
  tags: string[];
  scoutingConfidence: number;
  compProfiles: PlayerCompProfile[];
  mode: "current_player" | "recruit";
}): CandidateCompResult[] {
  const candidates = compProfiles
    .filter(comp => positionGate(input.position, comp.primaryPosition))
    .map(comp => scoreComp(input, comp))
    .filter(result => result.score >= 0.55)
    .sort((a, b) => b.score - a.score);

  return dedupeByCompFamily(candidates).slice(0, 5);
}
```

## Weighted Distance

```ts
function weightedSimilarity(
  playerVector: Partial<Record<AttributeId, number>>,
  compVector: Partial<Record<AttributeId, number>>,
  weights: Partial<Record<AttributeId, number>>
): number {
  let totalWeight = 0;
  let totalDistance = 0;

  for (const attr of Object.keys(compVector) as AttributeId[]) {
    const playerValue = playerVector[attr];
    const compValue = compVector[attr];
    if (playerValue == null || compValue == null) continue;

    const weight = weights[attr] ?? 1;
    const distance = Math.abs(playerValue - compValue) / 19;

    totalDistance += distance * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) return 0;

  return Math.max(0, 1 - totalDistance / totalWeight);
}
```

## Michael Vick Special Rule Example

```ts
function rawVickToolsRule(attrs: AttributeMap): boolean {
  return (
    attrs.speed >= 18 &&
    attrs.acceleration >= 18 &&
    attrs.agility >= 18 &&
    attrs.scrambleInstinct >= 16 &&
    attrs.throwPower >= 15 &&
    attrs.shortAccuracy <= 11 &&
    attrs.processing <= 10
  );
}
```

Do not rely only on special rules. They are supplemental.

## Confidence

```ts
function compConfidence(input: {
  mode: "current_player" | "recruit";
  scoutingConfidence: number;
  positionProjectionConfidence: number;
  attributeCoverage: number;
  staffEvaluationSkill: number;
}): number {
  if (input.mode === "current_player") {
    return clamp01(0.75 * input.attributeCoverage + 0.25 * input.positionProjectionConfidence);
  }

  return clamp01(
    input.scoutingConfidence *
    input.positionProjectionConfidence *
    (0.6 + input.staffEvaluationSkill * 0.4) *
    input.attributeCoverage
  );
}
```

## Display Text Builder

```ts
function buildCompDisplay(result: CandidateCompResult): string {
  return `${result.label}. Similarities: ${result.similarities
    .slice(0, 3)
    .map(r => r.label)
    .join(", ")}. Concerns: ${result.differences
    .slice(0, 2)
    .map(r => r.label)
    .join(", ")}.`;
}
```

## UI Component

```tsx
function PlayerCompPanel({ comps }: { comps: CandidateCompResult[] }) {
  if (!comps.length) {
    return <EmptyState title="No strong comp yet" body="Scout more or wait for additional evaluation." />;
  }

  return (
    <section className="comp-panel">
      <h3>Player Comps</h3>
      {comps.map(comp => (
        <article key={comp.compId} className="comp-card">
          <div className="comp-title">{comp.label}</div>
          <div className="comp-score">Similarity {(comp.score * 100).toFixed(0)}%</div>
          <div className="comp-confidence">Confidence {(comp.confidence * 100).toFixed(0)}%</div>
          <ul>
            {comp.similarities.slice(0, 3).map(r => <li key={r.code}>{r.label}</li>)}
          </ul>
          <p className="comp-caution">{comp.caution}</p>
        </article>
      ))}
    </section>
  );
}
```

## Tests

```text
raw elite-speed QB -> Michael Vick style tools comp
polished pocket QB -> Peyton/Andrew/Joe style comps, not Vick
slim route WR -> DeVonta Smith/Amari Cooper
huge power RB -> Derrick Henry/Herschel/Bo
low scouting confidence -> comp confidence low
no similar profile -> no strong comp
```


<!-- FILE: 73_READY_TO_PASTE_PLAYER_COMPS_IMPLEMENTATION_PROMPT.md -->

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


<!-- FILE: college_player_comps_library.json -->

[
  {
    "id": "comp_michael_vick_001",
    "name": "Michael Vick",
    "school": "Virginia Tech",
    "primary_position": "QB",
    "archetype": "Explosive dual-threat tools monster",
    "best_for": "elite-speed mobile QBs with rare burst, open-field creativity, and big-arm flashes",
    "attribute_signature": "Speed/acceleration/agility 18+, throw power 16+, scramble instinct high, accuracy/processing can be volatile",
    "caution": "Use as a style/tools comp, not a polished passing comp unless accuracy and awareness are also strong",
    "tags": [
      "dual_threat",
      "elite_speed",
      "raw_tools",
      "big_arm",
      "scrambler"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_lamar_jackson_002",
    "name": "Lamar Jackson",
    "school": "Louisville",
    "primary_position": "QB",
    "archetype": "Game-breaking spread creator",
    "best_for": "mobile QBs who are offense-warping runners with improving passer traits",
    "attribute_signature": "Speed/agility 18+, acceleration 18+, vision high, creativity high, deep accuracy/tooling medium+",
    "caution": "Requires much better football IQ and production than a generic fast QB",
    "tags": [
      "dual_threat",
      "heisman",
      "creator",
      "speed"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_cam_newton_003",
    "name": "Cam Newton",
    "school": "Auburn",
    "primary_position": "QB",
    "archetype": "Power dual-threat alpha",
    "best_for": "big QBs with power-run value, leadership, and vertical passing threat",
    "attribute_signature": "Size/frame 17+, power 17+, leadership 16+, throw power 15+, pressure high",
    "caution": "Do not use for small speed-only QBs",
    "tags": [
      "power_qb",
      "leader",
      "championship",
      "dual_threat"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_tim_tebow_004",
    "name": "Tim Tebow",
    "school": "Florida",
    "primary_position": "QB",
    "archetype": "Culture-power option leader",
    "best_for": "physical QBs with leadership, toughness, and red-zone power but passing questions",
    "attribute_signature": "Leadership/work ethic/competitiveness 18+, power 16+, accuracy modest, processing role-dependent",
    "caution": "Use when intangibles and power matter more than passing polish",
    "tags": [
      "leader",
      "option",
      "power_qb",
      "culture"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_vince_young_005",
    "name": "Vince Young",
    "school": "Texas",
    "primary_position": "QB",
    "archetype": "Big-game dual-threat passer-runner",
    "best_for": "tall, fluid QBs with open-field running and clutch big-game traits",
    "attribute_signature": "Size 15+, speed 15+, composure/big-game nerve 18+, creativity high",
    "caution": "Needs clutch/poise to fit",
    "tags": [
      "dual_threat",
      "clutch",
      "big_game"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_johnny_manziel_006",
    "name": "Johnny Manziel",
    "school": "Texas A&M",
    "primary_position": "QB",
    "archetype": "Chaotic improvising creator",
    "best_for": "undersized improvisers who extend plays and thrive in chaos",
    "attribute_signature": "Creativity 18+, agility 17+, pressure creativity high, discipline/structure lower",
    "caution": "High volatility; use for backyard creators",
    "tags": [
      "improviser",
      "chaos",
      "undersized_qb"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_kyler_murray_007",
    "name": "Kyler Murray",
    "school": "Oklahoma",
    "primary_position": "QB",
    "archetype": "Compact elite athlete passer",
    "best_for": "shorter QBs with elite speed, twitch, and passing accuracy",
    "attribute_signature": "Speed/agility 18+, short/medium accuracy 16+, processing 14+, size smaller",
    "caution": "Should not be used for inaccurate speed-only QBs",
    "tags": [
      "dual_threat",
      "compact",
      "accurate",
      "speed"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_baker_mayfield_008",
    "name": "Baker Mayfield",
    "school": "Oklahoma",
    "primary_position": "QB",
    "archetype": "Fiery pocket-spread distributor",
    "best_for": "competitive rhythm passers with swagger, accuracy, and leadership",
    "attribute_signature": "Competitiveness 18+, accuracy 16+, leadership high, size average",
    "caution": "More attitude/accuracy than raw physical tools",
    "tags": [
      "leader",
      "accuracy",
      "spread_qb"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_joe_burrow_009",
    "name": "Joe Burrow",
    "school": "LSU",
    "primary_position": "QB",
    "archetype": "Elite processor with late explosion",
    "best_for": "late-blooming QBs with accuracy, poise, and sudden senior-year leap",
    "attribute_signature": "Processing 18+, accuracy 18+, composure 18+, development curve late",
    "caution": "Use for polished passers, not raw athletes",
    "tags": [
      "processor",
      "late_bloomer",
      "accuracy"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_trevor_lawrence_010",
    "name": "Trevor Lawrence",
    "school": "Clemson",
    "primary_position": "QB",
    "archetype": "Prototype five-star field general",
    "best_for": "big, polished, high-pedigree QBs with arm talent and poise",
    "attribute_signature": "Size 17+, throw power 16+, accuracy 16+, composure high",
    "caution": "Needs high floor and high ceiling",
    "tags": [
      "prototype",
      "five_star",
      "field_general"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_andrew_luck_011",
    "name": "Andrew Luck",
    "school": "Stanford",
    "primary_position": "QB",
    "archetype": "Pro-style intellectual prototype",
    "best_for": "big, smart QBs with processing, accuracy, and athletic enough movement",
    "attribute_signature": "Processing 18+, awareness 18+, accuracy 16+, size 17+, work ethic high",
    "caution": "Best for cerebral QB comps",
    "tags": [
      "processor",
      "pro_style",
      "academic"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_peyton_manning_012",
    "name": "Peyton Manning",
    "school": "Tennessee",
    "primary_position": "QB",
    "archetype": "Classic pocket professor",
    "best_for": "pocket QBs with elite awareness, preparation, accuracy, and leadership",
    "attribute_signature": "Processing/awareness/film study 19+, accuracy high, mobility low/medium",
    "caution": "Do not use for rushing creators",
    "tags": [
      "pocket",
      "processor",
      "leader"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_marcus_mariota_013",
    "name": "Marcus Mariota",
    "school": "Oregon",
    "primary_position": "QB",
    "archetype": "Clean-tempo dual-threat operator",
    "best_for": "spread-tempo QBs with athleticism, poise, and clean decision-making",
    "attribute_signature": "Speed 15+, processing 16+, discipline 16+, accuracy 15+",
    "caution": "Less chaotic than pure improvisers",
    "tags": [
      "tempo",
      "dual_threat",
      "clean_operator"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_robert_griffin_iii_014",
    "name": "Robert Griffin III",
    "school": "Baylor",
    "primary_position": "QB",
    "archetype": "Track-speed vertical spread QB",
    "best_for": "elite speed QBs with deep-ball upside and explosive spread production",
    "attribute_signature": "Speed 19, deep accuracy 16+, throw power high, injury risk can vary",
    "caution": "Needs deep passing trait, not just speed",
    "tags": [
      "speed",
      "deep_ball",
      "spread"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_kellen_moore_015",
    "name": "Kellen Moore",
    "school": "Boise State",
    "primary_position": "QB",
    "archetype": "Undersized timing savant",
    "best_for": "limited-tool QBs with elite timing, processing, and system mastery",
    "attribute_signature": "Processing 18+, accuracy 16+, size/tooling low-medium",
    "caution": "Use for high IQ/low measurables",
    "tags": [
      "processor",
      "undersized",
      "timing"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_colt_mccoy_016",
    "name": "Colt McCoy",
    "school": "Texas",
    "primary_position": "QB",
    "archetype": "Efficient spread rhythm leader",
    "best_for": "accurate, productive QBs with mobility and leadership but not elite tools",
    "attribute_signature": "Accuracy 16+, leadership 15+, mobility 12-15, processing high",
    "caution": "Good high-floor comp",
    "tags": [
      "accuracy",
      "rhythm",
      "leader"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_sam_bradford_017",
    "name": "Sam Bradford",
    "school": "Oklahoma",
    "primary_position": "QB",
    "archetype": "Smooth spread pocket passer",
    "best_for": "accurate, calm passers in spread systems",
    "attribute_signature": "Accuracy high, timing high, pocket presence high, mobility modest",
    "caution": "Use for passing polish",
    "tags": [
      "accuracy",
      "spread",
      "pocket"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_tua_tagovailoa_018",
    "name": "Tua Tagovailoa",
    "school": "Alabama",
    "primary_position": "QB",
    "archetype": "Quick-trigger lefty distributor",
    "best_for": "quick-processing, accurate passers with touch and timing",
    "attribute_signature": "Short/medium accuracy 18+, timing 18+, processing high, durability watch optional",
    "caution": "Use for compact timing passers",
    "tags": [
      "accuracy",
      "quick_trigger",
      "touch"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_bryce_young_019",
    "name": "Bryce Young",
    "school": "Alabama",
    "primary_position": "QB",
    "archetype": "Poised undersized creator",
    "best_for": "smaller QBs with elite poise, processing, and pocket creativity",
    "attribute_signature": "Composure 18+, processing 17+, creativity high, size low",
    "caution": "Not for pure speed runners",
    "tags": [
      "poise",
      "processor",
      "undersized"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_jalen_hurts_020",
    "name": "Jalen Hurts",
    "school": "Alabama/Oklahoma",
    "primary_position": "QB",
    "archetype": "Developmental power-leader QB",
    "best_for": "QBs with leadership, strength, work ethic, and improving passing arc",
    "attribute_signature": "Leadership/work ethic 18+, power 15+, development improvement, accuracy rising",
    "caution": "Best for players with growth trajectory",
    "tags": [
      "leader",
      "development",
      "power_qb"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_pat_white_021",
    "name": "Pat White",
    "school": "West Virginia",
    "primary_position": "QB",
    "archetype": "Spread-option speed trigger",
    "best_for": "option/spread QBs with speed, toughness, and system fit",
    "attribute_signature": "Speed 17+, option decision high, toughness high, passing modest",
    "caution": "Best for option systems",
    "tags": [
      "option",
      "speed",
      "system_qb"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_denard_robinson_022",
    "name": "Denard Robinson",
    "school": "Michigan",
    "primary_position": "QB",
    "archetype": "Pure-speed offensive weapon",
    "best_for": "electric athletes playing QB with position-change/ATH potential",
    "attribute_signature": "Speed 19+, agility 18+, throw accuracy low-medium, awareness volatile",
    "caution": "Use for athlete/QB tweener comps",
    "tags": [
      "athlete",
      "speed",
      "position_projection"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_eric_crouch_023",
    "name": "Eric Crouch",
    "school": "Nebraska",
    "primary_position": "QB",
    "archetype": "Option gamer",
    "best_for": "tough option QBs with competitiveness, rushing value, and limited passing",
    "attribute_signature": "Competitiveness high, option IQ high, speed/agility high, passing low-medium",
    "caution": "Option-only style",
    "tags": [
      "option",
      "gamer",
      "run_first"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_barry_sanders_024",
    "name": "Barry Sanders",
    "school": "Oklahoma State",
    "primary_position": "RB",
    "archetype": "Impossible-cut explosive back",
    "best_for": "compact backs with elite agility, burst, balance, and open-field creativity",
    "attribute_signature": "Agility/change of direction/balance 19+, vision 18+, size compact",
    "caution": "Generational comp; use sparingly and with high confidence",
    "tags": [
      "elusive",
      "vision",
      "explosive"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_bo_jackson_025",
    "name": "Bo Jackson",
    "school": "Auburn",
    "primary_position": "RB",
    "archetype": "Rare power-speed specimen",
    "best_for": "big backs with elite speed, strength, and breakaway power",
    "attribute_signature": "Speed 18+, strength 18+, frame 18+, explosiveness 18+",
    "caution": "Requires elite physicals",
    "tags": [
      "power_speed",
      "specimen",
      "breakaway"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_herschel_walker_026",
    "name": "Herschel Walker",
    "school": "Georgia",
    "primary_position": "RB",
    "archetype": "Workhorse power athlete",
    "best_for": "physical workhorse backs with size, straight-line burst, and durability",
    "attribute_signature": "Power 18+, stamina/durability high, speed 15+, workload tolerance high",
    "caution": "Less for scat backs",
    "tags": [
      "workhorse",
      "power",
      "durability"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_adrian_peterson_027",
    "name": "Adrian Peterson",
    "school": "Oklahoma",
    "primary_position": "RB",
    "archetype": "Violent downhill home-run back",
    "best_for": "upright power backs with speed and physicality",
    "attribute_signature": "Power 18+, speed 17+, contact balance high, injury risk possible",
    "caution": "Needs physical dominance",
    "tags": [
      "power",
      "speed",
      "workhorse"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_reggie_bush_028",
    "name": "Reggie Bush",
    "school": "USC",
    "primary_position": "RB",
    "archetype": "Space weapon superstar",
    "best_for": "backs with receiving value, open-field agility, and explosive multi-use ability",
    "attribute_signature": "Agility 18+, speed 18+, receiving 16+, vision high",
    "caution": "Not a between-tackles-only comp",
    "tags": [
      "space_weapon",
      "receiving_back",
      "explosive"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_derrick_henry_029",
    "name": "Derrick Henry",
    "school": "Alabama",
    "primary_position": "RB",
    "archetype": "Giant volume hammer",
    "best_for": "huge backs with power, stamina, and late-game punishment",
    "attribute_signature": "Frame 19+, power 19+, stamina 18+, speed 14+",
    "caution": "Requires size/workload",
    "tags": [
      "power",
      "workhorse",
      "big_back"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_christian_mccaffrey_030",
    "name": "Christian McCaffrey",
    "school": "Stanford",
    "primary_position": "RB",
    "archetype": "Complete all-purpose back",
    "best_for": "backs with rushing, receiving, return, vision, and work rate",
    "attribute_signature": "Receiving 18+, vision high, agility high, work ethic high",
    "caution": "Use for versatile all-purpose backs",
    "tags": [
      "all_purpose",
      "receiving",
      "returner"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_saquon_barkley_031",
    "name": "Saquon Barkley",
    "school": "Penn State",
    "primary_position": "RB",
    "archetype": "Explosive power-elusive hybrid",
    "best_for": "backs with elite burst, thighs/strength, receiving, and splash plays",
    "attribute_signature": "Explosiveness 19, power 16+, agility 17+, receiving 14+",
    "caution": "Needs rare athletic blend",
    "tags": [
      "power_speed",
      "explosive",
      "receiving"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_bijan_robinson_032",
    "name": "Bijan Robinson",
    "school": "Texas",
    "primary_position": "RB",
    "archetype": "Smooth three-down creator",
    "best_for": "backs with vision, balance, receiving, and refined movement",
    "attribute_signature": "Vision 18+, balance 18+, receiving high, agility high",
    "caution": "Polished, not just raw speed",
    "tags": [
      "three_down",
      "vision",
      "smooth"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_darren_mcfadden_033",
    "name": "Darren McFadden",
    "school": "Arkansas",
    "primary_position": "RB",
    "archetype": "Long-striding wildcat weapon",
    "best_for": "tall explosive backs with speed, wildcat/QB gadget value",
    "attribute_signature": "Speed 18, explosiveness 18, frame tall, ball skills optional",
    "caution": "Use for explosive/gadget backs",
    "tags": [
      "speed",
      "gadget",
      "wildcat"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_ricky_williams_034",
    "name": "Ricky Williams",
    "school": "Texas",
    "primary_position": "RB",
    "archetype": "Punishing volume star",
    "best_for": "workhorse backs with production, strength, and relentless carries",
    "attribute_signature": "Stamina 19, power 17+, vision high, durability high",
    "caution": "Volume back comp",
    "tags": [
      "workhorse",
      "production",
      "power"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_ron_dayne_035",
    "name": "Ron Dayne",
    "school": "Wisconsin",
    "primary_position": "RB",
    "archetype": "Massive downhill bell cow",
    "best_for": "large volume backs in power systems",
    "attribute_signature": "Frame/power/stamina 18+, agility modest",
    "caution": "Power-run scheme comp",
    "tags": [
      "big_back",
      "power",
      "volume"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_ladainian_tomlinson_036",
    "name": "LaDainian Tomlinson",
    "school": "TCU",
    "primary_position": "RB",
    "archetype": "Complete smaller-school superstar",
    "best_for": "backs with production, receiving, vision, and all-around polish",
    "attribute_signature": "Vision high, receiving high, production high, size medium",
    "caution": "Good for G5/development backs",
    "tags": [
      "complete",
      "g5_star",
      "receiving"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_marshall_faulk_037",
    "name": "Marshall Faulk",
    "school": "San Diego State",
    "primary_position": "RB",
    "archetype": "Receiving-back superstar",
    "best_for": "backs with elite receiving, vision, and open-space value",
    "attribute_signature": "Receiving 18+, vision 18+, agility high",
    "caution": "Not a pure power comp",
    "tags": [
      "receiving",
      "space",
      "complete"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_jamaal_charles_038",
    "name": "Jamaal Charles",
    "school": "Texas",
    "primary_position": "RB",
    "archetype": "Track-speed slasher",
    "best_for": "fast slashing backs with explosive long-run ability",
    "attribute_signature": "Speed 19, acceleration 18, power lower, vision high",
    "caution": "Speed/slasher comp",
    "tags": [
      "speed",
      "slasher",
      "explosive"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_cj_spiller_039",
    "name": "CJ Spiller",
    "school": "Clemson",
    "primary_position": "RB",
    "archetype": "Return-game speed back",
    "best_for": "backs with return value and explosive acceleration",
    "attribute_signature": "Speed 18+, return ability high, receiving medium+",
    "caution": "Best for all-purpose speed backs",
    "tags": [
      "returner",
      "speed",
      "all_purpose"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_maurice_jones_drew_040",
    "name": "Maurice Jones-Drew",
    "school": "UCLA",
    "primary_position": "RB",
    "archetype": "Compact power-return back",
    "best_for": "short powerful backs with balance, burst, and return value",
    "attribute_signature": "Balance 18+, power 16+, acceleration high, compact frame",
    "caution": "Use for compact dense backs",
    "tags": [
      "compact",
      "power",
      "returner"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_nick_chubb_041",
    "name": "Nick Chubb",
    "school": "Georgia",
    "primary_position": "RB",
    "archetype": "Efficient power-zone runner",
    "best_for": "backs with strength, balance, patience, and inside-zone fit",
    "attribute_signature": "Power/balance 17+, vision high, discipline high",
    "caution": "Less receiving/space focus",
    "tags": [
      "power",
      "zone",
      "efficient"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_travis_etienne_042",
    "name": "Travis Etienne",
    "school": "Clemson",
    "primary_position": "RB",
    "archetype": "Explosive one-cut finisher",
    "best_for": "backs with burst, long speed, and big-play finishing",
    "attribute_signature": "Acceleration 18+, speed 17+, vision 15+, contact balance medium+",
    "caution": "Explosive rather than pure power",
    "tags": [
      "explosive",
      "one_cut",
      "speed"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_ezekiel_elliott_043",
    "name": "Ezekiel Elliott",
    "school": "Ohio State",
    "primary_position": "RB",
    "archetype": "Three-down power protector",
    "best_for": "backs with power, ball security, receiving, and pass protection",
    "attribute_signature": "Power 16+, pass protection 17+, vision high, stamina high",
    "caution": "Good complete back comp",
    "tags": [
      "three_down",
      "pass_protection",
      "power"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_alvin_kamara_044",
    "name": "Alvin Kamara",
    "school": "Tennessee",
    "primary_position": "RB",
    "archetype": "Smooth space mismatch",
    "best_for": "backs with receiving, balance, smooth cuts, and role versatility",
    "attribute_signature": "Receiving high, balance high, agility high, workload medium",
    "caution": "Less volume power",
    "tags": [
      "space",
      "receiving",
      "smooth"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_toby_gerhart_045",
    "name": "Toby Gerhart",
    "school": "Stanford",
    "primary_position": "RB",
    "archetype": "Physical short-yardage workhorse",
    "best_for": "strong downhill backs with stamina and short-yardage value",
    "attribute_signature": "Power/stamina high, speed average, receiving low-medium",
    "caution": "Power-only comp",
    "tags": [
      "power",
      "short_yardage",
      "workhorse"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_randy_moss_046",
    "name": "Randy Moss",
    "school": "Marshall",
    "primary_position": "WR",
    "archetype": "Long-speed vertical alien",
    "best_for": "tall receivers with elite deep speed, catch radius, and vertical dominance",
    "attribute_signature": "Speed 19, height/catch radius 18+, deep threat 19",
    "caution": "Generational; use sparingly",
    "tags": [
      "deep_threat",
      "height_speed",
      "g5_star"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_larry_fitzgerald_047",
    "name": "Larry Fitzgerald",
    "school": "Pittsburgh",
    "primary_position": "WR",
    "archetype": "Contested-catch technician",
    "best_for": "receivers with hands, body control, routes, and ball skills",
    "attribute_signature": "Hands 19, contested catch 19, route running 16+, speed medium",
    "caution": "Polished catch-point comp",
    "tags": [
      "hands",
      "contested",
      "technician"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_calvin_johnson_048",
    "name": "Calvin Johnson",
    "school": "Georgia Tech",
    "primary_position": "WR",
    "archetype": "Mega-frame vertical mismatch",
    "best_for": "huge WRs with speed, strength, and catch radius",
    "attribute_signature": "Height/frame 20, speed 17+, catch radius 20",
    "caution": "Rare size/speed only",
    "tags": [
      "megatron",
      "height_speed",
      "mismatch"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_julio_jones_049",
    "name": "Julio Jones",
    "school": "Alabama",
    "primary_position": "WR",
    "archetype": "Physical explosive X receiver",
    "best_for": "big physical WRs with speed, blocking, and contested ability",
    "attribute_signature": "Speed 17+, physicality 18, route running high, blocking high",
    "caution": "Needs physical profile",
    "tags": [
      "x_receiver",
      "physical",
      "speed"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_devonta_smith_050",
    "name": "DeVonta Smith",
    "school": "Alabama",
    "primary_position": "WR",
    "archetype": "Slim route artist",
    "best_for": "lean receivers with route running, hands, separation, and polish",
    "attribute_signature": "Route running 19, hands 18, separation high, frame slim",
    "caution": "Do not use for size/physical comps",
    "tags": [
      "route_runner",
      "separator",
      "slim"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_ja_marr_chase_051",
    "name": "Ja'Marr Chase",
    "school": "LSU",
    "primary_position": "WR",
    "archetype": "Power separator",
    "best_for": "WRs with physicality, YAC, contested catches, and strong routes",
    "attribute_signature": "Physicality 18, YAC high, hands high, route running high",
    "caution": "Needs play strength",
    "tags": [
      "physical",
      "yac",
      "contested"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_justin_jefferson_052",
    "name": "Justin Jefferson",
    "school": "LSU",
    "primary_position": "WR",
    "archetype": "Slot-to-X separator",
    "best_for": "receivers with route craft, hands, football IQ, and versatility",
    "attribute_signature": "Route running 18, hands 17, awareness high, slot/X flex",
    "caution": "Polish comp",
    "tags": [
      "route_runner",
      "versatile",
      "slot"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_amari_cooper_053",
    "name": "Amari Cooper",
    "school": "Alabama",
    "primary_position": "WR",
    "archetype": "Smooth route technician",
    "best_for": "receivers with advanced routes, release, and separation",
    "attribute_signature": "Route/release 18+, hands 16+, speed 15+",
    "caution": "Route-first",
    "tags": [
      "technician",
      "release",
      "separator"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_michael_crabtree_054",
    "name": "Michael Crabtree",
    "school": "Texas Tech",
    "primary_position": "WR",
    "archetype": "Production monster possession star",
    "best_for": "productive WRs with hands, body control, and red-zone value",
    "attribute_signature": "Hands/production/red zone high, speed medium",
    "caution": "System production comp",
    "tags": [
      "production",
      "possession",
      "red_zone"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_dez_bryant_055",
    "name": "Dez Bryant",
    "school": "Oklahoma State",
    "primary_position": "WR",
    "archetype": "Explosive contested-catch alpha",
    "best_for": "WRs with physicality, ball skills, and emotional edge",
    "attribute_signature": "Contested catch 18+, physicality high, speed high, discipline volatile",
    "caution": "High-alpha comp",
    "tags": [
      "alpha",
      "contested",
      "explosive"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_mike_evans_056",
    "name": "Mike Evans",
    "school": "Texas A&M",
    "primary_position": "WR",
    "archetype": "Big-body rebounder",
    "best_for": "huge receivers with contested catch and red-zone dominance",
    "attribute_signature": "Height/catch radius 19, contested 18, speed medium+",
    "caution": "Big-body only",
    "tags": [
      "big_body",
      "red_zone",
      "contested"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_tavon_austin_057",
    "name": "Tavon Austin",
    "school": "West Virginia",
    "primary_position": "WR",
    "archetype": "Slot gadget blur",
    "best_for": "small speed players with return/gadget/YAC value",
    "attribute_signature": "Speed/agility 19, YAC high, size small, route medium",
    "caution": "Use for slot/gadget weapons",
    "tags": [
      "slot",
      "gadget",
      "returner"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_percy_harvin_058",
    "name": "Percy Harvin",
    "school": "Florida",
    "primary_position": "WR",
    "archetype": "Hybrid motion weapon",
    "best_for": "WR/RB hybrids with speed, motion, option, and gadget value",
    "attribute_signature": "Speed 18+, agility 18, rushing/receiving both useful",
    "caution": "Hybrid comp",
    "tags": [
      "hybrid",
      "motion",
      "gadget"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_peter_warrick_059",
    "name": "Peter Warrick",
    "school": "Florida State",
    "primary_position": "WR",
    "archetype": "Open-field magician",
    "best_for": "WRs with agility, body control, and creative YAC",
    "attribute_signature": "Agility 18+, YAC 18+, hands high, speed high",
    "caution": "Elusive WR comp",
    "tags": [
      "yac",
      "agility",
      "creator"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_marquise_brown_060",
    "name": "Marquise Brown",
    "school": "Oklahoma",
    "primary_position": "WR",
    "archetype": "Tiny vertical burner",
    "best_for": "small WRs with elite speed and deep threat ability",
    "attribute_signature": "Speed 19, acceleration 19, frame small, route medium+",
    "caution": "Small deep-speed comp",
    "tags": [
      "deep_threat",
      "speed",
      "small"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_ceedee_lamb_061",
    "name": "CeeDee Lamb",
    "school": "Oklahoma",
    "primary_position": "WR",
    "archetype": "YAC ball-winner",
    "best_for": "WRs with hands, YAC, body control, and competitive catch skills",
    "attribute_signature": "Hands 18, YAC 18, contested high, speed medium+",
    "caution": "Physical/YAC comp",
    "tags": [
      "yac",
      "hands",
      "competitive"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_garrett_wilson_062",
    "name": "Garrett Wilson",
    "school": "Ohio State",
    "primary_position": "WR",
    "archetype": "Fluid separator",
    "best_for": "receivers with body control, agility, and separation",
    "attribute_signature": "Agility/body control high, route running high, hands high",
    "caution": "Smooth movement comp",
    "tags": [
      "separator",
      "fluid",
      "route_runner"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_marvin_harrison_jr_063",
    "name": "Marvin Harrison Jr.",
    "school": "Ohio State",
    "primary_position": "WR",
    "archetype": "Polished prototype X",
    "best_for": "tall refined WRs with route running, hands, and catch radius",
    "attribute_signature": "Height 17+, route running 18, hands 18, catch radius high",
    "caution": "Polished, not raw",
    "tags": [
      "prototype",
      "x_receiver",
      "polished"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_cooper_kupp_064",
    "name": "Cooper Kupp",
    "school": "Eastern Washington",
    "primary_position": "WR",
    "archetype": "Small-school route savant",
    "best_for": "WRs with elite route craft, hands, IQ, and production",
    "attribute_signature": "Route/IQ/hands high, speed medium, small-school production",
    "caution": "Use for G5/FCS technical WRs",
    "tags": [
      "route_runner",
      "small_school",
      "iq"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_jameson_williams_065",
    "name": "Jameson Williams",
    "school": "Alabama",
    "primary_position": "WR",
    "archetype": "Long-speed field stretcher",
    "best_for": "WRs with elite vertical speed and explosive separation",
    "attribute_signature": "Speed 19, deep threat 18, route medium+",
    "caution": "Deep speed comp",
    "tags": [
      "speed",
      "deep_threat",
      "explosive"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_drake_london_066",
    "name": "Drake London",
    "school": "USC",
    "primary_position": "WR",
    "archetype": "Basketball-boxout possession X",
    "best_for": "big WRs with contested catch, body control, and possession volume",
    "attribute_signature": "Height/catch radius high, contested 18, speed modest",
    "caution": "Big possession comp",
    "tags": [
      "big_body",
      "possession",
      "contested"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_kyle_pitts_067",
    "name": "Kyle Pitts",
    "school": "Florida",
    "primary_position": "TE",
    "archetype": "Jumbo receiver mismatch",
    "best_for": "TEs with WR movement, catch radius, and vertical mismatch",
    "attribute_signature": "Receiving 19, speed 16+, route running high, blocking lower",
    "caution": "Receiving TE only",
    "tags": [
      "receiving_te",
      "mismatch",
      "vertical"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_brock_bowers_068",
    "name": "Brock Bowers",
    "school": "Georgia",
    "primary_position": "TE",
    "archetype": "Complete movement TE",
    "best_for": "TEs with YAC, blocking effort, hands, and versatility",
    "attribute_signature": "Receiving/YAC high, blocking medium+, agility high",
    "caution": "Versatile TE comp",
    "tags": [
      "complete_te",
      "yac",
      "versatile"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_vernon_davis_069",
    "name": "Vernon Davis",
    "school": "Maryland",
    "primary_position": "TE",
    "archetype": "Workout-warrior vertical TE",
    "best_for": "TEs with elite speed/strength measurables",
    "attribute_signature": "Speed 18, strength 18, frame high, receiving high",
    "caution": "Rare athletic TE",
    "tags": [
      "athlete",
      "vertical_te",
      "tools"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_kellen_winslow_ii_070",
    "name": "Kellen Winslow II",
    "school": "Miami",
    "primary_position": "TE",
    "archetype": "Explosive receiving TE",
    "best_for": "athletic receiving TEs with aggression and vertical value",
    "attribute_signature": "Speed/agility high, hands high, blocking medium",
    "caution": "Receiving/attitude comp",
    "tags": [
      "receiving_te",
      "explosive"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_jeremy_shockey_071",
    "name": "Jeremy Shockey",
    "school": "Miami",
    "primary_position": "TE",
    "archetype": "Physical seam weapon",
    "best_for": "TEs with toughness, hands, and emotional edge",
    "attribute_signature": "Physicality high, receiving high, blocking medium+",
    "caution": "Use for aggressive TE",
    "tags": [
      "physical",
      "seam",
      "attitude"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_tyler_eifert_072",
    "name": "Tyler Eifert",
    "school": "Notre Dame",
    "primary_position": "TE",
    "archetype": "Red-zone receiving TE",
    "best_for": "TEs with hands, body control, and red-zone value",
    "attribute_signature": "Hands/catch radius high, speed medium, blocking medium",
    "caution": "Red-zone TE comp",
    "tags": [
      "red_zone",
      "receiving_te"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_dallas_clark_073",
    "name": "Dallas Clark",
    "school": "Iowa",
    "primary_position": "TE",
    "archetype": "H-back receiving technician",
    "best_for": "undersized/move TEs with hands and route craft",
    "attribute_signature": "Route/hands high, size medium, blocking medium",
    "caution": "Move TE comp",
    "tags": [
      "move_te",
      "route_runner"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_mark_andrews_074",
    "name": "Mark Andrews",
    "school": "Oklahoma",
    "primary_position": "TE",
    "archetype": "Big slot seam target",
    "best_for": "TEs with size, route savvy, and red-zone/seam production",
    "attribute_signature": "Hands high, route high, seam value high",
    "caution": "Receiving TE",
    "tags": [
      "seam",
      "big_slot",
      "receiving_te"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_george_kittle_075",
    "name": "George Kittle",
    "school": "Iowa",
    "primary_position": "TE",
    "archetype": "Developmental blocking/YAC TE",
    "best_for": "TEs who combine blocking, effort, toughness, and YAC",
    "attribute_signature": "Blocking 18, YAC high, work ethic high, receiving medium+",
    "caution": "Developmental complete TE",
    "tags": [
      "blocking",
      "yac",
      "development"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_orlando_pace_076",
    "name": "Orlando Pace",
    "school": "Ohio State",
    "primary_position": "OT",
    "archetype": "Generational blindside wall",
    "best_for": "elite tackles with size, feet, power, and pass protection",
    "attribute_signature": "Pass block 19, footwork 19, size 19, strength high",
    "caution": "Generational; use rarely",
    "tags": [
      "ot",
      "pass_protection",
      "elite"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_jonathan_ogden_077",
    "name": "Jonathan Ogden",
    "school": "UCLA",
    "primary_position": "OT",
    "archetype": "Massive technician tackle",
    "best_for": "huge tackles with length, power, and technique",
    "attribute_signature": "Size/length 20, pass block high, strength high",
    "caution": "Prototype LT",
    "tags": [
      "ot",
      "length",
      "technician"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_joe_thomas_078",
    "name": "Joe Thomas",
    "school": "Wisconsin",
    "primary_position": "OT",
    "archetype": "Clean technician tackle",
    "best_for": "tackles with footwork, discipline, and balanced blocking",
    "attribute_signature": "Footwork 19, discipline high, pass/run block high",
    "caution": "Technician comp",
    "tags": [
      "ot",
      "technician",
      "balanced"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_trent_williams_079",
    "name": "Trent Williams",
    "school": "Oklahoma",
    "primary_position": "OT",
    "archetype": "Rare athletic power tackle",
    "best_for": "tackles with athleticism, strength, and movement skill",
    "attribute_signature": "Strength 18, footwork high, agility high, run/pass high",
    "caution": "Athletic tackle comp",
    "tags": [
      "ot",
      "athlete",
      "power"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_penei_sewell_080",
    "name": "Penei Sewell",
    "school": "Oregon",
    "primary_position": "OT",
    "archetype": "Young mauling movement tackle",
    "best_for": "large tackles with power, movement, and early dominance",
    "attribute_signature": "Run block 18, movement high, strength high, youth high",
    "caution": "Physical young OT",
    "tags": [
      "ot",
      "mauler",
      "movement"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_quenton_nelson_081",
    "name": "Quenton Nelson",
    "school": "Notre Dame",
    "primary_position": "OG",
    "archetype": "Punishing interior mauler",
    "best_for": "guards with elite strength, leverage, and violence",
    "attribute_signature": "Strength 19, run block 19, aggression high, pass block high",
    "caution": "Interior power comp",
    "tags": [
      "og",
      "mauler",
      "power"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_zack_martin_082",
    "name": "Zack Martin",
    "school": "Notre Dame",
    "primary_position": "OG/OT",
    "archetype": "Technician guard/tackle",
    "best_for": "OL with versatility, technique, and consistency",
    "attribute_signature": "Technique high, consistency high, pass/run high",
    "caution": "Versatile OL comp",
    "tags": [
      "ol",
      "versatile",
      "technician"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_creed_humphrey_083",
    "name": "Creed Humphrey",
    "school": "Oklahoma",
    "primary_position": "C",
    "archetype": "Smart powerful center",
    "best_for": "centers with leadership, strength, and pass/run balance",
    "attribute_signature": "Awareness 18, strength high, communication high",
    "caution": "Center/IQ comp",
    "tags": [
      "center",
      "iq",
      "leader"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_alex_mack_084",
    "name": "Alex Mack",
    "school": "California",
    "primary_position": "C",
    "archetype": "Cerebral center",
    "best_for": "centers with awareness, leverage, and leadership",
    "attribute_signature": "Awareness/communication high, strength medium+",
    "caution": "Technical center",
    "tags": [
      "center",
      "processor",
      "leader"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_jake_long_085",
    "name": "Jake Long",
    "school": "Michigan",
    "primary_position": "OT",
    "archetype": "Classic power tackle",
    "best_for": "big tackles with strength, run blocking, and pass protection",
    "attribute_signature": "Size/strength high, run/pass balance high",
    "caution": "Traditional OT",
    "tags": [
      "ot",
      "power",
      "balanced"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_d_brickashaw_ferguson_086",
    "name": "D'Brickashaw Ferguson",
    "school": "Virginia",
    "primary_position": "OT",
    "archetype": "Long pass-protection tackle",
    "best_for": "lean tackles with length, feet, and pass protection",
    "attribute_signature": "Length high, footwork high, strength medium",
    "caution": "Pass-protect OT",
    "tags": [
      "ot",
      "length",
      "pass_protection"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_andrew_thomas_087",
    "name": "Andrew Thomas",
    "school": "Georgia",
    "primary_position": "OT",
    "archetype": "SEC power technician",
    "best_for": "tackles with run/pass balance, strength, and technique",
    "attribute_signature": "Pass/run block high, strength high, footwork high",
    "caution": "Balanced tackle",
    "tags": [
      "ot",
      "balanced",
      "sec"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_tyron_smith_088",
    "name": "Tyron Smith",
    "school": "USC",
    "primary_position": "OT",
    "archetype": "Explosive tackle athlete",
    "best_for": "tackles with rare athletic traits and projection",
    "attribute_signature": "Agility/strength high, frame high, pass block projection high",
    "caution": "Athletic projection",
    "tags": [
      "ot",
      "athlete",
      "projection"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_ndamukong_suh_089",
    "name": "Ndamukong Suh",
    "school": "Nebraska",
    "primary_position": "DT",
    "archetype": "Interior wrecking ball",
    "best_for": "DTs with power, disruption, strength, and dominance",
    "attribute_signature": "Strength 20, pass rush interior 19, run defense 19",
    "caution": "Generational interior comp",
    "tags": [
      "dt",
      "power",
      "disruptor"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_aaron_donald_090",
    "name": "Aaron Donald",
    "school": "Pittsburgh",
    "primary_position": "DT",
    "archetype": "Undersized explosive disruptor",
    "best_for": "smaller DTs with first step, leverage, strength, and production",
    "attribute_signature": "Explosiveness 19, leverage high, strength high, size lower",
    "caution": "Undersized elite only",
    "tags": [
      "dt",
      "undersized",
      "explosive"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_warren_sapp_091",
    "name": "Warren Sapp",
    "school": "Miami",
    "primary_position": "DT",
    "archetype": "Penetrating three-tech",
    "best_for": "DTs with burst, pass rush, and disruptive quickness",
    "attribute_signature": "First step high, pass rush high, strength medium+",
    "caution": "3-tech comp",
    "tags": [
      "dt",
      "penetrator",
      "pass_rush"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_julius_peppers_092",
    "name": "Julius Peppers",
    "school": "North Carolina",
    "primary_position": "EDGE",
    "archetype": "Rare jumbo edge athlete",
    "best_for": "huge edges with basketball movement and power",
    "attribute_signature": "Size 19, speed 17+, explosiveness high, pass rush high",
    "caution": "Rare size/athlete comp",
    "tags": [
      "edge",
      "athlete",
      "power"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_chase_young_093",
    "name": "Chase Young",
    "school": "Ohio State",
    "primary_position": "EDGE",
    "archetype": "Prototype explosive edge",
    "best_for": "edges with burst, bend, size, and pass-rush dominance",
    "attribute_signature": "Explosiveness/bend/pass rush 18+, size high",
    "caution": "Prototype edge",
    "tags": [
      "edge",
      "prototype",
      "pass_rush"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_jadeveon_clowney_094",
    "name": "Jadeveon Clowney",
    "school": "South Carolina",
    "primary_position": "EDGE",
    "archetype": "Freak edge athlete",
    "best_for": "edges with rare size/speed and splash play upside",
    "attribute_signature": "Speed/size/explosiveness 19, motor/consistency variable",
    "caution": "Tools comp with consistency caveat",
    "tags": [
      "edge",
      "freak",
      "tools"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_myles_garrett_095",
    "name": "Myles Garrett",
    "school": "Texas A&M",
    "primary_position": "EDGE",
    "archetype": "Power-speed edge prototype",
    "best_for": "edges with strength, speed, bend, and pass-rush polish",
    "attribute_signature": "Power/speed/bend high, size high",
    "caution": "Elite edge comp",
    "tags": [
      "edge",
      "power_speed",
      "prototype"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_joey_bosa_096",
    "name": "Joey Bosa",
    "school": "Ohio State",
    "primary_position": "EDGE",
    "archetype": "Technician power end",
    "best_for": "edges with hand usage, power, discipline, and run defense",
    "attribute_signature": "Hand usage 18, power high, run defense high, speed medium+",
    "caution": "Technical edge",
    "tags": [
      "edge",
      "technician",
      "power"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_nick_bosa_097",
    "name": "Nick Bosa",
    "school": "Ohio State",
    "primary_position": "EDGE",
    "archetype": "Polished compact edge",
    "best_for": "edges with refined hands, bend, and leverage",
    "attribute_signature": "Technique high, bend high, power high",
    "caution": "Polished edge",
    "tags": [
      "edge",
      "bend",
      "technician"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_aidan_hutchinson_098",
    "name": "Aidan Hutchinson",
    "school": "Michigan",
    "primary_position": "EDGE",
    "archetype": "High-motor technician edge",
    "best_for": "edges with motor, hands, size, and leadership",
    "attribute_signature": "Motor/work ethic 18, pass rush high, size high",
    "caution": "Motor/technique comp",
    "tags": [
      "edge",
      "motor",
      "technician"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_will_anderson_jr_099",
    "name": "Will Anderson Jr.",
    "school": "Alabama",
    "primary_position": "EDGE",
    "archetype": "Relentless edge/LB rusher",
    "best_for": "edges with first step, pursuit, motor, and production",
    "attribute_signature": "Motor 19, explosiveness high, pass rush high",
    "caution": "High-motor edge",
    "tags": [
      "edge",
      "motor",
      "production"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_von_miller_100",
    "name": "Von Miller",
    "school": "Texas A&M",
    "primary_position": "EDGE/LB",
    "archetype": "Explosive bend rusher",
    "best_for": "speed/bend edges with elite first step",
    "attribute_signature": "Bend 19, speed 18, pass rush 18, size medium",
    "caution": "Speed rusher comp",
    "tags": [
      "edge",
      "bend",
      "speed"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_khalil_mack_101",
    "name": "Khalil Mack",
    "school": "Buffalo",
    "primary_position": "EDGE/LB",
    "archetype": "Small-school power edge",
    "best_for": "small-school edges with strength, production, and versatility",
    "attribute_signature": "Strength high, pass rush high, run defense high, school level lower",
    "caution": "G5/small-school edge",
    "tags": [
      "edge",
      "g5_star",
      "power"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_dwight_freeney_102",
    "name": "Dwight Freeney",
    "school": "Syracuse",
    "primary_position": "EDGE",
    "archetype": "Compact spin/bend terror",
    "best_for": "undersized speed rushers with bend and get-off",
    "attribute_signature": "Acceleration/bend 19, size lower, pass rush high",
    "caution": "Undersized rusher",
    "tags": [
      "edge",
      "undersized",
      "bend"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_terrell_suggs_103",
    "name": "Terrell Suggs",
    "school": "Arizona State",
    "primary_position": "EDGE",
    "archetype": "Production-heavy pass rusher",
    "best_for": "edges with sack production, power, and instincts",
    "attribute_signature": "Pass rush production 19, power high, instincts high",
    "caution": "Production edge",
    "tags": [
      "edge",
      "production",
      "power"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_j_j_watt_104",
    "name": "J.J. Watt",
    "school": "Wisconsin",
    "primary_position": "DE",
    "archetype": "Effort-power developmental end",
    "best_for": "big effort players with power, length, and development arc",
    "attribute_signature": "Work ethic/motor 19, size high, power high",
    "caution": "Development/motor comp",
    "tags": [
      "de",
      "motor",
      "development"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_luke_kuechly_105",
    "name": "Luke Kuechly",
    "school": "Boston College",
    "primary_position": "LB",
    "archetype": "Instinctive tackle machine",
    "best_for": "LBs with elite processing, tackling, and leadership",
    "attribute_signature": "Awareness 19, tackling 19, leadership high, speed medium+",
    "caution": "Instincts/IQ comp",
    "tags": [
      "lb",
      "instincts",
      "tackling"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_ray_lewis_106",
    "name": "Ray Lewis",
    "school": "Miami",
    "primary_position": "LB",
    "archetype": "Alpha middle linebacker",
    "best_for": "LBs with leadership, violence, instincts, and big-game presence",
    "attribute_signature": "Leadership 20, aggression high, tackling high, instincts high",
    "caution": "Alpha comp",
    "tags": [
      "lb",
      "leader",
      "alpha"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_brian_urlacher_107",
    "name": "Brian Urlacher",
    "school": "New Mexico",
    "primary_position": "LB/S",
    "archetype": "Big hybrid space defender",
    "best_for": "big athletic LBs/safeties with range and versatility",
    "attribute_signature": "Size 18, speed 16+, coverage high, versatility high",
    "caution": "Hybrid comp",
    "tags": [
      "lb",
      "hybrid",
      "coverage"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_patrick_willis_108",
    "name": "Patrick Willis",
    "school": "Ole Miss",
    "primary_position": "LB",
    "archetype": "Explosive tackling missile",
    "best_for": "LBs with speed, strength, pursuit, and tackling",
    "attribute_signature": "Speed 17+, tackling 19, pursuit high, strength high",
    "caution": "Modern LB power/speed",
    "tags": [
      "lb",
      "speed",
      "tackling"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_derrick_johnson_109",
    "name": "Derrick Johnson",
    "school": "Texas",
    "primary_position": "LB",
    "archetype": "Range-and-coverage backer",
    "best_for": "LBs with athleticism, coverage, and pursuit",
    "attribute_signature": "Range high, coverage high, speed high",
    "caution": "Coverage LB",
    "tags": [
      "lb",
      "coverage",
      "range"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_roquan_smith_110",
    "name": "Roquan Smith",
    "school": "Georgia",
    "primary_position": "LB",
    "archetype": "Fast modern field general",
    "best_for": "smaller fast LBs with run fits, range, and leadership",
    "attribute_signature": "Speed 17+, run fits high, awareness high",
    "caution": "Modern LB",
    "tags": [
      "lb",
      "speed",
      "field_general"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_devin_white_111",
    "name": "Devin White",
    "school": "LSU",
    "primary_position": "LB",
    "archetype": "Blitzing speed backer",
    "best_for": "LBs with speed, aggression, blitz value, and range",
    "attribute_signature": "Speed 18, blitz 17+, aggression high",
    "caution": "Fast LB comp",
    "tags": [
      "lb",
      "blitz",
      "speed"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_micah_parsons_112",
    "name": "Micah Parsons",
    "school": "Penn State",
    "primary_position": "LB/EDGE",
    "archetype": "Hybrid pass-rush athlete",
    "best_for": "LB/edge hybrids with range, pass-rush, and elite athleticism",
    "attribute_signature": "Speed/explosiveness 18+, pass rush high, coverage medium+",
    "caution": "Hybrid rush/space comp",
    "tags": [
      "lb",
      "edge",
      "hybrid"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_manti_te_o_113",
    "name": "Manti Te'o",
    "school": "Notre Dame",
    "primary_position": "LB",
    "archetype": "High-profile instinctive leader",
    "best_for": "LBs with leadership, tackling, instincts, and program face traits",
    "attribute_signature": "Leadership high, tackling high, instincts high, speed medium",
    "caution": "Leader LB comp",
    "tags": [
      "lb",
      "leader",
      "instincts"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_c_j_mosley_114",
    "name": "C.J. Mosley",
    "school": "Alabama",
    "primary_position": "LB",
    "archetype": "Assignment-sound SEC linebacker",
    "best_for": "LBs with discipline, tackling, and coverage/run balance",
    "attribute_signature": "Assignment discipline high, tackling high, coverage medium+",
    "caution": "Reliable LB",
    "tags": [
      "lb",
      "discipline",
      "balanced"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_lavar_arrington_115",
    "name": "LaVar Arrington",
    "school": "Penn State",
    "primary_position": "LB",
    "archetype": "Explosive havoc linebacker",
    "best_for": "LBs with burst, aggression, and splash plays",
    "attribute_signature": "Explosiveness high, aggression high, instincts high",
    "caution": "Havoc LB",
    "tags": [
      "lb",
      "havoc",
      "explosive"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_shaquem_griffin_116",
    "name": "Shaquem Griffin",
    "school": "UCF",
    "primary_position": "LB/EDGE",
    "archetype": "High-motor speed blitzer",
    "best_for": "smaller speed LBs with motor, blitz, and emotional story",
    "attribute_signature": "Motor high, speed high, blitz high, size lower",
    "caution": "Motor/underdog comp",
    "tags": [
      "lb",
      "speed",
      "motor"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_deion_sanders_117",
    "name": "Deion Sanders",
    "school": "Florida State",
    "primary_position": "CB",
    "archetype": "Elite cover/return superstar",
    "best_for": "corners with speed, ball skills, swagger, and return value",
    "attribute_signature": "Speed 20, ball skills 19, man coverage high, tackling lower",
    "caution": "Generational cover/return comp",
    "tags": [
      "cb",
      "speed",
      "ball_skills",
      "returner"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_charles_woodson_118",
    "name": "Charles Woodson",
    "school": "Michigan",
    "primary_position": "CB/S",
    "archetype": "Complete playmaking DB",
    "best_for": "DBs with coverage, ball skills, return/WR value, and big-game traits",
    "attribute_signature": "Coverage high, ball skills 19, versatility high, big-game high",
    "caution": "Complete DB comp",
    "tags": [
      "db",
      "versatile",
      "playmaker"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_champ_bailey_119",
    "name": "Champ Bailey",
    "school": "Georgia",
    "primary_position": "CB/WR",
    "archetype": "Two-way cover athlete",
    "best_for": "corners with elite athleticism and offensive/return value",
    "attribute_signature": "Speed high, man coverage high, ball skills high, WR value",
    "caution": "Two-way comp",
    "tags": [
      "cb",
      "two_way",
      "athlete"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_patrick_peterson_120",
    "name": "Patrick Peterson",
    "school": "LSU",
    "primary_position": "CB",
    "archetype": "Big press-return corner",
    "best_for": "large corners with press, speed, and return value",
    "attribute_signature": "Size 17+, speed 17+, press high, return high",
    "caution": "Big CB comp",
    "tags": [
      "cb",
      "press",
      "returner"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_jalen_ramsey_121",
    "name": "Jalen Ramsey",
    "school": "Florida State",
    "primary_position": "CB/S",
    "archetype": "Physical positionless DB",
    "best_for": "DBs with size, man coverage, safety flexibility, and confidence",
    "attribute_signature": "Size/physicality high, man coverage high, versatility high",
    "caution": "Hybrid DB comp",
    "tags": [
      "db",
      "versatile",
      "physical"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_tyrann_mathieu_122",
    "name": "Tyrann Mathieu",
    "school": "LSU",
    "primary_position": "DB",
    "archetype": "Instinctive havoc nickel/safety",
    "best_for": "smaller DBs with instincts, ball skills, blitz, and chaos plays",
    "attribute_signature": "Instincts 19, ball skills high, blitz high, size small",
    "caution": "Nickel/havoc comp",
    "tags": [
      "db",
      "nickel",
      "havoc"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_ed_reed_123",
    "name": "Ed Reed",
    "school": "Miami",
    "primary_position": "S",
    "archetype": "Ball-hawking centerfielder",
    "best_for": "safeties with anticipation, range, and interception instincts",
    "attribute_signature": "Anticipation 20, ball skills 19, range high",
    "caution": "Elite safety IQ comp",
    "tags": [
      "safety",
      "ballhawk",
      "iq"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_sean_taylor_124",
    "name": "Sean Taylor",
    "school": "Miami",
    "primary_position": "S",
    "archetype": "Rare-size enforcer/playmaker",
    "best_for": "safeties with size, speed, range, and physicality",
    "attribute_signature": "Size 18, speed 17+, tackling 18, ball skills high",
    "caution": "Rare safety comp",
    "tags": [
      "safety",
      "physical",
      "range"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_eric_berry_125",
    "name": "Eric Berry",
    "school": "Tennessee",
    "primary_position": "S",
    "archetype": "Instinctive versatile safety",
    "best_for": "safeties with range, tackling, leadership, and ball skills",
    "attribute_signature": "Range high, tackling high, leadership high, ball skills high",
    "caution": "Complete safety",
    "tags": [
      "safety",
      "versatile",
      "leader"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_earl_thomas_126",
    "name": "Earl Thomas",
    "school": "Texas",
    "primary_position": "S",
    "archetype": "Range-heavy free safety",
    "best_for": "safeties with speed, range, and coverage instincts",
    "attribute_signature": "Speed/range high, awareness high, size medium",
    "caution": "Centerfield comp",
    "tags": [
      "safety",
      "range",
      "coverage"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_minkah_fitzpatrick_127",
    "name": "Minkah Fitzpatrick",
    "school": "Alabama",
    "primary_position": "DB",
    "archetype": "Assignment-perfect versatile DB",
    "best_for": "DBs with IQ, slot/safety versatility, and discipline",
    "attribute_signature": "Awareness/discipline high, coverage high, versatility high",
    "caution": "Smart versatile DB",
    "tags": [
      "db",
      "versatile",
      "iq"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_sauce_gardner_128",
    "name": "Sauce Gardner",
    "school": "Cincinnati",
    "primary_position": "CB",
    "archetype": "Long press technician",
    "best_for": "long corners with press, confidence, and low completion profile",
    "attribute_signature": "Length high, press high, man coverage high",
    "caution": "Long CB comp",
    "tags": [
      "cb",
      "length",
      "press"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_darrelle_revis_129",
    "name": "Darrelle Revis",
    "school": "Pittsburgh",
    "primary_position": "CB",
    "archetype": "Mirror man-cover corner",
    "best_for": "corners with footwork, hip fluidity, and man technique",
    "attribute_signature": "Man coverage 19, hip fluidity high, footwork high",
    "caution": "Man coverage comp",
    "tags": [
      "cb",
      "man",
      "technician"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_malcolm_jenkins_130",
    "name": "Malcolm Jenkins",
    "school": "Ohio State",
    "primary_position": "CB/S",
    "archetype": "Smart DB leader",
    "best_for": "DBs with position versatility, leadership, and awareness",
    "attribute_signature": "Awareness high, versatility high, leadership high",
    "caution": "Reliable versatile DB",
    "tags": [
      "db",
      "leader",
      "versatile"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_budda_baker_131",
    "name": "Budda Baker",
    "school": "Washington",
    "primary_position": "S",
    "archetype": "Small explosive safety",
    "best_for": "smaller safeties with speed, tackling, and range",
    "attribute_signature": "Speed high, tackling high, size small, motor high",
    "caution": "Compact safety",
    "tags": [
      "safety",
      "speed",
      "motor"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_antoine_winfield_jr_132",
    "name": "Antoine Winfield Jr.",
    "school": "Minnesota",
    "primary_position": "S",
    "archetype": "Instinctive compact ballhawk",
    "best_for": "smaller safeties with instincts, tackling, and ball skills",
    "attribute_signature": "Instincts high, ball skills high, tackling high, size small",
    "caution": "Compact instincts DB",
    "tags": [
      "safety",
      "instincts",
      "ballhawk"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_sebastian_janikowski_133",
    "name": "Sebastian Janikowski",
    "school": "Florida State",
    "primary_position": "K",
    "archetype": "Huge-leg kicker",
    "best_for": "kickers with elite power and long field-goal range",
    "attribute_signature": "Kick power 20, accuracy medium+, pressure medium+",
    "caution": "Big leg comp",
    "tags": [
      "kicker",
      "power"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_justin_tucker_134",
    "name": "Justin Tucker",
    "school": "Texas",
    "primary_position": "K",
    "archetype": "Reliable elite accuracy kicker",
    "best_for": "kickers with accuracy, clutch, and range",
    "attribute_signature": "Accuracy 19, clutch high, power high",
    "caution": "Accuracy/clutch comp",
    "tags": [
      "kicker",
      "accuracy",
      "clutch"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_mason_crosby_135",
    "name": "Mason Crosby",
    "school": "Colorado",
    "primary_position": "K",
    "archetype": "Altitude-long-range kicker",
    "best_for": "kickers with power and long-distance profile",
    "attribute_signature": "Kick power high, long range high, accuracy medium+",
    "caution": "Long-range comp",
    "tags": [
      "kicker",
      "range"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_rodrigo_blankenship_136",
    "name": "Rodrigo Blankenship",
    "school": "Georgia",
    "primary_position": "K",
    "archetype": "High-profile accurate college kicker",
    "best_for": "kickers with consistency and visibility",
    "attribute_signature": "Accuracy high, consistency high, power medium+",
    "caution": "Consistency comp",
    "tags": [
      "kicker",
      "accuracy",
      "consistency"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_roberto_aguayo_137",
    "name": "Roberto Aguayo",
    "school": "Florida State",
    "primary_position": "K",
    "archetype": "College automatic kicker",
    "best_for": "kickers with elite college accuracy and confidence",
    "attribute_signature": "Accuracy 19, consistency high, clutch high",
    "caution": "College accuracy comp",
    "tags": [
      "kicker",
      "automatic"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_ray_guy_138",
    "name": "Ray Guy",
    "school": "Southern Miss",
    "primary_position": "P",
    "archetype": "Legendary power punter",
    "best_for": "punters with huge leg, hang time, and field-position impact",
    "attribute_signature": "Punt power 20, hang time high, accuracy high",
    "caution": "Elite punter comp",
    "tags": [
      "punter",
      "power",
      "hang_time"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_michael_dickson_139",
    "name": "Michael Dickson",
    "school": "Texas",
    "primary_position": "P",
    "archetype": "Directional weapon punter",
    "best_for": "punters with hang time, directional control, and net value",
    "attribute_signature": "Punt accuracy high, hang time high, power high",
    "caution": "Modern punter comp",
    "tags": [
      "punter",
      "directional",
      "net"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  },
  {
    "id": "comp_braden_mann_140",
    "name": "Braden Mann",
    "school": "Texas A&M",
    "primary_position": "P",
    "archetype": "Big-leg modern punter",
    "best_for": "punters with huge distance and field-position value",
    "attribute_signature": "Punt power high, hang time high",
    "caution": "Power punter",
    "tags": [
      "punter",
      "power"
    ],
    "comp_type": "style",
    "era": "college_legend",
    "safe_display_rule": "Display as a style/play-profile comparison, not a career guarantee."
  }
]