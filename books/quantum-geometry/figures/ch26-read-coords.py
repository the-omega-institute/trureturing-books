"""从 2 × 2 矩阵读回迹与三个坐标：对角两格的和是迹、差是 z，右上一格给出 x 与 y（第二十六章 §布洛赫矩阵）。
Reading the trace and the three coordinates back from a 2 × 2 matrix: the two diagonal cells give the trace
(their sum) and z (their difference), the upper-right cell gives x and y (chapter 26, the Bloch matrix).

The matrix is blochMatrix(1, r) for r = (0.48, 0.60, 0.64), built by the chapter's formula; the script reads it
back with the chapter's definition of bloch and checks that it returns r and the trace 1
(blochMatrix_trace, bloch_blochMatrix).
"""

SIZE = (520, 210)
WRAP = True
ALT = {
    "zh": "左边是一个 2 × 2 矩阵：左上 0.82，右上 0.24 − 0.30i，左下 0.24 + 0.30i，右下 0.18。对角两格是青色，两个角是墨色。"
          "右边四行读数：迹 = 0.82 + 0.18 = 1；z = 0.82 − 0.18 = 0.64，这两行是青色，取自对角两格；"
          "x = 2 × 0.24 = 0.48，y = −2 × (−0.30) = 0.60，这两行是墨色，取自右上一格。左下一格画成虚线框，它只是右上一格的共轭，不必读。矩阵下方写着 blochMatrix(1, r)，读数下方写着 r = (0.48, 0.60, 0.64)。",
    "en": "On the left, a 2 × 2 matrix: 0.82 top left, 0.24 − 0.30i top right, 0.24 + 0.30i bottom left, 0.18 bottom right. The "
          "diagonal cells are cyan, the two corners dark. On the right, four readings: trace = 0.82 + 0.18 = 1 and "
          "z = 0.82 − 0.18 = 0.64, in cyan, taken from the diagonal cells; x = 2 × 0.24 = 0.48 and "
          "y = −2 × (−0.30) = 0.60, in dark, taken from the top-right cell. The bottom-left cell is only the "
          "conjugate of the top-right one, drawn with a dashed frame and not read. Below the matrix is blochMatrix(1, r); "
          "below the readings, r = (0.48, 0.60, 0.64).",
}


def bloch_matrix(a, r):
    return [[complex((a + r[2]) / 2), complex(r[0], -r[1]) / 2], [complex(r[0], r[1]) / 2, complex((a - r[2]) / 2)]]


def bloch(M):
    return (2 * M[0][1].real, -2 * M[0][1].imag, M[0][0].real - M[1][1].real)


def fmt(z):
    if abs(z.imag) < 1e-12:
        return f"{z.real:.2f}"
    s = "−" if z.imag < 0 else "+"
    return f"{z.real:.2f} {s} {abs(z.imag):.2f}*i*"


def draw(fig):
    t = fig.t
    r = (0.48, 0.60, 0.64)
    M = bloch_matrix(1.0, r)
    back = bloch(M)
    assert all(abs(back[i] - r[i]) < 1e-12 for i in range(3))
    assert abs((M[0][0] + M[1][1]) - 1) < 1e-12
    assert fmt(M[0][1]) == "0.24 − 0.30*i*" and fmt(M[0][0]) == "0.82"

    mat, read = fig.row([260, 240], 210)
    cw, ch, gx, gy = 112, 64, 18, 24
    cell = {}
    for i in range(2):
        for j in range(2):
            role = "line" if i == j else "ink"
            x, y = gx + cw * j, gy + ch * i
            dim = (i, j) == (1, 0)
            mat.rect(x + 3, y + 3, cw - 6, ch - 6, color=role, fill=role, fill_opacity=0.04 if dim else (0.16 if role == "line" else 0.06),
                     width=1.2 if dim else 1.8, rx=5, dash="4 3" if dim else None)
            mat.text(x + cw / 2, y + ch / 2, fmt(M[i][j]), size=15, color=role if not dim else "dim", anchor="middle",
                     middle=True, weight=None if dim else 600)
            cell[(i, j)] = (x + cw / 2, y + 3) if (i, j) == (0, 0) else (x + cw - 3, y + ch / 2)
    mat.text(gx + cw, gy + 2 * ch + 24, "blochMatrix(1, *r*)", size=14, color="dim", anchor="middle")

    rows = (
        (t("迹", "trace"), "0.82 + 0.18 = 1", "line", [(0, 0), (1, 1)]),
        ("*z*", "0.82 − 0.18 = 0.64", "line", [(0, 0), (1, 1)]),
        ("*x*", "2 × 0.24 = 0.48", "ink", [(0, 1)]),
        ("*y*", "−2 × (−0.30) = 0.60", "ink", [(0, 1)]),
    )
    rx, ry0, dy = 12, 34, 34
    for k, (name, val, role, src) in enumerate(rows):
        y = ry0 + dy * k
        read.text(rx, y, name, size=15, color=role, weight=600)
        read.text(rx + 52, y, val, size=14, color="ink")
    read.text(rx, ry0 + dy * 4 + 8, "*r* = (0.48, 0.60, 0.64)", size=14, color="ink", weight=600)
