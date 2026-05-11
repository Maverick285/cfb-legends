# Player, Recruit, and Coach Story UI

## North Star

The user should care about people.

Not just ratings.

Every player, recruit, and coach should accumulate a story across the save.

## Player Story UI

## Player Profile Header

Show:

- portrait
- name
- position
- class
- hometown
- high school
- role
- trait labels
- current morale
- transfer risk
- key staff note
- current story tag

Example story tag:

```text
Late-blooming starter
```

## Player Story Panel

Sections:

```text
Origin
Recruiting Story
Development Arc
Role History
Big Moments
Relationships
Promises
NIL / Brand
Future Outlook
```

## Origin

- hometown
- high school
- recruiting class
- star rating
- why he chose school
- primary recruiter

## Development Arc

Show timeline:

- arrived
- redshirt
- position change
- breakout practice
- first start
- injury
- regression
- award
- transfer meeting

## Big Moments

Links to:

- games
- records
- awards
- scrapbook entries
- media clippings

## Current Narrative Summary

Generated from facts.

Example:

```text
A late-developing Tulsa quarterback who nearly transferred after his redshirt year, McClain has become the face of the offense after winning the job in camp.
```

LLM can write this, but facts must be grounded.

## Recruit Story UI

## Prospect Profile Header

Show:

- name
- position
- class/grade
- hometown
- high school
- public stars
- your eval
- scouted confidence
- top schools
- trait labels

## Recruiting Story So Far

Sections:

```text
Discovery
Evaluation
Relationship
Why He Likes Us
Why He Hesitates
Competitor Threat
NIL / Role / Development Tension
Next Best Action
```

Example:

```text
Your staff identified him after a summer camp before his junior season. He values development and staying within the region, but Texas has made a late NIL push.
```

## Preference Clues

Do not reveal hidden preferences perfectly.

Show:

```text
Staff believes money matters.
Family appears location-sensitive.
Development pitch has landed well.
Playing time concern is real.
```

## Recruit Timeline

- discovered
- scouted
- offered
- visit
- top group
- commitment
- decommit
- signing

## Coach Story UI

## Coach Profile Header

Show:

- role
- age
- alma mater
- coaching tree
- philosophy
- reputation
- contract
- ambition risk

## Coach Story Sections

```text
Career Path
Coaching Tree
Scheme Identity
Recruiting Regions
Development Track Record
Staff Relationships
Player Relationships
Big Moments
Job Market
```

## Staff Narrative Summary

Example:

```text
A young Air Raid assistant with deep Texas ties, Reed has quickly become one of the staff's best relationship builders but is already drawing coordinator interest.
```

## Relationship Web

Show:

- players close to coach
- recruits tied to coach
- staff chemistry
- high school connections

## Story Triggers

Player:

- commits
- signs
- redshirts
- first start
- breakout game
- injury
- transfer meeting
- award
- draft declaration

Recruit:

- discovered early
- visit
- commitment
- flip
- signing

Coach:

- hired
- promoted
- poached
- wins award
- develops draft pick
- clashes with staff
- becomes head coach candidate

## Tests

Required:

- player story uses actual events
- recruit story uses actual recruiting state
- coach story uses actual history
- hidden preferences are not exposed as certainty
- narrative summary falls back without LLM
- scrapbook links appear
- entity links work

## Acceptance Criteria

Story UI is acceptable when:

- people feel like individuals
- story is grounded in sim facts
- major moments link to history
- hidden info remains uncertain
- user can click through the story
