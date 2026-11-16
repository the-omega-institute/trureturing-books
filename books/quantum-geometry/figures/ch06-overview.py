"""第六章地图：几何积拆成一条线与一块面积、互补圆 D² + V² = 1、不确定关系的账由对易子的地板、协方差平方与混合度拼成。
Chapter 6 at a glance: the geometric product splits into a line and an area, the complementarity circle
D² + V² = 1, and the uncertainty budget: the commutator floor, the squared covariance and the mixedness.

Panel I: the shadow of B on A is cos θ and the parallelogram sin θ (both asserted for θ = 60°).
Panel II: the pure-record circle with the marker at α = 60°, (D, V) = (sin α, cos α) = (0.866, 0.5).
Panel III: the row r = (0.5, 0.5, 0.5) of the example ex-mixed-qubit-robertson-slack (A = σx, B = σy): the bar
(σ_A σ_B)² = 0.5625 is the commutator floor rz² = 0.25, the squared covariance rx² ry² = 0.0625 and the mixedness
1 − |r|² = 0.25 stacked (asserted).
"""

import math

from _ch06 import along, line_and_area

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：横放的箭头 A 与琥珀色的箭头 B 夹角 60°，B 落在 A 上的青色影子是 cos θ，两者张出的品红平行四边形是 sin θ。"
          "第二栏：四分之一圆 D² + V² = 1，横轴是青色的可见度 V，纵轴是品红的可区分度 D；琥珀色的点在 α = 60° 处，(D, V) = (0.87, 0.5)，"
          "圆的两端分别标“只有路径”与“只有条纹”。第三栏：一根竖条，总高是 (σ_A σ_B)²，从下往上切成三段："
          "品红的对易子那一项 |C_{1/2}|²，上沿一条虚线标作“地板”；薄薄一段青色的协方差平方 cov²；灰色的混合度。",
    "en": "Three panels. Panel I: the arrow A lying flat and the amber arrow B at 60°; the cyan shadow of B on A is cos θ and "
          "the magenta parallelogram they span is sin θ. Panel II: the quarter circle D² + V² = 1 with the cyan "
          "visibility V across and the magenta distinguishability D up; the amber point sits at α = 60°, (D, V) = (0.87, 0.5), "
          "and the two ends of the arc are marked “path only” and “fringes only”. Panel III: one upright bar whose whole "
          "height is (σ_A σ_B)², cut from the bottom into the magenta commutator term |C_{1/2}|², with a dashed line at its "
          "top marked “floor”; a thin cyan piece, the squared covariance cov²; and the grey mixedness.",
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

    # ---- III: the uncertainty budget of one mixed qubit, from the example ex-mixed-qubit-robertson-slack
    title(three, "III　不确定关系的账", "III  the uncertainty budget")
    rx = ry = rz = 0.5
    total = (1 - rx * rx) * (1 - ry * ry)
    floor, cov2, mix = rz * rz, rx * rx * ry * ry, 1 - (rx * rx + ry * ry + rz * rz)
    assert abs(floor + cov2 + mix - total) < 1e-12 and abs(total - 0.5625) < 1e-12      # the table's row (0.5, 0.5, 0.5)
    K, bx, bw, base = 300, 72, 50, 232
    y = base
    for role, val, op in (("area", floor, 0.32), ("line", cov2, 0.32), ("dim", mix, 0.22)):
        three.rect(bx, y - K * val, bw, K * val, color=role, fill=role, fill_opacity=op, width=1.2)
        y -= K * val
    lx = bx + bw + 12
    three.text(lx, base - K * floor / 2, "|*C*_{1/2}|^{2}", size=14, color="area", middle=True)
    three.text(lx, base - K * (floor + cov2 / 2) + 2, "cov^{2}", size=14, color="line", middle=True)
    three.text(lx, base - K * (floor + cov2 + mix / 2), three.t("混合度", "mixedness"), size=14, color="dim", middle=True)
    three.line(bx - 8, base - K * floor, bx + bw + 4, base - K * floor, "area", 1.4, dash="4 3")
    three.text(bx - 10, base - K * floor + 13, three.t("地板", "floor"), size=13, color="area", anchor="end", middle=True)
    three.brace(bx - 6, base - K * floor - 2, bx - 6, base - K * total, three.t("余量", "slack"))
    three.text(bx + bw / 2, base - K * total - 12, "(σ_{*A*} σ_{*B*})^{2}", size=14, anchor="middle")
