# Git Conventions

> **5_Symbols / Rules** — Git workflow and commit conventions for all implementation code.

## Commit Message Format

```
type: imperative description (max 72 chars)
```

| Prefix | Usage |
|--------|-------|
| `add:` | New file, feature, or capability |
| `update:` | Modification to existing file or feature |
| `fix:` | Bug fix |
| `remove:` | File or feature deletion |
| `refactor:` | Code restructuring without behavior change |
| `docs:` | Documentation-only change |

Examples:
```
add: SPEC-006 stage dependency chain
update: fix navigation_config.json debug menu sync
fix: resolve race condition in parallel pushes
remove: delete obsolete docker-compose v1 config
```

## Branch Management

- **main**: Always deployable, protected. All commits push directly to main.
- No feature branches unless explicitly requested.
- Never force push to main.

## Push Rules

- **After every command, commit and push (RULE-002)** — do not batch changes. Standing order: [`agent_operating_rules.md`](agent_operating_rules.md).
- Each logical change gets its own commit.
- Verify with `git status` before committing.
- Descriptive messages — the "why" should be clear from the message.
- After the work is done, formulate it as a spec in `4_Formula/specs.md` (RULE-001) before considering the change complete.

## Conflict Resolution

If a push fails due to race conditions:
1. `git pull --rebase` to integrate remote changes
2. `git push` to retry
3. Never use `--force` on main

## Commit Checklist

- [ ] One logical change per commit
- [ ] Descriptive commit message with correct prefix
- [ ] No secrets in the diff
- [ ] No dead code or console.log left behind
- [ ] Files placed in correct stage folder
- [ ] `navigation_config.json` synced if new files added
