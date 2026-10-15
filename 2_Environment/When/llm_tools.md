# 🛠 LLM Tools — Rationale & Security Boundaries

> **Stage 2: Environment** — Managed by the **Environment Agent**. Documents every tool available to LLMs, why each tool exists, and the security boundaries that must never be crossed.

## Purpose

When LLMs use tools to interact with the project, each tool must have a clear rationale (why it's needed) and defined security boundaries (what the LLM must never do). This document is the single source of truth for tool governance.

---

## Tool Catalog

| Tool | Category | Rationale | Security Boundaries |
|------|----------|-----------|---------------------|
| **File Read** | File System | LLMs must read project files (`.md`, `.html`, `.json`, `.py`) to understand context, follow rules, and make changes. Without read access, the agent is blind. | ❌ Never read `.env`, credentials files, or files outside the workspace. ❌ Never read `/etc/`, `~/.ssh/`, or system files. |
| **File Write / Edit** | File System | LLMs must write and edit files to implement changes, create documentation, and fix errors. Write is gated by the 4_Formula approval process. | ❌ Never overwrite `.env`, `.git/config`, or credential files. ❌ Never write outside the project workspace. ❌ Never delete files without explicit user confirmation. |
| **Bash / Shell** | Execution | LLMs must run commands (`git`, `npm`, `docker`, `python`) to build, test, commit, and deploy. Powers the entire CI/CD and automation workflow. | ❌ Never run destructive commands (`rm -rf`, `git push --force`, `docker rm -f`). ❌ Never run commands that modify system config (`sudo`, `chmod 777`). ❌ Never pipe secrets into commands. ❌ Never install unapproved packages. |
| **GitHub CLI / API** | Version Control | LLMs create commits, push changes, open PRs, and manage GitHub Issues for error tracking and smoke test reporting. | ❌ Never force push to `main`. ❌ Never skip hooks (`--no-verify`). ❌ Never use a token with more scope than needed. ❌ Token must come from Azure Key Vault, never hardcoded. |
| **Web Fetch** | Network | LLMs fetch external content (docs, references, API specs) to gather context without leaving the environment. | ❌ Never fetch internal URLs, localhost, or private IPs. ❌ Never POST/PUT data to external endpoints. ❌ Never fetch from untrusted domains. |
| **Semantic Search** | AI / Vector | LLMs use Kilo Code local indexing (small projects) or Qdrant (big repos) for codebase search instead of loading full context into memory. Managed by Environment Agent. | ❌ Never expose search index externally. ❌ Never index files containing secrets or PII. ❌ Qdrant port (6333) must not be exposed to public network. |
| **Azure Key Vault** | Secrets | LLMs retrieve secrets (tokens, API keys) at runtime via the Azure SDK. Never committed or stored in config files. | ❌ Never log, print, or echo secret values. ❌ Never store retrieved secrets in variables that persist beyond the session. ❌ Never grant the LLM write access to Key Vault (read-only). ❌ Never use production keys in dev environments. |
| **Browser / Playwright** | Testing | LLMs open pages in headless browser to run smoke tests, scan for console errors, and verify UI behavior. | ❌ Never navigate to external URLs (only local/test pages). ❌ Never fill forms or submit data to production endpoints. ❌ Never capture screenshots that may contain user data. |
| **Skill Loading** | Workflow | LLMs load `.kilo/skills/` on-demand to execute specialized workflows (navigation sync, planning gate, deployment, error fixing). | ❌ Skills must not override coordinator rules from `agents.md`. ❌ Skills must not request permissions beyond their defined scope. ❌ Skills must not chain-load other skills without explicit need. |
| **Supabase** | Database | LLMs query the database for reads (auth checks, data lookups). Write operations are gated by Row Level Security. | ❌ Never run DROP, TRUNCATE, or schema-altering queries. ❌ Never bypass Row Level Security. ❌ Never expose `SERVICE_ROLE_KEY` to frontend. ❌ Never query user data without a valid auth context. |
| **Axiom** | Logging | LLMs query structured logs to diagnose errors, track trends, and feed the nightly fix agent. | ❌ Never query logs containing secrets or PII fields. ❌ Never expose Axiom token to frontend. ❌ Never delete or modify log entries (read-only). |

---

## Tool Governance Rules

| Rule | Description |
|------|-------------|
| **Least privilege** | Every tool gets the minimum permissions needed. File write only for project files, shell only for approved commands. |
| **Read-only where possible** | Prefer read-only tool access. Write operations must pass through the 4_Formula approval gate. |
| **Secrets never in context** | Tokens and credentials are retrieved at call time from Azure Key Vault. They are never stored in agent memory, logs, or command history. |
| **Workspace sandbox** | File and shell operations are confined to the project workspace. System files and external directories are off-limits. |
| **Confirmation gate** | Destructive operations (file delete, database write, force push) require explicit user confirmation. |
| **Audit trail** | Every tool invocation is logged in `4_Formula/llm_thinking_log.md` with the tool name, purpose, and outcome. |

---

## Tool → Stage Mapping

| Tool | 1_Real | 2_Env | 3_Sim | 4_Formula | 5_Symbols | 6_Semblance | 7_Test |
|------|--------|-------|-------|-----------|-----------|-------------|--------|
| File Read | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| File Write | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Bash/Shell | | | | | ✓ | | ✓ |
| GitHub CLI | | | | | ✓ | ✓ | ✓ |
| Web Fetch | ✓ | ✓ | | ✓ | | | |
| Semantic Search | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Azure Key Vault | | | | | ✓ | | |
| Browser | | | ✓ | | | | ✓ |
| Skill Loading | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Supabase | | | | | ✓ | | |
| Axiom | | | | ✓ | | ✓ | ✓ |

---

## Adding a New Tool

When a new tool is introduced for LLMs:

1. Add a row to the Tool Catalog table with rationale and security boundaries
2. Add to the Tool → Stage Mapping table
3. Update `2_Environment/mcp.md` if it requires a new MCP server
4. Update `2_Environment/toolstack.md` if it changes the tool stack
5. Review security boundaries against the Tool Governance Rules
6. The **Environment Agent** owns this document — it is responsible for keeping it current
