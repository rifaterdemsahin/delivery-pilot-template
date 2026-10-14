# 💰 Cost Tracker & Model/Tool Comparisons

> **Stage 1: Real Unknown** — Managed by the **Environment Agent**. Tracks infrastructure costs, LLM token costs, and compares models/tools to suggest the most cost-effective options.

## Purpose

The Environment Agent checks costs for all environments (including LLM costs), understands what needs to be done, compares different models and tools, gives cost-saving suggestions, and records all findings here.

---

## 🏗 Infrastructure Costs

| Service | Provider | Tier | Est. Monthly | Actual Monthly | Status |
|---------|----------|------|-------------|----------------|--------|
| Azure Key Vault | Microsoft | Standard | $0.03/10k ops | $0.00 | ✅ Active |
| GitHub Pages | GitHub | Free | $0.00 | $0.00 | ✅ Active |
| Fly.io | Fly.io | Free (3 shared VMs) | $0.00 | $0.00 | 📋 Planned |
| Supabase | Supabase | Free (2 projects) | $0.00 | $0.00 | ✅ Active |
| Axiom | Axiom | Free (500k events) | $0.00 | $0.00 | 📋 Planned |
| Ollama | Self-hosted | Local | $0.00 | $0.00 | ✅ Active |
| Qdrant | Self-hosted | Docker local | $0.00 | $0.00 | ⚠️ Big repos only |
| Cloudflare Workers | Cloudflare | Free (100k/day) | $0.00 | $0.00 | 📋 Optional |

**Total estimated monthly:** $0.00 (all free tiers sufficient for current project scale)

---

## 🤖 LLM Model Cost Comparison

Comparison of models available for agent operations. The Environment Agent reviews and suggests the most cost-effective option based on the task.

| Model | Provider | Input / 1M tokens | Output / 1M tokens | Context Window | Best For | Cost Rating |
|-------|----------|-------------------|-------------------|----------------|----------|-------------|
| Claude 3.5 Sonnet | Anthropic | $3.00 | $15.00 | 200K | Complex reasoning, multi-step tasks, code generation | 💰💰💰 |
| Claude 3 Haiku | Anthropic | $0.25 | $1.25 | 200K | Fast, lightweight tasks | 💰 |
| GPT-4o | OpenAI | $2.50 | $10.00 | 128K | General purpose, strong reasoning | 💰💰 |
| GPT-4o Mini | OpenAI | $0.15 | $0.60 | 128K | Lightweight, high-volume tasks | 💰 |
| Gemini 1.5 Pro | Google | $1.25 | $5.00 | 2M | Very long context, multimodal | 💰💰 |
| Gemini 1.5 Flash | Google | $0.075 | $0.30 | 1M | High speed, low cost | 💰 |
| DeepSeek V3 | DeepSeek | $0.27 | $1.10 | 128K | Strong code generation, low cost | 💰 |
| Llama 3.1 (local) | Meta / Ollama | $0.00 | $0.00 | 128K | Offline, private, zero cost | 🆓 |

### Environment Agent Suggestions

| When | Suggested Model | Rationale |
|------|----------------|-----------|
| Day-to-day coding tasks | Claude 3 Haiku / DeepSeek V3 | Low cost, sufficient for structured code generation |
| Complex multi-agent coordination | Claude 3.5 Sonnet | Strong reasoning needed for orchestrating 7 agents |
| Large context (full spec review) | Gemini 1.5 Pro | 2M context window fits entire project |
| Local / offline work | Llama 3.1 (Ollama) | Zero cost, fully private, no API key needed |
| High-volume smoke tests | Gemini 1.5 Flash | Cheapest per-token for repetitive tasks |
| Precision code generation | DeepSeek V3 | Strong codegen at 1/5 the cost of Claude |

---

## 🛠 Tool Cost Comparison — Free vs Paid Tiers

Comparison of when to switch from free to paid tiers as the project scales.

