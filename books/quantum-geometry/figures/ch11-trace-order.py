"""一阶漂移全在虚部：三段脉冲核乘积的迹，虚部按 t 长，实部偏差按 t² 长，且在命题的界之下（第十一章 §有序脉冲与误差界）。
The first-order drift is all imaginary: for three ordered pulse kernels the imaginary part of the trace grows like t,
the deviation of the real part like t², under the proposition's bound (chapter 11).

A, B, C are three fixed real symmetric 2 × 2 matrices of Frobenius norm 1 (L = 1, see _ch11.py). Both axes are
logarithmic over t ∈ [0.01, 1]. The bound (5/4)L⁵t² is the green line (prop-ordered-pulse-error); the two curves are
computed from the series of pulse0, and the script asserts that the real deviation stays under the bound at every
plotted t and that the slopes are 1 and 2.
"""

import math

from _ch11 import TRACE_ABC, bound, ordered_trace

SIZE = (440, 300)
ALT = {
    "zh": "双对数坐标，横轴是步长 t，从 0.01 到 1。三条线：品红的线是三段脉冲核乘积的迹的虚部，斜率为 1，按 t 增长；"
          "青色的线是迹的实部与 Tr(ABC) 的偏差，斜率为 2，按 t² 增长，在小 t 处比品红的线低得多；"
          "绿色的线是命题给出的界 (5/4)L⁵t²，青色的线始终在它下方。这里取了三个弗罗贝尼乌斯范数为 1 的实对称 2×2 矩阵。",
    "en": "Log-log axes, with the step t from 0.01 to 1 on the horizontal axis. Three lines: the magenta line is the "
          "imaginary part of the trace of the three ordered pulse kernels, with slope 1, growing like t; the cyan line is the "
          "deviation of the real part from Tr(ABC), with slope 2, growing like t² and far below the magenta line at small t; "
          "the green line is the proposition's bound (5/4)L⁵t², and the cyan line stays below it throughout. The three "
          "matrices are real symmetric 2 × 2 matrices of Frobenius norm 1.",
}

LO, HI = -2.0, 0.0           # log10 t
YLO, YHI = -5.0, 0.5         # log10 of the plotted magnitudes


def im_part(t):
    return abs(ordered_trace(t).imag)


def re_dev(t):
    return abs(ordered_trace(t).real - TRACE_ABC)


def slope(f, a, b):
    return (math.log10(f(b)) - math.log10(f(a))) / (math.log10(b) - math.log10(a))


assert abs(slope(im_part, 0.01, 0.02) - 1) < 0.02
assert abs(slope(re_dev, 0.01, 0.02) - 2) < 0.02
for _k in range(81):
    _t = 10 ** (LO + (HI - LO) * _k / 80)
    assert re_dev(_t) <= bound(_t)
    assert re_dev(_t) < im_part(_t)


def draw(fig):
    ax = fig.axes(70, 28, 340, 220, (LO, HI), (YLO, YHI))
    ax.grid(xs=[-2, -1, 0], ys=[-5, -4, -3, -2, -1, 0])
    ax.xaxis(ticks=[-2, -1, 0], labels=["0.01", "0.1", "1"], size=13)
    ax.yaxis(ticks=[-4, -2, 0], labels=["10^{−4}", "10^{−2}", "1"], size=13)
    fig.text(ax.x + ax.w / 2, 290, fig.t("步长 *t*", "step *t*"), size=14, color="dim", anchor="middle")

    def curve(f):
        return [(LO + (HI - LO) * k / 120, math.log10(f(10 ** (LO + (HI - LO) * k / 120)))) for k in range(121)]
    ax.path(curve(bound), "lean", 2.0, dash="6 4")
    ax.path(curve(im_part), "area", 2.6)
    ax.path(curve(re_dev), "line", 2.6)

    ax.text(-0.85, math.log10(im_part(10 ** -0.85)), fig.t("虚部 ∝ *t*", "imaginary part ∝ *t*"), dy=-10, size=14,
            color="area", anchor="end", halo=True)
    ax.text(-0.95, math.log10(re_dev(10 ** -0.95)), fig.t("实部偏差 ∝ *t*^{2}", "real deviation ∝ *t*^{2}"), dx=12,
            dy=18, size=14, color="line", halo=True)
    ax.text(-1.3, math.log10(bound(10 ** -1.3)), fig.t("界 (5/4)*L*^{5}*t*^{2}", "bound (5/4)*L*^{5}*t*^{2}"), dx=-10,
            dy=-8, size=13, color="lean", anchor="end", halo=True)
