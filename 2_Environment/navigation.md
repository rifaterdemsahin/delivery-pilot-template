# Navigation System — Two-Menu Architecture

## Overview

Every project using this template has **two separate menus**:

| Menu | Purpose | Visibility | Trigger |
|------|---------|------------|---------|
| **Project Menu** | End-user functionality for the project being delivered | Always visible | Default |
| **Debug Menu** | Delivery-pilot framework links (7 stages, agents, tools) | Hidden by default | Debug button (bottom-right) |

## Product Rules (MUST FOLLOW)

### Rule 1: Emojis Required on All Menu Items

**Every menu label** (both project menu and debug menu) **must have a relevant leading emoji**.

- ✅ Good: `🏠 Home`, `🎯 OKRs & Outcomes`, `📊 Progress Dashboard`
- ❌ Bad: `Home`, `OKRs`, `Dashboard`

### Rule 2: Project Menu = OKRs and Outcomes

**The project menu must surface the project's Objectives and Key Results (OKRs) and outcomes**, not template plumbing.

When forks customize this template, the project menu should answer:
- "What are we trying to achieve?" (OKRs)
- "How is progress tracked?" (Dashboard, Kanban)
- "What's the timeline?" (Calendar)
- "What's being delivered?" (Project-specific features)

**Do NOT clutter the project menu with:**
- Delivery-pilot stage folders (1_Real_Unknown, 2_Environment, etc.)
- Template infrastructure (agents.md, debug tools)
- Framework documentation (those belong in the Debug Menu)

### Rule 3: Live Site Prioritizes OKRs; Debug/Template is Background

When the website goes live, **the primary focus is showing that the project is reaching its OKRs**.

- **Primary (prominent):** OKR navigation, project outcomes, user-facing features
- **Secondary (background):** Debug menu, delivery-pilot framework, toolbox items

The delivery-pilot template stays available but secondary:
- Keep debug/delivery-template/toolbox items in a secondary/background area
- Examples: footer link, collapsed Debug section, or clearly labeled secondary menu
- Do NOT compete with OKRs in the main project menu

## Menu 1: Project Menu (Always Visible)

This is what end-users see. It contains:

- Links to the project's own pages and features
- Project-specific navigation (e.g., dashboard, settings, docs)
- **OKRs and outcomes** (the project's goals and progress)
- Nothing related to the delivery-pilot framework
- Does not use markdown-renderer.html
- Actual implementation pages
- Standalone PoC HTML pages
- Named in the relating to the solution domain. queries.html
- Real interactive demos

**This menu changes per project.** It is NOT the framework navigation.

### Default Project Menu (Template Example)

The template provides this OKR-focused default menu. **Forks must customize this** to match their project's actual OKRs:

```json
{
  "projectMenu": [
    {"label": "🏠 Home", "url": "index.html"},
    {"label": "🎯 OKRs & Outcomes", "url": "5_Symbols/markdown_renderer.html?file=1_Real_Unknown/okrs.md"},
    {"label": "📊 Progress Dashboard", "url": "5_Symbols/markdown_renderer.html?file=1_Real_Unknown/kanban.md"},
    {"label": "📅 Calendar", "url": "5_Symbols/calendar_view.html"}
  ]
}
```

**Forks should replace** this with their project's actual OKRs and features. Examples:
- E-commerce: `🛒 Products`, `📦 Orders`, `📊 Sales Dashboard`
- SaaS: `📈 Analytics`, `👥 Users`, `⚙️ Settings`
- Portfolio: `💼 Projects`, `📝 Blog`, `📧 Contact`

## Menu 2: Debug Menu (Hidden by Default)

This is the delivery-pilot framework navigation. It contains:

- Links to all 7 stages (`1_Real_Unknown` through `7_Testing_Known`)
- Agent instruction files (`claude.md`, `gemini.md`, `copilot.md`, `kilocode.md`)
- Framework tools (`agents.md`, `1_Real_Unknown/prompts.md`)
- Search with autocomplete
- **All labels must have emojis** (Rule 1)

### Debug Button

- **Position:** Bottom-right corner of the page (fixed position)
- **Appearance:** Small icon (bug or gear icon)
- **Behavior:** Toggles Debug Menu on/off
- **Persistence:** State saved in `debug=true` cookie

## Debug Menu Contents (JSON Config)

The debug menu is managed centrally by `5_Symbols/toolbox/nav_sync.py`. All labels include emojis:

```json
{
  "debugMenu": [
    { "label": "🎯 1. Real Unknown", "url": "1_Real_Unknown/README.md" },
    { "label": "   ├─ 🎯 OKRs", "url": "1_Real_Unknown/okrs.md" },
    { "label": "   ├─ 📊 Kanban Board", "url": "1_Real_Unknown/kanban.md" },
    { "label": "🛠️ 2. Environment", "url": "2_Environment/README.md" },
    { "label": "🎨 3. Simulation", "url": "3_Simulation/README.md" },
    { "label": "📐 4. Formula", "url": "4_Formula/README.md" },
    { "label": "💻 5. Symbols", "url": "5_Symbols/README.md" },
    { "label": "🔧 6. Semblance", "url": "6_Semblance/README.md" },
    { "label": "✅ 7. Testing Known", "url": "7_Testing_Known/README.md" },
    { "label": "---", "url": "divider" },
    { "label": "📖 agents.md", "url": "agents.md" },
    { "label": "🤖 claude.md", "url": "claude.md" }
  ]
}
```

> The debug menu structure is consistent across all forks. Only the project menu changes per project.

## Calendar View

The template provides a **reusable calendar view component** at `5_Symbols/calendar_view.html`.

### Features

- **Month view:** Visual calendar grid with event dots
- **List view:** Chronological event list with dates and descriptions
- **Event types:** Milestone (purple), Deadline (red), Review (yellow), Deploy (green)
- **Responsive:** Works on desktop and mobile
- **Configurable:** Edit `calendar_config.json` to customize events

### Configuration

Projects can customize the calendar by editing `calendar_config.json`:

```json
{
  "events": [
    {
      "date": "2026-10-05",
      "title": "Formula Specs Approved",
      "description": "Get stakeholder sign-off on all specs",
      "type": "milestone"
    }
  ]
}
```

**Event types:** `milestone`, `deadline`, `review`, `deploy`

### Integration

The calendar is included in the default project menu:

```json
{"label": "📅 Calendar", "url": "5_Symbols/calendar_view.html"}
```

Projects should update `calendar_config.json` to reflect their actual milestones and timelines.

## Implementation Notes

- Both menus use Flexbox/Grid for responsive layout
- Menus read from JSON config (reusable across pages)
- Debug menu is rendered but hidden (`display: none`) until toggled
- Cookie `debug=true` persists debug state across page loads
- No direct link to `5_Symbols/markdown_renderer.html` in either menu
- All menu labels include emojis (Product Rule 1)

## Rules Summary

1. **Emojis Required:** Every menu label (project + debug) must have a relevant leading emoji
2. **Project Menu = OKRs:** Surface project outcomes, not template plumbing
3. **Debug Menu = Background:** Template infrastructure stays secondary/hidden by default
4. **Calendar View:** Use the reusable calendar component for project timelines
5. **Mobile Support:** Both menus must work on mobile (375px viewport)
6. **No Framework in Project Menu:** Delivery-pilot stages belong in Debug Menu only
