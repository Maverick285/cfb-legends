import type { ReactNode } from "react";

export type DataTableColumn<TRow, TSortKey extends string> = {
  id: string;
  label: string;
  sortKey?: TSortKey;
  className?: string;
  render: (row: TRow) => ReactNode;
};

type DataTableProps<TRow, TSortKey extends string> = {
  rows: TRow[];
  columns: Array<DataTableColumn<TRow, TSortKey>>;
  getRowKey: (row: TRow) => string;
  selectedRowKey?: string;
  sortKey?: TSortKey;
  sortDirection?: "asc" | "desc";
  onSort?: (sortKey: TSortKey) => void;
  onRowClick?: (row: TRow) => void;
  onRowDoubleClick?: (row: TRow) => void;
  tableClassName: string;
};

export function DataTable<TRow, TSortKey extends string>({
  rows,
  columns,
  getRowKey,
  selectedRowKey,
  sortKey,
  sortDirection,
  onSort,
  onRowClick,
  onRowDoubleClick,
  tableClassName,
}: DataTableProps<TRow, TSortKey>) {
  return (
    <table className={tableClassName}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id} className={column.className}>
              {column.sortKey && onSort ? (
                <button type="button" onClick={() => onSort(column.sortKey as TSortKey)}>
                  {column.label}{sortKey === column.sortKey ? (sortDirection === "asc" ? " ^" : " v") : ""}
                </button>
              ) : column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const rowKey = getRowKey(row);
          return (
            <tr
              key={rowKey}
              className={rowKey === selectedRowKey ? "selected" : ""}
              onClick={() => onRowClick?.(row)}
              onDoubleClick={() => onRowDoubleClick?.(row)}
            >
              {columns.map((column) => (
                <td key={column.id} className={column.className}>{column.render(row)}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
