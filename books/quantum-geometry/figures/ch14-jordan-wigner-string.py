"""c₁c₃ 与 c₃c₁ 逐格相乘，只在第 1 格差一个负号（第十四章，Jordan–Wigner 构造）。
c₁c₃ and c₃c₁ multiplied site by site differ only at site 1, by a sign (chapter 14, the Jordan–Wigner
construction).

N = 4, i = 1, j = 3. Each row is a tensor product written site by site; the products are computed with 2 × 2
matrices and the script asserts that the two orders agree at every site except site 1, where σ⁻Z = −σ⁻ and
Zσ⁻ = σ⁻ (thm-jordan-wigner-car, the case i < j).
"""

SIZE = (358, 280)
MARKUP = 2
ALT = {
    "zh": "四个格点 0 到 3 排成四列。前两行是 c₁ = Z ⊗ σ⁻ ⊗ I ⊗ I 与 c₃ = Z ⊗ Z ⊗ Z ⊗ σ⁻ 逐格的因子；后两行是两种次序逐格相乘："
          "c₁c₃ 为 I、σ⁻Z、Z、σ⁻，c₃c₁ 为 I、Zσ⁻、Z、σ⁻。格点 0、2、3 两行相同；只有第 1 列涂成品红，σ⁻Z = −σ⁻ 而 Zσ⁻ = σ⁻，"
          "所以 c₁c₃ = −c₃c₁。",
    "en": "Four sites 0 to 3 form four columns. The first two rows are the factors of c₁ = Z ⊗ σ⁻ ⊗ I ⊗ I and "
          "c₃ = Z ⊗ Z ⊗ Z ⊗ σ⁻ site by site; the last two rows multiply them in both orders: c₁c₃ is I, σ⁻Z, Z, σ⁻ and c₃c₁ is "
          "I, Zσ⁻, Z, σ⁻. Sites 0, 2 and 3 agree; only column 1 is shaded magenta, where σ⁻Z = −σ⁻ while Zσ⁻ = σ⁻, so "
          "c₁c₃ = −c₃c₁.",
}

I2 = ((1, 0), (0, 1))
Z = ((1, 0), (0, -1))
SM = ((0, 1), (0, 0))      # σ⁻ = |0⟩⟨1|
NAME = {I2: "*I*", Z: "*Z*", SM: "σ^{−}"}


def mul(a, b):
    return tuple(tuple(sum(a[r][k] * b[k][c] for k in range(2)) for c in range(2)) for r in range(2))


def neg(a):
    return tuple(tuple(-x for x in row) for row in a)


def c(j, n=4):
    return [Z if k < j else SM if k == j else I2 for k in range(n)]


def draw(fig):
    t = fig.t
    c1, c3 = c(1), c(3)
    p13 = [mul(a, b) for a, b in zip(c1, c3)]
    p31 = [mul(b, a) for a, b in zip(c1, c3)]
    differ = [k for k in range(4) if p13[k] != p31[k]]
    assert differ == [1] and p13[1] == neg(SM) and p31[1] == SM and p13[0] == I2

    x0, w, h = 92, 64, 34
    xs = [x0 + k * w for k in range(4)]
    rows = [26, 66, 140, 180]
    # the one column where the two orders differ
    fig.rect(xs[1] + 2, rows[2] - 4, w - 4, 2 * h + 14, color="area", fill="area", fill_opacity=0.16, rx=5, width=1.4)
    for k in range(4):
        fig.text(xs[k] + w / 2, 16, t(f"格点 {k}", f"site {k}"), size=13, color="dim", anchor="middle")
    for r, (label, ops) in enumerate([("*c*_{1}", c1), ("*c*_{3}", c3)]):
        y = rows[r] + 26
        fig.text(x0 - 12, y, label, size=15, color="ink", anchor="end")
        for k, op in enumerate(ops):
            fig.rect(xs[k] + 6, rows[r] + 6, w - 12, h - 4, color="edge", fill="panel", rx=4, width=1.0)
            fig.text(xs[k] + w / 2, y, NAME[op], size=15, color="ink", anchor="middle")
    fig.line(x0 - 60, 118, x0 + 4 * w, 118, "faint", 1.0)
    prod = {0: ("*ZZ* = *I*", "*ZZ* = *I*"), 1: ("σ^{−}*Z*", "*Z*σ^{−}"), 2: ("*Z*", "*Z*"), 3: ("σ^{−}", "σ^{−}")}
    for r, label in [(2, "*c*_{1}*c*_{3}"), (3, "*c*_{3}*c*_{1}")]:
        y = rows[r] + 26
        fig.text(x0 - 12, y, label, size=15, color="ink", anchor="end")
        for k in range(4):
            fig.text(xs[k] + w / 2, y, prod[k][r - 2], size=15, color="area" if k == 1 else "ink", anchor="middle")
    fig.text(xs[1] + w / 2, 240, t("σ^{−}*Z* = −σ^{−}，*Z*σ^{−} = σ^{−}", "σ^{−}*Z* = −σ^{−},  *Z*σ^{−} = σ^{−}"),
             size=14, color="area", anchor="middle")
    fig.text(x0 + 2 * w, 268, "*c*_{1}*c*_{3} = −*c*_{3}*c*_{1}", size=15, color="area", anchor="middle", weight=600)
