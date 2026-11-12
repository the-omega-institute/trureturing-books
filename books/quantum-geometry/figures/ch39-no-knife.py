"""先晶后刀只是教学脚手架；倒过来看，刀切到哪里，晶格点才亮到哪里，亮出的链读成一个没有相邻 11 的字。
"Lattice first, knife second" was a teaching scaffold; read the other way round, lattice points light
up only where the knife passes, and the chain they make reads as a word with no adjacent 11.

A two-dimensional schematic of the chapter's six-dimensional cut (MODEL). Both panels use the golden
cut of _ch39: lattice points (b, a) with a − b/φ in [−φ⁻², φ⁻¹), the knife E∥ of slope 1/φ in amber.
Left: the whole lattice Z² drawn first in grey, the knife laid over it. Right: no lattice drawn, only
the lit points; projected onto the blade they make long and short steps in the ratio φ (asserted), and
reading short = 1, long = 0 gives a word with no adjacent 11 (asserted), the words the automaton of
the chapter's theorem accepts.
"""

from _ch39 import chain, golden_cut, title

SIZE = (500, 286)
WRAP = True
ALT = {
    "zh": "两栏，同一把琥珀色的刀以斜率 1/φ 穿过平面。左栏“先晶后刀”：先画满一整张灰色的方格点阵，刀和它周围淡青色的带子盖在上面，"
          "带子里的点亮成青色。右栏“无刀则无晶”：不画点阵，只有带子和其中的青色点；下方是这些点投到刀上排成的一列，"
          "长段与短段之比是 φ，短段记 1、长段记 0，读出 0 1 0 0 1 0 1 0 0 1 0，里面没有相邻的 11。",
    "en": "Two panels; the same amber blade crosses the plane with slope 1/φ. Left, ‘lattice first’: a full grey grid of "
          "lattice points is drawn first, and the blade with its pale cyan strip is laid over it; the points inside the "
          "strip light up cyan. Right, ‘no blade, no crystal’: no grid, only the strip and its cyan points; below, the "
          "points projected onto the blade form a row of long and short steps in the ratio φ, short marked 1 and long 0, "
          "reading 0 1 0 0 1 0 1 0 0 1 0, with no adjacent 11.",
}

BS, AS = range(0, 13), range(0, 8)


def draw(fig):
    left, right = fig.row([242, 242], 286, gap=16)
    step = 17

    title(left, "先晶后刀", "lattice first")
    for a in AS:
        for b in BS:
            x, y = 16 + step * b, 194 - step * a
            left.dot(x, y, 2.4, "dim")
    golden_cut(left, 16, 194, step, BS, AS)
    left.text(left.width / 2, 232, left.t("脚手架", "the scaffold"), size=13, color="dim", anchor="middle")

    title(right, "无刀则无晶", "no blade, no crystal")
    P, pts = golden_cut(right, 16, 194, step, BS, AS)
    pos, word = chain(pts)
    assert word == "01001010010", word
    y = 232
    xa, xb = 16, 16 + step * 12
    k = (xb - xa) / (pos[-1] - pos[0])
    xs = [xa + (p - pos[0]) * k for p in pos]
    right.line(xs[0], y, xs[-1], y, "now", 1.8)
    for x in xs:
        right.dot(x, y, 3.4, "line", ring="bg")
    for x, x2, c in zip(xs, xs[1:], word):
        right.text((x + x2) / 2, y + 22, c, size=13, color="area" if c == "1" else "dim", anchor="middle", mono=True)
    right.text(right.width / 2, 278, right.t("没有相邻的 11", "no adjacent 11"), size=13, color="dim", anchor="middle")
