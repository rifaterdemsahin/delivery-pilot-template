---
name: ask-human
description: Ask the operator for an approval, a choice or a free-text answer in Google Chat with one-tap buttons, instead of guessing or listing manual steps. Use for irreversible, costly, ambiguous or high-risk actions.
---

# ask-human — human-in-the-loop for delivery-pilot

You can pause and ask the operator. They answer with **one tap** on a Chat card (or a bare reply like `approve`, `no`, `2`).
The router enforces who may answer, expiry and idempotency — you only decide **whether and how to ask**.

## When to ask
Ask when the next step is any of:
- **Irreversible**: merge to `main`, delete/destroy a resource, drop data, force-push.
- **Costly**: creating a Fly app/machine beyond the channel budget, anything that spends money.
- **High-risk**: production deploys, changing secrets/permissions, touching workflows or the Dockerfile in a way you can't test.
- **Ambiguous**: two reasonable readings of the request (which region? which app? which branch?). Ask a **choice**, don't guess.

Just proceed (do **not** ask) when the step is reversible, cheap and clearly in scope: reading files, editing on a branch, opening a PR, running tests.

## How to ask (`ask_human`)
```
ask_human({
  kind: "approval" | "choice" | "question",
  title: "one line: what you need decided",
  body:  "why, what happens on Approve, what happens on Deny (2-3 short lines)",
  links: [{label, url}],            // attach the MOST useful: PR, diff, Actions run, preview, health URL
  options: ["lhr","ams","fra"],     // choice only (2-8). approvals default to Approve/Deny. omit for questions
  risk: "low" | "medium" | "high",  // high = merge to main, prod deploy, deleting resources, spend over budget
  expires_in: "24h"                 // default 24h; shorter for time-boxed work
})
```
- **Title**: one line, verb first ("Merge PR #6 into main", "Pick the region for agent-x").
- **Body**: say *why now*, and the consequence of each answer. No walls of text.
- **Links**: always attach the PR, the diff, the failing/succeeding run, the preview or health URL — whatever lets them decide without opening the repo.
- **Risk**: be honest. `high` makes the router require a button tap (or "approve" + "confirm"); an emoji alone is refused.
- It returns an `interaction_id` immediately. In a Sprite task, `ask_human` waits for the answer and returns it; if there is none (expired), **take the safe default: do nothing risky**.
- Ask **once** per decision. Do not re-ask the same thing, and do not stack several questions when one choice would do.

## What the human can do back
- Tap a button, reply `approve` / `deny` / a number, or ask a **question** about the request in the thread — the router LLM answers from the PR, logs and routing context while the request stays pending. You don't need to handle that.

## Never
- Never list manual steps for the human when `ask_human` + your tools can do the work after they say yes.
- Never act on a high-risk step without an `approved` answer.
- Never put secrets, tokens or personal data in `title`, `body` or links.
