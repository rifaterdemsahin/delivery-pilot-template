# Fly.io — Container-Based Deployments

## What is it?

Fly.io is a platform for **container-based deployments** of full-stack applications and services close to users. It deploys **Docker containers** to edge locations worldwide, giving you persistent compute with global distribution. In this project it is the **deployment target for all backend application code**.

## Use Cases

| Use Case | Why Fly.io |
|----------|-----------|
| **Python API Server** | Run Flask/FastAPI apps with persistent processes — no cold starts |
| **Background Jobs** | Execute long-running tasks (data processing, scraping, ML inference) |
| **WebSocket Servers** | Real-time features (chat, live updates, collaboration) with persistent connections |
| **Database Hosting** | Run PostgreSQL, Redis, or SQLite with persistent volumes |
| **Scheduled Tasks** | Cron jobs and periodic tasks via Fly Machines |
| **Full-Stack Apps** | Combine backend + database in one platform with private networking |
| **AI/ML Services** | Run Ollama, Qdrant, or custom models with GPU instances |

## When to Choose Fly.io

- You need **persistent processes** (not just request/response)
- Your backend requires **file system access** or local storage
- You're running **Python, Node, Go, Rust** — any Docker-based app
- You need **WebSockets** or **Server-Sent Events**
- You want **global deployment** with minimal config
- You need **private networking** between services (e.g., app + database)

## When NOT to Choose Fly.io

- You're serving **only static files** — use GitHub Pages
- Your logic is **lightweight and stateless** — use Cloudflare Workers
- You need **enterprise compliance** (HIPAA, SOC 2) out of the box — consider Azure/AWS
- You want **zero DevOps** — Fly.io requires some Docker knowledge

## Integration with This Project

- **Frontend:** Static site on GitHub Pages
- **Edge Logic:** Cloudflare Workers for auth, caching, routing
- **Backend:** Fly.io runs the Python application (FastAPI/Flask) as a Docker container
- **Database:** [Supabase](./supabase.md) (managed Postgres) is the primary data layer; Fly.io Postgres/Redis only for app-local needs
- **Logs:** Backend ships structured logs to [Axiom](./axiom.md)
- **Vector DB:** Qdrant on Fly.io, or Supabase `pgvector`
- **Secrets:** Azure Key Vault (injected as env vars at deploy time via `fly secrets set`)

## Setup

```bash
# Install Flyctl CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Launch app (from project root with Dockerfile)
fly launch

# Deploy
fly deploy

# Set secrets from Azure Key Vault
fly secrets set DATABASE_URL="postgresql://..." API_KEY="..."
```

## Pricing

| Resource | Cost |
|----------|------|
| Shared CPU (1x) | ~$1.94/month |
| Dedicated CPU (1x) | ~$5.70/month |
| Memory (256MB) | ~$0.56/month |
| Persistent Volume (1GB) | ~$0.15/month |
| Free tier | 3 shared-CPU VMs, 256MB RAM each |

## References

- [Fly.io Docs](https://fly.io/docs/)
- [Flyctl CLI](https://fly.io/docs/flyctl/)
- [Fly.io with Python](https://fly.io/docs/languages-and-frameworks/python/)
