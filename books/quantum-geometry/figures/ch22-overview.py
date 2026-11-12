"""第二十二章地图：整数是素数轴上的格点、只用 2、3、5 的筛漏下 7、临界带里的零点。
Chapter 22 at a glance: integers are lattice points on prime axes, the sieve of 2, 3, 5 lets 7 through, and
the zeros in the critical strip.

Panel I places n = 2^a 3^b (a ≤ 3, b ≤ 2) at (a, b) and walks to 12 = 2² · 3.
Panel II colours 1 … 30 by whether they factor over {2, 3, 5}; the first that does not is 7 (checked).
Panel III draws the strip 0 < σ < 1, the line σ = ½, the pole at s = 1 and the first ten zeros at heights
taken from the literature (each checked to make ζ vanish numerically); whether every zero is on the
line is the open Riemann hypothesis; an off-line zero could only come as a mirror pair about σ = ½, so the
question is drawn as two question marks at one height.
"""

from _ch22 import ZEROS, check_zeta, smooth

SIZE = (740, 272)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：横轴每走一步乘 2，竖轴每走一步乘 3，格点上标着 1、2、4、8、3、6、12、24、9、18、36、72；两支青色箭头"
          "先横走两步、再竖走一步，到达 12 = 2² × 3。第二栏：1 到 30 排成方格，能只用 2、3、5 乘出来的格子是青色，其余是品红，"
          "第一个品红格是 7。第三栏：竖着的临界带夹在 σ = 0 与 σ = 1 之间，中间是虚线 σ = ½，s = 1 处打着叉（极点）；"
          "十个零点从下往上都落在虚线上；虚线两侧同一高度各有一个红色虚线圈和问号，用红色细虚线连着，表示离线零点若有，必成对出现；下方的红色标签写着“开放问题”。",
    "en": "Three panels. Panel I: each step right multiplies by 2, each step up by 3; the lattice points read 1, 2, 4, 8, 3, 6, "
          "12, 24, 9, 18, 36, 72, and two cyan arrows go two steps right and one step up to reach 12 = 2² × 3. Panel II: the "
          "numbers 1 to 30 in a grid; those that are products of 2, 3 and 5 alone are cyan, the rest magenta, and the first "
          "magenta cell is 7. Panel III: the vertical critical strip between σ = 0 and σ = 1 with the dashed line σ = ½ in "
          "the middle and a cross at s = 1 (the pole); ten zeros climb the dashed line. Two red dashed circles with question "
          "marks sit at one height on either side of the line, joined by a thin red dashed line: an off-line zero could "
          "only come as such a pair. A red tag reads “open”.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 272, gap=16)

    # ---- I: integers on prime axes
    title(one, "I　整数是素数轴上的点", "I  integers on prime axes")
    ox, oy, dx, dy = 34, 214, 52, 62
    P = lambda a, b: (ox + dx * a, oy - dy * b)
    one.arrow(ox - 8, oy, ox + dx * 3 + 28, oy, "dim", 1.3, head=7)
    one.arrow(ox, oy + 8, ox, oy - dy * 2 - 30, "dim", 1.3, head=7)
    one.text(ox + dx * 3 + 24, oy + 20, "×2", size=13, color="dim", anchor="end")
    one.text(ox + 10, oy - dy * 2 - 24, "×3", size=13, color="dim")
    x1, y1 = P(2, 0)
    x2, y2 = P(2, 1)
    one.arrow(ox, oy, x1 - 6, y1, "line", 2.6, head=9)
    one.arrow(x1, y1, x2, y2 + 6, "line", 2.6, head=9)
    for a in range(4):
        for b in range(3):
            n = 2 ** a * 3 ** b
            x, y = P(a, b)
            hi = n == 12
            one.dot(x, y, 5 if hi else 3.6, "line" if hi else "ink", ring="bg")
            one.text(x + 7, y - 9, str(n), size=14 if hi else 13, color="line" if hi else "dim",
                     weight=600 if hi else None, halo=True)
    assert 2 ** 2 * 3 == 12
    one.text(228, 256, one.t("还有 5、7、11 …", "and 5, 7, 11, …"), size=13, color="dim", anchor="end")

    # ---- II: the sieve of 2, 3, 5
    title(two, "II　只用 2、3、5，漏下 7", "II  2, 3, 5 alone miss 7")
    ps = [2, 3, 5]
    missed = [n for n in range(1, 31) if not smooth(n, ps)]
    assert missed[0] == 7 and all(smooth(n, ps) for n in (1, 2, 3, 4, 5, 6, 8, 9, 10))
    c, x0, y0 = 34, 16, 42
    for n in range(1, 31):
        i, j = (n - 1) % 6, (n - 1) // 6
        x, y = x0 + c * i, y0 + c * j
        good = smooth(n, ps)
        role = "line" if good else "area"
        first = n == missed[0]
        two.rect(x + 2, y + 2, c - 4, c - 4, color=role, fill=role, fill_opacity=0.16 if good else 0.1,
                 width=2.6 if first else 1.2, rx=4)
        two.text(x + c / 2, y + c / 2, str(n), size=14 if first else 13, color=role, weight=600 if first else None,
                 anchor="middle", middle=True)
    two.text(118, 236, two.t("青：2、3、5 乘得出", "cyan: made of 2, 3, 5"), size=13, color="line", anchor="middle")
    two.text(118, 256, two.t("品红：乘不出", "magenta: not"), size=13, color="area", anchor="middle")

    # ---- III: the critical strip
    title(three, "III　临界带", "III  the critical strip")
    check_zeta()
    sx = lambda sig: 30 + 132 * (sig + 0.12)
    ty = lambda t: 226 - 3.4 * t
    three.rect(sx(0), ty(52), sx(1) - sx(0), ty(-3) - ty(52), color=None, fill="faint", fill_opacity=0.22)
    for sig in (0, 1):
        three.line(sx(sig), ty(52), sx(sig), ty(-3), "dim", 1.3)
        three.text(sx(sig), ty(-3) + 16, str(sig), size=13, color="dim", anchor="middle")
    three.line(sx(0.5), ty(52), sx(0.5), ty(-3), "ink", 1.4, dash="5 4")
    three.cross(sx(1), ty(0), 6, "dim", 2)
    three.text(sx(1) + 10, ty(0) + 4, "*s* = 1", size=13, color="dim")
    for t in ZEROS:
        three.dot(sx(0.5), ty(t), 3.6, "ink", ring="bg")
    # an off-line zero could only come in a mirror pair σ ± it ↔ 1 − σ + it (reflection with conjugation), so the
    # open question is drawn as two question marks at one height, joined across the line
    qy = ty(36)
    three.line(sx(0.2) + 9, qy, sx(0.8) - 9, qy, "open", 1.0, dash="2 3")
    for qs in (0.2, 0.8):
        three.circle(sx(qs), qy, 9, color="open", width=1.6, dash="3 2")
        three.text(sx(qs), qy, "?", size=13, color="open", weight=600, anchor="middle", middle=True)
    three.text(sx(0.5), ty(52) - 6, "σ = ½", size=13, color="ink", anchor="middle")
    three.chip(118, 264, three.t("开放问题", "open"), "open", anchor="middle")
