# 🎯 1_Real_Unknown / Why — Purpose, Problem & Scope

> **Stage 1: Real Unknown (Golden Circle — Why)** — Grounding the project in user pain, problem definitions, hypotheses, and scope.

## Purpose

The **Why** layer articulates the fundamental justification for this project before designing architecture or writing code. Nothing gets built until the unknown problems and requirements are rigorously defined here.

## Documents & Tools

| Document / Tool | Purpose |
|---|---|
| [`knowledge_graph.html`](knowledge_graph.html) | Interactive relationship canvas viewer, orphan document detector & feedback tool |
| [`problem_statement.md`](problem_statement.md) | Core problem, customer pain, and business opportunity driving this project |
| [`requirements.md`](requirements.md) | High-level functional, non-functional, and operational requirements |
| [`questions.md`](questions.md) | Open unknowns and investigative questions explored across the stages |
| [`hypotheses.md`](hypotheses.md) | Core testable assumptions validated downstream in `7_Testing_Known` |

## 🕸️ Knowledge Graph & Orphan Detection

The Why folder hosts the central project relationship viewer: [**`knowledge_graph.html`**](knowledge_graph.html).
- **Wikilinks Graph**: Renders all cross-document relationships (`[[target|relationship]]`) on an interactive physics canvas.
- **Orphan Spotter**: Automatically flags orphan documents (0 connections) with warning badges and recommends missing upstream/downstream links.
- **Feedback & Repair**: Provides one-click wikilink snippets to copy into documents to restore complete knowledge lineage.

## Upstream & Downstream Flow

- **Upstream:** Customer pain, user prompts, market research, bug reports
- **Downstream:** Feeds directly into `1_Real_Unknown/What/` (OKRs & Tasks), `3_Simulation/` (wireframes), and `4_Formula/specs.md` (specifications)

## 🔗 Lineage & Wikilinks

- [[problem_statement.md|includes]]: Problem statement definition
- [[requirements.md|includes]]: Project requirements specification
- [[questions.md|includes]]: Active unknown investigative questions
- [[hypotheses.md|includes]]: Core testable hypotheses
- [[knowledge_graph.html|visualized in]]: Interactive relationship canvas viewer
- [[../What/_README.md|flows to]]: Stage 1 What deliverables (OKRs, Tasks, Todos)
- [[../../4_Formula/specs.md|governed by]]: Technical specifications and approval gate
