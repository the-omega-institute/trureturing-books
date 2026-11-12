"""第三十九章地图：每一格都指回自己，没有另外的指针；刀切到哪里，晶格点才亮到哪里；一份纯度正交折成 cos²θ 与 sin²θ。
Chapter 39 at a glance: every cell points back at itself and no separate pointer is left; lattice
points light up only where the knife passes; one unit of purity folds orthogonally into cos²θ and sin²θ.

Panel I: a dim pointer register and the dashed wall between it and memory are struck out; below, eight
cells p, each with a cyan arrow that leaves it and comes back (p ≡ *p in every cell, the chapter's MODEL
reading of ψ ≡ ψ(ψ)). Panel II: the golden cut of Z² from _ch39 with only the lit points drawn; under
it the chain they project to, short steps marked 1 and long 0, a word with no adjacent 11 (asserted in
_ch39). Panel III: Ψ at θ = 40° above the observer's line; the cyan shadow cos θ and the magenta drop
sin θ, with cos²θ + sin²θ = 1 asserted.
"""

import math

from _ch39 import chain, cell, folding, golden_cut, title

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：上方一个灰色的指针寄存器 ptr 与它和内存之间的虚线隔墙被一个叉划掉；下方两行共八格，每格写着 p，"
          "每格都有一支青色的小箭头离开它又回到它自己，下方写着 p ≡ *p。"
          "第二栏：一条琥珀色的斜线是刀，它周围一条淡青色的带子里有一串青色的格点，带子外面什么也没有；"
          "下方是这些点投到刀上排成的一列长短段，短段记 1、长段记 0，字里没有相邻的 11。"
          "第三栏：墨色的单位箭头 Ψ 与水平的观察者之线成 θ 角；青色的影子 cos θ 躺在线上，品红的垂线 sin θ 站在它外面，"
          "下方写着 cos²θ + sin²θ = 1。",
    "en": "Three panels. Panel I: above, a grey pointer register ptr and the dashed wall between it and memory are struck out; "
          "below, two rows of four cells p, each with a small cyan arrow that leaves it and comes back to it, and the line "
          "p ≡ *p. Panel II: an amber slanted line is the blade; inside a pale cyan strip around it lies a run of cyan "
          "lattice points, and outside the strip there is nothing; below, the points projected onto the blade form a row "
          "of long and short steps, short marked 1 and long 0, with no adjacent 11. Panel III: the ink unit arrow Ψ makes "
          "an angle θ with the horizontal line of the observer; the cyan shadow cos θ lies on the line, the magenta drop "
          "sin θ stands across it; below, cos²θ + sin²θ = 1.",
}

THETA = 40.0


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

    # ---- III: orthogonal self-folding
    title(three, "III　正交自折叠", "III  orthogonal self-folding")
    ox, oy, R = 40, 216, 150
    (tx, ty), (fx, fy) = folding(three, ox, oy, R, THETA)
    c, s = math.cos(math.radians(THETA)), math.sin(math.radians(THETA))
    three.text(tx + 8, ty - 4, "Ψ", size=16, weight=600)
    three.text((ox + fx) / 2, oy + 20, "cos θ", size=14, color="line", anchor="middle")
    three.text(fx + 8, (fy + ty) / 2 + 5, "sin θ", size=14, color="area", halo=True)
    three.text(three.width / 2, 262, "cos²θ + sin²θ = 1", size=14, anchor="middle")
    assert abs(c * c + s * s - 1) < 1e-12
