# 48 — LLM Narrative, Chat, and Media Interaction Spec

## North Star

LLMs should make the world feel alive.

They should not control the simulation.

The simulation produces truth.
The LLM writes grounded language from truth.

## Allowed LLM Uses

- scouting reports
- staff voice
- media blurbs
- press conference questions
- recruit/player dialogue flavor
- player meeting phrasing
- play-by-play text variation
- town flavor summaries
- weekly digest
- rivalry narrative
- award/draft blurbs

## Forbidden LLM Uses

LLM may not decide:

- ratings
- injuries
- wins/losses
- play outcomes
- commits
- transfers
- NIL approvals
- violations
- money
- eligibility
- discipline events
- hidden traits not in payload

## Narrative Service Interface

```ts
interface NarrativeService {
  generateScoutingReport(payload: ScoutingReportPayload): Promise<NarrativeResult>;
  generateStaffReport(payload: StaffReportPayload): Promise<NarrativeResult>;
  generateMediaBlurb(payload: MediaPayload): Promise<NarrativeResult>;
  generateMeetingDialogue(payload: MeetingPayload): Promise<NarrativeResult>;
  generatePlayText(payload: PlayTextPayload): Promise<NarrativeResult>;
  generateWeeklyDigest(payload: WeeklyDigestPayload): Promise<NarrativeResult>;
}
```

## Implementations

- TemplateNarrativeService
- MockNarrativeService
- LocalLLMService
- CachedNarrativeService

The game must work with TemplateNarrativeService only.

## Grounded Payload

Every payload includes:

- facts
- allowed claims
- forbidden claims
- tone
- entity references
- stats
- reason codes
- confidence
- max length
- style guide

## Narrative Result

```ts
type NarrativeResult = {
  text: string;
  provider: string;
  promptHash?: string;
  payloadHash: string;
  validationStatus: "passed" | "failed" | "fallback";
  rejectedReason?: string;
};
```

## Validator

Checks:

- unsupported injury claim
- unsupported commitment claim
- unsupported NIL amount
- unsupported violation
- unsupported quote
- unsupported stat
- profanity/unsafe output if desired
- overlong output

If failed:

```text
discard LLM output
use fallback
log issue
```

## Chat-Like Interactions

Use limited structured chats.

Examples:

- player meeting
- recruit family meeting
- press conference
- staff meeting
- booster meeting

Do not implement freeform chaos early.

## Interaction Model

```text
Simulation creates meeting context.
User chooses from structured response options.
LLM writes natural conversation around selected option.
Simulation applies deterministic consequences.
```

Do not let freeform user text directly change state until a later, heavily validated system.

## Press Conferences

Question types:

- big win
- bad loss
- rivalry
- recruit signing
- transfer loss
- player performance
- staff rumor
- NIL controversy
- playoff ranking

User responses are structured choices.

Effects:

- morale
- media relation
- fan sentiment
- recruit perception
- player trust

## Staff Voice

Staff personality changes tone:

- blunt
- analytical
- optimistic
- risk-averse
- old-school
- recruiter-salesman
- film nerd
- CEO summary

## Play-by-Play Text

Early:

```text
template only
```

Later:

```text
LLM variation from structured PlayEvent
```

LLM cannot add unsupported details.

## Caching

Cache by:

- payload hash
- provider
- model
- prompt version
- entity id
- season/week

## Offline Mode

If LLM unavailable:

- template text
- no blocked gameplay
- optional queued generation

## Events

- LLM provider offline
- narrative validation failed
- generated report ready
- cached report reused

## Tests

Required:

- service works with template provider
- unsupported claim rejected
- fallback used on failure
- payload hash stable
- LLM unavailable does not block Continue
- structured chat choice applies deterministic consequence
- freeform text cannot mutate state

## Acceptance Criteria

This system is acceptable when:

- LLM enhances immersion
- game works without LLM
- LLM cannot create facts
- structured choices drive consequences
- validation/fallback/caching exist
- reports remain grounded in sim data
