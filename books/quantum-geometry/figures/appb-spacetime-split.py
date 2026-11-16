"""时空劈裂：时空代数的偶数部分，八块基片与三维欧氏克利福德代数的八块一一对上（附录 B §B.5）。
The spacetime split: the even part of the spacetime algebra has eight blades that match the eight blades of the
Euclidean Cl₃,₀ one for one (appendix B, B.5).

Generators γ₀ … γ₃ with γ₀² = +1, γₖ² = −1 (bits 0 … 3 of a mask). The script builds σₖ = γₖγ₀ and their products
with _appb.blade_mul, and checks that the correspondence e_a ↦ (the σ-word of a) multiplies exactly as the table
of B.2: φ(E_a)φ(E_b) = ±φ(E_{a⊕b}) with the same sign as E_aE_b in Cl₃,₀. Rows are coloured by what they are in
Cl₃,₀: cyan vectors, magenta bivectors, violet pseudoscalar.
"""

from _appb import NAME, ORDER, blade_mul, grade

SIZE = (440, 346)
ALT = {
    "zh": "左列是时空代数 Cl₁,₃ 偶数部分的八块基片，右列是 Cl₃,₀ 的八块基片，每行一条线把它们连起来，最右一栏是两边相同的平方。"
          "1 对 1，平方 +1。三支时间—空间双向量 σₖ = γₖγ₀（时空里是 2 阶）对三个向量 e₁、e₂、e₃（1 阶），用青色线连，平方 +1。"
          "三块纯空间双向量 σ₁σ₂ = −γ₁γ₂、σ₁σ₃ = −γ₁γ₃、σ₂σ₃ = −γ₂γ₃ 对 e₁₂、e₁₃、e₂₃，用品红线连，平方 −1。"
          "四维伪标量 σ₁σ₂σ₃ = γ₀γ₁γ₂γ₃（4 阶）对 e₁₂₃（3 阶），用紫色线连，平方 −1。顶上写着生成元的平方：γ₀² = +1，γ₁² = γ₂² = γ₃² = −1。",
    "en": "The left column holds the eight blades of the even part of the spacetime algebra Cl₁,₃, the right column the "
          "eight blades of Cl₃,₀; a line joins each row, and the last column gives the square, the same on both sides. "
          "1 goes to 1, square +1. The three time–space bivectors σₖ = γₖγ₀ (grade 2 in spacetime) go to the three vectors "
          "e₁, e₂, e₃ (grade 1), joined in cyan, square +1. The three purely spatial bivectors σ₁σ₂ = −γ₁γ₂, "
          "σ₁σ₃ = −γ₁γ₃, σ₂σ₃ = −γ₂γ₃ go to e₁₂, e₁₃, e₂₃, joined in magenta, square −1. The four-dimensional "
          "pseudoscalar σ₁σ₂σ₃ = γ₀γ₁γ₂γ₃ (grade 4) goes to e₁₂₃ (grade 3), joined in violet, square −1. Above, the squares "
          "of the generators: γ₀² = +1, γ₁² = γ₂² = γ₃² = −1.",
}

METRIC = (1, -1, -1, -1)
SUB = "₀₁₂₃"


def mul(x, y):
    """Product of signed blades (sign, mask) in Cl₁,₃."""
    s, m = blade_mul(x[1], y[1], METRIC)
    return (x[0] * y[0] * s, m)


def gamma_word(sb):
    s, m = sb
    word = "".join(f"γ_{{{i}}}" for i in range(4) if m >> i & 1) or "1"
    return ("−" if s < 0 else "") + word


def draw(fig):
    t = fig.t
    one = (1, 0)
    sigma = {k: mul((1, 1 << k), (1, 1)) for k in (1, 2, 3)}           # σₖ = γₖγ₀
    for k in (1, 2, 3):
        assert blade_mul(1 << k, 1 << k, METRIC)[0] == -1 and blade_mul(1, 1, METRIC)[0] == 1
        assert mul(sigma[k], sigma[k]) == (1, 0)                         # σₖ² = +1
    # φ(E_a): the product of σ's for the bits of a (e₁ ↦ σ₁, e₂ ↦ σ₂, e₃ ↦ σ₃)
    phi = {}
    for a in ORDER:
        v = one
        for b in range(3):
            if a >> b & 1:
                v = mul(v, sigma[b + 1])
        phi[a] = v
    for a in ORDER:                                                    # φ is multiplicative: the B.2 table again
        for b in ORDER:
            s, m = blade_mul(a, b)
            ps, pm = mul(phi[a], phi[b])
            assert pm == phi[m][1] and ps == s * phi[m][0], (a, b)
    assert phi[7] == (1, 0b1111)                                       # σ₁σ₂σ₃ = γ₀γ₁γ₂γ₃ = I₄
    assert mul(phi[7], phi[7]) == (-1, 0)                              # I₄² = −1
    assert all(grade(phi[a][1]) % 2 == 0 for a in ORDER)               # all in the even part
    assert [gamma_word(phi[a]) for a in (3, 5, 6)] == ["−γ_{1}γ_{2}", "−γ_{1}γ_{3}", "−γ_{2}γ_{3}"]   # as in ALT

    fig.text(fig.width / 2, 20, "γ_{0}^{2} = +1,   γ_{1}^{2} = γ_{2}^{2} = γ_{3}^{2} = −1", size=14, color="dim",
             anchor="middle")
    XL, XR, XS = 214, 296, 400
    fig.text(XL, 54, t("*Cl*_{1,3} 的偶数部分", "even part of *Cl*_{1,3}"), size=14, weight=600, anchor="end")
    fig.text(XR, 54, "*Cl*_{3,0}", size=14, weight=600)
    fig.text(XS, 54, t("平方", "square"), size=13, color="dim", anchor="middle")
    y = 84
    names = {0: "1", 1: "σ_{1}", 2: "σ_{2}", 4: "σ_{3}", 3: "σ_{1}σ_{2}", 5: "σ_{1}σ_{3}", 6: "σ_{2}σ_{3}", 7: "σ_{1}σ_{2}σ_{3}"}
    prev = 0
    for a in ORDER:
        k = grade(a)
        if k != prev:
            y += 10
            prev = k
        role = ["ink", "line", "area", "axis"][k]
        sq = mul(phi[a], phi[a])[0]
        assert sq == blade_mul(a, a)[0]
        if a in (1, 2, 4):                                             # written as defined: σₖ = γₖγ₀
            k1 = a.bit_length()
            assert phi[a] == mul((1, 1 << k1), (1, 1))
            left = f"{names[a]} = γ_{{{k1}}}γ_{{0}}"
        else:
            left = names[a] if a == 0 else f"{names[a]} = {gamma_word(phi[a])}"
        fig.text(XL - 34, y, left, size=14, anchor="end", middle=True)
        fig.text(XL - 4, y, str(grade(phi[a][1])), size=13, color="dim", anchor="end", middle=True)
        fig.line(XL + 4, y, XR - 26, y, role, 2.0 if k else 1.4)
        fig.text(XR - 20, y, str(k), size=13, color="dim", middle=True)
        fig.text(XR + 4, y, NAME[a], size=14, color=role, middle=True, weight=600 if k else None)
        fig.text(XS, y, "+1" if sq > 0 else "−1", size=14, color="cyan" if sq > 0 else "magenta", anchor="middle",
                 middle=True)
        y += 26
    fig.text(XL - 4, y + 10, t("阶", "grade"), size=13, color="dim", anchor="end", middle=True)
    fig.text(XR - 20, y + 10, t("阶", "grade"), size=13, color="dim", middle=True)
