#  Tasks & Phases

> **Stage 1: Real Unknown** — Project phases and task breakdown managed by the Real Agent.

## Phase 1: Foundation (Completed)
- [x] TSK-001: Initialize project structure with 7-stage folders
- [x] TSK-002: Create root templates (index.html, markdown_renderer.html, .env.example, robots.txt, sitemap.xml)
- [x] TSK-003: Define agent coordinator (agents.md) with 7-stage execution flow
- [x] TSK-004: Configure navigation menus and debug menu

## Phase 2: Environment Setup (Completed)
- [x] TSK-005: Document setup guides (macOS, Windows, AI stack, Azure)
- [x] TSK-006: Create architecture blueprint (architecture.md with Mermaid diagrams)
- [x] TSK-007: Document tools (tools.md, toolstack.md, dependencies.md, mcp.md, superskills.md)
- [x] TSK-008: Configure semantic search (Kilo Code local indexing / Qdrant)

## Phase 3: Design & Specs (Completed)
- [x] TSK-009: Create simulation design workflow (design_workflow.md, image_prompts.md, carousel_config.json)
- [x] TSK-010: Create specs system (specs.md with SPEC-001 through SPEC-006)
- [x] TSK-011: Create formula docs (decisions.md, dsl.md, extensions.md, logging_and_autofix.md)

## Phase 4: Skills & Automation (Completed)
- [x] TSK-012: Create on-demand skill files (.kilo/skills/ — 6 skills)
- [x] TSK-013: Create error-fixing agent with GitHub token integration
- [x] TSK-014: Set up stage agents architecture (7 dedicated agents)
- [x] TSK-015: Create smoke test strategy with GitHub Issues integration

## Phase 5: Code Rules & Standards (Completed)
- [x] TSK-016: Create coding rules (5_Symbols/rules/ — 3 files)
- [x] TSK-017: Document risk register (risks.md)
- [x] TSK-018: Document stage dependency chain (SPEC-006)

## Phase 6: Implementation (In Progress)
- [ ] TSK-019: Implement frontend debug log panel (footer debug feature)
- [ ] TSK-020: Implement backend Axiom logging for Fly.io services
- [ ] TSK-021: Create GitHub Actions CI/CD workflow
- [ ] TSK-022: Implement automated smoke tests in CI

## Phase 7: Testing & Deployment (Pending)
- [ ] TSK-023: Run full smoke test suite on all pages
- [ ] TSK-024: Validate all 7-stage navigation and rendering
- [ ] TSK-025: Deploy to GitHub Pages and verify
- [ ] TSK-026: Publish retrospective in 6_Semblance/lessons_learned.md

## Task Management Rules

1. **Real Agent owns this file** — breaks the project into phases and tasks, updates status as work progresses
2. **One task per commit** — each task maps to a specific, completable unit of work
3. **Status tracking**: `[ ]` Pending, `[x]` Completed, `[~]` In Progress, `[!]` Blocked
4. **Link to specs** — tasks that implement a spec should reference the SPEC-XXX number
5. **Task granularity** — a task should be completable in a single coding session
