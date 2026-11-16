"""第九章地图：三根正交轴与三块正交面、从北极出发先倾后拧的两角寻址、六根有理轴的十二个球冠盖满球面。
Chapter 9 at a glance: three orthogonal axes and three orthogonal planes, two-angle addressing from the north
pole (tilt, then twist), and the twelve caps of the six rational axes covering the sphere.

Panel I draws e₁, e₂, e₃ and the three discs they span pairwise; the script asserts the axes are orthonormal.
Panel II turns N about e₂ by θ and then about e₃ by φ and asserts that the end point is
(sin θ cos φ, sin θ sin φ, cos θ). Panel III draws the 45° caps about ±aᵢ/√5 for the six rational axes and
asserts on a grid of the sphere that every point lies in some colour (the cover the chapter cites with lean=).
"""

import math

from tbook import figkit
from _ch09 import SIX_AXES, in_color, title

SIZE = (740, 270)
WRAP = True
ALT = {
    "zh": "三栏，各是一颗球。第一栏：三支紫色的箭头 e₁、e₂、e₃ 两两垂直，三块品红的圆盘是它们两两张成的平面 I_x、I_y、I_z。"
          "第二栏：琥珀色的点从北极 N 出发，先沿子午线倾转 θ，再沿虚线的纬度圈拧转 φ，停在目标点上。"
          "第三栏：六根有理轴各在两端套一个 45° 的球冠，共十二个，涂在球面上，把整颗球盖满，前半球颜色实、后半球淡；含琥珀色点 x 的三个球冠是青色，标着 0、2、4，其余是灰色；底部一枚绿色标签 LEAN ✓。",
    "en": "Three panels, each a sphere. Panel I: three violet arrows e₁, e₂, e₃, mutually perpendicular; three magenta discs are "
          "the planes I_x, I_y, I_z they span in pairs. Panel II: the amber point leaves the north pole N, tilts by θ along a "
          "meridian and then twists by φ along the dashed latitude circle, stopping at the target. Panel III: each of the six "
          "rational axes carries a 45° cap at both ends, twelve in all, painted on the sphere and covering it, solid on the "
          "near half and faint on the far half; the three caps holding the amber point x are cyan and numbered 0, 2, 4, the "
          "rest grey; a green LEAN ✓ tag sits at the bottom.",
}

