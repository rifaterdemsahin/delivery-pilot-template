# 🤖 Bot Spec (Template)

> **Stage 4: Formula** — The generic bot-spec format for this template. Normative template specs live in `specs.md`; this file defines how any bot agent is catalogued, with the Grocery bot as the worked example.

## Template note (consumer projects, SPEC-010)

- Copy this file to `4_Formula/bot_spec_<agent>.md` for each additional bot.
- Replace the example values below (display name, agent id, Drive folder, destinations) with the consumer bot's own.
- Run `python3 5_Symbols/toolbox/nav_sync.py` + `python3 5_Symbols/toolbox/smoke_test.py`, then commit and push (RULE-002).

## Worked example: Grocery — Specs

Version: 1.0

Last updated: 2026-10-05 (Europe/London)

Agent id: 4710a8d1-f738-4fa6-bb5c-d96510ba7bfd

Specs folder: Grok Bot Specs — Drive ID 1V_No6VCg3fmdKQgwTwTjYa_QeCjlOai9

## Purpose

Purpose to be documented (draft)

## Success criteria

- Agent completes assigned tasks reliably
- Documentation stays current with actual implementation
- No secrets exposed in public repositories or docs

## Context

- Owner: Rifat Erdem Sahin (Europe/London)
- Agent display name: Grocery
- Execution environment: Grok Bot / Cursor agent platform

## Data sources / tools

- Grok Bot agent execution environment
- Google Drive for documentation and data storage
- Other tools as needed for agent-specific tasks

## Destinations

- Grok Bot chat with Rifat
- Google Drive Specs folder
- This GitHub catalog folder
- Integration-specific destinations (Discord, Slack, etc. — webhook URLs stored only in agent memory)

## Operating rules

1. Never print or commit secrets (webhooks, API keys, tokens) to docs or this repo
2. Keep specs documentation current when agent purpose or constraints change
3. Use placeholders like `<WEBHOOK_URL>` or `<API_KEY>` in any shared documentation
4. Store sensitive configuration only in agent memory or secure storage

## Automation / routines

None documented yet

## Constraints

- No secrets in Drive Specs or this GitHub catalog
- All sensitive URLs and tokens stored only in agent memory

## Non-goals

- Tasks outside this agent's defined purpose
- Managing other agents' responsibilities

## Change control

Update this file and the Drive Specs Doc when purpose, data sources, destinations, or constraints change.

## Change log

- 2026-10-05: Version 1.0 created. Initial catalog entry added to GitHub bots repository.
