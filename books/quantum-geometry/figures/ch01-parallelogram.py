"""两束单位实向量自己读出夹角：对角线平方模 3 与 1 之差的四分之一是内积 ½ = cos 60°（第一章 §1.1）。
Two unit real vectors read their own angle: a quarter of the difference of the squared diagonals 3 and 1
is the inner product ½ = cos 60° (chapter 1, §1.1).

The parallelogram is spanned by x and y at 60°; the script checks the chapter's numbers: |x+y|² = 3,
|x−y|² = 1, their sum 4 = 2(1 + 1), and (3 − 1)/4 = ½ = cos 60°. No coordinate axes are drawn.
"""

import math

from _ch01 import along, ray

SIZE = (560, 252)
WRAP = True
ALT = {
    "zh": "两支等长的单位箭头 x 与 y 从同一点出发，张开 60°，围成一个平行四边形，画面上没有任何坐标轴。"
          "长对角线 x + y 画成青色实线，标注 |x + y|² = 3；短对角线 x − y 画成青色虚线，标注 |x − y|² = 1。"
          "两者之差的四分之一是 ½，正是 cos 60°。",
    "en": "Two unit arrows x and y leave the same point 60° apart and span a parallelogram; no coordinate axes are drawn. "
          "The long diagonal x + y is a solid cyan line marked |x + y|² = 3; the short diagonal x − y is a dashed cyan line "
          "marked |x − y|² = 1. A quarter of their difference is ½, which is cos 60°.",
}


def draw(fig):
    left, right = fig.row([340, 196], 252, gap=16)
    ox, oy, L = 26, 220, 196
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

    # ---- left: the parallelogram itself, no axes
    cv = left
    X, Y, S = P(x), P(y), P(s)
    cv.polygon([(ox, oy), X, S, Y], "cyan", fill_opacity=0.05)
    cv.line(X[0], X[1], S[0], S[1], "faint", 1.3, dash="3 4")
    cv.line(Y[0], Y[1], S[0], S[1], "faint", 1.3, dash="3 4")
    cv.arrow(ox, oy, S[0], S[1], "line", 2.6)
    cv.arrow(Y[0], Y[1], X[0], X[1], "line", 2.2, dash="6 4")
    ray(cv, ox, oy, ax, L, "ink", 2.6)
    ray(cv, ox, oy, ay, L, "ink", 2.6)
    cv.arc(ox, oy, 36, ax, ay, "dim", 1.4)
    lab = along(ox, oy, 46, 60)
    cv.text(lab[0], lab[1], "60°", size=15, color="dim", anchor="middle", middle=True)

    cv.text(X[0] - 6, X[1] + 26, "*x*", size=18, anchor="middle")
    cv.text(Y[0] - 10, Y[1] + 4, "*y*", size=18, anchor="end")
    cv.text(S[0] - 4, S[1] - 12, "*x* + *y*", size=16, color="line", anchor="end")
    cv.text(X[0] + 8, X[1] - 18, "*x* − *y*", size=16, color="line", halo=True)

    # ---- right: the reading, two squared diagonals and what they give
    cv = right
    lx, ly = 8, 70
    cv.line(lx, ly - 5, lx + 26, ly - 5, "line", 2.6)
    cv.text(lx + 36, ly, "|*x* + *y*|^{2} = 3", size=16, color="line")
    cv.line(lx, ly + 33, lx + 26, ly + 33, "line", 2.2, dash="6 4")
    cv.text(lx + 36, ly + 38, "|*x* − *y*|^{2} = 1", size=16, color="line")
    cv.line(lx, ly + 60, cv.width - 8, ly + 60, "faint", 1.1)
    cv.text(lx, ly + 90, "(3 − 1) ÷ 4 = ½", size=16, color="line", weight=600)
    cv.text(lx, ly + 118, "= cos 60°", size=16, color="line", weight=600)
    cv.text(lx, ly + 158, cv.t("一根坐标轴也没画", "no coordinate axis drawn"), size=14, color="dim")
