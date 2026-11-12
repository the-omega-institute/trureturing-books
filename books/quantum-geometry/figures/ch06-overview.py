"""第六章地图：几何积拆成一条线与一块面积、互补圆 D² + V² = 1、捏合把对角与副对角正交地分开。
Chapter 6 at a glance: the geometric product splits into a line and an area, the complementarity circle
D² + V² = 1, and pinching splits the diagonal from the off-diagonal at a right angle.

Panel I: the shadow of B on A is cos θ and the parallelogram sin θ (both asserted for θ = 60°).
Panel II: the pure-record circle with the marker at α = 60°, (D, V) = (sin α, cos α) = (0.866, 0.5).
Panel III: ρ(60°) = ½[[1, ½], [½, 1]] from the chapter's example: ⟨Π(ρ), Π(ρ)⟩ = ½ and the discarded coherence mass
|ρ₀₁|² + |ρ₁₀|² = ⅛ (both asserted, the latter against the example's table), drawn as the legs of a right triangle
whose hypotenuse is ⟨ρ, ρ⟩ = ⅝.
"""

import math

from _ch06 import along, line_and_area

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：横放的箭头 A 与琥珀色的箭头 B 夹角 60°，B 落在 A 上的青色影子是 cos θ，两者张出的品红平行四边形是 sin θ。"
          "第二栏：四分之一圆 D² + V² = 1，横轴是青色的可见度 V，纵轴是品红的可区分度 D；琥珀色的点在 α = 60° 处，(D, V) = (0.87, 0.5)，"
          "圆的两端分别标“只有路径”与“只有条纹”。第三栏：一个 2×2 密度矩阵，对角两格是青色的 ½，副对角两格是品红的 ¼；"
          "下面一个直角三角形，青色的直角边是对角部分 Π(ρ)，品红的直角边是副对角部分 ρ − Π(ρ)，斜边是 ρ。",
    "en": "Three panels. Panel I: the arrow A lying flat and the amber arrow B at 60°; the cyan shadow of B on A is cos θ and "
          "the magenta parallelogram they span is sin θ. Panel II: the quarter circle D² + V² = 1 with the cyan "
          "visibility V across and the magenta distinguishability D up; the amber point sits at α = 60°, (D, V) = (0.87, 0.5), "
          "and the two ends of the arc are marked “path only” and “fringes only”. Panel III: a 2×2 density matrix with cyan ½ "
          "on the diagonal and magenta ¼ off it; below, a right triangle whose cyan leg is the diagonal part Π(ρ), whose "
          "magenta leg is the off-diagonal part ρ − Π(ρ), and whose hypotenuse is ρ.",
}

THETA = 60
ALPHA = 60


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 262, gap=16)

    # ---- I: line + area
    title(one, "I　几何积 = 线 + 面积", "I  product = line + area")
    ox, oy, L = 26, 200, 112
    ta, tb, foot = line_and_area(one, ox, oy, 0, THETA, L, L)
    assert abs((foot[0] - ox) / L - math.cos(math.radians(THETA))) < 1e-12
    assert abs((oy - tb[1]) / L - math.sin(math.radians(THETA))) < 1e-12
    one.text(ta[0] + 2, oy + 22, "*A*", size=15, anchor="middle")
    one.text(tb[0] - 6, tb[1] - 4, "*B*", size=15, color="now", anchor="end")
    one.text((ox + foot[0]) / 2, oy + 24, "cos θ", size=14, color="line", anchor="middle")
    one.text((ta[0] + tb[0]) / 2 + 14, (ta[1] + tb[1]) / 2, "sin θ", size=14, color="area", anchor="middle",
             middle=True, halo=True)

    # ---- II: the complementarity circle
    title(two, "II　*D*^{2} + *V*^{2} = 1", "II  *D*^{2} + *V*^{2} = 1")
    ox, oy, R = 46, 214, 150
    d, v = math.sin(math.radians(ALPHA)), math.cos(math.radians(ALPHA))
    assert abs(d * d + v * v - 1) < 1e-12 and abs(v - 0.5) < 1e-12 and abs(d - math.sqrt(3) / 2) < 1e-12
    two.line(ox, oy, ox + R + 12, oy, "faint", 1.1)
    two.line(ox, oy, ox, oy - R - 12, "faint", 1.1)
    two.arc(ox, oy, R, 0, 90, "ink", 2.2)
    # as on the double-slit page and in ch06-three-markers: V is the shadow across, D the height up
    px, py = ox + R * v, oy - R * d
    two.line(px, py, ox, py, "faint", 1.1, dash="3 4")
    two.line(ox, oy, px, oy, "line", 5, cap="round")
    two.line(px, oy, px, py, "area", 5, cap="round")
    two.dot(px, py, 6, "now", ring="bg")
    two.text(ox + R * v / 2, oy + 22, "*V*", size=15, color="line", anchor="middle", weight=600)
    two.text(px + 10, (oy + py) / 2 + 5, "*D*", size=15, color="area", weight=600)
    two.dot(ox + R, oy, 3.6, "ink")
    two.dot(ox, oy - R, 3.6, "ink")
    two.text(ox + R, oy + 22, two.t("只有条纹", "fringes only"), size=13, color="dim", anchor="middle")
    two.text(ox + 10, oy - R - 8, two.t("只有路径", "path only"), size=13, color="dim")

    # ---- III: pinching splits at a right angle
    title(three, "III　捏合：对角 ⊥ 副对角", "III  pinching: diagonal ⊥ off", )
    c = math.cos(math.radians(60))
    rho = [[0.5, 0.5 * c], [0.5 * c, 0.5]]
    diag = rho[0][0] ** 2 + rho[1][1] ** 2
    off = rho[0][1] ** 2 + rho[1][0] ** 2
    assert abs(off - 1 / 8) < 1e-12 and abs(off - 0.5 * c * c) < 1e-12        # the example's table: ⅛ = ½ cos² α
    assert abs(diag - 0.5) < 1e-12 and abs(diag + off - 5 / 8) < 1e-12
    cell, mx, my = 40, 118 - 40, 44
    labels = [["½", "¼"], ["¼", "½"]]
    for i in range(2):
        for j in range(2):
            role = "line" if i == j else "area"
            three.rect(mx + j * cell, my + i * cell, cell, cell, color=role, fill=role, fill_opacity=0.2, width=1.4)
            three.text(mx + j * cell + cell / 2, my + i * cell + cell / 2, labels[i][j], size=15, color=role,
                       anchor="middle", middle=True, weight=600)
    three.text(mx - 8, my + cell, "*ρ* =", size=15, anchor="end", middle=True)
    K = 150
    a, b = K * math.sqrt(diag), K * math.sqrt(off)
    x0, y0 = 30, 222
    three.line(x0, y0, x0 + a, y0, "line", 5, cap="round")
    three.line(x0 + a, y0, x0 + a, y0 - b, "area", 5, cap="round")
    three.line(x0, y0, x0 + a, y0 - b, "ink", 2.0)
    three.right_angle(x0 + a, y0, 90, 8)
    three.text(x0 + a / 2, y0 + 22, "Π(*ρ*)", size=14, color="line", anchor="middle")
    three.text(x0 + a + 10, y0 - b / 2 + 5, "*ρ* − Π(*ρ*)", size=14, color="area")
    three.text(x0 + a / 2 - 6, y0 - b / 2 - 8, "*ρ*", size=15, anchor="end")
