"""同一次相遇，六个疆域里的两种读法：青色的线、品红的面。
One meeting, read in six domains: the cyan line and the magenta area.

The "one-dimensional inner product" and "two-dimensional outer product" rows of the six-domain
table rem-ch32-six-domain-isomorphism-table, one small panel per column. Every panel carries the same
split of two unit vectors at θ = 50° (cyan shadow cos θ, magenta parallelogram of height sin θ,
asserted in _ch32); only the reading under it changes. The table itself is the chapter's synthesis
(MODEL), with literature and Lean entries as marked there; nothing here is green.
"""

from _ch32 import split

SIZE = (740, 352)
WRAP = True
THETA = 50.0

READINGS = [
    (("几何与拓扑", "Geometry & topology"),
     ("幂等方向线 P² = P", "idempotent line P² = P"),
     ("有向旋转面积", "oriented turning area")),
    (("量子与规范场", "Quantum & gauge fields"),
     ("秩一玻恩权重", "rank-one Born weight"),
     ("旋子门、曲率 F_{μν}", "rotor gates, curvature F_{μν}")),
    (("相对论与全息", "Relativity & holography"),
     ("固有时率 dτ/dt", "proper-time rate dτ/dt"),
     ("速度 v/c、极小割截面", "speed v/c, minimal cuts")),
    (("算术与数论", "Arithmetic"),
     ("哈塞迹 cos θ_{p}", "Hasse trace cos θ_{p}"),
     ("p = a² + b² 的分裂", "splitting p = a² + b²")),
    (("复杂性与流体", "Complexity & fluids"),
     ("见证丝：NP 是线", "witness thread: NP is a line"),
     ("引导场、涡量 ∇∧u", "guiding field, vorticity ∇∧u")),
    (("观察者", "The observer"),
     ("齐肯多夫记忆锚点", "Zeckendorf memory anchors"),
     ("兰道尔热熵", "Landauer heat")),
]

ALT = {
    "zh": "六个小图，排成两行。每个小图里是同一幅画：两支墨色单位箭头夹角 θ，青色的影子与品红的平行四边形；"
          "图下两行字是这个疆域的读法。几何与拓扑：线是幂等方向线 P² = P，面是有向旋转面积。"
          "量子与规范场：线是秩一玻恩权重，面是旋子门与曲率 F_μν。相对论与全息：线是固有时率 dτ/dt，面是速度 v/c 与极小割截面。"
          "算术与数论：线是哈塞迹 cos θ_p，面是 p = a² + b² 的分裂。复杂性与流体：线是见证丝（NP 是线），面是引导场与涡量 ∇∧u。"
          "观察者：线是齐肯多夫记忆锚点，面是兰道尔热熵。",
    "en": "Six small panels in two rows. Each shows the same picture: two ink unit arrows at an angle θ, a cyan shadow "
          "and a magenta parallelogram; the two lines of text below give the domain's reading. Geometry and topology: "
          "the line is the idempotent line P² = P, the area an oriented turning area. Quantum and gauge fields: the "
          "rank-one Born weight; rotor gates and the curvature F_μν. Relativity and holography: the proper-time rate "
          "dτ/dt; the speed v/c and minimal cuts. Arithmetic: the Hasse trace cos θ_p; the splitting p = a² + b². "
          "Complexity and fluids: the witness thread (NP is a line); the guiding field and the vorticity ∇∧u. The "
          "observer: Zeckendorf memory anchors; Landauer heat.",
}


def panel(p, entry):
    (dz, de), (lz, le), (az, ae) = entry
    p.text(p.width / 2, 20, p.t(dz, de), size=14, weight=600, anchor="middle")
    split(p, 66, 100, 62, THETA, shadow_w=4.0)
    p.text(12, 130, p.t("**线**　" + lz, "**line**  " + le), size=13, color="line")
    p.text(12, 152, p.t("**面**　" + az, "**area**  " + ae), size=13, color="area")


def draw(fig):
    rows = [fig.row([236, 236, 236], 162, y=0), fig.row([236, 236, 236], 162, y=190)]
    panels = rows[0] + rows[1]
    assert len(panels) == len(READINGS) == 6
    for p, entry in zip(panels, READINGS):
        panel(p, entry)
