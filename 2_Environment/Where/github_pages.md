# GitHub Pages — Frontend Static Hosting

## What is it?

GitHub Pages is a free static site hosting service that serves HTML, CSS, and JavaScript directly from a GitHub repository. It's the simplest way to publish a website with zero infrastructure management.

## Use Cases

| Use Case | Why GitHub Pages |
|----------|-----------------|
| **Project Documentation** | Host markdown-rendered docs, guides, and READMEs |
| **Static Landing Pages** | Marketing sites, portfolios, project homepages |
| **Single-Page Apps** | React, Vue, or vanilla JS apps with client-side routing |
| **API Documentation** | Swagger/OpenAPI docs, interactive API explorers |
| **Blog** | Jekyll-powered blogs with zero config |
| **Presentation Slides** | Reveal.js or similar frameworks |
| **Prototype/Demo** | Quick prototypes without deploying to a cloud provider |

## When to Choose GitHub Pages

- Your site is **100% static** (HTML, CSS, JS — no server-side logic)
- You want **zero cost** hosting
- You want **zero DevOps** — just push to `main` and it deploys
- You need **HTTPS** by default
- You're already using **GitHub** for version control
- You want **custom domain** support with DNS config

## When NOT to Choose GitHub Pages

- You need **server-side rendering** (SSR) — use Fly.io
- You need **API endpoints** — use Cloudflare Workers or Fly.io
- You need **databases** or **file uploads** — use a backend service
- You need **authentication** on the server side — use a backend service
- Your site exceeds **1GB** — GitHub Pages has a size limit
- You need **high traffic** (>100GB bandwidth/month) — consider a CDN

## Integration with This Project

- **Frontend:** GitHub Pages hosts the static site (index.html, CSS, JS)
- **Deployment:** GitHub Actions builds and deploys on push to `main`
- **Content:** Markdown files rendered via `5_Symbols/markdown_renderer.html`
- **Backend API:** Calls go to Cloudflare Workers or Fly.io
- **Secrets:** No secrets on GitHub Pages — all sensitive logic is in the backend

## Setup

### Enable GitHub Pages

1. Go to repo **Settings** > **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Save

### GitHub Actions Workflow

```yaml
# .github/workflows/pages.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - uses: actions/deploy-pages@v4
```

### Custom Domain (optional)

1. Add a `CNAME` file with your domain
2. Configure DNS: `CNAME` record pointing to `<username>.github.io`
3. Enable HTTPS in repo settings

## Pricing

| Resource | Cost |
|----------|------|
| Hosting | Free |
| Bandwidth | 100GB/month soft limit |
| Storage | 1GB per repo |
| Custom domain | Free (HTTPS included) |
| Build minutes | 2,000 min/month (GitHub Actions free tier) |

## References

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions for Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
