"""第三十一章地图：平视的尺子、不可克隆的内积锁、黄金角轨道的窗口份额。
Chapter 31 at a glance: the eye-level ruler, the no-cloning inner-product lock, and the window share
of a golden-angle orbit.

Panel I reuses ch31-ruler (θ = 60°, both shadows cos θ = 1/2). Panel II reuses ch31-cloning-lock
(x = x² only at 0 and 1). Panel III: 21 points k·(2 − φ) of a turn, k = 1 … 21, on a circle with a cyan
window of 2 − φ ≈ 0.382 of the circumference; 8 of the 21 land in it, against 21(2 − φ) ≈ 8.02
(asserted in _ch31). This is a circle picture of the window share, not of the Bloch sphere.
"""

from _ch31 import GOLD, ergodic, lock, ruler

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：两支墨色单位箭头 φ 与 ψ 互相投影，两段青色影子一样长，都是 cos θ；上方的第 3 点 C 被划掉。"
          "第二栏：横轴是内积 ⟨φ, ψ⟩，墨色对角线 y = x 与青色抛物线 y = x² 只在 0（φ ⊥ ψ）与 1（φ = ψ）相交。"
          "第三栏：一个圆上按黄金角依次排开 21 个点，青色的窗口占圆周的 0.382，其中 8 个点落在窗口里（青色），其余为灰色。",
    "en": "Three panels. Panel I: two ink unit arrows φ and ψ project onto each other; the two cyan shadows are equally "
          "long, cos θ each; the third point C above is struck out. Panel II: against the inner product ⟨φ, ψ⟩, the ink "
          "diagonal y = x and the cyan parabola y = x² cross only at 0 (φ ⊥ ψ) and 1 (φ = ψ). Panel III: 21 points "
          "laid round a circle by the golden angle; a cyan window covers 0.382 of the circle and 8 of the points land "
          "in it (cyan), the rest grey.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)

    title(one, "I　平视的尺子", "I  the eye-level ruler")
    ruler(one, 118, 262, 128, 60.0, size=13)

    title(two, "II　内积锁", "II  the inner-product lock")
    lock(two, 22, 44, 200, 196, size=13)

    title(three, "III　窗口的份额", "III  the window's share")
    hits, n = ergodic(three, 118, 148, 92)
    assert (hits, n) == (8, 21)
    three.text(118, 148, f"{hits} / {n}", size=16, color="line", anchor="middle", middle=True, weight=600)
    three.text(118, 268, f"2 − φ ≈ {GOLD:.3f}", size=13, color="line", anchor="middle")
