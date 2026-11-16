"""两把尺子：外部角度尺在 90° 处到头，内禀快度尺 η = ∫ sec θ dθ 却一直通向无穷；快度尺上的等步，在角度尺上越挤越近 90°（第三十六章 §无穷离散步）。
Two rulers: the outside angle ruler ends at 90°, while the intrinsic rapidity ruler η = ∫ sec θ dθ runs on
to infinity; equal steps on the rapidity ruler crowd ever closer to 90° on the angle ruler (chapter 36,
infinite discrete steps).

Both rulers are linear in their own variable over the same width. The cyan marks are η_k = η(θ*) + k
(Δη = 1, k = 0…5) on the lower ruler and θ_k = gd(η_k) on the upper one, joined by dashed lines.
"""

import math

from _ch36 import ETA0, THETA_STAR, eta, theta_k

SIZE = (460, 236)
ALT = {
    "zh": "上下两把尺子。上面是角度尺 θ，从 0° 到 90°，在 90° 处被一道品红的竖墙截断。下面是快度尺 η，从 0 向右一直延伸，末端箭头标着 +∞。"
          "下尺上六个青色的点等距排开，标着 k = 0 到 5；虚线把它们连到上尺上对应的角度：第一个在 θ* ≈ 42°，之后一个比一个更挤向 90° 的墙，却都在墙的左边。",
    "en": "Two rulers. The upper one is the angle θ from 0° to 90°, cut off at 90° by a magenta wall. The lower one is the "
          "rapidity η, running from 0 to the right with an arrow marked +∞. Six cyan points sit evenly on the lower ruler, "
          "labelled k = 0 to 5; dashed lines take them to their angles on the upper ruler: the first at θ* ≈ 42°, the rest "
          "crowding ever closer to the 90° wall, all to its left.",
}

X0, W = 44, 330
ETA_MAX = 6.6


def draw(fig):
    t = fig.t
    yt, yb = 74, 176
    xt = lambda deg: X0 + deg / 90 * W
    xb = lambda e: X0 + e / ETA_MAX * W

    # upper ruler: the angle, which ends at 90°
    fig.line(X0, yt, xt(90), yt, "ink", 2.0)
    for d in range(0, 91, 15):
        fig.line(xt(d), yt, xt(d), yt + 6, "dim", 1.2)
    fig.text(xt(0), yt + 22, "0°", size=13, color="dim", anchor="middle")
    fig.text(xt(45), yt + 22, "45°", size=13, color="dim", anchor="middle")
    fig.line(xt(90), yt - 22, xt(90), yt + 14, "area", 3.4, cap="round")
    fig.text(xt(90), yt - 30, t("90° 纯光", "90° pure light"), size=14, color="area", weight=600, anchor="middle")
    fig.text(X0 - 12, yt, "θ", size=16, color="ink", anchor="end", middle=True, italic=True)

    # lower ruler: the rapidity, which never ends
    fig.arrow(X0, yb, 438, yb, "ink", 2.0, head=10)
    for e in range(0, 7):
        fig.line(xb(e), yb, xb(e), yb - 6, "dim", 1.2)
    fig.text(xb(0), yb - 12, "0", size=13, color="dim", anchor="middle")
    fig.text(438, yb - 14, "+∞", size=14, color="dim", anchor="end")
    fig.text(X0 - 12, yb, "η", size=16, color="ink", anchor="end", middle=True, italic=True)

    assert abs(eta(THETA_STAR) - ETA0) < 1e-15
    prev = 0.0
    for k in range(6):
        e = ETA0 + k
        th = math.degrees(theta_k(k))
        assert prev < th < 90 and abs(eta(math.radians(th)) - e) < 1e-9
        prev = th
        fig.line(xb(e), yb, xt(th), yt, "line", 1.1, dash="3 3", opacity=0.8)
        fig.dot(xb(e), yb, 4.0, "line", ring="bg")
        fig.dot(xt(th), yt, 4.0 if k < 3 else 3.0, "line", ring="bg")
        fig.text(xb(e), yb + 22, str(k), size=13, color="line", anchor="middle")
    fig.text(xb(ETA0) - 16, yb + 22, "*k* =", size=13, color="dim", anchor="end")
    fig.text(xt(math.degrees(THETA_STAR)), yt - 12, "θ*", size=14, color="line", anchor="middle")
    fig.text(X0 + W / 2, 224, t("等步 Δη = 1　·　sin θ = tanh η", "equal steps Δη = 1  ·  sin θ = tanh η"), size=13,
             color="dim", anchor="middle")
