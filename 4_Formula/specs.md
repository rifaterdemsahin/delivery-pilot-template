# Technical Specifications

> **Stage 4: Formula** — Living specs document. All features must be specced here before code touches `5_Symbols`.

## Spec System Rules
1. **Before implementation** — every feature gets a spec entry here
2. **New tasks arriving** — check this file for affected specs, flag changes with `[NEEDS UPDATE]`
3. **Warn on mismatch** — if a task would alter behavior covered by an existing spec, flag and warn before coding
4. **Post-implementation** — update the spec to reflect final decisions
5. **Code drift detection** — After implementation in `5_Symbols`, diff the code against active specs. Flag deviations with `[DRIFT]` and document in `llm_thinking_log.md`

---

## Active Specs

### SPEC-001: Two-Menu Navigation Architecture
- **Status:** Active
- **Description:** Project Menu (always visible) + Debug Menu (toggle via bottom-right button, persisted via cookie)
- **Key Behaviors:**
  - Debug button always visible at bottom-right
  - Click toggles debug menu overlay
  - Cookie `debug=true` persists state
  - Both menus read from `navigation_config.json`
  - Fallback arrays in `index.html` and `markdown_renderer.html` must stay in sync
  - Search with autocomplete in debug menu
- **Related Files:** `index.html`, `markdown_renderer.html`, `navigation_config.json`
- **Last Updated:** 2026-05-30

### SPEC-002: Markdown Renderer with GitHub Edit
- **Status:** Active
- **Description:** `markdown_renderer.html` renders any markdown file via URL query parameter, with Edit on GitHub button
- **Key Behaviors:**
  - Loads markdown from `?file=` query parameter
  - Renders via marked.js + PrismJS syntax highlighting
  - Shows "Edit on GitHub" button linking to `edit/main/{filePath}`
  - Debug menu toggle available in renderer
- **Related Files:** `markdown_renderer.html`
- **Last Updated:** 2026-05-30

### SPEC-003: Image Carousel
- **Status:** Active
- **Description:** Auto-updating image carousel on `index.html` loaded dynamically from `3_Simulation/`
- **Key Behaviors:**
  - Reads image list from `carousel_config.json`
  - Supports `.png`, `.jpg`, `.gif`, `.webp`
  - Manual navigation with prev/next buttons
  - Auto-advance with CSS transitions
- **Related Files:** `index.html`, `3_Simulation/carousel_config.json`
- **Last Updated:** 2026-05-30

### SPEC-004: Secrets Management via Azure Key Vault
- **Status:** Active
- **Description:** All secrets stored in Azure Key Vault, loaded at runtime, never in git
- **Key Behaviors:**
  - `.env.example` lists required variables with empty values
  - Secrets loaded via Azure SDK or GitHub Actions
  - One Key Vault per environment (dev/staging/prod)
  - Supabase keys, Axiom tokens, Fly.io tokens all in Key Vault
- **Related Files:** `.env.example`, `2_Environment/setup_azure.md`
- **Last Updated:** 2026-06-19

### SPEC-005: Specs System (this file)
- **Status:** Active
- **Description:** All features must be specced in `4_Formula/specs.md` before implementation. New tasks check specs, flag updates, warn on conflicts.
- **Key Behaviors:**
  - Spec lives in `4_Formula/specs.md`
  - New tasks check for affected specs
  - `[NEEDS UPDATE]` flag for specs requiring changes
  - Warning emitted when a task contradicts an active spec
- **Related Files:** `4_Formula/specs.md`, `AGENTS.md`, all agent persona files
- **Last Updated:** 2026-07-11

### SPEC-006: Stage Dependency Chain (1 → 2 → 3)
- **Status:** Active
- **Description:** Defines how upstream stages feed each other and what each stage contributes to the downstream stages.
- **Key Behaviors:**
  - `1_Real_Unknown` defines the objective: problem statement, OKRs, hypotheses, and open questions. This drives what tools and environment are needed.
  - `2_Environment` defines the tooling: blueprints, architecture (Mermaid/Excalidraw), setup guides, dependencies, libraries, and packages. Changes here determine what is possible in 3_Simulation designs.
  - `3_Simulation` defines the vision: visual designs, mockups, wireframes, flow diagrams. These must reflect both the objectives (from stage 1) and the technical constraints (from stage 2).
  - The chain flows: `1_Real_Unknown` (why) → `2_Environment` (what tools) → `3_Simulation` (visual vision) → `4_Formula` (specs + approval) → `5_Symbols` (code).
  - When a dependency changes in stage 2 (e.g., a new library or tool), stage 3 designs must be reviewed for compatibility and updated if needed.
  - Stage 1 OKR changes ripple through stage 2 (do we need new tools?) and stage 3 (does the design still match the objective?).
