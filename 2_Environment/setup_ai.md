# 🤖 AI Stack Configuration Guide

> **Stage 2: Environment** — Configuration for Ollama, Qdrant, Kilo Code local indexing, and local embeddings.

---

## 🏗 Stack Architecture

The AI Stack supports two tiers of semantic search:

### Tier 1 — Kilo Code Local Nomic Text Indexing (Default for Small Projects)
Kilo Code has built-in nomic text indexing for semantic search. It runs locally without any external service and is the **recommended default** when using the delivery-pilot-template for smaller projects.

- **No setup required** — Kilo Code handles indexing internally
- **Zero infrastructure** — no Docker, no external services
- **Best for**: Small repos, template bootstrap, single-developer projects
- **Limitations**: Not designed for large codebases (>10k files) or multi-team repositories

### Tier 2 — Qdrant Vector Database (Big Repos Only)
Qdrant is a dedicated vector database for high-dimensional embedding storage and search. **Only deploy Qdrant when the project grows beyond what Kilo Code local indexing can handle.**

- **Requires Docker** — runs as a container on port 6333
- **Best for**: Large repos, multi-team projects, heavy semantic search workloads
- **Cost**: Docker runtime overhead + storage for embeddings
- **When to switch**: Consider Qdrant when local indexing becomes slow or when you need persistent, shared vector storage across a team

## 🗺 Decision Flow

```
Is this a small/mid-size project?
    ├── YES → Use Kilo Code local nomic text indexing (no setup needed)
    └── NO (big repo, multi-team) → Set up Qdrant below
```

---

## 📥 Installation & Launch

### 1. Qdrant Setup (Big Repos Only)
Qdrant is run inside a Docker container **only when the project outgrows Kilo Code local indexing**:
```bash
# Pull the latest Qdrant image
docker pull qdrant/qdrant

# Run Qdrant container with persistent storage
docker run -d -p 6333:6333 -p 6334:6334 \
    -v $(pwd)/qdrant_storage:/qdrant/storage \
    --name qdrant_local \
    qdrant/qdrant
```
- **REST Port:** `6333`
- **gRPC Port:** `6334`

### 2. Ollama Setup
Install Ollama from [ollama.com](https://ollama.com). Once installed, run the service and pull the embedding model:
```bash
# Pull the nomic-embed-text model (4096 dimensions)
ollama pull nomic-embed-text

# Pull LLM for logic tasks (e.g. llama3 or mistral)
ollama pull llama3
```

---

## 🔌 Connection & Integration Details
- **Kilo Code Local Indexing:** Built-in, no endpoint needed
- **Ollama Endpoint:** `http://localhost:11434`
- **Qdrant Endpoint:** `http://localhost:6333` (only when using big-repo Qdrant tier)
- **Dimensions:** `nomic-embed-text` produces vector embeddings of size `4096`.

---

## 🧪 Verification Checklist
- [ ] Kilo Code semantic search works on the project (built-in, no verification needed)
- [ ] Ollama service is active (`curl http://localhost:11434`) — if using Ollama fallback
- [ ] Qdrant Dashboard is accessible (`http://localhost:6333/dashboard`) — only if using Qdrant for big repos
- [ ] Embedding generation is tested successfully via CLI or script
