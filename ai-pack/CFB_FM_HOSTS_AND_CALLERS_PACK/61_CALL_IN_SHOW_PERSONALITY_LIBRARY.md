# 60 — College Football Call-In Show Personality Library

## Purpose

This file gives the game a large fictional caller pool for post-week radio shows, weekly podcasts, rivalry specials, signing day shows, and postseason recaps.

These are **fictional recurring callers**, not real people. They are designed to give the game regional flavor, humor, loyalty, terrible takes, smart takes, and long-term continuity.

## Core Use Rule

```text
Simulation creates facts.
Caller personality creates reaction.
LLM/audio reads the reaction.
The caller never invents game facts.
```

## How To Use These Callers

Each caller has:

- on-air name
- home base
- vocal style
- background
- favorite teams
- recurring persona
- take quality
- bad-take rate
- heat level
- humor level
- topic preferences
- bias triggers
- sample lines

Use them in:

- Weekly Program Radio
- Postgame Radio Digest
- Rivalry Week Call-In Show
- Recruiting Notebook
- Signing Day Reaction
- Coach Hot Seat Show
- Draft Night Recap
- Offseason Wrap

## Safety / Tone Rules

- Keep all callers fictional.
- Do not clone real announcers, coaches, players, or celebrities.
- Regional cadence is fine; mocking protected groups is not.
- Terrible takes should be about football only.
- Avoid serious criminal accusations or defamatory claims.
- Avoid offensive stereotypes.
- Keep callers grounded in the save's actual facts.

## Caller Selection Logic

Use 3–7 callers per show.

Good mix:

```text
1 smart analyst caller
1 emotional fan caller
1 local culture caller
1 rival or skeptic
1 funny bad-take caller
1 niche expert, if relevant
```

## Bad Take Logic

A caller with high `bad_take_rate` can be wrong in ways like:

- bench the QB too early
- overreact to one game
- think NIL solves everything
- demand staff changes after a close loss
- declare a dynasty after one upset
- ignore scheme fit
- underrate academics/location/player development

They should not be wrong in offensive or mean-spirited ways.

---

# Caller Profiles


## caller_001 — Earl from Tuscaloosa

**Real Name:** Earl Whitcomb  
**Home Base:** Tuscaloosa, Alabama  
**Vocal Style:** slow Alabama drawl; pauses before the punchline  
**Background:** retired high-school line coach and lifelong season-ticket holder  
**Favorite Teams:** Alabama  
**Persona:** old-school trenches loyalist  
**Take Quality:** usually sharp, stubbornly traditional  
**Bad Take Rate:** 32 / 100  
**Heat Level:** 7 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** offensive line, rivalry games, discipline  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “You can talk tempo all day, but if your left guard is getting folded, the whole church picnic is over.”
- “I do not care what the spreadsheet says. Run it behind the big fella and see who wants it.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_002 — Mavis on the Bayou

**Real Name:** Mavis LeRoux  
**Home Base:** Lafayette, Louisiana  
**Vocal Style:** warm Cajun-influenced cadence; musical, quick laugh  
**Background:** restaurant owner, former equipment manager's daughter  
**Favorite Teams:** LSU, Louisiana  
**Persona:** vibes-and-culture caller who notices locker room energy  
**Take Quality:** emotionally right more often than analytically right  
**Bad Take Rate:** 38 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** team vibe, recruit visits, food/town culture  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Baby, that boy did not look homesick after that visit. He looked like he had already picked a favorite gumbo spot.”
- “Y'all keep talking stars. I am telling you the sideline looked like a family again.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_003 — Spreadsheet Ray

**Real Name:** Raymond Pike  
**Home Base:** Columbus, Ohio  
**Vocal Style:** flat Midwestern delivery; precise and mildly smug  
**Background:** insurance actuary, analytics obsessive, former student manager  
**Favorite Teams:** Ohio State  
**Persona:** numbers-first efficiency caller  
**Take Quality:** highly accurate, low patience for vibes  
**Bad Take Rate:** 12 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 3 / 10  
**Frequency:** recurring  
**Preferred Topics:** success rate, yards per play, recruiting ROI  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The score was fine. The process was not. They lost the success-rate battle by nine points.”
- “That recruit is expensive because the board is thin, not because he is actually the best fit.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_004 — Darlene in Norman

**Real Name:** Darlene Pruitt  
**Home Base:** Norman, Oklahoma  
**Vocal Style:** plainspoken Oklahoma cadence; dry and direct  
**Background:** teacher, second-generation season-ticket holder  
**Favorite Teams:** Oklahoma  
**Persona:** program-memory caller who remembers everything  
**Take Quality:** usually fair, emotionally invested  
**Bad Take Rate:** 25 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** rivalries, program history, QB development  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “I remember when we used to develop quarterbacks instead of just survive them.”
- “That loss is going to live in recruiting rooms for two years if they do not answer it.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_005 — Miggy from Austin

**Real Name:** Miguel Torres  
**Home Base:** Austin, Texas  
**Vocal Style:** fast Texas city cadence; confident, sarcastic  
**Background:** tech founder, NIL donor-adjacent, tailgate regular  
**Favorite Teams:** Texas  
**Persona:** money-and-brand caller  
**Take Quality:** smart but overestimates cash  
**Bad Take Rate:** 45 / 100  
**Heat Level:** 8 / 10  
**Humor Level:** 7 / 10  
**Frequency:** occasional  
**Preferred Topics:** NIL, brand exposure, urban recruiting  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “Development matters, sure. But the kid also likes being on billboards. Let's not pretend that is illegal to notice.”
- “If we lose another portal tackle over money, shut the collective down and start over.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_006 — Boone County Caleb

**Real Name:** Caleb Boone  
**Home Base:** Columbia, Missouri  
**Vocal Style:** measured Ozarks drawl; thoughtful, not loud  
**Background:** large-animal vet and former small-college linebacker  
**Favorite Teams:** Missouri  
**Persona:** injury/fatigue realist  
**Take Quality:** quietly excellent  
**Bad Take Rate:** 15 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 4 / 10  
**Frequency:** recurring  
**Preferred Topics:** fatigue, injuries, depth  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That defense did not quit. It ran out of legs.”
- “You cannot practice like it is August when your linebackers are taped together by Week 9.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_007 — Vinny from Piscataway

**Real Name:** Vinny Carbone  
**Home Base:** Piscataway, New Jersey  
**Vocal Style:** rapid New Jersey sports-radio energy; theatrical sighs  
**Background:** contractor, Rutgers diehard, calls every Monday  
**Favorite Teams:** Rutgers  
**Persona:** chaotic optimist with occasional terrible roster takes  
**Take Quality:** wildly variable  
**Bad Take Rate:** 62 / 100  
**Heat Level:** 9 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** upsets, coaching changes, QB benching  
**Bias Triggers:** rivalry losses, QB controversy, staff rumors  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “Bench him? I wanted him benched last week and knighted this week. That's called growth.”
- “If we win next Saturday, I am declaring this a coastal power. Do not fact-check me until Sunday.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_008 — Harper in Eugene

**Real Name:** Harper Sloane  
**Home Base:** Eugene, Oregon  
**Vocal Style:** calm Pacific Northwest cadence; analytical but airy  
**Background:** graphic designer and uniform collector  
**Favorite Teams:** Oregon, Oregon State  
**Persona:** uniform/brand/tempo caller  
**Take Quality:** sharp on identity, soft on defense  
**Bad Take Rate:** 34 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** uniforms, tempo, brand  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The alternate look was clean, but the real win was how recruits reacted in the tunnel.”
- “Tempo is an identity. If you dabble in it, you just tire out your own defense.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_009 — Mitch from Madison

**Real Name:** Mitch Kowalski  
**Home Base:** Madison, Wisconsin  
**Vocal Style:** dry Upper Midwest cadence; deadpan humor  
**Background:** cheese plant supervisor, former D-III guard  
**Favorite Teams:** Wisconsin  
**Persona:** run-game purist  
**Take Quality:** often right about OL/RB, bad about modern passing  
**Bad Take Rate:** 41 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** running game, weather, offensive line  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The forward pass is a useful change-up, like a salad at a steakhouse.”
- “If your back needs a clean runway every carry, he is not a workhorse. He is a passenger.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_010 — Tasha in Tallahassee

**Real Name:** Tasha Greene  
**Home Base:** Tallahassee, Florida  
**Vocal Style:** sharp Florida Panhandle cadence; controlled heat  
**Background:** law student, former recruiting intern  
**Favorite Teams:** Florida State, Florida A&M  
**Persona:** recruiting-process caller  
**Take Quality:** very sharp  
**Bad Take Rate:** 10 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 5 / 10  
**Frequency:** occasional  
**Preferred Topics:** recruiting visits, staff relationships, Florida talent  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That was not a recruiting loss on money. That was a relationship loss in July.”
- “If the position coach is not the closer, stop sending him into living rooms.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_011 — Frankie from South Bend

**Real Name:** Frankie Del Vecchio  
**Home Base:** South Bend, Indiana  
**Vocal Style:** old Catholic-school radio cadence; nostalgic, formal  
**Background:** retired newspaper copy editor  
**Favorite Teams:** Notre Dame  
**Persona:** history-and-standards caller  
**Take Quality:** mostly thoughtful, occasionally sanctimonious  
**Bad Take Rate:** 28 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 4 / 10  
**Frequency:** recurring  
**Preferred Topics:** tradition, academics, national perception  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “You do not inherit a standard. You either maintain it every Saturday or you turn it into a museum piece.”
- “A recruit can feel when a program is selling history instead of building it.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_012 — Shonda from Memphis

**Real Name:** Shonda Bell  
**Home Base:** Memphis, Tennessee  
**Vocal Style:** smooth Mid-South cadence; funny, practical  
**Background:** barbecue joint manager, youth football mom  
**Favorite Teams:** Memphis, Tennessee  
**Persona:** G5-respect caller  
**Take Quality:** emotionally sharp and funny  
**Bad Take Rate:** 22 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 9 / 10  
**Frequency:** recurring  
**Preferred Topics:** G5 respect, player development, QB moms  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Y'all call it a trap game because you do not respect who set the trap.”
- “That quarterback's mama knows he needs development, not just a depth chart promise.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_013 — Gus in Lincoln

