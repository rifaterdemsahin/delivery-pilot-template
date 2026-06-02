# /log-fix

Append a structured fix entry to `6_Semblance/fix.log`.

## Usage
```
/log-fix
```

## What this command does

Prompts you for:
- **Stage** — which of the 7 stages the fix was applied in
- **Status** — `APPLIED` | `VERIFIED` | `WORKAROUND` | `PENDING`
- **Description** — one-line summary of the fix applied

Then appends the entry to `6_Semblance/fix.log` in the format:
```
[YYYY-MM-DD] [STAGE] [STATUS] — Fix description
```

## Instructions for the agent

When the user runs `/log-fix`:

1. Ask for stage, status, and description if not provided in command args
2. Read the current `6_Semblance/fix.log`
3. Append the new entry below `<!-- Add new entries below this line, newest first -->`
4. Update the cross-reference index table at the bottom of `fix.log`
5. If status is `VERIFIED`, also append a brief lesson to `6_Semblance/lessons_learned.md`

## Example entry
```
[2026-06-02] [5_Symbols] [VERIFIED] — Added data-language attribute to pre blocks; PrismJS now highlights correctly
```
