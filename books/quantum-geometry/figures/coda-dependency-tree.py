"""哪一章依赖哪一章：每章画一支箭头，从它在正文里回头引用得最多的那一章指过来。
Which chapter rests on which: one arrow into every chapter, from the earlier chapter it refers back to
most often in its own text.

The 30 chapters run down the page in reading order, grouped into the eight parts of zh/SUMMARY.md.
A reference is a link to chNN-….md or the words “第 N 章” in chapter M's Chinese text outside the captions of figures, lab cards and films (_coda.chapter_references
counts them). For every chapter the arrow comes from the earlier chapter with the most such mentions (ties go
to the later one); its width grows with that count. The list EDGES below is the data the figure draws; each
entry names the line of its first mention, and the script recomputes the list from the chapters and asserts
that it still matches. Chapter 11 has no reference back to an earlier chapter, so it has no arrow.
"""

from _coda import chapter_references, parts

SIZE = (380, 540)
ALT = {
    "zh": "三十个圆点自上而下排成一列，代表第 1 至第 30 章，左边按八部分成八段并写着部名。每个圆点（第 1 章与第 11 章除外）"
          "都有一支向右鼓出的弧形箭头指向它，起点是它回头引用最多的那一章；箭头越粗，引用越多。"
          "第 1 章发出六支箭头（到第 2、5、9、18、23、28 章），第 3 章发出四支（到第 4、10、19、21 章），"
          "第 21 章发出两支粗箭头（到第 22、24 章）；第 11 章是空心圆点，没有箭头指向它。",
    "en": "Thirty dots run down the page for chapters 1 to 30, grouped on the left into the eight parts with their names. "
          "Every dot except chapters 1 and 11 receives one arrow, an arc bulging to the right, from the chapter it refers "
          "back to most; the thicker the arrow, the more mentions. Chapter 1 sends six arrows (to chapters 2, 5, 9, 18, 23 "
          "and 28), chapter 3 sends four (to 4, 10, 19 and 21), and chapter 21 sends two thick ones (to 22 and 24); "
          "chapter 11 is a hollow dot with no arrow.",
}

# (cited, citing): the first mention in the citing chapter's zh text, and the number of mentions
EDGES = [
    (1, 2),     # ch02-born-rule.md:5 “第一章”, 7 mentions
    (2, 3),     # ch03-projectors-and-duality.md:5 “第二章”, 8 mentions
    (3, 4),     # ch04-decoherence.md:5 “第三章”, 7 mentions (tied with 第一章)
    (1, 5),     # ch05-complex-phase-and-rotors.md:9 “第一章”, 4 mentions
    (5, 6),     # ch06-geometric-product.md:11 “第五章”, 10 mentions
    (2, 7),     # ch07-geometric-time-and-speed-limits.md:88 “第二章”, 4 mentions
    (7, 8),     # ch08-erasure-and-time-arrows.md:9 “第七章”, 3 mentions
    (1, 9),     # ch09-axes-and-state-addressing.md:5 “第一章”, 6 mentions
    (3, 10),    # ch10-gram-geometry-and-order.md:76 “第 3 章”, 3 mentions
    # ch11-pulses-and-virtual-z.md: no reference back to an earlier chapter
    (11, 12),   # ch12-measurement-computation-and-gradients.md:5 “第十一章”, 7 mentions
    (4, 13),    # ch13-entanglement-and-chsh.md:5 “第四章”, 4 mentions
    (13, 14),   # ch14-cloning-codes-and-braids.md:5 “第十三章”, 2 mentions (tied with 第二章)
    (14, 15),   # ch15-grover-qft-and-period-finding.md:5 “第十四章”, 2 mentions (tied with 第十三章)
    (15, 16),   # ch16-qsvt-walks-and-compilation.md:5 “第十五章”, 8 mentions
    (4, 17),    # ch17-lorentz-geometry.md:5 “第四章”, 2 mentions (tied with 第二、三章)
    (1, 18),    # ch18-spinors-and-gauge-curvature.md:26 “第一章”, 2 mentions
    (3, 19),    # ch19-tensor-networks-and-holography.md:5 “第三章”, 2 mentions (tied with 第二章)
    (19, 20),   # ch20-complexity-and-spacetime.md:5 link ch19-tensor-networks-and-holography.md, 3 mentions (tied with 第十章)
    (3, 21),    # ch21-diagonalization-and-escape.md:11 “第三章”, 2 mentions (tied with 第一章)
    (21, 22),   # ch22-primes-euler-products-and-zeros.md:5 “第二十一章”, 9 mentions
    (1, 23),    # ch23-diophantine-definability.md:5 “第一章”, 4 mentions
    (21, 24),   # ch24-cosine-fixed-points-and-self-reference.md:12 “第二十一章”, 11 mentions
    (14, 25),   # ch25-rewriting-and-xor.md:239 “第十四章”, 4 mentions
    (25, 26),   # ch26-single-qubit-rotor-compilation.md:5 “第二十五章”, 4 mentions
    (24, 27),   # ch27-reading-frozen-proofs-i.md:62 “第二十四章”, 2 mentions (tied with 第一、三、四章)
    (1, 28),    # ch28-reading-frozen-proofs-ii.md:5 “第一章”, 4 mentions
    (10, 29),   # ch29-timeless-causality-and-gram-space.md:5 “第 10 章”, 4 mentions
    (29, 30),   # ch30-fields-lines-eth-and-navier-stokes.md:5 “第 29 章”, 3 mentions (tied with 第二十一章)
]

