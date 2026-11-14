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


def counts():
    from _book_stats import CHAPTERS, DECLS, PARTS
    grouped = {}
    owner = {c['file']: c['top'] for c in CHAPTERS}
    first = {}
    for ch in CHAPTERS:
        for gid in set(ch['environment']) | set(ch['inline']):
            first.setdefault(gid, ch['top'])
        if re.match(r'ch\d+-', ch['file']) or ch['file'] == 'coda.md':
            if ch['top'] not in grouped:
                label = 'coda' if ch['file'] == 'coda.md' else str(int(ch['file'][2:4]))
                grouped[ch['top']] = (label, PARTS.index(ch['part']) + 1, set())
            grouped[ch['top']][2].update(g for g in ch['environment'] if DECLS[g]['kind'] == 'theorem')
    return [(label, part, len(gids), sum(first[g] == top for g in gids))
            for top, (label, part, gids) in grouped.items()]


ROWS = counts()
TOTAL = sum(n for _, _, n, _ in ROWS)
NEW = sum(a for _, _, _, a in ROWS)
assert 0 <= NEW <= TOTAL
ALT = {
    'zh': f'按阅读顺序排列的 {len(ROWS)} 根绿色柱子，按部分组；各柱数该主章环境头引用的唯一冻结定理，子页面并入主章。合计 {TOTAL} 次，实心下段为本章首次出现的 {NEW} 条，空心上段为此前出现过的 {TOTAL - NEW} 条。跨主章复用重复计数。',
    'en': f'{len(ROWS)} green bars in reading order, grouped by part. Each bar counts distinct frozen theorems cited by environment headers in that main chapter, including child pages. Total {TOTAL}; solid sections count {NEW} first appearances, hollow sections {TOTAL - NEW} seen earlier. Reuse across main chapters counts again.',
}


ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]


def draw(fig):
    t = fig.t
    import math
    count = len(ROWS)
    ymax = max(10, math.ceil((max(n for _, _, n, _ in ROWS) + 4) / 10) * 10)
    ax = fig.axes(46, 80, 446, 166, (0.4, count + 0.6), (0, ymax))
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
    ax.grid(ys=range(10, ymax, 10))
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
    ticks = list(dict.fromkeys([1, *range(5, count, 5), count]))
    ax.xaxis(ticks=ticks, labels=[str(v) for v in ticks[:-1]] + [t("终", "C")], size=14)
    fig.text(ax.x + ax.w / 2, ax.Y(0) + 40, t("章", "chapter"), size=14, color="dim", anchor="middle")
    ax.yaxis(ticks=range(0, ymax, 10), size=14)
    fig.rect(8, 9, 14, 12, color="lean", fill="lean", fill_opacity=0.6, width=1.1)
    fig.text(28, 20, t(f"在这一章第一次出场 {NEW}", f"first appears here {NEW}"), size=14, color="dim")
    fig.rect(8, 31, 14, 12, color="lean", fill="lean", fill_opacity=0.08, width=1.1)
    fig.text(28, 42, t(f"前面已出场，这一章再引用 {TOTAL - NEW}", f"seen earlier, cited here again {TOTAL - NEW}"), size=14, color="dim")
    fig.text(fig.width - 8, 20, t(f"合计 {TOTAL}", f"total {TOTAL}"), size=14, color="lean", weight=600, anchor="end")
