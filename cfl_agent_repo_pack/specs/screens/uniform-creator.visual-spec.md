# Uniform Creator Visual Spec

## Page Archetype
Builder Workbench / Live Preview Editor

## Purpose
Allows the player to create and save multiple uniform sets with live front/side/back preview.

## Required Regions
- App header
- Top nav with Uniform active
- Uniform sets list
- Equipment category tabs
- Attribute editor rows
- Large uniform preview stage
- Preview controls
- Save/Preview/Import actions
- Program context strip

## Required Components
- BuilderShell
- UniformSetList
- EquipmentCategoryTabs
- AttributeEditorRow
- ColorSwatchPicker
- LivePreviewStage
- PreviewToolbar
- ActionButton

## Required Dynamic Data
- active uniform set
- helmet values
- jersey values
- pants values
- socks/cleats/gloves values
- team colors
- decals/logos

## Fail Conditions
- Preview does not visually dominate.
- Attribute editor rows are inconsistent.
- Team colors are hardcoded.
- Uniform set values are hardcoded in component.
- Save CTA missing.
