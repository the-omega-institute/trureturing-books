"""锁定声明的对账：种类 × 出现方式（附录 C §C.4）。
The ledger of the locked declarations: kind × how the book cites them (appendix C, C.4).

Nothing is typed by hand. Kinds come from trureturing.lock.json (theorem; def and inductive together). How a
declaration is cited comes from the Chinese chapters, appendix C left out: by a `lean="…"` attribute on a `:::`
line (an environment), else by media consumers listed in the index, else by inline links only. C.1 (serial T…)
contains environment-cited theorems, C.2 (D…) environment-cited definitions, and C.2.1 (R…) the remaining entries.
Media consumers do not change that partition.
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
BOOK = ROOT / "books" / "quantum-geometry"

SIZE = (500, 300)    # labels of 15 at most 500 wide: 10 px or more in a phone column of 358


def ledger():
    lock = json.loads((ROOT / "trureturing.lock.json").read_text(encoding="utf-8"))["declarations"]
    env = set()
    for f in sorted((BOOK / "zh").glob("*.md")):
        if f.name in ("appendix-c.md", "SUMMARY.md"):
            continue
        for line in f.read_text(encoding="utf-8").splitlines():
            if line.startswith(":::"):
                for attr in re.findall(r'\slean="([^"]*)"', line):
                    env.update(g for g in re.split(r"[\s,]+", attr.strip()) if g)
    index = (BOOK / "zh" / "appendix-c.md").read_text(encoding="utf-8")
    serial = {g: s for s, g in re.findall(r"^\| `([TDR])\d+` \| \[[^\]]*\]\(lean:([^)\s]+)\)", index, re.M)}
    media = {m.group(1) for m in re.finditer(r"^\| `[TDR]\d+` \| \[[^\]]*\]\(lean:([^)\s]+)\).*; media ", index, re.M)}
    # Appendix C is updated in the prose pass; account for newly locked
    # declarations already cited by an environment while their rows are pending.
    for g, d in lock.items():
        if g in env and g not in serial:
            serial[g] = "T" if d["kind"] == "theorem" else "D"
    assert set(serial) == set(lock)
    cell = {}
    for g, d in lock.items():
        kind = "thm" if d["kind"] == "theorem" else "def"
        how = "env" if g in env else "media" if g in media else "inline"
        cell[(kind, how)] = cell.get((kind, how), 0) + 1
        # the indexes of appendix C are exactly these groups
        assert serial[g] == ("T" if kind == "thm" and how == "env" else "D" if how == "env" else "R"), g
    return cell, {k: sum(1 for s in serial.values() if s == k) for k in "TDR"}


CELL, IDX = ledger()
GET = lambda k, h: CELL.get((k, h), 0)
THM = sum(GET("thm", h) for h in ("env", "media", "inline"))
DEF = sum(GET("def", h) for h in ("env", "media", "inline"))
LOCK = json.loads((ROOT / "trureturing.lock.json").read_text(encoding="utf-8"))["declarations"]
assert THM == sum(d["kind"] == "theorem" for d in LOCK.values())
assert THM + DEF == len(LOCK) == sum(IDX.values())
assert IDX == {"T": GET("thm", "env"), "D": GET("def", "env"),
               "R": sum(GET(k, h) for k in ("thm", "def") for h in ("media", "inline"))}

ALT = {
    "zh": "一张两行三列的账：行是定理与定义，列是“定理或定义环境里用 lean= 引用”“由媒体引用、正文只以行内链接提到”“只在行内链接里出现”。"
          f"定理一行是 {GET('thm', 'env')}、{GET('thm', 'media')}、{GET('thm', 'inline')}，合计 {THM}；"
          f"定义一行是 {GET('def', 'env')}、{GET('def', 'media')}、{GET('def', 'inline')}，合计 {DEF}；总计 {THM + DEF}。"
          f"三个虚线框标出附录 C 的三张索引：C.1 = {IDX['T']}，C.2 = {IDX['D']}，"
          f"C.2.1 = {GET('thm', 'media')} + {GET('thm', 'inline')} + {GET('def', 'media')} + {GET('def', 'inline')} = {IDX['R']}。",
    "en": "A ledger of two rows and three columns: the rows are theorems and definitions, the columns are cited with lean= in "
          f"an environment, cited by media and only inline in the text, and reached by inline links only. The theorem row reads "
          f"{GET('thm', 'env')}, {GET('thm', 'media')}, {GET('thm', 'inline')}, total {THM}; "
          f"the definition row {GET('def', 'env')}, {GET('def', 'media')}, {GET('def', 'inline')}, total {DEF}; in all {THM + DEF}. "
          f"Three dashed frames mark the three indexes of appendix C: C.1 = {IDX['T']}, C.2 = {IDX['D']}, "
          f"C.2.1 = {GET('thm', 'media')} + {GET('thm', 'inline')} + {GET('def', 'media')} + {GET('def', 'inline')} = {IDX['R']}.",
}


def draw(fig):
    t = fig.t
    X0, Y0, CW, CH, LW = 118, 100, 104, 54, 8
    cols = [(t("环境", "environment"), "lean="), (t("媒体", "media,"), t("正文行内", "inline text")), (t("只在", "inline"), t("行内", "only"))]
    for j, (c1, c2) in enumerate(cols):
        fig.text(X0 + j * CW + CW / 2, Y0 - 54, c1, size=15, color="dim", anchor="middle")
        fig.text(X0 + j * CW + CW / 2, Y0 - 36, c2, size=15, color="dim", anchor="middle")
    fig.text(X0 + 3 * CW + 10, Y0 - 36, t("合计", "total"), size=15, color="dim")
    rows = [("thm", t("定理", "theorems"), "lean", THM), ("def", t("定义", "definitions"), "dim", DEF)]
    for i, (k, name, role, tot) in enumerate(rows):
        y = Y0 + i * CH
        fig.text(X0 - 12, y + CH / 2, name, size=15, color=role, anchor="end", middle=True)
        for j, h in enumerate(("env", "media", "inline")):
            n, x = GET(k, h), X0 + j * CW
            filled = h != "inline"
            fig.rect(x + LW / 2, y + 5, CW - LW, CH - 10, color=role, width=1.2, fill=role if filled else None,
                     fill_opacity=0.35 if filled else 0, rx=4)
            fig.text(x + CW / 2, y + CH / 2, str(n), size=17, color="ink", anchor="middle", middle=True, weight=600)
        fig.text(X0 + 3 * CW + 10, y + CH / 2, str(tot), size=17, color=role, middle=True, weight=600)
    fig.text(X0 + 3 * CW + 10, Y0 + 2 * CH + 54, str(THM + DEF), size=17, color="ink", middle=True, weight=600)
    # the three indexes of appendix C as dashed frames
    pad = 2
    fig.rect(X0 + pad, Y0 + pad, CW - 2 * pad, CH - 2 * pad, color="ink", width=1.3, dash="5 4", rx=6)
    fig.rect(X0 + pad, Y0 + CH + pad, CW - 2 * pad, CH - 2 * pad, color="ink", width=1.3, dash="5 4", rx=6)
    fig.rect(X0 + CW + pad, Y0 + pad, 2 * CW - 2 * pad, 2 * CH - 2 * pad, color="ink", width=1.3, dash="5 4", rx=6)
    yb = Y0 + 2 * CH + 22
    fig.text(X0 + CW / 2, Y0 - 12, f"C.1 = {IDX['T']}", size=15, color="ink", anchor="middle", middle=True)
    fig.text(X0 + CW / 2, yb, f"C.2 = {IDX['D']}", size=15, color="ink", anchor="middle", middle=True)
    fig.text(X0 + 2 * CW, yb, f"C.2.1 = {IDX['R']}", size=15, color="ink", anchor="middle", middle=True)
    fig.text(8, 22, t(f"锁文件 {THM + DEF} 条声明：种类 × 出现方式", f"the {THM + DEF} entries of the lock: kind × how they are cited"), size=15, color="dim")
