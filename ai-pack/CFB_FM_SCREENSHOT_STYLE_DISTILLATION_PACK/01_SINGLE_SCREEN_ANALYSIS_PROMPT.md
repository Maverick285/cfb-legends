# Single Screen Analysis Prompt

Copy/paste this prompt with **one screenshot at a time**.

---

You are analyzing a screenshot from a **video game user interface**, specifically a sports management / college football management game.

Your job is to describe the screen in a way that helps another AI recreate the **style, structure, and component system** of the game.

Treat this as a **game screen**, not a generic website, unless the image clearly behaves like a web-style interface.

## Your tasks

1. Identify **what kind of screen** this is.
2. Identify the **primary layout structure**.
3. Describe the **component parts exactly**.
4. Describe the **visual style**.
5. Describe the **interaction hierarchy**.
6. Describe the **quality/polish level**.
7. Extract **implementation notes** that a UI engineer or image-generation model could use.
8. Return **strict JSON only**.

## Screen categorization

Choose the best category and also provide 1–3 secondary categories if relevant.

Possible categories include:

- title_screen
- main_menu
- dashboard
- team_hub
- roster_screen
- player_profile
- recruiting_screen
- recruiting_board
- schedule_screen
- standings_screen
- tactics_screen
- training_screen
- staff_screen
- scouting_screen
- stats_screen
- office_screen
- dynasty_screen
- inbox_screen
- news_screen
- modal_dialog
- setup_screen
- save_load_screen
- match_preview
- postgame_report
- polls_rankings_screen
- finance_screen
- customizer_screen
- other

## What to analyze

### 1. Screen type
Describe what the screen is trying to do.

### 2. Layout
Break the screen into major regions:
- top bar
- left navigation
- sub-navigation
- central content area
- right rail
- footer
- bottom action bar
- modal layer
- floating panels
- etc.

### 3. Components
List specific UI components visible on screen:
- tabs
- cards
- data tables
- stat blocks
- metric tiles
- buttons
- filters
- nav links
- badges
- portraits
- hero image
- logos
- schedule list
- standings table
- progress bars
- ratings
- icons
- ticker
- bottom utility bar
- CTA button
- etc.

### 4. Visual design
Describe:
- color palette
- dark/light theme
- accent colors
- contrast
- borders
- panel backgrounds
- spacing
- shadows
- line work
- texture
- typography style
- density

### 5. Hierarchy
Explain:
- what draws the eye first
- what is secondary
- what is tertiary
- how information is grouped
- whether the screen feels calm, crowded, premium, amateur, etc.

### 6. Sports/game feel
Describe how it communicates:
- sports branding
- simulation depth
- management depth
- premium game feel
- commercial polish
- realism vs arcade feel

### 7. Reuse notes
Extract implementation notes:
- reusable layout patterns
- reusable component patterns
- data presentation patterns
- what should become design system tokens
- what should become standard page templates

### 8. Prompt terms
Provide:
- image-generation style prompt terms
- negative prompt terms

## Output format

Return strict JSON only using this schema:

{
  "screen_category": "",
  "secondary_categories": [],
  "screen_purpose": "",
  "overall_style": "",
  "mood": [],
  "layout": {
    "app_shell": "",
    "primary_regions": [
      {
        "region_name": "",
        "location": "",
        "purpose": "",
        "contents": []
      }
    ],
    "grid_structure": "",
    "density": "",
    "scan_pattern": ""
  },
  "components": [
    {
      "component_type": "",
      "component_role": "",
      "visual_description": "",
      "importance": "primary"
    }
  ],
  "visual_design": {
    "theme": "",
    "color_palette": {
      "background": [],
      "surfaces": [],
      "accents": [],
      "text": [],
      "status_colors": []
    },
    "typography": {
      "headline_style": "",
      "section_label_style": "",
      "body_style": "",
      "numeric_stat_style": "",
      "button_label_style": ""
    },
    "surface_treatment": [],
    "spacing_and_density": "",
    "polish_level": ""
  },
  "hierarchy": {
    "primary_focus": [],
    "secondary_focus": [],
    "tertiary_focus": [],
    "grouping_logic": "",
    "navigation_clarity": ""
  },
  "sports_game_identity": {
    "sporting_cues": [],
    "management_simulation_cues": [],
    "commercial_game_polish_cues": [],
    "tone": ""
  },
  "implementation_notes": {
    "reusable_layout_patterns": [],
    "reusable_component_patterns": [],
    "page_template_candidates": [],
    "design_system_token_candidates": [],
    "what_makes_it_professional": [],
    "what_to_avoid": []
  },
  "style_prompt_terms": [],
  "negative_prompt_terms": [],
  "one_paragraph_summary": ""
}

## Hard rules

- Return JSON only.
- Be specific.
- Do not be vague.
- Treat the image as a video game screen.
- If text is readable, mention what kind of text/content appears, but do not obsess over copying exact text unless it matters structurally.
- Focus on **structure and style**, not just content.
