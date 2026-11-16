"""第二十五章地图：刀片相乘是掩码异或加一个交叉数出的符号；外尔对的两面镜子换序得到相反的箭头；三维向量写进无迹 2 × 2 矩阵。
Chapter 25 at a glance: a blade product is the XOR of the masks with a sign counted by crossings; the two
mirrors of the Weyl pair give opposite arrows in the two orders; a 3-vector written into a traceless 2 × 2 matrix.

Panel I multiplies e₂ · e₁ (masks 010₂, 001₂): the XOR is 011₂ and _blade_sign gives −1 (one crossing).
Panel II is the chapter's in-section figure ch25-anticommute, smaller and without its labels.
Panel III splits a = (0.36, 0.80, 0.48) into its vertical part (on the diagonal of B(a), ±a₂) and its
horizontal part (off the diagonal, a₀ ∓ i a₁), per B_formula_core.
"""

from _ch25 import blade_sign, title, weyl_plane

SIZE = (740, 290)
WRAP = True
ALT = {
    "zh": "三栏。左栏：e₂ · e₁ 的三位掩码排成三行格子，列是 e₁、e₂、e₃；左因子 010₂ 亮 e₂，右因子 001₂ 亮 e₁，结果一行 011₂ 两格都亮，"
          "是 e₁₂；下面两条品红的线交叉一次，把 e₂e₁ 排成 e₁e₂，结果前面是品红的负号：e₂ · e₁ = −e₁₂。"
          "中栏：态矢平面上两面青色虚线的镜子，琥珀色的箭头 u 先照 X 再照 Z、或先照 Z 再照 X，两支墨色箭头 ZXu 与 XZu 指向正相反的两端。"
          "右栏：一支琥珀色的箭头 a 拆成竖直的青色部分与水平的墨色部分；下面的 2 × 2 格子里，对角线上是青色的 a₂ 与 −a₂，"
          "两个角上是墨色的 a₀ − i a₁ 与 a₀ + i a₁。",
    "en": "Three panels. Panel I: the three-bit masks of e₂ · e₁ as three rows of cells under columns e₁, e₂, e₃; the left "
          "factor 010₂ lights e₂, the right factor 001₂ lights e₁, and the result row 011₂ lights both, which is e₁₂. Below, "
          "two magenta strands cross once to sort e₂e₁ into e₁e₂, and the result carries a magenta minus: e₂ · e₁ = −e₁₂. "
          "Panel II: two cyan dashed mirrors in the plane of state vectors; the amber arrow u reflected in X then Z, or in Z "
          "then X, gives two dark arrows ZXu and XZu at opposite ends. Panel III: an amber arrow a split into a vertical cyan "
          "part and a horizontal dark part; in the 2 × 2 grid below, the diagonal holds the cyan a₂ and −a₂ and the two "
          "corners hold the dark a₀ − i a₁ and a₀ + i a₁.",
}


def blade_rows(p):
    left, right = 0b010, 0b001
    out = left ^ right
    sign = blade_sign(left, right)
    assert out == 0b011 and sign == -1
    c, x0, y0 = 36, 92, 48
    for j, name in enumerate(("*e*_{1}", "*e*_{2}", "*e*_{3}")):
        p.text(x0 + c * j + c / 2, y0 - 4, name, size=13, color="dim", anchor="middle")
    rows = ((left, p.t("左", "left"), "ink"), (right, p.t("右", "right"), "ink"), (out, "⊕", "line"))
    for i, (m, lab, role) in enumerate(rows):
        y = y0 + 4 + i * (c + 4)
        if i == 2:
            p.line(x0 - 4, y - 3, x0 + 3 * c + 4, y - 3, "dim", 1.4)
        p.text(x0 - 10, y + c / 2, lab, size=14 if i == 2 else 13, color=role if i == 2 else "dim",
               anchor="end", middle=True, weight=600 if i == 2 else None)
        for j in range(3):
            on = (m >> j) & 1
            p.rect(x0 + c * j + 2, y + 2, c - 4, c - 4, color=role if on else "faint", fill=role if on else None,
                   fill_opacity=0.28 if on else None, width=1.4, rx=4)
            p.text(x0 + c * j + c / 2, y + c / 2, str(on), size=14, color=role if on else "dim", anchor="middle",
                   middle=True, mono=True)
    # the crossing that sorts e₂ e₁ into e₁ e₂
    ty, by = 192, 238
    xa, xb = 102, 146
    p.text(xa, ty - 8, "*e*_{2}", size=14, anchor="middle")
    p.text(xb, ty - 8, "*e*_{1}", size=14, anchor="middle")
    p.line(xa, ty, xb, by, "area", 2.2)
    p.line(xb, ty, xa, by, "area", 2.2)
    p.text(xa, by + 18, "*e*_{1}", size=14, anchor="middle")
    p.text(xb, by + 18, "*e*_{2}", size=14, anchor="middle")
    p.text(170, 220, p.t("交叉 1 次", "1 crossing"), size=13, color="area")
    p.text(118, 282, "*e*_{2} · *e*_{1} = −*e*_{12}", size=14, color="ink", weight=600, anchor="middle")


