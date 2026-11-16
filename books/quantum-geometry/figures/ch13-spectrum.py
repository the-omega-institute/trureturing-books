"""CHSH 算子的谱只随面积参数 N 走：四个点 ±√(4 ± N)（第十三章 §CHSH 平方）。
The CHSH spectrum follows the area parameter N alone: four points ±√(4 ± N) (chapter 13, the CHSH square).

The four magenta branches are ±√(4 + N) and ±√(4 − N) for 0 < N < 4, the range of the four-point
proposition. The five rows of the chapter's angle table sit at N = 4 sin α sin β = 0, 1, 2, 3, 4; their
spectra are asserted. The ends N = 0 (±2, from the commuting corollary and λ² = 4) and N = 4 (±2√2 and 0,
by hand from the Landau identity) are drawn as hollow points.
"""

import math

SIZE = (440, 340)
ALT = {
    "zh": "横轴是面积参数 N，从 0 到 4；纵轴是 CHSH 算子的特征值，从 −3 到 3。四条品红的曲线是 ±√(4 + N) 与 ±√(4 − N)："
          "N = 0 时四条汇成 ±2，N 增大时外侧两条向 ±2√2 张开、内侧两条向 0 收拢。暗色虚线标出 ±2。"
          "N = 1、2、3 处各有四个品红的点，对应表中三行的谱，N = 3 处标着 √7 与 1；两端 N = 0 与 N = 4 是空心点，"
          "N = 4 处标着 2√2。",
    "en": "The horizontal axis is the area parameter N from 0 to 4; the vertical axis is the eigenvalue of the CHSH operator "
          "from −3 to 3. Four magenta curves are ±√(4 + N) and ±√(4 − N): at N = 0 they meet at ±2; as N grows the outer "
          "two open towards ±2√2 and the inner two close towards 0. Dim dashed lines mark ±2. At N = 1, 2 and 3 four magenta "
          "points give the spectra of three rows of the table, with √7 and 1 labelled at N = 3; the ends N = 0 and N = 4 are "
          "hollow points, with 2√2 labelled at N = 4.",
}

TABLE = [  # (α, β, N, spectrum) from the chapter's example
    (0, 60, 0, [2, -2]),
    (30, 30, 1, [math.sqrt(5), -math.sqrt(5), math.sqrt(3), -math.sqrt(3)]),
    (60, 60, 3, [math.sqrt(7), -math.sqrt(7), 1, -1]),
    (90, 30, 2, [math.sqrt(6), -math.sqrt(6), math.sqrt(2), -math.sqrt(2)]),
    (90, 90, 4, [2 * math.sqrt(2), -2 * math.sqrt(2), 0]),
]


def branches(n):
    return [math.sqrt(4 + n), -math.sqrt(4 + n), math.sqrt(4 - n), -math.sqrt(4 - n)]


def draw(fig):
    t = fig.t
    ax = fig.axes(50, 20, 330, 258, (0, 4), (-3.1, 3.1))
    ax.grid(ys=[-2, 2], color="dim", width=1.2, dash="5 4")
    ax.hline(0, "faint", 1.0)
    ax.xaxis(at=-3.1, ticks=[0, 1, 2, 3, 4], labels=["0", "1", "2", "3", "4"], size=13)
    ax.yaxis(at=0, ticks=[-2, 0, 2], labels=["−2", "0", "2"], size=13)
    fig.text(ax.X(4) + 10, ax.Y(-3.1) + 5, "*N*", size=15, color="dim")

    for k in range(4):
        ax.plot(lambda n, k=k: branches(n)[k], 0.0, 4.0, n=200, color="area", width=2.2)

    for a, b, n, spec in TABLE:
        assert abs(4 * math.sin(math.radians(a)) * math.sin(math.radians(b)) - n) < 1e-12
        assert sorted(set(round(v, 12) for v in branches(n))) == sorted(set(round(v, 12) for v in spec))
        for v in set(round(v, 12) for v in spec):
            if 0 < n < 4:
                ax.points([(n, v)], color="area", r=4.4, ring="bg")
            else:
                fig.circle(ax.X(n), ax.Y(v), 4.6, color="area", fill="bg", width=1.8)

    ax.text(3, math.sqrt(7), "√7", dx=-6, dy=-12, size=14, color="area", anchor="end")
    ax.text(3, 1, "1", dx=-8, dy=-8, size=14, color="area", anchor="end")
    ax.text(4, 2 * math.sqrt(2), "2√2", dx=12, dy=5, size=14, color="area")
    ax.text(4, 0, "0", dx=12, dy=5, size=14, color="area")
    fig.text(ax.X(2), ax.Y(-3.1) + 46, t("面积参数 *N* = 4 sin *α* sin *β*", "area parameter *N* = 4 sin *α* sin *β*"),
             size=13, color="dim", anchor="middle")
