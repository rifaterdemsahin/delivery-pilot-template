# /log-error

Append a structured error entry to `6_Semblance/error.log`.

## Usage
```
/log-error
```

## What this command does

Prompts you for:
- **Stage** — which of the 7 stages the error occurred in (e.g. `5_Symbols`)
- **Severity** — `CRITICAL` | `ERROR` | `WARNING` | `INFO`
- **Description** — one-line summary of the error

Then appends the entry to `6_Semblance/error.log` in the format:
```
[YYYY-MM-DD] [STAGE] [SEVERITY] — Description
```

## Instructions for the agent

When the user runs `/log-error`:

1. Ask for stage, severity, and description if not provided in the command args
2. Read the current `6_Semblance/error.log`
3. Append the new entry below `<!-- Add new entries below this line, newest first -->`
4. Save the file
5. Remind the user to log the corresponding fix in `/log-fix` once resolved

## Example entry
```
[2026-06-02] [5_Symbols] [ERROR] — PrismJS syntax highlighting not loading for Python files
```
