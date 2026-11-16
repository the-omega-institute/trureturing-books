"""时间是 ptr++，观察是 *ptr：同一行内存在每一拍都原样不动，只有读头每拍右移一格并读出当前格。
Time is ptr++, observation is *ptr: the same row of memory, unchanged at every tick; only the read head
moves one cell per tick and reads the cell it is on.

Rows are clock ticks t = 0 … 5, columns are addresses 0 … 7. The cell contents are a fixed data word
(the digits of π) and are identical in every row; the head sits at ptr(t) = 1 + t and reads
*ptr = mem[ptr(t)]. Schematic (MODEL); the contents are arbitrary, the bookkeeping is checked.
"""

SIZE = (460, 312)
ALT = {
    "zh": "一张由六行、八列小格组成的图。每一行是同一段内存在一拍时的样子，八格里依次写着 3 1 4 1 5 9 2 6，每一行都完全相同；"
          "左边写着 t = 0 到 t = 5。每一行有一格是琥珀色，从第 0 拍的第 1 格起，每往下一行就右移一格，相邻两行的琥珀格之间连着一支箭头，"
          "图下注明箭头是每一拍的 ptr++；右边写着这一拍读出的值，*ptr = 1、4、1、5、9、2。",
    "en": "A grid of six rows of eight cells. Each row is the same stretch of memory at one tick, holding 3 1 4 1 5 9 2 6, "
          "and every row is identical; the rows are labelled t = 0 to t = 5 on the left. In each row one cell is amber: "
          "cell 1 at tick 0, moving one cell to the right in each later row, with an arrow between the amber cells of "
          "neighbouring rows, a note below saying the arrows are ptr++ at every tick; on the right is the value read at that tick, *ptr = 1, 4, 1, 5, 9, 2.",
}

DATA = [3, 1, 4, 1, 5, 9, 2, 6]
TICKS = 6
START = 1


def ptr(t):
    return START + t


READ = [DATA[ptr(t)] for t in range(TICKS)]
assert READ == [1, 4, 1, 5, 9, 2]
assert all(ptr(t + 1) - ptr(t) == 1 for t in range(TICKS - 1))     # ptr++


def draw(fig):
    cw, ch, gap = 32, 26, 12
    x0, y0 = 72, 52
    # addresses
    for c in range(len(DATA)):
        fig.text(x0 + c * cw + cw / 2, y0 - 12, str(c), size=13, color="dim", anchor="middle", mono=True)
    fig.text(x0 - 12, y0 - 12, fig.t("地址", "addr"), size=13, color="dim", anchor="end")
    centres = []
    for t in range(TICKS):
        y = y0 + t * (ch + gap)
        fig.text(x0 - 12, y + ch / 2, f"*t* = {t}", size=13, color="dim", anchor="end", middle=True)
        for c, v in enumerate(DATA):
            now = c == ptr(t)
            if now:
                fig.rect(x0 + c * cw + 1, y + 1, cw - 2, ch - 2, color="now", fill="now", fill_opacity=0.22, width=2.0, rx=2)
            else:
                fig.rect(x0 + c * cw + 1, y + 1, cw - 2, ch - 2, color="edge", fill="panel", width=1.1, rx=2)
            fig.text(x0 + c * cw + cw / 2, y + ch / 2, str(v), size=14, color="now" if now else "dim",
                     anchor="middle", middle=True, mono=True, weight=700 if now else None)
        centres.append((x0 + ptr(t) * cw + cw / 2, y + ch / 2))
        fig.text(x0 + len(DATA) * cw + 16, y + ch / 2, f"*ptr = {READ[t]}", size=13, color="now", middle=True, mono=True)
    for t in range(TICKS - 1):
        (xa, ya), (xb, yb) = centres[t], centres[t + 1]
        fig.arrow(xa + 4, ya + ch / 2 - 1, xb - 4, yb - ch / 2 + 1, "dim", 1.5, head=6)
    fig.text(x0, y0 + TICKS * (ch + gap) + 14, fig.t("箭头：每一拍 ptr++", "arrows: ptr++ at every tick"), size=13,
             color="dim", middle=True)
