"""两次乘 I，任何平面向量都转到自己的反方向：v ↦ vI ↦ vII = −v（第五章 §5.1）。
Multiplying twice by I sends any vector in the plane to its opposite: v ↦ vI ↦ vII = −v (chapter 5, §5.1).

Right multiplication by I = e₁e₂ sends x e₁ + y e₂ to x e₂ − y e₁, a quarter turn counter-clockwise; the
script applies it twice to v and asserts the result is −v, and that the squared length never changes.
"""

import math

from _ch05 import along, times_bivector, turn_arc

SIZE = (460, 320)
ALT = {
    "zh": "平面上一个单位圆。琥珀色的箭头 v 指向右上方；右乘一次 I，它逆时针转 90° 成为灰色的箭头 vI；再乘一次，又转 90°，成为指向左下方的箭头 −v。"
          "两段紫色的弧箭头各标“× I”。原点旁的品红小方块是单位二向量 I = e₁∧e₂。",
    "en": "A unit circle in the plane. The amber arrow v points up and to the right; multiplying on the right by I turns it 90° "
          "counter-clockwise into the grey arrow vI; multiplying again turns it another 90° into −v, pointing down and to the "
          "left. Two violet curved arrows are each marked “× I”. A small magenta square at the origin is the unit bivector "
          "I = e₁∧e₂.",
}

PHI = 28          # direction of v, degrees


def draw(fig):
    t = fig.t
    ox, oy, R = 230, 168, 118
    fig.circle(ox, oy, R, color="faint", width=1.2, dash="3 4")
    fig.line(ox - R - 18, oy, ox + R + 18, oy, "faint", 1.1)
    fig.line(ox, oy + R + 14, ox, oy - R - 14, "faint", 1.1)
    fig.text(ox + R + 20, oy + 18, "*e*_{1}", size=13, color="dim", anchor="end")
    fig.text(ox + 8, oy - R - 2, "*e*_{2}", size=13, color="dim")

    # the unit bivector as a small oriented square at the origin
    s = 30
    fig.polygon([(ox, oy), (ox + s, oy), (ox + s, oy - s), (ox, oy - s)], "area", color="area", width=1.2,
                fill_opacity=0.22)
    fig.text(ox + 8, oy + 22, "*I* = *e*_{1}∧*e*_{2}", size=13, color="area")

    v = (math.cos(math.radians(PHI)), math.sin(math.radians(PHI)))
    vi = times_bivector(v)
    vii = times_bivector(vi)
    assert abs(vii[0] + v[0]) < 1e-12 and abs(vii[1] + v[1]) < 1e-12              # vII = −v
    assert abs(vi[0] * v[0] + vi[1] * v[1]) < 1e-12                                  # each step is a right angle
    for w in (vi, vii):
        assert abs(math.hypot(*w) - 1) < 1e-12                                       # and keeps the length
    deg = [math.degrees(math.atan2(w[1], w[0])) % 360 for w in (v, vi, vii)]
    assert abs(deg[1] - deg[0] - 90) < 1e-9 and abs(deg[2] - deg[1] - 90) < 1e-9

    tips = [along(ox, oy, d, R) for d in deg]
    fig.arrow(ox, oy, *tips[1], "dim", 2.2)
    fig.arrow(ox, oy, *tips[2], "ink", 2.4)
    fig.arrow(ox, oy, *tips[0], "now", 2.6)

    turn_arc(fig, ox, oy, 64, deg[0], deg[1], "axis", 2.0)
    turn_arc(fig, ox, oy, 64, deg[1], deg[2], "axis", 2.0)
    for a, b in ((deg[0], deg[1]), (deg[1], deg[2])):
        x, y = along(ox, oy, (a + b) / 2, 84)
        fig.text(x, y, "× *I*", size=14, color="axis", anchor="middle", middle=True, halo=True)

    x, y = along(ox, oy, deg[0], R + 16)
    fig.text(x, y, "*v*", size=16, color="now", anchor="middle", middle=True)
    x, y = along(ox, oy, deg[1], R + 18)
    fig.text(x, y, "*vI*", size=15, color="dim", anchor="middle", middle=True)
    x, y = along(ox, oy, deg[2], R + 22)
    fig.text(x, y, "*vII* = −*v*", size=15, color="ink", anchor="middle", middle=True, halo=True)
