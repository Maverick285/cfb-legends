# Coaching Upgrades Visual Spec

## Page Archetype
Skill Tree / Progression

## Purpose
Allows the player to spend coach points on upgrade categories and skill nodes.

## Required Regions
- App header
- Category nav
- Available points widget
- Skill tree columns or path
- Selected skill detail panel
- Current/next effect display
- Upgrade CTA

## Required Categories
- Leadership
- Recruiting
- Player Development
- Offense
- Defense
- Special Teams
- Program Building

## Required Components
- ProgressionShell
- PointsCounter
- SkillNode
- SkillConnector
- SkillColumn
- SkillDetailPanel
- TierBonusList
- ActionButton

## Fail Conditions
- Skill nodes lack locked/unlocked/maxed/selected states.
- Connector path is visually unclear.
- Selected skill details missing.
- Available points missing.
- Costs/effects hardcoded in component.
