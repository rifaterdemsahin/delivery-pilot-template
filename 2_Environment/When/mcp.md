# MCP Server Requirements

> **Stage 2: Environment** — Model Context Protocol (MCP) servers required for this project's agents to interact with external tools, APIs, and services.

## What is MCP?

The Model Context Protocol (MCP) is an open standard for connecting agents to external tools and data sources. Each MCP server exposes specific capabilities — reading files, querying databases, calling APIs — that agents can invoke during task execution.

## Required MCP Servers

| MCP Server | Purpose | Required For |
|------------|---------|-------------|
| **GitHub** | Create/manage Issues, PRs, read/write repo contents | Error-fixing agent, deploy skill, smoke test reporting |
| **Azure Key Vault** | Retrieve secrets at runtime (tokens, API keys) | Secrets skill, error-fix skill, all authenticated operations |
| **File System** | Read/write project files across all 7 stages | All agents and skills |
| **Browser / Playwright** | Open pages, scan for console errors, take screenshots | Error-fix skill, smoke tests, verification |

## Recommended MCP Servers

| MCP Server | Purpose | When to Use |
|------------|---------|-------------|
| **Supabase** | Query database, run migrations, manage auth | Backend features, data layer operations |
| **Axiom** | Query structured logs, run APL queries, check dashboards | Nightly fix agent, debugging, log analysis |
| **Fly.io** | Deploy backend services, check deployment status | Backend deployments, CI/CD |
| **Qdrant** | Manage vector collections, run semantic search | Big repos using Tier 2 AI stack |

## MCP Configuration

### GitHub MCP
```
# Environment: GITHUB_AGENT_TOKEN from Azure Key Vault
# Scopes: repo, issues:write, pull_requests:write
# Used by: error-fix skill, deploy skill, smoke test reporting
```

### Azure Key Vault MCP
```
# Environment: AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET
# Vault URL: https://<vault-name>.vault.azure.net/
# Used by: secrets skill (all secret retrieval)
```

### Browser / Playwright MCP
```
# Opens pages in headless mode for smoke tests
# Target URLs: index.html, 5_Symbols/markdown_renderer.html
# Used by: error-fix skill, smoke test workflow
```

## MCP → Stage Mapping

| MCP Server | 1_Real | 2_Env | 3_Sim | 4_Formula | 5_Symbols | 6_Semblance | 7_Test |
|------------|--------|-------|-------|-----------|-----------|-------------|--------|
| GitHub | | | | | ✓ | ✓ | ✓ |
| Azure KV | | | | | ✓ | | |
| File System | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Browser | | | ✓ | | | | ✓ |
| Supabase | | | | | ✓ | | |
| Axiom | | | | ✓ | | ✓ | ✓ |
| Fly.io | | | | | ✓ | | |
| Qdrant | | | | | ✓ | | |

## Adding a New MCP Server

1. Identify the external service the agent needs to access
2. Add the MCP server to the appropriate table above (Required or Recommended)
3. Document the token/credential requirement in Azure Key Vault
4. Update `2_Environment/tools.md` if it's a new tool integration
5. Add to `.env.example` as placeholder if it requires new env vars
6. Update this file's MCP → Stage Mapping table

## Rules

- **Never commit MCP tokens or credentials** — all secrets in Azure Key Vault
- **Least privilege** — each MCP server should only get the scopes it needs
- **One Key Vault per environment** — dev/staging/prod get separate MCP credentials
- **Reuse existing MCPs** — don't add a new server if an existing one can serve the purpose
