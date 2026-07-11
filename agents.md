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

### Plug & Play — Model Resilience Without Breaking Changes

The delivery pilot framework is designed as a **plug-and-play system** that removes dependency on any specific LLM operator. Switching between models (DeepSeek → Claude → GPT → Gemini) should never result in breaking changes because:

- **Specs hold their ground** — `4_Formula/specs.md` defines what must be built, validated, and considered. Specs stay constant regardless of which LLM reads them. A less capable model can still follow the spec even if it can't generate one from scratch.
- **Documents reference each other** — Every stage document links to upstream and downstream dependencies. The thinking log records why decisions were made. Cross-references between `1_Real_Unknown` → `2_Environment` → `3_Simulation` → `4_Formula` → `5_Symbols` → `7_Testing_Known` → `6_Semblance` create a knowledge chain that less capable LLMs can follow step-by-step.
- **Framework provides consistency and memory** — The 7-stage structure, coding rules in `5_Symbols/rules/`, tool governance in `2_Environment/llm_tools.md`, and risk register in `1_Real_Unknown/risks.md` ensure that even if the operator changes, the project state is fully documented and recoverable.
- **Thinking log as institutional knowledge** — `4_Formula/llm_thinking_log.md` carries every reasoning step, trade-off, and decision. A new LLM can read the log to understand the project history without needing to recompute everything.

> When you switch from a powerful model to a less capable one, the framework doesn't break — it supports. The docs are the bridge.

## Stage Agents — One Agent Per Folder

Each of the 7 stages has a **dedicated agent** that owns its folder, focuses on its stage's purpose, and communicates with other agents through `4_Formula/llm_thinking_log.md`.

| Agent | Folder | Role | Receives From | Delivers To |
|-------|--------|------|---------------|-------------|
| **Real Agent** | `1_Real_Unknown/` | Receives and understands incoming tasks, then runs through the other agents as a coordinator. Maps tasks to objectives and key results (OKRs). Defines what needs to be done and why. Divides the project into phases and tasks, and manages `tasks.md`. Keeps track of todos — adds them to the list, marks them as in progress, and closes them when complete. Evolves responsibility by going over the current status quo, updating `risks.md` with new risks, and applying necessary mitigations. | User tasks | Environment Agent |
| **Environment Agent** | `2_Environment/` | Provides architectural requirements, tools, blueprints, and dependencies needed to reach the objectives. Keeps blueprints versioned (Mermaid/Excalidraw). Manages semantic search (Kilo Code local indexing / Qdrant) and reports its operational status so agents can use it for efficient context retrieval instead of loading full context into memory. Maintains `llm_tools.md` documenting tool rationale and security boundaries for LLM tool usage. Designs and updates pre-tool-use and post-tool-use scenarios for LLM agents. Checks costs for all environments (including LLM costs), compares different models and tools, gives cost-saving suggestions, and records findings in `costs.md`. Manages LLM agent context size and makes decisions on when sub-agents are needed to split work into smaller contexts. Manages data storage strategy — decides when data should move to a database without overloading it, and when blobs should move to an external service like Azure Blob Storage. Records these decisions. Records external tool calls and ensures they are logged for cost, security, and rebuild purposes. | Real Agent | Simulation Agent, Formula Agent |
| **Simulation Agent** | `3_Simulation/` | Understands requirements and changes from upstream. Creates visual designs, mockups, and flow diagrams with versioning. Always creates new version images. | Environment Agent | Formula Agent |
| **Formula Agent** | `4_Formula/` | Creates specs from requirements and simulations. Versions specs. Documents reasoning in `llm_thinking_log.md`. Gates entry to code. | Environment Agent, Simulation Agent | Symbols Agent, all agents (via thinking log) |
| **Symbols Agent** | `5_Symbols/` | Writes code based on Real, Environment, and Formula agents' outputs. Follows coding rules in `5_Symbols/rules/`. Manages filenames and enforces naming conventions across the codebase. | Real Agent, Environment Agent, Formula Agent | Test Agent |
| **Test Agent** | `7_Testing_Known/` | Tests the codebase against objectives. Runs smoke tests and code reviews. Documents errors and test outputs. If errors are found, activates the Semblance Agent as a sub-synthesis partner to resolve them before escalating. | Symbols Agent | Semblance Agent |
| **Semblance Agent** | `6_Semblance/` | Works with Test Agent as a sub-synthesis pair to document and resolve errors completely before handing off to the Real Agent coordinator. Captures lessons learned and feeds resolved outcomes back to Real Agent to close the loop. Treats errors as opportunities — creates sub-agents for existing agents to mitigate recurring issues and prevent future errors. | Test Agent | Real Agent |

