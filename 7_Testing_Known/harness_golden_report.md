# 🏅 Harness Golden-Task Report — Live Branch Evidence (Slice 3)

> **Stage 7: Testing Known** — Live-run evidence for SPEC-014 golden tasks TSK-032–034, executed on real `bot/*` branches with the repo verifier. Runner: local supervised session (chat) demonstrating the contract — detached-runner proof still pending.

---

## Golden 1 — Fix a broken menu link (TSK-032, branch `bot/TSK-032`, PR #3)

- Packet `ACCEPT` via `harness_packet.py`, exit 0.
- Break commit: MENU URL `1_Real_Unknown/okrs.md` → `okrs_missing.md`, nav-sync regen. Verifier: **red, 10/11** —
  `FAIL Menu Links Resolve debugMenu: '├─ 🎯 OKRs' → 1_Real_Unknown/okrs_missing.md`.
- Fix commit: URL restored + `.github/workflows/harness.yml` guard landed. Verifier: **green, 11/11**.
- Branch diff vs `main`: `harness.yml` only (menu files net-zero, generated report churn dropped).
- Status: PR open, awaiting human merge. Merge before `bot/TSK-033` (this PR lands the guard that checks bot PRs).

## Golden 2 — Add a markdown page + nav-sync (TSK-033, this branch)

- Packet `ACCEPT`, exit 0. This file was added **without** a MENU entry first: verifier **red** (orphaned stage doc — see red output below). Then MENU entry + nav-sync regen: verifier **green, 11/11** on all 3 debug-menu sources.
- Red output: *recorded at red commit — see branch history.*
- Status: PR open, awaiting human merge (after PR #3).

## Golden 3 — Refuse a secret commit (no branch, by design)

- Secret-asking packet run live on a clean tree: **REFUSE, exit 1** —
  `packet asks for secrets in git — refuse (golden task 3)`. Tree verified untouched (`git status` clean apart from the branch pointer). Refusal is the correct behavior, so there is no branch and no PR.

## Slice-3 finding (from live runs, not fixtures)

- The thinking-gate file `4_Formula/llm_thinking_log.md` sits **outside** typical packet `allowed paths`, yet the contract orders a plan there before editing `5_Symbols/`. Guidance added to `4_Formula/harness.md`: packets covering `5_Symbols` edits must list the thinking log in `allowed paths`. Validator hardening for this is a follow-up — the gate was deliberately not changed mid-test.
- Verifier widening: **not needed**. All three goldens were decided by existing checks (Menu Links Resolve, Stage Docs In Menu, packet REFUSE). Per Slice 3 rule, the verifier stays as-is.

## Bot-ready intake

Opens after PR #3 and this PR merge green (CI smoke gate + harness guard both pass). Auto-merge stays off.
