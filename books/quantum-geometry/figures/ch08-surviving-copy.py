"""倒带只消去幺模的相位：漏下的副本 k 留下 c_k，相干元回不到原处（第八章 §8.3，命题 prop-surviving-copy-blocks-reversal）。
Rewinding only undoes the unit-modulus phases: the surviving copy k leaves its factor c_k, and the
coherence does not come back (chapter 8, §8.3).

The coherence ρ₀₁ in the complex plane. Forward, three copies multiply it by c₁ = e^{i40°},
c₂ = e^{i30°} and c_k = 0.6·e^{i25°}; rewinding copies 1 and 2 multiplies by their conjugates. The end
point is asserted to be c_k ρ₀₁, and to differ from ρ₀₁.
"""

import cmath
import math

SIZE = (440, 320)
ALT = {
    "zh": "复平面上的相干元 ρ₀₁。灰色虚线箭头是原来的 ρ₀₁。前向拷贝时，它沿单位圆转过副本 1、2 的相位（青色的弧），"
          "再被副本 k 缩短并转一下（品红的段）。倒带时，副本 1、2 的相位沿小圆转回来（青色虚线弧），"
          "最后停在琥珀色的箭头 c_k ρ₀₁：比原来短，方向也偏了，回不到灰色箭头的尖端。",
    "en": "The coherence ρ₀₁ in the complex plane. The grey dashed arrow is the original ρ₀₁. Copying forward, it turns along "
          "the unit circle through the phases of copies 1 and 2 (cyan arcs), then copy k shortens and turns it (magenta "
          "segment). Rewinding, the phases of copies 1 and 2 turn back along the smaller circle (cyan dashed arcs), and it "
          "stops at the amber arrow c_k ρ₀₁: shorter and turned, it does not return to the tip of the grey arrow.",
}


def draw(fig):
    t = fig.t
    ox, oy, R = 150, 252, 210
    rho = cmath.rect(1.0, math.radians(8))
    c1, c2, ck = cmath.rect(1, math.radians(40)), cmath.rect(1, math.radians(30)), cmath.rect(0.6, math.radians(25))
    fwd = rho * c1 * c2 * ck
    back = fwd * c1.conjugate() * c2.conjugate()
    assert abs(back - ck * rho) < 1e-12 and abs(back - rho) > 0.1

    def P(z):
        return ox + R * z.real, oy - R * z.imag

    def arc(z0, deg, n=40):
        return [P(z0 * cmath.rect(1, math.radians(deg * i / n))) for i in range(n + 1)]

    fig.arc(ox, oy, R, -4, 96, "faint", 1.2, dash="3 4")
    fig.line(ox - 20, oy, ox + R + 14, oy, "faint", 1.1)
    fig.line(ox, oy + 14, ox, oy - R - 14, "faint", 1.1)
    fig.text(ox + R + 18, oy, "Re", size=13, color="dim", middle=True)
    fig.text(ox, oy - R - 22, "Im", size=13, color="dim", anchor="middle")
    fig.arrow(ox, oy, *P(rho), "dim", 1.8, dash="5 4")
    a1 = rho * c1
    a2 = a1 * c2
    fig.curve_arrow(arc(rho, 40), "line", 2.2, head=8)
    fig.curve_arrow(arc(a1, 30), "line", 2.2, head=8)
    # copy k: shrink and turn
    fig.curve_arrow([P(a2 + (fwd - a2) * i / 30) for i in range(31)], "area", 2.4, head=8)
    # rewind copies 2 and 1 along the smaller circle
    fig.curve_arrow(arc(fwd, -30), "line", 1.8, head=8, dash="5 4")
    fig.curve_arrow(arc(fwd * c2.conjugate(), -40), "line", 1.8, head=8, dash="5 4")
    fig.arrow(ox, oy, *P(back), "now", 2.6)
    for z in (rho, a1, a2, fwd):
        fig.dot(*P(z), 3.4, "dim")

    fig.text(P(rho)[0] + 8, P(rho)[1] + 4, "*ρ*_{01}", size=15, color="dim")
    m = P(rho * cmath.rect(1.06, math.radians(20)))
    fig.text(m[0] + 4, m[1], "×*c*_{1}", size=14, color="line")
    m = P(a1 * cmath.rect(1.06, math.radians(15)))
    fig.text(m[0] + 2, m[1] - 4, "×*c*_{2}", size=14, color="line")
    m = P((a2 + fwd) / 2)
    fig.text(m[0] - 10, m[1] + 4, "×*c*_{k}", size=14, color="area", anchor="end", halo=True)
    m = P(fwd * cmath.rect(0.86, math.radians(-35)))
    fig.text(m[0] - 2, m[1] + 6, t("倒带 2、1", "rewind 2, 1"), size=13, color="line", anchor="end", halo=True)
    b = P(back)
    fig.text(b[0] + 8, b[1] + 18, "*c*_{k} *ρ*_{01}", size=15, color="now")
