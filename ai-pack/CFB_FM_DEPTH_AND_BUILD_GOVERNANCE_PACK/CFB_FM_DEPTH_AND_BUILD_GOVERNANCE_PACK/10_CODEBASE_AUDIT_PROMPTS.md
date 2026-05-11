# Codebase Audit Prompts

## Purpose

Use these prompts periodically to catch project drift.

---

# Full Codebase Architecture Audit

```text
Audit this CFB-FM codebase for architecture drift.

Check:
- simulation logic in UI components
- UI-only state
- unseeded randomness
- hardcoded rules
- missing save/load coverage
- missing tests
- missing event logs
- broken folder structure
- optional AI services becoming required
- LLM output used as truth
- mock data still present
- shallow placeholder systems

Return:
1. critical issues
2. high priority issues
3. medium issues
4. recommended refactor packets
5. files to inspect first
```

---

# Save/Load Audit

```text
Audit save/load safety.

Check:
- every stateful entity is serialized
- hidden traits stay hidden in public views
- version field exists
- migrations exist
- round-trip tests exist
- custom schools/conferences save
- events save
- action log saves
- generated asset references save

Return:
- pass/fail
- missing state
- migration risks
- tests to add
```

---

# Determinism Audit

```text
Audit deterministic simulation.

Check:
- no Math.random in sim
- seeded RNG used consistently
- seed namespaces used
- same seed reproduces same results
- event order deterministic
- AI services cannot alter sim state
- replay can reproduce state

Return:
- files with risk
- fixes
- tests
```

---

# FM UI Density Audit

```text
Audit whether the UI is becoming too dashboard-like.

Check:
- card-heavy screens
- missing sortable tables
- missing filters
- missing saved views
- missing clickable links
- missing nested tabs
- missing comparison tools
- missing staff recommendations
- screens with low decision density

Return:
- FM-density score by screen
- required improvements
- screens to refactor first
```

---

# System Consequence Audit

```text
Audit whether systems actually affect each other.

For each system:
- recruiting
- development
- practice
- team vibe
- NIL
- staff
- game sim
- draft
- finance
- town immersion

Check:
- upstream inputs
- downstream consequences
- events generated
- debug reason codes
- tests proving consequences

Return:
- disconnected systems
- shallow systems
- required integration packets
```

---

# Mock Data Audit

```text
Find all mock/static/sample data still used in gameplay.

Classify:
- acceptable fixture
- test-only fixture
- unacceptable gameplay mock
- placeholder requiring replacement

Return file paths and replacement plan.
```

---

# Balance Drift Audit

```text
Review validation reports for balance drift.

Check:
- talent inflation
- school dominance
- NIL inflation
- transfer volume
- scoring drift
- draft concentration
- development imbalance
- recruiting class imbalance

Return:
- likely parameter causes
- suggested tuning
- tests to add
```