THETA, PHI = 60, 75           # panel II, degrees


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 270, gap=16)
    E = ((1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0))
    for i in range(3):
        for j in range(3):
            assert figkit.dot3(E[i], E[j]) == (1.0 if i == j else 0.0)

    # ---- I: three axes, three planes
    title(one, "I　三轴与三块正交面", "I  three axes, three planes")
    sp = one.sphere(118, 152, 84, el=20)
    for n in E:
        sp.disc(n, "area", fill_opacity=0.10, color="area", width=1.1)
    for e in E:
        sp.segment((0, 0, 0), tuple(-c for c in e), "axis", 1.2, dash="3 3")
        sp.arrow(e, "axis", 2.4, scale=1.12)
    sp.label(E[0], "*e*_{1}", scale=1.12, dx=-6, dy=16, size=15, color="axis", anchor="end")
    sp.label(E[1], "*e*_{2}", scale=1.12, dx=6, dy=-6, size=15, color="axis")
    sp.label(E[2], "*e*_{3}", scale=1.12, dx=8, dy=4, size=15, color="axis")
    sp.label((0.62, 0.62, 0), "*I*_{z}", size=14, color="area", anchor="middle", middle=True, halo=True)
    sp.label((0.0, 0.62, 0.62), "*I*_{x}", size=14, color="area", anchor="middle", middle=True, halo=True)
    sp.label((0.55, 0.0, 0.7), "*I*_{y}", dx=-4, size=14, color="area", anchor="end", middle=True, halo=True)

    # ---- II: tilt once, twist once
    title(two, "II　倾一次、拧一次", "II  tilt once, twist once")
    sp = two.sphere(118, 152, 84, el=20)
    sp.outline()
    N = (0.0, 0.0, 1.0)
    p1 = figkit.rotate(N, E[1], THETA)
    p2 = figkit.rotate(p1, E[2], PHI)
    assert max(abs(p2[k] - figkit.sph(THETA, PHI)[k]) for k in range(3)) < 1e-12
    sp.small_circle(E[2], THETA, "faint", 1.2, dash="3 4")
    sp.great_circle(E[1], "faint", 1.0)
    sp.path([N, p1], "now", 2.4, arrow=True)
    lat = [figkit.rotate(p1, E[2], PHI * k / 60) for k in range(61)]
    sp.curve(lat, "now", 2.4)
    (xa, ya), (xb, yb) = sp.xy(lat[-2]), sp.xy(lat[-1])
    two.arrow_head(xb, yb, math.degrees(math.atan2(-(yb - ya), xb - xa)), "now", head=8)
    sp.dot(N, "dim", 4, ring="bg")
    sp.dot(p2, "now", 5, ring="bg")
    sp.label(N, "*N*", dx=8, dy=-6, size=15, color="dim")
    mid = figkit.slerp(N, p1, 0.5)
    sp.label(mid, "θ", dx=-10, size=15, color="now", anchor="end", middle=True, halo=True)
    sp.label(figkit.rotate(p1, E[2], PHI / 2), "φ", dy=13, size=15, color="now", anchor="middle", middle=True, halo=True)

    # ---- III: six rational axes, twelve caps, painted on the sphere
    title(three, "III　六根有理轴盖满球面", "III  six rational axes cover it")
    sp = three.sphere(118, 146, 80, el=20)
    for k in range(40):
        for m in range(80):
            x = figkit.sph(180 * (k + 0.5) / 40, 360 * m / 80)
            assert any(in_color(x, i) for i in range(6))
    X = (math.sqrt(6) / 4, math.sqrt(6) / 4, 0.5)          # the chapter's example point
    held = [i for i in range(6) if in_color(X, i)]
    assert held == [0, 2, 4]
    assert figkit.dot3(X, sp.toward) > 0
    T = sp.toward

    def ring(v):
        """The rim of the 45° cap about the unit vector v."""
        a = figkit.unit(figkit.cross(v, (0.0, 0.0, 1.0) if abs(v[2]) < 0.9 else (1.0, 0.0, 0.0)))
        b = figkit.cross(v, a)
        c = math.sqrt(0.5)
        return [tuple(v[i] * c + c * (a[i] * math.cos(t) + b[i] * math.sin(t)) for i in range(3))
                for t in (2 * math.pi * j / 96 for j in range(96))]

    def front(p):
        """p itself when it faces the reader, else its radial projection onto the rim of the disc."""
        d = figkit.dot3(p, T)
        if d >= 0:
            return p
        return figkit.unit(tuple(p[i] - d * T[i] for i in range(3)))

    caps = []
    for i, a in enumerate(SIX_AXES):
        u = figkit.unit(a)
        for s in (1, -1):
            v = tuple(s * c for c in u)
            caps.append((i in held and figkit.dot3(v, X) > 0, i, v))
    sp.outline(fill="panel", fill_opacity=1.0)
    # the far half: every cap shows through faintly, without an outline
    for hot, i, v in caps:
        three.polygon([sp.xy(p) for p in ring(v)], "line" if hot else "dim", fill_opacity=0.05)
    # the near half: the visible part of each cap is painted, grey caps first, the three caps that hold x on top
    for hot, i, v in sorted(caps, key=lambda c: c[0]):
        pts = ring(v)
        if max(figkit.dot3(p, T) for p in pts) < 0:
            continue
        three.polygon([sp.xy(front(p)) for p in pts], "line" if hot else "dim", fill_opacity=0.30 if hot else 0.16)
        sp.curve(pts + pts[:1], "line" if hot else "dim", 1.6 if hot else 1.1, back=False)
    sp.outline(fill=None)
    for hot, i, v in caps:
        if hot:
            sp.label(v, str(i), size=14, weight=700, color="line", anchor="middle", middle=True, halo=True)
    sp.dot(X, "now", 4.4, ring="bg")
    sp.label(X, "*x*", dx=7, dy=-6, size=15, color="now", halo=True)
    three.chip(118, 254, "LEAN ✓", "lean", anchor="middle")
