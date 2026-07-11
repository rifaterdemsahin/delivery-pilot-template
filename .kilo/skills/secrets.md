# Secrets & Key Vault Skill

Load this skill when handling credentials, environment variables, or Azure Key Vault integration.

## Purpose
Manage secrets securely through Azure Key Vault — never expose credentials in code, config, or git history.

## Key Files
- `.env.example` — Template for required environment variables (placeholders only, no real secrets)
- `2_Environment/setup_azure.md` — Azure Key Vault setup guide

## Secrets Map
| Secret | Location | Purpose |
|--------|----------|---------|
| `SUPABASE_URL` | Azure Key Vault | Database endpoint |
| `SUPABASE_ANON_KEY` | Azure Key Vault | Public API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Azure Key Vault | Admin API key |
| `AXIOM_TOKEN` | Azure Key Vault | Logging API token |
| `AXIOM_DATASET` | Azure Key Vault | Log dataset name |
| `FLY_API_TOKEN` | Azure Key Vault | Deployment token |

## Rules
- Never store secrets in code, config files, or git history
- Use Azure Key Vault (FIPS 140-2 HSMs, RBAC, audit logs)
- Load secrets at runtime via Azure SDK or GitHub Actions `Azure/get-keyvault-secrets`
- Create a matching Key Vault per environment (dev/staging/prod) in Azure Portal
- When adding a new secret, update `.env.example` with the placeholder variable name (no value)
- Run `az keyvault secret set` to store the actual value in the appropriate vault
