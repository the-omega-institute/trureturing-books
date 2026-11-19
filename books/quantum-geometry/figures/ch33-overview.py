"""第三十三章地图：点—体八度、公共时钟预算与四场圆弧联络。
Chapter 33 at a glance: the point–volume octave, the clock budget and the four-field bundle.
"""

import math
from fractions import Fraction

from _overview import label, title

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "第一栏画出点、三条线、三个面、体，再将体送到下一层的点。第二栏以四分之一圆上的直角三角形示意等主频预算公设（MODEL）：固有时速率 ντ 与圆弧负载 ν_load 分别是主频 ν₀ 的 4/5 与 3/5，绿色标签标出拉格朗日—格拉姆代数恒等式。第三栏画三层规范联络及最外层的位置与引力场，标出裸混合角 3/8 与开放的重整化群阈值问题。",
    "en": "Panel I shows a point, three lines, three faces and a volume, then maps that volume to the next level's point. Panel II illustrates the clock-budget postulate (MODEL) with a right triangle on a quarter circle. The proper-time rate ντ and arc load ν_load are 4/5 and 3/5 of ν₀, respectively. The green chip marks the Lagrange–Gram algebraic identity. Panel III shows three nested gauge connections within the position and gravity shell, with the bare mixing value 3/8 and the open RG thresholds.",
}


def octave(panel):
    title(panel, "I　霍奇点—体八度", "I  Hodge point–volume octave")
    counts = [math.comb(3, k) for k in range(4)]
    assert counts == [1, 3, 3, 1] and sum(counts) == 8
    xs = (47, 94, 142, 189)
    for k, (x, count) in enumerate(zip(xs, counts)):
        for i in range(count):
            y = 123 + 27 * (i - (count - 1) / 2)
            if k == 0:
                panel.dot(x, y, 4.5, "ink")
            elif k == 1:
                panel.line(x - 10, y, x + 10, y, "line", 2.5)
            elif k == 2:
                panel.polygon([(x - 11, y + 6), (x + 5, y + 6), (x + 11, y - 6), (x - 5, y - 6)],
                              "area", color="area", fill_opacity=0.20)
            else:
                sp = panel.sphere(x, y, 15)
                sp.polytope([(a, b, c) for a in (-0.6, 0.6) for b in (-0.6, 0.6) for c in (-0.6, 0.6)],
                            color="violet")
        word = f"Λ{'⁰¹²³'[k]}_{{ℓ}}"
        panel.text(x, 181, panel.t(word, word), size=15, anchor="middle")
    label(panel, 60, "1 — 3 — 3 — 1", "1 — 3 — 3 — 1", size=16, weight=700)
    panel.curve_arrow([(189, 193), (178, 213), (143, 225), (93, 225), (58, 213), (47, 193)],
                      "violet", 1.7, head=8)
    label(panel, 257, "Λ³_{ℓ} ≡ Λ⁰_{ℓ+1}", "Λ³_{ℓ} ≡ Λ⁰_{ℓ+1}", color="violet", weight=700)


def clock(panel):
    title(panel, "II　主频预算（MODEL）", "II  Clock budget (MODEL)")
    x, y, radius = 53, 190, 134
    proper, load = Fraction(4, 5), Fraction(3, 5)
    assert proper**2 + load**2 == 1
    tip = x + radius * float(proper), y - radius * float(load)
    assert math.isclose(math.dist((x, y), tip), radius)
    panel.arc(x, y, radius, 0, 90, "faint", 1.7)
    panel.polygon([(x, y), (tip[0], y), tip], "cyan", fill_opacity=0.12)
    panel.line(x, y, *tip, "ink", 2.1)
    panel.line(x, y, tip[0], y, "line", 2.6)
    panel.line(tip[0], y, *tip, "area", 2.6)
    panel.right_angle(tip[0], y, 90, size=8)
    panel.dot(*tip, 3.5, "ink")
    panel.text(97, 143, panel.t("ν₀", "ν₀"), size=15)
    panel.text(101, 211, panel.t("ν_{τ}", "ν_{τ}"), size=15, color="line")
    panel.text(153, 165, panel.t("ν_{load}", "ν_{load}"), size=15, color="area", anchor="end")
    label(panel, 238, "ν_{τ}² + ν_{load}² = ν₀²", "ν_{τ}² + ν_{load}² = ν₀²", weight=700)
    panel.chip(118, 261, panel.t("LEAN ✓ 拉格朗日—格拉姆", "LEAN ✓ Lagrange–Gram"), "lean", anchor="middle")


def bundle(panel):
    title(panel, "III　同心四场圆弧联络", "III  AF-GUT four-field bundle")
    cx, cy = 85, 125
    shells = (
        (73, "line", "位置 / 引力", "Gravity"),
        (55, "dim", "U(1)_{Y}", "U(1)_{Y}"),
        (37, "violet", "SU(2)_{L}", "SU(2)_{L}"),
        (19, "blue", "SU(3)_{C}", "SU(3)_{C}"),
    )
    assert len({r for r, *_ in shells}) == 4 and (1 + 3 + 8 == 12)
    for i, (radius, color, zh, en) in enumerate(shells):
        panel.circle(cx, cy, radius, color=color, width=1.7)
        angle = math.radians(68 - 35 * i)
        end = cx + radius * math.cos(angle), cy - radius * math.sin(angle)
        y = 60 + 40 * i
        panel.polyline([end, (133, y - 4), (154, y - 4)], color, 1.2)
        panel.text(164, y, panel.t(zh, en), size=12, color=color)
    assert 1 / (1 + Fraction(5, 3)) == Fraction(3, 8)
    label(panel, 221, "裸值 sin² θ_{W} = 3/8", "Bare sin² θ_{W} = 3/8", weight=700)
    panel.chip(118, 251, panel.t("OPEN 重整化群阈值", "OPEN RG thresholds"), "open", anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)
    octave(one)
    clock(two)
    bundle(three)
