# Campus Pulse and Program Temperature System

## North Star

Campus Pulse is the emotional atmosphere of the program.

It should summarize how the world around the program feels without forcing the user to read endless fake posts.

Program Temperature is the short label that captures the overall mood.

## Program Temperature

Examples:

```text
Quiet Confidence
Restless Optimism
Championship Fever
Boiling Pressure
Full Buy-In
Fractured
Waiting for a Spark
Winter Uncertainty
Local Doubt
Recruiting Momentum
Hot Seat Watch
```

## ProgramTemperature Object

```ts
type ProgramTemperature = {
  label: string;
  score: number;
  trend: "rising" | "falling" | "stable" | "volatile";
  components: CampusPulseComponents;
  reasonCodes: ReasonCode[];
  updatedAt: GameDate;
};
```

## CampusPulseComponents

```ts
type CampusPulseComponents = {
  fanMood: PulseComponent;
  studentEnergy: PulseComponent;
  boosterTemperature: PulseComponent;
  localMediaTone: PulseComponent;
  lockerRoomTone: PulseComponent;
  recruitBuzz: PulseComponent;
  nationalPerception: PulseComponent;
  campusTownMood: PulseComponent;
};
```

## PulseComponent

```ts
type PulseComponent = {
  score: number;
  label: string;
  trend: "up" | "down" | "flat" | "volatile";
  summary: string;
  reasonCodes: ReasonCode[];
  recentDrivers: EntityRef[];
};
```

## Component Inputs

## Fan Mood

Inputs:

- record
- expectation
- rivalry results
- streaks
- offense/defense style
- recruiting class
- coach reputation
- historical patience
- ticket price
- media tone

Labels:

```text
Euphoric
Hopeful
Restless
Angry
Checked Out
Cautiously Optimistic
Spoiled
```

## Student Energy

Inputs:

- ranking
- rivalry week
- home schedule
- weather
- campus culture
- student section strength
- night game
- recent wins

Labels:

```text
Electric
High
Steady
Flat
Distracted
```

## Booster Temperature

Inputs:

- wins
- rivalry
- NIL success
- facilities
- staff hires
- budget discipline
- media embarrassment
- recruiting class

Labels:

```text
Encouraged
Watchful
Impatient
Agitated
Generous
Divided
```

## Local Media Tone

Inputs:

- recent results
- hot seat
- recruiting misses
- player stories
- controversy
- expectations
- rivalry

Labels:

```text
Supportive
Skeptical
Critical
Curious
Hype-Building
Hot Seat
```

## Locker Room Tone

Inputs:

- team vibe
- morale
- promises
- role clarity
- transfer risk
- leadership
- fatigue
- injuries

Labels:

```text
Bought In
Stable
Uneasy
Divided
Tired
Rallying
```

## Recruit Buzz

Inputs:

- visit results
- commits
- decommits
- NIL reputation
- draft/development reputation
- campus atmosphere
- staff stability
- social/media narratives

Labels:

```text
Heating Up
Positive
Uncertain
Cooling
Damaged
Breakthrough
```

## National Perception

Inputs:

- ranking
- playoff odds
- major wins
- draft picks
- conference strength
- media narratives
- coach reputation

Labels:

```text
Contender
Overlooked
Fraud Watch
Rising
Fading
Irrelevant
```

## Campus/Town Mood

Inputs:

- home games
- local economy/fan interest abstraction
- rivalry
- attendance
- weather
- campus traditions
- player behavior events

Labels:

```text
Buzzing
Settled
Tense
Quiet
Celebratory
```

## Pulse Effects

Campus Pulse can affect:

- attendance
- recruit visit atmosphere
- booster donations
- media pressure
- player morale
- NIL local opportunities
- home field atmosphere

Keep effects subtle.

## Update Timing

Update after:

- game result
- major recruit event
- transfer event
- staff event
- NIL event
- facility event
- weekly Continue
- ranking/postseason event

## UI

Campus Pulse appears:

- Program Desk summary
- dedicated detail panel
- postgame reaction
- weekly recap
- media narrative

## Detail View

For each component show:

- label
- trend
- short summary
- top reason codes
- recent events
- possible action if relevant

Example:

```text
Booster Temperature: Watchful

Drivers:
- Rivalry loss: -12
- Top 10 recruiting class: +8
- NIL miss on portal QB: -5

Suggested:
Review NIL campaign or schedule booster meeting.
```

## Tests

Required:

- rivalry loss lowers fan mood
- top recruit commit raises recruit buzz
- NIL miss lowers booster temperature
- high team vibe improves locker room tone
- watchlisted event raises visibility
- Program Temperature label changes with component mix
- effects are subtle and capped

## Acceptance Criteria

Campus Pulse is acceptable when:

- it summarizes mood without spam
- every label has reason codes
- it changes after meaningful events
- it affects gameplay lightly
- it appears in Program Desk
- it can be drilled into
