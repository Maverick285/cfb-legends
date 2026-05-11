# Component Contract — [ComponentName]

## Purpose
What the component does and where it is used.

## Should Be Used By
- Screen/template 1
- Screen/template 2

## Must Not Do
- Must not fetch data internally.
- Must not hardcode school/team data.
- Must not hardcode team colors.
- Must not import from `/screens`.
- Must not contain game simulation logic.

## Props
```ts
export interface ComponentNameProps {
  // define exact props here
}
```

## Variants
- `default`
- `compact`
- `hero`
- `selected`
- `disabled`

## States
- normal
- hover/focus
- selected
- disabled
- loading
- empty
- error, if applicable

## Styling Rules
- Uses design tokens.
- Uses team brand tokens only through props/theme.
- No inline magic colors unless tokenized.
- Must remain readable on dark UI.

## Data Rules
- Receives all display data through props.
- Supports realistic long names/labels.
- Handles missing optional values gracefully.

## Tests Required
- Unit/render test
- State/variant test
- Visual screenshot/story if UI-visible

## Acceptance Criteria
- [ ] Reusable outside the first screen.
- [ ] No hardcoded demo data.
- [ ] TypeScript strict compatible.
- [ ] Visual state coverage exists.
