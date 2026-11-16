"""第五章地图：单位二向量转两次得 −1、平衡和 S = A + B 生出 J、旋转转一圈，旋子停在 −1。
Chapter 5 at a glance: the unit bivector turns twice to give −1, the balanced sum S = A + B gives J, and one full turn of
the rotation leaves the rotor at −1.

Panel I turns e₁ by right multiplication with I = e₁e₂ twice and asserts it ends at −e₁.
Panel II draws the balanced pair as two perpendicular arrows of length 1/√2 (AA* = BB* = ½, cross terms zero), so the
sum S has length 1 (asserted); the square they span is J = 2AB*. This panel is a picture of the algebra, not a
computation with matrices.
Panel III is the double cover of §5.2 in miniature: as θ runs from 0° to 360° the rotation goes once round its circle
while the rotor, whose square it is, goes only from 1 to −1 (asserted).
"""

import cmath
import math

from _ch05 import along, times_bivector, turn_arc

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：原点处一个品红的小方块是单位二向量 I；琥珀色的箭头 e₁ 右乘一次 I 逆时针转 90° 成为 e₂，再乘一次又转 90° 成为 −e₁，两段紫色的弧各标“× I”。"
          "第二栏（示意）：两支互相垂直、长 1/√2 的箭头 A 与 B 拼出长为 1 的紫色斜箭头 S = A + B，落在虚线单位圆上；A 与 B 张出的品红方块是 J = 2AB*。"
          "第三栏：两个圆，左边是旋子，右边是旋转，中间一个箭头标着 z²。θ 从 0° 到 360°：右边的圆被绕满一整圈，回到出发点的琥珀色点；"
          "左边紫色的弧只从 1 走了半圈，停在对面琥珀色的 −1。",
    "en": "Three panels. Panel I: a small magenta square at the origin is the unit bivector I; the amber arrow e₁, multiplied on "
          "the right by I, turns 90° counter-clockwise into e₂, and once more into −e₁; two violet arcs are each marked “× I”. "
          "Panel II (schematic): two perpendicular arrows A and B of length 1/√2 add up to the violet diagonal S = A + B of "
          "length 1, which ends on the dashed unit circle; the magenta square they span is J = 2AB*. Panel III: two circles, the "
          "rotor on the left and the rotation on the right, with an arrow marked z² between them. As θ goes from 0° to 360°, "
          "the right circle is gone round once, back to the amber dot where it started, while the violet arc on the left "
          "goes only half way from 1 and stops opposite, at the amber −1.",
}



