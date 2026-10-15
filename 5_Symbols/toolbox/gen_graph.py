#!/usr/bin/env python3
"""
Knowledge Graph Extractor — delivery-pilot-template (SPEC-027)

Scans Markdown and HTML documents across the 7 stages, extracts Wikilinks
([[target|relationship]]) and document references, identifies orphan nodes,
and generates 1_Real_Unknown/Why/graph_data.json for the interactive canvas viewer.

Usage:
    python3 5_Symbols/toolbox/gen_graph.py
"""

import os
import re
import json
import urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

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

STAGE_COLORS = {
    "1_Real_Unknown": "#8b5cf6",  # Violet
    "2_Environment": "#06b6d4",   # Cyan
    "3_Simulation": "#10b981",    # Emerald
    "4_Formula": "#f59e0b",       # Amber
    "5_Symbols": "#ef4444",       # Red
    "6_Semblance": "#ec4899",     # Pink
    "7_Testing_Known": "#3b82f6", # Blue
    "Root": "#64748b",            # Slate
}

# Regex for wikilinks: [[target|relationship]] or [[target]]
WIKILINK_RE = re.compile(r"\[\[\s*([^|\]\r\n]+?)(?:\s*\|\s*([^\]\r\n]+?))?\s*\]\]")

# Regex for markdown links: [text](path.md)
MD_LINK_RE = re.compile(r'(?:!\[.*?\]|\[.*?\])\(([^)\s#]+)(?:#[^)\s]*)?(?:\s+["\'].*?["\'])?\)')

def get_stage(rel_path):
    parts = rel_path.split("/")
    for p in parts:
        if p in STAGE_COLORS:
            return p
    return "Root"

def get_title(content, fallback):
    match = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
    if match:
        title = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", match.group(1)).strip()
        # Strip wikilinks if inside title
        title = re.sub(r"\[\[.*?\]\]", "", title).strip()
        return title[:50]
    return fallback

def get_excerpt(content, max_len=240):
    text = re.sub(r"```.*?```", "", content, flags=re.DOTALL)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"!\[.*?\]\(.*?\)", "", text)
    text = re.sub(r"\[\[([^|\]]+)\|([^\]]+)\]\]", r"\2", text)
    text = re.sub(r"\[\[([^\]]+)\]\]", r"\1", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"^#+\s*.*$", "", text, flags=re.MULTILINE)
    text = " ".join(text.split())
    if len(text) > max_len:
        return text[:max_len].rsplit(" ", 1)[0] + "…"
    return text or "Document index or configuration file."

def normalize_rel_path(path):
    return path.replace("\\", "/").lstrip("./")

def find_candidate_target(target_str, source_dir, all_files_set, basename_map):
    target_clean = target_str.strip().replace("\\", "/")
    target_clean = target_clean.split("?")[0].split("#")[0]
    
    # 1. Direct path relative to source_dir
    cand1 = normalize_rel_path(os.path.normpath(os.path.join(source_dir, target_clean)))
    if cand1 in all_files_set:
        return cand1
        
    # 2. Path relative to repo root
    cand2 = normalize_rel_path(target_clean)
    if cand2 in all_files_set:
        return cand2
        
    # 3. Match by basename
    base = os.path.basename(target_clean)
    if base in basename_map:
        return basename_map[base]

    # 4. Try appending .md if omitted
    if not target_clean.endswith(".md") and not target_clean.endswith(".html"):
        with_md = target_clean + ".md"
        c3 = normalize_rel_path(os.path.normpath(os.path.join(source_dir, with_md)))
        if c3 in all_files_set:
            return c3
        c4 = normalize_rel_path(with_md)
        if c4 in all_files_set:
            return c4
        if os.path.basename(with_md) in basename_map:
            return basename_map[os.path.basename(with_md)]

    return None

