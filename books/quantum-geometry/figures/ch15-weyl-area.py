"""位移共轭只留下一个相位，由两次位移张成的有向面积决定（第十五章，引理 lemma-phase-kickback-weyl）。
Conjugating one Weyl displacement by another leaves only a phase, set by the oriented area of the two
displacements (chapter 15, lemma-phase-kickback-weyl).

M = 8, (a, b) = (2, 1), (c, d) = (1, 3). The script builds the 8 × 8 shift X ((Xψ)_i = ψ_{i−1}) and clock Z
(diag ω^j), forms D(e, f) = X^e Z^f, and asserts D(a,b) D(c,d) D(a,b)* = ω^{(bc − ad) mod 8} D(c,d) with
bc − ad = −5 ≡ 3; the parallelogram spanned by (a, b) and (c, d) has oriented area ad − bc = 5. Reading the
exponent as minus that area is only a geometric reading of the determinant.
"""

import cmath
import math

WRAP = True
SIZE = (520, 290)
M = 8
A, B, C, D = 2, 1, 1, 3
ALT = {
    "zh": "左栏是 8 × 8 的格点平面，横轴是平移次数 a，纵轴是时钟次数 b。两支青色箭头从原点出发，(a, b) = (2, 1) 与 (c, d) = (1, 3)，"
          "张出一块品红的平行四边形，有向面积 ad − bc = 5。右栏是一只 8 格的相位钟，琥珀色的指针停在 ω₈³ 那一格，因为 bc − ad = −5 ≡ 3 (mod 8)。",
    "en": "Left panel: the 8 × 8 lattice, horizontal axis the number of shifts a, vertical axis the number of clock steps b. Two cyan "
          "arrows leave the origin, (a, b) = (2, 1) and (c, d) = (1, 3), and span a magenta parallelogram of oriented area "
          "ad − bc = 5. Right panel: a phase clock with 8 positions; the amber hand rests on ω₈³, since bc − ad = −5 ≡ 3 (mod 8).",
}


def matmul(p, q):
    n = len(p)
    return [[sum(p[i][k] * q[k][j] for k in range(n)) for j in range(n)] for i in range(n)]


def power(p, e):
    n = len(p)
    out = [[1 if i == j else 0 for j in range(n)] for i in range(n)]
    for _ in range(e):
        out = matmul(out, p)
    return out


def check_kickback():
    w = cmath.exp(2j * math.pi / M)
    X = [[1 if i == (j + 1) % M else 0 for j in range(M)] for i in range(M)]     # (Xψ)_i = ψ_{i−1}
    Z = [[w ** i if i == j else 0 for j in range(M)] for i in range(M)]
    disp = lambda e, f: matmul(power(X, e % M), power(Z, f % M))
    Dab, Dcd = disp(A, B), disp(C, D)
    star = [[Dab[j][i].conjugate() if isinstance(Dab[j][i], complex) else Dab[j][i] for j in range(M)] for i in range(M)]
    lhs = matmul(matmul(Dab, Dcd), star)
    ex = (B * C - A * D) % M
    assert ex == 3 and A * D - B * C == 5
    assert all(abs(lhs[i][j] - w ** ex * Dcd[i][j]) < 1e-9 for i in range(M) for j in range(M))
    return ex


def draw(fig):
    t = fig.t
    ex = check_kickback()
    left, right = fig.row([270, 220], 290, gap=20)

    # --- the lattice ZMod 8 × ZMod 8 ---
    x0, y0, s = 44, 250, 27
    P = lambda a, b: (x0 + a * s, y0 - b * s)
    for a in range(M):
        for b in range(M):
            left.dot(*P(a, b), 1.8, "faint")
    left.line(x0, y0, x0 + (M - 0.4) * s, y0, "dim", 1.2)
    left.line(x0, y0, x0, y0 - (M - 0.4) * s, "dim", 1.2)
    for a in range(0, M, 2):
        left.text(P(a, 0)[0], y0 + 18, str(a), size=13, color="dim", anchor="middle")
    for b in range(2, M, 2):
        left.text(x0 - 10, P(0, b)[1] + 5, str(b), size=13, color="dim", anchor="end")
    left.text(x0 + (M - 0.4) * s, y0 + 18, "*a*", size=14, color="dim", anchor="middle")
    left.text(x0 - 10, y0 - (M - 0.4) * s + 6, "*b*", size=14, color="dim", anchor="end")
    quad = [P(0, 0), P(A, B), P(A + C, B + D), P(C, D)]
    left.polygon(quad, "area", fill_opacity=0.24, width=1.4)
    left.arrow(*P(0, 0), *P(A, B), "line", 2.6)
    left.arrow(*P(0, 0), *P(C, D), "line", 2.6)
    left.text(P(A, B)[0] + 8, P(A, B)[1] + 16, "(*a*, *b*) = (2, 1)", size=14, color="line")
    left.text(x0 + 6, P(0, 4.5)[1] + 5, "(*c*, *d*) = (1, 3)", size=14, color="line", halo=True)
    cx, cy = (quad[0][0] + quad[2][0]) / 2, (quad[0][1] + quad[2][1]) / 2
    left.text(cx + 4, cy + 5, "*ad* − *bc* = 5", size=14, color="area", anchor="start", halo=True)

    # --- the phase clock ---
    ox, oy, R = 110, 140, 78
    right.circle(ox, oy, R, color="dim", width=1.4)
    for m in range(M):
        ang = math.radians(360 * m / M)
        px, py = ox + R * math.cos(ang), oy - R * math.sin(ang)
        right.dot(px, py, 3.2, "dim")
        lx, ly = ox + (R + 18) * math.cos(ang), oy - (R + 18) * math.sin(ang)
        right.text(lx, ly + 5, str(m), size=13, color="dim", anchor="middle")
    ang = math.radians(360 * ex / M)
    hx, hy = ox + R * 0.86 * math.cos(ang), oy - R * 0.86 * math.sin(ang)
    right.arrow(ox, oy, hx, hy, "now", 3.0)
    right.dot(ox, oy, 3.0, "ink")
    right.text((ox + hx) / 2 + 14, (oy + hy) / 2 - 12, "ω₈^{3}", size=15, color="now")
    right.text(ox, oy + R + 44, "*bc* − *ad* = −5 ≡ 3", size=14, color="ink", anchor="middle")
    right.text(ox, 20, t("相位钟 ω₈^{*n*}", "phase clock ω₈^{*n*}"), size=13, color="dim", anchor="middle")
