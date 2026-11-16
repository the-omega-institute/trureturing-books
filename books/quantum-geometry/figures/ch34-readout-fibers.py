"""读数的纤维：两个不同的末态落在同一根纤维上，观察者就把它们读成同一个数。
Readout fibers: two different end states on one fiber are read as the same number.

The equatorial test state s(α) = cos α e₃ + sin α e₂ … of the chapter's worked example, at α = 60°:
the one-step rotor sends it to s_once = cos α e₃ + sin α e₂, the two-step rotor to
s_twice = cos α e₃ − sin α e₁. Both have the same e₃ component cos α = 1/2, so the figure shows the
e₁–e₂ plane. The observer O = (−e₁ + e₂)/√2 satisfies O₁ + O₂ = 0; the fibers of x ↦ O·x are the
lines perpendicular to O, and s_once, s_twice lie on the fiber O·x = sin α/√2 ≈ 0.61 (asserted in
_ch34). The difference s_twice − s_once runs along the fiber: it is in the kernel of the readout.
"""

from _ch34 import readout_fibers

SIZE = (400, 345)
ALT = {
    "zh": "e₁–e₂ 平面。琥珀色的箭头 O 指向左上方，与它垂直的一族平行青色虚线是读数相同的纤维，其中一条加粗成实线。"
          "白色实心点 s_once 在纵轴上、空心圈 s_twice 在横轴左侧，两点都在这条加粗的纤维上，连接它们的品红线段沿着纤维；"
          "这条纤维与 O 的交点是青色的读数 0.61。",
    "en": "The e₁–e₂ plane. The amber arrow O points up and to the left; a family of parallel cyan dashed lines "
          "perpendicular to it are the fibers of equal reading, one of them drawn solid. The filled dot s_once on the "
          "vertical axis and the hollow ring s_twice on the left of the horizontal axis both lie on that solid fiber, "
          "and the magenta segment joining them runs along it; the fiber crosses O at the cyan reading 0.61.",
}


def draw(fig):
    t = fig.t
    P, r, tang = readout_fibers(fig, 205, 175, 128)
    c = (-r / 2 ** 0.5, r / 2 ** 0.5)
    x, y = P((c[0] + 1.0 * tang[0], c[1] + 1.0 * tang[1]))
    fig.text(x + 8, y + 4, t("同一根纤维", "one fiber"), size=13, color="line", halo=True)
