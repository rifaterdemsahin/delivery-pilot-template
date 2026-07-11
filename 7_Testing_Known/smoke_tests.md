# Smoke Tests & Error Resolution

> **Stage 7: Testing Known** — Smoke testing strategy that opens pages, checks for errors, reports to GitHub Issues, resolves them, and logs in `6_Semblance/`.

## Purpose

After every implementation in `5_Symbols`, run smoke tests to validate that the built functionality works end-to-end. Smoke tests catch runtime errors early and establish a feedback loop between testing and fixing.

## Smoke Test Flow

```
5_Symbols (Code built)
    ↓
Run Smoke Tests
    ├── Open pages (index.html, markdown_renderer.html, API endpoints)
    ├── Check console for errors
    ├── Verify navigation menus render
    ├── Validate markdown rendering
    └── Check cookie persistence
    ↓
Errors Found? 
    ├── YES → Create GitHub Issue → Resolve → Log fix in 6_Semblance/
    └── NO →  Pass, log verification
    ↓
Report Results → 6_Semblance/smoke_test_report.md
```

## What Smoke Tests Cover

| Test | What It Checks | When It Fails |
|------|---------------|---------------|
| **Page Load** | `index.html` and `markdown_renderer.html` load without JS errors | Console errors, blank page, 404 |
| **Project Menu** | Always-visible top navigation renders correctly | Missing links, layout break on mobile |
| **Debug Menu** | Bottom-right button toggles debug overlay | No toggle, cookie not persisting, search broken |
| **Markdown Renderer** | `markdown_renderer.html?file=1_Real_Unknown/` renders content | marked.js fails, PrismJS not highlighting |
| **Image Carousel** | Carousel on `index.html` cycles through images | Images broken, config not loading |
| **GitHub Edit Button** | Edit-on-GitHub button links to correct file | Wrong URL, button missing |
| **Navigation Config** | Both menus load from `navigation_config.json` | Fallback arrays used, file not found |
| **Cookie Persistence** | Debug toggle state survives page reload | Cookie not set, toggle resets |
| **Responsive Layout** | Mobile viewport (375px) renders menus correctly | Overflow, hidden content, broken grid |

## Running Smoke Tests

### Manual (Local)
```bash
# Open the site locally
open index.html

# Open markdown renderer with a test file
open "markdown_renderer.html?file=1_Real_Unknown/README.md"

# Check browser console (Chrome: Cmd+Option+J, Firefox: Cmd+Option+K)
# Look for: JS errors, 404s, CORS issues, missing CDN resources
```

### Automated via GitHub Actions
```yaml
# .github/workflows/smoke-test.yml
name: Smoke Tests
on: [push, pull_request]
jobs:
  smoke:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate HTML
        run: npx html-validate index.html markdown_renderer.html
      - name: Check navigation config
        run: node scripts/validate-nav-config.js
      - name: Link checker
        run: npx linkinator https://rifaterdemsahin.github.io/delivery-pilot-template/ --recurse
```

## GitHub Issues Integration

When smoke tests find an error:

1. **Create GitHub Issue** with the template:
   ```
   Title: [SMOKE-FAIL] <test name> — <brief description>
   
   Labels: bug, smoke-test
   
   Body:
   ### Smoke Test
   - Test: <name of failing test>
   - Page: <URL or file path>
   - Console Error: <paste error>
   
   ### Steps to Reproduce
   1. Open <page>
   2. Check <element>
   3. Observe error
   
   ### Expected
   <what should happen>
   
   ### Actual
   <what actually happened with screenshot>
   ```

2. **Link the issue** in `6_Semblance/error.log`:
   ```
   [2026-07-11] [7_Testing_Known] [ERROR] — Smoke test failure: <test name>. 
   GitHub Issue: https://github.com/rifaterdemsahin/delivery-pilot-template/issues/<num>
   ```

3. **Resolve the issue** with a fix in `5_Symbols`

4. **Log resolution** in `6_Semblance/fix.log`:
   ```
   [2026-07-11] [6_Semblance] [APPLIED] — Fix for smoke test failure #<num>: <description>
   ```

5. **Close the GitHub Issue** with a reference to the fix commit

## Smoke Test Report

After every smoke test run, create or update `6_Semblance/smoke_test_report.md`:

```markdown
# Smoke Test Report

## Run Info
- **Date:** 2026-07-11
- **Trigger:** Post-implementation of <feature>
- **Tester:** <agent/human>

## Results Summary
| Test | Result | Issue |
|------|--------|-------|
| Page Load | Pass/Fail | #N |
| Project Menu | Pass/Fail | — |
| Debug Menu | Pass/Fail | #N |
| Markdown Renderer | Pass/Fail | — |
| Image Carousel | Pass/Fail | — |
| GitHub Edit | Pass/Fail | — |
| Navigation Config | Pass/Fail | — |
| Cookie Persistence | Pass/Fail | — |
| Responsive Layout | Pass/Fail | #N |

## Failures
### #1 — <test name>
- **Error:** <description>
- **GitHub Issue:** https://github.com/rifaterdemsahin/delivery-pilot-template/issues/<num>
- **Resolution:** <fix applied, commit hash>
- **Status:** Fixed / Open

## Resolved Issues
- #<num> — Fixed in commit <hash>
```

## Rules

1. **Smoke test after every implementation** — code in `5_Symbols` is not complete until smoke tests pass
2. **Every failure gets a GitHub Issue** — no error goes unreported
3. **Every fix gets logged in `6_Semblance/`** — `error.log` for discovery, `fix.log` for resolution
4. **Report output in `6_Semblance/smoke_test_report.md`** — one report per test run
5. **Close the loop** — when the issue is resolved, update both the GitHub Issue and the fix log with `VERIFIED` status
6. **Smoke tests gate deployments** — do not deploy if any smoke test fails

## Integration with 7-Stage Flow

| Stage | Smoke Test Role |
|-------|----------------|
| `5_Symbols` | Code is the subject under test |
| `7_Testing_Known` | Smoke tests run here, verify all pages and features |
| `6_Semblance` | Failures logged, fixes applied, resolution reported |
| GitHub Issues | Public tracking of each found error |
