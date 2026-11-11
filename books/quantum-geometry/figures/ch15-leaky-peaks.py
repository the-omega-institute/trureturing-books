"""周期不整除寄存器时，峰变宽、两旁漏出：Q = 16、r = 3 的采样分布。
When the period does not divide the register, the peaks spread and leak: the sampling distribution for Q = 16, r = 3.

The period state is the uniform superposition of x ∈ {0, 3, 6, 9, 12, 15}; P(k) = |α_k|² with
α_k = (1/√(6·16)) Σ_x exp(2πi k x / 16). The dashed lines are the ideal frequencies 16 s / 3, s = 0, 1, 2.
"""

import cmath
import math

SIZE = (500, 270)
ALT = {
    "zh": "Q = 16、周期 r = 3 时 16 个频率上的采样概率（数值）。三条虚线标出理想位置 0、16/3、32/3，后两条落在整数之间。"
          "青色的柱在 0 处最高，在 5 与 11 处各有一根高柱，紧挨着 16/3 与 32/3；除 k = 8 外，其余频率上也都有矮柱，不再精确为零。",
    "en": "Sampling probabilities over 16 frequencies for Q = 16 and period r = 3 (numerical). Three dashed lines mark the ideal "
          "positions 0, 16/3 and 32/3; the last two fall between integers. The cyan bar is tallest at 0, with a tall bar at 5 "
          "and at 11, right next to 16/3 and 32/3; apart from k = 8, every other frequency still carries a short bar instead "
          "of exactly zero.",
}


def draw(fig):
    t = fig.t
    Q, r = 16, 3
    xs = list(range(0, Q, r))
    assert xs == [0, 3, 6, 9, 12, 15]
    norm = 1 / math.sqrt(len(xs) * Q)
    prob = [abs(norm * sum(cmath.exp(2j * math.pi * k * x / Q) for x in xs)) ** 2 for k in range(Q)]
    assert abs(sum(prob) - 1) < 1e-12
    assert abs(prob[0] - 6 / 16) < 1e-12
    zero = [k for k in range(Q) if prob[k] < 1e-12]
    assert zero == [8]                           # every other frequency leaks a little

    ax = fig.axes(56, 40, 410, 180, (-0.7, 15.7), (0, 0.4))
    ax.grid(ys=[0.1, 0.2, 0.3], color="faint")
    for s in range(r):
        f = Q * s / r
        ax.vline(f, "dim", 1.3, dash="5 4")
    ax.text(Q / r, 0.4, "16/3", dy=-8, size=13, color="dim", anchor="middle")
    ax.text(2 * Q / r, 0.4, "32/3", dy=-8, size=13, color="dim", anchor="middle")
    for k in range(Q):
        fig.line(ax.X(k), ax.Y(0), ax.X(k), ax.Y(prob[k]), "line", 9, cap="butt")
    ax.xaxis(ticks=[0, 4, 5, 8, 11, 12, 15], size=13)
    ax.yaxis(ticks=[0, 0.2, 0.4], labels=["0", "0.2", "0.4"], size=13)
    fig.text(261, 262, t("频率 *k*（*Q* = 16，*r* = 3）", "frequency *k* (*Q* = 16, *r* = 3)"), size=13, color="dim",
             anchor="middle")
