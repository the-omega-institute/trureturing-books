"""受控拷贝前后的 4×4 联合矩阵：相干没有消失，只是搬到了偏迹够不着的角上（第四章 §4.1）。
The 4 × 4 joint matrix before and after the controlled copy: the coherence has not vanished, it has
moved to a corner the partial trace does not read (chapter 4, §4.1).

Basis order |s e⟩ = 00, 01, 10, 11 (system first). B(ρ) = ρ ⊗ |0⟩⟨0| and R(ρ) = U B(ρ) U* with the
permutation U : |s e⟩ ↦ |s, e ⊕ s⟩, for ρ = |±⟩⟨±|. The partial trace over the environment adds the two
diagonal entries of each 2 × 2 block (s, s'); those eight cells are outlined. Every number below is
computed and asserted: the ±½ moves from (00, 10) to (00, 11), both traces of R are ½ I, and
U* R U = B.
"""

SIZE = (676, 340)
WRAP = True
MARKUP = 2
ALT = {
    "zh": "左右两张 4×4 方格，行列都按 00、01、10、11 排列，细框把每张分成四个 2×2 块。偏迹只读每块对角线上的两格，"
          "这八格画了青色的边。左边是受控拷贝之前的 B(ρ)：四个角里的 ½ 在 (00,00) 与 (10,10)，标着 ±½ 的品红方块在 (00,10) 与 (10,00)，"
          "落在青色的格里，偏迹读得到，给出 |±⟩⟨±|。右边是拷贝之后的 R(ρ)：±½ 搬到了 (00,11) 与 (11,00)，不在任何一块的对角线上，"
          "偏迹交出的都是 ½ I；底下写着用 U*_copy 倒推回去即复原。",
    "en": "Two 4 × 4 grids, rows and columns ordered 00, 01, 10, 11, each divided by thin frames into four 2 × 2 blocks. The "
          "partial trace reads only the two diagonal cells of each block, and those eight cells have cyan edges. On the left, "
          "B(ρ) before the controlled copy: the ½ entries sit at (00,00) and (10,10), and the magenta squares marked ±½ at "
          "(00,10) and (10,00), inside cyan cells, so the partial trace reads them and returns |±⟩⟨±|. On the right, R(ρ) "
          "after the copy: the ±½ has moved to (00,11) and (11,00), on no block's diagonal, and the partial trace returns "
          "½ I for both signs; underneath, running U*_copy backwards restores it.",
}

LABELS = ["00", "01", "10", "11"]


def joint(sign):
    """B(|±⟩⟨±|) = ½ [[1, ±1], [±1, 1]] ⊗ |0⟩⟨0|, index 2s + e."""
    rho = [[0.5, 0.5 * sign], [0.5 * sign, 0.5]]
    return [[rho[i // 2][j // 2] if (i % 2 == 0 and j % 2 == 0) else 0.0 for j in range(4)] for i in range(4)]


def copy(M):
    """U M U* for the permutation |s e⟩ ↦ |s, e ⊕ s⟩ (its own inverse)."""
    perm = [2 * (k // 2) + ((k % 2) ^ (k // 2)) for k in range(4)]
    out = [[0.0] * 4 for _ in range(4)]
    for i in range(4):
        for j in range(4):
            out[perm[i]][perm[j]] = M[i][j]
    return out


def ptrace(M):
    return [[M[2 * s][2 * t] + M[2 * s + 1][2 * t + 1] for t in range(2)] for s in range(2)]


def read_by_trace(i, j):
    return i % 2 == j % 2


def grid(cv, M, title, foot, x0=52, y0=64, cell=52):
    cv.text(cv.width / 2, 22, title, size=14, weight=600, anchor="middle")
    for k, name in enumerate(LABELS):
        cv.text(x0 + cell * k + cell / 2, y0 - 10, name, size=13, color="dim", anchor="middle")
        cv.text(x0 - 10, y0 + cell * k + cell / 2 + 5, name, size=13, color="dim", anchor="end")
    for i in range(4):
        for j in range(4):
            x, y = x0 + cell * j, y0 + cell * i
            cv.rect(x, y, cell, cell, color="faint", width=1.0)
    for i in range(4):
        for j in range(4):
            if read_by_trace(i, j):
                cv.rect(x0 + cell * j + 2, y0 + cell * i + 2, cell - 4, cell - 4, color="line", width=1.6)
    for k in (0, 2, 4):
        cv.line(x0 + cell * k, y0, x0 + cell * k, y0 + 4 * cell, "dim", 1.8)
        cv.line(x0, y0 + cell * k, x0 + 4 * cell, y0 + cell * k, "dim", 1.8)
    for i in range(4):
        for j in range(4):
            v = M[i][j]
            if abs(v) < 1e-12:
                continue
            side = (cell - 14) * (abs(v) ** 0.5) / (0.5 ** 0.5) * 0.8
            x, y = x0 + cell * j + (cell - side) / 2, y0 + cell * i + (cell - side) / 2
            off = i != j
            cv.rect(x, y, side, side, color="area" if off else "ink", fill="area" if off else "ink", width=1.2)
            cv.text(x0 + cell * j + cell / 2, y0 + cell * i + cell / 2 + 5, "±½" if off else "½", size=13,
                    color="bg", anchor="middle", weight=600)
    cv.text(cv.width / 2, y0 + 4 * cell + 30, foot, size=14, anchor="middle")


def draw(fig):
    t = fig.t
    for sign in (1, -1):
        B, R = joint(sign), copy(joint(sign))
        assert abs(B[0][2] - 0.5 * sign) < 1e-12 and abs(R[0][3] - 0.5 * sign) < 1e-12 and abs(R[3][0] - 0.5 * sign) < 1e-12
        assert read_by_trace(0, 2) and not read_by_trace(0, 3)
        assert ptrace(B) == [[0.5, 0.5 * sign], [0.5 * sign, 0.5]]
        assert ptrace(R) == [[0.5, 0.0], [0.0, 0.5]]
        assert copy(R) == B                                                 # U* R U = B (U is its own inverse)
    left, right = fig.row([330, 330], 340, gap=16)
    grid(left, joint(1), t("拷贝之前 *B*(*ρ*)", "before the copy, *B*(*ρ*)"), t("偏迹读到 ±½：|±⟩⟨±|", "the trace reads ±½: |±⟩⟨±|"))
    grid(right, copy(joint(1)), t("拷贝之后 *R*(*ρ*) = *U* *B* *U*^{∗}", "after the copy, *R*(*ρ*) = *U* *B* *U*^{∗}"),
         t("偏迹只剩 ½ *I*；*U*^{∗} 倒推即复原", "the trace leaves ½ *I*; *U*^{∗} undoes it"))
