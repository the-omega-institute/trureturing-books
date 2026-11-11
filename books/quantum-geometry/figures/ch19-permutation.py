"""三条桥各自补上几格，合起来正好铺满一张 6 × 6 置换矩阵：桥 0 铺 4 格，桥 1、桥 2 各铺 1 格。
The three bridges each fill a few cells, and together they tile a 6 × 6 permutation matrix exactly:
bridge 0 fills 4 cells, bridges 1 and 2 one cell each.

The matrices are the chapter's example a = c = 2, b = d = 3. The script forms
flow(M, N) = Σ_r M_r ⊗ N_r with rows (i, k) ∈ Fin 2 × Fin 3 and columns (j, l) ∈ Fin 3 × Fin 2, and
checks that it is a permutation matrix and which bridge puts each 1 (asserted against the table).
"""

M = [
    [[1, 0, 0], [0, 1, 0]],
    [[0, 0, 1], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 1]],
]
N = [
    [[1, 0], [0, 1], [0, 0]],
    [[0, 0], [0, 0], [1, 0]],
    [[0, 0], [0, 0], [0, 1]],
]
ROWS = [(i, k) for i in range(2) for k in range(3)]
COLS = [(j, l) for j in range(3) for l in range(2)]

SIZE = (440, 360)
ALT = {
    "zh": "一张 6 × 6 的方格表，行标 (i, k)，列标 (j, l)。六个非零格各在不同的行与不同的列，组成一张置换矩阵。"
          "每个非零格里写着放下它的那条桥的编号：标 0 的四格来自桥 0，在输入列 (0, 0)、(0, 1)、(1, 0)、(1, 1)；"
          "标 1 的一格在列 (2, 0)、行 (0, 2)；标 2 的一格在列 (2, 1)、行 (1, 2)。右下写着秩 = 6。",
    "en": "A 6 × 6 grid with rows (i, k) and columns (j, l). Six non-zero cells sit in six different rows and six different "
          "columns, forming a permutation matrix. Each non-zero cell carries the number of the bridge that puts it there: the "
          "four cells marked 0 come from bridge 0, in input columns (0, 0), (0, 1), (1, 0), (1, 1); the cell marked 1 is in "
          "column (2, 0), row (0, 2); the cell marked 2 is in column (2, 1), row (1, 2). Bottom right: rank = 6.",
}


def flow():
    """Entry (row, col) → list of the bridges r that contribute to it."""
    out = {}
    for ri, (i, k) in enumerate(ROWS):
        for ci, (j, l) in enumerate(COLS):
            rs = [r for r in range(3) if M[r][i][j] * N[r][k][l]]
            if rs:
                out[(ri, ci)] = rs
    return out


def draw(fig):
    t = fig.t
    F = flow()
    assert len(F) == 6 and all(len(v) == 1 for v in F.values())
    assert len({r for r, _ in F}) == 6 and len({c for _, c in F}) == 6          # a permutation matrix: rank 6
    per = [sum(1 for v in F.values() if v[0] == r) for r in range(3)]
    assert per == [4, 1, 1]
    assert F[(ROWS.index((0, 2)), COLS.index((2, 0)))] == [1]
    assert F[(ROWS.index((1, 2)), COLS.index((2, 1)))] == [2]

    s = 42
    x0, y0 = 104, 64
    for ci, (j, l) in enumerate(COLS):
        fig.text(x0 + s * (ci + 0.5), y0 - 12, f"({j},{l})", size=13, color="dim", anchor="middle")
    for ri, (i, k) in enumerate(ROWS):
        fig.text(x0 - 10, y0 + s * (ri + 0.5), f"({i},{k})", size=13, color="dim", anchor="end", middle=True)
    fig.text(x0 + 3 * s, y0 - 36, t("输入列 (*j*, *l*)", "input column (*j*, *l*)"), size=13, color="dim", anchor="middle")
    fig.text(26, y0 + 3 * s, t("输出行 (*i*, *k*)", "output row (*i*, *k*)"), size=13, color="dim", anchor="middle",
             rotate=90)

    for (ri, ci), rs in F.items():
        r = rs[0]
        fig.rect(x0 + s * ci + 3, y0 + s * ri + 3, s - 6, s - 6, color="line", fill="line",
                 fill_opacity=0.32 if r == 0 else 0.14, width=1.6 if r == 0 else 2.2, rx=4)
        fig.text(x0 + s * (ci + 0.5), y0 + s * (ri + 0.5), str(r), size=16, color="line", anchor="middle", middle=True,
                 weight=600)
    for k in range(7):
        fig.line(x0, y0 + s * k, x0 + 6 * s, y0 + s * k, "faint", 1.1)
        fig.line(x0 + s * k, y0, x0 + s * k, y0 + 6 * s, "faint", 1.1)
    fig.rect(x0, y0, 6 * s, 6 * s, color="dim", width=1.4)

    fig.text(x0 + 6 * s + 10, y0 + 3 * s, t("秩 = 6", "rank 6"), size=15, color="ink", middle=True, weight=600)
    fig.text(x0, y0 + 6 * s + 28, t("格里的数：放下这个 1 的桥 *r*", "number in a cell: the bridge *r* that puts the 1"),
             size=13, color="dim")