def bloch_core(p):
    a = (0.36, 0.80, 0.48)
    assert abs(sum(c * c for c in a) - 1) < 1e-12
    # B(a) entries from B_formula_core: [[a₂, a₀ − i a₁], [a₀ + i a₁, −a₂]]; trace 0
    B = [[complex(a[2]), complex(a[0], -a[1])], [complex(a[0], a[1]), complex(-a[2])]]
    assert abs(B[0][0] + B[1][1]) < 1e-12 and B[0][1] == B[1][0].conjugate()
    sp = p.sphere(112, 106, 78, az=110, el=18)
    sp.axes(length=1.0)
    flat = (a[0], a[1], 0.0)
    up = (0.0, 0.0, a[2])
    sp.segment((0, 0, 0), flat, "ink", 2.2)
    sp.segment(flat, a, "faint", 1.2, dash="3 3")
    sp.segment((0, 0, 0), up, "line", 3.2)
    sp.segment(up, a, "faint", 1.2, dash="3 3")
    sp.arrow(a, "now", 2.6)
    sp.label(a, "*a*", dx=8, dy=2, size=15, color="now", weight=600)
    x, y = sp.xy(up)
    p.text(x - 8, y + 4, "*a*_{2}", size=13, color="line", anchor="end")
    # the matrix
    cw, ch, gx, gy = 80, 32, 38, 194
    cells = (("*a*_{2}", "line"), ("*a*_{0} − *i a*_{1}", "ink"), ("*a*_{0} + *i a*_{1}", "ink"), ("−*a*_{2}", "line"))
    for k, (s, role) in enumerate(cells):
        i, j = divmod(k, 2)
        x, y = gx + cw * j, gy + ch * i
        p.rect(x + 2, y + 2, cw - 4, ch - 4, color=role if role == "line" else "edge", fill=role if role == "line" else None,
               fill_opacity=0.16 if role == "line" else None, width=1.3, rx=4)
        p.text(x + cw / 2, y + ch / 2, s, size=13, color=role, anchor="middle", middle=True)
    p.text(118, 282, p.t("对角线上的迹为 0", "the diagonal sums to 0"), size=13, color="dim", anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 290, gap=16)

    title(one, "I　掩码异或，交叉定号", "I  XOR masks, count crossings")
    blade_rows(one)

    title(two, "II　两面镜子换个次序", "II  two mirrors, two orders")
    pt, u, xu, zu, zx, xz = weyl_plane(two, 112, 160, 84, labels=False)
    x, y = pt(u)
    two.text(x + 8, y + 4, "*u*", size=14, color="now", weight=600, halo=True)
    x, y = pt(zx)
    two.text(x + 6, y + 14, "*ZXu*", size=14, weight=600, halo=True)
    x, y = pt(xz)
    two.text(x - 6, y - 6, "*XZu*", size=14, weight=600, anchor="end", halo=True)
    two.text(118, 282, "*ZX* = −*XZ*", size=14, weight=600, anchor="middle")

    title(three, "III　向量写进 2 × 2 矩阵", "III  a vector as a 2 × 2 matrix")
    bloch_core(three)
