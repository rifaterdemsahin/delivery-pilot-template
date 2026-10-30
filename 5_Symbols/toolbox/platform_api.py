#!/usr/bin/env python3
"""Fly.io + GitHub API client for delivery-pilot projects (SPEC-028).

Reads non-secret settings from 2_Environment/platform_config.json and loads
API tokens from Azure Key Vault at runtime (`az keyvault secret show`), with an
environment-variable fallback for CI. Tokens are never printed or written.
Standard library only.

Usage:
  platform_api.py fly-apps                      list Fly apps
  platform_api.py fly-machines [-a APP]         list machines (all configured apps if omitted)
  platform_api.py fly-drift                     exit 1 if an unapproved machine is started
  platform_api.py gh-config [--out DIR]         fetch shared config files from the config repo
  platform_api.py check                         verify both tokens resolve (no values shown)
"""
import argparse
import base64
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CONFIG_PATH = os.path.join(ROOT, "2_Environment", "platform_config.json")


def load_config():
    with open(CONFIG_PATH, encoding="utf-8") as f:
        return json.load(f)


def get_secret(cfg, key):
    """Key Vault first, then env fallback. Raises RuntimeError if neither works."""
    kv = cfg["key_vault"]
    name = kv["secrets"][key]
    try:
        out = subprocess.run(
            ["az", "keyvault", "secret", "show", "--vault-name", kv["name"],
             "--name", name, "--query", "value", "-o", "tsv"],
            capture_output=True, text=True, timeout=30)
        if out.returncode == 0 and out.stdout.strip():
            return out.stdout.strip()
    except (OSError, subprocess.TimeoutExpired):
        pass
    env = os.environ.get(cfg["env_fallback"][key], "").strip()
    if env:
        return env
    raise RuntimeError(
        f"Secret {name} unavailable: run `az login` with access to vault "
        f"{kv['name']}, or set ${cfg['env_fallback'][key]} (CI).")


def http_json(url, token, accept="application/json"):
    req = urllib.request.Request(
        url, headers={"Authorization": f"Bearer {token}", "Accept": accept,
                      "User-Agent": "delivery-pilot-platform-api"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"{e.code} {e.reason} for {url}") from None


# ---- Fly.io -----------------------------------------------------------------
def fly_apps(cfg):
    tok = get_secret(cfg, "fly_api_token")
    org = cfg["fly"]["org"]
    data = http_json(f"{cfg['fly']['api_base']}/apps?org_slug={org}", tok)
    return data.get("apps", data)


def fly_machines(cfg, app):
    tok = get_secret(cfg, "fly_api_token")
    return http_json(f"{cfg['fly']['api_base']}/apps/{app}/machines", tok)


def target_apps(cfg, app):
    if app:
        return [app]
    if cfg["fly"]["apps"]:
        return cfg["fly"]["apps"]
    return [a["name"] for a in fly_apps(cfg)]


def cmd_fly_machines(cfg, args):
    for app in target_apps(cfg, args.app):
        for m in fly_machines(cfg, app):
            print(f"{app}\t{m['id']}\t{m.get('state')}\t{m.get('region')}\t{m.get('name')}")


def cmd_fly_drift(cfg, args):
    approved = set(cfg["fly"]["approved_running"])
    bad = []
    for app in target_apps(cfg, None):
        if app in approved:
            continue
        bad += [(app, m["id"]) for m in fly_machines(cfg, app) if m.get("state") == "started"]
    for app, mid in bad:
        print(f"UNAPPROVED RUNNING: {app} {mid}")
    print("fly-drift:", "FAIL" if bad else "OK")
    return 1 if bad else 0


# ---- GitHub shared config ---------------------------------------------------
def cmd_gh_config(cfg, args):
    tok = get_secret(cfg, "github_token")
    sc = cfg["github"]["shared_config"]
    for path in sc["paths"]:
        url = f"{cfg['github']['api_base']}/repos/{sc['repo']}/contents/{path}?ref={sc['ref']}"
        meta = http_json(url, tok)
        body = base64.b64decode(meta["content"])
        dest = os.path.join(args.out, path)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "wb") as f:
            f.write(body)
        print(f"fetched {sc['repo']}@{sc['ref']}:{path} -> {dest}")


def cmd_check(cfg, args):
    ok = True
    for key in ("fly_api_token", "github_token"):
        try:
            get_secret(cfg, key)
            print(f"{key}: OK")
        except RuntimeError as e:
            ok = False
            print(f"{key}: MISSING - {e}")
    return 0 if ok else 1


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("fly-apps")
    m = sub.add_parser("fly-machines"); m.add_argument("-a", "--app")
    sub.add_parser("fly-drift")
    g = sub.add_parser("gh-config"); g.add_argument("--out", default=os.path.join(ROOT, ".shared-config"))
    sub.add_parser("check")
    args = p.parse_args()
    cfg = load_config()
    try:
        if args.cmd == "fly-apps":
            for a in fly_apps(cfg):
                print(a["name"])
        elif args.cmd == "fly-machines":
            cmd_fly_machines(cfg, args)
        elif args.cmd == "fly-drift":
            return cmd_fly_drift(cfg, args)
        elif args.cmd == "gh-config":
            cmd_gh_config(cfg, args)
        elif args.cmd == "check":
            return cmd_check(cfg, args)
    except RuntimeError as e:
        print(f"error: {e}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
