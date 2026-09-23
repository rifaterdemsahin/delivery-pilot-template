# Product Rules — Template Customization Guide

> **Stage 2 of 7 (Environment):** Product rules that all forks of delivery-pilot-template must follow. Read this when customizing the template for a new project.

Related: [`navigation.md`](./navigation.md) · [`toolstack.md`](./toolstack.md) · [`README.md`](../README.md)

---

## Overview

The delivery-pilot-template has four **mandatory product rules** that all forks must follow. These rules ensure that:
1. Navigation is visual and easy to scan
2. Live projects showcase **outcomes and OKRs**, not template plumbing
3. Template infrastructure stays available but secondary
4. Project timelines are easy to visualize

---

## Rule 1: Emojis Required on All Menu Items

**Every menu label** (both project menu and debug menu) **must have a relevant leading emoji**.

### Why?

Emojis make navigation:
- More visual and scannable
- Easier to identify at a glance
- More modern and accessible
- Memorable (users remember "🎯 OKRs" better than "OKRs")

### How?

✅ **Good examples:**
```json
{
  "projectMenu": [
    {"label": "🏠 Home", "url": "index.html"},
    {"label": "🎯 OKRs & Outcomes", "url": "..."},
    {"label": "📊 Progress Dashboard", "url": "..."},
    {"label": "📅 Calendar", "url": "..."}
  ]
}
```

❌ **Bad examples (no emojis):**
```json
{
  "projectMenu": [
    {"label": "Home", "url": "index.html"},
    {"label": "OKRs", "url": "..."}
  ]
}
```

### Debug Menu (Emojis Already Added)

The debug menu is managed centrally by `5_Symbols/toolbox/nav_sync.py` and already includes emojis:
- 🎯 1. Real Unknown
- 🛠️ 2. Environment
- 🎨 3. Simulation
- 📐 4. Formula
- 💻 5. Symbols
- 🔧 6. Semblance
- ✅ 7. Testing Known

When adding new pages to the debug menu, always include an emoji.

---

## Rule 2: Project Menu = OKRs & Outcomes

The **project menu** (always-visible top navigation) must surface the project's **Objectives and Key Results (OKRs)** and outcomes — NOT template plumbing.

### Why?

When users land on your live site, the primary focus should be:
- **What are you trying to achieve?** (OKRs)
- **How is progress tracked?** (Dashboard, Kanban)
- **What's the timeline?** (Calendar)
- **What's being delivered?** (Project-specific features)

Template infrastructure (7-stage folders, agents.md, debug tools) belongs in the **Debug Menu** (bottom-right button), not the project menu.

### How?

#### Template Default (OKR-focused example)

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

This template default **must be customized** for each project.

#### Customization Examples

**E-commerce project:**
```json
{
  "projectMenu": [
    {"label": "🏠 Home", "url": "index.html"},
    {"label": "🎯 Sales Goals", "url": "okrs.html"},
    {"label": "🛒 Products", "url": "products.html"},
    {"label": "📦 Orders", "url": "orders.html"},
    {"label": "📊 Analytics", "url": "analytics.html"}
  ]
}
```

**SaaS project:**
```json
{
  "projectMenu": [
    {"label": "🏠 Home", "url": "index.html"},
    {"label": "🎯 Growth Metrics", "url": "okrs.html"},
    {"label": "📈 Analytics", "url": "analytics.html"},
    {"label": "👥 Users", "url": "users.html"},
    {"label": "⚙️ Settings", "url": "settings.html"}
  ]
}
```

**Portfolio project:**
```json
{
  "projectMenu": [
    {"label": "🏠 Home", "url": "index.html"},
    {"label": "💼 Projects", "url": "projects.html"},
    {"label": "📝 Blog", "url": "blog.html"},
    {"label": "📧 Contact", "url": "contact.html"}
  ]
}
```

### What NOT to Put in Project Menu

❌ **Do NOT include:**
- Delivery-pilot stage folders (1_Real_Unknown, 2_Environment, etc.)
- Template infrastructure (agents.md, claude.md, debug tools)
- Framework documentation (those belong in Debug Menu)
- Internal tooling (nav_sync, smoke tests, etc.)

✅ **Do include:**
- Project OKRs and goals
- User-facing features
- Project-specific pages
- Progress dashboards
- Project calendar

---

## Rule 3: Template Infrastructure is Background

The delivery-pilot template (debug menu, delivery-template chrome, toolbox/nav sync internals) stays **available but secondary**.

### Why?

When the website goes live, the **primary focus is showing that the project is reaching its OKRs**. Template infrastructure is helpful for developers and AI agents but should not compete with OKRs in the main navigation.

### How?

#### Primary (Prominent)
- OKR navigation
- Project outcomes
- User-facing features
- Progress dashboards
- Project-specific pages