def build_knowledge_graph():
    tracked_files = []
    basename_map = {}

    for root, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS and not d.startswith(".git")]
        for f in files:
            if f.endswith(".md") or f.endswith(".html"):
                full_path = os.path.join(root, f)
                rel_path = normalize_rel_path(os.path.relpath(full_path, ROOT))
                tracked_files.append(rel_path)
                basename = os.path.basename(rel_path)
                if basename not in basename_map:
                    basename_map[basename] = rel_path

    all_files_set = set(tracked_files)

    nodes = {}
    edges = []
    edge_keys = set()

    for rel_path in tracked_files:
        full_path = os.path.join(ROOT, rel_path)
        try:
            with open(full_path, "r", encoding="utf-8", errors="ignore") as fp:
                content = fp.read()
        except Exception:
            continue

        stage = get_stage(rel_path)
        basename = os.path.basename(rel_path)
        title = get_title(content, basename)
        excerpt = get_excerpt(content)

        nodes[rel_path] = {
            "id": rel_path,
            "label": basename,
            "title": title,
            "excerpt": excerpt,
            "path": rel_path,
            "stage": stage,
            "color": STAGE_COLORS.get(stage, "#64748b"),
            "in_degree": 0,
            "out_degree": 0,
            "wikilinks_count": 0,
            "is_orphan": True,
        }

    # Extract relationships
    for source_path in tracked_files:
        full_path = os.path.join(ROOT, source_path)
        try:
            with open(full_path, "r", encoding="utf-8", errors="ignore") as fp:
                content = fp.read()
        except Exception:
            continue

        source_dir = os.path.dirname(source_path)

        # 1. Wikilinks [[target|relation]]
        for match in WIKILINK_RE.finditer(content):
            raw_target = match.group(1).strip()
            relation = (match.group(2) or "relates to").strip()
            target_path = find_candidate_target(raw_target, source_dir, all_files_set, basename_map)
            if target_path and target_path in nodes and target_path != source_path:
                key = (source_path, target_path, relation)
                if key not in edge_keys:
                    edge_keys.add(key)
                    edges.append({
                        "source": source_path,
                        "target": target_path,
                        "relationship": relation,
                        "type": "wikilink"
                    })
                    nodes[source_path]["out_degree"] += 1
                    nodes[source_path]["wikilinks_count"] += 1
                    nodes[target_path]["in_degree"] += 1

        # 2. Markdown local links (secondary / fallback)
        clean_content = re.sub(r"```.*?```", "", content, flags=re.DOTALL)
        for match in MD_LINK_RE.finditer(clean_content):
            raw_url = match.group(1).strip()
            if raw_url.startswith(("http://", "https://", "mailto:", "#")):
                continue
            target_path = find_candidate_target(raw_url, source_dir, all_files_set, basename_map)
            if target_path and target_path in nodes and target_path != source_path:
                key = (source_path, target_path, "references")
                if not any(e["source"] == source_path and e["target"] == target_path for e in edges):
                    if key not in edge_keys:
                        edge_keys.add(key)
                        edges.append({
                            "source": source_path,
                            "target": target_path,
                            "relationship": "references",
                            "type": "markdown_link"
                        })
                        nodes[source_path]["out_degree"] += 1
                        nodes[target_path]["in_degree"] += 1

    # Mark orphan status
    orphan_count = 0
    for node_id, node in nodes.items():
        total_degree = node["in_degree"] + node["out_degree"]
        node["degree"] = total_degree
        node["is_orphan"] = (total_degree == 0)
        if node["is_orphan"]:
            orphan_count += 1

    graph_data = {
        "metadata": {
            "total_nodes": len(nodes),
            "total_edges": len(edges),
            "orphan_count": orphan_count,
            "connected_count": len(nodes) - orphan_count,
            "generated_at": "2026-10-15",
            "stages": STAGE_COLORS,
        },
        "nodes": list(nodes.values()),
        "edges": edges,
    }

    out_file = os.path.join(ROOT, "1_Real_Unknown", "Why", "graph_data.json")
    with open(out_file, "w", encoding="utf-8") as fp:
        json.dump(graph_data, fp, indent=2, ensure_ascii=False)

    print(f"✅ Generated knowledge graph: {len(nodes)} nodes, {len(edges)} edges, {orphan_count} orphans.")
    print(f"📁 Written to: {out_file}")
    return graph_data

if __name__ == "__main__":
    build_knowledge_graph()
