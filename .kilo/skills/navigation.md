# Navigation & Menu Sync Skill

Load this skill when working with project navigation, menus, or configuration synchronization.

## Purpose
Manage the Two-Menu architecture (Project Menu + Debug Menu) and keep all navigation artifacts synchronized.

## Key Files
- `navigation_config.json` — Single source of truth for both menus
- `index.html` — Main page with Project Menu + Debug Menu, includes fallback arrays
- `markdown_renderer.html` — Markdown renderer with Debug Menu, includes fallback arrays

## Rules
1. When adding, modifying, or deleting markdown files in any stage folder, update ALL of:
   - `navigation_config.json` (primary config)
   - `index.html` fallback arrays (search for `const debugMenu = [` and `const projectMenu = [`)
   - `markdown_renderer.html` fallback arrays (same pattern)
2. Debug Menu shows: 7 stages + agent files + tools
3. Project Menu shows: user-facing links (Home, Docs, API)
4. Use tree-style indentation: `   ├─` for sub-items

## Two-Menu Architecture
- **Project Menu**: Always visible at the top, project-specific links for end-users
- **Debug Menu**: Hidden by default, toggled via bottom-right debug button, shows 7 stages + agent files, persists via `debug=true` cookie

## Steps
1. Identify which file was added/modified/deleted
2. Update `navigation_config.json` under the appropriate menu array
3. Update fallback arrays in `index.html` (both projectMenu and debugMenu)
4. Update fallback arrays in `markdown_renderer.html` (both projectMenu and debugMenu)
5. Commit and push changes
