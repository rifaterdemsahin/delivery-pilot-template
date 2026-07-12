---
name: nav-sync
description: Regenerate the debug menu across navigation_config.json, index.html, and 5_Symbols/markdown_renderer.html from one source list. Use whenever a markdown file is added, renamed, moved, or deleted in any stage folder, or when the menus have drifted.
---

# 🧭 Navigation Sync

The debug menu lives in **three places** that must stay identical: `navigation_config.json`, the fallback array in `index.html`, and the fallback array in `5_Symbols/markdown_renderer.html`. Never edit them by hand — regenerate them.

## Steps

1. Edit the `MENU` list in `5_Symbols/toolbox/nav_sync.py`:
   - Stage section headers link to the stage `README.md` (never a bare directory — those 404 on GitHub Pages; see issue #1).
   - Entries use root-relative paths (e.g. `1_Real_Unknown/risks.md`); each page adapts them at render time.
   - Sub-items use the `   ├─ Label` prefix convention.
2. Run:
   ```bash
   python3 5_Symbols/toolbox/nav_sync.py
   ```
3. Validate (the runner checks "Nav 3-Way Sync" and "Stage Docs In Menu"):
   ```bash
   python3 5_Symbols/toolbox/smoke_test.py --trigger "nav sync"
   ```
4. Commit all three regenerated files together in one commit.