**Real Name:** Gus Hanrahan  
**Home Base:** Lincoln, Nebraska  
**Vocal Style:** gravelly Plains cadence; slow-burn frustration  
**Background:** farm equipment salesman, old option-football loyalist  
**Favorite Teams:** Nebraska  
**Persona:** nostalgia caller trying not to live in the past  
**Take Quality:** good on culture, outdated on tactics  
**Bad Take Rate:** 47 / 100  
**Heat Level:** 7 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** identity, line play, program rebuilds  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “I am not asking for 1995. I am asking for a fullback who scares somebody.”
- “You cannot recruit confidence. You build it, usually after two ugly Novembers.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_014 — Nina from Berkeley

**Real Name:** Nina Patel  
**Home Base:** Berkeley, California  
**Vocal Style:** precise Bay Area cadence; dry academic humor  
**Background:** statistics professor and Cal alum  
**Favorite Teams:** California, Stanford  
**Persona:** analytics-and-academics caller  
**Take Quality:** highly accurate, occasionally overcomplicates  
**Bad Take Rate:** 8 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 4 / 10  
**Frequency:** recurring  
**Preferred Topics:** academics, predictive stats, conference travel  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The model hates the travel spot, and so should anyone with a circadian rhythm.”
- “That recruit's academic fit is not flavor text. It is retention risk.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_015 — J.D. from Lubbock

**Real Name:** J.D. Holloway  
**Home Base:** Lubbock, Texas  
**Vocal Style:** West Texas drawl; talks like a man narrating wind  
**Background:** cotton farmer, Air Raid romantic  
**Favorite Teams:** Texas Tech  
**Persona:** passing-game maximalist  
**Take Quality:** right about spacing, wrong about defense  
**Bad Take Rate:** 50 / 100  
**Heat Level:** 8 / 10  
**Humor Level:** 7 / 10  
**Frequency:** occasional  
**Preferred Topics:** Air Raid, tempo, quarterbacks  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “If throwing it 48 times is wrong, why did God make hash marks?”
- “The defense gave up 42 because the offense did not score 49. That is complementary football where I come from.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_016 — Lena in Ann Arbor

**Real Name:** Lena Ross  
**Home Base:** Ann Arbor, Michigan  
**Vocal Style:** measured Michigan cadence; wry and confident  
**Background:** pediatric nurse, former marching band member  
**Favorite Teams:** Michigan  
**Persona:** big-game composure caller  
**Take Quality:** balanced and observant  
**Bad Take Rate:** 18 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** rivalries, pressure, team leadership  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The moment did not look too big for the kids. That is coaching.”
- “You can hear a nervous stadium before you can see a nervous offense.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_017 — Otis from Athens

**Real Name:** Otis Crane  
**Home Base:** Athens, Georgia  
**Vocal Style:** deep Georgia drawl; slow, funny, cutting  
**Background:** barber, local high-school football fixture  
**Favorite Teams:** Georgia  
**Persona:** defensive identity caller  
**Take Quality:** good instincts, funny overreactions  
**Bad Take Rate:** 30 / 100  
**Heat Level:** 7 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** defense, tackling, recruiting Georgia  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That safety did not tackle him. He filed a missing person report after the play.”
- “If your culture is real, it shows up on third-and-two when everybody knows the play.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_018 — Kelsey from Clemson

**Real Name:** Kelsey Rourke  
**Home Base:** Clemson, South Carolina  
**Vocal Style:** upstate Carolina cadence; bright, loyal, anxious  
**Background:** civil engineer and IPTAY family member  
**Favorite Teams:** Clemson  
**Persona:** facility-and-family-fit caller  
**Take Quality:** usually grounded  
**Bad Take Rate:** 26 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** facilities, families, staff stability  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The family visit mattered more than the highlight tape this weekend.”
- “If the coordinator rumors keep going, do not act shocked when recruits ask direct questions.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_019 — Bobby in Morgantown

**Real Name:** Bobby Flannigan  
**Home Base:** Morgantown, West Virginia  
**Vocal Style:** Appalachian twang; funny, resilient  
**Background:** coal miner's grandson, bartender on game days  
**Favorite Teams:** West Virginia, Marshall  
**Persona:** chaos-weather-underdog caller  
**Take Quality:** great vibes, shaky strategy  
**Bad Take Rate:** 58 / 100  
**Heat Level:** 8 / 10  
**Humor Level:** 9 / 10  
**Frequency:** recurring  
**Preferred Topics:** weather, upsets, rivalries  
**Bias Triggers:** rivalry losses, QB controversy, staff rumors  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “You bring a ranked team into Morgantown at night, you better pack extra common sense.”
- “I do not know what the efficiency chart said, but I know the other sideline wanted no part of that fourth quarter.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_020 — Claire from Chapel Hill

**Real Name:** Claire Henson  
**Home Base:** Chapel Hill, North Carolina  
**Vocal Style:** soft Carolina cadence; polite but ruthless  
**Background:** academic advisor, former soccer analytics intern  
**Favorite Teams:** North Carolina, Duke  
**Persona:** academics/eligibility caller  
**Take Quality:** sharp and practical  
**Bad Take Rate:** 9 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 4 / 10  
**Frequency:** occasional  
**Preferred Topics:** academics, eligibility, player support  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That is not a depth issue. That is an academic support issue wearing shoulder pads.”
- “You cannot promise a role to a player who may not be eligible in December.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_021 — Rico in Miami

**Real Name:** Rico Alvarez  
**Home Base:** Miami, Florida  
**Vocal Style:** quick South Florida cadence; swagger, comic timing  
**Background:** club promoter's son, 7-on-7 coach  
**Favorite Teams:** Miami, FIU  
**Persona:** South Florida talent caller  
**Take Quality:** great scouting eye, hype-prone  
**Bad Take Rate:** 42 / 100  
**Heat Level:** 8 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** speed, South Florida recruiting, NIL  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That kid is not raw. He is under-labeled. Different problem.”
- “If you let him leave Dade County without a serious pitch, delete the recruiting department.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_022 — Janet from Ames

**Real Name:** Janet Larkin  
**Home Base:** Ames, Iowa  
**Vocal Style:** gentle Iowa cadence; deceptively sharp  
**Background:** retired librarian, Cyclone season-ticket holder  
**Favorite Teams:** Iowa State  
**Persona:** development-and-patience caller  
**Take Quality:** very good  
**Bad Take Rate:** 14 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** development, patience, staff fit  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The freshman does not need a new position. He needs a calendar.”
- “Sometimes the best recruiting win is not ruining the player after you get him.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_023 — Walt in Knoxville

**Real Name:** Walt Satterfield  
**Home Base:** Knoxville, Tennessee  
**Vocal Style:** East Tennessee drawl; dramatic, funny  
**Background:** contractor, Vols message-board veteran  
**Favorite Teams:** Tennessee  
**Persona:** emotional rollercoaster caller  
**Take Quality:** sometimes right after yelling  
**Bad Take Rate:** 65 / 100  
**Heat Level:** 9 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** tempo, rivalries, fan pressure  
**Bias Triggers:** rivalry losses, QB controversy, staff rumors  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “I was ready to fire everybody at halftime and build statues by dinner.”
- “Do not tell me to calm down. Calm down is how you go 7-5.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_024 — Anika from Seattle

**Real Name:** Anika Moore  
**Home Base:** Seattle, Washington  
**Vocal Style:** measured Northwest cadence; skeptical and witty  
**Background:** sports medicine resident, Huskies alum  
**Favorite Teams:** Washington, Washington State  
**Persona:** travel/fatigue caller  
**Take Quality:** excellent on health and schedule  
**Bad Take Rate:** 11 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** travel, fatigue, injuries  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That road trip showed up in the third quarter, not on the injury report.”
- “If the schedule says three time zones, the practice plan better say recovery.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_025 — Pete from El Paso

**Real Name:** Pete Maldonado  
**Home Base:** El Paso, Texas  
**Vocal Style:** borderlands Texas cadence; patient, tactical  
**Background:** Army veteran and high-school special teams coach  
**Favorite Teams:** UTEP, New Mexico State  
**Persona:** special-teams truth-teller  
**Take Quality:** accurate in neglected areas  
**Bad Take Rate:** 18 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 5 / 10  
**Frequency:** occasional  
**Preferred Topics:** special teams, field position, underdogs  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “People call it luck until the same team wins field position every week.”
- “Your punter was the best player on the field. That is either a compliment or an indictment.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_026 — Sandy from State College

**Real Name:** Sandy McBride  
**Home Base:** State College, Pennsylvania  
**Vocal Style:** calm central Pennsylvania cadence; serious  
**Background:** dairy co-op accountant, Penn State alum  
**Favorite Teams:** Penn State  
**Persona:** linebacker-and-culture caller  
**Take Quality:** good, slightly conservative  
**Bad Take Rate:** 24 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 4 / 10  
**Frequency:** recurring  
**Preferred Topics:** linebackers, culture, big-game prep  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The linebackers are reading late. That is not effort, that is processing.”
- “A whiteout does not fix a bad third-down plan.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_027 — Theo in Los Angeles

**Real Name:** Theo Nguyen  
**Home Base:** Los Angeles, California  
**Vocal Style:** fast LA cadence; media-savvy, clever  
**Background:** film editor, USC grad, recruiting video hobbyist  
**Favorite Teams:** USC, UCLA  
**Persona:** brand/media caller  
**Take Quality:** smart but glam-biased  
**Bad Take Rate:** 40 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** brand, media exposure, QB recruiting  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The kid did not pick the logo. He picked the camera angle.”
- “You cannot sell Hollywood and then act surprised when players care about visibility.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_028 — Ruthie from Oxford

**Real Name:** Ruthie Danvers  
**Home Base:** Oxford, Mississippi  
**Vocal Style:** soft Mississippi cadence; poetic and sharp  
**Background:** bookstore owner, Ole Miss alum  
**Favorite Teams:** Ole Miss  
**Persona:** local-color and recruiting-visit caller  
**Take Quality:** usually insightful  
**Bad Take Rate:** 20 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** town fit, visits, offense  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A visit is not just facilities. It is whether the family can picture Sunday morning.”
- “That offense has charm, but charm does not block an edge rusher.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_029 — Mack from Baton Rouge