### Agent Colors — Terminal Differentiation

Each agent has a distinct color for terminal output so they can be easily differentiated at a glance. Colors are configured in `kilo.json`.

| Agent | Color | Hex |
|-------|-------|-----|
| Real Agent | 🟣 Violet | `#8b5cf6` |
| Environment Agent | 🔵 Cyan | `#06b6d4` |
| Simulation Agent | 🟢 Green | `#10b981` |
| Formula Agent | 🟠 Amber | `#f59e0b` |
| Symbols Agent | 🔴 Red | `#ef4444` |
| Test Agent | 🔷 Blue | `#3b82f6` |
| Semblance Agent | 🩷 Pink | `#ec4899` |

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
| Real Agent | User input | `problem_statement.md`, `okrs.md`, `questions.md`, `hypotheses.md` | `risks.md` — evolves status quo, updates risks, applies mitigations | `tasks.md` — divides project into phases and tasks, tracks todos, marks progress |
| Environment Agent | Real Agent output | `architecture.md`, `tools.md`, `toolstack.md`, `dependencies.md`, `mcp.md`, `superskills.md`, `llm_tools.md` | All `2_Environment/*.md` | Manages semantic search, tracks costs, compares models/tools, designs pre/post tool-use scenarios, manages context size and sub-agent decisions, manages data storage strategy, records external tool calls |
| Simulation Agent | Environment Agent output | `image_prompts.md`, `carousel_config.json`, `design_workflow.md` | All `3_Simulation/*` |
| Formula Agent | Environment + Simulation output | `specs.md`, `decisions.md`, `dsl.md`, `extensions.md` | `llm_thinking_log.md` |
| Symbols Agent | Real + Environment + Formula output | Source code, Docker configs, CI/CD workflows | `5_Symbols/rules/` | Manages filenames and enforces naming conventions |
| Test Agent | Symbols Agent output | `smoke_tests.md`, `validation_report.md`, conducts code reviews | `smoke_test_report.md` |
| Semblance Agent | Test Agent output | `error.log`, `fix.log`, `lessons_learned.md`, `smoke_test_report.md` | Feedback to Real Agent | Creates sub-agents for existing agents to mitigate recurring errors |

### Complex Task Coordination

For tasks that span multiple stages or require multiple agents, the **Real Agent** acts as the coordinator. It defines the scope, dispatches work to the appropriate agents in sequence, and validates the final result against the OKRs.

**Coordination Pattern:**
```
Real Agent (Receives task, defines scope, assigns agents)
    │
    ├─► Environment Agent (Provides tools, blueprints, dependencies)
    │       │
    │       ▼
    ├─► Simulation Agent (Creates visual designs if needed)
    │       │
    │       ▼
    ├─► Formula Agent (Creates/updates specs, gates approval)
    │       │
    │       ▼
    ├─► Symbols Agent (Implements the code)
    │       │
    │       ▼
    ├─► Test Agent (Runs smoke tests, code reviews, validates)
    │       │
    │       ▼
    └─► Semblance Agent (Logs errors, applies fixes, captures lessons)
            │
            ▼
        Feedback → Real Agent (Verifies OKRs met, updates risks.md)
```

**Sub-Synthesis Loop:** When Test Agent finds errors, it activates the **Semblance Agent** as a sub-synthesis partner. They sort out the issue together (Test finds → Semblance fixes → Test re-validates) and resolve it completely before handing the resolved outcome back to the Real Agent. The Real Agent only receives fully resolved issues with documented lessons learned.

