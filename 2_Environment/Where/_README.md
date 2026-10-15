# 🌐 Environment — Where (Platforms, Hosting & Infrastructure)

> **Stage 2: Environment / Where** — Documents spatial execution environments, cloud deployment targets, datastores, and developer workstation platforms defining **where** systems live, execute, and store state.

---

## 🎯 Purpose & Scope

The `Where/` subfolder answers the architectural question: **Where does the system run, deploy, and store data?**
It defines the physical, cloud, and local targets of the project:
1. **Where frontend assets live**: Static hosting on GitHub Pages with custom domains.
2. **Where edge logic runs**: Serverless routing, auth verification, and caching on Cloudflare Workers.
3. **Where backend containers run**: Containerized APIs, Python services, and background workers on Fly.io.
4. **Where data & telemetry reside**: Relational data in Supabase (Postgres) and structured telemetry in Axiom.
5. **Where secrets are secured**: Runtime credentials isolated in Azure Key Vault.
6. **Where developers work**: Workstation guides for macOS and Windows, plus local preview servers on ports 30,000+.

---

## 📂 Document Catalog

| File | Target / Platform | Architectural Role |
|------|-------------------|-------------------|
| [`github_pages.md`](github_pages.md) | GitHub Pages | Frontend static hosting for landing dashboard and documentation |
| [`cloudflare_workers.md`](cloudflare_workers.md) | Cloudflare Workers | Edge compute runtime for auth proxying, rate limiting, and caching |
| [`fly_io.md`](fly_io.md) | Fly.io | Containerized execution environment for heavy backends, Python APIs, and WebSockets |
| [`supabase.md`](supabase.md) | Supabase (PostgreSQL) | Primary relational database, Row-Level Security, authentication, and realtime data |
| [`axiom.md`](axiom.md) | Axiom Cloud | Centralized server-side structured log management, tracing, and alerts |
| [`setup_azure.md`](setup_azure.md) | Microsoft Azure | Azure Key Vault for zero-secret credential management & Blob Storage |
| [`local_server.md`](local_server.md) | Localhost (Port 30,000+) | Local development web server policy (avoiding port collision with system services) |
| [`setup_mac.md`](setup_mac.md) | macOS Workstation | Developer onboarding, Homebrew packages, and Mac environment setup |
| [`setup_windows.md`](setup_windows.md) | Windows Workstation | Developer onboarding, WSL2, PowerShell, and Windows environment setup |

---

## 🔗 Lineage & Connections

- **Upstream**: [`../../1_Real_Unknown/How/_README.md`](../../1_Real_Unknown/How/_README.md) (Governance, Costs & AI Harness Triad).
- **Parallel**: [`../When/_README.md`](../When/_README.md) (Temporal lifecycles, triggers, and tool governance).
- **Downstream**: [`../../4_Formula/specs.md`](../../4_Formula/specs.md) (SPEC-003, SPEC-004, SPEC-012) and [`../../5_Symbols/rules/agent_operating_rules.md`](../../5_Symbols/rules/agent_operating_rules.md) (RULE-003, RULE-004).
