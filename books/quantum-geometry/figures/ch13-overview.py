"""第十三章地图：6 + 9 = 15 的账本、贝尔态缩到球心的两颗球、45° 处高出折线的余弦弧。
Chapter 13 at a glance: the 6 + 9 = 15 ledger, the two Bell marginals shrunk to the centre, and the
cosine arc above the straight toy line at 45°.

Panel I is the two-qubit Pauli board: 3 + 3 local cells and 3 × 3 = 9 correlation cells (counted).
Panel II draws two Bloch balls with their arrows at the centre (r = s = 0, from the partial traces of
the Bell density) and the correlation held between them.
Panel III plots cos θ and the uniform-direction toy line 1 − 2θ/π on [0°, 180°]; at 45° the gap is
(√2 − 1)/2 ≈ 0.2071 (asserted against the chapter's table).
"""

import math

from _ch13 import NAMES, bell_density, board, sector

SIZE = (740, 270)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：一张 4 × 4 的格子，行是 Alice 的 I、X、Y、Z，列是 Bob 的；第一行与第一列里各有三格青色的局域线，"
          "右下 3 × 3 共九格品红的关联面，合计 6 + 9 = 15。"
          "第二栏：两颗布洛赫球并排，两个琥珀色的点都在球心（r = 0，s = 0），一条品红的带子连在两颗球之间，标着“关联”。"
          "第三栏：横轴是夹角 θ 从 0° 到 180°，青色的余弦弧与暗色的直折线在 0°、90°、180° 相交；在 45° 处弧比折线高出一段品红。",
    "en": "Three panels. Panel I: a 4 × 4 board whose rows are Alice's I, X, Y, Z and whose columns are Bob's; the first row "
          "and the first column each hold three cyan local-line cells, and the lower-right 3 × 3 block holds nine magenta "
          "correlation cells, 6 + 9 = 15 in all. Panel II: two Bloch balls side by side, each with its amber point at the "
          "centre (r = 0, s = 0), joined by a magenta band labelled correlation. Panel III: the angle θ runs from 0° to "
          "180°; the cyan cosine arc and the dim straight toy line meet at 0°, 90° and 180°, and at 45° the arc stands a "
          "magenta gap above the line.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def partial(rho, keep):
    """The 2 × 2 reduced matrix of a 4 × 4 two-qubit matrix, keeping factor ``keep`` (0 = Alice)."""
    out = [[0.0, 0.0], [0.0, 0.0]]
    for i in range(2):
        for j in range(2):
            for a in range(2):
                r, c = ((2 * i + a, 2 * j + a) if keep == 0 else (2 * a + i, 2 * a + j))
                out[i][j] += rho[r][c]
    return out


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 270, gap=16)

    # ---- I: the ledger
    title(one, "I　6 + 9 = 15", "I  6 + 9 = 15")
    cell = 38
    x0, y0 = 56, 52
    board(one, x0, y0, cell)
    local = sum(sector(p, q) == "local" for p in NAMES for q in NAMES)
    corr = sum(sector(p, q) == "corr" for p in NAMES for q in NAMES)
    assert (local, corr, local + corr) == (6, 9, 15)
    one.text(x0 + 2 * cell + cell / 2, y0 + 2 * cell + cell / 2, "9", size=24, color="area", weight=700,
             anchor="middle", middle=True, halo=True)
    one.text(x0 + 2 * cell, y0 + 4 * cell + 24, one.t("局域线 3 + 3", "local lines 3 + 3"), size=13,
             color="line", anchor="middle")
    one.text(x0 + 2 * cell, y0 + 4 * cell + 44, one.t("关联面 9", "correlations 9"), size=13,
             color="area", anchor="middle")

    # ---- II: Bell marginals at the centre, correlation between the balls
    title(two, "II　局域归零，关联在两球之间", "II  zero locally, shared between")
    rho = bell_density()
    for keep in (0, 1):
        m = partial(rho, keep)
        assert abs(m[0][0] - 0.5) < 1e-12 and abs(m[1][1] - 0.5) < 1e-12 and abs(m[0][1]) < 1e-12
    cy, R = 138, 44
    centres = (54, 182)
    # the shared band: a lens between the two centres
    xa, xb = centres[0] + 6, centres[1] - 6
    top = [(xa + (xb - xa) * k / 30, cy - 4 - 22 * math.sin(math.pi * k / 30)) for k in range(31)]
    bot = [(xb - (xb - xa) * k / 30, cy + 4 + 22 * math.sin(math.pi * k / 30)) for k in range(31)]
    two.polygon(top + bot, "area", fill_opacity=0.24, color="area", width=1.2)
    for cx, name, lab in ((centres[0], "A", "*r* = 0"), (centres[1], "B", "*s* = 0")):
        sp = two.sphere(cx, cy, R, el=16)
        sp.outline(fill="cyan", fill_opacity=0.04)
        sp.great_circle((0, 0, 1), "faint", 1.1)
        two.dot(cx, cy, 6.0, "now", ring="bg")
        two.text(cx, cy - R - 12, name, size=14, color="dim", anchor="middle")
        two.text(cx, cy + R + 24, lab, size=14, color="now", anchor="middle")
    two.line(118, cy + 30, 118, cy + R + 34, "area", 1.2, dash="3 3")
    two.text(118, cy + R + 50, two.t("关联", "correlation"), size=14, color="area", anchor="middle")

    # ---- III: cosine arc above the toy line at 45°
    title(three, "III　45°：弧高于折线", "III  45°: arc above line")
    ax = three.axes(34, 52, 186, 168, (0, 180), (-1.08, 1.08))
    ax.hline(0, "faint", 1.0)
    ax.xaxis(at=-1.08, ticks=[0, 45, 90, 180], labels=["0°", "45°", "90°", "180°"])
    ax.plot(lambda t: 1 - 2 * t / 180, color="dim", width=1.6, dash="5 4")
    ax.plot(lambda t: math.cos(math.radians(t)), color="line", width=2.6)
    q, c = math.cos(math.radians(45)), 1 - 2 * 45 / 180
    assert abs((q - c) - 0.2071067811865476) < 1e-12
    for t in (0, 90, 180):
        assert abs(math.cos(math.radians(t)) - (1 - 2 * t / 180)) < 1e-12
    xq, yq = ax.pt(45, q)
    _, yc = ax.pt(45, c)
    three.line(xq, yq, xq, yc, "area", 4.0, cap="round")
    three.dot(xq, yq, 4.0, "line", ring="bg")
    three.dot(xq, yc, 3.6, "dim", ring="bg")
    x1, y1 = ax.pt(70, 0.5)
    three.text(x1, y1, "cos *θ*", size=14, color="line")
    x2, y2 = ax.pt(150, -0.3)
    three.text(x2, y2, three.t("玩具折线", "toy line"), size=13, color="dim", anchor="middle")
