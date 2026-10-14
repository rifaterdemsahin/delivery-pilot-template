#!/usr/bin/env python3
"""
Link Integrity Checker — delivery-pilot-template (SPEC-023)

Scans all Markdown (.md) and HTML (.html) files across the repository to verify
that all local relative links, image references, and file paths resolve to existing
files or directories.

Skips:
- External links (http://, https://, mailto:, etc.)
- In-page anchors (#section)
- Fenced code blocks in Markdown (``` ... ``` or ~~~ ... ~~~)
- Template variables ({{ ... }}, ${...})
- Ignored VCS and cache directories (.git, node_modules, etc.)

Usage:
    python3 5_Symbols/toolbox/check_links.py
    python3 5_Symbols/toolbox/check_links.py --verbose
    python3 5_Symbols/toolbox/check_links.py --root .

Exit code:
    0 = all internal links resolve successfully
    1 = one or more broken links detected
"""

import argparse
import os
import re
import sys
import urllib.parse

IGNORED_DIRS = {
    ".git",
    ".antigravitycli",
    ".gemini",
    "node_modules",
    ".venv",
    "venv",
    "__pycache__",
    ".DS_Store",
    "_obsolete",
}

# Regex to find inline code blocks: `code` or ``code``
INLINE_CODE_RE = re.compile(r"(`+).*?\1")

# Regex to find Markdown links: [text](target) or ![alt](target)
MD_LINK_RE = re.compile(r'(?:!\[.*?\]|\[.*?\])\(([^)\s]+)(?:\s+["\'].*?["\'])?\)')

# Regex to find HTML href and src attributes: href="target", src="target"
HTML_ATTR_RE = re.compile(r'(?:href|src)=["\']([^"\']+)["\']', re.IGNORECASE)

EXTERNAL_PREFIXES = (
    "http://",
    "https://",
    "mailto:",
    "ftp://",
    "data:",
    "javascript:",
    "tel:",
    "file://",
)


def is_external_or_special(target: str) -> bool:
    """Return True if the target URL is external, mailto, anchor-only, or special."""
    target_clean = target.strip()
    if not target_clean or target_clean.startswith("#"):
        return True
    if any(target_clean.startswith(prefix) for prefix in EXTERNAL_PREFIXES):
        return True
    if (target_clean.startswith("{{") and target_clean.endswith("}}")) or \
       (target_clean.startswith("${") and target_clean.endswith("}")):
        return True
    return False


def clean_target_path(target: str) -> str:
    """Strip anchor fragments, query parameters, and unquote URL encoding."""
    target_clean = target.strip()
    if "?" in target_clean:
        target_clean = target_clean.split("?")[0]
    if "#" in target_clean:
        target_clean = target_clean.split("#")[0]
    return urllib.parse.unquote(target_clean).strip()


def find_files_to_scan(root_dir: str):
    """Yield all .md and .html files in the repository."""
    for dirpath, dirnames, filenames in os.walk(root_dir):
        dirnames[:] = [d for d in dirnames if d not in IGNORED_DIRS and not d.startswith(".kilo")]
        for f in filenames:
            if f.endswith((".md", ".html")):
                yield os.path.join(dirpath, f)


def check_links_in_file(file_path: str, repo_root: str):
    """
    Check all links in a given file.
    Returns list of dicts: {"source": file_path, "line": int, "raw": str, "cleaned": str, "resolved": str, "exists": bool}
    """
    broken_links = []
    try:
        with open(file_path, "r", encoding="utf-8", errors="replace") as f:
            lines = f.readlines()
    except OSError as e:
        return [{"source": file_path, "line": 0, "raw": "", "cleaned": "", "resolved": str(e), "exists": False}]

    file_dir = os.path.dirname(os.path.abspath(file_path))
    repo_root_abs = os.path.abspath(repo_root)
    is_markdown = file_path.endswith(".md")
    in_code_block = False

    for line_idx, line in enumerate(lines, start=1):
        stripped_line = line.strip()

        # Track fenced code blocks in Markdown files
        if is_markdown:
            if stripped_line.startswith("```") or stripped_line.startswith("~~~"):
                in_code_block = not in_code_block
                continue
            if in_code_block:
                continue

        # Extract markdown targets and HTML attribute targets
        scan_line = INLINE_CODE_RE.sub("", line) if is_markdown else line
        md_targets = MD_LINK_RE.findall(scan_line) if is_markdown else []
        html_targets = HTML_ATTR_RE.findall(scan_line)
        targets = md_targets + html_targets

        for raw_target in targets:
            if is_external_or_special(raw_target):
                continue

            cleaned = clean_target_path(raw_target)
            if not cleaned:  # was just a pure anchor or query
                continue

            # Resolve path:
            # If target starts with '/', resolve relative to repo root
            if cleaned.startswith("/"):
                resolved = os.path.normpath(os.path.join(repo_root_abs, cleaned.lstrip("/")))
            else:
                resolved = os.path.normpath(os.path.join(file_dir, cleaned))

            if not os.path.exists(resolved):
                broken_links.append({
                    "source": os.path.relpath(file_path, repo_root),
                    "line": line_idx,
                    "raw": raw_target,
                    "cleaned": cleaned,
                    "resolved": os.path.relpath(resolved, repo_root) if resolved.startswith(repo_root_abs) else resolved,
                    "exists": False
                })

    return broken_links


def run_link_check(repo_root: str = "."):
    """Scan all files and return (total_files, total_links_checked, broken_links)."""
    broken_links = []
    files = list(find_files_to_scan(repo_root))
    for f in sorted(files):
        broken = check_links_in_file(f, repo_root)
        broken_links.extend(broken)
    return len(files), broken_links


def main():
    parser = argparse.ArgumentParser(description="Link Integrity Checker (SPEC-023)")
    parser.add_argument("--root", default=".", help="Root directory of repository")
    parser.add_argument("--verbose", "-v", action="store_true", help="Show detailed breakdown")
    args = parser.parse_args()

    repo_root = os.path.abspath(args.root)
    file_count, broken = run_link_check(repo_root)

    print(f"Scanned {file_count} markdown and HTML files.")
    if not broken:
        print("✅ All internal relative links are intact!")
        sys.exit(0)

    print(f"❌ Found {len(broken)} broken link(s):\n")
    for item in broken:
        print(f"  {item['source']}:{item['line']}")
        print(f"    Target:   {item['raw']}")
        print(f"    Resolved: {item['resolved']}")
        print()

    sys.exit(1)


if __name__ == "__main__":
    main()
