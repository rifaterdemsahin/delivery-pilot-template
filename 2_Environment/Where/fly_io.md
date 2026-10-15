# Fly.io — Container-Based Deployments

## What is it?

Fly.io is a platform for **container-based deployments** of full-stack applications and services close to users. It deploys **Docker containers** to edge locations worldwide, giving you persistent compute with global distribution. In this project it is the **deployment target for backends with heavy container requirements** (RULE-003 / SPEC-012). Lightweight, stateless backends go to Cloudflare Workers instead. Both platforms take credentials from **Azure Key Vault**.

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
- **Secrets:** Azure Key Vault (injected as env vars at deploy time via `fly secrets set`) — same vault as Cloudflare Workers
- **Storage:** Azure project-based storage is the default for files/blobs (RULE-004); Fly volumes are not the default

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

## 🛡️ How to Prevent Extra Cost In Fly.io in the Future (6-Pillar Prevention Playbook)
-> Implement these and show it in the logs that you have implemented it.

Pillar 1: Configure Fly.io Auto-Stop & Scale-to-Zero on Launch
Whenever deploying any app or machine, enforce auto-stop in your fly.toml:

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = "stop"   # automatically powers down machine when no requests arrive
  auto_start_machines = true   # automatically wakes up machine upon receiving a new request
  min_machines_running = 0      # allows cluster to drop to 0 machines when idle
If updating an existing machine via CLI:

flyctl machine update <MACHINE_ID> -a <APP_NAME> --autostop=stop --autostart
Pillar 2: Self-Destruct / Ephemeral TTL for Experiments & Labs
For spikes, PoCs, and experiments like kagent, treat them as ephemeral by design with an automatic self-destruct timer:

Option A: Shell wrapper with auto-teardown

# Launch cluster with a 4-hour hard self-destruct:
(sleep 14400 && flyctl apps destroy -y kagent-k3s) &
Option B: Machine schedule / lifetime parameter

# Stop after batch execution
flyctl machine run . --restart=no -a <app>
Pillar 3: Daily Spend Budget Alerts in Fly.io Billing
Fly.io allows configuring billing notifications:

Navigate to fly.io Billing Dashboard.
Set an email threshold alert (e.g. notify if spend exceeds $10 in a billing cycle or daily spend spikes above $1.00/day).
Immediate email notification will flag any rogue machine within 24 hours before a double-digit bill accumulates.
Pillar 4: Automated CI/CD Drift Guard (GitHub Action)
Add a scheduled GitHub Action in this repo (e.g. running daily at 22:00 UTC) that runs flyctl machines list and warns if any unexpected machines are in started state:

# Example: List all machines that are currently running
flyctl machines list -a <app> --json | jq '.[] | select(.state=="started")'
If a machine outside the approved list (secondbrain-neo4j, pexabo-mongodb, agent-platform-9a3f) is found running, send a notification or automatically stop it.

Pillar 5: Offload Heavy K8s/K3s Workloads to Proxmox ($0 Cloud Cost)
You already have a self-hosted Proxmox VE server (see 🖥️ vs Proxmox):

Fly.io Best Use: Production edge services, global HTTPS endpoints, web APIs.
Proxmox Best Use: Heavy multi-node Kubernetes clusters (k3s, k8s), continuous LLM inference, and dev sandboxes.
Running k3s on Proxmox consumes local server RAM and CPU with $0 cloud compute charges, eliminating accidental runaway cloud bills entirely.
Pillar 6: End-of-Day Terminal Checklist
Before closing the laptop after dev sessions, run a quick one-liner sanity check:

# Quick audit to see all active apps across your personal org:
flyctl apps list

# Check all machines that are started right now:
for app in $(flyctl apps list -j | jq -r '.[].ID'); do
  running=$(flyctl machines list -a $app -j 2>/dev/null | jq -r '.[] | select(.state=="started") | .id')
  if [ -n "$running" ]; then
    echo "🟢 App $app has running machine(s): $running"
  fi
done


## References

- [Fly.io Docs](https://fly.io/docs/)
- [Flyctl CLI](https://fly.io/docs/flyctl/)
- [Fly.io with Python](https://fly.io/docs/languages-and-frameworks/python/)
