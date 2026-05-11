# DataGrid and Table System Spec

## Purpose

The game cannot look FM-like without a real table system.

The current CSS grid rows are insufficient.

## DataGrid Requirements

Minimum:

- column definitions
- row data
- sorting
- filtering
- saved views
- column show/hide
- column resizing
- sticky header
- selected row
- row click
- row actions
- compact density
- keyboard navigation
- empty/loading states

## Column Definition

```ts
type DataGridColumn<T> = {
  id: string;
  label: string;
  accessor: (row: T) => unknown;
  width?: number;
  minWidth?: number;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  filterable?: boolean;
  formatter?: (value: unknown, row: T) => string;
  cellType?: "text" | "number" | "badge" | "meter" | "link" | "rating" | "trend";
};
```

## Saved View

```ts
type SavedTableView = {
  id: string;
  screenId: string;
  name: string;
  columnIds: string[];
  columnWidths: Record<string, number>;
  sort: SortSpec[];
  filters: FilterSpec[];
  density: "compact" | "comfortable";
  pinnedColumns?: string[];
};
```

## Row Interaction

Required:

- click row selects and opens inspector
- double-click opens profile
- right-click opens context menu
- checkbox/select for compare
- hover state
- keyboard focus

## Context Menu

Examples for player:

- Open Profile
- Compare
- Add to Watchlist
- Meet With Player
- Set Development Focus
- View Game Log
- View Promises

Examples for recruit:

- Open Profile
- Add to Board
- Assign Scout
- Contact
- Offer
- Schedule Visit
- Compare

## DataGrid Visual Rules

- row height 30–36px compact
- header height 32–36px
- small text 12–13px
- zebra or subtle row separation
- selected row with accent border/background
- numeric columns right-aligned
- ratings visually compact
- no huge padding
- no large card rows

## Required Tables

## Roster Table

Columns:

- name
- pos
- class
- role
- CA
- PA/staff potential
- key attrs
- morale
- transfer risk
- NIL
- eligibility
- injury
- dev trend
- staff note

## Recruiting Table

Columns:

- name
- pos
- class
- state
- stars
- rank
- eval
- confidence
- interest
- relationship
- NIL expectation
- playing time fit
- development fit
- scheme fit
- staff owner
- last contact
- risk

## Portal Table

Columns:

- name
- pos
- prior school
- class
- ability
- eligibility
- reason
- NIL
- role expectation
- interest
- risk
- staff rec

## Staff Table

Columns:

- name
- role
- age
- salary
- contract
- recruiting
- development
- evaluation
- tactics
- region
- workload
- leaving risk

## Finance/NIL Table

Columns:

- player/recruit
- deal type
- amount
- market estimate
- status
- risk
- source
- review
- impact

## Acceptance Criteria

DataGrid is acceptable when:

- Roster and Recruiting use it
- row selection populates inspector
- sorting/filtering work
- saved views persist
- context actions exist
- no core screen uses fake CSS-grid table rows
