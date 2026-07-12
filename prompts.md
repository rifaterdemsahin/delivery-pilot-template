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
| 2026-05-31 | Gemini | Add console logging and menu sync rules | Add debugLog console output in index.html & markdown_renderer.html; write debug menu synchronization rules to agent personas | Added log statements to JS scripts and updated agent md configuration files, committed/pushed |
| 2026-05-31 | Gemini | Add architecture.md and sync rules | Create 2_Environment/architecture.md, add Architecture link to debug menus, write architecture updates sync rule to agent personas | Created architecture.md, updated README.md, navigation_config.json, index.html, markdown_renderer.html, and agent personas |
| 2026-05-31 | Gemini | Add maintenance task section to kanban | Update 1_Real_Unknown/kanban.md to append the ## Maintenance checklist section | Added Maintenance section to kanban.md and committed/pushed |
| 2026-06-07 | Gemini | Document required extensions | Mention the extensions needed to run this project in the formulas folder (such as fly.io, mermaid, azure, etc.) | Created 4_Formula/extensions.md, updated 4_Formula/README.md, navigation_config.json, index.html, and markdown_renderer.html |
| 2026-06-07 | Gemini | Share navigation & Supabase setup | Document shared navigation, configure Supabase with project name reflecting repo name, set up Key Vault credentials | Created 4_Formula/navigation.md and database.md, initialized Supabase config, updated .env.example and menu files |
| 2026-06-07 | Gemini | Add commit review maintenance task | Add maintenance task to review commits, reread, and update Kanban tasks to stay on track | Updated kanban.md to add the maintenance task, mark finished tasks as Done, and add Supabase task |
| 2026-06-19 | Claude | Add Axiom, Supabase, Fly.io tools + tools overview + setup questionnaire | Add Axiom (server-side logs), Supabase (database), Fly.io (container deployments) as tools, create one tools overview doc in 2_Environment, and add setup questions to the /init-project template | Created `2_Environment/axiom.md`, `supabase.md`, `tools.md`; updated `fly_io.md`, `architecture.md`, `2_Environment/README.md`, `.env.example`, `navigation_config.json`, `index.html`, `markdown_renderer.html`, `claude.md`, and `init-project.md` (setup questionnaire); committed and pushed |