**Real Name:** Mack Boudreaux  
**Home Base:** Baton Rouge, Louisiana  
**Vocal Style:** gravelly Louisiana cadence; big laugh, quick temper  
**Background:** retired refinery worker, LSU tailgate captain  
**Favorite Teams:** LSU  
**Persona:** defensive line and food metaphor caller  
**Take Quality:** great eye, big exaggerator  
**Bad Take Rate:** 36 / 100  
**Heat Level:** 8 / 10  
**Humor Level:** 9 / 10  
**Frequency:** recurring  
**Preferred Topics:** defensive line, tailgates, recruiting battles  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That freshman tackle got cooked like Sunday sausage.”
- “If we cannot keep defensive linemen home, sell the stadium and buy a map.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_030 — Professor Dale from Durham

**Real Name:** Professor Dale  
**Home Base:** Durham, North Carolina  
**Vocal Style:** professorial drawl; amused and precise  
**Background:** economics lecturer, Duke fan, playoff-format nerd  
**Favorite Teams:** Duke  
**Persona:** schedule/SOS theorist  
**Take Quality:** high accuracy, low emotion  
**Bad Take Rate:** 7 / 100  
**Heat Level:** 2 / 10  
**Humor Level:** 3 / 10  
**Frequency:** occasional  
**Preferred Topics:** strength of schedule, rankings, playoff math  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Their résumé is loud, but it is not deep.”
- “Committee logic is just incentives wearing a blazer.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_031 — Tommy Two-QBs

**Real Name:** Tommy Vance  
**Home Base:** Gainesville, Florida  
**Vocal Style:** Florida drawl; enthusiastic, rarely consistent  
**Background:** car dealership salesman, Gators caller  
**Favorite Teams:** Florida  
**Persona:** bench-the-QB specialist  
**Take Quality:** frequently terrible, entertaining  
**Bad Take Rate:** 76 / 100  
**Heat Level:** 9 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** QB controversy, rivalries, hot takes  
**Bias Triggers:** rivalry losses, QB controversy, staff rumors  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “If you have two quarterbacks, you actually have three problems: both of them and the coach.”
- “I am not saying bench him forever. I am saying forever starts Saturday.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_032 — Marisol from Orlando

**Real Name:** Marisol Vega  
**Home Base:** Orlando, Florida  
**Vocal Style:** clear central Florida cadence; upbeat but practical  
**Background:** hotel manager, UCF alum  
**Favorite Teams:** UCF  
**Persona:** new-power believer  
**Take Quality:** solid, sometimes defensive  
**Bad Take Rate:** 27 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** program growth, realignment, recruiting Florida  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “People keep calling us new like the recruits were born in 1985.”
- “The brand is not old, but the opportunity is real.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_033 — Hank from Boise

**Real Name:** Hank Driscoll  
**Home Base:** Boise, Idaho  
**Vocal Style:** dry Mountain West cadence; laconic  
**Background:** truck dispatcher, Boise State lifer  
**Favorite Teams:** Boise State  
**Persona:** G5 giant-killer caller  
**Take Quality:** good on underdog strategy  
**Bad Take Rate:** 21 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** G5 playoffs, field position, identity  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “If you need permission from the committee to be good, you already lost.”
- “Development is how you turn a Tuesday recruit into a Saturday problem.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_034 — Carmen in Tucson

**Real Name:** Carmen Ortiz  
**Home Base:** Tucson, Arizona  
**Vocal Style:** warm desert Southwest cadence; observant  
**Background:** teacher, Arizona alum, weather obsessive  
**Favorite Teams:** Arizona, Arizona State  
**Persona:** weather/desert-travel caller  
**Take Quality:** underrated accuracy  
**Bad Take Rate:** 19 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** weather, travel, Pac/Mountain recruiting  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “People think heat is a storyline until their pass rush disappears in the fourth.”
- “The desert does not care about your preseason poll.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_035 — Ned from Iowa City

**Real Name:** Ned Carver  
**Home Base:** Iowa City, Iowa  
**Vocal Style:** deadpan Iowa cadence; impossibly serious about punting  
**Background:** postal worker, Iowa fan  
**Favorite Teams:** Iowa  
**Persona:** punting evangelist  
**Take Quality:** great on field position, bad on offense  
**Bad Take Rate:** 44 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 7 / 10  
**Frequency:** occasional  
**Preferred Topics:** punting, defense, field position  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A punt is just a pass to your defense.”
- “You people want fireworks. I want a 42-yard net and spiritual peace.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_036 — Priya in Tempe

**Real Name:** Priya Desai  
**Home Base:** Tempe, Arizona  
**Vocal Style:** fast, dry, sunny sarcasm  
**Background:** startup lawyer, ASU alum  
**Favorite Teams:** Arizona State  
**Persona:** NIL/compliance realist  
**Take Quality:** very sharp  
**Bad Take Rate:** 12 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** NIL, clearinghouse, compliance  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That deal was not illegal in spirit. It was stupid in paperwork.”
- “If the clearinghouse has questions, your answer cannot be 'because the booster felt generous.'”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_037 — Owen from Minneapolis

**Real Name:** Owen Madsen  
**Home Base:** Minneapolis, Minnesota  
**Vocal Style:** soft Minnesota cadence; polite but cutting  
**Background:** youth hockey coach and Gophers fan  
**Favorite Teams:** Minnesota  
**Persona:** cold-weather development caller  
**Take Quality:** solid  
**Bad Take Rate:** 23 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** weather, development, line play  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A November practice plan up here is not the same sport as September in Texas.”
- “The kid did not regress. He finally played teams that tackle.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_038 — Dee from Detroit

**Real Name:** Dee Jackson  
**Home Base:** Detroit, Michigan  
**Vocal Style:** quick Detroit cadence; direct, funny  
**Background:** auto plant supervisor, Michigan State alum  
**Favorite Teams:** Michigan State  
**Persona:** toughness and staff-accountability caller  
**Take Quality:** good, occasionally harsh  
**Bad Take Rate:** 35 / 100  
**Heat Level:** 7 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** toughness, staff, portal  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That was not a talent gap. That was a meeting-room gap.”
- “If the portal is your whole personality, do not complain when nobody feels loyal.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_039 — Ellis in Blacksburg

**Real Name:** Ellis Crowe  
**Home Base:** Blacksburg, Virginia  
**Vocal Style:** Southwest Virginia cadence; thoughtful, understated  
**Background:** forester, Virginia Tech alum  
**Favorite Teams:** Virginia Tech  
**Persona:** special-teams and atmosphere caller  
**Take Quality:** good  
**Bad Take Rate:** 17 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** atmosphere, special teams, rivalries  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That entrance still matters, but you have to give the crowd something by the second quarter.”
- “A blocked punt changes a game because it changes belief.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_040 — Lori from Honolulu

**Real Name:** Lori Kim  
**Home Base:** Honolulu, Hawaii  
**Vocal Style:** relaxed island cadence; friendly, sharp on travel  
**Background:** airline operations manager, Hawai'i fan  
**Favorite Teams:** Hawaii  
**Persona:** travel/logistics caller  
**Take Quality:** excellent on scheduling  
**Bad Take Rate:** 13 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 6 / 10  
**Frequency:** occasional  
**Preferred Topics:** travel, time zones, underdogs  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Everybody says they want to play in paradise until they try to defend tempo after a five-hour flight.”
- “Schedule math is roster math when your bodies are on airplanes.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_041 — Red from Stillwater

**Real Name:** Red McElroy  
**Home Base:** Stillwater, Oklahoma  
**Vocal Style:** raspy Oklahoma drawl; teasing and tribal  
**Background:** rancher, Oklahoma State lifer  
**Favorite Teams:** Oklahoma State  
**Persona:** rivalry troll with occasional wisdom  
**Take Quality:** mixed  
**Bad Take Rate:** 57 / 100  
**Heat Level:** 8 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** rivalries, underdog psychology, RBs  
**Bias Triggers:** rivalry losses, QB controversy, staff rumors  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “I hate to compliment them, so I will say their offensive line accidentally looked competent.”
- “You do not beat your rival by pretending they are just another game. That is loser meditation.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_042 — Bonnie from Fort Worth

**Real Name:** Bonnie Sykes  
**Home Base:** Fort Worth, Texas  
**Vocal Style:** north Texas cadence; composed and booster-aware  
**Background:** oil-and-gas accountant, TCU alum  
**Favorite Teams:** TCU, SMU  
**Persona:** donor/NIL strategy caller  
**Take Quality:** smart, slightly cynical  
**Bad Take Rate:** 22 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** boosters, NIL, private school recruiting  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Money is not the plan. Money funds the plan. Those are different sentences.”
- “If the donor wants influence, ask if he also wants to learn blitz pickup.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_043 — Eli in Philadelphia

**Real Name:** Eli Rosen  
**Home Base:** Philadelphia, Pennsylvania  
**Vocal Style:** fast Philly cadence; impatient, funny  
**Background:** public defender, Temple fan  
**Favorite Teams:** Temple, Penn State  
**Persona:** big-city G5 chip-on-shoulder caller  
**Take Quality:** fun and sometimes right  
**Bad Take Rate:** 49 / 100  
**Heat Level:** 8 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** G5 disrespect, defense, coaching  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “You call it ugly football. I call it budget efficiency.”
- “If our coach wins eight games, half the country calls him a genius and the other half hires him.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_044 — June from Waco

**Real Name:** June Calloway  
**Home Base:** Waco, Texas  
**Vocal Style:** gentle central Texas cadence; church-social warmth  
**Background:** nurse, Baylor alum  
**Favorite Teams:** Baylor  
**Persona:** player-welfare and culture caller  
**Take Quality:** very grounded  
**Bad Take Rate:** 11 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** team culture, player meetings, academics  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That young man did not need a benching. He needed somebody to tell him the truth kindly.”
- “Culture is not a poster. It is what happens when a backup is disappointed and still practices.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_045 — Artie from Chestnut Hill

**Real Name:** Artie Mancuso  
**Home Base:** Chestnut Hill, Massachusetts  
**Vocal Style:** Boston sports cadence; dry and skeptical  
**Background:** union electrician, Boston College fan  
**Favorite Teams:** Boston College  
**Persona:** defensive cynic  
**Take Quality:** decent, very grouchy  
**Bad Take Rate:** 39 / 100  
**Heat Level:** 7 / 10  
**Humor Level:** 6 / 10  
**Frequency:** occasional  
**Preferred Topics:** defense, coaching, ACC chaos  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “I have seen seafood with better gap integrity.”
- “If your plan needs the quarterback to be perfect, it is not a plan. It is a candlelight vigil.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_046 — Sarah Beth from Auburn

