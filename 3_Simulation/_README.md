# 3️⃣ Simulation — The "Vision"

> **Stage 3 of 7:** Make the invisible visible before writing production code.

## Purpose

This folder holds **visual representations** of what the project will look like and how it will behave. Mockups, wireframes, and screenshots live here. The image carousel on `index.html` auto-loads from this folder.

## What belongs here

- **Excalidraw wireframes** — Collaborative vector wireframes (`.excalidraw`, `.svg`, `.png`) capturing user flows and UI layouts, kept in strict synchronization with `1_Real_Unknown`
- **UI mockups** — Wireframes and design prototypes
- **Screenshots** — Captures of the working system at key milestones
- **Flow diagrams** — User journeys and interaction flows
- **Demo assets** — Any static assets used in presentations

## Files

| File | Description |
|------|-------------|
| `mockup_index.png` | Homepage mockup |
| `mockup_navigation.png` | Navigation menu mockup |
| `flow_user_journey.md` | User journey flow diagram |
| `carousel_config.json` | Image list for the auto-updating carousel |
| `design_workflow.md` | Design-first workflow — Excalidraw wireframes and sync with `1_Real_Unknown` before code |

## Excalidraw Wireframes & Sync with `1_Real_Unknown`

Excalidraw wireframes are the primary visual medium for rapid UI sketching and journey mapping in this stage:
- **Source of truth**: Wireframes must directly reflect the problem statements, OKRs, user journeys, and core questions established in `1_Real_Unknown/`.
- **Bidirectional sync**: When requirements change in `1_Real_Unknown/`, the Excalidraw wireframes in `3_Simulation/` must be updated before new specs are created in `4_Formula/`.
- **Export & Versioning**: Keep both the editable `.excalidraw` file and exported `.svg` or `.png` files for web rendering and inclusion in the image carousel.
- **Formula Gating**: As specified in `4_Formula/` (SPEC-016), code implementation in `5_Symbols/` is gated until Excalidraw wireframes match the current real-world problem definition.


## Image Carousel

The carousel on `index.html` automatically includes any image added to this folder. Supported formats: `.png`, `.jpg`, `.gif`, `.webp`.

To add a new slide:
1. Drop the image into `3_Simulation/`
2. Commit and push — the carousel updates automatically ✨

## Rules

- Name images descriptively: `feature_name_state.png`
- Add a caption comment above each image reference in `carousel_config.json`
- Move superseded designs to `_obsolete/` 🚮

## 🧪 Testing Checklist

[![UI Prototyping & Wireframing](https://img.youtube.com/vi/V81R6Q1x8x0/0.jpg)](https://www.youtube.com/watch?v=V81R6Q1x8x0)

- [ ] At least one mockup exists for the homepage
- [ ] Carousel loads and cycles through all images in this folder
- [ ] Images are mobile-readable (min 375px wide)
- [ ] Flow diagrams cover the main user journey
