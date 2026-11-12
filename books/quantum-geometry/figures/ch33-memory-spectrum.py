"""主体与客体之间没有断崖，只有一条记忆阶数的连续谱：光子、原子、晶体、心智排在同一条轴上。
No cliff between subject and object, only a continuum of memory orders: photon, atom, crystal and
mind sit on one axis.

The four stations of the chapter's observer-spectrum table, in its order: the free photon (M = 0),
the atom (M = 1), the crystal locked in its window (collective, no single order given) and the
self-referential mind (M ≫ 1). The axis is ordinal, not to scale (MODEL).
"""

from _ch33 import STATIONS, spectrum

SIZE = (460, 176)
ALT = {
    "zh": "一条向右的灰色轴，下方写着“记忆阶数 M 递增”。轴上自左向右四个刻度：光子（一段波），M = 0；原子（带轨道的点），M = 1；"
          "晶体（三乘三的点阵）；心智（一支绕回自身的箭头），M ≫ 1。轴只表示次序，不按比例。",
    "en": "A grey axis pointing right, labelled ‘memory order M grows’ below. Four marks from left to right: a photon (a short wave), "
          "M = 0; an atom (a dot with an orbit), M = 1; a crystal (a three-by-three lattice); a mind (an arrow circling "
          "back on itself), M ≫ 1. The axis shows order only, not scale.",
}

assert [s[0] for s in STATIONS] == sorted(s[0] for s in STATIONS)  # the table's order along the axis


def draw(fig):
    spectrum(fig, 24, 86, 416, s=20)
