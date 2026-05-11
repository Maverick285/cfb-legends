# Data Acquisition & Simulation Calibration

## Core Principle
Use real-world data ONLY to build distributions and realism.
Do NOT ship real players or recreate identifiable individuals.

---

## Primary Data Sources

### CollegeFootballData (CFBD API)
- Rosters (2009+)
- Games, stats, recruiting, rankings
- Python: cfbd-python
- URL: https://api.collegefootballdata.com

Use for:
- Name distributions
- Position distributions
- Team stats
- Game results

---

### Kaggle Datasets
Use for bulk:
- Team stats
- Player stats
- Recruiting

---

### NCAA Stats
Use ONLY for validation ranges.

---

### Wikipedia
Use for history and structure, not core stats.

---

### Sports Reference
High quality but respect terms.

---

## Data Pipeline

/data_raw/
/data_processed/
/game_data/

Scripts:
1. Pull CFBD
2. Aggregate names
3. Build distributions
4. Generate synthetic players
5. Validate outputs

---

## Name Generation Rules

- NEVER reuse full real names
- Build weighted distributions
- Generate synthetic combinations

---

## Simulation Calibration Targets

Match:
- Points per game
- Yards
- Turnovers
- Win distributions

---

## First Sim Model

team_power =
  offense * 0.40
+ defense * 0.35
+ coaching * 0.10
+ home_field * 0.05
+ morale * 0.05
+ special_teams * 0.05