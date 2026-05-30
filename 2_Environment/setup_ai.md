# 🤖 AI Stack Configuration Guide

> **Stage 2: Environment** — Configuration for Ollama, Qdrant, and local embeddings.

---

## 🏗 Stack Architecture
The local AI Stack is composed of:
1. **Ollama:** Hosts local large language models and embedding models.
2. **Qdrant:** Vector Database to store and query high-dimensional embeddings.

---

## 📥 Installation & Launch

### 1. Qdrant Setup
Qdrant is run inside a Docker container:
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
- **Ollama Endpoint:** `http://localhost:11434`
- **Qdrant Endpoint:** `http://localhost:6333`
- **Dimensions:** `nomic-embed-text` produces vector embeddings of size `4096`.

---

## 🧪 Verification Checklist
- [ ] Ollama service is active (`curl http://localhost:11434`)
- [ ] Qdrant Dashboard is accessible (`http://localhost:6333/dashboard`)
- [ ] Embedding generation is tested successfully via CLI or script
