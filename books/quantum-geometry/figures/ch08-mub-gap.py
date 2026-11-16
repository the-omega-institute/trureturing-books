"""无偏的捏合把熵一直推到 ln 2：多出的那一截恰好是 D(ρ‖σ) = ln 2 − S(ρ)（第八章 §8.1，定理 thm-dual-account-full）。
An unbiased pinch pushes the entropy all the way to ln 2; the extra piece is exactly D(ρ‖σ) = ln 2 − S(ρ)
(chapter 8, §8.1).

d = 2: ρ is diagonal in Z with Bloch height r, so S(ρ) = h((1 + r)/2); pinching in X sends it to
σ = I/2 with S(σ) = ln 2. The relative entropy D(ρ‖I/2) is computed from its definition and asserted
equal to ln 2 − S(ρ) at sample points; the pure state r = 1 gives ln 2.
"""

import math

from _ch08 import LN2, h

SIZE = (430, 290)
ALT = {
    "zh": "横轴是 Z 基对角态 ρ 在竖轴上的高度 r，从 −1 到 1；纵轴是熵（奈特）。顶上一条虚线是 ln 2，即 X 基捏合后的 S(σ)。"
          "下面的拱形曲线是 S(ρ)，在 r = 0 处碰到 ln 2，在两端降到 0。曲线与虚线之间的品红区域就是 D(ρ‖σ) = ln 2 − S(ρ)。"
          "右端 r = 1 处的琥珀色点是纯态 |0⟩，那里品红的一截是整整 ln 2。",
    "en": "The horizontal axis is the height r of a Z-diagonal state ρ on the vertical axis, from −1 to 1; the vertical axis is "
          "entropy in nats. A dashed line at the top marks ln 2, the entropy S(σ) after pinching in the X basis. The arch below "
          "is S(ρ), touching ln 2 at r = 0 and falling to 0 at both ends. The magenta region between the arch and the dashed "
          "line is D(ρ‖σ) = ln 2 − S(ρ). An amber point at r = 1 is the pure state |0⟩, where the magenta piece is the whole ln 2.",
}


def S(r):
    return h((1 + r) / 2)


def D_to_centre(r):
    """D(ρ ‖ I/2) = Tr ρ (ln ρ − ln I/2) for ρ = diag((1 + r)/2, (1 − r)/2)."""
    return sum(p * (math.log(p) - math.log(0.5)) for p in ((1 + r) / 2, (1 - r) / 2) if p > 0)


def draw(fig):
    t = fig.t
    for r in (-1.0, -0.4, 0.0, 0.3, 0.9, 1.0):
        assert abs(D_to_centre(r) - (LN2 - S(r))) < 1e-12        # conclusion 3–4 of the theorem, d = 2
    ax = fig.axes(66, 34, 340, 196, (-1, 1), (0, 0.86))
    pts = [(-1 + 2 * i / 200, S(-1 + 2 * i / 200)) for i in range(201)]
    top = [(x, LN2) for x, _ in pts]
    ax.cv.polygon([ax.pt(x, y) for x, y in pts] + [ax.pt(x, y) for x, y in reversed(top)], "area", fill_opacity=0.2)
    ax.hline(LN2, "ink", 1.4, dash="5 4")
    ax.path(pts, "ink", 2.4)
    ax.xaxis(ticks=[-1, 0, 1], labels=["−1", "0", "1"], size=13, label=t("ρ 的高度 *r*", "height *r* of ρ"))
    ax.yaxis(ticks=[0, LN2], labels=["0", "ln 2"], size=13)
    # the pure state |0⟩: the whole ln 2
    ax.points([(1, 0)], color="now", r=5.6, ring="bg")
    ax.cv.line(ax.X(1), ax.Y(0), ax.X(1), ax.Y(LN2), "area", 4, cap="round")
    ax.text(1, 0, "|0⟩", dx=-10, dy=-6, size=14, color="now", anchor="end")
    ax.text(0, S(0.0), "*S*(*ρ*)", dx=0, dy=24, size=14, color="ink", anchor="middle")
    ax.text(-0.62, LN2, "*D* = ln 2 − *S*(*ρ*)", dy=-12, size=14, color="area", anchor="middle")
    ax.cv.arrow(ax.X(-0.62), ax.Y(LN2) - 8, ax.X(-0.62), ax.Y((LN2 + S(-0.62)) / 2), "area", 1.4, head=7)
    ax.text(1, LN2, t("捏合后 *S*(*σ*) = ln 2", "after the pinch *S*(*σ*) = ln 2"), dx=0, dy=-12, size=13, color="dim",
            anchor="end")
