# File Organization

> **5_Symbols / Rules** — How to organize code files within the implementation stage.

## Directory Structure

```
5_Symbols/
├── rules/                  # Coding + standing operating rules (this folder)
│   ├── agent_operating_rules.md
│   ├── coding_standards.md
│   ├── git_conventions.md
│   └── file_organization.md
├── src/                    # Source code
│   ├── main.py            # Entry point
│   ├── modules/           # Feature modules
│   └── utils/             # Shared utilities
├── assets/                # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── config/                # Non-secret configuration
├── Dockerfile             # Container build
├── docker-compose.yml     # Multi-service orchestration
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

## File Placement Rules

### Root folders (RULE-005)

The only allowed **root folders** are:

`.claude/skills` · `.github/workflows` · `.kilo/skills` · `1_Real_Unknown` · `2_Environment` · `3_Simulation` · `4_Formula` · `5_Symbols` · `6_Semblance` · `7_Testing_Known`

Move any other root file or folder into the related subfolder of those (see `agent_operating_rules.md` RULE-005). Do not add new top-level directories.

### Root-Level Files (exceptions only)

These **files** stay at the repo root because GitHub Pages, git, or the coordinator require them. They are not an invitation to add more root files:

- `index.html` — GitHub Pages entry point
- `README.md` — GitHub + Pages URL
- `robots.txt`, `sitemap.xml` — SEO
- `.env.example`, `.gitignore` — Config
- `navigation_config.json` — Shared menu config (loaded by root `index.html`)
- `agents.md` + LLM persona files — coordinator contract

`5_Symbols/markdown_renderer.html` is source code — it lives in Stage 5, not at the root.

### Stage 5 Files
Everything else that is code/implementation belongs here:
- Source code → `5_Symbols/src/`
- Config files → `5_Symbols/config/`
- Workflow definitions → `.github/workflows/` (repo root, RULE-005 — not inside `5_Symbols/`)
- Docker definitions → `5_Symbols/` root

## Module Organization

```python
# Good: Small focused modules
5_Symbols/src/
├── main.py                # Entry point, wiring
├── routes/
│   ├── api.py            # REST endpoints
│   └── pages.py          # Page rendering
├── services/
│   ├── database.py       # Supabase queries
│   └── secrets.py        # Azure Key Vault client
└── utils/
    ├── logging.py        # Axiom integration
    └── config.py         # Config loader
```

## When to Split

- Module exceeds 300 lines → consider splitting
- Function has more than 3 levels of nesting → refactor
- File has mixed concerns (business logic + UI + data access) → split by concern
- Same code appears in 3+ places → extract to shared utility

## Deprecated Code

Move unused but kept-for-reference code to `_obsolete/`:
```
5_Symbols/src/_obsolete/
├── old_auth_module.py
└── legacy_api_v1.py
```

## Cross-Stage Coordination

- Code in `5_Symbols/` implements what was specced in `4_Formula/specs.md`
- Designs in `3_Simulation/` show what the UI should look like
- If the spec changes, the code here must be updated to match
- If the code can't match the design, flag the spec with `[NEEDS UPDATE]`
