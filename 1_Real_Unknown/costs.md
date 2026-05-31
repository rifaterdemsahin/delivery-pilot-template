# 💰 Project Cost Tracker

> **Stage 1 of 7 (Real Unknown):** Track infrastructure, tool, and service costs for setting up the platform.
> This file is a live Cost Tracker. AI agents and human developers must keep this updated as they provision resources, utilize APIs, or change plans.

---

## 📖 How to Use This Cost Tracker

1. **Keep it Updated**: When setting up or modifying resources, update the estimated and actual costs in the tables below.
2. **Track Recurring vs One-Off**: Classify costs as either one-time setup costs or monthly recurring charges.
3. **Traceability**: Link each cost entry to its setup documentation or script (e.g. `2_Environment/setup_azure.md` for Key Vault costs).
4. **Log API Consumption**: Update usage and cost statistics for AI APIs or token usage during agent operations.

---

## 🏗️ Platform Setup Costs

| Service / Resource | Provider | Type | Est. Cost (Monthly) | Actual Cost (Monthly) | Status | Stage / Setup Reference |
|--------------------|----------|------|---------------------|-----------------------|--------|--------------------------|
| **Azure Key Vault** | Microsoft Azure | Recurring | $0.03 / 10k ops | $0.00 | Active | [2_Environment/setup_azure.md](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/setup_azure.md) |
| **Backend API Host** | Fly.io | Recurring | $0.00 (Free Tier) | $0.00 | Planned | [4_Formula/README.md](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/4_Formula/README.md) |
| **Static Hosting** | GitHub Pages | Recurring | $0.00 | $0.00 | Active | [README.md](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/README.md) |
| **Local AI (Ollama)**| Self-hosted | One-off | $0.00 (Local HW) | $0.00 | Active | [2_Environment/setup_ai.md](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/setup_ai.md) |
| **Vector DB** | Qdrant Cloud / Local | Recurring | $0.00 (Local docker) | $0.00 | Active | [2_Environment/setup_ai.md](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/setup_ai.md) |
| **SSL / TLS Certs** | Let's Encrypt | Recurring | $0.00 | $0.00 | Active | N/A |

---

## 🤖 LLM & API Token Consumption Log

*Use this table to log external API calls/tokens used by agents during development/testing.*

| Date | Agent | API Model | Tokens Sent | Tokens Recv | Cost | Purpose / Task |
|------|-------|-----------|-------------|-------------|------|----------------|
| 2026-05-31 | Gemini | Gemini 1.5 Pro | N/A (Internal) | N/A (Internal) | $0.00 | Platform Kanban board & Cost Tracker template setup |

---

## 📈 Cost Summary

- **Total Estimated Monthly Cost:** ~$0.05 - $5.00 (depending on Key Vault operations)
- **Total Actual Monthly Cost:** $0.00
- **Total One-off Setup Costs:** $0.00
