# 77 — Prompt Validation, Safety, and Consistency

## Purpose

The image model should not introduce unsupported facts or unsafe/legally messy content.

Validation is required before the prompt is sent to an image provider.

## Validation Goals

Reject prompts that include unsupported:

- injuries
- suspensions
- arrests
- violations
- NIL amounts
- commitments
- firings
- hiring
- real brands
- real media brands
- real-person likeness claims
- logos/trademarks, unless private mode explicitly allows

## Prompt Validation Result

```ts
export type ImagePromptValidationResult = {
  passed: boolean;
  errors: string[];
};
```

## Forbidden Pattern Examples

```ts
const forbiddenPatterns = [
  { pattern: /\barrest(ed)?\b/, label: "arrest" },
  { pattern: /\bsuspended\b/, label: "suspension" },
  { pattern: /\binjured\b|\binjury\b/, label: "injury" },
  { pattern: /\$[0-9]/, label: "dollar amount" },
  { pattern: /\bnike\b|\badidas\b|\bunder armour\b/i, label: "real brand" },
  { pattern: /\bespn\b|\bfox sports\b|\bcbs\b/i, label: "real media brand" }
];
```

## Allowed Facts Override

If the game event includes an injury, then injury language may be allowed.

Example:

```text
allowedFacts includes:
"player returned from confirmed hamstring injury"
```

Then prompt may include injury return context.

If not, reject.

## Private Real-School Mode

If private mode allows real logos/uniforms, still keep it configurable.

```ts
type ImageGenerationPolicy = {
  allowRealLogos: boolean;
  allowRealUniformMarks: boolean;
  allowRealStadiumNames: boolean;
  allowRealPlayerLikeness: false;
};
```

Even in private mode, avoid real person likeness unless user supplies their own image/reference knowingly.

## Player Consistency Rules

The image can depict a fictional player if:

- player exists in GameWorld
- player visual identity exists
- prompt uses stable descriptors
- prompt uses reference image if available

Do not invent:

- different jersey number
- different team
- unsupported injury
- unsupported celebration context

## Weather Consistency Rules

Weather must come from game context.

If weather unknown:

```text
clear football weather
```

Do not invent snow/rain.

## Venue Consistency Rules

Venue must come from game/stadium context.

If venue unknown:

```text
packed college football stadium
```

Do not invent specific stadium unless known.

## Validation Tests

Required:

- prompt with unsupported injury rejected
- prompt with unsupported dollar amount rejected
- prompt with real brand rejected
- prompt with allowed injury passes
- prompt with known venue passes
- prompt with unknown venue uses generic fallback
- prompt with real-person likeness request rejected
- private logo policy can allow real logos only if explicitly enabled

## Acceptance Criteria

Prompt validation is acceptable when:

- unsafe/unsupported claims are blocked
- errors are logged
- fallback asset can be created
- validation happens before queueing
- policy supports private/fictional modes
