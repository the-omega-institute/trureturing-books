"""第十一章地图：跟着载频一起转，态就停下；包络下的面积就是转角；虚拟 Z 不发脉冲，只改后面脉冲的相位。
Chapter 11 at a glance: turn with the carrier and the state stands still; the area under the envelope is the
turning angle; a virtual Z sends no pulse and only shifts the phase of the pulses after it.

Panel I looks down on the equatorial plane: the lab axes are fixed, the rotating frame x′ turns by ω₀t about z and the
state turns with it, so in the rotating frame it does not move.
Panel II plots a Gaussian envelope whose area is π/2 (asserted by quadrature) and, below it, the quarter-turn sector of
the same angle that it produces about the drive axis (rem-rwa-pulse-area-literature).
Panel III looks down on the equatorial plane again: the drive axis of the circuit's X(π/2) is replaced by φ − λ = −90°
after Z(90°) (rem-virtual-z-scheduling-literature), the pulse costing 0 ns.
"""

import math

from _ch11 import along, top_view, turn_arc

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：从北极往下看赤道面，细虚线是实验室系的 x、y 轴；灰色的 x′ 轴是旋转系，绕中心的 z 轴以 ω₀t 转动"
          "（紫色的弯箭头），琥珀色的态箭头沿着 x′，跟它一起转，所以在旋转系里不动。"
          "第二栏：上面是一段高斯包络，下面的品红面积等于 π/2；再往下，琥珀色的态从北极出发，扫过一块同样是 π/2 的品红扇形，到达赤道。"
          "第三栏：再从北极往下看赤道面：紫色虚线是电路里写的 X 轴，紫色实线是实际发出的脉冲轴，在 −90° 处；琥珀色的弯箭头标出"
          "相位改了 −λ，旁边写着 0 ns，表示没有发出任何额外的脉冲。",
    "en": "Three panels. Panel I: looking down on the equatorial plane from the north pole, the thin dashed lines are the lab "
          "x and y axes; the grey x′ axis is the rotating frame, turning by ω₀t about the z axis at the centre (violet curved "
          "arrow), and the amber state arrow lies along x′ and turns with it, so in the rotating frame it does not move. "
          "Panel II: a Gaussian envelope on top whose magenta area is π/2; below it the amber state leaves the north pole and "
          "sweeps a magenta sector of the same π/2, reaching the equator. Panel III: the equatorial plane from above again: "
          "the violet dashed line is the X axis written in the circuit, the solid violet line is the axis of the pulse "
          "actually sent, at −90°; an amber curved arrow marks the phase shift −λ, and the label 0 ns says that no extra "
          "pulse is sent.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 262, gap=16)

    # ---- I: the rotating frame turns with the carrier
    title(one, "I　跟着载频转，态就停下", "I  turn with the carrier")
    cx, cy, R = 112, 146, 82
    top_view(one, cx, cy, R)
    turn = 40.0
    x2, y2 = along(cx, cy, turn, R + 6)
    one.line(cx, cy, x2, y2, "dim", 1.6)
    one.text(*along(cx, cy, turn + 7, R + 22), "*x*′", size=14, color="dim", anchor="middle", middle=True)
    one.arrow(cx, cy, *along(cx, cy, turn, R - 4), "now", 2.8)
    turn_arc(one, cx, cy, 34, 0, turn, "axis", 1.8, gap=2)
    one.text(*along(cx, cy, turn / 2, 50), "*ω*_{0}*t*", size=14, color="axis", anchor="middle", middle=True, halo=True)
    one.dot(cx, cy, 5.0, "axis", ring="bg")
    one.text(cx - 10, cy + 16, "*z*", size=13, color="axis", anchor="end", middle=True)
    one.text(cx, 252, one.t("态在 *x*′ 系里不动", "the state is still in the *x*′ frame"), size=13, color="dim",
             anchor="middle")

    # ---- II: the area under the envelope is the turning angle
    title(two, "II　面积就是转角", "II  area = turning angle")
    T = 25.0
    sig = T / 6

    def g(t):
        return math.exp(-((t - T / 2) ** 2) / (2 * sig ** 2))
    n = 4000
    raw = sum(g((k + 0.5) * T / n) for k in range(n)) * T / n
    amp = (math.pi / 2) / raw                     # rad/ns so that ∫Ω dt = π/2

    def omega(t):
        return amp * g(t)
    area = sum(omega((k + 0.5) * T / n) for k in range(n)) * T / n
    assert abs(area - math.pi / 2) < 1e-9
    ax = two.axes(28, 40, 186, 84, (0, T), (0, amp * 1.15))
    pts = [(T * k / 120, omega(T * k / 120)) for k in range(121)]
    ax.area(pts, "area", base=0, fill_opacity=0.24)
    ax.path(pts, "ink", 2.0)
    ax.hline(0, "dim", 1.3)
    ax.text(T / 2, amp * 0.36, "π/2", size=14, color="area", anchor="middle", halo=True)
    ax.text(T * 0.86, amp * 0.85, "*Ω*(*t*)", size=13, color="dim", anchor="middle")
    ox, oy, r = 80, 244, 96
    two.line(ox, oy, ox + r + 10, oy, "faint", 1.2, dash="3 3")
    two.arc(ox, oy, r, 0, 90, "area", 1.4, fill="area", fill_opacity=0.2)
    two.line(ox, oy, ox, oy - r - 6, "dim", 1.3)
    two.arrow(ox, oy, ox + r, oy, "now", 2.6)
    two.dot(ox, oy - r, 4.0, "dim", ring="bg")
    turn_arc(two, ox, oy, r + 8, 88, 4, "now", 1.6, gap=2)
    two.text(ox + 38, oy - 32, "π/2", size=14, color="area", anchor="middle", halo=True)

    # ---- III: a virtual Z only shifts the phase of the next pulse
    title(three, "III　虚拟 Z：只改相位", "III  virtual Z: a phase shift")
    cx, cy, R = 112, 146, 82
    top_view(three, cx, cy, R)
    lam = 90.0
    three.line(cx, cy, *along(cx, cy, 0, R), "axis", 2.2, dash="6 4")
    three.line(cx, cy, *along(cx, cy, -lam, R), "axis", 3.0)
    three.dot(*along(cx, cy, -lam, R), 4.6, "axis", ring="bg")
    three.text(cx + R / 2, cy - 14, three.t("电路：*X*", "circuit: *X*"), size=13, color="axis", anchor="middle",
               middle=True, halo=True)
    three.text(cx, cy + R + 22, three.t("发出：−*Y*", "sent: −*Y*"), size=13, color="axis", anchor="middle",
               middle=True, halo=True)
    turn_arc(three, cx, cy, 44, 0, -lam, "now", 2.0, gap=4)
    three.text(*along(cx, cy, -45, 62), "−*λ*", size=14, color="now", anchor="middle", middle=True, halo=True)
    three.text(cx - 46, cy - 40, "0 ns", size=15, weight=600, color="axis", anchor="middle", middle=True, halo=True)
