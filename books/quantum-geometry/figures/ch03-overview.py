"""第三章地图：存在线 P² = P、线与它的对偶平面、一次次记录排成的时间轴。
Chapter 3 at a glance: the idempotent line P² = P, the line and its dual plane, and the records that
line up into a timeline.

Panel I projects an arrow on a line and marks that projecting again does not move the shadow.
Panel II splits a Bloch arrow into its part along e₃ and its part in the equatorial plane ⋆e₃.
Panel III is the three-polarizer cascade 0° → 45° → 90°: each step passes cos²45° = ½, so ¼ in all,
while 0° → 90° directly passes cos²90° = 0 (both asserted).
"""

import math

from tbook import figkit
from _ch03 import along, shadow

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：琥珀色的箭头投到青色的测量线上，留下青色的影子，品红虚线是被去掉的垂直部分；影子旁的小圈箭头表示再投一次影子不动。"
          "第二栏：布洛赫球里竖着一根青色的轴 e₃，赤道上是品红的对偶平面 ⋆e₃；琥珀色的箭头分成沿轴的青色一段和躺在平面里的品红一段。"
          "第三栏：一条向右的时间轴上依次是 0°、45°、90° 三片偏振片 τ₁、τ₂、τ₃，每过一片乘 ½，透过的比例依次是 1、½、¼；"
          "上方的虚线弧表示不插中间那片时，从 0° 直接到 90° 的透过比例是 0。",
    "en": "Three panels. Panel I: an amber arrow is projected onto a cyan measurement line, leaving a cyan shadow; the dashed "
          "magenta segment is the perpendicular part that is removed, and a small loop at the shadow says that projecting again "
          "does not move it. Panel II: a Bloch sphere with a cyan axis e₃ and the magenta dual plane ⋆e₃ at the equator; an amber "
          "arrow splits into a cyan part along the axis and a magenta part in the plane. Panel III: along a timeline pointing right "
          "stand three polarizers τ₁, τ₂, τ₃ at 0°, 45° and 90°; each multiplies the beam by ½, so the transmitted share is 1, ½, ¼. "
          "A dashed arc above says that without the middle one, 0° straight to 90° passes 0.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 262, gap=16)

    # ---- I: the idempotent line
    title(one, "I　存在线 *P*^{2} = *P*", "I  the line *P*^{2} = *P*")
    ox, oy = 34, 206
    tip, foot, s = shadow(one, ox, oy, 18, 78, 150, 192)
    assert abs(s - 150 * math.cos(math.radians(60))) < 1e-9
    # projecting the shadow again: it is already on the line, so nothing moves
    cx, cy = foot[0] + 4, foot[1] + 22
    loop = [(cx + 13 * math.cos(math.radians(a)), cy - 11 * math.sin(math.radians(a))) for a in range(130, 130 + 300, 10)]
    one.curve_arrow(loop, "line", 1.6, head=7)
    one.text(tip[0] + 8, tip[1] + 2, "*x*", size=15, color="now")
    mid = along(ox, oy, 18, s * 0.42)
    one.text(mid[0] + 4, mid[1] + 24, "*Px*", size=15, color="line", anchor="middle")
    one.text(cx + 22, cy + 5, one.t("再投：不动", "again: stays"), size=13, color="dim")
    end = along(ox, oy, 18, 192)
    lab = along(ox, oy, 18, 190)
    one.text(lab[0] - 3, lab[1] - 9, one.t("测量线", "measurement line"), size=13, color="line", anchor="end", rotate=18)

    # ---- II: the line and its dual plane
    title(two, "II　线与对偶平面", "II  line and dual plane")
    sp = two.sphere(118, 146, 82, el=18)
    sp.outline(fill="cyan", fill_opacity=0.03)
    sp.disc((0, 0, 1), "area", fill_opacity=0.16, color="area", width=1.2)
    sp.segment((0, 0, -1.18), (0, 0, 1.18), "line", 1.6)
    v = figkit.sph(50, 62)
    hz = (v[0], v[1], 0.0)
    vz = (0.0, 0.0, v[2])
    sp.segment(v, hz, "dim", 1.2, dash="3 3")
    sp.segment(v, vz, "dim", 1.2, dash="3 3")
    sp.segment((0, 0, 0), vz, "line", 5, cap="round")
    sp.segment((0, 0, 0), hz, "area", 5, cap="round")
    sp.arrow(v, "now", 2.4)
    assert abs(v[2] ** 2 + v[0] ** 2 + v[1] ** 2 - 1) < 1e-12     # line part² + plane part² = 1 on the sphere
    sp.label((0, 0, 1.18), "*e*_{3}", dx=10, dy=4, size=15, color="line")
    two.text(118, 206, "⋆*e*_{3} = *e*_{1}∧*e*_{2}", size=15, color="area", anchor="middle", halo=True)
    sp.label(v, "*r*", dx=8, dy=-2, size=15, color="now")

    # ---- III: records line up into a timeline
    title(three, "III　记录排成时间轴", "III  records in a row")
    y = 150
    xs = [40, 118, 196]
    angles = [0, 45, 90]
    three.arrow(14, y, 228, y, "dim", 1.4, head=8)
    three.text(226, y + 20, "*τ*", size=14, color="dim", anchor="end")
    w = [1.0]
    for a, b in zip(angles, angles[1:]):
        w.append(w[-1] * math.cos(math.radians(b - a)) ** 2)
    assert abs(w[1] - 0.5) < 1e-12 and abs(w[2] - 0.25) < 1e-12
    assert abs(math.cos(math.radians(90 - 0)) ** 2) < 1e-12        # no middle polarizer: nothing passes
    for i, (x, a) in enumerate(zip(xs, angles)):
        three.circle(x, y, 21, color="edge", fill="panel", width=1.4)
        p = along(x, y, a, 15)
        q = along(x, y, a + 180, 15)
        three.line(q[0], q[1], p[0], p[1], "ink", 2.6, cap="round")
        three.text(x, y + 40, f"*τ*_{{{i + 1}}}  {a}°", size=13, color="dim", anchor="middle")
    for i in range(2):
        three.text((xs[i] + xs[i + 1]) / 2, y - 12, "× ½", size=14, color="line", anchor="middle")
    for x, label in zip(xs, ["1", "½", "¼"]):
        three.text(x, y + 66, label, size=15, color="line", weight=600, anchor="middle")
    arc = [(xs[0] + (xs[2] - xs[0]) * k / 40, y - 30 - 46 * math.sin(math.pi * k / 40)) for k in range(41)]
    three.polyline(arc, "dim", 1.3, dash="4 3")
    three.text(118, y - 84, three.t("不插 45°：0", "skip 45°: 0"), size=13, color="dim", anchor="middle")
