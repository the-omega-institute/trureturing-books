"""第三十三章地图：记忆阶数的连续谱、自维持的收缩势阱、同一条余弦轨道的两种取样。
Chapter 33 at a glance: the continuum of memory orders, the self-kept contracting well, and one
cosine orbit sampled two ways.

Panel I is the memory-order axis of _ch33.spectrum (photon M = 0, atom M = 1, crystal, mind M ≫ 1).
Panel II is the well of ch33-contracting-well: a marble kicked to x₀ = 0.8 is pulled back by
x ↦ 0.45·x towards the window W + u_i at the bottom. Panel III is the orbit x_{n+1} = cos x_n from
x_0 = 0.1 (example ex-ch33-mutual-cosine-monotonic-lock, items 14 and 17): one row per cosine
evaluation, the reading across; beat by beat it changes sides of θ*, the ringed even beats (one
round = two beats) stay on the left. Panels I and II are schematic (MODEL); panel III is computed
(NUM) and draws an application of existing results (ARGUED).
"""

import math

from _ch33 import profile, spectrum


def _theta():
    x = 0.74
    for _ in range(60):
        x -= (math.cos(x) - x) / (-math.sin(x) - 1)
    return x


THETA = _theta()
ORBIT = [0.1]
for _ in range(6):
    ORBIT.append(math.cos(ORBIT[-1]))
assert all((a - THETA) * (b - THETA) < 0 for a, b in zip(ORBIT, ORBIT[1:]))  # every beat changes sides
assert all(x < THETA for x in ORBIT[::2])  # the even beats (the rounds) stay below θ*

SIZE = (740, 250)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：一条向右的轴，自左向右排着光子（波）、原子（带轨道的点）、晶体（点阵）与心智（自我环绕的箭头），"
          "下面写着记忆阶数 M = 0、M = 1 与 M ≫ 1。第二栏：一只碗形的势阱，被踢到右侧坡上的小球沿灰色箭头一步步落回碗底，"
          "琥珀色的是它现在的位置，碗底的青色短线是接受窗 W + u_i。第三栏：同一条余弦轨道自上而下一行一拍，横向是读数，"
          "灰色折线逐拍跨过竖直的 θ* 虚线左右交替，每两拍套一个空心环，环全在 θ* 左侧，琥珀色的是最后一拍。",
    "en": "Three panels. Panel I: an axis pointing right with, from left to right, a photon (a wave), an atom (a dot with "
          "an orbit), a crystal (a lattice) and a mind (an arrow circling back on itself); below them the memory orders "
          "M = 0, M = 1 and M ≫ 1. Panel II: a bowl-shaped well; a marble kicked up the right slope falls back step by "
          "step along grey arrows, amber where it is now, towards the short cyan window W + u_i at the bottom. "
          "Panel III: one cosine orbit, one row per beat from top to bottom with the reading across; a grey "
          "zigzag crosses the vertical dashed line θ* at every beat, every second beat carries a hollow ring, all rings "
          "lie left of θ*, and the last beat is amber.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 250, gap=16)

    title(one, "I　万物皆为观察者", "I  every being observes")
    spectrum(one, 12, 160, 214, s=13, axis_label=False)

    title(two, "II　自维持的势阱", "II  a self-kept well")
    profile(two, 118, 176, 92, 96, "well", r=6.0)

    title(three, "III　互为吸引子", "III  mutual attractors")
    x0, x1, y0, dy = 50, 220, 58, 22
    X = lambda v: x0 + (x1 - x0) * v
    pts = [(X(v), y0 + n * dy) for n, v in enumerate(ORBIT)]
    yb = y0 + (len(ORBIT) - 1) * dy + 14
    three.line(X(THETA), y0 - 12, X(THETA), yb, "dim", 1.3, dash="4 4")
    three.text(X(THETA), y0 - 16, "θ*", size=13, color="dim", anchor="middle")
    three.arrow(x0, yb + 6, x1 + 8, yb + 6, "dim", 1.3, head=8)
    three.text((x0 + x1) / 2, yb + 26, three.t("读数 *x* →", "reading *x* →"), size=13, color="dim", anchor="middle")
    three.polyline(pts, "dim", 1.4)
    for n, (x, y) in enumerate(pts):
        last = n == len(pts) - 1
        if n % 2 == 0:
            three.circle(x, y, 7.5, color="sigma", width=1.8)
        three.dot(x, y, 4.6 if last else 3.0, "amber" if last else "ink")
    three.text(x0 - 12, y0 + 4, "*n* = 0", size=12, color="dim", anchor="end")
    three.text(x0 - 12, y0 + 6 * dy + 4, "*n* = 6", size=12, color="dim", anchor="end")
