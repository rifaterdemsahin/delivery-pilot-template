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
