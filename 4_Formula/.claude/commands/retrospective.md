# /retrospective

Write a milestone retrospective entry in `6_Semblance/lessons_learned.md`.

## Usage
```
/retrospective
/retrospective "milestone name"
```

## What this command does

1. Reads the current `6_Semblance/lessons_learned.md`
2. Asks for (or infers from context):
   - **Milestone name** — what was just completed
   - **What went well** — 2–3 bullet points
   - **Gaps & Challenges** — what was tricky, any workarounds used
3. Appends a new dated section to `lessons_learned.md`
4. Commits the update with message `docs: retrospective — <milestone name>`

## Instructions for the agent

When the user runs `/retrospective`:

1. Ask for the milestone name if not provided
2. Review recent git log (`git log --oneline -10`) to summarize what changed
3. Cross-reference `6_Semblance/error.log` and `fix.log` for any errors/fixes from this milestone
4. Write the retrospective section using this template:

```markdown
## 📅 YYYY-MM-DD: <Milestone Name>

### What went well
- ...

### Gaps & Challenges
- ...
```

5. Append at the bottom of `lessons_learned.md`
6. Run `/stage-commit` to save the retrospective
