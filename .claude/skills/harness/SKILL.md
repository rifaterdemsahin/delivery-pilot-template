---
name: harness
description: Run one bot-driven task under the AI harness contract (SPEC-014). Use when asked to execute a harness task packet, start a bot run, validate a packet, or open a bot PR. Refuses to start on incomplete or secret-asking packets.
---

# 🤖 Harness — Bot Run

Execute **one** task packet under the contract in `4_Formula/harness.md` (normative spec: SPEC-014 in `4_Formula/specs.md`). This skill runs the contract — it does not restate the rules. One run = one packet = one PR.

## Steps

1. **Validate the packet first** (bot refuses to start if any check fails):
   ```bash
   python3 5_Symbols/toolbox/harness_packet.py <packet.md> --trigger "<task id>"
   ```
   Exit 0 = ACCEPT, exit 1 = REFUSE. On REFUSE: leave the tree untouched, append `[PENDING]` to `6_Semblance/fix.log` with the printed reason, and stop.
2. **Branch from clean main:**
   ```bash
   git checkout main && git pull && git checkout -b bot/<task-id>
   ```
3. **Implement** — touch only files inside the packet's `allowed paths`. Read `agents.md`, the operating rules, and the named specs first; write the plan to `4_Formula/llm_thinking_log.md` before editing `5_Symbols/`.
4. **Verify** (the single exit gate; never PR on red, max 3 attempts on the same error):
   ```bash
   python3 5_Symbols/toolbox/smoke_test.py --trigger "harness <task-id>"
   ```
   If a touched markdown path changed, run `python3 5_Symbols/toolbox/nav_sync.py` first, then re-run smoke.
5. **Update the spec** to match what shipped (RULE-001) — only if the packet's `spec id` permits it.
6. **Open one PR** (`bot/<task-id>` → `main`). Body must contain: task id, spec id, smoke-test result, files touched, runner used. Then **stop — a person merges**. Never auto-merge.

## Stop conditions (mandatory — see `4_Formula/harness.md` §4)

Verifier green or 3 failed attempts · touch outside allowed paths · spec change without packet permission · secrets / force-push / write to `main` · budget exceeded · nightly idle guard tripped. Early stop = leave the branch, `[PENDING]` in `fix.log`, error in `error.log`, bullet in `lessons_learned.md`. Do not guess.
