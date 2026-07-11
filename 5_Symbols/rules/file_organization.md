# File Organization

> **5_Symbols / Rules** — How to organize code files within the implementation stage.

## Directory Structure

```
5_Symbols/
├── rules/                  # Coding rules (this folder)
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
├── .github/workflows/     # CI/CD pipelines
├── Dockerfile             # Container build
├── docker-compose.yml     # Multi-service orchestration
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

## File Placement Rules

### Root-Level Files
Only files required at the repository root go outside `5_Symbols/`:
- `index.html` — GitHub Pages entry point
- `markdown_renderer.html` — Shared markdown viewer
- `robots.txt`, `sitemap.xml` — SEO
- `.env.example`, `.gitignore` — Config
- `navigation_config.json` — Shared menu config

### Stage 5 Files
Everything else that is code/implementation belongs here:
- Source code → `5_Symbols/src/`
- Config files → `5_Symbols/config/`
- Workflow definitions → `5_Symbols/.github/`
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
