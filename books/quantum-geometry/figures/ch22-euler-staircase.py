"""有限个素数的欧拉乘积一级级爬向 ζ(2)，每加一个素数缺口就缩一截，但对每个有限的 K 都还留着（第二十二章 §22.2）。
The Euler product over finitely many primes climbs towards ζ(2) step by step; each new prime shrinks the gap,
but for every finite K some gap remains (chapter 22, §22.2).

Numerical: P_K(2) = ∏_{k≤K} (1 − p_k^{-2})^{-1} for K = 1 … 25 (primes up to 97). Checked against the
chapter: P_3 = 25/16, ζ(2) − P_3 ≈ 0.0824, ζ(2) − P_11 ≈ 0.0102, ζ(2) − P_25 ≈ 0.0030.
"""

import math
from fractions import Fraction

from _ch22 import euler_product, primes

SIZE = (500, 300)
ALT = {
    "zh": "坐标图，横轴是清单里的素数个数 K（1 到 25），纵轴从 1.3 到 1.66。墨色的水平线是 ζ(2) = π²/6 ≈ 1.6449。青色的阶梯是前 K 个"
          "素数的欧拉乘积在 s = 2 处的值：只有 2 时是 4/3，加上 3、5 到 25/16 = 1.5625，此后台阶越来越矮。阶梯与墨色线"
          "之间的缝涂成品红：到 K = 25（到 97）只剩 0.0030，但始终没有合上。",
    "en": "A plot with the number K of listed primes across (1 to 25) and values from 1.3 to 1.66 up. The horizontal ink line is "
          "ζ(2) = π²/6 ≈ 1.6449. The cyan staircase is the Euler product over the first K primes at s = 2: with 2 alone it is 4/3, "
          "and it reaches 25/16 = 1.5625 with 3 and 5, and the steps grow ever shorter. The gap "
          "between the staircase and the ink line is shaded magenta: at K = 25 (primes up "
          "to 97) it is only 0.0030, and it never closes.",
}


def draw(fig):
    t = fig.t
    ps = primes(97)
    assert len(ps) == 25
    z2 = math.pi ** 2 / 6
    vals = [euler_product(ps[:k], 2) for k in range(26)]
    exact3 = Fraction(1)
    for p in (2, 3, 5):
        exact3 /= 1 - Fraction(1, p * p)
    assert exact3 == Fraction(25, 16) and abs(vals[3] - 1.5625) < 1e-12
    assert round(z2 - vals[3], 4) == 0.0824 and round(z2 - vals[11], 4) == 0.0102 and round(z2 - vals[25], 4) == 0.0030
    assert all(a < b < z2 for a, b in zip(vals, vals[1:]))

    ax = fig.axes(60, 34, 400, 212, (1, 26), (1.3, 1.66))
    ax.grid(ys=[1.4, 1.5, 1.6])
    ax.xaxis(ticks=[1, 3, 5, 10, 15, 20, 25], label=t("清单里的素数个数 *K*", "number of listed primes *K*"), size=14)
    ax.yaxis(ticks=[1.3, 1.4, 1.5, 1.6], labels=["1.3", "1.4", "1.5", "1.6"], size=14)
    stair = []
    for k in range(1, 26):
        stair += [(k, vals[k]), (k + 1, vals[k])]
    gap = [ax.pt(x, y) for x, y in stair] + [ax.pt(26, z2), ax.pt(1, z2)]
    fig.polygon(gap, "area", fill_opacity=0.22)
    ax.hline(z2, "ink", 2.2)
    ax.path(stair, "line", 2.4)
    ax.text(26, z2, "ζ(2) = π²/6", dx=-4, dy=-9, size=14, anchor="end")
    ax.text(3.15, vals[3], "25/16", dy=17, size=14, color="line")
    ax.text(24.2, z2 - 0.045, t("还差 0.0030", "still 0.0030 short"), size=14, color="area", anchor="end", halo=True)
    fig.arrow(ax.X(24.4), ax.Y(z2 - 0.038), ax.X(25.5), ax.Y(z2 - 0.004), "area", 1.3, head=6)
