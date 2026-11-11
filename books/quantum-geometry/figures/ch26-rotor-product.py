"""三枚各只有两项的旋子乘起来，得到一枚四项都不为零的旋子，四项的平方和仍是 1（第二十六章 §ZYZ 旋转器编译器）。
Three rotors with two terms each multiply into one rotor whose four terms are all nonzero, and the squares of
the four still add up to 1 (chapter 26, the ZYZ rotor compiler).

The angles are the chapter's example (α, β, γ) = (0.37, −0.81, 0.52); each group shows the coefficients of
1, e₁₂, e₁₃, e₂₃ as signed bars. The script compiles with the chapter's rule and checks the printed rotor
0.829592 − 0.395635 e₁₂ − 0.392911 e₁₃ + 0.029524 e₂₃ and the columns of the printed ZYZ matrix.
"""

from _ch26 import ANGLES, check_example, coeffs, rotor, title

SIZE = (560, 280)
WRAP = True
ALT = {
    "zh": "四栏，每栏是同一副小坐标，四根紫色的柱子依次是 1、e₁₂、e₁₃、e₂₃ 的系数，向上为正、向下为负。"
          "前三栏是 R_z(0.37)、R_y(−0.81)、R_z(0.52)，各只有两根柱子：标量约 0.98、0.92、0.97，另一根是 e₁₂ 的 −0.18、"
          "e₁₃ 的 −0.39、e₁₂ 的 −0.26。第四栏是乘积 R，四根柱子都不为零：0.83、−0.40、−0.39、0.03。每栏标题下都写着 Σc² = 1。",
    "en": "Four panels, each the same small chart: four violet bars for the coefficients of 1, e₁₂, e₁₃, e₂₃, up for positive "
          "and down for negative. The first three are R_z(0.37), R_y(−0.81), R_z(0.52), with two bars each: scalars about "
          "0.98, 0.92, 0.97, and −0.18 on e₁₂, −0.39 on e₁₃, −0.26 on e₁₂. The fourth is the product R, with all four bars "
          "nonzero: 0.83, −0.40, −0.39, 0.03. Under every title: Σc² = 1.",
}

LABELS = ("1", "*e*_{12}", "*e*_{13}", "*e*_{23}")


def bars(p, c, head, strong=False):
    title(p, head, head)
    x0, w, gap = 14, 18, 12
    zero, h = 156, 84
    p.line(8, zero, p.width - 8, zero, "dim", 1.2)
    p.line(8, zero - h, p.width - 8, zero - h, "faint", 1.0, dash="2 4")
    p.line(8, zero + h, p.width - 8, zero + h, "faint", 1.0, dash="2 4")
    for k, v in enumerate(c):
        x = x0 + k * (w + gap)
        if abs(v) > 1e-12:
            top = zero - h * max(v, 0)
            hh = max(h * abs(v), 2)
            p.rect(x, top if v > 0 else zero, w, hh, color="axis", fill="axis", fill_opacity=0.55 if strong else 0.3,
                   width=1.4)
        else:
            p.dot(x + w / 2, zero, 2.2, "faint")
        p.text(x + w / 2, 262, LABELS[k], size=13, color="dim", anchor="middle")
    s = sum(v * v for v in c)
    assert abs(s - 1) < 1e-12
    p.text(p.width / 2, 48, "Σ *c*^{2} = 1", size=13, color="axis" if strong else "dim", anchor="middle")


def draw(fig):
    a, b, g = ANGLES
    R = check_example()
    parts = [coeffs(rotor("z", a)), coeffs(rotor("y", b)), coeffs(rotor("z", g))]
    assert all(sum(1 for v in c if abs(v) > 1e-12) == 2 for c in parts)
    assert all(abs(v) > 0.02 for v in coeffs(R))
    panels = fig.row([124, 124, 124, 124], 280, gap=14)
    heads = ["*R*_{z}(0.37)", "· *R*_{y}(−0.81)", "· *R*_{z}(0.52)", "= *R*"]
    for p, c, head in zip(panels, parts + [coeffs(R)], heads):
        bars(p, c, head, strong=head.startswith("="))
