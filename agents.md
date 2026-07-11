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
- **7-Stage Execution Flow** — Every task follows this cycle from start to resolution:
  1. **1_Real_Unknown — Scan & Map**: When receiving a new task, scan the project and map to this stage. Ensure there is a clear objective and that it relates to Key Results (OKRs). Update `problem_statement.md`, `okrs.md`, `hypotheses.md`, and `questions.md` as needed.
  2. **2_Environment — Update Blueprints**: Check if the environment needs updating. Update architectural blueprints (Mermaid diagrams in `architecture.md` or Excalidraw diagrams) — always keep them versioned. Update setup guides and tool documentation here when infrastructure or tooling changes.
  3. **Mention Changes & Get Approvals** — When changes happen in `1_Real_Unknown` or `2_Environment`, mention/discuss the changes and get approvals. These approved changes cascade into updates in `3_Simulation` and `4_Formula` before any code is written.
  4. **3_Simulation — Design New Versions**: Update visual designs and always create new version images. Log image generation prompts in `image_prompts.md`, update `carousel_config.json`. Design artifacts must be current before code enters `5_Symbols`.
  5. **4_Formula — Specs & Approval**: Follow or update the specs in `specs.md`. Document reasoning in `llm_thinking_log.md`. Get approval (specs + designs reviewed) before implementing in `5_Symbols`. This is the mandatory gating stage.
  6. **5_Symbols — Implement**: Place all new source code here (except root files like `index.html`). Only enter this stage after the `4_Formula` gate approves the plan.
  7. **7_Testing_Known — Test & Report**: After implementation, test the functionality and report the outputs. Use validation checklists and test evidence. If issues are found, loop back to `6_Semblance`.
  8. **6_Semblance — Fix & Resolve**: Document all errors, fixes, workarounds, and gap analyses. After testing reveals issues, fix them here and **mention the resolution**. Append to `error.log` and `fix.log`, update statuses, capture lessons learned.
- **Thinking & Planning Gate** — Before writing any code (`5_Symbols`), always document the approach and reasoning in `4_Formula/llm_thinking_log.md`. After execution, append a summary of the LLM reasoning process. `4_Formula` is the mandatory planning stage that encapsulates thinking before action.
- **Specs System** — Technical specifications live in `4_Formula/specs.md`. Before implementing any feature, create or update its spec. When new tasks arrive, check `4_Formula/specs.md` for existing specs that may be affected. If a task changes behavior covered by an active spec, flag it with `[NEEDS UPDATE]` and **warn** before writing code. Specs are validated against code in `5_Symbols`.
- **Design-First Rule** — Before delivering implementation (`5_Symbols`), always create image-based designs in `3_Simulation/` (mockups, wireframes, flow diagrams) and document specs in `4_Formula/`. Design files and spec documents must be updated whenever the feature changes. Design before code — `3_Simulation` + `4_Formula` gate `5_Symbols`.
- **Error & Fix Logging** — When any error occurs, append an entry to `6_Semblance/error.log` (format: `[DATE] [STAGE] [SEVERITY] — Description`). When a fix is applied, append to `6_Semblance/fix.log` (format: `[DATE] [STAGE] [STATUS] — Fix description`) with status `APPLIED`. After validation in `7_Testing_Known`, update the status to `VERIFIED`. Capture learnings in `6_Semblance/lessons_learned.md`.
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
4. **Before writing any code**, document the plan and reasoning in `4_Formula/llm_thinking_log.md` — `4_Formula` is the mandatory thinking & planning gate before `5_Symbols`
