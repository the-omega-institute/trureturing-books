"""第二十九章地图：四级数系突围、模 4 表盘上空着的第 3 格、两条余弦锁住第三条的格拉姆窗口。
Chapter 29 at a glance: the four tiers of numbers, the empty cell 3 of the mod 4 dial, and the Gram
window in which two cosines lock the third.

Panel I is the staircase of ch29-four-tiers without its pictures; panel II is the dial of
ch29-mod-four-dial; panel III is the slice of ch29-gram-window. All three reuse _ch29.
"""

from _ch29 import TIERS, dial, gram_window

SIZE = (740, 272)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：四级台阶从左向右升高，依次写着 ℚ、√2、π、θ*，ℚ 是青色，其余三个是品红。"
          "第二栏：分成四格的模 4 表盘，第 0、1、2 格是青色，第 3 格是品红虚线围出的空格。"
          "第三栏：c_AB = cos 60° 时的格拉姆窗口，一块紫色的倾斜椭圆，边上 det G = 0，里面 det G > 0；一段琥珀色竖线是 c_BC = cos 45° 时 c_AC 的窗口。",
    "en": "Three panels. Panel I: four steps rise from left to right, carrying ℚ, √2, π and θ*; ℚ is cyan, the other "
          "three magenta. Panel II: the mod 4 dial in four cells, cells 0, 1, 2 cyan and cell 3 an empty cell outlined in "
          "dashed magenta. Panel III: the Gram window for c_AB = cos 60°, a tilted violet ellipse with det G = 0 on its rim "
          "and det G > 0 inside; an amber vertical segment is the window for c_AC at c_BC = cos 45°.",
}

SYMBOLS = ["ℚ", "√2", "π", "θ*"]


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 272, gap=16)

    # ---- I: four tiers, each broken open by the next
    title(one, "I　四级突围", "I  four tiers")
    w, base, top0, rise = 54, 254, 210, 40
    x0 = (one.width - 4 * w) / 2
    for k, (zh, en, _, _) in enumerate(TIERS):
        top = top0 - k * rise
        x = x0 + k * w
        one.rect(x + 2, top, w - 4, base - top, color="edge", fill="panel", width=1.2, rx=3)
        one.text(x + w / 2, top - 14, SYMBOLS[k], size=17, color="line" if k == 0 else "area", anchor="middle",
                 weight=700)
        one.text(x + w / 2, top + 18, str(k + 1), size=13, color="dim", anchor="middle")

    # ---- II: the mod 4 dial
    title(two, "II　模 4 的空格", "II  the empty cell")
    dial(two, two.width / 2, 152, 92)

    # ---- III: the Gram window
    title(three, "III　格拉姆窗口", "III  the Gram window")
    ax, top, bot = gram_window(three, 38, 46, 180, 180, ticks=False)
    ax.cv.rect(ax.x, ax.y, ax.w, ax.h, color="faint", width=1.0)
    three.text(ax.X(-0.02), ax.Y(0.0), "det *G* > 0", size=13, color="violet", anchor="middle", middle=True, halo=True,
               weight=600)
    three.text(three.width / 2, 252, "*c*_{AB} = cos 60°", size=13, color="dim", anchor="middle")
