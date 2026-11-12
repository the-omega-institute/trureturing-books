"""解引用的拷贝把相干项搬进地址记录，不销毁它；只看局部读出时它才归零。
Dereferencing copies the coherence into the address record without destroying it; it vanishes only in the
local readout.

Index order (i, a): system bit i is the major index, record bit a the minor one. The blank embedding
B(ρ) = ρ ⊗ E₀₀ puts block (i, j) = ρ_ij E₀₀; the controlled copy U = E₀₀ ⊗ I + E₁₁ ⊗ σ_x gives
R(ρ) = U B U† with block (i, j) = ρ_ij E_ij; the partial trace over the record returns diag(p, 1 − p).
All three are computed below for a sample ρ and checked against the chapter's block formulas.
"""

SIZE = (460, 236)
ALT = {
    "zh": "从左到右三个矩阵。左边是 4×4 的 B(ρ)，分成四个 2×2 块，每块只在左上角有一个数：p、c、c̄、1−p。中间是 U_copy 作用后的 R(ρ)："
          "青色的 p 与 1−p 仍在对角块的角上，品红的 c 与 c̄ 搬到了右上块的右上格与左下块的左下格，不在块的左上角了。"
          "右边是对地址记录求偏迹后的 2×2 矩阵：对角上是青色的 p 与 1−p，副对角是 0。",
    "en": "Three matrices from left to right. Left: the 4×4 matrix B(ρ), cut into four 2×2 blocks, each with a single "
          "entry in its top-left corner: p, c, c̄, 1−p. Middle: R(ρ) after U_copy; the cyan p and 1−p still sit in the "
          "corners of the diagonal blocks, while the magenta c and c̄ have moved to the top-right cell of the upper "
          "right block and the bottom-left cell of the lower left block. Right: the 2×2 matrix after the partial trace "
          "over the address record: cyan p and 1−p on the diagonal, 0 off it.",
}

# ---------------------------------------------------------------- the computation


def mat(n, f):
    return [[f(r, c) for c in range(n)] for r in range(n)]


def mul(a, b):
    n = len(a)
    return [[sum(a[r][k] * b[k][c] for k in range(n)) for c in range(n)] for r in range(n)]


def dag(a):
    return [[a[c][r].conjugate() for c in range(len(a))] for r in range(len(a))]


def idx(i, a):
    return 2 * i + a


p, c = 0.7, 0.2 + 0.15j
rho = [[complex(p), c], [c.conjugate(), complex(1 - p)]]
SYMB = {(0, 0): "p", (0, 1): "c", (1, 0): "c̄", (1, 1): "1−p"}

E = lambda a, b: mat(2, lambda r, s: 1.0 if (r, s) == (a, b) else 0.0)
B = mat(4, lambda r, s: rho[r // 2][s // 2] * E(0, 0)[r % 2][s % 2])
# U = E00 ⊗ I + E11 ⊗ σx on (i, a)
SX = [[0, 1], [1, 0]]
U = mat(4, lambda r, s: (1.0 if r // 2 == s // 2 == 0 and r % 2 == s % 2 else 0.0)
        + (SX[r % 2][s % 2] if r // 2 == s // 2 == 1 else 0.0))
assert mul(dag(U), U) == mat(4, lambda r, s: 1.0 if r == s else 0.0)
R = mul(mul(U, B), dag(U))
for i in range(2):
    for j in range(2):
        for a in range(2):
            for b in range(2):
                want = rho[i][j] if (a, b) == (i, j) else 0       # block (i, j) = ρ_ij E_ij
                assert abs(R[idx(i, a)][idx(j, b)] - want) < 1e-12
TR = mat(2, lambda i, j: sum(R[idx(i, a)][idx(j, a)] for a in range(2)))
assert abs(TR[0][0] - p) < 1e-12 and abs(TR[1][1] - (1 - p)) < 1e-12 and TR[0][1] == 0 and TR[1][0] == 0


def entries(M):
    """{(row, col): (i, j)} of the non-zero entries of a 4×4 matrix built from ρ."""
    out = {}
    for r in range(4):
        for s in range(4):
            if abs(M[r][s]) > 1e-12:
                out[(r, s)] = (r // 2, s // 2)
    return out


# ---------------------------------------------------------------- drawing

CELL = 30


def label(fig, cx, cy, ij, role):
    """The entry ρ_ij; c̄ is drawn as c with a bar, which a combining accent does not render reliably."""
    if ij == (1, 0):
        fig.text(cx, cy, "c", size=14, color=role, anchor="middle", middle=True, weight=600)
        fig.line(cx - 4, cy - 8, cx + 4, cy - 8, role, 1.4)
    else:
        fig.text(cx, cy, SYMB[ij], size=13 if ij == (1, 1) else 14, color=role, anchor="middle", middle=True, weight=600)


def grid4(fig, x, y, M, name):
    for r in range(4):
        for s in range(4):
            fig.rect(x + s * CELL, y + r * CELL, CELL, CELL, color="faint", fill="panel", width=1.0)
    fig.line(x + 2 * CELL, y, x + 2 * CELL, y + 4 * CELL, "ink", 1.6)
    fig.line(x, y + 2 * CELL, x + 4 * CELL, y + 2 * CELL, "ink", 1.6)
    fig.rect(x, y, 4 * CELL, 4 * CELL, color="ink", width=1.4)
    for (r, s), (i, j) in entries(M).items():
        role = "line" if i == j else "area"
        label(fig, x + s * CELL + CELL / 2, y + r * CELL + CELL / 2, (i, j), role)
    fig.text(x + 2 * CELL, y + 4 * CELL + 24, name, size=14, color="ink", anchor="middle")


def draw(fig):
    y = 50
    xb, xr = 16, 196
    grid4(fig, xb, y, B, "*B*(*ρ*)")
    grid4(fig, xr, y, R, "*R*_{addr}(*ρ*)")
    mid = y + 2 * CELL
    fig.arrow(xb + 4 * CELL + 8, mid, xr - 8, mid, "dim", 1.8, head=8)
    fig.text((xb + 4 * CELL + xr) / 2, mid - 12, "*U*_{copy}", size=14, color="dim", anchor="middle")
    xo = 376
    fig.arrow(xr + 4 * CELL + 8, mid, xo - 8, mid, "dim", 1.8, head=8)
    fig.text((xr + 4 * CELL + xo) / 2, mid - 12, "Tr_{env}", size=14, color="dim", anchor="middle")
    oc = 32
    oy = mid - oc
    for i in range(2):
        for j in range(2):
            fig.rect(xo + j * oc, oy + i * oc, oc, oc, color="faint", fill="panel", width=1.0)
            if i == j:
                fig.text(xo + j * oc + oc / 2, oy + i * oc + oc / 2, SYMB[(i, i)], size=13 if i else 14, color="line",
                         anchor="middle", middle=True, weight=600)
            else:
                fig.text(xo + j * oc + oc / 2, oy + i * oc + oc / 2, "0", size=14, color="dim", anchor="middle",
                         middle=True)
    fig.rect(xo, oy, 2 * oc, 2 * oc, color="ink", width=1.4)
    fig.text(xo + oc, y + 4 * CELL + 24, fig.t("局部读出", "local readout"), size=13, color="ink", anchor="middle")
    fig.text(xb, 24, fig.t("行与列按（系统位, 记录位）排", "rows and columns ordered (system bit, record bit)"),
             size=13, color="dim")
