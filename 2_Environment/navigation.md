# Navigation System — Two-Menu Architecture

## Overview

Every project using this template has **two separate menus**:

| Menu | Purpose | Visibility | Trigger |
|------|---------|------------|---------|
| **Project Menu** | End-user functionality for the project being delivered | Always visible | Default |
| **Debug Menu** | Delivery-pilot framework links (7 stages, agents, tools) | Hidden by default | Debug button (bottom-right) |

## Menu 1: Project Menu (Always Visible)

This is what end-users see. It contains:

- Links to the project's own pages and features
- Project-specific navigation (e.g., dashboard, settings, docs)
- Nothing related to the delivery-pilot framework
- Does not use markdown-renderer.html
- Actual implementation pages

**This menu changes per project.** It is NOT the framework navigation.

## Menu 2: Debug Menu (Hidden by Default)

This is the delivery-pilot framework navigation. It contains:

- Links to all 7 stages (`1_Real_Unknown` through `7_Testing_Known`)
- Agent instruction files (`claude.md`, `gemini.md`, `copilot.md`, `kilocode.md`)
- Framework tools (`agents.md`, `prompts.md`)
- Search with autocomplete

### Debug Button

- **Position:** Bottom-right corner of the page (fixed position)
- **Appearance:** Small icon (bug or gear icon)
- **Behavior:** Toggles Debug Menu on/off
- **Persistence:** State saved in `debug=true` cookie

## Debug Menu Contents (JSON Config)

```json
{
  "debugMenu": [
    { "label": "1. Real Unknown", "url": "1_Real_Unknown/" },
    { "label": "2. Environment", "url": "2_Environment/" },
    { "label": "3. Simulation", "url": "3_Simulation/" },
    { "label": "4. Formula", "url": "4_Formula/" },
    { "label": "5. Symbols", "url": "5_Symbols/" },
    { "label": "6. Semblance", "url": "6_Semblance/" },
    { "label": "7. Testing Known", "url": "7_Testing_Known/" },
    { "label": "---", "url": "---" },
    { "label": "agents.md", "url": "agents.md" },
    { "label": "prompts.md", "url": "prompts.md" },
    { "label": "claude.md", "url": "claude.md" },
    { "label": "gemini.md", "url": "gemini.md" },
    { "label": "copilot.md", "url": "copilot.md" },
    { "label": "kilocode.md", "url": "kilocode.md" }
  ]
}
```

## Project Menu Contents (JSON Config)

```json
{
  "projectMenu": [
    { "label": "Home", "url": "/" },
    { "label": "Docs", "url": "/docs" },
    { "label": "API", "url": "/api" }
  ]
}
```

> The project menu is customized per project. The debug menu is always the same.

## Implementation Notes

- Both menus use Flexbox/Grid for responsive layout
- Menus read from JSON config (reusable across pages)
- Debug menu is rendered but hidden (`display: none`) until toggled
- Cookie `debug=true` persists debug state across page loads
- No direct link to `markdown_renderer.html` in either menu

## Rules

- **Project Menu** = what the end-user sees (project-specific)
- **Debug Menu** = what the developer/AI sees (framework navigation)
- Debug button must always be accessible at bottom-right
- Both menus must work on mobile (375px viewport)
