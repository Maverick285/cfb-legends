# 62 — Incorporating Hosts and Callers Into The Game

## Purpose

This document gives a cursory implementation guide for adding Saul A. Sinebaum, Peve Fmith, and the fictional caller library into CFB-FM.

The goal is to create a recurring radio/call-in layer that feels alive, funny, and grounded in the save.

## Core Rule

```text
Simulation creates facts.
Script engine creates grounded transcript.
Hosts/callers add personality.
TTS/audio reads the transcript.
No host or caller invents facts.
```

## Where This Fits In The Game

Use hosts and callers in these presentation systems:

```text
Weekly Program Radio
Postgame Call-In Show
Rivalry Week Special
Recruiting Notebook
Signing Day Reaction
Coach Hot Seat Segment
Draft Night Recap
Offseason Wrap
Campus Pulse Detail
Program Scrapbook Flavor
```

## Data Files To Add

Add these files to the game data/content folder:

```text
game_data/radio/hosts_saul_and_peve.json
game_data/radio/callers_fictional_library.json
```

Optional docs:

```text
docs/radio/SAUL_AND_PEVE_HOST_BACKGROUNDS.md
docs/radio/CALL_IN_SHOW_PERSONALITY_LIBRARY.md
```

## Suggested Types

```ts
type RadioHostProfile = {
  id: string;
  name: string;
  role: string;
  home_base: string;
  voice_style: string;
  core_persona: string;
  show_function: string;
  strengths: string[];
  weaknesses: string[];
  biases: string[];
  bad_take_style: string[];
  humor_style: string;
  signature_bits: string[];
  signature_phrases: string[];
  sample_lines: string[];
  llm_personality_prompt: string;
};

type CallerProfile = {
  id: string;
  name: string;
  on_air_name: string;
  home_base: string;
  vocal_style: string;
  background: string;
  favorite_teams: string[];
  persona: string;
  take_quality: string;
  bad_take_rate: number;
  heat_level: number;
  humor_level: number;
  frequency: "recurring" | "occasional" | string;
  preferred_topics: string[];
  bias_triggers: string[];
  can_have_terrible_takes: boolean;
  sample_lines: string[];
  safe_use_notes: string;
};
```

## Show Types

```ts
type RadioShowType =
  | "weekly_program_radio"
  | "postgame_call_in"
  | "rivalry_week_special"
  | "recruiting_notebook"
  | "signing_day_reaction"
  | "coach_hot_seat"
  | "draft_night_recap"
  | "offseason_wrap";
```

## Show Script Object

```ts
type RadioShowScript = {
  id: string;
  showType: RadioShowType;
  season: number;
  week: string;
  title: string;
  hosts: string[];
  callerIds: string[];
  segments: RadioSegment[];
  sourceFacts: EntityRef[];
  transcript: string;
  validationStatus: "template" | "llm_validated" | "fallback";
  audioAssetId?: string;
};
```

## Segment Types

```text
Opening Monologue
Program Temperature
Game Recap
Caller Block
Film / Narrative Debate
Recruiting Desk
NIL / Booster Desk
Hot Seat
Campus Pulse
What To Watch
Closing Thought
```

## Host Role Logic

## Saul Leads

Use Saul for:

```text
show opening
caller introductions
program temperature
booster/fan/media framing
hot seat segments
rivalry stakes
regional pressure
closing summary
```

## Peve Leads

Use Peve for:

```text
national narrative
quarterback controversy
coach standard debate
embarrassing losses
rankings/playoff outrage
star player debate
major recruiting miss
brand/program respect
```

## Caller Selection Logic

Select 3–7 callers per show.

Inputs:

```ts
type CallerSelectionContext = {
  showType: RadioShowType;
  schoolId: string;
  opponentId?: string;
  region: string;
  gameResult?: "win" | "loss";
  rivalry?: boolean;
  importanceTier: 0 | 1 | 2 | 3 | 4;
  topics: string[];
  programTemperature: string;
  campusPulseLabels: string[];
};
```

Increase caller weight if:

```text
favorite team matches controlled school
favorite team matches opponent/rival
home region matches
preferred topics match show topics
heat level fits event importance
caller has recurring frequency
caller has not appeared too recently
```

Decrease caller weight if:

```text
caller appeared last episode
too many high-heat callers already selected
caller topic irrelevant
show needs serious tone
```

## Recommended Caller Mix

Normal weekly show:

```text
1 smart/grounded caller
1 emotional fan
1 local/culture caller
1 tactical or recruiting caller
1 funny bad-take caller, optional
```

Rivalry week:

```text
1 local diehard
1 rival/skeptic
1 history caller
1 emotional caller
1 tactical caller
1 funny chaos caller
```

Postgame loss:

```text
1 angry caller
1 grounded analyst caller
1 player-development/culture caller
1 bad-take caller
1 Saul/Peve debate segment
```

