#!/usr/bin/env python3
"""Generate map JSON from publication statistics and stable declaration IDs.

Run this after the declaration set or chapter topology changes; the output is ignored.
The authored main.js fetches data.generated.json and joins GIDs to the publication lock.
"""
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
sys.path.insert(0, str(ROOT / "tools"))
from tbook.summary import parse_summary

BOOK = ROOT / "books" / "quantum-geometry"
OUTPUT = HERE / "data.generated.json"
KINDS = ["theorem", "def", "inductive"]
INDEX = "appendix-c.md"

# the column labels of the stage (short enough for a column 12 px wide)
CN_NUM = "零一二三四五六七八九十"
APPENDIX = re.compile(r"appendix-([a-z])\.md$")
# the names of a root that [numbering.unnumbered] keeps out of chapter counting, by its theorem prefix:
# ([short zh, short en], [long zh, long en])
UNNUMBERED_ROOT = {"Coda": (["终", "Co"], ["终章", "Coda"])}


def cn_number(n: int) -> str:
    if n <= 10:
        return CN_NUM[n]
    if n < 20:
        return "十" + (CN_NUM[n - 10] if n > 10 else "")
    return CN_NUM[n // 10] + "十" + (CN_NUM[n % 10] if n % 10 else "")


def units_and_parts(lang: str, unnumbered: dict[str, str]):
    """Reading order of a SUMMARY.md: [(file, title, part index)], [part title], the parsed summary."""
    summary = parse_summary(BOOK / lang / "SUMMARY.md", unnumbered=unnumbered)
    parts = list(dict.fromkeys(ch.part for ch in summary.chapters if ch.part))
    units = [(ch.path, ch.title_md, parts.index(ch.part) if ch.part else -1)
             for ch in summary.chapters if ch.path]
    return units, parts, summary


def local_paths(summary) -> dict[int, tuple[int, ...]]:
    """id(chapter) → its place under its top-level chapter, one sibling position (from 1) per level, from the tree
    itself: an unnumbered tree has number == (), so the positions are never read from Chapter.number."""
    out = {}

    def walk(chapter, path):
        for k, child in enumerate(chapter.children, 1):
            out[id(child)] = (*path, k)
            walk(child, out[id(child)])

    for top in summary.top_level():
        walk(top, ())
    return out


def generated(data=None, serials=None) -> str:
    from tbook import config
    book = config.load_book(str(BOOK))
    lock = json.loads((ROOT / "trureturing.lock.json").read_text(encoding="utf-8"))
    decls = lock["declarations"]
    units_zh, parts_zh, summary_zh = units_and_parts("zh", book.unnumbered)
    units_en, parts_en, _ = units_and_parts("en", book.unnumbered)
    assert [u[0] for u in units_zh] == [u[0] for u in units_en], "zh and en SUMMARY.md list different files"

    if data is None:
        from tbook import stats
        data = stats.collect(book)
    if serials is None:
        serials = json.loads((BOOK / "data/declaration-serials.json").read_text(encoding="utf-8"))["serials"]
    assert set(data["declarations"]) == set(decls), "this single-book map must cover the entire lock"
    cites = {gid: [] for gid in decls}
    for ui, (file, _, _) in enumerate(units_zh):
        if file == INDEX:
            for gid in decls:
                cites[gid].append([ui, "i"])
            continue
        chapter = next(c for c in data["chapters"] if c["file"] == file)
        env, inline = set(chapter["environment"]), set(chapter["inline"])
        for gid in env | inline:
            cites[gid].append([ui, "e" if gid in env else "i"])
    serial = serials

    index_unit = [u[0] for u in units_zh].index(INDEX)
    rows, missing = [], []
    for gid, d in decls.items():
        body = [c for c in cites[gid] if c[0] != index_unit]
        if not body:
            missing.append(gid)
        home = min(c[0] for c in body) if body else index_unit
        rows.append([gid, home, sorted(cites[gid]), serial.get(gid, "")])
    if missing:
        print(f"note: {len(missing)} declarations are cited only in {INDEX}", file=sys.stderr)

    chapters = {ch.path: ch for ch in summary_zh.chapters if ch.path}
    tops, local = summary_zh.top_level(), local_paths(summary_zh)

    def root_label(root, li):
        """[short, long] of a top-level unit in language li (0 zh, 1 en)."""
        if root.section == "prefix" and root.path == "README.md":
            return ["0", ["序曲", "Prelude"][li]]
        if root.unnumbered_prefix:
            if root.unnumbered_prefix not in UNNUMBERED_ROOT:
                raise SystemExit(f"{root.path}: no map name for the unnumbered prefix {root.unnumbered_prefix!r}")
            short, long = UNNUMBERED_ROOT[root.unnumbered_prefix]
            return [short[li], long[li]]
        appendix = APPENDIX.match(root.path or "")
        if appendix:
            letter = appendix.group(1).upper()
            return [letter, [f"附录 {letter}", f"Appendix {letter}"][li]]
        if root.numbered and root.number:
            n = root.number[0]
            return [str(n), [f"第{cn_number(n)}章", f"Chapter {n}"][li]]
        raise SystemExit(f"{root.path}: a top-level unit the map cannot name")

    def label(file, title, lang):
        li = 0 if lang == "zh" else 1
        chapter = chapters[file]
        root = tops[chapter.top]
        if not chapter.depth:
            return root_label(root, li)
        rest = ".".join(map(str, local[id(chapter)]))
        if root.unnumbered_prefix:
            # a locator of the map, not a heading: the unnumbered root's prefix, then the place in its tree
            short = f"{root.unnumbered_prefix}.{rest}"
            return [short, [f"{root_label(root, 0)[1]}·{rest}", short][li]]
        head = root_label(root, li)[0]
        short = f"{head}.{rest}"
        if APPENDIX.match(root.path or ""):
            return [short, [f"附录 {short}", f"Appendix {short}"][li]]
        return [short, [f"第{cn_number(int(head))}章·{rest}", f"Section {short}"][li]]

    units = []
    for (file, tzh, part), (_, ten, _) in zip(units_zh, units_en):
        szh, nzh = label(file, tzh, "zh")
        sen, nen = label(file, ten, "en")
        units.append({"file": file, "part": part, "s": [szh, sen], "n": [nzh, nen]})
    parts = [[a.split(" ")[0], " ".join(b.split(" ")[:2]) if b.startswith("Part ") else b] for a, b in zip(parts_zh, parts_en)]

    data = {"kinds": KINDS, "index": index_unit,
            "units": units, "parts": parts, "decls": rows}
    return json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '\n'



def main() -> int:
    import argparse
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    wanted = generated()
    changed = not OUTPUT.is_file() or OUTPUT.read_text(encoding='utf-8') != wanted
    if changed and not args.check:
        OUTPUT.write_text(wanted, encoding='utf-8')
    print(f'lean-declaration-map: {"stale" if changed and args.check else "updated" if changed else "up to date"}')
    return 1 if changed and args.check else 0


if __name__ == "__main__":
    sys.exit(main())
