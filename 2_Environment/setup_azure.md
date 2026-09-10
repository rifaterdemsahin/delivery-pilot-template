# ☁️ Azure Key Vault & Credentials Setup Guide

> **Stage 2: Environment** — Configuration and onboarding instructions for secrets management.

---

## 🔒 Azure Key Vault Setup

All environment variables and secrets must be loaded dynamically from Azure Key Vault at runtime.

### 1. Azure Authentication
```bash
# Log in to Azure account
az login

# Set active subscription
az account set --subscription "your-subscription-name-or-id"
```

### 2. Provision Key Vault (CLI reference)
```bash
# Create Resource Group
az group create --name dg-pilot-rg --location westeurope

# Create Key Vault
az keyvault create --name dg-pilot-kv --resource-group dg-pilot-rg --location westeurope
```

### 3. Registering Secrets
```bash
# Add a secret to the vault
az keyvault secret set --vault-name dg-pilot-kv --name "DATABASE-URL" --value "postgres://..."
```

---

## 🔑 GitHub Actions Integration
To pull secrets into GitHub workflows, the repository needs Azure Service Principal credentials:

1. Create a Service Principal:
   ```bash
   az ad sp create-for-rbac --name "dg-pilot-github-sp" --role contributor \
       --scopes /subscriptions/your-subscription-id \
       --sdk-auth
   ```
2. Store the JSON output as a GitHub Repository Secret named `AZURE_CREDENTIALS`.
3. In workflows, use the action:
   ```yaml
   - name: Azure Login
     uses: azure/login@v1
     with:
       creds: ${{ secrets.AZURE_CREDENTIALS }}
   ```

---

## 📁 Azure project-based storage (default)

The project **default storage** is Azure Storage scoped to this project (RULE-004 / SPEC-012): one Storage account, blob containers for uploads, artifacts, and files. Account keys and connection strings live in this Key Vault — never in git.

```bash
# Example: create a project-scoped storage account (name must be globally unique)
az storage account create --name <project>stor --resource-group dg-pilot-rg --location westeurope --sku Standard_LRS

# Store the connection string in Key Vault
az keyvault secret set --vault-name dg-pilot-kv --name "AZURE-STORAGE-CONNECTION-STRING" \
  --value "$(az storage account show-connection-string --name <project>stor --resource-group dg-pilot-rg -o tsv)"
```

Fly volumes, Cloudflare R2, local disk, and git LFS are not the default. Structured data may still use Supabase.

---

## 🧪 Verification Checklist
- [ ] Azure CLI successfully authenticated
- [ ] Active subscription is verified
- [ ] Key Vault exists and permissions are configured correctly
- [ ] Zero secret configurations committed to source files
