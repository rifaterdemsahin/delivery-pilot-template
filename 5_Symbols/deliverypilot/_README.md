# 🎛️ DeliveryPilot Framework Code — Symbols

> **Stage 5: Symbols / DeliveryPilot** — Delivery-pilot-template framework tools, inspection suites, and delivery components live here.

## Purpose

This folder houses framework-level delivery components provided by `delivery-pilot-template`, cleanly separated from project-specific application logic in `../project/`.

## Included Tools

| Tool / Folder | Description |
|---|---|
| [`master_review/`](master_review/index.html) | Interactive Master Review & File Carousel suite for auditing files and capturing feedback |

## Architecture & Storage

- Framework tools here interact with cloud resources (such as Azure Blob Storage) using isolated containers per project per [`SPEC-017`](../../4_Formula/specs.md).
- Consumer projects can extend or configure these tools without modifying application code in `../project/`.
