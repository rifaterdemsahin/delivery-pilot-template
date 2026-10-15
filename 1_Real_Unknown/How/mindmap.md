# 🧠 Mindmap & Architectural File Lineage — Real Unknown (How)

> **Stage 1: Real Unknown / How** — Comprehensive mindmap visualizing how all files connect across the 7-stage self-learning framework, including dependency lineage and architectural rationale.

---

## 🗺️ Framework Lineage Mindmap

```mermaid
flowchart TD
    subgraph S1["1️⃣ Real Unknown (Why / What / How)"]
        direction TB
        S1_WHY["🎯 Why: Why/problem_statement.md<br/>Why/requirements.md<br/>Why/hypotheses.md · Why/questions.md"]
        S1_WHAT["📦 What: What/okrs.md<br/>What/tasks.md · What/todos.md<br/>What/prompts.md"]
        S1_HOW["⚙️ How: How/kanban.md · How/costs.md<br/>How/risks.md · How/sanity_check_report.md<br/>How/mindmap.md · How/patterns.md · How/ai_harness.md"]
        S1_WHY --> S1_WHAT --> S1_HOW
    end

    subgraph S2["2️⃣ Environment (When & Where Context)"]
        direction TB
        S2_WHEN["⏰ When: When/architecture.md<br/>When/product_rules.md · When/tools.md<br/>When/toolstack.md · When/dependencies.md<br/>When/setup_ai.md · When/llm_tools.md<br/>When/navigation.md · When/extensions.md"]
        S2_WHERE["🌐 Where: Where/github_pages.md<br/>Where/cloudflare_workers.md · Where/fly_io.md<br/>Where/supabase.md · Where/axiom.md<br/>Where/setup_azure.md · Where/local_server.md<br/>Where/setup_mac.md · Where/setup_windows.md"]
        S2_WHEN <--> S2_WHERE
    end

    subgraph S3["3️⃣ Simulation (Vision & Wireframes)"]
        S3_EXC["✏️ Excalidraw Wireframes (.excalidraw, .svg, .png)"]
        S3_FLOW["🎨 design_workflow.md · image_prompts.md"]
        S3_CAR["🎠 carousel_config.json"]
        S3_EXC --> S3_FLOW --> S3_CAR
    end

    subgraph S4["4️⃣ Formula (Thinking, Specs & Approval Gate)"]
        S4_SPECS["📋 specs.md (SPEC-001 through SPEC-017)"]
        S4_LOG["🧠 llm_thinking_log.md"]
        S4_ADR["🤔 decisions.md · dsl.md · harness.md"]
        S4_SPECS --- S4_LOG --- S4_ADR
    end

    subgraph S5["5️⃣ Symbols (Implementation & Code)"]
        S5_PROJ["🚀 project/ (Application & Product Source Code)"]
        S5_DP["🎛️ deliverypilot/ (markdown_renderer.html · artifacts_carousel.html · master_review/)"]
        S5_RULES["📜 rules/ (Operating Rules, Standards, Git Conventions)"]
        S5_BOX["🧰 toolbox/ (smoke_test.py, nav_sync.py, gen_repo_files.py)"]
        S5_UI["📅 calendar_view.html (Project Page)"]
    end

    subgraph S7["7️⃣ Testing Known (Proof & Validation)"]
        S7_SMOKE["🧪 smoke_tests.md · validation_report.md"]
        S7_LOGIC["🧩 logic.md · harness_golden_report.md"]
    end

    subgraph S6["6️⃣ Semblance (Feedback Loop & Error Resolution)"]
        S6_LOGS["❌ error_log.md · fix.log"]
        S6_LEARN["📚 lessons_learned.md · gap_analysis.md"]
        S6_REPORT["📊 smoke_test_report.md"]
    end

    %% Cross-Stage Flow & Feedback Loops
    S1 ==> S2
    S1 -. "Direct Requirement Sync (SPEC-016)" .-> S3_EXC
    S2 ==> S3
    S3 ==> S4
    S4 ==>|Gating Approval Gate| S5
    S5 ==> S7
    S7 ==> S6
    S6 ==>|Resolutions & Lessons Feed Back| S1_HOW
    S6 -. "Risk Mitigations" .-> S1
```

---

## 🔗 File Connection Matrix & Rationale

