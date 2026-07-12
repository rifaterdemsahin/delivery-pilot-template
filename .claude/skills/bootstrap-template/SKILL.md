---
name: bootstrap-template
description: Bootstrap a new project from delivery-pilot-template — replace placeholders, reset stage content, rebuild navigation, validate, and deploy. Use when starting a new project from this template or when asked to adapt the template for a consumer project.
---

# 🚀 Bootstrap a Project From This Template

Full procedure lives in the "Using This Template" section of `agents.md` (SPEC-010). Summary:

## Steps

1. **Replace the six placeholders** everywhere (search current template values):
   `{{PROJECT_NAME}}`, `{{GITHUB_USER}}`, `{{REPO_NAME}}`, `{{PAGES_URL}}`, `{{LINKEDIN_URL}}`, `{{YOUTUBE_URL}}` — they appear in `README.md`, `index.html`, `sitemap.xml`, `robots.txt`, `2_Environment/supabase/config.toml`. Runtime code (renderer, toolbox scripts) is template-neutral and needs no edits.
2. **Reset stage content, keep structure**: fresh `1_Real_Unknown/` (problem statement, OKRs, tasks, risks, prompts log), trim project-specific specs from `4_Formula/specs.md` (keep framework specs + template), empty `6_Semblance/` logs.
3. **Rebuild navigation**: edit `MENU` in `5_Symbols/toolbox/nav_sync.py`, run it (see `/nav-sync`).
4. **Validate**: `python3 5_Symbols/toolbox/smoke_test.py` must pass 10/10 (see `/smoke-test`).
5. **Deploy**: enable GitHub Pages (Source: GitHub Actions); `.github/workflows/static.yml` gates on smoke tests then deploys. Verify with `--base-url <PAGES_URL>`.
6. **Adopt the persona**: read `agents.md` + the persona file for your model, then begin the 7-stage flow at `1_Real_Unknown`.
