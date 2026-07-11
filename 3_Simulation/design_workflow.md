# Design Workflow — Design Before Code

> **Stage 3: Simulation** — Visual designs must be created before implementation. This file documents the design-first workflow.

## The Rule

**Before delivering any implementation (code in `5_Symbols`):**

1. Create image-based designs in `3_Simulation/` — mockups, wireframes, flow diagrams
2. Document specs (what the feature does) in `4_Formula/specs.md`
3. Only after designs and specs are in place, proceed to code in `5_Symbols`
4. When the feature changes, update the design images here AND the specs in `4_Formula/`

## Design Workflow Checklist

- [ ] Define what needs to be designed (screen/page/component)
- [ ] Create mockup image(s) and place in `3_Simulation/`
- [ ] Log the prompt used to generate the image in `image_prompts.md`
- [ ] Add the image to `carousel_config.json` for the auto-updating carousel
- [ ] Document the feature spec in `4_Formula/specs.md`
- [ ] Review designs against specs before coding
- [ ] Update designs when the feature evolves

## Image Naming Convention

```
3_Simulation/
├── feature_name_mockup.png       # Initial mockup
├── feature_name_wireframe.png    # Wireframe
├── feature_name_flow.png         # User flow diagram
├── feature_name_final.png        # Final approved design
└── image_prompts.md              # All AI generation prompts
```

## Design Guidelines

- Dark mode, glassmorphism panels, neon teal + purple accents
- No device frames — request raw UI from AI generators
- Desktop: `--ar 16:9` | Mobile: `--ar 9:16`
- Use consistent styling across all mockups
- Move obsolete designs to `_obsolete/`

## Integration with Specs

Designs here in `3_Simulation/` and specs in `4_Formula/specs.md` work together:

| Design File | Spec Reference |
|-------------|---------------|
| `feature_mockup.png` | `SPEC-XXX` in `4_Formula/specs.md` |

When a spec changes, the corresponding design should be updated. When a design is revised, check that the spec still matches.