**Real Name:** Sarah Beth Clay  
**Home Base:** Auburn, Alabama  
**Vocal Style:** Alabama plains cadence; warm but sharp  
**Background:** real estate agent, Auburn alum  
**Favorite Teams:** Auburn  
**Persona:** chaos-acceptance caller  
**Take Quality:** unpredictably insightful  
**Bad Take Rate:** 48 / 100  
**Heat Level:** 8 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** rivalry chaos, boosters, QB nerves  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “At Auburn, momentum is just anxiety with a marching band.”
- “You cannot build a stable program if everybody with a checkbook thinks they are offensive coordinator.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_047 — Drew from San Jose

**Real Name:** Drew Nakamura  
**Home Base:** San Jose, California  
**Vocal Style:** calm Silicon Valley cadence; spreadsheet meets surfer  
**Background:** data engineer, San Jose State fan  
**Favorite Teams:** San Jose State, Stanford  
**Persona:** underdog analytics caller  
**Take Quality:** accurate  
**Bad Take Rate:** 9 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 4 / 10  
**Frequency:** recurring  
**Preferred Topics:** analytics, G5, QB efficiency  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The upset was not magic. It was red-zone variance and a quarterback who stopped throwing hero balls.”
- “If your model ignores travel, your model has never been on a bus.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_048 — Gloria from Syracuse

**Real Name:** Gloria Ames  
**Home Base:** Syracuse, New York  
**Vocal Style:** upstate New York cadence; weathered and witty  
**Background:** snowplow dispatcher, Syracuse fan  
**Favorite Teams:** Syracuse  
**Persona:** weather-and-old-Big-East caller  
**Take Quality:** solid  
**Bad Take Rate:** 29 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** weather, basketball-school jokes, defense  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A dome does not make you soft. It just means you own a roof.”
- “That linebacker read the screen like he had seen the script.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_049 — Kenny from Lexington

**Real Name:** Kenny Yates  
**Home Base:** Lexington, Kentucky  
**Vocal Style:** Kentucky drawl; self-deprecating, sly  
**Background:** horse farm mechanic, Kentucky fan  
**Favorite Teams:** Kentucky  
**Persona:** underdog SEC realist  
**Take Quality:** good  
**Bad Take Rate:** 26 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** SEC depth, development, expectations  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “We do not need to be Alabama. We need to stop acting surprised when we recruit like Kentucky and play like Kentucky.”
- “The portal is not a miracle. It is a pawn shop for roster mistakes.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_050 — Monica from San Antonio

**Real Name:** Monica Reyes  
**Home Base:** San Antonio, Texas  
**Vocal Style:** smooth South Texas cadence; confident, relational  
**Background:** high-school counselor, UTSA fan  
**Favorite Teams:** UTSA, Texas A&M  
**Persona:** family/recruiting fit caller  
**Take Quality:** very sharp  
**Bad Take Rate:** 12 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 6 / 10  
**Frequency:** occasional  
**Preferred Topics:** family influence, Texas recruiting, academics  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The family visit was the real official visit.”
- “If you ignore the mom's question about development, you lose before the NIL number comes out.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_051 — Chip in Nashville

**Real Name:** Chip Harrington  
**Home Base:** Nashville, Tennessee  
**Vocal Style:** polished southern business cadence  
**Background:** music publisher, Vanderbilt fan  
**Favorite Teams:** Vanderbilt  
**Persona:** academic/private-school realist  
**Take Quality:** sharp, dry  
**Bad Take Rate:** 18 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** academics, private schools, smart recruiting  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “You do not recruit the same pool. Stop pretending you do.”
- “Our margin is evaluation. If we miss there, the math gets rude.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_052 — Jasmine from Houston

**Real Name:** Jasmine Brooks  
**Home Base:** Houston, Texas  
**Vocal Style:** quick Houston cadence; energetic and practical  
**Background:** AAU organizer, Houston fan  
**Favorite Teams:** Houston  
**Persona:** urban talent and NIL caller  
**Take Quality:** good, sometimes hype  
**Bad Take Rate:** 33 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** Houston talent, NIL, speed  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “There are three future starters within an hour of campus, and somehow we are arguing about a kid in Arizona.”
- “If your pitch ignores the city, you are leaving half the offer on the table.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_053 — Warren from Pullman

**Real Name:** Warren Pope  
**Home Base:** Pullman, Washington  
**Vocal Style:** slow rural Washington cadence; dry and loyal  
**Background:** wheat farmer, Washington State fan  
**Favorite Teams:** Washington State  
**Persona:** small-town fit caller  
**Take Quality:** thoughtful  
**Bad Take Rate:** 20 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** small towns, QB development, underdogs  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Some kids do not want lights. They want people who know their truck.”
- “Pullman is not for everybody. That is the advantage and the problem.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_054 — Bri from College Park

**Real Name:** Brianna Cole  
**Home Base:** College Park, Maryland  
**Vocal Style:** DMV cadence; quick, skeptical, funny  
**Background:** communications director, Maryland fan  
**Favorite Teams:** Maryland  
**Persona:** uniforms/recruiting/brand caller  
**Take Quality:** mixed but entertaining  
**Bad Take Rate:** 40 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** uniforms, DMV recruiting, brand  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The uniforms were loud, but the defensive calls were louder and worse.”
- “If you recruit the DMV like an afterthought, do not be shocked when the best kids treat you like one.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_055 — Lou from Storrs

**Real Name:** Lou Rinaldi  
**Home Base:** Storrs, Connecticut  
**Vocal Style:** New England deadpan; absurdly loyal  
**Background:** small-town diner owner, UConn football defender  
**Favorite Teams:** UConn  
**Persona:** independent/G5 survival caller  
**Take Quality:** fun, pessimistic  
**Bad Take Rate:** 52 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 7 / 10  
**Frequency:** occasional  
**Preferred Topics:** independents, scheduling, survival  
**Bias Triggers:** rivalry losses, QB controversy, staff rumors  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “We are not irrelevant. We are selectively visible.”
- “A win is a win, unless the schedule maker is your enemy, which ours appears to be.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_056 — Hector from Fresno

**Real Name:** Hector Salazar  
**Home Base:** Fresno, California  
**Vocal Style:** Central Valley cadence; blunt and proud  
**Background:** produce distributor, Fresno State fan  
**Favorite Teams:** Fresno State  
**Persona:** development factory caller  
**Take Quality:** good  
**Bad Take Rate:** 19 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** development, California recruiting, G5 grit  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A three-star with work ethic is not a consolation prize. It is a business model.”
- “We do not lose recruits because of stars. We lose them when we stop knowing who we are.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_057 — Evelyn in Charlottesville

**Real Name:** Evelyn Turner  
**Home Base:** Charlottesville, Virginia  
**Vocal Style:** soft Virginia cadence; thoughtful, slightly academic  
**Background:** historian, Virginia fan  
**Favorite Teams:** Virginia  
**Persona:** program identity historian  
**Take Quality:** accurate, low heat  
**Bad Take Rate:** 11 / 100  
**Heat Level:** 2 / 10  
**Humor Level:** 4 / 10  
**Frequency:** recurring  
**Preferred Topics:** history, academics, slow builds  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A program can be patient without being passive.”
- “Tradition is useful only if it tells you what to do next.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_058 — Duke from Fayetteville

**Real Name:** Duke Lawson  
**Home Base:** Fayetteville, Arkansas  
**Vocal Style:** Arkansas drawl; funny, tortured  
**Background:** poultry plant supervisor, Razorbacks fan  
**Favorite Teams:** Arkansas  
**Persona:** rivalry pain caller  
**Take Quality:** emotionally true, strategically erratic  
**Bad Take Rate:** 59 / 100  
**Heat Level:** 8 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** rivalries, line play, coach patience  
**Bias Triggers:** rivalry losses, QB controversy, staff rumors  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “Our fans do not need therapy. We need third-down stops, which is cheaper.”
- “If hope had a depth chart, we would still be thin at safety.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_059 — Mina from Champaign

**Real Name:** Mina Cho  
**Home Base:** Champaign, Illinois  
**Vocal Style:** calm central Illinois cadence; analytical  
**Background:** graduate researcher, Illinois fan  
**Favorite Teams:** Illinois, Northwestern  
**Persona:** quiet analytics caller  
**Take Quality:** very good  
**Bad Take Rate:** 8 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 4 / 10  
**Frequency:** recurring  
**Preferred Topics:** development, scheme fit, analytics  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The staff is recruiting athletes for a system they do not actually run.”
- “Their best player is not misused. He is being used in a role from a different roster.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_060 — Zo from Atlanta

**Real Name:** Alonzo Reed  
**Home Base:** Atlanta, Georgia  
**Vocal Style:** smooth Atlanta cadence; confident, witty  
**Background:** 7-on-7 organizer, Georgia Tech sympathizer  
**Favorite Teams:** Georgia Tech, Georgia State  
**Persona:** metro recruiting caller  
**Take Quality:** sharp eye, high swagger  
**Bad Take Rate:** 30 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 7 / 10  
**Frequency:** occasional  
**Preferred Topics:** Atlanta recruiting, scheme fit, athletes  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Everybody recruits Atlanta. The question is who actually knows which coach to call.”
- “That kid is not a tweener. He is a position change waiting for a smart staff.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_061 — Paula from Provo

**Real Name:** Paula McGee  
**Home Base:** Provo, Utah  
**Vocal Style:** clean Mountain West cadence; measured, family-focused  
**Background:** family therapist, BYU fan  
**Favorite Teams:** BYU, Utah  
**Persona:** family/culture caller  
**Take Quality:** very good  
**Bad Take Rate:** 13 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** family fit, culture, travel  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Some recruits are choosing the staff dinner more than the stadium.”
- “Culture fit is not soft. It is retention math.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_062 — Rex in Albuquerque

**Real Name:** Rex Sandoval  
**Home Base:** Albuquerque, New Mexico  
**Vocal Style:** dry high-desert cadence; understated humor  
**Background:** paramedic, New Mexico fan  
**Favorite Teams:** New Mexico  
**Persona:** chaos underdog caller  
**Take Quality:** fun, modestly accurate  
**Bad Take Rate:** 45 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** underdogs, weather, defense  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “We do not need a miracle. We need two turnovers and a kicker with no imagination.”
- “At altitude, depth is not a luxury. It is oxygen with a jersey.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_063 — Cora from East Lansing

