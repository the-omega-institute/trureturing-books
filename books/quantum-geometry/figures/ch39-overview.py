"""第三十九章地图：每一格都指回自己，没有另外的指针；刀切到哪里，晶格点才亮到哪里；底圈转一整圈，平方根只走到 −1。
Chapter 39 at a glance: every cell points back at itself and no separate pointer is left; lattice
points light up only where the knife passes; once round the base circle, the square root only gets to −1.

Panel I: a dim pointer register and the dashed wall between it and memory are struck out; below, eight
cells p, each with a cyan arrow that leaves it and comes back (p ≡ *p in every cell, the chapter's MODEL
reading of ψ ≡ ψ(ψ)). Panel II: the golden cut of Z² from _ch39 with only the lit points drawn; under
it the chain they project to, short steps marked 1 and long 0, a word with no adjacent 11 (asserted in
_ch39). Panel III: the square double cover w ↦ w² = z of the circle (section 39.3, LEAN ✓ through
circle_double_cover_history_lift): the cyan base path fullTurn(t) = exp(2πit) goes once round, and its
unique lift from w = 1, the violet exp(πit), stops at −1; square ∘ lift = fullTurn is asserted.
"""

import math

from _ch39 import chain, cell, golden_cut, title

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：上方一个灰色的指针寄存器 ptr 与它和内存之间的虚线隔墙被一个叉划掉；下方两行共八格，每格写着 p，"
          "每格都有一支青色的小箭头离开它又回到它自己，下方写着 p ≡ *p。"
          "第二栏：一条琥珀色的斜线是刀，它周围一条淡青色的带子里有一串青色的格点，带子外面什么也没有；"
          "下方是这些点投到刀上排成的一列长短段，短段记 1、长段记 0，字里没有相邻的 11。"
          "第三栏：上下两个虚线圆，上面是 w，下面是 z = w²；下圆上一支青色箭头从 1 出发绕满一整圈，"
          "上圆上一支紫色箭头从 +1 出发只走了半圈，停在 −1；下方一个绿色的 LEAN ✓ 标记。",
    "en": "Three panels. Panel I: above, a grey pointer register ptr and the dashed wall between it and memory are struck out; "
          "below, two rows of four cells p, each with a small cyan arrow that leaves it and comes back to it, and the line "
          "p ≡ *p. Panel II: an amber slanted line is the blade; inside a pale cyan strip around it lies a run of cyan "
          "lattice points, and outside the strip there is nothing; below, the points projected onto the blade form a row "
          "of long and short steps, short marked 1 and long 0, with no adjacent 11. Panel III: "
          "two dashed circles, w above and z = w² below; on the lower circle a cyan arrow starts at 1 and goes once "
          "all the way round, while on the upper circle a violet arrow starts at +1 and goes only half way, stopping at −1; "
          "below, a green LEAN ✓ tag.",
}


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)

    # ---- I: p ≡ *p everywhere, no separate pointer
    title(one, "I　全域 p ≡ *p", "I  p ≡ *p everywhere")
    one.rect(56, 54, 50, 28, color="dim", fill="panel", rx=4, width=1.4)
    one.text(81, 68, "ptr", size=14, color="dim", anchor="middle", middle=True, mono=True)
    one.line(124, 48, 124, 90, "dim", 1.6, dash="5 4")
    one.arrow(108, 68, 148, 68, "dim", 1.4, head=7)
    one.rect(152, 54, 36, 28, color="dim", rx=4, width=1.4)
    one.cross(124, 68, 22, "dim", 2.4)
    w, g = 38, 14
    x0 = (one.width - (4 * w + 3 * g)) / 2
    for r, y in enumerate((130, 196)):
        for k in range(4):
            cell(one, x0 + k * (w + g), y, w, 34)
    one.text(one.width / 2, 260, "*ψ* ≡ *ψ*(*ψ*)", size=15, anchor="middle")

    # ---- II: no blade, no crystal
    title(two, "II　无刀则无晶", "II  no blade, no crystal")
    step = 23
    bs, as_ = range(0, 9), range(0, 6)
    P, pts = golden_cut(two, 22, 184, step, bs, as_)
    pos, word = chain(pts)
    y = 236
    xa, xb = 22, 22 + step * 8
    scale = (xb - xa) / (pos[-1] - pos[0]) if pos[-1] > pos[0] else 1
    xs = [xa + (p - pos[0]) * scale for p in pos]
    two.line(xs[0], y, xs[-1], y, "now", 1.8)
    for x in xs:
        two.dot(x, y, 3.6, "line", ring="bg")
    for x, x2, c in zip(xs, xs[1:], word):
        two.text((x + x2) / 2, y + 22, c, size=13, color="area" if c == "1" else "dim", anchor="middle", mono=True)
    assert "11" not in word

    # ---- III: the 360° lift of the square double cover
    title(three, "III　转一圈只到 −1", "III  one turn lands on −1")
    cx, R = three.width / 2, 40
    up, lo = 92, 206                        # centres of the cover circle (w) and the base circle (z)
    turn = lambda t: (math.cos(2 * math.pi * t), math.sin(2 * math.pi * t))      # fullTurn(t) = exp(2πit)
    lift = lambda t: (math.cos(math.pi * t), math.sin(math.pi * t))              # the unique lift from w = 1
    for k in range(101):                    # square ∘ lifted = fullTurn, lifted(0) = 1, lifted(1) = −1
        t = k / 100
        wx, wy = lift(t)
        zx, zy = turn(t)
        assert abs(wx * wx - wy * wy - zx) < 1e-12 and abs(2 * wx * wy - zy) < 1e-12
    assert lift(0) == (1.0, 0.0) and abs(lift(1)[0] + 1) < 1e-12 and abs(lift(1)[1]) < 1e-12
    on = lambda c, p, r=R: (cx + r * p[0], c - r * p[1])
    for c in (up, lo):
        three.circle(cx, c, R, color="dim", width=1.2, dash="4 4")
    three.curve_arrow([on(up, lift(k / 60)) for k in range(61)], "violet", 2.4, head=8)
    three.curve_arrow([on(lo, turn(k / 60)) for k in range(57)], "line", 2.4, head=8)
    three.dot(*on(up, lift(0)), 4.2, "violet", ring="bg")
    three.dot(*on(up, lift(1)), 4.2, "violet", ring="bg")
    three.dot(*on(lo, turn(0)), 4.2, "line", ring="bg")
    three.text(cx + R + 8, up + 5, "+1", size=14, color="violet")
    three.text(cx - R - 8, up + 5, "−1", size=14, color="violet", anchor="end")
    three.text(cx + R + 8, lo + 5, "1", size=14, color="line")
    three.text(cx - R - 26, up - 30, "*w*", size=15, anchor="middle")
    three.text(cx - R - 26, lo - 30, "*z*", size=15, anchor="middle")
    three.arrow(cx, up + R + 8, cx, lo - R - 8, "dim", 1.4, head=7)
    three.text(cx + 8, (up + lo) / 2 + 5, "*z* = *w*²", size=14, color="dim")
    three.chip(three.width / 2, 266, "LEAN ✓", "lean", size=13, anchor="middle")
