"""半球标架函数在投影上合法，却不能延拓为效应上的可加概率（第二章 §2.3，例 ex-qubit-busch-reconstruction）。
The hemisphere frame function is lawful on projections but cannot be extended to an additive
probability on effects (chapter 2, §2.3, example ex-qubit-busch-reconstruction).

f(P_n) = 1 on the northern hemisphere (n_z > 0; on the equator n_x > 0, then n_y > 0), else 0. The effect
E = ½P₊ₓ + ½P₊z has the spectral decomposition E = λ₊P_n + λ₋P₋n with n = (1, 0, 1)/√2,
λ± = ½ ± √2/4. Splitting along +x, +z gives ½(f(P₊ₓ) + f(P₊z)) = 1; splitting along ±n gives
λ₊·1 + λ₋·0 = 0.8536. The view looks along y, so all four directions lie in the picture plane and the
equator projects onto a horizontal line. Everything is computed and asserted below.
"""

import math

SIZE = (560, 270)
WRAP = True
MARKUP = 2
ALT = {
    "zh": "左边一颗从侧面看的布洛赫球：北半球涂成青色，标着 f = 1；南半球是暗的，标着 f = 0。球面上四个点："
          "右边赤道上的 +x、顶上的 +z（都在 f = 1 一侧），右上 45° 处的 n 与它左下的对跖点 −n。右边两行算式："
          "按 +x、+z 拆，½(1 + 1) = 1；按 ±n 拆，0.8536 × 1 + 0.1464 × 0 = 0.8536；下面用品红写着 1 ≠ 0.8536。",
    "en": "On the left, a Bloch sphere seen from the side: the northern hemisphere is cyan, marked f = 1, the southern one dark, "
          "marked f = 0. Four points on the sphere: +x on the equator at the right and +z at the top (both on the f = 1 "
          "side), n at 45° to the upper right and its antipode −n at the lower left. On the right, two lines of arithmetic: "
          "split along +x and +z, ½(1 + 1) = 1; split along ±n, 0.8536 × 1 + 0.1464 × 0 = 0.8536; underneath, in magenta, "
          "1 ≠ 0.8536.",
}


def frame(n):
    """The hemisphere frame function: 1 on the closed-by-rule northern half, else 0."""
    for c in (n[2], n[0], n[1]):
        if abs(c) > 1e-12:
            return 1 if c > 0 else 0
    return 0


def proj(n):
    """½(I + n·σ) as a real 2×2 matrix (n has no y component here)."""
    return ((0.5 * (1 + n[2]), 0.5 * n[0]), (0.5 * n[0], 0.5 * (1 - n[2])))


def draw(fig):
    t = fig.t
    X, Z = (1.0, 0.0, 0.0), (0.0, 0.0, 1.0)
    n = (math.sqrt(0.5), 0.0, math.sqrt(0.5))
    mn = tuple(-c for c in n)
    lp, lm = 0.5 + math.sqrt(2) / 4, 0.5 - math.sqrt(2) / 4
    E = tuple(tuple(0.5 * proj(X)[i][j] + 0.5 * proj(Z)[i][j] for j in range(2)) for i in range(2))
    assert all(abs(E[i][j] - (lp * proj(n)[i][j] + lm * proj(mn)[i][j])) < 1e-12 for i in range(2) for j in range(2))
    assert frame(X) == 1 and frame(Z) == 1 and frame(n) == 1 and frame(mn) == 0
    assert all(frame(v) + frame(tuple(-c for c in v)) == 1 for v in (X, Z, n, (0.0, 1.0, 0.0), (0.3, -0.4, 0.0)))
    split_xz = 0.5 * (frame(X) + frame(Z))
    split_n = lp * frame(n) + lm * frame(mn)
    assert split_xz == 1 and abs(split_n - 0.8536) < 5e-5

    left, right = fig.row([230, 314], 270, gap=16)
    cx, cy, R = 115, 140, 92
    north = [(cx + R * math.cos(math.pi * k / 48), cy - R * math.sin(math.pi * k / 48)) for k in range(49)]
    left.polygon(north, "cyan", fill_opacity=0.32)
    left.circle(cx, cy, R, color="dim", width=1.4)
    left.line(cx - R, cy, cx + R, cy, "dim", 1.2)
    left.text(cx - 26, cy - 34, "*f* = 1", size=15, color="line", anchor="middle", halo=True)
    left.text(cx + 8, cy + 46, "*f* = 0", size=15, color="dim", anchor="middle")
    pts = ((X, "+*x*", -4, 22, "middle"), (Z, "+*z*", 10, -6, "start"), (n, "*n*", 10, -4, "start"),
           (mn, "−*n*", -10, 14, "end"))
    for v, name, dx, dy, anchor in pts:
        x, y = cx + R * v[0], cy - R * v[2]
        left.line(cx, cy, x, y, "faint", 1.1, dash="3 3")
        left.dot(x, y, 5, "ink", ring="bg")
        left.text(x + dx, y + dy, name, size=15, anchor=anchor, halo=True)

    right.text(0, 60, t("按 +*x*、+*z* 拆：", "split along +*x*, +*z*:"), size=14, color="dim")
    right.text(0, 86, "½(1 + 1) = 1", size=16)
    right.text(0, 132, t("按 ±*n* 拆：", "split along ±*n*:"), size=14, color="dim")
    right.text(0, 158, f"{lp:.4f} × 1 + {lm:.4f} × 0 = {split_n:.4f}", size=16)
    right.text(0, 214, f"1 ≠ {split_n:.4f}", size=17, color="magenta", weight=600)
