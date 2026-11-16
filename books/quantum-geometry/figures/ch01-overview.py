"""第一章地图：两支箭头不用外部 C 就有夹角；连续的方向过快门只剩 ±1；四个实数收成球面上一支箭头。
Chapter 1 at a glance: two arrows have an angle without an external C; a continuous direction comes out
of the shutter as ±1 only; four real numbers fold into one arrow on the sphere.

Panel I (§1.1): an external frame C is drawn behind two arrows x, y and struck out; the angle θ between
them does not use it. Panel II (§1.2): A is the ruler, B opens an angle θ with it, and an ideal
two-outcome reading only reports the two ends +1, −1 of A's line. Panel III (§1.3): the pure state
θ = 60°, φ = 70° written as two complex numbers α = cos 30°, β = e^{i70°} sin 30° (four reals, one of
them removed by normalization and one by the global phase) and as one Bloch arrow with two angles; the
script checks that the outer product gives that arrow.
"""

import cmath
import math

from tbook import figkit

from _ch01 import along, ray, title

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：两支箭头 x、y 之间青色的夹角 θ；它们身后一套灰色虚线的外部坐标架 C 被一个叉划掉。"
          "第二栏：青色的箭头 A 当尺子，它所在的直线两端标着 +1 与 −1；琥珀色的箭头 B 与 A 张开夹角 θ，读数只落在这两端。"
          "第三栏：左边两个小复平面上的琥珀色箭头 α、β，标着“四个实数”；一支箭头指向右边的布洛赫球，"
          "球上只有一支琥珀色的箭头，标着两个角 θ、φ。",
    "en": "Three panels. Panel I: the cyan angle θ between two arrows x and y; behind them a grey dashed external frame C is "
          "struck out with a cross. Panel II: the cyan arrow A is the ruler, the line it lies on is marked +1 and −1 at its "
          "two ends, and the amber arrow B opens an angle θ with A; the readings land only on those two ends. Panel III: "
          "two small complex planes with amber arrows α and β, marked “four reals”, and an arrow to a Bloch sphere that "
          "carries a single amber arrow with two angles θ and φ.",
}

THETA, PHI = 60.0, 70.0


def phasor(cv, cx, cy, r, z, name):
    cv.circle(cx, cy, r, color="faint", width=1.1)
    cv.line(cx - r - 4, cy, cx + r + 4, cy, "faint", 1.0)
    cv.arrow(cx, cy, cx + r * z.real, cy - r * z.imag, "now", 2.2, head=7)
    cv.text(cx - r - 6, cy - r + 8, name, size=15, color="now", anchor="end")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 262, gap=16)

    # ---- I (§1.1): the angle between two arrows needs no external C
    title(one, "I　两子：C 多余", "I  two arrows: C is surplus")
    cx, cy = 46, 214
    one.arrow(cx, cy, cx + 172, cy, "dim", 1.3, head=7, dash="4 4", opacity=0.7)
    one.arrow(cx, cy, cx, cy - 162, "dim", 1.3, head=7, dash="4 4", opacity=0.7)
    one.cross(cx + 18, cy - 18, 12, "dim", 2.0)
    one.text(cx - 8, cy + 20, "*C*", size=16, color="dim", anchor="middle")
    ox, oy, L = 104, 182, 100
    ray(one, ox, oy, 18, L, "ink", 2.4)
    ray(one, ox, oy, 78, L, "ink", 2.4)
    one.angle(ox, oy, 36, 18, 78, "*θ*", color="line", size=15, width=1.8)
    p, q = along(ox, oy, 18, L), along(ox, oy, 78, L)
    one.text(p[0] - 2, p[1] + 20, "*x*", size=15, anchor="middle")
    one.text(q[0] + 10, q[1] + 6, "*y*", size=15)

    # ---- II (§1.2): a ruler and two readings
    title(two, "II　读数只落两端", "II  readings land on two ends")
    ox, oy, L = 118, 150, 86
    up, dn = along(ox, oy, 90, L + 6), along(ox, oy, 270, L - 10)
    two.line(dn[0], dn[1], up[0], up[1], "line", 1.4)
    ray(two, ox, oy, 90, L - 14, "line", 2.8)
    ray(two, ox, oy, 90 - 55, L - 14, "now", 2.6)
    two.angle(ox, oy, 30, 35, 90, "*θ*", color="line", size=15, width=1.8)
    two.dot(up[0], up[1], 5.5, "line", ring="bg")
    two.dot(dn[0], dn[1], 5.5, "line", ring="bg")
    two.text(up[0] - 12, up[1] + 6, "+1", size=15, color="line", weight=600, anchor="end")
    two.text(dn[0] - 12, dn[1] + 6, "−1", size=15, color="line", weight=600, anchor="end")
    a = along(ox, oy, 90, L - 14)
    two.text(a[0] + 10, a[1] + 14, "*A*", size=15, color="line")
    b = along(ox, oy, 35, L - 14)
    two.text(b[0] + 8, b[1] + 4, "*B*", size=15, color="now")

    # ---- III (§1.3): four reals become one arrow with two angles
    title(three, "III　四个实数 → 一支箭头", "III  four reals → one arrow")
    al = complex(math.cos(math.radians(THETA / 2)), 0)
    be = cmath.exp(1j * math.radians(PHI)) * math.sin(math.radians(THETA / 2))
    rho01, rho10 = al * be.conjugate(), be * al.conjugate()
    r = (2 * rho10.real, 2 * rho10.imag, abs(al) ** 2 - abs(be) ** 2)      # ρ = ½(I + B(r))
    s = figkit.sph(THETA, PHI)
    assert all(abs(r[i] - s[i]) < 1e-12 for i in range(3)) and abs(rho01 - rho10.conjugate()) < 1e-12
    phasor(three, 42, 82, 26, al, "*α*")
    phasor(three, 42, 168, 26, be, "*β*")
    three.text(42, 222, three.t("四个实数", "four reals"), size=13, color="dim", anchor="middle")
    three.arrow(78, 126, 104, 126, "dim", 1.5, head=8)
    sp = three.sphere(166, 128, 60, el=18)
    sp.outline()
    sp.great_circle((0, 0, 1), "faint", 1.1)
    sp.segment((0, 0, 0), (0, 0, 1.12), "faint", 1.1, dash="3 3")
    sp.curve([figkit.slerp((0, 0, 1), s, k / 24) for k in range(25)], "dim", 1.3, back=False)
    sp.curve([figkit.sph(90, PHI * k / 20) for k in range(21)], "dim", 1.3)
    sp.arrow(s, "now", 2.6)
    sp.label(figkit.slerp((0, 0, 1), s, 0.5), "*θ*", dx=-12, dy=14, size=14, color="dim")
    sp.label(figkit.sph(90, PHI / 2), "*φ*", dx=-2, dy=18, size=14, color="dim", anchor="middle")
    three.text(166, 222, three.t("两个角", "two angles"), size=13, color="dim", anchor="middle")
