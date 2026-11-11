"""六个门各是绕一根轴的一次转动：X、Y、Z、H、S、T 的转轴与转角（第五章 §5.4）。
Each of the six gates is one turn about one axis: the axis and angle of X, Y, Z, H, S and T (chapter 5, §5.4).

The axes and angles are the rows of the chapter's table [@ex-single-qubit-gate-atlas]. Each small sphere turns one
start point about the gate's axis by the gate's angle (right-handed); the script checks where it lands
(|0⟩ → |1⟩ for X and Y, |+⟩ → |−⟩ for Z, |0⟩ → |+⟩ for H, |+⟩ → |+i⟩ for S, |+⟩ → 45° on the equator for T).
"""

import math

from tbook import figkit
from _ch05 import rotor_turn

SIZE = (548, 404)
WRAP = True
ALT = {
    "zh": "六颗同样大小的布洛赫球排成两行，每颗上一根紫色的转轴和一段琥珀色的转动路径，灰点是起点，琥珀色的点是终点。"
          "X：绕前后的 x 轴转 180°，北极到南极。Y：绕左右的 y 轴转 180°，北极到南极。Z：绕竖直的 z 轴转 180°，赤道上的 |+⟩ 到对面的 |−⟩。"
          "H：绕 x 与 z 之间 45° 的斜轴转 180°，北极到赤道上的 |+⟩。S：绕 z 轴转 90°，|+⟩ 沿赤道到 |+i⟩。T：绕 z 轴转 45°，|+⟩ 沿赤道走八分之一圈。",
    "en": "Six Bloch spheres of the same size in two rows, each with a violet axis and an amber path of the turn; the grey dot "
          "is the start and the amber dot the end. X: 180° about the front-to-back x axis, north pole to south pole. Y: 180° "
          "about the left-to-right y axis, north pole to south pole. Z: 180° about the vertical z axis, |+⟩ on the equator to "
          "|−⟩ opposite. H: 180° about the axis halfway between x and z, north pole to |+⟩ on the equator. S: 90° about z, "
          "|+⟩ along the equator to |+i⟩. T: 45° about z, |+⟩ an eighth of the way round the equator.",
}

E1, E2, E3 = (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0)
H_AXIS = figkit.unit((1.0, 0.0, 1.0))
GATES = [  # name, axis, angle (degrees), start, expected end
    ("X", E1, 180, E3, (0.0, 0.0, -1.0)),
    ("Y", E2, 180, E3, (0.0, 0.0, -1.0)),
    ("Z", E3, 180, E1, (-1.0, 0.0, 0.0)),
    ("H", H_AXIS, 180, E3, E1),
    ("S", E3, 90, E1, E2),
    ("T", E3, 45, E1, figkit.unit((1.0, 1.0, 0.0))),
]


def draw(fig):
    # three columns of two (X over H, Y over S, Z over T): side by side on a wide page, wrapping on a phone
    cols = fig.row([172, 172, 172], 404, gap=16)
    for i, (name, axis, theta, start, want) in enumerate(GATES):
        got = figkit.rotate(start, axis, theta)
        assert max(abs(got[k] - want[k]) for k in range(3)) < 1e-12, name
        p, top = cols[i % 3], (i // 3) * 210
        p.text(86, top + 22, f"*{name}*  {theta}°", size=15, anchor="middle", weight=600)
        sp = p.sphere(86, top + 112, 60)
        sp.outline()
        sp.great_circle(E3, "faint", 1.1)
        sp.segment(tuple(-1.32 * c for c in axis), tuple(1.32 * c for c in axis), "axis", 2.2)
        sp.dot(tuple(1.32 * c for c in axis), "axis", 3.2)
        rotor_turn(sp, axis, start, theta)
