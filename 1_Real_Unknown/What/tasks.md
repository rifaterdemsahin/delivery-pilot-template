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
| TSK-027 | Add agent operating rules (spec what you did into Formula + commit/push) | Symbols Agent | Real Agent coordinates: Formula specs (SPEC-011) → Symbols writes `agent_operating_rules.md` → coordinator/personas point at it | [x] |
| TSK-028 | RULE-003/004: Fly.io vs Workers deploy, Key Vault creds, Azure project storage | Symbols Agent | Real Agent coordinates: Formula SPEC-012 → Symbols rules → Environment architecture/tools | [x] |
| TSK-029 | RULE-005: allowed root folders; move extras into related stage/skill/workflow dirs | Symbols Agent | Real Agent coordinates: Formula SPEC-013 → Symbols rules + file_organization | [x] |
| TSK-030 | Update README Refactor/Init prompts; apply RULE-005 (move kilo.json); smoke root-layout check | Formula Agent | Real Agent coordinates: Formula prompts+specs → Symbols smoke_test.py → Test validates | [x] |
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

## Phase 8: AI Harness — Bot-Driven Development (Slice 1: contract)

> Slice 1 is **contract only** — SPEC-014 + `4_Formula/harness.md` + ADR-002. No new runtime. Slices 2–3 (harness skill, golden-task proof, `bot-ready` issues) follow after this contract is reviewed.

