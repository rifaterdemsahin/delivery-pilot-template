---
name: sanity-check
description: Run the Real Agent's sanity check sub-agent — validate delivery correctness across all 7 stages, publish the canonical report in 1_Real_Unknown, and update risks.md. Use when asked for a sanity check, project health check, or delivery validation.
---

# 🔍 Sanity Check (Real Agent Sub-Agent)

Implements the 7 → 1 loop (SPEC-009 in `4_Formula/specs.md`): Stage 7 produces the test evidence, Stage 1 holds the verdict against the objectives.

## Steps

1. **Gather Stage-7 evidence**: run `/smoke-test` (both modes), and read `7_Testing_Known/validation_report.md`, `logic.md`, and the latest `6_Semblance/smoke_test_report.md`.
2. **Scan the framework rules** (from `agents.md` / persona files): 7 folders populated; `index.html` at root; social links; README Pages URL; no committed secrets; nav 3-way sync; testing checklist + video per stage README; error/fix logs current.
3. **Write the canonical report** to `1_Real_Unknown/sanity_check_report.md`:
   - Header: date, agent, scope, verdict (PASS / PASS WITH WARNINGS / FAIL).
   - "Stage-7 Data Sources Consumed" table (per SPEC-009).
   - Checks-passed table with evidence; findings `F-00x` with severity, requirement, impact, action.
   - Summary table + recommended next cycle per agent.
4. **Update `1_Real_Unknown/risks.md`**: new findings become risks (`R-0xx`); resolved findings move risks to Solved; append to the Risk Update Log.
5. `7_Testing_Known/sanity_check_report.md` is a pointer/data-source doc — do not write verdicts there; archive superseded reports to `7_Testing_Known/_obsolete/`.
6. Log the prompt in `1_Real_Unknown/prompts.md`, commit, and push.
