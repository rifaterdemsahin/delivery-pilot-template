#!/usr/bin/env python3
"""Validate a harness task packet (SPEC-014) before a bot run starts.

Usage:
    python3 5_Symbols/toolbox/harness_packet.py <packet.md> [--trigger TEXT]

Packet format (markdown bullet fields; see 1_Real_Unknown/tasks.md template):

    - id: TSK-033
    - outcome: <one sentence>
    - allowed paths: <files/dirs the bot may touch>
    - forbidden paths: <never touch; must name the main branch>
    - verifier: python3 5_Symbols/toolbox/smoke_test.py
    - spec id (optional): <SPEC-XXX or empty>

Exit code 0 = ACCEPT (bot may start), 1 = REFUSE (bot must stop, log [PENDING]).
Dependency-free, like smoke_test.py.
"""
import re
import sys

VERIFIER = "python3 5_Symbols/toolbox/smoke_test.py"
MANDATORY = ["id", "outcome", "allowed paths", "forbidden paths", "verifier"]
SECRET_HINTS = (".env", ".pem", "id_rsa", "secrets.json", ".key", "credentials")


def parse_packet(path):
    fields = {}
    for line in open(path).read().splitlines():
        m = re.match(r"\s*-\s*([^:]+):\s*(.*)", line)
        if m:
            fields[m.group(1).strip().lower()] = m.group(2).strip()
    return fields


def check(fields):
    reasons = []
    for f in MANDATORY:
        if not fields.get(f):
            reasons.append(f"missing mandatory field: '{f}'")
    if reasons:
        return reasons
    if not re.fullmatch(r"TSK-\d+", fields["id"]):
        reasons.append(f"bad id '{fields['id']}' (want TSK-NNN)")
    if fields["verifier"] != VERIFIER:
        reasons.append(
            f"verifier must be exactly '{VERIFIER}' (bot may not choose its own done)"
        )
    if "main" not in fields["forbidden paths"].lower():
        reasons.append("forbidden paths must name the main branch (never write to main)")
    blob = (fields["outcome"] + "\n" + fields["allowed paths"]).lower()
    if any(h in blob for h in SECRET_HINTS) or re.search(
        r"commit.*(secret|token|private.?key|password)", blob
    ):
        reasons.append("packet asks for secrets in git — refuse (golden task 3)")
    return reasons


def main():
    if len(sys.argv) < 2 or sys.argv[1].startswith("-"):
        print("usage: harness_packet.py <packet.md> [--trigger TEXT]")
        return 2
    fields = parse_packet(sys.argv[1])
    reasons = check(fields)
    if reasons:
        print("REFUSE — bot must not start:")
        for r in reasons:
            print(f"  - {r}")
        return 1
    print(f"ACCEPT {fields['id']}: {fields['outcome']}")
    print(f"  allowed: {fields['allowed paths']}")
    print(f"  verifier: {fields['verifier']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
