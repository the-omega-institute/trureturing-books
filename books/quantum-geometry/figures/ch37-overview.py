"""第三十七章地图：双卡有理旋子步、跨场蝴蝶舒尔桥与等节拍堆测地线后的阻尼步。
Chapter 37 at a glance: a Shadow-MRP rotor step, a cross-field butterfly Schur bridge
and a damped proposal after uniform heap-geodesic steps.
"""

import cmath
import math
from fractions import Fraction

from _overview import label, title
from tbook.figkit import cross, dot3

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "第一栏将三维单位球投影成圆盘：青色双分母有理旋子积无需 RMSNorm 就落在盘内，品红色平直相加步越出盘外。第二栏以跨距 1、2、4 的三层蝴蝶桥耦合八个三维概念场，绿色标签标出舒尔二次极小的代数依据。第三栏的五个等节拍自由堆反射步之后，非零阻尼提议步落在末态周围的虚线自指阈值圆内，触发停步。",
    "en": "Panel I projects the 3D unit ball onto a disk. The cyan two-denominator Shadow-MRP product stays inside without RMSNorm, while the magenta flat addition step leaves the disk. Panel II couples eight parallel 3D concept fields across butterfly strides 1, 2 and 4. The green chip marks the Schur quadratic minimum. Panel III shows five equal free heap-reflection steps, followed by a nonzero damped proposal inside the dashed self-reference threshold circle around the last state, triggering halting.",
}


def norm_sq(vector):
    return dot3(vector, vector)


def shadow_mrp(panel):
    title(panel, "I　双卡有理旋子步", "I  Shadow-MRP rotor step")
    sigma_a = (Fraction(3, 4), Fraction(0), Fraction(0))
    sigma_b = (Fraction(1, 2), Fraction(1, 2), Fraction(0))
    aa, bb = norm_sq(sigma_a), norm_sq(sigma_b)
    assert aa < 1 and bb < 1
    tangent = tuple(a + b for a, b in zip(sigma_a, sigma_b))
    numerator = tuple((1 - aa) * b + (1 - bb) * a + 2 * c
                      for a, b, c in zip(sigma_a, sigma_b, cross(sigma_a, sigma_b)))
    d_plus = 1 + aa * bb - 2 * dot3(sigma_a, sigma_b)
    d_minus = norm_sq(tangent)
    assert d_plus + d_minus == (1 + aa) * (1 + bb) >= 1
    assert max(d_plus, d_minus) >= Fraction(1, 2)
    assert norm_sq(numerator) == d_plus * d_minus
    denominator = d_plus if d_plus >= d_minus else -d_minus
    product = tuple(component / denominator for component in numerator)
    assert norm_sq(product) == min(d_plus, d_minus) / max(d_plus, d_minus) <= 1
    assert d_minus > 1 and tangent[2] == 0

    cx, cy, r = 104, 133, 69

    def point(vector):
        return cx + r * float(vector[0]), cy - r * float(vector[1])

    panel.circle(cx, cy, r, color="dim", width=1.7)
    panel.text(cx, 49, "‖σ‖ ≤ 1", size=13, color="dim", anchor="middle")
    for landing, color in ((product, "line"), (tangent, "area")):
        panel.arrow(*point(sigma_a), *point(landing), color, 2.3, head=8)
        panel.dot(*point(landing), 3.7, color, ring="bg")
    panel.dot(*point(sigma_a), 3.7, "now", ring="bg")
    panel.text(219, 84, panel.t("平直相加", "Flat sum"), size=13, color="area", anchor="end")
    panel.text(cx, 168, panel.t("旋子积", "Rotor product"), size=13, color="line", anchor="middle")
    label(panel, 228, "‖σ_{A} ⋆_{S} σ_{B}‖ ≤ 1", "‖σ_{A} ⋆_{S} σ_{B}‖ ≤ 1", weight=700)
    label(panel, 253, "手工推导 · 零 RMSNorm", "Exact · zero RMSNorm", size=13, color="dim")


