"""第五章地图：单位二向量转两次得 −1、平衡和 S = A + B 生出 J、旋子从两侧各转半角。
Chapter 5 at a glance: the unit bivector turns twice to give −1, the balanced sum S = A + B gives J, and the rotor
turns half the angle from each side.

Panel I turns e₁ by right multiplication with I = e₁e₂ twice and asserts it ends at −e₁.
Panel II draws the balanced pair as two perpendicular arrows of length 1/√2 (AA* = BB* = ½, cross terms zero), so the
sum S has length 1 (asserted); the square they span is J = 2AB*. This panel is a picture of the algebra, not a
computation with matrices.
Panel III turns v about the vertical axis n̂ by θ: the part along the axis stays, the part in the plane B turns by
θ/2 from the left and θ/2 from the right (asserted against a direct rotation).
"""

import math

from tbook import figkit
from _ch05 import along, times_bivector, turn_arc

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：原点处一个品红的小方块是单位二向量 I；琥珀色的箭头 e₁ 右乘一次 I 逆时针转 90° 成为 e₂，再乘一次又转 90° 成为 −e₁，两段紫色的弧各标“× I”。"
          "第二栏（示意）：两支互相垂直、长 1/√2 的箭头 A 与 B 拼出长为 1 的紫色斜箭头 S = A + B，落在虚线单位圆上；A 与 B 张出的品红方块是 J = 2AB*。"
          "第三栏：一颗球，紫色的竖轴是转轴 n̂，赤道上品红的圆盘是转动平面 B；灰色的箭头 v 绕轴转过 θ 成为琥珀色的 v′，沿轴的青色一段不动，"
          "平面里的那一份先后转过两个 θ/2。",
    "en": "Three panels. Panel I: a small magenta square at the origin is the unit bivector I; the amber arrow e₁, multiplied on "
          "the right by I, turns 90° counter-clockwise into e₂, and once more into −e₁; two violet arcs are each marked “× I”. "
          "Panel II (schematic): two perpendicular arrows A and B of length 1/√2 add up to the violet diagonal S = A + B of "
          "length 1, which ends on the dashed unit circle; the magenta square they span is J = 2AB*. Panel III: a sphere with "
          "the violet vertical axis n̂ and the magenta disc of the plane B at the equator; the grey arrow v turns by θ about "
          "the axis into the amber v′; the cyan part along the axis stays, and the part in the plane turns by θ/2 twice.",
}

THETA = 120        # panel III: the whole turn, degrees


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

    # ---- III: the rotor sandwich
    title(three, "III　旋子：θ/2 + θ/2", "III  rotor: θ/2 + θ/2")
    sp = three.sphere(118, 146, 84, el=20)
    sp.outline()
    sp.disc((0, 0, 1), "area", fill_opacity=0.14, color="area", width=1.1)
    sp.segment((0, 0, -1.25), (0, 0, 1.25), "axis", 2.0)
    sp.label((0, 0, 1.25), "*n̂*", dx=10, dy=4, size=15, color="axis")
    v = figkit.sph(52, -60)
    w = figkit.rotate(v, (0, 0, 1), THETA)
    # the sandwich: the axis part commutes with B and stays; the plane part turns by θ/2 twice
    par = (v[0], v[1], 0.0)
    half = figkit.rotate(par, (0, 0, 1), THETA / 2)
    full = figkit.rotate(half, (0, 0, 1), THETA / 2)
    assert max(abs(full[k] + (0, 0, v[2])[k] - w[k]) for k in range(3)) < 1e-12
    sp.segment((0, 0, 0), (0, 0, v[2]), "line", 5, cap="round")
    for a0, a1 in ((0, THETA / 2), (THETA / 2, THETA)):
        pts = [figkit.rotate(par, (0, 0, 1), a0 + (a1 - a0) * k / 24) for k in range(25)]
        pts = [(p[0] * 0.66, p[1] * 0.66, 0.0) for p in pts]
        sp.curve(pts, "axis", 2.0)
        (xa, ya), (xb, yb) = sp.xy(pts[-2]), sp.xy(pts[-1])
        three.arrow_head(xb, yb, math.degrees(math.atan2(-(yb - ya), xb - xa)), "axis", head=7)
    a = figkit.rotate(par, (0, 0, 1), 0)
    sp.label((a[0] * 0.66, a[1] * 0.66, 0), "θ/2", dx=-8, dy=12, size=13, color="axis", anchor="end", halo=True)
    b = figkit.rotate(par, (0, 0, 1), THETA)
    sp.label((b[0] * 0.66, b[1] * 0.66, 0), "θ/2", dx=8, dy=4, size=13, color="axis", halo=True)
    lat = [figkit.rotate(v, (0, 0, 1), THETA * k / 48) for k in range(49)]
    sp.curve(lat, "now", 1.4, dash="4 3")
    sp.arrow(v, "dim", 2.2)
    sp.arrow(w, "now", 2.6)
    sp.label(v, "*v*", dx=-12, dy=2, size=15, color="dim", anchor="end")
    sp.label(w, "*v*′", dx=10, dy=0, size=15, color="now")
