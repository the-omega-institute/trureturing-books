"""测得越勤，全程留在 |0⟩ 的概率越接近 1：缺口按 1/N 缩小（第七章 §7.3）。
The more often |0⟩ is measured, the closer the chance of staying there all the way to 1: the gap shrinks
like 1/N (chapter 7, §7.3).

P_N = [cos²(π/2N)]^N over ωT = π, against N on a log scale; the four rows of example
ex-zeno-strobe-freezing (N = 1, 4, 16, 64) are marked and asserted in _ch07; the dashed curve is the
first-order approximation 1 − π²/4N.
"""

import math

from _ch07 import ZENO_TABLE, zeno_final

SIZE = (500, 290)
ALT = {
    "zh": "横轴是测量次数 N，按对数刻度从 1 到 64；纵轴是全程留在 |0⟩ 的概率。青色的曲线是 P_N = [cos²(π/2N)]^N，"
          "四个青色的点是 N = 1、4、16、64，依次为 0、0.531、0.857、0.962。灰色虚线是近似式 1 − π²/4N，"
          "N 越大越贴近青色曲线；两条线都向顶上的 1 爬去。",
    "en": "The horizontal axis is the number of measurements N on a log scale from 1 to 64; the vertical axis is the chance "
          "of staying in |0⟩ all the way. The cyan curve is P_N = [cos²(π/2N)]^N, and four cyan points mark N = 1, 4, 16, 64 "
          "at 0, 0.531, 0.857 and 0.962. The grey dashed curve is the approximation 1 − π²/4N, which hugs the cyan curve as "
          "N grows; both climb towards 1 at the top.",
}


def draw(fig):
    t = fig.t
    ax = fig.axes(58, 30, 410, 200, (0, math.log2(64)), (0, 1))
    ax.grid(ys=[0.25, 0.5, 0.75])
    ax.hline(1, "faint", 1.2, dash="4 3")
    ax.xaxis(ticks=[0, 2, 4, 6], labels=["1", "4", "16", "64"], size=13, label=t("测量次数 *N*", "measurements *N*"))
    ax.yaxis(ticks=[0, 0.5, 1], labels=["0", "0.5", "1"], size=13)
    ax.plot(lambda u: 1 - math.pi ** 2 / (4 * 2 ** u), x0=math.log2(math.pi ** 2 / 4) + 0.01, color="dim", width=1.6,
            dash="5 4")
    ax.plot(lambda u: zeno_final(2 ** u), color="line", width=2.6, n=240)
    for n, p in ZENO_TABLE.items():
        u = math.log2(n)
        ax.points([(u, zeno_final(n))], color="line", r=5.0, ring="bg")
        label = "0" if n == 1 else f"{zeno_final(n):.3f}"
        if n == 1:
            ax.text(u, 0, label, dx=12, dy=-10, size=14, color="line")
        else:
            ax.text(u, zeno_final(n), label, dx=-10, dy=-8, size=14, color="line", anchor="end", halo=True)
    ax.text(1.6, 1 - math.pi ** 2 / (4 * 2 ** 1.6), "1 − π²/4*N*", dx=10, dy=14, size=13, color="dim")
    ax.text(0.05, 1, t("全程留在 |0⟩", "stays in |0⟩"), dy=-8, size=13, color="dim")
