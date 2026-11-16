"""第三十章地图：有限观察者的 90° 视界、颜色定下箭头（场定下线）、涡管越拉越细。
Chapter 30 at a glance: the finite observer's 90° horizon, a colouring that orients every edge (the
field sets the line), and a vortex tube stretched ever thinner.

Panel I draws the horizon for n = 2, 4, 8. Panel II is the pentagon C₅ of the Gallai–Roy section:
each vertex sits at the height of its colour c = (0, 1, 0, 1, 2), every edge points up to the larger
colour, and the longest directed path 2 → 3 → 4 (three vertices, cyan) is found by depth-first search
and asserted. Panel III is a
schematic tube stretched by λ = 2.25 at constant volume: the cross-section A falls by λ, so with
Γ = ωA fixed the vorticity grows by λ. Whether a smooth unforced 3D flow can drive A to 0 is the
open problem.
"""

import math

from functools import lru_cache

from _ch30 import horizon, tube

SIZE = (740, 272)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：琥珀色的箭头 P₀ 是观察者的态，三支墨色箭头是 n = 2、4、8 时隐藏的目标，一支比一支更贴近竖直的 90° 视界，投到 P₀ 上的青色影子越来越短。"
          "第二栏：五边形 0—1—2—3—4—0 的顶点按颜色 c = (0, 1, 0, 1, 2) 摆在三条横线上，每条边的箭头都朝上，青色标出最长的线 2 → 3 → 4，三个顶点；旁边有绿色的 LEAN ✓ 标记。"
          "第三栏：两根竖直的涡管，左边短而粗，右边被拉长、变细；青色的环量回路在两根上相同，品红的涡度箭头在细的那根上更长；下方写着 A → 0？并有红色的 OPEN 标记。",
    "en": "Three panels. Panel I: the amber arrow P₀ is the observer's state; three ink arrows are the hidden target for "
          "n = 2, 4 and 8, each closer to the vertical 90° horizon, and their cyan shadows on P₀ get shorter. Panel II: "
          "the vertices of the pentagon 0–1–2–3–4–0 sit on three levels by their colors c = (0, 1, 0, 1, 2), every edge "
          "points up, and cyan marks the longest thread 2 → 3 → 4, three vertices; a green LEAN ✓ tag stands beside it. "
          "Panel III: two vertical vortex tubes, the left short and thick, the right stretched long and thin; the cyan "
          "circulation loop is the same on both, the magenta vorticity arrow longer in the thin one; below, ‘A → 0?’ "
          "with a red OPEN tag.",
}

LAM = 2.25  # stretch factor

# the pentagon of the Gallai–Roy section, as in ch30-color-orientation
EDGES = [(0, 1), (1, 2), (2, 3), (3, 4), (4, 0)]
C = (0, 1, 0, 1, 2)
assert all(C[u] != C[v] for u, v in EDGES)
ARCS = [(u, v) if C[u] < C[v] else (v, u) for u, v in EDGES]
OUT = {v: [b for a, b in ARCS if a == v] for v in range(5)}


@lru_cache(None)
def height(v):
    return max((1 + height(w) for w in OUT[v]), default=0)


assert tuple(height(v) for v in range(5)) == (1, 0, 2, 1, 0)
assert max(height(v) for v in range(5)) + 1 == 3 == max(C) + 1  # longest line: three vertices, three colours
LONGEST = [(2, 3), (3, 4)]
ORDER = [4, 0, 1, 2, 3]


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 272, gap=16)

    # ---- I: the horizon
    title(one, "I　90° 视界", "I  the 90° horizon")
    ox, oy, R = 44, 236, 168
    horizon(one, ox, oy, R, labels=False)
    one.text(ox + R + 6, oy - 10, "*P*₀", size=15, color="now", weight=600)
    one.text(ox + 8, oy - R - 2, "90°", size=13, color="dim")
    one.text(ox + R * 0.5 + 10, oy - R * 0.87 - 4, "*S**", size=14, color="ink", weight=600)

    # ---- II: the colouring orients every edge; the longest line has as many vertices as colours
    title(two, "II　颜色定下箭头", "II  colors set the arrows")
    x0, dx, base, lift = 50, 42, 214, 54
    pos = {v: (x0 + dx * ORDER.index(v), base - lift * C[v]) for v in range(5)}
    for k in range(3):
        y = base - lift * k
        two.line(30, y, two.width - 8, y, "faint", 1.2, dash="3 4")
        two.text(22, y, str(k), size=13, color="dim", anchor="end", middle=True)
    two.text(22, base - lift * 2 - 30, "*c*", size=14, color="dim", anchor="middle")
    for u, v in ARCS:
        (x1, y1), (x2, y2) = pos[u], pos[v]
        role, width = ("line", 3.0) if (u, v) in LONGEST else ("ink", 1.6)
        if {u, v} == {3, 4}:
            cx_, cy_ = (x1 + x2) / 2, base - lift * 2 - 40
            pts = [((1 - s) ** 2 * x1 + 2 * (1 - s) * s * cx_ + s * s * x2,
                    (1 - s) ** 2 * y1 + 2 * (1 - s) * s * cy_ + s * s * y2) for s in [i / 40 for i in range(41)]]
            two.curve_arrow(pts[:-4], role, width, head=8)
        else:
            L = math.hypot(x2 - x1, y2 - y1)
            ux, uy = (x2 - x1) / L, (y2 - y1) / L
            two.arrow(x1 + ux * 9, y1 + uy * 9, x2 - ux * 11, y2 - uy * 11, role, width, head=8)
    for v in range(5):
        x, y = pos[v]
        two.circle(x, y, 9, color="ink", fill="bg", width=1.6, fill_opacity=1)
        two.text(x, y, str(v), size=13, color="ink", anchor="middle", middle=True, weight=600)
    two.chip(two.width / 2, 258, "LEAN ✓", "lean", size=12, anchor="middle")

    # ---- III: a vortex tube stretched thinner (schematic)
    title(three, "III　涡管越拉越细", "III  the tube thins")
    r1, L1, w1 = 30.0, 66.0, 1.0
    r2, L2 = r1 / math.sqrt(LAM), L1 * LAM
    w2 = w1 * (r1 / r2) ** 2  # Γ = ω·A fixed
    assert abs(r2 ** 2 * L2 - r1 ** 2 * L1) < 1e-9 and abs(w2 - LAM) < 1e-12
    assert abs(w1 * r1 ** 2 - w2 * r2 ** 2) < 1e-9
    cy = 130
    tube(three, 64, cy, r1, L1, w1)
    tube(three, 170, cy, r2, L2, w2)
    for sgn in (-1, 1):
        y0 = cy + sgn * (L2 / 2 + 6)
        three.arrow(170, y0, 170, y0 + sgn * 14, "dim", 1.6, head=7)
    three.arrow(106, cy, 132, cy, "dim", 1.6, head=8)
    three.text(64, cy + L1 / 2 + 26, "Γ = ω*A*", size=13, color="line", anchor="middle")
    w = three.chip(three.width / 2 + 34, 258, "OPEN", "open", size=12, anchor="middle")
    three.text(three.width / 2 + 34 - w / 2 - 8, 258, "*A* → 0 ?", size=14, color="open", anchor="end")
