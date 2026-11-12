"""同一个态的两种写法：两个复数（四个实数），或者球面上的一支箭头（两个角度）（第一章 §1.3）。
One state written two ways: two complex numbers (four real numbers), or one arrow on the sphere
(two angles) (chapter 1, §1.3).

The state is θ = 60°, φ = 70°: α = cos 30°, β = e^{i70°} sin 30°. The dashed copies are both
amplitudes turned by the same global phase γ = 50°; the script checks that the outer product, and so
the Bloch arrow (sin θ cos φ, sin θ sin φ, cos θ), is unchanged.
"""

import cmath
import math

from tbook import figkit

SIZE = (580, 300)
WRAP = True
ALT = {
    "zh": "左边两个小复平面：琥珀色的箭头是 α = cos 30°（指向正右）与 β = sin 30° · e^{i70°}（转过 70°），合起来是四个实数。"
          "两个箭头都再转过同一个角 γ 的虚线副本，表示乘上全局相位。右边是一颗布洛赫球，球面上只有一支琥珀色的箭头，"
          "离北极 θ = 60°、方位角 φ = 70°：两个角度。左边的实线与虚线两种写法都指向这同一支箭头。",
    "en": "On the left, two small complex planes: the amber arrows are α = cos 30° (pointing right) and β = sin 30° · e^{i70°} "
          "(turned by 70°), four real numbers in all. Dashed copies of both, turned by the same angle γ, show a global phase. "
          "On the right, a Bloch sphere carries a single amber arrow, θ = 60° from the north pole at azimuth φ = 70°: two "
          "angles. Both the solid and the dashed writing on the left point to this one arrow.",
}

THETA, PHI, GAMMA = 60.0, 70.0, 50.0


def outer(a, b):
    return [[a * a.conjugate(), a * b.conjugate()], [b * a.conjugate(), b * b.conjugate()]]


def phasor(cv, cx, cy, r, z, name):
    cv.circle(cx, cy, r, color="faint", width=1.2)
    cv.line(cx - r - 6, cy, cx + r + 6, cy, "faint", 1.1)
    cv.line(cx, cy + r + 6, cx, cy - r - 6, "faint", 1.1)
    zg = z * cmath.exp(1j * math.radians(GAMMA))
    cv.arrow(cx, cy, cx + r * zg.real, cy - r * zg.imag, "now", 1.6, dash="4 3", opacity=0.75)
    cv.arrow(cx, cy, cx + r * z.real, cy - r * z.imag, "now", 2.6)
    cv.text(cx - r - 8, cy - r + 6, name, size=17, color="now", anchor="end")


def draw(fig):
    a = complex(math.cos(math.radians(THETA / 2)), 0)
    b = cmath.exp(1j * math.radians(PHI)) * math.sin(math.radians(THETA / 2))
    g = cmath.exp(1j * math.radians(GAMMA))
    m0, m1 = outer(a, b), outer(a * g, b * g)
    assert all(abs(m0[i][j] - m1[i][j]) < 1e-12 for i in range(2) for j in range(2))     # the phase cancels
    # read the Bloch vector off the outer product: ρ = ½(I + B(r))
    r = (2 * m0[1][0].real, 2 * m0[1][0].imag, (m0[0][0] - m0[1][1]).real)
    s = figkit.sph(THETA, PHI)
    assert all(abs(r[i] - s[i]) < 1e-12 for i in range(3))

    left, right = fig.row([250, 300], 300, gap=16)
    # ---- left: two complex numbers, four reals
    R = 54
    phasor(left, 88, 88, R, a, "*α*")
    phasor(left, 88, 216, R, b, "*β*")
    left.text(left.width / 2, 292, left.t("两个复数 = 四个实数", "2 complex numbers = 4 reals"), size=14, color="dim",
              anchor="middle")
    left.text(160, 128, left.t("虚线：", "dashed:"), size=14, color="dim")
    left.text(160, 148, left.t("同乘 e^{i*γ*}", "both × e^{i*γ*}"), size=14, color="dim")
    left.arrow(160, 168, 242, 168, "dim", 1.6, head=9)

    # ---- right: one arrow, two angles
    sp = right.sphere(150, 150, 112, el=18)
    sp.outline()
    sp.great_circle((0, 0, 1), "faint", 1.2)
    sp.segment((0, 0, 0), (0, 0, 1.15), "faint", 1.2, dash="3 3")
    sp.dot((0, 0, 1), "dim", 3.2)
    # the angle θ from the pole, and φ along the equator
    sp.curve([figkit.slerp((0, 0, 1), s, k / 24) for k in range(25)], "dim", 1.3, back=False)
    foot = figkit.unit((s[0], s[1], 0))
    sp.segment((0, 0, 0), foot, "faint", 1.2, dash="3 3")
    sp.curve([figkit.sph(90, PHI * k / 20) for k in range(21)], "dim", 1.3)
    sp.arrow(s, "now", 2.8)
    mid = figkit.slerp((0, 0, 1), s, 0.5)
    sp.label(mid, "*θ*", dx=-16, dy=16, size=16, color="dim")
    sp.label(figkit.sph(90, PHI / 2), "*φ*", dx=-4, dy=20, size=16, color="dim", anchor="middle")
    sp.label(s, "***a***", dx=10, dy=-2, size=17, color="now")   # bold: the Bloch vector, not the amplitude α beside it
    right.text(150, 292, right.t("一支箭头 = 两个角度", "one arrow = two angles"), size=14, color="dim", anchor="middle")
