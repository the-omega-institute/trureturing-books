"""第三十章地图：有限观察者的 90° 视界、指数率示意曲线的交叉点落在可观测宇宙之外、涡管越拉越细。
Chapter 30 at a glance: the finite observer's 90° horizon, the crossover of the schematic exponent
rate lying beyond the observable universe, and a vortex tube stretched ever thinner.

Panel I reuses the horizon of ch30-horizon (n = 2, 4, 8). Panel II plots the schematic rate
r = log₂log₂n / √log₂n (c = 1) against log₂ n with the PPSZ level 0.386; the shaded band is
log₂ n ≤ 266 and the crossing at log₂ n ≈ 558 is found by bisection (asserted in _ch30). Panel III is a
schematic tube stretched by λ = 2.25 at constant volume: the cross-section A falls by λ, so with
Γ = ωA fixed the vorticity grows by λ. Whether a smooth unforced 3D flow can drive A to 0 is the
open problem.
"""

import math

from _ch30 import crossover, horizon, tube

SIZE = (740, 272)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：琥珀色的箭头 P₀ 是观察者的态，三支墨色箭头是 n = 2、4、8 时隐藏的目标，一支比一支更贴近竖直的 90° 视界，投到 P₀ 上的青色影子越来越短。"
          "第二栏：横轴 log₂ n，青色的示意曲线先升后降，与品红的水平线 0.386 交于 log₂ n ≈ 558，远在灰色阴影（可观测宇宙，log₂ n ≤ 266）之外。"
          "第三栏：两根竖直的涡管，左边短而粗，右边被拉长、变细；青色的环量回路在两根上相同，品红的涡度箭头在细的那根上更长；下方写着 A → 0？并有红色的 OPEN 标记。",
    "en": "Three panels. Panel I: the amber arrow P₀ is the observer's state; three ink arrows are the hidden target for "
          "n = 2, 4 and 8, each closer to the vertical 90° horizon, and their cyan shadows on P₀ get shorter. Panel II: "
          "against log₂ n, the cyan schematic curve rises and then falls, meeting the magenta level 0.386 at "
          "log₂ n ≈ 558, far beyond the grey band of the observable universe (log₂ n ≤ 266). Panel III: two vertical "
          "vortex tubes, the left short and thick, the right stretched long and thin; the cyan circulation loop is the "
          "same on both, the magenta vorticity arrow longer in the thin one; below, ‘A → 0?’ with a red OPEN tag.",
}

LAM = 2.25  # stretch factor


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 272, gap=16)

    # ---- I: the horizon
    title(one, "I　90° 视界", "I  the 90° horizon")
    ox, oy, R = 44, 236, 168
    horizon(one, ox, oy, R, labels=False)
    one.text(ox + R + 6, oy - 10, "*P*₀", size=15, color="now", weight=600)
    one.text(ox + 8, oy - R - 2, "90°", size=13, color="dim")
    one.text(ox + R * 0.5 + 10, oy - R * 0.87 - 4, "*S**", size=14, color="ink", weight=600)

    # ---- II: the crossover lies beyond the horizon
    title(two, "II　交叉点在视界之外", "II  crossover beyond reach")
    ax = crossover(two, 34, 46, 188, 168)
    ax.text(720, 0, "log₂ *n*", dy=40, size=13, color="dim", anchor="end")
    ax.text(470, 0.62, "*r*(*n*)", size=14, color="line", anchor="middle")

    # ---- III: a vortex tube stretched thinner (schematic)
    title(three, "III　涡管越拉越细", "III  the tube thins")
    r1, L1, w1 = 30.0, 66.0, 1.0
    r2, L2 = r1 / math.sqrt(LAM), L1 * LAM
    w2 = w1 * (r1 / r2) ** 2  # Γ = ω·A fixed
    assert abs(r2 ** 2 * L2 - r1 ** 2 * L1) < 1e-9 and abs(w2 - LAM) < 1e-12
    assert abs(w1 * r1 ** 2 - w2 * r2 ** 2) < 1e-9
    cy = 130
    tube(three, 64, cy, r1, L1, w1)
    tube(three, 170, cy, r2, L2, w2)
    for sgn in (-1, 1):
        y0 = cy + sgn * (L2 / 2 + 6)
        three.arrow(170, y0, 170, y0 + sgn * 14, "dim", 1.6, head=7)
    three.arrow(106, cy, 132, cy, "dim", 1.6, head=8)
    three.text(64, cy + L1 / 2 + 26, "Γ = ω*A*", size=13, color="line", anchor="middle")
    w = three.chip(three.width / 2 + 34, 258, "OPEN", "open", size=12, anchor="middle")
    three.text(three.width / 2 + 34 - w / 2 - 8, 258, "*A* → 0 ?", size=14, color="open", anchor="end")
