# 6️⃣ Semblance — The "Scars"

> **Stage 6 of 7:** Document reality's gap from the plan — so others don't repeat the same pain.

## Purpose

This folder is the **honest record** of what went wrong, what was harder than expected, and the workarounds that kept the project alive. Every near-miss, unexpected error, and deviation from plan is logged here. These are the scars that make the system stronger. 🐛

## What belongs here

- **Error logs** — Actual error messages and stack traces encountered
- **Near-misses** — Things that almost broke the system
- **Workarounds** — Temporary fixes and why they were needed
- **Gap analysis** — Planned vs. actual outcomes
- **Lessons learned** — What to do differently next time

## Files

| File | Description |
|------|-------------|
| [`error_log.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/6_Semblance/error_log.md) | Chronological log of significant errors |
| [`workarounds.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/6_Semblance/workarounds.md) | Active workarounds and their technical debt |
| [`gap_analysis.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/6_Semblance/gap_analysis.md) | Plan vs. reality comparison |
| [`lessons_learned.md`](file:///Users/rifaterdemsahin/projects/delivery-pilot-template/6_Semblance/lessons_learned.md) | Retrospective insights |

## Error Log Format

```markdown
## [YYYY-MM-DD] Error Title

**Symptom:** What did it look like?
**Root cause:** Why did it happen?
**Fix applied:** What resolved it?
**Workaround active:** Yes/No
**Linked to:** [4_Formula/relevant_guide.md]
```

## Rules

- Log errors **as they happen** — memory fades fast
- Never delete an error log entry — move resolved ones to `_obsolete/`
- Link every workaround to a follow-up task or known technical debt
- No shame here — honest logs make better engineers 🐛

## 🧪 Testing Checklist

[![Blameless Postmortems & Incident Reviews](https://img.youtube.com/vi/8s81S6UqZcQ/0.jpg)](https://www.youtube.com/watch?v=8s81S6UqZcQ)

- [ ] Error log has at least one real entry from the build
- [ ] All active workarounds are documented
- [ ] Gap analysis compares `1_Real_Unknown` objectives to outcomes
- [ ] Lessons learned feed back into `4_Formula` improvements
