# Axiom — Server-Side Logs & Observability

## What is it?

[Axiom](https://axiom.co/) is a cloud-native logging and observability platform. It ingests, stores, and queries large volumes of structured log and event data cheaply, with a serverless query engine. In this project it is the **single source of truth for server-side logs** emitted by the Fly.io backend and any edge/CI processes.

## Use Cases

| Use Case | Why Axiom |
|----------|-----------|
| **Backend application logs** | Stream structured logs from Fly.io Python services (FastAPI/Flask) |
| **Request / error tracing** | Correlate requests, capture stack traces, and alert on error spikes |
| **Audit trail** | Persist who-did-what events for security and compliance review |
| **Deploy & CI logs** | Ship GitHub Actions and `fly deploy` output for post-mortems |
| **Metrics & dashboards** | Build dashboards (latency, error rate, throughput) from event fields |
| **Alerting** | Trigger notifications (Slack, email, webhook) on log-based conditions |

## When to Choose Axiom

- You need **centralized server-side logs** instead of `stdout` scattered across machines
- You want **cheap, high-volume ingest** without per-seat or per-GB surprises
- You need **structured (JSON) logging** with fast full-text + field queries (APL)
- You want **log-based alerting** without standing up Elasticsearch/Loki yourself

## Integration with This Project

- **Backend (Fly.io):** Python services send logs to Axiom via the HTTP ingest API or the Axiom OpenTelemetry/Vector integration.
- **Frontend (GitHub Pages):** Static site stays log-free; only the backend and edge emit logs.
- **Secrets:** `AXIOM_TOKEN` and `AXIOM_ORG_ID` are stored in **Azure Key Vault** and injected as env vars at deploy time — never committed to git.
- **Dataset:** One Axiom dataset per environment (`dev`, `staging`, `prod`).

## Setup

```bash
# 1. Create a free account at https://axiom.co and a dataset (e.g. "delivery-pilot-prod")
# 2. Create an API token (Settings → API Tokens) scoped to ingest + query
# 3. Store the token in Azure Key Vault, then expose to the Fly.io app:
fly secrets set AXIOM_TOKEN="xaat-..." AXIOM_DATASET="delivery-pilot-prod"
```

### Python (structured ingest example)

```python
import os, requests, datetime

AXIOM_TOKEN = os.environ["AXIOM_TOKEN"]
AXIOM_DATASET = os.environ["AXIOM_DATASET"]

def log_event(level: str, message: str, **fields):
    requests.post(
        f"https://api.axiom.co/v1/datasets/{AXIOM_DATASET}/ingest",
        headers={"Authorization": f"Bearer {AXIOM_TOKEN}",
                 "Content-Type": "application/json"},
        json=[{
            "_time": datetime.datetime.utcnow().isoformat() + "Z",
            "level": level,
            "message": message,
            **fields,
        }],
        timeout=5,
    )

log_event("info", "user signed in", user_id="abc123", path="/login")
```

## Pricing

| Tier | Cost |
|------|------|
| Free (Personal) | 0.5 TB/month ingest, 30-day retention |
| Team | Usage-based, volume discounts on ingest |
| Enterprise | Custom retention, SSO, dedicated support |

## References

- [Axiom Docs](https://axiom.co/docs)
- [Ingest API](https://axiom.co/docs/send-data/ingest)
- [APL (Axiom Processing Language)](https://axiom.co/docs/apl/introduction)
- [OpenTelemetry integration](https://axiom.co/docs/send-data/opentelemetry)
