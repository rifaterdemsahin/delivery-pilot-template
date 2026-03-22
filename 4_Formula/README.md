# 4️⃣ Formula — The "Recipe"

> **Stage 4 of 7:** Document the logic before others try to reproduce it.

## Purpose

This folder is the **knowledge base** of the project — the step-by-step reasoning, research notes, and implementation logic. If someone needs to understand *why* a decision was made or *how* something was built, the answer is here.

## What belongs here

- **Step-by-step guides** — How to implement specific features
- **Research notes** — Findings, comparisons, and tech evaluations
- **Decision records** — Why X was chosen over Y (ADRs)
- **Containerised setup** — Docker/Compose definitions for Qdrant + Ollama
- **API references** — Key endpoints and integration notes

## Files

| File | Description |
|------|-------------|
| `implementation_guide.md` | Main step-by-step build guide |
| `research_notes.md` | Technology evaluations and findings |
| `decisions.md` | Architecture Decision Records (ADRs) |
| `docker_setup.md` | Qdrant + Ollama containerised setup |
| `api_reference.md` | Key API endpoints and usage |

## Containerised AI Stack

```yaml
# docker-compose.yml (reference — full file in 5_Symbols)
services:
  qdrant:
    image: qdrant/qdrant
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage

  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
```

## Rules

- Write the *why* not just the *what* — reasoning decays fastest
- Link research notes to the decisions they informed
- Move superseded guides to `_obsolete/` 🚮
- Keep Docker configs in sync with `2_Environment` setup guides

## 🧪 Testing Checklist

<!-- Embed a relevant YouTube video explaining architecture decision records / Docker Compose -->

- [ ] Implementation guide covers all major features
- [ ] All major decisions have an ADR entry
- [ ] Docker Compose config starts both Qdrant and Ollama cleanly
- [ ] Research notes reference their sources