**Real Name:** Cora Whitfield  
**Home Base:** East Lansing, Michigan  
**Vocal Style:** firm Michigan cadence; pragmatic  
**Background:** school principal, Michigan State alum  
**Favorite Teams:** Michigan State  
**Persona:** discipline/culture caller  
**Take Quality:** sharp  
**Bad Take Rate:** 16 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** discipline, locker room, staff  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That was not passion. That was poor discipline wearing a helmet.”
- “If the captains are quiet, the coach is doing too much of the talking.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_064 — Terry from Cincinnati

**Real Name:** Terry O'Neil  
**Home Base:** Cincinnati, Ohio  
**Vocal Style:** Ohio River cadence; fast, funny, chip-on-shoulder  
**Background:** firefighter, Cincinnati fan  
**Favorite Teams:** Cincinnati  
**Persona:** realignment resentment caller  
**Take Quality:** good and salty  
**Bad Take Rate:** 35 / 100  
**Heat Level:** 7 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** realignment, G5/P4, defense  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “They only call you a Cinderella when they do not want to admit you recruit.”
- “Respect is just a ranking with better manners.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_065 — Aunt Jo from Starkville

**Real Name:** Aunt Jo  
**Home Base:** Starkville, Mississippi  
**Vocal Style:** Mississippi auntie cadence; warm but devastating  
**Background:** retired cafeteria manager, Mississippi State fan  
**Favorite Teams:** Mississippi State  
**Persona:** common-sense caller  
**Take Quality:** often exactly right  
**Bad Take Rate:** 18 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 9 / 10  
**Frequency:** occasional  
**Preferred Topics:** team vibe, QB confidence, recruiting families  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That boy needs a hug and a private conversation, not a depth chart leak.”
- “You cannot sell family and then treat backups like furniture.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_066 — Blaine from Manhattan

**Real Name:** Blaine Mercer  
**Home Base:** Manhattan, Kansas  
**Vocal Style:** Kansas plains cadence; steady and dry  
**Background:** grain elevator operator, Kansas State fan  
**Favorite Teams:** Kansas State  
**Persona:** development-and-coaching caller  
**Take Quality:** excellent  
**Bad Take Rate:** 10 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** development, underdog systems, coaching  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The difference between clever and cute is whether the left tackle can block it.”
- “A good program makes a four-year plan for a player everybody else wanted for one weekend.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_067 — Renee from New Orleans

**Real Name:** Renee Batiste  
**Home Base:** New Orleans, Louisiana  
**Vocal Style:** New Orleans cadence; witty, musical, a little theatrical  
**Background:** jazz club booker, Tulane fan  
**Favorite Teams:** Tulane, LSU  
**Persona:** city identity caller  
**Take Quality:** good, funny  
**Bad Take Rate:** 27 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** city fit, G5 pride, NIL local business  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Some schools sell facilities. We sell a city that knows how to make a Saturday feel expensive.”
- “That recruit did not decommit. He got re-recruited by somebody with a better closer.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_068 — Harold from West Lafayette

**Real Name:** Harold Finch  
**Home Base:** West Lafayette, Indiana  
**Vocal Style:** quiet Indiana cadence; engineer precision  
**Background:** retired mechanical engineer, Purdue fan  
**Favorite Teams:** Purdue  
**Persona:** spoiler math caller  
**Take Quality:** accurate, low emotion  
**Bad Take Rate:** 14 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 4 / 10  
**Frequency:** recurring  
**Preferred Topics:** upsets, QBs, efficiency  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The upset was visible by the second drive if you were watching pressure rate.”
- “This team does not need more magic. It needs a second corner who can turn his hips.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_069 — Lacey from Lawrence

**Real Name:** Lacey Monroe  
**Home Base:** Lawrence, Kansas  
**Vocal Style:** friendly Kansas cadence; newly optimistic  
**Background:** coffee shop owner, Kansas fan  
**Favorite Teams:** Kansas  
**Persona:** hopeful rebuild caller  
**Take Quality:** balanced, emotionally invested  
**Bad Take Rate:** 23 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** rebuilds, basketball-school jokes, momentum  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “When a fanbase learns to expect competent football, that is a dangerous week.”
- “Do not laugh. Hope is a scheme if you recruit to it.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_070 — Ramon from Las Vegas

**Real Name:** Ramon Ellis  
**Home Base:** Las Vegas, Nevada  
**Vocal Style:** smooth Vegas cadence; odds-aware but not gambling-branded  
**Background:** hotel security manager, UNLV fan  
**Favorite Teams:** UNLV  
**Persona:** market/flash caller  
**Take Quality:** mixed but insightful on brand  
**Bad Take Rate:** 38 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 7 / 10  
**Frequency:** occasional  
**Preferred Topics:** market, brand, stadium atmosphere  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The city can sell the visit. The staff still has to sell the plan.”
- “Flash gets him on campus. Fit gets him to sign.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_071 — Debbie from Hattiesburg

**Real Name:** Debbie Knox  
**Home Base:** Hattiesburg, Mississippi  
**Vocal Style:** piney-woods Mississippi cadence; direct, maternal  
**Background:** church secretary, Southern Miss fan  
**Favorite Teams:** Southern Miss  
**Persona:** local pipeline caller  
**Take Quality:** good  
**Bad Take Rate:** 16 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** local recruiting, development, G5 pride  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “You do not need to win every living room. Win the ones where your name already means something.”
- “A local kid who wants to be there is worth more than a rental with better stars.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_072 — Seth from San Diego

**Real Name:** Seth Aranda  
**Home Base:** San Diego, California  
**Vocal Style:** laid-back coastal cadence; sneaky tactical  
**Background:** surf shop owner, SDSU fan  
**Favorite Teams:** San Diego State  
**Persona:** defense and weather-comfort caller  
**Take Quality:** good  
**Bad Take Rate:** 20 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** defense, West Coast recruiting, stadium  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The best recruiting pitch is sometimes 72 degrees and a depth chart opening.”
- “That defense does not wow you. It just keeps asking if you are sure.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_073 — Imani from Louisville

**Real Name:** Imani Price  
**Home Base:** Louisville, Kentucky  
**Vocal Style:** quick Kentucky city cadence; sharp, funny  
**Background:** sports-radio producer, Louisville fan  
**Favorite Teams:** Louisville  
**Persona:** media narrative caller  
**Take Quality:** sharp but spicy  
**Bad Take Rate:** 31 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** media, coaching, rivalries  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The headline writes itself when the coach refuses to adjust.”
- “Fans are not mad about losing. They are mad because it looked familiar.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_074 — Carl from Reno

**Real Name:** Carl Benedetti  
**Home Base:** Reno, Nevada  
**Vocal Style:** dry Nevada cadence; gambler's patience without betting talk  
**Background:** casino maintenance supervisor, Nevada fan  
**Favorite Teams:** Nevada  
**Persona:** variance caller  
**Take Quality:** better than he sounds  
**Bad Take Rate:** 33 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** variance, QB development, upsets  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Volatility is not chaos if you recruit players who can live in it.”
- “A close loss is data. Three close losses is a personality.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_075 — Yolanda from Birmingham

**Real Name:** Yolanda Harris  
**Home Base:** Birmingham, Alabama  
**Vocal Style:** firm Birmingham cadence; seasoned, no nonsense  
**Background:** youth mentor, UAB fan, Alabama family ties  
**Favorite Teams:** UAB, Alabama  
**Persona:** player-welfare and local-talent caller  
**Take Quality:** excellent  
**Bad Take Rate:** 9 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 6 / 10  
**Frequency:** occasional  
**Preferred Topics:** player support, local recruiting, development  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That kid needs structure, not slogans.”
- “If you recruit the city only when desperate, the city remembers.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_076 — Trevor from Logan

**Real Name:** Trevor Pike  
**Home Base:** Logan, Utah  
**Vocal Style:** Mountain West cadence; optimistic, scout-like  
**Background:** ski shop tech, Utah State fan  
**Favorite Teams:** Utah State  
**Persona:** hidden-gem hunter  
**Take Quality:** good but hopeful  
**Bad Take Rate:** 24 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** hidden gems, development, G5  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “He is not a two-star. He is a late body with early film.”
- “Give me a kid who wants the weight room and a staff that knows what to do with him.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_077 — Phyllis from Winston-Salem

**Real Name:** Phyllis Grant  
**Home Base:** Winston-Salem, North Carolina  
**Vocal Style:** gentle but incisive Carolina cadence  
**Background:** retired administrator, Wake Forest fan  
**Favorite Teams:** Wake Forest  
**Persona:** small-school development caller  
**Take Quality:** very good  
**Bad Take Rate:** 12 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** development, academics, fit  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The margin is fit. If you miss that, stars will not save you.”
- “A small program cannot afford to be confused about its own identity.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_078 — Damon from Boulder

**Real Name:** Damon Krieger  
**Home Base:** Boulder, Colorado  
**Vocal Style:** Colorado cadence; philosophical and occasionally smug  
**Background:** outdoor gear marketer, Colorado fan  
**Favorite Teams:** Colorado, Colorado State  
**Persona:** brand/altitude caller  
**Take Quality:** mixed  
**Bad Take Rate:** 43 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** brand, altitude, media  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The attention is not the problem. The problem is pretending attention is a depth chart.”
- “Altitude is a real advantage, but it does not cover busted coverage.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_079 — Nickie from Denton

**Real Name:** Nickie Wade  
**Home Base:** Denton, Texas  
**Vocal Style:** North Texas artsy cadence; fast and funny  
**Background:** music venue booker, North Texas fan  
**Favorite Teams:** North Texas  
**Persona:** tempo and vibes caller  
**Take Quality:** good on offense, loose elsewhere  
**Bad Take Rate:** 36 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** tempo, G5 offense, crowd  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That offense is a mixtape with a snap count.”
- “If you are going to play fast, recruit linemen who do not need a nap after drive three.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_080 — Russ from Honolulu via Provo

**Real Name:** Russell Tang  
**Home Base:** Salt Lake City, Utah  
**Vocal Style:** measured, precise, soft island influence  
**Background:** logistics analyst, follows Utah/BYU/Hawaii  
**Favorite Teams:** Utah, BYU, Hawaii  
**Persona:** travel-and-fit national caller  
**Take Quality:** highly accurate  
**Bad Take Rate:** 8 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 4 / 10  
**Frequency:** occasional  
**Preferred Topics:** travel, conference scheduling, player fit  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Conference maps are cute until your freshman tackle is crossing two time zones every other week.”
- “Travel turns depth from a spreadsheet category into a medical report.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_081 — Maeve from Evanston

