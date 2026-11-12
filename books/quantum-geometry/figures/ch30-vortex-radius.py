"""只有一个半径能让整圈停住：邻居吹来的切向速度随半径变小，进动给的切向速度随半径变大，两者在 R = √(b/4Ω) 处相等。
Only one radius lets the whole ring stand still: the tangential speed blown in by the neighbours
falls with the radius, the tangential speed of the precession grows with it, and the two are equal
at R = √(b/4Ω).

Drawn for b = 2, Ω = 1/2 (so R = 1): the neighbours' speed b/(4ρ) and the precession speed Ωρ. The
script checks both against the field of the definition: it evaluates F_{b,Ω} on the alternating
hexagon of radius ρ and splits the tangential velocity of each vortex into the precession term and
the sum over the other vortices, which come out as s_j·Ωρ and −s_j·b/(4ρ).
"""

import math

SIZE = (500, 300)
ALT = {
    "zh": "横轴是正负相间的涡旋所在圆的半径 ρ，纵轴是切向速度的大小。紫色的直线 Ωρ 是进动给的切向速度，随半径变大；"
          "蓝色的曲线 b/(4ρ) 是其余涡旋吹来的切向速度，随半径变小。两者方向相反，在 ρ = R = 1 处相交，那里整圈静止；"
          "左边标着“邻居占上风”，右边标着“进动占上风”。图中取 b = 2、Ω = 1/2。",
    "en": "The horizontal axis is the radius ρ of the circle carrying the alternating vortices, the vertical axis the size "
          "of a tangential speed. The violet line Ωρ is the speed given by the precession and grows with the radius; the "
          "blue curve b/(4ρ) is the speed blown in by the other vortices and falls with it. The two point in opposite "
          "directions and cross at ρ = R = 1, where the whole ring stands still; the left is marked ‘neighbors win’, the "
          "right ‘precession wins’. Here b = 2 and Ω = 1/2.",
}

B, OM = 2.0, 0.5
R = math.sqrt(B / (4 * OM))
assert abs(R - 1) < 1e-12


def tangential_parts(N, rho):
    """Tangential velocity of each vortex of the alternating N-gon of radius rho, split into the
    precession term and the interaction sum of definition def-ch30-alternating-vortex-polygon."""
    s = [(-1) ** j for j in range(N)]  # s_1 = +1, s_2 = −1, … (index from 0)
    x = [rho * math.cos(2 * math.pi * (j + 1) / N) for j in range(N)]
    y = [rho * math.sin(2 * math.pi * (j + 1) / N) for j in range(N)]
    out = []
    for j in range(N):
        px, py = -s[j] * OM * y[j], s[j] * OM * x[j]
        ix = iy = 0.0
        for k in range(N):
            if k != j:
                d = (x[j] - x[k]) ** 2 + (y[j] - y[k]) ** 2
                ix += -B / 2 * s[k] * (y[j] - y[k]) / d
                iy += B / 2 * s[k] * (x[j] - x[k]) / d
        tx, ty = -y[j] / rho, x[j] / rho  # unit tangent, counter-clockwise
        out.append((s[j], px * tx + py * ty, ix * tx + iy * ty))
    return out


for rho in (0.4, 0.7, 1.0, 1.5, 2.2):
    for sj, prec, inter in tangential_parts(6, rho):
        assert abs(prec - sj * OM * rho) < 1e-12
        assert abs(inter + sj * B / (4 * rho)) < 1e-12
assert all(abs(p + i) < 1e-12 for _, p, i in tangential_parts(8, R))  # at R the ring is at rest


def draw(fig):
    t = fig.t
    ax = fig.axes(70, 34, 400, 210, (0, 2.4), (0, 1.5))
    ax.xaxis(ticks=[0, 1, 2], labels=["0", "*R* = 1", "2"], size=14)
    ax.yaxis(ticks=[0, 0.5, 1, 1.5], labels=["0", "0.5", "1", "1.5"], size=14)
    ax.vline(R, "faint", 1.2, dash="3 4")
    ax.plot(lambda r: B / (4 * r), B / (4 * 1.5), 2.4, color="blue", width=2.6)
    ax.plot(lambda r: OM * r, 0, 2.4, color="violet", width=2.6)
    ax.points([(R, OM * R)], "ink", r=5, ring="bg")
    ax.text(2.35, B / (4 * 2.35), "*b*/(4*ρ*)", dy=-12, size=14, color="blue", anchor="end")
    ax.text(2.35, OM * 2.35, "Ω*ρ*", dy=22, size=14, color="violet", anchor="end")
    ax.text(R, OM * R, t("静止", "at rest"), dx=12, dy=4, size=14, color="ink", weight=600, halo=True)
    ax.text(0.41, 1.32, t("邻居占上风", "neighbors win"), size=14, color="blue")
    ax.text(1.75, 1.32, t("进动占上风", "precession wins"), size=14, color="violet", anchor="middle")
    fig.text(70, 20, t("切向速度", "tangential speed"), size=14, color="dim")
    fig.text(470, 290, "*ρ*", size=15, color="dim", anchor="end")
