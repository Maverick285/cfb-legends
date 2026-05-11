# 72 — Player Comp Engine Code Sketch

## Purpose

This is a code-level sketch for the AI coder.

## Suggested Files

```text
src/domain/comps/playerCompTypes.ts
src/data/comps/collegePlayerCompsRepository.ts
src/sim/comps/playerCompEngine.ts
src/sim/comps/playerCompReasonCodes.ts
src/ui/components/PlayerCompPanel.tsx
src/ui/components/CompBadge.tsx
game_data/comps/college_player_comps_library.json
```

## Types

```ts
export type PlayerCompType =
  | "style"
  | "ceiling"
  | "floor"
  | "scheme"
  | "draft"
  | "developmental";

export type PlayerCompProfile = {
  id: string;
  name: string;
  school: string;
  primaryPosition: Position;
  archetype: string;
  compType: PlayerCompType;
  tags: string[];
  signatureVector: Partial<Record<AttributeId, number>>;
  traitRequirements?: string[];
  bestFor: string;
  caution: string;
  safeDisplayRule: string;
};

export type CandidateCompResult = {
  compId: string;
  compName: string;
  compType: PlayerCompType;
  score: number;
  confidence: number;
  label: string;
  similarities: ReasonCode[];
  differences: ReasonCode[];
  caution: string;
  displayText: string;
};
```

## Algorithm Sketch

```ts
export function findPlayerComps(input: {
  player: Player | Prospect;
  visibleAttributes: Partial<Record<AttributeId, number>>;
  position: Position;
  tags: string[];
  scoutingConfidence: number;
  compProfiles: PlayerCompProfile[];
  mode: "current_player" | "recruit";
}): CandidateCompResult[] {
  const candidates = compProfiles
    .filter(comp => positionGate(input.position, comp.primaryPosition))
    .map(comp => scoreComp(input, comp))
    .filter(result => result.score >= 0.55)
    .sort((a, b) => b.score - a.score);

  return dedupeByCompFamily(candidates).slice(0, 5);
}
```

## Weighted Distance

```ts
function weightedSimilarity(
  playerVector: Partial<Record<AttributeId, number>>,
  compVector: Partial<Record<AttributeId, number>>,
  weights: Partial<Record<AttributeId, number>>
): number {
  let totalWeight = 0;
  let totalDistance = 0;

  for (const attr of Object.keys(compVector) as AttributeId[]) {
    const playerValue = playerVector[attr];
    const compValue = compVector[attr];
    if (playerValue == null || compValue == null) continue;

    const weight = weights[attr] ?? 1;
    const distance = Math.abs(playerValue - compValue) / 19;

    totalDistance += distance * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) return 0;

  return Math.max(0, 1 - totalDistance / totalWeight);
}
```

## Michael Vick Special Rule Example

```ts
function rawVickToolsRule(attrs: AttributeMap): boolean {
  return (
    attrs.speed >= 18 &&
    attrs.acceleration >= 18 &&
    attrs.agility >= 18 &&
    attrs.scrambleInstinct >= 16 &&
    attrs.throwPower >= 15 &&
    attrs.shortAccuracy <= 11 &&
    attrs.processing <= 10
  );
}
```

Do not rely only on special rules. They are supplemental.

## Confidence

```ts
function compConfidence(input: {
  mode: "current_player" | "recruit";
  scoutingConfidence: number;
  positionProjectionConfidence: number;
  attributeCoverage: number;
  staffEvaluationSkill: number;
}): number {
  if (input.mode === "current_player") {
    return clamp01(0.75 * input.attributeCoverage + 0.25 * input.positionProjectionConfidence);
  }

  return clamp01(
    input.scoutingConfidence *
    input.positionProjectionConfidence *
    (0.6 + input.staffEvaluationSkill * 0.4) *
    input.attributeCoverage
  );
}
```

## Display Text Builder

```ts
function buildCompDisplay(result: CandidateCompResult): string {
  return `${result.label}. Similarities: ${result.similarities
    .slice(0, 3)
    .map(r => r.label)
    .join(", ")}. Concerns: ${result.differences
    .slice(0, 2)
    .map(r => r.label)
    .join(", ")}.`;
}
```

## UI Component

```tsx
function PlayerCompPanel({ comps }: { comps: CandidateCompResult[] }) {
  if (!comps.length) {
    return <EmptyState title="No strong comp yet" body="Scout more or wait for additional evaluation." />;
  }

  return (
    <section className="comp-panel">
      <h3>Player Comps</h3>
      {comps.map(comp => (
        <article key={comp.compId} className="comp-card">
          <div className="comp-title">{comp.label}</div>
          <div className="comp-score">Similarity {(comp.score * 100).toFixed(0)}%</div>
          <div className="comp-confidence">Confidence {(comp.confidence * 100).toFixed(0)}%</div>
          <ul>
            {comp.similarities.slice(0, 3).map(r => <li key={r.code}>{r.label}</li>)}
          </ul>
          <p className="comp-caution">{comp.caution}</p>
        </article>
      ))}
    </section>
  );
}
```

## Tests

```text
raw elite-speed QB -> Michael Vick style tools comp
polished pocket QB -> Peyton/Andrew/Joe style comps, not Vick
slim route WR -> DeVonta Smith/Amari Cooper
huge power RB -> Derrick Henry/Herschel/Bo
low scouting confidence -> comp confidence low
no similar profile -> no strong comp
```
