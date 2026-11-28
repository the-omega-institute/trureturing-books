#!/usr/bin/env python3
"""Inventory of Lean citations by foundation: which ones already rest on strict Omega mathematics.

A frozen row in trureturing carries one measurement per backend: the primary record is the
official Lean Init and Mathlib build, and ``strict_omega``, when present, is the strict build.
A cited declaration counts as Omega-only when one of these measurements records ``libraries``
as a non-empty subset of {OmegaInit, OmegaMath} and ``axioms`` as ``[]`` (trureturing
docs/CONTRIBUTING.md, "Omega-only, zero-axiom claim"). The official build names its foundation
``Init``, so a D5 consumer of the Omega interface qualifies through its strict measurement; the
report keeps both backends' ``libraries`` and ``axioms`` side by side. For every other citation
the script gives a first-pass tier from the Lean signature and the module source. Tiers B and C
are candidates for migration and still need a reading of the statement; tier D needs real or
complex analysis, which strict Omega mathematics does not provide.

Reviewed decisions (planned for a batch, or excluded with a reason) are kept in the tracking issue, not in
the repository (PROJECT.md section 11); the script only measures.

Usage (from the repository root):
    python3 skills/local-omega-migration/omega_inventory.py [--book quantum-geometry] [--ref origin/dev]
        [--json build/omega/inventory.json] [--md build/omega/inventory.md]

The trureturing checkout is $TRURETURING_DIR (default ~/trureturing); --ref names the commit to read
(default origin/dev, after `git -C $TRURETURING_DIR fetch origin dev`).
"""
from __future__ import annotations

import argparse
import collections
import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools"))

from tbook import config, lean  # noqa: E402
from tbook.model import load_book_models, media_cited_gids  # noqa: E402

OMEGA_LIBS = {"OmegaInit", "OmegaMath"}

# Tokens that need real or complex numbers, limits, measure, topology or normed spaces.
ANALYTIC = re.compile(
    r"ℝ|ℂ|\bReal\b|\bComplex\b|Real\.|Complex\.|\bderiv|∫|Tendsto|\bFilter\b|Measure|Continuous|Differentiable"
    r"|EuclideanSpace|InnerProductSpace|\binner\b|‖|ENNReal|NNReal|√|\bπ\b|Real\.pi|tsum|∑'|Summable|HasSum"
    r"|PowerSeries|HilbertSpace|ContinuousLinearMap|Analytic|Holomorphic|\bexp\b|\blog\b|\bcos\b|\bsin\b"
    r"|DensityState|DensityMatrix|QuantumChannel|traceDistance|Bloch|Unitary|Hermitian|PosSemidef|IsSelfAdjoint"
    r"|riemannZeta|Zeta|\bvolume\b|\bTopology\b|TopologicalSpace|Metric|dist\b|Circle\b"
)
# Mathlib structures without a strict Omega counterpart yet (finite, but need infrastructure).
STRUCTURAL = re.compile(
    r"\bMatrix\b|Finset|Fintype|\bSet\b|Set\.|SimpleGraph|Submodule|Module\b|LinearMap|\bGroup\b|Subgroup"
    r"|MulAction|Equiv\.Perm|Polynomial|ZMod|Nat\.card|Finsupp|Multiset|Quaternion|GaussianInt|Zsqrtd|IsUnit"
    r"|Nat\.Prime|Nat\.Coprime|Nat\.fib|Int\.fib|Field\b|CommRing|\bRing\b|Algebra\b|Ideal|Even\b|Odd\b"
)
SOURCE_ANALYTIC = re.compile(r"ℝ|ℂ|\bReal\b|\bComplex\b|Mathlib\.(Analysis|Topology|MeasureTheory|Probability"
                             r"|NumberTheory\.LSeries|NumberTheory\.ZetaFunction)")


def citations(book: config.Book) -> dict[str, list[dict]]:
    """GID -> places it is cited in the authoritative edition and the media."""
    out: dict[str, list[dict]] = collections.defaultdict(list)
    models = load_book_models(book)
    model = models[book.editions[0].lang]
    for path, line, gid, env in model.cited_gids():
        out[gid].append({"file": str(Path(path).relative_to(ROOT)), "line": line,
                         "env": env.kind if env else "link", "id": env.id if env else ""})
    for path, line, gid in media_cited_gids(book):
        out[gid].append({"file": str(Path(path).relative_to(ROOT)), "line": line, "env": "media", "id": ""})
    return out


def frozen_row(state: dict, want: list[str]) -> dict | None:
    for decl in state.get("declarations", []):
        comps = lean.parse_name_key(decl["declaration_name_key"])
        if lean.is_private(comps):
            continue
        if len(comps) >= len(want) and [str(c) for c in comps[-len(want):]] == want:
            return decl
    return None


def measurements(row: dict) -> dict[str, dict]:
    """Backend -> the ``libraries`` and ``axioms`` measured on it (``None`` when not recorded)."""
    out = {"official": {"libraries": row.get("libraries"), "axioms": row.get("axioms")}}
    strict = row.get("strict_omega")
    if strict is not None:
        out["strict"] = {"libraries": strict.get("libraries"), "axioms": strict.get("axioms")}
    return out


def omega_backends(row: dict) -> list[str]:
    """Backends whose measurement supports the Omega-only, zero-axiom claim."""
    return [name for name, m in measurements(row).items()
            if m["libraries"] and set(m["libraries"]) <= OMEGA_LIBS and m["axioms"] == []]


