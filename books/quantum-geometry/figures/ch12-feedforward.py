"""哪一支都不要紧：测得 s = 1 时，输出比 s = 0 多一个 X；绕 x 轴转半圈就回到同一点（第十二章 §簇态测量与经典前馈）。
Either branch will do: with outcome s = 1 the output carries an extra X, and half a turn about x brings it back to the
s = 0 point (chapter 12).

Qubit 1 holds |ψ⟩ with Bloch polar angle 60° and azimuth 270°, measured at α = 60°. The two branch states on qubit 2 are
computed from ⟨s_α| CZ(|ψ⟩ ⊗ |+⟩) and agree with (1/√2) Xˢ H diag(1, e^{−iα})|ψ⟩ (asserted in _ch12.py); each has
probability ½.
"""

import math

from tbook import figkit

from _ch12 import bloch, branch, flip_x, ket

SIZE = (480, 300)
ALT = {
    "zh": "一颗布洛赫球，紫色的线是 x 轴。两个点是第 2 颗比特在两种测量结果下的态：琥珀色的点是 s = 0 那一支，"
          "灰色的点是 s = 1 那一支，各占一半的概率。一支琥珀色的弯箭头从灰点出发，绕紫色的 x 轴转了半圈，"
          "落在琥珀色的点上：前馈的 X 把 s = 1 那一支修正成和 s = 0 一样的态。",
    "en": "A Bloch sphere; the violet line is the x axis. The two points are the states of qubit 2 for the two measurement "
          "outcomes: the amber point is the branch s = 0 and the grey point the branch s = 1, each with probability one half. "
          "An amber curved arrow leaves the grey point, turns half a circle about the violet x axis and lands on the amber "
          "point: the feedforward X turns the s = 1 branch into the same state as the s = 0 branch.",
}

PSI = ket(60, 270)
ALPHA = math.pi / 3
S0 = bloch(branch(PSI, ALPHA, 0))
S1 = bloch(branch(PSI, ALPHA, 1))
assert max(abs(a - b) for a, b in zip(flip_x(S1), S0)) < 1e-12


def draw(fig):
    sp = fig.sphere(230, 152, 116)
    sp.outline()
    sp.great_circle((0, 0, 1), "faint", 1.2)
    sp.segment((-1.0, 0, 0), (1.3, 0, 0), "axis", 2.4)
    sp.label((1, 0, 0), "*x*", scale=1.42, size=15, color="axis", anchor="middle", middle=True)
    sp.small_circle((1, 0, 0), math.degrees(math.acos(S0[0])), "faint", 1.2)
    pts = [figkit.rotate(S1, (1, 0, 0), 180 * k / 80) for k in range(81)]
    sp.curve(pts[3:-4], "now", 2.2)
    (xa, ya), (xb, yb) = sp.xy(pts[-6]), sp.xy(pts[-4])
    fig.arrow_head(xb, yb, math.degrees(math.atan2(-(yb - ya), xb - xa)), "now", head=9)
    sp.arrow(S0, "now", 2.6, head=9)
    sp.dot(S0, "now", 5.2, ring="bg")
    sp.dot(S1, "dim", 5.2, ring="bg")
    sp.label(S0, fig.t("*s* = 0　概率 ½", "*s* = 0, chance ½"), dx=12, dy=-10, size=14, color="now", halo=True)
    sp.label(S1, fig.t("*s* = 1　概率 ½", "*s* = 1, chance ½"), dx=12, dy=12, size=14, color="dim", halo=True)
    mid = pts[40]
    sp.label(mid, fig.t("前馈 *X*", "feedforward *X*"), dx=-10, size=14, color="now", anchor="end", middle=True,
             halo=True)
