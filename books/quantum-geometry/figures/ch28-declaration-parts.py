"""冻结声明在各部的分布：每一部的章节用 lean= 引用了多少条声明，其中多少是定理；两章审计表各覆盖哪几部。
How the frozen declarations spread over the parts: how many declarations the chapters of each part cite
with lean=, how many of those are theorems, and which parts each of the two audit tables covers.

Nothing is typed by hand. The script reads zh/SUMMARY.md for the parts, collects every `lean="…"`
attribute on a `:::` line of the Chinese chapters (the same rule as the lean-declaration-map page), counts
distinct declarations per part and splits them by their kind in trureturing.lock.json. A part's count is
its own citations, so a declaration cited in two parts counts in both. The figure is rebuilt (and
`./tbook check` reports it stale) whenever the lock or the citations change.
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
BOOK = ROOT / "books" / "quantum-geometry"
ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]

SIZE = (460, 330)    # at most 460 wide with labels of 13 or more: 10 px or more in a phone column of 358


def counts():
    lock = json.loads((ROOT / "trureturing.lock.json").read_text(encoding="utf-8"))["declarations"]
    parts, units, part = [], [], -1
    for line in (BOOK / "zh" / "SUMMARY.md").read_text(encoding="utf-8").splitlines():
        h = re.match(r"^# (.+)$", line)
        if h and not line.startswith("# Summary"):
            parts.append(h.group(1).strip())
            part = len(parts) - 1
            continue
        m = re.search(r"\[(.+)\]\(([^)]+\.md)\)", line)
        if m:
            units.append((m.group(2), part))
    cited = [set() for _ in parts]
    for file, p in units:
        if p < 0:
            continue
        for line in (BOOK / "zh" / file).read_text(encoding="utf-8").splitlines():
            if line.startswith(":::"):
                for attr in re.findall(r'\slean="([^"]*)"', line):
                    for gid in re.split(r"[\s,]+", attr.strip()):
                        if gid:
                            assert gid in lock, f"{file}: {gid} is not in the lock"
                            cited[p].add(gid)
    assert len(parts) == 11 and parts[3].startswith("第四部") and parts[5].startswith("第六部") and parts[10].startswith("终章")
    rows = []
    for gids in cited:
        thm = sum(1 for g in gids if lock[g]["kind"] == "theorem")
        rows.append((thm, len(gids) - thm))
    return rows


ROWS = counts()
TOTAL_THM = sum(t for t, _ in ROWS)

ALT = {
    "zh": "柱状图。横轴是第一至第十部与“终章与附录”，柱高是该部章节用 lean= 引用的不同声明数；"
          "每根柱子下段绿色是锁文件里种类为定理的声明，上段灰色是定义与归纳类型。"
          + "；".join(f"{lab}：定理 {t}、其他 {o}" for lab, (t, o) in zip(ROMAN + ["终章与附录"], ROWS))
          + "。柱子上方两道括号：第一至第三部标“第二十七章审计表”，第四至第六部标“第二十八章审计表”。",
    "en": "A bar chart. Along the bottom are Parts I to X and 'coda and appendices'; each bar is the number of distinct "
          "declarations the chapters of that part cite with lean=, green below for declarations of kind theorem in the "
          "lock, grey above for definitions and inductive types. "
          + "; ".join(f"{lab}: {t} theorems, {o} other" for lab, (t, o) in zip(ROMAN + ["coda and appendices"], ROWS))
          + ". Two braces above the bars mark Parts I–III as the Chapter 27 audit table and Parts IV–VI as the Chapter 28 "
          "audit table.",
}


def draw(fig):
    t = fig.t
    top = max(a + b for a, b in ROWS)
    ymax = (top // 20 + 1) * 20
    ax = fig.axes(46, 64, 404, 206, (0, len(ROWS)), (0, ymax))
    ax.yaxis(ticks=list(range(0, ymax + 1, 20)), size=13)
    ax.xaxis()
    bw = 0.6
    for i, (thm, other) in enumerate(ROWS):
        x0, x1 = ax.X(i + 0.5 - bw / 2), ax.X(i + 0.5 + bw / 2)
        y0, y1, y2 = ax.Y(0), ax.Y(thm), ax.Y(thm + other)
        fig.rect(x0, y1, x1 - x0, y0 - y1, color="lean", fill="lean", fill_opacity=0.32, width=1.3)
        if other:
            fig.rect(x0, y2, x1 - x0, y1 - y2, color="dim", fill="dim", fill_opacity=0.22, width=1.2)
        fig.text((x0 + x1) / 2, y2 - 6, str(thm + other), size=13, anchor="middle")
        xl = (x0 + x1) / 2
        if i < 10:
            fig.text(xl, ax.Y(0) + 20, ROMAN[i], size=14, anchor="middle")
        else:
            fig.text(xl, ax.Y(0) + 20, t("终章", "coda"), size=13, anchor="middle")
            fig.text(xl, ax.Y(0) + 36, t("附录", "app."), size=13, anchor="middle")
    # the two audit tables
    for (a, b), label in (((0, 3), t("第 27 章审计表", "Chapter 27 table")), ((3, 6), t("第 28 章审计表", "Chapter 28 table"))):
        y = 48
        fig.brace(ax.X(a + 0.1), y, ax.X(b - 0.1), y, label)
    fig.legend(62, 90, [("lean", t("定理", "theorems")), ("dim", t("定义、归纳类型", "definitions, inductives"))], swatch="box")
    assert TOTAL_THM > 0
