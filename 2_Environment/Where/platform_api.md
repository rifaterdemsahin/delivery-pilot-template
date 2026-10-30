# 🔌 Platform API — Fly.io + GitHub (SPEC-028)

> **Stage 2: Environment** — How agents and spawned projects reach deployed Fly.io machines and the shared GitHub configuration. Keys live only in Azure Key Vault ([[setup_azure.md|stores secrets in]]); deployment context in [[fly_io.md|operates machines on]].

## What it gives a project

| Capability | Command | API |
|---|---|---|
| List Fly apps | `platform_api.py fly-apps` | Fly Machines API `GET /apps` |
| List deployed machines | `platform_api.py fly-machines [-a APP]` | `GET /apps/{app}/machines` |
| Drift guard (unapproved machine running) | `platform_api.py fly-drift` | same; exit 1 on drift |
| Pull the shared config into the project | `platform_api.py gh-config` | GitHub Contents API |
| Verify keys resolve (values never shown) | `platform_api.py check` | — |

Client: `5_Symbols/toolbox/platform_api.py` (stdlib only). Pointers: `2_Environment/platform_config.json` (no secrets).

## Keys (Azure Key Vault `dp-kv-deliverypilot`, shared — do not create a new vault)

| Secret name | Purpose | Minimum scope |
|---|---|---|
| `FLY-API-TOKEN` | Fly.io API | org-scoped or app-scoped deploy/read token (`fly tokens create org`) |
| `GITHUB-AGENT-TOKEN` | GitHub API | fine-grained PAT, `Contents: read` on the shared config repo (plus repos the project edits) |

```bash
az keyvault secret set --vault-name dp-kv-deliverypilot --name FLY-API-TOKEN --value "$(fly tokens create org -j | jq -r .token)"
az keyvault secret set --vault-name dp-kv-deliverypilot --name GITHUB-AGENT-TOKEN --value "github_pat_..."
```

Resolution order: Key Vault via `az` (needs `az login` / the Service Principal from [[setup_azure.md|setup_azure]]) → env fallback `FLY_API_TOKEN` / `GITHUB_TOKEN` for CI. Tokens are never printed, written to disk, or committed.

## New project checklist (done by `/bootstrap-template`)

1. Keep `platform_config.json`; set `fly.apps` to the project's apps (empty = all in the org) and `fly.approved_running`.
2. Point `github.shared_config.repo` at the repo holding the shared configuration (default: this template) and adjust `paths`.
3. Grant the project's identity (developer `az login` or the CI Service Principal) **Key Vault Secrets User** on the vault.
4. Run `python3 5_Symbols/toolbox/platform_api.py check` — both lines must say `OK`.
5. For CI, add the `AZURE_CREDENTIALS` repo secret and run the *Platform drift guard* workflow.