| 2026-06-19 | Claude | Create logging & nightly auto-fix formula | Formula doc to manage frontend logs via footer debug feature + Axiom backend logs, plus a nightly continuous-fix agent that finds and fixes errors when not actively coding | Created 4_Formula/logging_and_autofix.md; updated 4_Formula/README.md, navigation_config.json, index.html, markdown_renderer.html; committed and pushed |
| 2026-07-11 | Kilo | Create skills, specs system, and design-first workflow | Create .kilo/skills/ for on-demand context loading instead of loading full context every time; document specs system in 4_Formula/specs.md with spec-check and warn mechanism; create design-first rule: image-based designs in 3_Simulation + specs in 4_Formula before delivering implementation in 5_Symbols | Created kilo.json, 5 skill files (navigation, planning, simulation, deploy, secrets), 4_Formula/specs.md, 3_Simulation/design_workflow.md; updated agents.md, claude.md, gemini.md, kilocode.md, copilot.md, navigation_config.json, index.html, markdown_renderer.html, 3_Simulation/README.md, 4_Formula/README.md; committed and pushed all individually |
| 2026-07-11 | Kilo | Encode 7-stage execution flow with architectural blueprints | When getting tasks: scan and map to 1_Real_Unknown (OKRs) → update 2_Environment blueprints (Mermaid/Excalidraw, always versioned) → design new versions in 3_Simulation → specs and approval in 4_Formula → implement in 5_Symbols → test in 7_Testing_Known → fix and resolve in 6_Semblance | Updated agents.md, claude.md, gemini.md, kilocode.md, copilot.md with the full 7-stage cycle; committed and pushed all individually |
| 2026-07-11 | Kilo | Add approval cascade rule (1+2 gates 3+4) | When changes happen in 1_Real_Unknown or 2_Environment, mention the changes and get approvals. These approved changes cascade into updates in 3_Simulation and 4_Formula before any code is written. | Updated agents.md, claude.md, gemini.md, kilocode.md, copilot.md, .kilo/skills/planning.md with the approval cascade rule; committed and pushed all individually |
| 2026-07-11 | Kilo | Specs outline stage dependencies + dependencies doc | Add SPEC-006 outlining how 1_Real_Unknown, 2_Environment, and 3_Simulation relate and feed each other. Create 2_Environment/dependencies.md documenting libraries, packages, cross-dependency matrix, and how they affect building/delivering the project. | Added SPEC-006 to 4_Formula/specs.md; created 2_Environment/dependencies.md with dependency chain, cross-dependency matrix, upgrade impact guide, and build flow; updated 2_Environment/README.md, navigation_config.json, index.html, markdown_renderer.html; committed and pushed all individually |
| 2026-07-11 | Kilo | Add smoke tests, GitHub Issues integration, and 6_Semblance reporting | When building functionality, run smoke tests that open pages and check for errors. Report errors to GitHub Issues. Resolve issues and add a smoke test report to 6_Semblance/. | Created 7_Testing_Known/smoke_tests.md with smoke test flow, GitHub Issues template, and report format; updated agents.md, claude.md, gemini.md, kilocode.md, copilot.md with Smoke Tests & GitHub Issues rule; updated .kilo/skills/deploy.md with smoke test gate; updated navigation_config.json, index.html, markdown_renderer.html, 7_Testing_Known/README.md; committed and pushed all individually |
| 2026-07-11 | Kilo | Document Kilo Code local nomic text indexing vs Qdrant | Use Kilo Code built-in nomic text indexing for semantic search in smaller projects with delivery-pilot-template. Only use Qdrant with big repos. | Updated 2_Environment/setup_ai.md with two-tier AI stack (Tier 1: Kilo Code local indexing default, Tier 2: Qdrant for big repos), decision flow diagram, and updated verification checklist; updated 2_Environment/tools.md and 2_Environment/dependencies.md to reflect the guidance; committed and pushed all individually |
| 2026-07-11 | Kilo | Position agents.md as coordinator with LLM model switching and persona file generation | agents.md is the coordinator (single source of truth, stays constant). When switching LLMs (Claude → DeepSeek → GPT), generate matching persona files. Code updates to match LLM standards. | Updated agents.md: repositioned as coordinator, explained Supported Agents as LLM-specific persona files that inherit coordinator rules, added LLM Model Switching section with persona file generation instructions, added model switching rule to Agent Rules; committed and pushed |
| 2026-07-11 | Kilo | Create 5_Symbols/rules/ subfolder with coding rules | Define coding rules in 5_Symbols/rules/ subfolder. Update related places (navigation, agent files, READMEs). | Created 5_Symbols/rules/ with coding_standards.md (HTML/CSS/JS conventions), git_conventions.md (commit messages, branch management), file_organization.md (directory structure, module splitting); updated 5_Symbols/README.md, navigation_config.json, index.html, markdown_renderer.html, agents.md, claude.md, gemini.md, kilocode.md, copilot.md to reference the rules; committed and pushed all individually |
| 2026-07-11 | Kilo | Add error-fixing agent skill with GitHub token integration | Mention an agent in tests that finds errors, visits pages, opens GitHub Issues, fixes them, and reports. Uses GitHub tokens. Also document in environment folder. | Updated smoke_tests.md with Error-Fixing Agent section; created 2_Environment/github_agent.md with full token setup, agent capabilities, workflow, and integration points; created .kilo/skills/error-fix.md skill with page scanning, GitHub Issue creation, fix application, and reporting workflow; updated tools.md (tools table), 2_Environment/README.md, navigation_config.json, index.html, markdown_renderer.html; committed and pushed all individually |
| 2026-07-11 | Kilo | Document MCP servers and superskills requirements in environment | Create mcp.md with MCP server requirements (GitHub, Azure KV, Browser, Supabase, Axiom, Fly.io, Qdrant) and stage mapping. Create superskills.md with superskills catalog (6 project skills + system skills), dependencies, and stage mapping. | Created 2_Environment/mcp.md with required/recommended MCP servers, configuration, and MCP→Stage mapping; created 2_Environment/superskills.md with skill catalog, skill dependencies, skill loading workflow, and skill→Stage mapping; updated 2_Environment/README.md, tools.md (2 new rows), navigation_config.json, index.html, markdown_renderer.html; committed and pushed all individually |
| 2026-07-11 | Kilo | Create toolstack.md with tool rationale in markdown table | Document every tool in the project with its purpose and the rationale behind choosing it in a markdown table. Include decision principles and stack evolution log. | Created 2_Environment/toolstack.md with Full Toolstack table (15 tools, 5 columns: Tool/Category/Purpose/Rationale), Decision Principles table, Stack Evolution Log, and tool addition workflow; updated 2_Environment/README.md, navigation_config.json, index.html, markdown_renderer.html; committed and pushed all individually |
| 2026-07-11 | Kilo | Create risks.md in 1_Real_Unknown with active risks, solved risks, and update log | Create a risk register. With every update, add new risks and mention the ones that are solved. | Created 1_Real_Unknown/risks.md with 8 active risks (R-001 to R-008) from critical to low, 6 solved risks (R-S01 to R-S06), risk matrix, mitigation strategies, and risk update log; updated 1_Real_Unknown/README.md, navigation_config.json, index.html, markdown_renderer.html; committed and pushed all individually |
| 2026-07-11 | Kilo | Add semantic search responsibility to Environment Agent | Environment Agent manages semantic search (Kilo Code local indexing / Qdrant), reports operational status. Agents use it for efficient context retrieval instead of loading full context into memory. | Updated agents.md (Stage Agents table, Rules Summary, execution flow step 2) and all 4 persona files with semantic search management and operational status reporting; committed and pushed all individually |
| 2026-07-11 | Kilo | Create stage agents architecture (7 dedicated agents, one per folder) with evolved responsibilities | Define 7 agents: Real (OKRs, evolves responsibility — updates risks.md, applies mitigations), Environment (architectural requirements, semantic search), Simulation (visual designs with versions), Formula (specs based on requirements + simulations, versions), Symbols (writes code from Real/Environment/Formula), Test (tests codebase, smoke tests, code reviews), Semblance (documents errors with Test, feeds back to Real). Agents communicate through llm_thinking_log.md. | Added Stage Agents section to agents.md with agent table (7 rows), communication diagram, agent rules summary table; updated 7-stage execution flow and all 4 persona files with → Agent references, code review, evolved responsibility, and semantic search; committed and pushed all individually |
| 2026-07-11 | Kilo | Add code drift detection to Formula Agent responsibility | Formula Agent must identify when code in 5_Symbols deviates from active specs in specs.md, flag with [DRIFT], and document the gap. | Updated AGENTS.md (3 locations: agents table, rules summary, execution flow), all 4 persona files (execution flow step 4), 4_Formula/specs.md (added rule 5 + SPEC-007), .kilo/skills/planning.md (drift detection bullet); committed and pushed
| 2026-07-11 | Kilo | Add token usage monitoring to Environment Agent + fix agent end-to-end testing to Test Agent | Environment Agent monitors token usage and warns on cost spikes. Test Agent runs the Semblance fix agent for end-to-end tests and fixes errors along the way. | Updated AGENTS.md (3+3 locations), all 4 persona files (step 2 + step 6), 1_Real_Unknown/costs.md (monitoring thresholds + spike alert log), 4_Formula/llm_thinking_log.md, prompts.md; committed and pushed
| 2026-07-12 | Claude | Run project sanity check and report in 1_Real_Unknown | Real Agent sanity check sub-agent scans full project — structure, nav sync, links, secrets, CI/CD — and produces a delivery-correctness report in the Real folder | Created 1_Real_Unknown/sanity_check_report.md (13 passes, 4 findings incl. missing GitHub Actions workflow); updated risks.md (new R-009, R-003 evidence); synced debug menu in navigation_config.json, index.html, markdown_renderer.html; committed and pushed each step |
| 2026-07-12 | Claude | Smoke test runner + menu backfill + sanity loop (tasks 1–4) | Task 1: template-adapted smoke test that scans pages and generates 6_Semblance/smoke_test_report.md; Task 2: add absent files to debug menu; Task 3: canonical sanity report in 1_Real_Unknown consuming 7_Testing_Known data (7→1 loop); Task 4: update the Stage-1 sanity report | Added SPEC-008/SPEC-009 + thinking log; built 5_Symbols/toolbox/smoke_test.py (10/10 local, 11/11 cloud) which caught+fixed issue #1 (folder links 404 on Pages); backfilled 27 docs into all 3 nav sources; archived old Stage-7 report to _obsolete and made it the data-source doc; report rev 2 all-resolved; risks R-003/R-009 solved, R-007 downgraded; error/fix logs + retrospective updated; committed and pushed each step |
