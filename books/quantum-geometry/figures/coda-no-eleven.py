"""齐肯多夫自动机只收没有相邻 11 的字：十六个四位字里，收下八个。
The Zeckendorf automaton accepts exactly the words with no adjacent 11: of the sixteen four-letter
words, it keeps eight.

All 16 words w ∈ {0, 1}⁴ in counting order. A word is cyan when NoAdjacentOnes w holds (the chapter's
theorem cites base_success_iff_noAdjacentOnes with lean=), magenta otherwise, with the first adjacent
pair 11 boxed. The count 8 is asserted.
"""

from itertools import product

SIZE = (460, 236)
ALT = {
    "zh": "四行四列共十六个四位二进制字，从 0000 排到 1111。八个青色的字里没有两个相邻的 1，被接受；"
          "另外八个是品红的，里面第一对相邻的 11 用框圈出，被拒绝。下方写着“收下 8 个”。",
    "en": "Sixteen four-letter binary words in four rows of four, from 0000 to 1111. Eight cyan words have no two adjacent 1s "
          "and are accepted; the other eight are magenta, with their first adjacent pair 11 boxed, and are rejected. "
          "Below: “8 accepted”.",
}


def no_adjacent_ones(w):
    return all(not (a == 1 and b == 1) for a, b in zip(w, w[1:]))


def draw(fig):
    words = list(product((0, 1), repeat=4))
    ok = [w for w in words if no_adjacent_ones(w)]
    assert len(words) == 16 and len(ok) == 8
    cw, ch, gx, gy = 92, 34, 16, 12
    left = (fig.width - 4 * cw - 3 * gx) / 2
    top = 18
    digit = 16
    for k, w in enumerate(words):
        r, c = divmod(k, 4)
        x, y = left + c * (cw + gx), top + r * (ch + gy)
        good = no_adjacent_ones(w)
        role = "line" if good else "area"
        fig.rect(x, y, cw, ch, color=role, fill=role, fill_opacity=0.10 if good else 0.06, width=1.3, rx=5)
        x0 = x + cw / 2 - 1.5 * digit
        for i, bit in enumerate(w):
            fig.text(x0 + i * digit, y + ch / 2, str(bit), size=16, color=role, anchor="middle", middle=True, mono=True,
                     weight=600 if good else None)
        if not good:
            i = next(i for i in range(3) if w[i] == 1 and w[i + 1] == 1)
            fig.rect(x0 + i * digit - 8, y + 6, digit + 16, ch - 12, color="area", width=1.6, rx=4)
    fig.legend(left, 214, [("line", fig.t("收下 8 个", "8 accepted"))], swatch="box", size=14)
    fig.legend(left + 2 * (cw + gx), 214, [("area", fig.t("含 11，拒绝", "contains 11, rejected"))], swatch="box", size=14)
