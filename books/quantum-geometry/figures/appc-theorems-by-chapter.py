"""每一章的环境头用 lean= 引用了多少条冻结定理（附录 C §C.1）。
How many frozen theorems each chapter cites with lean= on environment headers (appendix C, C.1).

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

from tbook.summary import parse_summary

ROOT = Path(__file__).resolve().parents[3]
BOOK = ROOT / "books" / "quantum-geometry"

SIZE = (500, 300)    # labels of 14 at most 500 wide: 10 px or more in a phone column of 358


def reading_order():
    """[(file, part index, main chapter)] including every descendant in reading order."""
    summary = parse_summary(BOOK / "zh" / "SUMMARY.md")
    roots = summary.top_level()
    parts = list(dict.fromkeys(ch.part for ch in summary.chapters if ch.part))
    out = []
    for ch in summary.chapters:
        root = roots[ch.top]
        if ch.path and root.path and (re.match(r"ch\d+-", root.path) or root.path == "coda.md"):
            out.append((ch.path, parts.index(ch.part) + 1, root.path))
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
    units = parse_summary(BOOK / "zh" / "SUMMARY.md").files()
    owners = {file: root for file, _, root in reading_order()}
    first = {}
    for ui, file in enumerate(units):
        if file == "appendix-c.md":
            continue
        text = (BOOK / "zh" / file).read_text(encoding="utf-8")
        inline = {m.group(1) or m.group(2) for m in re.finditer(r"\(lean:([^)\s]+)\)|<lean:([^>\s]+)>", text)}
        for g in env_gids(text) | inline:
            if g in lock and g not in first:
                first[g] = owners.get(file, file)
    return first


def chapter_citations():
    grouped = {}
    for file, part, root in reading_order():
        if root not in grouped:
            grouped[root] = (part, set())
        grouped[root][1].update(env_gids((BOOK / "zh" / file).read_text(encoding="utf-8")))
    return grouped


def counts():
    lock = json.loads((ROOT / "trureturing.lock.json").read_text(encoding="utf-8"))["declarations"]
    first = first_units(lock)
    rows = []
    for file, (part, gids) in chapter_citations().items():
        cited = {g for g in gids if lock[g]["kind"] == "theorem"}
        new = sum(1 for g in cited if first[g] == file)
        label = "coda" if file == "coda.md" else str(int(file[2:4]))
        rows.append((label, part, len(cited), new))
    return rows


def index_counts():
    """Anchors per chapter in the last column of the C.1 table of appendix C."""
    text = (BOOK / "zh" / "appendix-c.md").read_text(encoding="utf-8")
    citations = chapter_citations()
    table = re.findall(r"^\| `T\d+` \|.*\| ([^|]*) \|$", text, re.M)
    cnt = Counter()
    for col in table:
        for m in re.finditer(r"(Ch \d+|终章)((?:,? ?`#[\w-]+`)+)", col):
            key = "coda" if m.group(1) == "终章" else str(int(m.group(1)[3:]))
            cnt[key] += m.group(2).count("#")
    listed = set(re.findall(r"^\| `T\d+` \| \[[^\]]*\]\(lean:([^\)\s]+)\)", text, re.M))
    lock = json.loads((ROOT / "trureturing.lock.json").read_text(encoding="utf-8"))["declarations"]
    for gid, decl in lock.items():
        if decl["kind"] != "theorem" or gid in listed:
            continue
        for file, (_, gids) in citations.items():
            if gid not in gids:
                continue
            key = "coda" if file == "coda.md" else str(int(file[2:4]))
            cnt[key] += 1
    return len(table) + sum(1 for gid, decl in lock.items() if decl["kind"] == "theorem" and gid not in listed and any(
        gid in gids for _, gids in citations.values()
    )), cnt


ROWS = counts()
TOTAL = sum(n for _, _, n, _ in ROWS)
NEW = sum(a for _, _, _, a in ROWS)
assert 0 <= NEW <= TOTAL
N_INDEX, INDEX = index_counts()
assert len(ROWS) == len(chapter_citations())
assert {k: n for k, _, n, _ in ROWS} == dict(INDEX), (ROWS, INDEX)
assert TOTAL == sum(INDEX.values())
BY = sorted(ROWS, key=lambda r: -r[2])
TOP, SECOND, THIRD, FOURTH = BY[:4]
assert [r[0] for r in BY[:4]] == ["22", "29", "30", "33"]

if FOURTH[2] == BY[4][2]:
    tied = [r for r in BY if r[2] == FOURTH[2]]
    FOURTH_ZH = f"第 {' 与第 '.join(r[0] for r in tied)} 章各 {FOURTH[2]} 条"
    FOURTH_EN = f"Chapters {' and '.join(r[0] for r in tied)} ({FOURTH[2]} each)"
else:
    FOURTH_ZH = f"第 {FOURTH[0]} 章 {FOURTH[2]} 条"
    FOURTH_EN = f"Chapter {FOURTH[0]} ({FOURTH[2]})"

ALT = {
    "zh": f"柱状图：第一章至第三十九章与终章共 40 根绿色柱子，按第 I 至 X 部分组。柱高为各章环境头用 lean= 引用的冻结定理条数，跨章重复计。"
          f"最高第 {TOP[0]} 章 {TOP[2]} 条，其次第 {SECOND[0]} 章 {SECOND[2]} 条、第 {THIRD[0]} 章 {THIRD[2]} 条、{FOURTH_ZH}。"
          f"合计 {TOTAL} 次引用，与附录 C 的 {N_INDEX} 条定理索引逐章一致。实心下段是该章第一次出现的定理，共 {NEW} 条；空心上段是此前出现过的，共 {TOTAL - NEW} 条。",
    "en": f"Bar chart: 40 green bars for Chapters 1 to 39 and the Coda, grouped by Parts I to X. Heights count frozen theorems cited with lean= on each chapter's environment headers; reuse in another chapter counts again. "
          f"Chapter {TOP[0]} leads with {TOP[2]}, followed by Chapters {SECOND[0]} ({SECOND[2]}), {THIRD[0]} ({THIRD[2]}) and {FOURTH_EN}. "
          f"Total: {TOTAL} citations, matching the {N_INDEX} C.1 rows chapter by chapter. Solid lower sections count {NEW} theorems first appearing there; hollow upper sections count {TOTAL - NEW} seen earlier.",
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

    i = 1
    while i <= len(heights):
        n = heights[i - 1]
        end = i
        while end < len(heights) and heights[end] == n:
            end += 1
        if n >= 13:
            if end > i:
                # Adjacent equal bars share one label and a cap spanning the run.
                fig.line(ax.X(i - 0.28), ax.Y(n) - 2.5, ax.X(end + 0.28), ax.Y(n) - 2.5, color="lean", width=1)
                fig.text(ax.X((i + end) / 2), ax.Y(n) - 6, str(n), size=14, color="lean", anchor="middle", weight=600)
            else:
                # A single label leans away from a taller neighbour, within the canvas.
                x0, x1 = ax.X(i - 0.34), ax.X(i + 0.34)
                right = heights[i] if i < len(heights) else 0
                left = heights[i - 2] if i >= 2 else 0
                x, anchor = ((x1, "end") if right > n else (x0, "start") if left > n else ((x0 + x1) / 2, "middle"))
                if i == len(heights):
                    x, anchor = fig.width - 3, "end"
                y = ax.Y(n) - 5
                if n > right >= 13:
                    # Keep the 20 px text boxes of nearby descending labels apart.
                    y = min(y, ax.Y(right) - 5 - 22)
                fig.text(x, y, str(n), size=14, color="lean", anchor=anchor, weight=600)
        i = end + 1
    ticks = [1, 5, 10, 15, 20, 25, 30, 35, 40]
    ax.xaxis(ticks=ticks, labels=[str(v) for v in ticks[:-1]] + [t("终", "C")], size=14)
    fig.text(ax.x + ax.w / 2, ax.Y(0) + 40, t("章", "chapter"), size=14, color="dim", anchor="middle")
    ax.yaxis(ticks=(0, 10, 20, 30), size=14)
    fig.rect(8, 9, 14, 12, color="lean", fill="lean", fill_opacity=0.6, width=1.1)
    fig.text(28, 20, t(f"在这一章第一次出场 {NEW}", f"first appears here {NEW}"), size=14, color="dim")
    fig.rect(8, 31, 14, 12, color="lean", fill="lean", fill_opacity=0.08, width=1.1)
    fig.text(28, 42, t(f"前面已出场，这一章再引用 {TOTAL - NEW}", f"seen earlier, cited here again {TOTAL - NEW}"), size=14, color="dim")
    fig.text(fig.width - 8, 20, t(f"合计 {TOTAL}", f"total {TOTAL}"), size=14, color="lean", weight=600, anchor="end")
