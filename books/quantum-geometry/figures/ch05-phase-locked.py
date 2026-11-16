"""相位锁定的重叠幅躺在基准相位 u 的那条线上，与 u 张不出面积（第五章 §5.3，[@prop-phase-locked-overlap]）。
A phase-locked overlap lies on the line of the reference phase u and spans no area with it (chapter 5, §5.3).

The condition z̄ = (u⁻¹)² z says z equals its own mirror image u² z̄ in the line through u. The script checks that
the amber z = u·r satisfies it with r = Re(u⁻¹ z), and that the grey z′ off the line does not: its mirror is
another point, and the area u ∧ z′ = Im(ū z′) is not zero.
"""

import cmath
import math

from _ch05 import along

SIZE = (460, 330)
ALT = {
    "zh": "复平面，虚线是单位圆。青色的直线穿过原点和单位相位 u。琥珀色的箭头 z 躺在这条青色的线上，写作 z = u·r，r 是实数；"
          "它在这条线里的镜像就是它自己，与 u 张开的面积为零。另一支灰色的箭头 z′ 不在线上：它的镜像是另一支虚线箭头，"
          "它与 u 张开一块品红的平行四边形，标“u∧z′ ≠ 0”。",
    "en": "The complex plane, with the unit circle dashed. A cyan line runs through the origin and the unit phase u. The amber "
          "arrow z lies on that cyan line and is written z = u·r with r real; its mirror image in the line is itself, and the "
          "area it spans with u is zero. A grey arrow z′ is off the line: its mirror image is a different, dashed arrow, and "
          "with u it spans a magenta parallelogram marked “u∧z′ ≠ 0”.",
}

U_DEG = 32         # the reference phase u = e^{iφ}
R_LOCK = 1.55      # the real amplitude of the locked overlap
Z_OFF = cmath.rect(1.25, math.radians(104))      # an overlap that is not locked


def mirror(u, z):
    """The mirror image of z in the line through the unit number u: u² z̄."""
    return u * u * z.conjugate()


def draw(fig):
    t = fig.t
    ox, oy, S = 196, 212, 96        # origin and pixels per unit
    u = cmath.rect(1, math.radians(U_DEG))
    z = u * R_LOCK
    assert abs(abs(u) - 1) < 1e-12
    assert abs(z.conjugate() - (1 / u) ** 2 * z) < 1e-12                  # z̄ = (u⁻¹)² z
    assert abs((z / u).real - R_LOCK) < 1e-12 and abs((z / u).imag) < 1e-12   # r = Re(u⁻¹ z), z = u·r
    assert abs(mirror(u, z) - z) < 1e-12
    area = (u.conjugate() * Z_OFF).imag                                  # u ∧ z′
    assert abs(Z_OFF.conjugate() - (1 / u) ** 2 * Z_OFF) > 0.1 and abs(area) > 0.5

    def P(w):
        return ox + S * w.real, oy - S * w.imag

    fig.line(ox - 176, oy, ox + 250, oy, "faint", 1.1)
    fig.line(ox, oy + 112, ox, oy - 204, "faint", 1.1)
    fig.text(ox + 250, oy + 18, "Re", size=13, color="dim", anchor="end")
    fig.text(ox + 8, oy - 192, "Im", size=13, color="dim")
    fig.circle(ox, oy, S, color="faint", width=1.2, dash="3 4")

    # the line of u
    a, b = P(u * -1.25), P(u * 2.05)
    fig.line(*a, *b, "line", 1.8)

    # the off-line overlap: parallelogram with u, and its mirror
    o = complex(0, 0)
    fig.polygon([P(o), P(u), P(u + Z_OFF), P(Z_OFF)], "area", color="area", width=1.2, fill_opacity=0.18)
    m = mirror(u, Z_OFF)
    fig.arrow(ox, oy, *P(m), "dim", 1.6, dash="5 4")
    fig.line(*P(Z_OFF), *P(m), "faint", 1.2, dash="2 4")
    fig.arrow(ox, oy, *P(Z_OFF), "dim", 2.2)

    # the locked overlap
    fig.arrow(ox, oy, *P(z), "now", 2.8)
    fig.dot(*P(u), 4.6, "line", ring="bg")

    x, y = P(u)
    fig.text(x + 4, y + 22, "*u*", size=16, color="line", weight=600)
    x, y = P(z)
    fig.text(x + 10, y + 4, "*z* = *u*·*r*", size=15, color="now")
    x, y = P(Z_OFF)
    fig.text(x - 10, y + 4, "*z*′", size=15, color="dim", anchor="end")
    x, y = P(m)
    fig.text(x + 8, y + 16, t("*z*′ 的镜像", "mirror of *z*′"), size=13, color="dim")
    x, y = P((u + Z_OFF) * 0.5)
    fig.text(x, y - 4, "*u*∧*z*′ ≠ 0", size=14, color="area", anchor="middle", middle=True, halo=True)