**Real Name:** Maeve Donnelly  
**Home Base:** Evanston, Illinois  
**Vocal Style:** suburban Chicago cadence; dry academic sarcasm  
**Background:** law professor, Northwestern fan  
**Favorite Teams:** Northwestern  
**Persona:** academics and institutional patience caller  
**Take Quality:** sharp  
**Bad Take Rate:** 11 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** academics, institutional fit, coach patience  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “At some schools, the hardest opponent is the admissions office.”
- “A rebuild at a place like this has to be honest or it will be short.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_082 — Bo from College Station

**Real Name:** Bo Redding  
**Home Base:** College Station, Texas  
**Vocal Style:** Aggie cadence; earnest, intense, ritual-heavy  
**Background:** civil contractor, Texas A&M fan  
**Favorite Teams:** Texas A&M  
**Persona:** resources-and-expectations caller  
**Take Quality:** smart but pressure-blind  
**Bad Take Rate:** 46 / 100  
**Heat Level:** 8 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** boosters, facilities, expectations  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “Money does not buy patience. Sometimes it buys the opposite in bulk.”
- “If the facilities are top five, the excuses better be bottom five.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_083 — Iris from Orlando

**Real Name:** Iris Campbell  
**Home Base:** Orlando, Florida  
**Vocal Style:** bright central Florida cadence; recruiting-news speed  
**Background:** theme-park operations lead, UCF fan  
**Favorite Teams:** UCF  
**Persona:** visitor-experience caller  
**Take Quality:** good  
**Bad Take Rate:** 22 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** visits, campus experience, brand  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A visit weekend is operations. If the family waits around confused, you lost points nobody tracks.”
- “The kid liked the offense. The parents liked the plan. That is how you close.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_084 — Q from Norfolk

**Real Name:** Quentin Moss  
**Home Base:** Norfolk, Virginia  
**Vocal Style:** Tidewater cadence; quick, serious about athletes  
**Background:** naval shipyard worker, Old Dominion fan  
**Favorite Teams:** Old Dominion, Virginia Tech  
**Persona:** Tidewater talent caller  
**Take Quality:** good scout  
**Bad Take Rate:** 25 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** Virginia recruiting, athletes, G5  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “You cannot call this area underrated if everybody keeps rating it and leaving with players.”
- “That safety is one good position coach from being a problem on Sundays.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_085 — Linda from Bloomington

**Real Name:** Linda Park  
**Home Base:** Bloomington, Indiana  
**Vocal Style:** soft Indiana cadence; wry, patient  
**Background:** music teacher, Indiana fan  
**Favorite Teams:** Indiana  
**Persona:** basketball-school football believer  
**Take Quality:** balanced  
**Bad Take Rate:** 21 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 6 / 10  
**Frequency:** occasional  
**Preferred Topics:** program building, fan belief, QB play  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The hardest thing to recruit here is belief, and winning helps.”
- “A competent Saturday changes more in town than people think.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_086 — Rafa from Tampa

**Real Name:** Rafael Cruz  
**Home Base:** Tampa, Florida  
**Vocal Style:** Tampa cadence; direct, talent-focused  
**Background:** personal trainer, USF fan  
**Favorite Teams:** South Florida, Florida  
**Persona:** athletic-traits caller  
**Take Quality:** good but trait-obsessed  
**Bad Take Rate:** 35 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** speed, strength, Florida recruiting  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That kid has track speed and football brakes. Teach him the rest.”
- “You cannot coach slow into fast, but you can coach fast into the wrong gap.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_087 — Eddie from Missoula

**Real Name:** Eddie Barlow  
**Home Base:** Missoula, Montana  
**Vocal Style:** Northern Rockies cadence; calm outdoorsman  
**Background:** fly-fishing guide, FCS respecter  
**Favorite Teams:** Montana, Boise State  
**Persona:** small-program toughness caller  
**Take Quality:** good  
**Bad Take Rate:** 17 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** development, small programs, weather  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A cold-weather road game tests whether your culture packed a jacket.”
- “Some of these so-called cupcakes have teeth.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_088 — Alicia from Dallas

**Real Name:** Alicia Benton  
**Home Base:** Dallas, Texas  
**Vocal Style:** polished Dallas cadence; businesslike and sharp  
**Background:** corporate recruiter, SMU alum  
**Favorite Teams:** SMU, TCU  
**Persona:** NIL market and private-school caller  
**Take Quality:** sharp  
**Bad Take Rate:** 18 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** NIL, market, private school recruiting  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A strong market gets you in the conversation. A clear role gets the signature.”
- “If the deal looks inflated, you better have a brand story to justify it.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_089 — Curtis from Jonesboro

**Real Name:** Curtis Lane  
**Home Base:** Jonesboro, Arkansas  
**Vocal Style:** Delta cadence; understated and dry  
**Background:** rice farmer, Arkansas State fan  
**Favorite Teams:** Arkansas State  
**Persona:** Sun Belt chaos caller  
**Take Quality:** fun, decent  
**Bad Take Rate:** 34 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** Sun Belt, upsets, travel  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The Sun Belt is where preseason confidence goes to lose a fender.”
- “If you schedule us for a cheap win, bring expensive humility.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_090 — Molly from Amherst

**Real Name:** Molly Keane  
**Home Base:** Amherst, Massachusetts  
**Vocal Style:** New England college-town cadence; self-aware  
**Background:** bookstore clerk, UMass fan  
**Favorite Teams:** UMass  
**Persona:** independent survival humor caller  
**Take Quality:** funny, bleak  
**Bad Take Rate:** 55 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 8 / 10  
**Frequency:** occasional  
**Preferred Topics:** independents, scheduling, hope  
**Bias Triggers:** rivalry losses, QB controversy, staff rumors  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “We are building character at a rate that should concern engineers.”
- “An open date is our best defensive performance some weeks.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_091 — Dee Hill from Jackson

**Real Name:** DeAndre Hill  
**Home Base:** Jackson, Mississippi  
**Vocal Style:** Jackson cadence; smooth, serious  
**Background:** community organizer, Jackson State/SEC recruiting watcher  
**Favorite Teams:** Jackson State, Mississippi State, Ole Miss  
**Persona:** Mississippi talent and HBCU respect caller  
**Take Quality:** sharp  
**Bad Take Rate:** 15 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** HBCUs, Mississippi recruiting, development  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “If you only notice a kid after somebody else offers, that is not scouting. That is following.”
- “Development is respect with a weight room.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_092 — Tucker from Bozeman

**Real Name:** Tucker Bell  
**Home Base:** Bozeman, Montana  
**Vocal Style:** Mountain cadence; humble, dry humor  
**Background:** ski patrol, Montana State fan  
**Favorite Teams:** Montana State, Wyoming  
**Persona:** cold-weather grind caller  
**Take Quality:** good  
**Bad Take Rate:** 20 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** weather, defense, underdogs  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Some teams play November football like they packed for July.”
- “You learn a lot about a quarterback when his hands are cold and the pocket is loud.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_093 — Simone from Atlanta

**Real Name:** Simone Carter  
**Home Base:** Atlanta, Georgia  
**Vocal Style:** smooth Atlanta cadence; media-aware and funny  
**Background:** sports marketing grad student, follows national recruiting  
**Favorite Teams:** Georgia, Georgia Tech  
**Persona:** brand plus development caller  
**Take Quality:** very sharp  
**Bad Take Rate:** 16 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** brand, development, recruiting  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The brand got him to answer. The development plan got him to listen.”
- “A visit weekend should not feel like a commercial. It should feel like a future.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_094 — Nolan from Huntington

**Real Name:** Nolan Briggs  
**Home Base:** Huntington, West Virginia  
**Vocal Style:** Appalachian cadence; earnest and funny  
**Background:** paramedic, Marshall fan  
**Favorite Teams:** Marshall, West Virginia  
**Persona:** rivalry and underdog caller  
**Take Quality:** solid  
**Bad Take Rate:** 28 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** rivalries, underdogs, G5  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A rivalry game does not care what conference you printed on the media guide.”
- “We do not need national respect. We need a left tackle and three red-zone stops.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_095 — Gina from Fort Collins

**Real Name:** Gina Martel  
**Home Base:** Fort Collins, Colorado  
**Vocal Style:** easy Colorado cadence; tactical and outdoorsy  
**Background:** brewery manager, Colorado State fan  
**Favorite Teams:** Colorado State  
**Persona:** facility/town-fit caller  
**Take Quality:** good  
**Bad Take Rate:** 19 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 6 / 10  
**Frequency:** occasional  
**Preferred Topics:** town fit, facilities, development  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A recruit either feels Fort Collins or he does not. Pretending otherwise wastes visits.”
- “You cannot sell lifestyle if the development plan is a napkin.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_096 — Marcus from Atlanta's Westside

**Real Name:** Marcus Wynn  
**Home Base:** Atlanta, Georgia  
**Vocal Style:** direct Atlanta cadence; former-player clarity  
**Background:** former FCS corner, trainer  
**Favorite Teams:** Georgia State, Auburn  
**Persona:** DB technique caller  
**Take Quality:** excellent  
**Bad Take Rate:** 9 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** DBs, technique, hips  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That corner has speed, but his hips are sending postcards after every break.”
- “Man coverage is not confidence. It is footwork plus consequences.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_097 — Pat from Spokane

**Real Name:** Pat O'Day  
**Home Base:** Spokane, Washington  
**Vocal Style:** dry inland Northwest cadence  
**Background:** radio engineer, Washington State sympathizer  
**Favorite Teams:** Washington State, Idaho  
**Persona:** radio/meta caller  
**Take Quality:** funny and observant  
**Bad Take Rate:** 24 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** radio shows, small markets, weather  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The best call-in shows are just weather reports with linebackers.”
- “You can hear a program panic by how fast the callers start naming coordinators.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_098 — Cheryl from Laramie

**Real Name:** Cheryl Baines  
**Home Base:** Laramie, Wyoming  
**Vocal Style:** high plains cadence; calm, tough  
**Background:** school bus driver, Wyoming fan  
**Favorite Teams:** Wyoming  
**Persona:** weather/toughness caller  
**Take Quality:** good  
**Bad Take Rate:** 18 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** weather, toughness, G5  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “If the wind changes your whole offense, your offense was a brochure.”
- “A kid who chooses Laramie usually knows exactly who he is.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_099 — Omar from Charlotte

