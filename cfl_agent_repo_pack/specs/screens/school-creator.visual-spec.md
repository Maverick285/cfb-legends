# School Creator Visual Spec

## Page Archetype
Wizard Creator

## Purpose
Allows player to create a fictional school/program through multi-step setup with live identity preview.

## Required Regions
- App shell/sidebar
- Page title
- Wizard stepper
- Form field area
- Live identity preview card
- Uniform preview strip
- Stadium preview card
- Back/Next or Save & Continue CTA

## Required Steps
1. Identity
2. Location
3. Program
4. Uniform
5. Stadium
6. Review

## Required Components
- WizardShell
- WizardStepper
- TextInput
- Dropdown
- ColorPicker
- TextArea
- IdentityPreviewCard
- MiniUniformPreviewStrip
- MiniStadiumPreview
- ActionButton

## Fail Conditions
- Missing stepper.
- Preview does not update from data.
- Form looks like generic browser defaults.
- No validation/character-count state.
