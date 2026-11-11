"""第二十四章地图：余弦蛛网绕向 θ*、有限集合一路收缩后停下、1 + 1/x 与 y = x 只交于 φ。
Chapter 24 at a glance: the cosine cobweb winding into θ*, a finite set shrinking until it stops, and
1 + 1/x meeting y = x only at φ.

Panel I: y = cos x and y = x with the cobweb from x₀ = 0; θ* is computed (≈ 0.739). Panel II: the
example S₀ = {0, 1, 2} → {0, 1} → {0} → {0} of the chapter, as boxes that lose an element per step
until two neighbours agree. Panel III: y = 1 + 1/x and y = x for x > 0; their only crossing is φ,
the green point (the chapter cites the uniqueness with lean=).
"""

import math

from _ch24 import PHI, THETA, cobweb, set_capsule

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：青色的余弦曲线 y = cos x 与灰色的对角线 y = x，从 0 出发的蛛网折线一圈圈绕向交点 θ* ≈ 0.739。"
          "第二栏：三个盒子自上而下，候选集 {0, 1, 2} 每步删掉一个元素，变成 {0, 1}、{0}，再下一步仍是 {0}，在这里停下。"
          "第三栏：青色的曲线 y = 1 + 1/x 与灰色的对角线 y = x 在正半轴上只交于一点，绿色的点 φ ≈ 1.618。",
    "en": "Three panels. Panel I: the cyan cosine curve y = cos x and the grey diagonal y = x; the cobweb from 0 winds "
          "into their crossing θ* ≈ 0.739. Panel II: three boxes from top to bottom; the candidate set {0, 1, 2} loses one "
          "element per step, becoming {0, 1}, then {0}, and the next step is {0} again, where it stops. Panel III: the cyan "
          "curve y = 1 + 1/x and the grey diagonal y = x cross only once for x > 0, at the green point φ ≈ 1.618.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)

    # ---- I: the cosine cobweb
    title(one, "I　余弦蛛网 → θ*", "I  cosine cobweb → θ*")
    ax = one.axes(30, 46, 190, 190, (0, 1.05), (0, 1.05))
    ax.xaxis(ticks=[0, 1], labels=["0", "1"], size=13)
    ax.yaxis(ticks=[1], labels=["1"], size=13)
    ax.plot(lambda x: x, color="faint", width=1.4, dash="4 3")
    ax.plot(math.cos, color="line", width=2.2)
    xs = cobweb(ax, math.cos, 0.0, 14, width=1.3)
    assert abs(xs[-1] - THETA) < 1e-2
    ax.points([(THETA, THETA)], "ink", r=5.0, ring="bg")
    ax.text(0.2, math.cos(0.2), "cos *x*", dx=0, dy=24, size=13, color="line")
    ax.vline(THETA, "faint", 1.0, dash="2 3")
    one.text(ax.X(THETA), 268, "*θ*^{∗} ≈ 0.739", size=13, color="dim", anchor="middle")

    # ---- II: a finite set shrinks and stops
    title(two, "II　有限集合：筛到停下", "II  finite set: sift, then stop")
    steps = [{0, 1, 2}, {0, 1}, {0}, {0}]
    for a, b in zip(steps, steps[1:]):
        assert b <= a                                   # U(A) ⊆ A
    n_change = sum(1 for a, b in zip(steps, steps[1:]) if a != b)
    assert n_change == 2 <= len(steps[0])
    ys = [64, 124, 184, 244]
    for k, (s, y) in enumerate(zip(steps, ys)):
        w = set_capsule(two, 70, y, s, r=15, outline="dim" if k < 3 else "line")
        two.text(58, y, f"*S*_{{{k}}}", size=15, color="ink", anchor="end", middle=True)
        if k < 3:
            two.arrow(70 + w / 2, y + 22, 70 + w / 2, ys[k + 1] - 22, "dim", 1.4, head=7)
    two.text(70 + 117 / 2 + 22, 214, two.t("不再变", "no change"), size=13, color="line", middle=True)

    # ---- III: the golden lock
    title(three, "III　黄金锁：只交于 φ", "III  golden lock: only φ")
    ax3 = three.axes(30, 46, 190, 190, (0, 3.2), (0, 3.2))
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
    three.text(ax3.X(PHI), 268, "*φ* ≈ 1.618", size=13, color="dim", anchor="middle")
    ax3.vline(PHI, "faint", 1.0, dash="2 3")
