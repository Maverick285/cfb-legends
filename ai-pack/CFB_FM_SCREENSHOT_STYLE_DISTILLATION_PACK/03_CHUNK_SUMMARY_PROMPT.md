# Chunk Summary Prompt

Use this after you have **20–30 JSON screen analyses**.

Paste the JSON analyses into the model along with the following prompt.

---

You are synthesizing multiple UI screenshot analyses from a **video game sports management UI**.

You will be given a batch of structured screen-analysis JSON outputs.

Your job is to summarize the recurring patterns across the batch.

## Your tasks

1. Identify the most common **screen categories**.
2. Identify recurring **layout structures**.
3. Identify recurring **component systems**.
4. Identify recurring **visual design rules**.
5. Identify recurring **typography and color rules**.
6. Identify recurring **professional-polish signals**.
7. Identify **outliers** that should not dominate the style guide.
8. Return a structured summary in markdown.

## Output sections

Return markdown with these sections:

# Chunk Summary

## Dominant Screen Categories
- list the major categories seen in this chunk
- note approximate frequency if obvious

## Common Layout Patterns
- repeated shell structure
- repeated nav structure
- repeated content grid patterns
- repeated sidebars / rails / footers

## Common Component Patterns
- cards
- tables
- hero image blocks
- stat tiles
- standings blocks
- list panels
- CTA buttons
- utility bars
- etc.

## Common Visual Style Rules
- theme
- palette
- contrast
- panel treatment
- borders / dividers
- texture
- spacing / density

## Typography Rules
- headlines
- labels
- body text
- numerics
- buttons

## What Makes These Screens Feel Professional
- concrete reasons

## What Makes Them Feel Like A Sports Management Game
- concrete reasons

## Reusable Design System Candidates
- list likely reusable tokens, components, and templates

## Outliers / Things To Ignore
- things that appear only once or feel less representative

## Image Prompt Terms
- a distilled list of style prompt terms

## Negative Prompt Terms
- a distilled list of negative terms

## Chunk-Level Summary Paragraph
- one paragraph

## Hard rules

- Be specific.
- Synthesize; do not merely restate every screen.
- Focus on reusable patterns.
- Treat these as game screens, not generic websites.
