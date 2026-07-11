# Agents — Coordinator

`agents.md` is the **coordinator** — the single source of truth for all agent rules, workflows, and the 7-stage execution flow. It stays constant regardless of which LLM you use. Individual agent persona files are **LLM-specific** and generated/updated whenever you switch models.

## Supported Agents

`agents.md` delegates to LLM-specific persona files. Each persona file inherits all coordinator rules and adds model-specific capabilities:

| Agent | File | Model Context |
|-------|------|---------------|
| Claude | `claude.md` | Anthropic Claude — skills, API integrations, MCP servers |
| Gemini | `gemini.md` | Google Gemini — multimodal analysis, image tasks |
| GitHub Copilot | `copilot.md` | GitHub Copilot — GitHub-native integrations, Actions |
| Kilo Code | `kilocode.md` | Kilo Code (model-agnostic) — precision code generation |

### Switching LLMs — Generating Persona Files

You constantly change the large language models you use. The code updates to match their standards. When switching:

- **Switching to DeepSeek?** → Generate `deepseek.md` with DeepSeek-specific capabilities
- **Switching to GPT?** → Generate `gpt.md` with OpenAI-specific instructions
- **Switching back to Claude?** → Update `claude.md` to match current project state

**How to generate a new persona file:**
1. Tell the agent which LLM you're now using (e.g., "I'm using DeepSeek now")
2. The agent reads `agents.md` (coordinator) and generates `<llm>.md` inheriting all 7-stage rules
3. Add the new file to `navigation_config.json` debug menu and HTML fallback arrays
4. Register in the Supported Agents table above
5. Commit and push both `agents.md` (updated table) and the new `<llm>.md`

## Stage Agents — One Agent Per Folder

Each of the 7 stages has a **dedicated agent** that owns its folder, focuses on its stage's purpose, and communicates with other agents through `4_Formula/llm_thinking_log.md`.

| Agent | Folder | Role | Receives From | Delivers To |
|-------|--------|------|---------------|-------------|
| **Real Agent** | `1_Real_Unknown/` | Scan incoming tasks, map to objectives and key results (OKRs). Defines what needs to be done and why. Evolves responsibility by going over the current status quo, updating `risks.md` with new risks, and applying necessary mitigations. | User tasks | Environment Agent |
| **Environment Agent** | `2_Environment/` | Provides architectural requirements, tools, blueprints, and dependencies needed to reach the objectives. Keeps blueprints versioned (Mermaid/Excalidraw). Manages semantic search (Kilo Code local indexing / Qdrant) and reports its operational status so agents can use it for efficient context retrieval instead of loading full context into memory. | Real Agent | Simulation Agent, Formula Agent |
| **Simulation Agent** | `3_Simulation/` | Understands requirements and changes from upstream. Creates visual designs, mockups, and flow diagrams with versioning. Always creates new version images. | Environment Agent | Formula Agent |
| **Formula Agent** | `4_Formula/` | Creates specs from requirements and simulations. Versions specs. Documents reasoning in `llm_thinking_log.md`. Gates entry to code. | Environment Agent, Simulation Agent | Symbols Agent, all agents (via thinking log) |
| **Symbols Agent** | `5_Symbols/` | Writes code based on Real, Environment, and Formula agents' outputs. Follows coding rules in `5_Symbols/rules/`. | Real Agent, Environment Agent, Formula Agent | Test Agent |
| **Test Agent** | `7_Testing_Known/` | Tests the codebase against objectives. Runs smoke tests and code reviews. Documents errors and test outputs. | Symbols Agent | Semblance Agent |
| **Semblance Agent** | `6_Semblance/` | Works with Test Agent to document and resolve errors. Captures lessons learned and feeds them back to Real Agent to close the loop. | Test Agent | Real Agent |

### Agent Communication

All agents talk to each other through `4_Formula/llm_thinking_log.md`. Each agent writes its reasoning, decisions, and outputs there. Each agent reads the logs of upstream agents to understand the context before acting.

```
User Task
    │
    ▼
Real Agent ──────► llm_thinking_log.md
    │
    ▼
Environment Agent ► llm_thinking_log.md
    │
    ▼
Simulation Agent ► llm_thinking_log.md
    │
    ▼
Formula Agent ───► llm_thinking_log.md  ◄── Specs + Approval Gate
    │
    ▼
Symbols Agent ───► llm_thinking_log.md
    │
    ▼
Test Agent ──────► llm_thinking_log.md
    │
    ▼
Semblance Agent ─► llm_thinking_log.md  ──► (feedback loop to Real Agent)
```

### Agent Rules Summary

| Agent | Read From | Write To | Key Files |
|-------|----------|----------|-----------|
| Real Agent | User input | `problem_statement.md`, `okrs.md`, `questions.md`, `hypotheses.md` | `risks.md` — evolves status quo, updates risks, applies mitigations |
| Environment Agent | Real Agent output | `architecture.md`, `tools.md`, `toolstack.md`, `dependencies.md`, `mcp.md`, `superskills.md` | All `2_Environment/*.md` | Manages semantic search and reports operational status |
| Simulation Agent | Environment Agent output | `image_prompts.md`, `carousel_config.json`, `design_workflow.md` | All `3_Simulation/*` |
| Formula Agent | Environment + Simulation output | `specs.md`, `decisions.md`, `dsl.md`, `extensions.md` | `llm_thinking_log.md` |
| Symbols Agent | Real + Environment + Formula output | Source code, Docker configs, CI/CD workflows | `5_Symbols/rules/` |
| Test Agent | Symbols Agent output | `smoke_tests.md`, `validation_report.md`, conducts code reviews | `smoke_test_report.md` |
| Semblance Agent | Test Agent output | `error.log`, `fix.log`, `lessons_learned.md`, `smoke_test_report.md` | Feedback to Real Agent |

