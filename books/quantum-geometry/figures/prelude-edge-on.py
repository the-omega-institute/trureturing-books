"""贴着桌面看转盘：90° 与 270° 两个时刻的影子都在 0，下一刻却一个往左、一个往右。
The turntable seen edge-on: at 90° and at 270° the shadow is at 0 both times, yet the next moment one
runs left and the other right.

Top: the disc seen from above, turning counter-clockwise; the direction b at θ = 90° and at θ = 270°,
with its velocity. Bottom: what an eye level with the table sees, the shadow x = cos θ on a segment.
The velocity of the shadow is −sin θ: −1 at 90°, +1 at 270° (asserted).
"""

import math

SIZE = (420, 330)
ALT = {
    "zh": "上方是从上往下看的转盘：品红的圆盘逆时针转，琥珀色的方向 b 画了两个时刻，θ = 90°（圆顶）与 θ = 270°（圆底），"
          "各带一支切向的速度小箭头，一支向左、一支向右。两条虚线把它们向下投到底部青色的线段上，都落在正中 0 处；"
          "那里有两支小箭头，上面一支向左标着 cos 90° = 0，下面一支向右标着 cos 270° = 0。",
    "en": "Top: the turntable seen from above, a magenta disc turning counter-clockwise, with the amber direction b drawn at two "
          "moments, θ = 90° (top of the circle) and θ = 270° (bottom), each with a small tangent velocity arrow, one pointing "
          "left and one right. Dashed lines drop both onto the cyan segment at the bottom, where they land on the same point 0; "
          "there two small arrows point left (labelled cos 90° = 0) and right (cos 270° = 0).",
}


def draw(fig):
    t = fig.t
    cx, cy, R = 210, 122, 88
    fig.circle(cx, cy, R, color="area", fill="area", fill_opacity=0.12, width=1.4)
    loop = [(cx + (R + 12) * math.cos(math.radians(a)), cy - (R + 12) * math.sin(math.radians(a))) for a in range(-30, 31, 3)]
    fig.curve_arrow(loop, "area", 1.6, head=8)
    fig.text(cx + R + 24, cy + 4, "*ω*", size=14, color="area")
    fig.dot(cx, cy, 3, "dim")
    base = 292
    fig.line(cx - R, base, cx + R, base, "line", 3.4, cap="round")
    for th, side in ((90, -1), (270, 1)):
        a = math.radians(th)
        px, py = cx + R * math.cos(a), cy - R * math.sin(a)
        vx = -math.sin(a)                                       # d/dθ cos θ: the shadow's velocity
        assert abs(vx - side) < 1e-12 and abs(math.cos(a)) < 1e-12
        fig.arrow(cx, cy, px, py, "now", 2.4)
        fig.arrow(px, py, px + 40 * vx, py, "now", 1.8, head=7)
        fig.text(px + 10 * (1 if th == 90 else -1) + (0 if th == 90 else 0), py + (-10 if th == 90 else 22),
                 f"*θ* = {th}°", size=13, color="now", anchor="start" if th == 90 else "end")
        yy = base - 14 if th == 90 else base + 14
        fig.arrow(cx, yy, cx + 34 * vx, yy, "line", 2.0, head=8)
        fig.text(cx + 40 * vx, yy + 5, f"cos {th}° = 0", size=13, color="line", anchor="end" if vx < 0 else "start")
    fig.line(cx, cy + R + 4, cx, base - 4, "dim", 1.1, dash="3 4")
    fig.dot(cx, base, 5, "line", ring="bg")
    fig.text(cx - R - 8, cy + 4, t("从上看", "from above"), size=13, color="dim", anchor="end")
    fig.text(cx - R - 8, base + 5, t("贴桌看", "edge-on"), size=13, color="dim", anchor="end")
