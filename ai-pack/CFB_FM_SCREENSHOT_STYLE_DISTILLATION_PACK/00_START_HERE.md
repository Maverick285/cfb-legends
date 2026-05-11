# CFB-FM Screenshot Style Distillation Pack

## Purpose

This pack helps an AI analyze a large batch of game screenshots and extract a reusable UI/style guide from them.

You said some screenshots are:

- title screens
- menus
- dashboards
- recruiting screens
- roster screens
- modal dialogs
- hub screens
- stat screens
- profile screens
- news/media screens

So the prompts in this pack force the model to:

1. **categorize the screen**
2. **describe the component parts exactly**
3. **capture the style**
4. **extract reusable implementation notes**
5. **produce JSON you can summarize later**

## Recommended workflow

### Step 1
Run the **single-screen prompt** on each screenshot.

Output one JSON file per screenshot.

### Step 2
Group those outputs into chunks of 20–30 screenshots.

Run the **chunk summary prompt** on each chunk.

### Step 3
Take the chunk summaries and run the **final style bible prompt**.

That gives you a final reusable art direction / UI implementation guide.

## Files

- `01_SINGLE_SCREEN_ANALYSIS_PROMPT.md`
- `02_SINGLE_SCREEN_ANALYSIS_SCHEMA.json`
- `03_CHUNK_SUMMARY_PROMPT.md`
- `04_FINAL_STYLE_BIBLE_PROMPT.md`
- `05_EASY_USAGE_GUIDE_NO_QWEN.md`

## Important rule for the AI

The AI should treat the screenshots as:

```text
screens from a video game UI
```

and not as generic websites or business dashboards unless the visual structure clearly resembles that.

## Important output rule

The AI should describe:

- **what kind of screen it is**
- **what major regions it contains**
- **what each region contains**
- **how the hierarchy works**
- **how polished/professional it feels**
- **what makes the style commercially credible**
- **what should be copied**
- **what should be avoided**
