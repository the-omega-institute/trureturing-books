"""快度 η = ln 2 落在单位双曲线上的一个有理点：(t, x) = (cosh η, sinh η) = (5/4, 3/4)。
Rapidity η = ln 2 lands on a rational point of the unit hyperbola: (t, x) = (cosh η, sinh η) = (5/4, 3/4).

The unit hyperbola t² − x² = 1 is drawn from its formula; the point is (cosh ln 2, sinh ln 2), its two
legs have lengths 3/4 and 5/4 (asserted), so (5/4)² − (3/4)² = 1, and the ray from the origin through
it has x/t = 3/5 = β.
"""

import math

from _ch17 import Spacetime, q

SIZE = (480, 320)
ALT = {
    "zh": "时空图，x 向右、t 向上。青色的曲线是单位双曲线 t² − x² = 1，两条白色虚线是光锥 t = ±x。"
          "琥珀色的点是 η = ln 2 时的 (t, x) = (cosh η, sinh η) = (5/4, 3/4)：从它向 t 轴的水平虚线长 3/4，向 x 轴的竖直虚线长 5/4，"
          "两者平方差正好是 1。从原点射向这个点的琥珀色射线每走 5 个时间单位横移 3 个，即 β = 3/5。",
    "en": "A spacetime diagram with x to the right and t up. The cyan curve is the unit hyperbola t² − x² = 1; the two white "
          "dashed lines are the light cone t = ±x. The amber point is (t, x) = (cosh η, sinh η) = (5/4, 3/4) for η = ln 2: the dashed "
          "horizontal leg to the t axis is 3/4 long, the dashed vertical leg to the x axis is 5/4 long, and their squares differ "
          "by exactly 1. The amber ray from the origin through the point moves 3 across for every 5 up, so β = 3/5.",
}


def draw(fig):
    t = fig.t
    st = Spacetime(fig, 150, 286, 168)
    eta = math.log(2)
    ch, sh = math.cosh(eta), math.sinh(eta)
    assert abs(ch - 5 / 4) < 1e-12 and abs(sh - 3 / 4) < 1e-12
    assert abs(q(sh, ch) - 1) < 1e-12                      # the identity of the chapter's first theorem
    assert abs(sh / ch - 3 / 5) < 1e-12                    # β = tanh η

    st.axes(-0.75, 1.85, -0.04, 1.58)
    st.line((0, 0), (1.5, 1.5), "ink", 1.3, dash="5 4")
    st.line((0, 0), (-0.8, 0.8), "ink", 1.3, dash="5 4")
    st.hyperbola(1, -0.62, 0.98, "line", 2.8)

    # the ray x/t = β through the point, and the two legs
    st.line((0, 0), (sh, ch), "now", 1.8)
    st.line((sh, ch), (sh, 0), "dim", 1.3, dash="4 3")
    st.line((sh, ch), (0, ch), "dim", 1.3, dash="4 3")
    st.dot(sh, ch, 5, "now", ring="bg")

    p = st.P(sh / 2, ch)
    fig.text(p[0], p[1] - 9, "sinh *η* = 3/4", size=14, color="dim", anchor="middle")
    p = st.P(sh, ch * 0.42)
    fig.text(p[0] + 9, p[1], "cosh *η* = 5/4", size=14, color="dim", middle=True, halo=True)
    p = st.P(sh, ch)
    fig.text(p[0] + 13, p[1] + 20, "*η* = ln 2", size=14, color="now")
    p = st.P(-0.62, math.sqrt(1 + 0.62 ** 2))
    fig.text(p[0], p[1] - 12, "*t*^{2} − *x*^{2} = 1", size=14, color="line", anchor="middle")
    p = st.P(1.3, 1.3)
    fig.text(p[0] + 10, p[1] + 10, t("光锥", "light cone"), size=13, color="dim")
    p = st.P(sh * 0.62, ch * 0.62)
    fig.text(p[0] - 10, p[1], "*β* = 3/5", size=14, color="now", anchor="end", middle=True, halo=True)
