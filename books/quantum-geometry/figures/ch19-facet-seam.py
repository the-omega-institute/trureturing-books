"""在对数容量坐标里，最小割是几张平面的下包络：d 从 2 走到 4，格点从 ad 那片越过接缝 ad = bc 进入 bc 那片。
In log-capacity coordinates the min cut is the lower envelope of affine planes: as d goes from 2 to 4,
the lattice point crosses the seam ad = bc from the ad facet into the bc facet.

The chapter's slice a = 2, b = 3, c = 2: ln QMinCut = min(ln 3 + u + w, u + z, v + w) with z = ln d is
min(ln 12, ln 2 + z, ln 6). The three lattice points d = 2, 3, 4 carry the candidate triples
(12, 4, 6), (12, 6, 6), (12, 8, 6) of the worked example (asserted).
"""

import math

from _ch19 import envelope, qmincut

SIZE = (500, 330)
ALT = {
    "zh": "坐标图：横轴是 ln d，标出 d = 2、3、4；纵轴是对数容量，标出 4、6、8、12。"
          "三条直线是三道割的对数容量：顶上灰色的水平线 ln 3ac = ln 12，蓝色的斜线 ln ad，橙色的水平线 ln bc = ln 6。"
          "最小割走它们的下包络：先沿蓝色斜线上升，在 d = 3 处的竖直虚线（接缝 ad = bc）折向橙色水平线。"
          "包络上三个格点 d = 2、3、4 分别标着候选割 (12, 4, 6)、(12, 6, 6)、(12, 8, 6)，最小割依次是 4、6、6。",
    "en": "A plot: the horizontal axis is ln d, marked d = 2, 3, 4; the vertical axis is log capacity, marked 4, 6, 8, 12. "
          "Three straight lines are the log capacities of the three cuts: a grey horizontal line at the top, ln 3ac = ln 12; "
          "a blue sloping line, ln ad; an orange horizontal line, ln bc = ln 6. The min cut follows their lower envelope: "
          "it climbs along the blue line and at d = 3, the dashed vertical seam ad = bc, turns onto the orange line. Three "
          "lattice points on the envelope, d = 2, 3, 4, are labelled with the candidate cuts (12, 4, 6), (12, 6, 6), "
          "(12, 8, 6); the min cut is 4, 6, 6.",
}

A, B, C = 2, 3, 2


def draw(fig):
    t = fig.t
    triples = [(3 * A * C, A * d, B * C) for d in (2, 3, 4)]
    assert triples == [(12, 4, 6), (12, 6, 6), (12, 8, 6)]
    assert [qmincut(A, B, C, d) for d in (2, 3, 4)] == [4, 6, 6]
    for d in (2, 3, 4):
        assert abs(math.exp(envelope(d)) - qmincut(A, B, C, d)) < 1e-9
        assert C * C + d * d <= 3 * C * d                   # (c, d) stays in the cone

    ax = fig.axes(70, 34, 380, 236, (math.log(1.45), math.log(5.2)), (math.log(2.8), math.log(15)))
    ax.grid(ys=[math.log(v) for v in (4, 6, 8, 12)])
    ax.xaxis(ticks=[math.log(d) for d in (2, 3, 4)], labels=["*d* = 2", "*d* = 3", "*d* = 4"], size=14)
    ax.yaxis(ticks=[math.log(v) for v in (4, 6, 8, 12)], labels=["4", "6", "8", "12"], size=14)
    fig.text(14, 24, t("对数容量", "log capacity"), size=14, color="dim")

    zl, zr = ax.xr
    ax.plot(lambda z: math.log(12), color="dim", width=1.8)
    ax.plot(lambda z: math.log(A) + z, color="blue", width=1.6, dash="5 4")
    ax.plot(lambda z: math.log(B * C), color="orange", width=1.6, dash="5 4")
    seam = math.log(3)
    ax.path([(zl, math.log(A) + zl), (seam, math.log(6))], color="blue", width=3.4)
    ax.path([(seam, math.log(6)), (zr, math.log(6))], color="orange", width=3.4)
    ax.vline(seam, "dim", 1.4, dash="3 4")

    ax.text(zr, math.log(12), "ln 3*ac*", dx=-4, dy=-10, size=14, color="dim", anchor="end")
    ax.text(math.log(4.6), math.log(A * 4.6), "ln *ad*", dx=-10, dy=-4, size=14, color="blue", anchor="end")
    ax.text(zr, math.log(6), "ln *bc*", dx=-4, dy=20, size=14, color="orange", anchor="end")
    ax.text(seam, math.log(14), t("接缝 *ad* = *bc*", "seam *ad* = *bc*"), dx=6, size=14, color="dim")

    for d, tri in zip((2, 3, 4), triples):
        x, y = ax.pt(math.log(d), envelope(d))
        fig.dot(x, y, 5.4, "ink", ring="bg")
        lab = f"({tri[0]}, {tri[1]}, {tri[2]})"
        fig.text(x, y + 24 if d == 2 else y - 14, lab, size=14, color="ink", anchor="middle", halo=True)
