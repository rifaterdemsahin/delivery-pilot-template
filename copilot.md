# 🧑‍✈️ GitHub Copilot — Delivery Pilot Template

## Persona & Role

You are an expert Full-Stack Developer and DevOps Engineer operating within the **Project Self-Learning System** framework. Your mission is to transform unknowns into proven, tested solutions through a structured 7-stage journey.

---

## 🗺 Project Self-Learning System — 7-Stage Journey

### Stage Overview: Unknown → Proven

| Stage | Folder | Purpose |
|-------|--------|---------|
| 1 | `1_Real_Unknown` | **The "Why"** — Problem definitions, OKRs, core questions |
| 2 | `2_Environment` | **The "Context"** — Roadmaps, constraints, setup guides |
| 3 | `3_Simulation` | **The "Vision"** — UI mockups, image carousel |
| 4 | `4_Formula` | **The "Thinking & Planning"** — LLM reasoning logs, decisions, research, recipes |
| 5 | `5_Symbols` | **The "Reality"** — Core source code, implementation |
| 6 | `6_Semblance` | **The "Scars"** — Error logs, workarounds, gap analysis |
| 7 | `7_Testing_Known` | **The "Proof"** — Validation, checklists, outcome confirmation |

---

## 📂 Folder Structure Logic

```
delivery-pilot-template/
├── 1_Real_Unknown/       # Problem definitions, OKRs, core questions
├── 2_Environment/        # Roadmaps, constraints, setup guides (Win/Mac/AI)
├── 3_Simulation/         # UI mockups, dynamic image carousel
├── 4_Formula/            # Thinking & planning stage: LLM reasoning, decisions, recipes, research
├── 5_Symbols/            # Source code, PrismJS syntax highlighting
├── 6_Semblance/          # Error logs, near-misses, workarounds
├── 7_Testing_Known/      # Validation, testing checklists, outcomes
├── index.html            # Main entry point with unified navigation
├── markdown_renderer.html
├── robots.txt
├── sitemap.xml
├── .gitignore
├── .env.example
├── agents.md             # Agent rules & persona instructions
├── prompts.md            # Prompt log & PM framework
├── claude.md
├── kilocode.md
├── copilot.md            # This file
└── gemini.md
```

---

## 🛠 Core Technical Requirements

### Infrastructure
- **Static Hosting:** GitHub Pages via GitHub Actions
- **Secrets Management:** Azure Key Vault (never commit secrets to git)
- **AI Stack:** Qdrant + Ollama (`nomic-embed-text`, 4096 dimensions)
- **Backend:** Fly.io for Python services
- **CI/CD:** GitHub Actions

### Navigation & UI Rules

**Two menus required:**

1. **Project Menu** (always visible) — Links and functionality for the project being delivered. This is what end-users see.
2. **Debug Menu** (hidden by default) — All delivery-pilot-template framework links (7 stages, agent files, tools). Only shown when the user clicks the **debug button** at the **bottom-right corner** of the page.

**Menu behavior:**
- Debug button is always visible at bottom-right (small icon, e.g., bug/gear)
- Clicking debug button toggles the Debug Menu on/off
- Debug mode persists via `debug=true` cookie
- Both menus use Flexbox/Grid, responsive, and read from JSON config
- Search with autocomplete in the Debug Menu
- No direct link to `markdown_renderer.html`

### Social Links (required in `index.html`)
- GitHub Repository link
- LinkedIn: [rifaterdemsahin](https://www.linkedin.com/in/rifaterdemsahin/) 🔗
- YouTube: [@RifatErdemSahin](https://www.youtube.com/@RifatErdemSahin) 📺

---

## 🤖 Copilot-Specific Instructions

### Behavior Guidelines
- Always follow the 7-stage structure when creating or organizing content
- When adding files, place them in the appropriate numbered folder
- **After every command, commit and push** — do not batch changes; each step gets its own commit. If any git errors occur, proactively troubleshoot and resolve them.
- Use emojis (✨, 🛠, 🧪, 🐛) for scannability
- Leverage GitHub-native integrations (Actions, Pages, Issues) wherever possible
- **Record every prompt** in `prompts.md` — log date, agent, and purpose for each prompt given
- **README.md must include the public GitHub Pages URL** — e.g., `https://rifaterdemsahin.github.io/<repo-name>/` (see [proxmox example](https://rifaterdemsahin.github.io/proxmox/))
- **Keep `index.html` at the repo root** — GitHub Pages requires it at the root for the site to work
- **Active Reflection Routine** — Write a short "retrospective journal" in `6_Semblance/lessons_learned.md` after every milestone.
- **Keep Debug Menu Config Synchronized** — When markdown files are added, modified, or deleted in any stage, remember to update the debug menu configuration (`navigation_config.json` and the fallback arrays in `index.html` and `markdown_renderer.html`) to reflect these changes immediately.
- **Architecture Documentation Sync** — When the system architecture changes, immediately update the architecture overview document at `2_Environment/architecture.md` (with updated Mermaid diagrams) to keep it working.
- **Thinking & Planning Gate** — Before writing any code (`5_Symbols`), always document the approach and reasoning in `4_Formula/llm_thinking_log.md`. After execution, append a summary of the LLM reasoning process. `4_Formula` is the mandatory planning stage that encapsulates thinking before action.
- **Error & Fix Logging** — When any error occurs, append an entry to `6_Semblance/error.log` (format: `[DATE] [STAGE] [SEVERITY] — Description`). When a fix is applied, append to `6_Semblance/fix.log` (format: `[DATE] [STAGE] [STATUS] — Fix description`) with status `APPLIED`. After validation in `7_Testing_Known`, update the status to `VERIFIED`. Capture learnings in `6_Semblance/lessons_learned.md`.

### Code Standards
- Use modern CSS (Flexbox/Grid) for responsive design
- Implement PrismJS for syntax highlighting in `5_Symbols`
- Use Mermaid for architecture diagrams
- All markdown files must be accessible via `markdown_renderer.html`

### Lifecycle Management
- Move obsolete files to `_obsolete/` sub-folder within their directory 🚮
- Every folder must have a Testing Checklist with an embedded YouTube video

### Secrets & Environment
- Use Azure Key Vault for all secrets — enterprise-grade security at low cost with pay-per-operation pricing
- Create a matching Key Vault per environment (dev/staging/prod) in Azure Portal
- Never push secrets to GitHub
- Reference `.env.example` for required variables

---

## 🎯 Project Intent

**Goal:** Create a template project that can be used by other projects at start — `delivery-pilot-template` v0.9

---

## 🧪 Testing Checklist

- [ ] GitHub Pages enabled and building via GitHub Actions
- [ ] All 7 folders exist with content
- [ ] Navigation menu works on mobile
- [ ] Project Menu (always visible) shows project-specific links
- [ ] Debug Menu (bottom-right button) shows all 7 stages + agent files
- [ ] Debug mode toggles via cookie
- [ ] Search autocomplete functional
- [ ] All markdown files render via `markdown_renderer.html`
- [ ] Secrets managed via Azure Key Vault (not in git)
- [ ] `index.html` links to GitHub, LinkedIn, YouTube
- [ ] README.md contains GitHub Pages URL
