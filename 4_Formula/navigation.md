# 🗺️ Reusable Navigation Formula

To ensure consistency and avoid code duplication across different pages (e.g., `index.html` and `5_Symbols/markdown_renderer.html`), this project utilizes a **Shared Navigation Design Pattern**.

---

## 📐 Architecture Concept

Instead of hardcoding the navigation menus in HTML across multiple files, the menu data and rendering logic are separated:

```
                  [ navigation_config.json ]
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
        [ index.html ]            [ 5_Symbols/markdown_renderer.html ]
   (Loads configuration via JS)  (Loads configuration via JS)
               │                             │
               ▼                             ▼
       Rendered menus                Rendered menus
```

* **Data-driven Menus:** Both the **Project Menu** (always visible) and the **Debug Menu** (toggleable) are defined in a single source of truth: `navigation_config.json`.
* **Dynamic Client-side Loading:** JavaScript asynchronously fetches the configuration at runtime, parses the items, and compiles the menus dynamically.
* **Robust Offline Fallback:** If the client fails to fetch the JSON file (e.g., when run locally via file system URI without a local server), the rendering script falls back to a hardcoded JavaScript object containing the default menu setup.

---

## 📂 Configuration Schema (`navigation_config.json`)

The central menu configuration specifies array maps for both menus:

```json
{
  "projectMenu": [
    { "label": "Home", "url": "index.html" },
    { "label": "Docs", "url": "5_Symbols/markdown_renderer.html?file=2_Environment/README.md" }
  ],
  "debugMenu": [
    { "label": "1. Real Unknown", "url": "1_Real_Unknown/" },
    { "label": "   ├─ Kanban Board", "url": "1_Real_Unknown/kanban.md" },
    { "label": "---", "url": "divider" },
    { "label": "agents.md", "url": "agents.md" }
  ]
}
```

---

## 💻 Shared Loading & Compilation Code

Both `index.html` and `5_Symbols/markdown_renderer.html` execute matching client-side logic to initialize menus. Below is the simplified javascript logic used to parse the configuration:

```javascript
// Fetch central navigation config or fallback if local
fetch('navigation_config.json')
  .then(response => {
    if (!response.ok) throw new Error('Config load failed');
    return response.json();
  })
  .then(data => {
    navigationData = data;
    renderAllMenus();
  })
  .catch(err => {
    console.warn("Using fallback navigation configuration:", err);
    renderAllMenus(); // Uses fallback navigationData object defined locally
  });

function renderAllMenus() {
  // Compiles Project Menu and Debug Menu list items and inserts them into target DOM elements
  compileMenu(navigationData.projectMenu, document.getElementById('projectMenuList'));
  compileMenu(navigationData.debugMenu, document.getElementById('debugMenuList'));
}
```

---

## 🎯 Benefits
1. **Single Source of Truth:** Adding a new markdown page or project link only requires editing a single line in `navigation_config.json`.
2. **Reduced Footprint:** HTML files are kept lean and focus on their respective layout structure.
3. **Consistency:** All menus share the exact same labels, order, and styling rules, preventing discrepancies between the landing dashboard and deep-linked documentation pages.

---

## 🔗 Project Link Resolution & `/index.html` Resilience (SPEC-024)

When authoring project pages and configuring `projectMenu` in `navigation_config.json`:
1. **Leading Slash Tolerance**: Links specified as `/index.html` or `index.html` are automatically normalized. In static subpath hosting environments (e.g. `https://<user>.github.io/<repo>/`), leading slashes are stripped during client menu compilation to prevent browsers from escaping to the root domain origin.
2. **Depth-Aware Traversal**:
   - `index.html` (root): links to `index.html`
   - `5_Symbols/calendar_view.html` (depth 1): links to `../index.html`
   - `5_Symbols/deliverypilot/markdown_renderer.html` (depth 2): links to `../../index.html`
   - `5_Symbols/deliverypilot/master_review/index.html` (depth 3): links to `../../../index.html`
3. **Fail-Soft Runtime Interception**: All project pages attach a global click listener that intercepts any clicks targeting `/index.html` or `/` and redirects them safely to the depth-relative `index.html`, eliminating 404s.
