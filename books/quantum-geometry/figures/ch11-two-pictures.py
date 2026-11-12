"""推态，或拉回读出方向：两种画法里态与读出方向的夹角相同，读数相同（第十一章 §虚拟 Z 与相位参考更新）。
Push the state, or pull the readout back: the angle between state and readout is the same in both pictures, and so is
the reading (chapter 11).

The unitary special case of cor-frame-pullback-readout: one turn U by 120° about a tilted axis. Schrödinger:
the state r goes to U r, the readout direction z stays. Heisenberg: r stays, the readout goes to U⁻¹ z. The script asserts
(U r)·z = r·(U⁻¹ z), so the readout probability (1 + cos α)/2 agrees.
"""

import math

from tbook import figkit

SIZE = (520, 290)
WRAP = True
ALT = {
    "zh": "两颗同样大小的布洛赫球。左边推态：琥珀色的态绕紫色的转轴从灰点转到新位置，读出方向（北极的 |0⟩）不动；"
          "青色的弧是态与读出方向之间的夹角 α。右边拉回读出：琥珀色的态留在原处，灰色的读出方向倒着转到新位置；"
          "青色的弧是同样的 α。两边夹角相同，所以读到 |0⟩ 的概率相同。",
    "en": "Two Bloch spheres of the same size. Left, push the state: the amber state turns about the violet axis from the grey "
          "dot to a new place while the readout direction (|0⟩ at the north pole) stays put; the cyan arc is the angle α "
          "between state and readout. Right, pull the readout back: the amber state stays where it is and the grey readout "
          "direction turns backwards to a new place; the cyan arc is the same α. The angle is the same on both sides, so the "
          "chance of reading |0⟩ is the same.",
}

AXIS = figkit.unit((0.5, -0.3, 0.8))
TURN = 120.0
STATE = figkit.sph(100, -30)
NORTH = (0.0, 0.0, 1.0)

PUSHED = figkit.rotate(STATE, AXIS, TURN)
PULLED = figkit.rotate(NORTH, AXIS, -TURN)
ALPHA = math.degrees(math.acos(figkit.dot3(PUSHED, NORTH)))
assert abs(figkit.dot3(PUSHED, NORTH) - figkit.dot3(STATE, PULLED)) < 1e-12


def turn_path(sp, start, angle, color, width):
    pts = [figkit.rotate(start, AXIS, angle * k / 60) for k in range(61)]
    sp.curve(pts, color, width)
    (xa, ya), (xb, yb) = sp.xy(pts[-3]), sp.xy(pts[-1])
    sp.cv.arrow_head(xb, yb, math.degrees(math.atan2(-(yb - ya), xb - xa)), color, head=8)


def draw(fig):
    R = 96
    heads = ((("推态", "push the state")), (("拉回读出方向", "pull the readout back")))
    panels = fig.row([252, 252], 290, gap=16)
    cx = 126
    for i, (p, (zh, en)) in enumerate(zip(panels, heads)):
        p.text(cx, 24, fig.t(zh, en), size=14, weight=600, anchor="middle")
        sp = p.sphere(cx, 156, R, el=18)
        sp.outline()
        sp.great_circle((0, 0, 1), "faint", 1.2)
        sp.segment(tuple(-1.18 * c for c in AXIS), tuple(1.18 * c for c in AXIS), "axis", 2.0)
        if i == 0:
            state, readout = PUSHED, NORTH
            turn_path(sp, STATE, TURN, "now", 2.0)
            sp.dot(STATE, "dim", 4.0, ring="bg")
        else:
            state, readout = STATE, PULLED
            turn_path(sp, NORTH, -TURN, "dim", 1.8)
            sp.dot(NORTH, "faint", 4.0, ring="bg")
        sp.arc(state, readout, "line", 3.0, n=60)
        mid = figkit.slerp(state, readout, 0.5)
        sp.label(mid, "*α*", scale=1.0, dx=-12 if i == 0 else 12, dy=-2, size=15, color="line",
                 anchor="end" if i == 0 else "start", middle=True, halo=True)
        sp.arrow(state, "now", 2.6, head=8)
        sp.dot(state, "now", 4.6, ring="bg")
        sp.arrow(readout, "dim", 1.8, head=7)
        sp.dot(readout, "ink", 4.4, ring="bg")
        sp.label(readout, fig.t("读出", "readout"), dx=10 if i == 0 else -10, dy=-8 if i == 0 else -12, size=13,
                 color="dim", anchor="start" if i == 0 else "end", middle=True, halo=True)
        foot = ("态动，读出不动", "state moves, readout stays") if i == 0 else ("态不动，读出倒着转",
                                                                         "state stays, readout turns back")
        p.text(cx, 280, fig.t(*foot), size=13, color="dim", anchor="middle")
