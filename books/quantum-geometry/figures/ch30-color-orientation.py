"""场与线互相翻译：五边形的三层着色给每条边定下方向，每根线至多三个顶点；反过来，从箭头量出的最长线长度又是一片三层的场。
Field and line translate into each other: the three-level colouring of the pentagon orients every
edge so that no line has more than three vertices; conversely, the longest-line lengths measured
from the arrows are again a three-level field.

C₅ has vertices 0…4 and edges 01, 12, 23, 34, 40. Left: each vertex sits at the height of its
colour c = (0, 1, 0, 1, 2) and every edge points up to the larger colour. Right: the same arrows,
with each vertex at the height h(v) = edges on the longest directed path from v, computed here by
depth-first search; the script asserts h = (1, 0, 2, 1, 0) and that the longest directed path has
three vertices (2 → 3 → 4, cyan in both panels).
"""

import math
from functools import lru_cache

SIZE = (560, 262)
WRAP = True
ALT = {
    "zh": "两栏，同一个五边形 0—1—2—3—4—0，顶点按高度摆在三条横线上。左栏：顶点的高度是颜色 c = (0, 1, 0, 1, 2)，"
          "每条边的箭头都朝上，指向颜色大的一端，青色标出最长的一根线 2 → 3 → 4，三个顶点。"
          "右栏：同样的箭头，顶点的高度换成 h，即从该顶点出发顺着箭头最多能走几步，h = (1, 0, 2, 1, 0)；这回每条箭头都朝下，又是一个三层的着色，青色的线仍是 2 → 3 → 4。",
    "en": "Two panels, the same pentagon 0–1–2–3–4–0, its vertices placed by height on three horizontal levels. Left: "
          "the height of a vertex is its color c = (0, 1, 0, 1, 2); every edge points up, to the end with the larger "
          "color, and cyan marks the longest thread 2 → 3 → 4, three vertices. Right: the same arrows, with each vertex now "
          "at height h, the number of steps one can walk from it along the arrows, h = (1, 0, 2, 1, 0); now every arrow "
          "points down, and h is again a three-level coloring; the cyan thread is still 2 → 3 → 4.",
}

V = range(5)
EDGES = [(0, 1), (1, 2), (2, 3), (3, 4), (4, 0)]
C = (0, 1, 0, 1, 2)
assert all(C[u] != C[v] for u, v in EDGES)
ARCS = [(u, v) if C[u] < C[v] else (v, u) for u, v in EDGES]
assert sorted(ARCS) == sorted([(0, 1), (2, 1), (2, 3), (3, 4), (0, 4)])
OUT = {v: [b for a, b in ARCS if a == v] for v in V}


@lru_cache(None)
def h(v):
    return max((1 + h(w) for w in OUT[v]), default=0)


H = tuple(h(v) for v in V)
assert H == (1, 0, 2, 1, 0) and all(H[u] > H[v] for u, v in ARCS)
assert max(H) + 1 == 3  # the longest directed path has three vertices
LONGEST = [(2, 3), (3, 4)]
assert H[2] == 2 and (2, 3) in ARCS and (3, 4) in ARCS

ORDER = [4, 0, 1, 2, 3]  # left to right: the cycle cut open at the edge 3–4
LIFT = 62  # pixels per level


def panel(p, level, title, sub, above):
    t = p.t
    p.text(p.width / 2, 22, title, size=14, weight=600, anchor="middle")
    x0, dx, base = 44, 50, 206
    pos = {v: (x0 + dx * ORDER.index(v), base - LIFT * level[v]) for v in V}
    for k in range(3):
        y = base - LIFT * k
        p.line(26, y, p.width - 10, y, "faint", 1.2, dash="3 4")
        p.text(18, y, str(k), size=13, color="dim", anchor="end", middle=True)
    p.text(18, base - LIFT * 2 - 26, sub, size=14, color="dim", anchor="middle")
    for u, v in ARCS:
        (x1, y1), (x2, y2) = pos[u], pos[v]
        role, width = ("line", 3.2) if (u, v) in LONGEST else ("ink", 1.8)
        if {u, v} == {3, 4}:  # the long edge 3–4 bends over (or under) all the others
            cx_ = (x1 + x2) / 2
            cy_ = base - LIFT * 2 - 46 if above else base + 84
            pts = [((1 - s) ** 2 * x1 + 2 * (1 - s) * s * cx_ + s * s * x2,
                    (1 - s) ** 2 * y1 + 2 * (1 - s) * s * cy_ + s * s * y2) for s in [i / 40 for i in range(41)]]
            pts = pts[:-4]
            p.curve_arrow(pts, role, width, head=9)
        else:
            L = math.hypot(x2 - x1, y2 - y1)
            ux, uy = (x2 - x1) / L, (y2 - y1) / L
            p.arrow(x1 + ux * 9, y1 + uy * 9, x2 - ux * 11, y2 - uy * 11, role, width, head=9)
    for v in V:
        x, y = pos[v]
        p.circle(x, y, 9, color="ink", fill="bg", width=1.6, fill_opacity=1)
        p.text(x, y, str(v), size=13, color="ink", anchor="middle", middle=True, weight=600)


def draw(fig):
    t = fig.t
    left, right = fig.row([272, 272], 262, gap=16)
    panel(left, C, t("颜色 *c* 定下箭头", "color *c* sets the arrows"), "*c*", True)
    panel(right, H, t("箭头量出高度 *h*", "arrows measure height *h*"), "*h*", False)
