# Technical Specifications

> **Stage 4: Formula** — Living specs document. All features must be specced here before code touches `5_Symbols`.

## Spec System Rules
1. **Before implementation** — every feature gets a spec entry here
2. **New tasks arriving** — check this file for affected specs, flag changes with `[NEEDS UPDATE]`
3. **Warn on mismatch** — if a task would alter behavior covered by an existing spec, flag and warn before coding
4. **Post-implementation** — update the spec to reflect final decisions

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
