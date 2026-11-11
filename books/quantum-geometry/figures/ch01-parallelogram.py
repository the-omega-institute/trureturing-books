"""两束单位实向量自己读出夹角：对角线平方模 3 与 1 之差的四分之一是内积 ½ = cos 60°（第一章 §1.1）。
Two unit real vectors read their own angle: a quarter of the difference of the squared diagonals 3 and 1
is the inner product ½ = cos 60° (chapter 1, §1.1).

The parallelogram is spanned by x and y at 60°; the script checks the chapter's numbers: |x+y|² = 3,
|x−y|² = 1, their sum 4 = 2(1 + 1), and (3 − 1)/4 = ½ = cos 60°. No coordinate axes are drawn.
"""

import math

from _ch01 import along, ray

SIZE = (560, 290)
ALT = {
    "zh": "两支等长的单位箭头 x 与 y 从同一点出发，张开 60°，围成一个平行四边形，画面上没有任何坐标轴。"
          "长对角线 x + y 画成青色实线，标注 |x + y|² = 3；短对角线 x − y 画成青色虚线，标注 |x − y|² = 1。"
          "两者之差的四分之一是 ½，正是 cos 60°。",
    "en": "Two unit arrows x and y leave the same point 60° apart and span a parallelogram; no coordinate axes are drawn. "
          "The long diagonal x + y is a solid cyan line marked |x + y|² = 3; the short diagonal x − y is a dashed cyan line "
          "marked |x − y|² = 1. A quarter of their difference is ½, which is cos 60°.",
}


def draw(fig):
    t = fig.t
    ox, oy, L = 36, 252, 186
    ax, ay = 0, 60                       # directions of x and y
    x = (math.cos(math.radians(ax)), math.sin(math.radians(ax)))
    y = (math.cos(math.radians(ay)), math.sin(math.radians(ay)))
    s = (x[0] + y[0], x[1] + y[1])
    d = (x[0] - y[0], x[1] - y[1])
    n_s, n_d = s[0] ** 2 + s[1] ** 2, d[0] ** 2 + d[1] ** 2
    assert abs(n_s - 3) < 1e-12 and abs(n_d - 1) < 1e-12
    assert abs(n_s + n_d - 2 * (1 + 1)) < 1e-12                       # the parallelogram law
    assert abs((n_s - n_d) / 4 - math.cos(math.radians(60))) < 1e-12   # polarization: ½ = cos 60°

    def P(v):
        return ox + L * v[0], oy - L * v[1]

    X, Y, S = P(x), P(y), P(s)
    fig.polygon([(ox, oy), X, S, Y], "cyan", fill_opacity=0.05)
    fig.line(X[0], X[1], S[0], S[1], "faint", 1.3, dash="3 4")
    fig.line(Y[0], Y[1], S[0], S[1], "faint", 1.3, dash="3 4")
    fig.arrow(ox, oy, S[0], S[1], "line", 2.6)
    fig.arrow(Y[0], Y[1], X[0], X[1], "line", 2.2, dash="6 4")
    ray(fig, ox, oy, ax, L, "ink", 2.6)
    ray(fig, ox, oy, ay, L, "ink", 2.6)
    fig.arc(ox, oy, 34, ax, ay, "dim", 1.4)
    lab = along(ox, oy, 47, 52)
    fig.text(lab[0], lab[1], "60°", size=14, color="dim", anchor="middle", middle=True)

    fig.text(X[0] - 6, X[1] + 24, "*x*", size=17, anchor="middle")
    fig.text(Y[0] - 10, Y[1] - 4, "*y*", size=17, anchor="end")
    fig.text(S[0] + 8, S[1] - 6, "*x* + *y*", size=15, color="line")
    fig.text(X[0] + 6, X[1] - 16, "*x* − *y*", size=15, color="line", halo=True)

    # the reading, beside the drawing: two squared diagonals and what they give
    lx, ly = 370, 128
    fig.line(lx, ly - 5, lx + 26, ly - 5, "line", 2.6)
    fig.text(lx + 36, ly, "|*x* + *y*|^{2} = 3", size=15, color="line")
    fig.line(lx, ly + 31, lx + 26, ly + 31, "line", 2.2, dash="6 4")
    fig.text(lx + 36, ly + 36, "|*x* − *y*|^{2} = 1", size=15, color="line")
    fig.line(lx, ly + 58, SIZE[0] - 16, ly + 58, "faint", 1.1)
    fig.text(lx, ly + 86, "(3 − 1) ÷ 4 = ½", size=15, color="line", weight=600)
    fig.text(lx, ly + 112, "= cos 60°", size=15, color="line", weight=600)
    fig.text(lx, 262, t("一根坐标轴也没画", "no coordinate axis drawn"), size=13, color="dim")
