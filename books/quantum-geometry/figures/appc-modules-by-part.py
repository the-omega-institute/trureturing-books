"""C.1 的定理按模块族与部分组：全书站在哪几块模块上（附录 C §C.1）。
The theorems of C.1 by module family and by part: which parts of trureturing the book stands on.

Nothing is typed by hand. The rows of the C.1 index of appendix C (serial T…) give the theorems; a theorem's module
family is the first three segments of its GID (D5/S3/Quantum, …). Its part is the part of the unit in which it
first appears, by the rule of the declaration map (viz/lean-declaration-map/gen-data.py): the earliest unit of the
reading order of zh/SUMMARY.md whose Chinese text cites it by lean= or an inline link, appendix C left out. The
coda and appendices A to D form the last column. The eleven largest families get a row, the rest one row
together. Only counts are drawn: a cell says how many entries fall in it, not that one module depends on another.
"""

import json
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
BOOK = ROOT / "books" / "quantum-geometry"

SIZE = (520, 360)    # labels of 15 at most 520 wide: 10 px or more in a phone column of 358
ROWS_SHOWN = 11


def data():
    from _book_stats import DATA, CHAPTERS, FIRST, PARTS
    part_of = {c['file']: PARTS.index(c['part']) if c['part'] else -1 for c in CHAPTERS}
    gids = DATA['groups']['theorems']
    fam = lambda g: '/'.join(g.split('.')[0].split('/')[:3])
    sizes = Counter(fam(g) for g in gids)
    top = [f for f, _ in sizes.most_common(ROWS_SHOWN)]
    grid = defaultdict(Counter)
    for g in gids:
        grid[fam(g) if fam(g) in top else '*'][part_of[FIRST[g]]] += 1
    return top, grid, sizes


TOP, GRID, SIZES = data()
TOTAL = sum(sum(c.values()) for c in GRID.values())
assert TOTAL == sum(SIZES.values())
COLS = Counter()
for c in GRID.values():
    COLS.update(c)
assert sum(COLS.values()) == TOTAL

ALT = {
    "zh": f"模块族与首次出场的部的计数格。行是 {'、'.join(f.split('/')[-1] for f in TOP)} 与其余各族；列是第一至第十部与终章、附录。每格数字为条数，空格为零，合计 {TOTAL} 条。图不表示证明依赖。",
    "en": f"Counts by module family and part of first appearance. Rows show {', '.join(f.split('/')[-1] for f in TOP)} and all others; columns show Parts I to X and the coda with appendices. Cells give counts, blanks mean zero; total {TOTAL}. This is not a proof-dependency graph.",
}


ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]


def draw(fig):
    t = fig.t
    X0, Y0, CW, CH = 154, 54, 30, 23
    cols = ROMAN + [t("终", "C")]
    fig.text(8, 18, t("模块族（D5/…）", "module family (D5/…)"), size=15, color="dim")
    fig.text(X0 + 11 * CW, 18, t("第一次出场的部", "part of first appearance"), size=15, color="dim", anchor="end")
    for j, c in enumerate(cols):
        fig.text(X0 + j * CW + CW / 2, Y0 - 10, c, size=15, color="dim", anchor="middle")
    rows = TOP + ["*"]
    peak = max(n for c in GRID.values() for n in c.values())
    for i, f in enumerate(rows):
        y = Y0 + i * CH
        name = f.split("/")[-1] if f != "*" else t("其余各族", "all others")
        if f != "*" and not f.startswith("D5/S3/"):
            name = f[3:]
        total = sum(GRID[f].values())
        fig.text(X0 - 8, y + CH / 2, f"{name}", size=15, color="ink" if f != "*" else "dim", anchor="end", middle=True)
        for j in range(11):
            n = GRID[f][j]
            x = X0 + j * CW
            if n:
                fig.rect(x + 1, y + 1, CW - 2, CH - 2, color=None, fill="lean", fill_opacity=0.12 + 0.6 * (n / peak) ** 0.6, rx=2)
                fig.text(x + CW / 2, y + CH / 2, str(n), size=15, color="ink", anchor="middle", middle=True)
            else:
                fig.rect(x + 1, y + 1, CW - 2, CH - 2, color="faint", width=1, rx=2)
        fig.text(X0 + 11 * CW + 8, y + CH / 2, str(total), size=15, color="dim", middle=True)
    fig.text(X0 + 11 * CW + 8, Y0 - 10, "Σ", size=15, color="dim")
    y = Y0 + len(rows) * CH + 22
    fig.text(X0 - 8, y, "Σ", size=15, color="dim", anchor="end", middle=True)
    for j in range(11):
        fig.text(X0 + j * CW + CW / 2, y, str(COLS[j]), size=15, color="dim", anchor="middle", middle=True)
    fig.text(X0 + 11 * CW + 8, y, str(TOTAL), size=15, color="lean", weight=600, middle=True)