- **Related Files:** `1_Real_Unknown/problem_statement.md`, `1_Real_Unknown/okrs.md`, `2_Environment/architecture.md`, `2_Environment/dependencies.md`, `2_Environment/tools.md`, `3_Simulation/design_workflow.md`, `4_Formula/specs.md`
- **Last Updated:** 2026-07-11

### SPEC-007: Code Drift Detection
- **Status:** Active
- **Description:** Formula Agent identifies when code in `5_Symbols` deviates from active specs in `specs.md`
- **Key Behaviors:**
  - After `5_Symbols` implementation, compare code behavior against the active spec
  - Any deviation is flagged with `[DRIFT]` in the relevant spec entry
  - Drift is documented in `llm_thinking_log.md` with the gap analysis
  - Drift must be resolved before the spec gate passes (spec + designs reviewed)
  - If drift is intentional, update the spec first to capture the new behavior, then flag drift as resolved
- **Related Files:** `4_Formula/specs.md`, `4_Formula/llm_thinking_log.md`, `5_Symbols/*`
- **Last Updated:** 2026-07-11

### SPEC-008: Template-Adapted Smoke Test Runner
- **Status:** Active
- **Description:** A dependency-free Python script (`5_Symbols/toolbox/smoke_test.py`) that scans the project's pages and structure, runs the smoke test suite, and generates `6_Semblance/smoke_test_report.md`. Template-adapted: it reads `navigation_config.json` as its source of truth, so any project bootstrapped from this template gets working smoke tests without code changes.
- **Key Behaviors:**
  - Reads `navigation_config.json` (projectMenu + debugMenu) and derives the page/file inventory from it — no hardcoded file lists
  - Checks: config JSON validity, every menu URL resolves to an existing file/folder, required root files exist (`index.html`, `markdown_renderer.html`, `README.md`, `robots.txt`, `sitemap.xml`), social links present in `index.html`, GitHub Pages URL present in `README.md`, 3-way navigation sync (config = `index.html` fallback = `markdown_renderer.html` fallback), stage markdown files not orphaned from the debug menu, no committed secrets patterns
  - Optional `--base-url` mode fetches the deployed site over HTTP and verifies pages return 200 (cloud smoke test); default mode is local filesystem
  - Writes results to `6_Semblance/smoke_test_report.md` in the report format defined in `7_Testing_Known/smoke_tests.md`; exit code 0 = all pass, 1 = failures (CI gate compatible)
  - Failures must be raised as GitHub Issues per the Smoke Tests & GitHub Issues rule
- **Related Files:** `5_Symbols/toolbox/smoke_test.py`, `6_Semblance/smoke_test_report.md`, `7_Testing_Known/smoke_tests.md`, `navigation_config.json`
- **Last Updated:** 2026-07-12

### SPEC-009: Sanity Check Report Loop (7 → 1)
- **Status:** Active
- **Description:** The canonical sanity check report lives in `1_Real_Unknown/sanity_check_report.md`, owned by the Real Agent's sanity check sub-agent. Stage 7 (`7_Testing_Known`) produces the validation data (smoke test results, validation reports, logic chains); the Real Agent consumes that data and publishes the report in Stage 1 — completing the 7 → 1 loop back to the "why".
- **Key Behaviors:**
  - `7_Testing_Known/sanity_check_report.md` is a data-source pointer document, not the report itself; historical reports move to `7_Testing_Known/_obsolete/`
  - The Stage-1 report cites its Stage-7 data inputs (`smoke_tests.md`, `validation_report.md`, `logic.md`, latest `6_Semblance/smoke_test_report.md`)
  - Every sanity check run updates `1_Real_Unknown/risks.md` (new risks added, solved risks moved)
  - Loop: 1 (objectives) → … → 7 (test evidence) → 1 (sanity verdict against objectives)
- **Related Files:** `1_Real_Unknown/sanity_check_report.md`, `1_Real_Unknown/risks.md`, `7_Testing_Known/sanity_check_report.md`, `6_Semblance/smoke_test_report.md`
- **Last Updated:** 2026-07-12

---

## Spec Template

```markdown
### SPEC-XXX: [Feature Name]
- **Status:** Active | Draft | Deprecated
- **Description:** What this feature does
- **Key Behaviors:**
  - Behavior point 1
  - Behavior point 2
- **Related Files:** `path/to/file`
- **Last Updated:** YYYY-MM-DD
```
