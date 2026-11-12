"""八块基片两两相乘：落在哪一块由掩码异或决定，正负号由逆序对的个数决定（附录 B §B.2）。
The eight blades multiplied pairwise: which blade the product lands on is the XOR of the masks, the sign is the
parity of the inversions (appendix B, B.2).

Every cell is computed by _appb.blade_mul and checked against the table printed in the appendix (both editions).
Cyan cells are the products with sign +, magenta cells those with sign −.
"""

from _appb import NAME, ORDER, blade_mul, cayley_table_from_text

SIZE = (456, 404)    # mask labels of 13 at most 465 wide: 10 px or more in a phone column of 358
ALT = {
    "zh": "一张 8 × 8 的格子：行是左因子，列是右因子，次序都是 1、e₁、e₂、e₃、e₁₂、e₁₃、e₂₃、e₁₂₃，每个基片下方写着它的三位掩码。"
          "每格写着乘积，青色的格子符号为正，品红的格子符号为负。第一行与第一列全是青色；对角线上前四格是 +1，后四格是 −1；"
          "64 格中 40 格为正，24 格为负。",
    "en": "An 8 × 8 grid: rows are the left factor, columns the right factor, both in the order 1, e₁, e₂, e₃, e₁₂, e₁₃, e₂₃, "
          "e₁₂₃, each with its three-bit mask beneath. Each cell holds the product: cyan cells have sign +, magenta cells "
          "sign −. The first row and column are all cyan; the diagonal is +1 for the first four blades and −1 for the last "
          "four; 40 of the 64 cells are positive and 24 negative.",
}

X0, Y0, CW, CH = 66, 52, 48, 38


def draw(fig):
    t = fig.t
    printed = {lang: cayley_table_from_text(lang) for lang in ("zh", "en")}
    cells = {}
    for a in ORDER:
        for b in ORDER:
            cells[(a, b)] = blade_mul(a, b)
            for lang in printed:
                assert printed[lang][(a, b)] == cells[(a, b)], (lang, a, b)
    pos = sum(1 for s, _ in cells.values() if s > 0)
    assert (pos, 64 - pos) == (40, 24)
    assert [cells[(m, m)][0] for m in ORDER] == [1, 1, 1, 1, -1, -1, -1, -1]

    fig.text(6, Y0 - 30, t("左 ∖ 右", "left ∖ right"), size=13, color="dim")
    for k, m in enumerate(ORDER):
        x = X0 + k * CW + CW / 2
        fig.text(x, Y0 - 22, NAME[m], size=14, anchor="middle")
        fig.text(x, Y0 - 7, format(m, "03b"), size=13, color="dim", anchor="middle", mono=True)
        y = Y0 + k * CH + CH / 2
        fig.text(X0 - 34, y - 1, NAME[m], size=14, anchor="end", middle=True)
        fig.text(X0 - 5, y, format(m, "03b"), size=13, color="dim", anchor="end", middle=True, mono=True)
    for i, a in enumerate(ORDER):
        for j, b in enumerate(ORDER):
            s, m = cells[(a, b)]
            role = "cyan" if s > 0 else "magenta"
            x, y = X0 + j * CW, Y0 + i * CH
            fig.rect(x + 1.5, y + 1.5, CW - 3, CH - 3, color=None, fill=role, fill_opacity=0.16 if s > 0 else 0.26, rx=3)
            fig.text(x + CW / 2, y + CH / 2, ("+" if s > 0 else "−") + NAME[m], size=14,
                     color="ink", anchor="middle", middle=True)
    fig.legend(X0, Y0 + 8 * CH + 26, [("cyan", t("符号 +", "sign +")), ("magenta", t("符号 −", "sign −"))], swatch="box")
    fig.text(X0 + 8 * CW, Y0 + 8 * CH + 26, t("落点：掩码异或 *a* ⊕ *b*", "lands on: mask XOR *a* ⊕ *b*"),
             size=13, color="dim", anchor="end", middle=True)
