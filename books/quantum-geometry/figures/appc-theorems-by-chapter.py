"""每一章的定理环境用 lean= 引用了多少条冻结定理（附录 C §C.1）。
How many frozen theorems the theorem environments of each chapter cite with lean= (appendix C, C.1).

Nothing is typed by hand. For every chapter in the reading order of zh/SUMMARY.md the script collects the GIDs in
the `lean="…"` attributes of its `:::` lines, keeps those whose kind in trureturing.lock.json is `theorem`, and
counts them once per chapter. The counts are checked against the last column of the C.1 index of appendix C (the
`#…` anchors listed per chapter), so the figure and the index cannot disagree. A bar is green because every one of
these declarations is a Lean-verified theorem the chapter cites with lean=.
"""

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
BOOK = ROOT / "books" / "quantum-geometry"

SIZE = (548, 300)


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


def counts():
    lock = json.loads((ROOT / "trureturing.lock.json").read_text(encoding="utf-8"))["declarations"]
    rows = []
    for file, part in reading_order():
        cited = set()
        for line in (BOOK / "zh" / file).read_text(encoding="utf-8").splitlines():
            if line.startswith(":::"):
                for attr in re.findall(r'\slean="([^"]*)"', line):
                    cited.update(g for g in re.split(r"[\s,]+", attr.strip()) if g)
        n = sum(1 for g in cited if lock[g]["kind"] == "theorem")
        label = "coda" if file == "coda.md" else str(int(file[2:4]))
        rows.append((label, part, n))
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
TOTAL = sum(n for _, _, n in ROWS)
N_INDEX, INDEX = index_counts()
assert len(ROWS) == 31 and N_INDEX == 227
assert {k: n for k, _, n in ROWS} == dict(INDEX), (ROWS, INDEX)
assert TOTAL == sum(INDEX.values()) == 247
BY = sorted(ROWS, key=lambda r: -r[2])
TOP, SECOND, THIRD, FOURTH, FIFTH = BY[:5]
assert [r[0] for r in BY[:5]] == ["22", "30", "4", "24", "29"] and len({r[2] for r in BY[:5]}) == 5
TYPICAL = sorted(n for _, _, n in ROWS)[:-5]            # every chapter but the five named
assert min(TYPICAL) == 4 and max(TYPICAL) == 10

ALT = {
    "zh": f"柱状图：横轴是第一章到第三十章与终章，纵轴是这一章的定理环境用 lean= 引用的冻结定理条数，柱子都是绿色。"
          f"浅色底纹按部分组，标着罗马数字 I 到 VIII。最高的是第 {TOP[0]} 章，{TOP[2]} 条；其次第 {SECOND[0]} 章 {SECOND[2]} 条，"
          f"第 {THIRD[0]} 章 {THIRD[2]} 条，第 {FOURTH[0]} 章 {FOURTH[2]} 条，第 {FIFTH[0]} 章 {FIFTH[2]} 条；其余各章 4 到 10 条。"
          f"31 根柱子合计 {TOTAL} 条，与附录 C 的 C.1 索引逐章一致。",
    "en": f"Bar chart: the horizontal axis runs over chapters 1 to 30 and the coda (C), the vertical axis is the number of frozen "
          f"theorems the chapter's theorem environments cite with lean=; all bars are green. Light bands group the chapters "
          f"by part, marked I to VIII. The tallest is chapter {TOP[0]} with {TOP[2]}; then chapter {SECOND[0]} with "
          f"{SECOND[2]}, chapter {THIRD[0]} with {THIRD[2]}, chapter {FOURTH[0]} with {FOURTH[2]}, chapter {FIFTH[0]} with {FIFTH[2]}; "
          f"every other chapter has 4 to 10. The 31 bars add up to {TOTAL}, chapter by chapter the same as the C.1 index "
          f"of appendix C.",
}

ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"]


def draw(fig):
    t = fig.t
    ax = fig.axes(56, 62, 470, 180, (0.4, 31.6), (0, 38))
    # part bands
    parts = {}
    for i, (_, part, _) in enumerate(ROWS, start=1):
        parts.setdefault(part, []).append(i)
    for part, idx in parts.items():
        x0, x1 = ax.X(idx[0] - 0.5), ax.X(idx[-1] + 0.5)
        roman = ROMAN[part] if part < len(ROMAN) else ""
        if part % 2 == 1 and roman:
            fig.rect(x0, ax.y, x1 - x0, ax.h, color=None, fill="faint", fill_opacity=0.22)
        if roman:
            fig.text((x0 + x1) / 2, ax.y - 6, roman, size=12, color="dim", anchor="middle")
    ax.grid(ys=(10, 20, 30))
    for i, (label, _, n) in enumerate(ROWS, start=1):
        x0, x1 = ax.X(i - 0.34), ax.X(i + 0.34)
        fig.rect(x0, ax.Y(n), x1 - x0, ax.Y(0) - ax.Y(n), color="lean", fill="lean", fill_opacity=0.45, width=1.1)
        if n >= 13:
            fig.text((x0 + x1) / 2, ax.Y(n) - 5, str(n), size=13, color="lean", anchor="middle", weight=600)
    ticks = [1, 5, 10, 15, 20, 25, 30, 31]
    ax.xaxis(ticks=ticks, labels=[str(v) for v in ticks[:-1]] + [t("终", "C")], size=12)
    fig.text(ax.x + ax.w / 2, ax.Y(0) + 38, t("章", "chapter"), size=13, color="dim", anchor="middle")
    ax.yaxis(ticks=(0, 10, 20, 30), size=12)
    fig.text(8, 20, t("定理环境里 lean= 引用的冻结定理", "frozen theorems cited with lean= in theorem environments"),
             size=13, color="dim")
    fig.text(fig.width - 8, 20, t(f"合计 {TOTAL}", f"total {TOTAL}"), size=14, color="lean", weight=600, anchor="end")
