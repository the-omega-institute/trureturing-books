"""目标在每条读出纤维上取常值，就穿过读出分解：1/7 的第 n 位数字只看 n mod 6，于是 target = factor ∘ readout（第三十六章 §理解即出离）。
A target that is constant on every fibre of the readout factors through it: the n-th digit of 1/7 depends
only on n mod 6, so target = factor ∘ readout (chapter 36, understanding as exit).

X is the first twelve digit positions of 0.142857…, readout(n) = n mod 6, target(n) = the n-th digit
(computed by long division). Each class n mod 6 has two positions above it, carrying the same digit; the
fibre {3, 9} is amber. This is the factorisation condition of thm-ch36-quotient-annihilator-and-factorization,
Conjunct 1, on one example.
"""

from _ch36 import DIGITS

SIZE = (460, 300)
ALT = {
    "zh": "三行点。最上一行是 0.142857 142857 的十二个数位，每个点上写着它的数字。灰线把第 n 位连到中间一行的余数 n mod 6，每个余数正好接住两个数位，而且这两位的数字相同；"
          "余数 3 那一条纤维（第 3 位与第 9 位，都是 2）用琥珀色标出。中间一行再用箭头一一指到最下一行的数字。顶上写着 target = factor ∘ readout。",
    "en": "Three rows of points. The top row is the twelve digit positions of 0.142857 142857, each labelled with its digit. "
          "Grey lines take position n to the class n mod 6 in the middle row; each class catches exactly two positions, "
          "and they carry the same digit. The fibre of class 3 (positions 3 and 9, both 2) is amber. Arrows then take each "
          "class to one digit in the bottom row. At the top: target = factor ∘ readout.",
}

PICK = 3  # the fibre shown in amber


def draw(fig):
    t = fig.t
    y1, y2, y3 = 84, 178, 262
    xs = [104 + 30 * i for i in range(12)]
    cls = {r: xs[(r - 1) % 6] for r in range(6)}  # class r sits under position r (6 ↦ 0)
    order = [1, 2, 3, 4, 5, 0]

    fig.text(230, 26, "target = factor ∘ readout", size=15, weight=600, anchor="middle", mono=False)
    fig.text(14, y1, t("数位 *n*", "position *n*"), size=13, color="dim", middle=True)
    fig.text(14, y2, "*n* mod 6", size=13, color="dim", middle=True)
    fig.text(14, y3, t("数字", "digit"), size=13, color="dim", middle=True)

    for n in range(1, 13):
        r = n % 6
        role = "now" if r == PICK else "dim"
        fig.line(xs[n - 1], y1, cls[r], y2, role, 2.2 if r == PICK else 1.2)
    for r in order:
        digits = {DIGITS[n - 1] for n in range(1, 13) if n % 6 == r}
        assert len(digits) == 1  # the target is constant on the fibre
        d = digits.pop()
        role = "now" if r == PICK else "ink"
        fig.arrow(cls[r], y2 + 8, cls[r], y3 - 18, role, 1.8, head=8)
        fig.text(cls[r], y3, str(d), size=16, weight=600, color=role, anchor="middle", middle=True)
        fig.dot(cls[r], y2, 5.0, role, ring="bg")
        fig.text(cls[r] - 10, y2 + 2, str(r), size=13, color="dim", anchor="end", middle=True, halo=True)
    for n in range(1, 13):
        role = "now" if n % 6 == PICK else "ink"
        fig.dot(xs[n - 1], y1, 4.2, role, ring="bg")
        fig.text(xs[n - 1], y1 - 16, str(DIGITS[n - 1]), size=14, weight=600, color=role, anchor="middle")
    fig.text(xs[-1] + 4, (y1 + y2) / 2, "readout", size=13, color="dim", anchor="end", halo=True)
    fig.text(xs[5] + 14, (y2 + y3) / 2 + 4, "factor", size=13, color="dim", anchor="start")
    assert DIGITS[PICK - 1] == DIGITS[PICK + 5] == 2
