# 🔁 Sanity Check Data Source (Stage 7 → Stage 1 Loop)

> **Stage 7: Testing Known** — This stage **produces the validation data**; the canonical sanity check report lives in [`1_Real_Unknown/sanity_check_report.md`](../1_Real_Unknown/sanity_check_report.md). See **SPEC-009** in `4_Formula/specs.md`.

## How the Loop Works

The 7-stage journey ends where it began. Stage 7 proves the delivery; Stage 1 judges it against the objectives — completing the loop:

```
1_Real_Unknown (objectives, OKRs)
    ↓  … stages 2–6 …
7_Testing_Known (test evidence produced HERE)
    ↓
Real Agent — sanity check sub-agent
    ↓
1_Real_Unknown/sanity_check_report.md  ← canonical report (verdict vs objectives)
    ↓
1_Real_Unknown/risks.md updated (new risks added, solved risks moved)
```

## Data This Stage Feeds Into the Report

| Data Source | What It Provides |
|-------------|------------------|
| [`smoke_tests.md`](smoke_tests.md) | Smoke test definitions, GitHub Issues workflow, report format |
| `5_Symbols/toolbox/smoke_test.py` runner output | Automated pass/fail evidence (local + cloud), written to `6_Semblance/smoke_test_report.md` |
| [`validation_report.md`](validation_report.md) | Feature validation evidence and checklists |
| [`logic.md`](logic.md) | Premise → objective → delivered-task chains |
| [`README.md`](README.md) | Master testing checklist status |

## Rules

1. **Do not write sanity verdicts here** — Stage 7 records raw test evidence; the Real Agent synthesizes the verdict in Stage 1.
2. **Every sanity run cites its Stage-7 inputs** — the Stage-1 report lists which data sources above were consumed and their dates.
3. **Every sanity run updates `risks.md`** — findings become risks; resolved findings move risks to Solved.
4. **Historical reports live in [`_obsolete/`](_obsolete/)** — superseded reports are archived, never deleted (e.g., `_obsolete/sanity_check_report_2026-05-30.md`).

## Report History

| Date | Report | Location | Status |
|------|--------|----------|--------|
| 2026-05-30 | Template fitness validation | `_obsolete/sanity_check_report_2026-05-30.md` | Archived (predates `index.html`; findings resolved) |
| 2026-07-12 | Full project sanity check | `1_Real_Unknown/sanity_check_report.md` | ✅ Canonical |
