"""终章地图：内接二十面体、余弦与黄金不动点、十部阅读指南。
The coda at a glance: the inscribed icosahedron, fixed points and the ten-part reading compass.
"""

import math

from _ch24 import PHI, THETA, cobweb
from _coda import defects, parts, wireframe
from _overview import label, title

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "第一栏的正二十面体内接于球，十二个 60° 角亏共 720°，标作经典文献。第二栏有余弦不动点蛛网和分成 φ⁻¹、φ⁻² 的单位条。第三栏把十部排成环，内圈四向对应物理、量子计算、逻辑与数论、内核审计四条阅读线。",
    "en": "Panel I shows a regular icosahedron inscribed in a sphere and its twelve 60° angle defects totaling 720°, tagged as literature. Panel II shows a cosine cobweb at the Dottie point and a unit bar split into φ⁻¹ and φ⁻². Panel III arranges ten parts around the four reading tracks in physics, quantum computing, logic and number theory, and kernel audit.",
}


def polyhedron(panel):
    title(panel, "I　内接二十面体", "I  Inscribed icosahedron")
    cx, cy, radius = 118, 139, 84
    panel.circle(cx, cy, radius, color="dim", fill="cyan", fill_opacity=0.05, width=1.5)
    wireframe(panel, cx, cy, radius)
    angles = defects(1)
    assert len(angles) == 12 and all(math.isclose(angle, 60) for angle in angles)
    assert math.isclose(sum(angles), 720)
    label(panel, 249, "12 × 60° = 720°", "12 × 60° = 720°", color="area", weight=700)
    panel.chip(panel.width - 8, 49, panel.t("文献", "literature"), "argued", anchor="end")


def fixed_points(panel):
    title(panel, "II　余弦与黄金不动点", "II  Cosine & golden fixed points")
    ax = panel.axes(46, 42, 144, 129, (0.42, 0.96), (0.42, 0.96))
    ax.frame()
    ax.plot(lambda x: x, color="dim", width=1.4)
    ax.plot(math.cos, color="line", width=2.1)
    orbit = cobweb(ax, math.cos, 0.9, 13, color="area", start_on_axis=False)
    assert abs(orbit[-1] - THETA) < 0.002 and math.isclose(math.cos(THETA), THETA)
    ax.points([(THETA, THETA)], "ink", r=3.9, ring="bg")
    label(panel, 191, "cos θ∗ = θ∗ ≈ 0.739", "cos θ∗ = θ∗ ≈ 0.739", size=13)

    left, right = 1 / PHI, 1 / PHI**2
    assert math.isclose(left + right, 1) and math.isclose(PHI, 1 + left)
    for start, length, role in ((0, left, "line"), (left, right, "violet")):
        panel.rect(34 + 168 * start, 204, 168 * length, 10, color=role, fill=role, fill_opacity=0.40)
    label(panel, 235, "φ⁻¹ + φ⁻² = 1", "φ⁻¹ + φ⁻² = 1", size=14)
    panel.chip(118, 258, panel.t("LEAN ✓ 不动点锚定", "LEAN ✓ fixed-point anchors"), "lean", anchor="middle")


def compass(panel):
    title(panel, "III　十部阅读指南", "III  Ten-part reading compass")
    groups = parts()
    roman = ("I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X")
    assert len(groups) == len(roman) and [n for group in groups for n in group] == list(range(1, 40))
    cx, cy, radius = 118, 134, 73
    panel.circle(cx, cy, radius, color="faint", width=1.5)
    for i, part in enumerate(roman):
        angle = math.tau * i / len(groups) - math.pi / 2
        x, y = cx + radius * math.cos(angle), cy + radius * math.sin(angle)
        panel.circle(x, y, 16, color="edge", fill="bg")
        panel.text(x, y, panel.t(part, part), size=12, anchor="middle", middle=True)
    spokes = ((0, -38, "line"), (38, 0, "violet"), (0, 38, "area"), (-38, 0, "ink"))
    assert len(spokes) == 4
    for i, (dx, dy, color) in enumerate(spokes, start=1):
        panel.arrow(cx, cy, cx + dx, cy + dy, color, 2, head=7)
        word = str(i)
        panel.text(cx + 1.24 * dx, cy + 1.24 * dy, panel.t(word, word),
                   size=12, color=color, anchor="middle", middle=True, halo=True)
    for i, (zh, en, color) in enumerate((
        ("1 物理", "1 Physics", "line"), ("2 量子计算", "2 Quantum", "violet"),
        ("3 逻辑与数论", "3 Logic & number", "area"), ("4 内核审计", "4 Kernel", "ink"),
    )):
        panel.text(22 + 119 * (i % 2), 242 + 21 * (i // 2), panel.t(zh, en), size=12, color=color)


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)
    polyhedron(one)
    fixed_points(two)
    compass(three)
