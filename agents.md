# Agents

This file defines how AI agents interact with the **Delivery Pilot Template** project.

## Supported Agents

| Agent | File | Purpose |
|-------|------|---------|
| Claude | `claude.md` | Full-stack dev, DevOps, 7-stage framework |
| Gemini | `gemini.md` | Multimodal analysis, image tasks |
| GitHub Copilot | `copilot.md` | GitHub-native integrations |
| Kilo Code | `kilocode.md` | Precision code generation |

## Agent Rules

- Always follow the 7-stage folder structure (`1_Real_Unknown` through `7_Testing_Known`)
- Never commit secrets — use Azure Key Vault for all sensitive values
- **After every command, commit and push** — do not batch changes; each step gets its own commit. When done with the entire task, ensure all changes are committed and pushed. If any git errors occur (e.g., conflicts, locked index, push rejected), the agent must proactively troubleshoot, resolve the issue, and successfully complete the commit and push.
- Place files in the correct numbered folder based on their stage:
  - **1_Real_Unknown**: Update if there is a new objective or Key Result (OKR) change.
  - **2_Environment**: Update environment-related files here if there is a change in the environment.
  - **3_Simulation**: If the abstract UI is updated, create/generate an image and place/mention it here.
  - **4_Formula**: If there is a new way of working, recipe, or build logic, document it here. Also, document a summary of the Large Language Model's thinking phase/reasoning process in this folder after executions.
  - **5_Symbols**: All new source code must be placed here, except for files that must stay in the root folder (e.g., `index.html`, `markdown_renderer.html`).
  - **6_Semblance**: Document all encountered errors, workarounds, and gap analyses here.
  - **7_Testing_Known**: Place testing validation, checklists, and proof of working here.
- Use emojis for scannability in documentation
- **Record every prompt** — all prompts given to agents must be logged in `prompts.md` with date, agent name, purpose, and what was done.
- **README.md must include the public GitHub Pages URL** — e.g., `https://rifaterdemsahin.github.io/<repo-name>/` (see [proxmox example](https://rifaterdemsahin.github.io/proxmox/))
- **Keep `index.html` at the repo root** — GitHub Pages requires it at the root for the site to work
- **Two menus required** — Project Menu (always visible, project-specific) + Debug Menu (bottom-right button, shows 7 stages + agent files). See `2_Environment/navigation.md`
- **Active Reflection Routine** — Write a short "retrospective journal" in `6_Semblance/lessons_learned.md` after every milestone (both humans and AI agents must follow this rule).
- **Keep Debug Menu Config Synchronized** — When markdown files are added, modified, or deleted in any stage, remember to update the debug menu configuration (`navigation_config.json` and the fallback arrays in `index.html` and `markdown_renderer.html`) to reflect these changes immediately.
- **Architecture Documentation Sync** — When the system architecture changes, immediately update the architecture overview document at [`2_Environment/architecture.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/architecture.md) (with updated Mermaid diagrams) to keep it working.


## Secrets Management

All agents use **Azure Key Vault** for secrets:

- **Why:** Enterprise-grade security (FIPS 140-2 HSMs, RBAC, audit logs) at low cost (~$0.03/10K operations)
- **How:** Load secrets at runtime via Azure SDK or GitHub Actions `Azure/get-keyvault-secrets`
- **Rule:** Never store secrets in code, config files, or git history

## Agent Coordination

When multiple agents work on the same project:

1. Read the relevant `*.md` persona file before making changes
2. Follow the testing checklist in `7_Testing_Known/README.md`
3. Document any workarounds in `6_Semblance/`
4. Keep `4_Formula/` updated with step-by-step guides for new patterns
