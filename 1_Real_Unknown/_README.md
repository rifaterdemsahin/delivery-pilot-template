# 1️⃣ Real Unknown — The "Why"

> **Stage 1 of 7:** Define the problem before building the solution.

## Purpose

This folder captures everything we **don't yet know** — the questions that drive the project, the goals we're optimising for, and the problems we're trying to solve. Nothing gets built until the unknown is clearly stated here.

## What belongs here

- **Problem statements & Requirements** — What pain, gap, or opportunity exists, and what functional boundaries define success
- **OKRs & Todos** — Objectives, Key Results, and fast-track action items
- **Core questions & Hypotheses** — The specific unknowns and assumptions this project tests
- **Governance** — Kanban tracking, risk registers, cost tracking, and prompts

## Sub-Taxonomy: Why, How, What (Golden Circle)

To provide clear cognitive separation, markdown files in `1_Real_Unknown/` map to three conceptual layers:

```
1_Real_Unknown/
├── 🎯 Why/   — The Purpose & Problems (problem_statement.md, requirements.md, hypotheses.md, questions.md)
├── ⚙️ How/   — The Strategy & Governance (kanban.md, costs.md, risks.md, sanity_check_report.md)
└── 📦 What/  — The Deliverables & Actions (okrs.md, tasks.md, todos.md, prompts.md)
```

### 1. 🎯 Why (Purpose, Problem & Scope)
| File | Description |
|------|-------------|
| [`problem_statement.md`](problem_statement.md) | The core problem, customer pain, and opportunity this project solves |
| [`requirements.md`](requirements.md) | High-level functional and non-functional requirements |
| [`questions.md`](questions.md) | Open questions and unknowns driving the research |
| [`hypotheses.md`](hypotheses.md) | Core assumptions to be validated downstream in `7_Testing_Known` |

### 2. ⚙️ How (Strategy, Constraints & Governance)
| File | Description |
|------|-------------|
| [`kanban.md`](kanban.md) | Project Kanban Board for stage flow tracking |
| [`costs.md`](costs.md) | Cost tracking for cloud environments, models, and tool calls |
| [`risks.md`](risks.md) | Living risk register with active risks, mitigations, and resolved risks |
| [`sanity_check_report.md`](sanity_check_report.md) | Verification report validating delivery alignment against objectives |
| [`How/mindmap.md`](How/mindmap.md) | Visual lineage mindmap connecting all framework files with architectural rationale |

### 3. 📦 What (Deliverables, Goals & Action Items)
| File | Description |
|------|-------------|
| [`okrs.md`](okrs.md) | Objectives and Key Results defining project success |
| [`tasks.md`](tasks.md) | Multi-stage phases and task breakdown coordinated by the Real Agent |
| [`todos.md`](todos.md) | Quick-capture action items and todos actively tracked by the Real Agent |
| [`prompts.md`](prompts.md) | Comprehensive prompt audit log recording user requests and purposes |


## Rules

- Write questions **before** writing solutions
- Every item here must be validated in `7_Testing_Known`
- Move resolved items to `_obsolete/` when no longer relevant 🚮

## 🧪 Testing Checklist

[![OKRs and Problem Framing](https://img.youtube.com/vi/mJB83EZtAjc/0.jpg)](https://www.youtube.com/watch?v=mJB83EZtAjc)

- [ ] Problem statement is clear and specific
- [ ] OKRs are measurable and time-bound
- [ ] All core questions are listed
- [ ] Hypotheses link back to `7_Testing_Known` validations
