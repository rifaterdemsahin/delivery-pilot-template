# 📖 Domain-Specific Language (DSL) Dictionary

> **Stage 4: Formula** — Glossary of specialized domain terminology, framework terms, and concepts used within the Delivery Pilot and Self-Learning platforms.

---

## 🚀 Core Platform Terms

### Delivery Pilot
The overarching AI-driven project orchestration template. It guides developers (both human and AI agents) through a structured, disciplined development lifecycle from initial problem definition to final verified deployment.

### Self-Learning Platform
A system engineered to capture execution history, mistakes, reasoning, and lessons learned. The primary goal is to turn temporary developer interactions into permanent, reusable knowledge loops.

---

## 🗺️ The 7-Stage Journey Mapping

The framework structures all tasks into 7 distinct stages, mapping to specific cognitive learning steps:

| Stage | Name | Cognitive Mapping | Definition |
| :--- | :--- | :--- | :--- |
| **1** | [1_Real_Unknown](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/1_Real_Unknown) | **Active Ignorance** | Recognizing and explicitly stating what you do not know (hypotheses, OKRs, open questions) before writing code. |
| **2** | [2_Environment](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment) | **Mental Sandbox (Context)** | Establishing the technical setup, constraints, cloud credentials, and developer guidelines. |
| **3** | [3_Simulation](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/3_Simulation) | **Mental Sandbox (Vision)** | Creating UI mockups, visual wireframes, and interaction flows to make the end product visible early. |
| **4** | [4_Formula](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/4_Formula) | **Synthesis** | Compiling implementation guides, Research Notes, and Architectural Decision Records (ADRs). |
| **5** | [5_Symbols](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/5_Symbols) | **Execution** | The production code repository containing raw executable scripts, Dockerfiles, and CI/CD pipelines. |
| **6** | [6_Semblance](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/6_Semblance) | **Feedback Loop** | The honest documentation of runtime errors, active hotfixes, technical debt, and plan vs. outcome gaps. |
| **7** | [7_Testing_Known](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/7_Testing_Known) | **Consolidation** | Proving and validating every Stage 1 unknown using test outcomes, master checklists, and final sign-offs. |

---

## 🛠️ Specialized Architectural Concepts

### Two-Menu Architecture
A navigation design split that separates audience visibility:
1. **Project Menu:** Custom user navigation linking to app features. Always visible.
2. **Debug Menu:** Internal system navigation linking to the 7 stages and developer guides. Access toggled via a fixed bottom-right button and persisted via cookie.

### Active Reflection Routine
The requirement for both humans and AI agents to compile retrospective logs inside `6_Semblance/lessons_learned.md` immediately following the completion of any project milestone.

### LLM Thinking / Reasoning Log
An explicit documentation process (`4_Formula/llm_thinking_log.md`) capturing the internal thinking phase, evaluation steps, and decision drivers of the Large Language Model during task execution.

### Azure Key Vault
The designated cloud credentials vault used to store, manage, and dynamically retrieve development credentials at runtime, enforcing zero secret leakage in version control.

### Symbols
The literal representations of code execution (variables, classes, modules, and Docker containers) that build the final application state.

### Semblance
The state representing the difference or gap between the theoretical plan (the Formula) and the practical reality (unexpected exceptions and workarounds).
