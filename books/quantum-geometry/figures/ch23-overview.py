"""第二十三章地图：艾森斯坦格的剪切不变、黄金单位在 ±1 双曲线上跳、ℤ 是 ℚ 里分母为 1 的那一行。
Chapter 23 at a glance: the shear-invariant Eisenstein lattice, golden units hopping on the ±1
hyperbolas, and ℤ as the denominator-1 row inside ℚ.

Panel I: the hexagonal lattice with the cyan norm-7 circle through its 12 points, and two magenta
cells (t = −1 and t = 2) spanned by u₁ = 1 and u₂(t) = e^{iπ/3} − (t + 1); both have area √3/2
(asserted). Panel II: the (g, ḡ) plane with the magenta hyperbolas gḡ = ±1 and the units φⁿ,
n = −2…3, each on one of them (asserted), labelled (L_n, F_n) for n ≥ 0. Panel III: the rationals
a/q with q ≤ 6 in rows by denominator; the q = 1 row is ℤ (cyan). Below it, the literature result
(violet) and the open question (red).
"""

import math

from _ch23 import PHI, R3, eis, eis_norm, golden_unit, lattice

SIZE = (740, 290)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：六角排列的艾森斯坦格点，青色的圆是范数 7，穿过 12 个格点；两块品红的平行四边形是 t = −1 与 t = 2 时两根基矢张成的格子，"
          "一块端正、一块剪斜，面积相同。第二栏：(g, ḡ) 平面上两支品红的双曲线 gḡ = +1 与 gḡ = −1，黄金单位 φⁿ 交替落在两支上，"
          "旁边标着 (2, 0)、(1, 1)、(3, 1)、(4, 2)，即卢卡斯数与斐波那契数。第三栏：按分母 1 到 6 分行排开的有理数，越往下越密；"
          "最上面一行分母为 1 的青色大点就是整数。下方紫色标签写着文献结果：Koenigsmann 2016 用全称量词定义 ℤ；红色标签写着开放问题：能否只用存在量词。",
    "en": "Three panels. Panel I: the hexagonal Eisenstein lattice; the cyan circle of norm 7 passes through 12 lattice points; "
          "two magenta parallelograms are the cells spanned by the two basis vectors at t = −1 and t = 2, one upright, one "
          "sheared, with the same area. Panel II: the (g, ḡ) plane with two magenta hyperbolas gḡ = +1 and gḡ = −1; the golden "
          "units φⁿ land alternately on the two branches, labelled (2, 0), (1, 1), (3, 1), (4, 2), the Lucas and Fibonacci "
          "numbers. Panel III: rational numbers laid out in rows by denominator 1 to 6, denser row by row; the top row of large "
          "cyan dots, denominator 1, is the integers. Below, a violet tag gives the literature result (Koenigsmann 2016 defines "
          "ℤ with universal quantifiers) and a red tag the open question (whether existential quantifiers alone suffice).",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 290, gap=16)

    # ---- I: the Eisenstein lattice, two cells of one area
    title(one, "I　艾森斯坦格：剪切不变", "I  Eisenstein: shear-invariant")
    cx, cy, s = 118, 158, 38
    P = lambda x, y: (cx + s * eis(x, y)[0], cy - s * eis(x, y)[1])
    for x, y in lattice(3.05):
        if eis_norm(x, y) != 7:
            one.dot(*P(x, y), 2.6, "faint")
    one.circle(cx, cy, s * math.sqrt(7), color="line", width=2.0)
    on7 = [p for p in lattice(3) if eis_norm(*p) == 7]
    assert len(on7) == 12
    for p in on7:
        one.dot(*P(*p), 4.2, "line", ring="bg")
    for t_, dash in ((-1, None), (2, "5 3")):
        u1 = (1.0, 0.0)
        u2 = (0.5 - (t_ + 1), R3)
        area = abs(u1[0] * u2[1] - u1[1] * u2[0])
        assert abs(area - math.sqrt(3) / 2) < 1e-12
        quad = [(0, 0), u1, (u1[0] + u2[0], u2[1]), u2]
        one.polygon([(cx + s * a, cy - s * b) for a, b in quad], "area", color="area", width=1.6,
                    fill_opacity=0.22 if dash is None else 0.12, dash=dash)
    one.text(cx + s * 0.9, cy + 24, "*t* = −1", size=13, color="area", halo=True)
    one.text(cx - s * 1.6, cy - s * R3 - 10, "*t* = 2", size=13, color="area", anchor="middle", halo=True)
    one.text(cx + s * 1.9, cy - s * 2.2, "*N* = 7", size=14, color="line", halo=True)

    # ---- II: golden units on the ±1 hyperbolas
    title(two, "II　黄金单位：贴着 ±1 走", "II  golden units on ±1")
    ax = two.axes(30, 44, 196, 210, (-0.5, 3.3), (-2.0, 3.0))
    ax.hline(0, "faint", 1.1)
    ax.vline(0, "faint", 1.1)
    for sgn in (1, -1):
        ax.plot(lambda g: sgn / g, 0.2, 3.3, color="area", width=1.8)
    ax.text(3.3, 1.05, "*g*ḡ = 1", size=13, color="area", anchor="end")
    ax.text(3.3, -1.25, "*g*ḡ = −1", size=13, color="area", anchor="end")
    labels = {0: ("(2, 0)", 10, -10), 1: ("(1, 1)", 2, 22), 2: ("(3, 1)", -4, -12)}
    for n in range(-2, 3):
        (a, b), (g, gb) = golden_unit(n)
        assert abs(g * gb - (-1) ** (n % 2)) < 1e-9
        ax.points([(g, gb)], "ink", r=4.4, ring="bg")
        if n in labels:
            s_, dx, dy = labels[n]
            ax.text(g, gb, s_, dx=dx, dy=dy, size=13, color="ink", anchor="middle", halo=True)
    ax.text(3.3, 0, "*g*", dx=0, dy=18, size=14, color="dim", anchor="end")
    ax.text(0, 3.0, "ḡ", dx=-8, dy=10, size=14, color="dim", anchor="end")
    two.text(118, 280, two.t("点旁数对：(*L*_{*n*}, *F*_{*n*})", "pairs: (*L*_{*n*}, *F*_{*n*})"), size=13, color="dim",
             anchor="middle")

    # ---- III: ℤ is one row of ℚ
    title(three, "III　ℚ 里的 ℤ", "III  ℤ inside ℚ")
    x0, x1, lo, hi = 50, 222, -2, 2
    X = lambda v: x0 + (v - lo) / (hi - lo) * (x1 - x0)
    top, step = 58, 22
    for q in range(1, 7):
        y = top + (q - 1) * step
        three.text(x0 - 10, y, f"{q}", size=13, color="line" if q == 1 else "dim", anchor="end", middle=True)
        for a in range(lo * q, hi * q + 1):
            if math.gcd(a, q) == 1:
                if q == 1:
                    three.dot(X(a / q), y, 5.2, "line", ring="bg")
                else:
                    three.dot(X(a / q), y, 2.4, "dim")
    three.text(x0 - 10, top - 18, three.t("分母", "den."), size=13, color="dim", anchor="end", middle=True)
    for a in range(lo, hi + 1):
        three.text(X(a), top - 16, str(a).replace("-", "−"), size=13, color="line", anchor="middle", middle=True)
    three.chip(118, 220, three.t("∀ 定义 ℤ：文献", "∀-defines ℤ: lit."), "argued", size=13, anchor="middle")
    three.chip(118, 256, three.t("只用 ∃？开放", "∃ alone? OPEN"), "open", size=13, anchor="middle")
