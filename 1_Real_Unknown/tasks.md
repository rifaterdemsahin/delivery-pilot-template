#  Tasks & Phases

> **Stage 1: Real Unknown** — Project phases and task breakdown managed by the **Real Agent**. Each task is assigned to a specific agent. Complex tasks are coordinated by the Real Agent across multiple agents.

## Phase 1: Foundation (Completed)

| ID | Task | Agent | Done |
|----|------|-------|------|
| TSK-001 | Initialize project structure with 7-stage folders | Real Agent | [x] |
| TSK-002 | Create root templates (index.html, markdown_renderer.html, .env.example, robots.txt, sitemap.xml) | Symbols Agent | [x] |
| TSK-003 | Define agent coordinator (agents.md) with 7-stage execution flow | Real Agent | [x] |
| TSK-004 | Configure navigation menus and debug menu | Environment Agent | [x] |

## Phase 2: Environment Setup (Completed)

| ID | Task | Agent | Done |
|----|------|-------|------|
| TSK-005 | Document setup guides (macOS, Windows, AI stack, Azure) | Environment Agent | [x] |
| TSK-006 | Create architecture blueprint (architecture.md with Mermaid diagrams) | Environment Agent | [x] |
| TSK-007 | Document tools (tools.md, toolstack.md, dependencies.md, mcp.md, superskills.md, llm_tools.md) | Environment Agent | [x] |
| TSK-008 | Configure semantic search (Kilo Code local indexing / Qdrant) | Environment Agent | [x] |

## Phase 3: Design & Specs (Completed)

| ID | Task | Agent | Done |
|----|------|-------|------|
| TSK-009 | Create simulation design workflow (design_workflow.md, image_prompts.md, carousel_config.json) | Simulation Agent | [x] |
| TSK-010 | Create specs system (specs.md with SPEC-001 through SPEC-006) | Formula Agent | [x] |
| TSK-011 | Create formula docs (decisions.md, dsl.md, extensions.md, logging_and_autofix.md) | Formula Agent | [x] |

## Phase 4: Skills & Automation (Completed)

| ID | Task | Agent | Coordination | Done |
|----|------|-------|-------------|------|
| TSK-012 | Create on-demand skill files (.kilo/skills/ — 6 skills) | Environment Agent | Real Agent coordinates: defines skill scope → Environment creates files → Formula validates against specs | [x] |
| TSK-013 | Create error-fixing agent with GitHub token integration | Environment Agent | Real Agent coordinates: defines requirements → Environment creates github_agent.md + error-fix skill → Test Agent validates smoke test integration | [x] |
| TSK-014 | Set up stage agents architecture (7 dedicated agents) | Real Agent | **Complex — Real Agent orchestrates all 7 agents**: defines roles → Environment provides tooling → Simulation designs → Formula specs → Symbols implements → Test validates → Semblance logs | [x] |
| TSK-015 | Create smoke test strategy with GitHub Issues integration | Test Agent | Real Agent coordinates: defines test scope → Test Agent creates smoke_tests.md → Environment provides GitHub token docs → Semblance prepares report templates | [x] |

## Phase 5: Code Rules & Standards (Completed)

| ID | Task | Agent | Done |
|----|------|-------|------|
| TSK-016 | Create coding rules (5_Symbols/rules/ — 3 files) | Symbols Agent | [x] |
| TSK-017 | Document risk register (risks.md) | Real Agent | [x] |
| TSK-018 | Document stage dependency chain (SPEC-006) | Formula Agent | [x] |

## Phase 6: Implementation (In Progress)

| ID | Task | Agent | Coordination | Done |
|----|------|-------|-------------|------|
| TSK-019 | Implement frontend debug log panel (footer debug feature) | Symbols Agent | Real Agent coordinates: Formula provides spec → Symbols implements in index.html → Test Agent runs smoke tests | [ ] |
| TSK-020 | Implement backend Axiom logging for Fly.io services | Symbols Agent | Real Agent coordinates: Environment provides Axiom setup → Formula specs the log shape → Symbols implements → Test validates | [ ] |
| TSK-021 | Create GitHub Actions CI/CD workflow | Symbols Agent | [ ] |
| TSK-022 | Implement automated smoke tests in CI | Test Agent | Real Agent coordinates: Test Agent defines tests → Environment provides CI config → Symbols implements in .github/workflows | [ ] |

## Phase 7: Testing & Deployment (Pending)

| ID | Task | Agent | Coordination | Done |
|----|------|-------|-------------|------|
| TSK-023 | Run full smoke test suite on all pages | Test Agent | Real Agent coordinates: opens all pages → Test Agent scans for errors → Semblance logs findings → reports back to Real Agent | [ ] |
| TSK-024 | Validate all 7-stage navigation and rendering | Test Agent | [ ] |
| TSK-025 | Deploy to GitHub Pages and verify | Symbols Agent | Real Agent coordinates: Symbols pushes → Test Agent runs smoke tests → Semblance reports → Real Agent verifies OKRs met | [ ] |
| TSK-026 | Publish retrospective in 6_Semblance/lessons_learned.md | Semblance Agent | Real Agent coordinates: gathers lessons from all agents → Semblance compiles → feeds back to Real Agent for next cycle | [ ] |

## Task Management Rules

1. **Real Agent owns this file** — breaks the project into phases and tasks, assigns agents, coordinates complex tasks
2. **Every task names its agent** — the Agent column identifies which stage agent is responsible for execution
3. **Complex tasks describe coordination** — tasks involving 2+ agents include a Coordination column explaining how the Real Agent orchestrates the workflow
4. **Status tracking**: `[ ]` Pending, `[x]` Completed, `[~]` In Progress, `[!]` Blocked
5. **Link to specs** — tasks that implement a spec should reference the SPEC-XXX number
6. **Task granularity** — a task should be completable in a single coding session
7. **Real Agent as coordinator** — for complex tasks, the Real Agent defines the scope, dispatches to agents, and validates the result against OKRs
