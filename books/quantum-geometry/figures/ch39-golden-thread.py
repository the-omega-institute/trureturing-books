"""两个不同的数，迟早在某一级黄金读数上分开：读出线程把每个非负实数唯一地钉住。
Two different numbers part at some golden readout level: the readout thread pins every non-negative
real down uniquely.

Rows are levels l = 0 … 7. At level l the readout of x is n = ⌊φ^l · x⌋, so x lies in the cell
[n/φ^l, (n + 1)/φ^l); the cells holding a = 0.50 and b = 0.55 are drawn on the number line (clipped to
[0.30, 0.80]) and the Zeckendorf words of the two readouts are written on the right. Up to level 4
both numbers sit in one cell and get the same word; from level 5 on a cell boundary (magenta) falls
between them and the words differ. The proof's bound, the first level with φ^l (b − a) ≥ 2, is 8; the
actual split happens earlier. All readouts are computed in _ch39.
"""

from _ch39 import PHI, cell_of, readout, zeckendorf

SIZE = (460, 300)
ALT = {
    "zh": "八行，从上到下是读数级 l = 0 到 7。每一行是同一段数轴，两个墨色的竖线标出 a = 0.50 与 b = 0.55；"
          "青色的格子是这一级里装着它们的读数格，越往下格子越窄。l = 0 到 4 时两个数落在同一个格子里，右边 a、b 两列写着同一个齐肯多夫字（b 列为灰色）；"
          "从 l = 5 起，一条品红的格界落在两数之间，两个数各占一个格子，右边两列写出两个不同的字，例如 l = 5 时是 1000 与 1001。",
    "en": "Eight rows, readout levels l = 0 to 7 from top to bottom. Each row is the same stretch of the number line, with two "
          "ink ticks at a = 0.50 and b = 0.55; the cyan cells are the readout cells holding them at that level, narrower "
          "row by row. For l = 0 to 4 both numbers sit in one cell and the columns a and b on the right show the same Zeckendorf word (b in grey); "
          "from l = 5 on, a magenta cell boundary falls between them, each has its own cell, and the two columns show different words, "
          "for example 1000 and 1001 at l = 5.",
}

A, B = 0.50, 0.55
LO, HI = 0.30, 0.80
LEVELS = range(8)


def draw(fig):
    t = fig.t
    x0, x1 = 50, 274
    X = lambda v: x0 + (v - LO) / (HI - LO) * (x1 - x0)
    top, dy, hh = 54, 27, 14
    fig.text(26, 34, "*l*", size=14, color="dim", anchor="middle")
    fig.text((x0 + x1) / 2, 34, t("读数格", "readout cell"), size=13, color="dim", anchor="middle")
    fig.text(375, 34, t("齐肯多夫字", "Zeckendorf word"), size=13, color="dim", anchor="middle")
    ca, cb = 300, 452
    split_at = None
    for l in LEVELS:
        y = top + l * dy
        na, nb = readout(l, A), readout(l, B)
        fig.text(26, y, str(l), size=14, color="dim", anchor="middle", middle=True)
        fig.line(x0, y, x1, y, "faint", 1.0)
        cells = {cell_of(l, A), cell_of(l, B)}
        for lo, hi in cells:
            a, b = max(lo, LO), min(hi, HI)
            fig.rect(X(a), y - hh / 2, X(b) - X(a), hh, color="line", fill="line", fill_opacity=0.18, width=1.3)
        if na != nb:
            if split_at is None:
                split_at = l
            edge = (nb) / PHI ** l
            assert A < edge <= B
            fig.line(X(edge), y - hh / 2 - 4, X(edge), y + hh / 2 + 4, "area", 2.4)
        fig.text(ca, y, zeckendorf(na), size=13, color="line", anchor="start", middle=True, mono=True)
        fig.text(cb, y, zeckendorf(nb), size=13, color="line" if na != nb else "dim", anchor="end", middle=True,
                 mono=True)
        for v in (A, B):
            fig.line(X(v), y - hh / 2 - 2, X(v), y + hh / 2 + 2, "ink", 1.6)
    assert split_at == 5
    assert all(readout(l, A) == readout(l, B) for l in range(5))
    # the proof's guaranteed level: φ^l (b − a) ≥ 2
    guaranteed = next(l for l in range(40) if PHI ** l * (B - A) >= 2)
    assert guaranteed == 8 and split_at < guaranteed
    yb = top + 7 * dy + 26
    fig.line(x0, yb, x1, yb, "dim", 1.2)
    for v, s in ((A, "*a*"), (B, "*b*")):
        fig.line(X(v), yb - 4, X(v), yb + 4, "ink", 1.6)
    fig.text(X(A) - 3, yb + 20, "*a* = 0.50", size=13, anchor="end")
    fig.text(X(B) + 3, yb + 20, "*b* = 0.55", size=13, anchor="start")
    fig.text(ca, yb + 20, "*a*", size=13, anchor="start")
    fig.text(cb, yb + 20, "*b*", size=13, anchor="end")
    for v in (LO, HI):
        fig.text(X(v), yb + 20, f"{v:.1f}", size=13, color="dim", anchor="middle")
