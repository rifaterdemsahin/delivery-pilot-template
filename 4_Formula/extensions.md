# 🔌 Required Extensions & Tools

This document outlines the system extensions, command-line interfaces (CLIs), and IDE plugins required to develop, run, and deploy the **Delivery Pilot Template** project.

---

## 🛠️ System & CLI Extensions

To build and deploy services in this template, the following CLI extensions and tools must be installed on your development machine.

| Tool / CLI | Purpose | Link / Installation |
| :--- | :--- | :--- |
| **Azure CLI (`az`)** | Interacting with Azure Key Vault to load/manage secrets securely without committing them. | [Install Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) |
| **Fly.io CLI (`flyctl`)** | Managing and deploying Python backend services hosted on Fly.io. | [Install flyctl](https://fly.io/docs/hands-on/install-flyctl/) |
| **Docker & Docker Compose** | Running local AI container services (Qdrant vector database + Ollama engine). | [Docker Desktop](https://www.docker.com/products/docker-desktop/) |
| **Git & GitHub CLI (`gh`)** | Managing version control and repository settings (e.g., GitHub Pages setup). | [GitHub CLI](https://cli.github.com/) |

---

## 💻 Recommended IDE Extensions (VS Code)

To ensure a seamless development experience, install the following extensions inside your IDE (configured for Visual Studio Code):

### 1. Visualization & Diagramming
* **Markdown Preview Mermaid Support** (by *Matt Bierner*)
  * **Purpose:** Enables rendering of complex architecture and flow diagrams using Mermaid syntax directly inside the Markdown preview.
  * **Marketplace ID:** `bierner.markdown-mermaid`
* **Mermaid Chart** (by *Mermaid Chart*)
  * **Purpose:** Advanced collaboration, editing, and syncing of diagrams with Mermaid Chart.
  * **Marketplace ID:** `mermaid-chart.mermaid-chart`

### 2. Cloud & Infrastructure Management
* **Azure Account & Azure Resources** (by *Microsoft*)
  * **Purpose:** Authenticate and browse your Azure resources, including Key Vaults, directly within the editor.
  * **Marketplace ID:** `ms-vscode.azure-account` / `ms-azuretools.vscode-azureresources`
* **Docker** (by *Microsoft*)
  * **Purpose:** Manage, start, and debug local Qdrant and Ollama containers without leaving the IDE.
  * **Marketplace ID:** `ms-azuretools.vscode-docker`

### 3. Syntax & Formatting
* **YAML** (by *Red Hat*)
  * **Purpose:** Syntactical validation, autocomplete, and schema matching for `fly.toml` and `docker-compose.yml` configurations.
  * **Marketplace ID:** `redhat.vscode-yaml`
* **PrismJS / Code Highlighting Helpers**
  * **Purpose:** Ensuring clean formatting and linting for frontend assets matching PrismJS styles used in the documentation viewer.

---

## 🔐 Security & RBAC

Security and Role-Based Access Control (RBAC) are managed by the **Formula Agent**. Policies cover:

- **Authentication**: Azure AD / Microsoft Entra ID for human users; API keys + Azure Key Vault for service-to-service auth
- **Authorization**: RBAC roles scoped per service (GitHub repo access, Key Vault read/write, Supabase row-level security, Fly.io deployment permissions)
- **Secrets**: All credentials in Azure Key Vault (never in code, never in git history)
- **Audit**: External tool calls logged in `2_Environment/llm_tools.md`; cost/access trails in `1_Real_Unknown/costs.md`

Related docs: `2_Environment/setup_azure.md` (Key Vault), `4_Formula/specs.md` (security specs), `2_Environment/architecture.md` (auth flows).

---

## 📂 Verification & Integration

For environment setups corresponding to these tools, refer to the following resources:
* 🔐 Azure Key Vault Setup: [setup_azure.md](file:///C:/projects/delivery-pilot-template/2_Environment/setup_azure.md)
* 🛸 Fly.io Deployment Setup: [fly_io.md](file:///C:/projects/delivery-pilot-template/2_Environment/fly_io.md)
* 🧠 Local AI Stack (Ollama + Qdrant): [setup_ai.md](file:///C:/projects/delivery-pilot-template/2_Environment/setup_ai.md)
* 📐 Architecture & Diagrams: [architecture.md](file:///C:/projects/delivery-pilot-template/2_Environment/architecture.md)
