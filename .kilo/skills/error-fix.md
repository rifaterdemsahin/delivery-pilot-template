# Error-Fix Agent Skill

Load this skill when running automated error discovery, GitHub Issue creation, fix application, and reporting.

## Purpose
Automate the full error-resolution loop: visit pages, find errors, open GitHub Issues, apply fixes, and report results to `6_Semblance/`.

## Prerequisites
- **GitHub PAT** stored in Azure Key Vault as `GITHUB_AGENT_TOKEN` (scopes: `contents`, `issues`, `pull_requests`)
- Access to `az keyvault secret show` or Azure SDK for token retrieval
- See `2_Environment/github_agent.md` for setup instructions

## Skills Loaded
When this skill activates, ensure these are available:
- `secrets` skill — for Azure Key Vault token retrieval
- `deploy` skill — for commit/push workflow after fixes

## Workflow

### 1. Load GitHub Token
```
az keyvault secret show --vault-name delivery-pilot-dev \
  --name GITHUB-AGENT-TOKEN --query value -o tsv
```
Use the token as `GITHUB_TOKEN` env var for all `gh` CLI commands.

### 2. Visit Pages & Scan Errors
```
# Open pages in browser or headless
open index.html
open "5_Symbols/markdown_renderer.html?file=1_Real_Unknown/README.md"

# Check console (capture via browser automation)
document.querySelectorAll errors, 404 fetch failures, CDN load errors
```

### 3. Create GitHub Issues
For each unique error:
```bash
gh issue create \
  --title "[AUTO-FIX] <error type> — <description>" \
  --label "bug,auto-detected" \
  --body "### Error
\`\`\`
<error message + stack trace>
\`\`\`

### File
<path>:<line>

### Steps to Reproduce
1. Open <page>
2. Check console
3. See error

### Agent
Detected by error-fix agent. Token: Azure Key Vault."
```

### 4. Diagnose & Fix
```
1. Parse stack trace → locate file:line in 5_Symbols/
2. Determine root cause
3. Create branch: git checkout -b autofix/YYYY-MM-DD-<error-slug>
4. Apply smallest safe fix
5. Run smoke tests: see 7_Testing_Known/smoke_tests.md
6. If green → commit and push
7. If red → revert, log [PENDING] in 6_Semblance/fix.log
```

### 5. Open PR
```bash
gh pr create \
  --title "🔧 Auto-fix: <error description>" \
  --body "### Found by error-fix agent
- Error: <message>
- Fix: <description>
- Branch: autofix/YYYY-MM-DD-<slug>

### Verification
- [ ] Smoke tests pass
- [ ] No regression detected

Never auto-merge — requires human review."
```

### 6. Report
- Append to `6_Semblance/error.log`: `[DATE] [7_Testing_Known] [ERROR] — <description>`
- Append to `6_Semblance/fix.log`: `[DATE] [6_Semblance] [APPLIED] — <fix description>`
- Update `6_Semblance/smoke_test_report.md` with results
- After PR merge + `7_Testing_Known` validation → `fix.log` status `VERIFIED`

## Guardrails
- **Never auto-merge** — PR always requires human approval
- **Token from Key Vault** — never hardcoded or committed
- **Smallest fix** — only touch files in the stack trace
- **Deduplicate** — check existing GitHub Issues before creating new ones
- **Stop on ambiguity** — log `[PENDING]` if fix isn't clear
