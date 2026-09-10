# Logic Tracker — Premise & Conclusion

> Managed by the **Test Agent**. Tracks the premise→conclusion chain across objectives, delivered tasks, and LLM decisions.

## Format

| # | Premise | Objective | Task Delivered | LLM Decision | Conclusion | Status |
|---|---------|-----------|----------------|--------------|------------|--------|
|   |         |           |                |              |            |        |

## Structure

- **Premise**: The starting assumption, requirement, or question
- **Objective**: The OKR or goal this maps to
- **Task Delivered**: The concrete task or PR that addressed it
- **LLM Decision**: Key choice the LLM made (model selection, architecture, trade-off)
- **Conclusion**: Whether the premise holds, was disproven, or needs iteration
- **Status**: ✅ Confirmed / ❌ Rejected / 🔄 Iterating

## Iteration

When a conclusion is `🔄 Iterating`, the next row continues with the updated premise.

---

## Entries

| # | Premise | Objective | Task Delivered | LLM Decision | Conclusion | Status |
|---|---------|-----------|----------------|--------------|------------|--------|
| 1 | Agents forget to spec delivered work and leave changes unpushed | Template agents share one standing-orders file | TSK-027 / SPEC-011 — `5_Symbols/rules/agent_operating_rules.md` | Put RULE-001 (spec as delivered into Formula) and RULE-002 (commit and push) in `5_Symbols/rules/`, pointed from `agents.md` | Premise holds: one loadable file + Formula spec of the work | ✅ Confirmed |
