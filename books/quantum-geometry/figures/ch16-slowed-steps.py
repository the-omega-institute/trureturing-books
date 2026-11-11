"""把步子调慢一点，整数步正好落在目标上：p = 1/16 时原步长三步越过 W，调到 θ_r = π/14 后三步正好到 W。
Slow the step a little and whole steps land exactly on the target: for p = 1/16 three original steps overshoot
W, while three steps of θ_r = π/14 reach it exactly.

Left: angles (2k + 1)θ with θ = arcsin √p, k = 0 … n. Right: the same with θ_r = arcsin √r,
r = sin²(π/(4n + 2)), n = ⌈π/(4θ) − ½⌉₊ = 3, as in the chapter's corollary and table.
"""

import math

from _ch16 import queries

SIZE = (536, 290)
WRAP = True
ALT = {
    "zh": "两栏，都是成功方向 W 朝上、失败方向 B 朝右的四分之一圆。左栏 p = 1/16，θ ≈ 14.48°：点依次落在 14.5°、43.4°、72.4°，"
          "第三步后的琥珀色箭头到了 101.3°，越过 W，品红的弧是多转的 11.3°。右栏把每步调慢到 θ_r = 180°/14 ≈ 12.86°："
          "点落在 12.9°、38.6°、64.3°，第三步后的琥珀色箭头正好落在 W 上。",
    "en": "Two panels, each a quarter circle with the success direction W up and the failure direction B to the right. Left, "
          "p = 1/16 and θ ≈ 14.48°: the dots fall at 14.5°, 43.4° and 72.4°, and after the third step the amber arrow is at "
          "101.3°, past W; a magenta arc marks the extra 11.3°. Right, each step is slowed to θ_r = 180°/14 ≈ 12.86°: the dots "
          "fall at 12.9°, 38.6° and 64.3°, and after the third step the amber arrow lands exactly on W.",
}


def panel(p, th, n, title, foot):
    t = p.t
    cx, cy, R = 60, 236, 166

    def P(deg, r=1.0):
        a = math.radians(deg)
        return cx + R * r * math.cos(a), cy - R * r * math.sin(a)

    p.text(p.width / 2, 22, t(*title), size=14, weight=600, anchor="middle")
    p.arc(cx, cy, R, 0, 110, "faint", 1.2, dash="3 4")
    p.line(cx, cy, cx + R + 16, cy, "dim", 1.3)
    p.line(cx, cy, cx, cy - R - 14, "dim", 1.3)
    p.text(cx + R + 20, cy + 5, "*B*", size=14, color="dim")
    p.text(cx - 8, cy - R - 6, "*W*", size=14, color="dim", anchor="end")

    angles = [(2 * k + 1) * th for k in range(n + 1)]
    for a0, a1 in zip(angles, angles[1:]):
        pts = [P(a0 + (a1 - a0) * i / 24, 1.0) for i in range(3, 22)]
        p.curve_arrow(pts, "axis", 1.8, head=8)
    x0, y0 = P(angles[0])
    p.arrow(cx, cy, x0, y0, "ink", 1.6, dash="4 3")
    for a in angles[:-1]:
        x, y = P(a)
        p.dot(x, y, 4.4, "ink", ring="bg")
    end = angles[-1]
    if end > 90 + 1e-9:
        p.arc(cx, cy, R, 90, end, "area", 4.2)
        p.text(cx + 10, cy - R - 6, f"+{end - 90:.1f}°", size=14, color="area", halo=True)
    xe, ye = P(end)
    p.arrow(cx, cy, xe, ye, "now", 3.0)
    p.text(cx + R / 2, cy + 26, t(*foot), size=14, color="dim", anchor="middle")


def draw(fig):
    left, right = fig.row([260, 260], 290, gap=16)
    p = 1 / 16
    n, q = queries(p)
    assert (n, q) == (3, 7)
    th = math.degrees(math.asin(math.sqrt(p)))
    r = math.sin(math.pi / (4 * n + 2)) ** 2
    assert abs(r - 0.049515566048790434) < 1e-15 and abs(r / p - 0.7922490567806469) < 1e-12
    thr = math.degrees(math.asin(math.sqrt(r)))
    assert abs((2 * n + 1) * thr - 90) < 1e-9 and (2 * n + 1) * th > 90
    panel(left, th, n, ("原步长：越过 *W*", "original step: past *W*"), ("*θ* ≈ 14.48°", "*θ* ≈ 14.48°"))
    panel(right, thr, n, ("调慢之后：正好到 *W*", "slowed: exactly on *W*"), ("*θ*_{r} = 180°/14", "*θ*_{r} = 180°/14"))
