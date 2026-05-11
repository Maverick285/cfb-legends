# 47 — College Town Immersion and Content Pipeline Spec

## North Star

Each college town should feel distinct.

Town immersion should affect gameplay lightly but meaningfully:

- recruiting visits
- player homesickness
- location fit
- campus appeal
- fan pressure
- NIL/local market
- media flavor
- rivalry flavor

It should not become giant lore dumps.

## Town Profile

```ts
type TownProfile = {
  id: string;
  schoolId: SchoolId;
  city: string;
  state: string;
  region: string;
  populationBand: string;
  campusType: "small_town" | "college_town" | "urban" | "suburban" | "rural";
  weatherProfile: WeatherProfile;
  cultureTags: string[];
  landmarks: FlavorItem[];
  foodCulture: FlavorItem[];
  gameDayTraditions: FlavorItem[];
  localMemes: FlavorItem[];
  rivalryFlavor: FlavorItem[];
  nightlife: number;
  campusAppeal: number;
  localPride: number;
  mediaPressure: number;
  fanIntensity: number;
  NILLocalMarket: number;
  confidence: number;
};
```

## Flavor Item

```ts
type FlavorItem = {
  id: string;
  type: "landmark" | "food" | "tradition" | "meme" | "weather" | "rivalry" | "local_reference";
  text: string;
  tone: "positive" | "neutral" | "negative" | "joking";
  confidence: number;
  sourceIds: string[];
  approved: boolean;
  tags: string[];
};
```

## Gameplay Uses

## Recruiting Visits

Town/campus fit affects visit outcome.

Examples:

- recruit loves small-town atmosphere
- recruit wants urban NIL market
- family likes campus safety/comfort
- weather/culture mismatch lowers fit

## Player Morale

Location fit affects:

- homesickness
- transfer risk
- happiness
- family influence
- campus adjustment

## NIL

Town/local market affects:

- local business NIL
- brand exposure
- booster/business opportunities

## Media/Commentary

Town flavor can appear in:

- game day notes
- rivalry stories
- recruit visit reports
- media narratives
- player adjustment events

## Content Collection Pipeline

Sources:

- Reddit/team subreddits
- fan forums
- school/city pages
- Wikipedia
- local articles
- user/crowdsourced notes

Pipeline:

```text
collect raw candidates
→ tag
→ filter
→ deduplicate
→ confidence score
→ human/user approval
→ compress to profile
→ generate gameplay-safe text
```

## Filtering Rules

Reject:

- offensive content
- personal attacks
- private information
- hyper-specific one-off jokes
- outdated references
- defamatory claims
- extreme stereotypes
- NSFW content
- political flamebait unless user explicitly wants it and it is safe

## Compression

Each school should keep:

- 5–10 landmarks
- 3–5 food/culture items
- 5–10 identity notes
- 3–5 game day notes
- 3–5 rivalry notes

Quality over quantity.

## LLM Use

LLM can summarize approved flavor into:

- recruit visit language
- media blurbs
- town profile summaries
- player homesickness notes

LLM cannot invent real local facts.

Payload must include approved FlavorItems.

## Events

- recruit family liked town
- player homesick
- local business NIL opportunity
- rivalry week local hype
- campus visit praised
- weather/culture adjustment issue

## Tests

Required:

- town profile saves/loads
- flavor items require approval
- rejected content not used
- recruit location preference affects visit
- player homesickness uses location fit
- LLM payload includes only approved items
- town flavor does not spam Program Desk

## Acceptance Criteria

This system is acceptable when:

- every school can have town identity
- town identity affects recruiting/morale lightly
- content is curated and safe
- flavor appears contextually
- no lore dumps
- user can crowdsource/import/approve content
