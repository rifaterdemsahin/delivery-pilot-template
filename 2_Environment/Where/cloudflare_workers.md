# Cloudflare Workers — Backend Edge Compute

## What is it?

Cloudflare Workers is a serverless execution environment that runs at the edge — on Cloudflare's global network of 300+ data centers. Code executes close to users, reducing latency. In this project it is the **default deployment target for systems with no state (stateless backends)** and edge logic (RULE-003 / SPEC-012). When there are many HTML files and state is getting saved, the project uses **Fly.io** instead to manage packing and deployments. Both platforms take credentials from **Azure Key Vault**.

## Use Cases

| Use Case | Why Cloudflare Workers |
|----------|----------------------|
| **Default No-State Backend** | Standard choice for stateless request/response APIs and edge functions |
| **API Gateway** | Route, transform, and throttle requests at the edge before hitting your backend |
| **Authentication** | Validate JWTs, API keys, or session tokens at the edge — reject unauthorized traffic early |
| **Geo-based Routing** | Serve different content or route to different backends based on user location |
| **Caching Layer** | Cache API responses at the edge; reduce load on origin servers |
| **Webhooks** | Process incoming webhooks (GitHub, Stripe, etc.) with minimal cold start |
| **Rate Limiting** | Protect backend services from abuse without a separate proxy |
| **A/B Testing** | Split traffic at the edge without client-side JavaScript |

## When to Choose Cloudflare Workers

- You have a **system with no state** (stateless, pure request/response, edge functions)
- You need **ultra-low latency** (sub-50ms response times)
- Your backend logic is **lightweight** (no long-running processes, no heavy computation)
- You want **zero cold starts** (Workers start in <1ms)
- You're already using Cloudflare for DNS or CDN
- You need a **free tier** for prototyping (100K requests/day)

## When NOT to Choose Cloudflare Workers

- You have **many HTML files and state getting saved** — use **Fly.io** to manage packing, volume persistence, and deployments
- You need **persistent connections** (WebSockets, SSE) — use Fly.io instead
- Your workload requires **GPU or heavy compute** — use Fly.io or a dedicated server
- You need **file system access** or local storage — Workers are stateless
- You're running **long-running tasks** (>30s) — Workers have a CPU time limit

## Integration with This Project

- **Frontend:** Static site on GitHub Pages
- **Edge Logic:** Cloudflare Workers handles auth, routing, caching
- **Backend:** Fly.io runs the Python application
- **Secrets:** Azure Key Vault (Workers access via API) — same vault as Fly.io; never commit Worker secrets
- **Storage:** Azure project-based storage is the default for files/blobs (RULE-004); not Workers KV or R2 unless Formula records an exception

## Setup

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create a new Worker
wrangler init my-worker

# Deploy
wrangler deploy
```

## Pricing

| Tier | Cost |
|------|------|
| Free | 100K requests/day, 10ms CPU/request |
| Paid ($5/mo) | 10M requests/month, 30s CPU/request |

## References

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
