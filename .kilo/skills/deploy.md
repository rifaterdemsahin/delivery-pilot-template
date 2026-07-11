# Deploy & Git Workflow Skill

Load this skill when committing, pushing, or deploying changes.

## Purpose
Execute the project's strict commit-push-deploy workflow with zero-batching policy.

## The Commit-Push Rule
- **After every command, commit and push** — do not batch changes
- Each step gets its own commit with a descriptive message
- If any git errors occur (conflicts, locked index, push rejected), proactively troubleshoot and resolve them
- Never use `--force` push to main/master
- Never skip hooks (`--no-verify`, `--no-gpg-sign`) unless explicitly requested

## Deploy Targets
- **GitHub Pages**: Static site hosting via `index.html` at root
- **Fly.io**: Container-based backend deployments
- **Supabase**: Database migrations and edge functions

## Steps
1. After making a change, verify with `git status`
2. Stage the specific file(s) changed: `git add <file>`
3. Commit with descriptive message: `git commit -m "type: description"`
4. Push immediately: `git push`
5. If push fails, diagnose and resolve (fetch/rebase, not force push)
6. Verify deployment on GitHub Pages URL: `https://rifaterdemsahin.github.io/delivery-pilot-template/`
