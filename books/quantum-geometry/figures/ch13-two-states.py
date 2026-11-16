"""边缘一样，关联格不一样：经典关联态与贝尔态在同一张 4 × 4 账本上（第十三章 §局域线与关联面）。
Same marginals, different correlation cells: the classical correlated state and the Bell state on the
same 4 × 4 ledger (chapter 13, local lines and correlation sector).

Each cell holds Tr(ρ σ_p ⊗ σ_q), computed from the two 4 × 4 density matrices. Both states leave every
local cell empty (their marginals are ½I); the classical state fills only (Z, Z), the Bell state fills
(X, X) = +1, (Y, Y) = −1, (Z, Z) = +1 (all asserted).
"""

from _ch13 import bell_density, board, classical_density, coefficients, sector

SIZE = (430, 262)
ALT = {
    "zh": "两张并排的 4 × 4 格子，行是 Alice 的 I、X、Y、Z，列是 Bob 的。左边是经典关联态，右边是贝尔态 Φ⁺。"
          "两张格子左上角都是 1，第一行与第一列的六格青色局域格全都空着。右下的品红关联格里，经典关联态只有 (Z, Z) 一格是 +1；"
          "贝尔态有三格：(X, X) 是 +1，(Y, Y) 是 −1，(Z, Z) 是 +1。",
    "en": "Two 4 × 4 boards side by side, rows Alice's I, X, Y, Z and columns Bob's. Left: the classical correlated state; "
          "right: the Bell state Φ⁺. Both boards have 1 in the top-left corner and all six cyan local cells in the first row "
          "and column empty. In the magenta correlation block the classical state fills only (Z, Z) with +1; the Bell state "
          "fills three cells: (X, X) = +1, (Y, Y) = −1 and (Z, Z) = +1.",
}


def draw(fig):
    t = fig.t
    cell = 34
    cl = coefficients(classical_density())
    bell = coefficients(bell_density())
    for c in (cl, bell):
        assert c[("I", "I")] == 1
        assert all(c[(p, q)] == 0 for (p, q) in c if sector(p, q) == "local")      # marginals ½I on both sides
    assert {k: v for k, v in cl.items() if v and sector(*k) == "corr"} == {("Z", "Z"): 1}
    assert {k: v for k, v in bell.items() if v and sector(*k) == "corr"} == {("X", "X"): 1, ("Y", "Y"): -1, ("Z", "Z"): 1}

    xl, xr = 40, 254
    for x0, vals, name in ((xl, cl, t("经典关联态", "classical correlated")), (xr, bell, t("贝尔态 Φ⁺", "Bell state Φ⁺"))):
        fig.text(x0 + 2 * cell, 24, name, size=14, weight=600, anchor="middle")
        board(fig, x0, 62, cell, values=vals)
        fig.text(x0 + 2 * cell, 62 + 4 * cell + 26, t("局域格全空", "local cells all empty"), size=13, color="line",
                 anchor="middle")
    fig.text(xl + 2 * cell, 62 + 4 * cell + 48, t("关联格：一格", "correlations: one cell"), size=13, color="area",
             anchor="middle")
    fig.text(xr + 2 * cell, 62 + 4 * cell + 48, t("关联格：三格", "correlations: three cells"), size=13, color="area",
             anchor="middle")
    fig.text((xl + 4 * cell + xr) / 2, 62 + 2 * cell + 5, "≠", size=24, color="dim", anchor="middle", middle=True)
