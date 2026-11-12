"""支撑图一断开，两格的相位就各走各的（第二十七章，例 ex-lean-audit-part1-3）。
Cut the support graph and the two phases go their own ways (chapter 27, example ex-lean-audit-part1-3).

Both panels are the two coordinates of ι = Fin 2. On the left the single test vector x = (1, 1) is
non-zero on both coordinates, a cyan arc joins them, and a unitary A that keeps both coordinate rays
is forced to c₀ I₂: both diagonal phases point the same way. On the right the tests are e₀ and e₁,
each covering one coordinate only; no arc joins the two, and A = diag(1, i) keeps both rays while its
two phases differ by 90°. The script checks the numbers of the example: diag(c₀, c₁) maps (1, 1) to a
multiple of (1, 1) only when c₀ = c₁, and diag(1, i) maps e₀ and e₁ into their own rays but is not a
multiple of I₂.
"""

import cmath
import math

SIZE = (488, 262)
WRAP = True
ALT = {
    "zh": "两栏，每栏两个圆代表坐标 0 与 1，圆里紫色的箭头是对角元 A₀₀、A₁₁ 的相位。左栏：测试态只有 x = (1, 1)，"
          "一条青色的弧连起两个圆；两支紫色箭头指向同一方向，下方写着 A = c₀ I₂。右栏：测试态是 e₀ 与 e₁，"
          "每个只在一个圆上方有一小段青色的弧，两个圆之间的虚线弧被划掉，没有连起来；左圆的箭头指向 1，"
          "右圆的箭头指向 i，两者相差 90°，下方写着 diag(1, i) ≠ c I₂。",
    "en": "Two panels; in each, two circles stand for the coordinates 0 and 1, and the violet arrow in each circle is the "
          "phase of the diagonal entry A₀₀ or A₁₁. Left: the only test vector is x = (1, 1), and one cyan arc joins the two "
          "circles; both violet arrows point the same way, and below it reads A = c₀ I₂. Right: the test vectors are e₀ and "
          "e₁, each with a short cyan arc over one circle only; the dashed arc between the circles is struck out, so nothing "
          "joins them. The left arrow points to 1 and the right arrow to i, 90° apart, and below it reads "
          "diag(1, i) ≠ c I₂.",
}


def _checks():
    # left: A = diag(c0, c1) with A (1, 1) = d (1, 1) forces c0 = c1 = d
    c0, c1 = cmath.exp(0.9j), cmath.exp(0.9j)
    image = (c0 * 1, c1 * 1)
    assert abs(image[0] - image[1]) < 1e-12
    for other in (cmath.exp(0.2j), 1j, -1):
        assert abs(c0 * 1 - other * 1) > 1e-6          # a different c1 sends (1, 1) off its ray
    # right: diag(1, i) keeps the rays of e0 and e1, is unitary, and is not scalar
    a = ((1, 0), (0, 1j))
    e0, e1 = (1, 0), (0, 1)
    mul = lambda m, v: (m[0][0] * v[0] + m[0][1] * v[1], m[1][0] * v[0] + m[1][1] * v[1])
    assert mul(a, e0) == (1, 0) and mul(a, e1) == (0, 1j)
    assert all(abs(abs(a[k][k]) - 1) < 1e-12 for k in (0, 1))
    assert abs(a[0][0] - a[1][1]) > 1e-6
    gap = math.degrees(cmath.phase(a[1][1]) - cmath.phase(a[0][0]))
    assert abs(gap - 90) < 1e-9
    return math.degrees(cmath.phase(c0)), (math.degrees(cmath.phase(a[0][0])), math.degrees(cmath.phase(a[1][1])))


XS = (74, 162)
CY, R = 146, 24


def cells(p, phases):
    for k, (cx, ph) in enumerate(zip(XS, phases)):
        p.circle(cx, CY, R, color="edge", fill="panel", width=1.4)
        ex = cx + (R - 4) * math.cos(math.radians(ph))
        ey = CY - (R - 4) * math.sin(math.radians(ph))
        p.arrow(cx, CY, ex, ey, "axis", 2.2, head=7)
        p.text(cx, CY + R + 20, f"*A*_{{{k}{k}}}", size=14, anchor="middle")


def bridge(p, a, b, lift, color, width, **kw):
    mid, half = (a + b) / 2, (b - a) / 2
    pts = [(mid - half * math.cos(math.radians(t)), CY - R - 2 - lift * math.sin(math.radians(t))) for t in range(0, 181, 6)]
    p.polyline(pts, color, width, **kw)
    return mid, CY - R - 2 - lift


def draw(fig):
    same, (ph0, ph1) = _checks()
    left, right = fig.row([236, 236], 262, gap=16)

    # ---- left: one test vector covers both coordinates
    left.text(118, 22, left.t("测试态 (1, 1)：连通", "test (1, 1): connected"), size=14, weight=600, anchor="middle")
    mid, top = bridge(left, *XS, 34, "line", 2.2)
    left.text(mid, top - 10, "*x* = (1, 1)", size=14, color="line", anchor="middle")
    cells(left, (same, same))
    left.text(118, 238, "*A* = *c*_{0} *I*_{2}", size=14, anchor="middle")

    # ---- right: each test vector covers one coordinate; nothing joins them
    right.text(118, 22, right.t("测试态 *e*_{0}、*e*_{1}：断开", "tests *e*_{0}, *e*_{1}: cut"), size=14, weight=600,
               anchor="middle")
    for cx, name, side in zip(XS, ("*e*_{0}", "*e*_{1}"), (-1, 1)):
        right.arc(cx, CY, R + 7, 35, 145, "line", 2.2)
        right.text(cx + side * (R + 8), CY - R - 6, name, size=14, color="line", anchor="end" if side < 0 else "start")
    mid, top = bridge(right, *XS, 34, "faint", 1.3, dash="4 3")
    right.cross(mid, top, size=7, color="dim", width=1.8)
    cells(right, (ph0, ph1))
    right.text(XS[0] + R + 4, CY + 4, "1", size=13, color="axis")
    right.text(XS[1] + 5, CY - R + 14, "*i*", size=13, color="axis")
    # the 90° between the two phases, measured from the direction of the first
    right.line(XS[1], CY, XS[1] + R - 3, CY, "faint", 1.2, dash="3 3")
    right.angle(XS[1], CY, 10, 0, 90, "", color="dim", width=1.2)
    right.text(XS[1] + R + 6, CY - 8, "90°", size=13, color="dim")
    right.text(118, 238, "diag(1, *i*) ≠ *c* *I*_{2}", size=14, anchor="middle")
