# 🏛️ Architecture Decision Records (ADRs)

> **Stage 4: Formula** — Documenting major architectural decisions, their context, and consequences.

---

## 📋 ADR Index

- **ADR 001:** Choice of Secrets Manager (Azure Key Vault)
- **ADR 002:** Interactive chat vs harness bot — confirmation and branch split

---

## 📌 ADR 001: Choice of Secrets Manager (Azure Key Vault)

### **Status:** Accepted
**Date:** YYYY-MM-DD  
**Decided By:** [Human / AI Agent]

### **Context & Problem Statement**
*What is the context of this decision? What problem are we solving? (e.g. "We need a secure way to manage database credentials and API keys across environments without committing them to git.")*

### **Decision Drivers**
1. Zero secrets committed to version control.
2. Low cost for development operations.
3. Ease of integration with GitHub Actions and deployment platforms.

### **Considered Options**
- **Option 1:** Local `.env` files (Committed, high-risk).
- **Option 2:** Vault by HashiCorp (High configuration complexity, higher cost).
- **Option 3:** Azure Key Vault (FIPS compliance, pay-per-operation pricing).

### **Decision Outcome**
**Chosen Option:** **Option 3 (Azure Key Vault)**.
- **Why:** Fits enterprise-grade requirements, costs ~$0.03 per 10K requests (Standard tier), and interfaces natively with cloud pipelines.

### **Consequences**
- **Pros:** High security, audit logging, simple credential rotation.
- **Cons:** Requires active Azure credentials during CLI initialization and deployment pipelines.

---

## 📌 ADR 002: Interactive chat vs harness bot — confirmation and branch split

### **Status:** Accepted
**Date:** 2026-10-08
**Decided By:** Human + Formula Agent (SPEC-014)

### **Context & Problem Statement**
Two standing orders block a bot from driving development without a person in the chat: (1) **confirmation before every code change** assumes a human is in the session; (2) **RULE-002 (commit and push after every step)** pushes onto the working branch, which today is often `main`. A harness bot needs confirmation once, then an isolated branch and a reviewable PR.

### **Decision Outcome**
- **Interactive chat (person steering):** keeps today's rules — confirm before `5_Symbols` code, RULE-002 commit/push on the working branch.
- **Harness bot (no person in session):** confirmation happens **once, on the task packet** (the 5-field packet in SPEC-014). The bot then works on `bot/<task-id>` from clean `main`, commits there, runs `python3 5_Symbols/toolbox/smoke_test.py` as its exit gate, and opens **one PR**. Push to `main` stays a human merge after CI is green. Never auto-merge, never PR on red.

### **Consequences**
- **Pros:** Bots become runnable (start/finish/stop) without forking the 7-stage flow or inventing a second agent system.
- **Cons:** Every bot task must carry a bounded packet (allowed/forbidden paths); unbounded tasks ("improve the template") are rejected.
- **Related:** `4_Formula/harness.md`, `4_Formula/specs.md` (SPEC-014), `4_Formula/logging_and_autofix.md` §3, `5_Symbols/rules/agent_operating_rules.md`.
