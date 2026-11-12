"""每一章的定理环境用 lean= 引用了多少条冻结定理（附录 C §C.1）。
How many frozen theorems the theorem environments of each chapter cite with lean= (appendix C, C.1).

Nothing is typed by hand. For every chapter in the reading order of zh/SUMMARY.md the script collects the GIDs in
the `lean="…"` attributes of its `:::` lines, keeps those whose kind in trureturing.lock.json is `theorem`, and
counts them once per chapter. The counts are checked against the last column of the C.1 index of appendix C (the
`#…` anchors listed per chapter), so the figure and the index cannot disagree. A bar is green because every one of
these declarations is a Lean-verified theorem the chapter cites with lean=.

Each bar is split by the rule of the declaration map (viz/lean-declaration-map/gen-data.py): a declaration first
appears in the earliest unit of the reading order whose Chinese text cites it, by lean= or by an inline link
(appendix C itself, which cites everything, is left out). The lower, solid part counts the theorems that first
appear in this chapter; the upper, hollow part those that appeared in an earlier unit and are cited here again.
"""

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
BOOK = ROOT / "books" / "quantum-geometry"

SIZE = (500, 300)    # labels of 14 at most 500 wide: 10 px or more in a phone column of 358


def reading_order():
    """[(file, part index)] for the numbered chapters and the coda, from zh/SUMMARY.md."""
    out, part = [], 0
    for line in (BOOK / "zh" / "SUMMARY.md").read_text(encoding="utf-8").splitlines():
        if line.startswith("# ") and line != "# Summary":
            part += 1
        m = re.search(r"\]\(((ch\d\d)-[^)]*|coda)\.md\)", line)
        if m:
            out.append((m.group(1) + ".md", part))
    return out


def env_gids(text):
    cited = set()
    for line in text.splitlines():
        if line.startswith(":::"):
            for attr in re.findall(r'\slean="([^"]*)"', line):
                cited.update(g for g in re.split(r"[\s,]+", attr.strip()) if g)
    return cited


def first_units(lock):
    """GID -> the index, in the reading order of zh/SUMMARY.md, of the first unit citing it (appendix C left out)."""
    units = [m.group(1) for m in re.finditer(r"\]\(([^)]+\.md)\)", (BOOK / "zh" / "SUMMARY.md").read_text(encoding="utf-8"))]
    first = {}
    for ui, file in enumerate(units):
        if file == "appendix-c.md":
            continue
        text = (BOOK / "zh" / file).read_text(encoding="utf-8")
        inline = {m.group(1) or m.group(2) for m in re.finditer(r"\(lean:([^)\s]+)\)|<lean:([^>\s]+)>", text)}
        for g in env_gids(text) | inline:
            if g in lock and g not in first:
                first[g] = file
    return first


def counts():
    lock = json.loads((ROOT / "trureturing.lock.json").read_text(encoding="utf-8"))["declarations"]
    first = first_units(lock)
    rows = []
    for file, part in reading_order():
        cited = {g for g in env_gids((BOOK / "zh" / file).read_text(encoding="utf-8")) if lock[g]["kind"] == "theorem"}
        new = sum(1 for g in cited if first[g] == file)
        label = "coda" if file == "coda.md" else str(int(file[2:4]))
        rows.append((label, part, len(cited), new))
    return rows


def index_counts():
    """Anchors per chapter in the last column of the C.1 table of appendix C."""
    text = (BOOK / "zh" / "appendix-c.md").read_text(encoding="utf-8")
    table = re.findall(r"^\| `T\d+` \|.*\| ([^|]*) \|$", text, re.M)
    cnt = Counter()
    for col in table:
        for m in re.finditer(r"(Ch \d+|终章)((?:,? ?`#[\w-]+`)+)", col):
            key = "coda" if m.group(1) == "终章" else str(int(m.group(1)[3:]))
            cnt[key] += m.group(2).count("#")
    return len(table), cnt


ROWS = counts()
TOTAL = sum(n for _, _, n, _ in ROWS)
NEW = sum(a for _, _, _, a in ROWS)
assert (TOTAL, NEW) == (329, 237)
N_INDEX, INDEX = index_counts()
assert len(ROWS) == 40 and N_INDEX == 251
assert {k: n for k, _, n, _ in ROWS} == dict(INDEX), (ROWS, INDEX)
assert TOTAL == sum(INDEX.values()) == 329
BY = sorted(ROWS, key=lambda r: -r[2])
TOP, SECOND, THIRD, FOURTH = BY[:4]
assert [r[0] for r in BY[:4]] == ["22", "30", "4", "24"] and len({r[2] for r in BY[:4]}) == 4
TIED = BY[4:7]                                           # three bars of equal height
assert [r[0] for r in TIED] == ["14", "29", "coda"] and len({r[2] for r in TIED}) == 1 and TIED[0][2] < FOURTH[2]
TYPICAL = sorted(n for _, _, n, _ in ROWS)[:-7]            # every other chapter
assert min(TYPICAL) == 4 and max(TYPICAL) == 10 < TIED[0][2]

