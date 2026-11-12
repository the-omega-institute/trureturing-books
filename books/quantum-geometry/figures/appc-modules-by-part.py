"""C.1 的 251 条定理按模块族与部分组：全书站在哪几块模块上（附录 C §C.1）。
The 251 theorems of C.1 by module family and by part: which parts of trureturing the book stands on.

Nothing is typed by hand. The rows of the C.1 index of appendix C (serial T…) give the theorems; a theorem's module
family is the first three segments of its GID (D5/S3/Quantum, …). Its part is the part of the unit in which it
first appears, by the rule of the declaration map (viz/lean-declaration-map/gen-data.py): the earliest unit of the
reading order of zh/SUMMARY.md whose Chinese text cites it by lean= or an inline link, appendix C left out. The
coda and appendices A and B form the last column. The eleven largest families get a row, the rest one row
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
    lock = json.loads((ROOT / "trureturing.lock.json").read_text(encoding="utf-8"))["declarations"]
    units, part, part_of = [], -1, {}
    for line in (BOOK / "zh" / "SUMMARY.md").read_text(encoding="utf-8").splitlines():
        if line.startswith("# ") and not line.startswith("# Summary"):
            part += 1
            continue
        m = re.search(r"\]\(([^)]+\.md)\)", line)
        if m:
            units.append(m.group(1))
            part_of[m.group(1)] = part
    first = {}
    for file in units:
        if file == "appendix-c.md":
            continue
        text = (BOOK / "zh" / file).read_text(encoding="utf-8")
        cited = set()
        for line in text.splitlines():
            if line.startswith(":::"):
                for attr in re.findall(r'\slean="([^"]*)"', line):
                    cited.update(g for g in re.split(r"[\s,]+", attr.strip()) if g)
        cited |= {m.group(1) or m.group(2) for m in re.finditer(r"\(lean:([^)\s]+)\)|<lean:([^>\s]+)>", text)}
        for g in cited:
            if g in lock and g not in first:
                first[g] = file
    index = (BOOK / "zh" / "appendix-c.md").read_text(encoding="utf-8")
    gids = re.findall(r"^\| `T\d+` \| \[[^\]]*\]\(lean:([^)\s]+)\)", index, re.M)
    assert len(gids) == len(set(gids)) == 251 and all(lock[g]["kind"] == "theorem" for g in gids)
    fam = lambda g: "/".join(g.split(".")[0].split("/")[:3])
    sizes = Counter(fam(g) for g in gids)
    top = [f for f, _ in sizes.most_common(ROWS_SHOWN)]
    grid = defaultdict(Counter)
    for g in gids:
        p = part_of[first[g]]
        assert 0 <= p <= 10, (g, first[g])
        grid[fam(g) if fam(g) in top else "*"][p] += 1
    return top, grid, sizes


TOP, GRID, SIZES = data()
assert TOP[0] == "D5/S3/Quantum" and SIZES[TOP[0]] == 79 and GRID["D5/S3/FluidDynamics"] == Counter({7: 19})
assert sum(sum(c.values()) for c in GRID.values()) == 251
COLS = Counter()
for c in GRID.values():
    COLS.update(c)
assert COLS.most_common(1)[0] == (5, 69)

ALT = {
    "zh": f"一张计数格：行是 trureturing 的模块族，从上到下是 {'、'.join(f.split('/')[-1] for f in TOP)} 与其余各族；"
          f"列是第一至第十部与“终章、附录”。每格写着这一族里在这一部第一次出场的定理条数，底色越深条数越多，空格为零。"
          f"Quantum 一族最大，{SIZES[TOP[0]]} 条，分布在第一至第七部；FluidDynamics 的 19 条全在第八部；Zeros、Weil 只在第六部。"
          f"合计 251 条，即附录 C 的 C.1 索引。",
    "en": f"A grid of counts: the rows are module families of trureturing, from top to bottom {', '.join(f.split('/')[-1] for f in TOP)} "
          f"and all others; the columns are Parts I to X and the coda with the appendices. Each cell gives how many theorems of that "
          f"family first appear in that part, the darker the more, blank for none. The Quantum family is the largest, "
          f"{SIZES[TOP[0]]} theorems, spread over Parts I to VII; all 19 of FluidDynamics are in Part VIII; Zeros and Weil appear "
          f"only in Part VI. They add up to 251, the C.1 index of appendix C.",
}

ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]


def draw(fig):
    t = fig.t
    X0, Y0, CW, CH = 134, 54, 32, 23
    cols = ROMAN + [t("终", "C")]
    fig.text(8, 18, t("模块族（D5/S3/…）", "module family (D5/S3/…)"), size=15, color="dim")
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
    fig.text(X0 + 11 * CW + 8, y, "251", size=15, color="lean", weight=600, middle=True)
