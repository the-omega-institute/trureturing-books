"""固定北极的仿射映射保持单位球，当且仅当 λ² ≤ a；纯振幅阻尼正好在边界上（第四章 §4.2）。
An affine map fixing the north pole keeps the unit ball inside itself exactly when λ² ≤ a; pure amplitude
damping lies on the boundary (chapter 4, §4.2).

The region is the theorem the chapter cites with lean= (thm-north-pole-ball-criterion), so it is green.
The script checks the criterion by brute force on the shell for a point inside, a point on the boundary and
the magenta point outside, using the escape point the proof constructs for the last one.
"""

import math

SIZE = (450, 350)
ALT = {
    "zh": "坐标平面，横轴是轴向因子 a（0 到 1），纵轴是横向因子 λ（−1 到 1）。绿色的区域是 λ² ≤ a，由上下两支抛物线 λ = ±√a 围成，"
          "边界上标着“纯振幅阻尼 λ = √a”。左端 a = 0 处区域收成一点，右端 a = 1 处张开成 −1 到 1 的整段。"
          "区域外有一个品红的点 (0.15, 0.75)，旁注“刺穿球皮”。",
    "en": "A coordinate plane with the axial factor a across (0 to 1) and the transverse factor λ up (−1 to 1). The green region "
          "is λ² ≤ a, bounded by the two branches of the parabola λ = ±√a; the upper boundary is labelled “pure amplitude "
          "damping λ = √a”. At a = 0 the region closes to a point; at a = 1 it opens to the whole segment from −1 to 1. Outside "
          "it is a magenta point (0.15, 0.75), marked “pierces the shell”.",
}


def max_radius2(a, lam, n=2000):
    """The largest squared radius of the image of the shell under (λx, λy, az + 1 − a), sampled."""
    best = 0.0
    for k in range(n + 1):
        t = math.pi * k / n
        x, z = math.sin(t), math.cos(t)
        best = max(best, (lam * x) ** 2 + (a * z + 1 - a) ** 2)
    return best


def draw(fig):
    t = fig.t
    assert max_radius2(0.5, 0.5) <= 1 + 1e-12                 # inside
    assert max_radius2(0.5, math.sqrt(0.5)) <= 1 + 1e-12      # on the boundary: pure amplitude damping
    a, lam = 0.15, 0.75                                         # outside: the proof's escape point
    d = (lam ** 2 - a) / (lam ** 2 + 1)
    x, z = math.sqrt(d * (2 - d)), 1 - d
    assert (lam * x) ** 2 + (a * z + 1 - a) ** 2 > 1

    ax = fig.axes(80, 30, 336, 260, (0, 1.0), (-1.12, 1.12))
    up = [(i / 200, math.sqrt(i / 200)) for i in range(201)]
    down = [(u, -v) for u, v in reversed(up)]
    ax.cv.polygon([ax.pt(*p) for p in up + down], "lean", fill_opacity=0.16)
    ax.hline(0, "faint", 1.0, dash="3 4")
    ax.path(up, "lean", 2.4)
    ax.path(down, "lean", 2.4)
    ax.xaxis(ticks=[0, 0.5, 1], labels=["0", "0.5", "1"], size=14)
    ax.yaxis(ticks=[-1, 0, 1], labels=["−1", "0", "1"], size=14)

    px, py = ax.pt(a, lam)
    fig.dot(px, py, 5.6, "area", ring="bg")
    fig.text(px + 8, py - 10, t("刺穿球皮", "pierces the shell"), size=15, color="area", halo=True)
    bx, by = ax.pt(0.96, 1.07)
    fig.text(bx, by, t("纯振幅阻尼 *λ* = √*a*", "pure amplitude damping *λ* = √*a*"), size=14, color="lean",
             anchor="end", halo=True)
    cx, cy = ax.pt(0.62, -0.05)
    fig.text(cx, cy, "*λ*^{2} ≤ *a*", size=16, color="lean", weight=600, anchor="middle", halo=True)
    fig.text(ax.x + ax.w / 2, 338, t("轴向因子 *a*", "axial factor *a*"), size=15, color="dim", anchor="middle")
    fig.text(24, ax.y + ax.h / 2, t("横向因子 *λ*", "transverse factor *λ*"), size=15, color="dim", anchor="middle", rotate=90)