ALT = {
    "zh": f"柱状图：横轴是第一章到第三十九章与终章，纵轴是这一章的定理环境用 lean= 引用的冻结定理条数，同一条定理在几章被引用就各计一次，柱子都是绿色。"
          f"浅色底纹按部分组，标着罗马数字 I 到 X。最高的是第 {TOP[0]} 章，{TOP[2]} 条；其次第 {SECOND[0]} 章 {SECOND[2]} 条，"
          f"第 {THIRD[0]} 章 {THIRD[2]} 条，第 {FOURTH[0]} 章 {FOURTH[2]} 条；第 14 章、第 29 章与终章各 {TIED[0][2]} 条；其余各章 4 到 10 条。"
          f"40 根柱子合计 {TOTAL} 条，与附录 C 的 C.1 索引逐章一致。每根柱子分两段：实心的下段是在这一章第一次出场的定理，合计 {NEW} 条；空心的上段是前面已出场、这一章再引用的，合计 {TOTAL - NEW} 条，越往后的部分上段越高。",
    "en": f"Bar chart: the horizontal axis runs over chapters 1 to 39 and the coda (C), the vertical axis is the number of frozen "
          f"theorems the chapter's theorem environments cite with lean=, a theorem counted again in each chapter that cites it; all bars are green. Light bands group the chapters "
          f"by part, marked I to X. The tallest is chapter {TOP[0]} with {TOP[2]}; then chapter {SECOND[0]} with "
          f"{SECOND[2]}, chapter {THIRD[0]} with {THIRD[2]}, chapter {FOURTH[0]} with {FOURTH[2]}; chapters 14 and 29 and the coda with {TIED[0][2]} each; "
          f"every other chapter has 4 to 10. The 40 bars add up to {TOTAL}, chapter by chapter the same as the C.1 index "
          f"of appendix C. Each bar has two parts: the solid lower part counts the theorems that first appear in that chapter, {NEW} in all; "
          f"the hollow upper part those seen earlier and cited there again, {TOTAL - NEW} in all, growing in the later parts.",
}

ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]


def draw(fig):
    t = fig.t
    ax = fig.axes(46, 80, 446, 166, (0.4, 40.6), (0, 38))
    # part bands
    parts = {}
    for i, (_, part, _, _) in enumerate(ROWS, start=1):
        parts.setdefault(part, []).append(i)
    for part, idx in parts.items():
        x0, x1 = ax.X(idx[0] - 0.5), ax.X(idx[-1] + 0.5)
        roman = ROMAN[part] if part < len(ROMAN) else ""
        if part % 2 == 1 and roman:
            fig.rect(x0, ax.y, x1 - x0, ax.h, color=None, fill="faint", fill_opacity=0.22)
        if roman:
            fig.text((x0 + x1) / 2, ax.y - 6, roman, size=14, color="dim", anchor="middle")
    ax.grid(ys=(10, 20, 30))
    heights = [n for _, _, n, _ in ROWS]
    for i, (label, _, n, new) in enumerate(ROWS, start=1):
        x0, x1 = ax.X(i - 0.34), ax.X(i + 0.34)
        if n > new:      # cited here again, first seen earlier: hollow
            fig.rect(x0, ax.Y(n), x1 - x0, ax.Y(new) - ax.Y(n), color="lean", fill="lean", fill_opacity=0.08, width=1.1)
        if new:          # first appears in this chapter: solid
            fig.rect(x0, ax.Y(new), x1 - x0, ax.Y(0) - ax.Y(new), color="lean", fill="lean", fill_opacity=0.6, width=1.1)
        if n >= 13:
            # a number wider than its bar leans away from a taller neighbour
            right = heights[i] if i < len(heights) else 0
            left = heights[i - 2] if i >= 2 else 0
            x, anchor = ((x1, "end") if right > n else (x0, "start") if left > n else ((x0 + x1) / 2, "middle"))
            fig.text(x, ax.Y(n) - 5, str(n), size=14, color="lean", anchor=anchor, weight=600)
    ticks = [1, 5, 10, 15, 20, 25, 30, 35, 40]
    ax.xaxis(ticks=ticks, labels=[str(v) for v in ticks[:-1]] + [t("终", "C")], size=14)
    fig.text(ax.x + ax.w / 2, ax.Y(0) + 40, t("章", "chapter"), size=14, color="dim", anchor="middle")
    ax.yaxis(ticks=(0, 10, 20, 30), size=14)
    fig.rect(8, 9, 14, 12, color="lean", fill="lean", fill_opacity=0.6, width=1.1)
    fig.text(28, 20, t(f"在这一章第一次出场 {NEW}", f"first appears here {NEW}"), size=14, color="dim")
    fig.rect(8, 31, 14, 12, color="lean", fill="lean", fill_opacity=0.08, width=1.1)
    fig.text(28, 42, t(f"前面已出场，这一章再引用 {TOTAL - NEW}", f"seen earlier, cited here again {TOTAL - NEW}"), size=14, color="dim")
    fig.text(fig.width - 8, 20, t(f"合计 {TOTAL}", f"total {TOTAL}"), size=14, color="lean", weight=600, anchor="end")
