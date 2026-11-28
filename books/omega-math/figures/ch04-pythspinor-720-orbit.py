"""Signed spinors keep the antipode distinct and close the orbit at 720 degrees."""

from fractions import Fraction
from math import gcd

SIZE = (704, 330)
WRAP = True
ALT = {
    "zh": "左图对照秩 10 的 ProjTernion 与秩 5 的 PythSpinor。Cayley 提升 Φ 将射影参数 (3,1,1,1)"
          "送到符号旋子 g=(1,1,1,1; 2)。右图中，六步的 κ_spin 依次为 3/4、1/4、0、1/4、3/4、1。"
          "射影读数在 360° 已回到 1，符号旋子到 720° 才回到单位元。",
    "en": "Left, rank-10 ProjTernion supplies projective parameters for the Cayley lift Φ to rank-5 "
          "PythSpinor. The input (3,1,1,1) gives g=(1,1,1,1; 2). Right, the signed overlaps over six beats "
          "are 3/4, 1/4, 0, 1/4, 3/4, and 1. The projective readout returns to 1 at 360°, while the "
          "signed spinor returns to the identity at 720°.",
}


def primitive(entries):
    divisor = gcd(*entries)
    return tuple(value // divisor for value in entries)


def lift(a, b, c, d):
    s = b*b + c*c + d*d
    return primitive((a*a - s, 2*a*b, 2*a*c, 2*a*d, a*a + s))


def spinor_powers(g, beats):
    a, b, c, d, s = g
    w, x, y, z, r = (1, 0, 0, 0, 1)
    for _ in range(beats):
        w, x, y, z, r = primitive((w*a - x*b - y*c - z*d, w*b + x*a + y*d - z*c,
                                    w*c - x*d + y*a + z*b, w*d + x*c - y*b + z*a, r*s))
        assert w*w + x*x + y*y + z*z == r*r
        yield Fraction(r + w, 2*r)


def draw(fig):
    left, right = fig.row([344, 344], 330)
    g = lift(3, 1, 1, 1)
    assert g == (1, 1, 1, 1, 2)
    signed = list(spinor_powers(g, 6))
    assert signed == [Fraction(3, 4), Fraction(1, 4), 0, Fraction(1, 4), Fraction(3, 4), 1]

    left.text(172, 24, left.t("从射影参数到符号旋子", "From projective parameters to spinors"),
              size=17, anchor="middle", weight=600)
    projective = left.box(172, 51, left.t("ProjTernion · 秩 10", "ProjTernion · rank 10"), "cyan",
                          w=262, note="(a, b, c, d) = (3, 1, 1, 1)")
    left.arrow(*projective.bottom, 172, 167, "violet", 1.7, head=7)
    left.text(185, 132, left.t("Cayley 提升 Φ", "Cayley lift Φ"), size=14, color="violet")
    left.box(172, 172, left.t("PythSpinor · 秩 5", "PythSpinor · rank 5"), "violet",
             w=262, note="g120_spin = (1, 1, 1, 1; 2)")
    left.text(172, 259, left.t("二次核桥接", "Quadratic kernel bridge"), size=15, anchor="middle", weight=600)
    left.text(172, 292, "κ_{proj} = (2κ_{spin} − 1)²", size=18, anchor="middle")

    right.text(172, 24, right.t("六步闭合 · 720°", "Six-beat closure · 720°"),
               size=18, anchor="middle", weight=600)
    ax = right.axes(43, 71, 262, 171, (0, 6.25), (0, 1.09))
    ax.xaxis(ticks=range(7))
    ax.yaxis(ticks=[0, 0.5, 1], labels=["0", "1/2", "1"])
    ax.grid(ys=[0.5, 1])
    spin_points = list(enumerate([1, *signed]))
    proj_points = [(n, (2*k - 1)**2) for n, k in spin_points]
    ax.path(proj_points, "cyan", 1.6, dash="5 4")
    ax.points(proj_points, "cyan", 3)
    ax.path(spin_points, "violet", 2.3)
    ax.points(spin_points, "violet", 4)
    for n, value in spin_points[1:]:
        ax.text(n, value, str(value), dy=-12, anchor="middle", size=13, color="violet", halo=True)
    right.text(321, 247, "n", size=14)
    for x, role, label in ((49, "cyan", "κ_{proj}"), (182, "violet", "κ_{spin}")):
        right.line(x, 293, x + 26, 293, role, 2, dash="5 4" if role == "cyan" else None)
        right.text(x + 35, 297, label, size=15)
