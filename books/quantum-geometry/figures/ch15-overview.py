"""第十五章地图：两次反射合成一次转动、二进制相位齿轮、周期留下的共振频率。
Chapter 15 at a glance: two reflections make one turn, the binary phase gears, and the resonant
frequencies a period leaves behind.

Panel I: the chapter's N = 4 example, θ = arcsin(1/2) = 30°; one Grover step turns U by 2θ onto W.
Panel II: the 3-qubit QFT of x = 5 = 101₂; the three factors carry the phases 2π·0.1₂, 2π·0.01₂, 2π·0.101₂;
the k-th gear has 2^k teeth. Panel III: the period state |0⟩ + |4⟩ + |8⟩ + |12⟩ after the 16-point QFT;
probability 1/4 on k ∈ {0, 4, 8, 12} and 0 elsewhere.
"""

import cmath
import math

from _ch15 import grover_theta, plane

SIZE = (740, 270)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：成功方向 W 朝上、失败方向 B 朝右，一支箭头 U 与 B 成 30°，一步之后转过紫色的 2θ = 60°，琥珀色的箭头正好落在 W 上。"
          "第二栏：三只圆形齿轮，齿数分别是 2、4、8，琥珀色的指针对 x = 5 分别指向 π、π/2 与 5π/4。"
          "第三栏：16 个频率上的柱状图，只有 0、4、8、12 四处有等高的青色柱，高 1/4，其余全为零。",
    "en": "Three panels. Panel I: the success direction W points up and the failure direction B to the right; an arrow U makes "
          "30° with B, and one step turns it through the violet 2θ = 60° so that the amber arrow lands exactly on W. "
          "Panel II: three round gears with 2, 4 and 8 teeth; for x = 5 their amber pointers sit at π, π/2 and 5π/4. "
          "Panel III: a bar chart over 16 frequencies; only 0, 4, 8 and 12 carry equal cyan bars of height 1/4, the rest are zero.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 270, gap=16)

    # ---- I: N = 4, one step from 30° to 90°
    title(one, "I　一步转过 2*θ*", "I  one step turns 2*θ*")
    th = math.degrees(grover_theta(4))
    assert abs(th - 30) < 1e-9 and abs(math.sin(math.radians(3 * th)) - 1) < 1e-12
    cx, cy, R = 40, 240, 158
    P = plane(one, cx, cy, R, w_label=("*W*", "*W*"), b_label=("*B*", "*B*"))
    one.arc(cx, cy, R * 0.62, th, 3 * th, "axis", 2.6)
    one.arrow_head(cx, cy - R * 0.62, 180, "axis", head=10)
    lx, ly = P(2 * th, 0.74)
    one.text(lx + 4, ly, "2*θ*", size=15, color="axis", weight=600, halo=True, middle=True)
    one.angle(cx, cy, 34, 0, th, "*θ*")
    x1, y1 = P(th)
    one.arrow(cx, cy, x1, y1, "ink", 2.2)
    one.text(x1 + 6, y1 - 6, "*U*", size=15)
    x3, y3 = P(3 * th)
    one.arrow(cx, cy, x3, y3, "now", 3.0)
    one.text(x3 + 10, y3 + 16, "*QU*", size=15, color="now")
    one.text(cx + R * 0.55, cy - 12, "*N* = 4", size=13, color="dim", anchor="middle")

    # ---- II: binary phase gears for x = 5
    title(two, "II　二进制相位齿轮", "II  binary phase gears")
    x = 5
    bits = [(x >> i) & 1 for i in range(3)]          # x0, x1, x2
    fracs = [bits[0] / 2, bits[1] / 2 + bits[0] / 4, bits[2] / 2 + bits[1] / 4 + bits[0] / 8]
    assert fracs == [0.5, 0.25, 0.625]
    names = ["0.1₂", "0.01₂", "0.101₂"]
    phases = ["π", "π/2", "5π/4"]
    two.text(118, 58, "*x* = 5 = 101₂", size=14, color="now", anchor="middle")
    r = 31
    for k, (cxk, f) in enumerate(zip((40, 118, 196), fracs), start=1):
        cyk = 132
        two.circle(cxk, cyk, r, color="dim", width=1.5)
        teeth = 2 ** k
        for j in range(teeth):
            a = 2 * math.pi * j / teeth
            two.line(cxk + r * math.cos(a), cyk - r * math.sin(a),
                     cxk + (r + 7) * math.cos(a), cyk - (r + 7) * math.sin(a), "dim", 2.0)
        a = 2 * math.pi * f
        two.arrow(cxk, cyk, cxk + (r - 3) * math.cos(a), cyk - (r - 3) * math.sin(a), "now", 2.6, head=8)
        two.dot(cxk, cyk, 2.6, "ink")
        two.text(cxk, cyk + r + 30, names[k - 1], size=14, anchor="middle")
        two.text(cxk, cyk + r + 52, phases[k - 1], size=14, color="now", anchor="middle")
    two.text(118, 252, two.t("齿数 2、4、8", "2, 4, 8 teeth"), size=13, color="dim", anchor="middle")

    # ---- III: the period state's spectrum, Q = 16, r = 4
    title(three, "III　只剩共振频率", "III  only resonances survive")
    Q, per = 16, 4
    xs = range(0, Q, per)
    amp = [sum(cmath.exp(2j * math.pi * k * xx / Q) for xx in xs) / (2 * math.sqrt(Q)) for k in range(Q)]
    prob = [abs(a) ** 2 for a in amp]
    for k in range(Q):
        assert abs(prob[k] - (0.25 if k % per == 0 else 0.0)) < 1e-12
    ax = three.axes(28, 70, 196, 140, (-0.7, 15.7), (0, 0.3))
    three.text(118, 52, "*Q* = 16,  *r* = 4", size=14, anchor="middle")
    ax.hline(0.25, "faint", 1.0, dash="3 4")
    ax.text(-0.7, 0.25, "¼", dx=-6, size=14, color="dim", anchor="end", middle=True)
    for k in range(Q):
        if prob[k] > 1e-9:
            three.line(ax.X(k), ax.Y(0), ax.X(k), ax.Y(prob[k]), "line", 7)
        else:
            three.dot(ax.X(k), ax.Y(0), 2.2, "dim")
    ax.xaxis(ticks=[0, 4, 8, 12, 15], size=13)
    three.text(118, 252, three.t("频率 *k*", "frequency *k*"), size=13, color="dim", anchor="middle")
