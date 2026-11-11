"""第十六章地图：切比雪夫多项式、有限门字张成的多面体、精确放大的源查询阶梯。
Chapter 16 at a glance: a Chebyshev polynomial, the polytope spanned by finite gate words, and the
staircase of source queries for exact amplification.

Panel I: T₃(x) = 4x³ − 3x = cos(3 arccos x) on [−1, 1]. Panel II: the 19 points S₆ reached from the north
pole by {H, T} words of length ≤ 6 and the faces of their convex hull, which contains the centre.
Panel III: sourceQueries = 2n + 1 against 1/√p, under the bound (π/2 + 2)/√p of the chapter's corollary;
the dots are the rows p = 1/4, 1/16, 1/64 of the chapter's table.
"""

import math

from _ch16 import draw_polytope, hull_faces, queries, query_bound, reachable

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：区间 [−1, 1] 上青色的曲线 T₃(x) = 4x³ − 3x 在 −1 与 1 之间来回摆三次，灰色的直线是 T₁(x) = x。"
          "第二栏：一颗球里内接一个多面体，19 个青色顶点是从北极出发、长度不超过 6 的 {H, T} 门字的落点，平直的青色棱面包住球心，"
          "与球皮之间留着缝。第三栏：横轴 1/√p，青色的阶梯是源查询次数 2n + 1，始终在绿色的上界曲线 (π/2 + 2)/√p 之下；"
          "三个点标出 3、7、13。",
    "en": "Three panels. Panel I: on [−1, 1] the cyan curve T₃(x) = 4x³ − 3x swings three times between −1 and 1; the grey "
          "line is T₁(x) = x. Panel II: a polytope inscribed in a ball; its 19 cyan vertices are where {H, T} words of length "
          "at most 6 take the north pole, and its flat cyan faces enclose the centre, leaving gaps below the shell. Panel III: "
          "against 1/√p, the cyan staircase of source queries 2n + 1 stays under the green bound curve (π/2 + 2)/√p; three "
          "dots mark 3, 7 and 13.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)

    # ---- I: the Chebyshev polynomial T₃
    title(one, "I　切比雪夫多项式", "I  a Chebyshev polynomial")
    ax = one.axes(30, 58, 176, 176, (-1, 1), (-1, 1))
    ax.grid(xs=[-0.5, 0, 0.5], ys=[-0.5, 0, 0.5])
    ax.frame("faint")
    for x in (-1, -0.5, 0, 0.5, 1):
        assert abs((4 * x ** 3 - 3 * x) - math.cos(3 * math.acos(x))) < 1e-12
    assert 4 * 0.5 ** 3 - 3 * 0.5 == -1          # T₃(½) = −1, the chapter's worked example
    ax.plot(lambda x: x, color="dim", width=1.4)
    ax.plot(lambda x: 4 * x ** 3 - 3 * x, color="line", width=2.8)
    ax.text(1, 1, "*T*_{3}", dx=-4, dy=-10, size=15, color="line", anchor="end")
    ax.text(0.62, 0.62, "*T*_{1}", dx=10, dy=16, size=13, color="dim")
    for v, s in ((-1, "−1"), (1, "1")):
        ax.text(v, -1, s, dy=18, size=13, color="dim", anchor="middle")
    ax.text(0, -1, "*x*", dy=18, size=13, color="dim", anchor="middle")

    # ---- II: the gate-word polytope P₆
    title(two, "II　有限门字围成的多面体", "II  the gate-word polytope")
    pts = reachable(6)
    assert len(pts) == 19 and [len(reachable(L)) for L in range(4)] == [1, 2, 3, 5]
    faces = hull_faces(pts)
    assert min(d for _, d, _ in faces) > 0      # the centre lies inside P₆
    sp = two.sphere(118, 146, 92)
    sp.outline("dim", 1.5, fill=None)
    draw_polytope(sp, pts, faces)
    sp.dot((0, 0, 0), "dim", 2.4)
    two.text(118, 268, two.t("*L* ≤ 6：19 个落点", "*L* ≤ 6: 19 points"), size=13, color="dim", anchor="middle")

    # ---- III: exact source queries against the bound
    title(three, "III　源查询阶梯", "III  source queries")
    ax = three.axes(38, 50, 180, 180, (1, 8.6), (0, 32))
    ax.grid(ys=[10, 20, 30])
    ax.plot(lambda s: query_bound(1 / s ** 2), color="lean", width=2.2)
    steps = []
    for i in range(1201):
        s = 1 + 7.6 * i / 1200
        q = queries(1 / s ** 2)[1]
        if steps and steps[-1][1] != q:
            steps.append((s, steps[-1][1]))
        steps.append((s, q))
    ax.path(steps, "line", 2.4)
    for s, want in ((2, 3), (4, 7), (8, 13)):
        p = 1 / s ** 2
        n, q = queries(p)
        assert q == want and q <= query_bound(p)
        r = math.sin(math.pi / (4 * n + 2)) ** 2
        assert 0 < r / p <= 1 + 1e-12 and abs((2 * n + 1) * math.asin(math.sqrt(r)) - math.pi / 2) < 1e-12
        ax.points([(s, q)], "line", r=4.4, ring="bg")
        if s == 2:
            ax.text(s, q, str(q), dx=10, dy=17, size=13, color="line", halo=True)
        else:
            ax.text(s, q, str(q), dx=-8, dy=-10, size=13, color="line", anchor="end", halo=True)
    ax.xaxis(ticks=[1, 2, 4, 8], size=13)
    ax.yaxis(ticks=[0, 10, 20, 30], size=13)
    ax.text(5.2, query_bound(1 / 5.2 ** 2), "(π/2 + 2)/√*p*", dx=-6, dy=-10, size=13, color="lean", anchor="end")
    three.text(128, 270, "1/√*p*", size=13, color="dim", anchor="middle")
