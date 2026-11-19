"""第三十九章地图：无原点三元闭合、五层级联与霍普夫投影。
Chapter 39 at a glance: ternary closure, the five-tier cascade and Hopf projection.
"""

import cmath
import math

from _overview import label, title

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "第一栏以圆上的三次比较和半正定重叠核示意大一统母公理，中心无外定原点。第二栏从几何与微积分逐级过渡到等节拍堆测地线。第三栏将同一霍普夫纤维的相位投到一个点，再给出两路玻恩权重和堆阶梯消去。",
    "en": "Panel I illustrates the mother axiom with a triangle of comparisons and a PSD overlap kernel, without a distinguished external origin. Panel II traces five tiers from arc calculus to heap geodesics. Panel III maps a phase fiber to one Hopf base point and shows the two Born weights and heap cancellation.",
}


def closure(panel):
    title(panel, "I　无原点三元闭合", "I  Origin-free ternary closure")
    label(panel, 56, "AXIOM-Ω", "AXIOM-Ω", size=16, weight=700)
    phases = [cmath.exp(1j * math.radians(a)) for a in (90, 210, 330)]
    kernel = [[(1 + (a * b.conjugate()).real) / 2 for b in phases] for a in phases]
    assert all(math.isclose(value, 1 if i == j else 0.25)
               for i, row in enumerate(kernel) for j, value in enumerate(row))
    # This Gram sample has the form 3I/4 + J/4.
    assert math.isclose(sum(kernel[0]), 1.5) and math.isclose(kernel[0][0] - kernel[0][1], 0.75)
    cx, cy, radius = 118, 141, 65
    points = [(cx + radius * z.real, cy - radius * z.imag) for z in phases]
    panel.circle(cx, cy, radius, color="violet", width=1.7)
    panel.polygon(points, "cyan", color="line", width=2, fill_opacity=0.14)
    for (x, y), name in zip(points, ("x", "y", "z")):
        panel.dot(x, y, 4.3, "line", ring="bg")
        panel.text(x, y + (19 if name == "x" else 20), panel.t(name, name), size=14, anchor="middle")
    label(panel, 143, "[x,y,z]", "[x,y,z]", weight=700)
    label(panel, 228, "κ ≽ 0 · T₃ ≅ S³(1)", "κ ≽ 0 · T₃ ≅ S³(1)", color="violet", weight=700)
    label(panel, 254, "无外定单位元 1", "No external identity 1", color="dim", size=13)


def cascade(panel):
    title(panel, "II　五层推演", "II  Five-tier cascade")
    contents = (
        ("圆弧几何与微积分", "Geometry and calculus"),
        ("等钟相对论", "Equal-clock relativity"),
        ("四力圆弧统一", "Four-force unification"),
        ("临界算术谱", "Critical arithmetic"),
        ("堆测地线", "Heap geodesics"),
    )
    assert len(contents) == 5
    previous = None
    for i, (zh, en) in enumerate(contents, start=1):
        level = panel.box(118, 45 + 44 * (i - 1), panel.t(f"{i}  {zh}", f"{i}  {en}"),
                          "violet" if i % 2 else "edge", size=13, w=192, pad=9)
        if previous:
            panel.link(previous, level, "dim", head=6)
        previous = level
    label(panel, 269, "母公理的桥接推演", "Axiom and its bridges", size=13, color="dim")


def hopf(panel):
    title(panel, "III　霍普夫投影与返照", "III  Hopf projection and return")
    theta = math.pi / 3
    state = (math.cos(theta / 2), math.sin(theta / 2))

    def bloch(a, b):
        return (2 * (a.conjugate() * b).real, 2 * (a.conjugate() * b).imag, abs(a)**2 - abs(b)**2)

    base = bloch(*state)
    assert math.isclose(sum(x * x for x in base), 1)
    weight = abs(state[0])**2
    assert math.isclose(weight, 0.75) and math.isclose(weight + abs(state[1])**2, 1)
    phase_cx, phase_cy, phase_r = 54, 91, 36
    panel.circle(phase_cx, phase_cy, phase_r, color="violet", width=1.7)
    for i in range(8):
        phase = cmath.exp(math.tau * i * 1j / 8)
        same_base = bloch(*(phase * z for z in state))
        assert all(math.isclose(a, b, abs_tol=1e-12) for a, b in zip(same_base, base))
        panel.dot(phase_cx + phase_r * phase.real, phase_cy - phase_r * phase.imag, 3, "violet", ring="bg")
    panel.arrow(98, 91, 129, 91, "dim", 1.6, head=8)
    sphere = panel.sphere(178, 91, 39, az=30, el=22)
    sphere.outline()
    sphere.great_circle((0, 0, 1))
    sphere.dot(base, "line", 4, ring="bg")
    label(panel, 152, "T₃ / S¹ ≅ ℂℙ¹", "T₃ / S¹ ≅ ℂℙ¹", weight=700)

    for start, length, role in ((0, weight, "line"), (weight, 1 - weight, "area")):
        panel.rect(22 + 192 * start, 170, 192 * length, 14, color=role, fill=role, fill_opacity=0.35)
    label(panel, 205, "cos²(θ/2) + sin²(θ/2) = 1", "cos²(θ/2) + sin²(θ/2) = 1", size=13)
    panel.chip(118, 229, panel.t("LEAN ✓ 玻恩权重", "LEAN ✓ Born weights"), "lean", anchor="middle")
    x, z = cmath.exp(0.2j), cmath.exp(1.3j)
    assert cmath.isclose(x * x.conjugate() * z, z)
    label(panel, 260, "阶梯消去 · [x,x,z] = z", "Ladder erasure · [x,x,z] = z", size=13, color="dim")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)
    closure(one)
    cascade(two)
    hopf(three)
