# 🧭 TOGAF vs. Delivery Pilot Framework — Gap Analysis

**Status:** Draft
**Owner:** Formula Agent
**Last Updated:** 2026-07-18
**Related Files:** `4_Formula/specs.md`, `2_Environment/architecture.md`, `agents.md`

---

## 1. Purpose

TOGAF (The Open Group Architecture Framework) is an enterprise architecture (EA) framework built around the **Architecture Development Method (ADM)** — a cyclical, phase-gated process for governing large, multi-system enterprise change. The **Delivery Pilot Framework** (this repo) is a **7-stage self-learning system** for shipping a single static-site project end-to-end with an LLM agent as the primary operator.

This document maps the two frameworks phase-by-phase, identifies where Delivery Pilot already covers TOGAF intent, and flags genuine gaps — so we know what to consciously accept as out-of-scope versus what's worth borrowing.

---

## 2. Framework Snapshots

### TOGAF ADM (9 phases + Requirements Management hub)
| Phase | Focus |
|-------|-------|
| Preliminary | Establish EA capability, principles, governance framework |
| A — Architecture Vision | Scope, stakeholders, business case, high-level vision |
| B — Business Architecture | Business strategy, capabilities, org structure, processes |
| C — Information Systems Architecture | Data + application architecture |
| D — Technology Architecture | Infrastructure, platforms, tech standards |
| E — Opportunities & Solutions | Roadmap, work packages, build-vs-buy |
| F — Migration Planning | Sequencing, prioritized implementation plan |
| G — Implementation Governance | Compliance of implementation against architecture |
| H — Architecture Change Management | Monitor, trigger new cycles |
| Requirements Management | Central hub feeding/fed by all phases |

### Delivery Pilot 7 Stages
| Stage | Folder | Focus |
|-------|--------|-------|
| 1 | `1_Real_Unknown` | Problem, OKRs, hypotheses, risks (the "Why") |
| 2 | `2_Environment` | Roadmaps, blueprints, tooling, constraints |
| 3 | `3_Simulation` | UI mockups, visual vision |
| 4 | `4_Formula` | Specs, decisions, thinking log, CI/CD gate |
| 5 | `5_Symbols` | Implementation |
| 6 | `6_Semblance` | Errors, fixes, workarounds, gap analysis |
| 7 | `7_Testing_Known` | Validation, checklists, proof |

---

## 3. Phase-by-Phase Mapping

| TOGAF ADM Phase | Delivery Pilot Equivalent | Coverage |
|---|---|---|
| **Preliminary** (EA principles, governance setup) | `agents.md` + persona files define agent roles, boundaries, confirmation gates | ✅ Partial — governance is *agentic* (confirmation prompts, spec gates), not org-wide EA principles |
| **A — Architecture Vision** | `1_Real_Unknown/problem_statement.md`, `okrs.md`, `hypotheses.md` | ✅ Strong — problem framing and OKRs map closely to vision + business case |
| **B — Business Architecture** | *(none dedicated)* | ❌ Gap — no capability map, org/process modeling, or stakeholder value-stream view |
| **C — Information Systems Architecture** (data + application) | `4_Formula/database.md`, `2_Environment/architecture.md` (Mermaid diagrams) | ✅ Partial — application architecture covered; data architecture is thin (single `database.md`, no formal data model/entity governance) |
| **D — Technology Architecture** | `2_Environment/` (tools.md, toolstack.md, setup guides, dependencies.md) | ✅ Strong — this is Delivery Pilot's best-covered TOGAF phase |
| **E — Opportunities & Solutions** | `4_Formula/specs.md` (SPEC-XXX entries), `decisions.md` | ✅ Partial — specs define solutions per feature, but no consolidated roadmap of work packages or build-vs-buy analysis across the whole project |
| **F — Migration Planning** | `1_Real_Unknown/tasks.md` (phases/tasks), `kanban.md` | ✅ Partial — task sequencing exists, but no formal migration/transition architecture (no "state N → state N+1" modeling) |
| **G — Implementation Governance** | `.github/workflows/static.yml` (CI/CD gate), smoke test gate, spec-vs-code `[DRIFT]` flagging | ✅ Strong — automated governance is arguably *more rigorous* than typical TOGAF practice (drift detection is code-enforced, not just documented) |
| **H — Architecture Change Management** | `6_Semblance/` (error.log, fix.log, lessons_learned.md), `1_Real_Unknown/risks.md`, sanity check loop (SPEC-009) | ✅ Strong — the 7→1 sanity check loop is a direct analog to TOGAF's change-triggers-new-cycle model |
| **Requirements Management** (central hub) | Distributed across `okrs.md`, `specs.md`, `risks.md`, `llm_thinking_log.md` — no single requirements register | ⚠️ Gap — TOGAF centralizes all requirements in one artifact/repository; Delivery Pilot spreads them across stages 1 and 4 with no cross-reference ID scheme |

