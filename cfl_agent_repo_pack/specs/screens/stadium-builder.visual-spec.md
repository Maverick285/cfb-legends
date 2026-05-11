# Stadium Builder Visual Spec

## Page Archetype
Builder Workbench

## Purpose
Allows the player to customize stadium capacity, seating, facilities, field, appearance, scoreboard, and atmosphere.

## Required Regions
- App header
- Top nav with Stadium active
- Left budget/submenu panel
- Large central stadium preview viewport
- Right stadium overview card
- Bottom customization workspace
- Seating diagram
- Expansion option list
- Review & Confirm CTA

## Required Visual Hierarchy
1. Stadium preview dominates upper center.
2. Left panel controls context and budget.
3. Right panel summarizes stadium status.
4. Bottom workspace contains technical configuration.
5. Confirm CTA bottom-right.

## Required Components
- BuilderShell
- StadiumOverviewPanel
- BudgetSummaryPanel
- SeatingDiagram
- ExpansionOptionCard
- CapacitySlider
- ActionButton

## Required Dynamic Data
- current capacity
- target capacity
- seating categories
- budget total/spent/remaining
- stadium tier
- year built
- field type
- fan experience
- upgrade options

## Fail Conditions
- Stadium preview is not dominant.
- Seating diagram lacks legend.
- Expansion cards lack cost and impact.
- Budget values hardcoded in component.
- Missing selected state for expansion option.