PART_ZH = "一二三四五六七八"
PART_EN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]


def main_edges(refs):
    out = []
    for b in range(2, 31):
        cands = [(refs[(a, b)], a) for a in range(1, b) if refs[(a, b)]]
        if cands:
            out.append((max(cands)[1], b))
    return out


def draw(fig):
    import math
    refs = chapter_references()
    now = main_edges(refs)
    assert now == EDGES, ("the chapters' references changed: in EDGES replace "
                          f"{sorted(set(EDGES) - set(now))} by {sorted(set(now) - set(EDGES))} (with their sources), "
                          "then update ALT and the caption in zh/en coda.md if they name these chapters")
    groups = parts()
    assert [c for g in groups for c in g] == list(range(1, 31)) and len(groups) == 8

    y0, dy, nx = 30, 16.6, 112
    Y = {c: y0 + (c - 1) * dy for c in range(1, 31)}
    for k, g in enumerate(groups):
        top, bot = Y[g[0]] - dy / 2 + 1, Y[g[-1]] + dy / 2 - 1
        fig.rect(6, top, 120, bot - top, color=None, fill="panel", fill_opacity=0.9 if k % 2 == 0 else 0.35, rx=3)
        fig.text(12, (top + bot) / 2, fig.t(f"第{PART_ZH[k]}部", f"Part {PART_EN[k]}"), size=13, color="dim", middle=True)
    targets = {b for _, b in EDGES}
    for a, b in sorted(EDGES, key=lambda e: e[1] - e[0], reverse=True):
        n = refs[(a, b)]
        ya, yb = Y[a], Y[b]
        rx, ry = 10 + 8.6 * (b - a), (yb - ya) / 2
        cx, cy = nx + 6, (ya + yb) / 2
        pts = [(cx + rx * math.sin(math.pi * i / 40), cy - ry * math.cos(math.pi * i / 40)) for i in range(41)]
        fig.curve_arrow(pts, "dim", min(3.4, 1.1 + 0.2 * n), head=7)
    for c in range(1, 31):
        fig.text(nx - 10, Y[c], str(c), size=13, color="ink", anchor="end", middle=True)
        if c == 1 or c in targets:
            fig.dot(nx, Y[c], 3.6, "ink", ring="bg")
        else:
            fig.circle(nx, Y[c], 3.6, color="ink", fill="bg", width=1.4)
    assert 11 not in targets
    fig.text(nx - 10, 12, fig.t("章", "ch."), size=13, color="dim", anchor="end", middle=True)
