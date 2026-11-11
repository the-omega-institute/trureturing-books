"""哪一章依赖哪一章：每章画一支箭头，从它在正文里回头引用得最多的那一章指过来。
Which chapter rests on which: one arrow into every chapter, from the earlier chapter it refers back to
most often in its own text.

The chapters run down the page in reading order, grouped into the parts of zh/SUMMARY.md. A reference is
a link to chNN-….md or the words “第 N 章” in chapter M's Chinese text, outside the captions of figures,
lab cards, films and slide decks (_coda.chapter_references counts them). For every chapter the arrow comes
from the earlier chapter with the most such mentions (ties go to the later one); its width grows with
that count. A chapter that never refers back to an earlier one gets no arrow and a hollow dot.

Nothing here is filled in by hand: the chapters, the parts, the arrows and the description below are all
computed from the chapter files, so every arrow is a cross-chapter reference that the text contains.
After the chapters change, ./tbook fig build --book quantum-geometry redraws the figure.
"""

import math

from _coda import chapter_references, parts

GROUPS = parts()                                   # [[1, 2, 3, 4], [5, …], …]
CHAPTERS = [c for g in GROUPS for c in g]
N = len(CHAPTERS)
assert CHAPTERS == list(range(1, N + 1)) and N >= 2, "zh/SUMMARY.md: the chapters are not numbered 1, 2, 3, …"
REFS = chapter_references(N)


def main_edges(refs, n):
    """(cited, citing) for every chapter that refers back: the earlier chapter it mentions most."""
    out = []
    for b in range(2, n + 1):
        cands = [(refs[(a, b)], a) for a in range(1, b) if refs[(a, b)]]
        if cands:
            out.append((max(cands)[1], b))
    return out


EDGES = main_edges(REFS, N)
TARGETS = {b for _, b in EDGES}
HOLLOW = [c for c in CHAPTERS[1:] if c not in TARGETS]
for _a, _b in EDGES:
    assert _a < _b and REFS[(_a, _b)] > 0          # every arrow is a reference the text contains

DY, Y0, NX = 16.6, 30, 112
SIZE = (380, round(Y0 + (N - 1) * DY + 28.6))


def _senders():
    """The chapters that send the most arrows: [(chapter, [targets…]), …], at most three."""
    by = {}
    for a, b in EDGES:
        by.setdefault(a, []).append(b)
    top = sorted(by.items(), key=lambda kv: (-len(kv[1]), kv[0]))[:3]
    return [(a, bs) for a, bs in top if len(bs) > 1]


def _alt():
    zh_send = "；".join(f"第 {a} 章发出 {len(bs)} 支（到第 {'、'.join(map(str, bs))} 章）" for a, bs in _senders())
    en_send = "; ".join(f"chapter {a} sends {len(bs)} (to chapters {', '.join(map(str, bs))})" for a, bs in _senders())
    zh_hollow = (f"第 {'、'.join(map(str, HOLLOW))} 章是空心圆点，没有箭头指向它。" if HOLLOW else "")
    en_hollow = (f" Chapter{'s' if len(HOLLOW) > 1 else ''} {', '.join(map(str, HOLLOW))} "
                 f"{'are hollow dots' if len(HOLLOW) > 1 else 'is a hollow dot'} with no arrow." if HOLLOW else "")
    return {
        "zh": f"{N} 个圆点自上而下排成一列，代表第 1 至第 {N} 章，左边按部分段并写着部名。除第 1 章与空心圆点外，每个圆点"
              "都有一支向右鼓出的弧形箭头指向它，起点是它回头引用最多的那一章；箭头越粗，引用越多。"
              + (zh_send + "。" if zh_send else "") + zh_hollow,
        "en": f"{N} dots run down the page for chapters 1 to {N}, grouped on the left into the parts with their names. "
              "Every dot except chapter 1 and the hollow ones receives one arrow, an arc bulging to the right, from the "
              "chapter it refers back to most; the thicker the arrow, the more mentions."
              + (" " + en_send[0].upper() + en_send[1:] + "." if en_send else "") + en_hollow,
    }


ALT = _alt()

PART_ZH = "一二三四五六七八九十"
PART_EN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]


def draw(fig):
    Y = {c: Y0 + (c - 1) * DY for c in CHAPTERS}
    for k, g in enumerate(GROUPS):
        top, bot = Y[g[0]] - DY / 2 + 1, Y[g[-1]] + DY / 2 - 1
        fig.rect(6, top, 120, bot - top, color=None, fill="panel", fill_opacity=0.9 if k % 2 == 0 else 0.35, rx=3)
        fig.text(12, (top + bot) / 2, fig.t(f"第{PART_ZH[k]}部", f"Part {PART_EN[k]}"), size=13, color="dim", middle=True)
    span = max((b - a for a, b in EDGES), default=1)
    reach = min(8.6, (SIZE[0] - (NX + 6) - 10 - 6) / span)     # the widest arc stays inside the frame
    for a, b in sorted(EDGES, key=lambda e: e[1] - e[0], reverse=True):
        n = REFS[(a, b)]
        ya, yb = Y[a], Y[b]
        rx, ry = 10 + reach * (b - a), (yb - ya) / 2
        cx, cy = NX + 6, (ya + yb) / 2
        pts = [(cx + rx * math.sin(math.pi * i / 40), cy - ry * math.cos(math.pi * i / 40)) for i in range(41)]
        fig.curve_arrow(pts, "dim", min(3.4, 1.1 + 0.2 * n), head=7)
    for c in CHAPTERS:
        fig.text(NX - 10, Y[c], str(c), size=13, color="ink", anchor="end", middle=True)
        if c == 1 or c in TARGETS:
            fig.dot(NX, Y[c], 3.6, "ink", ring="bg")
        else:
            fig.circle(NX, Y[c], 3.6, color="ink", fill="bg", width=1.4)
    fig.text(NX - 10, 12, fig.t("章", "ch."), size=13, color="dim", anchor="end", middle=True)
