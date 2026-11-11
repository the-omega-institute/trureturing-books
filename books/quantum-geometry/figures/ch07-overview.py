"""第七章地图：翻过 90° 才是一声滴答；看得越勤越走不掉；记账余量为正的阈值。
Chapter 7 at a glance: one tick is a 90° turn; watched often enough, the state stays; the threshold for a
positive free-energy deposit.

Panel I sweeps an arrow from m₀ to the orthogonal m₁ and marks the right angle.
Panel II plots the chance of reading |0⟩ against the Bloch angle ωt: unwatched (dashed) and measured
four times (cyan), ending at P₄ = 0.5308 (asserted against the chapter's table).
Panel III plots D_freeze = ΔE_pass − ΔS/β against β for ΔE_pass = 1, ΔS = ½: negative (magenta) below
β_c = ΔS/ΔE_pass, positive (cyan) above it.
"""

import math

from _ch07 import ZENO_TABLE, free_survival, freeze_deposit, strobe_survival

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：一支琥珀色的箭头从 m₀ 转到与它垂直的 m₁，扫过一块四分之一圆的品红面积，两个端点是两声滴答。"
          "第二栏：横轴是转角 ωt，从 0 到 180°；虚线是不看时留在 |0⟩ 的概率，一路降到 0；青色的锯齿是测 4 次时的概率，"
          "每测一次就停在当时的高度重新往下走，到 180° 还剩 0.531。"
          "第三栏：横轴是逆温度 β，曲线是记账余量 D = ΔE_pass − ΔS/β；在临界点 β_c 左边曲线在零线下方，是品红的负余量，"
          "右边在零线上方，是青色的正余量。",
    "en": "Three panels. Panel I: an amber arrow turns from m₀ to the perpendicular m₁, sweeping a magenta quarter disc; "
          "the two end points are two ticks. Panel II: the horizontal axis is the turning angle ωt from 0 to 180°; the dashed "
          "curve is the chance of still reading |0⟩ when nobody looks, falling to 0; the cyan sawtooth is the chance when "
          "|0⟩ is measured four times, each measurement restarting the fall from the height reached, so that 0.531 is left "
          "at 180°. Panel III: the horizontal axis is the inverse temperature β and the curve is the deposit "
          "D = ΔE_pass − ΔS/β; left of the critical point β_c it lies below zero (magenta, negative), right of it above "
          "zero (cyan, positive).",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 262, gap=16)

    # ---- I: one tick is a 90° turn
    title(one, "I　翻过 90° 才是一声滴答", "I  one tick = a 90° turn")
    ox, oy, R = 60, 214, 148
    one.arc(ox, oy, R, 0, 90, "area", 1.2, fill="area", fill_opacity=0.16)
    one.arc(ox, oy, R, -6, 96, "faint", 1.2, dash="3 4")
    one.line(ox, oy, ox + R + 14, oy, "dim", 1.3)
    one.line(ox, oy, ox, oy - R - 14, "dim", 1.3)
    one.right_angle(ox, oy, 0, 12, "area", 1.4)
    sweep = [(ox + (R + 12) * math.cos(math.radians(a)), oy - (R + 12) * math.sin(math.radians(a))) for a in range(8, 84, 3)]
    one.curve_arrow(sweep, "now", 1.8, head=8)
    one.arrow(ox, oy, ox + R * math.cos(math.radians(55)), oy - R * math.sin(math.radians(55)), "now", 2.6)
    for x, y in ((ox + R, oy), (ox, oy - R)):
        one.dot(x, y, 5.2, "line", ring="bg")
    one.text(ox + R + 2, oy + 22, "*m*_{0}", size=15, anchor="middle")
    one.text(ox - 10, oy - R + 4, "*m*_{1}", size=15, anchor="end")
    one.text(ox + 62 * math.cos(math.radians(24)), oy - 62 * math.sin(math.radians(24)), "90°", size=15, color="area", anchor="middle", halo=True)
    one.text(ox + R - 6, oy - R + 6, one.t("滴答", "tick"), size=13, color="line", anchor="middle")

    # ---- II: watched often enough, the state stays
    title(two, "II　看得越勤，越走不掉", "II  watched, it stays")
    ax = two.axes(34, 48, 186, 168, (0, math.pi), (0, 1))
    ax.xaxis(ticks=[0, math.pi / 2, math.pi], labels=["0", "90°", "180°"], size=12)
    ax.yaxis(ticks=[0, 1], labels=["0", "1"], size=12)
    ax.plot(free_survival, color="dim", width=1.6, dash="5 4")
    ax.plot(lambda th: strobe_survival(th, 4), color="line", width=2.4, n=400)
    end = strobe_survival(math.pi, 4)
    assert abs(end - ZENO_TABLE[4]) < 5e-5
    for k in range(1, 5):
        th = k * math.pi / 4
        ax.points([(th, strobe_survival(th, 4))], color="line", r=3.4, ring="bg")
    ax.text(math.pi, end, f"{end:.3f}", dx=0, dy=24, size=13, color="line", anchor="end")
    ax.text(2.25, free_survival(2.25), two.t("不看", "unwatched"), dx=4, dy=4, size=13, color="dim")
    ax.text(0.05, 0.08, "*N* = 4", size=13, color="line")
    two.text(127, 252, "*ωt*", size=13, color="dim", anchor="middle")

    # ---- III: the deposit is positive exactly above β_c
    title(three, "III　余量为正的阈值", "III  the deposit threshold")
    de, ds = 1.0, 0.5
    bc = ds / de
    ax = three.axes(26, 52, 196, 168, (0.0, 2.0), (-1.5, 1.2))
    lo = ds / (de + 1.5)                  # β where D = −1.5, the bottom of the plot
    assert abs(freeze_deposit(lo, ds, de) + 1.5) < 1e-12
    left = [(lo + (bc - lo) * i / 60, freeze_deposit(lo + (bc - lo) * i / 60, ds, de)) for i in range(61)]
    right = [(bc + (2.0 - bc) * i / 80, freeze_deposit(bc + (2.0 - bc) * i / 80, ds, de)) for i in range(81)]
    assert abs(freeze_deposit(bc, ds, de)) < 1e-12
    ax.area(left, "area", base=0, fill_opacity=0.22)
    ax.area(right, "line", base=0, fill_opacity=0.22)
    ax.hline(0, "dim", 1.3)
    ax.yaxis(at=0, ticks=[], color="dim")
    ax.path(left + right, "ink", 2.2)
    ax.vline(bc, "dim", 1.2, dash="4 3")
    ax.text(bc, -1.5, "*β*_{c}", dx=8, dy=-6, size=14, color="ink")
    ax.text(1.25, 0.25, "*D* > 0", size=14, color="line", anchor="middle")
    ax.text(0.5, -1.0, "*D* < 0", dx=12, size=14, color="area")
    three.text(222, 248, "*β*", size=14, color="dim", anchor="end")
