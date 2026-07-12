#!/usr/bin/env python3
"""Regenerate the debugMenu in navigation_config.json, index.html, and
5_Symbols/markdown_renderer.html from the single MENU list below (SPEC-001).
Edit MENU, run this script, then run smoke_test.py to validate."""
import json, re, sys

import os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

MENU = [
    ("1. Real Unknown", "1_Real_Unknown/README.md"),
    ("   ├─ Problem Statement", "1_Real_Unknown/problem_statement.md"),
    ("   ├─ OKRs", "1_Real_Unknown/okrs.md"),
    ("   ├─ Hypotheses", "1_Real_Unknown/hypotheses.md"),
    ("   ├─ Questions", "1_Real_Unknown/questions.md"),
    ("   ├─ Kanban Board", "1_Real_Unknown/kanban.md"),
    ("   ├─ Tasks & Phases", "1_Real_Unknown/tasks.md"),
    ("   ├─ Cost Tracker", "1_Real_Unknown/costs.md"),
    ("   ├─ Risks", "1_Real_Unknown/risks.md"),
    ("   ├─ Sanity Check Report", "1_Real_Unknown/sanity_check_report.md"),
    ("   ├─ Prompt Log", "1_Real_Unknown/prompts.md"),
    ("2. Environment", "2_Environment/README.md"),
    ("   ├─ Architecture", "2_Environment/architecture.md"),
    ("   ├─ Tools Overview", "2_Environment/tools.md"),
    ("   ├─ Toolstack & Rationale", "2_Environment/toolstack.md"),
    ("   ├─ Dependencies", "2_Environment/dependencies.md"),
    ("   ├─ Setup — Mac", "2_Environment/setup_mac.md"),
    ("   ├─ Setup — Windows", "2_Environment/setup_windows.md"),
    ("   ├─ Setup — AI Stack", "2_Environment/setup_ai.md"),
    ("   ├─ Setup — Azure", "2_Environment/setup_azure.md"),
    ("   ├─ GitHub Pages", "2_Environment/github_pages.md"),
    ("   ├─ Cloudflare Workers", "2_Environment/cloudflare_workers.md"),
    ("   ├─ Fly.io (Deployments)", "2_Environment/fly_io.md"),
    ("   ├─ Supabase (Database)", "2_Environment/supabase.md"),
    ("   ├─ Axiom (Logs)", "2_Environment/axiom.md"),
    ("   ├─ GitHub Agent", "2_Environment/github_agent.md"),
    ("   ├─ MCP Servers", "2_Environment/mcp.md"),
    ("   ├─ Superskills", "2_Environment/superskills.md"),
    ("   ├─ LLM Tools", "2_Environment/llm_tools.md"),
    ("   ├─ Navigation", "2_Environment/navigation.md"),
    ("3. Simulation", "3_Simulation/README.md"),
    ("   ├─ Design Workflow", "3_Simulation/design_workflow.md"),
    ("   ├─ Image Prompts", "3_Simulation/image_prompts.md"),
    ("4. Formula", "4_Formula/README.md"),
    ("   ├─ Specs", "4_Formula/specs.md"),
    ("   ├─ Decisions", "4_Formula/decisions.md"),
    ("   ├─ LLM Thinking Log", "4_Formula/llm_thinking_log.md"),
    ("   ├─ DSL", "4_Formula/dsl.md"),
    ("   ├─ Database", "4_Formula/database.md"),
    ("   ├─ Extensions", "4_Formula/extensions.md"),
    ("   ├─ Navigation", "4_Formula/navigation.md"),
    ("   ├─ Logging & Auto-Fix", "4_Formula/logging_and_autofix.md"),
    ("   ├─ Agent Creation", "4_Formula/agent_creation.md"),
    ("5. Symbols", "5_Symbols/README.md"),
    ("   ├─ Coding Standards", "5_Symbols/rules/coding_standards.md"),
    ("   ├─ Git Conventions", "5_Symbols/rules/git_conventions.md"),
    ("   ├─ File Organization", "5_Symbols/rules/file_organization.md"),
    ("6. Semblance", "6_Semblance/README.md"),
    ("   ├─ Error Log", "6_Semblance/error_log.md"),
    ("   ├─ Gap Analysis", "6_Semblance/gap_analysis.md"),
    ("   ├─ Lessons Learned", "6_Semblance/lessons_learned.md"),
    ("   ├─ Workarounds", "6_Semblance/workarounds.md"),
    ("   ├─ Smoke Test Report", "6_Semblance/smoke_test_report.md"),
    ("7. Testing Known", "7_Testing_Known/README.md"),
    ("   ├─ Smoke Tests", "7_Testing_Known/smoke_tests.md"),
    ("   ├─ Logic Tracker", "7_Testing_Known/logic.md"),
    ("   ├─ Validation Report", "7_Testing_Known/validation_report.md"),
    ("   ├─ Sanity Data Source", "7_Testing_Known/sanity_check_report.md"),
    ("---", "divider"),
    ("agents.md", "agents.md"),
    ("claude.md", "claude.md"),
    ("gemini.md", "gemini.md"),
    ("copilot.md", "copilot.md"),
    ("kilocode.md", "kilocode.md"),
]

# 1. navigation_config.json
cfg_path = f"{ROOT}/navigation_config.json"
cfg = json.load(open(cfg_path))
cfg["debugMenu"] = [{"label": l, "url": u} for l, u in MENU]
lines = ['{', '  "projectMenu": [']
lines += [f'    {json.dumps(e, ensure_ascii=False)},' for e in cfg["projectMenu"]]
lines[-1] = lines[-1].rstrip(',')
lines += ['  ],', '  "debugMenu": [']
lines += [f'    {json.dumps(e, ensure_ascii=False)},' for e in cfg["debugMenu"]]
lines[-1] = lines[-1].rstrip(',')
lines += ['  ]', '}', '']
open(cfg_path, "w").write("\n".join(lines))
json.load(open(cfg_path))  # validate

# 2 & 3. HTML fallback arrays
js_lines = ",\n".join(
    f'        {{ label: {json.dumps(l, ensure_ascii=False)}, url: {json.dumps(u, ensure_ascii=False)} }}'
    for l, u in MENU
)
block = f"debugMenu: [\n{js_lines}\n      ]"
pat = re.compile(r"debugMenu: \[.*?\n      \]", re.DOTALL)
for f in ("index.html", "5_Symbols/markdown_renderer.html"):
    p = f"{ROOT}/{f}"
    s = open(p).read()
    s2, n = pat.subn(block, s)
    assert n == 1, f"{f}: expected 1 debugMenu block, found {n}"
    open(p, "w").write(s2)

print("Synced", len(MENU), "debug menu entries across 3 sources.")
