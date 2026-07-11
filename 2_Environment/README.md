# 2️⃣ Environment — The "Context"

> **Stage 2 of 7:** Establish the context before writing a single line of code.

## Purpose

This folder documents the **setup, constraints, and operating context** of the project. Anyone joining the project — human or AI — should be able to get fully up to speed by reading this folder.

## What belongs here

- **Roadmaps** — Timeline, milestones, and delivery plan
- **Constraints** — Technical, budget, compliance, or time limitations
- **Setup guides** — Step-by-step environment setup for each platform
- **AI client config** — Ollama, Claude, and other AI tool configurations
- **Architecture overview** — High-level system design (use Mermaid diagrams)

## Files

| File | Description |
|------|-------------|
| [`setup_mac.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/setup_mac.md) | macOS environment setup guide |
| [`setup_windows.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/setup_windows.md) | Windows environment setup guide |
| [`setup_ai.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/setup_ai.md) | Ollama + Qdrant + AI client configuration |
| `roadmap.md` | Project roadmap and milestones |
| `constraints.md` | Known limitations and constraints |
| [`architecture.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/architecture.md) | System architecture with Mermaid diagrams |
| [`tools.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/tools.md) | **Single overview of every tool used** in the project |
| [`cloudflare_workers.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/cloudflare_workers.md) | Edge compute — auth, routing, caching, rate limiting |
| [`fly_io.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/fly_io.md) | Container-based deployments — Python APIs, jobs, WebSockets |
| [`supabase.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/supabase.md) | Database & backend features — Postgres, auth, realtime, storage |
| [`axiom.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/axiom.md) | Server-side logs — observability, tracing, alerting |
| [`github_pages.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/github_pages.md) | Frontend static hosting — docs, SPAs, landing pages |
| [`navigation.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/navigation.md) | Two-menu system: Project Menu + Debug Menu (bottom-right) |
| `dependencies.md` | Dependencies, libraries, packages — how they affect each other in building and delivering the project |
| `github_agent.md` | Error-fixing agent that visits pages, finds errors, opens GitHub Issues, fixes, and reports — uses GitHub tokens |
| `mcp.md` | MCP server requirements — Model Context Protocol servers for agent tool access |
| `superskills.md` | Superskills catalog — all loadable skills required for project agents |
| `llm_tools.md` | LLM tool governance — rationale and security boundaries for every tool available to LLMs |
| `toolstack.md` | Full toolstack with rationale — every tool, its purpose, and the decision behind choosing it |

## AI Stack Setup

```bash
# Ollama — pull the embedding model
ollama pull nomic-embed-text

# Qdrant — run via Docker
docker run -p 6333:6333 qdrant/qdrant
```

- **Embedding model:** `nomic-embed-text` (4096 dimensions)
- **Vector DB:** Qdrant
- **Secrets:** Managed via Azure Key Vault (see `.env.example`)

## Rules

- All secrets go to Azure Key Vault — never commit to git
- Document every tool version used (reproducibility)
- Keep setup guides tested and working 🛠

## 🧪 Testing Checklist

[![Docker Basics & Environment Setup](https://img.youtube.com/vi/fqbchv6fWpA/0.jpg)](https://www.youtube.com/watch?v=fqbchv6fWpA)

- [ ] macOS setup guide is complete and tested
- [ ] Windows setup guide is complete and tested
- [ ] Ollama `nomic-embed-text` model pulls successfully
- [ ] Qdrant starts and responds on port 6333
- [ ] Azure Key Vault created and secrets synced
- [ ] Architecture diagram renders via Mermaid
