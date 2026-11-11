"""把 k 阶刀片的因子倒过来排，要交换 k(k − 1)/2 次，每次交换变一次号（第二十五章 §三比特刀片掩码，逆序共轭）。
Reversing the factors of a grade-k blade takes k(k − 1)/2 swaps of neighbours, and every swap flips the sign
(chapter 25, three-bit blade masks, reversion).

Each panel sorts the reversed word back into increasing order by swapping neighbours (bubble sort); a swap is two
crossing magenta strands, as in the blade-multiplication page. The script checks the swap count against
k(k − 1)/2 and the sign against the table's reversion column (+, +, −, −).
"""

from _ch25 import title

SIZE = (548, 300)
WRAP = True
ALT = {
    "zh": "四栏，阶数 k = 0、1、2、3。每栏顶上是刀片的因子，底下是倒过来的次序，中间的线把每个因子连到它的新位置，"
          "相邻两条线交换一次就画成两条交叉的品红线。k = 0 的 1 与 k = 1 的 e₁ 没有交叉，底下写青色的 +；"
          "k = 2 的 e₁e₂ 倒成 e₂e₁，交叉 1 次，写品红的 −；k = 3 的 e₁e₂e₃ 倒成 e₃e₂e₁，交叉 3 次，写品红的 −。",
    "en": "Four panels for grades k = 0, 1, 2, 3. Each panel has the blade's factors on top and the reversed order at the "
          "bottom; strands carry each factor to its new place, and each swap of two neighbours is drawn as two crossing "
          "magenta strands. The 1 of grade 0 and the e₁ of grade 1 have no crossing and a cyan + below; e₁e₂ reverses to "
          "e₂e₁ with 1 crossing and a magenta −; e₁e₂e₃ reverses to e₃e₂e₁ with 3 crossings and a magenta −.",
}

FACTORS = ["*e*_{1}", "*e*_{2}", "*e*_{3}"]


def swaps_to_reverse(k):
    """The neighbour swaps that turn 0 … k − 1 into k − 1 … 0, one layer at a time."""
    order = list(range(k))
    target = order[::-1]
    layers = []
    while order != target:
        for i in range(k - 1):
            if order[i] < order[i + 1]:
                order[i], order[i + 1] = order[i + 1], order[i]
                layers.append(i)
                break
    return layers


def panel(p, k):
    title(p, f"*k* = {k}", f"*k* = {k}")
    layers = swaps_to_reverse(k)
    assert len(layers) == k * (k - 1) // 2
    sign = -1 if len(layers) % 2 else 1
    assert sign == [1, 1, -1, -1][k]

    top, bottom = 58, 214
    gap = 34
    xs = [p.width / 2 + gap * (i - (k - 1) / 2) for i in range(max(k, 1))]
    if k == 0:
        p.text(xs[0], top - 10, "1", size=15, anchor="middle")
        p.line(xs[0], top, xs[0], bottom, "ink", 1.6)
        p.text(xs[0], bottom + 20, "1", size=15, anchor="middle")
    else:
        for i in range(k):
            p.text(xs[i], top - 10, FACTORS[i], size=15, anchor="middle")
        n = max(len(layers), 1)
        h = (bottom - top) / n
        order = list(range(k))
        for j in range(n):
            y0, y1 = top + h * j, top + h * (j + 1)
            sw = layers[j] if layers else None
            for pos in range(k):
                if sw is not None and pos in (sw, sw + 1):
                    other = sw + 1 if pos == sw else sw
                    p.line(xs[pos], y0, xs[other], y1, "area", 2.0)
                else:
                    p.line(xs[pos], y0, xs[pos], y1, "ink", 1.6)
            if sw is not None:
                order[sw], order[sw + 1] = order[sw + 1], order[sw]
        assert order == list(range(k))[::-1]
        for i in range(k):
            p.text(xs[i], bottom + 20, FACTORS[order[i]], size=15, anchor="middle")
    role = "line" if sign > 0 else "area"
    p.text(p.width / 2, 266, p.t(f"交换 {len(layers)} 次", f"{len(layers)} swap{'s' if len(layers) != 1 else ''}"),
           size=13, color="dim", anchor="middle")
    p.text(p.width / 2, 290, "+" if sign > 0 else "−", size=20, color=role, weight=600, anchor="middle")


def draw(fig):
    panels = fig.row([125, 125, 125, 125], 300, gap=16)
    for k, p in enumerate(panels):
        panel(p, k)
