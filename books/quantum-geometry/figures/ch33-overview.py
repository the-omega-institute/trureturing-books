"""第三十三章地图：记忆阶数的连续谱、自维持的收缩势阱、两扇接受窗的交集。
Chapter 33 at a glance: the continuum of memory orders, the self-kept contracting well, and the
intersection of two acceptance windows.

Panel I is the spectrum of ch33-memory-spectrum (photon M = 0, atom M = 1, crystal, mind M ≫ 1).
Panel II is the well of ch33-contracting-well: a marble kicked to x₀ = 0.8 is pulled back by
x ↦ 0.45·x towards the window W + u_i at the bottom. Panel III is the pair of decagonal windows of
ch33-window-overlap with centres 0.8 R apart; the cyan intersection W_AB is the support both see.
All three are schematic (MODEL).
"""

from _ch33 import profile, spectrum, windows

SIZE = (740, 250)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：一条向右的轴，自左向右排着光子（波）、原子（带轨道的点）、晶体（点阵）与心智（自我环绕的箭头），"
          "下面写着记忆阶数 M = 0、M = 1 与 M ≫ 1。第二栏：一只碗形的势阱，被踢到右侧坡上的小球沿灰色箭头一步步落回碗底，"
          "琥珀色的是它现在的位置，碗底的青色短线是接受窗 W + u_i。第三栏：两扇平移后的正十边形接受窗 W + u_A 与 W + u_B 部分重叠，"
          "重叠处青色的 W_AB 是双方共同看见的部分，只属于一方的部分是品红色。",
    "en": "Three panels. Panel I: an axis pointing right with, from left to right, a photon (a wave), an atom (a dot with "
          "an orbit), a crystal (a lattice) and a mind (an arrow circling back on itself); below them the memory orders "
          "M = 0, M = 1 and M ≫ 1. Panel II: a bowl-shaped well; a marble kicked up the right slope falls back step by "
          "step along grey arrows, amber where it is now, towards the short cyan window W + u_i at the bottom. "
          "Panel III: two translated regular decagons, the windows W + u_A and W + u_B, overlap; the cyan overlap W_AB is "
          "what both see, the magenta parts are seen by one only.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 250, gap=16)

    title(one, "I　万物皆为观察者", "I  every being observes")
    spectrum(one, 12, 160, 214, s=13, axis_label=False)

    title(two, "II　自维持的势阱", "II  a self-kept well")
    profile(two, 118, 176, 92, 96, "well", r=6.0)

    title(three, "III　互为吸引子", "III  mutual attractors")
    R, d = 64, 0.8
    windows(three, 118, 128, R, d, size=14)
    three.text(118 - d * R / 2 - 10, 128 + R + 26, "*W* + *u*_{*A*}", size=13, color="ink", anchor="middle")
    three.text(118 + d * R / 2 + 10, 128 + R + 26, "*W* + *u*_{*B*}", size=13, color="ink", anchor="middle")
