"""第十八章地图：质量连起两个手性分量、生成树的一条弦围出一个基本回路、规范变换拧不动回路相位。
Chapter 18 at a glance: the mass links the two chirality components, a chord of a spanning tree closes a
fundamental loop, and a gauge change that cannot move the loop phase.

Panel I draws H = pZ + mX as a two-node graph: each component keeps its own diagonal term ±p, and
the mass m is the only link between them; the lower component is orange and striped. Panel II is a 3 × 3
lattice with the spanning tree of the lattice page (every row and the left column, cyan): its 8 tree edges and
4 chords give c = m + 1 − n = 4 (asserted); the chord in magenta closes the fundamental loop through the tree,
shaded magenta. Panel III is the worked example: after the gauge g = (1, i, −1, −i) the edge phases read
(i, i, i, −1) and the loop phase is still i (asserted).
"""

import math

from _ch18 import dial, gauge, hatch_circle, loop_arrow, square, mid_arrow

SIZE = (740, 270)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：上下两个圆点是二分量手性模型的两个分量，蓝色的上分量 Z = +1 与橙色斜纹的下分量 Z = −1；各自带一个绕回自身的小圈，标着 +p 与 −p；两点之间唯一的连线是双向箭头 m。"
          "第二栏：3 × 3 的格点上，青色的生成树是三行横边加最左一列；其余四条竖边是弦，三条画成灰色虚线，右上那一条是品红实线，它与树一起围出上面两格组成的品红长方形，里面一个逆时针的品红圆箭头；下方写着树边 8、弦 4 = m + 1 − n。"
          "第三栏：例题的单个方格，四个角上是紫色的规范指针 1、i、−1、−i，四条边中点是边相位指针，读作 i、i、i、−1；方格中心品红的回路指针指向 i。",
    "en": "Three panels. Panel I: two dots stacked vertically are the two components of the two-component chiral model, the "
          "blue upper one Z = +1 and the orange, striped lower one Z = −1; each has a small loop back to itself, marked +p and −p, and "
          "the only link between them is a double arrow marked m. Panel II: a 3 × 3 lattice whose cyan spanning tree is the three "
          "rows and the left column; the other four vertical edges are chords, three drawn grey and dashed, and the top-right "
          "one solid magenta, which together with the tree closes the magenta rectangle of the top two cells, with a magenta "
          "counter-clockwise circular arrow inside; beneath: tree 8, chords 4 = m + 1 − n. Panel III: the single square of the worked example; violet gauge pointers at the "
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
        if role == "orange":                                                # striped: never the solid amber of "now"
            hatch_circle(one, x, y, r - 1, "orange", gap=8.0, width=1.1)
        one.text(x, y, f"*Z* = {sign}1", size=13, color=role, anchor="middle", middle=True, halo=True)
        cx = x + r + 16
        pts = [(cx + 14 * math.cos(math.radians(a)), y - 12 * math.sin(math.radians(a))) for a in range(150, 150 - 290, -10)]
        one.curve_arrow(pts, role, 1.8, head=7)
        one.text(cx + 20, y + 5, f"{sign}*p*", size=15, color=role)
        one.text(x - r - 8, y + 5, one.t(zh, en), size=13, color="dim", anchor="end")
    one.arrow(x, y1 + r + 4, x, y2 - r - 4, "ink", 2.4, both=True)
    one.text(x + 10, (y1 + y2) / 2 + 6, "*m*", size=17, color="ink", weight=600)

    # ---- II: a spanning tree, its chords, and the fundamental loop of one chord
    title(two, "II　一条弦围出一个回路", "II  a chord closes a loop")
    h = 66
    xs = [52 + h * k for k in range(3)]
    ys = [64 + h * k for k in range(3)]
    V = [(i, j) for i in range(3) for j in range(3)]                        # (column, row), row 0 on top
    E = [((i, j), (i + 1, j)) for j in range(3) for i in range(2)] + [((i, j), (i, j + 1)) for i in range(3) for j in range(2)]
    tree = [e for e in E if e[0][1] == e[1][1]] + [e for e in E if e[0][0] == e[1][0] == 0]   # every row and the left column
    chords = [e for e in E if e not in tree]
    n, m = len(V), len(E)
    assert len(tree) == n - 1 and len(chords) == m + 1 - n == 4

    def tree_path(a, b):                                                    # the unique path in the tree
        adj = {v: [] for v in V}
        for p, q in tree:
            adj[p].append(q); adj[q].append(p)
        prev, todo = {a: None}, [a]
        while todo:
            v = todo.pop(0)
            for w in adj[v]:
                if w not in prev:
                    prev[w] = v; todo.append(w)
        path, v = [], b
        while v is not None:
            path.append(v); v = prev[v]
        return path[::-1]

    chord = ((2, 0), (2, 1))
    cycle = tree_path(chord[1], chord[0])                                   # back through the tree, then across the chord
    assert cycle == [(2, 1), (1, 1), (0, 1), (0, 0), (1, 0), (2, 0)]
    P = lambda v: (xs[v[0]], ys[v[1]])
    two.polygon([P(v) for v in cycle], "area", fill_opacity=0.20)
    for e in chords:
        (x1, y1), (x2, y2) = P(e[0]), P(e[1])
        if e == chord:
            two.line(x1, y1, x2, y2, "area", 3.0)
        else:
            two.line(x1, y1, x2, y2, "dim", 1.6, dash="4 4")
    for e in tree:
        (x1, y1), (x2, y2) = P(e[0]), P(e[1])
        two.line(x1, y1, x2, y2, "line", 3.0)
    for v in V:
        two.dot(*P(v), 4, "ink", ring="bg")
    loop_arrow(two, (xs[0] + xs[1]) / 2, (ys[0] + ys[1]) / 2, 14, "area", width=2.2, head=8)
    two.text(two.width / 2, 250, two.t("树边 8 · 弦 4 = *m* + 1 − *n*", "tree 8 · chords 4 = *m* + 1 − *n*"),
             size=13, color="dim", anchor="middle")

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