#### Secondary (Background)
- Debug menu (bottom-right button, hidden by default)
- Delivery-pilot framework (7 stages)
- Toolbox items (nav_sync, smoke tests)
- Agent instructions (agents.md, claude.md, etc.)

#### Implementation

The template uses a **two-menu architecture**:

| Menu | Visibility | Purpose |
|------|------------|---------|
| **Project Menu** | Always visible (top) | OKRs, project features, outcomes |
| **Debug Menu** | Hidden by default (bottom-right button) | Template infrastructure, 7 stages |

**Debug Menu Access:**
- Bottom-right floating button (bug icon 🐛)
- Click to toggle visibility
- State persists via cookie (`debug=true`)
- Includes search/autocomplete

---

## Rule 4: Calendar View for Schedules

This template includes a **reusable calendar view component** for visualizing project timelines.

### Why?

Dates and schedules are easier to digest visually (month/week grid) than as a long markdown list. The calendar view provides:
- Month grid view with event dots
- List view for chronological events
- Color-coded event types (milestone, deadline, review, deploy)
- Responsive design (desktop + mobile)

### How?

#### 1. Include Calendar in Project Menu

```json
{"label": "📅 Calendar", "url": "5_Symbols/calendar_view.html"}
```

#### 2. Configure Events

Edit `calendar_config.json` at the repo root:

```json
{
  "events": [
    {
      "date": "2026-10-05",
      "title": "Formula Specs Approved",
      "description": "Get stakeholder sign-off on all specs",
      "type": "milestone"
    },
    {
      "date": "2026-10-10",
      "title": "First Deploy",
      "description": "Deploy initial prototype to GitHub Pages",
      "type": "deploy"
    }
  ]
}
```

#### 3. Event Types

| Type | Color | Use For |
|------|-------|---------|
| `milestone` | Purple (🟣) | Major achievements, stage completions |
| `deadline` | Red (🔴) | Hard deadlines, deliverable due dates |
| `review` | Yellow (🟡) | Code reviews, design reviews, checkpoints |
| `deploy` | Green (🟢) | Deployments, releases, launches |

#### 4. Customization

Projects can:
- **Use as-is:** Edit `calendar_config.json` with project events
- **Integrate with tasks:** Pull events from `1_Real_Unknown/tasks.md` or `kanban.md`
- **Connect to APIs:** Modify `calendar_view.html` to fetch from external sources
- **Add event types:** Extend with custom colors and categories

---

## Checklist for New Projects

When forking delivery-pilot-template for a new project:

### Navigation (Rules 1-3)
- [ ] Update `navigation_config.json` project menu with OKR-focused items
- [ ] Every label has a relevant leading emoji (both project + debug menus)
- [ ] No template infrastructure (7 stages, agents.md) in project menu
- [ ] Debug menu stays accessible via bottom-right button
- [ ] Test mobile responsiveness (375px viewport)

### Calendar (Rule 4)
- [ ] Update `calendar_config.json` with project milestones and deadlines
- [ ] Include calendar in project menu: `{"label": "📅 Calendar", "url": "5_Symbols/calendar_view.html"}`
- [ ] Verify event types match project needs (milestone, deadline, review, deploy)
- [ ] Test calendar on desktop and mobile

### Documentation
- [ ] Update `1_Real_Unknown/okrs.md` with actual project OKRs
- [ ] Update `1_Real_Unknown/kanban.md` with project tasks
- [ ] Customize `README.md` with project-specific information
- [ ] Remove template placeholders (replace "Delivery Pilot Template" with project name)

### Validation
- [ ] Run `python3 5_Symbols/toolbox/nav_sync.py` after any menu changes
- [ ] Run `python3 5_Symbols/toolbox/smoke_test.py` to validate pages
- [ ] Test navigation on live GitHub Pages
- [ ] Verify debug menu toggle works

---

## Related Documentation

- [`navigation.md`](./navigation.md) — Two-menu architecture deep dive
- [`README.md`](../README.md) — Template overview and product rules summary
- [`1_Real_Unknown/okrs.md`](../1_Real_Unknown/okrs.md) — OKR framework and examples
- [`5_Symbols/toolbox/nav_sync.py`](../5_Symbols/toolbox/nav_sync.py) — Navigation sync script
- [`.claude/skills/nav-sync/SKILL.md`](../.claude/skills/nav-sync/SKILL.md) — Nav sync skill for agents

---

## Agent Instructions

AI agents working on forks must:
1. Always add emojis to new menu items
2. Keep project menu focused on OKRs and outcomes
3. Never put template infrastructure in project menu
4. Update `calendar_config.json` when adding milestones or deadlines
5. Run `nav_sync.py` after menu changes
6. Validate with smoke tests before committing

See [`5_Symbols/rules/agent_operating_rules.md`](../5_Symbols/rules/agent_operating_rules.md) for full agent rules.
