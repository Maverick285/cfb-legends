# 44 — Scheduling, Conferences, Realignment, and Postseason Spec

## North Star

The college football world must have structure.

Schedules, conferences, rivalries, rankings, postseason access, and realignment all shape program incentives.

The user should be able to play:

- fictional structures
- real-school private mode
- custom conferences
- custom playoff formats
- historical/alternate eras
- chaos sandbox

## Conference Entity

```ts
type Conference = {
  id: ConferenceId;
  name: string;
  teams: SchoolId[];
  divisions?: Record<string, SchoolId[]>;
  pods?: Record<string, SchoolId[]>;
  protectedRivalries: RivalryRule[];
  conferenceGames: number;
  championshipFormat:
    | "none"
    | "top_two"
    | "divisions"
    | "pods"
    | "custom";
  revenueShareModel: "equal" | "performance" | "tiered";
  mediaDealStrength: number;
  prestige: number;
  playoffAccess: "auto_possible" | "at_large_only" | "none";
  schedulingRules: ConferenceSchedulingRules;
};
```

## Scheduling Inputs

- team list
- conference memberships
- rivalry games
- protected games
- home/away balance
- conference game count
- non-conference game count
- bye weeks
- neutral site games
- TV/marquee windows, optional
- custom user constraints
- postseason dates

## Schedule Generator

Must support:

- round-robin/division/pod rules
- protected rivalries
- balanced home/away over multi-year cycles
- non-conference scheduling
- bye week distribution
- no duplicate games
- no team plays itself
- custom conferences

## Non-Conference Scheduling

AI/user can schedule:

- home game
- away game
- neutral site
- rivalry
- buy game
- strength-of-schedule game
- recruiting-region game

Effects:

- revenue
- SOS
- recruiting exposure
- risk
- fan interest
- travel fatigue

## Rivalries

Rivalry entity:

```ts
type Rivalry = {
  id: string;
  teams: [SchoolId, SchoolId];
  name?: string;
  protected: boolean;
  intensity: number;
  history: RivalryHistory;
  trophy?: string;
};
```

Effects:

- fan sentiment
- home-field intensity
- recruiting
- team vibe
- coach expectations
- media narratives

## Rankings

Ranking model inputs:

- record
- strength of schedule
- quality wins
- bad losses
- margin / game control
- conference strength
- head-to-head
- recency
- injuries, optional
- poll inertia
- prestige bias, sandbox toggle

Outputs:

- poll rankings
- committee rankings
- playoff seeding
- media narratives

## Conference Standings

Track:

- overall record
- conference record
- division/pod record
- head-to-head
- common opponents
- tiebreakers
- points/other rules if custom

Tiebreakers must be configurable.

## Conference Championship

Formats:

- none
- divisions
- top two
- pods
- custom

Outputs:

- matchup
- venue
- revenue
- prestige
- playoff effects
- awards/media

## Postseason

Support configurable postseason.

Fields:

- playoff size
- autobids
- at-large count
- seeding rules
- home first round
- byes
- bowl tie-ins
- neutral sites
- committee model
- historical mode

## Bowl System

Bowl selection factors:

- conference tie-ins
- team record
- prestige
- geography
- fan travel
- TV interest
- rematch avoidance
- custom rules

## Realignment

Realignment triggers:

- revenue gap
- conference instability
- school ambition
- geography
- media deal
- playoff access
- rivalry concerns
- political/booster pressure
- user sandbox trigger

Outputs:

- invitations
- accept/reject
- conference membership changes
- schedule changes
- revenue changes
- prestige changes
- rivalry disruption
- media narratives

## Custom Conference Creator

User can:

- create conference
- rename conference
- add/remove teams
- set divisions/pods
- protect rivalries
- set revenue sharing
- set media strength
- set championship format
- set playoff access
- set schedule rules

## Events

- schedule released
- rivalry week
- ranking released
- CFP ranking update
- conference title clinched
- bowl invite
- playoff bracket set
- realignment rumor
- conference invite
- media deal announced

## Tests

Required:

- no duplicate games
- no self games
- home/away balance
- protected rivalry scheduled
- conference standings correct
- tiebreaker works
- championship matchup correct
- playoff bracket valid
- custom conference saves/loads
- realignment changes schedule next year
- postseason stats/history saved

## Acceptance Criteria

This system is acceptable when:

- schedules are legal
- custom conferences work
- rivalries are protected if configured
- standings/tiebreakers work
- postseason works by ruleset
- realignment changes world causally
- rankings are plausible and explainable
