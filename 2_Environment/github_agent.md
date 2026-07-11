# GitHub Error-Fixing Agent

> **Stage 2: Environment** — The automated agent that visits pages, finds errors, opens GitHub Issues, applies fixes, and reports results. Uses GitHub personal access tokens stored in Azure Key Vault.

## Purpose

The error-fixing agent (`error-fix` skill) is an automated tool that runs when instructed. It visits project pages, scans for runtime errors, opens GitHub Issues with full diagnostics, applies the smallest safe fix, and publishes a report. This bridges the gap between `7_Testing_Known` (where errors are found) and `6_Semblance` (where fixes are logged and resolved).

## GitHub Token Requirements

The agent authenticates to GitHub using a **personal access token (fine-grained)** stored in Azure Key Vault.

### Required Scopes
| Scope | Permission | Purpose |
|-------|-----------|---------|
| `contents` | Read & write | Create branches, commit fixes |
| `issues` | Read & write | Create and update GitHub Issues |
| `pull_requests` | Read & write | Open PRs for review |
| `metadata` | Read | Repository access (auto-granted) |

### Token Setup (Azure Key Vault)
```bash
# Create a fine-grained token at: https://github.com/settings/tokens
# Then store it securely — never commit the token value

az keyvault secret set \
  --vault-name delivery-pilot-dev \
  --name GITHUB-AGENT-TOKEN \
  --value "github_pat_xxxxxxxxxxxxxxxxxxxx"
```

### Token Usage
The agent loads the token at runtime:
```python
# Example: Python agent loading token from Azure Key Vault
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient

credential = DefaultAzureCredential()
client = SecretClient(vault_url="https://delivery-pilot-dev.vault.azure.net/", credential=credential)
github_token = client.get_secret("GITHUB-AGENT-TOKEN").value

# Token used in GitHub API calls via gh CLI or REST API
headers = {"Authorization": f"Bearer {github_token}"}
```

The token is **never** stored in code, config files, or git history. It lives exclusively in Azure Key Vault per environment (dev/staging/prod).

## Agent Capabilities

### 1. Page Visit & Error Scan
- Opens `index.html` and `markdown_renderer.html` in a headless browser
- Captures all console errors (JS runtime, 404s, CORS, CDN failures)
- Checks for layout breakage at mobile (375px) and desktop (1920px) viewports
- Validates that navigation menus render and respond to clicks

### 2. GitHub Issue Creation
- For each distinct error found, creates a structured GitHub Issue:
  - Title: `[AUTO-FIX] <error type> — <brief description>`
  - Labels: `bug`, `auto-detected`
  - Body: Error message, stack trace, file:line, reproduction steps, screenshot
- Deduplicates — same error doesn't create a new issue if one is already open

### 3. Fix Application
- Traces the error to the source file and line in `5_Symbols/`
- Applies the smallest safe fix on a branch: `autofix/<date>-<error-slug>`
- Runs smoke tests after the fix to verify it works
- If the fix doesn't resolve the error, reverts and logs `[PENDING]`

### 4. Reporting
- Publishes findings to `6_Semblance/smoke_test_report.md`
- Appends entries to `6_Semblance/error.log` and `6_Semblance/fix.log`
- Opens a **Pull Request** (never auto-merge) for human review
- Updates fix log status from `APPLIED` to `VERIFIED` after PR merge + testing

## Agent Workflow

```
┌─────────────────────────────────────────────────────┐
│  1. Load GITHUB_AGENT_TOKEN from Azure Key Vault    │
│  2. Visit index.html + markdown_renderer.html       │
│  3. Scan console for errors                         │
│  4. For each error:                                 │
│     ├── Create GitHub Issue (via token)             │
│     ├── Diagnose from stack trace                   │
│     ├── Apply fix on autofix/ branch                │
│     ├── Run smoke tests                             │
│     └── Open PR or log [PENDING]                    │
│  5. Publish report to 6_Semblance/                  │
└─────────────────────────────────────────────────────┘
```

## Environment Variables

| Variable | Location | Purpose |
|----------|----------|---------|
| `GITHUB_AGENT_TOKEN` | Azure Key Vault | GitHub PAT for API calls |
| `GITHUB_REPOSITORY` | Config | Target repo (rifaterdemsahin/delivery-pilot-template) |
| `AZURE_TENANT_ID` | Azure Key Vault | For Key Vault access |
| `AZURE_CLIENT_ID` | Azure Key Vault | For Key Vault access |
| `AZURE_CLIENT_SECRET` | Azure Key Vault | For Key Vault access |

## Integration Points

| Stage | How the Agent Connects |
|-------|----------------------|
| `7_Testing_Known/smoke_tests.md` | Defines which pages to visit and what errors to check |
| `5_Symbols/` | Source code scanned and fixed by the agent |
| `6_Semblance/` | error.log, fix.log, and smoke_test_report.md updated by the agent |
| `4_Formula/logging_and_autofix.md` | Nightly continuous-fix recipe that orchestrates the agent |
| GitHub Issues | Errors opened as issues, fixes linked via PRs |

## Rules

1. **Never auto-merge** — agent opens a PR; a human reviews and merges
2. **Token never in code** — loaded at runtime from Azure Key Vault
3. **Smallest safe fix** — no broad refactors, only touch files implicated by the error
4. **Idempotent** — re-running must not duplicate issues or fixes
5. **Stop on ambiguity** — if a fix isn't clear, log `[PENDING]` and leave for human
6. **Respect the gate** — document reasoning in `4_Formula/llm_thinking_log.md` before touching `5_Symbols/`
