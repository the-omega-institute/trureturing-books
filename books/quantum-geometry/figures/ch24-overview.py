"""第二十四章地图：1 + 1/x 与 y = x 只交于 φ、余弦蛛网绕向 θ*、扭过的对角线落回表里时落点是扭转的不动点。
Chapter 24 at a glance: 1 + 1/x meets y = x only at φ, the cosine cobweb winds into θ*, and when the twisted
diagonal lands back on the list its landing value is a fixed point of the twist.

Panel I (§24.3): y = 1 + 1/x and y = x for x > 0; their only crossing is φ, the green point (the chapter cites the
uniqueness with lean=). Panel II (§24.4–24.5): y = cos x and y = x with the cobweb from x₀ = 0, and the short magenta
tangent of slope −sin θ* at θ*; θ* is computed (≈ 0.739). Panel III (§24.7): the listing g of the chapter's 3×3
example with the twist f₁ = 0↦1, 1↦2, 2↦2; the twisted diagonal (1, 2, 2) is row 1, and the value 2 at the landing
spot is the fixed point of f₁ (green: lemma diagonal_landing_fixed, cited with lean=).
"""

import math

from _ch24 import LAM, PHI, THETA, cobweb

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：青色的曲线 y = 1 + 1/x 与灰色的对角线 y = x 在正半轴上只交于一点，绿色的点 φ ≈ 1.618。"
          "第二栏：青色的余弦曲线 y = cos x 与灰色的对角线 y = x，从 0 出发的蛛网折线一圈圈绕向交点 θ* ≈ 0.739，"
          "交点处一小段品红的切线，斜率是 −sin θ*。第三栏：一张三行三列的列表，第 0 行 0 1 2，第 1 行 1 2 2，第 2 行 2 2 2，"
          "对角线三格加了粗框；表下是用 f₁ 扭过的对角线 1 2 2，与青色的第 1 行一模一样，落点那一格的 2 套着绿圈，是 f₁ 的不动点。",
    "en": "Three panels. Panel I: the cyan curve y = 1 + 1/x and the grey diagonal y = x cross only once for x > 0, at "
          "the green point φ ≈ 1.618. Panel II: the cyan cosine curve y = cos x and the grey diagonal y = x; the cobweb "
          "from 0 winds into their crossing θ* ≈ 0.739, where a short magenta tangent has slope −sin θ*. Panel III: a "
          "three-by-three listing, row 0 is 0 1 2, row 1 is 1 2 2, row 2 is 2 2 2, with the diagonal cells outlined; under "
          "it, the diagonal twisted by f₁ reads 1 2 2, exactly the cyan row 1, and the 2 at the landing spot has a green "
          "ring: it is the fixed point of f₁.",
}

G = [(0, 1, 2), (1, 2, 2), (2, 2, 2)]
F1 = {0: 1, 1: 2, 2: 2}
D1 = tuple(F1[G[a][a]] for a in range(3))
assert D1 == (1, 2, 2) == G[1] and F1[G[1][1]] == G[1][1] == 2


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)

    # ---- I: the golden lock
    title(one, "I　黄金锁：只交于 φ", "I  golden lock: only φ")
    ax3 = one.axes(30, 46, 190, 190, (0, 3.2), (0, 3.2))
    ax3.xaxis(ticks=[0, 1, 2, 3], size=13)
    ax3.yaxis(ticks=[1, 2, 3], size=13)
    ax3.plot(lambda x: x, color="faint", width=1.4, dash="4 3")
    ax3.plot(lambda x: 1 + 1 / x, 0.47, 3.2, color="line", width=2.2)
    assert abs(1 + 1 / PHI - PHI) < 1e-12
    for x in (0.5, 1.0, 2.0, 3.0):          # 1 + 1/x − x changes sign once on (0, ∞), at φ
        assert (1 + 1 / x - x > 0) == (x < PHI)
    ax3.points([(PHI, PHI)], "lean", r=5.6, ring="bg")
    ax3.text(PHI, PHI, "*φ*", dx=10, dy=24, size=16, color="lean", weight=600, halo=True)
    ax3.text(3.2, 1 + 1 / 3.2, "1 + 1/*x*", dx=-2, dy=18, size=13, color="line", anchor="end")
    ax3.text(3.2, 3.2, "*y* = *x*", dx=-4, dy=14, size=13, color="dim", anchor="end")
    one.text(ax3.X(PHI), 268, "*φ* ≈ 1.618", size=13, color="dim", anchor="middle")
    ax3.vline(PHI, "faint", 1.0, dash="2 3")

    # ---- II: the cosine cobweb, with the slope at θ*
    title(two, "II　余弦蛛网 → θ*", "II  cosine cobweb → θ*")
    ax = two.axes(30, 46, 190, 190, (0, 1.05), (0, 1.05))
    ax.xaxis(ticks=[0, 1], labels=["0", "1"], size=13)
    ax.yaxis(ticks=[1], labels=["1"], size=13)
    ax.plot(lambda x: x, color="faint", width=1.4, dash="4 3")
    ax.plot(math.cos, color="line", width=2.2)
    xs = cobweb(ax, math.cos, 0.0, 14, width=1.3)
    assert abs(xs[-1] - THETA) < 1e-2
    h = 0.17
    assert abs(-math.sin(THETA) + LAM) < 1e-15
    ax.path([(THETA - h, THETA + LAM * h), (THETA + h, THETA - LAM * h)], "area", 2.4)
    ax.points([(THETA, THETA)], "ink", r=5.0, ring="bg")
    ax.text(0.2, math.cos(0.2), "cos *x*", dx=0, dy=24, size=13, color="line")
    ax.text(THETA + h, THETA - LAM * h, two.t("斜率 −sin *θ*^{∗}", "slope −sin *θ*^{∗}"), dx=-4, dy=34, size=13, color="area", anchor="middle", halo=True)
    ax.vline(THETA, "faint", 1.0, dash="2 3")
    two.text(ax.X(THETA), 268, "*θ*^{∗} ≈ 0.739", size=13, color="dim", anchor="middle")

    # ---- III: the diagonal lands on a fixed point
    title(three, "III　对角线落点即不动点", "III  the landing is a fixed point")
    x0, y0, c = 82, 52, 36
    for a in range(3):
        three.text(x0 - 12, y0 + a * c + c / 2, f"*g* {a}", size=13, color="dim", anchor="end", middle=True)
        row_hit = G[a] == D1
        for b in range(3):
            x, y = x0 + b * c, y0 + a * c
            three.rect(x, y, c, c, color="edge", fill="line" if row_hit else None, fill_opacity=0.14, width=1.0)
            three.text(x + c / 2, y + c / 2, str(G[a][b]), size=15, color="line" if row_hit else "ink", anchor="middle", middle=True)
        three.rect(x0 + a * c + 2, y0 + a * c + 2, c - 4, c - 4, color="ink", width=1.8)
    yd = y0 + 3 * c + 22
    three.text(x0 - 12, yd + c / 2, three.t("扭过", "twisted"), size=13, color="line", anchor="end", middle=True)
    for b in range(3):
        three.rect(x0 + b * c, yd, c, c, color="line", fill="line", fill_opacity=0.14, width=1.6)
        three.text(x0 + b * c + c / 2, yd + c / 2, str(D1[b]), size=15, color="line", anchor="middle", middle=True, weight=600)
    three.circle(x0 + c + c / 2, y0 + c + c / 2, 15, color="lean", width=2.4)
    three.text(118, 268, three.t("= 第 1 行；2 = *f*_{1}(2)", "= row 1; 2 = *f*_{1}(2)"), size=13, color="lean", anchor="middle")
