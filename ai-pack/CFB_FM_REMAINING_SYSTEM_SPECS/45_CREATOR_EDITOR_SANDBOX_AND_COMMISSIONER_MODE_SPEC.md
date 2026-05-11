# 45 — Creator, Editor, Sandbox, and Commissioner Mode Spec

## North Star

Creator and sandbox tools are not side gimmicks.

They support:

- customization
- testing
- balance tuning
- private real-school mode
- fantasy rebuilds
- what-if scenarios
- debugging

Created objects must use the same simulation systems as normal objects.

No creator output should be UI-only.

## Modes

## Standard Career

Normal gameplay.

## Advanced Setup

Configure the world before starting.

## Commissioner Mode

Edit world during a save.

## Data Lab

Run simulations and inspect balance.

## Creator Studio

Create schools, players, coaches, conferences, uniforms, stadiums, playbooks, rivalries, bowls, rulesets.

## Create-a-School

Fields:

- name
- short name
- mascot
- colors
- city/state
- stadium
- conference
- prestige
- facilities
- academic profile
- fan intensity
- alumni size
- donor base
- NIL market
- local recruiting footprint
- media exposure
- tradition
- campus appeal
- location appeal

Modes:

- cupcake rebuild
- realistic new FBS
- sleeping giant
- blue blood
- G5 climber
- NIL monster
- academic powerhouse
- development factory

## Create-a-Player

Modes:

- prospect
- current roster player
- transfer
- walk-on
- dynasty legend
- sandbox monster
- random balanced

Fields:

- identity
- position
- body
- attributes
- hidden traits
- potential
- development curve
- preferences
- NIL profile
- eligibility
- school/portal/recruit status

Balance modes:

- realistic lock
- soft cap
- unlimited sandbox

## Create-a-Coach

Fields:

- name
- age
- hometown
- alma mater
- role
- coaching tree
- attributes
- personality
- philosophy
- scheme
- recruiting regions
- career ambition
- hidden traits

## Create-a-Conference

Fields:

- name
- teams
- divisions/pods
- protected rivalries
- championship format
- media strength
- revenue sharing
- playoff access
- schedule rules

## Create-a-Ruleset

Fields:

- roster rules
- NIL rules
- direct benefits
- transfer windows
- redshirt rules
- practice time
- playoff format
- conference rules
- scholarship relevance
- academic strictness
- injury settings

## Commissioner Editor

Editable:

- players
- prospects
- schools
- conferences
- schedules
- staff
- finances
- NIL deals
- facilities
- injuries
- records
- rankings
- ruleset/balance

Every edit must be logged.

## Data Lab

Tools:

- run 1/5/20/100 seasons
- compare presets
- export stats
- inspect AI decisions
- inspect anomalies
- tune balance
- view distributions
- replay logs

## Sandbox Parameters

World:

- team count
- conference layout
- talent density
- regional talent
- school power distribution

Recruiting:

- star counts
- scouting opacity
- NIL importance
- flip rate
- late bloomer rate
- bust rate

Development:

- growth speed
- regression chance
- staff impact
- facility impact
- practice impact

Games:

- scoring
- pace
- upsets
- injuries
- penalties
- turnovers
- home field
- weather

NIL:

- market size
- clearinghouse strictness
- booster meddling
- jealousy sensitivity

## Validation

Creator must validate:

- no invalid IDs
- school has conference
- conference has teams
- player attributes in range
- no impossible eligibility
- schedule legal
- ruleset complete
- save/load works

## Events

- custom school added
- commissioner edit made
- ruleset changed
- sandbox preset loaded
- Data Lab sim completed
- balance anomaly found

## Tests

Required:

- custom school enters schedule
- custom conference schedules games
- created player saves/loads
- created coach can be hired
- commissioner edit logs action
- invalid created object rejected
- sandbox preset applies
- Data Lab run exports report

## Acceptance Criteria

This system is acceptable when:

- creator tools produce real entities
- created objects participate in simulation
- edits are logged
- sandbox changes are config-driven
- Data Lab supports balance testing
- user can create custom school/conference/player/coach safely
