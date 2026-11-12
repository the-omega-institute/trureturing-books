"""随机方向上的玻恩权重是均匀的：等高的球带面积相等，p = (1 + z)/2 把高度原样搬到 [0, 1] 上（第二章 §2.3）。
The Born weight of a random direction is uniform: zones of equal height have equal area, and
p = (1 + z)/2 carries height straight onto [0, 1] (chapter 2, §2.3).

Five zones of height 0.4 each. The script integrates 2π sin θ dθ over every zone and checks that each has
area 2π · 0.4 (Archimedes), and that each maps to a p-interval of length ⅕.
"""

import math


SIZE = (440, 336)
N = 5
ALT = {
    "zh": "左边一颗球，已知态 a 在北极，四条青色的纬线把球切成五条等高的球带，外面套着一只灰色虚线的圆柱帽盒。"
          "每条球带的面积都等于帽盒上同高的一圈，都是 2π × 0.4。右边一根竖直的刻度尺是玻恩权重 p，从底下的 0 到顶上的 1，"
          "虚线把每条纬线水平地连到尺上：五段一样长，各占 ⅕。",
    "en": "On the left, a sphere with the known state a at the north pole; four cyan circles of latitude cut it into five zones "
          "of equal height, and a grey dashed cylinder, Archimedes' hat box, is fitted around it. Each zone has the same area "
          "as the band of the box at the same height, 2π × 0.4. On the right, a vertical scale is the Born weight p, from 0 at "
          "the bottom to 1 at the top; dashed lines carry each latitude straight across to the scale, cutting it into five "
          "equal parts of ⅕ each.",
}


def zone_area(z0, z1, n=4000):
    """∫ 2π sin θ dθ over the zone z0 ≤ cos θ ≤ z1, by the midpoint rule."""
    t0, t1 = math.acos(z1), math.acos(z0)
    h = (t1 - t0) / n
    return sum(2 * math.pi * math.sin(t0 + (k + 0.5) * h) * h for k in range(n))


def draw(fig):
    t = fig.t
    zs = [-1 + 2 * k / N for k in range(N + 1)]
    for z0, z1 in zip(zs, zs[1:]):
        assert abs(zone_area(z0, z1) - 2 * math.pi * (z1 - z0)) < 1e-6
        assert abs((1 + z1) / 2 - (1 + z0) / 2 - 1 / N) < 1e-12

    el = 14
    cx, cy, R = 150, 160, 122
    sp = fig.sphere(cx, cy, R, el=el)
    k = math.cos(math.radians(el))            # the height z sits at cy − R·z·cos(el) on the limb
    # the hat box: a cylinder around the sphere
    top, bot = cy - R * k, cy + R * k
    e = R * math.sin(math.radians(el))
    fig.ellipse(cx, top, R, e, color="dim", width=1.2, dash="4 4")
    fig.ellipse(cx, bot, R, e, color="dim", width=1.2, dash="4 4")
    fig.line(cx - R, top, cx - R, bot, "dim", 1.2, dash="4 4")
    fig.line(cx + R, top, cx + R, bot, "dim", 1.2, dash="4 4")
    sp.outline(fill="cyan", fill_opacity=0.05)
    for z in zs[1:-1]:
        sp.small_circle((0, 0, 1), math.degrees(math.acos(z)), "line", 1.8)
    sp.dot((0, 0, 1), "now", 5)
    sp.label((0, 0, 1), "*a*", dx=10, dy=-8, size=16, color="now")

    # the scale of p
    sx = 336
    fig.line(sx, top, sx, bot, "ink", 1.6)
    for i, z in enumerate(zs):
        y = cy - R * z * k
        fig.line(sx - 6, y, sx + 6, y, "ink", 1.6)
        fig.text(sx + 14, y, f"{(1 + z) / 2:g}", size=14, color="dim", middle=True)
        if 0 < i < N:
            fig.line(cx + R * math.sqrt(1 - z * z) + 4, y, sx - 10, y, "line", 1.1, dash="3 4")
    for z0, z1 in zip(zs, zs[1:]):
        y0, y1 = cy - R * z0 * k, cy - R * z1 * k
        fig.line(sx, y0 - 3, sx, y1 + 3, "line", 5, cap="round")
    fig.text(sx, top - 16, "*p*", size=16, color="line", anchor="middle", weight=600)
    fig.text(sx + 48, cy, t("各 ⅕", "⅕ each"), size=15, color="line", middle=True)
    fig.text(cx, 328, t("每条球带面积 2π × 0.4", "each zone: area 2π × 0.4"), size=14, color="dim", anchor="middle")