def butterfly(panel):
    title(panel, "II　跨场蝴蝶舒尔桥", "II  Butterfly Schur bridge")
    stages = 3
    fields = 2**stages
    assert fields == 8
    cross_edges = [(stage, row, row ^ (1 << stage)) for stage in range(stages) for row in range(fields)]
    assert len(cross_edges) == fields * 3 == 24 < fields * (fields - 1)

    def point(stage, row):
        return 19 + 66 * stage, 68 + 20 * row

    for stage in range(stages):
        stride = 1 << stage
        panel.text(52 + 66 * stage, 47, panel.t(f"跨距 {stride}", f"Stride {stride}"),
                   size=12, color="dim", anchor="middle")
        for row in range(fields):
            panel.line(*point(stage, row), *point(stage + 1, row), "dim", 1.1)
    for stage, row, partner in cross_edges:
        panel.line(*point(stage, row), *point(stage + 1, partner), "violet", 1.5)
    for stage in range(stages + 1):
        for row in range(fields):
            panel.dot(*point(stage, row), 3.3, "line", ring="bg")
    label(panel, 232, "K = 8 场 · O(K log₂ K)", "K = 8 fields · O(K log₂ K)", size=13, weight=700)
    panel.chip(118, 258, panel.t("LEAN ✓ 舒尔二次极小", "LEAN ✓ Schur minimum"), "lean", anchor="middle")


def geodesic(panel):
    title(panel, "III　等节拍堆测地线", "III  Uniform heap geodesic")
    cx, cy, r = 118, 168, 88
    theta, count, first = math.radians(132), 5, math.radians(24)
    cadence = theta / count
    states = [cmath.exp(1j * (first + j * cadence)) for j in range(count + 1)]
    assert all(cmath.isclose(p, q * old.conjugate() * q)
               for old, q, p in zip(states, states[1:], states[2:]))
    proposal_angle = math.radians(4.2)
    proposal = states[-1] * cmath.exp(1j * proposal_angle)
    threshold = 0.065
    residual = abs(math.tan(proposal_angle / 2))
    assert 0 < residual <= threshold < math.tan(cadence / 2)
    assert math.isclose(abs(math.tan(cmath.phase(proposal / states[-1]) / 2)), residual)
    threshold_radius = 2 * r * math.sin(math.atan(threshold))
    assert math.isclose(cmath.phase(states[-1] / states[0]), theta)

    def point(z):
        return cx + r * z.real, cy - r * z.imag

    panel.arc(cx, cy, r, math.degrees(first), math.degrees(first + theta), "faint", 1.5)
    for j in range(count):
        points = [point(states[j] * cmath.exp(1j * cadence * k / 20)) for k in range(21)]
        panel.curve_arrow(points[1:-2], "line", 2.3, head=7)
    current, landing = point(states[-1]), point(proposal)
    assert 0 < math.dist(current, landing) < threshold_radius
    panel.circle(*current, threshold_radius, color="dim", fill="cyan", fill_opacity=0.13, dash="3 2")
    for z in states[:-1]:
        panel.dot(*point(z), 3.4, "violet", ring="bg")
    panel.arrow(*current, *landing, "line", 1.7, head=3.2)
    panel.dot(*current, 2.6, "now")
    panel.dot(*landing, 1.8, "line")
    panel.text(17, 156, "ε_{self}", color="dim", size=13)
    label(panel, 198, "Δθ = Θ/N", "Δθ = Θ/N", color="line", weight=700)
    label(panel, 227, "σ_{t+1} = [σ_{t}, σ_{t−1}, σ_{t}]", "σ_{t+1} = [σ_{t}, σ_{t−1}, σ_{t}]", weight=700)
    label(panel, 253, "受控步残差 ≤ ε_{self}", "Damped step ≤ ε_{self}", size=13, color="dim")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)
    shadow_mrp(one)
    butterfly(two)
    geodesic(three)
