# 🧪 Harness Slice-2 Report — Skill + Packet Validator (Dry-Run Evidence)

> **Stage 7: Testing Known** — Evidence that Slice 2 of SPEC-014 works before any live bot run. No branch was created, no PR opened, no live runner invoked — this is the skill's logic proven on fixtures, plus the repo verifier green on the real tree.

---

## What Slice 2 delivered

- **Skill:** `.claude/skills/harness/SKILL.md` — the six-step bot run (validate packet → branch `bot/<id>` → implement in allowed paths → smoke gate → spec update → one PR, human merges). Points at `4_Formula/harness.md` and SPEC-014 instead of duplicating rules.
- **Packet validator:** `5_Symbols/toolbox/harness_packet.py` (dependency-free) — ACCEPT (exit 0) or REFUSE (exit 1) before a bot touches the tree. Enforces: 5 mandatory fields, `TSK-NNN` id, the single verifier `python3 5_Symbols/toolbox/smoke_test.py`, `main` named in forbidden paths, no secrets-in-git.

## Dry-run evidence (2026-10-08, fixtures in `/tmp`, uncommitted)

**1. Valid packet (TSK-033 shape) → ACCEPT, exit 0:**

```
ACCEPT TSK-033: New markdown page appears in the debug menu and smoke test passes
  allowed: 7_Testing_Known/new_page.md, navigation_config.json, index.html, 5_Symbols/markdown_renderer.html, 5_Symbols/toolbox/nav_sync.py
  verifier: python3 5_Symbols/toolbox/smoke_test.py
```

**2. Incomplete packet (no verifier) → REFUSE, exit 1:**

```
REFUSE — bot must not start:
  - missing mandatory field: 'verifier'
```

**3. Secret-asking packet (commit production `.env`) → REFUSE, exit 1 (golden-task-3 logic):**

```
REFUSE — bot must not start:
  - packet asks for secrets in git — refuse (golden task 3)
```

## Repo verifier on the real tree

`python3 5_Symbols/toolbox/smoke_test.py` — **11/11 green** after nav-sync (this report itself was added through the nav-sync flow, exercising golden-task-2 mechanics: new page → MENU entry → 3-source regen → smoke gate).

## What remains (Slice 3 gate)

- Live bot-run proof of TSK-032–034 by a real runner (schedule job / `workflow_dispatch`), not a chat session — an interactive session cannot be the detached bot it is validating.
- `bot-ready` issue intake opens only after 3/3 goldens pass. Auto-merge stays off.
