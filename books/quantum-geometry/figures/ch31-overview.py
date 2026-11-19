"""第三十一章地图：素数圆弧、临界带双壳与埃尔米特—比勒正性。
Chapter 31 at a glance: prime arcs, critical-strip balance and Hermite–Biehler positivity.
"""

import cmath
import math

from _ch22 import primes
from _overview import label, title

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "第一栏画对数长度的素数步及复平面里的欧拉部分积螺旋。第二栏画 p = 3 的两条镜像衰减曲线在 σ = ½ 相交，并画出临界线的凯莱单位圆像。第三栏以二阶半正定锥示意舒尔条件，并以红色虚线指向仍开放的整函数修饰桥。",
    "en": "Panel I shows log-length prime steps and the Euler partial-product spiral in the complex plane. Panel II shows two reflected decay curves for p = 3 meeting at σ = ½ and the Cayley image of the critical line on the unit circle. Panel III illustrates Schur positivity with a two-by-two PSD cone and a dashed red link for the open entire-modifier bridge.",
}


def prime_arcs(panel):
    title(panel, "I　素数圆弧与欧拉积", "I  Prime arcs and Euler product")
    ps = primes(19)
    lengths = [math.log(p) for p in ps[:4]]
    total = math.fsum(lengths)
    x = 19
    for p, length in zip(ps, lengths):
        step = 198 * length / total
        panel.arrow(x, 73, x + step - 2, 73, "line", 1.8, head=6)
        panel.text(x + step / 2, 60, panel.t(str(p), str(p)), color="line", size=13, anchor="middle")
        x += step
    assert math.isclose(x, 217) and math.isclose(total, math.log(math.prod(ps[:4])))
    label(panel, 100, "每步 ln p", "Step length ln p", size=13, color="dim")

    s = 1.25 + 2.0j
    product = [1 + 0j]
    for p in ps:
        product.append(product[-1] / (1 - p ** -s))
    assert math.isclose(abs(product[-1]), math.prod(abs(1 - p ** -s) ** -1 for p in ps))
    xmin, xmax = min(z.real for z in product) - 0.025, max(z.real for z in product) + 0.025
    ymin, ymax = min(z.imag for z in product) - 0.025, max(z.imag for z in product) + 0.025
    assert all(xmin <= z.real <= xmax and ymin <= z.imag <= ymax for z in product)
    ax = panel.axes(24, 116, 188, 119, (xmin, xmax), (ymin, ymax))
    ax.frame()
    ax.hline(0, "faint")
    ax.vline(1, "faint")
    path = [ax.pt(z.real, z.imag) for z in product]
    panel.polyline(path, "violet", 2.1)
    panel.dot(*path[0], 4, "ink", ring="bg")
    for point in path[1:]:
        panel.dot(*point, 3, "violet", ring="bg")
    label(panel, 259, "∏ₚ (1 − p⁻ˢ)⁻¹ · 部分积", "∏ₚ (1 − p⁻ˢ)⁻¹ · partial products", size=13)


def balance(panel):
    title(panel, "II　临界带双壳平衡", "II  Dual-shell balance")
    prime = 3
    direct = lambda sigma: prime ** -sigma
    mirror = lambda sigma: prime ** (sigma - 1)
    ax = panel.axes(25, 60, 186, 98, (0, 1), (0.25, 1.07))
    ax.frame()
    ax.vline(0.5, "dim", dash="3 4")
    ax.plot(direct, color="line", width=2.3)
    ax.plot(mirror, color="area", width=2.3)
    assert direct(0.5) == mirror(0.5)
    assert all(math.isclose(direct(s) * mirror(s), 1 / prime) for s in (0, 0.5, 1))
    ax.points([(0.5, direct(0.5))], "ink", r=4, ring="bg")
    label(panel, 50, "p^{−σ} 与 p^{−(1−σ)}", "p^{−σ} and p^{−(1−σ)}", size=14)
    label(panel, 179, "σ = ½", "σ = ½", color="ink")

    # The chapter's Cayley ratio is (s−1)/s; the sample ordinates are not zeros.
    cx, cy, r = 56, 230, 30
    panel.circle(cx, cy, r, color="lean", width=1.7)
    for height in (-1.5, -0.5, 0, 0.5, 1.5):
        s = complex(0.5, height)
        z = (s - 1) / s
        assert cmath.isclose(abs(z), 1)
        panel.dot(cx + r * z.real, cy - r * z.imag, 3.2, "lean", ring="bg")
    panel.text(103, 222, panel.t("凯莱单位圆", "Cayley unit circle"), size=13)
    panel.chip(103, 246, panel.t("LEAN ✓", "LEAN ✓"), "lean")


def positivity(panel):
    title(panel, "III　埃尔米特—比勒正性", "III  Hermite–Biehler positivity")
    label(panel, 49, "二阶舒尔截面", "2 × 2 Schur section", size=13, color="dim")
    # For [[t+x, y], [y, t−x]], eigenvalues are t ± hypot(x,y).
    cx, apex, radius, depth = 118, 156, 63, 16
    def cone_point(angle, height):
        return cx + radius * height * math.cos(angle), apex - 79 * height + depth * height * math.sin(angle)

    rim = [cone_point(math.tau * j / 80, 1) for j in range(81)]
    panel.polygon([(cx, apex), *rim[:41]], "violet", fill_opacity=0.18)
    panel.ellipse(cx, apex - 79, radius, depth, color="violet", fill="violet", fill_opacity=0.10, width=1.7)
    panel.line(*rim[0], cx, apex, "violet", 1.8)
    panel.line(*rim[40], cx, apex, "violet", 1.8)
    for height in (0.35, 0.68, 1.0):
        for theta in (0, math.pi / 4, math.pi / 2):
            x, y = height * math.cos(theta), height * math.sin(theta)
            assert math.isclose(height**2 - x**2 - y**2, 0, abs_tol=1e-14)
            assert height**2 - (x / 2)**2 - (y / 2)**2 > 0
    label(panel, 180, "K ≽ 0", "K ≽ 0", color="violet")
    panel.arrow(118, 188, 118, 215, "open", 1.6, dash="4 3", head=7)
    label(panel, 237, "经典修饰因子 Mₗ", "Classical modifier Mₗ", size=14)
    panel.chip(118, 259, panel.t("开放 OPEN", "OPEN"), "open", anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)
    prime_arcs(one)
    balance(two)
    positivity(three)
