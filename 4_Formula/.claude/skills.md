# 🧰 Skills Reference — Delivery Pilot Template

Skills are invoked as `/skill-name` in Claude Code CLI. This file is the canonical reference for which skills are required, recommended, and how each maps to the 7-stage self-learning system.

---

## 🔴 Required Skills (project will not function correctly without these)

| Skill | Stage | Purpose | Trigger |
|-------|-------|---------|---------|
| `init` | All | Generate/regenerate `CLAUDE.md` for the codebase | Run on project initialization |
| `code-review` | 5, 7 | Review diffs for bugs before every stage commit | Before each `git commit` |
| `verify` | 7 | Confirm features work in browser (golden path + edge cases) | After UI/feature changes |
| `security-review` | 5, 7 | Audit for secrets exposure, XSS, misconfig | Before pushing to remote |
| `run` | 3, 7 | Launch the static site and observe navigation/debug menu | After `index.html` changes |

---

## 🟡 Recommended Skills (strongly advised for full self-learning loop)

| Skill | Stage | Purpose | Trigger |
|-------|-------|---------|---------|
| `image-generation` | 3 | Generate stage diagrams, workflow visuals, UI mockups | When creating `3_Simulation/` content |
| `video-transcribe` | 4 | Transcribe YouTube walkthroughs into markdown guides | When adding `4_Formula/` documentation |
| `github-blog-post` | 6, 7 | Publish retrospectives and milestone write-ups | After completing a stage milestone |
| `gdrive-search` | 1, 4 | Search Second Brain for reference docs and prior art | During problem definition in `1_Real_Unknown/` |
| `simplify` | 5 | Refactor HTML/JS/CSS for reuse and clarity | After feature implementation in `5_Symbols/` |
| `update-config` | All | Configure hooks and permissions in `settings.json` | When automating agent behaviors |
| `fewer-permission-prompts` | All | Scan transcripts and pre-approve common tool calls | During project setup |

---

## 🟢 Optional Skills (useful for advanced workflows)

| Skill | Stage | Purpose | Trigger |
|-------|-------|---------|---------|
| `schedule` | All | Schedule recurring agents for CI checks or reminders | For automated pipeline monitoring |
| `loop` | All | Poll deploy status or run repeated checks | During active deployment |
| `claude-api` | 5 | Build/debug Anthropic SDK integrations | When adding AI features to `5_Symbols/` |
| `keybindings-help` | All | Customize shortcuts for frequent project actions | One-time setup |

---

## 🔗 Skill → Stage Mapping

```
1_Real_Unknown  →  gdrive-search, init
2_Environment   →  update-config, schedule
3_Simulation    →  image-generation, run
4_Formula       →  video-transcribe, gdrive-search
5_Symbols       →  code-review, security-review, simplify, claude-api
6_Semblance     →  github-blog-post (retrospectives)
7_Testing_Known →  verify, run, code-review, security-review
```

---

## 📋 Error & Fix Logging via Skills

When using `/verify` or `/run` and an error is found:
1. Manually append to `6_Semblance/error.log`
2. Apply fix
3. Re-run `/verify`
4. Append to `6_Semblance/fix.log` with status `VERIFIED`
5. Use `/github-blog-post` to publish the retrospective if it was a major fix
