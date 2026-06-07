# 🗄️ Database Integration — Supabase

This project uses **Supabase** (hosted Postgres, Auth, and Realtime platform) as its primary database.

---

## 🏗️ Project Naming Convention

To ensure consistency across the development lifecycle, the Supabase project name reflects the GitHub repository name:
* **Project Name / ID:** `delivery-pilot-template`
* **Local config project_id:** Configured in `supabase/config.toml` as `delivery-pilot-template`.

---

## 🎛️ Local Development Setup

For local testing and migrations, a local containerized Supabase instance is initialized:
* **Configuration directory:** `supabase/`
* **Initialization command:**
  ```bash
  npx supabase init
  ```
* **Local URL:** `http://localhost:54321` (API Gateway)
* **Local Postgres Port:** `54322`

---

## 🔒 Production Credentials & Azure Key Vault

All database connection variables and service keys are treated as sensitive secrets. They are stored in **Azure Key Vault** (e.g., `dg-pilot-kv`) and fetched dynamically at runtime.

### Stored Secret Names mapping:

| Environment Variable | Key Vault Secret Name | Purpose / Description |
| :--- | :--- | :--- |
| `SUPABASE_URL` | `SUPABASE-URL` | The unique project endpoint (e.g., `https://xxxx.supabase.co`). |
| `SUPABASE_ANON_KEY` | `SUPABASE-ANON-KEY` | Client-safe API key for accessing resources (respects RLS policies). |
| `SUPABASE_SERVICE_ROLE_KEY` | `SUPABASE-SERVICE-ROLE-KEY` | Secret admin key bypasses Row Level Security (never expose to frontend). |
| `DATABASE_URL` | `DATABASE-URL` | Direct connection string to the underlying PostgreSQL database. |

### Adding Secrets to Azure Key Vault (CLI reference)

To add Supabase keys to your Key Vault instance:

```bash
# Set Supabase API URL
az keyvault secret set --vault-name dg-pilot-kv --name "SUPABASE-URL" --value "https://your-project.supabase.co"

# Set Anon Public Key
az keyvault secret set --vault-name dg-pilot-kv --name "SUPABASE-ANON-KEY" --value "your-anon-key-here"

# Set Service Role Private Key
az keyvault secret set --vault-name dg-pilot-kv --name "SUPABASE-SERVICE-ROLE-KEY" --value "your-service-role-key-here"

# Set direct Database connection URL
az keyvault secret set --vault-name dg-pilot-kv --name "DATABASE-URL" --value "postgresql://postgres:password@db.xxxx.supabase.co:5432/postgres"
```

---

## 🛡️ Best Practices & Row Level Security (RLS)

1. **Row Level Security (RLS):** All created tables must have RLS enabled (`ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`).
2. **Access Control:** Utilize `SUPABASE_ANON_KEY` for client queries, and reserve `SUPABASE_SERVICE_ROLE_KEY` for backend administrative scripts and migrations.
3. **No Secrets in Code:** Never commit actual URLs or keys. Use `.env.example` as a template and load keys at runtime using the Azure SDK or GitHub Action secrets managers.
