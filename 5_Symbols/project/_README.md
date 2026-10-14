# 🚀 Project Code — Symbols

> **Stage 5: Symbols / Project** — Application and product-specific source code lives here.

## Purpose

This folder contains the actual application, business logic, microservices, and product code specific to this project, cleanly separated from the underlying `delivery-pilot-template` framework code in `../deliverypilot/`.

## What belongs here

- **Application code** — Backend services, frontend components, APIs, models, routes
- **Project-specific configurations** — Config files, schemas, database migrations
- **Dockerfiles** — Container definitions for the specific project workload

## Standards

- Follow the coding standards in [`../rules/coding_standards.md`](../rules/coding_standards.md)
- Follow git conventions in [`../rules/git_conventions.md`](../rules/git_conventions.md)
- Never store secrets here — load from Azure Key Vault per [`SPEC-004`](../../4_Formula/specs.md)
