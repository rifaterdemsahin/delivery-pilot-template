# 🏛️ Architecture Decision Records (ADRs)

> **Stage 4: Formula** — Documenting major architectural decisions, their context, and consequences.

---

## 📋 ADR Index

- **ADR 001:** Choice of Secrets Manager (Azure Key Vault)
- **ADR 002:** [Title of the second decision]

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
