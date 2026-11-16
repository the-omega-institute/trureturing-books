"""第二十一章地图：对角线劈开旧纤维、开口螺旋投下闭合的影子、可平行化的球面只有四个维数。
Chapter 21 at a glance: the diagonal splits an old fiber, an open helix casts a closed shadow, and only four
dimensions of sphere are parallelizable.

Panel I is the four-address example of §21.2: the latent fiber {a₀, a₁, a₂} over coordinate 0 is cut by
g = twist ∘ D_a(latent a) into {a₀, a₁} (g = 1) and {a₂} (g = 0); the table is recomputed and checked.
Panel II is (cos t, sin t, c t) over 2.4 turns above its shadow (cos t, sin t); it is the chapter's interpretive
picture (MODEL), not a theorem, and carries a tag saying so.
Panel III marks the spheres S⁰ … S⁸; S⁰, S¹, S³, S⁷ (Adams) are violet, a literature result.
"""

import math

from _ch21 import LATENT, check_table, helix_point

SIZE = (740, 272)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：两个框是潜坐标的两根纤维，左框里竖排着 a₀、a₁、a₂，右框里只有 a₃；一条品红虚线横穿左框，把它劈成"
          "上面的 a₀、a₁（g = 1）与下面的 a₂（g = 0）。第二栏：一条品红的螺旋绕着紫色的竖轴 e_{n+1} 一圈圈升高，底下是它"
          "青色的影子，一个闭合的圆；从起点绕一圈回到圆上同一点时，螺旋已经高出 2πc；这一栏是诠释，标着“诠释”。第三栏：S⁰ 到 S⁸ 九个小圆排成三行，"
          "S⁰、S¹、S³、S⁷ 涂成紫色，分别标着 ℝ、ℂ、ℍ、𝕆；S² 旁注“毛球：必有零点”；这一栏是文献结果。",
    "en": "Three panels. Panel I: two boxes are the two fibers of the latent coordinate; the left one holds a₀, a₁, a₂ in a "
          "column, the right one only a₃. A dashed magenta line cuts across the left box, splitting it into a₀, a₁ above "
          "(g = 1) and a₂ below (g = 0). Panel II: a magenta helix climbs turn after turn around the violet vertical axis "
          "e_{n+1}; beneath it is its cyan shadow, a closed circle. After one turn the shadow is back at its starting point "
          "while the helix stands 2πc higher; this panel is an interpretation and is tagged “interpretation”. Panel III: nine small circles S⁰ to S⁸ in three rows; S⁰, S¹, S³, S⁷ are "
          "violet and labelled ℝ, ℂ, ℍ, 𝕆; S² is marked “hairy ball: must vanish”. This panel is a literature result.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    t = fig.t
    one, two, three = fig.row([236, 236, 236], 272, gap=16)

    # ---- I: the diagonal splits a fiber
    g = check_table()
    title(one, "I　对角线劈开纤维", "I  the diagonal splits a fiber")
    boxes = {0: (8, 104), 1: (124, 228)}
    ys = {"a0": 74, "a1": 116, "a2": 190, "a3": 190}
    for b, (x0, x1) in boxes.items():
        one.rect(x0, 46, x1 - x0, 170, color="dim", fill="panel", rx=10, width=1.4)
        one.text((x0 + x1) / 2, 238, one.t(f"潜坐标 {b}", f"latent {b}"), size=13, color="dim", anchor="middle")
    for a, y in ys.items():
        x0, x1 = boxes[LATENT[a]]
        one.dot(x0 + 22, y, 5, "ink")
        one.text(x0 + 34, y, f"*a*_{{{a[1]}}}", size=15, anchor="start", middle=True)
        one.text(x1 - 8, y, f"*g* = {g[a]}", size=13, color="area" if g[a] != g["a0"] else "dim", anchor="end", middle=True)
    cut = 153
    one.line(2, cut, 110, cut, "area", 2.2, dash="6 4")
    one.text(118, 262, one.t("g 把一根纤维劈成两块", "g cuts one fiber in two"), size=13, color="area", anchor="middle")

    # ---- II: the open helix and its closed shadow
    title(two, "II　开口螺旋的影子", "II  the helix and its shadow")
    cx, base, R, ry = 104, 206, 70, 22
    turns = 2.4
    tmax = 2 * math.pi * turns
    lift = 112 / tmax
    two.ellipse(cx, base, R, ry, color="line", width=2.4)
    two.arrow(cx, base + 10, cx, base - lift * tmax - 34, "axis", 2.0, head=8)
    two.text(cx - 8, base - lift * tmax - 30, "*e*_{n+1}", size=14, color="axis", anchor="end")
    n = 240
    pts = [helix_point(cx, base, R, ry, lift, tmax * i / n) for i in range(n + 1)]
    seg, back = [pts[0]], math.sin(0) > 0
    for i in range(1, n + 1):
        b = math.sin(tmax * i / n) > 0          # sin t > 0: the far half of the turn
        seg.append(pts[i])
        if b != back or i == n:
            two.polyline(seg, "area", 1.4 if back else 2.6, dash="4 3" if back else None)
            seg, back = [pts[i]], b
    x0, y0 = helix_point(cx, base, R, ry, lift, 0)
    x1, y1 = helix_point(cx, base, R, ry, lift, 2 * math.pi)
    assert abs(x1 - x0) < 1e-9 and abs((y0 - y1) - lift * 2 * math.pi) < 1e-9   # same shadow, 2πc higher
    two.line(x0, y0, x1, y1, "dim", 1.2, dash="3 3")
    two.dot(x0, y0, 4.4, "line", ring="bg")
    two.dot(x1, y1, 4.4, "area", ring="bg")
    two.text(x0 + 10, (y0 + y1) / 2, "2π*c*", size=14, color="dim", middle=True)
    two.text(cx, 254, two.t("影子绕一圈就闭合", "the shadow closes after one turn"), size=13, color="line", anchor="middle")
    two.chip(two.width - 4, 50, two.t("诠释", "interpretation"), "dim", anchor="end")

    # ---- III: parallelizable spheres
    title(three, "III　可平行化的球面", "III  parallelizable spheres")
    algebra = {0: "ℝ", 1: "ℂ", 3: "ℍ", 7: "𝕆"}
    for m in range(9):
        x = 42 + 76 * (m % 3)
        y = 70 + 64 * (m // 3)
        if m in algebra:
            three.circle(x, y, 19, color="argued", fill="argued", fill_opacity=0.22, width=2.0)
            three.text(x, y + 34, algebra[m], size=13, color="argued", anchor="middle")
        else:
            three.circle(x, y, 19, color="faint", width=1.3)
        three.text(x, y, f"*S*^{{{m}}}", size=14, color="argued" if m in algebra else "dim", anchor="middle", middle=True)
    assert [2 ** k for k in range(4)] == [m + 1 for m in sorted(algebra)]   # unit spheres of the 1, 2, 4, 8-dim algebras
    three.text(228, 104, three.t("毛球：有零点", "hairy ball"), size=13, color="dim", anchor="end")
    three.chip(118, 258, three.t("文献结果", "literature"), "argued", anchor="middle")