**When resolving tasks, mention which agent is involved.** For a simple single-agent task, state: "TSK-XXX — Symbols Agent implements the spec." For complex multi-agent tasks, describe the coordination: "Real Agent coordinates TSK-XXX across Environment (tools), Formula (specs), Symbols (code), and Test (validation)."

### Decision Boundaries

Each agent operates within defined boundaries. Agents must **confirm with the user before crossing into implementation** — ask a confirmation question, state their boundaries, and explain their rationale.

| Agent | Can Decide ✅ | Cannot Decide ❌ |
|-------|-------------|-----------------|
| **Real Agent** | OKR mapping, task breakdown, phase planning, risk identification | Final implementation scope, code changes, tool selection without Environment Agent input |
| **Environment Agent** | Tool recommendations, architecture patterns, dependency versions, blueprint updates, semantic search status | Actual code implementation, spec creation, design decisions |
| **Simulation Agent** | Visual designs, mockup creation, image versioning, design workflows | Spec content, code implementation, tool selection |
| **Formula Agent** | Spec content, decision records, thinking log entries, approval gate | Code implementation, design visuals, tool configuration |
| **Symbols Agent** | Code implementation, Docker configs, CI/CD pipelines, refactoring | Spec changes, design changes, tool stack changes without upstream approval |
| **Test Agent** | Smoke test runs, code review findings, validation reports, bug reports | Code fixes (reports to Semblance Agent), spec changes, design changes |
| **Semblance Agent** | Error logging, fix application (after Test Agent confirmation), lessons learned, retrospective journals | New feature code, spec changes, design changes |

### Confirmation Before Implementation

Before any agent implements a change (especially `5_Symbols` code), it must ask the user a confirmation question using this format:

```
## 🤔 Confirmation Required — [Agent Name] [Task]

### 📋 What I Understand
[Restate the task in my own words to confirm understanding]

### 🚧 My Boundaries
✅ **I can:** [list what I can do within my agent scope]
❌ **I cannot:** [list what is outside my scope, who should handle it]

### 💭 My Rationale
[Explain the reasoning: why this approach, what trade-offs considered, what upstream agents decided]

### 🎯 Implementation Plan
[Bullet points of what I will do, grouped by concern]

---

**Proceed with this plan?** (Yes / No / Adjust — describe changes needed)
```



## Agent Rules

