# Easy Usage Guide (No Qwen Knowledge Required)

You said you do not know how to use Qwen.

That is fine.

You can still use these prompts in a few easy ways.

## Option 1 — Easiest

Use any AI that can look at images one at a time.

For each screenshot:

1. upload one screenshot
2. paste the contents of `01_SINGLE_SCREEN_ANALYSIS_PROMPT.md`
3. save the JSON output to a text file

Do this repeatedly.

Then:

4. group 20–30 JSON outputs together
5. paste them with `03_CHUNK_SUMMARY_PROMPT.md`
6. save each chunk summary

Then:

7. combine the chunk summaries
8. paste them with `04_FINAL_STYLE_BIBLE_PROMPT.md`

That gives you the final style guide.

## Option 2 — Semi-manual batch workflow

If your AI tool supports projects, notebooks, or API calls:

- process one image at a time
- save one JSON per image
- aggregate later

This is much better than trying to send 300 images at once.

## Option 3 — Ask your coding AI to do the whole workflow

Give your coding AI this instruction:

```text
I have a folder of game screenshots.

Your task:
1. analyze each screenshot using the single-screen JSON prompt
2. save one JSON file per screenshot
3. summarize screenshots in chunks of 20–30
4. produce chunk summaries
5. combine chunk summaries into a final UI style bible
6. output:
   - per-image JSON analyses
   - chunk summaries
   - final style bible
   - final image-generation prompt template
   - negative prompt
```

## Recommended output folder structure

```text
style_analysis/
  raw_screen_analyses/
    001.json
    002.json
    ...
  chunk_summaries/
    chunk_01.md
    chunk_02.md
    ...
  final/
    CFB_FM_UI_STYLE_BIBLE.md
    CFB_FM_UI_IMAGE_PROMPT_TEMPLATE.md
    CFB_FM_UI_NEGATIVE_PROMPT.md
```

## Extra tip

If you want better categorization, tell the model this too:

```text
These are screenshots from a sports-management video game.
Some are title screens, some are hub/dashboard screens, some are menus, some are stat/data screens, some are setup screens, and some are profile/detail screens.
Categorize each one precisely before describing it.
```

## Best practical rule

Do not ask the model:

```text
what is in this image?
```

Ask it:

```text
What type of game screen is this, what are its component parts, and how should another AI recreate it?
```

That is the real goal.