| Stage & Category | Primary Files | Upstream Inputs (Feeds From) | Downstream Deliverables (Feeds To) | Architectural Rationale |
|---|---|---|---|---|
| **1️⃣ Real Unknown: Why** | `Why/problem_statement.md`<br/>`Why/requirements.md`<br/>`Why/hypotheses.md`<br/>`Why/questions.md` | Customer pain, user prompts, market gaps | `1_Real_Unknown/What/okrs.md`<br/>`3_Simulation/` (Wireframes)<br/>`4_Formula/specs.md` | Grounds the entire project in actual need. Prevents building solutions for unverified or ill-defined problems. |
| **1️⃣ Real Unknown: What** | `What/okrs.md`<br/>`What/tasks.md`<br/>`What/todos.md`<br/>`What/prompts.md` | Problem statements & functional requirements | `1_Real_Unknown/How/kanban.md`<br/>All stage agents | Quantifies success metrics and organizes tasks into multi-agent coordinated phases. Logs all input prompts for complete auditability. |
| **1️⃣ Real Unknown: How** | `How/kanban.md`<br/>`How/costs.md`<br/>`How/risks.md`<br/>`How/sanity_check_report.md`<br/>`How/mindmap.md`<br/>`How/patterns.md`<br/>`How/ai_harness.md` | Phase tracking, cloud spend, error feedback | `2_Environment/architecture.md`<br/>Real Agent Coordinator | Tracks workflow velocity, monitors resource spend, registers active/mitigated risks, and documents structural lineage, architectural patterns & AI harness triad. |
| **2️⃣ Environment** | `When/` (architecture, tools, extensions)<br/>`Where/` (fly_io, cloudflare, azure, local) | `1_Real_Unknown/` requirements & constraints | `3_Simulation/`<br/>`4_Formula/`<br/>Developer environment | Establishes infrastructure, toolstack rationale, IDE extensions (Excalidraw, Mermaid, Markdown Preview), and zero-secret Azure Key Vault policies partitioned across temporal When rules and spatial Where environments. |
| **3️⃣ Simulation** | `feature_wireframe.excalidraw`<br/>`design_workflow.md`<br/>`carousel_config.json` | `1_Real_Unknown` problems & OKRs | `4_Formula/specs.md` (SPEC-016 Gate)<br/>`index.html` carousel | "Make the invisible visible before writing code". Excalidraw wireframes translate problems into visual workflows, keeping design and specs in strict sync. |
| **4️⃣ Formula** | `specs.md`<br/>`decisions.md`<br/>`llm_thinking_log.md`<br/>`harness.md` | `3_Simulation/` wireframes & `2_Environment/` tools | `5_Symbols/` implementation gate | Mandatory thinking & planning gate. Specs define behavior before coding, and post-delivery formulation ensures specifications reflect reality (RULE-001). |
| **5️⃣ Symbols: project/** | Application source code, APIs, backend services | `4_Formula/specs.md`<br/>`5_Symbols/rules/` | `7_Testing_Known/` | Houses product-specific implementation, cleanly decoupled from the underlying delivery-pilot framework. |
| **5️⃣ Symbols: deliverypilot/** | `master_review/`<br/>(app.js, styles.css, index.html, repo_files.json) | Framework tooling requirements | Project auditing & Azure feedback | Provides an in-browser inspection carousel across all files with isolated per-project Azure Blob Storage containers (SPEC-017). |
| **5️⃣ Symbols: rules & toolbox** | `rules/agent_operating_rules.md`<br/>`toolbox/smoke_test.py`<br/>`toolbox/nav_sync.py` | Framework standing orders | All agents & CI/CD pipeline | Enforces RULE-001 (spec what you did), RULE-002 (commit & push), automated 3-way navigation synchronization, and root layout integrity. |
| **7️⃣ Testing Known** | `smoke_tests.md`<br/>`validation_report.md`<br/>`logic.md` | `5_Symbols/` code outputs | `6_Semblance/` | Runs smoke suites, tests hypotheses from Stage 1, evaluates premise-to-conclusion chains, and verifies local/deployed environments. |
| **6️⃣ Semblance** | `error_log.md`<br/>`fix.log`<br/>`lessons_learned.md`<br/>`smoke_test_report.md` | Failures detected in `7_Testing_Known` | Feedback loop back to `1_Real_Unknown/risks.md` | Resolves errors completely via test/fix synthesis before handoff. Lessons learned and resolved mitigations feed directly back into Stage 1 to evolve the system. |

---

## 🎯 Key Architectural Principles Demonstrated

1. **Why ➔ How ➔ What Golden Circle Split (`1_Real_Unknown/`)**:
   Separates *why* we build (problems/hypotheses) from *how* we govern (risks/costs/mindmaps) and *what* we deliver (OKRs/tasks/todos).
2. **Design-First Excalidraw Synchronization (`SPEC-016`)**:
   Excalidraw wireframes in `3_Simulation/` bridge the gap between `1_Real_Unknown/` and `4_Formula/specs.md`, ensuring code is never implemented from obsolete visual assumptions.
3. **Subfolder Decoupling in `5_Symbols/`**:
   `project/` contains consumer application code, while `deliverypilot/` houses framework-level review suites and tooling, eliminating cross-contamination.
4. **Closed-Loop Feedback**:
   Errors logged in `6_Semblance/` are resolved and fed back to `1_Real_Unknown/risks.md` and `tasks.md`, turning failures into institutional memory.
