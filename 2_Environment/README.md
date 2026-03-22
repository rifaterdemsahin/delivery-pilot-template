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
| `setup_mac.md` | macOS environment setup guide |
| `setup_windows.md` | Windows environment setup guide |
| `setup_ai.md` | Ollama + Qdrant + AI client configuration |
| `roadmap.md` | Project roadmap and milestones |
| `constraints.md` | Known limitations and constraints |
| `architecture.md` | System architecture with Mermaid diagrams |

## AI Stack Setup

```bash
# Ollama — pull the embedding model
ollama pull nomic-embed-text

# Qdrant — run via Docker
docker run -p 6333:6333 qdrant/qdrant
```

- **Embedding model:** `nomic-embed-text` (4096 dimensions)
- **Vector DB:** Qdrant
- **Secrets:** Managed via Doppler (see `.env.example`)

## Rules

- All secrets go to Doppler — never commit to git
- Document every tool version used (reproducibility)
- Keep setup guides tested and working 🛠

## 🧪 Testing Checklist

<!-- Embed a relevant YouTube video explaining environment setup / Docker basics -->

- [ ] macOS setup guide is complete and tested
- [ ] Windows setup guide is complete and tested
- [ ] Ollama `nomic-embed-text` model pulls successfully
- [ ] Qdrant starts and responds on port 6333
- [ ] Doppler project created and secrets synced
- [ ] Architecture diagram renders via Mermaid
