# Coding Standards

> **5_Symbols / Rules** — Coding conventions that all implementation code must follow.

## HTML

```html
<!-- DO: Semantic elements, clean structure -->
<header class="app-header">
  <nav class="header-container">
    <a href="index.html" class="logo">Project Name</a>
  </nav>
</header>

<!-- DON'T: Div soup, inline styles -->
<div style="background: blue">
  <div class="nav">
    <a href="index.html">Home</a>
  </div>
</div>
```

- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- No inline styles — all styling in `<style>` blocks or external CSS
- Use descriptive class names in kebab-case: `.app-header`, `.debug-menu-overlay`
- All interactive elements must be keyboard-accessible
- Use `aria-*` attributes for screen reader support on custom UI components

## CSS

```css
/* DO: CSS custom properties, Flexbox/Grid, no magic numbers */
:root {
  --bg-dark: #0b0f19;
  --accent-violet: #8b5cf6;
  --font-display: 'Outfit', sans-serif;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* DON'T: Hardcoded values, legacy floats, important abuse */
.sidebar {
  width: 280px !important;
  float: left;
}
```

- Use CSS custom properties for colors, fonts, and transitions
- Flexbox or Grid for layout — never floats
- Dark mode always supported with HSL/RGB color values
- No `!important` unless absolutely necessary (document why)
- Glassmorphism panels with `backdrop-filter: blur()` and `rgba()` backgrounds
- Mobile-first responsive design — min-width: 375px
- Keep selectors shallow (max 3 levels deep)

## JavaScript

```javascript
// DO: camelCase, async/await, descriptive names
async function loadNavigationConfig() {
  try {
    const response = await fetch('navigation_config.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load navigation config:', error);
    return getFallbackConfig();
  }
}

// DON'T: snake_case, callbacks, magic values
function load_nav() {
  fetch('nav_config.json').then(function(r) { return r.json(); });
}
```

- Use `camelCase` for variables and functions, `PascalCase` for classes
- `async/await` preferred over promise chains
- All external data (fetches, API calls) must have error handling
- No `var` — use `const` by default, `let` when reassignment needed
- Single quotes for strings, template literals for interpolation
- Functions must do one thing — if it needs a comment, split it

## General

- **No dead code** — remove commented-out blocks before committing
- **No console.log in production** — use the `debugLog()` utility for conditional logging
- **No hardcoded URLs** — reference configuration files
- **Secrets never in code** — all credentials in Azure Key Vault
- **Write readable code** — code is documentation, comments explain why not what

## File Naming

- HTML/CSS/JS: `kebab-case.html`
- Markdown: `snake_case.md`
- Config: `snake_case.json`
- Directories: `kebab-case/` or `PascalCase/` for stage folders
- No spaces or special characters in file names
