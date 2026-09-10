# 🧰 Tools Overview — Delivery Pilot Template

> **Stage 2 of 7 (Environment):** A single reference covering **every tool** used in this project — what it does, why it was chosen, and where its secrets live. When a tool is added, changed, or removed, update this document and `architecture.md` together.

---

## 🗺️ The Stack at a Glance

| Layer | Tool | Role | Detail Doc |
|-------|------|------|------------|
| **Frontend hosting** | GitHub Pages | Static site (`index.html`, docs, mockups) | [`github_pages.md`](./github_pages.md) |
| **Light backend / edge** | Cloudflare Workers | Stateless backends + auth, routing, caching (RULE-003) | [`cloudflare_workers.md`](./cloudflare_workers.md) |
| **Heavy container backend** | Fly.io | Docker / persistent / GPU / long-running jobs (RULE-003) | [`fly_io.md`](./fly_io.md) |
| **Default file/blob storage** | Azure project storage | Project-scoped Storage account / blobs (RULE-004) | [`setup_azure.md`](./setup_azure.md) |
| **Database & data layer** | Supabase | Managed Postgres, auth, realtime, pgvector | [`supabase.md`](./supabase.md) |
| **Server-side logs** | Axiom | Centralized logging, tracing, alerting, dashboards | [`axiom.md`](./axiom.md) |
| **Secrets** | Azure Key Vault | Stores all API keys & credentials | [`setup_azure.md`](./setup_azure.md) |
| **CI/CD** | GitHub Actions | Build, test, deploy pipeline | [`github_pages.md`](./github_pages.md) |
| **AI / Vector** | Kilo Code (local) / Qdrant (big repos) | Semantic search: Kilo Code built-in nomic text indexing for small projects, Qdrant vector DB for large repos | [`setup_ai.md`](./setup_ai.md) |
| **Auto-Fix Agent** | Error-Fix Agent (GitHub Token) | Automated error discovery: visits pages, finds errors, opens GitHub Issues, applies fixes, reports to `6_Semblance/`. Uses GitHub PAT from Azure Key Vault. | [`github_agent.md`](./github_agent.md) |
| **MCP Servers** | GitHub, Azure KV, Browser, Supabase, Axiom, Fly.io, Qdrant | Model Context Protocol servers connecting agents to external tools | [`mcp.md`](./mcp.md) |
| **Superskills** | 6 project skills + system skills | On-demand skill loading: navigation, planning, simulation, deploy, secrets, error-fix | [`superskills.md`](./superskills.md) |

---

## 📦 Tool-by-Tool

### 1. GitHub Pages — Frontend Hosting
Serves the static site directly from the repo root. `index.html` **must** stay at the root. Deployed via GitHub Actions. → [`github_pages.md`](./github_pages.md)

### 2. Cloudflare Workers — Light backend / edge
Deployment target for **lightweight, stateless** backends and edge logic (auth, routing, caching, rate limiting). Credentials from Azure Key Vault. → [`cloudflare_workers.md`](./cloudflare_workers.md)

### 3. Fly.io — Heavy container backends
Deployment target for **heavy container** backends: Docker, persistent processes, filesystems, WebSockets, GPU, long-running jobs. Credentials from Azure Key Vault. → [`fly_io.md`](./fly_io.md)

### 4. Supabase — Database & Backend Features
The **primary database**: managed Postgres plus auth, auto-generated APIs, realtime, storage, and `pgvector`. Backend connects via `DATABASE_URL` / `supabase-py`; the frontend may use the anon key under Row Level Security. → [`supabase.md`](./supabase.md)

### 5. Axiom — Server-Side Logs
The **single source of truth for server-side logs**. Fly.io services and CI ship structured (JSON) events to Axiom for querying (APL), dashboards, and alerting. → [`axiom.md`](./axiom.md)

### 6. Azure Key Vault — Secrets
All credentials for every tool above are stored here and injected as env vars at deploy time. Never commit secrets to git. → [`setup_azure.md`](./setup_azure.md)

### 7. AI Stack — Semantic Search
Two-tier approach for semantic search and embeddings:

- **Kilo Code Local Nomic Text Indexing (default for small projects):** Built-in, zero-setup semantic search using nomic text indexing. The recommended default when using the delivery-pilot-template for smaller repos. No Docker, no external services.
- **Qdrant Vector Database (big repos only):** Full vector database via Docker for large codebases and multi-team projects. Only deploy Qdrant when the project outgrows Kilo Code local indexing.

---

## 🔐 Secrets Map

Every secret below lives in **Azure Key Vault** (one vault per environment: dev/staging/prod) and is referenced by name. See [`.env.example`](../.env.example).

| Tool | Secret(s) | Scope |
|------|-----------|-------|
| Supabase | `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Frontend-safe (anon, with RLS) |
| Supabase | `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL` | Backend only |
| Axiom | `AXIOM_TOKEN`, `AXIOM_DATASET` | Backend / CI only |
| Fly.io | `FLY_API_TOKEN` | CI / deploy only |
| Cloudflare Workers | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | CI / deploy only |
| Azure Storage | `AZURE_STORAGE_CONNECTION_STRING` | Backend only (default blobs) |
| Azure | `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` | CI / runtime |
| AI | `AI_PROVIDER_API_KEY` | Backend only |

---

## 🔄 How Data Flows

```
Browser
  → GitHub Pages (static UI)
  → Cloudflare Workers (light backend / edge)  ── secrets from Azure Key Vault
  → Fly.io (heavy containers)                 ── secrets from Azure Key Vault
          → Azure project storage (default files/blobs)
          → Supabase  (structured data, auth)
          → Axiom     (emit structured logs)
```

---

## ✅ Keeping This Doc Honest

1. Adding a tool? Create its `2_Environment/<tool>.md`, add a row to the tables above, and update [`architecture.md`](./architecture.md).
2. Adding a secret? Add it to the **Secrets Map** and [`.env.example`](../.env.example) (placeholder only).
3. Update the debug-menu config (`navigation_config.json` + HTML fallbacks) so the doc is reachable.
4. Cover it in the `/init-project` setup questionnaire so new projects choose it consciously.
