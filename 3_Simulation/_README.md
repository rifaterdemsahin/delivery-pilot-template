# 3️⃣ Simulation — The "Vision"

> **Stage 3 of 7:** Make the invisible visible before writing production code.

## Purpose

This folder holds **visual representations** of what the project will look like and how it will behave. Mockups, wireframes, and diagrams live here. The interactive Excalidraw Carousel in this folder allows visual inspection, vector rendering, raw JSON element analysis, and direct web editing.

## What belongs here

- **Excalidraw wireframes** — Collaborative vector wireframes (`.excalidraw`, `.svg`, `.png`) capturing user flows and UI layouts, kept in strict synchronization with `1_Real_Unknown`
- **Simulation Carousel & Viewer** — Interactive carousel (`excalidraw_carousel.html` / `carousel.html`) rendering Excalidraw diagrams, companion SVGs, and element breakdowns
- **UI mockups** — Wireframes and design prototypes
- **Screenshots & Vector Graphics** — Scalable representations of system architecture and agentic workflows
- **Flow diagrams** — User journeys and interaction flows
- **Demo assets** — Static and dynamic assets used in presentations

## Files

| File | Description |
|------|-------------|
| `excalidraw_carousel.html` | Interactive Simulation Carousel with Excalidraw vector viewer, tabs, and inspector |
| `carousel.html` | Simulation carousel shortcut alias redirecting to `excalidraw_carousel.html` |
| `feature_wireframe.excalidraw` | Primary dashboard wireframe source in Excalidraw JSON format |
| `feature_wireframe.svg` | Scalable vector companion export of the dashboard wireframe |
| `system_architecture.excalidraw` | 7-Stage Architectural Data Flow diagram source |
| `system_architecture.svg` | Companion SVG export of 7-stage architectural data flow |
| `agentic_workflow.excalidraw` | Agentic handoff and execution loop wireframe source |
| `agentic_workflow.svg` | Scalable vector graphic of the 7-stage agentic workflow |
| `carousel_config.json` | Configuration indexing simulation slides, captions, lineage, and companion files |
| `design_workflow.md` | Design-first workflow — Excalidraw wireframes and sync with `1_Real_Unknown` before code |
| `image_prompts.md` | Prompt catalogue for visual design and diagram generation |
| `menu_design.md` | Design specifications for two-menu navigation drawers |

## Simulation Carousel & Excalidraw Viewer

The simulation folder includes a dedicated visual carousel: [**`excalidraw_carousel.html`**](excalidraw_carousel.html).

### Capabilities
1. **Interactive Excalidraw Vector Engine**: Dynamically parses `.excalidraw` JSON and renders rectangles, text nodes, diamonds, ellipses, lines, and connection arrows.
2. **Companion Vector Tab**: Directly previews exported SVG companions with full vector fidelity.
3. **Raw Excalidraw JSON Viewer**: Displays syntax-highlighted source schema with one-click copy.
4. **Elements Inspector**: Breaks down every shape, coordinate (`x, y, w, h`), color, and label in a searchable table.
5. **Pan, Zoom, & Fullscreen**: Inspect complex wireframes at up to 300% zoom or present in fullscreen mode.
6. **Autoplay & Navigation**: Auto-advances slides or navigates via keyboard arrows (`←` / `→`) and thumbnail ribbons.
7. **Lineage Tracking**: Every slide links upstream to `1_Real_Unknown/` and downstream to `4_Formula/` specs.
8. **Excalidraw Web Integration**: One-click jump to open diagrams in the official web editor.

## Excalidraw Wireframes & Sync with `1_Real_Unknown`

Excalidraw wireframes are the primary visual contract between the problem space and technical formulation:
- **Source of truth**: Wireframes must directly reflect the problem statements, OKRs, user journeys, and core questions established in `1_Real_Unknown/`.
- **Bidirectional sync**: When requirements change in `1_Real_Unknown/`, the Excalidraw wireframes in `3_Simulation/` must be updated before new specs are created in `4_Formula/`.
- **Export & Versioning**: Keep both the editable `.excalidraw` file and exported `.svg` or `.png` files for web rendering and inclusion in the image carousel.
- **Formula Gating**: As specified in `4_Formula/` (SPEC-016 and SPEC-026), code implementation in `5_Symbols/` is gated until Excalidraw wireframes match the current real-world problem definition.

## Rules

- Name images and wireframes descriptively: `feature_name_wireframe.excalidraw`
- Maintain matching `.svg` companion exports alongside `.excalidraw` files
- Index all visual assets in `carousel_config.json` with upstream and downstream lineage
- Move superseded designs to `_obsolete/` 🚮

## 🧪 Testing Checklist

[![UI Prototyping & Wireframing](https://img.youtube.com/vi/V81R6Q1x8x0/0.jpg)](https://www.youtube.com/watch?v=V81R6Q1x8x0)

- [ ] At least one Excalidraw wireframe exists for key features
- [ ] Simulation Carousel (`excalidraw_carousel.html`) renders slides and companion vectors
- [ ] Carousel loads and cycles through all configured simulation assets
- [ ] Wireframes are readable and scale responsively across desktop and mobile
- [ ] Upstream lineage to `1_Real_Unknown/` is documented in `carousel_config.json`
