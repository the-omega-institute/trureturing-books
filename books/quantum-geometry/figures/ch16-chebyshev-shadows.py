"""二维块转 m 次，箭头在横轴上的影子就是 T_m(x)：x = ½（θ = 60°）时依次是 1、½、−½、−1。
Turn the two-dimensional block m times and the arrow's shadow on the axis is T_m(x): for x = ½ (θ = 60°)
the shadows are 1, ½, −½, −1.

The arrow at angle mθ is the eigenphase e^{imθ} of W(x)^m; its shadow cos(mθ) = T_m(cos θ) is the
top-left entry of W(x)^m. The values are checked against the chapter's recurrence t_{m+2} = t_{m+1} − t_m.
"""

import math

SIZE = (500, 280)
ALT = {
    "zh": "上半个单位圆，圆心在横轴上。四支箭头从圆心出发，依次与横轴正向成 0°、60°、120°、180°，相邻两支之间是紫色的角 θ = 60°，"
          "最后一支 m = 3 是琥珀色的。每支箭头的尖端向横轴作虚线垂线，落脚处的青色点就是它的影子，标为 T₀ = 1、T₁ = ½、T₂ = −½、T₃ = −1。",
    "en": "The upper half of a unit circle centred on the horizontal axis. Four arrows leave the centre at 0°, 60°, 120° and "
          "180° from the positive axis; neighbouring arrows are separated by the violet angle θ = 60°, and the last one, "
          "m = 3, is amber. A dashed perpendicular drops from each tip to the axis, and the cyan dot at its foot is the arrow's "
          "shadow, labelled T₀ = 1, T₁ = ½, T₂ = −½, T₃ = −1.",
}

THETA = 60
VALUES = ["1", "½", "−½", "−1"]


def draw(fig):
    t = fig.t
    cx, cy, R = 250, 196, 160

    # T_m(½) from the chapter's recurrence t_{m+2} = (a + b) t_{m+1} − t_m with a + b = 1, t₀ = 2, t₁ = 1
    tm = [2, 1]
    while len(tm) < 4:
        tm.append(tm[-1] - tm[-2])
    for m in range(4):
        assert abs(tm[m] / 2 - math.cos(math.radians(m * THETA))) < 1e-12

    fig.arc(cx, cy, R, 0, 180, "faint", 1.2, dash="3 4")
    fig.line(cx - R - 24, cy, cx + R + 24, cy, "dim", 1.3)
    fig.text(cx + R + 28, cy + 5, "*x*", size=14, color="dim")

    for m in range(1, 4):
        fig.angle(cx, cy, 40, (m - 1) * THETA, m * THETA, "*θ*", color="axis", width=2.0)

    for m in range(4):
        a = math.radians(m * THETA)
        tx, ty = cx + R * math.cos(a), cy - R * math.sin(a)
        if 0 < m < 3:
            fig.line(tx, ty, tx, cy, "dim", 1.2, dash="4 3")
        color, width = ("now", 3.0) if m == 3 else ("ink", 2.2)
        fig.arrow(cx, cy, tx, ty, color, width)
        lx, ly = cx + (R + 16) * math.cos(a), cy - (R + 16) * math.sin(a)
        if m in (1, 2):
            fig.text(lx, ly, f"*m* = {m}", size=14, color="dim", anchor="middle", middle=True)
        fig.dot(tx, cy, 5.4, "line", ring="bg")
        fig.text(tx, cy + 24, f"*T*_{{{m}}} = {VALUES[m]}", size=14, color="line", anchor="middle")
    fig.text(cx + R, cy - 14, "*m* = 0", size=14, color="dim", anchor="end")
    fig.text(cx - R, cy - 14, "*m* = 3", size=14, color="now")
    fig.text(cx, cy + 58, t("*x* = cos *θ* = ½", "*x* = cos *θ* = ½"), size=14, color="dim", anchor="middle")
