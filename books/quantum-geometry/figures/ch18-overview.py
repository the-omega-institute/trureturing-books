"""第十八章地图：质量连起两个手性分量、绕小方格一圈、规范变换拧不动回路相位。
Chapter 18 at a glance: the mass links the two chirality components, a walk once round a small
square, and a gauge change that cannot move the loop phase.

Panel I draws H = pZ + mX as a two-node graph: each component keeps its own diagonal term ±p, and
the mass m is the only link between them. Panel II marks one plaquette 0 → 1 → 2 → 3 → 0 in a
lattice. Panel III is the worked example: after the gauge g = (1, i, −1, −i) the edge phases read
(i, i, i, −1) and the loop phase is still i (asserted).
"""

import math

from _ch18 import dial, gauge, loop_arrow, mid_arrow, square

SIZE = (740, 270)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：上下两个圆点是二分量手性模型的两个分量，蓝色的上分量 Z = +1 与橙色的下分量 Z = −1；各自带一个绕回自身的小圈，标着 +p 与 −p；两点之间唯一的连线是双向箭头 m。"
          "第二栏：一片方格格点中，有一个小方格涂成品红，四条边按 0 → 1 → 2 → 3 → 0 带着方向箭头，格内有一个逆时针的品红圆箭头，表示绕它走一圈。"
          "第三栏：例题的单个方格，四个角上是紫色的规范指针 1、i、−1、−i，四条边中点是边相位指针，读作 i、i、i、−1；方格中心品红的回路指针指向 i。",
    "en": "Three panels. Panel I: two dots stacked vertically are the two components of the two-component chiral model, the "
          "blue upper one Z = +1 and the orange lower one Z = −1; each has a small loop back to itself, marked +p and −p, and "
          "the only link between them is a double arrow marked m. Panel II: in a patch of lattice, one small square is shaded "
          "magenta; its four edges carry direction arrows 0 → 1 → 2 → 3 → 0, and a magenta counter-clockwise circular arrow "
          "inside says: walk once around it. Panel III: the single square of the worked example; violet gauge pointers at the "
          "corners read 1, i, −1, −i, the edge-phase pointers at the edge midpoints read i, i, i, −1, and the magenta loop "
          "pointer at the centre points to i.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 270, gap=16)

    # ---- I: the mass is the only link between the two chirality components
    title(one, "I　质量连起两个手性", "I  mass links the two")
    x, y1, y2, r = 104, 86, 214, 23
    for y, role, sign, zh, en in ((y1, "blue", "+", "上分量", "upper"), (y2, "orange", "−", "下分量", "lower")):
        one.circle(x, y, r, color=role, fill=role, fill_opacity=0.22, width=2.2)
        one.text(x, y, f"*Z* = {sign}1", size=13, color=role, anchor="middle", middle=True)
        cx = x + r + 16
        pts = [(cx + 14 * math.cos(math.radians(a)), y - 12 * math.sin(math.radians(a))) for a in range(150, 150 - 290, -10)]
        one.curve_arrow(pts, role, 1.8, head=7)
        one.text(cx + 20, y + 5, f"{sign}*p*", size=15, color=role)
        one.text(x - r - 8, y + 5, one.t(zh, en), size=13, color="dim", anchor="end")
    one.arrow(x, y1 + r + 4, x, y2 - r - 4, "ink", 2.4, both=True)
    one.text(x + 10, (y1 + y2) / 2 + 6, "*m*", size=17, color="ink", weight=600)

    # ---- II: once around a small square
    title(two, "II　绕小方格一圈", "II  once round a square")
    h = 66
    xs = [19 + h * k for k in range(4)]
    ys = [54 + h * k for k in range(4)]
    for yy in ys:
        two.line(xs[0] - 8, yy, xs[-1] + 8, yy, "faint", 1.3)
    for xx in xs:
        two.line(xx, ys[0] - 8, xx, ys[-1] + 8, "faint", 1.3)
    for xx in xs:
        for yy in ys:
            two.dot(xx, yy, 2.6, "dim")
    cx, cy = (xs[1] + xs[2]) / 2, (ys[1] + ys[2]) / 2
    corners = square(cx, cy, h / 2)
    two.polygon(corners, "area", fill_opacity=0.20)
    for k in range(4):
        p, q = corners[k], corners[(k + 1) % 4]
        two.line(p[0], p[1], q[0], q[1], "ink", 2.4)
        mid_arrow(two, p, q, "ink", 9)
    for k, (px, py) in enumerate(corners):
        two.dot(px, py, 4, "ink", ring="bg")
        dx = -9 if k in (0, 3) else 9
        dy = 16 if k in (0, 1) else -8
        two.text(px + dx, py + dy, str(k), size=14, color="dim", anchor="end" if dx < 0 else "start", halo=True)
    loop_arrow(two, cx, cy, 17, "area", width=2.4, head=9)

    # ---- III: a gauge change spreads the phase round the square, the loop phase stays i
    title(three, "III　回路相位拧不动", "III  the loop phase stays")
    edges = [(0, 1), (1, 2), (2, 3), (3, 0)]
    u = [1, 1, 1, 1j]
    g = [1, 1j, -1, -1j]
    v = gauge(u, g, edges)
    assert all(abs(a - b) < 1e-12 for a, b in zip(v, [1j, 1j, 1j, -1]))
    loop = lambda w: w[0] * w[1] * w[2] * w[3]
    assert abs(loop(u) - 1j) < 1e-12 and abs(loop(v) - 1j) < 1e-12
    cx, cy, hh = 118, 150, 64
    corners = square(cx, cy, hh)
    three.polygon(corners, "area", fill_opacity=0.10)
    for k in range(4):
        p, q = corners[k], corners[(k + 1) % 4]
        three.line(p[0], p[1], q[0], q[1], "ink", 1.8)
        mid_arrow(three, p, q, "ink", 8, at=0.3)
        dial(three, (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, v[k], "ink", 11)
    for k, (px, py) in enumerate(corners):
        dial(three, px, py, g[k], "violet", 12, ring="violet")
    dial(three, cx, cy, loop(v), "area", 17, ring="area")
    three.text(cx, cy + 36, three.t("回路 *i*", "loop *i*"), size=14, color="area", anchor="middle", weight=600)
