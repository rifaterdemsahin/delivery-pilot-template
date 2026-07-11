# Formula & Planning Skill

Load this skill when doing any thinking, planning, speccing, or documentation work in the `4_Formula` stage.

## Purpose
Manage the Thinking & Planning gate (`4_Formula/`) — the mandatory stage that gates entry to `5_Symbols` (code).

## Key Files
- `4_Formula/llm_thinking_log.md` — Reasoning log for every execution
- `4_Formula/specs.md` — Technical specifications for features
- `4_Formula/decisions.md` — Architecture Decision Records (ADRs)
- `4_Formula/dsl.md` — Domain-Specific Language dictionary
- `4_Formula/extensions.md` — Required tools and extensions

## The Specs System
Specifications live in `4_Formula/specs.md`. This is the living document that describes what each feature should do before it is implemented.
- **Before** implementing any feature, create or update its spec in `4_Formula/specs.md`
- When a new task arrives, check `4_Formula/specs.md` for existing specs that may be affected
- If the task changes behavior covered by an existing spec, flag it with `[NEEDS UPDATE]` and warn
- Specs are the source of truth that code in `5_Symbols` is validated against

## Approval Cascade Rule
Changes in `1_Real_Unknown` or `2_Environment` must be mentioned, discussed, and approved before cascading into updates in `3_Simulation` and `4_Formula`. The approval chain:
1. **Stages 1+2** → Mention changes, get approval → **Stages 3+4** → Update designs and specs → **Stage 5** → Implement code.

## Planning Gate Rule
Before writing any code (`5_Symbols`):
1. Document approach and reasoning in `4_Formula/llm_thinking_log.md`
2. Check and update `4_Formula/specs.md` if the task introduces or changes specs
3. Note any spec conflicts or changes needed
4. Only then proceed to implementation

## Steps for New Tasks
1. Read `4_Formula/specs.md` to check for affected specs
2. Flag any spec that needs updating based on the new task
3. Log the planning phase in `llm_thinking_log.md`
4. After implementation, update specs with final decisions