| Tool | Free Tier Limit | Paid Starts At | Scale Trigger | Suggestion |
|------|----------------|---------------|---------------|------------|
| Supabase | 2 projects, 500MB DB | $25/mo (Pro) | >2 projects or >500MB data | Stay free as long as possible; Pro has no surprise costs |
| Fly.io | 3 shared VMs, 256MB each | ~$1.94/mo per additional | >3 services or >256MB RAM needed | Launch on free, scale individual services as needed |
| Axiom | 500k events/month | $25/mo (Pro) | >500k log events/month | Start without logs, add Axiom when debugging needs grow |
| Cloudflare Workers | 100k requests/day | $5/mo (Workers Paid) | >100k req/day or need KV storage | Optional — only add if edge compute becomes necessary |
| Azure Key Vault | Free tier available | ~$0.03/10k ops | Heavy secret rotation needs | Pay-per-use is negligible at current scale |
| GitHub Actions | 2000 min/month (private) | $0.008/min beyond | >2000 min CI time | Public repos are free; private repos get 2000 free min |
| Qdrant Cloud | — | $25/mo (Cloud) | Need managed vector DB | Avoid entirely — use Kilo Code local indexing instead |

### Environment Agent Tool Suggestions

| Scenario | Suggestion | Rationale |
|----------|-----------|-----------|
| Current project state | All free tiers | ~$0/mo — no service exceeds free limits |
| Adding a team member | No cost change | GitHub Pages + Supabase free tier supports small teams |
| Scaling to 10k users | ~$25/mo (Supabase Pro) | Database becomes the first bottleneck |
| Adding observability | $25/mo (Axiom Pro) | Only needed when debugging complex backend issues |
| Replacing Qdrant with Kilo Code | Saves $25/mo | Kilo Code built-in indexing = zero cost |

---

## 📊 LLM Token Consumption Log

| Date | Agent | Model | Tokens In | Tokens Out | Est. Cost | Task |
|------|-------|-------|-----------|------------|-----------|------|
| 2026-07-11 | Kilo Code | DeepSeek V4 | — | — | ~$0.00 | Multi-agent architecture, task coordination setup |
| 2026-05-31 | Gemini | 1.5 Pro | — | — | $0.00 | Kanban board & Cost Tracker template setup |

---

## 💡 Cost Reduction History

| Date | Change | Previous Cost | New Cost | Saved |
|------|--------|--------------|----------|-------|
| 2026-07-11 | Kilo Code local indexing replaces Qdrant default | $25/mo (Qdrant Cloud) | $0.00 | $25/mo |
| 2026-07-11 | DeepSeek used for bulk agent work vs Claude | ~$3/1M input | ~$0.27/1M input | ~90% |
| 2026-07-11 | DeepSeek used for bulk agent work vs Claude | ~$3/1M input | ~$0.27/1M input | ~90% |
| 2026-06-19 | Axiom deferred — not needed yet | $25/mo | $0.00 | $25/mo |
| 2026-05-28 | Azure Key Vault replaces Doppler | ~$5/seat/mo | $0.03/10k ops | ~$5/mo |

---

## 🚨 Token Usage Monitoring & Spike Alerts

The Environment Agent monitors LLM token consumption and warns on cost spikes.

### Alert Thresholds
- **Daily spike warning**: >$2/day above running 7-day average
- **Session spike warning**: >$0.50 in a single agent session above normal
- **Monthly overrun warning**: >80% of projected monthly budget used before day 20

### Monitoring Procedure
1. After each agent session, log actual tokens/cost in the LLM Token Consumption Log
2. Compare against the 7-day rolling average
3. If a spike is detected, log the alert in `costs.md` and flag in `llm_thinking_log.md` with `[COST SPIKE]`
4. Investigate the cause (model switch, large context, runaway agent loop)
5. Suggest a mitigation (switch to cheaper model, split context, cap tokens)

### Spike Alert Log
| Date | Alert | Trigger | Action Taken | Status |
|------|-------|---------|--------------|--------|
| — | — | — | — | — |

---

## 📈 Summary

| Metric | Value |
|--------|-------|
| Current monthly cost | **$0.00** |
| Projected cost at 10x scale | ~$25-50/mo |
| Largest saving this session | Qdrant → Kilo Code local indexing ($25/mo freed) |
| Most expensive active component | None (all free tier) |
| Next likely paid switch | Supabase Pro ($25/mo) when DB exceeds 500MB |
