"""第二十七、二十八章共用的画法：证明骨架图里的方框与箭头，以及章首地图里的块矩阵。
Shared drawing for chapters 27 and 28: the boxes and arrows of the proof skeletons, and the block
matrices of the chapter maps.

A skeleton only draws what the chapter's proof block names: hypotheses (dashed, dim), steps with the
Mathlib or source lemma that does them (neutral boxes, the lemma in monospace), and the frozen
declaration the chapter cites with lean= (green). `lean_box` reads trureturing.lock.json and refuses a
declaration that is not there with kind "theorem", so green never lands on anything else.
"""

import json
from pathlib import Path

from tbook import figkit

ROOT = Path(__file__).resolve().parents[3]
LOCK = ROOT / "trureturing.lock.json"

TITLE = 14
CODE = 13
PAD = 14
CHIP = 13
# The skeletons are drawn at most WIDTH wide: the smallest label (13) then stays at 10 px or more when a
# phone shows the figure in its 358 px column.
WIDTH = 460


def lock_kind(gid: str) -> str | None:
    decls = json.loads(LOCK.read_text(encoding="utf-8"))["declarations"]
    d = decls.get(gid)
    return d["kind"] if d else None


class Box:
    def __init__(self, x: float, y: float, w: float, h: float):
        self.x, self.y, self.w, self.h = x, y, w, h

    @property
    def cx(self) -> float:
        return self.x + self.w / 2

    @property
    def cy(self) -> float:
        return self.y + self.h / 2

    @property
    def top(self) -> tuple[float, float]:
        return (self.cx, self.y)

    @property
    def bottom(self) -> tuple[float, float]:
        return (self.cx, self.y + self.h)

    @property
    def left(self) -> tuple[float, float]:
        return (self.x, self.cy)

    @property
    def right(self) -> tuple[float, float]:
        return (self.x + self.w, self.cy)

    def at(self, fx: float, fy: float) -> tuple[float, float]:
        return (self.x + self.w * fx, self.y + self.h * fy)


def _width(title: str, code: str | None) -> float:
    w = figkit.text_width(figkit.plain(title), TITLE)
    if code:
        w = max(w, figkit.text_width(code, CODE, mono=True))
    return w + 2 * PAD


def box(p, cx: float, y: float, title: str, code: str | None = None, *, w: float | None = None,
        anchor: str = "middle") -> Box:
    """A proof step: what it establishes (``title``) and the lemma or tactic that does it (``code``)."""
    w = w or _width(title, code)
    h = 50 if code else 32
    x = cx - w / 2 if anchor == "middle" else cx if anchor == "start" else cx - w
    p.rect(x, y, w, h, color="edge", fill="panel", rx=6, width=1.3)
    mid = x + w / 2
    if code:
        p.text(mid, y + 21, title, size=TITLE, anchor="middle")
        p.text(mid, y + 40, code, size=CODE, color="dim", mono=True, anchor="middle")
    else:
        p.text(mid, y + h / 2, title, size=TITLE, anchor="middle", middle=True)
    return Box(x, y, w, h)


def hyp(p, cx: float, y: float, title: str, *, anchor: str = "middle") -> Box:
    """A hypothesis of the statement: dashed, dim."""
    w = figkit.text_width(figkit.plain(title), CODE) + 2 * 10
    h = 28
    x = cx - w / 2 if anchor == "middle" else cx if anchor == "start" else cx - w
    p.rect(x, y, w, h, color="dim", rx=14, width=1.2, dash="4 3")
    p.text(x + w / 2, y + h / 2, title, size=CODE, color="dim", anchor="middle", middle=True)
    return Box(x, y, w, h)


def lean_box(p, cx: float, y: float, gid: str, *, note: str | None = None, w: float | None = None,
             label: str | None = None) -> Box:
    """The frozen declaration the chapter cites with lean= (green; checked against the lock). ``label``
    replaces the declaration's name by a short phrase where the name does not fit."""
    kind = lock_kind(gid)
    assert kind == "theorem", f"{gid}: kind {kind!r} in the lock, green is only for theorems"
    name = label or gid.rsplit(".", 1)[1]
    mono = label is None
    nw = figkit.text_width(figkit.plain(name), CODE if mono else TITLE, mono=mono)
    chip = figkit.text_width("LEAN ✓", CHIP, mono=True) + 14
    inner = chip + 8 + nw
    if note:
        inner = max(inner, figkit.text_width(figkit.plain(note), CODE))
    w = w or inner + 2 * PAD
    h = 52 if note else 34
    x = cx - w / 2
    p.rect(x, y, w, h, color="lean", fill="lean", fill_opacity=0.10, rx=6, width=1.6)
    x0 = cx - (chip + 8 + nw) / 2
    p.chip(x0, y + 22, "LEAN ✓", "lean", size=CHIP)
    p.text(x0 + chip + 8, y + 22, name, size=CODE if mono else TITLE, color="lean", mono=mono)
    if note:
        p.text(cx, y + 43, note, size=CODE, color="dim", anchor="middle")
    return Box(x, y, w, h)


def link(p, a: tuple[float, float], b: tuple[float, float], color: str = "dim", *, width: float = 1.4,
         label: str | None = None, side: str = "right", dash: str | None = None) -> None:
    """An arrow from ``a`` to ``b`` (a step feeds the next); an optional label beside its middle."""
    kw = {"dash": dash} if dash else {}
    p.arrow(a[0], a[1], b[0], b[1], color, width, head=7, **kw)
    if label:
        mx, my = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
        if side == "right":
            p.text(mx + 8, my, label, size=CODE, color="dim", middle=True)
        else:
            p.text(mx - 8, my, label, size=CODE, color="dim", anchor="end", middle=True)


def elbow(p, a: tuple[float, float], b: tuple[float, float], color: str = "dim", *, width: float = 1.4,
          dash: str | None = None) -> None:
    """An arrow that leaves ``a`` sideways and comes down into ``b`` from above."""
    kw = {"dash": dash} if dash else {}
    p.curve_arrow([a, (b[0], a[1]), b], color, width, head=7, **kw)


def blocks(p, x: float, y: float, cell: float, n: int, keep) -> None:
    """An n × n block matrix; ``keep(i, j)`` says whether block (i, j) is filled. Diagonal blocks are
    cyan (what a record leaves in place), off-diagonal blocks magenta (the coherence it removes);
    an emptied off-diagonal block is a faint outline."""
    for i in range(n):
        for j in range(n):
            bx, by = x + j * cell, y + i * cell
            if i == j:
                p.rect(bx + 2, by + 2, cell - 4, cell - 4, color="line", fill="line", fill_opacity=0.30, width=1.3, rx=3)
            elif keep(i, j):
                p.rect(bx + 2, by + 2, cell - 4, cell - 4, color="area", fill="area", fill_opacity=0.24, width=1.3, rx=3)
            else:
                p.rect(bx + 2, by + 2, cell - 4, cell - 4, color="faint", width=1.1, rx=3, dash="3 3")
    # brackets
    h = n * cell
    for sx, d in ((x - 4, 1), (x + h + 4, -1)):
        p.polyline([(sx + 6 * d, y - 2), (sx, y - 2), (sx, y + h + 2), (sx + 6 * d, y + h + 2)], "ink", 1.4)


def title(p, zh: str, en: str) -> None:
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")
