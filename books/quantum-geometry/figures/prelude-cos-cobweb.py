"""上一层的刻度当下一层的角：cos 的迭代一步步绕向 θ*，每一步都差一点。
The reading of one layer becomes the angle of the next: iterating cos winds step by step towards
θ*, and every step still misses.

y = cos θ (cyan) and y = θ (grey) on [0, 1.05]; the amber cobweb starts at θ₀ = 1 and goes to the curve
(read cos θ_k) and across to the diagonal (use it as θ_{k+1}). θ₁ = cos 1 ≈ 0.540 and θ₂ ≈ 0.858 are
checked; θ* ≈ 0.7390851 is found by iteration and |cos θ_k − θ_k| > 0 is asserted for the drawn steps.
Banach's contraction principle is a literature result in the chapter's note.
"""

import math

SIZE = (440, 330)
ALT = {
    "zh": "一张坐标图，横轴 θ、纵轴 y，都从 0 到 1。青色的曲线是 y = cos θ，灰色的对角线是 y = θ，两者交于一点 θ* ≈ 0.739。"
          "琥珀色的折线从 θ₀ = 1 出发，竖着走到曲线上读出 cos θ₀，再横着走到对角线上把它当作下一个角 θ₁ ≈ 0.540，"
          "如此在两线之间来回，绕成越来越小的方框，向交点收拢。右下方标着文献结果。",
    "en": "A plot with θ across and y up, both from 0 to 1. The cyan curve is y = cos θ, the grey diagonal y = θ; they meet at "
          "θ* ≈ 0.739. An amber path starts at θ₀ = 1, goes up to the curve to read cos θ₀, then across to the diagonal to use "
          "it as the next angle θ₁ ≈ 0.540, and so on back and forth, winding in smaller and smaller boxes towards the "
          "crossing. A tag in the lower right marks this as a literature result.",
}


def draw(fig):
    t = fig.t
    ax = fig.axes(54, 22, 340, 260, (0.0, 1.05), (0.0, 1.05))
    ax.xaxis(ticks=[0, 0.5, 1], labels=["0", "0.5", "1"], label="*θ*", size=13)
    ax.yaxis(ticks=[0, 0.5, 1], labels=["0", "0.5", "1"], label="*y*", size=13)
    ax.plot(lambda x: x, color="dim", width=1.4)
    ax.plot(math.cos, color="line", width=2.6)
    th = [1.0]
    for _ in range(9):
        th.append(math.cos(th[-1]))
    assert abs(th[1] - 0.5403) < 1e-4 and abs(th[2] - 0.8576) < 1e-4
    star = 0.5
    for _ in range(200):
        star = math.cos(star)
    assert abs(star - 0.7390851) < 1e-7
    assert all(abs(math.cos(x) - x) > 0 for x in th)
    pts = [(th[0], 0.0)]
    for k in range(len(th) - 1):
        pts += [(th[k], th[k + 1]), (th[k + 1], th[k + 1])]
    ax.path(pts, color="now", width=1.6)
    for k, label in ((0, "*θ*_{0}"), (1, "*θ*_{1}"), (2, "*θ*_{2}")):
        x, y = ax.pt(th[k], 0)
        fig.dot(x, y, 3.6, "now", ring="bg")
        fig.text(x, y - 10, label, size=13, color="now", anchor="middle", halo=True)
    sx, sy = ax.pt(star, star)
    fig.dot(sx, sy, 5.5, "argued", ring="bg")
    lx, ly = ax.pt(0.08, 0.42)
    fig.text(lx, ly, "*θ*^{∗} ≈ 0.739", size=14, color="argued", halo=True)
    fig.line(lx + 98, ly - 4, sx - 6, sy + 3, "argued", 1.1)
    cx, cy = ax.pt(0.18, math.cos(0.18))
    fig.text(cx, cy + 22, "*y* = cos *θ*", size=14, color="line", halo=True)
    dx, dy = ax.pt(0.9, 0.9)
    fig.text(dx + 4, dy - 8, "*y* = *θ*", size=13, color="dim", anchor="end", halo=True)
    qx, qy = ax.pt(0.62, 0.14)
    fig.chip(qx, qy, t("文献结果", "literature"), "argued", size=13)
