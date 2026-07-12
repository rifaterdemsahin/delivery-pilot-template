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
  - **Project Menu** — always visible, shows project-specific links (Home, Docs, API). End-user facing. Every project HTML output must include this menu.
  - **Debug Menu** — hidden by default, toggled via bottom-right debug button. Shows the delivery pilot framework: all 7 stages, agent files, config files. Developer-facing.
  - Both menus read from `navigation_config.json` as a single source of truth
  - Fallback arrays in `index.html` and `5_Symbols/markdown_renderer.html` must stay in sync
  - Search with autocomplete in debug menu
  - `index.html` (root, GitHub Pages entry point) is a **project page** → gets Project Menu + Debug Menu (for developers)
  - `5_Symbols/markdown_renderer.html` renders markdown files → gets both menus so any doc page has full navigation
  - New HTML outputs created by the project should use the shared menu loading code so menus stay consistent
- **Related Files:** `index.html`, `5_Symbols/markdown_renderer.html`, `navigation_config.json`, `4_Formula/navigation.md`
- **Last Updated:** 2026-07-12

### SPEC-002: Markdown Renderer with GitHub Edit
- **Status:** Active
- **Description:** `5_Symbols/markdown_renderer.html` renders any markdown file via URL query parameter, with Edit on GitHub button. Lives in `5_Symbols` (it is source code, not a root entry point); only `index.html` stays at the root for GitHub Pages.
- **Key Behaviors:**
  - Loads markdown from `?file=` query parameter; the parameter is always a **root-relative** path (e.g. `1_Real_Unknown/risks.md`)
  - All internal fetches/links inside the renderer are prefixed with `../` (site root is one level up from the renderer)
  - Renders via marked.js + PrismJS syntax highlighting
  - "Edit on GitHub" button derives `{user}/{repo}` from `location.hostname`/`pathname` on `*.github.io` (template-reusable); falls back to the configured repo when served locally
  - Debug menu toggle available in renderer
- **Related Files:** `5_Symbols/markdown_renderer.html`, `index.html`, `navigation_config.json`
- **Last Updated:** 2026-07-12

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

### SPEC-010: Template Consumption by Downstream Projects
- **Status:** Active
- **Description:** This repository is a **template** — other projects start from it. Every consumer-facing file must be reusable without manual archaeology: placeholders are explicit, project-specific values are concentrated, and each agent persona file tells the consumer LLM agent how to bootstrap.
- **Key Behaviors:**
  - All 5 agent files (`agents.md`, `claude.md`, `gemini.md`, `copilot.md`, `kilocode.md`) carry a "Using This Template" section with the placeholder table and bootstrap steps for consumer LLM agents
  - Standard placeholders: `{{PROJECT_NAME}}`, `{{GITHUB_USER}}`, `{{REPO_NAME}}`, `{{PAGES_URL}}`, `{{LINKEDIN_URL}}`, `{{YOUTUBE_URL}}` — consumers search-and-replace these six values
  - Project-specific values live in: `navigation_config.json` (projectMenu), `index.html` (social links, titles), `README.md` (Pages URL), `sitemap.xml`/`robots.txt` (absolute URLs), `supabase/config.toml` under `2_Environment/` (project id)
  - Runtime code must not hardcode the repo where it can derive it (e.g. renderer's GitHub edit URL derives user/repo from the Pages URL)
  - Bootstrap validation: run `python3 5_Symbols/toolbox/smoke_test.py` after replacing placeholders — it is config-driven and needs no adaptation
  - CI/CD is owned by the **Formula Agent**: `.github/workflows/static.yml` runs the smoke test gate, then deploys to GitHub Pages (Continuous Integration → Continuous Delivery → Continuous Deployment)
- **Related Files:** `agents.md`, `claude.md`, `gemini.md`, `copilot.md`, `kilocode.md`, `.github/workflows/static.yml`, `5_Symbols/toolbox/smoke_test.py`
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
