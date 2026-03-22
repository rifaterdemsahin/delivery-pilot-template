# 🤖 Claude AI — Delivery Pilot Template

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
| 4 | `4_Formula` | **The "Recipe"** — Step-by-step guides, research, logic |
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
├── 4_Formula/            # Step-by-step guides, research notes, build logic
├── 5_Symbols/            # Source code, PrismJS syntax highlighting
├── 6_Semblance/          # Error logs, near-misses, workarounds
├── 7_Testing_Known/      # Validation, testing checklists, outcomes
├── index.html            # Main entry point with unified navigation
├── markdown_renderer.html
├── robots.txt
├── sitemap.xml
├── .gitignore
├── .env.example
├── aigent.md             # Agent rules & persona instructions
├── claude.md             # This file
├── kilocode.md
├── copilot.md
└── gemini.md
```

---

## 🛠 Core Technical Requirements

### Infrastructure
- **Static Hosting:** GitHub Pages via GitHub Actions
- **Secrets Management:** Doppler (never commit secrets to git)
- **AI Stack:** Qdrant + Ollama (`nomic-embed-text`, 4096 dimensions)
- **Backend:** Fly.io for Python services
- **CI/CD:** GitHub Actions

### Navigation & UI Rules
- Unified responsive menu across all pages (Flexbox/Grid)
- Menu contains links to all 7 folders (no direct link to `markdown_renderer.html`)
- Search with autocomplete in the menu
- Debug mode toggleable via `debug=true` cookie
- Debug button enables top navigation menu showing all 7 stages
- Content menu (Menu 2) for non-framework page content
- Menus read from JSON config (reusable)

### Social Links (required in `index.html`)
- GitHub Repository link
- LinkedIn: [rifaterdemsahin](https://www.linkedin.com/in/rifaterdemsahin/) 🔗
- YouTube: [@RifatErdemSahin](https://www.youtube.com/@RifatErdemSahin) 📺

---

## 🤖 Claude-Specific Instructions

### Behavior Guidelines
- Always follow the 7-stage structure when creating or organizing content
- When adding files, place them in the appropriate numbered folder
- Every significant change must be followed by `git commit` and `git push`
- Use emojis (✨, 🛠, 🧪, 🐛) for scannability

### Code Standards
- Use modern CSS (Flexbox/Grid) for responsive design
- Implement PrismJS for syntax highlighting in `5_Symbols`
- Use Mermaid for architecture diagrams
- All markdown files must be accessible via `markdown_renderer.html`

### Lifecycle Management
- Move obsolete files to `_obsolete/` sub-folder within their directory 🚮
- Every folder must have a Testing Checklist with an embedded YouTube video

### Secrets & Environment
- Use Doppler for all secrets: [dashboard.doppler.com](https://dashboard.doppler.com/workplace/5ccb59c6d72db414f3e7/getting-started)
- Create matching project name in Doppler
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
- [ ] Debug mode toggles via cookie
- [ ] Search autocomplete functional
- [ ] All markdown files render via `markdown_renderer.html`
- [ ] Secrets managed via Doppler (not in git)
- [ ] `index.html` links to GitHub, LinkedIn, YouTube
- [ ] README.md contains GitHub Pages URL
