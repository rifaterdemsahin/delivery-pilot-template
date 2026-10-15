# 📋 Requirements — Real Unknown

> **Stage 1: Real Unknown** — High-level functional, non-functional, and stakeholder requirements defining project scope and success criteria before entering architecture and simulation.

## Overview

Requirements in this document bridge the core problem statement into actionable functional boundaries. Every requirement maps upstream to a problem or hypothesis in `1_Real_Unknown/` and downstream to technical specifications in `4_Formula/specs.md`.

## Functional Requirements (FR)

| ID | Category | Requirement Description | OKR / Problem Link | Status |
|---|---|---|---|---|
| FR-001 | Framework | Provide a reproducible 7-stage development flow (`1_Real` to `7_Testing`) | OKR-1 | Active |
| FR-002 | Review Tool | Provide an in-browser Master Review suite for file inspection & feedback | OKR-2 | Active |
| FR-003 | Storage | Support per-project isolated Azure Blob Storage containers for state | OKR-2 | Active |
| FR-004 | Navigation | Support unified Project Menu & Debug Menu driven by JSON config | OKR-1 | Active |
| FR-005 | Wireframes | Maintain Excalidraw wireframes in `3_Simulation/` synced with `1_Real_Unknown/` | OKR-3 | Active |

## Non-Functional Requirements (NFR)

| ID | Category | Requirement Description | Verification | Status |
|---|---|---|---|---|
| NFR-001 | Port Policy | Local preview servers must bind to ports above 30,000+ (e.g. 30080) | `smoke_test.py` | Active |
| NFR-002 | Zero-Secret Git | Never commit secrets; load all credentials from Azure Key Vault | `smoke_test.py` | Active |
| NFR-003 | Model Agnostic | Coordinator `agents.md` remains constant regardless of LLM used | Manual Review | Active |
| NFR-004 | Fail-Soft Offline | Review and preview tools must function with local fallbacks if offline | Browser Preview | Active |

## Traceability & Lifecycle

- **Upstream**: [[problem_statement.md|depends on]], [[../What/okrs.md|quantified by]]
- **Downstream**: [[../../4_Formula/specs.md|formulated in]], [[../../3_Simulation/design_workflow.md|designed in]], [[hypotheses.md|tested by]], [[knowledge_graph.html|visualized in]]
