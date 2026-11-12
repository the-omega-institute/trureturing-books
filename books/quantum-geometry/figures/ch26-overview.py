"""第二十六章地图：纯态在球面、迹一正半定在球内；夹心积让轴上的影子不动、平面里的那份转整角；三段 ZYZ 转动编译成一枚旋子。
Chapter 26 at a glance: pure states on the shell and trace-one positive semidefinite matrices inside; the sandwich keeps
the shadow on the axis and turns the in-plane part by the whole angle; three ZYZ turns compile into one rotor.

Panel I: the shell and the ball are the two cited theorems (green). Panel II: v at 60° from z turned by
θ = 90° about z with the sandwich, computed with the chapter's rotor; the shadow on z is unchanged.
Panel III: e₁ carried by R_z(γ), then R_y(β), then R_z(α) for the chapter's (0.37, −0.81, 0.52), each turn
sampled with partial rotors; the end point is checked against the first column of the printed ZYZ matrix.
"""

import math

from tbook import figkit
from _ch26 import ANGLES, apply, check_example, rotor, title

SIZE = (740, 290)
WRAP = True
ALT = {
    "zh": "三栏。左栏：绿色的布洛赫球，琥珀色的箭头伸到球面，旁注“纯态 |r| = 1”；球里一个墨色的点，旁注“迹一正半定 |r| ≤ 1”。"
          "中栏：紫色的竖轴 z，灰色的箭头 v 与竖轴成 60°，它在轴上的青色影子不动；v 的横向那份在一个水平圆盘里扫过品红的 90° 扇形，"
          "虚线把扇形分成两个 45°，琥珀色的箭头是转完的 R v R̃。右栏：紫色的 z 轴与 y 轴，白色的起点 e₁ 在赤道上，"
          "琥珀色的路分三段：先绕 z 沿赤道走一小段，再绕 y 向上抬，最后再绕 z 走一小段，停在琥珀色箭头 R e₁ R̃ 的尖上。",
    "en": "Three panels. Panel I: a green Bloch ball; an amber arrow reaches the shell, marked “pure |r| = 1”, and a dark point "
          "inside is marked “trace-one PSD |r| ≤ 1”. Panel II: the violet vertical axis z; the grey arrow v at 60° from it keeps its cyan "
          "shadow on the axis while its sideways part sweeps a magenta 90° sector in a horizontal disc, split by a dashed line "
          "into two 45° halves; the amber arrow is the turned R v R̃. Panel III: the violet z and y axes, the white starting "
          "point e₁ on the equator, and an amber path in three legs — a short way along the equator about z, a lift about y, "
          "and a short way about z again — ending at the tip of the amber arrow R e₁ R̃.",
}


def panel_ball(p):
    title(p, "I　球面与球内", "I  shell and ball")
    sp = p.sphere(112, 158, 96, az=110, el=18)
    sp.outline(color="lean", width=2.2, fill="lean", fill_opacity=0.12)
    sp.great_circle((0, 0, 1), "faint", 1.1)
    pure = figkit.sph(40, 60)
    sp.arrow(pure, "now", 2.6)
    sp.dot(pure, "now", 4.6, ring="bg")
    mixed = tuple(0.45 * c for c in figkit.sph(115, 200))
    sp.dot(mixed, "ink", 4.6, ring="bg")
    x, y = sp.xy(pure)
    p.text(x + 6, y - 10, p.t("纯态 |*r*| = 1", "pure |*r*| = 1"), size=13, color="now", weight=600, halo=True)
    x, y = sp.xy(mixed)
    p.text(x - 2, y + 22, p.t("迹一正半定 |*r*| ≤ 1", "trace-one PSD |*r*| ≤ 1"), size=13, color="ink", halo=True, anchor="middle")
    assert abs(sum(c * c for c in pure) - 1) < 1e-12 and sum(c * c for c in mixed) < 1


