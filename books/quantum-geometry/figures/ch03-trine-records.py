"""两个维度分给三条记录，平均最多读对 2/3（第三章 §3.1，例 ex-trine-record-capacity）。
Two dimensions shared among three records: at best 2/3 read correctly on average (chapter 3, §3.1,
example ex-trine-record-capacity).

ψ_k = cos(kπ/3)|0⟩ + sin(kπ/3)|1⟩, k = 0, 1, 2: Bloch vectors (sin 2kπ/3, 0, cos 2kπ/3) on one great
circle, 120° apart. The readout E_k = (2/3)|ψ_k⟩⟨ψ_k| sums to the identity and gives the table
Tr(E_j ρ_k) = (2/3)|⟨ψ_j|ψ_k⟩|², 2/3 on the diagonal and 1/6 off it; all of it is computed and asserted.
"""

import math

SIZE = (500, 270)
WRAP = True
MARKUP = 2
ALT = {
    "zh": "左右两半。左半：布洛赫球的一个大圆上三支青色的箭头 ψ₀、ψ₁、ψ₂，两两相隔 120°。右半：一张 3×3 的读数表，"
          "行是读出 E₀、E₁、E₂，列是记录 ψ₀、ψ₁、ψ₂，每格里一个方块，面积按读数大小：对角线上三格是 ⅔，其余六格是 ⅙；"
          "下面写着平均读对 ⅔ = d/N。",
    "en": "Two halves. Left: three cyan arrows ψ₀, ψ₁, ψ₂ on one great circle of the Bloch sphere, 120° apart. Right: a 3 × 3 "
          "table of readings, rows the readouts E₀, E₁, E₂ and columns the records ψ₀, ψ₁, ψ₂, each cell holding a square whose "
          "area follows the reading: the three diagonal cells are ⅔, the other six ⅙; underneath, the average read correctly "
          "is ⅔ = d/N.",
}


def draw(fig):
    psi = [(math.cos(k * math.pi / 3), math.sin(k * math.pi / 3)) for k in range(3)]
    proj = [[[a[i] * a[j] for j in range(2)] for i in range(2)] for a in psi]
    total = [[sum(P[i][j] for P in proj) for j in range(2)] for i in range(2)]
    assert all(abs(total[i][j] - (1.5 if i == j else 0)) < 1e-12 for i in range(2) for j in range(2))     # Σ E_k = 1
    table = [[2 / 3 * (psi[j][0] * psi[k][0] + psi[j][1] * psi[k][1]) ** 2 for k in range(3)] for j in range(3)]
    assert all(abs(table[j][k] - (2 / 3 if j == k else 1 / 6)) < 1e-12 for j in range(3) for k in range(3))
    assert abs(sum(table[k][k] for k in range(3)) / 3 - 2 / 3) < 1e-12
    bloch = [(math.sin(2 * k * math.pi / 3), math.cos(2 * k * math.pi / 3)) for k in range(3)]
    for j in range(3):
        for k in range(j + 1, 3):
            c = bloch[j][0] * bloch[k][0] + bloch[j][1] * bloch[k][1]
            assert abs(c - math.cos(math.radians(120))) < 1e-12

    left, right = fig.row([210, 274], 270, gap=16)
    cx, cy, R = 105, 140, 86
    left.circle(cx, cy, R, color="dim", width=1.4)
    left.text(cx, 22, left.t("同一个大圆上的三条记录", "three records on one circle"), size=14, weight=600, anchor="middle")
    for k, (x, z) in enumerate(bloch):
        left.arrow(cx, cy, cx + R * x, cy - R * z, "line", 2.4)
        lx, ly = cx + (R + 16) * x, cy - (R + 16) * z
        left.text(lx, ly + 5, f"*ψ*_{{{k}}}", size=15, color="line", anchor="middle", halo=True)
    left.angle(cx, cy, 26, 90, 90 - 120, "120°", size=13, color="dim", label_r=44)

    right.text(right.width / 2, 22, right.t("读数 Tr(*E*_{*j*} *ρ*_{*k*})", "readings Tr(*E*_{*j*} *ρ*_{*k*})"), size=14,
               weight=600, anchor="middle")
    x0, y0, cell = 70, 56, 52
    for k in range(3):
        right.text(x0 + cell * k + cell / 2, y0 - 8, f"*ψ*_{{{k}}}", size=14, color="line", anchor="middle")
        right.text(x0 - 10, y0 + cell * k + cell / 2 + 5, f"*E*_{{{k}}}", size=14, anchor="end")
    for j in range(3):
        for k in range(3):
            v = table[j][k]
            right.rect(x0 + cell * k, y0 + cell * j, cell, cell, color="faint", width=1.0)
            side = (cell - 8) * math.sqrt(v / (2 / 3))
            x, y = x0 + cell * k + (cell - side) / 2, y0 + cell * j + (cell - side) / 2
            right.rect(x, y, side, side, color="line" if j == k else "dim", fill="line" if j == k else "dim", width=1.0)
            if j == k:
                right.text(x0 + cell * k + cell / 2, y0 + cell * j + cell / 2 + 5, "⅔", size=14, color="bg", anchor="middle",
                           weight=600)
            else:
                right.text(x0 + cell * k + cell - 4, y0 + cell * j + cell - 6, "⅙", size=13, color="dim", anchor="end")
    right.text(right.width / 2, 250, right.t("平均读对 ⅔ = *d*/*N*", "read correctly on average: ⅔ = *d*/*N*"), size=14,
               anchor="middle")
