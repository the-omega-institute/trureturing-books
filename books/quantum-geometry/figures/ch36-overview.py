"""第三十六章地图：冲上 90° 时影子 cos θ 归零；快度等步的阶梯一圈圈挤向圆盘边缘而碰不到它；循环小数的六位一圈约成 1/7。
Chapter 36 at a glance: at 90° the shadow cos θ vanishes; equal rapidity steps crowd towards the rim of the
disc without reaching it; the six-digit loop of a repeating decimal reduces to 1/7.

Panel I: the memory axis points up; a state at θ = 40° casts the cyan shadow cos θ on it, the magenta
state at 90° casts none. Panel II: a Poincaré disc; the cyan points sit at radius tanh(η_k/2) for
η_k = η(θ*) + k (Δη = 1, k = 0…6), with faint circles through them; the rim is the 90° horizon. Panel
III: the digits 1, 4, 2, 8, 5, 7 of 0.142857… on one loop, reduced to the generator 1/7.
"""

import math

from _ch36 import DIGITS, ETA0, THETA_STAR, theta_k

SIZE = (740, 276)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：竖直向上的是记忆轴；θ = 40° 的墨色箭头在轴上投下青色的影子 cos θ，品红的箭头躺在 90° 方向，影子缩成原点的一点，旁注 cos 90° = 0。"
          "第二栏：一个圆盘，青色的点沿一条半径排开，每一点相差同样的快度步长，越往外越挤，过每一点的淡色同心圆也越挤，却始终在边缘以内。"
          "第三栏：数字 1、4、2、8、5、7 排成一圈，上方写着 0.142857 142857 …，一支箭头从这一圈指向下方的 1/7。",
    "en": "Three panels. Panel I: the memory axis points up; an ink arrow at θ = 40° casts a cyan shadow cos θ on it, while the "
          "magenta arrow lies along 90° and its shadow shrinks to a point at the origin, marked cos 90° = 0. Panel II: a disc "
          "with cyan points along one radius, one equal rapidity step apart; they and the faint circles through them crowd "
          "towards the rim but stay inside it. Panel III: the digits 1, 4, 2, 8, 5, 7 on a loop under 0.142857 142857 …, with "
          "an arrow from the loop down to 1/7.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    t = fig.t
    one, two, three = fig.row([236, 236, 236], 276, gap=16)

    # ---- I: the cliff at 90°
    title(one, "I　90° 处影子归零", "I  no shadow at 90°")
    ox, oy, R = 46, 236, 166
    one.arc(ox, oy, R, 0, 90, "faint", 1.2, dash="3 4")
    one.line(ox, oy, ox, oy - R - 12, "dim", 1.4)
    one.text(ox + 8, oy - R - 4, t("记忆轴", "memory axis"), size=13, color="dim")
    th = math.radians(40)
    tx, ty = ox + R * math.sin(th), oy - R * math.cos(th)
    assert abs((oy - ty) / R - math.cos(th)) < 1e-12
    one.line(tx, ty, ox, ty, "line", 1.2, dash="3 3")
    one.line(ox, oy, ox, ty, "line", 5, cap="round")
    one.arrow(ox, oy, tx, ty, "ink", 2.0, head=9)
    one.angle(ox, oy, 38, 50, 90, "θ", size=14)
    one.text(ox - 8, (oy + ty) / 2, "cos θ", size=14, color="line", anchor="end", rotate=90, middle=True)
    one.arrow(ox, oy, ox + R, oy, "area", 2.6, head=10)
    one.text(ox + R - 2, oy - 10, "90°", size=14, color="area", anchor="end")
    one.dot(ox, oy, 4.4, "line", ring="bg")
    one.text(ox + 8, oy + 24, "cos 90° = 0", size=14, color="area", weight=600)
    # sliding towards the cliff
    pts = [(ox + (R + 10) * math.sin(math.radians(a)), oy - (R + 10) * math.cos(math.radians(a)))
           for a in range(48, 86, 2)]
    one.curve_arrow(pts, "dim", 1.4, head=7)

    # ---- II: the rapidity staircase on a disc
    title(two, "II　快度阶梯碰不到边", "II  steps never reach the rim")
    cx, cy, Rd = 118, 150, 100
    two.circle(cx, cy, Rd, color="ink", width=2.2)
    radii = []
    for k in range(7):
        e = ETA0 + k
        r = math.tanh(e / 2)
        assert abs(r - math.tan(theta_k(k) / 2)) < 1e-12 and r < 1  # tanh(η/2) = tan(θ/2)
        radii.append(r)
    assert abs(radii[0] - math.tan(THETA_STAR / 2)) < 1e-12
    for r in radii:
        two.circle(cx, cy, Rd * r, color="faint", width=1.0)
    two.line(cx, cy, cx + Rd, cy, "dim", 1.2)
    for k, r in enumerate(radii):
        two.dot(cx + Rd * r, cy, 3.6 if k < 3 else 2.6, "line", ring="bg")
    for k in range(3):
        two.text(cx + Rd * radii[k], cy + 20, str(k), size=13, color="line", anchor="middle", halo=True)
    two.text(cx, cy + 20, "*k* =", size=13, color="dim", anchor="end", halo=True)
    two.text(cx + Rd * 0.72, cy - Rd * 0.72 - 6, "90°", size=14, color="dim", anchor="start")
    two.text(cx, cy + Rd + 20, "δ_{k} > 0", size=14, color="area", anchor="middle")

    # ---- III: the loop reduced to its generator
    title(three, "III　一圈约成生成元", "III  the loop is one generator")
    three.text(118, 52, "0.142857 142857 …", size=14, color="dim", anchor="middle")
    lx, ly, lr = 118, 128, 50
    three.circle(lx, ly, lr, color="faint", width=1.2)
    for i, d in enumerate(DIGITS[:6]):
        a = math.radians(90 - 60 * i)
        three.text(lx + lr * math.cos(a), ly - lr * math.sin(a), str(d), size=16, weight=600, anchor="middle", middle=True,
                   halo=True)
    arc = [(lx + (lr + 16) * math.cos(math.radians(a)), ly - (lr + 16) * math.sin(math.radians(a)))
           for a in range(70, -200, -10)]
    three.curve_arrow(arc, "dim", 1.4, head=7)
    three.arrow(lx, ly + lr + 24, lx, ly + lr + 58, "ink", 2.0, head=9)
    three.text(lx, ly + lr + 86, "1/7", size=20, weight=700, anchor="middle")
    assert DIGITS[:6] == [1, 4, 2, 8, 5, 7]
