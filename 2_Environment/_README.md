# 2️⃣ Environment — The "Context"

> **Stage 2 of 7:** Establish the operational, spatiotemporal context before writing a single line of code.

---

## 🎯 Purpose

This folder documents the **setup, constraints, and operating context** of the project. Anyone joining the project — human or AI — gets fully up to speed by reading this folder.

To maintain modularity and architectural clarity, all environment-related markdowns are organized into **two subfolders**:
- [**`When/`**](When/_README.md) — Temporal execution boundaries, lifecycles, operational triggers, architectural rules, and tool governance.
- [**`Where/`**](Where/_README.md) — Spatial execution platforms, cloud infrastructure, container targets, datastores, and workstation setup.

---

## 📂 Subfolder Structure

```
2_Environment/
├── _README.md                  # Stage 2 Overview & index (this file)
├── When/                       # When rules, lifecycles, and tools are activated
│   ├── _README.md              # When index & temporal taxonomy
│   ├── architecture.md         # System architecture & blueprints
│   ├── product_rules.md        # Mandatory product rules
│   ├── tools.md                # Single overview of every tool used
│   ├── toolstack.md            # Toolstack rationale & decision log
│   ├── dependencies.md         # Dependencies, packages & cross-matrix
│   ├── setup_ai.md             # AI stack (local nomic indexing vs Qdrant)
│   ├── github_agent.md         # Error-fixing agent (token setup & workflow)
│   ├── mcp.md                  # MCP servers & protocol requirements
│   ├── superskills.md          # Superskills catalog & execution triggers
│   ├── llm_tools.md            # LLM tool governance & security boundaries
│   ├── navigation.md           # Two-menu navigation architecture
│   └── extensions.md           # Required system, CLI & IDE extensions
└── Where/                      # Where systems execute, deploy, and store data
    ├── _README.md              # Where index & infrastructure taxonomy
    ├── github_pages.md         # Frontend static hosting
    ├── cloudflare_workers.md   # Edge compute & serverless routing
    ├── fly_io.md               # Containerized backend deployments
    ├── supabase.md             # Database & auth (PostgreSQL)
    ├── axiom.md                # Server-side structured logs & telemetry
    ├── setup_azure.md          # Azure Key Vault secrets & Blob Storage
    ├── local_server.md         # Local preview server policy (port 30,000+)
    ├── setup_mac.md            # macOS developer setup guide
    └── setup_windows.md        # Windows developer setup guide
```

---

## ⏰ When — Lifecycles & Governance

All files detailing **when** tools are used, when lifecycles trigger, and when rules apply are placed in [`When/`](When/_README.md):
- [`When/architecture.md`](When/architecture.md) — High-level system design with Mermaid diagrams
- [`When/product_rules.md`](When/product_rules.md) — Mandatory product rules (emojis, OKR-first menus, calendar view)
- [`When/tools.md`](When/tools.md) — Single overview of every tool used in the project
- [`When/toolstack.md`](When/toolstack.md) — Full toolstack with rationale behind each choice
- [`When/dependencies.md`](When/dependencies.md) — Dependency matrix and upgrade impact guide
- [`When/setup_ai.md`](When/setup_ai.md) — AI stack selection (Kilo nomic embeddings vs Qdrant)
- [`When/github_agent.md`](When/github_agent.md) — Automated error-repair agent workflow
- [`When/mcp.md`](When/mcp.md) — Model Context Protocol servers for tool access
- [`When/superskills.md`](When/superskills.md) — Superskills catalog and dependencies
- [`When/llm_tools.md`](When/llm_tools.md) — Pre-tool and post-tool usage boundaries
- [`When/navigation.md`](When/navigation.md) — Two-menu architecture and compilation
- [`When/extensions.md`](When/extensions.md) — Excalidraw, Mermaid, and Markdown authoring extensions

---

## 🌐 Where — Platforms & Hosting

All files detailing **where** the system runs, deploys, and stores state are placed in [`Where/`](Where/_README.md):
- [`Where/github_pages.md`](Where/github_pages.md) — Static hosting for landing dashboard and docs
- [`Where/cloudflare_workers.md`](Where/cloudflare_workers.md) — Edge compute, caching, auth proxying
- [`Where/fly_io.md`](Where/fly_io.md) — Container-based backend deployments
- [`Where/supabase.md`](Where/supabase.md) — Postgres database, auth, and realtime
- [`Where/axiom.md`](Where/axiom.md) — Server-side logs and telemetry
- [`Where/setup_azure.md`](Where/setup_azure.md) — Azure Key Vault (zero secrets in git) and Blob Storage
- [`Where/local_server.md`](Where/local_server.md) — Local development server on port 30,000+
- [`Where/setup_mac.md`](Where/setup_mac.md) — macOS workstation setup guide
- [`Where/setup_windows.md`](Where/setup_windows.md) — Windows workstation setup guide

---

## 🤖 AI Stack Setup

```bash
# Ollama — pull the embedding model
ollama pull nomic-embed-text

# Qdrant — run via Docker
docker run -p 6333:6333 qdrant/qdrant
```

- **Embedding model:** `nomic-embed-text` (4096 dimensions)
- **Vector DB:** Qdrant
- **Secrets:** Managed via Azure Key Vault (see `.env.example`)

---

## 🛡️ Core Rules

- All secrets go to Azure Key Vault — never commit secrets to git (`RULE-004`)
- Document every tool version used for reproducibility
- Backends deploy to Fly.io or Cloudflare Workers (`RULE-003`)
- Local development servers run on ports above 30,000+ (`RULE[user_global]`)
- Always open web resources and verification links in **Google Chrome** (`RULE[user_global]`)