---

## 4. Structural Differences (Not Gaps — Deliberate Design Choices)

| Dimension | TOGAF | Delivery Pilot |
|---|---|---|
| **Scale** | Enterprise (multiple systems, portfolios, business units) | Single project/repo |
| **Operator** | Human architects, architecture review boards, governance committees | LLM agent(s) with human-in-the-loop confirmation gates |
| **Cadence** | Multi-month/year architecture cycles | Continuous — every commit can trigger a stage update |
| **Artifact format** | Formal deliverables (Architecture Definition Document, Compliance Assessments) | Markdown files + JSON config, git-versioned |
| **Governance mechanism** | Architecture Review Board sign-off | Spec gate (`4_Formula` approval before `5_Symbols`) + CI smoke test gate |
| **Change trigger** | Business drivers, technology shifts, compliance | Task arrival, error discovery, drift detection |

These are not deficiencies — Delivery Pilot intentionally trades enterprise breadth for single-project velocity with an AI operator. TOGAF's ceremony (review boards, formal sign-offs) would be overhead at this scale.

---

## 5. Real Gaps Worth Considering

1. **No Business Architecture stage.** There's no artifact mapping business capabilities, stakeholder value streams, or org impact. For a template meant to bootstrap *other* projects, a lightweight `stakeholders.md` or `capabilities.md` in `1_Real_Unknown` could close this without adding enterprise weight.
2. **No centralized Requirements Register.** Requirements live in `okrs.md`, `hypotheses.md`, `questions.md`, and `specs.md` with no shared ID scheme (TOGAF-style `REQ-001` traceable through every phase). Consider extending the existing `SPEC-XXX` numbering convention to also number requirements (`REQ-XXX`) and cross-link them in `specs.md`'s "Related Files."
3. **No formal Migration/Transition Architecture.** `tasks.md`/`kanban.md` sequence work, but there's no "current state vs. target state" diagram analogous to TOGAF's transition architectures. For multi-phase projects this could matter more than for a single-shot static site.
4. **Data Architecture is thin.** `4_Formula/database.md` exists but there's no formal entity-relationship model, data governance, or lifecycle policy distinct from application architecture — TOGAF treats these as separate concerns (Phase C splits Data and Application).
5. **No formal Compliance Assessment artifact.** Drift detection (`[DRIFT]` flags) is the closest analog to TOGAF's Phase G compliance assessments, but it's inline in `specs.md` rather than a standalone, auditable compliance report.

---

## 6. What Delivery Pilot Does *Better* Than a Literal TOGAF Adoption

- **Automated governance over documented governance.** TOGAF's Implementation Governance relies on human review boards; Delivery Pilot enforces the spec gate and smoke test gate in CI, making non-compliance a build failure rather than a missed review.
- **Tight requirements→proof loop.** The 7→1 sanity check loop (SPEC-009) closes the "why did we build this" question every cycle — TOGAF's Requirements Management is a passive repository, not an enforced loop back to origin.
- **LLM-native plug-and-play.** TOGAF assumes human architects; Delivery Pilot's spec/thinking-log system is explicitly designed so any LLM (Claude, GPT, DeepSeek, Gemini) can pick up the same context — TOGAF has no equivalent to "model portability."

---

## 7. Recommendation

Do not adopt TOGAF wholesale — it targets enterprise portfolios, not single-repo delivery. Instead, cherry-pick the two gaps with the best cost/benefit ratio:

1. Add a lightweight **Requirements Register** convention (`REQ-XXX` IDs cross-linked between `1_Real_Unknown/okrs.md` and `4_Formula/specs.md`) — low effort, closes the traceability gap.
2. Add an optional **`stakeholders.md`** in `1_Real_Unknown` for projects bootstrapped from this template that *do* have multiple stakeholders/business units — keep it out of the mandatory checklist so single-owner projects aren't burdened.

Skip Business Architecture, formal Migration Architecture, and Compliance Assessment as standalone artifacts — the existing `tasks.md`, CI drift flags, and `risks.md` already deliver most of their value at this project's scale.

---

## 8. Related Files

- `4_Formula/specs.md` — spec numbering convention (candidate home for `REQ-XXX`)
- `1_Real_Unknown/okrs.md`, `hypotheses.md`, `questions.md` — current distributed requirements sources
- `2_Environment/architecture.md` — closest analog to TOGAF Phase C/D artifacts
- `1_Real_Unknown/risks.md`, `6_Semblance/lessons_learned.md` — closest analog to TOGAF Phase H
- `agents.md` — governance/persona boundaries (closest analog to TOGAF Preliminary phase)
