# Agent Creation Responsibility

> **Stage 4: Formula** — Which agents are responsible for creating new agents, and under what circumstances.

## Overview

Multiple agents share the responsibility of creating new agents, each for different purposes. This document clarifies who creates what type of agent and under what conditions.

---

## Agent Creation Matrix

| Creator | Type of Agent | Trigger | Requires |
|---------|--------------|---------|----------|
| **Real Agent** | Stage Agents | Project initialization or restructuring | Defines roles, folders, and communication patterns for all 7 stage agents |
| **Real Agent** | Sanity Check Sub-Agent | Validates the correct things are being delivered | Updates `risks.md` with findings |
| **Any Top Agent** | Task Sub-Agents | Specialized work needed within a stage | User confirmation + spec defining scope, boundaries, and deliverables |
| **Formula Agent** | Synthesis Sub-Agents | Need to merge upstream outputs (Real, Environment, Simulation) into coherent deliverables | Sim/Env outputs ready for synthesis |
| **Semblance Agent** | Error Mitigation Sub-Agents | Recurring errors in an existing agent | Root cause analysis showing the agent needs specialized support |
| **Semblance Agent** | Bottleneck & Theory of Constraints Sub-Agent | System bottlenecks detected during testing | Updates `risks.md` and warns the user |
| **Environment Agent** | Context-Based Sub-Agents | LLM context size exceeds manageable limits | Monitors context consumption and decides when to split work |

---

## Detailed Responsibilities

### Real Agent — Stage Agent Architecture

The Real Agent defines the overall 7-agent architecture:

- Creates the initial 7 stage agents (Real, Environment, Simulation, Formula, Symbols, Test, Semblance)
- Assigns each agent its folder, role, and communication channels
- Coordinates the Agent Communication diagram through `llm_thinking_log.md`
- Validates that all agents are functioning and their outputs meet OKRs
- Documents the architecture in `agents.md`

### Sanity Check Sub-Agent

The Real Agent has a dedicated sanity check sub-agent:

- **Trigger**: After task completion, before handoff to the Real Agent coordinator
- **Action**: Reviews delivered work against OKRs and `problem_statement.md` — confirms the right things are being built
- **Output**: If delivery deviates from objectives, updates `1_Real_Unknown/risks.md` with new risks or mitigation adjustments
- **Rule**: The Real Agent does not close a task until the sanity check sub-agent has validated it

### Any Top Agent — Task Sub-Agents

All 7 top agents can spawn sub-agents for specialized work:

- **Before generating**: Get user confirmation and create a spec
- **Spec must define**: Scope, boundaries, deliverables, and parent agent
- **After completion**: Sub-agent reports back to parent; parent validates output before integrating
- **Rule**: Each top agent is responsible for validating sub-agent output

### Formula Agent — Synthesis Sub-Agents

The Formula Agent creates synthesis sub-agents to:

- Merge outputs from Real Agent (OKRs), Environment Agent (tools/blueprints), and Simulation Agent (designs)
- Produce coherent specs, architectural plans, and decision records
- Ensure nothing is lost or duplicated when upstream outputs converge
- Output always goes through `llm_thinking_log.md` for cross-agent visibility

### Semblance Agent — Error Mitigation Sub-Agents

The Semblance Agent creates sub-agents for existing agents to:

- Address recurring error patterns found in `error.log`
- Mitigate root causes discovered through the Test → Semblance feedback loop
- Target specific agents (e.g., a formatting sub-agent for Symbols Agent, a tool-doc sub-agent for Environment Agent)
- Prevent future errors by addressing the systemic cause

### Bottleneck & Theory of Constraints Sub-Agent

The Semblance Agent has a dedicated bottleneck & theory of constraints sub-agent:

- **Trigger**: When system bottlenecks are detected during testing or runtime monitoring (slow builds, long test runs, resource contention, queue build-up)
- **Action**: Identifies the constraint, applies theory of constraints (TOC) to determine the limiting factor
- **Output**: Updates `1_Real_Unknown/risks.md` with the bottleneck as an active risk, including severity, impact, and proposed mitigation
- **Alert**: Warns the user via a `[BOTTLENECK]` entry in `error.log` and mentions it in the handoff to the Real Agent

### Environment Agent — Context-Based Sub-Agents

The Environment Agent decides when sub-agents are needed based on:

- LLM context size monitoring — when context approaches model limits
- Semantic search capability — whether the project needs local indexing or Qdrant
- Task complexity — whether a single agent can handle the task or it needs to be split
- Data storage strategy — whether data scale requires a dedicated sub-agent

---

## Agent Creation Flow

```
Task arrives
    ↓
Type of agent needed?
    ├── New stage agent? → Real Agent
    ├── Sanity check needed? → Real Agent (sanity check sub-agent)
    ├── Task too complex for one agent? → Any top agent (with confirmation)
    ├── Merging upstream outputs? → Formula Agent (synthesis)
    ├── Recurring errors? → Semblance Agent (error mitigation)
    └── Context too large? → Environment Agent (context decision)
    ↓
Spec created (scope, boundaries, deliverables)
    ↓
User confirmation (required before generation)
    ↓
Sub-agent created and activated
    ↓
Sub-agent completes work → reports to parent
    ↓
Parent validates → integrates output
```

## Rules

1. **Never create an agent without a spec** — scope, boundaries, and deliverables must be defined first
2. **User confirmation required** — no agent is silently spawned without user awareness
3. **Parent validation required** — no sub-agent output is integrated until the parent agent validates it
4. **Document in agents.md** — any new agent type or responsibility must be reflected in the coordinator
5. **Log in llm_thinking_log.md** — every agent creation is reasoned about and documented
