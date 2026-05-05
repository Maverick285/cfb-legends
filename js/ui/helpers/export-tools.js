(function initExportTools(global) {
  function escapeCsv(value) {
    const text = String(value ?? "");
    if (!/[",\n]/.test(text)) return text;
    return `"${text.replace(/"/g, '""')}"`;
  }

  function toCsv(rows) {
    return (Array.isArray(rows) ? rows : [])
      .map((row) => (Array.isArray(row) ? row : []).map(escapeCsv).join(","))
      .join("\n");
  }

  function downloadTextFile(filename, content, mimeType) {
    try {
      const blob = new Blob([String(content ?? "")], { type: mimeType || "text/plain;charset=utf-8" });
      const url = global.URL.createObjectURL(blob);
      const link = global.document.createElement("a");
      link.href = url;
      link.download = filename || "export.txt";
      global.document.body.appendChild(link);
      link.click();
      link.remove();
      global.setTimeout(() => global.URL.revokeObjectURL(url), 0);
      return true;
    } catch (error) {
      return false;
    }
  }

  global.CGM_EXPORT_TOOLS = {
    toCsv,
    downloadTextFile,
  };
})(window);
