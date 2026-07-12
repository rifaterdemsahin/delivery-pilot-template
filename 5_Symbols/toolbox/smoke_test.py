#!/usr/bin/env python3
"""
Smoke Test Runner — delivery-pilot-template (SPEC-008)

Template-adapted: reads navigation_config.json as the single source of truth,
so any project bootstrapped from this template gets working smoke tests with
zero code changes.

Usage:
    python3 5_Symbols/toolbox/smoke_test.py                 # local filesystem mode
    python3 5_Symbols/toolbox/smoke_test.py --base-url https://user.github.io/repo/
    python3 5_Symbols/toolbox/smoke_test.py --no-report     # run checks, skip report file

Output: 6_Semblance/smoke_test_report.md (per 7_Testing_Known/smoke_tests.md format)
Exit code: 0 = all pass, 1 = at least one failure (CI gate compatible).
"""
import argparse
import datetime
import json
import os
import re
import sys
import urllib.error
import urllib.request

CONFIG_FILE = "navigation_config.json"
REPORT_FILE = os.path.join("6_Semblance", "smoke_test_report.md")
REQUIRED_ROOT_FILES = ["index.html", "markdown_renderer.html", "README.md", "robots.txt", "sitemap.xml"]
REQUIRED_INDEX_LINKS = ["github.com", "linkedin.com", "youtube.com"]
STAGE_GLOB = re.compile(r"^[1-7]_[A-Za-z_]+$")
MD_URL_PATTERN = re.compile(r"[0-9A-Za-z_]+/[0-9A-Za-z_/.\-]*\.md")
SECRET_PATTERN = re.compile(
    r"""(ghp_[A-Za-z0-9]{36}|xox[baprs]-[A-Za-z0-9\-]{10,}|AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9]{32,}|xaat-[A-Za-z0-9\-]{20,})"""
)


class Result:
    def __init__(self, name, passed, detail=""):
        self.name = name
        self.passed = passed
        self.detail = detail


