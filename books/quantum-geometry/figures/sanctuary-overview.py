"""铸器与圣殿篇地图：异或刀片、ZYZ 编译与冻结证明。
Forge and Sanctuary at a glance: XOR blades, ZYZ compilation and a frozen proof.
"""

import math

from _ch25 import blade_sign
from _ch26 import ANGLES, apply, check_example, rotor
from _ch27 import lock_kind
from _overview import label, title

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "第一栏的八个顶点对应三位刀片掩码，强调 010 异或 001 等于 011。第二栏在布洛赫球上依次绕 Z、Y、Z 轴转动。第三栏画出玻恩概率三部分引理的证明依赖图及内核验证标记。",
    "en": "Panel I gives the eight blade masks as cube vertices and highlights 010 XOR 001 giving 011. Panel II follows successive Z, Y and Z turns on a Bloch sphere. Panel III shows the dependencies of the frozen three-part Born probability lemma and its kernel verification badge.",
}


def blade_cube(panel):
    title(panel, "I　三位异或—泡利刀片", "I  Three-bit XOR–Pauli blades")
    def point(mask):
        a, b, c = ((mask >> bit) & 1 for bit in range(3))
        return 44 + 85 * a + 61 * c, 216 - 103 * b - 45 * c

    edges = [(mask, mask ^ bit) for mask in range(8) for bit in (1, 2, 4) if not mask & bit]
    assert len(edges) == 12 and len({point(mask) for mask in range(8)}) == 8
    left, right = 0b010, 0b001
    result = left ^ right
    assert result == 0b011 and blade_sign(left, right) == -1
    for a, b in edges:
        panel.line(*point(a), *point(b), "line" if result in (a, b) and (a in (left, right) or b in (left, right))
                   else "dim", 1.5)
    for mask in range(8):
        x, y = point(mask)
        role = "area" if mask == result else "line" if mask in (left, right) else "ink"
        panel.dot(x, y, 3.6, role, ring="bg")
        word = format(mask, "03b")
        side = 10 if mask & 1 else -10
        panel.text(x + side, y - 8, panel.t(word, word), size=13, color=role,
                   anchor="start" if side > 0 else "end", halo=True)
    label(panel, 247, "010 ⊕ 001 = 011", "010 ⊕ 001 = 011", weight=700)
    label(panel, 269, "e₂e₁ = −e₁₂", "e₂e₁ = −e₁₂", size=13, color="area")


def compilation(panel):
    title(panel, "II　三角 ZYZ 旋转", "II  Three-angle ZYZ rotor")
    sp = panel.sphere(118, 135, 83, az=118, el=20)
    sp.outline()
    sp.great_circle((0, 0, 1))
    alpha, beta, gamma = ANGLES
    compiled = check_example()
    start = (1, 0, 0)
    end = start
    for axis, angle, role in (("z", gamma, "line"), ("y", beta, "area"), ("z", alpha, "violet")):
        trace = [apply(rotor(axis, angle * i / 32), end) for i in range(33)]
        assert all(math.isclose(sum(x * x for x in q), 1, abs_tol=1e-12) for q in trace)
        sp.path(trace, role, width=2.5, arrow=True)
        end = trace[-1]
        sp.dot(end, role, 4, ring="bg")
    assert all(math.isclose(a, b, abs_tol=1e-12) for a, b in zip(end, apply(compiled, start)))
    sp.dot(start, "ink", 4, ring="bg")
    for x, word, role in ((53, "Z(γ)", "line"), (118, "Y(β)", "area"), (183, "Z(α)", "violet")):
        panel.text(x, 242, panel.t(word, word), size=15, color=role, anchor="middle")
    label(panel, 267, "三步合为一个旋子", "Three turns, one rotor", size=13, color="dim")


def proof_dag(panel):
    title(panel, "III　冻结证明依赖图", "III  Frozen proof DAG")
    gid = "D5/S3/Quantum/FiniteDimensional.born_probability_skeleton"
    assert lock_kind(gid) == "theorem"
    trace = panel.box(60, 53, panel.t("迹为 1", "Trace one"), w=90, size=13)
    psd = panel.box(176, 53, panel.t("压缩保持正性", "PSD sandwich"), w=111, size=13, pad=7)
    normalization = panel.box(43, 124, panel.t("归一", "Normalize"), w=75, size=12)
    additivity = panel.box(118, 124, panel.t("可加", "Add"), w=49, size=12, pad=6)
    positivity = panel.box(192, 124, panel.t("非负", "Nonnegative"), w=85, size=12)
    frozen = panel.box(118, 191, panel.t("玻恩概率三部分引理", "Born probability lemma"),
                       "lean", w=190, size=14)
    for source, target in ((trace, normalization), (psd, positivity)):
        panel.link(source.bottom, target.top, "dim", head=6)
    for i, part in enumerate((normalization, additivity, positivity)):
        panel.link(part.bottom, frozen.at(0.18 + 0.32 * i, 0), "dim", head=6)
    panel.chip(118, 250, panel.t("LEAN ✓ 内核", "LEAN ✓ kernel"), "lean", anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)
    blade_cube(one)
    compilation(two)
    proof_dag(three)