- Always follow the 7-stage folder structure (`1_Real_Unknown` through `7_Testing_Known`)
- **Continuous Evolution** — Every LLM response is an opportunity to update and iterate on the project. The delivery pilot framework places each output in its related stage folder and evolves with the outputs. Nothing is throwaway — every reasoning log, error fix, spec update, and design iteration is stored in its stage and makes the project smarter over time.
- **LLM Model Switching** — The coordinator (`agents.md`) stays constant while persona files are generated per LLM. When you switch models (Claude → DeepSeek → GPT → etc.), a matching `<llm>.md` file is generated that inherits all coordinator rules. The agent currently in use always reads its own persona file plus `agents.md` as the universal coordinator.
- Never commit secrets — use Azure Key Vault for all sensitive values
- **After every command, commit and push** — do not batch changes; each step gets its own commit. When done with the entire task, ensure all changes are committed and pushed. If any git errors occur (e.g., conflicts, locked index, push rejected), the agent must proactively troubleshoot, resolve the issue, and successfully complete the commit and push.
- **Confirmation Before Implementation** — Before any agent implements a change (especially `5_Symbols` code), it must ask the user a confirmation question. State the agent's boundaries (see Decision Boundaries table), explain the rationale, and group the implementation plan into clear sections. Use emojis for scannability. Do not proceed until the user confirms.
- **Task Resolution** — When resolving a task, always mention which agent is involved. For single-agent tasks: "TSK-XXX — [Agent Name] handles [what]." For complex tasks spanning multiple agents: "Real Agent coordinates TSK-XXX across [Agent A] ([role]), [Agent B] ([role]), [Agent C] ([role])." The Real Agent validates the final result against OKRs.
- **Sub-Agent Generation** — Each top agent (Real, Environment, Simulation, Formula, Symbols, Test, Semblance) is responsible for creating sub-agents when their requirements demand specialized work. When receiving a task, ask whether a sub-agent is needed. Before generating a sub-agent: (1) get user confirmation, (2) create a spec defining the sub-agent's scope, boundaries, and deliverables. Sub-agents complete their assigned work and report back to the parent agent. Parent agents validate sub-agent output before integrating it.
- **7-Stage Execution Flow** — Every task follows this cycle from start to resolution:
  1. **1_Real_Unknown — Scan & Map**: When receiving a new task, scan the project and map to this stage. Ensure there is a clear objective and that it relates to Key Results (OKRs). Update `problem_statement.md`, `okrs.md`, `hypotheses.md`, and `questions.md` as needed. Divide the project into phases and tasks, and manage `tasks.md`. Keep track of todos — add them to the list, mark them as in progress, and close them when complete. Evolve responsibility by going over the current status quo, updating `risks.md` with new risks, and applying necessary mitigations. → **Real Agent** (coordinator — receives tasks and runs through the other agents)
  2. **2_Environment — Update Blueprints**: Check if the environment needs updating. Update architectural blueprints (Mermaid diagrams in `architecture.md` or Excalidraw diagrams) — always keep them versioned. Update setup guides and tool documentation here when infrastructure or tooling changes. Manage semantic search (Kilo Code local indexing for small projects, Qdrant for big repos) and report its operational status. Maintain `llm_tools.md` with tool rationale, security boundaries, and pre/post-tool-use scenarios for LLM agents. Manage LLM agent context size and decide when sub-agents are needed to split work into smaller contexts. Manage data storage strategy — decide when data should move to a database without overloading it, and when blobs should move to an external service like Azure Blob Storage. Record these decisions. Record external tool calls and ensure they are logged for cost, security, and rebuild purposes. Check costs (including LLM costs), compare models and tools, and record suggestions in `costs.md`. → **Environment Agent**
  3. **Mention Changes & Get Approvals** — When changes happen in `1_Real_Unknown` or `2_Environment`, mention/discuss the changes and get approvals. These approved changes cascade into updates in `3_Simulation` and `4_Formula` before any code is written.
  4. **3_Simulation — Design New Versions**: Update visual designs and always create new version images. Log image generation prompts in `image_prompts.md`, update `carousel_config.json`. Design artifacts must be current before code enters `5_Symbols`. → **Simulation Agent**
  5. **4_Formula — Specs & Approval**: Follow or update the specs in `specs.md`. Document reasoning in `llm_thinking_log.md`. Get approval (specs + designs reviewed) before implementing in `5_Symbols`. This is the mandatory gating stage. → **Formula Agent**
  6. **5_Symbols — Implement**: Place all new source code here (except root files like `index.html`). Only enter this stage after the `4_Formula` gate approves the plan. Follow coding rules defined in `5_Symbols/rules/`. Manage filenames and enforce naming conventions across the codebase. → **Symbols Agent**
  7. **7_Testing_Known — Test & Report**: After implementation, test the functionality and report the outputs. **Run smoke tests** that open pages, check for errors, and report failures to GitHub Issues. **Conduct code reviews** on the implementation. Use validation checklists and test evidence. If issues are found, create a GitHub Issue and loop back to `6_Semblance`. → **Test Agent**
  8. **6_Semblance — Fix & Resolve**: Document all errors, fixes, workarounds, and gap analyses. After testing reveals issues, fix them here and **mention the resolution**. Append to `error.log` and `fix.log`, update statuses, capture lessons learned. Resolve the corresponding GitHub Issues and publish a smoke test report to `6_Semblance/smoke_test_report.md`. Only hand off to the Real Agent when the issue is fully resolved. Treat errors as opportunities — create sub-agents for existing agents to mitigate recurring issues. → **Semblance Agent** (sub-synthesis with Test Agent)
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
