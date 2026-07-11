# 🏗 Toolstack & Rationale

> **Stage 2: Environment** — Every tool used in this project, why it was chosen, and the decision rationale behind each selection.

## Full Toolstack

| Tool | Category | Purpose | Rationale (Why Chosen) |
|------|----------|---------|------------------------|
| **GitHub Pages** | Hosting | Static site hosting for `index.html`, docs, and assets | Free hosting with automatic HTTPS. Direct deployment from repo root — no build step needed. `index.html` at root satisfies the requirement. GitHub Actions for CI/CD is native. |
| **Cloudflare Workers** | Edge Compute | Auth, routing, caching, rate limiting at the edge | Serverless edge compute with global distribution. Handles auth/rate limiting before requests hit Fly.io. Pay-per-use — no cost for low-traffic projects. Optional component. |
| **Fly.io** | Backend Deploy | Container-based Docker deployments for Python services | True Docker containers (not serverless functions) deployed globally close to users. Supports persistent processes, WebSockets, and background jobs. Free tier available. Chosen over Heroku (pricing) and AWS ECS (complexity). |
| **Supabase** | Database | Managed Postgres, auth, realtime, storage, `pgvector` | Open-source Firebase alternative with managed Postgres. Built-in auth (social login, magic links), auto-generated REST APIs, realtime subscriptions, and `pgvector` extension for vector search. Chosen over Firebase (vendor lock-in) and self-hosted Postgres (maintenance). |
| **Axiom** | Logging | Centralized structured logging, tracing, alerting | Purpose-built for structured log querying with APL (Axiom Processing Language). Handles high-cardinality data well. Teams can build dashboards from structured events. Chosen over ELK (operational complexity) and Datadog (pricing). |
| **Azure Key Vault** | Secrets | FIPS 140-2 HSM-backed secret storage | Enterprise-grade secret management with RBAC, audit logs, and automatic key rotation. Pay-per-operation pricing (~$0.03/10K ops) with free tier available. Native GitHub Actions integration. One vault per environment (dev/staging/prod). |
| **GitHub Actions** | CI/CD | Build, test, deploy pipelines | Native to the repository. No external CI service needed. Matrix builds, secrets injection from Azure Key Vault, and deploy to Fly.io/GitHub Pages in one workflow. Chosen over Jenkins (maintenance) and CircleCI (external dependency). |
| **Kilo Code Local Indexing** | AI / Vector | Built-in nomic text indexing for semantic search (small projects) | Zero-setup semantic search built directly into Kilo Code. No Docker, no external services, no configuration. Default choice for the delivery-pilot-template. Chosen as the primary AI stack to minimize infrastructure overhead. |
| **Qdrant** | AI / Vector | Vector database for high-dimensional embeddings (big repos) | Specialized vector DB for production-scale semantic search. Only deployed when Kilo Code local indexing is insufficient. Runs in Docker on port 6333. Chosen over Pinecone (managed, but vendor lock-in) and Weaviate (heavier). |
| **Ollama** | AI / Runtime | Local LLM and embedding model hosting | Runs LLMs locally without cloud dependencies. Hosts `nomic-embed-text` (4096 dimensions) for embeddings. Free, private, and offline-capable. Chosen over OpenAI API (cost, privacy) and HuggingFace Inference (latency). |
| **Mermaid** | Documentation | Architecture and flow diagrams as code | Markdown-native diagramming — diagrams live in `.md` files and render in `markdown_renderer.html`. Version-controllable, no external design tools needed. Chosen over Excalidraw (binary files) and draw.io (external dependency). |
| **PrismJS** | Documentation | Syntax highlighting in markdown renderer | Lightweight, CDN-hosted syntax highlighter with dark theme (Tomorrow Night). Extensible via language plugins. No build step. Chosen over highlight.js (larger bundle) and Shiki (requires build). |
| **FontAwesome** | UI | Icons for menus and UI elements | Free CDN-hosted icon library with a large selection. Used for the debug button, navigation icons, and social links. No custom SVG maintenance. |
| **Google Fonts (Inter + Outfit)** | UI | Typography for the project site | Clean, modern, highly-readable fonts. Inter for body text, Outfit for headings. CDN-hosted with no performance impact. |
| **marked.js** | Frontend | Markdown to HTML parsing in `markdown_renderer.html` | Lightweight, fast, and widely-used markdown parser. CDN-hosted with no build step. Renders all `.md` files served by `markdown_renderer.html`. |

## Decision Principles

When adding or replacing a tool, apply these principles:

| Principle | Meaning |
|-----------|---------|
| **No vendor lock-in** | Prefer open-source and portable over proprietary. Tools should be replaceable without rewriting the codebase. |
| **Free/low-cost first** | Start with free tiers and only upgrade when project scale demands it. Avoid tools that require payment for basic features. |
| **Config-as-code** | Configuration lives in the repo (`.md`, `.json`, `.toml`), not in a UI dashboard. Reproducible and version-controllable. |
| **Minimal infrastructure** | Prefer built-in or CDN-hosted over Docker containers. Only add infrastructure (Qdrant, Fly.io) when the project outgrows simpler options. |
| **GitHub-native** | Tools that integrate with GitHub (Actions, Pages, Issues) are preferred over external services. Keeps everything in one place. |
| **Azure for secrets** | All credentials go through Azure Key Vault. No secrets in `.env`, config files, or git history. |

## Stack Evolution Log

| Date | Change | Previous | New | Rationale |
|------|--------|----------|-----|-----------|
| 2026-05-28 | Secrets manager | Doppler | Azure Key Vault | Enterprise-grade FIPS 140-2 HSMs, pay-per-operation, better Azure ecosystem fit |
| 2026-06-07 | Database | None | Supabase | Managed Postgres with auth, realtime, pgvector — needed for project data layer |
| 2026-06-19 | Logging | None | Axiom | Structured logging needed for Fly.io backend observability and nightly fix agent |
| 2026-06-19 | Deployments | None | Fly.io (explicit) | Container-based deploys for Python backend — previously implicit |
| 2026-07-11 | AI Stack | Qdrant-only | Kilo Code local (default) + Qdrant (big repos) | Minimized infra for small projects — Kilo Code built-in indexing as primary |

## Adding a Tool

1. Check it against the Decision Principles table above
2. Add a row to the Full Toolstack table with rationale
3. Create the tool's detail doc in `2_Environment/<tool>.md`
4. Add to `2_Environment/tools.md` overview table
5. Add required MCP server if needed: `2_Environment/mcp.md`
6. Update `2_Environment/dependencies.md` if it impacts the dependency chain
7. Update `2_Environment/architecture.md` if it changes the system diagram
8. Log the change in the Stack Evolution Log above
