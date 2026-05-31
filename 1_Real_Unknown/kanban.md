# 📋 Project Kanban Board

> **Stage 1 of 7 (Real Unknown):** Track setup tasks, ongoing development, and pilot status.
> This file is a live Kanban board. AI agents and human developers must keep this updated as they do their work.

---

## 📖 How to Use This Kanban

1. **Move Tasks**: Move task items between sections (`Backlog 📥`, `Planned 📋`, `In Progress 🔄`, `In Review 👀`, `Done ✅`) as work progresses.
2. **Assignee**: Designate who is working on the task (e.g., `Gemini`, `Claude`, `Copilot`, `Kilo Code`, or `Human`).
3. **Traceability**: Link each task to its relevant stage documentation or source code (e.g., referencing a setup guide in `2_Environment` or a validation check in `7_Testing_Known`).
4. **Update Logs**: When an AI agent performs a task, they must update this kanban board in the same commit to ensure real-time status accuracy.

---

## 📥 Backlog
*Tasks that are defined but not yet scheduled.*

- [ ] **TSK-009: Production Environment Setup**
  - **Assignee:** Human / DevOps
  - **Details:** Setup production VMs/Containers on Fly.io and configure production TLS.
  - **Stage Reference:** N/A

- [ ] **TSK-010: Advanced Multimodal Simulation Test**
  - **Assignee:** Gemini
  - **Details:** Validate UI layouts dynamically using Gemini multimodal vision checks.
  - **Stage Reference:** [Simulation Stage](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/3_Simulation/)

---

## 📋 Planned / To Do
*Tasks scheduled for implementation.*

- [ ] **TSK-004: Configure Navigation & Menus**
  - **Assignee:** Gemini / Claude
  - **Details:** Add dynamic JSON configuration loading for navigation menus and ensure persistency via cookies.
  - **Stage Reference:** [2_Environment/navigation.md](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/navigation.md)

- [ ] **TSK-005: Setup CI/CD Pipeline**
  - **Assignee:** Copilot / DevOps
  - **Details:** Set up GitHub Actions workflow to deploy static content to GitHub Pages.
  - **Stage Reference:** [2_Environment/setup_ai.md](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/setup_ai.md)

- [ ] **TSK-006: Integrate Azure Key Vault**
  - **Assignee:** Claude / Security
  - **Details:** Connect runtime environments to Azure Key Vault for secure secrets storage.
  - **Stage Reference:** [2_Environment/setup_azure.md](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/2_Environment/setup_azure.md)

- [ ] **TSK-007: Implement Active Reflection Routine**
  - **Assignee:** All Agents
  - **Details:** Establish `6_Semblance/lessons_learned.md` for post-milestone retrospectives.
  - **Stage Reference:** [6_Semblance Stage](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/6_Semblance/)

---

## 🔄 In Progress
*Active tasks currently being worked on.*

- [/] **TSK-003: Define Kanban Template**
  - **Assignee:** Gemini
  - **Details:** Create `1_Real_Unknown/kanban.md` and define the initial setup tasks.
  - **Stage Reference:** [1_Real_Unknown/kanban.md](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/1_Real_Unknown/kanban.md)

---

## 👀 In Review
*Tasks completed and awaiting validation/review.*

- [ ] **TSK-008: Basic Stage Folders Structure Validation**
  - **Assignee:** Claude / Gemini
  - **Details:** Ensure folder mapping (1-7) exists and is populated with correct template files.
  - **Stage Reference:** [7_Testing_Known/README.md](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/7_Testing_Known/README.md)

---

## ✅ Done
*Verified and completed tasks.*

- [x] **TSK-001: Git Repository Initialization**
  - **Assignee:** Human
  - **Details:** Initialized repository and basic project structure.
  - **Stage Reference:** [README.md](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/README.md)

- [x] **TSK-002: Project Home Page Layout**
  - **Assignee:** Gemini
  - **Details:** Created `index.html` and `navigation_config.json` for site entry point.
  - **Stage Reference:** [index.html](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/index.html)
