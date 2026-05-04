(function initWorkspaceTable(global) {
  function fallbackTable(rows) {
    return `<div class="table-list">${(rows || []).map((row, index) => {
      const className = index === 0 ? "table-row header" : "table-row";
      const cells = (row || []).map((cell, cellIndex) => {
        const tag = index > 0 && cellIndex === 1 ? "strong" : "span";
        return `<${tag}>${cell ?? ""}</${tag}>`;
      }).join("");
      return `<div class="${className}">${cells}</div>`;
    }).join("")}</div>`;
  }

  function renderSimpleWorkspaceTable(rows, options = {}) {
    const DG = global.CGM_DATAGRID;
    if (!DG) return fallbackTable(rows || []);
    const source = Array.isArray(rows) ? rows : [];
    if (!source.length || source.length < 2) return `<div class="table-list"><div class="table-row"><span>${options.emptyMessage || "No data"}</span></div></div>`;
    const [headerRow, ...bodyRows] = source;
    const columns = headerRow.map((label, index) => ({
      id: `c${index}`,
      label: String(label),
      accessor: (row) => row[`c${index}`],
      sortable: false,
    }));
    const dataRows = bodyRows.map((row, rowIndex) => {
      const record = { _id: `${options.keyPrefix || "row"}-${rowIndex}` };
      headerRow.forEach((_, cellIndex) => {
        record[`c${cellIndex}`] = Array.isArray(row) ? (row[cellIndex] ?? "") : "";
      });
      return record;
    });
    return DG.renderDataGrid({
      columns,
      rows: dataRows,
      rowKey: (row) => row._id,
      emptyMessage: options.emptyMessage || "No data",
    });
  }

  global.CGM_WORKSPACE_TABLE = {
    renderSimpleWorkspaceTable,
  };
})(window);
