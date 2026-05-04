// UI-RESCUE-1: DataGrid component
// Spec: ai-pack/CFB_FM_UI_RESCUE_POLISH_PACK/06_DATAGRID_AND_TABLE_SYSTEM_SPEC.md
//
// Render a real management-sim table from a column definition + row array.
// Supports sticky header, sortable columns, formatters, cell types (badge,
// meter, rating), selectable rows, click handlers, empty state.
//
// Returns an HTML string. Caller is responsible for binding row-click events
// using `data-dg-row` attributes (event delegation in app.js).

(function initDataGrid(global) {
  function escapeHtml(s) {
    if (s === null || s === undefined) return "";
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function colAlignClass(col) {
    if (col.align === "right") return "align-right";
    if (col.align === "center") return "align-center";
    if (col.cellType === "number" || col.cellType === "rating") return "align-right";
    return "";
  }

  /**
   * Format a cell. col.formatter wins; otherwise we use cellType defaults.
   */
  function formatCell(col, row) {
    const value = typeof col.accessor === "function" ? col.accessor(row) : row[col.id];
    if (col.formatter) return col.formatter(value, row);
    if (col.cellType === "badge") return badgeCell(value, col.badgeMap);
    if (col.cellType === "meter") return meterCell(value, col.meterMax || 99);
    if (col.cellType === "rating") return value === null || value === undefined ? "—" : escapeHtml(value);
    if (col.cellType === "trend") return trendCell(value);
    if (value === null || value === undefined || value === "") return '<span class="muted">—</span>';
    return escapeHtml(value);
  }

  function badgeCell(value, badgeMap) {
    if (value === null || value === undefined) return '<span class="muted">—</span>';
    const cls = (badgeMap && badgeMap[value]) || "";
    return `<span class="cell-badge ${cls}">${escapeHtml(value)}</span>`;
  }
  function meterCell(value, max) {
    const v = Number(value) || 0;
    const pct = Math.max(0, Math.min(100, (v / max) * 100));
    const tone = v >= max * 0.85 ? "success" : v >= max * 0.55 ? "" : v >= max * 0.35 ? "warning" : "danger";
    return `<span class="cell-meter"><span class="cell-meter-fill ${tone}" style="width:${pct.toFixed(0)}%"></span></span><span style="font-family:var(--font-number)">${v}</span>`;
  }
  function trendCell(value) {
    if (value === "up" || value === "↑") return '<span style="color:var(--success)">▲</span>';
    if (value === "down" || value === "↓") return '<span style="color:var(--danger)">▼</span>';
    return '<span style="color:var(--text-muted)">—</span>';
  }

  /**
   * Sort rows by sortSpec ([{colId, direction}]).
   */
  function sortRows(rows, columns, sortSpec) {
    if (!sortSpec || !sortSpec.length) return rows.slice();
    const sorted = rows.slice();
    const [primary] = sortSpec;
    const col = columns.find((c) => c.id === primary.colId);
    if (!col) return sorted;
    sorted.sort((a, b) => {
      const av = typeof col.accessor === "function" ? col.accessor(a) : a[col.id];
      const bv = typeof col.accessor === "function" ? col.accessor(b) : b[col.id];
      if (av === bv) return 0;
      if (av === null || av === undefined) return 1;
      if (bv === null || bv === undefined) return -1;
      const isNum = typeof av === "number" && typeof bv === "number";
      const cmp = isNum ? av - bv : String(av).localeCompare(String(bv));
      return primary.direction === "desc" ? -cmp : cmp;
    });
    return sorted;
  }

  /**
   * Filter rows. filterSpec = { colId, value, op?: "equals" | "includes" | "min" | "max" | "starts" }
   */
  function filterRows(rows, columns, filters) {
    if (!filters || !filters.length) return rows;
    return rows.filter((row) => filters.every((f) => {
      if (!f.value && f.value !== 0) return true;
      if (f.colId === "_search") {
        const text = String(f.value).toLowerCase();
        return columns.some((c) => {
          const v = typeof c.accessor === "function" ? c.accessor(row) : row[c.id];
          return v != null && String(v).toLowerCase().includes(text);
        });
      }
      const col = columns.find((c) => c.id === f.colId);
      if (!col) return true;
      const v = typeof col.accessor === "function" ? col.accessor(row) : row[col.id];
      if (f.op === "min") return Number(v) >= Number(f.value);
      if (f.op === "max") return Number(v) <= Number(f.value);
      if (f.op === "starts") return String(v || "").toLowerCase().startsWith(String(f.value).toLowerCase());
      if (f.op === "includes") return String(v || "").toLowerCase().includes(String(f.value).toLowerCase());
      return String(v) === String(f.value);
    }));
  }

  /**
   * Render a DataGrid to HTML.
   * @param {object} args
   *   - columns: DataGridColumn[]
   *   - rows: array of row objects
   *   - rowKey: function(row) -> id string
   *   - selectedId?: string
   *   - sort?: [{colId, direction}]
   *   - filters?: FilterSpec[]
   *   - emptyMessage?: string
   *   - dataAttr?: string — name of data-* attribute on each row, defaults to "data-dg-row"
   * @returns {string} HTML
   */
  function renderDataGrid(args) {
    const columns = args.columns || [];
    const rowKeyFn = args.rowKey || ((r) => r.id);
    const sort = args.sort || [];
    const filters = args.filters || [];
    let rows = filterRows(args.rows || [], columns, filters);
    rows = sortRows(rows, columns, sort);
    const dataAttr = args.dataAttr || "dg-row";

    const head = columns.map((col) => {
      const sortable = col.sortable !== false;
      const sorted = sort[0] && sort[0].colId === col.id;
      const sortClass = sorted ? (sort[0].direction === "desc" ? "sorted-desc" : "sorted-asc") : "";
      const cls = [colAlignClass(col), sortable ? "sortable" : "", sortClass].filter(Boolean).join(" ");
      const sortAttr = sortable ? `data-dg-sort="${escapeHtml(col.id)}"` : "";
      const widthAttr = col.width ? `style="width:${col.width}px"` : "";
      return `<th class="${cls}" ${sortAttr} ${widthAttr}>${escapeHtml(col.label)}</th>`;
    }).join("");

    if (!rows.length) {
      return `<table class="dg"><thead><tr>${head}</tr></thead>
        <tbody><tr><td class="empty" colspan="${columns.length || 1}">${escapeHtml(args.emptyMessage || "No rows")}</td></tr></tbody></table>`;
    }

    const body = rows.map((row) => {
      const id = rowKeyFn(row);
      const isSel = id === args.selectedId;
      const cells = columns.map((col) => {
        const cls = colAlignClass(col);
        return `<td class="${cls}">${formatCell(col, row)}</td>`;
      }).join("");
      return `<tr class="${isSel ? "selected" : ""}" data-${dataAttr}="${escapeHtml(id)}">${cells}</tr>`;
    }).join("");

    return `<table class="dg"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  }

  /**
   * Render an ObjectHeader.
   * @param {object} args { title, sub, meta: [{label, value}], actions: [{label, action}] }
   */
  function renderObjectHeader(args) {
    const meta = (args.meta || []).map((m) => {
      const openAttr = m.openView ? ` data-open-view="${escapeHtml(m.openView)}"` : "";
      const cls = m.openView ? "obj-meta-link" : "";
      return `<span class="${cls}"${openAttr}><strong>${escapeHtml(m.label)}</strong> ${escapeHtml(m.value)}</span>`;
    }).join("");
    const actions = (args.actions || []).map((a) =>
      `<button class="${a.primary ? "primary" : ""}" data-obj-action="${escapeHtml(a.action)}">${escapeHtml(a.label)}</button>`
    ).join("");
    return `<header class="obj-header">
      <h2>${escapeHtml(args.title || "")}</h2>
      <p class="obj-header-sub">${escapeHtml(args.sub || "")}</p>
      ${meta ? `<div class="obj-header-meta">${meta}</div>` : ""}
      ${actions ? `<div class="obj-header-actions" style="margin-top:var(--space-3);display:flex;gap:var(--space-2)">${actions}</div>` : ""}
    </header>`;
  }

  /**
   * Render a TabBar.
   * @param {object} args { tabs: [{id, label}], activeId, dataAttr? }
   */
  function renderTabBar(args) {
    const dataAttr = args.dataAttr || "tab-id";
    const tabs = (args.tabs || []).map((t) =>
      `<button class="${t.id === args.activeId ? "active" : ""}" data-${dataAttr}="${escapeHtml(t.id)}">${escapeHtml(t.label)}</button>`
    ).join("");
    return `<nav class="tab-bar">${tabs}</nav>`;
  }

  /**
   * Render an ActionBar.
   * @param {object} args { groups: [{label?, controls: [HTML strings]}], spacer?: bool }
   */
  function renderActionBar(args) {
    const groups = (args.groups || []).map((g) => {
      const labelHtml = g.label ? `<span class="label-pill">${escapeHtml(g.label)}</span>` : "";
      return labelHtml + (g.controls || []).join("");
    });
    return `<div class="action-bar">${groups.join('<span class="action-bar-spacer"></span>')}</div>`;
  }

  /**
   * Render a RightInspector.
   * @param {object} args { title, sub, sections: [{label, html}], actions: [{label, action, primary?}] }
   */
  function renderInspector(args) {
    if (!args.title && !args.sections && !args.empty) {
      return `<aside class="inspector">${args.empty || ""}</aside>`;
    }
    const sectionsHtml = (args.sections || []).map((s) => {
      return `<div class="inspector-section">
        <p class="label">${escapeHtml(s.label)}</p>
        <div>${s.html}</div>
      </div>`;
    }).join("");
    const actionsHtml = (args.actions || []).length
      ? `<div class="inspector-actions">${(args.actions || []).map((a) =>
          `<button class="${a.primary ? "primary" : ""}" data-insp-action="${escapeHtml(a.action)}">${escapeHtml(a.label)}</button>`
        ).join("")}</div>`
      : "";
    return `<aside class="inspector">
      <header class="inspector-header">
        <h3>${escapeHtml(args.title || "")}</h3>
        ${args.sub ? `<p class="sub">${escapeHtml(args.sub)}</p>` : ""}
      </header>
      <div class="inspector-body">${sectionsHtml}</div>
      ${actionsHtml}
    </aside>`;
  }

  /**
   * Compose a full table workspace.
   * @param {object} args { header, tabs, actions, dataGrid, inspector }
   */
  function renderTableWorkspace(args) {
    const inspectorHtml = args.inspector || "";
    const cls = inspectorHtml ? "fm-workspace" : "fm-workspace no-inspector";
    return `<div class="${cls}">
      <div class="fm-workspace-main">
        ${args.header || ""}
        ${args.tabs || ""}
        ${args.actions || ""}
        <div class="fm-workspace-content">${args.dataGrid || ""}</div>
        ${args.status ? `<div class="fm-workspace-status">${args.status}</div>` : ""}
      </div>
      ${inspectorHtml}
    </div>`;
  }

  global.CGM_DATAGRID = {
    renderDataGrid,
    renderObjectHeader,
    renderTabBar,
    renderActionBar,
    renderInspector,
    renderTableWorkspace,
    sortRows,
    filterRows,
    escapeHtml,
  };
})(window);
