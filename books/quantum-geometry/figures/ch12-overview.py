"""第十二章地图：测量的角度就是门；左右各转 90° 取出精确斜率；维数越高，分布越挤向赤道。
Chapter 12 at a glance: the measuring angle is the gate; a quarter turn each way gives the exact slope; the higher the
dimension, the more the distribution crowds onto the equator.

Panel I: two cluster nodes joined by CZ; node 1 is measured along the equatorial angle α (amber pointer), and the bit s
goes on a classical wire (dashed) to node 2, which carries the output.
Panel II: f(θ) = cos θ with the amber point at θ = 60°, the two cyan samples at θ ± 90° and the dashed tangent; the script
asserts ½[f(θ + 90°) − f(θ − 90°)] = f′(θ) = −√3/2 (example ex-cluster-shift-and-gradient, step 2).
Panel III: the exact density of x₁ for a uniform point on S^{d−1} for d = 3, 30, 300 (a literature result, so the panel
carries no Lean chip: the chapter's verified mode bound cor-finite-trace-mode-budget is independent of it).
"""

import math

from _ch12 import density

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：两个圆形的簇态节点由一条标着 CZ 的线连起来；左边的节点里有一支琥珀色的指针，标着测量角 α；"
          "一条虚线箭头标着 s，把测量结果从左边的节点送到右边的输出节点。"
          "第二栏：一条余弦曲线 f(θ) = cos θ；琥珀色的点在 θ = 60°，两个青色的点在它左右各 90° 处，青色竖线是它们的高度；"
          "过琥珀色的点有一条虚线切线。两个青色高度之差的一半正是切线的斜率。"
          "第三栏：横轴是坐标 x₁，从 −1 到 1；三条密度曲线，d = 3 时是一条平线，d = 30 时是一个鼓包，d = 300 时是赤道上一个"
          "又高又窄的青色尖峰。",
    "en": "Three panels. Panel I: two round cluster nodes joined by a line marked CZ; the left node holds an amber pointer "
          "marked with the measuring angle α; a dashed arrow marked s carries the outcome from the left node to the right "
          "output node. Panel II: a cosine curve f(θ) = cos θ; the amber point is at θ = 60° and the two cyan points 90° to "
          "either side, with cyan vertical bars for their heights; a dashed tangent passes through the amber point. Half the "
          "difference of the two cyan heights is exactly the slope of the tangent. Panel III: the horizontal axis is the "
          "coordinate x₁ from −1 to 1; three density curves: flat for d = 3, a bump for d = 30, and a tall narrow cyan spike "
          "at the equator for d = 300.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def along(ox, oy, deg, length):
    a = math.radians(deg)
    return ox + length * math.cos(a), oy - length * math.sin(a)


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 262, gap=16)

    # ---- I: measuring along α turns into a gate on the other node
    title(one, "I　测量的角度就是门", "I  the angle is the gate")
    (x1, y1), (x2, y2), r = (52, 128), (184, 128), 44
    one.line(x1 + r, y1, x2 - r, y2, "ink", 2.4)
    one.text((x1 + x2) / 2, y1 - 10, "CZ", size=13, color="dim", anchor="middle")
    for x, y in ((x1, y1), (x2, y2)):
        one.circle(x, y, r, color="dim", width=1.6, fill="cyan", fill_opacity=0.06)
    one.line(x1 - r + 6, y1, x1 + r - 6, y1, "faint", 1.2, dash="3 3")
    alpha = 60
    one.arrow(x1, y1, *along(x1, y1, alpha, r - 6), "now", 2.6, head=8)
    one.arc(x1, y1, 16, 0, alpha, "now", 1.4)
    one.text(*along(x1, y1, alpha / 2, 25), "*α*", size=14, color="now", anchor="middle", middle=True, halo=True)
    one.text(x1, y1 + r + 18, one.t("测量", "measured"), size=13, color="dim", anchor="middle")
    one.text(x2, y2 + r + 18, one.t("输出", "output"), size=13, color="dim", anchor="middle")
    one.text(x2, y2, "*ψ*′", size=16, color="ink", anchor="middle", middle=True)
    pts = [(x1 + (x2 - x1) * k / 30, y1 + r + 34 + 26 * math.sin(math.pi * k / 30)) for k in range(31)]
    pts = [(x, y) for x, y in pts]
    one.curve_arrow(pts[2:-1], "dim", 1.6, dash="5 4", head=8)
    one.text((x1 + x2) / 2, y1 + r + 76, one.t("经典比特 *s*", "classical bit *s*"), size=13, color="dim",
             anchor="middle")

    # ---- II: a quarter turn each way gives the exact slope
    title(two, "II　左右各转 90°", "II  ±90° gives the slope")
    th = math.radians(60)
    f, df = math.cos, lambda t: -math.sin(t)
    shift = 0.5 * (f(th + math.pi / 2) - f(th - math.pi / 2))
    assert abs(shift - df(th)) < 1e-12 and abs(shift + math.sqrt(3) / 2) < 1e-12
    lo, hi = math.radians(-60), math.radians(200)
    ax = two.axes(24, 46, 196, 180, (lo, hi), (-1.15, 1.15))
    ax.hline(0, "faint", 1.2)
    ax.plot(f, lo, hi, color="ink", width=2.2)
    dt = 0.75
    ax.path([(th - dt, f(th) - dt * df(th)), (th + dt, f(th) + dt * df(th))], "dim", 1.6, dash="5 4")
    for s, lab in ((-1, "−90°"), (1, "+90°")):
        t = th + s * math.pi / 2
        ax.path([(t, 0), (t, f(t))], "line", 3.0)
        ax.points([(t, f(t))], color="line", r=4.6, ring="bg")
        ax.text(t, 0, lab, dy=18 if f(t) > 0 else -10, size=13, color="line", anchor="middle", halo=True)
    ax.points([(th, f(th))], color="now", r=5.0, ring="bg")
    ax.text(th, f(th), "*θ*", dx=8, dy=-10, size=14, color="now", halo=True)
    two.text(two.width - 14, 246, "*f* = cos *θ*", size=13, color="dim", anchor="end")

    # ---- III: higher dimension, narrower equatorial band
    title(three, "III　维数越高，越挤向赤道", "III  crowding onto the equator")
    peak = density(0, 300)
    ax = three.axes(18, 46, 200, 156, (-1, 1), (0, peak * 1.06))
    ax.xaxis(ticks=[-1, 0, 1], labels=["−1", "0", "1"], size=12)
    xs = [-1 + 2 * k / 400 for k in range(401)]
    for d, color in ((3, "dim"), (30, "dim")):
        ax.path([(x, density(x, d)) for x in xs], color, 1.8)
    sharp = [(x, density(x, 300)) for x in xs]
    ax.area(sharp, "line", base=0, fill_opacity=0.22)
    ax.path(sharp, "line", 2.4)
    ax.text(-0.62, density(-0.62, 3), "*d* = 3", dy=-8, size=13, color="dim", anchor="middle")
    ax.text(0.24, density(0.24, 30), "*d* = 30", dx=8, dy=-2, size=13, color="dim")
    ax.text(0.06, peak * 0.86, "*d* = 300", size=13, color="line")
    three.text(30, 238, "*x*_{1}", size=13, color="dim", anchor="middle")
