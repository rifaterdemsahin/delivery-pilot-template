# 🤖 AI Harness — Bot-Driven Development Contract

> **Stage 4: Formula (runbook)** — The machine-runnable contract for bot-driven development. One bot run consumes **one task packet** and produces **one pull request**. Normative spec: `SPEC-014` in `specs.md`. This file is the runbook the bot reads.

---

## 1. What the harness is

The 7-stage framework already describes the loop a person steers in chat. The harness is the **executable version of that loop** — a bot can start it, finish it, and stop it with no person in the session.

- The bot is **not a new agent system**. It runs as a **Symbols Agent with a Test Agent exit gate**: Real Agent owns the task list, Formula Agent owns the spec, Semblance owns the scars.
- Interactive chat keeps today's rules (confirm before code, RULE-002 commit/push on the working branch). The harness bot uses the **split in ADR-002**: confirmation once on the task packet, then branch + verifier + PR. Push to `main` stays a human merge after CI is green.
- Repair and feature work share one contract: the nightly autofix loop in `logging_and_autofix.md` §3 **follows this contract** with the packet filled from the top Axiom error.

```
packet → bot/<task-id> branch → implement → smoke_test.py → one PR → human merges
```

## 2. Task packet (input)

A task packet is one row in `1_Real_Unknown/tasks.md` **or** one GitHub issue labeled `bot-ready` with the same body. Five fields are mandatory — **if any is missing, the bot refuses to start**:

| Field | Meaning | Example |
|---|---|---|
| `id` | Task id | `TSK-031` |
| `outcome` | One sentence: done means what | `New markdown page appears in the debug menu and smoke test passes` |
| `allowed paths` | Files/dirs the bot may touch | `3_Simulation/menu_design.md, navigation_config.json, index.html` |
| `forbidden paths` | Never touch | `main branch, .env, Key Vault secrets, unrelated stages` |
| `verifier` | The single exit-gate command | `python3 5_Symbols/toolbox/smoke_test.py` |

Optional: `spec id` (which SPEC may change), `budget` (token/time cap from the budget sub-agent).

## 3. Loop (one run, one PR)

1. Read `agents.md`, `5_Symbols/rules/agent_operating_rules.md`, and the specs named in the packet.
2. Write the plan into `4_Formula/llm_thinking_log.md` **before** editing `5_Symbols/` (thinking gate still applies to bots).
3. Start from clean `main`: `git checkout main && git pull && git checkout -b bot/<task-id>`. Never touch the human's working tree.
4. Change **only** files inside `allowed paths`. Touching anything else = stop.
5. Run the verifier: `python3 5_Symbols/toolbox/smoke_test.py`. Red means fix (max 3 attempts on the same error) or stop. **Never open a PR on red.**
6. Update the spec to match what shipped (RULE-001) — only if the packet's `spec id` permits it.
7. Open **one PR** with branch `bot/<task-id>` → `main`. Body must contain these five lines (the `harness.yml` CI guard enforces them):
   ```
   Task: TSK-XXX — <outcome>
   Spec: SPEC-XXX (contract; state whether spec text changed)
   Smoke: <red proof> → <green result, e.g. 11/11>
   Files: <touched files>
   Runner: <schedule job / workflow_dispatch / supervised session>
   ```
8. Stop. A person merges. Never auto-merge.

> Packets covering `5_Symbols` edits must list `4_Formula/llm_thinking_log.md` in `allowed paths` — the thinking gate writes there, and touching unlisted paths is a stop (Slice-3 finding).

## 4. Stop conditions (all mandatory)

- Verifier green, or 3 failed attempts on the same error → stop.
- A change would touch a file outside `allowed paths` → stop.
- A spec would change and the packet has no `spec id` permitting it → stop.
- Secrets, force-push, or any write to `main` → stop immediately.
- Token/time budget from `1_Real_Unknown/costs.md` exceeded → stop.
- Nightly/idle guard (autofix only): uncommitted changes, a commit on `main` in the last 6h, or an open `wip` PR → skip the run, log `skipped — active development`.

On early stop: leave the branch as-is, append `[PENDING]` to `6_Semblance/fix.log`, append the error to `6_Semblance/error.log`, add a retrospective bullet to `6_Semblance/lessons_learned.md`. **Do not guess.**

## 5. Runners (where the bot executes)

| Runner | Use when | Secrets |
|---|---|---|
| Cursor cloud agent / `/schedule` nightly job | Overnight repair, same as `logging_and_autofix.md` §3 | `AXIOM_TOKEN`, repo write scope — from Azure Key Vault, never in git |
| GitHub Action `workflow_dispatch` | On-demand feature task from a `bot-ready` issue | `GITHUB_AGENT_TOKEN` from Key Vault (see `2_Environment/github_agent.md`) |
| Local supervised run | Proving a golden task before widening scope | Same Key Vault values via `az keyvault secret show` |

Runner choice is recorded in the PR body. The contract is identical in all three.

## 6. Verifier (definition of done)

One command: `python3 5_Symbols/toolbox/smoke_test.py` (SPEC-008). It checks config validity, menu URLs, required root files, social links, 3-way nav sync, orphaned stage files, secret patterns, and RULE-005 root layout. CI (`.github/workflows/static.yml`) runs the same gate — green PR means the smoke gate passed twice. If the bot needs a check the verifier lacks, **extend the verifier first** (Slice 3), then widen the bot.

## 7. Golden tasks (prove the harness before widening)

A fresh harness must pass these three before taking real issues (tracked in `1_Real_Unknown/tasks.md` Phase 8):

1. **Fix a broken menu link** — verifier goes red → green.
2. **Add a markdown page + run nav-sync** — page appears in the debug menu on all 3 sources.
3. **Refuse a secret commit** — packet asks for a secret in git; bot refuses and logs `[PENDING]`.

## 8. Inheritance

Consumer projects keep this file and SPEC-014 through SPEC-010 bootstrap. The skill and runbook stay; the task list resets with the rest of `1_Real_Unknown/`.
