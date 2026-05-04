// Tiny in-browser test harness.
// Per DL-20260502-03: plain-JS modules don't use Vitest. Each spec module
// registers tests via `CGM_TEST_RUNNER.suite(name, fn)`; tests run on
// DOMContentLoaded and write a summary to `window.CGM_TEST_RESULTS` for
// programmatic inspection (used by browser automation + dev console).
(function initTestRunner(global) {
  const suites = [];
  const results = [];

  function suite(name, register) {
    suites.push({ name, register });
  }

  function deepEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== "object" || typeof b !== "object" || !a || !b) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const ak = Object.keys(a);
    const bk = Object.keys(b);
    if (ak.length !== bk.length) return false;
    for (const k of ak) if (!deepEqual(a[k], b[k])) return false;
    return true;
  }

  function makeContext(suiteName) {
    const cases = [];
    return {
      cases,
      test(label, body) {
        try {
          let assertions = 0;
          body({
            equal(actual, expected, msg) {
              assertions += 1;
              if (!deepEqual(actual, expected)) {
                throw new Error(`${msg || "equal"}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
              }
            },
            ok(value, msg) {
              assertions += 1;
              if (!value) throw new Error(`${msg || "ok"}: value was falsy (${JSON.stringify(value)})`);
            },
            close(actual, expected, tolerance, msg) {
              assertions += 1;
              if (Math.abs(actual - expected) > tolerance) {
                throw new Error(`${msg || "close"}: ${actual} not within ${tolerance} of ${expected}`);
              }
            },
            inRange(value, lo, hi, msg) {
              assertions += 1;
              if (value < lo || value > hi) {
                throw new Error(`${msg || "inRange"}: ${value} not in [${lo}, ${hi}]`);
              }
            },
          });
          cases.push({ suite: suiteName, label, status: "pass", assertions });
        } catch (err) {
          cases.push({ suite: suiteName, label, status: "fail", error: String(err && err.message || err) });
        }
      },
    };
  }

  function run() {
    results.length = 0;
    suites.forEach((s) => {
      const ctx = makeContext(s.name);
      try {
        s.register(ctx);
      } catch (err) {
        ctx.cases.push({ suite: s.name, label: "(suite registration)", status: "fail", error: String(err && err.message || err) });
      }
      ctx.cases.forEach((c) => results.push(c));
    });
    const pass = results.filter((r) => r.status === "pass").length;
    const fail = results.filter((r) => r.status === "fail").length;
    const summary = { ranAt: new Date().toISOString(), suites: suites.length, total: results.length, pass, fail, results };
    global.CGM_TEST_RESULTS = summary;
    if (fail > 0 && global.console) {
      global.console.warn(`[CGM tests] ${fail} of ${results.length} failed:`);
      results.filter((r) => r.status === "fail").forEach((r) => {
        global.console.warn(`  - ${r.suite}: ${r.label} — ${r.error}`);
      });
    } else if (global.console) {
      global.console.log(`[CGM tests] ${pass}/${results.length} passing across ${suites.length} suites.`);
    }
    return summary;
  }

  global.CGM_TEST_RUNNER = { suite, run };
  // Auto-run after the page settles, so all modules have registered.
  if (global.document && global.document.addEventListener) {
    global.document.addEventListener("DOMContentLoaded", () => {
      // Defer to after app.js boot (it also runs at DOMContentLoaded).
      setTimeout(run, 50);
    });
  }
})(window);