Recruiting notebook:

```text
1 recruiting-process caller
1 local pipeline caller
1 NIL/booster caller
1 development-fit caller
1 hype/bad-take caller, optional
```

## Bad Take Handling

Bad takes are allowed, but they must be football-only.

Safe bad takes:

```text
bench QB too early
declare coach finished after one bad loss
claim a program is back after one flashy win
think NIL fixes everything
overvalue uniforms/brand
ignore academics/location/development
hate analytics
overtrust analytics
demand a fullback in every offense
blame weather for everything
declare G5 playoff path after one upset
```

Forbidden bad takes:

```text
inventing crimes
inventing injuries
inventing NIL amounts
inventing commitments
inventing firing/hiring
defamatory allegations
offensive stereotypes
real-person impersonation
```

## Grounded Reaction Payload

Before generating any host/caller text, build a payload.

```ts
type RadioReactionPayload = {
  speakerId: string;
  speakerKind: "host" | "caller";
  profile: RadioHostProfile | CallerProfile;
  showType: RadioShowType;
  facts: {
    result?: string;
    score?: string;
    opponent?: string;
    record?: string;
    keyStats?: Record<string, number>;
    playerEvents?: EntityRef[];
    recruitingEvents?: EntityRef[];
    nilEvents?: EntityRef[];
    staffEvents?: EntityRef[];
    programTemperature?: string;
    campusPulse?: string[];
  };
  allowedTopics: string[];
  forbiddenClaims: string[];
  desiredTone: "funny" | "serious" | "angry" | "hopeful" | "skeptical" | "analytic" | "meltdown";
  maxWords: number;
};
```

## LLM Prompt Template

```text
Write one fictional college football radio segment using only the provided facts.

Speaker:
{host or caller profile}

Show Type:
{showType}

Facts:
{facts}

Tone:
{desiredTone}

Rules:
- Do not invent injuries.
- Do not invent NIL amounts.
- Do not invent commitments.
- Do not invent firings or hirings.
- Do not invent crimes, violations, or scandals.
- Do not reference real broadcasters.
- Keep any terrible take football-specific.
- Use the speaker's personality, cadence, and biases.
- Length: {maxWords} words.
```

## Validation Rules

Reject generated text if it:

```text
mentions a player not in payload
mentions injury not in payload
mentions NIL amount not in payload
mentions commitment not in payload
mentions firing/hiring not in payload
mentions crime/violation/scandal not in payload
references real broadcaster/coach/player as a speaker
uses offensive stereotype
exceeds length limit badly
```

If rejected:

```text
use template fallback
log validation failure
```

## Template Fallback

The game must work without LLM.

Example fallback:

```text
Saul:
"The temperature around the program changed this week. The result gives the staff something to sell, but the next few days will tell us whether the momentum holds."

Peve:
"Momentum is nice. But if the quarterback room does not clean up the turnovers, we are going to be right back here next week having a very different conversation."
```

## Caller History

Track recurring caller usage.

```ts
type CallerHistory = {
  callerId: string;
  appearances: number;
  lastAppearanceWeek?: string;
  memorableTakes: string[];
  accuracyScore: number;
  fanFavoriteScore: number;
};
```

Use this for continuity.

Examples:

```text
Tommy Two-QBs calls for a quarterback change again.
Ned from Iowa City praises field position for the fifth straight week.
Spreadsheet Ray was right about the offensive efficiency warning.
```

## Audio Integration

Voice presets can be mapped later.

```ts
type SpeakerVoicePreset = {
  speakerId: string;
  provider: "piper" | "kokoro" | "chatterbox" | "dia" | "openvoice" | "none";
  voiceId: string;
  speed: number;
  pitch: number;
  energy: number;
  accentPrompt?: string;
};
```

Do not clone real voices.

For now:

```text
text transcript first
audio optional
```

## UI Placement

Show the radio/call-in layer in:

```text
Program Desk
Campus Pulse detail
Postgame Report
Radio Desk / Podcast Archive
Program Scrapbook entries
```

## Suggested UI Components

```text
RadioShowCard
RadioTranscriptPanel
CallerChip
HostBadge
CallerHistoryPopover
RadioArchiveList
GenerateAudioButton
```

## Minimal Implementation Order

1. Add host JSON and caller JSON.
2. Create profile loaders.
3. Create caller selection engine.
4. Create template show generator.
5. Add transcript UI.
6. Add caller history.
7. Add LLM prompt builder/validator.
8. Add optional audio service later.

## Acceptance Criteria

This system is acceptable when:

```text
Saul and Peve appear as permanent hosts.
Callers are selected based on show context.
Caller takes are grounded in actual game facts.
Bad takes are funny and football-specific.
No real-person impersonation occurs.
Text fallback works without LLM.
Caller history persists.
Audio is optional.
```
