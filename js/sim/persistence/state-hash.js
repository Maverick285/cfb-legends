// PERSIST-2: Deterministic state hash.
// Spec: ai-pack/CFB_FM_REMAINING_SYSTEM_SPECS/41_DATABASE_SAVE_MIGRATION_AND_EVENT_LOG_SPEC.md §"State Hash"
//
// Produces a stable 32-bit FNV-1a hash over a canonical JSON projection of an
// arbitrary value (object / array / primitive). Used by the replay system to
// detect drift between (seed + actionLog) replays and a recorded save state.
//
// "Canonical" means:
//   - Object keys are sorted alphabetically at every depth.
//   - Numbers serialize via toString — NaN/Infinity become null.
//   - Functions, undefined, and Symbols are dropped.
//   - Date is serialized as ISO string.
//   - Cyclic refs throw (caller's bug).
//
// Pure / deterministic. Same input → same hash, period.

(function initStateHash(global) {
  const FNV_OFFSET = 0x811c9dc5;
  const FNV_PRIME = 0x01000193;

  function isPlainObject(v) {
    return v !== null && typeof v === "object" && !Array.isArray(v);
  }

  function canonicalize(value, seen) {
    if (value === null) return null;
    if (value === undefined) return null;
    const t = typeof value;
    if (t === "function" || t === "symbol") return null;
    if (t === "number") {
      if (Number.isNaN(value) || !Number.isFinite(value)) return null;
      return value;
    }
    if (t === "string" || t === "boolean") return value;
    if (t === "bigint") return value.toString();
    if (value instanceof Date) return value.toISOString();
    if (Array.isArray(value)) {
      if (seen.has(value)) throw new Error("state-hash: cycle in array");
      seen.add(value);
      const out = value.map((v) => canonicalize(v, seen));
      seen.delete(value);
      return out;
    }
    if (isPlainObject(value)) {
      if (seen.has(value)) throw new Error("state-hash: cycle in object");
      seen.add(value);
      const keys = Object.keys(value).sort();
      const out = {};
      keys.forEach((k) => {
        const v = canonicalize(value[k], seen);
        if (v !== null || value[k] === null) out[k] = v;
      });
      seen.delete(value);
      return out;
    }
    return null;
  }

  function canonicalJSON(value) {
    return JSON.stringify(canonicalize(value, new Set()));
  }

  function fnv1a(str) {
    let h = FNV_OFFSET;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, FNV_PRIME);
    }
    return (h >>> 0).toString(16).padStart(8, "0");
  }

  function hashState(value) {
    return fnv1a(canonicalJSON(value));
  }

  function hashStateLong(value) {
    // Two independent FNV passes with different offsets → 64 bits of identity.
    const json = canonicalJSON(value);
    let a = FNV_OFFSET;
    let b = 0xcbf29ce4;
    for (let i = 0; i < json.length; i++) {
      a ^= json.charCodeAt(i);
      a = Math.imul(a, FNV_PRIME);
      b ^= json.charCodeAt(json.length - 1 - i);
      b = Math.imul(b, 0x100000001b3 & 0xffffffff);
    }
    return (a >>> 0).toString(16).padStart(8, "0") + (b >>> 0).toString(16).padStart(8, "0");
  }

  function compareStates(a, b) {
    const ja = canonicalJSON(a);
    const jb = canonicalJSON(b);
    if (ja === jb) return { equal: true, hashA: fnv1a(ja), hashB: fnv1a(jb), diff: null };
    return { equal: false, hashA: fnv1a(ja), hashB: fnv1a(jb), diff: firstDiff(ja, jb) };
  }

  function firstDiff(ja, jb) {
    const len = Math.min(ja.length, jb.length);
    for (let i = 0; i < len; i++) {
      if (ja.charCodeAt(i) !== jb.charCodeAt(i)) {
        const start = Math.max(0, i - 30);
        return {
          offset: i,
          a: ja.slice(start, i + 60),
          b: jb.slice(start, i + 60),
        };
      }
    }
    return { offset: len, a: ja.slice(-60), b: jb.slice(-60) };
  }

  global.CGM_STATE_HASH = {
    hashState,
    hashStateLong,
    compareStates,
    canonicalJSON,
  };
})(window);
