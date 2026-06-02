# 📓 Lessons Learned & Active Reflection Journal

> This log captures retrospectives, insights, and lessons learned during development milestones.

---

## 📅 2026-05-31: Stage 1 Kanban Implementation & Navigation Setup

### What went well
- Created a standard Markdown-based `kanban.md` that traces tasks back to the 7-Stage Framework.
- Updated the centralized navigation menus (`navigation_config.json`, fallback JSON objects in `index.html`, and `markdown_renderer.html`) to expose the Kanban board as a direct debug option.
- Verified how `markdown_renderer.html` resolves directory paths (defaults to `README.md`) and correctly formatted links.

### Gaps & Challenges
- Navigation fallbacks are duplicated in `index.html` and `markdown_renderer.html`. In the future, it might be cleaner to isolate the fallback menu logic to a shared JS utility, but keeping them synchronized manually works for now and maintains resilience.

### Takeaway for Future AI Agents
- When completing tasks, make sure to update the status of the tasks in `1_Real_Unknown/kanban.md` using matching commit messages.

## 📅 2026-05-31: Stage 1 Cost Tracker Setup

### What went well
- Established a unified structure to track both system infrastructure costs and API token consumption in `1_Real_Unknown/costs.md`.
- Kept navigation fallbacks in sync so that the project menu operates reliably.

### Gaps & Challenges
- Estimates for Key Vault and container execution can fluctuate. Agents should update the log on every significant run/operation to prevent budget surprises.

## 📅 2026-05-31: Agent Git Rule & Error Resolution Update

### What went well
- Clarified the requirement for git error resolution across all core agent documentation (`agents.md`, `gemini.md`, `claude.md`, `copilot.md`, `kilocode.md`).
- Practiced granular commit-and-push cycles for each file modification.

### Gaps & Challenges
- None. Maintaining step-by-step git push commands helps identify remote changes or conflicts early.

## 📅 2026-05-31: Console Debugging & Debug Menu Sync Update

### What went well
- Added custom `debugLog` function to output descriptive messages into browser console when debug mode (`debug=true` cookie) is active.
- Documented Debug Menu synchronization rule across all agent personas to prevent stale menu links when markdown documents are added or updated.

### Gaps & Challenges
- Since debug console logs only print when the debug cookie is active, it protects console cleanliness for standard users while providing rich instrumentation for developers.

## 📅 2026-05-31: Architecture Setup & Sync Rules Update

### What went well
- Created a comprehensive `2_Environment/architecture.md` containing dynamic Mermaid charts showing system components (GitHub Pages, Cloudflare Workers, Fly.io, Azure Key Vault, GitHub Actions).
- Standardized rules in `agents.md` and agent profiles instructing teams to update `architecture.md` as soon as system configurations change.

### Gaps & Challenges
- None. Ensuring all components are mapped visually helps human stakeholders and subsequent AI agents maintain correct contextual orientation.

## 📅 2026-05-31: Kanban Maintenance Section Added

### What went well
- Appended the 7-stage folder structure maintenance checklist directly into `1_Real_Unknown/kanban.md` as requested.
- Tracked this update in the logs to maintain proper execution transparency.

### Gaps & Challenges
- None. Having this checklist helps ensure each stage directory is systematically maintained during development runs.
