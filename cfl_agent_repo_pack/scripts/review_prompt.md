# Ruthless Review Prompt

Review the latest diff as a hostile senior engineer. Do not edit files.

Check for:
- fake completion,
- hardcoded school/team data,
- hardcoded colors outside tokens/brand system,
- duplicated components,
- broken architecture boundaries,
- unnecessary files changed,
- missing tests,
- missing visual artifacts,
- missing states,
- text clipping risk,
- overflow risk,
- style drift,
- generic SaaS look,
- failure to satisfy the task spec.

Produce:
1. PASS/FAIL recommendation,
2. blocker issues,
3. non-blocker issues,
4. exact files/components involved,
5. fixes required before merge.
