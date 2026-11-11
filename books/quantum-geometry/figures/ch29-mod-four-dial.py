"""模 4 表盘：两个平方之和只落在第 0、1、2 格，第 3 格永远空着，线素数正住在那里。
The mod 4 dial: a sum of two squares lands only in cells 0, 1 and 2; cell 3 stays empty, and that is
where the line primes live.

The cyan cells are the residues a² + b² mod 4 reached as a, b run over 0…59 (asserted in _ch29 to be
{0, 1, 2}); each cell shows which residues of the two squares add up to it. The first five odd primes
of each kind are listed beside their cells and checked: the face primes are sums of two squares, the
line primes are not.
"""

from _ch29 import FACE, LINE, dial

SIZE = (560, 280)
ALT = {
    "zh": "一个分成四格的圆形表盘，顶上是第 0 格，顺时针依次是第 1、2、3 格。第 0、1、2 格涂成青色，"
          "分别标着 0 + 0、0 + 1、1 + 1，表示两个平方模 4 的余数相加落在这里；左边的第 3 格是品红虚线围出的空格，标着“空”。"
          "表盘左侧用品红列出线素数 3、7、11、19、23，指向第 3 格；右侧用青色列出面素数 5、13、17、29、37，指向第 1 格。",
    "en": "A round dial cut into four cells: cell 0 at the top, then clockwise cells 1, 2 and 3. Cells 0, 1 and 2 are "
          "cyan and marked 0 + 0, 0 + 1 and 1 + 1, the residues mod 4 of two squares that add up to land there; cell 3, on "
          "the left, is an empty cell outlined in dashed magenta and marked ‘empty’. To the left of the dial the line primes "
          "3, 7, 11, 19, 23 are listed in magenta, pointing to cell 3; to the right the plane primes 5, 13, 17, 29, 37 are "
          "listed in cyan, pointing to cell 1.",
}


def draw(fig):
    t = fig.t
    cx, cy, r = 280, 142, 112
    dial(fig, cx, cy, r)
    # line primes: left, pointing into cell 3
    lx = 120
    fig.text(lx, 118, t("线素数", "line primes"), size=14, color="area", anchor="end", weight=600)
    fig.text(lx, 142, "*p* ≡ 3 (mod 4)", size=13, color="area", anchor="end")
    fig.text(lx, 168, ", ".join(map(str, LINE)), size=14, color="area", anchor="end")
    fig.arrow(lx + 6, 150, cx - r * 0.78, cy, "area", 1.6, head=8)
    # face primes: right, pointing into cell 1
    rx = 440
    fig.text(rx, 118, t("面素数", "plane primes"), size=14, color="line", weight=600)
    fig.text(rx, 142, "*p* ≡ 1 (mod 4)", size=13, color="line")
    fig.text(rx, 168, ", ".join(map(str, FACE)), size=14, color="line")
    fig.arrow(rx - 6, 150, cx + r * 0.78, cy, "line", 1.6, head=8)
    fig.text(cx, 18, t("*a*² + *b*² mod 4", "*a*² + *b*² mod 4"), size=14, color="dim", anchor="middle")
