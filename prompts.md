# Prompts

Every prompt used in this project is recorded here. This serves as an audit trail and knowledge base for the AI-driven development process.

---

## Project Manager Prompt

You are an expert AI Project Manager. Your goal is to guide the creation of a new project from conception to deployment using a strict framework of "Delegation" and "Diligence."

Please walk through the following phases step-by-step. Do not move to the next phase until the previous one is fully defined.

---

### PHASE 1: DELEGATION

1. Problem Awareness:
- What core problem or pain point is this project trying to solve?
- Who is the target audience or end-user, and what are their specific needs?
- What are the primary goals, success metrics, and high-level objectives?

2. Platform Awareness:
- What tools, technologies, software stacks, or AI platforms will be utilized to build this?
- What are the technical constraints, integrations required, or infrastructure limitations we need to keep in mind?

3. Task Delegation:
- Break this project down into major milestones and actionable tasks.
- Assign clear responsibilities or roles (e.g., what parts will be handled by human team members versus automated AI agents/tools).

---

### PHASE 2: DILIGENCE

4. Creation Diligence:
- What are the quality standards, code reviews, or content validation processes required during development?
- How will we ensure standard operating procedures (SOPs) or best practices are followed during the build phase?

5. Transparency Diligence:
- How will we maintain open documentation, clear communication, and progress tracking for stakeholders?
- What ethical considerations, bias checks, or data privacy rules must be explicitly documented and followed?

6. Deployment Diligence:
- What is the step-by-step testing, QA (Quality Assurance), and rollout strategy before the project goes live?
- What does the post-launch monitoring, feedback loop, and maintenance plan look like to ensure long-term stability?

---

To begin, ask me for the initial details about my project idea, or provide a template for me to fill out so we can kick off Step 1 (Problem Awareness).

---

## Prompt Log

Record every prompt given to AI agents below. Include the date, agent, and purpose.

| Date | Agent | Purpose | Prompt Summary | Action Taken |
|------|-------|---------|----------------|--------------|
| 2026-05-28 | Claude | Initial setup | Replace Doppler with Azure Key Vault, add agents.md | Replaced secrets manager and initialized agents.md |
| 2026-05-28 | Claude | Template updates | Update README, create prompts.md, add PM framework | Updated files and added the PM prompt template |
| 2026-05-30 | Gemini | Update agents.md rules | Add workflow, commit, push, and stage-specific folder mapping rules | Added the workflow mapping rules to agents.md, updated prompts.md structure and logged current task |
| 2026-05-30 | Gemini | Add LLM thinking rule | Rule in agents.md to document the LLM thinking phase in formula folder | Updated agents.md with the thinking phase rule, created 4_Formula/llm_thinking_log.md, and documented the current run |
| 2026-05-30 | Gemini | Template sanity check | Sanity check project template format and self learning capabilities | Created sanity_check_report.md in 7_Testing_Known and logged results |
| 2026-05-30 | Gemini | Open report in Warp | Open the sanity check report in Warp terminal | Ran open -a Warp on the sanity check report |
| 2026-05-30 | Gemini | Create Stage 1 template files | Create templated versions of problem_statement.md, okrs.md, questions.md, and hypotheses.md in 1_Real_Unknown | Created files, committed, and pushed |
| 2026-05-30 | Gemini | Create Stage 2 setup templates | Create templated versions of setup_mac.md, setup_windows.md, setup_ai.md, setup_azure.md in 2_Environment | Created files, committed, and pushed |
| 2026-05-30 | Gemini | Create Stage 3 image prompts template | Create templated file for image_prompts.md in 3_Simulation | Created file, committed, and pushed |
| 2026-05-30 | Gemini | Create Stage 6 template files | Create templated versions of error_log.md, workarounds.md, and gap_analysis.md in 6_Semblance | Created files, committed, and pushed |
| 2026-05-30 | Gemini | Create Stage 7 validation report template | Create templated file for validation_report.md in 7_Testing_Known | Created file, committed, and pushed |
| 2026-05-30 | Gemini | Create root index.html template | Create index.html template with Two-Menu system and cookie persistence | Created index.html, committed, and pushed |
| 2026-05-30 | Gemini | Create missing root templates | Create .env.example, .gitignore, markdown_renderer.html, robots.txt, sitemap.xml templates | Created templates, committed, and pushed |
| 2026-05-30 | Gemini | Add Self-Learning features | Add 7 stages to cognitive steps mapping in README.md and active reflection rules to agent files | Updated README.md, agents.md, claude.md, gemini.md, copilot.md, and kilocode.md |
| 2026-05-30 | Gemini | Add templates and embeds | Create decisions.md, carousel_config.json, and embed educational videos in stage READMEs | Created template files and embedded YouTube links across stages, committed, and pushed |
| 2026-05-30 | Gemini | Open in Antigravity IDE | Open workspace in Antigravity environment | Checked system commands and confirmed workspace is active in the IDE |
| 2026-05-30 | Gemini | Make menu reusable & add GitHub Edit buttons | Create navigation_config.json, configure dynamic fetch in index.html and markdown_renderer.html, and add Github Edit buttons | Created config, refactored menus, and added Edit on GitHub buttons, committed, and pushed |
| 2026-05-30 | Gemini | Create dsl.md domain dictionary | Create dsl.md in 4_Formula to catalog unique domain terminology | Created dsl.md, committed, and pushed |
| 2026-05-31 | Gemini | Add plan kanban template | Create 1_Real_Unknown/kanban.md with usage instructions and basic setup tasks, and link it in navigation and Stage 1 README | Created kanban.md, updated README.md, navigation_config.json, index.html, and markdown_renderer.html, committed, and pushed |
| 2026-05-31 | Gemini | Add plan cost tracking template | Create 1_Real_Unknown/costs.md with cost tracking and token log, and link it in navigation and Stage 1 README | Created costs.md, updated README.md, navigation_config.json, index.html, and markdown_renderer.html, committed, and pushed |
| 2026-05-31 | Gemini | Update git error instructions | Update agents.md, gemini.md, claude.md, copilot.md, and kilocode.md with instructions to proactively resolve git errors | Updated git instructions across all agent md files and committed/pushed |




