"""第三十七章地图：清醒的捏合剪掉非对角；夜里两份记录联合逆转，相干原路转回；卸下躯体针孔，一扇窗口同时点亮多处。
Chapter 37 at a glance: waking pinching cuts the off-diagonal; at night both records are reversed together
and the coherence turns back; with the bodily pinhole gone, one window lights many places at once.

Panel I: the 2 × 2 example of §37.1 at θ = π/6, ρ̃ = U(θ)|0⟩⟨0|U(θ)† above and its basis pinching
below; each square has area |ρᵢⱼ|. Panel II: ρ₀₁ in the complex plane on the circle of radius 1/2:
two phase records with overlap −i turn it from 1/2 to −1/2, the joint reversal turns it back (the
two-copy certificate of §37.2). Panel III: the golden model-set places of §37.4 on a line; above, only
the body place x₀ = y₀ is read; below, with the bodily prior unloaded, all of them are lit.
"""

import cmath
import math

from _ch37 import FULL, GAMMA, RHO01, WRITTEN, in_window, lattice, pinched_pair

SIZE = (740, 270)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：上面一块 2 × 2 方格，两个对角格是青色方块，两个非对角格是品红方块，方块面积是矩阵元的大小；箭头“捏合”向下，"
          "下面一块里青色对角原样留下，品红的非对角只剩虚线框。第二栏：半径 1/2 的圆上，ρ₀₁ 从右端的 1/2 出发，两支品红箭头沿下半圆各转四分之一圈到左端的 −1/2；"
          "两支青色箭头沿内侧原路转回 1/2。第三栏：两条同样的直线上排着同一串位置；上面一条只有中间的躯体位置 x₀ 是琥珀色，其余是灰点；"
          "下面一条标着 P_body → 0，所有位置都亮成青色。",
    "en": "Three panels. Panel I: a 2 × 2 grid on top, two cyan diagonal squares and two magenta off-diagonal squares whose "
          "areas are the sizes of the matrix entries; an arrow marked 'pinch' points down to a grid where the cyan diagonal "
          "stays and the magenta off-diagonal is left as dashed outlines. Panel II: on a circle of radius 1/2, ρ₀₁ starts at "
          "1/2 on the right; two magenta arrows each turn a quarter along the lower half to −1/2 on the left; two cyan "
          "arrows turn it back along the inside to 1/2. Panel III: two identical lines carry the same row of places; on the "
          "upper one only the body place x₀ in the middle is amber and the rest are grey; the lower one, marked "
          "P_body → 0, has every place lit cyan.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def grid(p, x, y, cell, mat, ghost=None):
    for i in range(2):
        for j in range(2):
            cx, cy = x + j * cell, y + i * cell
            p.rect(cx, cy, cell, cell, color="edge", width=1.0)
            role = "line" if i == j else "area"
            v = abs(mat[i][j])
            if ghost is not None and v < 1e-12:
                g = (cell - 8) * math.sqrt(abs(ghost[i][j]))
                p.rect(cx + (cell - g) / 2, cy + (cell - g) / 2, g, g, color=role, width=1.2, dash="3 3")
                continue
            side = (cell - 8) * math.sqrt(v)  # area ∝ |ρᵢⱼ| (the largest possible entry fills the cell)
            p.rect(cx + (cell - side) / 2, cy + (cell - side) / 2, side, side, color=role, fill=role, fill_opacity=0.75,
                   width=1.0)


