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

