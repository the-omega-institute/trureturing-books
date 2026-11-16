"""块界 |1 + z| + |1 − z| 在单位圆的直角处顶到 2√2（第十三章，定理 thm-unitary-bell-bound 取 d = 2 之后的手工推导）。
The block bound |1 + z| + |1 − z| reaches 2√2 at the right angle on the unit circle (chapter 13, the manual
step after thm-unitary-bell-bound at d = 2).

Left: z = e^{iα} on the unit circle with α = 60°; the chords to +1 and −1 meet at a right angle at z (Thales)
and have lengths 2 sin(α/2) and 2 cos(α/2). Right: their sum 2√(1 + sin α) for 0° ≤ α ≤ 180°, which touches
2√2 = 2/sin(π/4) only at α = 90°, i.e. z = i (asserted).
"""

import math

WRAP = True
SIZE = (520, 268)
ALPHA = 60
ALT = {
    "zh": "左栏是单位圆。琥珀色的点 z = e^{iα} 取 α = 60°，两条青色的弦从它连到 +1 与 −1，在 z 处成直角，"
          "长度分别是 |1 − z| = 2 sin(α/2) = 1 与 |1 + z| = 2 cos(α/2) ≈ 1.732；圆顶的空心点是 z = i，两弦在那里等长。"
          "右栏横轴是 α，从 0° 到 180°，青色曲线是两弦长之和 2√(1 + sin α)：两端是 2，琥珀色的点在 60° 处为 2.732，"
          "只在 α = 90° 碰到绿色虚线 2√2。",
    "en": "Left panel: the unit circle. The amber point z = e^{iα} has α = 60°; two cyan chords join it to +1 and −1 and meet "
          "at a right angle at z, with lengths |1 − z| = 2 sin(α/2) = 1 and |1 + z| = 2 cos(α/2) ≈ 1.732; the hollow point at "
          "the top is z = i, where the two chords are equal. Right panel: the horizontal axis is α from 0° to 180°, and the "
          "cyan curve is the sum of the two chords, 2√(1 + sin α): 2 at both ends, 2.732 at the amber point at 60°, touching "
          "the green dashed line 2√2 only at α = 90°.",
}


def chord_sum(deg):
    a = math.radians(deg)
    z = complex(math.cos(a), math.sin(a))
    return abs(1 + z) + abs(1 - z)


def draw(fig):
    t = fig.t
    left, right = fig.row([236, 268], 268, gap=16)

    # --- the unit circle ---
    cx, cy, R = 118, 150, 92
    P = lambda a: (cx + R * math.cos(math.radians(a)), cy - R * math.sin(math.radians(a)))
    left.circle(cx, cy, R, color="dim", width=1.4)
    left.line(cx - R - 14, cy, cx + R + 14, cy, "faint", 1.0)
    left.line(cx, cy + R + 10, cx, cy - R - 14, "faint", 1.0)
    zx, zy = P(ALPHA)
    (mx, my), (px, py) = P(180), P(0)
    z = complex(math.cos(math.radians(ALPHA)), math.sin(math.radians(ALPHA)))
    # Thales: (z − 1)·conj(z + 1) is purely imaginary, so the chords are perpendicular
    assert abs(((z - 1) * (z + 1).conjugate()).real) < 1e-12
    assert abs(abs(1 - z) - 2 * math.sin(math.radians(ALPHA / 2))) < 1e-12 and abs(abs(1 - z) - 1) < 1e-12
    assert abs(abs(1 + z) - 2 * math.cos(math.radians(ALPHA / 2))) < 1e-12
    left.line(zx, zy, px, py, "line", 2.4)
    left.line(zx, zy, mx, my, "line", 2.4)
    left.right_angle(zx, zy, -150, size=10, color="dim")
    left.angle(cx, cy, 26, 0, ALPHA, "*α*")
    left.dot(px, py, 4.0, "ink", ring="bg")
    left.dot(mx, my, 4.0, "ink", ring="bg")
    ix, iy = P(90)
    left.circle(ix, iy, 5, color="dim", width=1.4, fill="bg")
    left.text(ix + 10, iy - 8, "*i*", size=14, color="dim")
    left.dot(zx, zy, 5.5, "now", ring="bg")
    left.text(zx + 8, zy - 12, "*z* = e^{*iα*}", size=14, color="now")
    left.text(px + 8, py + 20, "+1", size=14, color="ink")
    left.text(mx - 8, my + 20, "−1", size=14, color="ink", anchor="end")
    left.text(0.68 * zx + 0.32 * px - 8, 0.68 * zy + 0.32 * py + 6, "|1 − *z*|", size=14, color="line", anchor="end")
    left.text((zx + mx) / 2 + 4, (zy + my) / 2 + 24, "|1 + *z*|", size=14, color="line", anchor="middle")

    # --- the sum of the two chords against α ---
    ax = right.axes(40, 22, 210, 200, (0, 180), (1.8, 3.0))
    ax.xaxis(at=1.8, ticks=[0, 60, 90, 180], labels=["0°", "60°", "90°", "180°"], size=13)
    ax.yaxis(at=0, ticks=[2, 2 * math.sqrt(2)], labels=["2", "2√2"], size=13)
    right.text(ax.X(180) - 2, ax.Y(1.8) + 34, "*α*", size=15, color="dim", anchor="end")
    for d in range(181):
        assert abs(chord_sum(d) - 2 * math.sqrt(1 + math.sin(math.radians(d)))) < 1e-12
        assert chord_sum(d) <= 2 * math.sqrt(2) + 1e-12
    assert abs(chord_sum(90) - 2 * math.sqrt(2)) < 1e-12 and abs(2 / math.sin(math.pi / 4) - 2 * math.sqrt(2)) < 1e-12
    assert abs(chord_sum(0) - 2) < 1e-12 and abs(chord_sum(180) - 2) < 1e-12
    assert abs(chord_sum(ALPHA) - 2.732) < 5e-4
    ax.hline(2 * math.sqrt(2), "lean", 1.8, dash="6 4")
    ax.plot(chord_sum, 0, 180, n=240, color="line", width=2.6)
    x90, y90 = ax.pt(90, chord_sum(90))
    right.line(x90, y90, x90, ax.Y(1.8), "faint", 1.0, dash="3 4")
    right.dot(x90, y90, 4.5, "line", ring="bg")
    xa, ya = ax.pt(ALPHA, chord_sum(ALPHA))
    right.dot(xa, ya, 5.5, "now", ring="bg")
    right.text(xa + 12, ya + 20, "2.732", size=14, color="now")
    right.text(ax.X(180), ax.Y(2 * math.sqrt(2)) - 8, t("天花板 2√2", "ceiling 2√2"), size=13, color="lean", anchor="end")
    right.text(ax.X(96), ax.Y(1.9), "2√(1 + sin *α*)", size=14, color="line")