| ID | Task | Agent | Coordination | Done |
|----|------|-------|-------------|------|
| TSK-031 | SPEC-014 + harness runbook + ADR-002 (interactive vs bot split) | Formula Agent | Real Agent coordinates: Formula specs the packet/loop/stops → all agents review against their stage | [x] |
| TSK-035 | Harness skill + packet validator + Slice-2 dry-run report (SPEC-015) | Formula Agent | Real Agent coordinates: Formula specs → Symbols writes skill + validator → Test dry-runs 3 fixtures + smoke gate | [x] |
| TSK-032 | Golden task 1: fix a broken menu link (verifier red → green) | Test Agent | Ran live on `bot/TSK-032` → PR #3 merged (red 10/11 → green 11/11, landed harness.yml guard) | [x] |
| TSK-033 | Golden task 2: add a markdown page + run nav-sync (appears in all 3 debug-menu sources) | Symbols Agent | Ran live on `bot/TSK-033` → PR #4 merged (red 10/11 → green 11/11, 73 entries) | [x] |
| TSK-034 | Golden task 3: refuse a secret commit (bot refuses + logs `[PENDING]`) | Semblance Agent | Proven live: validator REFUSE exit 1, tree untouched — refusal needs no branch by design; evidence in golden report | [x] |
| TSK-036 | Excalidraw wireframes in 3_Simulation synced with 1_Real_Unknown & gated in 4_Formula (SPEC-016) | Real Agent | Real Agent coordinates: Simulation defines Excalidraw wireframe workflow → Formula specs sync & gating rule → Test validates | [x] |
| TSK-037 | Root LICENSE file (MIT) & ALLOWED_ROOT_FILES update (SPEC-013) | Real Agent | Real Agent coordinates: Real adds LICENSE → Symbols updates smoke test → Formula updates SPEC-013 | [x] |
| TSK-038 | Real Unknown Golden Circle taxonomy (Why, How, What) + requirements.md & todos.md | Real Agent | Real Agent defines and organizes taxonomy in 1_Real_Unknown/README.md, creates requirements.md and todos.md | [x] |
| TSK-039 | Master Review & Feedback suite with per-project Azure container (SPEC-017) | Symbols Agent | Real Agent coordinates: Symbols builds 5_Symbols/master_review/ & catalog generator → Formula specs isolated Azure containers → Test validates | [x] |
| TSK-040 | Partition 5_Symbols into project/ and deliverypilot/ subfolders | Symbols Agent | Symbols Agent creates project/ and deliverypilot/, moves master_review, updates relative paths and nav-sync | [x] |
| TSK-041 | Move extensions.md to 2_Environment/ and document Excalidraw & Mermaid extensions | Environment Agent | Environment Agent moves extensions.md, adds Excalidraw/Mermaid installation, updates nav-sync & READMEs | [x] |
| TSK-042 | Create 1_Real_Unknown/How/mindmap.md lineage & add Markdown authoring extensions | Real Agent | Real Agent creates lineage mindmap & connection matrix; Environment Agent adds Markdown preview tools | [x] |
| TSK-043 | Adopt _README.md leading underscore convention & create 1_Real_Unknown/How/patterns.md (SPEC-018) | Real Agent | Real Agent coordinates: Symbols renames stage READMEs to _README.md & updates nav/smoke tests → Real documents patterns.md → Formula updates SPEC-018 → Test validates | [x] |
| TSK-044 | Define AI Harness Triad (Channel, Compute, Bot) in 1_Real_Unknown/How/ai_harness.md (SPEC-019) | Real Agent | Real Agent creates ai_harness.md & updates How/mindmap.md & How/patterns.md → Formula updates SPEC-019 → Symbols syncs nav & catalog → Test validates | [x] |
| TSK-045 | Merge copilot.md, gemini.md, and claude.md personas into agents.md (SPEC-020) | Real Agent | Real Agent coordinates: Formula updates agents.md with consolidated personas → Symbols removes redundant files & syncs nav → Test validates | [x] |
| TSK-046 | Relocate markdown_renderer & artifacts_carousel to deliverypilot/, isolate DeliveryPilot behind debug icon (SPEC-021) | Symbols Agent | Real Agent coordinates: Symbols relocates pages under 5_Symbols/deliverypilot/, updates 2-level pathing, purifies projectMenu to consumer-only pages, updates nav_sync & smoke tests → Formula specs SPEC-021 → Test validates 11/11 | [x] |
| TSK-047 | Group 1_Real_Unknown markdowns under Why, How, What & update README refactor prompt (SPEC-022) | Real Agent | Real Agent coordinates: creates Why/ and What/ subfolders with _README.md, git mv files into Why/How/What, updates nav_sync & menus, updates README refactor/init prompts with latest project scan → Formula specs SPEC-022 → Test validates 11/11 | [x] |
| TSK-048 | Repository Link Integrity check tool & automated broken link remediation (SPEC-023) | Formula Agent | Real Agent coordinates: Formula defines SPEC-023 → Symbols creates check_links.py & integrates Check 11 into smoke_test.py → Symbols fixes all 8 broken links across project → Test validates 12/12 passing | [x] |
| TSK-049 | Project Menu Root Link Resolution & /index.html Resilience (SPEC-024) | Formula Agent | Real Agent coordinates: Formula defines SPEC-024 & updates navigation.md → Symbols normalizes /index.html in index.html & adds project navigation to calendar_view.html & click interceptors across project pages → Symbols updates smoke_test.py Check 3 → Test validates 12/12 passing | [x] |






### Task packet template (SPEC-014 — bot refuses to start if any field is missing)

```markdown
- id: TSK-XXX
- outcome: [one sentence — done means what]
- allowed paths: [files/dirs the bot may touch]
- forbidden paths: [never touch — e.g. main branch, .env, Key Vault secrets]
- verifier: python3 5_Symbols/toolbox/smoke_test.py
- spec id (optional): [which SPEC may change, if any]
```

## Task Management Rules

1. **Real Agent owns this file** — breaks the project into phases and tasks, assigns agents, coordinates complex tasks
2. **Every task names its agent** — the Agent column identifies which stage agent is responsible for execution
3. **Complex tasks describe coordination** — tasks involving 2+ agents include a Coordination column explaining how the Real Agent orchestrates the workflow
4. **Status tracking**: `[ ]` Pending, `[x]` Completed, `[~]` In Progress, `[!]` Blocked
5. **Link to specs** — tasks that implement a spec should reference the SPEC-XXX number
6. **Task granularity** — a task should be completable in a single coding session
7. **Real Agent as coordinator** — for complex tasks, the Real Agent defines the scope, dispatches to agents, and validates the result against OKRs
