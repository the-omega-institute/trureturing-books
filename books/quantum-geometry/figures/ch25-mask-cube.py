"""八块刀片是立方体的八个角，掩码就是角的坐标；乘上一块刀片，就是沿它亮着的那几个方向各走一条边（第二十五章 §三比特刀片掩码）。
The eight blades are the corners of a cube and the mask is the corner's coordinates; multiplying by a blade walks
one edge along each direction it lights up (chapter 25, three-bit blade masks).

Bit 0 (e₁) runs to the right, bit 1 (e₂) into the page, bit 2 (e₃) up. The walk is e₁₂ · e₂₃: from 011₂ it
flips bit 1 and then bit 2 and stops at 101₂ = e₁₃. The script checks the end corner against left ^ right and
the sign against the chapter's _blade_sign (here +, so the picture has nothing to say about signs).
"""

from _ch25 import NAMES, blade_sign

SIZE = (480, 340)
ALT = {
    "zh": "一个立方体：向右是 e₁ 的方向，斜向纸里是 e₂，向上是 e₃。八个角标着八块刀片与它们的三位掩码：左下前角是 1（000₂），"
          "沿三条棱分别到 e₁（001₂）、e₂（010₂）、e₃（100₂），最远的角是 I₃（111₂）。琥珀色的两段箭头从 e₁₂（011₂）出发，"
          "先沿 e₂ 方向走一条棱到 e₁（001₂），再沿 e₃ 方向向上走一条棱到 e₁₃（101₂）：乘上 e₂₃（110₂）就是在 e₂、e₃ 两个方向上各走一步，"
          "终点的掩码是 011₂ ⊕ 110₂ = 101₂。",
    "en": "A cube: e₁ points right, e₂ slants into the page, e₃ points up. The eight corners carry the eight blades and their "
          "three-bit masks: the front lower-left corner is 1 (000₂), the three edges from it lead to e₁ (001₂), e₂ (010₂) and "
          "e₃ (100₂), and the far corner is I₃ (111₂). Two amber arrows start at e₁₂ (011₂), walk one edge along e₂ to e₁ "
          "(001₂), then one edge up along e₃ to e₁₃ (101₂): multiplying by e₂₃ (110₂) takes one step along e₂ and one along "
          "e₃, and the end mask is 011₂ ⊕ 110₂ = 101₂.",
}

O = (96, 268)
E = {0: (190, 0), 1: (104, -70), 2: (0, -168)}


def corner(m):
    x, y = O
    for b in range(3):
        if (m >> b) & 1:
            x += E[b][0]
            y += E[b][1]
    return x, y


def draw(fig):
    t = fig.t
    left, right = 0b011, 0b110
    end = left ^ right
    assert end == 0b101 and blade_sign(left, right) == +1

    # edges, far ones (touching the hidden corner 010₂) dashed
    for m in range(8):
        for b in range(3):
            if not (m >> b) & 1:
                n = m | (1 << b)
                hidden = m == 0b010 or n == 0b010
                fig.line(*corner(m), *corner(n), "dim" if not hidden else "faint", 1.5, dash="5 4" if hidden else None)

    # the walk: flip bit 1, then bit 2
    mid = left ^ 0b010
    for a, b in ((left, mid), (mid, end)):
        (x1, y1), (x2, y2) = corner(a), corner(b)
        k = 9 / ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
        fig.arrow(x1 + (x2 - x1) * k, y1 + (y2 - y1) * k, x2 - (x2 - x1) * k, y2 - (y2 - y1) * k, "now", 3.0, head=11)

    # corners and their labels
    place = {0: (-10, 18, "end"), 1: (10, 18, "start"), 2: (-10, -6, "end"), 3: (10, 6, "start"),
             4: (-10, 4, "end"), 5: (10, 4, "start"), 6: (-10, -6, "end"), 7: (10, -6, "start")}
    for m in range(8):
        x, y = corner(m)
        on = m in (left, mid, end)
        fig.dot(x, y, 6 if on else 4.6, "now" if on else "ink", ring="bg")
        dx, dy, anc = place[m]
        name = NAMES[m]
        bits = format(m, "03b") + "₂"
        fig.text(x + dx, y + dy, f"{name}  {bits}" if anc == "start" else f"{bits}  {name}", size=14,
                 color="now" if on else "ink", anchor=anc, weight=600 if on else None, halo=True)

    # direction keys
    fig.text(O[0] + E[0][0] / 2, O[1] + 26, t("→ *e*_{1}（第 0 位）", "→ *e*_{1} (bit 0)"), size=13, color="dim",
             anchor="middle")
    fig.text(O[0] - 18, O[1] + E[2][1] / 2, t("↑ *e*_{3}", "↑ *e*_{3}"), size=13, color="dim", anchor="end")
    x2, y2 = corner(0b010)
    fig.text(O[0] + E[1][0] / 2 - 14, O[1] + E[1][1] / 2 - 4, "*e*_{2}", size=13, color="dim", anchor="end")
    fig.text(470, 330, t("乘 *e*_{23}：在 *e*_{2}、*e*_{3} 上各走一步", "× *e*_{23}: one step along *e*_{2}, one along *e*_{3}"),
             size=13, color="now", anchor="end")
