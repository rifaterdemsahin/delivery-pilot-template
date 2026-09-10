# Agent Operating Rules

> **5_Symbols / Rules** — Standing orders every agent must follow. Load this file at session start together with `agents.md` and your LLM persona file.

Coordinator: [`agents.md`](../../agents.md) · Specs: [`4_Formula/specs.md`](../../4_Formula/specs.md) · Git: [`git_conventions.md`](git_conventions.md)

---

## Standing orders (do these every task)

### RULE-001 — Formulate what you did as a spec in Formula

> Always remember to formulate as a spec on what you have done and add it to the Formula folder.

- After completing work, write or update a spec in `4_Formula/specs.md` (`SPEC-XXX`) that describes the behavior **as delivered**.
- New work still needs a spec **before** implementation (existing Specs System). After delivery, update that spec so Formula matches reality — not just the plan.
- Docs-only and process work still get a spec (or a spec update). Formula is the memory of what was done.
- Log the reasoning in `4_Formula/llm_thinking_log.md` (before action, and a summary after).
- If the work changes an existing spec, flag `[NEEDS UPDATE]` first; if code diverges from an active spec, flag `[DRIFT]`.

**Where it goes**

| Artifact | File |
|----------|------|
| Spec of what was done | `4_Formula/specs.md` |
| Why / trade-offs | `4_Formula/llm_thinking_log.md` |
| Decision (if architectural) | `4_Formula/decisions.md` |

### RULE-002 — Commit and push

> Commit and push. Do not leave work only on the local disk.

- **After every command / logical change, commit and push.** Do not batch unrelated changes into one commit.
- Each step gets its own commit. When the whole task is done, confirm everything is committed and pushed.
- Follow [`git_conventions.md`](git_conventions.md): `type: imperative description`, never force-push `main`, never commit secrets.
- If git errors occur (conflicts, locked index, push rejected), troubleshoot and complete the commit and push. Do not stop with unpushed work.

**Commit checklist (minimum)**

- [ ] One logical change
- [ ] Spec in `4_Formula/specs.md` updated for what was done (RULE-001)
- [ ] No secrets in the diff
- [ ] Debug menu synced if a markdown file was added, renamed, or deleted

### RULE-003 — Backend deploy: Fly.io or Cloudflare Workers

> Apps with a backend deploy to **Fly.io** or **Cloudflare Workers**, chosen from the app's requirements. Heavy container requirements go to **Fly.io**. Both take credentials from **Azure Key Vault**.

Pick one backend target per service (static frontends stay on GitHub Pages):

| Requirement | Deploy to |
|-------------|-----------|
| Lightweight, stateless, edge (auth, routing, caching, short request/response) | **Cloudflare Workers** |
| Heavy containers — Docker, persistent processes, filesystems, WebSockets, GPU, long-running jobs | **Fly.io** |

- Do not invent a third backend host unless Environment Agent documents it and Formula specs it.
- **Credentials:** Fly.io and Cloudflare Workers load secrets from **Azure Key Vault** at deploy or runtime. Never bake keys into Worker code, Docker images, `wrangler.toml`, `fly.toml`, or git. See [`2_Environment/setup_azure.md`](../../2_Environment/setup_azure.md), [`2_Environment/fly_io.md`](../../2_Environment/fly_io.md), [`2_Environment/cloudflare_workers.md`](../../2_Environment/cloudflare_workers.md).

### RULE-004 — Default storage is Azure project-based storage

> The project default storage is **Azure project-based storage** (one Azure Storage account / blob container set scoped to this project).

- Use that Azure storage for blobs, uploads, artifacts, and files the app must persist. Do not default to Fly volumes, Cloudflare R2, local disk, or git LFS.
- Connection strings and account keys live in **Azure Key Vault**, not in code.
- Structured app data can still use Supabase (Postgres) when a database is the right tool; Azure project storage is the default for **files and blobs**. Record exceptions in `4_Formula/decisions.md`.

### RULE-005 — Allowed root folders; move everything else into them

> The only **root folders** in this repo are the 7 stages plus the skill/workflow dirs. Anything else at the root must be **moved into the related subfolder**.

