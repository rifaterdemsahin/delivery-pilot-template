# Cloudflare Workers — Backend Edge Compute

## What is it?

Cloudflare Workers is a serverless execution environment that runs at the edge — on Cloudflare's global network of 300+ data centers. Code executes close to users, reducing latency.

## Use Cases

| Use Case | Why Cloudflare Workers |
|----------|----------------------|
| **API Gateway** | Route, transform, and throttle requests at the edge before hitting your backend |
| **Authentication** | Validate JWTs, API keys, or session tokens at the edge — reject unauthorized traffic early |
| **Geo-based Routing** | Serve different content or route to different backends based on user location |
| **Caching Layer** | Cache API responses at the edge; reduce load on origin servers |
| **Webhooks** | Process incoming webhooks (GitHub, Stripe, etc.) with minimal cold start |
| **Rate Limiting** | Protect backend services from abuse without a separate proxy |
| **A/B Testing** | Split traffic at the edge without client-side JavaScript |

## When to Choose Cloudflare Workers

- You need **ultra-low latency** (sub-50ms response times)
- Your backend logic is **lightweight** (no long-running processes, no heavy computation)
- You want **zero cold starts** (Workers start in <1ms)
- You're already using Cloudflare for DNS or CDN
- You need a **free tier** for prototyping (100K requests/day)

## When NOT to Choose Cloudflare Workers

- You need **persistent connections** (WebSockets, SSE) — use Fly.io instead
- Your workload requires **GPU or heavy compute** — use a dedicated server
- You need **file system access** or local storage — Workers are stateless
- You're running **long-running tasks** (>30s) — Workers have a CPU time limit

## Integration with This Project

- **Frontend:** Static site on GitHub Pages
- **Edge Logic:** Cloudflare Workers handles auth, routing, caching
- **Backend:** Fly.io runs the Python application
- **Secrets:** Azure Key Vault (Workers access via API)

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
