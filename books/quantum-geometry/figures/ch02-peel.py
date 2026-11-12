"""剥皮：读数最亮的方向是第一根探针，剥去它之后余项最亮处在对跖（第二章 §2.3，例 ex-qubit-confirmation-peel）。
Peeling: the brightest direction of the reading is the first probe, and once it is peeled off the
remainder is brightest at the antipode (chapter 2, §2.3, example ex-qubit-confirmation-peel).

The effect E = [[3/5, 1/5], [1/5, 3/10]] gives the reading f(ρ_a) = Tr(E ρ_a) = 0.45 + 0.25 a·s with
s = (0.8, 0, 0.6). The view looks along y, so s lies in the picture plane and every level set a·s = u
projects onto one straight chord: the sphere is shaded in exact bands. Left: f, brightest 0.7 at s
(p₁), darkest 0.2 at −s. Right: r₁ = f − 0.7 e_{p₁} with e_{p₁}(ρ_a) = (1 + a·s)/2, which is 0 at s and
brightest 0.2 at −s (p₂). Everything below is computed from E and asserted.
"""

import math

SIZE = (560, 310)
MARKUP = 2
WRAP = True
ALT = {
    "zh": "左右两颗布洛赫球，都从侧面看，北极朝上，按读数大小上了青色的明暗带。左球是读数 f：最亮处在右上方的方向 s，"
          "一枚琥珀色的点标着 p₁、权重 0.7；对跖的左下方最暗，标着 0.2。右球是剥去 0.7 e_{p₁} 之后的余项：s 处变成零、最暗，"
          "最亮处移到左下方的 −s，琥珀色的点标着 p₂、权重 0.2。底下一行写着 E = 0.7 p₁ + 0.2 p₂。",
    "en": "Two Bloch spheres seen from the side, north up, shaded in cyan bands by the size of the reading. The left one is the "
          "reading f: brightest in the direction s at the upper right, where an amber dot marks p₁ with weight 0.7, and "
          "darkest at the antipode at the lower left, marked 0.2. The right one is the remainder after peeling off "
          "0.7 e_{p₁}: zero and darkest at s, brightest now at −s at the lower left, where an amber dot marks p₂ with "
          "weight 0.2. The line underneath reads E = 0.7 p₁ + 0.2 p₂.",
}

E = ((0.6, 0.2), (0.2, 0.3))
S = (0.8, 0.0, 0.6)
BANDS = 9
R = 92


def reading(a):
    """Tr(E ρ_a) with ρ_a = ½(I + a·σ), for a real E: ½(E₀₀ + E₁₁) + E₀₁ a₀ + ½(E₀₀ − E₁₁) a₂."""
    return 0.5 * (E[0][0] + E[1][1]) + E[0][1] * a[0] + 0.5 * (E[0][0] - E[1][1]) * a[2]


def confirm(a):
    """e_{p₁}(ρ_a) = Tr(p₁ ρ_a) = (1 + a·s)/2."""
    return (1 + sum(x * y for x, y in zip(a, S))) / 2


def band(cv, cx, cy, u1, u2, value, vmax):
    """The part of the disc whose points have a·s between u1 and u2 (s in the picture plane), shaded by value."""
    sx, sy = S[0], -S[2]                     # s on the page (y down)
    nx, ny = -sy, sx
    pts = []
    for k in range(25):
        u = u2 + (u1 - u2) * k / 24
        v = math.sqrt(max(0.0, 1 - u * u))
        pts.append((cx + R * (u * sx + v * nx), cy + R * (u * sy + v * ny)))
    for k in range(25):
        u = u1 + (u2 - u1) * k / 24
        v = -math.sqrt(max(0.0, 1 - u * u))
        pts.append((cx + R * (u * sx + v * nx), cy + R * (u * sy + v * ny)))
    cv.polygon(pts, "cyan", fill_opacity=0.05 + 0.6 * value / vmax)


def ball(cv, title, fn, vmax, mark_s, mark_m, foot):
    cx, cy = cv.width / 2, 150
    cv.text(cx, 22, title, size=14, weight=600, anchor="middle")
    for k in range(BANDS):
        u1, u2 = -1 + 2 * k / BANDS, -1 + 2 * (k + 1) / BANDS
        um = (u1 + u2) / 2
        band(cv, cx, cy, u1, u2, fn(um), vmax)
    cv.circle(cx, cy, R, color="dim", width=1.4)
    cv.line(cx, cy + R + 6, cx, cy - R - 10, "faint", 1.1, dash="3 3")
    cv.text(cx + 6, cy - R - 10, "|0⟩", size=13, color="dim")
    ps = (cx + R * S[0], cy - R * S[2])
    pm = (cx - R * S[0], cy + R * S[2])
    for (x, y), (txt, dx, dy, anchor, color) in ((ps, mark_s), (pm, mark_m)):
        if color == "now":
            cv.dot(x, y, 6, "now", ring="bg")
        else:
            cv.dot(x, y, 4, "dim", ring="bg")
        cv.text(x + dx, y + dy, txt, size=14, color="ink" if color == "now" else "dim", anchor=anchor, halo=True)
    cv.text(cx, 292, foot, size=14, anchor="middle")


def draw(fig):
    t = fig.t
    neg = tuple(-x for x in S)
    # the reading is a tilted height function along s
    f_s, f_m = reading(S), reading(neg)
    assert abs(f_s - 0.7) < 1e-12 and abs(f_m - 0.2) < 1e-12
    assert all(abs(reading(a) - (0.45 + 0.25 * sum(x * y for x, y in zip(a, S)))) < 1e-12
               for a in ((1, 0, 0), (0, 1, 0), (0, 0, 1), (0.6, 0.0, -0.8)))
    # peel p₁ with weight 0.7: the remainder is 0.1 − 0.1 a·s, zero at s, largest 0.2 at −s
    r1 = lambda u: (0.45 + 0.25 * u) - 0.7 * (1 + u) / 2
    assert abs(r1(1.0)) < 1e-12 and abs(r1(-1.0) - 0.2) < 1e-12
    assert all(r1(-1 + k / 50) >= r1(-1 + (k + 1) / 50) for k in range(100))
    # E = 0.7 p₁ + 0.2 p₂, p₁ = ½(I + s·σ), p₂ = ½(I − s·σ)
    p1 = ((0.5 * (1 + S[2]), 0.5 * S[0]), (0.5 * S[0], 0.5 * (1 - S[2])))
    p2 = ((0.5 * (1 - S[2]), -0.5 * S[0]), (-0.5 * S[0], 0.5 * (1 + S[2])))
    assert all(abs(E[i][j] - 0.7 * p1[i][j] - 0.2 * p2[i][j]) < 1e-12 for i in range(2) for j in range(2))

    left, right = fig.row([272, 272], 310, gap=16)
    ball(left, t("读数 *f*：最亮处是 *p*_{1}", "reading *f*: brightest at *p*_{1}"), lambda u: 0.45 + 0.25 * u, 0.7,
         ("*p*_{1} · 0.7", 10, -6, "start", "now"), (t("最暗 0.2", "darkest 0.2"), 0, 26, "middle", "dim"),
         "*f* = 0.45 + 0.25 *a*·*s*")
    ball(right, t("剥去 0.7 *e*_{*p*₁}：最亮处是 *p*_{2}", "peel off 0.7 *e*_{*p*₁}: brightest at *p*_{2}"), r1, 0.7,
         (t("余项 0", "remainder 0"), -10, -10, "end", "dim"), ("*p*_{2} · 0.2", 0, 26, "middle", "now"),
         "*E* = 0.7 *p*_{1} + 0.2 *p*_{2}")
