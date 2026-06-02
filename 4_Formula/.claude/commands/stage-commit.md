# /stage-commit

Stage all modified files, write a conventional commit message, and push to remote.

## Usage
```
/stage-commit
/stage-commit "optional commit message override"
```

## What this command does

1. Runs `git status` to show what changed
2. Runs `git diff` to review the diff
3. Stages relevant files (avoids `.env`, secrets, binaries)
4. Writes a conventional commit message following the project pattern:
   - `feat:` — new feature
   - `fix:` — bug fix
   - `docs:` — documentation only
   - `refactor:` — code restructure, no behavior change
   - `chore:` — maintenance, config, tooling
5. Commits with `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
6. Pushes to `origin main`

## Instructions for the agent

When the user runs `/stage-commit`:

1. Run `git status` and `git diff` in parallel
2. Identify which stage folder(s) were changed — use that as context for the commit message prefix
3. Stage specific files by name (never `git add -A` blindly)
4. Commit with a meaningful message ending with the Co-Authored-By line
5. Push and confirm success
6. If push fails due to hook or conflict, diagnose and fix — do NOT use `--no-verify`

## Rules
- Never commit `.env` files or files containing secrets
- Never use `--no-verify` to skip hooks
- If a pre-commit hook fails, fix the underlying issue and retry as a NEW commit