**Real Name:** Omar Wallace  
**Home Base:** Charlotte, North Carolina  
**Vocal Style:** urban Carolina cadence; businesslike, recruiting-savvy  
**Background:** financial analyst, Charlotte fan  
**Favorite Teams:** Charlotte, North Carolina  
**Persona:** market-building caller  
**Take Quality:** solid  
**Bad Take Rate:** 22 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** new programs, market, recruiting  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A market is not a program, but it is a tool. Use it or stop mentioning it.”
- “You cannot build a city brand with a rural recruiting plan.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_100 — Faye from Toledo

**Real Name:** Faye Thompson  
**Home Base:** Toledo, Ohio  
**Vocal Style:** Midwestern blue-collar cadence; clipped and funny  
**Background:** union steward, Toledo fan  
**Favorite Teams:** Toledo, Bowling Green  
**Persona:** MACtion caller  
**Take Quality:** fun, right about chaos  
**Bad Take Rate:** 37 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 8 / 10  
**Frequency:** occasional  
**Preferred Topics:** MAC, weekday games, upsets  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Tuesday night football is where rankings go to cough.”
- “If you do not respect the MAC, the MAC will respect you horizontally.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_101 — Ethan from Dallas

**Real Name:** Ethan Price  
**Home Base:** Dallas, Texas  
**Vocal Style:** young Dallas sports-podcast cadence  
**Background:** college student, recruiting TikTok addict  
**Favorite Teams:** Texas, Oklahoma, SMU  
**Persona:** young recruiting hype caller  
**Take Quality:** fast, often wrong but funny  
**Bad Take Rate:** 67 / 100  
**Heat Level:** 8 / 10  
**Humor Level:** 9 / 10  
**Frequency:** recurring  
**Preferred Topics:** stars, commits, NIL hype  
**Bias Triggers:** rivalry losses, QB controversy, staff rumors  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “If he posts the eyes emoji, I am counting it as a silent commit until my lawyer says otherwise.”
- “Three crystal balls and a playlist change? He is ours. Probably. Maybe.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_102 — Barb from Happy Valley

**Real Name:** Barbara Quinn  
**Home Base:** State College, Pennsylvania  
**Vocal Style:** calm Pennsylvania cadence; maternal and principled  
**Background:** retired school counselor, Penn State fan  
**Favorite Teams:** Penn State  
**Persona:** player support caller  
**Take Quality:** excellent  
**Bad Take Rate:** 10 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** player welfare, development, academics  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The young man looks overwhelmed, and no spreadsheet fixes overwhelmed.”
- “Good coaches know when to push and when to sit down with the kid.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_103 — Andre from Lafayette

**Real Name:** Andre Baptiste  
**Home Base:** Lafayette, Louisiana  
**Vocal Style:** Cajun-influenced Louisiana cadence; quick and tactical  
**Background:** offensive analyst at a high school, Louisiana fan  
**Favorite Teams:** Louisiana, LSU  
**Persona:** scheme-fit caller  
**Take Quality:** very good  
**Bad Take Rate:** 12 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** scheme fit, QB/RB, Louisiana recruiting  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That recruit is not a bad take. He is a bad take for that offense.”
- “Fit is not an excuse for lower talent. It is how lower talent beats you.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_104 — Wayne from Tallahassee

**Real Name:** Wayne Pritchard  
**Home Base:** Tallahassee, Florida  
**Vocal Style:** grumpy Panhandle cadence; extremely online  
**Background:** retired state worker, FSU fan  
**Favorite Teams:** Florida State  
**Persona:** message-board meltdown caller  
**Take Quality:** terrible but hilarious when angry  
**Bad Take Rate:** 78 / 100  
**Heat Level:** 9 / 10  
**Humor Level:** 9 / 10  
**Frequency:** recurring  
**Preferred Topics:** hot seats, QB benching, rivalries  
**Bias Triggers:** rivalry losses, QB controversy, staff rumors  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “Fire the play sheet. Not the coach. The play sheet.”
- “If the backup is not better, why have my dreams invested so much in him?”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_105 — Maya from New Brunswick

**Real Name:** Maya Singh  
**Home Base:** New Brunswick, New Jersey  
**Vocal Style:** clear Jersey cadence; thoughtful, data-aware  
**Background:** medical student, Rutgers fan  
**Favorite Teams:** Rutgers  
**Persona:** player health and expectations caller  
**Take Quality:** sharp  
**Bad Take Rate:** 11 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** occasional  
**Preferred Topics:** health, expectations, Big Ten travel  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “There is a difference between tough and exhausted. This team crossed it after the bye somehow.”
- “Development plans need sleep and calories, not just slogans.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_106 — Jimmy from Conway

**Real Name:** Jimmy Calder  
**Home Base:** Conway, South Carolina  
**Vocal Style:** coastal Carolina cadence; sunny, mischievous  
**Background:** boat mechanic, Coastal Carolina fan  
**Favorite Teams:** Coastal Carolina, South Carolina  
**Persona:** fun-belt schemer  
**Take Quality:** good on creative offense  
**Bad Take Rate:** 32 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** Sun Belt, schemes, uniforms  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That play was either genius or illegal in three counties.”
- “A little weird is good. A lot weird needs a better left tackle.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_107 — Dr. Cho from Palo Alto

**Real Name:** Dr. Harlan Cho  
**Home Base:** Palo Alto, California  
**Vocal Style:** measured academic cadence; polite and devastating  
**Background:** computer science professor, Stanford fan  
**Favorite Teams:** Stanford  
**Persona:** modeling and academics caller  
**Take Quality:** high accuracy, low heat  
**Bad Take Rate:** 5 / 100  
**Heat Level:** 2 / 10  
**Humor Level:** 3 / 10  
**Frequency:** recurring  
**Preferred Topics:** academics, modeling, player fit  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The model is not pessimistic. The model is refusing to lie.”
- “Academic fit is a retention variable, not a brochure line.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_108 — Tonya from Columbia

**Real Name:** Tonya Reed  
**Home Base:** Columbia, South Carolina  
**Vocal Style:** Columbia cadence; confident, a little spicy  
**Background:** small business owner, South Carolina fan  
**Favorite Teams:** South Carolina  
**Persona:** rivalry-energy caller  
**Take Quality:** mixed but entertaining  
**Bad Take Rate:** 42 / 100  
**Heat Level:** 7 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** rivalries, fan energy, defense  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A rivalry win buys patience. A rivalry loss charges interest.”
- “The crowd gave them a chance. The third-down defense gave it back.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_109 — Samir from Dallas

**Real Name:** Samir Khan  
**Home Base:** Dallas, Texas  
**Vocal Style:** calm analytical Dallas cadence  
**Background:** sports medicine data consultant, national CFB sicko  
**Favorite Teams:** Neutral, SMU  
**Persona:** national systems caller  
**Take Quality:** very accurate  
**Bad Take Rate:** 6 / 100  
**Heat Level:** 2 / 10  
**Humor Level:** 4 / 10  
**Frequency:** recurring  
**Preferred Topics:** injury models, tempo, depth  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Tempo without depth is a dare your own roster eventually accepts.”
- “The injury rate is not bad luck if the practice plan keeps pointing at it.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_110 — Nora from Madison

**Real Name:** Nora Feld  
**Home Base:** Madison, Wisconsin  
**Vocal Style:** wry Wisconsin cadence; charmingly stern  
**Background:** graduate student, Wisconsin fan  
**Favorite Teams:** Wisconsin  
**Persona:** student-section and tradition caller  
**Take Quality:** solid  
**Bad Take Rate:** 21 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 6 / 10  
**Frequency:** occasional  
**Preferred Topics:** student energy, tradition, run game  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The student section was late, but so was the safety help.”
- “Tradition is best when it makes the fourth quarter louder, not the playbook smaller.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_111 — Clay from College Station

**Real Name:** Clay Dobson  
**Home Base:** College Station, Texas  
**Vocal Style:** earnest Texas drawl; booster-adjacent optimism  
**Background:** construction firm partner, Aggies fan  
**Favorite Teams:** Texas A&M  
**Persona:** money solves it caller  
**Take Quality:** often terrible but revealing  
**Bad Take Rate:** 69 / 100  
**Heat Level:** 8 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** boosters, NIL, facilities  
**Bias Triggers:** rivalry losses, QB controversy, staff rumors  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “If the problem is development, build a bigger development center.”
- “I am not saying money fixes everything. I am saying we should test it thoroughly.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_112 — Stella from Boca

**Real Name:** Stella Marino  
**Home Base:** Boca Raton, Florida  
**Vocal Style:** South Florida coastal cadence; sharp, amused  
**Background:** real estate agent, FAU fan  
**Favorite Teams:** Florida Atlantic, Miami  
**Persona:** Florida underdog recruiter caller  
**Take Quality:** good  
**Bad Take Rate:** 24 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** Florida speed, G5 recruiting, portal  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “There are portal receivers down here like palm trees. If you cannot find one, stop scouting from a chair.”
- “Speed is not rare here. Knowing what to do with it is.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_113 — Gordon from Provo

**Real Name:** Gordon Mills  
**Home Base:** Provo, Utah  
**Vocal Style:** gentle Mountain West cadence; wise and slightly stern  
**Background:** retired seminary teacher, BYU fan  
**Favorite Teams:** BYU  
**Persona:** culture/mission/fit caller  
**Take Quality:** strong  
**Bad Take Rate:** 13 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** culture, fit, retention  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Some players need the right room more than the biggest room.”
- “A bad fit becomes a portal story by November.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_114 — Kiki from Boulder

**Real Name:** Kiki Wallace  
**Home Base:** Boulder, Colorado  
**Vocal Style:** energetic Colorado student cadence; playful  
**Background:** student photographer, Colorado fan  
**Favorite Teams:** Colorado  
**Persona:** vibes-and-media caller  
**Take Quality:** fun, sometimes shallow  
**Bad Take Rate:** 54 / 100  
**Heat Level:** 7 / 10  
**Humor Level:** 9 / 10  
**Frequency:** recurring  
**Preferred Topics:** media, uniforms, student energy  
**Bias Triggers:** rivalry losses, QB controversy, staff rumors  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “The vibes were undefeated until the second half started.”
- “If you are going to be loud, the defense has to be louder than the Instagram.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_115 — Ralphie from Annapolis

