# NIL Management Visual Spec

## Page Archetype
Business Dashboard / Program Operations

## Purpose
Shows NIL budget, athlete earnings, collectives, partners, activities, brand health, and recent activity.

## Required Regions
- App header
- Left sidebar with NIL active
- NIL Budget Overview
- Top Earners
- Collectives & Partners
- NIL Activities
- Engagement & Brand Health
- Recent Activity
- Bottom ticker/controller hints

## Required Components
- NILBudgetOverviewCard
- DonutChart
- AthleteEarningsRow
- PartnerRow
- ActivityFeedRow
- TrendSparkline
- StatTile
- BottomTicker

## Required Dynamic Data
- total budget
- spent
- committed
- available
- monthly income
- player earners
- partner list
- brand metrics
- recent activity feed

## Fail Conditions
- Looks like plain accounting spreadsheet.
- Missing athlete/partner rows.
- Money hardcoded in components.
- Charts not data-driven.
