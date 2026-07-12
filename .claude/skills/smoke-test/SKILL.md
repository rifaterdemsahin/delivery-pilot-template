---
name: smoke-test
description: Run the SPEC-008 smoke test runner over the project pages (local and/or deployed) and follow the failure workflow. Use when asked to run smoke tests, validate the site, check pages for errors, or before any deploy.
---

# 🧪 Smoke Test

Run the template-adapted smoke test runner (SPEC-008 in `4_Formula/specs.md`). It is driven by `navigation_config.json` — no per-project adaptation needed.

## Steps

1. **Local run** (always):
   ```bash
   python3 5_Symbols/toolbox/smoke_test.py --trigger "<what prompted this run>"
   ```
2. **Cloud run** (when the site is deployed — get the URL from `README.md`):
   ```bash
   python3 5_Symbols/toolbox/smoke_test.py --base-url <PAGES_URL> --no-report
   ```
3. The local run writes `6_Semblance/smoke_test_report.md`. Exit code 0 = all pass, 1 = failures.

## On Failure (mandatory workflow)

1. Create a GitHub Issue: title `[SMOKE-FAIL] <test name> — <description>`, label `bug` (template in `7_Testing_Known/smoke_tests.md`).
2. Append to `6_Semblance/error.log`: `[DATE] [7_Testing_Known] [ERROR] — Smoke test failure: <test>. GitHub Issue: <url>`.
3. Fix the issue, append to `6_Semblance/fix.log` with status `APPLIED`.
4. Re-run both modes; when green, update fix.log to `VERIFIED` and close the issue.
5. **Never deploy while a smoke test fails** — the `static.yml` smoke job enforces this in CI.