def draw(fig):
    t = fig.t
    one, two, three = fig.row([236, 236, 236], 270, gap=16)

    # ---- I: waking pinches the off-diagonal
    title(one, "I　清醒：捏掉非对角", "I  waking: pinch")
    before, after = pinched_pair(math.pi / 6)
    assert abs(before[0][1] - math.sqrt(3) / 4) < 1e-12 and after[0][1] == 0 and after[0][0] == before[0][0]
    cell = 46
    gx = (236 - 2 * cell) / 2
    grid(one, gx, 40, cell, before)
    one.arrow(118, 40 + 2 * cell + 6, 118, 40 + 2 * cell + 38, "ink", 2.0, head=9)
    one.text(128, 40 + 2 * cell + 28, t("捏合", "pinch"), size=14, color="dim")
    grid(one, gx, 40 + 2 * cell + 44, cell, after, ghost=before)

    # ---- II: the night reversal brings ρ₀₁ back
    title(two, "II　夜里：联合逆转", "II  night: joint reversal")
    cx, cy, R = 118, 136, 76  # R stands for |ρ₀₁| = 1/2
    two.line(cx - R - 16, cy, cx + R + 16, cy, "faint", 1.2)
    two.line(cx, cy - R - 12, cx, cy + R + 12, "faint", 1.2)
    two.circle(cx, cy, R, color="faint", width=1.2, dash="3 4")

    def at(z, r=R):
        return cx + r * z.real / abs(RHO01), cy - r * z.imag / abs(RHO01)

    # two writes, each × γ = −i (a clockwise quarter turn), on the circle
    z = complex(RHO01)
    for _ in range(2):
        w = z * GAMMA
        a0, a1 = math.degrees(cmath.phase(z)), math.degrees(cmath.phase(w))
        if a1 > a0:
            a1 -= 360
        pts = [at(cmath.rect(abs(RHO01), math.radians(a0 + (a1 - a0) * k / 24)), R) for k in range(4, 21)]
        two.curve_arrow(pts, "area", 2.4, head=9)
        z = w
    assert z == WRITTEN == -0.5
    # joint reversal, each × conj(γ) = +i (counter-clockwise), just inside
    for _ in range(2):
        w = z * GAMMA.conjugate()
        a0, a1 = math.degrees(cmath.phase(z)), math.degrees(cmath.phase(w))
        if a0 > a1:
            a0 -= 360
        pts = [at(cmath.rect(abs(RHO01), math.radians(a0 + (a1 - a0) * k / 24)), R - 16) for k in range(4, 21)]
        two.curve_arrow(pts, "line", 2.2, head=8)
        z = w
    assert z == FULL == RHO01
    two.dot(*at(complex(RHO01)), 5.0, "line", ring="bg")
    two.dot(*at(WRITTEN), 5.0, "area", ring="bg")
    two.text(at(complex(RHO01))[0] + 9, cy - 12, "1/2", size=14, color="line", halo=True)
    two.text(at(WRITTEN)[0] - 9, cy - 12, "−1/2", size=14, color="area", anchor="end", halo=True)
    two.text(cx, cy + R + 30, t("写入 × (−i)²，逆转 × (+i)²", "write × (−i)², reverse × (+i)²"), size=13, color="dim",
             anchor="middle")

    # ---- III: the pinhole and the many places
    title(three, "III　无身：多处点亮", "III  bodiless: many places")
    places = sorted(x for a, b, x, p in lattice(-3.3, 4.7, -2, 2) if in_window(p))
    assert len(places) == 5 and abs(places[2]) < 1e-12  # y₀ = 0 is the body place x₀
    s, left = 25.0, 118 - 0.7 * 25.0

    def X(x):
        return left + x * s

    for yy, lit in ((92, False), (206, True)):
        three.line(14, yy, 222, yy, "ink", 1.4)
        for x in places:
            if lit:
                three.dot(X(x), yy, 6.0, "line", ring="bg")
            elif abs(x) < 1e-12:
                three.dot(X(x), yy, 6.0, "now", ring="bg")
            else:
                three.dot(X(x), yy, 4.0, "faint")
    # the pinhole: one narrow cone onto x₀
    three.polygon([(X(0) - 4, 50), (X(0) + 4, 50), (X(0), 86)], "now", color="now", width=1.0, fill_opacity=0.35)
    three.text(X(0), 112, "x₀", size=14, color="now", anchor="middle", halo=True)
    three.text(118, 134, t("五感针孔只读这一处", "the senses read one place"), size=13, color="dim", anchor="middle")
    three.text(118, 180, "P_{body} → 0", size=14, color="line", anchor="middle")