def panel_sandwich(p):
    title(p, "II　轴上不动，平面里转整角", "II  axis fixed, plane turned")
    sp = p.sphere(118, 160, 92, az=110, el=40)
    sp.outline(color="faint", width=1.2, fill=None)
    theta = math.pi / 2
    v = figkit.sph(60, -30)
    w = apply(rotor("z", theta), v)
    assert abs(w[2] - v[2]) < 1e-12                                      # the shadow on z does not move
    ang = math.degrees(math.atan2(w[1], w[0]) - math.atan2(v[1], v[0]))
    assert abs(ang - 90) < 1e-9                                            # the plane turns by the whole θ
    h = v[2]
    rad = math.hypot(v[0], v[1])
    phi0 = math.atan2(v[1], v[0])
    ring = [(rad * math.cos(phi0 + theta * i / 30), rad * math.sin(phi0 + theta * i / 30), h) for i in range(31)]
    p.polygon([sp.xy((0, 0, h))] + [sp.xy(q) for q in ring], "area", color="area", width=1.4, fill_opacity=0.2)
    half = (rad * math.cos(phi0 + theta / 2), rad * math.sin(phi0 + theta / 2), h)
    p.line(*sp.xy((0, 0, h)), *sp.xy(half), "area", 1.2, dash="3 3")
    sp.segment((0, 0, -1.15), (0, 0, 1.15), "axis", 2.0)
    sp.label((0, 0, 1), "*z*", dy=-12, size=14, color="axis", anchor="middle")
    sp.segment((0, 0, 0), (0, 0, h), "line", 3.4)
    sp.arrow(v, "dim", 2.0)
    sp.arrow(w, "now", 2.6)
    sp.label(v, "*v*", dx=-8, dy=4, size=14, color="dim", anchor="end", halo=True)
    sp.label(w, "*RvR*", dx=6, dy=-6, size=14, color="now", weight=600)
    # Draw the reverse tilde above the final R as a curve, also in PDF.
    x, y = sp.xy(w)
    x, y = x + 6 + figkit.text_width("Rv", 14) + 1, y - 18
    p.path(f"M{x} {y} c2 -3 4 3 7 0", "now", 1.2)
    p.text(118, 280, p.t("半角 + 半角 = θ", "half + half = θ"), size=13, color="area", anchor="middle")


def panel_zyz(p):
    title(p, "III　三段转成一枚旋子", "III  three turns, one rotor")
    R = check_example()
    a, b, g = ANGLES
    sp = p.sphere(118, 160, 96, az=120, el=18)
    sp.outline(color="dim", width=1.4)
    sp.great_circle((0, 0, 1), "faint", 1.1)
    for ax, name in (((0, 0, 1), "*z*"), ((0, 1, 0), "*y*")):
        sp.segment(tuple(-1.12 * c for c in ax), tuple(1.12 * c for c in ax), "axis", 1.8)
        sp.label(ax, name, scale=1.24, size=14, color="axis", anchor="middle", middle=True)
    start = (1.0, 0.0, 0.0)
    path = [start]
    cur = start
    for axis, angle in (("z", g), ("y", b), ("z", a)):
        seg = [apply(rotor(axis, angle * i / 24), cur) for i in range(1, 25)]
        path += seg
        cur = seg[-1]
    end = apply(R, start)
    assert all(abs(cur[i] - end[i]) < 1e-12 for i in range(3))
    assert all(abs(end[i] - m) < 1e-6 for i, m in enumerate((0.378188, 0.679631, 0.628550)))
    sp.curve(path, "now", 2.6)
    sp.dot(start, "ink", 4.6, ring="bg")
    sp.label(start, "*e*_{1}", dx=-10, dy=6, size=14, color="ink", anchor="end")
    sp.arrow(end, "now", 2.6)
    sp.label(end, "*Re*_{1}*R*", dx=8, dy=-4, size=14, color="now", weight=600)
    x, y = sp.xy(end)
    x, y = x + 8 + figkit.text_width("Re", 14) + figkit.text_width("1", 14 * 0.72) + 1, y - 16
    p.path(f"M{x} {y} c2 -3 4 3 7 0", "now", 1.2)
    p.text(118, 280, "(α, β, γ) = (0.37, −0.81, 0.52)", size=13, color="dim", anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 290, gap=16)
    panel_ball(one)
    panel_sandwich(two)
    panel_zyz(three)
