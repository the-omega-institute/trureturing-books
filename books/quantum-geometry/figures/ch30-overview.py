"""第三十章地图：内割弦、时间双缝与有限圆弧微积分。
Chapter 30 at a glance: chord shortcuts, temporal interference and finite-arc calculus.
"""

import math
from collections import Counter

from _overview import label, title

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "第一栏对比品红外弧、青色内割弦和垂直弦的矢高。第二栏在势垒内画出转入九十度虚向后的指数衰减，再画双脉冲的频谱梳。第三栏画出有限转角的正弦差商，两块有向三角形的公共边抵消。",
    "en": "Panel I compares a magenta outer arc, a cyan secant chord and the perpendicular sagitta. Panel II shows imaginary-channel exponential decay across a barrier and a two-pulse spectral comb. Panel III shows the finite rotor sine quotient and the cancellation of the shared edge of two oriented triangles.",
}


def secant(panel):
    title(panel, "I　内割弦与外弧", "I  Interior chord and arc")
    cx, cy, r = 118, 150, 82
    theta = math.radians(55)
    half_chord, sagitta = r * math.sin(theta), r * (1 - math.cos(theta))
    y = cy - r * math.cos(theta)
    left, right = (cx - half_chord, y), (cx + half_chord, y)
    assert all(math.isclose(math.dist((cx, cy), end), r) for end in (left, right))
    assert math.dist(left, right) < 2 * theta * r
    assert math.isclose(y - (cy - r), sagitta)

    panel.circle(cx, cy, r, color="faint")
    panel.polygon([(cx, cy), left, right], "cyan", fill_opacity=0.10)
    panel.line(cx, cy, *left, "dim", 1.2)
    panel.line(cx, cy, *right, "dim", 1.2)
    panel.line(cx, y, cx, cy, "dim", 1.2, dash="3 3")
    panel.arc(cx, cy, r, 35, 145, "area", 2.7)
    panel.line(*left, *right, "line", 2.7)
    panel.line(cx, cy - r, cx, y, "area", 2.2)
    panel.right_angle(cx, y, 0, size=7)
    panel.angle(cx, cy, 28, 35, 90, panel.t("θ", "θ"), size=13)
    panel.text(cx, 56, panel.t("外弧 2θ", "Outer arc 2θ"), color="area", anchor="middle")
    panel.text(cx, 181, panel.t("弦 2 sin θ", "Chord 2 sin θ"), color="line", anchor="middle")
    label(panel, 258, "矢高 1 − cos θ", "Sagitta 1 − cos θ", color="area")


def tunnel(panel):
    title(panel, "II　虚弦与时间双缝", "II  Imaginary chord & time slits")
    ax = panel.axes(48, 56, 137, 75, (0, 1), (0, 1.1))
    kappa_l = 1.8
    ax.cv.rect(ax.x, ax.y, ax.w, ax.h, color="dim", fill="violet", fill_opacity=0.09)
    ax.plot(lambda x: math.exp(-kappa_l * x), color="violet", width=2.4)
    ax.points([(0, 1), (1, math.exp(-kappa_l))], "violet", r=3)
    panel.arrow(22, 79, 41, 79, "line", 1.6, head=6)
    panel.arrow(41, 79, 41, 59, "area", 1.6, head=6)
    panel.text(15, 105, panel.t("90°", "90°"), size=13, color="area")
    label(panel, 151, "势垒宽 L · 振幅 exp(−κL)", "Width L · amplitude exp(−κL)", size=13)

    # Equal pulses separated by Δt. The abscissa is ωΔt/(2π).
    spectrum = panel.axes(24, 177, 188, 61, (-3.5, 3.5), (0, 1.08))
    def intensity(frequency):
        envelope = math.exp(-(frequency / 3.3) ** 2)
        return envelope * math.cos(math.pi * frequency) ** 2

    assert all(intensity(k + 0.5) < 1e-24 for k in range(-3, 3))
    assert intensity(0) == 1 and 0 < math.exp(-kappa_l) < 1
    spectrum.hline(0, "dim")
    spectrum.plot(intensity, color="area", width=2)
    label(panel, 261, "频谱梳 · 周期 2π/Δt", "Spectral comb · period 2π/Δt", size=13)


def finite_stokes(panel):
    title(panel, "III　有限步与斯托克斯", "III  Finite steps and Stokes")
    cx, cy, r, aperture = 64, 121, 54, math.pi / 4
    tip = cx + r * math.cos(aperture), cy - r * math.sin(aperture)
    assert math.isclose(math.dist((cx, cy), tip), r)
    panel.arc(cx, cy, r, 0, 65, "violet", 2.3)
    panel.line(cx, cy, cx + r + 4, cy, "dim", 1.2)
    panel.line(cx, cy, *tip, "dim", 1.2, dash="3 3")
    panel.line(tip[0], cy, *tip, "line", 2.6)
    panel.dot(*tip, 3.5, "violet")
    panel.text(158, 84, panel.t("有限开口 ε", "Finite aperture ε"), size=13, anchor="middle")
    panel.text(161, 109, panel.t("sin(κε)/ε", "sin(κε)/ε"), size=15, color="line", anchor="middle")

    vertices = [(47, 159), (188, 159), (188, 222), (47, 222)]
    faces = [(0, 1, 2), (0, 2, 3)]
    edges = Counter()
    for face, role in zip(faces, ("cyan", "violet")):
        panel.polygon([vertices[i] for i in face], role, fill_opacity=0.13)
        for a, b in zip(face, face[1:] + face[:1]):
            edges[a, b] += 1
    boundary = edges - Counter({(b, a): count for (a, b), count in edges.items()})
    assert set(boundary) == {(0, 1), (1, 2), (2, 3), (3, 0)}
    assert Counter(a for a, _ in boundary) == Counter(b for _, b in boundary)
    for a, b in boundary:
        panel.arrow(*vertices[a], *vertices[b], "line", 1.6, head=7)
    x0, y0 = vertices[0]
    x1, y1 = vertices[2]
    for sign, role in ((1, "area"), (-1, "violet")):
        start, end = (0.20, 0.80) if sign == 1 else (0.80, 0.20)
        panel.arrow(x0 + start * (x1 - x0), y0 + start * (y1 - y0) + 6 * sign,
                    x0 + end * (x1 - x0), y0 + end * (y1 - y0) + 6 * sign, role, 1.5, head=7)
    label(panel, 245, "内边相消 · ∂² = 0", "Interior edges cancel · ∂² = 0", size=13)
    panel.chip(118, 268, panel.t("LEAN ✓", "LEAN ✓"), "lean", anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)
    secant(one)
    tunnel(two)
    finite_stokes(three)
