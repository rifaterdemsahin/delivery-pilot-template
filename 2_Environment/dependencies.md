#  Dependencies, Libraries & Packages

> **Stage 2: Environment** — How project dependencies, libraries, and packages affect each other in building and delivering this project.

## Purpose

This document tracks every dependency used in the project: what it does, what it depends on, and how changes in one dependency ripple through the stack. The goal is to make dependency changes predictable and safe.

## Dependency Chain Overview

```
Frontend (CDN-hosted)
  ├── FontAwesome 6.4.0           # Icons for UI menus
  ├── PrismJS 1.29.0              # Syntax highlighting in markdown renderer
  │     └── prism-tomorrow theme  # Dark mode compatible syntax theme
  ├── Google Fonts (Inter, Outfit) # Typography
  └── marked.js (CDN)             # Markdown → HTML parsing

Backend (Docker / Fly.io)
  ├── Kilo Code local indexing     # Built-in nomic text indexing (default for small projects)
  ├── Qdrant                      # Vector database — only for big repos (port 6333)
  │     └── Docker runtime
  ├── Ollama                      # LLM runtime (port 11434)
  │     ├── nomic-embed-text      # Embedding model (4096 dims)
  │     └── Docker runtime
  ├── Supabase                    # Managed Postgres + auth + realtime + pgvector
  │     └── Postgres 15+
  └── Python services (Fly.io)    # API, jobs, WebSockets
        ├── Azure SDK              # Key Vault secret loading
        ├── Supabase client        # Database queries
        └── Axiom SDK              # Server-side logging

Infrastructure
  ├── GitHub Pages                # Static hosting for index.html + markdown
  ├── GitHub Actions              # CI/CD pipelines
  │     ├── Azure/get-keyvault-secrets
  │     └── supabase/setup-cli
  └── Azure Key Vault             # Secrets management (FIPS 140-2)
```

## Frontend Dependencies

| Package | Version | CDN/Import | Purpose | Affected By |
|---------|---------|------------|---------|-------------|
| FontAwesome | 6.4.0 | CDN | Menus and UI icons | `index.html`, `markdown_renderer.html` |
| PrismJS | 1.29.0 | CDN | Syntax highlighting | `markdown_renderer.html`, `5_Symbols/` code files |
| Prism theme | tomorow | CDN | Dark code theme | Combined with PrismJS |
| Google Fonts | latest | CDN | Typography (Inter, Outfit) | `index.html`, `markdown_renderer.html` |
| marked.js | latest | CDN | Markdown → HTML | `markdown_renderer.html` |

### Upgrade Impact
- **FontAwesome bump**: Minor — icon names rarely change. Unlikely to break anything but test menus render correctly.
- **PrismJS bump**: Medium — new language plugins may change, theme CSS may shift syntax colors. Test all code blocks in `markdown_renderer.html`.
- **marked.js bump**: High — markdown parsing rules can change. Test all `.md` file rendering before deploying.

## Backend Dependencies

| Dependency | Purpose | Depends On | Version Constraint |
|------------|---------|------------|-------------------|
| Qdrant | Vector DB | Docker Engine | Latest stable |
| Ollama | LLM runtime | Docker Engine | Latest stable |
| nomic-embed-text | Embedding model | Ollama | 4096-dimensional version |
| Supabase | Managed DB | None (SaaS) | Postgres 15+ |
| Azure SDK | Key Vault secrets | Python 3.10+ | Latest stable |
| Axiom SDK | Structured logging | Python 3.10+ | Latest stable |

### Upgrade Impact
- **Qdrant/Ollama bump**: Test vector search and embedding quality. Qdrant schema changes can break existing collections.
- **nomic-embed-text model bump**: CRITICAL — changing the embedding model requires re-indexing all vector data. Never change without a migration plan.
- **Supabase Postgres bump**: Minor — Postgres is backward compatible. Test migrations before promoting.
- **Azure SDK bump**: Low — SDK follows semantic versioning. Test secret retrieval on staging first.
- **Axiom SDK bump**: Low — structured logging format is unlikely to change. Verify log parsing still works.

## Cross-Dependency Matrix

| | Ollama | Qdrant | Supabase | Azure | Axiom | GitHub Pages |
|---|---|---|---|---|---|---|
| **Ollama** | — | Embedding → vectors | LLM queries | — | — | — |
| **Qdrant** | Embedding source | — | Vector similarity | — | — | — |
| **Supabase** | Auth context | Vector plugin | — | Secrets | Log events | — |
| **Azure KV** | — | — | API keys | — | API token | — |
| **Axiom** | — | — | — | Token | — | — |
| **GitHub Pages** | — | — | — | — | — | — |

## Build & Delivery Flow

```
1_Real_Unknown (OKRs)
    ↓ defines requirements
2_Environment (Choose tools & deps)
    ↓ version-lock dependencies
3_Simulation (Design with known tool constraints)
    ↓
4_Formula (Spec the dependency chain)
    ↓
5_Symbols (Code with pinned versions)
    ↓
7_Testing_Known (Test all dependency interactions)
    ↓
6_Semblance (Log dependency conflicts / fixes)
```

## Dependency Rules

1. **Pin versions** — Never use `latest` in production. Specify exact versions in all config files.
2. **Test upgrades in isolation** — Upgrade one dependency at a time, test, then commit.
3. **Document breaking changes** — If an upgrade requires code changes, log it here and in `6_Semblance/fix.log`.
4. **CDN fallback** — For CDN-hosted frontend deps (FontAwesome, PrismJS), keep a local copy in `5_Symbols/assets/` as fallback.
5. **Tool chain consistency** — Changes in `2_Environment/tools.md` must be reflected here. Both files must stay in sync.
6. **Stage 1 OKR changes** — If a new objective requires a new tool, first update `1_Real_Unknown/`, then add the dependency here, then update `3_Simulation/` designs for compatibility.
7. **Secrets never in deps** — Secrets (API keys, tokens) live in Azure Key Vault, not in dependency configs.

## Adding a New Dependency

1. Evaluate if it's truly needed (check `1_Real_Unknown/okrs.md` for alignment)
2. Test compatibility with existing dependencies (check the cross-dependency matrix)
3. Add to this file with version, purpose, and upgrade impact notes
4. Update `2_Environment/tools.md` if it's a new tool
5. Update `3_Simulation/design_workflow.md` if it affects design decisions
6. Pin the version in `5_Symbols/`
7. Test locally, then commit and push
