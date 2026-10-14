#!/usr/bin/env python3
"""
Generate repo_files.json catalog for Master Review in delivery-pilot-template.

Scans the repository and outputs a structured JSON list of reviewable files,
ordered by architectural stage:
1_Real_Unknown -> 2_Environment -> 3_Simulation -> 4_Formula -> 5_Symbols -> 6_Semblance -> 7_Testing_Known -> root/tooling.
"""

import argparse
import json
import os
import sys

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))

STAGE_ORDER = [
    '1_Real_Unknown',
    '2_Environment',
    '3_Simulation',
    '4_Formula',
    '5_Symbols',
    '6_Semblance',
    '7_Testing_Known',
    '.github',
    '.claude',
    '.kilo',
]

EXCLUDE_DIRS = {
    '.git', '.pytest_cache', '__pycache__', '.venv', '.antigravitycli',
    '.vscode', 'node_modules', 'dist', 'build', '.storage'
}

EXCLUDE_FILES = {
    '.DS_Store', 'repo_files.json', 'master_review_state.json'
}

EXT_CATEGORIES = {
    '.md': 'Documentation',
    '.html': 'Pages',
    '.css': 'Styles',
    '.js': 'JavaScript',
    '.py': 'Python',
    '.json': 'Config',
    '.png': 'Images',
    '.jpg': 'Images',
    '.jpeg': 'Images',
    '.svg': 'Images',
    '.webp': 'Images',
    '.gif': 'Images',
    '.pdf': 'Documents',
    '.excalidraw': 'Wireframes',
    '.yml': 'Workflows',
    '.yaml': 'Workflows',
    '.sh': 'Scripts',
    '.toml': 'Config',
    '.txt': 'Text',
    '.xml': 'Data'
}


def stage_sort_key(rel_path):
    top = rel_path.split(os.sep)[0]
    try:
        priority = STAGE_ORDER.index(top)
    except ValueError:
        priority = len(STAGE_ORDER)
    return (priority, rel_path.lower())


def get_category(ext, rel_path):
    if '/rules/' in rel_path:
        return 'Rules'
    if '/toolbox/' in rel_path:
        return 'Toolbox'
    return EXT_CATEGORIES.get(ext, 'Other')


def generate_catalog(repo_root=REPO_ROOT):
    """Scan the repository and return a list of file descriptors sorted by stage."""
    catalog = []
    for dirpath, dirnames, filenames in os.walk(repo_root):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS and not d.startswith('.git')]
        for f in filenames:
            if f in EXCLUDE_FILES:
                continue
            full_path = os.path.join(dirpath, f)
            rel_path = os.path.relpath(full_path, repo_root).replace(os.sep, '/')
            ext = os.path.splitext(f)[1].lower()
            try:
                size = os.path.getsize(full_path)
            except OSError:
                size = 0

            catalog.append({
                'path': rel_path,
                'name': f,
                'ext': ext,
                'size': size,
                'category': get_category(ext, rel_path)
            })

    catalog.sort(key=lambda item: stage_sort_key(item['path']))
    return catalog


def write_catalog(target_path=None, repo_root=REPO_ROOT):
    """Write catalog to target_path (default: 5_Symbols/deliverypilot/master_review/repo_files.json)."""
    if target_path is None:
        target_path = os.path.join(repo_root, '5_Symbols', 'deliverypilot', 'master_review', 'repo_files.json')
    catalog = generate_catalog(repo_root)
    os.makedirs(os.path.dirname(os.path.abspath(target_path)), exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        json.dump(catalog, f, indent=2)
    return catalog


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('-o', '--output', help='Destination path for repo_files.json')
    args = parser.parse_args()

    out_path = args.output or os.path.join(REPO_ROOT, '5_Symbols', 'deliverypilot', 'master_review', 'repo_files.json')
    catalog = write_catalog(out_path)
    print(f'Generated {out_path} with {len(catalog)} files.')


if __name__ == '__main__':
    main()