## Agent Rules

- Always follow the 7-stage folder structure (`1_Real_Unknown` through `7_Testing_Known`)
- **LLM Model Switching** — The coordinator (`agents.md`) stays constant while persona files are generated per LLM. When you switch models (Claude → DeepSeek → GPT → etc.), a matching `<llm>.md` file is generated that inherits all coordinator rules. The agent currently in use always reads its own persona file plus `agents.md` as the universal coordinator.
- Never commit secrets — use Azure Key Vault for all sensitive values
- **After every command, commit and push** — do not batch changes; each step gets its own commit. When done with the entire task, ensure all changes are committed and pushed. If any git errors occur (e.g., conflicts, locked index, push rejected), the agent must proactively troubleshoot, resolve the issue, and successfully complete the commit and push.
- **7-Stage Execution Flow** — Every task follows this cycle from start to resolution:
  1. **1_Real_Unknown — Scan & Map**: When receiving a new task, scan the project and map to this stage. Ensure there is a clear objective and that it relates to Key Results (OKRs). Update `problem_statement.md`, `okrs.md`, `hypotheses.md`, and `questions.md` as needed. Evolve responsibility by going over the current status quo, updating `risks.md` with new risks, and applying necessary mitigations. → **Real Agent**
  2. **2_Environment — Update Blueprints**: Check if the environment needs updating. Update architectural blueprints (Mermaid diagrams in `architecture.md` or Excalidraw diagrams) — always keep them versioned. Update setup guides and tool documentation here when infrastructure or tooling changes. Manage semantic search (Kilo Code local indexing for small projects, Qdrant for big repos) and report its operational status. → **Environment Agent**
  3. **Mention Changes & Get Approvals** — When changes happen in `1_Real_Unknown` or `2_Environment`, mention/discuss the changes and get approvals. These approved changes cascade into updates in `3_Simulation` and `4_Formula` before any code is written.
  4. **3_Simulation — Design New Versions**: Update visual designs and always create new version images. Log image generation prompts in `image_prompts.md`, update `carousel_config.json`. Design artifacts must be current before code enters `5_Symbols`. → **Simulation Agent**
  5. **4_Formula — Specs & Approval**: Follow or update the specs in `specs.md`. Document reasoning in `llm_thinking_log.md`. Get approval (specs + designs reviewed) before implementing in `5_Symbols`. This is the mandatory gating stage. → **Formula Agent**
  6. **5_Symbols — Implement**: Place all new source code here (except root files like `index.html`). Only enter this stage after the `4_Formula` gate approves the plan. Follow coding rules defined in `5_Symbols/rules/`. → **Symbols Agent**
  7. **7_Testing_Known — Test & Report**: After implementation, test the functionality and report the outputs. **Run smoke tests** that open pages, check for errors, and report failures to GitHub Issues. **Conduct code reviews** on the implementation. Use validation checklists and test evidence. If issues are found, create a GitHub Issue and loop back to `6_Semblance`. → **Test Agent**
  8. **6_Semblance — Fix & Resolve**: Document all errors, fixes, workarounds, and gap analyses. After testing reveals issues, fix them here and **mention the resolution**. Append to `error.log` and `fix.log`, update statuses, capture lessons learned. Resolve the corresponding GitHub Issues and publish a smoke test report to `6_Semblance/smoke_test_report.md`. → **Semblance Agent**
- **Thinking & Planning Gate** — Before writing any code (`5_Symbols`), always document the approach and reasoning in `4_Formula/llm_thinking_log.md`. After execution, append a summary of the LLM reasoning process. `4_Formula` is the mandatory planning stage that encapsulates thinking before action.
- **Specs System** — Technical specifications live in `4_Formula/specs.md`. Before implementing any feature, create or update its spec. When new tasks arrive, check `4_Formula/specs.md` for existing specs that may be affected. If a task changes behavior covered by an active spec, flag it with `[NEEDS UPDATE]` and **warn** before writing code. Specs are validated against code in `5_Symbols`.
- **Design-First Rule** — Before delivering implementation (`5_Symbols`), always create image-based designs in `3_Simulation/` (mockups, wireframes, flow diagrams) and document specs in `4_Formula/`. Design files and spec documents must be updated whenever the feature changes. Design before code — `3_Simulation` + `4_Formula` gate `5_Symbols`.
- **Error & Fix Logging** — When any error occurs, append an entry to `6_Semblance/error.log` (format: `[DATE] [STAGE] [SEVERITY] — Description`). When a fix is applied, append to `6_Semblance/fix.log` (format: `[DATE] [STAGE] [STATUS] — Fix description`) with status `APPLIED`. After validation in `7_Testing_Known`, update the status to `VERIFIED`. Capture learnings in `6_Semblance/lessons_learned.md`.
- **Smoke Tests & GitHub Issues** — After every implementation, run smoke tests that open pages and check for errors. Report every failure as a GitHub Issue. Resolve the issue and publish a smoke test report to `6_Semblance/smoke_test_report.md`. Smoke tests gate deployment — do not deploy if any smoke test fails.
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