**Real Name:** Ralphie Simms  
**Home Base:** Annapolis, Maryland  
**Vocal Style:** crisp Mid-Atlantic cadence; disciplined  
**Background:** retired Navy officer, Navy fan  
**Favorite Teams:** Navy  
**Persona:** option/discipline caller  
**Take Quality:** excellent on option  
**Bad Take Rate:** 10 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 4 / 10  
**Frequency:** occasional  
**Preferred Topics:** option, discipline, service academies  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The option is not old. It is honest.”
- “You beat bigger teams by making them defend rules they forgot existed.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_116 — Bianca from Boston

**Real Name:** Bianca Lowell  
**Home Base:** Boston, Massachusetts  
**Vocal Style:** Boston cadence; funny, skeptical  
**Background:** sports bar manager, BC/UMass watcher  
**Favorite Teams:** Boston College, UMass  
**Persona:** Northeast football defender  
**Take Quality:** mixed but fun  
**Bad Take Rate:** 39 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** Northeast recruiting, weather, media  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “If you think football stops north of Pennsylvania, come tackle in November.”
- “The recruit did not hate the weather. He hated the pitch.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_117 — DK from Birmingham

**Real Name:** Darius King  
**Home Base:** Birmingham, Alabama  
**Vocal Style:** smooth Birmingham cadence; former-player bluntness  
**Background:** former JUCO safety, trainer  
**Favorite Teams:** UAB, Auburn  
**Persona:** DB and JUCO eye caller  
**Take Quality:** excellent  
**Bad Take Rate:** 8 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** JUCO, DBs, player development  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That safety is not late. The evaluation is late.”
- “A good staff sees a corner. A great staff sees a nickel before anybody else does.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_118 — Heidi from Fargo

**Real Name:** Heidi Larson  
**Home Base:** Fargo, North Dakota  
**Vocal Style:** Upper Plains cadence; dry and unbothered  
**Background:** grain buyer, NDSU/FBS watcher  
**Favorite Teams:** North Dakota State, Minnesota  
**Persona:** small-program dynasty caller  
**Take Quality:** very good  
**Bad Take Rate:** 14 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 6 / 10  
**Frequency:** recurring  
**Preferred Topics:** development, dynasties, cold weather  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A dynasty is not built on one class. It is built on everyone knowing Tuesday matters.”
- “Some programs recruit stars. Some recruit Tuesdays.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_119 — Marco from Providence

**Real Name:** Marco Bellini  
**Home Base:** Providence, Rhode Island  
**Vocal Style:** New England Italian-American cadence; dramatic and funny  
**Background:** restaurant owner, Big East nostalgist  
**Favorite Teams:** Boston College, UConn  
**Persona:** nostalgia and scheduling caller  
**Take Quality:** fun, sometimes outdated  
**Bad Take Rate:** 50 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** old rivalries, independents, scheduling  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “Bring back the old rivalries and half the country will remember how to hate properly.”
- “A schedule without grudges is just travel.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_120 — Tina from San Marcos

**Real Name:** Tina Alvarez  
**Home Base:** San Marcos, Texas  
**Vocal Style:** Hill Country Texas cadence; practical, upbeat  
**Background:** school athletic secretary, Texas State fan  
**Favorite Teams:** Texas State  
**Persona:** local pipeline and parent perspective caller  
**Take Quality:** sharp  
**Bad Take Rate:** 15 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 6 / 10  
**Frequency:** occasional  
**Preferred Topics:** parents, local recruiting, G5  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The parents are not asking for promises. They are asking if you know their kid.”
- “A staff that remembers the little brother's name is not being cute. It is recruiting.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_121 — Oscar from Athens, Ohio

**Real Name:** Oscar Bell  
**Home Base:** Athens, Ohio  
**Vocal Style:** Appalachian Ohio cadence; soft, clever  
**Background:** music professor, Ohio Bobcats fan  
**Favorite Teams:** Ohio  
**Persona:** MAC philosopher  
**Take Quality:** surprisingly good  
**Bad Take Rate:** 18 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** MAC, culture, development  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “Every program has a ceiling until somebody builds a ladder out of three-stars.”
- “The prettiest win is still one where your backups know where to line up.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_122 — Camille from Atlanta

**Real Name:** Camille Porter  
**Home Base:** Atlanta, Georgia  
**Vocal Style:** polished Atlanta cadence; sponsor/NIL aware  
**Background:** brand strategist, national CFB follower  
**Favorite Teams:** Neutral, Georgia Tech  
**Persona:** brand strategy caller  
**Take Quality:** accurate  
**Bad Take Rate:** 13 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** brand, NIL, media  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A player brand without production is just a photo shoot.”
- “The best NIL pitch is believable because the football part is believable.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_123 — Ronnie from Monroe

**Real Name:** Ronnie Dale  
**Home Base:** Monroe, Louisiana  
**Vocal Style:** north Louisiana drawl; funny, blunt  
**Background:** truck stop owner, ULM fan  
**Favorite Teams:** ULM, Louisiana Tech  
**Persona:** budget-ball caller  
**Take Quality:** fun and realistic  
**Bad Take Rate:** 29 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 8 / 10  
**Frequency:** recurring  
**Preferred Topics:** budget, G5, upsets  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “We do not have a war chest. We have a tackle box and a prayer.”
- “If you cannot buy depth, you better develop it and punt well.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_124 — Ashley from Raleigh

**Real Name:** Ashley Ward  
**Home Base:** Raleigh, North Carolina  
**Vocal Style:** clean Raleigh cadence; sharp but calm  
**Background:** software PM, NC State fan  
**Favorite Teams:** NC State  
**Persona:** process-and-fan-expectation caller  
**Take Quality:** solid  
**Bad Take Rate:** 20 / 100  
**Heat Level:** 4 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** expectations, QB development, rivalries  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The fans are not wrong to expect more. They are wrong to expect it without a left tackle.”
- “Every season has a moment where process either becomes belief or gets booed.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_125 — Dom from Albuquerque

**Real Name:** Dom Reyes  
**Home Base:** Albuquerque, New Mexico  
**Vocal Style:** New Mexico cadence; funny and weather-aware  
**Background:** line cook, New Mexico fan  
**Favorite Teams:** New Mexico, New Mexico State  
**Persona:** underdog chaos caller  
**Take Quality:** mixed  
**Bad Take Rate:** 47 / 100  
**Heat Level:** 6 / 10  
**Humor Level:** 8 / 10  
**Frequency:** occasional  
**Preferred Topics:** altitude, upsets, weather  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Yes

**Sample Lines**
- “Our home-field advantage is that nobody believes the air is real until the fourth quarter.”
- “If the offense is going to be bad, at least be weird.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_126 — Eliza from Oxford, Ohio

**Real Name:** Eliza Stone  
**Home Base:** Oxford, Ohio  
**Vocal Style:** small-college Midwest cadence; cheerful and precise  
**Background:** admissions counselor, Miami (OH) fan  
**Favorite Teams:** Miami (OH), Cincinnati  
**Persona:** academics/small-program caller  
**Take Quality:** good  
**Bad Take Rate:** 13 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** academics, development, MAC  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A recruit who values structure is not boring. He is retainable.”
- “The best small programs know exactly which kids they cannot afford to miss.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_127 — Freddie from New Orleans

**Real Name:** Freddie Cole  
**Home Base:** New Orleans, Louisiana  
**Vocal Style:** New Orleans street-radio cadence; rhythmic and comic  
**Background:** brass band drummer, Tulane/LSU fan  
**Favorite Teams:** Tulane, LSU  
**Persona:** atmosphere and rhythm caller  
**Take Quality:** fun, often insightful  
**Bad Take Rate:** 28 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 9 / 10  
**Frequency:** recurring  
**Preferred Topics:** atmosphere, tempo, local culture  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “That offense had rhythm until the third quarter started playing in another key.”
- “A good crowd is a drummer. A bad offense is a tuba with a flat tire.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_128 — Colleen from South Bend

**Real Name:** Colleen Murphy  
**Home Base:** South Bend, Indiana  
**Vocal Style:** Midwest Catholic cadence; warm, exacting  
**Background:** campus tour guide supervisor, Notre Dame fan  
**Favorite Teams:** Notre Dame  
**Persona:** visit-experience caller  
**Take Quality:** sharp  
**Bad Take Rate:** 11 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** recurring  
**Preferred Topics:** visits, families, tradition  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A campus visit should make the family feel the plan, not just see the buildings.”
- “Tradition works when it feels alive. Otherwise it is a gift shop.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_129 — Benny from Las Vegas

**Real Name:** Benny Wu  
**Home Base:** Las Vegas, Nevada  
**Vocal Style:** fast, dry Vegas cadence; analytical jokester  
**Background:** sportsbook-adjacent data guy but avoids gambling talk  
**Favorite Teams:** UNLV, USC  
**Persona:** variance and media caller  
**Take Quality:** good  
**Bad Take Rate:** 25 / 100  
**Heat Level:** 5 / 10  
**Humor Level:** 7 / 10  
**Frequency:** recurring  
**Preferred Topics:** variance, media, tempo  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “The result was surprising. The volatility was not.”
- “You cannot build your whole identity on chaos and then act offended by variance.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.


## caller_130 — Miriam from Eugene

**Real Name:** Miriam Fox  
**Home Base:** Eugene, Oregon  
**Vocal Style:** gentle Oregon cadence; environmental and observant  
**Background:** campus facilities planner, Oregon State sympathizer  
**Favorite Teams:** Oregon State, Oregon  
**Persona:** facilities/campus caller  
**Take Quality:** good  
**Bad Take Rate:** 18 / 100  
**Heat Level:** 3 / 10  
**Humor Level:** 5 / 10  
**Frequency:** occasional  
**Preferred Topics:** facilities, campus appeal, recruiting  
**Bias Triggers:** player development, recruiting fit, program identity  
**Can Have Terrible Takes:** Sometimes, but usually grounded

**Sample Lines**
- “A facility is a promise about how the player will spend Tuesday.”
- “The campus sold the visit better than the staff did, and that is both good and concerning.”

**Safe Use Notes:** Use as a fictional caller. Do not impersonate real broadcasters, coaches, players, or private individuals.

