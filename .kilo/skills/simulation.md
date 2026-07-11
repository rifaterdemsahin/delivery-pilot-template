# Simulation & Visual Design Skill

Load this skill when creating visual mockups, image-based designs, or UI prototypes in the `3_Simulation` stage.

## Purpose
Create visual representations of features before writing implementation code. Design first, code second.

## Key Files
- `3_Simulation/image_prompts.md` — AI image generation prompts log
- `3_Simulation/carousel_config.json` — Image carousel configuration
- `3_Simulation/README.md` — Stage overview and rules

## Design-First Rule
**Before delivering implementation (code in `5_Symbols`), always:**
1. Create image-based designs in `3_Simulation/` (mockups, wireframes, flow diagrams)
2. Document the design prompts in `3_Simulation/image_prompts.md`
3. Add new images to `3_Simulation/carousel_config.json` for the auto-updating carousel
4. Only after designs are approved/created, proceed to code implementation
5. When the feature changes, update the design images in `3_Simulation/` to match

## Image Generation Guidelines
- No device frames — request raw UI
- Aspect ratios: `--ar 16:9` for desktop, `--ar 9:16` for mobile
- Consistent styling: dark mode, glassmorphism, neon teal/purple accents
- Name images: `feature_name_state.png`

## Steps
1. Determine what visual designs are needed for the feature
2. Generate/create mockups and place them in `3_Simulation/`
3. Log prompts in `image_prompts.md`
4. Update `carousel_config.json` with new image entries
5. Commit and push designs
6. Then proceed to `4_Formula` for specs, then `5_Symbols` for code
