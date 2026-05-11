# 63 — Ready-To-Paste Prompt: Hosts and Callers Integration

```text
Implement the CFB-FM fictional radio hosts and call-in caller system.

Use these content files:
- hosts_saul_and_peve.json
- callers_fictional_library.json

Goal:
Create a recurring fictional radio/call-in layer for weekly program radio, postgame reactions, rivalry specials, recruiting notebooks, signing day, coach hot seat segments, draft recaps, and offseason wraps.

Permanent hosts:
- Saul A. Sinebaum: dry Southern regional radio host, fan/booster/coach-pressure expert, ringmaster.
- Peve Fmith: loud national debate host, program-standard flamethrower, emotional verdict machine.

Deliver:
1. RadioHostProfile type
2. CallerProfile type
3. data loaders for hosts/callers
4. RadioShowType
5. RadioShowScript type
6. caller selection engine
7. caller history tracking
8. grounded reaction payload builder
9. template fallback generator
10. LLM prompt builder and validation shell
11. transcript UI scaffold
12. tests

Hard rules:
- All hosts and callers are fictional.
- Do not impersonate real broadcasters.
- No host or caller may invent facts.
- LLM output must be grounded in supplied facts.
- Bad takes are allowed only when football-specific.
- Do not invent injuries, NIL amounts, commitments, firings, crimes, violations, or quotes.
- Audio is optional.
- Text transcript fallback is required.

Caller selection:
- Select 3–7 callers depending show type.
- Weight by favorite team, region, topic relevance, heat level, frequency, and recent usage.
- Avoid repeating the same caller too often.
- Include a mix of grounded, emotional, funny, and skeptical voices.

Show structure:
- Saul opens and manages callers.
- Peve provides national debate heat.
- Callers react to grounded facts.
- Saul closes with program temperature or pressure framing.

Acceptance:
- weekly show can generate text transcript from current save facts
- postgame show selects relevant callers
- rivalry show includes emotional/rival/history voices
- recruiting show includes recruiting/NIL/development voices
- caller history persists
- validation rejects unsupported claims
- game works with no LLM/audio service
```
