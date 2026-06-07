# 4️⃣ Formula — The "Thinking & Planning" Stage

> **Stage 4 of 7:** Think and plan before acting. This is the mandatory gate between understanding the problem (`1–3`) and writing code (`5_Symbols`).

## Purpose

This folder is the **thinking & planning hub** of the project. Every agent must document their reasoning, approach, and plan here **before** writing any code. After execution, a summary of the LLM reasoning process is logged here too.

The self-learning loop flows through this stage automatically:
```
1_Real_Unknown (Why)
    ↓
2_Environment (Context)
    ↓
3_Simulation (Vision)
    ↓
4_Formula (Think & Plan) ← mandatory gate before coding
    ↓
5_Symbols (Code)
    ↓
6_Semblance (Errors/Fixes)
    ↓
7_Testing_Known (Proof)
```

## What belongs here

- **LLM thinking log** — Reasoning and approach documented before and after each implementation
- **Step-by-step guides** — How to implement specific features
- **Research notes** — Findings, comparisons, and tech evaluations
- **Decision records** — Why X was chosen over Y (ADRs)
- **Containerised setup** — Docker/Compose definitions for Qdrant + Ollama
- **API references** — Key endpoints and integration notes
- **`.claude/`** — Init template: settings, skills, and commands to bootstrap new projects

## Files

| File | Description |
|------|-------------|
| `llm_thinking_log.md` | **Primary file** — LLM reasoning/thinking logged before and after every implementation |
| `decisions.md` | Architecture Decision Records (ADRs) — why X over Y |
| `database.md` | Supabase integration and secrets configuration guide |
| `dsl.md` | Domain-specific language and terminology used in this project |
| `extensions.md` | Required system and IDE extensions/plugins |
| `navigation.md` | Shared navigation menu design and reusability formula |
| `implementation_guide.md` | Main step-by-step build guide |
| `research_notes.md` | Technology evaluations and findings |
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

- **Think before you code** — log the plan in `llm_thinking_log.md` before touching `5_Symbols`
- **Log after execution** — append the LLM reasoning summary to `llm_thinking_log.md` once done
- Write the *why* not just the *what* — reasoning decays fastest
- Link research notes to the decisions they informed
- Move superseded guides to `_obsolete/` 🚮
- Keep Docker configs in sync with `2_Environment` setup guides

## 🧪 Testing Checklist

[![Architecture Decision Records & Design](https://img.youtube.com/vi/g1mS6_u4tIY/0.jpg)](https://www.youtube.com/watch?v=g1mS6_u4tIY)

- [ ] Implementation guide covers all major features
- [ ] All major decisions have an ADR entry
- [ ] Docker Compose config starts both Qdrant and Ollama cleanly
- [ ] Research notes reference their sources
