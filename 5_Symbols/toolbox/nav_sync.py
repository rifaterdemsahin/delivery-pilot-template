#!/usr/bin/env python3
"""Regenerate the debugMenu in navigation_config.json, index.html, and
5_Symbols/markdown_renderer.html from the single MENU list below (SPEC-001).
Edit MENU, run this script, then run smoke_test.py to validate."""
import json, re, sys

import os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

MENU = [
    ("🎯 1. Real Unknown", "1_Real_Unknown/_README.md"),
    ("   ├─ 🎯 Why", "1_Real_Unknown/Why/_README.md"),
    ("   │  ├─ 📋 Problem Statement", "1_Real_Unknown/Why/problem_statement.md"),
    ("   │  ├─ 📋 Requirements", "1_Real_Unknown/Why/requirements.md"),
    ("   │  ├─ 💡 Hypotheses", "1_Real_Unknown/Why/hypotheses.md"),
    ("   │  └─ ❓ Questions", "1_Real_Unknown/Why/questions.md"),
    ("   ├─ ⚙️ How", "1_Real_Unknown/How/_README.md"),
    ("   │  ├─ 📊 Kanban Board", "1_Real_Unknown/How/kanban.md"),
    ("   │  ├─ 💰 Cost Tracker", "1_Real_Unknown/How/costs.md"),
    ("   │  ├─ ⚠️ Risks", "1_Real_Unknown/How/risks.md"),
    ("   │  ├─ 🔍 Sanity Check Report", "1_Real_Unknown/How/sanity_check_report.md"),
    ("   │  ├─ 🧠 Mindmap & Rationale", "1_Real_Unknown/How/mindmap.md"),
    ("   │  ├─ 📐 Architectural Patterns", "1_Real_Unknown/How/patterns.md"),
    ("   │  └─ 🤖 AI Harness & Triad", "1_Real_Unknown/How/ai_harness.md"),
    ("   └─ 📦 What", "1_Real_Unknown/What/_README.md"),
    ("      ├─ 🎯 OKRs", "1_Real_Unknown/What/okrs.md"),
    ("      ├─ ✅ Tasks & Phases", "1_Real_Unknown/What/tasks.md"),
    ("      ├─ 📝 Todos", "1_Real_Unknown/What/todos.md"),
    ("      └─ 📝 Prompt Log", "1_Real_Unknown/What/prompts.md"),
    ("🛠️ 2. Environment", "2_Environment/_README.md"),
    ("   ├─ ⏰ When", "2_Environment/When/_README.md"),
    ("   │  ├─ 🏗️ Architecture", "2_Environment/When/architecture.md"),
    ("   │  ├─ 📋 Product Rules", "2_Environment/When/product_rules.md"),
    ("   │  ├─ 🧰 Tools Overview", "2_Environment/When/tools.md"),
    ("   │  ├─ 📚 Toolstack & Rationale", "2_Environment/When/toolstack.md"),
    ("   │  ├─ 📦 Dependencies", "2_Environment/When/dependencies.md"),
    ("   │  ├─ 🤖 Setup — AI Stack", "2_Environment/When/setup_ai.md"),
    ("   │  ├─ 🤖 GitHub Agent", "2_Environment/When/github_agent.md"),
    ("   │  ├─ 🔌 MCP Servers", "2_Environment/When/mcp.md"),
    ("   │  ├─ ⚡ Superskills", "2_Environment/When/superskills.md"),
    ("   │  ├─ 🧰 LLM Tools", "2_Environment/When/llm_tools.md"),
    ("   │  ├─ 🧭 Navigation", "2_Environment/When/navigation.md"),
    ("   │  └─ 🔌 Extensions", "2_Environment/When/extensions.md"),
    ("   └─ 🌐 Where", "2_Environment/Where/_README.md"),
    ("      ├─ 📄 GitHub Pages", "2_Environment/Where/github_pages.md"),
    ("      ├─ ⚡ Cloudflare Workers", "2_Environment/Where/cloudflare_workers.md"),
    ("      ├─ 🚀 Fly.io (Deployments)", "2_Environment/Where/fly_io.md"),
    ("      ├─ 🗄️ Supabase (Database)", "2_Environment/Where/supabase.md"),
    ("      ├─ 📊 Axiom (Logs)", "2_Environment/Where/axiom.md"),
    ("      ├─ ☁️ Setup — Azure", "2_Environment/Where/setup_azure.md"),
    ("      ├─ 💻 Local Server", "2_Environment/Where/local_server.md"),
    ("      ├─ 🍎 Setup — Mac", "2_Environment/Where/setup_mac.md"),
    ("      └─ 🪟 Setup — Windows", "2_Environment/Where/setup_windows.md"),
    ("🎨 3. Simulation", "3_Simulation/_README.md"),
    ("   ├─ 🎨 Design Workflow", "3_Simulation/design_workflow.md"),
    ("   ├─ 🖼️ Image Prompts", "3_Simulation/image_prompts.md"),
    ("   ├─ 🧭 Menu Design", "3_Simulation/menu_design.md"),
    ("   └─ 🎠 Excalidraw Carousel", "3_Simulation/excalidraw_carousel.html"),
    ("📐 4. Formula", "4_Formula/_README.md"),
    ("   ├─ 📋 Specs", "4_Formula/specs.md"),
    ("   ├─ 🤔 Decisions", "4_Formula/decisions.md"),
    ("   ├─ 🧠 LLM Thinking Log", "4_Formula/llm_thinking_log.md"),
    ("   ├─ 📝 DSL", "4_Formula/dsl.md"),
    ("   ├─ 🗄️ Database", "4_Formula/database.md"),
    ("   ├─ 🧭 Navigation", "4_Formula/navigation.md"),
    ("   ├─ 📊 Logging & Auto-Fix", "4_Formula/logging_and_autofix.md"),
    ("   ├─ 🤖 Harness (Bot Contract)", "4_Formula/harness.md"),
    ("   ├─ 🤖 Agent Creation", "4_Formula/agent_creation.md"),
    ("   ├─ 🤖 Bot Spec (Template)", "4_Formula/bot_spec.md"),
    ("   ├─ 📊 TOGAF Gap Analysis", "4_Formula/togaf_gap_analysis.md"),
    ("💻 5. Symbols", "5_Symbols/_README.md"),
    ("   ├─ 🚀 Project Code", "5_Symbols/project/_README.md"),
    ("   ├─ 🎛️ DeliveryPilot Tools", "5_Symbols/deliverypilot/_README.md"),
    ("   ├─ 📜 Agent Operating Rules", "5_Symbols/rules/agent_operating_rules.md"),
    ("   ├─ 📝 Coding Standards", "5_Symbols/rules/coding_standards.md"),
    ("   ├─ 🔀 Git Conventions", "5_Symbols/rules/git_conventions.md"),
    ("   ├─ 📁 File Organization", "5_Symbols/rules/file_organization.md"),
    ("🔧 6. Semblance", "6_Semblance/_README.md"),
    ("   ├─ ❌ Error Log", "6_Semblance/error_log.md"),
    ("   ├─ 📊 Gap Analysis", "6_Semblance/gap_analysis.md"),
    ("   ├─ 📚 Lessons Learned", "6_Semblance/lessons_learned.md"),
    ("   ├─ 🔧 Workarounds", "6_Semblance/workarounds.md"),
    ("   ├─ 🧪 Smoke Test Report", "6_Semblance/smoke_test_report.md"),
    ("✅ 7. Testing Known", "7_Testing_Known/_README.md"),
    ("   ├─ 🧪 Smoke Tests", "7_Testing_Known/smoke_tests.md"),
    ("   ├─ 🤖 Harness Slice-2 Report", "7_Testing_Known/harness_slice2_report.md"),
    ("   ├─ 🏅 Golden Task Report", "7_Testing_Known/harness_golden_report.md"),
    ("   ├─ 🧩 Logic Tracker", "7_Testing_Known/logic.md"),
    ("   ├─ ✅ Validation Report", "7_Testing_Known/validation_report.md"),
    ("   ├─ 📋 Sanity Data Source", "7_Testing_Known/sanity_check_report.md"),
    ("---", "divider"),
    ("🎛️ Master Review & Feedback", "5_Symbols/deliverypilot/master_review/index.html"),
    ("🎠 Artifacts Carousel", "5_Symbols/deliverypilot/artifacts_carousel.html"),
    ("📖 agents.md (Coordinator & Personas)", "agents.md"),
    ("⚡ kilocode.md", "kilocode.md"),
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
for f in ("index.html", "5_Symbols/deliverypilot/markdown_renderer.html"):
    p = f"{ROOT}/{f}"
    s = open(p).read()
    s2, n = pat.subn(block, s)
    assert n == 1, f"{f}: expected 1 debugMenu block, found {n}"
    open(p, "w").write(s2)

print("Synced", len(MENU), "debug menu entries across 3 sources.")
