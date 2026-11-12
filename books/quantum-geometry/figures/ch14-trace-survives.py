"""解码之后，σ 只剩对角线：跨房间的相干项全部被切掉，留下 Tr σ · ρ（第十四章 §正交综合征中的逻辑恢复）。
After decoding only the diagonal of σ survives: every cross-room coherence is cut away, leaving Tr σ · ρ
(chapter 14, logical recovery in orthogonal syndromes).

The noise matrix σ has the chapter's diagonal (½, ¼, ⅛, ⅛) plus non-zero off-diagonal terms; decoding the
encoded state of the three-qubit code with ρ = |+⟩⟨+| is computed and asserted to equal Tr(σ)·ρ = ρ,
whatever the off-diagonal terms are.
"""

from _ch14 import NAMES, orthogonal, recover

SIZE = (358, 392)
ALT = {
    "zh": "上面是 4 × 4 的噪声矩阵 σ，行列标着 I、X₁、X₂、X₃。对角线上四格青色，写着 ½、¼、⅛、⅛；其余十二格是品红的跨房间相干项，"
          "每格都被划掉。一支箭头向下指：四个对角数相加得 Tr σ = 1，乘上逻辑态 ρ，解码后正好回到 ρ。",
    "en": "At the top, the 4 × 4 noise matrix σ, rows and columns labelled I, X₁, X₂, X₃. The four diagonal cells are cyan and "
          "read ½, ¼, ⅛, ⅛; the other twelve are magenta cross-room coherences, each struck out. An arrow points down: the "
          "four diagonal numbers add to Tr σ = 1, which multiplies the logical state ρ, so decoding returns exactly ρ.",
}

DIAG = [0.5, 0.25, 0.125, 0.125]
LABEL = ["½", "¼", "⅛", "⅛"]


def draw(fig):
    t = fig.t
    assert orthogonal()
    rho = [[0.5, 0.5], [0.5, 0.5]]
    off = 0.1 + 0.05j
    sigma = [[DIAG[i] if i == j else (off if i < j else off.conjugate()) for j in range(4)] for i in range(4)]
    out = recover(sigma, rho)
    tr = sum(sigma[i][i] for i in range(4))
    assert abs(tr - 1) < 1e-12
    assert all(abs(out[r][c] - tr * rho[r][c]) < 1e-12 for r in range(2) for c in range(2))

    x0, y0, c = 95, 56, 42
    fig.text(x0 + 2 * c, 26, t("噪声矩阵 *σ*", "noise matrix *σ*"), size=14, weight=600, anchor="middle")
    for i in range(4):
        fig.text(x0 + i * c + c / 2, y0 - 8, NAMES[i], size=13, color="dim", anchor="middle")
        fig.text(x0 - 10, y0 + i * c + c / 2, NAMES[i], size=13, color="dim", anchor="end", middle=True)
        for j in range(4):
            x, y = x0 + j * c, y0 + i * c
            if i == j:
                fig.rect(x + 2, y + 2, c - 4, c - 4, color="line", fill="line", fill_opacity=0.3, width=1.4, rx=3)
                fig.text(x + c / 2, y + c / 2, LABEL[i], size=16, color="line", weight=600, anchor="middle", middle=True)
            else:
                fig.rect(x + 2, y + 2, c - 4, c - 4, color="area", fill="area", fill_opacity=0.12, width=1.0, rx=3)
                fig.cross(x + c / 2, y + c / 2, 7, "area", 1.6)
    fig.text(x0 + 2 * c, y0 + 4 * c + 26, t("跨房间的相干项：解码时切掉", "cross-room terms: cut by decoding"),
             size=13, color="area", anchor="middle")

    mx, ay = x0 + 2 * c, y0 + 4 * c + 42
    fig.arrow(mx, ay, mx, ay + 44, "dim", 1.8)
    fig.text(mx + 12, ay + 22, t("解码", "decode"), size=13, color="dim", middle=True)
    fig.text(mx, ay + 72, "Tr *σ* = ½ + ¼ + ⅛ + ⅛ = 1", size=14, color="line", anchor="middle", middle=True)
    fig.text(mx, ay + 102, t("输出 = 1 · *ρ* = *ρ*", "output = 1 · *ρ* = *ρ*"), size=15, color="ink",
             weight=600, anchor="middle", middle=True)
