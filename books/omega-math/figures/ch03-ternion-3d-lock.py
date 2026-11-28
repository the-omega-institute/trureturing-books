"""An invariant bracket vanishes in low dimensions, while ternion order changes the fourth coordinate."""

SIZE = (704, 322)
WRAP = True
ALT = {
    "zh": "在一维和二维，括号必须与生成方向正交。非退化不变形式迫使括号为零。"
          "在三维有理三元数中，交换 pHalf 与 qHalf 使乘积第四分量由 +1 变为 −1。",
    "en": "In dimensions one and two the bracket is orthogonal to the spanning directions, so an invariant "
          "nondegenerate form forces it to vanish. In the three-dimensional rational ternion heap, "
          "swapping pHalf and qHalf reverses the fourth coordinate from +1 to −1.",
}


def product_with_pole(a, b):
    # The middle term p0 is the multiplicative unit and both inputs have scalar part 1.
    _, x, y, z = a
    _, u, v, w = b
    return (1 - x*u - y*v - z*w, x + u + y*w - z*v,
            y + v + z*u - x*w, z + w + x*v - y*u)


def draw(fig):
    left, right = fig.row([344, 344], 322)
    left.text(172, 24, left.t("低维不变李括号", "Invariant brackets in 1D and 2D"),
              size=18, anchor="middle", weight=600)
    left.text(43, 78, "1D", size=15, weight=600)
    left.line(110, 73, 282, 73, "faint", 1.4)
    left.arrow(148, 73, 262, 73, "cyan", 2, head=7)
    left.dot(148, 73, 3.6, "ink")
    left.text(266, 62, "x", size=14)

    left.text(43, 166, "2D", size=15, weight=600)
    left.polygon([(87, 208), (235, 208), (288, 119), (140, 119)], "cyan", fill_opacity=0.12)
    left.arrow(148, 184, 249, 184, "cyan", 2, head=7)
    left.arrow(148, 184, 183, 126, "cyan", 2, head=7)
    left.dot(148, 184, 3.6, "ink")
    left.text(252, 176, "x", size=14)
    left.text(190, 135, "y", size=14)
    left.text(172, 251, left.t("括号与所有生成方向正交", "Bracket orthogonal to the span"),
              size=15, anchor="middle")
    left.text(172, 283, left.t("左非退化不变型 ⟹ [x, y] = 0", "Left-nondegenerate form ⟹ [x, y] = 0"), size=14, anchor="middle")

    right.text(172, 24, right.t("三元数的次序 · 𝕋₃(ℚ)", "Ternion order · 𝕋₃(ℚ)"),
               size=18, anchor="middle", weight=600)
    p, q = (1, 1, 0, 0), (1, 0, 1, 0)
    forward, reverse = product_with_pole(p, q), product_with_pole(q, p)
    assert forward == (1, 1, 1, 1) and reverse == (1, 1, 1, -1)

    origin = (111, 179)
    pivot = (224, 135)
    right.polygon([origin, (197, 179), pivot, (138, 135)], "cyan", fill_opacity=0.12)
    right.arrow(*origin, 197, 179, "cyan", 2, head=7)
    right.arrow(*origin, 138, 135, "cyan", 2, head=7)
    right.text(175, 198, "i", size=15, anchor="middle")
    right.text(117, 145, "j", size=15, anchor="end")
    for product in (forward, reverse):
        sign = product[-1]
        y = pivot[1] - 59 * sign
        right.arrow(*pivot, pivot[0], y, "magenta", 2.4, head=8)
        right.text(236, y + 4, "+k" if sign > 0 else "−k", size=17, color="magenta")
    right.dot(*pivot, 3.6, "ink")
    for y, slots, result in ((242, "pHalf, p0, qHalf", forward), (277, "qHalf, p0, pHalf", reverse)):
        last = "+1" if result[-1] > 0 else "−1"
        right.text(172, y, f"[{slots}] = (1, 1, 1, **{last}**)", size=15,
                   anchor="middle", color="magenta")
