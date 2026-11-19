"""第三十二章地图：三维旋度闭合、单位球上的数系投影与无原点合成。
Chapter 32 at a glance: curl closure, number projections and origin-free composition.
"""

import cmath
import math

from tbook import figkit

from _overview import label, title

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "第一栏把三个有向平面与三根法向一一配对，并标出正维数的三维闭合。第二栏由四种数系的单位球过渡到三元数的四种投影。第三栏对比张量空间的 2ᴺ 维与 3N 个内禀参数，并用同一圆上的有向弧展示堆运算。",
    "en": "Panel I pairs three oriented planes with their three normals and marks curl closure in positive dimension. Panel II lists the four unit spheres and the four ternion projections. Panel III contrasts 2ᴺ complex tensor dimensions with 3N native parameters and illustrates the heap on a circle.",
}


def curl(panel):
    title(panel, "I　三维旋度闭合", "I  Curl closure in 3D")
    axes = ((1, 0, 0), (0, 1, 0), (0, 0, 1))
    for i, axis in enumerate(axes):
        x = 47 + 71 * i
        u, v = axes[(i + 1) % 3], axes[(i + 2) % 3]
        assert figkit.cross(u, v) == axis
        sp = panel.sphere(x, 106, 37, az=46 + 12 * i, el=27)
        sp.patch([(0, 0, 0), u, tuple(a + b for a, b in zip(u, v)), v],
                 "magenta", color="area", flat=True, fill_opacity=0.16)
        sp.arrow(axis, "violet", scale=1)
        pair = ("23", "31", "12")[i]
        word = f"e_{{{pair}}} ↔ e_{{{i + 1}}}"
        panel.text(x, 169, panel.t(word, word), size=13, anchor="middle")

    def closes(dimension):
        return math.comb(dimension, 2) == dimension

    assert math.comb(3, 2) == len(axes)
    assert [d for d in range(1, 13) if closes(d)] == [3]
    label(panel, 204, "C(d, 2) = d ⇔ d = 3", "C(d, 2) = d ⇔ d = 3", weight=700)
    label(panel, 224, "正维数 d", "Positive dimensions d", size=13, color="dim")
    panel.chip(118, 250, panel.t("LEAN ✓ 叉乘分类", "LEAN ✓ 3D cross product"), "lean", anchor="middle")


def projections(panel):
    title(panel, "II　单位球与数系投影", "II  Unit spheres and projections")
    ladder = (("ℝ", 1), ("ℂ", 2), ("ℍ", 4), ("𝕆", 8))
    dims = ("⁰", "¹", "³", "⁷")
    assert [dimension - 1 for _, dimension in ladder] == [0, 1, 3, 7]
    for i, ((algebra, dimension), power) in enumerate(zip(ladder, dims)):
        x = 34 + 56 * i
        panel.rect(x - 23, 47, 46, 51, color="violet" if dimension == 4 else "edge", rx=5)
        panel.text(x, 66, panel.t(algebra, algebra), size=15, anchor="middle")
        word = f"S{power}"
        panel.text(x, 87, panel.t(word, word), size=15, color="violet", anchor="middle")
    panel.arrow(146, 103, 124, 122, "violet", 1.5, head=6)
    center = panel.box(118, 126, panel.t("T₃ ≅ S³", "T₃ ≅ S³"), "violet", w=98)
    cuts = (("四元数嵌入", "ℍ embedding"), ("复投影", "ℂ projection"),
            ("实标量", "ℝ scalar"), ("整数绕数", "ℤ winding"))
    for i, (zh, en) in enumerate(cuts):
        x, y = 63 + 110 * (i % 2), 179 + 55 * (i // 2)
        box = panel.box(x, y, panel.t(zh, en), "edge", w=100, size=13, pad=6)
        if i < 2:
            panel.link(center, box, "dim", head=6)
        else:
            # Branch outside the upper row so the edges stay clear of its labels.
            side = -1 if i == 2 else 1
            elbow = (118 + 111 * side, center.left[1])
            panel.polyline([center.left if side < 0 else center.right, elbow, (elbow[0], y - 9)], "dim", 1.2)
            panel.arrow(elbow[0], y - 9, x, y, "dim", 1.3, head=6)


def heap(panel):
    title(panel, "III　多场账本与堆运算", "III  Multi-field ledger and heap")
    fields = 5
    assert (2**fields, 3 * fields) == (32, 15)
    label(panel, 53, "希尔伯特重投影：2ᴺ 复维", "Hilbert reprojection: 2ᴺ", size=13, color="line")
    label(panel, 75, "内禀：3N 个实参数", "Native: 3N real parameters", size=13, color="violet")

    cx, cy, r = 118, 166, 62
    angles = tuple(map(math.radians, (25, 94, 210)))
    a, b, c = (cmath.exp(1j * angle) for angle in angles)
    result = a * b.conjugate() * c
    assert cmath.isclose(result / c, a / b)
    panel.circle(cx, cy, r, color="faint")
    for name, z in zip(("a", "b", "c", "[a,b,c]"), (a, b, c, result)):
        x, y = cx + r * z.real, cy - r * z.imag
        panel.dot(x, y, 3.4, "violet", ring="bg")
        panel.text(cx + (r + 16) * z.real, cy - (r + 13) * z.imag + 4,
                   panel.t(name, name), size=13, anchor="middle")
    turn = cmath.phase(a / b)
    for start in angles[1:]:
        angles_along_arc = [start + turn * i / 22 for i in range(23)]
        points = [(cx + (r - 8) * math.cos(angle), cy - (r - 8) * math.sin(angle))
                  for angle in angles_along_arc]
        panel.curve_arrow(points, "line", 1.8, head=7)
    label(panel, 254, "[a,b,c] = ab⁻¹c", "[a,b,c] = ab⁻¹c", weight=700)
    label(panel, 272, "同一相对转角", "Same relative turn", size=13, color="dim")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)
    curl(one)
    projections(two)
    heap(three)