def tier(row: dict | None, sig: str, src: str) -> str:
    if row is None:
        return "unresolved"
    if omega_backends(row):
        return "A-omega"
    if row.get("kind") != "theorem":
        return "N-definition"
    if ANALYTIC.search(sig):
        return "D-analytic"
    if STRUCTURAL.search(sig):
        return "B-structural" if not SOURCE_ANALYTIC.search(src) else "D-analytic"
    if SOURCE_ANALYTIC.search(src):
        return "D-analytic"
    return "C-exact"


# Modules that read Omega arithmetic into Mathlib on purpose; they stay outside the strict closure.
BRIDGE_MODULES = {"D5/S3/Quantum/AURICOmega/OmegaShadowBridge"}
OPEN_TIERS = ("C-exact", "B-structural")

TIER_NOTE = {
    "A-omega": "已是仅 Omega · 零公理（至少一个后端的测量如此）",
    "C-exact": "候选：签名只用自然数、整数、有理数、有限对象或纯逻辑",
    "B-structural": "候选：有限结构，需先把 Mathlib 基础设施移植到 OmegaMath",
    "D-analytic": "暂不可迁：需要实数、复数、极限或测度",
    "N-definition": "被引的是定义，不是定理",
    "X-bridge": "有意留在严格闭包之外的桥接（影子桥）",
    "unresolved": "在该提交上无法解析",
}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--book", action="append", help="book slug (repeatable; default: all visible books)")
    ap.add_argument("--ref", default="origin/dev", help="trureturing revision to read (default origin/dev)")
    ap.add_argument("--json", default="build/omega/inventory.json")
    ap.add_argument("--md", default="build/omega/inventory.md")
    args = ap.parse_args()

    checkout = Path(os.environ.get("TRURETURING_DIR", Path.home() / "trureturing"))
    commit = subprocess.run(["git", "-C", str(checkout), "rev-parse", args.ref],
                            capture_output=True, text=True, check=True).stdout.strip()
    site = config.load_site()
    ledger = lean.Ledger(site.trureturing_repo, offline=True, checkout=checkout)
    books = config.load_books(args.book) if args.book else config.load_books()

    report = {"trureturing_commit": commit, "books": {}}
    for book in books:
        rows = []
        for gid, places in sorted(citations(book).items()):
            try:
                g = lean.parse_gid(gid)
            except lean.LeanError:
                continue
            state = ledger.state(commit, g.module)
            row = frozen_row(state, g.parts) if state else None
            sig = src = ""
            if row is not None:
                try:
                    res = lean.resolve(ledger, commit, gid)
                    lean.locate(ledger, commit, res)
                    sig = res.signature
                except lean.LeanError:
                    pass
                data = ledger.read(commit, g.source_path_for(""))
                src = data.decode("utf-8", "replace") if data else ""
            level = tier(row, sig, src)
            if level not in ("A-omega", "unresolved") and g.module in BRIDGE_MODULES:
                level = "X-bridge"
            rows.append({"gid": gid, "module": g.module, "tier": level,
                         "kind": row.get("kind") if row else None,
                         "libraries": row.get("libraries") if row else None,
                         "axioms": row.get("axioms") if row else None,
                         "strict_omega": measurements(row).get("strict") if row else None,
                         "omega_backends": omega_backends(row) if row else [],
                         "signature": sig, "cited": places})
        report["books"][book.slug] = rows

    Path(args.json).parent.mkdir(parents=True, exist_ok=True)
    Path(args.json).write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")

    lines = [f"# Omega 迁移盘点（trureturing `{commit[:12]}`）", ""]
    for slug, rows in report["books"].items():
        counts = collections.Counter(r["tier"] for r in rows)
        remaining = sum(counts.get(t, 0) for t in OPEN_TIERS)
        lines += [f"## {slug}：{len(rows)} 条被引声明，仅 Omega {counts.get('A-omega', 0)} 条，待迁候选 {remaining} 条",
                  "", "| 层级 | 条数 | 含义 |", "| --- | ---: | --- |"]
        for t in TIER_NOTE:
            lines.append(f"| `{t}` | {counts.get(t, 0)} | {TIER_NOTE[t]} |")
        lines.append("")
        omega = [r for r in rows if r["tier"] == "A-omega"]
        if omega:
            official = collections.Counter(
                "未记录" if r["axioms"] is None else "空" if not r["axioms"] else "、".join(r["axioms"])
                for r in omega)
            strict_only = sum(1 for r in omega if r["omega_backends"] == ["strict"])
            lines += [f"`A-omega` 的 {len(omega)} 条中，{strict_only} 条只由严格端测量支持；"
                      f"这 {len(omega)} 条在官方端的公理："
                      + "；".join(f"{k} {v} 条" for k, v in sorted(official.items())) + "。", ""]
        for t in OPEN_TIERS:
            pick = [r for r in rows if r["tier"] == t]
            if not pick:
                continue
            lines += [f"### {t}", ""]
            for r in pick:
                where = sorted({p["file"].split("/")[-1] for p in r["cited"]})
                lines.append(f"- `{r['gid']}` — {', '.join(where[:3])}{' …' if len(where) > 3 else ''}")
                if r["signature"]:
                    lines.append(f"  - `{r['signature'][:240]}`")
            lines.append("")
    Path(args.md).write_text("\n".join(lines), encoding="utf-8")
    for slug, rows in report["books"].items():
        counts = collections.Counter(r["tier"] for r in rows)
        remaining = sum(counts.get(t, 0) for t in OPEN_TIERS)
        print(slug, len(rows), dict(sorted(counts.items())), "remaining", remaining)
    print(f"wrote {args.json} and {args.md}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