**Allowed root folders**

```
.claude/skills
.github/workflows
.kilo/skills
1_Real_Unknown
2_Environment
3_Simulation
4_Formula
5_Symbols
6_Semblance
7_Testing_Known
```

(`.git` is the VCS directory — do not treat it as a project folder.)

**Move extras here**

| If it is… | Move it to |
|-----------|------------|
| Problems, OKRs, tasks, prompts, risks, costs | `1_Real_Unknown/` |
| Architecture, setup, tools, env, MCP | `2_Environment/` |
| Designs, mockups, image prompts, carousel | `3_Simulation/` |
| Specs, decisions, thinking log, Formula commands | `4_Formula/` |
| Source code, toolbox, coding rules, app HTML | `5_Symbols/` |
| Error/fix logs, lessons, workarounds | `6_Semblance/` |
| Tests, validation, logic tracker | `7_Testing_Known/` |
| Claude skills | `.claude/skills/` |
| GitHub Actions workflows | `.github/workflows/` |
| Kilo skills | `.kilo/skills/` |

- Do **not** create a new top-level folder. If a tool wants its own root dir, put its files under the matching allowed folder (e.g. Kilo config under `.kilo/`, extra Claude files under `.claude/skills/`).
- When you find a stray root file or folder, **move it** (`git mv`), update references, run `python3 5_Symbols/toolbox/nav_sync.py` if a markdown path changed, then commit and push (RULE-002).

**Root files that must stay** (not folders — GitHub Pages / git / coordinator require them at the repo root):

| File | Why it stays |
|------|----------------|
| `index.html` | GitHub Pages entry point |
| `README.md` | GitHub + Pages URL |
| `robots.txt`, `sitemap.xml` | SEO at site root |
| `.gitignore`, `.env.example` | Git and secrets template |
| `navigation_config.json` | Loaded by root `index.html` |
| `agents.md` + LLM persona files (`claude.md`, `gemini.md`, `copilot.md`, `kilocode.md`, …) | Coordinator contract |

Do not park new docs, scripts, or tool caches next to these. Tool caches (`.antigravitycli/`, `node_modules/`, `.env`) stay gitignored, not in a stage folder.

---

## Session checklist

1. Read this file + `agents.md` + your persona (`claude.md` / `gemini.md` / `copilot.md` / `kilocode.md`).
2. Map the task in `1_Real_Unknown/` (OKRs, `tasks.md`, `prompts.md`).
3. Spec in `4_Formula/` **before** `5_Symbols` code (and confirm with the user when crossing into implementation).
4. Implement, then **update the spec to match what you actually did** (RULE-001).
5. **Commit and push** each logical step (RULE-002).
6. Smoke-test after implementation; log errors/fixes in `6_Semblance/`.

---

## Related rules (do not skip)

These live in the coordinator (`agents.md`) and the rest of this folder. This file does not replace them.

| Rule | Where |
|------|--------|
| 7-stage execution flow | `agents.md` |
| Confirmation before implementation | `agents.md` |
| Coding standards (HTML/CSS/JS) | `coding_standards.md` |
| File placement and naming | `file_organization.md` |
| Commit message format | `git_conventions.md` |
| Two-menu navigation + nav sync | `4_Formula/navigation.md`, `5_Symbols/toolbox/nav_sync.py` |
| Secrets never in git | Azure Key Vault; `.env.example` only |
| Backend host (Workers vs Fly.io) | RULE-003; `2_Environment/fly_io.md`, `2_Environment/cloudflare_workers.md` |
| Default file/blob storage | RULE-004; Azure project-based storage |
| Allowed root folders; move extras | RULE-005; `file_organization.md` |

---

## Spec template (copy into `4_Formula/specs.md`)

```markdown
### SPEC-XXX: [What was done]
- **Status:** Active
- **Description:** What this change does, as delivered
- **Key Behaviors:**
  - Behavior as implemented (not as hoped)
- **Related Files:** `path/to/file`
- **Last Updated:** YYYY-MM-DD
```
