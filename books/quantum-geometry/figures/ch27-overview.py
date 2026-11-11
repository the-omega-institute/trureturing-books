"""第二十七章地图：平行四边形的两条对角线、连成一片的支撑把相位锁成一个、挤压两次等于一次。
Chapter 27 at a glance: the two diagonals of a parallelogram, overlapping supports that lock every
phase into one, and a pinching that does nothing the second time.

Panel I is the parallelogram spanned by x and y with its diagonals x + y and x − y (the identity
|x+y|² + |x−y|² = 2(|x|² + |y|²) is asserted for the drawn vectors). Panel II is a chain of four
coordinates; three test vectors each cover two neighbouring coordinates, and every diagonal entry
carries the same phase arrow. Panel III is a 3 × 3 block matrix whose off-diagonal blocks the pinching
removes; pinching the result again leaves it in place.
"""

import math

from _ch27 import blocks, title

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：两支墨色箭头 x、y 撑开一个平行四边形，两条青色的对角线是 x + y 与 x − y，下方写着两条对角线的平方和等于四条边的平方和。"
          "第二栏：四个坐标排成一行，每个圆里一支紫色的相位箭头，四支方向相同；三条青色的弧各连起相邻的两个坐标，表示某个测试态在这两格上同时不为零，弧连成一条链，"
          "下方写着 A = c · 1。第三栏：左边是 3 × 3 的块矩阵 ρ，对角块青色，非对角块品红；箭头“挤压”指向右边只剩青色对角块的矩阵，"
          "它下方的小圈箭头表示再挤压一次，矩阵不动。",
    "en": "Three panels. Panel I: two ink arrows x and y span a parallelogram; its two cyan diagonals are x + y and x − y, and "
          "below it the squares of the diagonals add up to the squares of the four sides. Panel II: four coordinates in a row, "
          "each circle holding a violet phase arrow, all four pointing the same way; three cyan arcs each join two neighbouring "
          "coordinates, meaning that some test vector is non-zero on both, and the arcs form a chain; below, A = c · 1. "
          "Panel III: on the left a 3 × 3 block matrix ρ with cyan diagonal blocks and magenta off-diagonal blocks; an arrow "
          "labelled pinch leads to the matrix with only its cyan diagonal blocks left, and a small loop under it says that "
          "pinching again leaves it in place.",
}


def norm2(v):
    return v[0] ** 2 + v[1] ** 2


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 262, gap=16)

    # ---- I: the parallelogram law
    title(one, "I　平行四边形恒等式", "I  parallelogram law")
    x = (136.0, 18.0)          # page coordinates, y up
    y = (52.0, 104.0)
    ox, oy = 30, 196
    P = lambda v: (ox + v[0], oy - v[1])
    s = (x[0] + y[0], x[1] + y[1])
    d = (x[0] - y[0], x[1] - y[1])
    assert abs(norm2(s) + norm2(d) - 2 * (norm2(x) + norm2(y))) < 1e-9
    one.polygon([P((0, 0)), P(x), P(s), P(y)], "line", fill_opacity=0.05)
    one.line(*P(x), *P(s), "faint", 1.3, dash="4 3")
    one.line(*P(y), *P(s), "faint", 1.3, dash="4 3")
    one.arrow(*P((0, 0)), *P(s), "line", 2.4)
    one.arrow(*P(y), *P(x), "line", 2.4)
    one.arrow(*P((0, 0)), *P(x), "ink", 2.2)
    one.arrow(*P((0, 0)), *P(y), "ink", 2.2)
    one.dot(*P((0, 0)), 3.2, "ink")
    lx = P((x[0] * 0.55, x[1] * 0.55))
    one.text(lx[0], lx[1] + 18, "*x*", size=15, anchor="middle")
    ly = P((y[0] * 0.5, y[1] * 0.5))
    one.text(ly[0] - 12, ly[1], "*y*", size=15, anchor="end", middle=True)
    ls = P((s[0] * 0.72, s[1] * 0.72))
    one.text(ls[0] - 6, ls[1] - 8, "*x* + *y*", size=14, color="line", anchor="end", halo=True)
    ld = P((y[0] + d[0] * 0.66, y[1] + d[1] * 0.66))
    one.text(ld[0] + 8, ld[1] - 6, "*x* − *y*", size=14, color="line", halo=True)
    one.text(118, 238, "|*x*+*y*|^{2} + |*x*−*y*|^{2} = 2(|*x*|^{2} + |*y*|^{2})", size=13, anchor="middle")

    # ---- II: connected supports lock one phase
    title(two, "II　支撑连通 ⇒ 同一相位", "II  connected ⇒ one phase")
    xs = [36, 88, 140, 192]
    cy, r = 142, 21
    phase = 52
    for i in range(3):
        a, b = xs[i], xs[i + 1]
        mid, half = (a + b) / 2, (b - a) / 2
        pts = [(mid - half * math.cos(math.radians(t)), cy - r - 2 - 30 * math.sin(math.radians(t))) for t in range(0, 181, 6)]
        two.polyline(pts, "line", 2.2)
        two.text(mid, cy - r - 40, ["*x*", "*x*′", "*x*″"][i], size=14, color="line", anchor="middle")
    for k, cx in enumerate(xs):
        two.circle(cx, cy, r, color="edge", fill="panel", width=1.4)
        ex = cx + (r - 4) * math.cos(math.radians(phase))
        ey = cy - (r - 4) * math.sin(math.radians(phase))
        two.arrow(cx, cy, ex, ey, "axis", 2.2, head=7)
        two.text(cx, cy + r + 20, f"*A*_{{{k + 1}{k + 1}}}", size=14, anchor="middle")
    two.text(118, 220, two.t("四格相位相同：*A* = *c* · 1", "one phase: *A* = *c* · 1"), size=14, anchor="middle")

    # ---- III: pinching twice = once
    title(three, "III　挤压两次 = 一次", "III  pinch twice = once")
    cell = 22
    lx0, rx0, top = 16, 154, 70
    blocks(three, lx0, top, cell, 3, lambda i, j: True)
    blocks(three, rx0, top, cell, 3, lambda i, j: False)
    three.text(lx0 + 33, top - 12, "*ρ*", size=15, anchor="middle")
    three.text(rx0 + 33, top - 12, "Σ *P*_{k}*ρP*_{k}", size=14, anchor="middle")
    ay = top + 33
    three.arrow(lx0 + 74, ay, rx0 - 10, ay, "ink", 1.8, head=8)
    three.text((lx0 + 74 + rx0 - 10) / 2, ay - 9, three.t("挤压", "pinch"), size=13, color="dim", anchor="middle")
    # the second pinching: a loop that comes back to the same matrix
    cx0, yb = rx0 + 33, top + 66 + 6
    loop = [(cx0 + 24 * math.cos(math.radians(t)), yb + 30 * math.sin(math.radians(t))) for t in range(160, 19, -5)]
    three.curve_arrow(loop, "ink", 1.6, head=7)
    three.text(cx0, yb + 56, three.t("再挤压：不动", "again: stays"), size=13, color="dim", anchor="middle")
