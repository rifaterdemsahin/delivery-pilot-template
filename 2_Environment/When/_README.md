# ⏰ Environment — When (Lifecycles, Triggers & Tool Governance)

> **Stage 2: Environment / When** — Documents temporal execution boundaries, operational triggers, architectural lifecycles, and tool governance rules defining **when** decisions, workflows, and tools are activated.

---

## 🎯 Purpose & Scope

The `When/` subfolder answers the operational question: **When do tools, rules, and architecture take effect?**
It acts as the temporal coordination layer of the Environment stage, defining:
1. **When architecture applies**: How blueprints govern components across the delivery lifecycle.
2. **When tools are used**: Pre-tool and post-tool usage policies for autonomous AI agents.
3. **When skills activate**: How MCP servers and superskills hook into execution contexts.
4. **When rules are enforced**: Mandatory product rules, code conventions, and navigation sync gates.

---

## 📂 Document Catalog

| File | Focus | Temporal Boundary / Trigger |
|------|-------|------------------------------|
| [`architecture.md`](architecture.md) | System Architecture & Blueprints | When mapping system relationships, components, and dataflow blueprints |
| [`product_rules.md`](product_rules.md) | Mandatory Product Rules | When building pages, menus, calendars, and end-user features |
| [`tools.md`](tools.md) | Tools Overview & Selection | When selecting tooling to meet project objectives |
| [`toolstack.md`](toolstack.md) | Full Toolstack & Decision Rationale | When evaluating why a tool was chosen and tracking stack evolution |
| [`dependencies.md`](dependencies.md) | Dependencies & Package Cross-Matrix | When upgrading, installing, or resolving library version conflicts |
| [`setup_ai.md`](setup_ai.md) | AI Stack Architecture | When choosing between local Kilo nomic embeddings vs Qdrant vector search |
| [`github_agent.md`](github_agent.md) | Automated GitHub Repair Agent | When smoke tests fail or nightly auto-repair cycles trigger |
| [`mcp.md`](mcp.md) | Model Context Protocol Servers | When AI agents request live tool connections and data context |
| [`superskills.md`](superskills.md) | Superskills Catalog | When agent workflows require specialized multi-step skill routines |
| [`llm_tools.md`](llm_tools.md) | LLM Tool Governance | When agents prepare pre-tool and post-tool execution boundaries |
| [`navigation.md`](navigation.md) | Navigation Architecture | When compiling the two-menu system and handling fallback states |
| [`extensions.md`](extensions.md) | Authoring & Editor Extensions | When configuring IDEs for Excalidraw, Mermaid, and Markdown authoring |

---

## 🔗 Lineage & Connections

- **Upstream**: [`../../1_Real_Unknown/Why/_README.md`](../../1_Real_Unknown/Why/_README.md) (Problem & Requirements) and [`../../1_Real_Unknown/What/_README.md`](../../1_Real_Unknown/What/_README.md) (OKRs & Tasks).
- **Parallel**: [`../Where/_README.md`](../Where/_README.md) (Spatial platforms, hosting targets, and workstation setup).
- **Downstream**: [`../../3_Simulation/_README.md`](../../3_Simulation/_README.md) (Visual designs & wireframes) and [`../../4_Formula/specs.md`](../../4_Formula/specs.md) (Technical specifications).