def find_project_root():
    """Walk up from cwd until navigation_config.json is found."""
    d = os.path.abspath(os.getcwd())
    while True:
        if os.path.exists(os.path.join(d, CONFIG_FILE)):
            return d
        parent = os.path.dirname(d)
        if parent == d:
            sys.exit(f"ERROR: {CONFIG_FILE} not found walking up from {os.getcwd()}")
        d = parent


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def fetch(url, timeout=15):
    req = urllib.request.Request(url, headers={"User-Agent": "delivery-pilot-smoke-test"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.status, resp.read().decode("utf-8", errors="replace")


def menu_urls(config):
    for section in ("projectMenu", "debugMenu"):
        for entry in config.get(section, []):
            url = entry.get("url", "")
            if url and url != "divider":
                yield section, entry.get("label", ""), url


def run_checks(root, base_url=None):
    results = []
    os.chdir(root)

    # 1. Navigation config is valid JSON with both menus
    try:
        config = json.loads(read(CONFIG_FILE))
        ok = "projectMenu" in config and "debugMenu" in config
        results.append(Result("Navigation Config", ok, "" if ok else "projectMenu/debugMenu key missing"))
    except (OSError, json.JSONDecodeError) as e:
        results.append(Result("Navigation Config", False, str(e)))
        return results  # everything downstream needs the config

    # 2. Required root files exist
    missing = [f for f in REQUIRED_ROOT_FILES if not os.path.exists(f)]
    results.append(Result("Page Load (root files)", not missing, f"missing: {', '.join(missing)}" if missing else ""))

    # 3. Every menu URL resolves (local file/dir, or HTTP 200 in --base-url mode)
    broken = []
    for section, label, url in menu_urls(config):
        target = url.split("?file=")[-1] if "?file=" in url else url.split("?")[0]
        if base_url:
            page = url if url.endswith((".html", "/")) else "markdown_renderer.html?file=" + url
            full = base_url.rstrip("/") + "/" + page
            try:
                status, _ = fetch(full)
                if status != 200:
                    broken.append(f"{url} → HTTP {status}")
            except (urllib.error.URLError, TimeoutError) as e:
                broken.append(f"{url} → {e}")
        else:
            if not os.path.exists(target):
                broken.append(f"{section}: '{label.strip()}' → {target}")
    results.append(Result("Menu Links Resolve", not broken, "; ".join(broken[:10])))

    # 4. Project Menu and Debug Menu are non-empty
    results.append(Result("Project Menu", bool(config.get("projectMenu")), ""))
    results.append(Result("Debug Menu", bool(config.get("debugMenu")), ""))

    # 5. 3-way navigation sync: config = index.html fallback = markdown_renderer.html fallback
    if os.path.exists("index.html") and os.path.exists("markdown_renderer.html"):
        cfg_md = set(MD_URL_PATTERN.findall(read(CONFIG_FILE)))
        idx_md = set(MD_URL_PATTERN.findall(read("index.html")))
        ren_md = set(MD_URL_PATTERN.findall(read("markdown_renderer.html")))
        drift = (cfg_md ^ idx_md) | (cfg_md ^ ren_md)
        results.append(Result("Nav 3-Way Sync", not drift, f"drift: {sorted(drift)[:8]}" if drift else ""))
    else:
        results.append(Result("Nav 3-Way Sync", False, "index.html or markdown_renderer.html missing"))

    # 6. No stage markdown file orphaned from the menus
    stage_docs = set()
    for d in sorted(os.listdir(".")):
        if STAGE_GLOB.match(d) and os.path.isdir(d):
            for dirpath, dirnames, filenames in os.walk(d):
                dirnames[:] = [x for x in dirnames if not x.startswith((".", "_obsolete"))]
                stage_docs.update(
                    os.path.join(dirpath, f).replace(os.sep, "/") for f in filenames if f.endswith(".md")
                )
    listed = set(MD_URL_PATTERN.findall(read(CONFIG_FILE)))
    orphans = sorted(stage_docs - listed)
    results.append(Result("Stage Docs In Menu", not orphans, f"orphaned: {orphans[:8]}" if orphans else ""))

    # 7. Social links present in index.html
    if os.path.exists("index.html"):
        index_html = read("index.html")
        missing_links = [l for l in REQUIRED_INDEX_LINKS if l not in index_html]
        results.append(Result("Social Links", not missing_links, f"missing: {missing_links}" if missing_links else ""))
    else:
        results.append(Result("Social Links", False, "index.html missing"))

    # 8. README contains the GitHub Pages URL
    if os.path.exists("README.md"):
        has_pages = "github.io" in read("README.md")
        results.append(Result("README Pages URL", has_pages, "" if has_pages else "no github.io URL in README.md"))
    else:
        results.append(Result("README Pages URL", False, "README.md missing"))

    # 9. No committed secret-shaped strings in text files
    leaks = []
    for dirpath, dirnames, filenames in os.walk("."):
        dirnames[:] = [x for x in dirnames if x not in (".git", "node_modules", "_obsolete") and not x.startswith(".kilo")]
        for f in filenames:
            if f.endswith((".md", ".html", ".json", ".yml", ".yaml", ".toml", ".js", ".py", ".example")):
                p = os.path.join(dirpath, f)
                try:
                    for m in SECRET_PATTERN.finditer(read(p)):
                        token = m.group(0).lower()
                        # skip documented placeholders like ghp_xxxx… or xaat-your-…
                        if "xxxx" not in token and "your" not in token and "example" not in token:
                            leaks.append(f"{p}: {m.group(0)[:12]}…")
                except (OSError, UnicodeDecodeError):
                    continue
    results.append(Result("Secrets Scan", not leaks, "; ".join(leaks[:5])))

    # 10. Deployed site reachable (cloud mode only)
    if base_url:
        try:
            status, body = fetch(base_url)
            ok = status == 200 and "<html" in body.lower()
            results.append(Result("Deployed Site Reachable", ok, f"HTTP {status}"))
        except (urllib.error.URLError, TimeoutError) as e:
            results.append(Result("Deployed Site Reachable", False, str(e)))

    return results


def write_report(root, results, base_url, trigger):
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    failures = [r for r in results if not r.passed]
    verdict = "✅ ALL PASS" if not failures else f"❌ {len(failures)} FAILURE(S)"
    mode = f"Cloud ({base_url})" if base_url else "Local filesystem"

    lines = [
        "# Smoke Test Report",
        "",
        "> **Stage 6: Semblance** — Generated by `5_Symbols/toolbox/smoke_test.py` (SPEC-008).",
        "> Latest run overwrites this file; one report per test run.",
        "",
        "## Run Info",
        f"- **Date:** {now}",
        f"- **Trigger:** {trigger}",
        f"- **Mode:** {mode}",
        "- **Tester:** smoke_test.py (automated)",
        f"- **Verdict:** {verdict}",
        "",
        "## Results Summary",
        "| Test | Result | Detail |",
        "|------|--------|--------|",
    ]
    for r in results:
        lines.append(f"| {r.name} | {'✅ Pass' if r.passed else '❌ Fail'} | {r.detail or '—'} |")

    lines += ["", "## Failures", ""]
    if failures:
        for i, r in enumerate(failures, 1):
            lines += [
                f"### #{i} — {r.name}",
                f"- **Error:** {r.detail or 'see results table'}",
                "- **GitHub Issue:** _create per the Smoke Tests & GitHub Issues rule_",
                "- **Status:** Open",
                "",
            ]
    else:
        lines += ["None — all smoke tests passed. ✨", ""]

    lines += [
        "## Rules Applied",
        "- Every failure gets a GitHub Issue (`[SMOKE-FAIL] <test> — <description>`)",
        "- Failures logged to `6_Semblance/error.log`, fixes to `6_Semblance/fix.log`",
        "- Smoke tests gate deployments — do not deploy while any test fails",
        "",
    ]
    path = os.path.join(root, REPORT_FILE)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    return path


def main():
    ap = argparse.ArgumentParser(description="Template-adapted smoke test runner (SPEC-008)")
    ap.add_argument("--base-url", help="Deployed site URL for cloud mode (e.g. https://user.github.io/repo/)")
    ap.add_argument("--trigger", default="Manual run", help="What triggered this run (for the report)")
    ap.add_argument("--no-report", action="store_true", help="Run checks without writing the report file")
    args = ap.parse_args()

    root = find_project_root()
    results = run_checks(root, args.base_url)

    width = max(len(r.name) for r in results)
    for r in results:
        print(f"{'PASS' if r.passed else 'FAIL'}  {r.name.ljust(width)}  {r.detail}")

    if not args.no_report:
        path = write_report(root, results, args.base_url, args.trigger)
        print(f"\nReport written: {os.path.relpath(path, root)}")

    failed = sum(1 for r in results if not r.passed)
    print(f"\n{len(results) - failed}/{len(results)} smoke tests passed.")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
