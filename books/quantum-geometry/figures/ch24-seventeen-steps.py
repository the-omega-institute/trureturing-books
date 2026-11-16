"""以 θ* 为步长转圈：十七步几乎闭合成多边形，长时间才走遍圆周（第二十四章 §24.5，例 ex-dottie-orbit-seventeen）。
Turning by θ* each step: after seventeen steps the orbit almost closes into a polygon, and only over a long time does
it cover the circle (chapter 24, §24.5, example ex-dottie-orbit-seventeen).

Three circles with the points n·θ* mod 2π for n = 0 … N − 1, N = 17, 100 and 3256. In the first the points are joined
in order (two turns: the star polygon {17/2}); the gap of 0.110° between the start and point 17 is shown magnified.
The script asserts 17θ* = 4π − 0.0019233 and that 3256 is the first return closer than that (0.0012211).
"""

import math

from _ch24 import THETA

SIZE = (740, 290)
WRAP = True
ALT = {
    "zh": "三栏，各是一个圆，圆上的点是以 θ* ≈ 0.739 弧度为步长依次转到的位置。第一栏 17 个点，按顺序用细线连起来，绕两圈，"
          "几乎闭合成一个十七角星形；起点与第 17 步之间只差 0.11°，右下的放大框里一小段品红的弧标出这道缺口。"
          "第二、三栏把第 k 步的点画在离圆心 0.3 + 0.7k/N 倍半径处，越晚越往外。第二栏 100 个点排成 17 条辐条，仍挤在 17 个方向上。"
          "第三栏 3256 个点，辐条一圈圈错开，大致铺满各个方向。",
    "en": "Three panels, each a circle; the points are the positions reached by turning θ* ≈ 0.739 radians at each step. "
          "Panel 1: 17 points joined in order by thin lines; they go round twice and almost close into a 17-pointed star. "
          "Start and step 17 differ by only 0.11°, and a short magenta arc in the magnified box at the lower right marks the "
          "gap. Panels 2 and 3 draw step k at 0.3 + 0.7k/N of the radius, later steps further out. Panel 2: 100 points in 17 "
          "spokes, still crowded into 17 directions. Panel 3: 3256 points whose spokes drift round and by now fill every direction.",
}

GAP = 4 * math.pi - 17 * THETA
assert abs(GAP - 0.0019233497) < 1e-9 and abs(math.degrees(GAP) - 0.1102) < 5e-5
_best = min(range(18, 3257), key=lambda n: min((n * THETA) % (2 * math.pi), 2 * math.pi - (n * THETA) % (2 * math.pi)))
assert _best == 3256 and abs((3256 * THETA) % (2 * math.pi) - 0.0012211) < 1e-7
assert all(min((n * THETA) % (2 * math.pi), 2 * math.pi - (n * THETA) % (2 * math.pi)) > 0.0012
           for n in range(18, 3256))


def ring(p, n, title, joined=False, inset=False):
    t = p.t
    p.text(p.width / 2, 22, title, size=14, weight=600, anchor="middle")
    cx, cy, r = p.width / 2, 162, 84
    p.circle(cx, cy, r, color="faint", width=1.2)
    # on the first circle every point sits on the circle; on the others step k sits at radius r·(0.3 + 0.7 k/n),
    # so points that land in the same direction at different times are drawn apart
    rad = (lambda k: r) if joined else (lambda k: r * (0.3 + 0.7 * k / n))
    pts = [(cx + rad(k) * math.cos(math.pi / 2 - k * THETA), cy - rad(k) * math.sin(math.pi / 2 - k * THETA)) for k in range(n + 1)]
    if joined:
        p.polyline(pts, "line", 1.2)
    for k, (x, y) in enumerate(pts[:n]):
        p.dot(x, y, (3.2 if n <= 100 else 1.2) * (1.5 if k == 0 else 1), "ink", ring="bg" if n <= 100 or k == 0 else None)
    if inset:
        # the start and point 17, magnified: the gap 4π − 17θ* is an arc of 0.110°
        bx, by, bw, bh = 170, 42, 60, 42
        p.rect(bx, by, bw, bh, color="area", width=1.0, rx=3)
        p.line(cx + 6, cy - r - 2, bx, by + 12, "area", 1.0, dash="2 3")
        mid = bx + bw / 2
        p.line(bx + 6, by + 14, bx + bw - 6, by + 14, "faint", 1.0)
        p.dot(mid - 14, by + 14, 4.2, "ink", ring="bg")
        p.dot(mid + 14, by + 14, 3.2, "ink", ring="bg")
        p.line(mid - 10, by + 14, mid + 10, by + 14, "area", 2.6)
        p.text(mid, by + 35, "0.11°", size=13, color="area", anchor="middle")
    p.text(cx, 278, t(f"{n} 步" if joined else f"{n} 步：越往外越晚", f"{n} steps" if joined else f"{n} steps, later further out"), size=13, color="dim", anchor="middle")


def draw(fig):
    a, b, c = fig.row([236, 236, 236], 290, gap=16)
    ring(a, 17, a.t("17 步：几乎闭合", "17 steps: almost closed"), joined=True, inset=True)
    ring(b, 100, b.t("100 步：仍挤在 17 处", "100 steps: still near 17 spots"))
    ring(c, 3256, c.t("3256 步：辐条转开", "3256 steps: the spokes turn"))
