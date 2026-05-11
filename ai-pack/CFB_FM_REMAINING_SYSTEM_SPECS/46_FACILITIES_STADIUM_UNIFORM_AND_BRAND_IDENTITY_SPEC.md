# 46 — Facilities, Stadium, Uniform, and Brand Identity Spec

## North Star

Program identity should be visible and functional.

Facilities, stadiums, uniforms, and brand affect:

- recruiting
- NIL
- fan sentiment
- revenue
- home-field atmosphere
- player morale
- program prestige
- town/campus immersion

They should not become arcade stat boosts.

## Facilities

Facility categories:

- stadium
- locker room
- weight room
- indoor practice
- practice fields
- nutrition
- recovery/medical
- academic center
- recruiting lounge
- analytics/film center
- equipment
- fan amenities

Each facility has:

- rating
- condition
- upkeep cost
- upgrade cost
- construction time
- effect profile
- donor funding potential

## Facility Effects

Recruiting:

- visit impression
- development pitch
- NIL/brand appeal
- player comfort

Development:

- strength gains
- recovery
- injury rehab
- practice quality
- nutrition

Finance:

- revenue
- upkeep
- booster interest
- ticket sales

Home Field:

- crowd noise
- atmosphere
- recruit visit effect

## Stadium

Fields:

- capacity
- age
- condition
- noise
- student section impact
- luxury suites
- recruiting appeal
- tradition value
- weather exposure
- fan amenities
- location
- expansion potential
- maintenance cost

## Stadium Builder

Buildable components:

- seating capacity
- student section
- luxury suites
- club seating
- video board
- locker rooms
- tunnel
- recruiting lounge
- press box
- concessions
- tailgate district
- parking
- lighting
- field surface
- roof/canopy
- sound system
- statues/tradition features

## Stadium Project Lifecycle

```text
concept
→ approval
→ donor funding
→ design
→ construction
→ disruption
→ completion
→ effects
```

Project risks:

- cost overrun
- delay
- donor conflict
- fan backlash
- recruiting boost
- revenue boost

## Uniform Designer

Uniform elements:

- helmet
- logo
- facemask
- jersey
- pants
- socks
- cleats
- gloves
- number font
- stripes
- collar
- alternates
- throwbacks

Uniform attributes:

- tradition
- modernity
- recruit appeal
- fan approval
- brand strength
- rivalry identity
- special event value

## Uniform Effects

Small effects only:

- recruit impression
- fan sentiment
- merchandise revenue
- player morale for big games
- brand identity

No arcade boosts:

```text
No +5 speed uniforms.
```

## Brand Identity

Identity labels:

- traditional blue blood
- modern flashy brand
- defensive grinder
- development factory
- NIL superpower
- local pipeline program
- uniform innovator
- stadium atmosphere school
- academic prestige program

Identity emerges from systems, not manual label only.

## AI Graphics Pipeline

Assets:

- logos
- uniforms
- helmets
- stadium concepts
- facility concepts

Flow:

```text
creator input
→ prompt payload
→ asset service
→ generated image
→ user lock/regenerate
→ asset metadata saved
```

AI output is cosmetic unless linked to facilities/uniform schema.

## Events

- donor offers stadium funding
- facility project delayed
- recruits impressed by upgrade
- fans dislike uniform reveal
- alternate uniform boosts recruiting visit atmosphere
- stadium expansion approved
- facility falls behind rivals

## Tests

Required:

- facility affects recruiting score
- facility affects development/recovery
- stadium affects revenue/home field
- uniform set saves/loads
- generated asset metadata saves
- project cost/time updates
- facility project completion changes rating
- no uniform arcade stat boost

## Acceptance Criteria

This system is acceptable when:

- facilities affect core systems
- stadium affects revenue/atmosphere
- uniforms affect identity/flavor modestly
- projects have costs/time/consequences
- assets are optional and saved as references
- identity emerges from program behavior
