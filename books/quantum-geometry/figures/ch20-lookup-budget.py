"""预存查找表有 2ⁿ 行，很快就超出任何多项式预算：n = 10 起 2ⁿ 已大过 n³，此后差距越拉越大。
A precomputed lookup table has 2ⁿ rows and soon outgrows any polynomial budget: from n = 10 on, 2ⁿ
already exceeds n³, and the gap only widens.

Both curves are exact (log₂ of 2ⁿ and of n³); n³ stands for an arbitrary polynomial budget, as in the
chapter's remark on P/poly. The upper real crossing is near n = 9.94; the script checks the
integer threshold n = 10 marked by the dashed line.
"""

import math

SIZE = (500, 320)
ALT = {
    "zh": "坐标图：横轴是输入长度 n，从 1 到 24；纵轴是大小，按对数刻度标出 1、2⁸、2¹⁶、2²⁴。"
          "品红的直线是查找表的行数 2ⁿ，青色的曲线是多项式预算 n³。两者在 n ≈ 9.94 处交叉；竖直虚线标出 n = 10，此后的整数 n 均有 2ⁿ > n³，品红线在上方越走越远。"
          "左上一枚紫色标签：文献；右上一枚红色标签：P ≠ NP 开放。",
    "en": "A plot: across, the input length n from 1 to 24; up, size on a log scale marked 1, 2⁸, 2¹⁶, 2²⁴. The magenta "
          "straight line is the number of rows of the lookup table, 2ⁿ; the cyan curve is a polynomial budget n³. They cross "
          "near n ≈ 9.94; the dashed line marks n = 10, from which onward 2ⁿ > n³ for integer n, and the magenta line pulls ever further ahead. A violet tag at the top left: "
          "literature; a red tag at the top right: P ≠ NP open.",
}


def draw(fig):
    t = fig.t
    cross = next(n for n in range(2, 40) if 2 ** n > n ** 3)
    assert cross == 10 and all(2 ** n > n ** 3 for n in range(10, 60))

    ax = fig.axes(76, 58, 384, 200, (1, 24), (0, 25))
    ax.grid(ys=[8, 16, 24])
    ax.xaxis(ticks=[1, 5, 10, 15, 20, 24], label="*n*", size=14)
    ax.yaxis(ticks=[0, 8, 16, 24], labels=["1", "2^{8}", "2^{16}", "2^{24}"], size=14)
    ax.plot(lambda n: n, color="area", width=3.0)
    ax.plot(lambda n: 3 * math.log2(n), color="line", width=3.0)
    ax.vline(cross, "dim", 1.3, dash="3 4")
    x, y = ax.pt(cross, cross)
    fig.dot(x, y, 4.6, "ink", ring="bg")

    ax.text(19.5, 19.5, t("查找表 2^{*n*} 行", "table: 2^{*n*} rows"), dx=-8, dy=-6, size=14, color="area", anchor="end")
    ax.text(24, 3 * math.log2(24), t("预算 *n*^{3}", "budget *n*^{3}"), dx=-2, dy=22, size=14, color="line", anchor="end")
    ax.text(cross, 1.2, "*n* = 10", dx=6, size=14, color="dim")

    fig.chip(20, 30, t("文献", "literature"), "argued", size=14)
    fig.chip(SIZE[0] - 20, 30, t("P ≠ NP：开放", "P ≠ NP: OPEN"), "open", size=14, anchor="end")