def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 262, gap=16)

    # ---- I: two quarter turns
    title(one, "I　*I*^{2} = −1", "I  *I*^{2} = −1")
    ox, oy, R = 118, 150, 86
    one.circle(ox, oy, R, color="faint", width=1.1, dash="3 4")
    one.polygon([(ox, oy), (ox + 26, oy), (ox + 26, oy - 26), (ox, oy - 26)], "area", color="area", width=1.2,
                fill_opacity=0.24)
    one.text(ox + 13, oy + 22, "*I*", size=15, color="area", weight=600, anchor="middle")
    e1 = (1.0, 0.0)
    e2 = times_bivector(e1)
    m1 = times_bivector(e2)
    assert e2 == (0.0, 1.0) or (abs(e2[0]) < 1e-12 and e2[1] == 1.0)
    assert abs(m1[0] + 1) < 1e-12 and abs(m1[1]) < 1e-12
    one.arrow(ox, oy, *along(ox, oy, 90, R), "dim", 2.2)
    one.arrow(ox, oy, *along(ox, oy, 180, R), "ink", 2.4)
    one.arrow(ox, oy, *along(ox, oy, 0, R), "now", 2.6)
    turn_arc(one, ox, oy, 50, 0, 90, "axis", 2.0)
    turn_arc(one, ox, oy, 50, 90, 180, "axis", 2.0)
    one.text(ox + 48, oy - 52, "× *I*", size=13, color="axis", anchor="middle", halo=True)
    one.text(ox - 48, oy - 52, "× *I*", size=13, color="axis", anchor="middle", halo=True)
    one.text(ox + R - 4, oy + 22, "*e*_{1}", size=15, color="now", anchor="middle")
    one.text(ox + 12, oy - R + 6, "*e*_{2}", size=15, color="dim")
    one.text(ox - R + 4, oy + 22, "−*e*_{1}", size=15, color="ink", anchor="middle")

    # ---- II: a balanced sum
    title(two, "II　平衡和生出 *J*", "II  a balanced sum gives *J*")
    ox, oy, S = 52, 220, 160                       # S pixels per unit length
    h = 1 / math.sqrt(2)
    assert abs(h * h + h * h - 1) < 1e-12           # ½ + ½ = 1: |S| = 1 once the cross terms vanish
    ax, by = ox + S * h, oy - S * h
    two.arc(ox, oy, S, 0, 90, "faint", 1.2, dash="3 4")
    two.polygon([(ox, oy), (ax, oy), (ax, by), (ox, by)], "area", color="area", width=1.2, fill_opacity=0.18)
    two.right_angle(ox, oy, 0, 10)
    two.arrow(ox, oy, ax, oy, "ink", 2.4)
    two.arrow(ox, oy, ox, by, "ink", 2.4)
    two.arrow(ox, oy, ax, by, "axis", 2.6)
    two.text(ax - 4, oy + 20, "*A*", size=15, anchor="middle")
    two.text(ox - 12, by + 12, "*B*", size=15, anchor="end")
    two.text(ax + 8, by - 4, "*S* = *A* + *B*", size=14, color="axis")
    two.text((ox + ax) / 2 + 22, (oy + by) / 2 + 30, "*J* = 2*AB*^{*}", size=14, color="area", anchor="middle", halo=True)

    # ---- III: the double cover — squaring the rotor circle onto the rotation circle
    title(three, "III　转一圈，旋子到 −1", "III  one turn, rotor at −1")
    r, cy = 42, 150
    L, Rt = (70, cy), (184, cy)
    three.text(L[0], 78, three.t("旋子", "rotor"), size=14, color="axis", anchor="middle")
    three.text(Rt[0], 78, three.t("旋转", "rotation"), size=14, color="ink", anchor="middle")
    three.circle(*L, r, color="faint", width=1.1)
    three.circle(*Rt, r, color="faint", width=1.1)
    # θ from 0 to 360°: the rotation goes once round, the rotor only from 1 to −1 (z ↦ z² sends one onto the other)
    z = cmath.exp(1j * math.radians(360) / 2)          # rotor at θ = 360°: e^{iθ/2} = e^{iπ}
    assert abs(z + 1) < 1e-12 and abs(z * z - 1) < 1e-12
    turn_arc(three, *L, r, 0, 180, "axis", 2.4, gap=3)
    turn_arc(three, *Rt, r, 0, 360, "ink", 2.0, gap=5)
    three.dot(*along(*L, 0, r), 3.6, "dim", ring="bg")
    three.text(L[0] + r + 6, cy + 18, "1", size=14, color="dim")
    x, y = along(*L, 180, r)
    three.dot(x, y, 5.6, "now", ring="bg")
    three.text(x - 9, y + 5, "−1", size=15, color="now", weight=600, anchor="end")
    x, y = along(*Rt, 0, r)
    three.dot(x, y, 5.6, "now", ring="bg")
    three.arrow(L[0] + 26, 73, Rt[0] - 34, 73, "dim", 1.6)
    three.text((L[0] + Rt[0]) / 2 - 4, 64, "*z* ↦ *z*^{2}", size=13, color="dim", anchor="middle")
    three.text(118, 236, three.t("θ = 0° → 360°", "θ = 0° → 360°"), size=13, color="dim", anchor="middle")
