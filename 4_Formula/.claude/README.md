# 🤖 .claude — Project Initialization Guide

This folder documents everything that must be moved or configured in the **root `.claude/` folder** when a new project is initialized from `delivery-pilot-template`.

Copy this entire `.claude/` folder to the root of the new project, then customize each file.

---

## 📁 Files to Place at Root `.claude/`

| File | Source | Action |
|------|--------|--------|
| `settings.json` | `4_Formula/.claude/settings.template.json` | Copy → rename → customize |
| `commands/` | `4_Formula/.claude/commands/` | Copy whole folder to root `.claude/commands/` |

---

## 🛡️ Rules (Permissions) — `settings.json`

The following permissions must be pre-approved so agents can operate without constant prompts.

### Required Permissions
```json
{
  "permissions": {
    "allow": [
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull *)",
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(ls:*)",
      "Bash(find . *)",
      "Bash(cat:*)"
    ]
  }
}
```

### Optional Permissions (add as needed per project)
```json
"Bash(npm run *)",
"Bash(python *)",
"Bash(pip install *)",
"Bash(docker *)",
"Bash(az *)"
```

---

## 🧰 Skills — Register These on Init

Skills are invoked with `/skill-name` in Claude Code CLI. The following are required for this self-learning system to function.

See `skills.md` in this folder for the full reference.

### Minimum Required Skills
| Skill | Why |
|-------|-----|
| `code-review` | Review every diff before committing |
| `verify` | Confirm UI/feature works in browser after changes |
| `security-review` | Audit for secrets, XSS, misconfig before push |
| `init` | Regenerate CLAUDE.md if codebase drifts |
| `run` | Launch the app and observe behavior |

### Recommended Skills
| Skill | Why |
|-------|-----|
| `image-generation` | Generate stage diagrams for `3_Simulation/` |
| `github-blog-post` | Publish retrospectives to the project blog |
| `gdrive-search` | Search Second Brain for reference material |
| `update-config` | Automate hook setup in `settings.json` |
| `schedule` | Schedule recurring agents for CI/CD checks |
| `loop` | Poll deploys or run repeated checks |
| `video-transcribe` | Transcribe demo walkthroughs for `4_Formula/` |
| `fewer-permission-prompts` | Scan transcripts and pre-approve common tool calls |

---

## ⚡ Commands — Place in `.claude/commands/`

Commands are custom slash commands available in Claude Code. See `commands/` subfolder for ready-to-use command files.

### Required Commands
| Command | File | Purpose |
|---------|------|---------|
| `/log-error` | `commands/log-error.md` | Append entry to `6_Semblance/error.log` |
| `/log-fix` | `commands/log-fix.md` | Append entry to `6_Semblance/fix.log` |
| `/stage-commit` | `commands/stage-commit.md` | Stage, commit, and push current changes |
| `/retrospective` | `commands/retrospective.md` | Write milestone entry to `lessons_learned.md` |
| `/init-project` | `commands/init-project.md` | Bootstrap all 7 stage folders for a new project |

---

## 🚀 Initialization Checklist

When starting a new project from this template:

- [ ] Copy `4_Formula/.claude/` to root `.claude/`
- [ ] Rename `settings.template.json` → `settings.json` and customize permissions
- [ ] Verify all 5 required skills are available (`/code-review`, `/verify`, `/security-review`, `/init`, `/run`)
- [ ] Confirm commands are registered (check `.claude/commands/` exists with all 5 files)
- [ ] Run `/init` to generate a fresh `CLAUDE.md` for the new project's codebase
- [ ] Update `agents.md` persona files with the new project name
- [ ] Add project-specific allow permissions to `settings.json`
- [ ] Test: run `/log-error` and `/log-fix` once to confirm `6_Semblance/` logging works
