"""沿临界线 σ = ½ 走，|ζ| 一次次落到零：0 < t ≤ 50 里有十个零点（第二十二章 §22.4，数值结果）。
Walking up the critical line σ = ½, |ζ| keeps dropping to zero: ten zeros with 0 < t ≤ 50 (chapter 22, §22.4,
a numerical result).

|ζ(½ + it)| is computed by Euler–Maclaurin summation (_ch22.zeta). The ten literature heights are checked to
be zeros, and the curve is checked to have no other near-zero between them; the first sits between t = 14
and t = 15, where the text reports the sign change of ξ.
"""

from _ch22 import ZEROS, check_zeta, zeta

SIZE = (500, 286)
ALT = {
    "zh": "坐标图，横轴是 t（0 到 50），纵轴是 |ζ(½ + it)|（0 到 4）。墨色曲线从 t = 0 处的 1.46 起伏前进，十次落到横轴上，"
          "落点是十个品红的点，第一个标着 14.13。右上角的红色标签写着：所有非平凡零点都在这条线上吗？开放问题。",
    "en": "A plot with t across (0 to 50) and |ζ(½ + it)| up (0 to 4). The ink curve starts at 1.46 at t = 0 and rises and "
          "falls, touching the axis ten times; the touch points are ten magenta dots, the first labelled 14.13. A red tag "
          "in the top right asks whether every nontrivial zero lies on this line: an open problem.",
}


def draw(fig):
    t = fig.t
    check_zeta()
    n = 1000
    samples = [(50 * i / n, abs(zeta(0.5 + 1j * 50 * i / n))) for i in range(n + 1)]
    assert abs(samples[0][1] - 1.4603545) < 1e-6
    assert max(v for _, v in samples) < 4
    # local minima below 0.05 occur only next to the listed zeros
    mins = [x for (x, v), (_, a), (_, b) in zip(samples[1:-1], samples, samples[2:]) if v < a and v < b and v < 0.05]
    assert len(mins) == len(ZEROS) and all(abs(m - z) < 0.06 for m, z in zip(mins, ZEROS))
    assert 14 < ZEROS[0] < 15

    ax = fig.axes(46, 46, 424, 196, (0, 50), (0, 4))
    ax.grid(ys=[1, 2, 3])
    ax.xaxis(ticks=[0, 10, 20, 30, 40, 50], label="*t*", size=14)
    ax.yaxis(ticks=[0, 1, 2, 3, 4], size=14)
    ax.path(samples, "ink", 2.2)
    for z in ZEROS:
        x, y = ax.pt(z, 0)
        fig.dot(x, y, 4.4, "area", ring="bg")
    ax.text(ZEROS[0], 0, "14.13", dx=-9, dy=-8, size=14, color="area", anchor="end", halo=True)
    ax.text(0, 4, "|ζ(½ + *it*)|", dx=8, dy=4, size=14)
    fig.chip(470, 26, t("全都在这条线上？开放问题", "all zeros on this line? open"), "open", size=14, anchor="end")
