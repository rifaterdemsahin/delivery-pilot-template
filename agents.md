# Agents

This file defines how AI agents interact with the **Delivery Pilot Template** project.

## Supported Agents

| Agent | File | Purpose |
|-------|------|---------|
| Claude | `claude.md` | Full-stack dev, DevOps, 7-stage framework |
| Gemini | `gemini.md` | Multimodal analysis, image tasks |
| GitHub Copilot | `copilot.md` | GitHub-native integrations |
| Kilo Code | `kilocode.md` | Precision code generation |

## Agent Rules

- Always follow the 7-stage folder structure (`1_Real_Unknown` through `7_Testing_Known`)
- Never commit secrets — use Azure Key Vault for all sensitive values
- **After every command, commit and push** — do not batch changes; each step gets its own commit
- Place files in the correct numbered folder based on their stage
- Use emojis for scannability in documentation
- **Record every prompt** — all prompts given to agents must be logged in `prompts.md` with date, agent name, and purpose

## Secrets Management

All agents use **Azure Key Vault** for secrets:

- **Why:** Enterprise-grade security (FIPS 140-2 HSMs, RBAC, audit logs) at low cost (~$0.03/10K operations)
- **How:** Load secrets at runtime via Azure SDK or GitHub Actions `Azure/get-keyvault-secrets`
- **Rule:** Never store secrets in code, config files, or git history

## Agent Coordination

When multiple agents work on the same project:

1. Read the relevant `*.md` persona file before making changes
2. Follow the testing checklist in `7_Testing_Known/README.md`
3. Document any workarounds in `6_Semblance/`
4. Keep `4_Formula/` updated with step-by-step guides for new patterns
