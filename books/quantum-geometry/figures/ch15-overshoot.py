"""整数步数只能逼近目标：N = 8 时成功概率 sin²((2n + 1)θ) 在 n = 2 停在 121/128，到不了 1。
Whole steps only come close: for N = 8 the success probability sin²((2n + 1)θ) stops at 121/128 at n = 2.

θ = arcsin(1/√8). The dots are the whole-step values; the thin curve is the same formula with n
continuous, drawn only to show where 1 would be reached (n ≈ 1.67, not a whole number).
"""

import math

from _ch15 import grover_theta

SIZE = (500, 290)
ALT = {
    "zh": "横轴是 Grover 迭代步数 n，从 0 到 4；纵轴是成功概率，从 0 到 1。细的墨色曲线是 sin²((2n + 1)θ)（N = 8），"
          "在 n ≈ 1.67 处碰到 1，那里不是整数。整数步上的点依次是 1/8、25/32、121/128、……；琥珀色的点是最接近 1 的一步 n = 2，"
          "停在 121/128 ≈ 0.945，它与虚线 1 之间的品红缝隙是 7/128。再往下走，n = 3、4 的点又掉了下去。",
    "en": "The horizontal axis is the number of Grover steps n from 0 to 4; the vertical axis is the success probability from "
          "0 to 1. A thin ink curve is sin²((2n + 1)θ) for N = 8; it touches 1 at n ≈ 1.67, which is not a whole number. "
          "The dots on whole steps are 1/8, 25/32, 121/128, …; the amber dot is the closest step n = 2 at 121/128 ≈ 0.945, "
          "and a magenta gap of 7/128 separates it from the dashed line at 1. Further steps, n = 3 and 4, fall back down.",
}

STEPS = range(5)


def draw(fig):
    t = fig.t
    th = grover_theta(8)

    def p(n):
        return math.sin((2 * n + 1) * th) ** 2

    assert abs(p(1) - 25 / 32) < 1e-12 and abs(p(2) - 121 / 128) < 1e-12
    peak = (math.pi / (2 * th) - 1) / 2
    assert 1.6 < peak < 1.7

    ax = fig.axes(62, 34, 400, 200, (0, 4.4), (0, 1.08))
    ax.grid(ys=[0.25, 0.5, 0.75], color="faint")
    ax.hline(1.0, "dim", 1.3, dash="5 4")
    ax.plot(p, 0, 4.4, n=240, color="ink", width=1.3, opacity=0.7)
    ax.xaxis(ticks=STEPS, size=13)
    ax.yaxis(ticks=[0, 0.5, 1], labels=["0", "½", "1"], size=13)
    fig.text(262, 280, t("Grover 步数 *n*", "Grover steps *n*"), size=13, color="dim", anchor="middle")
    fig.text(62, 20, t("成功概率", "success probability"), size=13, color="dim", anchor="middle")

    best = max(STEPS, key=p)
    assert best == 2
    for n in STEPS:
        if n != best:
            ax.points([(n, p(n))], "line", r=4.6, ring="bg")
    # the gap that whole steps cannot close
    x2 = ax.X(best)
    gx, g0, g1 = x2 + 18, ax.Y(p(best)), ax.Y(1.0)
    fig.line(gx, g0, gx, g1, "area", 3.2, cap="butt")
    for gy in (g0, g1):
        fig.line(gx - 5, gy, gx + 5, gy, "area", 2.0)
    ax.points([(best, p(best))], "now", r=6.2, ring="bg")
    fig.text(x2 - 10, g0 + 24, "121/128", size=14, color="now", anchor="end", halo=True)
    fig.text(gx + 10, (g0 + g1) / 2 - 12, t("差 7/128", "short by 7/128"), size=14, color="area", halo=True)
    fig.text(ax.X(1) - 10, ax.Y(p(1)) - 12, "25/32", size=13, color="line", anchor="end", halo=True, middle=True)
    xp = ax.X(peak)
    fig.line(xp, ax.Y(1.0), xp, ax.Y(0), "faint", 1.2, dash="2 4")
    fig.text(xp, ax.Y(0) - 8, "1.67", size=13, color="dim", anchor="middle", halo=True)
