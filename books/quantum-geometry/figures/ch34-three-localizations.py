"""三种定位并排：单平面、相对论同时面、黄金切片——读数看不见的方向（品红）与观察者（琥珀）互相垂直。
Three localizations side by side: the single plane, the relativistic simultaneity slice and the
golden slice — the direction the reading cannot see (magenta) and the observer (amber) are orthogonal.

Panel I: u₀ = e₁ turned once to u₁ = e₂ and twice to u₂ = −e₁; the amber anti-bisector O₂ = −O₁ is
perpendicular to the magenta chord u₂ − u₁ and meets it at its midpoint, the common foot of u₁
and u₂ (signed reading −1/√2; asserted in _ch34). Panel II: a spacetime diagram (c = 1) with the worldline u of an
observer moving at v = 0.5 (schematic choice of speed) and its magenta line of simultaneity Δt = v·Δx,
Minkowski-orthogonal to u, the two symmetric about the dashed light cone (literature result). Panel
III: the golden cut-and-project scheme of the chapter's proposition, as in ch34-overview.
"""

from _ch34 import golden_slice, simultaneity, single_plane

SIZE = (740, 268)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：一个圆上，u₀ 在右，转一次到顶上的 u₁（实心点），再转一次到左边的 u₂（空心圈），第二次转动的弧是品红的；"
          "品红的弦连着 u₁ 与 u₂，琥珀色虚线 O 是与这根弦垂直的反角平分线，弦与 O 交于一个青色的点，u₁ 与 u₂ 在 O 上的影子都落在这里。"
          "第二栏：时空图，横轴 x、纵轴 t，灰色虚线是光锥；琥珀色箭头 u 是运动观察者的世界线，品红的直线是它的同时线，"
          "两者关于光锥对称，同时线上的两个事件是白色的点。第三栏：方格点阵上的琥珀色斜线 E∥ 与青色窄带，带里的青色点沿品红短线落到斜线上，"
          "品红虚线 E⊥ 与斜线垂直。",
    "en": "Three panels. Panel I: on a circle, u₀ on the right is turned once to u₁ at the top (filled dot) and again to "
          "u₂ on the left (hollow ring), the second turn's arc in magenta; a magenta chord joins u₁ and u₂, the amber "
          "dashed line O is the anti-bisector perpendicular to that chord, and the chord meets O at one cyan point, "
          "where the shadows of u₁ and u₂ on O both fall. Panel II: a spacetime diagram, x across and t up, the grey dashed lines the light cone; "
          "the amber arrow u is the worldline of a moving observer and the magenta line its line of simultaneity, the two "
          "symmetric about the light cone, with two white events on the simultaneity line. Panel III: a square lattice "
          "with the amber slanted line E∥ in a narrow cyan strip; the cyan points in the strip drop along short magenta "
          "lines onto it, and the magenta dashed line E⊥ is perpendicular to it.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 268, gap=16)

    title(one, "I　单平面", "I  a single plane")
    single_plane(one, 118, 152, 82)

    title(two, "II　同时面", "II  the simultaneity slice")
    P = simultaneity(two, 118, 152, 88)
    x, y = P((1.08 / 1.118, 0.54 / 1.118))
    two.text(x + 4, y + 32, two.t("同时", "same time"), size=13, color="magenta", anchor="end", halo=True)

    title(three, "III　黄金切片", "III  the golden slice")
    step = 26
    P, ea, eb, (ka, kb), acc = golden_slice(three, 118 - 3.5 * step, 226, step)
    x, y = P(*eb)
    three.text(x - 4, y - 10, "*E*_{∥}", size=14, color="now", weight=600, anchor="end")
    top = ka if ka[1] > kb[1] else kb
    x, y = P(*top)
    three.text(x + 8, y + 6, "*E*_{⊥}", size=14, color="magenta")
