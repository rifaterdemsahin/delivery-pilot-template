# 5️⃣ Symbols — The "Reality"

> **Stage 5 of 7:** The actual code — where vision becomes working software.

## Purpose

This folder contains the **core source code and implementation files**. Everything that runs, executes, or is deployed lives here. Code is rendered with PrismJS syntax highlighting for readable documentation.

## What belongs here

- **Source code** — All scripts, modules, and application code
- **Configuration files** — App config (non-secret)
- **Docker definitions** — `Dockerfile` and `docker-compose.yml`
- **GitHub Actions workflows** — CI/CD pipeline definitions
- **Static assets** — JS, CSS bundles used by the app

## Structure & Subfolders

`5_Symbols/` is organized into two primary subfolders to keep project code decoupled from framework tooling:

```
5_Symbols/
├── 🚀 project/        — Application & product-specific code (backend, frontend, microservices)
├── 🎛️ deliverypilot/  — DeliveryPilot framework components & tools (e.g., master_review)
├── 📜 rules/          — Standing operating rules, coding standards, and git conventions
└── 🧰 toolbox/        — Automation scripts (smoke_test.py, nav_sync.py, gen_repo_files.py)
```

## Files & Folders

| File / Folder | Description |
|---|---|
| [`project/`](project/README.md) | Application and product-specific source code |
| [`deliverypilot/`](deliverypilot/README.md) | Framework-level tools and review suites (e.g. Master Review) |
| [`rules/`](rules/agent_operating_rules.md) | Agent operating rules, coding standards, and conventions |
| [`toolbox/`](toolbox/) | Project verification scripts, smoke tests, and catalog generators |
| `markdown_renderer.html` | Markdown document viewer with live navigation |
| `artifacts_carousel.html` | Interactive artifact presentation carousel |

## Code Standards

- **Syntax highlighting:** PrismJS (included via CDN in all HTML pages)
- **Style:** Modern CSS — Flexbox/Grid, no legacy floats
- **Diagrams:** Mermaid for all architecture and flow diagrams
- **Backend:** Python on Fly.io
- **Frontend:** Static HTML/CSS/JS on GitHub Pages

## Secrets

- **Never** store secrets in this folder
- Use `.env.example` in root to document required variables
- Load secrets at runtime via Azure Key Vault

## Rules

- Keep `main.py` minimal — delegate to modules
- Every function that isn't self-evident gets a comment
- Move deprecated code to `_obsolete/` 🚮

## 🧪 Testing Checklist

[![CI/CD with GitHub Actions](https://img.youtube.com/vi/R8_veQiYur0/0.jpg)](https://www.youtube.com/watch?v=R8_veQiYur0)

- [ ] `main.py` runs without errors locally
- [ ] `Dockerfile` builds successfully
- [ ] `docker-compose.yml` starts all services
- [ ] GitHub Actions workflow passes on push to `main`
- [ ] No secrets committed to this folder
- [ ] PrismJS renders code blocks correctly on all HTML pages
