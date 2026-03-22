# 7️⃣ Testing Known — The "Proof"

> **Stage 7 of 7:** Close the loop — validate every unknown from Stage 1.

## Purpose

This folder is the **validation layer** of the project. Every hypothesis, OKR, and open question defined in `1_Real_Unknown` must be answered here with evidence. If it isn't tested, it isn't proven.

## What belongs here

- **Validation reports** — Evidence that `1_Real_Unknown` objectives were met
- **Testing checklists** — Per-feature and per-stage checklists
- **Test scripts** — Automated and manual test definitions
- **Acceptance criteria** — Pass/fail criteria for each deliverable
- **Outcome confirmation** — Final sign-off documentation

## Files

| File | Description |
|------|-------------|
| `validation_report.md` | Maps each `1_Real_Unknown` item to its evidence |
| `checklist_stage_1.md` | Validation checklist for `1_Real_Unknown` |
| `checklist_stage_2.md` | Validation checklist for `2_Environment` |
| `checklist_stage_3.md` | Validation checklist for `3_Simulation` |
| `checklist_stage_4.md` | Validation checklist for `4_Formula` |
| `checklist_stage_5.md` | Validation checklist for `5_Symbols` |
| `checklist_stage_6.md` | Validation checklist for `6_Semblance` |
| `acceptance_criteria.md` | Final go/no-go criteria |

## Validation Mapping Format

```markdown
## Objective: [From 1_Real_Unknown]

**Original question:** What was the unknown?
**Test method:** How was it validated?
**Evidence:** Link to test output, screenshot, or log
**Result:** ✅ Passed / ❌ Failed / ⚠️ Partial
**Date validated:** YYYY-MM-DD
```

## Rules

- Every item in `1_Real_Unknown` must have a corresponding entry here
- No item is "done" until it has a result entry in this folder
- Failed validations feed back into `6_Semblance` as lessons learned
- Move completed validation reports to `_obsolete/` after project close 🚮

## 🧪 Master Testing Checklist

<!-- Embed a relevant YouTube video explaining test-driven development / acceptance testing -->

### GitHub Pages & Deployment
- [ ] GitHub Pages enabled and live
- [ ] GitHub Actions workflow passes on `main`
- [ ] `index.html` loads correctly from Pages URL

### Navigation & UI
- [ ] Unified menu present on all pages
- [ ] Menu works on mobile (375px viewport)
- [ ] Search autocomplete returns relevant results
- [ ] Debug mode toggles via `debug=true` cookie
- [ ] Debug navigation shows all 7 stage links
- [ ] Content menu (Menu 2) links all non-framework pages

### Content & Structure
- [ ] All 7 folders exist with populated READMEs
- [ ] All markdown files accessible via `markdown_renderer.html`
- [ ] Image carousel in `3_Simulation` auto-loads new images
- [ ] Each folder has a Testing Checklist with YouTube embed

### Integrations
- [ ] Secrets managed via Doppler (zero secrets in git)
- [ ] Qdrant responds on port 6333
- [ ] Ollama `nomic-embed-text` model available
- [ ] Fly.io backend deploys successfully

### Social & Discovery
- [ ] `index.html` links to GitHub repo
- [ ] `index.html` links to LinkedIn profile
- [ ] `index.html` links to YouTube channel
- [ ] `README.md` contains GitHub Pages URL
- [ ] `robots.txt` and `sitemap.xml` are valid
