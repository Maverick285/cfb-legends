# Comprehensive Scope for CFB Management Simulator

## 1. Guiding Light and Vision

- This game aims to replicate the depth and nuance of Football Manager applied to U.S. college football.
- The player operates as head coach/GM managing recruiting, roster, staff, finances, and program trajectory.
- The experience prioritizes off-field decisions over graphics.
- The goal is a dense, immersive, menu-driven simulation with long-term consequences.

---

## 2. Core Gameplay Loops

### Yearly Loop
- Recruiting cycles (HS + portal)
- Staff hiring/firing
- NIL + budget allocation
- Season playthrough
- Postseason (conference + CFP)
- Offseason roster turnover

### Weekly Loop
- Practice adjustments
- Injury management
- Recruiting actions
- Staff reports
- Depth chart changes
- Game preparation

### Moment-to-Moment Loop
- Inbox decisions drive gameplay
- Every action has consequences
- Information comparison drives choices

---

## 3. Rules & World Model

- NCAA rules stored as versioned data
- Eligibility tracking (redshirt, years, academic)
- NIL + direct benefits modeled separately
- Conferences, media deals, prestige
- Dynamic rule changes over time

---

## 4. Menu & UX (FM-Level Density)

Primary sidebar:
- Inbox
- Program Home
- Roster
- Recruiting
- Portal
- Staff
- Practice
- Schedule
- Rankings
- Finances
- Facilities
- History
- Analytics

Each has deep submenus (not just dashboards).

Example Recruiting:
- Overview
- Search
- Target Board
- Visits
- Offers
- Pipelines
- Analytics

---

## 5. Player & Staff Model

### Player Attributes (1–20 scale)

Physical:
- Speed, Strength, Agility, Stamina

Mental:
- Leadership, Work Rate, Composure, Discipline

Football IQ:
- Awareness, Vision, Processing

Position Skills:
- Position-specific ratings

Hidden:
- Consistency, professionalism, ambition

### Staff Attributes
- Development
- Recruiting skill
- Scheme fit
- Personality
- Relationships

---

## 6. System Architecture

- UI: React / TypeScript
- Simulation Engine: deterministic core (TS or Rust)
- Database: SQLite / JSON configs
- Full separation between sim + UI

---

## 7. Simulation Systems

Phase-based build:

1. Outcome sim
2. Drive-based sim
3. Play-by-play sim

Key systems:
- Recruiting competition
- Player development
- Morale
- Financial model
- Staff influence

---

## 8. Data Pipeline

Sources:
- CFBD API
- Kaggle
- Wikipedia (light use)

Pipeline:
- raw → processed → synthetic

Rules:
- no real players in final game
- distributions only

---

## 9. Implementation Roadmap

Phase 1: Core shell + sim  
Phase 2: Roster + recruiting  
Phase 3: Scouting + uncertainty  
Phase 4: Finance + NIL  
Phase 5: Portal + retention  
Phase 6: Advanced sim  
Phase 7: Mods + expansion  

---

## 10. Testing & QA

- Headless simulation runner
- Invariant tests
- Scenario harness
- Statistical validation
- AI QA reports
- Replay system

---

## 11. Sandbox Layer

- Adjustable sim parameters
- Hidden behind advanced settings
- Used for tuning realism

---

## 12. Future Ideas

- Alternate worlds (promotion/relegation)
- Narrative mode
- Social media simulation
- VR viewing mode
- Scandal system
- Online leagues

---

This document defines a full Football Manager-style college football simulation with deep systems, dense UI, and long-term progression.
